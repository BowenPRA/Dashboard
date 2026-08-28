// src/components/towerdefense/useGameEngine.js
import { useEffect, useRef } from 'react';
import { TOWERS, ENEMIES, distSq, getStatsMap, enemySkin } from './gameData';

const TILE_SPEED = 2.0;

// Damage numbers are cosmetic, and an unbounded stream of them is the single
// biggest source of DOM churn in a heavy wave — twenty towers hitting two
// hundred creeps produces hundreds of nodes a second. Past this many live
// floaters new damage numbers are dropped; kill rewards still always show.
const MAX_FLOATERS = 40;
const MAX_PARTICLES = 60;

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

/** Drops dead entries without allocating a new array every frame. */
function compact(arr, keep) {
  let w = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (keep(item)) arr[w++] = item;
  }
  arr.length = w;
}

export function useGameEngine({
  gRef, render, layout, engineConfig,
  onTriggerChallenge, onAutoStartWave, challengeActiveRef, autoPlayRef
}) {
  // The loop must survive re-renders. `render` and `onTriggerChallenge` are
  // recreated on every render by any caller that doesn't memoise them, and with
  // them in the dependency array the effect tore the rAF loop down and rebuilt
  // every closure in it thirty times a second — while resetting the fixed-step
  // accumulator each time. Latest-value refs keep the callbacks current without
  // making the loop's identity depend on them.
  const renderRef = useRef(render);
  const challengeRef = useRef(onTriggerChallenge);
  const autoStartRef = useRef(onAutoStartWave);
  useEffect(() => {
    renderRef.current = render;
    challengeRef.current = onTriggerChallenge;
    autoStartRef.current = onAutoStartWave;
  }, [render, onTriggerChallenge, onAutoStartWave]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    
    // STRICT FIXED TIMESTEP (30 FPS)
    const FPS_CAP = 30;
    const fpsInterval = 1000 / FPS_CAP;
    const FIXED_DT = fpsInterval;

    const g = gRef.current;
    const newId = () => g.nextId++;
    const render = () => renderRef.current();
    const onTriggerChallenge = () => challengeRef.current();
    let frameNo = 0;

    // Per-unit difficulty, supplied by the unit's arcadeConfig. A missing or
    // partial object must behave exactly like the pre-scaling game, so every
    // multiplier falls back to 1.
    const D = engineConfig.difficulty || {};
    const HP_MUL     = Number(D.hpMul)     > 0 ? Number(D.hpMul)     : 1;
    const SPEED_MUL  = Number(D.speedMul)  > 0 ? Number(D.speedMul)  : 1;
    const REWARD_MUL = Number(D.rewardMul) > 0 ? Number(D.rewardMul) : 1;
    const SCORE_MUL  = Number(D.scoreMul)  > 0 ? Number(D.scoreMul)  : 1;

    // The enemy tribe painted over the role slots for this arena (see gameData's
    // ENEMY_SKINS). Stats always come from ENEMIES[slot]; the tribe only changes
    // the name, artwork and on-board size, so every theme is exactly as hard.
    const TRIBE = engineConfig.tribeId || 'INSECT';

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

    // Reused across every tower, every frame: the in-range candidate list used
    // to be a fresh `filter` allocation per tower per frame.
    const pool = [];

    // Density is only needed by two upgraded towers, is identical for all of
    // them within a frame, and used to be an O(creeps²) scan per tower. It is
    // computed lazily at most once per frame over a coarse grid instead.
    const DENSITY_CELL = 1.8;
    let densityFrame = -1;
    let densityGrid = new Map();
    function densityAt(c) {
      if (densityFrame !== frameNo) {
        densityFrame = frameNo;
        densityGrid.clear();
        for (const x of g.creeps) {
          if (x.hp <= 0) continue;
          const key = `${Math.floor(x.row / DENSITY_CELL)}_${Math.floor(x.col / DENSITY_CELL)}`;
          densityGrid.set(key, (densityGrid.get(key) || 0) + 1);
        }
      }
      return densityGrid.get(`${Math.floor(c.row / DENSITY_CELL)}_${Math.floor(c.col / DENSITY_CELL)}`) || 0;
    }

    function findTarget(tower, mode, stats) {
      const rangeSq = stats.range * stats.range;
      pool.length = 0;
      for (const c of g.creeps) {
        if (c.hp > 0 && !c.reachedEnd && distSq(c.row, c.col, tower.row, tower.col) <= rangeSq) {
          pool.push(c);
        }
      }
      if (pool.length === 0) return null;

      let best = pool[0];
      switch (mode) {
        case 'STRONG':
          for (const c of pool) if (c.hp > best.hp) best = c;
          return best;
        case 'LOWEST':
          for (const c of pool) if (c.hp < best.hp) best = c;
          return best;
        case 'ARMOR':
          for (const c of pool) if ((c.damageReduction || 0) > (best.damageReduction || 0)) best = c;
          return best;
        case 'FRESH': {
          // Prefer un-slowed creeps; among those, the one furthest along.
          let bestFresh = null, bestFreshD = -Infinity, bestD = -Infinity;
          for (const c of pool) {
            const d = distAlong(c);
            if (c.freezeTimer <= 0 && d > bestFreshD) { bestFreshD = d; bestFresh = c; }
            if (d > bestD) { bestD = d; best = c; }
          }
          return bestFresh || best;
        }
        case 'DENSEST': {
          let bestN = -1;
          for (const c of pool) {
            const n = densityAt(c);
            if (n > bestN) { bestN = n; best = c; }
          }
          return best;
        }
        default: {
          let bestD = -Infinity;
          for (const c of pool) {
            const d = distAlong(c);
            if (d > bestD) { bestD = d; best = c; }
          }
          return best;
        }
      }
    }

    function damageCreep(c, dmg, ignoreArmor = false, flatArmorPen = 0) {
      if (c.hp <= 0) return;
      const shred = c.activeArmorShred || 0;
      const currentArmor = Math.max(0, (c.damageReduction || 0) - shred);
      const reduction = ignoreArmor ? 0 : Math.max(0, currentArmor - flatArmorPen);
      const actualDmg = Math.max(1, dmg - reduction);
      const d = Math.round(actualDmg);
      
      c.hp -= d;

      if (d > 0 && g.floaters.length < MAX_FLOATERS) {
        g.floaters.push({
          id: newId(), text: `-${d}`, row: c.row, col: c.col,
          colorClass: 'text-white font-black', life: 500, maxLife: 500
        });
      }
      if (c.hp <= 0) {
        const conf = ENEMIES[c.typeKey];
        let reward = Math.round(conf.reward * REWARD_MUL);
        if (g.wave >= 51) reward = Math.floor(reward / 4);
        g.credits += reward;
        g.score += Math.round(conf.reward * 10 * SCORE_MUL);

        if (g.particles.length < MAX_PARTICLES) {
          g.particles.push({
            id: newId(), row: c.row, col: c.col, radius: 0.6,
            color: 'rgba(255,200,0,0.55)', life: 400, maxLife: 400
          });
        }
        if (reward > 0 && g.floaters.length < MAX_FLOATERS) {
          g.floaters.push({
            id: newId(), text: `+$${reward}`, row: c.row, col: c.col - 0.4,
            colorClass: 'text-[#FFC800] font-black', life: 700, maxLife: 700
          });
        }
      }
    }

    // One creep object, with the active tribe's skin (visual + radius) baked in.
    // Shared by the wave spawner and the Broodmother's add-spawns so every body
    // on the board — including summoned ones — wears the arena's tribe.
    function makeCreep(typeKey, opts = {}) {
      const conf = ENEMIES[typeKey];
      const skin = enemySkin(typeKey, TRIBE);
      const hp = Math.max(1, Math.round(conf.hp * HP_MUL));
      return {
        id: newId(), typeKey,
        visual: skin.visual, radius: skin.radius,
        row: opts.row, col: opts.col,
        hp, maxHp: hp,
        speed: conf.speed * SPEED_MUL * (opts.speedMul || 1),
        waypointIdx: opts.waypointIdx || 0, angle: opts.angle || 0,
        freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0,
        damageReduction: conf.damageReduction || 0,
        burnStacks: [], spawnTimer: opts.spawnTimer || 0
      };
    }

    function spawnCreep(typeKey) {
      const [sr, sc] = layout.path[0];
      const [nr, nc] = layout.path.length > 1 ? layout.path[1] : [sr, sc];
      const initAngle = Math.atan2(nr - sr, nc - sc) * (180 / Math.PI);

      g.creeps.push(makeCreep(typeKey, {
        row: sr, col: sc, angle: initAngle,
        spawnTimer: typeKey === 'GIANT_ANT' ? 2000 : 0
      }));
      // The board only re-renders creeps when the roster changes; movement is
      // applied straight to the DOM. See GameBoard's creep layer.
      g.creepsVersion++;
    }

    function fireTower(tower, logicDt, statsMap) {
      const conf = TOWERS[tower.typeId];
      if (conf.type === 'BUFF') return;
      // The unicorn never auto-fires — it is aimed by hand (or by Auto-Prism),
      // handled in the charge block of the main loop, not here.
      if (conf.type === 'UNICORN') return;
      const id = tower.id;
      g.fireCooldowns[id] = (g.fireCooldowns[id] || 0) - logicDt;
      if (g.fireCooldowns[id] > 0) return;

      const stats = statsMap.get(tower.id);
      if (!stats) return;
      const target = findTarget(tower, towerTargetingMode(tower), stats);
      if (!target) return;

      g.fireCooldowns[id] = stats.cooldown;
      let damage = stats.damage || 0;
      const color = PROJ_COLOR[tower.typeId];

      if (tower.typeId === 'DART') {
        damageCreep(target, damage);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && distSq(c.row, c.col, target.row, target.col) < 2.56);
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
        // Nearest un-hit creep per bounce, found in one scan. This used to
        // allocate a filtered array and fully sort it for every bounce.
        for (let i = 0; i < stats.bounces; i++) {
          let next = null;
          let bestD = 6.25; // 2.5² — the chain's reach
          for (const c of g.creeps) {
            if (c.hp <= 0 || hit.includes(c)) continue;
            const d = distSq(c.row, c.col, last.row, last.col);
            if (d < bestD) { bestD = d; next = c; }
          }
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
            if (distSq(c.row, c.col, target.row, target.col) < 2.56) {
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
            c !== target && c.hp > 0 && distSq(c.row, c.col, target.row, target.col) < 2.56);
          if (second) damageCreep(second, damage);
        }
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color, row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, speed: 16, life: 9999, maxLife: 9999
        });
      }
    }

    // ---- Unicorn: the aimed rainbow lance ----
    // A single beam from the horn, through the aim point, out to the far edge of
    // the board. Everything within `beamWidth` of that infinite line takes full,
    // armour-ignoring damage. Twin Rainbow adds a second beam at 90° and chills.
    function emitBeam(uni, stats, angle) {
      const ux = Math.cos(angle), uy = Math.sin(angle);
      const width = stats.beamWidth;
      const dmg = stats.damage || 0;
      for (const c of g.creeps) {
        if (c.hp <= 0) continue;
        const vx = c.col - uni.col, vy = c.row - uni.row;
        const along = vx * ux + vy * uy;         // distance along the beam
        if (along < -0.6) continue;               // strictly behind the horn
        const perp = Math.abs(vx * uy - vy * ux); // distance off the line
        if (perp <= width) {
          damageCreep(c, dmg, true, 0);
          if (stats.twin) {                       // Twin Rainbow also chills
            c.freezeTimer = Math.max(c.freezeTimer, 1400);
            c.slowPercent = Math.max(c.slowPercent, 0.5);
          }
        }
      }
      const length = Math.hypot(layout.rows, layout.cols) + 2;
      g.projectiles.push({
        id: newId(), kind: 'RAINBOW_BEAM',
        row: uni.row, col: uni.col, angle, length, width,
        life: 430, maxLife: 430
      });
    }

    function fireUnicornBeam(uni, stats, aimRow, aimCol) {
      const angle = Math.atan2(aimRow - uni.row, aimCol - uni.col);
      emitBeam(uni, stats, angle);
      if (stats.twin) emitBeam(uni, stats, angle + Math.PI / 2);
      if (g.particles.length < MAX_PARTICLES) {
        g.particles.push({
          id: newId(), row: uni.row, col: uni.col, radius: 1.4,
          color: 'rgba(236,72,153,0.5)', life: 420, maxLife: 420
        });
      }
      g.unicornCharge = 0;
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
      frameNo++;

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
              g.creeps.push(makeCreep('ANT', {
                row: c.row + rOff, col: c.col + cOff,
                waypointIdx: c.waypointIdx, angle: c.angle, speedMul: 1.15
              }));
            }
            g.creepsVersion++;
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

      for (const c of g.creeps) if (c.reachedEnd) { g.lives -= 1; c.hp = -1; }
      const before = g.creeps.length;
      compact(g.creeps, (c) => c.hp > 0 && !c.reachedEnd);
      if (g.creeps.length !== before) g.creepsVersion++;

      // Adjacency and Nitro auras make each tower's stats depend on every other
      // tower, so they are resolved once per frame (and cached across frames
      // until the board actually changes) rather than per tower.
      const statsMap = getStatsMap(g.towers, g.towersVersion || 0);
      for (const t of g.towers) fireTower(t, dt, statsMap);

      // Unicorn charge + fire. It builds charge every frame it exists; when full
      // it fires on the player's aim request, or by itself with Auto-Prism.
      const uni = g.towers.find(t => t.typeId === 'UNICORN');
      if (uni) {
        const uStats = statsMap.get(uni.id);
        if (uStats) {
          const full = uStats.chargeTime || 1;
          if (g.unicornCharge < full) g.unicornCharge = Math.min(full, g.unicornCharge + dt);
          const ready = g.unicornCharge >= full;
          if (ready && g.unicornFire) {
            fireUnicornBeam(uni, uStats, g.unicornFire.row, g.unicornFire.col);
            g.unicornFire = null;
          } else if (ready && uStats.autoAim) {
            // Aim down the densest cluster of live creeps.
            let target = null, bestN = 0;
            for (const c of g.creeps) {
              if (c.hp <= 0) continue;
              const n = densityAt(c);
              if (n > bestN) { bestN = n; target = c; }
            }
            if (target) fireUnicornBeam(uni, uStats, target.row, target.col);
          }
        }
      } else if (g.unicornCharge || g.unicornFire) {
        // Unicorn sold — clear its state so a rebuild starts from empty.
        g.unicornCharge = 0;
        g.unicornFire = null;
      }

      g.projectiles.forEach(p => {
        p.life -= dt;
        if (p.kind === 'BULLET' || p.kind === 'SPLASH' || p.kind === 'DART_PROJ' || p.kind === 'SNIPER_PROJ') {
          const dr = p.targetRow - p.row;
          const dc = p.targetCol - p.col;
          const d = Math.hypot(dr, dc);
          const step = (p.speed || 12) * (dt / 1000);
          
          if (d <= step) {
            if (p.kind === 'SPLASH') {
              const splashSq = p.splashRadius * p.splashRadius;
              g.creeps.forEach(c => {
                if (distSq(c.row, c.col, p.targetRow, p.targetCol) <= splashSq) {
                    damageCreep(c, p.damage);
                    if (p.napalm) {
                        if (!c.burnStacks) c.burnStacks = [];
                        c.burnStacks.push({ life: 4000, tick: 400 });
                    }
                }
              });
              if (g.particles.length < MAX_PARTICLES) {
                g.particles.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius, color: 'rgba(234,43,43,0.6)', life: 320, maxLife: 320 });
              }
              if (p.napalm) g.burnZones.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius * 0.7, life: 4000, maxLife: 4000 });
            }
            p.life = 0;
          } else {
            p.row += (dr / d) * step; p.col += (dc / d) * step;
          }
        }
      });
      // In-place: these four ran `filter` every frame, allocating four arrays
      // per tick and forcing React to see four new prop identities.
      compact(g.projectiles, (p) => p.life > 0);
      compact(g.floaters, (f) => (f.life -= dt) > 0);
      compact(g.particles, (p) => (p.life -= dt) > 0);
      compact(g.burnZones, (z) => (z.life -= dt) > 0);

      if (g.waveInProgress && g.spawnQueue.length === 0 && g.creeps.length === 0) {
        g.waveInProgress = false;
        g.credits += Math.round(50 * REWARD_MUL);
        g.score += Math.round(100 * SCORE_MUL);

        if (!engineConfig.generateInfiniteWave && g.wave >= engineConfig.waves.length) {
          g.gameState = 'WON';
        } else {
          g.autoPlayDelay = 1500;
        }
      }

      if (!g.waveInProgress && g.gameState === 'PLAYING' && autoPlayRef.current) {
        g.autoPlayDelay -= dt;
        if (g.autoPlayDelay <= 0) {
          g.autoPlayDelay = 9999;
          // Called directly. This used to set a `triggerNextWave` flag that an
          // effect watched via a mutable ref field in its dependency array —
          // which only worked because the board happened to re-render every
          // frame anyway.
          autoStartRef.current?.();
        }
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
    // render/onTriggerChallenge are deliberately absent — they are read through
    // refs above so that an unmemoised caller cannot restart the loop.
  }, [gRef, layout, engineConfig, challengeActiveRef, autoPlayRef]);
}