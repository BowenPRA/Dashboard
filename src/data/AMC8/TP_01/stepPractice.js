// src/data/AMC8/TP_01/stepPractice.js
// TP_01 — How Many Ways? The practice set for Step by Step (STEP_PRACTICE,
// p93; docs/step-practice.md). Ten original problems, one per question type
// the deck teaches, with the scaffold fading:
//
//   Focus      f1 plain slots · f2 repeats allowed · f3 no repeats · f4 fussy slot
//              every step is asked; the slots are drawn (empty) beside the problem
//   Practice   p1 the zero rule · p2 cases · p3 order does not matter
//              only the steps where the thinking is; no figure
//   Challenge  c1 a rule between neighbors · c2 at least one · c3 fussy slot + cases
//              only the answer; a wrong answer opens the step its slip points at
//
// Every slip is a real wrong turn with its number worked out: adding the
// slots, letting something repeat, forgetting the fussy slot, multiplying the
// cases, counting a pair twice. NO PROBLEM HERE IS IN THE DECK OR THE TEST.
// English only (AMC8 is not bilingual), so there are no twins.
import { emptySlots } from './figures.js';

const focus = [
  {
    id: 'f1', level: 'focus',
    prompt: 'A sandwich shop has {{4 breads}}, {{3 fillings}} and {{2 sauces}}. A sandwich has one of each. [[How many different sandwiches can be made?]]',
    inlineSvg: emptySlots('bread', 'filling', 'sauce'),
    steps: [
      {
        title: 'How many choices does a customer make?',
        input: { type: 'number', answer: '3', after: 'choices' },
        line: 'Slots: bread, filling, sauce.',
        hint: 'Count the things to pick, not how many there are of each.',
        why: 'One slot for each choice: a bread, a filling, a sauce.',
        slips: [{ value: '9', key: 'menu-not-slots', msg: '9 is 4 + 3 + 2, the items on the menu. A customer makes 3 choices: a bread, a filling and a sauce.' }],
      },
      {
        title: 'Add the slots, or multiply them?',
        sub: 'Each bread can go with every filling.',
        input: { type: 'choice', options: [{ id: 'add', text: 'Add: 4 + 3 + 2' }, { id: 'mul', text: 'Multiply: 4 × 3 × 2' }], answer: 'mul' },
        line: 'Every choice goes with every other choice: multiply.',
        hint: 'One bread already makes 3 different sandwiches, one for each filling. What do 4 breads make?',
        slips: [{ value: 'add', key: 'added', msg: 'Adding counts the items on the menu. Each of the 4 breads goes with each of the 3 fillings: that is 4 × 3 already.' }],
      },
      {
        title: 'Multiply the slots',
        input: { type: 'number', before: '{{4}} × {{3}} × {{2}} =', answer: '24', after: 'sandwiches' },
        line: '{{4}} × {{3}} × {{2}} = @ sandwiches',
        hint: 'Do 4 × 3 first, then double it.',
        slips: [
          { value: '9', step: 2, key: 'added-end', msg: '9 is 4 + 3 + 2. The slots multiply: 4 × 3 × 2.' },
          { value: '12', key: 'two-slots', msg: '12 is 4 × 3. The sauce slot is still to come: × 2.' },
        ],
      },
    ],
  },
  {
    id: 'f2', level: 'focus',
    prompt: 'A code is {{3 letters}} long. Each letter is {{A, B, C, D or E}}, and a letter {{may be used again}}. [[How many codes are there?]]',
    inlineSvg: emptySlots('1st letter', '2nd letter', '3rd letter'),
    steps: [
      {
        title: 'Choices for the first letter',
        input: { type: 'number', answer: '5', after: 'choices' },
        line: 'First letter: @ choices.',
        hint: 'Count the letters it could be.',
      },
      {
        title: 'Choices for the second letter',
        input: { type: 'number', answer: '5', after: 'choices' },
        line: 'Second letter: @ choices (a letter may repeat).',
        hint: 'Read the rule again: may a letter be used again?',
        why: 'Repeats allowed: every slot keeps all its choices.',
        slips: [{ value: '4', key: 'no-repeat', msg: '4 would be right if a letter could not be used again. Here it may, so the second slot still has 5.' }],
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '<<5>> × <<5>> × {{5}} =', answer: '125', after: 'codes' },
        line: '5 × 5 × 5 = @ codes',
        hint: '5 × 5 is 25. Then 25 × 5.',
        slips: [
          { value: '15', key: 'added', msg: '15 is 5 + 5 + 5. The slots multiply: 5 × 5 × 5.' },
          { value: '60', step: 2, key: 'no-repeat-end', msg: '60 is 5 × 4 × 3, the count when no letter repeats. Here a letter may be used again.' },
        ],
      },
    ],
  },
  {
    id: 'f3', level: 'focus',
    prompt: '{{6 runners}} are in a race, and there are no ties. [[In how many ways can first, second and third place be filled?]]',
    inlineSvg: emptySlots('1st place', '2nd place', '3rd place'),
    steps: [
      {
        title: 'Choices for first place',
        input: { type: 'number', answer: '6', after: 'runners' },
        line: 'First place: @ choices.',
        hint: 'Any of the runners could win.',
      },
      {
        title: 'Choices for second place',
        input: { type: 'number', answer: '5', after: 'runners' },
        line: 'Second place: @ choices (the winner is used).',
        hint: 'One runner has already finished first.',
        why: 'No repeats: each slot has one fewer choice.',
        slips: [{ value: '6', key: 'repeat', msg: 'The winner cannot also come second. One runner is used, so 5 are left.' }],
      },
      {
        title: 'Choices for third place',
        input: { type: 'number', answer: '4', after: 'runners' },
        line: 'Third place: @ choices.',
        hint: 'Two runners have finished now.',
        slips: [{ value: '5', key: 'one-used', msg: 'Two runners are used, first and second. 6 − 2 = 4 are left.' }],
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '<<6>> × <<5>> × <<4>> =', answer: '120', after: 'ways' },
        line: '6 × 5 × 4 = @ ways',
        hint: '6 × 5 is 30. Then 30 × 4.',
        slips: [
          { value: '216', step: 2, key: 'repeat-end', msg: '216 is 6 × 6 × 6. A runner cannot take two places, so the choices go down: 6, 5, 4.' },
          { value: '15', key: 'added', msg: '15 is 6 + 5 + 4. The slots multiply.' },
        ],
      },
    ],
  },
  {
    id: 'f4', level: 'focus',
    prompt: 'Use the digits {{1, 2, 3, 4, 5}}, with {{no digit used twice}}. [[How many 3-digit odd numbers can be made?]]',
    inlineSvg: emptySlots('hundreds', 'tens', 'ones'),
    steps: [
      {
        title: 'Which slot has a rule of its own?',
        sub: 'That is the fussy slot. Fill it first.',
        input: { type: 'choice', options: [{ id: 'h', text: 'The hundreds digit' }, { id: 't', text: 'The tens digit' }, { id: 'o', text: 'The ones digit' }], answer: 'o' },
        line: 'Fussy slot: the ones digit must be odd.',
        hint: 'Which digit of a number decides whether it is odd?',
        slips: [
          { value: 'h', key: 'fussy-h', msg: 'The hundreds digit can be any of the five. A number is odd because of its last digit.' },
          { value: 't', key: 'fussy-t', msg: 'The tens digit can be anything. A number is odd because of its last digit.' },
        ],
      },
      {
        title: 'Choices for the ones digit',
        input: { type: 'number', answer: '3', after: 'choices' },
        line: 'Ones digit: 1, 3 or 5, so @ choices.',
        hint: 'Which of 1, 2, 3, 4, 5 are odd?',
        slips: [{ value: '5', key: 'ignored-odd', msg: 'With any of the 5 digits last, the number could be even. For an odd number the last digit is 1, 3 or 5.' }],
      },
      {
        title: 'Choices for the hundreds digit',
        input: { type: 'number', answer: '4', after: 'choices' },
        line: 'Hundreds digit: @ choices left.',
        hint: 'One of the five digits is already in the ones place.',
        slips: [{ value: '5', key: 'reused', msg: 'No digit is used twice, and one is already in the ones place: 4 are left.' }],
      },
      {
        title: 'Choices for the tens digit',
        input: { type: 'number', answer: '3', after: 'choices' },
        line: 'Tens digit: @ choices left.',
        hint: 'Two of the five digits are used now.',
        slips: [{ value: '4', key: 'reused-2', msg: 'Two digits are used, the ones and the hundreds. 5 − 2 = 3 are left.' }],
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '<<3>> × <<4>> × <<3>> =', answer: '36', after: 'numbers' },
        line: '3 × 4 × 3 = @ odd numbers',
        hint: '3 × 4 is 12. Then 12 × 3.',
        slips: [
          { value: '60', step: 1, key: 'no-fussy', msg: '60 is 5 × 4 × 3: every 3-digit number, odd or even. Only the ones ending in 1, 3 or 5 are odd, so start with that slot.' },
          { value: '30', step: 2, key: 'half', msg: '30 is half of all 60 numbers. But 3 of the 5 digits are odd, which is more than half. Count the ones slot: 3 choices.' },
        ],
      },
    ],
  },
];

const practice = [
  {
    id: 'p1', level: 'practice',
    prompt: '[[How many 3-digit whole numbers have three different digits?]] For example, {{507}} is one of them, but {{055}} is not a 3-digit number.',
    steps: [
      {
        title: 'Choices for the hundreds digit', key: true,
        input: { type: 'number', answer: '9', after: 'choices' },
        line: 'Hundreds digit: 1 to 9, so @ choices.',
        hint: 'One of the ten digits cannot come first. Which one?',
        why: 'The hundreds digit is the fussy slot: it cannot be 0.',
        slips: [{ value: '10', key: 'lead-zero', msg: 'A number like 055 is not a 3-digit number. The hundreds digit is 1 to 9.' }],
      },
      {
        title: 'Choices for the tens digit', key: true,
        input: { type: 'number', answer: '9', after: 'choices' },
        line: 'Tens digit: 10 digits, less the one used, so @ choices.',
        hint: 'Ten digits, and one of them is used. Is 0 allowed here?',
        slips: [
          { value: '8', key: 'zero-back', msg: '0 is allowed in the tens place. Ten digits, less the one already used, is 9.' },
          { value: '10', key: 'reused', msg: 'The digits must be different, and one is used in the hundreds place: 9 are left.' },
        ],
      },
      {
        title: 'Choices for the ones digit',
        input: { type: 'number', answer: '8', after: 'choices' },
        line: 'Ones digit: @ choices left.',
        hint: 'Two of the ten digits are used now.',
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '<<9>> × <<9>> × <<8>> =', answer: '648', after: 'numbers' },
        line: '9 × 9 × 8 = @ numbers',
        hint: '9 × 9 is 81. Then 81 × 8.',
        slips: [
          { value: '720', step: 1, key: 'lead-zero-end', msg: '720 is 10 × 9 × 8, which lets a number start with 0. The hundreds digit has 9 choices.' },
          { value: '576', step: 2, key: 'zero-back-end', msg: '576 is 9 × 8 × 8. In the tens place 0 is allowed again: 10 digits less the one used is 9.' },
          { value: '729', step: 2, key: 'repeat-end', msg: '729 is 9 × 9 × 9, which lets digits repeat. Each digit used takes one choice away.' },
        ],
      },
    ],
  },
  {
    id: 'p2', level: 'practice',
    prompt: 'A password is {{1, 2 or 3 letters}} long. Each letter is {{X, Y or Z}}, and letters may repeat. [[How many passwords are there?]]',
    steps: [
      {
        title: 'Count the 1-letter passwords',
        input: { type: 'number', answer: '3', after: 'passwords' },
        line: '1 letter: @ passwords.',
        hint: 'One slot, with X, Y or Z in it.',
      },
      {
        title: 'Count the 2-letter passwords', key: true,
        input: { type: 'number', before: '{{3}} × {{3}} =', answer: '9', after: 'passwords' },
        line: '2 letters: 3 × 3 = @ passwords.',
        hint: 'Two slots, and each one has 3 choices.',
        slips: [{ value: '6', key: 'added-in-case', msg: '6 is 3 + 3. Inside one case the slots multiply: 3 × 3.' }],
      },
      {
        title: 'Count the 3-letter passwords',
        input: { type: 'number', before: '{{3}} × {{3}} × {{3}} =', answer: '27', after: 'passwords' },
        line: '3 letters: 3 × 3 × 3 = @ passwords.',
        hint: 'Three slots, and each one has 3 choices.',
        slips: [{ value: '9', key: 'added-in-case-3', msg: '9 is 3 + 3 + 3. Inside one case the slots multiply: 3 × 3 × 3.' }],
      },
      {
        title: 'Put the three cases together',
        sub: 'A password is 1 letter OR 2 letters OR 3 letters.',
        input: { type: 'number', answer: '39', after: 'passwords' },
        line: '<<3>> + <<9>> + <<27>> = @ passwords',
        hint: 'The cases do not overlap, and a password is in exactly one of them.',
        why: 'Multiply along a row of slots. Add across the cases.',
        slips: [
          { value: '729', key: 'multiplied-cases', msg: '729 is 3 × 9 × 27. A password is in one case OR another, so the cases add.' },
          { value: '27', step: 1, key: 'one-case', msg: '27 counts only the 3-letter passwords. The shorter ones are passwords too.' },
          { value: '18', step: 2, key: 'added-in-case-end', msg: '18 is 3 + 6 + 9. Inside a case the slots multiply: 3, then 3 × 3, then 3 × 3 × 3.' },
        ],
      },
    ],
  },
  {
    id: 'p3', level: 'practice',
    prompt: '{{7 friends}} meet. Each one shakes hands once with every other friend. [[How many handshakes are there?]]',
    steps: [
      {
        title: 'Choices for the first person',
        input: { type: 'number', answer: '7', after: 'friends' },
        line: 'A handshake needs two people. First person: @ choices.',
        hint: 'A handshake needs two people. Pick the first.',
      },
      {
        title: 'Choices for the second person', key: true,
        input: { type: 'number', answer: '6', after: 'friends' },
        line: 'Second person: @ choices.',
        hint: 'The second person is someone else.',
        slips: [{ value: '7', key: 'self', msg: 'No one shakes their own hand. There are 6 other friends.' }],
      },
      {
        title: 'Multiply the two slots',
        input: { type: 'number', before: '<<7>> × <<6>> =', answer: '42' },
        line: '7 × 6 = @ ordered pairs.',
        hint: 'Seven sixes.',
      },
      {
        title: 'How many times is each handshake counted?', key: true,
        sub: 'Think of A with B, and B with A.',
        input: { type: 'number', answer: '2', after: 'times' },
        line: 'A with B and B with A are one handshake: each is counted @ times.',
        hint: 'The slots count A-then-B and B-then-A. How many handshakes is that really?',
        why: 'Order does not matter here, so the slots count every pair twice.',
        slips: [{ value: '1', key: 'order', msg: 'The slots count A-then-B and also B-then-A. That is the same handshake, counted 2 times.' }],
      },
      {
        title: 'Divide to count each one once',
        input: { type: 'number', before: '<<42>> ÷ <<2>> =', answer: '21', after: 'handshakes' },
        line: '42 ÷ 2 = @ handshakes',
        hint: 'Half of 42.',
        slips: [
          { value: '42', step: 4, key: 'order-end', msg: '42 counts A with B and B with A as two handshakes. Each one is counted twice, so divide by 2.' },
          { value: '49', step: 2, key: 'self-end', msg: '49 is 7 × 7, which has people shaking their own hand. The second person is one of 6 others.' },
        ],
      },
    ],
  },
];

const challenge = [
  {
    id: 'c1', level: 'challenge',
    prompt: 'A flag has {{3 stripes}}, one above the other. Each stripe is {{red, yellow, green or blue}}. Stripes that touch must be {{different colors}}. [[How many flags are possible?]]',
    steps: [
      {
        title: 'Choices for the top stripe',
        input: { type: 'number', answer: '4', after: 'colors' },
        line: 'Top stripe: @ choices.',
        hint: 'Nothing is colored yet.',
      },
      {
        title: 'Choices for the middle stripe',
        input: { type: 'number', answer: '3', after: 'colors' },
        line: 'Middle stripe: not the top color, so @ choices.',
        hint: 'It touches the top stripe.',
        slips: [{ value: '4', key: 'no-rule', msg: 'The middle stripe touches the top one, so it cannot be the same color: 3 choices.' }],
      },
      {
        title: 'Choices for the bottom stripe',
        input: { type: 'number', answer: '3', after: 'colors' },
        line: 'Bottom stripe: not the middle color, so @ choices.',
        hint: 'Which stripes does the bottom one touch?',
        why: 'The bottom stripe may match the top one: they do not touch.',
        slips: [{ value: '2', key: 'all-different', msg: 'The bottom stripe touches only the middle one. It may be the same color as the top, so it has 3 choices, not 2.' }],
      },
      {
        title: 'Multiply the three slots',
        input: { type: 'number', before: '<<4>> × <<3>> × <<3>> =', answer: '36', after: 'flags' },
        line: '4 × 3 × 3 = @ flags',
        hint: 'Draw three slots, top to bottom. Each stripe only has to differ from the one it touches.',
        slips: [
          { value: '24', step: 3, key: 'all-different-end', msg: '24 is 4 × 3 × 2, which makes all three stripes different. The bottom stripe only has to differ from the middle one.' },
          { value: '64', step: 2, key: 'no-rule-end', msg: '64 is 4 × 4 × 4, which lets touching stripes match. Each stripe after the first has 3 choices.' },
          { value: '11', key: 'added', msg: 'The slots multiply: 4 × 3 × 3.' },
        ],
      },
    ],
  },
  {
    id: 'c2', level: 'challenge',
    prompt: 'A door code is {{2 digits}}, each from {{0 to 9}}, and a digit may repeat: the codes run from 00 to 99. [[How many codes have at least one 7?]]',
    steps: [
      {
        title: 'Count all the codes',
        input: { type: 'number', before: '{{10}} × {{10}} =', answer: '100', after: 'codes' },
        line: 'All codes: 10 × 10 = @.',
        hint: 'Two slots, and each one has 10 choices.',
      },
      {
        title: 'Count the codes with no 7',
        input: { type: 'number', answer: '81', after: 'codes' },
        line: 'No 7 at all: 9 × 9 = @.',
        hint: 'Nine of the digits are not 7. Fill two slots with them.',
        why: '"At least one 7" is the opposite of "no 7 at all".',
        slips: [
          { value: '18', key: 'added', msg: '18 is 9 + 9. The two slots multiply: 9 × 9.' },
          { value: '90', key: 'one-slot', msg: '90 is 9 × 10, which keeps the 7 out of one slot only. Both digits must avoid 7: 9 × 9.' },
        ],
      },
      {
        title: 'Take away the codes with no 7',
        input: { type: 'number', before: '<<100>> − <<81>> =', answer: '19', after: 'codes' },
        line: 'At least one 7: 100 − 81 = @ codes',
        hint: 'At least one = all − none. Count every code, then the codes with no 7.',
        slips: [
          { value: '20', step: 2, key: 'double-count', msg: '20 is 10 codes with 7 first plus 10 with 7 second. But 77 is in both lists, so it is counted twice. Count the opposite instead.' },
          { value: '81', key: 'opposite-only', msg: '81 is the number of codes with NO 7. The question asks for all the others.' },
          { value: '10', step: 1, key: 'one-place', msg: '10 counts the codes with 7 in one place only. The 7 can be first, second, or both.' },
        ],
      },
    ],
  },
  {
    id: 'c3', level: 'challenge',
    prompt: 'Use the digits {{1, 2, 3, 4, 5, 6}}, with {{no digit used twice}}. [[How many 4-digit even numbers greater than 5000 can be made?]]',
    steps: [
      {
        title: 'Choices for the thousands digit',
        input: { type: 'number', answer: '2', after: 'choices' },
        line: 'Greater than 5000: it starts with 5 or 6. Two cases.',
        hint: 'The number must be greater than 5000. Which digits can come first?',
        why: 'Two cases: it starts with 5, or it starts with 6.',
        slips: [{ value: '6', key: 'any-first', msg: 'A number that starts with 1, 2, 3 or 4 is less than 5000. Only 5 and 6 can come first.' }],
      },
      {
        title: 'Starts with 5: choices for the ones digit',
        input: { type: 'number', answer: '3', after: 'choices' },
        line: 'Starts with 5: the ones digit is 2, 4 or 6, so @ choices.',
        hint: 'An even number ends in 2, 4 or 6. Is any of them already used?',
      },
      {
        title: 'Starts with 5: how many numbers?',
        input: { type: 'number', before: '<<3>> × {{4}} × {{3}} =', answer: '36', after: 'numbers' },
        line: 'Starts with 5: 3 × 4 × 3 = @ numbers.',
        hint: 'Two digits are used. The two middle places take 4 choices, then 3.',
      },
      {
        title: 'Starts with 6: choices for the ones digit',
        input: { type: 'number', answer: '2', after: 'choices' },
        line: 'Starts with 6: the 6 is used, so the ones digit is 2 or 4: @ choices.',
        hint: 'The 6 is at the front now. Which even digits are left?',
        slips: [{ value: '3', key: 'six-twice', msg: 'The 6 is already used at the front. Only 2 and 4 are left for the ones digit.' }],
      },
      {
        title: 'Starts with 6: how many numbers?',
        input: { type: 'number', before: '<<2>> × {{4}} × {{3}} =', answer: '24', after: 'numbers' },
        line: 'Starts with 6: 2 × 4 × 3 = @ numbers.',
        hint: 'Two digits are used. The two middle places take 4 choices, then 3.',
      },
      {
        title: 'Add the two cases',
        input: { type: 'number', before: '<<36>> + <<24>> =', answer: '60', after: 'numbers' },
        line: '36 + 24 = @ numbers',
        hint: 'Two fussy slots: the first digit (5 or 6) and the last digit (even). Take the first digit one case at a time.',
        slips: [
          { value: '72', step: 4, key: 'six-twice-end', msg: '72 is 36 + 36: the same count for both cases. When the number starts with 6, the 6 cannot also be the last digit.' },
          { value: '36', step: 1, key: 'one-case', msg: '36 counts only the numbers that start with 5. A number that starts with 6 is greater than 5000 too.' },
          { value: '180', step: 1, key: 'no-5000', msg: '180 is 3 × 5 × 4 × 3: every even number, large or small. It must be greater than 5000, so it starts with 5 or 6.' },
        ],
      },
    ],
  },
];

export const stepPractice = {
  title: 'How many ways? Step by step',
  items: [...focus, ...practice, ...challenge],
};
