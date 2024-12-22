// feedUrls.js
const medicalNews = require('./medical-news.js');

// Bottom Lists
const democraticParty = ['democrat', 'biden', 'kamala', 'sanders'];
// -crimethinc, +usPolitics
const usPolitics = [...democraticParty, 'GOP', 'Trump', 'senate'];
// +Grist, +The Hill Healthcare, +Human Rights Watch, +KFF Health News, +Politics
const prehistory = ['neanderthal', 'ancient primate', 'primate ancestor', 'prehistory', 'australopithecus'];
// +Arstechnica, +The Conversation, +Science Research

//exclusionLists
const clickbait = ['hilarious', 'most beautiful', 'rage', 'GOAT', 'glow up', 'shout', 'shitstir',
  'crazy', 'apocalypse',
];
// -Crikey, -Hill (Healthcare), -Politico EU
const culture = ['anime', 'artist', 'manga', 'oscar', 'film'];
// -Open Democracy, -RTS, -Semafor
const fluffyTitle = ['spirit of', 'the tragedy of', 'just gave us', 'grandma', 'behind the curtain', 'the most powerful',
    'and the prize for the', 'sandwich', 'letter meant for', '5-star', 'most amazing', 'churchill short', 'drinking',
    'bored', 'of faith',
];
// -Axios, -BBC Aus, -Economist, -NYT Most Viewed, -Politico EU
const nonArticle = ['podcast', 'quiz', 'video', 'watch', 'join the conversation'];
// -CrimethInc, -Economist, -Fivethirtyeight, -Open Democracy, -RTS
const nonInformativeTitle = ['how much', '?', 'pour vous?', 'what to know', 'what we know', 'what you can do to', 'new details in',
    'how it happened', 'know about', 'who is', 'why', 'will the', 'winners and losers', 'the best way', 'understanding',
];
// -Axios. -Hill Climate, -Hill Healthcare. -Huffpost (World), -NYT Most Viewed, -OpenDemocracy, -Vox
const singleCrime = ['assault', 'rape', 'guilty', 'charged with', 'alcohol poisoning', 'apologise', 'smuggler', 'sentenced with'];
// -BBC Australia, -BBC Fiji
const spanish = [
  'noticias', 'artículo', 'contenido', 'actualidad', 'español',
  'últimas', 'política', 'sociedad', 'educación', 'tecnología',
  'medio ambiente', 'salud pública', 'cultura', 'economía',
  'internacional', 'latinoamérica', 'iberoamérica', 'hispano', 
  '¿', '¡', 'í', 'ó'
];
// -KFF News
const triggers = ['gender dysphoria', 'Yuppie Flu'];
// -Huffington Post
const uninterestedGeneral = ['bouchon', 'dances', 'Taylor Swift', 'musical', 'Christmas', 'Baby Jesus', 'manger sain', 'un hôtel',
    'fashion brand', 'traffic jam', 'noël',
];
// -Axios, -BBC (Australia), -Hurfington Post (World Post), -NYT Most Viewed, -RTS
const uninterestedPeople = ['Taylor Swift', 'Austin Tice', 'Juan Sotos', 'Jake Paul', 'Mike Tyson'];
// Axios
const uninterestedSports = ['boxing', 'USWNT', 'LeBron', 'NBA', 'NFL', 'college football', 'Mets', 'cricket', 'NY Yankees', 'martial arts'];
// -Axios, -Economist


// inclusionLists
const activism = ['protest', 'rights', 'strike', 'acivis'];
// +{Byline Times, +Indian Country Today, +Motherjones
const commons = ['open-source', 'public housing', 'commons', 'community owned'];
// +west england bylines
const cybersecurity = ['spyware', 'disinformation', 'astroturf', 'bot network'];
// + Amnesty Intl, +Byline Times
const dataJournalism = ['data', 'polling'];
const disability = ['disability', 'assisted suicide', 'disabilities', 'handicap', 'handicapé', 'face mask', 'ADHD advocate',
  'chronic illness', 'lupus',
];
// +Amnesty Intl, +AP, +Disabled Writer. +Orient XXI, *PublicEye, +Human Rights Watch, +Jacobin, 
// +KFF Health, +SBS News, +West England Bylines, +Vox
const environment = ['greenwashing', 'pesticides interdits', 'ecocide', 'pollution', 'cop29', 'cop30', 'cop31', 'cop32', 'climat',
  'fast fashion', 'global warming',
  ];
// +Equal Times. +Indian Country Today, +Inside Climate News, +Grist, *Open Democracy, +Orient XXI, +PublicEye
const europe = ['EU funding'];
// +opendemocracy
const geopolitics = ['sanctions', 'five eyes', 'brics', 'united nations'];
// *Crikey, +The intercept
const important = ['genocide', 'génocide', 'human toll', 'human rights'];
// +AmnestyInternational, +Equal Times, +Motherjones, +Orient XXI, 
const independenceMovements = ['sahara occidental', 'catalonia', 'taiwan', 'indigenous'];
// +Open Democracy, +Orient XXI
const location = ['idaho', 'france', 'switzerland', 'fiji', 'australia', 'japan', 'chippenham', 'calne', 'bristol', 'romandie', 'lausanne'];
// +Amnesty Intl. +Human Rights Watch, +Orient XXI, +Semafor, +Wdst England Bylines
const medicine = ['microbiology', 'disability', 'medicaid', 'coroner', 'cancer', 'covid', 'medicaid', 'hospital',
  'brain inflammation', 'epistemic', 'pandemic',
];
// +The Conversation, +The Disabled Writer, +KFF Health, +Propublica
const people = ['Bernie', 'Sanders', 'Taylor Lorenz', 'George Monbiot'];
// +Semafor
const politics = [...usPolitics, 'senator', 'election', 'democra', 'under-resourced'];
// +Open Democracy, +SBS News
const scienceResearch = ['science', 'astrobio', ...prehistory];
// +Ap, +Inside Climate News
const socialism = ['class'];
// +Jacobin
const sportsInterested = [ 'PSG', 'Paris', 'Switzerland', 'France', 'Australia', 'Xhaka', 'Sommer',
   'Lausanne', 'Embolo', 'Zakaria', 'Germain', 'Coupe du Monde', 'Champions League Final'];
// + The Athletic, + The Equal Times
const technology = ['open-source', 'sattelite', 'bluesky', 'large language model', 'foss', 'generative AI'];
// +Arstechnica, +PublicEye

// mixedLists
const business = ['merger', 'business', 'market value'];
// -Axios, -Economist
const israelPalestine = ['gaza', 'palestine', 'Nethanyahu']; 
// +The intercept
const ukraineRussia = ['ukraine', 'russia', 'gulag', 'putin'];

module.exports = [
    {
    name: 'The Athletic Football',
    url: 'https://www.nytimes.com/athletic/rss/football/',
    inclusionWords: [...sportsInterested,
    ],
    exclusionWords: ['USWNT'],
  },
    {
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: [
      'Hurricane', 'Tropical Storm', 'Paramount', 'Skydance',
      'Fact Check: Biden', 'fans', 'collection:', 'peggy',
      'Simone', 'Warner', 'soccer', ...business,
      'Why the', ...fluffyTitle, ...nonInformativeTitle,
      ...uninterestedGeneral, ...uninterestedPeople, ...uninterestedSports, 
      'Sunday Snapshot', 'blaze', 'winds', 'charged with'
    ],
    minCharsTitle: 15,
  },
  {
    name: 'BBC - Australia',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml',
    off: false,
    exclusionWords: [...uninterestedGeneral, ...singleCrime, ...fluffyTitle],
  },
  {
    name: 'BBC - Fiji',
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml',
    off: false,
    exclusionWords: [...singleCrime],
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
    exclusionWords: ['in brief', ...nonArticle, ...uninterestedSports, 'culture', ...business,
       'obituary', ...fluffyTitle,
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
    exclusionWords: [...nonArticle],
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
    exclusionWords: ['hilarious', 'spirit of', 'most beautiful', ...uninterestedGeneral, ...nonInformativeTitle, ...triggers],
  },
  {
    name: 'ME/LC News',
    url: 'https://me-cfs.github.io/news/rss/community.xml',
  },
  {
    name: 'NYT Most Viewed',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml',
    exclusionWords: [...fluffyTitle, ...uninterestedGeneral, ...nonInformativeTitle],
  },
  {
    name: 'Paul Krugmann',
    url: 'https://paulkrugman.substack.com/',
    off: false,
  },
  {
    // Only Europe
    name: 'Politico',
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml',
    off: false,
    urlBlacklist: ['politico.com'],
    exclusionWords: ['boxing', 'how', '?', 'days', ...fluffyTitle, 'most poweful', ...clickbait,
      // '',
    ],
  },
  {
    // headlines
    name: 'RTS',
    url: 'https://www.rts.ch/info/suisse?format=rss/news',
    off: false,
    exclusionWords: [...uninterestedGeneral, 'pour vous?', ...nonArticle, 'insomnie', ...culture],
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
    inclusionWords: [...usPolitics],
    exclusionWords: [...nonInformativeTitle],
  },
  {
    // healthcare 
    name: 'The Hill',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
    inclusionWords: [...usPolitics],
    exclusionWords: ['rage', ...nonInformativeTitle, ...clickbait],
  },
  ...medicalNews,

// Testing Phase

 {
    name: 'Amnesty International',
    url: 'https://www.amnesty.org/en/rss/',
    inclusionWords: [...important, ...location, ...disability, ...cybersecurity],
  },
 {
    name: 'AP News',
    url: 'https://feedx.net/rss/ap.xml',
    inclusionWords: [...disability, ...scienceResearch],
  },
  {
    name: 'Arstechnica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    inclusionWords: [...technology, ...prehistory],
  },
  {
    name: 'Byline Times',
    url: 'https://bylinetimes.com/feed/',
    inclusionWords: [...activism, 'lobbying', 'corperate', ...cybersecurity],
  },
  {
    name: 'The Conversation',
    url: 'https://theconversation.com/articles.atom',
    inclusionWords: ['microbiology', 'anarchism', 'astrobio', ...prehistory, ...medicine],
  },
  {
    name: 'Crikey',
    url: 'https://www.crikey.com.au/feed/',
    inclusionWords: [...activism, ...geopolitics],
    exclusionWords: [...clickbait],
  },
  {
    name: 'CrimethInc',
    url: 'https://crimethinc.com/feed',
    exclusionWords: [...nonArticle, ...democraticParty],
  },
  {
    name: 'The Equal Times',
    url: 'https://www.equaltimes.org/spip.php?page=backend&lang=fr',
    inclusionWords: [...environment, ...sportsInterested, ...important],
  },
  {
    name: 'Grist',
    url: 'http://feeds.grist.org/rss/gristfeed',
    off: false,
    inclusionWords: [...usPolitics, ...environment],
  },
 {
    name: 'Human Rights Watch',
    url: 'https://www.hrw.org/rss',
    inclusionWords: [...disability, ...location, ...ukraineRussia],
  },
  {
    name: 'Inside Climate News',
    url: 'https://insideclimatenews.org/feed/',
    inclusionWords: [...environment, ...scienceResearch],
  },
  {
    name: 'Indian Country Today',
    url: 'https://indiancountrytoday.com/.rss/full/',
    inclusionWords: [...environment, ...activism],
  },
  {
    name: 'The Intercept',
    url: 'https://firstlook.org/theintercept/feed/',
    inclusionWords: [...geopolitics, ...israelPalestine, "open"],
  },
  {
    name: 'Jacobin',
    url: 'https://jacobinmag.com/feed/',
    inclusionWords: ['Suicide', ...disability, ...socialism],
  },
  {
    name: 'KFF Health News',
    url: 'https://kffhealthnews.org/feed/',
    inclusionWords: [...disability, ...medicine, ...usPolitics, 'rural', 'aca', 'ada'],
    exclusionWords: [...spanish],
  },
 {
    name: 'Motherjones',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: [...activism, ...important, ...disability],
  },
 {
    name: 'Orient XXI',
    url: 'https://orientxxi.info/?page=backend&lang=fr',
    inclusionWords: [...disability, ...location, ...important, ...environment, ...independenceMovements],
  },
  {
    name: 'Open Democracy',
    url: 'https://www.opendemocracy.net/xml/rss/home/index.xml',
    inclusionWords: [...europe, ...politics, ...environment, independenceMovements],
    exclusionWords: [...nonArticle, ...nonInformativeTitle, ...culture],
  },
  {
    name: 'Propublica',
    url: 'https://feeds.propublica.org/propublica/main',
    inclusionWords: [...medicine, 'Idaho'],
  },
  {
    name: 'Public Eye',
    url: 'https://www.publiceye.ch/fr/rssNews.xml',
    inclusionWords: [...technology, ...disability, ...environment],
  },
  {
    name: 'SBS News',
    url: 'https://www.publiceye.ch/fr/rssNews.xml',
    inclusionWords: [...disability, ...environment],
  },
  {
    name: 'Semafor',
    url: 'https://www.semafor.com/rss.xml',
    inclusionWords: [...location, ...people],
    exclusionwords: [...culture],
  },
  {
    name: 'Vox',
    url: 'https://www.vox.com/rss/index.xml',
    inclusionWords: ['Public Housing', 'Data', 'gulag', ...disability],
    exclusionWords: [...nonInformativeTitle,]
    // probably wont work because they all seem to be nonInformativeTitles
  },
  {
    name: 'West England Bylines',
    url: 'https://politepol.com/fd/8IDvxrMRKuNI.xml',
    inclusionWords: [...location, ...disability, ...commons],
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