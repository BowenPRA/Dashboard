import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TOWERS, TOWER_ORDER, ENEMIES, getSellValue } from '../../components/towerdefense/gameData';
import { MAP_LAYOUTS, WAVE_PRESETS, buildWaveSet } from '../../components/towerdefense/wavePresets';
import GameBoard from '../../components/towerdefense/GameBoard';
import BuildMenu from '../../components/towerdefense/BuildMenu';
import UpgradePanel from '../../components/towerdefense/UpgradePanel';
import VocabChallenge from '../../components/towerdefense/VocabChallenge';
import HUD from '../../components/towerdefense/HUD';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import { useGameEngine } from '../../components/towerdefense/useGameEngine';

const CHALLENGE_DURATION = 15;
const ALL_TOWER_IDS = ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO'];

// For the "incoming wave" HUD preview — a friendly face per enemy type, shown in
// a fixed order so the readout stays stable from wave to wave.
const ENEMY_EMOJI = { ANT: '🐜', WASP: '🐝', BEETLE: '🪲', QUEEN: '👑', GIANT_ANT: '🕷️' };
const ENEMY_PREVIEW_ORDER = ['ANT', 'WASP', 'BEETLE', 'QUEEN', 'GIANT_ANT'];

/** Collapse a wave's spawn groups into one count per enemy type, for the preview. */
function summarizeWave(wave) {
  if (!Array.isArray(wave)) return null;
  const totals = {};
  for (const grp of wave) totals[grp.type] = (totals[grp.type] || 0) + grp.count;
  const out = ENEMY_PREVIEW_ORDER
    .filter(t => totals[t])
    .map(t => ({ type: t, count: totals[t], emoji: ENEMY_EMOJI[t] || '👾' }));
  return out.length ? out : null;
}

function buildPathSet(path) {
  const s = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    const [r1, c1] = path[i];
    const [r2, c2] = path[i + 1];
    const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
    const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) s.add(`${r}_${c}`);
    }
  }
  return s;
}

function generateDecorations(layout, pathSet) {
  const out = [];
  let id = 1;
  for (let r = 0; r < layout.rows; r++) {
    for (let c = 0; c < layout.cols; c++) {
      if (pathSet.has(`${r}_${c}`)) continue;
      if (Math.random() < 0.16) {
        out.push({ id: id++, row: r, col: c, variant: Math.floor(Math.random() * 5) });
      }
    }
  }
  return out;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TowerDefense({
  gameConfig = { mapId: 'WAVE', lives: 20, bannedTowers: [] },
  pool = [],
  startingCredits = 150,
  unitId = 'default',
  themeId = 'STANDARD',
  onQuit = () => window.history.back(),
  onComplete = () => {}
}) {
  const layout = MAP_LAYOUTS[gameConfig.mapId] || MAP_LAYOUTS.WAVE;
  const lives = gameConfig.lives || 20;

  // Calculate specific limits dynamically based on the Hub rules
  const allowedTowers = useMemo(() => {
    const banned = gameConfig.bannedTowers || [];
    return ALL_TOWER_IDS.filter(t => !banned.includes(t));
  }, [gameConfig.bannedTowers]);

  // The order the BuildMenu shows towers in — also the 1–6 hotkey order, so the
  // number badge on each button matches the key that builds it.
  const buildableOrder = useMemo(
    () => TOWER_ORDER.filter(id => allowedTowers.includes(id)),
    [allowedTowers]
  );

  // The 50 authored waves for this level, reshaped by the unit's composition
  // modifier (Swarm/Siege/…). With no modifier this is the shared SET_1 itself,
  // so every level and track that doesn't opt in is byte-for-byte unchanged.
  const waves = useMemo(() => buildWaveSet(gameConfig.waveMod), [gameConfig.waveMod]);
  const totalWaves = waves.length;

  const pathSet = useMemo(() => buildPathSet(layout.path), [layout.path]);

  // Straight from the unit's Vocab task (unit.realWords). We carry the example
  // sentence and the Vietnamese gloss too, so the challenge can reinforce the
  // term after answering rather than just testing it. Words with no definition
  // are dropped so a half-authored entry can't produce a blank prompt.
  const vocab = useMemo(() => {
    const words = (pool || [])
      .filter(w => w?.word && (w.def || w.vnDef))
      .map(w => ({ word: w.word, def: w.def || w.vnDef || '', sent: w.sent || '', vn: w.vn || '' }));
    return words.length > 0 ? words : null;
  }, [pool]);

  const activeThemeId = useMemo(() => {
    const requestedTheme = gameConfig.themeId || themeId;
    if (requestedTheme === 'RANDOM') {
      const themes = ['STANDARD', 'NIGHT', 'ICE', 'DESERT'];
      return themes[Math.floor(Math.random() * themes.length)];
    }
    return requestedTheme;
  }, [gameConfig.themeId, themeId]);

  const basicEnemyType = useMemo(() => {
    return waves?.[0]?.[0]?.type || Object.keys(ENEMIES)[0];
  }, [waves]);

  // The difficulty object is per unit (see unitDifficulty.js). It is part of the
  // engine config rather than a prop because the engine reads it once when the
  // loop starts — changing it mid-run would desync scores from the waves.
  const engineConfig = useMemo(() => ({
    waves,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR,
    difficulty: gameConfig.difficulty
  }), [waves, gameConfig.difficulty]);

  const gRef = useRef(null);
  
  // Re-initialize state safely if unmounted/remounted
  if (gRef.current === null) {
    gRef.current = {
      credits: startingCredits, lives, maxLives: lives, wave: 0, score: 0, bolts: 0,
      speed: 1, gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      decorations: generateDecorations(layout, pathSet),
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, nextId: 1, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: {}, // Changed from [] to {} to track usage per mode
      autoPlayDelay: 0,
      // Stamped on every build/sell/upgrade so the effective-stats cache and the
      // memoised tower layer know the board actually changed; creepsVersion is
      // the same signal for spawns and deaths.
      towersVersion: 0, creepsVersion: 0
    };
  }
  const g = gRef.current;

  // Stable across renders: the engine keeps this for the lifetime of its loop.
  const [, setTick] = useState(0);
  const render = useCallback(() => setTick(t => (t + 1) % 1e9), []);

  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [hoveredTowerId] = useState(null);
  const [activeBuilder, setActiveBuilder] = useState(null);
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const autoPlayRef = useRef(false);
  // Read once, lazily — an effect that setState'd on mount showed 0 for a frame
  // and re-rendered the whole board to correct itself.
  const [bestScore, setBestScore] = useState(() => {
    try { return Number(localStorage.getItem(`td_best_${unitId}`)) || 0; } catch { return 0; }
  });

  const [challenge, setChallenge] = useState(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [challengeShakeKey, setChallengeShakeKey] = useState(0);
  const challengeActiveRef = useRef(false);
  // Latches once a challenge is answered so the reward/penalty is paid exactly
  // once; cleared when the next challenge opens.
  const challengeResolvedRef = useRef(false);

  const boardWrapperRef = useRef(null);
  const [boardScale, setBoardScale] = useState(1);

  useGameEngine({
    gRef, render, layout, engineConfig,
    onTriggerChallenge: buildChallengeTrigger,
    onAutoStartWave: handleStartWave,
    challengeActiveRef, autoPlayRef
  });

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const bw = layout.cols * 48; 
        const bh = layout.rows * 48;
        const scale = Math.min((width - 16) / bw, (height - 16) / bh);
        setBoardScale(Math.max(0.5, Math.min(scale, 2.5)));
      }
    });
    if (boardWrapperRef.current) obs.observe(boardWrapperRef.current);
    return () => obs.disconnect();
  }, [layout]);

  function buildChallengeTrigger() {
    if (!vocab || vocab.length === 0) return;
    
    // 1. Compile a list of all available specific questions (Word + Mode)
    let available = [];
    vocab.forEach(v => {
      const usage = g.usedVocab[v.word] || { TYPE: false, CHOICE: false };
      if (!usage.TYPE) available.push({ item: v, mode: 'TYPE' });
      if (!usage.CHOICE) available.push({ item: v, mode: 'CHOICE' });
    });
    
    // 2. Endless looping - if all specific questions are used, reset the tracker to ensure endless play
    if (available.length === 0) {
      g.usedVocab = {};
      vocab.forEach(v => {
        available.push({ item: v, mode: 'TYPE' });
        available.push({ item: v, mode: 'CHOICE' });
      });
    }

    // 3. Pick one specific challenge at random
    const { item, mode } = available[Math.floor(Math.random() * available.length)];

    // 4. Mark exactly that mode as used for that word so it gets removed from the bank
    if (!g.usedVocab[item.word]) g.usedVocab[item.word] = { TYPE: false, CHOICE: false };
    g.usedVocab[item.word][mode] = true;

    // 5. Generate distractors if CHOICE
    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== item.word.toLowerCase());
      const distractors = shuffle(others).slice(0, 3).map(x => x.word);
      choices = shuffle([item.word, ...distractors]);
    }
    
    challengeActiveRef.current = true;
    challengeResolvedRef.current = false;
    setChallenge({ mode, word: item.word, def: item.def, sent: item.sent, vn: item.vn, choices });
    setChallengeInput('');
    setChallengeTimeLeft(CHALLENGE_DURATION);
  }

  function closeChallenge() {
    challengeActiveRef.current = false;
    setChallenge(null);
    setChallengeInput('');
  }

  // Every answer ends by revealing the term (word + sentence + gloss) so it is
  // learned, not just tested. The modal stays up on a `result` for a beat before
  // an effect closes it; the reward/penalty is applied once. The ref guard makes
  // a double call (e.g. the timer firing as the player clicks, or StrictMode's
  // double-invoke) a no-op so the bolt/penalty can't be paid twice.
  function resolveChallenge(correct, penalty) {
    if (!challenge || challengeResolvedRef.current) return;
    challengeResolvedRef.current = true;
    if (correct) awardChallengeWin();
    else if (penalty) punishChallengeFail();
    setChallenge(cur => (cur ? { ...cur, result: { correct } } : cur));
  }

  function awardChallengeWin() {
    g.bolts += 1;
    g.score += 50;
    g.floaters.push({
      id: g.nextId++, text: '⚡ +1', row: 1, col: layout.cols / 2, colorClass: 'text-[#FFC800] font-black', life: 1500, maxLife: 1500
    });
  }

  function punishChallengeFail() {
    const count = Math.max(1, Math.floor(g.wave / 2));
    g.spawnQueue.unshift({ type: basicEnemyType, count, interval: 350 });
    g.spawnTimer = 9999;
    g.floaters.push({
      id: g.nextId++, text: `+${count} 👾`, row: 1, col: layout.cols / 2, colorClass: 'text-[#EA2B2B] font-black', life: 1600, maxLife: 1600
    });
  }

  // Countdown for the vocab challenge. The expiry runs inside the timer callback
  // rather than in the effect body, so running out of time is handled as the
  // event it is instead of a state change made during render commit.
  useEffect(() => {
    if (!challenge || challenge.result || challengeTimeLeft <= 0) return;
    const t = setTimeout(() => {
      if (challengeTimeLeft <= 1) {
        // Running out reveals the word too; only CHOICE carries the spawn penalty
        // (typing is left forgiving, as it was before the reveal existed).
        resolveChallenge(false, challenge.mode === 'CHOICE');
      } else {
        setChallengeTimeLeft(s => s - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, challengeTimeLeft]);

  // Hold the reveal for a beat, then close. Keyed on the result so it arms once.
  useEffect(() => {
    if (!challenge?.result) return;
    const t = setTimeout(closeChallenge, 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.result]);

  // Keyboard controls (desktop QoL). Space/Enter starts the next wave, 1–6 pick a
  // tower to build, Esc cancels. Suppressed while the vocab challenge input has
  // focus so typing an answer never fires a hotkey.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (challengeActiveRef.current) return;
      if (g.gameState !== 'PLAYING') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!g.waveInProgress) handleStartWave();
        return;
      }
      if (e.code === 'Escape') {
        setActiveBuilder(null);
        setSelectedTowerId(null);
        setHoverCell({ row: -1, col: -1, valid: false });
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= buildableOrder.length) {
        const typeId = buildableOrder[n - 1];
        const conf = TOWERS[typeId];
        if (conf && g.credits >= conf.cost) {
          setActiveBuilder(prev => (prev?.typeId === typeId ? null : { typeId }));
          setSelectedTowerId(null);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildableOrder, g]);

  function handleStartWave() {
    if (g.waveInProgress || g.gameState !== 'PLAYING') return;
    let data;
    if (g.wave < engineConfig.waves.length) {
      data = engineConfig.waves[g.wave];
    } else if (engineConfig.generateInfiniteWave) {
      data = engineConfig.generateInfiniteWave(g.wave);
    } else return; 

    g.spawnQueue = data.map(w => ({ ...w }));
    g.spawnTimer = 9999;
    g.wave += 1;
    g.waveInProgress = true;
    if (g.wave === 5 && !g.wave5ChallengeSpawned) g.challengeTimer = 8000; 
    render();
  }

  // The board's handlers are memoised because GameBoard's layers are memoised:
  // a handler recreated on every render is a new prop identity, which defeats
  // every memo it is passed to and forced the whole tower layer — twenty-odd
  // full SVG trees — to reconcile on every frame. They read mutable state
  // through refs so they can stay stable without going stale.
  const activeBuilderRef = useRef(null);
  const hoverCellRef = useRef(hoverCell);
  useEffect(() => { activeBuilderRef.current = activeBuilder; }, [activeBuilder]);
  useEffect(() => { hoverCellRef.current = hoverCell; }, [hoverCell]);

  const handleCellClick = useCallback((r, c, isPath) => {
    const builder = activeBuilderRef.current;
    if (builder) {
      if (isPath) return;
      if (g.towers.some(t => t.row === r && t.col === c)) return;
      const conf = TOWERS[builder.typeId];
      if (g.credits < conf.cost) return;
      g.credits -= conf.cost;
      g.towers.push({ id: g.nextId++, typeId: builder.typeId, row: r, col: c, upgrades: {} });
      g.towersVersion++;
      setActiveBuilder(null);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
    } else setSelectedTowerId(null);
  }, [g, render]);

  const handleCellHover = useCallback((r, c, isPath) => {
    const builder = activeBuilderRef.current;
    const hc = hoverCellRef.current;
    if (!builder) {
      if (hc.row !== -1) setHoverCell({ row: -1, col: -1, valid: false });
      return;
    }
    if (hc.row === r && hc.col === c) return;

    const valid = !isPath && !g.towers.some(t => t.row === r && t.col === c);
    setHoverCell({ row: r, col: c, valid });
  }, [g]);

  const handleTowerClick = useCallback((id) => {
    if (activeBuilderRef.current) { setActiveBuilder(null); return; }
    setSelectedTowerId(id);
  }, []);

  const handleCellLeave = useCallback(
    () => setHoverCell({ row: -1, col: -1, valid: false }), []
  );

  function handleUpgrade(key) {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    const conf = TOWERS[t.typeId];
    const upg = conf.upgrades[key];
    if (!upg || t.upgrades[key] || g.credits < upg.cost) return;
    g.credits -= upg.cost;
    t.upgrades = { ...t.upgrades, [key]: true };
    g.towersVersion++;
    render();
  }

  function handleSell() {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    g.credits += getSellValue(t);
    g.towers = g.towers.filter(x => x.id !== selectedTowerId);
    g.towersVersion++;
    delete g.fireCooldowns[t.id];
    setSelectedTowerId(null);
    render();
  }

  function handleUseBolt() {
    if (g.bolts <= 0) return;
    g.bolts -= 1;
    g.creeps.forEach(c => {
      c.hp -= 500;
      if (c.hp <= 0) g.credits += ENEMIES[c.typeKey].reward;
    });
    g.particles.push({ id: g.nextId++, row: layout.rows / 2, col: layout.cols / 2, radius: Math.max(layout.rows, layout.cols), color: 'rgba(99,102,241,0.6)', life: 450, maxLife: 450 });
    render();
  }

  function handleChallengeSubmit(e) {
    e.preventDefault();
    if (!challenge || challenge.mode !== 'TYPE' || challenge.result) return;
    const guess = challengeInput.trim().toLowerCase();
    if (!guess) return;
    if (guess === challenge.word.toLowerCase()) resolveChallenge(true, false);
    else { setChallengeShakeKey(k => k + 1); setChallengeInput(''); }
  }

  function handleChallengeChoice(choice) {
    if (!challenge || challenge.mode !== 'CHOICE' || challenge.result) return;
    const correct = choice.toLowerCase() === challenge.word.toLowerCase();
    resolveChallenge(correct, !correct);
  }

  function handleChallengeDismiss() {
    if (challenge?.result) return;
    resolveChallenge(false, true);
  }

  // A run also ends by winning or losing, not only by exiting.
  useEffect(() => {
    if (g.gameState !== 'PLAYING') persistBest();
  }, [g.gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleReset() {
    persistBest();
    Object.assign(g, {
      credits: startingCredits, lives, maxLives: lives, wave: 0, score: 0, bolts: 0,
      gameState: 'PLAYING', towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      waveInProgress: false, spawnQueue: [], spawnTimer: 0, fireCooldowns: {}, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: {}, // Reset the tracker dictionary entirely
      autoPlayDelay: 0,
      towersVersion: g.towersVersion + 1, creepsVersion: g.creepsVersion + 1
    });
    challengeActiveRef.current = false;
    challengeResolvedRef.current = false;
    setSelectedTowerId(null);
    setActiveBuilder(null);
    setChallenge(null);
    setChallengeInput('');
    render();
  }

  function persistBest() {
    if (g.score > bestRef.current) {
      bestRef.current = g.score;
      try { localStorage.setItem(`td_best_${unitId}`, String(g.score)); } catch { /* private mode */ }
      setBestScore(g.score);
    }
  }

  function confirmExit() {
    setShowExitConfirm(false);
    persistBest();
    onComplete(g.score);
    onQuit();
  }

  // The best score is tracked in a ref during play and only written to
  // localStorage when the run ends. Writing on every increase meant a synchronous
  // disk write several times a second for the whole of a wave.
  const bestRef = useRef(bestScore);
  useEffect(() => { bestRef.current = bestScore; }, [bestScore]);
  const liveBest = Math.max(bestScore, g.score);

  const selectedTower = g.towers.find(t => t.id === selectedTowerId) || null;

  // What the "Next" button will unleash — shown so the player can buy the right
  // counter before committing. Only while a wave isn't already running.
  const nextWavePreview = (!g.waveInProgress && g.gameState === 'PLAYING' && g.wave < waves.length)
    ? summarizeWave(waves[g.wave])
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      <HUD
        credits={g.credits}
        lives={g.lives}
        wave={g.wave}
        totalWaves={totalWaves}
        score={g.score}
        bestScore={liveBest}
        speed={g.speed}
        gameState={g.gameState}
        waveInProgress={g.waveInProgress}
        autoPlay={autoPlayRef.current}
        tierLabel={gameConfig.tierLabel}
        nextWavePreview={nextWavePreview}
        onStartWave={handleStartWave}
        onToggleAutoPlay={() => { autoPlayRef.current = !autoPlayRef.current; render(); }}
        onSetSpeed={(s) => { g.speed = s; render(); }}
        onQuit={() => setShowExitConfirm(true)}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative bg-slate-900">
        <main ref={boardWrapperRef} className="flex-1 order-1 flex items-center justify-center overflow-hidden p-0 sm:p-0">
          <div style={{ transform: `scale(${boardScale})`, transformOrigin: 'center' }}>
             <GameBoard
               layout={layout} towers={g.towers} creeps={g.creeps} projectiles={g.projectiles}
               floaters={g.floaters} particles={g.particles} burnZones={g.burnZones}
               decorations={g.decorations} lives={g.lives} maxLives={g.maxLives}
               towersVersion={g.towersVersion} creepsVersion={g.creepsVersion}
               selectedTowerId={selectedTowerId} hoveredTowerId={hoveredTowerId}
               activeBuilder={activeBuilder} hoverCell={hoverCell}
               onCellClick={handleCellClick} onCellHover={handleCellHover}
               onCellLeave={handleCellLeave}
               onTowerClick={handleTowerClick} themeId={activeThemeId}
             />
          </div>
        </main>

        <div className="order-2 flex h-auto md:h-full z-20">
          <UpgradePanel
            tower={selectedTower} towers={g.towers} credits={g.credits}
            onUpgrade={handleUpgrade} onSell={handleSell} onClose={() => setSelectedTowerId(null)}
          />
        </div>

        <div className="order-3 flex h-auto md:h-full z-20">
          <BuildMenu
            allowedTowers={allowedTowers} credits={g.credits}
            activeBuilder={activeBuilder} bolts={g.bolts} onUseBolt={handleUseBolt}
            onSelect={(b) => setActiveBuilder(prev => prev?.typeId === b.typeId ? null : b)}
          />
        </div>
      </div>

      <VocabChallenge
        challenge={challenge} 
        input={challengeInput} 
        onInputChange={setChallengeInput}
        onSubmit={handleChallengeSubmit} 
        onChoice={handleChallengeChoice}
        onDismiss={handleChallengeDismiss}
        timeLeft={challengeTimeLeft} 
        maxTime={CHALLENGE_DURATION} 
        shakeKey={challengeShakeKey}
      />

      <ExitConfirmModal open={showExitConfirm} onCancel={() => setShowExitConfirm(false)} onConfirm={confirmExit} />

      {g.gameState !== 'PLAYING' && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] border-b-8 border-slate-200 p-8 text-center max-w-md w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="text-6xl mb-4">{g.gameState === 'WON' ? '🏆' : '💀'}</div>
            <div className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {g.gameState === 'WON' ? 'Victory' : 'Defeat'}
            </div>
            <div className="text-base font-bold text-slate-500 mb-6">
              {g.gameState === 'WON' ? 'You defended every wave!' : 'Too many enemies got through.'}
            </div>
            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl py-4 mb-6 shadow-inner">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Final Score</div>
              <div className="text-4xl font-black text-[#1CB0F6] tabular-nums">{g.score}</div>
              {g.score >= bestScore && g.score > 0 && <div className="text-sm font-bold text-[#FFC800] mt-1">New Best!</div>}
            </div>
            <div className="flex gap-3">
              <button onClick={handleReset} className="flex-1 px-5 py-4 rounded-2xl bg-[#58A700] border-b-[4px] border-[#46a802] active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm">
                Play Again
              </button>
              <button onClick={confirmExit} className="flex-1 px-5 py-4 rounded-2xl bg-slate-200 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-600 font-black transition-all uppercase tracking-widest text-sm">
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}