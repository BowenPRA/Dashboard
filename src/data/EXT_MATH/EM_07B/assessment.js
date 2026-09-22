// src/data/EXT_MATH/EM_07B/assessment.js
// The Quiz for EM_07B: 10 multiple-choice items, one sitting, 15 minutes (a
// calculator is needed for the trigonometry). Shares Gate 2 with the arcade.
// English only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx,
// the opposite of the notes and workbook files. No diagram is used: every
// triangle and bearing is given in words, so the quiz never depends on a
// picture the student might read wrongly.
//
// Every distractor is a diagnosis — the answer you reach by making one
// nameable mistake: a scale left in two units, 180° added the wrong way,
// sides added instead of squares, the wrong ratio, multiplying when the
// unknown is on the bottom, the other angle, radians, the exact value of the
// other angle, 360 divided by the interior angle, a bearing turned
// anticlockwise. No item repeats a notes check or a Practice question, and
// the key is spread A/B/C/D.
export const assessment = {
  timeLimit: 900, // 15 minutes
  passages: [],
  questions: [
    {
      id: 'q1_scale',
      type: 'mcq',
      title: '1. On a map, 1 cm represents 4 km. Write the scale of the map in the form 1 : n.',
      options: [
        { val: 'A', text: 'A. 1 : 4000' },
        { val: 'B', text: 'B. 1 : 40 000' },
        { val: 'C', text: 'C. 1 : 400 000' },
        { val: 'D', text: 'D. 1 : 4' },
      ],
      correct: 'C',
      expEn: '$$4 \\text{ km} = 4000 \\text{ m} = 400\\,000 \\text{ cm}$$, and both parts of a scale must be in the same unit. A stops at metres; D mixes centimetres with kilometres.',
    },
    {
      id: 'q2_back',
      type: 'mcq',
      title: '2. The bearing of B from A is 245°. What is the bearing of A from B?',
      options: [
        { val: 'A', text: 'A. 425°' },
        { val: 'B', text: 'B. 115°' },
        { val: 'C', text: 'C. 135°' },
        { val: 'D', text: 'D. 065°' },
      ],
      correct: 'D',
      expEn: 'The bearing is more than 180°, so take 180° away: $$245^\\circ - 180^\\circ = 065^\\circ$$. A adds 180° and goes past a full turn; B is $$360^\\circ - 245^\\circ$$.',
    },
    {
      id: 'q3_exact',
      type: 'mcq',
      title: '3. The two shorter sides of a right-angled triangle are 3 cm and 6 cm. Find the length of the hypotenuse in exact form.',
      options: [
        { val: 'A', text: 'A. 9 cm' },
        { val: 'B', text: 'B. $$5\\sqrt{3}$$ cm' },
        { val: 'C', text: 'C. $$3\\sqrt{5}$$ cm' },
        { val: 'D', text: 'D. $$3\\sqrt{3}$$ cm' },
      ],
      correct: 'C',
      expEn: '$$3^2 + 6^2 = 45$$, and $$\\sqrt{45} = \\sqrt{9} \\times \\sqrt{5} = 3\\sqrt{5}$$ cm. A adds the sides, not their squares; B swaps the numbers inside and outside the root.',
    },
    {
      id: 'q4_side',
      type: 'mcq',
      title: '4. In a right-angled triangle the hypotenuse is 15 cm and one angle is 28°. Find the side opposite the 28° angle, to 3 significant figures.',
      options: [
        { val: 'A', text: 'A. 13.2 cm' },
        { val: 'B', text: 'B. 32.0 cm' },
        { val: 'C', text: 'C. 7.98 cm' },
        { val: 'D', text: 'D. 7.04 cm' },
      ],
      correct: 'D',
      expEn: 'Opposite and hypotenuse: SOH. $$x = 15 \\sin 28^\\circ = 7.04$$ cm. A uses cos (the adjacent side); B divides instead of multiplying; C uses tan.',
    },
    {
      id: 'q5_bottom',
      type: 'mcq',
      title: '5. $$\\sin 40^\\circ = \\dfrac{9}{x}$$. Find $$x$$, to 3 significant figures.',
      options: [
        { val: 'A', text: 'A. 5.79' },
        { val: 'B', text: 'B. 14.0' },
        { val: 'C', text: 'C. 0.0714' },
        { val: 'D', text: 'D. 11.7' },
      ],
      correct: 'B',
      expEn: '$$x$$ is on the bottom: multiply both sides by $$x$$, then divide by $$\\sin 40^\\circ$$ — $$x = 9 \\div \\sin 40^\\circ = 14.0$$. A multiplies, as if $$x$$ were on top; D uses cos.',
    },
    {
      id: 'q6_angle',
      type: 'mcq',
      title: '6. In a right-angled triangle, the side opposite angle θ is 7 cm and the side adjacent to it is 12 cm. Find θ, to 1 decimal place.',
      options: [
        { val: 'A', text: 'A. 59.7°' },
        { val: 'B', text: 'B. 30.3°' },
        { val: 'C', text: 'C. 35.7°' },
        { val: 'D', text: 'D. 0.5°' },
      ],
      correct: 'B',
      expEn: 'TOA: $$\\theta = \\tan^{-1}\\left(\\dfrac{7}{12}\\right) = 30.3^\\circ$$. A is the OTHER acute angle (the fraction upside down); C uses $$\\sin^{-1}$$; D is the answer with the calculator in radians.',
    },
    {
      id: 'q7_exact_value',
      type: 'mcq',
      title: '7. Without a calculator: what is the exact value of $$\\cos 30^\\circ$$?',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{1}{2}$$' },
        { val: 'B', text: 'B. $$\\dfrac{\\sqrt{2}}{2}$$' },
        { val: 'C', text: 'C. $$\\sqrt{3}$$' },
        { val: 'D', text: 'D. $$\\dfrac{\\sqrt{3}}{2}$$' },
      ],
      correct: 'D',
      expEn: 'In half an equilateral triangle of side 2, the side next to the $$30^\\circ$$ angle is $$\\sqrt{3}$$: $$\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$$. A is $$\\cos 60^\\circ$$; B is $$\\cos 45^\\circ$$; C is $$\\tan 60^\\circ$$.',
    },
    {
      id: 'q8_polygon',
      type: 'mcq',
      title: '8. Each exterior angle of a regular polygon is 24°. How many sides does it have?',
      options: [
        { val: 'A', text: 'A. 15' },
        { val: 'B', text: 'B. 7.5' },
        { val: 'C', text: 'C. 156' },
        { val: 'D', text: 'D. 13' },
      ],
      correct: 'A',
      expEn: 'The exterior angles add up to 360°, so $$360 \\div 24 = 15$$ sides. B divides 180 instead of 360; C is the interior angle, $$180^\\circ - 24^\\circ$$, not a number of sides.',
    },
    {
      id: 'q9_bearing',
      type: 'mcq',
      title: '9. B is 8 km due north of A, and C is 5 km due east of B. Find the bearing of C from A.',
      options: [
        { val: 'A', text: 'A. 032.0°' },
        { val: 'B', text: 'B. 058.0°' },
        { val: 'C', text: 'C. 328.0°' },
        { val: 'D', text: 'D. 212.0°' },
      ],
      correct: 'A',
      expEn: 'At A the angle between north (AB) and AC has $$\\tan \\theta = \\dfrac{5}{8}$$, so $$\\theta = 32.0^\\circ$$ — already measured from north, clockwise. B is the angle at C; C turns the wrong way; D is the bearing of A from C.',
    },
    {
      id: 'q10_correlation',
      type: 'mcq',
      title: '10. On warmer days a café sells fewer hot drinks. What type of correlation would a scatter diagram of temperature against hot-drink sales show?',
      options: [
        { val: 'A', text: 'A. Positive correlation' },
        { val: 'B', text: 'B. No correlation' },
        { val: 'C', text: 'C. Negative correlation' },
        { val: 'D', text: 'D. It is not possible to tell' },
      ],
      correct: 'C',
      expEn: 'As one quantity (temperature) goes up, the other (sales) goes down: negative correlation. Positive would mean both rise together.',
    },
  ],
};
