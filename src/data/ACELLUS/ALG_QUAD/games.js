// src/data/ACELLUS/ALG_QUAD/games.js
// The arcade reward (0 XP), as ALG_INEQ: map, theme and tier come from the
// track table in src/components/towerdefense/unitDifficulty.js; the bolt
// questions come from this unit's realWords.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('ACELLUS', 'ALG_QUAD'),
};
