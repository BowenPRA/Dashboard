// src/data/AMC8/PT_01/factorBlitz.js
// The Factor Blitz round list for Practice Test 1 (FACTOR_BLITZ task). Only
// the target numbers are authored; FactorBlitz.jsx derives each round's factor
// set with `N % c === 0`, so there is no answer key to get wrong.
//
// Why it is in an AMC 8 unit: there is no calculator in the contest, and
// "is it a multiple of 3? of 7? of 6?" has to be seen, not worked out. The
// targets are contest-sized numbers with a mix of factors — 84 and 90 are
// rich, 91 looks prime and is 7 × 13, 81 has only the 3s — and 20 seconds a
// round is contest pace. English only: the track is not bilingual.
export const factorBlitz = {
  title: 'Factor Blitz',
  seconds: 20,
  intro:
    'No calculator in the AMC 8, so factors have to be fast. A number appears: tap every number from 2 to 12 that divides it exactly, before the clock runs out.',
  rounds: [36, 45, 56, 72, 81, 84, 90, 91, 96, 108],
};
