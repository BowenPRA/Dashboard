// src/utils/weighIt.js
//
// Weigh It (Year 7 Science 3.1, Gravity, Weight and Mass): weight from mass and
// mass from weight with the formula triangle — W on top, m × g underneath.
// Cover the letter you want; what is left says what to do. g is the strength
// of gravity where the object is: 10 N/kg on Earth, 1.6 on the Moon, 3.7 on
// Mars, 25 on Jupiter (the deck's PLANET_TABLE). Weight is a force, in newtons
// (N); mass is the amount of matter, in kilograms (kg), and it never changes
// from planet to planet.
//
// An item states the question only:
//   { id, level, kind: 'weight', m: '0.5', place: 'earth' }              W = m × g
//   { id, level, kind: 'mass',   W: '650', place: 'earth' }              m = W ÷ g
//   { id, level, kind: 'same',   m: '45',  from: 'earth', place: 'moon' } mass elsewhere: unchanged
//   { id, level, kind: 'two',    W: '600', from: 'earth', place: 'moon' } weight there: m first, then W
//   (+ context / contextFr — a story above the question that names the value)
// The steps, every operation, the answer, its unit and the slip behind a wrong
// answer are derived here; the validator runs the same model (checkWeighItems)
// and proves each item accepts its own answer and names each slip.
//
// English and French only (the Year 7 units from Science Unit 3): every
// message is { en, fr }.

import { readDec, decText, canon, sameValue, shift } from './decimal.js';
import { readProblem } from './rounding.js';

/** The strength of gravity, N/kg, as the deck's PLANET_TABLE gives it. */
export const PLACES = {
  earth: { g: '10', en: 'Earth', fr: 'la Terre', onEn: 'on Earth', onFr: 'sur Terre' },
  moon: { g: '1.6', en: 'the Moon', fr: 'la Lune', onEn: 'on the Moon', onFr: 'sur la Lune' },
  mars: { g: '3.7', en: 'Mars', fr: 'Mars', onEn: 'on Mars', onFr: 'sur Mars' },
  jupiter: { g: '25', en: 'Jupiter', fr: 'Jupiter', onEn: 'on Jupiter', onFr: 'sur Jupiter' },
  venus: { g: '8.9', en: 'Venus', fr: 'Vénus', onEn: 'on Venus', onFr: 'sur Vénus' },
  mercury: { g: '3.7', en: 'Mercury', fr: 'Mercure', onEn: 'on Mercury', onFr: 'sur Mercure' },
  saturn: { g: '10', en: 'Saturn', fr: 'Saturne', onEn: 'on Saturn', onFr: 'sur Saturne' },
  uranus: { g: '8.7', en: 'Uranus', fr: 'Uranus', onEn: 'on Uranus', onFr: 'sur Uranus' },
  neptune: { g: '11', en: 'Neptune', fr: 'Neptune', onEn: 'on Neptune', onFr: 'sur Neptune' },
};
/** The places on the g strip every step offers, in this order (plus the item's own). */
export const STRIP = ['earth', 'moon', 'mars', 'jupiter'];
export const KINDS = ['weight', 'mass', 'same', 'two'];
export const UNITS = ['N', 'kg'];
const MAX_DP = 2;            // a Year 7 answer has at most two decimal places
const MAX_VALUE = 1000000;   // and stays under a million

const TEN = 10n;
const pow10 = (k) => TEN ** BigInt(k);
const dec = (s) => {
  const r = readDec(String(s));
  if (!r.ok) throw new Error(`"${s}" is not a number (${r.code})`);
  return canon(r.v);
};
/** a × b, exactly. */
export const mul = (a, b) => canon({ n: a.n * b.n, dp: a.dp + b.dp });
/** a ÷ b, exactly, or null when it does not stop within six places. */
export function div(a, b) {
  if (b.n === 0n) return null;
  for (let k = 0; k <= 6; k += 1) {
    const num = a.n * pow10(b.dp + k);
    const den = b.n * pow10(a.dp);
    if (num % den === 0n) return canon({ n: num / den, dp: k });
  }
  return null;
}
const isZero = (v) => v.n === 0n;

/** A value as the student writes it: 12 000 with a space from five digits up. */
export function numText(v) {
  const s = decText(canon(v));
  const [whole, frac] = s.split('.');
  const w = whole.length >= 5 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : whole;
  return frac ? `${w}.${frac}` : w;
}
/** The same in KaTeX (a thin space between the thousands). */
export const numLatex = (v) => numText(v).replace(/ /g, '\\,');

const unitOf = (sym) => (sym === 'W' ? 'N' : 'kg');
export const placeOf = (id) => {
  const p = PLACES[id];
  if (!p) throw new Error(`place "${id}" — known places: ${Object.keys(PLACES).join('/')}`);
  return { id, ...p, gv: dec(p.g) };
};

/**
 * The worked question.
 *   kind        weight | mass | same | two
 *   steps       [{ find: 'W'|'m', given: 'W'|'m', value, place, g, op: '×'|'÷'|'=', result, unit }]
 *   result      the answer's value, `unit` its unit, `resultText` as written
 */
export function weighModel(item) {
  const kind = item?.kind;
  if (!KINDS.includes(kind)) throw new Error(`kind "${kind}" — ${KINDS.join('/')}`);
  const place = placeOf(item.place);
  const step = (find, value, at) => {
    const given = find === 'W' ? 'm' : 'W';
    const result = find === 'W' ? mul(value, at.gv) : div(value, at.gv);
    if (!result) throw new Error(`${numText(value)} ÷ ${at.g} does not stop — choose numbers that divide exactly`);
    return { find, given, value, place: at, g: at.gv, op: find === 'W' ? '×' : '÷', result, unit: unitOf(find), givenUnit: unitOf(given) };
  };
  let steps;
  if (kind === 'weight') {
    if (item.m == null) throw new Error('a weight item needs m (the mass, in kg)');
    steps = [step('W', dec(item.m), place)];
  } else if (kind === 'mass') {
    if (item.W == null) throw new Error('a mass item needs W (the weight, in N)');
    steps = [step('m', dec(item.W), place)];
  } else if (kind === 'same') {
    if (item.m == null) throw new Error('a same item needs m (the mass, in kg)');
    const from = placeOf(item.from || 'earth');
    if (from.id === place.id) throw new Error('a same item moves the object: from and place must differ');
    const m = dec(item.m);
    steps = [{ find: 'm', given: 'm', value: m, place, from, g: place.gv, op: '=', result: m, unit: 'kg', givenUnit: 'kg' }];
  } else {
    if (item.W == null) throw new Error('a two-step item needs W (the weight where it starts, in N)');
    const from = placeOf(item.from || 'earth');
    if (from.g === place.g) throw new Error(`a two-step item between two places with the same g (${from.g}) has nothing to work out`);
    const s1 = step('m', dec(item.W), from);
    steps = [s1, step('W', s1.result, place)];
  }
  const last = steps[steps.length - 1];
  for (const s of steps) {
    if (isZero(s.value)) throw new Error('the given value is 0');
    if (s.result.dp > MAX_DP) throw new Error(`${numText(s.result)} has more than ${MAX_DP} decimal places — choose friendlier numbers`);
    if (Number(decText(s.result)) >= MAX_VALUE) throw new Error(`${numText(s.result)} is too big for Year 7`);
  }
  return {
    item, kind, place, from: kind === 'same' || kind === 'two' ? placeOf(item.from || 'earth') : null,
    steps, result: last.result, unit: last.unit, resultText: numText(last.result),
  };
}

/** The g strip a setup step offers: the deck's four, plus the step's own place. */
export function stripFor(step) {
  const ids = [...STRIP];
  if (!ids.includes(step.place.id)) ids.push(step.place.id);
  return ids.map(placeOf);
}

/* ─────────────────────────────────────────────────────────── the working */

const opLatex = (op) => (op === '×' ? '\\times' : '\\div');
/** The three lines of one step for the book: the formula, the numbers, the answer. */
export function stepLatex(s) {
  if (s.op === '=') return [`m = ${numLatex(s.result)}\\text{ kg}`];
  const rhs = s.find === 'W' ? 'm \\times g' : 'W \\div g';
  return [
    `${s.find} = ${rhs}`,
    `${s.find} = ${numLatex(s.value)} ${opLatex(s.op)} ${numLatex(s.g)}`,
    `${s.find} = ${numLatex(s.result)}\\text{ ${s.unit}}`,
  ];
}
/** The sum as the calc stage shows it, before the answer box. */
export const sumLatex = (s) => `${s.find} = ${numLatex(s.value)} ${opLatex(s.op)} ${numLatex(s.g)} =`;

/* ─────────────────────────────────────────────────────────── the words */

export const SYM = {
  W: { en: 'weight', fr: 'poids' },
  m: { en: 'mass', fr: 'masse' },
};
const both = (en, fr) => ({ en, fr });
const gText = (p) => `${p.g} N/kg`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const elle = (sym) => (sym === 'W' ? 'le poids' : 'la masse');

/**
 * Stage 1, Cover: tap the letter you want to find on the triangle.
 * `{ ok, code }` — slips 'cover' (the other quantity) and 'cover-g' (g is given).
 */
export function diagnoseCover(step, letter) {
  if (letter === step.find) return { ok: true, code: 'ok' };
  const want = SYM[step.find];
  if (letter === 'g') {
    return {
      ok: false, code: 'cover-g',
      en: `g is not what you are looking for — it is the strength of gravity, and you can look it up. You want the ${want.en}: cover ${step.find}.`,
      fr: `g n’est pas ce que tu cherches — c’est l’intensité de la gravité, et tu peux la trouver dans le tableau. Tu cherches ${elle(step.find)} : cache ${step.find}.`,
    };
  }
  return {
    ok: false, code: 'cover',
    en: `Cover the letter you want to find. You want the ${want.en}, so cover ${step.find}. W is the weight, in newtons; m is the mass, in kilograms.`,
    fr: `Cache la lettre que tu cherches. Tu cherches ${elle(step.find)}, donc cache ${step.find}. W est le poids, en newtons ; m est la masse, en kilogrammes.`,
  };
}

/**
 * Stage 2, Set up: choose × or ÷ and the strength of gravity from the strip.
 * `choice` is `{ op, place }` (a place id). A place with the same g as the
 * right one is right. Slips: 'op' (multiplied when it should divide, or the
 * reverse), 'earthg' (Earth's 10 N/kg somewhere else), 'wrongg' (another
 * planet's g). `parts` says which half was right.
 */
export function diagnoseSetup(step, choice = {}) {
  if (!choice.op || !choice.place) {
    return {
      ok: false, code: 'incomplete', soft: true,
      en: 'Choose two things: × or ÷, and the strength of gravity g.',
      fr: 'Choisis deux choses : × ou ÷, et l’intensité de la gravité g.',
    };
  }
  const chosen = placeOf(choice.place);
  const opOk = choice.op === step.op;
  const gOk = sameValue(chosen.gv, step.g);
  const parts = { op: opOk, g: gOk };
  if (opOk && gOk) return { ok: true, code: 'ok', parts };
  if (!opOk) {
    const msg = step.find === 'W'
      ? both('Cover W, and m and g are left side by side on the bottom row: multiply. W = m × g.',
        'Cache W : il reste m et g côte à côte, en bas. On multiplie : W = m × g.')
      : both('Cover m, and W is left over g: divide. m = W ÷ g. Multiplying would give a mass bigger than the weight.',
        'Cache m : il reste W au-dessus de g. On divise : m = W ÷ g. En multipliant, la masse serait plus grande que le poids.');
    return { ok: false, code: 'op', parts, ...msg };
  }
  if (chosen.id === 'earth' || sameValue(chosen.gv, placeOf('earth').gv)) {
    return {
      ok: false, code: 'earthg', parts,
      en: `10 N/kg is the strength of gravity on Earth. This object is ${step.place.onEn}, so use the g for ${step.place.en}.`,
      fr: `10 N/kg, c’est l’intensité de la gravité sur Terre. Cet objet est ${step.place.onFr}, alors prends le g de ${step.place.fr}.`,
    };
  }
  return {
    ok: false, code: 'wrongg', parts,
    en: `${gText(chosen)} is the strength of gravity ${chosen.onEn}. This object is ${step.place.onEn} — find its row.`,
    fr: `${gText(chosen)}, c’est l’intensité de la gravité ${chosen.onFr}. Cet objet est ${step.place.onFr} — trouve sa ligne.`,
  };
}

/**
 * Stage for a `same` item, Decide: × g, ÷ g, or it stays the same ('=').
 * Slip 'changed' — the mass was changed by moving the object.
 */
export function diagnoseDecide(step, choice) {
  if (choice === '=') return { ok: true, code: 'ok' };
  return {
    ok: false, code: 'changed',
    en: `Mass is the amount of matter in the object. Does going to ${step.place.en} add any matter, or take any away? The strength of gravity changes the WEIGHT, not the mass.`,
    fr: `La masse, c’est la quantité de matière dans l’objet. Aller sur ${step.place.fr}, est-ce que ça ajoute ou enlève de la matière ? L’intensité de la gravité change le POIDS, pas la masse.`,
  };
}

/**
 * Read a typed answer: the number, and a unit if one was typed after it
 * ("750 N", "65kg"). `{ ok, v, unit }` or a readProblem.
 */
export function readAnswer(typed) {
  let s = String(typed ?? '').trim();
  let unit = null;
  const m = s.match(/^(.*?)\s*(n|newtons?|kg|kilo(?:gram(?:me)?s?)?)\.?$/i);
  if (m && m[1]) {
    s = m[1];
    unit = /^n/i.test(m[2]) ? 'N' : 'kg';
  }
  const r = readDec(s);
  if (!r.ok) return readProblem(r.code);
  return { ok: true, v: canon(r.v), unit };
}

/** x to one significant figure (650 → 700, 3.7 → 4, 0.24 → 0.2). */
const sig1 = (x) => {
  if (!x) return 0;
  const p = 10 ** Math.floor(Math.log10(Math.abs(x)));
  return Number((Math.round(x / p) * p).toPrecision(6));
};
const fmt = (x) => numText(dec(String(Number(x.toPrecision(6)))));
/**
 * About how big the answer is, for the decimal-point slip: both numbers to one
 * significant figure, so the estimate never hands over the exact answer.
 */
function estimate(step) {
  const v = sig1(Number(decText(step.value)));
  const g = sig1(Number(decText(step.g)));
  return { sum: `${fmt(v)} ${step.op} ${fmt(g)}`, text: fmt(sig1(step.op === '×' ? v * g : v / g)) };
}

/**
 * Stage 3, Calculate: type the number, choose N or kg. `unit` is the unit
 * chosen on the toggle (a unit typed after the number counts too).
 * Slips: 'unit' (kg written as N, or N as kg), 'nochange' (the number you
 * started with), 'op' (the other operation), 'earthg' (worked with 10 N/kg
 * somewhere else), 'point' (the right digits, the wrong size), 'changed' (a
 * `same` item's mass changed), 'value'. Unreadable input and a missing unit
 * come back `soft` — not a try.
 */
export function diagnoseCalc(step, typed, unit) {
  const r = readAnswer(typed);
  if (!r.ok) return r;
  const u = r.unit || unit || null;
  if (!u) {
    return {
      ok: false, code: 'nounit', soft: true,
      en: 'Choose the unit too: N for a weight, kg for a mass.',
      fr: 'Choisis aussi l’unité : N pour un poids, kg pour une masse.',
    };
  }
  const t = r.v;
  const want = SYM[step.find];
  if (sameValue(t, step.result)) {
    if (u === step.unit) return { ok: true, code: 'ok' };
    return step.find === 'W'
      ? {
        ok: false, code: 'unit',
        en: `${numText(t)} is the right number — but a weight is a force, and forces are measured in newtons: N, not kg.`,
        fr: `${numText(t)}, c’est le bon nombre — mais un poids est une force, et les forces se mesurent en newtons : N, pas kg.`,
      }
      : {
        ok: false, code: 'unit',
        en: `${numText(t)} is the right number — but a mass is measured in kilograms: kg, not N. Newtons are for forces, like weight.`,
        fr: `${numText(t)}, c’est le bon nombre — mais une masse se mesure en kilogrammes : kg, pas N. Les newtons, c’est pour les forces, comme le poids.`,
      };
  }
  if (step.op === '=') {
    const moved = [mul(step.value, step.g), div(step.value, step.g), step.from ? mul(step.value, step.from.gv) : null].filter(Boolean);
    if (moved.some((x) => sameValue(t, x))) {
      return {
        ok: false, code: 'changed',
        en: `That changed the mass. Mass is the amount of matter, and moving the object to ${step.place.en} does not change it. Only the weight changes.`,
        fr: `Là, tu as changé la masse. La masse, c’est la quantité de matière, et emmener l’objet sur ${step.place.fr} ne la change pas. Seul le poids change.`,
      };
    }
    return {
      ok: false, code: 'value',
      en: `Not quite. The mass ${step.from ? step.from.onEn : 'before'} was ${numText(step.value)} kg. What happens to it when the object moves?`,
      fr: `Pas tout à fait. La masse ${step.from ? step.from.onFr : 'au départ'} était de ${numText(step.value)} kg. Que devient-elle quand l’objet se déplace ?`,
    };
  }
  const opWord = step.op === '×' ? both('multiply by', 'multiplier par') : both('divide by', 'diviser par');
  if (sameValue(t, step.value)) {
    return {
      ok: false, code: 'nochange',
      en: `That is the number you started with. You still need to ${opWord.en} g = ${gText(step.place)}.`,
      fr: `C’est le nombre de départ. Il faut encore ${opWord.fr} g = ${gText(step.place)}.`,
    };
  }
  const swapped = step.op === '×' ? div(step.value, step.g) : mul(step.value, step.g);
  if (swapped && sameValue(t, swapped)) {
    return step.op === '×'
      ? {
        ok: false, code: 'op',
        en: `You divided. To find the ${want.en}, cover W: m × g is left, so multiply.`,
        fr: `Tu as divisé. Pour trouver ${elle(step.find)}, cache W : il reste m × g, donc on multiplie.`,
      }
      : {
        ok: false, code: 'op',
        en: `You multiplied. To find the ${want.en}, cover m: W over g is left, so divide.`,
        fr: `Tu as multiplié. Pour trouver ${elle(step.find)}, cache m : il reste W au-dessus de g, donc on divise.`,
      };
  }
  const earthG = placeOf('earth').gv;
  if (!sameValue(step.g, earthG)) {
    const withEarth = step.op === '×' ? mul(step.value, earthG) : div(step.value, earthG);
    if (withEarth && sameValue(t, withEarth)) {
      return {
        ok: false, code: 'earthg',
        en: `That used 10 N/kg, the Earth’s gravity. ${cap(step.place.onEn)} the strength of gravity is ${gText(step.place)}.`,
        fr: `Là, tu as pris 10 N/kg, la gravité de la Terre. ${cap(step.place.onFr)}, l’intensité de la gravité est de ${gText(step.place)}.`,
      };
    }
  }
  for (const k of [1, -1, 2, -2, 3, -3]) {
    if (sameValue(t, shift(step.result, k))) {
      if (sameValue(step.g, earthG)) {
        return {
          ok: false, code: 'point',
          en: `The digits are right but the size is not. × 10 moves every digit ONE place to the left; ÷ 10 moves every digit ONE place to the right. The point stays still.`,
          fr: `Les chiffres sont bons mais pas la taille. × 10 déplace chaque chiffre d’UNE colonne vers la gauche ; ÷ 10, d’UNE colonne vers la droite. Le point ne bouge pas.`,
        };
      }
      const est = estimate(step);
      return {
        ok: false, code: 'point',
        en: `The digits are right but the size is not — a decimal point or a zero has slipped. Estimate first: ${est.sum} is about ${est.text}.`,
        fr: `Les chiffres sont bons mais pas la taille — un point ou un zéro a glissé. Estime d’abord : ${est.sum}, c’est environ ${est.text}.`,
      };
    }
  }
  return {
    ok: false, code: 'value',
    en: `Not quite. Work out ${numText(step.value)} ${step.op} ${numText(step.g)} again, carefully.`,
    fr: `Pas tout à fait. Refais ${numText(step.value)} ${step.op} ${numText(step.g)}, avec soin.`,
  };
}

/** The stages one step goes through. */
export const stagesOf = (step) => (step.op === '=' ? ['decide', 'calc'] : ['cover', 'setup', 'calc']);

/* ─────────────────────────────────────────────────────────── the proof */

/**
 * The canonical inputs for every stage of a model, each with the code it must
 * get: the right answer ('ok') and one wrong answer for every slip that can
 * happen on that step. The validator runs them all (checkWeighItems), so an
 * item whose numbers make two slips look alike fails the build.
 */
export function slipCases(model) {
  const earthG = placeOf('earth').gv;
  const cases = [];
  model.steps.forEach((s, i) => {
    const add = (stage, input, code) => cases.push({ step: i, stage, input, code });
    const calc = (v, unit, code) => v && add('calc', [numText(v), unit], code);
    const other = s.unit === 'N' ? 'kg' : 'N';
    if (s.op === '=') {
      add('decide', '=', 'ok');
      add('decide', '×', 'changed');
      add('decide', '÷', 'changed');
      calc(s.result, 'kg', 'ok');
      calc(s.result, 'N', 'unit');
      calc(mul(s.value, s.g), 'kg', 'changed');
      return;
    }
    add('cover', s.find, 'ok');
    add('cover', s.find === 'W' ? 'm' : 'W', 'cover');
    add('cover', 'g', 'cover-g');
    const swappedOp = s.op === '×' ? '÷' : '×';
    add('setup', { op: s.op, place: s.place.id }, 'ok');
    add('setup', { op: swappedOp, place: s.place.id }, 'op');
    const offEarth = !sameValue(s.g, earthG);
    if (offEarth) add('setup', { op: s.op, place: 'earth' }, 'earthg');
    const elsewhere = stripFor(s).find((p) => !sameValue(p.gv, s.g) && !sameValue(p.gv, earthG));
    if (elsewhere) add('setup', { op: s.op, place: elsewhere.id }, 'wrongg');

    calc(s.result, s.unit, 'ok');
    calc(s.result, other, 'unit');
    calc(s.value, s.unit, 'nochange');
    const swapped = s.op === '×' ? div(s.value, s.g) : mul(s.value, s.g);
    if (swapped && swapped.dp <= 3) calc(swapped, s.unit, 'op');
    const withEarth = offEarth ? (s.op === '×' ? mul(s.value, earthG) : div(s.value, earthG)) : null;
    if (withEarth) calc(withEarth, s.unit, 'earthg');
    const taken = [s.value, swapped, withEarth].filter(Boolean);
    for (const k of [1, -1, 2, -2]) {
      const v = shift(s.result, k);
      if (taken.some((x) => sameValue(x, v))) continue;
      calc(v, s.unit, 'point');
      break;
    }
  });
  return cases;
}

/** Run one slip case against the engine; the code it gets. */
export function runCase(model, c) {
  const s = model.steps[c.step];
  if (c.stage === 'cover') return diagnoseCover(s, c.input).code;
  if (c.stage === 'setup') return diagnoseSetup(s, c.input).code;
  if (c.stage === 'decide') return diagnoseDecide(s, c.input).code;
  return diagnoseCalc(s, c.input[0], c.input[1]).code;
}

const hasValue = (text, v) => {
  const plain = decText(canon(v));
  return String(text || '').includes(numText(v)) || String(text || '').includes(plain);
};

/** Problems with a unit's `weighIt.items`, as strings. */
export function checkWeighItems(items, { bilingual = true } = {}) {
  const out = [];
  const ids = new Set();
  let lastLevel = 0;
  for (const [i, it] of (items || []).entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`${at}: level must be a whole number ≥ 1`);
    else if (it.level < lastLevel) out.push(`${at}: level ${it.level} comes after level ${lastLevel} — levels only climb`);
    else lastLevel = it.level;
    let m;
    try { m = weighModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    const given = m.steps[0].value;
    if (it.context) {
      if (bilingual && !it.contextFr) out.push(`${at}: context needs contextFr`);
      if (!hasValue(it.context, given)) out.push(`${at}: the context does not name the given value ${numText(given)}`);
      if (it.contextFr && !hasValue(it.contextFr, given)) out.push(`${at}: contextFr does not name the given value ${numText(given)} — the numbers must be the English ones`);
    }
    for (const c of slipCases(m)) {
      let got;
      try { got = runCase(m, c); } catch (e) { got = `error: ${e.message}`; }
      if (got !== c.code) {
        const shown = Array.isArray(c.input) ? c.input.join(' ') : typeof c.input === 'object' ? `${c.input.op} ${c.input.place}` : c.input;
        out.push(`${at}: step ${c.step + 1} ${c.stage} "${shown}" should be "${c.code}" but the engine says "${got}" — two slips look alike; change the numbers`);
      }
    }
  }
  return out;
}

/** Problems with a unit's whole `weighIt` config (title, levels, items). */
export function checkWeighConfig(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['weighIt must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleFr)) out.push(`needs a ${bilingual ? 'French ' : ''}title`);
  if (cfg.intro && bilingual && !cfg.introFr) out.push('intro needs introFr');
  const items = cfg.items || [];
  if (items.length < 6) out.push(`has ${items.length} items — at least 6`);
  for (const it of items) {
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || (bilingual && !lv.fr)) out.push(`item ${it.id}: level ${it.level} has no ${bilingual ? 'English and French ' : ''}name in levels`);
  }
  out.push(...checkWeighItems(items, { bilingual }));
  return out;
}
