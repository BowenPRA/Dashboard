// src/data/ACELLUS/ALG_QUAD/factorQuad.js
// Factor It (FACTOR_QUAD, p94). Each item is only an equation: the stages,
// factor pairs, split, grouping, brackets, zeros and every named slip are
// derived by src/utils/quadFactor.js, and src/utils/quadCheck.js replays each
// item's own answers through the marking in `npm run validate`.
//
// Levels fade the scaffold (leaner-units rule):
//   1  a = 1, every stage walked (target → pair table → brackets → zeros)
//   2  the new shapes, every stage walked: not = 0 yet, a common factor,
//      the ac method, a difference of squares
//   3  the target stage drops — the pair table says it
//   4  just the brackets and the zeros (plus standard form / common factor
//      when the item needs them)
export const factorQuad = {
  title: 'Factor It',
  titleVn: 'Phân tích nhân tử',
  levels: {
    1: { en: 'a = 1, step by step', vn: 'a = 1, từng bước' },
    2: { en: 'New shapes, step by step', vn: 'Dạng mới, từng bước' },
    3: { en: 'Fewer hints', vn: 'Ít gợi ý hơn' },
    4: { en: 'On your own', vn: 'Tự làm' },
  },
  items: [
    { id: 'f1', level: 1, eq: 'x^2 + 7x + 12 = 0' },
    { id: 'f2', level: 1, eq: 'x^2 - 8x + 15 = 0' },
    { id: 'f3', level: 1, eq: 'x^2 + 2x - 15 = 0' },
    { id: 'f4', level: 2, eq: 'x^2 + 5x = -6' },
    { id: 'f5', level: 2, eq: '2x^2 + 10x + 12 = 0' },
    { id: 'f6', level: 2, eq: '2x^2 + 7x + 3 = 0' },
    { id: 'f7', level: 2, eq: 'x^2 - 49 = 0' },
    { id: 'f8', level: 3, eq: 'x^2 - 6x = 0' },
    { id: 'f9', level: 3, eq: '3x^2 - 10x + 8 = 0' },
    { id: 'f10', level: 4, eq: '6x^2 + 11x - 10 = 0' },
    { id: 'f11', level: 4, eq: 'x^2 = 3x + 28' },
    { id: 'f12', level: 4, eq: '4x^2 - 25 = 0' },
  ],
};
