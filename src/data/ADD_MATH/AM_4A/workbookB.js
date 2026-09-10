// src/data/ADD_MATH/AM_4A/workbookB.js
// The "Book Problems" task (WORKBOOK_B): Exercise 4.2 on modulus INEQUALITIES,
// minus the eight parts the Case Solver stages on a number line (3a–c, 3f, 4a,
// 5b, 5e, 5f). The twenty-two here are worked through in full — the graph
// questions, the ones with an expression on the right, the squaring ones with
// a coefficient in front, the constant-k pair and the sum of moduli.
//
// This is the second Workbook slot, so it renders with the same screen as the
// Practice task but is scored and resumed separately — one task per exercise,
// which is how the book is set and how a student revises. It checkpoints every
// correct answer, so it can be picked up where it was left.
//
// MARKING NOTE. The equivalence engine handles a CHAIN like -1 < x < 2 natively,
// so every "less than" answer is a single typed box and a student may type it in
// either direction or with any equivalent fraction. It does NOT understand "or",
// so every "greater than" answer — which is always two rays — is a fill_blank
// with the inequality signs printed and a box for each critical value. That also
// drills the thing the section is really testing: knowing which SHAPE the answer
// has before you work out the numbers.
//
// Fractions in a `correct` field are \dfrac, never \tfrac — see the note at the
// top of workbook.js.
import { DIAGRAMS } from './diagrams.js';

export const workbookB = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'bf1',
        prompt: '**1** The graphs of $y = |x - 2|$ and $y = |2x - 10|$ are shown. Write down the set of values of $x$ that satisfy $|x - 2| > |2x - 10|$.',
        inlineSvg: DIAGRAMS.EX_Q1_GRID,
        solution: [
          'Nothing needs solving here — the picture already contains the answer. Find the crossings first: they are at $x = 4$ and $x = 8$.',
          'Now read the inequality literally. $|x - 2| > |2x - 10|$ asks where the **blue** graph is above the **red** one.',
          'Test a point between the crossings, say $x = 6$: $|6 - 2| = 4$ and $|12 - 10| = 2$. Blue is higher, so this stretch counts.',
          'Test a point outside, say $x = 0$: $|-2| = 2$ and $|-10| = 10$. Red is higher, so outside does not count.',
          'The answer is the single interval between the crossings: $4 < x < 8$. Strict signs, because at the crossings the two are equal, not one greater than the other.',
        ],
        answer: '$4 < x < 8$',
      },
      {
        id: 'bf2a',
        type: 'fill_blank',
        prompt: '**2a** Sketch $y = |3x - 6|$ and $y = |4 - x|$ on the same axes. At which two values of $x$ do they meet?',
        inlineSvgSolved: DIAGRAMS.EX_Q2_GRID,
        textParts: ['Smaller: $x = $ ', '.   Larger: $x = $ ', '.'],
        blanks: {
          1: { correct: '1', width: 6 },
          2: { correct: '$\\dfrac{5}{2}$', width: 6 },
        },
        solution: [
          '$y = |3x - 6|$ is a V with its vertex on the axis at $x = 2$, and arms of gradient $3$ and $-3$ — three times as steep as $y = |x|$.',
          '$y = |4 - x|$ is a V with its vertex at $x = 4$ and arms of gradient $1$ and $-1$.',
          'They meet where $|3x - 6| = |4 - x|$. Case 1: $3x - 6 = 4 - x$, so $4x = 10$ and $x = \\dfrac{5}{2}$.',
          'Case 2: $3x - 6 = -(4 - x) = x - 4$, so $2x = 2$ and $x = 1$.',
          'The crossings are at $\\left(1, 3\\right)$ and $\\left(\\dfrac{5}{2}, \\dfrac{3}{2}\\right)$.',
        ],
        answer: '$x = 1$ and $x = \\dfrac{5}{2}$',
      },
      {
        id: 'bf2b',
        type: 'fill_blank',
        prompt: '**2b** Solve the inequality $|3x - 6| \\geq |4 - x|$.',
        inlineSvg: DIAGRAMS.EX_Q2_GRID,
        textParts: ['$x \\leq $ ', '   or   $x \\geq $ ', '.'],
        blanks: {
          1: { correct: '1', width: 6 },
          2: { correct: '$\\dfrac{5}{2}$', width: 6 },
        },
        solution: [
          'A modulus sits on each side, so squaring is safe: $|p| \\geq |q| \\iff p^2 \\geq q^2$.',
          '$(3x - 6)^2 \\geq (4 - x)^2$, so $9x^2 - 36x + 36 \\geq 16 - 8x + x^2$.',
          'Collect on the side that keeps $x^2$ positive: $8x^2 - 28x + 20 \\geq 0$, and divide by $4$ to get $2x^2 - 7x + 5 \\geq 0$.',
          'Factorise: $(2x - 5)(x - 1) \\geq 0$, so the critical values are $1$ and $\\dfrac{5}{2}$.',
          'This parabola opens upwards, so it is at or above the axis **outside** the roots: $x \\leq 1$ or $x \\geq \\dfrac{5}{2}$ — exactly the parts of the sketch where the steeper V is on top.',
        ],
        answer: '$x \\leq 1$ or $x \\geq \\dfrac{5}{2}$',
      },
      {
        id: 'bf3d',
        type: 'fill_blank',
        prompt: '**3d** Solve $|2x - 7| > 3$.',
        textParts: ['$x < $ ', '   or   $x > $ ', '.'],
        blanks: {
          1: { correct: '2', width: 6 },
          2: { correct: '5', width: 6 },
        },
        solution: [
          'Split into two branches: $2x - 7 < -3$ or $2x - 7 > 3$.',
          'First: $2x < 4$, so $x < 2$.',
          'Second: $2x > 10$, so $x > 5$.',
          'A quick sanity check: the vertex of $y = |2x - 7|$ sits at $x = 3.5$, exactly halfway between $2$ and $5$ — which it must, because the two branches are symmetrical about it.',
        ],
        answer: '$x < 2$ or $x > 5$',
      },
      {
        id: 'bf3e',
        type: 'fill_blank',
        prompt: '**3e** Solve $|3x + 1| > 8$.',
        textParts: ['$x < $ ', '   or   $x > $ ', '.'],
        blanks: {
          1: { correct: '-3', width: 6 },
          2: { correct: '$\\dfrac{7}{3}$', width: 6 },
        },
        solution: [
          'Branch one: $3x + 1 < -8$, so $3x < -9$ and $x < -3$.',
          'Branch two: $3x + 1 > 8$, so $3x > 7$ and $x > \\dfrac{7}{3}$.',
          'Leave the second answer as a fraction. Rounding it to $2.3$ would let in values such as $x = 2.32$ that do not actually satisfy the inequality.',
        ],
        answer: '$x < -3$ or $x > \\dfrac{7}{3}$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'bp4b',
        prompt: '**4b** Solve $|5 + x| > 7 - 2x$.',
        solution: [
          'The right-hand side can be negative, so deal with that case separately. If $7 - 2x < 0$, that is $x > \\dfrac{7}{2}$, the inequality is **automatically true** — a modulus is never negative, so it certainly beats a negative number.',
          'For the rest, $x \\leq \\dfrac{7}{2}$, both sides are non-negative and squaring is safe: $(5 + x)^2 > (7 - 2x)^2$.',
          'Expand: $25 + 10x + x^2 > 49 - 28x + 4x^2$, so $0 > 3x^2 - 38x + 24$.',
          'Factorise $3x^2 - 38x + 24 = (3x - 2)(x - 12)$, so $(3x - 2)(x - 12) < 0$ gives $\\dfrac{2}{3} < x < 12$.',
          'Combine with $x \\leq \\dfrac{7}{2}$ to get $\\dfrac{2}{3} < x \\leq \\dfrac{7}{2}$, then add back the automatic case $x > \\dfrac{7}{2}$. The two join up into $x > \\dfrac{2}{3}$.',
        ],
        answer: '$x > \\dfrac{2}{3}$',
      },
      {
        id: 'bp4c',
        prompt: '**4c** Solve $|x - 2| - 3x \\leq 1$.',
        solution: [
          'Get the modulus alone first: $|x - 2| \\leq 3x + 1$.',
          'The right-hand side may be negative, so record the condition: $3x + 1 \\geq 0$, that is $x \\geq -\\dfrac{1}{3}$.',
          'Square: $x^2 - 4x + 4 \\leq 9x^2 + 6x + 1$, so $0 \\leq 8x^2 + 10x - 3$.',
          'Factorise $8x^2 + 10x - 3 = (4x - 1)(2x + 3)$, so $(4x - 1)(2x + 3) \\geq 0$ gives $x \\leq -\\dfrac{3}{2}$ or $x \\geq \\dfrac{1}{4}$.',
          'Now apply the condition. The piece $x \\leq -\\dfrac{3}{2}$ is entirely below $-\\dfrac{1}{3}$, so it is thrown out. What survives is $x \\geq \\dfrac{1}{4}$.',
        ],
        answer: '$x \\geq \\dfrac{1}{4}$',
      },
      {
        id: 'bp5a',
        type: 'fill_blank',
        prompt: '**5a** Solve $|2x - 1| \\leq |3x|$.',
        textParts: ['$x \\leq $ ', '   or   $x \\geq $ ', '.'],
        blanks: {
          1: { correct: '-1', width: 6 },
          2: { correct: '$\\dfrac{1}{5}$', width: 6 },
        },
        solution: [
          'Modulus on both sides, so square: $(2x - 1)^2 \\leq (3x)^2$.',
          '$4x^2 - 4x + 1 \\leq 9x^2$, so $0 \\leq 5x^2 + 4x - 1$.',
          'Factorise: $(5x - 1)(x + 1) \\geq 0$, with critical values $\\dfrac{1}{5}$ and $-1$.',
          'Upward parabola, at or above the axis outside its roots: $x \\leq -1$ or $x \\geq \\dfrac{1}{5}$.',
          'Note that this "less than" question still gives **two** pieces — the shape rule only applies to a modulus against a positive **number**, not against another modulus.',
        ],
        answer: '$x \\leq -1$ or $x \\geq \\dfrac{1}{5}$',
      },
      {
        id: 'bp5c',
        prompt: '**5c** Solve $|x| > |3x - 2|$.',
        solution: [
          'Square: $x^2 > (3x - 2)^2 = 9x^2 - 12x + 4$.',
          'Collect on the side that keeps $x^2$ positive: $0 > 8x^2 - 12x + 4$.',
          'Divide by $4$: $2x^2 - 3x + 1 < 0$, which factorises as $(2x - 1)(x - 1) < 0$.',
          'Below the axis on an upward parabola is **between** the roots: $\\dfrac{1}{2} < x < 1$.',
        ],
        answer: '$\\dfrac{1}{2} < x < 1$',
      },
      {
        id: 'bp5d',
        type: 'fill_blank',
        prompt: '**5d** Solve $|4x + 3| > |x|$.',
        textParts: ['$x < $ ', '   or   $x > $ ', '.'],
        blanks: {
          1: { correct: '-1', width: 6 },
          2: { correct: '$-\\dfrac{3}{5}$', width: 6 },
        },
        solution: [
          'Square: $(4x + 3)^2 > x^2$, so $16x^2 + 24x + 9 > x^2$.',
          'Collect: $15x^2 + 24x + 9 > 0$, and divide by $3$ to get $5x^2 + 8x + 3 > 0$.',
          'Factorise: $(5x + 3)(x + 1) > 0$, with critical values $-\\dfrac{3}{5}$ and $-1$.',
          'Above the axis is outside the roots, and $-1$ is the smaller: $x < -1$ or $x > -\\dfrac{3}{5}$.',
          'Both critical values are negative, so watch the order — $-1 < -\\dfrac{3}{5}$.',
        ],
        answer: '$x < -1$ or $x > -\\dfrac{3}{5}$',
      },
      {
        id: 'bp6a',
        prompt: '**6a** Solve $|x + 1| > |x - 4|$.',
        solution: [
          'Square: $(x + 1)^2 > (x - 4)^2$, so $x^2 + 2x + 1 > x^2 - 8x + 16$.',
          'The $x^2$ terms cancel — that always happens when both moduli have the same coefficient of $x$ — leaving a linear inequality.',
          '$2x + 1 > -8x + 16$, so $10x > 15$ and $x > \\dfrac{3}{2}$.',
          'Read it as distances: which numbers are further from $-1$ than from $4$? Everything to the right of the midpoint $\\dfrac{3}{2}$.',
        ],
        answer: '$x > \\dfrac{3}{2}$',
      },
      {
        id: 'bp6b',
        prompt: '**6b** Solve $|x - 2| \\geq |x + 5|$.',
        solution: [
          'Square: $(x - 2)^2 \\geq (x + 5)^2$, so $x^2 - 4x + 4 \\geq x^2 + 10x + 25$.',
          'The $x^2$ terms cancel: $-4x + 4 \\geq 10x + 25$.',
          'Collect: $-21 \\geq 14x$, so $x \\leq -\\dfrac{21}{14} = -\\dfrac{3}{2}$.',
          'Dividing by the positive $14$ keeps the sign the way it is; it is only the swap of sides that turns $\\geq$ into $\\leq$.',
        ],
        answer: '$x \\leq -\\dfrac{3}{2}$',
      },
      {
        id: 'bp6c',
        type: 'fill_blank',
        prompt: '**6c** Solve $|x + 1| \\leq |3x + 5|$.',
        textParts: ['$x \\leq $ ', '   or   $x \\geq $ ', '.'],
        blanks: {
          1: { correct: '-2', width: 6 },
          2: { correct: '$-\\dfrac{3}{2}$', width: 6 },
        },
        solution: [
          'Square: $(x + 1)^2 \\leq (3x + 5)^2$, so $x^2 + 2x + 1 \\leq 9x^2 + 30x + 25$.',
          'Collect on the side with the positive $x^2$: $0 \\leq 8x^2 + 28x + 24$.',
          'Divide by $4$: $2x^2 + 7x + 6 \\geq 0$, which factorises as $(2x + 3)(x + 2) \\geq 0$.',
          'Critical values $-\\dfrac{3}{2}$ and $-2$; at or above the axis is outside them, and $-2$ is the smaller.',
          'So $x \\leq -2$ or $x \\geq -\\dfrac{3}{2}$. Almost every real number works — the only gap is the short stretch between the two.',
        ],
        answer: '$x \\leq -2$ or $x \\geq -\\dfrac{3}{2}$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'bc6d',
        prompt: '**6d** Solve $|2x + 3| \\leq |x - 3|$.',
        solution: [
          'Square: $(2x + 3)^2 \\leq (x - 3)^2$, so $4x^2 + 12x + 9 \\leq x^2 - 6x + 9$.',
          'The constants cancel as well as some of the rest: $3x^2 + 18x \\leq 0$.',
          'Take out the common factor rather than reaching for the formula: $3x(x + 6) \\leq 0$.',
          'Critical values $0$ and $-6$; at or below the axis is between them: $-6 \\leq x \\leq 0$.',
        ],
        answer: '$-6 \\leq x \\leq 0$',
      },
      {
        id: 'bc6e',
        prompt: '**6e** Solve $|x + 2| < \\left|\\dfrac{1}{2}x - 5\\right|$.',
        solution: [
          'Square both sides: $(x + 2)^2 < \\left(\\dfrac{1}{2}x - 5\\right)^2$.',
          '$x^2 + 4x + 4 < \\dfrac{1}{4}x^2 - 5x + 25$. Multiply everything by $4$ to clear the fraction: $4x^2 + 16x + 16 < x^2 - 20x + 100$.',
          'Collect: $3x^2 + 36x - 84 < 0$, and divide by $3$: $x^2 + 12x - 28 < 0$.',
          'Factorise: $(x + 14)(x - 2) < 0$.',
          'Below the axis is between the roots: $-14 < x < 2$.',
        ],
        answer: '$-14 < x < 2$',
      },
      {
        id: 'bc6f',
        type: 'fill_blank',
        prompt: '**6f** Solve $|3x - 2| \\geq |x + 4|$.',
        textParts: ['$x \\leq $ ', '   or   $x \\geq $ ', '.'],
        blanks: {
          1: { correct: '$-\\dfrac{1}{2}$', width: 6 },
          2: { correct: '3', width: 6 },
        },
        solution: [
          'Square: $(3x - 2)^2 \\geq (x + 4)^2$, so $9x^2 - 12x + 4 \\geq x^2 + 8x + 16$.',
          'Collect: $8x^2 - 20x - 12 \\geq 0$, and divide by $4$: $2x^2 - 5x - 3 \\geq 0$.',
          'Factorise: $(2x + 1)(x - 3) \\geq 0$, with critical values $-\\dfrac{1}{2}$ and $3$.',
          'At or above the axis is outside the roots: $x \\leq -\\dfrac{1}{2}$ or $x \\geq 3$.',
        ],
        answer: '$x \\leq -\\dfrac{1}{2}$ or $x \\geq 3$',
      },
      {
        id: 'bc7a',
        prompt: '**7a** Solve $2|x - 3| > |3x + 1|$.',
        solution: [
          'A positive number in front of a modulus is harmless — both sides are still non-negative, so squaring is legal. Remember to square the $2$ as well.',
          '$4(x - 3)^2 > (3x + 1)^2$, so $4x^2 - 24x + 36 > 9x^2 + 6x + 1$.',
          'Collect with $x^2$ positive: $0 > 5x^2 + 30x - 35$, and divide by $5$: $x^2 + 6x - 7 < 0$.',
          'Factorise: $(x + 7)(x - 1) < 0$.',
          'Below the axis is between the roots: $-7 < x < 1$.',
        ],
        answer: '$-7 < x < 1$',
      },
      {
        id: 'bc7b',
        prompt: '**7b** Solve $3|x - 1| < |2x + 1|$.',
        solution: [
          'Square, remembering that the $3$ becomes a $9$: $9(x - 1)^2 < (2x + 1)^2$.',
          '$9x^2 - 18x + 9 < 4x^2 + 4x + 1$.',
          'Collect: $5x^2 - 22x + 8 < 0$.',
          'Factorise: $(5x - 2)(x - 4) < 0$, with critical values $\\dfrac{2}{5}$ and $4$.',
          'Below the axis is between them: $\\dfrac{2}{5} < x < 4$.',
        ],
        answer: '$\\dfrac{2}{5} < x < 4$',
      },
      {
        id: 'bc7c',
        type: 'fill_blank',
        prompt: '**7c** Solve $|2x - 5| \\leq 3|2x + 1|$.',
        textParts: ['$x \\leq $ ', '   or   $x \\geq $ ', '.'],
        blanks: {
          1: { correct: '-2', width: 6 },
          2: { correct: '$\\dfrac{1}{4}$', width: 6 },
        },
        solution: [
          'Square both sides, with the $3$ becoming a $9$: $(2x - 5)^2 \\leq 9(2x + 1)^2$.',
          '$4x^2 - 20x + 25 \\leq 9(4x^2 + 4x + 1) = 36x^2 + 36x + 9$.',
          'Collect: $0 \\leq 32x^2 + 56x - 16$, and divide by $8$: $4x^2 + 7x - 2 \\geq 0$.',
          'Factorise: $(4x - 1)(x + 2) \\geq 0$, with critical values $\\dfrac{1}{4}$ and $-2$.',
          'At or above the axis is outside the roots: $x \\leq -2$ or $x \\geq \\dfrac{1}{4}$.',
        ],
        answer: '$x \\leq -2$ or $x \\geq \\dfrac{1}{4}$',
      },
      {
        id: 'bc8',
        prompt: '**8** Solve the inequality $|x + 2k| \\geq |x - 3k|$, where $k$ is a positive constant.',
        solution: [
          'A letter instead of a number changes nothing about the method — square both sides.',
          '$(x + 2k)^2 \\geq (x - 3k)^2$, so $x^2 + 4kx + 4k^2 \\geq x^2 - 6kx + 9k^2$.',
          'The $x^2$ terms cancel: $4kx + 4k^2 \\geq -6kx + 9k^2$, so $10kx \\geq 5k^2$.',
          'Divide both sides by $5k$. This is the step the question is testing: **because $k$ is positive**, the inequality sign does not turn round.',
          'So $2x \\geq k$, giving $x \\geq \\dfrac{k}{2}$ — the midpoint of $-2k$ and $3k$, as the distance reading predicts.',
        ],
        answer: '$x \\geq \\dfrac{k}{2}$',
      },
      {
        id: 'bc9',
        type: 'fill_blank',
        prompt: '**9** Solve the inequality $|x + 3k| < 4|x - k|$, where $k$ is a positive constant.',
        textParts: ['$x < $ ', '   or   $x > $ ', '.'],
        blanks: {
          1: { correct: '$\\dfrac{k}{5}$', width: 7 },
          2: { correct: '$\\dfrac{7k}{3}$', width: 7 },
        },
        solution: [
          'Square, and square the $4$ as well: $(x + 3k)^2 < 16(x - k)^2$.',
          '$x^2 + 6kx + 9k^2 < 16x^2 - 32kx + 16k^2$.',
          'Collect with $x^2$ positive: $0 < 15x^2 - 38kx + 7k^2$.',
          'Factorise, treating $k$ as a number: $(5x - k)(3x - 7k) > 0$, so the critical values are $\\dfrac{k}{5}$ and $\\dfrac{7k}{3}$.',
          'Because $k$ is positive, $\\dfrac{k}{5}$ is the smaller. Above the axis is outside the roots: $x < \\dfrac{k}{5}$ or $x > \\dfrac{7k}{3}$.',
        ],
        answer: '$x < \\dfrac{k}{5}$ or $x > \\dfrac{7k}{3}$',
      },
      {
        id: 'bc10',
        prompt: '**10 Challenge.** Solve $|3x + 2| + |3x - 2| \\leq 8$.',
        solution: [
          'A **sum** of moduli cannot be squared, so cut the number line at the two critical values: $3x + 2 = 0$ gives $x = -\\dfrac{2}{3}$, and $3x - 2 = 0$ gives $x = \\dfrac{2}{3}$.',
          'For $x < -\\dfrac{2}{3}$ both brackets are negative: $-(3x+2) - (3x-2) = -6x \\leq 8$, so $x \\geq -\\dfrac{4}{3}$. Combined with the region, $-\\dfrac{4}{3} \\leq x < -\\dfrac{2}{3}$.',
          'For $-\\dfrac{2}{3} \\leq x < \\dfrac{2}{3}$ only the second flips: $(3x+2) - (3x-2) = 4 \\leq 8$, which is true no matter what $x$ is. The whole of this middle region counts.',
          'For $x \\geq \\dfrac{2}{3}$ neither flips: $(3x+2) + (3x-2) = 6x \\leq 8$, so $x \\leq \\dfrac{4}{3}$. Combined with the region, $\\dfrac{2}{3} \\leq x \\leq \\dfrac{4}{3}$.',
          'The three pieces join with no gaps, so the answer is the single interval $-\\dfrac{4}{3} \\leq x \\leq \\dfrac{4}{3}$.',
        ],
        answer: '$-\\dfrac{4}{3} \\leq x \\leq \\dfrac{4}{3}$',
      },
    ],
  },
];
