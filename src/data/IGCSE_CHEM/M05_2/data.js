// src/data/IGCSE_CHEM/M05_2/data.js
// M05_2 Bond Energies & Calculating ΔH — IGCSE Chemistry (Wolsey Hall), Module 5,
// built from book spread 8.3 "Calculating enthalpy changes" (pages 96–97). The
// track's CALCULATION exemplar: one method, worked in the same order every time.
// English only: IGCSE_CHEM is not bilingual, so there are no `vn*` twins.
//
// Gate structure follows the track guide (docs/igcse-chem-course.md §3):
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Bond Ledger + Practice + Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// The production task is BOND_ENERGY ("Bond Ledger"): for each reaction the
// student counts the bonds broken (with the coefficient), totals energy in,
// does the same for the bonds made, and works out ΔH = energy in − energy out
// with its sign. Its items live in bondEnergy.js and use reactions OTHER than
// the book's two worked examples, which the deck teaches.
//
// Task XP totals 130 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of 20 (75%) and Gate 2 at 70 of 100
// (70%), both inside the validator's 80% rule. Module properties are written
// out in full (`notes: notes,`) so the audio generator never over-reads the
// realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { bondEnergy } from './bondEnergy.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M05_2_DATA = {
  meta: {
    id: 'M05_2',
    title: 'Bond Energies & Calculating ΔH',
    desc: 'Read a bond energy table, write an equation out to show every bond, and calculate the enthalpy change as energy in minus energy out — sign and all.',
    track: 'IGCSE_CHEM',
    icon: 'Calculator',
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
        { id: 'BOND_ENERGY', dbKey: 'p49', maxXP: 30 },
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

  // Key words — the vocabulary the exam question is written in. English only
  // (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Joule', isReal: true,
      def: 'The unit of energy, symbol J. 1000 joules make one kilojoule (1 kJ).',
      sent: 'Breaking one mole of H–Cl bonds takes 431 000 joules.',
    },
    {
      word: 'Kilojoules per mole', isReal: true,
      def: 'The unit for energy changes in reactions, written kJ/mol: the kilojoules of energy for one mole of a substance or a bond.',
      sent: 'The bond energy of C–H is 413 kilojoules per mole.',
    },
    {
      word: 'Bond energy', isReal: true,
      def: 'The energy needed to break one mole of a particular bond, or released when one mole of the same bond forms.',
      sent: 'The bond energy of Cl–Cl is 242 kJ/mol.',
    },
    {
      word: 'Bond breaking', isReal: true,
      def: 'Pulling bonded atoms apart. It takes energy in, so it is an endothermic process.',
      sent: 'Bond breaking in the reactants gives the energy in.',
    },
    {
      word: 'Bond making', isReal: true,
      def: 'Atoms joining to form new bonds. It gives energy out, so it is an exothermic process.',
      sent: 'Bond making in the products gives the energy out.',
    },
    {
      word: 'Displayed formula', isReal: true,
      def: 'A formula that shows every atom and every bond, with each bond drawn as a line.',
      sent: 'The displayed formula of water is H–O–H.',
    },
    {
      word: 'Coefficient', isReal: true,
      def: 'The big number in front of a formula in an equation. It tells you how many molecules or moles there are.',
      sent: 'In 3H₂ the coefficient is 3, so three H–H bonds break.',
    },
    {
      word: 'Enthalpy change', isReal: true,
      def: 'The overall energy change of a reaction, written delta H. It equals the energy in for bond breaking minus the energy out from bond making.',
      sent: 'The enthalpy change for this reaction is minus 536 kJ.',
    },
    {
      word: 'Exothermic', isReal: true,
      def: 'Describes a reaction that gives out energy, because the energy out is bigger than the energy in. Delta H is negative.',
      sent: 'Hydrogen reacting with fluorine is strongly exothermic.',
    },
    {
      word: 'Endothermic', isReal: true,
      def: 'Describes a reaction that takes in energy, because the energy in is bigger than the energy out. Delta H is positive.',
      sent: 'Decomposing hydrogen iodide is endothermic.',
    },
    {
      word: 'Triple bond', isReal: true,
      def: 'Three bonds between the same two atoms, drawn as three lines. N≡N in nitrogen is a triple bond.',
      sent: 'The triple bond in nitrogen has a bond energy of 946 kJ/mol.',
    },
    {
      word: 'Inert', isReal: true,
      def: 'Very unreactive: hardly takes part in chemical reactions.',
      sent: 'Nitrogen is inert, so it is used to fill bags of snacks.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md). Prompts are plain text — ShortAnswers.jsx does
  // not render $…$, so ΔH is written as "delta H" or "enthalpy change". Built on
  // the ideas of the spread's questions and the Checkup, with fresh substances
  // and numbers; only sq3 stages a whole calculation.
  shortQA: [
    {
      id: 'sq1',
      question: 'The bond energy of the H–F bond is 565 kJ/mol. Explain fully what this value means.',
      suggestedWords: [['mole'], ['break', 'broken'], ['form', 'made']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: 565 kJ of energy is needed (taken in) to break the bonds.',
        '1 mark: this is for one mole of H–F bonds (the unit kJ/mol means kilojoules per mole).',
        '1 mark: the same amount, 565 kJ, is given out (released) when one mole of H–F bonds forms.',
      ],
      modelAnswer: 'It means that 565 kJ of energy must be taken in to break the H–F bonds in one mole of hydrogen fluoride, because the unit kJ/mol means kilojoules per mole. The same amount of energy, 565 kJ, is given out when one mole of H–F bonds forms again.',
    },
    {
      id: 'sq2',
      question: 'The enthalpy change for the burning of propane is negative. Explain what this tells you, in terms of the energy taken in to break bonds and the energy given out when bonds form.',
      suggestedWords: [['energy in'], ['energy out'], ['surroundings']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the energy given out when the new bonds form (energy out) is bigger than the energy taken in to break the old bonds (energy in).',
        '1 mark: delta H = energy in minus energy out, so a bigger energy out gives a negative answer.',
        '1 mark: the reaction is exothermic — energy is transferred to the surroundings, which get warmer.',
      ],
      modelAnswer: 'When propane burns, the bonds in the propane and oxygen are broken, which takes energy in, and then new bonds form in the carbon dioxide and water, which gives energy out. The energy out is bigger than the energy in. Because delta H is energy in minus energy out, the answer is negative. This means the reaction is exothermic: the extra energy is transferred to the surroundings, so they get warmer.',
    },
    {
      id: 'sq3',
      question: 'Chlorine reacts with hydrogen iodide: Cl2 + 2HI → 2HCl + I2. The bond energies in kJ/mol are: Cl–Cl 242, H–I 298, H–Cl 431, I–I 151. Calculate the enthalpy change for this reaction, showing your working, and state whether it is exothermic or endothermic.',
      suggestedWords: [['energy in'], ['energy out'], ['coefficient']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: energy in = 242 + (2 x 298) = 838 kJ (one Cl–Cl and two H–I bonds broken).',
        '1 mark: energy out = (2 x 431) + 151 = 1013 kJ (two H–Cl and one I–I bonds made).',
        '1 mark: delta H = 838 − 1013 = −175 kJ, so the reaction is exothermic (accept the sign and conclusion carried forward from wrong totals).',
      ],
      modelAnswer: 'The bonds broken are one Cl–Cl bond and two H–I bonds, so the energy in is 242 + 2 x 298 = 242 + 596 = 838 kJ. The bonds made are two H–Cl bonds and one I–I bond, so the energy out is 2 x 431 + 151 = 862 + 151 = 1013 kJ. The enthalpy change is energy in minus energy out: 838 − 1013 = −175 kJ. The sign is negative, so the reaction is exothermic.',
    },
    {
      id: 'sq4',
      question: 'Nitrogen is not a noble gas, but it is very unreactive and is used to fill food packets. Use the idea of bond energy to explain why nitrogen is so unreactive.',
      suggestedWords: [['triple bond'], ['bond energy', 'kJ/mol'], ['inert']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a nitrogen molecule is held together by a triple bond, N≡N.',
        '1 mark: this bond has a very high bond energy (946 kJ/mol), the highest in the table / it is a very strong bond.',
        '1 mark: so a very large amount of energy must be taken in to break it before nitrogen can react, and so it hardly ever reacts.',
      ],
      modelAnswer: 'The two atoms in a nitrogen molecule are held together by a triple bond, N≡N. This bond has a bond energy of 946 kJ/mol, which is the highest value in the table, so it is very strong. Before nitrogen can react, this bond has to be broken, and that needs a very large amount of energy to be taken in. So nitrogen hardly ever reacts, which is why it is described as inert.',
    },
    {
      id: 'sq5',
      question: 'For the reaction 2HF → H2 + F2, a student writes: "energy in = 565 kJ". The bond energy of H–F is 565 kJ/mol. Explain the student’s mistake and give the correct energy in.',
      suggestedWords: [['coefficient'], ['molecules'], ['bonds broken']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the student has ignored the coefficient 2 in front of HF / has counted only one HF molecule.',
        '1 mark: there are two HF molecules, each with one H–F bond, so two H–F bonds must be broken.',
        '1 mark: the correct energy in = 2 x 565 = 1130 kJ.',
      ],
      modelAnswer: 'The student has forgotten the coefficient 2 in front of HF. The equation has two HF molecules, and each one has one H–F bond, so two H–F bonds must be broken, not one. The correct energy in is 2 x 565 = 1130 kJ.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawn diagrams — the
  // data card and the book-style bond energy diagram. 2 MCQ : 1 written. The
  // grader cannot see the picture, so the written item's mark scheme and model
  // answer state every value the diagram shows.
  diagrams: [
    {
      id: 'diag_1_halogen_trend',
      type: 'mcq',
      inlineSvg: DIAGRAMS.BOND_TABLE,
      imageAlt: 'A table of bond energies in kJ/mol. Book values: H–H 436, Cl–Cl 242, H–Cl 431, C–C 346, C=C 612, C–O 358, C–H 413, O=O 498, O–H 464, N–H 391, N≡N 946. Extra values: C=O 805, Br–Br 193, H–Br 366, I–I 151, H–I 298, N–N 158, F–F 158, H–F 565.',
      promptText: 'Find the four bonds between hydrogen and a halogen in the table: H–F, H–Cl, H–Br and H–I. Which statement is correct?',
      options: [
        { val: 'A', text: 'The bond energy rises from H–F to H–I, so H–I is the hardest to break.' },
        { val: 'B', text: 'The bond energy falls from H–F to H–I, so H–I is the easiest to break.' },
        { val: 'C', text: 'All four bonds have the same bond energy, because they all contain hydrogen.' },
        { val: 'D', text: 'H–Cl has the highest bond energy of the four, because chlorine is a gas.' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'Read the values: H–F 565, H–Cl 431, H–Br 366, H–I 298 kJ/mol. They get smaller down the list, so the bonds get weaker, and H–I needs the least energy to break.',
    },
    {
      id: 'diag_2_top_level',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LEDGER_ENDO,
      imageAlt: 'A bond energy diagram for 2NH3 decomposing into N2 + 3H2. From the 2NH3 level an up arrow labelled energy in, 2346 kJ, rises to a top level labelled bonds broken. A down arrow labelled energy out, 2254 kJ, falls to the N2 + 3H2 level, which sits slightly above the 2NH3 level. The overall change is labelled delta H = +92 kJ.',
      promptText: 'Look at the top level of this diagram, labelled "bonds broken". What is present at that level?',
      options: [
        { val: 'A', text: 'Two molecules of ammonia, 2NH₃' },
        { val: 'B', text: 'One nitrogen molecule and three hydrogen molecules, N₂ + 3H₂' },
        { val: 'C', text: 'Separate atoms: 2 nitrogen atoms and 6 hydrogen atoms' },
        { val: 'D', text: 'Nothing at all — the energy has turned into heat' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The up arrow is the energy taken in to break all six N–H bonds, so at the top nothing is bonded: two N atoms and six H atoms, all separate. The N₂ and H₂ molecules only form on the way down, when energy is given out.',
    },
    {
      id: 'diag_3_read_the_ledger',
      inlineSvg: DIAGRAMS.LEDGER_EXO,
      imageAlt: 'A bond energy diagram for H2 + Cl2 forming 2HCl. From the H2 + Cl2 level a blue up arrow labelled energy in, 678 kJ, rises to a top level labelled bonds broken, 2H + 2Cl as separate atoms. A red down arrow labelled energy out, 862 kJ, falls to the 2HCl level, which is below the starting level. A small red arrow between the two levels is labelled overall energy out, delta H = −184 kJ.',
      promptText: 'This diagram is for hydrogen reacting with chlorine. Explain what the up arrow and the down arrow each show, and use the numbers on the diagram to explain why the reaction is exothermic.',
      suggestedWords: [['bonds broken'], ['bonds made', 'form'], ['exothermic']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the up arrow is the energy taken in (678 kJ) to break the H–H and Cl–Cl bonds, giving separate atoms at the top level.',
        '1 mark: the down arrow is the energy given out (862 kJ) as the new H–Cl bonds form.',
        '1 mark: more energy is given out than taken in (862 is bigger than 678), so the products end below the reactants and delta H = 678 − 862 = −184 kJ, which is negative, so exothermic.',
      ],
      modelAnswer: 'The up arrow shows the energy taken in to break the bonds in the reactants: 678 kJ to break the H–H and Cl–Cl bonds, which leaves separate hydrogen and chlorine atoms at the top level. The down arrow shows the energy given out when the new H–Cl bonds form, which is 862 kJ. The down arrow is longer than the up arrow, because 862 kJ is more than 678 kJ, so the products finish below the reactants. The enthalpy change is 678 − 862 = −184 kJ. It is negative, so the reaction is exothermic.',
    },
  ],

  notes: notes,
  workbook: workbook,
  bondEnergy: bondEnergy,
  assessment: assessment,
  games: games,
};
