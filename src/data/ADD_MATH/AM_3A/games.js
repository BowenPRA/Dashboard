// src/data/ADD_MATH/AM_3A/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.ADD_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// This unit has BOTH bolt types: a Vocab Bolt from its realWords, and a Maths
// Bolt from the AM_3A generator in mathChallenges.js — "is (x − c) a factor?"
// and "work out P(c)", which is the factor theorem at fifteen-second speed.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ADD_MATH', 'AM_3A'),
};
