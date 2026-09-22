// src/data/EXT_MATH/EM_07B/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.EXT_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// Both bolt types: a Vocab Bolt from the realWords, and a Maths Bolt from the
// EM_07B generator in mathChallenges.js — a back bearing, a Pythagorean
// hypotenuse, or the sides of a regular polygon from one of its angles.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('EXT_MATH', 'EM_07B'),
};
