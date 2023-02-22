export default function relativeDate(timestamp: string) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - new Date(timestamp).getTime();

  if (elapsed < msPerMinute) {
    return Math.floor(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.floor(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.floor(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.floor(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.floor(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.floor(elapsed / msPerYear) + " years ago";
  }
}
