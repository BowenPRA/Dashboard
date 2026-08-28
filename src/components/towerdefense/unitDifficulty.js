// src/components/towerdefense/unitDifficulty.js
//
// The one place the arcade's per-track and per-unit rules are decided.
//
// Two independent axes:
//
//   ARENA      comes from the TRACK. Every track defends a different map with a
//              different look, so "the Maths game" and "the English game" are
//              visibly different games rather than the same board twice.
//
//   TIER       comes from the UNIT. Later units in a track field tougher waves,
//              fewer lives and (eventually) a restricted armoury, and pay a
//              bigger score multiplier for surviving them.
//
// A unit's games.js calls `arcadeConfig(track, unitId)` and gets the whole
// config; it only needs to pass overrides when it wants to break the pattern.

import { MAP_LAYOUTS, WAVE_MODIFIERS } from './wavePresets';

/** Map + theme + flavour for each track that has the arcade switched on. */
export const TRACK_ARENAS = {
  GED_MATH: {
    mapId: 'WAVE',
    themeId: 'STANDARD',
    mapName: 'Serpentine Valley',
    blurb: 'A long switchback road through open grassland.',
  },
  GED_ENG: {
    mapId: 'SPIRAL',
    themeId: 'NIGHT',
    mapName: 'The Labyrinth',
    blurb: 'A winding night maze that folds back on itself.',
  },
  GED_SCIENCE: {
    mapId: 'CIRCUIT',
    themeId: 'ICE',
    mapName: 'Cryo Lab',
    blurb: 'Coolant channels cut in hard right angles across the lab floor.',
  },
};

const DEFAULT_ARENA = {
  mapId: 'WAVE',
  themeId: 'STANDARD',
  mapName: 'Serpentine Valley',
  blurb: 'A long switchback road through open grassland.',
};

/**
 * Hand-authored campaigns.
 *
 * Where `TRACK_ARENAS` gives a whole track one map and derives the tier from the
 * unit id, a `TRACK_LEVELS` track instead spells out every unit as its own
 * *level* — a distinct map, theme, difficulty tier and (optionally) an enemy
 * modifier — so the units read as a designed sequence rather than the same board
 * getting quietly tougher. A unit listed here ignores the id-suffix tier and
 * takes the tier written on its level. Tracks with no entry are untouched.
 *
 * Y7 Maths, Unit 1 (Integers), sections 1.1–1.6: the tier climbs 0 → 5 for a
 * clean escalation, while the map and modifier change what *kind* of fight each
 * one is, so consecutive units never feel like a re-run.
 */
export const TRACK_LEVELS = {
  Y7_MATH: {
    U01_1: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 0,
      mapName: 'Serpentine Valley',
      blurb: 'A long switchback through open grassland — room to learn the ropes with the full armoury.',
    },
    U01_2: {
      mapId: 'JUNCTION', themeId: 'DESERT', tier: 1,
      mapName: 'The Crossroads',
      blurb: 'Two roads cross in the dunes. Hold the junction — the stream passes it twice — and you hold the field.',
    },
    U01_3: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Labyrinth',
      blurb: 'A winding night maze, and it is crawling.',
    },
    U01_4: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 3, waveMod: 'SIEGE',
      mapName: 'Cryo Lab',
      blurb: 'Armored heavies grind down the coolant channels.',
    },
    U01_5: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 4, waveMod: 'TIDE',
      mapName: 'The Foundry',
      blurb: 'Wave after wave folds through the works, and they never slow down.',
    },
    U01_6: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Long March',
      blurb: 'The final march. Queens and broods, the whole way down.',
      // Tier 5 would also ban SPLASH; keep it. Against a boss rush that spawns
      // swarms of adds, removing crowd-clear makes the finale unwinnable rather
      // than hard — the very trap the difficulty ladder warns about. NITRO only.
      bannedTowers: ['NITRO'],
    },
  },
};

/**
 * The difficulty ladder. Index is the tier; a unit is placed on it by
 * `tierForUnit`.
 *
 * `hpMul`/`speedMul` toughen the waves, `rewardMul` tightens the economy and
 * `lives`/`creditMul` set how much slack the student starts with. `scoreMul`
 * exists so a harder unit is worth grinding — the leaderboard is per unit, so
 * it never puts two units in competition with each other.
 *
 * Tower bans arrive late and stay light: banning the crowd-clear towers on top
 * of doubled enemy HP makes the late waves unwinnable rather than hard.
 */
// Balance pass (Y7 feedback: "too hard"). The ladder is gentler across the board:
// more starting lives, a flatter HP curve (top tier 1.68× rather than 1.95×), a
// looser economy, and — crucially — the top tier no longer bans SPLASH. Banning
// the crowd-clear tower on top of scaled-up swarms is exactly the "hard becomes
// unwinnable" trap the notes below warn about, so only the support tower (NITRO)
// is ever taken away, and only from the mid tiers up. scoreMul is untouched: a
// harder unit is still worth more on the leaderboard.
export const DIFFICULTY_TIERS = [
  { label: 'Recruit',   lives: 30, creditMul: 1.25, hpMul: 1.00, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.00, bannedTowers: [] },
  { label: 'Cadet',     lives: 26, creditMul: 1.15, hpMul: 1.10, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.15, bannedTowers: [] },
  { label: 'Operative', lives: 24, creditMul: 1.05, hpMul: 1.22, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.30, bannedTowers: [] },
  { label: 'Specialist',lives: 20, creditMul: 1.00, hpMul: 1.38, speedMul: 1.03, rewardMul: 0.95, scoreMul: 1.50, bannedTowers: ['NITRO'] },
  { label: 'Veteran',   lives: 18, creditMul: 0.95, hpMul: 1.52, speedMul: 1.06, rewardMul: 0.92, scoreMul: 1.75, bannedTowers: ['NITRO'] },
  { label: 'Commander', lives: 16, creditMul: 0.90, hpMul: 1.68, speedMul: 1.08, rewardMul: 0.90, scoreMul: 2.00, bannedTowers: ['NITRO'] },
];

const MAX_TIER = DIFFICULTY_TIERS.length - 1;

/**
 * Places a unit on the ladder from its id.
 *
 * Unit ids are `<SUBJECT>_<level><letter>` — MATH_0B, ENG_1C, SCI_0A — where the
 * digit is the course level and the letter is the position inside it. Reading
 * the id keeps the ladder stable: publishing a new unit shifts nothing, unlike
 * deriving the tier from a unit's index in the track listing.
 */
export function tierForUnit(unitId = '') {
  const m = /_(\d)([A-Z])$/i.exec(String(unitId).trim());
  if (!m) return 0;
  const level = Number(m[1]);
  const letter = m[2].toUpperCase().charCodeAt(0) - 65; // A -> 0
  return Math.max(0, Math.min(MAX_TIER, level * 3 + letter));
}

/** The arena a track defends, falling back to the Maths one for tracks with no entry. */
export const arenaForTrack = (track) => TRACK_ARENAS[track] || DEFAULT_ARENA;

/**
 * The full gameConfig for one unit's arcade.
 *
 * `overrides` is a shallow merge on top, so a unit that wants (say) a different
 * map or an extra ban writes only that key in its games.js.
 */
export function arcadeConfig(track, unitId, overrides = {}) {
  const arena = arenaForTrack(track);

  // A hand-authored level (Y7 campaign) wins over the arena/ladder default.
  const level = TRACK_LEVELS[track]?.[unitId] || null;

  // The ladder is opt-in per track. Tracks with no arena entry AND no authored
  // level (Y8, Y9, ESL…) stay on tier 0 — flat, exactly as they played before
  // the ladder existed — unless a unit asks for a tier by hand.
  const laddered = !!level || Object.prototype.hasOwnProperty.call(TRACK_ARENAS, track);
  const tier = overrides.tier ?? level?.tier ?? (laddered ? tierForUnit(unitId) : 0);
  const rules = DIFFICULTY_TIERS[Math.max(0, Math.min(MAX_TIER, tier))];

  const mapId = overrides.mapId || level?.mapId || arena.mapId;
  const themeId = overrides.themeId || level?.themeId || arena.themeId;
  const mapName = overrides.mapName || level?.mapName || arena.mapName;
  const mapBlurb = level?.blurb || arena.blurb;

  // The enemy-composition modifier for this level (see wavePresets). Null on
  // everything that doesn't opt in, so the wave set is the untouched SET_1.
  const waveMod = overrides.waveMod ?? level?.waveMod ?? null;
  const mod = waveMod ? WAVE_MODIFIERS[waveMod] : null;

  return {
    mapId: MAP_LAYOUTS[mapId] ? mapId : DEFAULT_ARENA.mapId,
    themeId,
    mapName,
    mapBlurb,

    tier,
    tierLabel: rules.label,

    lives: rules.lives,
    creditMultiplier: rules.creditMul,
    bannedTowers: level?.bannedTowers || rules.bannedTowers,

    // The composition modifier and the briefing text the arcade hub shows.
    waveMod,
    modifierLabel: mod?.label || null,
    modifierIcon: mod?.icon || null,
    briefing: mod?.blurb || mapBlurb,

    // Handed straight to the engine — see useGameEngine.
    difficulty: {
      hpMul: rules.hpMul,
      speedMul: rules.speedMul,
      rewardMul: rules.rewardMul,
      scoreMul: rules.scoreMul,
    },

    ...overrides,
  };
}
