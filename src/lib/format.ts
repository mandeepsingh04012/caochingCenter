/** Formats a list of class numbers, e.g. [6,7,8,9,10] → "Classes 6, 7, 8, 9 and 10". */
export function formatClassList(classes: readonly number[]): string {
  if (classes.length === 0) return '';
  if (classes.length === 1) return `Class ${classes[0]}`;
  const head = classes.slice(0, -1).join(', ');
  return `Classes ${head} and ${classes[classes.length - 1]}`;
}

/** Joins a list in plain English: ["A","B","C"] → "A, B and C". */
export function joinList(items: readonly string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
