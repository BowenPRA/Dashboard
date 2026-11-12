// src/data/AMC8/TP_01/notes.js
// TP_01 — How Many Ways? The deck of a PROBLEM-TYPE unit: one kind of contest
// question, and one method for it, taught from the first idea to a real
// contest-level example. (A practice-test unit's deck is a toolkit of nine
// separate tools; this is the opposite: one tool, built up.)
//
// The shape (docs/amc8-course.md, "Problem-type units"):
//   hero → spot the type → the method → one question to ask about your slots
//   per slide → a contest question done slowly → the checklist.
// Every teaching slide: the idea with ONE small example, ONE orange Write
// card (a `steps` slide carries its line in the steps), ONE check with fresh
// numbers whose wrong options are the real mistakes.
//
// NOTHING HERE IS A PROBLEM OF THE PRACTICE SET OR THE TEST. Same method,
// fresh numbers and contexts, so the test still measures something.
//
// SPINE — the method is one row of slots; each slide adds one question to ask:
//   1   hero
//   2   spot it: "how many ways" = slots
//   3   choice after choice: multiply (the tree)
//   4   the slots method, in three steps
//   5   can it repeat?
//   6   is there a fussy slot? fill it first
//   7   is one row enough? cases: count each, add
//   8   "at least one": count the opposite
//   9   does order matter? divide
//   10  a contest question, slowly (fussy slot + cases)
//   11  the checklist
//
// House notes:
//  · ENGLISH ONLY — AMC8 declares `bilingual: false`; no `vn*` twins.
//  · Prefer inline `$…$`; every slide must fit 1280 × 720 without scrolling.
//  · `check` is always the LAST key on its slide.
//  · A `steps` slide renders no `notes` and carries no diagram with its check.
//  · American spelling, because the contest is American.
import { DIAGRAMS } from './diagrams.js';

const PLAN = '#be185d';
const COUNTING = '#0f766e';

export const notes = [
  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: COUNTING,
    icon: 'Layers',
    brand: 'AMC 8 Prep',
    eyebrow: 'Problem type 1 · Counting',
    title: 'How Many Ways?',
    objective: 'I can count the ways with slots: multiply the choices, fill the fussy slot first, and split into cases.',
  },

  // ── 2 · spot it ───────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Crosshair',
    eyebrow: 'Counting · Spot it',
    title: 'Spot the Question',
    content: 'About **one question in four** on an AMC 8 paper is a counting question. Most ask the same thing: in **how many ways** can something be chosen, arranged or built?\n\nLook for: _how many different_, _in how many ways_, codes, outfits, orders, 3-digit numbers.',
    notes: [
      { tone: 'write', text: '**"How many ways?"** Draw **slots**: one blank for each choice you make.' },
    ],
    check: {
      id: 'chk_slots',
      q: 'A pizza has one of 2 crusts, one of 3 sauces and one of 4 toppings. How many slots do you draw?',
      options: [
        { val: 'A', text: '$2$' },
        { val: 'B', text: '$3$' },
        { val: 'C', text: '$4$' },
        { val: 'D', text: '$9$' },
      ],
      correct: 'B',
      expEn: 'There are three choices to make: a crust, a sauce and a topping. That is one slot for each, so 3 slots. D adds up the things on the menu. A and C are the numbers that go inside two of the slots.',
    },
  },

  // ── 3 · multiply ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'GitMerge',
    eyebrow: 'Counting · Multiply',
    title: 'Choice After Choice',
    ratio: 46,
    inlineSvg: DIAGRAMS.TREE,
    content: 'Pick a shirt, then pants. Each of the **3** shirts goes with each of the **2** pants: $3 \\times 2 = 6$ outfits.\n\nYou do not need the tree, only the number of branches at each step.',
    notes: [
      { tone: 'write', text: '**Slots:** write the number of choices in each blank, then **multiply**.' },
    ],
    check: {
      id: 'chk_multiply',
      q: 'An ice cream has one of 4 flavors, one of 3 toppings, and a cone or a cup. How many different ice creams are there?',
      options: [
        { val: 'A', text: '$9$' },
        { val: 'B', text: '$12$' },
        { val: 'C', text: '$24$' },
        { val: 'D', text: '$14$' },
      ],
      correct: 'C',
      expEn: 'Three slots: $4 \\times 3 \\times 2 = 24$. A adds the choices, but every flavor goes with every topping, so they multiply. B stops after two slots. D multiplies two slots and adds the third.',
    },
  },

  // ── 4 · the method ────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: COUNTING,
    icon: 'ListChecks',
    eyebrow: 'Counting · The method',
    title: 'The Slots Method',
    content: 'A locker code is a letter from **A, B, C, D** and then **two digits** from 0 to 9. How many codes are there?',
    steps: [
      { text: '**Draw the slots.** Three choices, so three blanks: letter, digit, digit.' },
      { text: '**Fill each slot** with its number of choices: 4, then 10, then 10.' },
      { text: '**Multiply.** $4 \\times 10 \\times 10 = 400$ codes.' },
    ],
    check: {
      id: 'chk_method',
      q: 'How many 3-digit numbers have only odd digits, like 715 or 999?',
      options: [
        { val: 'A', text: '$125$' },
        { val: 'B', text: '$15$' },
        { val: 'C', text: '$60$' },
        { val: 'D', text: '$243$' },
      ],
      correct: 'A',
      expEn: 'Each digit is 1, 3, 5, 7 or 9, so every slot has 5 choices: $5 \\times 5 \\times 5 = 125$. B adds the slots. C is $5 \\times 4 \\times 3$, which is right only when no digit may repeat, but 999 is allowed. D swaps the numbers: five slots of 3.',
    },
  },

  // ── 5 · can it repeat? ────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'Repeat',
    eyebrow: 'Counting · Ask 1',
    title: 'Can It Repeat?',
    content: '**Yes** (a lock can show 7-7-7): every slot keeps all its choices. Three dials of 5 give $5 \\times 5 \\times 5 = 125$.\n\n**No** (a runner cannot win two medals): each slot has one fewer. 5 runners and 3 medals give $5 \\times 4 \\times 3 = 60$.',
    notes: [
      { tone: 'write', text: '**Can it repeat?** Yes: the same number in every slot. No: **one fewer** each time.' },
    ],
    check: {
      id: 'chk_repeat',
      q: 'A club of 6 members picks a president, a secretary and a treasurer: three different people. In how many ways?',
      options: [
        { val: 'A', text: '$216$' },
        { val: 'B', text: '$120$' },
        { val: 'C', text: '$18$' },
        { val: 'D', text: '$15$' },
      ],
      correct: 'B',
      expEn: 'No one holds two jobs, so the choices go down: $6 \\times 5 \\times 4 = 120$. A is $6 \\times 6 \\times 6$, which lets one person take all three jobs. C and D add the slots.',
    },
  },

  // ── 6 · fussy slot first ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Star',
    eyebrow: 'Counting · Ask 2',
    title: 'Fussy Slot First',
    ratio: 46,
    inlineSvg: DIAGRAMS.FUSSY_FIRST,
    content: 'Some slots have a rule of their own: the number must be **even**, or the first digit cannot be **0**.\n\nFill that slot **first**, while all its choices are still there. Then fill the rest.',
    notes: [
      { tone: 'write', text: '**Fussy slot first:** fill the slot with a rule before the free slots.\nA number never starts with 0.' },
    ],
    check: {
      id: 'chk_fussy',
      q: 'How many 2-digit numbers have two different digits?',
      options: [
        { val: 'A', text: '$90$' },
        { val: 'B', text: '$100$' },
        { val: 'C', text: '$72$' },
        { val: 'D', text: '$81$' },
      ],
      correct: 'D',
      expEn: 'The tens digit is fussy, because it cannot be 0: 9 choices. The ones digit can be any of the 10 digits except the one already used: 9 choices. $9 \\times 9 = 81$. A counts every 2-digit number, also 11, 22 and so on. B lets a number start with 0. C takes a digit away twice.',
    },
  },

  // ── 7 · cases ─────────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: COUNTING,
    icon: 'Divide',
    eyebrow: 'Counting · Ask 3',
    title: 'Is One Row Enough?',
    content: 'How many whole numbers from **10 to 999** have only odd digits? Some have 2 digits and some have 3, so one row of slots is not enough.',
    steps: [
      { text: '**Split into cases** that do not overlap: 2-digit numbers and 3-digit numbers.' },
      { text: '**Count each case** with its own slots: $5 \\times 5 = 25$ and $5 \\times 5 \\times 5 = 125$.' },
      { text: '**Add the cases.** $25 + 125 = 150$. Multiply along a row; add across cases.' },
    ],
    check: {
      id: 'chk_cases',
      q: 'A password is 1 letter or 2 letters long. Each letter is A, B, C or D, and letters may repeat. How many passwords are there?',
      options: [
        { val: 'A', text: '$64$' },
        { val: 'B', text: '$16$' },
        { val: 'C', text: '$20$' },
        { val: 'D', text: '$8$' },
      ],
      correct: 'C',
      expEn: 'One letter: 4. Two letters: $4 \\times 4 = 16$. A password is one case OR the other, so add: $4 + 16 = 20$. A multiplies the two cases. B forgets the 1-letter passwords. D adds inside the 2-letter case, where the slots multiply.',
    },
  },

  // ── 8 · the opposite ──────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: COUNTING,
    icon: 'RotateCcw',
    eyebrow: 'Counting · A shortcut',
    title: 'Count the Opposite',
    content: '"**At least one**" hides many cases: exactly one, exactly two, and so on. Count the opposite instead.\n\nHow many 2-letter codes from A, B, C, D, E have at least one A? All the codes: $5 \\times 5 = 25$. Codes with **no** A: $4 \\times 4 = 16$. So $25 - 16 = 9$.',
    notes: [
      { tone: 'write', text: '**At least one** $=$ all $-$ none.' },
    ],
    check: {
      id: 'chk_opposite',
      q: 'A coin is flipped 3 times, giving a result like H-T-H. How many of the possible results have at least one head?',
      options: [
        { val: 'A', text: '$7$' },
        { val: 'B', text: '$3$' },
        { val: 'C', text: '$6$' },
        { val: 'D', text: '$4$' },
      ],
      correct: 'A',
      expEn: 'All the results: $2 \\times 2 \\times 2 = 8$. Only one of them, T-T-T, has no head. $8 - 1 = 7$. B counts the results with exactly one head. C is $2 + 2 + 2$. D is half of the 8, a guess.',
    },
  },

  // ── 9 · order ─────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: COUNTING,
    icon: 'Link',
    eyebrow: 'Counting · Ask 4',
    title: 'Does Order Matter?',
    ratio: 46,
    inlineSvg: DIAGRAMS.PAIRS,
    content: 'Four friends all shake hands. The slots say $4 \\times 3 = 12$, but A with B and B with A are **one** handshake.\n\nEach was counted twice, so divide: $12 \\div 2 = 6$.',
    notes: [
      { tone: 'write', text: '**Order does not matter?** Count with slots, then **divide** by the orders: 2 for a pair, 6 for three.' },
    ],
    check: {
      id: 'chk_order',
      q: 'Six teams are in a league. Every team plays every other team once. How many games are played?',
      options: [
        { val: 'A', text: '$30$' },
        { val: 'B', text: '$36$' },
        { val: 'C', text: '$12$' },
        { val: 'D', text: '$15$' },
      ],
      correct: 'D',
      expEn: 'Slots: $6 \\times 5 = 30$. But team 1 against team 2 is the same game as team 2 against team 1, so each game was counted twice: $30 \\div 2 = 15$. A forgets to divide. B lets a team play itself. C is $6 \\times 2$.',
    },
  },

  // ── 10 · a contest question, slowly ───────────────────────────────────────
  {
    layout: 'steps',
    accent: COUNTING,
    icon: 'Target',
    eyebrow: 'Counting · Put it together',
    title: 'A Contest Question, Slowly',
    content: 'How many **even** 3-digit numbers have **three different digits**? The hundreds digit cannot be 0 or repeat the last digit, so take the last digit in **cases**.',
    steps: [
      { text: '**Ends in 0:** hundreds 9, tens 8. $9 \\times 8 = 72$.' },
      { text: '**Ends in 2, 4, 6 or 8:** 4 ways; hundreds 8; tens 8. $4 \\times 8 \\times 8 = 256$.' },
      { text: '**Add the cases.** $72 + 256 = 328$.' },
    ],
    check: {
      id: 'chk_contest',
      q: 'How many odd 3-digit numbers have three different digits?',
      options: [
        { val: 'A', text: '$360$' },
        { val: 'B', text: '$320$' },
        { val: 'C', text: '$405$' },
        { val: 'D', text: '$328$' },
      ],
      correct: 'B',
      expEn: 'Ones digit first: 5 choices. The hundreds digit cannot be 0 or the ones digit: 8 choices. The tens digit can be anything except the two used: 8 choices. $5 \\times 8 \\times 8 = 320$. No cases this time, because an odd number never ends in 0. A forgets that the hundreds digit cannot be 0. C lets digits repeat. D is the count of the even ones.',
    },
  },

  // ── 11 · checklist ────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PLAN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you practice',
    title: 'Ready to Count?',
    content: '> Copy every orange **Write** card into your notebook. Then open **Step by Step**.',
    items: [
      { text: 'Draw a slot for each choice. Multiply.' },
      { text: 'Can it repeat? If not, one fewer each time.' },
      { text: 'Fussy slot first. A number never starts with 0.' },
      { text: 'One row is not enough? Cases: count each, then add.' },
      { text: 'At least one = all − none.' },
      { text: 'Order does not matter? Divide by the orders.' },
    ],
  },
];
