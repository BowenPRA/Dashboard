// src/data/Y7_MATH/U01_5/factorBlitz.js
// 1.5 Tests for Divisibility — the Factor Blitz round list (FACTOR_BLITZ task).
// Only the target numbers are authored; FactorBlitz.jsx derives each round's
// factor set with `N % c === 0`, so there is no answer key to get wrong.
//
// A different target set from 1.4 (the validator rejects byte-identical files).
// These lean on the tests the unit teaches: 72 and 84 reward the 3-and-4 (→12)
// check, 66 the 2-and-3 (→6) check, 90 the 9 check. "Is it divisible?" and "is
// it a factor?" are the same question asked from the two ends.
export const factorBlitz = {
  title: 'Factor Blitz',
  titleVn: 'Truy Tìm Ước Số',
  seconds: 18,
  intro:
    'A number appears. Tap every factor under 13 before the clock runs out — the numbers that divide it exactly. Each tap is a divisibility test: does this number go in with nothing left over?',
  introVn:
    'Một số xuất hiện. Bấm mọi ước số dưới 13 trước khi hết giờ — những số chia hết cho nó. Mỗi lần bấm là một phép kiểm tra chia hết: số này chia vào có dư không?',
  rounds: [72, 90, 66, 84, 56, 45, 88, 63],
};
