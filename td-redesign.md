This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/tasks/games/TowerDefense.jsx, src/components/towerdefense/**, src/tasks/Games.jsx, src/data/GED/ENG_1A/data.js, src/data/GED/ENG_1A/games.js, src/hooks/useStudentProgress.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/components/towerdefense/BuildMenu.jsx
src/components/towerdefense/ExitConfirmModal.jsx
src/components/towerdefense/GameBoard.jsx
src/components/towerdefense/gameData.js
src/components/towerdefense/HUD.jsx
src/components/towerdefense/themeData.js
src/components/towerdefense/TowerVisual.jsx
src/components/towerdefense/UpgradeBadges.jsx
src/components/towerdefense/UpgradePanel.jsx
src/components/towerdefense/useGameEngine.js
src/components/towerdefense/VocabChallenge.jsx
src/components/towerdefense/wavePresets.js
src/data/GED/ENG_1A/data.js
src/data/GED/ENG_1A/games.js
src/hooks/useStudentProgress.js
src/tasks/Games.jsx
src/tasks/games/TowerDefense.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/towerdefense/BuildMenu.jsx">
// src/components/towerdefense/BuildMenu.jsx
import React from 'react';
import { Coins, Zap } from 'lucide-react';
import { TOWERS, TOWER_ORDER } from './gameData';
import TowerVisual from './TowerVisual'; 

const TOWER_THEME = {
  DART:   { bg: 'bg-[#62b530]', border: 'border-[#4e9226]', text: 'text-white' },
  SNIPER: { bg: 'bg-[#14bdd2]', border: 'border-[#1098a8]', text: 'text-white' },
  SPLASH: { bg: 'bg-[#c21487]', border: 'border-[#9b106c]', text: 'text-white' },
  FROST:  { bg: 'bg-[#8dbcf0]', border: 'border-[#7196c0]', text: 'text-slate-900' },
  CHAIN:  { bg: 'bg-[#f3c40f]', border: 'border-[#c39d0c]', text: 'text-amber-950' },
  NITRO:  { bg: 'bg-[#8842d0]', border: 'border-[#6d35a6]', text: 'text-white' }
};

export default function BuildMenu({ allowedTowers, credits, activeBuilder, onSelect, bolts, onUseBolt }) {
  const ids = TOWER_ORDER.filter(id => allowedTowers.includes(id));

  return (
    <aside className="order-3 md:order-none w-full md:w-28 h-auto bg-slate-800 md:border-l-4 border-t-4 md:border-t-0 border-slate-950 flex flex-row md:flex-col p-2 sm:p-3 md:p-4 gap-2 sm:gap-3 flex-shrink-0 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      {/* Scrollable list of towers (Horizontal on mobile, vertical on desktop) */}
      <div className="flex-1 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col gap-2 md:gap-3 items-center md:items-stretch custom-scrollbar h-[72px] md:h-auto pb-1 md:pb-0">
        
        {ids.map(id => {
          const t = TOWERS[id];
          if (!t) return null;
          const theme = TOWER_THEME[id];
          const canAfford = credits >= t.cost;
          const isSelected = activeBuilder?.typeId === id;

          let cls;
          if (isSelected) {
            cls = `${theme.bg} ${theme.text} translate-y-1 border-b-0 ring-4 ring-offset-2 ring-offset-slate-800 ring-white`;
          } else if (canAfford) {
            cls = `${theme.bg} border-b-[6px] ${theme.border} ${theme.text} hover:brightness-110 active:border-b-0 active:translate-y-[6px]`;
          } else {
            cls = 'bg-slate-700 border-b-[6px] border-slate-900 text-slate-500 opacity-50 cursor-not-allowed';
          }

          return (
            <button
              key={id}
              onClick={() => canAfford && onSelect({ typeId: id })}
              disabled={!canAfford}
              title={`${t.name} — ${t.desc}`}
              className={`group relative h-16 md:h-auto aspect-square md:w-full rounded-2xl transition-all flex flex-col items-center justify-center gap-1 p-2 shrink-0 ${cls}`}
            >
              <TowerVisual typeId={id} size="sm" dimmed={!canAfford} />

              <div className={`flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-lg mt-0.5 text-[10px] font-black tabular-nums bg-black/20 ${!canAfford && 'text-slate-400'}`}>
                <Coins className="w-2.5 h-2.5" strokeWidth={3} />
                {t.cost}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reward Blasts */}
      <div className="flex flex-row md:flex-col items-center justify-center md:border-t-2 border-slate-700 md:pt-4 gap-2 w-auto md:w-full shrink-0 border-l-2 md:border-l-0 pl-3 md:pl-0">
        <div className="hidden md:block text-[9px] font-black uppercase text-slate-400 text-center leading-tight">Reward<br/>Blasts</div>
        <button
          onClick={onUseBolt}
          disabled={bolts === 0}
          title="Ignore Armor! Massive damage to all!"
          className={`h-16 aspect-square md:w-full rounded-2xl flex flex-col items-center justify-center transition-all 
            ${bolts > 0 
              ? 'bg-indigo-500 border-b-[6px] border-indigo-700 active:border-b-0 active:translate-y-[6px] text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:brightness-110' 
              : 'bg-slate-700 border-b-[6px] border-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
        >
          <Zap className={`w-6 h-6 ${bolts > 0 ? 'fill-current animate-pulse' : ''}`} strokeWidth={2.5} />
          <span className="font-black mt-1 text-sm tabular-nums">{bolts}</span>
        </button>
      </div>

    </aside>
  );
}
</file>

<file path="src/components/towerdefense/ExitConfirmModal.jsx">
// src/components/towerdefense/ExitConfirmModal.jsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ExitConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2rem] border-b-8 border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-rose-100 border-b-4 border-rose-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-rose-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Leave the battle?</h2>
          <p className="text-base font-bold text-slate-500 leading-snug">
            Your towers will be lost and your wave progress won't be saved.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-700 font-black transition-all uppercase tracking-widest text-sm"
          >
            Keep Playing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" strokeWidth={3} /> End Run
          </button>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/GameBoard.jsx">
// src/components/towerdefense/GameBoard.jsx
import React, { useMemo, useRef, memo } from 'react';
import { ENEMIES, TOWERS, getEffectiveStats, getNitroBuff } from './gameData';
import { MAP_THEMES } from './themeData';
import TowerVisual, { InsectVisual, DonutBase } from './TowerVisual';
import UpgradeBadges from './UpgradeBadges';

export const CELL_SIZE = 48;

const StaticEnvironment = memo(({ width, height, theme, pathPoints, decorations }) => {
  const fallbackDecos = ['🌳', '🌲', '🍄', '🌿', '🪨'];
  const symbols = theme.decoSymbols || fallbackDecos;

  return (
    <>
      {/* Tiled Grid Background */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
        <defs>
          <pattern id="td-grid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
            <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke={theme.gridStr} strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#td-grid)" />
      </svg>

      {/* Decorations */}
      {decorations.map(d => (
        <div
          key={`dec_${d.id}`}
          className="absolute pointer-events-none select-none drop-shadow-md z-10"
          style={{
            transform: `translate(${d.col * CELL_SIZE + CELL_SIZE / 2}px, ${d.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)`,
            fontSize: d.variant === 0 || d.variant === 1 ? 28 : 20,
            opacity: d.variant === 4 ? 0.7 : 0.95
          }}
        >
          {symbols[d.variant % symbols.length]}
        </div>
      ))}

      {/* Path Vectors */}
      <svg className="absolute inset-0 pointer-events-none z-0 transition-colors duration-500" width={width} height={height}>
        <polyline points={pathPoints} fill="none" stroke={theme.pathOutline} strokeWidth={CELL_SIZE - 4} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={pathPoints} fill="none" stroke={theme.pathCore} strokeWidth={CELL_SIZE - 12} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </>
  );
});

export default function GameBoard({
  layout, towers, creeps, projectiles, floaters, particles, burnZones, decorations,
  lives, maxLives, selectedTowerId, hoveredTowerId, activeBuilder, hoverCell,
  onCellClick, onCellHover, onCellLeave, onTowerClick, themeId = 'STANDARD'
}) {
  const { rows, cols, path } = layout;
  const width = cols * CELL_SIZE;
  const height = rows * CELL_SIZE;
  const theme = MAP_THEMES[themeId] || MAP_THEMES.STANDARD;
  const boardRef = useRef(null);

  const pathCellSet = useMemo(() => {
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
  }, [path]);

  const pathPoints = useMemo(() =>
    path.map(([r, c]) => `${c * CELL_SIZE + CELL_SIZE / 2},${r * CELL_SIZE + CELL_SIZE / 2}`).join(' ')
  , [path]);

  const handlePointerInteraction = (e, isClick) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const scaleX = rect.width / width;
    const scaleY = rect.height / height;
    
    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;
    
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const isPath = pathCellSet.has(`${row}_${col}`);
      if (isClick) {
        onCellClick(row, col, isPath);
      } else {
        if (hoverCell.row !== row || hoverCell.col !== col) {
          onCellHover(row, col, isPath);
        }
      }
    }
  };

  const rangeTower = towers.find(t => t.id === selectedTowerId) || towers.find(t => t.id === hoveredTowerId);
  const rangeStats = rangeTower ? getEffectiveStats(rangeTower) : null;
  const rangeVal = rangeStats ? (rangeStats.range || rangeStats.auraRange) : 0;

  return (
    <div
      ref={boardRef}
      onMouseMove={(e) => handlePointerInteraction(e, false)}
      onClick={(e) => handlePointerInteraction(e, true)}
      onMouseLeave={onCellLeave}
      className="relative w-full h-full overflow-hidden shadow-2xl cursor-pointer transition-colors duration-500"
      style={{ width, height, backgroundColor: theme.bg }}
    >
      <style>{`
        @keyframes td-pop-in {
          0% { transform: scale(0) translateY(-12px); }
          70% { transform: scale(1.12) translateY(0); }
          100% { transform: scale(1) translateY(0); }
        }
        .td-pop-in { animation: td-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .gpu-accel { will-change: transform; backface-visibility: hidden; }

        /* PERFORMANCE FIX: Forces insect leg animations to run at half-speed and drop frames (stepped) */
        .creep-visual * {
          animation-duration: 0.6s !important;
          animation-timing-function: steps(2, end) !important;
        }
      `}</style>

      <StaticEnvironment 
        width={width} height={height} 
        theme={theme} pathPoints={pathPoints} 
        decorations={decorations} 
      />

      <PortalMarker row={path[0][0]} col={path[0][1]} kind="in" />
      <PortalMarker row={path[path.length - 1][0]} col={path[path.length - 1][1]} kind="out" healthPct={lives / maxLives} />

      {/* Burn Zones */}
      {burnZones.map(z => (
        <div
          key={z.id}
          className="absolute pointer-events-none rounded-full z-10 gpu-accel bg-rose-500"
          style={{
            transform: `translate(${z.col * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE}px, ${z.row * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE}px)`,
            width: z.radius * 2 * CELL_SIZE, height: z.radius * 2 * CELL_SIZE,
            opacity: Math.min(0.25, z.life / z.maxLife)
          }}
        />
      ))}

      {rangeTower && rangeStats && rangeVal > 0 && (
        <div
          className="absolute pointer-events-none rounded-full border-[3px] border-white z-10 transition-all duration-300"
          style={{
            transform: `translate(${rangeTower.col * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px, ${rangeTower.row * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px)`,
            width: rangeVal * 2 * CELL_SIZE, height: rangeVal * 2 * CELL_SIZE,
            background: 'rgba(255,255,255,0.15)', borderStyle: 'dashed'
          }}
        />
      )}

      {activeBuilder && hoverCell.row >= 0 && (() => {
        const tConf = TOWERS[activeBuilder.typeId];
        if (!tConf) return null;
        const range = tConf.base.range || tConf.base.auraRange || 0;
        return (
          <>
            {range > 0 && (
              <div
                className="absolute pointer-events-none rounded-full border-[3px] z-10 transition-all duration-75"
                style={{
                  transform: `translate(${hoverCell.col * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px)`,
                  width: range * 2 * CELL_SIZE, height: range * 2 * CELL_SIZE,
                  borderStyle: 'dashed',
                  borderColor: hoverCell.valid ? 'rgba(255,255,255,0.9)' : 'rgba(234,43,43,0.9)',
                  background: hoverCell.valid ? 'rgba(255,255,255,0.15)' : 'rgba(234,43,43,0.2)'
                }}
              />
            )}
            <div
              className="absolute pointer-events-none flex items-center justify-center z-10 transition-all duration-75"
              style={{
                transform: `translate(${hoverCell.col * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE}px)`,
                width: CELL_SIZE, height: CELL_SIZE, opacity: hoverCell.valid ? 0.9 : 0.4
              }}
            >
              <TowerVisual typeId={activeBuilder.typeId} size="md" dimmed={!hoverCell.valid} />
            </div>
          </>
        );
      })()}

      {towers.map(t => {
        const isSelected = selectedTowerId === t.id;
        const isHovered = hoveredTowerId === t.id;
        const isBuffed = t.typeId !== 'NITRO' && getNitroBuff(t, towers).rateMul < 1;

        return (
          <div
            key={t.id}
            onClick={(e) => { e.stopPropagation(); onTowerClick(t.id); }}
            className="absolute cursor-pointer z-20"
            style={{ 
               transform: `translate(${t.col * CELL_SIZE}px, ${t.row * CELL_SIZE}px)`, 
               width: CELL_SIZE, height: CELL_SIZE 
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center td-pop-in">
              {isBuffed && <div className="absolute inset-0 scale-125 bg-yellow-400/20 border-2 border-yellow-400/40 rounded-full animate-pulse z-0 pointer-events-none" />}
              <UpgradeBadges upgrades={t.upgrades} />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                 <TowerVisual typeId={t.typeId} size="md" selected={isSelected} hovered={isHovered} upgrades={t.upgrades} />
              </div>
            </div>
          </div>
        );
      })}

      {projectiles.map(p => {
        if (p.kind === 'DART_PROJ') {
          const angleDeg = Math.atan2(p.targetRow - p.row, p.targetCol - p.col) * (180 / Math.PI);
          return (
            <div key={p.id} className="absolute z-30 pointer-events-none gpu-accel" 
                 style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px)` }}>
              <div className="absolute flex items-center justify-center" style={{ width: p.passive ? 24 : 16, height: p.passive ? 24 : 16, transform: `translate(-50%, -50%) rotate(${angleDeg + 90}deg)` }}>
                 <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                    {p.passive ? <polygon points="12,2 18,22 12,18 6,22" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2"/> : <polygon points="12,4 16,20 12,16 8,20" fill="#a855f7" stroke="#4c1d95" strokeWidth="2"/>}
                 </svg>
              </div>
            </div>
          );
        }
        
        if (p.kind === 'SNIPER_PROJ') {
          const angleDeg = Math.atan2(p.targetRow - p.row, p.targetCol - p.col) * (180 / Math.PI);
          return (
            <div key={p.id} className="absolute z-30 pointer-events-none gpu-accel" 
                 style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px)` }}>
               <div className="absolute border border-white/50" style={{ 
                 width: p.passive ? 28 : 20, height: p.passive ? 8 : 4, background: p.passive ? '#f59e0b' : '#10b981', 
                 borderRadius: '4px', transform: `translate(-50%, -50%) rotate(${angleDeg}deg)` 
               }} />
            </div>
          );
        }

        return (
          <div
            key={p.id} className="absolute pointer-events-none z-30 gpu-accel"
            style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)` }}
          >
            {p.kind === 'CHAIN' ? (
              <svg width={(p.range || 6) * CELL_SIZE * 2} height={(p.range || 6) * CELL_SIZE * 2}
                   className="absolute pointer-events-none"
                   style={{ transform: `translate(${-(p.range || 6) * CELL_SIZE}px, ${-(p.range || 6) * CELL_SIZE}px)` }}>
                {(p.lines || []).map((ln, i) => (
                  <line key={i} x1={(p.range || 6) * CELL_SIZE} y1={(p.range || 6) * CELL_SIZE} x2={(ln.col - p.col) * CELL_SIZE + (p.range || 6) * CELL_SIZE} y2={(ln.row - p.row) * CELL_SIZE + (p.range || 6) * CELL_SIZE} stroke="#FFC800" strokeWidth="4" strokeLinecap="round" opacity={p.life / p.maxLife} />
                ))}
              </svg>
            ) : p.kind === 'LANCE' ? (
              <div
                className="absolute border border-amber-300/50"
                style={{
                  width: p.length * CELL_SIZE, height: 12, borderRadius: 6,
                  background: 'linear-gradient(90deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.8) 40%, rgba(239,68,68,1) 100%)',
                  transform: `translate(0, -6px) rotate(${p.angle}rad)`, transformOrigin: '0 50%',
                  opacity: Math.max(0, p.life / p.maxLife)
                }}
              />
            ) : (
              <div
                className="rounded-full border border-white/50"
                style={{
                  width: p.kind === 'SPLASH' ? 14 : 8, height: p.kind === 'SPLASH' ? 14 : 8,
                  background: p.color || '#fff', transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </div>
        );
      })}

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id} className="absolute pointer-events-none rounded-full z-30 gpu-accel border border-white/20"
          style={{
            transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE}px, ${p.row * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE}px) scale(${1 - p.life / p.maxLife * 0.3})`,
            width: p.radius * 2 * CELL_SIZE, height: p.radius * 2 * CELL_SIZE,
            background: p.color || 'rgba(255,255,255,0.5)', opacity: p.life / p.maxLife,
          }}
        />
      ))}

      {creeps.map(c => {
        const eConf = ENEMIES[c.typeKey];
        if (!eConf) return null;
        const hpPct = Math.max(0, c.hp / c.maxHp);
        const rotationAngle = (c.angle || 0) + 90;

        return (
          <div
            key={c.id} className="absolute pointer-events-none z-20 flex flex-col items-center justify-center gpu-accel"
            style={{ transform: `translate(${c.col * CELL_SIZE + CELL_SIZE / 2}px, ${c.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)` }}
          >
            <div className="absolute -top-4 w-10 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700 z-30">
              <div className="h-full rounded-full" style={{ width: `${hpPct * 100}%`, background: hpPct > 0.5 ? '#58A700' : hpPct > 0.25 ? '#FFC800' : '#EA2B2B' }} />
            </div>
            
            <div
              className="flex items-center justify-center relative creep-visual"
              style={{ 
                width: eConf.radius * 2.5, 
                height: eConf.radius * 2.5, 
                transform: `rotate(${rotationAngle}deg)`,
                // THE TINT FIX: Color-shifting filter applies directly to the non-transparent model shapes.
                filter: c.freezeTimer > 0 ? 'sepia(1) hue-rotate(180deg) saturate(4) brightness(1.2)' : 'none'
              }}
            >
              <InsectVisual type={c.typeKey} />
            </div>

            {c.freezeTimer > 0 && <div className="absolute -top-8 text-xs">❄️</div>}
            {(c.burning > 0 || (c.burnStacks && c.burnStacks.length > 0)) && <div className="absolute -top-8 text-xs">🔥</div>}
            {eConf.damageReduction > 0 && hpPct > 0 && <div className="absolute -bottom-5 text-[10px] bg-slate-800 text-slate-300 font-black px-1 rounded-sm border border-slate-700">🛡️</div>}
          </div>
        );
      })}

      {floaters.map(f => (
        <div
          key={f.id} className={`absolute pointer-events-none font-black text-sm sm:text-base z-40 gpu-accel ${f.colorClass}`}
          style={{
            transform: `translate(${f.col * CELL_SIZE + CELL_SIZE / 2}px, ${f.row * CELL_SIZE + CELL_SIZE / 2 - (1 - f.life / f.maxLife) * 35}px) translate(-50%, -50%)`,
            opacity: f.life / f.maxLife, WebkitTextStroke: '1px rgba(0,0,0,0.8)'
          }}
        >
          {f.text}
        </div>
      ))}
    </div>
  );
}

function PortalMarker({ row, col, kind, healthPct }) {
  const isIn = kind === 'in';
  return (
    <div
      className="absolute pointer-events-none flex items-center justify-center z-10"
      style={{ transform: `translate(${col * CELL_SIZE}px, ${row * CELL_SIZE}px)`, width: CELL_SIZE, height: CELL_SIZE }}
    >
      {isIn ? (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500 fill-current drop-shadow-md animate-pulse" style={{ transform: 'translateX(20%)' }}>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ) : (
        <DonutBase healthPct={healthPct} />
      )}
    </div>
  );
}
</file>

<file path="src/components/towerdefense/gameData.js">
// =====================================================================
// Shared definitions for the Tower Defense game.
// Everything lives here so levels stay simple and share the same units.
// =====================================================================

// ---------- Enemies ----------
export const ENEMIES = {
  ANT: {
    name: "Worker Ant",
    color: "bg-red-200", 
    border: "border-red-400",
    hp: 30,
    speed: 1.1,
    reward: 1,
    radius: 12, 
    damageReduction: 0
  },
  WASP: {
    name: "Wasp",
    color: "bg-yellow-300",
    border: "border-yellow-500",
    hp: 70, 
    speed: 1.7,
    reward: 2, // Increased from 1
    radius: 14, 
    damageReduction: 0
  },
  BEETLE: {
    name: "Stag Beetle",
    color: "bg-amber-800",
    border: "border-amber-950",
    hp: 400, 
    speed: 0.6,
    reward: 5, // Increased from 2
    radius: 20, 
    damageReduction: 20 
  },
  QUEEN: {
    name: "Queen Brood",
    color: "bg-purple-600",
    border: "border-purple-800",
    hp: 2000, 
    speed: 0.45,
    reward: 10,
    radius: 28, 
    damageReduction: 50 
  },
  GIANT_ANT: {
    name: "Broodmother",
    color: "bg-red-900",
    border: "border-red-950",
    hp: 4000, 
    speed: 0.70, // Increased speed from 0.45
    reward: 15,
    radius: 34, 
    damageReduction: 70 
  }
};

// ---------- Towers ----------
export const TOWERS = {
  DART: {
    id: 'DART',
    name: "Sentry",
    emoji: "🎯",
    cost: 20,
    type: 'SINGLE',
    desc: "Cheap, rapid-fire defender. Deals +1 damage for each adjacent tower.",
    gradient: "from-sky-400 to-sky-600",
    accent: "bg-sky-500",
    ring: "ring-sky-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.2, damage: 9, cooldown: 800 },
    upgrades: {
      rate:    { cost: 30, label: "Rapid Fire", desc: "Fires twice as fast" },
      damage:  { cost: 45, label: "Sharp Tips", desc: "+200% damage" },
      range:   { cost: 25, label: "Eagle Eye",  desc: "+1 range" },
      passive: { cost: 75, label: "Pierce",     desc: "Each shot also hits a 2nd nearby enemy" }
    }
  },

  SNIPER: {
    id: 'SNIPER',
    name: "Marksman",
    emoji: "🔭",
    cost: 50,
    type: 'SINGLE',
    desc: "Long range, heavy damage, ignores armor, slow fire.",
    gradient: "from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    ring: "ring-emerald-400",
    defaultTargeting: 'STRONG',
    base: { range: 6, damage: 65, cooldown: 3800 },
    upgrades: {
      rate:      { cost: 120, label: "Quick Reload",   desc: "Fires 35% faster" },
      damage:    { cost: 110, label: "Heavy Caliber",  desc: "+100% damage" },
      range:     { cost: 60,  label: "Extended Scope", desc: "+2 range" },
      targeting: { cost: 70,  label: "Shatter",        desc: "Targets enemies with highest armor" },
      passive:   { cost: 180, label: "Piercing Lance", desc: "Adds enemy reduction to damage. Shots penetrate hitting all enemies in a short line." }
    }
  },

  SPLASH: {
    id: 'SPLASH',
    name: "Mortar",
    emoji: "💣",
    cost: 100, 
    type: 'SPLASH',
    desc: "Lobs explosives for area damage",
    gradient: "from-rose-400 to-rose-600",
    accent: "bg-rose-500",
    ring: "ring-rose-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.5, damage: 18, splashRadius: 1.5, cooldown: 1600 },
    upgrades: {
      rate:      { cost: 90,  label: "Auto Loader",  desc: "Fires 35% faster" },
      damage:    { cost: 120, label: "Heavy Shells", desc: "+90% damage" },
      range:     { cost: 60,  label: "Long Lob",     desc: "+1 range" },
      targeting: { cost: 80,  label: "Cluster Bomb", desc: "Targets densest enemy group" },
      passive:   { cost: 150, label: "Napalm",       desc: "Applies a stacking burn. Each stack reduces armor by 1." }
    }
  },

  FROST: {
    id: 'FROST',
    name: "Cryo",
    emoji: "❄️",
    cost: 60,
    type: 'FROST',
    desc: "Slows enemies with chilling shots",
    gradient: "from-cyan-300 to-cyan-500",
    accent: "bg-cyan-400",
    ring: "ring-cyan-400",
    defaultTargeting: 'FIRST',
    base: { range: 2.5, damage: 6, slowPercent: 0.45, slowDuration: 1500, cooldown: 1500 },
    upgrades: {
      rate:      { cost: 70,  label: "Frostpulse",    desc: "Fires 35% faster" },
      damage:    { cost: 60,  label: "Permafrost",    desc: "Slow lasts 60% longer" },
      range:     { cost: 50,  label: "Frigid Air",    desc: "+1 range" },
      targeting: { cost: 60,  label: "Fresh Targets", desc: "Prioritizes non-frozen enemies" },
      passive:   { cost: 150, label: "Frost Burst",   desc: "Splash-slows nearby enemies" }
    }
  },

  CHAIN: {
    id: 'CHAIN',
    name: "Tesla",
    emoji: "⚡",
    cost: 140, 
    type: 'CHAIN',
    desc: "Lightning chains between enemies",
    gradient: "from-amber-300 to-amber-500",
    accent: "bg-amber-400",
    ring: "ring-amber-400",
    defaultTargeting: 'FIRST',
    base: { range: 3, damage: 20, bounces: 2, cooldown: 1200 }, 
    upgrades: {
      rate:      { cost: 150, label: "Static Build",   desc: "Fires 35% faster" },
      damage:    { cost: 140, label: "High Voltage",   desc: "+100% damage" },
      range:     { cost: 80,  label: "Conductor",      desc: "+1 range" },
      targeting: { cost: 100, label: "Cluster Strike", desc: "Targets densest cluster" },
      passive:   { cost: 180, label: "Overload",       desc: "+3 chain bounces" }
    }
  },

  NITRO: {
    id: 'NITRO',
    name: "Nitro",
    emoji: "⚙️",
    cost: 250,
    type: 'BUFF',
    desc: "Boosts speed. Buffs do not stack (strongest applies).",
    gradient: "from-yellow-300 to-yellow-500",
    accent: "bg-yellow-400",
    ring: "ring-yellow-400",
    base: { auraRange: 2.0, buff: 0.8 }, 
    upgrades: {
      rate:    { cost: 220, label: "Pure Octane", desc: "Aura makes towers 35% faster" },
      range:   { cost: 150, label: "Wide Spray",  desc: "+1.5 aura range" },
      passive: { cost: 350, label: "Overcharge",  desc: "Buffed towers also gain +30% damage" }
    }
  }
};

export const TOWER_ORDER = ['DART', 'SNIPER', 'FROST', 'SPLASH', 'CHAIN', 'NITRO'];

// ---------- Stat helpers ----------
export function getEffectiveStats(tower) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return null;
  const u = tower.upgrades || {};
  const stats = { ...tConf.base };

  switch (tower.typeId) {
    case 'DART':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.5;
      if (u.damage) stats.damage   = Math.round(stats.damage * 3);
      if (u.range)  stats.range    = stats.range + 1;
      stats.pierce = !!u.passive;
      break;

    case 'SNIPER':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 2);
      if (u.range)  stats.range    = stats.range + 2;
      stats.armorPiercing = !!u.passive;
      break;

    case 'SPLASH':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 1.9);
      if (u.range)  stats.range    = stats.range + 1;
      stats.napalm = !!u.passive;
      break;

    case 'FROST':
      if (u.rate)   stats.cooldown     = stats.cooldown * 0.65;
      if (u.damage) stats.slowDuration = Math.round(stats.slowDuration * 1.6);
      if (u.range)  stats.range        = stats.range + 1;
      stats.frostBurst = !!u.passive;
      break;

    case 'CHAIN':
      if (u.rate)    stats.cooldown = stats.cooldown * 0.65;
      if (u.damage)  stats.damage   = Math.round(stats.damage * 2);
      if (u.range)   stats.range    = stats.range + 1;
      if (u.passive) stats.bounces  = stats.bounces + 3;
      break;

    case 'NITRO':
      if (u.range) stats.auraRange = stats.auraRange + 1.5;
      if (u.rate)  stats.buff      = Math.max(0.4, stats.buff - 0.15);
      stats.overcharge = !!u.passive;
      break;

    default:
      break;
  }

  return stats;
}

// Highest-value buff a non-Nitro tower receives from Nitro towers in range. Does NOT stack.
export function getNitroBuff(tower, allTowers) {
  if (tower.typeId === 'NITRO') return { rateMul: 1, damageMul: 1 };
  
  let bestRateMul = 1;
  let bestDamageMul = 1;

  for (const other of allTowers) {
    if (other.typeId !== 'NITRO') continue;
    const s = getEffectiveStats(other);
    const dist = Math.sqrt(
      Math.pow(other.row - tower.row, 2) + Math.pow(other.col - tower.col, 2)
    );
    if (dist <= s.auraRange) {
      if (s.buff < bestRateMul) bestRateMul = s.buff; 
      if (s.overcharge && bestDamageMul < 1.3) bestDamageMul = 1.3;
    }
  }
  return { rateMul: bestRateMul, damageMul: bestDamageMul };
}

export function getTotalSpent(tower) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return 0;
  let total = tConf.cost;
  for (const key of Object.keys(tower.upgrades || {})) {
    if (tower.upgrades[key] && tConf.upgrades[key]) {
      total += tConf.upgrades[key].cost;
    }
  }
  return total;
}

export function getSellValue(tower) {
  return Math.floor(getTotalSpent(tower) * 0.6);
}
</file>

<file path="src/components/towerdefense/HUD.jsx">
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
</file>

<file path="src/components/towerdefense/themeData.js">
// src/components/towerdefense/themeData.js

export const MAP_THEMES = {
  STANDARD: {
    bg: '#58A700',
    gridStr: 'rgba(255,255,255,0.2)',
    pathOutline: '#D97706',
    pathCore: '#F59E0B',
    decoSymbols: ['🌳', '🌲', '🍄', '🌿', '🪨']
  },
  NIGHT: {
    bg: '#1e1b4b',
    gridStr: 'rgba(255,255,255,0.08)',
    pathOutline: '#312e81',
    pathCore: '#4338ca',
    decoSymbols: ['🔮', '🌙', '🦇', '🥀', '🕸️']
  },
  ICE: {
    bg: '#bae6fd',
    gridStr: 'rgba(255,255,255,0.4)',
    pathOutline: '#38bdf8',
    pathCore: '#e0f2fe',
    decoSymbols: ['❄️', '⛄', '🧊', '🌲', '🏔️']
  },
  DESERT: {
    bg: '#d97706',
    gridStr: 'rgba(0,0,0,0.1)',
    pathOutline: '#78350f',
    pathCore: '#f59e0b',
    decoSymbols: ['🌵', '🏜️', '💀', '🦂', '🪨']
  }
};
</file>

<file path="src/components/towerdefense/TowerVisual.jsx">
// src/components/towerdefense/TowerVisual.jsx
import React from 'react';

// ==========================================
// TOWER SVGS WITH PASSIVE MODIFIERS
// ==========================================
const DartHedgehog = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="dart-hedgehog">
      {hasPassive && (
        <g id="mega-spikes">
          <polygon points="100,10 130,50 70,50" fill="#4e342e" />
          <polygon points="40,30 75,75 45,85" fill="#4e342e" />
          <polygon points="160,30 155,85 125,75" fill="#4e342e" />
          <polygon points="20,80 65,110 30,130" fill="#4e342e" />
          <polygon points="180,80 170,130 135,110" fill="#4e342e" />
        </g>
      )}
      <circle cx="100" cy="100" r="65" fill="#8b6351"/>
      <rect x="50" y="55" width="100" height="90" rx="35" fill="#a47d6c"/>
      <rect x="65" y="90" width="70" height="50" rx="25" fill="#edd4c5"/>
      <circle cx="100" cy="100" r="8" fill="#3e2723"/>
      <circle cx="75" cy="80" r="7" fill="#3e2723"/>
      <circle cx="125" cy="80" r="7" fill="#3e2723"/>
      <circle cx="73" cy="78" r="2.5" fill="#ffffff"/>
      <circle cx="123" cy="78" r="2.5" fill="#ffffff"/>
      <path d="M45,60 Q100,75 155,60 L145,40 Q100,60 55,40 Z" fill="#ff3b3b"/>
      <circle cx="100" cy="51" r="5" fill="#ffffff"/>
      <circle cx="100" cy="51" r="2" fill="#ff3b3b"/>
    </g>
  </svg>
);

const SniperOwl = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="sniper-owl">
      <polygon points="50,60 40,25 75,55" fill="#6d4c41"/>
      <polygon points="150,60 160,25 125,55" fill="#6d4c41"/>
      <rect x="45" y="50" width="110" height="95" rx="40" fill="#8d6e63"/>
      <circle cx="75" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="125" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="75" cy="90" r="14" fill="#ffca28"/>
      {hasPassive ? (
        <g id="crosshair-eye">
          <circle cx="125" cy="90" r="18" fill="#111" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="95" y1="90" x2="155" y2="90" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="60" x2="125" y2="120" stroke="#ff3b3b" strokeWidth="4"/>
          <circle cx="125" cy="90" r="4" fill="#ff3b3b" />
        </g>
      ) : (
        <>
          <circle cx="125" cy="90" r="14" fill="#ffca28"/>
          <circle cx="125" cy="90" r="8" fill="#3e2723"/>
          <circle cx="123" cy="87" r="3" fill="#ffffff"/>
        </>
      )}
      <circle cx="75" cy="90" r="8" fill="#3e2723"/>
      <circle cx="73" cy="87" r="3" fill="#ffffff"/>
      <polygon points="90,100 110,100 100,120" fill="#f57f17"/>
      {!hasPassive && (
        <>
          <circle cx="125" cy="90" r="32" fill="none" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="45" x2="125" y2="135" stroke="#ff3b3b" strokeWidth="2.5"/>
          <line x1="80" y1="90" x2="170" y2="90" stroke="#ff3b3b" strokeWidth="2.5"/>
        </>
      )}
    </g>
  </svg>
);

const SplashHippo = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="splash-hippo">
      <rect x="60" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="120" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="50" y="60" width="100" height="85" rx="40" fill="#8a83a4"/>
      <circle cx="60" cy="55" r="14" fill="#8a83a4"/>
      <circle cx="140" cy="55" r="14" fill="#8a83a4"/>
      <rect x="30" y="90" width="140" height="75" rx="37.5" fill="#9c94b3"/>
      <ellipse cx="65" cy="115" rx="9" ry="14" fill="#524a66"/>
      <ellipse cx="135" cy="115" rx="9" ry="14" fill="#524a66"/>
      <rect x="75" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      <rect x="111" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      {hasPassive && (
        <g id="fire-breath">
          <path d="M100,165 Q125,200 100,215 Q75,200 100,165" fill="#ff5722"/>
          <path d="M100,170 Q115,195 100,205 Q85,195 100,170" fill="#ff9800"/>
          <path d="M100,175 Q108,190 100,200 Q92,190 100,175" fill="#ffeb3b"/>
        </g>
      )}
      <circle cx="75" cy="75" r="9" fill="#ffffff"/>
      <circle cx="125" cy="75" r="9" fill="#ffffff"/>
      <circle cx="75" cy="75" r="4" fill="#2c3e50"/>
      <circle cx="125" cy="75" r="4" fill="#2c3e50"/>
      <path d="M50,145 Q100,170 150,145" fill="none" stroke="#8a83a4" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const FrostFox = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="frost-fox">
      {hasPassive && (
        <g id="ice-crown">
           <polygon points="100,-10 115,30 85,30" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="65,10 80,45 50,40" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="135,10 150,40 120,45" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
        </g>
      )}
      <polygon points="55,65 40,20 85,55" fill="#0288d1"/>
      <polygon points="145,65 160,20 115,55" fill="#0288d1"/>
      <polygon points="58,60 48,32 75,55" fill="#b3e5fc"/>
      <polygon points="142,60 152,32 125,55" fill="#b3e5fc"/>
      <path d="M45,60 Q100,40 155,60 L145,120 Q100,160 55,120 Z" fill="#29b6f6"/>
      <path d="M48,95 Q100,75 152,95 L140,125 Q100,155 60,125 Z" fill="#e1f5fe"/>
      <circle cx="100" cy="135" r="7" fill="#01579b"/>
      <circle cx="75" cy="95" r="7" fill="#01579b"/>
      <circle cx="125" cy="95" r="7" fill="#01579b"/>
      <path d="M92,60 L108,76 M108,60 L92,76 M100,53 L100,83 M85,68 L115,68" stroke="#e1f5fe" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const ChainEel = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="chain-eel">
      <polygon points="50,75 25,95 50,115" fill="#ffa000"/>
      <polygon points="150,75 175,95 150,115" fill="#ffa000"/>
      {hasPassive && (
        <g id="lightning-aura" stroke="#ffff00" strokeWidth="4" fill="none" strokeLinejoin="round">
          <polyline points="10,50 30,20 50,40 70,10" />
          <polyline points="190,50 170,20 150,40 130,10" />
          <polyline points="10,150 30,180 50,160 70,190" />
          <polyline points="190,150 170,180 150,160 130,190" />
        </g>
      )}
      <rect x="50" y="50" width="100" height="95" rx="35" fill="#ffca28"/>
      <circle cx="70" cy="85" r="10" fill="#3e2723"/>
      <circle cx="130" cy="85" r="10" fill="#3e2723"/>
      <circle cx="67" cy="82" r="3" fill="#ffffff"/>
      <circle cx="127" cy="82" r="3" fill="#ffffff"/>
      <circle cx="60" cy="110" r="8" fill="#ff6f00"/>
      <circle cx="140" cy="110" r="8" fill="#ff6f00"/>
      <path d="M85,120 Q100,135 115,120" fill="none" stroke="#3e2723" strokeWidth="4" strokeLinecap="round"/>
      <polygon points="105,45 90,65 102,65 95,85 115,60 102,60" fill="#ffffff"/>
    </g>
  </svg>
);

const NitroAlien = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="nitro-alien">
      {hasPassive && (
        <g id="tentacles">
          <path d="M65,70 Q20,90 25,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M60,80 Q10,110 15,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M135,70 Q180,90 175,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M140,80 Q190,110 185,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
      <line x1="85" y1="55" x2="65" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <line x1="115" y1="55" x2="135" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="65" cy="25" r="9" fill="#1de9b6"/>
      <circle cx="135" cy="25" r="9" fill="#1de9b6"/>
      <rect x="50" y="55" width="100" height="85" rx="35" fill="#b39ddb"/>
      <circle cx="70" cy="95" r="12" fill="#311b92"/>
      <circle cx="130" cy="95" r="12" fill="#311b92"/>
      <circle cx="100" cy="75" r="15" fill="#311b92"/>
      <circle cx="70" cy="93" r="4" fill="#ffffff"/>
      <circle cx="130" cy="93" r="4" fill="#ffffff"/>
      <circle cx="100" cy="72" r="5" fill="#ffffff"/>
      <rect x="92" y="115" width="16" height="5" rx="2.5" fill="#311b92"/>
    </g>
  </svg>
);

const VISUALS = {
  DART:   { Blook: DartHedgehog },
  SNIPER: { Blook: SniperOwl },
  SPLASH: { Blook: SplashHippo },
  FROST:  { Blook: FrostFox },
  CHAIN:  { Blook: ChainEel },
  NITRO:  { Blook: NitroAlien }
};

const SIZES = {
  sm: { wrap: 'w-8 h-8' },
  md: { wrap: 'w-12 h-12' },
  lg: { wrap: 'w-16 h-16' },
  xl: { wrap: 'w-20 h-20' }
};

// ==========================================
// CSS Animations defined inline for easy scope
// ==========================================
const InjectStyles = () => (
  <style>{`
    @keyframes td-fast-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes td-leg-l { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
    @keyframes td-leg-r { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
    @keyframes td-wing-flap { 0%, 100% { transform: scaleX(0.8) rotate(-20deg); } 50% { transform: scaleX(0.3) rotate(-5deg); } }
    .td-leg-l { animation: td-leg-l 0.25s ease-in-out infinite; transform-origin: center; }
    .td-leg-r { animation: td-leg-r 0.25s ease-in-out infinite; transform-origin: center; }
    .td-wing-l { animation: td-wing-flap 0.08s ease-in-out infinite; transform-origin: 25px 45px; }
    .td-wing-r { animation: td-wing-flap 0.08s ease-in-out infinite reverse; transform-origin: 75px 45px; }
  `}</style>
);

export default function TowerVisual({ typeId, size = 'md', selected = false, hovered = false, dimmed = false, upgrades = {} }) {
  const conf = VISUALS[typeId];
  if (!conf) return null;
  const { Blook } = conf;
  const s = SIZES[size] || SIZES.md;
  
  // Minor Visual Modifiers based on upgrades
  const hasRate = !!upgrades.rate;
  const hasDamage = !!upgrades.damage;
  const hasRange = !!upgrades.range;
  const hasTargeting = !!upgrades.targeting;
  const hasPassive = !!upgrades.passive;

  const baseScale = hasRange ? 1.25 : 1; 
  const finalScale = selected ? baseScale + 0.1 : hovered ? baseScale + 0.05 : baseScale;
  const transformY = selected ? '-4px' : hovered ? '-2px' : '0px';

  return (
    <div 
      className={`relative ${s.wrap} flex items-center justify-center transition-all duration-300 ${dimmed ? 'opacity-50 grayscale' : ''}`}
      style={{ transform: `scale(${finalScale}) translateY(${transformY})` }}
    >
      <InjectStyles />
      
      {/* TARGETING AURA: Faint white glow */}
      {hasTargeting && (
        <div className="absolute inset-[-10%] rounded-full bg-white/20 blur-md z-0 pointer-events-none" />
      )}

      {/* Ground shadow block */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-2.5 rounded-full blur-[3px] bg-black/40 z-0" />
      
      {/* Container tracking rate of fire speed changes */}
      <div 
        className={`relative w-full h-full z-10 
          ${selected ? 'drop-shadow-xl' : 'drop-shadow-md'}
          ${hasRate ? 'animate-[td-fast-bob_0.6s_ease-in-out_infinite]' : ''}
        `}
        style={hasDamage ? { filter: 'saturate(1.8) contrast(1.2)' } : {}}
      >
        <Blook className="w-full h-full" hasPassive={hasPassive} />
      </div>

    </div>
  );
}

// ==========================================
// INSECT SVG COMPONENTS FOR ENEMIES
// ==========================================
export const InsectVisual = ({ type }) => {
  switch (type) {
    case 'ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l"><path d="M50,50 L20,30" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L20,50" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M50,50 L20,70" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L80,30" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M50,50 L80,50" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L80,70" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <circle cx="50" cy="25" r="12" fill="#d81b60" /> 
          <circle cx="50" cy="50" r="10" fill="#c2185b" /> 
          <ellipse cx="50" cy="80" rx="14" ry="18" fill="#880e4f" />
          <path d="M45,15 L35,5 M55,15 L65,5" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case 'WASP':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse className="td-wing-l" cx="25" cy="45" rx="20" ry="10" fill="#e0f7fa" opacity="0.8" />
          <ellipse className="td-wing-r" cx="75" cy="45" rx="20" ry="10" fill="#e0f7fa" opacity="0.8" />
          <circle cx="50" cy="25" r="10" fill="#fbc02d" />
          <circle cx="50" cy="45" r="12" fill="#212121" />
          <ellipse cx="50" cy="75" rx="14" ry="22" fill="#fbc02d" />
          <path d="M38,70 Q50,75 62,70 M36,80 Q50,85 64,80" stroke="#212121" strokeWidth="5" fill="none" />
          <polygon points="48,95 52,95 50,110" fill="#212121" />
        </svg>
      );
    case 'BEETLE':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L15,35" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L10,55" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L15,75" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L85,35" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L90,55" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L85,75" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <path d="M40,25 C30,10 20,15 25,5" stroke="#3e2723" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M60,25 C70,10 80,15 75,5" stroke="#3e2723" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="50" cy="25" r="12" fill="#4e342e" />
          <ellipse cx="50" cy="60" rx="25" ry="35" fill="#5d4037" />
          <line x1="50" y1="25" x2="50" y2="95" stroke="#3e2723" strokeWidth="3" />
        </svg>
      );
    case 'QUEEN':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(156,39,176,0.6)]">
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L10,10" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L5,30" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L5,50" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L10,70" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L90,10" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L95,30" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L95,50" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L90,70" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <ellipse cx="50" cy="70" rx="35" ry="25" fill="#7b1fa2" />
          <circle cx="50" cy="40" r="16" fill="#6a1b9a" />
          <circle cx="50" cy="20" r="12" fill="#4a148c" />
          <circle cx="45" cy="18" r="3" fill="#69f0ae" />
          <circle cx="55" cy="18" r="3" fill="#69f0ae" />
          <circle cx="40" cy="15" r="2" fill="#69f0ae" />
          <circle cx="60" cy="15" r="2" fill="#69f0ae" />
          <circle cx="35" cy="70" r="4" fill="#ea80fc" opacity="0.6"/>
          <circle cx="50" cy="80" r="5" fill="#ea80fc" opacity="0.6"/>
          <circle cx="65" cy="65" r="3" fill="#ea80fc" opacity="0.6"/>
        </svg>
      );
    case 'GIANT_ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(185,28,28,0.7)]">
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L5,25" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L5,50" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L5,75" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L95,25" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L95,50" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L95,75" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          
          {/* Main Body */}
          <ellipse cx="50" cy="75" rx="26" ry="32" fill="#7f1d1d" />
          <circle cx="50" cy="40" r="16" fill="#991b1b" />
          <circle cx="50" cy="18" r="14" fill="#b91c1c" />
          <path d="M40,5 L20,-5 M60,5 L80,-5" stroke="#450a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="43" cy="14" r="4" fill="#fca5a5" />
          <circle cx="57" cy="14" r="4" fill="#fca5a5" />
        </svg>
      );
    default:
      return null;
  }
};

// ==========================================
// OVERSIZED DONUT HEALTH TRACKER
// ==========================================
export const DonutBase = ({ healthPct, isHit }) => (
  <div className={`relative transition-all duration-100 ${isHit ? 'scale-125 drop-shadow-[0_0_20px_rgba(234,43,43,1)]' : 'scale-[1.75] drop-shadow-xl'}`}>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <circle cx="50" cy="50" r="40" fill="#fca5a5" />
      <circle cx="50" cy="50" r="35" fill="#fbcfe8" />
      <circle cx="50" cy="50" r="12" fill="#58A700" /> 
      
      <line x1="30" y1="30" x2="35" y2="25" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="30" x2="65" y2="35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="70" x2="35" y2="65" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="70" x2="75" y2="75" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

      {healthPct < 0.2 && (
        <circle cx="85" cy="25" r="24" fill="#58A700" />
      )}
    </svg>
  </div>
);
</file>

<file path="src/components/towerdefense/UpgradeBadges.jsx">
import React from 'react';
import { Gauge, Swords, Maximize2, Target, Sparkles } from 'lucide-react';

const ICONS = {
  rate:      { Icon: Gauge,      bg: 'bg-sky-500'    },
  damage:    { Icon: Swords,     bg: 'bg-rose-500'   },
  range:     { Icon: Maximize2,  bg: 'bg-violet-500' },
  targeting: { Icon: Target,     bg: 'bg-orange-500' },
  passive:   { Icon: Sparkles,   bg: 'bg-amber-400'  }
};

const ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];

export default function UpgradeBadges({ upgrades }) {
  const owned = ORDER.filter(k => upgrades?.[k]);
  if (owned.length === 0) return null;

  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex -space-x-1 pointer-events-none z-10">
      {owned.map((key, i) => {
        const { Icon, bg } = ICONS[key];
        return (
          <div
            key={key}
            className={`w-4 h-4 rounded-full ${bg} border-2 border-white shadow-md flex items-center justify-center`}
            style={{ zIndex: 10 + i }}
          >
            <Icon className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
        );
      })}
    </div>
  );
}
</file>

<file path="src/components/towerdefense/UpgradePanel.jsx">
// src/components/towerdefense/UpgradePanel.jsx
import React from 'react';
import {
  Coins, Gauge, Swords, Maximize2, Target, Sparkles,
  Trash2, Check, Lock, X, ShieldAlert
} from 'lucide-react';
import { TOWERS, getEffectiveStats, getSellValue } from './gameData';
import TowerVisual from './TowerVisual';

const UPGRADE_ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];
const UPGRADE_ICONS = {
  rate:      Gauge,
  damage:    Swords,
  range:     Maximize2,
  targeting: Target,
  passive:   Sparkles
};

export default function UpgradePanel({ tower, towers, credits, onUpgrade, onSell, onClose }) {
  // If no tower selected, hide the panel completely on mobile to preserve screen space
  if (!tower) {
    return (
      <aside className="hidden md:flex order-2 md:order-none w-80 bg-slate-800 border-l-4 border-slate-950 flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 text-slate-500">
          <div className="text-lg font-black text-slate-300 mb-2">No tower selected</div>
          <div className="text-sm font-bold leading-relaxed">Tap any tower on the board to view upgrades.</div>
        </div>
      </aside>
    );
  }

  const tConf = TOWERS[tower.typeId];
  const stats = getEffectiveStats(tower);
  const sellValue = getSellValue(tower);
  const upgrades = tower.upgrades || {};

  return (
    <aside className="order-2 md:order-none flex w-full md:w-80 h-auto md:h-full bg-slate-800 md:border-l-4 border-b-4 md:border-b-0 border-slate-950 flex-col md:flex-col flex-shrink-0 z-20 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      {/* Mobile Top Row / Desktop Top Header */}
      <div className="flex flex-row md:flex-col">
        {/* Name/Icon Card */}
        <div className={`relative ${tConf.accent} p-3 md:p-6 flex items-center md:border-b-4 border-slate-900 w-48 md:w-full shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all border-b-2 border-black/40 active:border-b-0 active:translate-y-[2px] z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center border-b-4 border-black/20 shadow-sm shrink-0">
              <TowerVisual typeId={tower.typeId} size="md" upgrades={upgrades} />
            </div>
            <div className="min-w-0 pr-6 md:pr-0">
              <div className="text-lg md:text-2xl font-black text-white leading-tight drop-shadow-sm truncate">{tConf.name}</div>
              <div className="text-[9px] md:text-[11px] font-bold text-white/90 leading-tight mt-0.5 line-clamp-2">{tConf.desc}</div>
            </div>
          </div>
        </div>

        {/* Stats Strip (Hidden on extremely small screens, shown otherwise) */}
        <div className="hidden sm:flex md:flex px-4 py-2 md:py-4 bg-slate-900 md:border-b-2 border-l-2 md:border-l-0 border-slate-700 flex-wrap gap-2 md:gap-4 text-xs font-black shadow-inner items-center shrink-0">
          {tConf.type === 'BUFF' ? (
            <>
              <Stat label="AURA" value={stats.auraRange} />
              <Stat label="BOOST" value={`+${Math.round((1 - stats.buff) * 100)}%`} />
            </>
          ) : (
            <>
              {stats.damage != null && <Stat label="DMG" value={stats.damage} />}
              <Stat label="RNG" value={stats.range} />
              <Stat label="CD"  value={`${(stats.cooldown / 1000).toFixed(1)}s`} />
            </>
          )}
        </div>
      </div>

      {/* Upgrades Scrolling Container */}
      <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-3 custom-scrollbar bg-slate-800 border-t-2 md:border-t-0 border-slate-700">
        {UPGRADE_ORDER.map(key => {
          const upg = tConf.upgrades[key];
          if (!upg) return null;
          
          const ownedByMe = !!upgrades[key];
          const canAfford = credits >= upg.cost;
          const Icon = UPGRADE_ICONS[key];
          const isPassive = key === 'passive';
          
          const globalPassiveOwned = towers.some(t => t.typeId === tower.typeId && t.upgrades?.passive);
          // Removed restriction for DART towers to allow multiple unique passives
          const uniqueLocked = isPassive && tower.typeId !== 'DART' && globalPassiveOwned && !ownedByMe;

          let cls;
          if (ownedByMe) {
            cls = 'bg-[#58A700] border-b-[4px] border-[#46a802] text-white';
          } else if (uniqueLocked) {
            cls = 'bg-slate-800 border-b-[4px] border-slate-900 opacity-60 cursor-not-allowed text-slate-400 grayscale';
          } else if (!canAfford) {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 opacity-50 cursor-not-allowed text-slate-300';
          } else {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 hover:bg-slate-600 active:translate-y-[4px] active:border-b-0 cursor-pointer text-slate-100';
          }

          return (
            <button
              key={key}
              onClick={() => !ownedByMe && canAfford && !uniqueLocked && onUpgrade(key)}
              disabled={ownedByMe || !canAfford || uniqueLocked}
              className={`w-64 md:w-full flex-shrink-0 text-left rounded-2xl p-3 md:p-4 transition-all ${cls} relative`}
            >
              <div className="flex items-center gap-3 h-full">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner
                  ${ownedByMe ? 'bg-white/20' : uniqueLocked ? 'bg-slate-900' : 'bg-slate-800 border border-slate-600'}`}>
                  {ownedByMe 
                    ? <Check className="w-5 h-5 text-white" strokeWidth={4} />
                    : uniqueLocked
                      ? <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-slate-500" strokeWidth={2.5} />
                      : <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[13px] md:text-sm font-black leading-tight truncate drop-shadow-sm flex items-center gap-2">
                    {upg.label}
                    {isPassive && !uniqueLocked && !ownedByMe && tower.typeId !== 'DART' && <span className="text-[8px] bg-[#FFC800] text-amber-950 px-1.5 py-0.5 rounded uppercase tracking-widest">Unique</span>}
                  </div>
                  <div className={`text-[10px] md:text-[11px] font-bold mt-0.5 md:mt-1 line-clamp-2 ${ownedByMe ? 'text-green-100' : uniqueLocked ? 'text-slate-500' : 'text-slate-400'}`}>
                    {uniqueLocked ? "Owned by another tower" : upg.desc}
                  </div>
                </div>
                {!ownedByMe && !uniqueLocked && (
                  <div className={`flex flex-col items-center justify-center px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-[10px] md:text-xs font-black flex-shrink-0 bg-slate-900 shadow-inner
                    ${canAfford ? 'text-[#FFC800]' : 'text-slate-500'}`}>
                    {canAfford ? <Coins className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} /> : <Lock className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} />}
                    {upg.cost}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-2 md:p-4 border-t-2 border-slate-700 bg-slate-900 flex-shrink-0 w-auto">
        <button
          onClick={onSell}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 text-white font-black text-xs md:text-sm uppercase tracking-wider transition-all active:scale-95 active:translate-y-[4px] active:border-b-0 shadow-sm"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
          Sell
          <span className="flex items-center gap-1 text-[#FFC800] bg-black/20 px-2 py-0.5 rounded-lg ml-1">
            <Coins className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
            {sellValue}
          </span>
        </button>
      </div>

    </aside>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 bg-slate-800 px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-slate-700 shadow-inner min-w-[50px]">
      <span className="text-[8px] md:text-[9px] text-slate-400 tracking-widest leading-none">{label}</span>
      <span className="text-white text-xs md:text-sm leading-none">{value}</span>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/useGameEngine.js">
// src/components/towerdefense/useGameEngine.js
import { useEffect } from 'react';
import { TOWERS, ENEMIES, getEffectiveStats, getNitroBuff } from './gameData';

const TILE_SPEED = 2.0;

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

export function useGameEngine({ 
  gRef, render, layout, gameConfig, 
  onTriggerChallenge, challengeActiveRef, autoPlayRef 
}) {

  useEffect(() => {
    let raf;
    let last = performance.now();
    
    // STRICT FIXED TIMESTEP (30 FPS)
    // Eliminates micro-stutters by guaranteeing deterministic math logic every single frame
    const FPS_CAP = 30;
    const fpsInterval = 1000 / FPS_CAP;
    const FIXED_DT = fpsInterval;

    const g = gRef.current;
    const newId = () => g.nextId++;

    function distAlong(c) {
      if (c.waypointIdx >= layout.path.length - 1) return Infinity;
      const [pr, pc] = layout.path[c.waypointIdx];
      const [tr, tc] = layout.path[c.waypointIdx + 1];
      const total = Math.hypot(tr - pr, tc - pc);
      const rem = Math.hypot(tr - c.row, tc - c.col);
      return c.waypointIdx + (1 - rem / total);
    }

    function moveCreep(c, dt) {
      let slowMul = 1;
      if (c.freezeTimer > 0) { slowMul = 1 - c.slowPercent; c.freezeTimer -= dt; }
      let dist = c.speed * slowMul * (dt / 1000) * TILE_SPEED;
      
      while (dist > 0 && c.waypointIdx < layout.path.length - 1) {
        const [tr, tc] = layout.path[c.waypointIdx + 1];
        const dr = tr - c.row, dc = tc - c.col;
        c.angle = Math.atan2(dr, dc) * (180 / Math.PI);
        
        const d = Math.hypot(dr, dc);
        if (d <= dist) { 
          c.row = tr; c.col = tc; c.waypointIdx++; dist -= d; 
        } else { 
          c.row += (dr / d) * dist; c.col += (dc / d) * dist; dist = 0; 
        }
      }
      if (c.waypointIdx >= layout.path.length - 1) c.reachedEnd = true;
    }

    function towerTargetingMode(tower) {
      const conf = TOWERS[tower.typeId];
      if (tower.upgrades?.targeting) {
        if (tower.typeId === 'SNIPER') return 'ARMOR';
        if (tower.typeId === 'SPLASH') return 'DENSEST';
        if (tower.typeId === 'CHAIN')  return 'DENSEST';
        if (tower.typeId === 'FROST')  return 'FRESH';
      }
      return conf.defaultTargeting || 'FIRST';
    }

    function findTarget(tower, mode) {
      const s = getEffectiveStats(tower);
      const range = s.range;
      const pool = g.creeps.filter(c =>
        c.hp > 0 && !c.reachedEnd && Math.hypot(c.row - tower.row, c.col - tower.col) <= range
      );
      if (pool.length === 0) return null;
      if (mode === 'STRONG') return pool.reduce((a, b) => a.hp > b.hp ? a : b);
      if (mode === 'LOWEST') return pool.reduce((a, b) => a.hp < b.hp ? a : b);
      if (mode === 'ARMOR') return pool.reduce((a, b) => (a.damageReduction || 0) >= (b.damageReduction || 0) ? a : b);
      if (mode === 'FRESH') {
        const fresh = pool.filter(c => c.freezeTimer <= 0);
        const arr = fresh.length ? fresh : pool;
        return arr.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
      }
      if (mode === 'DENSEST') {
        let best = pool[0], bestN = -1;
        for (const c of pool) {
          const n = g.creeps.reduce((acc, x) => acc + (Math.hypot(x.row - c.row, x.col - c.col) < 1.8 ? 1 : 0), 0);
          if (n > bestN) { bestN = n; best = c; }
        }
        return best;
      }
      return pool.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
    }

    function damageCreep(c, dmg, ignoreArmor = false, flatArmorPen = 0) {
      if (c.hp <= 0) return;
      const shred = c.activeArmorShred || 0;
      const currentArmor = Math.max(0, (c.damageReduction || 0) - shred);
      const reduction = ignoreArmor ? 0 : Math.max(0, currentArmor - flatArmorPen);
      const actualDmg = Math.max(1, dmg - reduction);
      const d = Math.round(actualDmg);
      
      c.hp -= d;
      
      if (d > 0) {
        g.floaters.push({
          id: newId(), text: `-${d}`, row: c.row, col: c.col,
          colorClass: 'text-white font-black', life: 500, maxLife: 500
        });
      }
      if (c.hp <= 0) {
        const conf = ENEMIES[c.typeKey];
        let reward = conf.reward;
        if (g.wave >= 51) reward = Math.floor(reward / 4);
        g.credits += reward;
        g.score += conf.reward * 10;
        
        g.particles.push({
          id: newId(), row: c.row, col: c.col, radius: 0.6,
          color: 'rgba(255,200,0,0.55)', life: 400, maxLife: 400
        });
        if (reward > 0) {
          g.floaters.push({
            id: newId(), text: `+$${reward}`, row: c.row, col: c.col - 0.4,
            colorClass: 'text-[#FFC800] font-black', life: 700, maxLife: 700
          });
        }
      }
    }

    function spawnCreep(typeKey) {
      const conf = ENEMIES[typeKey];
      const [sr, sc] = layout.path[0];
      const [nr, nc] = layout.path.length > 1 ? layout.path[1] : [sr, sc];
      const initAngle = Math.atan2(nr - sr, nc - sc) * (180 / Math.PI);
      
      g.creeps.push({
        id: newId(), typeKey, row: sr, col: sc,
        hp: conf.hp, maxHp: conf.hp, speed: conf.speed, waypointIdx: 0, angle: initAngle,
        freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0, damageReduction: conf.damageReduction || 0,
        burnStacks: [], spawnTimer: typeKey === 'GIANT_ANT' ? 2000 : 0
      });
    }

    function fireTower(tower, logicDt) {
      const conf = TOWERS[tower.typeId];
      if (conf.type === 'BUFF') return;
      const id = tower.id;
      g.fireCooldowns[id] = (g.fireCooldowns[id] || 0) - logicDt;
      if (g.fireCooldowns[id] > 0) return;

      const stats = getEffectiveStats(tower);
      const { rateMul, damageMul } = getNitroBuff(tower, g.towers);
      const target = findTarget(tower, towerTargetingMode(tower));
      if (!target) return;

      g.fireCooldowns[id] = stats.cooldown * rateMul;
      let damage = (stats.damage || 0) * damageMul;
      const color = PROJ_COLOR[tower.typeId];

      if (tower.typeId === 'DART') {
        let adj = 0;
        g.towers.forEach(t => {
          if (t !== tower && Math.hypot(t.row - tower.row, t.col - tower.col) <= 1.5) adj++;
        });
        damage += adj;

        damageCreep(target, damage);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && Math.hypot(c.row - target.row, c.col - target.col) < 1.6);
          if (second) damageCreep(second, damage);
        }
        
        g.projectiles.push({
          id: newId(), kind: 'DART_PROJ', passive: stats.pierce,
          row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col,
          speed: 18, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'CHAIN') {
        const hit = [target];
        let last = target;
        for (let i = 0; i < stats.bounces; i++) {
          const next = g.creeps
            .filter(c => c.hp > 0 && !hit.includes(c) && Math.hypot(c.row - last.row, c.col - last.col) < 2.5)
            .sort((a, b) => Math.hypot(a.row - last.row, a.col - last.col) - Math.hypot(b.row - last.row, b.col - last.col))[0];
          if (!next) break;
          hit.push(next); last = next;
        }
        g.projectiles.push({
          id: newId(), kind: 'CHAIN', row: tower.row, col: tower.col,
          range: stats.range, lines: hit.map(c => ({ row: c.row, col: c.col })), life: 220, maxLife: 220
        });
        hit.forEach(c => damageCreep(c, damage));
        
      } else if (tower.typeId === 'SPLASH') {
        g.projectiles.push({
          id: newId(), kind: 'SPLASH', color, row: tower.row, col: tower.col,
          targetRow: target.row, targetCol: target.col, damage, splashRadius: stats.splashRadius, napalm: stats.napalm,
          speed: 7, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'SNIPER') {
        let ignoreArmor = true;
        let finalDamage = damage;
        
        if (stats.armorPiercing) { 
          finalDamage = Math.round(damage + (target.damageReduction || 0));
          const angle = Math.atan2(target.row - tower.row, target.col - tower.col);
          const lanceLength = 4.0; 
          
          const ux = Math.cos(angle);
          const uy = Math.sin(angle);
          const distToT = Math.hypot(target.col - tower.col, target.row - tower.row);
          
          g.creeps.forEach(c => {
             if (c === target || c.hp <= 0) return;
             const vx = c.col - tower.col;
             const vy = c.row - tower.row;
             const proj = vx * ux + vy * uy; 
             
             if (proj > distToT && proj <= distToT + lanceLength) {
                 const perp = Math.abs(vx * uy - vy * ux); 
                 if (perp < 0.8) {
                     damageCreep(c, finalDamage, true, 0);
                 }
             }
          });
          
          g.projectiles.push({
             id: newId(), kind: 'LANCE', color: '#f59e0b',
             row: tower.row, col: tower.col, angle, length: distToT + lanceLength,
             life: 250, maxLife: 250
          });
        }
        
        damageCreep(target, finalDamage, ignoreArmor, 0);
        g.projectiles.push({
          id: newId(), kind: 'SNIPER_PROJ', passive: stats.armorPiercing,
          row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, 
          speed: 30, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'FROST') {
        target.freezeTimer = stats.slowDuration;
        target.slowPercent = stats.slowPercent;
        damageCreep(target, damage);
        if (stats.frostBurst) {
          g.creeps.forEach(c => {
            if (c === target || c.hp <= 0) return;
            if (Math.hypot(c.row - target.row, c.col - target.col) < 1.6) {
              c.freezeTimer = Math.max(c.freezeTimer, stats.slowDuration * 0.6);
              c.slowPercent = stats.slowPercent;
            }
          });
        }
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color, row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, speed: 14, life: 9999, maxLife: 9999
        });
        
      } else {
        damageCreep(target, damage);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && Math.hypot(c.row - target.row, c.col - target.col) < 1.6);
          if (second) damageCreep(second, damage);
        }
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color, row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, speed: 16, life: 9999, maxLife: 9999
        });
      }
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      
      const elapsed = now - last;
      
      // Strict FPS bail-out
      if (elapsed < fpsInterval) return;
      
      // Guard against extreme lag spikes (e.g. user tabs out)
      if (elapsed > 1000) {
          last = now;
          return;
      }

      // Lock the timing exactly to the 30 FPS interval to prevent drift
      last = now - (elapsed % fpsInterval);
      
      if (g.gameState !== 'PLAYING') { render(); return; }
      
      // Smooth scaling: use FIXED_DT, never varying `elapsed`, guaranteeing perfect deterministic motion logic
      const dt = FIXED_DT * g.speed;

      if (g.waveInProgress && g.spawnQueue.length > 0) {
        g.spawnTimer += dt;
        const next = g.spawnQueue[0];
        if (g.spawnTimer >= next.interval) {
          spawnCreep(next.type);
          next.count--;
          g.spawnTimer = 0;
          if (next.count <= 0) g.spawnQueue.shift();
        }
      }

      g.creeps.forEach(c => {
        if (c.hp <= 0) return;
        moveCreep(c, dt);

        if (c.typeKey === 'GIANT_ANT') {
          c.spawnTimer = (c.spawnTimer || 0) - dt;
          if (c.spawnTimer <= 0 && !c.reachedEnd) {
            c.spawnTimer = 2000; 
            for(let i=0; i<6; i++) {
              const rOff = (Math.random() - 0.5) * 0.5;
              const cOff = (Math.random() - 0.5) * 0.5;
              g.creeps.push({
                id: newId(), typeKey: 'ANT', row: c.row + rOff, col: c.col + cOff,
                hp: ENEMIES.ANT.hp, maxHp: ENEMIES.ANT.hp, speed: ENEMIES.ANT.speed * 1.15,
                waypointIdx: c.waypointIdx, angle: c.angle,
                freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0, damageReduction: 0,
                burnStacks: [], spawnTimer: 0
              });
            }
            g.particles.push({ id: newId(), row: c.row, col: c.col, radius: 1.2, color: 'rgba(185,28,28,0.6)', life: 300, maxLife: 300 });
          }
        }

        if (c.burnStacks && c.burnStacks.length > 0) {
          let activeStacks = 0;
          for (let i = c.burnStacks.length - 1; i >= 0; i--) {
            let b = c.burnStacks[i];
            b.life -= dt; b.tick -= dt;
            if (b.tick <= 0) { damageCreep(c, 8); b.tick = 400; }
            if (b.life > 0) activeStacks++;
            else c.burnStacks.splice(i, 1);
          }
          c.activeArmorShred = activeStacks;
        } else {
          c.activeArmorShred = 0;
        }

        if (c.burning > 0) {
          c.burning -= dt; c.burnTick -= dt;
          if (c.burnTick <= 0) { damageCreep(c, 8); c.burnTick = 400; }
        }
      });

      g.creeps.forEach(c => { if (c.reachedEnd) { g.lives -= 1; c.hp = -1; } });
      g.creeps = g.creeps.filter(c => c.hp > 0 && !c.reachedEnd);

      g.towers.forEach(t => fireTower(t, dt));

      g.projectiles.forEach(p => {
        p.life -= dt;
        if (p.kind === 'BULLET' || p.kind === 'SPLASH' || p.kind === 'DART_PROJ' || p.kind === 'SNIPER_PROJ') {
          const dr = p.targetRow - p.row;
          const dc = p.targetCol - p.col;
          const d = Math.hypot(dr, dc);
          const step = (p.speed || 12) * (dt / 1000);
          
          if (d <= step) {
            if (p.kind === 'SPLASH') {
              g.creeps.forEach(c => {
                if (Math.hypot(c.row - p.targetRow, c.col - p.targetCol) <= p.splashRadius) {
                    damageCreep(c, p.damage);
                    if (p.napalm) {
                        if (!c.burnStacks) c.burnStacks = [];
                        c.burnStacks.push({ life: 4000, tick: 400 });
                    }
                }
              });
              g.particles.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius, color: 'rgba(234,43,43,0.6)', life: 320, maxLife: 320 });
              if (p.napalm) g.burnZones.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius * 0.7, life: 4000, maxLife: 4000 });
            }
            p.life = 0;
          } else {
            p.row += (dr / d) * step; p.col += (dc / d) * step;
          }
        }
      });
      g.projectiles = g.projectiles.filter(p => p.life > 0);
      g.floaters = g.floaters.filter(f => (f.life -= dt) > 0);
      g.particles = g.particles.filter(p => (p.life -= dt) > 0);
      g.burnZones = g.burnZones.filter(z => (z.life -= dt) > 0);

      if (g.waveInProgress && g.spawnQueue.length === 0 && g.creeps.length === 0) {
        g.waveInProgress = false;
        g.credits += 50;
        g.score += 100;
        
        if (!gameConfig.generateInfiniteWave && g.wave >= gameConfig.waves.length) {
          g.gameState = 'WON';
        } else {
          g.autoPlayDelay = 1500;
        }
      }

      if (!g.waveInProgress && g.gameState === 'PLAYING' && autoPlayRef.current) {
        g.autoPlayDelay -= dt;
        if (g.autoPlayDelay <= 0) { g.autoPlayDelay = 9999; g.triggerNextWave = true; }
      }

      if (g.lives <= 0) { g.lives = 0; g.gameState = 'LOST'; }

      if (g.waveInProgress && g.wave >= 5) {
        g.challengeTimer -= dt;
        if (g.wave === 5 && !g.wave5ChallengeSpawned) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.wave5ChallengeSpawned = true; 
            g.challengeTimer = 90000 + Math.random() * 30000; 
          }
        } else if (g.wave > 5) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.challengeTimer = 90000 + Math.random() * 30000;
          }
        }
      }

      render();
    }
    
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gRef, render, layout, gameConfig, onTriggerChallenge, challengeActiveRef, autoPlayRef]);
}
</file>

<file path="src/components/towerdefense/VocabChallenge.jsx">
// src/components/towerdefense/VocabChallenge.jsx
import React, { useEffect, useRef } from 'react';
import { Zap, Clock, Keyboard, ListChecks, BookOpen } from 'lucide-react';

export default function VocabChallenge({
  challenge,
  input,
  onInputChange,
  onSubmit,
  onChoice,
  timeLeft,
  maxTime = 15,
  shakeKey = 0
}) {
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (challenge?.mode === 'TYPE' && inputRef.current) inputRef.current.focus();
  }, [challenge]);

  useEffect(() => {
    if (shakeKey === 0) return;
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove('td-shake');
    void el.offsetWidth;
    el.classList.add('td-shake');
  }, [shakeKey]);

  if (!challenge) return null;

  const pct = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));
  const lowTime = timeLeft <= 5;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-in fade-in duration-300 pointer-events-none">
      {/* Semi-transparent dark overlay to help focus the challenge */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto" />
      
      <style>{`
        @keyframes td-shake-kf {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
        .td-shake { animation: td-shake-kf 0.4s ease-in-out; }
      `}</style>

      <div
        ref={cardRef}
        className="relative z-10 pointer-events-auto bg-white rounded-[2rem] border-b-8 border-slate-200 w-full max-w-lg overflow-hidden p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center border-b-4 border-indigo-200">
               <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Vocab Bolt</div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                {challenge.mode === 'TYPE' ? (
                  <><Keyboard className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Type it</>
                ) : (
                  <><ListChecks className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Pick one</>
                )}
              </div>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm border-b-4 ${lowTime ? 'bg-rose-500 border-rose-700 text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
            <Clock className="w-4 h-4" strokeWidth={3} />
            {timeLeft}s
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-4 border-2 border-slate-200 overflow-hidden mb-6">
          <div
            className={`h-full transition-all duration-300 ease-linear rounded-full ${lowTime ? 'bg-rose-500' : 'bg-[#FFC800]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl mb-4 font-black tracking-widest uppercase text-[10px]">
             <BookOpen className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} /> Definition Target
          </div>
          <div className="text-slate-800 font-black text-xl sm:text-2xl leading-snug">
            {challenge.def}
          </div>
        </div>

        {challenge.mode === 'TYPE' ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-8">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type the word here…"
              autoComplete="off"
              spellCheck={false}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-[#1CB0F6] focus:outline-none focus:ring-4 focus:ring-[#1CB0F6]/20 font-bold text-slate-800 text-xl text-center placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] text-white font-black uppercase tracking-widest text-lg border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all"
            >
              Submit Answer
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {challenge.choices?.map((c) => (
              <button
                key={c}
                onClick={() => onChoice?.(c)}
                className="px-4 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-[6px] active:translate-y-[6px] active:border-b-[2px] font-black text-slate-700 text-lg sm:text-xl transition-all capitalize"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {challenge.mode === 'CHOICE' && (
          <div className="mt-6 text-center text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 rounded-xl py-3 border border-rose-100">
            ⚠ Incorrect choice spawns extra enemies!
          </div>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/wavePresets.js">
// src/components/towerdefense/wavePresets.js

export const WAVE_PRESETS = {
  SET_1: [
    // --- EARLY GAME (1-10) --- 
    [{ type: 'ANT',  count: 8,  interval: 1500 }],
    [{ type: 'ANT',  count: 12, interval: 1200 }],
    [{ type: 'ANT',  count: 10, interval: 1000 }, { type: 'WASP', count: 5,  interval: 800 }],
    [{ type: 'WASP', count: 12, interval: 700  }],
    [{ type: 'ANT',  count: 15, interval: 600  }, { type: 'BEETLE', count: 1,  interval: 2000 }],
    [{ type: 'ANT',  count: 20, interval: 800  }, { type: 'WASP', count: 8,  interval: 600 }],
    [{ type: 'BEETLE', count: 3,  interval: 1500 }, { type: 'WASP', count: 8,  interval: 500 }],
    [{ type: 'ANT',  count: 25, interval: 400  }],
    [{ type: 'WASP', count: 20, interval: 400  }, { type: 'BEETLE', count: 3,  interval: 1000 }],
    [{ type: 'BEETLE', count: 5,  interval: 1000 }, { type: 'QUEEN',   count: 1,  interval: 3000 }],
    
    // --- MID GAME (11-20) ---
    [{ type: 'ANT',  count: 35, interval: 350  }],
    [{ type: 'WASP', count: 25, interval: 300  }, { type: 'BEETLE', count: 6,  interval: 1000 }],
    [{ type: 'ANT',  count: 20, interval: 300  }, { type: 'WASP', count: 20, interval: 250 }],
    [{ type: 'BEETLE', count: 10, interval: 1000 }],
    [{ type: 'WASP', count: 30, interval: 200  }, { type: 'QUEEN',   count: 1,  interval: 2000 }],
    [{ type: 'ANT',  count: 40, interval: 250  }, { type: 'BEETLE', count: 8,  interval: 800 }],
    [{ type: 'WASP', count: 40, interval: 200  }],
    [{ type: 'BEETLE', count: 18, interval: 600  }],
    [{ type: 'ANT',  count: 30, interval: 200  }, { type: 'WASP', count: 30, interval: 200 }],
    [{ type: 'BEETLE', count: 15, interval: 500  }, { type: 'QUEEN',   count: 3,  interval: 1500 }],

    // --- LATE GAME ESCALATION (21-30) ---
    [{ type: 'ANT',  count: 45, interval: 200  }, { type: 'WASP', count: 25, interval: 250 }],
    [{ type: 'WASP', count: 35, interval: 200  }, { type: 'BEETLE', count: 15, interval: 600 }],
    [{ type: 'ANT',  count: 50, interval: 150  }],
    [{ type: 'BEETLE', count: 20, interval: 450  }, { type: 'QUEEN',   count: 2,  interval: 2000 }],
    [{ type: 'GIANT_ANT', count: 1, interval: 2000 }], 
    [{ type: 'QUEEN',   count: 4,  interval: 2000 }],
    [{ type: 'BEETLE', count: 30, interval: 400  }],
    [{ type: 'ANT',  count: 65, interval: 100  }, { type: 'WASP', count: 35, interval: 150 }],
    [{ type: 'WASP', count: 50, interval: 150  }, { type: 'QUEEN',   count: 4,  interval: 1500 }],
    [{ type: 'BEETLE', count: 25, interval: 350  }, { type: 'QUEEN',   count: 5,  interval: 1800 }],

    // --- THE GAUNTLET (31-40) ---
    [{ type: 'ANT',  count: 75, interval: 100  }],
    [{ type: 'WASP', count: 65, interval: 120  }],
    [{ type: 'BEETLE', count: 35, interval: 300  }],
    [{ type: 'ANT',  count: 55, interval: 100  }, { type: 'WASP', count: 55, interval: 100 }],
    [{ type: 'QUEEN',   count: 6,  interval: 1500 }, { type: 'BEETLE', count: 20, interval: 500 }],
    [{ type: 'WASP', count: 70, interval: 100  }, { type: 'QUEEN',   count: 3,  interval: 2000 }],
    [{ type: 'BEETLE', count: 45, interval: 250  }],
    [{ type: 'ANT',  count: 90, interval: 80   }],
    [{ type: 'WASP', count: 60, interval: 120  }, { type: 'BEETLE', count: 30, interval: 300 }],
    [{ type: 'QUEEN',   count: 8,  interval: 1200 }, { type: 'WASP', count: 40, interval: 200 }],

    // --- BRUTAL FINAL WAVES (41-50) ---
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 40, interval: 150 }],
    [{ type: 'BEETLE', count: 55, interval: 250  }],
    [{ type: 'WASP', count: 85, interval: 100  }],
    [{ type: 'QUEEN',   count: 10, interval: 1000 }],
    [{ type: 'ANT',  count: 120,interval: 70   }],
    [{ type: 'WASP', count: 95, interval: 90   }, { type: 'BEETLE', count: 25, interval: 400 }],
    [{ type: 'BEETLE', count: 60, interval: 200  }, { type: 'QUEEN',   count: 6,  interval: 1500 }],
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 90, interval: 80  }],
    [{ type: 'BEETLE', count: 70, interval: 180  }],
    [{ type: 'GIANT_ANT', count: 2, interval: 3000 }, { type: 'QUEEN', count: 5, interval: 1500 }, { type: 'BEETLE', count: 25, interval: 350 }, { type: 'WASP', count: 30, interval: 200 }]
  ],

  // --- INFINITE QUADRATIC SCALING (51+) ---
  INFINITE_GENERATOR: (waveIndex) => {
    // x = 1 at wave 51.
    const x = waveIndex - 50; 
    
    // Split into linear and quadratic components for targeted math
    const linear = x;
    const quad = Math.pow(x, 2);

    // Scaling strategy: 
    // Waves 51-55: The 'linear' variable does the heavy lifting, acting mostly normal.
    // Waves 60+: The 'quad' variable grows exponentially larger and rips the caps off.
    const wave = [
      { 
        type: 'ANT',  
        count: Math.floor(Math.min(1200, 80 + (10 * linear) + (0.5 * quad))), 
        interval: Math.max(15, 100 - (linear * 2) - (quad * 0.05)) 
      },
      { 
        type: 'WASP', 
        count: Math.floor(Math.min(900, 60 + (8 * linear) + (0.4 * quad))), 
        interval: Math.max(20, 120 - (linear * 2.5) - (quad * 0.05)) 
      },
      { 
        type: 'BEETLE', 
        count: Math.floor(Math.min(600, 40 + (5 * linear) + (0.25 * quad))),  
        interval: Math.max(40, 250 - (linear * 3) - (quad * 0.1)) 
      },
      { 
        type: 'QUEEN',   
        count: Math.floor(Math.min(200, 10 + (1.5 * linear) + (0.1 * quad))),     
        interval: Math.max(80, 1000 - (linear * 15) - (quad * 0.5)) 
      }
    ];

    // Giant Ant Boss Waves (Spawn every 5 levels starting at 55)
    if (waveIndex >= 55 && waveIndex % 5 === 0) {
      // Calculate how many boss waves have happened (Wave 55 = 1, Wave 60 = 2)
      const bossTier = (waveIndex - 50) / 5; 
      
      // Brood count also follows a slow quadratic escalation
      const broodCount = Math.floor(Math.min(75, 2 + bossTier + (Math.pow(bossTier, 2) * 0.5)));
      
      wave.push({ 
        type: 'GIANT_ANT', 
        count: broodCount, 
        interval: Math.max(400, 4000 - (quad * 2)) 
      });
    }

    return wave;
  }
};
</file>

<file path="src/data/GED/ENG_1A/data.js">
// src/data/GED/ENG_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const ENGLISH_1A_DATA = {
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },
  realWords: [
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],
  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],
  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],
  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },
  assessment,
  notes,
  workbook,
  games
};
</file>

<file path="src/data/GED/ENG_1A/games.js">
// src/data/GED/ENG_1A/games.js
import { WAVE_PRESETS } from '../../../components/towerdefense/wavePresets';

export const games = {
  gameConfig: {
    themeId: 'RANDOM', // Option 5: Triggers the randomized map selector
    layout: {
      rows: 10,
      cols: 15,
      path: [
        [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
      ]
    },
    allowedTowers: ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO'],
    waves: WAVE_PRESETS.SET_1,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR
  }
};
</file>

<file path="src/hooks/useStudentProgress.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ensure this matches how you initialize Supabase in your project!
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Notice we added 'track' as a parameter here, defaulting to Y9
export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  const [allProgress, setAllProgress] = useState({
    Y8: {},
    Y9: {},
    ESL: {},
    GED: {}
  });
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }
      
      setUser(session.user);

      const { data } = await supabase
        .from('students')
        .select('progress')
        .eq('id', session.user.id)
        .single();

      if (data && data.progress) {
        let dbProgress = data.progress;
        const validTracks = ['Y8', 'Y9', 'ESL', 'GED'];

        // AUTO-MIGRATION: If keys are old unit IDs like "U1", move everything to Y9
        const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (isOldFormat) {
          dbProgress = {
            Y8: {},
            Y9: dbProgress,
            ESL: {},
            GED: {}
          };
          // Silently fix the database in the background so it doesn't happen again
          await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
        } else {
          // Ensure the base structure exists even if a track is empty
          validTracks.forEach(t => {
            if (!dbProgress[t]) dbProgress[t] = {};
          });
        }

        setAllProgress(dbProgress);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    // Get the existing score (defaults to 0 if they have never played this section)
    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        // ⚠️ FIX: Math.max ensures we only ever keep the highest XP score
        current: Math.max(existingScore, score),
        // We still update the answers if they provide new ones so they can see their latest work
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, // <-- THE FIX: Exposing allProgress so the Dashboard can actually read it
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}
</file>

<file path="src/tasks/Games.jsx">
// src/tasks/Games.jsx
import React, { useState } from 'react';
import { X, Shield, Trophy, Lock, Loader2, Play, Users, Award, ChevronLeft } from 'lucide-react';
import { supabase } from '../hooks/useStudentProgress';
import TowerDefense from './games/TowerDefense';

export default function Games({ pool, unitId, scores, onComplete, onQuit }) {
  const [view, setView] = useState('MENU');
  const [toast, setToast] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // Calculate total Unit XP to use as the starting economy.
  // We enforce a minimum of 20 credits, multiplied by 2 to give players a stronger start.
  const unitXP = Object.values(scores || {}).reduce((sum, section) => sum + (section?.current || 0), 0);
  const startingCredits = Math.max(20, unitXP * 2);

  const fetchLeaderboard = async () => {
    if (!supabase) return;
    setLoadingLeaderboard(true);
    try {
      const { data, error } = await supabase.from('students').select('id, raw_user_meta_data, email, progress');
      if (error) throw error;

      let parsedScores = [];
      data.forEach(student => {
        const name = student.raw_user_meta_data?.name || student.email?.split('@')[0] || 'Unknown Agent';
        let maxScore = 0;
        
        // Safely parse across all potential tracks to extract the p12 (Games) high score for this unit
        ['Y8', 'Y9', 'ESL', 'GED'].forEach(track => {
          if (student.progress?.[track]?.[unitId]?.p12?.current) {
            maxScore = Math.max(maxScore, student.progress[track][unitId].p12.current);
          }
        });

        if (maxScore > 0) {
          parsedScores.push({ name, score: maxScore });
        }
      });

      // Sort descending and slice Top 5
      parsedScores.sort((a, b) => b.score - a.score);
      setLeaderboard(parsedScores.slice(0, 5));
    } catch (err) {
      console.error('Failed to parse leaderboard profiles:', err);
    }
    setLoadingLeaderboard(false);
  };

  const handleModeSelect = (mode) => {
    if (mode === 'SURVIVOR' || mode === 'WALL') {
      setToast(`${mode === 'SURVIVOR' ? 'Survivor' : 'The Wall'} Mode is currently in development!`);
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (mode === 'LEADERBOARD') {
      fetchLeaderboard();
      setView('LEADERBOARD');
      return;
    }
    if (mode === 'TD') {
      setView('TD');
    }
  };

  if (view === 'TD') {
    return (
      <TowerDefense 
        pool={pool} 
        unitId={unitId} 
        scores={scores} 
        startingCredits={startingCredits}
        onComplete={onComplete} 
        onQuit={() => setView('MENU')} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
          <div className="bg-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black tracking-widest uppercase border-b-4 border-rose-700 flex items-center">
            <Lock className="w-6 h-6 mr-3" /> {toast}
          </div>
        </div>
      )}

      {/* Decorative Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        
        {view === 'MENU' && (
          <div className="w-full max-w-5xl animate-in zoom-in-95 duration-300">
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
              
              {/* Tower Defense Button */}
              <button onClick={() => handleModeSelect('TD')} className="relative group bg-[#1CB0F6] p-8 rounded-[2.5rem] border-b-[8px] border-[#1899D6] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>
                <Shield className="w-16 h-16 text-white mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-sm">Tower Defense</h2>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-[#0e5c8a] font-black uppercase tracking-widest text-sm bg-white/20 px-3 py-1.5 rounded-xl">Play</p>
                  <p className="text-white/90 font-bold text-sm">Starts with <span className="text-[#FFC800] drop-shadow-sm">{startingCredits} XP Credits</span></p>
                </div>
              </button>

              {/* Leaderboard Button */}
              <button onClick={() => handleModeSelect('LEADERBOARD')} className="relative group bg-[#FFC800] p-8 rounded-[2.5rem] border-b-[8px] border-[#D1A300] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>
                <Trophy className="w-16 h-16 text-amber-900 mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-black text-amber-950 mb-2 drop-shadow-sm">Leaderboard</h2>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-amber-900 font-black uppercase tracking-widest text-sm bg-black/10 px-3 py-1.5 rounded-xl">View Top 5</p>
                  <p className="text-amber-900/80 font-bold text-sm">Unit Clear Scores</p>
                </div>
              </button>

              {/* Survivor Mode (Coming Soon) */}
              <button onClick={() => handleModeSelect('SURVIVOR')} className="relative group bg-slate-800 p-8 rounded-[2.5rem] border-b-[8px] border-slate-950 active:border-b-0 active:translate-y-[8px] transition-all text-left opacity-80 hover:opacity-100 overflow-hidden">
                <div className="absolute top-4 right-6 bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-600">Coming Soon</div>
                <Lock className="w-16 h-16 text-slate-400 mb-6" />
                <h2 className="text-4xl font-black text-white mb-2">Survivor</h2>
                <p className="text-slate-400 font-medium text-lg">One life. Endless waves.</p>
              </button>

              {/* The Wall (Coming Soon) */}
              <button onClick={() => handleModeSelect('WALL')} className="relative group bg-slate-800 p-8 rounded-[2.5rem] border-b-[8px] border-slate-950 active:border-b-0 active:translate-y-[8px] transition-all text-left opacity-80 hover:opacity-100 overflow-hidden">
                <div className="absolute top-4 right-6 bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-600">Coming Soon</div>
                <Lock className="w-16 h-16 text-slate-400 mb-6" />
                <h2 className="text-4xl font-black text-white mb-2">The Wall</h2>
                <p className="text-slate-400 font-medium text-lg">Multiplayer cooperative defense.</p>
              </button>

            </div>
          </div>
        )}

        {view === 'LEADERBOARD' && (
          <div className="w-full max-w-3xl animate-in zoom-in-95 duration-300 flex flex-col h-full py-10">
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setView('MENU')} className="bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all text-white border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 shadow-sm">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-4xl font-black text-white tracking-tight flex items-center justify-center drop-shadow-md">
                  <Award className="w-10 h-10 text-[#FFC800] mr-4" /> Global Top 5
                </h2>
                <p className="text-slate-400 font-bold tracking-widest uppercase mt-2">Unit Hall of Fame</p>
              </div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            <div className="flex-1 bg-slate-800 border-4 border-slate-900 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto">
              {loadingLeaderboard ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-[#FFC800] mb-4" />
                  <span className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Decrypting Network Records...</span>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Users className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">No Records Found</h3>
                  <p className="text-slate-400 font-medium">Be the first to set a high score for this sector!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={index} className={`flex items-center justify-between p-6 rounded-2xl border-b-4 transition-transform hover:scale-[1.02] ${index === 0 ? 'bg-[#FFC800] border-[#D1A300]' : index === 1 ? 'bg-slate-300 border-slate-400' : index === 2 ? 'bg-amber-700 border-amber-900' : 'bg-slate-700 border-slate-900'}`}>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mr-6 ${index === 0 ? 'bg-white/30 text-amber-950' : index === 1 ? 'bg-white/50 text-slate-800' : index === 2 ? 'bg-white/20 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                          #{index + 1}
                        </div>
                        <span className={`text-2xl font-black uppercase tracking-wide ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`block text-xs font-black uppercase tracking-widest mb-1 ${index === 0 ? 'text-amber-900' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-amber-200' : 'text-slate-400'}`}>Score</span>
                        <span className={`text-3xl font-black ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>{entry.score}</span>
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
</file>

<file path="src/tasks/games/TowerDefense.jsx">
// src/tasks/games/TowerDefense.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { games } from '../../data/GED/ENG_1A/games';
import { ENGLISH_1A_DATA } from '../../data/GED/ENG_1A/data';
import { TOWERS, ENEMIES, getSellValue } from '../../components/towerdefense/gameData';
import GameBoard from '../../components/towerdefense/GameBoard';
import BuildMenu from '../../components/towerdefense/BuildMenu';
import UpgradePanel from '../../components/towerdefense/UpgradePanel';
import VocabChallenge from '../../components/towerdefense/VocabChallenge';
import HUD from '../../components/towerdefense/HUD';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import { useGameEngine } from '../../components/towerdefense/useGameEngine';

const DEFAULT_GAME_CONFIG = games.gameConfig;

const DEFAULT_VOCAB = (ENGLISH_1A_DATA.realWords || []).map(w => ({
  word: w.word,
  def: w.def
}));

const CHALLENGE_DURATION = 15;

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
  gameConfig = DEFAULT_GAME_CONFIG,
  vocab = DEFAULT_VOCAB,
  startingCredits = 200,
  unitId = 'default',
  themeId = 'STANDARD',
  onQuit = () => window.history.back(),
  onComplete = () => {}
}) {
  const layout = gameConfig.layout;
  const totalWaves = gameConfig.waves.length; 
  const pathSet = useRef(buildPathSet(layout.path)).current;

  const activeThemeId = useMemo(() => {
    const requestedTheme = gameConfig.themeId || themeId;
    if (requestedTheme === 'RANDOM') {
      const themes = ['STANDARD', 'NIGHT', 'ICE', 'DESERT'];
      return themes[Math.floor(Math.random() * themes.length)];
    }
    return requestedTheme;
  }, [gameConfig.themeId, themeId]);

  const basicEnemyType = useMemo(() => {
    return gameConfig.waves?.[0]?.[0]?.type || Object.keys(ENEMIES)[0];
  }, [gameConfig]);

  const gRef = useRef(null);
  if (gRef.current === null) {
    gRef.current = {
      credits: startingCredits, lives: 20, maxLives: 20, wave: 0, score: 0, bolts: 0,
      speed: 1, gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      decorations: generateDecorations(layout, pathSet),
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, nextId: 1, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: [], autoPlayDelay: 0, triggerNextWave: false
    };
  }
  const g = gRef.current;

  const [, setTick] = useState(0);
  const render = () => setTick(t => (t + 1) % 1e9);

  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [hoveredTowerId] = useState(null);
  const [activeBuilder, setActiveBuilder] = useState(null);
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const autoPlayRef = useRef(false);
  const [bestScore, setBestScore] = useState(0);

  const [challenge, setChallenge] = useState(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [challengeShakeKey, setChallengeShakeKey] = useState(0);
  const challengeActiveRef = useRef(false);

  const boardWrapperRef = useRef(null);
  const [boardScale, setBoardScale] = useState(1);

  useGameEngine({
    gRef, render, layout, gameConfig,
    onTriggerChallenge: buildChallengeTrigger,
    challengeActiveRef, autoPlayRef
  });

  useEffect(() => {
    if (g.triggerNextWave) {
      handleStartWave();
      g.triggerNextWave = false;
    }
  }, [g.triggerNextWave]);

  useEffect(() => {
    const saved = localStorage.getItem(`td_best_${unitId}`);
    if (saved) setBestScore(Number(saved));
  }, [unitId]);

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
    const available = vocab.filter(v => !g.usedVocab.includes(v.word));
    if (available.length === 0) return; 

    const v = available[Math.floor(Math.random() * available.length)];
    g.usedVocab.push(v.word); 

    const mode = Math.random() < 0.5 ? 'TYPE' : 'CHOICE';
    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== v.word.toLowerCase());
      const distractors = shuffle(others).slice(0, 3).map(x => x.word);
      choices = shuffle([v.word, ...distractors]);
    }
    
    challengeActiveRef.current = true;
    setChallenge({ mode, word: v.word, def: v.def, choices });
    setChallengeInput('');
    setChallengeTimeLeft(CHALLENGE_DURATION);
  }

  function closeChallenge() {
    challengeActiveRef.current = false;
    setChallenge(null);
    setChallengeInput('');
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

  useEffect(() => {
    if (!challenge) return;
    if (challengeTimeLeft <= 0) {
      if (challenge.mode === 'CHOICE') punishChallengeFail();
      closeChallenge();
      return;
    }
    const t = setTimeout(() => setChallengeTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [challenge, challengeTimeLeft]);

  function handleStartWave() {
    if (g.waveInProgress || g.gameState !== 'PLAYING') return;
    let data;
    if (g.wave < gameConfig.waves.length) {
      data = gameConfig.waves[g.wave];
    } else if (gameConfig.generateInfiniteWave) {
      data = gameConfig.generateInfiniteWave(g.wave);
    } else return; 

    g.spawnQueue = data.map(w => ({ ...w }));
    g.spawnTimer = 9999;
    g.wave += 1;
    g.waveInProgress = true;
    if (g.wave === 5 && !g.wave5ChallengeSpawned) g.challengeTimer = 8000; 
    render();
  }

  function handleCellClick(r, c, isPath) {
    if (activeBuilder) {
      if (isPath) return;
      if (g.towers.some(t => t.row === r && t.col === c)) return;
      const conf = TOWERS[activeBuilder.typeId];
      if (g.credits < conf.cost) return;
      g.credits -= conf.cost;
      g.towers.push({ id: g.nextId++, typeId: activeBuilder.typeId, row: r, col: c, upgrades: {} });
      setActiveBuilder(null);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
    } else setSelectedTowerId(null);
  }

  function handleCellHover(r, c, isPath) {
    if (!activeBuilder) { 
      if (hoverCell.row !== -1) setHoverCell({ row: -1, col: -1, valid: false }); 
      return; 
    }
    if (hoverCell.row === r && hoverCell.col === c) return;

    const valid = !isPath && !g.towers.some(t => t.row === r && t.col === c);
    setHoverCell({ row: r, col: c, valid });
  }

  function handleTowerClick(id) {
    if (activeBuilder) { setActiveBuilder(null); return; }
    setSelectedTowerId(id);
  }

  function handleUpgrade(key) {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    const conf = TOWERS[t.typeId];
    const upg = conf.upgrades[key];
    if (!upg || t.upgrades[key] || g.credits < upg.cost) return;
    g.credits -= upg.cost;
    t.upgrades = { ...t.upgrades, [key]: true };
    render();
  }

  function handleSell() {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    g.credits += getSellValue(t);
    g.towers = g.towers.filter(x => x.id !== selectedTowerId);
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
    if (!challenge || challenge.mode !== 'TYPE') return;
    const guess = challengeInput.trim().toLowerCase();
    if (!guess) return;
    if (guess === challenge.word.toLowerCase()) { awardChallengeWin(); closeChallenge(); }
    else { setChallengeShakeKey(k => k + 1); setChallengeInput(''); }
  }

  function handleChallengeChoice(choice) {
    if (!challenge || challenge.mode !== 'CHOICE') return;
    if (choice.toLowerCase() === challenge.word.toLowerCase()) awardChallengeWin();
    else punishChallengeFail();
    closeChallenge();
  }

  function handleReset() {
    Object.assign(g, {
      credits: startingCredits, lives: 20, maxLives: 20, wave: 0, score: 0, bolts: 0,
      gameState: 'PLAYING', towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      waveInProgress: false, spawnQueue: [], spawnTimer: 0, fireCooldowns: {}, challengeTimer: Infinity, wave5ChallengeSpawned: false, usedVocab: [], autoPlayDelay: 0
    });
    challengeActiveRef.current = false;
    setSelectedTowerId(null);
    setActiveBuilder(null);
    setChallenge(null);
    setChallengeInput('');
    render();
  }

  function confirmExit() {
    setShowExitConfirm(false);
    if (g.score > bestScore) {
      localStorage.setItem(`td_best_${unitId}`, g.score);
      setBestScore(g.score);
    }
    onComplete(g.score);
    onQuit();
  }

  useEffect(() => {
    if (g.score > bestScore) {
      setBestScore(g.score);
      localStorage.setItem(`td_best_${unitId}`, g.score);
    }
  }, [g.score, bestScore, unitId]);

  const selectedTower = g.towers.find(t => t.id === selectedTowerId) || null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      <HUD
        credits={g.credits}
        lives={g.lives}
        wave={g.wave}
        totalWaves={totalWaves}
        score={g.score}
        bestScore={bestScore}
        speed={g.speed}
        gameState={g.gameState}
        waveInProgress={g.waveInProgress}
        autoPlay={autoPlayRef.current}
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
               selectedTowerId={selectedTowerId} hoveredTowerId={hoveredTowerId}
               activeBuilder={activeBuilder} hoverCell={hoverCell}
               onCellClick={handleCellClick} onCellHover={handleCellHover}
               onCellLeave={() => setHoverCell({ row: -1, col: -1, valid: false })}
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
            allowedTowers={gameConfig.allowedTowers} credits={g.credits}
            activeBuilder={activeBuilder} bolts={g.bolts} onUseBolt={handleUseBolt}
            onSelect={(b) => setActiveBuilder(prev => prev?.typeId === b.typeId ? null : b)}
          />
        </div>
      </div>

      <VocabChallenge
        challenge={challenge} input={challengeInput} onInputChange={setChallengeInput}
        onSubmit={handleChallengeSubmit} onChoice={handleChallengeChoice}
        timeLeft={challengeTimeLeft} maxTime={CHALLENGE_DURATION} shakeKey={challengeShakeKey}
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
</file>

</files>
