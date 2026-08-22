import React, { useState, Suspense, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction, Trophy, Sun, Moon, Sparkles, PackageOpen } from 'lucide-react';

import { useStudentProgress } from '../utils/supabaseClient';
import UnitCard from '../components/UnitCard';
import { getTrackConfig } from '../components/trackRegistry';
import { getTrack } from '../data/index';
import { getTask, normalizeScore, unitXPOf } from '../tasks/taskRegistry';
import { isPreviewAccount } from '../utils/previewAccount';
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

function EmptyTrack({ title, theme }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
        <PackageOpen className={`w-10 h-10 ${theme?.text || 'text-slate-400'}`} strokeWidth={2.5} />
      </div>
      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">No units yet</h2>
      <p className="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
        {title} is set up and ready, but no lessons have been published to it yet. Check back soon!
      </p>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  const { user, unitScores = {}, isLoadingDB, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  // `?unit=<id>` — how Today's Plan hands a student straight to the unit it
  // assigned, instead of dropping them at the top of the track to hunt for it.
  const [searchParams] = useSearchParams();
  const requestedUnit = searchParams.get('unit');

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState(requestedUnit);
  const [isDark, toggleDarkMode] = useDarkMode();

  // Scroll the requested unit into view once the cards have rendered. Expanding
  // a card below the fold otherwise looks like nothing happened.
  useEffect(() => {
    if (!requestedUnit || isLoadingDB) return;
    const el = document.getElementById(`unit-${requestedUnit}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [requestedUnit, isLoadingDB]);

  const trackConfig = getTrackConfig(track);
  const currentTheme = trackConfig?.theme || {};
  const trackTitle = trackConfig?.title || 'Unknown Track';

  // Preview/QA accounts have every phase unlocked, ignoring XP thresholds.
  const previewAll = isPreviewAccount(user);

  const { meta: META_DATA, data: UNIT_DATA } = getTrack(track);
  const activeExpandedUnit = expandedUnit !== null ? expandedUnit : 'NONE';

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

  const getGlobalTrophyStyles = (total, max) => {
    if (max === 0) return { container: "bg-slate-100 dark:bg-slate-800 text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400" };
    const pct = (total / max) * 100;

    if (pct === 100) return {
      container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600",
      icon: "text-amber-950",
      aura: "absolute -inset-[3px] bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 rounded-xl opacity-80 blur-[6px] animate-pulse"
    };
    if (pct >= 90) return { container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", icon: "text-amber-950" };
    if (pct >= 75) return { container: "bg-slate-300 text-slate-800 border-b-[4px] border-slate-400", icon: "text-slate-700" };
    if (pct >= 60) return { container: "bg-orange-700 text-white border-b-[4px] border-orange-900", icon: "text-orange-200" };

    return { container: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400 dark:text-slate-500" };
  };

  const globalTrophy = getGlobalTrophyStyles(totalTrackXP, maxTrackXP);
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
        onAddStrike: (n) => addStrike(activeUnit, n),
        onComplete: (score, answers, meta) => handleTaskComplete(activeTask.id, score, answers, meta),
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
        <div className="animate-in fade-in duration-500 pb-20 relative z-10">

          <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/home')}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400"
                >
                  <ChevronLeft className="w-7 h-7" strokeWidth={3} />
                </button>
                <h1 className={`text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm ${currentTheme.text}`}>
                  {trackTitle}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                {maxTrackXP > 0 && (
                  <div className="relative items-center justify-center hidden sm:flex">
                    {globalTrophy.aura && <div className={globalTrophy.aura}></div>}
                    <div className={`relative z-10 flex items-center px-4 py-2 rounded-xl shadow-sm ${globalTrophy.container}`}>
                      <Trophy className={`w-5 h-5 mr-2 ${globalTrophy.icon}`} strokeWidth={2.5} />
                      <span className="text-xs font-black tracking-widest mt-0.5">{totalTrackXP} / {maxTrackXP} XP</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={toggleDarkMode}
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50"
                  title="Toggle Dark Mode"
                >
                  {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
                </button>

                <button
                  onClick={() => setShowHowItWorks(true)}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400"
                >
                  <Info className="w-6 h-6" strokeWidth={2.5} />
                </button>

                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                  <span className="px-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hidden md:block">{userName}</span>
                  <button
                    onClick={handleLogout}
                    className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl hover:text-rose-500 transition-colors shadow-sm border-2 border-slate-200 dark:border-slate-700 active:scale-95"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 relative z-10">
            {META_DATA.length === 0 ? (
              <EmptyTrack title={trackTitle} theme={currentTheme} />
            ) : (() => {
              let firstIncompleteFound = false;

              return META_DATA.map((metaUnit) => {
                const contentData = UNIT_DATA[metaUnit.id] || {};
                const scores = unitScores?.[metaUnit.id] || {};
                const unitXP = unitXPOf(contentData, scores);

                const isInProgress = unitXP > 0 && unitXP < 100;
                const isNext = unitXP === 0 && !firstIncompleteFound;
                if (unitXP < 100) firstIncompleteFound = true;

                const needsWork = isInProgress || isNext;

                const combinedUnitPayload = {
                  ...contentData,
                  id: metaUnit.id,
                  meta: {
                    id: metaUnit.id,
                    title: metaUnit.title,
                    description: metaUnit.desc,
                    icon: contentData.meta?.icon || 'BookOpen',
                    themeColor: contentData.meta?.themeColor,
                    glowColor: contentData.meta?.glowColor,
                    thresholds: contentData.meta?.thresholds
                  }
                };

                return (
                  // The id is the scroll anchor for `?unit=` deep links.
                  <div key={metaUnit.id} id={`unit-${metaUnit.id}`} className="scroll-mt-24">
                    <UnitCard
                      unit={combinedUnitPayload}
                      scores={scores}
                      currentTheme={currentTheme}
                      startMode={startMode}
                      isExpanded={activeExpandedUnit === metaUnit.id}
                      onToggle={() => setExpandedUnit(activeExpandedUnit === metaUnit.id ? 'NONE' : metaUnit.id)}
                      needsWork={needsWork}
                      previewAll={previewAll}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto border-4 border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Sparkles className="w-8 h-8 text-[#ffc800] mr-3 drop-shadow-sm" strokeWidth={2.5} />
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">How It Works</h2>
                </div>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                >
                  <XCircle className="w-6 h-6" strokeWidth={2.5}/>
                </button>
             </div>

             <p className="text-base text-slate-500 dark:text-slate-400 font-bold mb-8 leading-relaxed">
               Welcome! 🚀 We're so excited to help you learn Science and English at the same time. This is called <strong className="text-slate-800 dark:text-white font-black">CLIL</strong>, and it's a super fun way to build your vocabulary while exploring the world around you!
             </p>

             <div className="space-y-4 mb-8">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-start">
                 <div className="w-10 h-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 border-b-[4px] border-[#1899d6]"><span className="font-black text-sm">1</span></div>
                 <div>
                   <h3 className="font-black text-slate-800 dark:text-white text-lg mb-1">Quick Practice</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">Fun, bite-sized games and spelling drills designed to boost your memory and speed.</p>
                 </div>
               </div>

               <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-start">
                 <div className="w-10 h-10 rounded-xl bg-[#58cc02] text-white flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 border-b-[4px] border-[#58a700]"><span className="font-black text-sm">2</span></div>
                 <div>
                   <h3 className="font-black text-slate-800 dark:text-white text-lg mb-1">Smart Feedback</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">Write essays and answer questions, and our smart AI will give you helpful tips instantly to improve your writing!</p>
                 </div>
               </div>
             </div>

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
