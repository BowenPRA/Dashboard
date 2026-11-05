import { useMemo, useState } from 'react';
import { Construction, ListChecks, Target, Calculator, MousePointerClick } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr, pickTable } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import PointTiles, { PointReminder } from '../components/math/PointTiles.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import { stepsOf } from '../components/math/stepKitParts';
import { readDec, canon, sameValue } from '../utils/decimal';
import {
  pointModel, placeSpec, diagnoseEstimate, diagnoseOut, diagnoseRow, diagnosePlace, diagnoseWrite,
  estimateLine, estimateLatex, plain, answerLatex,
} from '../utils/pointBack';

/* ------------------------------------------------------------------ *
 * POINT OUT, POINT BACK — a decimal × a whole number (Y7 Maths 4.3).
 *
 * Reads a unit's `pointBack`:
 *   { title, titleFr, intro?, introFr?, levels: { n: { en, fr } }, items: [
 *       { id, level, a: '3.6', b: '24' },
 *       { id, level, a: '0.85', b: '12', money: true },          // dollars, 2 d.p.
 *       { id, level, a: '2.35', b: '16', unit: 'kg' },
 *       { id, level, kind: 'fact', fact: '47 × 23 = 1081', variants: ['4.7 × 23', '108.1 ÷ 23'] },
 *       (+ context / contextFr)
 *   ] }
 * utils/pointBack.js derives the estimate, the product, the rows, the point and
 * the slip behind a wrong answer. (`intro` is no longer shown: the first item
 * carries a 1-2-3 strip instead.)
 *
 * The stages:
 *   ESTIMATE  round each number, multiply in your head (skipped when rounding
 *             changes nothing, as in 0.3 × 4)
 *   OUT       take the point out and multiply whole numbers — two rows and a
 *             total for a 2-digit multiplier (36 × 4, 36 × 20, 864)
 *   BACK      tap the gap where the point goes: as many decimal places as the
 *             decimal had, and close to the estimate
 *   WRITE     (money, or an answer ending in zeros) write it out: money keeps
 *             2 decimal places; an exact 5.00 may be written 5
 * A fact item runs ESTIMATE → BACK once per variant, on the fact's digits.
 *
 * The frame is components/math/StepKit.jsx, as in the other Unit 4 tasks: the
 * question on the left (the 1-2-3 strip on the first item), the stage on the
 * right (its steps as pills, a note about the step just finished above it, the
 * feedback on this step under the work), the working to copy when it is done.
 *
 * A wrong answer is named and can be tried again; a second one (or "Show me")
 * fills the stage in and the item pays half. Progress blob: { [itemId]: 1 | 0.5 },
 * score out of 10. English and French (`tr(lang, en, null, fr)`).
 * ------------------------------------------------------------------ */

const INK = '#0d9488';
const INK_DARK = '#0f766e';

const T = {
  en: {
    title: 'Point Out, Point Back',
    next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every step right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    heads: { mul: 'A decimal × a whole number', money: 'Money', measure: 'A measure', fact: 'One fact, many answers' },
    how: ['Estimate', 'Take the point out and multiply', 'Put the point back'],
    stages: { estimate: 'Estimate', out: 'Point out', back: 'Point back', write: 'Write it' },
    estTitle: 'Estimate first.',
    estSub: 'Round each number, then multiply in your head.',
    estSubDiv: 'Round each number, then divide in your head.',
    estRight: (v) => `Good — about ${v}. Keep it in mind.`,
    outTitle: 'Take the point out.',
    outSub: 'Multiply the whole numbers. The point comes back later.',
    outSubRows: 'Multiply the whole numbers, one row at a time. Then add.',
    outRight: 'Right.',
    rowOnes: (a, b) => `${a} × ${b}`,
    total: 'total',
    backTitle: 'Put the point back.',
    backSub: 'Count the decimal places, then tap where the point goes.',
    backSubFact: 'Use your estimate, then tap where the point goes.',
    tapFirst: 'Tap a gap between the digits first.',
    yourEst: 'Your estimate',
    aboutEst: 'An estimate',
    pointOut: 'Point out',
    close: (a, e) => `${a} is close to ${e}.`,
    writeMoney: 'Write it as money.',
    writeMoneySub: 'Dollars and cents: always 2 decimal places.',
    writePlain: 'Write the answer.',
    writePlainSub: 'Write it as simply as you can.',
    dropped: (full, simple) => `Right — ${full} = ${simple}. Nothing was rounded, so the zeros at the end can go.`,
    kept: (full, simple) => `Right. ${full} is ${simple}: nothing was rounded, so you could leave the zeros off.`,
    moneyRight: 'Right — 2 decimal places, for the cents.',
    filled: 'It is filled in for you.',
    shownEst: (line) => `Here is an estimate: ${line}.`,
    shownOut: (line) => `Here it is: ${line}.`,
    shownBack: 'Here is where the point goes.',
    // (the write stage is the last: its "why" is the Write it line of the working, just under this)
    shownMoney: (v) => `Here it is: ${v} dollars.`,
    shownZeros: (full, simple) => `Here it is: ${full} = ${simple}.`,
    variant: (i, n) => `Answer ${i} of ${n}`,
    useFact: 'Use this fact',
    lines: { est: 'Estimate', out: 'Point out', back: 'Point back', write: 'Write it', check: 'Check' },
    places: (n) => `${n} decimal place${n === 1 ? '' : 's'}`,
    moneyTail: '2 decimal places, for the cents',
    zerosTail: 'nothing was rounded, so the zeros can go',
    typeHere: 'your answer', dollars: 'dollars',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Point enlevé, point remis',
    next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Toutes les étapes justes du premier coup.',
    slipped: "Fini — une erreur, et tu l'as trouvée toi-même.",
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse',
    heads: { mul: 'Un décimal × un entier', money: "L'argent", measure: 'Une mesure', fact: 'Un fait, plusieurs réponses' },
    how: ['Estime', 'Enlève le point et multiplie', 'Remets le point'],
    stages: { estimate: 'Estimer', out: 'Point enlevé', back: 'Point remis', write: "L'écrire" },
    estTitle: "Estime d'abord.",
    estSub: 'Arrondis chaque nombre, puis multiplie de tête.',
    estSubDiv: 'Arrondis chaque nombre, puis divise de tête.',
    estRight: (v) => `Bien — environ ${v}. Garde-le en tête.`,
    outTitle: 'Enlève le point.',
    outSub: 'Multiplie les nombres entiers. Le point revient plus tard.',
    outSubRows: 'Multiplie les nombres entiers, une ligne à la fois. Puis additionne.',
    outRight: 'Correct.',
    rowOnes: (a, b) => `${a} × ${b}`,
    total: 'total',
    backTitle: 'Remets le point.',
    backSub: 'Compte les décimales, puis touche l’espace où va le point.',
    backSubFact: 'Utilise ton estimation, puis touche l’espace où va le point.',
    tapFirst: "Touche d'abord un espace entre les chiffres.",
    yourEst: 'Ton estimation',
    aboutEst: 'Une estimation',
    pointOut: 'Point enlevé',
    close: (a, e) => `${a} est proche de ${e}.`,
    writeMoney: "Écris-le comme de l'argent.",
    writeMoneySub: 'Dollars et cents : toujours 2 décimales.',
    writePlain: 'Écris la réponse.',
    writePlainSub: 'Écris-la le plus simplement possible.',
    dropped: (full, simple) => `Correct — ${full} = ${simple}. Rien n'a été arrondi, donc les zéros de la fin peuvent partir.`,
    kept: (full, simple) => `Correct. ${full}, c'est ${simple} : rien n'a été arrondi, donc tu pouvais enlever les zéros.`,
    moneyRight: 'Correct — 2 décimales, pour les cents.',
    filled: "C'est rempli pour toi.",
    shownEst: (line) => `Voici une estimation : ${line}.`,
    shownOut: (line) => `Le voici : ${line}.`,
    shownBack: 'Voici où va le point.',
    shownMoney: (v) => `Le voici : ${v} dollars.`,
    shownZeros: (full, simple) => `Le voici : ${full} = ${simple}.`,
    variant: (i, n) => `Réponse ${i} sur ${n}`,
    useFact: 'Utilise ce fait',
    lines: { est: 'Estimation', out: 'Point enlevé', back: 'Point remis', write: "L'écrire", check: 'Vérification' },
    places: (n) => `${n} décimale${n === 1 ? '' : 's'}`,
    moneyTail: '2 décimales, pour les cents',
    zerosTail: 'rien n’a été arrondi, donc les zéros peuvent partir',
    typeHere: 'ta réponse', dollars: 'dollars',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};
/** A T entry in both languages at once: `{ en, fr }`. */
const inAll = (key, ...args) => {
  const one = (l) => (typeof T[l][key] === 'function' ? T[l][key](...args) : T[l][key]);
  return { en: one('en'), fr: one('fr') };
};
const joinMsg = (a, b) => ({ en: `${a.en} ${b.en}`.trim(), fr: `${a.fr} ${b.fr}`.trim() });
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
// Digits ~text-4xl from sm; every box is at least 50 px high.
const inputBase = 'px-2 py-1 rounded-xl border-2 border-b-[4px] font-mono font-black text-3xl sm:text-4xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500';
const toneOf = (mark) => (mark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
  : mark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
    : mark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100');

function deriveItem(item) {
  if (!item?.id) return null;
  try { return pointModel(item); } catch { return null; }
}

/** The stages an item walks through, as [{ stage, step }] (step: a fact variant's index). */
function stagesOf(model) {
  if (model.kind === 'fact') return model.steps.flatMap((_, j) => [{ stage: 'estimate', step: j }, { stage: 'back', step: j }]);
  return model.stages.map((stage) => ({ stage, step: 0 }));
}

/**
 * Long multiplication with the point out, as whole rows: the top number, × the
 * whole number, one row per digit of it (the tens row ends in a 0), the total.
 * `parts` are the three typed rows, `marks` their tone, `active` the one being typed.
 */
function RowsScaffold({ model, parts, marks, active, onChange, onEnter, t }) {
  const [r0, r1] = model.rows;
  const lines = [
    { label: t.rowOnes(model.topText, r0.by) },
    { label: t.rowOnes(model.topText, r1.by) },
    { label: t.total, rule: true },
  ];
  return (
    <div className="mx-auto w-fit font-mono font-black text-3xl sm:text-4xl text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-[auto_7rem_auto] sm:grid-cols-[auto_9rem_auto] items-center gap-x-2 sm:gap-x-3 gap-y-1.5">
        <span />
        <span className="text-right pr-3">{model.topText}</span>
        <span />
        <span className="text-right text-slate-400">×</span>
        <span className="text-right pr-3">{model.whole}</span>
        <span />
        <span className="col-span-2 h-[3px] rounded-full bg-slate-400 dark:bg-slate-500" />
        <span />
        {lines.map((ln, i) => (
          <div key={i} className="contents">
            {ln.rule && <><span className="col-span-2 h-[3px] rounded-full bg-slate-400 dark:bg-slate-500" /><span /></>}
            <span className="text-right text-slate-400 text-xl sm:text-2xl">{i === 1 ? '+' : ''}</span>
            <input
              id={`pointback-row-${i}`}
              value={parts[i]}
              disabled={i > active || marks[i] === 'good' || marks[i] === 'shown'}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onEnter(i); }}
              inputMode="numeric" autoComplete="off" spellCheck={false} aria-label={ln.label} placeholder={i <= active ? '?' : ''}
              className={`w-[7rem] sm:w-[9rem] ${inputBase} !text-right !pr-2.5 disabled:opacity-90 ${i > active ? 'opacity-40' : ''} ${toneOf(marks[i])}`}
            />
            <span className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">{ln.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PointBack({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
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
  const [at, setAt] = useState(0);                 // index into stagesOf(model)
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [typed, setTyped] = useState('');
  const [mark, setMark] = useState(null);
  const [parts, setParts] = useState(['', '', '']);
  const [partMarks, setPartMarks] = useState([null, null, null]);
  const [part, setPart] = useState(0);
  const [k, setK] = useState(null);
  const [kTone, setKTone] = useState(null);
  const [ests, setEsts] = useState({});            // step → the student's estimate (a value)
  const [placed, setPlaced] = useState({});        // step → true once its point is in
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const plan = stagesOf(model);
  const cur = plan[Math.min(at, plan.length - 1)];
  const stage = cur.stage;
  const isFact = model.kind === 'fact';
  const step = isFact ? model.steps[cur.step] : null;
  const sum = isFact ? step.sum : model.sum;
  const spec = isFact ? placeSpec(model, step) : placeSpec(model);
  const stageNames = isFact ? ['estimate', 'back'] : model.stages;
  const myEst = ests[cur.step] ?? null;
  const shownEst = myEst || (sameValue(sum.est.value, sum.exact) ? null : sum.est.value);

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
    setAt(0); setWrongs(0); setHelped(false); setSlipped(false); setMsg(null); setTyped(''); setMark(null);
    setParts(['', '', '']); setPartMarks([null, null, null]); setPart(0); setK(null); setKTone(null);
    setEsts({}); setPlaced({}); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const focus = (id) => requestAnimationFrame(() => document.getElementById(id)?.focus());

  /** On to the next stage (or variant, or the finished item), saying `message`. */
  const advance = (message, wasHelped = helped) => {
    setMsg(message || null);
    setWrongs(0);
    if (at + 1 >= plan.length) { completeItem(wasHelped); return; }
    const nextStage = plan[at + 1];
    setAt(at + 1);
    setTyped(''); setMark(null);
    if (nextStage.stage === 'estimate') { setK(null); setKTone(null); }
    if (nextStage.stage === 'out' && model.rows) focus('pointback-row-0');
    else if (nextStage.stage !== 'back') focus('pointback-answer');
  };
  const fail = (d, fill) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) { setHelped(true); fill(joinMsg(d, inAll('filled'))); return; }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const soft = (d) => setMsg({ tone: 'info', en: d.en, fr: d.fr });

  /* ---------------------------------------------------------- estimate */
  const fillEstimate = (m) => {
    setEsts({ ...ests, [cur.step]: sum.est.value });
    advance({ tone: 'shown', ...m }, true);
  };
  const checkEstimate = () => {
    const d = diagnoseEstimate(sum, typed);
    if (d.ok) {
      const v = canon(readDec(typed).v);
      setEsts({ ...ests, [cur.step]: v });
      advance({ tone: 'ok', ...inAll('estRight', plain(v)) });
      return;
    }
    if (d.soft) { soft(d); return; }
    setMark('bad');
    fail(d, fillEstimate);
  };

  /* ---------------------------------------------------------- point out */
  const outLine = `${model.kind === 'mul' ? `${model.topText} × ${model.whole} = ${model.pText}` : ''}`;
  const checkOut = () => {
    const d = diagnoseOut(model, typed);
    if (d.ok) { setMark('good'); advance({ tone: 'ok', en: `${T.en.outRight} ${outLine}.`, fr: `${T.fr.outRight} ${outLine}.` }); return; }
    if (d.soft) { soft(d); return; }
    setMark('bad');
    fail(d, (m) => { setTyped(model.pText); setMark('shown'); advance({ tone: 'shown', ...m }, true); });
  };
  const rowWant = (i) => String(i === 0 ? model.rows[0].value : i === 1 ? model.rows[1].value : model.product);
  const setPartAt = (arr, i, v) => arr.map((x, j) => (j === i ? v : x));
  const afterPart = (i, tone, m, wasHelped = helped) => {
    setPartMarks((pm) => setPartAt(pm, i, tone));
    setWrongs(0);
    // (a row's mark is 'good'; the message about it is an 'ok' — it was shown red before)
    if (i === 2) { advance({ tone: tone === 'good' ? 'ok' : tone, ...m }, wasHelped); return; }
    setPart(i + 1);
    setMsg(tone === 'shown' ? { tone, ...m } : null);
    focus(`pointback-row-${i + 1}`);
  };
  const checkPart = (i) => {
    if (i !== part) return;
    const d = diagnoseRow(model, i, parts[i]);
    if (d.ok) { afterPart(i, 'good', { en: `${T.en.outRight} ${outLine}.`, fr: `${T.fr.outRight} ${outLine}.` }); return; }
    if (d.soft) { soft(d); return; }
    setPartMarks((pm) => setPartAt(pm, i, 'bad'));
    fail(d, (m) => { setParts((p) => setPartAt(p, i, rowWant(i))); afterPart(i, 'shown', m, true); });
  };
  const showOut = () => {
    setHelped(true); setSlipped(true);
    if (model.rows) {
      setParts([rowWant(0), rowWant(1), rowWant(2)]);
      setPartMarks((pm) => pm.map((x) => (x === 'good' ? x : 'shown')));
    } else { setTyped(model.pText); setMark('shown'); }
    advance({ tone: 'shown', ...inAll('shownOut', outLine) }, true);
  };

  /* ---------------------------------------------------------- point back */
  const pickK = (kk) => {
    if (stage !== 'back' || itemDone) return;
    setK(kk); setKTone(null);
    setMsg((m) => (m?.tone === 'bad' || m?.tone === 'info' ? null : m));
  };
  const backRight = () => {
    const ans = isFact ? step.answerText : model.answerText;
    const closeTo = shownEst ? inAll('close', ans, plain(shownEst)) : { en: '', fr: '' };
    const count = spec.count || { en: '', fr: '' };
    return { en: `${count.en} ${closeTo.en}`.trim(), fr: `${count.fr} ${closeTo.fr}`.trim() };
  };
  const checkBack = () => {
    if (k == null) { setMsg({ tone: 'info', ...inAll('tapFirst') }); return; }
    const d = diagnosePlace(spec, k, myEst);
    if (d.ok) {
      setKTone('good'); setPlaced({ ...placed, [cur.step]: true });
      advance({ tone: 'ok', ...backRight() });
      return;
    }
    setKTone('bad');
    fail(d, (m) => { setK(spec.want); setKTone('shown'); setPlaced({ ...placed, [cur.step]: true }); advance({ tone: 'shown', ...m }, true); });
  };
  const showBack = () => {
    setK(spec.want); setKTone('shown'); setHelped(true); setSlipped(true); setPlaced({ ...placed, [cur.step]: true });
    advance({ tone: 'shown', ...joinMsg(inAll('shownBack'), backRight()) }, true);
  };

  /* ---------------------------------------------------------- write */
  const writeWant = model.money ? model.moneyText : model.simpleText;
  const checkWrite = () => {
    const d = diagnoseWrite(model, typed);
    if (d.ok) {
      setMark('good');
      const m = model.money ? inAll('moneyRight') : inAll(d.dropped ? 'dropped' : 'kept', model.answerText, model.simpleText);
      advance({ tone: 'ok', ...m });
      return;
    }
    if (d.soft) { soft(d); return; }
    setMark('bad');
    fail(d, (m) => { setTyped(writeWant); setMark('shown'); advance({ tone: 'shown', ...m }, true); });
  };
  const showWrite = () => {
    setTyped(writeWant); setMark('shown'); setHelped(true); setSlipped(true);
    const m = model.money ? inAll('shownMoney', model.moneyText) : inAll('shownZeros', model.answerText, model.simpleText);
    advance({ tone: 'shown', ...m }, true);
  };
  const showEstimate = () => { setHelped(true); setSlipped(true); fillEstimate(inAll('shownEst', estimateLine(sum.est))); };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pickTable(levelRaw, lang);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const unit = model.money ? t.dollars : item.unit ? pick(item.unit, item.unitFr) : '';
  const head = isFact ? t.heads.fact : model.money ? t.heads.money : item.unit ? t.heads.measure : t.heads.mul;
  const si = Math.max(0, stageNames.indexOf(stage));
  const onCheck = stage === 'estimate' ? checkEstimate : stage === 'out' ? (model.rows ? () => checkPart(part) : checkOut) : stage === 'back' ? checkBack : checkWrite;
  const onShow = stage === 'estimate' ? showEstimate : stage === 'out' ? showOut : stage === 'back' ? showBack : showWrite;
  // Each stage: a short title and ONE line under it.
  const [stageTitle, stageSub] = {
    estimate: [t.estTitle, sum.op === '÷' ? t.estSubDiv : t.estSub],
    out: [t.outTitle, model.rows ? t.outSubRows : t.outSub],
    back: [t.backTitle, isFact ? t.backSubFact : t.backSub],
    write: model.money ? [t.writeMoney, t.writeMoneySub] : [t.writePlain, t.writePlainSub],
  }[stage];

  const answerInput = (lead, after, width = 'w-32 sm:w-44') => (
    <div className="py-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
      {lead}
      <input
        id="pointback-answer"
        value={typed}
        onChange={(e) => { setTyped(e.target.value); if (mark === 'bad') setMark(null); }}
        onKeyDown={(e) => { if (e.key === 'Enter') onCheck(); }}
        inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
        className={`${width} ${inputBase} ${toneOf(mark)}`}
      />
      {after}
    </div>
  );
  // What the point-back step leans on, kept in view: the estimate, and the whole-number product (or the fact).
  const reminders = (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {shownEst && <PointReminder kind="estimate" icon={Target} label={myEst ? t.yourEst : t.aboutEst}>≈ {plain(shownEst)}</PointReminder>}
      {isFact
        ? <PointReminder kind="fact" label={t.useFact}><SafeInlineMath math={model.factLatex} /></PointReminder>
        : <PointReminder kind="product" icon={Calculator} label={t.pointOut}><SafeInlineMath math={`${model.outLatex} = ${model.pText}`} /></PointReminder>}
    </div>
  );

  let work;
  if (stage === 'estimate') {
    work = answerInput(<><SafeInlineMath math={sum.latex} /><span className="font-black text-slate-400">≈</span></>, null, 'w-28 sm:w-36');
  } else if (stage === 'out') {
    work = model.rows ? (
      <RowsScaffold model={model} parts={parts} marks={partMarks} active={part} t={t}
        onChange={(i, v) => { setParts((p) => setPartAt(p, i, v)); if (partMarks[i] === 'bad') setPartMarks((pm) => setPartAt(pm, i, null)); }}
        onEnter={(i) => checkPart(i)} />
    ) : answerInput(<SafeInlineMath math={`${model.outLatex} =`} />);
  } else if (stage === 'back') {
    work = (
      <>
        {reminders}
        <PointTiles row={spec.row} k={k} onPick={pickK} tone={kTone === 'bad' ? 'bad' : null} lang={lang} />
      </>
    );
  } else {
    work = (
      <>
        <PointTiles row={spec.row} k={spec.want} tone="good" lang={lang} compact />
        {answerInput(<SafeInlineMath math={`${model.latex} =`} />, unit ? <span className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">{unit}</span> : null)}
      </>
    );
  }

  // The question, large: for a fact item the fact to use sits above the variant in hand.
  const big = (
    <div className="flex flex-col items-center gap-3">
      {isFact && (
        <div className="w-full rounded-xl border-2 border-[#c25e12] dark:border-orange-700 bg-[#c25e12]/[0.07] dark:bg-orange-900/20 px-3 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#c25e12] dark:text-orange-300">{t.useFact}</span>
          <span className="text-xl sm:text-2xl"><SafeInlineMath math={model.factLatex} /></span>
        </div>
      )}
      <span className="max-w-full overflow-x-auto"><SafeInlineMath math={isFact ? step.sum.latex : model.latex} /></span>
    </div>
  );
  // A fact item's answers, the one in hand marked, the finished ones with their answer.
  const variants = isFact && (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-wrap justify-center gap-1.5">
        {model.steps.map((s, j) => {
          const done = itemDone || placed[j];
          const on = !done && j === cur.step;
          return (
            <span key={j} className={`px-1.5 py-1 rounded-lg border-2 text-sm ${done ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500] dark:bg-lime-900/30 dark:border-lime-700 dark:text-lime-200' : on ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-100' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}>
              <SafeInlineMath math={done ? `${s.sum.latex} = ${s.answerText}` : s.sum.latex} />
            </span>
          );
        })}
      </div>
      {!itemDone && <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.variant(cur.step + 1, model.steps.length)}</div>}
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
          <QuestionCard ink={INK} icon={MousePointerClick} head={head}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={context} big={big} how={pos === 0 ? t.how : null}>
            {variants}
          </QuestionCard>
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              <StepPanel ink={INK} lang={lang} plain
                steps={stepsOf(stageNames, si, t.stages)} n={si + 1} title={stageTitle} sub={stageSub} msg={msg}
                onShowMe={onShow} onCheck={onCheck}>
                {work}
              </StepPanel>
            </div>
          )}

          {itemDone && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={helped} slipped={slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={msg?.tone === 'shown' ? pick(msg.en, msg.fr) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <BookLines model={model} t={t} ests={ests} />
              <div className="flex items-center gap-3 rounded-xl border-2 border-[#0d9488] bg-teal-50/70 dark:bg-teal-900/20 p-3 min-w-0">
                <ListChecks className="w-5 h-5 shrink-0 text-[#0d9488] dark:text-teal-300" strokeWidth={3} />
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                {isFact ? (
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-lg sm:text-xl text-slate-900 dark:text-slate-100 min-w-0">
                    {model.steps.map((s) => <span key={s.sum.latex} className="whitespace-nowrap"><SafeInlineMath math={`${s.sum.latex} = ${s.answerText}`} /></span>)}
                  </div>
                ) : (
                  <div className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                    <SafeInlineMath math={answerLatex(model)} />{unit && <span className="ml-2 font-black text-base sm:text-lg">{unit}</span>}
                  </div>
                )}
              </div>
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}

/** The worked lines to copy: estimate, point out, point back, write it, check (or one line per fact variant). */
function BookLines({ model, t, ests }) {
  // `math`: one formula, or a list of pieces that each stay whole (a narrow screen breaks between them)
  const row = (label, math, tail) => (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-0">
      <span className="w-24 shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      {math && (
        <span className="inline-flex flex-wrap items-baseline gap-x-2 text-lg sm:text-xl text-slate-900 dark:text-slate-100">
          {[].concat(math).map((m) => <span key={m} className="whitespace-nowrap"><SafeInlineMath math={m} /></span>)}
        </span>
      )}
      {tail && <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{tail}</span>}
    </div>
  );
  if (model.kind === 'fact') {
    return (
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 sm:px-4 py-1 min-w-0 overflow-x-auto">
        {row(t.useFact, model.factLatex)}
        {model.steps.map((s, j) => row(`${j + 1}`, [estimateLatex(s.sum.est), '\\Rightarrow', `${s.sum.latex} = ${s.answerText}`], null))}
      </div>
    );
  }
  const est = model.estimate ? model.sum.est : null;
  const close = est ? t.close(model.simpleText, plain(ests[0] || est.value)) : null;
  // The "write it" stage, kept in the working: money keeps its cents, an exact answer drops its end zeros.
  const write = !model.write ? null
    : model.money ? row(t.lines.write, `${model.answerText === model.moneyText ? '' : `${model.answerText} = `}${model.moneyText}\\text{ ${t.dollars}}`, t.moneyTail)
      : row(t.lines.write, `${model.answerText} = ${model.simpleText}`, t.zerosTail);
  return (
    <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 sm:px-4 py-1 min-w-0 overflow-x-auto">
      {est && row(t.lines.est, estimateLatex(est))}
      {row(t.lines.out, `${model.outLatex} = ${model.pText}`)}
      {row(t.lines.back, `${model.latex} = ${model.answerText}`, t.places(model.dp))}
      {write}
      {close && row(t.lines.check, null, `✓ ${close}`)}
    </div>
  );
}
