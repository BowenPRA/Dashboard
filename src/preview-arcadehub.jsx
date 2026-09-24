// Dev-only harness for the Arcade's screens and its Home tile.
//
// The real Arcade sits behind Supabase auth, so this mounts the presentational
// components (components/arcade/*) with hand-made numbers.
//   preview-arcadehub.html?screen=hub            the hub, gold locked
//   preview-arcadehub.html?screen=hub&free=1     the hub with free play on
//   preview-arcadehub.html?screen=hub&poor=1     the hub with an empty purse
//   preview-arcadehub.html?screen=board          the leaderboard
//   preview-arcadehub.html?screen=banner         the Home tile next to a course card
// Add &theme=dark for dark mode (the banner is the only screen that changes).
// Not part of the production build.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ArcadeShell, ArcadeHub, ArcadeLeaderboard } from './components/arcade/ArcadeHub';
import ArcadeBanner from './components/arcade/ArcadeBanner';
import { arcadeConfig, ARCADE_LEVELS } from './components/towerdefense/unitDifficulty';
import { ARCADE_TRACK_ID } from './components/trackRegistry';
import { PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO } from './arcade/economy';

const params = new URLSearchParams(window.location.search);
const screen = params.get('screen') || 'hub';
const freeOn = params.get('free') === '1';
const poor = params.get('poor') === '1';

const LEVELS = ARCADE_LEVELS.map((l) => ({ ...l, cfg: arcadeConfig(ARCADE_TRACK_ID, l.id) }));
const BEST = { ARC_1: { GAMES: 4820, SURVIVOR: 1320 }, ARC_2: { GAMES: 2210 }, ARC_3: { SURVIVOR: 960 } };
const bestOf = (id, key) => BEST[id]?.[key] || 0;

const FREE = freeOn
  ? { unlocked: true, via: 'xp', done: 17, total: 20, xp: 1740, maxXp: 2000, needXp: 1600 }
  : { unlocked: false, via: null, done: 9, total: 20, xp: 1250, maxXp: 2000, needXp: 1600 };
const EARNED = 1250;
const BALANCE = poor ? 10 : 140;

const ROWS = [
  { id: 1, name: 'Vi Khoi', score: 4820 },
  { id: 2, name: 'Minh', score: 3910 },
  { id: 3, name: 'An', score: 2750 },
  { id: 4, name: 'Bao', score: 1980 },
  { id: 5, name: 'Linh', score: 1220 },
];

function HubHarness() {
  const [selectedId, setSelectedId] = useState(LEVELS[0].id);
  const [toast, setToast] = useState(null);
  return (
    <ArcadeShell toast={toast}>
      <ArcadeHub
        balance={BALANCE}
        earned={EARNED}
        free={FREE}
        economy={{ PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO }}
        levels={LEVELS}
        selectedId={selectedId}
        onSelect={setSelectedId}
        bestOf={bestOf}
        onPlay={(g) => {
          if (!FREE.unlocked && BALANCE < PLAY_COST) {
            setToast(`Not enough gold — you need ${PLAY_COST}. Earn gold by finishing tasks!`);
            setTimeout(() => setToast(null), 3200);
            return;
          }
          console.log('[harness] play', g, selectedId);
        }}
        onLeaderboard={() => console.log('[harness] leaderboard')}
        onBack={() => console.log('[harness] back')}
        onLogout={() => console.log('[harness] logout')}
      />
    </ArcadeShell>
  );
}

function BoardHarness() {
  const [boardId, setBoardId] = useState('TD');
  return (
    <ArcadeShell>
      <ArcadeLeaderboard
        levelNo={1}
        mapName="Serpentine Valley"
        boardId={boardId}
        onBoard={setBoardId}
        onBack={() => console.log('[harness] back')}
        loading={false}
        error={null}
        pending={boardId === 'SURVIVOR' && params.get('pending') === '1'}
        rows={boardId === 'TD' ? ROWS : []}
      />
    </ArcadeShell>
  );
}

/** The tile as Home draws it, under a stand-in course card for contrast. */
function BannerHarness() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Mathematical Reasoning', 'Science'].map((title) => (
            <div key={title} className="rounded-[2.25rem] border-2 border-slate-200 dark:border-slate-800 border-b-[8px] bg-white dark:bg-slate-900 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1cb0f6] border-b-[4px] border-[#1899d6]" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">A stand-in course card</p>
                </div>
              </div>
              <div className="mt-4 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div className="h-full w-2/3 bg-[#1cb0f6]" /></div>
            </div>
          ))}
        </div>
        <ArcadeBanner balance={BALANCE} freePlay={freeOn} playCost={PLAY_COST} onOpen={() => console.log('[harness] open arcade')} />
        <ArcadeBanner balance={null} freePlay={false} playCost={PLAY_COST} onOpen={() => {}} />
      </div>
    </div>
  );
}

const Screen = screen === 'board' ? BoardHarness : screen === 'banner' ? BannerHarness : HubHarness;

// Cached so an HMR update re-renders instead of calling createRoot twice.
const container = document.getElementById('root');
container.__root ??= createRoot(container);
container.__root.render(<Screen />);
