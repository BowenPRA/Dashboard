/**
 * The daily study plan — every knob a teacher turns, in one file.
 *
 * The plan is DERIVED, never stored: `studyPlan.js` computes a given date's two
 * units from the constants below. Nothing is written to Supabase, so the plan
 * can be re-tuned by editing this file and shipping — no migration, no per-day
 * assignment rows, and the same date always yields the same two units for
 * everyone looking at it (student screen and teacher screen agree by
 * construction).
 *
 * Progress still comes from `students.progress`; the plan only decides WHICH
 * units are asked for on a day, and `studyPlan.js` decides whether the day's
 * bar was cleared.
 */

/** Mon–Fri. Index 0 = Monday. Saturday and Sunday are rest / catch-up. */
export const STUDY_WEEKDAYS = [1, 2, 3, 4, 5]; // JS getDay(): 1=Mon … 5=Fri

export const PROGRAM = {
  /**
   * First study day. Must be a Monday — the weekday pattern below assumes the
   * week starts there, and the rotation cursor counts study days from here.
   */
  startISO: '2026-08-24',
  /** Length of the review block. 8 weeks ≈ the "month or two" before the sitting. */
  weeks: 8,
  /** Shown on the plan header. Purely cosmetic. */
  title: 'GED Review Block',
};

/**
 * The week's shape: two units a day, and which subject each slot draws from.
 *
 * Weighted to the teacher's risk order — **English ≫ Social Studies > Math >
 * Science** — which over five days comes out as English 4 · Social Studies 3 ·
 * Math 2 · Science 1 across the ten slots.
 *
 * Two rules hold, and both matter more than they look:
 *   - **No subject appears twice in one day.** Interleaving two subjects in a
 *     session is what makes the recall effortful; two English units back to
 *     back is one long English session wearing a costume.
 *   - **Each day pairs a reading-heavy subject with a lighter one**, so no day
 *     is two hours of dense prose for an ESL reader.
 */
export const WEEK_PATTERN = [
  { day: 'Monday',    slots: ['GED_ENG', 'GED_MATH'] },
  { day: 'Tuesday',   slots: ['GED_HISTORY', 'GED_ENG'] },
  { day: 'Wednesday', slots: ['GED_ENG', 'GED_SCIENCE'] },
  { day: 'Thursday',  slots: ['GED_HISTORY', 'GED_MATH'] },
  { day: 'Friday',    slots: ['GED_ENG', 'GED_HISTORY'] },
];

/**
 * The bar for one assigned unit on one day. **Both gates must be cleared.**
 *
 * Measured from TODAY's attempts only — never from the lifetime high-water mark
 * `current`. That distinction is the whole point of the feature: a unit already
 * sitting at 100 XP would otherwise tick itself green every morning forever,
 * and the plan would measure nothing. `progressSchema.js` timestamps every
 * attempt, which is what makes "today" answerable.
 */
export const BENCHMARK = {
  /** Fraction of the Assessment's max XP that must be scored today. */
  assessmentPct: 0.7,
  /** XP of fresh work today across the unit's OTHER tasks. */
  practiceXP: 40,
};

/**
 * The coverage target, lifted from docs/GED-SPRINT.md §6.
 *
 * The rotation can only deal units that exist, so the teacher screen diffs this
 * against what is actually on disk to answer "what do we still need to make".
 * `id`s that exist under src/data/<track>/ are counted as built automatically —
 * this list is never a source of truth for what IS built, only for what SHOULD be.
 */
export const CONTENT_BLUEPRINT = {
  GED_ENG: [
    { id: 'ENG_0A', title: 'Pronouns', strand: 'Language' },
    { id: 'ENG_0B', title: 'Subject–Verb Agreement', strand: 'Language' },
    { id: 'ENG_1A', title: 'Main Idea & Detail', strand: 'Reading' },
    { id: 'ENG_1B', title: 'Purpose & Tone', strand: 'Reading' },
    { id: 'ENG_1C', title: 'Claims & Evidence', strand: 'Reading' },
    { id: 'ENG_3', title: 'Verb Tense', strand: 'Language' },
    { id: 'ENG_4', title: 'Sentence Boundaries', strand: 'Language' },
    { id: 'ENG_5', title: 'Punctuation & Confusables', strand: 'Language' },
    { id: 'ENG_6', title: 'Transitions & Organization', strand: 'Language' },
    { id: 'ENG_10', title: 'Extended Response (Essay)', strand: 'Writing', critical: true },
  ],
  GED_HISTORY: [
    { id: 'HIST_0A', title: 'Reading Social Studies Sources', strand: 'Spine', critical: true },
    { id: 'HIST_1A', title: 'Colonial America', strand: 'US History' },
    { id: 'HIST_1B', title: 'The Constitution', strand: 'US History' },
    { id: 'HIST_2A', title: 'Foundations of Government', strand: 'Civics (50%)', critical: true },
    { id: 'HIST_2B', title: 'Rights, Citizenship & Elections', strand: 'Civics (50%)' },
    { id: 'HIST_3A', title: 'Economics', strand: 'Economics' },
    { id: 'HIST_4A', title: 'Geography & Human-Environment', strand: 'Geography' },
  ],
  GED_MATH: [
    { id: 'MATH_0B', title: 'Fractions, Decimals & Percents', strand: 'Quantitative' },
    { id: 'MATH_0C', title: 'Ratios, Proportions & Rates', strand: 'Quantitative' },
    { id: 'MATH_0D', title: 'Data, Statistics & Probability', strand: 'Quantitative' },
    { id: 'MATH_0E', title: 'Geometry & Measurement', strand: 'Quantitative' },
    { id: 'MATH_1A', title: 'Expressions & Equations', strand: 'Algebraic' },
    { id: 'MATH_1B', title: 'Linear Equations & Graphing', strand: 'Algebraic' },
  ],
  GED_SCIENCE: [
    { id: 'SCI_0A', title: 'Reading Science: Data & Method', strand: 'Practices', critical: true },
    { id: 'SCI_1A', title: 'Cells & Human Body Systems', strand: 'Life (40%)' },
    { id: 'SCI_1B', title: 'Ecosystems, Energy Flow & Heredity', strand: 'Life (40%)' },
    { id: 'SCI_2A', title: 'Matter, Atoms & Reactions', strand: 'Physical (40%)' },
    { id: 'SCI_2B', title: 'Force, Motion & Energy', strand: 'Physical (40%)' },
    { id: 'SCI_3A', title: 'Earth & Space Science', strand: 'Earth & Space (20%)' },
  ],
};

/** Short labels for the plan UI, so it never prints "GED_HISTORY". */
export const SUBJECT_LABEL = {
  GED_ENG: 'English',
  GED_HISTORY: 'Social Studies',
  GED_MATH: 'Math',
  GED_SCIENCE: 'Science',
};

/** Tracks the plan draws from, in the order the teacher ranks them by risk. */
export const PLAN_TRACKS = ['GED_ENG', 'GED_HISTORY', 'GED_MATH', 'GED_SCIENCE'];
