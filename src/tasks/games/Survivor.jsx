// src/tasks/games/Survivor.jsx
//
// =====================================================================
// SWARM SURVIVOR — the arcade's second cabinet.
//
// Tower Defense's sibling, not its replacement. Same unit, same XP gold, same
// per-unit leaderboard, same artwork, same difficulty tier — a different verb.
// There you place towers and watch a road; here you ARE a tower, on foot, and
// the road is gone.
//
// The shell owns everything the simulation should not: which hero was picked and
// what the gold bought, the rasterised sprite atlas, the level-up draft and its
// question, and reporting the run's best score back to the unit exactly the way
// TowerDefense.jsx does (persist locally, submit the BEST run on exit, let
// saveScore fold it into the unit's GAMES record in one atomic update).
// =====================================================================

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { THEME_TRIBE } from '../../components/towerdefense/gameData';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import SpriteForge from '../../components/survivor/spriteForge';
import SurvivorCanvas from '../../components/survivor/SurvivorCanvas';
import {
  createRun, applyUpgrade, resumeAfterLevel, useSurvivorEngine, hudSnapshot,
} from '../../components/survivor/useSurvivorEngine';
import {
  HEROES, loadoutEffects, rollUpgrades, RUN,
} from '../../components/survivor/survivorData';
import { makeChallengeBank } from '../../components/survivor/survivorChallenges';
import {
  LoadoutScreen, SurvivorHUD, SquadBar, LevelUpModal, RunEndModal, ForgeSplash,
} from '../../components/survivor/SurvivorUI';
import { fmtTime } from '../../components/survivor/format';

const KEY_MAP = {
  KeyW: 'up', ArrowUp: 'up',
  KeyS: 'down', ArrowDown: 'down',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
};

export default function Survivor({
  gameConfig = { themeId: 'STANDARD', tierLabel: 'Recruit', difficulty: {} },
  pool = [],
  startingCredits = 150,
  unitId = 'default',
  // Which unit's arithmetic generator the level-up questions use. Defaults to
  // `unitId`; the standalone Arcade passes a different id so the level owns the
  // leaderboard while questions follow the student's study (see Survivor's
  // twin, TowerDefense.jsx, and arcade/questionSource.js).
  mathUnitId = unitId,
  onQuit = () => {},
  onComplete = () => {},
}) {
  const themeId = gameConfig.themeId || 'STANDARD';
  const tribeId = THEME_TRIBE[themeId] || 'INSECT';

  const [sprites, setSprites] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [runId, setRunId] = useState(0);

  // The run's high score for this unit, mirroring TD's `td_best_` key so the two
  // games keep separate personal bests even though they share the leaderboard.
  const [bestScore, setBestScore] = useState(() => {
    try { return Number(localStorage.getItem(`surv_best_${unitId}`)) || 0; } catch { return 0; }
  });
  const bestRef = useRef(bestScore);
  useEffect(() => { bestRef.current = bestScore; }, [bestScore]);

  // Forging starts the moment the student walks in, so by the time they have
  // chosen a hero and spent their gold the atlas is already warm.
  const handleSprites = useCallback((atlas) => setSprites(atlas), []);

  const bankBest = useCallback((score) => {
    if (score > bestRef.current) {
      bestRef.current = score;
      try { localStorage.setItem(`surv_best_${unitId}`, String(score)); } catch { /* private mode */ }
      setBestScore(score);
    }
  }, [unitId]);

  const finish = useCallback((score) => {
    bankBest(score);
    // Submit the best run of the session, not whatever was on screen at exit —
    // the same rule Tower Defense follows, so "Play Again" can never cost a
    // student their high score.
    onComplete(Math.max(score, bestRef.current));
    onQuit();
  }, [bankBest, onComplete, onQuit]);

  if (!deployed) {
    return (
      <>
        {!sprites && <SpriteForge tribeId={tribeId} onReady={handleSprites} />}
        <LoadoutScreen
          gold={startingCredits}
          tierLabel={gameConfig.tierLabel || 'Recruit'}
          mapName={gameConfig.mapName || 'The Open Field'}
          briefing={gameConfig.briefing}
          onDeploy={setDeployed}
          onBack={onQuit}
        />
      </>
    );
  }

  if (!sprites) {
    return (
      <>
        <SpriteForge tribeId={tribeId} onReady={handleSprites} />
        <ForgeSplash />
      </>
    );
  }

  return (
    <SurvivorRun
      key={runId}
      deployed={deployed}
      sprites={sprites}
      themeId={themeId}
      gameConfig={gameConfig}
      pool={pool}
      mathUnitId={mathUnitId}
      bestScore={bestScore}
      onBank={bankBest}
      onRetry={() => setRunId(n => n + 1)}
      onFinish={finish}
    />
  );
}

// =====================================================================
// One run. Remounted (via `key`) for a retry, so the engine loop and every
// closure inside it start genuinely fresh rather than being reset by hand.
// =====================================================================

function SurvivorRun({
  deployed, sprites, themeId, gameConfig, pool, mathUnitId, bestScore, onBank, onRetry, onFinish,
}) {
  const hero = useMemo(
    () => HEROES.find(h => h.typeId === deployed.heroId) || HEROES[0],
    [deployed.heroId]
  );

  // Built exactly once, on the first render of this run. Held in state purely so
  // it can be constructed lazily without reading a ref mid-render; the ref is
  // what the loop and the canvas actually reach through, every frame.
  const [run] = useState(() => createRun({
    hero,
    loadout: loadoutEffects(deployed.counts),
    difficulty: gameConfig.difficulty || {},
  }));
  const gRef = useRef(run);

  // The engine's per-frame commit. It publishes a snapshot rather than a bare
  // tick, so every React screen below reads plain values and the mutable run
  // object stays where only the loop and the canvas touch it.
  const [hud, setHud] = useState(() => hudSnapshot(run));
  const render = useCallback(() => setHud(hudSnapshot(run)), [run]);

  const inputRef = useRef({ keys: new Set(), pointerDown: false, wx: 0, wy: 0 });
  const pausedRef = useRef(false);

  const [draft, setDraft] = useState(null);     // { cards, challenge, level }
  // The results card is built from a SNAPSHOT taken when the run ends, not from
  // the live simulation — the loop has stopped by then, and reading a mutable
  // ref while rendering a static screen is asking for a stale number.
  const [ended, setEnded] = useState(null);
  const [showExit, setShowExit] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // The unit's own question bank — its vocabulary and its arithmetic generator.
  const nextChallenge = useMemo(() => makeChallengeBank(pool, mathUnitId), [pool, mathUnitId]);

  // ---- engine callbacks ------------------------------------------------

  const openDraft = useCallback(() => {
    const cards = rollUpgrades(gRef.current);
    if (cards.length === 0) {
      // Nothing left to offer (everything maxed) — take the level silently.
      resumeAfterLevel(gRef.current);
      return;
    }
    setDraft({
      level: gRef.current.hero.level,
      cards,
      challenge: nextChallenge ? nextChallenge() : null,
    });
  }, [nextChallenge]);

  const handleRunEnd = useCallback((outcome, score) => {
    const run = gRef.current;
    setEnded(prev => prev || {
      outcome, score,
      kills: run.kills,
      level: run.hero.level,
      time: fmtTime(run.t),
      bosses: run.bossKills,
    });
    onBank(score);
  }, [onBank]);

  useSurvivorEngine({
    gRef, render, inputRef,
    onLevelUp: openDraft,
    onRunEnd: handleRunEnd,
    pausedRef,
  });

  // ---- input -----------------------------------------------------------

  useEffect(() => {
    const down = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Escape') { setShowExit(true); return; }
      const dir = KEY_MAP[e.code];
      if (dir) {
        e.preventDefault();
        inputRef.current.keys.add(dir);
        setShowHint(false);   // they know how to move; stop telling them
      }
    };
    const up = (e) => {
      const dir = KEY_MAP[e.code];
      if (dir) inputRef.current.keys.delete(dir);
    };
    // A tab switch mid-sprint would otherwise leave a key stuck down.
    const blur = () => inputRef.current.keys.clear();

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, []);

  const handlePointer = useCallback((patch) => {
    Object.assign(inputRef.current, patch);
    // The control hint has done its job the moment they touch the arena.
    if (patch.pointerDown) setShowHint(false);
  }, []);

  // ...and it times out on its own for anyone reading rather than playing.
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Steering must stop while a modal is up, or the hero sprints into the swarm
  // behind the level-up screen.
  useEffect(() => {
    if (draft || ended || showExit) {
      inputRef.current.keys.clear();
      inputRef.current.pointerDown = false;
    }
    pausedRef.current = !!showExit;
  }, [draft, ended, showExit]);

  // ---- the draft -------------------------------------------------------

  const pickCard = useCallback((card, earned) => {
    const run = gRef.current;
    applyUpgrade(run, card);
    if (earned) run.score += Math.round(RUN.challengeScore * run.difficulty.scoreMul);
    resumeAfterLevel(run);
    setDraft(null);
    // Two levels can land in the same frame; the next screen opens straight away
    // rather than being swallowed.
    if (run.state === 'LEVELUP') setTimeout(openDraft, 0);
  }, [openDraft]);

  // ---- render ----------------------------------------------------------

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      <SurvivorHUD hud={hud} onQuit={() => setShowExit(true)} />

      <SurvivorCanvas
        gRef={gRef}
        sprites={sprites}
        themeId={themeId}
        onPointer={handlePointer}
      />

      <SquadBar squad={hud.squad} />

      {/* One-time control hint, gone the moment the student starts moving. */}
      {showHint && !draft && !ended && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-6">
          <div className="bg-slate-950/80 rounded-2xl px-6 py-4 text-center border-b-4 border-black/60">
            <div className="font-black uppercase tracking-widest text-xs text-slate-400 mb-1">Move</div>
            <div className="font-black text-lg">Hold anywhere to walk · or use WASD</div>
            <div className="font-bold text-sm text-slate-400 mt-1">Your weapons fire themselves. Stay alive.</div>
          </div>
        </div>
      )}

      {draft && !ended && (
        <LevelUpModal
          key={`lv${draft.level}`}
          level={draft.level}
          cards={draft.cards}
          challenge={draft.challenge}
          onPick={pickCard}
        />
      )}

      <ExitConfirmModal
        open={showExit}
        message="Your squad and your level-ups will be lost. Your best score is still kept."
        onCancel={() => setShowExit(false)}
        onConfirm={() => onFinish(Math.max(gRef.current.score, bestScore))}
      />

      {ended && (
        <RunEndModal
          score={ended.score}
          best={bestScore}
          kills={ended.kills}
          time={ended.time}
          level={ended.level}
          bosses={ended.bosses}
          onRetry={onRetry}
          onExit={() => onFinish(Math.max(ended.score, bestScore))}
        />
      )}
    </div>
  );
}
