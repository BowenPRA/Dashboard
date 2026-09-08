// src/data/ADD_MATH/AM_4A/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.ADD_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// This unit has BOTH bolt types: a Vocab Bolt from its realWords, and a Maths
// Bolt from the AM_4A generator in mathChallenges.js — evaluating a modulus,
// solving |x + b| = k, and finding the largest integer inside |x − c| < k. All
// three answer to a whole number, which is what a fifteen-second popup needs.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ADD_MATH', 'AM_4A'),
};
