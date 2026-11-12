// src/data/AMC8/TP_01/figures.js
// Slot figures for TP_01 (How Many Ways?): the row of blanks the whole unit
// is built on, drawn by one function so the practice set and the test's
// solutions show the same picture.
//
//   slotFigure([{ title, slots: [{ label, value, order }], result }], { total })
//
// A slot with no `value` is drawn empty: that is how the practice set shows
// it, because a figure never gives an answer away. `order` puts a numbered
// badge over a slot (the order to FILL the slots in, fussy slot first).
// `npm run audit:svg` does not read this file; look at the figures in the
// harness (`preview-amc8.html?unit=TP_01&open=FIGURES`).

const INK = '#1e293b';
const MUTED = '#64748b';
const ORANGE = '#ea580c';
const TEAL = '#0f766e';
const SANS = 'ui-sans-serif, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const SLOT_W = 84;
const SLOT_H = 58;
const GAP = 34;
const ROW_H = 132;
const PAD = 22;

export function slotFigure(rows, { total } = {}) {
  const titled = rows.some((r) => r.title);
  const left = PAD + (titled ? 138 : 0);
  const widest = Math.max(...rows.map((r) => r.slots.length));
  const hasResult = rows.some((r) => r.result != null);
  const width = left + widest * SLOT_W + (widest - 1) * GAP + (hasResult ? 104 : 0) + PAD;
  const height = rows.length * ROW_H + (total ? 44 : 0) + 8;

  let out = `<rect x="0" y="0" width="${width}" height="${height}" rx="14" fill="#ffffff"/>`;
  rows.forEach((row, r) => {
    const top = r * ROW_H + 8;
    const boxY = top + 36;
    if (row.title) {
      out += `<text x="${PAD}" y="${boxY + SLOT_H / 2 + 5}" font-family="${SANS}" font-size="14" font-weight="700" fill="${TEAL}">${row.title}</text>`;
    }
    row.slots.forEach((slot, i) => {
      const x = left + i * (SLOT_W + GAP);
      const cx = x + SLOT_W / 2;
      if (slot.order) {
        out += `<circle cx="${cx}" cy="${top + 17}" r="12" fill="${ORANGE}"/>
          <text x="${cx}" y="${top + 22}" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="800" fill="#ffffff">${slot.order}</text>`;
      }
      out += `<rect x="${x}" y="${boxY}" width="${SLOT_W}" height="${SLOT_H}" rx="10" fill="#f8fafc" stroke="${slot.order === 1 ? ORANGE : INK}" stroke-width="2.5"/>`;
      if (slot.value != null) {
        out += `<text x="${cx}" y="${boxY + 39}" text-anchor="middle" font-family="${MONO}" font-size="28" font-weight="700" fill="${INK}">${slot.value}</text>`;
      }
      if (slot.label) {
        out += `<text x="${cx}" y="${boxY + SLOT_H + 20}" text-anchor="middle" font-family="${SANS}" font-size="13" font-weight="600" fill="${MUTED}">${slot.label}</text>`;
      }
      if (i < row.slots.length - 1) {
        out += `<text x="${x + SLOT_W + GAP / 2}" y="${boxY + 37}" text-anchor="middle" font-family="${MONO}" font-size="22" font-weight="700" fill="${MUTED}">×</text>`;
      }
    });
    if (row.result != null) {
      const x = left + row.slots.length * SLOT_W + (row.slots.length - 1) * GAP + 14;
      out += `<text x="${x}" y="${boxY + 39}" font-family="${MONO}" font-size="26" font-weight="700" fill="${TEAL}">= ${row.result}</text>`;
    }
  });
  if (total) {
    out += `<text x="${width / 2}" y="${rows.length * ROW_H + 34}" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="700" fill="${INK}">${total}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="max-width:100%;height:auto" role="img">${out}</svg>`;
}

/** One row of slots. */
export const slotRow = (slots, result) => slotFigure([{ slots, result }]);

/** One row of EMPTY slots, labels only: what a practice item shows. */
export const emptySlots = (...labels) => slotRow(labels.map((label) => ({ label })));

// The figures of the test's solutions (the Review), and the harness gallery.
export const FIGURES = {
  // Problem 4: even 3-digit numbers from 1–7, no digit twice.
  Q4_SOLUTION: slotRow([
    { label: 'hundreds', value: 6, order: 2 },
    { label: 'tens', value: 5, order: 3 },
    { label: 'ones', value: 3, order: 1 },
  ], 90),
  // Problem 6: 4-digit numbers from the digits 0, 1, 2.
  Q6_SOLUTION: slotRow([
    { label: 'thousands', value: 2, order: 1 },
    { label: 'hundreds', value: 3 },
    { label: 'tens', value: 3 },
    { label: 'ones', value: 3 },
  ], 54),
  // Problem 8: 3-digit multiples of 5 with three different digits.
  Q8_SOLUTION: slotFigure([
    { title: 'Ends in 0', slots: [{ label: 'hundreds', value: 9, order: 2 }, { label: 'tens', value: 8, order: 3 }, { label: 'ones', value: 1, order: 1 }], result: 72 },
    { title: 'Ends in 5', slots: [{ label: 'hundreds', value: 8, order: 2 }, { label: 'tens', value: 8, order: 3 }, { label: 'ones', value: 1, order: 1 }], result: 64 },
  ], { total: '72 + 64 = 136' }),
};
