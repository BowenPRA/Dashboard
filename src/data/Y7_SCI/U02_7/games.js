// src/data/Y7_SCI/U02_7/games.js
// The arcade reward. Level from the Y7_SCI campaign table in unitDifficulty
// (no hand-authored row for 2.7 yet, so the ladder places it by unit id).
// GAMES is worth 0 XP — it opens with the quiz at 80 XP.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_SCI', 'U02_7'),
};
