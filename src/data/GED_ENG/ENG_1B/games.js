// src/data/GED/ENG_1A/games.js
import { WAVE_PRESETS } from '../../../components/towerdefense/wavePresets';

export const games = {
  gameConfig: {
    themeId: 'RANDOM', // Option 5: Triggers the randomized map selector
    layout: {
      rows: 10,
      cols: 15,
      path: [
        [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
      ]
    },
    allowedTowers: ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN'],
    waves: WAVE_PRESETS.SET_1,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR
  }
};