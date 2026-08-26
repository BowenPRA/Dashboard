// src/data/GED_MATH/MATH_1C/games.js
//
// The arena comes from the track and the difficulty tier from the unit id — see
// src/components/towerdefense/unitDifficulty.js. Pass overrides as a third
// argument only to break the pattern for this one unit.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('GED_MATH', 'MATH_1C')
};
