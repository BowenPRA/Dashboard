// src/data/ADD_MATH/AM_4A/data.js
// AM_4A — Modulus Equations and Modulus Inequalities. The second unit of the
// IGCSE Additional Mathematics track (Cambridge 0606), covering coursebook
// sections 4.1 and 4.2. English only: this track is not bilingual, so there are
// no `vn*` twins.
//
// Rebuilt 2026-09-10 around tasks that use the screen rather than a page:
//   Gate 0 (Learn)  — Notes (checks AND eight in-deck activities) + Vocab   20 XP
//   Gate 1 (Apply)  — Case Solver + Graph It + Practice + Book Problems     90 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together      20 XP
//
// Tasks total 130 XP against a 100 XP unit (unitXPOf caps the payout), so a
// student can drop a whole task and still finish. The production task is the
// CASE SOLVER: the book's own method — name the shape, split into cases,
// solve, substitute back (or shade the line) — with every move derived from
// the coefficients, so the check that kills an extraneous root happens in
// front of the student with both values on screen. The exercise parts it
// carries are removed from the two Workbook slots, which keep the shapes the
// solver does not do (sums of moduli, the hidden quadratic, a constant k).
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { graphPlot } from './graphPlot.js';
import { modulusSolve } from './modulusSolve.js';
import { workbook } from './workbook.js';
import { workbookB } from './workbookB.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const AM_4A_DATA = {
  meta: {
    id: 'AM_4A',
    title: 'Modulus Equations & Inequalities',
    desc: 'Solve equations and inequalities containing modulus signs, by splitting into cases, by squaring both sides, and by reading the answer off a graph.',
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
      // Case Solver first: it IS the method, staged. Graph It is the picture
      // behind it. The two Workbook slots carry the rest of the exercises with
      // worked solutions, and every task here checkpoints, so none has to be
      // finished in one sitting.
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'MOD_SOLVE', dbKey: 'p30', maxXP: 25 },
        { id: 'GRAPH', dbKey: 'p15', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'WORKBOOK_B', dbKey: 'p22', maxXP: 25 },
      ],
    },
    {
      // The Quiz and the arcade share one gate: both open at 60 XP, which is 55%
      // of the 110 available before it (the 80% cap in docs/ged-unit-shape.md).
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
  // "state the critical values", "find the solution set", "sketch the graph" —
  // so not knowing them costs marks on questions the student could otherwise do.
  // English-only (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Modulus', isReal: true,
      def: 'The distance of a number from zero, written with two vertical bars. It is never negative.',
      sent: 'The modulus of negative seven is seven.',
    },
    {
      word: 'Absolute value', isReal: true,
      def: 'Another name for the modulus. The two words mean exactly the same thing.',
      sent: 'The absolute value of x is written with two vertical bars.',
    },
    {
      word: 'Modulus function', isReal: true,
      def: 'The function whose graph is a V: the positive part of a line, with the negative part folded upwards.',
      sent: 'Sketch the modulus function y equals the modulus of 2x minus 1.',
    },
    {
      word: 'Critical value', isReal: true,
      def: 'A value of x where an expression changes rule or a factor becomes zero. The boundaries of the answer.',
      sent: 'State the critical values before you write the solution.',
    },
    {
      word: 'Vertex', isReal: true,
      def: 'The corner of a V-shaped graph, where the expression inside the modulus is zero.',
      sent: 'The vertex of this graph is at x equals one half.',
    },
    {
      word: 'Gradient', isReal: true,
      def: 'The steepness of a line. Each arm of a modulus graph has the same steepness, with opposite signs.',
      sent: 'The two graphs meet twice because their gradients are different.',
    },
    {
      word: 'Inequality', isReal: true,
      def: 'A statement comparing two quantities with one of the four signs, rather than saying they are equal.',
      sent: 'Solve the inequality the modulus of 2x minus 3 is greater than 5.',
    },
    {
      word: 'Strict inequality', isReal: true,
      def: 'A comparison using less than or greater than, where the boundary value itself is not included.',
      sent: 'The crossing points are left out, because this is a strict inequality.',
    },
    {
      word: 'Interval', isReal: true,
      def: 'A single unbroken stretch of the number line between two values.',
      sent: 'A less-than modulus inequality always gives one interval.',
    },
    {
      word: 'Solution set', isReal: true,
      def: 'All the values that satisfy an equation or inequality, written as one statement.',
      sent: 'Write down the solution set of this inequality.',
    },
    {
      word: 'Equivalent', isReal: true,
      def: 'Two statements that are true in exactly the same cases, so either may replace the other.',
      sent: 'The modulus of p equals the modulus of q is equivalent to p squared equals q squared.',
    },
    {
      word: 'Simultaneous equations', isReal: true,
      def: 'Two equations that must both hold at once. Solving them finds the points where the graphs meet.',
      sent: 'Solve the simultaneous equations and give both coordinates.',
    },
    {
      word: 'Extraneous solution', isReal: true,
      def: 'An answer produced by the algebra that fails when substituted back. Squaring is what usually creates one.',
      sent: 'Check every answer, because squaring can produce an extraneous solution.',
    },
    {
      word: 'Range', isReal: true,
      def: 'The set of output values a function actually takes.',
      sent: 'Use the graph to find the range of the function.',
    },
  ],

  notes: notes,
  graphPlot: graphPlot,
  modulusSolve: modulusSolve,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
