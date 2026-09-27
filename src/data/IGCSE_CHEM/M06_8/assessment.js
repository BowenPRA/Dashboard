// src/data/IGCSE_CHEM/M06_8/assessment.js
// The Quiz for 6.8 Transition Elements: 10 MCQ, one sitting, 12 minutes,
// modelled on the Wolsey Hall module multiple-choice quiz. Shares Gate 2 with
// the arcade at 70 XP. English-only.
//
// 6.8 is the LAST topic of Module 6, so the last two items reach back across
// the module: the charge on a halogen's ion, and one statement true of Group I,
// Group VII and the transition elements.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts and charges (CrCl₃, Fe³⁺) in
// plain text instead.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: thinking every metal is "like sodium", swapping which solution is
// coloured, calling a catalyst a reactant, reading a subscript as the Roman
// numeral, forgetting the charge on a polyatomic ion, or getting a Group I or
// Group VII trend backwards. No item copies a notes check or a workbook
// question. Key: A3 B3 C2 D2.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_element_26',
      type: 'mcq',
      title: '1. Element 26 is in Period 4, in the block between Group II and Group III. Which statement about it must be true?',
      options: [
        { val: 'A', text: 'A. It is a non-metal' },
        { val: 'B', text: 'B. It is a metal' },
        { val: 'C', text: 'C. It is a noble gas' },
        { val: 'D', text: 'D. It forms only 1+ ions' },
      ],
      correct: 'B',
      expEn: 'The block between Group II and Group III is the transition elements, and they are all metals (element 26 is iron). The non-metals are to the right of the zig-zag line, the noble gases are Group VIII, and "only 1+" is Group I.',
    },
    {
      id: 'a2_shared_property',
      type: 'mcq',
      title: '2. Which property do the alkali metals and the transition elements share?',
      options: [
        { val: 'A', text: 'A. They have a low density' },
        { val: 'B', text: 'B. They form coloured compounds' },
        { val: 'C', text: 'C. They react vigorously with cold water' },
        { val: 'D', text: 'D. They conduct electricity' },
      ],
      correct: 'D',
      expEn: 'Both families are metals, and all metals conduct electricity. Low density (A) and a vigorous reaction with water (C) belong only to Group I; coloured compounds (B) only to the transition elements.',
    },
    {
      id: 'a3_two_solutions',
      type: 'mcq',
      title: '3. Solution X is pale green. Solution Y is colourless. Which pair could X and Y be?',
      options: [
        { val: 'A', text: 'A. X is iron(II) sulfate, Y is sodium sulfate' },
        { val: 'B', text: 'B. X is sodium chloride, Y is copper(II) sulfate' },
        { val: 'C', text: 'C. X is potassium nitrate, Y is nickel(II) chloride' },
        { val: 'D', text: 'D. X is copper(II) sulfate, Y is iron(III) chloride' },
      ],
      correct: 'A',
      expEn: 'A coloured solution needs a transition element; a colourless one fits a Group I compound. Iron(II) sulfate is pale green and sodium sulfate is colourless. (B) and (C) put the colour on the wrong side, and in (D) both are coloured — copper(II) sulfate is blue and iron(III) chloride is orange-brown.',
    },
    {
      id: 'a4_catalyst_iron',
      type: 'mcq',
      title: '4. Iron is used when ammonia is made from nitrogen and hydrogen. Which statement about the iron is correct?',
      options: [
        { val: 'A', text: 'A. It is a reactant, so it is used up and must be replaced' },
        { val: 'B', text: 'B. It slows the reaction down, so that it can be controlled' },
        { val: 'C', text: 'C. It speeds the reaction up, and is chemically unchanged at the end' },
        { val: 'D', text: 'D. It joins the nitrogen to form iron nitride' },
      ],
      correct: 'C',
      expEn: 'Iron is the catalyst. A catalyst speeds up a reaction but remains unchanged, so it is not a reactant (A, D) and it does not slow anything down (B).',
    },
    {
      id: 'a5_same_element',
      type: 'mcq',
      title: '5. Which pair of ions could BOTH be formed by the same element?',
      options: [
        { val: 'A', text: 'A. Na⁺ and Na²⁺' },
        { val: 'B', text: 'B. Fe²⁺ and Fe³⁺' },
        { val: 'C', text: 'C. Mg²⁺ and Mg³⁺' },
        { val: 'D', text: 'D. Al⁺ and Al³⁺' },
      ],
      correct: 'B',
      expEn: 'Only transition elements have variable charges, and iron forms both Fe²⁺ and Fe³⁺. Sodium (Group I) is always 1+, magnesium (Group II) always 2+ and aluminium (Group III) always 3+.',
    },
    {
      id: 'a6_formula_crcl3',
      type: 'mcq',
      title: '6. What is the formula of chromium(III) chloride?',
      options: [
        { val: 'A', text: 'A. CrCl' },
        { val: 'B', text: 'B. CrCl₂' },
        { val: 'C', text: 'C. CrCl₃' },
        { val: 'D', text: 'D. Cr₃Cl' },
      ],
      correct: 'C',
      expEn: 'The (III) means the chromium ion is Cr³⁺. Each chloride ion is Cl⁻, so three are needed to balance it: CrCl₃. (D) puts the 3 on the chromium instead of on the chloride.',
    },
    {
      id: 'a7_name_cuco3',
      type: 'mcq',
      title: '7. What is the name of CuCO₃?',
      options: [
        { val: 'A', text: 'A. Copper(III) carbonate' },
        { val: 'B', text: 'B. Copper(I) carbonate' },
        { val: 'C', text: 'C. Copper carbon trioxide' },
        { val: 'D', text: 'D. Copper(II) carbonate' },
      ],
      correct: 'D',
      expEn: 'The carbonate ion, CO₃²⁻, has a charge of 2−, so the one copper ion must be Cu²⁺: copper(II) carbonate. The 3 belongs to the oxygen atoms inside the carbonate ion (A), and there is one copper, but that does not make it copper(I) (B).',
    },
    {
      id: 'a8_stainless',
      type: 'mcq',
      title: '8. Stainless steel is used for knives and kitchen sinks. Which transition element is added to iron to make it, and why?',
      options: [
        { val: 'A', text: 'A. Chromium, to stop it rusting' },
        { val: 'B', text: 'B. Mercury, to make it shiny' },
        { val: 'C', text: 'C. Titanium, to make it less dense' },
        { val: 'D', text: 'D. Copper, to make it a better conductor' },
      ],
      correct: 'A',
      expEn: 'Stainless steel contains about 11% chromium, which prevents rust. Mercury is a liquid, titanium is used on its own where lightness matters, and conducting electricity is not what a sink or a knife needs.',
    },
    {
      id: 'a9_negative_ion',
      type: 'mcq',
      title: '9. Across Module 6: the elements of which family form ions with a charge of 1−?',
      options: [
        { val: 'A', text: 'A. The alkali metals' },
        { val: 'B', text: 'B. The halogens' },
        { val: 'C', text: 'C. The transition elements' },
        { val: 'D', text: 'D. The noble gases' },
      ],
      correct: 'B',
      expEn: 'The halogens (Group VII) gain one electron to form halide ions such as Cl⁻ and Br⁻. Metals form positive ions: the alkali metals always 1+ (A), the transition elements a variable positive charge (C). The noble gases are unreactive and form no ions (D).',
    },
    {
      id: 'a10_three_families',
      type: 'mcq',
      title: '10. Which statement about Group I, Group VII and the transition elements is correct?',
      options: [
        { val: 'A', text: 'A. Of the three, only the transition elements form ions with more than one charge' },
        { val: 'B', text: 'B. Reactivity decreases as you go down Group I' },
        { val: 'C', text: 'C. The transition elements are less dense than the Group I metals' },
        { val: 'D', text: 'D. The transition elements show the clearest trend in reactivity' },
      ],
      correct: 'A',
      expEn: 'Group I ions are always 1+ and halide ions always 1−; only the transition elements have variable charges. Reactivity INCREASES down Group I (B is the Group VII trend), the transition elements are much denser (C), and they show no clear trend (D).',
    },
  ],
};
