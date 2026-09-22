// src/data/EXT_MATH/EM_07B/triangles.js
// "Triangle Solver" — Pythagoras and right-angled trigonometry, for EM_07B
// (src/tasks/TriangleSolver.jsx).
//
// Built from Wolsey Hall IGCSE Maths Extended Assignment 07:
//   Q11   two right-angled triangles sharing a side: trig, then Pythagoras
//   Q12b  "show that the height is a√3" — sin 60° exactly
//   Q13   an angle from two sides (cos), then the bearing it gives
//   Q14b  the acute angle a line makes with the x-axis — tan, rise over run
//   Q15   Pythagoras, answer left in exact form
// The deck's worked example is what the student meets first; these items
// rebuild the method one idea at a time, with fresh numbers. The
// assignment's own triangles are the homework.
//
// A triangle is { right, legs } — the right-angle corner, and the compass
// direction each other corner lies in from it (north is up). utils/triangles.js
// derives every side, angle, label, ratio and answer from that.
//
// ORDER (one new idea per item):
//   1  Pythagoras: find the hypotenuse — add the squares
//   2  Pythagoras: find a shorter side — subtract (the triangle turned round)
//   3  Q15: Pythagoras in exact form — simplify the surd
//   4  SOH: the unknown on top — multiply
//   5  CAH: a different corner, so different labels
//   6  the unknown on the BOTTOM — divide (the trap)
//   7  Q14b: an angle from rise and run — the inverse
//   8  Q13: an angle by cos, then the bearing
//   9  Q12b: sin 60° exactly — a surd answer
//   10 Q11: two triangles — the side one finds, the other uses
export const triangles = {
  title: 'Triangle Solver',
  intro: 'Find the right angle first — the side opposite it is the hypotenuse. Round only at the very end.',
  items: [
    {
      id: 't_hyp',
      kind: 'pythag',
      tri: { right: 'C', legs: { A: 'E', B: 'N' } },
      given: { AC: 12, BC: 9 },
      find: 'AB',
      unit: 'cm',
    },
    {
      id: 't_leg',
      kind: 'pythag',
      tri: { right: 'Q', legs: { P: 'W', R: 'S' } },
      given: { PR: 17, PQ: 8 },
      find: 'QR',
      unit: 'm',
    },
    {
      id: 't_exact',
      kind: 'pythag',
      tri: { right: 'L', legs: { K: 'N', M: 'E' } },
      given: { KM: 9, KL: 3 },
      find: 'LM',
      unit: 'cm',
      exact: true,
      prompt: 'Find the length of $LM$. Leave your answer in exact form.',
    },
    {
      id: 't_sin',
      kind: 'side',
      tri: { right: 'C', legs: { A: 'W', B: 'N' } },
      angle: { at: 'A', deg: 38 },
      given: { AB: 12 },
      find: 'BC',
      unit: 'cm',
    },
    {
      id: 't_cos',
      kind: 'side',
      tri: { right: 'F', legs: { D: 'N', E: 'E' } },
      angle: { at: 'E', deg: 52 },
      given: { DE: 14 },
      find: 'EF',
      unit: 'cm',
    },
    {
      id: 't_bottom',
      kind: 'side',
      tri: { right: 'H', legs: { G: 'E', J: 'S' } },
      angle: { at: 'G', deg: 34 },
      given: { HJ: 7 },
      find: 'GJ',
      unit: 'm',
      note: 'Watch where the unknown lands in the fraction.',
    },
    {
      id: 't_line',
      kind: 'angle',
      tri: { right: 'B', legs: { A: 'W', C: 'N' } },
      given: { AB: 4, BC: 6 },
      find: { angle: 'A' },
      prompt: 'A straight line rises 6 units for every 4 units across. Find the acute angle it makes with the $x$-axis — the angle at $A$.',
    },
    {
      id: 't_bearing',
      kind: 'angle',
      tri: { right: 'Z', legs: { X: 'N', Y: 'E' } },
      given: { XZ: 15, XY: 26 },
      find: { angle: 'X' },
      unit: 'km',
      bearing: { from: 'X', to: 'Y' },
      prompt: 'A boat sails from $X$ to $Y$. $Z$ is due south of $X$, and $Y$ is due east of $Z$. $XZ = 15$ km and $XY = 26$ km. Find angle $YXZ$, then the bearing of $Y$ from $X$.',
    },
    {
      id: 't_exact60',
      kind: 'side',
      tri: { right: 'N', legs: { M: 'W', K: 'N' } },
      angle: { at: 'M', deg: 60 },
      given: { KM: 10 },
      find: 'KN',
      unit: 'cm',
      exact: true,
      labels: { KN: 'h' },
      prompt: 'A parallelogram leans at $60^\\circ$, and its sloping side is $10$ cm. Show that its height $h$ is $a\\sqrt{3}$ cm, where $a$ is an integer.',
    },
    {
      id: 't_two',
      kind: 'chain',
      unit: 'm',
      prompt: 'The diagram shows two right-angled triangles, $ABD$ and $BDC$. $AD = 6$ m, $DC = 11$ m and angle $BAD = 48^\\circ$. Calculate the length of $BC$.',
      parts: [
        { kind: 'side', tri: { right: 'D', legs: { A: 'W', B: 'N' } }, angle: { at: 'A', deg: 48 }, given: { AD: 6 }, find: 'BD' },
        { kind: 'pythag', tri: { right: 'D', legs: { B: 'N', C: 'E' } }, given: { BD: 'prev', DC: 11 }, find: 'BC' },
      ],
    },
  ],
};
