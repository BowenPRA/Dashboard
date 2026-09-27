// src/data/IGCSE_CHEM/M06_7/data.js
// Module 6, Topic Seven (6.7): Group 7, the Halogens — book spread 12.3
// "Group VII: the halogens" (pages 150–151), with the reactivity explanation
// from 12.4 (page 152). English only: this track is not bilingual, so there are
// no `vn*` twins. Wolsey writes "Group 7" and the book "Group VII"; the deck
// says once that they are the same group and then uses the book's name.
//
// An EQUATIONS unit, built on the M06_2 exemplar:
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Equations (SYMBOL_EQ: halogens with metals and hydrogen,
//                      and displacements, word → balanced symbol equation) +
//                      Spectator Strike (IONIC_EQ: displacement reactions, where
//                      the metal ion is the spectator) + Practice + Questions +
//                      Source Analysis
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

export const M06_7_DATA = {
  meta: {
    id: 'M06_7',
    title: 'Group 7: The Halogens',
    desc: 'Describe chlorine, bromine and iodine and the trends down Group VII, predict which halogen displaces which from its halide, write the equations, and explain the trend in reactivity with electron shells.',
    track: 'IGCSE_CHEM',
    icon: 'Atom',
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
      word: 'Halogen', isReal: true,
      def: 'An element in Group VII (Group 7) of the Periodic Table: fluorine, chlorine, bromine, iodine or astatine. The name means "salt-maker".',
      sent: 'Iodine is the halogen in the solution used to clean skin before an injection.',
    },
    {
      word: 'Non-metal', isReal: true,
      def: 'An element that is not a metal. Non-metals are on the right of the Periodic Table, and most do not conduct electricity.',
      sent: 'All the halogens are non-metals.',
    },
    {
      word: 'Diatomic', isReal: true,
      def: 'Made of molecules that each contain two atoms. Every halogen is diatomic: Cl₂, Br₂, I₂.',
      sent: 'Bromine is a diatomic element, so its formula is Br₂.',
    },
    {
      word: 'Poisonous', isReal: true,
      def: 'Harmful or deadly if it gets into the body, for example by breathing it in. All the halogens are poisonous.',
      sent: 'Chlorine gas is poisonous, so it is only used in a fume cupboard.',
    },
    {
      word: 'Vapour', isReal: true,
      def: 'The gas formed from a substance that is a liquid or a solid at room temperature.',
      sent: 'A bottle of bromine fills with orange-brown vapour.',
    },
    {
      word: 'Trend', isReal: true,
      def: 'A gradual change in a property as you go down a group or across a period.',
      sent: 'The boiling points of the halogens show a trend: they increase down the group.',
    },
    {
      word: 'Density', isReal: true,
      def: 'How heavy a substance is for its size: its mass divided by its volume. It increases down Group VII.',
      sent: 'Iodine has a greater density than bromine.',
    },
    {
      word: 'Reactivity', isReal: true,
      def: 'How readily an element takes part in chemical reactions. In Group VII it decreases down the group.',
      sent: 'The iron wool glowed brightest in chlorine because of chlorine\'s high reactivity.',
    },
    {
      word: 'Halide', isReal: true,
      def: 'A compound of a halogen with another element: a chloride, bromide or iodide.',
      sent: 'Potassium iodide is a halide.',
    },
    {
      word: 'Halide ion', isReal: true,
      def: 'The ion a halogen atom forms when it gains one electron. It always has a charge of 1−: Cl⁻, Br⁻, I⁻.',
      sent: 'Sodium bromide is made of sodium ions and bromide ions, which are halide ions.',
    },
    {
      word: 'Displace', isReal: true,
      def: 'To push an element out of its compound and take its place. A halogen displaces a less reactive halogen from a solution of its halide.',
      sent: 'Chlorine displaces iodine from sodium iodide solution.',
    },
    {
      word: 'Chlorine water', isReal: true,
      def: 'A pale yellow solution of chlorine in water, used to test for bromides and iodides by displacement.',
      sent: 'When chlorine water was added, the colourless solution turned orange.',
    },
    {
      word: 'Outer shell', isReal: true,
      def: 'The electron shell furthest from the nucleus. Its electrons take part in reactions. Every halogen atom has 7 electrons in its outer shell.',
      sent: 'Fluorine\'s outer shell is closer to the nucleus than chlorine\'s.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spread's questions
  // and the Checkup but with fresh substances. Prompts are plain text —
  // ShortAnswers.jsx does not render $…$ — so formulae and charges are Unicode.
  shortQA: [
    {
      id: 'sq1',
      question: 'A student adds iodine solution to sodium chloride solution in one tube, and to sodium bromide solution in another. Nothing changes in either tube. Explain why, then name a halogen that WOULD react with the sodium bromide solution and say what the student would see.',
      suggestedWords: [['reactivity'], ['halide'], ['colour']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: iodine is less reactive than chlorine and bromine (it is the least reactive of the three).',
        '1 mark: a halogen can only displace a less reactive halogen from a solution of its halide, so iodine cannot displace chlorine or bromine.',
        '1 mark: chlorine (chlorine water) would displace bromine from sodium bromide, and the solution would turn orange.',
      ],
      modelAnswer: 'Reactivity decreases down Group VII, so iodine is less reactive than both chlorine and bromine. A halogen can only displace a less reactive halogen from a solution of its halide, so iodine cannot push chlorine out of sodium chloride or bromine out of sodium bromide, and nothing happens. Chlorine is more reactive than bromine, so if chlorine water were added to the sodium bromide solution it would displace the bromine, and the colourless solution would turn orange.',
    },
    {
      id: 'sq2',
      question: 'A chlorine atom has the electron arrangement 2,8,7. When chlorine reacts with sodium, sodium chloride forms. Explain what happens to each chlorine atom, and why this makes chlorine so reactive.',
      suggestedWords: [['shell'], ['electron'], ['ion']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a chlorine atom needs only one more electron to have a full outer shell (of 8).',
        '1 mark: it gains / accepts one electron from a sodium atom and becomes a chloride ion, Cl⁻ (2,8,8), with a charge of 1−.',
        '1 mark: because only one electron is needed, the drive to gain it is very strong (it takes little energy), so chlorine reacts readily / is very reactive.',
      ],
      modelAnswer: 'A chlorine atom has 7 electrons in its outer shell, so it needs only one more to reach a full outer shell of 8. When it reacts with sodium, each chlorine atom takes one electron from a sodium atom and becomes a chloride ion, Cl⁻, with the arrangement 2,8,8 and a charge of 1−. Because it needs just one electron, a chlorine atom has a very strong drive to gain it from the atoms of other elements, which is why chlorine is so reactive.',
    },
    {
      id: 'sq3',
      question: 'Bromine reacts with potassium to form potassium bromide, and with hydrogen to form hydrogen bromide. Explain why one product is an ionic compound and the other is made of covalent molecules.',
      suggestedWords: [['metal', 'non-metal'], ['electron'], ['bond']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: potassium is a metal: the bromine atoms accept / gain electrons from the potassium atoms, forming K⁺ and Br⁻ (bromide) ions.',
        '1 mark: so potassium bromide is an ionic compound (a lattice of ions).',
        '1 mark: hydrogen is a non-metal: the atoms share electrons, making HBr molecules held together by covalent bonds.',
      ],
      modelAnswer: 'Potassium is a metal. When it reacts with bromine, each bromine atom takes an electron from a potassium atom, so potassium ions, K⁺, and bromide ions, Br⁻, form. Potassium bromide is therefore an ionic compound, a lattice of these ions. Hydrogen is a non-metal, so it does not give its electron away. Instead a hydrogen atom and a bromine atom share a pair of electrons, forming molecules of hydrogen bromide, HBr, with covalent bonds.',
    },
    {
      id: 'sq4',
      question: 'Hot iron wool is placed in chlorine gas, then in bromine vapour, then in iodine vapour. Describe how what you would see changes, name the product formed with chlorine, and state what the results show.',
      suggestedWords: [['observe', 'see'], ['vigorous'], ['product']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the iron wool glows brightly in chlorine, less brightly in bromine, and only faintly (a faint red glow) in iodine.',
        '1 mark: the product with chlorine is iron(III) chloride, FeCl₃ (a yellow solid).',
        '1 mark: reactivity decreases down Group VII / chlorine is the most reactive of the three and iodine the least.',
      ],
      modelAnswer: 'In chlorine, the hot iron wool glows brightly. In bromine vapour it still glows, but less brightly, and in iodine vapour there is only a faint red glow. With chlorine, the product is iron(III) chloride, FeCl₃, a yellow solid. All three halogens react in the same way, but less and less vigorously, which shows that reactivity decreases as you go down Group VII: chlorine is the most reactive and iodine the least.',
    },
    {
      id: 'sq5',
      question: 'A bottle of bromine must always be opened in a fume cupboard. Bromine boils at 59 °C. Explain why bromine is a liquid at room temperature but still fills the bottle with a coloured gas, and why the fume cupboard is needed.',
      suggestedWords: [['temperature'], ['liquid'], ['safety', 'safe']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: its boiling point (59 °C) is above room temperature (about 20 °C), so bromine is a liquid.',
        '1 mark: the boiling point is not far above room temperature, so the liquid evaporates easily / readily forms a (red-brown / orange-brown) vapour.',
        '1 mark: bromine, like all the halogens, is poisonous, so the vapour must not be breathed in — the fume cupboard carries it away.',
      ],
      modelAnswer: 'Bromine boils at 59 °C, which is above room temperature, so at about 20 °C it is a liquid. But its boiling point is not very far above room temperature, so the liquid evaporates easily and forms an orange-brown vapour that fills the bottle. Bromine, like all the halogens, is poisonous, so the vapour must not be breathed in. The fume cupboard draws the vapour away from the person using it.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_hot_lab',
      type: 'mcq',
      inlineSvg: DIAGRAMS.BP_TREND,
      imageAlt: 'A bar chart of boiling points drawn to scale: chlorine −35 °C (a gas), bromine 59 °C (a liquid), iodine 184 °C (a solid). A dashed line marks room temperature, 20 °C.',
      promptText: 'Imagine a room heated to 70 °C. Using the boiling points on the graph, which halogens would be gases at that temperature?',
      options: [
        { val: 'A', text: 'Chlorine only — it is the only one that is a gas at room temperature' },
        { val: 'B', text: 'Chlorine and bromine — both boil below 70 °C' },
        { val: 'C', text: 'All three — every halogen is a gas when heated' },
        { val: 'D', text: 'Bromine and iodine — the taller bars' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'A substance is a gas above its boiling point. Chlorine boils at −35 °C and bromine at 59 °C, both below 70 °C, so both would be gases. Iodine boils at 184 °C, far above 70 °C. Room temperature (A) no longer matters once the room is at 70 °C.',
    },
    {
      id: 'diag_2_results_conclusion',
      type: 'mcq',
      inlineSvg: DIAGRAMS.RESULTS_GRID,
      imageAlt: 'A 3 by 3 results table. Rows: chloride, bromide and iodide in solution. Columns: add chlorine, add bromine, add iodine. Chlorine displaces bromine (orange solution) and iodine (red-brown solution). Bromine displaces iodine (red-brown solution) but gives no change with chloride. Iodine gives no change with chloride or bromide. The diagonal boxes, a halogen with its own halide, are greyed out.',
      promptText: 'Which conclusion do the results in the table support?',
      options: [
        { val: 'A', text: 'Chlorine displaces both of the other halogens, so it is the most reactive of the three' },
        { val: 'B', text: 'Iodine is displaced most often, so it is the most reactive' },
        { val: 'C', text: 'Bromine does not react with any halide' },
        { val: 'D', text: 'Each halogen reacts only with its own halide' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'Chlorine displaces bromine and iodine, bromine displaces only iodine, and iodine displaces nothing — so the order of reactivity is chlorine > bromine > iodine. Being displaced (B) shows a halogen is LESS reactive. Bromine does react with an iodide (C), and a halogen with its own halide is not a test at all (D).',
    },
    {
      id: 'diag_3_pull',
      inlineSvg: DIAGRAMS.PULL_DISTANCE,
      imageAlt: 'A chlorine atom with 3 shells and a bromine atom with 4 shells, each with 7 electrons in the outer shell. An electron outside each atom is pulled towards the nucleus: a thick arrow for chlorine, whose outer shell is close to the nucleus, and a thin dashed arrow for bromine, whose outer shell is further away.',
      promptText: 'The diagram shows a chlorine atom and a bromine atom, each with a new electron being pulled towards the nucleus. Use it to explain why chlorine is more reactive than bromine.',
      suggestedWords: [['nucleus'], ['shell'], ['electron']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: both atoms have 7 outer-shell electrons and react by gaining one electron (to fill the outer shell).',
        '1 mark: bromine has 4 shells and chlorine 3, so bromine\'s outer shell is further from the (positive) nucleus.',
        '1 mark: so the nucleus attracts / pulls the incoming electron less strongly in bromine; it is harder for bromine to gain an electron, so bromine is less reactive (chlorine is more reactive).',
      ],
      modelAnswer: 'Both atoms have 7 electrons in the outer shell, so each reacts by gaining one more electron. The chlorine atom has 3 shells, but the bromine atom has 4, so bromine\'s outer shell is further from the positive nucleus. As the diagram shows with the thinner arrow, the nucleus pulls on the incoming electron less strongly in bromine. It is harder for a bromine atom to gain an electron, so bromine is less reactive than chlorine.',
    },
  ],

  notes: notes,
  workbook: workbook,
  symbolEq: symbolEq,
  ionicEq: ionicEq,
  assessment: assessment,
  games: games,
};
