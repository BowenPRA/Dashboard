// src/data/ADD_MATH/AM_7A/data.js
// AM_7A — The Equation of a Circle. The fifth unit of the IGCSE Additional
// Mathematics track (Cambridge 0606), and the first on chapter 7, covering the
// first half of coursebook section 7.1: reading, writing and rearranging the
// equation of a circle. The second half of 7.1 (chords, tangents, right angles
// and the circle through three points) is AM_7B; section 7.2 is AM_7C.
// English only: this track is not bilingual, so there are no `vn*` twins.
//
// THIS UNIT IS THE BLUEPRINT for building a unit from a problem bank
// (docs/add-math-course.md §9). The bank is docs/add-math-7-1-circles.md: the
// beats of the book's notes, every exercise question mapped to a TYPE, and
// fresh problems for each type. The unit then gives each type its own task:
//
//   type A  read centre and radius          → Plot the Circle      (levels 1–4)
//   type F  sketches, touching an axis      → Plot the Circle      (level 5)
//                                             Write the Equation   (level 4)
//   type B  write from centre and radius    → Write the Equation   (level 1)
//   type D  centre and one point            → Write the Equation   (level 2)
//   type E  a diameter                      → Write the Equation   (level 3)
//   type C  general form                    → Complete the Square
//   the parts no engine stages              → Practice (the Workbook)
//
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — the three Circle Lab tasks + Practice              85 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// 125 XP against a 100 XP unit: a student can drop a whole task and finish.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { circlePlot } from './circlePlot.js';
import { circleEq } from './circleEq.js';
import { circleSquare } from './circleSquare.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_7A_DATA = {
  meta: {
    id: 'AM_7A',
    title: 'The Equation of a Circle',
    desc: 'Read the centre and radius off an equation and plot the circle, write the equation from what you are given, and complete the square to turn the general form into one you can read.',
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
      // One task per question type, in the order the section teaches them:
      // read an equation, write one, then rearrange one. Practice carries the
      // parts none of them stages. All four checkpoint after every question,
      // so none needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'CIRCLE_PLOT', dbKey: 'p61', maxXP: 20 },
        { id: 'CIRCLE_EQ', dbKey: 'p62', maxXP: 20 },
        { id: 'CIRCLE_SQUARE', dbKey: 'p63', maxXP: 25 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
      ],
    },
    {
      // Both open at 70 XP, which is 67% of the 105 available before it (the
      // 80% cap in docs/ged-unit-shape.md). GAMES stays 0 XP — a reward the
      // unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 70,
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
      word: 'Circle', isReal: true,
      def: 'The set of all points that are the same distance from one fixed point, called the centre.',
      sent: 'Every point on a circle is one radius away from its centre.',
    },
    {
      word: 'Centre', isReal: true,
      def: 'The fixed point in the middle of a circle. Every point on the circle is the same distance from it.',
      sent: 'The centre of the circle is the point three, negative one.',
    },
    {
      word: 'Radius', isReal: true,
      def: 'The distance from the centre of a circle to any point on it. It is a length, so it is never negative.',
      sent: 'The right-hand side of the equation is the radius squared.',
    },
    {
      word: 'Diameter', isReal: true,
      def: 'A straight line across a circle that passes through the centre. Its length is twice the radius.',
      sent: 'The centre is the midpoint of any diameter.',
    },
    {
      word: 'Circumference', isReal: true,
      def: 'The curved line that goes all the way round a circle; also the length of that line.',
      sent: 'The point lies on the circumference, so it is one radius from the centre.',
    },
    {
      word: 'Locus', isReal: true,
      def: 'The set of all points that obey a rule. A circle is the locus of points a fixed distance from a fixed point.',
      sent: 'The locus of points five units from the origin is a circle.',
    },
    {
      word: 'Completed square form', isReal: true,
      def: 'The equation of a circle written with two squared brackets, so that the centre and the radius can be read straight off it.',
      sent: 'In completed square form the centre is the point that makes both brackets zero.',
    },
    {
      word: 'General form', isReal: true,
      def: 'The equation of a circle with the brackets multiplied out and everything collected on one side, equal to zero.',
      sent: 'Complete the square to change the general form back into completed square form.',
    },
    {
      word: 'Completing the square', isReal: true,
      def: 'Rewriting a quadratic expression as a squared bracket plus or minus a number. Halve the coefficient, then take away the square of that half.',
      sent: 'Completing the square in x and in y gives the centre and the radius.',
    },
    {
      word: 'Coefficient', isReal: true,
      def: 'The number that multiplies a letter or a power of a letter in an expression.',
      sent: 'In a circle, x squared and y squared have the same coefficient.',
    },
    {
      word: 'Midpoint', isReal: true,
      def: 'The point exactly halfway between two points. Its coordinates are the averages of theirs.',
      sent: 'Find the midpoint of the diameter to get the centre of the circle.',
    },
    {
      word: 'Tangent', isReal: true,
      def: 'A straight line that touches a circle at exactly one point. It is at right angles to the radius at that point.',
      sent: 'The circle touches the x-axis, so the x-axis is a tangent to it.',
    },
    {
      word: 'Surd', isReal: true,
      def: 'A root that does not work out to a whole number or a fraction, such as the square root of seven. It is left as a root to keep it exact.',
      sent: 'The radius is a surd, so write it as two root three rather than as a decimal.',
    },
    {
      // Written without a possessive: an apostrophe in the word would end up in
      // an audio filename, and the narration generator's parser drops the entry.
      word: 'Theorem of Pythagoras', isReal: true,
      def: 'In a right-angled triangle, the square of the longest side equals the sum of the squares of the other two sides.',
      sent: 'The equation of a circle is the theorem of Pythagoras, written for every point on the circle at once.',
    },
    {
      word: 'Intercept', isReal: true,
      def: 'A point where a graph meets one of the axes.',
      sent: 'A circle can have two, one or no intercepts on each axis.',
    },
  ],

  notes: notes,
  circlePlot: circlePlot,
  circleEq: circleEq,
  circleSquare: circleSquare,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
