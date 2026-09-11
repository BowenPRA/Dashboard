import { Atom, Leaf, Languages, Calculator, BookOpen, Landmark, FlaskConical, Sigma, Puzzle, Orbit, Gamepad2, MonitorSmartphone, Variable, Microscope } from 'lucide-react';

/**
 * The one place a track is defined.
 *
 * `id` is the storage key inside students.progress and the folder name under
 * src/data/ and public/audio/ — all three must match, or units/audio go missing.
 * Adding a track here is all that is required for it to route and render.
 */
export const TRACK_REGISTRY = [
  {
    id: 'GED_MATH',
    title: 'GED Mathematics',
    desc: 'Quantitative & Algebraic Reasoning',
    icon: Calculator,
    group: 'GED',
    theme: {
      bg: 'bg-blue-500', border: 'border-blue-700', hover: 'hover:bg-blue-400',
      text: 'text-blue-600 dark:text-blue-400',
      ambient1: 'bg-blue-400', ambient2: 'bg-cyan-500',
      glow: 'hover:border-blue-400 dark:hover:border-blue-600',
    },
  },
  {
    id: 'GED_ENG',
    title: 'GED Language Arts',
    desc: 'Reading, Writing & Argument',
    icon: BookOpen,
    group: 'GED',
    theme: {
      bg: 'bg-emerald-500', border: 'border-emerald-700', hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
      ambient1: 'bg-emerald-400', ambient2: 'bg-teal-500',
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    },
  },
  {
    id: 'GED_SCIENCE',
    title: 'GED Science',
    desc: 'Life, Physical & Earth Science',
    icon: FlaskConical,
    group: 'GED',
    theme: {
      bg: 'bg-violet-500', border: 'border-violet-700', hover: 'hover:bg-violet-400',
      text: 'text-violet-600 dark:text-violet-400',
      ambient1: 'bg-violet-400', ambient2: 'bg-purple-500',
      glow: 'hover:border-violet-400 dark:hover:border-violet-600',
    },
  },
  {
    id: 'GED_HISTORY',
    title: 'GED Social Studies',
    desc: 'US History, Civics & Economics',
    icon: Landmark,
    group: 'GED',
    theme: {
      bg: 'bg-rose-500', border: 'border-rose-700', hover: 'hover:bg-rose-400',
      text: 'text-rose-600 dark:text-rose-400',
      ambient1: 'bg-rose-400', ambient2: 'bg-pink-500',
      glow: 'hover:border-rose-400 dark:hover:border-rose-600',
    },
  },
  {
    id: 'ADD_MATH',
    title: 'Additional Mathematics',
    desc: 'Cambridge IGCSE 0606',
    icon: Sigma,
    group: 'Cambridge',
    // English-only, for the same reason as COORD_SCI: 0606 is sat in English and
    // its notation IS the vocabulary. Learner-facing content carries no `vn*`
    // twins and the validator's bilingual checks are skipped; components fall
    // back to English through `pick(en, vn)`.
    bilingual: false,
    theme: {
      bg: 'bg-cyan-500', border: 'border-cyan-700', hover: 'hover:bg-cyan-400',
      text: 'text-cyan-600 dark:text-cyan-400',
      ambient1: 'bg-cyan-400', ambient2: 'bg-blue-500',
      glow: 'hover:border-cyan-400 dark:hover:border-cyan-600',
    },
  },
  {
    // The students sitting Acellus Algebra I online. The Acellus lessons show
    // them an answer box and a green tick; what they arrive with is a screenshot
    // and "how do this mr bowen". So this track is deliberately NOT more
    // practice questions — each unit takes the exact item shapes Acellus asks
    // for and rebuilds the WORKING behind them, one legal move at a time.
    id: 'ACELLUS',
    title: 'Acellus Algebra',
    desc: 'Algebra I — the working behind the answer box',
    icon: Variable,
    group: 'Algebra',
    // Bilingual, like GED_MATH and Y7_MATH. These are Vietnamese students
    // taking an American course in English: the algebra is rarely what stops
    // them, and "at most", "no more than", "all real numbers between" is.
    bilingual: true,
    theme: {
      bg: 'bg-purple-500', border: 'border-purple-700', hover: 'hover:bg-purple-400',
      text: 'text-purple-600 dark:text-purple-400',
      ambient1: 'bg-purple-400', ambient2: 'bg-fuchsia-500',
      glow: 'hover:border-purple-400 dark:hover:border-purple-600',
    },
  },
  {
    id: 'AOPS',
    title: 'Problem Solving',
    desc: 'Proportion, Rates & Multi-Step Reasoning',
    icon: Puzzle,
    group: 'Problem Solving',
    theme: {
      bg: 'bg-fuchsia-500', border: 'border-fuchsia-700', hover: 'hover:bg-fuchsia-400',
      text: 'text-fuchsia-600 dark:text-fuchsia-400',
      ambient1: 'bg-fuchsia-400', ambient2: 'bg-purple-500',
      glow: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-600',
    },
  },
  {
    // The student sitting Acellus Physics online — the physics twin of the
    // ACELLUS algebra track, and built on the same rule: each unit rebuilds
    // the WORKING behind the exact item shapes Acellus shows her. Here the
    // working is always the same three moves the answer box hides — rearrange
    // the formula for the unknown, put every number into SI, substitute — so
    // the track's own task (Isolate It) is exactly that. The id stays
    // `PHYSICS`: it is the progress bucket, the data folder and the enrolment
    // key, and the original vectors unit is archived under content-archive/.
    id: 'PHYSICS',
    title: 'Acellus Physics',
    desc: 'Physics — the working behind the answer box',
    icon: Orbit,
    group: 'Physics',
    // Bilingual, like the algebra track: the physics is rarely what stops her,
    // "the tension in the rope at the top of the swing" is.
    bilingual: true,
    theme: {
      bg: 'bg-indigo-500', border: 'border-indigo-700', hover: 'hover:bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400',
      ambient1: 'bg-indigo-400', ambient2: 'bg-sky-500',
      glow: 'hover:border-indigo-400 dark:hover:border-indigo-600',
    },
  },
  {
    id: 'Y7_MATH',
    title: 'Year 7 Mathematics',
    desc: 'Cambridge Lower Secondary',
    icon: Calculator,
    group: 'Cambridge',
    theme: {
      bg: 'bg-orange-500', border: 'border-orange-700', hover: 'hover:bg-orange-400',
      text: 'text-orange-600 dark:text-orange-400',
      ambient1: 'bg-orange-400', ambient2: 'bg-amber-500',
      glow: 'hover:border-orange-400 dark:hover:border-orange-600',
    },
  },
  {
    // The self-study twin of the Year 7 Science classroom decks (Cambridge
    // Lower Secondary Science 7). Bilingual like Y7_MATH: same students, and
    // the science words ("compress", "evaporate", "organelle") ARE the lesson.
    id: 'Y7_SCI',
    title: 'Year 7 Science',
    desc: 'Cambridge Lower Secondary',
    icon: Microscope,
    group: 'Cambridge',
    bilingual: true,
    theme: {
      bg: 'bg-emerald-500', border: 'border-emerald-700', hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
      ambient1: 'bg-emerald-400', ambient2: 'bg-lime-500',
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    },
  },
  {
    id: 'COORD_SCI',
    title: 'IGCSE Coordinated Science',
    desc: 'Cambridge IGCSE 0654',
    icon: FlaskConical,
    group: 'Cambridge',
    // English-only track (the IGCSE exam language). Learner-facing content
    // carries no Vietnamese `vn*` twins; the validator's bilingual checks are
    // skipped for tracks that set this. Components fall back to English via
    // `pick(en, vn)` when a vn field is absent.
    bilingual: false,
    theme: {
      bg: 'bg-teal-500', border: 'border-teal-700', hover: 'hover:bg-teal-400',
      text: 'text-teal-600 dark:text-teal-400',
      ambient1: 'bg-teal-400', ambient2: 'bg-cyan-500',
      glow: 'hover:border-teal-400 dark:hover:border-teal-600',
    },
  },
  {
    id: 'PRIMARY_TECH',
    title: 'Technology',
    desc: 'Everyday computer skills',
    icon: MonitorSmartphone,
    group: 'Cambridge',
    // Bilingual, unlike COORD_SCI and ADD_MATH. Those are English-only because
    // the exam is. Here the opposite argument applies twice over: the student is
    // nine, AND the interface words ("address bar", "attachment", "shut down")
    // are half of what the course teaches — so they need the English and the
    // Vietnamese. See docs/digital-skills-course.md §5.3.
    bilingual: true,
    // Unit-to-unit progression: every unit after the first stays locked until
    // the one before it has scored at least this much XP. Unique to this track
    // so far — the skills here are strictly cumulative (you cannot be taught to
    // download a file before you can find the file you saved), unlike a maths
    // track whose units can be taken in any order. 50 of a unit's 100 is
    // roughly "did the Learn and Do phases", not "finished it", so a student is
    // never stuck behind a task they cannot pass.
    unitGate: 50,
    theme: {
      bg: 'bg-sky-500', border: 'border-sky-700', hover: 'hover:bg-sky-400',
      text: 'text-sky-600 dark:text-sky-400',
      ambient1: 'bg-sky-400', ambient2: 'bg-blue-500',
      glow: 'hover:border-sky-400 dark:hover:border-sky-600',
    },
  },
  {
    id: 'Y8',
    title: 'Year 8 Science',
    desc: 'Biology & Chemistry',
    icon: Atom,
    group: 'Cambridge',
    theme: {
      bg: 'bg-indigo-500', border: 'border-indigo-700', hover: 'hover:bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400',
      ambient1: 'bg-indigo-400', ambient2: 'bg-purple-500',
      glow: 'hover:border-indigo-400 dark:hover:border-indigo-600',
    },
  },
  {
    id: 'Y9',
    title: 'Year 9 Science',
    desc: 'Ecology & Physics',
    icon: Leaf,
    group: 'Cambridge',
    theme: {
      bg: 'bg-emerald-500', border: 'border-emerald-700', hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
      ambient1: 'bg-emerald-400', ambient2: 'bg-teal-500',
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    },
  },
  {
    id: 'ESL',
    title: 'ESL Foundation',
    desc: 'Core Vocabulary & Phonics',
    icon: Languages,
    group: 'Foundation',
    theme: {
      bg: 'bg-amber-400', border: 'border-amber-600', hover: 'hover:bg-amber-300',
      text: 'text-amber-600 dark:text-amber-400',
      ambient1: 'bg-amber-400', ambient2: 'bg-orange-500',
      glow: 'hover:border-amber-400 dark:hover:border-amber-600',
    },
  },
  {
    // The arcade is a track so it routes, appears on Home and gets its own
    // preserved progress bucket (the gold wallet + per-level leaderboards) — but
    // it holds no lessons. Its games are unlocked with gold earned by studying
    // every OTHER track, so it is never part of a student's enrolment and is
    // added to Home for everyone by hand. `/ARCADE` is served by a bespoke view,
    // not the unit dashboard (see App.jsx).
    id: 'ARCADE',
    title: 'Arcade',
    desc: 'Spend gold you earn by studying',
    icon: Gamepad2,
    group: 'Arcade',
    theme: {
      bg: 'bg-indigo-500', border: 'border-indigo-700', hover: 'hover:bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400',
      ambient1: 'bg-indigo-500', ambient2: 'bg-fuchsia-500',
      glow: 'hover:border-indigo-400 dark:hover:border-indigo-600',
    },
  },
];

/** The arcade's track id — its progress bucket, folder key and route. */
export const ARCADE_TRACK_ID = 'ARCADE';

export const TRACK_IDS = TRACK_REGISTRY.map((t) => t.id);

export const getTrackConfig = (id) => TRACK_REGISTRY.find((t) => t.id === id);

/**
 * Whether a unit is held shut by the PREVIOUS unit's score.
 *
 * A track opts in with `unitGate: <xp>`; tracks without it are untouched and
 * every unit stays open, which is how every track behaved before this existed.
 * The first unit in a track's listing is never gated — there is nothing before
 * it to earn XP in.
 *
 * `index` and `previousUnitXP` come from the caller's own ordering (the unit
 * listing is sorted by id in src/data/index.js), so this stays a pure function
 * of two numbers and cannot disagree with what the student is looking at.
 */
export function unitGateOf(trackId, index, previousUnitXP = 0) {
  const need = getTrackConfig(trackId)?.unitGate || 0;
  if (!need || index <= 0) return { locked: false, need: 0 };
  return { locked: previousUnitXP < need, need };
}

/** Display order for grouped views. */
export const TRACK_GROUPS = ['GED', 'Cambridge', 'Algebra', 'Physics', 'Problem Solving', 'Foundation', 'Arcade'];
