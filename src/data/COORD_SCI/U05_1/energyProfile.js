// src/data/COORD_SCI/U05_1/energyProfile.js
// ENERGY_PROFILE (Energy Diagrams) for C5.01 — the coursebook's Worked Example
// made live: for each reaction the student places the products line, drags out
// the activation-energy hump, and labels ΔH. Correctness is DERIVED from the
// geometry by src/utils/energyProfile.js; `checkItem` rejects any item whose
// stated ΔH sign contradicts its stated type, so a wrong key cannot ship.
//
// Authoring rules:
//  · `type` is the single source of truth — the grader derives the direction of
//    the products line, the direction of the arrow and the sign of ΔH from it;
//  · `deltaH` is the REAL published value in kJ/mol, printed on the arrow once
//    the diagram is built. It must carry the sign `type` implies;
//  · the six items deliberately alternate, and none of them can be answered by
//    pattern-matching the previous one.
//
// The order is a teaching sequence, not a shuffle:
//   1 methane   — the book's own exothermic example, the easy anchor
//   2 nitrogen  — the book's own endothermic example, immediately after
//   3 magnesium — the Worked Example itself (burning, so obviously exothermic)
//   4 photosynthesis — endothermic, but not a "cold" reaction: energy in as LIGHT
//   5 zinc + copper(II) sulfate — coursebook question C5.02
//   6 thermal decomposition — endothermic, and the one students most often
//     mislabel because it happens in a hot crucible

export const energyProfile = [
  {
    id: 'ep_methane',
    name: 'Burning methane (natural gas)',
    wordEquation: 'methane + oxygen → carbon dioxide + water',
    reactants: 'CH4(g) + 2O2(g)',
    products: 'CO2(g) + 2H2O(g)',
    type: 'exothermic',
    deltaH: -728,
    note: 'Burning always gives out heat, so the products sit lower than the reactants and ΔH is negative. That large negative value is what makes methane such a useful fuel.',
  },
  {
    id: 'ep_nitrogen_monoxide',
    name: 'Nitrogen monoxide forming in a car engine',
    wordEquation: 'nitrogen + oxygen → nitrogen monoxide',
    reactants: 'N2(g) + O2(g)',
    products: '2NO(g)',
    type: 'endothermic',
    deltaH: 180,
    note: 'This one takes energy in, so the products end up higher than the reactants and ΔH is positive. It only happens at all because an engine is hot enough to supply that energy.',
  },
  {
    id: 'ep_magnesium',
    name: 'Magnesium burning in oxygen',
    wordEquation: 'magnesium + oxygen → magnesium oxide',
    reactants: '2Mg(s) + O2(g)',
    products: '2MgO(s)',
    type: 'exothermic',
    deltaH: -1204,
    note: 'The question tells you energy is released — as heat AND the brilliant white light. Released means exothermic: products lower, arrow down, ΔH negative.',
  },
  {
    id: 'ep_photosynthesis',
    name: 'Photosynthesis in a green leaf',
    wordEquation: 'carbon dioxide + water → glucose + oxygen',
    reactants: '6CO2(g) + 6H2O(l)',
    products: 'C6H12O6(aq) + 6O2(g)',
    type: 'endothermic',
    deltaH: 2803,
    note: 'Energy taken IN counts even when it arrives as sunlight rather than heat. The plant stores it in the glucose, so the products are higher and ΔH is positive.',
  },
  {
    id: 'ep_zinc_copper_sulfate',
    name: 'Adding zinc to copper(II) sulfate solution',
    wordEquation: 'zinc + copper(II) sulfate → zinc sulfate + copper',
    reactants: 'Zn(s) + CuSO4(aq)',
    products: 'ZnSO4(aq) + Cu(s)',
    type: 'exothermic',
    deltaH: -217,
    note: 'A displacement reaction you can feel: the tube gets noticeably warm as the blue solution fades. Warm surroundings means exothermic, so ΔH is negative.',
  },
  {
    id: 'ep_calcium_carbonate',
    name: 'Thermal decomposition of calcium carbonate',
    wordEquation: 'calcium carbonate → calcium oxide + carbon dioxide',
    reactants: 'CaCO3(s)',
    products: 'CaO(s) + CO2(g)',
    type: 'endothermic',
    deltaH: 178,
    note: 'The trap: it happens in a roaring hot kiln, so it feels exothermic. But the heat is going IN — you must keep supplying it or the reaction stops. Endothermic, ΔH positive.',
  },
];
