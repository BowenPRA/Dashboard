// src/components/math/algebraSteps.js
//
// The screen-side logic of Expand It (EXPAND_GRID) and Undo It (FLOW_SOLVE)
// that is not maths the validator needs: which chips sit in a tray, the order
// the equation choices are shown in, the substituted check line, and the
// per-box / per-arrow diagnoses that name a slip. Everything is derived from
// the models in utils/algebra.js — nothing here stores an answer. Kept as a
// plain module (not inside the .jsx) so it can be exercised in Node.

import {
  chainLatex, opText, opLatex, inverseOf, sameOp, applyOp, valueText, equationChoices,
  termText, termAbsText, monoText, polyAdd, polyEq, tryPoly, diagnoseExpand, diagnoseSimplify, rEq,
} from '../../utils/algebra.js';
import { parseRational } from '../../utils/logs.js';

// ------------------------------------------------------------------ order

/** FNV-1a: a stable 32-bit seed from a string (the item id). */
export function hashSeed(str) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The same list, shuffled the same way every time for the same seed. */
export function seededShuffle(list, seed) {
  const out = [...list];
  const rnd = mulberry32(hashSeed(seed));
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ------------------------------------------------------------------ numbers

/** A rational as LaTeX: 7, -4, \frac{3}{2}. */
export const numLatex = (c) => (c[1] === 1 ? `${c[0]}` : `${c[0] < 0 ? '-' : ''}\\frac{${Math.abs(c[0])}}{${c[1]}}`);

/** A rational as a student would type it into a box: 7, -4, 3/2. */
export const numTyped = (c) => (c[1] === 1 ? `${c[0]}` : `${c[0]}/${c[1]}`);

// ------------------------------------------------------------------ Expand It

/** A term across the top of the grid, sign always shown: +3, −c. */
export const headLatex = (t) => (t.coef[0] < 0 ? t.latex : `+${t.latex}`);

/** A term as a factor on the working line: a negative one is bracketed. */
export const factorLatex = (t) => (t.coef[0] < 0 ? `(${t.latex})` : t.latex);

/** What a box holds, as a student types it: 15, −4c, x². */
export const cellTyped = (c) => termText(c.coef, c.key);

/** The expansion in grid order as plain text: 10x − 10 + x + 17. */
export function expandedText(model) {
  return model.expandedTerms
    .map((t, i) => (i === 0 ? termText(t.coef, t.key) : `${t.coef[0] < 0 ? ' − ' : ' + '}${termAbsText(t.coef, t.key)}`))
    .join('');
}

const cellsPoly = (b) => b.cells.reduce((p, c) => polyAdd(p, { [c.key]: c.coef }), {});

/**
 * The Write stage: the expansion, like terms not yet collected (accepted
 * either way). Adds two slips diagnoseExpand does not name — the loose terms
 * left behind, and only one of several brackets written — and replaces its
 * catch-all (which prints the whole expansion) with a pointer back to the grid.
 */
export function diagnoseWrite(model, typed) {
  const d = diagnoseExpand(model.expr, typed, { simplify: false });
  if (d.ok || d.equivalent || d.code === 'unreadable') return d;
  const got = tryPoly(typed);
  const loose = model.pieces.filter((p) => p.kind === 'term');
  if (got && loose.length) {
    const bracketsOnly = model.brackets.reduce((p, b) => polyAdd(p, cellsPoly(b)), {});
    if (polyEq(got, bracketsOnly)) {
      const txt = loose.map((p) => `${p.coef[0] < 0 ? '−' : '+'} ${termAbsText(p.coef, p.key)}`).join(' ');
      return { ok: false, code: 'loose-forgotten', en: `The terms outside the brackets come along too: ${txt}.`, vn: `Các hạng tử bên ngoài ngoặc cũng phải viết theo: ${txt}.` };
    }
  }
  if (got && model.brackets.length > 1 && model.brackets.some((b) => polyEq(got, cellsPoly(b)))) {
    return { ok: false, code: 'one-bracket', en: 'Every bracket is expanded — write the boxes from ALL the grids.', vn: 'Mọi dấu ngoặc đều được khai triển — hãy viết các ô của TẤT CẢ các bảng.' };
  }
  if (d.code === 'wrong') {
    return { ok: false, code: 'wrong', en: 'Read the boxes off the grid, left to right, each with its sign — then add on any terms outside the brackets.', vn: 'Đọc các ô trong bảng từ trái sang phải, mỗi ô kèm dấu của nó — rồi viết thêm các hạng tử bên ngoài ngoặc.' };
  }
  return d;
}

/** The names of the kinds in the answer, in order: "the x terms, then the numbers". */
function kindList(model) {
  const keys = Object.keys(model.answer);
  const order = [];
  for (const t of model.expandedTerms) if (!order.includes(t.key) && keys.includes(t.key)) order.push(t.key);
  const letters = order.filter((k) => k !== '1');
  const all = order.includes('1') ? [...letters, '1'] : letters;
  return {
    en: all.map((k) => (k === '1' ? 'the numbers' : `the ${monoText(k)} terms`)).join(', then '),
    vn: all.map((k) => (k === '1' ? 'các số' : `các hạng tử ${monoText(k)}`)).join(', rồi '),
  };
}

/**
 * The Collect stage. Accepted by diagnoseExpand (simplify: true); a wrong
 * answer is named with the Collect It diagnosis run on the expansion (the
 * invisible 1, the sign left behind, unlike kinds joined), and a plain
 * pointer when no slip fits.
 */
export function diagnoseCollect(model, typed) {
  const d = diagnoseExpand(model.expr, typed, { simplify: true });
  if (d.ok || d.equivalent || d.code === 'unreadable') return d;
  let s;
  try { s = diagnoseSimplify(expandedText(model).replace(/−/g, '-'), typed); } catch { s = null; }
  if (s && !s.ok && !s.equivalent && s.code !== 'wrong' && s.code !== 'unreadable') return s;
  const kinds = kindList(model);
  return { ok: false, code: 'wrong', en: `Collect one kind at a time — ${kinds.en} — keeping each sign with its term.`, vn: `Gộp từng loại một — ${kinds.vn} — giữ dấu đi cùng hạng tử.` };
}

/**
 * A work-backwards blank against its value, with the slip named: the number
 * copied from the answer, the difference instead of the quotient, or a plain
 * "multiply back" hint built from a box the student can see.
 */
export function diagnoseMissingBlank(mm, blankId, typed) {
  const blank = mm.blanks.find((b) => b.id === blankId);
  const v = parseRational(typed);
  if (!v) return { ok: false, code: 'unreadable', en: 'Type a whole number in every box.', vn: 'Nhập một số nguyên vào mỗi ô.' };
  if (rEq(v, [blank.value, 1])) return { ok: true };
  const hint = missingHint(mm, blankId);
  const b = mm.model.brackets[0];
  const n = v[1] === 1 ? v[0] : null;
  const cellAbs = b.cells.map((c) => Math.abs(c.coef[0]));
  if (blankId === 'outer') {
    if (n !== null && cellAbs.includes(n) && n !== blank.value) {
      return { ok: false, code: 'answer-number', en: `That number is in the answer. The box is what you MULTIPLY by to make it. ${hint.en}`, vn: `Số đó nằm trong kết quả. Ô trống là số em NHÂN để được nó. ${hint.vn}` };
    }
    const seen = b.inner.findIndex((_, j) => !mm.blanks.some((x) => x.id === `inner:${j}`));
    if (seen !== -1 && n !== null && n === cellAbs[seen] - Math.abs(b.inner[seen].coef[0])) {
      return { ok: false, code: 'added', en: `The grid multiplies — it never adds. ${hint.en}`, vn: `Bảng nhân chứ không cộng. ${hint.vn}` };
    }
  } else {
    const i = Number(blankId.slice(6));
    if (n !== null && n === cellAbs[i] && n !== blank.value) {
      return { ok: false, code: 'answer-number', en: `That number is in the answer. The box is what you MULTIPLY by to make it. ${hint.en}`, vn: `Số đó nằm trong kết quả. Ô trống là số em NHÂN để được nó. ${hint.vn}` };
    }
    if (n !== null && n === cellAbs[i] - Math.abs(b.outer.coef[0])) {
      return { ok: false, code: 'added', en: `The grid multiplies — it never adds. ${hint.en}`, vn: `Bảng nhân chứ không cộng. ${hint.vn}` };
    }
  }
  return { ok: false, code: 'hint', ...hint };
}

/** "Multiply back: what times 2x gives 8x?" — derived from a visible box. */
export function missingHint(mm, blankId) {
  const b = mm.model.brackets[0];
  const hidden = new Set(mm.blanks.map((x) => x.id));
  if (blankId === 'outer') {
    const i = b.inner.findIndex((_, j) => !hidden.has(`inner:${j}`));
    if (i === -1) return { en: 'Multiply back from the answer, one box at a time.', vn: 'Nhân ngược lại từ kết quả, từng ô một.' };
    const inner = termText(b.inner[i].coef, b.inner[i].key);
    const cell = termText(b.cells[i].coef, b.cells[i].key);
    return { en: `Multiply back: what times ${inner} gives ${cell}?`, vn: `Nhân ngược lại: số nào nhân với ${inner} thì được ${cell}?` };
  }
  if (hidden.has('outer')) return { en: 'Find the outside number first, from a box you can see — then multiply back.', vn: 'Tìm số bên ngoài trước, từ một ô em nhìn thấy — rồi nhân ngược lại.' };
  const i = Number(blankId.slice(6));
  const outerAbs = termAbsText(b.outer.coef, b.outer.key);
  const cellAbs = termAbsText(b.cells[i].coef, b.cells[i].key);
  const mono = monoText(b.inner[i].key);
  return {
    en: `Multiply back: ${outerAbs} × □${mono} = ${cellAbs}. What number goes in the box?`,
    vn: `Nhân ngược lại: ${outerAbs} × □${mono} = ${cellAbs}. Số nào điền vào ô trống?`,
  };
}

/** A single bracket with every term positive: the rectangle it is the area of. Null otherwise. */
export function areaParts(model) {
  if (model.pieces.length !== 1 || model.brackets.length !== 1) return null;
  const b = model.brackets[0];
  if (b.outer.coef[0] <= 0 || b.outer.coef[1] !== 1) return null;
  if (b.inner.some((t) => t.coef[0] <= 0 || t.coef[1] !== 1)) return null;
  return {
    outerLatex: b.outer.latex,
    parts: b.inner.map((t, i) => ({
      headLatex: t.latex,
      cellLatex: b.cells[i].latex,
      weight: t.key === '1' ? Math.max(1, Math.min(3, t.coef[0] / 3)) : 2.5 + Math.min(t.coef[0], 4) * 0.5,
    })),
  };
}

// ------------------------------------------------------------------ Undo It

const MULDIV = (op) => op === '*' || op === '/';

/**
 * The Forward tray: the item's own operations, their inverses, and one step
 * with a nearby wrong number (× 5 for × 6) — shuffled by the item id.
 */
export function forwardTray(model, seed) {
  const chips = [];
  const has = (o) => chips.some((c) => sameOp(c, o));
  const push = (o, role) => chips.push({ id: `f${chips.length}`, op: o.op, n: o.n, role });
  model.ops.forEach((o) => push(o, 'step'));
  model.ops.forEach((o) => { const inv = inverseOf(o); if (!has(inv)) push(inv, 'inverse'); });
  const h = hashSeed(seed);
  for (let t = 0; t < model.ops.length * 2; t += 1) {
    const base = model.ops[(h + t) % model.ops.length];
    const delta = ((h >>> 3) + t) % 2 === 0 ? 1 : -1;
    const near = { op: base.op, n: base.n + delta };
    if (near.n >= (MULDIV(base.op) ? 2 : 1) && !has(near)) { push(near, 'near'); break; }
  }
  return seededShuffle(chips, `${seed}:fwd`);
}

/** The Reverse tray: the inverses, with the operations themselves as the distractors. */
export function reverseTray(model, seed) {
  const chips = [];
  const has = (o) => chips.some((c) => sameOp(c, o));
  const push = (o, role) => chips.push({ id: `r${chips.length}`, op: o.op, n: o.n, role });
  model.inverse.forEach((o) => push(o, 'inverse'));
  model.ops.forEach((o) => { if (!has(o)) push(o, 'same'); });
  return seededShuffle(chips, `${seed}:rev`);
}

/**
 * Four equations for the story, shuffled by the item id. equationChoices
 * returns only three for a one-step story; the fourth is derived here: the
 * two numbers swapped (x + 20 = 8), or failing that another operation.
 */
export function choicesFor(model, seed) {
  const out = equationChoices(model).map((c) => ({ ...c, latex: c.latex.replace(/−/g, '-') }));
  const t = numLatex(model.target);
  const add = (id, latex, why) => {
    if (out.length >= 4 || out.some((o) => o.latex === latex)) return;
    out.push({ id, latex, correct: false, why });
  };
  if (model.ops.length === 1) {
    const o = model.ops[0];
    const tg = model.target;
    if (tg[1] === 1 && tg[0] >= (MULDIV(o.op) ? 2 : 1) && tg[0] !== o.n) {
      add('swapped', `${chainLatex(model.letter, [{ op: o.op, n: tg[0] }])} = ${o.n}`, {
        en: `The numbers have swapped places. ${tg[0]} is the ANSWER, so it goes after the = sign; ${o.n} is the number in the step.`,
        vn: `Hai số bị đổi chỗ. ${tg[0]} là KẾT QUẢ nên đứng sau dấu =; ${o.n} là số trong bước tính.`,
      });
    }
  }
  const last = model.ops[model.ops.length - 1];
  for (const op of ['+', '-', '*', '/']) {
    if (op === last.op || op === inverseOf(last).op) continue;
    const cand = { op, n: Math.max(MULDIV(op) ? 2 : 1, last.n) };
    add('operation2', `${chainLatex(model.letter, [...model.ops.slice(0, -1), cand])} = ${t}`, {
      en: 'That is a different operation from the one in the story.',
      vn: 'Đó là một phép toán khác với phép toán trong câu chuyện.',
    });
  }
  return seededShuffle(out, `${seed}:eq`);
}

/** The letter's side with a number put in: 2 × 7 + 4, 3(5 + 2), \frac{20}{4}. */
export function substLatex(model, value) {
  const raw = numLatex(value);
  let tex = raw;
  let kind = 'num';
  for (const op of model.ops) {
    if (op.op === '*') {
      if (kind === 'sum') tex = `${op.n}(${tex})`;
      else tex = `${op.n} \\times ${kind === 'num' && value[0] < 0 ? `(${raw})` : tex}`;
      kind = 'product';
    } else if (op.op === '/') {
      tex = `\\frac{${tex}}{${op.n}}`;
      kind = 'frac';
    } else {
      tex = `${tex} ${op.op === '+' ? '+' : '-'} ${op.n}`;
      kind = 'sum';
    }
  }
  return tex;
}

/** The book's working: the equation, each undo as a line, the answer. */
export function solveLines(model) {
  const lines = [model.eqLatex];
  model.inverse.forEach((op, k) => lines.push(`${numLatex(model.back[k])} ${opLatex(op)} = ${numLatex(model.back[k + 1])}`));
  lines.push(`${model.letter} = ${numLatex(model.solution)}`);
  return lines;
}

/** The check, as a line: 2 × 7 + 4 = 18 ✓. */
export const checkLatex = (model) => `${substLatex(model, model.solution)} = ${numLatex(model.target)}`;

const bracketNote = (model) => {
  if (model.sideLatex.includes('(')) return { en: ' The bracket is worked out first.', vn: ' Phần trong ngoặc được tính trước.' };
  if (/\\frac\{[^{}]*[+-]/.test(model.sideLatex)) return { en: ' The whole top of the fraction is worked out before dividing.', vn: ' Cả tử số được tính xong rồi mới chia.' };
  return { en: '', vn: '' };
};

/**
 * The Forward chart: slot k must hold ops[k]. Returns a mark per slot and
 * the message for the first slot that is wrong (the wrong order, an inverse,
 * the right operation with the wrong number).
 */
export function diagnoseForward(model, placed) {
  const L = model.letter;
  const marks = model.ops.map((o, k) => (placed[k] ? sameOp(placed[k], o) : null));
  if (placed.some((c, k) => k < model.ops.length && !c) || placed.length < model.ops.length) {
    return { ok: false, empty: true, marks, code: 'empty', en: 'Put an operation on every arrow.', vn: 'Đặt một phép toán lên mỗi mũi tên.' };
  }
  const k = marks.findIndex((m) => !m);
  if (k === -1) return { ok: true, marks };
  const chip = placed[k];
  if (model.ops.some((o, j) => j !== k && sameOp(o, chip))) {
    const note = bracketNote(model);
    return { ok: false, marks, code: 'order', en: `Wrong order. The first thing done to ${L} goes first — start at ${L} and work outwards.${note.en}`, vn: `Sai thứ tự. Việc làm đầu tiên với ${L} đứng đầu — bắt đầu từ ${L} rồi đi ra ngoài.${note.vn}` };
  }
  if (model.ops.some((o) => sameOp(inverseOf(o), chip))) {
    return { ok: false, marks, code: 'inverse', en: `${opText(chip)} undoes a step. This chart shows what is DONE to ${L} — the undoing comes next.`, vn: `${opText(chip)} là phép làm ngược lại. Sơ đồ này ghi những gì được LÀM với ${L} — làm ngược lại là bước sau.` };
  }
  if (chip.op === model.ops[k].op) {
    return { ok: false, marks, code: 'number', en: 'The operation is right but the number is not — look at the equation again.', vn: 'Phép toán đúng nhưng số chưa đúng — hãy nhìn lại phương trình.' };
  }
  return { ok: false, marks, code: 'wrong', en: `Start at ${L}: what is done to it first? Read the equation from the letter outwards.`, vn: `Bắt đầu từ ${L}: điều gì được làm với nó trước tiên? Đọc phương trình từ chữ cái ra ngoài.` };
}

/**
 * The Reverse chart: arrow k must hold inverse[k], and the box after it must
 * hold back[k + 1]. Returns marks for every arrow and box, and the message for
 * the first thing wrong along the chart (the operation before its box).
 */
export function diagnoseReverse(model, placed, typed) {
  const n = model.ops.length;
  const opMarks = model.inverse.map((o, k) => (placed[k] ? sameOp(placed[k], o) : null));
  const values = model.inverse.map((_, k) => parseRational(typed[k]));
  const valMarks = values.map((v, k) => (v ? rEq(v, model.back[k + 1]) : null));
  if (model.inverse.some((_, k) => !placed[k] || !String(typed[k] ?? '').trim())) {
    return { ok: false, empty: true, opMarks, valMarks, code: 'empty', en: 'Put an operation on every arrow and a number in every box.', vn: 'Đặt phép toán lên mỗi mũi tên và điền số vào mỗi ô.' };
  }
  if (values.some((v) => !v)) {
    return { ok: false, unreadable: true, opMarks, valMarks, code: 'unreadable', en: 'Type a number in every box, like 7 or −4.', vn: 'Nhập một số vào mỗi ô, ví dụ 7 hoặc −4.' };
  }
  for (let k = 0; k < n; k += 1) {
    const step = model.ops[n - 1 - k];
    const chip = placed[k];
    if (!opMarks[k]) {
      if (sameOp(chip, step)) {
        return { ok: false, opMarks, valMarks, code: 'same-op', en: `Undo it: the inverse of ${opText(step)} is ${opText(inverseOf(step))}.`, vn: `Làm ngược lại: phép ngược của ${opText(step)} là ${opText(inverseOf(step))}.` };
      }
      if (model.inverse.some((o, j) => j !== k && sameOp(o, chip))) {
        return k === 0
          ? { ok: false, opMarks, valMarks, code: 'order', en: `Undo the LAST step first — socks and shoes. ${opText(step)} happened last, so it is undone first.`, vn: `Làm ngược bước CUỐI trước — như tất và giày. ${opText(step)} được làm sau cùng, nên phải làm ngược nó trước.` }
          : { ok: false, opMarks, valMarks, code: 'order', en: `Undo the steps in reverse order — socks and shoes. Next to undo is ${opText(step)}.`, vn: `Làm ngược các bước theo thứ tự ngược lại — như tất và giày. Tiếp theo cần làm ngược ${opText(step)}.` };
      }
      if (model.ops.some((o) => sameOp(o, chip))) {
        return { ok: false, opMarks, valMarks, code: 'same-op', en: `${opText(chip)} does a step again instead of undoing one. Undo ${opText(step)} here.`, vn: `${opText(chip)} lại làm một bước thay vì làm ngược lại. Ở đây hãy làm ngược ${opText(step)}.` };
      }
      return { ok: false, opMarks, valMarks, code: 'wrong-op', en: `Which operation undoes ${opText(step)}?`, vn: `Phép toán nào làm ngược lại ${opText(step)}?` };
    }
    if (!valMarks[k]) {
      const prev = model.back[k];
      const inv = model.inverse[k];
      const v = values[k];
      if (rEq(v, applyOp(prev, step))) {
        return { ok: false, opMarks, valMarks, code: 'did-op', en: `That box did ${opText(step)} instead of undoing it. Work out ${valueText(prev)} ${opText(inv)}.`, vn: `Ô đó đã làm ${opText(step)} thay vì làm ngược lại. Hãy tính ${valueText(prev)} ${opText(inv)}.` };
      }
      const want = model.back[k + 1];
      if (want[0] !== 0 && rEq(v, [-want[0], want[1]])) {
        return { ok: false, opMarks, valMarks, code: 'sign', en: `Check the sign: ${valueText(prev)} ${opText(inv)} = ?`, vn: `Kiểm tra dấu: ${valueText(prev)} ${opText(inv)} = ?` };
      }
      return { ok: false, opMarks, valMarks, code: 'arith', en: `Work it out again: ${valueText(prev)} ${opText(inv)} = ?`, vn: `Tính lại: ${valueText(prev)} ${opText(inv)} = ?` };
    }
  }
  return { ok: true, opMarks, valMarks };
}

/** The Check stage: the value of the letter's side with the solution put in. */
export function diagnoseCheck(model, typed) {
  const v = parseRational(typed);
  if (!v) return { ok: false, code: 'unreadable', en: 'Type a number, like 18 or −4.', vn: 'Nhập một số, ví dụ 18 hoặc −4.' };
  if (rEq(v, model.target)) return { ok: true };
  if (rEq(v, model.solution)) {
    return { ok: false, code: 'solution', en: `That is ${model.letter} itself. Put it in and work the left side out.`, vn: `Đó chính là ${model.letter}. Hãy thay vào rồi tính vế trái.` };
  }
  const steps = model.ops.map(opText).join(model.ops.length > 1 ? ', then ' : '');
  const stepsVn = model.ops.map(opText).join(model.ops.length > 1 ? ', rồi ' : '');
  return { ok: false, code: 'wrong', en: `Start from ${valueText(model.solution)} and do the chart in order: ${steps}.`, vn: `Bắt đầu từ ${valueText(model.solution)} và làm theo sơ đồ: ${stepsVn}.` };
}

/** diagnoseSolve's check line, tidied for the screen: "n ÷ 4", a real minus sign. */
export function tidySolve(d) {
  if (!d || d.ok || !d.en) return d;
  return { ...d, en: d.en.replace(/\((\w)\) ÷/g, '$1 ÷').replace(/ - /g, ' − ') };
}
