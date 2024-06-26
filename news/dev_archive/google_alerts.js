console.log("script.js Started!");
import { formatDate } from './utils.js';
console.log("Imported functions");

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
        console.log('First load, fetching feed...');
        try {
            const feedData = await fetchFeed(rssFeed);
            allItems = feedData.items;

            console.log('All items before sorting:', allItems);
            allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            console.log('All items after sorting:', allItems);
        } catch (error) {
            console.error(`Error fetching feed:`, error);
        }
    }

    const nextItems = allItems.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
    console.log('Next items to display:', nextItems);

    nextItems.forEach(item => {
        console.log('Processing item:', item);

        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        const title = document.createElement('h2');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;  // Display item.title instead of item.source
        title.appendChild(link);
        
        const meta = document.createElement('small');
        const source = item.source || item.author || 'Unknown Source';
        console.log(`Item source: ${item.source}`);
        meta.textContent = `${source}, ${formatDate(new Date(item.pubDate))}`;

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
