// src/utils/quadFactor.js
//
// FACTOR IT (FACTOR_QUAD, p94) — the item model. An item is only
//   { id, level, eq: 'x^2 + 5x = -6' }
// and everything the screen asks is derived here from quadratic.js: the
// standard form, the common factor, the product and sum to hunt for, the
// factor pairs, the split, the grouping, the brackets and the zeros — plus a
// named reason for every wrong answer a student is likely to type.
//
// Stages, in the order a student writes them:
//   standard  x² + bx + c = 0: type a, b, c          (only when the item is not written = 0)
//   gcf       take out the common factor             (only when a, b, c share one)
//   target    multiply to __, add to __              (product–sum and ac)
//   pair      tap factor pairs until the sum is right
//   split     a x² + __x + __x + c                   (ac)
//   group     __x(Px + Q) + __(Px + Q)               (ac)
//   squares   (__x)² − (__)²                          (difference of squares)
//   xout      x(__x + __)                            (c = 0)
//   factors   (x __)(x __)  or  (__x __)(__x __)
//   zeros     x = __ or x = __
//
// Fading (leaner-units rule): levels 1–2 walk every stage; level 3 drops
// `target` (the pair table says it); level 4 asks only for the brackets and the
// zeros (plus standard form and the common factor when the item needs them).

import {
  analyse, isWrittenStandard, parseNumber, rEq, rVal, R, expand, quadLatex, gcd, groupingOf, rLatex, coefX, signed,
} from './quadratic.js';

/** Typeset minus signs: "-49" → "−49" (a hyphen reads badly as a negative). */
const mm = (t) => String(t).replace(/(^|[\s(=×÷+,/])-(?=[\d√x(])/g, '$1−');
const ok = (en, vn) => ({ ok: true, en: mm(en), vn: mm(vn) });
const bad = (en, vn) => ({ ok: false, en: mm(en), vn: mm(vn) });
const soft = (en, vn) => ({ ok: false, soft: true, en: mm(en), vn: mm(vn) });
const int = (text) => { const r = parseNumber(text); return r && r.d === 1 ? r.n : null; };
const latexPoly = (arr, v = 'x') => quadLatex(arr[0], arr[1], arr[2], v);

export function deriveFactorItem(item) {
  const an = analyse(item?.eq);
  if (!an.ok || an.kind !== 'quadratic') throw new Error(`"${item?.eq}" is not a quadratic`);
  const { std, fac } = an;
  if (std.flipped || std.scale !== 1) throw new Error(`"${item.eq}": write it with a positive x² term and whole numbers`);
  if (!fac.factors) throw new Error(`"${item.eq}" does not factor with whole numbers`);
  const level = Number(item.level) || 1;
  const v = std.v;
  const stages = [];
  if (std.moved || !isWrittenStandard(item.eq)) stages.push('standard');
  if (fac.g > 1) stages.push('gcf');
  const fam = fac.family;
  const walk = level <= 2;
  const mid = level === 3;
  if (fam === 'pair') { if (walk) stages.push('target'); if (walk || mid) stages.push('pair'); stages.push('factors'); }
  if (fam === 'ac') { if (walk) stages.push('target'); if (walk || mid) stages.push('pair', 'split', 'group'); stages.push('factors'); }
  if (fam === 'diff') { if (walk || mid) stages.push('squares'); stages.push('factors'); }
  if (fam === 'common') stages.push('xout');
  stages.push('zeros');
  const brackets = fam === 'common' || fac.A === 1 ? 2 : 4;
  return {
    id: item.id, level, v, eq: item.eq, an, std, fac, fam, stages,
    // what the factors stage shows: two boxes (x __)(x __) or four
    brackets,
    product: fam === 'ac' ? fac.A * fac.C : fac.C,
    sum: fac.B,
    trinomial: [fac.A, fac.B, fac.C],
  };
}

/** The expression the student is factoring after the common factor is out, as LaTeX. */
export const innerLatex = (m) => latexPoly(m.trinomial, m.v);
export const fullLatex = (m) => quadLatex(m.std.a, m.std.b, m.std.c, m.v);

// ------------------------------------------------------------------ diagnose each stage

export function diagnoseStandard(m, vals) {
  const [a, b, c] = vals.map(int);
  if ([a, b, c].some((x) => x == null)) return soft('Fill in all three boxes with whole numbers (use − for negatives).', 'Điền cả ba ô bằng số nguyên (dùng dấu − cho số âm).');
  const { a: A, b: B, c: C } = m.std;
  if (a === A && b === B && c === C) return ok(`Right — ${fullLatexText(m)} = 0, with 0 alone on the right.`, `Đúng — ${fullLatexText(m)} = 0, vế phải chỉ còn 0.`);
  if (a === A && (b === -B || c === -C) && (b === B || b === -B) && (c === C || c === -C)) {
    return bad('Check the signs: a term that moves across the = sign changes sign — a plus becomes a minus, and a minus becomes a plus.',
      'Kiểm tra dấu: hạng tử chuyển qua dấu = thì đổi dấu — cộng thành trừ, trừ thành cộng.');
  }
  return bad('Move every term to the left so the right side is 0, then read the numbers in front of x², x, and the number on its own.',
    'Chuyển mọi hạng tử sang trái để vế phải bằng 0, rồi đọc số đứng trước x², trước x và số đứng riêng.');
}
const fullLatexText = (m) => fullLatex(m).replace(/\^\{2\}/g, '²').replace(/-/g, '−');

export function diagnoseGcf(m, text) {
  const g = int(text);
  if (g == null || g === 0) return soft('Type a whole number.', 'Hãy gõ một số nguyên.');
  const G = m.fac.g;
  const { a, b, c } = m.std;
  if (Math.abs(g) === G) return ok(`Right — every term divides by ${G}: ${G}(${innerText(m)}).`, `Đúng — mọi hạng tử đều chia hết cho ${G}: ${G}(${innerText(m)}).`);
  if (Math.abs(g) === 1) return bad('1 divides everything, but it does not help. Find a bigger number that divides a, b and c.', '1 chia hết mọi số, nhưng không giúp gì. Hãy tìm số lớn hơn chia hết a, b và c.');
  if (G % g === 0) return bad(`${g} divides every term — but so does a bigger number. Take out the GREATEST common factor.`, `${g} chia hết mọi hạng tử — nhưng còn số lớn hơn cũng chia hết. Hãy đặt nhân tử chung LỚN NHẤT.`);
  const misses = [a, b, c].filter((n) => n % g !== 0);
  return bad(`${g} does not divide ${misses[0]}, so it is not common to every term.`, `${g} không chia hết ${misses[0]}, nên không phải nhân tử chung của mọi hạng tử.`);
}
const innerText = (m) => innerLatex(m).replace(/\^\{2\}/g, '²').replace(/-/g, '−');

export function diagnoseTarget(m, prodText, sumText) {
  const p = int(prodText); const s = int(sumText);
  if (p == null || s == null) return soft('Fill in both boxes with whole numbers.', 'Điền cả hai ô bằng số nguyên.');
  const P = m.product; const S = m.sum;
  if (p === P && s === S) {
    return m.fam === 'ac'
      ? ok(`Right — a × c = ${m.fac.A} × ${par(m.fac.C)} = ${P}, and they must add to b = ${S}.`, `Đúng — a × c = ${m.fac.A} × ${par(m.fac.C)} = ${P}, và tổng phải bằng b = ${S}.`)
      : ok(`Right — multiply to c = ${P}, add to b = ${S}.`, `Đúng — tích bằng c = ${P}, tổng bằng b = ${S}.`);
  }
  if (p === S && s === P && P !== S) return bad('Those are swapped: the numbers MULTIPLY to c and ADD to b.', 'Hai số bị đảo: hai số NHÂN ra c và CỘNG ra b.');
  if (m.fam === 'ac' && p === m.fac.C) return bad(`a is ${m.fac.A}, not 1, so the product is a × c = ${m.fac.A} × ${par(m.fac.C)}.`, `a bằng ${m.fac.A}, không phải 1, nên tích là a × c = ${m.fac.A} × ${par(m.fac.C)}.`);
  if (p === -P || s === -S) return bad('Keep the signs that belong to the numbers: if c is negative, the product is negative.', 'Giữ nguyên dấu của các số: nếu c âm thì tích âm.');
  return bad(m.fam === 'ac' ? 'The product is a × c, and the sum is b — the number in front of x.' : 'The product is c (the number on its own) and the sum is b (the number in front of x).',
    m.fam === 'ac' ? 'Tích là a × c, còn tổng là b — số đứng trước x.' : 'Tích là c (số đứng riêng) và tổng là b (số đứng trước x).');
}
const par = (n) => (n < 0 ? `(${n})` : `${n}`);

/** A tapped factor pair: right, or what its sum is instead. */
export function diagnosePair(m, row) {
  if (row.sum === m.sum) return ok(`${row.m} × ${par(row.n)} = ${m.product} and ${row.m} + ${par(row.n)} = ${m.sum}. Those are the two numbers.`,
    `${row.m} × ${par(row.n)} = ${m.product} và ${row.m} + ${par(row.n)} = ${m.sum}. Đó là hai số cần tìm.`);
  if (row.sum === -m.sum) return bad(`${row.m} + ${par(row.n)} = ${row.sum} — the right size but the wrong sign. Try the same pair with both signs flipped.`,
    `${row.m} + ${par(row.n)} = ${row.sum} — đúng độ lớn nhưng sai dấu. Thử cặp đó với cả hai dấu đổi ngược.`);
  return bad(`${row.m} + ${par(row.n)} = ${row.sum}, not ${m.sum}. Keep looking.`, `${row.m} + ${par(row.n)} = ${row.sum}, không phải ${m.sum}. Tìm tiếp.`);
}

export function diagnoseSplit(m, aText, bText) {
  const x = int(aText); const y = int(bText);
  if (x == null || y == null) return soft('Fill in both boxes.', 'Điền cả hai ô.');
  const P = m.product; const S = m.sum;
  if (x + y === S && x * y === P) return ok(`Right — ${coefX(x)} + ${par(y)}x is still ${coefX(S)}, just written in two pieces.`, `Đúng — ${coefX(x)} + ${par(y)}x vẫn là ${coefX(S)}, chỉ viết thành hai phần.`);
  if (x + y === S) return bad(`They add to ${S}, but use the two numbers you found: they must also multiply to ${P}.`, `Tổng bằng ${S}, nhưng hãy dùng đúng hai số vừa tìm: tích của chúng phải bằng ${P}.`);
  return bad(`The two middle terms must add back up to ${coefX(S)}. Use the pair you found.`, `Hai hạng tử giữa cộng lại phải bằng ${coefX(S)}. Hãy dùng cặp số vừa tìm.`);
}

/** The grouping for the split the student chose (m first, then n). */
export const groupingFor = (m, first, second) => groupingOf(m.fac.A, first, second, m.fac.C);

export function diagnoseGroup(m, gr, g1Text, g2Text) {
  const g1 = int(g1Text || '1'); const g2 = int(g2Text);
  if (g1 == null || g2 == null) return soft('Fill in both boxes.', 'Điền cả hai ô.');
  if (g1 === gr.g1 && g2 === gr.g2) return ok('Right — both brackets match, so it will factor.', 'Đúng — hai ngoặc giống nhau, nên sẽ phân tích được.');
  if (g1 === gr.g1 && g2 === -gr.g2) return bad('Check the sign of the second factor: the second bracket must come out exactly the same as the first.', 'Kiểm tra dấu của thừa số thứ hai: ngoặc thứ hai phải giống hệt ngoặc thứ nhất.');
  if (g1 !== gr.g1) return bad(`What is the biggest thing that divides both ${coefX(m.fac.A)}² and ${coefX(gr.m)}? Take it out of the first group.`, `Số lớn nhất chia hết cả ${coefX(m.fac.A)}² và ${coefX(gr.m)} là gì? Đặt nó ra ngoài nhóm thứ nhất.`);
  return bad('Take the common factor out of the second group so that what is left matches the first bracket.', 'Đặt nhân tử chung của nhóm thứ hai ra ngoài sao cho phần còn lại giống ngoặc thứ nhất.');
}

export function diagnoseSquares(m, aText, cText) {
  const sa = int(aText || (m.fac.A === 1 ? '1' : '')); const sc = int(cText);
  if (sa == null || sc == null) return soft('Fill in the boxes.', 'Điền các ô.');
  if (Math.abs(sa) === m.fac.sa && Math.abs(sc) === m.fac.sc) return ok(`Right — ${innerText(m)} is (${coefX(m.fac.sa)})² − ${m.fac.sc}².`, `Đúng — ${innerText(m)} là (${coefX(m.fac.sa)})² − ${m.fac.sc}².`);
  if (sc * 2 === -m.fac.C || sc === -m.fac.C) return bad(`Which number SQUARED makes ${-m.fac.C}? Not half of it — the square root.`, `Số nào BÌNH PHƯƠNG lên bằng ${-m.fac.C}? Không phải một nửa — mà là căn bậc hai.`);
  return bad('Each box is a square root: what times itself makes that term?', 'Mỗi ô là một căn bậc hai: số nào nhân với chính nó ra hạng tử đó?');
}

export function diagnoseXout(m, aText, bText) {
  const p = int(aText || '1'); const q = int(bText);
  if (p == null || q == null) return soft('Fill in both boxes.', 'Điền cả hai ô.');
  if (p === m.fac.A && q === m.fac.B) return ok(`Right — x(${coefX(p)} ${signed(q).replace('- ', '− ')}) multiplies back to ${innerText(m)}.`, `Đúng — x(${coefX(p)} ${signed(q).replace('- ', '− ')}) nhân lại được ${innerText(m)}.`);
  return bad(`Divide each term by x: ${coefX(m.fac.A)}² ÷ x = ${coefX(m.fac.A)}, and ${coefX(m.fac.B)} ÷ x = ${m.fac.B}.`, `Chia mỗi hạng tử cho x: ${coefX(m.fac.A)}² ÷ x = ${coefX(m.fac.A)}, và ${coefX(m.fac.B)} ÷ x = ${m.fac.B}.`);
}

/**
 * The brackets. vals: [q, s] for (x q)(x s), or [p, q, r, s] for (p x q)(r x s).
 * Marked by multiplying out, so ANY correct factorisation is right — and a
 * wrong one is answered with what it actually multiplies out to.
 */
export function diagnoseFactors(m, vals) {
  const nums = m.brackets === 2
    ? [1, int(vals[0]), 1, int(vals[1])]
    : [int(vals[0] || '1'), int(vals[1]), int(vals[2] || '1'), int(vals[3])];
  if (nums.some((x) => x == null)) return soft('Fill in every box (a sign and a number, like −3 or 5).', 'Điền mọi ô (dấu và số, ví dụ −3 hoặc 5).');
  const [p, q, r, s] = nums;
  const got = expand([p, q], [r, s]);
  const want = m.trinomial;
  const show = latexPoly(got).replace(/\^\{2\}/g, '²').replace(/-/g, '−');
  const target = innerText(m);
  if (got[0] === want[0] && got[1] === want[1] && got[2] === want[2]) {
    return ok(`Right — multiply them out and you get ${target} back.`, `Đúng — nhân ra lại được ${target}.`);
  }
  if (got[0] === -want[0] && got[1] === -want[1] && got[2] === -want[2]) return bad('Every sign comes out the wrong way round. Flip the signs in one bracket.', 'Mọi dấu đều ngược. Hãy đổi dấu trong một ngoặc.');
  if (got[0] === want[0] && got[2] === want[2] && got[1] === -want[1]) {
    return bad(`These multiply out to ${show} — the middle sign is wrong. Put the numbers in with the signs you found them with.`,
      `Hai ngoặc này nhân ra ${show} — dấu hạng tử giữa bị sai. Hãy giữ nguyên dấu của hai số đã tìm.`);
  }
  if (got[0] === want[0] && got[2] === want[2]) {
    return bad(`These multiply out to ${show}: the first and last terms are right, but the middle term should be ${coefX(want[1])}. Try the numbers the other way round.`,
      `Hai ngoặc này nhân ra ${show}: hạng tử đầu và cuối đúng, nhưng hạng tử giữa phải là ${coefX(want[1])}. Thử đổi chỗ các số.`);
  }
  return bad(`These multiply out to ${show}, not ${target}.`, `Hai ngoặc này nhân ra ${show}, không phải ${target}.`);
}

/** The zeros: order-free; one box when the zero is repeated. */
export function diagnoseZeros(m, vals) {
  const want = m.fac.zeros;
  const got = vals.slice(0, want.length).map(parseNumber);
  if (got.some((x) => x == null)) return soft('Fill in each box (a fraction like −1/2 is fine).', 'Điền mỗi ô (phân số như −1/2 cũng được).');
  const matches = (list) => list.length === want.length && want.every((w) => list.some((g) => rEq(g, w))) && (list.length < 2 || !rEq(list[0], list[1]));
  if (matches(got)) return ok('Right — those make each bracket equal 0.', 'Đúng — các giá trị đó làm mỗi ngoặc bằng 0.');
  if (matches(got.map((g) => R(-g.n, g.d)))) {
    return bad('Opposite signs: set each bracket equal to 0 and solve. x + 3 = 0 gives x = −3, not 3.', 'Ngược dấu: cho mỗi ngoặc bằng 0 rồi giải. x + 3 = 0 cho x = −3, không phải 3.');
  }
  // Forgot to divide by the coefficient of x in a bracket like (2x + 1).
  const nums = m.fac.factors;
  const undivided = nums.map(([, q]) => R(-q));
  const sameSet = (x, y) => x.length === y.length && y.every((w) => x.some((g) => rEq(g, w)));
  if (m.fac.A !== 1 && sameSet(got, undivided)) return bad('Finish solving each bracket: 2x + 1 = 0 → 2x = −1 → x = −1/2. Divide by the number in front of x.', 'Giải trọn từng ngoặc: 2x + 1 = 0 → 2x = −1 → x = −1/2. Chia cho số đứng trước x.');
  if (want.length === 2 && got.some((g) => want.some((w) => rEq(g, w)))) return bad('One of those is right. Set the OTHER bracket equal to 0 as well.', 'Một giá trị đúng rồi. Hãy cho ngoặc CÒN LẠI bằng 0 nữa.');
  return bad('Set each bracket equal to 0 and solve it on its own.', 'Cho từng ngoặc bằng 0 rồi giải riêng.');
}

const sgn = (n) => (n < 0 ? `−${-n}` : `+${n}`);

/** The answers a stage expects, in its boxes — what Show me writes in. */
export function answersFor(m, stage, split) {
  const f = m.fac;
  switch (stage) {
    case 'standard': return [m.std.a, m.std.b, m.std.c].map(String);
    case 'gcf': return [String(f.g)];
    case 'target': return [String(m.product), String(m.sum)];
    case 'split': return [String(f.pair.m), String(f.pair.n)];
    case 'group': { const gr = split || f.grouping; return [String(gr.g1), String(gr.g2)]; }
    case 'squares': return [String(f.sa), String(f.sc)];
    case 'xout': return [String(f.A), sgn(f.B)];
    case 'factors': return m.brackets === 2 ? [sgn(f.factors[0][1]), sgn(f.factors[1][1])] : [String(f.factors[0][0]), sgn(f.factors[0][1]), String(f.factors[1][0]), sgn(f.factors[1][1])];
    case 'zeros': return f.zeros.map((z) => (z.d === 1 ? String(z.n) : `${z.n}/${z.d}`));
    default: return [];
  }
}

/** The answers as LaTeX for the done card: "x = -3 or x = -1/2". */
export const zerosLatex = (m) => m.fac.zeros.map((z) => `${m.v} = ${rLatex(z)}`).join(' \\quad\\text{or}\\quad ');
export { rVal, gcd };
