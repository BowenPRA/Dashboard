import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  MonitorSmartphone, CheckCircle2, Trophy, Construction, Undo2, RotateCcw, Lightbulb, Target, XCircle,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { initialState, replay, evaluate, checkAll } from '../utils/appSim';

const FilesSkin = lazy(() => import('./appsim/skins/FilesSkin.jsx'));

/* ------------------------------------------------------------------ *
 * TRY IT (SIM) — a fake computer, a real job, and an assertion about the
 * state the machine ends up in.
 *
 * Everything else in this app assesses KNOWING. This assesses DOING, which is
 * the whole reason the Technology track exists: you cannot ask "can you use a
 * browser" as a multiple-choice question (docs/digital-skills-course.md §1).
 *
 * The engine (src/utils/appSim.js) owns the state, the actions and the goal;
 * this screen owns only the teaching around them, and it follows the four rules
 * the course doc sets out:
 *
 *   · ASSERT ON STATE. The goal is checked after every action, so Ctrl+S,
 *     Save As and the row menu all pass. There is no "correct" click.
 *   · NO DEAD ENDS. Undo and Start again are always available, and nothing in
 *     the simulator is unrecoverable.
 *   · NUDGE, DON'T FAIL. After `hintAfter` moves that have not got any closer,
 *     the region to look at glows and the score drops a step. The task NEVER
 *     ends on failure — a primary student quits at a wall.
 *   · PAR IS A BONUS, NOT A PENALTY. Finishing inside `parMoves` pays a bonus.
 *     Taking the long way round still finishes the job and still scores.
 *
 * Reads a unit's `sim` array:
 *   { id, skin, brief, briefVn, initial, goal[], solution[], parMoves, hintAfter,
 *     hints?: [{ after, region, say, sayVn }] }
 *
 * SCORING, out of nativeMax 10 per item, averaged across items:
 *   10  finished, no hint needed, inside par
 *    8  finished, no hint needed
 *    6  finished after a nudge
 *    3  gave up and watched the answer
 * A job the student actually completed never scores zero: they did it.
 * ------------------------------------------------------------------ */

const SKY = '#0ea5e9';
const SKY_DARK = '#0369a1';
const GREEN = '#58cc02';
const GREEN_DARK = '#3e7500';
const AMBER = '#f59e0b';

const EN = {
  title: 'Try It',
  job: 'Your job',
  of: 'of',
  done: 'done',
  moves: 'moves',
  par: 'par',
  undo: 'Undo',
  restart: 'Start again',
  next: 'Next',
  finish: 'Finish',
  solved: 'Done — the job is finished.',
  solvedPar: 'Done, and you did it in par. Nicely.',
  working: 'Have a go. Nothing here can break, and you can always undo.',
  nudge: 'Look here.',
  showMe: 'Show me how',
  watched: 'Watch what happens, then try the next one.',
  empty: 'Nothing to try yet',
  back: 'Return to Dashboard',
  broken: 'This activity has an authoring problem',
};

const VN = {
  title: 'Thử Làm',
  job: 'Việc của em',
  of: 'trên',
  done: 'xong',
  moves: 'bước',
  par: 'chuẩn',
  undo: 'Hoàn tác',
  restart: 'Làm lại từ đầu',
  next: 'Tiếp theo',
  finish: 'Kết thúc',
  solved: 'Xong — công việc đã hoàn thành.',
  solvedPar: 'Xong, và em làm đúng số bước chuẩn. Giỏi lắm.',
  working: 'Cứ thử đi. Không có gì hỏng được, và em luôn có thể hoàn tác.',
  nudge: 'Hãy nhìn chỗ này.',
  showMe: 'Chỉ em cách làm',
  watched: 'Hãy xem điều gì xảy ra, rồi thử câu tiếp theo.',
  empty: 'Chưa có bài nào để thử',
  back: 'Về Bảng Điều Khiển',
  broken: 'Hoạt động này có lỗi soạn nội dung',
};

function Placeholder({ icon: Icon, tone, heading, detail, onQuit, back }) {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${tone}1f` }}>
        <Icon className="w-8 h-8" style={{ color: tone }} strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{heading}</h2>
      {detail && <pre className="max-w-xl text-left text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-pre-wrap">{detail}</pre>}
      <button onClick={onQuit}
        className="mt-6 px-6 py-3 bg-[#0ea5e9] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#0369a1] active:border-b-0 active:translate-y-[4px]">
        {back}
      </button>
    </div>
  );
}

export default function AppSim({ pool, onComplete, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : pool?.items || []), [pool]);

  // Same guard as Find It: `checkAll` is what the validator runs, so a problem
  // surviving to here means the data moved after the last `npm run validate`.
  const problems = useMemo(() => checkAll(items), [items]);
  if (problems.length && import.meta.env.DEV) {
    throw new Error(`SIM authoring problems:\n  ${problems.join('\n  ')}`);
  }

  const [lang, setLang] = useState('en');
  const [idx, setIdx] = useState(0);
  const [log, setLog] = useState([]);        // actions taken on the current item
  const [nudged, setNudged] = useState(false);
  const [watched, setWatched] = useState(false);
  const [results, setResults] = useState({});
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (problems.length) console.error(`[SIM] ${problems.length} authoring problem(s):\n  ${problems.join('\n  ')}`);
  }, [problems]);

  const t = lang === 'vn' ? VN : EN;
  const item = items[idx];

  // Derived, never stored: the machine's state IS the fold of the action log.
  const state = useMemo(() => (item ? replay(initialState(item), log) : null), [item, log]);
  const verdict = useMemo(() => (item && state ? evaluate(state, item.goal) : { met: false, failed: [] }), [item, state]);

  // How far off the student is, so a move that gets closer is not counted as
  // floundering. `hintAfter` moves without progress is what earns a nudge.
  const [stuckFor, setStuckFor] = useState(0);
  const hintAfter = item?.hintAfter || 3;

  if (problems.length && !items.length) {
    return <Placeholder icon={XCircle} tone="#ff4b4b" heading={t.broken} detail={problems.join('\n')} onQuit={onQuit} back={t.back} />;
  }
  if (!items.length) {
    return <Placeholder icon={Construction} tone={SKY} heading={t.empty} onQuit={onQuit} back={t.back} />;
  }

  const solved = verdict.met;
  const par = item.parMoves || 0;
  const inPar = par > 0 && log.length <= par;

  // The region to glow. An item may author its own ladder of hints; otherwise
  // the first unmet goal clause names the area it is about.
  const hintFor = () => {
    if (!nudged || solved) return null;
    const authored = (item.hints || []).filter((h) => log.length >= (h.after || hintAfter));
    if (authored.length) return authored[authored.length - 1];
    const first = verdict.failed[0];
    return first ? { region: regionForPath(first.path), say: t.nudge, sayVn: VN.nudge } : null;
  };
  const hint = hintFor();

  const doAction = (action) => {
    if (solved || watched) return;
    const before = evaluate(state, item.goal).failed.length;
    const next = [...log, action];
    setLog(next);
    const after = evaluate(replay(initialState(item), next), item.goal).failed.length;
    // Getting closer resets the patience counter; going sideways spends it.
    const stuck = after < before ? 0 : stuckFor + 1;
    setStuckFor(stuck);
    if (stuck >= hintAfter) setNudged(true);
  };

  const undoOne = () => { if (!watched) { setLog(log.slice(0, -1)); setStuckFor(0); } };
  const restart = () => { setLog([]); setStuckFor(0); };
  const showMe = () => { setWatched(true); setNudged(true); setLog(item.solution || []); };

  const scoreFor = () => {
    if (watched) return 3;
    if (!verdict.met) return 0;
    if (nudged) return 6;
    return inPar ? 10 : 8;
  };

  const goNext = () => {
    setResults((r) => ({ ...r, [item.id]: scoreFor() }));
    setIdx((i) => i + 1);
    setLog([]); setNudged(false); setWatched(false); setStuckFor(0);
  };

  const finish = () => {
    if (ended) return;
    setEnded(true);
    const all = { ...results, [item.id]: scoreFor() };
    const total = items.length;
    const raw = total ? Math.round(items.reduce((s, it) => s + (all[it.id] || 0), 0) / total) : 0;
    onComplete?.(raw, null, {
      items: items.map((it) => ({ itemId: it.id, score: all[it.id] || 0 })),
    });
  };

  const isLast = idx >= items.length - 1;
  const clearedCount = Object.values(results).filter((s) => s > 0).length + (solved || watched ? 1 : 0);

  let tone = SKY;
  let message = t.working;
  if (solved) { tone = GREEN; message = inPar && !nudged && !watched ? t.solvedPar : t.solved; }
  else if (watched) { tone = AMBER; message = t.watched; }
  else if (hint) { tone = AMBER; message = lang === 'vn' ? (hint.sayVn || VN.nudge) : (hint.say || EN.nudge); }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar
        onQuit={onQuit}
        modeTitle={t.title}
        current={idx + 1}
        total={items.length}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-3xl mx-auto p-3 sm:p-5 pb-10 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor: SKY, backgroundColor: `${SKY}14` }}>
            <MonitorSmartphone className="w-4 h-4" style={{ color: SKY_DARK }} strokeWidth={2.5} />
            <span className="font-black text-sm text-slate-800 dark:text-slate-100">
              {idx + 1} {t.of} {items.length}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {log.length} {t.moves}
              {par > 0 && <span className="text-slate-300 dark:text-slate-600">/ {par} {t.par}</span>}
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" strokeWidth={3} /> {clearedCount} / {items.length} {t.done}
            </span>
          </div>
        </div>

        {/* the brief */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-5 py-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{t.job}</div>
          <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {lang === 'vn' ? (item.briefVn || item.brief) : item.brief}
          </div>
        </div>

        {/* the machine */}
        <Suspense fallback={<div className="p-8 text-center font-black text-slate-400">Loading…</div>}>
          {item.skin === 'files' && (
            <FilesSkin state={state} onAction={doAction} hint={hint?.region || null} disabled={solved || watched} />
          )}
        </Suspense>

        {/* feedback */}
        <div className="flex items-start gap-2 rounded-xl border-2 p-3" style={{ borderColor: tone, backgroundColor: `${tone}14` }}>
          {solved
            ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GREEN_DARK }} strokeWidth={2.5} />
            : <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: hint || watched ? AMBER : SKY_DARK }} strokeWidth={2.5} />}
          <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{message}</div>
        </div>

        {/* actions. Undo and Start again are always there — no dead ends. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button onClick={undoOne} disabled={!log.length || solved || watched}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-b-[3px] flex items-center gap-1.5
                ${log.length && !solved && !watched
                  ? 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                  : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'}`}>
              <Undo2 className="w-3.5 h-3.5" strokeWidth={3} /> {t.undo}
            </button>
            <button onClick={restart} disabled={!log.length || watched}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-b-[3px]
                ${log.length && !watched
                  ? 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                  : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'}`}>
              {t.restart}
            </button>
            {/* Offered only once the student has genuinely been stuck, so it is a
                way out rather than a shortcut. It still scores. */}
            {nudged && !solved && !watched && (
              <button onClick={showMe}
                className="px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-[#f59e0b] border-b-[3px] border-[#b45309] active:border-b-0 active:translate-y-[3px]">
                {t.showMe}
              </button>
            )}
          </div>

          {(solved || watched) && (isLast ? (
            <button onClick={finish}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#58cc02] border-b-[4px] border-[#3e7500] active:border-b-0 active:translate-y-[4px] flex items-center gap-2">
              <Trophy className="w-4 h-4" strokeWidth={3} /> {t.finish}
            </button>
          ) : (
            <button onClick={goNext}
              className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-[#0ea5e9] border-b-[4px] border-[#0369a1] active:border-b-0 active:translate-y-[4px]">
              {t.next}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Which part of the window a failing goal clause is about, so the default nudge
 * points somewhere useful without every item having to author its own hints.
 */
function regionForPath(path = '') {
  if (path.startsWith('saved')) return 'save';
  if (path.startsWith('bin') || path.includes('Recycle')) return 'folder:Recycle Bin';
  const folder = /^at\.([^.[]+)/.exec(path)?.[1];
  if (folder) return `folder:${folder}`;
  return 'list';
}
