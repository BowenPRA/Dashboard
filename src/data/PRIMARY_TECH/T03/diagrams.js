// src/data/PRIMARY_TECH/T03/diagrams.js
// T3 Typing Properly — every authored picture in the unit, in one place and
// referenced by key (docs/svg-diagrams.md §1). The Find It pictures live here
// too, so `npm run audit:svg PRIMARY_TECH` sees them.
//
// ONE KEYBOARD. Most pictures in this unit are the same keyboard — plain, with
// its labels, coloured by finger, with two hands resting on it — so it is laid
// out once, from a table of rows (ROWS, in key units, the way a real keyboard
// is specified), into KEY_LIST / KEYCAPS: every key's rectangle in the
// 900 × 330 frame the pictures share. The deck's hotspots, the Find It regions
// and the Label It pins are all read off KEYCAPS (notes.js, pointIt.js), so a
// target can never drift off the key it names. The laptop in Find It has its
// own table (LAPTOP_ROWS), laid out the same way.
//
// The finger colours are the Typing Gym's own (src/tasks/TypeGym.jsx
// FINGER_BG — the same fills), and ZONE extends the Gym's FINGER map
// (src/utils/typeGym.js) to the big keys at the edges the Gym does not draw:
// Tab, Caps Lock and the left Shift for the left little finger; Backspace,
// Enter and the right Shift for the right little finger. A child moving from
// the deck to the Gym sees the same colour on the same key.
//
// Generic, not a copy of one maker's keyboard (docs/digital-skills-course.md
// §5.2): a plain US layout — the one Vietnamese keyboards use — with the real
// key names.
//
// Three kinds of text, and the class that says which (UPGRADE-PLAN §3.3):
//   · what is PRINTED ON THE KEYBOARD — the letters, the digits, "Enter" —
//     carries class="keep", so a hotspot or Label It that strips labels still
//     shows the keyboard the way it really looks;
//   · labels that NAME a part ("Home row", "Left index finger") are plain
//     <text>, stripped by a hotspot / Label It so the picture never answers its
//     own question;
//   · leader lines and their dots carry class="lbl" (the `lead` helper).
//
// House rules for this file: every <text> is written out literally (the SVG
// audit cannot measure a label a helper emits) — the key legends are the
// shared literal blocks KEY_LEGENDS, KEY_WORDS, KEY_MODS and LAPTOP_LEGENDS,
// written out from the same KEY_LIST the shapes use, and spliced into every
// picture that shows the keys; helpers draw SHAPES only; no SVG template holds
// a nested backtick template. If ROWS changes, the legend blocks must be
// written out again from KEY_LIST.
import { FINGER } from '../../../utils/typeGym.js';

const INK = '#1e293b';
const SLATE = '#475569';
const MUTED = '#64748b';
const CASE = '#94a3b8';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const WALL = '#eef4fb';
const BLUE = '#3b82f6';
const RED = '#ef4444';
const GREEN = '#10b981';
const AMBER = '#f59e0b';
const CYAN = '#06b6d4';
const CYAN_PALE = '#cffafe';
const BODY = '#0ea5e9';
const BODY_DARK = '#0369a1';
const SKIN = '#fde2c8';
const SKIN_EDGE = '#c2410c';

/* ------------------------------------------------------------------ *
 * The keyboard, laid out.
 * ------------------------------------------------------------------ */

/** One key unit and the gap between keys, in the shared frame. */
const U = 56;
const GAP = 6;
const KEY_H = 50;

/**
 * A plain US keyboard, one row per line: [id, width in key units, legend,
 * shifted legend]. Every row is 15 units wide. Letters' legends default to the
 * letter; the big keys' names are the KEY_WORDS block.
 */
const ROWS = [
  [['`', 1, '`', '~'], ['1', 1, '1', '!'], ['2', 1, '2', '@'], ['3', 1, '3', '#'], ['4', 1, '4', '$'], ['5', 1, '5', '%'], ['6', 1, '6', '^'], ['7', 1, '7', '&'], ['8', 1, '8', '*'], ['9', 1, '9', '('], ['0', 1, '0', ')'], ['-', 1, '-', '_'], ['=', 1, '=', '+'], ['backspace', 2]],
  [['tab', 1.5], ['q', 1], ['w', 1], ['e', 1], ['r', 1], ['t', 1], ['y', 1], ['u', 1], ['i', 1], ['o', 1], ['p', 1], ['[', 1, '[', '{'], [']', 1, ']', '}'], ['\\', 1.5, '\\', '|']],
  [['caps', 1.75], ['a', 1], ['s', 1], ['d', 1], ['f', 1], ['g', 1], ['h', 1], ['j', 1], ['k', 1], ['l', 1], [';', 1, ';', ':'], ["'", 1, "'", '"'], ['enter', 2.25]],
  [['lshift', 2.25], ['z', 1], ['x', 1], ['c', 1], ['v', 1], ['b', 1], ['n', 1], ['m', 1], [',', 1, ',', '<'], ['.', 1, '.', '>'], ['/', 1, '/', '?'], ['rshift', 2.75]],
  [['lctrl', 2], ['lalt', 1.5], ['space', 8], ['ralt', 1.5], ['rctrl', 2]],
];

/**
 * A laptop's keyboard: the same four rows of keys, a short row of function
 * keys above them (Esc … Delete), and a bottom row with Fn and the arrows.
 * Row heights differ, so each row says its own height.
 */
const LAPTOP_ROWS = [
  { h: 30, keys: [['esc', 1], ['f1', 1], ['f2', 1], ['f3', 1], ['f4', 1], ['f5', 1], ['f6', 1], ['f7', 1], ['f8', 1], ['f9', 1], ['f10', 1], ['f11', 1], ['f12', 1], ['del', 2]] },
  ...ROWS.slice(0, 4).map((keys) => ({ h: KEY_H, keys })),
  { h: KEY_H, keys: [['lctrl', 1.25], ['fn', 1], ['lalt', 1.25], ['space', 6.25], ['ralt', 1.25], ['rctrl', 1], ['left', 1], ['updown', 1], ['right', 1]] },
];

/** Rows of [id, units, legend, shifted] → keys with their rectangles, in reading order. */
function layout(rows, x0, y0) {
  const out = [];
  let y = y0;
  rows.forEach((spec, r) => {
    const { h, keys } = Array.isArray(spec) ? { h: KEY_H, keys: spec } : spec;
    let at = 0;
    for (const [id, units, main, top] of keys) {
      const x = x0 + at * U;
      const w = units * U - GAP;
      out.push({ id, row: r, x, y, w, h, cx: x + w / 2, cy: y + h / 2, main: main ?? (id.length === 1 ? id : undefined), top });
      at += units;
    }
    y += h + GAP;
  });
  return out;
}

/** The desktop keyboard in the shared 900 × 330 frame: keys from (30, 30) to (864, 304). */
export const KEY_LIST = layout(ROWS, 30, 30);
export const KEYCAPS = Object.fromEntries(KEY_LIST.map((k) => [k.id, k]));

/** The laptop's keys, in the LAPTOP picture's own 960 × 620 frame. */
export const LAPTOP_LIST = layout(LAPTOP_ROWS, 63, 44);
export const LAPTOP_KEYCAPS = Object.fromEntries(LAPTOP_LIST.map((k) => [k.id, k]));

/**
 * Which finger presses each key: the Typing Gym's FINGER map (L4…L1 little to
 * index, R1…R4 index to little, T thumbs), plus the big keys at the edges.
 */
export const ZONE = {
  ...FINGER,
  '`': 'L4', tab: 'L4', caps: 'L4', lshift: 'L4',
  '=': 'R4', '[': 'R4', ']': 'R4', '\\': 'R4', backspace: 'R4', enter: 'R4', rshift: 'R4',
  space: 'T',
};

/** TypeGym.jsx FINGER_BG, exactly — and a stronger edge in the same colour, so a zone reads on white. */
const ZONE_FILL = { L4: '#ffe4e6', L3: '#fef3c7', L2: '#dcfce7', L1: '#dbeafe', R1: '#ede9fe', R2: '#dcfce7', R3: '#fef3c7', R4: '#ffe4e6', T: '#f1f5f9' };
const ZONE_EDGE = { L4: '#fb7185', L3: '#f59e0b', L2: '#22c55e', L1: '#3b82f6', R1: '#8b5cf6', R2: '#22c55e', R3: '#f59e0b', R4: '#fb7185', T: '#94a3b8' };
/** The fingers themselves, one shade deeper than their keys. */
const FINGER_INK = { L4: '#fda4af', L3: '#fcd34d', L2: '#86efac', L1: '#93c5fd', R1: '#c4b5fd', R2: '#86efac', R3: '#fcd34d', R4: '#fda4af', T: '#cbd5e1' };

const HOME = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);

/* ------------------------------------------------------------------ *
 * Shape helpers — shapes only, never text.
 * ------------------------------------------------------------------ */

/** Every key of a layout as a rounded rectangle; `style(key)` → [fill, stroke, strokeWidth]. */
const keycaps = (list, style) => list
  .map((k) => {
    const [fill, stroke, sw] = style(k);
    return `<rect x="${k.x}" y="${k.y}" width="${k.w}" height="${k.h}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  })
  .join('\n  ');

/** White keys, the eight home keys tinted: the plain keyboard. */
const plainKey = (k) => (HOME.has(k.id) ? [CYAN_PALE, CYAN, 2.5] : ['#ffffff', CASE, 1.5]);
/** Every key in its finger's colour; keys no finger owns (Ctrl, Alt) stay white. */
const zoneKey = (k) => (ZONE[k.id] ? [ZONE_FILL[ZONE[k.id]], ZONE_EDGE[ZONE[k.id]], 2] : ['#ffffff', CASE, 1.5]);

/** The raised bars on F and J, near the bottom edge of the key, where a resting fingertip meets them. */
const bumps = (caps, color = SLATE) => ['f', 'j']
  .map((id) => `<rect x="${caps[id].cx - 10}" y="${caps[id].y + caps[id].h - 12}" width="20" height="5" rx="2.5" fill="${color}"/>`)
  .join('');

/** The keyboard's case, a little bigger than its keys. */
const kbCase = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>`;

/**
 * The symbols printed on the big keys, drawn in a 16 × 13 box — ← Backspace,
 * →| Tab, ⇪ Caps Lock, ⇧ Shift, ↵ Enter — as paths, not characters, so they
 * never depend on a font having the glyph.
 */
const SYMBOL_PATH = {
  backspace: 'M 16 6.5 H 1.5 M 6 2 L 1.5 6.5 L 6 11',
  tab: 'M 0.5 6.5 H 13 M 8.5 2 L 13 6.5 L 8.5 11 M 15.5 1.5 V 11.5',
  caps: 'M 8 0.5 L 15 6.5 H 11.5 V 9 H 4.5 V 6.5 H 1 Z M 4.5 12.5 H 11.5',
  lshift: 'M 8 0.5 L 15.5 7 H 11.5 V 12.5 H 4.5 V 7 H 0.5 Z',
  rshift: 'M 8 0.5 L 15.5 7 H 11.5 V 12.5 H 4.5 V 7 H 0.5 Z',
  enter: 'M 15.5 0.5 V 7.5 H 2 M 6 3.5 L 1.5 7.5 L 6 11.5',
};

/** A key's symbol, scaled by `s`, its box's top-left at (x, y). */
const symbolAt = (id, x, y, s, color = SLATE) => `<path d="${SYMBOL_PATH[id]}" transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${(1.7 / s) * (s > 1 ? 1.35 : 1)}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Small symbols in the top-left corner of the big keys (beside their names). */
const smallSymbols = (caps) => Object.keys(SYMBOL_PATH)
  .map((id) => symbolAt(id, caps[id].x + 10, caps[id].y + 9, 1))
  .join('');

/** Large symbols in the middle of the big keys, for the picture where their names come off. */
const bigSymbols = (caps) => Object.keys(SYMBOL_PATH)
  .map((id) => symbolAt(id, caps[id].cx - 17, caps[id].cy - 14, 2.1, INK))
  .join('');

/** A leader line from a label to the part it names, ending in a dot; a white halo lets it cross keys. Stripped with the labels. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
  <line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SLATE}" stroke-width="2.5" stroke-linecap="round"/>
  <circle class="lbl" cx="${x2}" cy="${y2}" r="6" fill="${SLATE}" stroke="#ffffff" stroke-width="2"/>`;

/** A finger (or thumb) seen from above: a rounded capsule from its tip to its knuckle, outlined. */
const finger = (x1, y1, x2, y2, w, fill) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SLATE}" stroke-width="${w + 5}" stroke-linecap="round"/>
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;

/**
 * Two hands resting on the home row, seen from above, in the shared keyboard
 * frame: each fingertip ends on the lower half of its home key (so the letter
 * stays readable above it), the thumbs rest on the space bar, and the palms
 * hang off the front of the keyboard. Each finger is its zone's colour.
 */
function hands(caps) {
  const tip = (id) => [caps[id].cx, caps[id].y + caps[id].h + 13];
  const L = { little: tip('a'), ring: tip('s'), middle: tip('d'), index: tip('f') };
  const R = { index: tip('j'), middle: tip('k'), ring: tip('l'), little: tip(';') };
  const palm = (pts) => `<path d="${pts}" fill="${SKIN}" stroke="${SLATE}" stroke-width="3" stroke-linejoin="round"/>`;
  return [
    // palms, behind the fingers
    palm('M 150 318 Q 150 300 170 300 L 330 316 Q 348 318 348 338 L 346 410 Q 340 452 300 458 L 206 458 Q 162 452 156 410 Z'),
    palm('M 660 318 Q 660 300 640 300 L 480 316 Q 462 318 462 338 L 464 410 Q 470 452 510 458 L 604 458 Q 648 452 654 410 Z'),
    // left hand: little, ring, middle, index, thumb
    finger(L.little[0], L.little[1], 172, 318, 34, FINGER_INK.L4),
    finger(L.ring[0], L.ring[1], 222, 330, 38, FINGER_INK.L3),
    finger(L.middle[0], L.middle[1], 270, 334, 40, FINGER_INK.L2),
    finger(L.index[0], L.index[1], 318, 330, 40, FINGER_INK.L1),
    finger(374, 284, 338, 392, 42, FINGER_INK.T),
    // right hand: index, middle, ring, little, thumb
    finger(R.index[0], R.index[1], 492, 330, 40, FINGER_INK.R1),
    finger(R.middle[0], R.middle[1], 540, 334, 40, FINGER_INK.R2),
    finger(R.ring[0], R.ring[1], 588, 330, 38, FINGER_INK.R3),
    finger(R.little[0], R.little[1], 638, 318, 34, FINGER_INK.R4),
    finger(436, 284, 472, 392, 42, FINGER_INK.T),
  ].join('\n  ');
}

/**
 * A seated person seen from the side, facing right, as thick round-capped
 * strokes — a pictogram, not a portrait. `p` gives the joints: hip, knee,
 * ankle, toe, neck (and `back`, a control point that curves the spine), head,
 * eye, shoulder, elbow, wrist, fingers, and optionally a second arm (`arm2`:
 * [elbow, wrist, fingers]) for a hand that is not on the keys, and `point` for
 * one pointing finger instead of a hand. The near arm is
 * a darker blue than the body, so it reads where it crosses the chest.
 */
function person(p) {
  const limb = (a, b, w, c = BODY) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  const skin = (a, b, w) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${SKIN_EDGE}" stroke-width="${w + 4}" stroke-linecap="round"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${SKIN}" stroke-width="${w}" stroke-linecap="round"/>`;
  const spine = p.back
    ? `<path d="M ${p.hip[0]} ${p.hip[1]} Q ${p.back[0]} ${p.back[1]} ${p.neck[0]} ${p.neck[1]}" fill="none" stroke="${BODY}" stroke-width="50" stroke-linecap="round"/>`
    : limb(p.hip, p.neck, 50);
  const [hx, hy] = p.head;
  const far = p.arm2
    ? [limb(p.shoulder, p.arm2[0], 22, BODY_DARK), skin(p.arm2[0], p.arm2[1], 16), skin(p.arm2[1], p.arm2[2], 12)]
    : [];
  return [
    ...far,
    limb(p.hip, p.knee, 40),
    limb(p.knee, p.ankle, 30),
    `<line x1="${p.ankle[0] - 6}" y1="${p.ankle[1] + 4}" x2="${p.toe[0]}" y2="${p.toe[1]}" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`,
    spine,
    `<circle cx="${hx}" cy="${hy}" r="31" fill="${SKIN}" stroke="${SKIN_EDGE}" stroke-width="3"/>`,
    // hair: a cap over the back and top of the head
    `<path d="M ${hx - 30} ${hy + 6} A 31 31 0 0 1 ${hx + 24} ${hy - 20} Q ${hx - 2} ${hy - 12} ${hx - 14} ${hy + 10} Z" fill="${INK}"/>`,
    `<circle cx="${p.eye[0]}" cy="${p.eye[1]}" r="3.5" fill="${INK}"/>`,
    limb(p.shoulder, p.elbow, 24, BODY_DARK),
    skin(p.elbow, p.wrist, 18),
    skin(p.wrist, p.fingers, p.point ? 7 : 13),
  ].join('\n  ');
}

/**
 * The side-on room every posture picture shares, in a 760 × 520 frame: the
 * wall and floor, a chair (backrest, seat, legs), a desk, a keyboard on it and
 * a monitor. `wall: false` leaves the wall off, for a picture that draws two
 * rooms side by side.
 */
function room({ wall = true, screenTop = 140 } = {}) {
  const deskY = 296;
  const sx = 520;
  return [
    wall ? `<rect x="4" y="4" width="752" height="512" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>` : '',
    wall ? `<rect x="4" y="478" width="752" height="38" fill="${FAINT}"/>` : '',
    `<path d="M ${wall ? 4 : 150} 478 H ${wall ? 756 : 730}" stroke="${CASE}" stroke-width="3"/>`,
    // chair: backrest, seat, two legs
    `<rect x="204" y="186" width="14" height="180" rx="6" fill="${SLATE}"/>`,
    `<rect x="204" y="352" width="150" height="14" rx="6" fill="${SLATE}"/>`,
    '<path d="M 220 366 V 476 M 338 366 V 476" stroke="#475569" stroke-width="8" stroke-linecap="round"/>',
    // desk
    `<rect x="330" y="${deskY}" width="390" height="12" rx="4" fill="#b45309"/>`,
    `<rect x="690" y="${deskY + 12}" width="12" height="${478 - deskY - 12}" fill="#92400e"/>`,
    // keyboard
    `<rect x="356" y="${deskY - 10}" width="94" height="10" rx="3" fill="${CASE}"/>`,
    `<path d="M 364 ${deskY - 10} h 14 M 384 ${deskY - 10} h 14 M 404 ${deskY - 10} h 14 M 424 ${deskY - 10} h 14" stroke="${FAINT}" stroke-width="3"/>`,
    // monitor: base, neck, the slab, and its screen (the slab's left face)
    `<rect x="${sx - 10}" y="${deskY - 6}" width="84" height="6" rx="3" fill="${SLATE}"/>`,
    `<rect x="${sx + 18}" y="${screenTop + 60}" width="12" height="${deskY - 6 - screenTop - 60}" fill="${SLATE}"/>`,
    `<rect x="${sx}" y="${screenTop}" width="18" height="108" rx="4" fill="${INK}"/>`,
    `<rect x="${sx - 3}" y="${screenTop + 4}" width="5" height="100" rx="2" fill="${BLUE}"/>`,
  ].filter(Boolean).join('\n  ');
}

/** Joints for sitting well: back against the chair, elbows by the sides, wrists straight, feet flat. */
const SIT_WELL = {
  hip: [250, 334], knee: [384, 334], ankle: [388, 458], toe: [438, 468],
  neck: [254, 200], head: [262, 156], eye: [283, 150],
  shoulder: [258, 212], elbow: [270, 282], wrist: [352, 280], fingers: [394, 285],
};

/** Joints for hunting and pecking: head down over the keys, one pointing finger, the other hand in the lap. */
const HUNTING = {
  hip: [262, 334], knee: [396, 334], ankle: [400, 458], toe: [450, 468],
  back: [262, 280], neck: [282, 210], head: [312, 198], eye: [333, 210],
  shoulder: [284, 226], elbow: [300, 286], wrist: [360, 282], fingers: [402, 286],
  arm2: [[292, 296], [338, 318], [364, 322]], point: true,
};

/** A pointing arrow along a line, head at (x2, y2). */
const arrow = (x1, y1, x2, y2, color, w = 4, dash = '') => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 5 + w * 2.2;
  const p1 = [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)].map((n) => Math.round(n * 10) / 10);
  const p2 = [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)].map((n) => Math.round(n * 10) / 10);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>
  <path d="M ${p1[0]} ${p1[1]} L ${x2} ${y2} L ${p2[0]} ${p2[1]}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** A tick (✓) or a cross (✗) in a disc, centred on (cx, cy). */
const mark = (cx, cy, ok) => (ok
  ? `<circle cx="${cx}" cy="${cy}" r="17" fill="${GREEN}"/><path d="M ${cx - 8} ${cy} L ${cx - 2} ${cy + 7} L ${cx + 9} ${cy - 7}" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<circle cx="${cx}" cy="${cy}" r="17" fill="${RED}"/><path d="M ${cx - 7} ${cy - 7} L ${cx + 7} ${cy + 7} M ${cx + 7} ${cy - 7} L ${cx - 7} ${cy + 7}" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`);

/** A red spell-check squiggle under a word, x1 to x2 at height y. */
const squiggle = (x1, x2, y) => {
  let d = `M ${x1} ${y}`;
  for (let x = x1, up = true; x < x2; x += 4, up = !up) d += ` L ${Math.min(x + 4, x2)} ${up ? y - 3 : y}`;
  return `<path d="${d}" fill="none" stroke="${RED}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** A big keycap for the close-up pictures: its rectangle and, on F and J, the bump. */
const bigKey = (x, y, w, h, fill, stroke, bump = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>${bump ? `<rect x="${x + w / 2 - 17}" y="${y + h - 17}" width="34" height="8" rx="4" fill="${SLATE}"/>` : ''}`;

/** A laptop's up and down arrow keys: two half-height keys stacked in one key's space. */
const upDownKeys = (k) => `<rect x="${k.x}" y="${k.y}" width="${k.w}" height="${(k.h - 6) / 2}" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.5"/>
  <rect x="${k.x}" y="${k.y + (k.h + 6) / 2}" width="${k.w}" height="${(k.h - 6) / 2}" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.5"/>`;

/** Little triangles on the arrow keys. */
const arrowKeyGlyphs = (caps) => {
  const tri = (cx, cy, dir) => {
    const s = 6;
    const d = { left: `M ${cx - s} ${cy} L ${cx + s} ${cy - s} L ${cx + s} ${cy + s} Z`, right: `M ${cx + s} ${cy} L ${cx - s} ${cy - s} L ${cx - s} ${cy + s} Z`, up: `M ${cx} ${cy - s} L ${cx + s} ${cy + s * 0.7} L ${cx - s} ${cy + s * 0.7} Z`, down: `M ${cx} ${cy + s} L ${cx + s} ${cy - s * 0.7} L ${cx - s} ${cy - s * 0.7} Z` }[dir];
    return `<path d="${d}" fill="${SLATE}"/>`;
  };
  const ud = caps.updown;
  return [
    tri(caps.left.cx, caps.left.cy, 'left'),
    tri(caps.right.cx, caps.right.cy, 'right'),
    tri(ud.cx, ud.y + (ud.h - 6) / 4, 'up'),
    tri(ud.cx, ud.y + ud.h - (ud.h - 6) / 4, 'down'),
  ].join('');
};

/* ------------------------------------------------------------------ *
 * The shared literal legends.
 * ------------------------------------------------------------------ */

/** Everything printed on the desktop keys: letters, digits, marks (and the mark above each). */
const KEY_LEGENDS = `
  <text class="keep" x="55" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">~</text><text class="keep" x="55" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">&#96;</text>
  <text class="keep" x="111" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">!</text><text class="keep" x="111" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  <text class="keep" x="167" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">@</text><text class="keep" x="167" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  <text class="keep" x="223" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">#</text><text class="keep" x="223" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
  <text class="keep" x="279" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">$</text><text class="keep" x="279" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
  <text class="keep" x="335" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">%</text><text class="keep" x="335" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
  <text class="keep" x="391" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">^</text><text class="keep" x="391" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
  <text class="keep" x="447" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&amp;</text><text class="keep" x="447" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
  <text class="keep" x="503" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">*</text><text class="keep" x="503" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
  <text class="keep" x="559" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">(</text><text class="keep" x="559" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
  <text class="keep" x="615" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">)</text><text class="keep" x="615" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text class="keep" x="671" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">_</text><text class="keep" x="671" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">-</text>
  <text class="keep" x="727" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text><text class="keep" x="727" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">=</text>
  <text class="keep" x="139" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
  <text class="keep" x="195" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
  <text class="keep" x="251" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">E</text>
  <text class="keep" x="307" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
  <text class="keep" x="363" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">T</text>
  <text class="keep" x="419" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Y</text>
  <text class="keep" x="475" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">U</text>
  <text class="keep" x="531" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
  <text class="keep" x="587" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
  <text class="keep" x="643" y="118" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
  <text class="keep" x="699" y="106" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">{</text><text class="keep" x="699" y="128" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">[</text>
  <text class="keep" x="755" y="106" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">}</text><text class="keep" x="755" y="128" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">]</text>
  <text class="keep" x="825" y="106" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">|</text><text class="keep" x="825" y="128" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">\\</text>
  <text class="keep" x="153" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
  <text class="keep" x="209" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text class="keep" x="265" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
  <text class="keep" x="321" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
  <text class="keep" x="377" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">G</text>
  <text class="keep" x="433" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
  <text class="keep" x="489" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">J</text>
  <text class="keep" x="545" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
  <text class="keep" x="601" y="174" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">L</text>
  <text class="keep" x="657" y="162" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">:</text><text class="keep" x="657" y="184" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">;</text>
  <text class="keep" x="713" y="162" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">"</text><text class="keep" x="713" y="184" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">'</text>
  <text class="keep" x="181" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text class="keep" x="237" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
  <text class="keep" x="293" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  <text class="keep" x="349" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
  <text class="keep" x="405" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
  <text class="keep" x="461" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
  <text class="keep" x="517" y="230" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
  <text class="keep" x="573" y="218" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&lt;</text><text class="keep" x="573" y="240" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">,</text>
  <text class="keep" x="629" y="218" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&gt;</text><text class="keep" x="629" y="240" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
  <text class="keep" x="685" y="218" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">?</text><text class="keep" x="685" y="240" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">/</text>
`;

/** The names printed on the big keys, beside their small symbols. */
const KEY_WORDS = `
  <text class="keep" x="768" y="71" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Backspace</text>
  <text class="keep" x="40" y="127" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Tab</text>
  <text class="keep" x="40" y="183" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Caps Lock</text>
  <text class="keep" x="754" y="183" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Enter</text>
  <text class="keep" x="40" y="239" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Shift</text>
  <text class="keep" x="726" y="239" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Shift</text>
  <text class="keep" x="40" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
  <text class="keep" x="152" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="684" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="768" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
`;

/** Ctrl and Alt alone — for the picture whose big keys show symbols only. */
const KEY_MODS = `
  <text class="keep" x="40" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
  <text class="keep" x="152" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="684" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="768" y="295" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
`;

/** Everything printed on the laptop's keys. */
const LAPTOP_LEGENDS = `
  <text class="keep" x="88" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">Esc</text>
  <text class="keep" x="144" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F1</text>
  <text class="keep" x="200" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F2</text>
  <text class="keep" x="256" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F3</text>
  <text class="keep" x="312" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F4</text>
  <text class="keep" x="368" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F5</text>
  <text class="keep" x="424" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F6</text>
  <text class="keep" x="480" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F7</text>
  <text class="keep" x="536" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F8</text>
  <text class="keep" x="592" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F9</text>
  <text class="keep" x="648" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F10</text>
  <text class="keep" x="704" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F11</text>
  <text class="keep" x="760" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">F12</text>
  <text class="keep" x="844" y="64" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}" text-anchor="middle">Delete</text>
  <text class="keep" x="88" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">~</text><text class="keep" x="88" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">&#96;</text>
  <text class="keep" x="144" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">!</text><text class="keep" x="144" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  <text class="keep" x="200" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">@</text><text class="keep" x="200" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  <text class="keep" x="256" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">#</text><text class="keep" x="256" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
  <text class="keep" x="312" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">$</text><text class="keep" x="312" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
  <text class="keep" x="368" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">%</text><text class="keep" x="368" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
  <text class="keep" x="424" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">^</text><text class="keep" x="424" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
  <text class="keep" x="480" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&amp;</text><text class="keep" x="480" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
  <text class="keep" x="536" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">*</text><text class="keep" x="536" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
  <text class="keep" x="592" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">(</text><text class="keep" x="592" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
  <text class="keep" x="648" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">)</text><text class="keep" x="648" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text class="keep" x="704" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">_</text><text class="keep" x="704" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">-</text>
  <text class="keep" x="760" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text><text class="keep" x="760" y="122" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">=</text>
  <text class="keep" x="172" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
  <text class="keep" x="228" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
  <text class="keep" x="284" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">E</text>
  <text class="keep" x="340" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
  <text class="keep" x="396" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">T</text>
  <text class="keep" x="452" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Y</text>
  <text class="keep" x="508" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">U</text>
  <text class="keep" x="564" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
  <text class="keep" x="620" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
  <text class="keep" x="676" y="168" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
  <text class="keep" x="732" y="156" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">{</text><text class="keep" x="732" y="178" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">[</text>
  <text class="keep" x="788" y="156" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">}</text><text class="keep" x="788" y="178" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">]</text>
  <text class="keep" x="858" y="156" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">|</text><text class="keep" x="858" y="178" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">\\</text>
  <text class="keep" x="186" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
  <text class="keep" x="242" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text class="keep" x="298" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
  <text class="keep" x="354" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
  <text class="keep" x="410" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">G</text>
  <text class="keep" x="466" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
  <text class="keep" x="522" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">J</text>
  <text class="keep" x="578" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
  <text class="keep" x="634" y="224" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">L</text>
  <text class="keep" x="690" y="212" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">:</text><text class="keep" x="690" y="234" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">;</text>
  <text class="keep" x="746" y="212" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">"</text><text class="keep" x="746" y="234" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">'</text>
  <text class="keep" x="214" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text class="keep" x="270" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
  <text class="keep" x="326" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  <text class="keep" x="382" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
  <text class="keep" x="438" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
  <text class="keep" x="494" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
  <text class="keep" x="550" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
  <text class="keep" x="606" y="268" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&lt;</text><text class="keep" x="606" y="290" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">,</text>
  <text class="keep" x="662" y="268" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">&gt;</text><text class="keep" x="662" y="290" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
  <text class="keep" x="718" y="268" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">?</text><text class="keep" x="718" y="290" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">/</text>
  <text class="keep" x="801" y="121" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Backspace</text>
  <text class="keep" x="73" y="177" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Tab</text>
  <text class="keep" x="73" y="233" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Caps Lock</text>
  <text class="keep" x="787" y="233" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Enter</text>
  <text class="keep" x="73" y="289" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Shift</text>
  <text class="keep" x="759" y="289" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Shift</text>
  <text class="keep" x="73" y="345" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
  <text class="keep" x="143" y="345" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Fn</text>
  <text class="keep" x="199" y="345" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="619" y="345" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Alt</text>
  <text class="keep" x="689" y="345" font-family="sans-serif" font-size="13" font-weight="bold" fill="${SLATE}">Ctrl</text>
`;

/* ------------------------------------------------------------------ *
 * The keyboard pictures.
 * ------------------------------------------------------------------ */

/**
 * The keyboard: every key where it really is, the eight home keys tinted, the
 * bumps on F and J, and each big key's name and symbol. The hotspots and the
 * first Find It picture. Nothing on it names a part — every word is printed
 * on a key (class="keep") — so the questions ask by JOB and finger.
 */
const KEYBOARD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" class="w-full h-full drop-shadow-md">
  ${kbCase(6, 6, 888, 318)}
  ${keycaps(KEY_LIST, plainKey)}
  ${bumps(KEYCAPS)}
  ${smallSymbols(KEYCAPS)}
  ${KEY_LEGENDS}
  ${KEY_WORDS}
</svg>`;

/**
 * The keyboard, labelled: the home row, the space bar, Shift, Enter,
 * Backspace, Caps Lock and Tab. Its big keys show their SYMBOLS only (as on
 * many keyboards), so Label It is about where the keys are and what they look
 * like, not about matching a word to the same word. Margins are kept clear for
 * the answer boxes: Tab, Caps Lock and Shift on the left; Backspace and Enter
 * on the right; the home row above; the space bar below.
 */
const LB_KEYBOARD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -84 1500 494" class="w-full h-full drop-shadow-md">
  <rect x="-300" y="-84" width="1500" height="494" rx="14" fill="#ffffff"/>
  ${kbCase(6, 6, 888, 318)}
  <rect x="122" y="136" width="622" height="62" rx="12" fill="${CYAN_PALE}" stroke="${CYAN}" stroke-width="3"/>
  ${keycaps(KEY_LIST, plainKey)}
  ${bumps(KEYCAPS)}
  ${bigSymbols(KEYCAPS)}
  ${KEY_LEGENDS}
  ${KEY_MODS}

  ${lead(-24, 111, 38, 111)}
  ${lead(-24, 167, 38, 167)}
  ${lead(-24, 223, 38, 223)}
  ${lead(405, -26, 405, 152)}
  ${lead(924, 55, 856, 55)}
  ${lead(924, 167, 856, 167)}
  ${lead(447, 344, 447, 292)}

  <text x="-148" y="118" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Tab</text>
  <text x="-148" y="174" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <text x="-148" y="230" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text x="405" y="-44" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Home row</text>
  <text x="1048" y="62" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Backspace</text>
  <text x="1048" y="174" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Enter</text>
  <text x="447" y="376" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Space bar</text>
</svg>`;

/**
 * Hands on the home row, labelled by finger. The deck's "home row" slide and
 * the second Label It picture: little and index fingers of each hand, and the
 * two thumbs on the space bar (one label, two leader lines).
 */
const LB_HANDS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -110 1500 690" class="w-full h-full drop-shadow-md">
  <rect x="-300" y="-110" width="1500" height="690" rx="14" fill="#ffffff"/>
  ${kbCase(6, 6, 888, 318)}
  ${keycaps(KEY_LIST, plainKey)}
  ${bumps(KEYCAPS)}
  ${smallSymbols(KEYCAPS)}
  ${KEY_LEGENDS}
  ${KEY_WORDS}
  ${hands(KEYCAPS)}

  ${lead(-24, 262, 166, 262)}
  ${lead(230, -30, 321, 204)}
  ${lead(580, -30, 489, 204)}
  ${lead(924, 262, 644, 262)}
  ${lead(405, 478, 374, 286)}
  ${lead(405, 478, 436, 286)}

  <text x="-160" y="269" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Left little finger</text>
  <text x="230" y="-48" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Left index finger</text>
  <text x="580" y="-48" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Right index finger</text>
  <text x="1060" y="269" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Right little finger</text>
  <text x="405" y="510" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Thumbs</text>
</svg>`;

/**
 * Every finger's keys, in its own colour — the Typing Gym's colours. The
 * dashed line is where the keyboard splits between the hands (5|6, T|Y, G|H,
 * B|N). The legend underneath names each colour.
 */
const FINGER_ZONES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -44 900 484" class="w-full h-full drop-shadow-md">
  <rect x="0" y="-44" width="900" height="484" rx="14" fill="#ffffff"/>
  ${kbCase(6, 6, 888, 318)}
  ${keycaps(KEY_LIST, zoneKey)}
  ${bumps(KEYCAPS)}
  ${smallSymbols(KEYCAPS)}
  ${KEY_LEGENDS}
  ${KEY_WORDS}
  <path d="M 363 -6 V 83 H 391 V 139 H 405 V 195 H 433 V 250" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="10 7" stroke-linecap="round"/>

  <rect x="40" y="350" width="34" height="26" rx="6" fill="${ZONE_FILL.L4}" stroke="${ZONE_EDGE.L4}" stroke-width="2.5"/>
  <text x="86" y="370" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Little fingers</text>
  <rect x="330" y="350" width="34" height="26" rx="6" fill="${ZONE_FILL.L3}" stroke="${ZONE_EDGE.L3}" stroke-width="2.5"/>
  <text x="376" y="370" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Ring fingers</text>
  <rect x="610" y="350" width="34" height="26" rx="6" fill="${ZONE_FILL.L2}" stroke="${ZONE_EDGE.L2}" stroke-width="2.5"/>
  <text x="656" y="370" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Middle fingers</text>
  <rect x="40" y="398" width="34" height="26" rx="6" fill="${ZONE_FILL.L1}" stroke="${ZONE_EDGE.L1}" stroke-width="2.5"/>
  <text x="86" y="418" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Left index finger</text>
  <rect x="330" y="398" width="34" height="26" rx="6" fill="${ZONE_FILL.R1}" stroke="${ZONE_EDGE.R1}" stroke-width="2.5"/>
  <text x="376" y="418" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Right index finger</text>
  <rect x="610" y="398" width="34" height="26" rx="6" fill="${ZONE_FILL.T}" stroke="${ZONE_EDGE.T}" stroke-width="2.5"/>
  <text x="656" y="418" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}">Thumbs</text>
  <text x="196" y="-16" font-family="sans-serif" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">LEFT HAND</text>
  <text x="630" y="-16" font-family="sans-serif" font-size="17" font-weight="bold" fill="${MUTED}" text-anchor="middle">RIGHT HAND</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Sitting and looking.
 * ------------------------------------------------------------------ */

/**
 * Sitting well, side on, with the five things to check hung off the body:
 * the top of the screen at eye level (the dashed line is where the eyes
 * look), a straight back against the chair, elbows by the sides, straight
 * wrists, feet flat on the floor. The deck's "Sit like this" showcase.
 */
const POSTURE_GOOD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520" class="w-full h-full drop-shadow-md">
  ${room()}
  ${person(SIT_WELL)}
  <line x1="289" y1="151" x2="514" y2="178" stroke="${GREEN}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>

  ${lead(640, 84, 522, 146)}
  ${lead(110, 210, 228, 256)}
  ${lead(360, 222, 274, 278)}
  ${lead(470, 252, 360, 279)}
  ${lead(560, 410, 436, 466)}

  <text x="640" y="72" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Screen at eye level</text>
  <text x="110" y="198" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Back straight</text>
  <text x="410" y="214" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Elbows by your sides</text>
  <text x="440" y="246" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Wrists straight</text>
  <text x="570" y="402" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Feet flat on the floor</text>
</svg>`;

/**
 * Source Analysis: Nam, sitting badly — perched on the front of the chair,
 * back curved, head pushed forward and down over the keys, wrists resting on
 * the desk edge and bent up, feet hanging. Nothing is labelled: reading the
 * body is the question.
 */
const POSTURE_BAD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520" class="w-full h-full drop-shadow-md">
  ${room()}
  ${person({
    hip: [300, 334], knee: [410, 338], ankle: [392, 426], toe: [412, 442],
    back: [298, 262], neck: [352, 228], head: [384, 234], eye: [404, 248],
    shoulder: [350, 242], elbow: [350, 290], wrist: [398, 290], fingers: [424, 272],
  })}
  <line x1="408" y1="252" x2="424" y2="282" stroke="${RED}" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>
  <text x="70" y="52" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Nam</text>
</svg>`;

/**
 * Source Analysis: Minh hunting and pecking — head down, one pointing finger,
 * the other hand in his lap — and, in the bubble, what is on the screen he is
 * not looking at: three mistakes he has not seen, underlined the way a
 * spell-checker would.
 */
const HUNT_PECK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520" class="w-full h-full drop-shadow-md">
  ${room()}
  ${person(HUNTING)}
  <line x1="337" y1="214" x2="398" y2="280" stroke="${RED}" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>
  <path d="M 534 112 L 528 138 L 560 112" fill="#ffffff" stroke="${CASE}" stroke-width="2" stroke-linejoin="round"/>
  <rect x="400" y="22" width="344" height="92" rx="12" fill="#ffffff" stroke="${CASE}" stroke-width="2"/>
  <rect x="530" y="108" width="30" height="8" fill="#ffffff"/>
  <text x="416" y="48" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">On Minh’s screen:</text>
  <text class="keep" x="416" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="39.6" lengthAdjust="spacingAndGlyphs">Teh</text>
  <text class="keep" x="468.8" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="39.6" lengthAdjust="spacingAndGlyphs">cat</text>
  <text class="keep" x="521.6" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="39.6" lengthAdjust="spacingAndGlyphs">sat</text>
  <text class="keep" x="574.4" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="26.4" lengthAdjust="spacingAndGlyphs">on</text>
  <text class="keep" x="614" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="39.6" lengthAdjust="spacingAndGlyphs">teh</text>
  <text class="keep" x="666.8" y="88" font-family="monospace" font-size="22" font-weight="bold" fill="${INK}" textLength="52.8" lengthAdjust="spacingAndGlyphs">mta.</text>
  ${squiggle(416, 456, 96)}
  ${squiggle(614, 654, 96)}
  ${squiggle(667, 707, 96)}
  <text x="70" y="52" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Minh</text>
</svg>`;

/**
 * Two ways to type, side by side, each a small copy of the posture room: hunt
 * and peck (head down, eyes travelling from the keys to the screen and back)
 * and touch typing (head up, eyes on the screen).
 */
const TWO_WAYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" class="w-full h-full drop-shadow-md">
  <rect x="6" y="6" width="370" height="368" rx="16" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="384" y="6" width="370" height="368" rx="16" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${mark(344, 38, false)}
  ${mark(722, 38, true)}
  <g transform="translate(-40 38) scale(0.5)">
    ${room({ wall: false })}
    ${person(HUNTING)}
    ${arrow(338, 216, 396, 276, RED, 5)}
    ${arrow(352, 204, 508, 186, RED, 5, '9 7')}
  </g>
  <g transform="translate(338 38) scale(0.5)">
    ${room({ wall: false })}
    ${person(SIT_WELL)}
    ${arrow(290, 151, 510, 176, GREEN, 5, '9 7')}
  </g>
  <text x="170" y="46" font-family="sans-serif" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Hunt and peck</text>
  <text x="548" y="46" font-family="sans-serif" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Touch typing</text>
  <text x="191" y="316" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}" text-anchor="middle">One finger. Eyes go down to</text>
  <text x="191" y="342" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}" text-anchor="middle">the keys, then back up.</text>
  <text x="569" y="316" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}" text-anchor="middle">Ten fingers on their keys.</text>
  <text x="569" y="342" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}" text-anchor="middle">Eyes stay on the screen.</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Close-ups.
 * ------------------------------------------------------------------ */

/**
 * The middle of the home row, drawn big: D F G H J K, the four home keys
 * tinted, a bump on F and on J (labelled between the fingers, so no leader
 * crosses a letter), and the two index fingers coming up to feel for them.
 */
const BUMPS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 110 640 330" class="w-full h-full drop-shadow-md">
  <rect x="4" y="114" width="632" height="322" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${bigKey(22, 150, 92, 92, CYAN_PALE, CYAN)}
  ${bigKey(122, 150, 92, 92, CYAN_PALE, CYAN, true)}
  ${bigKey(222, 150, 92, 92, '#ffffff', CASE)}
  ${bigKey(322, 150, 92, 92, '#ffffff', CASE)}
  ${bigKey(422, 150, 92, 92, CYAN_PALE, CYAN, true)}
  ${bigKey(522, 150, 92, 92, CYAN_PALE, CYAN)}
  <text class="keep" x="42" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">D</text>
  <text class="keep" x="142" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">F</text>
  <text class="keep" x="242" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">G</text>
  <text class="keep" x="342" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">H</text>
  <text class="keep" x="442" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">J</text>
  <text class="keep" x="542" y="194" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}">K</text>
  ${finger(168, 284, 150, 452, 58, FINGER_INK.L1)}
  ${finger(468, 284, 486, 452, 58, FINGER_INK.R1)}
  <path d="M 146 262 Q 168 252 190 262 M 446 262 Q 468 252 490 262" fill="none" stroke="${SLATE}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4"/>

  ${lead(270, 280, 178, 230)}
  ${lead(370, 280, 458, 230)}
  <text x="320" y="300" font-family="sans-serif" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">the bumps</text>
  <text x="212" y="356" font-family="sans-serif" font-size="19" font-weight="bold" fill="#1d4ed8">Left index finger</text>
  <text x="424" y="404" font-family="sans-serif" font-size="19" font-weight="bold" fill="#6d28d9" text-anchor="end">Right index finger</text>
</svg>`;

/**
 * The taskbar's language button, clicked open: the keyboard is on Vietnamese
 * (Telex) and the pointer is about to choose English. The deck's "Switch to
 * EN first" slide. Every word on it is part of the screen (class="keep").
 */
const LANG_SWITCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="392" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <rect x="30" y="26" width="330" height="170" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="32" y="28" width="326" height="34" fill="${FAINT}"/>
  <text class="keep" x="50" y="51" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Notes</text>
  <text class="keep" x="56" y="112" font-family="sans-serif" font-size="22" fill="${INK}">My homework</text>
  <rect x="194" y="92" width="3" height="27" fill="${INK}"/>

  <path d="M 5 344 H 635 V 382 Q 635 395 622 395 H 18 Q 5 395 5 382 Z" fill="${INK}"/>
  <rect x="18" y="356" width="40" height="28" rx="6" fill="${BLUE}"/>
  <path d="M 29 363 h 7 v 7 h -7 z M 40 363 h 7 v 7 h -7 z M 29 374 h 7 v 7 h -7 z M 40 374 h 7 v 7 h -7 z" fill="#ffffff"/>
  <rect x="468" y="353" width="54" height="34" rx="7" fill="#334155" stroke="#38bdf8" stroke-width="2.5"/>
  <text class="keep" x="495" y="376" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">VI</text>
  <text class="keep" x="584" y="368" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
  <text class="keep" x="584" y="385" font-family="sans-serif" font-size="11" fill="${CASE}" text-anchor="middle">Mon</text>

  <rect x="314" y="152" width="304" height="182" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <text class="keep" x="334" y="182" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Keyboard</text>
  <rect x="326" y="196" width="280" height="56" rx="8" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="338" y="209" width="48" height="30" rx="6" fill="${FAINT}"/>
  <text class="keep" x="362" y="230" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">EN</text>
  <text class="keep" x="400" y="231" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">English</text>
  <rect x="326" y="262" width="280" height="56" rx="8" fill="#e0f2fe" stroke="${BLUE}" stroke-width="2"/>
  <rect x="338" y="275" width="48" height="30" rx="6" fill="#bae6fd"/>
  <text class="keep" x="362" y="296" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">VI</text>
  <text class="keep" x="400" y="297" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Tiếng Việt · Telex</text>
  <path d="M 580 290 L 586 297 L 597 284" fill="none" stroke="${BLUE}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 520 214 L 520 244 L 528 236 L 534 250 L 540 247 L 534 234 L 545 234 Z" fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
</svg>`;

/**
 * Reach and come home, exploded: the left hand's keys with room between the
 * rows for the moves. The left index finger reaches up from F to R and comes
 * straight back, then down from F to V and back. Keys in their finger's colour.
 */
const REACH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="612" height="412" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${bigKey(40, 24, 78, 78, ZONE_FILL.L4, ZONE_EDGE.L4)}
  ${bigKey(126, 24, 78, 78, ZONE_FILL.L3, ZONE_EDGE.L3)}
  ${bigKey(212, 24, 78, 78, ZONE_FILL.L2, ZONE_EDGE.L2)}
  ${bigKey(298, 24, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1)}
  ${bigKey(384, 24, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1)}
  ${bigKey(62, 170, 78, 78, ZONE_FILL.L4, ZONE_EDGE.L4)}
  ${bigKey(148, 170, 78, 78, ZONE_FILL.L3, ZONE_EDGE.L3)}
  ${bigKey(234, 170, 78, 78, ZONE_FILL.L2, ZONE_EDGE.L2)}
  ${bigKey(320, 170, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1, true)}
  ${bigKey(406, 170, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1)}
  ${bigKey(104, 316, 78, 78, ZONE_FILL.L4, ZONE_EDGE.L4)}
  ${bigKey(190, 316, 78, 78, ZONE_FILL.L3, ZONE_EDGE.L3)}
  ${bigKey(276, 316, 78, 78, ZONE_FILL.L2, ZONE_EDGE.L2)}
  ${bigKey(362, 316, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1)}
  ${bigKey(448, 316, 78, 78, ZONE_FILL.L1, ZONE_EDGE.L1)}
  <text class="keep" x="79" y="75" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
  <text class="keep" x="165" y="75" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
  <text class="keep" x="251" y="75" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">E</text>
  <text class="keep" x="337" y="75" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
  <text class="keep" x="423" y="75" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">T</text>
  <text class="keep" x="101" y="221" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
  <text class="keep" x="187" y="221" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text class="keep" x="273" y="221" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
  <text class="keep" x="359" y="221" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
  <text class="keep" x="445" y="221" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">G</text>
  <text class="keep" x="143" y="367" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text class="keep" x="229" y="367" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
  <text class="keep" x="315" y="367" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  <text class="keep" x="401" y="367" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
  <text class="keep" x="487" y="367" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>

  ${arrow(340, 166, 326, 110, BLUE, 5)}
  ${arrow(352, 110, 366, 166, GREEN, 5)}
  ${arrow(366, 252, 384, 310, BLUE, 5)}
  ${arrow(398, 310, 380, 252, GREEN, 5)}
  <text x="238" y="142" font-family="sans-serif" font-size="19" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Reach up to R</text>
  <text x="484" y="142" font-family="sans-serif" font-size="19" font-weight="bold" fill="#047857" text-anchor="middle">Come home to F</text>
  <text x="256" y="288" font-family="sans-serif" font-size="19" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Reach down to V</text>
  <text x="514" y="288" font-family="sans-serif" font-size="19" font-weight="bold" fill="#047857" text-anchor="middle">Come home to F</text>
</svg>`;

/**
 * The right hand's punctuation keys, drawn big and in their finger's colour:
 * the comma (right middle finger) and the full stop (right ring finger) need
 * no Shift; the question mark is the TOP mark on the / key, so it needs Shift
 * — the left one, because / is a right-hand key. And, set apart, the ! over 1.
 */
const PUNCT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="412" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${bigKey(62, 40, 80, 80, ZONE_FILL.R1, ZONE_EDGE.R1)}
  ${bigKey(150, 40, 80, 80, ZONE_FILL.R2, ZONE_EDGE.R2)}
  ${bigKey(238, 40, 80, 80, ZONE_FILL.R3, ZONE_EDGE.R3)}
  ${bigKey(326, 40, 80, 80, ZONE_FILL.R4, ZONE_EDGE.R4)}
  ${bigKey(414, 40, 80, 80, ZONE_FILL.R4, ZONE_EDGE.R4)}
  ${bigKey(502, 40, 190, 80, ZONE_FILL.R4, ZONE_EDGE.R4)}
  ${bigKey(106, 128, 80, 80, ZONE_FILL.R1, ZONE_EDGE.R1)}
  ${bigKey(194, 128, 80, 80, ZONE_FILL.R2, ZONE_EDGE.R2)}
  ${bigKey(282, 128, 80, 80, ZONE_FILL.R3, ZONE_EDGE.R3)}
  ${bigKey(370, 128, 80, 80, ZONE_FILL.R4, ZONE_EDGE.R4)}
  ${bigKey(458, 128, 234, 80, ZONE_FILL.R4, ZONE_EDGE.R4)}
  ${bigKey(640, 316, 80, 80, ZONE_FILL.L4, ZONE_EDGE.L4)}
  ${symbolAt('enter', 516, 54, 1.5)}
  ${symbolAt('rshift', 472, 142, 1.5)}
  <text class="keep" x="102" y="94" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">J</text>
  <text class="keep" x="190" y="94" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
  <text class="keep" x="278" y="94" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">L</text>
  <text class="keep" x="366" y="70" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">:</text><text class="keep" x="366" y="106" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">;</text>
  <text class="keep" x="454" y="70" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">"</text><text class="keep" x="454" y="106" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">'</text>
  <text class="keep" x="516" y="106" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}">Enter</text>
  <text class="keep" x="146" y="182" font-family="sans-serif" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
  <text class="keep" x="234" y="158" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">&lt;</text><text class="keep" x="234" y="194" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">,</text>
  <text class="keep" x="322" y="158" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">&gt;</text><text class="keep" x="322" y="194" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
  <text class="keep" x="410" y="158" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">?</text><text class="keep" x="410" y="194" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">/</text>
  <text class="keep" x="472" y="194" font-family="sans-serif" font-size="17" font-weight="bold" fill="${SLATE}">Shift</text>
  <text class="keep" x="680" y="346" font-family="sans-serif" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">!</text><text class="keep" x="680" y="382" font-family="sans-serif" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>

  ${lead(210, 272, 234, 206)}
  ${lead(330, 272, 322, 206)}
  ${lead(482, 272, 410, 206)}
  ${lead(616, 340, 668, 340)}
  <text x="200" y="296" font-family="sans-serif" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">comma</text>
  <text x="200" y="322" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">middle finger</text>
  <text x="330" y="296" font-family="sans-serif" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">full stop</text>
  <text x="330" y="322" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">ring finger</text>
  <text x="500" y="296" font-family="sans-serif" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">question mark</text>
  <text x="500" y="322" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">hold Shift, press /</text>
  <text x="604" y="366" font-family="sans-serif" font-size="21" font-weight="bold" fill="${INK}" text-anchor="end">exclamation mark</text>
  <text x="604" y="392" font-family="sans-serif" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="end">hold Shift, press 1</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The Typing Gym, as the student will see it.
 * ------------------------------------------------------------------ */

/**
 * The Typing Gym's end-of-session card for Ha Vi: fast enough, not accurate
 * enough. The same three numbers the real task shows — speed, right, score —
 * without its advice line, which would answer the deck's question.
 */
const GYM_RESULT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" class="w-full h-full drop-shadow-md">
  <rect x="16" y="12" width="608" height="336" rx="24" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <circle cx="320" cy="62" r="34" fill="#fef3c7"/>
  <path d="M 305 46 H 335 V 58 Q 335 76 320 78 Q 305 76 305 58 Z M 305 50 Q 293 50 295 60 Q 297 68 306 68 M 335 50 Q 347 50 345 60 Q 343 68 334 68" fill="none" stroke="${AMBER}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="316" y="78" width="8" height="8" fill="${AMBER}"/>
  <rect x="306" y="86" width="28" height="6" rx="2" fill="${AMBER}"/>
  <text class="keep" x="320" y="128" font-family="sans-serif" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Session finished</text>
  <text class="keep" x="320" y="154" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Typing Gym · Ha Vi</text>

  <rect x="44" y="176" width="176" height="128" rx="16" fill="#ecfdf5" stroke="${GREEN}" stroke-width="3"/>
  <text class="keep" x="132" y="206" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">SPEED</text>
  <text class="keep" x="132" y="256" font-family="sans-serif" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">14</text>
  <text class="keep" x="132" y="286" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Goal: 8</text>
  <rect x="232" y="176" width="176" height="128" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <text class="keep" x="320" y="206" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">RIGHT</text>
  <text class="keep" x="320" y="256" font-family="sans-serif" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">72%</text>
  <text class="keep" x="320" y="286" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Goal: 90%</text>
  <rect x="420" y="176" width="176" height="128" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <text class="keep" x="508" y="206" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">SCORE</text>
  <text class="keep" x="508" y="256" font-family="sans-serif" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">7/10</text>
  <text x="320" y="334" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">Speed: words a minute. Right: keys right out of every 100.</text>
</svg>`;

/**
 * A Typing Gym round, mid-line: "sad d" typed (green), the next letter — a —
 * flashing red because the student pressed s, and the on-screen keyboard
 * lighting the key they want in its finger's colour. Everything a typist needs
 * to check is on the SCREEN; nothing needs a look at the hands. The letters
 * are placed one per cell (the x list), the way the Gym lays out its line.
 */
const GYM_SCREEN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="392" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="24" y="20" width="310" height="34" rx="10" fill="#ecfeff" stroke="#67e8f9" stroke-width="2"/>
  <text class="keep" x="40" y="43" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Round 3 of 10 · The home row</text>
  <text class="keep" x="736" y="43" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="end">SPEED 9 · RIGHT 94%</text>

  <rect x="24" y="68" width="712" height="118" rx="24" fill="#ffffff" stroke="#22d3ee" stroke-width="3"/>
  <rect x="260" y="102" width="32" height="54" rx="7" fill="#f43f5e"/>
  <text class="keep" x="146 172 198 224 250" y="141" font-family="monospace" font-size="32" font-weight="bold" fill="#3e7500" text-anchor="middle">sad d</text>
  <text class="keep" x="276" y="141" font-family="monospace" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
  <text class="keep" x="302 328 354 380 406 432 458 484 510 536 562 588 614" y="141" font-family="monospace" font-size="32" font-weight="bold" fill="${LINE}" text-anchor="middle">d had a flask</text>

  <text class="keep" x="346" y="226" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}" text-anchor="end">NEXT KEY:</text>
  <rect x="354" y="206" width="30" height="28" rx="6" fill="${CYAN}"/>
  <text class="keep" x="369" y="227" font-family="monospace" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
  <text class="keep" x="396" y="226" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f43f5e">you pressed s</text>

  <rect x="56" y="244" width="648" height="138" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="70" y="256" width="56" height="56" rx="8" fill="${CYAN}" stroke="#0e7490" stroke-width="2"/>
  <rect x="132" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.L3}" stroke="${LINE}" stroke-width="2"/>
  <rect x="194" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.L2}" stroke="${LINE}" stroke-width="2"/>
  <rect x="256" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.L1}" stroke="${LINE}" stroke-width="2"/>
  <rect x="318" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.L1}" stroke="${LINE}" stroke-width="2"/>
  <rect x="380" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.R1}" stroke="${LINE}" stroke-width="2"/>
  <rect x="442" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.R1}" stroke="${LINE}" stroke-width="2"/>
  <rect x="504" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.R2}" stroke="${LINE}" stroke-width="2"/>
  <rect x="566" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.R3}" stroke="${LINE}" stroke-width="2"/>
  <rect x="628" y="256" width="56" height="56" rx="8" fill="${ZONE_FILL.R4}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 278 303 H 290 M 464 303 H 476" stroke="${SLATE}" stroke-width="3" stroke-linecap="round"/>
  <rect x="230" y="322" width="300" height="46" rx="8" fill="${ZONE_FILL.T}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="98" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
  <text class="keep" x="160" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">s</text>
  <text class="keep" x="222" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">d</text>
  <text class="keep" x="284" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">f</text>
  <text class="keep" x="346" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">g</text>
  <text class="keep" x="408" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">h</text>
  <text class="keep" x="470" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">j</text>
  <text class="keep" x="532" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">k</text>
  <text class="keep" x="594" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">l</text>
  <text class="keep" x="656" y="292" font-family="monospace" font-size="22" font-weight="bold" fill="${SLATE}" text-anchor="middle">;</text>
</svg>`;

/**
 * Source Analysis: two typists' results after the same minute — A fast and
 * 60% right, B half as fast and 95% right — with what each actually typed.
 * A's wrong words are red and underlined the way a spell-checker marks them.
 */
const TYPISTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" class="w-full h-full drop-shadow-md">
  <rect x="12" y="12" width="362" height="356" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="386" y="12" width="362" height="356" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="193" y="48" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Typist A</text>
  <text x="567" y="48" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Typist B</text>

  <rect x="32" y="66" width="152" height="104" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="108" y="92" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">SPEED</text>
  <text class="keep" x="108" y="136" font-family="sans-serif" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">30</text>
  <text class="keep" x="108" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">words a minute</text>
  <rect x="202" y="66" width="152" height="104" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="278" y="92" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">RIGHT</text>
  <text class="keep" x="278" y="136" font-family="sans-serif" font-size="40" font-weight="bold" fill="#dc2626" text-anchor="middle">60%</text>
  <text class="keep" x="278" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">keys right</text>

  <rect x="406" y="66" width="152" height="104" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="482" y="92" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">SPEED</text>
  <text class="keep" x="482" y="136" font-family="sans-serif" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">15</text>
  <text class="keep" x="482" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">words a minute</text>
  <rect x="576" y="66" width="152" height="104" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="652" y="92" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">RIGHT</text>
  <text class="keep" x="652" y="136" font-family="sans-serif" font-size="40" font-weight="bold" fill="#15803d" text-anchor="middle">95%</text>
  <text class="keep" x="652" y="160" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}" text-anchor="middle">keys right</text>

  <rect x="32" y="186" width="322" height="164" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="48" y="212" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">What A typed:</text>
  <text class="keep" x="48" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">Teh</text>
  <text class="keep" x="96" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">cta</text>
  <text class="keep" x="144" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">sat</text>
  <text class="keep" x="192" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="24" lengthAdjust="spacingAndGlyphs">no</text>
  <text class="keep" x="228" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">hte</text>
  <text class="keep" x="48" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="48" lengthAdjust="spacingAndGlyphs">mat,</text>
  <text class="keep" x="108" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">adn</text>
  <text class="keep" x="156" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">teh</text>
  <text class="keep" x="204" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="#dc2626" textLength="36" lengthAdjust="spacingAndGlyphs">dgo</text>
  ${squiggle(48, 84, 263)}
  ${squiggle(96, 132, 263)}
  ${squiggle(192, 216, 263)}
  ${squiggle(228, 264, 263)}
  ${squiggle(108, 144, 307)}
  ${squiggle(156, 192, 307)}
  ${squiggle(204, 240, 307)}

  <rect x="406" y="186" width="322" height="164" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="422" y="212" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}">What B typed:</text>
  <text class="keep" x="422" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">The</text>
  <text class="keep" x="470" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">cat</text>
  <text class="keep" x="518" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">sat</text>
  <text class="keep" x="566" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="24" lengthAdjust="spacingAndGlyphs">on</text>
  <text class="keep" x="602" y="256" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">the</text>
  <text class="keep" x="422" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="48" lengthAdjust="spacingAndGlyphs">mat,</text>
  <text class="keep" x="482" y="300" font-family="monospace" font-size="20" font-weight="bold" fill="${INK}" textLength="36" lengthAdjust="spacingAndGlyphs">and</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Workbook and Find It.
 * ------------------------------------------------------------------ */

/** Workbook: the keyboard with one key ringed in orange (C) — which finger presses it? */
const WB_RING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 330" class="w-full h-full drop-shadow-md">
  ${kbCase(6, 6, 888, 318)}
  ${keycaps(KEY_LIST, plainKey)}
  ${bumps(KEYCAPS)}
  ${smallSymbols(KEYCAPS)}
  ${KEY_LEGENDS}
  ${KEY_WORDS}
  <rect x="${KEYCAPS.c.x - 5}" y="${KEYCAPS.c.y - 5}" width="${KEYCAPS.c.w + 10}" height="${KEYCAPS.c.h + 10}" rx="11" fill="none" stroke="${AMBER}" stroke-width="5"/>
</svg>`;

/**
 * Find It's second picture: a laptop from above. The same four rows of keys,
 * a thin row of function keys on top (Esc … Delete), Fn and the arrow keys in
 * the bottom row, and the touchpad with the palm rests beside it. No home-row
 * tint — a real laptop has none — but F and J still have their bumps.
 */
const LAPTOP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 620" class="w-full h-full drop-shadow-md">
  <rect x="20" y="14" width="920" height="592" rx="30" fill="#e5e7eb" stroke="${CASE}" stroke-width="3"/>
  <rect x="120" y="14" width="720" height="9" rx="4" fill="${CASE}"/>
  <rect x="48" y="32" width="864" height="334" rx="14" fill="${LINE}"/>
  ${keycaps(LAPTOP_LIST.filter((k) => k.id !== 'updown'), () => ['#ffffff', CASE, 1.5])}
  ${upDownKeys(LAPTOP_KEYCAPS.updown)}
  ${bumps(LAPTOP_KEYCAPS)}
  ${smallSymbols(LAPTOP_KEYCAPS)}
  ${arrowKeyGlyphs(LAPTOP_KEYCAPS)}
  ${LAPTOP_LEGENDS}
  <rect x="356" y="392" width="248" height="172" rx="16" fill="#d1d5db" stroke="${CASE}" stroke-width="2.5"/>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file, so `{ KEY }`
// would report every reference in the unit as undefined.
export const DIAGRAMS = {
  KEYBOARD: KEYBOARD,
  LB_KEYBOARD: LB_KEYBOARD,
  LB_HANDS: LB_HANDS,
  FINGER_ZONES: FINGER_ZONES,
  POSTURE_GOOD: POSTURE_GOOD,
  POSTURE_BAD: POSTURE_BAD,
  HUNT_PECK: HUNT_PECK,
  TWO_WAYS: TWO_WAYS,
  BUMPS: BUMPS,
  LANG_SWITCH: LANG_SWITCH,
  REACH: REACH,
  PUNCT: PUNCT,
  GYM_RESULT: GYM_RESULT,
  GYM_SCREEN: GYM_SCREEN,
  TYPISTS: TYPISTS,
  WB_RING: WB_RING,
  LAPTOP: LAPTOP,
};
