// src/data/IGCSE_CHEM/M06_1/data.js
// Module 6, Topic One (6.1): Acids, Bases and Alkalis — book spreads 11.1
// "Acids and bases" and 11.2 "A closer look at acids and alkalis" (pages
// 128–131). English only: this track is not bilingual, so there are no `vn*`
// twins. Stops before 6.2: the reactions of acids, salts and neutralisation
// belong to M06_2.
//
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Formulae (FORMULA_WRITE: the lab acids as H⁺ compounds,
//                      the alkalis and bases from their ions) + Practice +
//                      Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf). Gate 1 sits at 15 of the 20
// XP before it (75%) and Gate 2 at 70 of 90 (78%), both inside the 80% rule
// the validator enforces. Module properties are written out in full
// (`notes: notes,`) so the audio generator never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { formulaWrite } from './formulaWrite.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M06_1_DATA = {
  meta: {
    id: 'M06_1',
    title: 'Acids, Bases and Alkalis',
    desc: 'Name the lab acids and alkalis and write their formulae, say what makes a base an alkali, read litmus, methyl orange, thymolphthalein and the pH scale, name the ions behind acidity and alkalinity, and tell a strong acid from a weak one.',
    track: 'IGCSE_CHEM',
    icon: 'Droplets',
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
      word: 'Acid', isReal: true,
      def: 'A compound that dissolves in water to give hydrogen ions, H⁺. Its solution turns litmus red and has a pH below 7.',
      sent: 'Hydrochloric acid is one of the four acids used in the lab.',
    },
    {
      word: 'Base', isReal: true,
      def: 'An oxide or a hydroxide of a metal. Most bases do not dissolve in water.',
      sent: 'Magnesium oxide is a base.',
    },
    {
      word: 'Alkali', isReal: true,
      def: 'A base that dissolves in water. Its solution contains hydroxide ions, OH⁻, and turns litmus blue.',
      sent: 'Sodium hydroxide is an alkali, but copper(II) oxide is not.',
    },
    {
      word: 'Corrosive', isReal: true,
      def: 'Able to attack and eat away skin, metals and other materials.',
      sent: 'Concentrated acids are corrosive, so they carry a hazard symbol.',
    },
    {
      word: 'Dilute', isReal: true,
      def: 'Describes a solution with only a little of the dissolved substance in a lot of water.',
      sent: 'We use dilute hydrochloric acid in most experiments.',
    },
    {
      word: 'Concentrated', isReal: true,
      def: 'Describes a solution with a lot of the dissolved substance in only a little water.',
      sent: 'Concentrated sulfuric acid must be handled with great care.',
    },
    {
      word: 'Indicator', isReal: true,
      def: 'A substance whose colour shows whether a solution is acidic or alkaline.',
      sent: 'Methyl orange is an indicator that turns yellow in an alkali.',
    },
    {
      word: 'Litmus', isReal: true,
      def: 'A purple dye from lichens, used as a solution or on paper. Acids turn it red and alkalis turn it blue.',
      sent: 'The vinegar turned blue litmus paper red.',
    },
    {
      word: 'Neutral', isReal: true,
      def: 'Neither acidic nor alkaline. A neutral solution has a pH of exactly 7.',
      sent: 'Pure water and sugar solution are both neutral.',
    },
    {
      word: 'pH scale', isReal: true,
      def: 'A scale of numbers from 0 to 14 that shows how acidic or alkaline a solution is. Below 7 is acidic and above 7 is alkaline.',
      sent: 'Lemon juice is near the acidic end of the pH scale.',
    },
    {
      word: 'Universal indicator', isReal: true,
      def: 'A mixture of indicators that changes colour right across the pH scale, so its colour gives the pH.',
      sent: 'The soap solution turned universal indicator blue.',
    },
    {
      word: 'Dissociate', isReal: true,
      def: 'To break up into ions. An acid dissociates in water to give hydrogen ions.',
      sent: 'In water, hydrogen chloride molecules dissociate into H⁺ and Cl⁻ ions.',
    },
    {
      word: 'Strong acid', isReal: true,
      def: 'An acid that is completely dissociated into ions in solution.',
      sent: 'Nitric acid is a strong acid.',
    },
    {
      word: 'Weak acid', isReal: true,
      def: 'An acid that is only partially dissociated into ions in solution. Its dissociation is reversible.',
      sent: 'The citric acid in oranges is a weak acid.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions
  // and the Checkup but with fresh substances. Prompts are plain text —
  // ShortAnswers.jsx does not render $…$ — so formulae and charges are Unicode.
  shortQA: [
    {
      id: 'sq1',
      question: 'Magnesium oxide and potassium hydroxide are both bases, but only potassium hydroxide is an alkali. Explain why.',
      suggestedWords: [['metal'], ['compound'], ['water']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a base is an oxide or a hydroxide of a metal, so both compounds are bases.',
        '1 mark: an alkali is a base that dissolves in water (a soluble base).',
        '1 mark: potassium hydroxide dissolves in water, but magnesium oxide does not (it is insoluble).',
      ],
      modelAnswer: 'A base is an oxide or a hydroxide of a metal. Magnesium oxide is a metal oxide and potassium hydroxide is a metal hydroxide, so both are bases. An alkali is a base that dissolves in water. Potassium hydroxide dissolves, giving a solution that contains hydroxide ions, so it is an alkali. Magnesium oxide does not dissolve in water, so it is a base but not an alkali.',
    },
    {
      id: 'sq2',
      question: 'A student has two unlabelled bottles. One holds dilute nitric acid and the other holds potassium hydroxide solution. Describe how the student could use litmus paper and thymolphthalein to tell them apart, giving the colour each indicator shows in each solution.',
      suggestedWords: [['indicator'], ['sample', 'test'], ['solution']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: litmus turns red in the nitric acid (because it is an acid).',
        '1 mark: litmus turns blue in the potassium hydroxide solution (because it is an alkali).',
        '1 mark: thymolphthalein stays colourless in the nitric acid and turns blue in the potassium hydroxide solution.',
      ],
      modelAnswer: 'The student should test a small sample from each bottle. Litmus paper turns red in the nitric acid, because acids turn litmus red, and it turns blue in the potassium hydroxide solution, because alkalis turn litmus blue. A few drops of thymolphthalein stay colourless in the nitric acid but turn the potassium hydroxide solution blue. So the bottle that gives red litmus and colourless thymolphthalein is the acid.',
    },
    {
      id: 'sq3',
      question: 'Hydrogen nitrate dissolves in water to make nitric acid. Explain why the solution is acidic. Include an equation in your answer.',
      suggestedWords: [['molecule'], ['solution'], ['ion']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: in water, the hydrogen nitrate (HNO₃) molecules break up / dissociate into ions.',
        '1 mark: HNO₃(aq) → H⁺(aq) + NO₃⁻(aq) (state symbols not required).',
        '1 mark: the hydrogen ions, H⁺, are what make the solution acidic (all acid solutions contain them).',
      ],
      modelAnswer: 'When hydrogen nitrate dissolves in water, its molecules dissociate, which means they break up into ions: HNO₃(aq) → H⁺(aq) + NO₃⁻(aq). The solution now contains hydrogen ions, H⁺. Every acid solution contains hydrogen ions, and it is the hydrogen ions that make the solution acidic.',
    },
    {
      id: 'sq4',
      question: 'A student measures the pH of three solutions. X has pH 2, Y has pH 7 and Z has pH 12. Describe each solution, and explain what the pH values tell you about the ions in X and in Z.',
      suggestedWords: [['scale'], ['concentration'], ['ion']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: X is acidic, Y is neutral and Z is alkaline.',
        '1 mark: X has a high concentration of hydrogen ions, H⁺ (the lower the pH, the higher the H⁺ concentration).',
        '1 mark: Z has a high concentration of hydroxide ions, OH⁻ (the higher the pH, the higher the OH⁻ concentration).',
      ],
      modelAnswer: 'On the pH scale, a solution below 7 is acidic, exactly 7 is neutral and above 7 is alkaline. So X is acidic, Y is neutral and Z is alkaline. X has a low pH, which means it has a high concentration of hydrogen ions: the more H⁺ ions, the lower the pH. Z has a high pH, which means it has a high concentration of hydroxide ions: the more OH⁻ ions, the higher the pH.',
    },
    {
      id: 'sq5',
      question: 'A bottle is labelled "concentrated ethanoic acid". A student says: "It is concentrated, so it must be a strong acid." Explain why the student is wrong.',
      suggestedWords: [['dissolved', 'solution'], ['molecule'], ['ion']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: concentrated means there is a lot of acid in a small amount of water.',
        '1 mark: strong / weak describes how much of the acid dissociates (splits into ions); a strong acid is completely dissociated.',
        '1 mark: ethanoic acid is only partially dissociated, so it is a weak acid however concentrated it is.',
      ],
      modelAnswer: 'The student has mixed up two different ideas. "Concentrated" tells you how much acid is dissolved in the water: here, a lot of acid in a little water. "Strong" and "weak" tell you how much of the acid dissociates into ions. A strong acid is completely dissociated. Ethanoic acid is only partially dissociated — most of its molecules stay whole — so it is a weak acid, even when the solution is concentrated.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_blue_universal',
      type: 'mcq',
      inlineSvg: DIAGRAMS.PH_SCALE,
      imageAlt: 'The pH scale from 0 to 14 in universal indicator colours: red for pH 0 to 2, orange 3 to 4, yellow 5 to 6, green 7, blue 8 to 10 and violet 11 to 14. Below 7 is labelled acidic, 7 neutral and above 7 alkaline. An arrow to the left says the more H+ ions, the lower the pH; an arrow to the right says the more OH- ions, the higher the pH.',
      promptText: 'A few drops of universal indicator turn a solution blue. Using the scale, what is the pH of the solution, and which ion does it contain at a higher concentration than pure water does?',
      options: [
        { val: 'A', text: 'About pH 3, and H⁺ ions' },
        { val: 'B', text: 'About pH 7, and neither ion' },
        { val: 'C', text: 'About pH 9, and OH⁻ ions' },
        { val: 'D', text: 'About pH 9, and H⁺ ions' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'Blue sits between pH 8 and 10 on the scale, so the solution is alkaline, at about pH 9. The arrow shows that the higher the pH, the more OH⁻ ions — so it has more hydroxide ions than pure water. H⁺ ions go with the acidic end, where the colours are red, orange and yellow.',
    },
    {
      id: 'diag_2_indicator_table',
      type: 'mcq',
      inlineSvg: DIAGRAMS.INDICATOR_TABLE,
      imageAlt: 'A table of three indicators. Litmus: red in an acid, blue in an alkali. Methyl orange: red in an acid, yellow in an alkali. Thymolphthalein: colourless in an acid, blue in an alkali.',
      promptText: 'A solution turns litmus blue. Using the table, what colours would methyl orange and thymolphthalein show in the same solution?',
      options: [
        { val: 'A', text: 'Methyl orange red, thymolphthalein colourless' },
        { val: 'B', text: 'Methyl orange yellow, thymolphthalein blue' },
        { val: 'C', text: 'Methyl orange yellow, thymolphthalein colourless' },
        { val: 'D', text: 'Methyl orange red, thymolphthalein blue' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'Blue litmus means the solution is an alkali, so read the "in an alkali" column: methyl orange is yellow and thymolphthalein is blue. A is the acid column, and C and D mix one colour from each column.',
    },
    {
      id: 'diag_3_strong_weak',
      inlineSvg: DIAGRAMS.STRONG_WEAK,
      imageAlt: 'Two beakers, each labelled 0.1 mol/dm³. The hydrochloric acid beaker holds only ions: six H+ ions and six Cl- ions, with the caption "every molecule has split into ions" and "6 H+ ions". The ethanoic acid beaker holds five whole CH3COOH molecules, one H+ ion and one CH3COO- ion, with the caption "most molecules are still whole" and "1 H+ ion".',
      promptText: 'The diagram shows the particles in two acid solutions of the same concentration. Using the diagram, explain which acid is strong and which is weak, and say which solution has the lower pH.',
      suggestedWords: [['molecule'], ['ion'], ['concentration']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: hydrochloric acid is strong, because every molecule has dissociated / split into ions (the beaker holds only H⁺ and Cl⁻ ions).',
        '1 mark: ethanoic acid is weak, because only a few molecules have dissociated (most CH₃COOH molecules are still whole).',
        '1 mark: hydrochloric acid has the lower pH, because it has more H⁺ ions (6 against 1) at the same concentration.',
      ],
      modelAnswer: 'Both solutions have the same concentration, 0.1 mol/dm³. In the hydrochloric acid beaker there are no whole molecules at all, only H⁺ and Cl⁻ ions, so every molecule has dissociated: hydrochloric acid is a strong acid. In the ethanoic acid beaker most of the CH₃COOH molecules are still whole and only one has split into H⁺ and CH₃COO⁻ ions, so ethanoic acid is only partially dissociated: it is a weak acid. The hydrochloric acid has more H⁺ ions (six against one), and the more H⁺ ions a solution has, the lower its pH, so the hydrochloric acid has the lower pH.',
    },
  ],

  notes: notes,
  workbook: workbook,
  formulaWrite: formulaWrite,
  assessment: assessment,
  games: games,
};
