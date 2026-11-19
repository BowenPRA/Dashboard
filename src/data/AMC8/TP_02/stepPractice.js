// src/data/AMC8/TP_02/stepPractice.js
// TP_02 — Arrangements. The practice set for Step by Step (STEP_PRACTICE,
// p93; docs/step-practice.md). Ten original problems, one per question type
// the deck teaches, with the scaffold fading:
//
//   Focus      f1 arrange everything · f2 arrange some · f3 identical letters
//              f4 must be together
//              every step is asked; the slots or the tiles are drawn beside it
//   Practice   p1 a fixed spot (with a repeat) · p2 must be apart · p3 a fixed order
//              only the steps where the thinking is; no figure
//   Challenge  c1 identical letters glued · c2 identical letters apart
//              c3 a block and two fixed ends
//              only the answer; a wrong answer opens the step its slip points at
//
// Every slip is a real wrong turn with its number worked out: forgetting to
// divide by the repeats, dividing by how many letters repeat instead of their
// orders, gluing a block but forgetting the orders inside it, answering
// "together" for "apart", writing n!/k! for k slots, and dividing for a
// letter that has only one copy left. NO PROBLEM HERE IS IN THE DECK OR THE
// TEST. English only (AMC8 is not bilingual), so there are no twins.
// A string with an apostrophe is written in double quotes.
import { emptySlots, tileRow, wordTiles } from './figures.js';

const focus = [
  {
    id: 'f1', level: 'focus',
    prompt: 'A parking lot has {{7 spaces}} in a row, and {{7 different cars}} park in them, one in each space. [[In how many ways can the cars be parked?]]',
    inlineSvg: emptySlots('1st', '2nd', '3rd', '4th', '5th', '6th', '7th'),
    steps: [
      {
        title: 'Choices for the first space',
        input: { type: 'number', answer: '7', after: 'cars' },
        line: 'First space: @ choices.',
        hint: 'Any of the cars could park there.',
      },
      {
        title: 'Choices for the second space',
        input: { type: 'number', answer: '6', after: 'cars' },
        line: 'Second space: @ choices (one car is parked).',
        hint: 'One car is already in the first space.',
        why: 'No repeats: one car fewer for each space.',
        slips: [{ value: '7', key: 'repeat', msg: 'A car cannot park in two spaces. One is parked, so 6 are left.' }],
      },
      {
        title: 'Choices for the last space',
        input: { type: 'number', answer: '1', after: 'car' },
        line: 'Last space: @ choice, the car that is left.',
        hint: 'Six cars are parked. How many are still waiting?',
      },
      {
        title: 'Multiply the slots: this is 7!',
        input: { type: 'number', before: '<<7>> × <<6>> × 5 × 4 × 3 × 2 × <<1>> =', answer: '5040', after: 'ways' },
        line: '7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = @ ways',
        hint: '7 × 6 × 5 is 210, and 4 × 3 × 2 is 24. Then 210 × 24.',
        slips: [
          { value: '28', key: 'added', msg: '28 is 7 + 6 + 5 + 4 + 3 + 2 + 1. The slots multiply.' },
          { value: '720', key: 'one-short', msg: '720 is 6!, one space short. There are 7 spaces: 7 × 720.' },
          { value: '823543', step: 2, key: 'repeat-end', msg: '823,543 is 7 × 7 × … × 7, which lets one car park in every space. Each space has one car fewer.' },
        ],
      },
    ],
  },
  {
    id: 'f2', level: 'focus',
    prompt: 'A teacher has {{9 different stickers}}. She gives one sticker each to {{3 students}}: Ana, Ben and Chi. [[In how many ways can she give out the stickers?]]',
    inlineSvg: emptySlots('Ana', 'Ben', 'Chi'),
    steps: [
      {
        title: 'How many slots do you draw?',
        input: { type: 'number', answer: '3', after: 'slots' },
        line: 'One slot for each student: @ slots.',
        hint: 'A slot is a place to fill. Who is getting a sticker?',
        slips: [{ value: '9', key: 'slot-per-sticker', msg: '9 is the number of stickers: those are the choices. The slots are the places to fill, one for each of the 3 students.' }],
      },
      {
        title: "Choices for Ben's sticker",
        sub: 'Ana chose first, from all 9.',
        input: { type: 'number', answer: '8', after: 'stickers' },
        line: 'Ana: 9 choices. Ben: @ choices.',
        hint: 'Ana already has one of the stickers.',
        slips: [{ value: '9', key: 'repeat', msg: 'The stickers are all different, and Ana has one. 8 are left for Ben.' }],
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '{{9}} × <<8>> × 7 =', answer: '504', after: 'ways' },
        line: '9 × 8 × 7 = @ ways',
        hint: '9 × 8 is 72. Then 72 × 7.',
        slips: [
          { value: '84', key: 'order-dropped', msg: '84 is 504 ÷ 6, the number of SETS of 3 stickers. But Ana, Ben and Chi are different people: who gets which sticker matters.' },
          { value: '729', step: 2, key: 'repeat-end', msg: '729 is 9 × 9 × 9: one sticker given out three times. Each slot has one choice fewer.' },
          { value: '362880', key: 'all-nine', msg: '362,880 is 9!, as if all 9 stickers were given out. Only 3 students get one: stop after 3 slots.' },
        ],
      },
      {
        title: 'Write it with factorials',
        sub: 'The stickers left over cancel out.',
        input: { type: 'number', before: '<<504>> = 9! ÷', answer: '6', after: '!' },
        line: '504 = 9! ÷ @!, because 6 stickers are left over.',
        hint: 'How many of the stickers are NOT given out?',
        why: 'k slots counting down from n are n! ÷ (n − k)!.',
        slips: [{ value: '3', key: 'n-over-k', msg: '9! ÷ 3! is 60,480, far too many. Divide by the factorial of the stickers left OVER: 9 − 3 = 6.' }],
      },
    ],
  },
  {
    id: 'f3', level: 'focus',
    prompt: 'The letters of the word {{SUCCESS}} are arranged in a row. [[How many distinct arrangements are there?]]',
    inlineSvg: wordTiles('SUCCESS'),
    steps: [
      {
        title: 'How many letters are there?',
        input: { type: 'number', answer: '7', after: 'letters' },
        line: 'SUCCESS has @ letters.',
        hint: 'Count every tile, repeats too.',
        slips: [{ value: '4', key: 'distinct-only', msg: '4 counts the different letters S, U, C and E. Every letter takes a place in the row: 7.' }],
      },
      {
        title: 'Arrange them as if all different',
        input: { type: 'number', before: '<<7>>! =', answer: '5040' },
        line: 'As if all different: 7! = @.',
        hint: '7 × 6 × 5 × 4 × 3 × 2 × 1.',
      },
      {
        title: 'Which letters repeat?',
        input: {
          type: 'choice',
          options: [
            { id: 's', text: 'S, 3 times' },
            { id: 'sc', text: 'S, 3 times, and C, 2 times' },
            { id: 'c', text: 'C, 2 times' },
          ],
          answer: 'sc',
        },
        line: 'S comes 3 times and C comes 2 times.',
        hint: 'Look at the orange tiles.',
        slips: [
          { value: 's', key: 'missed-c', msg: 'Look again: C comes twice too, in the middle.' },
          { value: 'c', key: 'missed-s', msg: 'Look again: S comes three times, at the start and the end.' },
        ],
      },
      {
        title: 'Divide by the orders of each repeat',
        input: { type: 'number', before: '<<5040>> ÷ (3! × 2!) =', answer: '420', after: 'arrangements' },
        line: '5040 ÷ (3! × 2!) = 5040 ÷ 12 = @ arrangements',
        hint: '3! × 2! is 6 × 2 = 12.',
        why: "Every word was counted 3! times for the S's and 2! times for the C's.",
        slips: [
          { value: '5040', key: 'no-divide', msg: "5040 counts the three S's as if they were different. Divide by their orders, and by the C's orders too." },
          { value: '1008', key: 'sum', msg: '1008 is 5040 ÷ 5, because 3 + 2 letters repeat. Divide by their ORDERS instead: 3! = 6 and 2! = 2.' },
          { value: '840', step: 3, key: 'missed-c-end', msg: "840 divides by 3! only. The C's repeat too: divide by 2! as well." },
          { value: '2520', step: 3, key: 'missed-s-end', msg: "2520 divides by 2! only. The S's come 3 times: divide by 3! as well." },
        ],
      },
    ],
  },
  {
    id: 'f4', level: 'focus',
    prompt: '{{7 different books}} go on a shelf. The {{3 math books}} (orange) must stand {{next to each other}}. [[In how many ways can the books be arranged?]]',
    inlineSvg: tileRow(['A', 'B', 'C', 'D', 'X', 'Y', 'Z'], { mark: { X: true, Y: true, Z: true } }),
    steps: [
      {
        title: 'Glue the math books: how many units?',
        input: { type: 'number', answer: '5', after: 'units' },
        line: '4 other books + 1 block of math books = @ units.',
        hint: 'The glued block counts as one unit. How many books are not in it?',
        slips: [
          { value: '4', key: 'block-missing', msg: '4 counts only the other books. The block of math books is a unit too: 4 + 1 = 5.' },
          { value: '7', key: 'no-glue', msg: '7 counts every book on its own. Glue the 3 math books into one block first.' },
        ],
      },
      {
        title: 'Arrange the units',
        input: { type: 'number', before: '<<5>>! =', answer: '120' },
        line: '5! = @ orders of the units.',
        hint: '5 × 4 × 3 × 2 × 1.',
      },
      {
        title: 'Orders inside the block',
        input: { type: 'number', before: '3! =', answer: '6', after: 'orders' },
        line: 'Inside the block: 3! = @ orders.',
        hint: 'The 3 math books are different. In how many orders can they stand?',
        why: 'The block stays together, but the books inside it can swap.',
      },
      {
        title: 'Multiply',
        input: { type: 'number', before: '<<120>> × <<6>> =', answer: '720', after: 'ways' },
        line: '120 × 6 = @ ways',
        hint: '120 × 6.',
        slips: [
          { value: '120', step: 3, key: 'no-inside', msg: '120 arranges the units but keeps the math books in one order. They can swap inside the block: × 3!.' },
          { value: '144', step: 1, key: 'block-missing-end', msg: '144 is 4! × 3!: the block was left out of the units. It is one of the 5 units.' },
          { value: '5040', step: 1, key: 'no-glue-end', msg: '5040 is 7!, every order of the books. The math books must be together, so glue them first.' },
        ],
      },
    ],
  },
];

const practice = [
  {
    id: 'p1', level: 'practice',
    prompt: 'The letters of {{PUZZLE}} are arranged so that the word {{begins with a Z}}. [[How many arrangements are possible?]]',
    steps: [
      {
        title: 'Z goes first: how many letters left?',
        input: { type: 'number', answer: '5', after: 'letters' },
        line: 'Z goes first; @ letters are left: P, U, Z, L, E.',
        hint: 'PUZZLE has 6 letters, and one of them is now in the first place.',
      },
      {
        title: 'Do any of the letters left repeat?', key: true,
        input: {
          type: 'choice',
          options: [
            { id: 'no', text: 'No: P, U, Z, L, E are all different' },
            { id: 'yes', text: "Yes: there are still two Z's" },
          ],
          answer: 'no',
        },
        line: 'One Z is used, so P, U, Z, L, E are all different.',
        hint: "PUZZLE has two Z's, and one of them is at the front.",
        why: 'Only one Z is left, so there is nothing to divide by.',
        slips: [{ value: 'yes', key: 'z-twice', msg: 'One Z is at the front already. The five letters left hold just one Z.' }],
      },
      {
        title: 'Arrange the letters left', key: true,
        input: { type: 'number', before: '<<5>>! =', answer: '120', after: 'arrangements' },
        line: 'Arrange the rest: 5! = @ arrangements.',
        hint: 'Five different letters in five places.',
        slips: [
          { value: '60', step: 2, key: 'z-twice-end', msg: '60 is 5! ÷ 2!, still dividing for two Z\'s. Only one Z is left after the first place.' },
          { value: '360', step: 1, key: 'no-rule', msg: '360 is 6! ÷ 2!: every arrangement of PUZZLE. Only the ones that begin with Z count.' },
          { value: '240', key: 'which-z', msg: '240 is 2 × 120, as if it mattered which Z goes first. The two Z\'s look the same, so ZPUZLE is one word, not two.' },
        ],
      },
    ],
  },
  {
    id: 'p2', level: 'practice',
    prompt: '{{7 children}} sit in a row of 7 seats. {{Two brothers}} must {{not sit next to each other}}. [[In how many ways can the children sit?]]',
    steps: [
      {
        title: 'Count all the ways to sit',
        input: { type: 'number', before: '7! =', answer: '5040', after: 'ways' },
        line: 'All: 7! = @ ways.',
        hint: 'Seven children, seven seats, no rule yet.',
      },
      {
        title: 'Count the ways with the brothers together', key: true,
        input: { type: 'number', answer: '1440', after: 'ways' },
        line: 'Together: glue the brothers, 6! × 2 = @ ways.',
        hint: 'Glue the brothers: 6 units. Then × the orders inside the block.',
        slips: [{ value: '720', key: 'no-inside', msg: '720 is 6!, with the brothers in one order. Inside the block they can swap: × 2.' }],
      },
      {
        title: 'Take away the ways they sit together', key: true,
        input: { type: 'number', before: '<<5040>> − <<1440>> =', answer: '3600', after: 'ways' },
        line: 'Apart: 5040 − 1440 = @ ways.',
        hint: 'Apart = all − together.',
        why: '"Not next to each other" is the opposite of "together".',
        slips: [
          { value: '1440', key: 'together', msg: '1440 is the number of ways with the brothers TOGETHER. Take it away from all 5040.' },
          { value: '4320', step: 2, key: 'no-inside-end', msg: '4320 is 5040 − 720: the brothers glued in one order only. They can swap inside the block: 720 × 2 = 1440.' },
        ],
      },
    ],
  },
  {
    id: 'p3', level: 'practice',
    prompt: '{{5 children}} line up. The {{three youngest}} must stand {{in order of age}}, youngest first, but not necessarily next to each other. [[How many lines are possible?]]',
    steps: [
      {
        title: 'Count all the lines',
        input: { type: 'number', before: '5! =', answer: '120', after: 'lines' },
        line: 'With no rule: 5! = @ lines.',
        hint: 'Five children in five places.',
      },
      {
        title: 'Orders of the three youngest', key: true,
        input: { type: 'number', before: '3! =', answer: '6', after: 'orders' },
        line: 'The three youngest can come in 3! = @ orders.',
        hint: 'Look only at the three youngest. In how many orders can they come?',
        slips: [{ value: '3', key: 'three', msg: '3 is how many children there are. They can come in 3 × 2 × 1 = 6 orders.' }],
      },
      {
        title: 'Keep one order in each group', key: true,
        input: { type: 'number', before: '<<120>> ÷ <<6>> =', answer: '20', after: 'lines' },
        line: 'Only 1 of the 6 orders is allowed: 120 ÷ 6 = @ lines.',
        hint: 'The lines come in groups of 6 that differ only in the order of the three youngest. One in each group is right.',
        why: 'A fixed order for k things: divide by k!.',
        slips: [
          { value: '40', step: 2, key: 'three-end', msg: '40 is 120 ÷ 3. The three youngest have 3! = 6 orders, not 3.' },
          { value: '60', key: 'one-pair', msg: '60 is 120 ÷ 2, which puts only two of them in order. All three must be in order: ÷ 3!.' },
          { value: '120', key: 'no-rule', msg: '120 is every line. Only one order of the three youngest is allowed.' },
        ],
      },
    ],
  },
];

const challenge = [
  {
    id: 'c1', level: 'challenge',
    prompt: "The letters of {{CANNON}} are arranged so that {{all three N's are together}}. [[How many arrangements are possible?]]",
    steps: [
      {
        title: "Glue the N's: how many units?",
        input: { type: 'number', answer: '4', after: 'units' },
        line: 'C, A, O and the block NNN: @ units.',
        hint: "The block of N's is one unit. Which letters are not in it?",
        slips: [{ value: '3', key: 'block-missing', msg: '3 counts only C, A and O. The NNN block is a unit too: 4.' }],
      },
      {
        title: 'Do any of the units repeat?',
        input: {
          type: 'choice',
          options: [
            { id: 'no', text: 'No: C, A, O and NNN are all different' },
            { id: 'yes', text: "Yes: the N's repeat" },
          ],
          answer: 'no',
        },
        line: 'C, A, O and NNN are four different units.',
        hint: "Where are the N's now?",
        slips: [{ value: 'yes', key: 'divide-again', msg: "The three N's are all inside the block now. The four units are all different, so there is nothing to divide by." }],
      },
      {
        title: 'Orders inside the block',
        input: { type: 'number', answer: '1', after: 'order' },
        line: 'NNN reads the same in any order: @ order inside.',
        hint: 'Swap two of the N\'s. Does the block change?',
        why: 'Identical letters inside a block: only 1 order.',
        slips: [{ value: '6', key: 'inside-3fact', msg: "6 is 3!, as if the N's were different. Swapping two N's gives the same block: 1 order." }],
      },
      {
        title: 'How many arrangements?',
        input: { type: 'number', before: '4! × <<1>> =', answer: '24', after: 'arrangements' },
        line: '4! × 1 = @ arrangements',
        hint: "Glue the N's into one block. How many units are there, and do any of them repeat?",
        slips: [
          { value: '144', step: 3, key: 'inside-3fact-end', msg: "144 is 4! × 3!. The N's are the same letter, so the block has only 1 order inside." },
          { value: '4', step: 2, key: 'divide-again-end', msg: "4 is 4! ÷ 3!: it divides for the N's again. They are one block now, not three loose letters." },
          { value: '6', step: 1, key: 'block-missing-end', msg: '6 is 3!: only C, A and O were arranged. The NNN block is a fourth unit.' },
          { value: '120', step: 1, key: 'no-glue', msg: "120 is 6! ÷ 3!, every arrangement of CANNON. The N's must be together, so glue them first." },
        ],
      },
    ],
  },
  {
    id: 'c2', level: 'challenge',
    prompt: "The letters of {{COFFEE}} are arranged so that {{the two F's are not next to each other}}. [[How many arrangements are possible?]]",
    steps: [
      {
        title: 'Count all the arrangements',
        input: { type: 'number', answer: '180', after: 'arrangements' },
        line: "All: 6! ÷ (2! × 2!) = @, with F twice and E twice.",
        hint: 'COFFEE has 6 letters, with F twice and E twice.',
        slips: [
          { value: '720', key: 'no-divide', msg: "720 is 6!, as if the F's and E's were all different. Divide by 2! for the F's and 2! for the E's." },
          { value: '360', key: 'one-divide', msg: '360 divides by 2! once. Both F and E come twice: ÷ (2! × 2!).' },
        ],
      },
      {
        title: "Count the ones with the F's together",
        input: { type: 'number', answer: '60', after: 'arrangements' },
        line: 'Together: glue FF. C, O, FF, E, E is 5 units, E twice: 5! ÷ 2! = @.',
        hint: "Glue the two F's into one block. Do any of the units still repeat?",
        slips: [
          { value: '120', key: 'e-forgot', msg: "120 is 5!, which forgets that the two E's are the same. Divide by 2!: 60." },
          { value: '30', key: 'f-twice', msg: "30 also divides by 2! for the F's. Glued, they are one block, with 1 order inside." },
        ],
      },
      {
        title: 'Apart = all − together',
        input: { type: 'number', before: '<<180>> − <<60>> =', answer: '120', after: 'arrangements' },
        line: '180 − 60 = @ arrangements',
        hint: "Count all the arrangements, then take away the ones with the F's together.",
        slips: [
          { value: '60', step: 2, key: 'together', msg: "60 is the number with the F's TOGETHER. The question asks for all the others: all − together." },
          { value: '660', step: 1, key: 'no-divide-end', msg: '660 is 720 − 60, and the 720 forgets that F and E repeat. All the arrangements: 6! ÷ (2! × 2!) = 180.' },
          { value: '150', step: 2, key: 'f-twice-end', msg: "150 is 180 − 30: the together count divided by 2! for the F's as well. Glued, they are one block: 5! ÷ 2! = 60." },
        ],
      },
    ],
  },
  {
    id: 'c3', level: 'challenge',
    prompt: '{{4 boys}} and {{3 girls}} stand in a row. The {{girls stand together}}, and {{a boy stands at each end}}. [[How many rows are possible?]]',
    steps: [
      {
        title: 'Glue the girls: how many units?',
        input: { type: 'number', answer: '5', after: 'units' },
        line: '4 boys + 1 block of girls = @ units.',
        hint: 'The block of girls is one unit.',
        slips: [{ value: '7', key: 'no-glue', msg: '7 counts everyone on their own. Glue the 3 girls into one block first.' }],
      },
      {
        title: 'Fill the two end places first',
        input: { type: 'number', answer: '12', after: 'ways' },
        line: 'Ends: 4 boys for the left end, then 3 for the right: 4 × 3 = @.',
        hint: 'Both ends must be boys. How many boys could stand at the left end? Then at the right?',
        why: 'The ends are the fussy places, so they go first.',
        slips: [{ value: '16', key: 'end-twice', msg: '16 is 4 × 4: one boy at both ends. After the left end, 3 boys are left: 4 × 3 = 12.' }],
      },
      {
        title: 'Arrange the units in the middle',
        input: { type: 'number', answer: '6', after: 'ways' },
        line: 'Middle: 2 boys and the block, 3! = @.',
        hint: 'Two boys are at the ends. Which units are left for the middle?',
        slips: [{ value: '2', key: 'block-forgot', msg: "2 arranges only the 2 boys. The girls' block is in the middle too: 3 units, 3! = 6." }],
      },
      {
        title: 'Orders of the girls inside the block',
        input: { type: 'number', before: '3! =', answer: '6', after: 'orders' },
        line: 'Inside the block: 3! = @ orders.',
        hint: 'The three girls are different people.',
      },
      {
        title: 'Multiply',
        input: { type: 'number', before: '<<12>> × <<6>> × <<6>> =', answer: '432', after: 'rows' },
        line: '12 × 6 × 6 = @ rows',
        hint: 'Glue the girls. Then fill the two ends with boys before anything else.',
        slips: [
          { value: '72', step: 4, key: 'no-inside', msg: '72 keeps the girls in one order. They can swap inside the block: × 3! = 6.' },
          { value: '720', step: 2, key: 'no-ends', msg: '720 is 5! × 3!: the girls glued, but the ends ignored. A boy must stand at each end, so fill those places first.' },
          { value: '576', step: 2, key: 'end-twice-end', msg: '576 is 16 × 6 × 6: one boy at both ends. After the left end only 3 boys are left.' },
          { value: '144', step: 3, key: 'block-forgot-end', msg: "144 is 12 × 2 × 6: the girls' block was left out of the middle. The middle holds 2 boys and the block: 3! = 6." },
        ],
      },
    ],
  },
];

export const stepPractice = {
  title: 'Arrangements: step by step',
  items: [...focus, ...practice, ...challenge],
};
