// src/data/ADD_MATH/AM_3A/data.js
// AM_3A — Polynomials, Division and the Factor Theorem. The first unit of the
// IGCSE Additional Mathematics track (Cambridge 0606), covering coursebook
// sections 3.1, 3.2 and 3.3. English only: this track is not bilingual, so
// there are no `vn*` twins.
//
// Gate structure, following the COORD_SCI shape:
//   Gate 0 (Learn)  — Notes + Vocab                                  20 XP
//   Gate 1 (Apply)  — Long Division + Practice (3.1) + Book Problems (3.3)  65 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together      20 XP
//
// Tasks total 105 XP against a 100 XP unit (unitXPOf caps the payout), so a
// student can drop a few marks anywhere and still finish. Module properties are
// written out in full (`notes: notes,`) so the audio generator never over-reads
// the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { workbookB } from './workbookB.js';
import { polyDiv } from './polyDiv.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_3A_DATA = {
  meta: {
    id: 'AM_3A',
    title: 'Polynomials & the Factor Theorem',
    desc: 'Name every part of a polynomial, divide one polynomial by another by long division, and use the factor theorem to factorise a cubic completely.',
    track: 'ADD_MATH',
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
        { id: 'POLY_DIV', dbKey: 'p21', maxXP: 25 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'WORKBOOK_B', dbKey: 'p22', maxXP: 20 },
      ],
    },
    {
      // The Quiz and the arcade share one gate: both open at 60 XP, which is 71%
      // of the 85 available before it (the 80% cap in docs/ged-unit-shape.md).
      // GAMES stays 0 XP — a reward the unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 60,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words. These are the terms a 0606 question uses INSTEAD of numbers —
  // "the cubic P(x)", "state the quotient", "the leading coefficient" — so not
  // knowing them costs marks on questions the student could otherwise do.
  // English-only (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Polynomial', isReal: true,
      def: 'An expression made of terms in one variable, using only whole-number powers of that variable.',
      sent: 'The expression 4x cubed minus x plus 9 is a polynomial.',
    },
    {
      word: 'Term', isReal: true,
      def: 'One piece of a polynomial: a coefficient multiplied by a power of the variable.',
      sent: 'This polynomial has four terms.',
    },
    {
      word: 'Coefficient', isReal: true,
      def: 'The number multiplying a power of the variable in a term.',
      sent: 'In the term 7x squared, the coefficient is 7.',
    },
    {
      word: 'Leading coefficient', isReal: true,
      def: 'The coefficient of the highest power. It can never be zero.',
      sent: 'The leading coefficient of 5x to the fourth plus x is 5.',
    },
    {
      word: 'Degree', isReal: true,
      def: 'The highest power of the variable in the polynomial.',
      sent: 'A cubic has degree 3.',
    },
    {
      word: 'Constant term', isReal: true,
      def: 'The term with no variable in it — the number on its own.',
      sent: 'The constant term of x squared minus 6 is negative 6.',
    },
    {
      word: 'Cubic', isReal: true,
      def: 'A polynomial of degree 3.',
      sent: 'Factorise the cubic completely.',
    },
    {
      word: 'Root', isReal: true,
      def: 'A value of x that makes the polynomial equal to zero; where the graph meets the x-axis.',
      sent: 'The roots of this cubic are negative 2, 1 and 4.',
    },
    {
      word: 'Turning point', isReal: true,
      def: 'A point where the curve stops rising and starts falling, or the reverse.',
      sent: 'A quartic has at most three turning points.',
    },
    {
      word: 'Dividend', isReal: true,
      def: 'The polynomial being divided — the one written inside the division.',
      sent: 'Here the dividend is x cubed minus 5x squared plus 8x minus 4.',
    },
    {
      word: 'Divisor', isReal: true,
      def: 'The polynomial you are dividing by — the one written outside.',
      sent: 'Divide the polynomial by the divisor x minus 2.',
    },
    {
      word: 'Quotient', isReal: true,
      def: 'The result of the division, written above the line.',
      sent: 'State the quotient and the remainder.',
    },
    {
      word: 'Remainder', isReal: true,
      def: 'What is left when the division will not go exactly. Its degree is always lower than the divisor.',
      sent: 'The remainder is 19, so x plus 2 is not a factor.',
    },
    {
      word: 'Factor theorem', isReal: true,
      def: 'If P of c equals zero, then x minus c is a factor of P of x.',
      sent: 'Use the factor theorem to show that x minus 4 is a factor.',
    },
  ],

  notes: notes,
  polyDiv: polyDiv,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
