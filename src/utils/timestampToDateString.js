export default function timestampToDateString(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp * 1000);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
