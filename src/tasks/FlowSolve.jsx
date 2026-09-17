import { useMemo, useState } from 'react';
import {
  Undo2, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp,
  ListChecks, MessageSquareText, Workflow, CheckCheck, KeyRound, ChevronDown, ChevronUp,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import FlowChartPicture from '../components/math/FlowChartPicture.jsx';
import { equationModel, opText, sameOp, valueText, diagnoseSolve, thinkSentence } from '../utils/algebra';
import {
  forwardTray, reverseTray, choicesFor, substLatex, solveLines, checkLatex, numLatex, numTyped,
  diagnoseForward, diagnoseReverse, diagnoseCheck, tidySolve,
} from '../components/math/algebraSteps';

/* ------------------------------------------------------------------ *
 * UNDO IT — "build the flow chart, reverse it, check it" (Y7 Maths 2.5).
 *
 * Reads a unit's `flowSolve`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } }, items: [
 *       { id, level, eq: '2a + 4 = 18' },                       solve
 *       { id, level, ops: [['*', 6], ['-', 4]], result: 32, letter? },   I think of a number
 *       { id, level, eq, story, storyVn },                      a story: pick the equation first
 *   ] }
 * The flow chart, its inverse, every box value, the solution, the four
 * equations a story could be written as and the slip behind each wrong one
 * are derived by utils/algebra.js (equationModel, equationChoices,
 * diagnoseSolve); the trays and per-arrow diagnoses are in
 * components/math/algebraSteps.js.
 *
 * The stages:
 *   EQUATION  (ops and story items) four equations, one right; a wrong pick
 *             names its slip (the order, a step missing, the inverse written).
 *   FORWARD   [letter] →( )→ [ ] →( )→ [target]: put each operation on its
 *             arrow, from the letter. Tap a chip then an arrow, or drag.
 *   REVERSE   [target] →( )→ [ ] →( )→ [letter = ]: the inverse on each arrow,
 *             last step first, and the number in each box. "I know the
 *             answer" tries a solution early, named by diagnoseSolve.
 *   CHECK     put the solution back in and work out the side.
 *
 * A wrong answer can be tried again; a second wrong answer (or "Show me")
 * fills the stage in and the item pays half. Progress blob:
 * { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#0d9488';
const INK_DARK = '#0f766e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Undo It',
    check: 'Check',
    stuck: 'Show me',
    cont: 'Continue',
    next: 'Next question',
    finish: 'Finish',
    solved: 'solved',
    level: 'Level',
    clean: 'Every step right first time.',
    slipped: 'Solved — one wrong turn, and you found it yourself.',
    helped: 'Solved — with a step or two shown to you.',
    bookCopy: 'Copy this into your book',
    answer: 'Answer',
    shown: 'Here it is. Read it, then continue.',
    filled: 'The answer is filled in for you.',
    headSolve: 'Solve',
    headStory: 'Write the equation, then solve',
    stages: { equation: 'Equation', forward: 'Flow chart', reverse: 'Undo', check: 'Check' },
    letterIs: (L) => `Call the unknown number ${L}.`,
    eqTitle: 'Which equation says the same thing?',
    eqSub: 'Follow what happens to the number, in order.',
    eqRight: 'Right — that equation tells the story.',
    fwdTitle: (L) => `Build the flow chart: what happens to ${L}, in order?`,
    fwdSub: 'Start at the letter. Put each operation on its arrow.',
    trayHint: 'Tap an operation, then tap an arrow — or drag it there. Tap a placed one to take it back.',
    fwdRight: 'Right — that is the chain of operations.',
    revTitle: 'Now undo it — last step first.',
    revSub: 'Start from the answer. Put the inverse on each arrow and work out each box.',
    revRight: (L, v) => `Right — ${L} = ${v}. Now check it.`,
    know: 'I know the answer',
    tryIt: 'Try it',
    knowRight: (L, v) => `Yes — ${L} = ${v}. Now show it on the chart: undo each step.`,
    chkTitle: (L, v) => `Put ${L} = ${v} back in.`,
    chkSub: 'Work out this side. It should come to the number on the other side of the equation.',
    itWorks: 'It works!',
    typeNumber: 'Type a number first.',
    working: 'Working so far',
    checkWord: 'Check',
    arrowLabel: (k) => `arrow ${k + 1}`,
    boxLabel: (k) => `box ${k + 1}`,
    noItems: 'No questions yet',
    back: 'Return to Dashboard',
  },
  vn: {
    title: 'Làm ngược lại',
    check: 'Kiểm tra',
    stuck: 'Chỉ cho em',
    cont: 'Tiếp tục',
    next: 'Câu tiếp theo',
    finish: 'Hoàn thành',
    solved: 'đã xong',
    level: 'Cấp độ',
    clean: 'Mọi bước đều đúng ngay lần đầu.',
    slipped: 'Đã giải — sai một lần, và em đã tự sửa được.',
    helped: 'Đã giải — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở',
    answer: 'Đáp án',
    shown: 'Đây là đáp án. Đọc kỹ rồi tiếp tục.',
    filled: 'Đáp án đã được điền sẵn cho em.',
    headSolve: 'Giải',
    headStory: 'Viết phương trình, rồi giải',
    stages: { equation: 'Phương trình', forward: 'Sơ đồ', reverse: 'Làm ngược', check: 'Thử lại' },
    letterIs: (L) => `Gọi số chưa biết là ${L}.`,
    eqTitle: 'Phương trình nào nói cùng một điều?',
    eqSub: 'Theo dõi những gì xảy ra với số đó, theo đúng thứ tự.',
    eqRight: 'Đúng — phương trình đó kể đúng câu chuyện.',
    fwdTitle: (L) => `Lập sơ đồ: điều gì xảy ra với ${L}, theo thứ tự?`,
    fwdSub: 'Bắt đầu từ chữ cái. Đặt mỗi phép toán lên mũi tên của nó.',
    trayHint: 'Chạm một phép toán, rồi chạm vào mũi tên — hoặc kéo thả vào đó. Chạm vào phép đã đặt để lấy lại.',
    fwdRight: 'Đúng — đó là chuỗi các phép toán.',
    revTitle: 'Giờ làm ngược lại — bước cuối trước.',
    revSub: 'Bắt đầu từ kết quả. Đặt phép ngược lên mỗi mũi tên và tính từng ô.',
    revRight: (L, v) => `Đúng — ${L} = ${v}. Giờ hãy thử lại.`,
    know: 'Em biết đáp án',
    tryIt: 'Thử',
    knowRight: (L, v) => `Đúng — ${L} = ${v}. Giờ hãy chứng minh trên sơ đồ: làm ngược từng bước.`,
    chkTitle: (L, v) => `Thay ${L} = ${v} vào lại.`,
    chkSub: 'Tính vế này. Kết quả phải bằng số ở vế bên kia của phương trình.',
    itWorks: 'Đúng rồi!',
    typeNumber: 'Hãy nhập một số trước.',
    working: 'Bài làm đến giờ',
    checkWord: 'Thử lại',
    arrowLabel: (k) => `mũi tên ${k + 1}`,
    boxLabel: (k) => `ô ${k + 1}`,
    noItems: 'Chưa có câu hỏi',
    back: 'Quay lại Bảng điều khiển',
  },
};
const both = (key, ...args) => {
  const en = T.en[key];
  const vn = T.vn[key];
  return typeof en === 'function' ? { en: en(...args), vn: vn(...args) } : { en, vn };
};
const STAGE_ICON = { equation: MessageSquareText, forward: Workflow, reverse: Undo2, check: CheckCheck };

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const blank = (v) => !String(v ?? '').trim();

/** The item's model and its trays, or null when the item cannot be built. */
function deriveItem(item) {
  if (!item?.id || (!item.eq && !item.ops)) return null;
  try {
    const model = equationModel(item);
    return {
      model,
      fwd: forwardTray(model, item.id),
      rev: reverseTray(model, item.id),
      choices: item.ops || item.story ? choicesFor(model, item.id) : [],
    };
  } catch {
    return null;
  }
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

/** A number box: whole numbers, negatives (and a/b, though items undo through whole numbers). */
function ValueBox({ value, onChange, onEnter, state, disabled, label, width = 'w-16 sm:w-20' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      inputMode="text"
      aria-label={label}
      autoComplete="off"
      spellCheck={false}
      placeholder="?"
      onChange={(e) => onChange(e.target.value.replace(/[^\d\-−/]/g, ''))}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      className={`${width} px-1 py-1 rounded-lg border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 disabled:opacity-90 ${RING[state] || IDLE}`}
    />
  );
}

/** A box of the flow chart. */
function FlowNode({ tone = 'step', children }) {
  const tones = {
    letter: 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200',
    step: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
    hidden: 'border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600',
    target: 'border-slate-500 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
    answer: 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200',
  };
  return (
    <div className={`min-w-[2.75rem] min-h-[2.75rem] px-2 py-1 rounded-xl border-2 flex items-center justify-center gap-1 text-lg sm:text-xl font-black whitespace-nowrap ${tones[tone]}`}>
      {children}
    </div>
  );
}

function ArrowHead() {
  return (
    <svg viewBox="0 0 18 12" className="w-4 h-3 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true">
      <path d="M1 6 H15 M10 1.5 L16 6 L10 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** An arrow's operation slot: a drop target that shows the chip placed on it. */
function OpSlot({ chip, state, disabled, waiting, onTap, onDropChip, label }) {
  const look = chip
    ? `${RING[state] || 'border-teal-500 bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-200'} border-solid`
    : `border-dashed ${waiting ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/20 animate-pulse' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/60'} text-slate-400`;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onTap}
      onDragOver={(e) => { if (!disabled) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; } }}
      onDrop={(e) => { e.preventDefault(); if (!disabled) onDropChip(e.dataTransfer.getData('text/plain')); }}
      className={`min-w-[4rem] h-11 px-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg whitespace-nowrap transition-colors disabled:cursor-default ${look}`}>
      {chip ? opText(chip) : '?'}
    </button>
  );
}

/** The chips to place. A placed chip leaves a ghost so the tray does not jump. */
function Tray({ chips, placedIds, picked, locked, onPick, onDrag }) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
      {chips.map((c) => {
        const used = placedIds.includes(c.id);
        if (used) {
          return <span key={c.id} className="min-w-[4rem] h-11 px-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 font-mono font-black text-lg text-transparent select-none" aria-hidden="true">{opText(c)}</span>;
        }
        const on = picked === c.id;
        return (
          <button key={c.id} type="button" disabled={locked} draggable={!locked}
            onClick={() => onPick(c.id)}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', c.id); e.dataTransfer.effectAllowed = 'move'; onDrag(c.id); }}
            className={`min-w-[4rem] h-11 px-3 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg whitespace-nowrap transition-all cursor-grab active:cursor-grabbing
              ${on ? 'border-teal-600 bg-teal-500 text-white -translate-y-0.5 shadow-md' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-teal-400'}`}>
            {opText(c)}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ the task */

export default function FlowSolve({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
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
  const [placed, setPlaced] = useState({});          // slot index -> chip id
  const [picked, setPicked] = useState(null);        // chip held for tap-to-place
  const [typed, setTyped] = useState({});
  const [marks, setMarks] = useState({});
  const [wrongPicks, setWrongPicks] = useState([]);
  const [knowOpen, setKnowOpen] = useState(false);
  const [knowMsg, setKnowMsg] = useState(null);

  const item = items[pos];
  const derived = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  if (!items.length || !derived) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const { model } = derived;
  const L = model.letter;
  const n = model.ops.length;
  const solText = valueText(model.solution);
  const hasEq = !!(item.ops || item.story);
  const stages = [...(hasEq ? ['equation'] : []), 'forward', 'reverse', 'check'];
  const st = stage || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(st);
  const passed = (s) => stages.indexOf(s) !== -1 && stages.indexOf(s) < stIndex;

  /* ---------------------------------------------------------- flow */
  const resetStage = () => {
    setLocked(false); setWrongs(0); setMsg(null); setPlaced({}); setPicked(null);
    setTyped({}); setMarks({}); setWrongPicks([]); setKnowOpen(false); setKnowMsg(null);
  };
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
  const judge = (ok, bad, reveal, good) => {
    if (locked) return;
    if (ok) { setLocked(true); setPicked(null); setMsg({ tone: 'ok', ...good }); return; }
    const k = wrongs + 1;
    setWrongs(k);
    setSlipped(true);
    if (k >= 2) {
      reveal();
      setLocked(true);
      setHelped(true);
      setPicked(null);
      setMsg({ tone: 'shown', en: `${bad.en} ${T.en.filled}`, vn: `${bad.vn || bad.en} ${T.vn.filled}` });
    } else setMsg({ tone: 'bad', en: bad.en, vn: bad.vn || bad.en });
  };
  const showMe = (reveal) => { reveal(); setLocked(true); setHelped(true); setPicked(null); setMsg({ tone: 'shown', ...both('shown') }); };

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
  // What the task opened with. X only logs an attempt when something was answered
  // THIS sitting — otherwise opening a finished task and closing it stamped a
  // full-score attempt on today, and the daily goal went green with no work done.
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- chips on arrows */
  const tray = st === 'reverse' ? derived.rev : derived.fwd;
  const chipOf = (id) => tray.find((c) => c.id === id) || null;
  const placedList = () => Array.from({ length: n }, (_, k) => chipOf(placed[k]));
  const slotLocked = (k) => locked || marks[`s${k}`] === 'good';
  const place = (k, chipId) => {
    if (slotLocked(k) || !chipOf(chipId)) return;
    const from = Object.keys(placed).find((s) => placed[s] === chipId);
    if (from !== undefined && slotLocked(Number(from))) return;
    const next = { ...placed };
    if (from !== undefined) delete next[from];
    next[k] = chipId;
    setPlaced(next);
    setMarks((m) => ({ ...m, [`s${k}`]: undefined, ...(from !== undefined ? { [`s${from}`]: undefined } : {}) }));
    setPicked(null);
  };
  const tapSlot = (k) => {
    if (slotLocked(k)) return;
    if (picked) { place(k, picked); return; }
    if (placed[k] !== undefined) {
      const next = { ...placed };
      delete next[k];
      setPlaced(next);
      setMarks((m) => ({ ...m, [`s${k}`]: undefined }));
    }
  };
  const tapChip = (id) => { if (!locked) setPicked((p) => (p === id ? null : id)); };
  /** Put the right chip on every arrow, keeping any that are already right. */
  const fillSlots = (want, chips) => {
    const next = {};
    const used = new Set();
    const mk = {};
    want.forEach((o, k) => {
      const c = chips.find((x) => x.id === placed[k]);
      if (c && sameOp(c, o)) { next[k] = c.id; used.add(c.id); mk[`s${k}`] = 'good'; }
    });
    want.forEach((o, k) => {
      if (next[k] !== undefined) return;
      const c = chips.find((x) => !used.has(x.id) && sameOp(x, o));
      if (c) { next[k] = c.id; used.add(c.id); }
      mk[`s${k}`] = 'shown';
    });
    setPlaced(next);
    return mk;
  };

  /* ---------------------------------------------------------- equation */
  const pickChoice = (c) => {
    if (locked || wrongPicks.includes(c.id)) return;
    if (c.correct) { judge(true, null, null, both('eqRight')); return; }
    setWrongPicks((w) => [...w, c.id]);
    judge(false, c.why, () => {});
  };

  /* ---------------------------------------------------------- forward */
  const revealForward = () => { setMarks(fillSlots(model.ops, derived.fwd)); };
  const checkForward = () => {
    if (locked) return;
    const d = diagnoseForward(model, placedList());
    if (d.empty) { setMsg({ tone: 'bad', en: d.en, vn: d.vn }); return; }
    setMarks(Object.fromEntries(d.marks.map((ok, k) => [`s${k}`, ok ? 'good' : 'bad'])));
    if (d.ok) judge(true, null, null, both('fwdRight'));
    else judge(false, d, revealForward);
  };

  /* ---------------------------------------------------------- reverse */
  const revealReverse = () => {
    const mk = fillSlots(model.inverse, derived.rev);
    const tp = { ...typed };
    model.inverse.forEach((_, k) => {
      const want = numTyped(model.back[k + 1]);
      const had = String(typed[`v${k}`] ?? '').replace(/−/g, '-').trim();
      mk[`v${k}`] = had === want ? 'good' : 'shown';
      tp[`v${k}`] = want;
    });
    setTyped(tp);
    setMarks(mk);
  };
  const checkReverse = () => {
    if (locked) return;
    const d = diagnoseReverse(model, placedList(), model.inverse.map((_, k) => typed[`v${k}`]));
    if (d.empty || d.unreadable) { setMsg({ tone: 'bad', en: d.en, vn: d.vn }); return; }
    const mk = {};
    model.inverse.forEach((_, k) => {
      mk[`s${k}`] = d.opMarks[k] ? 'good' : 'bad';
      mk[`v${k}`] = d.valMarks[k] ? 'good' : 'bad';
    });
    setMarks(mk);
    if (d.ok) judge(true, null, null, both('revRight', L, solText));
    else judge(false, d, revealReverse);
  };
  const tryKnow = () => {
    if (blank(typed.know)) { setKnowMsg({ tone: 'bad', ...both('typeNumber') }); return; }
    const d = tidySolve(diagnoseSolve(model, typed.know));
    setKnowMsg(d.ok ? { tone: 'info', ...both('knowRight', L, solText) } : { tone: 'bad', en: d.en, vn: d.vn });
  };

  /* ---------------------------------------------------------- check */
  const revealCheck = () => { setTyped({ check: numTyped(model.target) }); setMarks({ check: 'shown' }); };
  const checkCheck = () => {
    if (locked) return;
    if (blank(typed.check)) { setMsg({ tone: 'bad', ...both('typeNumber') }); return; }
    const d = diagnoseCheck(model, typed.check);
    if (d.code === 'unreadable') { setMarks({ check: 'bad' }); setMsg({ tone: 'bad', en: d.en, vn: d.vn }); return; }
    setMarks({ check: d.ok ? 'good' : 'bad' });
    judge(d.ok, d, revealCheck, both('itWorks'));
  };

  const type = (key, v) => {
    setTyped((x) => ({ ...x, [key]: v }));
    setMarks((m) => (m[key] === 'good' || m[key] === 'shown' ? m : { ...m, [key]: undefined }));
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.vn);
  const title = pick(pool?.title, pool?.titleVn) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introVn) : null;
  const think = hasEq && !item.story ? thinkSentence(model) : null;
  const storyText = item.story ? pick(item.story, item.storyVn) : think ? pick(think.en, think.vn) : null;
  const showEquation = !hasEq || passed('equation') || itemDone;
  const headline = hasEq && !showEquation ? t.headStory : t.headSolve;
  const placedIds = Object.values(placed);
  const lines = solveLines(model);

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
              <Undo2 className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{headline}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {storyText && (
              <div className="px-4 pt-3">
                <p className={`font-bold text-slate-700 dark:text-slate-200 leading-relaxed ${showEquation ? 'text-sm' : 'text-base sm:text-lg'}`}>{storyText}</p>
                {!showEquation && <p className="mt-1 text-xs font-bold text-slate-400">{t.letterIs(L)}</p>}
              </div>
            )}
            {showEquation ? (
              <div className="px-2 sm:px-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                <SafeBlockMath math={model.eqLatex} />
              </div>
            ) : <div className="h-3" />}
            {intro && <p className="px-4 pb-3 -mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === st} done={passed(s)} />
                ))}
              </div>
            )}
          </div>

          {!itemDone && passed('forward') && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 min-w-0">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.working}</div>
              <FlowChartPicture model={model} reverse={passed('reverse')} />
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {st === 'equation' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.eqTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.eqSub}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {derived.choices.map((c) => {
                      const wrong = wrongPicks.includes(c.id);
                      let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-teal-500';
                      if (locked && c.correct) style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
                      else if (wrong) style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
                      else if (locked) style = 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
                      return (
                        <button key={c.id} disabled={locked || wrong} onClick={() => pickChoice(c)}
                          className={`rounded-xl border-2 border-b-[4px] px-3 py-3 text-xl transition-all overflow-x-auto ${style}`}>
                          <SafeInlineMath math={c.latex} />
                        </button>
                      );
                    })}
                  </div>
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(() => {})} onContinue={advance} />
                </>
              )}

              {st === 'forward' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.fwdTitle(L)}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.fwdSub}</p>
                  <div className="flex flex-wrap items-center gap-y-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-slate-800 p-2 sm:p-3">
                    <FlowNode tone="letter"><SafeInlineMath math={L} /></FlowNode>
                    {model.ops.map((o, k) => {
                      const last = k === n - 1;
                      let node;
                      if (last) node = <FlowNode tone="target"><SafeInlineMath math={locked ? `${model.stepsLatex[k]} = ${numLatex(model.target)}` : numLatex(model.target)} /></FlowNode>;
                      else node = locked
                        ? <FlowNode tone="step"><SafeInlineMath math={model.stepsLatex[k]} /></FlowNode>
                        : <FlowNode tone="hidden">?</FlowNode>;
                      return (
                        <div key={k} className="inline-flex items-center gap-1 pl-1">
                          <OpSlot chip={chipOf(placed[k])} state={marks[`s${k}`]} disabled={slotLocked(k)} waiting={!!picked && !placed[k]}
                            label={t.arrowLabel(k)} onTap={() => tapSlot(k)} onDropChip={(id) => place(k, id)} />
                          <ArrowHead />
                          {node}
                        </div>
                      );
                    })}
                  </div>
                  <Tray chips={derived.fwd} placedIds={placedIds} picked={picked} locked={locked} onPick={tapChip} onDrag={setPicked} />
                  {!locked && <p className="mt-2 text-xs font-bold text-slate-400 text-center">{t.trayHint}</p>}
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealForward)} onCheck={checkForward} onContinue={advance} />
                </>
              )}

              {st === 'reverse' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.revTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.revSub}</p>
                  <div className="flex flex-wrap items-center gap-y-3 rounded-xl bg-orange-50/60 dark:bg-orange-900/10 border-2 border-orange-100 dark:border-orange-900/40 p-2 sm:p-3">
                    <FlowNode tone="target"><SafeInlineMath math={numLatex(model.target)} /></FlowNode>
                    {model.inverse.map((o, k) => {
                      const last = k === n - 1;
                      const vk = `v${k}`;
                      return (
                        <div key={k} className="inline-flex items-center gap-1 pl-1">
                          <OpSlot chip={chipOf(placed[k])} state={marks[`s${k}`]} disabled={slotLocked(k)} waiting={!!picked && !placed[k]}
                            label={t.arrowLabel(k)} onTap={() => tapSlot(k)} onDropChip={(id) => place(k, id)} />
                          <ArrowHead />
                          <FlowNode tone={last ? 'answer' : 'step'}>
                            {last && <span className="text-lg sm:text-xl"><SafeInlineMath math={`${L} =`} /></span>}
                            <ValueBox value={typed[vk]} state={marks[vk]} disabled={locked || marks[vk] === 'good'} onEnter={checkReverse}
                              label={last ? `${L} =` : t.boxLabel(k)} onChange={(v) => type(vk, v)} />
                          </FlowNode>
                        </div>
                      );
                    })}
                  </div>
                  <Tray chips={derived.rev} placedIds={placedIds} picked={picked} locked={locked} onPick={tapChip} onDrag={setPicked} />
                  {!locked && <p className="mt-2 text-xs font-bold text-slate-400 text-center">{t.trayHint}</p>}
                  {!locked && (
                    <div className="mt-3">
                      <button type="button" onClick={() => setKnowOpen((o) => !o)}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-teal-700 dark:text-teal-300 hover:underline">
                        <KeyRound className="w-3.5 h-3.5" strokeWidth={3} /> {t.know}
                        {knowOpen ? <ChevronUp className="w-3.5 h-3.5" strokeWidth={3} /> : <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />}
                      </button>
                      {knowOpen && (
                        <div className="mt-2 flex flex-wrap items-center gap-2 animate-in fade-in">
                          <span className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={`${L} =`} /></span>
                          <ValueBox value={typed.know} onEnter={tryKnow} label={t.know} onChange={(v) => setTyped((x) => ({ ...x, know: v }))} />
                          <button type="button" onClick={tryKnow} className={`px-4 py-2 text-white text-xs ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.tryIt}</button>
                          <div className="basis-full"><Message msg={knowMsg} lang={lang} /></div>
                        </div>
                      )}
                    </div>
                  )}
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealReverse)} onCheck={checkReverse} onContinue={advance} />
                </>
              )}

              {st === 'check' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.chkTitle(L, solText)}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.chkSub}</p>
                  <div className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                    <span className="overflow-x-auto max-w-full"><SafeInlineMath math={`${substLatex(model, model.solution)} =`} /></span>
                    <ValueBox value={typed.check} state={marks.check} disabled={locked} onEnter={checkCheck} label={t.checkWord} width="w-24"
                      onChange={(v) => type('check', v)} />
                  </div>
                  {locked && (
                    <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 px-4 py-3 animate-in fade-in zoom-in-95 ${marks.check === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200' : 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'}`}>
                      <CheckCircle2 className="w-6 h-6 shrink-0" strokeWidth={3} />
                      <span className="font-black text-lg">{t.itWorks}</span>
                      <span className="text-lg overflow-x-auto"><SafeInlineMath math={`${checkLatex(model)} \\;\\checkmark`} /></span>
                    </div>
                  )}
                  {msg?.tone !== 'ok' && <Message msg={msg} lang={lang} />}
                  <Actions t={t} locked={locked} onShow={() => showMe(revealCheck)} onCheck={checkCheck} onContinue={advance} />
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
                  <FlowChartPicture model={model} />
                  <div className="mt-3 flex flex-col gap-0.5 text-lg overflow-x-auto">
                    {lines.map((l, i) => <div key={i}><SafeInlineMath math={l} /></div>)}
                    <div className="flex flex-wrap items-center gap-x-1">
                      <span className="font-bold text-base">{t.checkWord}:</span>
                      <SafeInlineMath math={`${checkLatex(model)} \\;\\checkmark`} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(13,148,136,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100"><SafeInlineMath math={`${L} = ${numLatex(model.solution)}`} /></div>
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
