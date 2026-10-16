import { useMemo, useState } from 'react';
import {
  WandSparkles, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp,
  ListChecks, BookOpenText, Scale, Route, Calculator,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import {
  easyModel, questionLatex, chainLatex, diagnoseSize, diagnoseMeaning, diagnoseRoute, diagnoseStep, txt,
} from '../utils/makeEasy';

/* ------------------------------------------------------------------ *
 * MAKE IT EASY — choose the easy route for a decimal calculation, then
 * do it (Y7 Maths 4.5, Making decimal calculations easier).
 *
 * Reads a unit's `makeEasy`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items: [
 *       { id, level, a: '340', b: '0.2' },                 340 × 0.2
 *       { id, level, kind: 'of', a: '58', b: '0.5' },      "half of 58"
 *       { id, level, a: '5.6', b: '9' },                   × 9 / × 11
 *       { id, level, a: '6.3', b: '4' },                   partitioning
 *       { id, level, a: '650', b: '0.4', context, contextFr, cue: 'of' },
 *   ] }
 * utils/makeEasy.js derives the routes, the steps, the answer and the slips.
 *
 * The stages:
 *   MEANING  ("of" words and stories) which calculation the words ask for.
 *   SIZE     (× a number less than 1) bigger or smaller than the start?
 *   ROUTE    the easy way, from 2–3: the right one(s) and the misconceptions
 *            (× 0.2 as ÷ 2, × 0.25 as ÷ 25, × 9 as × 10 + one lot …).
 *   STEPS    each step's box in turn (÷ 10 → 34, × 2 → 68); the last box is
 *            the answer.
 *
 * A wrong answer is named and can be tried again; a second one (or "Show
 * me", or a two-way choice got wrong) fills the stage in and the item pays
 * half. Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Make It Easy',
    check: 'Check', stuck: 'Show me', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'The easy way, first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer', another: 'Another easy way',
    heads: {
      tenths: 'Multiply by tenths', hundredths: 'Multiply by hundredths', half: 'Half of', quarter: 'A quarter of',
      tenth: 'A tenth of', near10: '× 9 and × 11', partition: 'Partitioning', story: 'Read it, then work',
    },
    stages: { meaning: 'Words', size: 'Size', route: 'Easy way', steps: 'Work it out' },
    meaningTitle: 'Which calculation is it?',
    meaningSub: 'Read the words carefully. Then choose.',
    sizeTitle: (a) => `Will the answer be bigger or smaller than ${a}?`,
    sizeSub: 'Decide before you work anything out.',
    bigger: (a) => `Bigger than ${a}`, smaller: (a) => `Smaller than ${a}`,
    routeTitle: 'Which is the easy way?',
    routeSub: 'Choose the calculation you can do in your head — it must give the same answer.',
    stepsTitle: 'Work it out, one step at a time.',
    stepsSub: 'Type each answer in its box.',
    so: 'So',
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    typeHere: 'your answer',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Rends-le facile',
    check: 'Vérifier', stuck: 'Montre-moi', next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Le moyen facile, du premier coup.',
    slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.',
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse', another: 'Un autre moyen facile',
    heads: {
      tenths: 'Multiplier par des dixièmes', hundredths: 'Multiplier par des centièmes', half: 'La moitié de', quarter: 'Le quart de',
      tenth: 'Le dixième de', near10: '× 9 et × 11', partition: 'Décomposer', story: 'Lis, puis calcule',
    },
    stages: { meaning: 'Mots', size: 'Taille', route: 'Moyen facile', steps: 'Calcule' },
    meaningTitle: 'Quel calcul est-ce ?',
    meaningSub: 'Lis bien les mots. Puis choisis.',
    sizeTitle: (a) => `La réponse sera-t-elle plus grande ou plus petite que ${a} ?`,
    sizeSub: 'Décide avant de calculer quoi que ce soit.',
    bigger: (a) => `Plus grande que ${a}`, smaller: (a) => `Plus petite que ${a}`,
    routeTitle: 'Quel est le moyen facile ?',
    routeSub: 'Choisis le calcul que tu peux faire de tête — il doit donner la même réponse.',
    stepsTitle: 'Calcule, une étape à la fois.',
    stepsSub: 'Écris chaque réponse dans sa case.',
    so: 'Donc',
    filled: 'C’est rempli pour toi.',
    shown: 'Le voici. Lis-le, puis continue.',
    typeHere: 'ta réponse',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};
/** A T entry in both languages at once: `{ en, fr }`. */
const inAll = (key, ...args) => {
  const one = (l) => (typeof T[l][key] === 'function' ? T[l][key](...args) : T[l][key]);
  return { en: one('en'), fr: one('fr') };
};
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });
const STAGE_ICON = { meaning: BookOpenText, size: Scale, route: Route, steps: Calculator };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function derive(item) {
  if (!item?.id) return null;
  try { return easyModel(item); } catch { return null; }
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

/** A choice button: KaTeX or a short line of words. */
function Choice({ state, onClick, children }) {
  const style = state === 'bad' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300'
    : state === 'good' ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-orange-400';
  return (
    <button type="button" disabled={state === 'bad' || state === 'good'} onClick={onClick}
      className={`w-full min-h-[3.5rem] rounded-xl border-2 border-b-[4px] px-3 py-2.5 font-black text-lg sm:text-xl transition-all overflow-x-auto disabled:cursor-default ${style}`}>
      {children}
    </button>
  );
}

export default function MakeEasy({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it)), [pool]);

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
  const [stageAt, setStageAt] = useState(null);
  const [wrongs, setWrongs] = useState(0);
  const [picks, setPicks] = useState({});        // option id -> 'bad' | 'good', this stage
  const [route, setRoute] = useState(null);      // the valid route taken
  const [stepIdx, setStepIdx] = useState(0);
  const [stepVals, setStepVals] = useState([]);  // { text, mark: 'good' | 'shown' } per finished step
  const [typed, setTyped] = useState('');
  const [mark, setMark] = useState(null);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => derive(item), [item]);
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

  const { stages } = model;
  const stage = stageAt || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(stage);
  const calcKnown = stages[0] !== 'meaning' || stIndex > 0;

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
  const goNext = () => {
    setPos((p) => p + 1);
    setStageAt(null); setWrongs(0); setPicks({}); setRoute(null); setStepIdx(0); setStepVals([]);
    setTyped(''); setMark(null); setHelped(false); setSlipped(false); setMsg(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  const toStage = (next, message) => {
    setStageAt(next); setWrongs(0); setPicks({}); setMsg(message);
  };
  const after = (s) => stages[stages.indexOf(s) + 1];

  /* ---------------------------------------------------------- the choice stages */
  const options = stage === 'meaning' ? model.meaning.map((o) => ({ id: o.id, latex: o.latex }))
    : stage === 'size' ? [{ id: 'bigger', words: t.bigger(model.A) }, { id: 'smaller', words: t.smaller(model.A) }]
      : model.choices.map((c) => ({ id: c.id, latex: c.latex }));
  const rightIds = stage === 'meaning' ? ['times'] : stage === 'size' ? ['smaller'] : model.choices.filter((c) => c.valid).map((c) => c.id);
  const judge = (id) => (stage === 'meaning' ? diagnoseMeaning(model, id) : stage === 'size' ? diagnoseSize(model, id) : diagnoseRoute(model, id));

  /** Leave a choice stage on its right answer (`shown`: filled in for the student). */
  const settle = (id, d, shownWhy) => {
    if (stage === 'route') setRoute(model.choices.find((c) => c.id === id));
    const ok = { en: d.en, fr: d.fr };
    toStage(after(stage), shownWhy ? { tone: 'shown', ...join(shownWhy, join(ok, inAll('filled'))) } : { tone: 'ok', ...ok });
  };
  const choose = (id) => {
    if (picks[id]) return;
    const d = judge(id);
    if (d.ok) { settle(id, d); return; }
    setSlipped(true);
    const nextPicks = { ...picks, [id]: 'bad' };
    const left = options.filter((o) => !nextPicks[o.id]);
    // A second wrong answer — or a wrong one that leaves only the right answer — fills it in.
    if (wrongs + 1 >= 2 || left.length <= 1) {
      setHelped(true);
      const right = rightIds[0];
      settle(right, judge(right), { en: d.en, fr: d.fr });
      return;
    }
    setPicks(nextPicks);
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const showChoice = () => {
    setHelped(true); setSlipped(true);
    const right = rightIds[0];
    const d = judge(right);
    if (stage === 'route') setRoute(model.choices.find((c) => c.id === right));
    toStage(after(stage), { tone: 'shown', ...join({ en: d.en, fr: d.fr }, inAll('shown')) });
  };

  /* ---------------------------------------------------------- steps */
  const steps = route?.steps || [];
  const current = steps[stepIdx];
  const nextStep = (text, how) => {
    const vals = [...stepVals, { text, mark: how }];
    setStepVals(vals);
    setTyped(''); setMark(null); setWrongs(0);
    if (vals.length >= steps.length) { completeItem(helped || how === 'shown'); return; }
    setStepIdx(stepIdx + 1);
  };
  const checkStep = () => {
    if (!current) return;
    const d = diagnoseStep(current, typed);
    if (d.ok) { setMsg(null); nextStep(txt(current.value), 'good'); return; }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      setHelped(true);
      setMsg({ tone: 'shown', ...join({ en: d.en, fr: d.fr }, inAll('filled')) });
      nextStep(txt(current.value), 'shown');
      return;
    }
    setWrongs(wrongs + 1);
    setMark('bad');
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const showStep = () => {
    setHelped(true); setSlipped(true);
    setMsg({ tone: 'shown', ...inAll('shown') });
    nextStep(txt(current.value), 'shown');
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introFr) : null;
  const context = model.story ? pick(item.context, item.contextFr) : null;
  const head = model.story ? t.heads.story : t.heads[model.family];
  const inputTone = mark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const doneTone = (m) => (m === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200');
  const used = route || model.valid[0];
  const other = model.valid.find((r) => r.id !== used.id);
  const choiceTitle = stage === 'meaning' ? t.meaningTitle : stage === 'size' ? t.sizeTitle(model.A) : t.routeTitle;
  const choiceSub = stage === 'meaning' ? t.meaningSub : stage === 'size' ? t.sizeSub : t.routeSub;

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
              <WandSparkles className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90 truncate">{head}</div>
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
            {context && <p className="px-4 pt-3 text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
            {(!model.story || calcKnown) && (
              <div className="px-2 sm:px-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                <SafeBlockMath math={model.kind === 'of' && calcKnown ? `${questionLatex(model)} = ${model.calc.latex}` : questionLatex(model)} />
              </div>
            )}
            {model.kind === 'of' && lang === 'fr' && <p className="px-4 -mt-2 pb-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">({model.phrase.fr})</p>}
            {intro && <p className="px-4 pb-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {!itemDone && (
              <div className="px-3 pt-1 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === stage} done={stages.indexOf(s) < stIndex} />)}
              </div>
            )}
          </div>
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {stage !== 'steps' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{choiceTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{choiceSub}</p>
                  <div className={`grid gap-2 ${options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'}`}>
                    {options.map((o) => (
                      <Choice key={o.id} state={picks[o.id]} onClick={() => choose(o.id)}>
                        {o.latex ? <SafeInlineMath math={o.latex} /> : <span className="text-base sm:text-lg">{o.words}</span>}
                      </Choice>
                    ))}
                  </div>
                </>
              )}

              {stage === 'steps' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.stepsTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.stepsSub}</p>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 mb-3 text-center text-xl text-slate-800 dark:text-slate-100 overflow-x-auto">
                    <SafeInlineMath math={`${model.calc.latex} = ${used.latex}`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {steps.slice(0, stepIdx + 1).map((s, i) => {
                      const done = stepVals[i];
                      return (
                        <div key={i} className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                          <span className="px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">{pick(s.note.en, s.note.fr)}</span>
                          <span className="ml-auto flex items-center gap-2 text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                            <SafeInlineMath math={`${s.latex} =`} />
                            {done
                              ? <span className={`min-w-[5rem] px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center ${doneTone(done.mark)}`}>{done.text}</span>
                              : (
                                <input
                                  id="makeeasy-step"
                                  autoFocus
                                  value={typed}
                                  onChange={(e) => { setTyped(e.target.value); if (mark === 'bad') setMark(null); }}
                                  onKeyDown={(e) => { if (e.key === 'Enter') checkStep(); }}
                                  inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                                  className={`w-28 sm:w-32 px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 ${inputTone}`}
                                />
                              )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <Message msg={msg} lang={lang} />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={stage === 'steps' ? showStep : showChoice}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
                {stage === 'steps' && <button onClick={checkStep} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
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
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-lg sm:text-xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                  <SafeInlineMath math={chainLatex(model, used)} />
                  <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">{pick(used.name.en, used.name.fr)}</p>
                </div>
                {other && (
                  <div className="mt-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-3 text-base text-slate-700 dark:text-slate-200 overflow-x-auto">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.another}</div>
                    <SafeInlineMath math={chainLatex(model, other)} />
                  </div>
                )}
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(194,94,18,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={`${questionLatex(model)} = ${model.answerText}`} /></div>
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
