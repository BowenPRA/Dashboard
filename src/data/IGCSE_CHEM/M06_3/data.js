// src/data/IGCSE_CHEM/M06_3/data.js
// Module 6, Topic Three (6.3): Oxides — book spread 11.5 "Oxides" (pages
// 136–137). English only: this track is not bilingual, so there are no `vn*`
// twins.
//
// An equations unit in the shape of M06_2, with one production engine:
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Equations (SYMBOL_EQ: word equation → balanced symbol
//                      equation, for elements burning and for oxides meeting
//                      acids, water and alkalis) + Practice + Questions +
//                      Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 120 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 90 (78%), both inside the 80% rule the validator enforces. Module
// properties are written out in full (`notes: notes,`) so the audio generator
// never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { symbolEq } from './symbolEq.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_3_DATA = {
  meta: {
    id: 'M06_3',
    title: 'Oxides',
    desc: 'Write equations for metals and non-metals burning in oxygen, show with litmus that metal oxides are bases and non-metal oxides make acids, explain acid rain, and sort oxides into basic, acidic, amphoteric and neutral.',
    track: 'IGCSE_CHEM',
    icon: 'Layers',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'SYMBOL_EQ', dbKey: 'p19', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
      ],
    },
    {
      // The Quiz and the arcade share one gate: both open at 70 XP. GAMES stays
      // 0 XP (a reward the unit unlocks, not a task paid for by it).
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 70,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words — the vocabulary the exam question is written in. English-only
  // (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Oxide', isReal: true,
      def: 'A compound containing oxygen and one other element.',
      sent: 'Magnesium oxide forms when magnesium burns in oxygen.',
    },
    {
      word: 'Vigorous', isReal: true,
      def: 'Fast and strong. A vigorous reaction gives off a lot of heat and light quickly.',
      sent: 'Calcium reacts more vigorously with oxygen than iron does.',
    },
    {
      word: 'Gas jar', isReal: true,
      def: 'A tall glass jar, closed with a glass cover, used to collect a gas or to hold a gas for a reaction.',
      sent: 'The burning sulfur was lowered into a gas jar of oxygen.',
    },
    {
      word: 'Basic oxide', isReal: true,
      def: 'A metal oxide that is a base: it neutralises an acid, giving a salt and water.',
      sent: 'Iron(III) oxide is a basic oxide.',
    },
    {
      word: 'Base', isReal: true,
      def: 'A compound that reacts with an acid to give only a salt and water. Metal oxides and hydroxides are bases.',
      sent: 'Basic oxides belong to the larger group of compounds called bases.',
    },
    {
      word: 'Insoluble', isReal: true,
      def: 'Does not dissolve. An insoluble solid stays as a solid in the liquid.',
      sent: 'Copper(II) oxide is insoluble in water, but it dissolves in dilute acid.',
    },
    {
      word: 'Litmus', isReal: true,
      def: 'An indicator. Acids turn blue litmus red; alkalis turn red litmus blue.',
      sent: 'The solution had no effect on blue litmus, so the acid was gone.',
    },
    {
      word: 'Acidic oxide', isReal: true,
      def: 'A non-metal oxide that dissolves in water to give an acid, and reacts with alkalis.',
      sent: 'Sulfur dioxide is an acidic oxide.',
    },
    {
      word: 'Carbonic acid', isReal: true,
      def: 'The weak acid, H₂CO₃, that forms when carbon dioxide dissolves in water.',
      sent: 'Fizzy drinks contain carbonic acid.',
    },
    {
      word: 'Acid rain', isReal: true,
      def: 'Rain made acidic by oxides of sulfur and nitrogen dissolved in it. It damages stone, trees and lakes.',
      sent: 'Acid rain has worn away the face of the old limestone statue.',
    },
    {
      word: 'Amphoteric oxide', isReal: true,
      def: 'An oxide that reacts with both acids and alkalis. Aluminium oxide and zinc oxide are examples.',
      sent: 'Zinc oxide is an amphoteric oxide.',
    },
    {
      word: 'Sodium aluminate', isReal: true,
      def: 'The compound formed when aluminium oxide reacts with sodium hydroxide solution.',
      sent: 'Aluminium oxide dissolves in hot sodium hydroxide solution, forming sodium aluminate.',
    },
    {
      word: 'Neutral oxide', isReal: true,
      def: 'An oxide that reacts with neither acids nor bases, such as carbon monoxide and dinitrogen oxide.',
      sent: 'Carbon monoxide is a neutral oxide.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spread's questions
  // but with fresh substances. Prompts are plain text — ShortAnswers.jsx does
  // not render $…$ — so formulae are Unicode (SO₂, Al₂O₃).
  shortQA: [
    {
      id: 'sq1',
      question: 'Magnesium oxide is a white powder that does not dissolve in water. Describe how you could use dilute nitric acid and blue litmus paper to show that magnesium oxide is a base.',
      suggestedWords: [['warm', 'heat'], ['stir'], ['indicator']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: test the dilute nitric acid first — it turns blue litmus red.',
        '1 mark: add magnesium oxide to the acid (warm and stir) until no more dissolves.',
        '1 mark: the liquid left has no effect on blue litmus / litmus stays blue, so the acid has been neutralised and the oxide is a base.',
      ],
      modelAnswer: 'First, dip blue litmus paper into the dilute nitric acid: it turns red, which shows the liquid is acidic. Next, add magnesium oxide to the acid a little at a time, warming and stirring, until no more will dissolve. Finally, test the liquid again with blue litmus paper. It stays blue, so there is no acid left. The magnesium oxide has neutralised the acid, which shows that it is a base.',
    },
    {
      id: 'sq2',
      question: 'Sodium is more reactive than iron. Predict how heated sodium would react in a gas jar of oxygen compared with iron wool, name the product, and state what type of oxide it is.',
      suggestedWords: [['reactivity'], ['product'], ['classify']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sodium reacts more vigorously than iron (e.g. bursts into flame), because the more reactive the metal, the more vigorous the reaction.',
        '1 mark: the product is sodium oxide (Na₂O).',
        '1 mark: it is a basic oxide, because sodium is a metal (metals form basic oxides).',
      ],
      modelAnswer: 'Sodium would react more vigorously than iron wool, probably bursting into flame, because the more reactive a metal is, the more vigorously it reacts with oxygen. The product is sodium oxide, Na₂O. Sodium is a metal, and metals form basic oxides, so sodium oxide is a basic oxide.',
    },
    {
      id: 'sq3',
      question: 'Nitrogen dioxide is a brown gas. Explain why it is classed as an acidic oxide, and describe what you would see if a piece of damp blue litmus paper were held in the gas.',
      suggestedWords: [['element'], ['damp', 'moisture'], ['colour']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: nitrogen is a non-metal, and non-metals form acidic oxides.',
        '1 mark: the gas dissolves in the water on the damp paper to give an acid.',
        '1 mark: the blue litmus turns red.',
      ],
      modelAnswer: 'Nitrogen is a non-metal, and non-metals react with oxygen to form acidic oxides, so nitrogen dioxide is an acidic oxide. The damp litmus paper contains water. The nitrogen dioxide dissolves in this water and gives an acid, so the blue litmus paper turns red.',
    },
    {
      id: 'sq4',
      question: 'A town is next to a power station that burns coal containing sulfur. Explain how this leads to acid rain, and give one harmful effect of the acid rain.',
      suggestedWords: [['burn', 'combustion'], ['cloud', 'rain water'], ['environment']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the sulfur in the coal burns to form sulfur dioxide, which escapes into the air.',
        '1 mark: sulfur dioxide is an acidic oxide that dissolves in water in the clouds / rain to form an acid.',
        '1 mark: one effect, e.g. it wears away limestone / stone buildings and statues, kills fish in lakes, or damages trees.',
      ],
      modelAnswer: 'When the coal is burned, the sulfur in it reacts with oxygen to form sulfur dioxide, which goes up the chimney into the air. Sulfur dioxide is an acidic oxide, so it dissolves in the water droplets in the clouds and forms an acid. This falls as acid rain. Acid rain can wear away limestone buildings and statues, and it can make lakes so acidic that the fish die.',
    },
    {
      id: 'sq5',
      question: 'Zinc oxide is described as an amphoteric oxide. Explain what this means, and describe how zinc oxide behaves with dilute hydrochloric acid and with sodium hydroxide solution.',
      suggestedWords: [['react'], ['salt'], ['alkali']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: an amphoteric oxide reacts with both acids and alkalis.',
        '1 mark: with hydrochloric acid, zinc oxide acts as a base, giving a salt (zinc chloride) and water.',
        '1 mark: with sodium hydroxide, zinc oxide acts as an acid / like an acidic oxide (it reacts with / neutralises the alkali).',
      ],
      modelAnswer: 'An amphoteric oxide is one that reacts with both acids and alkalis. When zinc oxide reacts with dilute hydrochloric acid, it acts as a base: it neutralises the acid and gives zinc chloride and water. When it reacts with sodium hydroxide solution, it acts as an acid, like an acidic oxide, because it reacts with the alkali. So zinc oxide can behave as either a base or an acid.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_litmus_evidence',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LITMUS_CUO,
      imageAlt: 'Three beakers. First: dilute hydrochloric acid, in which blue litmus turns red. Second: black copper(II) oxide is added to the acid and warmed; the black solid dissolves until no more will. Third: the blue-green copper(II) chloride solution, with a little black solid left, in which blue litmus stays blue. Below: CuO(s) + 2HCl(aq) → CuCl2(aq) + H2O(l).',
      promptText: 'In the third beaker the blue litmus stays blue, and some black solid is left at the bottom. What do these two observations show?',
      options: [
        { val: 'A', text: 'The oxide dissolved in water and made an alkali' },
        { val: 'B', text: 'The acid has been used up, and the copper(II) oxide was added in excess' },
        { val: 'C', text: 'The copper(II) oxide is an acid, because it dissolved in the acid' },
        { val: 'D', text: 'The litmus did not work, because the solution is coloured' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'Blue litmus no longer turns red, so no acid is left: the base has neutralised it. The black solid left over is copper(II) oxide that could not react, because there was no acid left for it — it was added in excess. The oxide is insoluble in water, so it cannot make an alkali, and nothing in the drawing turns red litmus blue.',
    },
    {
      id: 'diag_2_period3_pair',
      type: 'mcq',
      inlineSvg: DIAGRAMS.PERIOD3,
      imageAlt: 'Seven tiles for the oxides of period 3: Na2O and MgO marked basic; Al2O3 marked amphoteric; SiO2, P4O10, SO2 and Cl2O7 marked acidic. An arrow underneath runs from metals on the left to non-metals on the right.',
      promptText: 'Use the strip. Which statement about magnesium oxide and sulfur dioxide is correct?',
      options: [
        { val: 'A', text: 'Both would neutralise an acid, because both are oxides' },
        { val: 'B', text: 'Both would react with sodium hydroxide, because both are to the left of chlorine' },
        { val: 'C', text: 'Magnesium oxide would neutralise an acid; sulfur dioxide would react with an alkali' },
        { val: 'D', text: 'Magnesium oxide would react with an alkali; sulfur dioxide would neutralise an acid' },
      ],
      correct: 'C',
      expEn: 'Magnesium is a metal on the left of the strip, so magnesium oxide is basic and neutralises acids. Sulfur is a non-metal on the right, so sulfur dioxide is acidic and reacts with alkalis. (D) swaps the two, and being an oxide (A) or being left of chlorine (B) does not decide the kind.',
    },
    {
      id: 'diag_3_acid_rain',
      inlineSvg: DIAGRAMS.ACID_RAIN,
      imageAlt: 'A power station chimney gives off sulfur dioxide and a car exhaust gives off nitrogen oxides. A dashed arrow carries them up to a cloud, where "the oxides dissolve in rain water: acids form". Acid rain falls on a lake (fish die), a tree (damaged) and a stone building (worn away).',
      promptText: 'The diagram shows how acid rain forms. Describe where the two gases come from, explain how they make the rain acidic, and give one effect of the acid rain shown.',
      suggestedWords: [['exhaust'], ['droplets'], ['environment']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sulfur dioxide comes from burning fuel (containing sulfur) in the power station, and nitrogen oxides come from the car engine.',
        '1 mark: they are acidic oxides (of non-metals) that dissolve in the water in the clouds / rain to form acids.',
        '1 mark: one effect shown: fish in lakes die, trees are damaged, or stone buildings are worn away.',
      ],
      modelAnswer: 'The sulfur dioxide comes from the power station, where fuel containing sulfur is burned, and the nitrogen oxides come from the hot engine of the car. Both gases rise into the air. Sulfur and nitrogen are non-metals, so these are acidic oxides: they dissolve in the water droplets in the clouds and form acids, and the rain that falls is acid rain. The acid rain can make a lake so acidic that the fish die; it also damages trees and wears away stone buildings.',
    },
  ],

  notes: notes,
  workbook: workbook,
  symbolEq: symbolEq,
  assessment: assessment,
  games: games,
};
