import React from 'react';
import { 
  Languages, Keyboard, BookOpen, Headphones, FileText, 
  Image as ImageIcon, Lock, Award, AlertCircle, 
  ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil,
  ChevronDown, ChevronUp, Trophy, Globe, Atom, Leaf, GraduationCap,
  Microscope, Telescope, Brain, Rocket, Calculator, Dna, FlaskConical,
  Compass, Lightbulb, Activity, Zap
} from 'lucide-react';

const IconMap = {
  "Award": Award, "GraduationCap": GraduationCap, "BookOpen": BookOpen,
  "Globe": Globe, "Atom": Atom, "Leaf": Leaf, "Languages": Languages,
  "Microscope": Microscope, "Telescope": Telescope, "Brain": Brain,
  "Rocket": Rocket, "Calculator": Calculator, "Dna": Dna, "FlaskConical": FlaskConical,
  "Compass": Compass, "Lightbulb": Lightbulb, "Activity": Activity, "Zap": Zap
};

const TaskUIConfig = {
  "WORD_REC":      { label: "Vocab", icon: Languages, bg: "bg-[#58cc02]", border: "border-[#58a700]", text: "text-white" },
  "NOTES":         { label: "Notes", icon: FileText, bg: "bg-[#94a3b8]", border: "border-[#64748b]", text: "text-white" },
  "WORKBOOK":      { label: "Extra", icon: FileBox, bg: "bg-[#ec4899]", border: "border-[#be185d]", text: "text-white" },
  
  "SPELLING":      { label: "Spelling", icon: Keyboard, bg: "bg-[#1cb0f6]", border: "border-[#1899d6]", text: "text-white" },
  "READ_COMP":     { label: "Reading", icon: BookOpen, bg: "bg-[#ff9600]", border: "border-[#cc7800]", text: "text-white" },
  "DICTATION":     { label: "Listening", icon: Headphones, bg: "bg-[#ce82ff]", border: "border-[#a567cc]", text: "text-white" },
  
  "SHORT_ANSWERS": { label: "Questions", icon: HelpCircle, bg: "bg-[#ffc800]", border: "border-[#cca000]", text: "text-white" },
  "DIAGRAMS":      { label: "Diagram", icon: ImageIcon, bg: "bg-[#ff4b4b]", border: "border-[#cc3c3c]", text: "text-white" },
  "ESSAY":         { label: "Essay", icon: Pencil, bg: "bg-[#14b8a6]", border: "border-[#0d9488]", text: "text-white" },
  
  "ASSESSMENT":    { label: "Assessment", icon: ClipboardCheck, bg: "bg-[#2563eb]", border: "border-[#1d4ed8]", text: "text-white" },
  "GAMES":         { label: "Game", icon: Gamepad2, bg: "bg-[#6366f1]", border: "border-[#4f46e5]", text: "text-white" }
};

export default function UnitCard({ unit, scores = {}, currentTheme, startMode, isExpanded, onToggle, needsWork }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;
  
  // Directly pull the color strictly from the unit's meta data
  const unitThemeColor = unit.meta?.themeColor || currentTheme.banner || 'bg-indigo-500 border-indigo-700';
  const unitPhases = unit.phases || [];

  // 1. Dynamically calculate Unit XP
  let rawUnitXP = 0;
  unitPhases.forEach(phase => {
    (phase.tasks || []).forEach(task => {
      const score = scores[task.dbKey]?.current || 0;
      rawUnitXP += Math.min(score, task.maxXP);
    });
  });
  const unitXP = Math.min(rawUnitXP, 100);

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  const getTrophyStyles = (xp) => {
    if (xp === 100) return { 
      container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", 
      icon: "text-amber-950",
      aura: "absolute -inset-[3px] bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 rounded-2xl opacity-80 blur-[6px] animate-pulse"
    };
    if (xp >= 90) return { container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", icon: "text-amber-950" };
    if (xp >= 75) return { container: "bg-slate-300 text-slate-800 border-b-[4px] border-slate-400", icon: "text-slate-700" };
    if (xp >= 60) return { container: "bg-orange-700 text-white border-b-[4px] border-orange-900", icon: "text-orange-200" };
    return { container: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400 dark:text-slate-500" };
  };

  const trophy = getTrophyStyles(unitXP);

  const checkIsEmpty = (taskId) => {
    if (taskId === 'NOTES' && (!unit.notes || !Array.isArray(unit.notes) || unit.notes.length === 0)) return true;
    if (taskId === 'WORKBOOK' && (!unit.workbook || unit.workbook.length === 0)) return true;
    if (taskId === 'GAMES' && (!unit.games || unit.games.length === 0)) return true;
    if (taskId === 'ASSESSMENT' && (!unit.assessment || !unit.assessment.questions || unit.assessment.questions.length === 0)) return true;
    return false;
  };

  // 2. Dynamically compile Needs Work
  const allTasks = [];
  unitPhases.forEach(phase => {
    const isPhaseLocked = unitXP < phase.threshold;
    (phase.tasks || []).forEach(task => {
      allTasks.push({ ...task, locked: isPhaseLocked });
    });
  });

  const needsWorkTasks = allTasks.filter(t => {
    if (t.id === 'GAMES') return false; 
    if (t.locked) return false;
    if (checkIsEmpty(t.id)) return false;
    
    const current = scores[t.dbKey]?.current || 0;
    return current < t.maxXP; 
  }).slice(0, 3); 

  const showNeedsWork = needsWork && needsWorkTasks.length > 0;

  const renderTaskButton = (task, isLocked = false) => {
    const config = TaskUIConfig[task.id];
    if (!config) return null;
    
    const TaskIcon = config.icon;
    const isEmpty = checkIsEmpty(task.id);
    const rawScore = scores[task.dbKey]?.current || 0;
    const taskScore = Math.min(rawScore, task.maxXP);

    if (isEmpty) {
      return (
        <div key={task.id} className="relative flex flex-col items-center justify-center p-5 rounded-[1.5rem] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 w-full h-36 opacity-70">
          <TaskIcon className="w-8 h-8 mb-2 opacity-40" strokeWidth={2} />
          <h4 className="font-bold text-xs tracking-widest uppercase">No {config.label}</h4>
        </div>
      );
    }

    return (
      <button 
        key={task.id}
        disabled={isLocked}
        onClick={() => startMode(unit.id, task.id)} 
        className={`relative flex flex-col items-center justify-between p-4 rounded-[1.5rem] transition-all duration-200 w-full h-36
          ${isLocked 
            ? `${config.bg} border-b-[6px] ${config.border} ${config.text} opacity-80 cursor-not-allowed saturate-[0.85]` 
            : `${config.bg} border-b-[6px] ${config.border} ${config.text} hover:brightness-110 active:border-b-0 active:translate-y-[6px] cursor-pointer`
          }`}
      >
        {isLocked && <Lock className="absolute top-4 right-4 w-5 h-5 text-white/80 drop-shadow-sm" strokeWidth={3} />}
        <div className="flex flex-col items-center mt-1">
          <TaskIcon className="w-8 h-8 mb-2 drop-shadow-sm" strokeWidth={2.5} />
          <h4 className="font-black text-lg tracking-wide drop-shadow-sm">
            {config.label}
          </h4>
        </div>
        
        <div className="w-full bg-black/15 rounded-xl py-1.5 mt-auto flex items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/90">
            {taskScore} / {task.maxXP} XP
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className={`relative w-full rounded-[2.5rem] mb-8 transition-all duration-300 z-10 hover:z-50
      ${unitXP === 100 ? 'bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 p-[3px] pb-[8px] shadow-lg shadow-fuchsia-500/20' : ''}
      ${showNeedsWork && unitXP !== 100 ? 'shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'shadow-sm'}
    `}>
      
      <div className={`w-full bg-white dark:bg-slate-900 transition-all duration-300 relative
        ${unitXP === 100 ? 'rounded-[2.35rem] h-full overflow-hidden' : 'rounded-[2.5rem] border-2 border-b-[8px] hover:border-slate-300 dark:hover:border-slate-700'}
        ${unitXP >= 90 && unitXP < 100 ? 'border-amber-400 dark:border-amber-500 hover:border-amber-500 dark:hover:border-amber-400' : ''}
        ${unitXP >= 75 && unitXP < 90 ? 'border-slate-400 dark:border-slate-500 hover:border-slate-500 dark:hover:border-slate-400' : ''}
        ${unitXP >= 60 && unitXP < 75 ? 'border-orange-700 dark:border-orange-900 hover:border-orange-800 dark:hover:border-orange-800' : ''}
        ${unitXP < 60 && unitXP !== 100 ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : ''}
      `}>
        
        <div onClick={onToggle} className={`p-6 sm:p-8 relative group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer`}>
          
          <div className="relative z-10 flex items-center w-full md:w-auto">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] ${unitThemeColor} group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 flex-shrink-0`}>
              <HeaderIcon className={`w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm`} strokeWidth={2.5} />
            </div>
            
            <div className="ml-4 sm:ml-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 flex items-center flex-wrap gap-3 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                {title || 'Unit Title'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-base tracking-wide">{description || 'Complete the tasks below.'}</p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-4 self-end md:self-auto w-full md:w-auto justify-end md:justify-start mt-4 md:mt-0">
            
            <div className="flex flex-col items-center gap-2 relative z-50">
              <div className="relative flex items-center justify-center">
                {trophy.aura && <div className={trophy.aura}></div>}
                <div className={`relative z-10 flex items-center justify-center px-4 py-2 rounded-xl transition-all shadow-sm font-black ${trophy.container}`}>
                  <Trophy className={`w-5 h-5 mr-2 ${trophy.icon}`} strokeWidth={2.5} />
                  <span className="text-xl tracking-tight">{unitXP}</span>
                </div>
              </div>

              {showNeedsWork && (
                <div className="relative group/badge">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 rounded-full text-[10px] uppercase tracking-widest border border-rose-300/50 dark:border-rose-700/50 shadow-sm cursor-help transition-all group-hover/badge:bg-rose-200 dark:group-hover/badge:bg-rose-800/50">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    Needs Work
                  </span>

                  <div className="absolute top-full right-1/2 translate-x-1/2 mt-3 w-[13rem] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-700 p-3 opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 scale-95 group-hover/badge:scale-100 pointer-events-none z-[100]">
                    <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-slate-200 dark:border-b-slate-700">
                      <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-white dark:border-b-slate-800"></div>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1 text-center">Tasks to attempt</p>
                    <div className="space-y-2">
                      {needsWorkTasks.map(t => {
                        const config = TaskUIConfig[t.id];
                        const Icon = config.icon;
                        return (
                          <div key={t.id} className="flex items-center p-2 rounded-xl border-b-2 border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${config.bg} ${config.text} border-b-[3px] ${config.border} mr-2.5 shrink-0`}>
                              <Icon className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate tracking-wide">{config.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`flex w-10 h-10 sm:w-14 sm:h-14 rounded-full items-center justify-center border-2 shadow-sm transition-all duration-300 border-b-[4px]
              ${isExpanded 
                ? 'bg-[#1cb0f6] border-[#1899d6] text-white translate-x-0 opacity-100'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 sm:translate-x-4 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-hover:bg-[#1cb0f6] sm:group-hover:border-[#1899d6] sm:group-hover:text-white'
              }`}>
              {isExpanded ? <ChevronUp className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={3} /> : <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={3} />}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-4 duration-300 border-t-2 border-slate-100 dark:border-slate-800 pb-4">
            {isAILocked && (
              <div className="mx-6 sm:mx-8 mt-8 bg-rose-100 dark:bg-rose-900/40 border-2 border-rose-300 dark:border-rose-800 p-4 rounded-[1.5rem] flex items-start shadow-sm">
                <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-rose-800 dark:text-rose-300">AI Safety Lock Engaged</h4>
                  <p className="text-rose-600 dark:text-rose-400 text-sm font-bold mt-1">Due to repeated inappropriate inputs, AI grading has been disabled for this unit.</p>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-10">
              {/* 3. Dynamically Loop Over Phases */}
              {unitPhases.map(phase => {
                const isPhaseLocked = unitXP < phase.threshold;
                
                return (
                  <div key={phase.id} className="relative group">
                    {/* Locking Overlay */}
                    {isPhaseLocked && (
                      <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem] transition-all duration-300 border-2 border-dashed border-slate-300 dark:border-slate-700">
                        <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-lg border-2 border-slate-200 dark:border-slate-700 flex items-center transform transition-transform group-hover:scale-105">
                           <Lock className="w-5 h-5 text-slate-400 mr-3" strokeWidth={2.5} />
                          <span className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">Earn {phase.threshold} XP to unlock</span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`transition-all ${isPhaseLocked ? 'pointer-events-none opacity-50' : ''}`}>
                      <div className="mb-4 flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-2">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{phase.title}</h3>
                        {phase.threshold > 0 && (
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{phase.threshold} XP to Unlock</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {phase.tasks.map(task => renderTaskButton(task, isPhaseLocked))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}