// src/utils/stateChain.js
// STUB — the engine for Year 7 Science 2.3 Explaining changes of state (EXPLAIN_IT, unit key `explainIt`,
// deck activity `chain`). Replaced by the unit's builder; the two checkers
// below are imported by scripts/validate-entry.js and utils/activity.js and
// must keep their names. Spec: docs/y7-science/unit2-close-engines.md.

/** Problems with a unit's `explainIt` config (validator). */
export function checkExplainConfig(cfg) {
  return cfg ? [] : ['explainIt config missing'];
}

/** Problems with a `chain` deck activity (utils/activity.js). */
export function checkChainActivity(activity) {
  return activity ? [] : ['chain activity missing'];
}
