import { lazy } from 'react';
import {
  Languages, Keyboard, BookOpen, Headphones, FileText,
  Image as ImageIcon, ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil, PenLine, Scale, LineChart,
  Move3d, Grid3x3, Zap, FlaskConical, Divide, Library, AreaChart, MousePointerClick, MonitorSmartphone,
  Ruler, Tag, Beaker, Split, Spline, Variable, SearchCheck, ListOrdered, Blend, SquareRadical, Superscript,
  ShoppingBasket, Grid2x2, Undo2, Pyramid, Atom, FlaskRound
} from 'lucide-react';
import { assetUrl, audioUrl, slideAudioUrl } from '../utils/assetPaths';
import { getTrackConfig } from '../components/trackRegistry';

/**
 * Does this track carry Vietnamese twins? A track that declares
 * `bilingual: false` (ADD_MATH, COORD_SCI) has nothing for an EN/VN toggle to
 * switch to, so the screens that offer one are told to leave it out.
 */
const bilingualOf = (track) => getTrackConfig(track)?.bilingual !== false;

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
    // `savedData`/`onProgress` are the resume round-trip: the deck reopens on
    // the slide it was closed on, with the checks already answered kept.
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ slides: pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
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
    // of assuming Cambridge Year 8 Science for every subject. `essayArchive` is
    // the student's saved essays for this track (see utils/essayArchive.js) —
    // the task reads it for the "watch for these" list and the prompt picker,
    // and writes back through `meta.essay` on onProgress/onComplete.
    props: ({ pool, unit, unitId, track, savedData, strikes, essayArchive, onAddStrike, onComplete, onProgress, onQuit }) =>
      ({ pool, unitId, track, unitTitle: unit?.meta?.title, savedData, strikes, essayArchive, onAddStrike, onComplete, onProgress, onQuit }),
  },
  {
    id: 'PROOFREAD',
    nativeMax: 10,
    // p1–p32 are taken (p5 is a workbook question id, p26 is held for TYPE_GYM);
    // p33 is next.
    dbKey: 'p33',
    // "Find the mistakes, then fix them." A passage with a handful of errors
    // hidden in otherwise correct prose; the student clicks the words that are
    // wrong and TYPES the correction. Built for the GED English track, where
    // the essay's conventions trait is lost to exactly the slips this drills —
    // and where the revision workshop assumes a student can find a slip in
    // his own paragraph. Every offset and every mark is DERIVED from the
    // authored passage by utils/proofread.js, and `checkProofreadItems` refuses
    // an error the screen could not locate. Item shape in the same file and in
    // docs/ged-english-lessons.md.
    label: 'Find & Fix',
    icon: SearchCheck,
    color: { bg: 'bg-[#f59e0b]', border: 'border-[#b45309]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./Proofread.jsx')),
    hasContent: (u) => notEmpty(u.proofread),
    buildPool: (u) => u.proofread || [],
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'SEQUENCE',
    nativeMax: 10,
    // p1–p33 are taken; p34 is next.
    dbKey: 'p34',
    // "Put it in order." The sentences of a paragraph or the paragraphs of an
    // essay, scrambled; the student moves them back. Trait 2 of the essay
    // rubric is scored on the order ideas arrive in and the transitions that
    // carry the reader between them, and this is the cheapest way to make that
    // visible before the student has to do it under a clock. The scramble is a
    // seeded derangement (no free marks, same puzzle every time) and the
    // marking is derived by utils/sequence.js.
    label: 'Order It',
    icon: ListOrdered,
    color: { bg: 'bg-[#8b5cf6]', border: 'border-[#6d28d9]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./Sequence.jsx')),
    hasContent: (u) => notEmpty(u.sequence),
    buildPool: (u) => u.sequence || [],
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
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
    props: ({ unit, track, onComplete, onQuit }) => ({ unit, onComplete, onQuit, bilingual: bilingualOf(track) }),
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
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, title: 'Practice', bilingual: bilingualOf(track) }),
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
  {
    id: 'ENERGY_PROFILE',
    nativeMax: 10,
    // p1–p22 are taken (p5 is reserved as a workbook question id); p23 is next.
    dbKey: 'p23',
    // "Draw the reaction pathway." The Cambridge worked example asks a student to
    // DRAW an energy level diagram; this is that, made live. They move the
    // products line above or below the fixed reactants line, drag out the
    // activation-energy hump (which has to clear BOTH lines), and label ΔH
    // negative or positive — and the diagram redraws under their hands. Every
    // judgement is DERIVED from the geometry by src/utils/energyProfile.js, the
    // same derive-don't-store rule Number Gym / Graph It / Equations follow, and
    // `checkItem` refuses an item whose ΔH contradicts its stated type. Item
    // shape is documented in src/tasks/EnergyProfile.jsx.
    label: 'Energy Diagrams',
    icon: AreaChart,
    color: { bg: 'bg-[#c8102e]', border: 'border-[#8f0b20]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./EnergyProfile.jsx')),
    hasContent: (u) => notEmpty(u.energyProfile),
    buildPool: (u) => u.energyProfile || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'POINT_IT',
    nativeMax: 10,
    // p1–p23 are taken (p5 is reserved as a workbook question id); p24 is next.
    // p24–p26 belong to the Technology track (POINT_IT, SIM, TYPE_GYM — see
    // docs/primary-tech/BUILD-PLAN.md); the shelved programming plan starts at p27.
    dbKey: 'p24',
    // "Click the address bar." An authored picture of an application window with
    // clickable regions over it, worked one prompt at a time. The mark is DERIVED
    // from which region the click lands in (src/utils/pointIt.js) — the same
    // derive-don't-store rule Number Gym / Graph It / Equations follow — and a
    // wrong click is answered by NAME ("that is the search box inside the page,
    // not the address bar"), which is the lesson rather than a red X. `checkItem`
    // refuses a prompt whose target names no region, so an unpassable prompt
    // cannot ship. Item shape is documented in src/tasks/PointIt.jsx.
    label: 'Find It',
    icon: MousePointerClick,
    color: { bg: 'bg-[#0ea5e9]', border: 'border-[#0369a1]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./PointIt.jsx')),
    hasContent: (u) => notEmpty(u.pointIt),
    buildPool: (u) => u.pointIt || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'SIM',
    nativeMax: 10,
    // p1–p24 are taken (p5 is reserved as a workbook question id); p25 is next,
    // and p24–p26 belong to the Technology track — POINT_IT, SIM, TYPE_GYM.
    dbKey: 'p25',
    // "Try It." A fake computer fills the pane, the student does a real job in
    // it, and the app checks the STATE the machine ends up in — never which
    // control was clicked, so Ctrl+S, Save As and the right-click menu all pass.
    // That is the derive-don't-store rule applied to a desktop: there is no
    // answer key to author and none to get wrong, because the answer is whatever
    // the simulated machine ends up in. The engine is src/utils/appSim.js, and
    // its `checkItem` refuses an item whose authored solution does not reach the
    // goal — or whose goal is already met before the student touches anything.
    // Item shape is documented in src/tasks/AppSim.jsx.
    label: 'Try It',
    icon: MonitorSmartphone,
    color: { bg: 'bg-[#0284c7]', border: 'border-[#075985]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'practice',
    component: lazy(() => import('./AppSim.jsx')),
    hasContent: (u) => notEmpty(u.sim),
    buildPool: (u) => u.sim || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'INTERVAL',
    nativeMax: 10,
    // p1–p25 are taken (p5 is reserved as a workbook question id), and p26 is
    // held for the Technology track's TYPE_GYM; p27 is the next free key.
    dbKey: 'p27',
    // "Draw it, then write it." One solution set, produced twice: the student
    // places the endpoints and shades the line, then writes the same set in
    // interval notation, choosing every bracket. Both stages are marked against
    // a set DERIVED from the item's inequality by src/utils/interval.js — there
    // is no answer key to author, and because the drawing is read back through
    // the same `setFromGraph` the marking uses, the picture and the notation can
    // never disagree. Nothing is multiple choice: there is nothing to eliminate,
    // the same rule Graph It, Vectors and Long Division follow. Item shape is
    // documented in src/tasks/IntervalLine.jsx.
    label: 'Number Line',
    icon: Ruler,
    color: { bg: 'bg-[#7c3aed]', border: 'border-[#5b21b6]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./IntervalLine.jsx')),
    hasContent: (u) => notEmpty(u.intervals),
    buildPool: (u) => u.intervals || [],
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'LABEL_IT',
    nativeMax: 10,
    // p27 was the last key taken; p28 is next.
    dbKey: 'p28',
    // The unit's own diagram with its labels stripped off and a pin where each
    // label pointed; tap a label, tap a pin. Built for the science units, where
    // "label the diagram" is what the exam asks and what the deck could only
    // show. Item shape in src/utils/labelIt.js. Resumable per diagram.
    label: 'Label It',
    icon: Tag,
    color: { bg: 'bg-[#0ea5e9]', border: 'border-[#0369a1]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./LabelIt.jsx')),
    hasContent: (u) => notEmpty(u.labelIt),
    buildPool: (u) => u.labelIt || [],
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'LAB_BENCH',
    nativeMax: 10,
    dbKey: 'p29',
    // Generative measuring practice: a fresh cylinder / thermometer / heating
    // curve every round, so re-doing it is practice, not memory. The unit only
    // declares its modes and round count (src/utils/labBench.js).
    label: 'Lab Bench',
    icon: Beaker,
    color: { bg: 'bg-[#0d9488]', border: 'border-[#0f766e]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./LabBench.jsx')),
    hasContent: (u) => !!(u.labBench && Array.isArray(u.labBench.modes) && u.labBench.modes.length),
    buildPool: (u) => u.labBench || null,
    props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
  },
  {
    id: 'MOD_SOLVE',
    nativeMax: 10,
    // p1–p29 are taken (p5 is a workbook question id, p26 is held for TYPE_GYM);
    // p30 is next.
    dbKey: 'p30',
    // "Name the shape, write the cases, solve, then CHECK." A modulus equation
    // or inequality from the coursebook, worked in the four moves the book
    // works it in, with every move derived from the coefficients by
    // utils/modulus.js — the two cases, their solutions, the substitution
    // check that throws out an extraneous root, and for an inequality the
    // critical values and the shaded number line. Nothing is authored but
    // the question. Item shape is in src/tasks/ModulusSolver.jsx.
    label: 'Case Solver',
    icon: Split,
    color: { bg: 'bg-[#0e7490]', border: 'border-[#155e75]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./ModulusSolver.jsx')),
    hasContent: (u) => !!u.modulusSolve?.items?.length,
    buildPool: (u) => u.modulusSolve,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'CUBIC_SKETCH',
    nativeMax: 10,
    dbKey: 'p31',
    // "Sketch it": a cubic in factorised form, sketched the way the book
    // sketches it — the x-intercepts from the factors, the y-intercept from
    // x = 0, the end behaviour from the sign of k, cross-or-touch at each root
    // — and then, for the modulus, the pieces below the axis tapped and
    // folded up. utils/cubic.js derives every one of those from the factors.
    // Item shape is in src/tasks/CubicSketch.jsx.
    label: 'Sketch It',
    icon: Spline,
    color: { bg: 'bg-[#2563eb]', border: 'border-[#1e40af]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'practice',
    component: lazy(() => import('./CubicSketch.jsx')),
    hasContent: (u) => !!u.cubicSketch?.items?.length,
    buildPool: (u) => u.cubicSketch,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'REARRANGE',
    nativeMax: 10,
    // p1–p31 are taken (p5 is a workbook question id, p26 is held for TYPE_GYM);
    // p32 is next.
    dbKey: 'p32',
    // "Make it the subject, then use it." A physics formula, a target letter
    // and the given quantities: the student changes the subject one both-sides
    // move at a time (× ÷ + − square √) with the working building up as a
    // notebook page, converts every given into SI, and only then substitutes
    // and calculates. Every chip, hint, substituted line, answer and named
    // slip is DERIVED from the formula by utils/formula.js — the same
    // derive-don't-store rule Balance, Graph It and Long Division follow — and
    // `checkRearrangeItems` refuses an item the taught strategy cannot finish.
    // Item shape is documented in src/tasks/Rearrange.jsx and
    // docs/acellus-physics-course.md.
    label: 'Isolate It',
    icon: Variable,
    color: { bg: 'bg-[#4f46e5]', border: 'border-[#3730a3]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'practice',
    component: lazy(() => import('./Rearrange.jsx')),
    hasContent: (u) => !!u.rearrange?.items?.length,
    buildPool: (u) => u.rearrange,
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'VENN',
    nativeMax: 10,
    // p1–p34 are taken (p5 is a workbook question id, p26 is held for TYPE_GYM);
    // p35 is next.
    dbKey: 'p35',
    // "Words → notation → picture → number." A Venn diagram from an IGCSE
    // question — printed with counts, given as facts to fill in, or built from
    // rules like "multiples of 3" by placing every element — and the questions
    // asked about it. Each question is turned into notation (picked), the
    // notation into a picture (the student SHADES the regions), and only then
    // the picture into a count, a probability or a list. utils/sets.js derives
    // every region, count, fill order and notation option from the question,
    // and `checkVennItems` refuses an item that cannot be finished. Item shape
    // is documented in src/tasks/VennTask.jsx and docs/ext-math/task-engines.md.
    label: 'Venn Diagrams',
    icon: Blend,
    color: { bg: 'bg-[#0f766e]', border: 'border-[#115e59]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'practice',
    component: lazy(() => import('./VennTask.jsx')),
    hasContent: (u) => !!u.venn?.items?.length,
    buildPool: (u) => u.venn,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'SURD_SIMPLIFY',
    nativeMax: 10,
    dbKey: 'p36',
    // "Find a square, take its root out, ask if you are finished." Simplifying
    // k√n, collecting like surds, and multiplying surds, one move at a time,
    // with the student's own splits drawn as a root tree. Any square factor is
    // accepted — the tree simply grows another branch — and the "is it fully
    // simplified?" decision is its own stage, because that is the mark the
    // paper takes. Derived by utils/surds.js; `checkSurdItems` refuses an item
    // with nothing to simplify. Item shape in src/tasks/SurdSimplify.jsx.
    label: 'Surd Breaker',
    icon: SquareRadical,
    color: { bg: 'bg-[#7c3aed]', border: 'border-[#5b21b6]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./SurdSimplify.jsx')),
    hasContent: (u) => !!u.surds?.items?.length,
    buildPool: (u) => u.surds,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'RATIONALISE',
    nativeMax: 10,
    dbKey: 'p37',
    // "Choose the multiplier, clear the bottom, multiply the top, simplify
    // fully." Brackets with surds expanded in a 2 × 2 grid (a conjugate pair's
    // surd cells visibly cancel), then fractions with k√m or a two-term bracket
    // on the bottom, rationalised in the moves the mark scheme pays for. Every
    // cell, conjugate, bottom and simplified answer is derived by
    // utils/surds.js; `checkRationaliseItems` refuses an item whose answer
    // would not fit the boxes. Item shape in src/tasks/Rationalise.jsx.
    label: 'Rationalise It',
    icon: Divide,
    color: { bg: 'bg-[#c2410c]', border: 'border-[#9a3412]', text: 'text-white' },
    defaultMaxXP: 30,
    phase: 'practice',
    component: lazy(() => import('./Rationalise.jsx')),
    hasContent: (u) => !!u.rationalise?.items?.length,
    buildPool: (u) => u.rationalise,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  {
    id: 'LOG_SIMPLIFY',
    nativeMax: 10,
    // p1–p37 are taken (p5 is a workbook question id, p26 is held for TYPE_GYM);
    // p38 is next.
    dbKey: 'p38',
    // "Numbers to logs, powers inside, combine, then ask: is it a number?"
    // Evaluating a log as the power it asks for, and simplifying a sum of logs
    // to one log — and then to a number when it is an exact power of the base —
    // on a ladder of levels that only climbs. Every move is derived with exact
    // fractions by utils/logs.js, and the power ladder beside the question
    // shows where the answer sits between the base's powers.
    // `checkLogItems` refuses an item with nothing to simplify, a power that
    // leaves a root inside, or levels out of order. Item shape in
    // src/tasks/LogSimplify.jsx.
    label: 'Log Simplifier',
    icon: Superscript,
    color: { bg: 'bg-[#0284c7]', border: 'border-[#075985]', text: 'text-white' },
    defaultMaxXP: 35,
    phase: 'practice',
    component: lazy(() => import('./LogSimplify.jsx')),
    hasContent: (u) => !!u.logSimplify?.items?.length,
    buildPool: (u) => u.logSimplify,
    props: ({ pool, savedData, onComplete, onProgress, onQuit }) => ({ pool, savedData, onComplete, onProgress, onQuit }),
  },
  // ── Year 7 algebra (2.3–2.5) and particles (Science 2.5–2.7) ──────────────
  // p33 and p34 are held by the GED English Find & Fix / Order It tasks, which
  // were in progress when these landed; p39 is the first key after LOG_SIMPLIFY.
  // Every engine below is derive-don't-store: the item is the question, and
  // utils/algebra.js, utils/pyramid.js, utils/elements.js and
  // utils/particles.js work out every mark. Schemas in
  // docs/y7-math/algebra-engines.md and docs/y7-science/particle-engines.md.
  {
    id: 'COLLECT_TERMS',
    nativeMax: 10,
    dbKey: 'p39',
    // "Find, move, collect." The terms of an expression, each carrying the sign
    // in front of it, are sorted into one basket per KIND (x, y, ab = ba, x², the
    // numbers); each basket is totalled; the answer is written in simplest form.
    // The two slips 2.3 is built around — the invisible 1 and the sign left
    // behind — are named when they happen. Levels only climb.
    label: 'Collect It',
    icon: ShoppingBasket,
    color: { bg: 'bg-[#7c3aed]', border: 'border-[#5b21b6]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./CollectTerms.jsx')),
    hasContent: (u) => !!u.collectTerms?.items?.length,
    buildPool: (u) => u.collectTerms,
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'EXPAND_GRID',
    nativeMax: 10,
    dbKey: 'p40',
    // "One box, one multiplication." A bracket is expanded in the book's grid —
    // the outside term down the side, each inside term (with its sign) across the
    // top — box by box, then written out, then collected when there is more than
    // one bracket. Work-backwards items blank a number and ask for it.
    label: 'Expand It',
    icon: Grid2x2,
    color: { bg: 'bg-[#ea580c]', border: 'border-[#c2410c]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./ExpandGrid.jsx')),
    hasContent: (u) => !!u.expandGrid?.items?.length,
    buildPool: (u) => u.expandGrid,
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'FLOW_SOLVE',
    nativeMax: 10,
    dbKey: 'p41',
    // "Build the flow chart, reverse it, check it." An equation (or an "I think
    // of a number" story) becomes the chain of operations done to the letter;
    // the student reverses it with inverse operations — last step first — and
    // puts the answer back in to check. Stories first ask which equation fits.
    label: 'Undo It',
    icon: Undo2,
    color: { bg: 'bg-[#0d9488]', border: 'border-[#0f766e]', text: 'text-white' },
    defaultMaxXP: 25,
    phase: 'practice',
    component: lazy(() => import('./FlowSolve.jsx')),
    hasContent: (u) => !!u.flowSolve?.items?.length,
    buildPool: (u) => u.flowSolve,
    props: ({ pool, track, savedData, onComplete, onProgress, onQuit }) =>
      ({ pool, savedData, onComplete, onProgress, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'ALG_PYRAMID',
    nativeMax: 10,
    dbKey: 'p42',
    // Algebra Pyramids, generated fresh every attempt: build up (add and
    // collect), work down (subtract), expand brackets on the bottom row, or
    // solve for the letter when the top is a number. The unit declares only
    // its modes and round count (utils/pyramid.js).
    label: 'Pyramids',
    icon: Pyramid,
    color: { bg: 'bg-[#ca8a04]', border: 'border-[#a16207]', text: 'text-white' },
    defaultMaxXP: 15,
    phase: 'practice',
    component: lazy(() => import('./AlgebraPyramids.jsx')),
    hasContent: (u) => !!(u.pyramids && Array.isArray(u.pyramids.modes) && u.pyramids.modes.length),
    buildPool: (u) => u.pyramids || null,
    props: ({ pool, track, onComplete, onQuit }) => ({ pool, onComplete, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'ELEMENT_HUNT',
    nativeMax: 10,
    dbKey: 'p43',
    // The book's first-20 Periodic Table, tappable, with rounds drawn fresh each
    // attempt: find an element by name, type its symbol (capitals marked — Co is
    // cobalt, CO is two elements), name a symbol, tap a period or a group, pick
    // out the metals, and say which atoms are heavier (utils/elementHunt.js).
    label: 'Element Hunt',
    icon: Atom,
    color: { bg: 'bg-[#0087a8]', border: 'border-[#00697f]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./ElementHunt.jsx')),
    hasContent: (u) => !!(u.elementHunt && Array.isArray(u.elementHunt.modes) && u.elementHunt.modes.length),
    buildPool: (u) => u.elementHunt || null,
    props: ({ pool, track, onComplete, onQuit }) => ({ pool, onComplete, onQuit, bilingual: bilingualOf(track) }),
  },
  {
    id: 'PARTICLE_LAB',
    nativeMax: 10,
    dbKey: 'p44',
    // Particles drawn fresh each round: count the atoms in a formula, write the
    // formula of a drawn particle, build a particle from its formula, say which
    // elements a name contains, and sort boxes of particles into element,
    // compound and mixture — pure or not, and whether a magnet would pull the
    // iron out (utils/particles.js).
    label: 'Particle Lab',
    icon: FlaskRound,
    color: { bg: 'bg-[#16a34a]', border: 'border-[#15803d]', text: 'text-white' },
    defaultMaxXP: 20,
    phase: 'practice',
    component: lazy(() => import('./ParticleLab.jsx')),
    hasContent: (u) => !!(u.particleLab && Array.isArray(u.particleLab.modes) && u.particleLab.modes.length),
    buildPool: (u) => u.particleLab || null,
    props: ({ pool, track, onComplete, onQuit }) => ({ pool, onComplete, onQuit, bilingual: bilingualOf(track) }),
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
