// src/data/ADD_MATH/AM_5C/workbook.js
// The "Practice" task for AM_5C: the question types from the two problem banks
// (docs/add-math-5-4-log-equations.md, docs/add-math-5-6-change-of-base.md)
// that the three log tasks do not stage.
//
//   Log Equation Solver   carries 5.4 A–D, 5.6 F and the worked example's
//                         two related bases
//   Quadratic in a Log    carries 5.4 E and 5.6 I–J
//   Change of Base        carries 5.6 A–E and G–H
//
// What is left, and is set here with a worked solution for every question:
// simultaneous equations (5.4 F–G, 5.6 K–L), including one with a root to
// reject; "show that" steps; "explain the error" items that name the unit's
// three mistakes (adding the insides, a negative base, dividing by the log);
// the chained "one log from two"; and challenge questions in the same spirit.
// Every number is fresh.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. Several values in one answer are fill_blank, one box each, in
// a stated order, because the equivalence engine marks one value at a time.
// "Which line is right" and "what went wrong" are mcq. Fractions in a
// `correct` field are \dfrac, never \tfrac.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** Solve the simultaneous equations $\\lg(xy) = 3$ and $\\lg\\left(\\dfrac{x}{y}\\right) = 1$.',
        textParts: ['$x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '100', width: 6 },
          2: { correct: '10', width: 6 },
        },
        solution: [
          'Split each log with the laws: $\\lg x + \\lg y = 3$ and $\\lg x - \\lg y = 1$.',
          'These are two linear equations in $\\lg x$ and $\\lg y$. Add them: $2\\lg x = 4$, so $\\lg x = 2$. Then $\\lg y = 3 - 2 = 1$.',
          'Undo each log: $x = 10^2 = 100$ and $y = 10^1 = 10$.',
          'Check: $xy = 1000$, and $\\lg 1000 = 3$; $\\dfrac{x}{y} = 10$, and $\\lg 10 = 1$.',
        ],
        answer: '$x = 100$, $y = 10$',
      },
      {
        id: 'f2',
        type: 'mcq',
        prompt: '**2a** A student solves $\\log_3(x + 2) + \\log_3 x = 1$ like this: "$x + 2 + x = 3$, so $x = \\frac{1}{2}$." What is the mistake?',
        options: [
          { val: 'a', text: 'Adding two logs multiplies the insides, so the first line should be $x(x + 2) = 3$' },
          { val: 'b', text: 'The right side should be $3^0 = 1$, not $3$' },
          { val: 'c', text: 'The answer is negative, so it must be rejected' },
          { val: 'd', text: 'There is no mistake: $x = \\frac{1}{2}$ is the solution' },
        ],
        correct: 'a',
        solution: [
          'The logs were taken off one term at a time, and the insides were added. That is not a law of logs.',
          'The multiplication law gives $\\log_3\\big(x(x + 2)\\big) = 1$, and exponential form gives $x(x + 2) = 3^1 = 3$.',
          'Check the student\'s answer: $\\log_3 \\tfrac{5}{2} + \\log_3 \\tfrac{1}{2} = \\log_3 \\tfrac{5}{4}$, which is not $1$. Substituting back would have caught it.',
        ],
        answer: 'Adding logs multiplies the insides: $x(x + 2) = 3$',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: '**2b** Now solve $\\log_3(x + 2) + \\log_3 x = 1$ correctly. Give the solution after checking.',
        textParts: ['$x = $ ', '.'],
        blanks: {
          1: { correct: '1', width: 6 },
        },
        solution: [
          'Combine and remove the log: $x(x + 2) = 3$, so $x^2 + 2x - 3 = 0$.',
          'Factorise: $(x + 3)(x - 1) = 0$, so $x = -3$ or $x = 1$.',
          'Check $x = -3$: it puts $-3$ inside $\\log_3 x$. Reject it.',
          'Check $x = 1$: the insides are $3$ and $1$, and $\\log_3 3 + \\log_3 1 = 1 + 0 = 1$. So $x = 1$.',
        ],
        answer: '$x = 1$',
      },
      {
        id: 'f4',
        type: 'fill_blank',
        prompt: '**3** Given that $\\log_a b = 3$ and $\\log_b c = 4$, find $\\log_a c$.',
        textParts: ['$\\log_a c = $ ', '.'],
        blanks: {
          1: { correct: '12', width: 6 },
        },
        solution: [
          'Change both to base $10$: $\\log_a b = \\dfrac{\\lg b}{\\lg a}$ and $\\log_b c = \\dfrac{\\lg c}{\\lg b}$.',
          'Multiply them: $\\dfrac{\\lg b}{\\lg a} \\times \\dfrac{\\lg c}{\\lg b} = \\dfrac{\\lg c}{\\lg a} = \\log_a c$. The $\\lg b$ cancels.',
          'So $\\log_a c = \\log_a b \\times \\log_b c = 3 \\times 4 = 12$.',
          'In words: $c$ is $b^4$, and $b$ is $a^3$, so $c = (a^3)^4 = a^{12}$.',
        ],
        answer: '$12$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1',
        type: 'mcq',
        prompt: '**4a** Which working shows that $\\lg(x^2y) = 7$ can be written as $2\\lg x + \\lg y = 7$?',
        options: [
          { val: 'a', text: '$\\lg(x^2y) = (\\lg x)^2 \\times \\lg y$' },
          { val: 'b', text: '$\\lg(x^2y) = 2\\lg(xy)$' },
          { val: 'c', text: '$\\lg(x^2y) = \\lg x^2 + \\lg y = 2\\lg x + \\lg y$' },
          { val: 'd', text: '$\\lg(x^2y) = \\lg x^2 \\times \\lg y = 2\\lg x \\times \\lg y$' },
        ],
        correct: 'c',
        solution: [
          'The log of a product is the SUM of the logs: $\\lg(x^2y) = \\lg x^2 + \\lg y$.',
          'The power law brings the $2$ down: $\\lg x^2 = 2\\lg x$.',
          'So $\\lg(x^2y) = 2\\lg x + \\lg y$, and the equation becomes $2\\lg x + \\lg y = 7$.',
          'Option a squares the whole log; b squares $y$ as well; d multiplies the logs instead of adding them.',
        ],
        answer: '$\\lg x^2 + \\lg y = 2\\lg x + \\lg y$',
      },
      {
        id: 'p2',
        type: 'fill_blank',
        prompt: '**4b** Given also that $\\lg\\left(\\dfrac{x}{y}\\right) = 2$, find $\\lg x$ and $\\lg y$. Hence find $x$ and $y$.',
        textParts: ['$\\lg x = $ ', ',   $\\lg y = $ ', ',   $x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '3', width: 5 },
          2: { correct: '1', width: 5 },
          3: { correct: '1000', width: 6 },
          4: { correct: '10', width: 6 },
        },
        solution: [
          'The second equation is $\\lg x - \\lg y = 2$.',
          'Add it to $2\\lg x + \\lg y = 7$: $3\\lg x = 9$, so $\\lg x = 3$.',
          'Then $\\lg y = \\lg x - 2 = 1$.',
          'Undo the logs: $x = 10^3 = 1000$ and $y = 10^1 = 10$. Check: $x^2y = 10^7$ and $\\dfrac{x}{y} = 100$.',
        ],
        answer: '$x = 1000$, $y = 10$',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**5** Solve the simultaneous equations $xy = 64$ and $\\log_x y = 2$.',
        textParts: ['$x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
          2: { correct: '16', width: 5 },
        },
        solution: [
          'Exponential form for the log: $\\log_x y = 2$ means $y = x^2$.',
          'Substitute into the first equation: $x \\times x^2 = 64$, so $x^3 = 64$ and $x = 4$.',
          'Then $y = 4^2 = 16$.',
          'Check the base: $x = 4$ is positive and not $1$, so $\\log_4 16 = 2$ exists.',
        ],
        answer: '$x = 4$, $y = 16$',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: '**6** Solve the simultaneous equations $\\log_2 a = 2\\log_2 b$ and $\\log_2(a - 2b) = 3$.',
        textParts: ['$a = $ ', ',   $b = $ ', '.'],
        blanks: {
          1: { correct: '16', width: 5 },
          2: { correct: '4', width: 5 },
        },
        solution: [
          'Power law on the first: $\\log_2 a = \\log_2 b^2$, so $a = b^2$.',
          'Exponential form on the second: $a - 2b = 2^3 = 8$.',
          'Substitute: $b^2 - 2b - 8 = 0$, so $(b - 4)(b + 2) = 0$ and $b = 4$ or $b = -2$.',
          'Reject $b = -2$: it puts $-2$ inside $\\log_2 b$. So $b = 4$ and $a = 16$. Check: $\\log_2(16 - 8) = \\log_2 8 = 3$.',
        ],
        answer: '$a = 16$, $b = 4$',
      },
      {
        id: 'p5',
        type: 'fill_blank',
        prompt: '**7** Write $\\log_4 x$ in terms of $\\log_2 x$, and $\\log_8 y$ in terms of $\\log_2 y$. Hence solve the simultaneous equations $2\\log_4 x + 3\\log_8 y = 5$ and $\\log_2 x - 2\\log_4 y = 1$.',
        textParts: ['$x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '8', width: 5 },
          2: { correct: '4', width: 5 },
        },
        solution: [
          'Change of base: $\\log_4 x = \\dfrac{\\log_2 x}{\\log_2 4} = \\dfrac{1}{2}\\log_2 x$, and $\\log_8 y = \\dfrac{\\log_2 y}{\\log_2 8} = \\dfrac{1}{3}\\log_2 y$. In the same way $\\log_4 y = \\dfrac{1}{2}\\log_2 y$.',
          'Let $u = \\log_2 x$ and $v = \\log_2 y$. The equations become $u + v = 5$ and $u - v = 1$.',
          'Add them: $2u = 6$, so $u = 3$ and $v = 2$.',
          'Undo the logs: $x = 2^3 = 8$ and $y = 2^2 = 4$.',
        ],
        answer: '$x = 8$, $y = 4$',
      },
      {
        id: 'p6',
        type: 'mcq',
        prompt: '**8** A student solves $\\log_x 64 = 2$ and writes "$x^2 = 64$, so $x = 8$ or $x = -8$." What should the answer be?',
        options: [
          { val: 'a', text: '$x = 8$ or $x = -8$: both square to $64$' },
          { val: 'b', text: '$x = -8$ only' },
          { val: 'c', text: '$x = 32$' },
          { val: 'd', text: '$x = 8$ only: a base cannot be negative' },
        ],
        correct: 'd',
        solution: [
          'The algebra is right: $x^2 = 64$ has two roots, $8$ and $-8$.',
          'But $x$ is the BASE of the log, and a base must be positive (and not $1$).',
          'So $x = -8$ is rejected, and the answer is $x = 8$. Check: $8^2 = 64$, so $\\log_8 64 = 2$.',
          'Option c divides $64$ by $2$: the power is undone by a square root, not by halving.',
        ],
        answer: '$x = 8$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        type: 'fill_blank',
        prompt: '**9** Solve $\\log_2(x^2 - 5x + 14) = 3$, and explain why neither root is rejected.',
        textParts: ['Smaller root $x = $ ', '.   Larger root $x = $ ', '.'],
        blanks: {
          1: { correct: '2', width: 5 },
          2: { correct: '3', width: 5 },
        },
        solution: [
          'Exponential form: $x^2 - 5x + 14 = 2^3 = 8$.',
          'So $x^2 - 5x + 6 = 0$, which is $(x - 2)(x - 3) = 0$: $x = 2$ or $x = 3$.',
          'Check: at ANY root, the inside equals $8$, because that is the equation the roots came from. So the inside is positive at both.',
          'There is only one log, and its inside is forced to be $8$: nothing can be rejected. Both $x = 2$ and $x = 3$ are solutions.',
        ],
        answer: '$x = 2$ or $x = 3$',
      },
      {
        id: 'c2',
        type: 'fill_blank',
        prompt: '**10** Solve the simultaneous equations $2\\log_3 y = \\log_2 4 + \\log_3 x$ and $2^y = 4^x$.',
        textParts: ['$x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '$\\dfrac{9}{4}$', width: 6 },
          2: { correct: '$\\dfrac{9}{2}$', width: 6 },
        },
        solution: [
          'Evaluate the number first: $\\log_2 4 = 2$, and $2 = \\log_3 9$. So $\\log_3 y^2 = \\log_3 9 + \\log_3 x = \\log_3 9x$, which gives $y^2 = 9x$.',
          'Write the second with one base: $4^x = 2^{2x}$, so $2^y = 2^{2x}$ and $y = 2x$.',
          'Substitute: $4x^2 = 9x$, so $x(4x - 9) = 0$ and $x = 0$ or $x = \\dfrac{9}{4}$.',
          'Reject $x = 0$: it puts $0$ inside $\\log_3 x$. So $x = \\dfrac{9}{4}$ and $y = \\dfrac{9}{2}$.',
        ],
        answer: '$x = \\dfrac{9}{4}$, $y = \\dfrac{9}{2}$',
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: '**11** Solve the simultaneous equations $9^{xy} = 3^{2x + 6}$ and $\\log_2 y - \\log_2 x = 1$.',
        textParts: ['$x = $ ', ',   $y = $ ', '.'],
        blanks: {
          1: { correct: '$\\dfrac{3}{2}$', width: 6 },
          2: { correct: '3', width: 6 },
        },
        solution: [
          'The log equation: $\\log_2\\left(\\dfrac{y}{x}\\right) = 1$, so $\\dfrac{y}{x} = 2$ and $y = 2x$.',
          'The index equation: $9^{xy} = 3^{2xy}$, so $2xy = 2x + 6$, which is $xy = x + 3$.',
          'Substitute $y = 2x$: $2x^2 = x + 3$, so $2x^2 - x - 3 = 0$ and $(2x - 3)(x + 1) = 0$.',
          'Reject $x = -1$: it puts $-1$ inside $\\log_2 x$. So $x = \\dfrac{3}{2}$ and $y = 3$.',
        ],
        answer: '$x = \\dfrac{3}{2}$, $y = 3$',
      },
      {
        id: 'c4',
        type: 'mcq',
        prompt: '**12** Given that $\\log_p 2 = a$ and $\\log_p 3 = b$, which of these is $\\log_6 p$?',
        options: [
          { val: 'a', text: '$a + b$' },
          { val: 'b', text: '$\\dfrac{1}{a} + \\dfrac{1}{b}$' },
          { val: 'c', text: '$\\dfrac{1}{a + b}$' },
          { val: 'd', text: '$\\dfrac{1}{ab}$' },
        ],
        correct: 'c',
        solution: [
          'Swapping the base and the number turns a log upside down: $\\log_6 p = \\dfrac{1}{\\log_p 6}$.',
          'The multiplication law: $\\log_p 6 = \\log_p(2 \\times 3) = \\log_p 2 + \\log_p 3 = a + b$.',
          'So $\\log_6 p = \\dfrac{1}{a + b}$.',
          'Option a is $\\log_p 6$ itself, not turned over. Option b turns each log over before adding, but $\\dfrac{1}{a + b}$ is not $\\dfrac{1}{a} + \\dfrac{1}{b}$. Option d multiplies where the law adds.',
        ],
        answer: '$\\dfrac{1}{a + b}$',
      },
      {
        id: 'c5',
        type: 'fill_blank',
        prompt: '**13** Show that $\\log_a b \\times \\log_b c \\times \\log_c a = 1$. Hence, or otherwise, evaluate $\\log_3 7 \\times \\log_7 5 \\times \\log_5 81$.',
        textParts: ['$\\log_3 7 \\times \\log_7 5 \\times \\log_5 81 = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
        },
        solution: [
          'Change every log to base $10$: $\\dfrac{\\lg b}{\\lg a} \\times \\dfrac{\\lg c}{\\lg b} \\times \\dfrac{\\lg a}{\\lg c}$.',
          'Each lg appears once on top and once underneath, so everything cancels and the product is $1$.',
          'For the numbers: $\\dfrac{\\lg 7}{\\lg 3} \\times \\dfrac{\\lg 5}{\\lg 7} \\times \\dfrac{\\lg 81}{\\lg 5} = \\dfrac{\\lg 81}{\\lg 3} = \\log_3 81$.',
          'And $81 = 3^4$, so the product is $4$.',
        ],
        answer: '$4$',
      },
    ],
  },
];
