import { useMemo, useState } from 'react';
import {
  Pyramid, Construction, CheckCircle2, XCircle, ArrowRight, ArrowUp, ArrowDown, Lightbulb, Trophy,
  Parentheses, Equal, RotateCcw, Flag,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { makePyramidSession, markBlock } from '../utils/pyramid';
import {
  pyramidRows, blockReachable, polyAt, numText, solveFeedback,
} from '../components/math/algebraTaskHelpers';

/* ------------------------------------------------------------------ *
 * ALGEBRA PYRAMIDS — each block is the two blocks under it, added.
 *
 * Reads a unit's `pyramids`: { title, titleVn, modes: [...], rounds }.
 * Every round is generated fresh from a seed (utils/pyramid.js), so a second
 * attempt is practice, not memory:
 *   up        bottom row given; build every block above
 *   down      three blocks given anywhere; add going up, subtract going down
 *   brackets  the bottom blocks hold brackets; expand, then add and collect
 *   solve     the top is a NUMBER: build the top expression, write the
 *             equation, solve it, then check by substituting into every block
 *
 * A block is marked by value AND simplest form (a form slip is a nudge, not
 * a wrong answer). Two wrong answers on one block fill it in and the round
 * pays half. Score: rounds out of 10. Quitting part-way finishes with the
 * rounds that are done.
 * ------------------------------------------------------------------ */

const INK = '#ca8a04';
const INK_DARK = '#a16207';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';

const T = {
  en: {
    title: 'Algebra Pyramids',
    modes: { up: 'Build up', down: 'Work down', brackets: 'Brackets', solve: 'Solve' },
    rules: {
      up: 'Each block is the two blocks below it, added. Collect like terms.',
      down: 'Add going up, subtract going down.',
      brackets: 'Expand each bracket, then add the two blocks below and collect.',
      solve: 'Build up to the top block. It equals the number, so solve for the letter.',
    },
    round: (i, n) => `Pyramid ${i} of ${n}`,
    check: 'Check',
    cont: 'Continue',
    next: 'Next pyramid',
    results: 'See results',
    finish: 'Finish',
    again: 'New pyramids',
    hint: 'Tap a ? block, type its expression, press Enter.',
    typeFirst: 'Type an expression in a ? block first.',
    notYet: 'Not yet — fill in a block next to this one first. You need two blocks you know.',
    right: (x) => `Right: ${x}.`,
    filled: (x) => `This block is ${x} — filled in for you.`,
    eqTitle: 'Write the equation',
    eqSub: (n) => `The top block is ${n}, so the top expression equals ${n}:`,
    solveTitle: 'Solve it',
    solveHint: 'Type a number, like 7.',
    typeNumber: 'Type a number first.',
    solvedRight: (l, v) => `Right — ${l} = ${v}.`,
    solFilled: (l, v) => `The solution is ${l} = ${v} — filled in for you.`,
    checkTitle: 'Check it',
    checkSub: (l, v, n) => `Put ${l} = ${v} into every block: each block is still the two below it added, and the top comes to ${n}.`,
    built: 'Pyramid built — every block right first time.',
    builtSlip: 'Pyramid built — and you fixed your slips yourself.',
    builtHelped: 'Pyramid built — with some help.',
    summaryTitle: 'Pyramids finished',
    summaryLine: (c, n) => `${c} of ${n} pyramids built with no help`,
    halfNote: 'A pyramid with a block filled in for you counts as half.',
    empty: 'This unit has no pyramid modes.',
    back: 'Return',
    howTitle: 'How a pyramid works',
    howUp: 'Going up: add',
    howDown: 'Going down: subtract',
    rounds: 'Pyramids',
    score: 'Score',
  },
  vn: {
    title: 'Kim tự tháp đại số',
    modes: { up: 'Xây lên', down: 'Làm ngược xuống', brackets: 'Dấu ngoặc', solve: 'Giải' },
    rules: {
      up: 'Mỗi ô bằng tổng hai ô ngay bên dưới. Gộp các hạng tử đồng dạng.',
      down: 'Đi lên thì cộng, đi xuống thì trừ.',
      brackets: 'Khai triển từng dấu ngoặc, rồi cộng hai ô bên dưới và gộp lại.',
      solve: 'Tìm biểu thức ở ô trên cùng. Nó bằng số đã cho, nên hãy giải tìm chữ cái.',
    },
    round: (i, n) => `Kim tự tháp ${i}/${n}`,
    check: 'Kiểm tra',
    cont: 'Tiếp tục',
    next: 'Kim tự tháp tiếp',
    results: 'Xem kết quả',
    finish: 'Hoàn thành',
    again: 'Kim tự tháp mới',
    hint: 'Chạm vào ô ?, nhập biểu thức rồi bấm Enter.',
    typeFirst: 'Hãy nhập biểu thức vào một ô ? trước.',
    notYet: 'Chưa được — hãy điền một ô bên cạnh ô này trước. Em cần biết hai ô.',
    right: (x) => `Đúng: ${x}.`,
    filled: (x) => `Ô này là ${x} — đã được điền cho em.`,
    eqTitle: 'Viết phương trình',
    eqSub: (n) => `Ô trên cùng bằng ${n}, nên biểu thức ở đỉnh bằng ${n}:`,
    solveTitle: 'Giải phương trình',
    solveHint: 'Nhập một số, ví dụ 7.',
    typeNumber: 'Hãy nhập một số trước.',
    solvedRight: (l, v) => `Đúng — ${l} = ${v}.`,
    solFilled: (l, v) => `Nghiệm là ${l} = ${v} — đã được điền cho em.`,
    checkTitle: 'Thử lại',
    checkSub: (l, v, n) => `Thay ${l} = ${v} vào mọi ô: mỗi ô vẫn bằng tổng hai ô bên dưới, và ô trên cùng bằng ${n}.`,
    built: 'Xây xong — mọi ô đều đúng ngay lần đầu.',
    builtSlip: 'Xây xong — em đã tự sửa lỗi của mình.',
    builtHelped: 'Xây xong — có một chút trợ giúp.',
    summaryTitle: 'Đã hoàn thành các kim tự tháp',
    summaryLine: (c, n) => `${c}/${n} kim tự tháp tự xây không cần trợ giúp`,
    halfNote: 'Kim tự tháp có ô được điền giúp được tính một nửa.',
    empty: 'Bài này chưa có chế độ kim tự tháp.',
    back: 'Quay lại',
    howTitle: 'Kim tự tháp hoạt động thế nào',
    howUp: 'Đi lên: cộng',
    howDown: 'Đi xuống: trừ',
    rounds: 'Các kim tự tháp',
    score: 'Điểm',
  },
};
const both = (key, ...args) => ({
  en: typeof T.en[key] === 'function' ? T.en[key](...args) : T.en[key],
  vn: typeof T.vn[key] === 'function' ? T.vn[key](...args) : T.vn[key],
});
const MODE_ICON = { up: ArrowUp, down: ArrowDown, brackets: Parentheses, solve: Equal };

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const BRICK_W = { 3: 'w-[6.5rem] sm:w-32 lg:w-36', 4: 'w-24 sm:w-28' };
const domId = (seed, idx, id) => `pyr-${seed}-${idx}-${id}`;

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

/**
 * One block. Given and finished blocks show KaTeX; a blank one is an input.
 * `target` (solve rounds) writes "= 46" on the top block; `check` writes the
 * block's value once the solution is substituted.
 */
function Brick({ cell, width, mode, state, value, isActive, isBad, inputId, autoFocus, onChange, onFocus, onEnter, target, check }) {
  let tone = 'bg-white dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-600';
  if (state === 'given') tone = mode === 'brackets' && cell.r === 0 ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-300 dark:border-sky-700' : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600';
  else if (state === 'good') tone = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700]';
  else if (state === 'shown') tone = 'bg-amber-50 dark:bg-amber-900/20 border-amber-400';
  else if (isBad) tone = 'bg-rose-50 dark:bg-rose-900/20 border-solid border-rose-400';
  else if (isActive) tone = 'bg-white dark:bg-slate-900 border-solid ring-4 ring-yellow-500/25';
  return (
    <div
      className={`${BRICK_W[width] || BRICK_W[3]} shrink-0 min-h-[3.5rem] sm:min-h-[4rem] rounded-xl border-2 border-b-[4px] flex flex-col items-center justify-center px-1 py-1 transition-all ${tone}`}
      style={state === 'blank' && isActive && !isBad ? { borderColor: INK } : undefined}
    >
      {state === 'blank' ? (
        <input
          id={inputId}
          value={value ?? ''}
          autoFocus={autoFocus}
          inputMode="text"
          aria-label={`block ${cell.id}`}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={(e) => { if (e.key === 'Enter') onEnter(); }}
          placeholder="?"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full min-w-0 bg-transparent text-center font-mono font-black text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none py-1"
        />
      ) : (
        <div className="max-w-full overflow-x-auto whitespace-nowrap text-[0.8rem] sm:text-sm lg:text-base text-slate-900 dark:text-slate-100">
          <SafeInlineMath math={cell.latex} />
        </div>
      )}
      {target != null && <div className="text-xs sm:text-sm font-black leading-none mt-0.5 text-amber-700 dark:text-amber-300">= {numText(target)}</div>}
      {check != null && <div className="text-[11px] sm:text-xs font-black leading-none mt-1 px-1.5 py-0.5 rounded-md bg-[#58cc02]/15 text-[#3e7500] dark:text-lime-300 animate-in fade-in">= {numText(check)}</div>}
    </div>
  );
}

/** The rule as a picture: two blocks and the block above them. */
function RuleCard({ t }) {
  const mini = 'w-16 h-9 rounded-lg border-2 border-b-[3px] flex items-center justify-center text-sm text-slate-900 dark:text-slate-100';
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.howTitle}</div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className={`${mini} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400`}><SafeInlineMath math="a + b" /></div>
          <div className="flex gap-1">
            <div className={`${mini} bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600`}><SafeInlineMath math="a" /></div>
            <div className={`${mini} bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600`}><SafeInlineMath math="b" /></div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-xs font-black">
          <span className="flex items-center gap-1 text-[#3e7500] dark:text-lime-300"><ArrowUp className="w-4 h-4" strokeWidth={3} /> {t.howUp}</span>
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-300"><ArrowDown className="w-4 h-4" strokeWidth={3} /> {t.howDown}</span>
        </div>
      </div>
    </div>
  );
}

function makeSessionSafe(config, seed) {
  try {
    return makePyramidSession(config, seed);
  } catch {
    return [];
  }
}

export default function AlgebraPyramids({ pool, onComplete, onQuit, bilingual = true }) {
  const config = useMemo(() => pool || {}, [pool]);
  const [seed, setSeed] = useState(() => Date.now());
  const session = useMemo(() => makeSessionSafe(config, seed), [config, seed]);

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState({});     // block id -> good | shown
  const [typed, setTyped] = useState({});
  const [tries, setTries] = useState({});       // block id -> wrong answers
  const [bad, setBad] = useState({});           // block id -> a wrong answer is sitting in it
  const [active, setActive] = useState(null);
  const [msg, setMsg] = useState(null);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [stage, setStage] = useState('blocks'); // blocks | equation | solve | check | done
  const [solTyped, setSolTyped] = useState('');
  const [solTries, setSolTries] = useState(0);
  const [solState, setSolState] = useState(null);
  const [results, setResults] = useState({});   // round index -> 1 | 0.5
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [ended, setEnded] = useState(false);

  const t = lang === 'vn' ? T.vn : T.en;
  const L = (en, vn) => (lang === 'vn' && vn ? vn : en);
  const round = session[idx];

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const items = session.map((r, i) => ({ itemId: `${r.mode}-${i + 1}`, correct: results[i] === 1 }));
    const total = session.reduce((s, _, i) => s + (results[i] || 0), 0);
    onComplete?.(session.length ? Math.round((total / session.length) * 10) : 0, null, { items });
  };
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  if (!round) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <p className="font-black text-slate-600 dark:text-slate-300 mb-4">{t.empty}</p>
        <button onClick={onQuit} className={`px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const rows = pyramidRows(round);
  const blanks = round.cells.filter((c) => !c.given);
  const topId = rows[0][0].id;
  const ModeIcon = MODE_ICON[round.mode] || Pyramid;

  /* ---------------------------------------------------------- flow */
  const resetRound = () => {
    setSolved({}); setTyped({}); setTries({}); setBad({}); setActive(null); setMsg(null);
    setHelped(false); setSlipped(false); setStage('blocks');
    setSolTyped(''); setSolTries(0); setSolState(null);
  };
  const completeRound = (wasHelped, nextStage) => {
    setResults((r) => ({ ...r, [idx]: wasHelped ? 0.5 : 1 }));
    setStage(nextStage);
  };
  const nextRound = () => {
    if (idx + 1 < session.length) { setIdx(idx + 1); resetRound(); }
    else setSummaryOpen(true);
  };
  const newPyramids = () => {
    setSeed(Date.now());
    setIdx(0);
    setResults({});
    setSummaryOpen(false);
    setEnded(false);
    resetRound();
  };

  /** After a block is settled: move to the next block that can be worked out, or on to the next stage. */
  const afterBlock = (next, wasHelped) => {
    const left = blanks.filter((c) => !next[c.id]);
    if (left.length) {
      const target = left.find((c) => blockReachable(round, c.id, next)) || left[0];
      setActive(target.id);
      document.getElementById(domId(seed, idx, target.id))?.focus();
      return;
    }
    setActive(null);
    if (round.mode === 'solve') setStage('equation');
    else completeRound(wasHelped, 'done');
  };

  const checkBlock = (id) => {
    if (stage !== 'blocks' || !id || solved[id]) return;
    const cell = round.cells.find((c) => c.id === id);
    if (!cell || cell.given) return;
    const raw = String(typed[id] ?? '').trim();
    if (!raw) { setMsg({ info: true, ...both('typeFirst') }); return; }
    const d = markBlock(round, id, raw, solved);
    if (d.ok) {
      const next = { ...solved, [id]: 'good' };
      setSolved(next);
      setBad((b) => ({ ...b, [id]: false }));
      setMsg({ ok: true, ...both('right', cell.text) });
      afterBlock(next, helped);
      return;
    }
    // unreadable, or the right value not yet simplified: a nudge, not a wrong answer
    if (d.code === 'unreadable' || d.equivalent) { setMsg({ info: true, en: d.en, vn: d.vn }); return; }
    // nothing known next to it yet: not a wrong answer either
    if (!blockReachable(round, id, solved)) { setMsg({ info: true, ...both('notYet') }); return; }
    const n = (tries[id] || 0) + 1;
    setTries((x) => ({ ...x, [id]: n }));
    setSlipped(true);
    if (n >= 2) {
      const next = { ...solved, [id]: 'shown' };
      setSolved(next);
      setTyped((x) => ({ ...x, [id]: cell.text }));
      setBad((b) => ({ ...b, [id]: false }));
      setHelped(true);
      const f = both('filled', cell.text);
      setMsg({ shown: true, en: `${d.en} ${f.en}`, vn: `${d.vn} ${f.vn}` });
      afterBlock(next, true);
    } else {
      setBad((b) => ({ ...b, [id]: true }));
      setMsg({ ok: false, en: d.en, vn: d.vn });
    }
  };
  const checkTarget = active && !solved[active]
    ? active
    : blanks.find((c) => !solved[c.id] && String(typed[c.id] ?? '').trim())?.id;

  const checkSolution = () => {
    if (stage !== 'solve' || solState === 'good' || solState === 'shown') return;
    const raw = solTyped.trim();
    if (!raw) { setMsg({ info: true, ...both('typeNumber') }); return; }
    const d = solveFeedback(round, raw);
    if (d.ok) {
      setSolState('good');
      setMsg({ ok: true, ...both('solvedRight', round.letter, numText(round.solution)) });
      completeRound(helped, 'check');
      return;
    }
    if (!d.code || d.code === 'unreadable') { setMsg({ info: true, en: d.en, vn: d.vn }); return; }
    const n = solTries + 1;
    setSolTries(n);
    setSlipped(true);
    if (n >= 2) {
      setSolState('shown');
      setSolTyped(String(round.solution));
      setHelped(true);
      const f = both('solFilled', round.letter, numText(round.solution));
      setMsg({ shown: true, en: `${d.en} ${f.en}`, vn: `${d.vn} ${f.vn}` });
      completeRound(true, 'check');
    } else {
      setSolState('bad');
      setMsg({ ok: false, en: d.en, vn: d.vn });
    }
  };

  /* ---------------------------------------------------------- render helpers */
  const firstFocus = (blanks.find((c) => blockReachable(round, c.id, {})) || blanks[0])?.id;
  const showValues = stage === 'check';
  const roundDone = stage === 'done' || stage === 'check';
  const isLast = idx + 1 >= session.length;
  const cleanCount = Object.values(results).filter((v) => v === 1).length;
  const scoreOut = session.length ? Math.round((session.reduce((s, _, i) => s + (results[i] || 0), 0) / session.length) * 10) : 0;
  const banner = helped ? t.builtHelped : slipped ? t.builtSlip : t.built;
  const solStateClass = solState === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30'
    : solState === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
      : solState === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900';

  const topBar = (
    <TopBar
      onQuit={quit}
      modeTitle={L(config.title, config.titleVn) || t.title}
      current={summaryOpen ? session.length : idx + 1}
      total={session.length}
      lang={lang}
      onLangToggle={bilingual ? () => setLang((l) => (l === 'en' ? 'vn' : 'en')) : undefined}
    />
  );

  /* ---------------------------------------------------------- summary */
  if (summaryOpen) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
        {topBar}
        <div className="flex-1 w-full max-w-xl mx-auto p-3 sm:p-5 pb-10">
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: INK }}>
            <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: INK }}>
              <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />
              <div className="font-black">{t.summaryTitle}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-90 whitespace-nowrap">{t.score} {scoreOut} / 10</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
              <p className="text-lg font-black text-slate-800 dark:text-slate-100">{t.summaryLine(cleanCount, session.length)}</p>
              <p className="text-xs font-bold text-slate-400 mb-3">{t.halfNote}</p>
              <div className="grid grid-cols-2 gap-2">
                {session.map((r, i) => {
                  const Icon = MODE_ICON[r.mode] || Pyramid;
                  const v = results[i];
                  const tone = v === 1 ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
                    : v === 0.5 ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400';
                  return (
                    <div key={i} className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-black ${tone}`}>
                      <Icon className="w-4 h-4 shrink-0" strokeWidth={3} />
                      <span className="truncate">{i + 1}. {t.modes[r.mode]}</span>
                      <span className="ml-auto">{v === 1 ? '✓' : v === 0.5 ? '½' : '–'}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
                <button onClick={newPyramids} className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <RotateCcw className="w-4 h-4" strokeWidth={3} /> {t.again}
                </button>
                <button onClick={finish} disabled={ended} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                  <Flag className="w-4 h-4 inline mr-1.5 -mt-0.5" strokeWidth={3} />{t.finish}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- render */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {topBar}

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 lg:items-start">
        {/* left: the pyramid */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: INK }}>
            <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
              <ModeIcon className="w-5 h-5 shrink-0" strokeWidth={3} />
              <div className="text-sm font-black uppercase tracking-widest">{t.modes[round.mode]}</div>
              <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-90 whitespace-nowrap">{t.round(idx + 1, session.length)}</div>
            </div>
            <p className="px-4 pt-3 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-300 leading-snug">{t.rules[round.mode]}</p>

            <div className="px-1 sm:px-3 py-3 overflow-x-auto">
              <div key={`${seed}-${idx}`} className="w-max mx-auto flex flex-col items-center gap-1 sm:gap-1.5 p-1 animate-in fade-in">
                {rows.map((row) => (
                  <div key={row[0].r} className="flex justify-center gap-1 sm:gap-1.5">
                    {row.map((cell) => {
                      const state = cell.given ? 'given' : solved[cell.id] || 'blank';
                      return (
                        <Brick
                          key={`${seed}-${idx}-${cell.id}`}
                          cell={cell}
                          width={round.width}
                          mode={round.mode}
                          state={state}
                          value={typed[cell.id]}
                          isActive={active === cell.id}
                          isBad={!!bad[cell.id]}
                          inputId={domId(seed, idx, cell.id)}
                          autoFocus={cell.id === firstFocus}
                          onChange={(v) => { setTyped((x) => ({ ...x, [cell.id]: v })); setBad((b) => ({ ...b, [cell.id]: false })); }}
                          onFocus={() => setActive(cell.id)}
                          onEnter={() => checkBlock(cell.id)}
                          target={round.mode === 'solve' && cell.id === topId ? round.target : null}
                          check={showValues ? polyAt(cell.poly, round.letter, round.solution) : null}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {stage === 'blocks' && (
              <div className="px-4 pb-4">
                <div className="flex items-center gap-3">
                  <p className="flex-1 text-xs font-bold text-slate-400">{t.hint}</p>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => checkBlock(checkTarget)}
                    disabled={!checkTarget || !String(typed[checkTarget] ?? '').trim()}
                    className={`px-5 py-3 text-white text-xs ${btn}`}
                    style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}
                  >
                    {t.check}
                  </button>
                </div>
                <Message msg={msg} lang={lang} />
              </div>
            )}
          </div>
        </div>

        {/* right: the stage, the rounds, the rule */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {stage === 'equation' && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5 animate-in fade-in">
              <div className="font-black text-slate-800 dark:text-slate-100 mb-1 text-lg">{t.eqTitle}</div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t.eqSub(numText(round.target))}</p>
              <div className="text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 overflow-x-auto">
                <SafeBlockMath math={`${round.topLatex} = ${round.target}`} />
              </div>
              <div className="flex justify-end">
                <button onClick={() => { setStage('solve'); setMsg(null); }} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                  {t.cont} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}

          {(stage === 'solve' || stage === 'check') && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-5 animate-in fade-in">
              <div className="font-black text-slate-800 dark:text-slate-100 mb-2 text-lg">{t.solveTitle}</div>
              <div className="text-xl text-slate-900 dark:text-slate-100 mb-3 overflow-x-auto whitespace-nowrap">
                <SafeInlineMath math={`${round.topLatex} = ${round.target}`} />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
                <SafeInlineMath math={`${round.letter} =`} />
                <input
                  value={solTyped}
                  disabled={stage !== 'solve'}
                  autoFocus
                  inputMode="text"
                  aria-label={`${round.letter} =`}
                  onChange={(e) => { setSolTyped(e.target.value); if (solState === 'bad') setSolState(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') checkSolution(); }}
                  placeholder="?"
                  spellCheck={false}
                  autoComplete="off"
                  className={`w-24 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-yellow-500 disabled:opacity-90 ${solStateClass}`}
                />
                {stage === 'solve' && (
                  <button onClick={checkSolution} disabled={!solTyped.trim()} className={`ml-auto px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>
                    {t.check}
                  </button>
                )}
              </div>
              {stage === 'solve' && <p className="mt-2 text-xs font-bold text-slate-400">{t.solveHint}</p>}
              <Message msg={msg} lang={lang} />
            </div>
          )}

          {roundDone && (
            <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: helped ? AMBER : GREEN }}>
              <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
                {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{banner}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5">
                {stage === 'check' && (
                  <>
                    <div className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-[#58a700]" strokeWidth={3} /> {t.checkTitle}
                    </div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{t.checkSub(round.letter, numText(round.solution), numText(round.target))}</p>
                  </>
                )}
                <div className="flex justify-end">
                  <button onClick={nextRound} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
                    {isLast ? t.results : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.rounds}</div>
            <div className="flex flex-wrap gap-1.5">
              {session.map((r, i) => {
                const Icon = MODE_ICON[r.mode] || Pyramid;
                const v = results[i];
                const tone = v === 1 ? 'bg-[#58cc02] border-[#58a700] text-white'
                  : v === 0.5 ? 'bg-amber-400 border-amber-500 text-white'
                    : i === idx ? 'bg-white dark:bg-slate-800 text-yellow-700 dark:text-yellow-300'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400';
                return (
                  <span key={i} title={t.modes[r.mode]} className={`w-8 h-8 rounded-lg border-2 border-b-[3px] flex items-center justify-center ${tone}`} style={i === idx && v == null ? { borderColor: INK } : undefined}>
                    <Icon className="w-4 h-4" strokeWidth={3} />
                  </span>
                );
              })}
            </div>
          </div>

          <RuleCard t={t} />
        </div>
      </div>
    </div>
  );
}
