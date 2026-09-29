// src/data/AMC8/PT_02/test.js
// Practice Test 2 — the 25 problems of the 2025 AMC 8, for the Practice Test
// task (src/tasks/AmcTest.jsx) and the Review task (src/tasks/AmcReview.jsx).
//
// THE MATHEMATICS IS THE CONTEST'S; THE WORDS ARE OURS. Every problem keeps the
// numbers, the names, the five choices and the order of the 2025 paper, so a
// score here means what a score there means. The wording is rewritten, the
// figures are redrawn (figures.js), and every hint and solution is written for
// this unit. Every answer was worked before the key was trusted.
//
// Item shape: see src/data/AMC8/PT_01/test.js. `npm run validate` runs
// utils/amcTest.js over this file: 25 problems, five choices each, a key of
// A–E, a full solution for every problem.
//
// One change of form: problem 13's choices are five histograms. The choice
// buttons hold text, so the histograms are drawn in the figure, labelled
// A to E, and the buttons name them.
import { FIGURES } from './figures.js';

export const amcTest = {
  title: 'Practice Test 2',
  source: 'The problems of the 2025 AMC 8',
  minutes: 40,
  // The 2025 contest's award lines (MAA results, as reported by AoPS and
  // Think Academy): Honor Roll 19, Distinguished Honor Roll 23.
  awards: [
    { score: 23, label: 'Distinguished Honor Roll', note: 'top 1%' },
    { score: 19, label: 'Honor Roll', note: 'top 5%' },
  ],

  problems: [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
      id: 'q1',
      topic: 'Geometry',
      text: 'The figure shows an eight-pointed star, a well-known quilt pattern, drawn on a 4-by-4 grid of squares. What percent of the whole grid does the star cover?',
      figure: FIGURES.Q1,
      choices: ['$40$', '$50$', '$60$', '$75$', '$80$'],
      correct: 'B',
      hint: 'The star is made of eight slanted pieces. How many grid squares is one piece worth?',
      idea: 'A slanted piece on a grid can be cut and slid into whole squares. Count the area in squares, then compare it with the 16 squares of the grid.',
      solution: [
        'The star is $8$ pieces that meet at the center. Each piece is a parallelogram with a base of $1$ and a height of $1$.',
        'So each piece has an area of $1$ square, and the star covers $8$ squares.',
        'The grid has $4 \\times 4 = 16$ squares, and $\\dfrac{8}{16} = \\dfrac{1}{2}$, which is $50\\%$.',
      ],
      tip: 'Check it the other way round: the uncovered part is the $4$ corner squares and half of each of the $8$ edge squares, which is $4 + 4 = 8$ squares. Covered and uncovered are equal, so the star is half the grid.',
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
      id: 'q2',
      topic: 'Number',
      text: 'The ancient Egyptians wrote numbers with the symbols in the table. Each symbol stands for the value printed under it, and a number is written by putting symbols side by side and adding their values. For example, 32 is written with three heel bones and two strokes. What number is written by the group of symbols at the bottom of the figure?',
      figure: FIGURES.Q2,
      choices: ['$1{,}423$', '$10{,}423$', '$14{,}023$', '$14{,}203$', '$14{,}230$'],
      correct: 'B',
      hint: 'Count each kind of symbol on its own. How many of each place value are there?',
      idea: 'Place value without a zero: count the symbols for each power of ten, then add.',
      solution: [
        'One bent finger: $1 \\times 10{,}000 = 10{,}000$.',
        'Four coils of rope: $4 \\times 100 = 400$.',
        'Two heel bones: $2 \\times 10 = 20$. Three strokes: $3 \\times 1 = 3$.',
        'Add them: $10{,}000 + 400 + 20 + 3 = 10{,}423$.',
      ],
      trap: 'Reading the symbols as the digits 1, 4, 2, 3 gives $1{,}423$. But the finger is ten thousand, and there is no lotus, so the thousands digit is $0$.',
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
      id: 'q3',
      topic: 'Number',
      text: 'In the card game _Buffalo Shuffle-o_, the whole deck is dealt out at the start, and every player gets the same number of cards. When Annika plays with 3 of her friends, each player gets 15 cards. In the next game, 2 more friends join them. How many cards does each player get now?',
      choices: ['$8$', '$9$', '$10$', '$11$', '$12$'],
      correct: 'C',
      hint: 'First find how many cards are in the deck. How many players were in the first game?',
      idea: 'Find the total first, then share it out again.',
      solution: [
        'The first game has Annika and her $3$ friends: $4$ players.',
        'So the deck has $4 \\times 15 = 60$ cards.',
        'With $2$ more friends there are $6$ players, and $60 \\div 6 = 10$.',
      ],
      trap: 'Forgetting Annika. Then the first game has $3$ players and a deck of $45$, and $45 \\div 5 = 9$. She plays too, so it is $4$ players and then $6$.',
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
      id: 'q4',
      topic: 'Number',
      text: 'Lucius counts backward by 7s. His first three numbers are 100, 93 and 86. What is his 10th number?',
      choices: ['$30$', '$37$', '$42$', '$44$', '$47$'],
      correct: 'B',
      hint: 'By the time he says his 10th number, how many times has he taken away 7?',
      idea: 'The $n$th number is the first number, then $n - 1$ steps.',
      solution: [
        'The 1st number is $100$, and each number after it is $7$ less.',
        'By the 10th number he has taken away $7$ nine times, not ten.',
        '$100 - 9 \\times 7 = 100 - 63 = 37$.',
      ],
      trap: 'Taking away $7$ ten times gives $100 - 70 = 30$. The first number is said before any $7$ is taken away.',
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
      id: 'q5',
      topic: 'Geometry',
      text: 'Betty drives a delivery truck in a neighborhood whose streets form the grid in the figure. She starts at the factory $F$, drives to $A$, then to $B$, then to $C$, and then back to $F$. She can drive only along the streets. What is the shortest total distance, in blocks, that she can drive?',
      figure: FIGURES.Q5,
      choices: ['$20$', '$22$', '$24$', '$26$', '$28$'],
      correct: 'C',
      hint: 'On a street grid, the shortest trip between two corners is the blocks across plus the blocks up or down.',
      idea: 'Grid distance: blocks across plus blocks up or down. Find it for each of the four legs and add.',
      solution: [
        'Put $B$ at $(0, 0)$. Then $C$ is at $(2, 4)$, $A$ at $(7, 3)$ and $F$ at $(6, 5)$.',
        '$F$ to $A$: $1$ across and $2$ down, which is $3$ blocks.',
        '$A$ to $B$: $7$ across and $3$ down, which is $10$ blocks.',
        '$B$ to $C$: $2$ across and $4$ up, which is $6$ blocks.',
        '$C$ to $F$: $4$ across and $1$ up, which is $5$ blocks.',
        'Total: $3 + 10 + 6 + 5 = 24$ blocks.',
      ],
      solutionFigure: FIGURES.SOL_Q5,
      tip: 'A route that never turns back is already a shortest one, so there is no need to try many routes. Count across and up for each leg.',
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
      id: 'q6',
      topic: 'Number',
      text: 'Sekou writes down the numbers 15, 16, 17, 18 and 19. He erases one of them, and the sum of the four numbers that are left is a multiple of 4. Which number did he erase?',
      choices: ['$15$', '$16$', '$17$', '$18$', '$19$'],
      correct: 'C',
      hint: 'Find the sum of all five first. Which number can you take away to leave a multiple of 4?',
      idea: 'Work with the total: the erased number is the total minus a multiple of 4.',
      solution: [
        'All five add to $15 + 16 + 17 + 18 + 19 = 85$.',
        'The multiples of $4$ below $85$ are $84, 80, 76, 72, 68, \\ldots$',
        'Taking away one of the numbers leaves $70$ to $66$. The only multiple of $4$ there is $68$, which is $85 - 17$.',
        'Check: $15 + 16 + 18 + 19 = 68 = 4 \\times 17$.',
      ],
      tip: 'With remainders: $85$ leaves remainder $1$ when divided by $4$, so the erased number must leave remainder $1$ too. Of $15$ to $19$, only $17$ does.',
    },

    // ── 7 ────────────────────────────────────────────────────────────────────
    {
      id: 'q7',
      topic: 'Counting',
      text: 'On the last exam in Prof. Xochi\'s class:\n\n• 5 students scored at least 95%\n• 13 students scored at least 90%\n• 27 students scored at least 85%\n• 50 students scored at least 80%\n\nHow many students scored at least 80% but less than 90%?',
      choices: ['$8$', '$14$', '$22$', '$37$', '$45$'],
      correct: 'D',
      hint: 'Every student who scored at least 90% is also one of the 50 who scored at least 80%.',
      idea: 'Between two marks = the number at least the lower mark, minus the number at least the higher mark.',
      solution: [
        'The $50$ students with at least $80\\%$ include everyone who did better — including the $13$ with at least $90\\%$.',
        'Take those $13$ away: $50 - 13 = 37$ students scored at least $80\\%$ but less than $90\\%$.',
        'The lines for $95\\%$ and $85\\%$ are not needed.',
      ],
      trap: '$27 - 13 = 14$ counts only the students from $85\\%$ up to $90\\%$. The question starts at $80\\%$.',
    },

    // ── 8 ────────────────────────────────────────────────────────────────────
    {
      id: 'q8',
      topic: 'Geometry',
      text: 'Isaiah cuts a cardboard cube along some of its edges and opens it out flat, as the figure shows. The flat shape has an area of 18 square centimeters. What was the volume of the cube, in cubic centimeters?',
      figure: FIGURES.Q8,
      choices: ['$3\\sqrt{3}$', '$6$', '$9$', '$6\\sqrt{3}$', '$9\\sqrt{3}$'],
      correct: 'A',
      hint: 'The flat shape is made of the faces of the cube. How many faces are there, and what is the area of one?',
      idea: 'The net is the six faces: the area of one face gives the length of an edge, and the edge gives the volume.',
      solution: [
        'The flat shape is the $6$ faces of the cube, so one face has area $18 \\div 6 = 3$.',
        'A face is a square with area $3$, so an edge is $\\sqrt{3}$ cm long.',
        'Volume $= \\sqrt{3} \\times \\sqrt{3} \\times \\sqrt{3} = 3 \\times \\sqrt{3} = 3\\sqrt{3}$ cubic centimeters.',
      ],
      trap: 'Taking the edge as $3$. That is the **area** of a face; the edge is $\\sqrt{3}$.',
    },

    // ── 9 ────────────────────────────────────────────────────────────────────
    {
      id: 'q9',
      topic: 'Algebra',
      text: 'On a clock face, 6 pairs of numbers sit directly across from each other, like 2 and 8 in the figure. Ningli finds the average of each pair. What is the average of her 6 results?',
      figure: FIGURES.Q9,
      choices: ['$5$', '$6.5$', '$8$', '$9.5$', '$12$'],
      correct: 'B',
      hint: 'Write the six pairs: 1 and 7, 2 and 8, … What are their averages?',
      idea: 'Every pair has two numbers, so the average of the pair averages is the average of all 12 numbers on the clock.',
      solution: [
        'The pairs are $1$ and $7$, $2$ and $8$, $3$ and $9$, $4$ and $10$, $5$ and $11$, $6$ and $12$.',
        'Their averages are $4, 5, 6, 7, 8, 9$.',
        'The average of these is $\\dfrac{4 + 5 + 6 + 7 + 8 + 9}{6} = \\dfrac{39}{6} = 6.5$.',
      ],
      tip: 'A quicker way: the answer is the average of $1$ to $12$, which is $\\dfrac{1 + 12}{2} = 6.5$.',
    },

    // ── 10 ───────────────────────────────────────────────────────────────────
    {
      id: 'q10',
      topic: 'Geometry',
      text: 'In the figure, $ABCD$ is a rectangle with $AB = 5$ inches and $AD = 3$ inches. It is turned $90^\\circ$ clockwise about the midpoint of side $DC$, giving a second rectangle. What is the total area, in square inches, covered by the two rectangles?',
      figure: FIGURES.Q10,
      choices: ['$21$', '$22.25$', '$23$', '$23.75$', '$25$'],
      correct: 'D',
      hint: 'Add the two areas, then take away the part that was counted twice. What shape is the overlap?',
      idea: 'Area covered = first + second − overlap.',
      solution: [
        'Each rectangle has area $5 \\times 3 = 15$.',
        'The midpoint of $DC$ is $2.5$ from $D$ and $2.5$ from $C$. After the turn, the second rectangle is $3$ wide and $5$ tall, and it reaches $2.5$ above $DC$ and $2.5$ below it.',
        'The overlap is the part above $DC$ and to the left of $BC$: $2.5$ across (from the midpoint to $C$) and $2.5$ up. Its area is $2.5 \\times 2.5 = 6.25$.',
        'Total covered: $15 + 15 - 6.25 = 23.75$ square inches.',
      ],
      solutionFigure: FIGURES.SOL_Q10,
      tip: 'The overlap is a square because a quarter turn swaps "across" and "up": the $2.5$ across from the midpoint to $C$ becomes $2.5$ up.',
    },

    // ── 11 ───────────────────────────────────────────────────────────────────
    {
      id: 'q11',
      topic: 'Counting',
      text: 'A _tetromino_ is a shape made of four squares joined edge to edge. There are five kinds, I, O, L, T and S, shown in the figure, and each one may be turned or flipped over. Three tetrominoes exactly cover a 3-by-4 rectangle, and at least one of them is an S. What are the other two?',
      figure: FIGURES.Q11,
      choices: ['I and L', 'I and T', 'L and L', 'L and S', 'O and T'],
      correct: 'C',
      hint: 'Put the S in first, then look at the 8 squares it leaves. How can they be cut into two tiles of 4?',
      idea: 'Place the awkward piece first, then let the gap it leaves decide the rest.',
      solution: [
        'Number the columns $1$ to $4$ from the left. Put the S in the top two rows: squares $3$ and $4$ of the top row, and squares $2$ and $3$ of the middle row.',
        'The $8$ squares left make one bent strip: top $2$, top $1$, middle $1$, bottom $1$, bottom $2$, bottom $3$, bottom $4$, middle $4$. Each touches only its neighbors in that list.',
        'A strip like that can be cut into two tiles of $4$ in only one way: the first four and the last four. Both are L shapes.',
        'The other places the S fits either cut off a square that no tile can reach, or are a turn or a flip of this one. So the other two tiles are L and L.',
      ],
      tip: 'The rectangle has $12$ squares and each tile has $4$, so the three tiles fit with no gap and no overlap. A single cut-off square rules a placement out at once.',
    },

    // ── 12 ───────────────────────────────────────────────────────────────────
    {
      id: 'q12',
      topic: 'Geometry',
      text: 'The region in the figure is made of 24 squares, each 1 centimeter on a side. What is the area, in square centimeters, of the largest circle that fits inside the region? (The circle may touch the edges.)',
      figure: FIGURES.Q12,
      choices: ['$3\\pi$', '$4\\pi$', '$5\\pi$', '$6\\pi$', '$8\\pi$'],
      correct: 'C',
      hint: 'Put the circle at the center of the region. Which points of the edge are closest to the center: the flat sides, or the corners of the steps?',
      idea: 'The circle is stopped by the inside corners of the steps, not by the flat sides. Measure to a corner with the Pythagorean theorem.',
      solution: [
        'By symmetry, the largest circle is centered at the center of the region.',
        'The flat sides are $3$ from the center, but the inside corners of the steps are closer.',
        'One such corner is $2$ across and $1$ up from the center, so its distance is $\\sqrt{2^2 + 1^2} = \\sqrt{5}$.',
        'So the radius is $\\sqrt{5}$, and the area is $\\pi \\times (\\sqrt{5})^2 = 5\\pi$.',
      ],
      solutionFigure: FIGURES.SOL_Q12,
      trap: 'A circle of radius $2$ (area $4\\pi$) fits, but it is not the largest. The corners are $\\sqrt{5}$ away, a little more than $2$.',
    },

    // ── 13 ───────────────────────────────────────────────────────────────────
    {
      id: 'q13',
      topic: 'Number',
      text: 'Each of the even numbers 2, 4, 6, …, 50 is divided by 7, and the remainder is written down. Which histogram shows how many times each remainder occurs?',
      figure: FIGURES.Q13,
      choices: ['Histogram A', 'Histogram B', 'Histogram C', 'Histogram D', 'Histogram E'],
      correct: 'A',
      hint: 'Write the first few remainders: 2, 4, 6, 1, … When does the list start to repeat?',
      idea: 'Remainders repeat in a cycle. Count the whole cycles, then the ones left over.',
      solution: [
        'The remainders of $2, 4, 6, 8, 10, 12, 14$ are $2, 4, 6, 1, 3, 5, 0$: each remainder once.',
        'The next seven even numbers repeat the cycle, because adding $14$ does not change a remainder.',
        'There are $25$ even numbers from $2$ to $50$: $3$ full cycles ($21$ numbers, up to $42$), then $44, 46, 48, 50$.',
        'Those four have remainders $2, 4, 6, 1$. So remainders $1, 2, 4, 6$ occur $4$ times, and $0, 3, 5$ occur $3$ times.',
        'That is histogram A.',
      ],
      trap: 'Guessing that the four extra numbers give remainders $1, 2, 3, 4$ (histogram C). The cycle runs $2, 4, 6, 1, \\ldots$ — list the actual leftovers.',
    },

    // ── 14 ───────────────────────────────────────────────────────────────────
    {
      id: 'q14',
      topic: 'Algebra',
      text: 'A number $N$ is added to the list 2, 6, 7, 7, 28. Now the mean of the list is twice its median. What is $N$?',
      choices: ['$7$', '$14$', '$20$', '$28$', '$34$'],
      correct: 'E',
      hint: 'With six numbers, the median is the average of the middle two. If $N$ is at least 7, what are the middle two?',
      idea: 'Find the median first, since it hardly moves. Then the mean it needs tells you the total.',
      solution: [
        'The list adds to $2 + 6 + 7 + 7 + 28 = 50$. With $N$ there are $6$ numbers, so the mean is $\\dfrac{50 + N}{6}$.',
        'If $N$ is $7$ or more, the middle two numbers are $7$ and $7$, so the median is $7$ and the mean must be $14$.',
        '$\\dfrac{50 + N}{6} = 14$ gives $50 + N = 84$, so $N = 34$.',
        'If $N$ were less than $7$, the median would be $6.5$ and the mean would have to be $13$, which needs $N = 28$ — not less than $7$. So $N = 34$ is the only answer.',
      ],
      tip: 'Check: $2, 6, 7, 7, 28, 34$ has median $7$ and mean $\\dfrac{84}{6} = 14 = 2 \\times 7$.',
    },

    // ── 15 ───────────────────────────────────────────────────────────────────
    {
      id: 'q15',
      topic: 'Counting',
      text: 'Kei draws a 6-by-6 grid. He colors 13 of the squares silver and the rest gold. Then he folds the grid in half along the dashed line, so the squares land on top of each other in pairs. Let $m$ be the least possible number of gold-on-gold pairs, and $M$ the greatest possible number. What is $m + M$?',
      figure: FIGURES.Q15,
      choices: ['$12$', '$14$', '$16$', '$18$', '$20$'],
      correct: 'C',
      hint: 'There are 18 pairs. For many gold-on-gold pairs, put the silver squares together. For few, spread them out.',
      idea: 'Push to the extreme twice: pack the silver squares for the most gold pairs, and spread them out for the fewest.',
      solution: [
        'The fold makes $36 \\div 2 = 18$ pairs. There are $13$ silver squares and $36 - 13 = 23$ gold ones.',
        '**Most gold-on-gold:** pair silver with silver as often as possible. $6$ silver pairs use $12$ silver squares, and the last silver square lands on a gold one. That leaves $18 - 7 = 11$ gold-on-gold pairs, so $M = 11$.',
        '**Fewest gold-on-gold:** give every silver square a pair of its own. Then $13$ pairs are silver-on-gold, using $13$ gold squares. The other $23 - 13 = 10$ gold squares make $5$ pairs, so $m = 5$.',
        '$m + M = 5 + 11 = 16$.',
      ],
      tip: 'Check that each count uses all 18 pairs: $6 + 1 + 11 = 18$, and $13 + 5 = 18$.',
    },

    // ── 16 ───────────────────────────────────────────────────────────────────
    {
      id: 'q16',
      topic: 'Number',
      text: 'Five different integers are chosen from 1 to 10, and five different integers are chosen from 11 to 20. No two of the ten chosen numbers differ by exactly 10. What is the sum of the ten chosen numbers?',
      choices: ['$95$', '$100$', '$105$', '$110$', '$115$'],
      correct: 'C',
      hint: 'Pair each number from 1 to 10 with the number 10 more than it. How many numbers can be chosen from each pair?',
      idea: 'Pair things up: 1 with 11, 2 with 12, …, 10 with 20. Exactly one number comes from each pair.',
      solution: [
        'Put the numbers in $10$ pairs: $(1, 11), (2, 12), \\ldots, (10, 20)$.',
        'The two numbers of a pair differ by $10$, so at most one of each pair is chosen. Ten numbers from ten pairs means exactly one from each.',
        'Start from the small number of every pair, $1 + 2 + \\cdots + 10 = 55$. Five times the big number was taken instead, which adds $10$ each time.',
        'Sum $= 55 + 5 \\times 10 = 105$.',
      ],
      tip: 'Check with one choice: $1, 2, 3, 4, 5$ and $16, 17, 18, 19, 20$ add to $15 + 90 = 105$.',
    },

    // ── 17 ───────────────────────────────────────────────────────────────────
    {
      id: 'q17',
      topic: 'Algebra',
      text: 'The land of Markovia has three cities, $A$, $B$ and $C$. There are 100 people living in $A$, 120 in $B$ and 160 in $C$. Everyone works in one of the three cities, which may be the city they live in. In the figure, an arrow from one city to another is labeled with the fraction of the people who live in the first city and work in the second. (For example, $\\tfrac{1}{4}$ of the people who live in $A$ work in $B$.) How many people work in $A$?',
      figure: FIGURES.Q17,
      choices: ['$55$', '$60$', '$85$', '$115$', '$160$'],
      correct: 'D',
      hint: 'Three groups work in $A$: people from $B$, people from $C$, and the people of $A$ who stay. Which arrows point into $A$?',
      idea: 'Add the people coming in to the people who stay. The ones who stay are what is left after the arrows going out.',
      solution: [
        'Arrows into $A$: $\\tfrac{1}{3}$ of $B$ is $\\tfrac{1}{3} \\times 120 = 40$, and $\\tfrac{1}{8}$ of $C$ is $\\tfrac{1}{8} \\times 160 = 20$.',
        'Arrows out of $A$: $\\tfrac{1}{4}$ of $100$ go to $B$ and $\\tfrac{1}{5}$ of $100$ go to $C$, which is $25 + 20 = 45$ people. So $100 - 45 = 55$ people live and work in $A$.',
        'Total working in $A$: $55 + 40 + 20 = 115$.',
      ],
      trap: 'Answering $55$: that is only the people of $A$ who stay. The $40$ from $B$ and the $20$ from $C$ work in $A$ too.',
    },

    // ── 18 ───────────────────────────────────────────────────────────────────
    {
      id: 'q18',
      topic: 'Geometry',
      text: 'The circle on the left has radius 1, and the region between it and the square drawn inside it is shaded. The circle on the right has radius $R$, and only one quarter of the region between it and its square is shaded. The two shaded regions have the same area. What is $R$?',
      figure: FIGURES.Q18,
      choices: ['$\\sqrt{2}$', '$2$', '$2\\sqrt{2}$', '$4$', '$4\\sqrt{2}$'],
      correct: 'B',
      hint: 'Each shaded area is a circle minus a square. How big is a square whose corners are on a circle of radius $r$?',
      idea: 'A square inside a circle has a diameter for its diagonal, so its area is $2r^2$.',
      solution: [
        'A square with its corners on a circle of radius $r$ has diagonals of length $2r$, so its area is $\\dfrac{2r \\times 2r}{2} = 2r^2$.',
        'Left: shaded $= \\pi \\times 1^2 - 2 \\times 1^2 = \\pi - 2$.',
        'Right: the whole gap is $\\pi R^2 - 2R^2 = R^2(\\pi - 2)$, and a quarter of it is shaded: $\\dfrac{R^2(\\pi - 2)}{4}$.',
        'They are equal, so $\\dfrac{R^2}{4} = 1$. Then $R^2 = 4$ and $R = 2$.',
      ],
      trap: 'Answering $4$: the right circle needs $4$ times the **area**, but area grows as $R^2$, so the radius only doubles.',
    },

    // ── 19 ───────────────────────────────────────────────────────────────────
    {
      id: 'q19',
      topic: 'Algebra',
      text: 'Towns $A$ and $B$ are joined by a straight road 15 miles long. Going from $A$ to $B$, the speed limit changes every 5 miles: it is 25, then 40, then 20 miles per hour. Two cars set off at the same moment, one from $A$ and one from $B$, and drive toward each other at exactly the speed limit the whole way. How far from $A$, in miles, do they meet?',
      figure: FIGURES.Q19,
      choices: ['$7.75$', '$8$', '$8.25$', '$8.5$', '$8.75$'],
      correct: 'D',
      hint: 'Follow the clock. Which car finishes its first 5 miles first, and where is the other car at that moment?',
      idea: 'Distance = speed × time, one stretch at a time, with both cars on the same clock.',
      solution: [
        'The car from $A$ drives its first $5$ miles at $25$ mph, which takes $\\dfrac{5}{25} = \\dfrac{1}{5}$ hour, or $12$ minutes.',
        'In those $12$ minutes the car from $B$, at $20$ mph, goes $4$ miles. It is now $11$ miles from $A$.',
        'The car from $B$ needs $1$ more mile at $20$ mph, which takes $3$ minutes. In those $3$ minutes the car from $A$, now at $40$ mph, goes $2$ miles, to mile $7$.',
        'Both cars are now in the $40$ mph stretch, at miles $7$ and $10$. They drive at the same speed, so they meet halfway between: $1.5$ miles on from mile $7$.',
        'They meet $7 + 1.5 = 8.5$ miles from $A$.',
      ],
      tip: 'Check from the other end: the car from $B$ drives $5$ miles, then $1.5$ more, which is $6.5$ miles from $B$ and $15 - 6.5 = 8.5$ from $A$.',
    },

    // ── 20 ───────────────────────────────────────────────────────────────────
    {
      id: 'q20',
      topic: 'Algebra',
      text: 'Sarika, Dev and Rajiv share a large block of cheese. They take turns, and on each turn the person cuts off half of what is left and eats it: first Sarika, then Dev, then Rajiv, then Sarika again, and so on, until the cheese is too small to see. About what fraction of the whole block does Sarika eat?',
      choices: ['$\\dfrac{4}{7}$', '$\\dfrac{3}{5}$', '$\\dfrac{2}{3}$', '$\\dfrac{3}{4}$', '$\\dfrac{7}{8}$'],
      correct: 'A',
      hint: 'Compare what the three eat in one round. How does each share compare with the one before it?',
      idea: 'Each person always eats half as much as the person before, so the whole block splits in the ratio $4 : 2 : 1$.',
      solution: [
        'In the first round Sarika eats $\\tfrac{1}{2}$, Dev eats $\\tfrac{1}{4}$ and Rajiv eats $\\tfrac{1}{8}$.',
        'Every later round is the same, only smaller: each person eats half of what the person before just ate.',
        'So their totals are in the ratio $4 : 2 : 1$, which is $7$ equal parts.',
        'Sarika eats about $\\dfrac{4}{7}$ of the block.',
      ],
      tip: 'Check: $\\dfrac{4}{7} + \\dfrac{2}{7} + \\dfrac{1}{7} = 1$, so the three shares use up the whole block.',
    },

    // ── 21 ───────────────────────────────────────────────────────────────────
    {
      id: 'q21',
      topic: 'Counting',
      text: 'The Konigsberg School gives the grades 1 to 7 to its pods $A$ to $G$, one grade to each pod. Some pods are joined by walkways, as the figure shows. Any two pods joined by a walkway have grades that differ by 2 or more. (For example, grades 1 and 2 are never in two pods joined by a walkway.) What is the sum of the grades of pods $C$, $E$ and $F$?',
      figure: FIGURES.Q21,
      choices: ['$12$', '$13$', '$14$', '$15$', '$16$'],
      correct: 'A',
      hint: 'Find four pods that are all joined to one another. Which four grades from 1 to 7 could they have?',
      idea: 'Start with the most joined-up group. Four pods all joined to each other need four grades with no two next to each other: only 1, 3, 5, 7.',
      solution: [
        'Pods $A$, $B$, $C$ and $F$ are all joined to one another. No two of their grades can be next to each other, and the only four such grades from $1$ to $7$ are $1, 3, 5, 7$. So $D$, $E$ and $G$ get $2$, $4$ and $6$.',
        '**If $E = 2$:** $E$ is joined to $C$ and $F$, so they are not $1$ or $3$: they are $5$ and $7$. Then $D$ (joined to $C$) and $G$ (joined to $F$) share $4$ and $6$ — and $6$ is next to both $5$ and $7$. Impossible.',
        '**If $E = 6$:** the same thing upside down: $C$ and $F$ are $1$ and $3$, and $2$ clashes with both. Impossible.',
        'So $E = 4$, and $C$ and $F$ are not $3$ or $5$: they are $1$ and $7$.',
        '$C + E + F = 1 + 4 + 7 = 12$. (One full answer: $A = 5$, $B = 3$, $C = 1$, $D = 6$, $E = 4$, $F = 7$, $G = 2$.)',
      ],
      tip: 'The sum is the same in every way of giving out the grades, so one complete example that follows every rule is a good check.',
    },

    // ── 22 ───────────────────────────────────────────────────────────────────
    {
      id: 'q22',
      topic: 'Counting',
      text: 'A classroom has a row of 35 coat hooks. Paulina likes coats evenly spaced: the same number of empty hooks before the first coat, between each coat and the next, and after the last coat. There is at least 1 coat and at least 1 empty hook. How many different numbers of coats fit her pattern?',
      figure: FIGURES.Q22,
      choices: ['$2$', '$4$', '$5$', '$7$', '$9$'],
      correct: 'D',
      hint: 'With $c$ coats and $g$ empty hooks in each gap, how many gaps are there? Write an equation for the 35 hooks.',
      idea: 'Turn it into a product: $c$ coats and $c + 1$ gaps give $(c + 1)(g + 1) = 36$. Then count factor pairs.',
      solution: [
        'With $c$ coats there are $c + 1$ gaps (before, between and after), each with $g$ empty hooks: $c + (c + 1)g = 35$.',
        'Add $1$ to both sides: $(c + 1) + (c + 1)g = 36$, which is $(c + 1)(g + 1) = 36$.',
        'At least $1$ coat and $1$ empty hook means both factors are at least $2$. So $c + 1$ is $2, 3, 4, 6, 9, 12$ or $18$.',
        'That is $7$ numbers of coats: $1, 2, 3, 5, 8, 11$ and $17$.',
      ],
      trap: 'Counting all $9$ factors of $36$ includes $c + 1 = 1$ (no coats) and $c + 1 = 36$ (no empty hooks), which the rules do not allow.',
    },

    // ── 23 ───────────────────────────────────────────────────────────────────
    {
      id: 'q23',
      topic: 'Number',
      text: 'How many four-digit numbers have all three of these properties?\n\n• Its tens digit and ones digit are both 9.\n• It is 1 less than a perfect square.\n• It is the product of exactly two prime numbers.',
      choices: ['$0$', '$1$', '$2$', '$3$', '$4$'],
      correct: 'B',
      hint: 'A number 1 less than a square is $k^2 - 1$, which factors as $(k - 1)(k + 1)$. What must $k$ be for $k^2 - 1$ to end in 99?',
      idea: 'One less than a square factors: $k^2 - 1 = (k - 1)(k + 1)$. For a product of exactly two primes, both factors must be prime.',
      solution: [
        'The number ends in $99$, so the square ends in $00$. That happens only when $k$ is a multiple of $10$.',
        'Four digits means $k^2 - 1$ is from $1000$ to $9999$, so $k$ is $40, 50, 60, 70, 80, 90$ or $100$.',
        'Since $k^2 - 1 = (k - 1)(k + 1)$, both $k - 1$ and $k + 1$ must be prime.',
        'The pairs are $39$ and $41$, $49$ and $51$, $59$ and $61$, $69$ and $71$, $79$ and $81$, $89$ and $91$, $99$ and $101$. Only $59$ and $61$ are both prime ($39 = 3 \\times 13$, $49 = 7 \\times 7$, $69 = 3 \\times 23$, $81 = 9 \\times 9$, $91 = 7 \\times 13$, $99 = 9 \\times 11$).',
        'So there is $1$ such number: $60^2 - 1 = 3599 = 59 \\times 61$.',
      ],
      trap: '$91$ looks prime, but $91 = 7 \\times 13$. So $8099 = 89 \\times 91$ is a product of three primes and does not count.',
    },

    // ── 24 ───────────────────────────────────────────────────────────────────
    {
      id: 'q24',
      topic: 'Geometry',
      text: 'In trapezoid $ABCD$, angles $B$ and $C$ are both $60^\\circ$, and $AB = DC$. All four sides have whole-number lengths, and the perimeter is 30. How many different trapezoids fit these facts? (Two trapezoids of the same shape and size count once.)',
      figure: FIGURES.Q24,
      choices: ['$0$', '$1$', '$2$', '$3$', '$4$'],
      correct: 'E',
      hint: 'With $60^\\circ$ angles at the bottom, how much longer is $BC$ than $AD$? Try drawing a line from $A$ parallel to $DC$.',
      idea: 'With $60^\\circ$ base angles, the long base is the short base plus one slanted side. Write the perimeter with two letters and count the whole-number answers.',
      solution: [
        'Let each slanted side be $s$ and the top $AD$ be $a$.',
        'A line from $A$ parallel to $DC$ cuts off a triangle with two $60^\\circ$ angles — an equilateral triangle with side $s$. So $BC = a + s$.',
        'Perimeter: $s + a + s + (a + s) = 3s + 2a = 30$.',
        '$2a = 30 - 3s$ must be positive and even, so $s$ is even and less than $10$: $s = 2, 4, 6, 8$, giving $a = 12, 9, 6, 3$.',
        'That is $4$ trapezoids.',
      ],
      tip: 'Check one: $s = 4$ and $a = 9$ give sides $4, 9, 4, 13$, and $4 + 9 + 4 + 13 = 30$.',
    },

    // ── 25 ───────────────────────────────────────────────────────────────────
    {
      id: 'q25',
      topic: 'Counting',
      text: 'Makayla draws paths on a 5-by-5 diamond-shaped grid. Each path starts at the bottom point and ends at the top point, and every step goes one unit northeast (up and right) or northwest (up and left). For each path she finds the area of the region between the path and the right side of the grid. Two examples are shown. What is the sum of the areas for all possible paths?',
      figure: FIGURES.Q25,
      choices: ['$2520$', '$3150$', '$3840$', '$4730$', '$5050$'],
      correct: 'B',
      hint: 'Pair each path with its mirror image in the line through the top and bottom points. What do the two areas add up to?',
      idea: 'Pair things up: a path and its mirror image share the 25 squares between them, so every pair of areas adds to 25.',
      solution: [
        'Every path has $5$ northeast and $5$ northwest steps in some order. Choosing which $5$ of the $10$ steps go northeast can be done in $252$ ways, so there are $252$ paths.',
        'Reflect a path in the vertical line through the top and bottom points. The area to the right of the new path is the area to the left of the old one.',
        'So a path and its mirror image have areas that add to the whole grid, $25$. On average, a path has area $12.5$.',
        'Sum of all the areas $= 252 \\times 12.5 = 3150$.',
      ],
      tip: 'The examples agree: the mirror image of the area-$11$ path has area $25 - 11 = 14$.',
    },
  ],
};
