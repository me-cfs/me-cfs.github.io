// feedUrls.js

//exclusionLists
const clickbait = ['hilarious', 'most beautiful', 'rage', 'GOAT', 'glow up',
];
const fluffyTitle = ['spirit of', 'the tragedy of', 'just gave us', 'grandma'];
// NYT Most Viewed, Axios
const nonArticle = ['podcast', 'quiz'];
const nonInformativeTitle = ['how much', '?', 'pour vous?', 'what to know', 'what we know', 'what you can do to', 'new details in'];
// Hill Climate, Hill Healthcare. NYT Most Viewed, Vox
const singleCrime = ['assault', 'rape'];
// BBC Australia
const uninterestedGeneral = ['bouchon', 'dances', 'Taylor Swift', 'musical'];
// Axios, BBC (Australia), NYT Most Viewed
const uninterestedPeople = ['Taylor Swift', 'Austin Tice'];
// Axios
const uninterestedSports = ['boxing', 'USWNT', 'LeBron', 'NBA', 'NFL', 'college football'];
// Axios

// inclusionLists
const activism = ['protest', 'rights', 'gulag'];
const commons = ['open-source', 'public housing'];
const dataJournalism = ['data'];
const disability = ['disability', 'assisted suicide', 'disabilities'];
// Amnesty Intl.
const environment = ['greenwashing'];
const important = ['genocide'];
const location = ['idaho', 'france', 'switzerland', 'fiji'];
// Amnesty Intl.
const medicine = ['microbiology', 'disability', 'medicaid', 'coroner', 'cancer'];
const people = ['Bernie', 'Sandwrs'];
const scienceResearch = ['science', 'astrobio'];
const technology = ['open-source', 'sattelite'];

module.exports = [
    {
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: [
      'Hurricane', 'Tropical Storm', 'Paramount', 'Skydance',
      'Fact Check: Biden', 'fans', 'collection:', 'peggy',
      'Simone', 'LeBron', 'NBA', 'NFL', 'Warner', 'soccer',
      'GOAT', 'Glow Up', 'How much', 'What to know', ...fluffyTitle,
      ...uninterestedGeneral, ...uninterestedPeople, ...uninterestedSports,
      
    ],
  },
  {
    name: 'BBC - Australia',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml',
    off: false,
    exclusionWords: [...uninterestedGeneral, ...singleCrime],
  },
  {
    name: 'BBC - Fiji',
    url: 'https://politepol.com/fd/WvvXWcEQFPXf.xml',
    off: false,
    exclusionWords: ['assault', 'rape'],
  },
  {
    name: 'EURACTIV - Circular Economy Mentions',
    url: 'https://www.euractiv.com/sections/circular-economy/feed/',
    off: false,
  },
  {
    name: 'Politico EUROPE',
    url: 'https://politepol.com/fd/NVF0NUvfXJS9.xml',
    off: false,
    urlBlacklist: ['politico.com'],
    exclusionWords: ['boxing', 'how', '?', 'days'],
  },
  {
    name: 'Chapatte Dessins',
    url: 'https://www.chappatte.com/images/feed/',
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
    name: 'WorldPost (Huffington)',
    url: 'https://politepol.com/fd/JvzTMgPr0nym.xml',
    off: false,
    exclusionWords: ['hilarious', 'spirit of', 'most beautiful'],
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
    name: 'Fivethirtyeight',
    url: 'https://politepol.com/fd/YfE8PdyBSYNz.xml',
    off: false,
    exclusionWords: ['podcast', 'quiz'],
  },
  {
    name: 'The Hill (Climate Change)',
    url: 'https://thehill.com/social-tags/climate-change/feed/',
    off: false,
    exclusionWords: [...nonInformativeTitle],
  },
  {
    name: 'The Hill (Healthcare)',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
    exclusionWords: ['rage', ...nonInformativeTitle],
  },
  {
    name: 'RTS Headlines',
    url: 'https://www.rts.ch/info/suisse?format=rss/news',
    off: false,
    exclusionWords: ['bouchon', 'pour vous?'],
  },
  {
    name: 'ME/LC News',
    url: 'https://me-cfs.github.io/news/rss/community.xml',
  },
  {
    name: 'The Athletic Football',
    url: 'https://www.nytimes.com/athletic/rss/football/',
    inclusionWords: [
      'PSG', 'Paris', 'Switzerland', 'France', 'Australia',
      'Xhaka', 'Sommer', 'Lausanne', 'Embolo', 'Zakaria', 'Germain',
    ],
    exclusionWords: ['USWNT'],
  },
  {
    name: 'NYT Most Viewed',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml',
    exclusionWords: [...fluffyTitle, ...uninterestedGeneral, ...nonInformativeTitle],
  },
  {
    name: 'Bellingcat',
    url: 'https://www.bellingcat.com/feed/',
    off: false,
  },
  {
    name: 'Science Based Medicine',
    url: 'http://www.sciencebasedmedicine.org/?feed=rss2',
    exclusionWords: ['?', 'questions'],
  },
  
// Testing Phase
 {
    name: 'Amnesty International',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: ['genocide', ...location, ...disability],
  },
 {
    name: 'AP News',
    url: 'https://feedx.net/rss/ap.xml',
    inclusionWords: ['disability', 'science'],
  },
  {
    name: 'The Conversation',
    url: 'https://theconversation.com/articles.atom',
    inclusionWords: ['microbiology', 'anarchism', 'astrobio'],
  },
 {
    name: 'Motherjones',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: ['protest', 'rights'],
  },
  {
    name: 'Arstechnica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    inclusionWords: ['sattelite', 'open-source'],
  },
  {
    name: 'Jacobin',
    url: 'https://jacobinmag.com/feed/',
    inclusionWords: ['Disability', 'Suicide'],
  },
  {
    name: 'Propublica',
    url: 'https://feeds.propublica.org/propublica/main',
    inclusionWords: ['Medicaid', 'Idaho', 'Coroner', 'Cancer'],
  },
  {
    name: 'Znetwork',
    url: 'https://znetwork.org/feed/',
    inclusionWords: ['Greenwashing', 'Bernie', 'Sanders', 'Genocide'],
  },
  {
    name: 'Vox',
    url: 'https://www.vox.com/rss/index.xml',
    inclusionWords: ['Public Housing', 'Data', 'gulag'],
    exclusionWords: [...nonInformativeTitle,]
    // probably wont work because they all seem to be nonInformativeTitles
  },
];

const off = [
 {
    name: 'Le Monde Grand Titres',
    url: 'https://politepol.com/fd/j3wSX3mDHgfE.xml',
    exclusionWords: ['Tour de France'],
    off: true,
    // Paywalled
  },
  // Reuters: haven't forgiven them for probelmatic Tuller article
];