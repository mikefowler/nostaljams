export default function dateStringToTimestamp(string) {
  if (!string) return null;

  const [year, month, day] = string.split('-');
  return new Date(year, month - 1, day).getTime();
}
