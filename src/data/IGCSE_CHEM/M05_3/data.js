// src/data/IGCSE_CHEM/M05_3/data.js
// M05_3 Measuring the Rate of a Reaction — Module 5, topic 3 of the IGCSE
// Chemistry track, built from book spreads 9.1 and 9.2 (pages 102–105) plus the
// loss-of-mass method from 9.4. English only: this track is not bilingual, so
// there are no `vn*` twins.
//
// The track's exemplar for a GRAPH AND PRACTICAL unit: the exam asks the
// student to read results, not recall facts. So the production task is Rate
// Reader (RATE_GRAPH, p50): a results curve on a grid and a staged set of reads
// — a volume at a time ("up from the time, across to the volume"), the rate in a
// named minute ("end reading − start reading"), when it finished, the total,
// the average rate with its unit, the steepest part, and two curves compared.
// The deck teaches that method in those words; Practice and the Quiz carry the
// rest (definitions, apparatus and the reason for each step, excess, units,
// working from a table, sources of error) and lean on graphs as little as
// possible.
//
// Gates (docs/igcse-chem-course.md §3):
//   Gate 0 (Learn)  — Notes 10 + Vocab 10                            = 20
//   Gate 1 (Apply)  — Rate Reader 30 + Practice 10 + Questions 20 +
//                     Source Analysis 20                             = 80
//   Gate 2 (Quiz)   — Quiz 20 + Games 0
// Gate 1 opens at 15 of 20 (75%), Gate 2 at 70 of 100 (70%) — both under the
// 80% rule. XP on offer 120, capped at 100. Module properties are written out
// in full (`notes: notes,`) so the audio generator never over-reads realWords.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { rateGraph } from './rateGraph.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const M05_3_DATA = {
  meta: {
    id: 'M05_3',
    title: 'Measuring the Rate of a Reaction',
    desc: 'Follow a reaction by the gas it gives off — gas syringe or balance — then read the curve: the rate in any minute, the average rate with its unit, and why it slows down.',
    track: 'IGCSE_CHEM',
    // UnitCard resolves meta.icon from its own small IconMap (Timer is not in
    // it and would fall back to BookOpen). Activity — a rising trace — is the
    // closest listed icon to a rate curve.
    icon: 'Activity',
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
        { id: 'RATE_GRAPH', dbKey: 'p50', maxXP: 30 },
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

  // Key words — the words the exam question is written in. English only
  // (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Rate', isReal: true,
      def: 'A measure of the change that happens in one unit of time, such as one second or one minute.',
      sent: 'The tap fills the bath at a rate of 12 litres per minute.',
    },
    {
      word: 'Rate of reaction', isReal: true,
      def: 'The amount of a reactant used up, or of a product formed, per unit of time.',
      sent: 'We found the rate of reaction by measuring the hydrogen made each minute.',
    },
    {
      word: 'Reactant', isReal: true,
      def: 'A substance that is used up in a chemical reaction.',
      sent: 'Magnesium is a reactant, so it slowly disappears.',
    },
    {
      word: 'Product', isReal: true,
      def: 'A new substance that is formed in a chemical reaction.',
      sent: 'Hydrogen is a product of the reaction between zinc and acid.',
    },
    {
      word: 'Gas syringe', isReal: true,
      def: 'A syringe that collects a gas; the gas pushes the plunger out, and the scale shows its volume in cubic centimetres.',
      sent: 'The gas syringe read 20 cubic centimetres after one minute.',
    },
    {
      word: 'Stopclock', isReal: true,
      def: 'A clock that is started and stopped by hand, used to time an experiment.',
      sent: 'Start the stopclock at the moment the magnesium goes into the acid.',
    },
    {
      word: 'Excess', isReal: true,
      def: 'More than enough. A reactant in excess is left over when the reaction ends.',
      sent: 'The acid was in excess, so all the magnesium reacted.',
    },
    {
      word: 'Interval', isReal: true,
      def: 'The gap of time between one reading and the next.',
      sent: 'We read the volume at intervals of one minute.',
    },
    {
      word: 'Average rate', isReal: true,
      def: 'The total amount of product formed, divided by the total time the reaction took.',
      sent: 'Sixty cubic centimetres in six minutes is an average rate of ten per minute.',
    },
    {
      word: 'Steep', isReal: true,
      def: 'Rising sharply. On a rate graph, the steeper the curve, the faster the reaction.',
      sent: 'The curve is steepest at the start, when the reaction is fastest.',
    },
    {
      word: 'Loss of mass', isReal: true,
      def: 'The drop in the mass of a flask as a gas escapes from it; mass at the start minus mass at that time.',
      sent: 'The loss of mass after two minutes was 0.6 grams of carbon dioxide.',
    },
    {
      word: 'Source of error', isReal: true,
      def: 'Anything in an experiment that makes a reading differ from the true value.',
      sent: 'A late stopper is a source of error, because some gas escapes.',
    },
  ],

  // Short Answers: one idea each, a clean one-mark-per-line scheme
  // (docs/question-quality.md). Prompts are plain text — ShortAnswers.jsx does
  // not render $…$ — so units are written with the real ³ character. Every item
  // uses fresh substances or numbers; none reproduces a book question.
  shortQA: [
    {
      id: 'sq1',
      question: 'Describe how you would use a gas syringe to measure the rate of the reaction between zinc granules and excess dilute sulfuric acid.',
      suggestedWords: [['conical flask'], ['delivery tube'], ['volume', 'cm³']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: put the acid in a flask, add the zinc, and connect the stopper and gas syringe immediately (so no hydrogen escapes).',
        '1 mark: start the stopclock at the same moment the zinc is added.',
        '1 mark: read the volume of gas in the syringe at regular intervals (for example every 30 seconds or every minute) until it stops changing.',
      ],
      modelAnswer: 'I would measure the dilute sulfuric acid into a conical flask, drop in the zinc granules and at once push in the stopper, which is joined by a delivery tube to a gas syringe, so that none of the hydrogen escapes. I would start the stopclock at the same moment. Then I would read the volume of hydrogen on the syringe scale every minute, and stop when the volume no longer changes, because the reaction is then complete.',
    },
    {
      id: 'sq2',
      question: 'Hydrogen peroxide solution breaks down to give water and oxygen gas. The volume of oxygen collected rises quickly at first, then more and more slowly, and finally stops rising. Explain these three observations.',
      suggestedWords: [['particles'], ['reactant'], ['decompose', 'breaks down']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: at the start there is the most hydrogen peroxide, so the rate is greatest (the volume rises quickly).',
        '1 mark: as the hydrogen peroxide is used up there are fewer particles left to react, so the rate decreases.',
        '1 mark: when all the hydrogen peroxide has been used up, no more oxygen is made, so the volume stops rising (the reaction is over).',
      ],
      modelAnswer: 'At the start there is the most hydrogen peroxide, so the reaction is at its fastest and the oxygen comes off quickly. As the reaction goes on the hydrogen peroxide is used up, so there are fewer and fewer particles left to react and the rate slows down. Once all the hydrogen peroxide has broken down, no more oxygen can form, so the volume stays the same: the reaction is over.',
    },
    {
      id: 'sq3',
      question: 'Marble chips react with dilute hydrochloric acid. The gas syringe reads 30 cm³ after 1 minute and 52 cm³ after 2 minutes. The volume stops rising at 5 minutes, when it reads 80 cm³. Calculate the rate of reaction during the second minute and the average rate for the whole reaction. Show your working and give units.',
      suggestedWords: [['reading'], ['total'], ['divide', 'divided by']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: rate in the second minute = 52 − 30 = 22 (end reading minus start reading).',
        '1 mark: average rate = 80 ÷ 5 = 16 (total volume divided by the time the reaction took).',
        '1 mark: both rates given with the unit cm³/min (cubic centimetres per minute).',
      ],
      modelAnswer: 'The second minute runs from 1 to 2 minutes, so the rate during it is the end reading minus the start reading: 52 − 30 = 22 cm³/min. The reaction was over at 5 minutes with 80 cm³ collected, so the average rate is the total volume divided by the total time: 80 ÷ 5 = 16 cm³/min.',
    },
    {
      id: 'sq4',
      question: 'A flask of marble chips and dilute hydrochloric acid stands on a balance, with a loose plug of cotton wool in its neck. Explain why the reading on the balance falls, and why cotton wool is used instead of a rubber bung.',
      suggestedWords: [['balance', 'reading'], ['mass'], ['flask']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the reaction makes carbon dioxide gas, which escapes from the flask, so the mass falls (mass lost = mass of gas given off).',
        '1 mark: the cotton wool lets the gas out — a rubber bung would trap it, so the mass would not change.',
        '1 mark: the cotton wool stops drops of acid spraying out of the flask, which would make the loss of mass too large.',
      ],
      modelAnswer: 'The marble chips react with the acid to make carbon dioxide gas, which leaves the flask, so the flask gets lighter and the reading falls; the mass lost is the mass of gas given off. A rubber bung would trap the gas inside, so the mass would not change at all. The loose cotton wool lets the carbon dioxide out but stops drops of acid spraying out, which would otherwise add to the loss of mass and make the rate look too high.',
    },
    {
      id: 'sq5',
      question: 'A student follows the reaction of calcium granules with water by collecting the hydrogen in a gas syringe. Suggest one source of error in this experiment, say how it affects the results, and describe how the method could be improved to reduce it.',
      suggestedWords: [['accurate', 'accuracy'], ['reading'], ['improve', 'improvement']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: names a real source of error (for example: hydrogen escapes before the stopper is put in; the stopclock is not started at the moment the calcium is added; the plunger sticks; readings are taken late).',
        '1 mark: states its effect correctly (for example: every volume reads too low; the times are wrong, so the rates are wrong; the volume rises in jumps).',
        '1 mark: gives a sensible improvement that reduces that error (for example: hold the calcium in a small tube inside the sealed flask and tip it into the water once the apparatus is closed; have a partner start the clock; turn the plunger gently so it moves freely).',
      ],
      modelAnswer: 'One source of error is that some hydrogen escapes in the time between adding the calcium and pushing the stopper in. This makes every volume reading lower than the true volume produced. To reduce it, the calcium could be held in a small tube inside the sealed flask and tipped into the water only after the stopper and syringe are in place, with the stopclock started at that moment.',
    },
  ],

  // Source Analysis (Diagrams): 2 MCQ : 1 written, built on the authored
  // drawings in diagrams.js. The graph items read TWO_METALS, whose data are
  // A: flat at 40 cm³ from 4 min; B: flat at 48 cm³ from 8 min.
  diagrams: [
    {
      id: 'diag_1_mass_loss',
      type: 'mcq',
      inlineSvg: DIAGRAMS.MASS_LOSS_RIG,
      imageAlt: 'A conical flask containing marble chips and dilute hydrochloric acid, with a cotton wool plug in its neck, standing on a balance that reads 151.26 g. Arrows show carbon dioxide leaving through the cotton wool. A stopclock stands beside it.',
      promptText: 'This apparatus follows the reaction between marble chips and dilute hydrochloric acid. The reading on the balance falls as the reaction goes on. Why?',
      options: [
        { val: 'A', text: 'The marble chips dissolve, and a dissolved substance has no mass.' },
        { val: 'B', text: 'Carbon dioxide gas is made and escapes through the cotton wool.' },
        { val: 'C', text: 'The acid boils away because the reaction is hot.' },
        { val: 'D', text: 'The cotton wool soaks up some of the acid.' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'The reaction makes carbon dioxide, a gas. It passes out through the loose cotton wool, so the flask loses mass; the mass lost is the mass of gas given off. Dissolved substances still have mass (A), and the cotton wool would not take mass OUT of the flask even if it got wet (D).',
    },
    {
      id: 'diag_2_two_metals',
      type: 'mcq',
      inlineSvg: DIAGRAMS.TWO_METALS,
      imageAlt: 'A graph of volume of hydrogen in cm³ (0 to 60) against time in minutes (0 to 10) for two metals. Curve A rises steeply and goes flat at 40 cm³ at 4 minutes. Curve B rises less steeply and goes flat at 48 cm³ at 8 minutes. The two curves cross just before 5 minutes.',
      promptText: 'The same mass of two metals, A and B, was added to excess dilute hydrochloric acid, and the hydrogen was collected. Which statement is correct?',
      options: [
        { val: 'A', text: 'B reacted faster, because its curve ends higher.' },
        { val: 'B', text: 'A and B reacted at the same rate, because both curves end up flat.' },
        { val: 'C', text: 'A reacted faster and also made more hydrogen.' },
        { val: 'D', text: 'A reacted faster, but B made more hydrogen.' },
      ],
      correct: 'D',
      marks: 1,
      expEn: 'Speed shows in the steepness: A is much steeper at the start and finishes after 4 minutes, while B takes 8. The HEIGHT of the flat part shows the total: B levels off at 48 cm³, above A at 40 cm³. "Ends higher" means more gas, not faster.',
    },
    {
      id: 'diag_3_average_rate_B',
      inlineSvg: DIAGRAMS.TWO_METALS,
      imageAlt: 'A graph of volume of hydrogen in cm³ (0 to 60) against time in minutes (0 to 10) for two metals. Curve A goes flat at 40 cm³ at 4 minutes. Curve B, dashed, rises more slowly and goes flat at 48 cm³ at 8 minutes.',
      promptText: 'Look at the dashed curve for metal B. Use the graph to find when the reaction of B finished and the total volume of hydrogen it made. Then calculate the average rate of the reaction of B, with its unit. Say how you read each value from the graph.',
      suggestedWords: [['axis'], ['total'], ['average rate']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the reaction of B finished at 8 minutes, where its curve goes flat (the volume stops rising).',
        '1 mark: the total volume for B is 48 cm³ (accept 47–49 cm³), read across from the flat part of the curve to the volume axis.',
        '1 mark: average rate = total volume ÷ time taken = 48 ÷ 8 = 6 cm³/min (accept an answer consistent with their own readings, with the unit cm³/min).',
      ],
      modelAnswer: 'Curve B stops rising and goes flat at 8 minutes, so that is when the reaction of B finished. Going across from the flat part of the curve to the volume axis gives a total of 48 cm³ of hydrogen. The average rate is the total volume divided by the time the reaction took: 48 ÷ 8 = 6 cm³/min.',
    },
  ],

  notes: notes,
  workbook: workbook,
  rateGraph: rateGraph,
  assessment: assessment,
  games: games,
};
