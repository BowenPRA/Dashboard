// src/data/Y7_MATH/U01_1/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id
// (src/components/towerdefense/unitDifficulty.js). GAMES is worth 0 XP — what
// finishing the unit buys, unlocked once the assessment has been attempted
// (ADAPTATION-PLAN §6.4), with the per-unit leaderboard as prize.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U01_1'),
};
