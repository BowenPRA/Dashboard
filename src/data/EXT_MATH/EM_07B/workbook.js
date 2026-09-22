// src/data/EXT_MATH/EM_07B/workbook.js
// The "Practice" task for EM_07B: the MAP and DATA parts of Wolsey Hall
// Assignment 07 that no engine stages —
//   Q1c  a map scale as 1 : n                     → Focus 1
//   Q1a  the bearing of one town from another     → Focus 2 (a back bearing)
//   Q1b  a road on a given bearing                → Focus 3 (pick the line)
//   Q17  the correlation a scatter diagram shows  → Practice 4
//   Q18  read, describe, draw a line of best fit, estimate → Challenge 5a–5d
// Every number is original; the assignment's own numbers are not spent here.
// The Book Problems task (workbookB.js) carries Q12a and Q12c, and the
// Triangle Solver the rest of Q11–Q15 — see data.js. Q1d (the time) is in
// EM_07A.
//
// English only — EXT_MATH declares `bilingual: false`.
//
// MARKING NOTES (docs/add-math/task-engines.md §5).
//  · "Draw the line" and "which line" are `mcq` over a figure: nothing to type.
//  · An estimate read off a graph accepts the whole-number readings either
//    side of the exact value, because a reading is never exact.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** On a map, 1 cm represents 2.5 km. Write the scale of the map in the form $1 : n$.',
        textParts: ['$1 : $ ', ''],
        blanks: { 1: { correct: '250000', width: 9, accept: ['250 000', '250,000'] } },
        solution: [
          'Both parts of a scale must be in the same unit, so change 2.5 km into centimetres.',
          '$2.5 \\text{ km} = 2500 \\text{ m}$, and $2500 \\text{ m} = 250\\,000 \\text{ cm}$.',
          'So 1 cm on the map is 250 000 cm on the ground: the scale is $1 : 250\\,000$.',
        ],
        answer: '$1 : 250\\,000$',
      },
      {
        id: 'f2',
        type: 'text',
        prompt: '**2** The bearing of $Q$ from $P$ is $072^\\circ$. Work out the bearing of $P$ from $Q$.',
        answer: '252',
        accept: ['252°', '252 degrees', '252 °'],
        solution: [
          'To go back from $Q$ to $P$ you face the opposite way — half a turn.',
          'The bearing is less than $180^\\circ$, so add $180^\\circ$: $072^\\circ + 180^\\circ = 252^\\circ$.',
          'Check with a sketch: $Q$ is north-east of $P$, so $P$ must be south-west of $Q$ — between $180^\\circ$ and $270^\\circ$.',
        ],
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: '**3** A straight road leaves town $R$ on a bearing of $230^\\circ$. Which line on the diagram is the road?',
        inlineSvg: DIAGRAMS.WB_BEARING_LINES,
        options: [
          { val: 'a', text: 'Line $a$' },
          { val: 'b', text: 'Line $b$' },
          { val: 'c', text: 'Line $c$' },
          { val: 'd', text: 'Line $d$' },
        ],
        correct: 'c',
        solution: [
          'Start at $R$ facing north and turn clockwise.',
          '$180^\\circ$ takes you to due south. $230^\\circ$ is $50^\\circ$ further, round towards west — down and to the left.',
          'That is line $c$. Line $b$ is $130^\\circ$: $230^\\circ$ turned anticlockwise by mistake. Line $a$ points the opposite way, $050^\\circ$.',
        ],
        answer: 'Line $c$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p4',
        type: 'mcq',
        prompt: '**4** Henrik draws this scatter diagram. Which ONE statement about it is correct?',
        inlineSvg: DIAGRAMS.WB_SCATTER_A,
        options: [
          { val: 'a', text: 'It shows no correlation.' },
          { val: 'b', text: 'It is not possible to tell, as there are not enough points.' },
          { val: 'c', text: 'It shows negative correlation.' },
          { val: 'd', text: 'It shows positive correlation.' },
        ],
        correct: 'c',
        solution: [
          'Read the crosses from left to right: as the age goes UP, the value goes DOWN.',
          'One quantity rising while the other falls is negative correlation.',
          'Twelve points in a clear band are plenty to tell — and they are nowhere near a random scatter.',
        ],
        answer: 'Negative correlation',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c5a',
        type: 'text',
        prompt: '**5a** The scatter diagram shows how long some students revised and their test scores. Write down the highest score.',
        inlineSvg: DIAGRAMS.WB_SCATTER_B,
        answer: '92',
        solution: [
          'The highest score is the cross that is highest UP the page — whatever its hours.',
          'That cross is level with 92 on the score axis (at 9 hours).',
        ],
      },
      {
        id: 'c5b',
        type: 'mcq',
        prompt: '**5b** Write down the type of correlation shown in the revision diagram.',
        inlineSvg: DIAGRAMS.WB_SCATTER_B,
        options: [
          { val: 'pos', text: 'Positive correlation' },
          { val: 'neg', text: 'Negative correlation' },
          { val: 'none', text: 'No correlation' },
        ],
        correct: 'pos',
        solution: [
          'As the hours of revision go up, the scores go up too.',
          'Both rising together is positive correlation.',
        ],
        answer: 'Positive correlation',
      },
      {
        id: 'c5c',
        type: 'mcq',
        prompt: '**5c** Three lines have been drawn on the revision diagram. Which one is the best line of best fit?',
        inlineSvg: DIAGRAMS.WB_SCATTER_FIT,
        options: [
          { val: 'a', text: 'Line $a$' },
          { val: 'b', text: 'Line $b$' },
          { val: 'c', text: 'Line $c$' },
        ],
        correct: 'b',
        solution: [
          'A line of best fit follows the trend of ALL the crosses, with about as many above it as below it, all the way along.',
          'Line $b$ does that. Line $a$ is too steep: every cross on the left is above it. Line $c$ is too flat: the crosses on the right are above it and those on the left below.',
          'It does not have to pass through the origin, or through any particular cross.',
        ],
        answer: 'Line $b$',
      },
      {
        id: 'c5d',
        type: 'fill_blank',
        prompt: '**5d** Lan revised for 6 hours but missed the test. Use line $b$ to estimate her score.',
        inlineSvg: DIAGRAMS.WB_SCATTER_FIT,
        textParts: ['About ', ''],
        blanks: { 1: { correct: '68', width: 4, accept: ['66', '67', '69', '70'] } },
        solution: [
          'Go up from 6 on the hours axis until you meet line $b$.',
          'Go across to the score axis: about 68.',
          'An estimate is read from the LINE, not from the nearest cross.',
        ],
        answer: 'About 68',
      },
    ],
  },
];
