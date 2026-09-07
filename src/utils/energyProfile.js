// src/utils/energyProfile.js
//
// The derivation behind the ENERGY_PROFILE task (Energy Diagrams). A reaction
// pathway diagram is not a picture to be memorised — it is three decisions that
// follow from one fact (does the reaction give heat out, or take it in?). This
// module owns those decisions so the component only has to draw them, and so an
// authored item can be checked before it ships.
//
// THE GRID. The student works on a ladder of energy levels. The reactants line
// is PINNED at the middle rung; the student moves the products line and the
// activation-energy peak.
//
//   rung 6  ────────────────  higher energy
//   ...
//   rung 3  ══════════════ ← reactants, fixed
//   ...
//   rung 0  ────────────────  lower energy
//
//   · `productRung` — where the student puts the products line (0..6).
//   · `peak`        — how many rungs the summit sits ABOVE the reactants line
//                     (0 = no activation energy drawn, 1..4 = a hump).
//
// WHY THE Y-AXIS CARRIES NO NUMBERS. The Cambridge coursebook's own energy level
// diagrams (Figures C5.05, C5.06, C5.10) have an unlabelled "Energy / kJ" axis:
// the diagram is qualitative, and the mark scheme awards the *shape*, not a
// height. So this task grades the three things an examiner actually ticks —
//
//   1. the products line is on the correct SIDE of the reactants line;
//   2. an activation-energy peak is drawn, and it clears BOTH lines;
//   3. the sign of ΔH matches.
//
// — and the item's real ΔH value is printed on the arrow once the diagram is
// built, so the number is still taught without being faked into a pixel height.
//
// Constraint 2 is where the endothermic case earns its keep: if the products sit
// above the reactants, a hump that does not clear the products line is not a
// reaction pathway at all. A student cannot get there by copying the exothermic
// shape.

/** Number of rungs on the ladder, and the rung the reactants line is pinned to. */
export const RUNGS = 7;
export const REACT_RUNG = 3;
/** The tallest hump the student can draw, in rungs above the reactants line. */
export const MAX_PEAK = 4;

/**
 * What an item's stated chemistry implies about its diagram. Everything the
 * grader needs is derived here from `type` — nothing is stored twice.
 */
export function profileOf(item) {
  const exo = item.type === 'exothermic';
  return {
    exo,
    // Exothermic: energy leaves the system, so the products are LOWER.
    direction: exo ? 'down' : 'up',
    // ΔH is negative when the system's enthalpy falls.
    sign: exo ? '-' : '+',
    arrow: exo ? 'given out' : 'taken in',
  };
}

/**
 * Grade one attempt. `answer` is { productRung, peak, sign }.
 * Every judgement is derived from the geometry the student built; none of them
 * compares against a stored picture.
 */
export function gradeAttempt(item, answer) {
  const { direction, sign } = profileOf(item);
  const productRung = Number(answer?.productRung);
  const peak = Number(answer?.peak) || 0;

  // 1 · the products line is on the right side of the reactants line
  const levelOk = Number.isFinite(productRung) && (
    direction === 'down' ? productRung < REACT_RUNG : productRung > REACT_RUNG
  );

  // 2 · a hump exists AND its summit clears both lines. Going up the ladder,
  //     the summit sits at REACT_RUNG + peak, so it must beat the products too.
  const summit = REACT_RUNG + peak;
  const eaOk = peak >= 1 && summit > productRung && summit > REACT_RUNG;

  // 3 · the sign of the enthalpy change
  const signOk = answer?.sign === sign;

  return { levelOk, eaOk, signOk, correct: levelOk && eaOk && signOk };
}

/**
 * Validate one authored ENERGY_PROFILE item, so a self-contradictory item cannot
 * ship: the type must be one of the two words, the stated ΔH must carry the sign
 * that type implies, and the diagram must actually be buildable on the ladder.
 * Returns a list of problem strings (empty = OK).
 */
export function checkItem(item) {
  const problems = [];
  const id = item?.id || '(no id)';

  if (item?.type !== 'exothermic' && item?.type !== 'endothermic') {
    problems.push(`${id}: type must be "exothermic" or "endothermic", got "${item?.type}"`);
    return problems;
  }

  const { exo, sign } = profileOf(item);
  const dH = Number(item.deltaH);
  if (!Number.isFinite(dH) || dH === 0) {
    problems.push(`${id}: deltaH must be a non-zero number (kJ/mol)`);
  } else if ((dH < 0) !== exo) {
    problems.push(
      `${id}: type is "${item.type}" (ΔH ${sign}ve) but deltaH is ${dH} — the sign contradicts the type`
    );
  }

  for (const k of ['wordEquation', 'reactants', 'products']) {
    if (!item[k]) problems.push(`${id}: missing ${k}`);
  }

  // The diagram has to be drawable: an endothermic rise must leave at least one
  // rung of headroom for the hump that has to clear it.
  const maxRise = MAX_PEAK - 1;
  if (!exo && REACT_RUNG + maxRise >= RUNGS) {
    problems.push(`${id}: no rung left above the reactants line for an endothermic product level`);
  }

  return problems;
}

/** Check a whole pool at once — used by the unit's Node self-check. */
export function checkPool(items) {
  return (items || []).flatMap(checkItem);
}
