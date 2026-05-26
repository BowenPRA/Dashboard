// src/components/towerdefense/gameData.js

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
    reward: 3, 
    radius: 14, 
    damageReduction: 0
  },
  BEETLE: {
    name: "Stag Beetle",
    color: "bg-amber-800",
    border: "border-amber-950",
    hp: 400, 
    speed: 0.6,
    reward: 5, 
    radius: 20, 
    damageReduction: 20 
  },
  QUEEN: {
    name: "Queen Brood",
    color: "bg-purple-600",
    border: "border-purple-800",
    hp: 2500, 
    speed: 0.45,
    reward: 10,
    radius: 28, 
    damageReduction: 30 
  },
  GIANT_ANT: {
    name: "Broodmother",
    color: "bg-red-900",
    border: "border-red-950",
    hp: 5000, 
    speed: 0.75, 
    reward: 15,
    radius: 34, 
    damageReduction: 40 
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
    desc: "Cheap, rapid-fire defender. Deals +2 damage for each adjacent tower.",
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
      range:   { cost: 150, label: "Eagle Eye Aura",  desc: "Buffed towers gain +1.5 range" },
      passive: { cost: 350, label: "Overcharge",  desc: "Buffed towers also gain +30% damage" }
    }
  }
};

export const TOWER_ORDER = ['DART', 'SNIPER', 'FROST', 'SPLASH', 'CHAIN', 'NITRO'];

// ---------- Stat helpers ----------
// Dynamic calculation now fully accepts allTowers to bake the Adjacency and Buff modifiers directly into the UI
export function getEffectiveStats(tower, allTowers = []) {
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
      if (u.rate)  stats.buff      = Math.max(0.4, stats.buff - 0.15);
      stats.overcharge = !!u.passive;
      stats.rangeBoost = !!u.range;
      break;

    default:
      break;
  }

  // Apply Adjacency & Nitro Buffs automatically if the board state is provided
  if (allTowers.length > 0 && tower.typeId !== 'NITRO') {
    
    // Adjacency for DART
    if (tower.typeId === 'DART') {
      let adj = 0;
      allTowers.forEach(t => {
        if (t.id !== tower.id && Math.hypot(t.row - tower.row, t.col - tower.col) <= 1.5) adj++;
      });
      stats.damage += adj * 2; // Increased to +2
    }

    // Nitro Buffs
    const { rateMul, damageMul, rangeAdd } = getNitroBuff(tower, allTowers);
    if (stats.cooldown) stats.cooldown = stats.cooldown * rateMul;
    if (stats.damage)   stats.damage   = Math.round(stats.damage * damageMul);
    if (stats.range)    stats.range   += rangeAdd;
  }

  return stats;
}

// Highest-value buff a non-Nitro tower receives from Nitro towers in range. Does NOT stack.
export function getNitroBuff(tower, allTowers) {
  if (tower.typeId === 'NITRO') return { rateMul: 1, damageMul: 1, rangeAdd: 0 };
  
  let bestRateMul = 1;
  let bestDamageMul = 1;
  let bestRangeAdd = 0;

  for (const other of allTowers) {
    if (other.typeId !== 'NITRO') continue;
    const tConf = TOWERS['NITRO'];
    const s = tConf.base; 
    const u = other.upgrades || {};
    
    const dist = Math.sqrt(
      Math.pow(other.row - tower.row, 2) + Math.pow(other.col - tower.col, 2)
    );
    
    // Check if within Nitro Aura Range
    if (dist <= s.auraRange) {
      let buff = s.buff;
      if (u.rate) buff = Math.max(0.4, buff - 0.15);
      
      if (buff < bestRateMul) bestRateMul = buff; 
      if (u.passive && bestDamageMul < 1.3) bestDamageMul = 1.3;
      if (u.range && bestRangeAdd < 1.5) bestRangeAdd = 1.5;
    }
  }
  
  return { rateMul: bestRateMul, damageMul: bestDamageMul, rangeAdd: bestRangeAdd };
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