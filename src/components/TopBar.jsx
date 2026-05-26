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