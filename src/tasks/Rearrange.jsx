import { useState, useMemo } from 'react';
import {
  Variable, RotateCcw, Undo2, Lightbulb, ArrowRight, Construction, PartyPopper, Pencil, Check,
  Ruler, Calculator, Target, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { parseInlineText } from '../components/notes/layouts/helpers.jsx';
import {
  workItem, applyMove, suggestMove, isIsolated, chipsOf, termLatex, sideLatex, moveLatex,
  reasonFor, symbolLatex, fmtNumber, fmtPlain, parseNumber, closeTo, conversionRule,
} from '../utils/formula';

/* ------------------------------------------------------------------ *
 * Isolate It — change the subject of a physics formula, then use it.
 *
 * An Acellus physics item is always the same shape: four quantities, one of
 * them unknown, and a formula that links them. What the answer box hides is
 * the WORKING — that the formula must be rearranged for the unknown BEFORE
 * any number goes in, that every number must be in SI units, and that the
 * result carries a unit of its own. So one item here is three stages:
 *
 *   1. ISOLATE    make the target the subject, one both-sides move at a time
 *                 (× ÷ + − square √). The working builds up as a notebook
 *                 page, each line with the move written under both sides and
 *                 the REASON beside it. No scale graphic: a formula is a
 *                 dozen quantities, not one unknown and some numbers, and
 *                 what has to be seen is the algebra itself.
 *   2. UNITS      lay out the pieces. Anything quoted in km or hours has to
 *                 be converted into SI by the student before it is used.
 *   3. CALCULATE  the rearranged formula with the numbers in it, then the
 *                 answer — and, when the question asks for km or hours, the
 *                 conversion back.
 *
 * Everything is derived from the authored formula by src/utils/formula.js:
 * the chips, the hint, the target step count, the substituted line, the
 * answer, and the wrong numbers a common slip produces (so a wrong answer is
 * named — "you used 6.78 km/s as if it were m/s" — rather than marked red).
 *
 * SCORING. Each item is worth two marks: one for isolating the target without
 * Show me, one for the numbers (every box right within two tries, nothing
 * revealed). XP = the share of marks, out of 10 (nativeMax).
 * ------------------------------------------------------------------ */

const ACCENT = '#4f46e5';

const OPS = [
  { kind: 'mul', sym: '×', en: 'Multiply by', vn: 'Nhân với' },
  { kind: 'div', sym: '÷', en: 'Divide by', vn: 'Chia cho' },
  { kind: 'add', sym: '+', en: 'Add', vn: 'Cộng' },
  { kind: 'sub', sym: '−', en: 'Subtract', vn: 'Trừ' },
  { kind: 'square', sym: '( )²', en: 'Square', vn: 'Bình phương' },
  { kind: 'sqrt', sym: '√', en: 'Square root', vn: 'Căn bậc hai' },
];

const EN = {
  title: 'Isolate It',
  stage1: 'Step 1 · Isolate',
  stage2: 'Step 2 · Units',
  stage3: 'Step 3 · Calculate',
  target: 'Make this the subject',
  pick: 'Pick a move, then what to do it with',
  doBoth: 'Do it to both sides',
  undo: 'Undo',
  reset: 'Reset',
  hint: 'Show me',
  hintUsed: 'Hint used',
  isolated: 'Isolated!',
  moves: 'moves',
  par: 'target',
  copyTitle: 'Copy this into your notebook',
  copyBody: 'Write out ALL of the working — every line, the move under both sides, and the reason. This is the part the answer box never shows you.',
  toUnits: 'I have written it down',
  alreadySubject: 'is already the subject. Nothing to move — go straight to the numbers.',
  piecesTitle: 'The pieces',
  piecesBody: 'A formula only works in SI units. Anything quoted in km, hours or km/s has to be converted BEFORE it goes in.',
  constant: 'constant',
  convert: 'Convert to',
  inSI: 'SI',
  checkUnits: 'Check',
  allSI: 'Every piece is in SI units',
  toCalc: 'Substitute the numbers',
  substituted: 'With the numbers in',
  answerIs: 'Answer',
  answerSI: 'Answer in SI',
  answerAsked: 'The question wants',
  check: 'Check',
  next: 'Next problem',
  finish: 'Finish',
  right: 'That is it!',
  notYet: 'Not quite',
  needNumber: 'Type a number. For big numbers write 6.24e18 or 6.24×10^18.',
  rawUnit: (v, u, si) => `You used ${v} ${u} as if it were ${si}. Convert it to ${si} first.`,
  noRoot: 'You forgot the square root at the end.',
  noSquare: 'Something that should be squared was not squared. Look for the little 2.',
  unconverted: (si, u) => `That is the answer in ${si}. The question wants ${u} — convert it.`,
  generic: 'Substitute each number carefully, then work through the powers and the brackets.',
  convWrong: 'Not the SI value.',
  showMe: 'Show me',
  revealed: 'Revealed',
  tries: 'tries left',
  cannot: 'That move does not work here — divide out the number first, or choose another move.',
  sqrtNeg: 'You cannot take the square root of a negative quantity.',
  lang: 'VN',
};

const VN = {
  title: 'Cô Lập Biến',
  stage1: 'Bước 1 · Cô lập',
  stage2: 'Bước 2 · Đơn vị',
  stage3: 'Bước 3 · Tính toán',
  target: 'Đưa đại lượng này về một vế',
  pick: 'Chọn phép biến đổi, rồi chọn thứ để áp dụng',
  doBoth: 'Làm với cả hai vế',
  undo: 'Hoàn tác',
  reset: 'Làm lại',
  hint: 'Cho tôi xem',
  hintUsed: 'Đã dùng gợi ý',
  isolated: 'Đã cô lập!',
  moves: 'bước',
  par: 'mục tiêu',
  copyTitle: 'Chép vào vở',
  copyBody: 'Chép lại TOÀN BỘ bài giải — từng dòng, phép biến đổi dưới hai vế, và lý do. Đây là phần mà ô đáp án không bao giờ cho em thấy.',
  toUnits: 'Em đã chép xong',
  alreadySubject: 'đã là chủ thể của công thức. Không cần biến đổi — chuyển thẳng sang các con số.',
  piecesTitle: 'Các đại lượng',
  piecesBody: 'Công thức chỉ đúng với đơn vị SI. Bất kỳ số nào tính bằng km, giờ hay km/s đều phải đổi TRƯỚC KHI thay vào.',
  constant: 'hằng số',
  convert: 'Đổi sang',
  inSI: 'SI',
  checkUnits: 'Kiểm tra',
  allSI: 'Mọi đại lượng đều ở đơn vị SI',
  toCalc: 'Thay số vào',
  substituted: 'Sau khi thay số',
  answerIs: 'Đáp án',
  answerSI: 'Đáp án theo SI',
  answerAsked: 'Đề bài yêu cầu',
  check: 'Kiểm tra',
  next: 'Bài tiếp theo',
  finish: 'Hoàn thành',
  right: 'Chính xác!',
  notYet: 'Chưa đúng',
  needNumber: 'Hãy gõ một con số. Với số lớn, viết 6.24e18 hoặc 6.24×10^18.',
  rawUnit: (v, u, si) => `Em đã dùng ${v} ${u} như thể nó là ${si}. Hãy đổi sang ${si} trước.`,
  noRoot: 'Em quên lấy căn bậc hai ở bước cuối.',
  noSquare: 'Có một đại lượng cần bình phương mà chưa được bình phương. Hãy tìm số 2 nhỏ.',
  unconverted: (si, u) => `Đó là đáp án theo ${si}. Đề bài yêu cầu ${u} — hãy đổi đơn vị.`,
  generic: 'Thay từng số thật cẩn thận, rồi tính lũy thừa và ngoặc.',
  convWrong: 'Chưa phải giá trị SI.',
  showMe: 'Cho tôi xem',
  revealed: 'Đã hiện đáp án',
  tries: 'lần thử còn lại',
  cannot: 'Phép biến đổi này không dùng được ở đây — hãy chia số ra trước, hoặc chọn phép khác.',
  sqrtNeg: 'Không thể lấy căn bậc hai của một đại lượng âm.',
  lang: 'EN',
};

const MAX_TRIES = 2;

/** A KaTeX chip button. */
function Chip({ latex, active, onClick, tone = 'factor' }) {
  const on = tone === 'term'
    ? 'bg-[#f59e0b] border-[#b45309] text-white'
    : tone === 'number' ? 'bg-[#0ea5e9] border-[#0369a1] text-white' : 'bg-[#4f46e5] border-[#3730a3] text-white';
  const off = tone === 'term'
    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#f59e0b]'
    : tone === 'number' ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0ea5e9]'
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#4f46e5]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px] ${active ? on : off}`}
    >
      <SafeInlineMath math={latex} />
    </button>
  );
}

/** The three stages as a rail, the live one lit. */
function StageRail({ stage, t }) {
  const stages = [['isolate', t.stage1, Variable], ['units', t.stage2, Ruler], ['calc', t.stage3, Calculator]];
  const order = ['isolate', 'units', 'calc', 'done'];
  const at = order.indexOf(stage);
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map(([id, label, Icon], i) => {
        const done = i < at;
        const live = i === at;
        return (
          <span key={id} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border-2
            ${live ? 'bg-[#4f46e5] border-[#3730a3] text-white' : done ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
            {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
            {label}
          </span>
        );
      })}
    </div>
  );
}

/** The accumulating written working: every line, the move under both sides, the reason. */
function Working({ history, lang, t }) {
  return (
    <div>
      {history.map((row, i) => {
        const last = i === history.length - 1;
        return (
          <div key={i} className="animate-in fade-in slide-in-from-top-1 duration-300">
            <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 ${last ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-200'}`}>
              <div className={`flex justify-end ${last ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}><SafeInlineMath math={sideLatex(row.eq.left)} /></div>
              <div className={`font-black text-slate-400 ${last ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>=</div>
              <div className={`flex justify-start ${last ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}><SafeInlineMath math={sideLatex(row.eq.right)} /></div>
            </div>
            {row.move && (
              <>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 mt-1.5 text-lg sm:text-xl text-[#4f46e5] dark:text-indigo-300">
                  <div className="flex justify-end"><SafeInlineMath math={moveLatex(row.move)} /></div>
                  <div className="w-3" />
                  <div className="flex justify-start"><SafeInlineMath math={moveLatex(row.move)} /></div>
                </div>
                {row.reason && (
                  <p className="text-center text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 px-2">
                    {parseInlineText(lang === 'vn' ? row.reason.vn : row.reason.en)}
                  </p>
                )}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-5 my-2.5">
                  <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="w-3" />
                  <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </>
            )}
          </div>
        );
      })}
      {history.length === 1 && (
        <p className="text-center text-[11px] font-bold text-slate-300 dark:text-slate-600 mt-2">{t.pick}</p>
      )}
    </div>
  );
}

/** One right-or-wrong feedback line. */
function Feedback({ msg }) {
  if (!msg) return null;
  return (
    <div className={`mt-3 rounded-xl border-2 p-3 text-sm font-bold animate-in fade-in ${msg.ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]'}`}>
      <span className="inline-flex items-start gap-2">
        {msg.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} />}
        <span>{msg.text}</span>
      </span>
    </div>
  );
}

/** A typed-number box with its own Check, tries and Show me. */
function NumberBox({ label, unit, want, tol = 0.015, t, onResult, diagnose, locked: lockedOutside = false, autoFocus = false }) {
  const [value, setValue] = useState('');
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState(null);
  const [state, setState] = useState('open'); // open | right | revealed
  const locked = state !== 'open' || lockedOutside;

  const check = () => {
    if (locked) return;
    const n = parseNumber(value);
    if (n === null) { setMsg({ ok: false, text: t.needNumber }); return; }
    if (closeTo(n, want, tol)) {
      setState('right');
      setMsg({ ok: true, text: t.right });
      onResult(true);
      return;
    }
    const next = tries + 1;
    setTries(next);
    const why = diagnose?.(n) || t.generic;
    setMsg({ ok: false, text: `${t.notYet}. ${why}` });
    if (next >= MAX_TRIES) reveal(false);
  };

  const reveal = (byButton = true) => {
    if (state !== 'open') return;
    setState('revealed');
    setValue(fmtPlain(want));
    setMsg({ ok: false, text: `${t.answerIs}: ${fmtPlain(want)} ${unit}` });
    onResult(false, byButton);
  };

  return (
    <div className={`rounded-2xl border-2 p-3 sm:p-4 ${state === 'right' ? 'border-[#58a700] bg-[#f4ffe9] dark:bg-green-950/20' : state === 'revealed' ? 'border-amber-300 bg-amber-50/60 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
      {label && <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</div>}
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); setMsg(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } }}
          disabled={locked}
          autoFocus={autoFocus}
          inputMode="decimal"
          placeholder="?"
          className={`flex-1 min-w-[9rem] h-12 px-3 rounded-xl border-2 border-b-[4px] bg-white dark:bg-slate-950 font-black text-lg focus:outline-none disabled:opacity-70
            ${state === 'right' ? 'border-[#58a700] text-[#3e7500]' : state === 'revealed' ? 'border-amber-400 text-amber-700 dark:text-amber-300' : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:border-[#4f46e5]'}`}
        />
        <span className="font-black text-lg text-slate-600 dark:text-slate-300 whitespace-nowrap">{unit}</span>
        {!locked && (
          <>
            <button onClick={check} type="button"
              className="px-4 h-12 rounded-xl font-black text-xs uppercase tracking-widest bg-[#58cc02] border-b-[4px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[4px] transition-all">
              {t.check}
            </button>
            <button onClick={() => reveal(true)} type="button" title={t.showMe}
              className="px-3 h-12 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </>
        )}
        {state === 'right' && <Check className="w-6 h-6 text-[#58a700]" strokeWidth={3} />}
      </div>
      {!locked && tries > 0 && <div className="mt-1.5 text-[10px] font-bold text-slate-400">{MAX_TRIES - tries} {t.tries}</div>}
      <Feedback msg={msg} />
    </div>
  );
}

/* ------------------------------------------------------------------ the item */

/**
 * One problem. Mounted with `key={item.id}` so moving on resets the working,
 * the chosen move and every typed box by construction.
 */
function Item({ item, config, lang, t, onMarks, onDone }) {
  const w = useMemo(() => workItem(item, config), [item, config]);
  const target = item.target;
  const tLatex = symbolLatex(target);

  const [history, setHistory] = useState(() => [{ eq: w.start, move: null, reason: null }]);
  const [opKind, setOpKind] = useState('mul');
  const [chip, setChip] = useState(null);       // a term, or null
  const [error, setError] = useState('');
  const [hinted, setHinted] = useState(false);
  const [stage, setStage] = useState('isolate');
  // Numeric stage bookkeeping: boxKey -> { ok, clean }
  const [boxes, setBoxes] = useState({});

  const current = history[history.length - 1].eq;
  const done = isIsolated(current, target);
  const moves = history.length - 1;
  const chips = useMemo(() => chipsOf(current), [current]);
  const needsChip = opKind === 'mul' || opKind === 'div' || opKind === 'add' || opKind === 'sub';
  const chipRow = opKind === 'add' || opKind === 'sub' ? chips.terms : [...chips.factors, ...chips.numbers];
  const showAddSub = chips.terms.length > 0;

  const apply = () => {
    if (done) return;
    if (needsChip && !chip) { setError(t.pick); return; }
    const move = needsChip ? { kind: opKind, term: chip } : { kind: opKind };
    let next;
    try { next = applyMove(current, move); }
    catch (e) {
      setError(/negative/.test(e.message) ? t.sqrtNeg : t.cannot);
      return;
    }
    setError('');
    setChip(null);
    const reason = reasonFor(move, current, target);
    setHistory((h) => [...h.slice(0, -1), { ...h[h.length - 1], move, reason }, { eq: next, move: null, reason: null }]);
  };

  const undo = () => {
    if (history.length < 2) return;
    setHistory((h) => [...h.slice(0, -2), { ...h[h.length - 2], move: null, reason: null }]);
    setError('');
  };
  const reset = () => { setHistory([{ eq: w.start, move: null, reason: null }]); setError(''); setChip(null); };

  const showHint = () => {
    if (done) return;
    const m = suggestMove(current, target);
    if (!m) return;
    setHinted(true);
    setOpKind(m.kind);
    setChip(m.term || null);
    setError('');
  };

  const chipKey = (c) => termLatex(c);
  const isPicked = (c) => chip && chipKey(chip) === chipKey(c);

  // ---- numeric stages
  const conversions = w.pieces.filter((p) => p.needsConversion);
  const askDiffers = w.askUnit !== w.siUnit;
  const boxResult = (key) => (ok, byButton) =>
    setBoxes((b) => (b[key] ? b : { ...b, [key]: { ok, clean: ok && !byButton } }));
  const unitsDone = conversions.every((p) => boxes[`conv:${p.sym}`]);
  const siDone = !!boxes['answer:si'];
  const askedDone = !askDiffers || !!boxes['answer:asked'];

  // The wrong numbers a slip produces, named.
  const diagnoseSI = (n) => {
    for (const tr of w.traps) {
      if (!closeTo(n, tr.value, 0.02)) continue;
      if (tr.key.startsWith('raw:')) return t.rawUnit(fmtPlain(w.pieces.find((p) => p.sym === tr.sym)?.value), tr.unit, tr.si);
      if (tr.key === 'noroot') return t.noRoot;
      if (tr.key === 'nosquare') return t.noSquare;
    }
    return null;
  };
  const diagnoseAsked = (n) => (closeTo(n, w.answer, 0.02) ? t.unconverted(w.siUnit, w.askUnit) : null);

  const finishIsolate = () => {
    onMarks({ isolate: !hinted });
    setStage(conversions.length ? 'units' : 'calc');
  };
  const finishUnits = () => setStage('calc');
  const finishCalc = () => {
    const clean = Object.values(boxes).every((b) => b.clean);
    onMarks({ calc: clean });
    setStage('done');
  };

  const subLatex = useMemo(() => {
    if (!w.expr) return '';
    const sub = Object.fromEntries(w.pieces.map((p) => [p.sym, p.show && !p.needsConversion ? p.show : fmtNumber(p.siValue)]));
    return `${tLatex} = ${sideLatex(w.expr, { sub })}`;
  }, [w, tLatex]);

  const promptText = lang === 'vn' ? (item.promptVn || item.prompt) : item.prompt;
  const hintText = lang === 'vn' ? (item.hintVn || item.hint) : item.hint;

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-5">
      {/* ---- left: the question and the working ---- */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: ACCENT }}>
            <Target className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{t.target}</div>
              <div className="text-2xl font-black"><SafeInlineMath math={tLatex} /></div>
            </div>
            <div className="text-2xl sm:text-3xl text-white/95 shrink-0 max-w-[55%] overflow-x-auto overflow-y-hidden pb-2 [&_.katex]:inline-block [&_.katex]:align-middle"><SafeInlineMath math={sideLatex(w.start.left) + ' = ' + sideLatex(w.start.right)} /></div>
          </div>
          <div className="p-4 sm:p-5">
            <p className="font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{parseInlineText(promptText)}</p>
            {hintText && <p className="mt-2 text-sm font-bold text-slate-400 dark:text-slate-500">{parseInlineText(hintText)}</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-7">
          <Working history={history} lang={lang} t={t} />

          {done && stage === 'isolate' && (
            <div className="mt-5 pt-5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-300">
              {moves === 0 ? (
                <p className="font-bold text-slate-600 dark:text-slate-300 mb-4"><SafeInlineMath math={tLatex} /> {t.alreadySubject}</p>
              ) : (
                <div className="bg-[#ffc800]/10 dark:bg-amber-900/15 border-l-[6px] border-[#ffc800] rounded-r-2xl p-4 sm:p-5 mb-5">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black uppercase tracking-widest text-[11px] sm:text-xs mb-1.5">
                    <Pencil className="w-4 h-4 shrink-0" strokeWidth={3} />
                    {t.copyTitle}
                  </div>
                  <p className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200 leading-relaxed">{t.copyBody}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#58cc02] flex items-center justify-center shadow-sm shrink-0">
                    <PartyPopper className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-black text-lg text-[#3e7500] dark:text-[#7bd42f]">{t.isolated}</div>
                    <div className="text-xs font-bold text-slate-400">
                      {moves} {t.moves} · {t.par} {w.par ?? '?'}{hinted ? ` · ${t.hintUsed}` : ''}
                    </div>
                  </div>
                </div>
                <button onClick={finishIsolate}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all">
                  <Check className="w-5 h-5 mr-2 shrink-0" strokeWidth={3} />
                  {moves === 0 ? t.toCalc : t.toUnits}
                  <ArrowRight className="w-5 h-5 ml-2 shrink-0" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- right: the stage panel ---- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
        <div className="mb-4"><StageRail stage={stage} t={t} /></div>

        {stage === 'isolate' && !done && (
          <>
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{t.pick}</div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {OPS.filter((o) => showAddSub || (o.kind !== 'add' && o.kind !== 'sub')).map((o) => (
                <button
                  key={o.kind}
                  type="button"
                  title={lang === 'vn' ? o.vn : o.en}
                  onClick={() => { setOpKind(o.kind); setChip(null); setError(''); }}
                  className={`py-3 rounded-2xl font-black text-xl border-2 border-b-[5px] transition-all active:border-b-2 active:translate-y-[3px]
                    ${opKind === o.kind
                      ? 'bg-[#4f46e5] border-[#3730a3] text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#4f46e5]'}`}
                >
                  {o.sym}
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{lang === 'vn' ? OPS.find((o) => o.kind === opKind)?.vn : OPS.find((o) => o.kind === opKind)?.en}{needsChip ? '…' : ''}</div>

            {needsChip && (
              <div className="flex flex-wrap items-center gap-2 mb-3 min-h-12">
                {chipRow.map((c, i) => (
                  <Chip
                    key={`${chipKey(c)}-${i}`}
                    latex={termLatex(c)}
                    active={isPicked(c)}
                    tone={opKind === 'add' || opKind === 'sub' ? 'term' : (c.factors.length ? 'factor' : 'number')}
                    onClick={() => { setChip(c); setError(''); }}
                  />
                ))}
              </div>
            )}

            {/* The preview says out loud what is about to happen to BOTH sides. */}
            <div className="min-h-9 flex items-center justify-center text-center text-slate-400 dark:text-slate-500 text-base mb-2 overflow-x-auto overflow-y-hidden pb-2 [&_.katex]:inline-block [&_.katex]:align-middle">
              {(!needsChip || chip) && (
                <SafeInlineMath math={`${sideLatex(current.left)}\\; ${moveLatex(needsChip ? { kind: opKind, term: chip } : { kind: opKind })} \\;=\\; ${sideLatex(current.right)}\\; ${moveLatex(needsChip ? { kind: opKind, term: chip } : { kind: opKind })}`} />
              )}
            </div>

            {error && <div className="text-center text-sm font-bold text-rose-500 mb-3">{error}</div>}

            <button
              type="button"
              onClick={apply}
              disabled={needsChip && !chip}
              className="w-full py-4 rounded-2xl font-black text-base sm:text-lg uppercase tracking-widest bg-[#58cc02] border-b-[6px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              {t.doBoth}
            </button>

            <div className="flex items-center justify-center gap-2 mt-3">
              <button type="button" onClick={undo} disabled={history.length < 2}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
                <Undo2 className="w-4 h-4" strokeWidth={2.5} /> {t.undo}
              </button>
              <button type="button" onClick={reset} disabled={history.length < 2}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} /> {t.reset}
              </button>
              <button type="button" onClick={showHint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.hint}
              </button>
            </div>
          </>
        )}

        {stage === 'isolate' && done && (
          <p className="text-sm font-bold text-slate-400 dark:text-slate-500 text-center py-6">
            <SafeInlineMath math={`${tLatex} = ${sideLatex(w.expr)}`} />
          </p>
        )}

        {(stage === 'units' || stage === 'calc' || stage === 'done') && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              <Ruler className="w-4 h-4" strokeWidth={3} /> {t.piecesTitle}
            </div>
            {stage === 'units' && <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">{t.piecesBody}</p>}
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
              {w.pieces.map((p) => {
                const key = `conv:${p.sym}`;
                const b = boxes[key];
                const shown = p.show || fmtNumber(p.value);
                return (
                  <div key={p.sym} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2.5 border-b-2 last:border-b-0 border-slate-100 dark:border-slate-800">
                    <span className="w-9 text-xl font-black text-slate-800 dark:text-slate-100"><SafeInlineMath math={symbolLatex(p.sym)} /></span>
                    <span className="flex-1 min-w-[5rem] text-xs font-bold text-slate-500 dark:text-slate-400">
                      {lang === 'vn' ? p.nameVn : p.name}
                      {p.constant && <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[9px] uppercase tracking-widest">{t.constant}</span>}
                    </span>
                    <span className="font-black text-slate-800 dark:text-slate-100"><SafeInlineMath math={`${shown}\\ \\text{${p.unit}}`} /></span>
                    {p.needsConversion ? (
                      b || stage !== 'units' ? (
                        <span className={`text-sm font-black ${b?.ok ? 'text-[#3e7500] dark:text-[#7bd42f]' : 'text-amber-600'}`}>→ {fmtPlain(p.siValue)} {p.si}</span>
                      ) : (
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">{t.convert} {p.si}</span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-black uppercase tracking-widest text-[#58a700]"><Check className="w-3.5 h-3.5" strokeWidth={3} /> {t.inSI}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stage === 'units' && (
          <div className="flex flex-col gap-3">
            {conversions.map((p, i) => (
              <NumberBox
                key={p.sym}
                autoFocus={i === 0}
                label={`${p.sym} · ${fmtPlain(p.value)} ${p.unit} → ${p.si}`}
                unit={p.si}
                want={p.siValue}
                tol={0.005}
                t={t}
                onResult={boxResult(`conv:${p.sym}`)}
                diagnose={() => { const r = conversionRule(p.unit); return r ? (lang === 'vn' ? r.vn : r.en) : t.convWrong; }}
              />
            ))}
            {unitsDone && (
              <button type="button" onClick={finishUnits}
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all animate-in fade-in">
                {t.toCalc} <ArrowRight className="inline w-5 h-5 ml-1" strokeWidth={3} />
              </button>
            )}
          </div>
        )}

        {(stage === 'calc' || stage === 'done') && (
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 p-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.substituted}</div>
              <div className="text-lg sm:text-xl text-slate-800 dark:text-slate-100 overflow-x-auto"><SafeBlockMath math={subLatex} /></div>
            </div>
            <NumberBox
              autoFocus
              label={askDiffers ? `${t.answerSI} (${w.siUnit})` : t.answerIs}
              unit={w.siUnit}
              want={w.answer}
              t={t}
              onResult={boxResult('answer:si')}
              diagnose={diagnoseSI}
            />
            {askDiffers && siDone && (
              <NumberBox
                autoFocus
                label={`${t.answerAsked} ${w.askUnit}`}
                unit={w.askUnit}
                want={w.answerAsked}
                t={t}
                onResult={boxResult('answer:asked')}
                diagnose={diagnoseAsked}
              />
            )}
            {siDone && askedDone && stage === 'calc' && (
              <button type="button" onClick={finishCalc}
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all animate-in fade-in">
                <Check className="inline w-5 h-5 mr-1" strokeWidth={3} /> {t.next}
              </button>
            )}
            {stage === 'done' && (
              <button type="button" onClick={onDone}
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all animate-in fade-in">
                {t.next} <ArrowRight className="inline w-5 h-5 ml-1" strokeWidth={3} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the task */

const EMPTY = {};

export default function Rearrange({ pool, savedData, onComplete, onProgress, onQuit, bilingual = true }) {
  const config = pool || EMPTY;
  // An item that will not parse is dropped here rather than crashing the
  // screen; the validator has already refused it at build time.
  const items = useMemo(() => (config.items || []).filter((it) => {
    try { workItem(it, config); return true; } catch { return false; }
  }), [config]);

  // Resume: items already finished stay finished, and the deck opens on the
  // first one still to do. An item can be re-done — the best marks are kept.
  const restored = savedData?.done && typeof savedData.done === 'object' ? savedData.done : {};
  const firstOpen = Math.max(0, items.findIndex((it) => !restored[it.id]));
  const [idx, setIdx] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [lang, setLang] = useState('en');
  const [results, setResults] = useState(restored);   // id -> { isolate, calc }

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];

  const scoreOf = (r) => {
    if (!items.length) return 0;
    const marks = items.reduce((s, it) => s + (r[it.id]?.isolate ? 1 : 0) + (r[it.id]?.calc ? 1 : 0), 0);
    return Math.round((marks / (items.length * 2)) * 10);
  };
  const itemsOf = (r) => items.map((it) => ({ itemId: it.id, correct: !!(r[it.id]?.isolate && r[it.id]?.calc) }));
  const blobOf = (r) => ({ done: Object.fromEntries(Object.entries(r).filter(([, v]) => v.isolate !== undefined && v.calc !== undefined)) });

  const record = (id, patch) => {
    setResults((r) => {
      const prev = r[id] || {};
      const next = { ...r, [id]: { ...prev, ...Object.fromEntries(Object.entries(patch).map(([k, v]) => [k, v || !!prev[k]])) } };
      return next;
    });
  };

  const finish = () => {
    onComplete?.(scoreOf(results), blobOf(results), { items: itemsOf(results) });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const nextItem = () => {
    // The item just finished has both marks now; checkpoint it.
    onProgress?.(scoreOf(results), blobOf(results));
    if (idx < items.length - 1) setIdx((i) => i + 1);
    else finish();
  };

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-indigo-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No formulas yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#4f46e5] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#3730a3] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const intro = lang === 'vn' ? (config.introVn || config.intro) : config.intro;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={quit}
        modeTitle={lang === 'vn' ? (config.titleVn || config.title || VN.title) : (config.title || EN.title)}
        current={idx + 1}
        total={items.length}
        lang={bilingual ? lang : undefined}
        onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined}
      />
      <div className="flex-1 w-full max-w-3xl lg:max-w-6xl mx-auto p-4 sm:p-5 pb-10">
        {idx === 0 && intro && (
          <p className="text-center text-slate-500 dark:text-slate-400 font-bold mb-4">{parseInlineText(intro)}</p>
        )}
        <Item
          key={item.id}
          item={item}
          config={config}
          lang={lang}
          t={t}
          onMarks={(patch) => record(item.id, patch)}
          onDone={nextItem}
        />
      </div>
    </div>
  );
}
