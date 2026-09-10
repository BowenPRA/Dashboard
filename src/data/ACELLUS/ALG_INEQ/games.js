// src/data/ACELLUS/ALG_INEQ/games.js
// The arcade reward. Map, theme and tier come from the track table in
// src/components/towerdefense/unitDifficulty.js. GAMES is worth 0 XP — it is
// what finishing the unit unlocks, sharing the arcade gate with the quiz, with
// the per-unit leaderboard as its prize.
//
// The bolt questions come from this unit's realWords, so a popup mid-wave is a
// vocabulary check on the language the questions are written in: at most, at
// least, endpoint, union, intersection.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ACELLUS', 'ALG_INEQ'),
};
