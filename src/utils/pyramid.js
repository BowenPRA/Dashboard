// src/utils/pyramid.js
//
// Algebra Pyramids — the puzzle from the Year 7 workbook (2.3), made
// generative so a second attempt is practice, not memory. Each block is the
// two blocks under it, added. Four modes, one per skill:
//
//   up        bottom row given; build every block above (collecting like terms)
//   down      three blocks given anywhere; work out the rest (add AND subtract)
//   brackets  the bottom blocks hold brackets; expand, then collect (2.4)
//   solve     the top is a NUMBER; build the top expression, then solve the
//             equation "top expression = number" (2.5)
//
// A round is generated from a seeded RNG and every block's value is derived
// with utils/algebra.js; the screen marks a typed block by value AND form
// (it must be simplified), and the validator generates dozens of rounds per
// mode to prove each one is solvable.

import {
  tryPoly, polyAdd, polySub, polyEq, polyLatex, polyText, formOf, formMessage, isConstant, constOf,
  answerOrder, equationModel, expandModel, diagnoseSolve,
} from './algebra.js';
import { rngFrom } from './labBench.js';

export const PYRAMID_MODES = ['up', 'down', 'brackets', 'solve'];

const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const int = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

/** Cell ids: row 0 is the bottom. */
export const cellId = (r, c) => `${r}-${c}`;

const coefSrc = (n, key) => (key === '1' ? `${n}` : `${n === 1 ? '' : n}${key}`);

function build(bottomSrc) {
  const width = bottomSrc.length;
  const rows = [bottomSrc.map((src) => {
    const p = tryPoly(src);
    if (!p) throw new Error(`pyramid block "${src}" does not parse`);
    return p;
  })];
  for (let r = 1; r < width; r += 1) {
    rows.push(rows[r - 1].slice(0, -1).map((p, c) => polyAdd(p, rows[r - 1][c + 1])));
  }
  return rows;
}

function letterOrder(bottomSrc) {
  const seen = [];
  for (const s of bottomSrc) for (const ch of s.replace(/[^a-z]/g, '')) if (!seen.includes(ch)) seen.push(ch);
  return seen;
}

function cellsOf(rows, bottomSrc, blanks, order) {
  const out = [];
  rows.forEach((row, r) => row.forEach((p, c) => {
    const id = cellId(r, c);
    const keys = answerOrder(p, order);
    out.push({
      id, r, c,
      poly: p,
      latex: r === 0 && bottomSrc ? null : polyLatex(p, keys),
      text: polyText(p, keys),
      given: !blanks.includes(id),
    });
  }));
  return out;
}

// ------------------------------------------------------------------ generators

function genUp(rng) {
  const width = rng() < 0.25 ? 4 : 3;
  const [l1, l2] = pick(rng, [['x', 'y'], ['a', 'b'], ['m', 'n'], ['p', 'q']]);
  const shape = pick(rng, ['one', 'two', 'number']);
  const kinds = shape === 'one' ? [l1] : shape === 'two' ? [l1, l2] : [l1, '1'];
  const bottom = [];
  for (let i = 0; i < width; i += 1) {
    const parts = kinds.length === 1 || rng() < 0.45 ? [pick(rng, kinds)] : [...kinds];
    bottom.push(parts.map((k) => coefSrc(int(rng, 1, width === 4 ? 4 : 6), k)).join(' + '));
  }
  return { bottom, blanks: null };
}

const DOWN_PATTERNS = [
  ['2-0', '1-0', '0-0'],
  ['2-0', '1-1', '0-2'],
  ['0-0', '0-1', '2-0'],
  ['0-1', '0-2', '2-0'],
  ['1-0', '1-1', '0-1'],
];

function genDown(rng) {
  const l = pick(rng, ['x', 'y', 'a', 'k', 't']);
  const withNumber = rng() < 0.4;
  const bottom = [0, 1, 2].map(() => {
    const t = coefSrc(int(rng, 1, 7), l);
    return withNumber && rng() < 0.6 ? `${t} + ${int(rng, 1, 9)}` : t;
  });
  const givens = pick(rng, DOWN_PATTERNS);
  const all = ['0-0', '0-1', '0-2', '1-0', '1-1', '2-0'];
  return { bottom, blanks: all.filter((id) => !givens.includes(id)) };
}

function genBrackets(rng) {
  const l = pick(rng, ['x', 'y', 'a', 'n']);
  const bracket = () => {
    const k = int(rng, 2, 5);
    const a = int(rng, 1, 3);
    const b = int(rng, 1, 6);
    const minus = rng() < 0.4;
    return `${k}(${coefSrc(a, l)} ${minus ? '-' : '+'} ${b})`;
  };
  const simple = () => (rng() < 0.5 ? coefSrc(int(rng, 1, 6), l) : `${coefSrc(int(rng, 1, 4), l)} + ${int(rng, 1, 8)}`);
  const slots = pick(rng, [['b', 's', 'b'], ['s', 'b', 's'], ['b', 'b', 's'], ['s', 'b', 'b']]);
  return { bottom: slots.map((s) => (s === 'b' ? bracket() : simple())), blanks: null };
}

function genSolve(rng) {
  const l = pick(rng, ['x', 'n', 'a', 'y']);
  const shape = pick(rng, [
    () => [coefSrc(int(rng, 1, 3), l), `${int(rng, 1, 9)}`, coefSrc(int(rng, 1, 3), l)],
    () => [`${int(rng, 1, 9)}`, coefSrc(int(rng, 1, 3), l), `${int(rng, 1, 9)}`],
    () => [`${coefSrc(1, l)} + ${int(rng, 1, 6)}`, coefSrc(int(rng, 1, 2), l), `${int(rng, 1, 9)}`],
    () => [coefSrc(int(rng, 1, 2), l), `${coefSrc(1, l)} + ${int(rng, 1, 5)}`, coefSrc(int(rng, 1, 3), l)],
  ]);
  return { bottom: shape(), blanks: null, letter: l, solution: int(rng, 2, 9) };
}

/** One round of a mode, drawn from `rng`. */
export function makePyramidRound(mode, rng = rngFrom()) {
  let spec;
  if (mode === 'up') spec = genUp(rng);
  else if (mode === 'down') spec = genDown(rng);
  else if (mode === 'brackets') spec = genBrackets(rng);
  else if (mode === 'solve') spec = genSolve(rng);
  else throw new Error(`unknown pyramid mode "${mode}"`);
  const rows = build(spec.bottom);
  const width = spec.bottom.length;
  const order = letterOrder(spec.bottom);
  const blanks = spec.blanks || rows.flatMap((row, r) => (r === 0 ? [] : row.map((_, c) => cellId(r, c))));
  const cells = cellsOf(rows, spec.bottom, blanks, order).map((cell) => (
    cell.r === 0 ? { ...cell, latex: cell.given && mode === 'brackets' ? spec.bottom[cell.c].replace(/-/g, ' - ').replace(/\+/g, ' + ').replace(/\s+/g, ' ') : polyLatex(cell.poly, answerOrder(cell.poly, order)), src: spec.bottom[cell.c] } : cell
  ));
  const round = { mode, width, order, cells };
  if (mode === 'solve') {
    const top = rows[width - 1][0];
    const keys = Object.keys(top);
    const a = top[spec.letter] ? top[spec.letter][0] : 0;
    const b = top['1'] ? top['1'][0] : 0;
    if (keys.some((k) => k !== spec.letter && k !== '1') || a < 2) return makePyramidRound(mode, rng);
    const target = a * spec.solution + b;
    const topLatex = polyLatex(top, answerOrder(top, order));
    const eq = equationModel({ eq: `${polyText(top, answerOrder(top, order)).replace(/−/g, '-')} = ${target}` });
    round.letter = spec.letter;
    round.target = target;
    round.solution = spec.solution;
    round.topLatex = topLatex;
    round.equation = eq;
  }
  return round;
}

/** A session: `rounds` rounds cycling through the modes. */
export function makePyramidSession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => PYRAMID_MODES.includes(m));
  if (!modes.length) return [];
  const n = Math.max(1, Math.min(12, Number(config?.rounds) || 6));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(makePyramidRound(modes[i % modes.length], rng));
  return out;
}

/**
 * A typed block. Right means the right value written in simplest form. The
 * hint says which way to work: from the two blocks below (add), or from the
 * block above and one beside it (subtract).
 */
export function markBlock(round, cellId_, typed, filled = {}) {
  const cell = round.cells.find((c) => c.id === cellId_);
  if (!cell) return { ok: false, en: 'No such block.', vn: 'Không có ô này.' };
  const got = tryPoly(typed);
  if (!got) return { ok: false, code: 'unreadable', en: 'Type an expression, like 5x + 3.', vn: 'Nhập một biểu thức, ví dụ 5x + 3.' };
  if (polyEq(got, cell.poly)) {
    const form = formOf(typed);
    if (form.simplest) return { ok: true };
    return { ok: false, equivalent: true, code: `form-${form.reason}`, ...formMessage(form.reason) };
  }
  const known = (r, c) => {
    const k = round.cells.find((x) => x.r === r && x.c === c);
    return k && (k.given || filled[k.id]) ? k : null;
  };
  const below = cell.r > 0 ? [known(cell.r - 1, cell.c), known(cell.r - 1, cell.c + 1)] : [null, null];
  if (below[0] && below[1]) {
    const sub = polySub(below[0].poly, below[1].poly);
    if (polyEq(got, sub) || polyEq(got, polySub(below[1].poly, below[0].poly))) {
      return { ok: false, code: 'subtracted', en: 'Going UP the pyramid, add the two blocks underneath.', vn: 'Đi LÊN kim tự tháp thì cộng hai ô bên dưới.' };
    }
    return { ok: false, code: 'wrong', en: `Add the two blocks underneath: (${below[0].text}) + (${below[1].text}), then collect like terms.`, vn: `Cộng hai ô bên dưới: (${below[0].text}) + (${below[1].text}), rồi gộp hạng tử đồng dạng.` };
  }
  // working down: this block + its neighbour = the block above
  const tryPair = (aboveR, aboveC, sideR, sideC) => {
    const above = known(aboveR, aboveC);
    const side = known(sideR, sideC);
    if (!above || !side) return null;
    if (polyEq(got, polyAdd(above.poly, side.poly))) {
      return { ok: false, code: 'added-down', en: 'Going DOWN, subtract: the block above take away the block beside this one.', vn: 'Đi XUỐNG thì trừ: ô bên trên trừ đi ô bên cạnh ô này.' };
    }
    return { ok: false, code: 'wrong', en: `This block + (${side.text}) must make (${above.text}). So it is (${above.text}) − (${side.text}).`, vn: `Ô này + (${side.text}) phải bằng (${above.text}). Vậy nó là (${above.text}) − (${side.text}).` };
  };
  return tryPair(cell.r + 1, cell.c - 1, cell.r, cell.c - 1)
    || tryPair(cell.r + 1, cell.c, cell.r, cell.c + 1)
    || { ok: false, code: 'not-reachable', en: 'Fill in a block next to this one first — you need two blocks you know.', vn: 'Hãy điền một ô bên cạnh ô này trước — em cần biết hai ô.' };
}

/** A typed solution for a solve round. */
export function markSolution(round, typed) {
  const raw = String(typed ?? '').replace(/^\s*[a-z]\s*=\s*/i, '');
  const got = tryPoly(raw);
  if (!got || !isConstant(got)) return { ok: false, en: 'Type a number.', vn: 'Nhập một số.' };
  const v = constOf(got);
  if (v[1] === 1 && v[0] === round.solution) return { ok: true };
  return round.equation ? diagnoseSolve(round.equation, raw) : { ok: false };
}

/** Validator: a unit's `pyramids` config, proven by generating rounds. */
export function checkPyramidConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['pyramids must be an object'];
  if (!cfg.title) out.push('pyramids is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('pyramids.modes must list at least one mode');
  for (const m of modes) if (!PYRAMID_MODES.includes(m)) out.push(`pyramid mode "${m}" — known modes: ${PYRAMID_MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 12)) out.push('pyramids.rounds must be 1–12');
  try {
    const rng = rngFrom(11);
    for (const m of modes.filter((x) => PYRAMID_MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) {
        const r = makePyramidRound(m, rng);
        const blanks = r.cells.filter((c) => !c.given);
        if (!blanks.length) out.push(`pyramid mode "${m}" drew a round with nothing to fill`);
        for (const c of r.cells) {
          if (!Object.keys(c.poly).length) out.push(`pyramid mode "${m}" drew a zero block`);
          if (c.r > 0) {
            const a = r.cells.find((x) => x.r === c.r - 1 && x.c === c.c);
            const b = r.cells.find((x) => x.r === c.r - 1 && x.c === c.c + 1);
            if (!polyEq(c.poly, polyAdd(a.poly, b.poly))) out.push(`pyramid mode "${m}": block ${c.id} is not the sum below it`);
          }
          if (!c.given && !markBlock(r, c.id, c.text.replace(/−/g, '-'), {}).ok) out.push(`pyramid mode "${m}": block ${c.id} does not accept its own answer "${c.text}"`);
        }
        // every blank must be reachable from the givens
        const known = new Set(r.cells.filter((c) => c.given).map((c) => c.id));
        for (let pass = 0; pass < 6; pass += 1) {
          for (const c of r.cells) {
            if (known.has(c.id)) continue;
            const has = (rr, cc) => known.has(cellId(rr, cc));
            if (c.r > 0 && has(c.r - 1, c.c) && has(c.r - 1, c.c + 1)) known.add(c.id);
            else if (has(c.r + 1, c.c - 1) && has(c.r, c.c - 1)) known.add(c.id);
            else if (has(c.r + 1, c.c) && has(c.r, c.c + 1)) known.add(c.id);
          }
        }
        if (known.size !== r.cells.length) out.push(`pyramid mode "${m}" drew a round that cannot be finished from its givens`);
        if (m === 'solve') {
          if (!Number.isInteger(r.solution) || !r.equation || r.equation.solution[0] !== r.solution) out.push('pyramid solve round: the equation does not give the solution');
          if (!markSolution(r, String(r.solution)).ok) out.push('pyramid solve round does not accept its own solution');
        }
        if (m === 'brackets') {
          const bottomBrackets = r.cells.filter((c) => c.r === 0 && /\(/.test(c.src || ''));
          for (const c of bottomBrackets) expandModel(c.src);
        }
      }
    }
  } catch (e) {
    out.push(`pyramids threw: ${e.message}`);
  }
  return [...new Set(out)];
}
