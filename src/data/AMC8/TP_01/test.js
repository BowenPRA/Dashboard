// src/data/AMC8/TP_01/test.js
// TP_01 — How Many Ways? The unit's short test, for the Practice Test task
// (src/tasks/AmcTest.jsx) and the Review (src/tasks/AmcReview.jsx).
//
// A PROBLEM-TYPE unit's test is `mini: true`: ten questions of ONE type in 16
// minutes, the contest's pace (25 in 40 is 1.6 minutes each). It is sat under
// the same conditions as a full paper: once, on the clock, nothing marked
// until it is handed in. What differs:
//   · `topics` names the unit's sub-skills, so the results say WHICH part of
//     the method to go back to, not "Counting 6/10";
//   · there are no `awards`: those are a full paper's cutoffs.
//
// EVERY PROBLEM IS ORIGINAL, written for this unit in the contest's style:
// five choices in increasing order, the wrong ones being the answers the
// real mistakes give. They run from the easiest to the hardest, like the
// contest. None is in the deck or the practice set. Each was worked twice
// before the key was trusted. Key: E C D A A B D E C B (two of each letter).
//
// Item shape: see src/data/AMC8/PT_01/test.js. `npm run validate` runs
// utils/amcTest.js over this file.
import { FIGURES } from './figures.js';

export const amcTest = {
  mini: true,
  title: 'How Many Ways? Test',
  source: 'Ten counting questions in the style of the AMC 8',
  minutes: 16,
  topics: [
    { id: 'Slots', label: 'Multiply the slots' },
    { id: 'Rule', label: 'A slot with a rule' },
    { id: 'Cases', label: 'Cases & the opposite' },
    { id: 'Order', label: 'Order does not matter' },
  ],

  problems: [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
      id: 'q1',
      topic: 'Slots',
      text: 'A lunch deal is one main dish, one side and one drink. The menu has 5 main dishes, 3 sides and 2 drinks. How many different lunch deals are there?',
      choices: ['$10$', '$15$', '$20$', '$25$', '$30$'],
      correct: 'E',
      hint: 'How many choices does a customer make? Draw a slot for each one.',
      idea: 'One slot for each choice, and the slots multiply.',
      solution: [
        'A customer makes three choices, so draw three slots: main dish, side, drink.',
        'Fill them in: $5$, $3$ and $2$.',
        'Multiply: $5 \\times 3 \\times 2 = 30$.',
      ],
      trap: 'Adding gives $5 + 3 + 2 = 10$. That counts the items on the menu, not the deals. Each main dish goes with every side and every drink.',
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
      id: 'q2',
      topic: 'Slots',
      text: 'A bicycle lock has 3 dials. Each dial shows one of the digits 1, 2, 3, 4, 5, 6. How many different settings does the lock have?',
      choices: ['$18$', '$120$', '$216$', '$720$', '$729$'],
      correct: 'C',
      hint: 'Can two dials show the same digit?',
      idea: 'Repeats are allowed, so every slot keeps all of its choices.',
      solution: [
        'Three dials, so three slots.',
        'The dials turn on their own, so a setting like 4-4-4 is possible: each slot has $6$ choices.',
        'Multiply: $6 \\times 6 \\times 6 = 216$.',
      ],
      trap: '$6 \\times 5 \\times 4 = 120$ takes one choice away each time, as if a digit could not be used twice. Nothing stops two dials from showing the same digit.',
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
      id: 'q3',
      topic: 'Slots',
      text: 'Eight swimmers race in a final, and there are no ties. In how many different ways can the gold, silver and bronze medals be awarded?',
      choices: ['$24$', '$56$', '$112$', '$336$', '$512$'],
      correct: 'D',
      hint: 'After the gold medal is given, how many swimmers could still win silver?',
      idea: 'No repeats: each slot has one fewer choice than the slot before.',
      solution: [
        'Three slots: gold, silver, bronze.',
        'Gold: $8$ swimmers. Silver: $7$ are left. Bronze: $6$ are left.',
        'Multiply: $8 \\times 7 \\times 6 = 336$.',
      ],
      trap: '$8 \\times 8 \\times 8 = 512$ lets one swimmer win all three medals. And $56$ is the number of groups of three swimmers, without saying who gets which medal: here the order matters.',
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
      id: 'q4',
      topic: 'Rule',
      text: 'Using the digits 1, 2, 3, 4, 5, 6, 7, with no digit used more than once, how many 3-digit even numbers can be made?',
      choices: ['$90$', '$105$', '$126$', '$147$', '$210$'],
      correct: 'A',
      hint: 'Which slot has a rule of its own? Fill that one first.',
      idea: 'Fussy slot first: the ones digit must be even, so fill it before the others.',
      solution: [
        'The ones digit is the fussy slot. It must be $2$, $4$ or $6$: $3$ choices.',
        'One digit is used, so the hundreds digit has $6$ choices. Then the tens digit has $5$.',
        'Multiply: $3 \\times 6 \\times 5 = 90$.',
      ],
      solutionFigure: FIGURES.Q4_SOLUTION,
      trap: '$7 \\times 6 \\times 5 = 210$ counts every 3-digit number, odd ones too. And half of that, $105$, is not right either: only 3 of the 7 digits are even, which is less than half.',
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
      id: 'q5',
      topic: 'Rule',
      text: 'A tower is built from 4 blocks, one on top of another. Each block is red, blue or green, and two blocks that touch must be different colors. How many different towers are possible?',
      choices: ['$24$', '$36$', '$48$', '$54$', '$81$'],
      correct: 'A',
      hint: 'Fill the slots from the bottom up. What must each new block be different from?',
      idea: 'A rule between neighbors: each slot only has to avoid the one choice just before it.',
      solution: [
        'Four slots, from the bottom block to the top.',
        'The bottom block can be any of the $3$ colors.',
        'Each block after that must differ from the block under it, and from nothing else: $2$ choices each.',
        'Multiply: $3 \\times 2 \\times 2 \\times 2 = 24$.',
      ],
      tip: 'A block may be the same color as a block it does not touch: red, blue, red, blue is a fine tower. That is why the slots are 3, 2, 2, 2 and do not run out.',
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
      id: 'q6',
      topic: 'Rule',
      text: 'How many 4-digit whole numbers can be written using only the digits 0, 1 and 2? A digit may be used more than once, as in 2002.',
      choices: ['$24$', '$27$', '$54$', '$81$', '$108$'],
      correct: 'C',
      hint: 'Can a 4-digit number start with any of the three digits?',
      idea: 'A number never starts with 0, so the first digit is the fussy slot.',
      solution: [
        'Four slots. The thousands digit is fussy: it can be $1$ or $2$, but not $0$. That is $2$ choices.',
        'Each of the other three digits can be $0$, $1$ or $2$: $3$ choices each.',
        'Multiply: $2 \\times 3 \\times 3 \\times 3 = 54$.',
      ],
      solutionFigure: FIGURES.Q6_SOLUTION,
      trap: '$3 \\times 3 \\times 3 \\times 3 = 81$ counts strings like 0121. That is the number 121, which has only three digits.',
    },

    // ── 7 ────────────────────────────────────────────────────────────────────
    {
      id: 'q7',
      topic: 'Order',
      text: 'A pizza shop has 8 toppings. A customer orders a pizza with exactly 2 different toppings. How many different pizzas could the customer order?',
      choices: ['$14$', '$16$', '$21$', '$28$', '$56$'],
      correct: 'D',
      hint: 'Is a ham and corn pizza different from a corn and ham pizza?',
      idea: 'Order does not matter: count with slots, then divide by the number of orders of each pair.',
      solution: [
        'Slots first: $8$ choices for one topping, then $7$ for the other. $8 \\times 7 = 56$.',
        'But ham then corn and corn then ham are the same pizza. Every pizza was counted $2$ times.',
        'Divide: $56 \\div 2 = 28$.',
      ],
      trap: '$56$ is the count when the order matters. Ask the question every time: would swapping the two choices give something new? Here it would not.',
    },

    // ── 8 ────────────────────────────────────────────────────────────────────
    {
      id: 'q8',
      topic: 'Cases',
      text: 'How many 3-digit whole numbers are multiples of 5 and have three different digits?',
      choices: ['$64$', '$72$', '$120$', '$128$', '$136$'],
      correct: 'E',
      hint: 'A multiple of 5 ends in 0 or in 5. Does the last digit change what the first digit can be?',
      idea: 'Two fussy slots that affect each other: split into cases by the last digit, count each, then add.',
      solution: [
        'A multiple of $5$ ends in $0$ or $5$. Take one case at a time.',
        '**Ends in 0.** The hundreds digit can be any of $1$ to $9$: $9$ choices. The tens digit is one of the $8$ digits left. $9 \\times 8 = 72$.',
        '**Ends in 5.** The hundreds digit cannot be $0$ or $5$: $8$ choices. The tens digit can be anything except the two digits used: $8$ choices. $8 \\times 8 = 64$.',
        'Add the cases: $72 + 64 = 136$.',
      ],
      solutionFigure: FIGURES.Q8_SOLUTION,
      trap: 'Using the same count for both cases gives $64 + 64 = 128$. When the number ends in 0, the 0 is already used, so the hundreds digit has all nine of its choices.',
    },

    // ── 9 ────────────────────────────────────────────────────────────────────
    {
      id: 'q9',
      topic: 'Cases',
      text: 'How many whole numbers from 100 to 999 have at least one digit that is 0?',
      choices: ['$90$', '$162$', '$171$', '$180$', '$271$'],
      correct: 'C',
      hint: '"At least one" is hard to count directly. What is the opposite?',
      idea: 'At least one = all − none. Count every 3-digit number, then take away the ones with no 0.',
      solution: [
        'All the numbers from $100$ to $999$: $999 - 99 = 900$.',
        'Numbers with no $0$ at all: each digit is $1$ to $9$, so $9 \\times 9 \\times 9 = 729$.',
        'At least one $0$: $900 - 729 = 171$.',
      ],
      trap: 'Counting 90 numbers with a 0 in the tens place and 90 with a 0 in the ones place gives $180$. But 100, 200, …, 900 are in both lists, so nine numbers are counted twice: $180 - 9 = 171$.',
    },

    // ── 10 ───────────────────────────────────────────────────────────────────
    {
      id: 'q10',
      topic: 'Order',
      text: 'A 3-digit number is called _rising_ if each digit is greater than the digit before it. For example, 258 is rising, but 285 and 255 are not. How many rising 3-digit numbers are there?',
      choices: ['$56$', '$84$', '$120$', '$252$', '$504$'],
      correct: 'B',
      hint: 'Pick any three different digits from 1 to 9. In how many ways can they be put in rising order?',
      idea: 'Choosing the three digits is all there is to do: they can only be written in one rising order. So the order of choosing does not matter.',
      solution: [
        'A rising number cannot contain $0$: the $0$ would have to come first. So the digits are three different digits from $1$ to $9$.',
        'Slots: $9 \\times 8 \\times 7 = 504$ ways to pick three different digits one after another.',
        'Each set of three digits, like $2$, $5$, $8$, was picked in $3 \\times 2 \\times 1 = 6$ different orders, but it makes only one rising number.',
        'Divide: $504 \\div 6 = 84$.',
      ],
      trap: '$504$ counts 258, 285, 528, 582, 825 and 852 as six numbers, but only 258 is rising. And $120$ comes from choosing among all ten digits, as if a rising number could contain 0.',
    },
  ],
};
