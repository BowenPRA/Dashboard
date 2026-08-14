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

import { MAP_LAYOUTS } from './wavePresets';

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
export const DIFFICULTY_TIERS = [
  { label: 'Recruit',   lives: 25, creditMul: 1.15, hpMul: 1.00, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.00, bannedTowers: [] },
  { label: 'Cadet',     lives: 22, creditMul: 1.05, hpMul: 1.15, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.15, bannedTowers: [] },
  { label: 'Operative', lives: 20, creditMul: 1.00, hpMul: 1.30, speedMul: 1.03, rewardMul: 0.95, scoreMul: 1.30, bannedTowers: [] },
  { label: 'Specialist',lives: 18, creditMul: 0.95, hpMul: 1.50, speedMul: 1.06, rewardMul: 0.90, scoreMul: 1.50, bannedTowers: ['NITRO'] },
  { label: 'Veteran',   lives: 15, creditMul: 0.90, hpMul: 1.70, speedMul: 1.10, rewardMul: 0.85, scoreMul: 1.75, bannedTowers: ['NITRO'] },
  { label: 'Commander', lives: 12, creditMul: 0.85, hpMul: 1.95, speedMul: 1.15, rewardMul: 0.80, scoreMul: 2.00, bannedTowers: ['NITRO', 'SPLASH'] },
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

  // The ladder is opt-in per track. Tracks with no arena entry (Y8, Y9, ESL…)
  // stay on tier 0 — flat, exactly as they played before the ladder existed —
  // unless a unit asks for a tier by hand.
  const laddered = Object.prototype.hasOwnProperty.call(TRACK_ARENAS, track);
  const tier = overrides.tier ?? (laddered ? tierForUnit(unitId) : 0);
  const rules = DIFFICULTY_TIERS[Math.max(0, Math.min(MAX_TIER, tier))];

  const mapId = overrides.mapId || arena.mapId;

  return {
    mapId: MAP_LAYOUTS[mapId] ? mapId : DEFAULT_ARENA.mapId,
    themeId: arena.themeId,
    mapName: arena.mapName,
    mapBlurb: arena.blurb,

    tier,
    tierLabel: rules.label,

    lives: rules.lives,
    creditMultiplier: rules.creditMul,
    bannedTowers: rules.bannedTowers,

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
