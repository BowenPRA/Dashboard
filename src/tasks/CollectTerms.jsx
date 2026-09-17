import { useMemo, useState } from 'react';
import {
  ShoppingBasket, Construction, CheckCircle2, XCircle, ArrowRight, Lightbulb, Trophy, Pencil,
  TrendingUp, Search, Sigma, PenLine, HelpCircle, ListChecks, GripVertical,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { collectModel, diagnoseBasket, diagnoseSimplify } from '../utils/algebra';
import {
  termsOf, chipSign, rowLatex, regroupedIndexes, regroupedColourLatex, basketTotalText,
  sortMistake, missingKinds, seededShuffle, kindColour,
} from '../components/math/algebraTaskHelpers';

/* ------------------------------------------------------------------ *
 * COLLECT IT — collecting like terms, the way the classroom deck does it:
 * FIND the like terms (each term, sign attached, goes into the basket for
 * its kind), COLLECT each basket (type its total), WRITE the answer in its
 * simplest form.
 *
 * Reads a unit's `collectTerms`:
 *   { title, titleVn, intro?, introVn?, levels: { n: { en, vn } },
 *     items: [{ id, level, expr, context?, contextVn? }] }
 * `expr` is the question only. utils/algebra.js derives the terms, kinds,
 * basket totals, the answer and the slip behind a wrong answer.
 *
 * An expression with no like terms goes FIND → DECIDE ("can it be
 * simplified?" — no). A wrong answer can be tried again; a second wrong
 * answer (or "Show me") fills the stage in and the item pays half. A yes/no
 * gets one try. A form slip on the answer (right value, not finished) is a
 * nudge, not a wrong answer.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Collect It',
    headline: 'Simplify',
    level: (n) => `Level ${n}`,
    solved: 'solved',
    stages: { find: 'Find', collect: 'Collect', write: 'Write', decide: 'Simplify?' },
    check: 'Check',
    stuck: 'Show me',
    cont: 'Continue',
    next: 'Next question',
    finish: 'Finish',
    clean: 'Every step right first time.',
    slipped: 'Done — one wrong turn, and you fixed it yourself.',
    helped: 'Done — with a step shown to you.',
    bookCopy: 'Copy this into your book',
    answer: 'Answer',
    shown: 'Here it is. Read it, then continue.',
    filled: 'The answer is filled in for you.',
    empty: 'No questions yet',
    back: 'Return to Dashboard',
    working: 'Like terms side by side',
    findTitle: 'Sort each term into the basket for its kind.',
    findSub: 'The sign in front of a term moves with it. Tap a term, then tap a basket — or drag it.',
    tray: 'The terms',
    trayDone: 'Every term is in a basket. Press Check.',
    dropHere: 'Tap or drop a term here',
    placeAll: 'Put every term in a basket first.',
    findRight: 'Sorted — every term is in the basket for its kind, with its sign.',
    cameBack: (n) => `${n} terms came back to the row.`,
    collectTitle: 'Total each basket.',
    collectSub: 'Go along the row sign by sign. A letter on its own counts as 1.',
    collectHint: 'Type like 4x or −2.',
    fillAll: 'Fill in every box first.',
    collectRight: 'Right — each kind now has one total.',
    writeTitle: 'Write the answer in its simplest form.',
    writeSub: 'Put the basket totals together, each with its own sign.',
    writeHint: 'Type like 4x + 6y. You can type x² as x^2.',
    totals: 'Basket totals',
    typeFirst: 'Type your answer first.',
    writeRight: (a) => `Right — ${a} is in its simplest form.`,
    decideTitle: 'Can it be simplified?',
    decideSub: 'Look at the baskets. Is there a basket with two terms in it?',
    yes: 'Yes — collect',
    no: 'No — it is finished',
    decideRight: 'Right — every basket holds just one term, so nothing collects. It is already in its simplest form.',
    decideWrong: 'It cannot be simplified: every basket holds just one term, so no two terms are alike. It is already in its simplest form.',
    noLike: 'No like terms: already in its simplest form.',
  },
  vn: {
    title: 'Gộp hạng tử',
    headline: 'Rút gọn',
    level: (n) => `Mức ${n}`,
    solved: 'đã giải',
    stages: { find: 'Tìm', collect: 'Gộp', write: 'Viết', decide: 'Rút gọn?' },
    check: 'Kiểm tra',
    stuck: 'Chỉ cho em',
    cont: 'Tiếp tục',
    next: 'Câu tiếp theo',
    finish: 'Hoàn thành',
    clean: 'Mọi bước đều đúng ngay lần đầu.',
    slipped: 'Xong — có một lần sai, và em đã tự sửa.',
    helped: 'Xong — có một bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở',
    answer: 'Đáp án',
    shown: 'Đây là đáp án. Đọc kỹ rồi tiếp tục.',
    filled: 'Đáp án đã được điền cho em.',
    empty: 'Chưa có câu hỏi',
    back: 'Quay lại Bảng điều khiển',
    working: 'Các hạng tử đồng dạng đứng cạnh nhau',
    findTitle: 'Xếp từng hạng tử vào rổ cùng loại.',
    findSub: 'Dấu đứng trước hạng tử đi cùng với nó. Chạm vào một hạng tử rồi chạm vào rổ — hoặc kéo thả.',
    tray: 'Các hạng tử',
    trayDone: 'Mọi hạng tử đã ở trong rổ. Bấm Kiểm tra.',
    dropHere: 'Chạm hoặc thả hạng tử vào đây',
    placeAll: 'Hãy xếp mọi hạng tử vào rổ trước.',
    findRight: 'Đã xếp xong — mọi hạng tử đều ở đúng rổ, mang theo dấu của nó.',
    cameBack: (n) => `${n} hạng tử đã quay về hàng.`,
    collectTitle: 'Tính tổng từng rổ.',
    collectSub: 'Đi dọc theo hàng, theo từng dấu. Chữ cái đứng một mình được tính là 1.',
    collectHint: 'Nhập như 4x hoặc −2.',
    fillAll: 'Hãy điền mọi ô trước.',
    collectRight: 'Đúng — mỗi loại giờ chỉ còn một tổng.',
    writeTitle: 'Viết đáp án ở dạng gọn nhất.',
    writeSub: 'Ghép tổng của các rổ lại, mỗi tổng mang theo dấu của nó.',
    writeHint: 'Nhập như 4x + 6y. Có thể nhập x² là x^2.',
    totals: 'Tổng của các rổ',
    typeFirst: 'Hãy nhập đáp án trước.',
    writeRight: (a) => `Đúng — ${a} là dạng gọn nhất.`,
    decideTitle: 'Có rút gọn được không?',
    decideSub: 'Nhìn vào các rổ. Có rổ nào chứa hai hạng tử không?',
    yes: 'Có — gộp lại',
    no: 'Không — đã xong',
    decideRight: 'Đúng — mỗi rổ chỉ có một hạng tử, nên không gộp được gì. Biểu thức đã ở dạng gọn nhất.',
    decideWrong: 'Không rút gọn được: mỗi rổ chỉ có một hạng tử, nên không có hai hạng tử nào đồng dạng. Biểu thức đã ở dạng gọn nhất.',
    noLike: 'Không có hạng tử đồng dạng: đã ở dạng gọn nhất.',
  },
};
const both = (key, ...args) => ({
  en: typeof T.en[key] === 'function' ? T.en[key](...args) : T.en[key],
  vn: typeof T.vn[key] === 'function' ? T.vn[key](...args) : T.vn[key],
});
const STAGE_ICON = { find: Search, collect: Sigma, write: PenLine, decide: HelpCircle };

const RING = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
  nudge: 'border-amber-400 bg-white dark:bg-slate-900',
};
const IDLE = 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

/** The chip index a drop carries (set in onDragStart), or null for anything else dropped. */
const droppedChip = (e) => {
  const raw = e.dataTransfer?.getData('text/plain') ?? '';
  return /^\d+$/.test(raw) ? Number(raw) : null;
};

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
  const text = msg ? (lang === 'vn' && msg.vn ? msg.vn : msg.en) : null;
  if (!text) return null;
  const tone = msg.ok ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.shown || msg.info ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div role="status" className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed animate-in fade-in ${tone}`}>
      {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : msg.shown || msg.info ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
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

/** A typed expression: 4x + 6y, −2, x^2. Enter checks. */
function ExprBox({ value, onChange, onEnter, state, disabled, label, className = 'w-28' }) {
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      inputMode="text"
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      placeholder="?"
      spellCheck={false}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      className={`${className} min-w-0 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 disabled:opacity-80 ${RING[state] || IDLE}`}
    />
  );
}

/** A term chip: its own sign, then the term as written. */
function Chip({ term, state, picked, movable, onClick, onDragStart }) {
  const sign = chipSign(term, term.index === 0);
  let style = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-violet-400';
  if (state === 'good') style = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#2f5a00] dark:text-lime-100';
  else if (state === 'shown') style = 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-900 dark:text-amber-100';
  else if (state === 'bad') style = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-700 dark:text-rose-200';
  if (picked) style = 'bg-violet-50 dark:bg-violet-900/30 border-violet-500 text-violet-900 dark:text-violet-100 ring-4 ring-violet-500/20 -translate-y-0.5';
  return (
    <button
      type="button"
      draggable={movable}
      onDragStart={movable ? onDragStart : undefined}
      onClick={onClick}
      aria-pressed={picked}
      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-b-[4px] font-black text-xl transition-all select-none ${movable ? 'cursor-grab' : 'cursor-default'} ${style}`}
    >
      {movable && <GripVertical className="w-3.5 h-3.5 opacity-30 -ml-1" strokeWidth={3} />}
      {sign && <span className="font-black leading-none">{sign}</span>}
      <SafeInlineMath math={term.body} />
    </button>
  );
}

/** Two big answer buttons with right/wrong colouring once locked. */
function Choices({ options, locked, picked, right, onPick }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(([v, label]) => {
        let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500';
        if (locked) style = v === right ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200' : picked === v ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600' : 'opacity-50 border-slate-200 dark:border-slate-700 text-slate-400';
        return <button key={String(v)} disabled={locked} onClick={() => onPick(v)} className={`rounded-xl border-2 border-b-[4px] px-3 py-3 font-black text-sm transition-all ${style}`}>{label}</button>;
      })}
    </div>
  );
}

function buildEntry(it) {
  try {
    const model = collectModel(it.expr);
    const terms = termsOf(model);
    return {
      item: it,
      model,
      terms,
      basketOrder: seededShuffle(model.baskets.map((_, i) => i), `${it.id}|${it.expr}`),
      stages: model.simplifiable ? ['find', 'collect', 'write'] : ['find', 'decide'],
    };
  } catch {
    return null;
  }
}

export default function CollectTerms({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
  const entries = useMemo(() => (pool?.items || []).filter((it) => it?.id && it?.expr).map(buildEntry).filter(Boolean), [pool]);

  const [lang, setLang] = useState('en');
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = entries.findIndex((e) => savedData?.[e.item.id] == null);
    return i === -1 ? 0 : i;
  });
  const [startPos] = useState(pos);
  // Everything already saved: a retake walks every item again (the saved scores stand until replaced).
  const [retake] = useState(() => entries.length > 0 && entries.every((e) => savedData?.[e.item.id] != null));
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
  const [picked, setPicked] = useState(null);       // decide: true/false
  const [placed, setPlaced] = useState({});         // term index -> basket index
  const [chipMarks, setChipMarks] = useState({});   // term index -> good | bad | shown
  const [holding, setHolding] = useState(null);     // the chip picked up (term index)

  const t = lang === 'vn' ? T.vn : T.en;
  const L = (en, vn) => (lang === 'vn' && vn ? vn : en);
  const entry = entries[pos];

  if (!entry) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.empty}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const { item, model, terms, basketOrder, stages } = entry;
  const st = stage || stages[0];
  const stIndex = itemDone ? stages.length : stages.indexOf(st);
  const passed = (s) => stages.indexOf(s) !== -1 && stages.indexOf(s) < stIndex;
  const fixed = (i) => chipMarks[i] === 'good' || chipMarks[i] === 'shown';

  /* ---------------------------------------------------------- flow */
  const resetStage = () => { setLocked(false); setWrongs(0); setMsg(null); setTyped({}); setMarks({}); setPicked(null); setHolding(null); };
  const goStage = (s) => { setStage(s); resetStage(); };

  const summary = (res) => {
    const cleared = entries.reduce((s, e) => s + (res[e.item.id]?.score || 0), 0);
    const raw = entries.length ? Math.round((cleared / entries.length) * 10) : 0;
    const blob = Object.fromEntries(entries.filter((e) => res[e.item.id]).map((e) => [e.item.id, res[e.item.id].score]));
    const log = entries.map((e) => ({ itemId: e.item.id, correct: res[e.item.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const completeItem = () => {
    const next = { ...results, [item.id]: { score: helped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    resetStage();
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const advance = () => {
    const next = stages[stages.indexOf(st) + 1];
    if (next) goStage(next);
    else completeItem();
  };

  /** A right answer locks the stage; a second wrong one fills it in and the item pays half. */
  const judge = (ok, bad, reveal, good) => {
    if (locked) return;
    if (ok) { setLocked(true); setMsg({ ok: true, ...good }); return; }
    const n = wrongs + 1;
    setWrongs(n);
    setSlipped(true);
    if (n >= 2) {
      reveal();
      setLocked(true);
      setHelped(true);
      setMsg({ shown: true, en: `${bad.en} ${T.en.filled}`, vn: `${bad.vn} ${T.vn.filled}` });
    } else setMsg({ ok: false, en: bad.en, vn: bad.vn });
  };
  const showMe = (reveal) => { reveal(); setLocked(true); setHelped(true); setMsg({ shown: true, ...both('shown') }); };

  // The next item still to do (a resumed attempt skips the ones already saved).
  const nextPos = retake
    ? (pos + 1 < entries.length ? pos + 1 : -1)
    : entries.findIndex((e, i) => i > pos && !results[e.item.id]);
  const goNext = () => {
    setPos(nextPos); setStage(null);
    setHelped(false); setSlipped(false); setItemDone(false);
    setPlaced({}); setChipMarks({});
    resetStage();
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- find */
  const put = (i, bi) => {
    if (locked || i == null || !terms[i] || fixed(i) || !model.baskets[bi]) return;
    setPlaced((p) => ({ ...p, [i]: bi }));
    setChipMarks((m) => { const n = { ...m }; delete n[i]; return n; });
    setHolding(null);
  };
  const unput = (i) => {
    if (locked || i == null || !terms[i] || fixed(i)) return;
    setPlaced((p) => { const n = { ...p }; delete n[i]; return n; });
    setHolding(null);
  };
  const revealFind = (fromPlaced, fromMarks) => () => {
    const p = { ...fromPlaced };
    const mk = { ...fromMarks };
    model.baskets.forEach((b, bi) => b.terms.forEach((i) => {
      if (mk[i] !== 'good') { p[i] = bi; mk[i] = 'shown'; }
    }));
    setPlaced(p); setChipMarks(mk); setHolding(null);
  };
  const checkFind = () => {
    if (locked) return;
    if (model.written.some((w) => placed[w.index] == null)) { setMsg({ info: true, ...both('placeAll') }); return; }
    const nextPlaced = { ...placed };
    const nextMarks = { ...chipMarks };
    const wrong = [];
    for (const w of model.written) {
      if (nextMarks[w.index] === 'good' || nextMarks[w.index] === 'shown') continue;
      const b = model.baskets[nextPlaced[w.index]];
      if (b.key === w.key) nextMarks[w.index] = 'good';
      else {
        wrong.push(sortMistake(terms[w.index], b.key));
        nextMarks[w.index] = 'bad';
        delete nextPlaced[w.index];
      }
    }
    setPlaced(nextPlaced); setChipMarks(nextMarks); setHolding(null);
    const shownMsgs = wrong.slice(0, 2);
    const extra = wrong.length > 1 ? both('cameBack', wrong.length) : null;
    const bad = {
      en: [...shownMsgs.map((m) => m.en), extra?.en].filter(Boolean).join(' '),
      vn: [...shownMsgs.map((m) => m.vn), extra?.vn].filter(Boolean).join(' '),
    };
    judge(wrong.length === 0, bad, revealFind(nextPlaced, nextMarks), both('findRight'));
  };

  /* ---------------------------------------------------------- collect */
  const revealCollect = (fromMarks) => () => {
    const ty = { ...typed };
    const mk = { ...fromMarks };
    model.baskets.forEach((b, bi) => {
      if (mk[`b${bi}`] !== 'good') { ty[`b${bi}`] = basketTotalText(b); mk[`b${bi}`] = 'shown'; }
    });
    setTyped(ty); setMarks(mk);
  };
  const checkCollect = () => {
    if (locked) return;
    const open = model.baskets.map((b, bi) => bi).filter((bi) => marks[`b${bi}`] !== 'good' && marks[`b${bi}`] !== 'shown');
    if (open.some((bi) => !String(typed[`b${bi}`] ?? '').trim())) { setMsg({ info: true, ...both('fillAll') }); return; }
    const verdicts = open.map((bi) => [bi, diagnoseBasket(model, bi, typed[`b${bi}`])]);
    const unreadable = verdicts.find(([, d]) => d.code === 'unreadable');
    if (unreadable) {
      setMarks((m) => ({ ...m, [`b${unreadable[0]}`]: 'bad' }));
      setMsg({ info: true, en: unreadable[1].en, vn: unreadable[1].vn });
      return;
    }
    const next = { ...marks };
    let bad = null;
    for (const [bi, d] of verdicts) {
      next[`b${bi}`] = d.ok ? 'good' : 'bad';
      if (!d.ok && !bad) {
        const name = model.baskets[bi].name;
        bad = { en: `${name.en}: ${d.en}`, vn: `${name.vn}: ${d.vn}` };
      }
    }
    setMarks(next);
    judge(!bad, bad, revealCollect(next), both('collectRight'));
  };

  /* ---------------------------------------------------------- write */
  const checkWrite = () => {
    if (locked) return;
    const raw = String(typed.w ?? '').trim();
    if (!raw) { setMsg({ info: true, ...both('typeFirst') }); return; }
    let d;
    try { d = missingKinds(model, raw) || diagnoseSimplify(item.expr, raw); } catch { d = { ok: false, code: 'unreadable', en: 'That cannot be read as an expression.', vn: 'Không đọc được biểu thức.' }; }
    if (d.code === 'unreadable') { setMarks({ w: 'bad' }); setMsg({ info: true, en: d.en, vn: d.vn }); return; }
    if (d.ok) { setMarks({ w: 'good' }); judge(true, null, null, both('writeRight', model.answerText)); return; }
    if (d.equivalent) { setMarks({ w: 'nudge' }); setMsg({ info: true, en: d.en, vn: d.vn }); return; }
    setMarks({ w: 'bad' });
    judge(false, d, () => { setTyped({ w: model.answerText }); setMarks({ w: 'shown' }); });
  };

  /* ---------------------------------------------------------- decide */
  const pickDecide = (yes) => {
    if (locked) return;
    setPicked(yes);
    setLocked(true);
    if (!yes) setMsg({ ok: true, ...both('decideRight') });
    else { setHelped(true); setSlipped(true); setMsg({ ok: false, ...both('decideWrong') }); }
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = entries.reduce((s, e) => s + (results[e.item.id]?.score || 0), 0);
  const levelName = item.level ? pool?.levels?.[item.level] : null;
  const levelLabel = levelName ? (typeof levelName === 'string' ? levelName : L(levelName.en, levelName.vn)) : null;
  const qLatex = model.questionLatex;
  const regroupLatex = rowLatex(terms, regroupedIndexes(model));
  const showRegroup = model.simplifiable && regroupLatex !== qLatex;
  const context = item.context ? L(item.context, item.contextVn) : null;
  const intro = pos === startPos && pool?.intro ? L(pool.intro, pool.introVn) : null;
  const bookLines = model.simplifiable
    ? [{ tex: qLatex }, ...(showRegroup ? [{ tex: `= ${regroupLatex}` }] : []), { tex: `= ${model.answerLatex}` }]
    : [{ tex: qLatex }, { text: t.noLike }];
  const trayTerms = terms.filter((x) => placed[x.index] == null);

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={quit}
        modeTitle={L(pool?.title, pool?.titleVn) || t.title}
        current={pos + 1}
        total={entries.length}
        lang={lang}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined}
      />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5 lg:items-start">
        {/* left: the question and the working */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <ShoppingBasket className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              <div className="text-[11px] font-black uppercase tracking-widest opacity-90">{t.headline}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared} / {entries.length} {t.solved}</div>
            </div>
            {item.level != null && (
              <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[10px] font-black uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" strokeWidth={3} /> {t.level(item.level)}
                </span>
                {levelLabel && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelLabel}</span>}
              </div>
            )}
            {context && <p className="px-4 pt-3 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-300 leading-snug">{context}</p>}
            <div className="px-2 sm:px-4 py-1 text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
              <SafeBlockMath math={qLatex} />
            </div>
            {intro && <p className="px-4 pb-3 -mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
            {!itemDone && (
              <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                {stages.map((s) => (
                  <Stage key={s} icon={STAGE_ICON[s]} label={t.stages[s]} active={s === st} done={passed(s)} />
                ))}
              </div>
            )}
          </div>

          {passed('find') && showRegroup && !itemDone && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 animate-in fade-in">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.working}</div>
              <div className="text-xl overflow-x-auto py-1"><SafeInlineMath math={`${qLatex} = ${regroupedColourLatex(model, terms)}`} /></div>
            </div>
          )}
        </div>

        {/* right: the stage */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <div key={`${item.id}-${st}`} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5 animate-in fade-in">
              {st === 'find' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.findTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.findSub}</p>

                  {!(locked && trayTerms.length === 0) && <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); unput(droppedChip(e)); }}
                    className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-2.5 mb-3"
                  >
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{t.tray}</div>
                    <div className="flex flex-wrap gap-2 min-h-[52px] items-center">
                      {trayTerms.length === 0 && !locked && <span className="text-xs font-bold text-slate-400">{t.trayDone}</span>}
                      {trayTerms.map((term) => (
                        <Chip
                          key={term.index}
                          term={term}
                          state={chipMarks[term.index]}
                          picked={holding === term.index}
                          movable={!locked}
                          onClick={() => { if (!locked) setHolding((h) => (h === term.index ? null : term.index)); }}
                          onDragStart={(e) => { e.dataTransfer.setData('text/plain', String(term.index)); e.dataTransfer.effectAllowed = 'move'; }}
                        />
                      ))}
                    </div>
                  </div>}

                  <div className="grid gap-2 sm:grid-cols-2">
                    {basketOrder.map((bi) => {
                      const b = model.baskets[bi];
                      const here = terms.filter((x) => placed[x.index] === bi);
                      const target = holding != null && !locked;
                      const colour = locked ? kindColour(model, bi) : null;
                      return (
                        <div
                          key={bi}
                          role="button"
                          tabIndex={0}
                          aria-label={L(b.name.en, b.name.vn)}
                          onClick={() => { if (target) put(holding, bi); }}
                          onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && target) { e.preventDefault(); put(holding, bi); } }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => { e.preventDefault(); put(droppedChip(e), bi); }}
                          className={`rounded-2xl border-2 overflow-hidden bg-white dark:bg-slate-800 transition-all ${target ? 'border-violet-500 ring-4 ring-violet-500/15 cursor-pointer' : 'border-slate-200 dark:border-slate-700'}`}
                          style={colour ? { borderColor: colour } : undefined}
                        >
                          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700 px-3 py-1.5 font-black text-sm text-slate-600 dark:text-slate-300"
                            style={colour ? { color: colour } : undefined}>
                            <ShoppingBasket className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                            {L(b.name.en, b.name.vn)}
                          </div>
                          <div className="p-2 min-h-[60px] flex flex-wrap gap-2 items-center">
                            {here.length === 0 && (
                              <span className={`text-[10px] font-black uppercase tracking-widest ${target ? 'text-violet-500 animate-pulse' : 'text-slate-300 dark:text-slate-600'}`}>{t.dropHere}</span>
                            )}
                            {here.map((term) => (
                              <Chip
                                key={term.index}
                                term={term}
                                state={chipMarks[term.index]}
                                picked={false}
                                movable={!locked && !fixed(term.index)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (holding != null && holding !== term.index) put(holding, bi);
                                  else unput(term.index);
                                }}
                                onDragStart={(e) => { e.dataTransfer.setData('text/plain', String(term.index)); e.dataTransfer.effectAllowed = 'move'; }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealFind(placed, chipMarks))} onCheck={checkFind} onContinue={advance} />
                </>
              )}

              {st === 'collect' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.collectTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.collectSub}</p>
                  <div className="flex flex-col gap-2">
                    {model.baskets.map((b, bi) => {
                      const key = `b${bi}`;
                      const colour = kindColour(model, bi);
                      return (
                        <div key={key} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-100 dark:border-slate-800 border-l-[6px] px-3 py-2" style={{ borderLeftColor: colour }}>
                          <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: colour }}>{L(b.name.en, b.name.vn)}</div>
                          <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                            <span className="overflow-x-auto max-w-full"><SafeInlineMath math={`${rowLatex(terms, b.terms)} =`} /></span>
                            <ExprBox
                              value={typed[key]}
                              state={marks[key]}
                              disabled={locked || marks[key] === 'good'}
                              onEnter={checkCollect}
                              label={L(b.name.en, b.name.vn)}
                              onChange={(v) => { setTyped((x) => ({ ...x, [key]: v })); setMarks((m) => ({ ...m, [key]: undefined })); }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-400">{t.collectHint}</p>
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(revealCollect(marks))} onCheck={checkCollect} onContinue={advance} />
                </>
              )}

              {st === 'write' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.writeTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.writeSub}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.totals}</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {model.baskets.map((b, bi) => (
                      <span key={bi} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 bg-white dark:bg-slate-800 text-lg text-slate-900 dark:text-slate-100" style={{ borderColor: kindColour(model, bi) }}>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: kindColour(model, bi) }}>{L(b.name.en, b.name.vn)}</span>
                        <SafeInlineMath math={b.totalLatex} />
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                    <span className="overflow-x-auto max-w-full"><SafeInlineMath math={`${qLatex} =`} /></span>
                    <ExprBox
                      value={typed.w}
                      state={marks.w}
                      disabled={locked}
                      onEnter={checkWrite}
                      label={t.writeTitle}
                      className="flex-1 min-w-[10rem]"
                      onChange={(v) => { setTyped({ w: v }); setMarks({}); }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-400">{t.writeHint}</p>
                  <Message msg={msg} lang={lang} />
                  <Actions t={t} locked={locked} onShow={() => showMe(() => { setTyped({ w: model.answerText }); setMarks({ w: 'shown' }); })} onCheck={checkWrite} onContinue={advance} />
                </>
              )}

              {st === 'decide' && (
                <>
                  <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.decideTitle}</div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.decideSub}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {model.baskets.map((b, bi) => (
                      <span key={bi} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 bg-white dark:bg-slate-800 text-lg text-slate-900 dark:text-slate-100" style={{ borderColor: kindColour(model, bi) }}>
                        <ShoppingBasket className="w-4 h-4" style={{ color: kindColour(model, bi) }} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: kindColour(model, bi) }}>{L(b.name.en, b.name.vn)}</span>
                        <SafeInlineMath math={rowLatex(terms, b.terms)} />
                      </span>
                    ))}
                  </div>
                  <Choices options={[[true, t.yes], [false, t.no]]} locked={locked} picked={picked} right={false} onPick={pickDecide} />
                  <Message msg={msg} lang={lang} />
                  {locked && <Actions t={t} locked onContinue={advance} />}
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
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}
                </div>
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 text-slate-800 dark:text-slate-100 text-xl overflow-x-auto">
                  {bookLines.map((l, i) => (
                    <div key={i} className="py-0.5 whitespace-nowrap">
                      {l.tex ? <SafeInlineMath math={l.tex} /> : <span className="text-base font-bold text-slate-600 dark:text-slate-300">{l.text}</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto"><SafeInlineMath math={model.answerLatex} /></div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={nextPos === -1 ? finish : goNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {nextPos === -1 ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
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
