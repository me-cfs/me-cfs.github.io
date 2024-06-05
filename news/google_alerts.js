import { getCurrentTimestamp, extractBaseUrl, decodeHtmlEntities, formatDate } from './utils.js';

const ITEMS_PER_PAGE = 18; // Number of items to load per page
let currentIndex = 0;
let allItems = [];

async function fetchFeed(url, retries = 3, delay = 5000) {
    const timestamp = getCurrentTimestamp();
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&timestamp=${new Date().getTime()}`);
            const data = await response.json();
            if (data.status === 'error' && data.message === 'This feed is being processed, please wait') {
                console.log(`[${timestamp}] Feed is being processed, retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.log(`[${timestamp}] Fetched data from URL: ${url}`, data);
                return data;
            }
        } catch (error) {
            console.error(`[${timestamp}] Error fetching feed: ${url}`, error);
            if (i === retries - 1) {
                throw error; // Rethrow error if no retries left
            } else {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error('Failed to fetch feed after multiple attempts');
}

async function loadFeeds() {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] Loading feeds...`);
    const rssFeeds = window.rssFeeds; // Accessing the feeds defined in the HTML

    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more-button');

    if (currentIndex === 0) {
        // Only fetch feeds if this is the first load
        for (const feed of rssFeeds) {
            try {
                const feedData = await fetchFeed(feed);
                const items = feedData.items.map(item => {
                    const feedTitle = extractBaseUrl(item.link);
                    console.log(`[${timestamp}] Extracted base URL: ${feedTitle} for item link: ${item.link}`);
                    return {
                        ...item,
                        title: decodeHtmlEntities(item.title),  // Decode HTML entities in the title
                        feedTitle: feedTitle
                    };
                });
                allItems = allItems.concat(items);
                console.log(`[${timestamp}] Fetched ${items.length} items from feed`);
            } catch (error) {
                console.error(`[${timestamp}] Error fetching feed: ${feed}`, error);
            }
        }

        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        console.log(`[${timestamp}] All items loaded and sorted:`, allItems);
    }

    console.log(`[${timestamp}] allItems length =`, allItems.length);

    const nextItems = allItems.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    nextItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        const title = document.createElement('h2');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        title.appendChild(link);
        
        const meta = document.createElement('small');
        meta.textContent = `${item.feedTitle}, ${formatDate(new Date(item.pubDate))}`;

        newsItem.appendChild(title);
        newsItem.appendChild(meta);

        newsContainer.appendChild(newsItem);
    });

    currentIndex += ITEMS_PER_PAGE;
    console.log(`[${timestamp}] Current index after loading items:`, currentIndex);

    // Hide the "Load More" button if all items are loaded
    if (currentIndex >= allItems.length) {
        loadMoreButton.style.display = 'none';
        console.log(`[${timestamp}] All items loaded, hiding load more button.`);
    } else {
        loadMoreButton.style.display = 'block';
        console.log(`[${timestamp}] More items available, showing load more button.`);
    }
}

// Add event listener to the "Load More" button
document.getElementById('load-more-button').addEventListener('click', loadFeeds);

// Initial load
loadFeeds();