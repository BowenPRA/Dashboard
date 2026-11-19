// src/data/AMC8/TP_02/test.js
// TP_02 — Arrangements. The unit's short test, for the Practice Test task
// (src/tasks/AmcTest.jsx) and the Review (src/tasks/AmcReview.jsx).
//
// A PROBLEM-TYPE unit's test is `mini: true`: ten questions of ONE type in 16
// minutes, the contest's pace. It is sat once, on the clock, and nothing is
// marked until it is handed in. `topics` names the unit's six sub-skills, so
// the results say WHICH question to ask again; there are no `awards`.
//
// EVERY PROBLEM IS ORIGINAL, written for this unit in the contest's style:
// five choices in increasing order, the wrong ones being the answers the real
// mistakes give. Easiest first. None is in the deck or the practice set, and
// MATHCOUNTS and MISSISSIPPI (worked in the deck) are kept out. Each answer
// was worked twice, by two methods where there is a second one.
// Key: E C A C B A E D B D (two of each letter).
//
// Item shape: see src/data/AMC8/PT_01/test.js. `npm run validate` runs
// utils/amcTest.js over this file.
// A string with an apostrophe is written in double quotes.
import { FIGURES } from './figures.js';

export const amcTest = {
  mini: true,
  title: 'Arrangements Test',
  source: 'Ten arrangement questions in the style of the AMC 8',
  minutes: 16,
  topics: [
    { id: 'Fact', label: 'Arrange everything' },
    { id: 'Perm', label: 'Arrange some' },
    { id: 'Same', label: 'Identical letters' },
    { id: 'Glue', label: 'Must be together' },
    { id: 'Apart', label: 'Must be apart' },
    { id: 'Fixed', label: 'Fixed spots & order' },
  ],

  problems: [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
      id: 'q1',
      topic: 'Fact',
      text: 'Four friends go to the movies and sit in a row of 4 seats. In how many different ways can they sit?',
      choices: ['$4$', '$10$', '$12$', '$16$', '$24$'],
      correct: 'E',
      hint: 'How many friends could take the first seat? And then the second?',
      idea: 'Everyone in a row: one fewer choice for each seat, so $4! = 4 \\times 3 \\times 2 \\times 1$.',
      solution: [
        'Four seats, so four slots.',
        'First seat: $4$ friends. Second seat: $3$ are left. Then $2$, then $1$.',
        'Multiply: $4 \\times 3 \\times 2 \\times 1 = 4! = 24$.',
      ],
      trap: '$4 \\times 4 = 16$ keeps all four friends for every seat, as if one friend could sit in two seats. And $4 + 3 + 2 + 1 = 10$ adds the slots instead of multiplying them.',
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
      id: 'q2',
      topic: 'Perm',
      text: 'A flag has 4 vertical stripes. Each stripe is painted one of 6 colors, and no two stripes are the same color. How many different flags are possible?',
      choices: ['$15$', '$30$', '$360$', '$720$', '$1296$'],
      correct: 'C',
      hint: 'Draw 4 slots, one for each stripe. How many colors are left for each one?',
      idea: 'Arrange 4 of the 6 colors: 4 slots, counting down from 6.',
      solution: [
        'Four stripes, so four slots.',
        'First stripe: $6$ colors. Then $5$, $4$ and $3$, because no color is used twice.',
        'Multiply: $6 \\times 5 \\times 4 \\times 3 = 360$. With factorials, that is $\\dfrac{6!}{2!}$.',
      ],
      trap: '$\\dfrac{6!}{4!} = 30$ divides by the factorial of the 4 stripes, not of the 2 colors left over. And $15$ counts only which 4 colors are used, but a red stripe then a blue one is a different flag from blue then red.',
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
      id: 'q3',
      topic: 'Same',
      text: 'How many distinct arrangements are there of the letters in the word BANANA?',
      choices: ['$60$', '$120$', '$144$', '$360$', '$720$'],
      correct: 'A',
      hint: 'Which letters repeat, and how many times?',
      idea: 'Arrange the letters as if they were all different, then divide by the orders of each repeated letter.',
      solution: [
        "BANANA has $6$ letters: one B, three A's and two N's.",
        'As if all different: $6! = 720$.',
        "Each word was counted $3!$ times for the A's and $2!$ times for the N's: $\\dfrac{720}{3! \\times 2!} = \\dfrac{720}{12} = 60$.",
      ],
      trap: '$144 = 720 \\div 5$ divides by how many letters repeat ($3 + 2$). Divide by their orders, $3! = 6$ and $2! = 2$, instead. $120$ and $360$ each forget one of the two groups, and $720$ forgets both.',
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
      id: 'q4',
      topic: 'Glue',
      text: 'Six students stand in a row for a photo. Three of them are wearing red shirts, and those three must stand next to each other. How many different photos are possible?',
      choices: ['$24$', '$36$', '$144$', '$576$', '$720$'],
      correct: 'C',
      hint: 'Glue the three students in red into one block. How many units are there to arrange?',
      idea: 'Must be together: glue them into one block, arrange the units, then multiply by the orders inside the block.',
      solution: [
        'Glue the three students in red into one block. The units are the block and the $3$ other students: $4$ units.',
        'Arrange the units: $4! = 24$.',
        'Inside the block the three can stand in $3! = 6$ orders.',
        'Multiply: $24 \\times 6 = 144$.',
      ],
      solutionFigure: FIGURES.Q4_SOLUTION,
      trap: '$24$ forgets that the students in red can swap places inside their block. And $36 = 3! \\times 3!$ leaves the block itself out of the units.',
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
      id: 'q5',
      topic: 'Fixed',
      text: 'How many arrangements of the six letters of the word NUMBER begin with a vowel and end with a vowel?',
      choices: ['$24$', '$48$', '$96$', '$120$', '$720$'],
      correct: 'B',
      hint: 'Which places are fussy? Fill them first.',
      idea: 'Fixed spots first: put the vowels at the two ends, then arrange the rest.',
      solution: [
        'The vowels in NUMBER are U and E.',
        'First letter: $2$ choices. Last letter: the other vowel, $1$ choice.',
        'The four places in the middle take N, M, B and R in any order: $4! = 24$.',
        'Multiply: $2 \\times 1 \\times 24 = 48$.',
      ],
      solutionFigure: FIGURES.Q5_SOLUTION,
      trap: '$96 = 2 \\times 2 \\times 24$ uses the same vowel at both ends. Once one vowel is first, only the other can be last. And $24$ forgets that U and E can swap ends.',
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
      id: 'q6',
      topic: 'Same',
      text: 'How many distinct arrangements are there of the letters in the word BOOKKEEPER?',
      choices: ['$151{,}200$', '$302{,}400$', '$453{,}600$', '$604{,}800$', '$3{,}628{,}800$'],
      correct: 'A',
      hint: 'Count each letter carefully. Which letters repeat, and how often?',
      idea: 'Several repeated letters: divide by the orders of EACH group.',
      solution: [
        'BOOKKEEPER has $10$ letters: B, P and R once each, O twice, K twice, and E three times.',
        'As if all different: $10! = 3{,}628{,}800$.',
        "Divide by the orders of each group: $2!$ for the O's, $2!$ for the K's and $3!$ for the E's. That is $2 \\times 2 \\times 6 = 24$.",
        '$\\dfrac{3{,}628{,}800}{24} = 151{,}200$.',
      ],
      trap: "It is easy to miss a group. $302{,}400$ forgets one of the $2!$'s, $604{,}800$ divides only for the E's, and $453{,}600$ divides by $2!$ for the E's, but there are three of them.",
    },

    // ── 7 ────────────────────────────────────────────────────────────────────
    {
      id: 'q7',
      topic: 'Apart',
      text: 'How many arrangements of the letters of the word TRIANGLE do not have the T and the R next to each other?',
      choices: ['$5040$', '$10{,}080$', '$20{,}160$', '$28{,}800$', '$30{,}240$'],
      correct: 'E',
      hint: 'It is easier to count the arrangements where T and R ARE next to each other.',
      idea: 'Must be apart: count all the arrangements, then take away the ones with the two letters together.',
      solution: [
        'TRIANGLE has $8$ different letters: $8! = 40{,}320$ arrangements in all.',
        'T and R together: glue them into one block, which leaves $7$ units, and the block can be TR or RT. $7! \\times 2 = 10{,}080$.',
        'Apart: $40{,}320 - 10{,}080 = 30{,}240$.',
      ],
      trap: '$10{,}080$ counts the arrangements with T and R together, the opposite of what is asked. And placing T first, then giving R the $5$ places not next to it, gives $28{,}800$: but a T at either end has only one neighbor, so there R has $6$ places.',
    },

    // ── 8 ────────────────────────────────────────────────────────────────────
    {
      id: 'q8',
      topic: 'Glue',
      text: 'Four pairs of twins sit in a row of 8 seats at a concert. Each pair of twins sits side by side. In how many ways can the 8 people be seated?',
      choices: ['$24$', '$48$', '$192$', '$384$', '$40{,}320$'],
      correct: 'D',
      hint: 'Glue each pair of twins into a block. How many blocks are there, and how many orders inside each one?',
      idea: 'Four blocks: arrange the blocks, then multiply by the orders inside EACH block.',
      solution: [
        'Glue each pair of twins into one block: $4$ blocks.',
        'Arrange the blocks: $4! = 24$.',
        'Inside each block the twins can sit in $2$ orders, and each pair chooses on its own: $2 \\times 2 \\times 2 \\times 2 = 16$.',
        'Multiply: $24 \\times 16 = 384$.',
      ],
      solutionFigure: FIGURES.Q8_SOLUTION,
      trap: '$48$ lets only one pair of twins swap. Every pair can swap, so multiply by $2$ four times. And $192 = 24 \\times 8$ adds the orders, $2 + 2 + 2 + 2$, but choices made together multiply.',
    },

    // ── 9 ────────────────────────────────────────────────────────────────────
    {
      id: 'q9',
      topic: 'Fixed',
      text: 'Each of the digits 1, 2, 3, 4, 5 and 6 is used once to write a 6-digit number. In how many of these numbers do the digits 1, 2 and 3 appear in that order from left to right, not necessarily next to each other? One such number is 415263.',
      choices: ['$20$', '$120$', '$240$', '$360$', '$720$'],
      correct: 'B',
      hint: 'In how many orders could 1, 2 and 3 come? How many of those orders are allowed?',
      idea: 'A fixed order for 3 things: only 1 of their $3!$ orders is allowed, so divide by $3!$.',
      solution: [
        'With no rule there are $6! = 720$ numbers.',
        'Put the numbers in groups that differ only in the order of 1, 2 and 3. Each group has $3! = 6$ numbers, and exactly one of them has 1, 2, 3 in order.',
        'So $720 \\div 6 = 120$.',
      ],
      trap: '$240$ divides by $3$, but 1, 2 and 3 have $3! = 6$ orders. And $20$ chooses the 3 places for 1, 2 and 3, but forgets that 4, 5 and 6 then fill the other places in $3! = 6$ orders: $20 \\times 6 = 120$.',
    },

    // ── 10 ───────────────────────────────────────────────────────────────────
    {
      id: 'q10',
      topic: 'Apart',
      text: "How many arrangements of the letters of the word ADDRESS do not have the two S's next to each other?",
      choices: ['$360$', '$540$', '$630$', '$900$', '$1260$'],
      correct: 'D',
      hint: "Count all the arrangements, then the ones with the S's together. Some letters repeat in both counts.",
      idea: 'Apart = all − together, with the repeated letters divided out in BOTH counts.',
      solution: [
        'ADDRESS has $7$ letters, with D twice and S twice. All: $\\dfrac{7!}{2! \\times 2!} = \\dfrac{5040}{4} = 1260$.',
        "S's together: glue them. The units are A, D, D, R, E and SS: $6$ units with D twice, so $\\dfrac{6!}{2!} = 360$. The two S's are the same letter, so the block has only $1$ order inside.",
        'Apart: $1260 - 360 = 900$.',
      ],
      solutionFigure: FIGURES.Q10_SOLUTION,
      trap: "$540 = 1260 - 720$ multiplies the glued SS block by $2$, but swapping two S's makes no new word. And $360$ is the count with the S's together.",
    },
  ],
};
