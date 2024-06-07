const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new Parser();
const feedUrls = [
  { url: 'https://thesicktimes.org/feed/', name: 'The Sick Times', cutoffDate: new Date('2024-05-01') },
  { url: 'https://politepol.com/fd/yNgKhc4c7HHu.xml', name: 'Virology', cutoffDate: new Date('2024-05-29') },
  // Add more feeds with their respective cutoff dates as needed
];
const localFile = 'news/rss/community.xml'; // Correct path to your XML file

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

async function filterAndUpdateFeed() {
  try {
    // Fetch all feeds
    const allFeedItems = (await Promise.all(feedUrls.map(fetchFeed))).flat();

    // Load the local XML file
    let localFeed;
    if (fs.existsSync(localFile)) {
      const localData = fs.readFileSync(localFile, 'utf8');
      localFeed = await xml2js.parseStringPromise(localData);
    } else {
      localFeed = { rss: { channel: [ { item: [] } ] } };
    }

    // Ensure localFeed has the correct structure
    if (!localFeed.rss) localFeed.rss = {};
    if (!localFeed.rss.channel) localFeed.rss.channel = [{}];
    if (!localFeed.rss.channel[0].item) localFeed.rss.channel[0].item = [];

    // Filter criteria
    const exclusionWords = ["National Covid-19 trends", "Research updates",];

    // Filter the feed items
    const newItems = allFeedItems.filter(item => {
      const title = item.title.toLowerCase();
      const pubDate = new Date(item.pubDate);

      // Check exclusion criteria
      const isExcluded = exclusionWords.some(word => title.includes(word.toLowerCase())) ||
        pubDate <= item.cutoffDate;

      // Check for duplicates
      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

      return !isExcluded && !isDuplicate;
    });

    // Add new items to the local feed
    newItems.forEach(item => {
      localFeed.rss.channel[0].item.push({
        title: [item.title],
        link: [item.link],
        guid: [item.guid],
        pubDate: [item.pubDate],
        description: [item.content],
        source: [item.source] // Add source feed name
      });
    });

    // Convert JSON to XML
    const builder = new xml2js.Builder();
    const updatedXml = builder.buildObject(localFeed);

    // Write the updated XML to the local file
    fs.writeFileSync(localFile, updatedXml);

    console.log('Feed updated successfully.');
  } catch (error) {
    console.error('Error updating feed:', error);
  }
}

filterAndUpdateFeed();
