// src/data/Y7_SCI/U03_5/energySpot.js
// Name That Energy (ENERGY_SPOT, p89) — the 14 items, six levels. Each thing
// or pin names only its CLUE (utils/energySpotData.js CLUES); the energy,
// store or transfer, which stores it has and whether they last are derived.
// data.js adds the pictures (spotArt.js), the scenes with their pin positions,
// and the eight action poses for the cards.
//
//   1–2  one thing, every stage walked: Look → Name → Store or transfer
//   3    one thing, quick: the name and the family together
//   4    scenes: Question 1's circuit; Mr Bowen's desk
//   5    every store a falling rock has; how long a hot bath and a dam last
//   6    the book's bus going uphill (8 pins); every store of a hot pie up high
export const energySpot = {
  title: 'Name That Energy',
  titleFr: 'Quelle énergie ?',
  intro: 'Find the clue, name the energy, and say if it is a store or a transfer. A wrong answer tells you why: try again.',
  introFr: 'Trouve l’indice, nomme l’énergie, et dis si c’est une réserve ou un transfert. Une mauvaise réponse te dit pourquoi : réessaie.',
  levels: {
    1: { en: 'Find the clue', fr: 'Trouve l’indice' },
    2: { en: 'More clues', fr: 'D’autres indices' },
    3: { en: 'Name it fast', fr: 'Nomme-la vite' },
    4: { en: 'Pictures with pins', fr: 'Des images avec repères' },
    5: { en: 'Every store · how long?', fr: 'Toutes les réserves · combien de temps ?' },
    6: { en: 'The bus going uphill', fr: 'Le bus qui monte' },
  },
  items: [
    { id: 'r1', level: 1, kind: 'one', pic: 'rice', clue: 'fuel', en: 'A bowl of rice', fr: 'Un bol de riz' },
    { id: 'r2', level: 1, kind: 'one', pic: 'waterTower', clue: 'high', en: 'Water in a tank, high up on a tower', fr: 'De l’eau dans un réservoir, en haut d’une tour' },
    { id: 'r3', level: 2, kind: 'one', pic: 'drum', clue: 'vibrating', en: 'A drum being hit', fr: 'Un tambour qu’on frappe' },
    { id: 'r4', level: 2, kind: 'one', pic: 'spring', clue: 'stretched', en: 'A spring squashed under a heavy block', fr: 'Un ressort écrasé sous un bloc lourd' },
    { id: 'q1', level: 3, kind: 'one', pic: 'battery', clue: 'fuel', tags: ['battery'], en: 'Two batteries', fr: 'Deux piles' },
    { id: 'q2', level: 3, kind: 'one', pic: 'car', clue: 'moving', en: 'A car driving along a road', fr: 'Une voiture qui roule sur une route' },
    { id: 'q3', level: 3, kind: 'one', pic: 'bow', clue: 'stretched', en: 'A bow pulled back, ready to shoot', fr: 'Un arc tendu, prêt à tirer' },
    {
      id: 's1', level: 4, kind: 'scene', scene: 'circuit',
      pins: [
        { id: 'battery', clue: 'fuel', tags: ['battery'], en: 'The battery', fr: 'La pile' },
        { id: 'wires', clue: 'current', en: 'The wires', fr: 'Les fils' },
        { id: 'bulb', clue: 'luminous', en: 'The bulb, lit up', fr: 'L’ampoule allumée' },
      ],
    },
    {
      id: 's2', level: 4, kind: 'scene', scene: 'desk',
      pins: [
        { id: 'water', clue: 'hot', en: 'The water in the kettle, just boiled', fr: 'L’eau de la bouilloire, qui vient de bouillir' },
        { id: 'lamp', clue: 'luminous', en: 'The lamp, switched on', fr: 'La lampe allumée' },
        { id: 'cable', clue: 'current', en: 'The cable charging the phone', fr: 'Le câble qui charge le téléphone' },
        { id: 'banana', clue: 'fuel', en: 'Mr Bowen’s banana', fr: 'La banane de M. Bowen' },
      ],
    },
    { id: 'k1', level: 5, kind: 'stores', pic: 'fallingRock', clues: ['moving', 'high'], en: 'A rock falling off a cliff', fr: 'Un rocher qui tombe d’une falaise' },
    { id: 'l1', level: 5, kind: 'lasts', pic: 'hotBath', clue: 'hot', en: 'A hot bath', fr: 'Un bain chaud' },
    { id: 'l2', level: 5, kind: 'lasts', pic: 'dam', clue: 'high', en: 'Water held up behind a dam', fr: 'L’eau retenue en haut d’un barrage' },
    {
      id: 's3', level: 6, kind: 'scene', scene: 'bus',
      pins: [
        { id: 'moving', clue: 'moving', en: 'The bus, driving along', fr: 'Le bus, qui roule' },
        { id: 'headlights', clue: 'luminous', en: 'The headlights', fr: 'Les phares' },
        { id: 'exhaust', clue: 'vibrating', en: 'The noisy engine', fr: 'Le moteur bruyant' },
        { id: 'engine', clue: 'hot', en: 'The hot engine', fr: 'Le moteur chaud' },
        { id: 'fuel', clue: 'fuel', en: 'The fuel in the tank', fr: 'Le carburant dans le réservoir' },
        { id: 'wires', clue: 'current', en: 'The wires to the lights', fr: 'Les fils vers les phares' },
        { id: 'tyres', clue: 'stretched', en: 'The tyres, squashed flat', fr: 'Les pneus, écrasés' },
        { id: 'hill', clue: 'high', en: 'The bus, high up the hill', fr: 'Le bus, en haut de la colline' },
      ],
    },
    { id: 'k2', level: 6, kind: 'stores', pic: 'pieShelf', clues: ['hot', 'fuel', 'high'], en: 'A hot pie on a high shelf', fr: 'Une tarte chaude sur une étagère haute' },
  ],
};
