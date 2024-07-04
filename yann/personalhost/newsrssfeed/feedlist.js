const { getOneWeekAgoDate } = require('../dev/node_utils.js');


// feedUrls.js
// name: The name of the news source, displayed under title
// url: "url" the URL of the RSS feed to import from
// cutoffDate: Only consider items for import if newer than curoffDaye
// exclusionWords: [] If any found in title, item excluded
// inclusionWords: [] If no title found, and has items, only include if contents tag matches with one of these
// undefinedTitle: "" If this var defined, and no title tag provided, this string replaces it
// getContentLink: "" If this var defined, and there is content tag, link tag will be replaced by first url in content that finds this link
// titleHide: [] Contains strings that should be cut off from title
// off: true/false If True, stops adding items from the feed

module.export = [
  { 
    name: 'Le Monde Grand Titres', 
    url: 'https://politepol.com/fd/h1nNFk7PQ0iW.xml’,
  },
  {
    name: 'BBC News Australia Mentions’,
    url: ‘https://feeds.bbci.co.uk/news/world/australia/rss.xml', 
  },
  { 
    name: 'EURACTIV - Circular Economy Mentions', 
    url: 'https://www.euractiv.com/sections/circular-economy/feed/‘,
  },
  { 
    name: ‘Politico EUROPE', 
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml', 
  },
  { 
    name: 'Chapatte Dessins', 
    url: ‘https://www.chappatte.com/images/feed/‘,
  },
  { 
    name: 'Economist the World this Week', 
    url: 'https://www.economist.com/the-world-this-week/rss.xml', 
   titleReplace: [{original: ‘Politics’, replace: ‘The world this week: Politics'}, {original: 'Buisness', replace: 'The world this week: Buisness'}],
  },
  { 
    name: 'WorldPost (Huffington)’,
    url: 'http://www.huffingtonpost.com/feeds/verticals/world/index.xml’,
  },
  { 
    name: ‘Monbiot Guardian’,
    url: 'http://www.guardian.co.uk/profile/georgemonbiot/rss’,
  },
  {
    name: 'Krugman - NYT',
    url: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/column/paul-krugman/rss.xml',
  },
{ 
    name: ‘Economist’,
    url: 'https://rssfilter-a7aj2utffa-uc.a.run.app/feed?title_reject=Podcast&url=https://feedx.net/rss/economist.xml’,
  },
{ 
    name: ‘Healthcare - The Hill’,
    url: 'https://thehill.com/policy/healthcare/feed/‘,
  },
{ 
    name: ‘Climate Change - The Hill’,
    url: 'https://thehill.com/social-tags/climate-change/feed/‘,
  },
{ 
    name: ‘Fivethirtyeight’,
    url: 'http://espn.go.com/espnradio/feeds/rss/podcast.xml?id=14554755’,
  },
{ 
    name: ‘Axios’,
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=business’,
  },
{ 
    name: ‘BBC - Fiji’,
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml’,
  },
{ 
    name: ‘RTS Headlines’,
    url: 'https://www.rts.ch/info/suisse?format=rss/news’,
  },
];