/**
 * The daily study plan — every knob a teacher turns, in one file.
 *
 * The plan is DERIVED, never stored: `studyPlan.js` reads the student's own
 * progress, works out which units are still unfinished, and deals the next few
 * each day. Nothing is written to Supabase, so the plan can be re-tuned by
 * editing this file and shipping — no migration and no per-day assignment rows —
 * and the student screen and the teacher screen agree by construction, because
 * both run the same function over the same progress.
 */

export const PLAN = {
  /** Shown on the plan header. Purely cosmetic. */
  title: 'GED Study Plan',
  /**
   * The first day goals are counted from. The plan itself is live on any date —
   * this only decides where the streak and the "days on target" tally begin, so
   * the days before the plan existed are not scored as misses.
   */
  startISO: '2026-10-05',
  /** Units to FINISH on a study day. Hitting this is the day's goal. */
  goal: 2,
  /**
   * Units OFFERED on a study day. The one past the goal is the stretch: there
   * if the day goes well, and first in line tomorrow if it does not.
   */
  stretch: 3,
  /** JS getDay() numbers that carry a goal. Saturday and Sunday are free. */
  studyWeekdays: [1, 2, 3, 4, 5],
};

/**
 * What counts once everything is finished.
 *
 * With nothing left to finish, the day's list is filled with units to keep
 * warm instead. One of those counts for the day when its quiz is re-sat that
 * day at this fraction of the quiz's marks or better.
 */
export const REVIEW = {
  quizPct: 0.7,
};

/** Tracks the plan draws from. Ties in the day's mix break in this order. */
export const PLAN_TRACKS = ['GED_ENG', 'GED_HISTORY', 'GED_MATH', 'GED_SCIENCE'];

/** Short labels for the plan UI, so it never prints "GED_HISTORY". */
export const SUBJECT_LABEL = {
  GED_ENG: 'English',
  GED_HISTORY: 'Social Studies',
  GED_MATH: 'Math',
  GED_SCIENCE: 'Science',
};
