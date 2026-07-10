// src/components/towerdefense/useGameEngine.js
import { useEffect } from 'react';
import { TOWERS, ENEMIES, getEffectiveStats } from './gameData';

const TILE_SPEED = 2.0;

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

export function useGameEngine({ 
  gRef, render, layout, engineConfig, 
  onTriggerChallenge, challengeActiveRef, autoPlayRef 
}) {

  useEffect(() => {
    let raf;
    let last = performance.now();
    
    // STRICT FIXED TIMESTEP (30 FPS)
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

    function findTarget(tower, mode, stats) {
      const range = stats.range;
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

      const stats = getEffectiveStats(tower, g.towers);
      const target = findTarget(tower, towerTargetingMode(tower), stats);
      if (!target) return;

      g.fireCooldowns[id] = stats.cooldown;
      let damage = stats.damage || 0;
      const color = PROJ_COLOR[tower.typeId];

      if (tower.typeId === 'DART') {
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
      if (elapsed < fpsInterval) return;
      if (elapsed > 1000) {
          last = now;
          return;
      }

      last = now - (elapsed % fpsInterval);
      
      if (g.gameState !== 'PLAYING') { render(); return; }
      const dt = FIXED_DT * g.speed;

      // ==========================================
      // OVERHAULED SIMULTANEOUS SPAWN LOGIC
      // ==========================================
      if (g.waveInProgress && g.spawnQueue.length > 0) {
        // We iterate backwards so we can safely splice empty groups out of the queue
        for (let i = g.spawnQueue.length - 1; i >= 0; i--) {
          const group = g.spawnQueue[i];
          
          // Initialize an independent timer for this enemy group if it doesn't have one yet.
          if (group.timer === undefined) {
            // Setting it to 'interval' forces an immediate spawn on frame 1.
            // Subtracting (i * 200) slightly staggers the groups so 4 enemies don't perfectly overlap on the exact same pixel.
            // Subtracting 'delay' allows you to hold back certain spawns natively in wavePresets.js if you ever want to.
            group.timer = group.interval - (i * 200) - (group.delay || 0);
          }
          
          group.timer += dt;
          
          if (group.timer >= group.interval) {
            spawnCreep(group.type);
            group.count--;
            group.timer = 0;
            
            // If this specific enemy group is exhausted, remove it from the active queue
            if (group.count <= 0) {
              g.spawnQueue.splice(i, 1);
            }
          }
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
        
        if (!engineConfig.generateInfiniteWave && g.wave >= engineConfig.waves.length) {
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
  }, [gRef, render, layout, engineConfig, onTriggerChallenge, challengeActiveRef, autoPlayRef]);
}