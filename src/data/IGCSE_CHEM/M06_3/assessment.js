// src/data/IGCSE_CHEM/M06_3/assessment.js
// The Quiz for 6.3 Oxides: 10 MCQ, one sitting, 12 minutes, modelled on the
// Wolsey Hall module multiple-choice quiz. Shares Gate 2 with the arcade at
// 70 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// Formulae are written with Unicode subscripts (Li₂O, P₄O₁₀) in plain text
// instead, as M06_2 does.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: counting a hydroxide as an oxide, writing oxygen as O or ignoring
// the ion charges, forgetting that reactivity sets the vigour, treating an
// insoluble base as an alkali, pairing two oxides of the same kind, treating
// the effect of acid rain instead of its cause, swapping "amphoteric" and
// "neutral", or confusing carbon monoxide with carbon dioxide. No item copies a
// notes check or a workbook question. The key is spread across A/B/C/D.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_not_oxide',
      type: 'mcq',
      title: '1. Which of these compounds is NOT an oxide?',
      options: [
        { val: 'A', text: 'A. Lithium oxide, Li₂O' },
        { val: 'B', text: 'B. Nitrogen monoxide, NO' },
        { val: 'C', text: 'C. Calcium hydroxide, Ca(OH)₂' },
        { val: 'D', text: 'D. Silicon dioxide, SiO₂' },
      ],
      correct: 'C',
      expEn: 'An oxide contains oxygen and ONE other element. Calcium hydroxide contains oxygen, but it has three elements — calcium, oxygen and hydrogen — so it is a hydroxide, not an oxide. The other three each have just two elements.',
    },
    {
      id: 'a2_lithium_equation',
      type: 'mcq',
      title: '2. Lithium burns in oxygen to form lithium oxide. Which is the balanced symbol equation?',
      options: [
        { val: 'A', text: 'A. 4Li + O₂ → 2Li₂O' },
        { val: 'B', text: 'B. Li + O₂ → LiO₂' },
        { val: 'C', text: 'C. 2Li + O₂ → 2LiO' },
        { val: 'D', text: 'D. 2Li + O → Li₂O' },
      ],
      correct: 'A',
      expEn: 'Li⁺ has one plus charge and O²⁻ two minus, so lithium oxide is Li₂O (not LiO or LiO₂, which ignore the charges). Oxygen is O₂, never a single O (D). One O₂ makes 2Li₂O, which needs 4Li.',
    },
    {
      id: 'a3_barium_vigour',
      type: 'mcq',
      title: '3. Barium is more reactive than calcium. Heated barium is put into a jar of oxygen. What would you expect?',
      options: [
        { val: 'A', text: 'A. It reacts less vigorously than calcium, and forms a basic oxide' },
        { val: 'B', text: 'B. It reacts more vigorously than calcium, and forms a basic oxide' },
        { val: 'C', text: 'C. It reacts more vigorously than calcium, and forms an acidic oxide' },
        { val: 'D', text: 'D. It reacts just as vigorously as calcium, because both are metals' },
      ],
      correct: 'B',
      expEn: 'The more reactive the metal, the more vigorously it reacts with oxygen — so barium reacts more vigorously than calcium (not less, A, and not the same, D). Barium is a metal, so its oxide is basic, not acidic (C).',
    },
    {
      id: 'a4_insoluble_base',
      type: 'mcq',
      title: '4. Cobalt(II) oxide does not dissolve in water. Which result would show that it is a base?',
      options: [
        { val: 'A', text: 'A. It turns damp red litmus paper blue' },
        { val: 'B', text: 'B. It dissolves in water to give an acid' },
        { val: 'C', text: 'C. It reacts with sodium hydroxide solution' },
        { val: 'D', text: 'D. It dissolves in warm dilute acid, and the liquid left has no effect on blue litmus' },
      ],
      correct: 'D',
      expEn: 'A base neutralises an acid. If the oxide dissolves in the acid and the liquid no longer turns blue litmus red, the acid has been used up. It cannot turn damp litmus blue (A): it is insoluble, so it is not an alkali. Giving an acid (B) or reacting with an alkali (C) would make it acidic.',
    },
    {
      id: 'a5_phosphorus_oxide_ph',
      type: 'mcq',
      title: '5. Phosphorus(V) oxide is shaken with water and universal indicator is added. What is the pH of the solution most likely to be, and why?',
      options: [
        { val: 'A', text: 'A. About 12, because phosphorus(V) oxide is a base' },
        { val: 'B', text: 'B. About 2, because the oxide dissolves to give an acid' },
        { val: 'C', text: 'C. 7, because a solid oxide cannot change the pH' },
        { val: 'D', text: 'D. 7, because the oxide does not react with water' },
      ],
      correct: 'B',
      expEn: 'Phosphorus is a non-metal, so phosphorus(V) oxide is an acidic oxide: it dissolves in water to give an acid, so the pH is low. Only metal oxides are bases (A). Being a solid does not stop it reacting (C, D).',
    },
    {
      id: 'a6_pair_react',
      type: 'mcq',
      title: '6. Which pair of oxides would react with each other?',
      options: [
        { val: 'A', text: 'A. Calcium oxide and sulfur dioxide' },
        { val: 'B', text: 'B. Calcium oxide and magnesium oxide' },
        { val: 'C', text: 'C. Sulfur dioxide and carbon dioxide' },
        { val: 'D', text: 'D. Carbon monoxide and dinitrogen oxide' },
      ],
      correct: 'A',
      expEn: 'Calcium oxide is a basic oxide and sulfur dioxide is an acidic oxide, so they neutralise each other (making calcium sulfite). Two basic oxides (B) or two acidic oxides (C) do not neutralise each other, and neutral oxides (D) react with neither acids nor bases.',
    },
    {
      id: 'a7_reduce_acid_rain',
      type: 'mcq',
      title: '7. Which change would do most to reduce acid rain?',
      options: [
        { val: 'A', text: 'A. Burning fuels at a higher temperature in car engines' },
        { val: 'B', text: 'B. Removing sulfur from fuels before they are burned' },
        { val: 'C', text: 'C. Building taller chimneys on power stations' },
        { val: 'D', text: 'D. Adding more oxygen to the waste gases so the oxides burn away' },
      ],
      correct: 'B',
      expEn: 'No sulfur in the fuel means no sulfur dioxide. A hotter engine (A) makes MORE oxides of nitrogen. A taller chimney (C) only carries the same gases further away. The oxides have already combined with oxygen, so more oxygen (D) cannot burn them away.',
    },
    {
      id: 'a8_amphoteric_define',
      type: 'mcq',
      title: '8. Which is the definition of an amphoteric oxide?',
      options: [
        { val: 'A', text: 'A. An oxide that dissolves in water to give an acid' },
        { val: 'B', text: 'B. An oxide that reacts with neither acids nor bases' },
        { val: 'C', text: 'C. A metal oxide that neutralises acids' },
        { val: 'D', text: 'D. An oxide that reacts with both acids and alkalis' },
      ],
      correct: 'D',
      expEn: 'Amphoteric means it reacts with both acids and alkalis, like aluminium oxide and zinc oxide. (A) describes an acidic oxide, (B) a neutral oxide, and (C) a basic oxide.',
    },
    {
      id: 'a9_neutral_oxide',
      type: 'mcq',
      title: '9. Which of these oxides is a neutral oxide?',
      options: [
        { val: 'A', text: 'A. Carbon dioxide, CO₂' },
        { val: 'B', text: 'B. Zinc oxide, ZnO' },
        { val: 'C', text: 'C. Carbon monoxide, CO' },
        { val: 'D', text: 'D. Sulfur dioxide, SO₂' },
      ],
      correct: 'C',
      expEn: 'Carbon monoxide reacts with neither acids nor bases, so it is neutral. Carbon dioxide (A) is an acidic oxide — do not mix up the two oxides of carbon. Zinc oxide (B) reacts with both, which makes it amphoteric, not neutral. Sulfur dioxide (D) is acidic.',
    },
    {
      id: 'a10_aluminium_reply',
      type: 'mcq',
      title: '10. A student says: "Aluminium is a metal, so aluminium oxide must be a basic oxide." Which is the best reply?',
      options: [
        { val: 'A', text: 'A. It does act as a base with acids, but it also acts as an acid with alkalis — so it is amphoteric' },
        { val: 'B', text: 'B. That is correct — every metal oxide is a basic oxide' },
        { val: 'C', text: 'C. No — it is an acidic oxide, because it reacts with sodium hydroxide' },
        { val: 'D', text: 'D. No — it is neutral, because its two reactions cancel each other out' },
      ],
      correct: 'A',
      expEn: 'Aluminium oxide reacts with hydrochloric acid (as a base) AND with sodium hydroxide (as an acid), so it is amphoteric. Most metal oxides are basic, but not every one (B). (C) forgets the reaction with acid, and a neutral oxide (D) reacts with neither.',
    },
  ],
};
