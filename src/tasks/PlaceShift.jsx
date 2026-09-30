import { useEffect, useMemo, useState } from 'react';
import {
  MoveHorizontal, Construction, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Lightbulb, Trophy, Pencil, TrendingUp,
  ListChecks, RotateCcw, Scale, PenLine,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import PlaceTable from '../components/math/PlaceTable.jsx';
import { placesOf } from '../utils/decimal';
import {
  shiftModel, questionLatex, answerLatex, tableCols, slideLimits, gapsAt, ghostOf, moveWords, pow10Text,
  diagnoseShift, diagnosePower, diagnoseConvert, CONVERT_CHOICES, MASS_UNITS,
} from '../utils/placeShift';

/* ------------------------------------------------------------------ *
 * SLIDE THE DIGITS — × and ÷ by powers of 10 on a place-value table
 * (Y7 Maths 3.1).
 *
 * Reads a unit's `placeShift`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } }, items: [
 *       { id, level, n: '7.2', op: '×', p: 3 },
 *       { id, level, kind: 'power', n: '6.1', op: '×', result: '61000' },
 *       { id, level, kind: 'convert', n: '4', from: 'kg', to: 'mg' },
 *       { id, level, kind: 'chain', n: '5', ops: [['×', 4], ['÷', 2], ['×', 3]] },
 *       (+ context / contextVn)
 *   ] }
 * utils/placeShift.js derives the moves, the placeholders and the answer.
 *
 * The stages:
 *   WAY    (convert items) which operation the change of unit is.
 *   SLIDE  ← / → move every digit one column; the point never moves. A chain
 *          slides once for each of its moves. "Find the power" slides until
 *          the digits sit on the ghost row.
 *   WRITE  type the ordinary number (or the power). A wrong answer is named:
 *          zeros stuck on after the point, the wrong way, a lost placeholder.
 *
 * A wrong answer can be tried again; a second one (or "Show me") fills the
 * stage in and the item pays half. Progress blob: { [itemId]: 1 | 0.5 },
 * score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#0087a8';
const INK_DARK = '#00697f';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Slide the Digits',
    check: 'Check', stuck: 'Show me', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every step right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    heads: { mul: 'Multiply by a power of 10', div: 'Divide by a power of 10', power: 'Find the power', convert: 'Change the unit', chain: 'One move after another' },
    stages: { way: 'Which way', slide: 'Slide', write: 'Write' },
    wayTitle: (a, b) => `${a} → ${b}: what happens to the number?`,
    waySub: 'Find both units on the ladder. Every step is 10³.',
    wayRight: (op) => `Right — ${op}. Now slide the digits.`,
    slideTitle: (op) => `Slide the digits: ${op}`,
    slideTitlePower: (op) => `Slide the digits: ${op} 10 to the power of what?`,
    slideSub: 'Press ← or → to move every digit. The point never moves.',
    slideSubPower: 'Slide until every digit sits on its ghost in the row below.',
    notMoved: 'not moved yet',
    slideFirst: 'Slide the digits first: press ← or →.',
    dirLeft: '× makes a number bigger, so the digits move LEFT — into bigger columns.',
    dirRight: '÷ makes a number smaller, so the digits move RIGHT — into smaller columns.',
    countWrong: (pw, p, got) => `Right direction — but it is one column for each power: ${pw} moves every digit ${p} place${p === 1 ? '' : 's'}. You moved ${got}.`,
    notLined: 'Not lined up yet — every digit must sit on its ghost in the row below.',
    slideRight: (w) => `Right — ${w}, and the point did not move.`,
    chainNext: (w) => `Right — ${w}. Now the next move.`,
    altogether: (w) => `Altogether the digits have moved ${w}.`,
    writeTitle: 'Now write it as an ordinary number.',
    writeSubGap: 'Every empty column between the digits and the point needs a placeholder 0.',
    writeSub: 'Read the digits straight off the table.',
    powerTitle: 'How many places did the digits move? That number is the power.',
    writeRight: 'Right.',
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    everyDigit: (w) => `Every digit moved ${w}. The point did not move.`,
    reset: 'Back to the start', left: 'Move every digit one place left', right: 'Move every digit one place right',
    power: 'power', typeHere: 'your answer',
    stepDown: 'to a smaller unit: × 10³', stepUp: 'to a bigger unit: ÷ 10³',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  vn: {
    title: 'Dịch chữ số',
    check: 'Kiểm tra', stuck: 'Chỉ cho em', next: 'Câu tiếp theo', finish: 'Hoàn thành',
    solved: 'đã xong', level: 'Cấp độ',
    clean: 'Mọi bước đều đúng ngay lần đầu.',
    slipped: 'Đã xong — sai một lần, và em đã tự sửa được.',
    helped: 'Đã xong — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở', answer: 'Đáp án',
    heads: { mul: 'Nhân với lũy thừa của 10', div: 'Chia cho lũy thừa của 10', power: 'Tìm số mũ', convert: 'Đổi đơn vị', chain: 'Dịch nhiều lần liên tiếp' },
    stages: { way: 'Chiều nào', slide: 'Dịch', write: 'Viết' },
    wayTitle: (a, b) => `${a} → ${b}: con số thay đổi thế nào?`,
    waySub: 'Tìm cả hai đơn vị trên thang. Mỗi bậc là 10³.',
    wayRight: (op) => `Đúng — ${op}. Giờ hãy dịch các chữ số.`,
    slideTitle: (op) => `Dịch các chữ số: ${op}`,
    slideTitlePower: (op) => `Dịch các chữ số: ${op} 10 mũ mấy?`,
    slideSub: 'Bấm ← hoặc → để dịch mọi chữ số. Dấu thập phân không bao giờ di chuyển.',
    slideSubPower: 'Dịch cho đến khi mỗi chữ số nằm đúng trên bóng của nó ở hàng dưới.',
    notMoved: 'chưa dịch',
    slideFirst: 'Hãy dịch các chữ số trước: bấm ← hoặc →.',
    dirLeft: '× làm số lớn hơn, nên các chữ số dịch sang TRÁI — vào các cột lớn hơn.',
    dirRight: '÷ làm số nhỏ hơn, nên các chữ số dịch sang PHẢI — vào các cột nhỏ hơn.',
    countWrong: (pw, p, got) => `Đúng chiều — nhưng mỗi số mũ là một cột: ${pw} làm mọi chữ số dịch ${p} cột. Em đã dịch ${got} cột.`,
    notLined: 'Chưa khớp — mỗi chữ số phải nằm đúng trên bóng của nó ở hàng dưới.',
    slideRight: (w) => `Đúng — ${w}, và dấu thập phân không di chuyển.`,
    chainNext: (w) => `Đúng — ${w}. Giờ đến lần dịch tiếp theo.`,
    altogether: (w) => `Tổng cộng các chữ số đã dịch ${w}.`,
    writeTitle: 'Bây giờ viết nó thành số thường.',
    writeSubGap: 'Mỗi cột trống giữa các chữ số và dấu thập phân cần một số 0 giữ chỗ.',
    writeSub: 'Đọc các chữ số ngay trên bảng.',
    powerTitle: 'Các chữ số đã dịch mấy cột? Con số đó chính là số mũ.',
    writeRight: 'Đúng.',
    filled: 'Đã điền sẵn cho em.',
    shown: 'Đây là đáp án. Đọc kỹ rồi làm tiếp.',
    everyDigit: (w) => `Mọi chữ số đã dịch ${w}. Dấu thập phân không di chuyển.`,
    reset: 'Về vị trí ban đầu', left: 'Dịch mọi chữ số một cột sang trái', right: 'Dịch mọi chữ số một cột sang phải',
    power: 'số mũ', typeHere: 'đáp án của em',
    stepDown: 'xuống đơn vị nhỏ hơn: × 10³', stepUp: 'lên đơn vị lớn hơn: ÷ 10³',
    noItems: 'Chưa có câu hỏi', back: 'Quay lại Bảng điều khiển',
  },
};
const both = (key, ...args) => {
  const en = T.en[key];
  const vn = T.vn[key];
  return typeof en === 'function' ? { en: en(...args), vn: vn(...args) } : { en, vn };
};
const STAGE_ICON = { way: Scale, slide: MoveHorizontal, write: PenLine };
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const opText = (m) => `${m.op} ${pow10Text(m.p)}`;
const signed = (m) => (m.op === '×' ? m.p : -m.p);

function deriveItem(item) {
  if (!item?.id) return null;
  try {
    const model = shiftModel(item);
    const cols = tableCols(model);
    return { model, cols, limits: slideLimits(model, cols), digits: placesOf(model.start) };
  } catch { return null; }
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

/** mg · g · kg · t, biggest on the left, with the rule on each step. */
function MassLadder({ from, to, t }) {
  const units = [...MASS_UNITS].reverse();
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 p-3">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {units.map((u, i) => (
          <div key={u} className="flex items-center gap-1 sm:gap-2">
            <div className={`min-w-[3rem] px-2 py-2 rounded-xl border-2 border-b-[4px] text-center font-black text-lg
              ${u === from ? 'border-teal-600 bg-teal-500 text-white' : u === to ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500'}`}>{u}</div>
            {i < units.length - 1 && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={3} />}
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
        <span>→ {t.stepDown}</span><span>← {t.stepUp}</span>
      </div>
    </div>
  );
}

export default function PlaceShift({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
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
  const [offset, setOffset] = useState(0);
  const [base, setBase] = useState(0);          // where the digits stood before this move of a chain
  const [moveIdx, setMoveIdx] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [wrongPicks, setWrongPicks] = useState([]);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [typed, setTyped] = useState('');
  const [mark, setMark] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const derived = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  const stages = derived?.model.kind === 'convert' ? ['way', 'slide', 'write'] : ['slide', 'write'];
  const stage = stageAt || stages[0];
  const sliding = !!derived && stage === 'slide' && !itemDone;
  const limits = derived?.limits;

  const slide = (by) => {
    if (!sliding) return;
    setOffset((o) => Math.max(limits[0], Math.min(limits[1], o + by)));
    setMsg((m) => (m?.tone === 'bad' || m?.tone === 'info' ? null : m));
  };
  // The arrow keys slide too.
  useEffect(() => {
    if (!sliding) return undefined;
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const by = e.key === 'ArrowLeft' ? 1 : -1;
      setOffset((o) => Math.max(limits[0], Math.min(limits[1], o + by)));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sliding, limits]);

  if (!items.length || !derived) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const { model, cols, digits } = derived;
  const { kind } = model;
  const move = model.moves[Math.min(moveIdx, model.moves.length - 1)];
  const stIndex = itemDone ? stages.length : stages.indexOf(stage);
  const head = kind === 'shift' ? (move.op === '×' ? t.heads.mul : t.heads.div) : t.heads[kind];

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
    setStageAt(null); setOffset(0); setBase(0); setMoveIdx(0); setWrongs(0); setWrongPicks([]);
    setHelped(false); setSlipped(false); setMsg(null); setTyped(''); setMark(null); setItemDone(false);
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());
  const toWrite = () => {
    setStageAt('write'); setWrongs(0);
    requestAnimationFrame(() => document.getElementById('placeshift-answer')?.focus());
  };

  /* ---------------------------------------------------------- way (convert) */
  const pickWay = (c) => {
    if (stage !== 'way' || wrongPicks.includes(c.id)) return;
    const d = diagnoseConvert(model, c);
    if (d.ok) { setStageAt('slide'); setWrongs(0); setMsg({ tone: 'ok', ...both('wayRight', opText(move)) }); return; }
    setSlipped(true);
    setWrongPicks((w) => [...w, c.id]);
    if (wrongs + 1 >= 2) {
      const f = both('filled');
      setHelped(true); setStageAt('slide'); setWrongs(0);
      setMsg({ tone: 'shown', en: `${d.en} ${opText(move)}. ${f.en}`, vn: `${d.vn} ${opText(move)}. ${f.vn}` });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const showWay = () => {
    setHelped(true); setSlipped(true); setStageAt('slide'); setWrongs(0);
    setMsg({ tone: 'shown', en: `${opText(move)}. ${T.en.shown}`, vn: `${opText(move)}. ${T.vn.shown}` });
  };

  /* ---------------------------------------------------------- slide */
  const afterSlide = (tone, extra) => {
    const w = moveWords(signed(move));
    const lastMove = moveIdx + 1 >= model.moves.length;
    const line = (lng) => (lastMove ? T[lng].slideRight(w[lng]) : T[lng].chainNext(w[lng]));
    // A chain ends by saying what its moves came to altogether.
    const net = moveWords(model.net);
    const sum = (lng) => (lastMove && kind === 'chain' ? ` ${T[lng].altogether(net[lng])}` : '');
    setMsg({ tone, en: `${extra?.en ? `${extra.en} ` : ''}${line('en')}${sum('en')}`, vn: `${extra?.vn ? `${extra.vn} ` : ''}${line('vn')}${sum('vn')}` });
    if (lastMove) toWrite();
    else { setBase(base + signed(move)); setMoveIdx(moveIdx + 1); setWrongs(0); }
  };
  const checkSlide = () => {
    const want = signed(move);
    const got = offset - base;
    if (got === 0) { setMsg({ tone: 'info', ...both('slideFirst') }); return; }
    if (got === want) { afterSlide('ok'); return; }
    setSlipped(true);
    const why = Math.sign(got) !== Math.sign(want) ? both(want > 0 ? 'dirLeft' : 'dirRight')
      : kind === 'power' ? both('notLined')
        : both('countWrong', pow10Text(move.p), move.p, Math.abs(got));
    if (wrongs + 1 >= 2) {
      setOffset(base + want);
      setHelped(true);
      afterSlide('shown', { en: `${why.en} ${T.en.filled}`, vn: `${why.vn} ${T.vn.filled}` });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', ...why });
  };
  const showSlide = () => {
    setOffset(base + signed(move));
    setHelped(true); setSlipped(true);
    afterSlide('shown', both('shown'));
  };

  /* ---------------------------------------------------------- write */
  const wantText = kind === 'power' ? String(model.power) : model.resultText;
  const checkWrite = () => {
    const d = kind === 'power' ? diagnosePower(model, typed) : diagnoseShift(model, typed);
    if (d.ok) { setMark('good'); setMsg({ tone: 'ok', ...both('writeRight') }); completeItem(helped); return; }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      const f = both('filled');
      setTyped(wantText); setMark('shown'); setHelped(true);
      setMsg({ tone: 'shown', en: `${d.en} ${f.en}`, vn: `${d.vn} ${f.vn}` });
      completeItem(true);
      return;
    }
    setWrongs(wrongs + 1);
    setMark('bad');
    setMsg({ tone: 'bad', en: d.en, vn: d.vn });
  };
  const showWrite = () => {
    setTyped(wantText); setMark('shown'); setHelped(true);
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
  const context = item.context ? pick(item.context, item.contextVn) : null;
  const gaps = gapsAt(model.start, offset);
  const movedBy = offset - (stage === 'slide' ? base : 0);
  const movedWords = movedBy === 0 ? t.notMoved : pick(moveWords(movedBy).en, moveWords(movedBy).vn);
  const netWords = moveWords(model.net);
  const inputTone = mark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : mark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : mark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const lead = kind === 'convert' ? `${model.startText}\\text{ ${item.from}} =`
    : kind === 'power' ? null
      : `${questionLatex(model)} =`;
  const onCheck = stage === 'way' ? null : stage === 'slide' ? checkSlide : checkWrite;
  const onShow = stage === 'way' ? showWay : stage === 'slide' ? showSlide : showWrite;

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
              <MoveHorizontal className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{head}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
            </div>
            {item.level && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level} {item.level}
                </span>
                {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
              </div>
            )}
            {context && <p className="px-4 pt-3 text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{context}</p>}
            <div className="px-2 sm:px-4 text-center text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
              <SafeBlockMath math={questionLatex(model)} />
            </div>
            {intro && <p className="px-4 pb-2 -mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {kind === 'chain' && (
              <div className="px-3 pb-2 flex flex-wrap justify-center gap-1.5">
                {model.moves.map((m, i) => {
                  const done = itemDone || stage === 'write' || i < moveIdx;
                  const on = !done && i === moveIdx;
                  return (
                    <span key={i} className={`px-2.5 py-1 rounded-lg border-2 font-mono font-black text-sm ${done ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]' : on ? 'border-teal-600 bg-teal-500 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}>{opText(m)}</span>
                  );
                })}
              </div>
            )}
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
              {stage === 'way' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.wayTitle(`${model.startText} ${item.from}`, item.to)}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.waySub}</p>
                  <MassLadder from={item.from} to={item.to} t={t} />
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CONVERT_CHOICES.map((c) => {
                      const wrong = wrongPicks.includes(c.id);
                      return (
                        <button key={c.id} disabled={wrong} onClick={() => pickWay(c)}
                          className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-mono font-black text-xl transition-all
                            ${wrong ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-teal-500'}`}>
                          {opText(c)}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {stage !== 'way' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">
                    {stage === 'slide' ? (kind === 'power' ? t.slideTitlePower(move.op) : t.slideTitle(opText(move))) : kind === 'power' ? t.powerTitle : t.writeTitle}
                  </div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {stage === 'slide' ? (kind === 'power' ? t.slideSubPower : t.slideSub) : kind === 'power' ? '' : gaps.placeholders.length ? t.writeSubGap : t.writeSub}
                  </p>
                  <PlaceTable cols={cols} digits={digits} offset={offset} placeholders={gaps.placeholders} dropped={gaps.dropped}
                    target={kind === 'power' ? ghostOf(model.result) : null} lang={lang} roomy />

                  {stage === 'slide' && (
                    <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
                      <button type="button" onClick={() => slide(1)} aria-label={t.left} title={t.left} disabled={offset >= limits[1]}
                        className={`w-14 h-12 flex items-center justify-center text-white ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                        <ArrowLeft className="w-6 h-6" strokeWidth={3} />
                      </button>
                      <div className="min-w-[9.5rem] px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-center font-black text-sm text-slate-700 dark:text-slate-200" aria-live="polite">{movedWords}</div>
                      <button type="button" onClick={() => slide(-1)} aria-label={t.right} title={t.right} disabled={offset <= limits[0]}
                        className={`w-14 h-12 flex items-center justify-center text-white ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                        <ArrowRight className="w-6 h-6" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => { setOffset(base); setMsg(null); }} aria-label={t.reset} title={t.reset} disabled={offset === base}
                        className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40">
                        <RotateCcw className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>
                  )}

                  {stage === 'write' && (
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                      {lead ? <SafeInlineMath math={lead} /> : <span className="text-base font-black uppercase tracking-widest text-slate-400">{t.power} =</span>}
                      <input
                        id="placeshift-answer"
                        value={typed}
                        onChange={(e) => { setTyped(e.target.value); if (mark === 'bad') setMark(null); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') checkWrite(); }}
                        inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                        className={`${kind === 'power' ? 'w-20' : 'w-44'} px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 ${inputTone}`}
                      />
                      {kind === 'convert' && <span className="font-black">{item.to}</span>}
                    </div>
                  )}
                </>
              )}

              <Message msg={msg} lang={lang} />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={onShow}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
                </button>
                {onCheck && <button onClick={onCheck} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
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
                  <PlaceTable cols={cols} digits={digits} offset={model.net} placeholders={model.placeholders} filled dropped={model.dropped} tone="good" lang={lang} roomy />
                  <p className="mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{t.everyDigit(pick(netWords.en, netWords.vn))}</p>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(0,135,168,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={answerLatex(model)} /></div>
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
