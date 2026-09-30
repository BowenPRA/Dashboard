// src/data/ADD_MATH/AM_5C/data.js
// AM_5C — Log Equations and Change of Base. The third unit on chapter 5 of the
// IGCSE Additional Mathematics track (Cambridge 0606), covering coursebook
// sections 5.4 (solving logarithmic equations) and 5.6 (change of base).
// AM_5A is 5.1–5.3 (logs and the laws, assumed here); AM_5B is 5.5, 5.7 and
// 5.8; AM_5D is 5.9–5.11. English only: this track is not bilingual, so there
// are no `vn*` twins.
//
// Built from two problem banks by the blueprint in docs/add-math-course.md §9:
// docs/add-math-5-4-log-equations.md and docs/add-math-5-6-change-of-base.md.
// ONE TASK PER QUESTION TYPE:
//
//   5.4 A  logs on both sides              → Log Equation Solver  (level 1)
//   5.4 B  a constant on one side          → Log Equation Solver  (level 2)
//   5.4 C  leading to a quadratic          → Log Equation Solver  (level 3)
//   5.4 D  unknown base                    → Log Equation Solver  (level 4)
//   5.6 F  several bases, evaluate first   → Log Equation Solver  (level 5)
//   5.6    worked example: related bases   → Log Equation Solver  (level 5)
//   5.4 E  quadratic in a log              → Quadratic in a Log   (levels 1–3)
//   5.6 I–J reciprocal equations           → Quadratic in a Log   (level 4)
//   5.6 A  evaluate with lg, 3 s.f.        → Change of Base       (level 1)
//   5.6 B  in terms of u, swapped          → Change of Base       (level 2)
//   5.6 C  in terms of x, a related base   → Change of Base       (level 3)
//   5.6 D  one log from two                → Change of Base       (level 4)
//   5.6 E  a product of logs               → Change of Base       (level 5)
//   5.6 G–H two related bases              → Change of Base       (level 6)
//   5.4 F–G, 5.6 K–L simultaneous, "show
//          that", explain the error,
//          challenge                       → Practice (the Workbook)
//
// The thread through the unit is REJECTING A ROOT: a log of a negative number
// (or of 0) and a negative base do not exist, so the last stage of every log
// equation is a check the app evaluates and the student decides. The Solver
// has items where both roots survive, where one does and where none does.
//
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — the three log tasks + Practice                     90 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// 130 XP against a 100 XP unit: a student can drop a whole task and finish.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { logEq } from './logEq.js';
import { logQuad } from './logQuad.js';
import { baseChange } from './baseChange.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_5C_DATA = {
  meta: {
    id: 'AM_5C',
    title: 'Log Equations & Change of Base',
    desc: 'Solve equations with logs in them and check every root, solve a quadratic in a log, and change the base of a log to evaluate it, rewrite it, or solve with it.',
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
      // One task per question type, in the order the sections teach them:
      // log equations (with the check), the quadratic in a log, then change
      // of base. Practice carries what none of them stages. All four
      // checkpoint after every question, so none needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'LOG_EQ', dbKey: 'p67', maxXP: 30 },
        { id: 'LOG_QUAD', dbKey: 'p68', maxXP: 20 },
        { id: 'BASE_CHANGE', dbKey: 'p69', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
      ],
    },
    {
      // Both open at 75 XP, which is 68% of the 110 available before it (the
      // 80% cap in docs/ged-unit-shape.md). GAMES stays 0 XP — a reward the
      // unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 75,
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
      word: 'Logarithmic equation', isReal: true,
      def: 'An equation with the unknown inside a logarithm, or as the base of one.',
      sent: 'To solve a logarithmic equation, combine the logs, remove them, and then check every root.',
    },
    {
      word: 'Exponential form', isReal: true,
      def: 'A log statement written as a power instead. Log base b of a equals c becomes b to the power c equals a.',
      sent: 'Log base two of the bracket equals three, so in exponential form the bracket equals two cubed, which is eight.',
    },
    {
      word: 'Argument', isReal: true,
      def: 'The number or expression inside a logarithm. It must be positive, or the log does not exist.',
      sent: 'At x equals minus three the argument is negative, so that root is rejected.',
    },
    {
      word: 'Domain', isReal: true,
      def: 'The set of values of x for which every log in an equation exists, because every argument is positive.',
      sent: 'The domain is x greater than two, so any root below two is rejected.',
    },
    {
      word: 'Extraneous root', isReal: true,
      def: 'A value that the algebra produces but that does not satisfy the original equation. It must be rejected.',
      sent: 'Squaring the bracket created an extraneous root, which made a log of a negative number.',
    },
    {
      word: 'Checking a root', isReal: true,
      def: 'Putting a value back into the original equation to see that every log exists and both sides are equal.',
      sent: 'Checking a root takes one line, and it is worth a mark.',
    },
    {
      word: 'Reject', isReal: true,
      def: 'To throw out a value from the algebra because it does not work in the original equation.',
      sent: 'Reject x equals minus five, because a base must be positive.',
    },
    {
      word: 'Base', isReal: true,
      def: 'The number whose power a logarithm asks for. A base must be positive and must not be one.',
      sent: 'When the unknown is the base, a negative answer is always rejected.',
    },
    {
      word: 'Change of base rule', isReal: true,
      def: 'Log base b of a equals log base c of a divided by log base c of b, for any new base c.',
      sent: 'Use the change of base rule with base ten to work out log base two of thirteen on a calculator.',
    },
    {
      word: 'Common logarithm', isReal: true,
      def: 'A logarithm to base ten, written lg. It is the log key on a calculator.',
      sent: 'Log base seven of three is the common logarithm of three divided by the common logarithm of seven.',
    },
    {
      word: 'Reciprocal', isReal: true,
      def: 'One divided by a number. Swapping the base and the number of a log gives its reciprocal.',
      sent: 'Log base x of three is the reciprocal of log base three of x.',
    },
    {
      word: 'Substitution', isReal: true,
      def: 'Replacing an expression that appears more than once with a single letter, such as u, to make the equation simpler.',
      sent: 'With the substitution u equals log base two of x, the equation becomes a quadratic in u.',
    },
    {
      word: 'Quadratic in a log', isReal: true,
      def: 'An equation that becomes a quadratic when the log is replaced by a single letter.',
      sent: 'A quadratic in a log has two values of u, and each one gives a value of x.',
    },
    {
      word: 'Significant figures', isReal: true,
      def: 'The digits of a number counted from the first one that is not zero. An answer to three significant figures keeps three of them.',
      sent: 'Log base two of fifty is five point six four, correct to three significant figures.',
    },
  ],

  notes: notes,
  logEq: logEq,
  logQuad: logQuad,
  baseChange: baseChange,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
