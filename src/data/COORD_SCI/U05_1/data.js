// src/data/COORD_SCI/U05_1/data.js
// C5.01 Exothermic and endothermic reactions — the second unit of the IGCSE
// Coordinated Science track, built from the Cambridge coursebook section in
// docs/coord-science/sources. English only: this track is not bilingual, so
// there are no `vn*` twins.
//
// Gate structure follows U04_1 (the teacher's spec):
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Energy Diagrams + Equations + Practice + Questions +
//                      Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// The new task this unit turns on is ENERGY_PROFILE ("Energy Diagrams"), which
// replaces U04_1's Formulae slot: the coursebook's Worked Example is a
// seven-step recipe for DRAWING a reaction pathway diagram, so the student draws
// one. Equations stays, because step 2 of that recipe is "write a balanced
// symbol equation" — the labels on the two lines are the equation.
//
// Task XP totals 130 (capped at 100 by unitXPOf), so a student can drop a task
// or two and still finish. Module properties are written out in full
// (`notes: notes,`) so the audio generator never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { energyProfile } from './energyProfile.js';
import { symbolEq } from './symbolEq.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const U05_1_DATA = {
  meta: {
    id: 'U05_1',
    title: 'Exothermic and Endothermic Reactions',
    desc: 'Tell exothermic from endothermic by what happens to the surroundings, draw and read energy level diagrams, give ΔH its sign, and explain it all through bonds broken and bonds made.',
    track: 'COORD_SCI',
    icon: 'Flame',
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
        { id: 'ENERGY_PROFILE', dbKey: 'p23', maxXP: 20 },
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

  // Key words — the vocabulary a student needs to READ the questions and the
  // exam. English-only (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Exothermic', isReal: true,
      def: 'Describes a process that releases heat energy to the surroundings, so their temperature rises.',
      sent: 'Burning methane is an exothermic reaction.',
    },
    {
      word: 'Endothermic', isReal: true,
      def: 'Describes a process that takes in heat energy from the surroundings, so their temperature falls.',
      sent: 'Photosynthesis is an endothermic process.',
    },
    {
      word: 'System', isReal: true,
      def: 'The reacting substances themselves — the part of the world the energy change is measured for.',
      sent: 'In an exothermic reaction the system loses energy.',
    },
    {
      word: 'Surroundings', isReal: true,
      def: 'Everything outside the reaction that energy can move to or from: the mixture, the air, the test tube and the thermometer.',
      sent: 'The surroundings warm up during an exothermic reaction.',
    },
    {
      word: 'Combustion', isReal: true,
      def: 'Burning: a substance reacting with oxygen and giving out heat. It is always exothermic.',
      sent: 'The combustion of methane releases 728 kJ per mole.',
    },
    {
      word: 'Energy level diagram', isReal: true,
      def: 'A graph of the energy of the reactants and products against the progress of a reaction; also called a reaction pathway diagram.',
      sent: 'Draw an energy level diagram for this reaction.',
    },
    {
      word: 'Enthalpy', isReal: true,
      def: 'The thermal energy (heat) content of a system, given the symbol H.',
      sent: 'The enthalpy of the products is lower than that of the reactants.',
    },
    {
      word: 'Enthalpy change', isReal: true,
      def: 'The thermal energy transferred during a reaction, written as a delta H and measured in kJ/mol. It is negative for exothermic and positive for endothermic.',
      sent: 'The enthalpy change for burning methane is minus 728 kJ per mole.',
    },
    {
      word: 'Bond breaking', isReal: true,
      def: 'Pulling bonded atoms apart. It needs energy to be put in, so it is an endothermic process.',
      sent: 'Bond breaking takes in energy from the surroundings.',
    },
    {
      word: 'Bond making', isReal: true,
      def: 'Forming new bonds between atoms. It gives energy out, so it is an exothermic process.',
      sent: 'Bond making gives out energy as the products form.',
    },
    {
      word: 'Bond energy', isReal: true,
      def: 'The energy needed to break a particular bond, and released when it forms. Stronger bonds have higher bond energies.',
      sent: 'The bonds in the products have a higher bond energy.',
    },
    {
      word: 'Activation energy', isReal: true,
      def: 'The minimum energy needed to start a reaction by breaking the first bonds; the height of the peak above the reactants line.',
      sent: 'A spark supplies the activation energy for the fuel to ignite.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md). Prompts are plain text — ShortAnswers.jsx does
  // not render $…$, so ΔH is written out in words.
  shortQA: [
    {
      id: 'sq1',
      question: 'A student adds two solutions together in a test tube and the tube becomes noticeably cold. State whether the reaction is exothermic or endothermic, and explain your answer in terms of energy and the surroundings.',
      suggestedWords: [['endothermic'], ['takes in', 'absorbs'], ['surroundings']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the reaction is endothermic.',
        '1 mark: it takes in (absorbs) heat energy from the surroundings.',
        '1 mark: so the temperature of the surroundings falls, which is why the tube feels cold.',
      ],
      modelAnswer: 'The reaction is endothermic. It takes in heat energy from the surroundings, which include the mixture, the tube and the thermometer. Because that energy is being removed from the surroundings, their temperature falls and the tube feels cold.',
    },
    {
      id: 'sq2',
      question: 'Describe the key features of an energy level diagram that would tell you a reaction is endothermic.',
      suggestedWords: [['products', 'higher'], ['reactants', 'lower'], ['arrow', 'upwards']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the energy of the products is higher than the energy of the reactants.',
        '1 mark: the arrow between the two levels points upwards.',
        '1 mark: the enthalpy change (delta H) is positive.',
      ],
      modelAnswer: 'The products line is drawn higher than the reactants line, because the system has gained energy. The arrow between them therefore points upwards to show that energy has been taken in, and the enthalpy change is labelled as a positive value.',
    },
    {
      id: 'sq3',
      question: 'Explain, in terms of bond breaking and bond making, why the burning of methane is an exothermic reaction.',
      suggestedWords: [['breaking', 'takes in'], ['making', 'gives out'], ['more', 'stronger']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: breaking the bonds in the reactants takes energy in (endothermic).',
        '1 mark: making the new bonds in the products gives energy out (exothermic).',
        '1 mark: the bonds made in the products are stronger, so more energy is given out than was taken in — the reaction is exothermic overall.',
      ],
      modelAnswer: 'First the bonds in the methane and oxygen must be broken, which takes energy in. Then new bonds form to make carbon dioxide and water, which gives energy out. The bonds in the products are stronger than those in the reactants, so more energy is released by bond making than was absorbed by bond breaking, and the reaction is exothermic overall.',
    },
    {
      id: 'sq4',
      question: 'Explain why every chemical reaction must have an activation energy, even though for some reactions the value is very low.',
      suggestedWords: [['bonds', 'broken'], ['before', 'first'], ['energy', 'in']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: some bonds in the reactants must always be broken before new bonds can be formed.',
        '1 mark: breaking bonds is endothermic, so energy must be put in.',
        '1 mark: therefore there is always an energy barrier to get over, however small it is.',
      ],
      modelAnswer: 'No new bonds can form until some of the old ones have been broken, and breaking a bond always requires energy to be put in because a bond is a force of attraction. That means there is always an initial barrier that must be climbed, so every reaction has an activation energy — even if in some cases it is small enough to be supplied at room temperature.',
    },
    {
      id: 'sq5',
      question: 'A student says "the decomposition of calcium carbonate happens in a very hot kiln, so it must be exothermic." Explain why the student is wrong.',
      suggestedWords: [['endothermic'], ['supplied', 'taken in'], ['stops']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the reaction is actually endothermic.',
        '1 mark: the heat is being supplied to the reaction (taken in), not given out by it.',
        '1 mark: the evidence is that the reaction stops if the heating stops — a hot surrounding is not the same as a reaction that releases heat.',
      ],
      modelAnswer: 'The student has confused a hot environment with a reaction that gives heat out. The decomposition is endothermic: the kiln is supplying heat energy that the reaction takes in. You can tell because the reaction stops as soon as the heating stops, whereas an exothermic reaction would keep itself going once started.',
    },
  ],

  // Source Analysis (Diagrams): all three items are about READING an energy
  // level diagram, which is the skill this unit exists for. 2 MCQ : 1 written,
  // built on the authored graphs in diagrams.js.
  diagrams: [
    {
      id: 'diag_1_activation',
      type: 'mcq',
      inlineSvg: DIAGRAMS.ACTIVATION_PAIR,
      imageAlt: 'Two reaction pathway diagrams side by side: an exothermic one with the products below the reactants, and an endothermic one with the products above, each with a peak between the two levels.',
      promptText: 'Look at the two diagrams. On BOTH of them, the arrow labelled "activation energy" is measured from the same starting place. Where is it?',
      options: [
        { val: 'A', text: 'From the reactants line up to the top of the peak.' },
        { val: 'B', text: 'From the bottom of the energy axis up to the top of the peak.' },
        { val: 'C', text: 'From the products line up to the top of the peak.' },
        { val: 'D', text: 'From the reactants line across to the products line.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'The activation energy is the extra energy the reactants need in order to get over the barrier, so it is always measured from the reactants line to the peak — in both the exothermic and the endothermic case. Option D describes ΔH instead, and option B is the commonest misreading of the axis.',
    },
    {
      id: 'diag_2_endo',
      type: 'mcq',
      inlineSvg: DIAGRAMS.ENERGY_ENDO,
      imageAlt: 'An energy level diagram for nitrogen plus oxygen forming nitrogen monoxide; the products line is drawn above the reactants line with an upward arrow between them.',
      promptText: 'This diagram is for the reaction of nitrogen with oxygen inside a car engine. What does the position of the two green lines tell you about the enthalpy change?',
      options: [
        { val: 'A', text: 'ΔH is negative, because the reaction releases heat.' },
        { val: 'B', text: 'ΔH is zero, because both lines are drawn in green.' },
        { val: 'C', text: 'ΔH is positive, because the products are higher in energy than the reactants.' },
        { val: 'D', text: 'ΔH cannot be worked out without a number on the energy axis.' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The products line sits above the reactants line, so the system finished with MORE energy than it started with — it must have taken that energy in. A gain in enthalpy is a positive ΔH. The axis needs no numbers for this: the direction alone gives the sign.',
    },
    {
      id: 'diag_3_rollercoaster',
      inlineSvg: DIAGRAMS.BOND_ROLLERCOASTER,
      imageAlt: 'A reaction pathway diagram for hydrogen burning in oxygen: the curve climbs from the reactants line to a peak, labelled bond breaking, then falls well below the reactants to the products line, labelled bond making.',
      promptText: 'This diagram shows hydrogen reacting with oxygen to make water. Using the labels on the climb and on the drop, explain what is happening to the bonds at each stage and why the reaction is exothermic overall.',
      suggestedWords: [['breaking', 'takes in'], ['making', 'gives out'], ['more', 'exothermic']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: on the climb, bonds in the reactants are being broken, which takes energy in (endothermic).',
        '1 mark: on the drop, new bonds are being made in the products, which gives energy out (exothermic).',
        '1 mark: the drop is bigger than the climb, so more energy is given out than taken in and the reaction is exothermic overall (products end below the reactants).',
      ],
      modelAnswer: 'Going up the hill, the hydrogen–hydrogen and oxygen–oxygen bonds are being broken, and breaking bonds takes energy in from the surroundings. Coming down the other side, new bonds are being made to build the water molecules, and bond making gives energy out. The drop is larger than the climb, so more energy is released than was absorbed, and the products finish lower than the reactants — the reaction is exothermic overall.',
    },
  ],

  notes: notes,
  workbook: workbook,
  energyProfile: energyProfile,
  symbolEq: symbolEq,
  assessment: assessment,
  games: games,
};
