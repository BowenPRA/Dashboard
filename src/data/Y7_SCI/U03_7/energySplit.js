// src/data/Y7_SCI/U03_7/energySplit.js
// Where Did It Go? (ENERGY_SPLIT, p91) for 3.7 Where Does Energy Go? — the
// deck's three commands, one device at a time: SORT IT (build the
// energy-change diagram), COUNT IT (useful + wasted = what goes in), CHASE IT
// (where the wasted energy goes, and whether it comes back).
//
// An item is the question only; utils/energySplit.js derives the stages, the
// chips, every answer and every named slip from the device tables
// (utils/energySplitData.js), and utils/energySplitCheck.js proves each item in
// the validator. The pictures are this unit's DEV_* drawings, added in data.js,
// so this file has no imports and scripts can read it alone.
//
// Fourteen items, six levels. Levels 1–2 walk every stage; from level 3 a round
// opens quick (the whole diagram and one number, one Check). The same-light
// rounds (level 5) always walk: the question turns round.
export const energySplit = {
  title: 'Where Did It Go?',
  titleFr: 'Où est-elle partie ?',
  intro: 'Sort it, count it, chase it. For each one: where does the energy come from, what do we want, and what is wasted? Then count the joules, and follow the wasted energy.',
  introFr: 'Trie, compte, poursuis. Pour chacun : d’où vient l’énergie, que veut-on, et qu’est-ce qui est gaspillé ? Puis compte les joules, et suis l’énergie gaspillée.',
  levels: {
    1: { en: 'Sort it', fr: 'Trie-la' },
    2: { en: 'Count it: 100 J', fr: 'Compte-la : 100 J' },
    3: { en: 'What do we want?', fr: 'Que veut-on ?' },
    4: { en: 'Bigger numbers', fr: 'De plus grands nombres' },
    5: { en: 'The same light', fr: 'La même lumière' },
    6: { en: 'Chase it', fr: 'Poursuis-la' },
  },
  items: [
    { id: 'c1', level: 1, device: 'candle', chase: 'where' },
    { id: 'c2', level: 1, device: 'radio' },
    { id: 'm1', level: 2, device: 'motorbike', total: 100, chase: 'recover' },
    { id: 'm2', level: 2, device: 'lampB', total: 100 },
    { id: 'q1', level: 3, device: 'toaster' },
    { id: 'q2', level: 3, device: 'charger' },
    { id: 'q3', level: 3, device: 'cyclist' },
    { id: 'n1', level: 4, device: 'lampA', total: 200, ask: 'wasted' },
    { id: 'n2', level: 4, device: 'kettle', total: 1000, ask: 'wasted', chase: 'recover' },
    { id: 'i1', level: 5, device: 'lampB', ask: 'in', useful: 15, sort: false },
    { id: 'p1', level: 5, kind: 'pair', a: 'lampA', b: 'lampB', useful: 15 },
    { id: 'f1', level: 6, device: 'fire', total: 1000, ask: 'wasted', chase: 'where' },
    { id: 's1', level: 6, device: 'stairs', total: 1000, ask: 'useful' },
    { id: 'b1', level: 6, device: 'ball', total: 100, ask: 'wasted', sort: false, chase: 'where' },
  ],
};
