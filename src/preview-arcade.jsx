// Dev-only harness for the tower-defense arcade.
//
// The real screens sit behind Supabase auth, so this mounts the Games hub with
// hand-made props to exercise a track's arena, difficulty tier and the TD board
// itself. Entry point: preview-arcade.html. Not part of the production build.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Games from './tasks/Games';
import UnitCard from './components/UnitCard';
import { getTrack } from './data/index';
import { getTask } from './tasks/taskRegistry';
import { arcadeConfig } from './components/towerdefense/unitDifficulty';

// Below the 80 XP gate, then over it with an arcade high score already banked.
const LOCKED_SCORES = { p10: { current: 10 }, p1: { current: 10 }, p11: { current: 25 }, p14: { current: 15 } };
const UNLOCKED_SCORES = { ...LOCKED_SCORES, p7: { current: 20 }, p9: { current: 10 }, GAMES: { current: 4820 } };

const CASES = [
  ['GED_MATH', 'MATH_0B'],
  ['GED_MATH', 'MATH_1A'],
  ['GED_MATH', 'MATH_1B'],
  ['GED_ENG', 'ENG_0A'],
  ['GED_ENG', 'ENG_1C'],
  ['GED_SCIENCE', 'SCI_0A'],
];

function Harness() {
  const [open, setOpen] = useState(null);

  if (open) {
    const [track, unitId] = open;
    const unit = getTrack(track).data[unitId];
    const pool = getTask('GAMES').buildPool(unit, { track, unitId });
    // 90 XP of academic work: past the 80 XP gate, so the arcade is unlocked.
    const scores = { p10: { current: 10 }, p1: { current: 10 }, p11: { current: 25 }, p14: { current: 15 }, p7: { current: 20 }, p9: { current: 10 } };
    return (
      <Games
        pool={pool}
        unitId={unitId}
        track={track}
        scores={scores}
        onComplete={(s, a, meta) => console.log('[harness] complete', s, meta)}
        onQuit={() => setOpen(null)}
      />
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui', background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontWeight: 900, fontSize: 28, marginBottom: 16 }}>Arcade harness</h1>
      <table id="config-table" style={{ borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 }}>
        <thead>
          <tr>{['Track', 'Unit', 'Map', 'Theme', 'Tier', 'Lives', 'HP×', 'Score×', 'Bans'].map(h => (
            <th key={h} style={{ textAlign: 'left', padding: '4px 12px', borderBottom: '1px solid #334155' }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {CASES.map(([track, unitId]) => {
            const c = arcadeConfig(track, unitId);
            return (
              <tr key={`${track}/${unitId}`} data-row={`${track}/${unitId}`}>
                <td style={{ padding: '4px 12px' }}>{track}</td>
                <td style={{ padding: '4px 12px' }}>{unitId}</td>
                <td style={{ padding: '4px 12px' }}>{c.mapId}</td>
                <td style={{ padding: '4px 12px' }}>{c.themeId}</td>
                <td style={{ padding: '4px 12px' }}>{c.tier} {c.tierLabel}</td>
                <td style={{ padding: '4px 12px' }}>{c.lives}</td>
                <td style={{ padding: '4px 12px' }}>{c.difficulty.hpMul}</td>
                <td style={{ padding: '4px 12px' }}>{c.difficulty.scoreMul}</td>
                <td style={{ padding: '4px 12px' }}>{c.bannedTowers.join(', ') || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        {CASES.map(([track, unitId]) => (
          <button
            key={`${track}/${unitId}`}
            onClick={() => setOpen([track, unitId])}
            style={{ padding: '12px 20px', borderRadius: 12, border: 0, background: '#1cb0f6', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
          >
            {track} · {unitId}
          </button>
        ))}
      </div>

      <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16 }}>
        <h2 id="card-heading" style={{ color: '#0f172a', fontWeight: 900, marginBottom: 12 }}>
          Unit card — 60 XP (arcade locked) vs 90 XP (unlocked, with a high score)
        </h2>
        {[['locked', LOCKED_SCORES], ['unlocked', UNLOCKED_SCORES]].map(([label, scores]) => (
          <div key={label} data-card={label}>
            <UnitCard
              unit={getTrack('GED_MATH').data.MATH_1A}
              scores={scores}
              isExpanded
              onToggle={() => {}}
              startMode={(u, t) => console.log('[harness] start', u, t)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Cached so an HMR update re-renders instead of calling createRoot twice.
const container = document.getElementById('root');
container.__root ??= createRoot(container);
container.__root.render(<Harness />);
