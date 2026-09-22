import { useMemo, useState } from 'react';
import {
  Combine, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, ListChecks,
  Split, AlignLeft, MousePointerClick, Scaling, X, Diff, Eraser, Replace, Equal, Undo2, CheckCheck,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import { NumberBox } from '../components/math/SurdInput.jsx';
import CoordGrid from '../components/math/CoordGrid.jsx';
import {
  deriveSimEq, simEqQuestionLatex, methodOptions, chainOptions, eliminate, tidyLatex, oneLetterLatex,
  sameEquation, parseTypedNumber, sameValue, frLatex, coefTerm, equationsOf,
} from '../utils/simultaneous';

/* ------------------------------------------------------------------ *
 * SIMULTANEOUS — two equations, two unknowns, solved the way the mark
 * scheme pays for it, and by the QUICKEST method (Assignment 07 asks the
 * student to explain why the method chosen was the most efficient).
 *
 * Reads a unit's `simultaneous`:
 *   { title, intro, items: [
 *       { id, eqs: ['3(x + 2) - 2(y - 3) = 0', '4x - y = -11'], prompt?, note?, graph? },
 *       { id, chain: '7x - 2y = 4x + y = 10' },       a chain says two things at once
 *   ] }
 * Every stage below is derived from the equations by utils/simultaneous.js.
 *
 * Stages:
 *   SPLIT     (a chain) which two equations does it say?
 *   TIDY      brackets and fractions cleared: ax + by = c, one row each
 *   METHOD    the quickest method, and WHY — one try
 *   ELIMINATION                         SUBSTITUTION
 *   MATCH     multipliers that make     SUBSTITUTE  put the letter that is
 *             one letter the same                  on its own into the other
 *             size (any that work)                 equation and collect
 *   MULTIPLY  every term, both sides
 *   ADD/SUB   same signs subtract
 *   ELIMINATE the one-letter equation
 *   SOLVE     the first letter
 *   BACK      put it back to find the other
 *   CHECK     both values in the other equation
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. SPLIT, METHOD and ADD/SUB are
 * picks, so they get one try. The finished item draws both lines: the
 * answer is the point where they cross.
 * ------------------------------------------------------------------ */

const INK = '#047857';
const INK_DARK = '#065f46';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  title: 'Simultaneous Equations',
  check: 'Check',
  stuck: 'Show me',
  cont: 'Continue',
  next: 'Next question',
  finish: 'Finish',
  solved: 'solved',
  clean: 'Every move right first time.',
  slipped: 'Solved — one wrong turn, and you found it yourself.',
  helped: 'Solved — with a move or two shown to you.',
  bookCopy: 'Copy this into your book',
  shown: 'Here it is. Read it, then continue.',
  stages: {
    split: 'Split', tidy: 'Tidy', method: 'Method', match: 'Match', multiply: 'Multiply',
    op: 'Add or subtract', elim: 'Eliminate', substitute: 'Substitute', solve: 'Solve', back: 'Find the other', check: 'Check',
  },
};
const STAGE_ICON = {
  split: Split, tidy: AlignLeft, method: MousePointerClick, match: Scaling, multiply: X, op: Diff,
  elim: Eraser, substitute: Replace, solve: Equal, back: Undo2, check: CheckCheck,
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const intOf = (s) => (/^\s*-?\d+\s*$/.test(String(s ?? '')) ? Number(s) : null);
const intOr0 = (s) => (String(s ?? '').trim() === '' ? 0 : intOf(s));

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

function Message({ msg }) {
  if (!msg?.text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{parseInlineText(msg.text)}</span>
    </div>
  );
}

function Actions({ locked, onShow, onCheck, onContinue }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          {onShow && (
            <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
            </button>
          )}
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        <button onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/** Inline maths inside a sentence: "Put $x = 2$ into (2)." */
const Say = ({ text, className = '' }) => (
  <span className={`[&_.katex]:inline-block ${className}`}>
    {String(text).split('$').map((p, i) => (i % 2 ? <SafeInlineMath key={i} math={p} /> : <span key={i}>{p}</span>))}
  </span>
);

/** [a] v1 + [b] v2 = [c] — one tidy equation, typed. */
function EqBoxes({ prefix, vars, typed, marks, locked, onType, onEnter, onlyOne = null }) {
  const box = (k, label) => (
    <NumberBox value={typed[`${prefix}${k}`]} state={marks[`${prefix}${k}`]} disabled={locked || marks[`${prefix}${k}`] === 'good'}
      onEnter={onEnter} label={label} width="w-16" onChange={(v) => onType(`${prefix}${k}`, v)} />
  );
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-2xl text-slate-900 dark:text-slate-100">
      {onlyOne ? (
        <>{box('k', `number in front of ${onlyOne}`)}<i className="font-serif">{onlyOne}</i></>
      ) : (
        <>
          {box('a', `number in front of ${vars[0]}`)}<i className="font-serif">{vars[0]}</i>
          <span className="font-black text-slate-400 mx-0.5">+</span>
          {box('b', `number in front of ${vars[1]}`)}<i className="font-serif">{vars[1]}</i>
        </>
      )}
      <span className="font-black text-slate-500 mx-1">=</span>
      {box('c', 'number on the right')}
    </div>
  );
}

export default function Simultaneous({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && (it.eqs || it.chain)), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stageIdx, setStageIdx] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongs, setWrongs] = useState(0);
  const [msg, setMsg] = useState(null);
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [picked, setPicked] = useState(null);
  // The multipliers the student chose at MATCH — followed through honestly.
  const [mult, setMult] = useState(null);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveSimEq(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const { vars, tidy, labels } = model;
  const isSub = model.method === 'sub';
  // Which equations need tidying: for substitution only the OTHER one — the
  // equation with a letter on its own is used exactly as it stands.
  const tidyIdx = [0, 1].filter((i) => model.tidyNeeded[i] && (!isSub || i === model.other));
  const effMult = mult || (isSub ? null : model.reason === 'same' ? [1, 1] : null);
  const elimNow = !isSub && effMult ? eliminate(tidy, effMult, vars) : null;
  const multiplyNeeded = !isSub && model.reason !== 'same' && (!effMult || effMult.some((m) => m !== 1));
  const stages = [
    ...(model.chain ? ['split'] : []),
    ...(tidyIdx.length ? ['tidy'] : []),
    'method',
    ...(isSub ? ['substitute'] : [
      ...(model.reason !== 'same' ? ['match'] : []),
      ...(multiplyNeeded ? ['multiply'] : []),
      'op', 'elim',
    ]),
    'solve', 'back', 'check',
  ];
  const stage = stages[stageIdx];
  const qLines = simEqQuestionLatex(item);
  const rawLatex = equationsOf(item).sides.map((_, i) => (model.chain ? null : qLines[i]));

  // Labels once the multiplied equations exist: (1)×3 → (3), (2)×4 → (4).
  const scaledLabel = (i) => {
    if (!effMult || effMult[i] === 1) return labels[i];
    return i === 0 || effMult[0] === 1 ? '(3)' : '(4)';
  };
  // Subtracting is done in the order that leaves a positive number in front.
  const opShown = (() => {
    if (!elimNow?.letter) return null;
    const { op, result } = elimNow;
    const [A, B] = [scaledLabel(0), scaledLabel(1)];
    if (op === 'sub' && result.k < 0) return { label: `${B} − ${A}`, k: -result.k, c: -result.c };
    return { label: `${A} ${op === 'add' ? '+' : '−'} ${B}`, k: result.k, c: result.c };
  })();

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); };
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const advance = () => {
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const judge = (ok, badText, reveal, goodText = 'Right.') => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ ok: true, text: goodText }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text: `${badText} The answer is filled in for you.` }); }
    else setMsg({ ok: false, text: badText });
  };
  const showMe = (reveal, text = T.shown) => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text }); };
  const goNext = () => { setPos((p) => p + 1); setStageIdx(0); setHelped(false); setSlipped(false); setItemDone(false); setMult(null); resetStage(); };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const type = (key, v) => {
    setTyped((t) => ({ ...t, [key]: v }));
    setMarks((m) => ({ ...m, [key]: m[key] === 'good' ? 'good' : undefined }));
    setMsg(null);
  };
  const fill = (entries, tone = 'shown') => {
    setTyped((t) => ({ ...t, ...Object.fromEntries(entries.map(([k, v]) => [k, String(v)])) }));
    setMarks((m) => ({ ...m, ...Object.fromEntries(entries.map(([k]) => [k, m[k] === 'good' ? 'good' : tone])) }));
  };
  const pickOnce = (i, options) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    const o = options[i];
    if (o.correct) setMsg({ ok: true, text: o.feedback || o.why });
    else {
      setHelped(true);
      setSlipped(true);
      const right = options.find((p) => p.correct);
      setMsg({ ok: false, text: `${o.feedback || o.why} The quickest choice is: **${right.label || ''}**${right.label ? ' — ' : ''}${right.why}.` });
    }
  };

  /* ---------------------------------------------------------- split */
  const splitOpts = model.chain ? chainOptions(item) : [];
  const pickSplit = (i) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    const o = splitOpts[i];
    if (o.correct) setMsg({ ok: true, text: o.why });
    else { setHelped(true); setSlipped(true); setMsg({ ok: false, text: `${o.why} It says: $${splitOpts.find((p) => p.correct).latex}$.` }); }
  };

  /* ---------------------------------------------------------- tidy */
  const tidyTyped = (i) => ({ a: intOr0(typed[`t${i}a`]), b: intOr0(typed[`t${i}b`]), c: intOr0(typed[`t${i}c`]) });
  const checkTidy = () => {
    let bad = [];
    const mk = { ...marks };
    let nudge = null;
    for (const i of tidyIdx) {
      const t = tidyTyped(i);
      if ([t.a, t.b, t.c].some((v) => v == null)) { setMsg({ ok: false, text: 'Fill in every box with a whole number (a minus for a negative).' }); return; }
      const want = tidy[i];
      if (sameEquation(t, want)) {
        const g = [t.a, t.b, t.c].reduce((p, q) => { let a = Math.abs(p); let b = Math.abs(q); while (b) [a, b] = [b, a % b]; return a; }, 0);
        if (g > 1) nudge = `Equal — but every number in ${labels[i]} divides by ${g}. Divide through, so the numbers stay small.`;
        for (const k of 'abc') mk[`t${i}${k}`] = 'good';
      } else {
        bad.push(i);
        const lettersOk = t.a * want.b === t.b * want.a && t.a !== 0;
        for (const k of 'abc') mk[`t${i}${k}`] = lettersOk && k !== 'c' ? 'good' : 'bad';
      }
    }
    if (nudge && !bad.length) { setMsg({ info: true, text: nudge }); return; }
    setMarks(mk);
    const hasFrac = tidyIdx.some((i) => /\//.test(item.eqs?.[i] || ''));
    const why = hasFrac
      ? 'Clear the fraction first: multiply EVERY term on both sides by the number underneath. Then get the letters on the left and the number on the right.'
      : 'Expand every bracket — the number in front multiplies EVERY term inside, and a minus in front changes both signs. Then letters on the left, the number on the right.';
    judge(!bad.length, why, () => fill(tidyIdx.flatMap((i) => [[`t${i}a`, tidy[i].a], [`t${i}b`, tidy[i].b], [`t${i}c`, tidy[i].c]])),
      `Right — now ${tidyIdx.length === 2 ? 'both equations are' : 'it is'} in the form $a${vars[0]} + b${vars[1]} = c$, lined up letter under letter.`);
  };
  const showTidy = () => showMe(() => fill(tidyIdx.flatMap((i) => [[`t${i}a`, tidy[i].a], [`t${i}b`, tidy[i].b], [`t${i}c`, tidy[i].c]])));

  /* ---------------------------------------------------------- method */
  const mOpts = methodOptions(model);

  /* ---------------------------------------------------------- match */
  const checkMatch = () => {
    const m1 = intOf(typed.m1);
    const m2 = intOf(typed.m2);
    if (m1 == null || m2 == null || m1 < 1 || m2 < 1) { setMsg({ ok: false, text: 'Type a whole number for each multiplier (1 means leave it as it is).' }); return; }
    const e = eliminate(tidy, [m1, m2], vars);
    if (!e.letter) {
      setMarks({ m1: 'bad', m2: 'bad' });
      judge(false, `After that, ${labels[0]} has $${coefTerm(tidy[0].a * m1, vars[0])}$ and $${coefTerm(tidy[0].b * m1, vars[1])}$, ${labels[1]} has $${coefTerm(tidy[1].a * m2, vars[0])}$ and $${coefTerm(tidy[1].b * m2, vars[1])}$ — no letter has the same number in front in both. Aim for one letter's numbers to match.`,
        () => { fill([['m1', model.plan.m[0]], ['m2', model.plan.m[1]]]); setMult(model.plan.m); });
      return;
    }
    setMarks({ m1: 'good', m2: 'good' });
    setMult([m1, m2]);
    const key = e.letter === vars[0] ? 'a' : 'b';
    const size = Math.abs(tidy[0][key] * m1);
    let g = m1;
    for (let b = m2; b;) [g, b] = [b, g % b];
    const bigger = g > 1 ? ` It works — but ×${m1 / g} and ×${m2 / g} would keep the numbers smaller.` : '';
    judge(true, '', null, `Right — both equations now have $${size}${e.letter}$ (ignoring the sign).${bigger}`);
  };
  const showMatch = () => showMe(() => { fill([['m1', model.plan.m[0]], ['m2', model.plan.m[1]]]); setMult(model.plan.m); });

  /* ---------------------------------------------------------- multiply */
  const multIdx = effMult ? [0, 1].filter((i) => effMult[i] !== 1) : [];
  const checkMultiply = () => {
    const mk = {};
    let bad = 0;
    let forgotRight = false;
    for (const i of multIdx) {
      const want = elimNow.scaled[i];
      const t = { a: intOr0(typed[`s${i}a`]), b: intOr0(typed[`s${i}b`]), c: intOr0(typed[`s${i}c`]) };
      if ([t.a, t.b, t.c].some((v) => v == null)) { setMsg({ ok: false, text: 'Fill in every box.' }); return; }
      for (const k of 'abc') { const ok = t[k] === want[k]; mk[`s${i}${k}`] = ok ? 'good' : 'bad'; if (!ok) bad += 1; }
      if (t.a === want.a && t.b === want.b && t.c === tidy[i].c && want.c !== tidy[i].c) forgotRight = true;
    }
    setMarks(mk);
    const why = forgotRight
      ? 'Multiply EVERY term — the number on the right-hand side as well. Otherwise the two sides are no longer equal.'
      : 'Multiply every term in the equation by its multiplier — both letters and the number on the right.';
    judge(bad === 0, why, () => fill(multIdx.flatMap((i) => [[`s${i}a`, elimNow.scaled[i].a], [`s${i}b`, elimNow.scaled[i].b], [`s${i}c`, elimNow.scaled[i].c]])));
  };
  const showMultiply = () => showMe(() => fill(multIdx.flatMap((i) => [[`s${i}a`, elimNow.scaled[i].a], [`s${i}b`, elimNow.scaled[i].b], [`s${i}c`, elimNow.scaled[i].c]])));

  /* ---------------------------------------------------------- add or subtract */
  const opKey = elimNow?.letter === vars[0] ? 'a' : 'b';
  const opOpts = elimNow?.letter ? [
    { id: 'add', label: 'Add the equations', correct: elimNow.op === 'add' },
    { id: 'sub', label: 'Subtract the equations', correct: elimNow.op === 'sub' },
  ] : [];
  const opWhy = elimNow?.letter
    ? `$${coefTerm(elimNow.scaled[0][opKey], elimNow.letter)}$ and $${coefTerm(elimNow.scaled[1][opKey], elimNow.letter)}$ have ${elimNow.op === 'sub' ? 'the SAME sign — subtract, and they cancel' : 'DIFFERENT signs — add, and they cancel'}. Same signs subtract; different signs add.`
    : '';
  const pickOp = (i) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    if (opOpts[i].correct) setMsg({ ok: true, text: `Right — ${opWhy}` });
    else { setHelped(true); setSlipped(true); setMsg({ ok: false, text: `Not this time: ${opWhy}` }); }
  };

  /* ---------------------------------------------------------- eliminate / substitute */
  const keepLetter = isSub ? model.subject.w : elimNow?.keep;
  const checkElim = () => {
    const k = intOf(typed.ek);
    const c = intOf(typed.ec);
    if (k == null || c == null) { setMsg({ ok: false, text: 'Type the number in front of the letter and the number on the right.' }); return; }
    const ok = (k === opShown.k && c === opShown.c) || (k === -opShown.k && c === -opShown.c);
    const kOk = Math.abs(k) === Math.abs(opShown.k);
    setMarks({ ek: kOk ? 'good' : 'bad', ec: ok ? 'good' : 'bad' });
    const why = kOk
      ? `The $${keepLetter}$ column is right. Now the numbers on the right:${elimNow.op === 'sub' ? 'subtract them — and subtracting a negative ADDS.' : 'add them, watching the signs.'}`
      : `Go down the columns: the $${elimNow.letter}$ terms cancel; ${elimNow.op === 'sub' ? 'subtract' : 'add'} the $${keepLetter}$ terms, then the numbers.`;
    judge(ok, why, () => fill([['ek', opShown.k], ['ec', opShown.c]]), `Right — the $${elimNow.letter}$ terms are gone: $${oneLetterLatex(opShown.k, keepLetter, opShown.c)}$.`);
  };
  const showElim = () => showMe(() => fill([['ek', opShown.k], ['ec', opShown.c]]));

  const checkSubstitute = () => {
    const k = intOf(typed.ek);
    const c = intOr0(typed.ec0);
    const r = intOf(typed.ec);
    if (k == null || c == null || r == null || k === 0) { setMsg({ ok: false, text: 'Fill in the number in front of the letter, the number beside it (0 if none) and the right-hand side.' }); return; }
    const want = model.collected;
    // Right when it has the same solution and is a multiple of the collected line.
    const ok = k * (want.rhs - want.c) === want.k * (r - c);
    setMarks({ ek: ok ? 'good' : 'bad', ec0: ok ? 'good' : 'bad', ec: ok ? 'good' : 'bad' });
    const bv = model.tidy[model.other][model.subject.v === vars[0] ? 'a' : 'b'];
    const why = Math.abs(bv) === 1
      ? `Replace $${model.subject.v}$ with the whole bracket, then collect the $${keepLetter}$ terms and the numbers.`
      : `Replace $${model.subject.v}$ with the whole bracket — the ${Math.abs(bv)} in front multiplies EVERY term inside it. Then collect.`;
    judge(ok, why, () => fill([['ek', want.k], ['ec0', want.c], ['ec', want.rhs]]), `Right — only $${keepLetter}$ is left.`);
  };
  const showSubstitute = () => showMe(() => fill([['ek', model.collected.k], ['ec0', model.collected.c], ['ec', model.collected.rhs]]));

  /* ---------------------------------------------------------- solve / back / check */
  const firstVal = model.firstValue;
  const oneLine = isSub
    ? `${coefTerm(model.collected.k, keepLetter)}${model.collected.c ? ` ${model.collected.c < 0 ? '-' : '+'} ${Math.abs(model.collected.c)}` : ''} = ${model.collected.rhs}`
    : opShown ? oneLetterLatex(opShown.k, keepLetter, opShown.c) : '';
  const checkSolve = () => {
    const v = parseTypedNumber(typed.v);
    if (!v) { setMsg({ ok: false, text: 'Type a whole number (a minus for a negative).' }); return; }
    const ok = sameValue(v, firstVal);
    setMarks({ v: ok ? 'good' : 'bad' });
    const c0 = isSub ? model.collected.c : 0;
    judge(ok, `From $${oneLine}$: ${c0 ? `${c0 > 0 ? `subtract ${c0} from` : `add ${-c0} to`} both sides, then ` : ''}divide both sides by the number in front of $${keepLetter}$.`,
      () => fill([['v', frLatex(firstVal)]]), `Right — $${keepLetter} = ${frLatex(firstVal)}$.`);
  };
  const showSolve = () => showMe(() => fill([['v', frLatex(firstVal)]]));

  const back = model.back;
  const checkBack = () => {
    const v = parseTypedNumber(typed.w);
    if (!v) { setMsg({ ok: false, text: 'Type a number.' }); return; }
    const ok = sameValue(v, back.value);
    setMarks({ w: ok ? 'good' : 'bad' });
    judge(ok, `Work it out one step at a time: $${back.latex}$. Multiply first, then solve for $${back.letter}$.`,
      () => fill([['w', frLatex(back.value)]]), `Right — $${back.letter} = ${frLatex(back.value)}$.`);
  };
  const showBack = () => showMe(() => fill([['w', frLatex(back.value)]]));

  const chk = model.check;
  const checkCheck = () => {
    const v = parseTypedNumber(typed.k);
    if (!v) { setMsg({ ok: false, text: 'Type the value of the left-hand side.' }); return; }
    const ok = sameValue(v, chk.value);
    setMarks({ k: ok ? 'good' : 'bad' });
    judge(ok, `Multiply each number by its value, then add: $${chk.latex}$.`, () => fill([['k', frLatex(chk.value)]]),
      `It comes to ${chk.rhs} — the right-hand side of ${labels[chk.idx]}. Both values work in both equations.`);
  };
  const showCheck = () => showMe(() => fill([['k', frLatex(chk.value)]]));

  /* ---------------------------------------------------------- the working ladder */
  const reached = (s) => itemDone || stages.indexOf(s) < stageIdx || (stages.indexOf(s) === stageIdx && locked);
  const ladder = [];
  if (model.chain) {
    ladder.push(qLines[0]);
    if (reached('split')) for (const i of [0, 1]) ladder.push(`${tidyLatex(tidy[i], vars)} \\quad ${labels[i]}`);
  } else {
    for (const i of [0, 1]) {
      const isSubject = isSub && i === model.subject.idx;
      const needs = tidyIdx.includes(i);
      if (isSubject) ladder.push(`${model.subject.latex} \\quad ${labels[i]}`);
      else if (needs && reached('tidy')) ladder.push(`${rawLatex[i]} \\;\\Rightarrow\\; ${tidyLatex(tidy[i], vars)} \\quad ${labels[i]}`);
      else ladder.push(`${needs ? rawLatex[i] : tidyLatex(tidy[i], vars)} \\quad ${labels[i]}`);
    }
  }
  if (isSub) {
    if (reached('substitute')) {
      ladder.push(`\\text{${labels[model.subject.idx]} into ${labels[model.other]}:} \\; ${model.subLine}`);
      ladder.push(oneLine);
    }
  } else {
    if (reached(multiplyNeeded ? 'multiply' : 'op') && effMult) {
      for (const i of multIdx) ladder.push(`\\text{${labels[i]}} \\times ${effMult[i]}\\text{:} \\; ${tidyLatex(elimNow.scaled[i], vars)} \\quad ${scaledLabel(i)}`);
    }
    if (reached('elim') && opShown) ladder.push(`\\text{${opShown.label.replace('-', '−')}:} \\; ${oneLine}`);
  }
  if (reached('solve')) ladder.push(`${keepLetter} = ${frLatex(firstVal)}`);
  if (reached('back')) ladder.push(`\\text{In ${labels[back.idx]}:} \\; ${back.latex} \\;\\Rightarrow\\; ${back.letter} = ${frLatex(back.value)}`);
  if (reached('check')) ladder.push(`\\text{Check ${labels[chk.idx]}:} \\; ${chk.latex} = ${chk.rhs} \\; \\checkmark`);

  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const sol = model.sol;
  const answerLatex = `${vars[0]} = ${frLatex(sol[vars[0]])}, \\; ${vars[1]} = ${frLatex(sol[vars[1]])}`;
  const sx = sol[vars[0]].n / sol[vars[0]].d;
  const sy = sol[vars[1]].n / sol[vars[1]].d;
  const win = {
    xMin: Math.min(-1, Math.floor(sx) - 5), xMax: Math.max(1, Math.ceil(sx) + 5),
    yMin: Math.min(-1, Math.floor(sy) - 5), yMax: Math.max(1, Math.ceil(sy) + 5),
  };
  const LINE_COLORS = ['#047857', '#c2410c'];

  const choiceStyle = (o, i) => {
    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-600 text-slate-900 dark:text-slate-100';
    if (locked) {
      if (o.correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
      else if (picked === i) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
      else style = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
    }
    return style;
  };

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the working so far */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Combine className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">Solve the simultaneous equations</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80">{cleared} / {items.length} {T.solved}</div>
            </div>
            {item.prompt && <p className="px-4 pt-3 text-[15px] font-semibold text-slate-700 dark:text-slate-200">{parseInlineText(item.prompt)}</p>}
            <div className="px-4 py-3 text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden [&_.katex-display]:my-1">
              {/* A pair is printed the way a textbook prints it: lined up on the equals signs. */}
              <SafeBlockMath math={qLines.length === 2 ? `\\begin{aligned} ${qLines.map((l) => l.replace(' = ', ' &= ')).join(' \\\\ ')} \\end{aligned}` : qLines[0]} />
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{parseInlineText(item.note || pool.intro)}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s, i) => <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />)}
              </div>
            )}
          </div>

          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {stage === 'split' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">A chain says two things at once. Which two equations is it?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Every part of the chain is equal to every other part.</p>
                  <div className="grid gap-2">
                    {splitOpts.map((o, i) => (
                      <button key={o.id} disabled={locked} onClick={() => pickSplit(i)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-lg text-left transition-all [&_.katex]:inline-block ${choiceStyle(o, i)}`}>
                        <SafeInlineMath math={o.latex} />
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'tidy' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Tidy ${tidyIdx.length === 2 ? 'both equations' : 'the equation'} into the form $a${vars[0]} + b${vars[1]} = c$.`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    Brackets out, fractions cleared, letters on the left, the number on the right. Type a minus for a negative: <Say text={`$3${vars[0]} + (-2)${vars[1]}$ is $3${vars[0]} - 2${vars[1]}$`} />.
                  </p>
                  <div className="flex flex-col gap-4">
                    {tidyIdx.map((i) => (
                      <div key={i} className="rounded-xl bg-emerald-50/60 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/40 p-3">
                        <div className="text-xl mb-2 text-slate-800 dark:text-slate-100 [&_.katex]:inline-block">
                          <span className="font-black text-emerald-700 dark:text-emerald-300 mr-2">{labels[i]}</span><SafeInlineMath math={rawLatex[i] || tidyLatex(tidy[i], vars)} />
                        </div>
                        <EqBoxes prefix={`t${i}`} vars={vars} typed={typed} marks={marks} locked={locked} onType={type} onEnter={checkTidy} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showTidy} onCheck={checkTidy} onContinue={advance} />
                </>
              )}

              {stage === 'method' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Which method is quickest here — and why?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    Look at the two equations: {tidyLatex(tidy[0], vars) && <Say text={`$${isSub ? model.subject.latex : tidyLatex(tidy[0], vars)}$ and $${tidyLatex(tidy[isSub ? model.other : 1], vars)}$`} />}. The paper asks you to explain your choice.
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {mOpts.map((o, i) => (
                      <button key={o.id} disabled={locked} onClick={() => pickOnce(i, mOpts)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-left transition-all ${choiceStyle(o, i)}`}>
                        <div className="font-black text-sm uppercase tracking-wide">{o.label}</div>
                        <div className="text-[15px] font-semibold mt-0.5"><Say text={`because ${o.why}`} /></div>
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'match' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Make one letter match: the same number in front in both equations.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Choose what to multiply each equation by. Type 1 to leave an equation as it is.</p>
                  <div className="flex flex-col gap-3">
                    {[0, 1].map((i) => (
                      <div key={i} className="flex flex-wrap items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                        <span className="font-black text-emerald-700 dark:text-emerald-300 w-9">{labels[i]}</span>
                        <span className="min-w-[10rem] [&_.katex]:inline-block"><SafeInlineMath math={tidyLatex(tidy[i], vars)} /></span>
                        <span className="font-black text-slate-400">×</span>
                        <NumberBox value={typed[`m${i + 1}`]} state={marks[`m${i + 1}`]} disabled={locked} allowMinus={false} onEnter={checkMatch}
                          label={`multiply equation ${i + 1} by`} onChange={(v) => type(`m${i + 1}`, v)} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showMatch} onCheck={checkMatch} onContinue={advance} />
                </>
              )}

              {stage === 'multiply' && effMult && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Multiply out. Every term — both sides.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">The number on the right is multiplied too, or the equation stops being true.</p>
                  <div className="flex flex-col gap-4">
                    {multIdx.map((i) => (
                      <div key={i} className="rounded-xl bg-emerald-50/60 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/40 p-3">
                        <div className="text-xl mb-2 text-slate-800 dark:text-slate-100 [&_.katex]:inline-block">
                          <SafeInlineMath math={`${labels[i]} \\times ${effMult[i]}: \\quad (${tidyLatex(tidy[i], vars)}) \\times ${effMult[i]}`} />
                        </div>
                        <EqBoxes prefix={`s${i}`} vars={vars} typed={typed} marks={marks} locked={locked} onType={type} onEnter={checkMultiply} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showMultiply} onCheck={checkMultiply} onContinue={advance} />
                </>
              )}

              {stage === 'op' && elimNow?.letter && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`To get rid of $${elimNow.letter}$: add or subtract?`} /></div>
                  <div className="my-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    {[0, 1].map((i) => (
                      <div key={i} className="py-0.5"><SafeInlineMath math={`${tidyLatex(elimNow.scaled[i], vars)} \\quad ${scaledLabel(i)}`} /></div>
                    ))}
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    {opOpts.map((o, i) => (
                      <button key={o.id} disabled={locked} onClick={() => pickOp(i)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-black uppercase tracking-wide text-sm transition-all ${choiceStyle(o, i)}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {stage === 'elim' && opShown && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`${opShown.label}: go down the columns. The $${elimNow.letter}$ terms cancel.`} /></div>
                  <div className="my-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    {[0, 1].map((i) => (
                      <div key={i} className="py-0.5"><SafeInlineMath math={`${tidyLatex(elimNow.scaled[i], vars)} \\quad ${scaledLabel(i)}`} /></div>
                    ))}
                  </div>
                  <EqBoxes prefix="e" onlyOne={keepLetter} vars={vars} typed={{ ek: typed.ek, ec: typed.ec }} marks={{ ek: marks.ek, ec: marks.ec }}
                    locked={locked} onType={type} onEnter={checkElim} />
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showElim} onCheck={checkElim} onContinue={advance} />
                </>
              )}

              {stage === 'substitute' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Put ${labels[model.subject.idx]} into ${labels[model.other]}: replace $${model.subject.v}$ with $${model.subject.latex.split('= ')[1]}$.`} />
                  </div>
                  <div className="my-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={model.subLine} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Expand and collect. Type 0 (or leave it blank) if there is no number beside the letter.</p>
                  <div className="flex flex-wrap items-center gap-1.5 text-2xl text-slate-900 dark:text-slate-100">
                    <NumberBox value={typed.ek} state={marks.ek} disabled={locked} onEnter={checkSubstitute} label={`number in front of ${keepLetter}`} onChange={(v) => type('ek', v)} />
                    <i className="font-serif">{keepLetter}</i>
                    <span className="font-black text-slate-400 mx-0.5">+</span>
                    <NumberBox value={typed.ec0} state={marks.ec0} disabled={locked} onEnter={checkSubstitute} label="number beside it" onChange={(v) => type('ec0', v)} />
                    <span className="font-black text-slate-500 mx-1">=</span>
                    <NumberBox value={typed.ec} state={marks.ec} disabled={locked} onEnter={checkSubstitute} label="number on the right" onChange={(v) => type('ec', v)} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showSubstitute} onCheck={checkSubstitute} onContinue={advance} />
                </>
              )}

              {stage === 'solve' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-3 text-lg"><Say text={`Solve $${oneLine}$.`} /></div>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
                    <i className="font-serif">{keepLetter}</i><span className="font-black text-slate-500">=</span>
                    <NumberBox value={typed.v} state={marks.v} disabled={locked} onEnter={checkSolve} label={`${keepLetter} =`} width="w-24" onChange={(v) => setTyped({ v: String(v) })} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showSolve} onCheck={checkSolve} onContinue={advance} />
                </>
              )}

              {stage === 'back' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    <Say text={`Put $${keepLetter} = ${frLatex(firstVal)}$ into ${labels[back.idx]} to find $${back.letter}$.`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {isSub ? 'The equation that already says what the letter is — nothing to rearrange.' : 'The equation with the simplest numbers in front of the other letter.'}
                  </p>
                  <div className="my-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={back.latex} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
                    <i className="font-serif">{back.letter}</i><span className="font-black text-slate-500">=</span>
                    <NumberBox value={typed.w} state={marks.w} disabled={locked} onEnter={checkBack} label={`${back.letter} =`} width="w-24" onChange={(v) => setTyped({ w: String(v) })} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showBack} onCheck={checkBack} onContinue={advance} />
                </>
              )}

              {stage === 'check' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg"><Say text={`Check: put both values into ${labels[chk.idx]}, the equation you have not used yet.`} /></div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">If the left-hand side comes to the right-hand side, both values are right.</p>
                  <div className="flex flex-wrap items-center gap-3 text-2xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block">
                    <SafeInlineMath math={`${chk.latex} =`} />
                    <NumberBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkCheck} label="value of the left-hand side" width="w-24" onChange={(v) => setTyped({ k: String(v) })} />
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showCheck} onCheck={checkCheck} onContinue={advance} />
                </>
              )}
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? T.helped : slipped ? T.slipped : T.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {T.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden">
                  {ladder.map((l, i) => <div key={i} className="text-lg py-1 [&_.katex]:inline-block"><SafeInlineMath math={l} /></div>)}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(4,120,87,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 [&_.katex]:inline-block"><SafeInlineMath math={answerLatex} /></div>
                </div>
                {item.graph !== false && (
                  <div className="mt-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-2">
                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1 px-1">
                      Each equation is a straight line. The answer is where they cross.
                    </div>
                    <div className="max-w-md mx-auto">
                      <CoordGrid window={win} vars={vars}
                        lines={tidy.map((t, i) => ({ ...t, color: LINE_COLORS[i], label: tidyLatex(t, vars).replace(/-/g, '−') }))}
                        points={[{ x: sx, y: sy, label: `(${frLatex(sol[vars[0]])}, ${frLatex(sol[vars[1]])})`.replace(/-/g, '−'), color: '#be185d' }]} />
                    </div>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
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
