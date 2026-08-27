import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Zap, CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, Construction, Timer,
} from 'lucide-react';
import TopBar from '../components/TopBar';

/* ------------------------------------------------------------------ *
 * FACTOR BLITZ — "a number lands; grab every factor before the clock."
 *
 * The student is shown a target number and a grid of candidate numbers
 * (2…12 by default — the factors "under 13" the exercise cares about, since
 * 1 and the number itself are factors of everything). They tap every tile
 * that divides the target and press Check, or the round auto-grades when the
 * timer runs out.
 *
 * Nothing is authored but the target numbers: the component derives each
 * round's factor set with `N % c === 0`, exactly the derive-don't-store rule
 * the Number Gym, Graph It and Vectors tasks all follow, so an author cannot
 * ship a wrong answer key.
 *
 * Reads a unit's `factorBlitz`:
 *   {
 *     title, titleVn, intro, introVn,
 *     seconds: 20,                 // optional per-round clock (default 18)
 *     candidates: [2,3,4,…,12],    // optional tile set (default 2…12)
 *     rounds: [24, 36, 30, 48, …], // the target numbers
 *   }
 *
 * SCORING. A round is worth 1 when the selected set is exactly the factor set.
 * Partial credit is honest about time pressure: net = (factors caught) −
 * (non-factors wrongly grabbed), floored at 0, over the number of factors. So
 * grabbing nothing scores 0, a clean sweep scores 1, and a stray tile costs a
 * real factor. XP = share of the rounds cleared, scaled from nativeMax 10 to
 * the unit's maxXP. Per-round correctness is logged so the error log can say
 * which numbers a student keeps missing.
 * ------------------------------------------------------------------ */

const LIME = '#84cc16';
const LIME_D = '#4d7c0f';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const AMBER = '#f59e0b';

const EN = {
  title: 'Factor Blitz',
  intro: 'A number appears. Tap every factor under 13 before the clock runs out — the numbers that divide it exactly. 1 and the number itself always count, so hunt from 2 up.',
  ready: 'Ready?',
  go: 'Start',
  find: 'Tap every factor of',
  check: 'Check',
  next: 'Next',
  finish: 'Finish',
  bankHere: 'Finish & bank XP',
  timeLeft: 'Time',
  round: 'Round',
  scoreLine: 'rounds clean',
  clean: 'Clean sweep — every factor, nothing extra.',
  close: 'Some factors slipped past, or a non-factor got in.',
  missed: 'Missed:',
  wrong: 'Not factors:',
};
const VN = {
  title: 'Truy Tìm Ước Số',
  intro: 'Một số xuất hiện. Bấm mọi ước số dưới 13 trước khi hết giờ — những số chia hết cho nó. Số 1 và chính số đó luôn là ước, nên hãy tìm từ 2 trở lên.',
  ready: 'Sẵn sàng chưa?',
  go: 'Bắt đầu',
  find: 'Bấm mọi ước số của',
  check: 'Kiểm tra',
  next: 'Tiếp',
  finish: 'Kết thúc',
  bankHere: 'Kết thúc & nhận XP',
  timeLeft: 'Thời gian',
  round: 'Vòng',
  scoreLine: 'vòng trọn vẹn',
  clean: 'Trọn vẹn — đủ mọi ước số, không thừa.',
  close: 'Còn sót ước số, hoặc chọn nhầm số không phải ước.',
  missed: 'Bỏ sót:',
  wrong: 'Không phải ước:',
};

const DEFAULT_CANDIDATES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function FactorBlitz({ pool, onComplete, onQuit }) {
  const rounds = useMemo(() => (pool?.rounds || []).filter((n) => Number.isInteger(n) && n > 1), [pool]);
  const candidates = useMemo(
    () => (pool?.candidates?.length ? pool.candidates : DEFAULT_CANDIDATES),
    [pool]
  );
  const seconds = pool?.seconds || 18;

  const [lang, setLang] = useState('en');
  const [roundIdx, setRoundIdx] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready | running | graded
  const [selected, setSelected] = useState(() => new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState({}); // roundIdx -> score 0..1
  const [ended, setEnded] = useState(false);

  // The countdown's grade() must read the latest selections, not those captured
  // when the timer effect last re-ran (same pattern as the times-sprint drill).
  const selectedRef = useRef(selected);
  useEffect(() => { selectedRef.current = selected; });

  const t = lang === 'vn' ? VN : EN;
  const target = rounds[roundIdx];
  const isLast = roundIdx >= rounds.length - 1;

  const factorsOf = (n) => candidates.filter((c) => n % c === 0);

  const scoreRound = (sel) => {
    const factors = factorsOf(target);
    if (!factors.length) return 1; // a prime target (no factor under 13) — an empty grid is correct
    let caught = 0, wrong = 0;
    sel.forEach((n) => (target % n === 0 ? (caught += 1) : (wrong += 1)));
    return Math.max(0, (caught - wrong) / factors.length);
  };

  const grade = () => {
    setResults((r) => ({ ...r, [roundIdx]: scoreRound(selectedRef.current) }));
    setPhase('graded');
  };

  // The countdown. Re-runs each tick, so grade() here reads fresh state.
  useEffect(() => {
    if (phase !== 'running') return undefined;
    if (timeLeft <= 0) { grade(); return undefined; }
    const id = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps -- grade is stable enough; adding it re-arms the timer every tap

  if (!rounds.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-lime-600" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No rounds yet</h2>
        <button onClick={onQuit} className="mt-4 px-6 py-3 bg-[#84cc16] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#4d7c0f] active:border-b-0 active:translate-y-[4px]">Return to Dashboard</button>
      </div>
    );
  }

  const start = () => { setSelected(new Set()); setTimeLeft(seconds); setPhase('running'); };
  const toggle = (n) => {
    if (phase !== 'running') return;
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(n)) next.delete(n); else next.add(n);
      return next;
    });
  };
  const nextRound = () => { setRoundIdx((r) => r + 1); setSelected(new Set()); setPhase('ready'); };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const total = rounds.length;
    const cleared = Object.values(results).reduce((s, v) => s + v, 0);
    const raw = total ? Math.round((cleared / total) * 10) : 0;
    const log = rounds.map((n, i) => ({ itemId: `factor-${n}-${i}`, correct: results[i] === 1 }));
    onComplete?.(raw, null, { items: log });
  };

  const cleared = Object.values(results).reduce((s, v) => s + (v === 1 ? 1 : 0), 0);
  const roundScore = results[roundIdx];
  const missed = phase === 'graded' ? factorsOf(target).filter((n) => !selected.has(n)) : [];
  const wrongPicks = phase === 'graded' ? [...selected].filter((n) => target % n !== 0) : [];
  const low = phase === 'running' && timeLeft <= 5;
  const mm = String(Math.floor(timeLeft / 60));
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit}
        modeTitle={pool?.title ? (lang === 'vn' ? (pool.titleVn || pool.title) : pool.title) : t.title}
        current={roundIdx + 1} total={rounds.length} lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-2xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: LIME, backgroundColor: `${LIME}1f` }}>
            <Zap className="w-4 h-4" style={{ color: LIME_D }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">{t.round} {roundIdx + 1}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {cleared} / {rounds.length} {t.scoreLine}
          </div>
        </div>

        {phase === 'ready' ? (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${LIME}22` }}>
              <Zap className="w-7 h-7" style={{ color: LIME_D }} strokeWidth={2.5} />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              {lang === 'vn' ? (pool.introVn || t.intro) : (pool.intro || t.intro)}
            </p>
            <button onClick={start}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#84cc16] border-b-[4px] border-[#4d7c0f] active:border-b-0 active:translate-y-[4px]">
              {t.go} · {seconds}s
            </button>
          </div>
        ) : (
          <>
            {/* target + timer */}
            <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">{t.find}</div>
                <div className="font-mono font-black tabular-nums leading-none text-slate-800 dark:text-slate-100" style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)' }}>
                  {target}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" strokeWidth={3} /> {t.timeLeft}
                </div>
                <div className={`font-mono font-black tabular-nums leading-none ${low ? 'animate-pulse' : ''}`}
                  style={{ fontSize: 'clamp(1.75rem, 6vw, 2.75rem)', color: phase === 'graded' ? '#94a3b8' : low ? RED : LIME_D }}>
                  {mm}:{ss}
                </div>
              </div>
            </div>

            {/* candidate grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {candidates.map((n) => {
                const isSel = selected.has(n);
                const isFactor = target % n === 0;
                let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 border-b-[4px]';
                if (phase === 'graded') {
                  if (isSel && isFactor) cls = 'bg-[#58cc02]/15 border-[#58a700] text-[#3e7500] dark:text-[#8ee000]';
                  else if (isSel && !isFactor) cls = 'bg-[#ff4b4b]/15 border-[#ff4b4b] text-[#c9362a]';
                  else if (!isSel && isFactor) cls = 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#a16207] dark:text-[#fbbf24]';
                  else cls = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600';
                } else if (isSel) {
                  cls = 'bg-[#84cc16]/20 border-[#4d7c0f] text-[#3f6212] dark:text-[#a3e635] border-b-[4px] ring-2 ring-[#84cc16]';
                }
                return (
                  <button key={n} onClick={() => toggle(n)} disabled={phase !== 'running'}
                    aria-label={`${n}${isSel ? ' selected' : ''}`}
                    className={`relative h-16 sm:h-20 rounded-2xl border-2 font-mono font-black text-2xl sm:text-3xl tabular-nums transition-all
                      ${phase === 'running' ? 'active:translate-y-[3px] active:border-b-2 cursor-pointer' : 'cursor-default'} ${cls}`}>
                    {n}
                  </button>
                );
              })}
            </div>

            {/* verdict */}
            <div className="min-h-[2rem] flex flex-col gap-2">
              {phase === 'graded' && (
                <div className="flex items-start gap-2 rounded-xl border-2 p-2.5"
                  style={{ borderColor: roundScore === 1 ? GREEN : AMBER, backgroundColor: roundScore === 1 ? `${GREEN}1f` : `${AMBER}1a` }}>
                  {roundScore === 1
                    ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GREEN }} strokeWidth={2.5} />
                    : <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: AMBER }} strokeWidth={2.5} />}
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
                    {roundScore === 1 ? t.clean : t.close}
                    {(missed.length > 0 || wrongPicks.length > 0) && (
                      <div className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-300 flex flex-wrap gap-x-3 gap-y-0.5">
                        {missed.length > 0 && <span>{t.missed} {missed.join(', ')}</span>}
                        {wrongPicks.length > 0 && <span>{t.wrong} {wrongPicks.join(', ')}</span>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* actions */}
            <div className="flex items-center justify-end gap-3">
              {phase === 'running' ? (
                <button onClick={grade}
                  className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#84cc16] border-b-[4px] border-[#4d7c0f] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                  <Zap className="w-4 h-4" strokeWidth={3} /> {t.check}
                </button>
              ) : isLast ? (
                <button onClick={finish}
                  className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                  <Trophy className="w-4 h-4" strokeWidth={3} /> {t.finish}
                </button>
              ) : (
                <>
                  <button onClick={finish}
                    className="px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-b-[4px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:border-b-0 active:translate-y-[4px]">
                    {t.bankHere}
                  </button>
                  <button onClick={nextRound}
                    className="px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-[#84cc16] border-b-[4px] border-[#4d7c0f] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
                    {t.next} <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
