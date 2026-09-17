// src/data/Y7_MATH/U02_5/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id.
// GAMES is worth 0 XP — it opens with the quiz at 80 XP. There is no
// hand-authored Y7_MATH/U02_5 level in unitDifficulty.js yet, so arcadeConfig
// falls back to the track arena and the id-derived tier until one is added.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U02_5'),
};
