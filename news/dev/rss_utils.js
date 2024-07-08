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

function filterItems(items, localFeed) {
  return items.filter(item => {
    let title = item.title || null;
    const content = item.content ? item.content.toLowerCase() : '';
    const pubDate = item.pubDate ? new Date(item.pubDate) : null;
    
    // filter inclusionWords
    if (item.inclusionWords && item.inclusionWords.length > 0) {
        const lowercaseInclusionWords = item.inclusionWords.map(word => word.toLowerCase());
        
        if (title) {
            const hasInclusionWords = lowercaseInclusionWords.some(word => title.toLowerCase().includes(word));
            if (!hasInclusionWords) {
                console.log(`Excluding item due to title not having inclusion words: ${JSON.stringify(item)}`);
                return false;
            }
        } else if (content) {
            const hasInclusionWords = lowercaseInclusionWords.some(word => content.toLowerCase().includes(word));
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

    //check atleast has both title and pubdate
    if (!title || !pubDate) {
      console.log(`Excluding item due to missing title or pubDate: ${JSON.stringify(item)}`);
      return false;
    }

    // remove hidden words from title
    const processedTitle = removeHiddenWords(title, item.titleHide);
    
    // Check no exclusion words or date problems
    const isExcluded = item.exclusionWords.some(word => processedTitle.toLowerCase().includes(word.toLowerCase())) ||
      (item.cutoffDate && pubDate <= item.cutoffDate);
    
    // make sure isn't duplicate
    const isDuplicate = localFeed.rss.channel[0].item.some(localItem => localItem.guid && localItem.guid[0] === item.guid);

    if (isExcluded || isDuplicate) {
      console.log(`Excluding item: ${String(processedTitle)}`);
      return false;
    }
    
    // check baseurl isn't in blacklist
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

function addItemToLocalFeed(item, localFeed) {
  let link = item.link;
  if (item.getContentLink && item.content) {
    const regex = new RegExp(`(${item.getContentLink}[^\\s"']+)`, 'g');
    const matches = item.content.match(regex);
    if (matches && matches.length > 0) {
      link = matches[0];
    }
  }

  if (!link || typeof link !== 'string' || link.trim() === '') {
    console.error(`Invalid link for item with title "${item.title}":`, link);
    return;
  }

  if (!item.guid || typeof item.guid !== 'string' || item.guid.trim() === '') {
    console.error(`Invalid guid for item with title "${item.title}":`, item.guid);
    return;
  }

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