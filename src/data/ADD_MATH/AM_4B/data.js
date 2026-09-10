// src/data/ADD_MATH/AM_4B/data.js
// AM_4B — Sketching Cubic Graphs and Their Moduli. The third unit of the
// IGCSE Additional Mathematics track (Cambridge 0606), covering coursebook
// section 4.3. English only: this track is not bilingual, so there are no
// `vn*` twins.
//
// THE EXEMPLAR for an ADD_MATH unit built for a screen (docs/add-math-course.md):
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — Sketch It + Practice                               65 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// One exercise, one Workbook slot. The production task is SKETCH IT — the
// book's own method, staged: intercepts, end behaviour, cross-or-touch, then
// the modulus folded up by tapping — and it carries every sketching part of
// Exercise 4.3 (Q2, Q4, Q5, Q6). The Practice task carries the rest: reading
// a printed figure, a cubic against a parabola, and the two challenge
// questions that run the section backwards. Between them every part of the
// exercise is set once, and nothing is set twice.
//
// Section 4.4 (cubic inequalities, solved off these sketches) is the next
// unit, AM_4C.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { cubicSketch } from './cubicSketch.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_4B_DATA = {
  meta: {
    id: 'AM_4B',
    title: 'Sketching Cubic Graphs',
    desc: 'Sketch y = k(x − a)(x − b)(x − c) from its factors — intercepts, end behaviour, and whether each root crosses or touches — then reflect it for the modulus.',
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
      // Sketch It IS the section, staged. Practice is the rest of the exercise
      // with worked solutions. Both checkpoint, so neither needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'CUBIC_SKETCH', dbKey: 'p31', maxXP: 35 },
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

  // Key words: the terms a 0606 sketching question uses INSTEAD of numbers.
  // English-only (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Cubic', isReal: true,
      def: 'A polynomial whose highest power is x cubed. Its graph has at most two turning points.',
      sent: 'Sketch the cubic and mark every axis intercept.',
    },
    {
      word: 'Factorised form', isReal: true,
      def: 'A polynomial written as a product of brackets. Each bracket equal to zero gives one root.',
      sent: 'The factorised form shows the x-intercepts without any working.',
    },
    {
      word: 'Intercept', isReal: true,
      def: 'A point where a graph meets an axis. Put y equals zero for the x-intercepts and x equals zero for the y-intercept.',
      sent: 'Indicate clearly the axis intercepts on your sketch.',
    },
    {
      word: 'Root', isReal: true,
      def: 'A value of x that makes the function zero. On the graph, an x-intercept.',
      sent: 'Each linear factor gives one root of the cubic.',
    },
    {
      word: 'Repeated root', isReal: true,
      def: 'A root that comes from a factor appearing twice. The curve touches the axis there instead of crossing it.',
      sent: 'The squared bracket gives a repeated root at x equals one.',
    },
    {
      word: 'Touch', isReal: true,
      def: 'To meet the axis and turn back without crossing it, which happens at a repeated root.',
      sent: 'At a repeated root the curve touches the x-axis.',
    },
    {
      word: 'End behaviour', isReal: true,
      def: 'What y does as x becomes very large and positive, or very large and negative. Decided by the sign of the x cubed coefficient.',
      sent: 'State the end behaviour before you draw the tails.',
    },
    {
      word: 'Leading coefficient', isReal: true,
      def: 'The number multiplying the highest power. For a factorised cubic it is the number in front times the x coefficients of the brackets.',
      sent: 'A negative leading coefficient means the curve falls to the right.',
    },
    {
      word: 'Turning point', isReal: true,
      def: 'A point where the curve changes from rising to falling or the reverse. A sketch shows its rough position, not its exact coordinates.',
      sent: 'A cubic with three distinct roots has two turning points.',
    },
    {
      word: 'Reflect', isReal: true,
      def: 'To flip a part of a graph over a line, as a mirror does. The modulus reflects everything below the x-axis to above it.',
      sent: 'Reflect the negative parts of the curve in the x-axis.',
    },
    {
      word: 'Sketch', isReal: true,
      def: 'A drawing that shows the shape and the key points of a graph, without plotting it accurately point by point.',
      sent: 'A sketch needs the intercepts and the general shape, not a table of values.',
    },
    {
      word: 'Intersect', isReal: true,
      def: 'To cross or meet. Two graphs intersect where their equations have the same y for the same x.',
      sent: 'Use algebra to find where the two graphs intersect.',
    },
  ],

  notes: notes,
  cubicSketch: cubicSketch,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
