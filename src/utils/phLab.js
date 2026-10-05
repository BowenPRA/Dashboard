// src/utils/phLab.js
// STUB — the engine for Year 7 Science 2.8 Acids and bases (PH_LAB, unit key `phLab`,
// deck activity `ph`). Replaced by the unit's builder; the two checkers
// below are imported by scripts/validate-entry.js and utils/activity.js and
// must keep their names. Spec: docs/y7-science/unit2-close-engines.md.

/** Problems with a unit's `phLab` config (validator). */
export function checkPhConfig(cfg) {
  return cfg ? [] : ['phLab config missing'];
}

/** Problems with a `ph` deck activity (utils/activity.js). */
export function checkPhActivity(activity) {
  return activity ? [] : ['ph activity missing'];
}
