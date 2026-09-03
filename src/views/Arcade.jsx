import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Shield, Skull, Trophy, Lock, Loader2, Users, Award, ChevronLeft, ChevronRight,
  Crown, Medal, Map as MapIcon, Heart, Ban, Coins, Swords, Timer, Sparkles,
  LogOut, GraduationCap, Star,
} from 'lucide-react';

import { useStudentProgress, getGlobalGameLeaderboard } from '../utils/supabaseClient';
import { TRACK_REGISTRY, TRACK_IDS, ARCADE_TRACK_ID } from '../components/trackRegistry';
import { isPreviewAccount } from '../utils/previewAccount';
import { arcadeConfig, ARCADE_LEVELS } from '../components/towerdefense/unitDifficulty';
import { ARCADE_KEY, SURVIVOR_KEY, ARCADE_BOARDS } from '../utils/progressSchema';
import {
  availableUnits, goldBalance, goldEarned, freePlayState,
  PLAY_COST, GOLD_PER_XP, FREE_PLAY_MIN_XP,
} from '../arcade/economy';
import { arcadeQuestionSource } from '../arcade/questionSource';
import TowerDefense from '../tasks/games/TowerDefense';
import Survivor from '../tasks/games/Survivor';

/** The tracks a student can see — the same rule Home uses, minus the arcade. */
function visibleTrackIdsFor(user) {
  const enrolled =
    user?.app_metadata?.enrolled_tracks ?? user?.user_metadata?.enrolled_tracks;
  let ids;
  if (isPreviewAccount(user)) ids = TRACK_IDS;
  else if (Array.isArray(enrolled) && enrolled.length > 0) ids = enrolled;
  else ids = TRACK_REGISTRY.filter((t) => t.group === 'GED').map((t) => t.id);
  return ids.filter((id) => id !== ARCADE_TRACK_ID);
}

export default function Arcade() {
  const navigate = useNavigate();
  const { user, allProgress, isLoadingDB, saveScore, spendGold, handleLogout } =
    useStudentProgress(navigate, ARCADE_TRACK_ID);

  const [selectedId, setSelectedId] = useState(ARCADE_LEVELS[0].id);
  const [activeGame, setActiveGame] = useState(null); // null | 'TD' | 'SURVIVOR'
  const [view, setView] = useState('HUB'); // 'HUB' | 'LEADERBOARD'
  const [toast, setToast] = useState(null);

  const [boardId, setBoardId] = useState(ARCADE_BOARDS[0].id);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);
  const [boardPending, setBoardPending] = useState(false);

  // The economy, all derived from progress. Gold earned is a pure read of XP —
  // one coin per point — so it climbs the instant a task is saved anywhere.
  const units = useMemo(() => availableUnits(visibleTrackIdsFor(user)), [user]);
  const earned = useMemo(() => goldEarned(allProgress, units), [allProgress, units]);
  const balance = useMemo(() => goldBalance(allProgress, units), [allProgress, units]);
  const free = useMemo(() => freePlayState(allProgress, units), [allProgress, units]);

  // The questions the games will ask, drawn from what the student is studying.
  const questions = useMemo(
    () => arcadeQuestionSource(allProgress, units),
    [allProgress, units]
  );

  const level = useMemo(() => arcadeConfig(ARCADE_TRACK_ID, selectedId), [selectedId]);
  const levelNo = ARCADE_LEVELS.find((l) => l.id === selectedId)?.level || 1;

  // A flat build economy per run, eased up a touch on the harder maps — separate
  // from gold, which only decides whether the run is paid for at all.
  const startingCredits = Math.max(100, Math.round(150 * (level.creditMultiplier || 1)));

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const play = (game) => {
    if (!free.unlocked) {
      if (balance < PLAY_COST) {
        flash(`Not enough gold — you need ${PLAY_COST}. Earn gold by finishing tasks!`);
        return;
      }
      spendGold(PLAY_COST);
    }
    setActiveGame(game);
  };

  // Mirrors Games.handleGameComplete: the raw score rides in meta.arcadeScore and
  // arcadeKey names the cabinet's board, so saveScore folds it into the level's
  // leaderboard record atomically. The p12 XP is clamped to nothing (it is a
  // reward, not graded work) — the prize is the board.
  const finishGame = (score, arcadeKey) => {
    saveScore(selectedId, 'p12', 0, null, { arcadeScore: score, arcadeKey });
    setActiveGame(null);
  };

  const fetchScores = async (id = boardId) => {
    const board = ARCADE_BOARDS.find((b) => b.id === id) || ARCADE_BOARDS[0];
    setBoardId(id);
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    setBoardPending(false);

    const { data, error, pending } = await getGlobalGameLeaderboard(selectedId, 5, board.key);
    if (error) {
      setLeaderboardError('Failed to synchronize with network.');
      setLeaderboard([]);
    } else {
      setBoardPending(!!pending);
      setLeaderboard(data || []);
    }
    setLoadingLeaderboard(false);
  };

  const openLeaderboard = () => {
    fetchScores(boardId);
    setView('LEADERBOARD');
  };

  const renderRankBadge = (index) => {
    switch (index) {
      case 0: return <Crown className="w-6 h-6 text-amber-950" />;
      case 1: return <Medal className="w-6 h-6 text-slate-800" />;
      case 2: return <Medal className="w-6 h-6 text-amber-100" />;
      default: return <span className="font-black text-xl">#{index + 1}</span>;
    }
  };

  // --- a live game takes over the whole screen -------------------------------
  if (activeGame === 'TD') {
    return (
      <TowerDefense
        gameConfig={level}
        themeId={level.themeId}
        pool={questions.pool}
        unitId={selectedId}
        mathUnitId={questions.mathUnitId}
        startingCredits={startingCredits}
        onComplete={(score) => finishGame(score, ARCADE_KEY)}
        onQuit={() => setActiveGame(null)}
      />
    );
  }
  if (activeGame === 'SURVIVOR') {
    return (
      <Survivor
        gameConfig={level}
        pool={questions.pool}
        unitId={selectedId}
        mathUnitId={questions.mathUnitId}
        startingCredits={startingCredits}
        onComplete={(score) => finishGame(score, SURVIVOR_KEY)}
        onQuit={() => setActiveGame(null)}
      />
    );
  }

  if (isLoadingDB) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-[#FFC800] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-400 font-black tracking-widest uppercase">Loading Arcade</p>
      </div>
    );
  }

  const goldChip = (big = false) => (
    <div className={`flex items-center gap-2 bg-black/30 rounded-2xl border border-white/10 shadow-inner ${big ? 'px-5 py-3' : 'px-4 py-2'}`}>
      <Coins className={`${big ? 'w-6 h-6' : 'w-5 h-5'} text-[#FFC800] drop-shadow-sm`} fill="currentColor" strokeWidth={1.5} />
      <span className={`font-black tabular-nums text-white ${big ? 'text-2xl' : 'text-lg'}`}>{balance.toLocaleString()}</span>
      <span className="uppercase tracking-widest text-[10px] text-white/60 pt-0.5">gold</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 font-sans overflow-hidden">

      {toast && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
          <div className="bg-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black tracking-wide uppercase text-sm border-b-4 border-rose-700 flex items-center max-w-[90vw] text-center">
            <Lock className="w-5 h-5 mr-3 shrink-0" /> {toast}
          </div>
        </div>
      )}

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto p-6 sm:p-8">

          {view === 'HUB' && (
            <div className="animate-in fade-in duration-300">

              {/* header */}
              <div className="flex items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <button
                    onClick={() => navigate('/home')}
                    className="p-3 sm:p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all border-b-[6px] border-slate-950 active:border-b-0 active:translate-y-[6px] shrink-0"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </button>
                  <div className="min-w-0">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg truncate">Arcade</h1>
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px] sm:text-sm">Spend gold you earn by studying</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:block">{goldChip(true)}</div>
                  <button
                    onClick={handleLogout}
                    className="w-11 h-11 flex items-center justify-center bg-slate-800 rounded-2xl text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-all border-b-4 border-slate-950 active:border-b-0 active:translate-y-1"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="sm:hidden mb-6 flex justify-center">{goldChip(true)}</div>

              {/* how gold works */}
              <div className="bg-slate-800/70 border border-white/10 rounded-3xl p-5 sm:p-6 mb-4 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFC800] rounded-2xl flex items-center justify-center border-b-4 border-[#D1A300] shrink-0">
                    <Coins className="w-6 h-6 text-amber-950" fill="currentColor" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-white font-black text-lg sm:text-xl tracking-tight mb-1">How gold works</h2>
                    <p className="text-slate-300 font-bold text-sm leading-relaxed">
                      You earn <span className="text-[#FFC800]">{GOLD_PER_XP} gold for every 1 XP</span> — complete tasks and quizzes in your subjects to fill your purse.
                      Each game costs <span className="text-[#FFC800]">{PLAY_COST} gold</span> to play.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1.5 bg-black/30 rounded-xl px-3 py-1.5 text-xs font-black text-white/90 border border-white/10">
                        <Star className="w-4 h-4 text-[#FFC800]" fill="currentColor" /> {earned.toLocaleString()} earned
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-black/30 rounded-xl px-3 py-1.5 text-xs font-black text-white/90 border border-white/10">
                        <Coins className="w-4 h-4 text-[#FFC800]" fill="currentColor" /> {balance.toLocaleString()} to spend
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* free play status */}
              <div className={`rounded-3xl p-5 sm:p-6 mb-8 shadow-xl border ${free.unlocked ? 'bg-emerald-500/15 border-emerald-400/40' : 'bg-slate-800/70 border-white/10'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-b-4 shrink-0 ${free.unlocked ? 'bg-emerald-500 border-emerald-700' : 'bg-slate-700 border-slate-900'}`}>
                    {free.unlocked
                      ? <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                      : <GraduationCap className="w-6 h-6 text-slate-300" strokeWidth={2.5} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-white font-black text-lg sm:text-xl tracking-tight mb-1">
                      {free.unlocked ? 'Free Play unlocked! 🎉' : 'Unlock Free Play'}
                    </h2>
                    <p className="text-slate-300 font-bold text-sm leading-relaxed">
                      {free.unlocked
                        ? 'You have mastered every one of your units, so every arcade game is now FREE. Play as much as you like.'
                        : `Reach ${FREE_PLAY_MIN_XP}+ XP on every one of your units and all arcade games become free — forever.`}
                    </p>
                    {!free.unlocked && free.total > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
                          <span>Units mastered</span>
                          <span>{free.mastered} / {free.total}</span>
                        </div>
                        <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                            style={{ width: `${Math.round((free.mastered / free.total) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* level picker */}
              <div className="mb-6">
                <p className="text-slate-400 font-black tracking-widest uppercase text-xs mb-3">Select a level</p>
                <div className="flex flex-wrap gap-2.5">
                  {ARCADE_LEVELS.map((l) => {
                    const isSel = l.id === selectedId;
                    return (
                      <button
                        key={l.id}
                        onClick={() => setSelectedId(l.id)}
                        className={`px-4 py-2.5 rounded-2xl font-black text-sm border-b-4 transition-all active:border-b-0 active:translate-y-[4px]
                          ${isSel
                            ? 'bg-[#FFC800] text-amber-950 border-[#D1A300]'
                            : 'bg-slate-800 text-slate-300 border-slate-950 hover:bg-slate-700'}`}
                      >
                        Lv {l.level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* selected level meta */}
              <div className="bg-slate-800/70 border border-white/10 rounded-3xl p-5 sm:p-6 mb-6 shadow-xl">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tight">Level {levelNo} · {level.mapName}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-white/90 font-bold text-sm">
                  <span className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                    <Swords className="w-4 h-4" strokeWidth={2.5} /> {level.tierLabel}
                  </span>
                  <span className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                    <MapIcon className="w-4 h-4" strokeWidth={2.5} /> {level.mapName}
                  </span>
                  {level.modifierLabel && (
                    <span className="flex items-center gap-2 bg-[#FFC800] text-amber-950 px-3 py-1.5 rounded-xl border-b-2 border-[#D1A300] font-black uppercase tracking-wide text-xs">
                      <span className="leading-none text-base">{level.modifierIcon}</span> {level.modifierLabel}
                    </span>
                  )}
                  <span className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                    <Heart className="w-4 h-4 text-rose-400" fill="currentColor" /> {level.lives}
                  </span>
                  <span className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                    <Ban className="w-4 h-4 text-white/70" strokeWidth={2.5} />
                    {level.bannedTowers.length > 0 ? `${level.bannedTowers.length} banned` : 'No bans'}
                  </span>
                </div>
                {level.briefing && (
                  <p className="mt-4 text-white/85 font-medium text-sm leading-snug bg-black/20 border-l-4 border-white/30 rounded-r-xl px-4 py-3">
                    {level.briefing}
                  </p>
                )}
              </div>

              {/* cabinets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-6">
                <GameCabinet
                  title="Tower Defense"
                  Icon={Shield}
                  accent="#1CB0F6"
                  accentBorder="#1899D6"
                  blurb="Build a defence and hold the line, wave after wave. Answer Bolt questions mid-fight for a boost."
                  free={free.unlocked}
                  canAfford={balance >= PLAY_COST}
                  onPlay={() => play('TD')}
                />
                <GameCabinet
                  title="Swarm Survivor"
                  Icon={Skull}
                  accent="#EA2B2B"
                  accentBorder="#a81c1c"
                  blurb="You are the tower now — walk, dodge, and let your weapons fire. Every level-up question lets you choose what you become."
                  free={free.unlocked}
                  canAfford={balance >= PLAY_COST}
                  onPlay={() => play('SURVIVOR')}
                  extra={<span className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10 text-white/90 font-bold text-sm"><Timer className="w-4 h-4" strokeWidth={2.5} /> 4 min to the boss</span>}
                />
              </div>

              {/* leaderboard entry */}
              <button
                onClick={openLeaderboard}
                className="w-full group bg-[#FFC800] p-5 rounded-3xl border-b-[8px] border-[#D1A300] active:border-b-0 active:translate-y-[8px] transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/25 rounded-2xl flex items-center justify-center border-b-4 border-black/10">
                    <Trophy className="w-6 h-6 text-amber-950" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">Leaderboard</h2>
                    <p className="text-amber-900/80 font-bold text-xs sm:text-sm">Top runs on Level {levelNo}</p>
                  </div>
                </div>
                <ChevronRight className="w-7 h-7 text-amber-950 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>

            </div>
          )}

          {view === 'LEADERBOARD' && (
            <div className="animate-in zoom-in-95 duration-300 flex flex-col h-full py-2">
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setView('HUB')} className="bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all text-white border-b-4 border-slate-950 active:border-b-0 active:translate-y-1">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center drop-shadow-md">
                    <Award className="w-8 h-8 text-[#FFC800] mr-3" /> Leaderboard
                  </h2>
                  <p className="text-slate-400 font-bold tracking-widest uppercase mt-2 text-xs">Top 5 • Level {levelNo} · {level.mapName}</p>
                </div>
                <div className="w-16" />
              </div>

              <div className="flex justify-center gap-3 mb-6">
                {ARCADE_BOARDS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => fetchScores(b.id)}
                    className={`px-5 sm:px-7 py-3 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm border-b-4 transition-all active:border-b-0 active:translate-y-[4px]
                      ${b.id === boardId ? 'bg-[#FFC800] text-amber-950 border-[#D1A300]' : 'bg-slate-800 text-slate-400 border-slate-950 hover:bg-slate-700 hover:text-white'}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-slate-800 border-4 border-slate-900 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl overflow-y-auto">
                {loadingLeaderboard ? (
                  <div className="h-full flex flex-col items-center justify-center min-h-[360px]">
                    <Loader2 className="w-12 h-12 animate-spin text-[#FFC800] mb-4" />
                    <span className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing…</span>
                  </div>
                ) : leaderboardError ? (
                  <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px]">
                    <X className="w-16 h-16 text-rose-500 mb-4" />
                    <h3 className="text-2xl font-black text-white mb-2">Network Error</h3>
                    <p className="text-slate-400 font-medium">{leaderboardError}</p>
                  </div>
                ) : boardPending ? (
                  <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px] px-6">
                    <Lock className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-2xl font-black text-white mb-2">Board Not Online Yet</h3>
                    <p className="text-slate-400 font-medium max-w-sm">Scores are being recorded — this board switches on once your teacher finishes setting it up.</p>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px]">
                    <Users className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-2xl font-black text-white mb-2">No Runs Recorded</h3>
                    <p className="text-slate-400 font-medium">Be the first to post a score on this level!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div key={entry.id || index} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border-b-4 ${index === 0 ? 'bg-[#FFC800] border-[#D1A300]' : index === 1 ? 'bg-slate-300 border-slate-400' : index === 2 ? 'bg-amber-700 border-amber-900' : 'bg-slate-700 border-slate-900'}`}>
                        <div className="flex items-center mb-3 sm:mb-0">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 ${index === 0 ? 'bg-white/40 text-amber-950' : index === 1 ? 'bg-white/50 text-slate-800' : index === 2 ? 'bg-white/20 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                            {renderRankBadge(index)}
                          </div>
                          <span className={`block text-xl sm:text-2xl font-black tracking-wide ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : 'text-white'}`}>{entry.name}</span>
                        </div>
                        <div className="text-left sm:text-right bg-black/10 sm:bg-transparent rounded-xl p-3 sm:p-0">
                          <span className={`block text-xs font-black uppercase tracking-widest mb-1 ${index === 0 ? 'text-amber-900' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-amber-200' : 'text-slate-400'}`}>Score</span>
                          <span className={`text-3xl sm:text-4xl font-black tabular-nums ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : 'text-white'}`}>{entry.score.toLocaleString()}</span>
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
    </div>
  );
}

/** One playable cabinet: flavour, price and a Play button. */
function GameCabinet({ title, Icon, accent, accentBorder, blurb, free, canAfford, onPlay, extra }) {
  return (
    <div
      className="relative p-6 sm:p-7 rounded-[2.5rem] border-b-[8px] shadow-lg flex flex-col overflow-hidden"
      style={{ backgroundColor: accent, borderColor: accentBorder }}
    >
      <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl translate-x-10 -translate-y-10 pointer-events-none" />
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border-b-4 border-black/10 shrink-0">
          <Icon className="w-7 h-7 text-white" strokeWidth={3} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm tracking-tight">{title}</h2>
      </div>
      <p className="relative z-10 text-white/90 font-medium text-sm leading-snug mb-4">{blurb}</p>
      {extra && <div className="relative z-10 mb-5">{extra}</div>}
      <div className="relative z-10 mt-auto flex items-center justify-between gap-3">
        <button
          onClick={onPlay}
          className="bg-white font-black uppercase tracking-widest text-sm px-6 py-3 rounded-2xl shadow-sm border-b-4 border-slate-200 hover:scale-105 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
          style={{ color: accent }}
        >
          Play
        </button>
        {free ? (
          <span className="flex items-center gap-1.5 bg-emerald-500 text-white font-black uppercase tracking-widest text-xs px-4 py-2.5 rounded-2xl border-b-4 border-emerald-700">
            <Sparkles className="w-4 h-4" /> Free
          </span>
        ) : (
          <span className={`flex items-center gap-1.5 font-black text-sm px-4 py-2.5 rounded-2xl border border-white/10 ${canAfford ? 'bg-black/25 text-white' : 'bg-black/40 text-white/60'}`}>
            <Coins className="w-4 h-4 text-[#FFC800]" fill="currentColor" strokeWidth={1.5} />
            {PLAY_COST} gold
          </span>
        )}
      </div>
    </div>
  );
}
