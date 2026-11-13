// src/utils/quadFormula.js
//
// FORMULA (QUAD_FORMULA, p95) — the item model. An item is only
//   { id, level, eq: '2x^2 - 7x + 3 = 0' }
// and the stages, answers and named slips come from quadratic.js:
//
//   abc     a = __  b = __  c = __          (0 on one side first)
//   disc    b² − 4ac = __                    the discriminant
//   count   two / one / no real solutions    what the discriminant says
//   root    √D = __  or  √D = __√__          (D > 0)
//   plug    x = (__ ± √D) / __               −b and 2a (levels 1–2)
//   solve   x = __ or x = __                 rational roots
//           x = (__ ± __√r) / __             irrational roots, simplified
//           x = __                           D = 0
// D < 0 ends the item after `count`: "no real solutions" IS the answer.

import { analyse, formulaModel, parseNumber, rEq, R, isSquare, splitRoot, gcd, pmLatex, rLatex, approx } from './quadratic.js';

/** Typeset minus signs: "-49" → "−49" (a hyphen reads badly as a negative). */
const mm = (t) => String(t).replace(/(^|[\s(=×÷+,/])-(?=[\d√x(])/g, '$1−');
const ok = (en, vn) => ({ ok: true, en: mm(en), vn: mm(vn) });
const bad = (en, vn) => ({ ok: false, en: mm(en), vn: mm(vn) });
const soft = (en, vn) => ({ ok: false, soft: true, en: mm(en), vn: mm(vn) });
const int = (text) => { const r = parseNumber(text); return r && r.d === 1 ? r.n : null; };
const par = (n) => (n < 0 ? `(${n})` : `${n}`);

export function deriveFormulaItem(item) {
  const an = analyse(item?.eq);
  if (!an.ok || an.kind !== 'quadratic') throw new Error(`"${item?.eq}" is not a quadratic`);
  const { std } = an;
  if (std.flipped || std.scale !== 1) throw new Error(`"${item.eq}": write it with a positive x² term and whole numbers`);
  const fm = formulaModel(std.a, std.b, std.c);
  const level = Number(item.level) || 1;
  const stages = ['abc', 'disc', 'count'];
  if (fm.D > 0) {
    stages.push('root');
    if (level <= 2) stages.push('plug');
  }
  if (fm.D >= 0) stages.push('solve');
  const solveKind = fm.kind === 'one' ? 'one' : fm.kind === 'rational' ? 'two' : fm.kind === 'irrational' ? 'irr' : null;
  return { id: item.id, level, eq: item.eq, v: std.v, an, std, fm, stages, moved: std.moved, solveKind };
}

export function diagnoseAbc(m, vals) {
  const [a, b, c] = vals.map(int);
  if ([a, b, c].some((x) => x == null)) return soft('Fill in a, b and c (a missing number is 0; −x means b = −1).', 'Điền a, b và c (số không có là 0; −x nghĩa là b = −1).');
  const { a: A, b: B, c: C } = m.std;
  if (a === A && b === B && c === C) return ok(`Right — a = ${A}, b = ${B}, c = ${C}. The signs go with the numbers.`, `Đúng — a = ${A}, b = ${B}, c = ${C}. Dấu đi theo số.`);
  if (a === A && Math.abs(b) === Math.abs(B) && Math.abs(c) === Math.abs(C)) {
    if (m.moved) return bad('Check the signs. Get 0 on the right first — a term changes sign when it crosses the = sign — then each sign belongs to the number after it.', 'Kiểm tra dấu. Đưa về vế phải bằng 0 trước — hạng tử đổi dấu khi chuyển qua dấu = — rồi mỗi dấu thuộc về số đứng sau nó.');
    const which = b !== B ? ['b', B, b] : ['c', C, c];
    return bad(`Keep the signs: ${which[0]} is ${which[1]}, not ${which[2]}. The sign in front of a number belongs to it.`, `Giữ dấu: ${which[0]} bằng ${which[1]}, không phải ${which[2]}. Dấu đứng trước một số thuộc về số đó.`);
  }
  if (a === C && c === A) return bad('a goes with x² and c is the number on its own — those two are swapped.', 'a đi với x² còn c là số đứng riêng — hai số đó bị đảo.');
  if (b === 0 && B !== 0) return bad('b is the number in front of x. Look again.', 'b là số đứng trước x. Xem lại nhé.');
  return bad(m.moved ? 'First move everything to the left so the right side is 0. Then a goes with x², b with x, c is the number on its own.' : 'a goes with x², b with x, and c is the number on its own.',
    m.moved ? 'Trước hết chuyển mọi thứ sang trái để vế phải bằng 0. Sau đó a đi với x², b đi với x, c là số đứng riêng.' : 'a đi với x², b đi với x, và c là số đứng riêng.');
}

export function diagnoseDisc(m, text) {
  const d = int(text);
  if (d == null) return soft('Type a whole number (it can be negative).', 'Hãy gõ một số nguyên (có thể âm).');
  const { a, b, c, D } = m.fm;
  if (d === D) return ok(`Right — ${par(b)}² − 4(${a})(${par(c)}) = ${b * b} ${4 * a * c < 0 ? '+' : '−'} ${Math.abs(4 * a * c)} = ${D}.`, `Đúng — ${par(b)}² − 4(${a})(${par(c)}) = ${b * b} ${4 * a * c < 0 ? '+' : '−'} ${Math.abs(4 * a * c)} = ${D}.`);
  if (b < 0 && d === -b * b - 4 * a * c) return bad(`${par(b)}² is ${b * b}, not ${-b * b}: a negative times a negative is positive. Square b in brackets.`, `${par(b)}² bằng ${b * b}, không phải ${-b * b}: âm nhân âm ra dương. Bình phương b trong ngoặc.`);
  if (d === b * b + 4 * a * c && c !== 0) return bad(`Watch the sign of −4ac: −4 × ${a} × ${par(c)} = ${-4 * a * c}.`, `Cẩn thận dấu của −4ac: −4 × ${a} × ${par(c)} = ${-4 * a * c}.`);
  if (d === b * b - 2 * a * c) return bad('It is 4ac, not 2ac. (The 2 belongs to the 2a at the bottom.)', 'Là 4ac, không phải 2ac. (Số 2 thuộc về 2a ở mẫu.)');
  if (d === b - 4 * a * c) return bad(`Square b first: ${par(b)}² = ${b * b}.`, `Bình phương b trước: ${par(b)}² = ${b * b}.`);
  return bad(`Work it in two parts: b² = ${par(b)}² first, then 4 × a × c, then subtract.`, `Tính hai phần: b² = ${par(b)}² trước, rồi 4 × a × c, rồi trừ.`);
}

export const COUNT_OPTIONS = [
  { id: 'two', en: 'Two real solutions', vn: 'Hai nghiệm thực' },
  { id: 'one', en: 'One real solution', vn: 'Một nghiệm thực' },
  { id: 'none', en: 'No real solutions', vn: 'Vô nghiệm thực' },
];
export const countOf = (m) => (m.fm.D > 0 ? 'two' : m.fm.D === 0 ? 'one' : 'none');

export function diagnoseCount(m, id) {
  const D = m.fm.D;
  if (id === countOf(m)) {
    if (D > 0) return ok(`Right — ${D} is positive, so ± gives two different answers.`, `Đúng — ${D} dương, nên ± cho hai đáp án khác nhau.`);
    if (D === 0) return ok('Right — √0 = 0, so + and − give the same answer.', 'Đúng — √0 = 0, nên dấu + và − cho cùng một đáp án.');
    return ok(`Right — ${D} is negative and no real number squares to a negative. No real solutions.`, `Đúng — ${D} âm và không số thực nào bình phương ra số âm. Vô nghiệm thực.`);
  }
  if (D < 0) return bad(`The discriminant is ${D}. Can you take the square root of a negative number?`, `Biệt thức bằng ${D}. Có lấy căn bậc hai của số âm được không?`);
  if (D === 0) return bad('The discriminant is 0. What is +√0 and what is −√0?', 'Biệt thức bằng 0. +√0 và −√0 bằng bao nhiêu?');
  return bad(`The discriminant is ${D}, a positive number. Its square root can be added OR taken away.`, `Biệt thức bằng ${D}, là số dương. Căn của nó có thể được cộng HOẶC trừ.`);
}

/** √D: one box when D is a perfect square, else k√r. */
export const rootIsWhole = (m) => isSquare(m.fm.D);

export function diagnoseRoot(m, kText, rText) {
  const D = m.fm.D;
  if (rootIsWhole(m)) {
    const s = int(kText);
    if (s == null) return soft('Type a whole number.', 'Hãy gõ một số nguyên.');
    if (Math.abs(s) === Math.sqrt(D)) return ok(`Right — ${Math.sqrt(D)} × ${Math.sqrt(D)} = ${D}. A perfect square, so this one also factors.`, `Đúng — ${Math.sqrt(D)} × ${Math.sqrt(D)} = ${D}. Là số chính phương, nên phương trình này cũng phân tích được.`);
    if (s * 2 === D) return bad(`Half of ${D} is not its square root. Which number times ITSELF makes ${D}?`, `Một nửa của ${D} không phải căn bậc hai. Số nào nhân với CHÍNH NÓ ra ${D}?`);
    return bad(`${s} × ${s} = ${s * s}, not ${D}.`, `${s} × ${s} = ${s * s}, không phải ${D}.`);
  }
  const k = int(kText || '1'); const r = int(rText);
  if (k == null || r == null || r <= 0) return soft('Fill in both boxes: the number outside, then the number inside the root.', 'Điền cả hai ô: số bên ngoài, rồi số bên trong căn.');
  const { out: K, inside: Rr } = splitRoot(D);
  if (k === K && r === Rr) return ok(`Right — ${D} = ${K * K} × ${Rr}, so √${D} = ${K === 1 ? '' : K}√${Rr}.`, `Đúng — ${D} = ${K * K} × ${Rr}, nên √${D} = ${K === 1 ? '' : K}√${Rr}.`);
  if (k * k * r === D) {
    const more = splitRoot(r).out;
    return soft(`That is equal to √${D}, but ${r} still has a square factor (${more * more}) inside. Take it out too.`, `Bằng √${D} rồi, nhưng ${r} vẫn còn thừa số chính phương (${more * more}) bên trong. Hãy đưa nó ra ngoài nữa.`);
  }
  if (k * r === D) return bad(`Check it: ${k}√${r} squared is ${k * k} × ${r} = ${k * k * r}, not ${D}. The number outside is the square ROOT of the square factor.`, `Kiểm tra: (${k}√${r})² = ${k * k} × ${r} = ${k * k * r}, không phải ${D}. Số bên ngoài là CĂN của thừa số chính phương.`);
  return bad(`Find the biggest perfect square that divides ${D} (4, 9, 16, 25, 36 …), and take its root outside.`, `Tìm số chính phương lớn nhất chia hết ${D} (4, 9, 16, 25, 36 …), rồi đưa căn của nó ra ngoài.`);
}

export function diagnosePlug(m, topText, botText) {
  const t = int(topText); const bt = int(botText);
  if (t == null || bt == null) return soft('Fill in both boxes.', 'Điền cả hai ô.');
  const { b, a } = m.fm;
  const okTop = t === -b; const okBot = bt === 2 * a;
  if (okTop && okBot) return ok(`Right — −b = ${-b} and 2a = ${2 * a}.`, `Đúng — −b = ${-b} và 2a = ${2 * a}.`);
  if (!okTop && t === b && b !== 0) return bad(`−b means the OPPOSITE of b. b is ${b}, so −b is ${-b}.`, `−b nghĩa là SỐ ĐỐI của b. b bằng ${b}, nên −b bằng ${-b}.`);
  if (!okBot && bt === a) return bad(`The bottom is 2a = 2 × ${a} = ${2 * a}.`, `Mẫu là 2a = 2 × ${a} = ${2 * a}.`);
  return bad('The top starts with −b (the opposite of b); the bottom is 2 × a.', 'Tử bắt đầu bằng −b (số đối của b); mẫu là 2 × a.');
}

/**
 * The answers. kind 'two'/'one': vals = typed numbers (order-free).
 * kind 'irr': vals = [p, k, q] for (p ± k√r)/q — simplified.
 */
export function diagnoseSolve(m, vals) {
  const { fm } = m;
  if (m.solveKind === 'irr') {
    const p = int(vals[0] || '0'); const k = int(vals[1] || '1'); const q = int(vals[2] || '1');
    if (p == null || k == null || q == null || q === 0) return soft('Fill in the boxes with whole numbers.', 'Điền các ô bằng số nguyên.');
    const want = fm.reduced;
    const sameValue = p * want.q === want.p * q && Math.abs(k) * want.q === want.k * Math.abs(q);
    if (sameValue && Math.abs(q) === want.q && Math.abs(k) === want.k && p * Math.sign(q) === want.p) {
      return ok(`Right — x = ${plain(want)}: about ${approx(fm.decimals[1])} and ${approx(fm.decimals[0])}.`, `Đúng — x = ${plain(want)}: khoảng ${approx(fm.decimals[1])} và ${approx(fm.decimals[0])}.`);
    }
    if (sameValue) {
      const g = gcd(gcd(p, k), q);
      return soft(`That is equal, but not simplified yet: ${p}, ${k} and ${q} all divide by ${g}. Divide all three.`, `Giá trị đúng, nhưng chưa rút gọn: ${p}, ${k} và ${q} đều chia hết cho ${g}. Hãy chia cả ba.`);
    }
    const { k: K0 } = fm.root;
    if (q === fm.twoA / (fm.g || 1) && p === want.p && k === K0) return bad('You divided −b but not the root. EVERY term on top must be divided by the same number.', 'Em chia −b nhưng chưa chia phần căn. MỌI hạng tử ở tử đều phải chia cho cùng một số.');
    if (p === -want.p) return bad('Check the first number: it is −b ÷ 2a, simplified. Watch its sign.', 'Kiểm tra số đầu: là −b ÷ 2a đã rút gọn. Cẩn thận dấu.');
    return bad(`Start from x = (${-fm.b} ± ${fm.root.k === 1 ? '' : fm.root.k}√${fm.root.r}) / ${fm.twoA}, then divide every number by the biggest number that goes into all three.`, `Bắt đầu từ x = (${-fm.b} ± ${fm.root.k === 1 ? '' : fm.root.k}√${fm.root.r}) / ${fm.twoA}, rồi chia mọi số cho số lớn nhất chia hết cả ba.`);
  }
  const want = fm.roots;
  const got = vals.slice(0, want.length).map(parseNumber);
  if (got.some((x) => x == null)) return soft('Fill in each box (fractions like 1/2 are fine).', 'Điền mỗi ô (phân số như 1/2 cũng được).');
  const matches = (list) => want.every((w) => list.some((g) => rEq(g, w))) && (list.length < 2 || !rEq(list[0], list[1]));
  if (matches(got)) return ok(want.length === 1 ? `Right — x = ${rText(want[0])}, the only solution.` : 'Right — both answers.', want.length === 1 ? `Đúng — x = ${rText(want[0])}, nghiệm duy nhất.` : 'Đúng — cả hai nghiệm.');
  if (fm.kind === 'rational') {
    const s = fm.sqrt;
    const undivided = [R(-fm.b + s), R(-fm.b - s)];
    const sameSet = (x, y) => x.length === y.length && y.every((w) => x.some((g) => rEq(g, w)));
    if (sameSet(got, undivided)) return bad(`Finish it: divide each top by 2a = ${fm.twoA}.`, `Làm nốt: chia mỗi tử cho 2a = ${fm.twoA}.`);
    if (sameSet(got, want.map((w) => R(-w.n, w.d)))) return bad('Both signs are the wrong way round — did you start with b instead of −b?', 'Cả hai dấu đều ngược — em có bắt đầu bằng b thay vì −b không?');
    if (got.some((g) => want.some((w) => rEq(g, w)))) return bad('One is right. Now do the other sign: + for one answer, − for the other.', 'Một nghiệm đúng rồi. Giờ làm dấu còn lại: + cho một nghiệm, − cho nghiệm kia.');
  }
  return bad(`Work out (${-fm.b} + ${fm.sqrt ?? 0}) ÷ ${fm.twoA} and (${-fm.b} − ${fm.sqrt ?? 0}) ÷ ${fm.twoA}.`, `Tính (${-fm.b} + ${fm.sqrt ?? 0}) ÷ ${fm.twoA} và (${-fm.b} − ${fm.sqrt ?? 0}) ÷ ${fm.twoA}.`);
}

const rText = (r) => (r.d === 1 ? `${r.n}` : `${r.n}/${r.d}`);
const plain = ({ p, k, r, q }) => {
  const top = `${p === 0 ? '' : `${p} `}± ${k === 1 ? '' : k}√${r}`;
  return q === 1 ? top : `(${top}) / ${q}`;
};

/** The final answer as LaTeX for the done card. */
export function answerLatex(m) {
  const { fm, v } = m;
  if (fm.kind === 'none') return '\\text{No real solutions}';
  if (fm.kind === 'one') return `${v} = ${rLatex(fm.roots[0])}`;
  if (fm.kind === 'rational') return fm.roots.map((r) => `${v} = ${rLatex(r)}`).join(' \\quad\\text{or}\\quad ');
  return `${v} = ${pmLatex(fm.reduced)} \\approx ${approx(fm.decimals[1])},\\ ${approx(fm.decimals[0])}`;
}

/** The answers a stage expects, in its boxes — what Show me writes in, and what the checks replay. */
export function answersFor(m, stage) {
  const { fm } = m;
  switch (stage) {
    case 'abc': return [fm.a, fm.b, fm.c].map(String);
    case 'disc': return [String(fm.D)];
    case 'count': return [countOf(m)];
    case 'root': return rootIsWhole(m) ? [String(Math.sqrt(fm.D))] : [String(fm.root.k), String(fm.root.r)];
    case 'plug': return [String(-fm.b), String(fm.twoA)];
    case 'solve':
      if (m.solveKind === 'irr') return [String(fm.reduced.p), String(fm.reduced.k), String(fm.reduced.q)];
      return fm.roots.map((r) => (r.d === 1 ? String(r.n) : `${r.n}/${r.d}`));
    default: return [];
  }
}
