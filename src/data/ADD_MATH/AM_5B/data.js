// src/data/ADD_MATH/AM_5B/data.js
// AM_5B — Exponential Equations, e and ln. The second of four units on
// chapter 5 of the IGCSE Additional Mathematics track (Cambridge 0606),
// covering coursebook sections 5.5 (solving exponential equations), 5.7
// (natural logarithms) and 5.8 (practical applications). AM_5A is 5.1–5.3,
// AM_5C is 5.4 and 5.6, AM_5D is 5.9–5.11. English only: this track is not
// bilingual, so there are no `vn*` twins.
//
// Built from the problem banks by the blueprint in docs/add-math-course.md §9:
// docs/add-math-5-5-exponential-equations.md, …-5-7-natural-logs.md and
// …-5-8-applications.md. ONE TASK PER QUESTION TYPE:
//
//   5.7 C  exact values with e and ln           → Undo It           (levels 1–5)
//   5.7 D  solve with e^(ln x) = x, ln e^x = x   → Undo It           (levels 1–5)
//   5.5 A  take logs; a different base each side → Take Logs         (levels 1–3)
//   5.7 E  e^(…) = k to 3 s.f.                   → Take Logs         (level 4)
//   5.7 F  e^(…) = k in terms of ln              → Take Logs         (level 5)
//   5.7 G  ln(…) = k  (and I1, its exact form)   → Take Logs         (level 6)
//   5.5 B  split with the index laws             → Hidden Quadratic  (level 1)
//   5.5 C  hidden quadratic                      → Hidden Quadratic  (level 2)
//   5.5 D  a shifted power                       → Hidden Quadratic  (level 3)
//   5.5 E  a disguised base                      → Hidden Quadratic  (level 4)
//   5.7 I, J  quadratics in e^x and e^(−x)       → Hidden Quadratic  (levels 5–6)
//   5.7 A, B  calculator values of e^x and ln x  → the deck, and Practice
//   5.7 H, K, L, M, N; 5.5 F, G, H; 5.8 (all)   → Practice (the Workbook)
//
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — Undo It, Take Logs, Hidden Quadratic, Practice     90 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// 130 XP against a 100 XP unit: a student can drop a whole task and finish.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { undoIt } from './undoIt.js';
import { takeLogs } from './takeLogs.js';
import { hiddenQuad } from './hiddenQuad.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_5B_DATA = {
  meta: {
    id: 'AM_5B',
    title: 'Exponential Equations, e and ln',
    desc: 'Take logs to bring an unknown down from a power, spot the quadratic hiding in two powers and reject the values a power can never take, use e and ln as a pair that undo each other, and model growth and decay.',
    track: 'ADD_MATH',
    icon: 'Superscript',
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
      // One task per question type. Undo It comes first: e and ln undoing
      // each other is the tool the other two lean on. Practice carries the
      // parts no engine stages, above all the growth and decay contexts of
      // 5.8. All four checkpoint after every question, so none needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'E_EXACT', dbKey: 'p66', maxXP: 15 },
        { id: 'EXP_LOGS', dbKey: 'p64', maxXP: 25 },
        { id: 'EXP_QUAD', dbKey: 'p65', maxXP: 25 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 25 },
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
  // — no symbols, and no apostrophes in a word. Recognition uses word + def.
  realWords: [
    {
      word: 'Exponential equation', isReal: true,
      def: 'An equation with the unknown in a power, such as two to the power x equals forty-five.',
      sent: 'To solve an exponential equation, bring the unknown down from the power.',
    },
    {
      word: 'Taking logarithms', isReal: true,
      def: 'Applying the same logarithm to both sides of an equation, so that the power law can bring the unknown down in front.',
      sent: 'Taking logarithms of both sides turns a power into a multiplication.',
    },
    {
      word: 'Hidden quadratic', isReal: true,
      def: 'An equation that is a quadratic in disguise, because one power is the square of another. Four to the power x is the square of two to the power x.',
      sent: 'Substitute y for two to the power x, and the hidden quadratic appears.',
    },
    {
      word: 'Substitution', isReal: true,
      def: 'Replacing an expression with a single letter to make an equation simpler to see and to solve.',
      sent: 'The substitution y equals e to the power x turns the equation into a quadratic in y.',
    },
    {
      word: 'Reject', isReal: true,
      def: 'To throw out a value from the working because it cannot satisfy the original equation.',
      sent: 'Reject y equals minus three, because a power of two is never negative.',
    },
    {
      word: 'The number e', isReal: true,
      def: 'An irrational number, about two point seven one eight, that is the natural base for anything that grows or decays continuously.',
      sent: 'The number e appears whenever interest is added more and more often.',
    },
    {
      word: 'Natural logarithm', isReal: true,
      def: 'The logarithm to base e, written l n. It undoes raising e to a power.',
      sent: 'The natural logarithm of e to the power five is five.',
    },
    {
      word: 'Exact form', isReal: true,
      def: 'An answer left with a symbol such as l n or e in it, instead of being rounded to a decimal.',
      sent: 'Give the answer in exact form, as x equals l n four.',
    },
    {
      word: 'Significant figures', isReal: true,
      def: 'The digits of a number that carry its size, counted from the first digit that is not zero.',
      sent: 'Rounded to three significant figures, zero point zero two four six eight becomes zero point zero two four seven.',
    },
    {
      word: 'Exponential growth', isReal: true,
      def: 'Growth in which the amount is multiplied by the same number, bigger than one, in each equal step of time.',
      sent: 'A population that doubles every year shows exponential growth.',
    },
    {
      word: 'Exponential decay', isReal: true,
      def: 'Decay in which the amount is multiplied by the same number, between zero and one, in each equal step of time.',
      sent: 'The medicine in the blood falls by exponential decay.',
    },
    {
      word: 'Initial value', isReal: true,
      def: 'The value of a quantity at the start, when the time is zero. In a model with e, put the time equal to zero, because e to the power zero is one.',
      sent: 'The initial value of the investment was eight thousand dollars.',
    },
    {
      word: 'Half-life', isReal: true,
      def: 'The time it takes for an amount that is decaying to fall to half of what it was.',
      sent: 'After two half-lives, only a quarter of the substance is left.',
    },
    {
      word: 'Doubling time', isReal: true,
      def: 'The time it takes for an amount that is growing to become twice as big.',
      sent: 'The doubling time does not depend on how much there was to begin with.',
    },
  ],

  notes: notes,
  undoIt: undoIt,
  takeLogs: takeLogs,
  hiddenQuad: hiddenQuad,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
