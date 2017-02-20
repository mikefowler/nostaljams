export default function getNumbersInRange(start, end) {
  const list = [];

  if (start === null || end === null) return list;

  for (let i = start; i <= end; i += 1) {
    list.push(i);
  }

  return list;
}
