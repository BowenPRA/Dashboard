// src/data/EXT_MATH/EM_07B/data.js
// EM_07B — Bearings, Trigonometry & Scatter Graphs. IGCSE Mathematics
// (Extended), Cambridge 0580, built from Wolsey Hall Oxford IGCSE Maths
// Extended Assignment 07. The assignment is wide — 22 questions, 77 marks — so
// it is split in two: this unit is Part B, the geometry and data questions;
// EM_07A carries the bounds, inequalities and simultaneous equations. English
// only: this track is not bilingual, so there are no `vn*` twins.
//
// Built to the EM_06 exemplar (docs/ext-math-course.md):
//   Gate 0 (Learn)  — Notes (checks, activities, widgets) + Vocab          20 XP
//   Gate 1 (Apply)  — Triangle Solver + Practice + Book Problems            75 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together      20 XP
//
// Every Part B question is set once, with fresh numbers — the assignment
// itself is the homework and is never worked here:
//   Q1a    the bearing of one town from another       → Practice f2 (a back bearing)
//   Q1b    a road on a given bearing                  → Practice f3
//   Q1c    a map scale as 1 : n                       → Practice f1
//   Q11    two triangles: trig, then Pythagoras        → Triangle Solver t_two
//   Q12a   sides of a regular polygon                 → Book Problems f1
//   Q12b   height a√3 from sin 60°                    → Triangle Solver t_exact60
//   Q12c   area in exact form                         → Book Problems p2
//   Q13    an angle by cos, then a bearing            → Triangle Solver t_bearing
//   Q14b   acute angle with the x-axis                → Triangle Solver t_line
//   Q15    Pythagoras in exact form                   → Triangle Solver t_exact
//   Q17    the correlation shown                      → Practice p4
//   Q18a–d read, describe, best fit, estimate        → Practice c5a–c5d
//
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { triangles } from './triangles.js';
import { workbook } from './workbook.js';
import { workbookB } from './workbookB.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const EM_07B_DATA = {
  meta: {
    id: 'EM_07B',
    title: 'Bearings, Trigonometry & Scatter Graphs',
    desc: 'Assignment 07, Part B: map scales and bearings; Pythagoras and SOH CAH TOA, exact values and bearings from triangles; the angle a line makes; correlation and lines of best fit.',
    track: 'EXT_MATH',
    icon: 'TriangleRight',
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
      // One engine for the one skill that fills this half of the assignment,
      // plus two Practice slots for the parts no engine stages. Every one
      // checkpoints. Gate 15 is 75% of the 20 XP before it (under the 80% cap).
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'TRIANGLE', dbKey: 'p47', maxXP: 35 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'WORKBOOK_B', dbKey: 'p22', maxXP: 20 },
      ],
    },
    {
      // Both open at 60 XP — 63% of the 95 available before it, under the
      // 80% cap (docs/ged-unit-shape.md). GAMES stays 0 XP: a reward the unit
      // unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 60,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words: the exam's own words. English-only (word + def + sentence),
  // written to be read aloud — no symbols.
  realWords: [
    {
      word: 'Scale', isReal: true,
      def: 'How much smaller a map is than real life, written as one to n with both parts in the same unit.',
      sent: 'The scale of the map is one to five hundred thousand.',
    },
    {
      word: 'Bearing', isReal: true,
      def: 'A direction measured clockwise from north, written with three figures.',
      sent: 'The bearing of the harbour from the lighthouse is zero six five degrees.',
    },
    {
      word: 'Hypotenuse', isReal: true,
      def: 'The longest side of a right-angled triangle, opposite the right angle.',
      sent: 'Label the hypotenuse first, before the other two sides.',
    },
    {
      word: 'Opposite', isReal: true,
      def: 'In trigonometry, the side across the triangle from the marked angle.',
      sent: 'The opposite side does not touch the angle.',
    },
    {
      word: 'Adjacent', isReal: true,
      def: 'In trigonometry, the side next to the marked angle that is not the hypotenuse.',
      sent: 'Cosine is the adjacent side divided by the hypotenuse.',
    },
    {
      word: 'Trigonometry', isReal: true,
      def: 'The maths of the sides and angles of triangles, using sine, cosine and tangent.',
      sent: 'Use trigonometry to find the missing angle.',
    },
    {
      word: 'Sine', isReal: true,
      def: 'For an angle in a right-angled triangle, the opposite side divided by the hypotenuse.',
      sent: 'The sine of thirty degrees is exactly one half.',
    },
    {
      word: 'Cosine', isReal: true,
      def: 'For an angle in a right-angled triangle, the adjacent side divided by the hypotenuse.',
      sent: 'Use cosine when you know the adjacent side and the hypotenuse.',
    },
    {
      word: 'Tangent', isReal: true,
      def: 'For an angle in a right-angled triangle, the opposite side divided by the adjacent side.',
      sent: 'The tangent of the angle a line makes with the x axis is its gradient.',
    },
    {
      word: 'Exterior angle', isReal: true,
      def: 'The turn at each corner as you walk round a polygon. For a regular polygon it is three hundred and sixty divided by the number of sides.',
      sent: 'The exterior angle of a regular hexagon is sixty degrees.',
    },
    {
      word: 'Correlation', isReal: true,
      def: 'How two sets of data are linked: positive, negative, or none.',
      sent: 'Older cars are worth less, so the scatter diagram shows negative correlation.',
    },
    {
      word: 'Line of best fit', isReal: true,
      def: 'A straight line drawn through the middle of the points on a scatter diagram, following their trend.',
      sent: 'Read the estimate from the line of best fit, not from one point.',
    },
  ],

  notes: notes,
  triangles: triangles,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
