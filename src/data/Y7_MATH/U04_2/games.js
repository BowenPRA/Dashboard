// src/data/Y7_MATH/U04_2/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit — its
// hand-authored level (TRACK_LEVELS.Y7_MATH.U04_2, "The Point Crossing") is
// already in unitDifficulty.js. GAMES is worth 0 XP — it opens with the quiz
// at 80 XP.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U04_2'),
};
