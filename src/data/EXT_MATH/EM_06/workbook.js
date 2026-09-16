// src/data/EXT_MATH/EM_06/workbook.js
// The "Practice" task for EM_06: the parts of Wolsey Hall Assignment 06 that no
// engine stages — the conjugate pair over a root (Q4c), the right-angled
// triangle with sides a ± √b (Q4d), and the two "factorise completely"
// differences of two squares (Q6a, Q6b) — plus three exam-shaped questions
// that mix the unit's three skills. Every number is original; the assignment's
// own numbers are not spent here.
//
// Set It Out carries Q5, Surd Breaker carries Q4a, and Rationalise It carries
// Q4b, so between the four tasks every part of the assignment is set once.
//
// English only — EXT_MATH declares `bilingual: false`.
//
// MARKING NOTES.
//  · "Factorise completely" is ALWAYS `mcq`: mathEquivalence marks by sampling,
//    so a fully expanded answer tests equal to a factorised one.
//  · Several values in one answer are `fill_blank`, one box each, in a stated
//    order — the engine marks one value at a time and has no idea what a comma
//    means.
//  · A surd answer is asked for as the number under the root, or as the
//    integers of a stated form, so a typed box only ever holds a number.
import { DIAGRAMS } from './diagrams.js';

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** Simplify fully $\\dfrac{(8 - \\sqrt{7})(8 + \\sqrt{7})}{\\sqrt{57}}$.',
        textParts: ['The answer is $\\sqrt{n}$, where $n = $ ', '.'],
        blanks: { 1: { correct: '57', width: 5 } },
        solution: [
          'The top is a conjugate pair — a difference of two squares: $(8 - \\sqrt{7})(8 + \\sqrt{7}) = 8^2 - (\\sqrt{7})^2 = 64 - 7 = 57$.',
          'So the fraction is $\\dfrac{57}{\\sqrt{57}}$.',
          'Rationalise: $\\dfrac{57}{\\sqrt{57}} \\times \\dfrac{\\sqrt{57}}{\\sqrt{57}} = \\dfrac{57\\sqrt{57}}{57} = \\sqrt{57}$.',
          'Quicker: $57 = \\sqrt{57} \\times \\sqrt{57}$, so one $\\sqrt{57}$ cancels straight away.',
        ],
        answer: '$\\sqrt{57}$',
      },
      {
        id: 'f2',
        type: 'text',
        prompt: '**2** A right-angled triangle has shorter sides $(4 + \\sqrt{2})$ cm and $(4 - \\sqrt{2})$ cm. Find the length of the longest side, $h$.',
        inlineSvg: DIAGRAMS.WB_TRIANGLE,
        answer: '6',
        accept: ['6 cm', 'h = 6', 'h = 6 cm'],
        solution: [
          'Pythagoras: $h^2 = (4 + \\sqrt{2})^2 + (4 - \\sqrt{2})^2$.',
          'Expand each bracket: $(4 + \\sqrt{2})^2 = 16 + 4\\sqrt{2} + 4\\sqrt{2} + 2 = 18 + 8\\sqrt{2}$.',
          '$(4 - \\sqrt{2})^2 = 16 - 4\\sqrt{2} - 4\\sqrt{2} + 2 = 18 - 8\\sqrt{2}$.',
          'Add them: the surd terms cancel, because one is $+8\\sqrt{2}$ and the other $-8\\sqrt{2}$. So $h^2 = 36$.',
          '$h = \\sqrt{36} = 6$ cm. Two brackets that differ only in the middle sign always lose their surds — that is the whole idea behind the conjugate.',
        ],
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p3',
        type: 'mcq',
        prompt: '**3** Factorise completely $3x^4 - 48y^2$.',
        options: [
          { val: 'a', text: '$3(x^4 - 16y^2)$' },
          { val: 'b', text: '$3(x^2 - 4y)(x^2 + 4y)$' },
          { val: 'c', text: '$(3x^2 - 12y)(x^2 + 4y)$' },
          { val: 'd', text: '$3(x^2 - 4y)^2$' },
        ],
        correct: 'b',
        solution: [
          'Common factor first: $3x^4 - 48y^2 = 3(x^4 - 16y^2)$. That is not finished — the bracket still factorises.',
          'Inside the bracket is a difference of two squares: $x^4 = (x^2)^2$ and $16y^2 = (4y)^2$.',
          'So $x^4 - 16y^2 = (x^2 - 4y)(x^2 + 4y)$, giving $3(x^2 - 4y)(x^2 + 4y)$.',
          'Option (c) multiplies out to the same thing, but its first bracket still has a common factor of 3, so it is not factorised **completely**. Option (d) would need the two brackets to be the same, and they are not.',
        ],
        answer: '$3(x^2 - 4y)(x^2 + 4y)$',
      },
      {
        id: 'p4',
        type: 'mcq',
        prompt: '**4** Factorise completely $(x^2 + 5)^2 - (x^2 - 3)^2$.',
        options: [
          { val: 'a', text: '$16x^2 + 16$' },
          { val: 'b', text: '$8(2x^2 + 2)$' },
          { val: 'c', text: '$16(x^2 + 1)$' },
          { val: 'd', text: '$2x^2 + 2$' },
        ],
        correct: 'c',
        solution: [
          'This is $a^2 - b^2$ with $a = x^2 + 5$ and $b = x^2 - 3$, so it is $(a - b)(a + b)$.',
          '$a - b = (x^2 + 5) - (x^2 - 3) = 8$. Watch the signs: subtracting $-3$ adds 3.',
          '$a + b = (x^2 + 5) + (x^2 - 3) = 2x^2 + 2$.',
          'So the expression is $8(2x^2 + 2)$ — and $2x^2 + 2$ still has a factor of 2. Completely factorised: $16(x^2 + 1)$.',
          '$16x^2 + 16$ has the right value but is expanded, not factorised; that is the mark most often dropped on this question.',
        ],
        answer: '$16(x^2 + 1)$',
      },
      {
        id: 'p5',
        type: 'fill_blank',
        prompt: '**5** Express $\\sqrt{200} - \\sqrt{18}$ in the form $k\\sqrt{2}$, where $k$ is an integer.',
        textParts: ['$k = $ ', '.'],
        blanks: { 1: { correct: '7', width: 5 } },
        solution: [
          '$\\sqrt{200} = \\sqrt{100} \\times \\sqrt{2} = 10\\sqrt{2}$.',
          '$\\sqrt{18} = \\sqrt{9} \\times \\sqrt{2} = 3\\sqrt{2}$.',
          'Now they are like surds: $10\\sqrt{2} - 3\\sqrt{2} = 7\\sqrt{2}$, so $k = 7$.',
        ],
        answer: '$7\\sqrt{2}$',
      },
      {
        id: 'p6',
        type: 'fill_blank',
        prompt: '**6** Expand and simplify $(3 - \\sqrt{5})^2$, giving your answer in the form $a + b\\sqrt{5}$ where $a$ and $b$ are integers.',
        textParts: ['$a = $ ', ',   $b = $ ', '.'],
        blanks: {
          1: { correct: '14', width: 5 },
          2: { correct: '-6', width: 5 },
        },
        solution: [
          '$(3 - \\sqrt{5})^2$ means $(3 - \\sqrt{5})(3 - \\sqrt{5})$. Multiply every term by every term.',
          'The four cells are $9$, $-3\\sqrt{5}$, $-3\\sqrt{5}$ and $(-\\sqrt{5})(-\\sqrt{5}) = +5$.',
          'Collect: $9 + 5 = 14$ and $-3\\sqrt{5} - 3\\sqrt{5} = -6\\sqrt{5}$.',
          'So $(3 - \\sqrt{5})^2 = 14 - 6\\sqrt{5}$: $a = 14$, $b = -6$. These brackets are **not** conjugates — the signs match, so nothing cancels.',
        ],
        answer: '$14 - 6\\sqrt{5}$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c7',
        type: 'fill_blank',
        prompt: '**7** A rectangle is $(5 + \\sqrt{3})$ cm long and $(5 - \\sqrt{3})$ cm wide. Find its area, and the length of its diagonal as a surd in its simplest form.',
        inlineSvg: DIAGRAMS.WB_RECTANGLE,
        textParts: ['Area $= $ ', ' cm².   Diagonal $= $ ', ' √', ' cm.'],
        blanks: {
          1: { correct: '22', width: 5 },
          2: { correct: '2', width: 4 },
          3: { correct: '14', width: 5 },
        },
        solution: [
          'Area $= (5 + \\sqrt{3})(5 - \\sqrt{3}) = 25 - 3 = 22$ cm². A conjugate pair, so no surd is left.',
          'Diagonal by Pythagoras: $d^2 = (5 + \\sqrt{3})^2 + (5 - \\sqrt{3})^2$.',
          '$(5 + \\sqrt{3})^2 = 28 + 10\\sqrt{3}$ and $(5 - \\sqrt{3})^2 = 28 - 10\\sqrt{3}$, so $d^2 = 56$.',
          '$d = \\sqrt{56} = \\sqrt{4} \\times \\sqrt{14} = 2\\sqrt{14}$ cm. Simplify fully: 56 has the square factor 4.',
        ],
        answer: 'Area $22$ cm², diagonal $2\\sqrt{14}$ cm',
      },
      {
        id: 'c8',
        type: 'text',
        prompt: '**8** Given that $\\dfrac{a}{\\sqrt{3}} + \\sqrt{12} = 5\\sqrt{3}$, find the integer $a$.',
        answer: '9',
        accept: ['a = 9'],
        solution: [
          'Rationalise the fraction: $\\dfrac{a}{\\sqrt{3}} \\times \\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{a\\sqrt{3}}{3}$.',
          'Simplify the surd: $\\sqrt{12} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$.',
          'Now everything is a number of $\\sqrt{3}$: $\\dfrac{a}{3}\\sqrt{3} + 2\\sqrt{3} = 5\\sqrt{3}$.',
          'Compare the numbers in front of $\\sqrt{3}$: $\\dfrac{a}{3} + 2 = 5$, so $\\dfrac{a}{3} = 3$ and $a = 9$.',
          'Check: $\\dfrac{9}{\\sqrt{3}} = 3\\sqrt{3}$, and $3\\sqrt{3} + 2\\sqrt{3} = 5\\sqrt{3}$.',
        ],
      },
    ],
  },
];
