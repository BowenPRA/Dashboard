// src/data/EXT_MATH/EM_06/surds.js
// "Surd Breaker" — simplifying surds for EM_06 (src/tasks/SurdSimplify.jsx).
//
// Built from Question 4a of Wolsey Hall IGCSE Maths Extended Assignment 06
// ("express √3 + √12 in the form a√3") and the root-breaking every other part
// of Question 4 leans on. The student's own working on that question was a
// factor tree (12 → 3 × 4 → 2 × 2), crossed out once — so the task is built
// around that tree, and around the moment it went wrong: knowing when a surd
// is FINISHED. Every number is original.
//
// ORDER (one new idea per item):
//   1–2   √n with one obvious square factor
//   3     √72 — a small square works, a big one works faster (the tree shows it)
//   4     √48 — the largest square factor is not the first one you see
//   5     k√n — the number in front multiplies what comes out
//   6–8   simplify, THEN collect like surds (6 is Question 4a's shape)
//   9     two surds that cannot be collected
//   10    multiply, then simplify
//   11    a square: (3√2)² is a whole number
//   12    multiply with numbers in front, then simplify
export const surds = {
  title: 'Surd Breaker',
  intro: 'Find a square that divides the number, take its root out, and ask: is it finished?',
  items: [
    { id: 's12', kind: 'simplify', n: 12 },
    { id: 's50', kind: 'simplify', n: 50 },
    { id: 's72', kind: 'simplify', n: 72, note: 'Any square factor works. The biggest one saves a round.' },
    { id: 's48', kind: 'simplify', n: 48 },
    { id: 's3r20', kind: 'simplify', k: 3, n: 20, note: 'The 3 in front stays in front — and multiplies whatever comes out.' },
    { id: 'c5_45', kind: 'collect', terms: [[1, 5], [1, 45]], note: 'In the form a√5.' },
    { id: 'c75_12', kind: 'collect', terms: [[1, 75], [-1, 12]] },
    { id: 'c18_50', kind: 'collect', terms: [[2, 18], [1, 50]] },
    { id: 'c8_27', kind: 'collect', terms: [[1, 8], [1, 27]] },
    { id: 'm6_15', kind: 'multiply', a: [1, 6], b: [1, 15] },
    { id: 'm3r2sq', kind: 'multiply', a: [3, 2], b: [3, 2], square: true, note: 'Squaring means multiplying it by itself.' },
    { id: 'm2r3_5r6', kind: 'multiply', a: [2, 3], b: [5, 6] },
  ],
};
