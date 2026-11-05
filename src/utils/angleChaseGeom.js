// src/utils/angleChaseGeom.js
//
// The geometry of Find Every Angle (Year 7 Maths 5.1 and 5.2): a Workbook-
// style diagram built from straight lines, so every angle in it is exact.
// Every line runs along a WHOLE number of degrees, which makes every angle
// between two lines a whole number too — the picture is drawn to scale and
// the numbers printed on it are worked out, never typed in.
//
//   fig: {
//     box: [12, 9],                        the frame, in figure units (y up, origin in the middle)
//     lines: [
//       { id: 'm', dir: 0, at: [0, 2], par: 1 },   a full line across the frame; par: one arrow
//       { id: 't', dir: 64, at: [1, 0] },          another full line
//       { id: 's', dir: 115, at: [3, 1], over: [0, 1.5] },  drawn from its first crossing (0 past
//                                                   it) to 1.5 past its last: a side that stops
//       { id: 'r', dir: 40, at: [0, 0], ray: 4 },  a ray from `at`, 4 long
//       { id: 'b', dir: 64, at: [-1, -2], over: [0.8, 0], upto: ['n', 'c'] },
//                                                   over, but only its crossings with n and c
//                                                   count: it stops where it meets c
//     ],
//     marks: [ { at: 'm t', toward: 30, show: 64 | 'a' | 'R' } ],   used by utils/angleChase.js
//   }
//
// Directions are degrees anticlockwise from east. A vertex is where two drawn
// lines meet (rays from one point meet there too); its angles ("sectors") run
// anticlockwise between neighbouring rays. Output is in viewBox pixels except
// where it says units.

export const VIEW_W = 600;
export const rad = (d) => (d * Math.PI) / 180;
export const norm = (d) => ((d % 360) + 360) % 360;
const r1 = (v) => Math.round(v * 10) / 10;

/** The box a label takes at 24 px bold: about 14 px a character, 26 px tall. */
export const labelBox = (text) => ({ w: String(text).length * 14 + 6, h: 26 });
// Every label is placed as if it were four characters ("133°"), so a letter
// and the number that replaces it sit in the same spot.
const SLOT = labelBox('000°');

function lineParams(L, P) {
  // the parameter s of point P along L (P assumed on L)
  const u = [Math.cos(rad(L.dir)), Math.sin(rad(L.dir))];
  return (P[0] - L.at[0]) * u[0] + (P[1] - L.at[1]) * u[1];
}
function meetOf(A, B) {
  const ux = Math.cos(rad(A.dir)), uy = Math.sin(rad(A.dir));
  const vx = Math.cos(rad(B.dir)), vy = Math.sin(rad(B.dir));
  const det = ux * vy - uy * vx;
  if (Math.abs(det) < 1e-9) return null;
  const s = ((B.at[0] - A.at[0]) * vy - (B.at[1] - A.at[1]) * vx) / det;
  return [A.at[0] + s * ux, A.at[1] + s * uy];
}
/** The s-range of L inside the frame (less a margin). */
function frameRange(L, fw, fh, m = 0.25) {
  const ux = Math.cos(rad(L.dir)), uy = Math.sin(rad(L.dir));
  let lo = -1e9, hi = 1e9;
  for (const [p, d, a, b] of [[L.at[0], ux, -fw / 2 + m, fw / 2 - m], [L.at[1], uy, -fh / 2 + m, fh / 2 - m]]) {
    if (Math.abs(d) < 1e-12) { if (p < a || p > b) return null; continue; }
    let t1 = (a - p) / d, t2 = (b - p) / d;
    if (t1 > t2) [t1, t2] = [t2, t1];
    lo = Math.max(lo, t1); hi = Math.min(hi, t2);
  }
  return lo < hi ? [lo, hi] : null;
}
const inside = (s, [a, b]) => s >= a - 1e-6 && s <= b + 1e-6;

/** Everything a diagram needs, worked out from its lines. Throws on a figure that cannot be drawn. */
export function buildFigure(fig) {
  const [FW, FH] = fig?.box || [12, 9];
  const S = VIEW_W / FW;
  const W = VIEW_W;
  const H = Math.round(FH * S);
  const specs = fig?.lines || [];
  if (specs.length < 2) throw new Error('a figure needs two lines or more');
  const ids = new Set();
  const lines = specs.map((l) => {
    if (!l.id || ids.has(l.id)) throw new Error(`line id "${l.id}" is missing or used twice`);
    ids.add(l.id);
    if (!Number.isInteger(l.dir)) throw new Error(`line ${l.id}: dir must be a whole number of degrees`);
    if (!Array.isArray(l.at) || l.at.length !== 2) throw new Error(`line ${l.id}: at must be [x, y]`);
    const frame = frameRange(l, FW, FH);
    if (!frame) throw new Error(`line ${l.id} misses the frame`);
    return { ...l, frame };
  });

  // Pass 1: where each pair of (infinite) lines meets inside the frame.
  const crossings = [];
  for (let i = 0; i < lines.length; i += 1) {
    for (let j = i + 1; j < lines.length; j += 1) {
      const P = meetOf(lines[i], lines[j]);
      if (!P) continue;
      const si = lineParams(lines[i], P), sj = lineParams(lines[j], P);
      if (inside(si, lines[i].frame) && inside(sj, lines[j].frame)) crossings.push({ i, j, P, si, sj });
    }
  }
  // Each line's drawn span: a ray, a side that stops near its crossings, or the whole frame.
  for (const [n, L] of lines.entries()) {
    if (L.span) { L.drawn = L.span.slice(); continue; }
    if (L.ray != null) { L.drawn = [0, Number(L.ray)]; continue; }
    if (L.over) {
      const upto = L.upto ? new Set(L.upto) : null;
      const ss = crossings.filter((c) => (c.i === n || c.j === n) && (!upto || upto.has(lines[c.i === n ? c.j : c.i].id)))
        .map((c) => (c.i === n ? c.si : c.sj));
      if (!ss.length) throw new Error(`line ${L.id}: over needs a crossing`);
      L.drawn = [Math.min(...ss) - L.over[0], Math.max(...ss) + L.over[1]];
      continue;
    }
    L.drawn = L.frame.slice();
  }
  for (const L of lines) {
    L.drawn = [Math.max(L.drawn[0], L.frame[0]), Math.min(L.drawn[1], L.frame[1])];
    if (L.drawn[1] - L.drawn[0] < 0.5) throw new Error(`line ${L.id} is too short to draw`);
  }

  // Pass 2: vertices, where two DRAWN lines meet (points shared by several lines merge).
  const verts = [];
  const vertexAt = (P) => {
    let v = verts.find((x) => Math.hypot(x.P[0] - P[0], x.P[1] - P[1]) < 1e-6);
    if (!v) { v = { id: `v${verts.length}`, P, lines: [] }; verts.push(v); }
    return v;
  };
  for (const c of crossings) {
    const A = lines[c.i], B = lines[c.j];
    if (!inside(c.si, A.drawn) || !inside(c.sj, B.drawn)) continue;
    const v = vertexAt(c.P);
    for (const L of [A, B]) if (!v.lines.includes(L.id)) v.lines.push(L.id);
  }
  const lineById = Object.fromEntries(lines.map((L) => [L.id, L]));
  const sectors = {};
  for (const v of verts) {
    const rays = [];
    for (const id of v.lines) {
      const L = lineById[id];
      const s = lineParams(L, v.P);
      if (L.drawn[1] > s + 1e-4) rays.push({ line: id, dir: norm(L.dir), sign: 1 });
      if (L.drawn[0] < s - 1e-4) rays.push({ line: id, dir: norm(L.dir + 180), sign: -1 });
    }
    rays.sort((a, b) => a.dir - b.dir);
    v.rays = rays;
    v.sectors = [];
    if (rays.length < 2) continue;
    rays.forEach((r, k) => {
      const nx = rays[(k + 1) % rays.length];
      const size = norm(nx.dir - r.dir) || 360;
      const key = `${v.id}.${k}`;
      const sec = { key, vertex: v.id, start: r.dir, size, rays: [r, nx], index: k };
      sectors[key] = sec;
      v.sectors.push(key);
    });
  }

  const X = (x) => W / 2 + x * S;
  const Y = (y) => H / 2 - y * S;
  const px = (P) => [r1(X(P[0])), r1(Y(P[1]))];
  for (const v of verts) v.px = px(v.P);
  for (const L of lines) {
    const u = [Math.cos(rad(L.dir)), Math.sin(rad(L.dir))];
    L.ends = L.drawn.map((s) => px([L.at[0] + s * u[0], L.at[1] + s * u[1]]));
  }
  return { W, H, S, box: [FW, FH], lines, lineById, verts, vertById: Object.fromEntries(verts.map((v) => [v.id, v])), sectors, px };
}

/** The vertex named by two (or more) line ids, "m t". */
export function vertexOf(F, at) {
  const want = String(at).trim().split(/\s+/);
  const hits = F.verts.filter((v) => want.every((id) => v.lines.includes(id)));
  return hits.length === 1 ? hits[0] : null;
}
/** The sector at vertex v that contains the direction `toward`. */
export function sectorToward(F, v, toward) {
  return v.sectors.map((k) => F.sectors[k]).find((s) => norm(toward - s.start) < s.size) || null;
}

/* ------------------------------------------------------------------ drawing helpers (pixels) */

const atPx = (P, r, d) => [r1(P[0] + r * Math.cos(rad(d))), r1(P[1] - r * Math.sin(rad(d)))];
const halfAcross = (d, box = SLOT) => Math.abs(Math.sin(rad(d))) * (box.w / 2) + Math.abs(Math.cos(rad(d))) * (box.h / 2);

/**
 * The arc, label place and (for 90°) small square of one sector, in pixels.
 * The label is placed for the widest text it will ever show there — its
 * size, "47°" — so a letter and the number that replaces it sit in one spot.
 */
export function wedgeOf(F, key, opts = {}) {
  const s = F.sectors[key];
  const box = labelBox(opts.fit ?? `${s.size}°`);
  const v = F.vertById[s.vertex];
  const P = v.px;
  const mid = s.start + s.size / 2;
  const arc = opts.arc ?? (s.size < 35 ? 40 : s.size > 180 ? 22 : 30);
  const big = s.size > 180;
  const [sx, sy] = atPx(P, arc, s.start);
  const [ex, ey] = atPx(P, arc, s.start + s.size);
  const path = `M ${P[0]} ${P[1]} L ${sx} ${sy} A ${arc} ${arc} 0 ${big ? 1 : 0} 0 ${ex} ${ey} Z`;
  const need = big ? 46 : (Math.max(halfAcross(s.start, box), halfAcross(s.start + s.size, box)) + 5) / Math.sin(rad(Math.min(s.size, 178) / 2));
  const d = Math.max(arc + 16, Math.min(need, 150));
  const label = atPx(P, d, mid);
  let square = null;
  if (Math.round(s.size) === 90) {
    const a = atPx(P, 17, s.start);
    const c = atPx(P, 17 * Math.SQRT2, s.start + 45);
    const b = atPx(P, 17, s.start + 90);
    square = `M ${a[0]} ${a[1]} L ${c[0]} ${c[1]} L ${b[0]} ${b[1]}`;
  }
  // A tap target: the wedge out to the label, a little wider.
  const R = Math.max(d + 22, 60);
  const [hx, hy] = atPx(P, R, s.start);
  const [kx, ky] = atPx(P, R, s.start + s.size);
  const hit = `M ${P[0]} ${P[1]} L ${hx} ${hy} A ${R} ${R} 0 ${big ? 1 : 0} 0 ${kx} ${ky} Z`;
  // The badge of the letter being found (radius 19) sits clear of the arc.
  const badge = atPx(P, Math.max(d, arc + 25), mid);
  return { key, path, label, labelDist: d, badge, box: square, labelBox: box, hit, mid, size: s.size, vertex: v.id };
}

/** One arrow mark (or two, for par: 2) on each parallel line, away from its vertices. */
export function arrowsOf(F) {
  const out = [];
  for (const L of F.lines) {
    if (!L.par) continue;
    const u = [Math.cos(rad(L.dir)), Math.sin(rad(L.dir))];
    const vs = F.verts.filter((v) => v.lines.includes(L.id)).map((v) => lineParams(L, v.P));
    let best = null;
    const [a, b] = L.drawn;
    for (let k = 1; k < 40; k += 1) {
      const s = a + ((b - a) * k) / 40;
      const clear = Math.min(s - a, b - s, ...vs.map((x) => Math.abs(x - s)));
      if (!best || clear > best.clear + 1e-9) best = { s, clear };
    }
    const tip = F.px([L.at[0] + best.s * u[0], L.at[1] + best.s * u[1]]);
    for (let n = 0; n < L.par; n += 1) out.push({ line: L.id, tip: atPx(tip, n * 12 - (L.par - 1) * 6, L.dir), dir: L.dir });
  }
  return out;
}
/** A chevron path pointing along d, its tip at `tip`. */
export function chevron(tip, d, size = 11) {
  const a = atPx(tip, size, d + 180 - 35);
  const b = atPx(tip, size, d + 180 + 35);
  return `M ${a[0]} ${a[1]} L ${tip[0]} ${tip[1]} L ${b[0]} ${b[1]}`;
}
export { atPx };
