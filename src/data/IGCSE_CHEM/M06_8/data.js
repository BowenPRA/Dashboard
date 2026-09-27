// src/data/IGCSE_CHEM/M06_8/data.js
// Module 6, Topic Eight (6.8): Transition Elements — book spread 12.5 "The
// transition elements" (pages 154–155), read against 12.2 "Group I: the alkali
// metals", the comparison the whole spread is built on. The LAST topic of
// Module 6, so the deck, the last part of Practice and the Quiz close by
// pulling the three families together: alkali metals, halogens, transition
// elements. English only: this track is not bilingual, so there are no `vn*`
// twins.
//
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Formulae (FORMULA_WRITE: the Roman numeral is the
//                      charge on the metal ion — set the charges, balance) +
//                      Practice + Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf), so a student can drop the
// odd mark and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 90 (78%), both inside the 80% rule the validator enforces. Module
// properties are written out in full (`notes: notes,`) so the audio generator
// never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { formulaWrite } from './formulaWrite.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_8_DATA = {
  meta: {
    id: 'M06_8',
    title: 'Transition Elements',
    desc: 'Find the transition elements in the Periodic Table, compare their physical and chemical properties with the alkali metals, link each use to a property, and use the Roman numeral to name their compounds and write their formulae.',
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
        { id: 'FORMULA_WRITE', dbKey: 'p20', maxXP: 20 },
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
      word: 'Transition element', isReal: true,
      def: 'One of the metals in the large block in the middle of the Periodic Table, between Group II and Group III.',
      sent: 'Nickel is a transition element that is used in coins.',
    },
    {
      word: 'Density', isReal: true,
      def: 'How heavy a substance is for its size: its mass divided by its volume, in g/cm³.',
      sent: 'Gold has a very high density, so a small bar is surprisingly heavy.',
    },
    {
      word: 'Melting point', isReal: true,
      def: 'The temperature at which a solid turns into a liquid.',
      sent: 'Tungsten has such a high melting point that it is used in furnace parts.',
    },
    {
      word: 'Lustre', isReal: true,
      def: 'The shine on the surface of a metal when it is clean or freshly cut.',
      sent: 'The polished silver spoon had a bright metallic lustre.',
    },
    {
      word: 'Conductor', isReal: true,
      def: 'A substance that lets heat or electricity pass through it easily.',
      sent: 'Aluminium is a good conductor of heat, so it is used for saucepans.',
    },
    {
      word: 'Reactivity', isReal: true,
      def: 'How quickly and strongly a substance takes part in chemical reactions.',
      sent: 'Potassium has a higher reactivity than lithium.',
    },
    {
      word: 'Trend', isReal: true,
      def: 'A gradual change in a property as you move along a group or a period of the Periodic Table.',
      sent: 'The melting points of the alkali metals show a downward trend.',
    },
    {
      word: 'Catalyst', isReal: true,
      def: 'A substance that speeds up a chemical reaction but remains unchanged itself.',
      sent: 'Platinum is the catalyst inside a car exhaust converter.',
    },
    {
      word: 'Pigment', isReal: true,
      def: 'A coloured substance that gives colour to paint, ink or plastic.',
      sent: 'Titanium dioxide is a white pigment used in paint.',
    },
    {
      word: 'Steel', isReal: true,
      def: 'Iron to which other substances have been added, to improve its properties.',
      sent: 'The frame of the tall building is made of steel.',
    },
    {
      word: 'Stainless steel', isReal: true,
      def: 'Steel that contains chromium (about 11% or more), which stops it rusting.',
      sent: 'Kitchen sinks are made of stainless steel so they stay bright.',
    },
    {
      word: 'Oxidation number', isReal: true,
      def: 'The number of electrons each metal atom has lost to form a compound. It is shown as a Roman numeral in the name.',
      sent: 'In copper(II) chloride, the oxidation number of copper is 2.',
    },
    {
      word: 'Variable', isReal: true,
      def: 'Able to change; not always the same. Transition elements have variable oxidation numbers.',
      sent: 'Manganese has a variable oxidation number in its compounds.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spread's questions
  // and the Chapter 12 Checkup but with fresh metals and fresh settings.
  // Prompts are plain text — ShortAnswers.jsx does not render $…$ — so
  // formulae and charges are Unicode (CrCl₃, Cr³⁺).
  shortQA: [
    {
      id: 'sq1',
      question: 'Titanium is a transition element and potassium is an alkali metal. Describe three ways in which the physical properties of titanium are different from those of potassium.',
      suggestedWords: [['whereas', 'but', 'however'], ['property'], ['compared']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: titanium is hard and strong, whereas potassium is soft (can be cut with a knife).',
        '1 mark: titanium has a much higher density than potassium (potassium is less dense than water / floats).',
        '1 mark: titanium has a much higher melting point than potassium.',
      ],
      modelAnswer: 'Titanium is hard and strong, but potassium is so soft that it can be cut with a knife. Titanium also has a much higher density than potassium, which is light enough to float on water. Finally, titanium has a very high melting point, whereas potassium melts at a low temperature, below the boiling point of water.',
    },
    {
      id: 'sq2',
      question: 'A technician has two jars of solid with the labels missing. One is a compound of sodium and the other is a compound of iron. Explain how she could tell them apart just by looking at them and at their solutions in water.',
      suggestedWords: [['transition'], ['Group I', 'alkali metal'], ['solution']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the iron compound is coloured (e.g. pale green or orange-brown), because iron is a transition element.',
        '1 mark: the sodium compound is white, because Group I compounds are white.',
        '1 mark: the solution of the iron compound is coloured, while the sodium compound gives a colourless solution.',
      ],
      modelAnswer: 'Iron is a transition element, and transition elements form coloured compounds, so the iron compound will be coloured — for example pale green or orange-brown. Sodium is a Group I metal, and Group I compounds are white, so the sodium compound will be a white solid. When each is dissolved in water, the iron compound gives a coloured solution, but the sodium compound gives a colourless one.',
    },
    {
      id: 'sq3',
      question: 'Nickel is used as a catalyst when vegetable oil is turned into margarine. Explain what a catalyst is, and why the factory does not need to buy new nickel for every batch.',
      suggestedWords: [['reaction'], ['batch'], ['chemically']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a catalyst speeds up (increases the rate of) a reaction.',
        '1 mark: the catalyst remains unchanged / is not used up in the reaction.',
        '1 mark: so the same nickel is left at the end and can be used again for the next batch.',
      ],
      modelAnswer: 'A catalyst is a substance that speeds up a chemical reaction. It is not used up: at the end of the reaction it is still there and chemically unchanged. Because the nickel is left behind after each batch of margarine is made, the factory can use the same nickel again and again, so it does not need to buy new nickel every time.',
    },
    {
      id: 'sq4',
      question: 'Chromium forms two chlorides: CrCl₂ and CrCl₃. Name both compounds, and explain why chromium can form two different chlorides when magnesium forms only one.',
      suggestedWords: [['oxidation number'], ['electrons'], ['Group II']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: CrCl₂ is chromium(II) chloride.',
        '1 mark: CrCl₃ is chromium(III) chloride.',
        '1 mark: chromium is a transition element with a variable oxidation number / forms ions with different charges (Cr²⁺ and Cr³⁺), whereas magnesium (Group II) always forms 2+ ions.',
      ],
      modelAnswer: 'In CrCl₂ there are two chloride ions, each 1−, so the chromium ion is Cr²⁺ and the name is chromium(II) chloride. In CrCl₃ there are three chloride ions, so the chromium ion is Cr³⁺ and the name is chromium(III) chloride. Chromium can form both because it is a transition element: it has a variable oxidation number, so its atoms can lose two or three electrons. Magnesium is in Group II, and its ions are always 2+, so it forms only one chloride, MgCl₂.',
    },
    {
      id: 'sq5',
      question: 'Compare the way the alkali metals and the transition elements react with water, and describe how the trend in reactivity is different for the two families.',
      suggestedWords: [['vigorously'], ['group'], ['whereas', 'however']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the alkali metals react vigorously with cold water (fizzing, giving hydrogen and an alkaline solution).',
        '1 mark: the transition elements react slowly or not at all (e.g. copper and nickel do not react; iron only rusts slowly in damp air).',
        '1 mark: reactivity increases down Group I, whereas the transition elements show no clear trend in reactivity.',
      ],
      modelAnswer: 'The alkali metals react vigorously with cold water: they fizz as hydrogen is given off, and they leave an alkaline solution. The transition elements are much less reactive — copper and nickel do not react with water at all, and iron only rusts slowly in damp air. The trends are different too. Going down Group I, the metals become more reactive, but the transition elements show no clear trend in reactivity, although elements next to each other tend to be similar.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_how_many_times',
      type: 'mcq',
      inlineSvg: DIAGRAMS.DENSITY_BARS,
      imageAlt: 'A bar chart of density in g/cm³. Iron 7.9, copper 8.9 and nickel 8.9 are tall bars; sodium, 0.97, is a very short bar just below a dashed line for water at 1.0.',
      promptText: 'Use the bar chart. About how many times denser is nickel than sodium?',
      options: [
        { val: 'A', text: 'About 8 times — 8.9 take away 0.97' },
        { val: 'B', text: 'About 0.1 times' },
        { val: 'C', text: 'About 9 times' },
        { val: 'D', text: 'About 90 times' },
      ],
      correct: 'C',
      marks: 1,
      expEn: '"How many times" means divide: 8.9 ÷ 0.97 ≈ 9.2, so about 9 times. Taking away (A) gives a difference, not a number of times. Dividing the wrong way round (B) gives 0.11, and 90 times (D) comes from slipping a decimal place.',
    },
    {
      id: 'diag_2_iron_oxide',
      type: 'mcq',
      inlineSvg: DIAGRAMS.COPPER_IRON_OXIDES,
      imageAlt: 'Four ion pictures. Copper(I) oxide, Cu2O: two Cu+ ions and one O2- ion. Copper(II) oxide, CuO: one Cu2+ and one O2-. Iron(II) oxide, FeO: one Fe2+ and one O2-. Iron(III) oxide, Fe2O3: two Fe3+ ions and three O2- ions. Under each, the charges add to zero.',
      promptText: 'Look at iron(III) oxide in the bottom right. Why does it have two iron ions and three oxide ions?',
      options: [
        { val: 'A', text: 'Because the (III) means there are three oxide ions' },
        { val: 'B', text: 'Because two Fe³⁺ ions carry 6+ and three O²⁻ ions carry 6−, so the charges cancel' },
        { val: 'C', text: 'Because iron is more reactive than copper' },
        { val: 'D', text: 'Because iron atoms always join in pairs' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'The (III) is the charge on each iron ion, 3+, not a count of anything. The smallest numbers that balance 3+ and 2− are two Fe³⁺ (6+) and three O²⁻ (6−). In iron(II) oxide, one Fe²⁺ balances one O²⁻, so it is FeO.',
    },
    {
      id: 'diag_3_melting',
      inlineSvg: DIAGRAMS.MELTING_BARS,
      imageAlt: 'A bar chart of melting point in °C. Iron 1535, copper 1083 and nickel 1455 are tall bars; sodium, 98, is a very short bar just below a dashed line at 100 °C, where water boils.',
      promptText: 'The bar chart shows the melting points of iron, copper, nickel and sodium. A part inside a furnace must stay solid at 1500 °C. Use the chart to choose the only one of the four metals that could be used, and explain why each of the other three would not do.',
      suggestedWords: [['furnace'], ['temperature'], ['compared']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: chooses iron, because it melts at 1535 °C, which is above 1500 °C.',
        '1 mark: nickel (1455 °C) and copper (1083 °C) both melt below 1500 °C, so they would melt in the furnace.',
        '1 mark: sodium melts at only 98 °C (below the boiling point of water), so it is far too low / would melt almost at once.',
      ],
      modelAnswer: 'The metal to use is iron, because its melting point is 1535 °C, which is above the furnace temperature of 1500 °C, so it would stay solid. Nickel would not do: it melts at 1455 °C, just below 1500 °C. Copper melts even lower, at 1083 °C. Both would melt inside the furnace. Sodium is useless here: it melts at only 98 °C, below the temperature of boiling water.',
    },
  ],

  notes: notes,
  workbook: workbook,
  formulaWrite: formulaWrite,
  assessment: assessment,
  games: games,
};
