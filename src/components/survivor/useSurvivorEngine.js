// src/components/survivor/useSurvivorEngine.js
//
// =====================================================================
// The Swarm Survivor simulation.
//
// Same shape as the Tower Defense engine (useGameEngine.js) and for the same
// reasons: all mutable game state lives in one ref-held object `g` that the loop
// mutates in place, the loop runs a STRICT FIXED TIMESTEP at 30fps so the maths
// is deterministic regardless of monitor refresh, and React is told to re-render
// through a latest-value ref so the rAF loop is never torn down and rebuilt.
//
// Where it differs: Survivor draws to a canvas, so `render()` here does not
// reconcile two hundred DOM nodes — the draw pass reads `g` directly. That is
// what makes the density the genre needs affordable.
// =====================================================================

import { useEffect, useRef } from 'react';
import {
  WORLD, STEP_MS, LIMITS, SURVIVOR_ENEMIES, timeScale, RUN,
  SPAWN_PHASES, SWARM_EVENT, WEAPONS, weaponStats, xpForLevel, MAX_WEAPON_LEVEL,
} from './survivorData';

/** Drops dead entries in place, without allocating a new array every frame. */
function compact(arr, keep) {
  let w = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (keep(item)) arr[w++] = item;
  }
  arr.length = w;
}

const TAU = Math.PI * 2;

// ---------------------------------------------------------------------
// Construction
// ---------------------------------------------------------------------

/**
 * A fresh run.
 *
 * `hero` is the chosen HEROES entry, `loadout` the resolved loadoutEffects, and
 * `difficulty` the unit's tier multipliers straight from unitDifficulty.js — the
 * very same object Tower Defense hands its engine.
 */
export function createRun({ hero, loadout, difficulty = {} }) {
  const maxHp = hero.hp + (hero.hpBonus || 0) + loadout.hpBonus;
  const g = {
    t: 0,
    state: 'PLAYING',
    outcome: null,

    hero: {
      typeId: hero.typeId,
      x: WORLD.width / 2,
      y: WORLD.height / 2,
      hp: maxHp,
      maxHp,
      baseSpeed: hero.speed * (1 + (hero.speedBonus || 0)) * loadout.speedMul,
      speedMul: 1,
      damageMul: 1,
      hasteMul: 1,
      pickupR: 92 * (1 + (hero.pickupBonus || 0)) * loadout.pickupMul,
      xpMul: 1,
      armor: (hero.armorBonus || 0) + loadout.armor,
      regen: 0,
      revives: loadout.revives,
      // How many times each PERK has been taken, so the level-up roll can stop
      // offering one that is maxed out.
      perks: {},
      level: 1,
      xp: 0,
      xpNext: xpForLevel(1),
      iframe: 0,
      facing: 1,
      hurtFlash: 0,
      walkPhase: 0,
    },

    // Index 0 is always the hero's own weapon; 1.. are recruited companions,
    // drawn orbiting the hero.
    weapons: [{ id: hero.weapon, level: 1, cd: 0, charge: 0, sweep: -1, sweepFrom: 0, beamTick: 0 }],

    enemies: [],
    bullets: [],
    gems: [],
    pops: [],
    fx: [],

    boss: null,
    bossSpawned: false,
    eliteIdx: 0,
    phaseIdx: 0,
    spawnTimer: 900,
    swarmTimer: SWARM_EVENT.firstAtMs,

    kills: 0,
    score: 0,
    scoreFrac: 0,
    pendingLevels: 0,
    nextId: 1,

    cam: { x: WORLD.width / 2, y: WORLD.height / 2 },
    shake: 0,

    difficulty: {
      hpMul: Number(difficulty.hpMul) > 0 ? Number(difficulty.hpMul) : 1,
      speedMul: Number(difficulty.speedMul) > 0 ? Number(difficulty.speedMul) : 1,
      rewardMul: Number(difficulty.rewardMul) > 0 ? Number(difficulty.rewardMul) : 1,
      scoreMul: Number(difficulty.scoreMul) > 0 ? Number(difficulty.scoreMul) : 1,
    },
  };

  // Head Start: begin a level (or two) up, with the free picks already applied
  // as raw levels on the hero weapon — buying power, not buying choices.
  for (let i = 1; i < loadout.startLevel; i++) {
    g.hero.level += 1;
    g.hero.xpNext = xpForLevel(g.hero.level);
    if (g.weapons[0].level < MAX_WEAPON_LEVEL) g.weapons[0].level += 1;
  }

  return g;
}

// ---------------------------------------------------------------------
// Mutations the UI performs between frames
// ---------------------------------------------------------------------

/**
 * Applies one chosen level-up card.
 *
 * Every level also mends a little. That is the run's only steady healing, and it
 * is deliberately tied to LEVELS rather than to time: levels come from gems,
 * gems come from kills, and kills come from standing where the fight is. So the
 * way to stay alive is to engage — which is the behaviour the whole game wants
 * and the opposite of what a pure damage-avoidance loop would teach.
 */
export function applyUpgrade(g, card) {
  const h = g.hero;
  h.hp = Math.min(h.maxHp, h.hp + Math.round(h.maxHp * 0.08));

  if (card.kind === 'RECRUIT') {
    g.weapons.push({ id: card.weaponId, level: 1, cd: 0, charge: 0, sweep: -1, sweepFrom: 0, beamTick: 0 });
  } else if (card.kind === 'WEAPON') {
    const w = g.weapons.find(x => x.id === card.weaponId);
    if (w && w.level < MAX_WEAPON_LEVEL) w.level += 1;
  } else if (card.kind === 'PERK') {
    h.perks[card.perkId] = (h.perks[card.perkId] || 0) + 1;
    switch (card.perkId) {
      case 'MIGHT':   h.damageMul += 0.15; break;
      case 'SWIFT':   h.speedMul  += 0.10; break;
      case 'VITAL':   h.maxHp += 25; h.hp = Math.min(h.maxHp, h.hp + 25); break;
      case 'GREED':   h.pickupR *= 1.35; break;
      case 'FORTUNE': h.xpMul += 0.20; break;
      case 'ARMOR':   h.armor += 2; break;
      case 'HASTE':   h.hasteMul *= 0.90; break;
      case 'MEND':    h.regen += 1; break;
      default: break;
    }
  }
}

/**
 * A plain, immutable read of everything the HUD shows.
 *
 * The simulation lives in a mutable ref for speed, but React screens must not
 * read a ref while rendering — they would be reading a value the loop is free to
 * change underneath them, and nothing would tell React it had changed. So the
 * loop's per-frame commit hands the UI this snapshot instead: ordinary props,
 * ordinary re-render, and the canvas (which is not React) keeps reading the ref
 * directly in its layout effect where that is safe.
 */
export function hudSnapshot(g) {
  const h = g.hero;
  return {
    hp: h.hp, maxHp: h.maxHp,
    level: h.level, xp: h.xp, xpNext: h.xpNext,
    revives: h.revives,
    t: g.t,
    score: g.score,
    bossSpawned: g.bossSpawned,
    boss: g.boss ? { hp: g.boss.hp, maxHp: g.boss.maxHp } : null,
    squad: g.weapons.map(w => ({ id: w.id, level: w.level })),
  };
}

/** Called by the shell once the level-up modal closes. */
export function resumeAfterLevel(g) {
  g.pendingLevels = Math.max(0, g.pendingLevels - 1);
  g.state = g.pendingLevels > 0 ? 'LEVELUP' : 'PLAYING';
}

// ---------------------------------------------------------------------
// The loop
// ---------------------------------------------------------------------

export function useSurvivorEngine({ gRef, render, inputRef, onLevelUp, onRunEnd, pausedRef }) {
  const renderRef = useRef(render);
  const levelRef = useRef(onLevelUp);
  const endRef = useRef(onRunEnd);
  useEffect(() => {
    renderRef.current = render;
    levelRef.current = onLevelUp;
    endRef.current = onRunEnd;
  }, [render, onLevelUp, onRunEnd]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const g = gRef.current;
    if (!g) return undefined;

    const D = g.difficulty;
    const newId = () => g.nextId++;

    // ---- helpers -------------------------------------------------------

    const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

    function pop(text, x, y, color) {
      if (g.pops.length >= LIMITS.pops) return;
      g.pops.push({ id: newId(), text, x, y, life: 900, max: 900, color });
    }

    function fx(kind, x, y, r, life, color) {
      if (g.fx.length >= LIMITS.fx) return;
      g.fx.push({ id: newId(), kind, x, y, r, life, max: life, color });
    }

    // ---- spawning ------------------------------------------------------

    function spawnAt(slot, x, y, opts = {}) {
      if (g.enemies.length >= LIMITS.enemies && !opts.force) return null;
      const conf = SURVIVOR_ENEMIES[slot];
      // Rank-and-file enemies toughen as the run goes on; the boss and the elites
      // do NOT. They arrive on a schedule, so their health is authored for the
      // exact minute they walk in — letting the clock multiply it as well would
      // stack two curves and turn the finale into a health-bar siege rather than
      // a fight. Only the unit's difficulty tier scales them.
      const scheduled = opts.boss || opts.elite;
      const scale = (scheduled ? 1 : timeScale(g.t)) * D.hpMul * (opts.hpMul || 1);
      const hp = Math.round(conf.hp * scale);
      const e = {
        id: newId(),
        slot,
        x, y,
        hp,
        maxHp: hp,
        speed: conf.speed * D.speedMul * (opts.speedMul || 1),
        damage: conf.damage,
        dr: conf.dr,
        r: conf.r * (opts.sizeMul || 1),
        weave: conf.weave || 0,
        phase: Math.random() * TAU,
        slowT: 0,
        slowPct: 0,
        flash: 0,
        beamHit: -1,
        boss: !!opts.boss,
        elite: !!opts.elite,
        sizeMul: opts.sizeMul || 1,
      };
      g.enemies.push(e);
      return e;
    }

    /** A point on a ring around the hero, just outside what the camera shows. */
    function ringPoint(radius) {
      const a = Math.random() * TAU;
      return {
        x: clamp(g.hero.x + Math.cos(a) * radius, 30, WORLD.width - 30),
        y: clamp(g.hero.y + Math.sin(a) * radius, 30, WORLD.height - 30),
      };
    }

    function livePhase() {
      let idx = 0;
      for (let i = 0; i < SPAWN_PHASES.length; i++) {
        if (g.t >= SPAWN_PHASES[i].atMs) idx = i;
      }
      return SPAWN_PHASES[idx];
    }

    function runSpawns(dt) {
      const phase = livePhase();
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        g.spawnTimer += phase.interval;
        for (let i = 0; i < phase.burst; i++) {
          const slot = phase.pool[Math.floor(Math.random() * phase.pool.length)];
          const p = ringPoint(620 + Math.random() * 160);
          spawnAt(slot, p.x, p.y);
        }
      }

      // The closing ring — the one moment running away is not an option.
      g.swarmTimer -= dt;
      if (g.swarmTimer <= 0) {
        g.swarmTimer += SWARM_EVENT.everyMs;
        const base = Math.random() * TAU;
        for (let i = 0; i < SWARM_EVENT.count; i++) {
          const a = base + (i / SWARM_EVENT.count) * TAU;
          spawnAt(
            i % 4 === 3 ? 'WASP' : 'ANT',
            clamp(g.hero.x + Math.cos(a) * SWARM_EVENT.radius, 30, WORLD.width - 30),
            clamp(g.hero.y + Math.sin(a) * SWARM_EVENT.radius, 30, WORLD.height - 30),
            { force: true }
          );
        }
        pop('THE SWARM CLOSES IN', g.hero.x, g.hero.y - 90, '#f43f5e');
        g.shake = Math.max(g.shake, 10);
      }

      // Mini-bosses on a schedule, then the Broodmother.
      while (g.eliteIdx < RUN.eliteAtMs.length && g.t >= RUN.eliteAtMs[g.eliteIdx]) {
        g.eliteIdx++;
        const p = ringPoint(640);
        spawnAt('QUEEN', p.x, p.y, { force: true, elite: true });
        pop('ELITE INCOMING', g.hero.x, g.hero.y - 110, '#a855f7');
      }

      if (!g.bossSpawned && g.t >= RUN.bossAtMs) {
        g.bossSpawned = true;
        const p = ringPoint(600);
        g.boss = spawnAt('GIANT_ANT', p.x, p.y, { force: true, boss: true, sizeMul: 1.35 });
        pop('THE BROODMOTHER', g.hero.x, g.hero.y - 120, '#ef4444');
        g.shake = 16;
      }
    }

    // ---- damage --------------------------------------------------------

    function hurt(e, rawDamage, opts = {}) {
      if (e.hp <= 0) return;
      const dmg = opts.armorPiercing
        ? rawDamage
        : Math.max(1, rawDamage - e.dr);
      e.hp -= dmg;
      e.flash = 120;
      if (opts.slowPct) {
        // Strongest chill wins rather than stacking, matching the board's Cryo.
        if (opts.slowPct >= e.slowPct || e.slowT <= 0) {
          e.slowPct = opts.slowPct;
          e.slowT = opts.slowMs || 1200;
        }
      }
      if (e.hp <= 0) kill(e);
    }

    function kill(e) {
      const conf = SURVIVOR_ENEMIES[e.slot];
      g.kills += 1;
      g.score += Math.round(conf.score * D.scoreMul);

      const value = Math.max(1, Math.round(conf.xp * D.rewardMul * g.hero.xpMul));
      if (g.gems.length < LIMITS.gems) {
        g.gems.push({
          id: newId(), x: e.x, y: e.y, value,
          vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40,
          big: conf.elite || conf.boss,
        });
      }

      fx('burst', e.x, e.y, e.r * 1.2, 320, conf.boss ? '#ef4444' : '#fbbf24');

      if (e.boss) {
        g.boss = null;
        g.score += Math.round(RUN.victoryScore * D.scoreMul);
        g.state = 'WON';
        g.outcome = 'WON';
        g.shake = 20;
      } else if (e.elite) {
        // An elite drops a health orb — the only healing in the run that is not
        // bought with a level-up, so killing one is always worth the risk.
        g.gems.push({ id: newId(), x: e.x, y: e.y, value: 0, heal: 30, vx: 0, vy: 0, big: true });
      }
    }

    // ---- targeting -----------------------------------------------------

    function nearestEnemy(x, y, range) {
      let best = null;
      let bestD = range * range;
      for (const e of g.enemies) {
        const dx = e.x - x, dy = e.y - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = e; }
      }
      return best;
    }

    function toughestEnemy(x, y, range) {
      let best = null;
      let bestHp = -1;
      const r2 = range * range;
      for (const e of g.enemies) {
        const dx = e.x - x, dy = e.y - y;
        if (dx * dx + dy * dy > r2) continue;
        if (e.hp > bestHp) { bestHp = e.hp; best = e; }
      }
      return best;
    }

    /**
     * The enemy with the most company inside a splash radius.
     *
     * Sampled rather than exhaustive: with two hundred enemies an exact answer is
     * forty thousand distance checks a shot. Twenty candidates finds a crowd
     * reliably enough and costs a fortieth of that.
     */
    function densestEnemy(x, y, range, splash) {
      const r2 = range * range;
      const cands = [];
      for (const e of g.enemies) {
        const dx = e.x - x, dy = e.y - y;
        if (dx * dx + dy * dy <= r2) cands.push(e);
        if (cands.length >= 40) break;
      }
      if (cands.length === 0) return null;
      const sample = cands.length > 20 ? cands.slice(0, 20) : cands;
      const s2 = splash * splash;
      let best = sample[0], bestN = -1;
      for (const c of sample) {
        let n = 0;
        for (const o of cands) {
          const dx = o.x - c.x, dy = o.y - c.y;
          if (dx * dx + dy * dy <= s2) n++;
        }
        if (n > bestN) { bestN = n; best = c; }
      }
      return best;
    }

    // ---- weapons -------------------------------------------------------

    /** Nitro's aura, folded across every companion that carries one. */
    function auraBonus() {
      let fireRate = 0;
      let moveSpeed = 0;
      for (const w of g.weapons) {
        if (w.id !== 'NITRO') continue;
        const s = weaponStats('NITRO', w.level);
        fireRate = Math.max(fireRate, s.fireRate);
        moveSpeed = Math.max(moveSpeed, s.moveSpeed);
      }
      return { fireRate, moveSpeed };
    }

    function addBullet(b) {
      if (g.bullets.length >= LIMITS.bullets) return;
      g.bullets.push(b);
    }

    function fireShot(w, s, origin) {
      const target = s.targeting === 'TOUGHEST'
        ? toughestEnemy(origin.x, origin.y, s.range)
        : nearestEnemy(origin.x, origin.y, s.range);
      if (!target) return false;

      const base = Math.atan2(target.y - origin.y, target.x - origin.x);
      const shots = Math.max(1, s.shots || 1);
      // Extra darts fan out rather than stacking on the same line, so multishot
      // is crowd control instead of a damage multiplier on one body.
      const spread = shots > 1 ? 0.20 : 0;
      for (let i = 0; i < shots; i++) {
        const a = base + (i - (shots - 1) / 2) * spread;
        addBullet({
          id: newId(), kind: w.id,
          x: origin.x, y: origin.y,
          vx: Math.cos(a) * s.speed, vy: Math.sin(a) * s.speed,
          damage: Math.round(s.damage * g.hero.damageMul),
          life: (s.range / s.speed) * 1000 + 250,
          r: w.id === 'SNIPER' ? 7 : 6,
          pierce: s.pierce || 0,
          armorPiercing: !!s.armorPiercing,
          hits: null,
        });
      }
      return true;
    }

    function fireMortar(w, s, origin) {
      const target = densestEnemy(origin.x, origin.y, s.range, s.splash) ||
                     nearestEnemy(origin.x, origin.y, s.range);
      if (!target) return false;
      const dx = target.x - origin.x, dy = target.y - origin.y;
      const dist = Math.hypot(dx, dy) || 1;
      const travel = (dist / s.speed) * 1000;
      addBullet({
        id: newId(), kind: 'SPLASH',
        x: origin.x, y: origin.y,
        vx: dx / travel * 1000, vy: dy / travel * 1000,
        damage: Math.round(s.damage * g.hero.damageMul),
        life: travel,
        r: 9,
        splash: s.splash,
        arc: travel,
        arcT: 0,
      });
      return true;
    }

    function fireNova(w, s, origin) {
      const dmg = Math.round(s.damage * g.hero.damageMul);
      const r2 = s.radius * s.radius;
      let hit = 0;
      for (const e of g.enemies) {
        const dx = e.x - origin.x, dy = e.y - origin.y;
        if (dx * dx + dy * dy <= r2) {
          hurt(e, dmg, { slowPct: s.slowPct, slowMs: s.slowMs });
          hit++;
        }
      }
      fx('nova', origin.x, origin.y, s.radius, 420, '#67e8f9');
      return hit > 0;
    }

    function fireChain(w, s, origin) {
      const first = nearestEnemy(origin.x, origin.y, s.range);
      if (!first) return false;
      const dmg = Math.round(s.damage * g.hero.damageMul);
      const seen = new Set();
      let node = first;
      let from = origin;
      for (let i = 0; i <= s.bounces && node; i++) {
        seen.add(node.id);
        hurt(node, dmg);
        if (g.fx.length < LIMITS.fx) {
          g.fx.push({
            id: newId(), kind: 'arc', color: '#fbbf24', life: 180, max: 180,
            x: from.x, y: from.y, x2: node.x, y2: node.y, r: 0,
          });
        }
        from = node;
        // Next hop: nearest unhit enemy within a short leash of the last one.
        let next = null, bestD = 190 * 190;
        for (const e of g.enemies) {
          if (seen.has(e.id) || e.hp <= 0) continue;
          const dx = e.x - node.x, dy = e.y - node.y;
          const d = dx * dx + dy * dy;
          if (d < bestD) { bestD = d; next = e; }
        }
        node = next;
      }
      return true;
    }

    /** The rainbow lance: charges, then sweeps a full turn cutting everything. */
    function stepBeam(w, s, dt, origin) {
      if (w.sweep >= 0) {
        w.sweep += dt;
        w.beamTick -= dt;
        if (w.beamTick <= 0) {
          w.beamTick += s.tickMs;
          const a = w.sweepFrom + (w.sweep / s.sweepMs) * TAU;
          const ca = Math.cos(a), sa = Math.sin(a);
          const half = s.width / 2;
          const dmg = Math.round(s.damage * g.hero.damageMul);
          for (const e of g.enemies) {
            const dx = e.x - origin.x, dy = e.y - origin.y;
            const along = dx * ca + dy * sa;
            if (along < 0) continue;                    // behind the lance
            const perp = Math.abs(-dx * sa + dy * ca);
            if (perp <= half + e.r) hurt(e, dmg, { armorPiercing: true });
          }
        }
        if (w.sweep >= s.sweepMs) { w.sweep = -1; w.charge = 0; }
        return;
      }
      w.charge += dt / g.hero.hasteMul;
      if (w.charge >= s.chargeMs) {
        w.sweep = 0;
        w.beamTick = 0;
        w.sweepFrom = Math.random() * TAU;
        g.shake = Math.max(g.shake, 6);
      }
    }

    function stepWeapons(dt) {
      const aura = auraBonus();
      const rateMul = g.hero.hasteMul * (1 - Math.min(0.5, aura.fireRate));

      for (let i = 0; i < g.weapons.length; i++) {
        const w = g.weapons[i];
        const conf = WEAPONS[w.id];
        if (!conf || conf.kind === 'AURA') continue;
        const s = weaponStats(w.id, w.level);

        // Companions fire from their orbit position; the hero fires from itself.
        const origin = i === 0 ? g.hero : orbitPos(i);

        if (conf.kind === 'BEAM') { stepBeam(w, s, dt, g.hero); continue; }

        w.cd -= dt;
        if (w.cd > 0) continue;

        let fired = false;
        if (conf.kind === 'SHOT')        fired = fireShot(w, s, origin);
        else if (conf.kind === 'MORTAR') fired = fireMortar(w, s, origin);
        else if (conf.kind === 'NOVA')   fired = fireNova(w, s, g.hero);
        else if (conf.kind === 'CHAIN')  fired = fireChain(w, s, origin);

        // A weapon with nothing in range retries shortly rather than burning its
        // whole cooldown, so walking into a crowd is answered immediately.
        w.cd = fired ? s.cooldown * rateMul : 140;
      }
    }

    /** Where companion `i` sits this frame — a slow orbit around the hero. */
    function orbitPos(i) {
      const n = Math.max(1, g.weapons.length - 1);
      const a = (g.t / 2600) * TAU + ((i - 1) / n) * TAU;
      const radius = 64;
      return { x: g.hero.x + Math.cos(a) * radius, y: g.hero.y + Math.sin(a) * radius };
    }

    // ---- bullets -------------------------------------------------------

    function stepBullets(dt) {
      const sec = dt / 1000;
      for (const b of g.bullets) {
        b.x += b.vx * sec;
        b.y += b.vy * sec;
        b.life -= dt;
        if (b.arc != null) b.arcT += dt;

        if (b.splash) {
          // A mortar shell detonates when its flight time is up, wherever it is.
          if (b.life <= 0) {
            const r2 = b.splash * b.splash;
            for (const e of g.enemies) {
              const dx = e.x - b.x, dy = e.y - b.y;
              if (dx * dx + dy * dy <= r2) hurt(e, b.damage);
            }
            fx('boom', b.x, b.y, b.splash, 300, '#fb7185');
            g.shake = Math.max(g.shake, 3);
          }
          continue;
        }

        for (const e of g.enemies) {
          if (e.hp <= 0) continue;
          const dx = e.x - b.x, dy = e.y - b.y;
          const rr = e.r + b.r;
          if (dx * dx + dy * dy > rr * rr) continue;
          if (b.hits && b.hits.has(e.id)) continue;
          hurt(e, b.damage, { armorPiercing: b.armorPiercing });
          if (b.pierce > 0) {
            b.pierce -= 1;
            if (!b.hits) b.hits = new Set();
            b.hits.add(e.id);
          } else {
            b.life = -1;
            break;
          }
        }
      }
      compact(g.bullets, b => b.life > 0);
    }

    // ---- enemies -------------------------------------------------------

    // A coarse uniform grid, rebuilt each frame, so pushing bodies apart costs
    // O(n) instead of O(n squared). Without it two hundred enemies stack into a
    // single sprite the moment they reach the player.
    const CELL = 56;
    const grid = new Map();
    function rebuildGrid() {
      grid.clear();
      for (const e of g.enemies) {
        const key = ((e.x / CELL) | 0) * 4096 + ((e.y / CELL) | 0);
        let bucket = grid.get(key);
        if (!bucket) { bucket = []; grid.set(key, bucket); }
        bucket.push(e);
      }
    }

    function stepEnemies(dt) {
      const sec = dt / 1000;
      const h = g.hero;
      rebuildGrid();

      // Contact is measured two ways: the WORST thing touching you, and how many
      // things are touching you. See the damage step below for why both matter.
      let contactMax = 0;
      let contactCount = 0;
      for (const e of g.enemies) {
        if (e.flash > 0) e.flash -= dt;
        let mul = 1;
        if (e.slowT > 0) { e.slowT -= dt; mul = 1 - e.slowPct; }

        // The boss loses patience with being kited.
        let speed = e.speed;
        if (e.boss && g.t > RUN.bossAtMs + RUN.enrageAfterMs) speed *= 1.35;

        const dx = h.x - e.x, dy = h.y - e.y;
        const dist = Math.hypot(dx, dy) || 1;
        let ux = dx / dist, uy = dy / dist;

        if (e.weave) {
          e.phase += sec * 3.4;
          const wob = Math.sin(e.phase) * e.weave;
          const px = -uy, py = ux;
          ux += px * wob; uy += py * wob;
          const n = Math.hypot(ux, uy) || 1;
          ux /= n; uy /= n;
        }

        e.x += ux * speed * mul * sec;
        e.y += uy * speed * mul * sec;

        // Separation against the eight neighbouring cells only.
        const cx = (e.x / CELL) | 0, cy = (e.y / CELL) | 0;
        let checked = 0;
        for (let ox = -1; ox <= 1 && checked < 10; ox++) {
          for (let oy = -1; oy <= 1 && checked < 10; oy++) {
            const bucket = grid.get((cx + ox) * 4096 + (cy + oy));
            if (!bucket) continue;
            for (const o of bucket) {
              if (o === e) continue;
              checked++;
              if (checked > 10) break;
              const ddx = e.x - o.x, ddy = e.y - o.y;
              const min = (e.r + o.r) * 0.78;
              const d2 = ddx * ddx + ddy * ddy;
              if (d2 > 0.01 && d2 < min * min) {
                const d = Math.sqrt(d2);
                const push = (min - d) * 0.5;
                e.x += (ddx / d) * push;
                e.y += (ddy / d) * push;
              }
            }
          }
        }

        e.x = clamp(e.x, 10, WORLD.width - 10);
        e.y = clamp(e.y, 10, WORLD.height - 10);

        if (dist < e.r + 20) {
          contactCount++;
          if (e.damage > contactMax) contactMax = e.damage;
        }
      }

      compact(g.enemies, e => e.hp > 0);

      // One global window of invulnerability rather than one per enemy. Per-enemy
      // cooldowns are the genre norm, but they make a crowd of twenty do twenty
      // times the damage of one, and a student who gets briefly surrounded is
      // simply deleted with nothing to learn from it.
      //
      // Instead: the hit is the WORST thing touching you, plus a small term for
      // how many. So quality of threat dominates — a Stag Beetle hurts more than
      // a dozen ants — while a crowd is still worse than a single body, which is
      // what keeps the swarm frightening rather than decorative.
      h.iframe -= dt;
      if (contactCount > 0 && h.iframe <= 0) {
        const crowd = Math.min(6, Math.floor(contactCount / 5));
        const taken = Math.max(1, contactMax + crowd - h.armor);
        h.hp -= taken;
        h.iframe = 650;
        h.hurtFlash = 220;
        g.shake = Math.max(g.shake, 5);
        pop(`-${taken}`, h.x, h.y - 30, '#f87171');
        if (h.hp <= 0) {
          if (h.revives > 0) {
            h.revives -= 1;
            h.hp = Math.round(h.maxHp * 0.5);
            h.iframe = 2200;
            pop('SECOND WIND', h.x, h.y - 60, '#34d399');
            // The revive clears the field so it is a real reprieve.
            for (const e of g.enemies) if (!e.boss) hurt(e, 99999, { armorPiercing: true });
            g.shake = 18;
          } else {
            h.hp = 0;
            g.state = 'DEAD';
            g.outcome = 'DEAD';
          }
        }
      }
    }

    // ---- gems ----------------------------------------------------------

    function stepGems(dt) {
      const sec = dt / 1000;
      const h = g.hero;
      const pull = h.pickupR;
      for (const gem of g.gems) {
        const dx = h.x - gem.x, dy = h.y - gem.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < pull) {
          // Accelerating pull, so a magnet build feels like a vacuum.
          const s = 260 + (1 - d / pull) * 520;
          gem.x += (dx / d) * s * sec;
          gem.y += (dy / d) * s * sec;
        } else {
          gem.x += gem.vx * sec;
          gem.y += gem.vy * sec;
          gem.vx *= 0.92;
          gem.vy *= 0.92;
        }
        if (d < 26) {
          gem.taken = true;
          if (gem.heal) {
            h.hp = Math.min(h.maxHp, h.hp + gem.heal);
            pop(`+${gem.heal}`, h.x, h.y - 40, '#34d399');
          } else {
            h.xp += gem.value;
          }
        }
      }
      compact(g.gems, gem => !gem.taken);

      while (h.xp >= h.xpNext) {
        h.xp -= h.xpNext;
        h.level += 1;
        h.xpNext = xpForLevel(h.level);
        g.pendingLevels += 1;
      }
      if (g.pendingLevels > 0 && g.state === 'PLAYING') {
        g.state = 'LEVELUP';
        levelRef.current?.();
      }
    }

    // ---- hero ----------------------------------------------------------

    function stepHero(dt) {
      const sec = dt / 1000;
      const h = g.hero;
      const input = inputRef.current || {};
      const aura = auraBonus();
      const speed = h.baseSpeed * h.speedMul * (1 + aura.moveSpeed);

      let dx = 0, dy = 0;
      const keys = input.keys;
      if (keys && keys.size) {
        if (keys.has('up')) dy -= 1;
        if (keys.has('down')) dy += 1;
        if (keys.has('left')) dx -= 1;
        if (keys.has('right')) dx += 1;
      }
      if (dx === 0 && dy === 0 && input.pointerDown) {
        const px = input.wx - h.x, py = input.wy - h.y;
        const d = Math.hypot(px, py);
        if (d > 14) { dx = px / d; dy = py / d; }
      }

      const mag = Math.hypot(dx, dy);
      if (mag > 0) {
        dx /= mag; dy /= mag;
        h.x = clamp(h.x + dx * speed * sec, 24, WORLD.width - 24);
        h.y = clamp(h.y + dy * speed * sec, 24, WORLD.height - 24);
        h.walkPhase += sec * 9;
        if (dx !== 0) h.facing = dx > 0 ? 1 : -1;
      }

      if (h.regen > 0 && h.hp < h.maxHp) {
        h.hp = Math.min(h.maxHp, h.hp + h.regen * sec);
      }
      if (h.hurtFlash > 0) h.hurtFlash -= dt;

      // Camera eases toward the hero so a sharp change of direction does not
      // snap the whole world sideways.
      g.cam.x += (h.x - g.cam.x) * 0.16;
      g.cam.y += (h.y - g.cam.y) * 0.16;
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.045);
    }

    // ---- one fixed step ------------------------------------------------

    function step(dt) {
      g.t += dt;
      g.scoreFrac += (RUN.scorePerSecond * D.scoreMul * dt) / 1000;
      if (g.scoreFrac >= 1) {
        const whole = Math.floor(g.scoreFrac);
        g.score += whole;
        g.scoreFrac -= whole;
      }

      stepHero(dt);
      runSpawns(dt);
      stepWeapons(dt);
      stepBullets(dt);
      stepEnemies(dt);
      stepGems(dt);

      for (const p of g.pops) { p.life -= dt; p.y -= dt * 0.03; }
      compact(g.pops, p => p.life > 0);
      for (const f of g.fx) f.life -= dt;
      compact(g.fx, f => f.life > 0);

      if (g.state === 'DEAD' || g.state === 'WON') endRef.current?.(g.outcome, g.score);
    }

    // ---- rAF -----------------------------------------------------------

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      last = now;

      // A tab that was in the background hands back a huge delta; clamping stops
      // the sim fast-forwarding through a minute of spawns in one frame.
      acc += Math.min(elapsed, 250);

      const running = g.state === 'PLAYING' && !pausedRef.current;
      if (running) {
        let guard = 0;
        while (acc >= STEP_MS && guard < 5) {
          step(STEP_MS);
          acc -= STEP_MS;
          guard++;
          if (g.state !== 'PLAYING') break;
        }
        if (guard >= 5) acc = 0;
      } else {
        acc = 0;
      }

      renderRef.current();
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // The loop owns the run for its lifetime; a new run remounts the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
