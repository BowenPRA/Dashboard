// src/data/AOPS/QUAD_1A/graphPlot.js
// Graph It items for Parabolas and the Vertex Form — the Prove-phase task where
// the student clicks the key points onto a grid instead of picking from four
// options. See src/tasks/GraphPlot.jsx for the item shape.
//
// THE ANSWERS ARE NOT WRITTEN HERE. `curve` is the truth and the task derives
// the vertex from it, so an edit to the equation cannot leave a stale key
// behind. Only a `point` step names a coordinate, and the validator checks that
// the point really sits on the curve before the build passes.
//
// The five items walk the same road the deck did: a plain bracket, then a
// vertical shift, then both together, then one turned upside down, then one
// with a coefficient in front. Each grid is sized so the vertex and the asked
// point are comfortably inside it — a target off the edge is unanswerable, and
// the validator now refuses it.

export const graphPlot = [
  {
    id: 'gp1_bracket',
    equation: 'y = (x - 3)^2',
    curve: { a: 1, h: 3, k: 0 },
    grid: { xMin: -3, xMax: 7, yMin: -3, yMax: 7 },
    note: 'Solve the bracket first — do not read the sign.',
    noteVn: 'Hãy giải biểu thức trong ngoặc trước — đừng đọc theo dấu.',
    steps: [
      { kind: 'vertex' },
      { kind: 'point', at: [5, 4], label: 'the point where x = 5', labelVn: 'điểm có x = 5' },
    ],
  },
  {
    id: 'gp2_down',
    equation: 'y = x^2 - 4',
    curve: { a: 1, h: 0, k: -4 },
    grid: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    note: 'Nothing here moves it sideways.',
    noteVn: 'Ở đây không có gì làm nó dịch sang ngang.',
    steps: [
      { kind: 'vertex' },
      { kind: 'point', at: [2, 0], label: 'the point where x = 2', labelVn: 'điểm có x = 2' },
    ],
  },
  {
    id: 'gp3_both',
    equation: 'y = (x + 2)^2 + 1',
    curve: { a: 1, h: -2, k: 1 },
    grid: { xMin: -6, xMax: 4, yMin: -2, yMax: 7 },
    note: 'A plus inside the bracket sends it the other way.',
    noteVn: 'Dấu cộng trong ngoặc đưa nó đi hướng ngược lại.',
    steps: [
      { kind: 'vertex' },
      { kind: 'point', at: [0, 5], label: 'the y-intercept, where x = 0', labelVn: 'giao điểm với trục y, nơi x = 0' },
    ],
  },
  {
    id: 'gp4_flipped',
    equation: 'y = -(x - 1)^2 + 4',
    curve: { a: -1, h: 1, k: 4 },
    grid: { xMin: -4, xMax: 6, yMin: -5, yMax: 6 },
    note: 'This one opens downwards, so the vertex is the highest point.',
    noteVn: 'Đồ thị này quay xuống dưới, nên đỉnh là điểm cao nhất.',
    steps: [
      { kind: 'vertex' },
      { kind: 'point', at: [3, 0], label: 'the point where x = 3', labelVn: 'điểm có x = 3' },
    ],
  },
  {
    id: 'gp5_coefficient',
    equation: 'y = 2(x + 1)^2 - 3',
    curve: { a: 2, h: -1, k: -3 },
    grid: { xMin: -6, xMax: 4, yMin: -5, yMax: 6 },
    note: 'The 2 changes the width, not the vertex.',
    noteVn: 'Số 2 làm đổi độ rộng, không đổi đỉnh.',
    steps: [
      { kind: 'vertex' },
      { kind: 'point', at: [0, -1], label: 'the y-intercept, where x = 0', labelVn: 'giao điểm với trục y, nơi x = 0' },
    ],
  },
];
