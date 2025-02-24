const tList = require('./topical-lists.js')

module.exports = [
  {
    name: 'CBT Watch',
    url: 'https://politepol.com/fd/1d2wlU3F2Cw5.xml',
    off: false,
    exclusionWords: ['?'],
    cutoffDate: new Date('2024-12-25')
  },
  {
    name: 'Disability News Service',
    url: 'https://politepol.com/fd/N4uIjsNwvQMm.xml',
    off: false,
    cutoffDate: new Date('2024-12-25')
  },
  {
    name: 'The Disabled Writer',
    url: 'https://politepol.com/fd/mnINOeCIaxAh.xml',
    inclusionWords: ['Caretaker', ...tList.disability, 'language', ...tList.medicine, 'symptom'],
    cutoffDate: new Date('2024-12-11')
    // titles dont seem super descriptive
  },
  {
    name: 'KFF Health News',
    url: 'https://kffhealthnews.org/feed/',
    inclusionWords: [...tList.disability, ...tList.medicine, ...tList.usPolitics, 'rural', 'aca', 'ada'],
    exclusionWords: [...tList.spanish, ...tList.nonArticle],
  },
];