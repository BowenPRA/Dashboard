// src/data/COORD_SCI/U04_1/games.js
// The arcade reward. The map/theme/tier come from the per-unit campaign table in
// src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.COORD_SCI). GAMES is
// worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2 with the
// quiz, with the per-unit leaderboard as its prize. The mid-game challenge is a
// Vocab Bolt sourced from this unit's realWords (no maths generator for science).
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('COORD_SCI', 'U04_1'),
};
