import { useState, useMemo, useRef } from 'react';
import {
  CheckCircle2, XCircle, ArrowRight, Trophy, Construction, Eye, Ruler,
  ChevronLeft, ChevronRight, Lightbulb,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { EquationSide } from './chemWidgets';
import { bezierOf, valueAt, deriveAsk, markBoxes, unitChoices, rateUnit, toleranceOf } from '../utils/rateCurve';

/* ------------------------------------------------------------------ *
 * RATE READER — "up from the time, across to the volume."
 *
 * Coursebook spread 9.2 ends with a graph and four things to notice about it;
 * the Chapter 9 checkup then asks for the rate in the first minute, the second,
 * the third, the total, how long it lasted and the average. All of those are
 * READINGS, and this task is a graph with a ruler on it.
 *
 * The student drags the ruler along the time axis. It draws the two dashed
 * lines a careful student draws on paper — up to the curve, across to the
 * axis — and stops there: it never prints the number. Reading the scale is the
 * skill, so the scale is what they read.
 *
 * Every answer is derived from the item's plotted results by
 * src/utils/rateCurve.js. A reading is marked to half a small square. A rate is
 * right if it matches the curve OR if it follows from the student's own two
 * readings, so a reading that is one small square out is not punished twice.
 *
 * Reads a unit's `rateGraph`:
 *   { title, items: [{ id, name, context,
 *       equation: { reactants: 'Zn(s) + H2SO4(aq)', products: 'ZnSO4(aq) + H2(g)' },
 *       quantity: 'hydrogen', limiting: 'zinc', excess: 'sulfuric acid',
 *       x: { label: 'Time', unit: 'min', max: 7, step: 1, minor: 2 },
 *       y: { label: 'Volume of hydrogen', unit: 'cm³', max: 50, step: 10, minor: 5 },
 *       curves: [{ id: 'A', label, points: [[0, 0], [1, 20], …] }],   // one or two
 *       asks: [{ id, kind: 'read', at: 1 }, { id, kind: 'interval', from: 1, to: 2 },
 *              { id, kind: 'average' }, …],
 *       note }] }
 * Ask kinds: read · timeFor · interval · end · total · average · steepest ·
 * compare (what: 'faster' | 'amount') · why.
 *
 * SCORING. Each ask gets two tries before the answer is drawn on the graph. An
 * item's score is the share of its asks cleared without that; XP is the mean
 * over the items, scaled from nativeMax 10. The blob is { itemId: score }.
 * ------------------------------------------------------------------ */

const INK = '#0f766e';
const INK_DARK = '#115e59';
const CURVE = ['#1d4ed8', '#c2410c'];
const GOOD = '#3e7500';
const SHOWN = '#b45309';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all';
const FONT = 'Inter, system-ui, sans-serif';

const num = (s) => {
  const t = String(s ?? '').replace(/[\s,]/g, '').replace(/−/g, '-');
  if (t === '' || !/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  return Number(t);
};
const tidy = (v) => String(Math.round(v * 1000) / 1000);

/* ---- the graph ------------------------------------------------------ */

const W = 600, H = 430;
const PAD = { l: 66, r: 22, t: 22, b: 58 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

function Graph({ item, ruler, onRuler, active, guide }) {
  const svg = useRef(null);
  const drag = useRef(false);
  const { x: ax, y: ay } = item;
  const X = (v) => PAD.l + (v / ax.max) * PW;
  const Y = (v) => PAD.t + PH - (v / ay.max) * PH;
  const snap = toleranceOf(item).x;          // half a small square

  const place = (e) => {
    const box = svg.current.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const v = ((px - PAD.l) / PW) * ax.max;
    onRuler(Math.max(0, Math.min(ax.max, Math.round(v / snap) * snap)));
  };

  const lines = (axis, max, step, minor) => {
    const out = [];
    const small = step / (minor || 1);
    const n = Math.round(max / small);
    for (let i = 0; i <= n; i++) out.push({ v: i * small, major: i % (minor || 1) === 0 });
    return out.map(({ v, major }) => (axis === 'x'
      ? <line key={`x${v}`} x1={X(v)} y1={PAD.t} x2={X(v)} y2={PAD.t + PH} stroke={major ? '#cbd5e1' : '#e8eef5'} strokeWidth={major ? 1.2 : 1} />
      : <line key={`y${v}`} x1={PAD.l} y1={Y(v)} x2={PAD.l + PW} y2={Y(v)} stroke={major ? '#cbd5e1' : '#e8eef5'} strokeWidth={major ? 1.2 : 1} />));
  };
  const ticks = (max, step) => Array.from({ length: Math.round(max / step) + 1 }, (_, i) => Math.round(i * step * 1000) / 1000);

  const pathOf = (points) => {
    const [x0, y0] = points[0];
    return `M ${X(x0)} ${Y(y0)} ` + bezierOf(points)
      .map(([a, b, c]) => `C ${X(a[0])} ${Y(a[1])}, ${X(b[0])} ${Y(b[1])}, ${X(c[0])} ${Y(c[1])}`).join(' ');
  };

  const curveFor = (id) => item.curves.find((c) => c.id === id) || item.curves[0];
  const dashes = (x, points, colour, key, label) => {
    const y = valueAt(points, x);
    return (
      <g key={key} pointerEvents="none">
        <line x1={X(x)} y1={PAD.t + PH} x2={X(x)} y2={Y(y)} stroke={colour} strokeWidth="1.8" strokeDasharray="6 4" />
        <line x1={X(x)} y1={Y(y)} x2={PAD.l} y2={Y(y)} stroke={colour} strokeWidth="1.8" strokeDasharray="6 4" />
        <circle cx={X(x)} cy={Y(y)} r="5.5" fill={colour} stroke="#ffffff" strokeWidth="2" />
        {label && (
          <g>
            <rect x={PAD.l + 4} y={Y(y) - 20} width={String(label).length * 7.4 + 12} height="17" rx="5" fill={colour} />
            <text x={PAD.l + 10} y={Y(y) - 7.5} fontFamily={FONT} fontSize="11.5" fontWeight="800" fill="#ffffff">{label}</text>
          </g>
        )}
      </g>
    );
  };

  const rulerCurve = curveFor(active);

  return (
    <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none touch-none cursor-ew-resize" role="img"
      aria-label={`Graph of ${ay.label.toLowerCase()} against ${ax.label.toLowerCase()}`}
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); place(e); }}
      onPointerMove={(e) => { if (drag.current) place(e); }}
      onPointerUp={() => { drag.current = false; }}
      onPointerCancel={() => { drag.current = false; }}>
      <rect width={W} height={H} rx="14" fill="#ffffff" />
      {lines('x', ax.max, ax.step, ax.minor)}
      {lines('y', ay.max, ay.step, ay.minor)}

      {/* axes */}
      <line x1={PAD.l} y1={PAD.t - 8} x2={PAD.l} y2={PAD.t + PH} stroke="#1e293b" strokeWidth="2" />
      <line x1={PAD.l} y1={PAD.t + PH} x2={PAD.l + PW + 8} y2={PAD.t + PH} stroke="#1e293b" strokeWidth="2" />
      {ticks(ax.max, ax.step).map((v) => (
        <g key={`tx${v}`}>
          <line x1={X(v)} y1={PAD.t + PH} x2={X(v)} y2={PAD.t + PH + 6} stroke="#1e293b" strokeWidth="1.6" />
          <text x={X(v)} y={PAD.t + PH + 21} textAnchor="middle" fontFamily={FONT} fontSize="12.5" fontWeight="700" fill="#334155">{v}</text>
        </g>
      ))}
      {ticks(ay.max, ay.step).map((v) => (
        <g key={`ty${v}`}>
          <line x1={PAD.l - 6} y1={Y(v)} x2={PAD.l} y2={Y(v)} stroke="#1e293b" strokeWidth="1.6" />
          <text x={PAD.l - 10} y={Y(v) + 4.5} textAnchor="end" fontFamily={FONT} fontSize="12.5" fontWeight="700" fill="#334155">{v}</text>
        </g>
      ))}
      <text x={PAD.l + PW / 2} y={H - 12} textAnchor="middle" fontFamily={FONT} fontSize="13" fontWeight="800" fill="#334155">{`${ax.label} / ${ax.unit}`}</text>
      <text x={-(PAD.t + PH / 2)} y="18" transform="rotate(-90)" textAnchor="middle" fontFamily={FONT} fontSize="13" fontWeight="800" fill="#334155">{`${ay.label} / ${ay.unit}`}</text>

      {/* the results */}
      {item.curves.map((c, i) => (
        <g key={c.id} pointerEvents="none">
          <path d={pathOf(c.points)} fill="none" stroke={CURVE[i]} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {c.points.map(([x, y]) => <circle key={x} cx={X(x)} cy={Y(y)} r="3.2" fill={CURVE[i]} />)}
          {item.curves.length > 1 && (() => {
            // The label sits on the flat part, above its own line, clear of the other curve.
            const last = c.points[c.points.length - 1];
            const other = item.curves[1 - i].points;
            const above = last[1] >= other[other.length - 1][1];
            return (
              <text x={X(ax.max) - 4} y={Y(last[1]) + (above ? -9 : 19)} textAnchor="end" fontFamily={FONT} fontSize="12.5" fontWeight="800" fill={CURVE[i]}>{c.label}</text>
            );
          })()}
        </g>
      ))}

      {/* the answer, drawn once it is known */}
      {guide && guide.xs.map((x, i) => {
        const pts = curveFor(guide.curve).points;
        return dashes(x, pts, guide.colour, `g${i}`, `${tidy(x)} ${ax.unit} · ${tidy(valueAt(pts, x))} ${ay.unit}`);
      })}

      {/* the student's ruler */}
      {!guide && ruler != null && dashes(ruler, rulerCurve.points, '#475569', 'ruler')}
      {!guide && ruler != null && (
        <path d={`M ${X(ruler)} ${PAD.t + PH + 4} l -7 12 l 14 0 z`} fill="#475569" pointerEvents="none" />
      )}
    </svg>
  );
}

/* ---- the task ------------------------------------------------------ */

const blank = () => ({ typed: {}, unit: null, picked: null });

export default function RateReader({ pool, onComplete, onQuit, savedData = {}, onProgress }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.curves?.length && it?.asks?.length), [pool]);

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [askAt, setAskAt] = useState(0);
  const [work, setWork] = useState(blank);
  const [marks, setMarks] = useState({});
  const [wrongs, setWrongs] = useState(0);
  const [locked, setLocked] = useState(false);
  const [msg, setMsg] = useState(null);
  const [cleared, setCleared] = useState(0);
  const [itemDone, setItemDone] = useState(false);
  const [ruler, setRuler] = useState(null);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const asks = useMemo(() => {
    if (!item) return [];
    try { return item.asks.map((a) => deriveAsk(item, a)); } catch { return []; }
  }, [item]);

  if (!items.length || !asks.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No graphs yet</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>Return to Dashboard</button>
      </div>
    );
  }

  const ask = asks[askAt];
  const isChoice = !!ask.options;
  const units = ask.wantsUnit ? unitChoices(item) : null;
  // A fixed shuffle, so the right unit is not always the first chip.
  const unitOrder = units ? units.map((u, i) => units[(i + askAt + pos + 1) % units.length]) : null;

  /* ------------------------------------------------------------ flow */
  const summary = (res) => {
    const total = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((total / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };

  const settle = (ok, bad, newMarks, lead = '') => {
    setMarks(newMarks || {});
    if (ok) {
      setLocked(true); setCleared((c) => c + 1);
      setMsg({ ok: true, text: `${lead}${ask.explain}` });
      return;
    }
    const n = wrongs + 1;
    setWrongs(n);
    if (n >= 2) { setLocked(true); setMsg({ shown: true, text: `${bad} ${ask.explain}` }); }
    else setMsg({ ok: false, text: bad });
  };

  const showMe = () => { setLocked(true); setMarks({}); setMsg({ shown: true, text: ask.explain }); };

  const checkBoxes = () => {
    const typed = Object.fromEntries(ask.boxes.map((b) => [b.key, num(work.typed[b.key])]));
    const m = markBoxes(ask, typed);
    const unitOk = !ask.wantsUnit || work.unit === rateUnit(item);
    m.unit = unitOk;
    const firstBad = ask.boxes.find((b) => !m[b.key]);
    if (!firstBad && unitOk) {
      // Accepted within half a small square: say what the curve itself gives.
      const off = ask.boxes.some((b) => Math.abs(typed[b.key] - b.answer) > 1e-9);
      settle(true, '', m, off ? 'Close enough — marked on your own readings. Exactly: ' : '');
      return;
    }

    let bad;
    if (firstBad && !firstBad.isRate) {
      bad = ask.boxes.length === 1
        ? `Not quite. ${ask.method} Each small square on that axis is worth ${tidy((ask.kind === 'timeFor' || ask.kind === 'end' ? item.x.step / (item.x.minor || 1) : item.y.step / (item.y.minor || 1)))}.`
        : `Check the box “${firstBad.label}”. Use the ruler, and count the small squares: each one is worth ${tidy(firstBad.unit === item.x.unit ? item.x.step / (item.x.minor || 1) : item.y.step / (item.y.minor || 1))} ${firstBad.unit}.`;
    } else if (firstBad) {
      const v = typed[firstBad.key];
      const a = typed[firstBad.from?.[0] || firstBad.ratioOf?.[0]];
      const b = typed[firstBad.from?.[1] || firstBad.ratioOf?.[1]];
      if (firstBad.from && Math.abs(v - b) < 1e-9) bad = `${tidy(b)} is how much there was by the END of the interval. Some of that was already there at the start — take the start reading away.`;
      else if (firstBad.from && firstBad.width !== 1 && Math.abs(v - (b - a)) < 1e-9) bad = `${tidy(b - a)} ${item.y.unit} is what was made in the whole ${firstBad.width} ${item.x.unit}. Divide by ${firstBad.width} to get the rate for each ${item.x.unit === 's' ? 'second' : item.x.unit}.`;
      else if (firstBad.ratioOf && b && Math.abs(v - b / a) < Math.max(0.01, Math.abs(b / a) * 0.02)) bad = 'That is the time divided by the amount — upside down. The amount goes on top: total ÷ time.';
      else if (firstBad.ratioOf) bad = `Your two readings are right. Now divide: ${tidy(a)} ÷ ${tidy(b)}.`;
      else bad = `Your two readings are right. The rate is the difference between them${firstBad.width === 1 ? '' : `, divided by ${firstBad.width}`}.`;
    } else {
      bad = units.find((u) => u.val === work.unit)?.why || `A rate needs a unit of amount per unit of time: ${rateUnit(item)}.`;
    }
    settle(false, bad, m);
  };

  const pick = (val) => {
    if (locked) return;
    setWork((w) => ({ ...w, picked: val }));
    if (val === ask.correct) { settle(true, '', { [val]: true }); return; }
    const o = ask.options.find((x) => x.val === val);
    settle(false, o?.why || ask.method, { ...marks, [val]: false });
  };

  const nextAsk = () => {
    setWork(blank()); setMarks({}); setWrongs(0); setLocked(false); setMsg(null);
    if (askAt < asks.length - 1) { setAskAt(askAt + 1); return; }
    const score = Math.round((cleared / asks.length) * 100) / 100;
    const next = { ...results, [item.id]: { score } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };

  const goNext = () => {
    setPos((p) => p + 1); setAskAt(0); setCleared(0); setItemDone(false); setRuler(null);
    setWork(blank()); setMarks({}); setWrongs(0); setLocked(false); setMsg(null);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const ready = !isChoice
    && ask.boxes.every((b) => String(work.typed[b.key] ?? '').trim() !== '')
    && (!ask.wantsUnit || !!work.unit);

  const isLast = pos >= items.length - 1;
  const snap = toleranceOf(item).x;
  const guide = locked && !itemDone && ask.guide?.xs?.length
    ? { ...ask.guide, colour: msg?.shown ? SHOWN : GOOD }
    : null;
  const doneScore = results[item.id]?.score;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={pool?.title || 'Rate Reader'} current={pos + (itemDone ? 1 : 0)} total={items.length} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-4 items-start">
        {/* LEFT — the experiment and its graph */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-3">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Experiment {pos + 1} of {items.length}</div>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{item.name}</div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug mt-1">{item.context}</p>
            {item.equation && (
              <div className="mt-2 text-sm text-slate-800 dark:text-slate-100 flex items-baseline flex-wrap gap-x-2">
                <EquationSide text={item.equation.reactants} className="!justify-start" />
                <span className="font-black text-slate-400">→</span>
                <EquationSide text={item.equation.products} className="!justify-start" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white overflow-hidden">
            <Graph item={item} ruler={ruler} onRuler={setRuler} active={ask.curve} guide={guide} />
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Ruler className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Drag along the graph to move the ruler. It draws the lines — you read the scale.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button type="button" aria-label="Move the ruler left" onClick={() => setRuler((r) => Math.max(0, (r ?? 0) - snap))}
                className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 flex items-center justify-center hover:border-teal-500"><ChevronLeft className="w-5 h-5" strokeWidth={3} /></button>
              <button type="button" aria-label="Move the ruler right" onClick={() => setRuler((r) => Math.min(item.x.max, (r ?? 0) + snap))}
                className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 flex items-center justify-center hover:border-teal-500"><ChevronRight className="w-5 h-5" strokeWidth={3} /></button>
            </div>
          </div>
        </div>

        {/* RIGHT — the questions */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {asks.map((a, i) => {
              const done = itemDone || i < askAt;
              const now = !itemDone && i === askAt;
              return (
                <span key={a.id || i} className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-black
                  ${now ? 'text-white' : done ? 'border-[#58a700] bg-[#58cc02] text-white' : 'border-slate-200 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-900'}`}
                  style={now ? { backgroundColor: INK, borderColor: INK } : undefined}>{done ? '✓' : i + 1}</span>
              );
            })}
          </div>

          {!itemDone ? (
            <div className="rounded-2xl border-2 bg-white dark:bg-slate-900 shadow-sm p-4" style={{ borderColor: INK }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: INK }}>Question {askAt + 1} of {asks.length}</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{ask.prompt}</div>
              <div className="mt-2 flex items-start gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" strokeWidth={2.5} />
                <span>{ask.method}</span>
              </div>

              {/* typed answers */}
              {!isChoice && (
                <div className="mt-4 flex flex-col gap-2.5">
                  {ask.boxes.map((b) => (
                    <label key={b.key} className="flex items-center justify-between gap-3">
                      <span className={`text-sm font-black ${b.isRate ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>{b.label}</span>
                      <span className="flex items-center gap-2">
                        {locked ? (
                          <span className="min-w-[5.5rem] text-right rounded-xl px-3 py-1.5 font-black text-white"
                            style={{ backgroundColor: msg?.shown ? SHOWN : GOOD }}>{tidy(marks[b.key] ? num(work.typed[b.key]) : b.answer)}</span>
                        ) : (
                          <input inputMode="decimal" value={work.typed[b.key] ?? ''}
                            onChange={(e) => setWork((w) => ({ ...w, typed: { ...w.typed, [b.key]: e.target.value } }))}
                            className={`w-24 text-right rounded-xl border-2 px-2 py-1.5 font-black text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 outline-none focus:border-teal-600
                              ${marks[b.key] === false ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30' : marks[b.key] === true ? 'border-[#58a700]' : 'border-slate-300 dark:border-slate-600'}`} />
                        )}
                        {!b.isRate && <span className="w-10 text-sm font-black text-slate-500 dark:text-slate-400">{b.unit}</span>}
                        {b.isRate && <span className="w-10" />}
                      </span>
                    </label>
                  ))}

                  {unitOrder && (
                    <div className="mt-1">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1.5">Unit of the rate</div>
                      <div className="grid grid-cols-4 gap-2">
                        {unitOrder.map((u) => {
                          const on = locked ? u.ok : work.unit === u.val;
                          return (
                            <button key={u.val} type="button" disabled={locked} onClick={() => setWork((w) => ({ ...w, unit: u.val }))}
                              className={`rounded-xl border-2 px-1 py-2 text-sm font-black transition-all
                                ${on ? 'text-white' : marks.unit === false && work.unit === u.val ? 'border-[#ff4b4b] text-slate-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 hover:border-teal-500'}`}
                              style={on ? { backgroundColor: locked ? (msg?.shown ? SHOWN : GOOD) : INK, borderColor: 'transparent' } : undefined}>{u.val}</button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* a choice */}
              {isChoice && (
                <div className="mt-4 flex flex-col gap-2">
                  {ask.options.map((o) => {
                    const right = locked && o.val === ask.correct;
                    const wrong = marks[o.val] === false;
                    return (
                      <button key={o.val} type="button" disabled={locked || wrong} onClick={() => pick(o.val)}
                        className={`text-left rounded-xl border-2 px-3 py-2.5 text-sm font-black transition-all
                          ${right ? 'text-white' : wrong ? 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30 text-slate-400 line-through'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-teal-500'}`}
                        style={right ? { backgroundColor: msg?.shown ? SHOWN : GOOD, borderColor: 'transparent' } : undefined}>{o.text}</button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-[#58a700] bg-lime-50 dark:bg-lime-950/30 p-4">
              <div className="flex items-center gap-2 text-[#3e7500] dark:text-lime-400 font-black">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                {Math.round((doneScore || 0) * asks.length)} of {asks.length} read without help
              </div>
              <p className="mt-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug">{item.note}</p>
            </div>
          )}

          {msg && !itemDone && (
            <div className={`flex items-start gap-2 rounded-xl border-2 p-3 ${msg.ok ? 'border-[#58a700] bg-lime-50 dark:bg-lime-950/30' : msg.shown ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'border-[#ff4b4b] bg-rose-50 dark:bg-rose-950/30'}`}>
              {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#3e7500]" strokeWidth={2.5} />
                : msg.shown ? <Eye className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" strokeWidth={2.5} />
                  : <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#ff4b4b]" strokeWidth={2.5} />}
              <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{msg.text}</div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            {!itemDone && !locked ? (
              <button type="button" onClick={showMe} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Show me</button>
            ) : <span />}
            {itemDone ? (
              isLast ? (
                <button onClick={finish} className={`px-6 py-3 text-sm text-white bg-[#58cc02] border-[#3e7500] flex items-center gap-2 ${btn}`}>
                  <Trophy className="w-4 h-4" strokeWidth={3} /> Finish
                </button>
              ) : (
                <button onClick={goNext} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                  Next experiment <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              )
            ) : locked ? (
              <button onClick={nextAsk} className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                {askAt < asks.length - 1 ? 'Next question' : 'Finish this graph'} <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </button>
            ) : !isChoice ? (
              <button onClick={checkBoxes} disabled={!ready}
                className={`px-6 py-3 text-sm text-white flex items-center gap-2 ${ready ? btn : 'rounded-xl font-black uppercase tracking-widest bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}
                style={ready ? { backgroundColor: INK, borderColor: INK_DARK } : undefined}>
                <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> Check
              </button>
            ) : <span className="text-xs font-bold text-slate-400">Tap your answer</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
