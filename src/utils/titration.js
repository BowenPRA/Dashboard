// src/utils/titration.js
//
// The derivation behind the TITRATION task (Titration Bench). An item states a
// titration the way an exam question does — what was in the flask, what was in
// the burette, the two burette readings, the balanced equation — and leaves out
// one concentration (or one volume). Everything the coursebook's four steps
// produce is worked out here:
//
//   the titre                      final reading − initial reading
//   both volumes in dm³            cm³ ÷ 1000
//   1  moles of the solution you know       concentration × volume
//   2  the ratio, from the equation         its two coefficients
//   3  moles of the other solution          scaled by that ratio
//   4  its concentration                    moles ÷ volume in dm³
//      (or, when both concentrations are given, the volume needed)
//
// so an author cannot ship an answer the numbers do not give, and
// `checkTitrationItems` refuses an item whose equation does not balance or
// whose answer does not come out to three decimal places.
import { parseFormula, isBalanced } from './chemFormula.js';

const EPS = 1e-9;
/** Tidy a calculated number: binary dust off, no trailing zeros. */
export const tidy = (v) => Number(Number(v).toPrecision(10));
export const show = (v) => String(tidy(v));

const coeffOf = (item, formula) => {
  const sp = [...(item.equation?.reactants || []), ...(item.equation?.products || [])].find((s) => s.formula === formula);
  return sp ? Number(sp.coeff) || 1 : null;
};

/** "cm³ of acid" is what a burette reading is: final minus initial. */
export const titreOf = (burette) => tidy(burette.final - burette.initial);

/**
 * Everything the task asks for.
 *   mode        'conc' (find a concentration) or 'volume' (find a volume)
 *   known       the solution whose concentration AND volume are both given
 *   unknown     the other one
 *   titre       the burette volume, when readings are given
 *   volKnown    known's volume in dm³
 *   molesKnown
 *   ratio       { known, unknown } — the coefficients, in lowest terms
 *   molesUnknown
 *   volUnknown  unknown's volume in dm³ (mode 'conc')
 *   answer      mol/dm³ (mode 'conc') or cm³ (mode 'volume')
 */
export function deriveTitration(item) {
  const { flask, burette } = item;
  const hasReadings = Number.isFinite(burette.initial) && Number.isFinite(burette.final);
  const titre = hasReadings ? titreOf(burette) : null;
  const buretteVol = hasReadings ? titre : burette.volume;
  const F = { ...flask, where: 'flask' };
  const B = { ...burette, where: 'burette', volume: buretteVol };

  const bothConc = Number.isFinite(F.conc) && Number.isFinite(B.conc);
  const mode = bothConc ? 'volume' : 'conc';
  // Known: concentration and volume both given. In 'volume' mode that is the flask.
  const known = mode === 'volume' ? F : Number.isFinite(F.conc) ? F : B;
  const unknown = known === F ? B : F;

  const ck = coeffOf(item, known.formula);
  const cu = coeffOf(item, unknown.formula);
  const g = ((a, b) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return x || 1; })(ck || 1, cu || 1);
  const ratio = { known: (ck || 1) / g, unknown: (cu || 1) / g };

  const volKnown = tidy(known.volume / 1000);
  const molesKnown = tidy(known.conc * volKnown);
  const molesUnknown = tidy((molesKnown * ratio.unknown) / ratio.known);

  let volUnknown;
  let answer;
  if (mode === 'conc') {
    volUnknown = tidy(unknown.volume / 1000);
    answer = tidy(molesUnknown / volUnknown);
  } else {
    volUnknown = tidy(molesUnknown / unknown.conc);
    answer = tidy(volUnknown * 1000);
  }
  return { mode, known, unknown, hasReadings, titre, volKnown, molesKnown, ratio, molesUnknown, volUnknown, answer };
}

/** Is a typed number the wanted one? Right to 1%, as a calculator answer is. */
export function near(typed, want) {
  const v = Number(typed);
  if (!Number.isFinite(v)) return false;
  return Math.abs(v - want) <= Math.max(Math.abs(want) * 0.01, 1e-7);
}

/** "2HCl + Na2CO3 → 2NaCl + H2O + CO2" as plain text. */
export function equationText(item) {
  const side = (list) => (list || []).map((s) => `${Number(s.coeff) > 1 ? s.coeff : ''}${s.formula}`).join(' + ');
  return `${side(item.equation?.reactants)} → ${side(item.equation?.products)}`;
}

const clean3 = (v) => Math.abs(v - Math.round(v * 1000) / 1000) < EPS;
const clean5 = (v) => Math.abs(v - Math.round(v * 100000) / 100000) < EPS;

/** Problems with authored items, as strings. Empty when the pool is sound. */
export function checkTitrationItems(items) {
  const out = [];
  const seen = new Set();
  for (const item of items || []) {
    const id = item?.id || '(no id)';
    const say = (m) => out.push(`item ${id}: ${m}`);
    if (!item?.id) out.push('an item has no id');
    if (seen.has(id)) say('duplicate id');
    seen.add(id);
    if (!item?.name) say('needs a name');
    if (!item?.context) say('needs a context sentence');

    const eq = item?.equation;
    if (!eq?.reactants?.length || !eq?.products?.length) { say('needs an equation with reactants and products'); continue; }
    let ok = true;
    for (const sp of [...eq.reactants, ...eq.products]) {
      try { parseFormula(sp.formula); } catch (e) { say(`"${sp?.formula}" — ${e.message}`); ok = false; }
      const c = sp.coeff === undefined ? 1 : sp.coeff;
      if (!Number.isInteger(c) || c < 1 || c > 6) { say(`coefficient ${sp.coeff} on ${sp.formula} must be a whole number 1–6`); ok = false; }
    }
    if (!ok) continue;
    const full = (list) => list.map((s) => ({ formula: s.formula, coeff: s.coeff === undefined ? 1 : s.coeff }));
    if (!isBalanced(full(eq.reactants), full(eq.products))) { say(`the equation does not balance: ${equationText(item)}`); continue; }

    const { flask, burette } = item;
    for (const [where, s] of [['flask', flask], ['burette', burette]]) {
      if (!s?.formula || !s?.name) { say(`${where} needs a formula and a name`); ok = false; continue; }
      if (!eq.reactants.some((r) => r.formula === s.formula)) { say(`${where} solution ${s.formula} is not a reactant in the equation`); ok = false; }
      if (s.conc !== undefined && !(s.conc > 0)) { say(`${where} concentration must be above zero`); ok = false; }
    }
    if (!ok) continue;
    if (flask.formula === burette.formula) { say('the flask and the burette hold the same solution'); continue; }
    if (!(flask.volume > 0)) { say('the flask needs a volume in cm³'); continue; }

    const hasReadings = burette.initial !== undefined || burette.final !== undefined;
    if (hasReadings) {
      if (!Number.isFinite(burette.initial) || !Number.isFinite(burette.final)) { say('the burette needs both an initial and a final reading'); continue; }
      if (burette.initial < 0 || burette.final > 50) say('burette readings must lie on a 50 cm³ burette (0–50)');
      if (!(burette.final > burette.initial)) { say('the final burette reading must be greater than the initial one'); continue; }
      if (burette.volume !== undefined) say('give burette readings OR a volume, not both');
    }
    const nConc = [flask.conc, burette.conc].filter(Number.isFinite).length;
    if (nConc === 0) { say('one concentration must be given'); continue; }
    if (nConc === 2 && (hasReadings || burette.volume !== undefined)) { say('both concentrations AND the burette volume are given, so there is nothing to find'); continue; }
    if (nConc === 1 && !hasReadings && !(burette.volume > 0)) { say('to find a concentration the burette needs readings (or a volume)'); continue; }

    const d = deriveTitration(item);
    if (!clean5(d.molesKnown) || !clean5(d.molesUnknown)) say(`the moles (${d.molesKnown}, ${d.molesUnknown}) do not come out to 5 decimal places`);
    if (!clean3(d.answer)) say(`the answer ${d.answer} does not come out to 3 decimal places — change a volume or a concentration`);
    if (d.mode === 'volume' && (d.answer <= 0 || d.answer > 50)) say(`the volume needed, ${d.answer} cm³, will not fit one fill of a 50 cm³ burette`);
    if (item.answer !== undefined && Math.abs(item.answer - d.answer) > EPS) say(`stated answer ${item.answer} but the numbers give ${d.answer}`);
    if (!item.indicator?.name || !item.indicator?.from || !item.indicator?.to) say('needs an indicator with name, from and to colours');
  }
  return out;
}
