import { useMemo, useState } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, ListChecks, TrendingUp, Ban,
  Hash, ArrowLeftRight, Scale, Superscript, Combine, Unlink, Variable, ShieldCheck, ArrowDownToLine, RefreshCw,
  Target, Undo2, Search, Divide, Calculator, Sparkles, Link, Sigma,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import { modelOf, workingLines } from '../utils/logEquations';

/* ------------------------------------------------------------------ *
 * LOG EQUATION LAB — one screen, three tasks (the registry passes `mode`):
 *
 *   eq    "Log Equation Solver"  combine each side into one log (power law
 *                                first), remove the logs, solve — then CHECK
 *                                EVERY ROOT: the app works out what goes
 *                                inside each log of the ORIGINAL equation
 *                                (or what the base would be) and the student
 *                                keeps or rejects each root. A strip then
 *                                shows where every log exists, and where
 *                                each root landed.
 *   quad  "Quadratic in a Log"   bring a power down, turn an upside-down log
 *                                over, let u = log x, solve for u, go back.
 *   base  "Change of Base"       evaluate with lg, swap the base and the
 *                                number, related bases, one log from two, a
 *                                chain of logs, two related bases in one
 *                                equation.
 *
 * Reads unit.logEq / logQuad / baseChange:
 *   { title, intro, levels: { 1: 'name', … }, items: [ … ] }
 * Item shapes are at the top of src/utils/logEquations.js, which derives
 * EVERY stage — its options, boxes, marking and wrong-answer messages — as
 * one of three generic kinds this screen draws: pick, fill, keep.
 *
 * The same rules as every ADD_MATH engine: one stage at a time, Check and
 * Show me on each; a wrong answer can be retried, a second one (or Show me)
 * fills the stage in and the item then pays half; a keep/reject decision
 * gets one try. A finished item prints its working under "Copy this into
 * your book". Progress is checkpointed after every item.
 * ------------------------------------------------------------------ */

const INK = '#6d28d9';
const INK_DARK = '#4c1d95';
const GREEN = '#58cc02';
const RED = '#e11d48';
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
  soFar: 'Working so far',
  fill: 'Fill in every box first.',
  decide: 'Decide keep or reject for every root first.',
  shown: 'Here it is. Read it, then continue.',
  filled: 'The answer is filled in for you.',
  marked: 'The right line is marked.',
  keep: 'Keep',
  reject: 'Reject',
  answer: 'Answer',
};

const STAGE_ICON = {
  evaluate: Hash, rebase: ArrowLeftRight, collect: Scale, power: Superscript, combine: Combine, remove: Unlink,
  tidy: Sigma, solve: Pencil, check: ShieldCheck, down: ArrowDownToLine, swap: RefreshCw, sub: Variable,
  roots: Target, back: Undo2, bracket: Search, rule: Divide, value: Calculator, parts: Hash, simplify: Sparkles,
  chain: Link,
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

/** The keys a fill stage asks for, in the order they appear. */
const keysOf = (stage) => (stage.rows || []).flat().filter((p) => p.box || p.choose).map((p) => p.box || p.choose);

/* ------------------------------------------------------------------ small pieces */

/** A sentence with an optional piece of maths and an optional tail: { text, tex, after } or a plain string. */
function Rich({ value }) {
  if (!value) return null;
  if (typeof value === 'string') return <>{value}</>;
  return (
    <>
      {value.text}
      {value.tex && <> <SafeInlineMath math={value.tex} /></>}
      {value.after && <> {value.after}</>}
    </>
  );
}

/** One line of working: a KaTeX string, or a sentence (which can wrap; KaTeX \text cannot). */
function WorkLine({ line }) {
  if (typeof line === 'string') return <div className="py-0.5 overflow-x-auto overflow-y-hidden"><SafeInlineMath math={line} /></div>;
  return <div className="py-0.5 text-sm sm:text-base font-bold leading-snug"><Rich value={line} /></div>;
}

function StagePill({ icon: Icon, label, active, done }) {
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
  if (!msg?.body) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.nudge ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.nudge ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span><Rich value={msg.body} />{msg.tail && <> {msg.tail}</>}</span>
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
        // Focused as it appears, so the Enter that checked the answer also moves on.
        <button autoFocus onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn} flex items-center gap-1.5`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {T.cont} <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/** A box for a whole number, a negative, a fraction like 3/2, or a decimal. */
function ValueBox({ value, onChange, onEnter, state, disabled, label, width = 'w-20' }) {
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
      className={`${width} px-1.5 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** A row of maths chips, one to pick: the answer to a box that cannot be typed (a surd). */
function Chips({ options, value, onPick, state, disabled }) {
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = value === o.id;
        const tone = on ? (RING[state] || 'border-violet-500 bg-violet-50 dark:bg-violet-900/30') : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-violet-400';
        return (
          <button key={o.id} type="button" disabled={disabled} onClick={() => onPick(o.id)}
            className={`px-3 py-1.5 rounded-xl border-2 border-b-[4px] text-lg text-slate-800 dark:text-slate-100 transition-all disabled:opacity-80 ${tone}`}>
            <SafeInlineMath math={o.tex} />
          </button>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ the domain strip */

/**
 * Where every log of the equation exists — the green band — with each root
 * marked where it landed. A kept root sits in the band; a rejected one is
 * outside it. Drawn once the roots have been decided.
 */
function DomainStrip({ domain, candidates }) {
  const xs = candidates.map((c) => c.x[0] / c.x[1]);
  const lo = domain.lo ? domain.lo[0] / domain.lo[1] : null;
  const hi = domain.hi ? domain.hi[0] / domain.hi[1] : null;
  const pts = [...xs, ...(lo !== null ? [lo] : []), ...(hi !== null ? [hi] : []), 0];
  let min = Math.floor(Math.min(...pts) - 1.5);
  let max = Math.ceil(Math.max(...pts) + 1.5);
  while (max - min < 8) { min -= 1; max += 1; }
  const W = 520;
  const H = 96;
  const padX = 22;
  const axisY = 62;
  const X = (v) => padX + ((v - min) / (max - min)) * (W - 2 * padX);
  const step = max - min > 24 ? 5 : max - min > 12 ? 2 : 1;
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
  const bandLo = lo !== null ? X(lo) : padX - 6;
  const bandHi = hi !== null ? X(hi) : W - padX + 6;
  const fmt = (v) => (Number.isInteger(v) ? `${v}`.replace('-', '−') : `${Number(v.toFixed(2))}`.replace('-', '−'));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Every log exists when ${domain.text}`}>
      <rect x="0" y="0" width={W} height={H} rx="12" fill="#ffffff" />
      {!domain.empty && <rect x={bandLo} y={axisY - 9} width={Math.max(bandHi - bandLo, 0)} height="18" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />}
      <line x1={padX - 8} y1={axisY} x2={W - padX + 8} y2={axisY} stroke="#334155" strokeWidth="2" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={axisY - 4} x2={X(v)} y2={axisY + 4} stroke="#334155" strokeWidth="1.5" />
          <text x={X(v)} y={axisY + 20} textAnchor="middle" fontFamily="ui-monospace, Consolas, monospace" fontSize="11" fontWeight="700" fill="#64748b">{fmt(v)}</text>
        </g>
      ))}
      {!domain.empty && lo !== null && <circle cx={X(lo)} cy={axisY} r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" />}
      {!domain.empty && hi !== null && <circle cx={X(hi)} cy={axisY} r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" />}
      {domain.hole && <circle cx={X(domain.hole[0] / domain.hole[1])} cy={axisY} r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" />}
      {candidates.map((c, i) => {
        const cx = X(xs[i]);
        const color = c.keep ? '#16a34a' : RED;
        return (
          <g key={i}>
            <line x1={cx} y1={axisY - 12} x2={cx} y2={30} stroke={color} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx={cx} cy={axisY} r="6.5" fill={color} stroke="#ffffff" strokeWidth="2" />
            <text x={cx} y={22} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="900" fill={color}>{`x = ${c.xText} ${c.keep ? '✓' : '✗'}`}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ the three stage cards */

function PickCard({ stage, picked, wrongIds, locked, onPick }) {
  const wide = stage.options.some((o) => (o.tex || o.text || '').length > 34);
  return (
    <div className={`grid gap-2 ${wide ? '' : 'sm:grid-cols-2'}`}>
      {stage.options.map((o) => {
        let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-violet-500';
        if (locked && o.ok) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
        else if (wrongIds.includes(o.id)) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
        else if (locked) style = 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
        return (
          <button key={o.id} disabled={locked || wrongIds.includes(o.id)} onClick={() => onPick(o)}
            className={`rounded-xl border-2 border-b-[4px] px-3 py-3 transition-all overflow-x-auto ${o.tex ? 'text-xl' : 'text-sm font-black'} ${style} ${picked === o.id && !locked ? 'ring-2 ring-violet-400' : ''}`}>
            {o.tex ? <SafeInlineMath math={o.tex} /> : o.text}
          </button>
        );
      })}
    </div>
  );
}

function FillCard({ stage, typed, marks, locked, onType, onEnter }) {
  return (
    <div className="flex flex-col gap-2">
      {stage.rows.map((row, r) => (
        <div key={r} className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2 text-xl text-slate-900 dark:text-slate-100">
          {row.map((p, i) => {
            if (p.tex) return <SafeInlineMath key={i} math={p.tex} />;
            if (p.text) return <span key={i} className="text-sm font-bold">{p.text}</span>;
            if (p.choose) {
              return <Chips key={i} options={p.options} value={typed[p.choose]} state={marks[p.choose]} disabled={locked || marks[p.choose] === 'good'} onPick={(id) => onType(p.choose, id)} />;
            }
            const box = (
              <ValueBox key={i} value={typed[p.box]} state={marks[p.box]} disabled={locked} onEnter={onEnter} label={`answer box ${p.box}`}
                width={p.width || (p.sup ? 'w-14' : 'w-20')} onChange={(v) => onType(p.box, v)} />
            );
            return p.sup ? <span key={i} className="relative -top-4 -ml-1">{box}</span> : box;
          })}
        </div>
      ))}
      {stage.hint && <p className="text-xs font-bold text-slate-400">{stage.hint}</p>}
    </div>
  );
}

function KeepCard({ stage, choices, decided, onChoose }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stage.candidates.map((c, i) => {
        const pick = choices[i];
        const want = c.keep ? 'keep' : 'reject';
        const border = decided ? (c.keep ? 'border-[#58a700] bg-[#d7ffb8]/40 dark:bg-lime-900/20' : 'border-rose-400 bg-rose-50/60 dark:bg-rose-900/10') : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60';
        return (
          <div key={i} className={`rounded-xl border-2 p-3 ${border}`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Try x = {c.xText}</div>
            <div className="flex flex-col gap-1">
              {c.rows.map((row, j) => (
                <div key={j} className="flex flex-wrap items-center gap-x-2 text-base text-slate-800 dark:text-slate-100">
                  {row.inside ? (
                    <>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">inside</span>
                      <SafeInlineMath math={row.name} />
                      <span className="text-slate-400 font-black">·</span>
                    </>
                  ) : <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{row.name}</span>}
                  <span className={decided ? (row.ok ? 'text-[#3e7500] dark:text-lime-300' : 'text-rose-600 dark:text-rose-300') : ''}><SafeInlineMath math={row.tex} /></span>
                  {decided && (row.ok ? <CheckCircle2 className="w-4 h-4 text-[#58a700]" strokeWidth={3} /> : <Ban className="w-4 h-4 text-rose-500" strokeWidth={3} />)}
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {['keep', 'reject'].map((k) => {
                const on = pick === k;
                const good = decided && k === want;
                return (
                  <button key={k} disabled={decided} onClick={() => onChoose(i, k)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 border-b-[4px] text-xs font-black uppercase tracking-widest transition-all
                      ${good ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200'
                        : on ? (k === 'keep' ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-slate-700 border-slate-900 text-white')
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                    {k === 'keep' ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <Ban className="w-4 h-4" strokeWidth={3} />}
                    {k === 'keep' ? T.keep : T.reject}
                  </button>
                );
              })}
            </div>
            {decided && (
              <div className={`mt-2 text-xs font-bold leading-snug ${c.keep ? 'text-[#3e7500] dark:text-lime-300' : 'text-rose-600 dark:text-rose-300'}`}>
                <Rich value={c.why} />
                {c.sides && <div className="mt-1 text-slate-700 dark:text-slate-200">{c.sides}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ the task */

export default function LogEqLab({ pool, mode = 'eq', onComplete, onQuit, savedData = {}, onProgress }) {
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
  const [msg, setMsg] = useState(null);            // { body, ok?, shown?, nudge?, tail? }
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [picked, setPicked] = useState(null);
  const [wrongIds, setWrongIds] = useState([]);
  const [choices, setChoices] = useState({});

  const item = items[pos];
  const model = useMemo(() => {
    if (!item) return null;
    try { return modelOf(mode, item); } catch { return null; }
  }, [item, mode]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No questions yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const stages = model.stages;
  const stage = stages[stageIdx];

  /* ---------------------------------------------------------- flow */
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); setWrongIds([]); setChoices({}); };
  const advance = () => {
    if (stageIdx + 1 < stages.length) { setStageIdx((s) => s + 1); resetStage(); return; }
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    resetStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
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

  /* ---------------------------------------------------------- pick */
  const pickOption = (o) => {
    if (locked) return;
    setPicked(o.id);
    if (o.ok) { setLocked(true); setMsg(stage.good ? { ok: true, body: stage.good } : null); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    setWrongIds((w) => [...w, o.id]);
    // Two wrong picks — or only one wrong option left to try — and it is shown.
    if (n >= 2 || stage.options.length - (wrongIds.length + 1) <= 1) {
      setLocked(true); setHelped(true);
      setMsg({ shown: true, body: o.why, tail: T.marked });
    } else setMsg({ body: o.why });
  };

  /* ---------------------------------------------------------- fill */
  const fillKeys = stage?.type === 'fill' ? keysOf(stage) : [];
  const onType = (key, value) => {
    if (locked) return;
    setTyped((t) => ({ ...t, [key]: value }));
    setMarks((m) => (m[key] === 'bad' ? { ...m, [key]: undefined } : m));
    if (msg && !msg.ok) setMsg(null);
  };
  const revealFill = (kept = {}) => {
    setTyped({ ...stage.answers });
    setMarks(Object.fromEntries(fillKeys.map((k) => [k, kept[k] ? 'good' : 'shown'])));
    setLocked(true);
    setHelped(true);
  };
  const checkFill = () => {
    if (locked) return;
    if (fillKeys.some((k) => !String(typed[k] ?? '').trim())) { setMsg({ nudge: true, body: T.fill }); return; }
    const res = stage.judge(typed);
    if (res.ok) {
      setMarks(Object.fromEntries(fillKeys.map((k) => [k, 'good'])));
      setLocked(true);
      setMsg({ ok: true, body: stage.good || 'Right.' });
      return;
    }
    const mk = Object.fromEntries(fillKeys.map((k) => [k, res.marks?.[k] ? 'good' : 'bad']));
    if (res.nudge) { setMarks(mk); setMsg({ nudge: true, body: res.why }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) { revealFill(res.marks || {}); setMsg({ shown: true, body: res.why, tail: T.filled }); return; }
    setMarks(mk);
    setMsg({ body: res.why });
  };

  /* ---------------------------------------------------------- keep */
  const candidates = stage?.type === 'keep' ? stage.candidates : [];
  const rightChoices = () => Object.fromEntries(candidates.map((c, i) => [i, c.keep ? 'keep' : 'reject']));
  const checkKeep = () => {
    if (locked) return;
    if (candidates.some((_, i) => !choices[i])) { setMsg({ nudge: true, body: T.decide }); return; }
    const ok = candidates.every((c, i) => choices[i] === (c.keep ? 'keep' : 'reject'));
    setLocked(true);
    if (ok) {
      const kept = candidates.filter((c) => c.keep).length;
      const dies = model.unknown ? 'a negative number cannot be the base of a log' : 'the rejected root makes a log that does not exist';
      setMsg({ ok: true, body: kept === candidates.length ? (kept === 1 ? 'Right: the root survives the check.' : 'Right: every root survives the check.') : kept ? `Right: ${dies}.` : 'Right: no root survives, so the equation has no solution.' });
      return;
    }
    setChoices(rightChoices());
    setHelped(true);
    setSlipped(true);
    // Name the first wrong decision, with that root's own reason.
    const miss = candidates.find((c, i) => choices[i] !== (c.keep ? 'keep' : 'reject'));
    const reason = typeof miss.why === 'string' ? { text: miss.why } : miss.why;
    const body = {
      text: `${miss.keep ? `You rejected x = ${miss.xText}, but it passes the check.` : `You kept x = ${miss.xText}, but it fails the check.`} ${reason.text}`,
      tex: reason.tex,
      after: reason.after,
    };
    setMsg({ shown: true, body, tail: 'The right decisions are marked.' });
  };

  /* ---------------------------------------------------------- show me */
  const showMe = () => {
    if (locked) return;
    if (stage.type === 'pick') { setPicked(stage.options.find((o) => o.ok).id); setLocked(true); setHelped(true); setMsg({ shown: true, body: T.shown }); }
    if (stage.type === 'fill') { revealFill(); setMsg({ shown: true, body: T.shown }); }
    if (stage.type === 'keep') { setChoices(rightChoices()); setLocked(true); setHelped(true); setMsg({ shown: true, body: T.shown }); }
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelName = item.level !== undefined ? pool?.levels?.[item.level] : null;
  const soFar = itemDone ? [] : [
    ...model.lines.map((l) => (l.text ? { text: l.text, tex: l.tex } : l.tex)),
    ...stages.slice(0, stageIdx).flatMap((s) => s.out || []),
  ];
  const working = workingLines(model);
  const showDomain = mode === 'eq' && (itemDone || (stage?.type === 'keep' && locked));

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || 'Log Equations'} current={pos + 1} total={items.length} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the working so far */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Superscript className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{model.head}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {items.length} {T.solved}</div>
            </div>
            {levelName && (
              <div className="px-4 pt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> Level {item.level}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>
              </div>
            )}
            <div className="px-4 py-3 text-center text-slate-900 dark:text-slate-100 flex flex-col gap-1">
              {model.lines.map((l, i) => (
                <div key={i} className={l.big ? 'text-xl sm:text-2xl py-1 overflow-x-auto overflow-y-hidden' : 'text-base'}>
                  {l.text && <span className="text-sm font-bold text-slate-500 dark:text-slate-400 mr-1">{l.text}</span>}
                  {l.tex && <SafeInlineMath math={l.tex} />}
                </div>
              ))}
            </div>
            {(item.note || (pos === 0 && pool?.intro)) && (
              <p className="px-4 pb-3 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{item.note || pool.intro}</p>
            )}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s, i) => (
                  <StagePill key={s.id} icon={STAGE_ICON[s.id] || Pencil} label={s.label} active={i === stageIdx} done={i < stageIdx} />
                ))}
              </div>
            )}
          </div>

          {soFar.length > 1 && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 text-lg">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{T.soFar}</div>
              {soFar.map((l, i) => <WorkLine key={i} line={l} />)}
            </div>
          )}
        </div>

        {/* right: the stage, or the finished item */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3">
          {!itemDone && stage && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5">
              <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg leading-snug"><Rich value={stage.title} /></div>
              {stage.sub && <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 leading-relaxed"><Rich value={stage.sub} /></p>}
              {!stage.sub && <div className="mb-3" />}

              {stage.type === 'pick' && <PickCard stage={stage} picked={picked} wrongIds={wrongIds} locked={locked} onPick={pickOption} />}
              {stage.type === 'fill' && <FillCard stage={stage} typed={typed} marks={marks} locked={locked} onType={onType} onEnter={checkFill} />}
              {stage.type === 'keep' && (
                <KeepCard stage={stage} choices={choices} decided={locked}
                  onChoose={(i, k) => { if (!locked) { setChoices((c) => ({ ...c, [i]: k })); setMsg(null); } }} />
              )}

              {locked && stage.out?.length > 0 && (
                <div className="mt-3 rounded-xl border-2 border-violet-200 dark:border-violet-900 bg-violet-50/60 dark:bg-violet-900/10 px-3 py-2 text-lg text-slate-800 dark:text-slate-100">
                  {stage.out.map((l, i) => <WorkLine key={i} line={l} />)}
                </div>
              )}
              {showDomain && (
                <div className="mt-3">
                  <DomainStrip domain={model.domain} candidates={model.candidates} />
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                    {model.domain.empty ? 'No value of x makes every log exist, so no root could ever survive.' : `Every log exists when ${model.domain.text}: the green band.`}
                  </p>
                </div>
              )}

              <Message msg={msg} />
              <Actions locked={locked} onShow={showMe}
                onCheck={stage.type === 'fill' ? checkFill : stage.type === 'keep' ? checkKeep : null}
                onContinue={advance} />
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
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-lg">
                  {working.map((l, i) => <WorkLine key={i} line={l} />)}
                </div>
                {showDomain && (
                  <div className="mt-3">
                    <DomainStrip domain={model.domain} candidates={model.candidates} />
                  </div>
                )}
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(109,40,217,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{T.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={model.answerTex} /></div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button autoFocus onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
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
