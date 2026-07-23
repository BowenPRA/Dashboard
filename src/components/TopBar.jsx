import React, { useEffect, useState } from 'react';
import { BookOpen, X as XIcon, Sun, Moon, Clock, Languages } from 'lucide-react';

export default function TopBar({ 
  onQuit, 
  current, 
  total, 
  progress, 
  modeTitle, 
  timeLeft, 
  lang, 
  onLangToggle 
}) {
  const displayScore = current !== undefined ? current : 0;
  const displayTotal = total !== undefined ? total : 0;
  const displayProgress = progress !== undefined ? progress : (displayTotal > 0 ? (displayScore / displayTotal) * 100 : 0);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const formatTime = (seconds) => {
    if (seconds === undefined || seconds === null) return null;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex justify-between items-center p-3 sm:p-4 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-20 relative h-16 sm:h-20 transition-colors duration-300 shrink-0">
      
      {/* Left: Title & Module Identifier */}
      <div className="flex items-center text-slate-700 dark:text-slate-200 font-black text-lg w-auto md:w-1/4">
        <div className="flex items-center text-[#1CB0F6]">
          <BookOpen className="w-6 h-6 mr-2 drop-shadow-sm" strokeWidth={2.5} />
          <span className="hidden sm:inline whitespace-nowrap tracking-wide">{modeTitle || 'Assessment Module'}</span>
        </div>
      </div>

      {/* Center: Gamified 3D Progress Bar */}
      <div className="flex-1 mx-4 max-w-2xl hidden md:block">
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 sm:h-5 shadow-inner border-2 border-slate-300 dark:border-slate-700 overflow-hidden relative">
          <div 
            className="bg-[#58cc02] h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden" 
            style={{ width: `${displayProgress}%` }}
          >
            {/* White light gleam for 3D effect */}
            <div className="absolute top-1 left-2 right-2 h-1.5 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right: Actions & Vital Stats */}
      <div className="flex items-center justify-end w-auto md:w-1/4 gap-2 sm:gap-3">
        
        {/* Dynamic Countdown Timer */}
        {timeLeft !== undefined && timeLeft > 0 && (
          <div className={`flex items-center font-mono font-bold text-sm sm:text-base px-2 sm:px-3 py-1.5 rounded-xl border-2 shadow-sm transition-colors ${timeLeft < 60 ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" strokeWidth={2.5} />
            {formatTime(timeLeft)}
          </div>
        )}

        {/* Locale Language Toggle */}
        {onLangToggle && (
          <button 
            onClick={onLangToggle}
            className="flex items-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#1CB0F6] rounded-xl px-2 sm:px-3 py-1.5 border-2 border-slate-200 dark:border-slate-700 transition-colors active:scale-95 shadow-sm"
            title="Toggle Language"
          >
            <Languages className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1.5" strokeWidth={2.5}/>
            <span className="font-black uppercase tracking-widest text-xs sm:text-sm hidden sm:inline">{lang}</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-5 h-5" strokeWidth={2.5} />}
        </button>

        {/* Fraction Score Visual (Desktop) */}
        {displayTotal > 0 && (
          <div className="hidden sm:flex items-center space-x-1 font-black text-xs sm:text-sm px-3 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase tracking-widest shadow-sm">
            <span className="text-[#58cc02]">{displayScore}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-500 dark:text-slate-400">{displayTotal}</span>
          </div>
        )}

        {/* Mobile Minimal Score */}
        {displayTotal > 0 && (
          <div className="sm:hidden font-black text-sm text-slate-400 tracking-wider pl-1">
            {displayScore}/{displayTotal}
          </div>
        )}

        <button 
          onClick={onQuit} 
          className="flex items-center text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-black text-sm uppercase tracking-wider transition-colors active:scale-95 group ml-1"
          title="Save & Quit"
        >
          <XIcon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}