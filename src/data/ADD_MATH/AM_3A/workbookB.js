// src/data/ADD_MATH/AM_3A/workbookB.js
// The "Book Problems" task (WORKBOOK_B): Exercise 3.3 — the factor theorem,
// taken from the coursebook and worked through in full. Twelve questions.
//
// This is the second Workbook slot, so it renders with the same screen as the
// Practice task but is scored and resumed separately — one task per exercise,
// which is how the book is set and how a student revises.
//
// Two questions carry the graph of y = x³ − 3x² − 6x + 8 (DIAGRAMS.GRAPH_CUBIC_A).
// It is the same cubic as question f1, so the picture and the algebra are
// answering each other: the three crossings on the graph ARE the three factors
// the theorem finds.
//
// "Factorise completely" is never a typed box: the marking engine tests
// algebraic equivalence by sampling, so an expanded answer would be accepted for
// a factorising question. Those are multiple choice instead.
import { DIAGRAMS } from './diagrams.js';

export const workbookB = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'bf1',
        type: 'fill_blank',
        prompt: 'Use the factor theorem to show that $x - 4$ is a factor of $x^3 - 3x^2 - 6x + 8$.',
        inlineSvg: DIAGRAMS.GRAPH_CUBIC_A,
        textParts: ['$\\text{P}(4) = $ ', ', and because that is zero, $x - 4$ is a factor.'],
        blanks: { 1: { correct: '0', width: 5 } },
        solution: [
          'The factor $(x-4)$ is zero when $x = 4$, so substitute $x = 4$.',
          '$\\text{P}(4) = (4)^3 - 3(4)^2 - 6(4) + 8$',
          '$= 64 - 48 - 24 + 8$',
          '$= 0$',
          'By the factor theorem, $\\text{P}(4) = 0$ means $(x - 4)$ is a factor. The graph agrees — it crosses the axis at $x = 4$.',
        ],
        answer: '$0$',
      },
      {
        id: 'bf2',
        type: 'fill_blank',
        prompt: 'Show that $x + 1$ is a factor of $x^3 - 3x - 2$.',
        textParts: ['First solve $x + 1 = 0$, giving $x = $ ', '. Then $\\text{P}(x)$ at that value is ', '.'],
        blanks: {
          1: { correct: '-1', width: 5 },
          2: { correct: '0', width: 5 },
        },
        solution: [
          'Set the bracket to zero: $x + 1 = 0$, so $x = -1$. **Not** $+1$.',
          '$\\text{P}(-1) = (-1)^3 - 3(-1) - 2$',
          '$= -1 + 3 - 2 = 0$',
          'So $(x+1)$ is a factor of $x^3 - 3x - 2$.',
        ],
        answer: '$x = -1$, and $\\text{P}(-1) = 0$',
      },
      {
        id: 'bf3',
        prompt: 'Show that $x - 2$ is a factor of $5x^3 - 17x^2 + 28$ by working out $\\text{P}(2)$. Type the value of $\\text{P}(2)$.',
        solution: [
          'Note there is no $x$ term, so nothing is contributed by it.',
          '$\\text{P}(2) = 5(2)^3 - 17(2)^2 + 28$',
          '$= 5(8) - 17(4) + 28$',
          '$= 40 - 68 + 28 = 0$',
          'The value is zero, so $(x-2)$ is a factor.',
        ],
        answer: '$0$',
      },
      {
        id: 'bf4',
        type: 'mcq',
        prompt: 'To show that $3x + 1$ is a factor of $6x^3 + 11x^2 - 3x - 2$, which value must you substitute?',
        options: [
          { val: 'a', text: '$x = 3$' },
          { val: 'b', text: '$x = -\\tfrac{1}{3}$' },
          { val: 'c', text: '$x = \\tfrac{1}{3}$' },
          { val: 'd', text: '$x = -1$' },
        ],
        correct: 'b',
        solution: [
          'Set the bracket to zero: $3x + 1 = 0$, so $x = -\\tfrac{1}{3}$.',
          'This is the extended factor theorem: if $\\text{P}\\!\\left(\\tfrac{b}{a}\\right) = 0$ then $(ax - b)$ is a factor. Here $ax - b$ is $3x - (-1)$.',
          'Checking: $6\\!\\left(-\\tfrac{1}{27}\\right) + 11\\!\\left(\\tfrac{1}{9}\\right) + 1 - 2 = -\\tfrac{2}{9} + \\tfrac{11}{9} - 1 = 0$.',
        ],
        answer: '$x = -\\tfrac{1}{3}$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'bp1',
        prompt: '$x + 1$ is a factor of $6x^3 + 27x^2 + ax + 8$. Find the value of $a$.',
        solution: [
          '$(x+1)$ is a factor, so $\\text{P}(-1) = 0$.',
          '$6(-1)^3 + 27(-1)^2 + a(-1) + 8 = 0$',
          '$-6 + 27 - a + 8 = 0$',
          '$29 - a = 0$',
          '$a = 29$',
        ],
        answer: '$a = 29$',
      },
      {
        id: 'bp2',
        prompt: '$x + 7$ is a factor of $x^3 - 5x^2 - 6x + a$. Find the value of $a$.',
        solution: [
          'Substitute $x = -7$ and set the result to zero.',
          '$(-7)^3 - 5(-7)^2 - 6(-7) + a = 0$',
          '$-343 - 245 + 42 + a = 0$',
          '$-546 + a = 0$',
          '$a = 546$',
        ],
        answer: '$a = 546$',
      },
      {
        id: 'bp3',
        prompt: '$2x + 3$ is a factor of $4x^3 + ax^2 + 29x + 30$. Find the value of $a$.',
        solution: [
          '$2x + 3 = 0$ gives $x = -\\tfrac{3}{2}$, so $\\text{P}\\!\\left(-\\tfrac{3}{2}\\right) = 0$.',
          '$4\\!\\left(-\\tfrac{27}{8}\\right) + a\\!\\left(\\tfrac{9}{4}\\right) + 29\\!\\left(-\\tfrac{3}{2}\\right) + 30 = 0$',
          '$-\\tfrac{27}{2} + \\tfrac{9a}{4} - \\tfrac{87}{2} + 30 = 0$',
          '$\\tfrac{9a}{4} - 27 = 0$',
          '$a = 12$',
        ],
        answer: '$a = 12$',
      },
      {
        id: 'bp4',
        prompt: '$x - 2$ is a factor of $x^3 + ax^2 + bx - 4$. Express $b$ in terms of $a$.',
        solution: [
          'One condition, two unknowns — so the answer is a relationship, not a number.',
          '$\\text{P}(2) = 0$: $\\;8 + 4a + 2b - 4 = 0$',
          '$4 + 4a + 2b = 0$',
          'Divide through by 2: $\\;2 + 2a + b = 0$',
          '$b = -2a - 2$',
        ],
        answer: '$b = -2a - 2$',
      },
      {
        id: 'bp5',
        type: 'mcq',
        prompt: 'From question 1 you know $(x-4)$ is a factor of $x^3 - 3x^2 - 6x + 8$. Dividing gives the quotient $x^2 + x - 2$. Factorised completely, the cubic is:',
        inlineSvg: DIAGRAMS.GRAPH_CUBIC_A,
        options: [
          { val: 'a', text: '$(x - 4)(x + 2)(x - 1)$' },
          { val: 'b', text: '$(x + 4)(x - 2)(x + 1)$' },
          { val: 'c', text: '$(x - 4)(x^2 + x - 2)$' },
          { val: 'd', text: '$(x - 4)(x - 2)(x + 1)$' },
        ],
        correct: 'a',
        solution: [
          'Factorise the quotient: $x^2 + x - 2 = (x + 2)(x - 1)$.',
          'So $x^3 - 3x^2 - 6x + 8 = (x - 4)(x + 2)(x - 1)$.',
          'Option c is correct but **not complete** — the quadratic still factorises, and "completely" means going all the way.',
          'Check against the graph: the crossings are at $-2$, $1$ and $4$, exactly the three roots these factors give.',
        ],
        answer: '$(x - 4)(x + 2)(x - 1)$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'bc1',
        type: 'fill_blank',
        prompt: '$x^2 + 3x - 10$ is a factor of $x^3 + ax^2 + bx + 30$. Find $a$ and $b$.',
        textParts: ['$a = $ ', ' and $b = $ ', ''],
        blanks: {
          1: { correct: '0', width: 5 },
          2: { correct: '-19', width: 5 },
        },
        solution: [
          'Factorise the quadratic first: $x^2 + 3x - 10 = (x + 5)(x - 2)$.',
          'So **both** $(x+5)$ and $(x-2)$ are factors, giving two equations.',
          '$\\text{P}(-5) = 0$: $\\;-125 + 25a - 5b + 30 = 0$, so $5a - b = 19$.',
          '$\\text{P}(2) = 0$: $\\;8 + 4a + 2b + 30 = 0$, so $2a + b = -19$.',
          'Add the two equations: $7a = 0$, so $a = 0$.',
          'Then $b = -19$. (Check: $x^3 - 19x + 30 = (x^2 + 3x - 10)(x - 3)$.)',
        ],
        answer: '$a = 0,\\ b = -19$',
      },
      {
        id: 'bc2',
        prompt: 'It is given that $x^2 - 5x + 6$ and $x^3 - 6x^2 + 11x + a$ have a common factor. Find the possible value of $a$.',
        solution: [
          '$x^2 - 5x + 6 = (x - 2)(x - 3)$, so the common factor is $(x-2)$ or $(x-3)$.',
          'If $(x-2)$: $\\;8 - 24 + 22 + a = 0 \\Rightarrow 6 + a = 0 \\Rightarrow a = -6$.',
          'If $(x-3)$: $\\;27 - 54 + 33 + a = 0 \\Rightarrow 6 + a = 0 \\Rightarrow a = -6$.',
          'Both cases give the same answer, which is why the question says "the possible value" and not "values".',
          '$a = -6$',
        ],
        answer: '$a = -6$',
      },
      {
        id: 'bc3',
        type: 'fill_blank',
        prompt: '$x + a$ is a factor of $x^3 + 8x^2 + 4ax - 3a$. Show that $a^3 - 4a^2 + 3a = 0$, then find the three possible values of $a$ in increasing order.',
        textParts: ['$a = $ ', ', ', ' or ', ''],
        blanks: {
          1: { correct: '0', width: 5 },
          2: { correct: '1', width: 5 },
          3: { correct: '3', width: 5 },
        },
        solution: [
          '$(x + a)$ is a factor, so substitute $x = -a$ and set the result to zero.',
          '$(-a)^3 + 8(-a)^2 + 4a(-a) - 3a = 0$',
          '$-a^3 + 8a^2 - 4a^2 - 3a = 0$',
          '$-a^3 + 4a^2 - 3a = 0$, and multiplying by $-1$ gives $a^3 - 4a^2 + 3a = 0$.',
          'Now factorise: $a(a^2 - 4a + 3) = 0$, so $a(a - 1)(a - 3) = 0$.',
          '$a = 0$, $a = 1$ or $a = 3$.',
        ],
        answer: '$a = 0,\\ 1$ or $3$',
      },
    ],
  },
];
