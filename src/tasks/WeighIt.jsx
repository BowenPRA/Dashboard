import { useMemo, useState } from 'react';
import {
  Weight, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, ListChecks,
  Triangle, SlidersHorizontal, PenLine, Scale, Globe,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import {
  weighModel, stagesOf, stripFor, stepLatex, sumLatex, numText, numLatex, placeOf, mul,
  diagnoseCover, diagnoseSetup, diagnoseDecide, diagnoseCalc,
} from '../utils/weighIt';

/* ------------------------------------------------------------------ *
 * WEIGH IT — weight from mass and mass from weight with the formula
 * triangle (Y7 Science 3.1, Gravity, Weight and Mass).
 *
 * Reads a unit's `weighIt`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items: [
 *       { id, level, kind: 'weight', m: '0.5', place: 'earth' },
 *       { id, level, kind: 'mass', W: '650', place: 'earth' },
 *       { id, level, kind: 'same', m: '45', from: 'earth', place: 'moon' },
 *       { id, level, kind: 'two', W: '600', from: 'earth', place: 'moon' },
 *       (+ context / contextFr)
 *   ] }
 * utils/weighIt.js derives the steps, the sums, the answers and the slips.
 *
 * The stages of one step:
 *   COVER   tap the letter you want on the triangle (W on top, m × g below).
 *   SET UP  read what is left: choose × or ÷, and g from the planet strip.
 *   CALC    type the number and choose N or kg.
 * A `same` item (mass somewhere else) has DECIDE (× g, ÷ g, stays the same)
 * then CALC; a `two` item runs the stages twice — the mass, then the weight.
 *
 * A wrong answer can be tried again; a second one (or "Show me") fills the
 * stage in and the item pays half. Progress blob: { [itemId]: 1 | 0.5 },
 * score out of 10. English and French only.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const PLANET_FILL = {
  earth: '#4f8fbf', moon: '#d9d9d9', mars: '#d0643b', jupiter: '#d9a066', venus: '#e8c27a',
  mercury: '#b5b5b5', saturn: '#e6cf8b', uranus: '#8fd3e0', neptune: '#4a6fd1',
};

const T = {
  en: {
    title: 'Weigh It',
    check: 'Check', stuck: 'Show me', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every step right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    heads: { weight: 'Find the weight', mass: 'Find the mass', same: 'The mass somewhere else', two: 'Two steps: the mass, then the weight' },
    stages: { cover: 'Cover', setup: 'Set up', calc: 'Calculate', decide: 'Decide' },
    stepOf: (i, n) => `Step ${i} of ${n}`,
    stepName: { m: 'find the mass', W: 'find the weight' },
    given: 'You know', find: 'Find',
    findWhat: { W: 'its weight, W, in newtons (N)', m: 'its mass, m, in kilograms (kg)' },
    findSame: (p) => `its mass ${p}`,
    coverTitle: 'What do you want to find? Tap it on the triangle to cover it.',
    coverSub: 'W = weight (N) · m = mass (kg) · g = strength of gravity (N/kg)',
    coverRight: 'Right. Now read what is left on the triangle.',
    setupTitle: 'Read what is left. Then set up the sum.',
    setupSub: (on) => `Choose × or ÷, then the strength of gravity ${on}.`,
    opLabel: 'Multiply or divide?', gLabel: 'Strength of gravity, g',
    setupRight: (sum) => `Right: ${sum}.`,
    calcTitle: 'Now calculate. Choose the unit too.',
    calcRight: 'Right.',
    decideTitle: (on) => `The object goes ${on}. What happens to its mass?`,
    decideOpts: { mul: (g) => `Multiply by ${g}`, div: (g) => `Divide by ${g}`, same: 'It stays the same' },
    decideRight: 'Right — mass is the amount of matter, and it does not change.',
    step1Done: (m) => `Step 1 done: m = ${m} kg. Now the weight.`,
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    sameNote: (sum, on) => `Its weight ${on} is ${sum} — the weight changes, the mass does not.`,
    typeHere: 'your answer', unit: 'unit',
    noItems: 'No questions yet', back: 'Return to Dashboard',
    cover: (s) => `Cover ${s}`,
  },
  fr: {
    title: 'Pèse-le',
    check: 'Vérifier', stuck: 'Montre-moi', next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Toutes les étapes justes du premier coup.',
    slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.',
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse',
    heads: { weight: 'Trouve le poids', mass: 'Trouve la masse', same: 'La masse ailleurs', two: 'Deux étapes : la masse, puis le poids' },
    stages: { cover: 'Cache', setup: 'Prépare', calc: 'Calcule', decide: 'Décide' },
    stepOf: (i, n) => `Étape ${i} sur ${n}`,
    stepName: { m: 'trouve la masse', W: 'trouve le poids' },
    given: 'Tu connais', find: 'Trouve',
    findWhat: { W: 'son poids, W, en newtons (N)', m: 'sa masse, m, en kilogrammes (kg)' },
    findSame: (p) => `sa masse ${p}`,
    coverTitle: 'Que cherches-tu ? Touche-le sur le triangle pour le cacher.',
    coverSub: 'W = poids (N) · m = masse (kg) · g = intensité de la gravité (N/kg)',
    coverRight: 'Correct. Maintenant, lis ce qui reste sur le triangle.',
    setupTitle: 'Lis ce qui reste. Puis prépare le calcul.',
    setupSub: (on) => `Choisis × ou ÷, puis l’intensité de la gravité ${on}.`,
    opLabel: 'Multiplier ou diviser ?', gLabel: 'Intensité de la gravité, g',
    setupRight: (sum) => `Correct : ${sum}.`,
    calcTitle: 'Maintenant, calcule. Choisis aussi l’unité.',
    calcRight: 'Correct.',
    decideTitle: (on) => `L’objet va ${on}. Que devient sa masse ?`,
    decideOpts: { mul: (g) => `Multiplier par ${g}`, div: (g) => `Diviser par ${g}`, same: 'Elle reste la même' },
    decideRight: 'Correct — la masse, c’est la quantité de matière, et elle ne change pas.',
    step1Done: (m) => `Étape 1 faite : m = ${m} kg. Maintenant, le poids.`,
    filled: 'C’est rempli pour toi.',
    shown: 'Le voici. Lis-le, puis continue.',
    sameNote: (sum, on) => `Son poids ${on} est ${sum} — le poids change, la masse non.`,
    typeHere: 'ta réponse', unit: 'unité',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
    cover: (s) => `Cache ${s}`,
  },
};
/** A T entry in both languages at once: `{ en, fr }`. */
const inAll = (key, ...args) => {
  const one = (l) => (typeof T[l][key] === 'function' ? T[l][key](...args) : T[l][key]);
  return { en: one('en'), fr: one('fr') };
};
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });
const STAGE_ICON = { cover: Triangle, setup: SlidersHorizontal, calc: PenLine, decide: Scale };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const onText = (p, lang) => tr(lang, p.onEn, null, p.onFr);

function deriveItem(item) {
  if (!item?.id) return null;
  try { return weighModel(item); } catch { return null; }
}

function Stage({ icon: Icon, label, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: INK } : undefined}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
      <span>{label}</span>
    </div>
  );
}

function Message({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, null, msg.fr || msg.en);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.tone === 'ok' ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : soft ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{text}</span>
    </div>
  );
}

// The formula triangle as the deck draws it: W over the line, m × g under it.
// Each letter is a tap target; a covered letter goes grey, as on the deck's
// TRIANGLE_USE, so what is left is what to do.
const CELLS = {
  W: { x: 95, y: 48, w: 70, h: 64, tx: 130, ty: 100, size: 54 },
  m: { x: 54, y: 128, w: 60, h: 62, tx: 84, ty: 176, size: 46 },
  g: { x: 146, y: 128, w: 60, h: 62, tx: 176, ty: 176, size: 46 },
};
function FormulaTriangle({ covered, onTap, wrong = [], lang }) {
  const t = T[lang] || T.en;
  return (
    <svg viewBox="0 0 260 210" className="w-full max-w-[17rem] mx-auto select-none" role="group" aria-label="W = m × g">
      <path d="M 130 12 L 250 198 L 10 198 Z" fill="#fdf1e3" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <line x1="62" y1="118" x2="198" y2="118" stroke={INK} strokeWidth="4" />
      <text x="130" y="174" fontSize="34" fontWeight="bold" fill="#2b2b2b" textAnchor="middle" fontFamily="Inter, 'Segoe UI', system-ui, sans-serif">×</text>
      {Object.entries(CELLS).map(([sym, c]) => {
        const isCovered = covered === sym;
        const isWrong = wrong.includes(sym);
        const tappable = !!onTap && !covered;
        return (
          <g key={sym}
            role={tappable ? 'button' : undefined}
            tabIndex={tappable ? 0 : undefined}
            aria-label={tappable ? t.cover(sym) : undefined}
            onClick={tappable ? () => onTap(sym) : undefined}
            onKeyDown={tappable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(sym); } } : undefined}
            style={{ cursor: tappable ? 'pointer' : 'default' }}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="10"
              fill={isCovered ? '#8a979e' : isWrong ? '#fde2e2' : 'transparent'}
              stroke={isWrong ? '#e11d48' : tappable ? '#f3c79f' : 'none'} strokeWidth="2.5" strokeDasharray={tappable && !isWrong ? '5 4' : undefined} />
            <text x={c.tx} y={c.ty} fontSize={c.size} fontWeight="bold" textAnchor="middle"
              fill={isCovered ? '#c9d1d8' : '#2b2b2b'} fontFamily="Inter, 'Segoe UI', system-ui, sans-serif">{sym}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** The strengths of gravity to choose from: a coloured planet, its name, its g. */
function GStrip({ step, pick, onPick, disabled, lang, right = null }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {stripFor(step).map((p) => {
        const on = pick === p.id;
        const isRight = right === p.id;
        return (
          <button key={p.id} type="button" disabled={disabled} onClick={() => onPick(p.id)}
            className={`flex items-center gap-2 rounded-xl border-2 border-b-[4px] px-2.5 py-2 text-left transition-all
              ${isRight ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
                : on ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-300'}`}>
            <span className="w-5 h-5 rounded-full shrink-0 border-2 border-slate-700/40" style={{ backgroundColor: PLANET_FILL[p.id] }} />
            <span className="min-w-0">
              <span className="block text-xs font-black text-slate-700 dark:text-slate-200 truncate">{tr(lang, p.en.replace(/^the /, 'The '), null, p.fr.replace(/^la /, 'La '))}</span>
              <span className="block font-mono font-black text-sm" style={{ color: INK }}>{p.g} N/kg</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Two or three big choice buttons (× ÷, N kg). */
function Toggle({ options, value, onPick, disabled, right = null }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => {
        const on = value === o.val;
        const isRight = right === o.val;
        return (
          <button key={o.val} type="button" disabled={disabled} onClick={() => onPick(o.val)} aria-pressed={on}
            className={`min-w-[3.5rem] px-3 py-2 rounded-xl border-2 border-b-[4px] font-black text-xl transition-all
              ${isRight ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]'
                : on ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-orange-300'}`}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function WeighIt({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveItem(it)), [pool]);

  const { lang, toggleLang } = useLang({ langs, bilingual });
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stepIdx, setStepIdx] = useState(0);
  const [stageAt, setStageAt] = useState(null);
  const [covered, setCovered] = useState(null);
  const [wrongTaps, setWrongTaps] = useState([]);   // wrong letters (cover) or choices (decide)
  const [op, setOp] = useState(null);
  const [gPick, setGPick] = useState(null);
  const [decided, setDecided] = useState(null);
  const [typed, setTyped] = useState('');
  const [unit, setUnit] = useState(null);
  const [mark, setMark] = useState(null);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const { steps, kind } = model;
  const step = steps[Math.min(stepIdx, steps.length - 1)];
  const stages = stagesOf(step);
  const stage = stageAt || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(stage);
  const sumText = `${step.find} = ${numText(step.value)} ${step.op} ${numText(step.g)}`;

  /* ---------------------------------------------------------- saving */
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const completeItem = (wasHelped) => {
    const next = { ...results, [item.id]: { score: wasHelped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const clearStep = () => {
    setStageAt(null); setCovered(null); setWrongTaps([]); setOp(null); setGPick(null); setDecided(null);
    setTyped(''); setUnit(null); setMark(null); setWrongs(0);
  };
  const goNext = () => {
    setPos((p) => p + 1);
    setStepIdx(0); clearStep();
    setHelped(false); setSlipped(false); setMsg(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /** The stage is done (right, or filled in): on to the next stage, step or item. */
  const advance = (wasHelped, say) => {
    const i = stages.indexOf(stage);
    if (i + 1 < stages.length) {
      setStageAt(stages[i + 1]); setWrongs(0); setWrongTaps([]);
      setMsg(say);
      if (stages[i + 1] === 'calc') requestAnimationFrame(() => document.getElementById('weighit-answer')?.focus());
      return;
    }
    if (stepIdx + 1 < steps.length) {
      setStepIdx(stepIdx + 1); clearStep();
      setMsg({ ...say, ...join(say, inAll('step1Done', numText(step.result))) });
      return;
    }
    setMsg(say);
    completeItem(wasHelped);
  };
  /** A wrong answer: tried once, say why; twice, fill it in and move on. */
  const wrong = (d, fill) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      fill();
      setHelped(true);
      advance(true, { tone: 'shown', ...join(d, inAll('filled')) });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const soft = (d) => setMsg({ tone: 'info', en: d.en, fr: d.fr });

  /* ---------------------------------------------------------- the stages */
  const fillCover = () => setCovered(step.find);
  const fillSetup = () => { setOp(step.op); setGPick(step.place.id); };
  const fillDecide = () => setDecided('=');
  const fillCalc = () => { setTyped(numText(step.result)); setUnit(step.unit); setMark('shown'); };

  const tapCover = (sym) => {
    if (stage !== 'cover' || covered || wrongTaps.includes(sym)) return;
    const d = diagnoseCover(step, sym);
    if (d.ok) { setCovered(sym); advance(helped, { tone: 'ok', ...inAll('coverRight') }); return; }
    setWrongTaps((w) => [...w, sym]);
    wrong(d, fillCover);
  };
  const checkSetup = () => {
    const d = diagnoseSetup(step, { op, place: gPick });
    if (d.ok) { advance(helped, { tone: 'ok', ...inAll('setupRight', sumText) }); return; }
    if (d.soft) { soft(d); return; }
    wrong(d, fillSetup);
  };
  const pickDecide = (choice) => {
    if (stage !== 'decide' || decided || wrongTaps.includes(choice)) return;
    const d = diagnoseDecide(step, choice);
    if (d.ok) { setDecided('='); advance(helped, { tone: 'ok', ...inAll('decideRight') }); return; }
    setWrongTaps((w) => [...w, choice]);
    wrong(d, fillDecide);
  };
  const checkCalc = () => {
    const d = diagnoseCalc(step, typed, unit);
    if (d.ok) { setMark('good'); advance(helped, { tone: 'ok', ...inAll('calcRight') }); return; }
    if (d.soft) { soft(d); return; }
    setMark('bad');
    wrong(d, fillCalc);
  };
  const showMe = () => {
    setSlipped(true);
    setHelped(true);
    ({ cover: fillCover, setup: fillSetup, decide: fillDecide, calc: fillCalc })[stage]();
    advance(true, { tone: 'shown', ...inAll('shown') });
  };
  const onCheck = stage === 'setup' ? checkSetup : stage === 'calc' ? checkCalc : null;

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introFr) : null;
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const first = steps[0];
  const givenLatex = `${first.given} = ${numLatex(first.value)}\\text{ ${first.givenUnit}}`;
  const where = model.from ? `${onText(model.from, lang)} → ${onText(model.place, lang)}` : onText(model.place, lang);
  const findText = kind === 'same' ? t.findSame(onText(model.place, lang))
    : kind === 'two' ? `${t.findWhat.W} — ${onText(model.place, lang)}` : t.findWhat[model.steps[0].find];
  const inputTone = mark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : mark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : mark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const stageTitle = { cover: t.coverTitle, setup: t.setupTitle, calc: t.calcTitle, decide: t.decideTitle(onText(step.place, lang)) }[stage];
  const stageSub = { cover: t.coverSub, setup: t.setupSub(onText(step.place, lang)), calc: '', decide: '' }[stage];
  const sameWeight = kind === 'same' ? mul(first.value, first.g) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined}
        onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Weight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{t.heads[kind]}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {intro && <p className="px-4 pt-3 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{intro}</p>}
            {context && <p className="px-4 pt-3 text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
            <div className="px-4 pt-3 pb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.given}</span>
              <span className="text-2xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={givenLatex} /></span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-black text-slate-600 dark:text-slate-200">
                <Globe className="w-3.5 h-3.5" strokeWidth={3} /> {where}
              </span>
            </div>
            <div className="px-4 pb-3 flex flex-wrap items-baseline gap-x-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.find}</span>
              <span className="font-black text-slate-800 dark:text-slate-100">{findText}</span>
            </div>
            {steps.length > 1 && (
              <div className="px-4 pb-3 flex flex-col gap-1.5">
                {steps.map((s, i) => {
                  const done = itemDone || i < stepIdx;
                  const on = !done && i === stepIdx;
                  return (
                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-sm font-bold
                      ${done ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-300' : on ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                      {done ? <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={3} /> : <span className="w-4 text-center font-black">{i + 1}</span>}
                      <span>{t.stepOf(i + 1, steps.length)} · {t.stepName[s.find]} {onText(s.place, lang)}</span>
                      {done && <span className="ml-auto font-mono font-black">{s.find} = {numText(s.result)} {s.unit}</span>}
                    </div>
                  );
                })}
              </div>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === stage} done={stages.indexOf(s) < stIndex} />)}
              </div>
            )}
          </div>
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {steps.length > 1 && (
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: INK }}>
                  {t.stepOf(stepIdx + 1, steps.length)} · {t.stepName[step.find]} {onText(step.place, lang)}
                </div>
              )}
              <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{stageTitle}</div>
              {stageSub && <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{stageSub}</p>}

              {stage === 'cover' && <FormulaTriangle covered={covered} onTap={tapCover} wrong={wrongTaps} lang={lang} />}

              {stage === 'setup' && (
                <div className="grid sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-4 items-start">
                  <FormulaTriangle covered={step.find} lang={lang} />
                  <div className="min-w-0 flex flex-col gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{t.opLabel}</div>
                      <Toggle options={[{ val: '×', label: '×' }, { val: '÷', label: '÷' }]} value={op}
                        onPick={(v) => { setOp(v); setMsg((m) => (m?.tone === 'bad' || m?.tone === 'info' ? null : m)); }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{t.gLabel}</div>
                      <GStrip step={step} pick={gPick} lang={lang}
                        onPick={(v) => { setGPick(v); setMsg((m) => (m?.tone === 'bad' || m?.tone === 'info' ? null : m)); }} />
                    </div>
                    <div className="text-2xl text-slate-900 dark:text-slate-100 text-center">
                      <SafeInlineMath math={`${step.find} = ${numLatex(step.value)} ${op ? (op === '×' ? '\\times' : '\\div') : '\\;?\\;'} ${gPick ? numLatex(placeOf(gPick).gv) : '?'}`} />
                    </div>
                  </div>
                </div>
              )}

              {stage === 'decide' && (
                <div className="grid gap-2">
                  {[
                    { val: '×', label: t.decideOpts.mul(numText(step.g)) },
                    { val: '÷', label: t.decideOpts.div(numText(step.g)) },
                    { val: '=', label: t.decideOpts.same },
                  ].map((o) => {
                    const bad = wrongTaps.includes(o.val);
                    const good = decided === o.val;
                    return (
                      <button key={o.val} type="button" disabled={bad || !!decided} onClick={() => pickDecide(o.val)}
                        className={`rounded-xl border-2 border-b-[4px] px-4 py-3 text-left font-black text-base transition-all
                          ${good ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]' : bad ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-orange-400'}`}>
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {stage === 'calc' && (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                  {step.op === '=' ? <SafeInlineMath math="m =" /> : <SafeInlineMath math={sumLatex(step)} />}
                  <input
                    id="weighit-answer"
                    value={typed}
                    onChange={(e) => { setTyped(e.target.value); if (mark === 'bad') setMark(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkCalc(); }}
                    inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                    className={`w-36 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 ${inputTone}`}
                  />
                  <div role="group" aria-label={t.unit}>
                    <Toggle options={[{ val: 'N', label: 'N' }, { val: 'kg', label: 'kg' }]} value={unit}
                      onPick={(u) => { setUnit(u); if (mark === 'bad') setMark(null); }} />
                  </div>
                </div>
              )}

              <Message msg={msg} lang={lang} />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={showMe}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
                {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
              </div>
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? t.helped : slipped ? t.slipped : t.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
                {msg?.tone === 'shown' && <div className="-mt-3 mb-3"><Message msg={msg} lang={lang} /></div>}
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 min-w-0 flex flex-col gap-3">
                  {steps.map((s, i) => (
                    <div key={i} className="min-w-0">
                      {steps.length > 1 && <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.stepOf(i + 1, steps.length)} · {onText(s.place, lang)}</div>}
                      {stepLatex(s).map((line, j) => (
                        <div key={j} className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={line} /></div>
                      ))}
                    </div>
                  ))}
                  {kind === 'same' && (
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {t.sameNote(`${numText(first.value)} × ${numText(first.g)} = ${numText(sameWeight)} N`, onText(model.place, lang))}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(194,94,18,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={`${steps[steps.length - 1].find} = ${numLatex(model.result)}\\text{ ${model.unit}}`} /></div>
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400">{onText(model.place, lang)}</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
