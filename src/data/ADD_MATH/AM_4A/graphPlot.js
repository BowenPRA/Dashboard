// src/data/ADD_MATH/AM_4A/graphPlot.js
// Graph It items for Modulus Equations and Inequalities — the production task
// where the student clicks the key points of a V onto a grid instead of picking
// from four options. See src/tasks/GraphPlot.jsx for the item shape.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// THE ANSWERS ARE NOT WRITTEN HERE. `curve` is the truth and the task derives
// every target from it, so an edit to the equation cannot leave a stale key
// behind. `curve: { kind: 'modulus', a, h, k }` means y = a|x − h| + k, so the
// vertex is (h, k) and `a` is how steep the arms are — which is exactly what
// the student has to work out from the printed equation, since the printed form
// is |2x − 4|, not 2|x − 2|.
//
// WHY THIS TASK EXISTS, and why it is not just "draw the graph".
// Section 4.2 is solved graphically by finding where a V meets a horizontal
// line. That is what the `meets` step is: the line y = k is drawn, and the
// student clicks the crossings. Placing them IS solving |ax + b| = k, and the
// pair of points is also the boundary of the answer to the matching inequality.
// So the task drills three things the exercises then assume:
//
//   1. the vertex is where the INSIDE is zero — x = +3 for |x − 3|, and the
//      sign trap here is the single most expensive error in the chapter;
//   2. a coefficient makes the arms steeper, and has to be divided out before
//      the vertex can be read;
//   3. a level the V never reaches has NO crossings — which is what "a modulus
//      is never negative" looks like, and is answered with the
//      "It never reaches that line" button rather than by clicking anything.
//
// THE ORDER adds one idea at a time: the two vertex signs, then a vertical
// shift, then a coefficient, then a steeper coefficient, then both transforms
// at once with two different levels on one V, and finally the two items whose
// V floats clear of the x-axis — the pictures of "no solution".
//
// Every target is a whole-number point (the student can only click lattice
// points) and every grid is sized so the vertex, the crossings and the level
// line are all comfortably inside it. `npm run validate` re-derives all of it.

export const graphPlot = [
  {
    id: 'gp1_minus',
    equation: 'y = |x - 3|',
    curve: { kind: 'modulus', a: 1, h: 3, k: 0 },
    grid: { xMin: -2, xMax: 8, yMin: -2, yMax: 6 },
    note: 'The corner sits where the inside is zero. Solve x - 3 = 0, do not read the sign off the page.',
    steps: [
      { kind: 'vertex' },
      { kind: 'meets', at: 2 },
    ],
  },
  {
    id: 'gp2_plus',
    equation: 'y = |x + 2|',
    curve: { kind: 'modulus', a: 1, h: -2, k: 0 },
    grid: { xMin: -8, xMax: 4, yMin: -2, yMax: 6 },
    note: 'Same idea, opposite sign. The two points you place are the solutions of |x + 2| = 4.',
    steps: [
      { kind: 'vertex' },
      { kind: 'meets', at: 4 },
    ],
  },
  {
    id: 'gp3_shift',
    equation: 'y = |x| - 3',
    curve: { kind: 'modulus', a: 1, h: 0, k: -3 },
    grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
    note: 'The minus 3 is outside the bars, so it moves the whole V down instead of sideways.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
    ],
  },
  {
    id: 'gp4_coefficient',
    equation: 'y = |2x - 4|',
    curve: { kind: 'modulus', a: 2, h: 2, k: 0 },
    grid: { xMin: -3, xMax: 7, yMin: -2, yMax: 8 },
    note: 'Take the 2 outside first: |2x - 4| is 2|x - 2|. Now the corner is easy, and the arms climb twice as fast.',
    steps: [
      { kind: 'vertex' },
      { kind: 'meets', at: 4 },
      { kind: 'meets', at: 6 },
    ],
  },
  {
    id: 'gp5_steeper',
    equation: 'y = |3x + 3|',
    curve: { kind: 'modulus', a: 3, h: -1, k: 0 },
    grid: { xMin: -5, xMax: 3, yMin: -2, yMax: 8 },
    note: 'Steeper again. The corner is not at -3 — divide the 3 out before you read it.',
    steps: [
      { kind: 'vertex' },
      { kind: 'meets', at: 6 },
    ],
  },
  {
    id: 'gp6_both',
    equation: 'y = 2|x + 1| - 4',
    curve: { kind: 'modulus', a: 2, h: -1, k: -4 },
    grid: { xMin: -6, xMax: 5, yMin: -6, yMax: 6 },
    note: 'Both moves at once. The last two points are the boundary of 2|x + 1| - 4 < 2, and the answer is the stretch between them.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
      { kind: 'meets', at: 2 },
    ],
  },
  {
    id: 'gp7_above_axis',
    equation: 'y = |x - 1| + 2',
    curve: { kind: 'modulus', a: 1, h: 1, k: 2 },
    grid: { xMin: -5, xMax: 7, yMin: -3, yMax: 8 },
    note: 'Look at the corner before you hunt for crossings. This V starts above the axis and only ever climbs.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
      { kind: 'meets', at: 5 },
    ],
  },
  {
    id: 'gp8_no_solution',
    equation: 'y = |2x + 4| + 1',
    curve: { kind: 'modulus', a: 2, h: -2, k: 1 },
    grid: { xMin: -7, xMax: 3, yMin: -3, yMax: 8 },
    note: 'The same trap with a coefficient in it. No crossings means |2x + 4| + 1 = 0 has no solution — but y = 5 is a different question.',
    steps: [
      { kind: 'vertex' },
      { kind: 'zeros' },
      { kind: 'meets', at: 5 },
    ],
  },
];
