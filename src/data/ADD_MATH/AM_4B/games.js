// src/data/ADD_MATH/AM_4B/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.ADD_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// Both bolt types: a Vocab Bolt from the realWords, and a Maths Bolt from the
// AM_4B generator in mathChallenges.js — a named x-intercept of a factorised
// cubic, its y-intercept, and which way its right-hand tail goes.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ADD_MATH', 'AM_4B'),
};
