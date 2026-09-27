// src/data/IGCSE_CHEM/M06_5/data.js
// Module 6, Topic Five (6.5): The Periodic Table — book spreads 12.1 "The
// Periodic Table: an overview" and 12.4 "More about the trends", and the
// history pages "How the Periodic Table developed" (pages 146–147, 152–153,
// 156–157). English only: this track is not bilingual, so there are no `vn*`
// twins.
//
// A "where is it, so what is it like" unit: position on the table → outer
// electrons, shells, metal or non-metal, the charge on the ion; then (Extended)
// why reactivity changes down a group and across Period 3; then the history.
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Element Hunt (ELEMENT_HUNT: rounds drawn fresh on the
//                      first-20 table — periods, groups, metals, heavier
//                      atoms) + Practice + Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 130 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 110 (64%), both inside the 80% rule the validator enforces. Module
// properties are written out in full (`notes: notes,`) so the audio generator
// never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { elementHunt } from './elementHunt.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_5_DATA = {
  meta: {
    id: 'M06_5',
    title: 'The Periodic Table',
    desc: 'Read the table: order, groups, periods and the zig-zag line. Link an element\'s position to its outer electrons, shells and ion charge, explain the trends in reactivity and across Period 3, and tell how the table was built.',
    track: 'IGCSE_CHEM',
    icon: 'Grid3x3',
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
        { id: 'ELEMENT_HUNT', dbKey: 'p43', maxXP: 20 },
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
      word: 'Periodic Table', isReal: true,
      def: 'The chart of all the elements, in order of proton number, arranged so that elements with similar properties are in the same column.',
      sent: 'The Periodic Table shows that sodium and potassium belong to the same family.',
    },
    {
      word: 'Proton number', isReal: true,
      def: 'The number of protons in an atom. It is also called the atomic number, and it tells you which element the atom is.',
      sent: 'Every atom with a proton number of 8 is an oxygen atom.',
    },
    {
      word: 'Relative atomic mass', isReal: true,
      def: 'The average mass of the atoms of an element. It is the bottom number in each box of the Periodic Table.',
      sent: 'The relative atomic mass of chlorine is 35.5, because it is an average.',
    },
    {
      word: 'Periodicity', isReal: true,
      def: 'The pattern in which elements with similar properties appear again at regular intervals.',
      sent: 'Periodicity puts fluorine, chlorine and bromine in the same column.',
    },
    {
      word: 'Group', isReal: true,
      def: 'A numbered column of the Periodic Table. The elements in a group have similar properties.',
      sent: 'Nitrogen and phosphorus are both in Group V.',
    },
    {
      word: 'Period', isReal: true,
      def: 'A row of the Periodic Table. The period number is the number of electron shells in the atoms.',
      sent: 'Magnesium is in Period 3, so its atoms have three shells.',
    },
    {
      word: 'Outer-shell electrons', isReal: true,
      def: 'The electrons in the outermost shell of an atom. For Groups I to VII, their number is the group number.',
      sent: 'Carbon has four outer-shell electrons, so it is in Group IV.',
    },
    {
      word: 'Electron shell', isReal: true,
      def: 'One of the layers in which the electrons of an atom are arranged around the nucleus.',
      sent: 'A potassium atom has four electron shells.',
    },
    {
      word: 'Noble gas', isReal: true,
      def: 'An element in Group VIII. Its atoms have a full outer shell, so it is unreactive.',
      sent: 'Argon is a noble gas that is used inside light bulbs.',
    },
    {
      word: 'Monatomic', isReal: true,
      def: 'Existing as single atoms, not joined into molecules. The noble gases are monatomic.',
      sent: 'Neon is monatomic, but oxygen gas is made of O₂ molecules.',
    },
    {
      word: 'Transition elements', isReal: true,
      def: 'The block of elements in the middle of the Periodic Table. They are all metals.',
      sent: 'Iron, copper and silver are transition elements.',
    },
    {
      word: 'Metalloid', isReal: true,
      def: 'An element that has properties of both a metal and a non-metal.',
      sent: 'Silicon is a metalloid that is used to make computer chips.',
    },
    {
      word: 'Amphoteric', isReal: true,
      def: 'Able to react with both acids and bases. Aluminium oxide is an amphoteric oxide.',
      sent: 'Zinc oxide is amphoteric, so it dissolves in both acids and alkalis.',
    },
    {
      word: 'Trend', isReal: true,
      def: 'A gradual change in a property as you go down a group or across a period.',
      sent: 'There is a trend in density down Group VIII.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions and
  // the Checkup, with fresh elements. Prompts are plain text — ShortAnswers.jsx
  // does not render $…$ — so charges are Unicode (Al³⁺, F⁻).
  shortQA: [
    {
      id: 'sq1',
      question: 'An element has the proton number 15. Without using the Periodic Table, work out the arrangement of the electrons in its atoms, and use it to explain which period and which group the element is in.',
      suggestedWords: [['shell', 'shells'], ['electron'], ['arrangement', 'configuration']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: 15 protons means 15 electrons, arranged 2,8,5.',
        '1 mark: Period 3, because the atom has three electron shells.',
        '1 mark: Group V, because it has five outer-shell electrons.',
      ],
      modelAnswer: 'A proton number of 15 means the atom has 15 protons and so 15 electrons. They fill the shells as 2,8,5. The atom has three electron shells, so the element is in Period 3. It has five electrons in its outer shell, so it is in Group V. (The element is phosphorus.)',
    },
    {
      id: 'sq2',
      question: 'Describe how the elements are arranged in the Periodic Table. In your answer, explain what a group is and what a period is, and what the atoms in each have in common.',
      suggestedWords: [['column'], ['row'], ['proton']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the elements are in order of proton number (atomic number).',
        '1 mark: a group is a (numbered) column; its elements have the same number of outer-shell electrons / similar properties.',
        '1 mark: a period is a row; its atoms have the same number of electron shells.',
      ],
      modelAnswer: 'The elements are arranged in order of their proton number, starting with hydrogen. The columns are called groups. The elements in a group have the same number of outer-shell electrons, so they have similar properties. The rows are called periods. All the atoms in a period have the same number of electron shells, and across a period the elements change from metals to non-metals.',
    },
    {
      id: 'sq3',
      question: 'Fluorine and chlorine are both in Group VII, and fluorine is the more reactive of the two. Explain why, in terms of the electron shells in their atoms.',
      suggestedWords: [['nucleus'], ['shell', 'shells'], ['attract', 'pull']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a fluorine atom has fewer shells (2) than a chlorine atom (3), so its outer shell is closer to the nucleus.',
        '1 mark: so the nucleus pulls more strongly on an electron from another atom.',
        '1 mark: fluorine gains the electron it needs (to fill its outer shell) more easily, so it is more reactive.',
      ],
      modelAnswer: 'Both atoms have seven outer-shell electrons and need to gain one electron to fill the outer shell. A fluorine atom has only two shells (2,7) but a chlorine atom has three (2,8,7), so fluorine\'s outer shell is closer to the nucleus. The positive nucleus therefore pulls more strongly on an electron from another atom. Fluorine gains that electron more easily, so it is more reactive than chlorine.',
    },
    {
      id: 'sq4',
      question: 'Aluminium forms Al³⁺ ions, and fluorine forms F⁻ ions. Explain how each charge comes from the position of the element in the Periodic Table.',
      suggestedWords: [['outer shell'], ['electron'], ['group']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: atoms lose or gain electrons to reach a full outer shell.',
        '1 mark: aluminium is in Group III, so it has 3 outer electrons; it loses all 3, giving a 3+ ion.',
        '1 mark: fluorine is in Group VII, so it has 7 outer electrons; it gains 1, giving a 1− ion.',
      ],
      modelAnswer: 'Atoms form ions by losing or gaining electrons until they have a full outer shell. Aluminium is in Group III, so its atoms have three outer-shell electrons. It loses all three, and with three fewer negative electrons than protons it becomes an Al³⁺ ion. Fluorine is in Group VII, so its atoms have seven outer-shell electrons. It gains one more to fill the shell, and the extra electron gives it a charge of 1−.',
    },
    {
      id: 'sq5',
      question: 'Newlands\'s Law of Octaves was rejected, but Mendeleev\'s Periodic Table was accepted. Give one reason why Newlands\'s table was rejected, and two things Mendeleev did that made his table better.',
      suggestedWords: [['atomic weight'], ['gap', 'gaps'], ['predict', 'prediction']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: Newlands filled every place / left no gaps, so very different elements (such as copper and sodium) were put in the same group.',
        '1 mark: Mendeleev grouped elements by their similar properties / behaviour and left gaps for elements not yet discovered.',
        '1 mark: Mendeleev predicted the properties of the missing elements, and elements found later (gallium, scandium, germanium) matched his predictions.',
      ],
      modelAnswer: 'Newlands put the elements in order of atomic weight and filled every place in his table, with no gaps. This forced very different elements, such as copper and sodium, into the same group, so other chemists rejected it. Mendeleev also started with atomic weight, but he put elements into groups that behaved alike, and where no known element fitted he left a gap. He then predicted the properties of the missing elements. When gallium, scandium and germanium were discovered, their properties matched his predictions, so chemists accepted his table.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_period3_oxide',
      type: 'mcq',
      inlineSvg: DIAGRAMS.PERIOD3_TABLE,
      imageAlt: 'A table of the Period 3 elements from sodium to argon, Groups I to VIII. Rows: outer electrons 1 to 7, then 8 (full); element type metal, metal, metal, metalloid, then non-metal for the rest; oxide basic, basic, amphoteric, acidic, acidic, acidic, acidic, no oxide; typical compounds NaCl, MgCl2, AlCl3, SiCl4, PH3, H2S, HCl, none.',
      promptText: 'Use the table. The oxide of which element would neutralise dilute hydrochloric acid, but would NOT react with sodium hydroxide solution?',
      options: [
        { val: 'A', text: 'Aluminium' },
        { val: 'B', text: 'Sulfur' },
        { val: 'C', text: 'Magnesium' },
        { val: 'D', text: 'Argon' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'An oxide that reacts with an acid but not with an alkali is BASIC — sodium or magnesium in the table. Aluminium oxide is amphoteric, so it would react with the sodium hydroxide too. Sulfur\'s oxide is acidic, so it reacts with the alkali, not the acid. Argon forms no oxide.',
    },
    {
      id: 'diag_2_noble_monatomic',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SHELLS_NOBLE,
      imageAlt: 'Three atoms from Group VIII: helium with one shell of 2 electrons, neon with shells 2,8 and argon with shells 2,8,8. In every atom the outer shell, drawn in teal, is full.',
      promptText: 'The diagram shows atoms of three Group VIII elements. What do the drawings show that explains why these elements exist as single atoms?',
      options: [
        { val: 'A', text: 'Each atom has eight electrons in total' },
        { val: 'B', text: 'Each atom has the same number of shells' },
        { val: 'C', text: 'Each atom has only one electron in its outer shell' },
        { val: 'D', text: 'Each outer shell is full, so the atoms do not need to bond with each other' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'All three outer shells are full (2 for helium, 8 for neon and argon). A full shell is stable, so the atoms do not share electrons with each other: they stay as single atoms (monatomic). The atoms have different totals (2, 10, 18) and different numbers of shells (1, 2, 3).',
    },
    {
      id: 'diag_3_group1_atoms',
      inlineSvg: DIAGRAMS.SHELLS_GROUP1,
      imageAlt: 'Three atoms from Group I: lithium 2,1 with 2 shells, sodium 2,8,1 with 3 shells, and potassium 2,8,8,1 with 4 shells. Each has a single electron in its outer shell, drawn in teal.',
      promptText: 'The diagram shows atoms of three Group I elements. Use it to explain why these elements react in a similar way, and why the reactivity increases from lithium to potassium.',
      suggestedWords: [['nucleus'], ['shell', 'shells'], ['attract', 'pull']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: each atom has one outer-shell electron (lithium 2,1, sodium 2,8,1, potassium 2,8,8,1), so they react in a similar way.',
        '1 mark: going down, the atoms have more shells (2, 3, 4), so the outer electron is further from the nucleus.',
        '1 mark: the pull of the nucleus on the outer electron is weaker, so it is lost more easily and the element is more reactive.',
      ],
      modelAnswer: 'The diagram shows lithium (2,1), sodium (2,8,1) and potassium (2,8,8,1). Each atom has just one electron in its outer shell, and elements react by losing that electron, so all three react in a similar way. Going from lithium to potassium the atoms have more shells — two, then three, then four — so the outer electron is further from the nucleus. The positive nucleus pulls on it less strongly, so it is lost more easily. That is why the reactivity increases from lithium to potassium.',
    },
  ],

  notes: notes,
  workbook: workbook,
  elementHunt: elementHunt,
  assessment: assessment,
  games: games,
};
