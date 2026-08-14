// Dev-only benchmark for the tower-defense hot path. Not in the production build.
//
// Drives the REAL engine (useGameEngine) and the REAL board (GameBoard) with a
// synthetic heavy scene — the kind of load a wave-40 fight produces — and reports
// simulation cost and React commit cost separately, so an optimisation can be
// attributed to the one it actually fixed.
//
// Run: http://localhost:5173/Dashboard/preview-tdbench.html then press Run.
import React, { Profiler, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import GameBoard from './components/towerdefense/GameBoard';
import { useGameEngine } from './components/towerdefense/useGameEngine';
import { MAP_LAYOUTS, WAVE_PRESETS } from './components/towerdefense/wavePresets';
import { ENEMIES, TOWERS } from './components/towerdefense/gameData';

// ---------------------------------------------------------------- scheduler
// A background tab stops compositing, so rAF never fires and setTimeout is
// clamped to ~1s — measuring either would measure Chrome's throttling rather
// than the game. MessageChannel is a macrotask Chrome does not clamp, so the
// loop runs at full speed whether or not the pane is visible. Installed at
// module load, before any component mounts.
const simTiming = { totalMs: 0 };
{
  const chan = new MessageChannel();
  const pending = new Map();
  let nextId = 1;
  chan.port1.onmessage = () => {
    const due = [...pending.entries()];
    pending.clear();
    for (const [, cb] of due) {
      const t0 = performance.now();
      cb(performance.now());
      simTiming.totalMs += performance.now() - t0;
    }
  };
  window.requestAnimationFrame = (cb) => {
    const id = nextId++;
    pending.set(id, cb);
    chan.port2.postMessage(0);
    return id;
  };
  window.cancelAnimationFrame = (id) => pending.delete(id);
}

const LAYOUT = MAP_LAYOUTS.SPIRAL;
// Overridable from the query string so a layer can be isolated:
//   ?creeps=0  -> everything except creeps, to attribute the cost
const Q = new URLSearchParams(location.search);
const CREEP_COUNT = Q.has('creeps') ? Number(Q.get('creeps')) : 220;
const TOWER_COUNT = Q.has('towers') ? Number(Q.get('towers')) : 22;
const RUN_MS = 6000;

// Deterministic PRNG so two runs face the identical scene.
function rng(seed) {
  let s = seed >>> 0;
  return () => (((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296));
}

function buildScene() {
  const rand = rng(20260814);
  const types = ['ANT', 'WASP', 'BEETLE', 'QUEEN'];
  const creeps = [];
  for (let i = 0; i < CREEP_COUNT; i++) {
    const typeKey = types[i % types.length];
    const conf = ENEMIES[typeKey];
    // Spread along the path so towers actually have targets in range.
    const wp = Math.floor(rand() * (LAYOUT.path.length - 1));
    const [r1, c1] = LAYOUT.path[wp];
    const [r2, c2] = LAYOUT.path[wp + 1];
    const t = rand();
    creeps.push({
      id: 10000 + i, typeKey,
      row: r1 + (r2 - r1) * t, col: c1 + (c2 - c1) * t,
      hp: conf.hp * 40, maxHp: conf.hp * 40, speed: conf.speed,
      waypointIdx: wp, angle: 0,
      freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0,
      damageReduction: conf.damageReduction || 0, burnStacks: [], spawnTimer: 0,
    });
  }

  const towerIds = Object.keys(TOWERS);
  const towers = [];
  const taken = new Set();
  const onPath = new Set();
  for (let i = 0; i < LAYOUT.path.length - 1; i++) {
    const [r1, c1] = LAYOUT.path[i];
    const [r2, c2] = LAYOUT.path[i + 1];
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++)
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) onPath.add(`${r}_${c}`);
  }
  while (towers.length < TOWER_COUNT) {
    const row = Math.floor(rand() * LAYOUT.rows);
    const col = Math.floor(rand() * LAYOUT.cols);
    const key = `${row}_${col}`;
    if (onPath.has(key) || taken.has(key)) continue;
    taken.add(key);
    towers.push({
      id: 1000 + towers.length,
      typeId: towerIds[towers.length % towerIds.length],
      row, col,
      // Fully upgraded: the most expensive stat path, and the one that makes
      // getEffectiveStats do the most work.
      upgrades: { rate: true, damage: true, range: true, targeting: true, passive: true },
    });
  }
  return { creeps, towers };
}

function freshState() {
  const { creeps, towers } = buildScene();
  return {
    credits: 99999, lives: 999, maxLives: 999, wave: 40, score: 0, bolts: 0,
    speed: 1, gameState: 'PLAYING',
    towers, creeps, projectiles: [], floaters: [], particles: [], burnZones: [],
    decorations: [],
    waveInProgress: false, spawnQueue: [], spawnTimer: 0,
    fireCooldowns: {}, nextId: 100000, challengeTimer: Infinity, wave5ChallengeSpawned: false,
    usedVocab: {}, autoPlayDelay: 0, triggerNextWave: false,
    towersVersion: 0, creepsVersion: 0,
  };
}

function Bench({ onDone }) {
  const gRef = useRef(null);
  if (gRef.current === null) gRef.current = freshState();
  const g = gRef.current;

  const [, setTick] = useState(0);
  const stats = useRef({
    ticks: 0, mountMs: 0, commitMs: 0, commits: 0, simMs: 0,
    started: performance.now(), simStart: simTiming.totalMs,
  });

  const render = useCallback(() => setTick((t) => (t + 1) % 1e9), []);

  // Wrap render so the loop's own cost is timed without React's commit in it.
  const timedRender = useCallback(() => {
    const s = stats.current;
    s.ticks += 1;
    render();
    if (performance.now() - s.started > RUN_MS) {
      s.simMs = simTiming.totalMs - s.simStart;
      onDone(s, gRef.current);
    }
  }, [render, onDone]);

  const engineConfig = useMemo(() => ({
    waves: WAVE_PRESETS.SET_1,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR,
    difficulty: { hpMul: 1, speedMul: 1, rewardMul: 1, scoreMul: 1 },
  }), []);

  const challengeActiveRef = useRef(false);
  const autoPlayRef = useRef(false);
  const noop = useCallback(() => {}, []);
  // Stable, like the real screen's handlers — an inline arrow here would defeat
  // the board's memoised layers and make the bench measure a bug it does not have.
  const hoverCell = useMemo(() => ({ row: -1, col: -1, valid: false }), []);

  useGameEngine({
    gRef, render: timedRender, layout: LAYOUT, engineConfig,
    onTriggerChallenge: noop, challengeActiveRef, autoPlayRef,
  });

  // The first commit MOUNTS the whole scene and costs an order of magnitude more
  // than a steady-state update. Averaging it in hides exactly the number that
  // matters — the per-frame cost once the game is running — so it is reported
  // separately.
  const onProfile = (id, phase, actualDuration) => {
    const s = stats.current;
    if (s.commits === 0) s.mountMs = actualDuration;
    else s.commitMs += actualDuration;
    s.commits += 1;
  };

  return (
    <Profiler id="board" onRender={onProfile}>
      <GameBoard
        layout={LAYOUT} towers={g.towers} creeps={g.creeps} projectiles={g.projectiles}
        floaters={g.floaters} particles={g.particles} burnZones={g.burnZones}
        decorations={g.decorations} lives={g.lives} maxLives={g.maxLives}
        towersVersion={g.towersVersion} creepsVersion={g.creepsVersion}
        selectedTowerId={null} hoveredTowerId={null}
        activeBuilder={null} hoverCell={hoverCell}
        onCellClick={noop} onCellHover={noop} onCellLeave={noop}
        onTowerClick={noop} themeId="NIGHT"
      />
    </Profiler>
  );
}

/**
 * Regression test for the loop's callback indirection.
 *
 * `render` and `onTriggerChallenge` are now read through refs so an unmemoised
 * caller cannot restart the rAF loop. This mounts the real engine with a
 * deliberately UNSTABLE onTriggerChallenge (recreated on every render, as the
 * game screen does) at the wave and timer that fire a vocab challenge, and
 * asserts the current callback is the one that gets called — the failure mode
 * being a ref that captured only the first render's closure.
 */
function ChallengeWiring({ onResult }) {
  const gRef = useRef(null);
  if (gRef.current === null) {
    const s = freshState();
    // Wave 5 with the challenge timer already elapsed, and a spawn queue so the
    // engine does not immediately declare the wave over — it clears
    // waveInProgress before the challenge block, and the challenge only fires
    // while a wave is live.
    gRef.current = {
      ...s, creeps: [], towers: [], wave: 5, waveInProgress: true,
      spawnQueue: [{ type: 'ANT', count: 200, interval: 400 }],
      challengeTimer: 0, wave5ChallengeSpawned: false,
    };
  }
  const [n, setN] = useState(0);
  const fired = useRef({ count: 0, sawGeneration: -1 });
  const renders = useRef(0);

  const engineConfig = useMemo(() => ({
    waves: WAVE_PRESETS.SET_1, generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR,
    difficulty: { hpMul: 1, speedMul: 1, rewardMul: 1, scoreMul: 1 },
  }), []);
  const challengeActiveRef = useRef(false);
  const autoPlayRef = useRef(false);

  // Deliberately NOT memoised, and it closes over the current `n`.
  // The first fire happens on tick one, before any re-render, so it re-arms the
  // timer: the SECOND fire is the one that proves the engine calls the latest
  // closure rather than the one captured when the loop started.
  const trigger = () => {
    fired.current.count += 1;
    fired.current.sawGeneration = n;
    if (fired.current.count === 1) {
      // The engine sets a fresh 90s timer immediately AFTER this returns, and
      // latches wave5ChallengeSpawned, so re-arm on the next macrotask and move
      // past wave 5 to reach the recurring branch.
      setTimeout(() => {
        challengeActiveRef.current = false;
        gRef.current.wave = 6;
        gRef.current.challengeTimer = 200;
      }, 0);
    }
  };
  const render = () => { renders.current += 1; setN((v) => v + 1); };

  useGameEngine({ gRef, render, layout: LAYOUT, engineConfig, onTriggerChallenge: trigger, challengeActiveRef, autoPlayRef });

  useEffect(() => {
    const t = setTimeout(() => {
      onResult({
        challengeFired: fired.current.count > 0,
        firedTwice: fired.current.count > 1,
        // Proves the ref tracks the LATEST closure, not the one captured when
        // the loop started — a stale ref would report generation 0 forever.
        sawLatestClosure: fired.current.sawGeneration > 0,
        rendersObserved: renders.current,
      });
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function App() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [wiring, setWiring] = useState(null);
  const [testingWiring, setTestingWiring] = useState(false);

  const done = useCallback((s, g) => {
    const wall = performance.now() - s.started;
    const updates = Math.max(1, s.commits - 1);
    setResult({
      wallMs: Math.round(wall),
      ticks: s.ticks,
      ticksPerSec: +(s.ticks / (wall / 1000)).toFixed(1),
      // The headline number: React cost of one steady-state frame.
      avgUpdateMs: +(s.commitMs / updates).toFixed(2),
      mountMs: +s.mountMs.toFixed(1),
      commits: s.commits,
      avgSimMs: +(s.simMs / Math.max(1, s.ticks)).toFixed(2),
      domNodes: document.querySelectorAll('*').length,
      styleTags: document.querySelectorAll('style').length,
      creepsLeft: g.creeps.length,
      projectiles: g.projectiles.length,
      floaters: g.floaters.length,
    });
    setRunning(false);
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 16, background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8 }}>TD benchmark</h1>
      <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 12 }}>
        {CREEP_COUNT} creeps · {TOWER_COUNT} fully-upgraded towers · SPIRAL · {RUN_MS / 1000}s
      </p>
      <button
        onClick={() => { setResult(null); setRunning(true); }}
        disabled={running}
        style={{ padding: '10px 18px', borderRadius: 10, border: 0, background: running ? '#475569' : '#1cb0f6', color: '#fff', fontWeight: 800, cursor: 'pointer', marginBottom: 16 }}
      >
        {running ? 'Running…' : 'Run'}
      </button>
      <button
        onClick={() => { setWiring(null); setTestingWiring(true); }}
        disabled={testingWiring}
        style={{ padding: '10px 18px', borderRadius: 10, border: 0, background: '#7c3aed', color: '#fff', fontWeight: 800, cursor: 'pointer', marginBottom: 16, marginLeft: 8 }}
      >
        Test challenge wiring
      </button>
      <pre id="bench-result" style={{ fontSize: 13, background: '#1e293b', padding: 12, borderRadius: 8, minHeight: 40 }}>
        {result ? JSON.stringify(result, null, 2) : '—'}
      </pre>
      <pre id="wiring-result" style={{ fontSize: 13, background: '#1e293b', padding: 12, borderRadius: 8, minHeight: 30, marginTop: 8 }}>
        {wiring ? JSON.stringify(wiring) : '—'}
      </pre>
      {testingWiring && <ChallengeWiring onResult={(r) => { setWiring(r); setTestingWiring(false); }} />}
      <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left' }}>
        {running && <Bench onDone={done} />}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
container.__root ??= createRoot(container);
container.__root.render(<App />);
