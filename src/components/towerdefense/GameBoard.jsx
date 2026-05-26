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
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
        <defs>
          <pattern id="td-grid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
            <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke={theme.gridStr} strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#td-grid)" />
      </svg>

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
  const rangeStats = rangeTower ? getEffectiveStats(rangeTower, towers) : null;
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
        const fakeTower = { id: 'temp_builder', typeId: activeBuilder.typeId, row: hoverCell.row, col: hoverCell.col, upgrades: {} };
        const rangeStats = getEffectiveStats(fakeTower, towers);
        const range = rangeStats.range || rangeStats.auraRange || 0;
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