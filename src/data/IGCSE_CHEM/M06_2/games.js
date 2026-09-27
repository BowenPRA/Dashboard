// src/data/IGCSE_CHEM/M06_2/games.js
// The arcade reward. The map/theme/tier come from the per-unit campaign table in
// src/components/towerdefense/unitDifficulty.js (TRACK_LEVELS.IGCSE_CHEM). GAMES
// is worth 0 XP — it is what finishing the unit unlocks, sharing Gate 2 with the
// quiz. The mid-game challenge is a Vocab Bolt drawn from this unit's realWords.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('IGCSE_CHEM', 'M06_2'),
};
