// src/data/IGCSE_CHEM/M06_2/data.js
// Module 6, Topic Two (6.2): Reactions of Acids and Bases — book spreads 11.3
// "The reactions of acids and bases" and 11.4 "A closer look at
// neutralisation" (pages 132–135). English only: this track is not bilingual,
// so there are no `vn*` twins.
//
// The track's EQUATIONS exemplar: word → symbol → ionic, with two engines side
// by side in Gate 1.
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Equations (SYMBOL_EQ: word equation → balanced symbol
//                      equation) + Spectator Strike (IONIC_EQ: symbol equation
//                      → ionic equation, in the book's three steps) + Practice +
//                      Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 140 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 110 (64%), both inside the 80% rule the validator enforces. Module
// properties are written out in full (`notes: notes,`) so the audio generator
// never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { symbolEq } from './symbolEq.js';
import { ionicEq } from './ionicEq.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_2_DATA = {
  meta: {
    id: 'M06_2',
    title: 'Reactions of Acids and Bases',
    desc: 'Name the salt an acid makes, write the three typical acid reactions as word and symbol equations, say which ones are neutralisations, and write the ionic equation that shows where the water comes from.',
    track: 'IGCSE_CHEM',
    icon: 'FlaskConical',
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
        { id: 'IONIC_EQ', dbKey: 'p51', maxXP: 20 },
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
      word: 'Salt', isReal: true,
      def: 'An ionic compound formed when an acid reacts with a metal, a base or a carbonate. Its name comes from the metal and the acid.',
      sent: 'Zinc sulfate is the salt made from zinc and sulfuric acid.',
    },
    {
      word: 'Displace', isReal: true,
      def: 'To push something out and take its place. A metal displaces hydrogen from an acid.',
      sent: 'Iron displaces hydrogen from dilute sulfuric acid.',
    },
    {
      word: 'Base', isReal: true,
      def: 'A metal oxide or metal hydroxide. It reacts with an acid to give only a salt and water.',
      sent: 'Copper(II) oxide is a base that does not dissolve in water.',
    },
    {
      word: 'Alkali', isReal: true,
      def: 'A base that dissolves in water. Its solution contains hydroxide ions and turns litmus blue.',
      sent: 'Potassium hydroxide is an alkali.',
    },
    {
      word: 'Carbonate', isReal: true,
      def: 'A compound containing the carbonate ion, CO₃²⁻. With an acid it gives a salt, water and carbon dioxide.',
      sent: 'Marble is mostly calcium carbonate, so it fizzes in acid.',
    },
    {
      word: 'Neutralisation', isReal: true,
      def: 'A reaction with an acid that gives water as well as a salt. The reaction of an acid with a metal is not a neutralisation.',
      sent: 'The neutralisation of nitric acid by sodium hydroxide gives sodium nitrate and water.',
    },
    {
      word: 'Ionic equation', isReal: true,
      def: 'An equation that shows just the ions that take part in a reaction, with the spectator ions left out.',
      sent: 'The ionic equation for neutralisation by an alkali is H⁺ + OH⁻ → H₂O.',
    },
    {
      word: 'Spectator ion', isReal: true,
      def: 'An ion that is present in the solution but does not take part in the reaction. It appears unchanged on both sides of the equation.',
      sent: 'In this reaction the nitrate ion is a spectator ion.',
    },
    {
      word: 'Proton', isReal: true,
      def: 'A positive particle in the nucleus of an atom. A hydrogen ion, H⁺, is just a proton.',
      sent: 'When a hydrogen atom loses its electron, only a proton is left.',
    },
    {
      word: 'Proton donor', isReal: true,
      def: 'A substance that gives protons (hydrogen ions, H⁺) to another substance. Acids are proton donors.',
      sent: 'Sulfuric acid acts as a proton donor.',
    },
    {
      word: 'Proton acceptor', isReal: true,
      def: 'A substance that takes protons (hydrogen ions, H⁺) from another substance. Bases are proton acceptors.',
      sent: 'The oxide ion in magnesium oxide is a proton acceptor.',
    },
    {
      word: 'Indigestion', isReal: true,
      def: 'Pain caused by too much hydrochloric acid in the stomach. It is treated with a base that neutralises the extra acid.',
      sent: 'A tablet of magnesium hydroxide can relieve indigestion.',
    },
    {
      word: 'Slaked lime', isReal: true,
      def: 'The everyday name for calcium hydroxide, Ca(OH)₂. Farmers spread it on soil that is too acidic.',
      sent: 'The farmer spread slaked lime to raise the pH of the soil.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions
  // but with fresh substances. Prompts are plain text — ShortAnswers.jsx does
  // not render $…$ — so formulae and charges are Unicode (H⁺, OH⁻, H₂O).
  shortQA: [
    {
      id: 'sq1',
      question: 'A student adds some zinc carbonate powder to dilute nitric acid. Describe what the student would see, name the gas that is given off and give its test, and name the salt that forms.',
      suggestedWords: [['observe', 'see'], ['product'], ['test', 'identify']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: fizzing / bubbles of gas are seen (and the powder disappears).',
        '1 mark: the gas is carbon dioxide, which turns limewater milky.',
        '1 mark: the salt is zinc nitrate.',
      ],
      modelAnswer: 'The mixture fizzes as bubbles of gas are given off, and the white powder disappears. The gas is carbon dioxide: if it is bubbled through limewater, the limewater turns milky. The salt that forms is zinc nitrate, because the metal is zinc and nitric acid always gives nitrates.',
    },
    {
      id: 'sq2',
      question: 'A student says: "Zinc reacting with dilute hydrochloric acid is a neutralisation, because the acid gets used up." Explain why the student is wrong.',
      suggestedWords: [['definition', 'defined'], ['product'], ['salt']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a neutralisation is a reaction with an acid that gives water as well as a salt.',
        '1 mark: zinc and hydrochloric acid give zinc chloride and hydrogen.',
        '1 mark: no water is formed, so it is not a neutralisation (using up the acid is not enough).',
      ],
      modelAnswer: 'A neutralisation is a reaction of an acid that produces water as well as a salt. When zinc reacts with hydrochloric acid, the products are zinc chloride and hydrogen gas. No water is made, so even though the acid is used up, the reaction is not a neutralisation.',
    },
    {
      id: 'sq3',
      question: 'Dilute nitric acid is neutralised by potassium hydroxide solution. Explain, in terms of the ions in the two solutions, where the water comes from and what happens to the other ions.',
      suggestedWords: [['ion'], ['solution'], ['molecule']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the acid contains H⁺ (and NO₃⁻) ions and the alkali contains OH⁻ (and K⁺) ions.',
        '1 mark: the H⁺ ions combine with the OH⁻ ions to form water molecules (H⁺ + OH⁻ → H₂O).',
        '1 mark: the K⁺ and NO₃⁻ ions do not change / stay in the solution as spectator ions (potassium nitrate is left when the water evaporates).',
      ],
      modelAnswer: 'Nitric acid solution contains hydrogen ions, H⁺, and nitrate ions, NO₃⁻. Potassium hydroxide solution contains potassium ions, K⁺, and hydroxide ions, OH⁻. When they mix, each H⁺ ion combines with an OH⁻ ion to form a water molecule: H⁺ + OH⁻ → H₂O. The K⁺ and NO₃⁻ ions do not take part — they are spectator ions and stay in the solution, so evaporating the water would leave potassium nitrate.',
    },
    {
      id: 'sq4',
      question: 'Calcium oxide does not dissolve in water, but it still neutralises dilute hydrochloric acid. Explain why calcium oxide is described as a proton acceptor in this reaction.',
      suggestedWords: [['lattice'], ['proton'], ['molecule']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the acid provides H⁺ ions, and an H⁺ ion is a proton (a hydrogen atom that has lost its electron).',
        '1 mark: the oxide ions (O²⁻) in the calcium oxide take / accept these H⁺ ions.',
        '1 mark: water molecules form: 2H⁺ + O²⁻ → H₂O.',
      ],
      modelAnswer: 'Hydrochloric acid contains hydrogen ions, and a hydrogen ion is just a proton, because it is a hydrogen atom that has lost its only electron. Calcium oxide is a lattice of Ca²⁺ and O²⁻ ions. The oxide ions take the H⁺ ions from the acid, two at a time, forming water molecules: 2H⁺ + O²⁻ → H₂O. Because it takes protons, calcium oxide is acting as a proton acceptor, which is what a base is.',
    },
    {
      id: 'sq5',
      question: 'A person with indigestion chews a tablet that contains calcium carbonate. Explain how the tablet helps, and name the products of the reaction in the stomach.',
      suggestedWords: [['stomach'], ['base'], ['product']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: indigestion is caused by too much (excess) hydrochloric acid in the stomach.',
        '1 mark: calcium carbonate reacts with / neutralises the extra acid, so less acid is left.',
        '1 mark: the products are calcium chloride, water and carbon dioxide.',
      ],
      modelAnswer: 'Indigestion happens when the stomach contains too much hydrochloric acid. Calcium carbonate reacts with the acid and neutralises the excess, so there is less acid to cause pain. The reaction is acid + carbonate, so the products are calcium chloride, water and carbon dioxide — which is why the person may burp afterwards.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_which_not',
      type: 'mcq',
      inlineSvg: DIAGRAMS.THREE_REACTIONS,
      imageAlt: 'Three beakers of dilute sulfuric acid. The first contains zinc and is fizzing; its products are zinc sulfate and hydrogen. The second contains zinc oxide with no gas; its products are zinc sulfate and water. The third contains zinc carbonate and is fizzing; its products are zinc sulfate, water and carbon dioxide.',
      promptText: 'All three beakers make the same salt, zinc sulfate. Using the products shown under each beaker, which reaction is NOT a neutralisation?',
      options: [
        { val: 'A', text: 'The first — zinc gives hydrogen, and no water is formed' },
        { val: 'B', text: 'The second — no gas is given off, so nothing is neutralised' },
        { val: 'C', text: 'The third — the fizzing shows it is not a neutralisation' },
        { val: 'D', text: 'None of them — they all use up the acid' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'A neutralisation gives water as well as a salt. The oxide (second) and the carbonate (third) both give water, whether or not there is a gas. Only zinc metal gives zinc sulfate and hydrogen with no water, so it is not a neutralisation. Using up the acid is not the test.',
    },
    {
      id: 'diag_2_oxide_ion',
      type: 'mcq',
      inlineSvg: DIAGRAMS.OXIDE_LATTICE,
      imageAlt: 'Three stages: a lattice of Mg2+ and O2- ions; hydrogen ions from hydrochloric acid joining onto an oxide ion at the edge of the lattice, with a water molecule and a chloride ion nearby; then free Mg2+ ions, Cl- ions and water molecules, with the equation 2H+(aq) + O2-(s) → H2O(l).',
      promptText: 'Look at the middle stage. What job is the oxide ion, O²⁻, doing?',
      options: [
        { val: 'A', text: 'It is donating protons to the acid' },
        { val: 'B', text: 'It is a spectator ion, and ends up unchanged in the solution' },
        { val: 'C', text: 'It is joining the chloride ions to form the salt' },
        { val: 'D', text: 'It is accepting protons, so the magnesium oxide acts as a base' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'The H⁺ ions from the acid join onto the oxide ion and make a water molecule, so the oxide ion is accepting protons — which is what makes magnesium oxide a base. The ions that end up in the solution with the chloride ions are the Mg²⁺ ions, not the oxide ions.',
    },
    {
      id: 'diag_3_ions_mix',
      inlineSvg: DIAGRAMS.IONS_BEFORE_AFTER,
      imageAlt: 'Three beakers: hydrochloric acid with H+ and Cl- ions; sodium hydroxide solution with Na+ and OH- ions; and the mixture, which contains water molecules, Na+ ions and Cl- ions, and has no effect on litmus.',
      promptText: 'The diagram shows hydrochloric acid and sodium hydroxide solution before and after they are mixed. Describe what happens to each kind of ion, and explain why the final solution has no effect on litmus.',
      suggestedWords: [['molecule'], ['solution'], ['litmus']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the H⁺ ions (from the acid) and the OH⁻ ions (from the alkali) combine to form water molecules.',
        '1 mark: the Na⁺ and Cl⁻ ions do not change / are still in the solution (spectator ions).',
        '1 mark: no H⁺ or OH⁻ ions are left over, so the solution is neutral and does not change the colour of litmus.',
      ],
      modelAnswer: 'Before mixing, the acid contains H⁺ and Cl⁻ ions and the alkali contains Na⁺ and OH⁻ ions. When they are mixed, each H⁺ ion combines with an OH⁻ ion to form a water molecule. The Na⁺ and Cl⁻ ions are unchanged and simply stay in the solution as spectator ions. Because all the H⁺ and OH⁻ ions have been used up, there is nothing left to make the solution acidic or alkaline, so it is neutral sodium chloride solution and has no effect on litmus.',
    },
  ],

  notes: notes,
  workbook: workbook,
  symbolEq: symbolEq,
  ionicEq: ionicEq,
  assessment: assessment,
  games: games,
};
