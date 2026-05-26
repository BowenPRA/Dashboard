This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/components/**/*, src/views/YearDashboard.jsx, src/hooks/**/*.js, src/utils/**/*.js, src/data/index.js, src/data/GED/ENG_1A/**/*.js, src/data/GED/English_1A.js, src/tasks/Assessment.jsx, src/tasks/Notes.jsx
- Files matching these patterns are excluded: public/audio/**/*, dist/**/*, build/**/*, node_modules/**/*, package-lock.json, yarn.lock, src/tasks/Recognition.jsx, src/tasks/Spell.jsx, src/tasks/Reading.jsx, src/tasks/Dictation.jsx, src/tasks/ShortAnswers.jsx, src/tasks/Essay.jsx, src/tasks/Diagrams.jsx, src/tasks/VocabWriting.jsx
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/components/Feedback.jsx
src/components/TopBar.jsx
src/components/UnitCard.jsx
src/data/GED/ENG_1A/assessment.js
src/data/GED/ENG_1A/data.js
src/data/GED/ENG_1A/games.js
src/data/GED/ENG_1A/notes.js
src/data/GED/ENG_1A/workbook.js
src/data/GED/English_1A.js
src/data/index.js
src/hooks/useStudentProgress.js
src/tasks/Assessment.jsx
src/tasks/Notes.jsx
src/utils/aiGrader.js
src/utils/sound.js
src/utils/supabaseClient.js
src/views/YearDashboard.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/Feedback.jsx">
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { playChime } from '../utils/sound';

export default function Feedback({ isCorrect, currentWord, isWordRecognition, track, onNext }) {
  const audioState = useRef({ isCancelled: false, currentAudio: null });
  const [btnCooldown, setBtnCooldown] = useState(false);
  const [enterActive, setEnterActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEnterActive(true), 400);
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && enterActive && !btnCooldown) {
        e.preventDefault(); 
        setBtnCooldown(true);
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handleKeyDown); };
  }, [onNext, enterActive, btnCooldown]);

  useEffect(() => {
    playChime(isCorrect ? 'correct' : 'incorrect');
    if (!currentWord?.isReal) return;

    const state = audioState.current;
    state.isCancelled = false;
    const basePath = import.meta.env.BASE_URL || '/';

    const aWord = new Audio(`${basePath}audio/${track}/word_${currentWord.word.toLowerCase()}.mp3`);
    const aDef = new Audio(`${basePath}audio/${track}/def_${currentWord.word.toLowerCase()}.mp3`);
    const aSent = new Audio(`${basePath}audio/${track}/sentence_${currentWord.word.toLowerCase()}.mp3`);

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve()); 
    });

    const playSequence = async () => {
      try {
        if (state.isCancelled) return;
        if (isWordRecognition) {
          await playAudioObj(aWord);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 300));
          if (state.isCancelled) return; await playAudioObj(aDef);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 400));
          if (state.isCancelled) return; await playAudioObj(aSent);
        } else {
          await playAudioObj(aSent);
        }
      } catch (err) { console.warn(`Spoken audio skipped for ${track}`); }
    };

    if (currentWord.isReal) playSequence();

    return () => {
      state.isCancelled = true;
      if (state.currentAudio) { state.currentAudio.pause(); state.currentAudio.currentTime = 0; }
    };
  }, [isCorrect, currentWord, isWordRecognition, track]);

  const handleManualAudio = () => {
    if (!currentWord?.isReal || btnCooldown) return;
    setBtnCooldown(true); setTimeout(() => setBtnCooldown(false), 500);
    if (audioState.current.currentAudio) { audioState.current.currentAudio.pause(); audioState.current.currentAudio.currentTime = 0; }
    const basePath = import.meta.env.BASE_URL || '/';
    const audio = new Audio(`${basePath}audio/${track}/sentence_${currentWord.word.toLowerCase()}.mp3`);
    audioState.current.currentAudio = audio;
    audio.play().catch(() => console.warn("Manual audio failed"));
  };

  const handleNextClick = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    onNext();
  };

  const bgClass = isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]';
  const textClass = isCorrect ? 'text-[#468500]' : 'text-[#C9362A]';
  const borderClass = isCorrect ? 'border-[#58A700]' : 'border-[#EA2B2B]';
  
  return (
    <div className={`fixed bottom-0 left-0 w-full ${bgClass} border-t-[6px] ${borderClass} p-6 md:p-8 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 w-full overflow-hidden">
          {currentWord?.isReal ? (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/5 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 w-full bg-white/50 p-5 md:p-6 rounded-[2rem] border border-white/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-black/5">
                  <div><h3 className="text-3xl font-black text-slate-800 capitalize">{currentWord.word}</h3><p className="text-xl font-bold text-slate-500 mt-1">{currentWord.vn}</p></div>
                  <button disabled={btnCooldown} onClick={handleManualAudio} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-70">
                    <Volume2 className="w-6 h-6 mr-2" /><span className="font-bold text-sm uppercase tracking-widest">Play Audio</span>
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-slate-800 leading-snug">{currentWord.def}</p>
                  <p className={`text-md font-medium mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>{currentWord.vnDef}</p>
                </div>
                <div className={`pt-4 border-t ${isCorrect ? 'border-[#58A700]/20' : 'border-[#EA2B2B]/20'}`}>
                  <span className={`font-black text-xs uppercase tracking-widest block mb-2 ${textClass}`}>Sample Sentence</span>
                  <p className="text-xl font-medium italic leading-relaxed text-slate-800">
                    {currentWord.sent.split(new RegExp(`(${currentWord.word})`, 'gi')).map((part, i) => part.toLowerCase() === currentWord.word.toLowerCase() ? <strong key={i} className={`px-1 rounded ${isCorrect ? 'bg-[#58A700]/20 text-[#3E7500]' : 'bg-[#EA2B2B]/20 text-[#A32D23]'}`}>{part}</strong> : part)}
                  </p>
                  <p className={`text-lg font-medium italic mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>"{currentWord.vnSent}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/4 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className={`flex-1 min-w-0 w-full p-5 md:p-6 rounded-[2rem] border shadow-sm ${isCorrect ? 'bg-white/50 border-[#58A700]/30' : 'bg-white/50 border-[#EA2B2B]/30'}`}>
                 <h3 className={`text-2xl font-black mb-2 ${isCorrect ? 'text-[#468500]' : 'text-[#C9362A]'}`}>{isCorrect ? "You spotted it!" : "Watch out!"}</h3>
                 <p className="text-xl font-medium text-slate-800 flex items-center"><span className="font-bold uppercase tracking-widest text-sm bg-white px-3 py-1 rounded-lg shadow-sm mr-3">Fake Word</span> <strong>{currentWord.word}</strong></p>
                 {currentWord?.imitating && (
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <p className="flex items-center text-lg text-slate-700 font-medium"><AlertCircle className="w-5 h-5 mr-2 text-slate-400" />This was trying to imitate: <strong className="ml-2 font-black text-xl text-slate-900">{currentWord.imitating}</strong></p>
                  </div>
                 )}
              </div>
            </div>
          )}
        </div>
        <button disabled={btnCooldown} onClick={handleNextClick} className={`w-full md:w-auto px-12 py-6 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all flex-shrink-0 border-b-[6px] active:border-b-0 active:translate-y-[6px] mt-2 md:mt-0 ${isCorrect ? 'bg-[#58A700] hover:bg-[#468500] border-[#468500]' : 'bg-[#EA2B2B] hover:bg-[#C9362A] border-[#C9362A]'} disabled:opacity-80`}>Continue</button>
      </div>
    </div>
  );
}
</file>

<file path="src/components/TopBar.jsx">
import React from 'react';
import { BookOpen, X as XIcon } from 'lucide-react';

export default function TopBar({ onQuit, current, total, progress, modeTitle }) {
  // Gracefully handle props from both the old app and the new app
  const displayScore = current !== undefined ? current : 0;
  const displayTotal = total !== undefined ? total : 0;
  const displayProgress = progress !== undefined ? progress : (displayTotal > 0 ? (displayScore / displayTotal) * 100 : 0);

  return (
    <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white shadow-sm z-20 relative h-16">
      
      <div className="flex items-center text-slate-700 font-bold text-lg w-1/4">
        <div className="flex items-center text-[#1CB0F6]">
          <BookOpen className="w-6 h-6 mr-2" />
          <span className="hidden sm:inline whitespace-nowrap">{modeTitle || 'Science Vocab'}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 mx-4 max-w-md hidden md:block">
        <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
          <div 
            className="bg-[#58A700] h-full transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-1/4 min-w-[140px]">
        {/* Fraction Score Visual */}
        {displayTotal > 0 && (
          <div className="flex items-center space-x-1.5 font-black text-sm px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 uppercase tracking-widest mr-4">
            <span className="text-[#58A700]">{displayScore}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{displayTotal}</span>
          </div>
        )}

        <button 
          onClick={onQuit} 
          className="flex items-center text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-wider transition-colors active:scale-95"
          title="Save & Quit"
        >
          <span className="hidden sm:inline mr-1">Quit</span>
          <XIcon className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/components/UnitCard.jsx">
import React from 'react';
import { 
  Search, Keyboard, BookOpen, Headphones, FileText, 
  Image as ImageIcon, Lock, Award, AlertCircle, 
  ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil
} from 'lucide-react';

const IconMap = {
  "Award": Award,
  "GraduationCap": Award,
  "BookOpen": BookOpen
};

const TaskUIConfig = {
  "WORD_REC":      { label: "Vocab", icon: Search, bg: "bg-[#58cc02]", border: "border-[#58a700]", text: "text-[#58cc02]" },
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

export default function UnitCard({ unit, scores = {}, currentTheme, startMode }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;

  const phases = {
    resources: [
      { id: "WORD_REC", dbKey: "p1" },
      { id: "NOTES", dbKey: "p10" },
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

  const unitXP = Object.entries(scores)
    .filter(([key]) => key !== 'strikes')
    .reduce((sum, [_, val]) => sum + (val?.current || 0), 0);

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  const thresholds = unit.meta?.thresholds || { p1: 10, p2: 30, p3: 60 };
  const practiceLocked = unitXP < (thresholds.p1 || 0); 
  const applicationLocked = unitXP < (thresholds.p2 || 30);
  const masteryLocked = unitXP < (thresholds.p3 || 60);

  let trophyStyle = "bg-orange-50 text-orange-800 border-orange-200"; 
  if (unitXP >= 100) {
    trophyStyle = "bg-yellow-400 text-yellow-900 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-pulse";
  } else if (unitXP >= 50) {
    trophyStyle = "bg-slate-200 text-slate-800 border-slate-300 shadow-sm";
  }

  // DEFENSIVE PROGRAMMING: Robust empty state checking to prevent crashes deeper in the app
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
    const taskScore = scores[task.dbKey]?.current || 0;

    // Render Dotted Empty State for missing data
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
            BEST: {taskScore}/10
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-2xl">
      
      {/* Unit Header - Glassmorphism */}
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
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 2</h3>
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
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 3</h3>
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
</file>

<file path="src/data/GED/ENG_1A/assessment.js">
// src/data/GED/ENG_1A/assessment.js
export const assessment = {
  timeLimit: 2700, 
  passages: [
    {
      id: "p1_gardens",
      title: "The Case for Community Gardens",
      meta: "Editorial: City Planning Board Review",
      text: [
        "A community garden is a shared space where people come together to grow food and plants. This is an indisputable fact. Currently, the Riverton City Council is debating whether to turn the empty lot on 4th Street into a community garden or a commercial shopping mall. While some argue that commercial development brings immediate tax revenue, building a shopping mall on our last remaining green space is incredibly shortsighted.",
        "The primary purpose of our town should be to foster a healthy, connected community, not just generate cold, hard cash. Numerous academic studies have shown that access to green spaces significantly reduces neighborhood stress levels and lowers local crime rates. Therefore, the claim that we must build a mall to improve our town's quality of life is completely false. We need the garden to ensure a better future for our children."
      ],
      glossary: {
        "fact": { "def": "A statement that can be proven true or false.", "vn": "Sự thật", "vnDef": "Một tuyên bố có thể được chứng minh là đúng hay sai." },
        "purpose": { "def": "The reason an author writes or an action is done.", "vn": "Mục đích", "vnDef": "Lý do tác giả viết hoặc một hành động được thực hiện." },
        "claim": { "def": "The main argument a writer is trying to defend.", "vn": "Luận điểm", "vnDef": "Lập luận chính mà người viết đang cố gắng bảo vệ." }
      }
    },
    {
      id: "p_hist_1898",
      title: "Historical Opinion: The Eight-Hour Workday",
      meta: "Adapted from an 1898 address by labor leader Unionist Thomas O'Donnell",
      text: [
        "For decades, the American industrial worker has been treated as little more than an extension of the iron machinery he operates. We hear from the captains of industry that to shorten the workday from twelve hours to eight would invite economic ruin, decrease national productivity, and encourage idleness among the working classes. I stand before you today to argue that this claim is not only false, but it also ignores the fundamental laws of human nature and economic progress.",
        "First, let us examine the argument of productivity. A exhausted man is not an efficient man. When a laborer is forced to toil for twelve hours in a dark, poorly ventilated factory, his physical strength wanes long before his shift concludes. The work performed in the final four hours of a twelve-hour day is marked by fatigue, leading to frequent errors, ruined materials, and tragic, preventable workplace accidents. By limiting the workday to eight hours, we restore the worker’s vitality. A rested worker is alert, precise, and highly motivated. Historical evidence from factories that have voluntarily adopted the eight-hour standard reveals that total daily output does not decrease; rather, it often increases due to the heightened efficiency and focus of the workforce.",
        "Second, we must consider the moral and social dimensions of this issue. Opponents of our movement argue that additional leisure hours will lead workers to vice and degradation. What a cynical view of the American citizen! When a man is worked to the point of utter exhaustion, he has no time or energy remaining to cultivate his mind, care for his children, or participate in the civic life of his community. He is reduced to a state of mere survival. Give the worker eight hours for work, eight hours for rest, and eight hours for what he wills. With those eight hours of personal time, the worker will seek education, enjoy his family, and become a more informed, responsible participant in our democracy.",
        "The wealth of our nation should not be measured solely by the bank accounts of our monopolists, but by the health, intelligence, and dignity of our producing classes. The eight-hour day is not a plea for charity; it is a demand for justice and a necessary step toward a stronger, more prosperous republic."
      ]
    },
    {
      id: "p_handwriting",
      title: "The Decline of Handwriting",
      meta: "Contemporary Opinion Piece",
      text: [
        "In an era dominated by touchscreens and voice-to-text technology, the traditional art of handwriting is quietly facing extinction. Across the nation, school districts are dropping cursive from their mandatory curricula, and keyboard proficiency has taken center stage. While efficiency advocates celebrate this shift as a victory for modernization, we are sacrificing a profound cognitive tool in our rush to embrace the digital future.",
        "The primary argument for abandoning handwriting is speed. Proponents of digital-first education argue that typing allows students to capture information much faster than writing by hand ever could. This is undoubtedly true, but it confuses transcription with comprehension. When students type lecture notes on a laptop, they tend to record the speaker's words verbatim without processing their meaning. The laptop becomes a recording device, bypassing the brain.",
        "In contrast, writing by hand is a slower, more deliberate process. Because we cannot write as fast as someone speaks, our brains are forced to summarize, synthesize, and prioritize information in real-time. We must actively decide what is important enough to commit to paper. Neurological studies have consistently shown that the physical act of forming letters activates unique neural pathways linked to memory retention and critical thinking. Students who take notes by hand demonstrate a significantly deeper conceptual understanding of the material than those who type.",
        "Furthermore, handwriting is a deeply personal expression of identity. A typed font is uniform, sterile, and anonymous; it carries no trace of the writer’s physical presence or emotional state. A handwritten letter, however, possesses a unique signature style, capturing a moment in time and a physical connection between sender and receiver.",
        "By relegating handwriting to a relic of history, we are not just changing our medium of communication—we are weakening our cognitive capacities and sanitizing our personal interactions. Efficiency should not be the sole metric of educational progress. We must ensure that our classrooms continue to make space for the pen, even in a world ruled by the keyboard."
      ]
    },
    {
      id: "p_videogames",
      title: "The Educational Value of Video Games",
      meta: "Contemporary Opinion Article",
      text: [
        "For decades, the public narrative surrounding video games has been overwhelmingly negative. Critics routinely accuse them of encouraging violence, promoting social isolation, and rotting the brains of youth. However, this reactionary stance ignores a growing body of scientific research and educational theory. Far from being a mindless distraction, video games are actually one of the most powerful and effective tools we have for developing complex, 21st-century cognitive skills.",
        "To understand why video games are beneficial, one must compare them to more passive forms of media, such as television or film. When a child watches a movie, they are a consumer of a pre-determined story. They sit back, observe, and accept the narrative. When a child plays a video game, however, they are an active agent. The game does not progress unless the player makes decisions, solves puzzles, and reacts to changing circumstances.",
        "Most modern video games are, at their core, complex exercises in systemic problem-solving. In strategy and role-playing games, players must manage scarce resources, anticipate long-term consequences of their choices, and adapt to unpredictable environments. When a player fails to complete a level, they do not simply quit; they analyze what went wrong, formulate a new hypothesis, and try again. This iterative cycle of trial, failure, and adaptation is the exact foundation of the scientific method.",
        "Additionally, the rise of multiplayer online games has transformed gaming into a highly collaborative, social activity. To succeed in cooperative games, players must communicate effectively, delegate tasks based on individual strengths, and negotiate conflicts under pressure. These are the precise 'soft skills' that modern employers desperately seek in the workplace.",
        "While moderation is certainly necessary—as it is with any activity—the outright demonization of video games is outdated and counterproductive. Instead of treating gaming as an enemy of education, parents and educators should learn to leverage its interactive power to prepare youth for a highly complex, digital world."
      ]
    },
    {
      id: "p_fiction_marcus",
      title: "Starting Over",
      meta: "Literary Narrative (Fiction)",
      text: [
        "The fluorescent lights of the community college hallway hummed with a low, persistent buzz that matched the anxious vibration in Marcus’s chest. At thirty-five, he felt like a giant occupying a world built for people ten years younger. He adjusted the strap of his backpack, which felt ridiculously heavy, stuffed with a pristine college algebra textbook and a brand-new spiral notebook.",
        "Twelve years ago, Marcus had walked away from a half-finished degree to support his family, taking a job at the local packaging plant. For a decade, the rhythm of the assembly line had been his life—predictable, physical, and secure. But when the plant automated its main line last winter, Marcus found himself staring at a severance package and an uncertain future. He had made a choice: it was time to finish what he started and pivot to computer science.",
        "Now, standing outside Room 204 for his first programming lab, doubt crept in like a cold draft. Through the door's glass pane, he saw clusters of students laughing, their fingers flying across smartphone screens with effortless ease. They looked like natives of this digital landscape; Marcus felt like an explorer who had lost his map.",
        "\"First day jitters?\"",
        "Marcus turned to see an older woman with a kind face and a silver streak in her dark hair. She was carrying a worn laptop bag.",
        "\"Is it that obvious?\" Marcus managed a weak smile.",
        "\"I’ve taught this class for fifteen years, Marcus—it's Marcus, right?\" she asked, glancing at her roster. He nodded. \"The career changers always stand outside the door the longest. I'm Professor Vance.\"",
        "\"I just feel like I'm starting a mile behind everyone else in there,\" Marcus admitted, gesturing toward the younger students. \"They grew up with these machines.\"",
        "Professor Vance smiled, her eyes crinkling. \"They grew up using them, yes. But that doesn't mean they know how they work. Coding isn't about how fast you can type or how many apps you use. It’s about logic, patience, and solving puzzles. If you can survive a decade of troubleshooting mechanical errors on a factory floor, you have exactly the kind of grit this class requires. Don't underestimate the value of your mileage.\"",
        "She gave him a reassuring pat on the shoulder and opened the door. Marcus took a deep breath, letting her words sink in. He looked down at his calloused hands—hands that knew how to fix things, hands that knew how to work hard. He walked into the classroom and took a seat right in the front row."
      ]
    }
  ],
  questions: [
    {
      id: "q1_gardens_mcq",
      passageId: "p1_gardens",
      type: "mcq",
      title: "1. What is the author's primary purpose in writing this editorial?",
      options: [
        { val: "A", text: "A. To inform residents about how to grow their own food." },
        { val: "B", text: "B. To persuade the City Council to choose the community garden over the shopping mall." },
        { val: "C", text: "C. To entertain readers with a story about an empty lot." },
        { val: "D", text: "D. To explain the financial benefits of commercial development." }
      ],
      correct: "B",
      expEn: "The author uses persuasive language ('incredibly shortsighted', 'completely false') to convince the reader and the council that building a garden is better than building a mall.",
      expVn: "Tác giả sử dụng ngôn ngữ mang tính thuyết phục ('tầm nhìn vô cùng hạn hẹp', 'hoàn toàn sai lầm') để thuyết phục người đọc và hội đồng rằng việc xây dựng một khu vườn tốt hơn so với xây dựng một trung tâm mua sắm."
    },
    {
      id: "q2_gardens_dnd",
      passageId: "p1_gardens",
      type: "dnd",
      title: "2. Drag and drop the statements from the text into the correct categories (Fact vs. Opinion).",
      options: [],
      bank: [
        { val: "A", text: "A community garden is a shared space to grow food." },
        { val: "B", text: "Building a shopping mall is incredibly shortsighted." },
        { val: "C", text: "The primary purpose of our town should be to foster a connected community." },
        { val: "D", text: "Studies show green spaces reduce stress and crime rates." }
      ],
      targets: [
        { id: "facts", title: "Objective Facts (Can be proven)" },
        { id: "opinions", title: "Personal Opinions (Beliefs or judgments)" }
      ],
      correctSets: {
        "facts": ["A", "D"],
        "opinions": ["B", "C"]
      },
      expEn: "Options A and D are facts because they can be objectively proven via definitions and studies. Options B and C are opinions because they rely on the author's personal values and judgments.",
      expVn: "Lựa chọn A và D là sự thật vì chúng có thể được chứng minh khách quan thông qua các định nghĩa và nghiên cứu. Lựa chọn B và C là ý kiến cá nhân vì chúng dựa trên những giá trị và phán xét cá nhân của tác giả."
    },
    {
      id: "q3_gardens_inline",
      passageId: "p1_gardens",
      type: "inline",
      title: "3. Grammar & Logic: Select the correct rhetorical terms to complete the analysis of the text.",
      options: [],
      textParts: [
        "In the editorial, the author's main ",
        " is that the town must build a community garden instead of a mall. To back up this argument, the author provides clear ",
        " by referencing academic studies about stress and crime rates. Finally, the author's overall ",
        " is highly critical of the commercial development plan, describing it as 'shortsighted'."
      ],
      blanks: {
        "1": {
          correct: "claim",
          options: [
            { val: "claim", text: "claim" },
            { val: "fact", text: "fact" },
            { val: "transition", text: "transition" }
          ]
        },
        "2": {
          correct: "evidence",
          options: [
            { val: "tone", text: "tone" },
            { val: "opinion", text: "opinion" },
            { val: "evidence", text: "evidence" }
          ]
        },
        "3": {
          correct: "tone",
          options: [
            { val: "purpose", text: "purpose" },
            { val: "tone", text: "tone" },
            { val: "analyze", text: "analyze" }
          ]
        }
      },
      expEn: "The 'claim' is the main argument. The academic studies serve as the 'evidence' to prove that claim. The critical emotional attitude of the writer represents the 'tone'.",
      expVn: "'Claim' (luận điểm) là lập luận chính. Các nghiên cứu học thuật đóng vai trò là 'evidence' (bằng chứng) để chứng minh luận điểm đó. Thái độ cảm xúc chỉ trích của người viết thể hiện 'tone' (giọng điệu)."
    },
    {
      id: "q_hist_1",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "4. Which of the following best states the main argument of the passage?",
      options: [
        { val: "A", text: "A. Factory owners should provide safer working conditions and higher wages." },
        { val: "B", text: "B. Reducing the workday to eight hours benefits both economic productivity and societal well-being." },
        { val: "C", text: "C. The American government must intervene to break up monopolies in the manufacturing sector." },
        { val: "D", text: "D. Workers who labor for twelve hours are more prone to moral vice than those who work eight hours." }
      ],
      correct: "B",
      expEn: "The author argues that reducing the workday to eight hours will increase factory productivity (by reducing fatigue and errors) and improve societal well-being (by allowing workers time to rest, learn, and engage in democracy).",
      expVn: "Tác giả lập luận rằng việc giảm ngày làm việc xuống còn tám giờ sẽ làm tăng năng suất nhà máy (bằng cách giảm mệt mỏi và sai sót) và cải thiện phúc lợi xã hội (bằng cách cho phép công nhân có thời gian nghỉ ngơi, học tập và tham gia vào nền dân chủ)."
    },
    {
      id: "q_hist_2",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "5. How does the author counter the claim that shorter workdays lead to economic ruin?",
      options: [
        { val: "A", text: "A. By arguing that factory owners can afford to lose money." },
        { val: "B", text: "B. By pointing out that a rested worker is more productive and makes fewer costly mistakes." },
        { val: "C", text: "C. By suggesting that the government subsidize factories that adopt the eight-hour day." },
        { val: "D", text: "D. By demonstrating that consumers are willing to pay higher prices for goods." }
      ],
      correct: "B",
      expEn: "In the second paragraph, the author argues that exhausted workers make mistakes and ruin materials, and that a rested worker is more alert and efficient, keeping total daily output high.",
      expVn: "Trong đoạn thứ hai, tác giả lập luận rằng những công nhân kiệt sức thường mắc sai lầm, và một công nhân được nghỉ ngơi sẽ tỉnh táo và hiệu quả hơn, giúp giữ sản lượng tổng thể hàng ngày ở mức cao."
    },
    {
      id: "q_hist_3",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "6. As used in the third paragraph, what does the word \"cultivate\" most nearly mean?",
      options: [
        { val: "A", text: "A. To harvest or farm" },
        { val: "B", text: "B. To restrict or limit" },
        { val: "C", text: "C. To develop or improve" },
        { val: "D", text: "D. To ignore or neglect" }
      ],
      correct: "C",
      expEn: "In this context, to 'cultivate his mind' means to develop or improve his intellect through education and thought.",
      expVn: "Trong ngữ cảnh này, 'cultivate his mind' (trau dồi trí tuệ) có nghĩa là phát triển hoặc cải thiện trí tuệ thông qua giáo dục và suy nghĩ."
    },
    {
      id: "q_hw_1",
      passageId: "p_handwriting",
      type: "mcq",
      title: "7. What is the author’s primary purpose in writing this piece?",
      options: [
        { val: "A", text: "A. To persuade school districts to completely ban laptops and tablets in classrooms." },
        { val: "B", text: "B. To argue that handwriting offers cognitive and personal benefits that typing cannot replicate." },
        { val: "C", text: "C. To explain the scientific process of how the brain stores memories during typing." },
        { val: "D", text: "D. To demonstrate that typing speeds are vastly superior to handwriting speeds." }
      ],
      correct: "B",
      expEn: "The author is advocating for the preservation of handwriting, arguing that it has cognitive benefits (like better memory retention) and personal values that typing lacks.",
      expVn: "Tác giả đang ủng hộ việc duy trì chữ viết tay, lập luận rằng nó mang lại những lợi ích nhận thức (như ghi nhớ tốt hơn) và những giá trị cá nhân mà việc đánh máy không có."
    },
    {
      id: "q_hw_2",
      passageId: "p_handwriting",
      type: "mcq",
      title: "8. Which piece of evidence does the author use to support the claim that handwriting improves memory retention?",
      options: [
        { val: "A", text: "A. Surveys showing that teachers prefer graded handwritten essays over printed ones." },
        { val: "B", text: "B. Brain scans showing that forming letters activates neural pathways linked to critical thinking." },
        { val: "C", text: "C. Statistics comparing the graduation rates of schools with and without cursive programs." },
        { val: "D", text: "D. Anecdotes from historical figures who wrote their famous works by hand." }
      ],
      correct: "B",
      expEn: "The author cites 'neurological studies' showing that physical writing activates unique neural pathways linked to critical thinking and memory.",
      expVn: "Tác giả trích dẫn 'các nghiên cứu thần kinh học' cho thấy việc viết tay kích hoạt các đường dẫn thần kinh đặc biệt liên quan đến tư duy phản biện và trí nhớ."
    },
    {
      id: "q_hw_3",
      passageId: "p_handwriting",
      type: "mcq",
      title: "9. Why does the author mention that typed fonts are \"uniform, sterile, and anonymous\"?",
      options: [
        { val: "A", text: "A. To emphasize that typing is more professional than writing by hand." },
        { val: "B", text: "B. To criticize technology companies for not designing more creative fonts." },
        { val: "C", text: "C. To highlight the loss of individuality and personal connection associated with digital communication." },
        { val: "D", text: "D. To suggest that typing makes it easier to write plagiarized material undetected." }
      ],
      correct: "C",
      expEn: "The author uses these terms to contrast the cold, emotionless nature of typed text with the unique, expressive, and human nature of handwriting.",
      expVn: "Tác giả sử dụng các thuật ngữ này để đối chiếu bản chất vô cảm, lạnh lẽo của văn bản đánh máy với bản chất độc đáo, biểu cảm và đậm chất con người của chữ viết tay."
    },
    {
      id: "q_vg_1",
      passageId: "p_videogames",
      type: "mcq",
      title: "10. How does the author structure the argument in the second paragraph?",
      options: [
        { val: "A", text: "A. By presenting a chronological history of media consumption from television to video games." },
        { val: "B", text: "B. By comparing and contrasting the passive nature of watching television with the active nature of playing video games." },
        { val: "C", text: "C. By listing the negative physical side effects of excessive screen time." },
        { val: "D", text: "D. By citing expert testimony from pediatricians regarding media habits." }
      ],
      correct: "B",
      expEn: "The author compares and contrasts television (where the viewer sits back and passively consumes a story) with video games (where the player must be an active agent who makes decisions to progress).",
      expVn: "Tác giả so sánh và đối chiếu truyền hình (nơi người xem thụ động tiếp nhận câu chuyện) với trò chơi điện tử (nơi người chơi phải là một tác nhân chủ động đưa ra quyết định)."
    },
    {
      id: "q_vg_2",
      passageId: "p_videogames",
      type: "mcq",
      title: "11. According to the author, how does playing video games mimic the scientific method?",
      options: [
        { val: "A", text: "A. It requires players to memorize vast amounts of scientific data." },
        { val: "B", text: "B. It encourages players to work in isolated laboratory environments." },
        { val: "C", text: "C. It involves a cycle of testing a strategy, failing, analyzing the result, and trying a new approach." },
        { val: "D", text: "D. It forces players to write down their hypotheses before starting a new level." }
      ],
      correct: "C",
      expEn: "The third paragraph describes the gaming cycle of trying a strategy, failing, analyzing the failure, and trying again as the core foundation of the scientific method.",
      expVn: "Đoạn thứ ba mô tả chu kỳ chơi game: thử nghiệm chiến lược, thất bại, phân tích thất bại, và thử lại. Đây chính là nền tảng cốt lõi của phương pháp khoa học."
    },
    {
      id: "q_vg_3",
      passageId: "p_videogames",
      type: "mcq",
      title: "12. Which of the following assumptions does the author make about the reader?",
      options: [
        { val: "A", text: "A. The reader already believes that video games are highly educational." },
        { val: "B", text: "B. The reader is familiar with the negative stereotypes associated with video games." },
        { val: "C", text: "C. The reader prefers television over video games for entertainment." },
        { val: "D", text: "D. The reader is an employer looking to hire skilled tech workers." }
      ],
      correct: "B",
      expEn: "The author begins by stating, 'For decades, the public narrative surrounding video games has been overwhelmingly negative,' which assumes the reader is already familiar with these common stereotypes.",
      expVn: "Tác giả bắt đầu bằng cách khẳng định định kiến tiêu cực của công chúng về trò chơi điện tử đã tồn tại nhiều thập kỷ, điều này ngầm định rằng người đọc đã quen thuộc với những khuôn mẫu này."
    },
    {
      id: "q_fict_1",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "13. What is the primary conflict Marcus experiences in the story?",
      options: [
        { val: "A", text: "A. He is struggling to pass a difficult college algebra exam." },
        { val: "B", text: "B. He feels out of place and insecure about returning to school as an older student." },
        { val: "C", text: "C. He cannot afford the tuition fees for his computer science program." },
        { val: "D", text: "D. He is angry at his former employer for automating his job at the factory." }
      ],
      correct: "B",
      expEn: "Marcus's main conflict is internal; he feels self-conscious, insecure, and doubtful about his ability to succeed in college alongside younger, tech-savvy students.",
      expVn: "Xung đột chính của Marcus là xung đột nội tâm; anh ấy cảm thấy tự ti, không an tâm và nghi ngờ về khả năng thành công của mình khi học cùng những sinh viên trẻ tuổi rành công nghệ."
    },
    {
      id: "q_fict_2",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "14. What does Professor Vance mean when she tells Marcus, \"Don't underestimate the value of your mileage\"?",
      options: [
        { val: "A", text: "A. He should keep track of how many miles he drives to commute to campus." },
        { val: "B", text: "B. His age and past work experience are assets that have prepared him for college." },
        { val: "C", text: "C. Younger students are physically faster at typing than he is." },
        { val: "D", text: "D. He will need to work twice as hard to catch up to his classmates." }
      ],
      correct: "B",
      expEn: "'Mileage' is a metaphor for life experience. Professor Vance is telling him that his years of working and solving real-world problems have given him valuable grit and logic.",
      expVn: "'Mileage' (số dặm/đường dài) là một ẩn dụ cho kinh nghiệm sống. Giáo sư Vance đang nói với anh ấy rằng những năm tháng làm việc và giải quyết các vấn đề thực tế đã mang lại cho anh ấy sự bền bỉ và tư duy logic quý giá."
    },
    {
      id: "q_fict_3",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "15. How does the setting of the hallway reflect Marcus’s internal state?",
      options: [
        { val: "A", text: "A. The bright, cheerful hallway makes him feel optimistic about his future." },
        { val: "B", text: "B. The empty, quiet hallway emphasizes his feelings of complete loneliness." },
        { val: "C", text: "C. The low, humming fluorescent lights mirror the nervous tension he feels inside." },
        { val: "D", text: "D. The chaotic, crowded hallway makes him feel angry and overwhelmed." }
      ],
      correct: "C",
      expEn: "The author explicitly states that the 'low, persistent buzz' of the lights 'matched the anxious vibration in Marcus's chest.'",
      expVn: "Tác giả tuyên bố rõ ràng rằng 'tiếng vo ve trầm, dai dẳng' của ánh đèn 'phù hợp với sự rung động lo âu trong ngực Marcus.'"
    }
  ]
};
</file>

<file path="src/data/GED/ENG_1A/data.js">
// src/data/GED/ENG_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const ENGLISH_1A_DATA = {
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },
  realWords: [
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],
  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],
  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],
  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is incredibly important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },
  assessment,
  notes,
  workbook,
  games
};
</file>

<file path="src/data/GED/ENG_1A/games.js">
// src/data/GED/ENG_1A/games.js
export const games = null;
</file>

<file path="src/data/GED/ENG_1A/notes.js">
// src/data/GED/ENG_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Understanding Reading & Arguments",
    subtitle: "Objective: Identify the author's purpose, distinguish facts from opinions, and analyze claims and evidence.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Author's Purpose",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "Every text is written with a specific **Purpose** in mind. Before you can analyze a text, you must figure out why the author wrote it in the first place.\n\n> The three most common purposes are **PIE**:\n> **P**ersuade: To convince you to agree.\n> **I**nform: To teach you objective facts.\n> **E**ntertain: To amuse or tell a story.",
    example: "A newspaper editorial arguing that the city needs more parks is written to Persuade.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Fact vs. Opinion",
    icon: "Scale",
    color: "bg-[#58cc02]",
    content: "When reading informational texts or the news, it is critical to separate what is actually true from what the author simply believes.\n\n> A **Fact** is a statement that can be objectively proven true or false using evidence, science, or historical records.\n> An **Opinion** is a personal belief, judgment, or feeling that cannot be universally proven.",
    example: "Fact: The human body is composed of about 60% water.\nOpinion: Swimming is the best way to exercise.",
    image: "/images/GED/fact_opinion1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Claims & Evidence",
    icon: "ShieldCheck",
    color: "bg-[#ff4b4b]",
    content: "When an author wants to persuade you, they will build an argument. An argument is not a fight; it is a logical structure.\n\n> **The Claim:** The main argument or point the author is trying to defend.\n> **The Evidence:** The statistics, expert quotes, or historical facts used to prove the claim is valid.",
    example: "Claim: Daily reading improves vocabulary.\nEvidence: A university study showed that students who read for 20 minutes a day learned 1,800,000 new words a year.",
    image: "/images/GED/reading_map1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Author's Tone",
    icon: "MessageSquare",
    color: "bg-[#ce82ff]",
    content: "Because you cannot hear the author's voice when reading, you have to look for emotional clues in the text.\n\n> The **Tone** is the author's underlying attitude or feeling toward the subject they are writing about.\n\nYou can often determine the tone by examining the descriptive adjectives and verbs the author chooses to use.",
    example: "Using words like 'devastating', 'tragic', and 'heartbreaking' creates a serious, sorrowful tone.\nUsing words like 'ridiculous', 'absurd', and 'nonsense' creates a sarcastic or critical tone.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_4.mp3"
  },
  {
    type: "summary",
    title: "Module Complete!",
    subtitle: "Objective Achieved: You now understand purpose, claims, and evidence.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
</file>

<file path="src/data/GED/ENG_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
</file>

<file path="src/data/GED/English_1A.js">
// src/data/GED/English_1A.js
export const ENGLISH_1A_DATA = {
  // =========================================================================
  // 1. UNIFIED ARCHITECTURE METADATA BLOCKS
  // =========================================================================
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },

  // =========================================================================
  // 2. ROOT-LEVEL HYBRID FALLBACK ARRAYS 
  // =========================================================================
  
  realWords: [
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],

  fakeWords: [
    { word: "Themation", imitating: "Theme", isReal: false },
    { word: "Purposion", imitating: "Purpose", isReal: false },
    { word: "Tonalism", imitating: "Tone", isReal: false },
    { word: "Evidense", imitating: "Evidence", isReal: false },
    { word: "Factify", imitating: "Fact", isReal: false },
    { word: "Opinism", imitating: "Opinion", isReal: false },
    { word: "Transitate", imitating: "Transition", isReal: false },
    { word: "Claimation", imitating: "Claim", isReal: false },
    { word: "Analyzation", imitating: "Analyze", isReal: false },
    { word: "Concludence", imitating: "Conclude", isReal: false }
  ],

  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],

  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],

  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },

  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],

  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],

  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is incredibly important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },

  // =========================================================================
  // 3. NEW ASSESSMENT ARCHITECTURE (MULTI-PASSAGE & TIME LIMITS)
  // =========================================================================
  assessment: {
    timeLimit: 2700, // Increased to 45 Minutes due to 5 passages
    passages: [
      {
        id: "p1_gardens",
        title: "The Case for Community Gardens",
        meta: "Editorial: City Planning Board Review",
        text: [
          "A community garden is a shared space where people come together to grow food and plants. This is an indisputable fact. Currently, the Riverton City Council is debating whether to turn the empty lot on 4th Street into a community garden or a commercial shopping mall. While some argue that commercial development brings immediate tax revenue, building a shopping mall on our last remaining green space is incredibly shortsighted.",
          "The primary purpose of our town should be to foster a healthy, connected community, not just generate cold, hard cash. Numerous academic studies have shown that access to green spaces significantly reduces neighborhood stress levels and lowers local crime rates. Therefore, the claim that we must build a mall to improve our town's quality of life is completely false. We need the garden to ensure a better future for our children."
        ],
        glossary: {
          "fact": { "def": "A statement that can be proven true or false.", "vn": "Sự thật", "vnDef": "Một tuyên bố có thể được chứng minh là đúng hay sai." },
          "purpose": { "def": "The reason an author writes or an action is done.", "vn": "Mục đích", "vnDef": "Lý do tác giả viết hoặc một hành động được thực hiện." },
          "claim": { "def": "The main argument a writer is trying to defend.", "vn": "Luận điểm", "vnDef": "Lập luận chính mà người viết đang cố gắng bảo vệ." }
        }
      },
      {
        id: "p_hist_1898",
        title: "Historical Opinion: The Eight-Hour Workday",
        meta: "Adapted from an 1898 address by labor leader Unionist Thomas O'Donnell",
        text: [
          "For decades, the American industrial worker has been treated as little more than an extension of the iron machinery he operates. We hear from the captains of industry that to shorten the workday from twelve hours to eight would invite economic ruin, decrease national productivity, and encourage idleness among the working classes. I stand before you today to argue that this claim is not only false, but it also ignores the fundamental laws of human nature and economic progress.",
          "First, let us examine the argument of productivity. A exhausted man is not an efficient man. When a laborer is forced to toil for twelve hours in a dark, poorly ventilated factory, his physical strength wanes long before his shift concludes. The work performed in the final four hours of a twelve-hour day is marked by fatigue, leading to frequent errors, ruined materials, and tragic, preventable workplace accidents. By limiting the workday to eight hours, we restore the worker’s vitality. A rested worker is alert, precise, and highly motivated. Historical evidence from factories that have voluntarily adopted the eight-hour standard reveals that total daily output does not decrease; rather, it often increases due to the heightened efficiency and focus of the workforce.",
          "Second, we must consider the moral and social dimensions of this issue. Opponents of our movement argue that additional leisure hours will lead workers to vice and degradation. What a cynical view of the American citizen! When a man is worked to the point of utter exhaustion, he has no time or energy remaining to cultivate his mind, care for his children, or participate in the civic life of his community. He is reduced to a state of mere survival. Give the worker eight hours for work, eight hours for rest, and eight hours for what he wills. With those eight hours of personal time, the worker will seek education, enjoy his family, and become a more informed, responsible participant in our democracy.",
          "The wealth of our nation should not be measured solely by the bank accounts of our monopolists, but by the health, intelligence, and dignity of our producing classes. The eight-hour day is not a plea for charity; it is a demand for justice and a necessary step toward a stronger, more prosperous republic."
        ]
      },
      {
        id: "p_handwriting",
        title: "The Decline of Handwriting",
        meta: "Contemporary Opinion Piece",
        text: [
          "In an era dominated by touchscreens and voice-to-text technology, the traditional art of handwriting is quietly facing extinction. Across the nation, school districts are dropping cursive from their mandatory curricula, and keyboard proficiency has taken center stage. While efficiency advocates celebrate this shift as a victory for modernization, we are sacrificing a profound cognitive tool in our rush to embrace the digital future.",
          "The primary argument for abandoning handwriting is speed. Proponents of digital-first education argue that typing allows students to capture information much faster than writing by hand ever could. This is undoubtedly true, but it confuses transcription with comprehension. When students type lecture notes on a laptop, they tend to record the speaker's words verbatim without processing their meaning. The laptop becomes a recording device, bypassing the brain.",
          "In contrast, writing by hand is a slower, more deliberate process. Because we cannot write as fast as someone speaks, our brains are forced to summarize, synthesize, and prioritize information in real-time. We must actively decide what is important enough to commit to paper. Neurological studies have consistently shown that the physical act of forming letters activates unique neural pathways linked to memory retention and critical thinking. Students who take notes by hand demonstrate a significantly deeper conceptual understanding of the material than those who type.",
          "Furthermore, handwriting is a deeply personal expression of identity. A typed font is uniform, sterile, and anonymous; it carries no trace of the writer’s physical presence or emotional state. A handwritten letter, however, possesses a unique signature style, capturing a moment in time and a physical connection between sender and receiver.",
          "By relegating handwriting to a relic of history, we are not just changing our medium of communication—we are weakening our cognitive capacities and sanitizing our personal interactions. Efficiency should not be the sole metric of educational progress. We must ensure that our classrooms continue to make space for the pen, even in a world ruled by the keyboard."
        ]
      },
      {
        id: "p_videogames",
        title: "The Educational Value of Video Games",
        meta: "Contemporary Opinion Article",
        text: [
          "For decades, the public narrative surrounding video games has been overwhelmingly negative. Critics routinely accuse them of encouraging violence, promoting social isolation, and rotting the brains of youth. However, this reactionary stance ignores a growing body of scientific research and educational theory. Far from being a mindless distraction, video games are actually one of the most powerful and effective tools we have for developing complex, 21st-century cognitive skills.",
          "To understand why video games are beneficial, one must compare them to more passive forms of media, such as television or film. When a child watches a movie, they are a consumer of a pre-determined story. They sit back, observe, and accept the narrative. When a child plays a video game, however, they are an active agent. The game does not progress unless the player makes decisions, solves puzzles, and reacts to changing circumstances.",
          "Most modern video games are, at their core, complex exercises in systemic problem-solving. In strategy and role-playing games, players must manage scarce resources, anticipate long-term consequences of their choices, and adapt to unpredictable environments. When a player fails to complete a level, they do not simply quit; they analyze what went wrong, formulate a new hypothesis, and try again. This iterative cycle of trial, failure, and adaptation is the exact foundation of the scientific method.",
          "Additionally, the rise of multiplayer online games has transformed gaming into a highly collaborative, social activity. To succeed in cooperative games, players must communicate effectively, delegate tasks based on individual strengths, and negotiate conflicts under pressure. These are the precise 'soft skills' that modern employers desperately seek in the workplace.",
          "While moderation is certainly necessary—as it is with any activity—the outright demonization of video games is outdated and counterproductive. Instead of treating gaming as an enemy of education, parents and educators should learn to leverage its interactive power to prepare youth for a highly complex, digital world."
        ]
      },
      {
        id: "p_fiction_marcus",
        title: "Starting Over",
        meta: "Literary Narrative (Fiction)",
        text: [
          "The fluorescent lights of the community college hallway hummed with a low, persistent buzz that matched the anxious vibration in Marcus’s chest. At thirty-five, he felt like a giant occupying a world built for people ten years younger. He adjusted the strap of his backpack, which felt ridiculously heavy, stuffed with a pristine college algebra textbook and a brand-new spiral notebook.",
          "Twelve years ago, Marcus had walked away from a half-finished degree to support his family, taking a job at the local packaging plant. For a decade, the rhythm of the assembly line had been his life—predictable, physical, and secure. But when the plant automated its main line last winter, Marcus found himself staring at a severance package and an uncertain future. He had made a choice: it was time to finish what he started and pivot to computer science.",
          "Now, standing outside Room 204 for his first programming lab, doubt crept in like a cold draft. Through the door's glass pane, he saw clusters of students laughing, their fingers flying across smartphone screens with effortless ease. They looked like natives of this digital landscape; Marcus felt like an explorer who had lost his map.",
          "\"First day jitters?\"",
          "Marcus turned to see an older woman with a kind face and a silver streak in her dark hair. She was carrying a worn laptop bag.",
          "\"Is it that obvious?\" Marcus managed a weak smile.",
          "\"I’ve taught this class for fifteen years, Marcus—it's Marcus, right?\" she asked, glancing at her roster. He nodded. \"The career changers always stand outside the door the longest. I'm Professor Vance.\"",
          "\"I just feel like I'm starting a mile behind everyone else in there,\" Marcus admitted, gesturing toward the younger students. \"They grew up with these machines.\"",
          "Professor Vance smiled, her eyes crinkling. \"They grew up using them, yes. But that doesn't mean they know how they work. Coding isn't about how fast you can type or how many apps you use. It’s about logic, patience, and solving puzzles. If you can survive a decade of troubleshooting mechanical errors on a factory floor, you have exactly the kind of grit this class requires. Don't underestimate the value of your mileage.\"",
          "She gave him a reassuring pat on the shoulder and opened the door. Marcus took a deep breath, letting her words sink in. He looked down at his calloused hands—hands that knew how to fix things, hands that knew how to work hard. He walked into the classroom and took a seat right in the front row."
        ]
      }
    ],
    questions: [
      {
        id: "q1_gardens_mcq",
        passageId: "p1_gardens",
        type: "mcq",
        title: "1. What is the author's primary purpose in writing this editorial?",
        options: [
          { val: "A", text: "A. To inform residents about how to grow their own food." },
          { val: "B", text: "B. To persuade the City Council to choose the community garden over the shopping mall." },
          { val: "C", text: "C. To entertain readers with a story about an empty lot." },
          { val: "D", text: "D. To explain the financial benefits of commercial development." }
        ],
        correct: "B",
        expEn: "The author uses persuasive language ('incredibly shortsighted', 'completely false') to convince the reader and the council that building a garden is better than building a mall.",
        expVn: "Tác giả sử dụng ngôn ngữ mang tính thuyết phục ('tầm nhìn vô cùng hạn hẹp', 'hoàn toàn sai lầm') để thuyết phục người đọc và hội đồng rằng việc xây dựng một khu vườn tốt hơn so với xây dựng một trung tâm mua sắm."
      },
      {
        id: "q2_gardens_dnd",
        passageId: "p1_gardens",
        type: "dnd",
        title: "2. Drag and drop the statements from the text into the correct categories (Fact vs. Opinion).",
        options: [],
        bank: [
          { val: "A", text: "A community garden is a shared space to grow food." },
          { val: "B", text: "Building a shopping mall is incredibly shortsighted." },
          { val: "C", text: "The primary purpose of our town should be to foster a connected community." },
          { val: "D", text: "Studies show green spaces reduce stress and crime rates." }
        ],
        targets: [
          { id: "facts", title: "Objective Facts (Can be proven)" },
          { id: "opinions", title: "Personal Opinions (Beliefs or judgments)" }
        ],
        correctSets: {
          "facts": ["A", "D"],
          "opinions": ["B", "C"]
        },
        expEn: "Options A and D are facts because they can be objectively proven via definitions and studies. Options B and C are opinions because they rely on the author's personal values and judgments.",
        expVn: "Lựa chọn A và D là sự thật vì chúng có thể được chứng minh khách quan thông qua các định nghĩa và nghiên cứu. Lựa chọn B và C là ý kiến cá nhân vì chúng dựa trên những giá trị và phán xét cá nhân của tác giả."
      },
      {
        id: "q3_gardens_inline",
        passageId: "p1_gardens",
        type: "inline",
        title: "3. Grammar & Logic: Select the correct rhetorical terms to complete the analysis of the text.",
        options: [],
        textParts: [
          "In the editorial, the author's main ",
          " is that the town must build a community garden instead of a mall. To back up this argument, the author provides clear ",
          " by referencing academic studies about stress and crime rates. Finally, the author's overall ",
          " is highly critical of the commercial development plan, describing it as 'shortsighted'."
        ],
        blanks: {
          "1": {
            correct: "claim",
            options: [
              { val: "claim", text: "claim" },
              { val: "fact", text: "fact" },
              { val: "transition", text: "transition" }
            ]
          },
          "2": {
            correct: "evidence",
            options: [
              { val: "tone", text: "tone" },
              { val: "opinion", text: "opinion" },
              { val: "evidence", text: "evidence" }
            ]
          },
          "3": {
            correct: "tone",
            options: [
              { val: "purpose", text: "purpose" },
              { val: "tone", text: "tone" },
              { val: "analyze", text: "analyze" }
            ]
          }
        },
        expEn: "The 'claim' is the main argument. The academic studies serve as the 'evidence' to prove that claim. The critical emotional attitude of the writer represents the 'tone'.",
        expVn: "'Claim' (luận điểm) là lập luận chính. Các nghiên cứu học thuật đóng vai trò là 'evidence' (bằng chứng) để chứng minh luận điểm đó. Thái độ cảm xúc chỉ trích của người viết thể hiện 'tone' (giọng điệu)."
      },
      {
        id: "q_hist_1",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "4. Which of the following best states the main argument of the passage?",
        options: [
          { val: "A", text: "A. Factory owners should provide safer working conditions and higher wages." },
          { val: "B", text: "B. Reducing the workday to eight hours benefits both economic productivity and societal well-being." },
          { val: "C", text: "C. The American government must intervene to break up monopolies in the manufacturing sector." },
          { val: "D", text: "D. Workers who labor for twelve hours are more prone to moral vice than those who work eight hours." }
        ],
        correct: "B",
        expEn: "The author argues that reducing the workday to eight hours will increase factory productivity (by reducing fatigue and errors) and improve societal well-being (by allowing workers time to rest, learn, and engage in democracy).",
        expVn: "Tác giả lập luận rằng việc giảm ngày làm việc xuống còn tám giờ sẽ làm tăng năng suất nhà máy (bằng cách giảm mệt mỏi và sai sót) và cải thiện phúc lợi xã hội (bằng cách cho phép công nhân có thời gian nghỉ ngơi, học tập và tham gia vào nền dân chủ)."
      },
      {
        id: "q_hist_2",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "5. How does the author counter the claim that shorter workdays lead to economic ruin?",
        options: [
          { val: "A", text: "A. By arguing that factory owners can afford to lose money." },
          { val: "B", text: "B. By pointing out that a rested worker is more productive and makes fewer costly mistakes." },
          { val: "C", text: "C. By suggesting that the government subsidize factories that adopt the eight-hour day." },
          { val: "D", text: "D. By demonstrating that consumers are willing to pay higher prices for goods." }
        ],
        correct: "B",
        expEn: "In the second paragraph, the author argues that exhausted workers make mistakes and ruin materials, and that a rested worker is more alert and efficient, keeping total daily output high.",
        expVn: "Trong đoạn thứ hai, tác giả lập luận rằng những công nhân kiệt sức thường mắc sai lầm, và một công nhân được nghỉ ngơi sẽ tỉnh táo và hiệu quả hơn, giúp giữ sản lượng tổng thể hàng ngày ở mức cao."
      },
      {
        id: "q_hist_3",
        passageId: "p_hist_1898",
        type: "mcq",
        title: "6. As used in the third paragraph, what does the word \"cultivate\" most nearly mean?",
        options: [
          { val: "A", text: "A. To harvest or farm" },
          { val: "B", text: "B. To restrict or limit" },
          { val: "C", text: "C. To develop or improve" },
          { val: "D", text: "D. To ignore or neglect" }
        ],
        correct: "C",
        expEn: "In this context, to 'cultivate his mind' means to develop or improve his intellect through education and thought.",
        expVn: "Trong ngữ cảnh này, 'cultivate his mind' (trau dồi trí tuệ) có nghĩa là phát triển hoặc cải thiện trí tuệ thông qua giáo dục và suy nghĩ."
      },
      {
        id: "q_hw_1",
        passageId: "p_handwriting",
        type: "mcq",
        title: "7. What is the author’s primary purpose in writing this piece?",
        options: [
          { val: "A", text: "A. To persuade school districts to completely ban laptops and tablets in classrooms." },
          { val: "B", text: "B. To argue that handwriting offers cognitive and personal benefits that typing cannot replicate." },
          { val: "C", text: "C. To explain the scientific process of how the brain stores memories during typing." },
          { val: "D", text: "D. To demonstrate that typing speeds are vastly superior to handwriting speeds." }
        ],
        correct: "B",
        expEn: "The author is advocating for the preservation of handwriting, arguing that it has cognitive benefits (like better memory retention) and personal values that typing lacks.",
        expVn: "Tác giả đang ủng hộ việc duy trì chữ viết tay, lập luận rằng nó mang lại những lợi ích nhận thức (như ghi nhớ tốt hơn) và những giá trị cá nhân mà việc đánh máy không có."
      },
      {
        id: "q_hw_2",
        passageId: "p_handwriting",
        type: "mcq",
        title: "8. Which piece of evidence does the author use to support the claim that handwriting improves memory retention?",
        options: [
          { val: "A", text: "A. Surveys showing that teachers prefer graded handwritten essays over printed ones." },
          { val: "B", text: "B. Brain scans showing that forming letters activates neural pathways linked to critical thinking." },
          { val: "C", text: "C. Statistics comparing the graduation rates of schools with and without cursive programs." },
          { val: "D", text: "D. Anecdotes from historical figures who wrote their famous works by hand." }
        ],
        correct: "B",
        expEn: "The author cites 'neurological studies' showing that physical writing activates unique neural pathways linked to critical thinking and memory.",
        expVn: "Tác giả trích dẫn 'các nghiên cứu thần kinh học' cho thấy việc viết tay kích hoạt các đường dẫn thần kinh đặc biệt liên quan đến tư duy phản biện và trí nhớ."
      },
      {
        id: "q_hw_3",
        passageId: "p_handwriting",
        type: "mcq",
        title: "9. Why does the author mention that typed fonts are \"uniform, sterile, and anonymous\"?",
        options: [
          { val: "A", text: "A. To emphasize that typing is more professional than writing by hand." },
          { val: "B", text: "B. To criticize technology companies for not designing more creative fonts." },
          { val: "C", text: "C. To highlight the loss of individuality and personal connection associated with digital communication." },
          { val: "D", text: "D. To suggest that typing makes it easier to write plagiarized material undetected." }
        ],
        correct: "C",
        expEn: "The author uses these terms to contrast the cold, emotionless nature of typed text with the unique, expressive, and human nature of handwriting.",
        expVn: "Tác giả sử dụng các thuật ngữ này để đối chiếu bản chất vô cảm, lạnh lẽo của văn bản đánh máy với bản chất độc đáo, biểu cảm và đậm chất con người của chữ viết tay."
      },
      {
        id: "q_vg_1",
        passageId: "p_videogames",
        type: "mcq",
        title: "10. How does the author structure the argument in the second paragraph?",
        options: [
          { val: "A", text: "A. By presenting a chronological history of media consumption from television to video games." },
          { val: "B", text: "B. By comparing and contrasting the passive nature of watching television with the active nature of playing video games." },
          { val: "C", text: "C. By listing the negative physical side effects of excessive screen time." },
          { val: "D", text: "D. By citing expert testimony from pediatricians regarding media habits." }
        ],
        correct: "B",
        expEn: "The author compares and contrasts television (where the viewer sits back and passively consumes a story) with video games (where the player must be an active agent who makes decisions to progress).",
        expVn: "Tác giả so sánh và đối chiếu truyền hình (nơi người xem thụ động tiếp nhận câu chuyện) với trò chơi điện tử (nơi người chơi phải là một tác nhân chủ động đưa ra quyết định)."
      },
      {
        id: "q_vg_2",
        passageId: "p_videogames",
        type: "mcq",
        title: "11. According to the author, how does playing video games mimic the scientific method?",
        options: [
          { val: "A", text: "A. It requires players to memorize vast amounts of scientific data." },
          { val: "B", text: "B. It encourages players to work in isolated laboratory environments." },
          { val: "C", text: "C. It involves a cycle of testing a strategy, failing, analyzing the result, and trying a new approach." },
          { val: "D", text: "D. It forces players to write down their hypotheses before starting a new level." }
        ],
        correct: "C",
        expEn: "The third paragraph describes the gaming cycle of trying a strategy, failing, analyzing the failure, and trying again as the core foundation of the scientific method.",
        expVn: "Đoạn thứ ba mô tả chu kỳ chơi game: thử nghiệm chiến lược, thất bại, phân tích thất bại, và thử lại. Đây chính là nền tảng cốt lõi của phương pháp khoa học."
      },
      {
        id: "q_vg_3",
        passageId: "p_videogames",
        type: "mcq",
        title: "12. Which of the following assumptions does the author make about the reader?",
        options: [
          { val: "A", text: "A. The reader already believes that video games are highly educational." },
          { val: "B", text: "B. The reader is familiar with the negative stereotypes associated with video games." },
          { val: "C", text: "C. The reader prefers television over video games for entertainment." },
          { val: "D", text: "D. The reader is an employer looking to hire skilled tech workers." }
        ],
        correct: "B",
        expEn: "The author begins by stating, 'For decades, the public narrative surrounding video games has been overwhelmingly negative,' which assumes the reader is already familiar with these common stereotypes.",
        expVn: "Tác giả bắt đầu bằng cách khẳng định định kiến tiêu cực của công chúng về trò chơi điện tử đã tồn tại nhiều thập kỷ, điều này ngầm định rằng người đọc đã quen thuộc với những khuôn mẫu này."
      },
      {
        id: "q_fict_1",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "13. What is the primary conflict Marcus experiences in the story?",
        options: [
          { val: "A", text: "A. He is struggling to pass a difficult college algebra exam." },
          { val: "B", text: "B. He feels out of place and insecure about returning to school as an older student." },
          { val: "C", text: "C. He cannot afford the tuition fees for his computer science program." },
          { val: "D", text: "D. He is angry at his former employer for automating his job at the factory." }
        ],
        correct: "B",
        expEn: "Marcus's main conflict is internal; he feels self-conscious, insecure, and doubtful about his ability to succeed in college alongside younger, tech-savvy students.",
        expVn: "Xung đột chính của Marcus là xung đột nội tâm; anh ấy cảm thấy tự ti, không an tâm và nghi ngờ về khả năng thành công của mình khi học cùng những sinh viên trẻ tuổi rành công nghệ."
      },
      {
        id: "q_fict_2",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "14. What does Professor Vance mean when she tells Marcus, \"Don't underestimate the value of your mileage\"?",
        options: [
          { val: "A", text: "A. He should keep track of how many miles he drives to commute to campus." },
          { val: "B", text: "B. His age and past work experience are assets that have prepared him for college." },
          { val: "C", text: "C. Younger students are physically faster at typing than he is." },
          { val: "D", text: "D. He will need to work twice as hard to catch up to his classmates." }
        ],
        correct: "B",
        expEn: "'Mileage' is a metaphor for life experience. Professor Vance is telling him that his years of working and solving real-world problems have given him valuable grit and logic.",
        expVn: "'Mileage' (số dặm/đường dài) là một ẩn dụ cho kinh nghiệm sống. Giáo sư Vance đang nói với anh ấy rằng những năm tháng làm việc và giải quyết các vấn đề thực tế đã mang lại cho anh ấy sự bền bỉ và tư duy logic quý giá."
      },
      {
        id: "q_fict_3",
        passageId: "p_fiction_marcus",
        type: "mcq",
        title: "15. How does the setting of the hallway reflect Marcus’s internal state?",
        options: [
          { val: "A", text: "A. The bright, cheerful hallway makes him feel optimistic about his future." },
          { val: "B", text: "B. The empty, quiet hallway emphasizes his feelings of complete loneliness." },
          { val: "C", text: "C. The low, humming fluorescent lights mirror the nervous tension he feels inside." },
          { val: "D", text: "D. The chaotic, crowded hallway makes him feel angry and overwhelmed." }
        ],
        correct: "C",
        expEn: "The author explicitly states that the 'low, persistent buzz' of the lights 'matched the anxious vibration in Marcus's chest.'",
        expVn: "Tác giả tuyên bố rõ ràng rằng 'tiếng vo ve trầm, dai dẳng' của ánh đèn 'phù hợp với sự rung động lo âu trong ngực Marcus.'"
      }
    ]
  }
};
</file>

<file path="src/data/index.js">
// src/data/index.js

export const Y8_META = []; export const Y8_DATA = {};
export const Y9_META = []; export const Y9_DATA = {};
export const ESL_META = []; export const ESL_DATA = {};
export const GED_META = []; export const GED_DATA = {};

// Automatically pulls all .js files in these folders
const modules = import.meta.glob('./**/*.js', { eager: true });

for (const path in modules) {
  if (path.includes('index.js')) continue;

  const module = modules[path];
  
  let data = null;
  for (const key in module) {
    const exp = module[key];
    if (exp && typeof exp === 'object' && exp.meta && exp.meta.id) {
      data = exp;
      break;
    }
  }
  
  if (!data) continue;

  const id = data.meta.id;
  const track = data.meta.track?.toUpperCase() || 'Y8';

  // Strict deduplication: Only push if the ID isn't already registered
  if (track === 'Y8' && !Y8_DATA[id]) { Y8_DATA[id] = data; Y8_META.push(data.meta); }
  else if (track === 'Y9' && !Y9_DATA[id]) { Y9_DATA[id] = data; Y9_META.push(data.meta); }
  else if (track === 'ESL' && !ESL_DATA[id]) { ESL_DATA[id] = data; ESL_META.push(data.meta); }
  else if (track === 'GED' && !GED_DATA[id]) { GED_DATA[id] = data; GED_META.push(data.meta); }
}

const sortById = (a, b) => a.id.localeCompare(b.id);
Y8_META.sort(sortById);
Y9_META.sort(sortById);
ESL_META.sort(sortById);
GED_META.sort(sortById);
</file>

<file path="src/hooks/useStudentProgress.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ensure this matches how you initialize Supabase in your project!
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Notice we added 'track' as a parameter here, defaulting to Y9
export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  const [allProgress, setAllProgress] = useState({
    Y8: {},
    Y9: {},
    ESL: {},
    GED: {}
  });
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }
      
      setUser(session.user);

      const { data } = await supabase
        .from('students')
        .select('progress')
        .eq('id', session.user.id)
        .single();

      if (data && data.progress) {
        let dbProgress = data.progress;
        const validTracks = ['Y8', 'Y9', 'ESL', 'GED'];

        // AUTO-MIGRATION: If keys are old unit IDs like "U1", move everything to Y9
        const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (isOldFormat) {
          dbProgress = {
            Y8: {},
            Y9: dbProgress,
            ESL: {},
            GED: {}
          };
          // Silently fix the database in the background so it doesn't happen again
          await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
        } else {
          // Ensure the base structure exists even if a track is empty
          validTracks.forEach(t => {
            if (!dbProgress[t]) dbProgress[t] = {};
          });
        }

        setAllProgress(dbProgress);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    // Get the existing score (defaults to 0 if they have never played this section)
    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        // ⚠️ FIX: Math.max ensures we only ever keep the highest XP score
        current: Math.max(existingScore, score),
        // We still update the answers if they provide new ones so they can see their latest work
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, // <-- THE FIX: Exposing allProgress so the Dashboard can actually read it
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}
</file>

<file path="src/tasks/Assessment.jsx">
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle, Volume2, VolumeX, GripVertical, CornerDownRight, Clock, AlertTriangle, Construction, FileQuestion, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function Assessment({ unit, onComplete, onQuit }) {
  const assessmentData = unit?.assessment;
  
  if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions) || assessmentData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Construction className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Assessment Unavailable</h2>
        <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-10 text-lg font-bold text-slate-500">
          No assessment data is currently configured for this unit.
        </div>
        <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const questions = assessmentData.questions;
  const passages = assessmentData.passages || [];
  const totalQuestions = questions.length;

  // Lifecycle States: 'testing' -> 'intermission' -> 'reviewing'
  const [testPhase, setTestPhase] = useState('testing'); 
  const [answers, setAnswers] = useState({}); // Stores user answers mapped by qIndex
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(assessmentData.timeLimit || 2700); 
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Active UI States
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const currentQuestion = questions[currentQIndex] || null;
  const currentPassage = currentQuestion ? passages.find(p => p.id === currentQuestion.passageId) : null;

  const isDND = currentQuestion?.type === 'dnd' || currentQuestion?.type === 'order';
  const isInline = currentQuestion?.type === 'inline' || currentQuestion?.type === 'scrollBox';
  const isMCQ = !isDND && !isInline;

  // Helper to safely get the current question's answer payload
  const currentAns = answers[currentQIndex] || {};

  // --- Core Timer Logic ---
  useEffect(() => {
    if (testPhase !== 'testing') return;
    if (timeLeft <= 0 && !isTimeUp) {
      setIsTimeUp(true);
      finishTest();
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, testPhase, isTimeUp]);

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Audio Engine ---
  const audioState = useRef({ isCancelled: false, currentAudio: null });

  const stopAudio = useCallback(() => {
    if (audioState.current.currentAudio) {
      try {
        audioState.current.currentAudio.pause();
        audioState.current.currentAudio.currentTime = 0;
      } catch (e) {
        console.warn("Audio stop error:", e);
      }
    }
    audioState.current.isCancelled = true;
    audioState.current.currentAudio = null;
  }, []);

  useEffect(() => { stopAudio(); setActiveGlossaryTerm(null); }, [currentQIndex, testPhase, stopAudio]);
  useEffect(() => { return () => stopAudio(); }, [stopAudio]);

  const playPassageAudio = async (filename) => {
    stopAudio();
    audioState.current.isCancelled = false;
    const audio = new Audio(`/audio/${filename}.mp3`);
    try {
      audioState.current.currentAudio = audio;
      await audio.play();
    } catch (e) {
      console.warn("Passage audio interrupted or missing:", e);
    }
  };

  // --- Testing Interaction Handlers ---
  const updateAnswer = (payload) => {
    setAnswers(prev => ({ ...prev, [currentQIndex]: { ...prev[currentQIndex], ...payload } }));
  };

  const handleSelectOption = (val) => {
    if (testPhase !== 'testing') return;
    updateAnswer({ selectedOption: val });
  };

  const handleDragStart = (e, itemVal) => {
    if (testPhase !== 'testing') return;
    setDraggedItem(itemVal);
    e.dataTransfer.setData('text/plain', itemVal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (testPhase !== 'testing' || !draggedItem) return;
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    for (const key in newDrops) { if (newDrops[key] === draggedItem) delete newDrops[key]; }
    newDrops[slotId] = draggedItem;
    updateAnswer({ droppedItems: newDrops });
    setDraggedItem(null);
  };

  const removeDroppedItem = (slotId) => {
    if (testPhase !== 'testing') return;
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    delete newDrops[slotId];
    updateAnswer({ droppedItems: newDrops });
  };

  const handleInlineChange = (blankIndex, val) => {
    if (testPhase !== 'testing') return;
    const currentInline = currentAns.inlineAnswers || {};
    updateAnswer({ inlineAnswers: { ...currentInline, [blankIndex]: val } });
  };

  // --- Submittable Gate Check ---
  let isCurrentAnswered = false;
  if (currentQuestion) {
    if (isMCQ) isCurrentAnswered = !!currentAns.selectedOption;
    if (isInline) isCurrentAnswered = Object.keys(currentAns.inlineAnswers || {}).length === Object.keys(currentQuestion.blanks || {}).length;
    if (isDND) {
      let totalSlots = 0;
      (currentQuestion.targets || []).forEach(t => totalSlots += (currentQuestion.correctSets?.[t.id]?.length || 1));
      isCurrentAnswered = Object.keys(currentAns.droppedItems || {}).length === totalSlots;
    }
  }

  // --- Navigation & Grading ---
  const checkQuestionCorrect = (qIndex) => {
    const q = questions[qIndex];
    const ans = answers[qIndex] || {};
    
    if (q.type === 'mcq') return ans.selectedOption === q.correct;
    
    if (q.type === 'inline' || q.type === 'scrollBox') {
      const userInline = ans.inlineAnswers || {};
      const blanks = q.blanks || {};
      for (const blankId of Object.keys(blanks)) {
        if (userInline[blankId] !== blanks[blankId].correct) return false;
      }
      return true;
    }
    
    if (q.type === 'dnd' || q.type === 'order') {
      const dropped = ans.droppedItems || {};
      let allCorrect = true;
      for (const target of (q.targets || [])) {
        const expectedArr = q.correctSets?.[target.id] || [];
        const userDropped = [];
        for (let i = 0; i < expectedArr.length; i++) {
          const d = dropped[`${target.id}_${i}`];
          if (d) userDropped.push(d);
        }
        if (q.type === 'order') {
          if (JSON.stringify(userDropped) !== JSON.stringify(expectedArr)) allCorrect = false;
        } else {
          if (userDropped.length !== expectedArr.length) allCorrect = false;
          for (const val of expectedArr) {
            if (!userDropped.includes(val)) allCorrect = false;
          }
        }
      }
      return allCorrect;
    }
    return false;
  };

  const finishTest = () => {
    let calculatedScore = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (checkQuestionCorrect(i)) calculatedScore++;
    }
    setFinalScore(calculatedScore);
    setTestPhase('intermission');
  };

  const handleNextTest = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else finishTest();
  };

  const handlePrevTest = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const handleNextReview = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else {
      if (typeof onComplete === 'function') onComplete(finalScore);
    }
  };

  const handlePrevReview = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  // --- Rendering Helpers ---
  const renderPassageWithGlossary = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\{([^}]+)\}/g);
    return parts.map((part, i) => {
      if (i % 2 !== 0) {
        const cleanWord = part.toLowerCase();
        const termData = currentPassage?.glossary?.[cleanWord];
        if (!termData) return <span key={i} className="font-bold text-slate-800">{part}</span>;
        return (
          <button 
            key={i} 
            onClick={() => { setActiveGlossaryTerm({ word: part, ...termData }); stopAudio(); }}
            className="text-emerald-600 font-bold border-b-2 border-dashed border-emerald-600 hover:bg-emerald-50 transition-colors mx-0.5 rounded px-1"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // --- Intermission View ---
  if (testPhase === 'intermission') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />
        
        <TopBar onQuit={onQuit} current={totalQuestions} total={totalQuestions} modeTitle="Assessment Module" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 animate-in zoom-in-95 duration-500">
          <div className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-200 text-center max-w-2xl w-full">
             <div className="w-32 h-32 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <CheckCircle2 className="w-16 h-16" strokeWidth={3} />
             </div>
             <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4">Assessment Complete</h1>
             <p className="text-2xl font-bold text-slate-500 mb-8">Let's see how you did.</p>
             
             <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl py-8 mb-10 shadow-sm">
                <span className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Final Score</span>
                <div className="text-6xl font-black text-emerald-500">
                  {finalScore} <span className="text-4xl text-slate-300">/ {totalQuestions}</span>
                </div>
             </div>

             <button 
                onClick={() => { setCurrentQIndex(0); setTestPhase('reviewing'); }}
                className="w-full py-5 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all bg-[#1CB0F6] border-b-[6px] border-[#1899D6] hover:bg-[#1899D6] active:border-b-0 active:translate-y-[6px] shadow-lg flex items-center justify-center"
             >
                Review Answers <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Engine View (Testing & Reviewing) ---
  const isCurrentlyCorrect = testPhase === 'reviewing' ? checkQuestionCorrect(currentQIndex) : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans relative">
      
      {/* 1. Header (Shared TopBar) */}
      <TopBar 
        onQuit={onQuit} 
        current={currentQIndex + 1} 
        total={totalQuestions} 
        modeTitle={testPhase === 'testing' ? "Assessment Module" : "Assessment Review"} 
      />

      {isTimeUp && testPhase === 'testing' && (
        <div className="bg-red-600 text-white p-3 text-center font-bold text-lg uppercase tracking-widest flex justify-center items-center shadow-md z-30 animate-in slide-in-from-top-2">
          <AlertTriangle className="mr-2" /> Time is up! Submitting answers...
        </div>
      )}

      {/* 2. Content Body (Split Pane) */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
        
        {/* Left Pane: Reading Passage Bank */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 bg-white z-10 pb-32">
          {currentPassage ? (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-6 leading-tight">{currentPassage.title}</h2>
              <div className="mb-6">
                {currentPassage.meta && (
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{currentPassage.meta}</h3>
                    <div className="flex space-x-2">
                      <button onClick={() => playPassageAudio(`passage_${currentPassage.id}`)} className="flex items-center text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors active:scale-95">
                        <Volume2 className="w-4 h-4 mr-1.5" /> Play
                      </button>
                      <button onClick={stopAudio} className="flex items-center text-xs font-bold bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors active:scale-95">
                        <VolumeX className="w-4 h-4 mr-1.5" /> Stop
                      </button>
                    </div>
                  </div>
                )}
                <div className="space-y-4 text-slate-700 text-lg leading-relaxed font-medium">
                  {(currentPassage.text || []).map((p, i) => (
                    <p key={i}>{renderPassageWithGlossary(p)}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-slate-400 animate-in fade-in">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <FileQuestion className="w-12 h-12 text-slate-300" />
              </div>
              <p className="font-bold text-lg">No passage required</p>
            </div>
          )}
        </div>

        {/* Right Pane: Question Engine */}
        <div className="w-full md:w-1/2 bg-slate-50/50 flex flex-col relative overflow-hidden pb-40">
          
          {/* Floating Timer in Test Phase */}
          {testPhase === 'testing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-30 flex items-center font-black text-lg px-4 py-2 rounded-xl bg-white border-2 border-slate-200 shadow-sm text-slate-700">
               <Clock className="w-5 h-5 mr-2" />
               {formatTime(timeLeft)}
            </div>
          )}

          <div className="p-6 md:p-8 overflow-y-auto h-full relative animate-in fade-in slide-in-from-right-4 duration-300 pt-16 md:pt-8">
            <h3 className="text-xl font-black text-slate-800 leading-snug tracking-tight mb-8 pr-20">{currentQuestion.title}</h3>
            
            {/* 1. MCQ Layout */}
            {isMCQ && (
              <div className="space-y-3">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = currentAns.selectedOption === opt.val;
                  const isCorrectAnswer = opt.val === currentQuestion.correct;
                  let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 shadow-sm hover:shadow-md";
                  
                  if (testPhase === 'reviewing') {
                    if (isCorrectAnswer) btnStyle = "bg-[#D7FFD7] border-[#58A700] text-[#3E7500] shadow-sm";
                    else if (isSelected && !isCorrectAnswer) btnStyle = "bg-[#FFE5E5] border-[#EA4335] text-[#A32D23] shadow-sm";
                    else btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  } else if (isSelected) {
                    btnStyle = "bg-emerald-50 border-emerald-500 border-b-4 text-emerald-800 translate-y-[-2px] shadow-md";
                  }

                  return (
                    <button 
                      key={opt.val}
                      onClick={() => handleSelectOption(opt.val)}
                      disabled={testPhase !== 'testing'}
                      className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-lg transition-all ${btnStyle}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. DND Layout */}
            {isDND && (
              <div className="space-y-8">
                <div className="sticky top-0 z-30 pt-1 pb-4 bg-slate-50/90 backdrop-blur-md shadow-[0_15px_15px_-15px_rgba(0,0,0,0.1)] -mt-2">
                  <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Options Bank</h4>
                    <div className="flex flex-wrap gap-3">
                      {(currentQuestion.bank || []).map((opt) => {
                        const isUsed = Object.values(currentAns.droppedItems || {}).includes(opt.val);
                        if (isUsed) return null;
                        return (
                          <div
                            key={opt.val}
                            draggable={testPhase === 'testing'}
                            onDragStart={(e) => handleDragStart(e, opt.val)}
                            className={`flex items-center px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-700 shadow-sm transition-all ${testPhase === 'testing' ? 'cursor-grab active:cursor-grabbing hover:border-emerald-400 hover:shadow-md' : 'opacity-50'}`}
                          >
                            <GripVertical className="w-5 h-5 mr-2 text-slate-400" />
                            {opt.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Targets</h4>
                  <div className={`grid gap-4 ${(currentQuestion.targets || []).length > 1 && currentQuestion.type !== 'order' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                    {(currentQuestion.targets || []).map((target) => {
                      const requiredCount = currentQuestion.correctSets?.[target.id]?.length || 1;
                      return (
                        <div key={target.id} className="flex flex-col bg-slate-100 p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
                          <div className="font-bold text-slate-800 mb-3 text-[15px] leading-tight text-center border-b-2 border-slate-200 pb-3">{target.title}</div>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: requiredCount }).map((_, slotIndex) => {
                              const slotId = `${target.id}_${slotIndex}`;
                              const droppedVal = (currentAns.droppedItems || {})[slotId];
                              const droppedObj = (currentQuestion.bank || []).find(b => b.val === droppedVal);
                              let slotStyle = "bg-white border-dashed border-slate-300 text-slate-400";
                              
                              if (testPhase === 'reviewing') {
                                const expectedArr = currentQuestion.correctSets?.[target.id] || [];
                                let isCorrectInSlot = currentQuestion.type === 'order' ? expectedArr[slotIndex] === droppedVal : expectedArr.includes(droppedVal);
                                if (!droppedVal) slotStyle = "bg-[#FFE5E5] border-[#EA4335] border-solid text-[#A32D23] shadow-sm";
                                else if (isCorrectInSlot) slotStyle = "bg-[#D7FFD7] border-[#58A700] border-solid text-[#3E7500] shadow-sm";
                                else slotStyle = "bg-[#FFE5E5] border-[#EA4335] border-solid text-[#A32D23] shadow-sm";
                              } else if (droppedObj) {
                                slotStyle = "bg-emerald-50 border-emerald-400 border-solid text-emerald-800 shadow-sm";
                              }

                              return (
                                <div 
                                  key={slotId}
                                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                                  onDrop={(e) => handleDrop(e, slotId)}
                                  onClick={() => droppedObj && removeDroppedItem(slotId)}
                                  className={`min-h-[70px] flex items-center p-3 rounded-2xl border-2 transition-all ${slotStyle} ${testPhase === 'testing' && droppedObj ? 'cursor-pointer hover:bg-rose-50 hover:border-rose-300' : ''}`}
                                >
                                  {!droppedObj ? (
                                    <div className="flex items-center justify-center w-full">
                                      <CornerDownRight className="w-5 h-5 mr-2 opacity-50" />
                                      <span className="font-medium text-sm">{testPhase === 'reviewing' ? 'Left Blank' : 'Drop Item Here'}</span>
                                    </div>
                                  ) : (
                                    <div className="font-bold flex items-center justify-between w-full text-[15px]">
                                      <span>{droppedObj.text}</span>
                                      {testPhase === 'testing' && <XCircle className="w-5 h-5 text-slate-400 hover:text-rose-500 ml-2 flex-shrink-0 transition-colors" />}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Inline Layout */}
            {isInline && (
              <div className="text-lg leading-loose text-slate-700 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
                {(currentQuestion.textParts || []).map((part, i) => {
                  const blankIndex = i + 1;
                  const blankData = currentQuestion.blanks?.[blankIndex];
                  const selectedVal = (currentAns.inlineAnswers || {})[blankIndex];
                  
                  let selectStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 hover:bg-emerald-100 hover:shadow-md';
                  let showCorrection = false;

                  if (testPhase === 'reviewing') {
                    const isCorrect = selectedVal === blankData?.correct;
                    if (isCorrect) selectStyle = 'bg-[#D7FFD7] border-[#58A700] text-[#3E7500]';
                    else {
                      selectStyle = 'bg-[#FFE5E5] border-[#EA4335] text-[#A32D23]';
                      showCorrection = true;
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {part}
                      {blankData && (
                        <span className="inline-flex items-center">
                          <select
                            value={selectedVal || ""}
                            onChange={(e) => handleInlineChange(blankIndex, e.target.value)}
                            disabled={testPhase !== 'testing'}
                            className={`mx-2 p-2 border-b-4 border-2 rounded-xl font-bold cursor-pointer transition-all outline-none appearance-none pr-8 bg-no-repeat shadow-sm ${selectStyle}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                          >
                            <option value="" disabled>{testPhase === 'reviewing' ? 'Blank' : 'Select Option...'}</option>
                            {(blankData.options || []).map(opt => <option key={opt.val} value={opt.val}>{opt.text}</option>)}
                          </select>
                          {showCorrection && (
                            <span className="text-[#3E7500] bg-[#D7FFD7] border border-[#58A700] px-2 py-1 rounded-lg ml-1 text-sm font-bold shadow-sm">
                              {blankData.options.find(o => o.val === blankData.correct)?.text}
                            </span>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Control Navigators */}
      {testPhase === 'testing' && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
            <button 
              onClick={handlePrevTest} 
              disabled={currentQIndex === 0}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={handleNextTest}
              disabled={!isCurrentAnswered}
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#1CB0F6] border-[#1899D6] hover:bg-[#159bd9] disabled:opacity-50 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500"
            >
              {currentQIndex === totalQuestions - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {testPhase === 'reviewing' && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-in slide-in-from-bottom-8 duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex flex-col">
          {/* Explanation Banner */}
          <div className={`p-6 md:p-8 flex flex-col border-t-4 ${isCurrentlyCorrect ? 'bg-[#D7FFD7] border-[#58A700]' : 'bg-[#FFE5E5] border-[#EA4335]'}`}>
            <div className="max-w-7xl mx-auto w-full">
               <div className={`font-black text-2xl flex items-center mb-3 tracking-tight ${isCurrentlyCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>
                  {isCurrentlyCorrect ? <><CheckCircle2 className="w-7 h-7 mr-2" strokeWidth={2.5} /> Correct Answer</> : <><XCircle className="w-7 h-7 mr-2" strokeWidth={2.5} /> Incorrect Answer</>}
               </div>
               {currentQuestion.expEn && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-3 border-t border-black/10">
                   <div>
                     <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCurrentlyCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Explanation</span>
                     <p className={`text-[15px] font-medium leading-relaxed ${isCurrentlyCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{currentQuestion.expEn}</p>
                   </div>
                   <div>
                     <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCurrentlyCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Giải thích</span>
                     <p className={`text-[15px] font-medium italic leading-relaxed ${isCurrentlyCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{currentQuestion.expVn}</p>
                   </div>
                 </div>
               )}
            </div>
          </div>
          
          {/* Review Navigator */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
              <button onClick={handlePrevReview} disabled={currentQIndex === 0} className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30">Previous</button>
              <button onClick={handleNextReview} className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#58cc02] border-[#58a700] hover:bg-[#46a802]">
                {currentQIndex === totalQuestions - 1 ? 'Finish Review' : 'Next Review'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
</file>

<file path="src/tasks/Notes.jsx">
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, BookOpen, Scale, Target, 
  MessageSquare, ShieldCheck, CheckCircle2, Construction, 
  PlayCircle, PauseCircle, Maximize2, X, Pencil
} from 'lucide-react';
import TopBar from '../components/TopBar';

const IconMap = { BookOpen, Scale, Target, MessageSquare, ShieldCheck };

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

export default function Notes({ slides, onComplete, onQuit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const audioRef = useRef(null);
  const activeAudioUrl = useRef(null); 

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch(e) {
        console.warn("Audio cleanup error:", e);
      }
    }
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  useEffect(() => {
    stopAudio();
  }, [currentIndex]);

  const handleQuit = () => {
    stopAudio();
    if (typeof onQuit === 'function') onQuit();
  };

  const handleComplete = () => {
    stopAudio();
    if (typeof onComplete === 'function') onComplete();
  };

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Notes Unavailable</h2>
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 mb-6 text-sm font-bold text-slate-500">
          No lecture slides have been configured for this module yet.
        </div>
        <button onClick={handleQuit} className="px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const currentSlide = slides[currentIndex];

  const toggleAudio = (rawUrl) => {
    if (!rawUrl) return;
    const resolvedUrl = getAssetUrl(rawUrl);

    try {
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        if (!audioRef.current || activeAudioUrl.current !== resolvedUrl) {
          if (audioRef.current) audioRef.current.pause();
          audioRef.current = new Audio(resolvedUrl);
          activeAudioUrl.current = resolvedUrl;
          audioRef.current.onended = () => setIsPlayingAudio(false);
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingAudio(true)).catch(error => {
            console.warn("Audio playback prevented by browser:", error);
            setIsPlayingAudio(false);
          });
        }
      }
    } catch (e) {
      console.warn("Audio interaction failed:", e);
      setIsPlayingAudio(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const parseBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
  };

  const renderContent = (text) => {
    if (!text || typeof text !== 'string') return null;
    const lines = text.split('\n');
    const elements = [];
    let groupedBumpers = [];

    const flushBumpers = () => {
      if (groupedBumpers.length > 0) {
        elements.push(
          <div key={`bumper-${elements.length}`} className="my-4 bg-amber-50/60 border-l-[4px] border-amber-400 p-4 rounded-r-xl relative animate-in fade-in transition-all">
            <div className="absolute -left-[14px] top-4 bg-amber-400 text-amber-900 p-1.5 rounded-full shadow-sm border-[2px] border-white z-10">
              <Pencil className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="space-y-2 ml-3">
              {groupedBumpers.map((line, idx) => (
                <p key={idx} className="text-amber-900 font-medium text-base lg:text-lg leading-relaxed">
                  {parseBold(line)}
                </p>
              ))}
            </div>
          </div>
        );
        groupedBumpers = [];
      }
    };

    lines.forEach((line, i) => {
      if (!line.trim()) {
        flushBumpers();
        elements.push(<div key={`space-${i}`} className="h-2" />);
      } else if (line.trim().startsWith('>')) {
        groupedBumpers.push(line.replace('>', '').trim());
      } else {
        flushBumpers();
        elements.push(
          <p key={`p-${i}`} className="mb-3 text-slate-700 text-base lg:text-lg leading-relaxed font-medium">
            {parseBold(line)}
          </p>
        );
      }
    });
    flushBumpers(); 
    return elements;
  };

  const hasDiagram = !!currentSlide.image;

  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans selection:bg-indigo-100 overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />

      {/* Unified TopBar Implementation */}
      <TopBar 
        onQuit={handleQuit} 
        current={currentIndex + 1} 
        total={slides.length} 
        modeTitle="Lesson Notes Module" 
      />

      <div className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8 z-10 overflow-hidden">
        <div className={`w-full max-h-full flex flex-col bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden transition-all duration-500 ${hasDiagram ? 'max-w-7xl' : 'max-w-4xl'}`}>
          
          {currentSlide.type === 'intro' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#1cb0f6]'} animate-in zoom-in-95 duration-500 overflow-y-auto`}>
              <div className="bg-white/20 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner border border-white/30">
                <BookOpen className="w-12 h-12 opacity-100" strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md leading-tight">{currentSlide.title || 'Introduction'}</h1>
              <p className="text-xl lg:text-2xl font-bold opacity-90 drop-shadow-sm max-w-2xl mx-auto">{currentSlide.subtitle}</p>
              
              {currentSlide.audio && (
                 <button onClick={() => toggleAudio(currentSlide.audio)} className="mt-8 mx-auto flex items-center bg-white text-slate-800 px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md">
                   {isPlayingAudio ? <PauseCircle className="w-5 h-5 mr-2 text-slate-800" /> : <PlayCircle className="w-5 h-5 mr-2 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'concept' && (() => {
            const SlideIcon = IconMap[currentSlide.icon] || BookOpen;
            const themeColor = currentSlide.color || 'bg-indigo-500';

            return (
              <>
                <div className={`${themeColor} p-5 lg:p-6 text-white flex items-center relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm shadow-inner border border-white/30 z-10">
                    <SlideIcon className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-black tracking-tight z-10 relative drop-shadow-md">{currentSlide.title || 'Concept'}</h2>
                  
                  {currentSlide.audio && (
                    <button 
                      onClick={() => toggleAudio(currentSlide.audio)} 
                      className="ml-auto z-10 bg-white/20 hover:bg-white/30 transition-colors p-2.5 rounded-full backdrop-blur-md shadow-md border border-white/30 active:scale-95"
                    >
                      {isPlayingAudio ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto min-h-0">
                  <div className={`p-6 lg:p-10 flex-1 flex flex-col justify-center ${hasDiagram ? 'lg:border-r border-slate-100 lg:w-[45%]' : ''}`}>
                    <div>{renderContent(currentSlide.content)}</div>
                    
                    {currentSlide.example && (
                      <div className={`${themeColor.replace('bg-', 'bg-').replace('500', '50').replace('400', '50')} bg-opacity-50 border-2 ${themeColor.replace('bg-', 'border-').replace('500', '200').replace('400', '200')} rounded-2xl p-5 relative mt-8 shadow-sm`}>
                        <div className={`absolute -top-3 left-6 ${themeColor} text-white text-[10px] lg:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm border border-white/20`}>
                          Example
                        </div>
                        <div className="text-base lg:text-xl font-bold text-slate-800 whitespace-pre-wrap mt-2 leading-relaxed">
                          {currentSlide.example}
                        </div>
                      </div>
                    )}
                  </div>

                  {hasDiagram && (
                    <div className="w-full lg:w-[55%] bg-slate-50/40 p-4 lg:p-8 flex flex-col items-center justify-center flex-shrink-0">
                      <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden group">
                        
                        <iframe 
                          src={getAssetUrl(currentSlide.image)} 
                          title={currentSlide.title || "Educational Diagram"}
                          className="absolute inset-0 w-full h-full pointer-events-none select-none"
                          scrolling="no"
                          frameBorder="0"
                        />
                        
                        <button 
                          onClick={() => setZoomedImage(getAssetUrl(currentSlide.image))}
                          className="absolute top-4 right-4 p-3 bg-white/95 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-xl shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-all z-10 scale-95 hover:scale-100 active:scale-95"
                          title="Expand Image"
                        >
                          <Maximize2 className="w-6 h-6" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {currentSlide.type === 'summary' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#14b8a6]'} animate-in zoom-in-95 duration-500 overflow-y-auto`}>
              <div className="bg-white/20 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner border border-white/30">
                <CheckCircle2 className="w-12 h-12 opacity-100" strokeWidth={3} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md leading-tight">{currentSlide.title || "Complete"}</h1>
              <p className="text-xl lg:text-2xl font-bold opacity-90 drop-shadow-sm max-w-2xl mx-auto">{currentSlide.subtitle}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-2">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="w-12 h-12 flex items-center justify-center rounded-xl border-[2px] border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-sm bg-white"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={3} />
          </button>
          
          <button 
            onClick={handleNext}
            className={`flex items-center px-8 py-3 rounded-xl font-black text-base lg:text-lg tracking-widest uppercase transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md
              ${currentIndex === slides.length - 1 
                ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]' 
                : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
          >
            {currentIndex === slides.length - 1 ? 'Finish' : 'Continue'} 
            {currentIndex !== slides.length - 1 && <ChevronRight className="w-5 h-5 ml-2 -mr-1" strokeWidth={3} />}
          </button>
        </div>
      </div>

      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button 
            onClick={() => setZoomedImage(null)} 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-rose-500 text-white rounded-full transition-colors shadow-xl border border-white/20 active:scale-95 z-50"
          >
            <X className="w-8 h-8" strokeWidth={2.5} />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-300">
             <iframe 
                src={zoomedImage} 
                title="Expanded Diagram"
                className="w-full h-full pointer-events-none select-none"
                scrolling="no"
                frameBorder="0"
              />
          </div>
        </div>
      )}
    </div>
  );
}
</file>

<file path="src/utils/aiGrader.js">
// Pointing to your live Vercel Production deployment!
const API_BASE_URL = 'https://y8-science-backend.vercel.app/api';

export const gradeShortAnswer = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeShortQA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to grade short answer:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const gradeDiagram = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeDiagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade diagram:", error);
    throw error;
  }
};

// NEW: Added the Essay grading endpoint!
export const gradeEssay = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeEssay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade essay:", error);
    throw error;
  }
};
</file>

<file path="src/utils/sound.js">
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let activeNodes = [];

export const playChime = (type) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  // Anti-Spam: Instantly kill any currently playing sound effects
  activeNodes.forEach(node => {
    try { node.stop(); node.disconnect(); } catch (e) { }
  });
  activeNodes = [];

  const playTone = (freq, startTime, duration, waveType = 'sine') => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Smooth envelope to make it sound like a bell/marimba (no harsh clicks)
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    activeNodes.push(osc);
  };

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    // Pleasant, bright "Ding-Ding" (C5 -> E5)
    playTone(523.25, now, 0.4); 
    playTone(659.25, now + 0.12, 0.6); 
  } else {
    // Soft, dull "Bloop" (Low F)
    playTone(174.61, now, 0.3, 'sine');
  }
};
</file>

<file path="src/utils/supabaseClient.js">
import { createClient } from '@supabase/supabase-js';

// We updated the key name here to match your .env exactly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// If the keys are missing, throw a clear warning so we know!
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🚨 Missing Supabase Environment Variables! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
</file>

<file path="src/views/YearDashboard.jsx">
import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction } from 'lucide-react';

import { useStudentProgress } from '../hooks/useStudentProgress';
import UnitCard from '../components/UnitCard';

import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA } from '../data/index';

const Recognition = lazy(() => import('../tasks/Recognition'));
const Spell = lazy(() => import('../tasks/Spell'));
const Dictation = lazy(() => import('../tasks/Dictation'));
const Reading = lazy(() => import('../tasks/Reading'));
const ShortAnswers = lazy(() => import('../tasks/ShortAnswers'));
const Diagrams = lazy(() => import('../tasks/Diagrams'));
const Essay = lazy(() => import('../tasks/Essay'));
const Assessment = lazy(() => import('../tasks/Assessment'));
const Notes = lazy(() => import('../tasks/Notes'));

const THEMES = {
  Y8: { bg: 'bg-indigo-50', banner: 'from-indigo-500 via-indigo-600 to-blue-700', iconBg: 'bg-indigo-100', iconText: 'text-indigo-700', accent: 'border-indigo-400' },
  Y9: { bg: 'bg-emerald-50', banner: 'from-emerald-500 via-emerald-600 to-teal-700', iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', accent: 'border-emerald-400' },
  ESL: { bg: 'bg-amber-50', banner: 'from-amber-500 via-amber-600 to-orange-700', iconBg: 'bg-amber-100', iconText: 'text-amber-700', accent: 'border-amber-400' },
  GED: { bg: 'bg-rose-50', banner: 'from-rose-500 via-rose-600 to-red-700', iconBg: 'bg-rose-100', iconText: 'text-rose-700', accent: 'border-rose-400' }
};

// Generic Fallback view for missing components
function PlaceholderView({ title, onQuit }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Construction className="w-12 h-12 text-amber-500" />
      </div>
      <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">{title}</h2>
      <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-10 text-lg font-bold text-slate-500">
        Under Construction / Coming Soon
      </div>
      <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
        Return to Dashboard
      </button>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  
  const { user, unitScores = {}, isLoadingDB, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  const [appState, setAppState] = useState('MENU');
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-bold tracking-widest uppercase animate-pulse">Syncing with Cloud...</p>
      </div>
    );
  }

  let META_DATA = [];
  let UNIT_DATA = {};
  let trackTitle = "";
  const currentTheme = THEMES[track] || THEMES.Y8;

  if (track === 'Y8') { META_DATA = Y8_META || []; UNIT_DATA = Y8_DATA || {}; trackTitle = "Year 8 Science"; }
  else if (track === 'Y9') { META_DATA = Y9_META || []; UNIT_DATA = Y9_DATA || {}; trackTitle = "Year 9 Science"; }
  else if (track === 'ESL') { META_DATA = ESL_META || []; UNIT_DATA = ESL_DATA || {}; trackTitle = "ESL Foundation"; }
  else if (track === 'GED') { META_DATA = GED_META || []; UNIT_DATA = GED_DATA || {}; trackTitle = "GED Prep"; }

  let totalTrackXP = 0;
  let maxTrackXP = META_DATA.length * 100; 
  
  META_DATA.forEach(unit => {
    const s = unitScores?.[unit.id] || {};
    totalTrackXP += (s.p1?.current || 0) + (s.p2?.current || 0) + (s.p3?.current || 0) + 
                    (s.p4?.current || 0) + (s.p5?.current || 0) + (s.p6?.current || 0) + 
                    (s.p7?.current || 0) + (s.p8?.current || 0) + (s.p9?.current || 0);
  });

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const startMode = (unitId, mode) => {
    setActiveUnit(unitId);
    const data = UNIT_DATA[unitId];
    if (!data) return;

    // Standardize the arrays
    const realW = (data.realWords || []).map(w => ({ ...w, isReal: true }));

    if (mode === 'WORD_REC' || mode === 'SPELLING') {
      setCurrentPool([...realW].sort(() => Math.random() - 0.5));
    } else if (mode === 'DICTATION') {
      const dictationData = data.dictation || [];
      const dictationPool = realW.map((w, i) => ({
        ...w,
        dictSent: dictationData[i]?.sent || w.sent,
        dictVn: dictationData[i]?.vnSent || w.vnSent
      })).sort(() => Math.random() - 0.5);
      setCurrentPool(dictationPool);
    } else if (mode === 'READ_COMP') {
      setCurrentPool(data.passages || []);
    } else if (mode === 'SHORT_ANSWERS') {
      setCurrentPool({ shortQA: data.shortQA || [] });
    } else if (mode === 'DIAGRAMS') {
      setCurrentPool({ diagrams: data.diagrams || [] });
    } else if (mode === 'ESSAY') {
      setCurrentPool({ essay: data.essay || null });
    } else if (mode === 'ASSESSMENT') {
      setCurrentPool([]); // Assessment pulls full unit data directly in render
    } else if (mode === 'NOTES') {
      setCurrentPool(data.notes || []);
    }
    
    setAppState(mode);
  };

  const handleTaskComplete = async (section, score, answers = null) => {
    await saveScore(activeUnit, section, score, answers);
    setAppState('MENU');
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} selection:bg-indigo-200 selection:text-indigo-900 transition-colors duration-500`}>
      {appState === 'MENU' && (
        <div className="animate-in fade-in duration-500 pb-20">
          
          <div className={`relative w-full bg-gradient-to-r ${currentTheme.banner} shadow-xl overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-white opacity-20 rounded-full blur-[90px] mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -left-24 w-[25rem] h-[25rem] bg-black opacity-20 rounded-full blur-[70px] mix-blend-multiply"></div>
              <div className="absolute top-10 left-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-[60px] animate-pulse"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.2] mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                <div className="flex items-center space-x-6">
                  <button onClick={() => navigate('/home')} className="bg-white/10 p-4 rounded-2xl hover:bg-white/25 transition-all text-white backdrop-blur-md active:scale-95 shadow-sm border border-white/20">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-md">{trackTitle}</h1>
                    <div className="inline-flex bg-gradient-to-b from-amber-400 to-amber-500 text-amber-900 px-5 py-2.5 rounded-2xl shadow-lg border-b-[4px] border-amber-600 items-center space-x-3 backdrop-blur-md">
                      <span className="text-2xl drop-shadow-sm">🏆</span>
                      <span className="text-[13px] font-black uppercase tracking-widest opacity-90 mt-0.5">Total XP</span>
                      <span className="text-lg font-black bg-white/40 px-3 py-0.5 rounded-xl shadow-inner border border-white/30">{totalTrackXP} / {maxTrackXP}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white">
                  <button onClick={() => setShowHowItWorks(true)} className="flex items-center bg-white/10 px-5 py-3.5 rounded-2xl text-sm font-bold hover:bg-white/25 transition-all shadow-sm backdrop-blur-md border border-white/20 active:scale-95">
                    <Info className="w-5 h-5 mr-2 opacity-90" /> How it Works
                  </button>
                  <div className="flex items-center bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm pl-5 pr-3 group transition-all hover:bg-white/15">
                    <span className="font-black text-sm uppercase tracking-widest text-white mr-4 drop-shadow-sm">{userName}</span>
                    <button onClick={handleLogout} className="bg-white/20 hover:bg-rose-500 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95" title="Logout">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-10">
            {META_DATA.map((metaUnit) => {
              const contentData = UNIT_DATA[metaUnit.id] || {};
              const combinedUnitPayload = {
                ...contentData,
                id: metaUnit.id,
                meta: {
                  id: metaUnit.id,
                  title: metaUnit.title,
                  description: metaUnit.desc,
                  icon: contentData.meta?.icon || 'BookOpen',
                  thresholds: contentData.meta?.thresholds
                }
              };

              return (
                <UnitCard 
                  key={metaUnit.id} 
                  unit={combinedUnitPayload} 
                  scores={unitScores?.[metaUnit.id] || {}} 
                  currentTheme={currentTheme} 
                  startMode={startMode} 
                />
              );
            })}
          </div>
        </div>
      )}

      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full p-8 md:p-10 relative max-h-[90vh] overflow-y-auto">
             <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-3xl font-black text-slate-800 flex items-center tracking-tight"><div className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-4 shadow-inner"><Info className="w-7 h-7"/></div>How it Works</h2>
                <button onClick={() => setShowHowItWorks(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><XCircle className="w-8 h-8"/></button>
             </div>
             
             <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
               Welcome to the <strong className="text-slate-800">Science Lab</strong>! This platform uses <strong className="text-indigo-600">CLIL</strong> (Content and Language Integrated Learning) to help you master English through real scientific concepts. Here is how your learning journey works:
             </p>
             
             <div className="space-y-4 mb-8">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 1: Core Practice</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Fast-paced language drills inspired by the <strong>DET</strong> (Duolingo English Test) and <strong>PTE</strong> formats. Build your spelling, listening, and reading skills.</p>
                 </div>
               </div>
               
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 2: AI Graded Writing</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Practice short answers and essays. Our AI Tutor grades your work instantly using the official <strong>Cambridge Mark Scheme</strong> to give you personalized feedback.</p>
                 </div>
               </div>
             </div>

             <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl mb-8 flex items-start shadow-sm">
               <AlertTriangle className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-black text-rose-800 text-sm uppercase tracking-widest mb-1 opacity-90">AI Monitoring & Safety</h4>
                 <p className="text-rose-700 text-sm font-medium leading-relaxed">
                   Student submissions to the AI grader are monitored. Any harmful, inappropriate, or "joke" answers are flagged. <strong>After 3 strikes</strong>, you will be permanently locked out of the AI Tutor for that unit and can only earn partial points.
                 </p>
               </div>
             </div>
             
             <div className="flex justify-end">
               <button onClick={() => setShowHowItWorks(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest px-10 py-4 rounded-2xl border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-md">
                 Understood
               </button>
             </div>
          </div>
        </div>
      )}

      {/* FIXED: Removed Notes from Fallback to avoid collision and allow real module to render */}
      {appState === 'WORKBOOK' && <PlaceholderView title="Extra Workbook Practice" onQuit={() => setAppState('MENU')} />}
      {appState === 'GAMES' && <PlaceholderView title="Vocabulary Mini-Games" onQuit={() => setAppState('MENU')} />}

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 animate-spin text-indigo-500" /></div>}>
        {appState === 'WORD_REC' && <Recognition pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p1', s)} />}
        {appState === 'SPELLING' && <Spell pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p2', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'DICTATION' && <Dictation pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p3', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'READ_COMP' && <Reading pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p4', s)} onQuit={() => setAppState('MENU')} />}
        
        {/* FIXED: Active rendering of Notes with proper payload */}
        {appState === 'NOTES' && <Notes slides={currentPool} onComplete={() => handleTaskComplete('p10', 10)} onQuit={() => setAppState('MENU')} />}

        {appState === 'SHORT_ANSWERS' && (
          <ShortAnswers 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p6?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p6', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
        
        {appState === 'DIAGRAMS' && (
          <Diagrams 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p7?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p7', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ESSAY' && (
          <Essay 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p8?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p8', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ASSESSMENT' && (
          <Assessment 
            unit={UNIT_DATA[activeUnit]} 
            onComplete={(score) => handleTaskComplete('p9', score)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
      </Suspense>

    </div>
  );
}
</file>

</files>
