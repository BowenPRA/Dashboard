// src/data/ADD_MATH/AM_7A/notes.js
// AM_7A — The Equation of a Circle.
// Cambridge IGCSE Additional Mathematics 0606, section 7.1 (first half).
//
// Twenty-two slides, one idea each, following the beats of the section in
// docs/add-math-7-1-circles.md: what a circle is, where its equation comes
// from, reading it, writing it, the general form and completing the square,
// and what a circle does at an axis. Nineteen scored items (thirteen checks,
// six activities) carry the NOTES score.
//
// THE SPINE:
//   1–4    ask before you tell — which points are 5 from the origin? Then the
//          definition, and Pythagoras at the origin.
//   5–7    move the centre: completed square form, reading it (the signs
//          flip), and the radius is a square ROOT.
//   8–11   writing the equation: from a centre and a radius, a centre and a
//          point, and the two ends of a diameter.
//   12–18  the general form: expanding, recognising a circle, completing the
//          square, the method in order, and its two traps (divide first; not
//          always a circle).
//   19–21  the axes: touching one, the three cases, and a finished sketch.
//   22     the recap.
//
// House notes:
//  · ENGLISH ONLY — ADD_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Every example here is fresh: none is a book question, and none is an
//    item from the three Circle Lab tasks.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0e7490';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const AMBER = '#d97706';
const PURPLE = '#a855f7';
const RED = '#ef4444';

export const notes = [
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CircleDot',
    brand: 'Additional Mathematics',
    eyebrow: 'Chapter 7 · Coordinate geometry of the circle · 7.1',
    title: 'The Equation of a Circle',
    objective: 'I can read the centre and radius off the equation of a circle and plot it, write the equation from a centre, a point or a diameter, and complete the square to find the centre and radius from the general form.',
  },

  // ── 2 · ask before you tell ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you turn the page',
    title: 'Five Units From the Origin',
    content: 'A point is exactly $5$ units from the origin. Where could it be?\n\nThe point $(5, 0)$ is an easy one: straight along the $x$-axis. But what about $(3, 4)$? Use Pythagoras: $3$ across and $4$ up.',
    activity: {
      id: 'act_predict_five',
      type: 'predict',
      prompt: 'Which of these is true about the points that are exactly 5 units from the origin?',
      options: [
        { val: 'one', name: 'Only $(5, 0)$ and $(0, 5)$ — the points on the axes' },
        { val: 'four', name: 'Exactly four points: $(5, 0)$, $(-5, 0)$, $(0, 5)$ and $(0, -5)$' },
        { val: 'ring', name: '$(5, 0)$, $(3, 4)$ and endlessly many more — they make a circle' },
        { val: 'square', name: 'Every point with $x = 5$ or $y = 5$ — they make a square' },
      ],
      correct: 'ring',
      explain: 'The point $(3, 4)$ is $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ from the origin, so it counts too. So do $(4, 3)$, $(-3, 4)$, $(0, -5)$ and every point in between. Put them all together and you get a circle, centre the origin, radius $5$.',
    },
  },

  // ── 3 · the definition ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Circle',
    eyebrow: 'What a circle is',
    title: 'Every Point the Same Distance Away',
    inlineSvg: DIAGRAMS.LOCUS,
    drawThis: true,
    caption: 'A **circle** is the set of all points that are a fixed distance from a fixed point. The fixed point is the **centre**. The fixed distance is the **radius**. A set of points that obey a rule is called a **locus**.',
    check: {
      id: 'chk_on_circle',
      q: 'Which point lies on the circle with centre $(0, 0)$ and radius $10$?',
      options: [
        { val: 'A', text: '$(10, 10)$' },
        { val: 'B', text: '$(5, 5)$' },
        { val: 'C', text: '$(6, 8)$' },
        { val: 'D', text: '$(7, 7)$' },
      ],
      correct: 'C',
      expEn: 'A point is on the circle when it is exactly $10$ from the centre. $(6, 8)$: $\\sqrt{36 + 64} = \\sqrt{100} = 10$. For $(10, 10)$ the distance is $\\sqrt{200}$, for $(5, 5)$ it is $\\sqrt{50}$, and for $(7, 7)$ it is $\\sqrt{98}$ — close, but not $10$.',
    },
  },

  // ── 4 · Pythagoras at the origin ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Triangle',
    eyebrow: 'Where the equation comes from',
    title: 'A Circle Is Pythagoras, Over and Over',
    inlineSvg: DIAGRAMS.ORIGIN_TRIANGLE,
    drawThis: true,
    caption: 'Take any point $P(x, y)$ on a circle whose centre is the origin. Drop a right-angled triangle under it: $x$ across, $y$ up, and the radius $r$ as the longest side. Pythagoras gives $x^2 + y^2 = r^2$. That one equation is true for **every** point on the circle, so it is the equation of the circle.',
    notes: [
      { tone: 'write', text: 'Centre the origin, radius $r$: $x^2 + y^2 = r^2$.' },
    ],
  },

  // ── 5 · move the centre ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Move',
    eyebrow: 'Now move the centre',
    title: 'The Same Triangle From a New Centre',
    inlineSvg: DIAGRAMS.SHIFTED_TRIANGLE,
    drawThis: true,
    caption: 'Move the centre to $C(a, b)$. The triangle is the same, but its sides are now **differences**: $x - a$ across and $y - b$ up. Pythagoras gives $(x - a)^2 + (y - b)^2 = r^2$. This is called **completed square form**.',
    activity: {
      id: 'act_click_centre',
      type: 'line',
      prompt: 'The circle is $(x - 4)^2 + (y + 2)^2 = 9$. Click its centre.',
      grid: { xMin: -6, xMax: 8, yMin: -6, yMax: 4 },
      points: { C: [4, -2] },
      step: { kind: 'plot', points: ['C'], say: 'Click the centre of the circle.' },
      circle: { centre: [4, -2], r2: 9 },
      explain: 'The centre is where both brackets are zero. $x - 4 = 0$ gives $x = 4$, and $y + 2 = 0$ gives $y = -2$. So the centre is $(4, -2)$ — not $(-4, 2)$. The radius is $\\sqrt{9} = 3$.',
    },
  },

  // ── 6 · reading it ──────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Reading the equation',
    title: 'The Signs Flip',
    inlineSvg: DIAGRAMS.ANATOMY,
    caption: 'Do not copy the signs out of the brackets. Ask of each bracket: **what value makes it zero?** $(x - 3)$ is zero when $x = 3$. $(y + 2)$ is zero when $y = -2$. So a minus sign gives a positive coordinate, and a plus sign gives a negative one.',
    notes: [
      { tone: 'write', text: '$(x - a)^2 + (y - b)^2 = r^2$ has centre $(a, b)$ and radius $r$.' },
    ],
    check: {
      id: 'chk_centre_signs',
      q: 'What is the centre of $(x + 5)^2 + (y - 1)^2 = 16$?',
      options: [
        { val: 'A', text: '$(5, -1)$' },
        { val: 'B', text: '$(-5, 1)$' },
        { val: 'C', text: '$(5, 1)$' },
        { val: 'D', text: '$(-5, -1)$' },
      ],
      correct: 'B',
      expEn: '$x + 5 = 0$ gives $x = -5$, and $y - 1 = 0$ gives $y = 1$. The centre is $(-5, 1)$. A copies both signs straight off the page; C and D flip only one of them.',
    },
  },

  // ── 7 · the radius is a root ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The mistake that costs the most marks',
    title: 'The Right-Hand Side Is r Squared',
    content: 'The number on the right is $r^2$, not $r$. To get the radius, take the **square root**.\n\n$$(x - 2)^2 + (y - 7)^2 = 12 \\quad\\Rightarrow\\quad r = \\sqrt{12} = 2\\sqrt{3}$$\n\nThe radius does not have to be a whole number. When it is not, leave it as a **surd in simplest form**: it is exact, and a decimal is not.',
    notes: [
      { tone: 'write', text: 'To simplify a surd, take out a square factor: $\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$.' },
    ],
    check: {
      id: 'chk_surd_radius',
      q: 'What is the radius of $(x + 1)^2 + (y - 6)^2 = 50$?',
      options: [
        { val: 'A', text: '$50$' },
        { val: 'B', text: '$25$' },
        { val: 'C', text: '$2\\sqrt{5}$' },
        { val: 'D', text: '$5\\sqrt{2}$' },
      ],
      correct: 'D',
      expEn: '$r = \\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$. A gives $r^2$ instead of $r$; B halves it, but squaring is undone by a square root, not by halving; C takes the wrong square factor out.',
    },
  },

  // ── 8 · write it: centre and radius ─────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Writing the equation · 1',
    title: 'From a Centre and a Radius',
    content: 'Write the equation of the circle with centre $(-2, 7)$ and radius $5$. Now the question runs the other way: you build the equation.',
    steps: [
      { text: 'Start from the pattern: $(x - a)^2 + (y - b)^2 = r^2$.' },
      { text: 'Put in the centre. $a = -2$, so the first bracket is $(x - (-2))$, which is $(x + 2)$. $b = 7$, so the second is $(y - 7)$.' },
      { text: 'Square the radius: $5^2 = 25$.' },
      { text: 'So the equation is $(x + 2)^2 + (y - 7)^2 = 25$.' },
    ],
    notes: [
      { tone: 'write', text: 'A **negative** coordinate gives a **plus** in the bracket. The right-hand side is the radius **squared**.' },
    ],
    check: {
      id: 'chk_write_surd',
      q: 'Which is the equation of the circle with centre $(4, -3)$ and radius $3\\sqrt{2}$?',
      options: [
        { val: 'A', text: '$(x - 4)^2 + (y + 3)^2 = 18$' },
        { val: 'B', text: '$(x + 4)^2 + (y - 3)^2 = 18$' },
        { val: 'C', text: '$(x - 4)^2 + (y + 3)^2 = 6$' },
        { val: 'D', text: '$(x - 4)^2 + (y + 3)^2 = 3\\sqrt{2}$' },
      ],
      correct: 'A',
      expEn: 'The brackets are $(x - 4)$ and $(y + 3)$, and $r^2 = (3\\sqrt{2})^2 = 9 \\times 2 = 18$. B has both signs the wrong way round; C squares only the $\\sqrt{2}$ and then multiplies by $3$; D puts $r$ on the right instead of $r^2$.',
    },
  },

  // ── 9 · write it: centre and a point ────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Writing the equation · 2',
    title: 'From a Centre and One Point',
    content: 'A circle has centre $(1, -2)$ and passes through $(4, 2)$. The radius is not given, but it is the distance between those two points.',
    steps: [
      { text: 'Find the two differences. In $x$: $4 - 1 = 3$. In $y$: $2 - (-2) = 4$.' },
      { text: 'Pythagoras: $r^2 = 3^2 + 4^2 = 25$.' },
      { text: 'Stop there. You need $r^2$ for the equation, so there is no need to take the square root.' },
      { text: 'The equation is $(x - 1)^2 + (y + 2)^2 = 25$.' },
    ],
    notes: [
      { tone: 'plant', text: 'A difference may be negative. Its square never is: $(-3)^2 = 9$.' },
    ],
    check: {
      id: 'chk_through_point',
      q: 'A circle has centre $(2, 1)$ and passes through $(5, 5)$. What is its equation?',
      options: [
        { val: 'A', text: '$(x - 2)^2 + (y - 1)^2 = 5$' },
        { val: 'B', text: '$(x - 5)^2 + (y - 5)^2 = 25$' },
        { val: 'C', text: '$(x - 2)^2 + (y - 1)^2 = 25$' },
        { val: 'D', text: '$(x - 2)^2 + (y - 1)^2 = 7$' },
      ],
      correct: 'C',
      expEn: 'The differences are $3$ and $4$, so $r^2 = 9 + 16 = 25$, and the centre $(2, 1)$ goes in the brackets. A puts $r$ on the right; B uses the point on the circle as the centre; D adds the differences instead of squaring them.',
    },
  },

  // ── 10 · diameter: the idea, touched ────────────────────────────────────
  {
    layout: 'showcase',
    accent: AMBER,
    icon: 'Ruler',
    eyebrow: 'Writing the equation · 3',
    title: 'From the Two Ends of a Diameter',
    inlineSvg: DIAGRAMS.DIAMETER,
    caption: 'A **diameter** goes through the centre, so the centre is its **midpoint**. The radius is the distance from the centre to either end. Two steps, then the equation.',
    activity: {
      id: 'act_click_midpoint',
      type: 'line',
      prompt: '$AB$ is a diameter of a circle. Click the centre of the circle.',
      grid: { xMin: -7, xMax: 5, yMin: -4, yMax: 8 },
      points: { A: [-4, -2], B: [2, 6] },
      show: ['A', 'B'],
      step: { kind: 'midpoint', of: ['A', 'B'], name: 'C', say: 'Click the centre of the circle.' },
      circle: { centre: [-1, 2], r2: 25 },
      explain: 'The centre is the midpoint of $AB$: halfway between $-4$ and $2$ is $-1$, and halfway between $-2$ and $6$ is $2$. So $C$ is $(-1, 2)$.',
    },
  },

  // ── 11 · diameter: worked ───────────────────────────────────────────────
  {
    layout: 'steps',
    accent: AMBER,
    icon: 'PenLine',
    eyebrow: 'Writing the equation · 3, worked',
    title: 'Midpoint, Then Distance, Then Write',
    content: 'Find the equation of the circle with diameter $AB$, where $A$ is $(-4, -2)$ and $B$ is $(2, 6)$.',
    steps: [
      { text: '**Centre.** The midpoint of $AB$: $\\left(\\dfrac{-4 + 2}{2}, \\dfrac{-2 + 6}{2}\\right) = (-1, 2)$.' },
      { text: '**Radius squared.** From the centre $(-1, 2)$ to $B(2, 6)$: the differences are $3$ and $4$, so $r^2 = 9 + 16 = 25$.' },
      { text: '**Equation.** $(x + 1)^2 + (y - 2)^2 = 25$.' },
      { text: '**Check.** Put $A$ in: $(-4 + 1)^2 + (-2 - 2)^2 = 9 + 16 = 25$. It works.' },
    ],
    notes: [
      { tone: 'write', text: 'Diameter given: centre $=$ **midpoint**, radius $=$ centre to **one end**.' },
    ],
    check: {
      id: 'chk_diameter_radius',
      q: 'The diameter $AB$ of a circle has length $10$. What goes on the right-hand side of its equation?',
      options: [
        { val: 'A', text: '$100$' },
        { val: 'B', text: '$10$' },
        { val: 'C', text: '$5$' },
        { val: 'D', text: '$25$' },
      ],
      correct: 'D',
      expEn: 'The radius is half the diameter, $5$, and the right-hand side is $r^2 = 25$. A squares the diameter instead of the radius; B and C forget to square.',
    },
  },

  // ── 12 · the two forms ──────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ArrowUpDown',
    eyebrow: 'The same circle, written two ways',
    title: 'Completed Square Form and General Form',
    inlineSvg: DIAGRAMS.FORMS,
    caption: 'Multiply out the brackets of $(x - 3)^2 + (y + 2)^2 = 25$ and collect everything on the left: $x^2 + y^2 - 6x + 4y - 12 = 0$. This is the **general form**. It is the same circle, but the centre and the radius are now hidden. To get them back you **complete the square**.',
    notes: [
      { tone: 'plant', text: 'The general form is often written $x^2 + y^2 + 2gx + 2fy + c = 0$. Then the centre is $(-g, -f)$ and the radius is $\\sqrt{g^2 + f^2 - c}$.' },
    ],
  },

  // ── 13 · is it a circle? ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'ShieldCheck',
    eyebrow: 'Recognising a circle',
    title: 'Two Things to Look For',
    label: 'Try it',
    labelIcon: 'Hourglass',
    text: 'In the equation of a circle, $x^2$ and $y^2$ have the same coefficient, and there is no $xy$ term.',
    sub: 'One more thing: the right-hand side of the completed square form must be positive, because it is a radius squared.',
    activity: {
      id: 'act_sort_circle',
      type: 'sort',
      prompt: 'Sort the seven equations. Is each one a circle?',
      bins: [
        { id: 'yes', name: 'A circle' },
        { id: 'no', name: 'Not a circle' },
      ],
      cards: [
        { id: 'c1', name: '$x^2 + y^2 = 9$', bin: 'yes' },
        { id: 'c2', name: '$x^2 + y^2 - 6x = 0$', bin: 'yes' },
        { id: 'c3', name: '$3x^2 + 3y^2 = 12$', bin: 'yes' },
        { id: 'c4', name: '$x^2 + 2y^2 = 9$', bin: 'no' },
        { id: 'c5', name: '$x^2 - y^2 = 4$', bin: 'no' },
        { id: 'c6', name: '$x^2 + y^2 + xy = 4$', bin: 'no' },
        { id: 'c7', name: '$(x - 1)^2 + (y + 2)^2 = -4$', bin: 'no' },
      ],
      explain: '$3x^2 + 3y^2 = 12$ is a circle: both coefficients are $3$, and dividing by $3$ gives $x^2 + y^2 = 4$. In $x^2 + 2y^2 = 9$ and $x^2 - y^2 = 4$ the coefficients are different. $x^2 + y^2 + xy = 4$ has an $xy$ term. And $(x - 1)^2 + (y + 2)^2 = -4$ looks right, but two squares can never add up to a negative number.',
    },
  },

  // ── 14 · completing the square, one term ────────────────────────────────
  {
    layout: 'steps',
    accent: BLUE,
    icon: 'Square',
    eyebrow: 'The tool you need',
    title: 'Completing the Square',
    content: 'Rewrite $x^2 - 6x$ as a squared bracket. Three moves, always the same.',
    steps: [
      { text: '**Halve** the coefficient of $x$. Half of $-6$ is $-3$. That goes in the bracket: $(x - 3)^2$.' },
      { text: '**Multiply it out to see what you made.** $(x - 3)^2 = x^2 - 6x + 9$. That is $9$ too many.' },
      { text: '**Take the extra away.** So $x^2 - 6x = (x - 3)^2 - 9$.' },
      { text: 'The number you take away is always the **square of the half**, and it is always subtracted.' },
    ],
    notes: [
      { tone: 'write', text: '$x^2 + dx = \\left(x + \\dfrac{d}{2}\\right)^2 - \\left(\\dfrac{d}{2}\\right)^2$' },
    ],
    check: {
      id: 'chk_complete_square',
      q: 'Which is the same as $x^2 + 10x$?',
      options: [
        { val: 'A', text: '$(x + 5)^2 - 25$' },
        { val: 'B', text: '$(x + 10)^2 - 100$' },
        { val: 'C', text: '$(x + 5)^2 + 25$' },
        { val: 'D', text: '$(x - 5)^2 - 25$' },
      ],
      correct: 'A',
      expEn: 'Half of $10$ is $5$, so the bracket is $(x + 5)^2$, and you take away $5^2 = 25$. B forgets to halve; C adds the square instead of subtracting it; D changes the sign of the half.',
    },
  },

  // ── 15 · worked example ─────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'General form to centre and radius',
    title: 'Complete the Square Twice',
    content: 'Find the centre and the radius of $x^2 + y^2 - 6x + 4y - 12 = 0$.',
    steps: [
      { text: '**Group.** Put the $x$ terms together and the $y$ terms together: $(x^2 - 6x) + (y^2 + 4y) - 12 = 0$.' },
      { text: '**Complete each square.** $x^2 - 6x = (x - 3)^2 - 9$, and $y^2 + 4y = (y + 2)^2 - 4$.' },
      { text: '**Put them back.** $(x - 3)^2 - 9 + (y + 2)^2 - 4 - 12 = 0$.' },
      { text: '**Move the numbers to the right.** $(x - 3)^2 + (y + 2)^2 = 9 + 4 + 12 = 25$.' },
      { text: '**Read it off.** Centre $(3, -2)$, radius $\\sqrt{25} = 5$.' },
    ],
    check: {
      id: 'chk_general_form',
      q: 'What are the centre and radius of $x^2 + y^2 + 2x - 8y + 8 = 0$?',
      options: [
        { val: 'A', text: 'Centre $(1, -4)$, radius $3$' },
        { val: 'B', text: 'Centre $(-1, 4)$, radius $9$' },
        { val: 'C', text: 'Centre $(-1, 4)$, radius $3$' },
        { val: 'D', text: 'Centre $(-2, 8)$, radius $\\sqrt{8}$' },
      ],
      correct: 'C',
      expEn: '$(x + 1)^2 - 1 + (y - 4)^2 - 16 + 8 = 0$, so $(x + 1)^2 + (y - 4)^2 = 9$: centre $(-1, 4)$, radius $3$. A copies the signs out of the brackets; B gives $r^2$ instead of $r$; D forgets to halve the coefficients.',
    },
  },

  // ── 16 · the method in order ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'The whole method on one card',
    title: 'General Form, Start to Finish',
    content: 'Every question of this kind is the same five moves. Put them in the order you would do them.',
    notes: [
      { tone: 'homework', text: 'An exam question often says "show that the equation can be written as $(x - a)^2 + (y - b)^2 = r^2$". That is this method. Show every line.' },
    ],
    activity: {
      id: 'act_order_method',
      type: 'order',
      prompt: 'Put the five moves in order.',
      steps: [
        { id: 'm1', name: 'Divide through, so that x² and y² each have a coefficient of 1' },
        { id: 'm2', name: 'Group the x terms together and the y terms together' },
        { id: 'm3', name: 'Complete the square in x and in y: halve, then subtract the square' },
        { id: 'm4', name: 'Move all the numbers to the right-hand side' },
        { id: 'm5', name: 'Read off the centre (signs flip) and the radius (square root)' },
      ],
      explain: 'Divide, group, complete, move, read. You cannot complete the square until the coefficients are 1, and you cannot read the centre until the numbers are on the right.',
    },
  },

  // ── 17 · trap: divide first ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: AMBER,
    icon: 'Divide',
    eyebrow: 'Trap 1',
    title: 'Divide First',
    content: 'Completing the square only works when $x^2$ and $y^2$ have a coefficient of $1$. If they do not, divide **every** term first.\n\n$$2x^2 + 2y^2 + 4x - 20y + 2 = 0 \\quad\\Rightarrow\\quad x^2 + y^2 + 2x - 10y + 1 = 0$$\n\nNow carry on as before: $(x + 1)^2 + (y - 5)^2 = 25$, so the centre is $(-1, 5)$ and the radius is $5$.',
    check: {
      id: 'chk_divide_first',
      q: 'What is the radius of $4x^2 + 4y^2 = 36$?',
      options: [
        { val: 'A', text: '$6$' },
        { val: 'B', text: '$3$' },
        { val: 'C', text: '$9$' },
        { val: 'D', text: '$36$' },
      ],
      correct: 'B',
      expEn: 'Divide by $4$ first: $x^2 + y^2 = 9$, so $r = \\sqrt{9} = 3$. A takes the square root of $36$ without dividing; C stops at $r^2$; D reads the right-hand side as it stands.',
    },
  },

  // ── 18 · trap: not always a circle ──────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Trap 2',
    title: 'It Is Not Always a Circle',
    content: 'Complete the square in $x^2 + y^2 + 4x - 6y + 15 = 0$ and you get\n\n$$(x + 2)^2 + (y - 3)^2 = -2$$\n\nThe left-hand side is two squares added together, so it can never be negative. **No point** satisfies this equation. It looks like a circle, but it is not one.\n\nIf the right-hand side comes out as $0$, exactly one point fits: the "centre" itself. That is not a circle either.',
    check: {
      id: 'chk_not_circle',
      q: 'Completing the square in an equation gives $(x - 1)^2 + (y + 4)^2 = 0$. What does the equation describe?',
      options: [
        { val: 'A', text: 'A circle with centre $(1, -4)$ and radius $0$' },
        { val: 'B', text: 'Nothing at all: no point satisfies it' },
        { val: 'C', text: 'A circle with centre $(-1, 4)$' },
        { val: 'D', text: 'The single point $(1, -4)$' },
      ],
      correct: 'D',
      expEn: 'Two squares add up to $0$ only when both are $0$, which happens at $(1, -4)$ and nowhere else. It is one point, not a circle. B would be right if the right-hand side were negative.',
    },
  },

  // ── 19 · touching an axis ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Circles and the axes · 1',
    title: 'Touching an Axis',
    inlineSvg: DIAGRAMS.TOUCH_AXIS,
    drawThis: true,
    caption: 'A circle **touches** an axis when the axis is a **tangent** to it: they meet at exactly one point. Then the radius is the distance from the centre to that axis. For the $x$-axis that is the size of the centre\'s $y$-coordinate. For the $y$-axis it is the size of its $x$-coordinate.',
    check: {
      id: 'chk_touch_axis',
      q: 'A circle has centre $(6, -2)$ and touches the $y$-axis. What is its radius?',
      options: [
        { val: 'A', text: '$6$' },
        { val: 'B', text: '$2$' },
        { val: 'C', text: '$-2$' },
        { val: 'D', text: '$\\sqrt{40}$' },
      ],
      correct: 'A',
      expEn: 'The distance from the centre to the $y$-axis is how far across it is: $6$. B is the distance to the $x$-axis; C is a coordinate, and a radius is never negative; D is the distance to the origin.',
    },
  },

  // ── 20 · the three cases, tapped ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Circles and the axes · 2',
    title: 'Crosses, Touches or Misses',
    inlineSvg: DIAGRAMS.AXES_THREE,
    caption: 'Compare two numbers: the radius $r$, and the distance $d$ from the centre to the axis. If the centre is **nearer** than the radius, the circle crosses the axis twice. If it is **exactly** the radius away, it touches. If it is **further**, it misses.',
    activity: {
      id: 'act_hotspot_touch',
      type: 'hotspot',
      prompt: 'Tap the circle whose centre is exactly one radius from the line.',
      svg: DIAGRAMS.AXES_THREE,
      viewBox: '0 0 640 300',
      targets: [
        { id: 'cross', x: 110, y: 180, r: 62, name: 'the circle that crosses twice' },
        { id: 'touch', x: 320, y: 150, r: 62, name: 'the circle that touches' },
        { id: 'miss', x: 530, y: 118, r: 62, name: 'the circle that misses' },
      ],
      correct: 'touch',
      explain: 'The middle circle just touches the line, so its centre is exactly one radius away. The left one dips below the line, so its centre is nearer than a radius. The right one does not reach the line at all.',
    },
  },

  // ── 21 · a finished sketch ──────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'LineChart',
    eyebrow: 'Circles and the axes · 3',
    title: 'Sketching a Circle',
    inlineSvg: DIAGRAMS.SKETCH,
    drawThis: true,
    caption: 'To sketch $(x - 3)^2 + (y + 2)^2 = 9$: mark the centre $(3, -2)$ and use the radius $3$. It touches the $y$-axis at $(0, -2)$. For the $x$-axis, put $y = 0$: $(x - 3)^2 + 4 = 9$, so $(x - 3)^2 = 5$ and $x = 3 \\pm \\sqrt{5}$. Label those points exactly.',
    check: {
      id: 'chk_axis_crossing',
      q: 'Where does $(x - 1)^2 + (y - 2)^2 = 13$ cross the $x$-axis?',
      options: [
        { val: 'A', text: '$x = 1 \\pm \\sqrt{13}$' },
        { val: 'B', text: '$x = -2$ and $x = 4$' },
        { val: 'C', text: '$x = 1 \\pm 2$' },
        { val: 'D', text: 'It does not cross the $x$-axis' },
      ],
      correct: 'B',
      expEn: 'Put $y = 0$: $(x - 1)^2 + 4 = 13$, so $(x - 1)^2 = 9$ and $x - 1 = \\pm 3$. That gives $x = -2$ and $x = 4$. A forgets the $4$ that comes from $(0 - 2)^2$; C uses the centre\'s $y$-coordinate as the distance; D would be true only if the radius were less than $2$.',
    },
  },

  // ── 22 · recap ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    variant: 'checklist',
    columns: 2,
    eyebrow: 'Tick each one only if you could do it right now, unaided',
    title: 'What You Should Be Able to Do',
    items: [
      { text: 'Say what a circle is: every point a fixed distance from a fixed point.' },
      { text: 'Read the centre off the brackets by asking what makes each one zero.' },
      { text: 'Find the radius as the square root of the right-hand side, as a simplified surd if needed.' },
      { text: 'Write the equation from a centre and a radius, squaring the radius.' },
      { text: 'Find $r^2$ from a centre and a point, using the two differences.' },
      { text: 'Use the midpoint of a diameter as the centre.' },
      { text: 'Complete the square in $x$ and in $y$ to turn the general form into completed square form.' },
      { text: 'Divide through first when $x^2$ and $y^2$ have a coefficient that is not $1$.' },
      { text: 'Spot an equation that is not a circle: the right-hand side is zero or negative.' },
      { text: 'Decide whether a circle crosses, touches or misses an axis, and find the exact points.' },
    ],
    check: {
      id: 'chk_recap',
      q: 'A circle has centre $(-2, 5)$ and touches the $x$-axis. What is its equation?',
      options: [
        { val: 'A', text: '$(x - 2)^2 + (y + 5)^2 = 25$' },
        { val: 'B', text: '$(x + 2)^2 + (y - 5)^2 = 5$' },
        { val: 'C', text: '$(x + 2)^2 + (y - 5)^2 = 25$' },
        { val: 'D', text: '$(x + 2)^2 + (y - 5)^2 = 4$' },
      ],
      correct: 'C',
      expEn: 'Touching the $x$-axis means the radius is the height of the centre, $5$, so $r^2 = 25$. The brackets are $(x + 2)$ and $(y - 5)$. A has both signs the wrong way round; B forgets to square the radius; D uses the distance to the $y$-axis.',
    },
  },
];
