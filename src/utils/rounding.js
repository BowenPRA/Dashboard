// src/utils/rounding.js
//
// Rounding for Year 7 Maths 3.2: the place a question asks for, the digit that
// decides, and the name of the slip behind a wrong answer. Every answer is
// derived from the number and the degree of accuracy (utils/decimal.js); an
// item never stores one.
//
// `places` is the degree of accuracy as a number: 1, 2, 3 … decimal places;
// 0 the nearest whole number; −1 the nearest 10; −2 the nearest 100; −3 the
// nearest 1000.

import { readDec, dec, decText, roundTo, truncTo, sameValue, hasForm, roundSig, placesOf } from './decimal.js';

export const PLACE_RANGE = [-3, 5];

/** "2 decimal places", "the nearest 10" — EN and VN. */
export function placeName(places) {
  if (places > 0) return { en: `${places} decimal place${places > 1 ? 's' : ''}`, vn: `${places} chữ số thập phân` };
  if (places === 0) return { en: 'the nearest whole number', vn: 'số nguyên gần nhất' };
  const tens = { '-1': ['10', 'chục'], '-2': ['100', 'trăm'], '-3': ['1000', 'nghìn'] }[String(places)];
  return { en: `the nearest ${tens[0]}`, vn: `hàng ${tens[1]} gần nhất` };
}

/** Short form for a chip: "1 d.p.", "nearest 10". */
export function placeShort(places) {
  if (places > 0) return { en: `${places} d.p.`, vn: `${places} c.s.t.p.` };
  if (places === 0) return { en: 'nearest whole', vn: 'số nguyên gần nhất' };
  const tens = { '-1': ['10', 'chục'], '-2': ['100', 'trăm'], '-3': ['1000', 'nghìn'] }[String(places)];
  return { en: `nearest ${tens[0]}`, vn: `hàng ${tens[1]}` };
}

/** The column name of a place exponent (0 ones, −1 tenths …). */
export function columnName(k) {
  const EN = { 3: 'thousands', 2: 'hundreds', 1: 'tens', 0: 'ones', '-1': 'tenths', '-2': 'hundredths', '-3': 'thousandths', '-4': 'ten-thousandths', '-5': 'hundred-thousandths' };
  const VN = { 3: 'hàng nghìn', 2: 'hàng trăm', 1: 'hàng chục', 0: 'hàng đơn vị', '-1': 'hàng phần mười', '-2': 'hàng phần trăm', '-3': 'hàng phần nghìn', '-4': 'hàng phần chục nghìn', '-5': 'hàng phần trăm nghìn' };
  return { en: EN[k] || `10^${k}`, vn: VN[k] || `10^${k}` };
}

/**
 * Everything about rounding `n` to `places`:
 *   keepPlace     the exponent of the last digit kept (1 d.p. → −1)
 *   deciderPlace  the digit straight after it, the one that decides
 *   decider       its value (0 when the number stops before it)
 *   up            does the kept digit go up?
 *   carries       does going up ripple left (34.98 → 35.0)?
 *   trailingZero  does the written answer end in a zero after the point?
 */
export function roundModel(n, places) {
  const v = typeof n === 'string' ? dec(n) : n;
  const digits = placesOf(v);
  const keepPlace = -places;
  const deciderPlace = keepPlace - 1;
  const decider = digits[deciderPlace] ?? 0;
  const answer = roundTo(v, places);
  const chopped = truncTo(v, places);
  const up = !sameValue(answer, chopped);
  const keptDigit = digits[keepPlace] ?? 0;
  const text = decText(answer);
  return {
    v, places, digits, keepPlace, deciderPlace, decider, answer, text, up,
    carries: up && keptDigit === 9,
    trailingZero: places > 0 && text.endsWith('0'),
    alreadyThere: v.dp <= Math.max(places, 0) && sameValue(v, answer),
  };
}

/**
 * Mark a typed rounded answer. `{ ok, code, en, vn }`, where a wrong answer is
 * named: 'dropzero' (35 for 35.0), 'extra' (too many places), 'truncated' (chopped
 * without looking at the next digit), 'twice' (rounded one place, then again),
 * 'sigfig' (counted places from the front), 'otherplace' (rounded to the wrong
 * place), 'notrounded', 'value'. 'empty', 'comma' and 'unreadable' are not
 * mistakes — the caller should nudge, not count a try.
 */
export function diagnoseRound(n, places, typed) {
  const m = typeof n === 'object' && n.answer ? n : roundModel(n, places);
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  const want = placeName(m.places);

  if (sameValue(t, m.answer)) {
    if (hasForm(t, m.places)) return { ok: true, code: 'ok' };
    if (m.places > 0 && t.dp < m.places) {
      return {
        ok: false, code: 'dropzero',
        en: `Right value — but ${want.en} means ${m.places === 1 ? 'one digit' : `${m.places} digits`} after the point. Keep the zero at the end: it shows how exact the answer is.`,
        vn: `Đúng giá trị — nhưng ${want.vn} nghĩa là có ${m.places} chữ số sau dấu thập phân. Hãy giữ số 0 ở cuối: nó cho biết đáp án chính xác đến đâu.`,
      };
    }
    return {
      ok: false, code: 'extra',
      en: `Right value, but it is written with too many decimal places. ${cap(want.en)} is what the question asks for.`,
      vn: `Đúng giá trị, nhưng em viết thừa chữ số thập phân. Đề bài yêu cầu ${want.vn}.`,
    };
  }
  if (sameValue(t, m.v) && !sameValue(m.v, m.answer)) {
    return { ok: false, code: 'notrounded', en: 'That is the number itself — it has not been rounded yet.', vn: 'Đó chính là số ban đầu — em chưa làm tròn.' };
  }
  const chopped = truncTo(m.v, m.places);
  if (m.up && sameValue(t, chopped)) {
    return {
      ok: false, code: 'truncated',
      en: `You cut the number off without looking at the next digit. It is ${m.decider}, which is 5 or more, so the last digit you keep goes up.`,
      vn: `Em cắt bỏ luôn mà không nhìn chữ số tiếp theo. Chữ số đó là ${m.decider}, từ 5 trở lên, nên chữ số cuối cùng được giữ lại phải tăng lên.`,
    };
  }
  if (m.places < PLACE_RANGE[1] && m.v.dp > m.places + 1) {
    const twice = roundTo(roundTo(m.v, m.places + 1), m.places);
    if (!sameValue(twice, m.answer) && sameValue(t, twice)) {
      return {
        ok: false, code: 'twice',
        en: 'You rounded twice — one place first, then again. Round once, from the original number: look only at the digit straight after the place you want.',
        vn: 'Em đã làm tròn hai lần — một cột trước, rồi làm tròn tiếp. Chỉ làm tròn một lần, từ số ban đầu: chỉ nhìn chữ số ngay sau vị trí em cần.',
      };
    }
  }
  if (m.places > 0) {
    const sig = roundSig(m.v, m.places);
    if (!sameValue(sig, m.answer) && sameValue(t, sig)) {
      return {
        ok: false, code: 'sigfig',
        en: 'You counted from the front of the number. Decimal places are counted from the point: only the digits after it.',
        vn: 'Em đã đếm từ đầu số. Chữ số thập phân được đếm từ dấu thập phân: chỉ những chữ số đứng sau nó.',
      };
    }
  }
  for (let p = PLACE_RANGE[0]; p <= PLACE_RANGE[1]; p += 1) {
    if (p === m.places) continue;
    const other = roundTo(m.v, p);
    if (sameValue(t, other) && hasForm(t, p) && !sameValue(other, m.answer)) {
      const got = placeName(p);
      return {
        ok: false, code: 'otherplace',
        en: `That is rounded to ${got.en}. The question asks for ${want.en}.`,
        vn: `Đó là làm tròn đến ${got.vn}. Đề bài yêu cầu ${want.vn}.`,
      };
    }
  }
  return {
    ok: false, code: 'value',
    en: `Not quite. Find the last digit you keep for ${want.en}, then look at the very next digit: 5 or more goes up, 4 or less stays.`,
    vn: `Chưa đúng. Tìm chữ số cuối cùng được giữ lại khi làm tròn đến ${want.vn}, rồi nhìn chữ số ngay sau nó: từ 5 trở lên thì tăng, từ 4 trở xuống thì giữ nguyên.`,
  };
}

/** A typed answer that cannot be marked yet — say why, do not count a try. */
export function readProblem(code) {
  if (code === 'empty') return { ok: false, code, soft: true, en: 'Type a number first.', vn: 'Hãy nhập một số trước.' };
  if (code === 'comma') {
    return {
      ok: false, code, soft: true,
      en: 'Write the decimal point as a dot — 8.286, not 8,286 — and leave out commas between thousands.',
      vn: 'Hãy viết dấu thập phân bằng dấu chấm — 8.286, không phải 8,286 — và đừng dùng dấu phẩy giữa các hàng nghìn.',
    };
  }
  return { ok: false, code, soft: true, en: 'That is not a number I can read. Use digits and one decimal point.', vn: 'Đó không phải là một số hợp lệ. Hãy dùng chữ số và một dấu thập phân.' };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** The authored `to` of a round item/activity is sound. */
export function checkPlaces(places) {
  return Number.isInteger(places) && places >= PLACE_RANGE[0] && places <= PLACE_RANGE[1];
}
