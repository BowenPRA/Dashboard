// src/data/EXT_MATH/EM_07A/workbook.js
// The "Practice" task for EM_07A: the BOUNDS and TIME parts of Wolsey Hall
// Assignment 07 that no engine stages —
//   Q1d  a time plus some minutes                → Focus 1
//   Q3   bounds of a length to 1 d.p.            → Focus 2
//   Q4   bounds of a mass to the nearest 5 g     → Practice 3
//   Q2   a timetable across a time zone          → Practice 4
// plus two Challenge questions a step past the assignment: a time over
// midnight, and the bounds of a perimeter and an area. Every number is
// original; the assignment's own numbers are not spent here. The Book
// Problems task (workbookB.js) carries Q10, Q14 and Q16, and the two engines
// carry Q5–Q9 and Q19–Q22 — see data.js. Q1a–c (the map) are in EM_07B.
//
// English only — EXT_MATH declares `bilingual: false`.
//
// MARKING NOTES (docs/add-math/task-engines.md §5): two values in one answer
// (both bounds, hours and minutes) are `fill_blank`, one box each, in a
// stated order.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** Minh is at the crossroads at 10 48. He arrives at the station 47 minutes later. Work out the time he arrives.',
        textParts: ['He arrives at ', ' : ', '.'],
        blanks: {
          1: { correct: '11', width: 4 },
          2: { correct: '35', width: 4 },
        },
        solution: [
          'Count on to the next hour first: 10 48 to 11 00 is 12 minutes.',
          'That leaves $47 - 12 = 35$ minutes after 11 00.',
          'He arrives at 11 35. Adding 47 to 48 gives 95 minutes — that is 1 hour 35 minutes, the same answer.',
        ],
        answer: '11 35',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: '**2** The length, $l$ metres, of a cable is 18.4 m, correct to 1 decimal place. Complete the statement about the value of $l$.',
        textParts: ['', ' $\\le l <$ ', ''],
        blanks: {
          1: { correct: '18.35', width: 6 },
          2: { correct: '18.45', width: 6 },
        },
        solution: [
          'To 1 decimal place the unit is 0.1, so half a unit is 0.05.',
          'Lower bound: $18.4 - 0.05 = 18.35$. It rounds up to 18.4, so it is included: $\\le$.',
          'Upper bound: $18.4 + 0.05 = 18.45$. It rounds up to 18.5, so it is not included: $<$.',
          'So $18.35 \\le l < 18.45$.',
        ],
        answer: '$18.35 \\le l < 18.45$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**3** The mass, $m$ grams, of a parcel is 285 g, correct to the nearest 5 grams. Complete the statement about the value of $m$.',
        textParts: ['', ' $\\le m <$ ', ''],
        blanks: {
          1: { correct: '282.5', width: 6 },
          2: { correct: '287.5', width: 6 },
        },
        solution: [
          'To the nearest 5 g the unit is 5 g, so half a unit is 2.5 g — not 0.5 g.',
          'Lower bound: $285 - 2.5 = 282.5$ g.',
          'Upper bound: $285 + 2.5 = 287.5$ g, which would round up to 290 g, so it is not included.',
          'So $282.5 \\le m < 287.5$.',
        ],
        answer: '$282.5 \\le m < 287.5$',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: '**4** Here is part of the timetable for a flight from Hanoi to Singapore. Work out the total flight time.',
        inlineSvg: DIAGRAMS.WB_TIMETABLE,
        textParts: ['', ' h ', ' min'],
        blanks: {
          1: { correct: '3', width: 3 },
          2: { correct: '25', width: 4 },
        },
        solution: [
          'The two times are on different clocks. Put both on Singapore time.',
          'Singapore is 1 hour ahead, so leaving Hanoi at 23 40 is 00 40 in Singapore — just after midnight.',
          'Count on in Singapore time: 00 40 to 01 00 is 20 min, 01 00 to 04 00 is 3 h, 04 00 to 04 05 is 5 min.',
          'Total: 3 h 25 min. Ignoring the time difference gives 4 h 25 min — the most common slip.',
        ],
        answer: '3 h 25 min',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c5',
        type: 'fill_blank',
        prompt: '**5** A night bus leaves at 21 47. The journey takes 2 hours 38 minutes. At what time does it arrive?',
        textParts: ['It arrives at ', ' : ', '.'],
        blanks: {
          1: { correct: '00', width: 4, accept: ['0'] },
          2: { correct: '25', width: 4 },
        },
        solution: [
          'Add the hours first: 21 47 + 2 h = 23 47.',
          'Then the minutes: 23 47 to 24 00 (midnight) is 13 minutes, leaving $38 - 13 = 25$ minutes.',
          'Past midnight the clock starts again at 00 00, so it arrives at 00 25 — not 24 25.',
        ],
        answer: '00 25',
      },
      {
        id: 'c6',
        type: 'fill_blank',
        prompt: '**6** A rectangle measures 8 cm by 5 cm, each correct to the nearest centimetre. Work out the upper bound of its perimeter and the lower bound of its area.',
        textParts: ['Upper bound of the perimeter $=$ ', ' cm.   Lower bound of the area $=$ ', ' cm².'],
        blanks: {
          1: { correct: '28', width: 5 },
          2: { correct: '33.75', width: 6 },
        },
        solution: [
          'Each length is to the nearest 1 cm, so it lies within 0.5 cm: $7.5 \\le$ length $< 8.5$ and $4.5 \\le$ width $< 5.5$.',
          'The biggest perimeter uses both upper bounds: $2 \\times (8.5 + 5.5) = 28$ cm.',
          'The smallest area uses both lower bounds: $7.5 \\times 4.5 = 33.75$ cm².',
          'To make a result as big as possible, use the upper bounds; as small as possible, the lower bounds.',
        ],
        answer: '28 cm and 33.75 cm²',
      },
    ],
  },
];
