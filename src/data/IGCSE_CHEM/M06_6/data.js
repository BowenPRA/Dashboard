// src/data/IGCSE_CHEM/M06_6/data.js
// Module 6, Topic Six (6.6): Group 1: The Alkali Metals — book spread 12.2
// "Group I: the alkali metals" (pages 148–149), with point 4 of 12.4 (why
// reactivity increases down Group I). English only: this track is not
// bilingual, so there are no `vn*` twins.
//
// A trends unit: the family's properties, the word TREND and the value that
// does not fit, what you see on water, the three reactions as equations, and
// (Extended) why the family is so reactive and why reactivity rises down it.
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Equations (SYMBOL_EQ: word equation → balanced symbol
//                      equation, for water, chlorine, oxygen and an oxide
//                      dissolving) + Practice + Questions + Source Analysis
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

export const M06_6_DATA = {
  meta: {
    id: 'M06_6',
    title: 'Group 1: The Alkali Metals',
    desc: 'Describe the alkali metals and the trends in their properties, say what you see when they meet water, write their reactions with water, chlorine and oxygen, and explain why they are so reactive — and more reactive down the group.',
    track: 'IGCSE_CHEM',
    icon: 'Zap',
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
      word: 'Alkali metal', isReal: true,
      def: 'An element in Group I of the Periodic Table, such as lithium, sodium or potassium. Its atoms have one outer-shell electron.',
      sent: 'Potassium is an alkali metal, so it is kept under oil.',
    },
    {
      word: 'Outer shell', isReal: true,
      def: 'The electron shell furthest from the nucleus. The electrons in it take part in reactions.',
      sent: 'A sodium atom has one electron in its outer shell.',
    },
    {
      word: 'Soft', isReal: true,
      def: 'Easy to cut, press or scratch. The alkali metals are soft enough to cut with a knife.',
      sent: 'Lithium is so soft that the teacher cut it with a knife.',
    },
    {
      word: 'Density', isReal: true,
      def: 'How heavy a substance is for its size: its mass divided by its volume, measured in g/cm³.',
      sent: 'Lithium has the lowest density of all the metals.',
    },
    {
      word: 'Melting point', isReal: true,
      def: 'The temperature at which a solid turns into a liquid.',
      sent: 'Caesium has a melting point of only 29 °C.',
    },
    {
      word: 'Trend', isReal: true,
      def: 'A gradual change in a property, in one direction, as you go down a group or across a period.',
      sent: 'One trend in Group I is that the melting point decreases.',
    },
    {
      word: 'Vigorous', isReal: true,
      def: 'Fast and strong. A vigorous reaction fizzes hard, gets hot, or bursts into flame.',
      sent: 'Potassium reacts more vigorously with water than sodium does.',
    },
    {
      word: 'Reactivity', isReal: true,
      def: 'How easily and how quickly an element reacts. In Group I, reactivity increases down the group.',
      sent: 'Rubidium has a higher reactivity than potassium.',
    },
    {
      word: 'Alkali', isReal: true,
      def: 'A base that dissolves in water. Its solution contains hydroxide ions, OH⁻, and turns universal indicator purple.',
      sent: 'Sodium hydroxide is an alkali.',
    },
    {
      word: 'Universal indicator', isReal: true,
      def: 'A mixture of dyes that changes colour with pH: red in a strong acid, green when neutral, purple in a strong alkali.',
      sent: 'The universal indicator in the trough turned purple.',
    },
    {
      word: 'Hydroxide', isReal: true,
      def: 'A compound containing the hydroxide ion, OH⁻. An alkali metal forms its hydroxide when it reacts with water.',
      sent: 'Lithium reacts with water to form lithium hydroxide.',
    },
    {
      word: 'Chloride', isReal: true,
      def: 'A compound of an element with chlorine. A metal chloride contains the chloride ion, Cl⁻.',
      sent: 'Potassium chloride is a white solid.',
    },
    {
      word: 'Oxide', isReal: true,
      def: 'A compound of an element with oxygen. The oxides of the alkali metals dissolve to give alkaline solutions.',
      sent: 'Sodium burns in oxygen to form sodium oxide.',
    },
    {
      word: 'Ion', isReal: true,
      def: 'An atom that has lost or gained electrons, so it carries a charge. The alkali metals form ions with a charge of 1+.',
      sent: 'A sodium atom loses one electron to become a sodium ion, Na⁺.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spread's questions
  // but with fresh metals and fresh situations. Prompts are plain text —
  // ShortAnswers.jsx does not render $…$ — so formulae and charges are Unicode.
  shortQA: [
    {
      id: 'sq1',
      question: 'A teacher drops a small piece of lithium into a trough of water that contains universal indicator. Describe two things the class would see, and explain why the colour of the indicator changes.',
      suggestedWords: [['surface'], ['product'], ['solution']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the lithium floats / moves about on the surface of the water.',
        '1 mark: fizzing / bubbles of gas (hydrogen) are seen.',
        '1 mark: the indicator turns purple (or blue) because lithium hydroxide forms, which is an alkali / the solution becomes alkaline.',
      ],
      modelAnswer: 'The lithium floats and moves about on the surface of the water, and it fizzes as bubbles of hydrogen gas are given off. The indicator turns from green to purple, because the reaction makes lithium hydroxide, which is an alkali, so the solution becomes alkaline.',
    },
    {
      id: 'sq2',
      question: 'Caesium and lithium are at opposite ends of Group I, yet both react with water to give a hydroxide and hydrogen. Explain, in terms of electrons, why they react in a similar way.',
      suggestedWords: [['atom'], ['shell'], ['arrangement', 'configuration']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: both atoms have one electron in their outer shell.',
        '1 mark: atoms with the same number of outer-shell electrons react in a similar way.',
        '1 mark: in their reactions both atoms lose that one electron / both form ions with a 1+ charge (Li⁺, Cs⁺).',
      ],
      modelAnswer: 'Lithium and caesium are both in Group I, so each of their atoms has just one electron in its outer shell. Atoms with the same number of outer-shell electrons react in a similar way. When they react, both atoms lose that single outer electron and form ions with a charge of 1+, Li⁺ and Cs⁺, so they give the same kind of products.',
    },
    {
      id: 'sq3',
      question: 'Caesium is much more reactive than sodium. Explain why, in terms of the electron shells in their atoms.',
      suggestedWords: [['nucleus'], ['shell'], ['electron']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: caesium has more electron shells, so its outer electron is further from the nucleus.',
        '1 mark: the (positive) nucleus attracts / pulls the outer electron less strongly in caesium.',
        '1 mark: so caesium loses its outer electron more easily, and losing it is how an alkali metal reacts.',
      ],
      modelAnswer: 'A caesium atom has more electron shells than a sodium atom, so its single outer electron is much further from the nucleus. The positive nucleus attracts that electron, but the further away it is, the weaker the pull. So caesium loses its outer electron more easily than sodium does, and because alkali metals react by losing this electron, caesium is more reactive.',
    },
    {
      id: 'sq4',
      question: 'A technician finds an old jar of potassium whose oil has leaked away. The lumps are now covered in a dull white crust. Explain what has happened, and why potassium is normally stored under oil.',
      suggestedWords: [['air', 'atmosphere'], ['surface'], ['product']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the potassium has reacted with oxygen (and water vapour) in the air.',
        '1 mark: the white crust is the product of that reaction (potassium oxide / hydroxide), which has formed on the surface.',
        '1 mark: oil keeps air and water away from the metal, so it cannot react.',
      ],
      modelAnswer: 'Without its oil, the potassium was exposed to the air. Potassium is very reactive, so it reacted with the oxygen and water vapour in the air, and the white crust is the product of that reaction, potassium oxide and hydroxide, covering the surface. Potassium is normally stored under oil because the oil keeps oxygen and water away from the metal, so it cannot react.',
    },
    {
      id: 'sq5',
      question: 'Potassium is heated and plunged into a gas jar of oxygen. The white powder that forms is shaken with water and a few drops of universal indicator. Name the powder, and explain what happens to the indicator.',
      suggestedWords: [['dissolve'], ['solution'], ['pH']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the powder is potassium oxide.',
        '1 mark: it dissolves in water to give an alkaline solution (of potassium hydroxide).',
        '1 mark: so the indicator turns purple (or blue) / shows a pH above 7.',
      ],
      modelAnswer: 'Potassium burns fiercely in oxygen to form potassium oxide, the white powder. Potassium oxide dissolves in water and gives an alkaline solution of potassium hydroxide. Because the solution is alkaline, with a pH above 7, the universal indicator turns purple.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_liquid_at_45',
      type: 'mcq',
      inlineSvg: DIAGRAMS.MP_BARS,
      imageAlt: 'A bar chart of the melting points of the Group I metals: lithium 181 °C, sodium 98 °C, potassium 63 °C, rubidium 39 °C, caesium 29 °C, with an arrow showing that melting point decreases down the group.',
      promptText: 'On a very hot day, a sealed store room reaches 45 °C. Using the chart, which of these metals would be LIQUID in the store room?',
      options: [
        { val: 'A', text: 'Only caesium' },
        { val: 'B', text: 'Potassium, rubidium and caesium' },
        { val: 'C', text: 'Rubidium and caesium' },
        { val: 'D', text: 'None of them — metals are always solid' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'A metal is liquid when the temperature is above its melting point. 45 °C is above rubidium\'s 39 °C and caesium\'s 29 °C, so both have melted. Potassium melts at 63 °C, so it is still solid — and caesium is not the only one below 45 °C.',
    },
    {
      id: 'diag_2_shell_pull',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SHELL_PULL,
      imageAlt: 'A sodium atom with three electron shells (2,8,1) and a potassium atom with four (2,8,8,1). In each, a dashed line shows the pull of the nucleus on the single outer electron; the line is longer in potassium, whose outer electron is further out.',
      promptText: 'What does the diagram show about why potassium is more reactive than sodium?',
      options: [
        { val: 'A', text: 'Potassium has more outer-shell electrons to lose' },
        { val: 'B', text: 'Potassium\'s nucleus pulls its outer electron more strongly' },
        { val: 'C', text: 'Potassium already has a full outer shell' },
        { val: 'D', text: 'Potassium\'s outer electron is further from the nucleus, so it is pulled less and lost more easily' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'Both atoms have ONE outer electron, and neither has a full outer shell. The diagram shows potassium\'s outer electron one shell further out, so the pull of the nucleus on it is weaker — it is lost more easily, which makes potassium more reactive.',
    },
    {
      id: 'diag_3_three_on_water',
      inlineSvg: DIAGRAMS.THREE_WATER,
      imageAlt: 'Three troughs of water with universal indicator. Lithium floats, moves about and fizzes steadily. Sodium melts into a silver ball, shoots across the water and fizzes hard. Potassium melts and shoots across the water, and the gas catches fire with a lilac flame. An arrow says reactivity increases down the group; in all three the indicator turns purple.',
      promptText: 'The diagram shows lithium, sodium and potassium reacting with water that contains universal indicator. Describe the trend in reactivity, give one observation from the diagram that is evidence for it, and name the products when potassium reacts with water.',
      suggestedWords: [['vigorous'], ['evidence'], ['compare']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: reactivity increases from lithium to sodium to potassium / down the group.',
        '1 mark: a correct observation as evidence, e.g. only potassium\'s gas catches fire (lilac flame); sodium melts into a ball but lithium only fizzes.',
        '1 mark: the products are potassium hydroxide and hydrogen.',
      ],
      modelAnswer: 'Reactivity increases down the group, from lithium to sodium to potassium. The evidence is in what you see: lithium only floats and fizzes, sodium gives out enough heat to melt into a silver ball that shoots across the water, and potassium gives out so much heat that the gas catches fire with a lilac flame. When potassium reacts with water, the products are potassium hydroxide, which turns the indicator purple, and hydrogen.',
    },
  ],

  notes: notes,
  workbook: workbook,
  symbolEq: symbolEq,
  assessment: assessment,
  games: games,
};
