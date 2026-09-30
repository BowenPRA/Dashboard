// src/data/ADD_MATH/AM_5B/workbook.js
// The "Practice" task for AM_5B: the question types from the problem banks
// (docs/add-math-5-5-…, 5-7-…, 5-8-…) that the three Exp Lab tasks do not
// stage.
//
//   Undo It           carries 5.7 types C and D
//   Take Logs         carries 5.5 type A and 5.7 types E, F, G (and I1)
//   Hidden Quadratic  carries 5.5 types B, C, D, E and 5.7 types I and J
//
// What is left, and is set here with a worked solution for every question:
//   Focus      5.7 A and B (the calculator), 5.8 A (growth by a power),
//              5.8 D (decay to a fraction), 5.7 H (the log laws first)
//   Practice   5.8's worked-example model (an exponential plus a constant),
//              5.8 B (dated by year), C (find the constant), E (find the
//              rate, then the doubling time), F (two data points), 5.7 K
//              (simultaneous equations)
//   Challenge  5.7 L (a log of an exponential), M and N (factorise, never
//              divide), 5.5 F (mixed bases), G (a modulus equation) and H (a
//              modulus inequality, in exact form)
// Every number is fresh: none is a book item, and none repeats a task item, a
// deck example or a quiz question.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. Several values in one answer are fill_blank, one box each, in
// a stated order, because the equivalence engine marks one value at a time.
// A typed value is compared exactly, so every 3 s.f. answer is stated "to 3
// significant figures" in the prompt, and a year is asked for as a year. An
// answer with ln or e in it is an mcq: the typed-answer engine reads e and ln
// as letters. Fractions in a `correct` field are \dfrac, never \tfrac.
export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** Use your calculator to find each value, correct to 3 significant figures.',
        textParts: ['(a) $e^{2.5} = $ ', '.   (b) $e^{-0.4} = $ ', '.   (c) $\\ln 20 = $ ', '.   (d) $\\ln 0.3 = $ ', '.'],
        blanks: {
          1: { correct: '12.2', width: 6 },
          2: { correct: '0.670', width: 6 },
          3: { correct: '3.00', width: 6 },
          4: { correct: '-1.20', width: 6 },
        },
        solution: [
          '(a) Use the $e^x$ key: $e^{2.5} = 12.182\\ldots = 12.2$.',
          '(b) $e^{-0.4} = 0.67032\\ldots = 0.670$. A negative power of $e$ is between $0$ and $1$, never negative.',
          '(c) Use the $\\ln$ key: $\\ln 20 = 2.9957\\ldots$, which is $3.00$ to 3 significant figures. The zeros are significant, so write them.',
          '(d) $\\ln 0.3 = -1.2039\\ldots = -1.20$. The ln of a number between $0$ and $1$ is negative, because $e$ must be raised to a negative power to make it.',
        ],
        answer: '$12.2$, $0.670$, $3.00$, $-1.20$',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: '**2** A culture starts with $400$ bacteria. After $t$ hours there are $N = 400 \\times 2^t$. Find the number after $3$ hours, and the time, to 3 significant figures, at which the number first passes $50\\,000$.',
        textParts: ['After 3 hours: $N = $ ', '.   It passes $50\\,000$ when $t = $ ', ' hours.'],
        blanks: {
          1: { correct: '3200', width: 7 },
          2: { correct: '6.97', width: 6 },
        },
        solution: [
          'Put $t = 3$: $N = 400 \\times 2^3 = 400 \\times 8 = 3200$.',
          'For $50\\,000$: $400 \\times 2^t = 50\\,000$, so $2^t = 125$.',
          'Take logs: $t \\lg 2 = \\lg 125$, so $t = \\dfrac{\\lg 125}{\\lg 2} = 6.97$ hours.',
          'Sense check: $2^6 = 64$ and $2^7 = 128$, and $125$ is just below $128$, so $t$ is just below $7$.',
        ],
        answer: '$3200$; $t = 6.97$ hours',
      },
      {
        id: 'f3',
        type: 'fill_blank',
        prompt: '**3** The amount of a medicine in a patient\'s blood, $C$ mg, $t$ hours after an injection is $C = 50e^{-0.2t}$. Find the amount injected, the amount after $3$ hours, and how long it takes to fall to one fifth of the amount injected. Give the last two to 3 significant figures.',
        textParts: ['Injected: ', ' mg.   After 3 hours: ', ' mg.   One fifth after ', ' hours.'],
        blanks: {
          1: { correct: '50', width: 5 },
          2: { correct: '27.4', width: 6 },
          3: { correct: '8.05', width: 6 },
        },
        solution: [
          'The amount injected is the value when $t = 0$: $C = 50e^0 = 50 \\times 1 = 50$ mg.',
          'After $3$ hours: $C = 50e^{-0.6} = 50 \\times 0.5488 = 27.4$ mg.',
          'One fifth of $50$ is $10$: $50e^{-0.2t} = 10$, so $e^{-0.2t} = 0.2$.',
          'Take ln: $-0.2t = \\ln 0.2$, so $t = \\dfrac{\\ln 0.2}{-0.2} = \\dfrac{\\ln 5}{0.2} = 8.05$ hours.',
          'The time to fall to a fifth does not depend on the $50$: it cancels. Try it with any starting amount.',
        ],
        answer: '$50$ mg; $27.4$ mg; $8.05$ hours',
      },
      {
        id: 'f4',
        type: 'fill_blank',
        prompt: '**4** Use the laws of logarithms first. Solve each equation, giving $x$ to 3 significant figures. (a) $\\ln x^3 - \\ln x = 8$   (b) $e^{3x - 1} = 4e^{x + 2}$',
        textParts: ['(a) $x = $ ', '.   (b) $x = $ ', '.'],
        blanks: {
          1: { correct: '54.6', width: 6 },
          2: { correct: '2.19', width: 6 },
        },
        solution: [
          '(a) The division law: $\\ln x^3 - \\ln x = \\ln \\dfrac{x^3}{x} = \\ln x^2 = 2\\ln x$.',
          'So $2\\ln x = 8$, $\\ln x = 4$, and $x = e^4 = 54.6$. (A negative $x$ is impossible here: $\\ln x$ needs $x > 0$.)',
          '(b) Take ln of both sides. The right-hand side is a product, so it splits: $\\ln\\left(4e^{x + 2}\\right) = \\ln 4 + x + 2$.',
          'So $3x - 1 = \\ln 4 + x + 2$, which gives $2x = \\ln 4 + 3$.',
          '$x = \\dfrac{\\ln 4 + 3}{2} = 2.19$.',
        ],
        answer: '(a) $x = 54.6$   (b) $x = 2.19$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: '**5** A metal bar is taken out of a furnace. Its temperature, $T$ degrees, $t$ minutes later is $T = 480e^{-0.1t} + 25$. Find the temperature when it comes out, the temperature after $12$ minutes, the time taken to cool to $100$ degrees, and the temperature it approaches as time goes on. Give the second and third answers to 3 significant figures.',
        textParts: ['At the start: ', '.   After 12 minutes: ', '.   Down to 100 after ', ' minutes.   It approaches ', ' degrees.'],
        blanks: {
          1: { correct: '505', width: 5 },
          2: { correct: '170', width: 5 },
          3: { correct: '18.6', width: 6 },
          4: { correct: '25', width: 5 },
        },
        solution: [
          'At the start $t = 0$ and $e^0 = 1$: $T = 480 + 25 = 505$ degrees.',
          'After $12$ minutes: $T = 480e^{-1.2} + 25 = 480 \\times 0.30119 + 25 = 144.6 + 25 = 170$ degrees.',
          'For $100$: $480e^{-0.1t} + 25 = 100$, so $480e^{-0.1t} = 75$ and $e^{-0.1t} = 0.15625$. Get the power on its own FIRST — never take ln of a sum.',
          'Take ln: $-0.1t = \\ln 0.15625$, so $t = \\dfrac{\\ln 0.15625}{-0.1} = 18.6$ minutes.',
          'As $t$ grows, $e^{-0.1t}$ shrinks towards $0$, so $T$ approaches $25$ degrees: the temperature of the room the bar cools in.',
        ],
        answer: '$505$; $170$; $18.6$ minutes; $25$ degrees',
      },
      {
        id: 'p2',
        type: 'fill_blank',
        prompt: '**6** At the start of 2024 a town had $60\\,000$ people. $n$ years later its population is $P = 60\\,000e^{-0.015n}$. Estimate the population at the start of 2034, to 3 significant figures, and the year in which it first falls below $45\\,000$.',
        textParts: ['Start of 2034: ', '.   It first falls below $45\\,000$ during the year ', '.'],
        blanks: {
          1: { correct: '51600', width: 7, accept: ['51640', '51642', '51643'] },
          2: { correct: '2043', width: 6 },
        },
        solution: [
          'The start of 2034 is $10$ years on, so $n = 10$: $P = 60\\,000e^{-0.15} = 60\\,000 \\times 0.86071 = 51\\,642$, which is $51\\,600$ to 3 significant figures.',
          'For $45\\,000$: $60\\,000e^{-0.015n} = 45\\,000$, so $e^{-0.015n} = 0.75$.',
          'Take ln: $-0.015n = \\ln 0.75$, so $n = \\dfrac{\\ln 0.75}{-0.015} = 19.18$.',
          '$19.18$ years after the start of 2024 is a little way into 2043, so the population first falls below $45\\,000$ during 2043.',
          'Read a "which year" answer carefully: $n = 19$ is the START of 2043, and the population has not quite reached $45\\,000$ by then.',
        ],
        answer: '$51\\,600$; during 2043',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**7** A car is worth $V$ dollars $t$ years after it was bought, where $V = 9000e^{-kt}$. After $5$ years it is worth $6000$ dollars. Find $k$, and the value of the car after $12$ years. Give both to 3 significant figures.',
        textParts: ['$k = $ ', '.   After 12 years: ', ' dollars.'],
        blanks: {
          1: { correct: '0.0811', width: 7 },
          2: { correct: '3400', width: 6 },
        },
        solution: [
          'Put in the known pair: $6000 = 9000e^{-5k}$, so $e^{-5k} = \\dfrac{2}{3}$.',
          'Take ln: $-5k = \\ln \\dfrac{2}{3}$, so $k = \\dfrac{\\ln 1.5}{5} = 0.081093\\ldots = 0.0811$.',
          'Keep the full value of $k$ for the next part: $V = 9000e^{-12 \\times 0.081093} = 9000e^{-0.97312} = 9000 \\times 0.37791 = 3401$.',
          'To 3 significant figures, $3400$ dollars. (Using $k = 0.0811$ gives $3400.5$ — close, but round only at the end.)',
        ],
        answer: '$k = 0.0811$; $3400$ dollars',
      },
      {
        id: 'p4',
        type: 'fill_blank',
        prompt: '**8** A painting is worth $V = 8000e^{an}$ dollars $n$ years after it was bought. After $4$ years it is worth $10\\,000$ dollars. Find the price paid, the value of $a$ to 3 significant figures, and the number of years, to 3 significant figures, for the painting to double in value.',
        textParts: ['Price paid: ', ' dollars.   $a = $ ', '.   It doubles after ', ' years.'],
        blanks: {
          1: { correct: '8000', width: 6 },
          2: { correct: '0.0558', width: 7 },
          3: { correct: '12.4', width: 6 },
        },
        solution: [
          'The price paid is the value when $n = 0$: $V = 8000e^0 = 8000$ dollars.',
          'Put in the known pair: $10\\,000 = 8000e^{4a}$, so $e^{4a} = 1.25$ and $4a = \\ln 1.25$.',
          '$a = \\dfrac{\\ln 1.25}{4} = 0.055786\\ldots = 0.0558$.',
          'Doubling means $V = 16\\,000$: $e^{an} = 2$, so $an = \\ln 2$ and $n = \\dfrac{\\ln 2}{0.055786} = 12.4$ years.',
          'The doubling time is the same whatever the starting value: the $8000$ cancelled before $n$ was found.',
        ],
        answer: '$8000$ dollars; $a = 0.0558$; $12.4$ years',
      },
      {
        id: 'p5',
        type: 'fill_blank',
        prompt: '**9** The area, $A$ square metres, of a patch of moss $n$ weeks after measuring began is $A = A_0 b^n$. After $2$ weeks the area is $20$, and after $5$ weeks it is $160$. Find $b$, find $A_0$, and find, to 3 significant figures, when the area first passes $1000$ square metres.',
        textParts: ['$b = $ ', '.   $A_0 = $ ', '.   It passes 1000 after ', ' weeks.'],
        blanks: {
          1: { correct: '2', width: 5 },
          2: { correct: '5', width: 5 },
          3: { correct: '7.64', width: 6 },
        },
        solution: [
          'Write both facts: $A_0 b^2 = 20$ and $A_0 b^5 = 160$.',
          'Divide the second by the first: $A_0$ cancels, and $b^3 = 8$, so $b = 2$.',
          'Then $A_0 \\times 2^2 = 20$, so $A_0 = 5$: the area of the patch, in square metres, when measuring began.',
          'For $1000$: $5 \\times 2^n = 1000$, so $2^n = 200$ and $n = \\dfrac{\\lg 200}{\\lg 2} = 7.64$ weeks.',
        ],
        answer: '$b = 2$; $A_0 = 5$; $7.64$ weeks',
      },
      {
        id: 'p6',
        type: 'mcq',
        prompt: '**10** Solve the simultaneous equations $\\ln x = 2\\ln y$ and $\\ln x + \\ln y = 9$.',
        options: [
          { val: 'a', text: '$x = 6$, $y = 3$' },
          { val: 'b', text: '$x = e^6$, $y = e^3$' },
          { val: 'c', text: '$x = e^3$, $y = e^6$' },
          { val: 'd', text: '$x = e^{4.5}$, $y = e^{4.5}$' },
        ],
        correct: 'b',
        solution: [
          'Treat $\\ln x$ and $\\ln y$ as the unknowns. Put the first equation into the second: $2\\ln y + \\ln y = 9$.',
          'So $3\\ln y = 9$ and $\\ln y = 3$, which gives $y = e^3$.',
          'Then $\\ln x = 2\\ln y = 6$, so $x = e^6$.',
          'Option a finds the logs but forgets to undo them; c swaps $x$ and $y$; d splits the $9$ equally, as if $x = y$.',
        ],
        answer: '$x = e^6$, $y = e^3$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        prompt: '**11** Solve $2\\ln\\left(7 - e^{3x}\\right) = 3$, giving $x$ to 3 significant figures.',
        solution: [
          'Get the log on its own: $\\ln\\left(7 - e^{3x}\\right) = 1.5$.',
          'Undo the ln: $7 - e^{3x} = e^{1.5} = 4.4817$.',
          'So $e^{3x} = 7 - 4.4817 = 2.5183$.',
          'Take ln: $3x = \\ln 2.5183 = 0.92359$, so $x = 0.308$.',
          'Check it exists: $7 - e^{3x} = 4.48$ is positive, so the log is defined.',
        ],
        answer: '$x = 0.308$',
      },
      {
        id: 'c2',
        type: 'fill_blank',
        prompt: '**12** Solve $xe^{3x} = e^5x$. Give both answers exactly, the smaller first.',
        textParts: ['Smaller: $x = $ ', '.   Larger: $x = $ ', '.'],
        blanks: {
          1: { correct: '0', width: 5 },
          2: { correct: '$\\dfrac{5}{3}$', width: 6 },
        },
        solution: [
          'Do NOT divide both sides by $x$: that throws away the answer $x = 0$.',
          'Move everything to one side and factorise: $xe^{3x} - e^5x = x\\left(e^{3x} - e^5\\right) = 0$.',
          'Either $x = 0$, or $e^{3x} = e^5$, which gives $3x = 5$ and $x = \\dfrac{5}{3}$.',
          'Check $x = 0$: both sides are $0$. It is a genuine solution.',
        ],
        answer: '$x = 0$ or $x = \\dfrac{5}{3}$',
      },
      {
        id: 'c3',
        type: 'mcq',
        prompt: '**13** Solve $2x^2 - x^2e^x + 9e^x = 18$, giving exact answers.',
        options: [
          { val: 'a', text: '$x = 3$ or $x = \\ln 2$' },
          { val: 'b', text: '$x = 3$ or $x = -3$ only' },
          { val: 'c', text: '$x = 3$, $x = -3$ or $x = \\ln 2$' },
          { val: 'd', text: '$x = \\ln 2$ only' },
        ],
        correct: 'c',
        solution: [
          'Move the $18$ across and group the four terms in pairs: $2x^2 - x^2e^x + 9e^x - 18 = x^2\\left(2 - e^x\\right) - 9\\left(2 - e^x\\right)$.',
          'So $\\left(x^2 - 9\\right)\\left(2 - e^x\\right) = 0$.',
          'Either $x^2 = 9$, giving $x = 3$ or $x = -3$; or $e^x = 2$, giving $x = \\ln 2$.',
          'Option a loses the negative square root; b divides by $2 - e^x$ and loses $x = \\ln 2$; d divides by $x^2 - 9$ and loses both.',
        ],
        answer: '$x = 3$, $x = -3$ or $x = \\ln 2$',
      },
      {
        id: 'c4',
        type: 'fill_blank',
        prompt: '**14** Show that $2^{3x + 1} \\times 5^{x + 2} = 4^x \\times 5^{2x}$ can be written as $\\left(\\dfrac{5}{2}\\right)^x = k$. Find $k$, then find $x$ to 3 significant figures.',
        textParts: ['$k = $ ', '.   $x = $ ', '.'],
        blanks: {
          1: { correct: '50', width: 5 },
          2: { correct: '4.27', width: 6 },
        },
        solution: [
          'Split off the numbers: $2^{3x + 1} = 2 \\times 8^x$ and $5^{x + 2} = 25 \\times 5^x$, so the left-hand side is $50 \\times 40^x$.',
          'The right-hand side is $4^x \\times 25^x = 100^x$.',
          'So $50 \\times 40^x = 100^x$, and dividing by $40^x$: $\\left(\\dfrac{100}{40}\\right)^x = 50$, which is $\\left(\\dfrac{5}{2}\\right)^x = 50$. So $k = 50$.',
          'Take logs: $x \\lg 2.5 = \\lg 50$, so $x = \\dfrac{\\lg 50}{\\lg 2.5} = 4.27$.',
        ],
        answer: '$k = 50$; $x = 4.27$',
      },
      {
        id: 'c5',
        prompt: '**15** Solve $\\left|2^x - 10\\right| = \\left|2^x + 4\\right|$, giving $x$ to 3 significant figures.',
        solution: [
          'Two moduli are equal when the insides are equal or opposite.',
          'Equal: $2^x - 10 = 2^x + 4$ gives $-10 = 4$, which is impossible.',
          'Opposite: $2^x - 10 = -\\left(2^x + 4\\right)$, so $2 \\times 2^x = 6$ and $2^x = 3$.',
          'Take logs: $x = \\dfrac{\\lg 3}{\\lg 2} = 1.58$.',
          'Check: $2^x = 3$ gives $|3 - 10| = 7$ and $|3 + 4| = 7$. They agree.',
        ],
        answer: '$x = 1.58$',
      },
      {
        id: 'c6',
        type: 'mcq',
        prompt: '**16** Solve the inequality $\\left|3^{x + 1} - 4\\right| < \\left|3^x + 4\\right|$, giving your answer in exact form.',
        options: [
          { val: 'a', text: '$x < \\dfrac{\\lg 4}{\\lg 3}$' },
          { val: 'b', text: '$x > \\dfrac{\\lg 4}{\\lg 3}$' },
          { val: 'c', text: '$0 < x < \\dfrac{\\lg 4}{\\lg 3}$' },
          { val: 'd', text: 'All values of $x$' },
        ],
        correct: 'a',
        solution: [
          'Let $y = 3^x$, which is always positive. Then $3^{x + 1} = 3y$, and $3^x + 4 = y + 4$ is positive, so its modulus is just $y + 4$.',
          'The inequality is $|3y - 4| < y + 4$, which means $-(y + 4) < 3y - 4 < y + 4$.',
          'Left part: $-y - 4 < 3y - 4$ gives $0 < 4y$, so $y > 0$ — always true for a power.',
          'Right part: $3y - 4 < y + 4$ gives $2y < 8$, so $y < 4$: $3^x < 4$.',
          'Take logs: $x < \\dfrac{\\lg 4}{\\lg 3}$. Option c adds a lower limit that is not there: $3^x$ is positive for every $x$, including negative $x$.',
        ],
        answer: '$x < \\dfrac{\\lg 4}{\\lg 3}$',
      },
      // The two bank shapes whose roots are irrational (5.7 I and J with a surd
      // in the answer), which the Hidden Quadratic engine cannot stage because
      // it only takes rational roots. Added at integration.
      {
        id: 'c7',
        type: 'fill_blank',
        prompt: '**17** Solve $e^x + 3e^{-x} = 5$, giving your answers correct to 3 significant figures.',
        textParts: ['Smaller: $x = $ ', '.   Larger: $x = $ ', '.'],
        blanks: {
          1: { correct: '-0.361', width: 7 },
          2: { correct: '1.46', width: 7 },
        },
        solution: [
          'Multiply every term by $e^x$, which is never zero: $e^{2x} + 3 = 5e^x$, so $e^{2x} - 5e^x + 3 = 0$.',
          'Let $y = e^x$: $y^2 - 5y + 3 = 0$. It does not factorise, so use the formula: $y = \\dfrac{5 \\pm \\sqrt{25 - 12}}{2} = \\dfrac{5 \\pm \\sqrt{13}}{2}$.',
          'Keep or reject: $\\dfrac{5 + \\sqrt{13}}{2} \\approx 4.30$ and $\\dfrac{5 - \\sqrt{13}}{2} \\approx 0.697$. Both are positive, so both are possible values of $e^x$.',
          'Take ln of each: $x = \\ln 0.697\\ldots = -0.361$ and $x = \\ln 4.30\\ldots = 1.46$.',
          'Keep the surd form until the very last step. Rounding $y$ to $0.7$ first gives $x = -0.357$, which is wrong at 3 s.f.',
        ],
        answer: '$x = -0.361$ or $x = 1.46$',
      },
      {
        id: 'c8',
        type: 'mcq',
        prompt: '**18** Solve $e^x = 7e^{-x}$, giving your answer in exact form.',
        options: [
          { val: 'a', text: '$x = \\ln 7$' },
          { val: 'b', text: '$x = 2\\ln 7$' },
          { val: 'c', text: '$x = \\dfrac{1}{2}\\ln 7$' },
          { val: 'd', text: 'There is no solution' },
        ],
        correct: 'c',
        solution: [
          'Multiply both sides by $e^x$: $e^{2x} = 7$.',
          'Take ln: $2x = \\ln 7$, so $x = \\dfrac{1}{2}\\ln 7$.',
          'Here the substitution $y = e^x$ gives $y^2 = 7$, so $y = \\pm\\sqrt{7}$. Reject $-\\sqrt{7}$, because $e^x$ is never negative; $y = \\sqrt{7}$ gives the same answer, since $\\ln \\sqrt{7} = \\dfrac{1}{2}\\ln 7$.',
          'Option a forgets that the left side became $e^{2x}$; option b multiplies by 2 instead of dividing.',
        ],
        answer: '$x = \\dfrac{1}{2}\\ln 7$',
      },
    ],
  },
];
