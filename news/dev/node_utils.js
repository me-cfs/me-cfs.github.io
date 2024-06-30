// utils file in node.js export language -- urgh JS is confusing


function getOneWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  const options = { month: 'long', day: 'numeric' };
  const dateString = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  let suffix;

  if (day >= 11 && day <= 13) {
    suffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }

  return dateString.replace(day, day + suffix);
}

module.exports = {
  getOneWeekAgoDate,
  // Other exports if needed
};