const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const feedUrls = require('./community_input'); // Adjust the path as necessary

const parser = new Parser();
const localFile = 'news/rss/test.xml'; // Correct path to your XML file

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
      getContentLink: feedUrl.getContentLink,
      titleHide: feedUrl.titleHide
    }));
  } catch (error) {
    console.error(`Error fetching feed ${feedUrl.url}:`, error);
    return [];
  }
}

function removeHiddenWords(title, titleHide) {
  if (!titleHide || titleHide.length === 0) return title;

  let processedTitle = title;
  titleHide.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match the whole word, case insensitive
    processedTitle = processedTitle.replace(regex, '').trim();
  });

  // Clean up extra spaces
  processedTitle = processedTitle.replace(/\s\s+/g, ' ');

  return processedTitle;
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
      let title = item.title ? item.title : null;
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

      const processedTitle = removeHiddenWords(title, item.titleHide);

      const isExcluded = item.exclusionWords.some(word => processedTitle.toLowerCase().includes(word.toLowerCase())) ||
        pubDate <= item.cutoffDate;

      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

      if (isExcluded) {
        console.log(`Excluding item due to exclusion words or cutoff date: ${processedTitle}`);
      } else if (isDuplicate) {
        console.log(`Excluding item due to duplication: ${processedTitle}`);
      } else {
        console.log(`Including item: ${processedTitle}`);
      }

      item.processedTitle = processedTitle;
      return !isExcluded && !isDuplicate;
    });

    newItems.forEach(item => {
      // If getContentLink is defined, find the first link in content that matches the base URL
      let link = item.link;
      if (item.getContentLink && item.content) {
          // Improved regex to capture the full URL
          const regex = new RegExp(`(${item.getContentLink}[^\\s"']+)`, 'g');
          const matches = item.content.match(regex);
          if (matches && matches.length > 0) {
              link = matches[0];
          }
      }
      // Do something with the link
      console.log(link);

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