const rssFeeds = [
    'https://www.google.com/alerts/feeds/00974591944495763896/11815415262763445760'
    // Add more feeds as needed
];

const ITEMS_PER_PAGE = 10; // Number of items to load per page
let currentIndex = 0;
let allItems = [];

function getCurrentTimestamp() {
    return new Date().toISOString();
}

async function fetchFeed(url) {
    const timestamp = getCurrentTimestamp();
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&timestamp=${new Date().getTime()}`);
    const data = await response.json();
    console.log(`[${timestamp}] Fetched data from URL: ${url}`, data);
    return data;
}

function extractBaseUrl(googleRedirectUrl) {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] Extracting base URL from: ${googleRedirectUrl}`);
    try {
        const url = new URL(googleRedirectUrl);
        const targetUrl = url.searchParams.get('url');
        if (!targetUrl) {
            throw new Error("Target URL not found in Google redirect URL.");
        }
        const targetUrlObj = new URL(targetUrl);
        const baseUrl = targetUrlObj.hostname.replace('www.', '');
        console.log(`[${timestamp}] Base URL extracted: ${baseUrl}`);
        return baseUrl;
    } catch (error) {
        console.error(`[${timestamp}] Error extracting base URL from: ${googleRedirectUrl}`, error);
        return "Unknown Source";
    }
}

function decodeHtmlEntities(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}

async function loadFeeds() {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] Loading feeds...`);
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

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    // Add suffix to day
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return formattedDate.replace(/\d+/, day + suffix);
}

// Add event listener to the "Load More" button
document.getElementById('load-more-button').addEventListener('click', loadFeeds);

// Initial load
loadFeeds();