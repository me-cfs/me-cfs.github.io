const rssFeeds = [
    'https://thesicktimes.org/feed/',
    'https://politepol.com/fd/yNgKhc4c7HHu.xml',
    'https://www.healthrising.org/feed/',
    'https://politepol.com/fd/uu29e43WxMVl.xml',
    'https://politepol.com/fd/jyPhRAUUwOqs.xml',
    // Add more feeds as needed
];

async function fetchFeed(url) {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
}

function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

async function loadFeeds() {
    const newsContainer = document.getElementById('news-container');
    let allItems = [];

    for (const feed of rssFeeds) {
        const feedData = await fetchFeed(feed);
        let feedTitle = feedData.feed.title;
        
        // Check for the specific feed title and change it
        if (feedTitle === "David Tuller's Posts | Virology Blog") {
            feedTitle = "Virology";
        }
        if (feedTitle === "ME/CFS Research Review – Simon McGrath explores the big biomedical stories"){
            feedTitle = "ME/CFS Research Review";
        }

        const items = feedData.items.map(item => ({
            ...item,
            feedTitle: feedTitle
        }));
        allItems = allItems.concat(items);
    }

    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    allItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        const title = document.createElement('h2');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = `${item.feedTitle}: ${item.title}`;
        title.appendChild(link);
        
        const description = document.createElement('p');
        description.textContent = stripHtml(item.description);

        const pubDate = document.createElement('small');
        pubDate.textContent = new Date(item.pubDate).toLocaleString();

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(pubDate);

        newsContainer.appendChild(newsItem);
    });
}

loadFeeds();