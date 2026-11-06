// src/data/Y7_SCI/U03_6/fromTo.js
// From… To… (ENERGY_CHANGE, p90): sixteen items in six levels. The science
// of each scene — its diagram, its traps — is in utils/energyChangeData.js;
// an item only says which scene, and how it is asked. Levels 1–2 walk every
// stage; from level 3 an item is drawn in one go (one Check), and the first
// item of a new kind (the TV, the power station, the ice, the phone) walks.
// The pictures are this unit's (scenes.js), passed in data.js.
export const fromTo = {
  title: 'From… To…',
  titleFr: 'De… À…',
  intro: 'Draw the energy-change diagram for each event or process: where the energy starts, and what it changes into. From level 3 you draw it in one go.',
  introFr: 'Dessine le schéma de transformation de chaque événement ou processus : où l’énergie commence, et en quoi elle se transforme. À partir du niveau 3, tu le dessines d’un coup.',
  levels: {
    1: { en: 'One change, step by step', fr: 'Un changement, pas à pas' },
    2: { en: 'One change: watch for the traps', fr: 'Un changement : attention aux pièges' },
    3: { en: 'Draw it in one go', fr: 'Dessine-le d’un coup' },
    4: { en: 'Two arrows from one box', fr: 'Deux flèches depuis une case' },
    5: { en: 'Chains', fr: 'Des chaînes' },
    6: { en: 'Heat, and a chain with two arrows', fr: 'La chaleur, et une chaîne à deux flèches' },
  },
  items: [
    { id: 'k1', level: 1, kind: 'one', scene: 'kettle' },
    { id: 'k2', level: 1, kind: 'one', scene: 'apple' },
    { id: 'k3', level: 2, kind: 'one', scene: 'candle' },
    { id: 'k4', level: 2, kind: 'one', scene: 'bow' },
    { id: 'k5', level: 2, kind: 'one', scene: 'charging' },
    { id: 'q1', level: 3, kind: 'one', scene: 'solar' },
    { id: 'q2', level: 3, kind: 'one', scene: 'drum' },
    { id: 'r1', level: 3, kind: 'read', diagram: ['gravitational', 'kinetic'], options: ['bird', 'book', 'bow'] },
    { id: 'b1', level: 4, kind: 'branch', scene: 'tv', walk: true },
    { id: 'b2', level: 4, kind: 'branch', scene: 'hairdryer' },
    { id: 'c1', level: 5, kind: 'chain', scene: 'powerStation', walk: true },
    { id: 'c2', level: 5, kind: 'chain', scene: 'dam' },
    { id: 'c3', level: 5, kind: 'chain', scene: 'windLamp' },
    { id: 'h1', level: 6, kind: 'heat', scene: 'iceHand', walk: true },
    { id: 'h2', level: 6, kind: 'heat', scene: 'soup' },
    { id: 'x1', level: 6, kind: 'mixed', scene: 'phone', walk: true },
  ],
};
