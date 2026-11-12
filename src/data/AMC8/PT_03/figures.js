// src/data/AMC8/PT_03/figures.js
// The figures printed beside the problems of Practice Test 3 (the 2026 paper).
// Drawn for this app from the geometry each problem describes; none is copied
// from the printed paper.
//
// TEST figures, not teaching diagrams: black ink, gray shading, serif letters,
// on a white panel in both themes (see PT_02/figures.js). Each states its
// natural size and scales down, never up. Marker and clip ids start `pt03-`.
// `npm run audit:svg` does not read this file: look at the figures in the
// harness (`preview-amc8.html?unit=PT_03&open=FIGURES`).

const INK = '#1e293b';
const GRAY = '#cbd5e1';
const LIGHT = '#e5e7eb';
const RULE = '#94a3b8';
const SERIF = "Georgia, 'Times New Roman', serif";

const n = (v) => Number(v.toFixed(1));

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto" role="img">${body}</svg>`;

const num = (x, y, s, { size = 15, anchor = 'middle', fill = INK, weight = 'normal', style = 'normal' } = {}) =>
  `<text x="${n(x)}" y="${n(y)}" font-family="${SERIF}" font-size="${size}" font-weight="${weight}" font-style="${style}" text-anchor="${anchor}" fill="${fill}">${s}</text>`;

const line = (x1, y1, x2, y2, { w = 1.5, stroke = INK, dash = '' } = {}) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>`;

const dot = (x, y, r = 3.5) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${INK}"/>`;

const pts = (list) => list.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');

/** A dimension line with end ticks; the label sits beside it. */
function dimension(x1, y1, x2, y2, label, side = 1) {
  const horizontal = Math.abs(y2 - y1) < 0.01;
  const t = 4;
  const ticks = horizontal
    ? line(x1, y1 - t, x1, y1 + t, { w: 1 }) + line(x2, y2 - t, x2, y2 + t, { w: 1 })
    : line(x1 - t, y1, x1 + t, y1, { w: 1 }) + line(x2 - t, y2, x2 + t, y2, { w: 1 });
  const text = horizontal
    ? num((x1 + x2) / 2, y1 + (side > 0 ? 18 : -8), label, { size: 14 })
    : num(x1 + side * 8, (y1 + y2) / 2 + 5, label, { size: 14, anchor: side > 0 ? 'start' : 'end' });
  return ticks + line(x1, y1, x2, y2, { w: 1 }) + text;
}

const arrowDefs = (id) =>
  `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${INK}"/></marker></defs>`;

// ── Problem 2: the array of 1s, 2s and 3s ───────────────────────────────────
const ARRAY_ROWS = ['1111111', '1222221', '1233321', '1222221', '1111111'];
const Q2 = (() => {
  const c = 30;
  let body = '';
  ARRAY_ROWS.forEach((row, r) => [...row].forEach((d, k) => {
    body += num(30 + k * c, 34 + r * c, d, { size: 19 });
  }));
  return svg(240, 180, body);
})();

// ── Problem 6: the field and the strip Peter can reach ──────────────────────
// True to scale, 24 px to a meter.
const Q6 = (() => {
  const u = 24;
  const x = 56;
  const y = 16;
  return svg(360, 262,
    `<rect x="${x}" y="${y}" width="${10 * u}" height="${8 * u}" fill="${GRAY}" stroke="${INK}" stroke-width="1.5"/>
     <rect x="${x + u}" y="${y + u}" width="${8 * u}" height="${6 * u}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
    + dimension(x - 16, y, x - 16, y + 8 * u, '8 m', -1)
    + dimension(x, y + 8 * u + 16, x + 10 * u, y + 8 * u + 16, '10 m')
    + dimension(x + 10 * u + 14, y + 7 * u, x + 10 * u + 14, y + 8 * u, '1 m'));
})();

// ── Problem 11: five squares and the curve of quarter circles ───────────────
// True to scale, 36 px to a unit. Squares: 5 on the left; 3 at the top right;
// under it 1, 1 (stacked) and 2.
const Q11 = (() => {
  const u = 36;
  const x0 = 44;
  const y0 = 30;
  const X = (v) => x0 + v * u;
  const Y = (v) => y0 + v * u;
  const sq = (x, y, s) => `<rect x="${X(x)}" y="${Y(y)}" width="${s * u}" height="${s * u}" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  const arc = (r, x, y) => `A ${r * u} ${r * u} 0 0 0 ${X(x)} ${Y(y)}`;
  const curve = `<path d="M ${X(6)} ${Y(3)} ${arc(1, 5, 4)} ${arc(1, 6, 5)} ${arc(2, 8, 3)} ${arc(3, 5, 0)} ${arc(5, 0, 5)}" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
  return svg(400, 250,
    sq(0, 0, 5) + sq(5, 0, 3) + sq(5, 3, 1) + sq(5, 4, 1) + sq(6, 3, 2) + curve
    + dimension(X(0) - 16, Y(0), X(0) - 16, Y(5), '5', -1)
    + dimension(X(5), Y(0) - 14, X(8), Y(0) - 14, '3', -1)
    + dimension(X(8) + 14, Y(3), X(8) + 14, Y(5), '2')
    + dimension(X(5), Y(5) + 12, X(6), Y(5) + 12, '1')
    + num(X(5) + 9, Y(3) + 23, '1', { size: 13, anchor: 'start' }));
})();

// ── Problem 12: six circles in a triangle, a sum between each pair ──────────
const Q12 = (() => {
  const P = { T: [160, 34], LM: [102, 112], BL: [44, 190], BM: [160, 190], BR: [276, 190], RM: [218, 112] };
  const ring = [['T', 'LM', 9], ['LM', 'BL', 10], ['BL', 'BM', 8], ['BM', 'BR', 5], ['BR', 'RM', 4], ['RM', 'T', 6]];
  let body = '';
  for (const [a, b] of ring) body += line(P[a][0], P[a][1], P[b][0], P[b][1], { w: 1.2 });
  for (const [a, b, s] of ring) {
    const mx = (P[a][0] + P[b][0]) / 2;
    const my = (P[a][1] + P[b][1]) / 2;
    body += `<rect x="${mx - 13}" y="${my - 12}" width="26" height="24" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/>` + num(mx, my + 5, s, { size: 15 });
  }
  for (const [x, y] of Object.values(P)) body += `<circle cx="${x}" cy="${y}" r="20" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`;
  body += num(160, 40, '?', { size: 18 });
  return svg(320, 224, body);
})();

// ── Problem 13: the shifted tiling and the shaded square ────────────────────
// True to scale, 34 px to a unit. Row r lies between y = r and y = r + 1 and
// is shifted half a unit when r is odd. The square has vertices (3,0), (4,3),
// (1,4), (0,1): its side runs 3 across and 1 down.
const Q13 = (() => {
  const u = 34;
  const x0 = 40;
  const y0 = 30;
  const X = (v) => x0 + v * u;
  const Y = (v) => y0 + v * u;
  const left = -0.75;
  const right = 4.75;
  const top = -0.5;
  const bottom = 4.5;
  let grid = '';
  for (let r = -1; r <= 4; r++) {
    grid += line(X(left), Y(r), X(right), Y(r), { w: 1, stroke: RULE });
    const shift = Math.abs(r % 2) === 1 ? 0.5 : 0;
    for (let k = -2; k <= 6; k++) {
      const x = k + shift;
      if (x <= left || x >= right) continue;
      grid += line(X(x), Y(Math.max(r, top)), X(x), Y(Math.min(r + 1, bottom)), { w: 1, stroke: RULE });
    }
  }
  const V = [[3, 0], [4, 3], [1, 4], [0, 1]].map(([x, y]) => [X(x), Y(y)]);
  return svg(n(X(right) + 40), n(Y(bottom) + 30),
    `<polygon points="${pts(V)}" fill="${LIGHT}"/>` + grid
    + `<polygon points="${pts(V)}" fill="none" stroke="${INK}" stroke-width="2"/>`
    + V.map(([x, y]) => dot(x, y)).join(''));
})();

// ── Problem 15: two cubes, glued ────────────────────────────────────────────
// Each cube is gray on two faces that share an edge. Left cube: gray on top
// (its other gray face is hidden). Right cube: gray in front and on the right.
const Q15 = (() => {
  const s = 46;
  const d = 16;
  const cube = (x, y, front, topFill, side) =>
    `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${front}" stroke="${INK}" stroke-width="1.5"/>
     <polygon points="${pts([[x, y], [x + d, y - d], [x + s + d, y - d], [x + s, y]])}" fill="${topFill}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
     <polygon points="${pts([[x + s, y], [x + s + d, y - d], [x + s + d, y + s - d], [x + s, y + s]])}" fill="${side}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
  const G = '#9ca3af';
  const W = '#ffffff';
  return svg(400, 100,
    arrowDefs('pt03-arrow')
    + cube(20, 34, W, G, W) + cube(100, 34, G, W, G)
    + `<line x1="186" y1="52" x2="220" y2="52" stroke="${INK}" stroke-width="1.5" marker-end="url(#pt03-arrow)"/>`
    + cube(250 + s, 34, G, W, G) + cube(250, 34, W, G, W));
})();

// ── Problem 19: the entrance, the tree, and the two paths ───────────────────
const Q19 = (() => svg(440, 130,
  arrowDefs('pt03-walk')
  + `<path d="M 30 96 L 30 62 A 24 24 0 0 1 78 62 L 78 96" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
  + num(54, 28, 'PARK', { size: 13, weight: 'bold' })
  + `<circle cx="392" cy="40" r="26" fill="${GRAY}"/><circle cx="366" cy="50" r="18" fill="${GRAY}"/><circle cx="416" cy="52" r="16" fill="${GRAY}"/>`
  + `<rect x="385" y="60" width="14" height="36" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
  + `<line x1="92" y1="70" x2="170" y2="70" stroke="${INK}" stroke-width="1.8" marker-end="url(#pt03-walk)"/>`
  + num(132, 60, 'Miguel walks', { size: 13 })
  + `<path d="M 92 90 L 370 90 L 370 76 L 184 76" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#pt03-walk)"/>`
  + num(232, 110, 'Luna runs to the ball, then back', { size: 13 })))();

// ── Problem 21: the web, a five-pointed star ────────────────────────────────
const Q21 = (() => {
  const cx = 130;
  const cy = 128;
  const R = 110;
  const r = R * 0.382;
  const outer = [0, 1, 2, 3, 4].map((k) => { const a = (-90 + 72 * k) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  const inner = [0, 1, 2, 3, 4].map((k) => { const a = (-54 + 72 * k) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const star = [0, 2, 4, 1, 3].map((k) => outer[k]);
  return svg(260, 240,
    `<polygon points="${pts(star)}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`
    + outer.map(([x, y]) => dot(x, y, 5)).join('') + inner.map(([x, y]) => dot(x, y, 5)).join(''));
})();

// ── Problem 23: five coins and the band ─────────────────────────────────────
// True to scale, 15 px to a centimeter: radius 2 cm, three coins below and two
// above. The band is the outline of the centers' trapezoid, pushed out 2 cm.
const Q23 = (() => {
  const r = 30;
  const h = 2 * r * Math.sqrt(3) / 2;
  const by = 50 + h;
  const C = [[60, by], [120, by], [180, by], [90, 50], [150, 50]];
  const hull = [C[0], C[3], C[4], C[2]];
  return svg(240, n(by + 50),
    `<polygon points="${pts(hull)}" fill="${INK}" stroke="${INK}" stroke-width="${2 * r + 7}" stroke-linejoin="round"/>
     <polygon points="${pts(hull)}" fill="#ffffff" stroke="#ffffff" stroke-width="${2 * r}" stroke-linejoin="round"/>`
    + C.map(([x, y]) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r - 1}" fill="${LIGHT}" stroke="${INK}" stroke-width="1.5"/>`).join(''));
})();

// ── Problem 25: the example hexagon in triangle ABC ─────────────────────────
// True to scale, 38 px to a unit; the triangle has side 6. Corners cut off:
// 1 at A, 2 at B, 2 at C, leaving sides 2, 3, 1, 3, 2, 2.
const Q25 = (() => {
  const u = 38;
  const H = Math.sqrt(3) / 2;
  const A = [36, 30 + 6 * u * H];
  const along = (p, dir, t) => [p[0] + dir[0] * t * u, p[1] + dir[1] * t * u];
  const AB = [1, 0];
  const AC = [0.5, -H];
  const CB = [0.5, H];
  const B = along(A, AB, 6);
  const C = along(A, AC, 6);
  const V = [along(A, AC, 4), along(C, CB, 2), along(C, CB, 4), along(A, AB, 4), along(A, AB, 1), along(A, AC, 1)];
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const lab = (p, q, s, dx, dy) => { const [x, y] = mid(p, q); return num(x + dx, y + dy, s, { size: 15 }); };
  return svg(n(B[0] + 40), n(A[1] + 34),
    `<polygon points="${pts([A, B, C])}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
     <polygon points="${pts(V)}" fill="${GRAY}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`
    + V.map(([x, y]) => dot(x, y, 3)).join('')
    + lab(V[0], V[1], '2', 0, 18) + lab(V[1], V[2], '2', 14, 2) + lab(V[2], V[3], '2', -14, 2)
    + lab(V[3], V[4], '3', 0, 18) + lab(V[4], V[5], '1', 12, 8) + lab(V[5], V[0], '3', -14, 2)
    + num(A[0] - 14, A[1] + 8, 'A', { size: 17, style: 'italic' })
    + num(B[0] + 14, B[1] + 8, 'B', { size: 17, style: 'italic' })
    + num(C[0], C[1] - 10, 'C', { size: 17, style: 'italic' }));
})();

export const FIGURES = { Q2, Q6, Q11, Q12, Q13, Q15, Q19, Q21, Q23, Q25 };
