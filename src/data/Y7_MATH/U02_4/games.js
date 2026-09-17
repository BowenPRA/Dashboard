// src/data/Y7_MATH/U02_4/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id
// (unitDifficulty.js has no hand-authored U02_4 level yet, so it falls back to
// the arena default). GAMES is worth 0 XP — it opens with the quiz at 80 XP.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U02_4'),
};
