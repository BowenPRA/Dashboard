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
- Only files matching these patterns are included: src/tasks/Games.jsx, src/tasks/games/TowerDefense.jsx, src/components/towerdefense/*.jsx, src/components/towerdefense/*.js, src/data/GED/ENG_1A/games.js, src/hooks/useStudentProgress.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/components/towerdefense/BuildMenu.jsx
src/components/towerdefense/GameBoard.jsx
src/components/towerdefense/gameData.js
src/components/towerdefense/HUD.jsx
src/components/towerdefense/UpgradePanel.jsx
src/components/towerdefense/VocabChallenge.jsx
src/data/GED/ENG_1A/games.js
src/hooks/useStudentProgress.js
src/tasks/Games.jsx
src/tasks/games/TowerDefense.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/towerdefense/BuildMenu.jsx">
import React from 'react';
import { Coins, Crosshair, Swords, Maximize2, Timer } from 'lucide-react';
import { TOWERS, TOWER_ORDER } from './gameData';

export default function BuildMenu({ allowedTowers, credits, activeBuilder, onSelect }) {
  const ids = TOWER_ORDER.filter(id => allowedTowers.includes(id));

  return (
    <div className="bg-white rounded-2xl shadow-lg border-4 border-indigo-200 p-3">
      <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 px-1">
        Click a tower, then click an empty grass tile to place it
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ids.map(id => {
          const t = TOWERS[id];
          if (!t) return null;
          const canAfford = credits >= t.cost;
          const isSelected = activeBuilder?.typeId === id;

          return (
            <button
              key={id}
              onClick={() => canAfford && onSelect({ typeId: id })}
              disabled={!canAfford}
              title={t.desc}
              className={`relative flex-shrink-0 w-32 rounded-2xl p-2 border-4 transition transform overflow-hidden text-left
                ${isSelected
                  ? 'border-indigo-500 ring-4 ring-indigo-200 -translate-y-1 shadow-xl bg-white'
                  : canAfford
                    ? 'border-slate-200 hover:border-indigo-300 hover:-translate-y-0.5 shadow bg-white'
                    : 'border-slate-200 opacity-50 cursor-not-allowed bg-slate-50'}`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className={`font-black ${canAfford ? 'text-amber-700' : 'text-slate-400'}`}>
                  {t.cost}
                </span>
              </div>

              <div className={`rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center py-3 mb-1`}>
                <span className="text-3xl drop-shadow">{t.emoji}</span>
              </div>
              <div className="text-center font-black text-base text-slate-800 leading-tight">
                {t.name}
              </div>

              <div className="flex justify-around mt-1 text-[10px] text-slate-500 font-bold">
                {t.type === 'BUFF' ? (
                  <>
                    <Stat icon={<Maximize2 className="w-3 h-3" />} label="AURA" value={t.base.auraRange} />
                    <Stat icon={<Timer className="w-3 h-3" />} label="BUFF" value={`${Math.round((1 - t.base.buff) * 100)}%`} />
                  </>
                ) : (
                  <>
                    <Stat icon={<Swords className="w-3 h-3" />} label="DMG" value={t.base.damage ?? '—'} />
                    <Stat icon={<Crosshair className="w-3 h-3" />} label="RNG" value={t.base.range} />
                    <Stat icon={<Timer className="w-3 h-3" />} label="CD" value={`${(t.base.cooldown / 1000).toFixed(1)}s`} />
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-0.5 text-slate-400">{icon}</div>
      <div className="text-slate-700">{value}</div>
      <div className="text-[8px] text-slate-400">{label}</div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/GameBoard.jsx">
import React, { useMemo } from 'react';
import { ENEMIES, TOWERS, getEffectiveStats } from './gameData';

export const CELL_SIZE = 48;

export default function GameBoard({
  layout,
  towers,
  creeps,
  projectiles,
  floaters,
  particles,
  burnZones,
  decorations,
  selectedTowerId,
  hoveredTowerId,
  activeBuilder,    // { typeId } or null
  hoverCell,        // { row, col, valid }
  onCellClick,
  onCellHover,
  onCellLeave,
  onTowerClick
}) {
  const { rows, cols, path } = layout;
  const width = cols * CELL_SIZE;
  const height = rows * CELL_SIZE;

  const pathSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < path.length - 1; i++) {
      const [r1, c1] = path[i];
      const [r2, c2] = path[i + 1];
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      segs.push({
        left: minC * CELL_SIZE,
        top: minR * CELL_SIZE,
        width: (maxC - minC + 1) * CELL_SIZE,
        height: (maxR - minR + 1) * CELL_SIZE
      });
    }
    return segs;
  }, [path]);

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

  const startCell = path[0];
  const endCell = path[path.length - 1];

  const rangeTower = towers.find(t => t.id === selectedTowerId)
                  || towers.find(t => t.id === hoveredTowerId);
  const rangeStats = rangeTower ? getEffectiveStats(rangeTower) : null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-300"
      style={{
        width,
        height,
        background:
          'linear-gradient(180deg, #bbf7d0 0%, #86efac 60%, #4ade80 100%)'
      }}
      onMouseLeave={onCellLeave}
    >
      {/* Grid */}
      <div className="absolute inset-0">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const isPath = pathCellSet.has(`${r}_${c}`);
            return (
              <div
                key={`${r}_${c}`}
                onClick={() => onCellClick(r, c, isPath)}
                onMouseEnter={() => onCellHover(r, c, isPath)}
                className="absolute cursor-pointer"
                style={{
                  left: c * CELL_SIZE,
                  top: r * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  boxShadow: isPath ? 'none' : 'inset 0 0 0 1px rgba(34,197,94,0.18)'
                }}
              />
            );
          })
        )}
      </div>

      {/* Decorations */}
      {decorations.map(d => {
        const sym = ['🌿', '🌸', '🍄'][d.variant] || '🌿';
        return (
          <div
            key={`dec_${d.id}`}
            className="absolute pointer-events-none select-none opacity-80"
            style={{
              left: d.col * CELL_SIZE + CELL_SIZE / 2,
              top: d.row * CELL_SIZE + CELL_SIZE / 2,
              transform: 'translate(-50%, -50%)',
              fontSize: 18
            }}
          >
            {sym}
          </div>
        );
      })}

      {/* Path */}
      {pathSegments.map((s, i) => (
        <div
          key={`seg_${i}`}
          className="absolute pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.width,
            height: s.height,
            background: 'linear-gradient(180deg, #fde68a 0%, #fbbf24 100%)',
            boxShadow: 'inset 0 0 0 3px #b45309, inset 0 0 18px rgba(180,83,9,0.25)'
          }}
        />
      ))}

      {/* Start portal */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: startCell[1] * CELL_SIZE,
          top: startCell[0] * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE
        }}
      >
        <div className="w-9 h-9 rounded-full bg-emerald-400 border-4 border-emerald-600 shadow-lg animate-pulse flex items-center justify-center text-white font-black text-xs">
          IN
        </div>
      </div>

      {/* End portal */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: endCell[1] * CELL_SIZE,
          top: endCell[0] * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE
        }}
      >
        <div className="w-9 h-9 rounded-full bg-rose-400 border-4 border-rose-600 shadow-lg animate-pulse flex items-center justify-center text-white font-black text-xs">
          OUT
        </div>
      </div>

      {/* Burn zones */}
      {burnZones.map(z => (
        <div
          key={z.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: z.col * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE,
            top: z.row * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE,
            width: z.radius * 2 * CELL_SIZE,
            height: z.radius * 2 * CELL_SIZE,
            background: 'radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(239,68,68,0.15) 60%, transparent 100%)',
            opacity: Math.min(1, z.life / z.maxLife)
          }}
        />
      ))}

      {/* Range indicator */}
      {rangeTower && rangeStats && (
        <div
          className="absolute pointer-events-none rounded-full border-4 border-white border-dashed"
          style={{
            left: rangeTower.col * CELL_SIZE + CELL_SIZE / 2 - (rangeStats.range || rangeStats.auraRange) * CELL_SIZE,
            top: rangeTower.row * CELL_SIZE + CELL_SIZE / 2 - (rangeStats.range || rangeStats.auraRange) * CELL_SIZE,
            width: (rangeStats.range || rangeStats.auraRange) * 2 * CELL_SIZE,
            height: (rangeStats.range || rangeStats.auraRange) * 2 * CELL_SIZE,
            background: 'rgba(255,255,255,0.12)'
          }}
        />
      )}

      {/* Build placement preview */}
      {activeBuilder && hoverCell.row >= 0 && (() => {
        const tConf = TOWERS[activeBuilder.typeId];
        if (!tConf) return null;
        const range = tConf.base.range || tConf.base.auraRange || 0;
        return (
          <>
            <div
              className="absolute pointer-events-none rounded-full border-4 border-dashed"
              style={{
                left: hoverCell.col * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE,
                top: hoverCell.row * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE,
                width: range * 2 * CELL_SIZE,
                height: range * 2 * CELL_SIZE,
                borderColor: hoverCell.valid ? 'rgba(255,255,255,0.9)' : 'rgba(239,68,68,0.9)',
                background: hoverCell.valid ? 'rgba(255,255,255,0.15)' : 'rgba(239,68,68,0.15)'
              }}
            />
            <div
              className={`absolute pointer-events-none rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${tConf.gradient} ${hoverCell.valid ? 'opacity-80' : 'opacity-40 grayscale'}`}
              style={{
                left: hoverCell.col * CELL_SIZE + 4,
                top: hoverCell.row * CELL_SIZE + 4,
                width: CELL_SIZE - 8,
                height: CELL_SIZE - 8
              }}
            >
              {tConf.emoji}
            </div>
          </>
        );
      })()}

      {/* Towers */}
      {towers.map(t => {
        const tConf = TOWERS[t.typeId];
        if (!tConf) return null;
        const isSelected = selectedTowerId === t.id;
        const isHovered = hoveredTowerId === t.id;
        const upgradeCount = Object.values(t.upgrades || {}).filter(Boolean).length;

        return (
          <div
            key={t.id}
            onClick={(e) => { e.stopPropagation(); onTowerClick(t.id); }}
            className={`absolute cursor-pointer transition-transform ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
            style={{
              left: t.col * CELL_SIZE + 4,
              top: t.row * CELL_SIZE + 4,
              width: CELL_SIZE - 8,
              height: CELL_SIZE - 8
            }}
          >
            <div
              className={`w-full h-full rounded-xl bg-gradient-to-br ${tConf.gradient} flex items-center justify-center text-2xl shadow-lg border-2 border-white
                ${isSelected ? `ring-4 ${tConf.ring}` : ''}
                ${isHovered ? 'ring-2 ring-white/70' : ''}`}
            >
              {tConf.emoji}
            </div>
            {upgradeCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-amber-400 border-2 border-white rounded-full text-[10px] font-black w-4 h-4 flex items-center justify-center text-amber-900 shadow">
                {upgradeCount}
              </div>
            )}
          </div>
        );
      })}

      {/* Projectiles */}
      {projectiles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: p.col * CELL_SIZE + CELL_SIZE / 2,
            top: p.row * CELL_SIZE + CELL_SIZE / 2,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {p.kind === 'CHAIN' ? (
            <svg width={(p.range || 6) * CELL_SIZE * 2} height={(p.range || 6) * CELL_SIZE * 2}
                 className="absolute pointer-events-none"
                 style={{ left: -(p.range || 6) * CELL_SIZE, top: -(p.range || 6) * CELL_SIZE }}>
              {(p.lines || []).map((ln, i) => (
                <line key={i}
                      x1={(p.range || 6) * CELL_SIZE}
                      y1={(p.range || 6) * CELL_SIZE}
                      x2={(ln.col - p.col) * CELL_SIZE + (p.range || 6) * CELL_SIZE}
                      y2={(ln.row - p.row) * CELL_SIZE + (p.range || 6) * CELL_SIZE}
                      stroke="#fde047" strokeWidth="3" opacity={p.life / p.maxLife} />
              ))}
            </svg>
          ) : p.kind === 'LANCE' ? (
            <div
              className="absolute bg-emerald-300"
              style={{
                width: p.length * CELL_SIZE,
                height: 4,
                transform: `translate(0, -2px) rotate(${p.angle}rad)`,
                transformOrigin: '0 50%',
                opacity: p.life / p.maxLife,
                boxShadow: '0 0 8px #34d399'
              }}
            />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.kind === 'SPLASH' ? 10 : 6,
                height: p.kind === 'SPLASH' ? 10 : 6,
                background: p.color || '#fff',
                boxShadow: `0 0 8px ${p.color || '#fff'}`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>
      ))}

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: p.col * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE,
            top: p.row * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE,
            width: p.radius * 2 * CELL_SIZE,
            height: p.radius * 2 * CELL_SIZE,
            background: p.color || 'rgba(255,255,255,0.5)',
            opacity: p.life / p.maxLife,
            transform: `scale(${1 - p.life / p.maxLife * 0.3})`
          }}
        />
      ))}

      {/* Creeps */}
      {creeps.map(c => {
        const eConf = ENEMIES[c.typeKey];
        if (!eConf) return null;
        const hpPct = Math.max(0, c.hp / c.maxHp);
        return (
          <div
            key={c.id}
            className="absolute pointer-events-none"
            style={{
              left: c.col * CELL_SIZE + CELL_SIZE / 2,
              top: c.row * CELL_SIZE + CELL_SIZE / 2,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className={`rounded-full ${eConf.color} border-2 ${eConf.border} flex items-center justify-center shadow-md`}
              style={{
                width: eConf.radius * 2,
                height: eConf.radius * 2,
                fontSize: eConf.radius,
                filter: c.freezeTimer > 0 ? 'brightness(0.7) hue-rotate(180deg)' : 'none'
              }}
            >
              <span style={{ fontSize: eConf.radius * 1.1 }}>{eConf.emoji}</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-10 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/40">
              <div
                className="h-full"
                style={{
                  width: `${hpPct * 100}%`,
                  background: hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#f59e0b' : '#ef4444'
                }}
              />
            </div>
            {c.freezeTimer > 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">❄️</div>
            )}
            {c.burning > 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">🔥</div>
            )}
          </div>
        );
      })}

      {/* Floaters */}
      {floaters.map(f => (
        <div
          key={f.id}
          className={`absolute pointer-events-none font-black text-sm ${f.colorClass}`}
          style={{
            left: f.col * CELL_SIZE + CELL_SIZE / 2,
            top: f.row * CELL_SIZE + CELL_SIZE / 2 - (1 - f.life / f.maxLife) * 30,
            transform: 'translate(-50%, -50%)',
            opacity: f.life / f.maxLife,
            textShadow: '0 1px 2px rgba(0,0,0,0.6)'
          }}
        >
          {f.text}
        </div>
      ))}
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
  GLAZED: {
    name: "Glazed",
    emoji: "🍩",
    color: "bg-pink-200",
    border: "border-pink-400",
    hp: 30,
    speed: 1.1,
    reward: 1,
    radius: 14
  },
  CRULLER: {
    name: "Cruller",
    emoji: "🥨",
    color: "bg-amber-300",
    border: "border-amber-500",
    hp: 15,
    speed: 1.7,
    reward: 1,
    radius: 12
  },
  FRITTER: {
    name: "Fritter",
    emoji: "🍪",
    color: "bg-amber-700",
    border: "border-amber-900",
    hp: 150,
    speed: 0.6,
    reward: 2,
    radius: 18
  },
  JELLY: {
    name: "Jelly Boss",
    emoji: "🟣",
    color: "bg-rose-500",
    border: "border-rose-700",
    hp: 600,
    speed: 0.45,
    reward: 10,
    radius: 24
  }
};

// ---------- Towers ----------
// Each upgrade is a one-time purchase. `targeting` upgrades change AI behavior.
export const TOWERS = {
  DART: {
    id: 'DART',
    name: "Sentry",
    emoji: "🎯",
    cost: 20,
    type: 'SINGLE',
    desc: "Cheap, rapid-fire defender",
    gradient: "from-sky-400 to-sky-600",
    accent: "bg-sky-500",
    ring: "ring-sky-400",
    defaultTargeting: 'FIRST',
    base: { range: 3, damage: 8, cooldown: 800 },
    upgrades: {
      rate:    { cost: 30, label: "Rapid Fire", desc: "Fires twice as fast" },
      damage:  { cost: 40, label: "Sharp Tips", desc: "+200% damage" },
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
    desc: "Long range, heavy damage, slow fire",
    gradient: "from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    ring: "ring-emerald-400",
    defaultTargeting: 'STRONG',
    base: { range: 6, damage: 45, cooldown: 2200 },
    upgrades: {
      rate:      { cost: 80,  label: "Quick Reload",   desc: "Fires 35% faster" },
      damage:    { cost: 90,  label: "Heavy Caliber",  desc: "+100% damage" },
      range:     { cost: 60,  label: "Extended Scope", desc: "+2 range" },
      targeting: { cost: 70,  label: "Execute",        desc: "Targets enemies with lowest HP" },
      passive:   { cost: 150, label: "Lance",          desc: "Shots pierce in a line past target" }
    }
  },

  SPLASH: {
    id: 'SPLASH',
    name: "Mortar",
    emoji: "💣",
    cost: 75,
    type: 'SPLASH',
    desc: "Lobs explosives for area damage",
    gradient: "from-rose-400 to-rose-600",
    accent: "bg-rose-500",
    ring: "ring-rose-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.5, damage: 18, splashRadius: 1.5, cooldown: 1800 },
    upgrades: {
      rate:      { cost: 90,  label: "Auto Loader",  desc: "Fires 30% faster" },
      damage:    { cost: 100, label: "Heavy Shells", desc: "+90% damage" },
      range:     { cost: 60,  label: "Long Lob",     desc: "+1 range" },
      targeting: { cost: 80,  label: "Cluster Bomb", desc: "Targets densest enemy group" },
      passive:   { cost: 150, label: "Napalm",       desc: "Leaves a burning patch on impact" }
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
    base: { range: 2.5, damage: 4, slowPercent: 0.45, slowDuration: 1500, cooldown: 1500 },
    upgrades: {
      rate:      { cost: 70,  label: "Frostpulse",    desc: "Fires 35% faster" },
      damage:    { cost: 60,  label: "Permafrost",    desc: "Slow lasts 60% longer" },
      range:     { cost: 50,  label: "Frigid Air",    desc: "+1 range" },
      targeting: { cost: 60,  label: "Fresh Targets", desc: "Prioritizes non-frozen enemies" },
      passive:   { cost: 130, label: "Frost Burst",   desc: "Splash-slows nearby enemies" }
    }
  },

  CHAIN: {
    id: 'CHAIN',
    name: "Tesla",
    emoji: "⚡",
    cost: 110,
    type: 'CHAIN',
    desc: "Lightning chains between enemies",
    gradient: "from-amber-300 to-amber-500",
    accent: "bg-amber-400",
    ring: "ring-amber-400",
    defaultTargeting: 'FIRST',
    base: { range: 3, damage: 25, bounces: 2, cooldown: 1200 },
    upgrades: {
      rate:      { cost: 130, label: "Static Build",   desc: "Fires 35% faster" },
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
    cost: 100,
    type: 'BUFF',
    desc: "Boosts firing rate of nearby towers",
    gradient: "from-yellow-300 to-yellow-500",
    accent: "bg-yellow-400",
    ring: "ring-yellow-400",
    base: { auraRange: 2.5, buff: 0.8 },
    upgrades: {
      rate:    { cost: 140, label: "Pure Octane", desc: "Aura makes towers 35% faster" },
      range:   { cost: 110, label: "Wide Spray",  desc: "+1.5 aura range" },
      passive: { cost: 200, label: "Overcharge",  desc: "Buffed towers also gain +30% damage" }
    }
  }
};

// Display order for the build menu
export const TOWER_ORDER = ['DART', 'SNIPER', 'FROST', 'SPLASH', 'CHAIN', 'NITRO'];

// ---------- Stat helpers ----------

// Returns the live, post-upgrade stat block for a tower instance.
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
      stats.lance = !!u.passive;
      break;

    case 'SPLASH':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.7;
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

// Multiplicative buff a non-Nitro tower receives from all Nitro towers in range.
export function getNitroBuff(tower, allTowers) {
  if (tower.typeId === 'NITRO') return { rateMul: 1, damageMul: 1 };
  let rateMul = 1;
  let damageMul = 1;

  for (const other of allTowers) {
    if (other.typeId !== 'NITRO') continue;
    const s = getEffectiveStats(other);
    const dist = Math.sqrt(
      Math.pow(other.row - tower.row, 2) + Math.pow(other.col - tower.col, 2)
    );
    if (dist <= s.auraRange) {
      rateMul *= s.buff;
      if (s.overcharge) damageMul *= 1.3;
    }
  }
  return { rateMul, damageMul };
}

// Total credits spent on a tower (base + purchased upgrades).
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

// Refund value when selling (60%).
export function getSellValue(tower) {
  return Math.floor(getTotalSpent(tower) * 0.6);
}
</file>

<file path="src/components/towerdefense/HUD.jsx">
import React from 'react';
import { Coins, Heart, Trophy, Zap, Play, Skull, Layers } from 'lucide-react';

export default function HUD({
  credits, lives, wave, totalWaves, score, bolts, speed,
  gameState, waveInProgress, creepCount,
  onStartWave, onSetSpeed, onUseBolt
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-4 border-indigo-200 p-3 flex flex-wrap items-center gap-2 sm:gap-3">
      <Stat icon={<Coins className="w-5 h-5" />} value={credits} tone="amber" />
      <Stat icon={<Heart className="w-5 h-5 fill-rose-500" />} value={lives} tone="rose" />
      <Stat icon={<Trophy className="w-5 h-5" />} value={score} tone="indigo" />
      <Stat
        icon={<Layers className="w-5 h-5" />}
        value={`${wave}/${totalWaves}`}
        tone="emerald"
      />
      <Stat icon={<Skull className="w-5 h-5" />} value={creepCount} tone="slate" />

      <div className="flex-1" />

      <button
        onClick={onUseBolt}
        disabled={bolts === 0}
        title="Spend a Lightning Bolt to zap all enemies"
        className={`flex items-center gap-1 px-3 py-2 rounded-xl font-black border-2 transition
          ${bolts > 0
            ? 'bg-yellow-300 border-yellow-500 hover:bg-yellow-400 text-yellow-900 shadow'
            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}
      >
        <Zap className={`w-5 h-5 ${bolts > 0 ? 'fill-yellow-700' : ''}`} />
        {bolts}
      </button>

      <div className="flex border-2 border-indigo-300 rounded-xl overflow-hidden">
        {[1, 2, 3].map(s => (
          <button
            key={s}
            onClick={() => onSetSpeed(s)}
            className={`px-3 py-2 text-sm font-black transition
              ${speed === s
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
          >
            {s}x
          </button>
        ))}
      </div>

      {!waveInProgress && gameState === 'PLAYING' && wave < totalWaves && (
        <button
          onClick={onStartWave}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black border-2 border-emerald-700 shadow transition"
        >
          <Play className="w-4 h-4 fill-white" />
          Start Wave {wave + 1}
        </button>
      )}

      {waveInProgress && (
        <div className="px-4 py-2 rounded-xl bg-rose-100 border-2 border-rose-300 text-rose-700 font-black animate-pulse">
          Wave {wave} in progress
        </div>
      )}
    </div>
  );
}

const TONE = {
  amber:   'bg-amber-50 border-amber-300 text-amber-800',
  rose:    'bg-rose-50 border-rose-300 text-rose-700',
  indigo:  'bg-indigo-50 border-indigo-300 text-indigo-700',
  emerald: 'bg-emerald-50 border-emerald-300 text-emerald-700',
  slate:   'bg-slate-50 border-slate-300 text-slate-600'
};

function Stat({ icon, value, tone }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-black ${TONE[tone] || TONE.slate}`}>
      {icon}
      <span>{value}</span>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/UpgradePanel.jsx">
import React from 'react';
import { Coins, X, Check, Lock, Gauge, Swords, Maximize2, Crosshair, Sparkles, Trash2 } from 'lucide-react';
import { TOWERS, getEffectiveStats, getSellValue } from './gameData';

const UPGRADE_ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];
const UPGRADE_ICONS = {
  rate:      <Gauge className="w-5 h-5" />,
  damage:    <Swords className="w-5 h-5" />,
  range:     <Crosshair className="w-5 h-5" />,
  targeting: <Maximize2 className="w-5 h-5" />,
  passive:   <Sparkles className="w-5 h-5" />
};

export default function UpgradePanel({ tower, credits, onUpgrade, onSell, onClose }) {
  if (!tower) return null;
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return null;

  const stats = getEffectiveStats(tower);
  const sellValue = getSellValue(tower);
  const upgrades = tower.upgrades || {};

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-br ${tConf.gradient} p-4 flex items-center gap-4 relative`}>
          <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur flex items-center justify-center text-4xl border-2 border-white shadow">
            {tConf.emoji}
          </div>
          <div className="flex-1 text-white">
            <div className="text-3xl font-black drop-shadow">{tConf.name}</div>
            <div className="text-sm opacity-90 font-medium">{tConf.desc}</div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-4 text-sm font-bold text-slate-600">
          {tConf.type === 'BUFF' ? (
            <>
              <span>Aura: <span className="text-slate-900">{stats.auraRange}</span></span>
              <span>Rate Bonus: <span className="text-slate-900">+{Math.round((1 - stats.buff) * 100)}%</span></span>
              {stats.overcharge && <span className="text-amber-600">⚡ Overcharge active</span>}
            </>
          ) : (
            <>
              {stats.damage != null && <span>Damage: <span className="text-slate-900">{stats.damage}</span></span>}
              <span>Range: <span className="text-slate-900">{stats.range}</span></span>
              <span>Cooldown: <span className="text-slate-900">{(stats.cooldown / 1000).toFixed(2)}s</span></span>
            </>
          )}
        </div>

        <div className="p-4">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 px-1">
            Upgrades — each can be purchased once
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {UPGRADE_ORDER.map(key => {
              const upg = tConf.upgrades[key];
              if (!upg) return null;
              const owned = !!upgrades[key];
              const canAfford = credits >= upg.cost;
              return (
                <UpgradeCard
                  key={key}
                  icon={UPGRADE_ICONS[key]}
                  upg={upg}
                  owned={owned}
                  canAfford={canAfford}
                  onClick={() => !owned && canAfford && onUpgrade(key)}
                />
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onSell}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 text-rose-700 font-bold transition"
          >
            <Trash2 className="w-4 h-4" />
            Sell for
            <span className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-amber-500" />
              {sellValue}
            </span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function UpgradeCard({ icon, upg, owned, canAfford, onClick }) {
  let stateClass, badge;
  if (owned) {
    stateClass = 'bg-emerald-50 border-emerald-400';
    badge = (
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">
        <Check className="w-3 h-3" /> Owned
      </div>
    );
  } else if (!canAfford) {
    stateClass = 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed';
    badge = (
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-300 text-slate-600 text-xs font-bold">
        <Lock className="w-3 h-3" /> Not enough
      </div>
    );
  } else {
    stateClass = 'bg-white border-indigo-200 hover:border-indigo-500 hover:shadow-lg cursor-pointer';
    badge = (
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
        <Coins className="w-3 h-3 text-amber-500" />
        {upg.cost}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={owned || !canAfford}
      className={`text-left rounded-xl border-2 p-3 transition ${stateClass}`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${owned ? 'bg-emerald-200 text-emerald-700' : 'bg-indigo-100 text-indigo-600'}`}>
            {icon}
          </div>
          <div className="font-black text-slate-800">{upg.label}</div>
        </div>
        {badge}
      </div>
      <div className="text-xs text-slate-500 leading-snug">{upg.desc}</div>
    </button>
  );
}
</file>

<file path="src/components/towerdefense/VocabChallenge.jsx">
import React from 'react';
import { Zap, Timer } from 'lucide-react';

export default function VocabChallenge({ challenge, input, onInputChange, onSubmit, timeLeft }) {
  if (!challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 max-w-lg w-full overflow-hidden"
      >
        <div className="bg-gradient-to-br from-yellow-300 to-amber-500 p-5 text-center text-yellow-900">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap className="w-7 h-7 fill-yellow-700" />
            <span className="text-2xl font-black tracking-wide">LIGHTNING CHALLENGE!</span>
          </div>
          <div className="text-sm font-bold opacity-90">
            Type the word to earn a Lightning Bolt ⚡
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Definition
            </div>
            <div className="text-slate-700 text-base leading-snug">
              {challenge.def}
            </div>
          </div>

          <input
            autoFocus
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type the word..."
            className="w-full px-4 py-3 rounded-xl border-4 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg font-bold text-slate-800"
          />

          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 font-bold ${timeLeft <= 2 ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`}>
              <Timer className="w-5 h-5" />
              {timeLeft}s
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
</file>

<file path="src/data/GED/ENG_1A/games.js">
// Level definition only — path layout, waves, and which towers are allowed.
// All tower/enemy/stat logic lives in components/towerdefense/gameData.js
export const games = {
  gameConfig: {
    layout: {
      rows: 10,
      cols: 15,
      path: [
        [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
      ]
    },
    // Future levels can ban towers by removing their id from this list.
    allowedTowers: ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO'],
    waves: [
      [{ type: 'GLAZED',  count: 5,  interval: 1500 }],
      [{ type: 'GLAZED',  count: 8,  interval: 1200 }],
      [{ type: 'GLAZED',  count: 5,  interval: 1000 }, { type: 'CRULLER', count: 3,  interval: 800 }],
      [{ type: 'CRULLER', count: 8,  interval: 700  }],
      [{ type: 'GLAZED',  count: 12, interval: 600  }, { type: 'FRITTER', count: 1,  interval: 2000 }],
      [{ type: 'GLAZED',  count: 15, interval: 800  }, { type: 'CRULLER', count: 5,  interval: 600 }],
      [{ type: 'FRITTER', count: 3,  interval: 1500 }, { type: 'CRULLER', count: 5,  interval: 500 }],
      [{ type: 'GLAZED',  count: 20, interval: 400  }],
      [{ type: 'CRULLER', count: 15, interval: 400  }, { type: 'FRITTER', count: 2,  interval: 1000 }],
      [{ type: 'FRITTER', count: 5,  interval: 1000 }, { type: 'JELLY',   count: 1,  interval: 3000 }],
      [{ type: 'GLAZED',  count: 25, interval: 350  }],
      [{ type: 'CRULLER', count: 15, interval: 300  }, { type: 'FRITTER', count: 4,  interval: 1000 }],
      [{ type: 'GLAZED',  count: 10, interval: 300  }, { type: 'CRULLER', count: 15, interval: 250 }],
      [{ type: 'FRITTER', count: 8,  interval: 1000 }],
      [{ type: 'CRULLER', count: 20, interval: 200  }, { type: 'JELLY',   count: 1,  interval: 2000 }],
      [{ type: 'GLAZED',  count: 30, interval: 250  }, { type: 'FRITTER', count: 5,  interval: 800 }],
      [{ type: 'CRULLER', count: 30, interval: 200  }],
      [{ type: 'FRITTER', count: 15, interval: 600  }],
      [{ type: 'GLAZED',  count: 20, interval: 200  }, { type: 'CRULLER', count: 20, interval: 200 }],
      [{ type: 'FRITTER', count: 12, interval: 500  }, { type: 'JELLY',   count: 3,  interval: 1500 }]
    ]
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
import React, { useState } from 'react';
import { X, Shield, Trophy, Lock, Loader2, Play, Users, Award, ChevronLeft } from 'lucide-react';
import { supabase } from '../hooks/useStudentProgress';
import TowerDefense from './games/TowerDefense';

export default function Games({ pool, unitId, scores, onComplete, onQuit }) {
  const [view, setView] = useState('MENU');
  const [toast, setToast] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

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
    return <TowerDefense pool={pool} unitId={unitId} scores={scores} onComplete={onComplete} onQuit={() => setView('MENU')} />;
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
              <button onClick={() => handleModeSelect('TD')} className="relative group bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-[2.5rem] border-b-[8px] border-indigo-800 active:border-b-0 active:translate-y-[8px] transition-all text-left shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>
                <Shield className="w-16 h-16 text-white mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-sm">Tower Defense</h2>
                <p className="text-indigo-100 font-medium text-lg opacity-90">Defend the core. Build tactical networks.</p>
              </button>

              {/* Leaderboard Button */}
              <button onClick={() => handleModeSelect('LEADERBOARD')} className="relative group bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-[2.5rem] border-b-[8px] border-amber-600 active:border-b-0 active:translate-y-[8px] transition-all text-left shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>
                <Trophy className="w-16 h-16 text-amber-900 mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-black text-amber-950 mb-2 drop-shadow-sm">Leaderboard</h2>
                <p className="text-amber-900 font-bold text-lg opacity-80">View Top 5 Unit Clear Scores.</p>
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
              <button onClick={() => setView('MENU')} className="bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all text-white active:scale-95 border border-slate-700 shadow-sm">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-4xl font-black text-white tracking-tight flex items-center justify-center drop-shadow-md">
                  <Award className="w-10 h-10 text-amber-400 mr-4" /> Global Top 5
                </h2>
                <p className="text-slate-400 font-bold tracking-widest uppercase mt-2">Unit Hall of Fame</p>
              </div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            <div className="flex-1 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto">
              {loadingLeaderboard ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
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
                    <div key={index} className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-transform hover:scale-[1.02] ${index === 0 ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500/50' : index === 1 ? 'bg-slate-700/50 border-slate-500' : index === 2 ? 'bg-amber-900/30 border-amber-800/50' : 'bg-slate-800 border-slate-700'}`}>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mr-6 ${index === 0 ? 'bg-amber-400 text-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : index === 1 ? 'bg-slate-300 text-slate-800' : index === 2 ? 'bg-amber-700 text-amber-100' : 'bg-slate-700 text-slate-400'}`}>
                          #{index + 1}
                        </div>
                        <span className="text-2xl font-black text-white uppercase tracking-wide">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Score</span>
                        <span className={`text-3xl font-black ${index === 0 ? 'text-amber-400' : 'text-white'}`}>{entry.score}</span>
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
import { TOWERS, ENEMIES, getEffectiveStats, getNitroBuff, getSellValue } from '../../components/towerdefense/gameData';
import GameBoard from '../../components/towerdefense/GameBoard';
import BuildMenu from '../../components/towerdefense/BuildMenu';
import UpgradePanel from '../../components/towerdefense/UpgradePanel';
import VocabChallenge from '../../components/towerdefense/VocabChallenge';
import HUD from '../../components/towerdefense/HUD';

const DEFAULT_GAME_CONFIG = games.gameConfig;

const DEFAULT_VOCAB = [
  { word: 'ubiquitous', def: 'Present, appearing, or found everywhere.' },
  { word: 'ephemeral',  def: 'Lasting for a very short time.' },
  { word: 'pragmatic',  def: 'Dealing with things sensibly and realistically.' },
  { word: 'ambiguous',  def: 'Open to more than one interpretation.' },
  { word: 'meticulous', def: 'Showing great attention to detail.' },
  { word: 'resilient',  def: 'Able to recover quickly from difficulties.' },
  { word: 'candid',     def: 'Truthful and straightforward; frank.' },
  { word: 'eloquent',   def: 'Fluent and persuasive in speaking or writing.' },
  { word: 'tenacious',  def: 'Holding firmly; persistent and determined.' },
  { word: 'arduous',    def: 'Involving strenuous effort; difficult and tiring.' },
  { word: 'prudent',    def: 'Acting with care and thought for the future.' },
  { word: 'gregarious', def: 'Fond of the company of others; sociable.' }
];

const TILE_SPEED = 2.0; // base tiles-per-second multiplier

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
      if (Math.random() < 0.18) {
        out.push({ id: id++, row: r, col: c, variant: Math.floor(Math.random() * 3) });
      }
    }
  }
  return out;
}

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

export default function TowerDefense({ gameConfig = DEFAULT_GAME_CONFIG, vocab = DEFAULT_VOCAB }) {
  const layout = gameConfig.layout;
  const totalWaves = gameConfig.waves.length;
  const pathSet = useRef(buildPathSet(layout.path)).current;

  // All live game state lives in a ref so the loop can mutate freely.
  const gRef = useRef(null);
  if (gRef.current === null) {
    gRef.current = {
      credits: 200, lives: 20, wave: 0, score: 0, bolts: 0,
      speed: 1, gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      decorations: generateDecorations(layout, pathSet),
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, nextId: 1, challengeTimer: 0
    };
  }
  const g = gRef.current;

  const [, setTick] = useState(0);
  const render = () => setTick(t => (t + 1) % 1e9);

  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [hoveredTowerId, setHoveredTowerId] = useState(null);
  const [activeBuilder, setActiveBuilder] = useState(null);
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [challenge, setChallenge] = useState(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const challengeActiveRef = useRef(false);

  const isPathCell = (r, c) => pathSet.has(`${r}_${c}`);
  const newId = () => g.nextId++;

  // ----- simulation helpers -----
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
      const d = Math.hypot(dr, dc);
      if (d <= dist) { c.row = tr; c.col = tc; c.waypointIdx++; dist -= d; }
      else { c.row += (dr / d) * dist; c.col += (dc / d) * dist; dist = 0; }
    }
    if (c.waypointIdx >= layout.path.length - 1) c.reachedEnd = true;
  }

  function towerTargetingMode(tower) {
    const conf = TOWERS[tower.typeId];
    if (tower.upgrades?.targeting) {
      if (tower.typeId === 'SNIPER') return 'LOWEST';
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
      c.hp > 0 && !c.reachedEnd &&
      Math.hypot(c.row - tower.row, c.col - tower.col) <= range
    );
    if (pool.length === 0) return null;
    if (mode === 'STRONG') return pool.reduce((a, b) => a.hp > b.hp ? a : b);
    if (mode === 'LOWEST') return pool.reduce((a, b) => a.hp < b.hp ? a : b);
    if (mode === 'FRESH') {
      const fresh = pool.filter(c => c.freezeTimer <= 0);
      const arr = fresh.length ? fresh : pool;
      return arr.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
    }
    if (mode === 'DENSEST') {
      let best = pool[0], bestN = -1;
      for (const c of pool) {
        const n = g.creeps.reduce((acc, x) =>
          acc + (Math.hypot(x.row - c.row, x.col - c.col) < 1.8 ? 1 : 0), 0);
        if (n > bestN) { bestN = n; best = c; }
      }
      return best;
    }
    return pool.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
  }

  function damageCreep(c, dmg) {
    if (c.hp <= 0) return;
    const d = Math.round(dmg);
    c.hp -= d;
    if (d > 0) {
      g.floaters.push({
        id: newId(), text: `-${d}`, row: c.row, col: c.col,
        colorClass: 'text-white', life: 500, maxLife: 500
      });
    }
    if (c.hp <= 0) {
      const conf = ENEMIES[c.typeKey];
      g.credits += conf.reward;
      g.score += conf.reward * 10;
      g.particles.push({
        id: newId(), row: c.row, col: c.col, radius: 0.6,
        color: 'rgba(255,200,0,0.55)', life: 400, maxLife: 400
      });
      g.floaters.push({
        id: newId(), text: `+$${conf.reward}`, row: c.row, col: c.col - 0.4,
        colorClass: 'text-amber-300', life: 700, maxLife: 700
      });
    }
  }

  function spawnCreep(typeKey) {
    const conf = ENEMIES[typeKey];
    const [sr, sc] = layout.path[0];
    g.creeps.push({
      id: newId(), typeKey,
      row: sr, col: sc,
      hp: conf.hp, maxHp: conf.hp,
      speed: conf.speed, waypointIdx: 0,
      freezeTimer: 0, slowPercent: 0,
      burning: 0, burnTick: 0
    });
  }

  function fireTower(tower, dt) {
    const conf = TOWERS[tower.typeId];
    if (conf.type === 'BUFF') return;
    const id = tower.id;
    g.fireCooldowns[id] = (g.fireCooldowns[id] || 0) - dt;
    if (g.fireCooldowns[id] > 0) return;

    const stats = getEffectiveStats(tower);
    const { rateMul, damageMul } = getNitroBuff(tower, g.towers);
    const target = findTarget(tower, towerTargetingMode(tower));
    if (!target) return;

    g.fireCooldowns[id] = stats.cooldown * rateMul;
    const damage = (stats.damage || 0) * damageMul;
    const color = PROJ_COLOR[tower.typeId];

    if (tower.typeId === 'CHAIN') {
      const hit = [target];
      let last = target;
      for (let i = 0; i < stats.bounces; i++) {
        const next = g.creeps
          .filter(c => c.hp > 0 && !hit.includes(c) &&
            Math.hypot(c.row - last.row, c.col - last.col) < 2.5)
          .sort((a, b) =>
            Math.hypot(a.row - last.row, a.col - last.col) -
            Math.hypot(b.row - last.row, b.col - last.col))[0];
        if (!next) break;
        hit.push(next); last = next;
      }
      g.projectiles.push({
        id: newId(), kind: 'CHAIN', row: tower.row, col: tower.col,
        range: stats.range, lines: hit.map(c => ({ row: c.row, col: c.col })),
        life: 220, maxLife: 220
      });
      hit.forEach(c => damageCreep(c, damage));
    } else if (tower.typeId === 'SPLASH') {
      g.projectiles.push({
        id: newId(), kind: 'SPLASH', color,
        row: tower.row, col: tower.col,
        targetRow: target.row, targetCol: target.col,
        damage, splashRadius: stats.splashRadius, napalm: stats.napalm,
        speed: 7, life: 9999, maxLife: 9999
      });
    } else if (tower.typeId === 'SNIPER') {
      damageCreep(target, damage);
      if (stats.lance) {
        const dx = target.col - tower.col, dy = target.row - tower.row;
        const len = Math.hypot(dx, dy) || 1;
        g.projectiles.push({
          id: newId(), kind: 'LANCE', row: tower.row, col: tower.col,
          angle: Math.atan2(dy, dx), length: stats.range,
          life: 250, maxLife: 250
        });
        g.creeps.forEach(c => {
          if (c === target || c.hp <= 0) return;
          const cdx = c.col - tower.col, cdy = c.row - tower.row;
          if (Math.hypot(cdx, cdy) > stats.range) return;
          const cross = Math.abs(dx * cdy - dy * cdx) / len;
          const dot = (cdx * dx + cdy * dy) / len;
          if (cross < 0.45 && dot > 0) damageCreep(c, damage);
        });
      } else {
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color,
          row: tower.row, col: tower.col,
          targetRow: target.row, targetCol: target.col,
          speed: 18, life: 9999, maxLife: 9999
        });
      }
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
        id: newId(), kind: 'BULLET', color,
        row: tower.row, col: tower.col,
        targetRow: target.row, targetCol: target.col,
        speed: 14, life: 9999, maxLife: 9999
      });
    } else {
      // DART
      damageCreep(target, damage);
      if (stats.pierce) {
        const second = g.creeps.find(c =>
          c !== target && c.hp > 0 &&
          Math.hypot(c.row - target.row, c.col - target.col) < 1.6);
        if (second) damageCreep(second, damage);
      }
      g.projectiles.push({
        id: newId(), kind: 'BULLET', color,
        row: tower.row, col: tower.col,
        targetRow: target.row, targetCol: target.col,
        speed: 16, life: 9999, maxLife: 9999
      });
    }
  }

  // ----- main loop -----
  useEffect(() => {
    let raf, last = performance.now();
    function loop(now) {
      raf = requestAnimationFrame(loop);
      const real = Math.min(now - last, 100);
      last = now;
      if (g.gameState !== 'PLAYING') { render(); return; }
      const dt = real * g.speed;

      // Spawning
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

      // Move creeps + burn ticks
      g.creeps.forEach(c => {
        if (c.hp <= 0) return;
        moveCreep(c, dt);
        if (c.burning > 0) {
          c.burning -= dt;
          c.burnTick -= dt;
          if (c.burnTick <= 0) { damageCreep(c, 8); c.burnTick = 400; }
        }
        g.burnZones.forEach(z => {
          if (Math.hypot(c.row - z.row, c.col - z.col) < z.radius) {
            c.burning = Math.max(c.burning, 800);
          }
        });
      });

      // Leak detection
      g.creeps.forEach(c => {
        if (c.reachedEnd) { g.lives -= 1; c.hp = -1; }
      });
      g.creeps = g.creeps.filter(c => c.hp > 0 && !c.reachedEnd);

      // Towers fire
      g.towers.forEach(t => fireTower(t, dt));

      // Projectiles
      g.projectiles.forEach(p => {
        p.life -= dt;
        if (p.kind === 'BULLET' || p.kind === 'SPLASH') {
          const dr = p.targetRow - p.row;
          const dc = p.targetCol - p.col;
          const d = Math.hypot(dr, dc);
          const step = (p.speed || 12) * (dt / 1000);
          if (d <= step) {
            if (p.kind === 'SPLASH') {
              g.creeps.forEach(c => {
                if (Math.hypot(c.row - p.targetRow, c.col - p.targetCol) <= p.splashRadius) {
                  damageCreep(c, p.damage);
                }
              });
              g.particles.push({
                id: newId(), row: p.targetRow, col: p.targetCol,
                radius: p.splashRadius, color: 'rgba(239,68,68,0.55)',
                life: 320, maxLife: 320
              });
              if (p.napalm) {
                g.burnZones.push({
                  id: newId(), row: p.targetRow, col: p.targetCol,
                  radius: p.splashRadius * 0.7, life: 3000, maxLife: 3000
                });
              }
            }
            p.life = 0;
          } else {
            p.row += (dr / d) * step;
            p.col += (dc / d) * step;
          }
        }
      });
      g.projectiles = g.projectiles.filter(p => p.life > 0);

      // Effects
      g.floaters.forEach(f => f.life -= dt);
      g.floaters = g.floaters.filter(f => f.life > 0);
      g.particles.forEach(p => p.life -= dt);
      g.particles = g.particles.filter(p => p.life > 0);
      g.burnZones.forEach(z => z.life -= dt);
      g.burnZones = g.burnZones.filter(z => z.life > 0);

      // Wave complete
      if (g.waveInProgress && g.spawnQueue.length === 0 && g.creeps.length === 0) {
        g.waveInProgress = false;
        g.credits += 50;
        g.score += 100;
        if (g.wave >= totalWaves) g.gameState = 'WON';
      }

      // Lose
      if (g.lives <= 0) { g.lives = 0; g.gameState = 'LOST'; }

      // Vocab challenge cadence
      g.challengeTimer -= dt;
      if (g.challengeTimer <= 0 && !challengeActiveRef.current && g.waveInProgress) {
        const v = vocab[Math.floor(Math.random() * vocab.length)];
        challengeActiveRef.current = true;
        setChallenge(v);
        setChallengeInput('');
        setChallengeTimeLeft(8);
        g.challengeTimer = 16000 + Math.random() * 6000;
      }

      render();
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Vocab countdown
  useEffect(() => {
    if (!challenge) return;
    if (challengeTimeLeft <= 0) {
      challengeActiveRef.current = false;
      setChallenge(null);
      return;
    }
    const t = setTimeout(() => setChallengeTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [challenge, challengeTimeLeft]);

  // ----- handlers -----
  function handleStartWave() {
    if (g.waveInProgress || g.gameState !== 'PLAYING') return;
    if (g.wave >= totalWaves) return;
    const data = gameConfig.waves[g.wave];
    g.spawnQueue = data.map(w => ({ ...w }));
    g.spawnTimer = 9999; // first spawn immediately
    g.wave += 1;
    g.waveInProgress = true;
    g.challengeTimer = 8000;
    render();
  }

  function handleCellClick(r, c, isPath) {
    if (activeBuilder) {
      if (isPath) return;
      if (g.towers.some(t => t.row === r && t.col === c)) return;
      const conf = TOWERS[activeBuilder.typeId];
      if (g.credits < conf.cost) return;
      g.credits -= conf.cost;
      g.towers.push({
        id: newId(), typeId: activeBuilder.typeId,
        row: r, col: c, upgrades: {}
      });
      setActiveBuilder(null);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
    } else {
      setSelectedTowerId(null);
    }
  }

  function handleCellHover(r, c, isPath) {
    if (!activeBuilder) {
      if (hoverCell.row !== -1) setHoverCell({ row: -1, col: -1, valid: false });
      return;
    }
    const valid = !isPath && !g.towers.some(t => t.row === r && t.col === c);
    setHoverCell({ row: r, col: c, valid });
  }

  function handleTowerClick(id) {
    if (activeBuilder) { setActiveBuilder(null); return; }
    setSelectedTowerId(id);
    setShowUpgrade(true);
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
    setShowUpgrade(false);
    render();
  }

  function handleUseBolt() {
    if (g.bolts <= 0) return;
    g.bolts -= 1;
    g.creeps.forEach(c => damageCreep(c, 80));
    g.particles.push({
      id: newId(), row: layout.rows / 2, col: layout.cols / 2,
      radius: Math.max(layout.rows, layout.cols),
      color: 'rgba(253,224,71,0.4)', life: 450, maxLife: 450
    });
    render();
  }

  function handleChallengeSubmit(e) {
    e.preventDefault();
    if (!challenge) return;
    if (challengeInput.trim().toLowerCase() === challenge.word.toLowerCase()) {
      g.bolts += 1;
      g.score += 25;
      g.floaters.push({
        id: newId(), text: '⚡ +1', row: 1, col: layout.cols / 2,
        colorClass: 'text-yellow-300', life: 1500, maxLife: 1500
      });
    }
    challengeActiveRef.current = false;
    setChallenge(null);
    setChallengeInput('');
  }

  function handleReset() {
    Object.assign(g, {
      credits: 200, lives: 20, wave: 0, score: 0, bolts: 0,
      gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, challengeTimer: 0
    });
    challengeActiveRef.current = false;
    setSelectedTowerId(null);
    setShowUpgrade(false);
    setActiveBuilder(null);
    setChallenge(null);
    render();
  }

  // ----- render -----
  const selectedTower = g.towers.find(t => t.id === selectedTowerId) || null;

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-3">
        <HUD
          credits={g.credits}
          lives={g.lives}
          wave={g.wave}
          totalWaves={totalWaves}
          score={g.score}
          bolts={g.bolts}
          speed={g.speed}
          gameState={g.gameState}
          waveInProgress={g.waveInProgress}
          creepCount={g.creeps.length}
          onStartWave={handleStartWave}
          onSetSpeed={(s) => { g.speed = s; render(); }}
          onUseBolt={handleUseBolt}
        />

        <div className="flex justify-center overflow-auto">
          <GameBoard
            layout={layout}
            towers={g.towers}
            creeps={g.creeps}
            projectiles={g.projectiles}
            floaters={g.floaters}
            particles={g.particles}
            burnZones={g.burnZones}
            decorations={g.decorations}
            selectedTowerId={selectedTowerId}
            hoveredTowerId={hoveredTowerId}
            activeBuilder={activeBuilder}
            hoverCell={hoverCell}
            onCellClick={handleCellClick}
            onCellHover={handleCellHover}
            onCellLeave={() => setHoverCell({ row: -1, col: -1, valid: false })}
            onTowerClick={handleTowerClick}
          />
        </div>

        <BuildMenu
          allowedTowers={gameConfig.allowedTowers}
          credits={g.credits}
          activeBuilder={activeBuilder}
          onSelect={(b) => setActiveBuilder(prev => prev?.typeId === b.typeId ? null : b)}
        />
      </div>

      {showUpgrade && selectedTower && (
        <UpgradePanel
          tower={selectedTower}
          credits={g.credits}
          onUpgrade={handleUpgrade}
          onSell={handleSell}
          onClose={() => { setShowUpgrade(false); setSelectedTowerId(null); }}
        />
      )}

      <VocabChallenge
        challenge={challenge}
        input={challengeInput}
        onInputChange={setChallengeInput}
        onSubmit={handleChallengeSubmit}
        timeLeft={challengeTimeLeft}
      />

      {g.gameState !== 'PLAYING' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
            <div className="text-6xl mb-3">{g.gameState === 'WON' ? '🏆' : '💀'}</div>
            <div className="text-3xl font-black text-slate-800 mb-1">
              {g.gameState === 'WON' ? 'Victory!' : 'Defeat'}
            </div>
            <div className="text-slate-500 mb-1">
              {g.gameState === 'WON'
                ? 'You defended every wave!'
                : 'Too many doughnuts got through.'}
            </div>
            <div className="text-slate-700 font-bold mb-5">
              Final score: <span className="text-indigo-600">{g.score}</span>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-black transition shadow"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
</file>

</files>
