// src/data/Y7_MATH/U01_4/factorBlitz.js
// 1.4 Highest Common Factors — the Factor Blitz round list (FACTOR_BLITZ task).
// Only the target numbers are authored; FactorBlitz.jsx derives each round's
// factor set with `N % c === 0`, so there is no answer key to get wrong.
//
// Targets chosen so the factor list under 13 is worth reading: rich composites
// (24, 36, 48, 60) next to leaner ones (30, 40) so "which numbers divide it"
// changes every round. Recognising factors fast is exactly the HCF method —
// list the factors of each number, then take the highest they share.
export const factorBlitz = {
  title: 'Factor Blitz',
  titleVn: 'Truy Tìm Ước Số',
  seconds: 30,
  intro:
    'A number appears. Tap every factor under 13 before the clock runs out — the numbers that divide it exactly. This is the HCF method at speed: know a number’s factors and the highest common one is easy to spot.',
  introVn:
    'Một số xuất hiện. Bấm mọi ước số dưới 13 trước khi hết giờ — những số chia hết cho nó. Đây chính là cách tìm HCF ở tốc độ cao: thuộc ước số của một số thì tìm ước chung lớn nhất rất dễ.',
  rounds: [24, 36, 30, 48, 60, 40, 54, 42],
};
