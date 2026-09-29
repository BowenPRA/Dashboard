// src/data/AMC8/PT_02/figures.js
// The figures printed beside the problems of Practice Test 2 (the 2025 paper),
// and the extra ones the Review task shows in a solution. Drawn for this app
// from the geometry each problem describes.
//
// These are TEST figures, not teaching diagrams, so they follow the look of a
// contest paper rather than docs/svg-diagrams.md: black ink, gray shading,
// serif letters, no colour — except in the SOLUTION figures, where colour is
// the explanation. Everything renders on a white panel in both themes.
//
// Each figure states its natural size (`width`/`height` on the root) and
// scales down, never up, so a small figure is not blown up to fill a wide
// screen. Where a figure is true to scale the numbers below say so; the test
// still prints "figures are not necessarily drawn to scale".
//
// Every inline SVG on a page shares one document, so each marker id here
// starts with `pt02-`.

const INK = '#1e293b';
const GRAY = '#cbd5e1';
const DARK = '#9ca3af';
const LIGHT = '#e5e7eb';
const RULE = '#94a3b8';
const SERIF = "Georgia, 'Times New Roman', serif";

const n = (v) => Number(v.toFixed(1));

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto" role="img">${body}</svg>`;

/** A number or a name, upright. */
const num = (x, y, s, { size = 15, anchor = 'middle', fill = INK, weight = 'normal' } = {}) =>
  `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}">${s}</text>`;

/** A letter that names a point or a length, italic the way a paper prints it. */
const letter = (x, y, s, { size = 16, anchor = 'middle', fill = INK } = {}) =>
  `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="${size}" font-style="italic" text-anchor="${anchor}" fill="${fill}">${s}</text>`;

const line = (x1, y1, x2, y2, { w = 1.5, stroke = INK, dash = '' } = {}) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>`;

const dot = (x, y, r = 3) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${INK}"/>`;

/** A dimension line with end ticks and its label in a gap in the middle. */
function dimension(x1, y1, x2, y2, label) {
  const horizontal = Math.abs(y2 - y1) < 0.01;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const tick = 5;
  const ticks = horizontal
    ? line(x1, y1 - tick, x1, y1 + tick, { w: 1 }) + line(x2, y2 - tick, x2, y2 + tick, { w: 1 })
    : line(x1 - tick, y1, x1 + tick, y1, { w: 1 }) + line(x2 - tick, y2, x2 + tick, y2, { w: 1 });
  const gap = 8 + String(label).length * 5;
  const body = horizontal
    ? line(x1, y1, mx - gap, y1, { w: 1 }) + line(mx + gap, y1, x2, y2, { w: 1 })
    : line(x1, y1, x1, my - 11, { w: 1 }) + line(x1, my + 11, x2, y2, { w: 1 });
  return ticks + body + num(mx, my + 5, label, { size: 14 });
}

const arrowDefs = (id, fill = INK) =>
  `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${fill}"/></marker></defs>`;

/** Corner points of a polygon, for `points="…"`. */
const pts = (list) => list.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');

/** A bold coloured number on a white halo, for the solution figures. */
const tag = (x, y, s, fill, size = 15) =>
  `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="${size}" font-weight="bold" text-anchor="middle" fill="${fill}" stroke="#ffffff" stroke-width="4" stroke-linejoin="round" paint-order="stroke">${s}</text>`;

// ── Problem 1: the eight-pointed star ───────────────────────────────────────
// True to scale, 34 px to a unit. The grid is drawn over the fills, so its
// lines show through the star the way the quilt's seams do.
const STAR = [
  [DARK, [[1, 4], [2, 3], [2, 2], [1, 3]]], [LIGHT, [[3, 4], [2, 3], [2, 2], [3, 3]]],
  [DARK, [[4, 3], [3, 3], [2, 2], [3, 2]]], [LIGHT, [[4, 1], [3, 2], [2, 2], [3, 1]]],
  [DARK, [[3, 0], [3, 1], [2, 2], [2, 1]]], [LIGHT, [[1, 0], [2, 1], [2, 2], [1, 1]]],
  [DARK, [[0, 1], [1, 1], [2, 2], [1, 2]]], [LIGHT, [[0, 3], [1, 2], [2, 2], [1, 3]]],
];
function star() {
  const u = 34, m = 10;
  const at = ([x, y]) => [m + x * u, m + (4 - y) * u];
  let out = STAR.map(([fill, p]) => `<polygon points="${pts(p.map(at))}" fill="${fill}"/>`).join('');
  for (let i = 0; i <= 4; i++) {
    out += line(...at([i, 0]), ...at([i, 4]), { w: 1, stroke: RULE }) + line(...at([0, i]), ...at([4, i]), { w: 1, stroke: RULE });
  }
  out += STAR.map(([, p]) => `<polygon points="${pts(p.map(at))}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`).join('');
  return svg(4 * u + 2 * m, 4 * u + 2 * m, out);
}

// ── Problem 2: Egyptian numerals ────────────────────────────────────────────
// Simplified hieroglyphs, each drawn standing on a baseline `b` and centred on x.
const INKED = `fill="#ffffff" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;
const OPEN = `fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
const GLYPH = {
  // 100,000: a frog, seen from above.
  frog(x, b) {
    const c = b - 15;
    return `<polyline points="${pts([[x - 5, c + 8], [x - 14, c + 5], [x - 11, c + 15]])}" ${OPEN}/>`
      + `<polyline points="${pts([[x + 5, c + 8], [x + 14, c + 5], [x + 11, c + 15]])}" ${OPEN}/>`
      + `<polyline points="${pts([[x - 5, c - 2], [x - 12, c + 1], [x - 13, c - 6]])}" ${OPEN}/>`
      + `<polyline points="${pts([[x + 5, c - 2], [x + 12, c + 1], [x + 13, c - 6]])}" ${OPEN}/>`
      + `<ellipse cx="${x}" cy="${c + 2}" rx="7" ry="11" ${INKED}/>`
      + `<circle cx="${x - 4.5}" cy="${c - 8}" r="2.6" ${INKED}/>`
      + `<circle cx="${x + 4.5}" cy="${c - 8}" r="2.6" ${INKED}/>`;
  },
  // 10,000: a raised finger, its tip bent over.
  finger(x, b) {
    return `<path d="M ${x - 4} ${b} L ${x - 5} ${b - 24} C ${x - 5.5} ${b - 33} ${x - 1} ${b - 35} ${x + 2.5} ${b - 33.5} C ${x + 6} ${b - 31.5} ${x + 5} ${b - 26} ${x + 3.5} ${b - 23} L ${x + 4.5} ${b} Z" ${INKED}/>`
      + `<path d="M ${x - 2} ${b - 29} Q ${x + 1} ${b - 27} ${x + 3} ${b - 29}" ${OPEN} stroke-width="1"/>`;
  },
  // 1,000: a lotus, flower on top, a leaf on the stem, standing on its base.
  lotus(x, b) {
    return line(x, b - 5, x, b - 24, { w: 1.6 })
      + `<path d="M ${x} ${b - 13} Q ${x + 7} ${b - 13} ${x + 8} ${b - 20} Q ${x + 2} ${b - 19} ${x} ${b - 13} Z" ${INKED}/>`
      + `<path d="M ${x - 6} ${b - 34} L ${x - 3} ${b - 29} L ${x} ${b - 36} L ${x + 3} ${b - 29} L ${x + 6} ${b - 34} C ${x + 6} ${b - 26} ${x + 3} ${b - 24} ${x} ${b - 24} C ${x - 3} ${b - 24} ${x - 6} ${b - 26} ${x - 6} ${b - 34} Z" ${INKED}/>`
      + `<path d="M ${x - 6} ${b} L ${x} ${b - 7} L ${x + 6} ${b} Z" ${INKED}/>`;
  },
  // 100: a coil of rope, a spiral with its end hanging down.
  coil(x, b) {
    const cx = x + 1, cy = b - 16, turns = 3 * Math.PI;
    const spiral = [];
    for (let k = 0; k <= 36; k++) {
      const t = (k / 36) * turns;
      const r = 1.2 + 4.8 * (t / turns);
      spiral.push([cx + r * Math.cos(t), cy - r * Math.sin(t)]);
    }
    return `<path d="M ${spiral.map(([px, py]) => `${n(px)} ${n(py)}`).join(' L ')} Q ${cx - 7} ${cy + 7} ${cx - 4.5} ${b}" ${OPEN}/>`;
  },
  // 10: a heel bone, an arch.
  arch(x, b) {
    return `<path d="M ${x - 7} ${b} L ${x - 7} ${b - 11} A 7 7 0 0 1 ${x + 7} ${b - 11} L ${x + 7} ${b}" ${OPEN} stroke-width="2"/>`;
  },
  // 1: a single stroke.
  stroke(x, b) {
    return line(x, b - 18, x, b, { w: 2 });
  },
};

/** Glyphs set left to right from x, each advancing by its own width. */
function glyphRow(x, b, names) {
  const ADVANCE = { frog: 30, finger: 17, lotus: 17, coil: 17, arch: 18, stroke: 9 };
  let out = '';
  names.forEach((g, i) => {
    out += GLYPH[g](x, b);
    x += (ADVANCE[g] + (ADVANCE[names[i + 1]] || 0)) / 2;
  });
  return out;
}

function hieroglyphs() {
  const W = 300;
  const cols = [['frog', '100,000', 64], ['finger', '10,000', 54], ['lotus', '1,000', 48], ['coil', '100', 40], ['arch', '10', 34], ['stroke', '1', 28]];
  const total = cols.reduce((s, [, , w]) => s + w, 0);
  const top = 8, mid = 58, bot = 82;
  let x = (W - total) / 2;
  let out = `<rect x="${x}" y="${top}" width="${total}" height="${bot - top}" fill="#ffffff" stroke="${INK}" stroke-width="1.25"/>`
    + line(x, mid, x + total, mid, { w: 1 });
  cols.forEach(([g, value, w], i) => {
    if (i > 0) out += line(x, top, x, bot, { w: 1 });
    out += GLYPH[g](x + w / 2, mid - 7) + num(x + w / 2, bot - 7, value, { size: 13 });
    x += w;
  });

  // The worked example: 32 is three tens and two ones.
  out += num(156, 120, 'Example: 32 =', { size: 15, anchor: 'end' })
    + glyphRow(173, 120, ['arch', 'arch', 'arch', 'stroke', 'stroke']);

  // The number to read, biggest symbols first.
  const group = ['finger', 'coil', 'coil', 'coil', 'coil', 'arch', 'arch', 'stroke', 'stroke', 'stroke'];
  out += num(W / 2, 148, 'The number:', { size: 14 }) + glyphRow(84, 194, group);
  return svg(W, 202, out);
}

// ── Problem 5: the street map ───────────────────────────────────────────────
// 30 px to a block. With `solved`, one shortest round trip F → A → B → C → F,
// each leg an L: along the street first, then up or down.
const STOPS = { B: [0, 0], C: [2, 4], A: [7, 3], F: [6, 5] };
const LEGS = [
  [[[6, 5], [7, 5], [7, 3]], '#2563eb', '3', [7.47, 3.85]],
  [[[7, 3], [0, 3], [0, 0]], '#ea580c', '10', [3.5, 3.33]],
  [[[0, 0], [2, 0], [2, 4]], '#16a34a', '6', [2.45, 1.35]],
  [[[2, 4], [6, 4], [6, 5]], '#9333ea', '5', [4, 4.33]],
];
function streets(solved = false) {
  const u = 30;
  const X = (x) => 24 + x * u;
  const Y = (y) => 14 + (6 - y) * u;
  const id = solved ? 'pt02-q5s-arrow' : 'pt02-q5-arrow';
  let out = arrowDefs(id);
  for (let i = 1; i < 8; i++) out += line(X(i), Y(0), X(i), Y(6), { w: 1 });
  for (let j = 1; j < 6; j++) out += line(X(0), Y(j), X(8), Y(j), { w: 1 });
  out += `<rect x="${X(0)}" y="${Y(6)}" width="${8 * u}" height="${6 * u}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;

  // The scale: one block across, one block up.
  const arrow = (x1, y1, x2, y2) =>
    `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${INK}" stroke-width="1" marker-end="url(#${id})"/>`;
  const hy = Y(0) + 12, hm = (X(6) + X(7)) / 2;
  out += arrow(hm, hy, X(6) + 0.5, hy) + arrow(hm, hy, X(7) - 0.5, hy) + num(hm, hy + 17, '1 block', { size: 12 });
  const vx = X(8) + 12, vm = (Y(1) + Y(2)) / 2;
  out += arrow(vx, vm, vx, Y(2) + 0.5) + arrow(vx, vm, vx, Y(1) - 0.5) + num(vx + 8, vm + 4, '1 block', { size: 12, anchor: 'start' });

  if (solved) {
    for (const [route, color] of LEGS) {
      out += `<polyline points="${pts(route.map(([x, y]) => [X(x), Y(y)]))}" fill="none" stroke="${color}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    for (const [, color, label, [x, y]] of LEGS) out += tag(X(x), Y(y) + 5, label, color);
  }
  for (const [name, [x, y]] of Object.entries(STOPS)) {
    out += `<circle cx="${X(x)}" cy="${Y(y)}" r="9" fill="#ffffff" stroke="${INK}" stroke-width="1.25"/>` + letter(X(x), Y(y) + 4.5, name, { size: 13 });
  }
  return svg(330, 234, out);
}

// ── Problem 8: the cube and its net ─────────────────────────────────────────
// The net is true to scale, 44 px to an edge.
function cubeNet() {
  // The cube, in oblique view: hidden edges dashed.
  const f = { x: 14, y: 58, s: 52 }, dx = 22, dy = -20;
  const F = [[f.x, f.y], [f.x + f.s, f.y], [f.x + f.s, f.y + f.s], [f.x, f.y + f.s]];
  const Bk = F.map(([x, y]) => [x + dx, y + dy]);
  let out = `<polygon points="${pts(F)}" fill="none" stroke="${INK}" stroke-width="1.5"/>`
    + line(...Bk[0], ...Bk[1]) + line(...Bk[1], ...Bk[2])
    + line(...F[0], ...Bk[0]) + line(...F[1], ...Bk[1]) + line(...F[2], ...Bk[2])
    + line(...Bk[0], ...Bk[3], { w: 1, dash: '4 3' }) + line(...Bk[3], ...Bk[2], { w: 1, dash: '4 3' })
    + line(...F[3], ...Bk[3], { w: 1, dash: '4 3' });

  // "becomes": a double-shafted arrow.
  out += line(106, 70.5, 135, 70.5, { w: 1.25 }) + line(106, 77.5, 135, 77.5, { w: 1.25 })
    + `<polyline points="128,64 140,74 128,84" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"/>`;

  // The net: a row of four, one square above the fourth, one below the second.
  const c = 44;
  const at = ([x, y]) => [156 + x * c, 8 + (3 - y) * c];
  const edge = [[0, 1], [0, 2], [3, 2], [3, 3], [4, 3], [4, 1], [2, 1], [2, 0], [1, 0], [1, 1]];
  out += `<polygon points="${pts(edge.map(at))}" fill="#ffffff" stroke="${INK}" stroke-width="1.5" stroke-linejoin="miter"/>`;
  for (const [a, b] of [[[1, 1], [1, 2]], [[2, 1], [2, 2]], [[3, 1], [3, 2]], [[3, 2], [4, 2]], [[1, 1], [2, 1]]]) {
    out += line(...at(a), ...at(b), { w: 1, dash: '5 4' });
  }
  return svg(344, 148, out);
}

// ── Problem 9: the clock ────────────────────────────────────────────────────
function clock() {
  const cx = 92, cy = 90, r = 62;
  const at = (h, rad) => {
    const t = ((90 - 30 * h) * Math.PI) / 180;
    return [cx + rad * Math.cos(t), cy - rad * Math.sin(t)];
  };
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
  for (let h = 1; h <= 12; h++) {
    out += line(...at(h, r), ...at(h, r - 7), { w: 1.25 });
    const [x, y] = at(h, r + 13);
    out += num(x, y + 4.5, h, { size: 13 });
  }
  out += line(...at(2, r), ...at(8, r), { w: 1.1, dash: '4 3' });
  return svg(184, 180, out);
}

// ── Problem 10: the rectangle turned about the midpoint of DC ───────────────
// True to scale, 34 px to an inch: ABCD is 5 × 3, the turn is about (2.5, 0).
function rotated(solved = false) {
  const u = 34;
  const X = (x) => 24 + x * u;
  const Y = (y) => 26 + (3 - y) * u;
  const box = (x1, y1, x2, y2, attrs) =>
    `<rect x="${n(X(x1))}" y="${n(Y(y2))}" width="${n((x2 - x1) * u)}" height="${n((y2 - y1) * u)}" ${attrs}/>`;
  const id = solved ? 'pt02-q10s-arrow' : 'pt02-q10-arrow';
  let out = arrowDefs(id);
  if (solved) {
    out += box(0, 0, 5, 3, 'fill="#bfdbfe"')
      + box(2.5, -2.5, 5.5, 2.5, 'fill="#bbf7d0"')
      + box(2.5, 0, 5, 2.5, 'fill="#fcd34d"')
      + box(0, 0, 5, 3, 'fill="none" stroke="#2563eb" stroke-width="2"')
      + box(2.5, -2.5, 5.5, 2.5, 'fill="none" stroke="#16a34a" stroke-width="2"');
  } else {
    out += box(0, 0, 5, 3, `fill="${GRAY}"`)
      + box(2.5, -2.5, 5.5, 2.5, `fill="none" stroke="${INK}" stroke-width="1.5"`)
      + box(0, 0, 5, 3, `fill="none" stroke="${INK}" stroke-width="1.5"`);
  }
  // The centre of the turn, and a clockwise arrow round it.
  const px = X(2.5), py = Y(0), r = 10;
  const ang = (deg) => [px + r * Math.cos((deg * Math.PI) / 180), py + r * Math.sin((deg * Math.PI) / 180)];
  const [sx, sy] = ang(-165), [ex, ey] = ang(105);
  out += `<path d="M ${n(sx)} ${n(sy)} A ${r} ${r} 0 1 1 ${n(ex)} ${n(ey)}" fill="none" stroke="${INK}" stroke-width="1.2" marker-end="url(#${id})"/>`
    + dot(px, py, 2.6);
  out += letter(X(0) - 9, Y(3) - 7, 'A') + letter(X(5) + 9, Y(3) - 7, 'B')
    + letter(X(0) - 9, Y(0) + 18, 'D') + letter(X(5) + 7, Y(0) + 18, 'C');
  if (solved) out += num(X(3.75), Y(1.25) + 5, '2.5 × 2.5', { size: 13, weight: 'bold', fill: '#78350f' });
  return svg(232, 228, out);
}

// ── Problem 11: the five tetrominoes and the 3 × 4 rectangle ────────────────
const TETROMINOES = [
  ['I', [[0, 0], [0, 1], [0, 2], [0, 3]]],
  ['O', [[0, 0], [1, 0], [0, 1], [1, 1]]],
  ['L', [[0, 0], [0, 1], [0, 2], [1, 2]]],
  ['T', [[0, 0], [1, 0], [2, 0], [1, 1]]],
  ['S', [[1, 0], [2, 0], [0, 1], [1, 1]]],
];
function tetrominoes() {
  const c = 16, base = 72;
  const cell = (x, y, s) => `<rect x="${n(x)}" y="${n(y)}" width="${s}" height="${s}" fill="#ffffff" stroke="${INK}" stroke-width="1.25"/>`;
  let out = '';
  TETROMINOES.forEach(([name, cells], i) => {
    const cols = Math.max(...cells.map(([col]) => col)) + 1;
    const rows = Math.max(...cells.map(([, row]) => row)) + 1;
    const cx = 36 + i * 62;
    const x0 = cx - (cols * c) / 2, y0 = base - rows * c;
    for (const [col, row] of cells) out += cell(x0 + col * c, y0 + row * c, c);
    out += num(cx, base + 20, name, { size: 15 });
  });
  const g = 20, gx = 160 - 2 * g, gy = 106;
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) out += cell(gx + col * g, gy + row * g, g);
  return svg(320, 174, out);
}

// ── Problem 12: the region of 24 squares ────────────────────────────────────
// True to scale, 26 px to a centimetre. Rows listed from the bottom (y = 0).
const REGION_ROWS = [[2, 4], [1, 5], [0, 6], [0, 6], [1, 5], [2, 4]];
const REGION_EDGE = [[2, 0], [4, 0], [4, 1], [5, 1], [5, 2], [6, 2], [6, 4], [5, 4], [5, 5], [4, 5], [4, 6], [2, 6], [2, 5], [1, 5], [1, 4], [0, 4], [0, 2], [1, 2], [1, 1], [2, 1]];
const REFLEX = [[1, 4], [2, 5], [4, 5], [5, 4], [5, 2], [4, 1], [2, 1], [1, 2]];
function region(solved = false) {
  const c = 26, m = 12;
  const at = ([x, y]) => [m + x * c, m + (6 - y) * c];
  let out = '';
  REGION_ROWS.forEach(([from, to], y) => {
    for (let x = from; x < to; x++) {
      const [px, py] = at([x, y + 1]);
      out += `<rect x="${px}" y="${py}" width="${c}" height="${c}" fill="#ffffff" stroke="${INK}" stroke-width="1"/>`;
    }
  });
  out += `<polygon points="${pts(REGION_EDGE.map(at))}" fill="none" stroke="${INK}" stroke-width="1.75" stroke-linejoin="miter"/>`;
  if (solved) {
    const [ox, oy] = at([3, 3]);
    const r = Math.sqrt(5) * c;
    const [kx, ky] = at([1, 4]);
    out += `<circle cx="${ox}" cy="${oy}" r="${n(r)}" fill="#2563eb" fill-opacity="0.12" stroke="#2563eb" stroke-width="2.5"/>`
      + line(ox, oy, kx, ky, { w: 2, stroke: '#1d4ed8' })
      + `<circle cx="${ox}" cy="${oy}" r="3" fill="#1d4ed8"/>`
      + REFLEX.map((p) => { const [x, y] = at(p); return `<circle cx="${x}" cy="${y}" r="4" fill="#ea580c" stroke="#ffffff" stroke-width="1"/>`; }).join('');
    const [lx, ly] = at([2.2, 3.95]);
    out += tag(lx, ly, '√5', '#1d4ed8', 14);
  }
  return svg(6 * c + 2 * m, 6 * c + 2 * m, out);
}

// ── Problem 13: five histograms of remainders ───────────────────────────────
const HISTOGRAMS = {
  A: [3, 4, 4, 3, 4, 3, 4],
  B: [3, 4, 4, 4, 3, 3, 4],
  C: [3, 4, 4, 4, 4, 3, 3],
  D: [4, 3, 4, 3, 4, 3, 4],
  E: [4, 4, 3, 4, 3, 4, 3],
};
function histogram(name, counts, gx, gy) {
  const small = { size: 11 };
  let out = `<g transform="translate(${gx} ${gy})">`
    + num(2, 15, `(${name})`, { size: 14, weight: 'bold', anchor: 'start' })
    + `<rect x="28" y="24" width="148" height="80" fill="#ffffff" stroke="${RULE}" stroke-width="1"/>`;
  counts.forEach((count, i) => {
    const cx = 45 + i * 19, h = count * 14;
    out += `<rect x="${cx - 6}" y="${104 - h}" width="12" height="${h}" fill="${count === 4 ? '#64748b' : GRAY}"/>`
      + num(cx, 100 - h, count, small) + num(cx, 117, i, small);
  });
  out += num(102, 131, 'Remainder', small)
    + `<text x="20" y="64" font-family="${SERIF}" font-size="11" text-anchor="middle" fill="${INK}" transform="rotate(-90 20 64)">Count</text>`;
  return `${out}</g>`;
}
function histograms() {
  const places = [[4, 2], [186, 2], [368, 2], [95, 142], [277, 142]];
  return svg(550, 280, Object.entries(HISTOGRAMS).map(([name, counts], i) => histogram(name, counts, ...places[i])).join(''));
}

// ── Problem 15: the 6 × 6 grid and its fold ─────────────────────────────────
function fold() {
  const c = 24, x0 = 10, y0 = 18;
  let out = `<rect x="${x0}" y="${y0}" width="${6 * c}" height="${6 * c}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
  for (let i = 1; i < 6; i++) out += line(x0 + i * c, y0, x0 + i * c, y0 + 6 * c, { w: 1 }) + line(x0, y0 + i * c, x0 + 6 * c, y0 + i * c, { w: 1 });
  out += line(x0 + 3 * c, y0 - 14, x0 + 3 * c, y0 + 6 * c + 14, { w: 1.75, dash: '5 4' });
  return svg(6 * c + 2 * x0, 6 * c + 2 * y0, out);
}

// ── Problem 17: who works where in Markovia ─────────────────────────────────
// Between each two cities a lens of two curves: the outer one bulges away from
// the middle of the triangle, the inner one towards it.
const CITIES = { A: [130, 31], B: [45, 178], C: [215, 178] };
const COMMUTES = [
  ['A', 'B', 'out', '1/4'], ['B', 'A', 'in', '1/3'],
  ['A', 'C', 'in', '1/5'], ['C', 'A', 'out', '1/8'],
  ['C', 'B', 'in', '1/10'], ['B', 'C', 'out', '1/6'],
];
function markovia() {
  const R = 13, bulge = 32;
  const g = [0, 1].map((k) => (CITIES.A[k] + CITIES.B[k] + CITIES.C[k]) / 3);
  let out = arrowDefs('pt02-q17-arrow');
  for (const [from, to, side, label] of COMMUTES) {
    const [x1, y1] = CITIES[from];
    const [x2, y2] = CITIES[to];
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const d = Math.hypot(mx - g[0], my - g[1]);
    const sign = side === 'out' ? 1 : -1;
    const nx = ((mx - g[0]) / d) * sign, ny = ((my - g[1]) / d) * sign;
    const qx = mx + nx * bulge, qy = my + ny * bulge;
    // Each end sits on its circle, aimed at the control point.
    const rim = (px, py, rr) => { const l = Math.hypot(qx - px, qy - py); return [px + ((qx - px) / l) * rr, py + ((qy - py) / l) * rr]; };
    const [sx, sy] = rim(x1, y1, R);
    const [ex, ey] = rim(x2, y2, R + 1.5);
    out += `<path d="M ${n(sx)} ${n(sy)} Q ${n(qx)} ${n(qy)} ${n(ex)} ${n(ey)}" fill="none" stroke="${INK}" stroke-width="1.25" marker-end="url(#pt02-q17-arrow)"/>`;
    // The label sits just past the curve's peak, on the side away from its twin.
    const reach = side === 'out' ? 30 : 29;
    out += num(mx + nx * reach, my + ny * reach + 4.5, label, { size: 13 });
  }
  for (const [name, [x, y]] of Object.entries(CITIES)) {
    out += `<circle cx="${x}" cy="${y}" r="${R}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>` + letter(x, y + 5.5, name, { size: 15 });
  }
  return svg(260, 218, out);
}

// ── Problem 18: two circles, two inscribed squares ──────────────────────────
// Not to scale on purpose: the right circle is drawn about 1.5 times the left.
function inscribed() {
  // The circular segment cut off by the side from corner p to corner q.
  const segment = (r, p, q) => `<path d="M ${n(p[0])} ${n(p[1])} A ${r} ${r} 0 0 1 ${n(q[0])} ${n(q[1])} Z" fill="${GRAY}"/>`;
  const figure = (cx, cy, r, sides, name, italic) => {
    const h = r / Math.SQRT2;
    const c = [[cx - h, cy - h], [cx + h, cy - h], [cx + h, cy + h], [cx - h, cy + h]]; // clockwise from top-left
    let out = sides.map((i) => segment(r, c[i], c[(i + 1) % 4])).join('')
      + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="1.5"/>`
      + `<polygon points="${pts(c)}" fill="none" stroke="${INK}" stroke-width="1.5"/>`
      + line(cx, cy, ...c[1], { w: 1.1 }) + dot(cx, cy, 2.2);
    const lx = cx + h / 2 + 7, ly = cy - h / 2 + 10;
    out += italic ? letter(lx, ly, name, { size: 15 }) : num(lx, ly, name, { size: 14 });
    return out;
  };
  return svg(312, 160,
    figure(58, 80, 48, [0, 1, 2, 3], '1', false)
    + figure(228, 80, 74, [1], 'R', true));
}

// ── Problem 19: the road from A to B ────────────────────────────────────────
function road() {
  const x0 = 40, len = 360, third = len / 3, y = 60, h = 18;
  // A curly brace under a stretch, tips up and its point down.
  const brace = (x1, x2, top) => {
    const q = 5, xm = (x1 + x2) / 2;
    return `<path d="M ${x1} ${top} Q ${x1} ${top + q} ${x1 + q} ${top + q} L ${xm - q} ${top + q} Q ${xm} ${top + q} ${xm} ${top + 2 * q} Q ${xm} ${top + q} ${xm + q} ${top + q} L ${x2 - q} ${top + q} Q ${x2} ${top + q} ${x2} ${top}" fill="none" stroke="${INK}" stroke-width="1.1"/>`;
  };
  let out = `<rect x="${x0}" y="${y}" width="${len}" height="${h}" fill="${GRAY}" stroke="${INK}" stroke-width="1.25"/>`
    + line(x0 + third, y, x0 + third, y + h, { w: 1.1, dash: '3 3' })
    + line(x0 + 2 * third, y, x0 + 2 * third, y + h, { w: 1.1, dash: '3 3' })
    + letter(x0 - 10, y + 14, 'A', { anchor: 'end' }) + letter(x0 + len + 10, y + 14, 'B', { anchor: 'start' });
  ['25 mph', '40 mph', '20 mph'].forEach((speed, i) => {
    out += dimension(x0 + i * third, 36, x0 + (i + 1) * third, 36, speed);
  });
  for (let i = 0; i < 3; i++) {
    const a = x0 + i * third, b = a + third;
    out += brace(a + 2, b - 2, y + h + 5) + num((a + b) / 2, y + h + 30, '5 mi', { size: 14 });
  }
  return svg(430, 116, out);
}

// ── Problem 21: the pods and their walkways ─────────────────────────────────
// Each walkway is a double line: a thick ink stroke with a thin white one on top.
const PODS = { A: [95, 25], G: [205, 30], F: [290, 85], B: [110, 85], C: [25, 150], D: [150, 150], E: [240, 170] };
const WALKWAYS = [
  'M 95 25 Q 150 16 205 30', // A–G
  'M 205 30 Q 268 36 290 85', // G–F
  'M 95 25 Q 190 62 290 85', // A–F
  'M 95 25 L 110 85', // A–B
  'M 95 25 C 22 26 2 110 25 150', // A–C, round the left
  'M 110 85 L 290 83', // B–F
  'M 110 85 L 25 150', // B–C
  'M 25 150 C 100 135 150 104 205 101 C 245 99 268 94 290 91', // C–F, the wavy one
  'M 25 150 L 150 150', // C–D
  'M 150 150 L 240 170', // D–E
  'M 25 150 Q 128 205 240 170', // C–E, along the bottom
  'M 240 170 Q 306 148 290 85', // E–F, round the right
];
function pods() {
  const ox = 14, oy = 8, half = 10;
  let out = `<g transform="translate(${ox} ${oy})" fill="none" stroke-linecap="round">`;
  for (const d of WALKWAYS) out += `<path d="${d}" stroke="${INK}" stroke-width="5"/>`;
  for (const d of WALKWAYS) out += `<path d="${d}" stroke="#ffffff" stroke-width="2"/>`;
  for (const [name, [x, y]] of Object.entries(PODS)) {
    const shaded = 'CEF'.includes(name);
    out += `<rect x="${x - half}" y="${y - half}" width="${2 * half}" height="${2 * half}" fill="${shaded ? GRAY : '#ffffff'}" stroke="${INK}" stroke-width="1.25"/>`
      + letter(x, y + 5, name, { size: 14 });
  }
  return svg(326, 202, `${out}</g>`);
}

// ── Problem 22: coats on a row of hooks ─────────────────────────────────────
function hooks() {
  const x0 = 50, len = 300, rail = 22, gap = len / 8;
  let out = line(x0, rail, x0 + len, rail, { w: 2 });
  for (let k = 0; k < 3; k++) out += dot(22 + k * 8, rail, 1.6) + dot(x0 + len + 12 + k * 8, rail, 1.6);
  const coat = (x, t) =>
    `<path d="M ${x} ${t} C ${x - 7} ${t} ${x - 11} ${t + 3} ${x - 13} ${t + 8} L ${x - 19} ${t + 44} L ${x - 14} ${t + 46} L ${x - 12} ${t + 22} L ${x - 16} ${t + 62} L ${x + 16} ${t + 62} L ${x + 12} ${t + 22} L ${x + 14} ${t + 46} L ${x + 19} ${t + 44} L ${x + 13} ${t + 8} C ${x + 11} ${t + 3} ${x + 7} ${t} ${x} ${t} Z" fill="#ffffff" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`
    + line(x, t + 5, x, t + 62, { w: 1 });
  for (let i = 0; i < 8; i++) {
    const x = x0 + gap / 2 + i * gap;
    out += `<path d="M ${n(x)} ${rail} L ${n(x)} ${rail + 12} Q ${n(x)} ${rail + 17} ${n(x - 4)} ${rail + 17} Q ${n(x - 8)} ${rail + 17} ${n(x - 8)} ${rail + 12}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
    if (i === 2 || i === 5) out += coat(n(x), rail + 12);
  }
  return svg(400, 104, out);
}

// ── Problem 24: the trapezoid ───────────────────────────────────────────────
// True to scale, 30 px to a unit: legs of 3.5 at 60°, base 7.
function trapezoid() {
  const u = 30, H = 3.5 * Math.sin(Math.PI / 3);
  const at = ([x, y]) => [26 + x * u, 24 + (H - y) * u];
  const B = at([0, 0]), C = at([7, 0]), D = at([7 - 1.75, H]), A = at([1.75, H]);
  const polar = ([x, y], r, deg) => [x + r * Math.cos((deg * Math.PI) / 180), y - r * Math.sin((deg * Math.PI) / 180)];
  // An arc from one direction to another (degrees, counter-clockwise in math).
  const arc = (p, r, from, to) => {
    const s = polar(p, r, from), e = polar(p, r, to);
    return `<path d="M ${n(s[0])} ${n(s[1])} A ${r} ${r} 0 0 0 ${n(e[0])} ${n(e[1])}" fill="none" stroke="${INK}" stroke-width="1"/>`;
  };
  const tick = (p, q) => {
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    const l = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const px = -(q[1] - p[1]) / l, py = (q[0] - p[0]) / l;
    return line(mx - px * 5, my - py * 5, mx + px * 5, my + py * 5, { w: 1.25 });
  };
  let out = `<polygon points="${pts([A, B, C, D])}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`
    + arc(B, 16, 0, 60) + arc(C, 16, 120, 180)
    + arc(A, 9, 240, 360) + arc(D, 9, 180, 300)
    + tick(A, B) + tick(D, C);
  const [bx, by] = polar(B, 30, 24), [cx, cy] = polar(C, 30, 156);
  out += num(bx, by + 4, '60°', { size: 12 }) + num(cx, cy + 4, '60°', { size: 12 });
  out += letter(A[0] - 4, A[1] - 8, 'A') + letter(D[0] + 4, D[1] - 8, 'D')
    + letter(B[0] - 6, B[1] + 18, 'B') + letter(C[0] + 6, C[1] + 18, 'C');
  return svg(264, 148, out);
}

// ── Problem 25: two paths across the diamond grid ───────────────────────────
// Lattice (u, v): u counts steps to the north-east, v steps to the north-west.
// A cell is shaded when it lies to the right of the path — in row v = j, every
// cell from the u where the path steps north-west out of that row. The caption
// is counted from the cells actually shaded.
function diamond(x0, y0, steps) {
  const s = 13;
  const P = (u, v) => [x0 + (u - v) * s, y0 - (u + v) * s];
  const leave = [];
  const path = [P(0, 0)];
  let u = 0, v = 0;
  for (const step of steps) {
    if (step === 'NE') u += 1;
    else { leave[v] = u; v += 1; }
    path.push(P(u, v));
  }
  let out = '', area = 0;
  for (let j = 0; j < 5; j++) {
    for (let i = leave[j]; i < 5; i++) {
      out += `<polygon points="${pts([P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)])}" fill="${GRAY}"/>`;
      area += 1;
    }
  }
  for (let k = 0; k <= 5; k++) out += line(...P(k, 0), ...P(k, 5), { w: 1, stroke: RULE }) + line(...P(0, k), ...P(5, k), { w: 1, stroke: RULE });
  out += `<polyline points="${pts(path)}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="miter" stroke-linecap="round"/>`
    + dot(...P(0, 0), 3.5) + dot(...P(5, 5), 3.5)
    + num(x0, y0 + 24, `area = ${area}`, { size: 14 });
  return out;
}
function diamonds() {
  return svg(350, 178,
    diamond(88, 144, ['NE', 'NE', 'NW', 'NW', 'NW', 'NE', 'NE', 'NW', 'NW', 'NE'])
    + diamond(262, 144, ['NW', 'NE', 'NE', 'NE', 'NW', 'NW', 'NW', 'NW', 'NE', 'NE']));
}

export const FIGURES = {
  Q1: star(),
  Q2: hieroglyphs(),
  Q5: streets(),
  SOL_Q5: streets(true),
  Q8: cubeNet(),
  Q9: clock(),
  Q10: rotated(),
  SOL_Q10: rotated(true),
  Q11: tetrominoes(),
  Q12: region(),
  SOL_Q12: region(true),
  Q13: histograms(),
  Q15: fold(),
  Q17: markovia(),
  Q18: inscribed(),
  Q19: road(),
  Q21: pods(),
  Q22: hooks(),
  Q24: trapezoid(),
  Q25: diamonds(),
};
