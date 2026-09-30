// src/data/ADD_MATH/AM_5D/games.js
// The arcade reward. Map, theme and tier come from the per-unit campaign table
// in src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.ADD_MATH).
// GAMES is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2
// with the quiz, with the per-unit leaderboard as its prize.
//
// Both bolt types: a Vocab Bolt from the realWords, and a Maths Bolt from the
// AM_5D generator in mathChallenges.js — the y-intercept of k·e^(nx) + a, the
// number in its asymptote, whether it crosses the x-axis, the asymptote of a
// log curve, and whether a log curve reaches the y-axis.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ADD_MATH', 'AM_5D'),
};
