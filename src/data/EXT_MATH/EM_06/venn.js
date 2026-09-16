// src/data/EXT_MATH/EM_06/venn.js
// "Set It Out" — the Venn diagram task for EM_06 (src/tasks/VennTask.jsx).
//
// Built from Question 5 of Wolsey Hall IGCSE Maths Extended Assignment 06 —
// a printed two-set diagram with a count in every region, asked for the total,
// one set, n(A ∪ B), "how many more", and the probability of neither — and
// widened to the three other shapes the Extended paper asks the same notation
// in. Every number is original: the assignment is the homework and is not
// spent here.
//
// ORDER (one new idea per item):
//   1  elements · build the diagram from rules; list, true/false, a complement
//   2  counts   · Question 5's exact shape: ℰ, one set, a union, "how many
//                 more", P(neither) — the words turned into notation first
//   3  facts    · fill a diagram from words, the middle given
//   4  facts    · the middle hidden: let it be x
//   5  counts   · three sets
//   6  elements · primes and factors: a complement inside an intersection
//
// Only the question is authored. utils/sets.js derives every region, count,
// fill order, notation option and true/false reason, and the validator
// (checkVennItems) refuses facts that do not fix every region with whole
// numbers, and notation that names a set the item does not have.
export const venn = {
  title: 'Set It Out',
  intro: 'Words → notation → shading → the number. Shade before you count.',
  items: [
    {
      id: 'mult',
      kind: 'elements',
      sets: ['A', 'B'],
      universe: { from: 1, to: 12 },
      rules: { A: { kind: 'multiple', of: 3 }, B: { kind: 'even' } },
      prompt: 'ℰ is the whole numbers from 1 to 12. Put every number in its place, then answer from the diagram.',
      questions: [
        { id: 'a', ask: 'list', expr: 'A ∩ B', prompt: 'List the elements of $A \\cap B$.' },
        {
          id: 'b', ask: 'truth', prompt: 'True or false?',
          statements: ['6 ∈ A ∩ B', "9 ∈ B'", '{2, 4} ⊂ A', 'n(A ∪ B) = 8'],
        },
        { id: 'c', ask: 'n', expr: "(A ∪ B)'", prompt: "Find $n((A \\cup B)')$." },
      ],
    },
    {
      id: 'sport',
      kind: 'counts',
      sets: ['F', 'T'],
      counts: { '10': 14, '11': 6, '01': 9, '00': 5 },
      prompt: 'The Venn diagram shows information about the students in a class who play football ($F$) and tennis ($T$).',
      questions: [
        { id: 'a', ask: 'n', expr: 'ℰ', translate: true, prompt: 'Work out the number of students in the class.' },
        { id: 'b', ask: 'n', expr: 'T', translate: true, prompt: 'Work out the number of students who play tennis.' },
        { id: 'c', ask: 'n', expr: 'F ∪ T', prompt: 'Work out $n(F \\cup T)$.' },
        { id: 'd', ask: 'more', exprs: ['F', 'T'], prompt: 'How many more students play football than play tennis?' },
        { id: 'e', ask: 'p', expr: "(F ∪ T)'", translate: true, prompt: 'One of the students is chosen at random. Find the probability that this student does not play football and does not play tennis.' },
      ],
    },
    {
      id: 'cafe',
      kind: 'facts',
      sets: ['C', 'T'],
      prompt: '50 people in a café were asked whether they drink coffee ($C$) or tea ($T$).',
      facts: [
        { expr: 'ℰ', n: 50, say: '50 people were asked.' },
        { expr: 'C', n: 28, say: '28 drink coffee.' },
        { expr: 'T', n: 19, say: '19 drink tea.' },
        { expr: 'C ∩ T', n: 7, say: '7 drink both.' },
      ],
      questions: [
        { id: 'a', ask: 'n', expr: "C ∩ T'", translate: true, prompt: 'How many people drink coffee but not tea?' },
        { id: 'b', ask: 'p', expr: 'C ∪ T', translate: true, prompt: 'One person is chosen at random. Find the probability that they drink coffee or tea or both.' },
      ],
    },
    {
      id: 'clubs',
      kind: 'facts',
      sets: ['A', 'M'],
      prompt: '40 students each chose whether to join the art club ($A$) and the music club ($M$).',
      facts: [
        { expr: 'ℰ', n: 40, say: 'There are 40 students.' },
        { expr: 'A', n: 23, say: '23 joined the art club.' },
        { expr: 'M', n: 17, say: '17 joined the music club.' },
        { expr: "(A ∪ M)'", n: 6, say: '6 joined neither club.' },
      ],
      questions: [
        { id: 'a', ask: 'n', expr: 'A ∩ M', translate: true, prompt: 'How many students joined both clubs?' },
        { id: 'b', ask: 'p', expr: "A ∩ M'", translate: true, prompt: 'A student is chosen at random. Find the probability that they joined the art club only.' },
      ],
    },
    {
      id: 'lang',
      kind: 'counts',
      sets: ['F', 'S', 'G'],
      counts: { '100': 12, '010': 10, '001': 7, '110': 5, '101': 3, '011': 4, '111': 2, '000': 17 },
      prompt: 'The Venn diagram shows how many of 60 students study French ($F$), Spanish ($S$) and German ($G$).',
      questions: [
        { id: 'a', ask: 'n', expr: 'F ∩ S', prompt: 'Find $n(F \\cap S)$.' },
        { id: 'b', ask: 'n', expr: "(F ∪ S ∪ G)'", translate: true, prompt: 'How many students study none of the three languages?' },
        { id: 'c', ask: 'n', expr: "G ∩ (F ∪ S)'", translate: true, prompt: 'How many students study German only?' },
        { id: 'd', ask: 'p', expr: 'F ∩ S ∩ G', prompt: 'A student is chosen at random. Find the probability that they study all three languages.' },
      ],
    },
    {
      id: 'primes',
      kind: 'elements',
      sets: ['P', 'Q'],
      universe: { from: 1, to: 15 },
      rules: { P: { kind: 'prime' }, Q: { kind: 'factor', of: 12 } },
      prompt: 'ℰ is the whole numbers from 1 to 15. Remember: 1 is not a prime number.',
      questions: [
        { id: 'a', ask: 'list', expr: "P' ∩ Q", translate: true, prompt: 'List the factors of 12 that are not prime.' },
        { id: 'b', ask: 'list', expr: 'P ∪ Q', prompt: 'List the elements of $P \\cup Q$.' },
        {
          id: 'c', ask: 'truth', prompt: 'True or false?',
          statements: ['1 ∈ P', "{8, 9} ⊂ (P ∪ Q)'", 'n(P ∩ Q) = 2', 'P ∩ Q = ∅'],
        },
      ],
    },
  ],
};
