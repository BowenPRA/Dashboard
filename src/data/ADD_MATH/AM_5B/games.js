// src/data/ADD_MATH/AM_5B/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.ADD_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// Both bolt types: a Vocab Bolt from the realWords, and a Maths Bolt from the
// AM_5B generator in mathChallenges.js — e and ln undoing each other, the
// number a shifted power brings with it, how many solutions a hidden quadratic
// really has once the values of y are checked, whether a power can equal a
// number at all, and the start value of a growth or decay model.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ADD_MATH', 'AM_5B'),
};
