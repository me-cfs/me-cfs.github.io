=const { getOneWeekAgoDate } = require('../dev/node_utils.js');


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

module.exports = [
  { 
    name: 'Science for ME', 
    url: 'https://med-mastodon.com/@s4me.rss',
    cutoffDate: new Date('2024-06-24'),
    inclusionWords: ['News in Brief', 'Brief Headline'],
    undefinedTitle: 'News in Brief for the week of ' + getOneWeekAgoDate(),
    getContentLink: 'https://www.s4me.info'
  },
  { 
    url: 'https://thesicktimes.org/feed/', 
    name: 'The Sick Times', 
    cutoffDate: new Date('2024-05-01'),
    exclusionWords: ["National Covid-19 trends", "Research updates"]
  },
  { 
    url: 'https://politepol.com/fd/yNgKhc4c7HHu.xml', 
    name: 'Trial By Error', 
    cutoffDate: new Date('2024-05-29'),
    titleHide: ["Trial By Error: "]
  },
  { 
    url: 'https://politepol.com/fd/uu29e43WxMVl.xml', 
    name: 'ME/CFS Research Review', 
    cutoffDate: new Date('2024-05-30'),
  },
  { 
    url: 'http://fetchrss.com/rss/6663490de2588464cc0e7843666348e357063cb2e901eac3.xml', 
    name: 'The Canary', 
    cutoffDate: new Date('2024-06-08'),
  },
  { 
    url: 'https://politepol.com/fd/5l40hlTQDRT0.xml', 
    name: 'The Science Bit', 
    cutoffDate: new Date('2024-06-06'),
  },
  { 
    name: 'HealthRising', 
    url: 'https://www.healthrising.org/feed/', 
    cutoffDate: new Date('2024-05-01'),
    exclusionWords: ["Recovery", "Exercise Program", "Donation Drive", "Effort Preference", "Caffeine"],
    off: true,
  },
  { 
    url: 'https://politepol.com/fd/lBx0N55ObPbU.xml', 
    name: 'Thoughts about ME', 
    cutoffDate: new Date('2024-06-15'),
  },
  {
    name: 'ME/CFS Skeptic',
    url: 'https://politepol.com/fd/GHk0kBtNHXGJ.xml',
    cutoffDate: new Date('2024-06-29'),
  },
  {
    name: 'Long Covid Advocacy',
    url: 'https://politepol.com/fd/pduAk8UryRf1.xml',
    cutoffDate: new Date('2024-07-14'),
    exclusionWords: ['L.I.V.E.', 'free download'],
  },
  {
    name: 'Edzard Ernst',
    url: 'https://politepol.com/fd/7QcGiZpI439G.xml',
    cutoffDate: new Date('2024-07-16'),
    inclusionWords: ['ME/CFS', 'CFS', 'Long Covid', 'Myalgic'],
  },
  
  
  // Add more feeds with their respective cutoff dates and exclusion words as needed
];