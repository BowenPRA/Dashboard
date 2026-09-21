// src/utils/typeGym.js
//
// Typing Gym (TYPE_GYM, p26) — the pure parts. `TypeGym.jsx` renders; this file
// draws a session's lines from a seed, marks each keystroke, and derives speed,
// accuracy and the score. Nothing is stored but the line: every number the
// student sees is derived from their keystrokes, and the validator checks the
// config because there is no answer key to check.
//
// Why a typing task on a computer-skills track (docs/digital-skills-course.md
// §4.3): hunt-and-peck is the single biggest tax on everything else in the
// course. Every later unit asks the student to type — a password, a file name,
// an address, an email — and a child looking for each letter is slow at all of
// them, and loses the thread while looking down.
//
// HOW IT IS TAUGHT, which is also how it is marked:
//   · STOP ON ERROR. The caret only moves on the right key; a wrong key flashes
//     and counts. There is no Backspace to fight with and no run of red text to
//     undo — the next key is always exactly one key.
//   · ACCURACY FIRST. The score is 70% accuracy and 30% speed, both against the
//     unit's own target, which climbs across the course.
//   · NEVER THE SAME TWICE. The lines are drawn fresh from a seed each session
//     (the Y7 engagement rule), from the unit's own words, file names and
//     addresses — so the typing practises the vocabulary as well.
//
// Config (unit data `typeGym`), documented in docs/primary-tech/UPGRADE-PLAN.md §3.2:
//   { title, titleVn, modes: ['home'|'words'|'sentences'|'addresses'|'names'],
//     rounds?: 6, words?, sentences?, addresses?, names?,
//     target: { wpm, accuracy } }

export const TYPE_MODES = ['home', 'words', 'sentences', 'addresses', 'names'];

/** The unit pool each mode draws from. `home` needs none — it is generated. */
const POOL = { words: 'words', sentences: 'sentences', addresses: 'addresses', names: 'names' };

/** What a keyboard can type without a special key: letters, digits, space and a little punctuation. */
export const TYPEABLE = /^[A-Za-z0-9 .,\-/:;'!?]+$/;

/** Longest line a round will ask for — about a line of a primary exercise book. */
export const MAX_LINE = 40;

export const MODE_LABEL = {
  home: { en: 'The home row', vn: 'Hàng phím cơ sở' },
  words: { en: 'Words from this unit', vn: 'Từ trong bài' },
  sentences: { en: 'A sentence', vn: 'Một câu' },
  addresses: { en: 'Web addresses', vn: 'Địa chỉ trang web' },
  names: { en: 'File names', vn: 'Tên tệp' },
};

/** Key drills, easiest first: index fingers, then middle, ring, little, then the reaches. */
const HOME_DRILLS = [
  'fff jjj fjf jfj',
  'ddd kkk dkd kdk',
  'fj dk fj dk jf kd',
  'sss lll sls lsl',
  'aaa ;;; a;a ;a;',
  'asdf jkl; asdf jkl;',
  'ggg hhh fgf jhj',
];

/** Real words made only of home-row letters. */
const HOME_WORDS = [
  'dad', 'sad', 'had', 'has', 'lad', 'all', 'add', 'ask', 'fall', 'hall',
  'half', 'glad', 'flag', 'dash', 'flash', 'salad', 'flask', 'shall', 'gas', 'ash',
];

/** mulberry32 — small, fast, and the same sequence for the same seed everywhere. */
export function rngOf(seed) {
  let a = (Number(seed) || 0) >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(list, rand) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Words joined with a separator until the next one would pass MAX_LINE. */
function fill(items, sep, min = 1) {
  const out = [];
  for (const it of items) {
    const next = [...out, it].join(sep);
    if (out.length >= min && next.length > MAX_LINE) break;
    out.push(it);
    if (next.length >= MAX_LINE - 4) break;
  }
  return out.join(sep);
}

/** One line for one round. `k` is how many home rounds came before this one. */
function lineFor(mode, rand, cfg, k) {
  if (mode === 'home') {
    // Even home rounds are key drills, odd ones are real words — and the drills
    // open up one step at a time, so the first round is always index fingers.
    if (k % 2 === 0) {
      const reach = Math.min(HOME_DRILLS.length, 1 + k);
      const pick = HOME_DRILLS[Math.floor(rand() * reach)];
      return k === 0 ? HOME_DRILLS[0] : pick;
    }
    return fill(shuffle(HOME_WORDS, rand), ' ', 4);
  }
  const pool = shuffle(cfg[POOL[mode]] || [], rand);
  if (!pool.length) return '';
  if (mode === 'words') return fill(pool, ' ', 3);
  if (mode === 'names') return fill(pool, ', ', 1);
  // A sentence or an address is typed whole; a short one gets a partner.
  const [first, second] = pool;
  if (second && first.length < 20 && `${first} ${second}`.length <= MAX_LINE) return `${first} ${second}`;
  return first;
}

/**
 * A whole session: `rounds` lines, cycling through the unit's modes, never the
 * same line twice. Same config + same seed = same session, so a problem a
 * student reports can be reproduced.
 */
export function makeSession(cfg, seed = Date.now()) {
  const rand = rngOf(seed);
  const modes = (cfg?.modes || []).filter((m) => TYPE_MODES.includes(m));
  const rounds = Math.max(3, Math.min(12, Number(cfg?.rounds) || 6));
  const out = [];
  const used = new Set();
  let homeSoFar = 0;
  for (let i = 0; i < rounds && modes.length; i += 1) {
    const mode = modes[i % modes.length];
    let text = '';
    for (let tries = 0; tries < 6; tries += 1) {
      text = lineFor(mode, rand, cfg, homeSoFar);
      if (text && !used.has(text)) break;
    }
    if (mode === 'home') homeSoFar += 1;
    if (!text) continue;
    used.add(text);
    out.push({ id: `r${out.length + 1}`, mode, text });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Marking keystrokes
 * ------------------------------------------------------------------ */

/**
 * What a soft keyboard sends, made comparable to what the line asks for. iPads
 * turn ' into ’ ("smart punctuation") and some keyboards send a non-breaking
 * space; neither is the student's mistake.
 */
export function normalizeKey(ch) {
  if (ch === '\u2019' || ch === '\u2018' || ch === '\u02BC') return "'";
  if (ch === '\u00A0') return ' ';
  return ch;
}

/** Errors counted at one position, at most. A child who bashes a key gets told, not buried. */
const MAX_ERRORS_PER_KEY = 3;

export function newLine(text) {
  return { text, pos: 0, errors: 0, errAt: {}, started: null, last: null, finished: null, wrong: null, strokes: 0 };
}

/** Mark one keystroke. Stop-on-error: a wrong key never moves the caret. */
export function press(line, key, now) {
  if (!line || line.finished !== null) return line;
  const ch = normalizeKey(key);
  const started = line.started ?? now;
  const want = line.text[line.pos];
  if (ch === want) {
    const pos = line.pos + 1;
    return {
      ...line,
      pos,
      started,
      last: now,
      wrong: null,
      strokes: line.strokes + 1,
      finished: pos >= line.text.length ? now : null,
    };
  }
  const already = line.errAt[line.pos] || 0;
  const counts = already < MAX_ERRORS_PER_KEY;
  return {
    ...line,
    started,
    last: now,
    wrong: ch,
    strokes: line.strokes + 1,
    errors: line.errors + (counts ? 1 : 0),
    errAt: { ...line.errAt, [line.pos]: already + 1 },
  };
}

/**
 * Speed and accuracy of one line — finished, or so far (measured to the last
 * keystroke, so a screen can show it live without reading the clock in render).
 */
export function statsOf(line, now = null) {
  const chars = line.pos;
  const end = line.finished ?? now ?? line.last;
  const ms = line.started != null && end != null ? Math.max(0, end - line.started) : 0;
  const accuracy = chars + line.errors ? chars / (chars + line.errors) : 1;
  // Under a second there is nothing to measure; report 0 rather than infinity.
  const wpm = ms >= 1000 ? (chars / 5) / (ms / 60000) : 0;
  return { chars, errors: line.errors, ms, accuracy, wpm };
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));

/**
 * The session's result, out of 10 (the task's nativeMax): 70% accuracy and 30%
 * speed, each measured against the unit's target. Accuracy is scored from 50%
 * up — below half right, a line was not really typed.
 */
export function scoreOf(stats, target = { wpm: 8, accuracy: 0.9 }) {
  const chars = stats.reduce((s, r) => s + r.chars, 0);
  const errors = stats.reduce((s, r) => s + r.errors, 0);
  const ms = stats.reduce((s, r) => s + r.ms, 0);
  const accuracy = chars + errors ? chars / (chars + errors) : 0;
  const wpm = ms >= 1000 ? (chars / 5) / (ms / 60000) : 0;
  const accGoal = Math.min(0.99, Math.max(0.55, target?.accuracy || 0.9));
  const accPart = clamp01((accuracy - 0.5) / (accGoal - 0.5));
  const speedPart = clamp01(wpm / Math.max(1, target?.wpm || 8));
  return {
    accuracy,
    wpm,
    score: chars ? Math.round(10 * (0.7 * accPart + 0.3 * speedPart)) : 0,
    metAccuracy: accuracy >= accGoal,
    metSpeed: wpm >= (target?.wpm || 8),
  };
}

/* ------------------------------------------------------------------ *
 * The keyboard, for the on-screen picture
 * ------------------------------------------------------------------ */

/** Which finger owns a key, for colouring the keyboard: L4..L1 (little..index), R1..R4, T (thumbs). */
export const FINGER = {};
[
  ['L4', '1qaz'], ['L3', '2wsx'], ['L2', '3edc'], ['L1', '45rtfgvb'],
  ['R1', '67yuhjnm'], ['R2', '8ik,'], ['R3', '9ol.'], ['R4', "0p;/'-"],
].forEach(([f, keys]) => { for (const k of keys) FINGER[k] = f; });
FINGER[' '] = 'T';

/** Characters that need Shift on a UK/US keyboard. */
const SHIFTED = { '!': '1', '?': '/', ':': ';' };

/** The key to light up for a character, and whether Shift goes with it (and which one). */
export function keyFor(ch) {
  if (ch == null) return null;
  if (/[A-Z]/.test(ch)) {
    const base = ch.toLowerCase();
    return { key: base, shift: FINGER[base]?.startsWith('L') ? 'right' : 'left' };
  }
  if (SHIFTED[ch]) {
    const base = SHIFTED[ch];
    return { key: base, shift: FINGER[base]?.startsWith('L') ? 'right' : 'left' };
  }
  return { key: ch, shift: null };
}

/* ------------------------------------------------------------------ *
 * The validator
 * ------------------------------------------------------------------ */

export function checkTypeGym(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['typeGym must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}title`);
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('needs at least one mode');
  for (const m of modes) if (!TYPE_MODES.includes(m)) out.push(`mode "${m}" — known modes: ${TYPE_MODES.join(', ')}`);
  for (const m of modes) {
    const key = POOL[m];
    if (!key) continue;
    const pool = cfg[key];
    if (!Array.isArray(pool) || !pool.length) { out.push(`mode "${m}" needs a non-empty \`${key}\` list`); continue; }
    if (m === 'words' && pool.length < 4) out.push('`words` needs at least 4 words, or every line is the same');
    for (const s of pool) {
      if (typeof s !== 'string' || !s.trim()) { out.push(`${key}: an entry is empty`); continue; }
      if (s !== s.trim() || /\s{2}/.test(s)) out.push(`${key}: "${s}" has extra spaces — a stray space is a key the student cannot see`);
      if (!TYPEABLE.test(s)) out.push(`${key}: "${s}" has a character the keyboard cannot type plainly (letters, digits, space and . , - / : ; ' ! ? only — watch for curly quotes)`);
      if (s.length > MAX_LINE) out.push(`${key}: "${s}" is ${s.length} characters — keep lines to ${MAX_LINE}`);
    }
  }
  if (cfg.rounds !== undefined && !(Number.isInteger(cfg.rounds) && cfg.rounds >= 3 && cfg.rounds <= 12)) out.push('rounds must be a whole number from 3 to 12');
  const t = cfg.target;
  if (!t || !(t.wpm > 0 && t.wpm <= 60)) out.push('target.wpm must be between 1 and 60');
  if (!t || !(t.accuracy >= 0.55 && t.accuracy <= 0.99)) out.push('target.accuracy must be a fraction from 0.55 to 0.99');
  // Every mode has to be able to draw a line, or a round silently disappears.
  if (!out.length) {
    const s = makeSession(cfg, 1);
    const want = Math.max(3, Math.min(12, Number(cfg.rounds) || 6));
    if (s.length !== want) out.push(`a session drew ${s.length} of ${want} lines — a pool is too small to fill its rounds without repeating`);
  }
  return out;
}
