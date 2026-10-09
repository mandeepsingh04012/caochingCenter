// Quick WCAG contrast checker for the palette: node scripts/contrast.mjs
const hex = (h) => h.match(/\w\w/g).map((x) => parseInt(x, 16) / 255);
const lum = (h) =>
  hex(h)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const pairs = [
  ['#27332E', '#FFFFFF'], ['#27332E', '#F4EBDD'], ['#68736C', '#FFFFFF'], ['#68736C', '#F4EBDD'],
  ['#5F6A63', '#FFFFFF'], ['#5F6A63', '#F4EBDD'], ['#5F6A63', '#FBF8F2'], ['#FFFFFF', '#174C3C'],
  ['#D9B66F', '#10392D'], ['#D9B66F', '#174C3C'], ['#8A6A2A', '#FFFFFF'], ['#7A5C20', '#F4EBDD'], ['#7A5C20', '#FFFFFF'],
  ['#10392D', '#D9B66F'], ['#A8322A', '#FFFFFF'], ['#D5E6DF', '#10392D'], ['#A9CCBF', '#10392D'],
];
for (const [fg, bg] of pairs) console.log(`${fg} on ${bg}: ${ratio(fg, bg).toFixed(2)}`);
