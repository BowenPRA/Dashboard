// src/data/COORD_SCI/B11_1/games.js
// The arcade reward. Map, theme and tier come from TRACK_LEVELS.COORD_SCI in
// src/components/towerdefense/unitDifficulty.js ("The Pollen Drift"). GAMES is
// worth 0 XP — it is what the unit unlocks, beside the quiz. The mid-game
// challenge is a Vocab Bolt from this unit's realWords.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('COORD_SCI', 'B11_1'),
};
