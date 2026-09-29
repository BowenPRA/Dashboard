// src/data/AOPS/LINE_1C/lineLab.js
// Line Lab items for Equations of Lines. Item shape at the top of
// src/utils/lineLab.js. Every typed equation is marked by LINE, not by
// string: any equation of the right line is accepted for "any form", and for
// "standard" or "slope" the engine also checks it is WRITTEN that way —
// a right line in the wrong form is told so, and asked again.
//
// The items follow the book's problems in order: reading an equation off a
// graph (8.14), two points (8.15), a point and a slope (8.16a), graphing by
// intercepts, slope-intercept form (exercise 8.5.1), a system solved by
// graphing (8.23), a system with no solution (8.25), perpendicular slopes
// (8.26), and a parallel and a perpendicular line through a point (8.27).

export const lineLab = {
  title: 'Equations of lines',
  titleVn: 'Phương trình đường thẳng',
  items: [
    {
      id: 'll1_read_equation',
      prompt: 'Find the equation of the line shown — first its slope, then where it crosses the $y$-axis, then the equation in two forms.',
      promptVn: 'Tìm phương trình của đường thẳng trên hình — trước hết là hệ số góc, rồi chỗ nó cắt trục $y$, rồi phương trình ở hai dạng.',
      grid: { xMin: -4, xMax: 4, yMin: -7, yMax: 7 },
      points: { A: [0, -2], B: [1, 3] },
      lines: { L: { through: ['A', 'B'] } },
      show: ['L'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'L' },
        { kind: 'yint', line: 'L' },
        { kind: 'equation', line: 'L', form: 'slope' },
        { kind: 'equation', line: 'L', form: 'standard' },
      ],
    },
    {
      id: 'll2_two_points',
      prompt: 'Find the equation, in standard form, of the line through $A(0, 4)$ and $B(5, -3)$.',
      promptVn: 'Tìm phương trình dạng tổng quát của đường thẳng qua $A(0, 4)$ và $B(5, -3)$.',
      grid: { xMin: -3, xMax: 7, yMin: -5, yMax: 6 },
      points: { A: [0, 4], B: [5, -3] },
      lines: { L: { through: ['A', 'B'] } },
      show: ['A', 'B'],
      steps: [
        { kind: 'type', ask: 'slope', from: 'A', to: 'B' },
        { kind: 'equation', line: 'L', form: 'standard' },
      ],
    },
    {
      id: 'll3_point_slope',
      prompt: 'The line through $P(4, 2)$ has slope $-3$. Graph it, then write it in standard form.',
      promptVn: 'Đường thẳng qua $P(4, 2)$ có hệ số góc $-3$. Vẽ nó, rồi viết ở dạng tổng quát.',
      grid: { xMin: -2, xMax: 7, yMin: -6, yMax: 8 },
      points: { P: [4, 2] },
      lines: { L: { through: 'P', slope: -3 } },
      steps: [
        { kind: 'plot', points: ['P'] },
        { kind: 'on', line: 'L', count: 2, exclude: ['P'] },
        { kind: 'equation', line: 'L', form: 'standard' },
      ],
    },
    {
      id: 'll4_intercepts',
      prompt: 'Graph $3x + 5y = 15$ the quick way: find both intercepts. Then give its slope.',
      promptVn: 'Vẽ $3x + 5y = 15$ theo cách nhanh: tìm cả hai giao điểm với các trục. Sau đó cho biết hệ số góc.',
      grid: { xMin: -3, xMax: 8, yMin: -3, yMax: 6 },
      lines: { L: '3x + 5y = 15' },
      steps: [
        { kind: 'yint', line: 'L' },
        { kind: 'xint', line: 'L' },
        { kind: 'type', ask: 'slope', line: 'L' },
      ],
    },
    {
      id: 'll5_slope_intercept',
      prompt: 'Graph $y = -2x + 1$: start at its $y$-intercept, then use the slope. Where does it cross the $x$-axis?',
      promptVn: 'Vẽ $y = -2x + 1$: bắt đầu từ giao điểm với trục $y$, rồi dùng hệ số góc. Nó cắt trục $x$ ở đâu?',
      grid: { xMin: -4, xMax: 5, yMin: -6, yMax: 7 },
      lines: { L: 'y = -2x + 1' },
      steps: [
        { kind: 'yint', line: 'L' },
        { kind: 'on', line: 'L', count: 2 },
        { kind: 'type', ask: 'xint', line: 'L' },
      ],
    },
    {
      id: 'll6_system',
      prompt: 'Solve the system $5x - 2y = 11$, $-2x + 3y = -11$ by graphing both lines.',
      promptVn: 'Giải hệ $5x - 2y = 11$, $-2x + 3y = -11$ bằng cách vẽ cả hai đường thẳng.',
      // Tall on purpose: 5x − 2y = 11 only meets grid corners at odd x, so a
      // shorter grid left two lattice points and no spare to place.
      grid: { xMin: -3, xMax: 7, yMin: -9, yMax: 8 },
      lines: { L: '5x - 2y = 11', M: '-2x + 3y = -11' },
      steps: [
        { kind: 'on', line: 'L', count: 2 },
        { kind: 'on', line: 'M', count: 2 },
        { kind: 'meet', lines: ['L', 'M'] },
      ],
    },
    {
      id: 'll7_no_solution',
      prompt: 'Here are $3x = 5y - 1$ and $10y = 6x - 8$. Compare their slopes. Where do they meet?',
      promptVn: 'Đây là $3x = 5y - 1$ và $10y = 6x - 8$. So sánh hệ số góc của chúng. Chúng gặp nhau ở đâu?',
      grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
      lines: { L: '3x = 5y - 1', M: '10y = 6x - 8' },
      show: ['L', 'M'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'L' },
        { kind: 'type', ask: 'slope', line: 'M' },
        { kind: 'meet', lines: ['L', 'M'] },
      ],
    },
    {
      id: 'll8_perpendicular',
      prompt: 'Here are $x = -2y + 10$ and $2x - y = 5$. Find each slope, and say how the lines are related.',
      promptVn: 'Đây là $x = -2y + 10$ và $2x - y = 5$. Tìm hệ số góc của từng đường, và cho biết hai đường thẳng có quan hệ gì.',
      grid: { xMin: -2, xMax: 8, yMin: -5, yMax: 6 },
      lines: { L: 'x = -2y + 10', M: '2x - y = 5' },
      show: ['L', 'M'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'L' },
        { kind: 'type', ask: 'slope', line: 'M' },
        { kind: 'relation', lines: ['L', 'M'] },
      ],
    },
    {
      id: 'll9_parallel_through',
      prompt: 'Find the line through $P(2, 1)$ that is parallel to $2x - 7y = 4$. Graph it, then write it in standard form.',
      promptVn: 'Tìm đường thẳng qua $P(2, 1)$ song song với $2x - 7y = 4$. Vẽ nó, rồi viết ở dạng tổng quát.',
      grid: { xMin: -6, xMax: 10, yMin: -4, yMax: 5 },
      points: { P: [2, 1] },
      lines: { M: '2x - 7y = 4', N: { through: 'P', slope: '2/7' } },
      show: ['P', 'M'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'M' },
        // Worded by hand: the screen's own wording would print the slope,
        // and working it out (parallel = same slope) is the point here.
        { kind: 'on', line: 'N', count: 1, exclude: ['P'], say: 'Place one more point on the line through $P$ parallel to $2x - 7y = 4$', sayVn: 'Đặt thêm một điểm trên đường thẳng qua $P$ song song với $2x - 7y = 4$', sub: 'Parallel lines have the same slope. Walk it from $P$.', subVn: 'Hai đường song song có cùng hệ số góc. Đi theo nó từ $P$.' },
        { kind: 'equation', line: 'N', form: 'standard' },
      ],
    },
    {
      id: 'll10_perp_through',
      prompt: 'Find the line through $P(-3, 4)$ that is perpendicular to $x - 2y = 7$: graph it, find its $x$-intercept, and write it in standard form.',
      promptVn: 'Tìm đường thẳng qua $P(-3, 4)$ vuông góc với $x - 2y = 7$: vẽ nó, tìm giao điểm với trục $x$, và viết ở dạng tổng quát.',
      grid: { xMin: -6, xMax: 8, yMin: -5, yMax: 6 },
      points: { P: [-3, 4] },
      lines: { M: 'x - 2y = 7', N: { through: 'P', slope: -2 } },
      show: ['P', 'M'],
      steps: [
        { kind: 'type', ask: 'slope', line: 'M' },
        { kind: 'on', line: 'N', count: 2, exclude: ['P'], say: 'Place two more points on the line through $P$ perpendicular to $x - 2y = 7$', sayVn: 'Đặt thêm hai điểm trên đường thẳng qua $P$ vuông góc với $x - 2y = 7$', sub: 'Perpendicular slope: flip the slope you just found and change its sign.', subVn: 'Hệ số góc vuông góc: lật hệ số góc em vừa tìm và đổi dấu.' },
        { kind: 'xint', line: 'N' },
        { kind: 'equation', line: 'N', form: 'standard' },
      ],
    },
  ],
};
