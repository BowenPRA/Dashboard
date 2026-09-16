// src/data/EXT_MATH/EM_06/data.js
// EM_06 — Sets, Surds and Rationalising. The first unit of the IGCSE
// Mathematics (Extended) track (Cambridge 0580), built from Wolsey Hall Oxford
// IGCSE Maths Extended Assignment 06: Question 4 (surds, rationalising, a
// triangle with conjugate sides), Question 5 (a two-set Venn diagram) and
// Question 6 (factorising a difference of two squares). English only: this
// track is not bilingual, so there are no `vn*` twins.
//
// THE EXEMPLAR for an EXT_MATH unit (docs/ext-math-course.md):
//   Gate 0 (Learn)  — Notes (checks, activities, widgets) + Vocab          20 XP
//   Gate 1 (Apply)  — Set It Out + Surd Breaker + Rationalise It + Practice 100 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together      20 XP
//
// Every part of the assignment is set once, with fresh numbers — the
// assignment itself is the homework and is never worked here:
//   Q4a  √a + √b in the form k√a        → Surd Breaker (collect items)
//   Q4b  "show that … (a + √3)/b"        → Rationalise It (item b3)
//   Q4c  a conjugate pair over a root    → Practice 1
//   Q4d  triangle with sides a ± √b      → Practice 2 (and Challenge 7)
//   Q5   Venn diagram, counts → P        → Set It Out (item "sport")
//   Q6a  5x⁴ − 20y²                      → Practice 3
//   Q6b  (x² + 4)² − (x² − 2)²           → Practice 4
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { venn } from './venn.js';
import { surds } from './surds.js';
import { rationalise } from './rationalise.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const EM_06_DATA = {
  meta: {
    id: 'EM_06',
    title: 'Sets, Surds & Rationalising',
    desc: 'Assignment 06: read and shade set notation on Venn diagrams, simplify surds fully, and rationalise denominators — including the conjugate.',
    track: 'EXT_MATH',
    icon: 'SquareRadical',
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
      // One task per skill the assignment tests, plus Practice for the parts
      // no engine stages. All four checkpoint, so none needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'VENN', dbKey: 'p35', maxXP: 30 },
        { id: 'SURD_SIMPLIFY', dbKey: 'p36', maxXP: 25 },
        { id: 'RATIONALISE', dbKey: 'p37', maxXP: 30 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
      ],
    },
    {
      // Both open at 60 XP — 50% of the 120 available before it, well under
      // the 80% cap (docs/ged-unit-shape.md). GAMES stays 0 XP: a reward the
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

  // Key words: the exam's own instruction and notation words. English-only
  // (word + def + sentence), written to be read aloud — no symbols.
  realWords: [
    {
      word: 'Set', isReal: true,
      def: 'A collection of objects, written as a list inside curly brackets.',
      sent: 'List the elements of the set.',
    },
    {
      word: 'Element', isReal: true,
      def: 'One member of a set.',
      sent: 'Six is an element of the set of even numbers.',
    },
    {
      word: 'Universal set', isReal: true,
      def: 'Everything the question is about. On a Venn diagram it is the rectangle.',
      sent: 'The universal set is the whole numbers from one to twelve.',
    },
    {
      word: 'Venn diagram', isReal: true,
      def: 'A diagram with a rectangle for the universal set and a circle for each set.',
      sent: 'Complete the Venn diagram, starting in the middle.',
    },
    {
      word: 'Intersection', isReal: true,
      def: 'The elements that are in both sets at the same time. It is the overlap of the circles.',
      sent: 'Students who like both fruits are in the intersection.',
    },
    {
      word: 'Union', isReal: true,
      def: 'The elements that are in either set, or in both.',
      sent: 'The union is everything inside the two circles.',
    },
    {
      word: 'Complement', isReal: true,
      def: 'Everything in the universal set that is not in a given set.',
      sent: 'The complement of A is everything outside circle A.',
    },
    {
      word: 'Empty set', isReal: true,
      def: 'A set with no elements in it.',
      sent: 'No number is both odd and even, so that set is the empty set.',
    },
    {
      word: 'Surd', isReal: true,
      def: 'A square root that is not a whole number. A surd is an exact value.',
      sent: 'Leave your answer as a surd.',
    },
    {
      word: 'Simplify fully', isReal: true,
      def: 'Keep simplifying until nothing more can be done. For a surd, no square factor is left under the root.',
      sent: 'Two root eighteen is not simplified fully.',
    },
    {
      word: 'Like surds', isReal: true,
      def: 'Surds with the same number under the root. Like surds can be added and subtracted.',
      sent: 'Three root two and five root two are like surds.',
    },
    {
      word: 'Rationalise', isReal: true,
      def: 'To rewrite a fraction so that there is no surd in its denominator.',
      sent: 'Rationalise the denominator of the fraction.',
    },
    {
      word: 'Denominator', isReal: true,
      def: 'The number on the bottom of a fraction.',
      sent: 'Multiply the numerator and the denominator by the same number.',
    },
    {
      word: 'Conjugate', isReal: true,
      def: 'The same two terms with the sign between them changed.',
      sent: 'Multiply by the conjugate so that the surds cancel.',
    },
    {
      word: 'Difference of two squares', isReal: true,
      def: 'One square number or expression minus another. It factorises into two brackets that differ only in their middle sign.',
      sent: 'x squared minus nine is a difference of two squares.',
    },
  ],

  notes: notes,
  venn: venn,
  surds: surds,
  rationalise: rationalise,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
