// src/data/ADD_MATH/AM_5D/workbook.js
// The "Practice" task for AM_5D: the question types from the three problem
// banks that the three Exp Graph Lab tasks do not stage.
//
//   Move the Curve     carries 5.9 A and B (what a constant does to a family)
//   Sketch the Curve   carries 5.10 A, B and C (the six facts; sketching)
//   Find the Inverse   carries 5.11 A, B and C (inverse and its domain)
//
// What is left, and is set here with a worked solution for every question:
//   Focus      5.9 C (quick crossings and asymptotes), 5.9 D (true or false,
//              an exact crossing), 5.10 D3 (for which a does it cross?)
//   Practice   5.10 D (k and a from the asymptote and a point, for eˣ and
//              for ln), 5.11 C (the range, and f⁻¹f), 5.11 D (composites fg
//              and gf; equations linking a function with an inverse — a log
//              equation, an exponential equation, a hidden quadratic)
//   Challenge  5.11 E (both curves with their asymptotes; a function with no
//              inverse until its domain is cut), and a curve through two points
// Every number is fresh.
//
// English only — ADD_MATH declares `bilingual: false`.
//
// MARKING NOTE. The equivalence engine has no ln or e: it would read "ln 5" as
// the letters l, n times 5. So every answer with a log or a power of e in it
// is an mcq, and typed answers are plain numbers, one box each, in a stated
// order. Fractions in a `correct` field are \dfrac, never \tfrac.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: '**1** The curve $y = 4e^x$ crosses one axis. Write down where, and the equation of its asymptote.',
        textParts: ['It crosses the $y$-axis at $y = $ ', '.   Asymptote: $y = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
          2: { correct: '0', width: 5 },
        },
        solution: [
          'Put $x = 0$: $y = 4e^0 = 4 \\times 1 = 4$. The curve crosses the $y$-axis at $(0, 4)$.',
          'It never crosses the $x$-axis: $4e^x = 0$ would need $e^x = 0$, and a power of $e$ is never $0$.',
          'As $x → −∞$, $4e^x → 0$. Nothing is added, so the asymptote is still $y = 0$: multiplying by $4$ stretches the curve but does not move its asymptote.',
        ],
        answer: '$(0, 4)$; asymptote $y = 0$',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: '**2** The curve $y = \\ln(x - 5)$ crosses one axis. Write down where, and the equation of its asymptote.',
        textParts: ['It crosses the $x$-axis at $x = $ ', '.   Asymptote: $x = $ ', '.'],
        blanks: {
          1: { correct: '6', width: 5 },
          2: { correct: '5', width: 5 },
        },
        solution: [
          'A log is $0$ when its inside is $1$: $x - 5 = 1$, so $x = 6$. The curve crosses the $x$-axis at $(6, 0)$.',
          'The inside must be positive, $x - 5 > 0$, so the curve lives where $x > 5$. The edge of that, $x = 5$, is the asymptote.',
          'It never reaches the $y$-axis: at $x = 0$ the inside is $-5$, and $\\ln(-5)$ does not exist.',
        ],
        answer: '$(6, 0)$; asymptote $x = 5$',
      },
      {
        id: 'f3',
        type: 'mcq',
        prompt: '**3** Which one of these statements is true?',
        options: [
          { val: 'a', text: '$e^x$ equals $0$ when $x$ is a large enough negative number' },
          { val: 'b', text: '$\\ln x$ is negative for every $x$ between $0$ and $1$' },
          { val: 'c', text: 'The curve $y = \\ln x$ crosses the $y$-axis at $(0, 1)$' },
          { val: 'd', text: 'The curves $y = e^x$ and $y = \\ln x$ cross each other on the line $y = x$' },
        ],
        correct: 'b',
        solution: [
          'a is false: $e^x$ gets closer and closer to $0$ as $x → −∞$, but a power of $e$ is always positive, so it never equals $0$.',
          'b is true: $\\ln 1 = 0$ and the curve rises, so to the left of $x = 1$ it is below the axis. For example $\\ln 0.5 \\approx -0.69$.',
          'c is false: $\\ln 0$ does not exist, so the curve never reaches the $y$-axis. It is $e^x$ that passes through $(0, 1)$.',
          'd is false: $e^x$ is always above the line $y = x$ (it is more than $x + 1$), and its mirror image $\\ln x$ is always below the line. One curve is on each side of $y = x$, so they never meet at all.',
        ],
        answer: 'b: $\\ln x < 0$ for $0 < x < 1$',
      },
      {
        id: 'f4',
        type: 'mcq',
        prompt: '**4** Find the exact coordinates of the point where the curve $y = e^x - 5$ crosses the $x$-axis.',
        options: [
          { val: 'a', text: '$(\\ln 5, 0)$' },
          { val: 'b', text: '$(5, 0)$' },
          { val: 'c', text: '$(e^5, 0)$' },
          { val: 'd', text: '$(0, -4)$' },
        ],
        correct: 'a',
        solution: [
          'On the $x$-axis, $y = 0$: $e^x - 5 = 0$, so $e^x = 5$.',
          'Take ln of both sides: $x = \\ln 5$. The point is $(\\ln 5, 0)$, about $(1.61, 0)$.',
          'Option b stops at $e^x = 5$ and forgets that $x$ is the power. Option c undoes the $e$ the wrong way. Option d is where the curve crosses the $y$-axis, not the $x$-axis.',
        ],
        answer: '$(\\ln 5, 0)$',
      },
      {
        id: 'f5',
        type: 'mcq',
        prompt: '**5** For which values of the constant $a$ does the curve $y = 3e^x + a$ cross the $x$-axis?',
        options: [
          { val: 'a', text: '$a < 0$' },
          { val: 'b', text: '$a > 0$' },
          { val: 'c', text: '$a < -3$' },
          { val: 'd', text: 'Every value of $a$' },
        ],
        correct: 'a',
        solution: [
          'Put $y = 0$: $3e^x = -a$, so $e^x = -\\dfrac{a}{3}$.',
          'A power of $e$ can be any POSITIVE number, so there is a solution exactly when $-\\dfrac{a}{3} > 0$, which is when $a < 0$.',
          'In pictures: the curve lives above its asymptote $y = a$. If the asymptote is below the $x$-axis, the curve climbs through the axis; if it is on or above the axis, the curve never gets down to it.',
          'Option c confuses this with the $y$-intercept $3 + a$ being negative. The curve still crosses when $a = -1$, say: $e^x = \\dfrac{1}{3}$ gives $x = -\\ln 3$.',
        ],
        answer: '$a < 0$',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1',
        type: 'fill_blank',
        prompt: '**6** A curve has equation $y = ke^x + a$. Its asymptote is $y = -1$, and it passes through the point $(0, 4)$. Find $a$ and $k$.',
        textParts: ['$a = $ ', ',   $k = $ ', '.'],
        blanks: {
          1: { correct: '-1', width: 5 },
          2: { correct: '5', width: 5 },
        },
        solution: [
          'As $x → −∞$, $ke^x → 0$, so the asymptote is $y = a$. So $a = -1$.',
          'At $x = 0$: $y = ke^0 + a = k + a$. The curve passes through $(0, 4)$, so $k - 1 = 4$.',
          'So $k = 5$, and the curve is $y = 5e^x - 1$.',
        ],
        answer: '$a = -1$, $k = 5$',
      },
      {
        id: 'p2',
        type: 'fill_blank',
        prompt: '**7** A curve has equation $y = k\\ln(x + b)$. Its asymptote is $x = -3$, and it passes through the point $(-1, 4\\ln 2)$. Find $b$ and $k$.',
        textParts: ['$b = $ ', ',   $k = $ ', '.'],
        blanks: {
          1: { correct: '3', width: 5 },
          2: { correct: '4', width: 5 },
        },
        solution: [
          'The asymptote is where the inside of the log is $0$: $x + b = 0$ at $x = -3$, so $b = 3$.',
          'Now put in the point: at $x = -1$, $y = k\\ln(-1 + 3) = k\\ln 2$.',
          'This must equal $4\\ln 2$, so $k = 4$. The curve is $y = 4\\ln(x + 3)$.',
        ],
        answer: '$b = 3$, $k = 4$',
      },
      {
        id: 'p3',
        type: 'fill_blank',
        prompt: '**8** The function $f$ is defined by $f(x) = 2e^x + 3$ for all real $x$. State the range of $f$, and find the value of $f^{-1}f(5)$ without a calculator.',
        textParts: ['The range of $f$ is $f(x) > $ ', '.   $f^{-1}f(5) = $ ', '.'],
        blanks: {
          1: { correct: '3', width: 5 },
          2: { correct: '5', width: 5 },
        },
        solution: [
          '$2e^x$ is always positive, so $f(x) = 2e^x + 3$ is always more than $3$. As $x → −∞$ it gets as close to $3$ as you like, and it grows without limit. The range is $f(x) > 3$.',
          '$f^{-1}f(5)$ means: apply $f$ to $5$, then apply the inverse. The inverse undoes $f$, so it takes you straight back to $5$.',
          'You do not need the formula for the inverse at all. (It is $\\ln\\left(\\dfrac{x - 3}{2}\\right)$, and $\\ln\\left(\\dfrac{2e^5 + 3 - 3}{2}\\right) = \\ln e^5 = 5$.)',
        ],
        answer: 'Range $f(x) > 3$; $f^{-1}f(5) = 5$',
      },
      {
        id: 'p4',
        type: 'mcq',
        prompt: '**9** The functions $f$ and $g$ are defined by $f(x) = e^x$ for all real $x$, and $g(x) = \\ln 5x$ for $x > 0$. Which pair is right?',
        options: [
          { val: 'a', text: '$fg(x) = x + \\ln 5$ and $gf(x) = 5x$' },
          { val: 'b', text: '$fg(x) = 5x$ and $gf(x) = 5x$' },
          { val: 'c', text: '$fg(x) = 5x$ and $gf(x) = x + \\ln 5$' },
          { val: 'd', text: '$fg(x) = e^{5x}$ and $gf(x) = \\ln 5 + \\ln x$' },
        ],
        correct: 'c',
        solution: [
          '$fg(x)$: apply $g$ first, then $f$. $fg(x) = f(\\ln 5x) = e^{\\ln 5x} = 5x$, because $e$ and $\\ln$ undo each other.',
          '$gf(x)$: apply $f$ first, then $g$. $gf(x) = g(e^x) = \\ln(5e^x)$.',
          'Use the multiplication law: $\\ln(5e^x) = \\ln 5 + \\ln e^x = \\ln 5 + x$.',
          'Option a has the two composites the wrong way round. In option b, $\\ln(5e^x)$ has been treated as if the ln undid the $5$ as well. Option d puts $5x$ into $f$ instead of $\\ln 5x$.',
        ],
        answer: '$fg(x) = 5x$, $gf(x) = x + \\ln 5$',
      },
      {
        id: 'p5',
        type: 'fill_blank',
        prompt: '**10** The functions $f$ and $g$ are defined by $f(x) = e^x$ for all real $x$, and $g(x) = \\ln 4x$ for $x > 0$. Solve the equation $g(x) = 2f^{-1}(x)$.',
        textParts: ['$x = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
        },
        solution: [
          'The inverse of $f(x) = e^x$ is $f^{-1}(x) = \\ln x$, for $x > 0$.',
          'So the equation is $\\ln 4x = 2\\ln x$. By the power law, $2\\ln x = \\ln x^2$.',
          'Two logs are equal when their insides are equal: $4x = x^2$, so $x^2 - 4x = 0$ and $x(x - 4) = 0$.',
          '$x = 0$ is rejected: neither $\\ln 4x$ nor $\\ln x$ exists there. So $x = 4$. Check: $\\ln 16 = 2\\ln 4$.',
        ],
        answer: '$x = 4$',
      },
      {
        id: 'p6',
        type: 'mcq',
        prompt: '**11** The functions $f$ and $g$ are defined by $f(x) = e^{2x}$ for all real $x$, and $g(x) = \\ln x$ for $x > 0$. Solve the equation $f(x) = 5g^{-1}(x)$.',
        options: [
          { val: 'a', text: '$x = 5$' },
          { val: 'b', text: '$x = \\ln 5$' },
          { val: 'c', text: '$x = \\tfrac{1}{2}\\ln 5$' },
          { val: 'd', text: '$x = \\ln 5$ or $x = 0$' },
        ],
        correct: 'b',
        solution: [
          'The inverse of $g(x) = \\ln x$ is $g^{-1}(x) = e^x$, for every real $x$.',
          'So the equation is $e^{2x} = 5e^x$. Divide both sides by $e^x$, which is never $0$: $e^x = 5$.',
          'Take ln: $x = \\ln 5$.',
          'Option a stops at $e^x = 5$. Option c halves the answer as if the equation were $e^{2x} = 5$. Option d comes from treating $e^x = 0$ as possible when dividing: it never is.',
        ],
        answer: '$x = \\ln 5$',
      },
      {
        id: 'p7',
        type: 'mcq',
        prompt: '**12** The functions $f$ and $g$ are defined by $f(x) = e^{2x}$ for all real $x$, and $g(x) = \\ln(x - 2)$ for $x > 2$. Solve the equation $f(x) = g^{-1}(x)$.',
        options: [
          { val: 'a', text: '$x = 2$' },
          { val: 'b', text: '$x = \\ln 2$ or $x = \\ln(-1)$' },
          { val: 'c', text: '$x = \\ln 2$ or $x = 0$' },
          { val: 'd', text: '$x = \\ln 2$' },
        ],
        correct: 'd',
        solution: [
          'Find the inverse of $g$: swap, $x = \\ln(y - 2)$; powers of $e$, $e^x = y - 2$; so $g^{-1}(x) = e^x + 2$.',
          'The equation is $e^{2x} = e^x + 2$. Let $u = e^x$, so $e^{2x} = u^2$: $u^2 - u - 2 = 0$.',
          'Factorise: $(u - 2)(u + 1) = 0$, so $u = 2$ or $u = -1$.',
          '$e^x = -1$ is impossible, because a power of $e$ is always positive, so reject it. $e^x = 2$ gives $x = \\ln 2$.',
          'Option a stops at $e^x = 2$. Option b keeps the root that must be rejected: $\\ln(-1)$ does not exist. Option c turns $u = -1$ into $x = 0$ by mistake.',
        ],
        answer: '$x = \\ln 2$',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1',
        type: 'fill_blank',
        prompt: '**13** The function $f$ is defined by $f(x) = 3e^x - 2$ for all real $x$. Find $f^{-1}(x)$. Then give the asymptote of the curve $y = f(x)$, the asymptote of the curve $y = f^{-1}(x)$, and the value of $f^{-1}(1)$.',
        textParts: ['Asymptote of $y = f(x)$: $y = $ ', '.   Asymptote of $y = f^{-1}(x)$: $x = $ ', '.   $f^{-1}(1) = $ ', '.'],
        blanks: {
          1: { correct: '-2', width: 5 },
          2: { correct: '-2', width: 5 },
          3: { correct: '0', width: 5 },
        },
        solution: [
          'Swap: $x = 3e^y - 2$. Add $2$ and divide by $3$: $\\dfrac{x + 2}{3} = e^y$. Take ln: $f^{-1}(x) = \\ln\\left(\\dfrac{x + 2}{3}\\right)$, for $x > -2$.',
          'As $x → −∞$, $3e^x → 0$, so the curve $y = f(x)$ has asymptote $y = -2$.',
          'The graph of the inverse is the reflection in $y = x$, so the horizontal asymptote $y = -2$ becomes the vertical asymptote $x = -2$. It is the edge of the domain $x > -2$.',
          '$f^{-1}(1) = \\ln\\left(\\dfrac{1 + 2}{3}\\right) = \\ln 1 = 0$. That fits: $f(0) = 3 - 2 = 1$, so the inverse takes $1$ back to $0$.',
          'To sketch both: $y = f(x)$ through $(0, 1)$ and $(\\ln\\tfrac{2}{3}, 0)$, above $y = -2$; its mirror image in $y = x$ through $(1, 0)$ and $(0, \\ln\\tfrac{2}{3})$, to the right of $x = -2$.',
        ],
        answer: '$f^{-1}(x) = \\ln\\left(\\dfrac{x + 2}{3}\\right)$; asymptotes $y = -2$ and $x = -2$; $f^{-1}(1) = 0$',
      },
      {
        id: 'c2',
        type: 'mcq',
        prompt: '**14** The function $h(x) = e^{x^2}$, for all real $x$, has no inverse, because $h(-2) = h(2)$: it is not one-one. If its domain is cut down to $x \\geq 0$, it does have one. What is it, and what is its domain?',
        options: [
          { val: 'a', text: '$h^{-1}(x) = \\ln \\sqrt{x}$, for $x > 0$' },
          { val: 'b', text: '$h^{-1}(x) = \\sqrt{\\ln x}$, for $x > 0$' },
          { val: 'c', text: '$h^{-1}(x) = (\\ln x)^2$, for $x \\geq 1$' },
          { val: 'd', text: '$h^{-1}(x) = \\sqrt{\\ln x}$, for $x \\geq 1$' },
        ],
        correct: 'd',
        solution: [
          'Swap: $x = e^{y^2}$. Take ln: $\\ln x = y^2$. With $y \\geq 0$, take the positive square root: $y = \\sqrt{\\ln x}$.',
          'For the domain, find the range of $h$ on $x \\geq 0$: the power $x^2$ is at least $0$, so $h(x) \\geq e^0 = 1$. The domain of the inverse is $x \\geq 1$.',
          'That matches the formula: $\\sqrt{\\ln x}$ needs $\\ln x \\geq 0$, which is $x \\geq 1$.',
          'Option a takes the root in the wrong place. Option b gives $x > 0$, but for $0 < x < 1$, $\\ln x$ is negative and has no square root. Option c squares instead of taking the root.',
        ],
        answer: '$h^{-1}(x) = \\sqrt{\\ln x}$ for $x \\geq 1$',
      },
      {
        id: 'c3',
        type: 'fill_blank',
        prompt: '**15** The curve $y = ae^x + b$ passes through the points $(0, 7)$ and $(\\ln 2, 11)$. Find $a$ and $b$, and the equation of the asymptote.',
        textParts: ['$a = $ ', ',   $b = $ ', '.   Asymptote: $y = $ ', '.'],
        blanks: {
          1: { correct: '4', width: 5 },
          2: { correct: '3', width: 5 },
          3: { correct: '3', width: 5 },
        },
        solution: [
          'At $(0, 7)$: $ae^0 + b = 7$, so $a + b = 7$.',
          'At $(\\ln 2, 11)$: $ae^{\\ln 2} + b = 11$. Since $e^{\\ln 2} = 2$, this is $2a + b = 11$.',
          'Subtract the first equation from the second: $a = 4$. Then $b = 7 - 4 = 3$.',
          'The curve is $y = 4e^x + 3$, and as $x → −∞$ it settles towards $y = 3$: that is the asymptote.',
        ],
        answer: '$a = 4$, $b = 3$; asymptote $y = 3$',
      },
    ],
  },
];
