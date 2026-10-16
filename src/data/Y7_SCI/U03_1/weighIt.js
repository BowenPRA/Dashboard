// src/data/Y7_SCI/U03_1/weighIt.js
// Weigh It (WEIGH_IT, p80) for 3.1 Gravity, Weight and Mass — the formula
// triangle, worked fifteen times up a ladder: weight on Earth (× 10), mass on
// Earth (÷ 10), weight elsewhere (× g), mass from a weight elsewhere (÷ g),
// mass does not change, and two steps (the mass, then the weight there).
//
// An item is the question only; utils/weighIt.js derives the sum, the answer,
// its unit and every slip, and the validator proves each one. Strengths of
// gravity are the deck's PLANET_TABLE (Moon 1.6, Mars 3.7, Venus 8.9, Jupiter
// 25 N/kg). No number repeats a deck check, the Workbook or the quiz.
// No module imports, so scripts can read it on its own.
export const weighIt = {
  title: 'Weigh It',
  titleFr: 'Pèse-le',
  intro: 'Cover the letter you want on the triangle. What is left tells you what to do.',
  introFr: 'Cache la lettre que tu cherches sur le triangle. Ce qui reste te dit quoi faire.',
  levels: {
    1: { en: 'Weight on Earth: m × 10', fr: 'Le poids sur Terre : m × 10' },
    2: { en: 'Mass on Earth: W ÷ 10', fr: 'La masse sur Terre : W ÷ 10' },
    3: { en: 'Weight on other worlds: m × g', fr: 'Le poids sur d’autres astres : m × g' },
    4: { en: 'Mass from a weight on other worlds: W ÷ g', fr: 'La masse à partir d’un poids ailleurs : W ÷ g' },
    5: { en: 'Mass does not change', fr: 'La masse ne change pas' },
    6: { en: 'Two steps: the mass, then the weight', fr: 'Deux étapes : la masse, puis le poids' },
  },
  items: [
    {
      id: 'w1', level: 1, kind: 'weight', m: '3', place: 'earth',
      context: 'A bag of rice has a mass of 3 kg. What does it weigh?',
      contextFr: 'Un sac de riz a une masse de 3 kg. Combien pèse-t-il ?',
    },
    {
      id: 'w2', level: 1, kind: 'weight', m: '42', place: 'earth',
      context: 'Linh has a mass of 42 kg. What is her weight?',
      contextFr: 'Linh a une masse de 42 kg. Quel est son poids ?',
    },
    {
      id: 'w3', level: 1, kind: 'weight', m: '0.5', place: 'earth',
      context: 'A bottle of water has a mass of 0.5 kg. What is its weight?',
      contextFr: 'Une bouteille d’eau a une masse de 0.5 kg. Quel est son poids ?',
    },
    {
      id: 'm1', level: 2, kind: 'mass', W: '30', place: 'earth',
      context: 'A watermelon weighs 30 N. What is its mass?',
      contextFr: 'Une pastèque pèse 30 N. Quelle est sa masse ?',
    },
    {
      id: 'm2', level: 2, kind: 'mass', W: '9', place: 'earth',
      context: 'A pineapple weighs 9 N. What is its mass?',
      contextFr: 'Un ananas pèse 9 N. Quelle est sa masse ?',
    },
    {
      id: 'm3', level: 2, kind: 'mass', W: '12000', place: 'earth',
      context: 'A small car weighs 12 000 N. What is its mass?',
      contextFr: 'Une petite voiture pèse 12 000 N. Quelle est sa masse ?',
    },
    {
      id: 'p1', level: 3, kind: 'weight', m: '50', place: 'moon',
      context: 'An astronaut with a mass of 50 kg stands on the Moon. What is her weight there?',
      contextFr: 'Une astronaute de masse 50 kg est debout sur la Lune. Quel est son poids là-bas ?',
    },
    {
      id: 'p2', level: 3, kind: 'weight', m: '20', place: 'mars',
      context: 'A robot rover has a mass of 20 kg. It drives on Mars. What is its weight there?',
      contextFr: 'Un robot explorateur a une masse de 20 kg. Il roule sur Mars. Quel est son poids là-bas ?',
    },
    {
      id: 'p3', level: 3, kind: 'weight', m: '30', place: 'venus',
      context: 'A space probe with a mass of 30 kg lands on Venus. What is its weight there?',
      contextFr: 'Une sonde spatiale de masse 30 kg se pose sur Vénus. Quel est son poids là-bas ?',
    },
    {
      id: 'q1', level: 4, kind: 'mass', W: '32', place: 'moon',
      context: 'On the Moon, a box of rocks weighs 32 N. What is its mass?',
      contextFr: 'Sur la Lune, une caisse de roches pèse 32 N. Quelle est sa masse ?',
    },
    {
      id: 'q2', level: 4, kind: 'mass', W: '1500', place: 'jupiter',
      context: 'A probe falling towards Jupiter weighs 1500 N there. What is its mass?',
      contextFr: 'Une sonde qui tombe vers Jupiter y pèse 1500 N. Quelle est sa masse ?',
    },
    {
      id: 's1', level: 5, kind: 'same', m: '45', from: 'earth', place: 'moon',
      context: 'A space suit has a mass of 45 kg on Earth. An astronaut takes it to the Moon. What is its mass there?',
      contextFr: 'Une combinaison spatiale a une masse de 45 kg sur Terre. Un astronaute l’emporte sur la Lune. Quelle est sa masse là-bas ?',
    },
    {
      id: 's2', level: 5, kind: 'same', m: '8', from: 'earth', place: 'mars',
      context: 'A tool kit has a mass of 8 kg on Earth. It goes to Mars. What is its mass on Mars?',
      contextFr: 'Une caisse à outils a une masse de 8 kg sur Terre. Elle part sur Mars. Quelle est sa masse sur Mars ?',
    },
    {
      id: 't1', level: 6, kind: 'two', W: '600', from: 'earth', place: 'moon',
      context: 'A student weighs 600 N on Earth. What would she weigh on the Moon? Find her mass first.',
      contextFr: 'Une élève pèse 600 N sur Terre. Combien pèserait-elle sur la Lune ? Trouve d’abord sa masse.',
    },
    {
      id: 't2', level: 6, kind: 'two', W: '400', from: 'earth', place: 'jupiter',
      context: 'A dog weighs 400 N on Earth. What would it weigh on Jupiter? Find its mass first.',
      contextFr: 'Un chien pèse 400 N sur Terre. Combien pèserait-il sur Jupiter ? Trouve d’abord sa masse.',
    },
  ],
};
