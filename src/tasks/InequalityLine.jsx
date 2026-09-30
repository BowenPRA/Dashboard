import { useMemo, useState } from 'react';
import {
  CircleArrowRight, Construction, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Lightbulb, Trophy, Pencil, TrendingUp,
  ListChecks, CircleDot, PenLine, Hash, ListOrdered,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import IneqLineFigure from '../components/math/IneqLineFigure.jsx';
import {
  ineqModel, diagnoseCircle, diagnoseArrow, diagnoseInteger, diagnoseWrite, diagnoseWriteTwo, diagnoseList,
  edgeWord, listText, numText,
} from '../utils/ineqLine';

/* ------------------------------------------------------------------ *
 * SHOW IT — inequalities on a number line (Y7 Maths 2.6).
 *
 * Reads a unit's `ineqLine`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } }, items: [
 *       { id, level, kind: 'draw',  ineq: 'x > 3' },
 *       { id, level, kind: 'read',  ineq: 'x < 4' },
 *       { id, level, kind: 'words', ineq: 't < 0', phrase: 'below' },
 *       { id, level, kind: 'words', ineq: 'p < 9', context, contextVn },
 *       { id, level, kind: 'between', ineqs: ['s > 20', 's < 24'], context?, contextVn? },
 *   ] }
 * utils/ineqLine.js derives the line, the integers and the slips.
 *
 * The stages:
 *   CIRCLE   (draw) tap the number: the open circle goes on it.
 *   ARROW    (draw) left or right.
 *   WRITE    (read, words) the inequality as a sign and a number.
 *   INTEGER  the smallest (for >) or largest (for <) integer that works.
 *   WRITE2   (a between story) both inequalities, in either order.
 *   LIST     (between) tap every integer that works — or say none does.
 *
 * A wrong answer can be tried again; a second one (or "Show me") fills the
 * stage in and the item pays half. Progress blob: { [itemId]: 1 | 0.5 },
 * score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Show It',
    check: 'Check', stuck: 'Show me', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every step right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    heads: { draw: 'Show it on a number line', read: 'Read the number line', words: 'Write it as an inequality', between: 'Which integers work?' },
    stages: { circle: 'Circle', arrow: 'Arrow', write: 'Write', integer: 'Integer', write2: 'Write', list: 'Integers' },
    circleTitle: 'The circle first: tap the number it goes on.',
    circleSub: 'The circle is open, because the number itself does not work.',
    circleFirst: 'Tap a number on the line first.',
    nudgeLeft: 'Move the circle one mark left', nudgeRight: 'Move the circle one mark right',
    circleRight: (n) => `Right — an open circle on ${n}: ${n} itself is not included.`,
    arrowTitle: 'Now the arrow: which way?',
    arrowSub: 'The arrow covers every number that works.',
    arrowFirst: 'Choose left or right first.',
    arrowRight: (g) => (g ? 'Right — greater than goes right.' : 'Right — less than goes left.'),
    left: 'Left', right: 'Right',
    writeTitleRead: 'Write the inequality this line shows.',
    writeTitleWords: 'Write it as an inequality.',
    writeSub: 'Choose the sign, then type the number.',
    writeRight: 'Right — that is the inequality.',
    intTitle: (w, L) => `The ${w} integer ${L} could be?`,
    intSub: 'An integer is a whole number. The circle’s own number does not work.',
    intRight: (L, list) => `Right — ${L} could be ${list}`,
    write2Title: 'Write both inequalities first.',
    write2Sub: 'One for each sentence. The order does not matter.',
    write2Right: 'Right — now find the integers that fit both.',
    listTitle: 'Tap every integer that fits BOTH.',
    listSub: 'Or say that no integer works.',
    none: 'No integer works',
    listRight: 'Right.',
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    couldBe: (L, list) => `${L} could be ${list}`,
    edgeIs: (w, v) => `The ${w} integer is ${v}.`,
    onlyThese: (list) => `The integers that work: ${list}.`,
    noneWorks: 'No integer works: there is no whole number between them.',
    typeHere: 'number', sign: 'sign', and: 'and', noneShort: 'none',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  vn: {
    title: 'Biểu diễn trên trục số',
    check: 'Kiểm tra', stuck: 'Chỉ cho em', next: 'Câu tiếp theo', finish: 'Hoàn thành',
    solved: 'đã xong', level: 'Cấp độ',
    clean: 'Mọi bước đều đúng ngay lần đầu.',
    slipped: 'Đã xong — sai một lần, và em đã tự sửa được.',
    helped: 'Đã xong — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở', answer: 'Đáp án',
    heads: { draw: 'Biểu diễn trên trục số', read: 'Đọc trục số', words: 'Viết thành bất đẳng thức', between: 'Những số nguyên nào thỏa mãn?' },
    stages: { circle: 'Vòng tròn', arrow: 'Mũi tên', write: 'Viết', integer: 'Số nguyên', write2: 'Viết', list: 'Số nguyên' },
    circleTitle: 'Vòng tròn trước: chạm vào con số để đặt nó.',
    circleSub: 'Vòng tròn rỗng, vì chính con số đó không thỏa mãn.',
    circleFirst: 'Hãy chạm vào một số trên trục số trước.',
    nudgeLeft: 'Dịch vòng tròn sang trái một vạch', nudgeRight: 'Dịch vòng tròn sang phải một vạch',
    circleRight: (n) => `Đúng — vòng tròn rỗng tại ${n}: không tính chính số ${n}.`,
    arrowTitle: 'Bây giờ là mũi tên: hướng nào?',
    arrowSub: 'Mũi tên phủ lên mọi số thỏa mãn.',
    arrowFirst: 'Hãy chọn trái hoặc phải trước.',
    arrowRight: (g) => (g ? 'Đúng — lớn hơn thì sang phải.' : 'Đúng — nhỏ hơn thì sang trái.'),
    left: 'Trái', right: 'Phải',
    writeTitleRead: 'Viết bất đẳng thức mà trục số này biểu diễn.',
    writeTitleWords: 'Viết thành bất đẳng thức.',
    writeSub: 'Chọn dấu, rồi nhập con số.',
    writeRight: 'Đúng — đó chính là bất đẳng thức.',
    intTitle: (w, L) => `Số nguyên ${w} mà ${L} có thể là?`,
    intSub: 'Số nguyên là số không có phần thập phân. Con số ở vòng tròn không thỏa mãn.',
    intRight: (L, list) => `Đúng — ${L} có thể là ${list}`,
    write2Title: 'Viết cả hai bất đẳng thức trước.',
    write2Sub: 'Mỗi câu một bất đẳng thức. Thứ tự không quan trọng.',
    write2Right: 'Đúng — giờ hãy tìm các số nguyên thỏa mãn cả hai.',
    listTitle: 'Chạm vào mọi số nguyên thỏa mãn CẢ HAI.',
    listSub: 'Hoặc chọn rằng không có số nguyên nào thỏa mãn.',
    none: 'Không có số nguyên nào',
    listRight: 'Đúng.',
    filled: 'Đã điền sẵn cho em.',
    shown: 'Đây là đáp án. Đọc kỹ rồi làm tiếp.',
    couldBe: (L, list) => `${L} có thể là ${list}`,
    edgeIs: (w, v) => `Số nguyên ${w} là ${v}.`,
    onlyThese: (list) => `Các số nguyên thỏa mãn: ${list}.`,
    noneWorks: 'Không có số nguyên nào thỏa mãn: giữa hai số đó không có số nguyên nào.',
    typeHere: 'con số', sign: 'dấu', and: 'và', noneShort: 'không có',
    noItems: 'Chưa có câu hỏi', back: 'Quay lại Bảng điều khiển',
  },
};
const both = (key, ...args) => {
  const en = T.en[key];
  const vn = T.vn[key];
  return typeof en === 'function' ? { en: en(...args), vn: vn(...args) } : { en, vn };
};
const STAGE_ICON = { circle: CircleDot, arrow: ArrowRight, write: PenLine, integer: Hash, write2: PenLine, list: ListOrdered };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const MARK = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';

function deriveItem(item) {
  if (!item?.id) return null;
  try { return ineqModel(item); } catch { return null; }
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

/** letter  [< | >]  [number] — one inequality being written. */
function WriteRow({ letter, row, mark, disabled, onSign, onType, onEnter, t, inputId }) {
  return (
    <div className="flex items-center justify-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
      <span className="text-3xl"><SafeInlineMath math={letter} /></span>
      <div className="flex rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden" role="group" aria-label={t.sign}>
        {['<', '>'].map((s) => (
          <button key={s} type="button" disabled={disabled} onClick={() => onSign(s)} aria-pressed={row.sign === s}
            className={`w-12 h-12 font-mono font-black text-2xl transition-colors ${row.sign === s ? 'text-white' : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            style={row.sign === s ? { backgroundColor: INK } : undefined}>{s}</button>
        ))}
      </div>
      <input
        id={inputId}
        value={row.typed}
        disabled={disabled}
        onChange={(e) => onType(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        inputMode="text" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
        className={`w-24 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 disabled:opacity-90 ${MARK[mark] || IDLE}`}
      />
    </div>
  );
}

const EMPTY_ROW = { sign: null, typed: '' };

export default function InequalityLine({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
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
  const [stageAt, setStageAt] = useState(null);
  const [circle, setCircle] = useState(null);        // where the student has put the circle
  const [dir, setDir] = useState(null);              // 'left' | 'right'
  const [rows, setRows] = useState([EMPTY_ROW, EMPTY_ROW]);
  const [rowMarks, setRowMarks] = useState([null, null]);
  const [typed, setTyped] = useState('');            // the integer
  const [mark, setMark] = useState(null);
  const [picks, setPicks] = useState([]);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  if (!items.length || !model) {
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

  const { kind, stages, p } = model;
  const stage = stageAt || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(stage);
  const passed = (s) => stages.includes(s) && stages.indexOf(s) < stIndex;
  const L = model.letter;

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
    setPos((q) => q + 1);
    setStageAt(null); setCircle(null); setDir(null); setRows([EMPTY_ROW, EMPTY_ROW]); setRowMarks([null, null]);
    setTyped(''); setMark(null); setPicks([]); setWrongs(0);
    setHelped(false); setSlipped(false); setMsg(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /** Move on from a settled stage. `tone` and `text` are what to say about it. */
  const advance = (wasHelped, said) => {
    const next = stages[stages.indexOf(stage) + 1];
    setWrongs(0);
    setMsg(said);
    if (next) {
      setStageAt(next);
      if (next === 'integer') requestAnimationFrame(() => document.getElementById('ineq-integer')?.focus());
    } else completeItem(wasHelped);
  };
  /** A wrong answer: once is a hint, twice fills the stage in. */
  const wrong = (d, reveal) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      reveal();
      setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en} ${T.en.filled}`, vn: `${d.vn} ${T.vn.filled}` });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const showMe = (reveal) => {
    reveal();
    setHelped(true); setSlipped(true);
    advance(true, { tone: 'shown', ...both('shown') });
  };

  /* ---------------------------------------------------------- the stages */
  const reveals = {
    circle: () => setCircle(p.n),
    arrow: () => setDir(p.greater ? 'right' : 'left'),
    write: () => { setRows([{ sign: p.op, typed: numText(p.n) }, EMPTY_ROW]); setRowMarks(['shown', null]); },
    integer: () => { setTyped(numText(p.edge)); setMark('shown'); },
    write2: () => {
      setRows(model.parts.map((q) => ({ sign: q.op, typed: numText(q.n) })));
      setRowMarks(['shown', 'shown']);
    },
    list: () => setPicks(model.integers),
  };

  const check = () => {
    if (stage === 'circle') {
      if (circle == null) { setMsg({ tone: 'info', ...both('circleFirst') }); return; }
      const d = diagnoseCircle(p, circle);
      if (d.ok) advance(helped, { tone: 'ok', ...both('circleRight', numText(p.n)) });
      else wrong(d, reveals.circle);
    } else if (stage === 'arrow') {
      if (!dir) { setMsg({ tone: 'info', ...both('arrowFirst') }); return; }
      const d = diagnoseArrow(p, dir);
      if (d.ok) advance(helped, { tone: 'ok', ...both('arrowRight', p.greater) });
      else wrong(d, reveals.arrow);
    } else if (stage === 'write') {
      const d = diagnoseWrite(p, rows[0].sign, rows[0].typed, { drawn: kind === 'read' });
      if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
      if (d.ok) { setRowMarks(['good', null]); advance(helped, { tone: 'ok', ...both('writeRight') }); } else { setRowMarks(['bad', null]); wrong(d, reveals.write); }
    } else if (stage === 'integer') {
      const d = diagnoseInteger(p, typed);
      if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
      if (d.ok) { setMark('good'); advance(helped, { tone: 'ok', ...both('intRight', L, listText(p)) }); } else { setMark('bad'); wrong(d, reveals.integer); }
    } else if (stage === 'write2') {
      const d = diagnoseWriteTwo(model.parts, rows);
      if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
      if (d.ok) { setRowMarks(['good', 'good']); advance(helped, { tone: 'ok', ...both('write2Right') }); } else { setRowMarks(d.marks.map((ok) => (ok ? 'good' : 'bad'))); wrong(d, reveals.write2); }
    } else if (stage === 'list') {
      checkList(false);
    }
  };
  function checkList(none) {
    const d = diagnoseList(model, none ? [] : picks, none);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    if (d.ok) advance(helped, { tone: 'ok', ...both('listRight') });
    else wrong(d, reveals.list);
  }

  const setRow = (i, patch) => {
    setRows((r) => r.map((row, k) => (k === i ? { ...row, ...patch } : row)));
    setRowMarks((m) => m.map((v, k) => (k === i && v === 'bad' ? null : v)));
    if (msg?.tone === 'bad') setMsg(null);
  };
  const nudge = (by) => {
    const step = kind !== 'between' && !Number.isInteger(p.n) ? 0.5 : 1;
    setCircle((c) => Math.max(model.lo, Math.min(model.hi, c + by * step)));
    if (msg?.tone !== 'ok') setMsg(null);
  };
  const toggle = (v) => {
    if (stage !== 'list' || itemDone) return;
    setPicks((list) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]));
    if (msg?.tone === 'bad') setMsg(null);
  };

  /* ---------------------------------------------------------- what is drawn */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.vn);
  const title = pick(pool?.title, pool?.titleVn) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introVn) : null;
  const context = item.context ? pick(item.context, item.contextVn) : null;
  const sentence = model.sentence ? pick(model.sentence.en, model.sentence.vn) : null;
  const w = p ? edgeWord(p) : null;

  let rays = [];
  let lit = [];
  let dim = [];
  if (kind === 'between') {
    const solved = itemDone;
    if (passed('write2') || !stages.includes('write2') || solved) rays = model.parts.map((q) => ({ n: q.n, dir: q.greater ? 'right' : 'left', tone: q.greater ? 'key' : 'blue' }));
    if (solved) lit = model.integers;
  } else if (kind === 'draw') {
    const at = passed('circle') || itemDone ? p.n : circle;
    if (at != null) rays = [{ n: at, dir: passed('arrow') || itemDone ? (p.greater ? 'right' : 'left') : stage === 'arrow' ? dir : null }];
  } else if (kind === 'read' || passed('write') || itemDone) {
    rays = [{ n: p.n, dir: p.greater ? 'right' : 'left' }];
  }
  if (p && (passed('integer') || (itemDone && stages.includes('integer')))) {
    for (let v = model.lo; v <= model.hi; v += 1) if (p.works(v)) lit.push(v);
    if (Number.isInteger(p.n)) dim = [p.n];
  }
  // The inequality is on show unless finding it IS the question.
  const showIneq = kind === 'draw' || itemDone || (kind === 'between' ? !stages.includes('write2') || passed('write2') : passed('write'));
  const halves = kind !== 'between' && !Number.isInteger(p.n);
  const figure = (
    <IneqLineFigure lo={model.lo} hi={model.hi} rays={rays} halves={halves} lit={lit} dim={dim}
      onPick={stage === 'circle' && !itemDone ? (v) => { setCircle(v); if (msg?.tone !== 'ok') setMsg(null); } : undefined}
      picks={kind === 'between' && !itemDone ? picks : []} onToggle={stage === 'list' && !itemDone ? toggle : undefined} />
  );
  const doneLine = kind === 'between'
    ? (model.integers.length ? t.onlyThese(model.integers.map(numText).join(', ')) : t.noneWorks)
    : `${t.couldBe(L, listText(p))} ${t.edgeIs(pick(w.en, w.vn), numText(p.edge))}`;
  const stageTitle = {
    circle: t.circleTitle, arrow: t.arrowTitle, write: kind === 'read' ? t.writeTitleRead : t.writeTitleWords,
    integer: p ? t.intTitle(pick(w.en, w.vn), L) : '', write2: t.write2Title, list: t.listTitle,
  }[stage];
  const stageSub = { circle: t.circleSub, arrow: t.arrowSub, write: t.writeSub, integer: t.intSub, write2: t.write2Sub, list: t.listSub }[stage];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={bilingual ? lang : undefined}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <CircleArrowRight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{t.heads[kind]}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {(context || sentence) && (
              <p className={`px-4 pt-3 font-black text-slate-800 dark:text-slate-100 leading-snug ${showIneq ? 'text-base' : 'text-xl sm:text-2xl'}`}>{context || `“${sentence}”`}</p>
            )}
            {showIneq ? (
              <div className="px-2 sm:px-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                <SafeBlockMath math={model.latex} />
              </div>
            ) : <div className="h-3" />}
            {intro && <p className="px-4 pb-2 -mt-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === stage} done={stages.indexOf(s) < stIndex} />)}
              </div>
            )}
          </div>
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{stageTitle}</div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{stageSub}</p>

              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">{figure}</div>

              {/* on a small screen a tap can land one mark out: nudge the circle */}
              {stage === 'circle' && circle != null && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button type="button" onClick={() => nudge(-1)} aria-label={t.nudgeLeft} title={t.nudgeLeft}
                    className="w-10 h-9 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center hover:border-orange-400"><ArrowLeft className="w-4 h-4" strokeWidth={3} /></button>
                  <span className="min-w-[3.5rem] text-center font-mono font-black text-lg text-slate-700 dark:text-slate-200">{numText(circle)}</span>
                  <button type="button" onClick={() => nudge(1)} aria-label={t.nudgeRight} title={t.nudgeRight}
                    className="w-10 h-9 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 flex items-center justify-center hover:border-orange-400"><ArrowRight className="w-4 h-4" strokeWidth={3} /></button>
                </div>
              )}

              {stage === 'arrow' && (
                <div className="mt-3 flex items-center justify-center gap-3">
                  {['left', 'right'].map((d) => (
                    <button key={d} type="button" onClick={() => { setDir(d); if (msg?.tone !== 'ok') setMsg(null); }} aria-pressed={dir === d}
                      className={`px-5 h-12 flex items-center gap-2 rounded-xl border-2 border-b-[4px] font-black uppercase tracking-widest text-sm transition-all active:border-b-2 active:translate-y-[2px]
                        ${dir === d ? 'text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-orange-400'}`}
                      style={dir === d ? { backgroundColor: INK, borderColor: INK_DARK } : undefined}>
                      {d === 'left' && <ArrowLeft className="w-5 h-5" strokeWidth={3} />}
                      {t[d]}
                      {d === 'right' && <ArrowRight className="w-5 h-5" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              )}

              {stage === 'write' && (
                <div className="mt-4">
                  <WriteRow letter={L} row={rows[0]} mark={rowMarks[0]} t={t} inputId="ineq-write-0"
                    onSign={(s) => setRow(0, { sign: s })} onType={(v) => setRow(0, { typed: v })} onEnter={check} />
                </div>
              )}
              {stage === 'write2' && (
                <div className="mt-4 flex flex-col gap-2">
                  {[0, 1].map((i) => (
                    <WriteRow key={i} letter={L} row={rows[i]} mark={rowMarks[i]} t={t} inputId={`ineq-write-${i}`}
                      onSign={(s) => setRow(i, { sign: s })} onType={(v) => setRow(i, { typed: v })} onEnter={check} />
                  ))}
                </div>
              )}

              {stage === 'integer' && (
                <div className="mt-4 flex items-center justify-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                  <SafeInlineMath math={`${L} =`} />
                  <input
                    id="ineq-integer"
                    value={typed}
                    onChange={(e) => { setTyped(e.target.value); if (mark === 'bad') setMark(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
                    inputMode="text" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                    className={`w-24 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500 ${MARK[mark] || IDLE}`}
                  />
                </div>
              )}

              {stage === 'list' && (
                <div className="mt-3 flex justify-center">
                  <button type="button" onClick={() => checkList(true)}
                    className="px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:border-orange-400 hover:text-orange-600">
                    {t.none}
                  </button>
                </div>
              )}

              <Message msg={msg} lang={lang} />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => showMe(reveals[stage])}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
                <button onClick={check} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
              </div>
            </div>
          )}

          {itemDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{helped ? t.helped : slipped ? t.slipped : t.clean}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
                {msg?.tone === 'shown' && <div className="-mt-3 mb-3"><Message msg={msg} lang={lang} /></div>}
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">{figure}</div>
                <p className="mt-2 text-center text-sm font-bold text-slate-600 dark:text-slate-300">{doneLine}</p>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(194,94,18,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                    {kind === 'between' ? (
                      <>
                        <SafeInlineMath math={model.parts[0].latex} />
                        <span className="text-sm font-bold text-slate-400">{t.and}</span>
                        <SafeInlineMath math={model.parts[1].latex} />
                        <span className="font-mono font-black text-lg">→ {model.integers.length ? model.integers.map(numText).join(', ') : t.noneShort}</span>
                      </>
                    ) : (
                      <>
                        <SafeInlineMath math={p.latex} />
                        {stages.includes('integer') && <span className="font-mono font-black text-lg">→ {listText(p)}</span>}
                      </>
                    )}
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
