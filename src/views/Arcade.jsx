import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStudentProgress, getGlobalGameLeaderboard } from '../utils/supabaseClient';
import { TRACK_REGISTRY, TRACK_IDS, ARCADE_TRACK_ID } from '../components/trackRegistry';
import { isPreviewAccount } from '../utils/previewAccount';
import { arcadeConfig, ARCADE_LEVELS } from '../components/towerdefense/unitDifficulty';
import { ARCADE_KEY, SURVIVOR_KEY, ARCADE_BOARDS } from '../utils/progressSchema';
import {
  availableUnits, goldBalance, goldEarned, freePlayState,
  PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO,
} from '../arcade/economy';
import { arcadeQuestionSource } from '../arcade/questionSource';
import ProgressLoadError from '../components/ProgressLoadError';
import { ArcadeShell, ArcadeHub, ArcadeLeaderboard, ArcadeLoading } from '../components/arcade/ArcadeHub';
import TowerDefense from '../tasks/games/TowerDefense';
import Survivor from '../tasks/games/Survivor';

const ECONOMY = { PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO };

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

/** Every level with its resolved config, once — the campaign never changes at runtime. */
const LEVELS = ARCADE_LEVELS.map((l) => ({ ...l, cfg: arcadeConfig(ARCADE_TRACK_ID, l.id) }));

export default function Arcade() {
  const navigate = useNavigate();
  const { user, allProgress, isLoadingDB, loadError, saveScore, spendGold, handleLogout } =
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

  // The student's own best on a level's board: `current` is the high-water mark
  // recordAttempt keeps (supabaseClient folds arcade scores in under the board key).
  const bestOf = (levelId, boardKey) =>
    Number(allProgress?.[ARCADE_TRACK_ID]?.[levelId]?.[boardKey]?.current) || 0;

  // A flat build economy per run, eased up a touch on the harder maps — separate
  // from gold, which only decides whether the run is paid for at all.
  const startingCredits = Math.max(100, Math.round(150 * (level.creditMultiplier || 1)));

  // One timer at a time: an earlier toast's timeout must not clear a later toast.
  const toastTimer = useRef(null);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  // Survivor opens on a loadout screen with a Back button, so it is charged when
  // the run deploys (onStart), not here — backing out must not cost a play.
  // Tower Defense starts straight away, so it is charged on the way in.
  const play = (game) => {
    if (!free.unlocked) {
      if (balance < PLAY_COST) {
        flash(`Not enough gold — you need ${PLAY_COST}. Earn gold by finishing tasks!`);
        return;
      }
      if (game !== 'SURVIVOR') spendGold(PLAY_COST);
    }
    setActiveGame(game);
  };

  // Mirrors Games.handleGameComplete: the raw score rides in meta.arcadeScore and
  // arcadeKey names the cabinet's board, so saveScore folds it into the level's
  // leaderboard record atomically. The p12 XP is clamped to nothing (it is a
  // reward, not graded work) — the prize is the board.
  //
  // A score is banked the moment its run ends (onRunEnd), not only on Exit, so
  // "Play Again" followed by a closed tab cannot lose it. `banked` remembers the
  // best already saved this sitting so the same score is never logged twice.
  const banked = useRef(0);
  const bankScore = (score, arcadeKey) => {
    // Backing straight out scores nothing — don't put a 0 on the board for it.
    if (!(score > banked.current)) return;
    banked.current = score;
    saveScore(selectedId, 'p12', 0, null, { arcadeScore: score, arcadeKey });
  };
  const finishGame = (score, arcadeKey) => {
    bankScore(score, arcadeKey);
    banked.current = 0;
    setActiveGame(null);
  };

  // "Play Again" is another play, and costs what a play costs. Both games show
  // the price on the button and disable it when the wallet cannot cover it.
  const replay = free.unlocked
    ? null
    : { cost: PLAY_COST, canAfford: balance >= PLAY_COST, onCharge: () => spendGold(PLAY_COST) };

  // Tabs can be clicked faster than the network answers; only the latest
  // request may fill the board, or one game's rows land under the other's tab.
  const boardRequest = useRef(0);
  const fetchScores = async (id = boardId) => {
    const request = ++boardRequest.current;
    const board = ARCADE_BOARDS.find((b) => b.id === id) || ARCADE_BOARDS[0];
    setBoardId(id);
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    setBoardPending(false);

    const { data, error, pending } = await getGlobalGameLeaderboard(selectedId, 5, board.key);
    if (request !== boardRequest.current) return;
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
        replay={replay}
        onRunEnd={(score) => bankScore(score, ARCADE_KEY)}
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
        onStart={() => { if (!free.unlocked) spendGold(PLAY_COST); }}
        purseNote="Your kit budget for this run — none of it carries over."
        replay={replay}
        onRunEnd={(score) => bankScore(score, SURVIVOR_KEY)}
        onComplete={(score) => finishGame(score, SURVIVOR_KEY)}
        onQuit={() => setActiveGame(null)}
      />
    );
  }

  if (loadError) return <ProgressLoadError />;
  if (isLoadingDB) return <ArcadeLoading />;

  return (
    <ArcadeShell toast={toast}>
      {view === 'HUB' ? (
        <ArcadeHub
          balance={balance}
          earned={earned}
          free={free}
          economy={ECONOMY}
          levels={LEVELS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          bestOf={bestOf}
          onPlay={play}
          onLeaderboard={openLeaderboard}
          onBack={() => navigate('/home')}
          onLogout={handleLogout}
        />
      ) : (
        <ArcadeLeaderboard
          levelNo={levelNo}
          mapName={level.mapName}
          boardId={boardId}
          onBoard={fetchScores}
          onBack={() => setView('HUB')}
          loading={loadingLeaderboard}
          error={leaderboardError}
          pending={boardPending}
          rows={leaderboard}
        />
      )}
    </ArcadeShell>
  );
}
