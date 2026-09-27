// src/data/IGCSE_CHEM/M06_7/symbolEq.js
// SYMBOL_EQ (Equations) for 6.7 Group 7: the Halogens. The spread gives the
// reactions in words (iron wool → iron(III) halides; chlorine + hydrogen →
// hydrogen chloride) and two displacements as symbol equations, so this task
// turns a word equation into the balanced symbol one.
//
// The deck teaches the book's own displacements (Cl₂ + 2KBr, Cl₂ + 2KI); every
// displacement here uses a FRESH salt or a fresh pair. Order climbs: a Group I
// metal (one number to find) → two with hydrogen (a 2 on the product only) →
// iron, where the 3 in FeCl₃ forces 2 : 3 : 2 → three displacements, where the
// halogen stays diatomic on both sides.
//
// Every item is verified by src/utils/chemFormula.js (checkItem): every target
// formula parses, appears in the item's `bank`, and the target equation
// balances — so a wrong key cannot ship.
//
// Authoring rules (as M06_2):
//  · one slot per named substance in the word equation (order preserved);
//  · `bank` mixes the right formulae with believable wrong ones — here the
//    recurring slips are a halogen written as single atoms (Cl, Br, I instead of
//    Cl₂, Br₂, I₂), a halide formula that ignores the charges (NaBr₂, FeCl₂ for
//    iron(III), HCl₂), and hydrogen written as H;
//  · `reactants`/`products` carry the TARGET coefficient — the student must set
//    it to balance, and the grader derives balance, it does not trust the key.

export const symbolEq = [
  {
    id: 'eq_sodium_bromine',
    wordEquation: 'sodium + bromine → sodium bromide',
    reactants: [{ formula: 'Na', coeff: 2 }, { formula: 'Br2', coeff: 1 }],
    products: [{ formula: 'NaBr', coeff: 2 }],
    bank: ['Na', 'Br2', 'NaBr', 'Br', 'NaBr2', 'Na2Br'],
    note: 'Bromine is diatomic, so it is Br₂. Na⁺ and Br⁻ have one charge each, so sodium bromide is NaBr. One Br₂ gives two bromide ions, so you need 2Na and get 2NaBr.',
  },
  {
    id: 'eq_hydrogen_chlorine',
    wordEquation: 'hydrogen + chlorine → hydrogen chloride',
    reactants: [{ formula: 'H2', coeff: 1 }, { formula: 'Cl2', coeff: 1 }],
    products: [{ formula: 'HCl', coeff: 2 }],
    bank: ['H2', 'Cl2', 'HCl', 'H', 'Cl', 'HCl2', 'H2Cl'],
    note: 'Both elements are diatomic: H₂ and Cl₂. The atoms share electrons to make covalent molecules of HCl, one H to one Cl. Two of each atom make 2HCl.',
  },
  {
    id: 'eq_hydrogen_iodine',
    wordEquation: 'hydrogen + iodine → hydrogen iodide',
    reactants: [{ formula: 'H2', coeff: 1 }, { formula: 'I2', coeff: 1 }],
    products: [{ formula: 'HI', coeff: 2 }],
    bank: ['H2', 'I2', 'HI', 'H', 'I', 'HI2', 'H2I'],
    note: 'The same shape as hydrogen and chlorine, one group lower. Iodine reacts far more slowly — it is less reactive — but the equation is written the same way: H₂ + I₂ → 2HI.',
  },
  {
    id: 'eq_iron_chlorine',
    wordEquation: 'iron + chlorine → iron(III) chloride',
    reactants: [{ formula: 'Fe', coeff: 2 }, { formula: 'Cl2', coeff: 3 }],
    products: [{ formula: 'FeCl3', coeff: 2 }],
    bank: ['Fe', 'Cl2', 'FeCl3', 'FeCl2', 'FeCl', 'Cl', 'Fe3Cl'],
    note: 'The (III) means Fe³⁺, which needs three Cl⁻: FeCl₃. Chlorine comes in pairs, so the chlorine atoms must be a multiple of both 2 and 3 — six. That means 3Cl₂ and 2FeCl₃, so 2Fe.',
  },
  {
    id: 'eq_iron_bromine',
    wordEquation: 'iron + bromine → iron(III) bromide',
    reactants: [{ formula: 'Fe', coeff: 2 }, { formula: 'Br2', coeff: 3 }],
    products: [{ formula: 'FeBr3', coeff: 2 }],
    bank: ['Fe', 'Br2', 'FeBr3', 'FeBr2', 'FeBr', 'Br', 'Fe3Br'],
    note: 'Exactly the pattern of iron and chlorine — the halogens react alike. Fe³⁺ needs three Br⁻, so FeBr₃; six bromine atoms is 3Br₂, which makes 2FeBr₃ from 2Fe.',
  },
  {
    id: 'eq_chlorine_sodium_bromide',
    wordEquation: 'chlorine + sodium bromide → sodium chloride + bromine',
    reactants: [{ formula: 'Cl2', coeff: 1 }, { formula: 'NaBr', coeff: 2 }],
    products: [{ formula: 'NaCl', coeff: 2 }, { formula: 'Br2', coeff: 1 }],
    bank: ['Cl2', 'NaBr', 'NaCl', 'Br2', 'Cl', 'Br', 'NaCl2', 'NaBr2'],
    note: 'A displacement: chlorine is more reactive, so it pushes bromine out. One Cl₂ makes two chloride ions, so 2NaCl — which needs 2NaBr — and their two bromide ions leave as one Br₂.',
  },
  {
    id: 'eq_bromine_potassium_iodide',
    wordEquation: 'bromine + potassium iodide → potassium bromide + iodine',
    reactants: [{ formula: 'Br2', coeff: 1 }, { formula: 'KI', coeff: 2 }],
    products: [{ formula: 'KBr', coeff: 2 }, { formula: 'I2', coeff: 1 }],
    bank: ['Br2', 'KI', 'KBr', 'I2', 'Br', 'I', 'KI2', 'KBr2'],
    note: 'Bromine is above iodine, so it displaces it and the solution turns red-brown. The pattern is always halogen + 2 halide → 2 new halide + new halogen.',
  },
  {
    id: 'eq_chlorine_sodium_iodide',
    wordEquation: 'chlorine + sodium iodide → sodium chloride + iodine',
    reactants: [{ formula: 'Cl2', coeff: 1 }, { formula: 'NaI', coeff: 2 }],
    products: [{ formula: 'NaCl', coeff: 2 }, { formula: 'I2', coeff: 1 }],
    bank: ['Cl2', 'NaI', 'NaCl', 'I2', 'Cl', 'I', 'NaCl2', 'NaI2'],
    note: 'Chlorine is two places above iodine, so it displaces it easily. Keep both halogens diatomic — Cl₂ in, I₂ out — and the 2s fall into place.',
  },
];
