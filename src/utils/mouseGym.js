// src/utils/mouseGym.js
//
// Mouse Gym (MOUSE_GYM, p45) — the pure parts. `MouseGym.jsx` renders; this
// file draws a session from a seed, names each gesture, and scores the rounds.
// Built for T2 · Mouse, Keys and Windows (docs/primary-tech/UPGRADE-PLAN.md §8.2).
//
// The four things a mouse does — click, double-click, right-click, drag — are
// motor skills before they are knowledge, and the only way to get them is to do
// them a lot, on targets that are not always in the same place. So a session is
// a quick run of rounds, each a fresh arrangement:
//
//   click   click the named thing (other things nearby, so aim matters)
//   double  double-click it — two clicks, quickly, without moving
//   right   right-click it, then choose the named item on the menu that opens
//   drag    press on it, keep pressing, move it into the box, let go
//
// On a tablet the same four are tap, double-tap, press-and-hold, and drag; the
// screen names whichever the student is using.
//
// A round is never failed: a slip (one click where two were needed, the left
// button for the right) is NAMED and the round carries on. A round done without
// a slip scores in full; a round rescued after one scores half. Nothing is
// timed — for an eight-year-old, a steady double-click is the skill, not a fast one.
//
// Config (unit data `mouseGym`):
//   { title, titleVn, modes: ['click'|'double'|'right'|'drag'], rounds?: 12 }

import { rngOf } from './typeGym.js';

export const MOUSE_MODES = ['click', 'double', 'right', 'drag'];

/** The things on the play area. `icon` is a lucide name; the screen maps it. */
export const SHAPES = [
  { id: 'star', icon: 'Star', en: 'star', vn: 'ngôi sao', color: '#f59e0b' },
  { id: 'heart', icon: 'Heart', en: 'heart', vn: 'trái tim', color: '#ef4444' },
  { id: 'fish', icon: 'Fish', en: 'fish', vn: 'con cá', color: '#0ea5e9' },
  { id: 'rocket', icon: 'Rocket', en: 'rocket', vn: 'tên lửa', color: '#8b5cf6' },
  { id: 'flower', icon: 'Flower2', en: 'flower', vn: 'bông hoa', color: '#ec4899' },
  { id: 'sun', icon: 'Sun', en: 'sun', vn: 'mặt trời', color: '#eab308' },
  { id: 'cloud', icon: 'Cloud', en: 'cloud', vn: 'đám mây', color: '#64748b' },
  { id: 'car', icon: 'Car', en: 'car', vn: 'ô tô', color: '#dc2626' },
  { id: 'tree', icon: 'TreePine', en: 'tree', vn: 'cái cây', color: '#16a34a' },
  { id: 'apple', icon: 'Apple', en: 'apple', vn: 'quả táo', color: '#b91c1c' },
  { id: 'bird', icon: 'Bird', en: 'bird', vn: 'con chim', color: '#0d9488' },
  { id: 'cat', icon: 'Cat', en: 'cat', vn: 'con mèo', color: '#a16207' },
  { id: 'bell', icon: 'Bell', en: 'bell', vn: 'cái chuông', color: '#ca8a04' },
  { id: 'gift', icon: 'Gift', en: 'present', vn: 'hộp quà', color: '#db2777' },
];

/** What a right-click menu offers here. The job names one. */
export const MENU_CHOICES = ['Open', 'Copy', 'Rename', 'Delete'];

/** The play area is a grid of cells; nothing ever overlaps. */
const COLS = 5;
const ROWS = 3;

function shuffle(list, rand) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The play area is twice as wide as it is tall (MouseGym.jsx draws it 2:1). */
export const ASPECT = 2;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * The centre of a cell, in percent of the play area, with a little wobble —
 * kept far enough from the edge that a square `w` percent of the width wide
 * (so `w * ASPECT` percent of the height tall) never pokes out of it.
 */
function cellCentre(cell, rand, w = 12) {
  const col = cell % COLS;
  const row = Math.floor(cell / COLS);
  const hx = w / 2 + 1;
  const hy = (w * ASPECT) / 2 + 1;
  return {
    x: Math.round(clamp(((col + 0.5) / COLS) * 100 + (rand() - 0.5) * 6, hx, 100 - hx)),
    y: Math.round(clamp(((row + 0.5) / ROWS) * 100 + (rand() - 0.5) * 8, hy, 100 - hy)),
  };
}

/**
 * A whole session: `rounds` rounds cycling through the unit's modes. Targets
 * shrink a little as the session goes on — big enough for a nine-year-old's
 * first click, a little more demanding by the end.
 */
export function makeSession(cfg, seed = Date.now()) {
  const rand = rngOf(seed);
  const modes = (cfg?.modes || []).filter((m) => MOUSE_MODES.includes(m));
  const rounds = Math.max(4, Math.min(16, Number(cfg?.rounds) || 12));
  const out = [];
  for (let i = 0; i < rounds && modes.length; i += 1) {
    const kind = modes[i % modes.length];
    const shapes = shuffle(SHAPES, rand);
    const cells = shuffle([...Array(COLS * ROWS).keys()], rand);
    // 12% of the play area's width at the start, 8% by the end.
    const size = Math.round(12 - (4 * i) / Math.max(1, rounds - 1));
    const decoys = kind === 'drag' ? 1 : 2 + Math.floor(rand() * 2);
    const items = shapes.slice(0, 1 + decoys).map((sh, k) => ({ id: sh.id, ...cellCentre(cells[k], rand, size) }));
    const round = { id: `r${out.length + 1}`, kind, target: items[0].id, items: shuffle(items, rand), size };
    if (kind === 'right') {
      round.choices = shuffle(MENU_CHOICES, rand).slice(0, 3);
      round.choice = round.choices[Math.floor(rand() * round.choices.length)];
    }
    if (kind === 'drag') {
      // The box goes in a cell well away from the thing to be dragged.
      const from = items.find((it) => it.id === round.target);
      // The box is drawn 1.8 times the size of the thing, so it keeps further in.
      const far = cells.slice(items.length).map((c) => cellCentre(c, rand, size * 1.8))
        .sort((a, b) => Math.hypot(b.x - from.x, b.y - from.y) - Math.hypot(a.x - from.x, a.y - from.y));
      round.box = far[0];
    }
    out.push(round);
  }
  return out;
}

export const shapeOf = (id) => SHAPES.find((s) => s.id === id);

/** The instruction for a round, in either language, for a mouse or a touch screen. */
export function promptOf(round, lang = 'en', touch = false) {
  const sh = shapeOf(round.target);
  const n = lang === 'vn' ? sh.vn : sh.en;
  if (lang === 'vn') {
    if (round.kind === 'click') return touch ? `Chạm vào ${n}.` : `Bấm vào ${n}.`;
    if (round.kind === 'double') return touch ? `Chạm hai lần thật nhanh vào ${n}.` : `Bấm đúp vào ${n} — hai lần, thật nhanh.`;
    if (round.kind === 'right') return touch ? `Nhấn giữ ${n}, rồi chọn ${round.choice}.` : `Bấm chuột phải vào ${n}, rồi chọn ${round.choice}.`;
    return `Kéo ${n} vào trong hộp.`;
  }
  if (round.kind === 'click') return touch ? `Tap the ${n}.` : `Click the ${n}.`;
  if (round.kind === 'double') return touch ? `Double-tap the ${n} — two quick taps.` : `Double-click the ${n} — two clicks, quickly.`;
  if (round.kind === 'right') return touch ? `Press and hold the ${n}, then choose ${round.choice}.` : `Right-click the ${n}, then choose ${round.choice}.`;
  return `Drag the ${n} into the box.`;
}

/** The slips a round can name. The screen shows the sentence; the log keeps the code. */
export const SLIPS = {
  miss: { en: 'Missed — that is not the {n}.', vn: 'Chưa trúng — đó không phải {n}.' },
  wrongThing: { en: 'That is the {m}. Find the {n}.', vn: 'Đó là {m}. Hãy tìm {n}.' },
  oneClick: { en: 'That was ONE click. Click twice, quickly, without moving the mouse.', vn: 'Đó là MỘT lần bấm. Hãy bấm hai lần thật nhanh, không di chuột.' },
  oneTap: { en: 'That was one tap. Tap twice, quickly.', vn: 'Đó là một lần chạm. Hãy chạm hai lần thật nhanh.' },
  leftButton: { en: 'That was the LEFT button. Use the RIGHT button to open the menu.', vn: 'Đó là nút TRÁI. Hãy dùng nút PHẢI để mở trình đơn.' },
  holdLonger: { en: 'Press and HOLD your finger on it until the menu opens.', vn: 'Hãy nhấn và GIỮ ngón tay cho đến khi trình đơn mở ra.' },
  wrongChoice: { en: 'That was {c}. The job says {k}.', vn: 'Em đã chọn {c}. Việc cần làm là {k}.' },
  rightButton: { en: 'That was the right button — it opens a menu. A plain click is the LEFT button.', vn: 'Đó là nút phải — nó mở trình đơn. Bấm thường là nút TRÁI.' },
  dropOutside: { en: 'Let go INSIDE the box. Keep pressing until you get there.', vn: 'Hãy thả ra BÊN TRONG hộp. Giữ nút cho đến khi tới nơi.' },
  notDragged: { en: 'Press on it, KEEP pressing, and move it to the box.', vn: 'Nhấn vào nó, GIỮ nguyên, rồi di chuyển nó tới hộp.' },
};

/** A slip's sentence, filled in for this round. */
export function slipText(code, round, lang = 'en', extra = {}) {
  const t = SLIPS[code]?.[lang === 'vn' ? 'vn' : 'en'] || '';
  const sh = shapeOf(round.target);
  const other = extra.other ? shapeOf(extra.other) : null;
  return t
    .replace('{n}', lang === 'vn' ? sh.vn : sh.en)
    .replace('{m}', other ? (lang === 'vn' ? other.vn : other.en) : '')
    .replace('{c}', extra.choice || '')
    .replace('{k}', round.choice || '');
}

/** Score out of 10 (the task's nativeMax): a clean round counts 1, a rescued one ½. */
export function scoreOf(results = [], total = results.length) {
  if (!total) return 0;
  const pts = results.reduce((s, r) => s + (r.done ? (r.slips ? 0.5 : 1) : 0), 0);
  return Math.round((10 * pts) / total);
}

export function checkMouseGym(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['mouseGym must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}title`);
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('needs at least one mode');
  for (const m of modes) if (!MOUSE_MODES.includes(m)) out.push(`mode "${m}" — known modes: ${MOUSE_MODES.join(', ')}`);
  if (cfg.rounds !== undefined && !(Number.isInteger(cfg.rounds) && cfg.rounds >= 4 && cfg.rounds <= 16)) out.push('rounds must be a whole number from 4 to 16');
  if (!out.length) {
    const s = makeSession(cfg, 1);
    for (const r of s) {
      if (!r.items.some((it) => it.id === r.target)) out.push(`round ${r.id}: its target is not on the play area`);
      for (const it of r.items) {
        if (it.x - r.size / 2 < 0 || it.x + r.size / 2 > 100 || it.y - r.size < 0 || it.y + r.size > 100) out.push(`round ${r.id}: ${it.id} pokes out of the play area`);
      }
      if (r.kind === 'right' && !r.choices.includes(r.choice)) out.push(`round ${r.id}: the named menu item is not on the menu`);
    }
  }
  return out;
}
