// src/data/AMC8/PT_01/test.js
// Practice Test 1 — the 25 problems of the 2024 AMC 8, for the Practice Test
// task (src/tasks/AmcTest.jsx) and the Review task (src/tasks/AmcReview.jsx).
//
// THE MATHEMATICS IS THE CONTEST'S; THE WORDS ARE OURS. Every problem keeps the
// numbers, the names, the five choices and the order of the 2024 paper, so a
// score here means what a score there means and the printed paper can sit
// beside the screen. The wording is rewritten, the figures are redrawn
// (figures.js), and every hint and solution is written for this unit.
//
// One problem is one object:
//   id        'q1' … 'q25' — the key the student's answers are stored under
//   topic     'Number' | 'Algebra' | 'Geometry' | 'Counting' (the results
//             screen groups the score by these)
//   text      the question. **bold**, _italic_, $inline$ and $$block$$ maths;
//             a blank line starts a new paragraph; a line starting "• " is a
//             bullet
//   figure    an SVG from figures.js, printed under the text
//   choices   the five answers, in order (A) to (E)
//   correct   'A' … 'E'
//   — read only by the Review task —
//   hint      one nudge, shown on request before a second try
//   idea      the one idea the problem turns on
//   solution  the worked steps, one move each
//   solutionFigure  optional picture for the solution
//   trap      the mistake behind a tempting wrong choice ("Watch out")
//   tip       or, where there is no such mistake, a quicker way or a check
//
// `npm run validate` runs utils/amcTest.js over this file: 25 problems, five
// choices each, a key of A–E, a full solution for every problem.
import { FIGURES } from './figures.js';

export const amcTest = {
  title: 'Practice Test 1',
  source: 'The problems of the 2024 AMC 8',
  minutes: 40,
  // The 2024 contest's award lines, for the results screen. They move a point
  // or two from year to year.
  awards: [
    { score: 22, label: 'Distinguished Honor Roll', note: 'top 1%' },
    { score: 18, label: 'Honor Roll', note: 'top 5%' },
  ],

  problems: [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
      id: 'q1',
      topic: 'Number',
      text: 'What is the ones digit of the result?\n\n$$222{,}222 - 22{,}222 - 2{,}222 - 222 - 22 - 2$$',
      choices: ['$0$', '$2$', '$4$', '$6$', '$8$'],
      correct: 'B',
      hint: 'You are taking away five numbers. What is the ones digit of those five numbers added together?',
      idea: 'Taking away several numbers is the same as taking away their sum — and only the ones digits decide the ones digit.',
      solution: [
        'Five numbers are subtracted: $22{,}222$, $2{,}222$, $222$, $22$ and $2$. Each one ends in $2$.',
        'Add their ones digits: $2 + 2 + 2 + 2 + 2 = 10$. So the five numbers together end in $0$.',
        'Subtracting a number that ends in $0$ does not change the ones digit. $222{,}222$ ends in $2$, so the answer ends in $2$.',
        'Check by doing it in full: $22{,}222 + 2{,}222 + 222 + 22 + 2 = 24{,}690$, and $222{,}222 - 24{,}690 = 197{,}532$.',
      ],
      trap: 'Working only with ones digits as $2 - 2 - 2 - 2 - 2 - 2 = -8$ and answering $8$. A ones digit cannot go below zero: you borrow from the tens.',
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
      id: 'q2',
      topic: 'Number',
      text: 'Write the value of this expression as a decimal.\n\n$$\\dfrac{44}{11} + \\dfrac{110}{44} + \\dfrac{44}{1100}$$',
      choices: ['$6.4$', '$6.504$', '$6.54$', '$6.9$', '$6.94$'],
      correct: 'C',
      hint: 'Simplify each fraction before you divide. Every number here is a multiple of 11.',
      idea: 'Simplify first. A fraction over 10 or 100 is a decimal you can read straight off.',
      solution: [
        '$\\dfrac{44}{11} = 4$.',
        '$\\dfrac{110}{44}$: divide top and bottom by $22$ to get $\\dfrac{5}{2} = 2.5$.',
        '$\\dfrac{44}{1100}$: divide top and bottom by $11$ to get $\\dfrac{4}{100} = 0.04$.',
        'Add: $4 + 2.5 + 0.04 = 6.54$.',
      ],
      trap: 'Reading $\\dfrac{4}{100}$ as $0.4$ gives $6.9$. Four hundredths is $0.04$.',
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
      id: 'q3',
      topic: 'Geometry',
      text: 'Four squares have sides of 4, 7, 9 and 10 units. They lie in a pile, largest at the bottom and smallest on top, with their left edges together and their bottom edges together. Going from the smallest to the largest, the squares are white, gray, white, gray, as the figure shows. How many square units of gray can be seen?',
      figure: FIGURES.Q3,
      choices: ['$42$', '$45$', '$49$', '$50$', '$52$'],
      correct: 'E',
      hint: 'Each gray piece is a big square with a smaller square covering one corner.',
      idea: 'Area by subtraction: an L-shape is a big square minus the square that covers its corner.',
      solution: [
        'Two gray L-shapes can be seen.',
        'The outer one is the square of side $10$ with the square of side $9$ on top of it: $10^2 - 9^2 = 100 - 81 = 19$.',
        'The inner one is the square of side $7$ with the square of side $4$ on top of it: $7^2 - 4^2 = 49 - 16 = 33$.',
        'Gray area $= 19 + 33 = 52$ square units.',
      ],
      trap: 'Adding the two whole gray squares, $100 + 49$, counts the parts that are hidden.',
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
      id: 'q4',
      topic: 'Number',
      text: 'Yunji wanted to add the integers from 1 through 9. She missed one of them by mistake, and the total she got was a square number. Which integer did she miss?',
      choices: ['$5$', '$6$', '$7$', '$8$', '$9$'],
      correct: 'E',
      hint: 'First find the sum with nothing left out. Then ask which square numbers are just below it.',
      idea: 'Find the full total, then look for a square number near it.',
      solution: [
        'With nothing left out: $1 + 2 + \\dots + 9 = 45$.',
        'Leaving out a number from $1$ to $9$ gives a sum from $45 - 9 = 36$ to $45 - 1 = 44$.',
        'The only square number from $36$ to $44$ is $36 = 6^2$. (The next one is $49$, which is too big.)',
        '$45 - 36 = 9$, so she left out $9$.',
      ],
      tip: 'A quick way to add $1$ to $9$: pair them as $1 + 9$, $2 + 8$, $3 + 7$, $4 + 6$ — four tens — plus the $5$ in the middle.',
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
      id: 'q5',
      topic: 'Number',
      text: 'Aaliyah rolls two ordinary 6-sided dice and multiplies the two numbers. The product turns out to be a multiple of 6. Which of these numbers _cannot_ be the sum of the two numbers she rolled?',
      choices: ['$5$', '$6$', '$7$', '$8$', '$9$'],
      correct: 'B',
      hint: 'Take one choice at a time. List the pairs of dice numbers with that sum, and multiply each pair.',
      idea: 'Test the choices. For each sum, list every pair that makes it.',
      solution: [
        'Sum $5$: the pair $2, 3$ has product $6$. Possible.',
        'Sum $7$: the pair $1, 6$ has product $6$. Possible.',
        'Sum $8$: the pair $2, 6$ has product $12$. Possible.',
        'Sum $9$: the pair $3, 6$ has product $18$. Possible.',
        'Sum $6$: the pairs are $1, 5$ and $2, 4$ and $3, 3$, with products $5$, $8$ and $9$. None is a multiple of $6$.',
        'So the sum cannot be $6$.',
      ],
      trap: 'Checking only one pair for a sum. The sum $6$ can be made in three ways, and all three must fail before you can say "cannot".',
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
      id: 'q6',
      topic: 'Geometry',
      text: 'The four figures show an ice rink from above. Each thick gray line is a path that Sergei skated: Path P, Path Q, Path R and Path S. Put the four paths in order of length, from the shortest to the longest.',
      figure: FIGURES.Q6,
      choices: ['P, Q, R, S', 'P, R, S, Q', 'Q, S, P, R', 'R, P, S, Q', 'R, S, P, Q'],
      correct: 'D',
      hint: 'Compare every path with P. Which paths take a shortcut, and which take a longer way between the same two points?',
      idea: 'A straight line is the shortest way between two points. Compare each path with P, part by part.',
      solution: [
        '**R and P.** Path R cuts straight across every corner that P goes around. A straight cut is shorter than the curve, so R is shorter than P.',
        '**S and P.** Both go around the two curved ends. Between the ends, P goes straight down each side. S goes from one side to the other instead, and a slanted line is longer than a straight-down one. So S is longer than P.',
        '**Q and S.** Both go around the two curved ends. Between the ends, S crosses the rink once on each trip. Q crosses it twice — over and back — in the same distance down the rink, so its zigzag is longer. Q is longer than S.',
        'Shortest to longest: R, P, S, Q.',
      ],
      trap: 'Answering from how much gray you can see. Judge the length by comparing the paths part by part.',
    },

    // ── 7 ────────────────────────────────────────────────────────────────────
    {
      id: 'q7',
      topic: 'Geometry',
      text: 'Three kinds of tile are shown: a $2 \\times 2$ square, a $1 \\times 4$ strip and a $1 \\times 1$ square. Tiles of these kinds cover a $3 \\times 7$ rectangle completely, and no tiles overlap. What is the smallest number of $1 \\times 1$ tiles that can be used?',
      figure: FIGURES.Q7,
      choices: ['$1$', '$2$', '$3$', '$4$', '$5$'],
      correct: 'E',
      hint: 'Each big tile covers 4 cells. What could be left over from 21 cells? Then color every other column and count.',
      idea: 'Count the area first, then color the grid to show that the smallest count cannot happen.',
      solution: [
        'The rectangle has $3 \\times 7 = 21$ cells. Each $2 \\times 2$ tile and each $1 \\times 4$ tile covers $4$ cells.',
        'So the number of $1 \\times 1$ tiles is $21$ minus a multiple of $4$: it is $1$, $5$, $9$, … That already rules out $2$, $3$ and $4$.',
        'Can it be $1$? Color columns 1, 3, 5 and 7 red. There are $4 \\times 3 = 12$ red cells and $3 \\times 3 = 9$ white cells.',
        'A $1 \\times 4$ tile must lie flat, because the rectangle is only $3$ cells tall. It covers $2$ red and $2$ white cells. A $2 \\times 2$ tile also covers $2$ red and $2$ white cells.',
        'So the big tiles cover red and white cells equally. The $3$ extra red cells need at least $3$ small tiles. One is not enough, so the smallest possible number is $5$.',
        'And $5$ really works: three $2 \\times 2$ tiles, one $1 \\times 4$ tile and five $1 \\times 1$ tiles, as in the picture.',
      ],
      solutionFigure: FIGURES.Q7_SOLVED,
      trap: 'Stopping at "21 = 4 × 5 + 1, so one small tile". The area fits, but the shapes do not.',
    },

    // ── 8 ────────────────────────────────────────────────────────────────────
    {
      id: 'q8',
      topic: 'Counting',
      text: 'Taye has \\$2 on Monday. On each of the next days his money changes in one of two ways: it goes up by \\$3, or it doubles. How many different amounts could he have on Thursday, 3 days after Monday?',
      choices: ['$3$', '$4$', '$5$', '$6$', '$7$'],
      correct: 'D',
      hint: 'Go one day at a time. Write the possible amounts for Tuesday, then Wednesday, then Thursday — and cross out repeats.',
      idea: 'An organised list, one day at a time. Keep only the different amounts.',
      solution: [
        '**Tuesday.** From $2$: add $3$ to get $5$, or double to get $4$. Amounts: $4$, $5$.',
        '**Wednesday.** From $4$: $7$ or $8$. From $5$: $8$ or $10$. Amounts: $7$, $8$, $10$ — the $8$ appears twice and counts once.',
        '**Thursday.** From $7$: $10$ or $14$. From $8$: $11$ or $16$. From $10$: $13$ or $20$.',
        'The amounts are $10$, $11$, $13$, $14$, $16$ and $20$. All are different, so there are $6$.',
      ],
      trap: 'Two choices a day for three days is $2 \\times 2 \\times 2 = 8$ paths, but two of the paths reach the same amount. The question counts amounts, not paths.',
    },

    // ── 9 ────────────────────────────────────────────────────────────────────
    {
      id: 'q9',
      topic: 'Algebra',
      text: 'Maria collects marbles. Each marble is red, green or blue. The number of red marbles is half the number of green marbles. The number of blue marbles is twice the number of green marbles. Which of these could be the number of marbles Maria has altogether?',
      choices: ['$24$', '$25$', '$26$', '$27$', '$28$'],
      correct: 'E',
      hint: 'Call the number of red marbles 1 part. How many parts are green? Blue? Altogether?',
      idea: 'Ratios are parts. The total must be a multiple of the number of parts.',
      solution: [
        'Let the red marbles be $1$ part.',
        'Red is half of green, so green is $2$ parts.',
        'Blue is twice green, so blue is $4$ parts.',
        'Total $= 1 + 2 + 4 = 7$ parts, so the total is a multiple of $7$.',
        'The only multiple of $7$ among the choices is $28$: $4$ red, $8$ green and $16$ blue.',
      ],
      trap: 'Starting with green as $1$ part makes red half a part. It still works ($3.5$ parts), but whole parts are easier: start from the smallest group.',
    },

    // ── 10 ───────────────────────────────────────────────────────────────────
    {
      id: 'q10',
      topic: 'Algebra',
      text: 'The Mauna Loa Observatory measures carbon dioxide (CO$_2$) in the air in ppm (parts per million). In January 1980 the reading was 338 ppm. Since then it has risen by about 1.515 ppm a year on average. If it keeps rising at that rate, what reading is expected in January 2030? Give your answer in ppm, to the nearest integer.',
      choices: ['$399$', '$414$', '$420$', '$444$', '$459$'],
      correct: 'B',
      hint: 'How many years is it from 1980 to 2030? Multiplying by 50 is the same as multiplying by 100 and halving.',
      idea: 'Start value plus (rate × number of years).',
      solution: [
        'From 1980 to 2030 is $50$ years.',
        'Rise $= 50 \\times 1.515$. Multiply by $100$ and halve: $151.5 \\div 2 = 75.75$.',
        'Level in 2030 $= 338 + 75.75 = 413.75$.',
        'To the nearest integer that is $414$ ppm.',
      ],
      tip: 'Estimate to check: about $1.5 \\times 50 = 75$, and $338 + 75 = 413$. Only $414$ is close.',
    },

    // ── 11 ───────────────────────────────────────────────────────────────────
    {
      id: 'q11',
      topic: 'Geometry',
      text: 'Triangle $ABC$ has its vertices at $A(5, 7)$, $B(11, 7)$ and $C(3, y)$, where $y > 7$. The triangle has area 12. Find $y$.',
      figure: FIGURES.Q11,
      choices: ['$8$', '$9$', '$10$', '$11$', '$12$'],
      correct: 'D',
      hint: '$A$ and $B$ have the same $y$-coordinate, so $AB$ is a flat base. How long is it? How high above it is $C$?',
      idea: 'Area of a triangle is half of base times height, and the height is measured straight up from the line of the base.',
      solution: [
        '$A$ and $B$ both have $y = 7$, so $AB$ is horizontal. Its length is $11 - 5 = 6$.',
        'The height is how far $C$ is above the line $y = 7$. That is $y - 7$.',
        'Area: $\\dfrac{1}{2} \\times 6 \\times (y - 7) = 12$, so $3(y - 7) = 12$.',
        '$y - 7 = 4$, so $y = 11$.',
      ],
      trap: '$C$ is not above the base — it is off to the left. That does not matter: the height goes to the line through $A$ and $B$, and the $3$ in $C(3, y)$ is never used.',
    },

    // ── 12 ───────────────────────────────────────────────────────────────────
    {
      id: 'q12',
      topic: 'Algebra',
      text: 'Rohan has 4 fish tanks, with 90 guppies in them altogether.\n\n• The 2nd tank has 1 more guppy than the 1st tank.\n• The 3rd tank has 2 more guppies than the 2nd tank.\n• The 4th tank has 3 more guppies than the 3rd tank.\n\nHow many guppies does the 4th tank have?',
      choices: ['$20$', '$21$', '$23$', '$24$', '$26$'],
      correct: 'E',
      hint: 'Call the 1st tank $x$. Write the other three tanks using $x$, then add all four.',
      idea: 'Write everything with one letter, then use the total.',
      solution: [
        'Let the 1st tank hold $x$ guppies.',
        'Then the 2nd holds $x + 1$, the 3rd holds $x + 3$ and the 4th holds $x + 6$.',
        'Total: $x + (x + 1) + (x + 3) + (x + 6) = 4x + 10 = 90$.',
        '$4x = 80$, so $x = 20$.',
        'The 4th tank holds $20 + 6 = 26$ guppies. Check: $20 + 21 + 23 + 26 = 90$.',
      ],
      trap: 'Answering $20$. That is the 1st tank; the question asks for the 4th. The differences build up: $+1$, then $+2$ more, then $+3$ more.',
    },

    // ── 13 ───────────────────────────────────────────────────────────────────
    {
      id: 'q13',
      topic: 'Counting',
      text: 'Buzz Bunny hops on a staircase. Every hop takes Buzz one step up or one step down. Buzz starts on the ground, makes 6 hops, and finishes on the ground again. In how many different ways can this be done? (One way is up-up-down-down-up-down.)',
      figure: FIGURES.Q13,
      choices: ['$4$', '$5$', '$6$', '$8$', '$12$'],
      correct: 'B',
      hint: 'Buzz needs 3 ups and 3 downs — and can never be below the ground. Sort the sequences by how high Buzz gets.',
      idea: 'An organised list with a rule: Buzz can never have made more down-hops than up-hops.',
      solution: [
        'To finish on the ground, Buzz makes $3$ up-hops (U) and $3$ down-hops (D). The first hop is U and the last is D.',
        'Buzz cannot go below the ground, so at every moment the number of D so far is at most the number of U.',
        '**Reaches step 3:** U U U D D D — $1$ way.',
        '**Reaches step 2, not 3:** U U D U D D, U U D D U D, U D U U D D — $3$ ways.',
        '**Never above step 1:** U D U D U D — $1$ way.',
        'Total $= 1 + 3 + 1 = 5$ ways.',
      ],
      trap: 'Counting every order of 3 U and 3 D gives $20$, but most of those go under the ground — for example any that starts with D.',
    },

    // ── 14 ───────────────────────────────────────────────────────────────────
    {
      id: 'q14',
      topic: 'Counting',
      text: 'Six towns, $A$, $M$, $C$, $X$, $Y$ and $Z$, are joined by one-way roads, as the figure shows. The number beside each road is its length in kilometers. The figure is not drawn to scale. A driver must follow the arrows. What is the length, in kilometers, of the shortest trip from $A$ to $Z$?',
      figure: FIGURES.Q14,
      choices: ['$28$', '$29$', '$30$', '$31$', '$32$'],
      correct: 'A',
      hint: 'Work from left to right. Write beside each town the shortest distance from $A$ to that town.',
      idea: 'Label every town with its shortest distance from the start, one town at a time.',
      solution: [
        '**To $X$:** only $A \\to X$, which is $5$.',
        '**To $M$:** straight from $A$ is $8$; through $X$ is $5 + 2 = 7$. Shortest: $7$.',
        '**To $Y$:** from $X$ is $5 + 10 = 15$; from $M$ is $7 + 6 = 13$. Shortest: $13$.',
        '**To $C$:** from $M$ is $7 + 14 = 21$; from $Y$ is $13 + 5 = 18$. Shortest: $18$.',
        '**To $Z$:** from $Y$ is $13 + 17 = 30$; from $C$ is $18 + 10 = 28$; from $M$ is $7 + 25 = 32$. Shortest: $28$.',
        'The route is $A \\to X \\to M \\to Y \\to C \\to Z$: $5 + 2 + 6 + 5 + 10 = 28$ km.',
      ],
      solutionFigure: FIGURES.Q14_SOLVED,
      trap: 'Taking the route with the fewest roads. $A \\to M \\to Z$ uses only two roads and is $33$ km; the shortest route uses five.',
    },

    // ── 15 ───────────────────────────────────────────────────────────────────
    {
      id: 'q15',
      topic: 'Number',
      text: 'Each of the letters $F$, $L$, $Y$, $B$, $U$ and $G$ stands for a digit, and the six digits are distinct. They satisfy\n\n$$8 \\cdot \\underline{F\\,L\\,Y\\,F\\,L\\,Y} = \\underline{B\\,U\\,G\\,B\\,U\\,G}$$\n\nand $\\underline{F\\,L\\,Y\\,F\\,L\\,Y}$ is the greatest number for which this can be done. Find $\\underline{F\\,L\\,Y} + \\underline{B\\,U\\,G}$.',
      choices: ['$1089$', '$1098$', '$1107$', '$1116$', '$1125$'],
      correct: 'C',
      hint: 'A number like 345,345 is $345 \\times 1001$. Use that on both sides of the equation.',
      idea: 'A repeated block: $\\underline{A\\,B\\,C\\,A\\,B\\,C} = 1001 \\times \\underline{A\\,B\\,C}$.',
      solution: [
        '$\\underline{F\\,L\\,Y\\,F\\,L\\,Y} = 1000 \\times \\underline{F\\,L\\,Y} + \\underline{F\\,L\\,Y} = 1001 \\times \\underline{F\\,L\\,Y}$. In the same way $\\underline{B\\,U\\,G\\,B\\,U\\,G} = 1001 \\times \\underline{B\\,U\\,G}$.',
        'Divide both sides of the equation by $1001$: $8 \\times \\underline{F\\,L\\,Y} = \\underline{B\\,U\\,G}$.',
        '$\\underline{B\\,U\\,G}$ has three digits, so it is less than $1000$. That means $\\underline{F\\,L\\,Y}$ is at most $124$, because $8 \\times 125 = 1000$.',
        'Try the greatest first. $\\underline{F\\,L\\,Y} = 124$ gives $\\underline{B\\,U\\,G} = 992$, but then $B$ and $U$ are both $9$. Not distinct.',
        '$\\underline{F\\,L\\,Y} = 123$ gives $\\underline{B\\,U\\,G} = 984$. The digits $1, 2, 3, 9, 8, 4$ are all different. This is the greatest.',
        '$123 + 984 = 1107$.',
      ],
      trap: 'Stopping at $124 + 992 = 1116$. "Distinct" means all six letters are different digits.',
    },

    // ── 16 ───────────────────────────────────────────────────────────────────
    {
      id: 'q16',
      topic: 'Number',
      text: 'Minh writes the numbers 1 through 81 in a $9 \\times 9$ grid, one number in each cell, in any order she likes. For every row and every column she multiplies the nine numbers in it. Some of these 18 products are divisible by 3. What is the least possible number of them?',
      choices: ['$8$', '$9$', '$10$', '$11$', '$12$'],
      correct: 'D',
      hint: 'A product is divisible by 3 when at least one of its numbers is a multiple of 3. How many multiples of 3 are there, and how tightly can you pack them?',
      idea: 'To make something happen as little as possible, pack the cause into as few places as possible.',
      solution: [
        'A row or column has a product divisible by $3$ exactly when it contains a multiple of $3$.',
        'From $1$ to $81$ there are $81 \\div 3 = 27$ multiples of $3$.',
        'Suppose they lie in $r$ rows and $c$ columns. Then they all fit in the $r \\times c$ cells where those rows and columns cross, so $r \\times c \\ge 27$.',
        'We want $r + c$ as small as possible. If $r + c = 10$, the largest product is $5 \\times 5 = 25$, which is less than $27$. Too small.',
        'If $r + c = 11$, then $5 \\times 6 = 30 \\ge 27$. The $27$ multiples fit inside $5$ rows and $6$ columns.',
        'So the least number is $11$.',
      ],
      trap: 'Putting the multiples of $3$ in three full rows uses $3$ rows and all $9$ columns: $12$. A block that is nearly square does better.',
    },

    // ── 17 ───────────────────────────────────────────────────────────────────
    {
      id: 'q17',
      topic: 'Counting',
      text: 'In chess, a king _attacks_ every square next to its own: one step left or right, up or down, or along a diagonal. The figure shows a king on the center of a $3 \\times 3$ grid, attacking the 8 squares around it. A white king and a black king are put on two different squares of a $3 \\times 3$ grid. Neither king attacks the other. In how many ways can the two kings be placed?',
      figure: FIGURES.Q17,
      choices: ['$20$', '$24$', '$27$', '$28$', '$32$'],
      correct: 'E',
      hint: 'Place the white king first. There are three kinds of square: corner, middle of a side, center. How many squares are left for the black king each time?',
      idea: 'Split into cases by the kind of square, and count each case.',
      solution: [
        '**White king on a corner** ($4$ squares). It attacks $3$ squares. Of the other $8$ squares, $8 - 3 = 5$ are safe for the black king: $4 \\times 5 = 20$ ways.',
        '**White king in the middle of a side** ($4$ squares). It attacks $5$ squares, leaving $8 - 5 = 3$: $4 \\times 3 = 12$ ways.',
        '**White king on the center** ($1$ square). It attacks all $8$ other squares: $0$ ways.',
        'Total $= 20 + 12 + 0 = 32$ ways.',
      ],
      trap: 'Halving to $16$ because "the two kings can swap". They are different colors, so swapping them gives a different placement.',
    },

    // ── 18 ───────────────────────────────────────────────────────────────────
    {
      id: 'q18',
      topic: 'Geometry',
      text: 'Three circles have the same center $O$. Their radii are 1, 2 and 3. Points $B$ and $C$ are on the largest circle. Two regions are shaded, as the figure shows: the whole ring between the two smaller circles, and the part of the ring between the two larger circles that is inside angle $BOC$. The shaded area is equal to the unshaded area inside the largest circle. How many degrees is $\\angle BOC$?',
      figure: FIGURES.Q18,
      choices: ['$108$', '$120$', '$135$', '$144$', '$150$'],
      correct: 'A',
      hint: 'Shaded equals unshaded, so the shaded area is half of the big circle. Find the area of each ring first.',
      idea: 'A ring is a big circle minus a small one. A slice of a ring is the same fraction of it as its angle is of $360^\\circ$.',
      solution: [
        'The whole figure is a circle of radius $3$: area $9\\pi$. Shaded equals unshaded, so the shaded area is $\\dfrac{9\\pi}{2} = 4.5\\pi$.',
        'Inner ring (between radius $1$ and $2$): $4\\pi - \\pi = 3\\pi$. All of it is shaded.',
        'So the shaded slice of the outer ring has area $4.5\\pi - 3\\pi = 1.5\\pi$.',
        'Outer ring (between radius $2$ and $3$): $9\\pi - 4\\pi = 5\\pi$.',
        'The slice is $\\dfrac{1.5\\pi}{5\\pi} = \\dfrac{3}{10}$ of the ring, so the angle is $\\dfrac{3}{10} \\times 360^\\circ = 108^\\circ$.',
      ],
      trap: 'Forgetting that the small circle in the middle (area $\\pi$) is unshaded. Every region must be counted once.',
    },

    // ── 19 ───────────────────────────────────────────────────────────────────
    {
      id: 'q19',
      topic: 'Counting',
      text: 'Jordan has 15 pairs of sneakers. Three fifths of the pairs are red; the others are white. Two thirds of the pairs are high-tops; the others are low-tops. What is the least possible fraction of the 15 pairs that are red high-tops?',
      choices: ['$0$', '$\\dfrac{1}{5}$', '$\\dfrac{4}{15}$', '$\\dfrac{1}{3}$', '$\\dfrac{2}{5}$'],
      correct: 'C',
      hint: 'Turn the fractions into numbers of pairs. To make red high-tops as few as possible, make as many high-tops as you can white.',
      idea: '"Least possible": push to the extreme. Give the high-tops to the white pairs first.',
      solution: [
        'Red: $\\dfrac{3}{5} \\times 15 = 9$ pairs. White: $15 - 9 = 6$ pairs.',
        'High-top: $\\dfrac{2}{3} \\times 15 = 10$ pairs. Low-top: $5$ pairs.',
        'To have few red high-tops, make as many high-tops as possible white. There are only $6$ white pairs, so at most $6$ high-tops are white.',
        'The other $10 - 6 = 4$ high-tops must be red.',
        'Least fraction $= \\dfrac{4}{15}$.',
      ],
      trap: 'Multiplying, $\\dfrac{3}{5} \\times \\dfrac{2}{3} = \\dfrac{2}{5}$, finds the fraction if color and height were mixed evenly. The question asks for the least it could be.',
    },

    // ── 20 ───────────────────────────────────────────────────────────────────
    {
      id: 'q20',
      topic: 'Geometry',
      text: 'The figure shows cube $PQRSTUVW$. Joining any three of its vertices makes a triangle. (Joining $P$, $Q$ and $R$, for example, makes the isosceles triangle $PQR$.) How many of these triangles are equilateral and have $P$ as one of their vertices?',
      figure: FIGURES.Q20,
      choices: ['$0$', '$1$', '$2$', '$3$', '$6$'],
      correct: 'D',
      hint: 'Two vertices of a cube can be three different distances apart. Which distance could be the side of an equilateral triangle?',
      idea: 'Sort the distances: an edge, a diagonal of a face, a diagonal through the cube. All three sides must be the same kind.',
      solution: [
        'From $P$, the other vertices are at three distances: $3$ are one edge away ($Q$, $S$, $W$), $3$ are a face diagonal away ($R$, $T$, $V$), and $1$ is across the cube ($U$).',
        'Two edges from $P$ meet at a right angle, so a triangle with two edge sides is never equilateral. Only one vertex is across the cube, so that distance cannot be used twice.',
        'So both sides from $P$ must be face diagonals: choose two of $R$, $T$ and $V$.',
        'Check the third side each time. $R$ and $T$ are opposite corners of the back face, $R$ and $V$ of the right face, $T$ and $V$ of the bottom face. Each pair is a face diagonal apart too.',
        'The triangles are $PRT$, $PRV$ and $PTV$: there are $3$.',
      ],
      solutionFigure: FIGURES.Q20_SOLVED,
      trap: 'Answering $0$ because every face of a cube has right angles. The equilateral triangles cut through the inside of the cube.',
    },

    // ── 21 ───────────────────────────────────────────────────────────────────
    {
      id: 'q21',
      topic: 'Algebra',
      text: 'An _army_ of frogs lives in a tree. A frog in the shade is green, and a frog in the sun is yellow. At first, the ratio of green frogs to yellow frogs was $3 : 1$. Then 3 green frogs moved into the sun and 5 yellow frogs moved into the shade. After that the ratio of green frogs to yellow frogs was $4 : 1$. How many more green frogs than yellow frogs are there now?',
      choices: ['$10$', '$12$', '$16$', '$20$', '$24$'],
      correct: 'E',
      hint: 'Let the yellow frogs at the start be $y$, so the green frogs are $3y$. What are the two numbers after the frogs move?',
      idea: 'Write both amounts with one letter, change them, then use the new ratio as an equation.',
      solution: [
        'At the start let there be $y$ yellow frogs and $3y$ green frogs.',
        'Green loses $3$ and gains $5$: now $3y + 2$. Yellow gains $3$ and loses $5$: now $y - 2$.',
        'The new ratio is $4 : 1$, so $3y + 2 = 4(y - 2)$.',
        '$3y + 2 = 4y - 8$, so $y = 10$.',
        'Now there are $3(10) + 2 = 32$ green frogs and $10 - 2 = 8$ yellow frogs. Check: $32 : 8 = 4 : 1$.',
        'Difference $= 32 - 8 = 24$.',
      ],
      trap: 'Answering $20$, the difference at the start ($30 - 10$). The question says "now".',
    },

    // ── 22 ───────────────────────────────────────────────────────────────────
    {
      id: 'q22',
      topic: 'Geometry',
      text: 'A roll of tape is wound on a ring. The ring has diameter 2 inches, and the whole roll has diameter 4 inches. The figure shows the roll from the side. The tape is 0.015 inch thick. About how long is the tape when it is all unrolled? Give your answer to the nearest 100 inches.',
      figure: FIGURES.Q22,
      choices: ['$300$', '$600$', '$1200$', '$1500$', '$1800$'],
      correct: 'B',
      hint: 'Look at the tape from the side. Rolled up it is a ring; unrolled it is a very long, very thin rectangle. The two have the same area.',
      idea: 'Same tape, same side-view area: ring area $=$ length $\\times$ thickness.',
      solution: [
        'Seen from the side, the rolled tape is a ring with outer radius $2$ and inner radius $1$. Its area is $\\pi(2^2) - \\pi(1^2) = 3\\pi$ square inches.',
        'Unrolled and seen from the side, the tape is a rectangle: its length $L$ by its thickness $0.015$.',
        'The area does not change, so $L \\times 0.015 = 3\\pi$.',
        '$L = \\dfrac{3\\pi}{0.015} = 200\\pi \\approx 200 \\times 3.14 = 628$ inches.',
        'To the nearest $100$ inches, that is $600$.',
      ],
      trap: 'Using the diameters $4$ and $2$ as if they were radii gives $12\\pi \\div 0.015 \\approx 2500$. Halve a diameter before you square it.',
    },

    // ── 23 ───────────────────────────────────────────────────────────────────
    {
      id: 'q23',
      topic: 'Geometry',
      text: 'Rodrigo draws on a very large sheet of graph paper. His first line segment joins $(0, 4)$ to $(2, 0)$. He colors every cell that has part of the segment inside it, and that is 4 cells, as the figure shows. His second line segment joins $(2000, 3000)$ to $(5000, 8000)$, and he colors cells by the same rule. How many cells does he color for the second segment?',
      figure: FIGURES.Q23,
      choices: ['$6000$', '$6500$', '$7000$', '$7500$', '$8000$'],
      correct: 'C',
      hint: 'The segment goes 3000 across and 5000 up. Cut it into 1000 equal small pieces. How many cells does one small piece cross?',
      idea: 'Make it smaller. A long segment is many copies of a short one, joined at grid points.',
      solution: [
        'The segment goes $5000 - 2000 = 3000$ across and $8000 - 3000 = 5000$ up.',
        'That is $1000$ copies of a small segment that goes $3$ across and $5$ up. Each copy starts and ends on a grid point.',
        'Count one copy. It starts inside one cell. Every time it crosses a grid line it enters a new cell.',
        'It crosses $2$ vertical lines and $4$ horizontal lines on the way. It never crosses two at once, because $3$ and $5$ share no factor, so it meets no grid point in between.',
        'One copy colors $1 + 2 + 4 = 7$ cells, so $1000$ copies color $7000$ cells.',
        'Check with the example: $2$ across and $4$ down is $2$ copies of "$1$ across, $2$ down". Each copy colors $1 + 0 + 1 = 2$ cells, giving $4$.',
      ],
      trap: 'Adding $3000 + 5000 = 8000$. The segment passes through a grid point $1000$ times, and each time it saves one cell.',
    },

    // ── 24 ───────────────────────────────────────────────────────────────────
    {
      id: 'q24',
      topic: 'Geometry',
      text: 'Jean made a stained glass window shaped like two mountains, as the figure shows. One peak is 8 feet high and the other is 12 feet high. The angle at each peak is $90^\\circ$, and each straight side meets the ground at $45^\\circ$. The window has an area of 183 square feet. The two mountains cross at a point $h$ feet above the ground. Find $h$.',
      figure: FIGURES.Q24,
      choices: ['$4$', '$5$', '$4\\sqrt{2}$', '$6$', '$5\\sqrt{2}$'],
      correct: 'B',
      hint: 'Draw each mountain as a whole triangle. Where they overlap is a small triangle of the same shape. Total = big + big − overlap.',
      idea: 'In a $45^\\circ$-$45^\\circ$-$90^\\circ$ triangle standing on its long side, the base is twice the height, so the area is height squared.',
      solution: [
        'Each mountain is a $45^\\circ$-$45^\\circ$-$90^\\circ$ triangle standing on its long side. Its base is twice its height.',
        'Small mountain: height $8$, base $16$, area $\\dfrac{1}{2} \\times 16 \\times 8 = 64$. That is $8^2$.',
        'Large mountain: height $12$, base $24$, area $\\dfrac{1}{2} \\times 24 \\times 12 = 144$. That is $12^2$.',
        'The part where they overlap is the same kind of triangle, with height $h$. Its area is $h^2$.',
        'Adding the two mountains counts the overlap twice, so the artwork is $64 + 144 - h^2 = 183$.',
        '$h^2 = 208 - 183 = 25$, so $h = 5$.',
      ],
      solutionFigure: FIGURES.Q24_SOLVED,
      trap: 'The choices with $\\sqrt{2}$ are there for anyone who reaches for the slanted sides. Nothing here needs a slanted length.',
    },

    // ── 25 ───────────────────────────────────────────────────────────────────
    {
      id: 'q25',
      topic: 'Counting',
      text: 'A small airplane has 4 rows of seats, and each row has 3 seats. Eight passengers are already seated, in seats chosen at random. A couple boards next and wants two seats next to each other in the same row. What is the probability that they can have them?',
      figure: FIGURES.Q25,
      choices: ['$\\dfrac{8}{15}$', '$\\dfrac{32}{55}$', '$\\dfrac{20}{33}$', '$\\dfrac{34}{55}$', '$\\dfrac{8}{11}$'],
      correct: 'C',
      hint: 'Count the empty seats, not the passengers: 4 of the 12 seats are empty. It is easier to count the ways the couple is _out of luck_.',
      idea: 'Count the opposite. Probability of success $= 1 -$ probability of failure.',
      solution: [
        'There are $12$ seats and $8$ passengers, so $4$ seats are empty. The $4$ empty seats can be chosen in $\\dbinom{12}{4} = 495$ ways, all equally likely.',
        'Count the **bad** ways: no row has $2$ empty seats side by side. A row can then have $0$ empty seats, or $1$ empty seat ($3$ ways), or $2$ empty seats only as the two end seats ($1$ way).',
        '**One empty seat in every row:** $3 \\times 3 \\times 3 \\times 3 = 81$ ways.',
        '**Rows with $2$, $1$, $1$ and $0$ empty seats:** choose the row with $2$ ($4$ ways), then the row with $0$ ($3$ ways); the other two rows have $3$ ways each. $4 \\times 3 \\times 3 \\times 3 = 108$ ways.',
        '**Rows with $2$, $2$, $0$ and $0$ empty seats:** choose the two rows with $2$ in $6$ ways. $6$ ways.',
        'Bad ways: $81 + 108 + 6 = 195$. So good ways: $495 - 195 = 300$.',
        'Probability $= \\dfrac{300}{495} = \\dfrac{20}{33}$.',
      ],
      trap: 'Counting the good ways directly is possible, but rows with a pair overlap in many ways and it is easy to count one twice.',
    },
  ],
};
