// utils file in node.js export language -- urgh JS is confusing

function getOneWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

module.exports = {
  getOneWeekAgoDate,
  // Other exports if needed
};