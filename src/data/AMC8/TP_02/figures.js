// src/data/AMC8/TP_02/figures.js
// Figures for TP_02 (Arrangements): the slots of TP_01, plus a row of TILES,
// one tile for each thing being arranged. A glued block (things that must
// stay together) is drawn as ONE wide tile with its letters inside, which is
// the whole idea of the "must be together" step: the block is one unit.
//
//   tileRow(units, { caption, mark })
//     units    'M' is one tile; { block: ['A', 'O', 'U'], label: '3! inside' }
//              is a glued block, drawn as one tile
//     mark     { T: true } draws every T in orange: a repeated letter
//     caption  one line of working under the row (monospace)
//
// The slots come from TP_01's figures.js, so both units draw the same row.
// `npm run audit:svg` does not read this file; look at the figures in the
// harness (`preview-amc8.html?unit=TP_02&open=FIGURES`).
import { slotFigure, slotRow, emptySlots } from '../TP_01/figures.js';

export { slotFigure, slotRow, emptySlots };

const INK = '#1e293b';
const ORANGE = '#ea580c';
const ORANGE_PALE = '#fff7ed';
const TEAL = '#0f766e';
const TEAL_PALE = '#ccfbf1';
const CARD = '#f8fafc';
const SANS = 'ui-sans-serif, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const TILE = 46;
const GAP = 12;
const PAD = 20;

export function tileRow(units, { caption, mark = {} } = {}) {
  const widthOf = (u) => (typeof u === 'object' ? u.block.length * TILE + 8 : TILE);
  const rowW = units.reduce((s, u) => s + widthOf(u), 0) + GAP * (units.length - 1);
  const hasLabel = units.some((u) => typeof u === 'object' && u.label);
  const width = Math.max(rowW + PAD * 2, caption ? caption.length * 11 + PAD * 2 : 0);
  const top = 16;
  const height = top + TILE + (hasLabel ? 30 : 0) + (caption ? 44 : 0) + 14;
  let x = (width - rowW) / 2;
  let out = `<rect x="0" y="0" width="${width}" height="${height}" rx="14" fill="#ffffff"/>`;

  const letter = (ch, cx) => `<text x="${cx}" y="${top + 31}" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="700" fill="${mark[ch] ? ORANGE : INK}">${ch}</text>`;

  for (const u of units) {
    if (typeof u === 'object') {
      const w = widthOf(u);
      out += `<rect x="${x}" y="${top - 4}" width="${w}" height="${TILE + 8}" rx="12" fill="${TEAL_PALE}" stroke="${TEAL}" stroke-width="3"/>`;
      u.block.forEach((ch, i) => {
        const cx = x + 4 + i * TILE + TILE / 2;
        if (i > 0) out += `<line x1="${x + 4 + i * TILE}" y1="${top + 6}" x2="${x + 4 + i * TILE}" y2="${top + TILE - 6}" stroke="${TEAL}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
        out += letter(ch, cx);
      });
      if (u.label) out += `<text x="${x + w / 2}" y="${top + TILE + 26}" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="700" fill="${TEAL}">${u.label}</text>`;
      x += w + GAP;
    } else {
      out += `<rect x="${x}" y="${top}" width="${TILE}" height="${TILE}" rx="9" fill="${mark[u] ? ORANGE_PALE : CARD}" stroke="${mark[u] ? ORANGE : INK}" stroke-width="2"/>`;
      out += letter(u, x + TILE / 2);
      x += TILE + GAP;
    }
  }
  if (caption) {
    out += `<text x="${width / 2}" y="${height - 22}" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="700" fill="${INK}">${caption}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="max-width:100%;height:auto" role="img">${out}</svg>`;
}

/** The letters of a word as tiles, repeated letters in orange: a practice item's picture. */
export const wordTiles = (word) => {
  const counts = {};
  for (const ch of word) counts[ch] = (counts[ch] || 0) + 1;
  const mark = Object.fromEntries(Object.entries(counts).filter(([, n]) => n > 1).map(([ch]) => [ch, true]));
  return tileRow(word.split(''), { mark });
};

// The figures of the test's solutions (the Review), and the harness gallery.
export const FIGURES = {
  // Problem 4: six students, the three in red glued into one block.
  Q4_SOLUTION: tileRow(['A', 'B', 'C', { block: ['P', 'Q', 'R'], label: 'red shirts: 3! = 6 inside' }], {
    caption: '4 units: 4! × 3! = 24 × 6 = 144',
  }),
  // Problem 5: NUMBER with a vowel at each end; the ends are filled first.
  Q5_SOLUTION: slotRow([
    { label: 'vowel', value: 2, order: 1 },
    { label: '', value: 4 },
    { label: '', value: 3 },
    { label: '', value: 2 },
    { label: '', value: 1 },
    { label: 'vowel', value: 1, order: 2 },
  ], 48),
  // Problem 8: four pairs of twins, each pair glued.
  Q8_SOLUTION: tileRow([
    { block: ['A', 'a'], label: '2 orders' },
    { block: ['B', 'b'], label: '2 orders' },
    { block: ['C', 'c'], label: '2 orders' },
    { block: ['D', 'd'], label: '2 orders' },
  ], { caption: '4! × 2 × 2 × 2 × 2 = 24 × 16 = 384' }),
  // Problem 10: ADDRESS with the two S's glued. The S's are the same
  // letter, so there is only ONE order inside the block.
  Q10_SOLUTION: tileRow(['A', 'D', 'D', 'R', 'E', { block: ['S', 'S'], label: '1 order inside' }], {
    mark: { D: true },
    caption: 'together 6!/2! = 360 · apart 1260 − 360 = 900',
  }),
};
