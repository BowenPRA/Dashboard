// src/components/math/algebraTaskHelpers.js
//
// Presentation helpers shared by the Collect It (CollectTerms.jsx) and
// Algebra Pyramids (AlgebraPyramids.jsx) screens. Pure functions, no React —
// everything a student is MARKED on still comes from utils/algebra.js and
// utils/pyramid.js; this file only decides how the question is laid out
// (chips with their signs, baskets in a shuffled order, the regrouped line)
// and names the slips those utils do not: a chip in the wrong basket, and an
// answer that leaves a whole kind out.

import {
  monoOf, monoText, termText, tryPoly, rEq, diagnoseSolve,
} from '../../utils/algebra.js';
import { markSolution } from '../../utils/pyramid.js';
import { rngFrom } from '../../utils/labBench.js';

// ------------------------------------------------------------------ shared

/** A small stable string hash (for seeding a deterministic shuffle). */
export function hashString(s) {
  let h = 2166136261;
  for (const ch of String(s)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h || 1;
}

/** `list` shuffled by a seed derived from `key` — the same key, the same order. */
export function seededShuffle(list, key) {
  const rng = rngFrom(hashString(key));
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ------------------------------------------------------------------ collect it

/**
 * The chips of a collect item, index-aligned with model.written:
 * [{ index, key, neg, body, text }]. collectModel prints each term with its
 * letters in WRITTEN order (4ba stays 4ba on screen) while `key` is sorted, so
 * ab and ba still land in one basket.
 */
export const termsOf = (model) => model.written.map((w) => ({
  index: w.index,
  key: w.key,
  neg: w.coef[0] < 0,
  body: w.abs,
  text: w.text,
}));

/** The sign a chip shows: '' for a positive first term, '−' or '+' otherwise. */
export const chipSign = (term, first) => (term.neg ? '−' : first ? '' : '+');

/** Terms (by index) in a row, signs travelling, no leading +: 7x - 3x + 5y + y. */
export function rowLatex(terms, indexes) {
  return indexes.map((i, k) => {
    const t = terms[i];
    if (k === 0) return `${t.neg ? '-' : ''}${t.body}`;
    return ` ${t.neg ? '-' : '+'} ${t.body}`;
  }).join('');
}

/** Like terms next to each other, basket by basket, in written order inside a basket. */
export const regroupedIndexes = (model) => model.baskets.flatMap((b) => b.terms);

/** The kind colours (letters in order of appearance; numbers grey). Same family as the classroom deck. */
export const KIND_COLOURS = ['#0087a8', '#c026d3', '#4a8b23', '#c25e12'];
export const NUMBER_COLOUR = '#64748b';
export const kindColour = (model, basketIndex) => {
  const b = model.baskets[basketIndex];
  if (!b) return NUMBER_COLOUR;
  if (b.key === '1') return NUMBER_COLOUR;
  const letterIndex = model.baskets.filter((x) => x.key !== '1').indexOf(b);
  return KIND_COLOURS[letterIndex % KIND_COLOURS.length];
};

/**
 * The regrouped line with each kind in its colour: the sign BETWEEN two kinds
 * is written outside the colour, so KaTeX still spaces it as a binary sign.
 */
export function regroupedColourLatex(model, terms) {
  return model.baskets.map((b, bi) => {
    const colour = kindColour(model, bi);
    const [first, ...rest] = b.terms;
    const lead = terms[first];
    const inner = rowLatex(terms, [first, ...rest]).replace(/^-/, '');
    const body = `\\textcolor{${colour}}{${inner}}`;
    if (bi === 0) return `${lead.neg ? '-' : ''}${body}`;
    return ` ${lead.neg ? '-' : '+'} ${body}`;
  }).join('');
}

/** What a student would type for a basket total: "4x", "−2", "0". */
export const basketTotalText = (b) => (b.total[0] === 0 ? '0' : termText(b.total, b.key));

const VOWEL_SOUND = 'aefhilmnorsx';
const article = (word) => (VOWEL_SOUND.includes(String(word)[0]) ? 'an' : 'a');

/** "x × x", "a × b", "x × x × y" — what a kind means, letter by letter. */
export function kindMeaning(key) {
  const mono = monoOf(key);
  return Object.keys(mono).sort().flatMap((l) => Array(mono[l]).fill(l)).join(' × ');
}

/**
 * A chip sorted into the wrong basket, named from the two kinds:
 *   a number in a letter basket     "7 is a number, not an x term."
 *   a letter term in the numbers    "3x has a letter, so it is not a number."
 *   the same letters, other powers  "x² is not x: x² means x × x."
 *   different letters               "5y is a y term, not an x term."
 * ab and ba share a key, so they can never meet here.
 */
export function sortMistake(term, basketKey) {
  const tk = term.key;
  const t = term.text;
  const tm = monoText(tk);
  const bm = monoText(basketKey);
  if (tk === basketKey) return null;
  if (tk === '1') {
    return {
      en: `${t} is a number, not ${article(bm)} ${bm} term. It has no letter.`,
      vn: `${t} là một số, không phải hạng tử ${bm}. Nó không có chữ cái.`,
    };
  }
  if (basketKey === '1') {
    return {
      en: `${t} has a letter, so it is not a number. It is ${article(tm)} ${tm} term.`,
      vn: `${t} có chữ cái nên không phải là số. Nó là hạng tử ${tm}.`,
    };
  }
  const tl = Object.keys(monoOf(tk)).sort().join('');
  const bl = Object.keys(monoOf(basketKey)).sort().join('');
  const tMean = kindMeaning(tk);
  const bMean = kindMeaning(basketKey);
  const meanings = [tMean !== tm ? `${tm} means ${tMean}` : null, bMean !== bm ? `${bm} means ${bMean}` : null].filter(Boolean);
  const meaningsVn = [tMean !== tm ? `${tm} nghĩa là ${tMean}` : null, bMean !== bm ? `${bm} nghĩa là ${bMean}` : null].filter(Boolean);
  const shares = [...tl].some((l) => bl.includes(l));
  if (tl === bl || (shares && meanings.length)) {
    return {
      en: `${tm} is not ${bm}: ${meanings.join(', and ')}. ${t} is ${article(tm)} ${tm} term.`,
      vn: `${tm} khác ${bm}: ${meaningsVn.join(', còn ')}. ${t} là hạng tử ${tm}.`,
    };
  }
  return {
    en: `${t} is ${article(tm)} ${tm} term, not ${article(bm)} ${bm} term: the letters are different.`,
    vn: `${t} là hạng tử ${tm}, không phải hạng tử ${bm}: chữ cái khác nhau.`,
  };
}

/**
 * A Write answer that is right as far as it goes but leaves a kind out
 * ("4x" for 4x + 6y). diagnoseSimplify files this under "unlike" and prints
 * the whole answer; this names the missing kind instead. null when it does
 * not apply.
 */
export function missingKinds(model, typed) {
  const got = tryPoly(typed);
  if (!got) return null;
  const want = model.answer;
  const gotKeys = Object.keys(got);
  const wantKeys = Object.keys(want);
  if (!gotKeys.length || gotKeys.length >= wantKeys.length) return null;
  if (!gotKeys.every((k) => want[k] && rEq(got[k], want[k]))) return null;
  const missing = wantKeys.filter((k) => !got[k]);
  const en = missing.map((k) => (k === '1' ? 'the numbers' : `the ${monoText(k)} terms`)).join(' and ');
  const vn = missing.map((k) => (k === '1' ? 'các số' : `các hạng tử ${monoText(k)}`)).join(' và ');
  return {
    ok: false,
    code: 'missing-kind',
    en: `Not finished — ${en} are missing. Every basket goes into the answer.`,
    vn: `Chưa xong — còn thiếu ${vn}. Tổng của mọi rổ đều phải có trong đáp án.`,
  };
}

// ------------------------------------------------------------------ pyramids

/** A round's cells as rows, TOP row first (for drawing). */
export function pyramidRows(round) {
  const rows = [];
  for (let r = round.width - 1; r >= 0; r -= 1) {
    rows.push(round.cells.filter((c) => c.r === r).sort((a, b) => a.c - b.c));
  }
  return rows;
}

/** Can this block be worked out from the blocks known now (given or solved)? */
export function blockReachable(round, id, solved = {}) {
  const cell = round.cells.find((c) => c.id === id);
  if (!cell) return false;
  const known = (r, c) => {
    const k = round.cells.find((x) => x.r === r && x.c === c);
    return !!k && (k.given || !!solved[k.id]);
  };
  if (cell.r > 0 && known(cell.r - 1, cell.c) && known(cell.r - 1, cell.c + 1)) return true;
  if (known(cell.r + 1, cell.c - 1) && known(cell.r, cell.c - 1)) return true;
  if (known(cell.r + 1, cell.c) && known(cell.r, cell.c + 1)) return true;
  return false;
}

/** A block's value when the letter is a number (every pyramid block is linear in one letter). */
export function polyAt(poly, letter, value) {
  let total = 0;
  for (const [key, c] of Object.entries(poly)) {
    let v = c[0] / c[1];
    for (const [l, e] of Object.entries(monoOf(key))) v *= (l === letter ? value : Number.NaN) ** e;
    total += v;
  }
  return total;
}

/** A number as the screen prints it: −4, 12. */
export const numText = (n) => (n < 0 ? `−${-n}` : `${n}`);

/**
 * A typed solution for a solve round, with the slip named. markSolution says
 * only right or wrong; diagnoseSolve on the round's equation names "did the
 * operation instead of undoing it", "undid in the wrong order" and the check.
 */
export function solveFeedback(round, typed) {
  const mark = markSolution(round, typed);
  if (mark.ok) return { ok: true };
  if (mark.en) return mark;
  if (round.equation) {
    const d = diagnoseSolve(round.equation, typed);
    if (!d.ok) return d;
  }
  return { ok: false, code: 'wrong', en: 'Not quite — undo the operations one at a time.', vn: 'Chưa đúng — hãy làm ngược từng phép toán một.' };
}
