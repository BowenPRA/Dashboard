import { useState, useMemo } from 'react';
import {
  Ruler, Brackets, RotateCcw, Lightbulb, ArrowRight, Construction, PartyPopper,
  Check, X, CircleDot,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import {
  parseInequality, parseNotation, notationText, inequalityText, sameSet,
  setFromGraph, graphOfSet, normalize, NEG_INF, POS_INF,
} from '../utils/interval';

/**
 * Is a shading mark inside this region? One rule, used by the drawing, by the
 * tap handler and by the marking — so what looks shaded and what is scored
 * cannot come apart.
 */
const markInside = (m, lo, hi) =>
  (lo === NEG_INF || m > lo) && (hi === POS_INF || m < hi);

/** The value that stands for a whole region once it has been shaded. */
const repOf = (lo, hi, min, max) =>
  lo === NEG_INF && hi === POS_INF ? 0
    : lo === NEG_INF ? min - 0.5
      : hi === POS_INF ? max + 0.5
        : (lo + hi) / 2;

/* ------------------------------------------------------------------ *
 * Number Line — the same solution set, said three ways.
 *
 * An Acellus item shows a set as an inequality, as a picture and as interval
 * notation, and asks the student to move between them. The three are not three
 * facts to memorise; they are three notations for ONE object. So this task
 * makes the student produce two of them from the third:
 *
 *   1. GRAPH IT   place the endpoints, decide open or closed, shade the part
 *                 of the line that works.
 *   2. WRITE IT   turn that picture into interval notation, choosing every
 *                 bracket for a reason.
 *
 * Both stages are marked against the SAME set, derived from the item's
 * inequality by src/utils/interval.js. There is no answer key to author and
 * none to get wrong — and because the graph is read back through the same
 * `setFromGraph` the marking uses, the picture and the notation can never
 * disagree about what the answer is.
 *
 * Nothing here is multiple choice. There is nothing to eliminate, which is the
 * rule Graph It, Vectors and Long Division follow too.
 * ------------------------------------------------------------------ */

const VN = {
  title: 'Trục Số & Khoảng',
  stage1: 'Bước 1 · Vẽ trên trục số',
  stage2: 'Bước 2 · Viết bằng ký hiệu khoảng',
  howGraph: 'Chạm vào một số để đặt vòng tròn. Chạm lần nữa để tô đặc, chạm thêm lần nữa để bỏ đi. Chạm vào vùng phía trên trục để tô phần nghiệm.',
  howWrite: 'Chọn dấu ngoặc cho mỗi đầu, rồi điền hai số. Dùng nút ∞ cho đầu không có giới hạn.',
  checkGraph: 'Kiểm tra hình vẽ',
  checkWrite: 'Kiểm tra ký hiệu',
  clear: 'Xóa hết',
  showMe: 'Cho tôi xem',
  next: 'Tiếp theo',
  finish: 'Hoàn thành',
  right: 'Chính xác!',
  notYet: 'Chưa đúng',
  answerIs: 'Đáp án',
  openLabel: 'vòng tròn rỗng — không lấy số này',
  closedLabel: 'vòng tròn đặc — có lấy số này',
  addPiece: 'Thêm một khoảng',
  removePiece: 'Bỏ khoảng này',
  union: 'hợp',
  needShade: 'Bạn chưa tô phần nào của trục số.',
  needPoint: 'Hãy đặt điểm mút trước.',
  errInfinity: '∞ không phải là một số bạn có thể chạm tới, nên không bao giờ dùng ngoặc vuông với nó.',
  errOrder: 'Số nhỏ viết trước, số lớn viết sau.',
  errShape: 'Mỗi khoảng cần đủ hai số.',
  wrongBracket: 'Đúng hai số rồi, nhưng sai loại ngoặc. Vòng tròn rỗng → ngoặc tròn. Vòng tròn đặc → ngoặc vuông.',
  wrongPieces: 'Số khoảng chưa đúng. Hãy đếm lại xem hình vẽ có mấy phần rời nhau.',
  wrongNumbers: 'Các số ở đầu khoảng chưa khớp với hình vẽ.',
  graphWrongPoints: 'Điểm mút chưa đúng vị trí.',
  graphWrongFill: 'Vị trí đúng rồi, nhưng rỗng/đặc chưa đúng. Hỏi: số đó có phải là nghiệm không?',
  graphWrongShade: 'Điểm mút đúng, nhưng bạn tô nhầm phía. Hãy thử một số ở mỗi phía xem có thỏa mãn không.',
  testIt: 'Thử một số',
  scored: 'điểm',
};

const EN = {
  title: 'Number Line & Intervals',
  stage1: 'Step 1 · Graph it',
  stage2: 'Step 2 · Write it in interval notation',
  howGraph: 'Tap a number to put a circle on it. Tap it again to fill it in, and once more to take it away. Tap the band above the line to shade the part that works.',
  howWrite: 'Choose a bracket for each end, then fill in the two numbers. Use the ∞ button for an end that never stops.',
  checkGraph: 'Check the graph',
  checkWrite: 'Check the notation',
  clear: 'Clear',
  showMe: 'Show me',
  next: 'Next',
  finish: 'Finish',
  right: 'That is it!',
  notYet: 'Not yet',
  answerIs: 'The answer',
  openLabel: 'open circle — this number is NOT included',
  closedLabel: 'closed circle — this number IS included',
  addPiece: 'Add another interval',
  removePiece: 'Remove this interval',
  union: 'union',
  needShade: 'Nothing on the line is shaded yet.',
  needPoint: 'Put the endpoint on the line first.',
  errInfinity: '∞ is not a number you can ever reach, so it never gets a square bracket.',
  errOrder: 'The smaller number goes first, then the larger one.',
  errShape: 'Each interval needs both of its numbers.',
  wrongBracket: 'Both numbers are right, but a bracket is wrong. Open circle → round bracket. Closed circle → square bracket.',
  wrongPieces: 'That is the wrong number of intervals. Count the separate shaded pieces on the line.',
  wrongNumbers: 'The numbers at the ends do not match the graph.',
  graphWrongPoints: 'The endpoints are not in the right places yet.',
  graphWrongFill: 'Right places, wrong circles. Ask: does that exact number make the statement true?',
  graphWrongShade: 'The endpoints are right, but the wrong side is shaded. Test a number on each side and see which one works.',
  testIt: 'Test a number',
  scored: 'marks',
};

// ------------------------------------------------------------------ the line

const PAD = 34;
const W = 760;
const AXIS_Y = 74;
const BAND_TOP = 26;
const BAND_H = 40;

/**
 * The drawn number line. Everything on it is derived from the student's own
 * `points` and `marks` — there is no second copy of their answer.
 *
 * `marks` are representative x-values, one per shaded region, rather than
 * region indices: an index means something different the moment an endpoint
 * moves, whereas "the student shaded the part around 4" survives it.
 */
function NumberLine({ min, max, points, marks, onTick, onRegion, readOnly = false, accent = '#7c3aed' }) {
  const span = max - min;
  const step = (W - PAD * 2) / span;
  const px = (n) => PAD + (n - min) * step;
  const ticks = [];
  for (let n = min; n <= max; n++) ticks.push(n);

  const sorted = [...points].sort((a, b) => a.x - b.x);
  const bounds = [{ x: NEG_INF }, ...sorted, { x: POS_INF }];
  const regions = [];
  for (let i = 0; i < bounds.length - 1; i++) {
    const lo = bounds[i].x;
    const hi = bounds[i + 1].x;
    const loDraw = lo === NEG_INF ? min - 0.6 : lo;
    const hiDraw = hi === POS_INF ? max + 0.6 : hi;
    regions.push({
      i,
      lo,
      hi,
      loDraw,
      hiDraw,
      rep: repOf(lo, hi, min, max),
      shaded: marks.some((m) => markInside(m, lo, hi)),
    });
  }

  return (
    <svg viewBox={`0 0 ${W} 132`} className="w-full h-auto select-none" style={{ touchAction: 'manipulation' }}>
      {/* clickable band ABOVE the line: shade a region */}
      {!readOnly && regions.map((r) => (
        <rect
          key={`hit-r-${r.i}`}
          x={px(r.loDraw)}
          y={BAND_TOP}
          width={Math.max(2, px(r.hiDraw) - px(r.loDraw))}
          height={BAND_H}
          fill="transparent"
          className="cursor-pointer"
          onClick={() => onRegion(r)}
        />
      ))}
      {regions.filter((r) => r.shaded).map((r) => (
        <rect
          key={`fill-${r.i}`}
          x={px(r.loDraw)}
          y={BAND_TOP}
          width={Math.max(2, px(r.hiDraw) - px(r.loDraw))}
          height={BAND_H}
          fill={accent}
          opacity="0.14"
          rx="6"
          pointerEvents="none"
        />
      ))}
      {!readOnly && regions.filter((r) => !r.shaded).map((r) => (
        <text
          key={`plus-${r.i}`}
          x={(px(r.loDraw) + px(r.hiDraw)) / 2}
          y={BAND_TOP + BAND_H / 2 + 6}
          textAnchor="middle"
          fontSize="18"
          fontFamily="sans-serif"
          fill="#cbd5e1"
          fontWeight="bold"
          pointerEvents="none"
        >+</text>
      ))}

      {/* the axis */}
      <line x1={PAD - 22} y1={AXIS_Y} x2={W - PAD + 22} y2={AXIS_Y} stroke="#1e293b" strokeWidth="2.5" />
      <path d={`M ${PAD - 22} ${AXIS_Y} l 12 -6 l 0 12 z`} fill="#1e293b" />
      <path d={`M ${W - PAD + 22} ${AXIS_Y} l -12 -6 l 0 12 z`} fill="#1e293b" />

      {/* the solution bar, drawn ON the axis */}
      {regions.filter((r) => r.shaded).map((r) => (
        <g key={`bar-${r.i}`} pointerEvents="none">
          <line
            x1={px(r.loDraw)}
            y1={AXIS_Y}
            x2={px(r.hiDraw)}
            y2={AXIS_Y}
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="butt"
          />
          {r.lo === NEG_INF && <path d={`M ${px(min - 0.85)} ${AXIS_Y} l 13 -7 l 0 14 z`} fill={accent} />}
          {r.hi === POS_INF && <path d={`M ${px(max + 0.85)} ${AXIS_Y} l -13 -7 l 0 14 z`} fill={accent} />}
        </g>
      ))}

      {/* ticks */}
      {ticks.map((n) => (
        <g key={`t-${n}`}>
          <line x1={px(n)} y1={AXIS_Y - 6} x2={px(n)} y2={AXIS_Y + 6} stroke="#64748b" strokeWidth="1.5" pointerEvents="none" />
          <text
            x={px(n)}
            y={AXIS_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontFamily="monospace"
            fill="#475569"
            fontWeight="bold"
            pointerEvents="none"
          >{n}</text>
          {!readOnly && (
            <rect
              x={px(n) - step / 2}
              y={AXIS_Y - 4}
              width={step}
              height={44}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => onTick(n)}
            />
          )}
        </g>
      ))}

      {/* the endpoints */}
      {sorted.map((p) => (
        <circle
          key={`p-${p.x}`}
          cx={px(p.x)}
          cy={AXIS_Y}
          r="9"
          fill={p.closed ? accent : '#ffffff'}
          stroke={accent}
          strokeWidth="3.5"
          pointerEvents="none"
        />
      ))}
    </svg>
  );
}

// ------------------------------------------------------------ notation builder

const BR_LEFT = ['(', '['];
const BR_RIGHT = [')', ']'];

function BracketToggle({ value, options, onChange, disabled }) {
  return (
    <div className="flex gap-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          disabled={disabled}
          onClick={() => onChange(o)}
          className={`w-10 h-12 rounded-xl font-black text-2xl border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none
            ${value === o
              ? 'bg-[#7c3aed] border-[#5b21b6] text-white'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-[#7c3aed]'}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function EndField({ value, onChange, infinity, disabled }) {
  const isInf = value === '-inf' || value === 'inf';
  return (
    <div className="flex items-center gap-1">
      <input
        value={isInf ? (value === '-inf' ? '−∞' : '∞') : value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={isInf}
        inputMode="numeric"
        placeholder="?"
        className={`w-16 h-12 rounded-xl border-2 border-b-[4px] bg-white dark:bg-slate-900 font-black text-lg text-center focus:outline-none focus:border-[#7c3aed] disabled:opacity-50
          ${isInf ? 'border-[#7c3aed] text-[#7c3aed] dark:text-violet-400' : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'}`}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(isInf ? '' : infinity)}
        title={infinity === '-inf' ? '−∞' : '∞'}
        className={`w-9 h-12 rounded-xl font-black text-base border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none
          ${isInf ? 'bg-[#7c3aed] border-[#5b21b6] text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-[#7c3aed]'}`}
      >
        {infinity === '-inf' ? '−∞' : '∞'}
      </button>
    </div>
  );
}

const emptyPiece = () => ({ loBr: '(', lo: '', hi: '', hiBr: ')' });
const pieceText = (p) => `${p.loBr}${p.lo || '?'},${p.hi || '?'}${p.hiBr}`;

// ------------------------------------------------------------------ the item

/**
 * One item, mounted with `key={item.id}` so moving on resets every bit of
 * working by construction rather than by remembering to clear it.
 */
function Item({ item, t, target, onScore, footer }) {
  const min = item.min ?? -8;
  const max = item.max ?? 8;
  const model = useMemo(() => graphOfSet(target), [target]);

  const [stage, setStage] = useState('graph');
  const [points, setPoints] = useState([]);
  const [marks, setMarks] = useState([]);
  const [graphMsg, setGraphMsg] = useState(null);   // { ok, text }
  const [pieces, setPieces] = useState([emptyPiece()]);
  const [writeMsg, setWriteMsg] = useState(null);
  const [revealed, setRevealed] = useState({ graph: false, write: false });

  const graphLocked = graphMsg?.ok || revealed.graph;
  const writeLocked = writeMsg?.ok || revealed.write;

  /** Tap a number: place → fill in → take away. */
  const tapTick = (n) => {
    if (graphLocked) return;
    setGraphMsg(null);
    setPoints((ps) => {
      const at = ps.findIndex((p) => p.x === n);
      if (at === -1) return ps.length >= 2 ? ps : [...ps, { x: n, closed: false }];
      if (!ps[at].closed) return ps.map((p, i) => (i === at ? { ...p, closed: true } : p));
      return ps.filter((_, i) => i !== at);
    });
  };

  const tapRegion = (r) => {
    if (graphLocked) return;
    setGraphMsg(null);
    setMarks((ms) => (r.shaded
      ? ms.filter((m) => !markInside(m, r.lo, r.hi))
      : [...ms, r.rep]));
  };

  const clearGraph = () => { setPoints([]); setMarks([]); setGraphMsg(null); };

  /** The set the student has drawn, read back the way the marking reads it. */
  const drawn = useMemo(() => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    const bounds = [{ x: NEG_INF }, ...sorted, { x: POS_INF }];
    const shaded = new Set();
    for (let i = 0; i < bounds.length - 1; i++) {
      if (marks.some((m) => markInside(m, bounds[i].x, bounds[i + 1].x))) shaded.add(i);
    }
    return setFromGraph(sorted, shaded);
  }, [points, marks]);

  const checkGraph = () => {
    if (graphLocked) return;
    if (!marks.length) { setGraphMsg({ ok: false, text: t.needShade }); return; }
    if (sameSet(drawn, target)) {
      setGraphMsg({ ok: true, text: t.right });
      onScore(item.id, 'graph', true);
      setStage('write');
      return;
    }
    // Say WHICH of the three decisions went wrong, in the order they are made.
    const mine = normalize(drawn);
    const want = normalize(target);
    const myX = points.map((p) => p.x).sort((a, b) => a - b).join(',');
    const wantX = model.points.map((p) => p.x).join(',');
    let why = t.graphWrongPoints;
    if (myX === wantX) {
      const fillWrong = model.points.some((p) => {
        const mineP = points.find((q) => q.x === p.x);
        return mineP && mineP.closed !== p.closed;
      });
      why = fillWrong ? t.graphWrongFill : t.graphWrongShade;
      if (!fillWrong && mine.length === want.length && mine.every((iv, i) => iv.lo === want[i].lo && iv.hi === want[i].hi)) {
        why = t.graphWrongFill;
      }
    }
    setGraphMsg({ ok: false, text: why });
    onScore(item.id, 'graph', false);
  };

  const revealGraph = () => {
    setPoints(model.points.map((p) => ({ ...p })));
    const bounds = [{ x: NEG_INF }, ...model.points, { x: POS_INF }];
    setMarks(model.shaded.map((i) => repOf(bounds[i].x, bounds[i + 1].x, min, max)));
    setRevealed((r) => ({ ...r, graph: true }));
    setGraphMsg({ ok: false, text: `${t.answerIs}: ${notationText(target)}` });
    onScore(item.id, 'graph', false);
    setStage('write');
  };

  const checkWrite = () => {
    if (writeLocked) return;
    const typed = pieces.map(pieceText).join(' U ');
    const read = parseNotation(typed);
    if (read.error) {
      const text = read.error === 'infinity' ? t.errInfinity
        : read.error === 'order' ? t.errOrder
        : t.errShape;
      setWriteMsg({ ok: false, text });
      onScore(item.id, 'write', false);
      return;
    }
    if (sameSet(read.set, target)) {
      setWriteMsg({ ok: true, text: t.right });
      onScore(item.id, 'write', true);
      return;
    }
    const mine = normalize(read.set);
    const want = normalize(target);
    let why = t.wrongNumbers;
    if (mine.length !== want.length) why = t.wrongPieces;
    else if (mine.every((iv, i) => iv.lo === want[i].lo && iv.hi === want[i].hi)) why = t.wrongBracket;
    setWriteMsg({ ok: false, text: why });
    onScore(item.id, 'write', false);
  };

  const revealWrite = () => {
    setRevealed((r) => ({ ...r, write: true }));
    setWriteMsg({ ok: false, text: `${t.answerIs}: ${notationText(target)}` });
    onScore(item.id, 'write', false);
  };

  const setPiece = (i, patch) => {
    if (writeLocked) return;
    setWriteMsg(null);
    setPieces((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  };

  const done = (graphMsg?.ok || revealed.graph) && (writeMsg?.ok || revealed.write);

  return (
    // One column on a phone; from lg the graph sits on the left and the
    // notation on the right, so both stages of the same set are on screen
    // together and the second no longer starts below the fold.
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
      {/* ---- stage 1: the picture ---- */}
      <div className={`bg-white dark:bg-slate-900 rounded-3xl border-2 shadow-sm p-4 sm:p-6 transition-colors
        ${stage === 'graph' && !graphLocked ? 'border-[#7c3aed]' : 'border-slate-200 dark:border-slate-800'}`}>
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="w-4 h-4 text-[#7c3aed] shrink-0" strokeWidth={3} />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#7c3aed]">{t.stage1}</span>
          {graphMsg?.ok && <Check className="w-5 h-5 text-[#58cc02] ml-auto" strokeWidth={3} />}
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-2 sm:p-3">
          <NumberLine
            min={min}
            max={max}
            points={points}
            marks={marks}
            onTick={tapTick}
            onRegion={tapRegion}
            readOnly={graphLocked}
          />
        </div>

        {!graphLocked && (
          <>
            <p className="mt-3 text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 leading-relaxed">{t.howGraph}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={checkGraph}
                className="flex-1 min-w-[10rem] py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all"
              >
                {t.checkGraph}
              </button>
              <button onClick={clearGraph}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} /> {t.clear}
              </button>
              <button onClick={revealGraph}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.showMe}
              </button>
            </div>
          </>
        )}

        {graphMsg && <Feedback msg={graphMsg} t={t} />}

        {/* The two circles named, always on screen while the picture is being
            built. The distinction is the entire content of stage 1. */}
        {!graphLocked && (
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="#fff" stroke="#7c3aed" strokeWidth="3" /></svg>
              {t.openLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="#7c3aed" stroke="#7c3aed" strokeWidth="3" /></svg>
              {t.closedLabel}
            </span>
          </div>
        )}
      </div>

      {/* ---- stage 2: the notation ---- */}
      <div className="flex flex-col gap-4 min-w-0">
      <div className={`bg-white dark:bg-slate-900 rounded-3xl border-2 shadow-sm p-4 sm:p-6 transition-all
        ${stage === 'write' && !writeLocked ? 'border-[#7c3aed]' : 'border-slate-200 dark:border-slate-800'}
        ${stage === 'graph' ? 'opacity-45 pointer-events-none' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <Brackets className="w-4 h-4 text-[#7c3aed] shrink-0" strokeWidth={3} />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#7c3aed]">{t.stage2}</span>
          {writeMsg?.ok && <Check className="w-5 h-5 text-[#58cc02] ml-auto" strokeWidth={3} />}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
          {pieces.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-2xl font-black text-[#7c3aed] px-1" title={t.union}>∪</span>
              )}
              <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700">
                <BracketToggle value={p.loBr} options={BR_LEFT} onChange={(v) => setPiece(i, { loBr: v })} disabled={writeLocked} />
                <EndField value={p.lo} onChange={(v) => setPiece(i, { lo: v })} infinity="-inf" disabled={writeLocked} />
                <span className="font-black text-xl text-slate-400">,</span>
                <EndField value={p.hi} onChange={(v) => setPiece(i, { hi: v })} infinity="inf" disabled={writeLocked} />
                <BracketToggle value={p.hiBr} options={BR_RIGHT} onChange={(v) => setPiece(i, { hiBr: v })} disabled={writeLocked} />
                {i > 0 && !writeLocked && (
                  <button
                    onClick={() => setPieces((ps) => ps.filter((_, j) => j !== i))}
                    title={t.removePiece}
                    className="w-8 h-12 rounded-xl text-slate-300 hover:text-rose-500"
                  >
                    <X className="w-5 h-5 mx-auto" strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {pieces.length < 2 && !writeLocked && (
            <button
              onClick={() => setPieces((ps) => [...ps, emptyPiece()])}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#7c3aed] border-2 border-dashed border-[#7c3aed]/50 hover:bg-[#7c3aed]/5"
            >
              <span className="text-lg leading-none">∪</span> {t.addPiece}
            </button>
          )}
        </div>

        {writeLocked && (
          <div className="text-center mt-2 font-mono font-black text-2xl text-slate-800 dark:text-slate-100">
            {notationText(target)}
          </div>
        )}

        {!writeLocked && (
          <>
            <p className="mt-3 text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 leading-relaxed">{t.howWrite}</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={checkWrite}
                className="flex-1 min-w-[10rem] py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all"
              >
                {t.checkWrite}
              </button>
              <button onClick={revealWrite}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.showMe}
              </button>
            </div>
          </>
        )}

        {writeMsg && <Feedback msg={writeMsg} t={t} />}
      </div>

      {done && footer()}
      </div>
    </div>
  );
}

function Feedback({ msg, t }) {
  return (
    <div className={`mt-3 flex items-start gap-2.5 p-3 sm:p-4 rounded-2xl border-2 animate-in fade-in slide-in-from-top-1 duration-200
      ${msg.ok
        ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-[#7bd42f]'
        : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
      {msg.ok
        ? <Check className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
        : <CircleDot className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />}
      <p className="font-bold text-sm sm:text-base leading-relaxed">{msg.ok ? t.right : msg.text}</p>
    </div>
  );
}

export default function IntervalLine({ pool = [], onComplete, onQuit }) {
  const items = useMemo(
    () => pool.map((it) => {
      try { return { ...it, target: parseInequality(it.solution) }; }
      catch { return null; }
    }).filter(Boolean),
    [pool]
  );

  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState('en');
  const [results, setResults] = useState({});   // id -> { graph, write }

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];

  // A stage's mark is decided by its FIRST answer and never revised — trying
  // again is free and is how the feedback teaches, but the mark has gone.
  const score = (id, stageKey, ok) =>
    setResults((r) => (r[id]?.[stageKey] !== undefined ? r : { ...r, [id]: { ...r[id], [stageKey]: ok } }));

  const finish = () => {
    if (!items.length) { onComplete?.(0); return; }
    const log = items.map((q) => ({
      itemId: q.id,
      correct: !!(results[q.id]?.graph && results[q.id]?.write),
    }));
    // Two marks per item — the picture and the notation are separate skills and
    // a student who can draw it but not write it should not score zero.
    const earned = items.reduce(
      (s, q) => s + (results[q.id]?.graph ? 1 : 0) + (results[q.id]?.write ? 1 : 0), 0);
    onComplete?.(Math.round((earned / (items.length * 2)) * 10), null, { items: log });
  };

  // The X saves whatever has been marked so far; with nothing marked it just closes.
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const next = () => {
    if (idx < items.length - 1) setIdx((i) => i + 1);
    else finish();
  };

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-violet-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No number lines yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const prompt = lang === 'vn' ? (item.promptVn || item.prompt) : item.prompt;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={quit}
        modeTitle={t.title}
        current={idx + 1}
        total={items.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
      />

      <div className="flex-1 w-full max-w-3xl lg:max-w-6xl mx-auto p-4 sm:p-5 pb-10">
        <div className="text-center mb-4">
          {prompt && <p className="text-slate-500 dark:text-slate-400 font-bold mb-3">{prompt}</p>}
          {/* The statement, and nothing beside it. An icon here competes with
              the notation for the one thing the student has to read. */}
          <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-b-[5px] border-[#7c3aed] shadow-sm">
            <span className="font-mono font-black text-2xl sm:text-3xl text-slate-800 dark:text-slate-100 tracking-tight">
              {item.display || inequalityText(item.target)}
            </span>
          </div>
        </div>

        <Item
          key={item.id}
          item={item}
          t={t}
          target={item.target}
          onScore={score}
          footer={() => (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#7c3aed] flex items-center justify-center shadow-sm shrink-0">
                    <PartyPopper className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-black text-lg text-slate-800 dark:text-slate-100">
                      {notationText(item.target)}
                    </div>
                    <div className="text-xs font-bold text-slate-400">
                      {(results[item.id]?.graph ? 1 : 0) + (results[item.id]?.write ? 1 : 0)}/2 {t.scored}
                    </div>
                  </div>
                </div>
                <button
                  onClick={next}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#7c3aed] border-b-[5px] border-[#5b21b6] text-white hover:bg-[#6d28d9] active:border-b-0 active:translate-y-[5px] transition-all"
                >
                  {idx < items.length - 1 ? t.next : t.finish}
                  <ArrowRight className="w-5 h-5 ml-2 shrink-0" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
