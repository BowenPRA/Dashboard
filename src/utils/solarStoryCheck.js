/**
 * Storyboard (SOLAR_STORY) — the proof. scripts/validate-entry.js calls
 * checkStoryConfig on a unit's `storyboard`; an empty list means every item's
 * right answer is accepted and every named slip fires on its own wrong answer.
 */
import {
  STEP_IDS, STEPS, CAUSES, TRAPS, TRAP_IDS, EVIDENCE_FRAMES, FACTS, VERDICTS, VERDICT_IDS, ACTS, MODELS, SORT_BINS,
  roundModel, diagnoseOrder, diagnoseCauses, diagnoseVerdict, diagnoseFrame, diagnoseAct, diagnoseSort, answerOf,
} from './solarStory.js';

const swap = (list, i, j) => { const o = [...list]; [o[i], o[j]] = [o[j], o[i]]; return o; };

/** Every wrong answer that can happen in a round, with the code it must get. */
export function slipCases(m) {
  const cases = [];
  const add = (stage, input, code) => cases.push({ stage, input, code });
  if (m.kind === 'story') {
    add('order', m.frames, 'ok');
    for (let k = 0; k + 1 < m.frames.length; k++) add('order', swap(m.frames, k, k + 1), `order:${m.frames[k]}`);
    const right = answerOf(m, 'cause');
    add('cause', right, 'ok');
    add('cause', {}, 'missing');
    for (const s of m.ask) for (const t of m.traps) add('cause', { ...right, [s]: `t:${t}` }, `trap:${t}`);
    for (let i = 0; i < m.ask.length; i++) {
      for (let j = i + 1; j < m.ask.length; j++) {
        add('cause', { ...right, [m.ask[i]]: right[m.ask[j]], [m.ask[j]]: right[m.ask[i]] }, 'elsewhere');
      }
    }
  } else if (m.kind === 'evidence') {
    for (const v of VERDICT_IDS) add('verdict', v, v === m.verdict ? 'ok' : v.startsWith('proves') ? 'proves' : 'verdict');
    if (m.verdict === 'supports') for (const f of EVIDENCE_FRAMES) add('frame', f, f === m.fact.frame ? 'ok' : 'frame');
    else for (const a of Object.keys(ACTS)) add('act', a, a === 'keep' ? 'ok' : a);
  } else if (m.kind === 'model') {
    const right = answerOf(m, 'sort');
    add('sort', right, 'ok');
    add('sort', {}, 'missing');
    for (const st of m.statements) add('sort', { ...right, [st.id]: st.kind === 'strength' ? 'limitation' : 'strength' }, 'mixed');
  }
  return cases;
}

/** Run one case against the engine; the code it gets. */
export function runCase(m, c) {
  if (c.stage === 'order') return diagnoseOrder(m, c.input).code;
  if (c.stage === 'cause') return diagnoseCauses(m, c.input).code;
  if (c.stage === 'verdict') return diagnoseVerdict(m, c.input).code;
  if (c.stage === 'frame') return diagnoseFrame(m, c.input).code;
  if (c.stage === 'act') return diagnoseAct(m, c.input).code;
  return diagnoseSort(m, c.input).code;
}

const runAll = (m) => slipCases(m).flatMap((c) => {
  let got;
  try { got = runCase(m, c); } catch (e) { got = `error: ${e.message}`; }
  return got === c.code ? [] : [`${c.stage} should be "${c.code}" but the engine says "${got}"`];
});

const sentences = (s) => String(s || '').split(/[.!?](?:\s|$)/).filter((x) => x.trim()).length;

/** Problems with the engine's own tables (the same for every unit). */
export function checkTables() {
  const out = [];
  const need = (at, o, keys) => { for (const k of keys) if (!o?.[k]) out.push(`${at} has no ${k}`); };
  for (const s of STEP_IDS) need(`step ${s}`, STEPS[s], ['en', 'fr', 'says', 'saysFr']);
  for (const s of STEP_IDS.slice(1)) need(`cause of ${s}`, CAUSES[s], ['en', 'fr']);
  const causeTexts = new Set(Object.values(CAUSES).map((c) => c.en.toLowerCase()));
  for (const id of TRAP_IDS) {
    const t = TRAPS[id];
    need(`trap ${id}`, t, ['en', 'fr', 'why', 'whyFr']);
    if (!STEP_IDS.slice(1).includes(t.fits)) out.push(`trap ${id}: fits "${t.fits}", which is not a step with a cause`);
    if (causeTexts.has(String(t.en).toLowerCase())) out.push(`trap ${id} says the same as a right cause`);
    if (sentences(t.why) > 2 || sentences(t.whyFr) > 2) out.push(`trap ${id}: its why is more than two sentences`);
    if (String(t.why).length > 130) out.push(`trap ${id}: its why is ${t.why.length} characters — keep it short (130)`);
  }
  for (const [id, f] of Object.entries(FACTS)) {
    need(`fact ${id}`, f, ['en', 'fr']);
    if (f.verdict === 'supports') {
      need(`fact ${id}`, f, ['link', 'linkFr']);
      if (!EVIDENCE_FRAMES.includes(f.frame)) out.push(`fact ${id}: frame "${f.frame}" is not one of ${EVIDENCE_FRAMES.join(', ')}`);
    } else if (f.verdict === 'contradicts') need(`fact ${id}`, f, ['after', 'afterFr']);
    else out.push(`fact ${id}: verdict must be supports or contradicts`);
  }
  for (const v of VERDICT_IDS) need(`verdict ${v}`, VERDICTS[v], ['en', 'fr']);
  for (const [a, act] of Object.entries(ACTS)) need(`act ${a}`, act, a === 'keep' ? ['en', 'fr'] : ['en', 'fr', 'why', 'whyFr']);
  for (const b of Object.keys(SORT_BINS)) need(`bin ${b}`, SORT_BINS[b], ['en', 'fr']);
  for (const [id, mo] of Object.entries(MODELS)) {
    need(`model ${id}`, mo, ['en', 'fr', 'desc', 'descFr']);
    const st = mo.statements || [];
    const n = (k) => st.filter((x) => x.kind === k).length;
    if (st.length !== 4 || n('strength') !== 2 || n('limitation') !== 2) out.push(`model ${id}: needs 2 strengths and 2 limitations`);
    for (const x of st) need(`model ${id} statement ${x.id}`, x, ['id', 'en', 'fr', 'why', 'whyFr']);
  }
  return out;
}

/**
 * Every window of the story (3 to 7 frames) with every choice of asked steps:
 * each derived round's own cases. Item ids vary so the scrambles and banks do.
 */
export function proveEngine() {
  const out = [];
  let rounds = 0;
  for (let a = 0; a < STEP_IDS.length; a++) {
    for (let b = a + 2; b < STEP_IDS.length; b++) {
      const links = STEP_IDS.slice(a + 1, b + 1);
      for (let mask = 1; mask < 1 << links.length; mask++) {
        const ask = links.filter((_, i) => mask & (1 << i));
        const item = { id: `prove-${a}-${b}-${mask}`, kind: 'story', from: STEP_IDS[a], to: STEP_IDS[b], ask };
        let m;
        try { m = roundModel(item); } catch (e) { out.push(`${item.id}: ${e.message}`); continue; }
        rounds++;
        for (const p of runAll(m)) out.push(`${item.id}: ${p}`);
      }
    }
  }
  return { problems: out, rounds };
}

/** Problems with a unit's `storyboard.items`, as strings. */
export function checkStoryItems(items, { bilingual = true } = {}) {
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
    if (it?.prompt && bilingual && !it.promptFr) out.push(`${at}: prompt needs promptFr`);
    let m;
    try { m = roundModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.kind === 'story') {
      const texts = m.bank.map((c) => c);
      if (new Set(texts).size !== texts.length) out.push(`${at}: two bank cards are the same`);
    }
    for (const p of runAll(m)) out.push(`${at}: ${p} — two slips look alike`);
  }
  return out;
}

/** Problems with a unit's whole `storyboard` config (title, levels, frames, items). */
export function checkStoryConfig(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['storyboard must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleFr)) out.push(`needs a ${bilingual ? 'French ' : ''}title`);
  if (cfg.intro && bilingual && !cfg.introFr) out.push('intro needs introFr');
  for (const s of STEP_IDS) if (!String(cfg.frames?.[s] || '').includes('<svg')) out.push(`frames.${s} is not a drawing`);
  const items = cfg.items || [];
  if (items.length < 6) out.push(`has ${items.length} items — at least 6`);
  for (const it of items) {
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || (bilingual && !lv.fr)) out.push(`item ${it.id}: level ${it.level} has no ${bilingual ? 'English and French ' : ''}name in levels`);
  }
  out.push(...checkTables());
  out.push(...checkStoryItems(items, { bilingual }));
  out.push(...proveEngine().problems.slice(0, 10));
  return out;
}
