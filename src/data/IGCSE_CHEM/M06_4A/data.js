// src/data/IGCSE_CHEM/M06_4A/data.js
// Module 6, Topic Four (6.4), first half: Making Salts — the methods. Book
// spreads 11.6 "Making salts (part I)" and 11.7 "Making salts (part II)"
// (pages 138–141). Titration as a CALCULATION (spread 11.8) is the second half,
// M06_4B. English only: this track is not bilingual, so there are no `vn*` twins.
//
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Order It (SEQUENCE: the steps of each method, one fresh
//                      salt per method) + Spectator Strike (IONIC_EQ: the ionic
//                      equation of a precipitation) + Practice + Questions +
//                      Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 130 (capped at 100 by unitXPOf), so a student can drop a task
// and still finish. Gate 1 sits at 15 of the 20 XP before it (75%) and Gate 2
// at 70 of 110 (64%), both inside the 80% rule the validator enforces. Module
// properties are written out in full (`notes: notes,`) so the audio generator
// never over-reads the realWords array.
//
// The Spectator Strike pool, ionicEq.js, is authored separately (the engine's
// precipitation reactions); this file only imports it.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { sequence } from './sequence.js';
import { ionicEq } from './ionicEq.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_4A_DATA = {
  meta: {
    id: 'M06_4A',
    title: 'Making Salts: The Methods',
    desc: 'Make a pure, dry salt four ways — from an excess of metal, an insoluble base or carbonate, an alkali by titration, or two solutions by precipitation — choose the right method with the solubility rules, and explain hydrated and anhydrous salts.',
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
        { id: 'SEQUENCE', dbKey: 'p34', maxXP: 20 },
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
      word: 'Excess', isReal: true,
      def: 'More than is needed. When a reactant is in excess, some of it is left over when the reaction stops.',
      sent: 'Mr Bowen added zinc until some was left over, so the zinc was in excess.',
    },
    {
      word: 'Residue', isReal: true,
      def: 'The solid that stays in the filter paper when a mixture is filtered.',
      sent: 'The black residue was the copper(II) oxide that had not reacted.',
    },
    {
      word: 'Filtrate', isReal: true,
      def: 'The liquid that passes through the filter paper when a mixture is filtered.',
      sent: 'The filtrate was a clear solution of magnesium chloride.',
    },
    {
      word: 'Saturated solution', isReal: true,
      def: 'A solution that can dissolve no more of the solute at that temperature.',
      sent: 'As the saturated solution cooled, crystals began to form.',
    },
    {
      word: 'Crystallise', isReal: true,
      def: 'To form crystals. A salt crystallises when its saturated solution cools.',
      sent: 'Nickel(II) sulfate crystallises as green crystals.',
    },
    {
      word: 'Titration', isReal: true,
      def: 'A method in which one solution is added slowly to another, with an indicator, to find the exact amount needed to react.',
      sent: 'The titration showed how much acid was needed to neutralise the alkali.',
    },
    {
      word: 'Burette', isReal: true,
      def: 'A long glass tube with a scale and a tap, used to add a solution a little at a time and measure its volume.',
      sent: 'She filled the burette with dilute nitric acid.',
    },
    {
      word: 'Thymolphthalein', isReal: true,
      def: 'An indicator that is blue in alkaline solutions and colourless in neutral and acidic solutions.',
      sent: 'The thymolphthalein turned from blue to colourless when the alkali was used up.',
    },
    {
      word: 'Insoluble', isReal: true,
      def: 'Does not dissolve in water.',
      sent: 'Silver chloride is insoluble, so it can be made by precipitation.',
    },
    {
      word: 'Precipitation', isReal: true,
      def: 'A reaction in which mixing reactants in solution gives an insoluble product.',
      sent: 'Lead ions can be removed from waste water by precipitation.',
    },
    {
      word: 'Precipitate', isReal: true,
      def: 'The insoluble solid that forms when two solutions are mixed.',
      sent: 'A cream precipitate of silver bromide formed at once.',
    },
    {
      word: 'Hydrated', isReal: true,
      def: 'Describes a salt that has water molecules chemically bonded into its crystals.',
      sent: 'Hydrated copper(II) sulfate crystals are blue.',
    },
    {
      word: 'Anhydrous', isReal: true,
      def: 'Describes a salt without its water of crystallisation.',
      sent: 'Anhydrous copper(II) sulfate is a white powder.',
    },
    {
      word: 'Water of crystallisation', isReal: true,
      def: 'The water molecules bonded into the crystals of a hydrated salt.',
      sent: 'Heating the crystals drives off their water of crystallisation.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions
  // and the Checkup but with fresh salts. Prompts are plain text — no $ — so
  // formulae and charges are Unicode (FeSO₄·7H₂O, Pb²⁺).
  shortQA: [
    {
      id: 'sq1',
      question: 'Describe how Mr Bowen can make crystals of iron(II) chloride from iron filings and dilute hydrochloric acid. Explain why he adds the iron in excess.',
      suggestedWords: [['funnel', 'filter paper'], ['evaporate'], ['react', 'reaction']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: add iron to the acid until some is left over / the fizzing stops, so that all of the acid reacts (no acid is left in the salt).',
        '1 mark: filter to remove the unreacted (excess) iron.',
        '1 mark: heat the filtrate to evaporate some water until it is saturated, then leave it to cool so crystals form.',
      ],
      modelAnswer: 'He adds iron filings to the dilute hydrochloric acid until some iron is left over and the fizzing stops. The iron is in excess so that all of the acid reacts, and no acid is left to end up in the salt. Next he filters the mixture to remove the unreacted iron. Then he heats the filtrate to evaporate some of the water until the solution is saturated, and leaves it to cool so that crystals of iron(II) chloride form.',
    },
    {
      id: 'sq2',
      question: 'Explain why copper(II) chloride cannot be made by adding copper to dilute hydrochloric acid, and why potassium sulfate is not made by adding potassium to dilute sulfuric acid. Suggest how potassium sulfate should be made.',
      suggestedWords: [['reactive', 'reactivity'], ['alkali'], ['safe', 'safely']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: copper does not react with dilute acids (so no copper(II) chloride forms).',
        '1 mark: potassium reacts violently / dangerously with acids.',
        '1 mark: make potassium sulfate by titrating potassium hydroxide solution with dilute sulfuric acid (then repeating without the indicator and evaporating).',
      ],
      modelAnswer: 'Copper is not reactive enough to react with dilute acids, so dropping copper into hydrochloric acid would do nothing and no copper(II) chloride would form. Potassium is the opposite: it is so reactive that it reacts violently with acids, so it would not be safe. Potassium sulfate should be made from potassium hydroxide solution, an alkali, and dilute sulfuric acid by titration: find the volume of acid that neutralises the alkali using an indicator, repeat with the same volumes and no indicator, and evaporate the water.',
    },
    {
      id: 'sq3',
      question: 'Lithium chloride is made from lithium hydroxide solution and dilute hydrochloric acid. Explain why a titration is carried out first, and why the reaction is then repeated without the indicator.',
      suggestedWords: [['burette'], ['neutralise', 'neutral'], ['pure', 'purity']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: both reactants are soluble, so an excess of either could not be filtered off.',
        '1 mark: the titration (with an indicator) finds the exact volume of acid that neutralises the alkali.',
        '1 mark: the indicator would stay in the salt as an impurity, so the same volumes are mixed again without it.',
      ],
      modelAnswer: 'Lithium hydroxide and hydrochloric acid are both soluble, so if too much of either were added, the excess would stay dissolved and could not be filtered off. The titration uses an indicator to show the exact volume of acid from the burette that just neutralises the lithium hydroxide. The indicator itself would then be left in the dish with the lithium chloride as an impurity, so the same volumes of acid and alkali are mixed again without it, and the water is evaporated to leave pure lithium chloride.',
    },
    {
      id: 'sq4',
      question: 'Lead(II) bromide is insoluble in water. Name two solutions that could be mixed to make it, use the solubility rules to explain your choice, and write the ionic equation for the reaction.',
      suggestedWords: [['precipitate'], ['ion', 'ions'], ['spectator']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a soluble lead compound and a soluble bromide, e.g. lead(II) nitrate solution and sodium (or potassium) bromide solution.',
        '1 mark: both are soluble because all nitrates and all sodium (or potassium) salts are soluble, while lead(II) bromide is one of the insoluble bromides (so it precipitates).',
        '1 mark: Pb²⁺(aq) + 2Br⁻(aq) → PbBr₂(s).',
      ],
      modelAnswer: 'I would mix lead(II) nitrate solution with sodium bromide solution. Lead(II) nitrate is soluble because all nitrates are soluble, and sodium bromide is soluble because all sodium salts are soluble, so one solution provides the lead ions and the other provides the bromide ions. Bromides are soluble except those of silver and lead, so when the solutions are mixed, lead(II) bromide precipitates. The sodium and nitrate ions are spectators, so the ionic equation is Pb²⁺(aq) + 2Br⁻(aq) → PbBr₂(s).',
    },
    {
      id: 'sq5',
      question: 'Green crystals of iron(II) sulfate have the formula FeSO₄·7H₂O. Explain what the "·7H₂O" in the formula tells you, and describe what happens when the crystals are heated.',
      suggestedWords: [['crystal', 'crystals'], ['bonded', 'bond'], ['formula']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: there are seven water molecules for each FeSO₄ (for each Fe²⁺ ion and SO₄²⁻ ion).',
        '1 mark: the water is bonded into the crystals — it is water of crystallisation, so the salt is hydrated.',
        '1 mark: heating drives off the water, leaving anhydrous iron(II) sulfate.',
      ],
      modelAnswer: 'The ·7H₂O tells you that for every FeSO₄ in the crystal — every iron(II) ion and sulfate ion — there are seven water molecules. This water is chemically bonded into the crystals; it is called water of crystallisation, and it makes the salt hydrated. When the crystals are heated, the water of crystallisation is driven off as steam, and anhydrous iron(II) sulfate is left behind.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_black_solid',
      type: 'mcq',
      inlineSvg: DIAGRAMS.BASE_METHOD,
      imageAlt: 'Three stages of making copper(II) sulfate. First, black copper(II) oxide is warmed with dilute sulfuric acid in a beaker; the solution is blue and black solid is left over at the bottom. Second, the mixture is filtered: excess copper(II) oxide stays in the filter paper and blue copper(II) sulfate solution runs through. Third, the solution is heated in an evaporating dish and blue crystals of CuSO₄·5H₂O form.',
      promptText: 'In the first stage, black solid is still left at the bottom of the beaker however long the mixture is stirred. What does this show?',
      options: [
        { val: 'A', text: 'The reaction has not started yet' },
        { val: 'B', text: 'The acid is in excess, so more copper(II) oxide is needed' },
        { val: 'C', text: 'The copper(II) oxide is in excess, so all of the acid has reacted' },
        { val: 'D', text: 'The black solid is the salt, copper(II) sulfate' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The blue colour shows the reaction has happened, so (A) is wrong. Solid left over means more copper(II) oxide was added than the acid could use: the oxide is in excess and the acid has run out — the opposite of (B). The salt, copper(II) sulfate, is dissolved in the blue solution (D); the black solid is the leftover oxide, which is why it is filtered off next.',
    },
    {
      id: 'diag_2_pick_pair',
      type: 'mcq',
      inlineSvg: DIAGRAMS.SOLUBILITY_TABLE,
      imageAlt: 'A table of the solubility rules. Soluble: all sodium, potassium and ammonium salts (no exceptions); all nitrates (no exceptions); all chlorides, bromides and iodides except those of silver and lead; all sulfates except those of calcium, barium and lead; carbonates of sodium, potassium and ammonium, while all other carbonates are insoluble.',
      promptText: 'A student wants to make insoluble lead(II) sulfate by precipitation. Using the table, which pair should she mix?',
      options: [
        { val: 'A', text: 'Lead(II) chloride and sodium sulfate solution' },
        { val: 'B', text: 'Lead(II) nitrate solution and barium sulfate' },
        { val: 'C', text: 'Lead metal and dilute sulfuric acid' },
        { val: 'D', text: 'Lead(II) nitrate solution and sodium sulfate solution' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'She needs a solution of lead ions and a solution of sulfate ions. All nitrates are soluble, so lead(II) nitrate dissolves; all sodium salts are soluble, so sodium sulfate dissolves. Lead(II) chloride (A) and barium sulfate (B) are exceptions in the table — insoluble — so they cannot provide their ions. Lead reacts too slowly with acid (C).',
    },
    {
      id: 'diag_3_why_steps',
      inlineSvg: DIAGRAMS.PRECIP_METHOD,
      imageAlt: 'Four stages of making barium sulfate: 1, two solutions are mixed in a beaker and a white solid forms; 2, the mixture is filtered and the white precipitate stays in the filter paper; 3, distilled water from a wash bottle is squirted onto the precipitate in the funnel; 4, the precipitate on its filter paper is put in a warm oven.',
      promptText: 'The diagram shows barium sulfate being made from barium chloride solution and magnesium sulfate solution. Explain why stages 2, 3 and 4 are each needed.',
      suggestedWords: [['insoluble'], ['solution'], ['pure', 'impurity']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: stage 2 (filtering) separates the insoluble barium sulfate precipitate, which stays in the filter paper, from the solution (of magnesium chloride).',
        '1 mark: stage 3 (rinsing with distilled water) washes off the solution / soluble ions still on the precipitate, so it is pure (distilled water adds no ions of its own).',
        '1 mark: stage 4 (the warm oven) dries the precipitate / removes the water.',
      ],
      modelAnswer: 'When the solutions are mixed in stage 1, insoluble barium sulfate forms as a white precipitate while magnesium chloride stays dissolved. Stage 2, filtering, separates the two: the barium sulfate is trapped in the filter paper and the magnesium chloride solution runs through. The wet precipitate is still coated in some of that solution, so in stage 3 it is rinsed with distilled water to wash the soluble ions away; distilled water is used because it contains no ions of its own. Finally, in stage 4, the warm oven dries the precipitate so that a pure, dry sample of barium sulfate is left.',
    },
  ],

  notes: notes,
  workbook: workbook,
  sequence: sequence,
  ionicEq: ionicEq,
  assessment: assessment,
  games: games,
};
