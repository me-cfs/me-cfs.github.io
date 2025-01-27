const fs = require('fs');
const xml2js = require('xml2js');
const { removeHiddenWords, fetchFeed, extractBaseUrl } = require('../dev/node_utils.js');
const { loadLocalFeed, deduplicateItems, filterItems, addItemToLocalFeed, saveLocalFeed } = require('../dev/rss_utils.js');

// Environment (YML) predefined variables
const feedConfigPath = process.env.FEED_CONFIG_PATH;
const feedUrls = require(feedConfigPath);
const localFile = process.env.LOCAL_FILE;
const MAX_ITEMS = parseInt(process.env.MAX_ITEMS, 10);
const addAuthorTitle = process.env.addAuthorTitle 
  ? process.env.addAuthorTitle.toLowerCase() === 'true' 
  : false;

async function filterAndUpdateFeed() {
  try {
    // fetch all feeds and flatten the result into a single array
    console.log('Fetching all Feed Items and Flattening into single array');
    const allFeedItems = (await Promise.all(feedUrls.map(fetchFeed))).flat();
    console.log('allFeedItems = [sample]', allFeedItems.slice(0,5), allFeedItems.slice(80,83));

    // remove any duplicates
    console.log('removing duplicates...');
    const uniqueFeedItems = deduplicateItems(allFeedItems);
    
    // Log each feed's source URL and the number of items it contains
    feedUrls.forEach((feedObj, index) => {
  const feedUrl = feedObj.url || 'Unknown URL'; // Use 'Unknown URL' if the object doesn't have a URL
  const feedItemsCount = (allFeedItems[index] || []).length;

  console.log(`Feed Name: ${feedObj.name || 'Unnamed Feed'}`);
  console.log(`Feed URL: ${feedUrl}`);
  console.log(`Number of items fetched: ${feedItemsCount}`);
});

    // load the localFeed from the file (the RSS feed hosted on my website)
    console.log('loading the local feed');
    let localFeed = await loadLocalFeed(localFile);

    // filter all items for various criteria. Passed items included in newItemd
    const newItems = filterItems(uniqueFeedItems, localFeed, addAuthorTitle);

    // Add new items to the localFeed
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