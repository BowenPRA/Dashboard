// src/data/Y7_MATH/U02_6/games.js
// The arcade reward. Arena from the track, difficulty tier from the unit id.
// GAMES is worth 0 XP — it opens with the quiz at 80 XP. The hand-authored
// level is TRACK_LEVELS.Y7_MATH.U02_6 in unitDifficulty.js, and the questions
// come from the inequalities generator in mathChallenges.js.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U02_6'),
};
