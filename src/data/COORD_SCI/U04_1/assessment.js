// src/data/COORD_SCI/U04_1/assessment.js
// The Quiz for C4.1 Electrolysis: 8 MCQ, one sitting, 10 minutes. Shares Gate 2
// with the arcade at 70 XP. English-only. Maths lives ONLY inside $$…$$ here —
// a single $ is literal in Assessment.jsx, the opposite of notes/workbook.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake — and no item simply copies a notes check or workbook question. The
// correct letter is spread across A/B/C/D so the key cannot be guessed.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_define',
      type: 'mcq',
      title: '1. Which liquid is an electrolyte?',
      options: [
        { val: 'A', text: 'A. Sugar solution' },
        { val: 'B', text: 'B. Ethanol' },
        { val: 'C', text: 'C. Copper(II) chloride solution' },
        { val: 'D', text: 'D. Distilled water' },
      ],
      correct: 'C',
      expEn: 'An electrolyte contains free-moving ions. Copper(II) chloride solution is an ionic compound dissolved in water. Sugar, ethanol and distilled water have no free ions.',
    },
    {
      id: 'a2_conduction',
      type: 'mcq',
      title: '2. A copper wire and molten sodium chloride both conduct. What is the key difference?',
      options: [
        { val: 'A', text: 'A. Only the wire conducts; the salt just gets hot' },
        { val: 'B', text: 'B. In the wire electrons move and the copper is unchanged; in the salt ions move and it is broken down' },
        { val: 'C', text: 'C. In the wire ions move; in the salt electrons move' },
        { val: 'D', text: 'D. There is no difference' },
      ],
      correct: 'B',
      expEn: 'Metals conduct by free electrons and are not changed. An electrolyte conducts by moving ions and is broken down into new substances. Option C swaps the two carriers.',
    },
    {
      id: 'a3_solid',
      type: 'mcq',
      title: '3. Why does solid sodium chloride NOT conduct electricity?',
      options: [
        { val: 'A', text: 'A. Its ions are locked in a fixed lattice and cannot move' },
        { val: 'B', text: 'B. It has no ions at all' },
        { val: 'C', text: 'C. It is a metal' },
        { val: 'D', text: 'D. Its electrons are too heavy' },
      ],
      correct: 'A',
      expEn: 'The ions exist in the solid but are held in a fixed lattice, so they cannot move to carry charge. Melting or dissolving frees them. It is not that the ions are absent (B).',
    },
    {
      id: 'a4_cathode',
      type: 'mcq',
      title: '4. At the cathode, which happens?',
      options: [
        { val: 'A', text: 'A. Negative ions gain electrons' },
        { val: 'B', text: 'B. Positive ions lose electrons (oxidation)' },
        { val: 'C', text: 'C. Negative ions lose electrons (oxidation)' },
        { val: 'D', text: 'D. Positive ions gain electrons (reduction)' },
      ],
      correct: 'D',
      expEn: 'The cathode is negative, so it attracts positive ions (cations), which GAIN electrons — reduction. Options B and C describe the anode. "OIL RIG": Reduction Is Gain.',
    },
    {
      id: 'a5_pbbr2_products',
      type: 'mcq',
      title: '5. Molten lead(II) bromide is electrolysed. What forms at each electrode?',
      options: [
        { val: 'A', text: 'A. Bromine at the cathode, lead at the anode' },
        { val: 'B', text: 'B. Lead at the cathode, bromine at the anode' },
        { val: 'C', text: 'C. Hydrogen at the cathode, oxygen at the anode' },
        { val: 'D', text: 'D. Lead at both electrodes' },
      ],
      correct: 'B',
      expEn: 'Metal to the cathode, non-metal to the anode: lead (Pb) at the cathode, bromine ($$\\text{Br}_2$$) at the anode. Option C is the brine (aqueous) result, not molten PbBr₂.',
    },
    {
      id: 'a6_half_equation',
      type: 'mcq',
      title: '6. Which is the correct cathode half-equation for molten lead(II) bromide?',
      options: [
        { val: 'A', text: 'A. $$\\text{Pb} \\rightarrow \\text{Pb}^{2+} + 2\\text{e}^-$$' },
        { val: 'B', text: 'B. $$2\\text{Br}^- \\rightarrow \\text{Br}_2 + 2\\text{e}^-$$' },
        { val: 'C', text: 'C. $$\\text{Pb}^{2+} + 2\\text{e}^- \\rightarrow \\text{Pb}$$' },
        { val: 'D', text: 'D. $$\\text{Pb}^{2+} + \\text{e}^- \\rightarrow \\text{Pb}$$' },
      ],
      correct: 'C',
      expEn: 'At the cathode a Pb²⁺ ion gains 2 electrons to become lead. Option A shows the reverse (oxidation), B is the anode half-equation, and D uses only 1 electron so the charges do not balance.',
    },
    {
      id: 'a7_symbol_eq',
      type: 'mcq',
      title: '7. Which is the correctly balanced equation for the electrolysis of molten sodium chloride?',
      options: [
        { val: 'A', text: 'A. $$2\\text{NaCl} \\rightarrow 2\\text{Na} + \\text{Cl}_2$$' },
        { val: 'B', text: 'B. $$\\text{NaCl} \\rightarrow \\text{Na} + \\text{Cl}$$' },
        { val: 'C', text: 'C. $$\\text{NaCl} \\rightarrow \\text{Na} + \\text{Cl}_2$$' },
        { val: 'D', text: 'D. $$2\\text{NaCl} \\rightarrow \\text{Na}_2 + \\text{Cl}_2$$' },
      ],
      correct: 'A',
      expEn: 'Chlorine is diatomic ($$\\text{Cl}_2$$), so two NaCl are needed to give one Cl₂ and two Na. Option B writes chlorine as single atoms; C does not balance; D invents "Na₂".',
    },
    {
      id: 'a8_aluminium',
      type: 'mcq',
      title: '8. Why is electrolysis, not heating with carbon, used to extract aluminium from its ore?',
      options: [
        { val: 'A', text: 'A. Aluminium oxide is not an ionic compound' },
        { val: 'B', text: 'B. Carbon does not exist in a pure form' },
        { val: 'C', text: 'C. Aluminium is a gas at room temperature' },
        { val: 'D', text: 'D. Aluminium is more reactive than carbon, so carbon cannot displace it' },
      ],
      correct: 'D',
      expEn: 'Reduction with carbon works only for metals less reactive than carbon (like iron). Aluminium is more reactive, so only electrolysis can extract it — which is why it is more expensive.',
    },
  ],
};
