const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new Parser();
const feedUrls = [
  { url: 'https://www.google.com/alerts/feeds/00974591944495763896/11815415262763445760', name: 'ME News Mentions Google Alert', cutoffDate: new Date('2024-06-01') },
  // Add more feeds with their respective cutoff dates as needed
];
const localFile = 'news/rss/me-mentions.xml'; // Correct path to your XML file

async function fetchFeed(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl.url);
    return feed.items.map(item => ({
      ...item,
      source: feedUrl.name,
      cutoffDate: feedUrl.cutoffDate
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

    const exclusionWords = ["National Covid-19 trends", "Research updates"];

    const newItems = allFeedItems.filter(item => {
      const title = item.title.toLowerCase();
      const pubDate = new Date(item.pubDate);

      const isExcluded = exclusionWords.some(word => title.includes(word.toLowerCase())) ||
        pubDate <= item.cutoffDate;

      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

      return !isExcluded && !isDuplicate;
    });

    newItems.forEach(item => {
      localFeed.rss.channel[0].item.push({
        title: [item.title],
        link: [item.link],
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