// src/data/Y7_MATH/U03_2/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id.
// GAMES is worth 0 XP — it opens with the quiz at 80 XP. Until a hand-authored
// Y7_MATH/U03_2 level is added to unitDifficulty.js, arcadeConfig falls back to
// the track arena and the id-derived tier.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U03_2'),
};
