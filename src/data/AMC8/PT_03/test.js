// src/data/AMC8/PT_03/test.js
// Practice Test 3 — the 25 problems of the 2026 AMC 8, for the Practice Test
// task (src/tasks/AmcTest.jsx) and the Review task (src/tasks/AmcReview.jsx).
//
// THE MATHEMATICS IS THE CONTEST'S; THE WORDS ARE OURS. Every problem keeps the
// numbers, the names, the five choices and the order of the 2026 paper, so a
// score here means what a score there means. The wording is rewritten, the
// figures are redrawn (figures.js), and every hint and solution is written for
// this unit. Every answer was worked before the key was trusted, then compared
// letter by letter with the key printed with the paper:
//   A C D E B · E C D B A · B D A B A · D A B D D · B A C E E
//
// Item shape: see src/data/AMC8/PT_01/test.js. `npm run validate` runs
// utils/amcTest.js over this file.
import { FIGURES } from './figures.js';

export const amcTest = {
  title: 'Practice Test 3',
  source: 'The problems of the 2026 AMC 8',
  minutes: 40,
  // The 2026 contest's award lines, as reported by AoPS (historical results),
  // Think Academy and Cuemath: Honor Roll 21, Distinguished Honor Roll 24.
  // Checked 2026-11-12 against those secondary sources, not an MAA page.
  awards: [
    { score: 24, label: 'Distinguished Honor Roll', note: 'top 1%' },
    { score: 21, label: 'Honor Roll', note: 'top 5%' },
  ],

  problems: [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
      id: 'q1',
      topic: 'Number',
      text: 'What is the value of this expression?\n\n$$1 + 2 - 3 + 4 + 5 - 6 + 7 + 8 - 9 + 10 + 11 - 12$$',
      choices: ['$18$', '$21$', '$24$', '$27$', '$30$'],
      correct: 'A',
      hint: 'The signs repeat: plus, plus, minus. Work it out three numbers at a time.',
      idea: 'Look for the pattern and group: every block of three is two numbers added and the third taken away.',
      solution: [
        'Group in threes: $(1 + 2 - 3)$, $(4 + 5 - 6)$, $(7 + 8 - 9)$, $(10 + 11 - 12)$.',
        'The groups are worth $0$, $3$, $6$ and $9$.',
        'Add them: $0 + 3 + 6 + 9 = 18$.',
      ],
      tip: 'Another way: add all twelve numbers to get $78$, then take away twice the numbers with a minus sign: $78 - 2 \\times (3 + 6 + 9 + 12) = 78 - 60 = 18$.',
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
      id: 'q2',
      topic: 'Number',
      text: 'In the array shown, three 3s are surrounded by 2s, and the 2s are surrounded by a border of 1s. What is the sum of all the numbers in the array?',
      figure: FIGURES.Q2,
      choices: ['$49$', '$51$', '$53$', '$55$', '$57$'],
      correct: 'C',
      hint: 'How many numbers are there altogether? How many of them are 3s, and how many are 2s?',
      idea: 'Count each kind of number, working from the inside out, then multiply and add.',
      solution: [
        'The array has $5$ rows of $7$: $35$ numbers.',
        'The inside block, without the border, is $3$ rows of $5$: $15$ numbers. So the border has $35 - 15 = 20$ ones.',
        'Of the $15$ inside numbers, $3$ are 3s, so $12$ are 2s.',
        'Sum: $20 \\times 1 + 12 \\times 2 + 3 \\times 3 = 20 + 24 + 9 = 53$.',
      ],
      tip: 'A layer trick: start with 1 in all $35$ places (35), add 1 more for each of the $15$ inside places (50), and 1 more again for the three middle places (53).',
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
      id: 'q3',
      topic: 'Geometry',
      text: 'Haruki has a piece of wire 24 centimeters long. He wants to bend it into each of these shapes, one at a time:\n\n• a regular hexagon with sides of length 5 cm\n• a square with an area of 36 cm²\n• a right triangle whose legs are 6 cm and 8 cm long\n\nWhich of the shapes can Haruki make?',
      choices: ['Triangle only', 'Hexagon and square only', 'Hexagon and triangle only', 'Square and triangle only', 'Hexagon, triangle, and square'],
      correct: 'D',
      hint: 'The wire goes all the way around the shape. What must the perimeter of each shape be?',
      idea: 'The wire is the perimeter. Find the perimeter of each shape and compare it with 24.',
      solution: [
        'Hexagon: $6 \\times 5 = 30$ cm. That is more than 24, so he cannot make it.',
        'Square: an area of $36$ means a side of $6$, so the perimeter is $4 \\times 6 = 24$ cm. He can make it.',
        'Triangle: the third side is $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$, so the perimeter is $6 + 8 + 10 = 24$ cm. He can make it.',
        'So he can make the square and the triangle only.',
      ],
      trap: 'The triangle has three sides, not two. Adding only the legs gives 14 and hides the fact that the perimeter is exactly 24. The legs 6 and 8 belong to the 6-8-10 right triangle.',
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
      id: 'q4',
      topic: 'Algebra',
      text: 'The savings of Brynn went down by 20% in July, and then went up by 50% in August. The savings are now what percent of the original amount?',
      choices: ['$80$', '$90$', '$100$', '$110$', '$120$'],
      correct: 'E',
      hint: 'Try it with $100$ to start. What is left after July? What is 50% of that amount?',
      idea: 'A percent change is a multiplication. Down 20% is $\\times 0.8$, and up 50% is $\\times 1.5$.',
      solution: [
        'Start with $100$. After July: $100 \\times 0.8 = 80$.',
        'After August: $80 \\times 1.5 = 120$.',
        '$120$ out of the original $100$ is $120\\%$.',
      ],
      trap: 'Adding the percents gives $-20 + 50 = +30$, or $130\\%$, which is not even a choice. The 50% is taken of the smaller July amount, 80, so it adds only 40.',
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
      id: 'q5',
      topic: 'Algebra',
      text: 'Casey went on a road trip of 100 miles and stopped only once, for lunch. The whole trip took 3 hours, and her average speed while she was driving was 40 miles per hour. How long was the lunch break, in minutes?',
      choices: ['$15$', '$30$', '$40$', '$45$', '$60$'],
      correct: 'B',
      hint: 'How long does it take to drive 100 miles at 40 miles per hour?',
      idea: 'Time = distance ÷ speed. The driving time and the break add up to the whole trip.',
      solution: [
        'Driving time: $100 \\div 40 = 2.5$ hours.',
        'The break is the rest of the 3 hours: $3 - 2.5 = 0.5$ hours.',
        'Half an hour is $30$ minutes.',
      ],
      trap: 'Watch the units at the end: $0.5$ hours is 30 minutes, not 50 minutes.',
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
      id: 'q6',
      topic: 'Geometry',
      text: 'Peter lives next to a rectangular field full of blackberry bushes. The field is 10 meters long and 8 meters wide. Peter can reach every blackberry that is within 1 meter of an edge of the field: the shaded part of the figure. What fraction of the area of the field can Peter reach?',
      figure: FIGURES.Q6,
      choices: ['$\\dfrac{1}{6}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{3}$', '$\\dfrac{3}{8}$', '$\\dfrac{2}{5}$'],
      correct: 'E',
      hint: 'The part he cannot reach is a smaller rectangle in the middle. How long and how wide is it?',
      idea: 'Whole minus hole: the strip is the whole field minus the rectangle in the middle.',
      solution: [
        'The whole field: $10 \\times 8 = 80$ square meters.',
        'The middle rectangle loses 1 meter on every side, so it is $8$ by $6$: $48$ square meters.',
        'The strip he can reach: $80 - 48 = 32$ square meters.',
        'As a fraction: $\\dfrac{32}{80} = \\dfrac{2}{5}$.',
      ],
      trap: 'The middle rectangle is 2 meters shorter each way, not 1: a meter comes off both ends. Using $9 \\times 7 = 63$ gives $\\dfrac{17}{80}$, which is not a choice.',
    },

    // ── 7 ────────────────────────────────────────────────────────────────────
    {
      id: 'q7',
      topic: 'Algebra',
      text: 'Mika wants to estimate how far a new electric bike can go on a fully charged battery. She made two trips, 40 miles in total. The first trip used $\\dfrac{1}{2}$ of the full battery power, and the second trip used $\\dfrac{3}{10}$ of the full battery power. How many miles can the bike go on a fully charged battery?',
      choices: ['$45$', '$48$', '$50$', '$52$', '$55$'],
      correct: 'C',
      hint: 'What fraction of the battery did the two trips use together?',
      idea: 'A part tells you the whole: find what fraction the 40 miles is, then find one piece, then all the pieces.',
      solution: [
        'Together the trips used $\\dfrac{1}{2} + \\dfrac{3}{10} = \\dfrac{5}{10} + \\dfrac{3}{10} = \\dfrac{8}{10} = \\dfrac{4}{5}$ of the battery.',
        'So $\\dfrac{4}{5}$ of a full battery is $40$ miles, and $\\dfrac{1}{5}$ is $10$ miles.',
        'A full battery is $5 \\times 10 = 50$ miles.',
      ],
      tip: 'Check: half of 50 is 25 miles, and three tenths of 50 is 15 miles. $25 + 15 = 40$.',
    },

    // ── 8 ────────────────────────────────────────────────────────────────────
    {
      id: 'q8',
      topic: 'Number',
      text: 'A poll asked a number of people whether they liked solving mathematics problems. Exactly 74% answered "yes." What is the fewest people that could have been asked?',
      choices: ['$10$', '$20$', '$25$', '$50$', '$100$'],
      correct: 'D',
      hint: 'Write 74% as a fraction and simplify it. What does the bottom number tell you?',
      idea: 'A percent is a fraction of people. In lowest terms, its bottom number is the smallest group that works.',
      solution: [
        '$74\\% = \\dfrac{74}{100} = \\dfrac{37}{50}$.',
        '$37$ is prime, so the fraction cannot be simplified any more.',
        'The number of people must be a multiple of $50$, so the fewest is $50$ (with $37$ saying yes).',
      ],
      tip: 'You can also test the choices from the smallest: 74% of 10, 20 and 25 are 7.4, 14.8 and 18.5, which are not whole numbers of people. 74% of 50 is 37.',
    },

    // ── 9 ────────────────────────────────────────────────────────────────────
    {
      id: 'q9',
      topic: 'Number',
      text: 'What is the value of this expression?\n\n$$\\dfrac{\\sqrt{16\\sqrt{81}}}{\\sqrt{81\\sqrt{16}}}$$',
      choices: ['$\\dfrac{4}{9}$', '$\\dfrac{2}{3}$', '$1$', '$\\dfrac{3}{2}$', '$\\dfrac{9}{4}$'],
      correct: 'B',
      hint: 'Start with the square roots on the inside: $\\sqrt{81}$ and $\\sqrt{16}$.',
      idea: 'Work from the inside out, one square root at a time.',
      solution: [
        'Inside: $\\sqrt{81} = 9$ and $\\sqrt{16} = 4$.',
        'Top: $\\sqrt{16 \\times 9} = \\sqrt{144} = 12$.',
        'Bottom: $\\sqrt{81 \\times 4} = \\sqrt{324} = 18$.',
        '$\\dfrac{12}{18} = \\dfrac{2}{3}$.',
      ],
      trap: 'The top and bottom use the same two numbers, 16 and 81, so it is tempting to say they cancel and the answer is 1. They are in different places, so they do not.',
    },

    // ── 10 ───────────────────────────────────────────────────────────────────
    {
      id: 'q10',
      topic: 'Algebra',
      text: 'Five runners finished the grueling Xmarathon: Luke, Melina, Nico, Olympia, and Pedro.\n\n• Nico finished 11 minutes behind Pedro.\n• Olympia finished 2 minutes ahead of Melina, but 3 minutes behind Pedro.\n• Olympia finished 6 minutes ahead of Luke.\n\nWhich runner finished fourth?',
      choices: ['Luke', 'Melina', 'Nico', 'Olympia', 'Pedro'],
      correct: 'A',
      hint: 'Put Pedro at 0 minutes. How many minutes after Pedro did each of the others finish?',
      idea: 'Pick one runner as zero and write every other finish as minutes after that runner.',
      solution: [
        'Let Pedro finish at minute $0$. Nico is $11$ minutes behind: $11$.',
        'Olympia is $3$ behind Pedro: $3$. Melina is $2$ behind Olympia: $5$.',
        'Luke is $6$ behind Olympia: $9$.',
        'In order: Pedro $0$, Olympia $3$, Melina $5$, Luke $9$, Nico $11$. Fourth is Luke.',
      ],
      trap: '"Ahead of" and "behind" are easy to swap. Olympia is ahead of Melina, so Melina has the later time.',
    },

    // ── 11 ───────────────────────────────────────────────────────────────────
    {
      id: 'q11',
      topic: 'Geometry',
      text: 'Squares with sides of length 1, 1, 2, 3, and 5 are put together to make the rectangle shown. A curve is drawn by putting a quarter circle in each square and joining the quarter circles in order, from the shortest to the longest. What is the length of the curve?',
      figure: FIGURES.Q11,
      choices: ['$4\\pi$', '$6\\pi$', '$\\dfrac{13}{2}\\pi$', '$8\\pi$', '$13\\pi$'],
      correct: 'B',
      hint: 'How long is a quarter of a circle of radius $r$?',
      idea: 'A quarter circle of radius $r$ has length $\\dfrac{1}{4} \\times 2\\pi r = \\dfrac{\\pi r}{2}$. Add the radii first.',
      solution: [
        'Each quarter circle has the side of its square as its radius: $1$, $1$, $2$, $3$ and $5$.',
        'A quarter circle of radius $r$ has length $\\dfrac{\\pi r}{2}$.',
        'The radii add up to $1 + 1 + 2 + 3 + 5 = 12$.',
        'Length: $\\dfrac{\\pi}{2} \\times 12 = 6\\pi$.',
      ],
      trap: 'Using the area formula, or forgetting the quarter, gives the larger choices. A full circle of radius 12 would be $24\\pi$; a quarter of that is $6\\pi$.',
    },

    // ── 12 ───────────────────────────────────────────────────────────────────
    {
      id: 'q12',
      topic: 'Algebra',
      text: 'Each circle in the figure will be filled with a digit from 1 to 6, and each digit is used exactly once. The box between two neighboring circles shows the sum of their two digits. Which digit must go in the top circle?',
      figure: FIGURES.Q12,
      choices: ['$2$', '$3$', '$4$', '$5$', 'it is impossible to fill the circles'],
      correct: 'D',
      hint: 'Start with the smallest sum, 4. Which two different digits can make it?',
      idea: 'Start where there is the least choice: a sum of 4 from two different digits can only be 1 and 3.',
      solution: [
        'The sum $4$ is on the right side, between the lower right circle and the circle above it. Those two digits are $1$ and $3$.',
        'The lower right circle also makes $5$ with the bottom middle circle. If it were $1$, the middle would be $4$, and then the lower left would be $8 - 4 = 4$ again. So the lower right circle is $3$.',
        'Then the bottom middle is $5 - 3 = 2$, the lower left is $8 - 2 = 6$, and the circle above it is $10 - 6 = 4$.',
        'The right circle is $4 - 3 = 1$, so the top is $6 - 1 = 5$. Check the last box: $5 + 4 = 9$.',
      ],
      tip: 'Check that every digit from 1 to 6 is used once: going around, the circles hold 5, 4, 6, 2, 3, 1.',
    },

    // ── 13 ───────────────────────────────────────────────────────────────────
    {
      id: 'q13',
      topic: 'Geometry',
      text: 'The figure shows a tiling of $1 \\times 1$ unit squares. Each row of unit squares is shifted sideways by half a unit from the row above it. A shaded square is drawn on top of the tiling, and each of its vertices is a vertex of one of the unit squares. What is the area of the shaded square, in square units?',
      figure: FIGURES.Q13,
      choices: ['$10$', '$\\dfrac{21}{2}$', '$\\dfrac{32}{3}$', '$11$', '$\\dfrac{34}{3}$'],
      correct: 'A',
      hint: 'Look at one side of the shaded square. How far across does it go, and how far down?',
      idea: 'A tilted square: one side is the long side of a right triangle, so the area is $a^2 + b^2$.',
      solution: [
        'Follow the top left side of the square from its left end to its top end: it goes $3$ units across and $1$ unit up.',
        'That side is the hypotenuse of a right triangle with legs $3$ and $1$.',
        'By the Pythagorean theorem, the side squared is $3^2 + 1^2 = 10$.',
        'The area of a square is its side squared, so the area is $10$.',
      ],
      trap: 'Counting the small squares inside is slow and unsafe here, because the shifted rows cut them into odd pieces. Count the run and the rise of one side instead: the rows are 1 unit tall, and the marks on a line are half a unit apart.',
    },

    // ── 14 ───────────────────────────────────────────────────────────────────
    {
      id: 'q14',
      topic: 'Algebra',
      text: 'Jami picked three equally spaced integers on the number line. The sum of the first and second numbers is 40, and the sum of the second and third numbers is 60. What is the sum of all three numbers?',
      choices: ['$70$', '$75$', '$80$', '$85$', '$90$'],
      correct: 'B',
      hint: 'Add the two sums together. Which number has been counted twice?',
      idea: 'For equally spaced numbers, the middle one is the average, so the first and third add up to twice the middle.',
      solution: [
        'Add the two sums: first + second + second + third $= 40 + 60 = 100$.',
        'The numbers are equally spaced, so first + third is twice the second. That makes the $100$ four times the second number.',
        'The second number is $100 \\div 4 = 25$.',
        'The sum of all three is three times the middle: $3 \\times 25 = 75$.',
      ],
      tip: 'The numbers are 15, 25 and 35. Check: $15 + 25 = 40$ and $25 + 35 = 60$.',
    },

    // ── 15 ───────────────────────────────────────────────────────────────────
    {
      id: 'q15',
      topic: 'Geometry',
      text: 'Elijah has a large collection of identical wooden cubes. Each cube is white on 4 faces and gray on 2 faces that share an edge. He glues some cubes together, face to face. The figure shows 2 cubes being glued together, leaving 3 gray faces visible. What is the fewest cubes he could glue together so that no gray face is visible, however the figure is turned?',
      figure: FIGURES.Q15,
      choices: ['$4$', '$6$', '$8$', '$9$', '$27$'],
      correct: 'A',
      hint: 'Each cube must hide both of its gray faces. So how many other cubes must every cube touch, and where?',
      idea: 'Every cube needs two neighbors, glued on two faces that share an edge. Find the smallest shape where that is true for all the cubes.',
      solution: [
        'A gray face is hidden only when another cube is glued onto it. So every cube needs a cube on each of its 2 gray faces.',
        'Those two faces share an edge, so each cube needs two neighbors that are "around a corner" from each other, not on opposite sides.',
        'With 2 cubes, each has only one neighbor. With 3 cubes in an L-shape, the two end cubes have only one neighbor each.',
        'Four cubes in a $2 \\times 2$ square work: every cube touches two others, on faces that share an edge. Turn each cube so those are its gray faces. The fewest is $4$.',
      ],
      trap: 'A $2 \\times 2 \\times 2$ block of 8 also hides every gray face, but the question asks for the fewest. Always try the small cases first.',
    },

    // ── 16 ───────────────────────────────────────────────────────────────────
    {
      id: 'q16',
      topic: 'Counting',
      text: 'Consider all the positive four-digit integers that have only even digits. What fraction of these integers are divisible by 4?',
      choices: ['$\\dfrac{1}{4}$', '$\\dfrac{2}{5}$', '$\\dfrac{1}{2}$', '$\\dfrac{3}{5}$', '$\\dfrac{3}{4}$'],
      correct: 'D',
      hint: 'A number is divisible by 4 when its last two digits make a number divisible by 4. What happens when the tens digit is even?',
      idea: 'Divisibility by 4 depends on the last two digits only. With an even tens digit, it depends on the ones digit alone.',
      solution: [
        'A number is divisible by $4$ exactly when its last two digits make a number divisible by $4$.',
        'The tens digit is even, so the tens part is $0$, $20$, $40$, $60$ or $80$: always a multiple of $4$.',
        'So the number is divisible by $4$ exactly when the ones digit is: that means $0$, $4$ or $8$, but not $2$ or $6$.',
        'The ones digit is one of five even digits, and three of them work, whatever the other digits are: $\\dfrac{3}{5}$.',
      ],
      trap: 'For all whole numbers, one in four is divisible by 4. These numbers are special: they are all even already, and the even tens digit helps again.',
    },

    // ── 17 ───────────────────────────────────────────────────────────────────
    {
      id: 'q17',
      topic: 'Counting',
      text: 'Four students are seated in a row. They chat with the people sitting next to them, and then they rearrange themselves so that no one is sitting next to anyone they sat next to before. How many such rearrangements are possible?',
      choices: ['$2$', '$4$', '$9$', '$12$', '$24$'],
      correct: 'A',
      hint: 'Call the students 1, 2, 3, 4 in their first order. The two in the middle each had two neighbors. Where can they sit now?',
      idea: 'Place the most restricted people first: the two middle students each have only one person they are still allowed to sit beside.',
      solution: [
        'Name the students $1$, $2$, $3$, $4$ in their first order. The neighbor pairs were $1$–$2$, $2$–$3$ and $3$–$4$.',
        'Student $2$ may only sit next to $4$, and student $3$ may only sit next to $1$. So $2$ and $3$ can each have just one neighbor: they must take the two end seats.',
        'If $2$ is on the left end, $4$ is beside it, and $3$ is on the right end with $1$ beside it: $2, 4, 1, 3$.',
        'The only other way is the mirror image, $3, 1, 4, 2$. That makes $2$ rearrangements.',
      ],
      tip: 'Check $2, 4, 1, 3$: the new neighbor pairs are 2–4, 4–1 and 1–3. None of them is an old pair.',
    },

    // ── 18 ───────────────────────────────────────────────────────────────────
    {
      id: 'q18',
      topic: 'Number',
      text: 'In how many ways can 60 be written as the sum of two or more consecutive odd positive integers, arranged in increasing order?',
      choices: ['$1$', '$2$', '$3$', '$4$', '$5$'],
      correct: 'B',
      hint: 'The average of the numbers in the sum is 60 divided by how many numbers there are. Can you have an odd number of odd numbers add up to 60?',
      idea: 'A sum of evenly spaced numbers is (how many) × (their average). Try each possible count, and check that the list is made of odd positive numbers.',
      solution: [
        'An odd count of odd numbers has an odd sum, so the count is even: $2$, $4$, $6$, …',
        'Two numbers: the average is $30$, so they are $29 + 31$. That works.',
        'Four numbers: the average is $15$, so the middle two would be $14$ and $16$. Those are even, so it fails.',
        'Six numbers: the average is $10$, with middle numbers $9$ and $11$: $5 + 7 + 9 + 11 + 13 + 15 = 60$. That works.',
        'Eight numbers would average $7.5$, which is not a whole number, and ten or more would need numbers below $1$. So there are $2$ ways.',
      ],
      trap: 'The average must sit exactly between two odd numbers, so it must be even. An average of 15 looks fine, but the numbers around it, 14 and 16, are not odd.',
    },

    // ── 19 ───────────────────────────────────────────────────────────────────
    {
      id: 'q19',
      topic: 'Algebra',
      text: 'Miguel is walking with his dog, Luna. When they reach the entrance to a park, Miguel throws a ball straight ahead and keeps walking at a steady pace. Luna sprints to the ball, which stops by a tree. As soon as she reaches the ball, she brings it back to Miguel. Luna runs 5 times as fast as Miguel walks. What fraction of the distance from the entrance to the tree has Miguel covered when Luna brings him the ball?',
      figure: FIGURES.Q19,
      choices: ['$\\dfrac{1}{6}$', '$\\dfrac{1}{5}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{3}$', '$\\dfrac{2}{5}$'],
      correct: 'D',
      hint: 'When they meet, Miguel and Luna have been moving for the same time. Add their two distances together: what do you get?',
      idea: 'In the same time, distances are in the ratio of the speeds. And together, the two of them cover the entrance-to-tree distance exactly twice.',
      solution: [
        'They start together at the entrance and meet at the same moment, so Luna has gone $5$ times as far as Miguel.',
        'Luna runs to the tree and back to Miguel. Add the part Miguel walked, and the two paths together cover the distance to the tree twice.',
        'So Miguel walked $1$ part and Luna ran $5$ parts, and the $6$ parts make $2$ tree distances. One part is $\\dfrac{2}{6} = \\dfrac{1}{3}$ of the distance.',
        'Miguel has covered $\\dfrac{1}{3}$ of the way to the tree.',
      ],
      trap: 'Luna is 5 times as fast, so $\\dfrac{1}{5}$ is tempting. That is where Miguel is when Luna reaches the tree. He keeps walking while she runs back.',
    },

    // ── 20 ───────────────────────────────────────────────────────────────────
    {
      id: 'q20',
      topic: 'Counting',
      text: 'The land of Catania uses gold coins and silver coins. A gold coin is 1 mm thick and a silver coin is 3 mm thick. In how many ways can Taylor make a stack of coins exactly 8 mm tall, using gold and silver coins in any arrangement, if the order of the coins matters?',
      choices: ['$3$', '$7$', '$10$', '$13$', '$16$'],
      correct: 'D',
      hint: 'How many silver coins could the stack have? Take each number as its own case.',
      idea: 'Split into cases by the number of silver coins. In each case, count the places the silver coins can take in the stack.',
      solution: [
        'No silver coins: $8$ gold coins, in $1$ way.',
        'One silver coin: $3$ mm of silver and $5$ gold coins, $6$ coins in all. The silver coin can be in any of the $6$ places: $6$ ways.',
        'Two silver coins: $6$ mm of silver and $2$ gold coins, $4$ coins in all. Choose the $2$ places for the gold coins: $\\dfrac{4 \\times 3}{2} = 6$ ways.',
        'Three silver coins would be $9$ mm, which is too tall. Total: $1 + 6 + 6 = 13$.',
      ],
      tip: 'Another way is to build up. The top coin is gold or silver, so the ways for a height equal the ways for 1 mm less plus the ways for 3 mm less: 1, 1, 2, 3, 4, 6, 9, 13 for heights 1 to 8.',
    },

    // ── 21 ───────────────────────────────────────────────────────────────────
    {
      id: 'q21',
      topic: 'Counting',
      text: 'Charlotte the spider walks along a web shaped like a 5-pointed star, shown in the figure. The web has 5 outer points and 5 inner points. Each time Charlotte reaches a point, she chooses one of the neighboring points at random and moves to it. Charlotte starts at an outer point and makes 3 moves (she may visit a point more than once). What is the probability that she is now at an outer point of the star?',
      figure: FIGURES.Q21,
      choices: ['$\\dfrac{1}{5}$', '$\\dfrac{1}{4}$', '$\\dfrac{2}{5}$', '$\\dfrac{1}{2}$', '$\\dfrac{3}{5}$'],
      correct: 'B',
      hint: 'How many neighbors does an outer point have, and what kind are they? How many does an inner point have?',
      idea: 'Only the kind of point matters. Follow the probability of "outer" and "inner" one move at a time.',
      solution: [
        'An outer point has $2$ neighbors, both inner. An inner point has $4$ neighbors: $2$ outer and $2$ inner.',
        'Move 1: from an outer point she must go to an inner point.',
        'Move 2: from an inner point, half the time she goes to an outer point and half the time to an inner point.',
        'Move 3: if she is at an outer point (chance $\\dfrac{1}{2}$), she must move to an inner point. If she is at an inner point (chance $\\dfrac{1}{2}$), she moves to an outer point half the time.',
        'So the probability of ending at an outer point is $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$.',
      ],
      trap: 'Half of the ten points are outer points, but the answer is not $\\dfrac{1}{2}$: she can never go straight from one outer point to another.',
    },

    // ── 22 ───────────────────────────────────────────────────────────────────
    {
      id: 'q22',
      topic: 'Algebra',
      text: 'The integers from 1 through 25 are separated, in any way, into five groups of 5 numbers each. The median of each group is found. Let $M$ be the median of the five medians. What is the least possible value of $M$?',
      choices: ['$9$', '$10$', '$12$', '$13$', '$14$'],
      correct: 'A',
      hint: 'Three of the five medians are $M$ or less. In each of those three groups, how many numbers are at most the median?',
      idea: 'Count what must be small: three groups have a median of at most $M$, and each of them holds three numbers that are at most its median.',
      solution: [
        '$M$ is the third smallest of the five medians, so three groups have a median of $M$ or less.',
        'In a group of five, the median and the two numbers below it are all at most the median. So each of those three groups has $3$ numbers that are $M$ or less.',
        'That is $3 \\times 3 = 9$ different numbers that are at most $M$, so $M$ is at least $9$.',
        '$9$ can be done: put $1, 2, 3$ in one group, $4, 5, 6$ in another and $7, 8, 9$ in a third, and fill up with large numbers. The medians are $3$, $6$, $9$ and two large ones, so $M = 9$.',
      ],
      trap: 'The median of all 25 numbers is 13, but the median of the medians does not have to be. Small numbers can be packed into just three of the groups.',
    },

    // ── 23 ───────────────────────────────────────────────────────────────────
    {
      id: 'q23',
      topic: 'Geometry',
      text: 'Lakshmi has 5 round coins, each with a diameter of 4 centimeters. She arranges the coins in 2 rows on a table top, as shown, and wraps an elastic band tightly around them. What is the length of the band, in centimeters?',
      figure: FIGURES.Q23,
      choices: ['$2\\pi + 20$', '$\\dfrac{5}{2}\\pi + 20$', '$4\\pi + 20$', '$\\dfrac{9}{2}\\pi + 20$', '$5\\pi + 20$'],
      correct: 'C',
      hint: 'The band has straight parts and curved parts. Join the centers of the outside coins: how do the straight parts compare with that shape?',
      idea: 'A tight band around circles: the straight parts match the sides of the shape made by the centers, and the curved parts always add up to one whole circle.',
      solution: [
        'Join the centers of the coins around the outside. Touching coins have centers $4$ cm apart, so the shape has sides $8$ (three coins along the bottom), $4$, $4$ (the top) and $4$.',
        'Each straight part of the band runs beside one of those sides and has the same length: $8 + 4 + 4 + 4 = 20$ cm.',
        'Going once around, the band turns through one full turn, so its curved parts make one whole circle of radius $2$: $2\\pi \\times 2 = 4\\pi$ cm.',
        'Length: $4\\pi + 20$ cm.',
      ],
      trap: 'Do not add a piece of circle for each coin separately and guess. However many coins there are, the curved parts of a tight band add up to exactly one full circle.',
    },

    // ── 24 ───────────────────────────────────────────────────────────────────
    {
      id: 'q24',
      topic: 'Number',
      text: 'The notation $n!$ (read "$n$ factorial") means the product of the first $n$ positive integers. For example, $3! = 1 \\cdot 2 \\cdot 3 = 6$. Define the _superfactorial_ of a positive integer $n$ to be the product of the factorials of the first $n$ integers. For example, the superfactorial of 3 is $1! \\cdot 2! \\cdot 3! = 12$. How many factors of 7 appear in the prime factorization of the superfactorial of 51?',
      choices: ['$147$', '$150$', '$156$', '$168$', '$171$'],
      correct: 'E',
      hint: 'How many factors of 7 are in $k!$? It depends on how many multiples of 7 are at most $k$. Do not forget 49.',
      idea: 'Count the 7s one factorial at a time: $k!$ has one 7 for each multiple of 7 up to $k$, and one more once $k$ reaches $49 = 7 \\times 7$.',
      solution: [
        'In $k!$, each multiple of $7$ up to $k$ gives one factor of $7$. So $1!$ to $6!$ have none, $7!$ to $13!$ have $1$ each, $14!$ to $20!$ have $2$ each, and so on.',
        'Each of those blocks holds $7$ factorials: $7 \\times (1 + 2 + 3 + 4 + 5 + 6) = 147$ factors, up to $48!$.',
        'The last three, $49!$, $50!$ and $51!$, each contain seven multiples of $7$: $3 \\times 7 = 21$ more.',
        'And $49 = 7 \\times 7$ gives one extra factor in each of those three: $3$ more.',
        'Total: $147 + 21 + 3 = 171$.',
      ],
      trap: 'Stopping at $168$ forgets that 49 holds two 7s. Stopping at $147$ forgets the last three factorials altogether.',
    },

    // ── 25 ───────────────────────────────────────────────────────────────────
    {
      id: 'q25',
      topic: 'Counting',
      text: 'In an _equiangular hexagon_, every interior angle measures $120^\\circ$. The figure shows an example with side lengths 2, 3, 1, 3, 2, and 2, inscribed in equilateral triangle $ABC$. Consider all the equiangular hexagons with positive integer side lengths that can be inscribed in triangle $ABC$ with all six vertices on the sides of the triangle. How many such hexagons are there? Hexagons that differ only by a rotation or a reflection count as the same.',
      figure: FIGURES.Q25,
      choices: ['$4$', '$5$', '$6$', '$7$', '$8$'],
      correct: 'E',
      hint: 'The hexagon is the big triangle with a small equilateral triangle cut off each corner. How long is a side of the big triangle?',
      idea: 'Each hexagon is the triangle with three corners cut off. Count the sets of three corner sizes, in an organized list.',
      solution: [
        'The hexagon is triangle $ABC$ with a small equilateral triangle cut off each corner. In the example the corners have sides $1$, $2$ and $2$, and the bottom side shows that $AB = 1 + 3 + 2 = 6$.',
        'So a hexagon is given by three whole-number corner sizes. Two corners on the same side of the triangle must leave a piece of at least $1$ between them, so any two corner sizes add up to at most $5$.',
        'Turning or flipping the triangle only swaps the corners, so only the set of three sizes matters. List them by the largest size.',
        'Largest $1$: $(1,1,1)$. Largest $2$: $(1,1,2)$, $(1,2,2)$, $(2,2,2)$. Largest $3$: $(1,1,3)$, $(1,2,3)$, $(2,2,3)$. Largest $4$: $(1,1,4)$.',
        'That is $1 + 3 + 3 + 1 = 8$ hexagons.',
      ],
      trap: 'Sets like $(1, 3, 3)$ or $(2, 2, 4)$ fail: two of the corners would meet or overlap on one side, because their sizes add up to 6.',
    },
  ],
};
