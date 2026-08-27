import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Construction, CheckCircle2, XCircle, ArrowRight, Grid3x3,
  Lightbulb, RotateCcw, Lock, Trophy, Sparkles,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { digitAt, modelOf } from '../utils/columnArithmetic';

/* ------------------------------------------------------------------ *
 * NUMBER GYM — column arithmetic, one digit at a time.
 *
 * The student is given OPERANDS ONLY (`[a, b]` pairs) and the component
 * derives every intermediate cell — each partial product, every carry, and
 * the final column sum. Nothing in the answer key is authored, so an author
 * cannot get it wrong and editing a pair cannot leave a stale answer behind.
 * It is the same rule Graph It and Vectors follow.
 *
 * Reads a unit's `drill`:
 *   {
 *     mode: 'long-mult',
 *     title, titleVn, intro, introVn,
 *     ladder: [
 *       { level: 'Warm-up', levelVn: '…', items: [[23, 12], [31, 21]] },
 *       { level: 'Carries', levelVn: '…', items: [[47, 26], [68, 34]] },
 *     ],
 *   }
 *
 * WHY IT LOOKS LIKE THIS. A Workbook can only tell a student that 47 × 26 is
 * wrong; it cannot say the carry from 7 × 6 never got added. So the grid is the
 * written algorithm itself: the multiplicand and multiplier on top, a row per
 * partial product, then the sum — every column a box, every carry a smaller box
 * above the column it lands in. A wrong box turns red where the mistake is, and
 * the feedback names the step (a times-table slip, a dropped carry, a bad
 * column add), not just "wrong". A cell wrong twice is revealed and the item
 * pays half, so a stuck student is never truly stuck.
 *
 * THE LADDER. Levels unlock in order: you clear Warm-up before Carries opens.
 * A Year 7 student clears Warm-up in ninety seconds; one who cannot is held
 * there rather than drowning in Stretch, and still banks real XP for the share
 * of the ladder they did clear — XP is (items cleared / items in the ladder),
 * scaled from nativeMax 10 to the unit's 20. Wrong cells are logged per
 * position (`carry`, `partial-<n>`, `sum`) so the error log can eventually say
 * which step of the algorithm fails.
 * ------------------------------------------------------------------ */

const ORANGE = '#f97316';     // the task colour
const GREEN = '#58cc02';      // an accepted / correct cell
const RED = '#ff4b4b';        // a wrong cell
const AMBER = '#f59e0b';      // a revealed cell, and the carry accent

const EN = {
  title: 'Number Gym',
  level: 'Level',
  check: 'Check',
  next: 'Next',
  finish: 'Finish',
  continue: 'Continue to',
  bankHere: 'Finish & bank XP',
  levelClear: 'clear!',
  unlocked: 'unlocked',
  clean: 'Every box right first time. Full marks for this one.',
  helped: 'Solved — but a box or two had to be shown.',
  empty: 'Type a digit in every blue box first.',
  carryNote: 'The small box is the carry into that column.',
  borrowNote: 'The small box is the borrow: 1 when this column took ten from its left.',
  scoreLine: 'items cleared',
  heldNote: 'Clear this level to open the next.',
  reasons: {
    times: 'Check the times-table fact for this column.',
    forgotcarry: 'Right multiplication — but you forgot to add the carry from the column on its right.',
    addwrong: 'Add this column again, and include the little carried digit above it.',
    carrywrong: 'The carry is the tens digit you take to the next column on the left.',
    subwrong: 'Subtract this column again — and if you borrowed, take one off the top digit first.',
    borrowwrong: 'The borrow is 1 when the top digit was too small and had to take ten from its left.',
  },
};

const VN = {
  title: 'Phòng Gym Số học',
  level: 'Cấp',
  check: 'Kiểm tra',
  next: 'Tiếp',
  finish: 'Kết thúc',
  continue: 'Tiếp tục lên',
  bankHere: 'Kết thúc & nhận XP',
  levelClear: 'hoàn thành!',
  unlocked: 'đã mở',
  clean: 'Mọi ô đúng ngay lần đầu. Trọn điểm cho bài này.',
  helped: 'Đã giải xong — nhưng có một hai ô phải hiện đáp án.',
  empty: 'Hãy điền một chữ số vào mỗi ô xanh trước.',
  carryNote: 'Ô nhỏ là số nhớ mang vào cột đó.',
  borrowNote: 'Ô nhỏ là số mượn: bằng 1 khi cột này phải mượn mười từ cột bên trái.',
  scoreLine: 'bài đã hoàn thành',
  heldNote: 'Hoàn thành cấp này để mở cấp tiếp theo.',
  reasons: {
    times: 'Kiểm tra lại phép nhân trong cột này.',
    forgotcarry: 'Nhân đúng rồi — nhưng em quên cộng số nhớ từ cột bên phải.',
    addwrong: 'Cộng lại cột này, và nhớ cộng cả số nhớ nhỏ ở phía trên.',
    carrywrong: 'Số nhớ là chữ số hàng chục em mang sang cột bên trái.',
    subwrong: 'Trừ lại cột này — nếu đã mượn, hãy bớt một ở chữ số trên trước.',
    borrowwrong: 'Số mượn bằng 1 khi chữ số trên quá nhỏ và phải mượn mười từ cột bên trái.',
  },
};

/* ------------------------------------------------------------- small utils */

const cid = (rowKey, col, which) => `${rowKey}:${col}:${which}`;
/** Parse a single typed digit. Blank is allowed only for a carry (means 0). */
const parseDigit = (text, allowBlank) => {
  const t = String(text ?? '').replace(/[^0-9]/g, '');
  if (t === '') return allowBlank ? 0 : NaN;
  return Number(t[t.length - 1]); // last digit typed, so overtyping just replaces
};

/** The live cells of a stage, right (units) to left: each digit box, and each
 *  carry box that column owns. Order puts the units column first. */
function cellsOf(stage) {
  const out = [];
  for (const col of stage.cols) {
    out.push({ id: cid(stage.rowKey, col.col, 'd'), kind: 'digit', value: col.digit, col });
    if (col.carryBox) out.push({ id: cid(stage.rowKey, col.col, 'c'), kind: 'carry', value: col.carryIn, col });
  }
  return out;
}

/** The mistake behind a wrong DIGIT box, most specific first. */
function diagnoseDigit(stage, col, typed) {
  if (stage.op === '-') return 'subwrong';
  const noCarry = (((col.digit - col.carryIn) % 10) + 10) % 10; // the digit if the carry were dropped
  if (col.carryIn > 0 && typed === noCarry) return 'forgotcarry';
  return stage.kind === 'sum' ? 'addwrong' : 'times';
}
/** The reason for a wrong small (carry/borrow) box, by operation. */
const carryReason = (stage) => (stage.op === '-' ? 'borrowwrong' : 'carrywrong');

/* ------------------------------------------------------------- component */

export default function NumberDrill({ pool, onComplete, onQuit }) {
  // Flatten the ladder into an ordered list, remembering each item's rung so we
  // can gate progression and show a banner when a new level opens.
  const mode = pool?.mode || 'long-mult';
  const flat = useMemo(() => {
    const ladder = pool?.ladder || [];
    const items = [];
    ladder.forEach((rung, ri) => {
      // A long-mult item is [a, b]; a column-add-sub item is [a, b, op].
      (rung.items || []).forEach(([a, b, op = '+'], ii) => {
        items.push({
          id: `L${ri}-${a}${op}${b}-${ii}`,
          a, b, op, ri,
          level: rung.level, levelVn: rung.levelVn,
          isRungStart: ii === 0,
          isRungEnd: ii === (rung.items.length - 1),
          isLast: false,
        });
      });
    });
    if (items.length) items[items.length - 1].isLast = true;
    return items;
  }, [pool]);

  const [lang, setLang] = useState('en');
  const [pos, setPos] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [entries, setEntries] = useState({});   // cellId -> raw typed text
  const [locked, setLocked] = useState({});     // cellId -> true once accepted
  const [errors, setErrors] = useState({});     // cellId -> reason code
  const [wrongs, setWrongs] = useState({});     // cellId -> wrong-attempt count
  const [helped, setHelped] = useState(false);  // a cell was revealed this item
  const [positions, setPositions] = useState([]); // wrong-step codes this item
  const [itemDone, setItemDone] = useState(false);
  const [results, setResults] = useState({});   // itemId -> { score, positions }
  const [flash, setFlash] = useState(null);
  const [ended, setEnded] = useState(false);
  const firstBox = useRef(null);

  const t = lang === 'vn' ? VN : EN;
  const item = flat[pos];
  const model = useMemo(() => (item ? modelOf(mode, item.a, item.b, item.op) : null), [item, mode]);
  const stage = model?.stages[stageIdx];

  useEffect(() => { firstBox.current?.focus(); }, [stageIdx, pos]);

  if (!flat.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No drill yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#f97316] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#c2410c] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const liveCells = itemDone ? [] : cellsOf(stage);
  const isLive = (id) => liveCells.some((c) => c.id === id);
  const say = (kind, text) => {
    setFlash({ kind, text });
    setTimeout(() => setFlash((f) => (f && f.text === text ? null : f)), 3500);
  };

  /* ------------------------------------------------------------- checking */

  const check = () => {
    if (itemDone) return;
    // Every digit box in the stage must be filled (carry blanks mean zero).
    const missing = liveCells.some((c) => c.kind === 'digit' && !locked[c.id] &&
      Number.isNaN(parseDigit(entries[c.id], false)));
    if (missing) { say('bad', t.empty); return; }

    const nextLocked = { ...locked };
    const nextErrors = {};
    const nextWrongs = { ...wrongs };
    const nextEntries = { ...entries };
    const newPositions = [];
    let nowHelped = helped;

    for (const c of liveCells) {
      if (nextLocked[c.id]) continue;
      const typed = parseDigit(entries[c.id], c.kind === 'carry');
      if (typed === c.value) { nextLocked[c.id] = true; nextEntries[c.id] = String(c.value); continue; }

      const count = (nextWrongs[c.id] || 0) + 1;
      nextWrongs[c.id] = count;
      const carryPos = stage.op === '-' ? 'borrow' : 'carry';
      newPositions.push(c.kind === 'carry' ? carryPos : (stage.kind === 'sum' ? 'sum' : `partial-${stage.place}`));

      if (count >= 2) {
        // Wrong twice: reveal it, lock it, and mark the item as helped.
        nextLocked[c.id] = true;
        nextEntries[c.id] = String(c.value);
        nowHelped = true;
      } else {
        nextErrors[c.id] = c.kind === 'carry' ? carryReason(stage) : diagnoseDigit(stage, c.col, typed);
      }
    }

    setLocked(nextLocked);
    setErrors(nextErrors);
    setWrongs(nextWrongs);
    setEntries(nextEntries);
    if (nowHelped !== helped) setHelped(nowHelped);
    if (newPositions.length) setPositions((p) => [...new Set([...p, ...newPositions])]);

    // A revealed cell is now locked, so the stage can still be "all locked" even
    // when this pass had wrong entries. Advance on that, not on allRight.
    const everyLocked = liveCells.every((c) => nextLocked[c.id]);
    if (!everyLocked) { say('bad', ' '); return; }

    setFlash(null);
    if (stageIdx + 1 < model.stages.length) {
      setStageIdx((s) => s + 1);
    } else {
      // Item finished. Record its score: full unless a cell had to be shown.
      const score = nowHelped ? 0.5 : 1;
      setResults((r) => ({ ...r, [item.id]: { score, positions: [...new Set([...positions, ...newPositions])] } }));
      setItemDone(true);
    }
  };

  const resetItem = () => {
    setStageIdx(0); setEntries({}); setLocked({}); setErrors({});
    setWrongs({}); setHelped(false); setPositions([]); setItemDone(false); setFlash(null);
  };

  const goNext = () => { setPos((p) => p + 1); resetItem(); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const total = flat.length;
    const cleared = flat.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const log = flat.map((it) => {
      const r = results[it.id];
      return { itemId: it.id, correct: !!r && r.score === 1, positions: r ? r.positions : [] };
    });
    onComplete?.(raw, null, { items: log });
  };

  const edit = (id, text) => {
    setEntries((s) => ({ ...s, [id]: text }));
    if (errors[id]) setErrors((e) => { const n = { ...e }; delete n[id]; return n; });
  };

  /* ------------------------------------------------------------- render */

  const cleared = flat.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const errorList = [...new Set(Object.values(errors).filter(Boolean))];
  const activePlace = stage?.kind === 'partial' ? stage.place : -1;

  // Columns drawn left (highest) to right (units).
  const cols = Array.from({ length: model.W }, (_, i) => model.W - 1 - i);
  const aLen = String(item.a).length;
  const bLen = String(item.b).length;
  const boxCtx = { entries, edit, locked, errors, isLive, itemDone, check, firstBox, liveCells };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={onQuit}
        modeTitle={pool?.title ? (lang === 'vn' ? (pool.titleVn || pool.title) : pool.title) : t.title}
        current={pos + 1}
        total={flat.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-3">

        {/* Which level we are on, and the running tally */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2"
            style={{ borderColor: ORANGE, backgroundColor: `${ORANGE}14` }}>
            <Grid3x3 className="w-4 h-4" style={{ color: ORANGE }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">
              {t.level} {item.ri + 1}: {lang === 'vn' ? (item.levelVn || item.level) : item.level}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
            {cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {flat.length} {t.scoreLine}
          </div>
        </div>

        {/* THE GRID — the written algorithm, filled in one box at a time */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-6 overflow-x-auto">
          <div className="mx-auto w-fit">
            {/* multiplicand */}
            <GridRow cols={cols}>
              {cols.map((c) => (
                <FixedCell key={c} digit={c < aLen ? digitAt(item.a, c) : null} />
              ))}
            </GridRow>
            {/* second operand, with the operator on the far left; for long-mult
                the active multiplier digit is lit during its partial-product stage */}
            <GridRow cols={cols} op={model.opSymbol}>
              {cols.map((c) => (
                <FixedCell key={c}
                  digit={c < bLen ? digitAt(item.b, c) : null}
                  lit={c === activePlace} />
              ))}
            </GridRow>

            <div className="h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full my-1.5" />

            {/* one row per partial product (long-mult only; empty for add/subtract) */}
            {model.partials.map((pr) => (
              <GridRow key={pr.rowKey} cols={cols}>
                {cols.map((c) => (
                  <StageCell key={c} col={c} row={pr} rowKey={pr.rowKey}
                    active={!itemDone && stage?.rowKey === pr.rowKey} ctx={boxCtx} />
                ))}
              </GridRow>
            ))}

            {model.answerRow && (
              <>
                {model.partials.length > 0 && <div className="h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full my-1.5" />}
                <GridRow cols={cols} op={model.kind === 'mult' ? '=' : ''}>
                  {cols.map((c) => (
                    <StageCell key={c} col={c} row={model.answerRow} rowKey="sum"
                      active={!itemDone && stage?.rowKey === 'sum'} ctx={boxCtx} />
                  ))}
                </GridRow>
              </>
            )}
          </div>

          <p className="text-center text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3">
            {mode === 'column-add-sub' && item.op === '-' ? t.borrowNote : t.carryNote}
          </p>
        </div>

        {/* verdict + a named reason per distinct mistake */}
        <div className="min-h-[2rem] flex flex-col gap-2">
          {itemDone && (
            <div className="flex items-center gap-2 rounded-xl border-2 p-2.5"
              style={{ borderColor: GREEN, backgroundColor: `${GREEN}18` }}>
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
              <span className="font-black text-sm text-slate-800 dark:text-slate-100">
                {results[item.id]?.score === 1 ? t.clean : t.helped}
              </span>
            </div>
          )}
          {flash?.kind === 'bad' && flash.text.trim() && (
            <div className="flex items-start gap-2 font-bold text-sm" style={{ color: RED }}>
              <XCircle className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={2.5} />
              {flash.text}
            </div>
          )}
          {errorList.map((code) => (
            <div key={code} className="flex items-start gap-2 rounded-xl border-2 p-2.5"
              style={{ borderColor: AMBER, backgroundColor: `${AMBER}1a` }}>
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AMBER }} strokeWidth={2.5} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">{t.reasons[code]}</span>
            </div>
          ))}
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-3">
          {!itemDone ? (
            <button onClick={check}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#f97316] border-b-[4px] border-[#c2410c] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Grid3x3 className="w-4 h-4" strokeWidth={3} />
              {t.check}
            </button>
          ) : item.isLast ? (
            <button onClick={finish}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-4 h-4" strokeWidth={3} /> {t.finish}
            </button>
          ) : item.isRungEnd ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
              <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border-2"
                style={{ borderColor: GREEN, backgroundColor: `${GREEN}14` }}>
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: GREEN }} strokeWidth={2.5} />
                <span className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                  {t.level} {item.ri + 1} {t.levelClear} {flat[pos + 1]?.level
                    ? `“${lang === 'vn' ? (flat[pos + 1].levelVn || flat[pos + 1].level) : flat[pos + 1].level}” ${t.unlocked}.`
                    : ''}
                </span>
              </div>
              <button onClick={finish}
                className="px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-b-[4px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:border-b-0 active:translate-y-[4px]">
                {t.bankHere}
              </button>
              <button onClick={goNext}
                className="px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-[#f97316] border-b-[4px] border-[#c2410c] active:border-b-0 active:translate-y-[4px] flex items-center justify-center gap-2">
                {t.continue} {t.level} {item.ri + 2} <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button onClick={goNext}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              {t.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          )}
        </div>

        {item.isRungEnd && !itemDone && (
          <p className="text-center text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" strokeWidth={3} /> {t.heldNote}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ cells */

/** One grid row: an optional operator on the far left, then a cell per column. */
function GridRow({ op, children }) {
  return (
    <div className="flex items-end justify-end gap-1 sm:gap-1.5">
      <span className="w-5 sm:w-6 text-right font-mono font-black text-lg sm:text-xl text-slate-400 dark:text-slate-500 pb-2">
        {op || ''}
      </span>
      {children}
    </div>
  );
}

/** A fixed (given) digit — multiplicand or multiplier. */
function FixedCell({ digit, lit }) {
  return (
    <div className="flex flex-col items-center" style={{ width: '2.5rem' }}>
      <div className="h-4" />
      <div className={`w-9 h-11 sm:w-10 sm:h-12 flex items-center justify-center rounded-lg font-mono font-black text-xl sm:text-2xl tabular-nums
        ${digit === null ? '' : lit
          ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 ring-2 ring-orange-400'
          : 'text-slate-800 dark:text-slate-100'}`}>
        {digit === null ? '' : digit}
      </div>
    </div>
  );
}

/**
 * A cell of a fillable row: a small carry box on top (if the column takes a
 * carry) and the digit box below. Off-row and shift columns render blank so the
 * shape of the algorithm — each partial nudged one column left — is visible.
 */
function StageCell({ col, row, rowKey, active, ctx }) {
  const cell = row.cols.find((k) => k.col === col);
  if (!cell) {
    return <div className="flex flex-col items-center" style={{ width: '2.5rem' }}><div className="h-4" /><div className="w-9 h-11 sm:w-10 sm:h-12" /></div>;
  }
  return (
    <div className="flex flex-col items-center" style={{ width: '2.5rem' }}>
      {cell.carryBox
        ? <Box id={cid(rowKey, col, 'c')} carry active={active} ctx={ctx} />
        : <div className="h-4" />}
      <Box id={cid(rowKey, col, 'd')} active={active} ctx={ctx} />
    </div>
  );
}

/** A single input box. Dimmed until its row is active; green once accepted; red
 *  on a wrong check; amber-tinted placeholder for a small carry box. */
function Box({ id, carry, active, ctx }) {
  const { entries, edit, locked, errors, isLive, itemDone, check, firstBox, liveCells } = ctx;
  const live = active && isLive(id) && !itemDone;
  const isLocked = !!locked[id];
  const border = isLocked ? GREEN : errors[id] ? RED : live ? ORANGE : null;
  const firstLive = liveCells.length && liveCells[0].id === id;

  if (carry) {
    return (
      <input
        ref={live && firstLive ? firstBox : undefined}
        value={entries[id] ?? ''}
        onChange={(e) => edit(id, e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
        readOnly={!live || isLocked}
        disabled={!live && !isLocked}
        inputMode="numeric" maxLength={1} aria-label={id} placeholder=""
        className={`w-5 h-4 sm:w-5 sm:h-4 mb-0.5 rounded text-center font-mono font-black text-[11px] leading-none tabular-nums outline-none transition-colors
          ${isLocked ? 'text-amber-600 dark:text-amber-400'
            : live ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
              : 'text-transparent'}`}
        style={border ? { border: `1.5px solid ${border}` } : { border: '1.5px solid transparent' }}
      />
    );
  }

  return (
    <input
      ref={live && firstLive ? firstBox : undefined}
      value={entries[id] ?? ''}
      onChange={(e) => edit(id, e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
      readOnly={!live || isLocked}
      disabled={!live && !isLocked}
      inputMode="numeric" maxLength={1} aria-label={id}
      placeholder={live ? '?' : ''}
      className={`w-9 h-11 sm:w-10 sm:h-12 rounded-lg border-2 text-center font-mono font-black text-xl sm:text-2xl tabular-nums outline-none transition-colors
        ${isLocked ? 'bg-[#58cc02]/10 text-[#3e7500] dark:text-[#8ee000]'
          : live ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900'
            : 'bg-slate-100 dark:bg-slate-900/60 text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800'}`}
      style={border ? { borderColor: border } : undefined}
    />
  );
}
