// src/utils/quadCheck.js
//
// The authoring checks for the three quadratic tasks, run by `npm run
// validate`. Items store only an equation, so a wrong answer key cannot
// exist — the risk is an item the screen cannot finish (it does not factor,
// it needs a −1 step the task does not ask for) or one whose own answers its
// marking would refuse. So every stage's answers are replayed through that
// stage's diagnose function, exactly as Show me would write them in.

import {
  deriveFactorItem, answersFor as factorAnswers, diagnoseStandard, diagnoseGcf, diagnoseTarget, diagnoseSplit,
  diagnoseGroup, diagnoseSquares, diagnoseXout, diagnoseFactors, diagnoseZeros, diagnosePair,
} from './quadFactor.js';
import {
  deriveFormulaItem, answersFor as formulaAnswers, diagnoseAbc, diagnoseDisc, diagnoseCount, diagnoseRoot, diagnosePlug, diagnoseSolve,
} from './quadFormula.js';
import { solveSteps, CHALLENGE_TYPES } from './quadSolve.js';

function commonChecks(cfg, name, { bilingual }) {
  const out = [];
  if (!cfg.title || (bilingual && !cfg.titleVn)) out.push(`${name} needs a ${bilingual ? 'bilingual ' : ''}title`);
  if (!(cfg.items || []).length) out.push(`${name} has no items`);
  const ids = new Set();
  for (const it of cfg.items || []) {
    if (!it.id) out.push(`${name}: an item has no id`);
    if (ids.has(it.id)) out.push(`${name}: duplicate id ${it.id}`);
    ids.add(it.id);
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || (bilingual && !lv.vn)) out.push(`${name} item ${it.id}: level ${it.level} has no ${bilingual ? 'bilingual ' : ''}name in levels`);
  }
  return out;
}

export function checkFactorQuad(cfg, { bilingual = true } = {}) {
  const out = commonChecks(cfg, 'factorQuad', { bilingual });
  for (const it of cfg.items || []) {
    let m;
    try { m = deriveFactorItem(it); } catch (e) { out.push(`item ${it.id}: ${e.message}`); continue; }
    for (const stage of m.stages) {
      const ans = factorAnswers(m, stage);
      let d;
      switch (stage) {
        case 'standard': d = diagnoseStandard(m, ans); break;
        case 'gcf': d = diagnoseGcf(m, ans[0]); break;
        case 'target': d = diagnoseTarget(m, ans[0], ans[1]); break;
        case 'pair': d = m.fac.pair ? diagnosePair(m, m.fac.pair) : { ok: false }; break;
        case 'split': d = diagnoseSplit(m, ans[0], ans[1]); break;
        case 'group': d = m.fac.grouping ? diagnoseGroup(m, m.fac.grouping, ans[0], ans[1]) : { ok: false }; break;
        case 'squares': d = diagnoseSquares(m, ans[0], ans[1]); break;
        case 'xout': d = diagnoseXout(m, ans[0], ans[1]); break;
        case 'factors': d = diagnoseFactors(m, ans); break;
        case 'zeros': d = diagnoseZeros(m, ans); break;
        default: d = { ok: false };
      }
      if (!d?.ok) out.push(`item ${it.id} ("${it.eq}"): its own ${stage} answer (${ans.join(', ')}) is refused by the marking`);
    }
    if (m.product !== undefined && Math.abs(m.product) > 200 && m.stages.includes('pair')) out.push(`item ${it.id}: ${m.product} has too many factor pairs for the pair table — use a smaller item`);
  }
  return out;
}

export function checkQuadFormula(cfg, { bilingual = true } = {}) {
  const out = commonChecks(cfg, 'quadFormula', { bilingual });
  for (const it of cfg.items || []) {
    let m;
    try { m = deriveFormulaItem(it); } catch (e) { out.push(`item ${it.id}: ${e.message}`); continue; }
    for (const stage of m.stages) {
      const ans = formulaAnswers(m, stage);
      let d;
      switch (stage) {
        case 'abc': d = diagnoseAbc(m, ans); break;
        case 'disc': d = diagnoseDisc(m, ans[0]); break;
        case 'count': d = diagnoseCount(m, ans[0]); break;
        case 'root': d = diagnoseRoot(m, ans[0], ans[1]); break;
        case 'plug': d = diagnosePlug(m, ans[0], ans[1]); break;
        case 'solve': d = diagnoseSolve(m, ans); break;
        default: d = { ok: false };
      }
      if (!d?.ok) out.push(`item ${it.id} ("${it.eq}"): its own ${stage} answer (${ans.join(', ')}) is refused by the marking`);
    }
  }
  return out;
}

export function checkQuadSolver(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg.title || (bilingual && !cfg.titleVn)) out.push(`quadSolver needs a ${bilingual ? 'bilingual ' : ''}title`);
  for (const ex of cfg.examples || []) {
    const s = solveSteps(ex);
    if (!s.ok) out.push(`quadSolver example "${ex}" does not solve: ${s.error.en}`);
  }
  const ids = new Set();
  for (const ch of cfg.challenges || []) {
    if (!ch.id || ids.has(ch.id)) out.push(`quadSolver challenge ${ch.id}: missing or duplicate id`);
    ids.add(ch.id);
    if (!CHALLENGE_TYPES[ch.type]) out.push(`quadSolver challenge ${ch.id}: unknown type "${ch.type}" (known: ${Object.keys(CHALLENGE_TYPES).join(', ')})`);
    if (!ch.en || (bilingual && !ch.vn)) out.push(`quadSolver challenge ${ch.id} needs ${bilingual ? 'en and vn' : 'en'} wording`);
    if (ch.type === 'zeros' && !(Array.isArray(ch.zeros) && ch.zeros.length)) out.push(`quadSolver challenge ${ch.id}: a zeros challenge needs zeros: [..]`);
    // The witness proves the challenge can be met — a quadratic that meets it.
    if (ch.witness) {
      const s = solveSteps(ch.witness);
      if (!s.ok || !CHALLENGE_TYPES[ch.type]?.(s, ch)) out.push(`quadSolver challenge ${ch.id}: its witness "${ch.witness}" does not meet it`);
    } else out.push(`quadSolver challenge ${ch.id}: give a witness (a quadratic that meets it) so the check can prove it is possible`);
  }
  return out;
}
