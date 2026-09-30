import { useMemo, useState } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, ListChecks,
  Signpost, Split, ArrowDownToLine, Calculator, Combine, Undo2, Replace, X as Times, Variable, SquareFunction,
  Filter, ArrowLeftRight, Superscript, Equal, PenLine, Ban, BadgeCheck, Info,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import ExpCurve from '../components/math/ExpCurve.jsx';
import { modelOf, workingOf } from '../utils/expEquations';

/* ------------------------------------------------------------------ *
 * EXP LAB — one screen, three tasks (the registry passes `mode`):
 *
 *   logs   "Take Logs"         a^(px+q) = b, a different base on each side,
 *                              e^(…) = k and ln(…) = k. Name the first move,
 *                              bring the power down (or undo the log), then
 *                              work it out to 3 s.f. or pick the exact form.
 *   quad   "Hidden Quadratic"  substitute y = a^x, type the quadratic, find
 *                              y, KEEP OR REJECT each value (a power of a
 *                              positive number is never zero or negative),
 *                              then turn what is kept back into x. The curve
 *                              y = a^x is drawn with each value as a line.
 *   exact  "Undo It"           e^(ln a) = a and ln(e^n) = n: exact values
 *                              and equations, no calculator.
 *
 * Reads unit.takeLogs / hiddenQuad / undoIt:
 *   { title, intro, levels: { 1: 'name', … }, items: [ … ] }
 * Item shapes are at the top of src/utils/expEquations.js, which derives every
 * stage, every option and what is wrong with it, every answer and the working.
 * This file only renders the three kinds of stage it is handed: a choice, a
 * row of typed boxes, and keep-or-reject rows.
 *
 * The same rules as every ADD_MATH engine: a stage rail, one stage at a time,
 * Check and Show me on each, a second wrong answer fills the stage in and the
 * item pays half (keep-or-reject gets one try), and a finished item prints its
 * working under "Copy this into your book". It checkpoints after every item
 * (onProgress) and resumes on the first unfinished one.
 * ------------------------------------------------------------------ */

const THEME = {
  logs: { ink: '#7c3aed', dark: '#5b21b6', soft: 'rgba(124,58,237,0.08)', icon: Superscript, title: 'Take Logs' },
  quad: { ink: '#be185d', dark: '#9d174d', soft: 'rgba(190,24,93,0.07)', icon: Variable, title: 'Hidden Quadratic' },
  exact: { ink: '#b45309', dark: '#92400e', soft: 'rgba(180,83,9,0.08)', icon: Undo2, title: 'Undo It' },
};
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
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
  fillIn: 'The answer is filled in for you.',
  soFar: 'Working so far',
  answer: 'Answer',
  checkIt: 'Check it',
  hints: 'Each power in terms of y',
  decideAll: 'Decide keep or reject for every value first.',
  keep: 'Keep',
  reject: 'Reject',
  curve: 'Why some values of y are rejected',
};

const STAGE_ICON = {
  move: Signpost, isolate: Split, down: ArrowDownToLine, answer: Calculator, collect: Combine, undo: Undo2,
  sub: Replace, multiply: Times, rewrite: Variable, roots: SquareFunction, keep: Filter, convert: ArrowLeftRight,
  inside: Superscript, value: Equal, simplify: Undo2,
};

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/* ------------------------------------------------------------------ pieces */

function StagePill({ icon: Icon, label, active, done, ink }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
      ${done ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
        : active ? 'text-white border-transparent' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
      style={active && !done ? { backgroundColor: ink } : undefined}>
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
  const Icon = msg.ok ? CheckCircle2 : msg.info ? Info : msg.shown ? Lightbulb : XCircle;
  return (
    <div role="status" className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={3} />
      <span>{msg.text}</span>
    </div>
  );
}

/** One typed value: a whole number, a negative, a decimal or a fraction a/b. */
function ValueBox({ value, onChange, onEnter, state, disabled, label, width = 'w-24' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      inputMode="text"
      aria-label={label}
      onChange={(e) => onChange(e.target.value.replace(/[−–]/g, '-').replace(/[^\d\-/.]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      className={`${width} px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-slate-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** A line of working: KaTeX, or a sentence with an optional piece of maths after it. */
function Line({ line, className = '' }) {
  if (typeof line === 'string') return <div className={`py-0.5 ${className}`}><SafeInlineMath math={line} /></div>;
  return (
    <div className={`py-0.5 text-sm sm:text-base font-bold leading-snug ${className}`}>
      {line.text}{line.tex && <> <SafeInlineMath math={line.tex} /></>}
    </div>
  );
}

function ChoiceStage({ stage, picked, wrongPicks, nudged, locked, onPick }) {
  const two = stage.columns === 2;
  return (
    <div className={`grid gap-2 ${two ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
      {stage.options.map((o) => {
        const isPicked = picked === o.id;
        let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-slate-400';
        if (locked) {
          if (isPicked) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
          else if (wrongPicks.includes(o.id)) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600';
          else style = 'opacity-45 border-slate-200 dark:border-slate-700 text-slate-400';
        } else if (wrongPicks.includes(o.id)) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600';
        else if (nudged === o.id) style = 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-700 dark:text-amber-200';
        return (
          <button key={o.id} data-opt={o.id} disabled={locked} onClick={() => onPick(o)}
            className={`text-left rounded-xl border-2 border-b-[4px] px-3 py-2.5 transition-all ${o.tex ? 'text-lg' : 'text-sm font-black'} ${style}`}>
            {o.tex ? <span className="overflow-x-auto block"><SafeInlineMath math={o.tex} /></span> : o.text}
            {locked && isPicked && <span className="sr-only"> (right)</span>}
          </button>
        );
      })}
    </div>
  );
}

function TypedStage({ stage, typed, marks, locked, onType, onEnter }) {
  return (
    <div className="flex flex-col gap-2">
      {stage.rows.map((row, ri) => (
        <div key={ri} className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
          {row.map((part, pi) => {
            if (part.tex) return <SafeInlineMath key={pi} math={part.tex} />;
            const box = (
              <ValueBox key={pi} value={typed[part.box]} state={marks[part.box]} disabled={locked || marks[part.box] === 'good'}
                onEnter={onEnter} label={part.box} width={part.width}
                onChange={(v) => onType(part.box, v)} />
            );
            return part.sup ? <span key={pi} className="relative -top-4">{box}</span> : box;
          })}
        </div>
      ))}
    </div>
  );
}

function KeepStage({ stage, keeps, missed, locked, onChoose }) {
  return (
    <div className="flex flex-col gap-2">
      {stage.rows.map((r) => {
        // Once the answer is filled in, the student's own wrong pick stays red.
        const choice = locked && missed[r.key] ? missed[r.key] : keeps[r.key];
        const right = r.keep ? 'keep' : 'reject';
        return (
          <div key={r.key} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 min-w-[7rem]"><SafeInlineMath math={r.tex} /></span>
              <div className="ml-auto flex gap-2">
                {['keep', 'reject'].map((k) => {
                  const on = choice === k;
                  let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400';
                  if (locked && k === right) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                  else if (locked && on) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600';
                  else if (on) style = k === 'keep' ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-slate-700 border-slate-900 text-white';
                  return (
                    <button key={k} data-keep={`${r.key}:${k}`} disabled={locked} onClick={() => onChoose(r.key, k)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-b-[4px] text-xs font-black uppercase tracking-widest transition-all ${style}`}>
                      {k === 'keep' ? <BadgeCheck className="w-4 h-4" strokeWidth={3} /> : <Ban className="w-4 h-4" strokeWidth={3} />}
                      {k === 'keep' ? T.keep : T.reject}
                    </button>
                  );
                })}
              </div>
            </div>
            {locked && <p className={`mt-1.5 text-sm font-bold leading-snug ${r.keep ? 'text-[#3e7500] dark:text-lime-300' : 'text-rose-600 dark:text-rose-300'}`}>{r.why}</p>}
          </div>
        );
      })}
    </div>
  );
}

function Actions({ locked, onShow, onCheck, onContinue }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.stuck}
          </button>
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{T.check}</button>}
        </>
      ) : (
        // Focused as it appears, so the Enter that checked the answer also moves on.
        <button autoFocus onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ the task */

export default function ExpLab({ pool, mode = 'logs', onComplete, onQuit, savedData = {}, onProgress }) {
  const theme = THEME[mode] || THEME.logs;
  const ink = theme.ink;
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id), [pool]);

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
  const [wrongPicks, setWrongPicks] = useState([]);
  const [nudged, setNudged] = useState(null);
  const [keeps, setKeeps] = useState({});
  const [keepMissed, setKeepMissed] = useState({});

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return modelOf(mode, item); } catch { return null; }
  }, [item, mode]);

  if (!items.length || !model || !model.stages?.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: ink }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: ink, borderColor: theme.dark }}>Return to Dashboard</button>
      </div>
    );
  }

  const stages = model.stages;
  const stage = itemDone ? null : stages[stageIdx];
  const HeadIcon = theme.icon;

  /* ---------------------------------------------------------- flow */
  const resetStage = () => {
    setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({});
    setPicked(null); setWrongPicks([]); setNudged(null); setKeeps({}); setKeepMissed({});
  };
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const completeItem = () => {
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    resetStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const advance = () => {
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    completeItem();
  };
  const goNext = () => {
    setPos((p) => p + 1); setStageIdx(0);
    setHelped(false); setSlipped(false); setItemDone(false); resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- answering */
  const pass = (text) => { setLocked(true); setMsg({ ok: true, text: text || 'Right.' }); };
  const goodText = (id) => (typeof stage.good === 'function' ? stage.good(id) : stage.good);

  const reveal = () => {
    if (stage.kind === 'choice') {
      setPicked(stage.options.find((o) => o.ok)?.id ?? null);
    } else if (stage.kind === 'typed') {
      setTyped({ ...stage.fill });
      setMarks((m) => Object.fromEntries(Object.keys(stage.fill).map((k) => [k, m[k] === 'good' ? 'good' : 'shown'])));
    } else {
      setKeeps(Object.fromEntries(stage.rows.map((r) => [r.key, r.keep ? 'keep' : 'reject'])));
    }
  };
  /** A wrong answer: say why; the last allowed try fills the stage in. */
  const miss = (why) => {
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= (stage.tries || 2)) {
      reveal(); setLocked(true); setHelped(true);
      setMsg({ shown: true, text: `${why} ${T.fillIn}` });
    } else setMsg({ ok: false, text: why });
  };
  const showMe = () => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, text: T.shown }); };

  const pick = (o) => {
    if (locked) return;
    if (o.ok) { setPicked(o.id); pass(goodText(o.id)); return; }
    if (o.nudge) { setNudged(o.id); setMsg({ info: true, text: o.why }); return; }
    setWrongPicks((w) => (w.includes(o.id) ? w : [...w, o.id]));
    miss(o.why);
  };

  const check = () => {
    if (locked || !stage) return;
    if (stage.kind === 'typed') {
      const res = stage.judge(typed);
      if (res.invalid) { setMsg({ ok: false, text: res.why }); return; }
      if (res.marks) {
        setMarks((m) => {
          const next = { ...m };
          for (const [k, v] of Object.entries(res.marks)) if (v !== undefined) next[k] = v ? 'good' : (res.nudge ? undefined : 'bad');
          return next;
        });
      }
      if (res.ok) { pass(res.note || goodText()); return; }
      if (res.nudge) { setMsg({ info: true, text: res.why }); return; }
      miss(res.why);
    } else if (stage.kind === 'keep') {
      if (stage.rows.some((r) => !keeps[r.key])) { setMsg({ ok: false, text: T.decideAll }); return; }
      const wrong = stage.rows.find((r) => (keeps[r.key] === 'keep') !== r.keep);
      if (!wrong) { pass(goodText()); return; }
      setKeepMissed(Object.fromEntries(stage.rows.filter((r) => (keeps[r.key] === 'keep') !== r.keep).map((r) => [r.key, keeps[r.key]])));
      miss(wrong.why);
    }
  };

  const type = (key, v) => {
    setTyped((t) => ({ ...t, [key]: v }));
    setMarks((m) => (m[key] === 'bad' ? { ...m, [key]: undefined } : m));
    if (msg && !msg.ok && !msg.shown) setMsg(null);
  };
  const choose = (key, k) => {
    setKeeps((s) => ({ ...s, [key]: k }));
    if (msg && !msg.ok) setMsg(null);
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelName = item.level !== undefined ? pool?.levels?.[item.level] : null;
  const passedCount = itemDone ? stages.length : stageIdx + (locked ? 1 : 0);
  const working = workingOf(model, passedCount);
  const allWorking = workingOf(model);
  const keepIdx = stages.findIndex((s) => s.kind === 'keep');
  const convertIdx = stages.findIndex((s) => s.id === 'convert');
  const showLines = model.figure && keepIdx !== -1 && (itemDone || stageIdx > keepIdx || (stageIdx === keepIdx && locked));
  const showX = !!model.figure && (itemDone || (convertIdx !== -1 && (stageIdx > convertIdx || (stageIdx === convertIdx && locked))));
  const showHints = stage?.hints?.length && (wrongs > 0 || locked);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || theme.title} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the working so far. Pinned from lg, and
            scrollable on its own if a long working outgrows the screen. */}
        <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: ink }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: ink }}>
              <HeadIcon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{model.head}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {items.length} {T.solved}</div>
            </div>
            {levelName && (
              <div className="px-4 pt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: theme.dark }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> Level {item.level}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>
              </div>
            )}
            <div className="px-4 py-3 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
              <SafeBlockMath math={model.questionLatex} />
            </div>
            {model.givenTex && (
              <p className="px-4 -mt-2 pb-2 text-center text-sm font-bold text-slate-600 dark:text-slate-300">
                Use the substitution <SafeInlineMath math={model.givenTex} />.
              </p>
            )}
            <div className="px-4 pb-2 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 text-xs font-black text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                <PenLine className="w-3.5 h-3.5" strokeWidth={3} style={{ color: ink }} /> {model.register}
              </span>
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s, i) => (
                  <StagePill key={s.id} icon={STAGE_ICON[s.id] || ListChecks} label={s.label} ink={ink}
                    active={i === stageIdx} done={i < stageIdx || (i === stageIdx && locked)} />
                ))}
              </div>
            )}
          </div>

          {!itemDone && working.length > 1 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 overflow-x-auto">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{T.soFar}</div>
              {working.map((l, i) => <Line key={i} line={l} className="text-lg" />)}
            </div>
          )}

        </div>

        {/* right: the stage, or the finished working — and the picture under it */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {stage && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              <div className="font-black text-slate-800 dark:text-slate-100 text-lg leading-snug">{stage.title}</div>
              {stage.sub && <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{stage.sub}</p>}
              {(stage.show || []).length > 0 && (
                <div className="mt-2 mb-1 text-xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                  {stage.show.map((l, i) => <Line key={i} line={l} />)}
                </div>
              )}
              <div className="mt-3">
                {stage.kind === 'choice' && (
                  <ChoiceStage stage={stage} picked={picked} wrongPicks={wrongPicks} nudged={nudged} locked={locked} onPick={pick} />
                )}
                {stage.kind === 'typed' && (
                  <TypedStage stage={stage} typed={typed} marks={marks} locked={locked} onType={type} onEnter={check} />
                )}
                {stage.kind === 'keep' && (
                  <KeepStage stage={stage} keeps={keeps} missed={keepMissed} locked={locked} onChoose={choose} />
                )}
              </div>
              {showHints ? (
                <div className="mt-3 rounded-xl border-2 border-dashed p-3 text-slate-800 dark:text-slate-100" style={{ borderColor: ink, backgroundColor: theme.soft }}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{T.hints}</div>
                  {stage.hints.map((h, i) => <Line key={i} line={h} className="text-base" />)}
                </div>
              ) : null}
              {locked && (stage.after || []).length > 0 && (
                <div className="mt-3 text-lg text-slate-800 dark:text-slate-100 overflow-x-auto">
                  {stage.after.map((l, i) => <Line key={i} line={l} />)}
                </div>
              )}
              <Message msg={msg} />
              <Actions locked={locked} onShow={showMe} onCheck={stage.kind === 'choice' ? null : check} onContinue={advance} />
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
                  {allWorking.map((l, i) => <Line key={i} line={l} />)}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: ink, backgroundColor: theme.soft }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: ink }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{T.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={model.answerLatex} /></div>
                </div>
                {(model.checkLines || []).length > 0 && (
                  <div className="mt-3 rounded-xl border-2 p-3 text-slate-800 dark:text-slate-100" style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.08)' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{T.checkIt}</div>
                    <div className="overflow-x-auto">{model.checkLines.map((l, i) => <Line key={i} line={l} />)}</div>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button autoFocus onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: ink, borderColor: theme.dark }}>
                    {isLast ? T.finish : T.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {showLines && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm p-3">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{T.curve}</div>
              <ExpCurve base={model.figure.base} baseText={model.figure.baseTex} candidates={model.figure.candidates} showLines showX={showX} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
