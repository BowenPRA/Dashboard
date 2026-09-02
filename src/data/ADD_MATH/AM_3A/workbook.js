// src/data/ADD_MATH/AM_3A/workbook.js
// The "Practice" task: Exercise 3.1 — adding, subtracting and multiplying
// polynomials, plus the naming questions the exercise assumes you can already
// answer. Twelve questions across the three tiers, each with a worked solution
// (the coursebook prints answers only; the method is what we add).
//
// English only — ADD_MATH declares `bilingual: false`.
//
// A typed answer is marked by algebraic equivalence (utils/mathEquivalence), so
// a student may type `3x^4+2x^3+3x^2` or `2x^3 + 3x^2 + 3x^4` and both are
// right. That is also why "factorise completely" is never a typed box in this
// unit — the expanded form would sample-test as equal and be marked correct.
// See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: 'Which of these is **not** a polynomial?',
        options: [
          { val: 'a', text: '$x^4 - 7x + \\tfrac{1}{2}$' },
          { val: 'b', text: '$6x^2 - \\dfrac{5}{x}$' },
          { val: 'c', text: '$-9$' },
          { val: 'd', text: '$2x^5$' },
        ],
        correct: 'b',
        solution: [
          '$\\dfrac{5}{x}$ is $5x^{-1}$, and the power $-1$ is not a whole number.',
          'A **fractional coefficient** is fine (option a), and a lone constant is a polynomial of degree 0 (option c).',
        ],
        answer: '$6x^2 - \\dfrac{5}{x}$',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: 'For the polynomial $4 - 7x + 2x^5$, fill in the three blanks.',
        textParts: ['Degree: ', '.  Leading coefficient: ', '.  Constant term: ', '.'],
        blanks: {
          1: { correct: '5', width: 4 },
          2: { correct: '2', width: 4 },
          3: { correct: '4', width: 4 },
        },
        solution: [
          'Rewrite it in descending powers first: $2x^5 - 7x + 4$.',
          'The **degree** is the highest power, $5$.',
          'The **leading coefficient** is the number in front of that highest power, $2$ — not the $4$ the question happens to start with.',
          'The **constant term** is the term with no $x$, which is $4$.',
        ],
        answer: '$5,\\ 2,\\ 4$',
      },
      {
        id: 'f3',
        prompt: 'Given $\\text{P}(x) = 3x^4 + 2x^2 - 1$ and $\\text{Q}(x) = 2x^3 + x^2 + 1$, find $\\text{P}(x) + \\text{Q}(x)$.',
        solution: [
          'Add like terms only — terms with the same power.',
          '$3x^4 + (2x^3) + (2x^2 + x^2) + (-1 + 1)$',
          'The constants cancel: $-1 + 1 = 0$.',
          '$= 3x^4 + 2x^3 + 3x^2$',
        ],
        answer: '$3x^4 + 2x^3 + 3x^2$',
      },
      {
        id: 'f4',
        prompt: 'With the same $\\text{P}$ and $\\text{Q}$, find $\\text{P}(x) - 2\\text{Q}(x)$.',
        solution: [
          'Double $\\text{Q}$ first: $2\\text{Q}(x) = 4x^3 + 2x^2 + 2$.',
          'Now subtract, flipping **every** sign inside the bracket:',
          '$3x^4 + 2x^2 - 1 - 4x^3 - 2x^2 - 2$',
          'The $x^2$ terms cancel: $2x^2 - 2x^2 = 0$.',
          '$= 3x^4 - 4x^3 - 3$',
        ],
        answer: '$3x^4 - 4x^3 - 3$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1',
        prompt: 'Expand and simplify $(2x - 1)(4x^3 + x + 2)$.',
        solution: [
          'Multiply every term of the second bracket by $2x$, then by $-1$.',
          '$2x(4x^3 + x + 2) = 8x^4 + 2x^2 + 4x$',
          '$-1(4x^3 + x + 2) = -4x^3 - x - 2$',
          'Collect: $8x^4 - 4x^3 + 2x^2 + (4x - x) - 2$',
          '$= 8x^4 - 4x^3 + 2x^2 + 3x - 2$',
        ],
        answer: '$8x^4 - 4x^3 + 2x^2 + 3x - 2$',
      },
      {
        id: 'p2',
        prompt: 'Expand and simplify $(x^3 + 2x^2 - 1)(3x + 2)$.',
        solution: [
          '$3x(x^3 + 2x^2 - 1) = 3x^4 + 6x^3 - 3x$',
          '$2(x^3 + 2x^2 - 1) = 2x^3 + 4x^2 - 2$',
          'Collect the $x^3$ terms: $6x^3 + 2x^3 = 8x^3$.',
          '$= 3x^4 + 8x^3 + 4x^2 - 3x - 2$',
        ],
        answer: '$3x^4 + 8x^3 + 4x^2 - 3x - 2$',
      },
      {
        id: 'p3',
        prompt: 'Expand and simplify $(x^2 - 5x + 2)^2$.',
        solution: [
          'A square is the bracket times itself — write it out rather than squaring each term.',
          'Squares: $(x^2)^2 = x^4$, $(-5x)^2 = 25x^2$, $(2)^2 = 4$.',
          'Double products: $2(x^2)(-5x) = -10x^3$, $2(x^2)(2) = 4x^2$, $2(-5x)(2) = -20x$.',
          'The two $x^2$ pieces join: $25x^2 + 4x^2 = 29x^2$.',
          '$= x^4 - 10x^3 + 29x^2 - 20x + 4$',
        ],
        answer: '$x^4 - 10x^3 + 29x^2 - 20x + 4$',
      },
      {
        id: 'p4',
        prompt: 'Expand and simplify $(3x - 1)^3$.',
        solution: [
          '$(3x-1)^2 = 9x^2 - 6x + 1$.',
          'Now multiply by $(3x-1)$ again:',
          '$3x(9x^2 - 6x + 1) = 27x^3 - 18x^2 + 3x$',
          '$-1(9x^2 - 6x + 1) = -9x^2 + 6x - 1$',
          '$= 27x^3 - 27x^2 + 9x - 1$',
        ],
        answer: '$27x^3 - 27x^2 + 9x - 1$',
      },
      {
        id: 'p5',
        type: 'inline',
        prompt: '$\\text{P}(x)$ has degree $4$ and $\\text{Q}(x)$ has degree $3$. Complete the sentence.',
        textParts: [
          'The degree of $\\text{P}(x)\\text{Q}(x)$ is ',
          ', and the degree of $\\text{P}(x) + \\text{Q}(x)$ is ',
          '.',
        ],
        blanks: {
          1: {
            correct: '7',
            options: [{ val: '7', text: '7' }, { val: '4', text: '4' }, { val: '12', text: '12' }],
          },
          2: {
            correct: '4',
            options: [{ val: '4', text: '4' }, { val: '7', text: '7' }, { val: '3', text: '3' }],
          },
        },
        solution: [
          'Degrees **add** when you multiply: $4 + 3 = 7$. Nothing can cancel, because neither leading coefficient is zero.',
          'When you add, the highest power present wins: $x^4$ has nothing to cancel against, so the sum has degree $4$.',
          '(If the two polynomials had the same degree, addition could lose degree — that is why the rule for adding is "at most".)',
        ],
        answer: '$7$, then $4$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        prompt: 'Simplify $(2x - 3)(x + 2) + (x + 1)(x - 1)$.',
        solution: [
          'First bracket pair: $(2x-3)(x+2) = 2x^2 + 4x - 3x - 6 = 2x^2 + x - 6$.',
          'Second: $(x+1)(x-1) = x^2 - 1$ (difference of two squares).',
          'Add: $2x^2 + x - 6 + x^2 - 1$',
          '$= 3x^2 + x - 7$',
        ],
        answer: '$3x^2 + x - 7$',
      },
      {
        id: 'c2',
        prompt: 'Simplify $(3x + 1)(x^2 + 5x + 2) - (x^2 - 4x + 2)(x + 3)$.',
        solution: [
          'First product: $(3x+1)(x^2+5x+2) = 3x^3 + 15x^2 + 6x + x^2 + 5x + 2 = 3x^3 + 16x^2 + 11x + 2$.',
          'Second product: $(x^2-4x+2)(x+3) = x^3 + 3x^2 - 4x^2 - 12x + 2x + 6 = x^3 - x^2 - 10x + 6$.',
          'Subtract the second from the first, flipping every sign of the second:',
          '$3x^3 + 16x^2 + 11x + 2 - x^3 + x^2 + 10x - 6$',
          '$= 2x^3 + 17x^2 + 21x - 4$',
        ],
        answer: '$2x^3 + 17x^2 + 21x - 4$',
      },
      {
        id: 'c3',
        prompt: 'Given $\\text{f}(x) = 2x^2 - x - 4$ and $\\text{g}(x) = x^2 + 5x + 2$, find $\\text{f}(x) + x\\,\\text{g}(x)$.',
        solution: [
          'Multiply $\\text{g}$ by $x$ first — every term goes up one power.',
          '$x\\,\\text{g}(x) = x^3 + 5x^2 + 2x$',
          'Now add $\\text{f}(x)$:',
          '$x^3 + 5x^2 + 2x + 2x^2 - x - 4$',
          '$= x^3 + 7x^2 + x - 4$',
        ],
        answer: '$x^3 + 7x^2 + x - 4$',
      },
    ],
  },
];
