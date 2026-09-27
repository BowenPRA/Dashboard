// src/data/IGCSE_CHEM/M06_6/assessment.js
// The Quiz for 6.6 Group 1: The Alkali Metals: 10 MCQ, one sitting,
// 12 minutes, modelled on the Wolsey Hall module multiple-choice quiz. Shares
// Gate 2 with the arcade at 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae and charges are written with Unicode (RbCl, Cs⁺) in plain text
// instead, as M06_2 does.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: reading the period or the proton number as the outer electrons,
// confusing the oxide with the hydroxide, putting the metals in DENSITY order,
// giving a metal ion a negative charge, thinking a bigger nucleus holds the
// electron tighter, dividing density upside down, treating the group number
// as a subscript, or thinking the hydrogen is what makes the water alkaline.
// No item copies a notes check or a workbook question, and the metals are
// mostly the ones the lab never sees (rubidium, caesium), so the answers come
// from the trends, not memory. Key: A3 B2 C3 D2.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_not_property',
      type: 'mcq',
      title: '1. Which of these is NOT true of the alkali metals?',
      options: [
        { val: 'A', text: 'A. They can be cut with a knife' },
        { val: 'B', text: 'B. They react with water to give an alkaline solution' },
        { val: 'C', text: 'C. They are hard and have high melting points' },
        { val: 'D', text: 'D. Their atoms have one outer-shell electron' },
      ],
      correct: 'C',
      expEn: 'The alkali metals are soft (they cut with a knife) and have LOW melting points — every one melts below 200 °C. The other three statements are all true of Group I.',
    },
    {
      id: 'a2_rubidium_outer',
      type: 'mcq',
      title: '2. Rubidium is in Group I and Period 5. Its proton number is 37. How many outer-shell electrons does a rubidium atom have?',
      options: [
        { val: 'A', text: 'A. 1' },
        { val: 'B', text: 'B. 5' },
        { val: 'C', text: 'C. 37' },
        { val: 'D', text: 'D. 8' },
      ],
      correct: 'A',
      expEn: 'The group number gives the outer-shell electrons: Group I, one. The period number (5) gives the number of shells, and 37 is the total number of electrons. Eight would be a full outer shell, which an alkali metal atom does not have.',
    },
    {
      id: 'a3_caesium_water',
      type: 'mcq',
      title: '3. Caesium reacts explosively with water. What are the products?',
      options: [
        { val: 'A', text: 'A. Caesium oxide and hydrogen' },
        { val: 'B', text: 'B. Caesium hydroxide and oxygen' },
        { val: 'C', text: 'C. Caesium hydroxide and hydrogen' },
        { val: 'D', text: 'D. Caesium hydroxide only — no gas is given off' },
      ],
      correct: 'C',
      expEn: 'Every alkali metal + water gives the metal hydroxide + hydrogen. Caesium oxide (A) forms with oxygen, not water; the gas is hydrogen, not oxygen (B); and the fizzing shows a gas is given off (D).',
    },
    {
      id: 'a4_reactivity_order',
      type: 'mcq',
      title: '4. Which list puts these alkali metals in order of reactivity, MOST reactive first?',
      options: [
        { val: 'A', text: 'A. Li, Na, K, Rb, Cs' },
        { val: 'B', text: 'B. Cs, Rb, K, Na, Li' },
        { val: 'C', text: 'C. Cs, Rb, Na, K, Li' },
        { val: 'D', text: 'D. They are all equally reactive, because they all have one outer electron' },
      ],
      correct: 'B',
      expEn: 'Reactivity increases down Group I, so the most reactive is at the bottom: Cs, Rb, K, Na, Li. (A) is the same list backwards; (C) follows the density table, where potassium does not fit; and one outer electron makes them react alike, not equally fast (D).',
    },
    {
      id: 'a5_caesium_ion',
      type: 'mcq',
      title: '5. What is the charge on a caesium ion?',
      options: [
        { val: 'A', text: 'A. 1−' },
        { val: 'B', text: 'B. 2+' },
        { val: 'C', text: 'C. 6+' },
        { val: 'D', text: 'D. 1+' },
      ],
      correct: 'D',
      expEn: 'Caesium is in Group I: its atom loses its one outer electron, so the ion is Cs⁺, charge 1+. Losing an electron makes an ion positive, not negative (A); 2+ is Group II; and 6 is caesium\'s period number, not its charge.',
    },
    {
      id: 'a6_why_trend',
      type: 'mcq',
      title: '6. Why does reactivity increase down Group I?',
      options: [
        { val: 'A', text: 'A. The outer electron is further from the nucleus, so it is attracted less strongly and lost more easily' },
        { val: 'B', text: 'B. The atoms have more outer-shell electrons to lose' },
        { val: 'C', text: 'C. The atoms gain electrons more easily' },
        { val: 'D', text: 'D. The nucleus has fewer protons, so it pulls the outer electron less' },
      ],
      correct: 'A',
      expEn: 'Each alkali metal atom has just one outer electron (not B), and it reacts by LOSING it (not C). Down the group the nucleus has MORE protons, not fewer (D) — but the extra shells put the outer electron further away, so the pull on it is weaker and it is lost more easily.',
    },
    {
      id: 'a7_density_calc',
      type: 'mcq',
      title: '7. A piece of sodium has a volume of 5.0 cm³ and a mass of 4.85 g. What is its density?',
      options: [
        { val: 'A', text: 'A. 24.25 g/cm³' },
        { val: 'B', text: 'B. 1.03 g/cm³' },
        { val: 'C', text: 'C. 9.85 g/cm³' },
        { val: 'D', text: 'D. 0.97 g/cm³' },
      ],
      correct: 'D',
      expEn: 'Density = mass ÷ volume = 4.85 ÷ 5.0 = 0.97 g/cm³ — less than water, so sodium floats. (A) multiplies, (B) divides the volume by the mass, and (C) adds them.',
    },
    {
      id: 'a8_rbcl_formula',
      type: 'mcq',
      title: '8. Rubidium burns in chlorine to form rubidium chloride. What is its formula?',
      options: [
        { val: 'A', text: 'A. RbCl₂' },
        { val: 'B', text: 'B. Rb₂Cl' },
        { val: 'C', text: 'C. RbCl' },
        { val: 'D', text: 'D. RbCl₇' },
      ],
      correct: 'C',
      expEn: 'Rubidium forms Rb⁺ and chlorine forms Cl⁻, so they pair one to one: RbCl. (A) treats rubidium as 2+, (B) treats chloride as 2−, and (D) writes chlorine\'s group number as a subscript.',
    },
    {
      id: 'a9_which_group',
      type: 'mcq',
      title: '9. Metal X is soft enough to cut with a knife and is stored under oil. It reacts with cold water to give hydrogen and an alkaline solution. Where is X in the Periodic Table?',
      options: [
        { val: 'A', text: 'A. Group VII' },
        { val: 'B', text: 'B. Group I' },
        { val: 'C', text: 'C. Group VIII' },
        { val: 'D', text: 'D. Among the transition elements' },
      ],
      correct: 'B',
      expEn: 'Soft, stored under oil, and reacting with cold water to give an alkali and hydrogen: X is an alkali metal, in Group I. Group VII and Group VIII are non-metals, and the transition elements are hard metals that react slowly, if at all, with cold water.',
    },
    {
      id: 'a10_indicator_cause',
      type: 'mcq',
      title: '10. Potassium reacts with water containing universal indicator, and the indicator turns purple. What causes the colour change?',
      options: [
        { val: 'A', text: 'A. Potassium hydroxide forms, and it is an alkali' },
        { val: 'B', text: 'B. Hydrogen is given off, and hydrogen is alkaline' },
        { val: 'C', text: 'C. The heat of the reaction changes the colour of the dye' },
        { val: 'D', text: 'D. Potassium metal is itself an alkali' },
      ],
      correct: 'A',
      expEn: 'The products are potassium hydroxide and hydrogen. The hydroxide dissolves to give an alkaline solution — that is what turns the indicator purple. Hydrogen escapes as a gas and is not an alkali; the metal is not an alkali until it has reacted to form its hydroxide.',
    },
  ],
};
