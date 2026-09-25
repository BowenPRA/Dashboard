// src/data/PHYSICS/PHY_MOM/games.js
// The arcade reward. Map, theme and tier come from TRACK_LEVELS.PHYSICS in
// src/components/towerdefense/unitDifficulty.js. GAMES is worth 0 XP — it is
// what finishing the unit unlocks, sharing the arcade gate with the quiz, with
// the per-unit leaderboard as its prize.
//
// The Maths Bolt questions come from the PHY_MOM generator in
// mathChallenges.js: p = mv, Δv across zero, stick-together v_f and recoil,
// all with whole-number answers — signs included — so a mid-wave popup drills
// exactly what this unit loses marks on.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('PHYSICS', 'PHY_MOM'),
};
