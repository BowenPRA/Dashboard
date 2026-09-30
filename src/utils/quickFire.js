// src/utils/quickFire.js
//
// Quick Fire — short generated cards for the Year 7 number units, fresh every
// attempt (like Pyramids). A unit declares only its modes and how many cards:
//
//   quickFire: { title, titleVn, modes: ['shift', 'power', 'mass'], rounds: 12 }
//
//   shift   7.2 × 10³ = ?, 520 ÷ 10⁴ = ?          (marked by placeShift.diagnoseShift)
//   power   6.1 × 10^? = 61000                      (diagnosePower)
//   mass    4 kg = ? mg                             (diagnoseShift on the conversion)
//   round   round 34.9892 to 1 decimal place        (rounding.diagnoseRound)
//   compare −8 □ −5: < or >                          (two buttons)
//   couldbe t < −5. Could t be −4?                   (Yes / No, with the reason)
//   integer p > 2.5: the smallest integer p could be (ineqLine.diagnoseInteger)
//
// A card with `choices` is answered with a button, once; the others are typed,
// with one more try after a named slip.
//
// Every card's answer is derived from the numbers it was dealt, and every wrong
// answer is answered by the name of its slip.

import { dec, decText, spanOf, roundTo } from './decimal.js';
import { shiftModel, questionLatex, diagnoseShift, diagnosePower, PLACE_LIMITS, MASS_UNITS } from './placeShift.js';
import { diagnoseRound, placeName } from './rounding.js';
import { parseIneq, diagnoseInteger, edgeWord, numText, numLatex } from './ineqLine.js';

export const QF_MODES = ['shift', 'power', 'mass', 'round', 'compare', 'couldbe', 'integer'];
export const QF_ROUNDS = [6, 20];

/** A small seeded RNG (mulberry32), so a seed replays the same cards. */
export function rngFrom(seed = Date.now()) {
  let a = (Number(seed) >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const intIn = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
const pickOne = (rng, list) => list[Math.floor(rng() * list.length)];

// Numbers a Year 7 question would use: whole, round hundreds, one or two
// decimals, and the small decimals whose placeholders are the point of 3.1.
const SHAPES = [
  (r) => String(intIn(r, 12, 98)),
  (r) => String(intIn(r, 2, 9) * 10 ** intIn(r, 1, 3)),
  (r) => `${intIn(r, 1, 9)}.${intIn(r, 1, 9)}`,
  (r) => `${intIn(r, 10, 99)}.${intIn(r, 1, 9)}`,
  (r) => `0.${intIn(r, 1, 9)}`,
  (r) => `0.0${intIn(r, 1, 9)}`,
  (r) => `${intIn(r, 1, 9)}.${intIn(r, 0, 9)}${intIn(r, 1, 9)}`,
  (r) => String(intIn(r, 101, 999)),
];
const fits = (v) => {
  const [hi, lo] = spanOf(v);
  return hi <= PLACE_LIMITS[0] && lo >= PLACE_LIMITS[1];
};

function shiftCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const item = { id, n: pickOne(rng, SHAPES)(rng), op: rng() < 0.5 ? '×' : '÷', p: intIn(rng, 1, 4) };
    const m = shiftModel(item);
    if (!fits(m.result) || m.cols.length > 9) continue;
    return {
      id, mode: 'shift', latex: `${questionLatex(m)} =`, answer: m.resultText,
      ask: { en: 'Write it as an ordinary number.', vn: 'Viết thành số thường.' },
      mark: (typed) => diagnoseShift(m, typed),
    };
  }
  return null;
}

function powerCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const op = rng() < 0.55 ? '×' : '÷';
    const base = { id, n: pickOne(rng, SHAPES)(rng), op, p: intIn(rng, 1, 5) };
    const probe = shiftModel(base);
    if (!fits(probe.result) || probe.cols.length > 9) continue;
    const m = shiftModel({ id, kind: 'power', n: base.n, op, result: probe.resultText });
    return {
      id, mode: 'power', latex: questionLatex(m), answer: String(m.power), power: true,
      ask: { en: 'What is the power?', vn: 'Số mũ là bao nhiêu?' },
      mark: (typed) => diagnosePower(m, typed),
    };
  }
  return null;
}

const MASS_AMOUNTS = ['4', '2.5', '0.35', '750', '3200', '0.8', '12', '6.4', '45', '0.075', '1.2', '250', '9', '0.06'];
function massCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const i = intIn(rng, 0, 3);
    const steps = pickOne(rng, [-2, -1, 1, 2]);
    const j = i - steps;
    if (j < 0 || j > 3) continue;
    const m = shiftModel({ id, kind: 'convert', n: pickOne(rng, MASS_AMOUNTS), from: MASS_UNITS[i], to: MASS_UNITS[j] });
    if (!fits(m.result) || m.cols.length > 10) continue;
    return {
      id, mode: 'mass', latex: questionLatex(m), answer: m.resultText, unit: MASS_UNITS[j],
      ask: { en: 'Change the unit. Every step on the ladder is 10³.', vn: 'Đổi đơn vị. Mỗi bậc trên thang là 10³.' },
      mark: (typed) => diagnoseShift(m, typed),
    };
  }
  return null;
}

function roundCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const intDigits = intIn(rng, 1, 3);
    const decDigits = intIn(rng, 3, 5);
    const whole = intDigits === 1 ? intIn(rng, 0, 9) : intIn(rng, 10 ** (intDigits - 1), 10 ** intDigits - 1);
    const frac = Array.from({ length: decDigits }, (_, k) => (k === decDigits - 1 ? intIn(rng, 1, 9) : intIn(rng, 0, 9)));
    const options = [1, 2, 3, 0];
    if (whole >= 10) options.push(-1);
    if (whole >= 100) options.push(-2);
    const places = pickOne(rng, options.filter((p) => p < decDigits));
    // One card in three is built to carry: the kept digit is a 9 and the next
    // digit rounds it up, so the answer ends in a zero that must be kept.
    if (places >= 1 && rng() < 0.34) {
      frac[places - 1] = 9;
      frac[places] = intIn(rng, 5, 9);
    }
    const n = `${whole}.${frac.join('')}`;
    const v = dec(n);
    const answer = roundTo(v, places);
    if (answer.n === 0n) continue;
    const name = placeName(places);
    return {
      id, mode: 'round', latex: n, answer: decText(answer),
      ask: { en: `Round to ${name.en}.`, vn: `Làm tròn đến ${name.vn}.` },
      mark: (typed) => diagnoseRound(n, places, typed),
    };
  }
  return null;
}

// ── Inequalities (Year 7 Maths 2.6) ─────────────────────────────────────────

const LETTERS = ['x', 'y', 't', 'n', 'p', 'k', 'm', 'w'];
// A number for an inequality: mostly negatives and small positives, sometimes a half.
const ineqNumber = (rng) => (rng() < 0.18 ? intIn(rng, -6, 6) + 0.5 : intIn(rng, -9, 9));

function compareCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const shape = rng();
    const a = shape < 0.45 ? -intIn(rng, 1, 12) : shape < 0.7 ? intIn(rng, -9, 9) : intIn(rng, -6, 6) + 0.5;
    const b = shape < 0.45 ? -intIn(rng, 1, 12) : intIn(rng, -9, 9);
    if (a === b) continue;
    const less = a < b;
    const [A, B] = [numText(a), numText(b)];
    const why = less
      ? { en: `${A} is further LEFT on the number line than ${B}, so ${A} is less than ${B}.`, vn: `${A} nằm xa hơn về bên TRÁI trên trục số so với ${B}, nên ${A} nhỏ hơn ${B}.` }
      : { en: `${A} is further RIGHT on the number line than ${B}, so ${A} is greater than ${B}.`, vn: `${A} nằm xa hơn về bên PHẢI trên trục số so với ${B}, nên ${A} lớn hơn ${B}.` };
    return {
      id, mode: 'compare', latex: `${numLatex(a)} \\;\\square\\; ${numLatex(b)}`, answer: less ? '<' : '>',
      ask: { en: 'Less than or greater than?', vn: 'Nhỏ hơn hay lớn hơn?' },
      choices: [
        { val: '<', en: '<  is less than', vn: '<  nhỏ hơn' },
        { val: '>', en: '>  is greater than', vn: '>  lớn hơn' },
      ],
      mark: (val) => (val === (less ? '<' : '>') ? { ok: true } : { ok: false, ...why }),
    };
  }
  return null;
}

function couldBeCard(rng, id) {
  const letter = pickOne(rng, LETTERS);
  const op = rng() < 0.5 ? '<' : '>';
  const n = ineqNumber(rng);
  const p = parseIneq(`${letter} ${op} ${n}`);
  const roll = rng();
  // the circle's own number, a near miss on the wrong side, or a number that works
  const v = roll < 0.3 && Number.isInteger(n) ? n
    : roll < 0.6 ? (p.greater ? Math.ceil(n) - intIn(rng, 1, 2) : Math.floor(n) + intIn(rng, 1, 2))
      : (p.greater ? p.edge + intIn(rng, 0, 40) : p.edge - intIn(rng, 0, 40));
  const yes = p.works(v);
  const [V, N] = [numText(v), numText(n)];
  const rel = p.greater ? { en: 'greater', vn: 'lớn hơn' } : { en: 'less', vn: 'nhỏ hơn' };
  const why = yes
    ? { en: `Yes: ${V} is ${rel.en} than ${N}.`, vn: `Có: ${V} ${rel.vn} ${N}.` }
    : v === n
      ? { en: `No: ${V} is the open circle. ${V} is not ${rel.en} than ${V}.`, vn: `Không: ${V} là vòng tròn rỗng. ${V} không ${rel.vn} ${V}.` }
      : { en: `No: ${V} is ${p.greater ? 'less' : 'greater'} than ${N} — it is on the other side of the circle.`, vn: `Không: ${V} ${p.greater ? 'nhỏ hơn' : 'lớn hơn'} ${N} — nó nằm ở phía bên kia vòng tròn.` };
  return {
    id, mode: 'couldbe', latex: p.latex, answer: yes ? 'Yes' : 'No', answerVn: yes ? 'Có' : 'Không',
    ask: { en: `Could ${letter} be ${V}?`, vn: `${letter} có thể là ${V} không?` },
    choices: [{ val: 'yes', en: 'Yes', vn: 'Có' }, { val: 'no', en: 'No', vn: 'Không' }],
    mark: (val) => ((val === 'yes') === yes ? { ok: true } : { ok: false, ...why }),
  };
}

function integerCard(rng, id) {
  const letter = pickOne(rng, LETTERS);
  const p = parseIneq(`${letter} ${rng() < 0.5 ? '<' : '>'} ${ineqNumber(rng)}`);
  const w = edgeWord(p);
  return {
    id, mode: 'integer', latex: p.latex, answer: numText(p.edge),
    ask: { en: `The ${w.en} integer ${letter} could be?`, vn: `Số nguyên ${w.vn} mà ${letter} có thể là?` },
    mark: (typed) => diagnoseInteger(p, typed),
  };
}

const MAKERS = {
  shift: shiftCard, power: powerCard, mass: massCard, round: roundCard,
  compare: compareCard, couldbe: couldBeCard, integer: integerCard,
};

/** A session of cards for a unit's `quickFire` config. */
export function makeQuickFire(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => MAKERS[m]);
  const n = Math.min(QF_ROUNDS[1], Math.max(QF_ROUNDS[0], config?.rounds || 12));
  if (!modes.length) return [];
  const order = Array.from({ length: n }, (_, i) => modes[i % modes.length]);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((mode, i) => MAKERS[mode](rng, `${mode}-${i + 1}`)).filter(Boolean);
}

/** Problems with a unit's `quickFire` config, as strings. */
export function checkQuickFireConfig(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['quickFire is not an object'];
  if (!cfg.title || (bilingual && !cfg.titleVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}title`);
  if (!Array.isArray(cfg.modes) || !cfg.modes.length) out.push(`needs modes — any of ${QF_MODES.join('/')}`);
  else for (const m of cfg.modes) if (!QF_MODES.includes(m)) out.push(`mode "${m}" — ${QF_MODES.join('/')}`);
  if (cfg.rounds != null && (!Number.isInteger(cfg.rounds) || cfg.rounds < QF_ROUNDS[0] || cfg.rounds > QF_ROUNDS[1])) {
    out.push(`rounds must be ${QF_ROUNDS[0]}–${QF_ROUNDS[1]}`);
  }
  if (!out.length) {
    // every card a few seeds deal must accept its own answer
    for (const seed of [1, 2, 3, 42, 2026]) {
      for (const card of makeQuickFire(cfg, seed)) {
        const own = card.choices ? card.choices.filter((c) => card.mark(c.val).ok).length === 1 : card.mark(card.answer).ok;
        if (!own) out.push(`seed ${seed}: card ${card.id} (${card.latex}) refuses its own answer ${card.answer}`);
      }
    }
  }
  return out;
}
