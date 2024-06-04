console.log("JS Started!");
import { formatDate } from './utils.js';
console.log("Imported functions");

const rssFeeds = [
    'https://thesicktimes.org/feed/',
    'https://politepol.com/fd/yNgKhc4c7HHu.xml',
    'https://www.healthrising.org/feed/',
    'https://politepol.com/fd/uu29e43WxMVl.xml',
    'https://politepol.com/fd/jyPhRAUUwOqs.xml',
    'https://politepol.com/fd/7Jrlm0Y5ncxC.xml',
    // Add more feeds as needed
];

const ITEMS_PER_PAGE = 10; // Number of items to load per page
let currentIndex = 0;
let allItems = [];

async function fetchFeed(url) {
    console.log(`Fetching feed from: ${url}`);
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    console.log(`Fetched data:`, data);
    return data;
}

async function loadFeeds() {
    console.log('Loading feeds...');
    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more-button');

    if (currentIndex === 0) {
        console.log('First load, fetching all feeds...');
        // Only fetch feeds if this is the first load
        for (const feed of rssFeeds) {
            try {
                const feedData = await fetchFeed(feed);
                let feedTitle = feedData.feed.title;

                // Check for the specific feed title and change it
                if (feedTitle === "David Tuller's Posts | Virology Blog") {
                    feedTitle = "Virology";
                }
                if (feedTitle === "ME/CFS Research Review – Simon McGrath explores the big biomedical stories") {
                    feedTitle = "ME/CFS Research Review";
                }
                if (feedTitle === "Weekly ME news in brief | Science for ME") {
                    feedTitle = "Science for ME";
                }
                if (feedTitle === "ME/CFS - Canary") {
                    feedTitle = "The Canary";
                }

                const items = feedData.items.map(item => ({
                    ...item,
                    feedTitle: feedTitle
                }));
                allItems = allItems.concat(items);
            } catch (error) {
                console.error(`Error fetching feed ${feed}:`, error);
            }
        }

        console.log('All items before sorting:', allItems);
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        console.log('All items after sorting:', allItems);
    }

    const nextItems = allItems.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    console.log('Next items to display:', nextItems);

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
    console.log(`Current index: ${currentIndex}`);

    // Hide the "Load More" button if all items are loaded
    if (currentIndex >= allItems.length) {
        loadMoreButton.style.display = 'none';
        console.log('All items loaded, hiding Load More button');
    } else {
        loadMoreButton.style.display = 'block';
        console.log('Items remaining, showing Load More button');
    }
}

// Add event listener to the "Load More" button
document.getElementById('load-more-button').addEventListener('click', loadFeeds);

// Initial load
loadFeeds();