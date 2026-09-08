// src/data/PRIMARY_TECH/T07/games.js
// The arcade reward. Map, theme and tier come from TRACK_ARENAS.PRIMARY_TECH in
// src/components/towerdefense/unitDifficulty.js. GAMES is worth 0 XP — it is
// what finishing the unit unlocks, not a task the unit pays for, and the in-unit
// tile no longer renders (the games live in the standalone Arcade track and cost
// gold). The mid-game challenge is a Vocab Bolt drawn from this unit's realWords.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('PRIMARY_TECH', 'T07'),
};
