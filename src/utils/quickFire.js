// src/utils/quickFire.js
//
// Quick Fire — short generated cards for the Year 7 number units, fresh every
// attempt (like Pyramids). A unit declares only its modes and how many cards:
//
//   quickFire: { title, titleVn, titleFr, modes: ['shift', 'power', 'mass'], rounds: 12 }
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
//
// Every message is an `{ en, vn, fr }` table (French for the Year 7 tracks that
// offer it); the numbers in all three come from the same `${}` values.

import { dec, decText, spanOf, roundTo } from './decimal.js';
import { shiftModel, questionLatex, diagnoseShift, diagnosePower, PLACE_LIMITS, MASS_UNITS } from './placeShift.js';
import { diagnoseRound, placeName } from './rounding.js';
import { parseIneq, diagnoseInteger, edgeWord, numText, numLatex } from './ineqLine.js';

export const QF_MODES = [
  'shift', 'power', 'mass', 'round', 'compare', 'couldbe', 'integer',
  // Unit 4 (decimals) modes, one block per unit:
  // @@U04_1_QF_MODES@@

  // @@U04_2_QF_MODES@@

  // @@U04_3_QF_MODES@@
  'pointMul', 'pointFact',

  // @@U04_4_QF_MODES@@
  'decdivide', 'divcheck',

  // @@U04_5_QF_MODES@@
];
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
      ask: { en: 'Write it as an ordinary number.', vn: 'Viết thành số thường.', fr: 'Écris-le comme un nombre ordinaire.' },
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
      ask: { en: 'What is the power?', vn: 'Số mũ là bao nhiêu?', fr: "Quel est l'exposant ?" },
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
      ask: { en: 'Change the unit. Every step on the ladder is 10³.', vn: 'Đổi đơn vị. Mỗi bậc trên thang là 10³.', fr: "Change d'unité. Chaque marche de l'échelle vaut 10³." },
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
      ask: { en: `Round to ${name.en}.`, vn: `Làm tròn đến ${name.vn}.`, fr: `Arrondis ${name.frTo}.` },
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
      ? { en: `${A} is further LEFT on the number line than ${B}, so ${A} is less than ${B}.`, vn: `${A} nằm xa hơn về bên TRÁI trên trục số so với ${B}, nên ${A} nhỏ hơn ${B}.`, fr: `${A} est plus à GAUCHE que ${B} sur la droite graduée, donc ${A} est inférieur à ${B}.` }
      : { en: `${A} is further RIGHT on the number line than ${B}, so ${A} is greater than ${B}.`, vn: `${A} nằm xa hơn về bên PHẢI trên trục số so với ${B}, nên ${A} lớn hơn ${B}.`, fr: `${A} est plus à DROITE que ${B} sur la droite graduée, donc ${A} est supérieur à ${B}.` };
    return {
      id, mode: 'compare', latex: `${numLatex(a)} \\;\\square\\; ${numLatex(b)}`, answer: less ? '<' : '>',
      ask: { en: 'Less than or greater than?', vn: 'Nhỏ hơn hay lớn hơn?', fr: 'Inférieur ou supérieur ?' },
      choices: [
        { val: '<', en: '<  is less than', vn: '<  nhỏ hơn', fr: '<  est inférieur à' },
        { val: '>', en: '>  is greater than', vn: '>  lớn hơn', fr: '>  est supérieur à' },
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
  const rel = p.greater ? { en: 'greater', vn: 'lớn hơn', fr: 'supérieur à' } : { en: 'less', vn: 'nhỏ hơn', fr: 'inférieur à' };
  const why = yes
    ? { en: `Yes: ${V} is ${rel.en} than ${N}.`, vn: `Có: ${V} ${rel.vn} ${N}.`, fr: `Oui : ${V} est ${rel.fr} ${N}.` }
    : v === n
      ? { en: `No: ${V} is the open circle. ${V} is not ${rel.en} than ${V}.`, vn: `Không: ${V} là vòng tròn rỗng. ${V} không ${rel.vn} ${V}.`, fr: `Non : ${V} est le cercle vide. ${V} n'est pas ${rel.fr} ${V}.` }
      : { en: `No: ${V} is ${p.greater ? 'less' : 'greater'} than ${N} — it is on the other side of the circle.`, vn: `Không: ${V} ${p.greater ? 'nhỏ hơn' : 'lớn hơn'} ${N} — nó nằm ở phía bên kia vòng tròn.`, fr: `Non : ${V} est ${p.greater ? 'inférieur à' : 'supérieur à'} ${N} — il est de l'autre côté du cercle.` };
  return {
    id, mode: 'couldbe', latex: p.latex, answer: yes ? 'Yes' : 'No', answerVn: yes ? 'Có' : 'Không', answerFr: yes ? 'Oui' : 'Non',
    ask: { en: `Could ${letter} be ${V}?`, vn: `${letter} có thể là ${V} không?`, fr: `${letter} peut-il valoir ${V} ?` },
    choices: [{ val: 'yes', en: 'Yes', vn: 'Có', fr: 'Oui' }, { val: 'no', en: 'No', vn: 'Không', fr: 'Non' }],
    mark: (val) => ((val === 'yes') === yes ? { ok: true } : { ok: false, ...why }),
  };
}

function integerCard(rng, id) {
  const letter = pickOne(rng, LETTERS);
  const p = parseIneq(`${letter} ${rng() < 0.5 ? '<' : '>'} ${ineqNumber(rng)}`);
  const w = edgeWord(p);
  return {
    id, mode: 'integer', latex: p.latex, answer: numText(p.edge),
    ask: { en: `The ${w.en} integer ${letter} could be?`, vn: `Số nguyên ${w.vn} mà ${letter} có thể là?`, fr: `Quel est le ${w.fr} entier que ${letter} peut valoir ?` },
    mark: (typed) => diagnoseInteger(p, typed),
  };
}

// ── Unit 4 (decimals) cards — one block per unit ───────────────────────────
// @@U04_1_QF_CARDS@@

// @@U04_2_QF_CARDS@@

// @@U04_3_QF_CARDS@@
// 4.3 multiplying decimals (utils/pointBack.js marks them; an import may sit
// anywhere at the top level of a module, and this block has no line up there).
// pointMul   0.3 × 4 = ?     a decimal × a 1-digit number, in your head
// pointFact  3.6 × 24 = ?    given 36 × 24 = 864 — place the point by estimating
import { pointModel as pbModel, diagnoseProduct as pbMark, plain as pbPlain } from './pointBack.js';

const PB_SHAPES = [
  (r) => `0.${intIn(r, 1, 9)}`,
  (r) => `${intIn(r, 1, 4)}.${intIn(r, 1, 9)}`,
  (r) => `0.0${intIn(r, 1, 9)}`,
  (r) => `0.${pickOne(r, ['25', '15', '12', '35', '45', '05'])}`,
];

function pointMulCard(rng, id) {
  for (let tries = 0; tries < 60; tries += 1) {
    const d = pickOne(rng, PB_SHAPES)(rng);
    const w = intIn(rng, 2, 9);
    const m = pbModel({ id, a: d, b: String(w) });
    if (m.product > 120n) continue;
    const first = rng() < 0.25;
    return {
      id, mode: 'pointMul', latex: `${first ? `${w} \\times ${d}` : `${d} \\times ${w}`} =`, answer: pbPlain(m.sum.exact),
      ask: { en: 'Work it out in your head.', fr: 'Calcule de tête.' },
      mark: (typed) => pbMark(m, typed),
    };
  }
  return null;
}

function pointFactCard(rng, id) {
  for (let tries = 0; tries < 60; tries += 1) {
    const top = intIn(rng, 12, 98);
    const w = rng() < 0.3 ? intIn(rng, 3, 9) : intIn(rng, 11, 39);
    if (top % 10 === 0 || w % 10 === 0) continue;
    const s = String(top);
    const d = rng() < 0.6 ? `${s[0]}.${s[1]}` : `0.${s}`;
    const m = pbModel({ id, a: d, b: String(w) });
    return {
      id, mode: 'pointFact', latex: `${d} \\times ${w} =`, answer: pbPlain(m.sum.exact),
      ask: { en: `You know that ${top} × ${w} = ${m.pText}.`, fr: `Tu sais que ${top} × ${w} = ${m.pText}.` },
      mark: (typed) => pbMark(m, typed),
    };
  }
  return null;
}

// @@U04_4_QF_CARDS@@
// 4.4 Dividing decimals (U04_4). Two modes, English / French:
//   decdivide  8.24 ÷ 4 = ?          a decimal ÷ a 1-digit number. Slips named:
//              a lost 0 (2.6 for 2.06), the point not straight up (20.6,
//              0.206); any other wrong answer is answered by the inverse —
//              "2.5 × 4 = 10, not 8.24".
//   divcheck   9.18 ÷ 3 = 3.6. Right or wrong?   two buttons; the verdict is
//              the inverse calculation, claim × 3.
// The quotient is dealt first and the dividend built from it, so every card
// divides exactly. Helpers are prefixed div44 (other units add blocks here).
const DIV44_QUOTIENTS = [
  (r) => `${intIn(r, 1, 9)}.${intIn(r, 1, 9)}`,                   // 1.4
  (r) => `${intIn(r, 1, 9)}.0${intIn(r, 1, 9)}`,                  // 2.06 — a 0 in the answer
  (r) => `0.${intIn(r, 1, 9)}${intIn(r, 1, 9)}`,                  // 0.38 — 0 before the point
  (r) => `${intIn(r, 1, 4)}.${intIn(r, 1, 9)}${intIn(r, 1, 9)}`,  // 2.13
  (r) => `0.0${intIn(r, 1, 9)}`,                                  // 0.06
];
const div44Canon = (v) => {
  let { n, dp } = v;
  while (dp > 0 && n % 10n === 0n) { n /= 10n; dp -= 1; }
  return { n, dp };
};
const div44Same = (a, b) => { const x = div44Canon(a); const y = div44Canon(b); return x.n === y.n && x.dp === y.dp; };
const div44Times = (v, d) => div44Canon({ n: v.n * BigInt(d), dp: v.dp });
/** Deal one division: quotient text q, divisor d, dividend text D. */
function div44Deal(rng) {
  const q = pickOne(rng, DIV44_QUOTIENTS)(rng);
  const d = intIn(rng, 2, 9);
  const qv = dec(q);
  return { q: decText(div44Canon(qv)), qv, d, D: decText(div44Times(qv, d)) };
}
/** The quotient with a placeholder 0 left out (2.06 → 2.6, 0.06 → 0.6). */
function div44NoZero(q) {
  const out = [];
  for (let i = 1; i < q.length; i += 1) {
    if (q[i] !== '0') continue;
    const s = q.slice(0, i) + q.slice(i + 1);
    if (!s.endsWith('.') && s !== q && !div44Same(dec(s), dec(q))) out.push(s);
  }
  return out;
}

function div44DivideCard(rng, id) {
  const { q, qv, d, D } = div44Deal(rng);
  const mark = (typed) => {
    const s = String(typed ?? '').trim().replace(/\s+/g, '');
    if (!s) return { soft: true, en: 'Type the answer first.', fr: 'Tape d’abord la réponse.' };
    if (s.includes(',')) return { soft: true, en: 'Write the point as a dot: 2.06, not 2,06.', fr: 'Écris le point avec un point : 2.06, pas 2,06.' };
    let v;
    try { v = dec(s); } catch { return { soft: true, en: 'Type a number, like 2.06.', fr: 'Tape un nombre, comme 2.06.' }; }
    if (div44Same(v, qv)) return { ok: true };
    const T = decText(div44Canon(v));
    const P = decText(div44Times(v, d));
    if (div44NoZero(q).some((z) => div44Same(dec(z), v))) {
      return {
        ok: false,
        en: `Check: ${T} × ${d} = ${P}, not ${D}. A digit was too small to divide — write 0 in that place.`,
        fr: `Vérifie : ${T} × ${d} = ${P}, pas ${D}. Un chiffre était trop petit pour être divisé — écris 0 à cette place.`,
      };
    }
    if (div44Canon(v).n === div44Canon(qv).n) {
      return {
        ok: false,
        en: `The right digits, but the point is in the wrong place. It goes straight up from the point in ${D}. Check: ${T} × ${d} = ${P}.`,
        fr: `Les bons chiffres, mais le point est mal placé. Il monte tout droit depuis le point de ${D}. Vérifie : ${T} × ${d} = ${P}.`,
      };
    }
    return {
      ok: false,
      en: `Check it with the inverse: ${T} × ${d} = ${P}, not ${D}.`,
      fr: `Vérifie avec le calcul inverse : ${T} × ${d} = ${P}, pas ${D}.`,
    };
  };
  return {
    id, mode: 'decdivide', latex: `${D} \\div ${d} =`, answer: q,
    ask: { en: 'Work it out. The point goes straight up.', fr: 'Calcule. Le point monte tout droit.' },
    mark,
  };
}

function div44CheckCard(rng, id) {
  const { q, qv, d, D } = div44Deal(rng);
  // The claim: right a little under half the time; otherwise a lost 0, or the
  // point one place out.
  let claim = q;
  if (rng() >= 0.45) {
    const lost = div44NoZero(q);
    if (lost.length && rng() < 0.6) claim = pickOne(rng, lost);
    else {
      const up = rng() < 0.5 && !q.startsWith('0.0');
      claim = decText(div44Canon(up ? div44Times(qv, 10) : { n: qv.n, dp: qv.dp + 1 }));
    }
  }
  const cv = dec(claim);
  const right = div44Same(cv, qv);
  const P = decText(div44Times(cv, d));
  const why = right
    ? { en: `${claim} × ${d} = ${D} — back to ${D}, so it is right.`, fr: `${claim} × ${d} = ${D} — on retrouve ${D}, donc c’est juste.` }
    : { en: `${claim} × ${d} = ${P}, not ${D} — so it is wrong. ${D} ÷ ${d} = ${q}.`, fr: `${claim} × ${d} = ${P}, pas ${D} — donc c’est faux. ${D} ÷ ${d} = ${q}.` };
  return {
    id, mode: 'divcheck', latex: `${D} \\div ${d} = ${claim}`,
    answer: right ? 'Right' : 'Wrong', answerFr: right ? 'Juste' : 'Faux',
    ask: { en: 'Check it with the inverse. Is it right?', fr: 'Vérifie avec le calcul inverse. Est-ce juste ?' },
    choices: [{ val: 'right', en: 'Right', fr: 'Juste' }, { val: 'wrong', en: 'Wrong', fr: 'Faux' }],
    mark: (val) => ((val === 'right') === right ? { ok: true } : { ok: false, ...why }),
  };
}

// @@U04_5_QF_CARDS@@

const MAKERS = {
  shift: shiftCard, power: powerCard, mass: massCard, round: roundCard,
  compare: compareCard, couldbe: couldBeCard, integer: integerCard,
  // @@U04_1_QF_MAKERS@@

  // @@U04_2_QF_MAKERS@@

  // @@U04_3_QF_MAKERS@@
  pointMul: pointMulCard, pointFact: pointFactCard,

  // @@U04_4_QF_MAKERS@@
  decdivide: div44DivideCard, divcheck: div44CheckCard,

  // @@U04_5_QF_MAKERS@@
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
