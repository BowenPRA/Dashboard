import { lazy } from 'react';
import {
  Languages, Keyboard, BookOpen, Headphones, FileText,
  Image as ImageIcon, ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil, PenLine, Scale, LineChart,
  Move3d, Grid3x3, Zap, FlaskConical, Divide, Library
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
    props: ({ pool, unit, track, savedData, strikes, onAddStrike, onComplete, onProgress, onQuit }) =>
      ({ pool, track, unitTitle: unit?.meta?.title, savedData, strikes, onAddStrike, onComplete, onProgress, onQuit }),
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
    // Presents as "Quiz" everywhere — a single shared label, so the rename is
    // global (no per-track override exists). The id/dbKey stay ASSESSMENT/p9.
    label: 'Quiz',
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
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit, title: 'Practice' }),
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
  {
    id: 'VECTOR_ADD',
    nativeMax: 10,
    dbKey: 'p16',
    // "Resolve, add down the columns, rebuild." The student is given two forces
    // as magnitude + angle and fills in the component table while the picture
    // redraws under their fingers. Like Graph It it is production, not
    // recognition — there is nothing to eliminate. Item shape is documented in
    // src/tasks/VectorAdd.jsx; every answer is derived from the forces.
    label: 'Vectors',
    icon: Move3d,
    color: { bg: 'bg-[#6366f1]', border: 'border-[#4338ca]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'mastery',
    component: lazy(() => import('./VectorAdd.jsx')),
    hasContent: (u) => notEmpty(u.vectorAdd),
    buildPool: (u) => u.vectorAdd || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'NUM_DRILL',
    nativeMax: 10,
    // p1–p16 are taken; p5 is unused as a task key but reads as a workbook
    // question id everywhere — do not reuse it. p17 is the next free key.
    dbKey: 'p17',
    // "Column arithmetic, one digit at a time." The student is given operand
    // pairs only; the component derives every partial product, carry and column
    // sum, checks each cell as it is typed, and lands feedback on the digit that
    // caused the error rather than on the final answer. Production, not
    // recognition — the same rule Graph It and Vectors follow. A wrong ladder
    // rung stays locked until the one above it is clean. Item shape is
    // documented in src/tasks/NumberDrill.jsx.
    label: 'Number Gym',
    icon: Grid3x3,
    color: { bg: 'bg-[#f97316]', border: 'border-[#c2410c]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./NumberDrill.jsx')),
    hasContent: (u) => !!u.drill?.ladder?.length,
    buildPool: (u) => u.drill,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'FACTOR_BLITZ',
    nativeMax: 10,
    // p1–p17 are taken (p5 is reserved as a workbook question id); p18 is next.
    dbKey: 'p18',
    // "A number lands; grab every factor before the clock." Timed recognition of
    // the factors under 13 of a target number — the student taps the tiles that
    // divide it. Production, not recognition of a stored key: the component
    // derives each round's factor set with `N % c === 0`, the same
    // derive-don't-store rule Number Gym, Graph It and Vectors follow. Item shape
    // is documented in src/tasks/FactorBlitz.jsx.
    label: 'Factor Blitz',
    icon: Zap,
    color: { bg: 'bg-[#84cc16]', border: 'border-[#4d7c0f]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./FactorBlitz.jsx')),
    hasContent: (u) => !!u.factorBlitz?.rounds?.length,
    buildPool: (u) => u.factorBlitz,
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'FORMULA_WRITE',
    nativeMax: 10,
    // p1–p19 are taken (p5 is reserved as a workbook question id); p20 is next.
    dbKey: 'p20',
    // "Turn the name into a formula." The step before writing equations: the
    // student sets each ion's charge (superscript) and the subscripts that make
    // the compound neutral. Correctness is derived from the charges + counts, not
    // a stored string. Item shape is in src/tasks/FormulaWrite.jsx.
    label: 'Formulae',
    icon: FlaskConical,
    color: { bg: 'bg-[#0891b2]', border: 'border-[#0e7490]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./FormulaWrite.jsx')),
    hasContent: (u) => notEmpty(u.formulaWrite),
    buildPool: (u) => u.formulaWrite || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'SYMBOL_EQ',
    nativeMax: 10,
    // p1–p18 are taken (p5 is reserved as a workbook question id); p19 is next.
    dbKey: 'p19',
    // "Turn the word equation into a balanced symbol equation." The student
    // picks a formula and a coefficient for each reactant/product slot; the
    // component parses every chosen formula into atom counts and DERIVES whether
    // the equation both uses the right species and balances — the same
    // derive-don't-store rule Number Gym / Graph It / Vectors follow. Item shape
    // is documented in src/tasks/SymbolEquation.jsx.
    label: 'Equations',
    icon: FlaskConical,
    color: { bg: 'bg-[#0087a8]', border: 'border-[#026e88]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./SymbolEquation.jsx')),
    hasContent: (u) => notEmpty(u.symbolEq),
    buildPool: (u) => u.symbolEq || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'POLY_DIV',
    nativeMax: 10,
    // p1–p20 are taken (p5 is reserved as a workbook question id); p21 is next.
    dbKey: 'p21',
    // "Set the division out and work down the columns." The student is given a
    // dividend and a divisor as coefficient arrays and fills the written long
    // division one move at a time — divide, multiply, subtract, and the app
    // brings down. Every quotient term, product row and subtraction is DERIVED
    // by utils/polynomial.js, the same derive-don't-store rule Number Gym,
    // Graph It and Vectors follow. Item shape is in src/tasks/PolyDivision.jsx.
    label: 'Long Division',
    icon: Divide,
    color: { bg: 'bg-[#4338ca]', border: 'border-[#312e81]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./PolyDivision.jsx')),
    hasContent: (u) => !!u.polyDiv?.items?.length,
    buildPool: (u) => u.polyDiv,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'WORKBOOK_B',
    nativeMax: 10,
    // p1–p21 are taken (p5 is reserved as a workbook question id); p22 is next.
    dbKey: 'p22',
    // A SECOND Workbook slot, reading `u.workbookB` and rendering with the same
    // screen as WORKBOOK. A unit that covers two textbook sections wants each
    // exercise to be its own task on the card — separately scored, separately
    // resumable — rather than one twenty-question list the student has to hold
    // in their head. Nothing about the format differs; only the data key does.
    label: 'Book Problems',
    icon: Library,
    color: { bg: 'bg-[#f43f5e]', border: 'border-[#be123c]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./Workbook.jsx')),
    hasContent: (u) => notEmpty(u.workbookB),
    buildPool: (u) => u.workbookB || [],
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit, title: 'Book Problems' }),
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
export function resolveUnitTasks(unit, unitXP = 0, scores = {}) {
  return (unit?.phases || []).flatMap((phase) => {
    // The in-unit arcade tile is gone: the games now live only in the standalone
    // Arcade track, where playing costs gold (src/views/Arcade.jsx). Units still
    // DECLARE the GAMES task — it is a 0-XP reward, so dropping it here changes no
    // XP total or phase gate — but it never renders or launches from a unit. Undo
    // this one filter to bring the free in-unit games back.
    // An optional `requires: '<TASK_ID>'` gates a phase on another task having
    // been ATTEMPTED, not scored — a progress record exists once recordAttempt
    // writes one, even for a score of zero. The arcade uses it: the game unlocks
    // the moment the assessment is sat, pass or fail (§6.4). With no `scores`
    // (validator, teacher view) the gate reads as not-yet-attempted, i.e. locked.
    const gateKey = phase.requires ? resolveTask({ id: phase.requires })?.dbKey : null;
    const gateUnmet = gateKey ? !scores?.[gateKey] : false;
    return (phase.tasks || [])
      .filter((t) => t.id !== 'GAMES')
      .map((t) => {
        const resolved = resolveTask(t);
        if (!resolved) return null;
        return {
          ...resolved,
          phaseId: phase.id,
          locked: unitXP < (phase.threshold || 0) || gateUnmet,
          empty: !resolved.hasContent(unit || {}),
        };
      })
      .filter(Boolean);
  });
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
