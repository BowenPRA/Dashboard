// src/data/Y7_MATH/U04_4/games.js
// The arcade reward. GAMES is worth 0 XP — it opens with the quiz at 80 XP.
// The level is hand-authored in unitDifficulty.js (TRACK_LEVELS.Y7_MATH.U04_4,
// "The Bus Station"): its map, theme, tier 4 and the TIDE wave modifier.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U04_4'),
};
