// src/components/science/labMarking.js
//
// Particle Lab's answer shaping, marking and explanations — the screen's side
// of utils/particles.js. Kept out of the .jsx so the component file exports
// only components, and so a Node script can feed every generated round its
// right answer in exactly the shape the screen builds.
//
// Every mark* takes the student's raw inputs (typed strings, a tray of counts,
// a list of tapped chips, a button's value) and returns { ok, … }. Every
// explain* returns { en, vn } text derived from the round itself.

import { SUBSTANCES, countsOf, diagnoseFormula, formulaPretty, elementsFromName, keyOfElements, isCompound } from '../../utils/particles.js';
import { elementBySymbol } from '../../utils/elements.js';

const E = (sym) => elementBySymbol(sym) || { sym, en: sym, vn: sym };
const F = (formula) => formulaPretty(formula);
const listEn = (a) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
const listVn = (a) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} và ${a[a.length - 1]}`);
const elEn = (sym) => `${E(sym).en} (${sym})`;
const elVn = (sym) => `${E(sym).vn} (${sym})`;
const subEn = (f) => `${SUBSTANCES[f]?.en || f} (${F(f)})`;
const subVn = (f) => `${SUBSTANCES[f]?.vn || f} (${F(f)})`;

/** Fill and stroke of an atom in the drawings (the util's own fallback for an unstyled element). */
export const atomStyleOf = (sym) => {
  const k = keyOfElements([sym])[0];
  return [k.fill, k.stroke];
};

/**
 * The canvas a box of particles is drawn on. boxSvg's default 320×240 is too
 * tight for 5–7 molecules at scale 0.8: in ~7% of classify/pure boxes a
 * particle finds no free spot and is dropped on top of another, which reads
 * as "bonded" in a task about bonding. 400×300 (same atom size, drawn a little
 * smaller) placed 6000 generated boxes with no overlap.
 */
export const BOX_OPTS = { w: 400, h: 300 };

/** A whole number typed in a box, or null. */
export function toCount(v) {
  const s = String(v ?? '').trim();
  return /^\d{1,3}$/.test(s) ? Number(s) : null;
}

/** The elements in a box of particles, in the order they first appear. */
export function elementsIn(particles) {
  const out = [];
  for (const f of new Set(particles || [])) for (const c of countsOf(f)) if (!out.includes(c.el)) out.push(c.el);
  return out;
}

// ------------------------------------------------------------------ count

/**
 * A formula read symbol by symbol: each written symbol with its own small
 * number and the bracket multipliers around it. Ca(NO3)2 →
 * [{el:Ca,sub:1,mults:[]}, {el:N,sub:1,mults:[2]}, {el:O,sub:3,mults:[2]}]
 */
export function readFormula(formula) {
  const s = String(formula);
  const out = [];
  const opens = [];
  let i = 0;
  const readInt = () => { let n = ''; while (i < s.length && s[i] >= '0' && s[i] <= '9') n += s[i++]; return n; };
  while (i < s.length) {
    const ch = s[i];
    if (ch === '(') { opens.push(out.length); i += 1; }
    else if (ch === ')') {
      i += 1;
      const n = readInt();
      const from = opens.pop() ?? 0;
      for (let j = from; j < out.length; j += 1) out[j].mults.push(n ? Number(n) : 1);
    } else if (ch >= 'A' && ch <= 'Z') {
      let el = ch;
      i += 1;
      if (i < s.length && s[i] >= 'a' && s[i] <= 'z') el += s[i++];
      const n = readInt();
      out.push({ el, sub: n ? Number(n) : 1, written: !!n, mults: [] });
    } else i += 1;
  }
  return out;
}

export const countReady = (round, d) => toCount(d.elements) != null && toCount(d.total) != null
  && round.counts.every((c) => toCount(d.per?.[c.el]) != null);

/** draft: { elements, per: { [el]: typed }, total } → { ok, fields: { elements, total, per: { [el]: bool } } } */
export function markCount(round, { elements, per = {}, total } = {}) {
  const fields = {
    elements: toCount(elements) === round.elements,
    total: toCount(total) === round.total,
    per: Object.fromEntries(round.counts.map((c) => [c.el, toCount(per[c.el]) === c.n])),
  };
  return { ok: fields.elements && fields.total && Object.values(fields.per).every(Boolean), fields };
}

export function explainCount(round) {
  const brackets = round.formula.includes('(');
  const rule = {
    en: `The small number counts the symbol just before it. No number means one.${brackets ? ' A number after a bracket multiplies everything inside the bracket.' : ''}`,
    vn: `Số nhỏ đếm kí hiệu đứng ngay trước nó. Không có số nghĩa là một.${brackets ? ' Số đứng sau dấu ngoặc nhân với mọi thứ bên trong ngoặc.' : ''}`,
  };
  const reads = readFormula(round.formula);
  const term = (c, noNumber) => {
    const occ = reads.filter((r) => r.el === c.el);
    const pieces = occ.map((r) => [r.sub, ...r.mults].join(' × '));
    const plain = occ.length === 1 && !occ[0].mults.length;
    if (plain) return `${c.el}: ${c.n}${!occ[0].written ? ` ${noNumber}` : ''}`;
    return `${c.el}: ${pieces.join(' + ')} = ${c.n}`;
  };
  const sum = `${round.counts.map((c) => c.n).join(' + ')} = ${round.total}`;
  const working = {
    en: `${round.counts.map((c) => term(c, '(no number)')).join(' · ')}. So ${F(round.formula)} has ${round.elements} element${round.elements === 1 ? '' : 's'} and ${sum} atoms.`,
    vn: `${round.counts.map((c) => term(c, '(không có số)')).join(' · ')}. Vậy ${F(round.formula)} có ${round.elements} nguyên tố và ${sum} nguyên tử.`,
  };
  return { rule, working };
}

// ------------------------------------------------------------------ formula

const normaliseTyped = (typed) => String(typed ?? '').replace(/\s+/g, '').replace(/[₀-₉]/g, (d) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(d)));

/** diagnoseFormula, plus: a written "1" (H2O1) is right but never written — not an order slip. */
export function markFormula(round, typed) {
  const d = diagnoseFormula(round.formula, typed);
  if (!d.ok || !d.order) return d;
  const t = normaliseTyped(typed);
  if (t.replace(/([A-Za-z)])1(?!\d)/g, '$1') === round.formula) {
    return { ok: true, note: 'one', en: `Right — but a 1 is never written: ${F(round.formula)}.`, vn: `Đúng — nhưng số 1 không bao giờ được viết: ${F(round.formula)}.` };
  }
  return { ok: true, note: 'order', en: `Right — it is usually written ${F(round.formula)}.`, vn: `Đúng — công thức này thường được viết là ${F(round.formula)}.` };
}

export function explainFormula(round) {
  const name = round.name || {};
  return {
    en: `Count the atoms of each colour: ${round.counts.map((c) => `${c.n} × ${elEn(c.el)}`).join(', ')}. The small number goes after the symbol, and no number means one: ${F(round.formula)}${name.en ? `, ${name.en}` : ''}.`,
    vn: `Đếm nguyên tử mỗi màu: ${round.counts.map((c) => `${c.n} × ${elVn(c.el)}`).join(', ')}. Số nhỏ đứng sau kí hiệu, không có số nghĩa là một: ${F(round.formula)}${name.vn ? `, ${name.vn}` : ''}.`,
  };
}

// ------------------------------------------------------------------ build

/** tray: { [el]: n } → { ok, off: [{ el, have, need }], lines: [{ en, vn }] } */
export function markBuild(round, tray = {}) {
  const want = Object.fromEntries(round.counts.map((c) => [c.el, c.n]));
  const syms = [...new Set([...round.counts.map((c) => c.el), ...(round.palette || []), ...Object.keys(tray)])];
  const off = syms.map((el) => ({ el, have: tray[el] || 0, need: want[el] || 0 })).filter((o) => o.have !== o.need);
  const f = F(round.formula);
  const lines = off.map(({ el, have, need }) => {
    if (!need) return { en: `${f} has no ${elEn(el)} — take ${have === 1 ? 'it' : 'them'} out.`, vn: `${f} không có ${elVn(el)} — hãy bỏ ra.` };
    const atoms = `atom${need === 1 ? '' : 's'}`;
    if (have < need) return { en: `${f} needs ${need} ${elEn(el)} ${atoms} — you have ${have}.`, vn: `${f} cần ${need} nguyên tử ${elVn(el)} — bạn đang có ${have}.` };
    return { en: `${f} needs only ${need} ${elEn(el)} ${atoms} — you have ${have}.`, vn: `${f} chỉ cần ${need} nguyên tử ${elVn(el)} — bạn đang có ${have}.` };
  });
  return { ok: !off.length, off, lines };
}

export function explainBuild(round) {
  const name = round.name || {};
  return {
    en: `${F(round.formula)}${name.en ? ` (${name.en})` : ''} is ${listEn(round.counts.map((c) => `${c.n} ${E(c.el).en} atom${c.n === 1 ? '' : 's'}`))} bonded together. The small number counts the atom before it; no number means one.`,
    vn: `${F(round.formula)}${name.vn ? ` (${name.vn})` : ''} gồm ${listVn(round.counts.map((c) => `${c.n} nguyên tử ${E(c.el).vn}`))} liên kết với nhau. Số nhỏ đếm nguyên tử đứng trước nó; không có số nghĩa là một.`,
  };
}

// ------------------------------------------------------------------ name

/** chips: [el] → { ok, missed, extra } */
export function markName(round, chips = []) {
  const got = new Set(chips);
  const want = new Set(round.answer);
  const missed = round.answer.filter((s) => !got.has(s));
  const extra = [...got].filter((s) => !want.has(s));
  return { ok: !missed.length && !extra.length, missed, extra };
}

/** One line per word of the name (metal/first word, -ide, -ate, hydroxide, mono/di), then the elements. */
export function explainName(round) {
  const sub = round.name || {};
  const lines = [];
  for (const part of sub.parts || []) {
    if (part === 'mono' || part === 'di') {
      lines.push({ en: `"${part}-" counts the oxygen atoms (${part === 'di' ? 'two' : 'one'}) — it adds no new element.`, vn: `"${part}-" đếm số nguyên tử oxi (${part === 'di' ? 'hai' : 'một'}) — nó không thêm nguyên tố mới.` });
      continue;
    }
    const els = elementsFromName({ parts: [part] }) || [];
    if (!els.length) continue;
    if (part === 'hydroxide') {
      lines.push({ en: `"hydroxide" = ${elEn('O')} + ${elEn('H')}.`, vn: `"hydroxide" (hiđroxit) = ${elVn('O')} + ${elVn('H')}.` });
    } else if (/ate$/.test(part)) {
      const x = els.find((s) => s !== 'O') || els[0];
      lines.push({ en: `"-ate": ${part} = ${elEn(x)} + ${elEn('O')}. The ending adds oxygen.`, vn: `"-ate": ${part} = ${elVn(x)} + ${elVn('O')}. Đuôi này thêm oxi.` });
    } else if (/ide$/.test(part)) {
      lines.push({ en: `"-ide": ${part} is just ${elEn(els[0])}.`, vn: `"-ide": ${part} chỉ là ${elVn(els[0])}.` });
    } else {
      lines.push({ en: `"${part}" is an element: ${elEn(els[0])}.`, vn: `"${part}" là một nguyên tố: ${elVn(els[0])}.` });
    }
  }
  const summary = {
    en: `So ${sub.en || F(round.formula)} contains ${listEn(round.answer.map(elEn))}: ${F(round.formula)}.`,
    vn: `Vậy ${sub.vn || F(round.formula)} gồm ${listVn(round.answer.map(elVn))}: ${F(round.formula)}.`,
  };
  return { lines, summary };
}

// ------------------------------------------------------------------ boxes

export const markClassify = (round, choice) => ({ ok: choice === round.verdict.kind });

/** draft: { choice: 'pure' | 'mixture', count: typed } */
export function markPure(round, { choice, count } = {}) {
  const choiceOk = (choice === 'pure') === round.verdict.pure && (choice === 'pure' || choice === 'mixture');
  const countOk = toCount(count) === round.verdict.substances.length;
  return { ok: choiceOk && countOk, choiceOk, countOk };
}

export const markMagnet = (round, yes) => ({ ok: yes === round.verdict.magnet });

const kindWord = (f) => (isCompound(f) ? { en: 'a compound', vn: 'hợp chất' } : { en: 'an element', vn: 'nguyên tố' });
const MIX = {
  elements: { en: 'a mixture of elements', vn: 'hỗn hợp các nguyên tố' },
  compounds: { en: 'a mixture of compounds', vn: 'hỗn hợp các hợp chất' },
  both: { en: 'a mixture of elements and compounds', vn: 'hỗn hợp gồm cả nguyên tố và hợp chất' },
};

/** Element / compound / mixture, from the verdict. */
export function explainBox(verdict) {
  const subs = verdict.substances;
  if (verdict.kind === 'element') {
    const f = subs[0];
    const el = countsOf(f)[0].el;
    return {
      en: `Every particle is ${subEn(f)}, and every atom in it is ${elEn(el)}. One kind of particle, made of one kind of atom: an element.`,
      vn: `Mọi hạt đều là ${subVn(f)}, và mọi nguyên tử trong đó đều là ${elVn(el)}. Một loại hạt, chỉ gồm một loại nguyên tử: một nguyên tố.`,
    };
  }
  if (verdict.kind === 'compound') {
    const f = subs[0];
    const els = countsOf(f).map((c) => c.el);
    return {
      en: `Every particle is ${subEn(f)}: ${listEn(els.map(elEn))} atoms bonded together. One kind of particle with different atoms bonded: a compound.`,
      vn: `Mọi hạt đều là ${subVn(f)}: các nguyên tử ${listVn(els.map(elVn))} liên kết với nhau. Một loại hạt gồm các nguyên tử khác nhau liên kết: một hợp chất.`,
    };
  }
  const mix = MIX[verdict.mixtureOf] || MIX.both;
  return {
    en: `There are ${subs.length} kinds of particle: ${listEn(subs.map((f) => `${SUBSTANCES[f]?.en || f} (${F(f)}, ${kindWord(f).en})`))}. More than one kind of particle: ${mix.en}.`,
    vn: `Có ${subs.length} loại hạt: ${listVn(subs.map((f) => `${SUBSTANCES[f]?.vn || f} (${F(f)}, ${kindWord(f).vn})`))}. Nhiều hơn một loại hạt: ${mix.vn}.`,
  };
}

/** Pure or a mixture, and how many substances. */
export function explainPure(verdict) {
  const subs = verdict.substances;
  if (verdict.pure) {
    const k = kindWord(subs[0]);
    return {
      en: `Only one kind of particle: ${subEn(subs[0])}. One substance, so it is pure — ${k.en}.`,
      vn: `Chỉ có một loại hạt: ${subVn(subs[0])}. Một chất, nên nó tinh khiết — một ${k.vn}.`,
    };
  }
  const mix = MIX[verdict.mixtureOf] || MIX.both;
  return {
    en: `${subs.length} different kinds of particle: ${listEn(subs.map(subEn))}. That is ${subs.length} substances mixed together, so it is not pure: ${mix.en}.`,
    vn: `${subs.length} loại hạt khác nhau: ${listVn(subs.map(subVn))}. Đó là ${subs.length} chất trộn lẫn với nhau, nên không tinh khiết: ${mix.vn}.`,
  };
}

/** Free iron → yes; iron bonded in a compound → no; no iron → no. */
export function explainMagnet(verdict) {
  const subs = verdict.substances;
  const others = subs.filter((f) => f !== 'Fe');
  if (verdict.magnet) {
    return {
      en: `The iron particles (Fe) are free — not bonded to ${listEn(others.map(subEn)) || 'anything'}. A mixture keeps the properties of what is in it, so a magnet pulls the iron out.`,
      vn: `Các hạt sắt (Fe) tự do — không liên kết với ${listVn(others.map(subVn)) || 'chất nào'}. Hỗn hợp giữ nguyên tính chất của các chất trong nó, nên nam châm hút được sắt ra.`,
    };
  }
  const bonded = subs.find((f) => f !== 'Fe' && countsOf(f).some((c) => c.el === 'Fe'));
  if (bonded) {
    const partners = countsOf(bonded).map((c) => c.el).filter((el) => el !== 'Fe');
    return {
      en: `Every iron atom is bonded to ${listEn(partners.map(elEn))}: ${subEn(bonded)}, a new substance with new properties. It is not magnetic, so a magnet pulls nothing out.`,
      vn: `Mỗi nguyên tử sắt đều liên kết với ${listVn(partners.map(elVn))}: ${subVn(bonded)}, một chất mới với tính chất mới. Nó không bị nam châm hút, nên nam châm không hút được gì ra.`,
    };
  }
  return {
    en: `There is no iron in this box — only ${listEn(subs.map(subEn))}. A magnet has no iron to pull out.`,
    vn: `Không có sắt trong hộp này — chỉ có ${listVn(subs.map(subVn))}. Nam châm không có sắt để hút ra.`,
  };
}
