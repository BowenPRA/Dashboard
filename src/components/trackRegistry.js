import { Atom, Leaf, Languages, Calculator, BookOpen, Landmark, FlaskConical, Sigma, Puzzle, Magnet } from 'lucide-react';

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
    id: 'PHYSICS',
    title: 'Physics',
    desc: 'Forces, Vectors & Motion',
    icon: Magnet,
    group: 'Physics',
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
];

export const TRACK_IDS = TRACK_REGISTRY.map((t) => t.id);

export const getTrackConfig = (id) => TRACK_REGISTRY.find((t) => t.id === id);

/** Display order for grouped views. */
export const TRACK_GROUPS = ['GED', 'Cambridge', 'Physics', 'Problem Solving', 'Foundation'];
