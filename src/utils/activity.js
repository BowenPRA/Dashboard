/**
 * Slide activities — the pure parts. `ActivityBlock.jsx` renders them; this
 * file names the types and checks an authored block for the validator.
 * Schema in docs/y7-science/ENGAGEMENT-PLAN.md §2.1.
 */
import { rootsOf as curveRoots, levelOf, vertexOf, CURVE_KINDS } from './graphCurve.js';
import { parseInequality, normalize } from './interval.js';
import { checkCubicItems } from './cubic.js';

// The three maths types (plot / numberline / reflect) were added for the
// Additional Mathematics decks: an equation is answered by CLICKING its key
// points, an inequality by SHADING the line, a modulus graph by TAPPING the
// pieces to fold. Schemas in docs/add-math/notes-and-activities.md.
export const ACTIVITY_TYPES = ['sort', 'order', 'estimate', 'hotspot', 'predict', 'plot', 'numberline', 'reflect'];

const bilingualName = (o, bilingual) => o && o.name && (!bilingual || o.nameVn);

const PLOT_GRID = { xMin: -7, xMax: 7, yMin: -6, yMax: 8 };

/** The lattice points a `plot` activity wants clicked, derived from its curve. */
export function plotTargets(a) {
  const c = a.curve;
  const st = a.step || { kind: 'vertex' };
  if (st.kind === 'vertex') return [vertexOf(c)];
  if (st.kind === 'zeros') return curveRoots(c).map((x) => [x, 0]);
  if (st.kind === 'meets') return levelOf(c, st.at).map((x) => [x, st.at]);
  return [];
}

/** Problems with one activity block, as strings. Empty when it is sound. */
export function checkActivity(a, { bilingual = true } = {}) {
  const out = [];
  if (!a || typeof a !== 'object') return ['activity is not an object'];
  if (!ACTIVITY_TYPES.includes(a.type)) return [`type "${a.type}" — known types: ${ACTIVITY_TYPES.join('/')}`];
  if (!a.id) out.push('has no id');
  if (!a.prompt || (bilingual && !a.promptVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}prompt`);
  if (!a.explain || (bilingual && !a.explainVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}explain (shown after the answer)`);

  if (a.type === 'sort') {
    const bins = a.bins || []; const cards = a.cards || [];
    if (bins.length < 2) out.push('sort needs at least 2 bins');
    if (cards.length < 3) out.push('sort needs at least 3 cards');
    const binIds = new Set(bins.map((b) => b?.id));
    for (const b of bins) if (!b?.id || !bilingualName(b, bilingual)) out.push(`bin "${b?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
    const seen = new Set();
    for (const c of cards) {
      if (!c?.id || !bilingualName(c, bilingual)) out.push(`card "${c?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
      if (seen.has(c?.id)) out.push(`duplicate card id "${c.id}"`);
      seen.add(c?.id);
      if (!binIds.has(c?.bin)) out.push(`card "${c?.id}" bin "${c?.bin}" is not a bin`);
    }
    for (const b of bins) if (!cards.some((c) => c.bin === b.id)) out.push(`bin "${b.id}" has no cards`);
  }

  if (a.type === 'order') {
    const steps = a.steps || [];
    if (steps.length < 3) out.push('order needs at least 3 steps');
    const seen = new Set();
    for (const s of steps) {
      if (!s?.id || !bilingualName(s, bilingual)) out.push(`step "${s?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
      if (seen.has(s?.id)) out.push(`duplicate step id "${s.id}"`);
      seen.add(s?.id);
    }
  }

  if (a.type === 'estimate') {
    for (const k of ['min', 'max', 'answer']) if (!Number.isFinite(a[k])) out.push(`estimate needs numeric ${k}`);
    if (Number.isFinite(a.min) && Number.isFinite(a.max) && a.min >= a.max) out.push('estimate min must be below max');
    if (Number.isFinite(a.answer) && Number.isFinite(a.min) && Number.isFinite(a.max) && (a.answer < a.min || a.answer > a.max)) out.push('estimate answer is outside min..max');
    if (a.step !== undefined && !(a.step > 0)) out.push('estimate step must be positive');
    if (a.tolerance !== undefined && !(a.tolerance >= 0 && a.tolerance <= 1)) out.push('estimate tolerance is a fraction 0..1');
  }

  if (a.type === 'hotspot') {
    if (!a.svg) out.push('hotspot needs svg');
    const vb = String(a.viewBox || '').split(/[\s,]+/).map(Number);
    if (vb.length !== 4 || !vb.every(Number.isFinite) || vb[2] <= 0 || vb[3] <= 0) out.push('hotspot needs a viewBox "x y w h"');
    const targets = a.targets || [];
    if (targets.length < 2) out.push('hotspot needs at least 2 targets (the answer and at least one decoy)');
    for (const t of targets) {
      if (!t?.id || !Number.isFinite(t?.x) || !Number.isFinite(t?.y)) out.push(`target "${t?.id || '?'}" needs id, x, y`);
      if (!bilingualName(t, bilingual)) out.push(`target "${t?.id || '?'}" needs a ${bilingual ? 'bilingual ' : ''}name`);
      if (vb.length === 4 && Number.isFinite(t?.x) && (t.x < vb[0] || t.x > vb[0] + vb[2] || t.y < vb[1] || t.y > vb[1] + vb[3])) out.push(`target "${t.id}" is outside the viewBox`);
    }
    if (!targets.some((t) => t.id === a.correct)) out.push(`correct "${a.correct}" is not a target`);
  }

  if (a.type === 'predict') {
    const opts = a.options || [];
    if (opts.length < 2) out.push('predict needs at least 2 options');
    for (const o of opts) if (!o?.val || !bilingualName(o, bilingual)) out.push(`option "${o?.val || '?'}" needs val and ${bilingual ? 'bilingual ' : ''}name`);
    if (a.correct != null && !opts.some((o) => o.val === a.correct)) out.push(`correct "${a.correct}" is not an option`);
  }

  if (a.type === 'plot') {
    const c = a.curve || {};
    if (![c.a, c.h, c.k].every((v) => typeof v === 'number')) out.push('plot needs curve: { a, h, k } numbers (and kind: quadratic | modulus)');
    else {
      if (c.kind !== undefined && !CURVE_KINDS.includes(c.kind)) out.push(`plot curve kind "${c.kind}" — known kinds: ${CURVE_KINDS.join('/')}`);
      if (!c.a) out.push('plot curve a = 0 is a straight line');
      const st = a.step || {};
      if (!['vertex', 'zeros', 'meets'].includes(st.kind)) out.push(`plot step kind "${st.kind}" — vertex, zeros or meets`);
      if (st.kind === 'meets' && typeof st.at !== 'number') out.push('a meets step needs at: <number>');
      const grid = { ...PLOT_GRID, ...(a.grid || {}) };
      if (st.kind === 'meets' && typeof st.at === 'number' && (st.at < grid.yMin || st.at > grid.yMax)) out.push(`meets line y = ${st.at} is outside the grid`);
      if (!a.equation) out.push('plot needs equation (KaTeX, shown to the student)');
      if (['vertex', 'zeros', 'meets'].includes(st.kind) && (st.kind !== 'meets' || typeof st.at === 'number') && c.a) {
        for (const [x, y] of plotTargets(a)) {
          if (!Number.isInteger(x) || !Number.isInteger(y)) out.push(`target (${x}, ${y}) is not a whole-number point`);
          if (x < grid.xMin || x > grid.xMax || y < grid.yMin || y > grid.yMax) out.push(`target (${x}, ${y}) is outside the grid`);
        }
      }
    }
  }

  if (a.type === 'numberline') {
    let set;
    try { set = parseInequality(a.solution); } catch (e) { out.push(`numberline solution: ${e.message}`); }
    if (set) {
      const min = a.min ?? -8;
      const max = a.max ?? 8;
      if (!Number.isInteger(min) || !Number.isInteger(max) || min >= max) out.push('numberline needs integer min < max');
      const s = normalize(set);
      if (!s.length) out.push('numberline solution has no solutions, so there is nothing to shade');
      if (s.length > 2) out.push('numberline solution has more than two pieces');
      for (const iv of s) for (const end of [iv.lo, iv.hi]) {
        if (!Number.isFinite(end)) continue;
        if (!Number.isInteger(end)) out.push(`numberline endpoint ${end} is not on a tick`);
        if (end < min || end > max) out.push(`numberline endpoint ${end} is off the line ${min}..${max}`);
      }
    }
    if (!a.display) out.push('numberline needs display (the inequality, as KaTeX)');
  }

  if (a.type === 'reflect') {
    for (const p of checkCubicItems([{ id: a.id || 'reflect', factors: a.factors, k: a.k, expanded: a.expanded }])) out.push(`reflect ${p}`);
  }
  return out;
}
