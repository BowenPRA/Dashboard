import { useMemo, useState } from 'react';
import {
  Superscript, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  ArrowLeftRight, Target, Hash, Combine, Search, ListChecks, TrendingUp,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import {
  deriveLogItem, logQuestionLatex, logWorking, logAnswerLatex, logLatex, logName, plainLatex,
  rawCombineLatex, ratLatex, ratText, powText, logText, parseRational, rat, rEq, rAdd, rMul, rDiv, rNeg,
  rIsInt, ladderRange, rungText, ppOfRat, ppPow, ppToRat,
} from '../utils/logs';

/* ------------------------------------------------------------------ *
 * LOG SIMPLIFIER — the laws of logarithms, one move at a time, on a
 * ladder of questions that gets harder as it goes.
 *
 * Reads a unit's `logSimplify`:
 *   { title, intro, levels: { 1: 'What a log asks', … }, items: [
 *       { id, level, kind: 'evaluate', base, arg },
 *           log_b(arg) as an exact number. arg: 8, '1/9', { root: 2, of: 5 }
 *       { id, level, kind: 'combine', base, terms: [[coef, n], …], number? },
 *           number + Σ coef·log_b(n) as ONE log, then as a number if it is one.
 *           coef: a non-zero integer or 'p/q'; n: a positive integer or 'p/q'.
 *   ] }
 * Base 10 prints as lg, the book's notation. Everything else — every number
 * turned into a log, every power moved inside, the combined number, whether
 * it is an exact power of the base and which power — is derived by
 * utils/logs.js, with exact fractions.
 *
 * The stages:
 *   REWRITE   (evaluate) pick the power question the log is asking: 2^x = 8.
 *   NUMBERS   write each plain number as a log of the base: 2 = log₃ 9.
 *   POWER     move each coefficient inside as a power: 2 log₅ 3 = log₅ 9.
 *   COMBINE   one log: + multiplies inside, − divides. Typed as one number.
 *   DECIDE    is that number an exact power of the base? One tap. Saying
 *             "no" to log₂ 8 is the simplify-fully mark lost on the paper.
 *   EXPONENT  write it as a power of the base: 8 = 2^3, so the log is 3.
 *
 * The POWER LADDER beside the question draws the base's powers as equally
 * spaced rungs — the picture of what a log is. The marker lands once the
 * student has committed: on a rung when the log is a whole number, between
 * rungs (≈ 2.66) when it is not.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. A yes/no gets one try.
 * ------------------------------------------------------------------ */

const INK = '#0284c7';
const INK_DARK = '#075985';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  title: 'Log Simplifier',
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
  stages: { rewrite: 'Power question', numbers: 'Numbers to logs', power: 'Power law', combine: 'Combine', decide: 'A number?', exponent: 'Find the power' },
};
const STAGE_ICON = { rewrite: ArrowLeftRight, numbers: Hash, power: Superscript, combine: Combine, decide: Search, exponent: Target };

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/** A rational as a student would type it: 3, -2, 3/2. */
const typedForm = ([p, q]) => (q === 1 ? `${p}` : `${p}/${q}`);
const TYPE_HINT = 'Type a whole number, a negative number, or a fraction like 3/2.';

/** The powers of a base as a short plain list: 5¹ = 5, 5² = 25, 5³ = 125. */
function powersList(base, upTo) {
  const out = [];
  for (let j = 1; j <= upTo; j += 1) out.push(`${base}^${j} = ${base ** j}`);
  return out.join(',  ');
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

function Message({ msg }) {
  if (!msg?.text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{msg.text}{msg.tex && <> <SafeInlineMath math={msg.tex} /></>}</span>
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

/** One typed value: a whole number, a negative, or a fraction written a/b. */
function ValueBox({ value, onChange, onEnter, state, disabled, label, width = 'w-24' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      inputMode="text"
      aria-label={label}
      onChange={(e) => onChange(e.target.value.replace(/[^\d\-−/.]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      className={`${width} px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** Two big answer buttons with right/wrong colouring once locked. */
function Choices({ options, locked, picked, right, onPick }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(([v, label]) => {
        let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-500';
        if (locked) style = v === right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200' : picked === v ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600' : 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
        return <button key={String(v)} disabled={locked} onClick={() => onPick(v)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-black text-sm transition-all ${style}`}>{label}</button>;
      })}
    </div>
  );
}

/** The rational value of base^(j + t/n) when base is a perfect n-th power, as rung text. */
function subRungText(root, n, j, t) {
  const e = n * j + t;
  if (e >= 0) return `${root ** e}`;
  return `1/${root ** -e}`;
}

/**
 * THE POWER LADDER. The powers of the base as equally spaced rungs — so the
 * distance along is the log. Rung labels are the powers; the pills under them
 * are the exponents. When the base is a perfect square or cube, the half- or
 * third-rungs are drawn small, because that is where log₄ 2 = ½ lives. The
 * marker is only drawn once the student has committed.
 */
function PowerLadder({ base, approx, exact, showMarker, argText }) {
  const { lo, hi } = ladderRange(approx);
  const W = 560;
  const H = 150;
  const padL = 38;
  const padR = 38;
  const lineY = 78;
  const step = (W - padL - padR) / (hi - lo);
  const X = (v) => padL + (v - lo) * step;
  const sq = Math.round(Math.sqrt(base));
  const cube = Math.round(Math.cbrt(base));
  const sub = sq * sq === base ? { root: sq, n: 2 } : cube ** 3 === base ? { root: cube, n: 3 } : null;
  const rungs = [];
  for (let j = lo; j <= hi; j += 1) rungs.push(j);
  const subs = [];
  if (sub) for (let j = lo; j < hi; j += 1) for (let t = 1; t < sub.n; t += 1) subs.push({ at: j + t / sub.n, label: subRungText(sub.root, sub.n, j, t) });
  const small = rungs.length > 8;
  const markerX = Number.isFinite(approx) ? X(approx) : null;
  const logLabel = exact
    ? `${logText(base, argText)} = ${ratText(exact)}`
    : `${logText(base, argText)} ≈ ${Number.isFinite(approx) ? approx.toFixed(2) : '?'}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Power ladder for base ${base}`}>
      <rect x="0" y="0" width={W} height={H} rx="12" fill="#ffffff" />
      <line x1={padL - 18} y1={lineY} x2={W - padR + 18} y2={lineY} stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      {subs.map((s) => (
        <g key={`s${s.at}`}>
          <line x1={X(s.at)} y1={lineY - 7} x2={X(s.at)} y2={lineY + 7} stroke="#cbd5e1" strokeWidth="2" />
          <text x={X(s.at)} y={lineY + 24} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="10" fill="#94a3b8">{s.label}</text>
        </g>
      ))}
      {rungs.map((j) => (
        <g key={j}>
          <line x1={X(j)} y1={lineY - 16} x2={X(j)} y2={lineY + 16} stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <text x={X(j)} y={lineY - 24} textAnchor="middle" fontFamily="ui-monospace, Consolas, monospace" fontWeight="900" fontSize={small ? 11 : 14} fill="#1e293b">{rungText(base, j)}</text>
          <rect x={X(j) - 13} y={lineY + 30} width="26" height="18" rx="9" fill="#e0f2fe" />
          <text x={X(j)} y={lineY + 43} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="11" fill={INK_DARK}>{j}</text>
        </g>
      ))}
      <text x={padL - 18} y={H - 8} fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="11" fill="#64748b">{`powers of ${base} above · the power (the log) below`}</text>
      {showMarker && markerX != null && (
        <g>
          <path d={`M${markerX} ${lineY - 2} l-8 -14 l16 0 z`} fill={exact ? '#16a34a' : AMBER} />
          <circle cx={markerX} cy={lineY} r="7" fill={exact ? '#16a34a' : AMBER} stroke="#ffffff" strokeWidth="2.5" />
          <rect x={Math.min(Math.max(markerX - 80, 4), W - 164)} y="4" width="160" height="22" rx="11" fill={exact ? '#dcfce7' : '#fef3c7'} stroke={exact ? '#16a34a' : AMBER} strokeWidth="1.5" />
          <text x={Math.min(Math.max(markerX, 84), W - 84)} y="19" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill={exact ? '#166534' : '#92400e'}>{logLabel}</text>
        </g>
      )}
    </svg>
  );
}

/**
 * The four power questions a log could be mistaken for, derived from the base
 * and the number. Order rotates with the item so the right one is not always
 * first.
 */
function rewriteOptions(item, model) {
  const b = `${model.base}`;
  const N = model.argLatex;
  const opts = [
    { id: 'right', correct: true, latex: `${b}^{x} = ${N}`, why: `A log asks for a POWER: the power ${b} must be raised to, to make the number.` },
    { id: 'powerBase', correct: false, latex: `x^{${b}} = ${N}`, why: `That asks which number, to the power ${b}, makes it. In a log, ${b} is the BASE — the number being raised to a power — not the power.` },
    { id: 'swap', correct: false, latex: `{${N}}^{x} = ${b}`, why: `The base and the number have swapped places. The small number written low on the log is the base, and it stays at the bottom of the power.` },
    { id: 'result', correct: false, latex: `${b}^{${N}} = x`, why: `That works out ${b} to the power of the number. The log asks the opposite: what power GIVES the number.` },
  ];
  const shift = [...item.id].reduce((s, ch) => s + ch.charCodeAt(0), 0) % opts.length;
  return [...opts.slice(shift), ...opts.slice(0, shift)];
}

export default function LogSimplify({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.kind), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [stage, setStage] = useState(null);
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
  const [powersOpen, setPowersOpen] = useState(false);

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return deriveLogItem(item); } catch { return null; }
  }, [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const stages = model.stages;
  const st = stage || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(st);
  const passed = (s) => stages.indexOf(s) !== -1 && stages.indexOf(s) < stIndex;
  const qLatex = logQuestionLatex(item);
  const base = model.base;
  const bText = `${base}`;
  const argText = model.kind === 'evaluate'
    ? (model.arg ? ratText(model.arg) : (typeof item.arg === 'object' ? `${item.arg.root === 3 ? '∛' : '√'}${item.arg.of}` : String(item.arg)))
    : (model.value ? ratText(model.value) : '?');

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); setPowersOpen(false); };
  const goStage = (s) => { setStage(s); resetStage(); };
  const advance = () => {
    const next = stages[stages.indexOf(st) + 1];
    if (next) goStage(next);
    else completeItem();
  };

  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  function completeItem() {
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    resetStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  }
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

  const goNext = () => {
    setPos((p) => p + 1); setStage(null);
    setHelped(false); setSlipped(false); setItemDone(false); resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- rewrite (evaluate) */
  const options = model.kind === 'evaluate' ? rewriteOptions(item, model) : [];
  const pickRewrite = (id) => {
    if (locked) return;
    setPicked(id);
    const o = options.find((x) => x.id === id);
    judge(o.correct, o.why, () => setPicked('right'), `Right: ${logText(base, argText)} asks "${bText} to what power gives ${argText}?"`);
  };

  /* ---------------------------------------------------------- exponent */
  const want = model.exponent;
  const checkExponent = () => {
    const v = parseRational(typed.k);
    if (!v) { setMsg({ ok: false, text: TYPE_HINT }); return; }
    const ok = rEq(v, want);
    const N = model.kind === 'evaluate' ? model.arg : model.value;
    const sq = Math.round(Math.sqrt(base));
    const cu = Math.round(Math.cbrt(base));
    const rootHint = sq * sq === base ? `√${bText} = ${sq}, so ${sq} = ${bText}^(1/2).`
      : cu ** 3 === base ? `∛${bText} = ${cu}, so ${cu} = ${bText}^(1/3).`
        : `a square root is a power of 1/2: √${bText} = ${bText}^(1/2).`;
    let why = `Try the powers of ${bText} in turn: ${powersList(base, 4)}.`;
    if (want[0] !== 0 && rEq(v, rNeg(want))) why = want[0] < 0 ? `Check the sign. A number smaller than 1 needs a NEGATIVE power: ${bText}^(−n) = 1/${bText}^n.` : `Check the sign — ${argText} is bigger than 1, so the power is positive.`;
    else if (!rIsInt(want) && want[0] !== 0 && (rEq(v, rDiv(rat(1, 1), want)) || rEq(v, rDiv(rat(-1, 1), want)))) why = `Upside down: ${powText(base, v)} is not ${argText}. A ROOT is a fractional power — ${rootHint}`;
    else if (want[0] === 0 && rEq(v, rat(1, 1))) why = `${bText}^1 = ${bText}, not 1. ANY base to the power 0 is 1.`;
    else if (N && rEq(v, N)) why = `That is the number itself. The answer is the POWER that turns ${bText} into ${argText}.`;
    else if (N && rEq(v, rDiv(N, rat(base, 1)))) why = `A log is not a division. Ask how many ${bText}s multiply together to make ${argText}.`;
    else if (!rIsInt(want)) why = `It is a fractional power — ${rootHint} Build ${argText} from that.`;
    setMarks({ k: ok ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ k: typedForm(want) }); setMarks({ k: 'shown' }); },
      `Right: ${argText} = ${powText(base, want)}, so the log is ${ratText(want)}.`);
  };

  /* ---------------------------------------------------------- numbers */
  const checkNumbers = () => {
    const next = { ...marks };
    let bad = 0;
    let why = '';
    for (const [i, nb] of model.numbers.entries()) {
      if (next[`n${i}`] === 'good' || next[`n${i}`] === 'shown') continue;
      const v = parseRational(typed[`n${i}`]);
      if (!v) { setMsg({ ok: false, text: 'Fill in every box first.' }); return; }
      if (rEq(v, nb.arg)) next[`n${i}`] = 'good';
      else {
        next[`n${i}`] = 'bad'; bad += 1;
        const k = Math.abs(nb.k);
        if (rEq(v, rat(k * base, 1))) why = `The number becomes the POWER of the base: ${k} = ${logText(base, `${bText}^${k}`)}, and ${bText}^${k} = ${nb.arg[0]} — not ${k} × ${bText}.`;
        else if (rEq(v, rat(k ** base, 1))) why = `Base first: ${bText}^${k}, not ${k}^${bText}.`;
        else why = `Ask: ${logText(base, '?')} = ${k} means ${bText}^${k} = ?`;
      }
    }
    setMarks(next);
    const reveal = () => {
      const t = { ...typed };
      const mk = { ...next };
      model.numbers.forEach((nb, i) => { if (mk[`n${i}`] !== 'good') { t[`n${i}`] = typedForm(nb.arg); mk[`n${i}`] = 'shown'; } });
      setTyped(t); setMarks(mk);
    };
    judge(bad === 0, why, reveal, `Right — a whole number is a log of a power of the base: ${model.numbers.map((nb) => `${Math.abs(nb.k)} = ${logText(base, String(nb.arg[0]))}`).join(', ')}.`);
  };
  const showNumbers = () => showMe(() => {
    const t = { ...typed };
    const mk = { ...marks };
    model.numbers.forEach((nb, i) => { t[`n${i}`] = typedForm(nb.arg); mk[`n${i}`] = mk[`n${i}`] === 'good' ? 'good' : 'shown'; });
    setTyped(t); setMarks(mk);
  });

  /* ---------------------------------------------------------- power */
  const checkPower = () => {
    const next = { ...marks };
    let bad = 0;
    let why = '';
    for (const [i, p] of model.powers.entries()) {
      if (next[`p${i}`] === 'good' || next[`p${i}`] === 'shown') continue;
      const v = parseRational(typed[`p${i}`]);
      if (!v) { setMsg({ ok: false, text: 'Fill in every box first.' }); return; }
      if (rEq(v, p.powered)) next[`p${i}`] = 'good';
      else {
        next[`p${i}`] = 'bad'; bad += 1;
        if (rEq(v, rMul(p.abs, p.arg))) {
          why = rIsInt(p.abs)
            ? `The number in front becomes a POWER, not a multiplier: ${ratText(p.abs)} log ${ratText(p.arg)} = log ${ratText(p.arg)}^${ratText(p.abs)}, and ${ratText(p.arg)}^${ratText(p.abs)} = ${ratText(p.powered)}.`
            : `A power of ${ratText(p.abs)} is a ROOT, not a fraction of the number: ${ratText(p.arg)}^(${ratText(p.abs)}) = ${ratText(p.powered)}.`;
        } else if (p.sign < 0 && rEq(v, rDiv(rat(1, 1), p.powered))) {
          why = 'Leave the minus sign outside the log for now — the Combine step deals with it. Type the power only.';
        } else if (p.abs[0] > 1 && p.abs[1] > 1 && rEq(v, ppToRat(ppPow(ppOfRat(p.arg), rat(1, p.abs[1]))) || [0, 1])) {
          why = `That is only the root. A power of ${ratText(p.abs)} means take the ${p.abs[1] === 2 ? 'square' : p.abs[1] === 3 ? 'cube' : `${p.abs[1]}th`} root, THEN raise it to the power ${p.abs[0]}: ${ratText(v)}^${p.abs[0]} = ${ratText(p.powered)}.`;
        } else {
          why = `Move the number in front up to be the power: ${ratText(p.arg)}^${rIsInt(p.abs) ? ratText(p.abs) : `(${ratText(p.abs)})`}.`;
        }
      }
    }
    setMarks(next);
    const reveal = () => {
      const t = { ...typed };
      const mk = { ...next };
      model.powers.forEach((p, i) => { if (mk[`p${i}`] !== 'good') { t[`p${i}`] = typedForm(p.powered); mk[`p${i}`] = 'shown'; } });
      setTyped(t); setMarks(mk);
    };
    judge(bad === 0, why, reveal, 'Right — every number in front is now a power inside its log.');
  };
  const showPower = () => showMe(() => {
    const t = { ...typed };
    const mk = { ...marks };
    model.powers.forEach((p, i) => { t[`p${i}`] = typedForm(p.powered); mk[`p${i}`] = mk[`p${i}`] === 'good' ? 'good' : 'shown'; });
    setTyped(t); setMarks(mk);
  });

  /* ---------------------------------------------------------- combine */
  const checkCombine = () => {
    const v = parseRational(typed.v);
    if (!v) { setMsg({ ok: false, text: TYPE_HINT }); return; }
    const ok = rEq(v, model.value);
    const plain = model.plain;
    const hasMinus = plain.some((t) => t.sign < 0);
    const sum = plain.reduce((s, t) => rAdd(s, t.sign > 0 ? t.arg : rNeg(t.arg)), rat(0, 1));
    const product = plain.reduce((s, t) => rMul(s, t.arg), rat(1, 1));
    let why = `Multiply the numbers of the + logs together, then divide by the numbers of the − logs.`;
    if (rEq(v, sum)) why = `Adding logs MULTIPLIES the numbers inside: log a + log b = log(ab). It is never log(a + b)${hasMinus ? ' — and subtracting DIVIDES' : ''}.`;
    else if (hasMinus && rEq(v, product)) why = 'A log with a minus in front DIVIDES: its number goes underneath, not on top.';
    else if (rEq(v, rDiv(rat(1, 1), model.value))) why = 'Upside down — the numbers after a + go on top, the numbers after a − go underneath.';
    const rawTyped = String(typed.v || '');
    const unreduced = ok && /\//.test(rawTyped) && rawTyped.replace(/\s|−/g, '').replace(/^-/, '') !== `${Math.abs(model.value[0])}/${model.value[1]}`;
    setMarks({ v: ok ? 'good' : 'bad' });
    judge(ok, why, () => { setTyped({ v: typedForm(model.value) }); setMarks({ v: 'shown' }); },
      unreduced ? `Right — and that simplifies to ${ratText(model.value)}.` : 'Right — one log.');
  };

  /* ---------------------------------------------------------- decide */
  const { lo: rungLo, hi: rungHi } = ladderRange(model.approx);
  const between = Math.floor(model.approx + 1e-9);
  const pickDecide = (yes) => {
    if (locked) return;
    setPicked(yes);
    setLocked(true);
    const N = argText;
    if (yes === model.evaluates) {
      setMsg({
        ok: true,
        text: model.evaluates
          ? `Yes — ${N} is an exact power of ${bText}, so the log is a number. Now find which power.`
          : `Right — ${N} is not an exact power of ${bText}. It sits between ${rungText(base, between)} and ${rungText(base, between + 1)}, so the log is between ${between} and ${between + 1}: leave the answer as a log.`,
      });
    } else {
      setHelped(true);
      setMsg({
        ok: false,
        text: model.evaluates
          ? `It is — ${N} is an exact power of ${bText}${rIsInt(want) ? '' : ' (a fractional one — look at the small rungs)'}, so the log simplifies to a number. On the paper, stopping at the log loses the "simplify" mark.`
          : `${N} is not an exact power of ${bText}: it falls between ${rungText(base, between)} and ${rungText(base, between + 1)} on the ladder. The answer stays as a log.`,
      });
    }
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelName = item.level ? pool?.levels?.[item.level] : null;
  const showMarker = itemDone || (st === 'decide' && locked && !model.evaluates) || (st === 'exponent' && locked);
  const working = (() => {
    const all = logWorking(item, model);
    if (itemDone) return all;
    if (model.kind === 'evaluate') return passed('rewrite') ? all.slice(0, 2) : all.slice(0, 1);
    const lines = [all[0]];
    let n = 1;
    if (model.numbers.length || model.powers.length) {
      if (passed('power') || (passed('numbers') && !model.powers.length)) lines.push(all[n]);
      n += 1;
    }
    if (model.needsCombine && passed('combine')) lines.push(all[n], all[n + 1]);
    return lines;
  })();
  const nLatex = model.kind === 'combine' ? (model.value ? ratLatex(model.value) : '?') : model.argLatex;
  const currentLatex = logLatex(base, nLatex);
  const headline = model.kind === 'evaluate' ? 'Evaluate' : 'Write as a single logarithm, then simplify';

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || T.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-5 lg:items-start">
        {/* left: the question, the ladder, the working */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Superscript className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{headline}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {items.length} {T.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> Level {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            <div className="px-4 py-4 text-center text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 overflow-x-auto">
              <SafeBlockMath math={qLatex} />
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={T.stages[s]} active={s === st} done={passed(s)} />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">The power ladder · base {bText}</div>
            <PowerLadder base={base} approx={model.approx} exact={model.evaluates ? want : null} showMarker={showMarker} argText={argText} />
          </div>

          {working.length > 1 && !itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 overflow-x-auto">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Working so far</div>
              {working.map((l, i) => <div key={i} className="text-lg py-0.5"><SafeInlineMath math={l} /></div>)}
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              {st === 'rewrite' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Which power question is this log asking?</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <SafeInlineMath math={`${logLatex(base, model.argLatex)} = x`} /> — the little number is the base. The answer to a log is always a power.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((o) => {
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-sky-500';
                      if (locked && o.correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                      else if (picked === o.id && !o.correct) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600';
                      else if (locked) style = 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
                      return (
                        <button key={o.id} disabled={locked} onClick={() => pickRewrite(o.id)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-xl transition-all ${style}`}>
                          <SafeInlineMath math={o.latex} />
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => setPicked('right'))} onContinue={advance} />
                </>
              )}

              {st === 'numbers' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Write the number as a log of base {bText}.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    Logs only combine with logs. <SafeInlineMath math={`${logName(base)} ${bText}^{k} = k`} />, so any whole number <SafeInlineMath math="k" /> is <SafeInlineMath math={`${logName(base)}\\left(${bText}^{k}\\right)`} />.
                  </p>
                  <div className="flex flex-col gap-2">
                    {model.numbers.map((nb, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 text-2xl text-slate-900 dark:text-slate-100">
                        <SafeInlineMath math={`${Math.abs(nb.k)} = ${logName(base)}`} />
                        <ValueBox value={typed[`n${i}`]} state={marks[`n${i}`]} disabled={locked || marks[`n${i}`] === 'good'} onEnter={checkNumbers} label={`the number ${Math.abs(nb.k)} as a log`}
                          onChange={(v) => { setTyped((t) => ({ ...t, [`n${i}`]: v })); setMarks((m) => ({ ...m, [`n${i}`]: undefined })); }} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showNumbers} onCheck={checkNumbers} onContinue={advance} />
                </>
              )}

              {st === 'power' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Move each number in front inside, as a power.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <SafeInlineMath math={'m\\log_{a} x = \\log_{a} x^{m}'} />. A power of <SafeInlineMath math={'\\tfrac{1}{2}'} /> is a square root. Leave any minus sign outside.
                  </p>
                  <div className="flex flex-col gap-2">
                    {model.powers.map((p, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 text-2xl text-slate-900 dark:text-slate-100">
                        <SafeInlineMath math={`${p.sign < 0 ? '-' : ''}${ratLatex(p.abs)}${logLatex(base, ratLatex(p.arg))} = ${p.sign < 0 ? '-' : ''}${logName(base)}`} />
                        <ValueBox value={typed[`p${i}`]} state={marks[`p${i}`]} disabled={locked || marks[`p${i}`] === 'good'} onEnter={checkPower} label={`inside the log, term ${i + 1}`}
                          onChange={(v) => { setTyped((t) => ({ ...t, [`p${i}`]: v })); setMarks((m) => ({ ...m, [`p${i}`]: undefined })); }} />
                      </div>
                    ))}
                  </div>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={showPower} onCheck={checkPower} onContinue={advance} />
                </>
              )}

              {st === 'combine' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Combine them into one log.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    <span className="text-slate-700 dark:text-slate-200">+</span> log: multiply inside · <span className="text-slate-700 dark:text-slate-200">−</span> log: divide by it. Type the number inside — a fraction is fine.
                  </p>
                  <div className="text-2xl text-slate-900 dark:text-slate-100 mb-2 overflow-x-auto">
                    <SafeInlineMath math={`${plainLatex(base, model.plain)} =`} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${logName(base)}\\Big(`} />
                    <ValueBox value={typed.v} state={marks.v} disabled={locked} onEnter={checkCombine} label="the number inside the single log" width="w-28"
                      onChange={(v) => { setTyped({ v }); setMarks({}); }} />
                    <SafeInlineMath math={'\\Big)'} />
                  </div>
                  {locked && (
                    <div className="mt-3 text-lg text-slate-700 dark:text-slate-200 overflow-x-auto">
                      <SafeInlineMath math={`${rawCombineLatex(base, model.plain)} = ${logLatex(base, ratLatex(model.value))}`} />
                    </div>
                  )}
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ v: typedForm(model.value) }); setMarks({ v: 'shown' }); })} onCheck={checkCombine} onContinue={advance} />
                </>
              )}

              {st === 'decide' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    Is <SafeInlineMath math={currentLatex} /> an exact number?
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    It is exactly when <span className="font-mono">{argText}</span> is a power of {bText} — look for it on the ladder.
                  </p>
                  <Choices options={[[true, `Yes — a power of ${bText}`], [false, 'No — leave it as a log']]} locked={locked} picked={picked} right={model.evaluates} onPick={pickDecide} />
                  <button onClick={() => setPowersOpen((p) => !p)} className="mt-3 text-xs font-black uppercase tracking-widest text-sky-700 dark:text-sky-300 hover:underline">
                    {powersOpen ? 'Hide' : 'Show'} the powers of {bText}
                  </button>
                  {powersOpen && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {Array.from({ length: rungHi - rungLo + 1 }, (_, i) => rungLo + i).map((j) => (
                        <span key={j} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-slate-600 dark:text-slate-300">{bText}^{j} = {rungText(base, j)}</span>
                      ))}
                    </div>
                  )}
                  <Message msg={msg} />
                  {locked && <Actions locked onContinue={advance} />}
                </>
              )}

              {st === 'exponent' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">Write {argText} as a power of {bText}.</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    That power is the log: if <SafeInlineMath math={`${nLatex} = ${bText}^{k}`} /> then <SafeInlineMath math={`${currentLatex} = k`} />.
                  </p>
                  <div className="flex flex-wrap items-center gap-1 text-3xl text-slate-900 dark:text-slate-100">
                    <SafeInlineMath math={`${nLatex} = ${bText}`} />
                    <span className="relative -top-4"><ValueBox value={typed.k} state={marks.k} disabled={locked} onEnter={checkExponent} label="the power" width="w-20"
                      onChange={(v) => { setTyped({ k: v }); setMarks({}); }} /></span>
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-400">{TYPE_HINT}</p>
                  <Message msg={msg} />
                  <Actions locked={locked} onShow={() => showMe(() => { setTyped({ k: typedForm(want) }); setMarks({ k: 'shown' }); })} onCheck={checkExponent} onContinue={advance} />
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
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-lg overflow-x-auto">
                  {working.map((l, i) => <div key={i} className="py-0.5"><SafeInlineMath math={l} /></div>)}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(2,132,199,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Answer</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={logAnswerLatex(model)} /></div>
                </div>
                {!model.evaluates && (
                  <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    On a calculator this is about {model.approx.toFixed(3)} — a number between {between} and {between + 1}, just not an exact one. An exact answer stays as a log.
                  </p>
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
