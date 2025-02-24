// feedUrls.js
const medicalNews = require('./medical-news.js');
const tList = require('./topical-lists.js')

module.exports = [
// Africa


  {
    // Guardian Africa
    name: 'Guardian',
    url: 'https://www.theguardian.com/world/africa/rss',
    exclusionWords: ['|', ...tList.singlePerson, ...tList.culture, "journey", "value of", ...tList.nonArticle,
      ...tList.nonInformativeTitle, ...tList.uninterestedGeneral,],
    off: false,
  },
 {
    name: 'Orient XXI',
    url: 'https://orientxxi.info/?page=backend&lang=fr',
    // inclusionWords: [...tList.disability, ...tList.location, ...tList.important, ...tList.environment, ...tList.independenceMovements,
    //  ...tList.humanRights, 
    // ],
  },
  

// Europe 


  {
    name: 'Byline Times',
    url: 'https://bylinetimes.com/feed/',
    inclusionWords: [...tList.activism, 'lobbying', 'corperate', ...tList.cybersecurity,
      ...tList.ukraineRussia, ...tList.disability, "cashed in", ...tList.medicine,
      ...tList.geopolitics,
       ],
    exclusionWords: [...tList.nonInformativeTitle,],
  },
  {
    name: 'The Equal Times',
    url: 'https://www.equaltimes.org/spip.php?page=backend&lang=fr',
    inclusionWords: [...tList.environment, ...tList.sportsInterested, ...tList.important, ...tList.socialism,
      ...tList.medicine, ...tList.independenceMovements, ...tList.geopolitics, 
    ],
  },
  {
    // George Monbiot Guardian
    name: 'Guardian',
    url: 'http://www.guardian.co.uk/profile/georgemonbiot/rss',
    off: false,
  },
  {
    name: 'Kyiv Indpendent',
    url: 'https://kyivindependent.com/feed/rss/',
    inclusionWords: ['300', 'Ukraine, despite', 'over past day', ...tList.rightWing, ...tList.war, 
      ...tList.geopolitics, "Denmark", "EU provides", "Russsian Elite",
    ],
    exclusionWods: [...tList.nonInformativeTitle, "war latest", ...tList.business, "The Week Ahead",],
    urlBlacklist: ['video'], 
  },
  {
    name: 'Open Democracy',
    url: 'https://www.opendemocracy.net/en/feed/',
    inclusionWords: [...tList.europe, ...tList.politics, ...tList.environment, ...tList.independenceMovements],
    exclusionWords: [...tList.nonArticle, ...tList.nonInformativeTitle, ...tList.culture],
  },
  { // Only Europe
    name: 'Politico',
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml',
    off: false,
    urlBlacklist: ['politico.com'],
    exclusionWords: ['boxing', 'how', '?', 'days', ...tList.fluffyTitle, 'most poweful', ...tList.clickbait,
      ...tList.uninterestedGeneral, 'went wrong', 'why the', '...', 'trip wire', "'s chance", 'miss in', 
      'times', ...tList.economics, ...tList.nonInformativeTitle, "bad deal", "History's long", 'alarming', 
      'zz', ...tList.business, "not happen",
    ],
    minCharsTitle: 25,
    blacklist: ['newsletter'],
  },
  {
    name: 'Public Eye',
    url: 'https://www.publiceye.ch/fr/rssNews.xml',
    // inclusionWords: [...tList.technology, ...tList.disability, ...tList.environment, ...tList.location,],
  },
  { // France
    name: 'RFI',
    url: 'https://www.rfi.fr/france/rss',
    inclusionWords: [...tList.location, ...tList.politics],
    exclusionWords: [...tList.fluffyTitle, 'découverte',],
    urlExlusionWord: ['podcast'],
  },
  { // Europe
    name: 'RFI',
    url: 'https://www.rfi.fr/europe/rss',
    inclusionWords: ['South Korea', 'NATO', 'North Korea', 'Mediterranian',
      'peaceful transition', 'EU presidency', 'medicine', 'Greenland', 
      'Italian', 'Poland', ...tList.politics, 'China', ...tList.environment, 
      "Italie", "Autriche", ...tList.important, ...tList.war, "Croatie", 
      "Allemagne", 'Baltique', "Serbie", "Espagne", "Portugal", "Norvège", 
      "Pologne", 
    ],
  },
  { // headlines
    name: 'RTS',
    url: 'https://www.rts.ch/info/suisse?format=rss/news',
    off: false,
    exclusionWords: [...tList.uninterestedGeneral, 'pour vous?', ...tList.nonArticle, 'insomnie', ...tList.culture,
      ...tList.fluffyTitle, ...tList.nonInformativeTitle, ...tList.singlePerson, "emplois",
    ],
  },


// North Americs
  {
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: [
      'Hurricane', 'Tropical Storm', 'Paramount', 'Skydance', 'which',
      'Fact Check: Biden', 'fans', 'collection:', 'peggy', "read", 
      'Simone', 'Warner', 'soccer', ...tList.business, "Set to proceed", 
      'Why the', ...tList.fluffyTitle, ...tList.nonInformativeTitle,
      ...tList.uninterestedGeneral, ...tList.uninterestedPeople, ...tList.uninterestedSports, 
      'Sunday Snapshot', 'blaze', 'winds', 'charged with', 'how', ...tList.culture,
      ...tList.weather, 'steel', 'reality check', 'mortgage rate',
      'documentary', 'director', 'top risk', 'bremmer', "2024", "you're", 
      ...tList.clickbait, ...tList.singlePerson, "denies effort", "transgender", 
    ],
    minCharsTitle: 20,
  },
  {
    name: 'Fivethirtyeight',
    url: 'https://politepol.com/fd/F5Y3tB1o97oW.xml',
    off: false,
    exclusionWords: [...tList.nonArticle, '?', ...tList.fluffyTitle, "How",
      
    ],
    cutoffDate: new Date('2024-12-10')
  },
  {
    name: 'Grist',
    url: 'https://grist.org/feed/',
    off: false,
    inclusionWords: [...tList.usPolitics, ...tList.environment,
    ],
    exclusionWords: [...tList.nonInformativeTitle, "catastrophic",],
    minCharsTitle: 15,
  },
  {
    // healthcare 
    name: 'The Hill',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
    inclusionWords: [...tList.usPolitics],
    exclusionWords: ['rage', ...tList.nonInformativeTitle, ...tList.clickbait,
      "gender",
    ],
  },
  {
    name: 'Inside Climate News',
    url: 'https://insideclimatenews.org/feed/',
    inclusionWords: [...tList.environment, ...tList.scienceResearch],
    exclusionWords: [...tList.nonInformativeTitle, "Impact",],
  },
  {
    name: 'The Intercept',
    url: 'https://theintercept.com/feed/?rss',
    inclusionWords: [...tList.geopolitics, ...tList.israelPalestine, "open", 'strongest predictor',
      'paywall', 'Nigeria', ...tList.rightWing, "Porn", ...tList.cybersecurity, 
    ],
  },
  {
    name: 'Motherjones',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: [...tList.activism, ...tList.important, ...tList.disability, ...tList.politics],
    exclusionWords: [...tList.nonInformativeTitle, ...tList.business,],
    minCharsTitle: 15,
  },
  {
    // Most Viewed
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml',
    exclusionWords: [...tList.fluffyTitle, ...tList.uninterestedGeneral, ...tList.nonInformativeTitle, "aghast", "avoid sentencing",
      ...tList.singlePerson, ...tList.uninterestedPeople, 
       ],
  },
  {
    name: 'Paul Krugmann',
    url: 'https://openrss.org/paulkrugman.substack.com/feed',
    altUrls: ['https://paulkrugman.substack.com/feed'],
    off: false,
  },
  {
    name: 'Science Based Medicine',
    url: 'http://www.sciencebasedmedicine.org/?feed=rss2',
    exclusionWords: ['?', 'questions', 'Kulldorf',],
    minCharsTitle: 12,
  },
  

// Oceania
  { //Australia
    name: 'BBC',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml',
    off: false,
    exclusionWords: [...tList.uninterestedGeneral, ...tList.singlePerson, ...tList.fluffyTitle,
      'Australia Debut', ...tList.nonArticle, ...tList.uninterestedSports, ...tList.clickbait,
      
    ],
  },
  {
    name: 'BBC - Fiji',
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml',
    off: false,
    exclusionWords: [...tList.singleCrime],
  },
  {
    name: 'Crikey',
    url: 'https://www.crikey.com.au/feed/',
    inclusionWords: [...tList.activism, ...tList.geopolitics, ...tList.politics,],
    exclusionWords: [...tList.clickbait, ...tList.nonInformativeTitle,],
  },
  {
    name: 'SBS News',
    url: 'https://www.sbs.com.au/news/topic/australia/feed',
    inclusionWords: [...tList.disability, ...tList.environment, ...tList.location, ...tList.history,
      //'',
    ],
    exclusionWords: [...tList.fluffyTitle, 'Australia Day', ...tList.nonInformativeTitle,
      ...tList.uninterestedSports, 
    ],
  },


  // World
 {
    name: 'AP News',
    url: 'https://feedx.net/rss/ap.xml',
    /* inclusionWords: [...tList.disability, ...tList.scienceResearch, ...tList.medicine, ...tList.humanRights,
      'France coast', 'anti-US', 'Montenegro', 'left note', '116', 'lawyers ask judge', 'looking at europe',
      ...tList.rightWing, ...tList.war, ...tList.environment, 'mastermind', ...tList.dataJournalism, 
      ...tList.technology, "Yemen", "Cuba", "google", "Delhi",
    ], */
  },
  {
    name: 'Amnesty International',
    url: 'https://www.amnesty.org/en/rss/',
    inclusionWords: [...tList.important, ...tList.location, ...tList.disability, ...tList.cybersecurity,
      'native', 'Myannmar', ...tList.prison, 'Angola', ...tList.humanRights, ...tList.environment,
      "DRC", "USA", "Myanmar",
    ],
  },
  {
    name: 'Arstechnica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    inclusionWords: [...tList.technology, ...tList.prehistory, ...tList.environment, 'illegal crypto mine',
      'yellowstone', 'antitrust', ...tList.cybersecurity, ...tList.history, ...tList.commons,
      ...tList.medicine, ...tList.war,
    ],
    exclusionWords: [...tList.uninterestedSports,],
  },
  {
    name: 'The Athletic Football',
    url: 'https://www.nytimes.com/athletic/rss/football/',
    inclusionWords: [...tList.sportsInterested],
    exclusionWords: ['USWNT'],
  },
  {
    name: 'Bellingcat',
    url: 'https://www.bellingcat.com/feed/',
    off: false,
    urlBlacklist: ['resources'],
  },
  {
    name: 'Chapatte Dessins',
    url: 'https://www.chappatte.com/images/feed/',
    off: false,
  },
  {
    name: 'The Conversation',
    url: 'https://theconversation.com/articles.atom',
    inclusionWords: ['microbiology', 'anarchism', 'astrobio', ...tList.prehistory, ...tList.medicine,
      ...tList.activism, ...tList.independenceMovements, 'secret weapon', 'greeks and romans',
      'Zimbabwe', 'data centre', 'invasive species', ...tList.prison, ...tList.technology,
      ...tList.environment, ...tList.location, "West Africa", "randomness", "Africa",
    ],
  },
  {
    name: 'CrimethInc',
    url: 'https://crimethinc.com/feed',
    exclusionWords: [...tList.nonArticle, ...tList.democraticParty, 'the Arctic'],
  },
  {
    name: 'Economist',
    url: 'https://openrss.org/www.economist.com',
    fallbackUrls: ['https://feedx.net/rss/economist.xml'],
    exclusionWords: ['in brief', ...tList.nonArticle, ...tList.uninterestedSports, 'culture', ...tList.business,
       'obituary', ...tList.fluffyTitle, 'fact-checking', ...tList.nonInformativeTitle, "expensive", 
    ],
    off: false,
    urlExclusionWords: ['business', 'finance'],
    minCharsTitle: 18,
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
    name: 'Electronic Frontiers Foundation',
    url: 'https://www.eff.org/rss.xml',
    inclusionWords: [...tList.cybersecurity],
  },
  {
    // Huffington Post (World Post)
    name: 'Huffington Post',
    url: 'https://politepol.com/fd/JvzTMgPr0nym.xml',
    off: false,
    exclusionWords: ['hilarious', 'spirit of', 'most beautiful', ...tList.uninterestedGeneral, ...tList.nonInformativeTitle, ...tList.triggers,
      ...tList.uninterestedPeople, ...tList.business, "Somalia", "Vatican", 
    ],
  },
  {
    name: 'Human Rights Watch',
    url: 'https://www.hrw.org/rss',
    inclusionWords: [...tList.disability, ...tList.location, ...tList.ukraineRussia,
      ...tList.cybersecurity, ...tList.important, "Georgia", ...tList.humanRights,
      "Cameroon", "Thailand", "Lebanon", "Nigeria", 'Canada', "Gaza", "Rwanda",
    ],
    exclusionWords: ["Agenda for New Government"],
  },
  {
    name: 'Jacobin',
    url: 'https://jacobinmag.com/feed/',
    inclusionWords: ['Suicide', ...tList.disability, ...tList.socialism, ...tList.history,
      ...tList.humanRights,
    ],
  },
  {
    name: 'ME/LC News',
    url: 'https://me-cfs.github.io/news/rss/community.xml',
  },
  {
    name: 'Semafor',
    url: 'https://www.semafor.com/rss.xml',
    inclusionWords: [...tList.location, ...tList.people, 'China hack',
      'Emirati', 'Sudan', "Turkey", "Carbon Emissions", "China",
      "Pyongyang", "Guatemala",
    ],
    exclusionWords: [...tList.culture, ...tList.business,],
  },
  {
    name: 'Survival International',
    url: 'http://feeds.survivalinternational.org/SurvivalInternational',
  },
  {
    name: '404 Media',
    url: 'https://www.404media.co/rss/',
    inclusionWords: [...tList.commons, ...tList.humanRights,
      ...tList.activism, "spy", ...tList.technology,
      "trans", "bigotry", 
    ],
  },
  
  
// RSS Feed Not Working
  {
    name: 'Indian Country Today',
    url: 'https://indiancountrytoday.com/.rss/full/',
    inclusionWords: [...tList.environment, ...tList.activism],
    // feed problems. seems to work on rss reder tho
  },
  {
    name: 'Znetwork',
    url: 'https://znetwork.org/feed/',
    inclusionWords: ['Greenwashing', 'Bernie', 'Sanders', 'Genocide'],
    // seems the feed is not working
  },


//Imports
...medicalNews,
  
  
  
  
  
  
  
  











  {
    name: 'Propublica',
    url: 'https://feeds.propublica.org/propublica/main',
    // inclusionWords: [...tList.medicine, 'Idaho', 'ships', 'militia', 'ethics', ...tList.us, 'Musk', 
    //  'Tunnel',
    // ],
  },
  {
    name: 'West England Bylines',
    url: 'https://politepol.com/fd/8IDvxrMRKuNI.xml',
    inclusionWords: [...tList.location, ...tList.disability, ...tList.commons, ...tList.rightWing,
      
    ],
    cutoffDate: new Date('2024-12-12'),
  },
];

const off = [
  // Hindustan Times: Poor credibility
  // Mediapart: Paywalled
 // Le Monde
  // Reuters: haven't forgiven them for probelmatic Tuller article
  // Wired: Paywalled
];

//titlereplace
//fallbackUrls
//urlExclusionWords