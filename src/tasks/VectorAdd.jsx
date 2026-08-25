import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Triangle, Move3d,
  Sigma, Compass, Lightbulb, RotateCcw, Ruler,
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import TopBar from '../components/TopBar';
import {
  componentsOf, resultantOf, norm360, toRad, toDeg,
  round1, signed, closeEnough, diagnose, radianTrap, gridFor,
} from '../utils/vectors';

/* ------------------------------------------------------------------ *
 * VECTORS — "resolve, add down the columns, rebuild".
 *
 * The student is given two forces, each as a magnitude and a direction, and
 * walks the standard component method:
 *
 *   1. resolve force A into Ax and Ay        (the triangle under A)
 *   2. resolve force B into Bx and By        (the triangle under B)
 *   3. add down each column → Rx, Ry         (the tip-to-tail chain)
 *   4. rebuild the resultant → |R| and θ     (the triangle under R)
 *
 * Reads a unit's `vectorAdd` array:
 *   [{
 *      id: 'v1',
 *      prompt, promptVn,                      // the scenario, one sentence
 *      unitLabel: 'N',                        // axis units, default N
 *      vectors: [
 *        { name: 'A', mag: 60, angle: 30, label, labelVn },
 *        { name: 'B', mag: 40, angle: 110, label, labelVn },
 *      ],
 *   }]
 *
 * EVERY ANSWER IS DERIVED FROM `vectors`, NOT TYPED BY THE AUTHOR — components
 * are F·cos θ and F·sin θ, the resultant is the component sum, and the grid is
 * sized from the arrows (src/utils/vectors.js). An author cannot get an answer
 * key wrong, and editing a force cannot leave a stale one behind. It is the
 * same rule Graph It follows for the vertex and the zeros.
 *
 * WHY THE UI LOOKS LIKE THIS. What makes vectors click is seeing that the
 * numbers you write and the picture you draw are the same object, so:
 *
 *   - The inputs are laid out as the COMPONENT TABLE (rows A, B, R; columns x,
 *     y). The method is the shape of the table — you literally add down a
 *     column — instead of being a rule to remember.
 *   - Everything typed is DRAWN AS YOU TYPE, in indigo, as the student's own
 *     right triangle. A wrong Ax visibly fails to reach under A's tip; a right
 *     one lands on the arrowhead. The feedback is geometric before it is verbal.
 *   - Stage 3 shows the tip-to-tail chain with the x-legs laid end to end along
 *     the axis, so "add the x's" is a picture, not an instruction.
 *   - Stage 4 draws the typed magnitude as a circle and the typed angle as a
 *     ray. Where they cross is where the student says the force ends — right on
 *     the arrowhead when both are right.
 *
 * SCORING: one mark per box — eight per problem. A box only pays if it was
 * right the first time it was checked, but a wrong box must still be fixed
 * before the stage advances, because the next stage is built on it.
 * ------------------------------------------------------------------ */

const SKY = '#1cb0f6';        // force A
const PLUM = '#ce82ff';       // force B
const GREEN = '#58cc02';      // the resultant, and an accepted answer
const AMBER = '#f59e0b';      // every x-component, everywhere
const PINK = '#ec4899';       // every y-component, everywhere
const INDIGO = '#6366f1';     // the student's own construction
const RED = '#ff4b4b';
const SLATE = '#94a3b8';

/** Colour per force, by position. Authors never pick these. */
const VECTOR_COLORS = [SKY, PLUM, '#14b8a6', '#f97316'];

const EN = {
  title: 'Vectors',
  step: 'Step',
  of: 'of',
  resolve: 'Break force {n} into its x and y parts',
  resolveSub: 'Read the triangle: the flat leg is x, the upright leg is y.',
  sum: 'Add down each column',
  sumSub: 'All the x-parts make Rx. All the y-parts make Ry.',
  polar: 'Rebuild the resultant',
  polarSub: 'Pythagoras gives the size; tan⁻¹ gives the direction.',
  check: 'Check',
  next: 'Next problem',
  finish: 'Finish',
  clean: 'All eight boxes right first time. Full marks.',
  helped: 'Solved — but some boxes took more than one try.',
  wrong: 'Not right yet. Look at where your triangle lands.',
  empty: 'Type a number in both boxes first.',
  scoreLine: 'boxes right first time',
  tipToTail: 'Tip to tail',
  parallelogram: 'Parallelogram',
  at: 'at',
  square: 'square',
  degreesNote: 'Angles run anticlockwise from the +x axis.',
  reasons: {
    sincos: 'You used sin where cos belongs (or the other way round). The flat leg is F·cos θ; the upright leg is F·sin θ.',
    sign: 'Right size, wrong sign. Look at which way that part points — left and down are negative.',
    radians: 'Your calculator is in RADIAN mode. Switch it to degrees and try again.',
    whole: "That's the whole force, not one of its parts. A part is never longer than the force itself.",
    swapped: 'You have the x and y answers the other way round.',
    addedmags: 'You added the two sizes. Forces only add like that when they point the same way — these do not.',
    addedcomp: 'You added Rx and Ry. They meet at a right angle, so it takes Pythagoras, not a plus sign.',
    refangle: "That's the angle inside the triangle. Turn it into an angle measured from the +x axis.",
    quadrant: 'tan⁻¹ on its own cannot tell two opposite directions apart. Check the signs of Rx and Ry, then fix the quadrant.',
    fromy: 'You measured from the y-axis. Measure anticlockwise from the +x axis instead.',
  },
};

const VN = {
  title: 'Vectơ',
  step: 'Bước',
  of: 'trên',
  resolve: 'Phân tích lực {n} thành phần x và phần y',
  resolveSub: 'Đọc tam giác: cạnh nằm ngang là x, cạnh dựng đứng là y.',
  sum: 'Cộng theo từng cột',
  sumSub: 'Tất cả phần x cộng lại thành Rx. Tất cả phần y cộng lại thành Ry.',
  polar: 'Dựng lại lực tổng hợp',
  polarSub: 'Pytago cho độ lớn; tan⁻¹ cho hướng.',
  check: 'Kiểm tra',
  next: 'Bài tiếp theo',
  finish: 'Kết thúc',
  clean: 'Cả tám ô đúng ngay lần đầu. Trọn điểm.',
  helped: 'Đã giải xong — nhưng vài ô phải thử nhiều lần.',
  wrong: 'Chưa đúng. Hãy nhìn xem tam giác của em dừng ở đâu.',
  empty: 'Hãy điền số vào cả hai ô trước.',
  scoreLine: 'ô đúng ngay lần đầu',
  tipToTail: 'Nối đuôi',
  parallelogram: 'Hình bình hành',
  at: 'hợp trục x góc',
  square: 'ô',
  degreesNote: 'Góc đo ngược chiều kim đồng hồ từ trục +x.',
  reasons: {
    sincos: 'Em dùng sin ở chỗ phải dùng cos (hoặc ngược lại). Cạnh nằm ngang là F·cos θ; cạnh dựng đứng là F·sin θ.',
    sign: 'Đúng độ lớn, sai dấu. Hãy xem phần đó chỉ về phía nào — sang trái và xuống dưới là âm.',
    radians: 'Máy tính của em đang ở chế độ RADIAN. Hãy chuyển sang độ rồi thử lại.',
    whole: 'Đó là cả lực, không phải một phần của nó. Một phần không bao giờ dài hơn chính lực đó.',
    swapped: 'Em đã đảo đáp án x và y cho nhau.',
    addedmags: 'Em đã cộng hai độ lớn. Lực chỉ cộng như vậy khi chúng cùng hướng — hai lực này thì không.',
    addedcomp: 'Em đã cộng Rx và Ry. Chúng gặp nhau ở góc vuông nên phải dùng Pytago, không phải dấu cộng.',
    refangle: 'Đó là góc bên trong tam giác. Hãy đổi nó thành góc đo từ trục +x.',
    quadrant: 'Chỉ tan⁻¹ thì không phân biệt được hai hướng ngược nhau. Hãy xem dấu của Rx và Ry rồi sửa lại góc phần tư.',
    fromy: 'Em đã đo từ trục y. Hãy đo ngược chiều kim đồng hồ từ trục +x.',
  },
};

const strip = (s) => String(s).replace(/[\u200B-\u200D\uFEFF]/g, '');
/** KaTeX, rendered outside the try so a render error cannot escape a boundary. */
const Math$ = ({ math }) => {
  let html;
  try {
    const k = katex.default || katex;
    html = k.renderToString(strip(math), { throwOnError: true });
  } catch {
    html = null;
  }
  return html
    ? <span dangerouslySetInnerHTML={{ __html: html }} />
    : <span className="text-rose-500 font-mono text-sm">{math}</span>;
};

/**
 * Typed text → number. A Vietnamese keyboard writes decimals with a comma and
 * the app writes minus signs as U+2212, so both have to come back as a number
 * rather than as a mistake the student did not make.
 */
function parseNum(text) {
  if (typeof text !== 'string') return NaN;
  const cleaned = text
    .trim()
    .replace(/[−–—]/g, '-')
    .replace(/,/g, '.')
    .replace(/[^0-9.+-]/g, '');
  if (!cleaned || !/\d/.test(cleaned)) return NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

/** The stages of the method, derived from however many forces there are. */
const stagesOf = (item) => [
  ...item.vectors.map((_, i) => ({ kind: 'resolve', vi: i })),
  { kind: 'sum' },
  { kind: 'polar' },
];

/** The two box keys a stage owns. */
const fieldsOf = (stage) =>
  stage.kind === 'resolve' ? [`v${stage.vi}x`, `v${stage.vi}y`]
    : stage.kind === 'sum' ? ['rx', 'ry']
      : ['mag', 'ang'];

/** Every derived answer for one problem, keyed the same way as the boxes. */
function answersOf(item) {
  const out = {};
  item.vectors.forEach((v, i) => {
    const c = componentsOf(v);
    out[`v${i}x`] = c.x;
    out[`v${i}y`] = c.y;
  });
  const r = resultantOf(item.vectors);
  out.rx = r.x;
  out.ry = r.y;
  out.mag = r.mag;
  out.ang = r.angle;
  return out;
}

/**
 * The mistakes worth naming for one box, most specific first.
 *
 * Every entry is a number the student would have got by making one identifiable
 * error, so the feedback can say what they did rather than only that they are
 * wrong. `diagnose` drops any trap that coincides with the real answer, so a
 * coincidence is never reported as a blunder.
 */
function trapsFor(key, item, ans) {
  const totalMag = item.vectors.reduce((s, v) => s + v.mag, 0);
  const resolved = /^v(\d+)([xy])$/.exec(key);

  if (resolved) {
    const v = item.vectors[Number(resolved[1])];
    const axis = resolved[2];
    return [
      ['sincos', ans[`v${resolved[1]}${axis === 'x' ? 'y' : 'x'}`]],
      ['radians', radianTrap(v, axis)],
      ['sign', -ans[key]],
      ['whole', v.mag],
    ];
  }
  if (key === 'rx' || key === 'ry') {
    return [
      ['swapped', key === 'rx' ? ans.ry : ans.rx],
      ['sign', -ans[key]],
      ['addedmags', totalMag],
    ];
  }
  if (key === 'mag') {
    return [
      ['addedmags', totalMag],
      ['addedcomp', ans.rx + ans.ry],
      ['sign', -ans.mag],
    ];
  }
  // The direction. Every one of these is a real exam-script mistake.
  return [
    ['quadrant', norm360(toDeg(Math.atan(ans.ry / ans.rx)))],
    ['refangle', Math.abs(toDeg(Math.atan(ans.ry / ans.rx)))],
    ['fromy', norm360(90 - ans.ang)],
    ['radians', toRad(ans.ang)],
  ];
}

/* --------------------------------------------------------- drawing helpers */

/** A force arrow: a shaft stopped short of a solid head, so nothing overshoots. */
function Arrow({ x1, y1, x2, y2, color, width = 5, opacity = 1, head = 15 }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const h = Math.min(head, len * 0.55);
  const ux = dx / len;
  const uy = dy / len;
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  const px = -uy * h * 0.42;
  const py = ux * h * 0.42;
  return (
    <g opacity={opacity} pointerEvents="none">
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
}

/** A label that stays readable wherever it lands, via a halo of page colour. */
function Tag({ x, y, children, color, size = 15, anchor = 'middle', mono = true, weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight}
      fontFamily={mono ? 'ui-monospace, monospace' : 'ui-sans-serif, system-ui, sans-serif'}
      fill={color} strokeWidth="4.5" paintOrder="stroke"
      className="stroke-white dark:stroke-slate-900" pointerEvents="none">
      {children}
    </text>
  );
}

export default function VectorAdd({ pool = [], onComplete, onQuit }) {
  const items = useMemo(
    () => pool.filter((it) => it && Array.isArray(it.vectors) && it.vectors.length >= 2),
    [pool]
  );

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [entries, setEntries] = useState({});   // key -> raw typed text
  const [locked, setLocked] = useState({});     // key -> true once accepted
  const [dirty, setDirty] = useState({});       // key -> true once checked wrong
  const [errors, setErrors] = useState({});     // key -> reason code | 'wrong'
  const [results, setResults] = useState({});   // itemId -> { clean, total }
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(null);
  const [view, setView] = useState('chain');    // 'chain' | 'parallelogram'
  const firstBox = useRef(null);

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];

  const stages = useMemo(() => (item ? stagesOf(item) : []), [item]);
  const ans = useMemo(() => (item ? answersOf(item) : {}), [item]);
  const grid = useMemo(() => (item ? (item.grid || gridFor(item.vectors)) : null), [item]);
  const stage = stages[stageIdx];

  // Focus the first box of every new stage, so the student's hands never leave
  // the keyboard between "read the triangle" and "type the number".
  useEffect(() => { firstBox.current?.focus(); }, [stageIdx, idx]);

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-sky-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No vector problems yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const unitLabel = item.unitLabel || 'N';
  const colorOf = (i) => item.vectors[i].color || VECTOR_COLORS[i % VECTOR_COLORS.length];
  const totalFields = stages.length * 2;

  /* ---------------------------------------------------------- geometry */

  // One newton is the same number of pixels on both axes — a squashed axis
  // would draw a 30° force at some other angle, which is the whole subject.
  const U = 62 / grid.step;
  const PAD = 34;
  const W = (grid.xMax - grid.xMin) * U + PAD * 2;
  const H = (grid.yMax - grid.yMin) * U + PAD * 2;
  const X = (x) => PAD + (x - grid.xMin) * U;
  const Y = (y) => PAD + (grid.yMax - y) * U;

  const comps = item.vectors.map((v) => componentsOf(v));
  // chain[j] is where force j starts when the forces are laid tip to tail.
  const chain = comps.reduce((acc, c) => {
    const prev = acc[acc.length - 1];
    acc.push({ x: prev.x + c.x, y: prev.y + c.y });
    return acc;
  }, [{ x: 0, y: 0 }]);
  const tip = chain[chain.length - 1];

  const ticks = (from, to) => {
    const out = [];
    for (let v = from; v <= to + 1e-9; v += grid.step) out.push(Math.round(v * 1e6) / 1e6);
    return out;
  };

  /** Arc of the angle at the origin, from the +x axis round to `deg`. */
  const arcPath = (r, deg) => {
    const a = norm360(deg);
    return `M${X(0) + r},${Y(0)} A${r},${r} 0 ${a > 180 ? 1 : 0} 0 ` +
      `${X(0) + r * Math.cos(toRad(a))},${Y(0) - r * Math.sin(toRad(a))}`;
  };

  /* ------------------------------------------------------------ answers */

  const valueOf = (key) => parseNum(entries[key] ?? '');
  const keys = fieldsOf(stage);

  const say = (kind, text) => {
    setFlash({ kind, text });
    setTimeout(() => setFlash((f) => (f && f.text === text ? null : f)), 4000);
  };

  const kindOf = (key) => (key === 'ang' ? 'angle' : 'linear');

  const check = () => {
    if (done) return;
    const typed = keys.map(valueOf);
    if (typed.some((v) => !Number.isFinite(v))) { say('bad', t.empty); return; }

    const nextErrors = {};
    const nextLocked = { ...locked };
    const nextDirty = { ...dirty };
    const settled = {};
    let allRight = true;

    keys.forEach((key, i) => {
      if (closeEnough(typed[i], ans[key], kindOf(key))) {
        nextLocked[key] = true;
        // Show the rounded value back, so the table the student ends up looking
        // at is the table they should have written.
        settled[key] = signed(round1(ans[key]));
        return;
      }
      allRight = false;
      nextDirty[key] = true;
      const code = diagnose(typed[i], trapsFor(key, item, ans), kindOf(key), ans[key]);
      nextErrors[key] = code && t.reasons[code] ? code : 'wrong';
    });

    setLocked(nextLocked);
    setDirty(nextDirty);
    setErrors(nextErrors);
    if (Object.keys(settled).length) setEntries((e) => ({ ...e, ...settled }));

    if (!allRight) { say('bad', t.wrong); return; }

    setFlash(null);
    const clean = keys.filter((k) => !nextDirty[k]).length;
    setResults((r) => {
      const prev = r[item.id] || { clean: 0, total: totalFields };
      return { ...r, [item.id]: { clean: prev.clean + clean, total: totalFields } };
    });
    if (stageIdx + 1 < stages.length) setStageIdx((s) => s + 1);
    else setDone(true);
  };

  const nextItem = () => {
    if (idx + 1 < items.length) {
      setIdx((i) => i + 1);
      setStageIdx(0);
      setEntries({}); setLocked({}); setDirty({}); setErrors({});
      setDone(false); setFlash(null); setView('chain');
    } else {
      const rows = items.map((it) => results[it.id] || { clean: 0, total: stagesOf(it).length * 2 });
      const clean = rows.reduce((s, r) => s + r.clean, 0);
      const total = rows.reduce((s, r) => s + r.total, 0);
      const log = items.map((it) => {
        const r = results[it.id];
        return { itemId: it.id, correct: !!r && r.clean === r.total };
      });
      onComplete?.(total ? Math.round((clean / total) * 10) : 0, null, { items: log });
    }
  };

  /** Editing a box takes back the red — the picture follows the keystrokes. */
  const edit = (key, text) => {
    setEntries((s) => ({ ...s, [key]: text }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  /* -------------------------------------------------- what to draw now */

  const active = done ? -1 : stage.kind === 'resolve' ? stage.vi : -1;
  const showChain = done || stage.kind === 'sum' || stage.kind === 'polar';
  const showResultant = done || stage.kind === 'polar';
  const parallelogram = view === 'parallelogram' && showChain && item.vectors.length === 2;
  const checkedWrong = keys.some((k) => errors[k]);

  // The student's own construction, from whatever is typed right now.
  const ghost = done ? null
    : stage.kind === 'polar'
      ? { kind: 'polar', mag: valueOf('mag'), ang: valueOf('ang') }
      : { kind: 'legs', x: valueOf(keys[0]), y: valueOf(keys[1]) };

  // By reason, not by box: both boxes of a stage usually fail the same way
  // (one sin/cos swap resolves into two wrong numbers), and printing the same
  // sentence twice reads as two separate problems.
  const errorList = [...new Set(keys.map((k) => errors[k]).filter((c) => c && c !== 'wrong'))];

  const formula =
    stage.kind === 'resolve'
      ? 'F_x = F\\cos\\theta \\qquad F_y = F\\sin\\theta'
      : stage.kind === 'sum'
        ? 'R_x = \\sum F_x \\qquad R_y = \\sum F_y'
        : '|R| = \\sqrt{R_x^{2} + R_y^{2}} \\qquad \\theta = \\tan^{-1}\\!\\left(\\frac{R_y}{R_x}\\right)';

  const stageTitle =
    stage.kind === 'resolve' ? t.resolve.replace('{n}', item.vectors[stage.vi].name)
      : stage.kind === 'sum' ? t.sum : t.polar;
  const stageSub =
    stage.kind === 'resolve' ? t.resolveSub : stage.kind === 'sum' ? t.sumSub : t.polarSub;
  const StageIcon = stage.kind === 'resolve' ? Triangle : stage.kind === 'sum' ? Sigma : Compass;

  const itemResult = results[item.id];
  const boxCtx = { entries, edit, locked, errors, keys, done, check, firstBox };

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

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">

        {/* The problem: the scenario, then each force exactly as it was given. */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-3 sm:p-4">
          {(item.prompt || item.promptVn) && (
            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base mb-2.5 leading-snug">
              {lang === 'vn' ? (item.promptVn || item.prompt) : item.prompt}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {item.vectors.map((v, i) => (
              <div key={v.name}
                className="flex items-center gap-2 rounded-xl px-3 py-2 border-2"
                style={{ borderColor: colorOf(i), backgroundColor: `${colorOf(i)}14` }}>
                <span className="font-black text-white text-xs w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: colorOf(i) }}>{v.name}</span>
                <span className="font-mono font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 tabular-nums">
                  {v.mag} {unitLabel} {t.at} {v.angle}°
                </span>
                {(v.label || v.labelVn) && (
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
                    {lang === 'vn' ? (v.labelVn || v.label) : v.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What to do now, with the formula it needs */}
        {!done ? (
          <div className="rounded-2xl border-2 shadow-sm p-3 flex items-center gap-3"
            style={{ borderColor: SKY, backgroundColor: 'rgba(28,176,246,0.08)' }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: SKY }}>
              <StageIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.step} {stageIdx + 1} {t.of} {stages.length}
              </div>
              <div className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-tight">{stageTitle}</div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">{stageSub}</div>
            </div>
            <div className="hidden md:block shrink-0 text-slate-700 dark:text-slate-200 text-sm">
              <Math$ math={formula} />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 shadow-sm p-3 flex items-center gap-3"
            style={{ borderColor: GREEN, backgroundColor: 'rgba(88,204,2,0.10)' }}>
            <CheckCircle2 className="w-7 h-7 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
            <div className="font-black text-sm sm:text-lg text-slate-800 dark:text-slate-100">
              {itemResult && itemResult.clean === totalFields ? t.clean : t.helped}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-3">

          {/* ------------------------------------------------ THE PICTURE */}
          <div className="lg:flex-1 min-w-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2 flex flex-col">
            <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
              style={{ height: `min(56vh, ${H}px)`, width: 'auto', maxWidth: '100%', margin: '0 auto' }}
              className="block select-none rounded-xl">
              <rect x="0" y="0" width={W} height={H} rx="12" className="fill-white dark:fill-slate-900" />

              {ticks(grid.xMin, grid.xMax).map((x) => (
                <line key={`gv${x}`} x1={X(x)} y1={PAD} x2={X(x)} y2={H - PAD} strokeWidth="1"
                  className="stroke-slate-200 dark:stroke-slate-800" />
              ))}
              {ticks(grid.yMin, grid.yMax).map((y) => (
                <line key={`gh${y}`} x1={PAD} y1={Y(y)} x2={W - PAD} y2={Y(y)} strokeWidth="1"
                  className="stroke-slate-200 dark:stroke-slate-800" />
              ))}

              <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />
              <line x1={X(0)} y1={PAD} x2={X(0)} y2={H - PAD} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />

              {ticks(grid.xMin, grid.xMax).filter((x) => x !== 0).map((x) => (
                <Tag key={`tx${x}`} x={X(x)} y={Y(0) + 18} color={SLATE} size={12} weight={600}>{signed(x, 0)}</Tag>
              ))}
              {ticks(grid.yMin, grid.yMax).filter((y) => y !== 0).map((y) => (
                <Tag key={`ty${y}`} x={X(0) - 8} y={Y(y) + 4} color={SLATE} size={12} weight={600} anchor="end">{signed(y, 0)}</Tag>
              ))}
              <Tag x={W - PAD + 12} y={Y(0) + 5} color={SLATE} size={13} mono={false}>x</Tag>
              <Tag x={X(0)} y={PAD - 12} color={SLATE} size={13} mono={false}>y</Tag>

              {/* -- the parallelogram, when the student asks to see it -- */}
              {parallelogram && (
                <path d={`M${X(0)},${Y(0)} L${X(comps[0].x)},${Y(comps[0].y)} L${X(tip.x)},${Y(tip.y)} L${X(comps[1].x)},${Y(comps[1].y)} Z`}
                  fill={GREEN} fillOpacity="0.07" stroke={SLATE} strokeWidth="2" strokeDasharray="7 6" pointerEvents="none" />
              )}

              {/* -- each force drawn from the origin, as it was given -- */}
              {item.vectors.map((v, i) => {
                const c = comps[i];
                const lit = done || i === active || parallelogram || (showChain && i === 0);
                return (
                  <g key={`v${i}`}>
                    <Arrow x1={X(0)} y1={Y(0)} x2={X(c.x)} y2={Y(c.y)} color={colorOf(i)}
                      width={i === active ? 6 : 4.5} opacity={lit ? 1 : 0.25} />
                    {lit && (
                      <Tag x={X(c.x * 0.55) + (c.y >= 0 ? -16 : 16)} y={Y(c.y * 0.55) - 8} color={colorOf(i)} size={16}>
                        {v.name}
                      </Tag>
                    )}
                  </g>
                );
              })}

              {/* -- the right triangle under the force being resolved -- */}
              {active >= 0 && (() => {
                const c = comps[active];
                const col = colorOf(active);
                const name = item.vectors[active].name;
                return (
                  <g pointerEvents="none">
                    <path d={`M${X(0)},${Y(0)} L${X(c.x)},${Y(0)} L${X(c.x)},${Y(c.y)} Z`} fill={col} fillOpacity="0.09" />
                    <line x1={X(0)} y1={Y(0)} x2={X(c.x)} y2={Y(0)} stroke={AMBER} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
                    <line x1={X(c.x)} y1={Y(0)} x2={X(c.x)} y2={Y(c.y)} stroke={PINK} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
                    <Tag x={X(c.x / 2)} y={Y(0) + (c.y >= 0 ? 30 : -16)} color={AMBER} size={15}>{name}ₓ</Tag>
                    <Tag x={X(c.x) + (c.x >= 0 ? 26 : -26)} y={Y(c.y / 2)} color={PINK} size={15}>{name}ᵧ</Tag>
                    <path d={arcPath(44, item.vectors[active].angle)} fill="none" stroke={col} strokeWidth="2.5" />
                    <Tag x={X(0) + 68 * Math.cos(toRad(item.vectors[active].angle / 2))}
                      y={Y(0) - 68 * Math.sin(toRad(item.vectors[active].angle / 2)) + 5}
                      color={col} size={14}>{item.vectors[active].angle}°</Tag>
                  </g>
                );
              })()}

              {/* -- tip to tail: every later force redrawn from the last tip -- */}
              {showChain && !parallelogram && item.vectors.slice(1).map((v, k) => {
                const from = chain[k + 1];
                const to = chain[k + 2];
                return (
                  <g key={`c${k}`}>
                    <line x1={X(comps[k + 1].x)} y1={Y(comps[k + 1].y)} x2={X(to.x)} y2={Y(to.y)}
                      stroke={SLATE} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
                    <Arrow x1={X(from.x)} y1={Y(from.y)} x2={X(to.x)} y2={Y(to.y)} color={colorOf(k + 1)} width={5} />
                    <Tag x={X((from.x + to.x) / 2) + 18} y={Y((from.y + to.y) / 2) - 8} color={colorOf(k + 1)} size={16}>
                      {v.name}
                    </Tag>
                  </g>
                );
              })}

              {/* -- the x-parts laid end to end on the axis, and the y-parts up
                     the side: "add the x's" as a picture, not an instruction -- */}
              {stage.kind === 'sum' && !parallelogram && comps.map((c, i) => {
                const x0 = comps.slice(0, i).reduce((s, p) => s + p.x, 0);
                const y0 = comps.slice(0, i).reduce((s, p) => s + p.y, 0);
                return (
                  <g key={`stack${i}`} pointerEvents="none">
                    <line x1={X(x0)} y1={Y(0) + 15} x2={X(x0 + c.x)} y2={Y(0) + 15}
                      stroke={AMBER} strokeWidth="7" strokeLinecap="round" opacity={0.5 + 0.3 * i} />
                    <line x1={X(0) - 15} y1={Y(y0)} x2={X(0) - 15} y2={Y(y0 + c.y)}
                      stroke={PINK} strokeWidth="7" strokeLinecap="round" opacity={0.5 + 0.3 * i} />
                  </g>
                );
              })}

              {/* -- the resultant, and its own right triangle -- */}
              {showResultant && (
                <g pointerEvents="none">
                  <path d={`M${X(0)},${Y(0)} L${X(tip.x)},${Y(0)} L${X(tip.x)},${Y(tip.y)} Z`} fill={GREEN} fillOpacity="0.10" />
                  <line x1={X(0)} y1={Y(0)} x2={X(tip.x)} y2={Y(0)} stroke={AMBER} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
                  <line x1={X(tip.x)} y1={Y(0)} x2={X(tip.x)} y2={Y(tip.y)} stroke={PINK} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
                  <path d={arcPath(46, ans.ang)} fill="none" stroke={GREEN} strokeWidth="2.5" />
                  {done && (
                    <>
                      <Tag x={X(tip.x / 2)} y={Y(0) + (tip.y >= 0 ? 30 : -16)} color={AMBER} size={14}>{signed(round1(ans.rx))}</Tag>
                      <Tag x={X(tip.x) + (tip.x >= 0 ? 32 : -32)} y={Y(tip.y / 2)} color={PINK} size={14}>{signed(round1(ans.ry))}</Tag>
                      <Tag x={X(0) + 74 * Math.cos(toRad(ans.ang / 2))} y={Y(0) - 74 * Math.sin(toRad(ans.ang / 2)) + 5}
                        color={GREEN} size={14}>{signed(round1(ans.ang))}°</Tag>
                    </>
                  )}
                </g>
              )}
              {showChain && (
                <>
                  <Arrow x1={X(0)} y1={Y(0)} x2={X(tip.x)} y2={Y(tip.y)} color={GREEN} width={7} head={19} />
                  <Tag x={X(tip.x * 0.6) + (tip.y >= 0 ? 24 : -24)} y={Y(tip.y * 0.6) + 22} color={GREEN} size={17}>R</Tag>
                </>
              )}
              {done && (
                <Tag x={X(tip.x)} y={Y(tip.y) - 20} color={GREEN} size={15}>{signed(round1(ans.mag))} {unitLabel}</Tag>
              )}

              {/* -- THE STUDENT'S OWN CONSTRUCTION, live as they type -- */}
              {ghost?.kind === 'legs' && (Number.isFinite(ghost.x) || Number.isFinite(ghost.y)) && (() => {
                const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
                const gx = Number.isFinite(ghost.x) ? ghost.x : 0;
                const gy = Number.isFinite(ghost.y) ? ghost.y : 0;
                const cx = clamp(gx, grid.xMin, grid.xMax);
                const cy = clamp(gy, grid.yMin, grid.yMax);
                const col = checkedWrong ? RED : INDIGO;
                const both = Number.isFinite(ghost.x) && Number.isFinite(ghost.y);
                return (
                  <g pointerEvents="none">
                    {Number.isFinite(ghost.x) && (
                      <line x1={X(0)} y1={Y(0)} x2={X(cx)} y2={Y(0)} stroke={col} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                    )}
                    {Number.isFinite(ghost.y) && (
                      <line x1={X(cx)} y1={Y(0)} x2={X(cx)} y2={Y(cy)} stroke={col} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                    )}
                    {both && (
                      <>
                        <line x1={X(0)} y1={Y(0)} x2={X(cx)} y2={Y(cy)} stroke={col} strokeWidth="2.5" strokeDasharray="6 5" opacity="0.75" />
                        <circle cx={X(cx)} cy={Y(cy)} r="10" fill="none" stroke={col} strokeWidth="3.5" />
                        <circle cx={X(cx)} cy={Y(cy)} r="3.5" fill={col} />
                        <Tag x={X(cx)} y={Y(cy) - 18} color={col} size={13}>({signed(gx)}, {signed(gy)})</Tag>
                      </>
                    )}
                  </g>
                );
              })()}

              {/* -- stage 4: the typed size as a circle, the typed angle as a
                     ray. Where they cross is where the student says it ends. -- */}
              {ghost?.kind === 'polar' && (() => {
                const col = checkedWrong ? RED : INDIGO;
                const rOk = Number.isFinite(ghost.mag) && ghost.mag > 0;
                const aOk = Number.isFinite(ghost.ang);
                const reach = W + H;
                return (
                  <g pointerEvents="none">
                    {rOk && (
                      <circle cx={X(0)} cy={Y(0)} r={ghost.mag * U} fill="none" stroke={col}
                        strokeWidth="3" strokeDasharray="8 7" opacity="0.9" />
                    )}
                    {aOk && (
                      <line x1={X(0)} y1={Y(0)}
                        x2={X(0) + reach * Math.cos(toRad(ghost.ang))}
                        y2={Y(0) - reach * Math.sin(toRad(ghost.ang))}
                        stroke={col} strokeWidth="3" strokeDasharray="8 7" opacity="0.9" />
                    )}
                    {rOk && aOk && (
                      <>
                        <circle cx={X(ghost.mag * Math.cos(toRad(ghost.ang)))} cy={Y(ghost.mag * Math.sin(toRad(ghost.ang)))}
                          r="10" fill="none" stroke={col} strokeWidth="3.5" />
                        <circle cx={X(ghost.mag * Math.cos(toRad(ghost.ang)))} cy={Y(ghost.mag * Math.sin(toRad(ghost.ang)))}
                          r="3.5" fill={col} />
                      </>
                    )}
                  </g>
                );
              })()}

              <circle cx={X(0)} cy={Y(0)} r="4.5" className="fill-slate-700 dark:fill-slate-300" />
            </svg>

            <div className="shrink-0 flex items-center justify-between gap-2 px-1 pt-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate">
                {t.degreesNote} · 1 {t.square} = {grid.step} {unitLabel}
              </span>
              {showChain && item.vectors.length === 2 && (
                <div className="shrink-0 flex rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                  {[['chain', t.tipToTail], ['parallelogram', t.parallelogram]].map(([id, label]) => (
                    <button key={id} onClick={() => setView(id)}
                      className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition-colors ${view === id ? 'bg-[#58cc02] text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* -------------------------------------------- THE COMPONENT TABLE */}
          <div className="lg:w-[22rem] shrink-0 flex flex-col gap-3">
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-3">
              <div className="grid grid-cols-[2.2rem_1fr_1fr] gap-2 items-center">
                <span />
                <span className="text-center text-[10px] font-black uppercase tracking-widest rounded-lg py-1 text-white"
                  style={{ backgroundColor: AMBER }}>x ({unitLabel})</span>
                <span className="text-center text-[10px] font-black uppercase tracking-widest rounded-lg py-1 text-white"
                  style={{ backgroundColor: PINK }}>y ({unitLabel})</span>

                {item.vectors.map((v, i) => (
                  <Row key={v.name} name={v.name} color={colorOf(i)} fields={[`v${i}x`, `v${i}y`]} ctx={boxCtx} />
                ))}

                <span className="col-span-3 h-0.5 bg-slate-300 dark:bg-slate-600 my-0.5 rounded-full" />

                <Row name="R" color={GREEN} fields={['rx', 'ry']} ctx={boxCtx} />
              </div>

              <div className="mt-3 pt-3 border-t-2 border-dashed border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2">
                <PolarBox label={`|R| (${unitLabel})`} field="mag" icon={Ruler} color={GREEN} ctx={boxCtx} />
                <PolarBox label="θ (°)" field="ang" icon={Compass} color={GREEN} ctx={boxCtx} />
              </div>
            </div>

            {/* One line of verdict, then a named reason per wrong box */}
            <div className="min-h-[2rem] flex flex-col gap-2">
              {flash && (
                <div className="flex items-start gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-1"
                  style={{ color: flash.kind === 'bad' ? RED : GREEN }}>
                  {flash.kind === 'bad'
                    ? <XCircle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />
                    : <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />}
                  {flash.text}
                </div>
              )}
              {errorList.map((code) => (
                <div key={code} className="flex items-start gap-2 rounded-xl border-2 p-2.5"
                  style={{ borderColor: AMBER, backgroundColor: 'rgba(245,158,11,0.10)' }}>
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AMBER }} strokeWidth={2.5} />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
                    {t.reasons[code]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              {!done ? (
                <button onClick={check}
                  className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#1CB0F6] border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                  <Move3d className="w-4 h-4" strokeWidth={3} />
                  {t.check}
                </button>
              ) : (
                <button onClick={nextItem}
                  className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                  {idx + 1 < items.length ? t.next : t.finish}
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Running tally — the cost of a guess is never a surprise */}
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
          {Object.values(results).reduce((s, r) => s + r.clean, 0)}
          {' / '}
          {items.reduce((s, it) => s + stagesOf(it).length * 2, 0)} {t.scoreLine}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ boxes */

/** One row of the component table: a name chip and its x and y boxes. */
function Row({ name, color, fields, ctx }) {
  return (
    <>
      <span className="font-black text-white text-sm w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color }}>{name}</span>
      {fields.map((f) => <Box key={f} field={f} ctx={ctx} />)}
    </>
  );
}

/**
 * A single answer box.
 *
 * Three states, visually different on purpose: a box the student has not
 * reached is dimmed and inert, the two live boxes are outlined in the stage
 * colour, and an accepted box turns green and read-only — so the table builds
 * up into the finished working instead of staying editable.
 */
function Box({ field, ctx }) {
  const { entries, edit, locked, errors, keys, done, check, firstBox } = ctx;
  const live = keys.includes(field) && !done;
  const isLocked = !!locked[field];
  const border = isLocked ? GREEN : errors[field] ? RED : live ? SKY : null;

  return (
    <input
      ref={live && keys[0] === field ? firstBox : undefined}
      value={entries[field] ?? ''}
      onChange={(e) => edit(field, e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
      readOnly={!live || isLocked}
      disabled={!live && !isLocked}
      inputMode="decimal"
      aria-label={field}
      placeholder={live ? '?' : ''}
      className={`w-full h-10 rounded-xl border-2 text-center font-mono font-black text-base tabular-nums outline-none transition-colors
        ${isLocked ? 'bg-[#58cc02]/10 text-[#3e7500] dark:text-[#8ee000]'
          : live ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900'
            : 'bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-700'}`}
      style={border ? { borderColor: border } : undefined}
    />
  );
}

/** The magnitude and direction boxes, which carry a unit rather than a column. */
function PolarBox({ label, field, icon: Icon, color, ctx }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest" style={{ color }}>
        <Icon className="w-3.5 h-3.5" strokeWidth={3} />
        {label}
      </span>
      <Box field={field} ctx={ctx} />
    </div>
  );
}
