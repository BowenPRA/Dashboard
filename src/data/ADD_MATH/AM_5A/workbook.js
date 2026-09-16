// src/data/ADD_MATH/AM_5A/workbook.js
// The "Practice" task for sections 5.1–5.3: the parts of the exercises the
// Log Simplifier does not stage. The Simplifier carries every "evaluate" and
// every "write as a single logarithm / simplify" part; this file carries the
// rest — the calculator (10^x = k to 3 sf), converting between the two forms
// with the unknown in a new place, the domain of a log of an expression,
// writing a log in terms of given logs, using given values of lg 2 and lg 3,
// and the challenge parts that mix the laws with the definition. Every number
// is fresh.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. Several values in one question are fill_blank, one box each,
// in a stated order, because the equivalence engine marks one value at a time.
// Letters (p, q, u, v) are fine in a typed box: equivalence is tested by
// sampling. Fractions in a `correct` field are \dfrac, never \tfrac. Nothing
// here asks a student to type "lg" — a log in an answer is always an mcq.
export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'mcq',
        prompt: '**1** Write $10^x = 80$ in logarithmic form.',
        options: [
          { val: 'a', text: '$80 = \\lg x$' },
          { val: 'b', text: '$x = \\log_{80} 10$' },
          { val: 'c', text: '$x = \\lg 80$' },
          { val: 'd', text: '$x = 80^{10}$' },
        ],
        correct: 'c',
        solution: [
          'Identify the base and the power: the base is $10$ and the power is $x$.',
          'In log form the power stands on its own, and the base goes at the bottom of the log: $x = \\log_{10} 80$.',
          'A log to base $10$ is written $\\lg$, so $x = \\lg 80$.',
        ],
        answer: '$x = \\lg 80$',
      },
      {
        id: 'f2',
        prompt: '**2** Solve $10^x = 80$, giving $x$ correct to 3 significant figures.',
        solution: [
          'From question 1, $x = \\lg 80$.',
          'Use the **log** key: $\\lg 80 = 1.90308\\ldots$',
          'To 3 significant figures, $x = 1.90$ — the zero is significant, so write it.',
          'Check it makes sense: $10^1 = 10$ and $10^2 = 100$, and $80$ is between them, so $x$ is between $1$ and $2$.',
        ],
        answer: '$x = 1.90$',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: '**3** Write each in exponential form, then find $x$.',
        textParts: ['(a) $\\log_2 x = 6$, so $x = $ ', '.   (b) $\\log_x 49 = 2$, so $x = $ ', '.   (c) $\\log_3 x = -2$, so $x = $ ', '.'],
        blanks: {
          1: { correct: '64', width: 5 },
          2: { correct: '7', width: 5 },
          3: { correct: '$\\dfrac{1}{9}$', width: 6 },
        },
        solution: [
          '(a) The base is $2$ and the power is $6$: $x = 2^6 = 64$.',
          '(b) The base is $x$ and the power is $2$: $x^2 = 49$, so $x = 7$ or $x = -7$. A base must be positive, so $x = 7$.',
          '(c) The base is $3$ and the power is $-2$: $x = 3^{-2} = \\dfrac{1}{3^2} = \\dfrac{1}{9}$.',
        ],
        answer: '$64$, $7$, $\\dfrac{1}{9}$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p4',
        prompt: '**4** Find the values of $x$ for which $\\log_2(3x - 6)$ is defined.',
        solution: [
          'A log exists only when the whole expression inside it is positive.',
          'So $3x - 6 > 0$.',
          'Add $6$: $3x > 6$. Divide by $3$: $x > 2$.',
          'At $x = 2$ the inside is $0$, and $\\log_2 0$ does not exist — so the inequality is strict.',
        ],
        answer: '$x > 2$',
      },
      {
        id: 'p5',
        prompt: '**5** Find the values of $x$ for which $\\lg(x + 5) + \\lg(4 - x)$ is defined.',
        solution: [
          'Both logs must exist, so BOTH insides must be positive.',
          'First: $x + 5 > 0$, so $x > -5$.',
          'Second: $4 - x > 0$, so $x < 4$.',
          'Both at once: $-5 < x < 4$.',
        ],
        answer: '$-5 < x < 4$',
      },
      {
        id: 'p6',
        type: 'fill_blank',
        prompt: '**6** Given that $\\log_a 3 = p$ and $\\log_a 5 = q$, write each of these in terms of $p$ and $q$.',
        textParts: ['(a) $\\log_a 45 = $ ', '.   (b) $\\log_a \\dfrac{5}{9} = $ ', '.   (c) $\\log_a 15a = $ ', '.'],
        blanks: {
          1: { correct: '2p + q', width: 8 },
          2: { correct: 'q - 2p', width: 8 },
          3: { correct: 'p + q + 1', width: 9 },
        },
        solution: [
          '(a) Write $45$ using only $3$s and $5$s: $45 = 3^2 \\times 5$. So $\\log_a 45 = \\log_a 3^2 + \\log_a 5 = 2\\log_a 3 + \\log_a 5 = 2p + q$.',
          '(b) $\\dfrac{5}{9} = \\dfrac{5}{3^2}$. The division law gives $\\log_a 5 - \\log_a 3^2 = q - 2p$.',
          '(c) $15a = 3 \\times 5 \\times a$, so $\\log_a 15a = \\log_a 3 + \\log_a 5 + \\log_a a = p + q + 1$, because $\\log_a a = 1$.',
        ],
        answer: '$2p + q$, $q - 2p$, $p + q + 1$',
      },
      {
        id: 'p7',
        prompt: '**7** Let $u = \\lg x$ and $v = \\lg y$. Write $\\lg \\dfrac{100x^3}{\\sqrt{y}}$ in terms of $u$ and $v$.',
        solution: [
          'Split the product and the quotient: $\\lg 100 + \\lg x^3 - \\lg \\sqrt{y}$.',
          'A root is a power: $\\sqrt{y} = y^{1/2}$.',
          'Bring every power down: $\\lg 100 + 3\\lg x - \\dfrac{1}{2}\\lg y$.',
          '$\\lg 100 = 2$, because $10^2 = 100$. So the answer is $2 + 3u - \\dfrac{1}{2}v$.',
        ],
        answer: '$2 + 3u - \\dfrac{v}{2}$',
      },
      {
        id: 'p8',
        type: 'fill_blank',
        prompt: '**8** Given that $\\lg 2 = 0.301$ and $\\lg 3 = 0.477$, correct to 3 decimal places, find these without a calculator.',
        textParts: ['(a) $\\lg 12 = $ ', '.   (b) $\\lg 5 = $ ', '.   (c) $\\lg 1.5 = $ ', '.'],
        blanks: {
          1: { correct: '1.079', width: 6 },
          2: { correct: '0.699', width: 6 },
          3: { correct: '0.176', width: 6 },
        },
        solution: [
          '(a) $12 = 2^2 \\times 3$, so $\\lg 12 = 2\\lg 2 + \\lg 3 = 0.602 + 0.477 = 1.079$.',
          '(b) $5$ is not made of $2$s and $3$s — but $5 = \\dfrac{10}{2}$. So $\\lg 5 = \\lg 10 - \\lg 2 = 1 - 0.301 = 0.699$.',
          '(c) $1.5 = \\dfrac{3}{2}$, so $\\lg 1.5 = \\lg 3 - \\lg 2 = 0.477 - 0.301 = 0.176$.',
          'Before calculators, this is how log tables were used: a few logs, the laws, and every other log follows.',
        ],
        answer: '$1.079$, $0.699$, $0.176$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c9',
        prompt: '**9** Simplify $\\dfrac{\\lg 27}{\\lg 9}$.',
        solution: [
          'This is one log DIVIDED by another, so the division law does not apply — that law is for subtracting logs.',
          'Write both numbers as powers of $3$: $27 = 3^3$ and $9 = 3^2$.',
          'The power law: $\\lg 27 = 3\\lg 3$ and $\\lg 9 = 2\\lg 3$.',
          '$\\dfrac{3\\lg 3}{2\\lg 3} = \\dfrac{3}{2}$, because the $\\lg 3$ cancels like any other common factor.',
        ],
        answer: '$\\dfrac{3}{2}$',
      },
      {
        id: 'c10',
        prompt: '**10** Find $x$, given that $\\lg x = 2\\lg 3 + \\lg 4 - \\lg 6$.',
        solution: [
          'Simplify the right-hand side to a single log. Powers inside first: $2\\lg 3 = \\lg 9$.',
          'Combine: $\\lg 9 + \\lg 4 - \\lg 6 = \\lg \\dfrac{9 \\times 4}{6} = \\lg 6$.',
          'So $\\lg x = \\lg 6$. Two logs to the same base are equal only when the numbers inside are equal.',
          'So $x = 6$.',
        ],
        answer: '$x = 6$',
      },
      {
        id: 'c11',
        prompt: '**11** Work out $2^{\\log_2 7} + \\log_5 125$ without a calculator.',
        solution: [
          '$\\log_2 7$ is the power that $2$ must be raised to, to make $7$ — so raising $2$ to that power makes $7$: $2^{\\log_2 7} = 7$.',
          '$125 = 5^3$, so $\\log_5 125 = 3$.',
          'Add: $7 + 3 = 10$.',
        ],
        answer: '$10$',
      },
      {
        id: 'c12',
        type: 'mcq',
        prompt: '**12** A student writes: $\\log_3 15 \\div \\log_3 5 = \\log_3 3 = 1$. What is wrong?',
        options: [
          { val: 'a', text: 'Nothing — the division law turns $\\log_3 15 \\div \\log_3 5$ into $\\log_3 3$' },
          { val: 'b', text: 'Dividing two logs is not a law. $\\log_3 15 - \\log_3 5 = \\log_3 3 = 1$, but $\\log_3 15 \\div \\log_3 5 \\approx 1.68$' },
          { val: 'c', text: 'It should be $\\log_3 15 \\div \\log_3 5 = \\log_3 10$' },
          { val: 'd', text: '$\\log_3 3$ is $0$, not $1$' },
        ],
        correct: 'b',
        solution: [
          'The division law is $\\log_a x - \\log_a y = \\log_a \\dfrac{x}{y}$ — it is about **subtracting** two logs.',
          'Dividing two logs is a different thing entirely: $\\log_3 15 \\approx 2.465$ and $\\log_3 5 \\approx 1.465$, and $2.465 \\div 1.465 \\approx 1.68$.',
          'So the student has used a law that does not exist. Had the question been $\\log_3 15 - \\log_3 5$, the answer $\\log_3 3 = 1$ would be right.',
          'Option d is also false: $\\log_3 3 = 1$ because $3^1 = 3$.',
        ],
        answer: 'Dividing two logs is not a law',
      },
    ],
  },
];
