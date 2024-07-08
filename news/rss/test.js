const fs = require('fs');
const xml2js = require('xml2js');
const { removeHiddenWords, fetchFeed, extractBaseUrl } = require('../dev/node_utils.js');
const { loadLocalFeed, deduplicateItems, filterItems, addItemToLocalFeed, saveLocalFeed } = require('../dev/rss_utils.js');

// Environment (YAML) predefined variables
const feedConfigPath = process.env.FEED_CONFIG_PATH;
const feedUrls = require(feedConfigPath);
const localFile = process.env.LOCAL_FILE;
const MAX_ITEMS = parseInt(process.env.MAX_ITEMS, 10);

async function filterAndUpdateFeed() {
  try {
    const allFeedItems = (await Promise.all(feedUrls.map(fetchFeed))).flat();

    const uniqueFeedItems = deduplicateItems(allFeedItems);
    let localFeed = await loadLocalFeed(localFile);

    const newItems = filterItems(uniqueFeedItems, localFeed);

    newItems.forEach(item => addItemToLocalFeed(item, localFeed));

    // Sort by date and trim to MAX_ITEMS
    localFeed.rss.channel[0].item.sort((a, b) => new Date(b.pubDate[0]) - new Date(a.pubDate[0]));
    localFeed.rss.channel[0].item = localFeed.rss.channel[0].item.slice(0, MAX_ITEMS);

    saveLocalFeed(localFeed, localFile);
    console.log('Feed updated successfully.');
  } catch (error) {
    console.error('Error updating feed:', error);
  }
}

filterAndUpdateFeed();