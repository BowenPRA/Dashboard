/**
 * Tide Lab (TIDE_LAB) — the proof. scripts/validate-entry.js calls
 * checkTideConfig on a unit's `tideLab`. For every item, over SEEDS rivers, it
 * checks that the right answer to each stage is accepted, that every named slip
 * fires on its own wrong answer, that no answer could earn two different codes,
 * and that the picture can show what is asked. An empty list means proved.
 */
import { KINDS, MARKS, STAGE_IDS, SEEDS, roundModel, seedOf, answerOf, scaleTop, LATER_MIN } from './tideLab.js';
import {
  poleSlips, diagnosePole, diagnosePlot, diagnoseInOut, diagnoseHighest, diagnoseChange, diagnoseFind,
  diagnoseTomorrow, diagnoseTest, diagnoseChanges, diagnoseWeek, diagnoseMoon, diagnoseVerdict, diagnoseWhy,
} from './tideLabMark.js';
import { SLOTS, DAYS, MOONS, DIRS, VERDICTS, VERDICT_IDS, REASONS, PREDICTIONS } from './tideLabData.js';

const MARKERS = {
  read: diagnosePole, plot: diagnosePlot, inout: diagnoseInOut, highest: diagnoseHighest,
  find: diagnoseFind, tomorrow: diagnoseTomorrow, test: diagnoseTest, verdict: diagnoseVerdict,
  why: diagnoseWhy, week: diagnoseWeek, moon: diagnoseMoon,
};
const changeMarker = (m) => (m.kind === 'day' ? diagnoseChange : diagnoseChanges);

/** Every answer worth trying at each stage of a round, with the code it must get. */
export function slipCases(m) {
  const cases = [];
  const add = (stage, input, code) => cases.push({ stage, input, code });
  for (const stage of m.stages) {
    if (stage !== 'change' || m.kind === 'day') add(stage, answerOf(m, stage), 'ok');
    if (stage === 'read') {
      for (const [code, v] of poleSlips(m)) add(stage, String(v), code);
      add(stage, `${m.pole.level} cm`, 'ok');
      add(stage, String(m.pole.level + 7), 'other');
    }
    if (stage === 'plot') {
      const r = m.day.readings;
      for (let i = 0; i < 4; i++) {
        const k = (i + 1) % 4;
        const sw = [...r]; [sw[i], sw[k]] = [sw[k], sw[i]];
        add(stage, sw, 'swap');
        add(stage, r.map((v, j) => (j === i ? v + 10 : v)), 'line');
        add(stage, r.map((v, j) => (j === i ? v + 5 : v)), 'off');
      }
    }
    if (stage === 'inout') add(stage, m.day.dir === 'in' ? 'out' : 'in', 'reversed');
    if (stage === 'highest') {
      for (let i = 0; i < 4; i++) if (i !== m.day.hi) add(stage, i, i === m.day.lo ? 'lowest' : i === 3 ? 'last' : 'other');
    }
    if (stage === 'change' && m.kind === 'day') {
      const r = m.day.readings;
      add(stage, String(m.day.ends), 'ends');
      add(stage, String(Math.max(...r)), 'value');
      add(stage, String(Math.min(...r)), 'value');
      add(stage, String(m.day.change + 1), 'other');
      add('find', answerOf(m, 'find'), 'ok');
      for (let i = 0; i < 4; i++) {
        if (i !== m.day.hi) add('find', { hi: i, lo: m.day.lo }, 'nothighest');
        if (i !== m.day.lo) add('find', { hi: m.day.hi, lo: i }, 'notlowest');
      }
    }
    if (stage === 'change' && m.kind === 'biggest') {
      const right = answerOf(m, 'change');
      add(stage, right, 'ok');
      m.ask.forEach((c, w) => {
        const r = m.weeks[w].days[c].readings;
        const put = (v) => right.map((x, k) => (k === w ? String(v) : x));
        add(stage, put(Math.abs(r[3] - r[0])), 'ends');
        add(stage, put(Math.max(...r)), 'value');
        add(stage, put(Math.min(...r)), 'value');
      });
    }
    if (stage === 'tomorrow') {
      const t = m.tomorrow.today;
      add(stage, t, 'same'); add(stage, t - LATER_MIN, 'earlier'); add(stage, t + 720, 'twelve');
    }
    if (stage === 'test') {
      const right = answerOf(m, 'test');
      for (const d of m.week.ask) for (let s = 0; s < 4; s++) if (s !== right[d]) add(stage, { ...right, [d]: s }, 'pick');
    }
    if (stage === 'verdict') { add(stage, 'contradicts', 'contradicts'); add(stage, 'proves', 'proves'); }
    if (stage === 'why') for (const id of m.why.options) if (id !== m.why.right) add(stage, id, id);
    if (stage === 'week') add(stage, 1 - m.bigWeek, 'smaller');
    if (stage === 'moon') for (const p of ['new', 'half', 'full']) if (p !== m.phase) add(stage, p, p === 'half' ? 'halfmoon' : 'misread');
  }
  return cases;
}

export function runCase(m, c) {
  const mark = c.stage === 'change' ? changeMarker(m) : MARKERS[c.stage];
  return mark(m, c.input).code;
}

/** Problems with one round: a wrong code, two codes for one answer, or a picture that cannot show the answer. */
export function roundProblems(m) {
  const out = [];
  const seen = new Map();
  for (const c of slipCases(m)) {
    let got;
    try { got = runCase(m, c); } catch (e) { got = `error: ${e.message}`; }
    if (got !== c.code) out.push(`${c.stage} ${JSON.stringify(c.input)} should be "${c.code}" but the engine says "${got}"`);
    const key = `${c.stage}|${JSON.stringify(c.input)}`;
    if (seen.has(key) && seen.get(key) !== c.code) out.push(`${c.stage} ${JSON.stringify(c.input)} is both "${seen.get(key)}" and "${c.code}"`);
    seen.set(key, c.code);
  }
  if (m.pole && (m.pole.level - m.pole.waves < m.pole.lo + 10 || m.pole.level + m.pole.waves > m.pole.hi - 10)) out.push('the water is off the drawn pole');
  if (m.day && Math.max(...m.day.readings) > m.day.top - 10) out.push('a reading is off the graph');
  if (m.week && m.week.days.some((d) => Math.max(...d.readings) > m.week.top - 10)) out.push('a reading is off the week graph');
  if (m.weeks && Math.max(...m.weeks.flatMap((w) => w.days.flatMap((d) => d.readings))) > m.top - 10) out.push('a reading is off the fortnight graph');
  if (m.top != null && m.top !== scaleTop(Math.max(...m.weeks.flatMap((w) => w.days.flatMap((d) => d.readings))))) out.push('the fortnight graph has the wrong scale');
  return out;
}

const hasFr = (o, keys) => keys.every((k) => typeof o?.[k] === 'string' && o[k].trim());

/** Problems with the engine's own word tables (the same for every unit). */
export function tableProblems() {
  const out = [];
  for (const s of SLOTS) if (!hasFr(s, ['en', 'fr'])) out.push(`slot ${s.en} has no French`);
  for (const d of DAYS) if (!hasFr(d, ['en', 'fr', 'long', 'longFr'])) out.push(`day ${d.en} has no French`);
  for (const [id, o] of Object.entries({ ...MOONS, ...DIRS, ...VERDICTS, ...PREDICTIONS })) if (!hasFr(o, ['en', 'fr'])) out.push(`${id} has no French`);
  if (VERDICT_IDS.some((v) => !VERDICTS[v])) out.push('a verdict id has no text');
  for (const [kind, bank] of Object.entries(REASONS)) {
    if (!hasFr(bank.right, ['en', 'fr'])) out.push(`${kind}: the right reason has no French`);
    for (const t of bank.traps) if (!hasFr(t, ['en', 'fr', 'why', 'whyFr'])) out.push(`${kind}: trap ${t.id} has no French or no why`);
  }
  return out;
}

/** Problems with a unit's `tideLab` config; [] when every item is proved. */
export function checkTideConfig(cfg, { seeds = SEEDS } = {}) {
  const out = [...tableProblems()];
  if (!cfg || !Array.isArray(cfg.items) || !cfg.items.length) return [...out, 'tideLab needs items'];
  if (!cfg.title || !cfg.titleFr) out.push('tideLab needs title and titleFr');
  const ids = new Set();
  for (const it of cfg.items) {
    const label = `item ${it.id}`;
    if (!it.id || ids.has(it.id)) out.push(`${label}: missing or repeated id`);
    ids.add(it.id);
    if (!KINDS.includes(it.kind)) { out.push(`${label}: unknown kind "${it.kind}"`); continue; }
    if (it.kind === 'pole' && !MARKS.includes(it.mark)) out.push(`${label}: unknown mark "${it.mark}"`);
    if (it.kind !== 'pole' && it.stages && it.stages.some((s) => !STAGE_IDS[it.kind].includes(s))) out.push(`${label}: a stage that is not a ${it.kind} stage`);
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || !lv?.fr) out.push(`${label}: level ${it.level} has no name in levels (en and fr)`);
    for (let a = 0; a < seeds; a++) {
      let m;
      try { m = roundModel(it, seedOf(it.id, a)); } catch (e) { out.push(`${label}: ${e.message}`); break; }
      const probs = roundProblems(m);
      if (probs.length) { out.push(`${label}, river ${a}: ${probs[0]}`); break; }
    }
  }
  return out;
}
