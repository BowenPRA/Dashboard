// src/data/Y7_MATH/U05_1/games.js
// The arcade reward. GAMES is worth 0 XP — it opens with the quiz at 80 XP.
// The level is TRACK_LEVELS.Y7_MATH.U05_1 in unitDifficulty.js ("The Full
// Turn", tier 1: a new chapter starts gentle); its Maths Bolt questions come
// from the `angleSum` generator in mathChallenges.js.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U05_1'),
};
