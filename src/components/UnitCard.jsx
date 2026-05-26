import React from 'react';
import { 
  Languages, Keyboard, BookOpen, Headphones, FileText, 
  Image as ImageIcon, Lock, Award, AlertCircle, 
  ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil
} from 'lucide-react';

const IconMap = {
  "Award": Award,
  "GraduationCap": Award,
  "BookOpen": BookOpen
};

const TaskUIConfig = {
  "WORD_REC":      { label: "Vocab", icon: Languages, bg: "bg-[#58cc02]", border: "border-[#58a700]", text: "text-[#58cc02]" },
  "NOTES":         { label: "Notes", icon: FileText, bg: "bg-[#94a3b8]", border: "border-[#64748b]", text: "text-[#94a3b8]" },
  "WORKBOOK":      { label: "Extra", icon: FileBox, bg: "bg-[#ec4899]", border: "border-[#be185d]", text: "text-[#ec4899]" },
  
  "SPELLING":      { label: "Spelling", icon: Keyboard, bg: "bg-[#1cb0f6]", border: "border-[#1899d6]", text: "text-[#1cb0f6]" },
  "READ_COMP":     { label: "Reading", icon: BookOpen, bg: "bg-[#ff9600]", border: "border-[#cc7800]", text: "text-[#ff9600]" },
  "DICTATION":     { label: "Listening", icon: Headphones, bg: "bg-[#ce82ff]", border: "border-[#a567cc]", text: "text-[#ce82ff]" },
  
  "SHORT_ANSWERS": { label: "Questions", icon: HelpCircle, bg: "bg-[#ffc800]", border: "border-[#cca000]", text: "text-[#ffc800]" },
  "DIAGRAMS":      { label: "Diagram", icon: ImageIcon, bg: "bg-[#ff4b4b]", border: "border-[#cc3c3c]", text: "text-[#ff4b4b]" },
  "ESSAY":         { label: "Essay", icon: Pencil, bg: "bg-[#14b8a6]", border: "border-[#0d9488]", text: "text-[#14b8a6]" },
  
  "ASSESSMENT":    { label: "Assessment", icon: ClipboardCheck, bg: "bg-[#2563eb]", border: "border-[#1d4ed8]", text: "text-[#2563eb]" },
  "GAMES":         { label: "Game", icon: Gamepad2, bg: "bg-[#6366f1]", border: "border-[#4f46e5]", text: "text-[#6366f1]" }
};

const getMaxXP = (taskId) => {
  if (['WORD_REC', 'NOTES', 'WORKBOOK'].includes(taskId)) return 5;
  if (['SHORT_ANSWERS', 'DIAGRAMS', 'ESSAY'].includes(taskId)) return 20;
  return 10;
};

const getDbKeyMax = (dbKey) => {
  if (['p1', 'p10', 'p11'].includes(dbKey)) return 5;
  if (['p6', 'p7', 'p8'].includes(dbKey)) return 20;
  return 10;
};

export default function UnitCard({ unit, scores = {}, currentTheme, startMode }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;

  const phases = {
    resources: [
      { id: "NOTES", dbKey: "p10" },
      { id: "WORD_REC", dbKey: "p1" },
      { id: "WORKBOOK", dbKey: "p11" }
    ],
    practice: [
      { id: "SPELLING", dbKey: "p2" },
      { id: "READ_COMP", dbKey: "p4" },
      { id: "DICTATION", dbKey: "p3" }
    ],
    application: [
      { id: "SHORT_ANSWERS", dbKey: "p6" },
      { id: "DIAGRAMS", dbKey: "p7" },
      { id: "ESSAY", dbKey: "p8" }
    ],
    mastery: [
      { id: "ASSESSMENT", dbKey: "p9" },
      { id: "GAMES", dbKey: "p12" }
    ]
  };

  // Strictly enforce max boundaries on read calculation
  const unitXP = Object.entries(scores)
    .filter(([key]) => key !== 'strikes')
    .reduce((sum, [key, val]) => sum + Math.min(val?.current || 0, getDbKeyMax(key)), 0);

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  const thresholds = unit.meta?.thresholds || { p1: 10, p2: 30, p3: 60 };
  const practiceLocked = unitXP < (thresholds.p1 || 0); 
  const applicationLocked = unitXP < (thresholds.p2 || 30);
  const masteryLocked = unitXP < (thresholds.p3 || 60);

  let trophyStyle = "bg-orange-50 text-orange-800 border-orange-200"; 
  if (unitXP > 100) {
    trophyStyle = "bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 text-white border-transparent shadow-[0_0_25px_rgba(250,204,21,0.8)] animate-pulse";
  } else if (unitXP === 100) {
    trophyStyle = "bg-yellow-400 text-yellow-900 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-pulse";
  } else if (unitXP >= 50) {
    trophyStyle = "bg-slate-200 text-slate-800 border-slate-300 shadow-sm";
  }

  const checkIsEmpty = (taskId) => {
    if (taskId === 'NOTES' && (!unit.notes || !Array.isArray(unit.notes) || unit.notes.length === 0)) return true;
    if (taskId === 'WORKBOOK' && (!unit.workbook || unit.workbook.length === 0)) return true;
    if (taskId === 'GAMES' && (!unit.games || unit.games.length === 0)) return true;
    if (taskId === 'ASSESSMENT' && (!unit.assessment || !unit.assessment.questions || unit.assessment.questions.length === 0)) return true;
    return false;
  };

  const renderTaskButton = (task, isLocked = false) => {
    const config = TaskUIConfig[task.id];
    if (!config) return null;
    
    const TaskIcon = config.icon;
    const isEmpty = checkIsEmpty(task.id);
    
    const maxTaskXP = getMaxXP(task.id);
    const rawScore = scores[task.dbKey]?.current || 0;
    const taskScore = Math.min(rawScore, maxTaskXP);

    if (isEmpty) {
      return (
        <div key={task.id} className="relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[3px] border-dashed border-slate-200 bg-slate-50 text-slate-400 w-full h-36 sm:h-44 opacity-70 transition-all hover:opacity-90">
          <TaskIcon className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 opacity-40 ${config.text}`} strokeWidth={2} />
          <h4 className="font-black text-sm sm:text-base tracking-wide leading-tight text-center px-2">
            No {config.label}
          </h4>
        </div>
      );
    }

    return (
      <button 
        key={task.id}
        disabled={isLocked}
        onClick={() => startMode(unit.id, task.id)} 
        className={`relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-b-[6px] transition-all text-white w-full h-36 sm:h-44 shadow-sm hover:shadow-md
          ${isLocked 
            ? 'bg-slate-200 border-slate-300 opacity-60 cursor-not-allowed grayscale' 
            : `${config.bg} ${config.border} active:border-b-0 active:translate-y-[6px] hover:brightness-110 cursor-pointer`
          }`}
      >
        <div className="flex flex-col items-center mt-1 sm:mt-2">
          {isLocked ? <Lock className="w-8 h-8 sm:w-10 sm:h-10 mb-2 opacity-80" /> : <TaskIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 drop-shadow-sm" strokeWidth={2.5} />}
          <h4 className="font-black text-lg sm:text-xl tracking-wide leading-tight drop-shadow-sm">
            {config.label}
          </h4>
        </div>
        
        <div className="w-full bg-black/15 rounded-xl py-1.5 sm:py-2 mt-auto flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-95">
            {taskScore} / {maxTaskXP} XP
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-2xl">
      
      <div className={`p-6 sm:p-8 bg-gradient-to-br ${currentTheme.banner} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="p-4 bg-white/20 rounded-2xl mr-5 backdrop-blur-md text-white border border-white/30 shadow-sm flex-shrink-0">
              <HeaderIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">{title || 'Unit Title'}</h2>
              <p className="text-white/80 font-medium text-sm sm:text-base mt-1 max-w-xl drop-shadow-sm">{description || 'Complete the tasks below.'}</p>
            </div>
          </div>
          <div className={`flex flex-col items-center justify-center px-6 py-3 rounded-2xl border-2 shadow-sm flex-shrink-0 min-w-[120px] backdrop-blur-sm ${trophyStyle}`}>
            <span className="text-xs font-black uppercase tracking-widest opacity-80 mb-0.5">Total XP</span>
            <span className="text-2xl sm:text-3xl font-black">{unitXP}</span>
          </div>
        </div>
      </div>

      {isAILocked && (
        <div className="bg-rose-50 border-b border-rose-200 p-4 flex items-start animate-in slide-in-from-top-2">
          <AlertCircle className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-800">AI Safety Lock Engaged</h4>
            <p className="text-rose-600 text-sm font-medium">Due to repeated inappropriate inputs, AI grading has been disabled for this unit.</p>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-10">
        
        <div>
          <div className="flex items-center mb-5 border-b-2 border-slate-100 pb-2">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Resources</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {phases.resources.map(task => renderTaskButton(task, false))}
          </div>
        </div>

        <div className="relative">
          {practiceLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Earn {thresholds.p1} XP to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${practiceLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-end mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 1: Practice</h3>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{thresholds.p2} XP to Unlock Phase 2</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.practice.map(task => renderTaskButton(task, practiceLocked))}
            </div>
          </div>
        </div>

        <div className="relative">
          {applicationLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Earn {thresholds.p2} XP in Phase 1 to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${applicationLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-end mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 2: Understanding</h3>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{thresholds.p3} XP to Unlock Mastery</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.application.map(task => renderTaskButton(task, applicationLocked))}
            </div>
          </div>
        </div>

        <div className="relative">
          {masteryLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Complete Phase 2 to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${masteryLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 3: Assessment</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.mastery.map(task => renderTaskButton(task, masteryLocked))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}