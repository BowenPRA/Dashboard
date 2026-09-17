// src/utils/elementHunt.js
//
// Element Hunt — the generative task for Science 2.5. A session is a run of
// rounds drawn fresh from a seed, cycling through the unit's modes, so a
// second attempt asks about different elements:
//
//   find    a NAME is given; tap its tile (the tiles show symbols only)
//   symbol  a name is given; type the symbol (capital letters marked)
//   name    a symbol is given; choose the element's name from four
//   place   tap by period / group: one tile, a whole row or column, or
//           "the others in the same group as helium"
//   metal   tap every metal (or non-metal) in a period, or decide one element
//   mass    which of two elements has the heavier atoms?
//
// Everything a round marks against comes from utils/elements.js.

import { FIRST_20, elementBySymbol, querySymbols, queryWords, symbolWay, diagnoseSymbol } from './elements.js';
import { rngFrom } from './labBench.js';

export const HUNT_MODES = ['find', 'symbol', 'name', 'place', 'metal', 'mass'];

const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const shuffle = (rng, list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** Elements that are easy to confuse with `el`: a shared first letter first. */
function lookalikes(el, rng) {
  const same = FIRST_20.filter((e) => e.sym !== el.sym && (e.sym[0] === el.sym[0] || e.en[0] === el.en[0]));
  const rest = FIRST_20.filter((e) => e.sym !== el.sym && !same.includes(e));
  return [...shuffle(rng, same), ...shuffle(rng, rest)].slice(0, 3);
}

function roundFind(rng) {
  const el = pick(rng, FIRST_20);
  return { mode: 'find', kind: 'tap', ask: { en: `Tap ${el.en}.`, vn: `Chạm vào ${el.vn} (${el.en}).` }, targets: [el.sym], hideNames: true,
    explain: { en: `${cap(el.en)} is ${el.sym}: period ${el.period}${el.group ? `, group ${el.group}` : ''}. Its symbol is ${symbolWay(el).en}.`, vn: `${el.vn} là ${el.sym}: chu kì ${el.period}${el.group ? `, nhóm ${el.group}` : ''}. Kí hiệu của nó là ${symbolWay(el).vn}.` } };
}

function roundSymbol(rng) {
  // Latin symbols and two-letter symbols are where the marks go; weight them.
  const pool = rng() < 0.4 ? FIRST_20.filter((e) => e.latin || e.sym.length === 2) : FIRST_20;
  const el = pick(rng, pool);
  return { mode: 'symbol', kind: 'type', ask: { en: `Type the symbol for ${el.en}.`, vn: `Nhập kí hiệu của ${el.vn} (${el.en}).` }, answer: el.sym, element: el.sym,
    explain: { en: `${cap(el.en)} is ${el.sym} — ${symbolWay(el).en}. Capital first, small second.`, vn: `${el.vn} là ${el.sym} — ${symbolWay(el).vn}. Chữ đầu viết hoa, chữ sau viết thường.` } };
}

function roundName(rng) {
  const el = pick(rng, FIRST_20);
  const options = shuffle(rng, [el, ...lookalikes(el, rng)]).map((e) => ({ val: e.sym, en: e.en, vn: e.vn }));
  return { mode: 'name', kind: 'choice', ask: { en: `Which element has the symbol ${el.sym}?`, vn: `Nguyên tố nào có kí hiệu ${el.sym}?` }, options, answer: el.sym,
    explain: { en: `${el.sym} is ${el.en} — ${symbolWay(el).en}.`, vn: `${el.sym} là ${el.vn} (${el.en}) — ${symbolWay(el).vn}.` } };
}

function roundPlace(rng) {
  const shape = pick(rng, ['cell', 'cell', 'group', 'period', 'sameGroup', 'samePeriod']);
  let q;
  if (shape === 'cell') { const el = pick(rng, FIRST_20.filter((e) => e.group)); q = { period: el.period, group: el.group }; }
  else if (shape === 'group') q = { group: 1 + Math.floor(rng() * 8) };
  else if (shape === 'period') q = { period: 1 + Math.floor(rng() * 3) + 1 };
  else if (shape === 'sameGroup') q = { sameGroupAs: pick(rng, FIRST_20.filter((e) => e.group && e.period <= 3)).sym };
  else q = { samePeriodAs: pick(rng, FIRST_20.filter((e) => e.period === 2 || e.period === 3)).sym };
  const targets = querySymbols(q);
  if (!targets.length) return roundPlace(rng);
  const explain = q.group != null && q.period != null
    ? { en: `Period ${q.period} is row ${q.period}; group ${q.group} is column ${q.group}. They cross at ${targets[0]}.`, vn: `Chu kì ${q.period} là hàng ${q.period}; nhóm ${q.group} là cột ${q.group}. Chúng giao nhau ở ${targets[0]}.` }
    : q.group != null || q.sameGroupAs ? { en: `A group is a COLUMN — go down: ${targets.join(', ')}.`, vn: `Nhóm là một CỘT — đi xuống: ${targets.join(', ')}.` }
      : { en: `A period is a ROW — go across: ${targets.join(', ')}.`, vn: `Chu kì là một HÀNG — đi ngang: ${targets.join(', ')}.` };
  return { mode: 'place', kind: targets.length === 1 && q.period != null && q.group != null ? 'tap' : 'multi', ask: queryWords(q), targets, query: q, explain };
}

function roundMetal(rng) {
  if (rng() < 0.4) {
    const el = pick(rng, FIRST_20.filter((e) => e.sym !== 'H'));
    return { mode: 'metal', kind: 'choice', ask: { en: `Is ${el.en} (${el.sym}) a metal or a non-metal?`, vn: `${el.vn} (${el.sym}) là kim loại hay phi kim?` },
      options: [{ val: 'metal', en: 'Metal', vn: 'Kim loại' }, { val: 'non', en: 'Non-metal', vn: 'Phi kim' }], answer: el.metal ? 'metal' : 'non', focus: el.sym, colourHidden: true,
      explain: { en: `Metals are on the left of the table and non-metals on the right; the line between them is a staircase, so boron and silicon are non-metals but aluminium is a metal. ${cap(el.en)} is a ${el.metal ? 'metal' : 'non-metal'}.`, vn: `Kim loại ở bên trái bảng, phi kim ở bên phải; đường ranh giới là một bậc thang, nên bo và silic là phi kim nhưng nhôm là kim loại. ${el.vn} là ${el.metal ? 'kim loại' : 'phi kim'}.` } };
  }
  const q = { period: pick(rng, [2, 3, 4]), metal: rng() < 0.6 };
  const targets = querySymbols(q);
  // period 4 of the first 20 has no non-metals: nothing to tap, so draw again
  if (!targets.length) return roundMetal(rng);
  return { mode: 'metal', kind: 'multi', ask: queryWords(q), targets, query: q, colourHidden: true,
    explain: { en: `Metals are on the left, non-metals on the right. In period ${q.period} the ${q.metal ? 'metals' : 'non-metals'} are ${targets.join(', ')}.`, vn: `Kim loại ở bên trái, phi kim ở bên phải. Trong chu kì ${q.period}, các ${q.metal ? 'kim loại' : 'phi kim'} là ${targets.join(', ')}.` } };
}

function roundMass(rng) {
  // Argon (39.9) is heavier than potassium (39.1) — the one pair where reading
  // order lies. Never ask it.
  let a; let b;
  do { [a, b] = shuffle(rng, FIRST_20).slice(0, 2); } while ((a.sym === 'Ar' && b.sym === 'K') || (a.sym === 'K' && b.sym === 'Ar') || Math.abs(a.z - b.z) > 9);
  const heavy = a.z > b.z ? a : b;
  return { mode: 'mass', kind: 'choice', ask: { en: `Which has the heavier atoms: ${a.en} or ${b.en}?`, vn: `Nguyên tử nào nặng hơn: ${a.vn} hay ${b.vn}?` },
    options: [a, b].map((e) => ({ val: e.sym, en: `${cap(e.en)} (${e.sym})`, vn: `${e.vn} (${e.sym})` })), answer: heavy.sym,
    explain: { en: `Read the table like a page — left to right, then the next row. The atoms get heavier as you go, so ${heavy.en} is heavier.`, vn: `Đọc bảng như đọc một trang sách — trái sang phải, rồi hàng tiếp theo. Nguyên tử nặng dần, nên ${heavy.vn} nặng hơn.` } };
}

const MAKERS = { find: roundFind, symbol: roundSymbol, name: roundName, place: roundPlace, metal: roundMetal, mass: roundMass };

export function makeHuntRound(mode, rng = rngFrom()) {
  const make = MAKERS[mode];
  if (!make) throw new Error(`unknown Element Hunt mode "${mode}"`);
  return make(rng);
}

export function makeHuntSession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => HUNT_MODES.includes(m));
  const n = Math.max(1, Math.min(20, Number(config?.rounds) || 10));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(makeHuntRound(modes[i % modes.length], rng));
  return out;
}

/** Mark a round. `answer` is a symbol (tap/choice), a list of symbols (multi) or typed text. */
export function markHunt(round, answer) {
  if (round.kind === 'type') return diagnoseSymbol(elementBySymbol(round.answer), answer);
  if (round.kind === 'choice') return { ok: answer === round.answer };
  if (round.kind === 'tap') return { ok: round.targets.includes(answer) };
  const got = new Set(answer || []);
  const want = new Set(round.targets);
  const missed = [...want].filter((s) => !got.has(s));
  const extra = [...got].filter((s) => !want.has(s));
  return { ok: !missed.length && !extra.length, missed, extra };
}

export function checkHuntConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['elementHunt must be an object'];
  if (!cfg.title) out.push('elementHunt is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('elementHunt.modes must list at least one mode');
  for (const m of modes) if (!HUNT_MODES.includes(m)) out.push(`elementHunt mode "${m}" — known modes: ${HUNT_MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 20)) out.push('elementHunt.rounds must be 1–20');
  try {
    const rng = rngFrom(3);
    for (const m of modes.filter((x) => HUNT_MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) {
        const r = makeHuntRound(m, rng);
        const right = r.kind === 'type' ? r.answer : r.kind === 'multi' ? r.targets : r.kind === 'tap' ? r.targets[0] : r.answer;
        if (!markHunt(r, right).ok) out.push(`elementHunt mode "${m}" does not accept its own answer`);
        if (!r.ask?.en || !r.ask?.vn || !r.explain?.en || !r.explain?.vn) out.push(`elementHunt mode "${m}" drew a round without bilingual text`);
        if (r.kind === 'choice' && !r.options.some((o) => o.val === r.answer)) out.push(`elementHunt mode "${m}" drew a choice without its answer`);
        if ((r.kind === 'tap' || r.kind === 'multi') && !r.targets?.length) out.push(`elementHunt mode "${m}" drew a round with nothing to tap`);
      }
    }
  } catch (e) {
    out.push(`elementHunt threw: ${e.message}`);
  }
  return [...new Set(out)];
}
