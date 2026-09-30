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
//
// Every card's answer is derived from the numbers it was dealt, and every wrong
// answer is answered by the name of its slip.

import { dec, decText, spanOf, roundTo } from './decimal.js';
import { shiftModel, questionLatex, diagnoseShift, diagnosePower, PLACE_LIMITS, MASS_UNITS } from './placeShift.js';
import { diagnoseRound, placeName } from './rounding.js';

export const QF_MODES = ['shift', 'power', 'mass', 'round'];
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

const MAKERS = { shift: shiftCard, power: powerCard, mass: massCard, round: roundCard };

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
        if (!card.mark(card.answer).ok) out.push(`seed ${seed}: card ${card.id} (${card.latex}) refuses its own answer ${card.answer}`);
      }
    }
  }
  return out;
}
