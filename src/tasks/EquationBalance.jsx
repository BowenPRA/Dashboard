import { useState, useMemo } from 'react';
import {
  Scale, RotateCcw, Undo2, Lightbulb, ArrowRight, Construction, PartyPopper,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import {
  fr, frText, parseEquation, sideText, applyMove, moveText, isSolved,
  suggestMove, parSteps, isZero, isOne, isNeg, toNumber,
} from '../utils/linearEquation';

/* ------------------------------------------------------------------ *
 * Balance — solve an equation by doing the same thing to both sides.
 *
 * Two representations of the same act, side by side:
 *   the BEAM, which never tilts, because you always act on both sides;
 *   the WORKING, which builds up the way it is written in a notebook —
 *     3x + 7  =  22
 *       − 7      − 7
 *     ─────────────────
 *       3x    =  15
 *
 * The student picks an operation and a number, then presses one button that
 * says what the whole idea is: "Do it to both sides". Nothing is ever applied
 * to one side alone, so the equation cannot be broken — a wrong move is only
 * an unhelpful one, and Undo is always there.
 * ------------------------------------------------------------------ */

const OPS = [
  { kind: 'add', sym: '+', label: 'Add' },
  { kind: 'sub', sym: '−', label: 'Subtract' },
  { kind: 'mul', sym: '×', label: 'Multiply by' },
  { kind: 'div', sym: '÷', label: 'Divide by' },
];

const VN = {
  title: 'Cân Bằng Phương Trình',
  doBoth: 'Làm với cả hai vế',
  undo: 'Hoàn tác',
  reset: 'Làm lại',
  hint: 'Gợi ý',
  solved: 'Đã giải xong!',
  steps: 'bước',
  par: 'mục tiêu',
  next: 'Tiếp theo',
  finish: 'Hoàn thành',
  pick: 'Chọn một phép toán, rồi chọn một số',
  stays: 'Cân luôn thăng bằng — vì bạn luôn làm giống nhau ở cả hai vế.',
  yourAnswer: 'Đáp án',
  hintUsed: 'Đã dùng gợi ý',
};
const EN = {
  title: 'Balance the Equation',
  doBoth: 'Do it to both sides',
  undo: 'Undo',
  reset: 'Reset',
  hint: 'Show me',
  solved: 'Solved!',
  steps: 'steps',
  par: 'target',
  next: 'Next',
  finish: 'Finish',
  pick: 'Pick an operation, then a number',
  stays: 'The scale stays level — because you always do the same to both sides.',
  yourAnswer: 'Answer',
  hintUsed: 'Hint used',
};

/** One pan of the balance: x-chips you can count, and the constant as a chip. */
function Pan({ side, v = 'x' }) {
  const chips = [];
  const co = side.x;

  if (!isZero(co)) {
    const whole = co.d === 1 ? Math.abs(co.n) : null;
    if (whole !== null && whole <= 6) {
      // Few enough to count — this is what makes "divide by 3" visible.
      for (let i = 0; i < whole; i++) {
        chips.push(
          <span key={`x${i}`}
            className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-black text-base sm:text-xl border-b-[4px] shadow-sm
              ${isNeg(co) ? 'bg-rose-100 dark:bg-rose-900/40 border-rose-400 text-rose-700 dark:text-rose-300'
                          : 'bg-[#1cb0f6] border-[#1899d6] text-white'}`}>
            {isNeg(co) ? `−${v}` : v}
          </span>
        );
      }
    } else {
      const label = isOne(co) ? v : (co.d === 1 ? `${co.n}${v}` : `${co.n}${v}/${co.d}`);
      chips.push(
        <span key="xn"
          className="inline-flex items-center justify-center px-3 sm:px-4 h-10 sm:h-12 rounded-xl font-black text-base sm:text-xl bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white shadow-sm">
          {label}
        </span>
      );
    }
  }

  if (!isZero(side.c) || isZero(co)) {
    chips.push(
      <span key="c"
        className={`inline-flex items-center justify-center px-3 sm:px-4 h-10 sm:h-12 rounded-xl font-black text-base sm:text-xl border-b-[4px] shadow-sm
          ${isNeg(side.c) ? 'bg-rose-100 dark:bg-rose-900/40 border-rose-400 text-rose-700 dark:text-rose-300'
                          : 'bg-[#ffc800] border-[#cca000] text-amber-950'}`}>
        {frText(side.c)}
      </span>
    );
  }

  return (
    // flex-col + flex-1 on the box so both pans end up the SAME height however
    // many chips each holds — a balance whose pans are different sizes rather
    // undermines the point.
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="w-0.5 h-5 bg-slate-300 dark:bg-slate-600 mx-auto" />
      <div className="flex-1 min-h-[5.5rem] rounded-2xl border-2 border-b-[6px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {chips}
      </div>
    </div>
  );
}

/** The beam. It never tilts; that is the entire point. */
function Beam({ eq }) {
  if (!eq) return null;
  const v = eq.v || 'x';
  return (
    <div>
      <div className="relative">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3.5 h-3.5 rounded-full bg-slate-500 dark:bg-slate-400 border-2 border-white dark:border-slate-900" />
      </div>
      <div className="flex items-stretch gap-1.5 sm:gap-8">
        <Pan side={eq.left} v={v} />
        <div className="flex flex-col items-center pt-5 shrink-0">
          <div className="w-0 h-0 border-l-[13px] border-r-[13px] border-b-[20px] border-transparent border-b-slate-400 dark:border-b-slate-500" />
          <div className="w-10 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 -mt-0.5" />
        </div>
        <Pan side={eq.right} v={v} />
      </div>
    </div>
  );
}

/** The accumulating written solution: each applied move under both sides. */
function Working({ history, v = 'x' }) {
  return (
    <div className="font-mono">
      {history.map((row, i) => (
        <div key={i} className="animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
            <div className="text-right text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
              {sideText(row.eq.left, v)}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-400 dark:text-slate-500">=</div>
            <div className="text-left text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
              {sideText(row.eq.right, v)}
            </div>
          </div>

          {row.move && (
            <>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 mt-1">
                <div className="text-right text-lg sm:text-xl font-black text-[#1899d6] dark:text-[#5cc4f7]">
                  {moveText(row.move, v)}
                </div>
                <div className="w-3" />
                <div className="text-left text-lg sm:text-xl font-black text-[#1899d6] dark:text-[#5cc4f7]">
                  {moveText(row.move, v)}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-5 my-2">
                <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="w-3" />
                <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * One problem. Mounted with `key={problem.id}` so moving to the next equation
 * resets the working, the chosen operation and the typed number by construction
 * — no effect has to remember to clear them, and there is no frame where the
 * new equation is shown with the old working.
 */
function Solver({ problem, t, lang, onSolved, footer }) {
  const [history, setHistory] = useState(() => [{ eq: problem.start, move: null }]);
  const [opKind, setOpKind] = useState('sub');
  const [amount, setAmount] = useState('');
  const [wantOnX, setWantOnX] = useState(false);
  const [error, setError] = useState('');

  const current = history[history.length - 1].eq;
  const solved = isSolved(current);
  const stepsTaken = history.length - 1;
  const varName = current.v || 'x';
  const opSymbol = OPS.find((o) => o.kind === opKind)?.sym || '+';

  // Collecting x only matters once x is on both sides. Gating the flag at the
  // point of use means it can never be left stranded as the equation changes.
  const bothSidesHaveX = !isZero(current.left.x) && !isZero(current.right.x);
  const onX = wantOnX && bothSidesHaveX;

  // Numbers worth one tap: the ones actually in front of them.
  const chips = useMemo(() => {
    const vals = new Set();
    for (const s of [current.left, current.right]) {
      if (!isZero(s.c) && s.c.d === 1) vals.add(Math.abs(s.c.n));
      if (!isZero(s.x) && s.x.d === 1 && !isOne(s.x)) vals.add(Math.abs(s.x.n));
    }
    return [...vals].filter((v) => v > 0).sort((a, b) => a - b).slice(0, 6);
  }, [current]);

  const apply = () => {
    if (solved) return;
    const raw = String(amount).trim();
    if (!raw) { setError(lang === 'vn' ? 'Hãy chọn một số.' : 'Pick a number first.'); return; }
    const parts = raw.split('/');
    let value;
    try {
      value = parts.length === 2 ? fr(parseInt(parts[0], 10), parseInt(parts[1], 10)) : fr(Number(raw));
      if (!isFinite(toNumber(value))) throw new Error('not finite');
    } catch {
      setError(lang === 'vn' ? 'Số không hợp lệ.' : 'That is not a valid number.');
      return;
    }

    const move = { kind: opKind, amount: value, onX };
    let next;
    try { next = applyMove(current, move); }
    catch {
      setError(lang === 'vn' ? 'Không thể nhân hoặc chia cho 0.' : 'You cannot multiply or divide by zero.');
      return;
    }
    setError('');
    setAmount('');
    setHistory((h) => [...h.slice(0, -1), { ...h[h.length - 1], move }, { eq: next, move: null }]);
    // Solving is an event, not something to notice later in an effect.
    if (isSolved(next)) onSolved(problem.id, stepsTaken + 1);
  };

  const undo = () => {
    if (history.length < 2) return;
    setHistory((h) => [...h.slice(0, -2), { ...h[h.length - 2], move: null }]);
    setError('');
  };
  const reset = () => { setHistory([{ eq: problem.start, move: null }]); setError(''); setAmount(''); };

  const showHint = () => {
    if (solved) return;
    const m = suggestMove(current);
    if (!m) return;
    onSolved(problem.id, null, true);   // flag the hint; does not mark it solved
    setOpKind(m.kind);
    setWantOnX(!!m.onX);
    setAmount(frText(m.amount));
    setError('');
  };

  return (
    <>
      {/* ---- the balance ---- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 mb-4">
        <Beam eq={current} />
        <p className="mt-4 text-center text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
          <Scale className="w-4 h-4 shrink-0" strokeWidth={2.5} /> {t.stays}
        </p>
      </div>

      {/* ---- the written working ---- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-7 mb-4">
        <Working history={history} v={varName} />
        {solved && footer(stepsTaken)}
      </div>

      {/* ---- the controls ---- */}
      {!solved && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6">
          <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{t.pick}</div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {OPS.map((o) => (
              <button
                key={o.kind}
                onClick={() => { setOpKind(o.kind); setError(''); }}
                className={`py-3 rounded-2xl font-black text-2xl border-2 border-b-[5px] transition-all active:border-b-2 active:translate-y-[3px]
                  ${opKind === o.kind
                    ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1cb0f6]'}`}
              >
                {o.sym}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {chips.map((v) => (
              <button
                key={v}
                onClick={() => { setAmount(String(v)); setError(''); }}
                className={`px-4 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px]
                  ${String(amount) === String(v)
                    ? 'bg-[#ffc800] border-[#cca000] text-amber-950'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#ffc800]'}`}
              >
                {v}
              </button>
            ))}
            <input
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); apply(); } }}
              inputMode="numeric"
              placeholder="?"
              className="w-20 px-3 py-2 rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-black text-lg text-center focus:outline-none focus:border-[#1cb0f6]"
            />
            {bothSidesHaveX && (
              <button
                onClick={() => setWantOnX((v) => !v)}
                title={lang === 'vn' ? 'Áp dụng cho số hạng x' : 'Apply to the x term'}
                className={`px-4 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px]
                  ${onX ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'}`}
              >
                {varName}
              </button>
            )}
          </div>

          {/* The preview says out loud what is about to happen to BOTH sides. */}
          <div className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 mb-3 min-h-5 font-mono">
            {amount && (() => {
              const tail = `${opSymbol} ${amount}${onX ? varName : ''}`;
              return `${sideText(current.left, varName)} ${tail}   =   ${sideText(current.right, varName)} ${tail}`;
            })()}
          </div>

          {error && <div className="text-center text-sm font-bold text-rose-500 mb-3">{error}</div>}

          <button
            onClick={apply}
            disabled={!amount}
            className="w-full py-4 rounded-2xl font-black text-base sm:text-lg uppercase tracking-widest bg-[#58cc02] border-b-[6px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            {t.doBoth}
          </button>

          <div className="flex items-center justify-center gap-2 mt-3">
            <button onClick={undo} disabled={history.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
              <Undo2 className="w-4 h-4" strokeWidth={2.5} /> {t.undo}
            </button>
            <button onClick={reset} disabled={history.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} /> {t.reset}
            </button>
            <button onClick={showHint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.hint}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function EquationBalance({ pool = [], onComplete, onQuit }) {
  const problems = useMemo(
    () => pool.map((p) => {
      try { return { ...p, start: parseEquation(p.equation) }; }
      catch { return null; }
    }).filter(Boolean),
    [pool]
  );

  const [idx, setIdx] = useState(0);
  const [lang, setLang] = useState('en');
  const [results, setResults] = useState({});   // id -> { steps, hinted }

  const t = lang === 'vn' ? VN : EN;
  const p = problems[idx];
  const par = useMemo(() => (p ? parSteps(p.start) : 0), [p]);

  const record = (id, steps, hinted = false) =>
    setResults((r) => ({
      ...r,
      [id]: { steps: steps ?? r[id]?.steps ?? null, hinted: hinted || !!r[id]?.hinted },
    }));

  const finish = () => {
    if (!problems.length) { onComplete?.(0); return; }
    const items = problems.map((q) => ({
      itemId: q.id,
      correct: results[q.id]?.steps != null && !results[q.id]?.hinted,
    }));
    const clean = items.filter((i) => i.correct).length;
    onComplete?.(Math.round((clean / problems.length) * 10), null, { items });
  };

  const next = () => {
    if (idx < problems.length - 1) setIdx((i) => i + 1);
    else finish();
  };

  if (!problems.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-sky-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No equations yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const prompt = lang === 'vn' ? (p.promptVn || p.prompt) : p.prompt;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={onQuit}
        modeTitle={t.title}
        current={idx + 1}
        total={problems.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 pb-10">

        {prompt && (
          <p className="text-center text-slate-500 dark:text-slate-400 font-bold mb-4">{prompt}</p>
        )}

        <Solver
          key={p.id}
          problem={p}
          t={t}
          lang={lang}
          onSolved={record}
          footer={(stepsTaken) => (
            <div className="mt-5 pt-5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#58cc02] flex items-center justify-center shadow-sm shrink-0">
                  <PartyPopper className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-black text-lg text-[#3e7500] dark:text-[#7bd42f]">{t.solved}</div>
                  <div className="text-xs font-bold text-slate-400">
                    {stepsTaken} {t.steps} · {t.par} {par}
                    {results[p.id]?.hinted ? ` · ${t.hintUsed}` : ''}
                  </div>
                </div>
              </div>
              <button
                onClick={next}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-2xl font-black text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all"
              >
                {idx < problems.length - 1 ? t.next : t.finish}
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
