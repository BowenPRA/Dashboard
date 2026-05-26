// src/components/towerdefense/HUD.jsx
import React from 'react';
import { Coins, Heart, Play, X, Shield, ShieldCheck, FastForward } from 'lucide-react';

function formatScore(num) {
  if (num >= 10000) return Number((num / 1000).toFixed(1)) + 'k';
  return num;
}

export default function HUD({
  credits, lives, wave, totalWaves, score, bestScore, speed,
  gameState, waveInProgress, autoPlay,
  onStartWave, onToggleAutoPlay, onSetSpeed, onQuit
}) {
  return (
    <header className="relative z-30 bg-slate-800 border-b-4 border-slate-950 flex flex-col md:flex-row items-center px-4 sm:px-6 justify-between flex-shrink-0 shadow-sm py-3 md:py-0 md:h-16 gap-3 md:gap-0">
      
      {/* Top Row / Desktop Left & Right Wraps */}
      <div className="flex w-full md:w-auto items-center justify-between">
        
        {/* Left: Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1CB0F6] border-b-4 border-[#1899D6] mr-2">
            <Shield className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          
          <StatPill icon={<Coins className="w-5 h-5 text-[#FFC800]" />} value={credits} size="lg" />
          <StatPill icon={<Heart className="w-5 h-5 text-[#EA2B2B]" />} value={lives} size="lg" />
          
          <div className="hidden md:flex flex-col ml-2 justify-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Score</div>
            <div className="text-white font-black leading-none text-xl tabular-nums">{formatScore(score)}</div>
          </div>

          {/* Prominent High Score Tag */}
          {bestScore > 0 && (
            <div className="hidden md:flex flex-col ml-3 justify-center items-center px-3 py-1 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-xl border-b-2 border-amber-600 shadow-md transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="text-[9px] font-black text-amber-900 uppercase tracking-widest leading-none">Best</div>
              <div className="text-amber-950 font-black leading-none text-lg tabular-nums drop-shadow-sm">{formatScore(bestScore)}</div>
            </div>
          )}
        </div>

        {/* Mobile-only Speed & Exit (Stays top-right) */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center bg-slate-900 border-b-4 border-slate-950 rounded-2xl p-1 h-10">
            <FastForward className="w-4 h-4 text-slate-500 mx-1.5 hidden sm:block" strokeWidth={3} />
            {[1, 2, 3].map(s => (
              <button
                key={s} onClick={() => onSetSpeed(s)}
                className={`px-2 h-7 text-xs font-black rounded-xl transition-all uppercase ${speed === s ? 'bg-[#1CB0F6] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {s}×
              </button>
            ))}
          </div>

          <button
            onClick={onQuit} title="Exit"
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 active:border-b-0 active:translate-y-[4px] text-white transition-all"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* CENTER: Wave Controls (Stacks underneath main header on mobile) */}
      <div className="flex items-center justify-center w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 gap-2 bg-slate-900 p-1.5 rounded-[1.25rem] border-b-4 border-slate-950 shadow-inner">
        <div className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest tabular-nums border-r-2 border-slate-700">
          Wave {wave}/{totalWaves}
        </div>
        
        {!waveInProgress && gameState === 'PLAYING' ? (
          <button
            onClick={onStartWave}
            className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-[#58A700] hover:bg-[#46a802] text-white font-black uppercase tracking-widest text-xs transition-all shadow-sm"
          >
            <Play className="w-4 h-4 fill-white" strokeWidth={3} /> Next
          </button>
        ) : (
          <div className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-slate-800 text-slate-500 font-black uppercase tracking-widest text-xs border border-slate-700">
            {waveInProgress ? <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> : <ShieldCheck className="w-4 h-4" />}
            {waveInProgress ? 'Live' : 'Clear'}
          </div>
        )}

        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center justify-center h-8 px-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border ${autoPlay ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/30' : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'}`}
          title="Auto-start next wave"
        >
          Auto
        </button>
      </div>

      {/* RIGHT: Desktop Speed & Exit */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-slate-900 border-b-4 border-slate-950 rounded-2xl p-1 h-10">
          <FastForward className="w-4 h-4 text-slate-500 mx-1.5" strokeWidth={3} />
          {[1, 2, 3].map(s => (
            <button
              key={s} onClick={() => onSetSpeed(s)}
              className={`px-3 h-7 text-xs font-black rounded-xl transition-all uppercase ${speed === s ? 'bg-[#1CB0F6] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              {s}×
            </button>
          ))}
        </div>

        <button
          onClick={onQuit} title="Exit"
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 active:border-b-0 active:translate-y-[4px] text-white transition-all"
        >
          <X className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}

function StatPill({ icon, value, size = "md" }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 rounded-2xl bg-slate-900 border-b-[3px] border-slate-950 font-black shadow-inner ${size === 'lg' ? 'h-10 text-base sm:text-lg' : 'h-8 text-sm'}`}>
      {icon}
      <span className="tabular-nums text-white leading-none mt-0.5">{value}</span>
    </div>
  );
}