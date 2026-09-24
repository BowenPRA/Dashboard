import React, { useState, Suspense, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction, Trophy, Sun, Moon, Sparkles } from 'lucide-react';

import { useStudentProgress } from '../utils/supabaseClient';
import TrackUnits from '../components/TrackUnits';
import useTrackNav from '../hooks/useTrackNav';
import ProgressLoadError from '../components/ProgressLoadError';
import { getTrackConfig } from '../components/trackRegistry';
import { getTrack } from '../data/index';
import { getTask, normalizeScore, unitXPOf } from '../tasks/taskRegistry';
import { isPreviewAccount } from '../utils/previewAccount';
import { essaysOf } from '../utils/essayArchive';
import useDarkMode from '../hooks/useDarkMode';

function PlaceholderView({ title, onQuit }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
        <Construction className="w-10 h-10 text-slate-400" strokeWidth={2.5} />
      </div>
      <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">{title}</h2>
      <div className="bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 mb-10 text-xs font-black text-slate-500 uppercase tracking-widest">
        Under Construction
      </div>
      <button
        onClick={onQuit}
        className="px-8 py-4 bg-[#1cb0f6] text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-[#159bd9] border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm"
      >
        Return
      </button>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  const { user, unitScores = {}, isLoadingDB, loadError, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  // `?unit=<id>` — how Today's Plan hands a student straight to the unit it
  // assigned, instead of dropping them at the top of the track to hunt for it.
  const [searchParams] = useSearchParams();
  const requestedUnit = searchParams.get('unit');

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  // Which unit is open and which sections are unfolded — held here, above the
  // list, so it survives the list unmounting while a task is on screen.
  const nav = useTrackNav(requestedUnit);
  const [isDark, toggleDarkMode] = useDarkMode();

  // Escape closes the How It Works modal, like every other modal in the app.
  useEffect(() => {
    if (!showHowItWorks) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setShowHowItWorks(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHowItWorks]);

  const trackConfig = getTrackConfig(track);
  const currentTheme = trackConfig?.theme || {};
  const trackTitle = trackConfig?.title || 'Unknown Track';

  // Preview/QA accounts have every phase unlocked, ignoring XP thresholds.
  const previewAll = isPreviewAccount(user);

  const { meta: META_DATA, data: UNIT_DATA } = getTrack(track);

  if (loadError) return <ProgressLoadError />;

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-500 font-black tracking-widest uppercase">Syncing</p>
      </div>
    );
  }

  const totalTrackXP = META_DATA.reduce(
    (sum, u) => sum + unitXPOf(UNIT_DATA[u.id], unitScores?.[u.id] || {}),
    0
  );
  const maxTrackXP = META_DATA.length * 100;
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  /** Launch a task. The registry decides what data it needs. */
  const startMode = (unitId, taskId) => {
    const unit = UNIT_DATA[unitId];
    const task = getTask(taskId);
    if (!unit || !task) return;

    setActiveUnit(unitId);
    setCurrentPool(task.buildPool(unit, { track, unitId }));
    setActiveTaskId(taskId);
  };

  const closeTask = () => setActiveTaskId(null);

  // `meta` carries the per-item and per-word log a task chose to keep — see
  // progressSchema.js. Tasks that don't produce one simply omit it.
  const handleTaskComplete = async (taskId, rawScore, answers = null, meta = {}) => {
    const unit = UNIT_DATA[activeUnit];
    const declared = (unit?.phases || []).flatMap((p) => p.tasks).find((t) => t.id === taskId);
    const task = { ...getTask(taskId), maxXP: declared?.maxXP ?? getTask(taskId)?.defaultMaxXP };

    await saveScore(activeUnit, task.dbKey, normalizeScore(task, rawScore), answers, meta);
    setActiveTaskId(null);
  };

  // A mid-task checkpoint: persist the running score and resume blob without
  // closing the task, so exiting (or a crash) never discards work already done.
  // `partial` tells recordAttempt not to log a fresh attempt for each question.
  const handleTaskProgress = (taskId, rawScore, answers = null, meta = {}) => {
    const unit = UNIT_DATA[activeUnit];
    const declared = (unit?.phases || []).flatMap((p) => p.tasks).find((t) => t.id === taskId);
    const task = { ...getTask(taskId), maxXP: declared?.maxXP ?? getTask(taskId)?.defaultMaxXP };
    saveScore(activeUnit, task.dbKey, normalizeScore(task, rawScore), answers, { ...meta, partial: true });
  };

  // --- active task ----------------------------------------------------------
  const activeTask = activeTaskId ? getTask(activeTaskId) : null;
  const activeUnitData = activeUnit ? UNIT_DATA[activeUnit] : null;
  const activeScores = unitScores?.[activeUnit] || {};

  let taskElement = null;
  if (activeTask) {
    if (!activeTask.component) {
      taskElement = <PlaceholderView title={activeTask.label} onQuit={closeTask} />;
    } else {
      const TaskComponent = activeTask.component;
      const taskProps = activeTask.props({
        unit: activeUnitData,
        unitId: activeUnit,
        track,
        pool: currentPool,
        scores: activeScores,
        savedData: activeScores[activeTask.dbKey]?.answers || {},
        strikes: activeScores.strikes || 0,
        // The track's saved essays, for the Essay task's watch-list and picker.
        essayArchive: essaysOf(unitScores),
        onAddStrike: (n, detail) => addStrike(activeUnit, n, detail),
        onComplete: (score, answers, meta) => handleTaskComplete(activeTask.id, score, answers, meta),
        onProgress: (score, answers, meta) => handleTaskProgress(activeTask.id, score, answers, meta),
        onQuit: closeTask,
      });
      taskElement = <TaskComponent {...taskProps} />;
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-200 transition-colors duration-300">

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${currentTheme.ambient1} opacity-10 dark:opacity-20 blur-[100px] transition-colors duration-500`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ${currentTheme.ambient2} opacity-10 dark:opacity-15 blur-[100px] transition-colors duration-500`} />
      </div>

      {!activeTask && (
        <div className="animate-in fade-in duration-200 pb-20 relative z-10">

          {/* Back and the course's name on the left; the course XP and three
              quiet icon buttons (help, theme, log out) on the right. The name
              of who is signed in lives on Home — here it only crowded the bar. */}
          <div className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                aria-label="Back to My Courses"
                title="My Courses"
                className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className={`text-lg sm:text-2xl font-black tracking-tight leading-tight truncate ${currentTheme.text}`}>
                  {trackTitle}
                </h1>
                {trackConfig?.desc && (
                  <p className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 truncate">{trackConfig.desc}</p>
                )}
              </div>

              {maxTrackXP > 0 && (
                <div
                  className="hidden sm:flex items-center gap-2 h-11 px-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 flex-shrink-0"
                  title="XP earned in this course, out of everything on offer"
                >
                  <Trophy className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-sm font-black tabular-nums whitespace-nowrap">
                    {totalTrackXP.toLocaleString()}
                    <span className="font-bold opacity-60"> / {maxTrackXP.toLocaleString()} XP</span>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => setShowHowItWorks(true)}
                  aria-label="How it works"
                  title="How it works"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                >
                  <Info className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                  title="Toggle Dark Mode"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors active:scale-95"
                  title={`Log out ${userName}`}
                  aria-label="Log out"
                >
                  <LogOut className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          <TrackUnits
            track={track}
            unitScores={unitScores}
            previewAll={previewAll}
            requestedUnit={requestedUnit}
            startMode={startMode}
            nav={nav}
          />
        </div>
      )}

      {showHowItWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={(e) => { if (e.target === e.currentTarget) setShowHowItWorks(false); }}
        >
          <div role="dialog" aria-modal="true" aria-label="How it works" className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto border-4 border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Sparkles className="w-8 h-8 text-[#ffc800] mr-3 drop-shadow-sm" strokeWidth={2.5} />
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">How It Works</h2>
                </div>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  aria-label="Close"
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                >
                  <XCircle className="w-6 h-6" strokeWidth={2.5}/>
                </button>
             </div>

             <p className="text-base text-slate-500 dark:text-slate-400 font-bold mb-6 leading-relaxed">
               Welcome to <strong className="text-slate-800 dark:text-white font-black">{trackTitle}</strong>! 🚀 Tap <strong className="text-slate-700 dark:text-slate-200">Continue</strong> at the top to pick up where you left off, or open any unit and work down its steps.
             </p>

             {/* The same three steps a unit card shows, in the same words. */}
             <ol className="space-y-3 mb-8">
               {[
                 ['Start with the lesson', 'Read the notes and learn the key words first. Everything after builds on them.'],
                 ['Practise to earn XP', 'Every task gives you XP. Some are checked by AI, which gives you tips straight away. More XP opens the next step.'],
                 ['Take the quiz', 'A unit is done when you have 80 XP and have taken the quiz. Get all 100 XP to earn a gold star.'],
               ].map(([heading, body], i) => (
                 <li key={heading} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-start">
                   <span className={`w-9 h-9 rounded-full text-white flex items-center justify-center mr-4 flex-shrink-0 font-black text-sm ${currentTheme.bg || 'bg-[#1cb0f6]'}`}>{i + 1}</span>
                   <div>
                     <h3 className="font-black text-slate-800 dark:text-white text-base mb-0.5">{heading}</h3>
                     <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">{body}</p>
                   </div>
                 </li>
               ))}
             </ol>

             <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 p-5 rounded-2xl mb-8 flex items-start shadow-sm">
               <AlertTriangle className="w-6 h-6 text-rose-400 dark:text-rose-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
               <div>
                 <h4 className="font-black text-xs text-rose-800 dark:text-rose-300 uppercase tracking-widest mb-2">Safety & Respect</h4>
                 <p className="text-rose-600 dark:text-rose-400 text-sm font-bold leading-relaxed">
                   We want to keep this a safe, positive space for everyone. If you type anything unkind or inappropriate 3 times, the AI grading will take a pause.
                 </p>
               </div>
             </div>

             <button
               onClick={() => setShowHowItWorks(false)}
               className="w-full bg-[#1cb0f6] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-[#159bd9] transition-all border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px]"
             >
               Let's Go!
             </button>
          </div>
        </div>
      )}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" strokeWidth={3} />
        </div>
      }>
        {taskElement}
      </Suspense>
    </div>
  );
}
