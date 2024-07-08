// utils file in node.js export language -- urgh JS is confusing
const Parser = require('rss-parser');
const parser = new Parser();

function getOneWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  const options = { month: 'long', day: 'numeric' };
  const dateString = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  let suffix;

  if (day >= 11 && day <= 13) {
    suffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }

  return dateString.replace(day, day + suffix);
}

function removeHiddenWords(title, titleHide) {
  if (typeof title !== 'string') return '';

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

function extractBaseUrl(url) {
    console.log(`Extracting base URL from: ${url}`);
    try {
        const parsedUrl = new URL(url);
        let baseUrl;

        // Check if it's a Google redirect URL
        if (parsedUrl.hostname.includes('google') && parsedUrl.searchParams.get('url')) {
            const targetUrl = parsedUrl.searchParams.get('url');
            const targetUrlObj = new URL(targetUrl);
            baseUrl = targetUrlObj.hostname.replace('www.', '');
            console.log(`Base URL extracted from Google redirect: ${baseUrl}`);
        } else {
            // Handle normal URL
            baseUrl = parsedUrl.hostname.replace('www.', '');
            console.log(`Base URL extracted: ${baseUrl}`);
        }

        return baseUrl;
    } catch (error) {
        console.error(`Error extracting base URL from: ${url}`, error);
        return "Unknown Source";
    }
}

module.exports = {
  getOneWeekAgoDate,
  removeHiddenWords,
  fetchFeed,
  extractBaseUrl
  // Other exports if needed
};