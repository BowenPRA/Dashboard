// src/data/Y7_MATH/U01_3/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id.
// GAMES is worth 0 XP — what finishing the unit buys, unlocked once the
// assessment has been attempted (ADAPTATION-PLAN §6.4).
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U01_3'),
};
