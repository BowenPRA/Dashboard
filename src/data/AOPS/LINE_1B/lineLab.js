// src/data/AOPS/LINE_1B/lineLab.js
// Line Lab items for Graphing Lines & Slope. Item shape at the top of
// src/utils/lineLab.js; every answer — the points on a line, its slope, its
// intercepts, where it is at a given x — is derived from the equation or the
// point and slope written here, and the validator checks each grid has the
// lattice points a "place three points" step needs, with one to spare.
//
// The road: Hopsalot's hops and the slope of his path; graphing two of the
// book's equations by three points (2x − y = 6, then exercise 8.2.2's
// 3x − 2y = −4); a slope from two points with its run and rise typed first
// (exercise 8.2.1); the flat and the upright line (exercise 8.2.3, with the
// book's x = 4.2 moved to x = 4 so it can be clicked); graphing from a point
// and a slope (problem 8.11, and exercise 8.3.2 with its fractional
// intercept); a three-points-on-a-line test; and review problem 8.28, "find
// t", which needs the slope first.

export const lineLab = {
  title: 'Graphing lines & slope',
  titleVn: 'Vẽ đường thẳng & hệ số góc',
  items: [
    {
      id: 'll1_hops',
      prompt: 'Hopsalot starts at $S(-1, -8)$ and hops **1 right and 2 up** every second. Plot where he is after 1, 2 and 3 seconds, then find the slope of his path.',
      promptVn: 'Hopsalot bắt đầu tại $S(-1, -8)$ và mỗi giây nhảy **sang phải 1 và lên 2**. Biểu diễn vị trí của chú sau 1, 2 và 3 giây, rồi tìm hệ số góc của đường đi.',
      grid: { xMin: -4, xMax: 5, yMin: -9, yMax: 3 },
      points: { S: [-1, -8], A: [0, -6], B: [1, -4], C: [2, -2] },
      show: ['S'],
      steps: [
        // Worded by hand so the step does not print the landing points —
        // working them out from the hop is the question.
        { kind: 'plot', points: ['A', 'B', 'C'], say: 'Plot where Hopsalot is after 1, 2 and 3 seconds', sayVn: 'Biểu diễn vị trí của Hopsalot sau 1, 2 và 3 giây', sub: 'Each hop: $1$ right and $2$ up from where he was.', subVn: 'Mỗi cú nhảy: sang phải $1$ và lên $2$ từ chỗ cũ.' },
        { kind: 'type', ask: 'slope', from: 'S', to: 'C' },
      ],
    },
    {
      id: 'll2_graph_2x_y',
      prompt: 'Graph $2x - y = 6$: place three points on it, then give its slope.',
      promptVn: 'Vẽ đồ thị $2x - y = 6$: đặt ba điểm trên nó, rồi cho biết hệ số góc.',
      grid: { xMin: -4, xMax: 7, yMin: -8, yMax: 6 },
      lines: { L: '2x - y = 6' },
      steps: [
        { kind: 'on', line: 'L', count: 3 },
        { kind: 'type', ask: 'slope', line: 'L' },
      ],
    },
    {
      id: 'll3_graph_3x_2y',
      prompt: 'Graph $3x - 2y = -4$. Then find where it crosses the $y$-axis, and its slope.',
      promptVn: 'Vẽ đồ thị $3x - 2y = -4$. Sau đó tìm chỗ nó cắt trục $y$, và hệ số góc của nó.',
      grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 8 },
      lines: { L: '3x - 2y = -4' },
      steps: [
        { kind: 'on', line: 'L', count: 3 },
        { kind: 'yint', line: 'L' },
        { kind: 'type', ask: 'slope', line: 'L' },
      ],
    },
    {
      id: 'll4_two_points',
      prompt: 'Find the slope of the line through $A(-3, 5)$ and $B(2, -5)$. Work out the run and the rise first — going from $A$ to $B$.',
      promptVn: 'Tìm hệ số góc của đường thẳng qua $A(-3, 5)$ và $B(2, -5)$. Tính độ thay đổi ngang và dọc trước — đi từ $A$ tới $B$.',
      grid: { xMin: -5, xMax: 4, yMin: -7, yMax: 7 },
      points: { A: [-3, 5], B: [2, -5] },
      show: ['A', 'B'],
      steps: [
        { kind: 'type', ask: 'run', from: 'A', to: 'B' },
        { kind: 'type', ask: 'rise', from: 'A', to: 'B' },
        { kind: 'type', ask: 'slope', from: 'A', to: 'B' },
      ],
    },
    {
      id: 'll5_flat_upright',
      prompt: 'Graph $y = -2$ and $x = 4$. Is each one a line? What is its slope?',
      promptVn: 'Vẽ đồ thị $y = -2$ và $x = 4$. Mỗi cái có phải là đường thẳng không? Hệ số góc của nó là bao nhiêu?',
      grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
      lines: { L: 'y = -2', M: 'x = 4' },
      steps: [
        { kind: 'on', line: 'L', count: 2 },
        { kind: 'type', ask: 'slope', line: 'L' },
        { kind: 'on', line: 'M', count: 2 },
        { kind: 'type', ask: 'slope', line: 'M' },
      ],
    },
    {
      id: 'll6_point_slope_book',
      prompt: 'Graph the line through $P(-3, 1)$ with slope $-\\tfrac{1}{4}$. Then click where it crosses the $x$-axis.',
      promptVn: 'Vẽ đường thẳng qua $P(-3, 1)$ có hệ số góc $-\\tfrac{1}{4}$. Sau đó bấm vào chỗ nó cắt trục $x$.',
      grid: { xMin: -8, xMax: 8, yMin: -4, yMax: 4 },
      points: { P: [-3, 1] },
      lines: { L: { through: 'P', slope: '-1/4' } },
      steps: [
        { kind: 'plot', points: ['P'] },
        { kind: 'on', line: 'L', count: 2, exclude: ['P'] },
        { kind: 'xint', line: 'L' },
      ],
    },
    {
      id: 'll7_point_slope_third',
      prompt: 'Graph the line through $P(1, 2)$ with slope $\\tfrac{1}{3}$. Where does it cross the $y$-axis? (It is not at a grid corner.)',
      promptVn: 'Vẽ đường thẳng qua $P(1, 2)$ có hệ số góc $\\tfrac{1}{3}$. Nó cắt trục $y$ ở đâu? (Không phải tại giao điểm của lưới.)',
      grid: { xMin: -6, xMax: 8, yMin: -2, yMax: 6 },
      points: { P: [1, 2] },
      lines: { L: { through: 'P', slope: '1/3' } },
      show: ['P'],
      steps: [
        { kind: 'on', line: 'L', count: 2, exclude: ['P'] },
        { kind: 'type', ask: 'yint', line: 'L' },
      ],
    },
    {
      id: 'll8_collinear',
      prompt: 'Are $A(-4, -3)$, $B(2, 1)$, $C(5, 3)$ and $D(-1, 0)$ all on one line? Compare the slopes from $A$, then find where line $AB$ really is at $x = -1$.',
      promptVn: '$A(-4, -3)$, $B(2, 1)$, $C(5, 3)$ và $D(-1, 0)$ có cùng nằm trên một đường thẳng không? So sánh các hệ số góc tính từ $A$, rồi tìm vị trí thật của đường thẳng $AB$ tại $x = -1$.',
      grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
      points: { A: [-4, -3], B: [2, 1], C: [5, 3], D: [-1, 0] },
      lines: { AB: { through: ['A', 'B'] } },
      show: ['A', 'B', 'C', 'D'],
      steps: [
        { kind: 'type', ask: 'slope', from: 'A', to: 'B' },
        { kind: 'type', ask: 'slope', from: 'A', to: 'C' },
        { kind: 'type', ask: 'slope', from: 'A', to: 'D' },
        { kind: 'at', line: 'AB', x: -1 },
      ],
    },
    {
      id: 'll9_find_t',
      prompt: 'Find $t$ so that the point $(t, 5)$ lies on the line through $(0, 3)$ and $(-8, 0)$.',
      promptVn: 'Tìm $t$ để điểm $(t, 5)$ nằm trên đường thẳng đi qua $(0, 3)$ và $(-8, 0)$.',
      grid: { xMin: -9, xMax: 7, yMin: -2, yMax: 7 },
      points: { P: [0, 3], Q: [-8, 0] },
      lines: { L: { through: ['P', 'Q'] } },
      show: ['P', 'Q', 'L'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'L' },
        { kind: 'type', ask: 'xAt', line: 'L', y: 5 },
      ],
    },
  ],
};
