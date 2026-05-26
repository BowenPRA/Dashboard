// src/components/towerdefense/wavePresets.js

export const MAP_LAYOUTS = {
  WAVE: {
    rows: 10,
    cols: 15,
    path: [
      [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
    ]
  },
  STRAIGHT: {
    rows: 10,
    cols: 15,
    path: [
      [5, 0], [5, 14]
    ]
  },
  SPIRAL: {
    rows: 10,
    cols: 15,
    // Winds perfectly inward leaving exactly 1 tactical tile between lanes
    path: [
      [1, 0], [1, 13], [8, 13], [8, 2], [3, 2], 
      [3, 11], [6, 11], [6, 4], [4, 4], [4, 9], [5, 9]
    ]
  }
};

export const WAVE_PRESETS = {
  SET_1: [
    // --- EARLY GAME (1-10) --- 
    [{ type: 'ANT',  count: 8,  interval: 1500 }],
    [{ type: 'ANT',  count: 12, interval: 1200 }],
    [{ type: 'ANT',  count: 10, interval: 1000 }, { type: 'WASP', count: 5,  interval: 800 }],
    [{ type: 'WASP', count: 12, interval: 700  }],
    [{ type: 'ANT',  count: 15, interval: 600  }, { type: 'BEETLE', count: 1,  interval: 2000 }],
    [{ type: 'ANT',  count: 20, interval: 800  }, { type: 'WASP', count: 8,  interval: 600 }],
    [{ type: 'BEETLE', count: 3,  interval: 1500 }, { type: 'WASP', count: 8,  interval: 500 }],
    [{ type: 'ANT',  count: 25, interval: 400  }],
    [{ type: 'WASP', count: 20, interval: 400  }, { type: 'BEETLE', count: 3,  interval: 1000 }],
    [{ type: 'BEETLE', count: 5,  interval: 1000 }, { type: 'QUEEN',   count: 1,  interval: 3000 }],
    
    // --- MID GAME (11-20) ---
    [{ type: 'ANT',  count: 35, interval: 350  }],
    [{ type: 'WASP', count: 25, interval: 300  }, { type: 'BEETLE', count: 6,  interval: 1000 }],
    [{ type: 'ANT',  count: 20, interval: 300  }, { type: 'WASP', count: 20, interval: 250 }],
    [{ type: 'BEETLE', count: 10, interval: 1000 }],
    [{ type: 'WASP', count: 30, interval: 200  }, { type: 'QUEEN',   count: 1,  interval: 2000 }],
    [{ type: 'ANT',  count: 40, interval: 250  }, { type: 'BEETLE', count: 8,  interval: 800 }],
    [{ type: 'WASP', count: 40, interval: 200  }],
    [{ type: 'BEETLE', count: 18, interval: 600  }],
    [{ type: 'ANT',  count: 30, interval: 200  }, { type: 'WASP', count: 30, interval: 200 }],
    [{ type: 'BEETLE', count: 15, interval: 500  }, { type: 'QUEEN',   count: 3,  interval: 1500 }],

    // --- LATE GAME ESCALATION (21-30) ---
    [{ type: 'ANT',  count: 45, interval: 200  }, { type: 'WASP', count: 25, interval: 250 }],
    [{ type: 'WASP', count: 35, interval: 200  }, { type: 'BEETLE', count: 15, interval: 600 }],
    [{ type: 'ANT',  count: 50, interval: 150  }],
    [{ type: 'BEETLE', count: 20, interval: 450  }, { type: 'QUEEN',   count: 2,  interval: 2000 }],
    [{ type: 'GIANT_ANT', count: 1, interval: 2000 }], 
    [{ type: 'QUEEN',   count: 4,  interval: 2000 }],
    [{ type: 'BEETLE', count: 30, interval: 400  }],
    [{ type: 'ANT',  count: 65, interval: 100  }, { type: 'WASP', count: 35, interval: 150 }],
    [{ type: 'WASP', count: 50, interval: 150  }, { type: 'QUEEN',   count: 4,  interval: 1500 }],
    [{ type: 'BEETLE', count: 25, interval: 350  }, { type: 'QUEEN',   count: 5,  interval: 1800 }],

    // --- THE GAUNTLET (31-40) ---
    [{ type: 'ANT',  count: 75, interval: 100  }],
    [{ type: 'WASP', count: 65, interval: 120  }],
    [{ type: 'BEETLE', count: 35, interval: 300  }],
    [{ type: 'ANT',  count: 55, interval: 100  }, { type: 'WASP', count: 55, interval: 100 }],
    [{ type: 'QUEEN',   count: 6,  interval: 1500 }, { type: 'BEETLE', count: 20, interval: 500 }],
    [{ type: 'WASP', count: 70, interval: 100  }, { type: 'QUEEN',   count: 3,  interval: 2000 }],
    [{ type: 'BEETLE', count: 45, interval: 250  }],
    [{ type: 'ANT',  count: 90, interval: 80   }],
    [{ type: 'WASP', count: 60, interval: 120  }, { type: 'BEETLE', count: 30, interval: 300 }],
    [{ type: 'QUEEN',   count: 8,  interval: 1200 }, { type: 'WASP', count: 40, interval: 200 }],

    // --- BRUTAL FINAL WAVES (41-50) ---
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 40, interval: 150 }],
    [{ type: 'BEETLE', count: 55, interval: 250  }],
    [{ type: 'WASP', count: 85, interval: 100  }],
    [{ type: 'QUEEN',   count: 10, interval: 1000 }],
    [{ type: 'ANT',  count: 120,interval: 70   }],
    [{ type: 'WASP', count: 95, interval: 90   }, { type: 'BEETLE', count: 25, interval: 400 }],
    [{ type: 'BEETLE', count: 60, interval: 200  }, { type: 'QUEEN',   count: 6,  interval: 1500 }],
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 90, interval: 80  }],
    [{ type: 'BEETLE', count: 70, interval: 180  }],
    [{ type: 'GIANT_ANT', count: 2, interval: 3000 }, { type: 'QUEEN', count: 5, interval: 1500 }, { type: 'BEETLE', count: 25, interval: 350 }, { type: 'WASP', count: 30, interval: 200 }]
  ],

  // --- INFINITE QUADRATIC SCALING (51+) ---
  INFINITE_GENERATOR: (waveIndex) => {
    // Exact Override Requirement
    if (waveIndex === 67) {
      return [{ type: 'GIANT_ANT', count: 67, interval: 350 }];
    }

    const x = waveIndex - 50; 
    const linear = x;
    const quad = Math.pow(x, 2);

    const wave = [
      { 
        type: 'ANT',  
        count: Math.floor(Math.min(1200, 80 + (10 * linear) + (0.5 * quad))), 
        interval: Math.max(15, 100 - (linear * 2) - (quad * 0.05)) 
      },
      { 
        type: 'WASP', 
        count: Math.floor(Math.min(900, 60 + (8 * linear) + (0.4 * quad))), 
        interval: Math.max(20, 120 - (linear * 2.5) - (quad * 0.05)) 
      },
      { 
        type: 'BEETLE', 
        count: Math.floor(Math.min(600, 40 + (5 * linear) + (0.25 * quad))),  
        interval: Math.max(40, 250 - (linear * 3) - (quad * 0.1)) 
      },
      { 
        type: 'QUEEN',   
        count: Math.floor(Math.min(200, 10 + (1.5 * linear) + (0.1 * quad))),     
        interval: Math.max(80, 1000 - (linear * 15) - (quad * 0.5)) 
      }
    ];

    if (waveIndex >= 55 && waveIndex % 5 === 0) {
      const bossTier = (waveIndex - 50) / 5; 
      const broodCount = Math.floor(Math.min(75, 2 + bossTier + (Math.pow(bossTier, 2) * 0.5)));
      wave.push({ 
        type: 'GIANT_ANT', 
        count: broodCount, 
        interval: Math.max(400, 4000 - (quad * 2)) 
      });
    }

    return wave;
  }
};