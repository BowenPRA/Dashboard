// src/utils/waterCycle.js
// STUB — the engine for Year 7 Science 2.4 The water cycle (WATER_JOURNEY, unit key `waterJourney`,
// deck activity `cycle`). Replaced by the unit's builder; the two checkers
// below are imported by scripts/validate-entry.js and utils/activity.js and
// must keep their names. Spec: docs/y7-science/unit2-close-engines.md.

/** Problems with a unit's `waterJourney` config (validator). */
export function checkJourneyConfig(cfg) {
  return cfg ? [] : ['waterJourney config missing'];
}

/** Problems with a `cycle` deck activity (utils/activity.js). */
export function checkCycleActivity(activity) {
  return activity ? [] : ['cycle activity missing'];
}
