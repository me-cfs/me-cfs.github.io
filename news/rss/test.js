const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new Parser();
const feedUrls = [
  { 
    url: 'https://med-mastodon.com/@s4me.rss',
    name: 'Science for ME', 
    cutoffDate: new Date('2024-05-01'),
    exclusionWords: [],
    inclusionWords: ['News in Brief'],
    undefinedTitle: 'News in Brief for the week ending, ' + getOneWeekAgoDate(),
    getContentLink: 'https://www.s4me.info'
  },
  // Add more feeds with their respective cutoff dates and exclusion words as needed
];
const localFile = 'news/rss/test.xml'; // Correct path to your XML file

function getOneWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

async function fetchFeed(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl.url);
    return feed.items.map(item => ({
      ...item,
      source: feedUrl.name,
      cutoffDate: feedUrl.cutoffDate,
      exclusionWords: feedUrl.exclusionWords,
      inclusionWords: feedUrl.inclusionWords,
      undefinedTitle: feedUrl.undefinedTitle,
      getContentLink: feedUrl.getContentLink
    }));
  } catch (error) {
    console.error(`Error fetching feed ${feedUrl.url}:`, error);
    return [];
  }
}

const MAX_ITEMS = 500; // Maximum number of items to keep in the feed

async function filterAndUpdateFeed() {
  try {
    const allFeedItems = (await Promise.all(feedUrls.map(fetchFeed))).flat();

    let localFeed;
    if (fs.existsSync(localFile)) {
      const localData = fs.readFileSync(localFile, 'utf8');
      localFeed = await xml2js.parseStringPromise(localData);
    } else {
      localFeed = { rss: { channel: [ { item: [] } ] } };
    }

    if (!localFeed.rss) localFeed.rss = {};
    if (!localFeed.rss.channel) localFeed.rss.channel = [{}];
    if (!localFeed.rss.channel[0].item) localFeed.rss.channel[0].item = [];

    const newItems = allFeedItems.filter(item => {
      let title = item.title ? item.title.toLowerCase() : null;
      const content = item.content ? item.content.toLowerCase() : '';
      const pubDate = item.pubDate ? new Date(item.pubDate) : null;

      if (!title && content) {
        const hasInclusionWords = item.inclusionWords.some(word => content.includes(word.toLowerCase()));
        if (hasInclusionWords) {
          title = item.undefinedTitle;
        } else {
          console.log(`Excluding item due to title and content not having inclusion words: ${JSON.stringify(item)}`);
          return false;
        }
      }

      if (!title || !pubDate) {
        console.log(`Excluding item due to missing title or pubDate: ${JSON.stringify(item)}`);
        return false;
      }

      const isExcluded = item.exclusionWords.some(word => title.includes(word.toLowerCase())) ||
        pubDate <= item.cutoffDate;

      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

      if (isExcluded) {
        console.log(`Excluding item due to exclusion words or cutoff date: ${item.title || item.content}`);
      } else if (isDuplicate) {
        console.log(`Excluding item due to duplication: ${item.title || item.content}`);
      } else {
        console.log(`Including item: ${item.title || item.content}`);
      }

      item.processedTitle = title;
      return !isExcluded && !isDuplicate;
    });

    newItems.forEach(item => {
      // If getContentLink is defined, find the first link in content that matches the base URL
      let link = item.link;
      if (item.getContentLink && item.content) {
        const regex = new RegExp(`(${item.getContentLink}[^\s]+)`, 'g');
        const matches = item.content.match(regex);
        if (matches && matches.length > 0) {
          link = matches[0];
        }
      }

      localFeed.rss.channel[0].item.push({
        title: [item.processedTitle || item.content],
        link: [link],
        author: [item.source],
        guid: [item.guid],
        pubDate: [item.pubDate]
      });
    });

    // Sort by date
    localFeed.rss.channel[0].item.sort((a, b) => new Date(b.pubDate[0]) - new Date(a.pubDate[0]));

    // Trim to MAX_ITEMS
    localFeed.rss.channel[0].item = localFeed.rss.channel[0].item.slice(0, MAX_ITEMS);

    const builder = new xml2js.Builder();
    const updatedXml = builder.buildObject(localFeed);

    fs.writeFileSync(localFile, updatedXml);

    console.log('Feed updated successfully.');
  } catch (error) {
    console.error('Error updating feed:', error);
  }
}

filterAndUpdateFeed();