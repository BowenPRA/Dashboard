// src/data/IGCSE_CHEM/M06_4B/data.js
// Module 6, Topic Four (6.4), second half: Making Salts — Titration
// Calculations. Built from book spread 11.8 "Finding concentration by
// titration" (pages 142–143), with one slide of recap of 11.6 (titration as a
// method, which M06_4A teaches). Extended content throughout. English only:
// IGCSE_CHEM is not bilingual, so there are no `vn*` twins.
//
// A CALCULATION unit, built like the M05_2 exemplar: one method, in the same
// order every time — read the burette, change cm³ to dm³, then the book's four
// steps (moles of the solution you know → the ratio from the equation → moles
// of the other solution → its concentration).
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Titration Bench + Practice + Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// The production task is TITRATION ("Titration Bench"): it stages the whole
// calculation, so the workbook, the quiz and the written questions test single
// steps and the ideas around them, with three full calculations between them
// (workbook c1, shortQA sq3, quiz a10). Its items live in titration.js, which
// the engine's author owns.
//
// Task XP totals 120 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 100 (70%), both inside the validator's 80% rule. Module properties
// are written out in full (`notes: notes,`) so the audio generator never
// over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { titration } from './titration.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_4B_DATA = {
  meta: {
    id: 'M06_4B',
    title: 'Making Salts: Titration Calculations',
    desc: 'Read a burette, change cm³ into dm³, and use the four steps — moles, ratio, moles, concentration — to find the concentration of an acid or an alkali from a titration.',
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
        { id: 'TITRATION', dbKey: 'p52', maxXP: 30 },
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
      word: 'Titration', isReal: true,
      def: 'A method where one solution is added to another a little at a time, with an indicator, to find exactly how much is needed to react.',
      sent: 'The titration showed that 21.6 cm³ of acid neutralised the alkali.',
    },
    {
      word: 'Burette', isReal: true,
      def: 'A long glass tube with a scale and a tap, used to add a solution a drop at a time and measure how much has been added.',
      sent: 'She filled the burette with nitric acid and recorded the level.',
    },
    {
      word: 'Volumetric pipette', isReal: true,
      def: 'A glass tube with a bulb, filled to a line, that delivers one exact volume of a solution, such as 25.0 cm³.',
      sent: 'He used a volumetric pipette to put 25.0 cm³ of alkali into the flask.',
    },
    {
      word: 'Conical flask', isReal: true,
      def: 'A flask that narrows towards the top, so the mixture in it can be swirled without spilling.',
      sent: 'The alkali and the indicator were swirled in a conical flask.',
    },
    {
      word: 'Indicator', isReal: true,
      def: 'A substance that changes colour when a solution changes from alkaline to neutral or acidic.',
      sent: 'Methyl orange is a good indicator for this titration.',
    },
    {
      word: 'End-point', isReal: true,
      def: 'The point in a titration where the indicator changes colour, because the reaction is just complete.',
      sent: 'At the end-point one drop of acid turned the solution colourless.',
    },
    {
      word: 'Meniscus', isReal: true,
      def: 'The curved surface of a liquid in a narrow tube. A burette is read at the bottom of the meniscus.',
      sent: 'Keep your eye level with the bottom of the meniscus.',
    },
    {
      word: 'Concentration', isReal: true,
      def: 'The number of moles of a substance dissolved in 1 dm³ of solution, measured in mol/dm³.',
      sent: 'The concentration of the sodium hydroxide was 0.2 mol/dm³.',
    },
    {
      word: 'Cubic decimetre', isReal: true,
      def: 'A unit of volume, written dm³. One cubic decimetre is 1000 cubic centimetres.',
      sent: 'There are 1000 cm³ in one cubic decimetre.',
    },
    {
      word: 'Standard solution', isReal: true,
      def: 'A solution whose concentration is known accurately. The other solution is titrated against it.',
      sent: 'The acid was titrated against a standard solution of sodium carbonate.',
    },
    {
      word: 'Mole', isReal: true,
      def: 'The unit for an amount of a substance. Moles = concentration × volume in dm³.',
      sent: 'The titration used 0.004 moles of hydrochloric acid.',
    },
    {
      word: 'Molar ratio', isReal: true,
      def: 'The ratio in which two substances react, read from the numbers in front of their formulae in the balanced equation.',
      sent: 'The molar ratio of sulfuric acid to potassium hydroxide is 1 : 2.',
    },
    {
      word: 'Weak acid', isReal: true,
      def: 'An acid in which only a few molecules are dissociated into ions at any time, such as ethanoic acid.',
      sent: 'Vinegar contains a weak acid, but a titration still measures all of it.',
    },
    {
      word: 'Dissociate', isReal: true,
      def: 'To split up into ions. When an acid dissociates, its molecules give hydrogen ions.',
      sent: 'As the hydrogen ions are used up, more ethanoic acid molecules dissociate.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md). Prompts are plain text — ShortAnswers.jsx does
  // not render $…$ — so formulae and units are Unicode (H₂SO₄, cm³, mol/dm³).
  // Built on the ideas of the spread's questions and the Checkup, with fresh
  // substances and numbers; only sq3 stages a whole calculation.
  shortQA: [
    {
      id: 'sq1',
      question: 'A student reads a burette with her eye above the liquid, and reads the top of the curved surface where it meets the glass. Explain how she should read the burette, and how she then works out the volume of acid she added.',
      suggestedWords: [['meniscus'], ['scale'], ['end-point']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: her eye should be level with the liquid surface (not above it).',
        '1 mark: she should read the bottom of the meniscus / the bottom of the curved surface.',
        '1 mark: she reads the burette before and after (at the end-point), and the volume added = final reading − initial reading.',
      ],
      modelAnswer: 'She should bend down so that her eye is level with the liquid, not above it. The surface of the liquid is curved, and she should read the scale at the bottom of this curve, the meniscus, not at the edges where the liquid climbs the glass. She should take a reading at the start and another at the end-point, and then the volume of acid added is the final reading minus the initial reading.',
    },
    {
      id: 'sq2',
      question: 'A student wants to use moles = concentration × volume, with a concentration in mol/dm³ and a volume of 22.5 cm³. Explain why the volume must be changed first, and change it into the right unit.',
      suggestedWords: [['mol/dm³'], ['unit'], ['cubic centimetre', 'cm³']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: concentration is in moles per dm³ (the moles in each dm³), so the volume must also be in dm³ for the units to match.',
        '1 mark: using cm³ would give an answer 1000 times too big (because 1000 cm³ = 1 dm³).',
        '1 mark: 22.5 cm³ = 22.5 ÷ 1000 = 0.0225 dm³.',
      ],
      modelAnswer: 'The concentration tells you the number of moles in each dm³ of solution, so the volume has to be in dm³ as well, or the units do not match. There are 1000 cm³ in 1 dm³, so if the student used 22.5 instead of the volume in dm³, the number of moles would be 1000 times too big. To change cm³ into dm³ you divide by 1000: 22.5 ÷ 1000 = 0.0225 dm³.',
    },
    {
      id: 'sq3',
      question: '25.0 cm³ of lithium hydroxide solution was exactly neutralised by 15.0 cm³ of 0.20 mol/dm³ hydrochloric acid. HCl + LiOH → LiCl + H₂O. Calculate the concentration of the lithium hydroxide solution, showing your working.',
      suggestedWords: [['moles'], ['ratio'], ['dm³']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: moles of hydrochloric acid = 0.20 × 0.015 = 0.003 mol.',
        '1 mark: the ratio is 1 : 1, so 0.003 mol of lithium hydroxide reacted.',
        '1 mark: concentration = 0.003 ÷ 0.025 = 0.12 mol/dm³ (accept an answer carried forward correctly from a wrong number of moles).',
      ],
      modelAnswer: 'The acid is the solution I know, so I start there. 15.0 cm³ is 0.015 dm³, so the moles of hydrochloric acid are 0.20 × 0.015 = 0.003 mol. The equation shows 1 mole of HCl reacts with 1 mole of LiOH, so 0.003 mol of lithium hydroxide was neutralised. 25.0 cm³ is 0.025 dm³, so the concentration of the lithium hydroxide is 0.003 ÷ 0.025 = 0.12 mol/dm³.',
    },
    {
      id: 'sq4',
      question: '20.0 cm³ of 0.1 mol/dm³ sulfuric acid exactly neutralised 20.0 cm³ of sodium hydroxide solution. A student says: "The volumes are the same, so the sodium hydroxide must also be 0.1 mol/dm³." Explain why the student is wrong.',
      suggestedWords: [['balanced equation'], ['moles'], ['ratio']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the balanced equation is H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O / one sulfuric acid reacts with two sodium hydroxide (a 1 : 2 ratio).',
        '1 mark: so the sodium hydroxide solution must contain twice as many moles as the acid (the student has assumed a 1 : 1 ratio).',
        '1 mark: the volumes are the same, so the sodium hydroxide is twice as concentrated: 0.2 mol/dm³.',
      ],
      modelAnswer: 'The student has assumed that one mole of acid reacts with one mole of alkali. The balanced equation is H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O, so each mole of sulfuric acid neutralises two moles of sodium hydroxide. That means the sodium hydroxide solution contained twice as many moles as the acid. Because those moles were in the same volume, 20.0 cm³, the sodium hydroxide must be twice as concentrated, 0.2 mol/dm³.',
    },
    {
      id: 'sq5',
      question: 'Describe how you could use a titration to find the concentration of a solution of potassium hydroxide. Say what other solution you need, and which solution you start the calculation from.',
      suggestedWords: [['volumetric pipette'], ['indicator'], ['moles']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: you need an acid of known concentration (a standard solution), e.g. hydrochloric acid.',
        '1 mark: pipette a known volume of the potassium hydroxide into a flask with an indicator, add the acid from a burette until the end-point, and find the volume of acid used.',
        '1 mark: the calculation starts from the acid (moles = concentration × volume), then uses the ratio to find the moles of potassium hydroxide, and divides by its volume in dm³.',
      ],
      modelAnswer: 'You need an acid whose concentration is known accurately, a standard solution such as 0.1 mol/dm³ hydrochloric acid. Use a volumetric pipette to put 25.0 cm³ of the potassium hydroxide into a conical flask with a few drops of indicator, then add the acid from a burette until one drop changes the colour, and find the volume of acid used from the two burette readings. The calculation starts from the acid, because both its concentration and its volume are known: moles of acid = concentration × volume in dm³. The equation gives the ratio, which gives the moles of potassium hydroxide, and dividing those by 0.025 dm³ gives its concentration.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_read_scales',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SA_READINGS,
      imageAlt: 'Two close-ups of a burette scale, each marked every 0.1 cm³ and numbered every whole cm³, with the numbers increasing down the tube. At the start, the bottom of the meniscus is two small marks below 4, at 4.2 cm³. At the end-point, the bottom of the meniscus is six small marks below 22, at 22.6 cm³.',
      promptText: 'Read both burette scales at the bottom of the meniscus. What volume of acid was added during the titration?',
      options: [
        { val: 'A', text: '26.8 cm³' },
        { val: 'B', text: '22.6 cm³' },
        { val: 'C', text: '18.4 cm³' },
        { val: 'D', text: '4.2 cm³' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'Each small mark is 0.1 cm³. The initial reading is 4.2 cm³ and the final reading is 22.6 cm³, so the volume added is 22.6 − 4.2 = 18.4 cm³. Option A added the two readings; B used the final reading alone, as if the burette started at zero; D is the initial reading alone.',
    },
    {
      id: 'diag_2_weak_acid',
      type: 'mcq',
      inlineSvg: DIAGRAMS.WEAK_ACID,
      imageAlt: 'Three panels. First, ethanoic acid: five CH3COOH molecules, and just one H+ ion and one CH3COO- ion. Second, alkali added: an OH- ion meets an H+ ion and a water molecule forms; there are now fewer CH3COOH molecules and more CH3COO- ions, with an Na+ ion nearby. Third, at the end-point: only CH3COO- ions, water molecules and Na+ ions — no CH3COOH molecules are left.',
      promptText: 'Ethanoic acid is a weak acid. What do the three panels show about titrating it?',
      options: [
        { val: 'A', text: 'As OH⁻ ions remove the H⁺ ions, more molecules dissociate, until every molecule has reacted' },
        { val: 'B', text: 'The alkali only reacts with the few ions present at the start, so most of the acid is left unreacted' },
        { val: 'C', text: 'The Na⁺ ions neutralise the CH₃COO⁻ ions to make water' },
        { val: 'D', text: 'The CH₃COOH molecules turn straight into water without forming ions' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'In the first panel only one molecule has dissociated. In the middle, OH⁻ turns H⁺ into water, and more molecules dissociate to replace it. By the end-point no CH₃COOH is left, so the titration has counted all of the acid, not just the ions present at the start (B). Na⁺ and CH₃COO⁻ are left in the solution (C); water forms from H⁺ and OH⁻ (D).',
    },
    {
      id: 'diag_3_use_the_rig',
      inlineSvg: DIAGRAMS.TITRATION_RIG,
      imageAlt: 'Titration apparatus. A burette of acid, with a tap, is held in a clamp on a stand above a conical flask. The flask holds alkali and methyl orange indicator, which is yellow, and stands on a white tile. Beside it is a volumetric pipette with a line near the top, labelled "measures exactly 25.0 cm³".',
      promptText: 'The diagram shows the apparatus for a titration. Describe how it is used to find the volume of acid needed to neutralise 25.0 cm³ of the alkali.',
      suggestedWords: [['conical flask'], ['indicator'], ['tap']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: 25.0 cm³ of the alkali is measured into the conical flask with the volumetric pipette, and a few drops of indicator (methyl orange) are added.',
        '1 mark: the acid is added from the burette a little at a time while the flask is swirled, until a single drop changes the indicator colour (yellow to red) — the end-point.',
        '1 mark: the burette is read before and after, and the volume of acid needed = final reading − initial reading.',
      ],
      modelAnswer: 'First, use the volumetric pipette to measure exactly 25.0 cm³ of the alkali into the conical flask, and add a few drops of methyl orange, which turns yellow. Fill the burette with the acid and record the initial reading. Open the tap and add the acid a little at a time, swirling the flask, and watch the colour against the white tile. Stop when a single drop turns the indicator red: this is the end-point. Record the final reading. The volume of acid needed is the final reading minus the initial reading.',
    },
  ],

  notes: notes,
  workbook: workbook,
  titration: titration,
  assessment: assessment,
  games: games,
};
