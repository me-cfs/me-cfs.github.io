module.exports = [
  {
    name: 'CBT Watch',
    url: 'https://politepol.com/fd/1d2wlU3F2Cw5.xml',
    off: false,
    exclusionWords: ['?'],
    cutoffDate: new Date('2024-12-25')
  },
  {
    name: 'The Disabled Writer',
    url: 'https://politepol.com/fd/mnINOeCIaxAh.xml',
    inclusionWords: ['Caretaker', ...disability, 'language', ...medicine, 'symptom'],
    cutoffDate: new Date('2024-12-11')
  },
];