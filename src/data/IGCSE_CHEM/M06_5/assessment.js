// src/data/IGCSE_CHEM/M06_5/assessment.js
// The Quiz for 6.5 The Periodic Table: 10 MCQ, one sitting, 12 minutes,
// modelled on the Wolsey Hall module multiple-choice quiz. Shares Gate 2 with
// the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae and charges are written with Unicode (2−, O²⁻) in plain text.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: ordering by mass, swapping the period and group rules, taking the
// group number as the charge, forgetting that Group VIII is unreactive, putting
// a metalloid on one side of the line, mixing up Mendeleev's three missing
// elements, or reading "down the group" as "more reactive" for a non-metal.
// No item copies a notes check or a workbook question. The key is spread
// across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_next_element',
      type: 'mcq',
      title: '1. Element Y comes straight after element X in the modern Periodic Table. What must be true?',
      options: [
        { val: 'A', text: 'A. Y has a higher relative atomic mass than X' },
        { val: 'B', text: 'B. Y has one more proton in each atom than X' },
        { val: 'C', text: 'C. Y is in the same group as X' },
        { val: 'D', text: 'D. Y has one more electron shell than X' },
      ],
      correct: 'B',
      expEn: 'The table is in order of proton number, so the next element always has one more proton. Mass nearly always rises too, but not always (argon, 39.9, comes before potassium, 39.1), so A need not be true. Next to each other in a row means the same period, not the same group.',
    },
    {
      id: 'a2_strontium',
      type: 'mcq',
      title: '2. Strontium is in Period 5 and Group II. What is true of a strontium atom?',
      options: [
        { val: 'A', text: 'A. It has 5 outer-shell electrons and 2 shells' },
        { val: 'B', text: 'B. It has 2 outer-shell electrons and 2 shells' },
        { val: 'C', text: 'C. It has 2 outer-shell electrons and 5 shells' },
        { val: 'D', text: 'D. It has 5 outer-shell electrons and 5 shells' },
      ],
      correct: 'C',
      expEn: 'Group number = outer-shell electrons: Group II, so 2. Period number = number of shells: Period 5, so 5. A swaps the two rules; B and D use one number for both.',
    },
    {
      id: 'a3_noble_gases',
      type: 'mcq',
      title: '3. Which statement about the Group VIII elements is correct?',
      options: [
        { val: 'A', text: 'A. Their atoms have full outer shells, so they are unreactive and exist as single atoms' },
        { val: 'B', text: 'B. Their atoms have one outer electron, so they are very reactive' },
        { val: 'C', text: 'C. They exist as molecules of two atoms, like chlorine, Cl₂' },
        { val: 'D', text: 'D. They form ions with a charge of 8+' },
      ],
      correct: 'A',
      expEn: 'The noble gases have full outer shells, which are stable: they do not need to lose, gain or share electrons. So they are unreactive and monatomic. One outer electron (B) is Group I; Cl₂ (C) is a Group VII molecule; and a full shell forms no ion at all (D).',
    },
    {
      id: 'a4_group6_charge',
      type: 'mcq',
      title: '4. Element Q is in Group VI. What is the charge on the ion that Q forms?',
      options: [
        { val: 'A', text: 'A. 6+' },
        { val: 'B', text: 'B. 6−' },
        { val: 'C', text: 'C. 2+' },
        { val: 'D', text: 'D. 2−' },
      ],
      correct: 'D',
      expEn: 'A Group VI atom has 6 outer electrons. It is far easier to GAIN 2 than to lose 6, so it gains 2 electrons and forms a 2− ion. The group number is not the charge (A, B), and gaining electrons makes an ion negative, not positive (C).',
    },
    {
      id: 'a5_metalloid',
      type: 'mcq',
      title: '5. Silicon is described as a metalloid. What does this mean?',
      options: [
        { val: 'A', text: 'A. It is a metal that does not conduct electricity' },
        { val: 'B', text: 'B. It has properties of both a metal and a non-metal' },
        { val: 'C', text: 'C. It is a transition element' },
        { val: 'D', text: 'D. It is made in a laboratory and is radioactive' },
      ],
      correct: 'B',
      expEn: 'A metalloid has properties of both: silicon conducts electricity in some conditions, like a metal, but forms covalent bonds with oxygen, like a non-metal. It is not a transition element (C), and it is found naturally in sand (D).',
    },
    {
      id: 'a6_eka_silicon',
      type: 'mcq',
      title: '6. Mendeleev left a gap in his table for an element he called eka-silicon. Which element was later found to fill that gap?',
      options: [
        { val: 'A', text: 'A. Gallium' },
        { val: 'B', text: 'B. Scandium' },
        { val: 'C', text: 'C. Silicon' },
        { val: 'D', text: 'D. Germanium' },
      ],
      correct: 'D',
      expEn: 'Eka-silicon means "one below silicon": germanium, in Group IV. Gallium filled the eka-aluminium gap and scandium the eka-boron gap. Silicon itself was already known.',
    },
    {
      id: 'a7_most_reactive_period2',
      type: 'mcq',
      title: '7. Nitrogen (2,5), oxygen (2,6), fluorine (2,7) and neon (2,8) are all in Period 2. Which is the most reactive?',
      options: [
        { val: 'A', text: 'A. Nitrogen' },
        { val: 'B', text: 'B. Neon' },
        { val: 'C', text: 'C. Fluorine' },
        { val: 'D', text: 'D. Oxygen' },
      ],
      correct: 'C',
      expEn: 'All four have two shells. Fluorine needs to gain only ONE electron to fill its outer shell, which takes the least energy, so it is the most reactive. Oxygen needs two and nitrogen three. Neon already has a full shell, so it is unreactive.',
    },
    {
      id: 'a8_phosphorus_oxide',
      type: 'mcq',
      title: '8. Phosphorus is a non-metal in Period 3, Group V. What kind of oxide does it form?',
      options: [
        { val: 'A', text: 'A. An acidic oxide' },
        { val: 'B', text: 'B. A basic oxide' },
        { val: 'C', text: 'C. An amphoteric oxide' },
        { val: 'D', text: 'D. It forms no oxide, because its outer shell is full' },
      ],
      correct: 'A',
      expEn: 'Across Period 3 the oxides go from basic (sodium, magnesium) to amphoteric (aluminium) to acidic (silicon to chlorine). Phosphorus is a non-metal, so its oxide is acidic. Only argon, with its full shell, forms no oxide.',
    },
    {
      id: 'a9_same_group',
      type: 'mcq',
      title: '9. Atoms of element Z have the electron arrangement 2,8,6. Which element will Z react most like?',
      options: [
        { val: 'A', text: 'A. Chlorine, the next element in the period' },
        { val: 'B', text: 'B. Argon, which has the same number of shells' },
        { val: 'C', text: 'C. Oxygen, which also has six outer-shell electrons' },
        { val: 'D', text: 'D. Neon, which has eight electrons in its second shell' },
      ],
      correct: 'C',
      expEn: 'Z has 6 outer electrons, so it is in Group VI (it is sulfur). Elements in the same group react alike, because they have the same number of outer electrons — so Z is most like oxygen, 2,6. Neighbours in a period (A, B) have different numbers of outer electrons.',
    },
    {
      id: 'a10_metals_share',
      type: 'mcq',
      title: '10. Which statement about the Periodic Table is correct?',
      options: [
        { val: 'A', text: 'A. About half of the elements are metals' },
        { val: 'B', text: 'B. Over 80% of the elements are metals, found to the left of the zig-zag line' },
        { val: 'C', text: 'C. The non-metals are found to the left of the zig-zag line' },
        { val: 'D', text: 'D. The transition elements are all non-metals' },
      ],
      correct: 'B',
      expEn: 'There are far more metals than non-metals: over 80% of the elements are metals, and they are to the left of the zig-zag line. The non-metals are to the right (hydrogen is the only exception), and the transition elements are all metals.',
    },
  ],
};
