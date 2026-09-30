import { useEffect, useMemo, useState } from 'react';
import {
  Divide, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, ListChecks, Target,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import ShortDivBoard from '../components/math/ShortDivBoard.jsx';
import { focusBox } from '../components/math/shortDivBoardHelpers';
import {
  shortDivModel, qDigitOk, carryOk, qHint, carryHint, needZeroHint, extraZeroNote, questionText, MAX_ZEROS, MAX_COLS,
} from '../utils/shortDivision';
import { diagnoseRound, placeName } from '../utils/rounding';

/* ------------------------------------------------------------------ *
 * BUS STOP — short division, written the short way (Y7 Maths 3.2).
 *
 * Reads a unit's `shortDiv`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } }, items: [
 *       { id, level, dividend: '936', divisor: 4 },            exact
 *       { id, level, dividend: '47', divisor: 4 },             exact, once zeros are added
 *       { id, level, dividend: '58', divisor: 7, dp: 3 },      correct to 3 d.p.
 *       (+ context / contextVn)
 *   ] }
 * utils/shortDivision.js derives every column from the two numbers.
 *
 * The stages:
 *   DIVIDE  one column at a time, left to right. Type the digit on top and
 *           the remainder in the small box up-left of the NEXT digit. When
 *           the digits run out and it is not finished, +0 adds a zero after
 *           the point (pressing Check there instead is the named slip).
 *   ROUND   (dp items) type the answer rounded to the accuracy asked for.
 *
 * A wrong box can be tried again; a second wrong answer at the same step (or
 * "Show me") fills it in and the item pays half. Progress blob:
 * { [itemId]: 1 | 0.5 }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const UID = 'busstop';

const T = {
  en: {
    title: 'Bus Stop',
    check: 'Check', stuck: 'Show me', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every box right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    headExact: 'Divide', headRound: 'Divide, then round',
    stages: { divide: 'Divide', round: 'Round' },
    askCol: (d, cur) => `How many ${d}s in ${cur}?`,
    readCarry: (k, dg, cur) => `The small ${k} rides on the ${dg} — read them together: ${cur}.`,
    boxes: 'Digit on top. Remainder in the small box, up and to the left of the next digit.',
    typeTop: 'Type the digit that goes on top first.',
    fillCarry: 'There is a remainder. Write it in the small box — up and to the left of the next digit.',
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    pointNote: 'The point goes in the answer too — straight above the one in the number.',
    maxZeros: 'That is as many zeros as the page holds.',
    addZero: 'Add a zero after the point', removeZero: 'Take the last zero away',
    top: 'digit on top, column', carry: 'remainder carried onto digit',
    roundTitle: (q, name) => `Now round ${q} to ${name}.`,
    roundSub: 'The last digit you worked out is the one that decides.',
    roundRight: 'Right — rounded once, from the digit after.',
    typeHere: 'rounded answer',
    noItems: 'No questions yet', back: 'Return to Dashboard',
    dp: 'd.p.',
  },
  vn: {
    title: 'Chia ngắn',
    check: 'Kiểm tra', stuck: 'Chỉ cho em', next: 'Câu tiếp theo', finish: 'Hoàn thành',
    solved: 'đã xong', level: 'Cấp độ',
    clean: 'Mọi ô đều đúng ngay lần đầu.',
    slipped: 'Đã xong — sai một lần, và em đã tự sửa được.',
    helped: 'Đã xong — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở', answer: 'Đáp án',
    headExact: 'Chia', headRound: 'Chia, rồi làm tròn',
    stages: { divide: 'Chia', round: 'Làm tròn' },
    askCol: (d, cur) => `${cur} chứa bao nhiêu lần ${d}?`,
    readCarry: (k, dg, cur) => `Số ${k} nhỏ đi cùng số ${dg} — đọc chung thành ${cur}.`,
    boxes: 'Chữ số ở trên. Số dư viết vào ô nhỏ, phía trên bên trái của chữ số tiếp theo.',
    typeTop: 'Hãy nhập chữ số ở phía trên trước.',
    fillCarry: 'Có số dư. Hãy viết nó vào ô nhỏ — phía trên bên trái của chữ số tiếp theo.',
    filled: 'Đã điền sẵn cho em.',
    shown: 'Đây là đáp án. Đọc kỹ rồi làm tiếp.',
    pointNote: 'Dấu thập phân cũng có ở đáp án — ngay phía trên dấu thập phân của số bị chia.',
    maxZeros: 'Trang giấy chỉ đủ chỗ cho chừng đó số 0.',
    addZero: 'Thêm một số 0 sau dấu thập phân', removeZero: 'Bỏ số 0 cuối cùng',
    top: 'chữ số ở trên, cột', carry: 'số dư nhớ sang chữ số',
    roundTitle: (q, name) => `Bây giờ làm tròn ${q} đến ${name}.`,
    roundSub: 'Chữ số cuối cùng em vừa tính chính là chữ số quyết định.',
    roundRight: 'Đúng — làm tròn một lần, dựa vào chữ số đứng sau.',
    typeHere: 'đáp án đã làm tròn',
    noItems: 'Chưa có câu hỏi', back: 'Quay lại Bảng điều khiển',
    dp: 'c.s.t.p.',
  },
};
const both = (key, ...args) => {
  const en = T.en[key];
  const vn = T.vn[key];
  return typeof en === 'function' ? { en: en(...args), vn: vn(...args) } : { en, vn };
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function deriveItem(item) {
  if (!item?.id) return null;
  try { return shortDivModel(item); } catch { return null; }
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

export default function ShortDivision({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
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
  const [stage, setStage] = useState('divide');
  const [zeros, setZeros] = useState(0);
  const [entries, setEntries] = useState({});
  const [marks, setMarks] = useState({});
  const [col, setCol] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [note, setNote] = useState(null);
  const [roundTyped, setRoundTyped] = useState('');
  const [roundMark, setRoundMark] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;

  // Open with the cursor in the first box.
  useEffect(() => { focusBox(UID, 'q0'); }, []);
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const avail = model.givenCols + zeros;
  const need = model.cols.length;
  const column = model.cols[Math.min(col, need - 1)];
  const dividing = stage === 'divide' && !itemDone;
  const hasRound = model.dp != null;
  const stages = hasRound ? ['divide', 'round'] : ['divide'];

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
    setPos((p) => p + 1);
    setStage('divide'); setZeros(0); setEntries({}); setMarks({}); setCol(0); setWrongs(0);
    setHelped(false); setSlipped(false); setMsg(null); setNote(null);
    setRoundTyped(''); setRoundMark(null); setItemDone(false);
    focusBox(UID, 'q0');
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  // X only logs an attempt when something was answered THIS sitting.
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- the board */
  const stateOf = (id) => {
    // a leading 0 that was (rightly) left blank stays an empty dashed box
    if (marks[id] === 'good' && id.startsWith('q') && !String(entries[id] ?? '').trim()) return 'idle';
    if (marks[id] === 'good' || marks[id] === 'shown') return marks[id];
    if (!dividing) return 'idle';
    if (id === `q${col}` || (id === `k${col + 1}` && col + 1 < avail)) return marks[id] === 'bad' ? 'bad' : 'live';
    return 'idle';
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((m) => ({ ...m, [id]: undefined }));
    if (msg?.tone === 'bad') setMsg(null);
  };
  const addZero = () => {
    if (zeros >= MAX_ZEROS || avail >= MAX_COLS) { setMsg({ tone: 'info', ...both('maxZeros') }); return; }
    setNote(zeros === 0 && model.givenCols === model.intLen ? both('pointNote') : null);
    setZeros(zeros + 1);
    if (msg?.tone === 'bad') setMsg(null);
    // the new zero is the next digit: its small box is live straight away
    if (col === avail - 1) focusBox(UID, marks[`q${col}`] === 'good' ? `k${avail}` : `q${col}`);
  };
  const lastCol = avail - 1;
  const canRemove = dividing && zeros > 0 && lastCol > col;
  const removeZero = () => {
    if (!canRemove) return;
    setZeros(zeros - 1);
    setEntries((e) => { const n = { ...e }; delete n[`k${lastCol}`]; delete n[`q${lastCol}`]; return n; });
    setMarks((m) => { const n = { ...m }; delete n[`k${lastCol}`]; delete n[`q${lastCol}`]; return n; });
    setNote(null);
  };

  /** The division is finished: take extra zeros away, then round or finish. */
  const finishDivide = (zerosNow, wasHelped) => {
    if (model.givenCols + zerosNow > need) {
      setZeros(model.zerosNeeded);
      setNote(extraZeroNote(model));
    } else setNote(null);
    setMsg(null);
    setWrongs(0);
    if (hasRound) { setStage('round'); requestAnimationFrame(() => document.getElementById(`${UID}-round`)?.focus()); }
    else completeItem(wasHelped);
  };
  const stepOn = (zerosNow, wasHelped) => {
    if (col === need - 1) { finishDivide(zerosNow, wasHelped); return; }
    setCol(col + 1);
    setWrongs(0);
    focusBox(UID, `q${col + 1}`);
  };

  /** Fill this column in (after two wrong tries, or Show me). */
  const revealStep = (why) => {
    const qId = `q${col}`;
    const kId = `k${col + 1}`;
    const last = col === need - 1;
    let zerosNow = zeros;
    if (!last && col + 1 >= avail) { zerosNow = zeros + 1; setZeros(zerosNow); }
    const showCarry = col + 1 < model.givenCols + zerosNow;
    setEntries((e) => ({ ...e, [qId]: String(column.q), ...(showCarry ? { [kId]: String(column.carryOut) } : {}) }));
    setMarks((m) => ({
      ...m,
      [qId]: m[qId] === 'good' ? 'good' : 'shown',
      ...(showCarry ? { [kId]: m[kId] === 'good' ? 'good' : 'shown' } : {}),
    }));
    setHelped(true);
    setSlipped(true);
    stepOn(zerosNow, true);
    const f = both(why ? 'filled' : 'shown');
    setMsg({ tone: 'shown', en: why ? `${why.en} ${f.en}` : f.en, vn: why ? `${why.vn} ${f.vn}` : f.vn });
  };

  const checkDivide = () => {
    const qId = `q${col}`;
    const kId = `k${col + 1}`;
    const hasNext = col + 1 < avail;
    const last = col === need - 1;
    const qText = String(entries[qId] ?? '').trim();
    if (!qText && !column.leading) { setMsg({ tone: 'info', ...both('typeTop') }); focusBox(UID, qId); return; }
    const qOk = qDigitOk(column, qText);
    const kText = String(entries[kId] ?? '').trim();
    if (qOk && hasNext && !kText && column.carryOut !== 0) {
      setMarks((m) => ({ ...m, [qId]: 'good' }));
      setMsg({ tone: 'info', ...both('fillCarry') });
      focusBox(UID, kId);
      return;
    }
    const kOk = !hasNext || carryOk(column.carryOut, kText);
    const needZero = !hasNext && !last;

    if (qOk && kOk && !needZero) {
      setMarks((m) => ({ ...m, [qId]: 'good', ...(hasNext ? { [kId]: 'good' } : {}) }));
      setMsg(null);
      stepOn(zeros, helped);
      return;
    }
    if (qOk && needZero) {
      // Right digit, but the page has run out: a zero is needed. Named, not counted.
      setMarks((m) => ({ ...m, [qId]: 'good' }));
      setSlipped(true);
      setMsg({ tone: 'bad', ...needZeroHint(model, column) });
      return;
    }
    const why = !qOk ? qHint(model, column) : carryHint(model, column);
    setSlipped(true);
    if (wrongs + 1 >= 2) { revealStep(why); return; }
    setWrongs(wrongs + 1);
    setMarks((m) => ({ ...m, [qId]: qOk ? 'good' : 'bad', ...(hasNext && qOk ? { [kId]: 'bad' } : {}) }));
    setMsg({ tone: 'bad', ...why });
    focusBox(UID, qOk ? kId : qId);
  };

  /* ---------------------------------------------------------- round */
  const checkRound = () => {
    const d = diagnoseRound(model.round, model.dp, roundTyped);
    if (d.ok) { setRoundMark('good'); setMsg({ tone: 'ok', ...both('roundRight') }); completeItem(helped); return; }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      const f = both('filled');
      setRoundTyped(model.answerText);
      setRoundMark('shown');
      setHelped(true);
      setMsg({ tone: 'shown', en: `${d.en} ${f.en}`, vn: `${d.vn} ${f.vn}` });
      completeItem(true);
      return;
    }
    setWrongs(wrongs + 1);
    setRoundMark('bad');
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const showRound = () => {
    setRoundTyped(model.answerText);
    setRoundMark('shown');
    setHelped(true);
    setMsg({ tone: 'shown', ...both('shown') });
    completeItem(true);
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.vn);
  const title = pick(pool?.title, pool?.titleVn) || t.title;
  const intro = pos === 0 ? pick(pool?.intro, pool?.introVn) : null;
  const q = questionText(model);
  const context = item.context ? pick(item.context, item.contextVn) : null;
  const want = hasRound ? placeName(model.dp) : null;
  const sum = `${model.dividendText} \\div ${model.divisor}`;
  const answerLatex = hasRound
    ? `${sum} = ${model.quotientText}${model.exact ? '' : '\\ldots'} \\approx ${model.answerText}\\;\\text{(${model.dp} ${t.dp})}`
    : `${sum} = ${model.answerText}`;
  const roundTone = roundMark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : roundMark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : roundMark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const labels = { addZero: t.addZero, removeZero: t.removeZero, top: t.top, carry: t.carry };

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
              <Divide className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{hasRound ? t.headRound : t.headExact}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {context && <p className="px-4 pt-3 text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{context}</p>}
            <p className="px-4 pt-3 pb-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-snug">{pick(q.en, q.vn)}</p>
            {intro && <p className="px-4 pb-1 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            <div className="px-3 py-3 flex flex-wrap gap-1.5">
              {stages.length > 1 && !itemDone && stages.map((s) => (
                <Stage key={s} icon={s === 'divide' ? Divide : Target} label={t.stages[s]} active={s === stage} done={stages.indexOf(s) < stages.indexOf(stage)} />
              ))}
            </div>
          </div>
        </div>

        {/* right: the bus stop */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
              {dividing && (
                <div className="mb-3">
                  <div className="font-black text-slate-800 dark:text-slate-100 text-lg">{t.askCol(model.divisor, column.current)}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {column.carryIn > 0 ? t.readCarry(column.carryIn, column.digit, column.current) : t.boxes}
                  </p>
                </div>
              )}
              {stage === 'round' && (
                <div className="mb-3">
                  <div className="font-black text-slate-800 dark:text-slate-100 text-lg">{t.roundTitle(model.quotientText, pick(want.en, want.vn))}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t.roundSub}</p>
                </div>
              )}

              <ShortDivBoard model={model} zeros={zeros} entries={entries} stateOf={stateOf} onEdit={edit}
                onEnter={dividing ? checkDivide : undefined}
                onAddZero={dividing ? addZero : null} onRemoveZero={canRemove ? removeZero : null}
                activeCol={dividing ? col : null} uid={UID} ink={INK} labels={labels} />

              {note && (
                <p className="mt-2 text-center text-xs font-bold text-orange-600 dark:text-orange-300">{pick(note.en, note.vn)}</p>
              )}

              {stage === 'round' && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                  <SafeInlineMath math={`${sum} \\approx`} />
                  <input
                    id={`${UID}-round`}
                    value={roundTyped}
                    onChange={(e) => { setRoundTyped(e.target.value); if (roundMark === 'bad') setRoundMark(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkRound(); }}
                    inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                    className={`w-36 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-violet-500 ${roundTone}`}
                  />
                  <span className="text-sm font-bold text-slate-400">({model.dp} {t.dp})</span>
                </div>
              )}

              <Message msg={msg} lang={lang} />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={stage === 'round' ? showRound : () => revealStep(null)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
                <button onClick={stage === 'round' ? checkRound : checkDivide} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
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
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 min-w-0">
                  <ShortDivBoard model={model} zeros={model.zerosNeeded} entries={entries} stateOf={stateOf} onEdit={() => {}} uid={`${UID}-done`} ink={INK} labels={labels} />
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={answerLatex} /></div>
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
