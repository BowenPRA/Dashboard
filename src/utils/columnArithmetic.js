// src/utils/columnArithmetic.js
//
// The derivation behind the Number Gym drill (src/tasks/NumberDrill.jsx). Given
// only the operands, it produces every intermediate cell of the written column
// algorithm — each partial product, every carry, the final sum — so the task
// never stores an authored answer key and the validator can check an item is
// answerable using the same code the task grades with. Pure and framework-free
// on purpose, exactly like utils/vectors.js and utils/parabola.js.

/** Digits of n, units first: 472 -> [2, 7, 4]. */
export const digitsUnitsFirst = (n) => String(Math.abs(n)).split('').reverse().map(Number);

/** The digit of n in column c (0 = units), or null if n has no digit there. */
export const digitAt = (n, c) => {
  const s = String(Math.abs(n));
  const i = s.length - 1 - c;
  return i >= 0 ? Number(s[i]) : null;
};

/**
 * One partial product: a × (single digit d), written shifted left by `place`
 * columns. Returns the cells the row occupies, each carrying its derived digit
 * and the carry that flows INTO it from the column on its right.
 */
export function buildPartial(a, d, place) {
  const rowKey = `p${place}`;
  if (d === 0) {
    // A zero multiplier digit writes a single 0 in this row's units column.
    return { rowKey, place, cols: [{ col: place, digit: 0, carryIn: 0, carryBox: false }] };
  }
  const aDig = digitsUnitsFirst(a);
  const cols = [];
  let carry = 0;
  aDig.forEach((ad, i) => {
    const entering = carry;
    const t = d * ad + entering;
    const digit = t % 10;
    carry = Math.floor(t / 10);
    // The rightmost column (i === 0) takes no carry from its right, so no box.
    cols.push({ col: place + i, digit, carryIn: entering, carryBox: i > 0 });
  });
  // A leftover carry becomes the leading digit (written straight down).
  if (carry > 0) cols.push({ col: place + aDig.length, digit: carry, carryIn: carry, carryBox: false });
  return { rowKey, place, cols };
}

/**
 * The final addition of the partial products, column by column, carry flowing
 * left. Width W is the digit-length of a × b, which already includes the
 * leading digit, so the carry out of the last column is always 0.
 */
export function buildSum(partials, W) {
  const at = (partial, c) => {
    const cell = partial.cols.find((k) => k.col === c);
    return cell ? cell.digit : 0;
  };
  const cols = [];
  let carry = 0;
  for (let c = 0; c < W; c++) {
    const entering = carry;
    const colSum = partials.reduce((s, p) => s + at(p, c), 0) + entering;
    const digit = colSum % 10;
    carry = Math.floor(colSum / 10);
    cols.push({ col: c, digit, carryIn: entering, carryBox: c > 0 });
  }
  return { rowKey: 'sum', cols };
}

/** Everything derived for one problem: the rows to draw and the stages to walk. */
export function modelOf(a, b) {
  const bDig = digitsUnitsFirst(b);
  const partials = bDig.map((d, place) => buildPartial(a, d, place));
  const W = String(a * b).length;
  const sumRow = partials.length > 1 ? buildSum(partials, W) : null;
  const rows = sumRow ? [...partials, sumRow] : partials;
  const stages = rows.map((r) => ({
    kind: r.rowKey === 'sum' ? 'sum' : 'partial',
    place: r.place,
    rowKey: r.rowKey,
    cols: [...r.cols].sort((x, y) => x.col - y.col),
  }));
  return { a, b, W, partials, sumRow, rows, stages };
}
