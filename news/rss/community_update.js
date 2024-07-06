const Parser = require('rss-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const { removeHiddenWords } = require('../utils'); // Import the function

const parser = new Parser();

// Dynamically load configuration based on an environment variable
const feedConfigPath = process.env.FEED_CONFIG_PATH;
const feedUrls = require(feedConfigPath);
const localFile = process.env.LOCAL_FILE;
const MAX_ITEMS = parseInt(process.env.MAX_ITEMS, 10);

async function fetchFeed(feedUrl) {
  if (feedUrl.off) {
    console.log(`Skipping feed ${feedUrl.url} because it is marked as off.`);
    return [];
  }

  try {
    const feed = await parser.parseURL(feedUrl.url);
    return feed.items.map(item => ({
      ...item,
      source: feedUrl.name,
      cutoffDate: feedUrl.cutoffDate,
      exclusionWords: feedUrl.exclusionWords || [],
      inclusionWords: feedUrl.inclusionWords || [],
      undefinedTitle: feedUrl.undefinedTitle,
      getContentLink: feedUrl.getContentLink,
      titleHide: feedUrl.titleHide || []
    }));
  } catch (error) {
    console.error(`Error fetching feed ${feedUrl.url}:`, error);
    return [];
  }
}

async function filterAndUpdateFeed() {
  try {
    const allFeedItems = (await Promise.all(feedUrls.map(fetchFeed))).flat();

    // Deduplicate items based on GUID
    const uniqueFeedItems = [];
    const guidSet = new Set();

    allFeedItems.forEach(item => {
      if (!guidSet.has(item.guid)) {
        guidSet.add(item.guid);
        uniqueFeedItems.push(item);
      } else {
        console.log(`Removing duplicate item with GUID: ${item.guid}`);
      }
    });

    let localFeed;
    if (fs.existsSync(localFile)) {
      const localData = fs.readFileSync(localFile, 'utf8');
      localFeed = await xml2js.parseStringPromise(localData);
    } else {
      localFeed = { rss: { channel: [{ item: [] }] } };
    }

    if (!localFeed.rss) localFeed.rss = {};
    if (!localFeed.rss.channel) localFeed.rss.channel = [{}];
    if (!localFeed.rss.channel[0].item) localFeed.rss.channel[0].item = [];

    const newItems = uniqueFeedItems.filter(item => {
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
        (item.cutoffDate && pubDate <= item.cutoffDate);

      const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

      if (isExcluded) {
        console.log(`Excluding item due to exclusion words or cutoff date: ${String(processedTitle)}`);
      } else if (isDuplicate) {
        console.log(`Excluding item due to duplication: ${String(processedTitle)}`);
      } else {
        if (typeof processedTitle === 'string') {
          console.log(`Including item: ${processedTitle}`);
        } else {
          console.log(`processedTitle is not a valid string.`);
        }
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
      // Ensure link is not null or empty
      if (!link || typeof link !== 'string' || link.trim() === '') {
        console.error(`Invalid link for item with title "${item.title}":`, link);
        return;
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