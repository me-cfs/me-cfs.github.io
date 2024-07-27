// feedUrls.js

// Basic Info
// name: The name of the news source, displayed under title
// url: "url" the URL of the RSS feed to import from


module.exports = [
  { 
    name: 'Le Monde Grand Titres', 
    url: 'https://politepol.com/fd/j3wSX3mDHgfE.xml',
    exclusionWords: ['Tour de France'],
    off: true,
  },
  {
    name: 'BBC News Australia Mentions',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml', 
    off: false,
    exclusionWords: ['assault', 'rape'],
  },
  { 
    name: 'EURACTIV - Circular Economy Mentions', 
    url: 'https://www.euractiv.com/sections/circular-economy/feed/',
    off: true,
  },
  { 
    name: 'Politico EUROPE', 
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml', 
    off: false,
    urlBlacklist: ['politico.com']
  },
  { 
    name: 'Chapatte Dessins', 
    url: 'https://www.chappatte.com/images/feed/',
    off: false,
  },
  { 
    name: 'Economist the World this Week', 
    url: 'https://www.economist.com/the-world-this-week/rss.xml', 
    titleReplace: [{original: 'Politics', replace: 'The world this week: Politics'}, {original: 'Business', replace: 'The world this week: Business'}],
    off: false,
  },
  { 
    name: 'WorldPost (Huffington)',
    url: 'https://politepol.com/fd/JvzTMgPr0nym.xml',
    off: false,
    exclusionWords: ['Hilarious'],
  },
  { 
    name: 'Monbiot Guardian',
    url: 'http://www.guardian.co.uk/profile/georgemonbiot/rss',
    off: false,
  },
  {
    name: 'Krugman - NYT',
    url: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/column/paul-krugman/rss.xml',
    off: false,
  },
  { 
    name: 'Economist',
    url: 'https://rssfilter-a7aj2utffa-uc.a.run.app/feed?title_reject=Podcast&url=https://feedx.net/rss/economist.xml',
    off: false,
  },
  { 
    name: 'Healthcare - The Hill',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
  },
  { 
    name: 'Climate Change - The Hill',
    url: 'https://thehill.com/social-tags/climate-change/feed/',
    off: false,
  },
  { 
    name: 'Fivethirtyeight',
    url: 'https://politepol.com/fd/YfE8PdyBSYNz.xml',
    off: false,
    exclusionWords: ['Podcast', 'Quiz'],
  },
  { 
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: ['Hurricane', 'Tropical Storm',
      'Paramount', 'Skydance', 'Fact Check: Biden',
      'fans', 'collection:', 'peggy', 'Simone', 'LeBron',
      'NBA', 'NFL', 'Warner',
    ],
  },
  { 
    name: 'BBC - Fiji',
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml',
    off: false,
    exclusionWords: ['assault', 'rape'],
  },
  { 
    name: 'RTS Headlines',
    url: 'https://www.rts.ch/info/suisse?format=rss/news',
    off: false,
    exclusionWords: ['bouchon'],
  },
  { 
    name: 'ME/LC News',
    url: 'https://me-cfs.github.io/news/rss/community.xml',
  },
  { 
    name: 'The Athletic Football',
    url: 'https://www.nytimes.com/athletic/rss/football/',
    inclusionWords: ['PSG', 'Paris', 'Switzerland', 'France', 'Australia', 'Xhaka', 'Sommer', 'Lausanne', 'Embolo',
      'Zakaria',
    ],
  },
  {
    name: 'NYT Most Viewed',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml',
  },
  {
    name: 'Euronews France -- Le plus grand titre',
    url: 'https://politepol.com/fd/LcHcJqeI4RKt.xml',
    off: true,
  },
];