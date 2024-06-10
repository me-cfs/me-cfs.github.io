console.log("html_to_rss.js started");
import { formatDate, stripHtmlTags, extractBaseUrl } from './utils.js';
console.log("Imports completed");

// const rssFeed = "url";
// const useBaseUrl = true / false;

const ITEMS_PER_PAGE = 10; // Number of items to load per page
const MAX_ITEMS_CLIENT = 100; // Maximum number of items to process client side
let currentIndex = 0;
let allItems = [];

async function fetchFeed(url) {
    console.log(`Fetching feed from: ${url}`);
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");

    const items = Array.from(xmlDoc.querySelectorAll("item")).map(item => ({
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent,
        author: item.querySelector("author") ? item.querySelector("author").textContent : 'Unknown author',
        guid: item.querySelector("guid").textContent,
        pubDate: item.querySelector("pubDate").textContent
    })).slice(0, MAX_ITEMS_CLIENT);

    console.log(`Parsed items:`, items);
    return { items };
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
        console.log('Processing item:', item); // Log the item being processed
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        const title = document.createElement('h2');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = stripHtmlTags(item.title);
        title.appendChild(link);
        
        const meta = document.createElement('small');
        let author = item.author;
        if (!useBaseUrl) {
            author = extractBaseUrl(item.link);
        }
        console.log('Item author:', author); // Log the source being assigned
        meta.textContent = `${author}, ${formatDate(new Date(item.pubDate))}`;

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