// src/data/OLEVEL_PHYS/C09_1/assessment.js
// The Quiz for Magnets and Magnetic Fields (spreads 9.1 and 9.2): 10 MCQ, one
// sitting, 12 minutes. Shares Gate 2 with the arcade at 60 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// This quiz needs none: symbols are Unicode.
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: thinking the force is spread along the magnet, taking attraction as
// proof of a magnet, counting any metal as magnetic, giving the induced pole the
// SAME name as the pole beside it, swapping hard and soft, sending field arrows
// out of every pole, reading far-apart lines as strong, putting the neutral
// point where the field is strongest, or naming the Earth's northern pole after
// the place instead of after what it attracts. Every item is a fresh situation;
// none copies a notes check. Key spread A/B/C/D = 3/3/2/2.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_paper_clips',
      type: 'mcq',
      title: '1. A bar magnet is held just above a tray of steel paper clips, then lifted. Where on the magnet will most of the clips hang?',
      options: [
        { val: 'A', text: 'A. In the middle, where there is the most metal' },
        { val: 'B', text: 'B. At the two ends' },
        { val: 'C', text: 'C. At the N end only' },
        { val: 'D', text: 'D. Spread evenly along its length' },
      ],
      correct: 'B',
      expEn: 'The magnetic force is strongest at the two poles, which are at the ends of a bar magnet, so the clips gather there. Both poles attract steel — not just the N pole (C) — and the middle has the weakest pull (A, D).',
    },
    {
      id: 'q2_attracted_rod',
      type: 'mcq',
      title: '2. One end of a metal rod is attracted by the N pole of a magnet. What can you be certain of?',
      options: [
        { val: 'A', text: 'A. The rod is a magnet' },
        { val: 'B', text: 'B. The rod is non-magnetic' },
        { val: 'C', text: 'C. The rod is a magnetic material, but it may not be a magnet' },
        { val: 'D', text: 'D. The rod is made of steel' },
      ],
      correct: 'C',
      expEn: 'Attraction only shows the rod is a magnetic material: a magnet induces an opposite pole in plain iron or steel and pulls it. The rod could be a magnet with its S end facing, or just unmagnetised iron, so (A) and (D) are not certain. Only repulsion proves a magnet. A non-magnetic rod (B) would feel no force.',
    },
    {
      id: 'q3_non_magnetic_list',
      type: 'mcq',
      title: '3. Which list contains only non-magnetic metals?',
      options: [
        { val: 'A', text: 'A. copper, aluminium, brass' },
        { val: 'B', text: 'B. iron, copper, zinc' },
        { val: 'C', text: 'C. nickel, tin, aluminium' },
        { val: 'D', text: 'D. steel, brass, tin' },
      ],
      correct: 'A',
      expEn: 'Copper, aluminium and brass are all non-magnetic. Each other list hides one magnetic metal: iron (B), nickel (C) and steel, which is mainly iron (D).',
    },
    {
      id: 'q4_pin_chain',
      type: 'mcq',
      title: '4. A steel pin hangs from the S pole of a magnet, and a second pin hangs from the bottom of the first. Which pole is induced at the TOP of the second pin?',
      options: [
        { val: 'A', text: 'A. An S pole — the same as the magnet\'s pole' },
        { val: 'B', text: 'B. An S pole — the same as the pole at the bottom of the first pin' },
        { val: 'C', text: 'C. No pole — only the pin touching the magnet becomes magnetised' },
        { val: 'D', text: 'D. An N pole — opposite to the S pole at the bottom of the first pin' },
      ],
      correct: 'D',
      expEn: 'The first pin gets an N pole at its top (opposite to the magnet\'s S pole) and so an S pole at its bottom. That S pole induces the OPPOSITE pole, an N pole, at the top of the second pin — which is why it is held. An induced pole is never the same as the pole next to it (A, B), and the first pin is itself a magnet, so it can magnetise the next (C).',
    },
    {
      id: 'q5_permanent_material',
      type: 'mcq',
      title: '5. Which is the best material for a permanent magnet, and why?',
      options: [
        { val: 'A', text: 'A. Iron, because it is easy to magnetise' },
        { val: 'B', text: 'B. Steel, because it is a hard magnetic material that keeps its magnetism' },
        { val: 'C', text: 'C. Mumetal, because it is a soft magnetic material' },
        { val: 'D', text: 'D. Copper, because it is a good conductor' },
      ],
      correct: 'B',
      expEn: 'A permanent magnet must keep its magnetism, which is what hard magnetic materials like steel do. Iron and Mumetal (A, C) are soft: easy to magnetise, but they lose it at once. Copper (D) is non-magnetic.',
    },
    {
      id: 'q6_compass_beyond_s',
      type: 'mcq',
      title: '6. A plotting compass is placed in line with a bar magnet, a little way beyond its S pole. Which way does the N end of the needle point?',
      options: [
        { val: 'A', text: 'A. Towards the S pole, because outside a magnet the field runs into the S pole' },
        { val: 'B', text: 'B. Away from the S pole, because field lines point away from every pole' },
        { val: 'C', text: 'C. At right angles to the magnet' },
        { val: 'D', text: 'D. Nowhere in particular, because the field beyond a pole is zero' },
      ],
      correct: 'A',
      expEn: 'Field lines run from N to S outside a magnet, so they run INTO the S pole. The compass\'s N end is pulled towards the S pole and points at it. Field lines leave an N pole but enter an S pole (B). In line with the magnet the field runs along that line, not across it (C), and it is strong near a pole, not zero (D).',
    },
    {
      id: 'q7_line_spacing',
      type: 'mcq',
      title: '7. In a magnetic field diagram, the field lines are close together at point P and far apart at point Q. Which statement is correct?',
      options: [
        { val: 'A', text: 'A. The field is stronger at Q' },
        { val: 'B', text: 'B. The field is the same at P and Q, because they are in the same field' },
        { val: 'C', text: 'C. The field is stronger at P' },
        { val: 'D', text: 'D. The field is zero at Q, because no line passes through it' },
      ],
      correct: 'C',
      expEn: 'The closer the field lines, the stronger the field, so it is stronger at P. Far-apart lines mean a weaker field (A), not the same (B). A gap between drawn lines does not mean there is no field there (D): the lines are only a selection.',
    },
    {
      id: 'q8_neutral_point',
      type: 'mcq',
      title: '8. Which of these describes a neutral point?',
      options: [
        { val: 'A', text: 'A. The point where the field is strongest, between two N poles' },
        { val: 'B', text: 'B. The middle of a bar magnet, where no filings cling' },
        { val: 'C', text: 'C. A point between two unlike poles, where the field is uniform' },
        { val: 'D', text: 'D. A point where two magnetic fields cancel, so the magnetic force there is zero' },
      ],
      correct: 'D',
      expEn: 'At a neutral point the fields of two magnets are equal and opposite, so they cancel and a magnetic material there feels no force. It is the weakest place, not the strongest (A). The middle of one magnet (B) still has a field. Between unlike poles the field is strong and almost uniform (C) — there is no neutral point there.',
    },
    {
      id: 'q9_heated_magnet',
      type: 'mcq',
      title: '9. A permanent magnet is heated strongly, and afterwards it is no longer a magnet. Why?',
      options: [
        { val: 'A', text: 'A. Its atomic magnets have been thrown out of line' },
        { val: 'B', text: 'B. Its atoms have lost their electrons' },
        { val: 'C', text: 'C. Its atomic magnets have all turned round to face the other way' },
        { val: 'D', text: 'D. Its two poles have moved to the middle and joined' },
      ],
      correct: 'A',
      expEn: 'Strong heating, like hammering, jumbles the atomic magnets so they point every way and their effects cancel. The electrons stay in the atoms (B). If they all turned round (C), it would still be a magnet, with its poles swapped. Poles do not travel along a magnet (D).',
    },
    {
      id: 'q10_magnetic_north_pole',
      type: 'mcq',
      title: '10. A compass points towards "magnetic north", in northern Canada. What kind of magnetic pole lies under magnetic north?',
      options: [
        { val: 'A', text: 'A. An N pole, because it is in the north' },
        { val: 'B', text: 'B. An S pole, because the N end of the compass needle is attracted to it' },
        { val: 'C', text: 'C. No pole, because the Earth\'s field there is zero' },
        { val: 'D', text: 'D. An N pole, because like poles attract' },
      ],
      correct: 'B',
      expEn: 'The N end of the needle is attracted towards magnetic north, and an N pole is attracted only by an S pole. So the pole there is a magnetic S pole. Naming it after the place (A) gets it backwards; like poles REPEL (D); and the field near the poles is strong, not zero (C).',
    },
  ],
};
