// src/data/IGCSE_CHEM/M06_5/elementHunt.js
// Element Hunt (ELEMENT_HUNT, p43) for 6.5 The Periodic Table — the generative
// task built for Year 7 Science 2.5, set here at the level of this unit.
//
// The engine (src/utils/elementHunt.js) draws every round fresh from a seed on
// the book's first-20 table, so a second attempt asks about other elements. A
// unit can only choose WHICH of its six modes to use and how many rounds; the
// question text, the answers and the explanations are the engine's own, and it
// runs English-only when the track is not bilingual (taskRegistry passes
// `bilingual` from the track; checkHuntConfig needs no titleVn).
//
// The modes chosen are the ones that are IGCSE content:
//   place  tap by period and group — one element (period + group), a whole
//          period or group, "the others in the same group as …", "the others
//          in the same period as …"
//   metal  every metal (or non-metal) in a period, or decide one element
//   mass   which of two elements has the heavier atoms (reading order; the
//          engine never asks argon / potassium, the one pair where it lies)
// `find`, `symbol` and `name` (symbol recall) are Year 7 work and are left out.
// Listing a mode twice weights it: 12 rounds = 6 place, 4 metal, 2 mass.
//
// Outer-shell electrons, shells and ion charges are NOT engine queries; the
// deck's `periodic` activities and the Practice set carry them. The metal
// rounds count silicon as a non-metal (it sits right of the zig-zag line, as
// in spread 12.1); the deck says so where it teaches the metalloid.
export const elementHunt = {
  title: 'Element Hunt',
  modes: ['place', 'metal', 'place', 'mass', 'place', 'metal'],
  rounds: 12,
};
