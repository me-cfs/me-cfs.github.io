const rssFeeds = [
    'https://rss.app/feeds/t0Dar24AbXRhNyR1.xml',
    // Add more feeds as needed
];

const ITEMS_PER_PAGE = 10; // Number of items to load per page
let currentIndex = 0;
let allItems = [];

async function fetchFeed(url) {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
}

async function loadFeeds() {
    console.log("Loading feeds...");
    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more-button');

    if (currentIndex === 0) {
        // Only fetch feeds if this is the first load
        for (const feed of rssFeeds) {
            try {
                const feedData = await fetchFeed(feed);
                const feedTitle = feedData.feed.title;

                const items = feedData.items.map(item => ({
                    ...item,
                    feedTitle: feedTitle
                }));
                allItems = allItems.concat(items);
                console.log(`Fetched ${items.length} items from feed: ${feedTitle}`);
            } catch (error) {
                console.error(`Error fetching feed: ${feed}`, error);
            }
        }

        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        console.log("All items loaded and sorted:", allItems);
    }

    console.log("allItems length =", allItems.length);

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
    console.log("Current index after loading items:", currentIndex);

    // Hide the "Load More" button if all items are loaded
    if (currentIndex >= allItems.length) {
        loadMoreButton.style.display = 'none';
        console.log("All items loaded, hiding load more button.");
    } else {
        loadMoreButton.style.display = 'block';
        console.log("More items available, showing load more button.");
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