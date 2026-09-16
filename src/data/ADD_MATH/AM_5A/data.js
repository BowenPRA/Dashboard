// src/data/ADD_MATH/AM_5A/data.js
// AM_5A — Logarithms and the Laws of Logs. The fourth unit of the IGCSE
// Additional Mathematics track (Cambridge 0606), and the first of three on
// chapter 5, covering coursebook sections 5.1–5.3. English only: this track is
// not bilingual, so there are no `vn*` twins.
//
// The shape of the exemplar, AM_4B (docs/add-math-course.md):
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — Log Simplifier + Practice                          65 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// The production task is the LOG SIMPLIFIER — the laws of logs staged one
// move at a time on a ladder of six levels, with every answer derived exactly
// by utils/logs.js. It carries every "evaluate" and "simplify / write as a
// single logarithm" part of the section. Practice carries the rest: the
// calculator, the unknown in a new place, domains, "in terms of p and q",
// given values of lg 2 and lg 3, and the challenge parts.
//
// The next two units finish the chapter: AM_5B (exponential equations, e and
// ln, growth and decay — sections 5.5, 5.7, 5.8) and AM_5C (log equations,
// change of base, and the graphs — 5.4, 5.6, 5.9, 5.10).
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { logSimplify } from './logSimplify.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_5A_DATA = {
  meta: {
    id: 'AM_5A',
    title: 'Logarithms & the Laws of Logs',
    desc: 'What a logarithm is, the numbers it accepts and gives, and the multiplication, division and power laws — simplifying to a single log, or all the way to a number.',
    track: 'ADD_MATH',
    icon: 'Sigma',
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
      // The Log Simplifier IS the section, staged and levelled. Practice is the
      // rest of the exercises with worked solutions. Both checkpoint, so
      // neither needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'LOG_SIMPLIFY', dbKey: 'p38', maxXP: 35 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 30 },
      ],
    },
    {
      // Both open at 60 XP, which is 71% of the 85 available before it (the
      // 80% cap in docs/ged-unit-shape.md). GAMES stays 0 XP — a reward the
      // unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 60,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words. English-only (word + def + sentence), written to be read aloud
  // — no symbols. Recognition uses word + def.
  realWords: [
    {
      word: 'Logarithm', isReal: true,
      def: 'The power that a base must be raised to, to give a number. The log base two of eight is three, because two cubed is eight.',
      sent: 'A logarithm answers the question: to what power?',
    },
    {
      word: 'Base', isReal: true,
      def: 'The number that is raised to a power. In a logarithm it is written small, below and to the right of the word log.',
      sent: 'The base of a logarithm must be positive and not equal to one.',
    },
    {
      word: 'Index', isReal: true,
      def: 'Another word for a power or exponent: the small raised number that says how many times the base is multiplied.',
      sent: 'In log form, the index stands on its own.',
    },
    {
      word: 'Exponential form', isReal: true,
      def: 'A fact written with a power, such as two to the power three equals eight.',
      sent: 'Convert the logarithm into exponential form.',
    },
    {
      word: 'Logarithmic form', isReal: true,
      def: 'The same fact written with a log, such as log base two of eight equals three.',
      sent: 'Write ten to the power x equals forty-five in logarithmic form.',
    },
    {
      word: 'Common logarithm', isReal: true,
      def: 'A logarithm to base ten, written l g. It is the log key on a calculator.',
      sent: 'The common logarithm of one thousand is three.',
    },
    {
      word: 'Natural logarithm', isReal: true,
      def: 'A logarithm to base e, a special number close to two point seven one eight. It is written l n.',
      sent: 'The natural logarithm of e is one.',
    },
    {
      word: 'Domain', isReal: true,
      def: 'The set of every input a function accepts. The domain of a logarithm is all positive numbers.',
      sent: 'Zero is not in the domain of a logarithm.',
    },
    {
      word: 'Range', isReal: true,
      def: 'The set of every output a function can give. The range of a logarithm is all real numbers.',
      sent: 'The range of an exponential function is only the positive numbers.',
    },
    {
      word: 'Inverse function', isReal: true,
      def: 'A function that undoes another one. A logarithm and raising the base to a power are inverse functions.',
      sent: 'The graphs of inverse functions are reflections of each other in the line y equals x.',
    },
    {
      word: 'Asymptote', isReal: true,
      def: 'A line that a curve gets closer and closer to, but never touches.',
      sent: 'The y-axis is an asymptote of the graph of a logarithm.',
    },
    {
      word: 'Undefined', isReal: true,
      def: 'Having no value at all. The logarithm of zero, or of a negative number, is undefined.',
      sent: 'The log of negative eight is undefined, because no power of two is negative.',
    },
    {
      word: 'Multiplication law', isReal: true,
      def: 'The law that the log of a product is the sum of the logs. Adding logs multiplies the numbers inside.',
      sent: 'By the multiplication law, log twenty plus log five is log one hundred.',
    },
    {
      word: 'Division law', isReal: true,
      def: 'The law that the log of a quotient is the difference of the logs. Subtracting logs divides the numbers inside.',
      sent: 'Use the division law to write the difference as a single logarithm.',
    },
    {
      word: 'Power law', isReal: true,
      def: 'The law that the log of a number raised to a power is that power times the log. A number in front can move inside as a power.',
      sent: 'By the power law, two log three is log nine.',
    },
  ],

  notes: notes,
  logSimplify: logSimplify,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
