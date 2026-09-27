// src/data/IGCSE_CHEM/M06_4A/sequence.js
// SEQUENCE (Order It) for 6.4 Making Salts: the methods. Each exercise is one
// method, its steps handed over scrambled; the student puts them back in order.
// Only the correct order is authored — src/utils/sequence.js derives the
// scramble (a seeded derangement, the same every time the item opens) and the
// marking, and `checkSequenceItems` (run by `npm run validate`) checks the
// shape. English-only: this track is `bilingual: false`, so there are no
// titleVn / promptVn / textVn / expVn fields, and the validator accepts that.
//
// One exercise per method, every salt FRESH (the book's zinc sulfate, copper(II)
// sulfate, sodium chloride and barium sulfate are taught in the deck):
//   1 acid + excess metal       magnesium sulfate
//   2 acid + excess carbonate   zinc nitrate
//   3 titration                 potassium chloride
//   4 precipitation (Extended)  lead(II) iodide
//   5 choose, then do           copper(II) chloride from copper(II) oxide
//
// Every step carries a word that fixes its place — "until some is left over",
// "the filtrate", "the same volume", "the precipitate" — so the order can be
// reasoned out, not just remembered.
export const sequence = [
  {
    id: 'sq_mgso4',
    title: 'Magnesium sulfate from magnesium',
    prompt: 'Mr Bowen makes crystals of magnesium sulfate from magnesium ribbon and dilute sulfuric acid. Put his steps in order.',
    items: [
      { text: 'Add magnesium ribbon to the dilute sulfuric acid, a piece at a time, until some is left over.' },
      { text: 'Wait until the fizzing stops, so that all of the acid has reacted.' },
      { text: 'Filter the mixture to remove the unreacted magnesium.' },
      { text: 'Heat the filtrate to evaporate some of the water, until the solution is saturated.' },
      { text: 'Leave the saturated solution to cool, so that crystals of magnesium sulfate form.' },
    ],
    expEn: 'React first, with the metal in excess, and wait for the fizzing to stop: that is how you know the acid is used up. Filtering removes the leftover magnesium. Only the filtrate is evaporated, and only until it is saturated — the crystals form as it cools.',
  },
  {
    id: 'sq_znno3',
    title: 'Zinc nitrate from zinc carbonate',
    prompt: 'Zinc carbonate is an insoluble white powder. Put the steps for making zinc nitrate crystals from it in order.',
    items: [
      { text: 'Pour some dilute nitric acid into a beaker.' },
      { text: 'Add zinc carbonate powder, stirring, and watch it fizz.' },
      { text: 'Keep adding until the fizzing stops and some white powder stays undissolved.' },
      { text: 'Filter off the excess zinc carbonate.' },
      { text: 'Evaporate the filtrate until it is saturated, then leave it to cool.' },
    ],
    expEn: 'The acid goes in first, then the carbonate. It fizzes because carbon dioxide is given off. When the fizzing stops and powder is left over, the carbonate is in excess and the acid is used up. The excess is filtered off, and the zinc nitrate solution is evaporated and cooled to crystallise.',
  },
  {
    id: 'sq_kcl',
    title: 'Potassium chloride by titration',
    prompt: 'Potassium chloride is made from potassium hydroxide solution and dilute hydrochloric acid. Put the steps in order.',
    items: [
      { text: 'Use a volumetric pipette to put 25 cm³ of potassium hydroxide solution into a conical flask.' },
      { text: 'Add two drops of thymolphthalein. The solution turns blue.' },
      { text: 'Add hydrochloric acid from a burette, a little at a time, swirling the flask.' },
      { text: 'Stop when the blue colour disappears, and read how much acid was added.' },
      { text: 'Put a fresh 25 cm³ of alkali in a clean flask and add the same volume of acid, with no indicator.' },
      { text: 'Heat the solution to evaporate the water, leaving crystals of potassium chloride.' },
    ],
    expEn: 'The first run, with the indicator, only finds the amounts: the blue disappears when the alkali is just neutralised. The second run mixes exactly those amounts without the indicator, which would otherwise stay in the salt as an impurity. Only then is the water evaporated.',
  },
  {
    id: 'sq_pbi2',
    title: 'Lead(II) iodide by precipitation',
    prompt: 'Lead(II) iodide is insoluble. Put the steps for making a dry sample of it in order.',
    items: [
      { text: 'Dissolve lead(II) nitrate and potassium iodide, each in distilled water, to make two solutions.' },
      { text: 'Mix the two solutions. A bright yellow precipitate forms at once.' },
      { text: 'Filter the mixture, so that the precipitate is trapped in the filter paper.' },
      { text: 'Rinse the precipitate by running distilled water through it.' },
      { text: 'Put the filter paper and precipitate in a warm oven to dry.' },
    ],
    expEn: 'Both starting compounds are soluble (all nitrates, all potassium salts), so they are made into solutions first. Mixing them brings lead ions and iodide ions together, and insoluble lead(II) iodide precipitates. It is filtered off, rinsed to wash away the potassium nitrate solution, and dried gently.',
  },
  {
    id: 'sq_cucl2',
    title: 'Copper(II) chloride: choose, then make',
    prompt: 'You are asked to make crystals of copper(II) chloride. Put the steps — from choosing the reactants to the crystals — in order.',
    items: [
      { text: 'Choose the reactants: copper does not react with dilute acids, so use copper(II) oxide and dilute hydrochloric acid.' },
      { text: 'Warm the acid and add copper(II) oxide, stirring, until some black solid is left over.' },
      { text: 'Filter off the excess copper(II) oxide.' },
      { text: 'Heat the solution to evaporate some of the water, until it is saturated.' },
      { text: 'Leave it to cool, so that crystals of copper(II) chloride form.' },
    ],
    expEn: 'Copper(II) chloride is soluble, and copper metal will not react, so the method is acid + excess insoluble base. The black solid left over shows the oxide is in excess. Filter it off, then evaporate to a saturated solution and cool it to crystallise.',
  },
];
