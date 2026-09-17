// src/data/Y7_SCI/U02_5/games.js
// The arcade reward. Level from the Y7_SCI campaign table in unitDifficulty
// (until 2.5 has its own row there, arcadeConfig falls back to the track's
// arena and the id ladder). GAMES is worth 0 XP — it opens with the quiz at 80 XP.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_SCI', 'U02_5'),
};
