// src/utils/quadSolve.js
//
// The worked solution the Quad Solver prints for ANY quadratic a student
// types: the same lines a teacher writes on the board, in the order they are
// written, each with one short sentence saying why. Built entirely from
// quadratic.js (analyse → standardForm, factorModel, formulaModel), so the
// solver, Factor It and Formula can never disagree about an answer.
//
// solveSteps(input) → { ok, error?, kind, eqLatex, sections[], answer, graph }
//
// A section is { id, title: {en, vn}, method?: {en, vn}, rows: Row[] }.
// A Row is one of
//   { latex, en?, vn? }                 a line of working, with its reason
//   { note: {en, vn}, tone? }           a sentence on its own ('tip' | 'warn' | 'muted')
//   { pairs: { P, S, rows, hit } }      the factor-pair table (drawn by FactorPairs)
//   { abc: { a, b, c } }                the coefficient chips
// The sections a quadratic gets:
//   standard  get 0 on one side, clear fractions, make a positive; read a, b, c
//   factor    the method that fits (common x / difference of squares / product–sum
//             / ac and grouping), or why it does not factor with whole numbers
//   zero      the zero product property, one bracket at a time
//   roots     the square-root method (b = 0 and it does not factor)
//   formula   always: substitute, discriminant, √, ±, simplify, decimals
//   answer    the solutions, the zeros as points, and how many there are

import {
  analyse, originalLatex, quadLatex, factoredLatex, signedPairs, binLatex, coefX, signed, paren,
  rLatex, rVal, rootLatex, pmLatex, approx, realZeros, R, gcd,
} from './quadratic.js';

/** Typeset minus signs in sentences: "-60" → "−60" (LaTeX lines are left alone). */
const mm = (t) => String(t).replace(/(^|[\s(=×÷+,/])-(?=[\d√x(])/g, '$1−');
const say = (en, vn) => ({ en: mm(en), vn: mm(vn) });

/** "x = 3" or "x = 3 \quad\text{or}\quad x = -2" */
const orLatex = (v, list) => list.map((s) => `${v} = ${s}`).join(' \\quad\\text{or}\\quad ');

// ------------------------------------------------------------------ sections

function standardSection(an) {
  const { std, parsed } = an;
  const { a, b, c, v } = std;
  const rows = [{ latex: originalLatex(parsed), ...say('Start with the equation as it is given.', 'Bắt đầu với phương trình như đề cho.') }];
  if (parsed.fromY) {
    rows.push({ note: say('The zeros are where y = 0, so set the expression equal to 0.', 'Nghiệm (zero) là chỗ y = 0, nên cho biểu thức bằng 0.') });
  } else if (!parsed.hasEquals) {
    rows.push({ note: say('To find the zeros, set the expression equal to 0.', 'Để tìm nghiệm, cho biểu thức bằng 0.') });
  }
  for (const s of std.steps) rows.push({ latex: s.latex, en: s.en, vn: s.vn });
  const stdLatex = `${quadLatex(a, b, c, v)} = 0`;
  if (rows[0].latex === stdLatex && !std.steps.length) {
    rows[0] = { latex: stdLatex, ...say('It is in standard form: ax² + bx + c = 0.', 'Phương trình ở dạng chuẩn: ax² + bx + c = 0.'), tone: 'key' };
  } else {
    rows.push({ latex: stdLatex, ...say('Standard form: ax² + bx + c = 0.', 'Dạng chuẩn: ax² + bx + c = 0.'), tone: 'key' });
  }
  rows.push({ abc: { a, b, c } });
  return { id: 'standard', title: say('Write it in standard form', 'Viết về dạng chuẩn'), rows };
}

function gcfRows(fac, v) {
  const { a, b, c, g, A, B, C } = fac;
  if (g === 1) return [];
  return [{
    latex: `${quadLatex(a, b, c, v)} = ${g}\\left(${quadLatex(A, B, C, v)}\\right)`,
    ...say(`Every term divides by ${g}, so take ${g} out first. Always look for a common factor before anything else.`,
      `Mọi hạng tử đều chia hết cho ${g}, nên đặt ${g} ra ngoài trước. Luôn tìm nhân tử chung trước tiên.`),
  }];
}

function pairTable(P, S, hit) {
  const rows = signedPairs(P);
  return { pairs: { P, S, rows, hit: hit ? `${hit.m},${hit.n}` : null } };
}

function factorSection(an) {
  const { fac, std } = an;
  const v = std.v;
  const { A, B, C, D } = fac;
  const inner = quadLatex(A, B, C, v);
  const rows = [...gcfRows(fac, v)];
  const done = (extra) => {
    const latex = `${quadLatex(fac.a, fac.b, fac.c, v)} = ${factoredLatex(fac, v)}`;
    const last = rows[rows.length - 1];
    if (last?.latex === latex) { last.tone = 'key'; return; }
    rows.push({ latex: `${quadLatex(fac.a, fac.b, fac.c, v)} = ${factoredLatex(fac, v)}`, ...extra, tone: 'key' });
  };

  if (fac.family === 'common') {
    rows.push({ latex: `${inner} = ${coefX(1, v)}\\left(${binLatex(A, B, v)}\\right)`,
      ...say(`There is no number term (c = 0), so every term has an ${v} in it. Take ${v} out.`,
        `Không có hạng tử tự do (c = 0), nên hạng tử nào cũng có ${v}. Đặt ${v} ra ngoài.`) });
    done(say('Factored.', 'Đã phân tích xong.'));
    return { id: 'factor', title: say('Factor', 'Phân tích thành nhân tử'), method: say(`Common factor ${v}`, `Nhân tử chung ${v}`), rows };
  }

  if (fac.family === 'diff') {
    const { sa, sc } = fac;
    rows.push({
      latex: `${inner} = \\left(${coefX(sa, v)}\\right)^{2} - ${sc}^{2}`,
      ...say('There is no middle term, and both terms are perfect squares with a minus between them: a difference of two squares.',
        'Không có hạng tử giữa, và cả hai hạng tử đều là số chính phương với dấu trừ ở giữa: hiệu hai bình phương.'),
    });
    rows.push({ latex: `A^{2} - B^{2} = (A + B)(A - B)`, ...say('The pattern.', 'Hằng đẳng thức.'), tone: 'muted' });
    done(say('Factored.', 'Đã phân tích xong.'));
    return { id: 'factor', title: say('Factor', 'Phân tích thành nhân tử'), method: say('Difference of two squares', 'Hiệu hai bình phương'), rows };
  }

  if (fac.family === 'pair') {
    const { m, n } = fac.pair;
    rows.push({ note: say(`Find two numbers that multiply to c = ${C} and add to b = ${B}.`, `Tìm hai số có tích bằng c = ${C} và tổng bằng b = ${B}.`), tone: 'tip' });
    rows.push(pairTable(C, B, fac.pair));
    rows.push({ latex: `${paren(m)} \\times ${paren(n)} = ${C} \\qquad ${paren(m)} + ${paren(n)} = ${B}`,
      ...say(`${m} and ${n} work.`, `${m} và ${n} thỏa mãn.`) });
    rows.push({ latex: `${inner} = \\left(${binLatex(1, m, v)}\\right)\\left(${binLatex(1, n, v)}\\right)`,
      ...say('Put each number in its own bracket with x.', 'Đặt mỗi số vào một ngoặc cùng với x.') });
    if (m === n) rows.push({ note: say('Both brackets are the same, so it is a perfect square.', 'Hai ngoặc giống nhau, nên đây là bình phương của một tổng (hiệu).') });
    done(say('Factored. Check: multiply the brackets back out and you get the trinomial again.', 'Đã phân tích xong. Kiểm tra: nhân hai ngoặc lại sẽ được tam thức ban đầu.'));
    return { id: 'factor', title: say('Factor', 'Phân tích thành nhân tử'), method: say('Product–sum: multiply to c, add to b', 'Tích–tổng: tích bằng c, tổng bằng b'), rows };
  }

  if (fac.family === 'ac') {
    const { m, n } = fac.pair;
    const gr = fac.grouping;
    const AC = A * C;
    rows.push({ note: say(`a is not 1, so use the ac method. a × c = ${A} × ${paren(C)} = ${AC}. Find two numbers that multiply to ${AC} and add to b = ${B}.`,
      `a khác 1, nên dùng phương pháp ac. a × c = ${A} × ${paren(C)} = ${AC}. Tìm hai số có tích bằng ${AC} và tổng bằng b = ${B}.`), tone: 'tip' });
    rows.push(pairTable(AC, B, fac.pair));
    rows.push({ latex: `${paren(m)} \\times ${paren(n)} = ${AC} \\qquad ${paren(m)} + ${paren(n)} = ${B}`, ...say(`${m} and ${n} work.`, `${m} và ${n} thỏa mãn.`) });
    rows.push({
      latex: `${inner} = ${coefX(A, v)}^{2} ${m < 0 ? '-' : '+'} ${coefX(Math.abs(m), v)} ${n < 0 ? '-' : '+'} ${coefX(Math.abs(n), v)} ${signed(C)}`,
      ...say(`Split the middle term: ${coefX(B, v)} = ${coefX(m, v)} ${n < 0 ? '−' : '+'} ${coefX(Math.abs(n), v)}.`,
        `Tách hạng tử giữa: ${coefX(B, v)} = ${coefX(m, v)} ${n < 0 ? '−' : '+'} ${coefX(Math.abs(n), v)}.`),
    });
    const first = `${coefX(A, v)}^{2} ${m < 0 ? '-' : '+'} ${coefX(Math.abs(m), v)}`;
    const second = `${coefX(n, v)} ${signed(C)}`;
    rows.push({ latex: `= \\left(${first}\\right) + \\left(${second}\\right)`, ...say('Group the first two terms and the last two terms.', 'Nhóm hai hạng tử đầu và hai hạng tử cuối.') });
    const bin = binLatex(gr.P, gr.Q, v);
    const g1 = gr.g1 === 1 ? v : `${gr.g1}${v}`;
    const g2 = gr.g2 < 0 ? `- ${gr.g2 === -1 ? '1' : -gr.g2}` : `+ ${gr.g2}`;
    rows.push({ latex: `= ${g1}\\left(${bin}\\right) ${g2}\\left(${bin}\\right)`,
      ...say('Take the common factor out of each group. Both brackets must match — if they do, you are on track.',
        'Đặt nhân tử chung của mỗi nhóm ra ngoài. Hai ngoặc phải giống nhau — nếu giống là em đang làm đúng.') });
    rows.push({ latex: `= \\left(${bin}\\right)\\left(${binLatex(gr.g1, gr.g2, v)}\\right)`,
      ...say(`(${bin.replace(/\\/g, '')}) is in both parts, so take it out as a factor.`, `(${bin.replace(/\\/g, '')}) có ở cả hai phần, nên đặt nó ra làm nhân tử chung.`) });
    done(say('Factored.', 'Đã phân tích xong.'));
    return { id: 'factor', title: say('Factor', 'Phân tích thành nhân tử'), method: say('The ac method: split the middle, then group', 'Phương pháp ac: tách hạng tử giữa rồi nhóm'), rows };
  }

  // 'none' or 'roots': it does not factor with whole numbers.
  if (D < 0) {
    rows.push({ note: say(`No two whole numbers multiply to ${A === 1 ? C : A * C} and add to ${B}, so it does not factor. (The discriminant below is negative — there are no real solutions at all.)`,
      `Không có hai số nguyên nào có tích bằng ${A === 1 ? C : A * C} và tổng bằng ${B}, nên không phân tích được. (Biệt thức bên dưới âm — phương trình không có nghiệm thực.)`), tone: 'warn' });
  } else if (fac.family === 'roots') {
    rows.push({ note: say('There is no middle term, but the numbers are not both perfect squares, so it does not factor nicely. Use square roots instead.',
      'Không có hạng tử giữa, nhưng các số không cùng là số chính phương, nên không phân tích đẹp được. Hãy dùng căn bậc hai.'), tone: 'warn' });
  } else {
    rows.push({ note: say(`No two whole numbers multiply to ${A === 1 ? C : A * C} and add to ${B}, so it does not factor nicely. That is exactly when you need the quadratic formula.`,
      `Không có hai số nguyên nào có tích bằng ${A === 1 ? C : A * C} và tổng bằng ${B}, nên không phân tích đẹp được. Đó chính là lúc cần công thức nghiệm.`), tone: 'warn' });
    if (Math.abs(A === 1 ? C : A * C) <= 400) rows.push(pairTable(A === 1 ? C : A * C, B, null));
  }
  return { id: 'factor', title: say('Try to factor', 'Thử phân tích thành nhân tử'), method: say('Does not factor nicely', 'Không phân tích đẹp được'), rows, failed: true };
}

function zeroSection(an) {
  const { fac, std } = an;
  const v = std.v;
  if (!fac.factors) return null;
  const rows = [];
  const brackets = fac.family === 'common'
    ? [[1, 0], fac.factors[1]]
    : fac.factors;
  const same = brackets[0][0] === brackets[1][0] && brackets[0][1] === brackets[1][1];
  rows.push({ latex: `${factoredLatex(fac, v)} = 0`, ...say(
    fac.g > 1 ? `${fac.g} is never 0, so one of the brackets must be 0.` : 'Two things multiply to 0, so one of them must be 0 (the zero product property).',
    fac.g > 1 ? `${fac.g} không bao giờ bằng 0, nên một trong các ngoặc phải bằng 0.` : 'Hai thừa số nhân lại bằng 0, nên một trong hai phải bằng 0 (tính chất tích bằng 0).') });
  const list = same ? [brackets[0]] : brackets;
  for (const [p, q] of list) {
    const z = R(-q, p);
    const lines = [`${binLatex(p, q, v)} = 0`];
    if (q !== 0) lines.push(`${coefX(p, v)} = ${-q}`);
    if (p !== 1 && q !== 0) lines.push(`${v} = ${rLatex(z)}`);
    if (p !== 1 && q === 0) lines.push(`${v} = 0`);
    rows.push({ latex: lines.join(' \\quad\\Rightarrow\\quad '),
      ...say(q === 0 ? `This bracket is just ${coefX(p, v)}, so ${v} = 0 is a solution.` : `Undo the ${q > 0 ? '+' : '−'}${Math.abs(q)}${p !== 1 ? `, then divide by ${p}` : ''}.`,
        q === 0 ? `Ngoặc này chỉ là ${coefX(p, v)}, nên ${v} = 0 là một nghiệm.` : `Chuyển ${q > 0 ? '+' : '−'}${Math.abs(q)} sang vế phải${p !== 1 ? `, rồi chia cho ${p}` : ''}.`) });
  }
  if (same) rows.push({ note: say('Both brackets give the same number, so there is only one solution (a "double root").', 'Hai ngoặc cho cùng một số, nên chỉ có một nghiệm (nghiệm kép).') });
  rows.push({ latex: orLatex(v, fac.zeros.map(rLatex)), tone: 'key', ...say('Solutions from factoring.', 'Nghiệm tìm được bằng phân tích.') });
  return { id: 'zero', title: say('Set each factor equal to 0', 'Cho từng nhân tử bằng 0'), rows };
}

function rootsSection(an) {
  const { fac, std, fm } = an;
  const v = std.v;
  if (fac.family !== 'roots' || fm.D < 0) return null;
  const { A, C, g } = fac;
  const rows = [];
  const inner = quadLatex(A, 0, C, v);
  rows.push({ latex: `${inner} = 0 \\quad\\Rightarrow\\quad ${coefX(A, v)}^{2} = ${-C}`, ...say(g > 1 ? `Divide by ${g}, then move the number across.` : 'Move the number to the other side.', g > 1 ? `Chia cho ${g}, rồi chuyển số sang vế kia.` : 'Chuyển số sang vế bên kia.') });
  const rhs = R(-C, A);
  if (A !== 1) rows.push({ latex: `${v}^{2} = ${rLatex(rhs)}`, ...say(`Divide both sides by ${A}.`, `Chia cả hai vế cho ${A}.`) });
  rows.push({ latex: `${v} = \\pm\\sqrt{${rLatex(rhs)}}`, ...say('Take the square root of both sides — and remember the ±: a positive and a negative number both square to it.', 'Lấy căn bậc hai hai vế — và nhớ dấu ±: cả số dương và số âm bình phương lên đều ra nó.') });
  rows.push({ latex: `${v} = ${pmLatex(fm.reduced)} \\approx \\pm ${approx(Math.abs(fm.decimals[0]))}`, tone: 'key', ...say('Simplified.', 'Rút gọn.') });
  return { id: 'roots', title: say('Square roots', 'Dùng căn bậc hai'), rows };
}

function formulaSection(an) {
  const { fm, std } = an;
  const v = std.v;
  const { a, b, c, D, twoA } = fm;
  const rows = [];
  rows.push({ latex: `${v} = \\dfrac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}`, ...say('The quadratic formula. It works for every quadratic.', 'Công thức nghiệm. Áp dụng được cho mọi phương trình bậc hai.'), tone: 'muted' });
  rows.push({ latex: `${v} = \\dfrac{-(${b}) \\pm \\sqrt{(${b})^{2} - 4(${a})(${c})}}{2(${a})}`,
    ...say(`Substitute a = ${a}, b = ${b}, c = ${c}. Keep negative numbers in brackets.`, `Thế a = ${a}, b = ${b}, c = ${c}. Giữ số âm trong ngoặc.`) });
  const bb = b * b; const fac4 = 4 * a * c;
  rows.push({ latex: `b^{2} - 4ac = ${bb} ${fac4 < 0 ? `+ ${-fac4}` : `- ${fac4}`} = ${D}`,
    ...say(`The discriminant. ${paren(b)}² = ${bb} (a square is never negative)${c < 0 ? ', and minus a negative is plus' : ''}.`,
      `Biệt thức. ${paren(b)}² = ${bb} (bình phương không bao giờ âm)${c < 0 ? ', và trừ một số âm là cộng' : ''}.`) });

  if (D < 0) {
    rows.push({ note: say(`The discriminant is ${D}, which is negative. No real number squares to a negative, so there are no real solutions. The parabola never touches the x-axis.`,
      `Biệt thức bằng ${D}, là số âm. Không có số thực nào bình phương ra số âm, nên phương trình không có nghiệm thực. Parabol không bao giờ chạm trục x.`), tone: 'warn' });
    rows.push({ latex: `${v} = ${pmLatex(fm.reduced, true)}`, ...say('(In Algebra 2 these are written with i = √−1. In Algebra 1, the answer is "no real solutions".)', '(Ở Đại số 2 các nghiệm này được viết với i = √−1. Ở Đại số 1, đáp án là "vô nghiệm thực".)'), tone: 'muted' });
    return { id: 'formula', title: say('Use the quadratic formula', 'Dùng công thức nghiệm'), rows };
  }

  if (fm.kind === 'one') {
    rows.push({ latex: `${v} = \\dfrac{${-b} \\pm \\sqrt{0}}{${twoA}} = \\dfrac{${-b}}{${twoA}} = ${rLatex(fm.roots[0])}`,
      ...say('The discriminant is 0, so ± adds and takes away nothing: one solution.', 'Biệt thức bằng 0, nên ± không cộng cũng không trừ gì: chỉ có một nghiệm.') });
    rows.push({ latex: `${v} = ${rLatex(fm.roots[0])}`, tone: 'key', ...say('One repeated solution.', 'Một nghiệm kép.') });
    return { id: 'formula', title: say('Use the quadratic formula', 'Dùng công thức nghiệm'), rows };
  }

  if (fm.kind === 'rational') {
    const s = fm.sqrt;
    rows.push({ latex: `${v} = \\dfrac{${-b} \\pm \\sqrt{${D}}}{${twoA}} = \\dfrac{${-b} \\pm ${s}}{${twoA}}`,
      ...say(`√${D} = ${s} exactly — a perfect square, which is why it also factors.`, `√${D} = ${s} chính xác — là số chính phương, vì vậy nó cũng phân tích được.`) });
    const plusTop = -b + s; const minusTop = -b - s;
    const plus = fm.plus; const minus = fm.minus;
    const lineFor = (sym, top, val) => `${v} = \\dfrac{${-b} ${sym} ${s}}{${twoA}} = \\dfrac{${top}}{${twoA}} = ${rLatex(val)}`;
    rows.push({ latex: lineFor('+', plusTop, plus), ...say('Use + for one answer…', 'Dùng dấu + cho một nghiệm…') });
    rows.push({ latex: lineFor('-', minusTop, minus), ...say('…and − for the other.', '…và dấu − cho nghiệm còn lại.') });
    rows.push({ latex: orLatex(v, fm.roots.map(rLatex)), tone: 'key', ...say('Same answers as factoring.', 'Cùng đáp án với cách phân tích.') });
    return { id: 'formula', title: say('Use the quadratic formula', 'Dùng công thức nghiệm'), rows };
  }

  // irrational
  const { k, r } = fm.root;
  const { p, k: rk, q } = fm.reduced;
  const g = fm.g;
  const sq = splitLine(D, k, r);
  const top = b === 0 ? '' : `${-b} `;
  rows.push({ latex: `${v} = \\dfrac{${top}\\pm \\sqrt{${D}}}{${twoA}}`, ...say(`${D} is not a perfect square, so the answers are not whole numbers or fractions — they keep a square root.`, `${D} không phải số chính phương, nên nghiệm không phải số nguyên hay phân số — chúng còn dấu căn.`) });
  if (k > 1) rows.push({ latex: sq, ...say(`Simplify the root: find the biggest perfect square that divides ${D}.`, `Rút gọn căn: tìm số chính phương lớn nhất chia hết ${D}.`) });
  rows.push({ latex: `${v} = \\dfrac{${top}\\pm ${rootLatex(k, r)}}{${twoA}}`, ...say(k > 1 ? 'Put the simplified root back in.' : 'The root does not simplify.', k > 1 ? 'Thay căn đã rút gọn vào.' : 'Căn này không rút gọn được.') });
  if (g > 1) {
    rows.push({ latex: `${v} = \\dfrac{${g}\\left(${p === 0 ? '' : `${p} `}\\pm ${rootLatex(rk, r)}\\right)}{${g}${q === 1 ? '' : ` \\cdot ${q}`}} = ${pmLatex(fm.reduced)}`,
      ...say(`Every number on top and the bottom divide by ${g}. Divide ALL of them — not just one.`, `Mọi số ở tử và mẫu đều chia hết cho ${g}. Chia TẤT CẢ — không chỉ một số.`) });
  }
  rows.push({ latex: `${v} = ${pmLatex(fm.reduced)}`, tone: 'key', ...say('Exact answer.', 'Đáp án chính xác.') });
  rows.push({ latex: `${v} \\approx ${approx(fm.decimals[1])} \\quad\\text{or}\\quad ${v} \\approx ${approx(fm.decimals[0])}`,
    ...say('As decimals (to 2 decimal places), if the question asks for them.', 'Dạng thập phân (làm tròn 2 chữ số), nếu đề yêu cầu.') });
  return { id: 'formula', title: say('Use the quadratic formula', 'Dùng công thức nghiệm'), rows };
}

/** √72 = √(36 · 2) = 6√2 */
function splitLine(D, k, r) {
  return `\\sqrt{${D}} = \\sqrt{${k * k} \\cdot ${r}} = ${rootLatex(k, r)}`;
}

function answerOf(an) {
  const { fm, std } = an;
  const v = std.v;
  if (fm.kind === 'none') {
    return { count: 0, latex: '\\text{No real solutions}', points: [], ...say('No real solutions: the discriminant is negative, so the graph never crosses the x-axis.', 'Vô nghiệm thực: biệt thức âm, nên đồ thị không cắt trục x.') };
  }
  if (fm.kind === 'irrational') {
    return {
      count: 2, latex: `${v} = ${pmLatex(fm.reduced)}`,
      points: fm.decimals.map((x) => `(${approx(x)},\\ 0)`),
      ...say('Two solutions. The graph crosses the x-axis twice, at these points (rounded).', 'Hai nghiệm. Đồ thị cắt trục x hai lần, tại các điểm này (đã làm tròn).'),
    };
  }
  const list = fm.roots;
  return {
    count: list.length, latex: orLatex(v, list.map(rLatex)),
    points: list.map((z) => `(${rLatex(z)},\\ 0)`),
    ...(list.length === 1
      ? say('One solution. The vertex of the parabola sits right on the x-axis.', 'Một nghiệm. Đỉnh của parabol nằm ngay trên trục x.')
      : say('Two solutions. The graph crosses the x-axis at these two points.', 'Hai nghiệm. Đồ thị cắt trục x tại hai điểm này.')),
  };
}

// ------------------------------------------------------------------ the whole solution

export function solveSteps(input) {
  const an = analyse(input);
  if (!an.ok) return { ok: false, error: { en: an.en, vn: an.vn }, code: an.code };
  if (an.kind === 'constant') {
    return { ok: false, code: 'constant', error: say('There is no x left once everything is on one side, so there is nothing to solve.', 'Khi chuyển hết về một vế thì không còn x, nên không có gì để giải.') };
  }
  if (an.kind === 'linear') {
    const { std, parsed } = an;
    const lin = R(-std.c, std.b);
    return {
      ok: false, code: 'linear',
      error: say(`That is not a quadratic — there is no ${std.v}² term, so it is a linear equation: ${std.v} = ${lin.d === 1 ? lin.n : `${lin.n}/${lin.d}`}.`,
        `Đây không phải phương trình bậc hai — không có hạng tử ${std.v}², nên là phương trình bậc nhất: ${std.v} = ${lin.d === 1 ? lin.n : `${lin.n}/${lin.d}`}.`),
      eqLatex: originalLatex(parsed),
    };
  }
  const { std, fac, fm } = an;
  const sections = [standardSection(an), factorSection(an)];
  const zs = zeroSection(an); if (zs) sections.push(zs);
  const rs = rootsSection(an); if (rs) sections.push(rs);
  sections.push(formulaSection(an));
  return {
    ok: true,
    kind: 'quadratic',
    v: std.v,
    eqLatex: originalLatex(an.parsed),
    std: { a: std.a, b: std.b, c: std.c },
    moved: std.moved,
    factored: fac.factors ? factoredLatex(fac, std.v) : null,
    family: fac.family,
    D: fm.D,
    fm,
    fac,
    sections,
    answer: answerOf(an),
    graph: { a: std.a, b: std.b, c: std.c, zeros: realZeros(fm) },
  };
}

/** Convenience for the challenge checks: the tally of what this quadratic is. */
export function traitsOf(sol) {
  if (!sol?.ok) return null;
  const { fac, fm } = sol;
  return {
    factors: !!fac.factors,
    aIsOne: fac.A === 1,
    gcf: fac.g > 1,
    family: fac.family,
    D: fm.D,
    count: fm.count,
    zeros: fm.kind === 'rational' || fm.kind === 'one' ? fm.roots.map((z) => ({ ...z })) : null,
    irrational: fm.kind === 'irrational',
    a: sol.std.a,
  };
}

export { rVal, gcd };

// ------------------------------------------------------------------ the solver's challenges

/**
 * What the Quad Solver pays XP for: not for typing, but for FINDING a
 * quadratic of a given kind — which only a student who understands what makes
 * a quadratic factor, or have no real roots, can do on purpose. A unit lists
 * its challenges as { id, type, en, vn, zeros? }; `type` is one of these.
 */
export const CHALLENGE_TYPES = {
  pair: (s) => s.family === 'pair',                       // factors, a = 1
  ac: (s) => s.family === 'ac',                           // factors, a ≠ 1 (after the GCF)
  gcf: (s) => s.fac.g > 1 && !!s.fac.factors,             // a common factor first
  diff: (s) => s.family === 'diff',                       // difference of two squares
  common: (s) => s.family === 'common',                   // c = 0, take out x
  irrational: (s) => s.fm.kind === 'irrational',          // does not factor: formula only
  none: (s) => s.fm.kind === 'none',                      // no real solutions
  one: (s) => s.fm.kind === 'one',                        // one repeated solution
  rearrange: (s) => s.moved,                              // typed with terms on both sides
  zeros: (s, ch) => {                                     // build one with these zeros
    if (!(s.fm.kind === 'rational' || s.fm.kind === 'one')) return false;
    const want = (ch.zeros || []).map((z) => R(z.n ?? z, z.d ?? 1));
    const got = s.fm.roots;
    const uniq = want.filter((w, i) => want.findIndex((x) => x.n === w.n && x.d === w.d) === i);
    return uniq.length === got.length && uniq.every((w) => got.some((g) => g.n === w.n && g.d === w.d));
  },
};

export const challengeMet = (ch, sol) => !!sol?.ok && !!CHALLENGE_TYPES[ch.type]?.(sol, ch);
