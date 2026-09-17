import { useMemo, useState } from 'react';
import {
  Grid2x2, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  PenLine, Combine, SquareDashed, TrendingUp, ListChecks,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import AreaModel from '../components/math/AreaModel.jsx';
import { expandModel, missingModel, diagnoseCell } from '../utils/algebra';
import {
  headLatex, factorLatex, cellTyped, expandedText, diagnoseWrite, diagnoseCollect,
  diagnoseMissingBlank, areaParts,
} from '../components/math/algebraSteps';

/* ------------------------------------------------------------------ *
 * EXPAND IT — "one box, one multiplication" (Y7 Maths 2.4).
 *
 * Reads a unit's `expandGrid`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } }, items: [
 *       { id, level, expr, context?, contextVn? },             expand (and simplify)
 *       { id, level, kind: 'missing', expr, hide: ['outer' | 'inner:<i>'] },
 *   ] }
 * Every box, expansion, answer and slip is derived by utils/algebra.js
 * (expandModel, diagnoseCell, diagnoseExpand, missingModel); the screen-side
 * extras (the Write/Collect slips, the work-backwards hint) are in
 * components/math/algebraSteps.js.
 *
 * The stages:
 *   GRID      the book's grid for each bracket: the inside terms across the
 *             top with their signs, the outside term down the side, one box
 *             per product. Focusing a box lights up its two factors and
 *             writes the multiplication underneath. Loose terms ride along
 *             as chips.
 *   WRITE     the expansion typed out, no brackets (like terms may stay).
 *   COLLECT   only when like terms appear after expanding.
 *   MISSING   (work-backwards items) type each blank; then the grid fills in
 *             as the confirmation.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. A right value in the wrong form
 * (1x, x5, + −3) is a nudge, not a wrong answer. Progress blob:
 * { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#ea580c';
const INK_DARK = '#c2410c';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Expand It',
    check: 'Check',
    stuck: 'Show me',
    cont: 'Continue',
    next: 'Next question',
    finish: 'Finish',
    solved: 'solved',
    level: 'Level',
    clean: 'Every box right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book',
    answer: 'Answer',
    shown: 'Here it is. Read it, then continue.',
    filled: 'The answer is filled in for you.',
    fillAll: 'Fill in every box first.',
    typeFirst: 'Type your answer first.',
    headExpand: 'Expand',
    headSimplify: 'Expand and simplify',
    headMissing: 'Work backwards',
    stages: { grid: 'Grid', write: 'Write', collect: 'Collect', missing: 'Missing number' },
    gridTitle: 'Fill each box: outside × top.',
    gridSub: 'One box, one multiplication. The sign in front of a term goes into its box with it.',
    tapBox: 'Tap a box to see its multiplication.',
    loose: 'These come along unchanged',
    working: 'Working so far',
    gridRight: 'Every box right.',
    writeTitle: 'Write the expansion.',
    writeSub: 'Read the boxes off the grid, left to right, sign and all. No brackets.',
    writeRight: 'Right — the brackets are gone.',
    writeEarly: 'Right — and you have already collected the like terms, so that is the answer.',
    collectTitle: 'Collect the like terms.',
    collectSub: 'Some terms are the same kind. Put each kind together, keeping every sign.',
    collectRight: 'Right — fully simplified.',
    missingTitle: 'Find the missing number.',
    missingSub: 'The expansion is given. Multiply back to find what goes in the box.',
    blankOuter: 'the number outside the bracket',
    blankInner: (i) => `the number in term ${i + 1} inside`,
    missingRight: 'Right — see it in the grid.',
    gridCheck: 'Check it with the grid',
    areaTitle: 'The same thing as an area',
    areaSub: 'Each box is a rectangle: height × width. Together they make the whole rectangle.',
    placeholder: 'Type it here',
    boxLabel: (ci, pi) => `box ${ci + 1} of bracket ${pi + 1}`,
    noItems: 'No questions yet',
    back: 'Return to Dashboard',
  },
  vn: {
    title: 'Khai triển',
    check: 'Kiểm tra',
    stuck: 'Chỉ cho em',
    cont: 'Tiếp tục',
    next: 'Câu tiếp theo',
    finish: 'Hoàn thành',
    solved: 'đã xong',
    level: 'Cấp độ',
    clean: 'Mọi ô đều đúng ngay lần đầu.',
    slipped: 'Xong — sai một lần, và em đã tự sửa được.',
    helped: 'Xong — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở',
    answer: 'Đáp án',
    shown: 'Đây là đáp án. Đọc kỹ rồi tiếp tục.',
    filled: 'Đáp án đã được điền sẵn cho em.',
    fillAll: 'Hãy điền vào tất cả các ô trước.',
    typeFirst: 'Hãy nhập câu trả lời trước.',
    headExpand: 'Khai triển',
    headSimplify: 'Khai triển và rút gọn',
    headMissing: 'Làm ngược lại',
    stages: { grid: 'Bảng', write: 'Viết', collect: 'Gộp', missing: 'Số còn thiếu' },
    gridTitle: 'Điền từng ô: số bên ngoài × hạng tử ở hàng trên.',
    gridSub: 'Mỗi ô là một phép nhân. Dấu đứng trước hạng tử đi vào ô cùng với nó.',
    tapBox: 'Chạm vào một ô để xem phép nhân của ô đó.',
    loose: 'Các hạng tử này giữ nguyên',
    working: 'Bài làm đến giờ',
    gridRight: 'Mọi ô đều đúng.',
    writeTitle: 'Viết biểu thức sau khi khai triển.',
    writeSub: 'Đọc các ô trong bảng từ trái sang phải, kèm cả dấu. Không còn dấu ngoặc.',
    writeRight: 'Đúng — không còn dấu ngoặc nữa.',
    writeEarly: 'Đúng — và em đã gộp luôn các hạng tử đồng dạng, nên đó là đáp án.',
    collectTitle: 'Gộp các hạng tử đồng dạng.',
    collectSub: 'Có những hạng tử cùng loại. Gộp từng loại lại với nhau, giữ nguyên mọi dấu.',
    collectRight: 'Đúng — đã rút gọn hoàn toàn.',
    missingTitle: 'Tìm số còn thiếu.',
    missingSub: 'Kết quả khai triển đã cho sẵn. Nhân ngược lại để tìm số trong ô trống.',
    blankOuter: 'số bên ngoài ngoặc',
    blankInner: (i) => `số trong hạng tử thứ ${i + 1} bên trong ngoặc`,
    missingRight: 'Đúng — xem lại trong bảng.',
    gridCheck: 'Kiểm tra bằng bảng',
    areaTitle: 'Cùng phép tính đó, dưới dạng diện tích',
    areaSub: 'Mỗi ô là một hình chữ nhật: chiều cao × chiều rộng. Ghép lại thành cả hình chữ nhật lớn.',
    placeholder: 'Nhập vào đây',
    boxLabel: (ci, pi) => `ô ${ci + 1} của ngoặc ${pi + 1}`,
    noItems: 'Chưa có câu hỏi',
    back: 'Quay lại Bảng điều khiển',
  },
};
const both = (key) => ({ en: T.en[key], vn: T.vn[key] });
const STAGE_ICON = { grid: Grid2x2, write: PenLine, collect: Combine, missing: SquareDashed };

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
  nudge: 'border-amber-400 bg-white dark:bg-slate-900',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/** Keep what can be part of an algebraic answer. */
const cleanExpr = (s) => s.replace(/[^0-9a-zA-Z+\-−^²³*×/() ]/g, '');
const blank = (v) => !String(v ?? '').trim();

/** Pieces grouped for display: each bracket its own grid, runs of loose terms one chip group. */
function blocksOf(model) {
  const blocks = [];
  model.pieces.forEach((p, pi) => {
    if (p.kind === 'bracket') blocks.push({ type: 'grid', pi });
    else if (blocks.length && blocks[blocks.length - 1].type === 'loose') blocks[blocks.length - 1].pis.push(pi);
    else blocks.push({ type: 'loose', pis: [pi] });
  });
  return blocks;
}

/** The item's derived model, or null when the item cannot be built. */
function deriveItem(item) {
  if (!item?.id || !item?.expr) return null;
  try {
    const model = expandModel(item.expr);
    const mm = item.kind === 'missing' ? missingModel(item.expr, item.hide || ['outer']) : null;
    return { model, mm };
  } catch {
    return null;
  }
}

/** The finished line with each blank boxed: \boxed{4}(2x + 3) = 8x + 12. */
function filledMissingLatex(mm) {
  let i = 0;
  return mm.latex.replace(/\\square/g, () => {
    const b = mm.blanks[i];
    i += 1;
    return b ? `\\boxed{${b.value}}` : '\\square';
  });
}

/* ------------------------------------------------------------------ small parts */

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

function Message({ msg, lang }) {
  if (!msg) return null;
  const text = lang === 'vn' && msg.vn ? msg.vn : msg.en;
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.tone === 'ok' ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : soft ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
      <span>{text}</span>
    </div>
  );
}

function Actions({ t, locked, onShow, onCheck, onContinue }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {!locked ? (
        <>
          {onShow && (
            <button onClick={onShow} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
            </button>
          )}
          {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
        </>
      ) : (
        <button onClick={onContinue} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
          {t.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/** One typed box: a term, a whole expansion, or a missing number. */
function AnswerBox({ value, onChange, onEnter, onFocus, state, disabled, label, className = '', placeholder = '?' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      inputMode="text"
      aria-label={label}
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      autoComplete="off"
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={(e) => onChange(cleanExpr(e.target.value))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      className={`min-w-0 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 disabled:opacity-90 ${RING[state] || IDLE} ${className}`}
    />
  );
}

/**
 * The book's grid for one bracket. With `inputs` each product is a box to
 * type; without, the products are printed (the working, the confirmation).
 * `focus` lights up the two factors of the box being typed; `mark` lights the
 * side or a header (the numbers a work-backwards item hid).
 */
function BracketGrid({ t, piece, pi, inputs, typed, marks, locked, focus, onType, onFocus, onEnter, mark, compact }) {
  const cols = piece.inner.length;
  const hotCol = focus && focus.pi === pi ? focus.ci : -1;
  const cellW = compact ? '4.75rem' : '6.5rem';
  const lit = 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300';
  const size = compact ? 'py-1 text-base' : 'py-2 text-lg sm:text-xl';
  return (
    <div className="inline-grid max-w-full gap-[2px] p-[2px] rounded-xl bg-slate-600 dark:bg-slate-500 align-top"
      style={{ gridTemplateColumns: `minmax(2.5rem, auto) repeat(${cols}, minmax(0, ${cellW}))` }}>
      <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-black rounded-tl-[10px] ${size}`}>×</div>
      {piece.inner.map((term, ci) => (
        <div key={`h${ci}`} className={`flex items-center justify-center px-1.5 font-black ${size} ${ci === cols - 1 ? 'rounded-tr-[10px]' : ''}
          ${hotCol === ci || mark?.heads?.includes(ci) ? lit : 'bg-slate-100 dark:bg-slate-800 text-violet-700 dark:text-violet-300'}`}>
          <SafeInlineMath math={headLatex(term)} />
        </div>
      ))}
      <div className={`flex items-center justify-center px-1.5 font-black rounded-bl-[10px] ${size}
        ${hotCol >= 0 || mark?.side ? lit : 'bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300'}`}>
        <SafeInlineMath math={piece.outer.latex} />
      </div>
      {piece.cells.map((cell, ci) => {
        const key = `g${pi}_${ci}`;
        const corner = ci === cols - 1 ? 'rounded-br-[10px]' : '';
        if (!inputs) {
          return (
            <div key={key} className={`flex items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-black ${size} ${corner}`}>
              <SafeInlineMath math={cell.latex} />
            </div>
          );
        }
        const done = marks[key] === 'good' || marks[key] === 'shown';
        return (
          <div key={key} className={`bg-white dark:bg-slate-900 p-1 sm:p-1.5 ${corner}`}>
            <AnswerBox value={typed[key]} state={marks[key]} disabled={locked || done} onEnter={onEnter}
              onFocus={() => onFocus({ pi, ci })}
              label={t.boxLabel(ci, pi)}
              className="w-full"
              onChange={(v) => onType(key, v)} />
          </div>
        );
      })}
    </div>
  );
}

function LooseChips({ model, pis, label, compact }) {
  return (
    <div className={`inline-flex flex-col items-start gap-1 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 ${compact ? 'p-2' : 'p-2.5'}`}>
      <div className="flex flex-wrap gap-1.5">
        {pis.map((pi) => {
          const p = model.pieces[pi];
          return (
            <span key={pi} className={`px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-black text-slate-800 dark:text-slate-100 ${compact ? 'text-base' : 'text-lg'}`}>
              <SafeInlineMath math={`${p.coef[0] < 0 ? '-' : '+'}\\,${p.latex.replace(/^-/, '')}`} />
            </span>
          );
        })}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

/** Every grid and loose-term group of an item, in the order they were written. */
function Grids({ model, t, compact, inputs, typed = {}, marks = {}, locked, focus, onType, onFocus, onEnter, mark }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {blocksOf(model).map((b) => (b.type === 'grid'
        ? <BracketGrid key={`g${b.pi}`} t={t} piece={model.pieces[b.pi]} pi={b.pi} inputs={inputs} typed={typed} marks={marks} locked={locked}
            focus={focus} onType={onType} onFocus={onFocus} onEnter={onEnter} mark={mark} compact={compact} />
        : <LooseChips key={`l${b.pis[0]}`} model={model} pis={b.pis} label={t.loose} compact={compact} />))}
    </div>
  );
}

/* ------------------------------------------------------------------ the task */

export default function ExpandGrid({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveItem(it)), [pool]);

  const [lang, setLang] = useState('en');
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
  const [focus, setFocus] = useState(null);
  const [early, setEarly] = useState(false);

  const item = items[pos];
  const derived = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  if (!items.length || !derived) {
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

  const { model, mm } = derived;
  const stages = mm ? ['missing'] : ['grid', 'write', ...(model.needsCollect ? ['collect'] : [])];
  const st = stage || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(st);
  const passed = (s) => stages.indexOf(s) !== -1 && stages.indexOf(s) < stIndex;

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setFocus(null); };
  const goStage = (s) => { setStage(s); resetStage(); };
  const advance = () => {
    let next = stages[stages.indexOf(st) + 1];
    if (next === 'collect' && early) next = undefined;
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
  const judge = (ok, bad, reveal, good) => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ tone: 'ok', ...good }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) {
      reveal();
      setLocked(true);
      setHelped(true);
      setMsg({ tone: 'shown', en: `${bad.en} ${T.en.filled}`, vn: `${bad.vn || bad.en} ${T.vn.filled}` });
    } else setMsg({ tone: 'bad', en: bad.en, vn: bad.vn || bad.en });
  };
  const showMe = (reveal) => { reveal(); setLocked(true); setHelped(true); setMsg({ tone: 'shown', ...both('shown') }); };

  const goNext = () => {
    setPos((p) => p + 1); setStage(null);
    setHelped(false); setSlipped(false); setItemDone(false); setEarly(false); resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  // What the task opened with. X only logs an attempt when something was answered
  // THIS sitting — otherwise opening a finished task and closing it stamped a
  // full-score attempt on today, and the daily goal went green with no work done.
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  const type = (key, v) => {
    setTyped((x) => ({ ...x, [key]: v }));
    setMarks((m) => (m[key] === 'good' || m[key] === 'shown' ? m : { ...m, [key]: undefined }));
  };

  /* ---------------------------------------------------------- grid */
  const bracketCells = model.pieces.flatMap((p, pi) => (p.kind === 'bracket' ? p.cells.map((cell, ci) => ({ p, pi, ci, cell, key: `g${pi}_${ci}` })) : []));
  const revealGrid = (base) => () => {
    const tp = { ...typed };
    const mk = { ...base };
    for (const c of bracketCells) if (mk[c.key] !== 'good') { tp[c.key] = cellTyped(c.cell); mk[c.key] = 'shown'; }
    setTyped(tp); setMarks(mk);
  };
  const checkGrid = () => {
    if (locked) return;
    const next = { ...marks };
    let firstBad = null;
    let firstNudge = null;
    let unread = null;
    for (const c of bracketCells) {
      if (next[c.key] === 'good' || next[c.key] === 'shown') continue;
      if (blank(typed[c.key])) { setMsg({ tone: 'bad', ...both('fillAll') }); return; }
      const d = diagnoseCell(c.p.outer, c.p.inner[c.ci], typed[c.key]);
      if (d.ok) next[c.key] = 'good';
      else if (d.equivalent) { next[c.key] = 'nudge'; firstNudge = firstNudge || d; }
      else if (d.code === 'unreadable') { next[c.key] = 'bad'; unread = unread || d; }
      else { next[c.key] = 'bad'; firstBad = firstBad || d; }
    }
    setMarks(next);
    if (firstBad) judge(false, firstBad, revealGrid(next));
    else if (unread) setMsg({ tone: 'bad', en: unread.en, vn: unread.vn });
    else if (firstNudge) setMsg({ tone: 'info', en: firstNudge.en, vn: firstNudge.vn });
    else judge(true, null, null, both('gridRight'));
  };

  /* ---------------------------------------------------------- write / collect */
  const checkTyped = (key, diagnose, reveal, good) => {
    if (locked) return;
    if (blank(typed[key])) { setMsg({ tone: 'bad', ...both('typeFirst') }); return; }
    const d = diagnose(model, typed[key]);
    if (d.ok) { setMarks({ [key]: 'good' }); judge(true, null, null, good(typed[key])); return; }
    if (d.equivalent || d.code === 'unreadable') {
      setMarks({ [key]: d.equivalent ? 'nudge' : 'bad' });
      setMsg({ tone: d.equivalent ? 'info' : 'bad', en: d.en, vn: d.vn });
      return;
    }
    setMarks({ [key]: 'bad' });
    judge(false, d, reveal);
  };
  const revealWrite = () => { setTyped({ w: expandedText(model) }); setMarks({ w: 'shown' }); };
  const checkWrite = () => checkTyped('w', diagnoseWrite, revealWrite, (v) => {
    const already = model.needsCollect && diagnoseCollect(model, v).ok;
    setEarly(already);
    return both(already ? 'writeEarly' : 'writeRight');
  });
  const revealCollect = () => { setTyped({ c: model.answerText }); setMarks({ c: 'shown' }); };
  const checkCollect = () => checkTyped('c', diagnoseCollect, revealCollect, () => both('collectRight'));

  /* ---------------------------------------------------------- missing */
  const revealMissing = (base) => () => {
    const tp = { ...typed };
    const mk = { ...base };
    for (const b of mm.blanks) if (mk[b.id] !== 'good') { tp[b.id] = String(b.value); mk[b.id] = 'shown'; }
    setTyped(tp); setMarks(mk);
  };
  const checkMissing = () => {
    if (locked) return;
    const next = { ...marks };
    let firstBad = null;
    let unread = null;
    for (const b of mm.blanks) {
      if (next[b.id] === 'good' || next[b.id] === 'shown') continue;
      if (blank(typed[b.id])) { setMsg({ tone: 'bad', ...both('fillAll') }); return; }
      const d = diagnoseMissingBlank(mm, b.id, typed[b.id]);
      if (d.ok) next[b.id] = 'good';
      else if (d.code === 'unreadable') { next[b.id] = 'bad'; unread = unread || d; }
      else { next[b.id] = 'bad'; firstBad = firstBad || d; }
    }
    setMarks(next);
    if (firstBad) judge(false, firstBad, revealMissing(next));
    else if (unread) setMsg({ tone: 'bad', en: unread.en, vn: unread.vn });
    else judge(true, null, null, both('missingRight'));
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.vn);
  const headline = mm ? t.headMissing : model.needsCollect ? t.headSimplify : t.headExpand;
  const questionTex = mm ? mm.latex : model.questionLatex;
  const context = pick(item.context, item.contextVn);
  const intro = pos === 0 ? pick(pool?.intro, pool?.introVn) : null;
  const title = pick(pool?.title, pool?.titleVn) || t.title;

  const focusPiece = focus ? model.pieces[focus.pi] : null;
  let focusLine = null;
  if (focusPiece?.kind === 'bracket') {
    const key = `g${focus.pi}_${focus.ci}`;
    const known = marks[key] === 'good' || marks[key] === 'shown';
    focusLine = `${focusPiece.outer.latex} \\times ${factorLatex(focusPiece.inner[focus.ci])} = ${known ? focusPiece.cells[focus.ci].latex : '\\,?'}`;
  }

  const workLines = model.needsCollect
    ? `\\begin{aligned} ${model.questionLatex} &= ${model.expandedLatex} \\\\ &= ${model.answerLatex} \\end{aligned}`
    : `${model.questionLatex} = ${model.expandedLatex}`;
  const area = areaParts(model);
  const missingMark = mm ? {
    side: mm.blanks.some((b) => b.id === 'outer'),
    heads: mm.blanks.filter((b) => b.id.startsWith('inner:')).map((b) => Number(b.id.slice(6))),
  } : null;
  const blankLabel = (id) => (id === 'outer' ? t.blankOuter : t.blankInner(Number(id.slice(6))));

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={bilingual ? lang : undefined}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-5 lg:items-start">
        {/* left: the question, then the working */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <Grid2x2 className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{headline}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            <div className="px-2 sm:px-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
              <SafeBlockMath math={questionTex} />
            </div>
            {(context || intro) && (
              <p className="px-4 pb-3 -mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{context || intro}</p>
            )}
            {!itemDone && stages.length > 1 && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === st} done={passed(s)} />
                ))}
              </div>
            )}
          </div>

          {!itemDone && !mm && passed('grid') && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 min-w-0">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.working}</div>
              <Grids model={model} t={t} compact />
              {passed('write') && (
                <div className="mt-2 text-lg overflow-x-auto"><SafeInlineMath math={`${model.questionLatex} = ${model.expandedLatex}`} /></div>
              )}
            </div>
          )}

          {itemDone && area && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 min-w-0 animate-in fade-in">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.areaTitle}</div>
              <AreaModel outerLatex={area.outerLatex} parts={area.parts} caption={t.areaSub} />
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {st === 'grid' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.gridTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.gridSub}</p>
                  <Grids model={model} t={t} inputs typed={typed} marks={marks} locked={locked} focus={focus}
                    onType={type} onFocus={setFocus} onEnter={checkGrid} />
                  <div className="mt-3 min-h-[2.25rem] flex items-center text-lg text-slate-700 dark:text-slate-200 overflow-x-auto">
                    {focusLine
                      ? <SafeInlineMath math={focusLine} />
                      : <span className="text-xs font-bold text-slate-400">{t.tapBox}</span>}
                  </div>
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealGrid(marks))} onCheck={checkGrid} onContinue={advance} />
                </>
              )}

              {st === 'write' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.writeTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.writeSub}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                    <span className="overflow-x-auto max-w-full"><SafeInlineMath math={`${model.questionLatex} =`} /></span>
                    <AnswerBox value={typed.w} state={marks.w} disabled={locked} onEnter={checkWrite} label={t.writeTitle}
                      placeholder={t.placeholder} className="flex-1 basis-56 text-left"
                      onChange={(v) => type('w', v)} />
                  </div>
                  {locked && (
                    <div className="mt-3 text-lg text-slate-700 dark:text-slate-200 overflow-x-auto animate-in fade-in">
                      <SafeInlineMath math={`${model.questionLatex} = ${model.expandedLatex}`} />
                    </div>
                  )}
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealWrite)} onCheck={checkWrite} onContinue={advance} />
                </>
              )}

              {st === 'collect' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.collectTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.collectSub}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                    <span className="overflow-x-auto max-w-full"><SafeInlineMath math={`${model.expandedLatex} =`} /></span>
                    <AnswerBox value={typed.c} state={marks.c} disabled={locked} onEnter={checkCollect} label={t.collectTitle}
                      placeholder={t.placeholder} className="flex-1 basis-40 text-left"
                      onChange={(v) => type('c', v)} />
                  </div>
                  {locked && (
                    <div className="mt-3 text-lg text-slate-700 dark:text-slate-200 overflow-x-auto animate-in fade-in">
                      <SafeInlineMath math={workLines} />
                    </div>
                  )}
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealCollect)} onCheck={checkCollect} onContinue={advance} />
                </>
              )}

              {st === 'missing' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.missingTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.missingSub}</p>
                  <div className="flex flex-col gap-2">
                    {mm.blanks.map((b) => (
                      <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                        <span className="text-2xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={'\\square ='} /></span>
                        <AnswerBox value={typed[b.id]} state={marks[b.id]} disabled={locked || marks[b.id] === 'good'} onEnter={checkMissing}
                          label={blankLabel(b.id)} className="w-20"
                          onChange={(v) => type(b.id, v.replace(/[^\d\-−]/g, ''))} />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{blankLabel(b.id)}</span>
                      </div>
                    ))}
                  </div>
                  {locked && (
                    <div className="mt-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 animate-in fade-in min-w-0">
                      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.gridCheck}</div>
                      <Grids model={model} t={t} mark={missingMark} />
                      <div className="mt-2 text-lg text-slate-800 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={filledMissingLatex(mm)} /></div>
                    </div>
                  )}
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealMissing(marks))} onCheck={checkMissing} onContinue={advance} />
                </>
              )}
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? t.helped : slipped ? t.slipped : t.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 min-w-0">
                  <Grids model={model} t={t} compact mark={missingMark} />
                  <div className="mt-3 text-lg overflow-x-auto">
                    <SafeInlineMath math={mm ? filledMissingLatex(mm) : workLines} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3 min-w-0" style={{ borderColor: INK, backgroundColor: 'rgba(234,88,12,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                    <SafeInlineMath math={mm ? mm.blanks.map((b) => `\\square = ${b.value}`).join(',\\quad ') : model.answerLatex} />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={isLast ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
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
