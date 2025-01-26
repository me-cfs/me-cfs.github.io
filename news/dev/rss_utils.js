// according to chatgpt this is written in node.js

const fs = require('fs');
const xml2js = require('xml2js');
const { removeHiddenWords, extractBaseUrl } = require('../dev/node_utils.js');

async function loadLocalFeed(localFile) {
  if (fs.existsSync(localFile)) {
    const localData = fs.readFileSync(localFile, 'utf8');
    return await xml2js.parseStringPromise(localData);
  } else {
    return { rss: { channel: [{ item: [] }] } };
  }
}

function deduplicateItems(items) {
  const uniqueFeedItems = [];
  const guidSet = new Set();

  items.forEach(item => {
    if (!guidSet.has(item.guid)) {
      guidSet.add(item.guid);
      uniqueFeedItems.push(item);
    } else {
      console.log(`Removing duplicate item with GUID: ${item.guid}`);
    }
  });

  return uniqueFeedItems;
}

// filters the list of feed items based on criteria
function filterItems(items, localFeed, addAuthorTitle) {
  return items.filter(item => {
    console.log(JSON.stringify(item));
    // extract: title, content, and pubDate
    let title = item.title || null;
    const content = item.content ? item.content.toLowerCase() : '';
    const pubDate = item.pubDate ? new Date(item.pubDate) : null;

    // Check at least has both title and pubDate
    if (!title) {
      if (!content) {
        console.log(`Excluding item due to missing title: ${JSON.stringify(item)}`);
        return false;
      } else {
        let title = content;
      }
    }
    if (!pubDate) {
      console.log(`Excluding item due to missing pubDate: ${JSON.stringify(item)}`);
      return false;
    }

    // Filter inclusionWords
    if (item.inclusionWords && item.inclusionWords.length > 0) {
      const lowercaseInclusionWords = item.inclusionWords.map(word => word.toLowerCase());

      if (title) {
        const hasInclusionWords = lowercaseInclusionWords.some(word => title.toLowerCase().includes(word));
        if (!hasInclusionWords) {
          console.log(`Excluding item due to title not having inclusion words: ${JSON.stringify(item)}`);
          return false;
        }
      } else if (content) {
        const hasInclusionWords = lowercaseInclusionWords.some(word => content.includes(word));
        if (hasInclusionWords) {
          title = item.undefinedTitle; // Make sure this is what you want
        } else {
          console.log(`Excluding item due to content not having inclusion words: ${JSON.stringify(item)}`);
          return false;
        }
      } else {
        console.log(`Excluding item due to missing title and content: ${JSON.stringify(item)}`);
        return false;
      }
    }

    // Remove hidden words from title
    let processedTitle = removeHiddenWords(title, item.titleHide);

    // Check if minCharsTitle exists and filter by it
    if (item.minCharsTitle && typeof item.minCharsTitle === 'number') {
      if (processedTitle.length < item.minCharsTitle) {
        console.log(`Excluding item due to title length being too small (${item.minCharsTitle}): ${processedTitle}`);
        return false;
      }
    }

    // Add author at the end if requested
    if (addAuthorTitle && item.source && typeof item.source === 'string') {
      processedTitle = `${processedTitle} (${item.source})`;
    }

    // Check no exclusion words or date problems
    const isExcluded = item.exclusionWords.some(word => processedTitle.toLowerCase().includes(word.toLowerCase())) ||
      (item.cutoffDate && pubDate <= item.cutoffDate);

    // Make sure it isn't a duplicate
    const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

    if (isExcluded || isDuplicate) {
      console.log(`Excluding item due to Exclusion words or Duplicate, ${String(processedTitle)}`);
      return false;
    }

    // Check base URL isn't in blacklist
    if (item.urlBlacklist && item.urlBlacklist.length > 0) {
      const itemBaseUrl = extractBaseUrl(item.link);
      const isBlacklisted = item.urlBlacklist.some(blacklistedUrl => itemBaseUrl.includes(blacklistedUrl));
      if (isBlacklisted) {
        console.log(`Excluding item due to blacklisted URL: ${item.link}`);
        return false;
      }
    }

    item.processedTitle = processedTitle;
    return true;
  });
}

// Adds item to the local RSS Feed
function addItemToLocalFeed(item, localFeed) {
  let link = item.link; // define article link

  // if item has a "getContentlink", try to extract content link from content string
  if (item.getContentLink && item.content) {
    const regex = new RegExp(`(${item.getContentLink}[^\\s"']+)`, 'g');
    const matches = item.content.match(regex);
    if (matches && matches.length > 0) {
      link = matches[0];
    }
  }

  // make sure the link is in proper format
  if (!link || typeof link !== 'string' || link.trim() === '') {
    console.error(`Invalid link for item with title "${item.title}":`, link);
    return;
  }

  // make sure the GUID is proper format
  if (!item.guid || typeof item.guid !== 'string' || item.guid.trim() === '') {
    console.error(`Invalid guid for item with title "${item.title}":`, item.guid);
    return;
  }

  // add the new item to the local feed
  localFeed.rss.channel[0].item.push({
    title: [item.processedTitle || item.content],
    link: [link],
    author: [item.source],
    guid: [item.guid],
    pubDate: [item.pubDate]
  });
}

function saveLocalFeed(localFeed, localFile) {
  const builder = new xml2js.Builder();
  const updatedXml = builder.buildObject(localFeed);
  fs.writeFileSync(localFile, updatedXml);
}

module.exports = {
  loadLocalFeed,
  deduplicateItems,
  filterItems,
  addItemToLocalFeed,
  saveLocalFeed
};