import React, { useState, useMemo } from 'react';
import {
  X, Shield, Trophy, Lock, Loader2, Users, Award, ChevronLeft,
  Crown, Medal, Map as MapIcon, Heart, Ban, Coins, Swords, Skull, Timer, Sparkles
} from 'lucide-react';
import { getGlobalGameLeaderboard } from '../utils/supabaseClient';
import TowerDefense from './games/TowerDefense';
import Survivor from './games/Survivor';
import TowerVisual from '../components/towerdefense/TowerVisual';
import { arcadeConfig } from '../components/towerdefense/unitDifficulty';
import { ARCADE_KEY } from '../utils/progressSchema';

export default function Games({ pool, unitId, track, scores, onComplete, onQuit }) {
  const [view, setView] = useState('MENU');
  const [toast, setToast] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  // The arcade key holds the raw game score, not unit XP — counting it here
  // would let one good run bankroll the next.
  const IGNORED = [ARCADE_KEY, 'games', 'strikes'];
  const unitXP = Object.entries(scores || {})
    .filter(([key]) => !IGNORED.includes(key))
    .reduce((sum, [, section]) => sum + (Number(section?.current) || 0), 0);

  // The arena comes from the track and the difficulty from the unit — see
  // unitDifficulty.js. A unit's games.js may hand down its own config (that is
  // what taskRegistry attaches to the pool); otherwise it is derived here so a
  // unit that only declares `{ gameConfig: {} }` still gets its track's map.
  const gameConfig = useMemo(
    () => arcadeConfig(track, unitId, pool?.gameConfig || {}),
    [track, unitId, pool]
  );

  // Study pays for the defence, and harder units hand out a thinner purse — but
  // never below a floor that buys a real opening (a few towers), so a low-XP
  // unlock on a hard unit still gets a playable start rather than one sentry.
  const startingCredits = Math.max(
    100,
    Math.round(unitXP * 2 * (gameConfig.creditMultiplier || 1))
  );

  const fetchScores = async () => {
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    const { data, error } = await getGlobalGameLeaderboard(unitId, 5); 
    
    if (error) {
      setLeaderboardError('Failed to synchronize with network.');
    } else {
      setLeaderboard(data || []);
    }
    setLoadingLeaderboard(false);
  };

  const handleModeSelect = (mode) => {
    if (mode === 'WALL') {
      setToast('The Wall Mode is currently in development!');
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (mode === 'LEADERBOARD') {
      fetchScores();
      setView('LEADERBOARD');
      return;
    }
    if (mode === 'TD' || mode === 'SURVIVOR') {
      setView(mode);
    }
  };

  const renderRankBadge = (index) => {
    switch(index) {
      case 0: return <Crown className="w-6 h-6 text-amber-950" />;
      case 1: return <Medal className="w-6 h-6 text-slate-800" />;
      case 2: return <Medal className="w-6 h-6 text-amber-100" />;
      default: return <span className="font-black text-xl">#{index + 1}</span>;
    }
  };

  // The raw score travels as `meta.arcadeScore`, which saveScore folds into the
  // unit's `GAMES` record in the same atomic update as the XP. Writing it here
  // with a separate supabase round-trip used to lose the score: saveScore
  // rewrites the whole progress JSON from React state, which knows nothing about
  // an out-of-band write, so the next task saved anywhere clobbered it.
  const handleGameComplete = (score) => {
    if (onComplete) onComplete(score, null, { arcadeScore: score });
  };

  if (view === 'TD') {
    return (
      <TowerDefense
        pool={pool}
        unitId={unitId}
        gameConfig={gameConfig}
        startingCredits={startingCredits}
        onComplete={handleGameComplete}
        onQuit={() => setView('MENU')}
      />
    );
  }

  // The second cabinet. It takes the identical props: the same purse, the same
  // arena config and the same completion callback, so a unit that has one game
  // has both without authoring anything extra.
  if (view === 'SURVIVOR') {
    return (
      <Survivor
        pool={pool}
        unitId={unitId}
        gameConfig={gameConfig}
        startingCredits={startingCredits}
        onComplete={handleGameComplete}
        onQuit={() => setView('MENU')}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {toast && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
          <div className="bg-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black tracking-widest uppercase border-b-4 border-rose-700 flex items-center">
            <Lock className="w-6 h-6 mr-3" /> {toast}
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
      </div>

      {/* Scrolls rather than clips: with two full mission cards the menu is taller
          than a laptop viewport, and a clipped card is an unreachable game. */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        
        {/* MENU VIEW */}
        {view === 'MENU' && (
          <div className="w-full max-w-5xl my-auto animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-2">Arcade Hub</h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-sm md:text-base">Select your deployment protocol</p>
              </div>
              <button onClick={onQuit} className="p-4 bg-slate-800 hover:bg-rose-500 rounded-2xl transition-all border-b-[6px] border-slate-950 hover:border-rose-700 active:border-b-0 active:translate-y-[6px]">
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Refined Minimal Tower Defense Button */}
              <button onClick={() => handleModeSelect('TD')} className="relative group bg-[#1CB0F6] p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-[#1899D6] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg flex flex-col h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-8 drop-shadow-md relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border-b-4 border-black/10 shrink-0">
                    <Shield className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-sm tracking-tight">Tower Defense</h2>
                </div>
                
                {/* Minimal Meta Row (Badges) */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-white/90 font-bold text-sm sm:text-base mb-8 relative z-10">
                  
                  {/* Map */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <MapIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span>{gameConfig.mapName || gameConfig.mapId}</span>
                  </div>

                  {/* Difficulty tier */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Swords className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span>{gameConfig.tierLabel}</span>
                  </div>

                  {/* Mission modifier — only on levels that field one */}
                  {gameConfig.modifierLabel && (
                    <div className="flex items-center gap-2 bg-[#FFC800] text-amber-950 px-3 py-1.5 rounded-xl border-b-2 border-[#D1A300] shadow-inner font-black">
                      <span className="leading-none text-base">{gameConfig.modifierIcon}</span>
                      <span className="uppercase tracking-wide text-xs sm:text-sm">{gameConfig.modifierLabel}</span>
                    </div>
                  )}

                  {/* Lives */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                    <span>{gameConfig.lives}</span>
                  </div>
                  
                  {/* Bans */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Ban className="w-4 h-4 text-white/70" strokeWidth={2.5} />
                    <span className="text-white/70 uppercase tracking-widest text-[10px] sm:text-xs">Bans:</span>
                    {gameConfig.bannedTowers.length > 0 ? (
                      <div className="flex items-center gap-1.5 ml-1">
                        {gameConfig.bannedTowers.map(t => (
                          <div key={t} className="w-6 h-6 flex items-center justify-center bg-black/20 rounded-lg">
                            {/* Wraps SVG to perfectly miniaturize it */}
                            <div className="scale-[0.55] origin-center flex items-center justify-center">
                              <TowerVisual typeId={t} size="sm" dimmed={false} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-black text-white tracking-widest text-[10px] sm:text-xs uppercase ml-1">None</span>
                    )}
                  </div>

                </div>

                {/* Mission briefing — the level's flavour, or the modifier's
                    counter-strategy when it fields one. */}
                {gameConfig.briefing && (
                  <div className="relative z-10 -mt-3 mb-8 text-white/85 font-medium text-sm sm:text-base leading-snug bg-black/10 border-l-4 border-white/30 rounded-r-xl px-4 py-3">
                    {gameConfig.briefing}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto relative z-10">
                  <div className="bg-white text-[#1CB0F6] font-black uppercase tracking-widest text-sm sm:text-base px-6 py-3 rounded-2xl shadow-sm border-b-4 border-slate-200 group-hover:scale-105 transition-transform">
                    Play
                  </div>
                  
                  <div className="text-white font-black text-sm sm:text-base flex items-center gap-2 bg-black/10 px-4 py-2.5 rounded-2xl border border-white/10 shadow-inner">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-white/80 pt-0.5">XP Bonus</span> 
                    <span className="text-xl leading-none">{unitXP}</span>
                    <Coins className="w-5 h-5 text-[#FFC800] drop-shadow-sm" fill="currentColor" strokeWidth={1.5} />
                  </div>
                </div>
              </button>

              <button onClick={() => handleModeSelect('LEADERBOARD')} className="relative group bg-[#FFC800] p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-[#D1A300] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg flex flex-col h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border-b-4 border-black/10 shadow-sm shrink-0 relative z-10">
                  <Trophy className="w-7 h-7 text-amber-950" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-amber-950 mb-2 drop-shadow-sm relative z-10">Leaderboard</h2>
                <p className="text-amber-900/80 font-bold text-sm sm:text-base mb-8 relative z-10">Global Rankings</p>
                <div className="flex items-center mt-auto relative z-10">
                  <p className="text-amber-900 font-black uppercase tracking-widest text-xs sm:text-sm bg-black/10 px-4 py-2.5 rounded-2xl">View Top 5</p>
                </div>
              </button>

              {/* Swarm Survivor — the same unit, the same purse, the same
                  leaderboard, played from inside the swarm instead of above it. */}
              <button onClick={() => handleModeSelect('SURVIVOR')} className="relative group bg-[#EA2B2B] p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-[#a81c1c] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg flex flex-col h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8 drop-shadow-md relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border-b-4 border-black/10 shrink-0">
                    <Skull className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-sm tracking-tight">Swarm Survivor</h2>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-white/90 font-bold text-sm sm:text-base mb-6 relative z-10">
                  <div className="flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Swords className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span>{gameConfig.tierLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Timer className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span>4 min to the boss</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Sparkles className="w-4 h-4 text-[#FFC800]" strokeWidth={2.5} />
                    <span>Level up · pick upgrades</span>
                  </div>
                </div>

                <div className="relative z-10 mb-8 text-white/85 font-medium text-sm sm:text-base leading-snug bg-black/15 border-l-4 border-white/30 rounded-r-xl px-4 py-3">
                  You are the tower now. Walk, dodge and let your weapons fire themselves — every level-up
                  question you answer lets you <span className="font-black">choose</span> what you become.
                </div>

                <div className="flex items-center justify-between mt-auto relative z-10">
                  <div className="bg-white text-[#EA2B2B] font-black uppercase tracking-widest text-sm sm:text-base px-6 py-3 rounded-2xl shadow-sm border-b-4 border-slate-200 group-hover:scale-105 transition-transform">
                    Play
                  </div>
                  <div className="text-white font-black text-sm sm:text-base flex items-center gap-2 bg-black/15 px-4 py-2.5 rounded-2xl border border-white/10 shadow-inner">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-white/80 pt-0.5">Loadout</span>
                    <span className="text-xl leading-none">{startingCredits}</span>
                    <Coins className="w-5 h-5 text-[#FFC800] drop-shadow-sm" fill="currentColor" strokeWidth={1.5} />
                  </div>
                </div>
              </button>

              <button onClick={() => handleModeSelect('WALL')} className="relative group bg-slate-800 p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-slate-950 active:border-b-0 active:translate-y-[8px] transition-all text-left opacity-80 hover:opacity-100 overflow-hidden h-full flex flex-col">
                <div className="absolute top-6 right-6 bg-slate-700 text-slate-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-600 shadow-inner">Coming Soon</div>
                <Lock className="w-12 h-12 text-slate-500 mb-8" strokeWidth={2.5} />
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">The Wall</h2>
                <p className="text-slate-400 font-bold text-sm sm:text-base">Multiplayer cooperative defense.</p>
              </button>

            </div>
          </div>
        )}

        {/* LEADERBOARD VIEW */}
        {view === 'LEADERBOARD' && (
          <div className="w-full max-w-4xl animate-in zoom-in-95 duration-300 flex flex-col h-full py-6">
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setView('MENU')} className="bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all text-white border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 shadow-sm">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center drop-shadow-md">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFC800] mr-2 sm:mr-4" /> Global Leaderboard
                </h2>
                {/* One board per unit, shared by both cabinets: the score that
                    counts is the best arcade run on this unit, whichever game
                    it came from. Two boards would need a schema change on the
                    server-side leaderboard function, and would also split a
                    small class in half. */}
                <p className="text-slate-400 font-bold tracking-widest uppercase mt-2 text-xs sm:text-sm">Top 5 Commanders • Sector {unitId}</p>
                <p className="text-slate-500 font-bold mt-1 text-[11px] sm:text-xs">Best run from either game counts</p>
              </div>
              <div className="w-16"></div> 
            </div>

            <div className="flex-1 bg-slate-800 border-4 border-slate-900 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl overflow-y-auto">
              {loadingLeaderboard ? (
                <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 className="w-12 h-12 animate-spin text-[#FFC800] mb-4" />
                  <span className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing Orbital Data...</span>
                </div>
              ) : leaderboardError ? (
                <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <X className="w-16 h-16 text-rose-500 mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">Network Error</h3>
                  <p className="text-slate-400 font-medium">{leaderboardError}</p>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <Users className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">No Deployments Recorded</h3>
                  <p className="text-slate-400 font-medium">Be the first agent to secure this sector!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.id || index} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border-b-4 transition-transform hover:scale-[1.01] ${index === 0 ? 'bg-[#FFC800] border-[#D1A300]' : index === 1 ? 'bg-slate-300 border-slate-400' : index === 2 ? 'bg-amber-700 border-amber-900' : 'bg-slate-700 border-slate-900'}`}>
                      
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-sm ${index === 0 ? 'bg-white/40 text-amber-950' : index === 1 ? 'bg-white/50 text-slate-800' : index === 2 ? 'bg-white/20 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                          {renderRankBadge(index)}
                        </div>
                        <div>
                          <span className={`block text-xl sm:text-2xl font-black tracking-wide ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>
                            {entry.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right bg-black/10 sm:bg-transparent rounded-xl p-3 sm:p-0">
                        <span className={`block text-xs font-black uppercase tracking-widest mb-1 ${index === 0 ? 'text-amber-900' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-amber-200' : 'text-slate-400'}`}>Score</span>
                        <span className={`text-3xl sm:text-4xl font-black tabular-nums ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>
                          {entry.score.toLocaleString()}
                        </span>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}