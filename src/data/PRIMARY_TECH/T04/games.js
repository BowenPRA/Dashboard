// src/data/PRIMARY_TECH/T04/games.js
// The arcade reward. Map, theme and tier come from TRACK_ARENAS.PRIMARY_TECH in
// src/components/towerdefense/unitDifficulty.js. GAMES is worth 0 XP — what
// finishing the unit unlocks, not a task the unit pays for.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('PRIMARY_TECH', 'T04'),
};
