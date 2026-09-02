// Dev-only harness for Swarm Survivor. Entry point: preview-survivor.html.
// Not part of the production build — Vite only builds index.html.
//
// Why this exists as its own harness rather than going through preview-arcade:
// a Survivor run is a six-minute simulation, and the only way to check that the
// spawn ladder, the boss, the level-up cadence and the scoring actually behave
// is to WATCH one — which nobody has six minutes to do, repeatedly, by hand.
//
// So this harness can lie about time. `?speed=N` shims `performance.now` to a
// fake clock that advances a fixed timestep per animation frame, which makes the
// engine run as fast as the browser will schedule frames instead of in real
// time. `?speed=1` (the default) plays normally.
//
// It also shims `requestAnimationFrame` onto setTimeout, because rAF does not
// fire at all in a tab that is not being composited — which is exactly the
// situation when driving the page from a tool rather than looking at it.

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Survivor from './tasks/games/Survivor';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';
import { arcadeConfig } from './components/towerdefense/unitDifficulty';
import { STEP_MS, RUN, SURVIVOR_ENEMIES } from './components/survivor/survivorData';

const params = new URLSearchParams(location.search);
const SPEED = Math.max(1, Number(params.get('speed')) || 1);
const TRACK = params.get('track') || 'Y7_MATH';
const UNIT = params.get('unit') || 'U01_3';

// ---- clock shims -----------------------------------------------------------
// Installed before the first render so the engine takes its `performance.now()`
// baseline from the fake clock rather than the real one.
//
// Two modes:
//   ?speed=1        real time, real frames (just watch it)
//   ?speed=N        N-times fake clock, frames driven by setTimeout
//   ?speed=manual   frames are PUMPED by hand from window.__pump(n)
//
// Manual mode exists because a background tab throttles both rAF and setTimeout
// to about one call a second, which makes a six-minute run take hours to
// simulate. Pumping runs the loop as fast as the JS engine will go, and — more
// usefully — makes the run deterministic and steppable: pump exactly 900 frames
// and you are exactly thirty seconds in, every time.
// `?bossAt=<seconds>` brings the Broodmother forward. The endgame is the part of
// the run hardest to reach on purpose and the worst part to ship untested, so the
// harness can summon it early. This mutates the shared RUN table, which is fine
// precisely because nothing but this dev entry point ever does.
const bossAt = Number(params.get('bossAt'));
if (Number.isFinite(bossAt) && bossAt > 0) {
  RUN.bossAtMs = bossAt * 1000;
  RUN.eliteAtMs = RUN.eliteAtMs.filter(ms => ms < RUN.bossAtMs);
}

// `?bossHp=<n>` shrinks the Broodmother so the victory screen can be reached in a
// test rather than only by playing well for five minutes.
const bossHp = Number(params.get('bossHp'));
if (Number.isFinite(bossHp) && bossHp > 0) SURVIVOR_ENEMIES.GIANT_ANT.hp = bossHp;

const MANUAL = params.get('speed') === 'manual';
let fakeNow = performance.now();

if (MANUAL || SPEED > 1) {
  performance.now = () => fakeNow;
}

if (MANUAL) {
  let pending = null;
  window.requestAnimationFrame = (cb) => { pending = cb; return 1; };
  window.cancelAnimationFrame = () => { pending = null; };
  /** Run `frames` simulation frames synchronously. Returns how many actually ran. */
  window.__pump = (frames = 1) => {
    let ran = 0;
    for (let i = 0; i < frames; i++) {
      const cb = pending;
      pending = null;
      if (!cb) break;                 // the loop has stopped asking for frames
      fakeNow += STEP_MS;
      cb(fakeNow);
      ran++;
    }
    return ran;
  };
} else {
  window.requestAnimationFrame = (cb) => setTimeout(() => {
    if (SPEED > 1) fakeNow += STEP_MS * SPEED;
    cb(performance.now());
  }, 0);
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}

// ---- the harness -----------------------------------------------------------

function Harness() {
  const [result, setResult] = useState(null);

  const unit = getTrack(TRACK).data[UNIT];
  const pool = getTask('GAMES').buildPool(unit, { track: TRACK, unitId: UNIT });
  const gameConfig = arcadeConfig(TRACK, UNIT);

  // A generous purse, so the loadout screen has something to exercise.
  const credits = 400;

  // Published for assertions from the driving tool: everything the HUD shows is
  // already in the DOM, and this fills in what is not.
  useEffect(() => {
    window.__harness = { track: TRACK, unit: UNIT, speed: SPEED, gameConfig, credits, result };
  }, [gameConfig, credits, result]);

  if (result) {
    return (
      <pre id="result" style={{ padding: 24, fontFamily: 'ui-monospace, monospace', color: '#fff', background: '#0f172a', minHeight: '100vh' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  }

  return (
    <Survivor
      pool={pool}
      unitId={UNIT}
      gameConfig={gameConfig}
      startingCredits={credits}
      onComplete={(score) => setResult({ score })}
      onQuit={() => setResult(r => r || { score: 0, quit: true })}
    />
  );
}

const container = document.getElementById('root');
container.__root ??= createRoot(container);
container.__root.render(<Harness />);
