import { useState, useMemo, useRef } from 'react';
import { Construction, Target, Crosshair, CheckCircle2, XCircle, Ban, ArrowRight, RotateCcw, MousePointerClick } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import TopBar from '../components/TopBar';
import { rootsOf } from '../utils/parabola';

/* ------------------------------------------------------------------ *
 * GRAPH PLOT — "put the key points on the grid".
 *
 * The student is shown an equation and clicks lattice points on a coordinate
 * grid: the vertex, then the zeros, then any extra point the item asks for.
 * It tests production rather than recognition — unlike an MCQ it cannot be won
 * by elimination, because there is nothing to eliminate.
 *
 * Reads a unit's `graphPlot` array:
 *   [{
 *      id: 'gp1',
 *      equation: 'y = (x - 3)^2 - 4',        // KaTeX source, shown big
 *      curve: { a: 1, h: 3, k: -4 },         // the truth
 *      grid: { xMin, xMax, yMin, yMax },     // optional, defaults below
 *      steps: [ { kind: 'vertex' },
 *               { kind: 'zeros' },
 *               { kind: 'point', at: [0, 5], label, labelVn } ],
 *      note, noteVn,                          // optional one-line hint
 *   }]
 *
 * THE ANSWERS ARE DERIVED FROM `curve`, NOT TYPED BY THE AUTHOR — the vertex is
 * (h, k) and the zeros are h ± sqrt(-k/a), computed here. An author cannot get
 * them wrong, and an edit to the equation cannot leave a stale answer key
 * behind. Only a `point` step carries a coordinate, and validate-entry.js
 * checks that it really sits on the curve.
 *
 * SCORING: one mark per step, and a step only pays if it was clean — a wrong
 * click costs that step even though the student stays on it until it is right.
 * Wrong clicks are shown where they landed, because "you put it at (−3, 4)" is
 * the feedback that teaches the sign trap.
 *
 * AIMING: nothing is placed by a raw click. The pointer first snaps to the
 * nearest lattice point and that point is shown — ringed, with dashed guides
 * running back to each axis and its own tick lit up, and the coordinate spelled
 * out beside it — so the student commits to a coordinate they can read rather
 * than to a pixel they hope is right. On a touch screen the aim needs a second
 * tap (or the Place button) to commit, because a finger covers the very point
 * it is choosing.
 *
 * The pointer -> grid map goes through getScreenCTM(), NOT through
 * getBoundingClientRect() ratios. The svg is clamped by both a max width and a
 * max height, so whenever those disagree with the viewBox the browser
 * letterboxes the drawing inside the element box; a ratio map ignores that
 * offset and lands the student's click a unit or two from the square they aimed
 * at. The CTM is the transform the browser actually used, so it is right under
 * any sizing, zoom or transform.
 * ------------------------------------------------------------------ */

const SKY = '#1cb0f6';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';

const DEFAULT_GRID = { xMin: -7, xMax: 7, yMin: -6, yMax: 8 };

const EN = {
  title: 'Graph It',
  vertex: 'Click the VERTEX',
  vertexSub: 'the turning point of the curve',
  zeros: 'Click every crossing on the x-axis',
  zerosSub: 'there may be two, one, or none — you decide',
  noZerosBtn: 'It has no zeros',
  point: 'Click',
  step: 'Step',
  of: 'of',
  clean: 'First time — full marks for this one.',
  helped: 'Right, but it took more than one try.',
  next: 'Next question',
  finish: 'Finish',
  noZerosWrong: 'This one does cross the axis — find where.',
  clickedWrong: 'Not that point. Look at the equation again.',
  youPlaced: 'you placed',
  goodOne: 'Yes — one down. Keep looking.',
  scoreLine: 'points placed cleanly',
  aiming: 'Aiming at',
  aimHint: 'Move over the grid to aim, then click to place.',
  tapAgain: 'Tap the same point again to place it.',
  placeBtn: 'Place',
  placedHere: 'placed on this step',
};

const VN = {
  title: 'Vẽ Đồ Thị',
  vertex: 'Bấm vào ĐỈNH',
  vertexSub: 'điểm quay đầu của đường cong',
  zeros: 'Bấm vào mọi giao điểm trên trục x',
  zerosSub: 'có thể hai, một, hoặc không có — em tự quyết định',
  noZerosBtn: 'Đồ thị không có nghiệm',
  point: 'Bấm vào',
  step: 'Bước',
  of: 'trên',
  clean: 'Đúng ngay lần đầu — trọn điểm câu này.',
  helped: 'Đúng rồi, nhưng phải thử nhiều lần.',
  next: 'Câu tiếp theo',
  finish: 'Kết thúc',
  noZerosWrong: 'Đồ thị này CÓ cắt trục x — hãy tìm chỗ đó.',
  clickedWrong: 'Không phải điểm đó. Hãy nhìn lại phương trình.',
  youPlaced: 'em đã đặt',
  goodOne: 'Đúng — được một điểm. Tìm tiếp nhé.',
  scoreLine: 'điểm đặt đúng ngay lần đầu',
  aiming: 'Đang ngắm',
  aimHint: 'Rê chuột trên lưới để ngắm, rồi bấm để đặt điểm.',
  tapAgain: 'Chạm lần nữa vào đúng điểm đó để đặt.',
  placeBtn: 'Đặt điểm',
  placedHere: 'điểm đã đặt ở bước này',
};

const strip = (s) => String(s).replace(/[\u200B-\u200D\uFEFF]/g, '');
/** KaTeX, rendered outside the try so a render error cannot escape a boundary. */
const Math$ = ({ math, display = false }) => {
  let html;
  try {
    const k = katex.default || katex;
    html = k.renderToString(strip(math), { throwOnError: true, displayMode: display });
  } catch {
    html = null;
  }
  return html
    ? <span dangerouslySetInnerHTML={{ __html: html }} />
    : <span className="text-rose-500 font-mono text-sm">{math}</span>;
};

/** The points a step wants, derived from the curve wherever possible. */
function targetsFor(step, curve) {
  if (step.kind === 'vertex') return [[curve.h, curve.k]];
  if (step.kind === 'zeros') return rootsOf(curve).map((x) => [x, 0]);
  return [step.at];
}

const same = (p, q) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;

/** Minus signs are typeset, never hyphens — the sign is the thing being taught. */
const num = (n) => (n < 0 ? `−${-n}` : `${n}`);
const pair = (x, y) => `(${num(x)}, ${num(y)})`;

export default function GraphPlot({ pool = [], onComplete, onQuit }) {
  const items = useMemo(
    () => pool.filter((it) => it && it.curve && Array.isArray(it.steps) && it.steps.length),
    [pool]
  );

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [placed, setPlaced] = useState([]);     // correct points on the current step
  const [misses, setMisses] = useState([]);     // wrong clicks on the current item
  const [dirty, setDirty] = useState(false);    // current step has had a wrong try
  const [results, setResults] = useState({});   // itemId -> { clean, total }
  const [done, setDone] = useState(false);      // current item finished
  const [flash, setFlash] = useState(null);
  const [aim, setAim] = useState(null);         // lattice point under the pointer
  const [armed, setArmed] = useState(false);    // a touch aim, waiting to be confirmed
  const svgRef = useRef(null);

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];

  const grid = { ...DEFAULT_GRID, ...(item?.grid || {}) };
  const cols = grid.xMax - grid.xMin;
  const rows = grid.yMax - grid.yMin;
  // One unit is one square, always — an unequal grid would make a parabola look
  // like a different parabola, which is the whole thing being taught.
  const U = 44;
  const PAD = 30;
  const W = cols * U + PAD * 2;
  const H = rows * U + PAD * 2;
  const X = (x) => PAD + (x - grid.xMin) * U;
  const Y = (y) => PAD + (grid.yMax - y) * U;

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-sky-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No graphs yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const step = item.steps[stepIdx];
  const targets = targetsFor(step, item.curve);
  const remaining = targets.filter((tp) => !placed.some((p) => same(p, tp)));

  const stepTitle =
    step.kind === 'vertex' ? t.vertex
      : step.kind === 'zeros' ? t.zeros
        : `${t.point} ${lang === 'vn' ? (step.labelVn || step.label) : step.label}`;
  const stepSub =
    step.kind === 'vertex' ? t.vertexSub : step.kind === 'zeros' ? t.zerosSub : '';

  const say = (kind, text) => {
    setFlash({ kind, text });
    setTimeout(() => setFlash((f) => (f && f.text === text ? null : f)), 2200);
  };

  /** Marks the step finished, moving on or ending the item. */
  const closeStep = (wasDirty) => {
    const total = item.steps.length;
    setResults((r) => {
      const prev = r[item.id] || { clean: 0, total };
      return { ...r, [item.id]: { clean: prev.clean + (wasDirty ? 0 : 1), total } };
    });
    setAim(null);
    setArmed(false);
    if (stepIdx + 1 < item.steps.length) {
      setStepIdx((s) => s + 1);
      setPlaced([]);
      setDirty(false);
    } else {
      setDone(true);
    }
  };

  /**
   * Pointer position -> lattice point, through the transform the browser really
   * used. Returns null outside the plotted range.
   */
  const pointToGrid = (e) => {
    const svg = svgRef.current;
    if (!svg || typeof svg.getScreenCTM !== 'function') return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    let pt;
    if (typeof svg.createSVGPoint === 'function') {
      pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
    } else if (typeof DOMPoint === 'function') {
      pt = new DOMPoint(e.clientX, e.clientY);
    } else {
      return null;
    }
    const loc = pt.matrixTransform(ctm.inverse());
    const gx = Math.round((loc.x - PAD) / U) + grid.xMin;
    const gy = grid.yMax - Math.round((loc.y - PAD) / U);
    if (gx < grid.xMin || gx > grid.xMax || gy < grid.yMin || gy > grid.yMax) return null;
    return [gx, gy];
  };

  /** Commits the aimed point: scores it, or records the miss where it landed. */
  const place = ([gx, gy]) => {
    if (done) return;
    const hit = remaining.find((tp) => same(tp, [gx, gy]));
    if (hit) {
      const now = [...placed, hit];
      setPlaced(now);
      if (now.length === targets.length) closeStep(dirty);
      else say('good', t.goodOne);
      return;
    }
    if (placed.some((p) => same(p, [gx, gy]))) return;   // already-found point
    setMisses((m) => [...m, [gx, gy]]);
    setDirty(true);
    say('bad', targets.length === 0
      ? t.noZerosWrong
      : `${t.clickedWrong} (${t.youPlaced} ${pair(gx, gy)})`);
  };

  const onPointerMove = (e) => {
    if (done) return;
    // A finger only aims once it is down and armed; a mouse aims all the time.
    if (e.pointerType === 'touch' && !armed) return;
    const p = pointToGrid(e);
    if (p) setAim(p);
  };

  const onPointerUp = (e) => {
    if (done) return;
    const p = pointToGrid(e);
    if (!p) return;
    if (e.pointerType === 'touch') {
      // Two taps on a touch screen: the first shows the point the finger is
      // covering, the second commits it. Tapping elsewhere just re-aims.
      if (armed && aim && same(aim, p)) {
        setArmed(false);
        setAim(null);
        place(p);
      } else {
        setAim(p);
        setArmed(true);
      }
      return;
    }
    setAim(p);
    place(p);
  };

  /** Arrow keys walk the aim square by square; Enter places it. */
  const onKeyDown = (e) => {
    if (done) return;
    const nudge = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    const clamp = (x, y) => [
      Math.max(grid.xMin, Math.min(grid.xMax, x)),
      Math.max(grid.yMin, Math.min(grid.yMax, y)),
    ];
    if (nudge) {
      e.preventDefault();
      setAim(aim ? clamp(aim[0] + nudge[0], aim[1] + nudge[1]) : clamp(0, 0));
      setArmed(false);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && aim) {
      e.preventDefault();
      const p = aim;
      setArmed(false);
      setAim(null);
      place(p);
    }
  };

  const clickNoZeros = () => {
    if (done) return;
    if (targets.length === 0) closeStep(dirty);
    else { setDirty(true); say('bad', t.noZerosWrong); }
  };

  const nextItem = () => {
    if (idx + 1 < items.length) {
      setIdx((i) => i + 1);
      setStepIdx(0); setPlaced([]); setMisses([]); setDirty(false); setDone(false);
      setFlash(null); setAim(null); setArmed(false);
    } else {
      const rows = items.map((it) => results[it.id] || { clean: 0, total: it.steps.length });
      const clean = rows.reduce((s, r) => s + r.clean, 0);
      const total = rows.reduce((s, r) => s + r.total, 0);
      const log = items.map((it) => ({
        itemId: it.id,
        correct: (results[it.id]?.clean || 0) === it.steps.length,
      }));
      onComplete?.(total ? Math.round((clean / total) * 10) : 0, null, { items: log });
    }
  };

  /** The finished curve, drawn only once the student has placed everything. */
  const curvePath = () => {
    const { a, h, k } = item.curve;
    let d = '';
    let pen = false;
    for (let i = 0; i <= 400; i++) {
      const x = grid.xMin + (i / 400) * cols;
      const y = a * (x - h) * (x - h) + k;
      if (y < grid.yMin || y > grid.yMax) { pen = false; continue; }
      d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
      pen = true;
    }
    return d.trim();
  };

  /**
   * A coordinate flag pinned to a point. It leans away from whichever edge it is
   * near, so a point in the top right corner can still be read.
   */
  const flagAt = (x, y, color, faint = false) => {
    const text = pair(x, y);
    const w = text.length * 8.4 + 14;
    const left = X(x) + w + 26 > W;
    const below = Y(y) - 34 < 0;
    const bx = left ? X(x) - w - 13 : X(x) + 13;
    const by = below ? Y(y) + 8 : Y(y) - 30;
    return (
      <g pointerEvents="none" opacity={faint ? 0.9 : 1}>
        <rect x={bx} y={by} width={w} height={22} rx="7" fill={color} fillOpacity="0.16"
          stroke={color} strokeWidth="1.5" />
        <text x={bx + w / 2} y={by + 16} textAnchor="middle" fontSize="14" fontWeight="800"
          fontFamily="ui-monospace, monospace" fill={color}>{text}</text>
      </g>
    );
  };

  const itemResult = results[item.id];
  const allPlaced = item.steps.flatMap((s) => targetsFor(s, item.curve));
  const earlierPlaced = item.steps.slice(0, stepIdx).flatMap((s) => targetsFor(s, item.curve));
  const shown = done ? allPlaced : [...earlierPlaced, ...placed];
  const isZero = ([x, y]) => y === 0 && x !== item.curve.h;
  const lastMiss = misses.length ? misses[misses.length - 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={onQuit}
        modeTitle={t.title}
        current={idx + 1}
        total={items.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 pb-10 flex flex-col gap-3">

        {/* The equation, big — it is the only thing the student works from */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4 sm:p-5 text-center">
          <div className="text-2xl sm:text-4xl text-slate-900 dark:text-slate-100">
            <Math$ math={item.equation} display />
          </div>
          {(item.note || item.noteVn) && (
            <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">
              {lang === 'vn' ? (item.noteVn || item.note) : item.note}
            </p>
          )}
        </div>

        {/* What to do now, and — on the right — exactly which point is under the
            pointer, so the student commits to a coordinate, not to a pixel. */}
        {!done ? (
          <div className="rounded-2xl border-2 shadow-sm p-3 sm:p-4 flex items-center gap-3"
            style={{ borderColor: SKY, backgroundColor: 'rgba(28,176,246,0.08)' }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: SKY }}>
              {step.kind === 'vertex' ? <Target className="w-6 h-6 text-white" strokeWidth={2.5} /> : <Crosshair className="w-6 h-6 text-white" strokeWidth={2.5} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                {t.step} {stepIdx + 1} {t.of} {item.steps.length}
                {placed.length > 0 && (
                  <span style={{ color: GREEN }}> · {placed.length} {t.placedHere}</span>
                )}
              </div>
              <div className="font-black text-lg text-slate-800 dark:text-slate-100 leading-tight">{stepTitle}</div>
              {stepSub && <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{stepSub}</div>}
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.aiming}</div>
              <div className="font-mono font-black text-lg sm:text-xl tabular-nums"
                style={aim ? { color: SKY } : undefined}>
                {aim ? pair(aim[0], aim[1]) : <span className="text-slate-300 dark:text-slate-600">(–, –)</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 shadow-sm p-3 sm:p-4 flex items-center gap-3"
            style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.10)' }}>
            <CheckCircle2 className="w-8 h-8 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
            <div className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100">
              {itemResult && itemResult.clean === item.steps.length ? t.clean : t.helped}
            </div>
          </div>
        )}

        {/* One line that is either the verdict on the last click or the aiming
            instruction — reserved, so nothing below it jumps when it changes. */}
        <div className="min-h-[1.25rem] flex items-center">
          {flash ? (
            <div className="flex items-center gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-1"
              style={{ color: flash.kind === 'bad' ? RED : GREEN }}>
              {flash.kind === 'bad'
                ? <XCircle className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                : <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
              {flash.text}
            </div>
          ) : !done && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <MousePointerClick className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              {armed ? t.tapAgain : t.aimHint}
            </div>
          )}
        </div>

        {/* The grid */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2 flex justify-center">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            tabIndex={done ? -1 : 0}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={() => { if (!armed) setAim(null); }}
            onKeyDown={onKeyDown}
            // Sized from the HEIGHT with width:auto, so the element box keeps the
            // viewBox's ratio instead of being letterboxed inside a box clamped
            // in one direction only. The pointer map goes through the CTM and so
            // survives either way, but a letterboxed grid also wastes the width
            // it pretends to occupy.
            style={{ height: `min(50vh, ${H}px)`, width: 'auto', maxWidth: '100%' }}
            className={`block select-none touch-none rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${done ? '' : 'cursor-crosshair'}`}>
            <rect x="0" y="0" width={W} height={H} rx="12" className="fill-white dark:fill-slate-900" />

            {Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i).map((x) => (
              <line key={`v${x}`} x1={X(x)} y1={PAD} x2={X(x)} y2={H - PAD} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
            ))}
            {Array.from({ length: rows + 1 }, (_, i) => grid.yMin + i).map((y) => (
              <line key={`h${y}`} x1={PAD} y1={Y(y)} x2={W - PAD} y2={Y(y)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
            ))}

            {/* The row and the column the pointer is on, lit before anything is
                committed: the student can see the coordinate being chosen. */}
            {aim && !done && (
              <g pointerEvents="none">
                <rect x={X(aim[0]) - U / 2} y={PAD} width={U} height={H - PAD * 2} fill={SKY} opacity="0.07" />
                <rect x={PAD} y={Y(aim[1]) - U / 2} width={W - PAD * 2} height={U} fill={SKY} opacity="0.07" />
              </g>
            )}

            <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />
            <line x1={X(0)} y1={PAD} x2={X(0)} y2={H - PAD} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />
            <text x={W - PAD + 10} y={Y(0) + 5} textAnchor="middle" fontSize="14" fontWeight="800" fontStyle="italic" className="fill-slate-400">x</text>
            <text x={X(0)} y={PAD - 12} textAnchor="middle" fontSize="14" fontWeight="800" fontStyle="italic" className="fill-slate-400">y</text>

            {/* Every unit is numbered — a student checking a coordinate should
                never have to count squares. The aimed row and column come
                forward, bigger and in the aiming colour. */}
            {Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i)
              .filter((x) => x !== 0)
              .map((x) => {
                const on = !done && !!aim && aim[0] === x;
                return (
                  <text key={`tx${x}`} x={X(x)} y={Y(0) + 17} textAnchor="middle" fontSize={on ? 13 : 11}
                    fontWeight={on ? 900 : 600} fontFamily="ui-monospace, monospace" strokeWidth="3.5" paintOrder="stroke"
                    fill={on ? SKY : undefined}
                    className={`stroke-white dark:stroke-slate-900 ${on ? '' : 'fill-slate-400'}`}>
                    {num(x)}
                  </text>
                );
              })}
            {Array.from({ length: rows + 1 }, (_, i) => grid.yMin + i)
              .filter((y) => y !== 0)
              .map((y) => {
                const on = !done && !!aim && aim[1] === y;
                return (
                  <text key={`ty${y}`} x={X(0) - 9} y={Y(y) + 4} textAnchor="end" fontSize={on ? 13 : 11}
                    fontWeight={on ? 900 : 600} fontFamily="ui-monospace, monospace" strokeWidth="3.5" paintOrder="stroke"
                    fill={on ? SKY : undefined}
                    className={`stroke-white dark:stroke-slate-900 ${on ? '' : 'fill-slate-400'}`}>
                    {num(y)}
                  </text>
                );
              })}

            {/* clickable lattice — visible dots, so "click a point" is literal */}
            {!done && Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i).map((x) =>
              Array.from({ length: rows + 1 }, (_, j) => grid.yMin + j).map((y) => (
                <circle key={`d${x}_${y}`} cx={X(x)} cy={Y(y)} r="2.2" className="fill-slate-300 dark:fill-slate-700" />
              ))
            )}

            {done && <path d={curvePath()} fill="none" stroke={SKY} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}

            {/* Wrong clicks stay where they landed. Only the newest is labelled,
                so the sign trap is named once instead of ten times. */}
            {misses.map(([x, y], i) => (
              <g key={`m${i}`} opacity={i === misses.length - 1 ? 0.9 : 0.35}>
                <line x1={X(x) - 7} y1={Y(y) - 7} x2={X(x) + 7} y2={Y(y) + 7} stroke={RED} strokeWidth="3.5" strokeLinecap="round" />
                <line x1={X(x) + 7} y1={Y(y) - 7} x2={X(x) - 7} y2={Y(y) + 7} stroke={RED} strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ))}
            {!done && lastMiss && (!aim || !same(aim, lastMiss)) && (
              flagAt(lastMiss[0], lastMiss[1], RED, true)
            )}

            {shown.map(([x, y], i) => {
              const color = isZero([x, y]) ? AMBER : GREEN;
              return (
                <g key={`p${i}`}>
                  <circle cx={X(x)} cy={Y(y)} r="8" fill={color} strokeWidth="3" className="stroke-white dark:stroke-slate-900" />
                  {flagAt(x, y, color)}
                </g>
              );
            })}

            {/* The aim, on top of everything: dashed guides back to each axis, a
                ring that closes once the tap is armed, and the coordinate. */}
            {aim && !done && (
              <g pointerEvents="none">
                <line x1={X(aim[0])} y1={Y(aim[1])} x2={X(aim[0])} y2={Y(0)} stroke={SKY} strokeWidth="2" strokeDasharray="5 5" opacity="0.85" />
                <line x1={X(aim[0])} y1={Y(aim[1])} x2={X(0)} y2={Y(aim[1])} stroke={SKY} strokeWidth="2" strokeDasharray="5 5" opacity="0.85" />
                <circle cx={X(aim[0])} cy={Y(aim[1])} r="14" fill="none" stroke={SKY} strokeWidth="2.5"
                  opacity={armed ? 0.95 : 0.55} strokeDasharray={armed ? undefined : '4 4'} />
                <circle cx={X(aim[0])} cy={Y(aim[1])} r="5.5" fill={SKY} strokeWidth="2.5" className="stroke-white dark:stroke-slate-900" />
                {flagAt(aim[0], aim[1], SKY)}
              </g>
            )}
          </svg>
        </div>

        {/* The touch confirm, the escape hatch for a parabola that never
            crosses, and the Next button */}
        <div className="min-h-[3.25rem] flex items-center justify-end gap-3">
          {!done && armed && aim && (
            <button
              onClick={() => { const p = aim; setArmed(false); setAim(null); place(p); }}
              className="shrink-0 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-[#1CB0F6] border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Target className="w-4 h-4" strokeWidth={3} />
              {t.placeBtn}
              <span className="font-mono text-sm normal-case tracking-normal">{pair(aim[0], aim[1])}</span>
            </button>
          )}
          {!done && step.kind === 'zeros' && (
            <button
              onClick={clickNoZeros}
              className="shrink-0 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-slate-500 dark:bg-slate-600 border-b-[4px] border-slate-700 active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Ban className="w-4 h-4" strokeWidth={3} />
              {t.noZerosBtn}
            </button>
          )}
          {done && (
            <button
              onClick={nextItem}
              className="shrink-0 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              {idx + 1 < items.length ? t.next : t.finish}
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Running tally — visible so the cost of a guess is never a surprise */}
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
          {Object.values(results).reduce((s, r) => s + r.clean, 0)}
          {' / '}
          {items.reduce((s, it) => s + it.steps.length, 0)} {t.scoreLine}
        </div>
      </div>
    </div>
  );
}
