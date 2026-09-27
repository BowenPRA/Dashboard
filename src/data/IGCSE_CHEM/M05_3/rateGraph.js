// src/data/IGCSE_CHEM/M05_3/rateGraph.js
// RATE_GRAPH (Rate Reader) for Module 5, topic 3 — reading the rate of a
// reaction off a graph of results, the skill coursebook spread 9.2 teaches and
// the Chapter 9 checkup asks for six different ways.
//
// An item is an EXPERIMENT: what was reacted, what was measured, and the
// results as plotted points. The asks only say what to read. Every answer —
// each reading, each interval's rate, where the curve goes flat, the average —
// is derived from the points by src/utils/rateCurve.js, and `checkRateItems`
// (run by `npm run validate`) refuses a curve that speeds up, never finishes,
// or gives an average rate that does not come out to two decimal places.
//
// The book's own experiment (magnesium ribbon in hydrochloric acid, 40 cm³ in
// five minutes) is taught in the deck and deliberately NOT set here. Every data
// set below is fresh. Order climbs: plain readings → the rate in one minute →
// a time axis in seconds, so the interval is no longer "1" → mass lost on a
// balance instead of gas in a syringe → two curves on one grid.
//
// `minor` is the number of small squares to each numbered line. A reading is
// marked to half a small square.
export const rateGraph = {
  title: 'Rate Reader',
  items: [
    {
      id: 'rg_zinc',
      name: 'Zinc and sulfuric acid',
      context: 'Zinc granules were added to an excess of dilute sulfuric acid. The hydrogen was collected in a gas syringe and its volume was read every minute.',
      equation: { reactants: 'Zn(s) + H2SO4(aq)', products: 'ZnSO4(aq) + H2(g)' },
      quantity: 'hydrogen',
      limiting: 'zinc',
      excess: 'sulfuric acid',
      x: { label: 'Time', unit: 'min', max: 7, step: 1, minor: 2 },
      y: { label: 'Volume of hydrogen', unit: 'cm³', max: 50, step: 10, minor: 5 },
      curves: [{ id: 'A', points: [[0, 0], [1, 20], [2, 32], [3, 40], [4, 46], [5, 50], [6, 50], [7, 50]] }],
      asks: [
        { id: 'r1', kind: 'read', at: 1 },
        { id: 'r2', kind: 'read', at: 3 },
        { id: 't1', kind: 'timeFor', value: 46 },
        { id: 'e1', kind: 'end' },
        { id: 'v1', kind: 'total' },
        { id: 'w1', kind: 'why' },
      ],
      note: 'A graph of results is read the same way every time: up from the time, across to the volume.',
    },
    {
      id: 'rg_peroxide',
      name: 'Hydrogen peroxide decomposing',
      context: 'Hydrogen peroxide solution breaks down into water and oxygen. A catalyst was added, the oxygen was collected in a gas syringe, and its volume was read every minute.',
      equation: { reactants: '2H2O2(aq)', products: '2H2O(l) + O2(g)' },
      quantity: 'oxygen',
      x: { label: 'Time', unit: 'min', max: 7, step: 1, minor: 2 },
      y: { label: 'Volume of oxygen', unit: 'cm³', max: 80, step: 10, minor: 5 },
      curves: [{ id: 'A', points: [[0, 0], [1, 30], [2, 48], [3, 60], [4, 68], [5, 72], [6, 72], [7, 72]] }],
      asks: [
        { id: 'i1', kind: 'interval', from: 0, to: 1 },
        { id: 'i2', kind: 'interval', from: 1, to: 2 },
        { id: 'i4', kind: 'interval', from: 3, to: 4 },
        { id: 's1', kind: 'steepest' },
        { id: 'a1', kind: 'average' },
      ],
      note: 'The rate in one minute is the volume made IN that minute: the reading at the end, minus the reading at the start.',
    },
    {
      id: 'rg_marble',
      name: 'Marble chips and hydrochloric acid',
      context: 'An excess of marble chips (calcium carbonate) was added to dilute hydrochloric acid. The carbon dioxide was collected in a gas syringe and its volume was read every 20 seconds.',
      equation: { reactants: 'CaCO3(s) + 2HCl(aq)', products: 'CaCl2(aq) + H2O(l) + CO2(g)' },
      quantity: 'carbon dioxide',
      limiting: 'hydrochloric acid',
      excess: 'marble',
      x: { label: 'Time', unit: 's', max: 120, step: 20, minor: 2 },
      y: { label: 'Volume of carbon dioxide', unit: 'cm³', max: 70, step: 10, minor: 5 },
      curves: [{ id: 'A', points: [[0, 0], [20, 24], [40, 40], [60, 50], [80, 56], [100, 60], [120, 60]] }],
      asks: [
        { id: 'i1', kind: 'interval', from: 0, to: 20 },
        { id: 'i2', kind: 'interval', from: 40, to: 60 },
        { id: 't1', kind: 'timeFor', value: 56 },
        { id: 'a1', kind: 'average' },
        { id: 'w1', kind: 'why' },
      ],
      note: 'When the interval is 20 seconds long, the volume made in it has to be divided by 20 to give a rate per second.',
    },
    {
      id: 'rg_balance',
      name: 'Losing mass on a balance',
      context: 'A flask of dilute acid and marble chips stood on a balance, plugged with cotton wool. Carbon dioxide escaped through the plug, so the flask got lighter. The loss in mass was worked out every minute.',
      equation: { reactants: 'CaCO3(s) + 2HCl(aq)', products: 'CaCl2(aq) + H2O(l) + CO2(g)' },
      quantity: 'carbon dioxide',
      x: { label: 'Time', unit: 'min', max: 7, step: 1, minor: 2 },
      y: { label: 'Loss in mass', unit: 'g', max: 2.5, step: 0.5, minor: 5 },
      curves: [{ id: 'A', points: [[0, 0], [1, 0.8], [2, 1.3], [3, 1.6], [4, 1.8], [5, 2], [6, 2], [7, 2]] }],
      asks: [
        { id: 'r1', kind: 'read', at: 2 },
        { id: 'i1', kind: 'interval', from: 2, to: 3 },
        { id: 'e1', kind: 'end' },
        { id: 'v1', kind: 'total' },
        { id: 'a1', kind: 'average' },
      ],
      note: 'The curve has the same shape whatever is measured. Here the rate is in grams per minute, because the amount is a mass.',
    },
    {
      id: 'rg_two_metals',
      name: 'Two metals in acid',
      context: 'Two different metals, X and Y, were each added to an excess of the same dilute acid. The hydrogen from each was collected and measured every 10 seconds.',
      quantity: 'hydrogen',
      x: { label: 'Time', unit: 's', max: 120, step: 20, minor: 2 },
      y: { label: 'Volume of hydrogen', unit: 'cm³', max: 60, step: 10, minor: 5 },
      curves: [
        { id: 'X', label: 'Metal X', points: [[0, 0], [10, 24], [20, 38], [30, 45], [40, 45], [120, 45]] },
        {
          id: 'Y', label: 'Metal Y',
          points: [[0, 0], [10, 9], [20, 17], [30, 24], [40, 30], [50, 35], [60, 39], [70, 43], [80, 46], [90, 48], [100, 50], [110, 50], [120, 50]],
        },
      ],
      asks: [
        { id: 'c1', kind: 'compare', what: 'faster' },
        { id: 'e1', kind: 'end', curve: 'X' },
        { id: 'e2', kind: 'end', curve: 'Y' },
        { id: 'c2', kind: 'compare', what: 'amount' },
        { id: 'a1', kind: 'average', curve: 'X' },
        { id: 'a2', kind: 'average', curve: 'Y' },
      ],
      note: 'Steeper means faster; higher means more. Metal X reacts three times as fast as metal Y on average, but metal Y makes more hydrogen.',
    },
  ],
};
