const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new Parser();
const feedUrl = 'https://example.com/rss-feed.xml'; // Replace with your RSS feed URL
const localFile = 'rss_feed.xml';

async function filterAndUpdateFeed() {
  try {
    // Fetch the RSS feed
    const feed = await parser.parseURL(feedUrl);

    // Load the local XML file
    let localFeed;
    if (fs.existsSync(localFile)) {
      const localData = fs.readFileSync(localFile, 'utf8');
      localFeed = await xml2js.parseStringPromise(localData);
    } else {
      localFeed = { rss: { channel: [ { item: [] } ] } };
    }

    // Filter criteria
    const exclusionWords = ['excludeWord1', 'excludeWord2'];
    const exclusionDate = new Date('2024-01-01');

    // Filter the feed items
    const newItems = feed.items.filter(item => {
      const title = item.title.toLowerCase();
      const pubDate = new Date(item.pubDate);

      // Check exclusion criteria
      const isExcluded = exclusionWords.some(word => title.includes(word.toLowerCase())) ||
        pubDate < exclusionDate;

      // Check for duplicates
      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid[0] === item.guid);

      return !isExcluded && !isDuplicate;
    });

    // Add new items to the local feed
    newItems.forEach(item => {
      localFeed.rss.channel[0].item.push({
        title: [item.title],
        link: [item.link],
        guid: [item.guid],
        pubDate: [item.pubDate],
        description: [item.content]
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
