// src/data/EXT_MATH/EM_07A/data.js
// EM_07A — Bounds, Inequalities & Simultaneous Equations. IGCSE Mathematics
// (Extended), Cambridge 0580, built from Wolsey Hall Oxford IGCSE Maths
// Extended Assignment 07. The assignment is wide — 22 questions, 77 marks — so
// it is split in two: this unit is Part A, the number and algebra questions;
// EM_07B carries the bearings, triangles and scatter graphs. English only:
// this track is not bilingual, so there are no `vn*` twins.
//
// Built to the EM_06 exemplar (docs/ext-math-course.md):
//   Gate 0 (Learn)  — Notes (checks, activities, widgets) + Vocab          20 XP
//   Gate 1 (Apply)  — Inequalities + Simultaneous + Practice + Book Problems 90 XP
//   Gate 2 (Quiz)   — the Quiz and the Games arcade, unlocked together      20 XP
//
// Every Part A question is set once, with fresh numbers — the assignment
// itself is the homework and is never worked here:
//   Q1d    a time plus some minutes                   → Practice f1
//   Q2     timetable across a time zone               → Practice p4
//   Q3, Q4 bounds to 1 d.p. and to the nearest 5     → Practice f2, p3
//   Q5     solve a linear inequality                  → Inequalities i_solve (and i_flip)
//   Q6     double inequality, the integers            → Inequalities i_split (and i_three)
//   Q7     the inequality a number line shows         → Inequalities i_read
//   Q8     region from three labelled lines           → Inequalities i_region
//   Q9     unshaded region, lines unlabelled          → Inequalities i_unlabelled
//   Q10    parallelogram angles → two equations       → Book Problems p3
//   Q14a   the line through two points                → Book Problems f1
//   Q14c   where two lines meet; what you notice      → Simultaneous s_line; Book Problems p2a, p2b
//   Q16    an area gives a quadratic; solve in context → Book Problems p4, p5
//   Q19    a chain is two equations; solve            → Simultaneous s_chain
//   Q20    brackets: tidy, then eliminate             → Simultaneous s_brackets
//   Q21    fractions: clear, then eliminate           → Simultaneous s_fractions
//   Q22    a repeated bracket                         → Simultaneous s_repeat
// …and "explain why your method was the most efficient" (Q19–22) is the
// METHOD stage of every Simultaneous item, and the sort on slide 23.
//
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { inequalities } from './inequalities.js';
import { simultaneous } from './simultaneous.js';
import { workbook } from './workbook.js';
import { workbookB } from './workbookB.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const EM_07A_DATA = {
  meta: {
    id: 'EM_07A',
    title: 'Bounds, Inequalities & Simultaneous Equations',
    desc: 'Assignment 07, Part A: bounds and time zones; solving inequalities and describing regions; the line through two points; simultaneous equations by the quickest method.',
    track: 'EXT_MATH',
    icon: 'Combine',
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
      // One task per skill the assignment tests, plus two Practice slots for
      // the parts no engine stages. Every one checkpoints, so none needs one
      // sitting. Gate 15 is 75% of the 20 XP before it (under the 80% cap).
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'INEQUALITY', dbKey: 'p48', maxXP: 30 },
        { id: 'SIM_EQ', dbKey: 'p46', maxXP: 30 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 15 },
        { id: 'WORKBOOK_B', dbKey: 'p22', maxXP: 15 },
      ],
    },
    {
      // Both open at 60 XP — 55% of the 110 available before it, under the
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
      word: 'Lower bound', isReal: true,
      def: 'The smallest value that rounds to a given number. It is included.',
      sent: 'The lower bound of twelve point six, to one decimal place, is twelve point five five.',
    },
    {
      word: 'Upper bound', isReal: true,
      def: 'The value where rounding goes up to the next number. It is not included.',
      sent: 'A length can get close to its upper bound but never reach it.',
    },
    {
      word: 'Error interval', isReal: true,
      def: 'The range of values a rounded number could really be, from its lower bound up to its upper bound.',
      sent: 'Write the error interval using less than or equal to, and less than.',
    },
    {
      word: 'Local time', isReal: true,
      def: 'The time shown on clocks in one particular place. Places in different time zones have different local times.',
      sent: 'Both times in the timetable are local times, so change one of them first.',
    },
    {
      word: 'Inequality', isReal: true,
      def: 'A statement that one side is less than, or greater than, the other.',
      sent: 'Dividing an inequality by a negative number turns the sign round.',
    },
    {
      word: 'Integer', isReal: true,
      def: 'A whole number. It can be positive, negative or zero.',
      sent: 'Find the integer values of n that satisfy the inequality.',
    },
    {
      word: 'Region', isReal: true,
      def: 'The part of a graph where every one of a set of inequalities is true.',
      sent: 'Leave the region unshaded and label it R.',
    },
    {
      word: 'Gradient', isReal: true,
      def: 'How steep a line is: how far it goes up for every one across.',
      sent: 'The gradient is the rise divided by the run.',
    },
    {
      word: 'Coefficient', isReal: true,
      def: 'The number in front of a letter in an algebraic term.',
      sent: 'Make the coefficients of y the same size, then add or subtract.',
    },
    {
      word: 'Simultaneous equations', isReal: true,
      def: 'Two equations that are true at the same time. Their solution is where their graphs cross.',
      sent: 'Solve the simultaneous equations to find both x and y.',
    },
    {
      word: 'Eliminate', isReal: true,
      def: 'To get rid of one letter by adding or subtracting the two equations.',
      sent: 'Multiply the second equation by three to eliminate y.',
    },
    {
      word: 'Substitute', isReal: true,
      def: 'To put a value or an expression in place of a letter.',
      sent: 'Substitute y equals two x minus one into the other equation.',
    },
  ],

  notes: notes,
  inequalities: inequalities,
  simultaneous: simultaneous,
  workbook: workbook,
  workbookB: workbookB,
  assessment: assessment,
  games: games,
};
