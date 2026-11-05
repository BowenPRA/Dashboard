import { useMemo, useState } from 'react';
import { WandSparkles, Construction, ArrowUp, ArrowDown, ListChecks } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import { stepsOf } from '../components/math/stepKitParts';
import { EasyChoices, EasySteps } from '../components/notes/MakeEasyActivity.jsx';
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
 *
 * The frame is StepKit's (the same as Fill the Zeros): the question on the
 * left (a 1-2-3 strip on the first item), the stage on the right with the
 * item's steps as numbered pills, the note about the step just finished above
 * the new one, and the feedback on this one under the work. The ways to choose
 * from and the step boxes are drawn by the deck activity's EasyChoices /
 * EasySteps, so the slide and the task look the same.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';

const T = {
  en: {
    title: 'Make It Easy',
    next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'The easy way, first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer', another: 'Another easy way',
    heads: {
      tenths: 'Multiply by tenths', hundredths: 'Multiply by hundredths', half: 'Half of', quarter: 'A quarter of',
      tenth: 'A tenth of', near10: '× 9 and × 11', partition: 'Partitioning', story: 'Read it, then work',
    },
    question: 'Work it out the easy way.',
    how: { meaning: 'Find the calculation', size: 'Bigger or smaller?', route: 'Choose the easy way', steps: 'Work it out' },
    stages: { meaning: 'Calculation', size: 'Bigger or smaller?', route: 'Easy way', steps: 'Work it out' },
    meaningTitle: 'Which calculation is it?',
    meaningSub: 'Read the words again, then choose.',
    sizeTitle: (a) => `Is the answer bigger or smaller than ${a}?`,
    sizeSub: 'Decide before you work it out.',
    bigger: (a) => `Bigger than ${a}`, smaller: (a) => `Smaller than ${a}`,
    routeTitle: 'Which is the easy way?',
    routeSub: 'Same answer, less work.',
    stepsTitle: 'Work it out, one step at a time.',
    stepsSub: 'Type each answer in its box.',
    filled: 'It is filled in for you.',
    // Why the right choice is right, for a stage filled in by Show me.
    whySize: (a, b) => `${b} is less than 1, so × ${b} takes only part of ${a}. The answer is smaller.`,
    whyOf: (a, b) => `"Of" means ×: ${a} × ${b}.`,
    whyEach: (a, b) => `${b} lots of ${a}: ${a} × ${b}.`,
    shownStep: (s, v) => `Here it is: ${s} = ${v}.`,
    typeHere: 'your answer',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Rends-le facile',
    next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Le moyen facile, du premier coup.',
    slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.',
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse', another: 'Un autre moyen facile',
    heads: {
      tenths: 'Multiplier par des dixièmes', hundredths: 'Multiplier par des centièmes', half: 'La moitié de', quarter: 'Le quart de',
      tenth: 'Le dixième de', near10: '× 9 et × 11', partition: 'Décomposer', story: 'Lis, puis calcule',
    },
    question: 'Calcule-le par le moyen facile.',
    how: { meaning: 'Trouve le calcul', size: 'Plus grand ou plus petit ?', route: 'Choisis le moyen facile', steps: 'Calcule' },
    stages: { meaning: 'Calcul', size: 'Plus grand ou plus petit ?', route: 'Moyen facile', steps: 'Calcule' },
    meaningTitle: 'Quel calcul est-ce ?',
    meaningSub: 'Relis les mots, puis choisis.',
    sizeTitle: (a) => `La réponse est-elle plus grande ou plus petite que ${a} ?`,
    sizeSub: 'Décide avant de calculer.',
    bigger: (a) => `Plus grande que ${a}`, smaller: (a) => `Plus petite que ${a}`,
    routeTitle: 'Quel est le moyen facile ?',
    routeSub: 'Même réponse, moins de travail.',
    stepsTitle: 'Calcule, une étape à la fois.',
    stepsSub: 'Écris chaque réponse dans sa case.',
    filled: 'C’est rempli pour toi.',
    whySize: (a, b) => `${b} est plus petit que 1, donc × ${b} ne prend qu’une partie de ${a}. La réponse est plus petite.`,
    whyOf: (a, b) => `« Of » (de) veut dire × : ${a} × ${b}.`,
    whyEach: (a, b) => `${b} fois ${a} : ${a} × ${b}.`,
    shownStep: (s, v) => `Le voici : ${s} = ${v}.`,
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
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function derive(item) {
  if (!item?.id) return null;
  try { return easyModel(item); } catch { return null; }
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
  const [shownStages, setShownStages] = useState([]); // stages filled in for the student (amber pills)
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
    setTyped(''); setMark(null); setHelped(false); setSlipped(false); setShownStages([]); setMsg(null); setItemDone(false);
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
    : stage === 'size' ? [{ id: 'bigger', words: t.bigger(model.A), icon: ArrowUp }, { id: 'smaller', words: t.smaller(model.A), icon: ArrowDown }]
      : model.choices.map((c) => ({ id: c.id, latex: c.latex }));
  const rightIds = stage === 'meaning' ? ['times'] : stage === 'size' ? ['smaller'] : model.choices.filter((c) => c.valid).map((c) => c.id);
  const judge = (id) => (stage === 'meaning' ? diagnoseMeaning(model, id) : stage === 'size' ? diagnoseSize(model, id) : diagnoseRoute(model, id));
  /** Why the right choice is right, without the "Right —" of a right answer: for a stage filled in. */
  const whyRight = () => (stage === 'size' ? inAll('whySize', model.A, model.B)
    : stage === 'meaning' ? inAll(model.cue === 'each' ? 'whyEach' : 'whyOf', model.A, model.B)
      : model.choices.find((c) => c.id === rightIds[0]).name);

  /** Leave a choice stage on its right answer (`shownWhy`: filled in for the student, and why). */
  const settle = (id, d, shownWhy) => {
    if (stage === 'route') setRoute(model.choices.find((c) => c.id === id));
    if (shownWhy) setShownStages((s) => [...s, stage]);
    // The wrong answer's why already names the right one: say it once, then that it is filled in.
    toStage(after(stage), shownWhy ? { tone: 'shown', ...join(shownWhy, inAll('filled')) } : { tone: 'ok', en: d.en, fr: d.fr });
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
    if (stage === 'route') setRoute(model.choices.find((c) => c.id === right));
    setShownStages((s) => [...s, stage]);
    toStage(after(stage), { tone: 'shown', ...join(whyRight(), inAll('filled')) });
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
    setMsg({ tone: 'shown', ...inAll('shownStep', current.text, txt(current.value)) });
    nextStep(txt(current.value), 'shown');
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const context = model.story ? pick(item.context, item.contextFr) : null;
  const head = model.story ? t.heads.story : t.heads[model.family];
  const used = route || model.valid[0];
  const other = model.valid.find((r) => r.id !== used.id);
  const of = model.kind === 'of';
  const stage1 = stage === 'meaning' ? { title: t.meaningTitle, sub: t.meaningSub }
    : stage === 'size' ? { title: t.sizeTitle(model.A), sub: t.sizeSub }
      : stage === 'route' ? { title: t.routeTitle, sub: t.routeSub }
        : { title: t.stepsTitle, sub: t.stepsSub };
  const pills = stepsOf(stages, stIndex, t.stages).map((p) => (p.state === 'done' && shownStages.includes(p.key) ? { ...p, state: 'shown' } : p));
  // The sum, set large: a story shows it once its calculation is chosen; "half of 58" gains "= 58 × 0.5".
  const big = model.story && !calcKnown ? null : (
    <div className={`overflow-x-auto overflow-y-hidden ${of ? 'text-3xl' : ''}`}>
      <SafeInlineMath math={questionLatex(model)} />
      {of && lang === 'fr' && <div className="text-sm font-bold text-slate-500 dark:text-slate-400">({model.phrase.fr})</div>}
      {of && calcKnown && <div className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400"><SafeInlineMath math={`= ${model.calc.latex}`} /></div>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined}
        onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={WandSparkles} head={head}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={context} question={t.question} big={big}
            how={pos === 0 ? stages.map((s) => t.how[s]) : null} />
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <StepPanel ink={INK} lang={lang} steps={pills} n={stIndex + 1} title={stage1.title} sub={stage1.sub} msg={msg}
              onShowMe={stage === 'steps' ? showStep : showChoice}
              onCheck={stage === 'steps' ? checkStep : null}>
              {stage !== 'steps' && <EasyChoices options={options} picks={picks} onPick={choose} />}
              {stage === 'steps' && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-1.5 text-center text-xl sm:text-2xl text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
                    <SafeInlineMath math={`${model.calc.latex} = ${used.latex}`} />
                  </div>
                  <EasySteps steps={steps} vals={stepVals} upTo={stepIdx + 1} lang={lang} inputLabel={t.typeHere}
                    typed={typed} bad={mark === 'bad'} onEnter={checkStep}
                    onType={(v) => { setTyped(v); if (mark === 'bad') setMark(null); }} />
                </div>
              )}
            </StepPanel>
          )}

          {itemDone && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={helped} slipped={slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={msg?.tone === 'shown' ? pick(msg.en, msg.fr) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
                <SafeInlineMath math={chainLatex(model, used)} />
                <p className="mt-2 text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">{pick(used.name.en, used.name.fr)}</p>
              </div>
              {other && (
                <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 px-3 py-2.5 text-lg text-slate-700 dark:text-slate-200 overflow-x-auto overflow-y-hidden">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.another}</div>
                  <SafeInlineMath math={chainLatex(model, other)} />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 px-3 py-2.5" style={{ borderColor: INK, backgroundColor: 'rgba(194,94,18,0.07)' }}>
                <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t.answer}</div>
                <div className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden"><SafeInlineMath math={`${questionLatex(model)} = ${model.answerText}`} /></div>
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
