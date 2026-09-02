// src/components/survivor/survivorData.js
//
// =====================================================================
// SWARM SURVIVOR — the arcade's second cabinet.
//
// Tower Defense asks "where do I put my towers?". Survivor asks the same
// question with the towers glued to you and the map moving. You ARE one of the
// tower blooks, on foot in an open arena; the rest of the armoury joins you as
// orbiting companions as you level up. Everything on screen — the hero, the
// companions, the swarm — is drawn from artwork that already exists in
// components/towerdefense, so the two games look like one world.
//
// What is shared with Tower Defense, deliberately:
//   ART     TowerVisual's tower blooks + InsectVisual's tribes (see spriteForge)
//   TRIBES  ENEMY_SKINS / THEME_TRIBE — the arena's enemies match the TD arena's
//   THEME   MAP_THEMES paints the ground
//   TIER    unitDifficulty's `difficulty` multipliers scale the swarm and score
//   GOLD    the same XP-derived purse; here it buys a loadout, not towers
//   BOARD   the same per-unit leaderboard, via meta.arcadeScore
//
// What is NOT shared: the stats. A tower that stands still and a tower that runs
// are different balance problems, so the numbers below are survivor's own. The
// TD tables are read only for identity (name, emoji, colours) — never for
// damage — so tuning one game can never silently detune the other.
// =====================================================================

import { TOWERS } from '../towerdefense/gameData';

// ---------- World ----------

export const WORLD = {
  width: 2200,
  height: 1500,
  // Enemies spawn on a ring just past the visible edge and walk inward. Bounded
  // rather than endless: a student who simply runs away gets cornered, which is
  // the pressure the whole game is built on.
  spawnMargin: 120,
};

/** Fixed timestep, matching the TD engine so the two feel the same weight. */
export const FPS = 30;
export const STEP_MS = 1000 / FPS;

/** Hard caps. Past these, spawns are skipped and effects are dropped. */
export const LIMITS = {
  enemies: 220,
  bullets: 260,
  gems: 320,
  pops: 26,
  fx: 60,
};

// ---------- Enemies ----------
//
// The same five ROLE SLOTS Tower Defense uses (see gameData's ENEMIES), retuned
// for a game where the player is inside the crowd rather than behind it. The
// slot keys are identical, so `enemySkin(slot, tribe)` hands back the right
// artwork and name for whichever tribe defends this arena — a Snowflea and a
// Worker Ant are the same threat wearing different clothes, exactly as in TD.
//
// Speed is the subtlest number here. The hero runs at about 150; the basic enemy
// at half that. Slower than this and a student can simply walk away forever,
// which starves their own weapons of targets and quietly loses the run on an
// empty screen. Faster and there is no escaping a bad position, which is the one
// thing a five-minute game cannot afford. Half pace is the window where running
// away buys you seconds rather than safety.
//
//   hp/speed/damage   the fight
//   dr                flat damage reduction (armour), as in TD
//   xp                gem value — the level-up economy
//   score             leaderboard points, kept in TD's band (reward x 10)
//   r                 body radius in world px
export const SURVIVOR_ENEMIES = {
  ANT: {
    slot: 'ANT', hp: 14, speed: 76, damage: 5, dr: 0, xp: 1, score: 10, r: 16,
  },
  WASP: {
    slot: 'WASP', hp: 26, speed: 116, damage: 7, dr: 0, xp: 2, score: 30, r: 18,
    // Flyers drift in a lazy sine across their approach so a line of them never
    // arrives as a single readable wall.
    weave: 0.9,
  },
  BEETLE: {
    slot: 'BEETLE', hp: 170, speed: 52, damage: 11, dr: 5, xp: 6, score: 60, r: 25,
  },
  QUEEN: {
    slot: 'QUEEN', hp: 1050, speed: 34, damage: 13, dr: 10, xp: 30, score: 400, r: 33,
    elite: true,
  },
  GIANT_ANT: {
    slot: 'GIANT_ANT', hp: 3600, speed: 42, damage: 20, dr: 12, xp: 60, score: 2500, r: 42,
    boss: true,
  },
};

/**
 * How much tougher the swarm is at minute `m`.
 *
 * Linear rather than exponential on purpose: a student who is doing well should
 * feel the pressure climb steadily, not fall off a cliff at minute four. At the
 * boss (5:00) this is 1.80x on top of whatever the unit's difficulty tier adds.
 */
export const timeScale = (ms) => 1 + 0.16 * (ms / 60000);

// ---------- The run ----------

export const RUN = {
  // Four minutes to the boss, and a fight of maybe one more.
  //
  // The genre's own runs are half an hour. This one is played in a lesson break
  // by a student who has just finished a unit, so it is built to be FINISHED —
  // a five-minute arc with a real ending beats a thirty-minute one nobody sees
  // the end of. It is also what makes "kill the Broodmother" a goal rather than
  // a rumour, which is the thing that gets a class talking about it.
  /** When the boss walks in. Everything before this is the climb. */
  bossAtMs: 4 * 60 * 1000,
  /** Mini-bosses (the QUEEN slot) before that. */
  eliteAtMs: [130000, 190000],
  /** The boss speeds up if it is being kited rather than fought. */
  enrageAfterMs: 120000,
  /** Points per second survived, before the tier multiplier. */
  scorePerSecond: 8,
  /** Killing the boss ends the run a winner. */
  victoryScore: 3000,
  /** Answering a level-up question correctly, matching TD's Vocab Bolt. */
  challengeScore: 50,
};

/**
 * The spawn director.
 *
 * Each phase names which slots are in the pool and how fast they arrive. A phase
 * begins at `atMs`; the last one whose `atMs` has passed is the live phase, so
 * inserting a phase never renumbers the others.
 *
 * `interval` is milliseconds between spawn ticks and `burst` how many arrive per
 * tick, so density climbs on two axes — more often AND more at once — which is
 * what makes the late game feel like a tide rather than a queue.
 */
export const SPAWN_PHASES = [
  // Balance rule the whole ladder is built on: the player's KILL rate must beat
  // the spawn rate at every stage, or the field fills up and the run is lost on
  // arithmetic rather than on play. The opening weapon clears roughly two of the
  // basic enemy a second, so the opening spawns fewer than one.
  { atMs: 0,      interval: 1100, burst: 1, pool: ['ANT'] },
  { atMs: 40000,  interval: 950,  burst: 2, pool: ['ANT', 'ANT', 'WASP'] },
  { atMs: 80000,  interval: 850,  burst: 2, pool: ['ANT', 'ANT', 'WASP'] },
  { atMs: 120000, interval: 780,  burst: 3, pool: ['ANT', 'WASP', 'WASP', 'BEETLE'] },
  { atMs: 170000, interval: 700,  burst: 3, pool: ['ANT', 'ANT', 'WASP', 'BEETLE'] },
  { atMs: 210000, interval: 640,  burst: 4, pool: ['ANT', 'WASP', 'WASP', 'BEETLE', 'BEETLE'] },
  // Once the boss is on the field the adds thin out — the fight should be about
  // the boss, not about the thirty ants standing between you and it.
  { atMs: 240000, interval: 950,  burst: 2, pool: ['ANT', 'WASP', 'BEETLE'] },
];

/**
 * A ring of enemies that closes in from every direction at once.
 *
 * The one moment in the run where running away is not an option — you have to
 * cut a hole. Fires on a timer from the first one onward.
 */
export const SWARM_EVENT = {
  firstAtMs: 85000,
  everyMs: 70000,
  count: 18,
  radius: 640,
};

// ---------- Heroes ----------
//
// A hero IS a tower. `typeId` indexes TOWERS for the name, emoji and colours, and
// indexes the sprite forge for the blook artwork, so adding a hero is a matter of
// picking a tower and writing its on-foot numbers.
//
// `cost` of 0 means it is always available; a paid hero is unlocked in the
// loadout screen with the unit's XP gold.

export const HEROES = [
  {
    typeId: 'DART',
    tagline: 'Fast darts, fast feet. The safe first pick.',
    cost: 0,
    hp: 110, speed: 158,
    weapon: 'DART',
    perk: 'Starts with +10% move speed.',
    speedBonus: 0.10,
  },
  {
    typeId: 'FROST',
    tagline: 'Pulses of cold that freeze the crowd off you.',
    cost: 0,
    hp: 125, speed: 146,
    weapon: 'FROST',
    perk: 'Tougher hide: +15 max health.',
    hpBonus: 15,
  },
  {
    typeId: 'SNIPER',
    tagline: 'Enormous damage, one shot at a time. Fragile.',
    cost: 0,
    hp: 82, speed: 150,
    weapon: 'SNIPER',
    perk: 'Shots pierce armour and everything in the line.',
  },
  {
    typeId: 'SPLASH',
    tagline: 'Lobs shells into the thickest part of the swarm.',
    cost: 90,
    hp: 120, speed: 140,
    weapon: 'SPLASH',
    perk: 'Heavy frame: takes 1 less damage from every hit.',
    armorBonus: 1,
  },
  {
    typeId: 'CHAIN',
    tagline: 'Lightning that jumps from body to body.',
    cost: 130,
    hp: 96, speed: 152,
    weapon: 'CHAIN',
    perk: 'Gems fly to you from twice as far.',
    pickupBonus: 1.0,
  },
];

// ---------- Weapons ----------
//
// One entry per tower identity. The hero carries one of these; every companion
// is another. `level` runs 1..MAX_WEAPON_LEVEL and each level applies `perLevel`
// once — so a level-4 Sentry is not a different weapon, just a louder one.
//
// The upgrade LABELS are lifted from the TD tower's own upgrade table where they
// fit, so a student who has played the tower recognises what they are buying.

export const MAX_WEAPON_LEVEL = 5;

export const WEAPONS = {
  DART: {
    typeId: 'DART',
    kind: 'SHOT',
    targeting: 'NEAREST',
    damage: 16, cooldown: 480, range: 330, speed: 430, shots: 1, pierce: 0,
    perLevel: { damage: 7, cooldown: -50, range: 18 },
    // Odd levels add a dart instead of raw numbers — multishot is what makes the
    // Sentry scale, exactly as adjacency did on the board.
    milestones: { 3: { shots: 1 }, 5: { shots: 1, pierce: 1 } },
    blurb: 'Rapid darts at the nearest enemy.',
  },
  SNIPER: {
    typeId: 'SNIPER',
    kind: 'SHOT',
    targeting: 'TOUGHEST',
    damage: 58, cooldown: 1500, range: 540, speed: 760, shots: 1, pierce: 99,
    armorPiercing: true,
    perLevel: { damage: 26, cooldown: -140, range: 22 },
    milestones: { 4: { shots: 1 } },
    blurb: 'A piercing bolt through the toughest thing in sight. Ignores armour.',
  },
  SPLASH: {
    typeId: 'SPLASH',
    kind: 'MORTAR',
    targeting: 'DENSEST',
    damage: 26, cooldown: 1350, range: 380, speed: 300, splash: 74,
    perLevel: { damage: 11, cooldown: -110, splash: 7 },
    blurb: 'Shells lobbed into the densest crowd.',
  },
  FROST: {
    typeId: 'FROST',
    kind: 'NOVA',
    damage: 9, cooldown: 1250, radius: 118, slowPct: 0.45, slowMs: 1600,
    perLevel: { damage: 5, cooldown: -95, radius: 16, slowPct: 0.04 },
    blurb: 'A ring of cold that damages and slows everything around you.',
  },
  CHAIN: {
    typeId: 'CHAIN',
    kind: 'CHAIN',
    targeting: 'NEAREST',
    damage: 24, cooldown: 1100, range: 290, bounces: 3,
    perLevel: { damage: 10, cooldown: -80, range: 14 },
    milestones: { 3: { bounces: 2 }, 5: { bounces: 2 } },
    blurb: 'Lightning that arcs from enemy to enemy.',
  },
  NITRO: {
    typeId: 'NITRO',
    kind: 'AURA',
    // No attack of its own — it makes everything else better, which is exactly
    // what the tower does on the board.
    fireRate: 0.16, moveSpeed: 0.06,
    perLevel: { fireRate: 0.05, moveSpeed: 0.02 },
    blurb: 'No guns. Every other weapon fires faster and you run quicker.',
  },
  UNICORN: {
    typeId: 'UNICORN',
    kind: 'BEAM',
    // The board's super-weapon, on a leash: it charges, then sweeps a full turn
    // and cuts everything it crosses. Deliberately rare in the upgrade pool.
    damage: 55, chargeMs: 9000, sweepMs: 1400, width: 34, tickMs: 100,
    perLevel: { damage: 22, chargeMs: -900, width: 6 },
    blurb: 'Charges, then sweeps a rainbow lance right around you. Pierces armour.',
  },
};

/** Weapons a companion can be recruited as. The hero's own weapon is excluded. */
export const RECRUITABLE = ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO', 'UNICORN'];

export const MAX_COMPANIONS = 5;

/** Effective numbers for a weapon at a level, with every milestone folded in. */
export function weaponStats(weaponId, level = 1) {
  const w = WEAPONS[weaponId];
  if (!w) return null;
  const s = { ...w };
  delete s.perLevel;
  delete s.milestones;

  const steps = Math.max(0, Math.min(MAX_WEAPON_LEVEL, level) - 1);
  for (const [key, delta] of Object.entries(w.perLevel || {})) {
    s[key] = (s[key] || 0) + delta * steps;
  }
  for (let lv = 2; lv <= Math.min(MAX_WEAPON_LEVEL, level); lv++) {
    for (const [key, delta] of Object.entries(w.milestones?.[lv] || {})) {
      s[key] = (s[key] || 0) + delta;
    }
  }
  // Floors, so a stacked fire-rate build cannot reach zero and fire every frame.
  if (s.cooldown != null) s.cooldown = Math.max(150, s.cooldown);
  if (s.chargeMs != null) s.chargeMs = Math.max(3500, s.chargeMs);
  if (s.slowPct != null) s.slowPct = Math.min(0.72, s.slowPct);
  return s;
}

/** Display name for a weapon — always the tower's name, so the two games agree. */
export const weaponName = (id) => TOWERS[id]?.name || id;
export const weaponEmoji = (id) => TOWERS[id]?.emoji || '⭐';

// ---------- Levelling ----------

/**
 * Gems needed to reach the next level.
 *
 * Quadratic, and the shape matters more than the numbers. Every level-up pauses
 * the game and asks a question, so the curve is really answering "how many
 * questions is one run?" — a linear curve produced thirty in four minutes, which
 * turned the game into a quiz with a screensaver behind it. This lands a full
 * run around level eighteen: roughly one question every fifteen seconds early
 * on, stretching to a minute apart by the end, which is the same rhythm the
 * genre uses and leaves the last third of the run about playing, not answering.
 */
export const xpForLevel = (level) => Math.round(6 + level * 2 + level * level * 0.6);

// ---------- Hero upgrade cards ----------
//
// The non-weapon half of the level-up pool. Each one is a flat, legible change —
// students should be able to read a card and know what it does without doing
// percentage arithmetic in their head mid-swarm.

export const PERKS = {
  MIGHT:   { id: 'MIGHT',   name: 'Might',      icon: '💥', desc: '+15% damage from every weapon.', max: 5 },
  SWIFT:   { id: 'SWIFT',   name: 'Swiftness',  icon: '👟', desc: '+10% move speed.',               max: 4 },
  VITAL:   { id: 'VITAL',   name: 'Vitality',   icon: '❤️', desc: '+25 max health, and heal 25.',   max: 5 },
  GREED:   { id: 'GREED',   name: 'Magnetism',  icon: '🧲', desc: '+35% gem pickup range.',         max: 4 },
  FORTUNE: { id: 'FORTUNE', name: 'Fortune',    icon: '🍀', desc: '+20% gem value.',                max: 4 },
  ARMOR:   { id: 'ARMOR',   name: 'Plating',    icon: '🛡️', desc: 'Take 2 less damage per hit.',    max: 4 },
  HASTE:   { id: 'HASTE',   name: 'Overclock',  icon: '⏱️', desc: 'All weapons fire 10% faster.',   max: 4 },
  MEND:    { id: 'MEND',    name: 'Regrowth',   icon: '🌱', desc: 'Recover 1 health per second.',   max: 3 },
};

// ---------- Loadout shop ----------
//
// Where the unit's XP gold goes. Tower Defense spends the same purse on towers;
// here it is spent once, before the run, on how you start. Keeping it pre-run
// (rather than an in-game shop) means the pressure during play stays on aim and
// movement, and it makes studying feel like preparation rather than currency.

export const LOADOUT_ITEMS = [
  {
    id: 'REVIVE', name: 'Spare Life', icon: '💖', cost: 130, max: 2,
    desc: 'Get back up at half health when you fall.',
  },
  {
    id: 'RATIONS', name: 'Field Rations', icon: '🍖', cost: 80, max: 3,
    desc: '+25 max health.',
  },
  {
    id: 'SHOES', name: 'Running Shoes', icon: '👟', cost: 60, max: 3,
    desc: '+8% move speed.',
  },
  {
    id: 'MAGNET', name: 'Magnet Core', icon: '🧲', cost: 55, max: 2,
    desc: '+45% gem pickup range.',
  },
  {
    id: 'HEADSTART', name: 'Head Start', icon: '⚡', cost: 110, max: 2,
    desc: 'Begin the run one level higher.',
  },
  {
    id: 'PLATING', name: 'Plating', icon: '🛡️', cost: 95, max: 2,
    desc: 'Take 1 less damage from every hit.',
  },
];

/** What a bought loadout adds up to. Pure — the engine reads this once at start. */
export function loadoutEffects(counts = {}) {
  const n = (id) => Math.max(0, Number(counts[id]) || 0);
  return {
    revives:   n('REVIVE'),
    hpBonus:   n('RATIONS') * 25,
    speedMul:  1 + n('SHOES') * 0.08,
    pickupMul: 1 + n('MAGNET') * 0.45,
    startLevel: 1 + n('HEADSTART'),
    armor:     n('PLATING'),
  };
}

// ---------- The level-up deck ----------

/**
 * Three cards for a level-up screen.
 *
 * Weighted, not uniform. Early on the run should be about assembling a squad, so
 * recruiting a new companion is worth several times a stat bump; once the squad
 * is full, recruiting drops out and everything goes into levelling what you
 * have. The Prisma lance is held back until level six so it reads as the payoff
 * it is rather than an opening pick.
 *
 * Pure: it reads the run and returns cards, so the shell can re-roll without
 * touching the simulation.
 */
export function rollUpgrades(g, count = 3) {
  const owned = new Set(g.weapons.map(w => w.id));
  const squadFull = g.weapons.length - 1 >= MAX_COMPANIONS;
  const deck = [];
  // Until there are three weapons on the field, one card is ALWAYS a new one.
  // Left purely to the weights, an unlucky opening can deal three stat bumps in
  // a row and leave a student soloing the swarm with their starting gun — which
  // is not a hard run, it is a lost one, decided by a dice roll they never saw.
  const guaranteeRecruit = g.weapons.length < 3 && !squadFull;

  for (const id of RECRUITABLE) {
    if (owned.has(id) || squadFull) continue;
    if (id === 'UNICORN' && g.hero.level < 6) continue;
    deck.push({
      key: `recruit:${id}`,
      kind: 'RECRUIT',
      weaponId: id,
      title: weaponName(id),
      subtitle: 'New weapon',
      desc: WEAPONS[id].blurb,
      weight: id === 'UNICORN' ? 3 : 9,
    });
  }

  for (const w of g.weapons) {
    if (w.level >= MAX_WEAPON_LEVEL) continue;
    const next = w.level + 1;
    deck.push({
      key: `weapon:${w.id}`,
      kind: 'WEAPON',
      weaponId: w.id,
      title: `${weaponName(w.id)} Mk.${next}`,
      subtitle: 'Upgrade',
      desc: describeWeaponStep(w.id, next),
      weight: 7,
    });
  }

  for (const perk of Object.values(PERKS)) {
    if ((g.hero.perks?.[perk.id] || 0) >= perk.max) continue;
    deck.push({
      key: `perk:${perk.id}`,
      kind: 'PERK',
      perkId: perk.id,
      title: perk.name,
      subtitle: 'Body',
      desc: perk.desc,
      icon: perk.icon,
      weight: 5,
    });
  }

  // Weighted draw without replacement.
  const picked = [];
  const pool = [...deck];

  if (guaranteeRecruit) {
    const recruits = pool.filter(c => c.kind === 'RECRUIT');
    if (recruits.length) {
      const first = recruits[Math.floor(Math.random() * recruits.length)];
      picked.push(first);
      pool.splice(pool.indexOf(first), 1);
    }
  }
  while (picked.length < count && pool.length) {
    let total = 0;
    for (const c of pool) total += c.weight;
    let roll = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < pool.length; i++) {
      roll -= pool[i].weight;
      if (roll <= 0) { idx = i; break; }
    }
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

/** Plain-English summary of what one weapon level actually buys. */
function describeWeaponStep(weaponId, level) {
  const before = weaponStats(weaponId, level - 1);
  const after = weaponStats(weaponId, level);
  const bits = [];
  const up = (label, a, b, unit = '') => {
    if (b > a) bits.push(`+${Math.round(b - a)}${unit} ${label}`);
  };
  up('damage', before.damage || 0, after.damage || 0);
  if (after.cooldown && before.cooldown && after.cooldown < before.cooldown) {
    bits.push(`${Math.round((1 - after.cooldown / before.cooldown) * 100)}% faster`);
  }
  if (after.chargeMs && before.chargeMs && after.chargeMs < before.chargeMs) {
    bits.push(`${Math.round((1 - after.chargeMs / before.chargeMs) * 100)}% faster charge`);
  }
  up('range', before.range || 0, after.range || 0);
  up('blast', before.splash || 0, after.splash || 0);
  up('radius', before.radius || 0, after.radius || 0);
  if ((after.shots || 1) > (before.shots || 1)) bits.push('+1 projectile');
  if ((after.bounces || 0) > (before.bounces || 0)) bits.push(`+${after.bounces - before.bounces} bounces`);
  if ((after.pierce || 0) > (before.pierce || 0)) bits.push('shots pierce');
  if ((after.slowPct || 0) > (before.slowPct || 0)) bits.push('stronger chill');
  if ((after.fireRate || 0) > (before.fireRate || 0)) bits.push('stronger aura');
  return bits.join(' · ') || 'Stronger.';
}

/** Total gold a loadout costs, including any hero unlock. */
export function loadoutCost(counts = {}, heroTypeId = null) {
  let total = 0;
  for (const item of LOADOUT_ITEMS) {
    total += item.cost * Math.max(0, Number(counts[item.id]) || 0);
  }
  const hero = HEROES.find(h => h.typeId === heroTypeId);
  if (hero) total += hero.cost || 0;
  return total;
}
