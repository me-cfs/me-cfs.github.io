// feedUrls.js
const medicalNews = require('./medical-news.js');
const tList = require('./topical-lists.js')

module.exports = [
  {
    name: 'The Athletic Football',
    url: 'https://www.nytimes.com/athletic/rss/football/',
    inclusionWords: [...tList.sportsInterested],
    exclusionWords: ['USWNT'],
  },
  {
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: [
      'Hurricane', 'Tropical Storm', 'Paramount', 'Skydance',
      'Fact Check: Biden', 'fans', 'collection:', 'peggy',
      'Simone', 'Warner', 'soccer', ...tList.business,
      'Why the', ...tList.fluffyTitle, ...tList.nonInformativeTitle,
      ...tList.uninterestedGeneral, ...tList.uninterestedPeople, ...tList.uninterestedSports, 
      'Sunday Snapshot', 'blaze', 'winds', 'charged with'
    ],
    minCharsTitle: 15,
  },
  {
    name: 'BBC - Australia',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml',
    off: false,
    exclusionWords: [...tList.uninterestedGeneral, ...tList.singleCrime, ...tList.fluffyTitle,
      'Australia Debut',
    ],
  },
  {
    name: 'BBC - Fiji',
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml',
    off: false,
    exclusionWords: [...tList.singleCrime],
  },
  {
    name: 'Bellingcat',
    url: 'https://www.bellingcat.com/feed/',
    off: false,
  },
  {
    name: 'Chapatte Dessins',
    url: 'https://www.chappatte.com/images/feed/',
    off: false,
  },
  {
    name: 'Economist',
    url: 'https://feedx.net/rss/economist.xml',
    exclusionWords: ['in brief', ...tList.nonArticle, ...tList.uninterestedSports, 'culture', ...tList.business,
       'obituary', ...tList.fluffyTitle,
    ],
    off: false,
  },
  {
    name: 'Economist the World this Week',
    url: 'https://www.economist.com/the-world-this-week/rss.xml',
    titleReplace: [
      { original: 'Politics', replace: 'The world this week: Politics' },
      { original: 'Business', replace: 'The world this week: Business' },
    ],
    off: false,
  },
  {
    name: 'EURACTIV - Circular Economy Mentions',
    url: 'https://www.euractiv.com/sections/circular-economy/feed/',
    off: false,
  },
  {
    name: 'Fivethirtyeight',
    url: 'https://politepol.com/fd/F5Y3tB1o97oW.xml',
    off: false,
    exclusionWords: [...tList.nonArticle],
    cutoffDate: new Date('2024-12-10')
  },
  {
    name: 'Guardian -- George Monbiot',
    url: 'http://www.guardian.co.uk/profile/georgemonbiot/rss',
    off: false,
  },
  {
    // Huffington Post (World Post)
    name: 'Huffington Post',
    url: 'https://politepol.com/fd/JvzTMgPr0nym.xml',
    off: false,
    exclusionWords: ['hilarious', 'spirit of', 'most beautiful', ...tList.uninterestedGeneral, ...tList.nonInformativeTitle, ...tList.triggers],
  },
  {
    name: 'ME/LC News',
    url: 'https://me-cfs.github.io/news/rss/community.xml',
  },
  {
    // Most Viewed
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml',
    exclusionWords: [...tList.fluffyTitle, ...tList.uninterestedGeneral, ...tList.nonInformativeTitle],
  },
  {
    name: 'Paul Krugmann',
    url: 'https://paulkrugman.substack.com/feed',
    off: false,
  },
  {
    // Only Europe
    name: 'Politico',
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml',
    off: false,
    urlBlacklist: ['politico.com'],
    exclusionWords: ['boxing', 'how', '?', 'days', ...tList.fluffyTitle, 'most poweful', ...tList.clickbait,
      ...tList.uninterestedGeneral, 'went wrong', 
    ],
    minCharsTitle: 15,
  },
  {
    // headlines
    name: 'RTS',
    url: 'https://www.rts.ch/info/suisse?format=rss/news',
    off: false,
    exclusionWords: [...tList.uninterestedGeneral, 'pour vous?', ...tList.nonArticle, 'insomnie', ...tList.culture],
  },
  {
    name: 'Science Based Medicine',
    url: 'http://www.sciencebasedmedicine.org/?feed=rss2',
    exclusionWords: ['?', 'questions'],
    minCharsTitle: 12,
  },

  // Depreciation Phase

  { // hill being depreciated because corporate biased and  ownership company donates to the GOP mostpo qwerty
    // climate change
    name: 'The Hill',
    url: 'https://thehill.com/social-tags/climate-change/feed/',
    off: false,
    inclusionWords: [...tList.usPolitics],
    exclusionWords: [...tList.nonInformativeTitle],
  },
  {
    // healthcare 
    name: 'The Hill',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
    inclusionWords: [...tList.usPolitics],
    exclusionWords: ['rage', ...tList.nonInformativeTitle, ...tList.clickbait],
  },
  ...medicalNews,

  // Testing Phase

 {
    name: 'Amnesty International',
    url: 'https://www.amnesty.org/en/rss/',
    inclusionWords: [...tList.important, ...tList.location, ...tList.disability, ...tList.cybersecurity],
  },
 {
    name: 'AP News',
    url: 'https://feedx.net/rss/ap.xml',
    inclusionWords: [...tList.disability, ...tList.scienceResearch, ...tList.medicine, ...tList.humanRights,
      
    ],
  },
  {
    name: 'Arstechnica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    inclusionWords: [...tList.technology, ...tList.prehistory, ...tList.environment],
  },
  {
    name: 'Byline Times',
    url: 'https://bylinetimes.com/feed/',
    inclusionWords: [...tList.activism, 'lobbying', 'corperate', ...tList.cybersecurity],
  },
  {
    name: 'The Conversation',
    url: 'https://theconversation.com/articles.atom',
    inclusionWords: ['microbiology', 'anarchism', 'astrobio', ...tList.prehistory, ...tList.medicine,
      ...tList.activism, ...tList.independenceMovements,
    ],
  },
  {
    name: 'Crikey',
    url: 'https://www.crikey.com.au/feed/',
    inclusionWords: [...tList.activism, ...tList.geopolitics],
    exclusionWords: [...tList.clickbait],
  },
  {
    name: 'CrimethInc',
    url: 'https://crimethinc.com/feed',
    exclusionWords: [...tList.nonArticle, ...tList.democraticParty],
  },
  {
    name: 'The Equal Times',
    url: 'https://www.equaltimes.org/spip.php?page=backend&lang=fr',
    inclusionWords: [...tList.environment, ...tList.sportsInterested, ...tList.important, ...tList.socialism,
      ...tList.medicine,
    ],
  },
  {
    name: 'Grist',
    url: 'https://grist.org/feed/',
    off: false,
    inclusionWords: [...tList.usPolitics, ...tList.environment],
  },
 {
    name: 'Human Rights Watch',
    url: 'https://www.hrw.org/rss',
    inclusionWords: [...tList.disability, ...tList.location, ...tList.ukraineRussia],
  },
  {
    name: 'Inside Climate News',
    url: 'https://insideclimatenews.org/feed/',
    inclusionWords: [...tList.environment, ...tList.scienceResearch],
  },
  {
    name: 'Indian Country Today',
    url: 'https://indiancountrytoday.com/.rss/full/',
    inclusionWords: [...tList.environment, ...tList.activism],
    // feed problems. seems to work on rss reder tho
  },
  {
    name: 'The Intercept',
    url: 'https://theintercept.com/feed/?rss',
    inclusionWords: [...tList.geopolitics, ...tList.israelPalestine, "open"],
  },
  {
    name: 'Jacobin',
    url: 'https://jacobinmag.com/feed/',
    inclusionWords: ['Suicide', ...tList.disability, ...tList.socialism, ...tList.history],
  },
  {
    name: 'KFF Health News',
    url: 'https://kffhealthnews.org/feed/',
    inclusionWords: [...tList.disability, ...tList.medicine, ...tList.usPolitics, 'rural', 'aca', 'ada'],
    exclusionWords: [...tList.spanish],
  },
 {
    name: 'Motherjones',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: [...tList.activism, ...tList.important, ...tList.disability, ...tList.politics],
  },
 {
    name: 'Orient XXI',
    url: 'https://orientxxi.info/?page=backend&lang=fr',
    inclusionWords: [...tList.disability, ...tList.location, ...tList.important, ...tList.environment, ...tList.independenceMovements],
  },
  {
    name: 'Open Democracy',
    url: 'https://www.opendemocracy.net/en/feed/',
    inclusionWords: [...tList.europe, ...tList.politics, ...tList.environment, ...tList.independenceMovements],
    exclusionWords: [...tList.nonArticle, ...tList.nonInformativeTitle, ...tList.culture],
  },
  {
    name: 'Propublica',
    url: 'https://feeds.propublica.org/propublica/main',
    inclusionWords: [...tList.medicine, 'Idaho'],
  },
  {
    name: 'Public Eye',
    url: 'https://www.publiceye.ch/fr/rssNews.xml',
    inclusionWords: [...tList.technology, ...tList.disability, ...tList.environment],
  },
  {
    name: 'RFI',
    url: 'https://www.rfi.fr/france/rss',
    inclusionWords: [...tList.location, ...tList.politics],
    exclusionWords: [...tList.fluffyTitle],
  },
  {
    name: 'SBS News',
    url: 'https://www.publiceye.ch/fr/rssNews.xml',
    inclusionWords: [...tList.disability, ...tList.environment],
  },
  {
    name: 'Semafor',
    url: 'https://www.semafor.com/rss.xml',
    inclusionWords: [...tList.location, ...tList.people],
    exclusionWords: [...tList.culture],
  },
  {
    name: 'Vox',
    url: 'https://www.vox.com/rss/index.xml',
    inclusionWords: ['Public Housing', 'Data', 'gulag', ...tList.disability],
    exclusionWords: [...tList.nonInformativeTitle, ...tList.nonArticle],
  },
  {
    name: 'West England Bylines',
    url: 'https://politepol.com/fd/8IDvxrMRKuNI.xml',
    inclusionWords: [...tList.location, ...tList.disability, ...tList.commons],
    cutoffDate: new Date('2024-12-12'),
  },
  {
    name: 'Znetwork',
    url: 'https://znetwork.org/feed/',
    inclusionWords: ['Greenwashing', 'Bernie', 'Sanders', 'Genocide'],
    // seems the feed is not working
  },
];

const off = [
  // Hindustan Times: Poor credibility
  // Mediapart: Paywalled
 {
    name: 'Le Monde Grand Titres',
    url: 'https://politepol.com/fd/j3wSX3mDHgfE.xml',
    exclusionWords: ['Tour de France'],
    off: true,
    // Paywalled
  },
  // Reuters: haven't forgiven them for probelmatic Tuller article
  // Wired: Paywalled
];