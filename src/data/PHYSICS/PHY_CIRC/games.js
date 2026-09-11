// src/data/PHYSICS/PHY_CIRC/games.js
// The arcade reward. Map, theme and tier come from TRACK_LEVELS.PHYSICS in
// src/components/towerdefense/unitDifficulty.js. GAMES is worth 0 XP — it is
// what finishing the unit unlocks, sharing the arcade gate with the quiz, with
// the per-unit leaderboard as its prize.
//
// The Maths Bolt questions come from the PHY_CIRC generator in
// mathChallenges.js: unit conversions and small whole-number centripetal
// force sums, so a mid-wave popup is a drill on exactly what this unit
// loses marks on.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('PHYSICS', 'PHY_CIRC'),
};
