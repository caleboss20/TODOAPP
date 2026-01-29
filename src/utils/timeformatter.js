export default function formatTimeAgo(time) {
  const now = new Date();
  const diff = Math.floor((now - new Date(time)) / 1000); // difference in seconds
  if (diff < 60) return "now"; // less than 1 minute
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(diff / 86400);
  return days === 1 ? "yesterday" : `${days} days ago`;
}