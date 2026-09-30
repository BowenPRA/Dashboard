// src/data/ADD_MATH/AM_5D/data.js
// AM_5D — Graphs and Inverses of Exponential and Log Functions. The fourth
// unit on chapter 5 of the IGCSE Additional Mathematics track (Cambridge
// 0606), covering coursebook sections 5.9 (the graphs of eˣ and ln x), 5.10
// (the graphs of y = k·e^(nx) + a and y = k·ln(ax + b)) and 5.11 (the inverses
// of exponential and logarithmic functions). It leans on chapter 1 (functions,
// composite and inverse functions); the deck recaps what it needs.
// English only: this track is not bilingual, so there are no `vn*` twins.
//
// Built from the problem banks by the blueprint in docs/add-math-course.md §9:
// docs/add-math-5-9-graphs-of-e-and-ln.md, docs/add-math-5-10-sketching-exp-
// and-ln.md and docs/add-math-5-11-inverses.md. Every question TYPE has a home:
//
//   5.9  A  families of exponential curves   → Move the Curve     (levels 1–3)
//   5.9  B  families of log curves           → Move the Curve     (levels 4–6)
//   5.9  C  quick crossings and asymptotes   → the deck and Practice
//   5.9  D  true or false, exact crossings   → Practice
//   5.10 A  the six facts of one curve       → Sketch the Curve   (every item
//                                              asks them, in the book's order)
//   5.10 B  sketch an exponential            → Sketch the Curve   (levels 1–4)
//   5.10 C  sketch a log curve               → Sketch the Curve   (levels 5–8)
//   5.10 D  k and a from an asymptote and a point; which a crosses → Practice
//   5.11 A  inverse of an exponential        → Find the Inverse   (levels 1–6)
//   5.11 B  inverse of a log function        → Find the Inverse   (levels 7–10)
//   5.11 C  range, inverse, domain           → Find the Inverse (its domain
//                                              stage), and f⁻¹f(x) in Practice
//   5.11 D  composites and equations         → Practice
//   5.11 E  both curves on one grid; a function with no inverse → Practice
//
//   Gate 0 (Learn)  — Notes (checks and in-deck activities) + Vocab      20 XP
//   Gate 1 (Apply)  — the three Exp Graph Lab tasks + Practice           85 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together   20 XP
//
// 125 XP against a 100 XP unit: a student can drop a whole task and finish.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { curveFamily } from './curveFamily.js';
import { expSketch } from './expSketch.js';
import { fnInverse } from './fnInverse.js';
import { workbook } from './workbook.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_5D_DATA = {
  meta: {
    id: 'AM_5D',
    title: 'Graphs and Inverses of Exponential and Log Functions',
    desc: 'See what a constant does to the graphs of eˣ and ln x, sketch transformed curves with their exact crossings and asymptotes, and find the inverse of an exponential or a log function with its domain.',
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
      // One task per question type, in the order the chapter teaches them:
      // what a constant does (5.9), sketching (5.10), inverses (5.11).
      // Practice carries the parts none of them stages. All four checkpoint
      // after every question, so none needs one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'CURVE_FAMILY', dbKey: 'p72', maxXP: 15 },
        { id: 'EXP_SKETCH', dbKey: 'p70', maxXP: 25 },
        { id: 'FN_INVERSE', dbKey: 'p71', maxXP: 25 },
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
  // — no symbols, and no apostrophes (the narration parser drops an entry that
  // has one). Recognition uses word + def.
  realWords: [
    {
      word: 'Exponential function', isReal: true,
      def: 'A function with the variable in the power, such as e to the power x. Each equal step in x multiplies the value by the same amount.',
      sent: 'The graph of an exponential function gets closer and closer to a horizontal line on one side.',
    },
    {
      word: 'The number e', isReal: true,
      def: 'An irrational number, about two point seven one eight. It is the base of the natural exponential function and of natural logarithms.',
      sent: 'Any power of the number e is positive, so e to the power x can never be zero or negative.',
    },
    {
      word: 'Natural logarithm', isReal: true,
      def: 'The logarithm to base e, written l n. The natural log of a number is the power of e that gives that number.',
      sent: 'The natural logarithm of one is zero, because e to the power zero is one.',
    },
    {
      word: 'Asymptote', isReal: true,
      def: 'A straight line that a curve gets closer and closer to but never reaches.',
      sent: 'The curve y equals e to the power x plus three has the asymptote y equals three.',
    },
    {
      word: 'Vertical asymptote', isReal: true,
      def: 'An asymptote that is a vertical line, x equals a number. A log curve has one where the inside of the log is zero.',
      sent: 'The vertical asymptote of the natural log of x minus two is the line x equals two.',
    },
    {
      word: 'Intercept', isReal: true,
      def: 'A point where a graph crosses one of the axes.',
      sent: 'Put x equal to zero to find the y intercept.',
    },
    {
      word: 'Domain', isReal: true,
      def: 'The set of input values that a function is allowed to take.',
      sent: 'A log function has a restricted domain, because the inside of the log must be positive.',
    },
    {
      word: 'Range', isReal: true,
      def: 'The set of output values that a function actually produces.',
      sent: 'The range of e to the power x is every positive number.',
    },
    {
      word: 'Inverse function', isReal: true,
      def: 'The function that undoes another function. Its graph is the reflection of the original graph in the line y equals x.',
      sent: 'The natural log function is the inverse function of e to the power x.',
    },
    {
      word: 'One-one function', isReal: true,
      def: 'A function where every output comes from exactly one input. Only a one-one function has an inverse.',
      sent: 'An exponential function is one-one, so it has an inverse.',
    },
    {
      word: 'Composite function', isReal: true,
      def: 'Two functions applied one after the other. The function f g of x means apply g first, then apply f to the result.',
      sent: 'A function and its inverse make a composite function that gives back x.',
    },
    {
      word: 'Reflection', isReal: true,
      def: 'A transformation that flips a graph over a mirror line.',
      sent: 'A negative number in front of the function gives a reflection of its graph in the x axis.',
    },
    {
      word: 'Translation', isReal: true,
      def: 'A transformation that slides a graph without turning or stretching it.',
      sent: 'Adding three to a function is a translation of its graph three units up.',
    },
    {
      word: 'Stretch', isReal: true,
      def: 'A transformation that pulls a graph away from an axis by a scale factor.',
      sent: 'Multiplying e to the power x by four is a stretch away from the x axis, so the y intercept moves up to four.',
    },
    {
      word: 'Sketch', isReal: true,
      def: 'A drawing of a graph that shows its shape and its key features, such as where it crosses the axes and its asymptotes, but not an accurate scale.',
      sent: 'A sketch must show the exact coordinates of each crossing and the equation of each asymptote.',
    },
  ],

  notes: notes,
  curveFamily: curveFamily,
  expSketch: expSketch,
  fnInverse: fnInverse,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
