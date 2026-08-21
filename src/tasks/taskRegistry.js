import { lazy } from 'react';
import {
  Languages, Keyboard, BookOpen, Headphones, FileText,
  Image as ImageIcon, ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil, PenLine, Scale, LineChart
} from 'lucide-react';
import { assetUrl, audioUrl, slideAudioUrl } from '../utils/assetPaths';

/**
 * The one place a task type is defined.
 *
 * Adding a new activity means adding one entry here and nothing else — the unit
 * card, the launcher, the XP maths and the empty-state checks all read from this
 * list. Nothing downstream is allowed to hardcode a task id or a dbKey.
 *
 * Each entry:
 *   id           task id used by unit data (`phases[].tasks[].id`)
 *   dbKey        progress key in students.progress; NEVER change for a live task
 *   label/icon   how the task presents on the unit card
 *   color        Duolingo-style solid + bottom-border pair
 *   defaultMaxXP used when unit data doesn't specify `maxXP`
 *   phase        default phase when scaffolding a new unit
 *   component    lazily-loaded task screen
 *   hasContent   (unit) => boolean — false renders the "no content" tile
 *   buildPool    (unit, ctx) => whatever the component expects as its data
 *   props        (ctx) => props object for the component
 *
 * ctx = { unit, unitId, track, pool, scores, savedData, strikes, maxXP,
 *         onComplete, onQuit, onAddStrike }
 */

const shuffled = (arr) => [...arr].sort(() => Math.random() - 0.5);

/** realWords decorated with the three audio URLs every vocab task expects. */
const vocabPool = (unit, { track, unitId }) =>
  (unit.realWords || []).map((w) => ({
    ...w,
    isReal: true,
    audio: audioUrl(track, unitId, 'word', w.word),
    defAudio: audioUrl(track, unitId, 'def', w.word),
    sentAudio: audioUrl(track, unitId, 'sentence', w.word),
  }));

const notEmpty = (v) => Array.isArray(v) && v.length > 0;

export const TASKS = [
  {
    id: 'NOTES',
    nativeMax: 10,
    dbKey: 'p10',
    label: 'Notes',
    icon: FileText,
    color: { bg: 'bg-[#94a3b8]', border: 'border-[#64748b]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'concept',
    component: lazy(() => import('./Notes.jsx')),
    hasContent: (u) => notEmpty(u.notes),
    // Slide audio is DERIVED from position, not read from the note — see
    // slideAudioUrl. This is the one place that mapping lives, so intro/summary
    // narration is included and concept slides can never drift out of sync.
    buildPool: (u, { track, unitId }) =>
      (u.notes || []).map((note, i) => ({
        ...note,
        audio: slideAudioUrl(track, unitId, i + 1),
        ...(note.image ? { image: assetUrl(note.image) } : null),
      })),
    // Notes scores itself out of 10 from the check questions embedded in the
    // deck (a deck with none still pays on completion — see Notes.jsx), and
    // forwards a per-item log. It must NOT be hardwired to 10 here.
    props: ({ pool, onComplete, onQuit }) => ({ slides: pool, onComplete, onQuit }),
  },
  {
    id: 'WORD_REC',
    nativeMax: 10,
    dbKey: 'p1',
    label: 'Vocab',
    icon: Languages,
    color: { bg: 'bg-[#58cc02]', border: 'border-[#58a700]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'concept',
    component: lazy(() => import('./Recognition.jsx')),
    hasContent: (u) => notEmpty(u.realWords),
    buildPool: vocabPool,
    props: ({ pool, track, unitId, onComplete }) => ({ pool, track, unitId, onComplete }),
  },
  {
    id: 'SPELLING',
    nativeMax: 10,
    dbKey: 'p2',
    label: 'Spelling',
    icon: Keyboard,
    color: { bg: 'bg-[#1cb0f6]', border: 'border-[#1899d6]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'practice',
    component: lazy(() => import('./Spell.jsx')),
    hasContent: (u) => notEmpty(u.realWords),
    buildPool: (u, ctx) => shuffled(vocabPool(u, ctx)),
    props: ({ pool, track, unitId, savedData, onComplete, onQuit }) =>
      ({ pool, track, unitId, savedData, onComplete, onQuit }),
  },
  {
    id: 'DICTATION',
    nativeMax: 10,
    dbKey: 'p3',
    label: 'Listening',
    icon: Headphones,
    color: { bg: 'bg-[#ce82ff]', border: 'border-[#a567cc]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'practice',
    component: lazy(() => import('./Dictation.jsx')),
    hasContent: (u) => notEmpty(u.dictation),
    buildPool: (u, ctx) => {
      const dict = u.dictation || [];
      return shuffled(
        vocabPool(u, ctx).map((w, i) => ({
          ...w,
          dictSent: dict[i]?.sent || w.sent,
          dictVn: dict[i]?.vnSent || w.vnSent,
        }))
      );
    },
    props: ({ pool, track, unitId, savedData, onComplete, onQuit }) =>
      ({ pool, track, unitId, savedData, onComplete, onQuit }),
  },
  {
    id: 'READ_COMP',
    nativeMax: 10,
    dbKey: 'p4',
    label: 'Reading',
    icon: BookOpen,
    color: { bg: 'bg-[#ff9600]', border: 'border-[#cc7800]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'practice',
    component: lazy(() => import('./Reading.jsx')),
    hasContent: (u) => notEmpty(u.passages),
    buildPool: (u) => u.passages || [],
    props: ({ pool, track, unitId, savedData, onComplete, onQuit }) =>
      ({ pool, track, unitId, savedData, onComplete, onQuit }),
  },
  {
    id: 'SHORT_ANSWERS',
    nativeMax: 20,
    dbKey: 'p6',
    label: 'Questions',
    icon: HelpCircle,
    color: { bg: 'bg-[#ffc800]', border: 'border-[#cca000]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./ShortAnswers.jsx')),
    hasContent: (u) => notEmpty(u.shortQA),
    buildPool: (u) => ({ shortQA: u.shortQA || [] }),
    props: ({ pool, unit, track, savedData, strikes, onAddStrike, onComplete, onQuit }) =>
      ({ pool, track, unitTitle: unit?.meta?.title, savedData, strikes, onAddStrike, onComplete, onQuit }),
  },
  {
    id: 'DIAGRAMS',
    nativeMax: 20,
    dbKey: 'p7',
    // Renders a diagram/chart/image and AI-grades a written answer on content
    // and English — which is exactly a GED source-analysis item. Only the label
    // changed; the id and dbKey are live and must not.
    label: 'Source Analysis',
    icon: ImageIcon,
    color: { bg: 'bg-[#ff4b4b]', border: 'border-[#cc3c3c]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'mastery',
    component: lazy(() => import('./Diagrams.jsx')),
    hasContent: (u) => notEmpty(u.diagrams),
    buildPool: (u) => ({ diagrams: u.diagrams || [] }),
    props: ({ pool, unit, unitId, track, savedData, strikes, onAddStrike, onComplete, onQuit }) =>
      ({ pool, unitId, track, unitTitle: unit?.meta?.title, savedData, strikes, onAddStrike, onComplete, onQuit }),
  },
  {
    id: 'GRAMMAR_EDIT',
    nativeMax: 20,
    dbKey: 'p13',
    label: 'Edit',
    icon: PenLine,
    color: { bg: 'bg-[#0ea5e9]', border: 'border-[#0284c7]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./GrammarEdit.jsx')),
    hasContent: (u) => notEmpty(u.grammarEdit),
    buildPool: (u) => ({ exercises: u.grammarEdit || [] }),
    props: ({ pool, savedData, onComplete, onQuit }) =>
      ({ pool, savedData, onComplete, onQuit }),
  },
  {
    id: 'ESSAY',
    nativeMax: 10,
    dbKey: 'p8',
    label: 'Essay',
    icon: Pencil,
    color: { bg: 'bg-[#14b8a6]', border: 'border-[#0d9488]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'mastery',
    component: lazy(() => import('./Essay.jsx')),
    hasContent: (u) => !!u.essay,
    buildPool: (u) => ({ essay: u.essay || null }),
    // track/unitTitle let the grader pick the right examiner and rubric instead
    // of assuming Cambridge Year 8 Science for every subject.
    props: ({ pool, unit, unitId, track, savedData, strikes, onAddStrike, onComplete, onQuit }) =>
      ({ pool, unitId, track, unitTitle: unit?.meta?.title, savedData, strikes, onAddStrike, onComplete, onQuit }),
  },
  {
    id: 'ASSESSMENT',
    nativeMax: 20,
    dbKey: 'p9',
    label: 'Assessment',
    icon: ClipboardCheck,
    color: { bg: 'bg-[#2563eb]', border: 'border-[#1d4ed8]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'mastery',
    component: lazy(() => import('./Assessment.jsx')),
    hasContent: (u) => notEmpty(u.assessment?.questions),
    buildPool: () => [],
    props: ({ unit, onComplete, onQuit }) => ({ unit, onComplete, onQuit }),
  },
  {
    id: 'GAMES',
    nativeMax: null, // raw game score: clamp to maxXP, do not scale
    dbKey: 'p12',
    label: 'Game',
    icon: Gamepad2,
    color: { bg: 'bg-[#6366f1]', border: 'border-[#4f46e5]', text: 'text-white' },
    defaultMaxXP: 10,
    // A reward task may be declared with maxXP 0 — it is what a student unlocks
    // by finishing the unit, not another thing to grind. The GED units use that:
    // their academic tasks already account for the full 100 XP, so paying XP for
    // the arcade would mean taking it away from real work. Its prize is the
    // shared per-unit leaderboard instead. The validator allows a zero only for
    // tasks flagged here.
    reward: true,
    phase: 'mastery',
    component: lazy(() => import('./Games.jsx')),
    hasContent: (u) => !!u.games?.gameConfig,
    buildPool: (u, ctx) => {
      const pool = shuffled(vocabPool(u, ctx));
      pool.gameConfig = u.games?.gameConfig || null;
      return pool;
    },
    // `track` decides which map and theme the arcade uses — see unitDifficulty.js.
    props: ({ pool, unitId, track, scores, onComplete, onQuit }) =>
      ({ pool, unitId, track, scores, onComplete, onQuit }),
  },
  {
    id: 'BALANCE',
    nativeMax: 10,
    dbKey: 'p14',
    label: 'Balance',
    icon: Scale,
    color: { bg: 'bg-[#7c3aed]', border: 'border-[#5b21b6]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./EquationBalance.jsx')),
    hasContent: (u) => notEmpty(u.balance),
    buildPool: (u) => u.balance || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'WORKBOOK',
    nativeMax: 10,
    dbKey: 'p11',
    // Tiered Focus/Practice/Challenge with stepped solutions — the best
    // self-serve practice shape in the app, not an optional extra.
    label: 'Practice',
    icon: FileBox,
    color: { bg: 'bg-[#ec4899]', border: 'border-[#be185d]', text: 'text-white' },
    defaultMaxXP: 10,
    phase: 'practice',
    component: lazy(() => import('./Workbook.jsx')),
    hasContent: (u) => notEmpty(u.workbook),
    buildPool: (u) => u.workbook || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'GRAPH',
    nativeMax: 10,
    dbKey: 'p15',
    // "Put the key points on the grid": the student reads an equation and clicks
    // the vertex and the zeros on a lattice. Production rather than recognition
    // — there is nothing to eliminate, so it cannot be won by guessing the way
    // an MCQ can. Item shape is documented in src/tasks/GraphPlot.jsx.
    label: 'Graph It',
    icon: LineChart,
    color: { bg: 'bg-[#0891b2]', border: 'border-[#0e7490]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'mastery',
    component: lazy(() => import('./GraphPlot.jsx')),
    hasContent: (u) => notEmpty(u.graphPlot),
    buildPool: (u) => u.graphPlot || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
];

const BY_ID = Object.fromEntries(TASKS.map((t) => [t.id, t]));

/** Task descriptor by id, or undefined for an unknown id. */
export const getTask = (id) => BY_ID[id];

/** Every valid task id, for validation and scaffolding. */
export const TASK_IDS = TASKS.map((t) => t.id);

/**
 * Merges a unit's declared task (`{ id, dbKey, maxXP }`) with its descriptor.
 * The registry owns dbKey — a stale dbKey in unit data is ignored rather than
 * silently writing progress to a key nothing reads back.
 */
export function resolveTask(declared) {
  const def = BY_ID[declared?.id];
  if (!def) return null;
  // `??` not `||`: maxXP 0 is a meaningful value (task shown but worth nothing)
  // and must not silently fall back to the default.
  return { ...def, maxXP: declared.maxXP ?? def.defaultMaxXP, dbKey: def.dbKey };
}

/** All resolved tasks for a unit, flattened across phases, with lock state. */
export function resolveUnitTasks(unit, unitXP = 0) {
  return (unit?.phases || []).flatMap((phase) =>
    (phase.tasks || [])
      .map((t) => {
        const resolved = resolveTask(t);
        if (!resolved) return null;
        return {
          ...resolved,
          phaseId: phase.id,
          locked: unitXP < (phase.threshold || 0),
          empty: !resolved.hasContent(unit || {}),
        };
      })
      .filter(Boolean)
  );
}

/**
 * Converts the score a task component emits into unit XP.
 *
 * Components each emit on their own fixed scale (`nativeMax`) — Essay reports out
 * of 10 while ShortAnswers reports out of 20 — so the scale must come from the
 * registry, not be guessed from maxXP. The previous code assumed every task with
 * maxXP 20 emitted out of 10, which silently turned a genuine 10/20 into 20/20.
 *
 * GAMES has no native ceiling (it forwards a raw game score), so it is clamped.
 */
export function normalizeScore(task, rawScore) {
  const raw = Number(rawScore) || 0;
  const maxXP = task.maxXP ?? task.defaultMaxXP;
  if (raw <= 0) return 0;
  if (!task.nativeMax) return Math.min(maxXP, Math.round(raw)); // raw-score tasks
  return Math.max(0, Math.min(maxXP, Math.round((raw / task.nativeMax) * maxXP)));
}

/** Total XP a student currently holds in a unit, capped at 100. */
export function unitXPOf(unit, scores = {}) {
  const raw = (unit?.phases || []).reduce(
    (sum, phase) =>
      sum +
      (phase.tasks || []).reduce((s, t) => {
        const def = resolveTask(t);
        if (!def) return s;
        return s + Math.min(scores[def.dbKey]?.current || 0, def.maxXP);
      }, 0),
    0
  );
  return Math.min(raw, 100);
}
