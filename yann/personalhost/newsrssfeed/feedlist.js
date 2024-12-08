// feedUrls.js

// Basic Info
// name: The name of the news source, displayed under title
// url: The URL of the RSS feed to import from

const singleCrime = ['assault', 'rape'];
const nonInformativeTitle = ['how much', '?', 'pour vous?', 'what to know'];
const uninterestedSports = ['boxing', 'USWNT', 'LeBron', 'NBA', 'NFL',];
const clickbait = ['hilarious', 'most beautiful', 'rage', 'GOAT', 'glow up',
];
const fluffyTitle = ['spirit of', 'the tragedy of', 'just gave us', 'grandma'];
// NYT Most Viewed, Axios
const nonArticle = ['podcast', 'quiz'];
const uninterestedGeneral = ['bouchon', 'dances', 'Taylor Swift'];
// NYT Most Viewed, Axios
const uninterestedPeople = ['Taylor Swift', 'Austin Tice'];
// Axios


const activism = ['protest', 'rights'];
const commons = ['open-source'];
const disability = ['disability', 'assisted suicide',];
const medicine = ['microbiology', 'disability', 'medicaid', 'coroner', 'cancer'];
const location = ['idaho'];
const scienceResearch = ['science', 'astrobio'];
const technology = ['open-source', 'sattelite'];

module.exports = [
  {
    name: 'BBC News Australia Mentions',
    url: 'https://feeds.bbci.co.uk/news/world/australia/rss.xml',
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
    name: 'Healthcare - The Hill',
    url: 'https://thehill.com/policy/healthcare/feed/',
    off: false,
    exclusionWords: ['rage'],
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
    exclusionWords: ['podcast', 'quiz'],
  },
  {
    name: 'Axios',
    url: 'https://api.axios.com/feed/?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter_axiosedge&stream=politics',
    off: false,
    exclusionWords: [
      'Hurricane', 'Tropical Storm', 'Paramount', 'Skydance',
      'Fact Check: Biden', 'fans', 'collection:', 'peggy',
      'Simone', 'LeBron', 'NBA', 'NFL', 'Warner', 'soccer',
      'GOAT', 'Glow Up', 'How much', 'What to know', ...fluffyTitle,
      ...uninterestedGeneral, ...uninterestedPeople,
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
    exclusionWords: [...fluffyTitle, ...uninterestedGeneral],
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
    name: 'Motherjones',
    url: 'https://feeds.feedburner.com/motherjones/main',
    inclusionWords: ['protest', 'rights'],
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