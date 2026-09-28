// src/data/AMC8/PT_01/figures.js
// The figures printed beside the problems of Practice Test 1, and the extra
// ones the Review task shows in a solution. Drawn for this app from the
// geometry each problem describes.
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

const INK = '#1e293b';
const GRAY = '#cbd5e1';
const PATH_GRAY = '#94a3b8';
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

// ── Problem 3: four squares sharing a corner ────────────────────────────────
// True to scale, 22 px to a unit, bottom-left corners together.
function squares() {
  const u = 22, x0 = 62, y0 = 262;
  const sq = (s, fill) => `<rect x="${x0}" y="${y0 - s * u}" width="${s * u}" height="${s * u}" fill="${fill}" stroke="${INK}" stroke-width="1.5"/>`;
  return svg(340, 300,
    sq(10, GRAY) + sq(9, '#ffffff') + sq(7, GRAY) + sq(4, '#ffffff')
    + dimension(x0, 26, x0 + 9 * u, 26, '9')
    + dimension(x0 + 10 * u + 18, y0 - 10 * u, x0 + 10 * u + 18, y0, '10')
    + dimension(x0 - 20, y0 - 7 * u, x0 - 20, y0, '7')
    + dimension(x0, y0 + 20, x0 + 4 * u, y0 + 20, '4'));
}

// ── Problem 6: four paths round a rink ──────────────────────────────────────
// Each rink is a rectangle with a semicircle on each end. The path runs 6 px
// inside the boards: straight walls at x = cx ± 22 from y = 47 to y = 117,
// semicircles of radius 22 centred on (cx, 47) and (cx, 117).
function rinks() {
  const r = 22, top = 47, bot = 117;
  const board = (cx) => `<rect x="${cx - 28}" y="${top - 28}" width="56" height="${bot - top + 56}" rx="28" fill="#ffffff" stroke="${INK}" stroke-width="2"/>`;
  const stroke = (d) => `<path d="${d}" fill="none" stroke="${PATH_GRAY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`;
  const capTop = (cx) => `M ${cx - r} ${top} A ${r} ${r} 0 0 1 ${cx + r} ${top}`;
  const capBot = (cx) => `A ${r} ${r} 0 0 1 ${cx - r} ${bot}`;

  const P = (cx) => stroke(`${capTop(cx)} L ${cx + r} ${bot} ${capBot(cx)} Z`);
  const mid = (top + bot) / 2;
  const Q = (cx) => stroke(`${capTop(cx)} L ${cx - r} ${mid} L ${cx + r} ${bot} ${capBot(cx)} L ${cx + r} ${mid} Z`);
  const S = (cx) => stroke(`${capTop(cx)} L ${cx - r} ${bot} A ${r} ${r} 0 0 0 ${cx + r} ${bot} L ${cx - r} ${top}`);
  // R cuts every corner: its six corners all sit on the path P takes.
  const R = (cx) => stroke(`M ${cx - r} ${top + 8} L ${cx + 2} ${n(top - 21.9)} L ${cx + r} ${top + 4} L ${cx + r} ${bot - 10} L ${cx - 2} ${n(bot + 21.9)} L ${cx - r} ${bot - 6} Z`);

  const xs = [55, 165, 275, 385];
  const draw = [P, Q, R, S];
  const names = ['Path P', 'Path Q', 'Path R', 'Path S'];
  return svg(440, 182, xs.map((cx, i) => board(cx) + draw[i](cx) + num(cx, 172, names[i], { size: 14 })).join(''));
}

// ── Problem 7: the three tiles and the 3 × 7 rectangle ──────────────────────
function grid(x, y, cols, rows, c) {
  let out = `<rect x="${x}" y="${y}" width="${cols * c}" height="${rows * c}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
  for (let i = 1; i < cols; i++) out += line(x + i * c, y, x + i * c, y + rows * c, { w: 1, dash: '2 3' });
  for (let j = 1; j < rows; j++) out += line(x, y + j * c, x + cols * c, y + j * c, { w: 1, dash: '2 3' });
  return out;
}
function tiles() {
  const c = 24;
  return svg(440, 110,
    arrowDefs('pt01-f7-arrow')
    + grid(14, 26, 2, 2, c)
    + grid(98, 14, 1, 1, c)
    + grid(74, 58, 4, 1, c)
    + `<line x1="196" y1="55" x2="236" y2="55" stroke="${INK}" stroke-width="1.5" marker-end="url(#pt01-f7-arrow)"/>`
    + grid(258, 19, 7, 3, c));
}

// The Review's picture for problem 7: five unit tiles, and why one is not enough.
function tilesSolved() {
  const c = 30, x = 20, y = 46;
  const BLUE = '#bfdbfe', GREEN = '#bbf7d0', AMBER = '#fde68a';
  const cell = (col, row, w, h, fill) =>
    `<rect x="${x + col * c}" y="${y + row * c}" width="${w * c}" height="${h * c}" fill="${fill}" stroke="${INK}" stroke-width="1.5"/>`;
  const x2 = 270;
  let stripes = '';
  for (let col = 0; col < 7; col++) {
    stripes += `<rect x="${x2 + col * c}" y="${y}" width="${c}" height="${3 * c}" fill="${col % 2 === 0 ? '#fecaca' : '#ffffff'}" stroke="${INK}" stroke-width="1"/>`;
    for (let row = 1; row < 3; row++) stripes += line(x2 + col * c, y + row * c, x2 + (col + 1) * c, y + row * c, { w: 1, dash: '2 3' });
  }
  return svg(500, 190,
    num(x + 3.5 * c, 30, 'Five 1 × 1 tiles is possible', { size: 14, weight: 'bold' })
    + cell(0, 0, 2, 2, BLUE) + cell(2, 0, 2, 2, BLUE) + cell(4, 0, 2, 2, BLUE)
    + cell(0, 2, 4, 1, GREEN)
    + cell(6, 0, 1, 1, AMBER) + cell(6, 1, 1, 1, AMBER)
    + cell(4, 2, 1, 1, AMBER) + cell(5, 2, 1, 1, AMBER) + cell(6, 2, 1, 1, AMBER)
    + num(x2 + 3.5 * c, 30, '12 red cells, 9 white cells', { size: 14, weight: 'bold' })
    + stripes);
}

/** "A(5, 7)": the italic name, then its coordinates, centred on x together. */
function pointName(x, y, name, coords) {
  const w = 11 + coords.length * 7.2;
  return letter(x - w / 2, y, name, { anchor: 'start' }) + num(x - w / 2 + 12, y, coords.replace('y', '<tspan font-style="italic">y</tspan>'), { size: 16, anchor: 'start' });
}

// ── Problem 11: the triangle, not to scale ──────────────────────────────────
function triangle() {
  const A = [150, 118], B = [352, 118], C = [74, 40];
  return svg(430, 160,
    `<polygon points="${A} ${B} ${C}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`
    + dot(...A) + dot(...B) + dot(...C)
    + pointName(A[0], 144, 'A', '(5, 7)')
    + pointName(B[0], 144, 'B', '(11, 7)')
    + pointName(C[0] - 8, 28, 'C', '(3, y)'));
}

// ── Problem 13: the staircase ───────────────────────────────────────────────
function stairs() {
  const x0 = 150, y0 = 150, run = 40, rise = 30;
  let d = `M 60 ${y0} L ${x0} ${y0}`;
  for (let i = 0; i < 4; i++) d += ` L ${x0 + i * run} ${y0 - (i + 1) * rise} L ${x0 + (i + 1) * run} ${y0 - (i + 1) * rise}`;
  return svg(360, 180,
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.75" stroke-linejoin="miter"/>`
    // Buzz, waiting on the ground: a body, a head and two ears.
    + `<ellipse cx="98" cy="134" rx="20" ry="15" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="120" cy="120" r="10" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + `<ellipse cx="115" cy="100" rx="4" ry="12" fill="#ffffff" stroke="${INK}" stroke-width="1.5" transform="rotate(-12 115 100)"/>`
    + `<ellipse cx="124" cy="101" rx="4" ry="12" fill="#ffffff" stroke="${INK}" stroke-width="1.5" transform="rotate(10 124 101)"/>`
    + `<circle cx="124" cy="118" r="1.6" fill="${INK}"/>`
    + `<circle cx="78" cy="130" r="5" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + num(98, 170, 'ground', { size: 13, fill: '#64748b' }));
}

// ── Problem 14: one-way roads ───────────────────────────────────────────────
const TOWNS = { A: [40, 130], X: [110, 40], M: [190, 130], Y: [270, 40], C: [340, 130], Z: [470, 130] };
const ROADS = [
  ['A', 'X', 5, [-12, -2]], ['A', 'M', 8, [0, 18]], ['X', 'M', 2, [-13, 2]], ['X', 'Y', 10, [0, -8]],
  ['M', 'Y', 6, [13, 4]], ['M', 'C', 14, [0, 18]], ['Y', 'C', 5, [-13, 4]], ['Y', 'Z', 17, [6, -10]],
  ['C', 'Z', 10, [0, 18]],
];
function network(highlight = []) {
  const R = 15;
  const RED = '#dc2626';
  const on = (a, b) => highlight.some(([p, q]) => p === a && q === b);
  let out = arrowDefs('pt01-f14-arrow') + arrowDefs('pt01-f14-arrow-on', RED);
  for (const [a, b, km, [ox, oy]] of ROADS) {
    const [x1, y1] = TOWNS[a];
    const [x2, y2] = TOWNS[b];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    const hot = on(a, b);
    out += `<line x1="${n(x1 + ux * R)}" y1="${n(y1 + uy * R)}" x2="${n(x2 - ux * (R + 2))}" y2="${n(y2 - uy * (R + 2))}" stroke="${hot ? RED : INK}" stroke-width="${hot ? 3 : 1.25}" marker-end="url(#pt01-f14-arrow${hot ? '-on' : ''})"/>`;
    out += num((x1 + x2) / 2 + ox, (y1 + y2) / 2 + oy + 5, km, { size: 14, fill: hot ? RED : INK, weight: hot ? 'bold' : 'normal' });
  }
  // The long road from M to Z bends under C.
  out += `<path d="M ${TOWNS.M[0] + 9} ${TOWNS.M[1] + 12} Q 330 196 ${TOWNS.Z[0] - 13} ${TOWNS.Z[1] + 11}" fill="none" stroke="${INK}" stroke-width="1.25" marker-end="url(#pt01-f14-arrow)"/>`;
  out += num(330, 186, 25, { size: 14 });
  for (const [name, [x, y]] of Object.entries(TOWNS)) {
    out += `<circle cx="${x}" cy="${y}" r="${R}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>` + letter(x, y + 5.5, name);
  }
  return svg(510, 200, out);
}

// ── Problem 17: what a king attacks ─────────────────────────────────────────
function king() {
  const c = 44, x = 12, y = 12, cx = x + 1.5 * c, cy = y + 1.5 * c;
  let out = arrowDefs('pt01-f17-arrow');
  out += `<rect x="${x}" y="${y}" width="${3 * c}" height="${3 * c}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 1; i < 3; i++) out += line(x + i * c, y, x + i * c, y + 3 * c) + line(x, y + i * c, x + 3 * c, y + i * c);
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    const k = Math.hypot(dx, dy);
    out += `<line x1="${n(cx + (dx / k) * 13)}" y1="${n(cy + (dy / k) * 13)}" x2="${n(cx + dx * c * 0.8)}" y2="${n(cy + dy * c * 0.8)}" stroke="${INK}" stroke-width="1.25" marker-end="url(#pt01-f17-arrow)"/>`;
  }
  return svg(156, 156, out + letter(cx, cy + 6, 'K', { size: 17 }));
}

// ── Problem 18: three circles and a shaded sector ───────────────────────────
// True to scale: OB points 70° above the positive x-axis and the angle is 108°.
function circles() {
  const cx = 130, cy = 130, u = 34;
  const at = (r, deg) => [cx + r * u * Math.cos((deg * Math.PI) / 180), cy - r * u * Math.sin((deg * Math.PI) / 180)];
  const b = 70, c = 70 - 108;
  const [bx, by] = at(3, b);
  const [cx3, cy3] = at(3, c);
  const [bx2, by2] = at(2, b);
  const [cx2, cy2] = at(2, c);
  const sector = `M ${n(bx)} ${n(by)} A ${3 * u} ${3 * u} 0 0 1 ${n(cx3)} ${n(cy3)} L ${n(cx2)} ${n(cy2)} A ${2 * u} ${2 * u} 0 0 0 ${n(bx2)} ${n(by2)} Z`;
  return svg(270, 270,
    `<circle cx="${cx}" cy="${cy}" r="${3 * u}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + `<path d="${sector}" fill="${GRAY}" stroke="none"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${2 * u}" fill="${GRAY}" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${u}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${3 * u}" fill="none" stroke="${INK}" stroke-width="1.5"/>`
    + line(cx, cy, bx, by, { w: 1.75 }) + line(cx, cy, cx3, cy3, { w: 1.75 })
    + dot(cx, cy) + dot(bx, by) + dot(cx3, cy3)
    + letter(cx - 13, cy + 6, 'O') + letter(bx + 4, by - 9, 'B') + letter(cx3 + 10, cy3 + 16, 'C'));
}

// ── Problem 20: the cube ────────────────────────────────────────────────────
const CUBE = {
  P: [60, 80], Q: [180, 80], V: [180, 200], W: [60, 200],
  S: [108, 42], R: [228, 42], U: [228, 162], T: [108, 162],
};
const CUBE_EDGES = ['PQ', 'QV', 'VW', 'WP', 'SR', 'RU', 'UT', 'TS', 'PS', 'QR', 'VU', 'WT'];
const CUBE_LABELS = { P: [-12, -4], Q: [-12, -6], V: [10, 16], W: [-13, 14], S: [2, -10], R: [10, -8], U: [14, 4], T: [13, -5] };
function cube(triangles = []) {
  let out = '';
  const COLORS = ['#dc2626', '#2563eb', '#16a34a'];
  triangles.forEach((t, i) => {
    out += `<polygon points="${[...t].map((v) => CUBE[v].join(',')).join(' ')}" fill="${COLORS[i]}" fill-opacity="0.13" stroke="${COLORS[i]}" stroke-width="2.5" stroke-linejoin="round"/>`;
  });
  for (const [a, b] of CUBE_EDGES) out += line(...CUBE[a], ...CUBE[b], { w: 1.5 });
  for (const [v, [x, y]] of Object.entries(CUBE)) {
    out += dot(x, y) + letter(x + CUBE_LABELS[v][0], y + CUBE_LABELS[v][1], v, { size: 16 });
  }
  return svg(270, 226, out);
}

// ── Problem 22: the roll of tape, seen from the side ────────────────────────
function tape() {
  const cx = 120, cy = 100, R = 72, r = 36;
  return svg(240, 224,
    arrowDefs('pt01-f22-arrow')
    + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${GRAY}" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    // the loose end of the tape
    + line(cx + R, cy, cx + R, cy + 46, { w: 1.5 })
    + `<line x1="${cx - 8}" y1="${cy + 8}" x2="${cx - r + 2}" y2="${cy + 8}" stroke="${INK}" stroke-width="1" marker-end="url(#pt01-f22-arrow)"/>`
    + `<line x1="${cx + 8}" y1="${cy + 8}" x2="${cx + r - 2}" y2="${cy + 8}" stroke="${INK}" stroke-width="1" marker-end="url(#pt01-f22-arrow)"/>`
    + num(cx, cy - 4, '2 in.', { size: 14 })
    + dimension(cx - R, 196, cx + R, 196, '4 in.'));
}

// ── Problem 23: the first segment and its four cells ────────────────────────
function lattice() {
  const c = 30, ox = 50, oy = 170; // the origin, in pixels
  const X = (v) => ox + v * c;
  const Y = (v) => oy - v * c;
  let out = arrowDefs('pt01-f23-arrow');
  for (const [col, row] of [[0, 3], [0, 2], [1, 1], [1, 0]]) {
    out += `<rect x="${X(col)}" y="${Y(row + 1)}" width="${c}" height="${c}" fill="${GRAY}"/>`;
  }
  for (let i = -1; i <= 5; i++) {
    out += line(X(i), Y(-1), X(i), Y(5), { w: 1, stroke: '#94a3b8' }) + line(X(-1), Y(i), X(5), Y(i), { w: 1, stroke: '#94a3b8' });
  }
  out += `<line x1="${X(-1)}" y1="${Y(0)}" x2="${X(5) - 2}" y2="${Y(0)}" stroke="${INK}" stroke-width="1.5" marker-end="url(#pt01-f23-arrow)"/>`;
  out += `<line x1="${X(0)}" y1="${Y(-1)}" x2="${X(0)}" y2="${Y(5) + 2}" stroke="${INK}" stroke-width="1.5" marker-end="url(#pt01-f23-arrow)"/>`;
  out += line(X(0), Y(4), X(2), Y(0), { w: 1.75 }) + dot(X(0), Y(4), 3.5) + dot(X(2), Y(0), 3.5);
  out += `<rect x="${X(0) - 46}" y="${Y(4) - 25}" width="40" height="19" fill="#ffffff" fill-opacity="0.9"/>` + num(X(0) - 26, Y(4) - 10, '(0, 4)', { size: 14 });
  out += `<rect x="${X(2) + 4}" y="${Y(0) + 5}" width="40" height="19" fill="#ffffff" fill-opacity="0.9"/>` + num(X(2) + 24, Y(0) + 20, '(2, 0)', { size: 14 });
  return svg(230, 220, out);
}

// ── Problem 24: the two mountains ───────────────────────────────────────────
// True to scale, 10 px to a foot: peaks at (8, 8) and (18, 12), meeting at (11, 5).
function mountains(solved = false) {
  const u = 10, ox = 56, oy = 160;
  const X = (v) => ox + v * u;
  const Y = (v) => oy - v * u;
  const pts = (list) => list.map(([a, b]) => `${X(a)},${Y(b)}`).join(' ');
  const rightAngle = (px, py) => `<rect x="${X(px) - 5}" y="${Y(py) + 2.1}" width="10" height="10" fill="none" stroke="${INK}" stroke-width="1" transform="rotate(45 ${X(px)} ${Y(py) + 7.1})"/>`;

  let out = '';
  if (solved) {
    out += `<polygon points="${pts([[0, 0], [8, 8], [16, 0]])}" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>`;
    out += `<polygon points="${pts([[6, 0], [18, 12], [30, 0]])}" fill="#bbf7d0" fill-opacity="0.8" stroke="#16a34a" stroke-width="1.5"/>`;
    out += `<polygon points="${pts([[6, 0], [11, 5], [16, 0]])}" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>`;
    // Each base is measured on its own line, because the two bases overlap.
    const base = (from, to, row, label, color) =>
      line(X(from), Y(0) + row, X(to), Y(0) + row, { w: 1.5, stroke: color })
      + line(X(from), Y(0) + row - 4, X(from), Y(0) + row + 4, { w: 1.5, stroke: color })
      + line(X(to), Y(0) + row - 4, X(to), Y(0) + row + 4, { w: 1.5, stroke: color })
      + `<rect x="${X((from + to) / 2) - 16}" y="${Y(0) + row - 9}" width="32" height="18" fill="#ffffff"/>`
      + num(X((from + to) / 2), Y(0) + row + 5, label, { size: 14, fill: color, weight: 'bold' });
    out += base(0, 16, 14, '16', '#1d4ed8') + base(6, 30, 34, '24', '#15803d');
  } else {
    out += `<polygon points="${pts([[0, 0], [8, 8], [11, 5], [18, 12], [30, 0]])}" fill="${GRAY}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
    out += num(X(0) + 25, Y(0) - 5, '45°', { size: 12 }) + num(X(30) - 25, Y(0) - 5, '45°', { size: 12 });
  }
  out += rightAngle(8, 8) + rightAngle(18, 12);
  out += line(X(11), Y(5), X(11), Y(0), { w: 1.25, dash: '4 3' }) + letter(X(11) + 10, Y(2) + 2, 'h');
  out += line(X(0) - 20, Y(8), X(8) - 6, Y(8), { w: 1, dash: '4 3' }) + dimension(X(0) - 20, Y(8), X(0) - 20, Y(0), '8');
  out += line(X(18) + 6, Y(12), X(30) + 20, Y(12), { w: 1, dash: '4 3' }) + dimension(X(30) + 20, Y(12), X(30) + 20, Y(0), '12');
  return svg(420, solved ? 210 : 176, out);
}

// ── Problem 25: the seats ───────────────────────────────────────────────────
function seats() {
  let out = '';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      out += `<rect x="${12 + col * 34}" y="${10 + row * 42}" width="30" height="30" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
    }
  }
  return svg(122, 182, out);
}

export const FIGURES = {
  Q3: squares(),
  Q6: rinks(),
  Q7: tiles(),
  Q7_SOLVED: tilesSolved(),
  Q11: triangle(),
  Q13: stairs(),
  Q14: network(),
  Q14_SOLVED: network([['A', 'X'], ['X', 'M'], ['M', 'Y'], ['Y', 'C'], ['C', 'Z']]),
  Q17: king(),
  Q18: circles(),
  Q20: cube(),
  Q20_SOLVED: cube(['PRT', 'PRV', 'PTV']),
  Q22: tape(),
  Q23: lattice(),
  Q24: mountains(),
  Q24_SOLVED: mountains(true),
  Q25: seats(),
};
