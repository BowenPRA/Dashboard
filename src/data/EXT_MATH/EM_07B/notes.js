// src/data/EXT_MATH/EM_07B/notes.js
// EM_07B — Bearings, Trigonometry & Scatter Graphs. IGCSE Mathematics
// (Extended), Wolsey Hall Oxford Assignment 07, Part B (the geometry and data
// questions; Part A, EM_07A, carries the bounds, inequalities and
// simultaneous equations).
//
// Written to the EM_06 exemplar (docs/ext-math-course.md): short sentences,
// one idea per slide, a diagram that carries the picture and a Write panel
// that carries the words to copy. Each part opens on a question to decide
// BEFORE the method is shown.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. NORTH, CLOCKWISE, FROM. Every bearing — measured, turned back, or
//    worked out of a triangle — is the same three words. The compass widget
//    on slide 4 turns them in front of the student.
//
// 2. LABEL FROM THE ANGLE. Opposite and adjacent are not places on the page;
//    they are relative to the marked angle. The hotspot on slide 10 turns the
//    triangle round, and the ratio widget swaps the labels in front of you.
//
// 3. THE UNKNOWN'S POSITION DECIDES THE OPERATION. x on top of the fraction:
//    multiply. x on the bottom: divide. That is the trap on slide 14.
//
// SPINE:
//   1        hero
//   2–6      Part 1 · scale and bearings: a scale as a ratio, bearings, the
//            compass, a bearing to find, the way back
//   7–19     Part 2 · triangles: Pythagoras, H/O/A, the ratio lab, SOH CAH
//            TOA, sides, the trap, angles, exact values, polygons, bearings,
//            the full calculator value
//   20–22    Part 3 · lines and data: angle with the axis, correlation,
//            reading a line of best fit
//   23       the checklist
//
// House notes:
//  · ENGLISH ONLY — EXT_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Every number is original: the assignment's own questions are the
//    homework and are not worked here. The tasks use a second set again.
import { DIAGRAMS } from './diagrams.js';
import { BearingCompass, RatioLab } from './widgets.jsx';

const PINK = '#be185d';
const TEAL = '#0f766e';
const ORANGE = '#c2410c';
const VIOLET = '#7c3aed';
const PURPLE = '#5c2483';
const RED = '#c8102e';
const GREEN = '#15803d';
const SKY = '#0369a1';

export const notes = [

  // ── 1 · hero ─────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PINK,
    icon: 'TriangleRight',
    brand: 'IGCSE Mathematics · Extended',
    eyebrow: 'Assignment 07 · Part B',
    title: 'Bearings, Trigonometry & Scatter Graphs',
    objective: 'I can use a map scale and bearings, find sides and angles in right-angled triangles, and describe and use a scatter diagram.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      text: 'Three parts, one idea at a time. You will **tap**, **sort** and **predict** your way through — **18 things are scored**. The first one is on the next slide.',
    },
  },

  // ════════════════════════════ PART 1 · SCALE AND BEARINGS ═════════════════

  // ── 2 · scale ─────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Map',
    eyebrow: 'Part 1 · Scale and bearings',
    title: 'A Scale as a Ratio',
    ratio: 50,
    inlineSvg: DIAGRAMS.SCALE_RATIO,
    content: 'A scale says how many times real life has been shrunk.\n\nBoth parts must be in the **same unit** before you write it as a ratio.',
    notes: [
      { tone: 'write', text: '**Scale 1 : n:** 1 cm on the map is $n$ cm on the ground.\n$1 \\text{ km} = 1000 \\text{ m} = 100\\,000 \\text{ cm}$' },
    ],
    check: {
      id: 'chk_scale',
      q: 'On a map, 1 cm represents 3 km. Write the scale in the form $1 : n$.',
      options: [
        { val: 'A', text: '$1 : 3000$' },
        { val: 'B', text: '$1 : 30\\,000$' },
        { val: 'C', text: '$1 : 300\\,000$' },
        { val: 'D', text: '$1 : 3$' },
      ],
      correct: 'C',
      expEn: '$3 \\text{ km} = 3000 \\text{ m} = 300\\,000 \\text{ cm}$. A stops at metres, so its two parts are in different units; D mixes centimetres with kilometres.',
    },
  },

  // ── 3 · bearings ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: SKY,
    icon: 'Compass',
    eyebrow: 'Key word',
    title: 'Bearings',
    ratio: 50,
    inlineSvg: DIAGRAMS.BEARING_DEF,
    content: 'A bearing gives a direction as an angle.\n\nYou always start at the point you are going **from**, facing **north**.',
    notes: [
      { tone: 'write', text: '**Bearing:** the angle measured **clockwise** from **north**. Always three figures: $065^\\circ$, not $65^\\circ$.' },
    ],
  },

  // ── 4 · the bearing compass (widget) ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: SKY,
    icon: 'Compass',
    eyebrow: 'Pick a place — say its bearing before you look',
    title: 'Turn From North',
    widget: BearingCompass,
    caption: 'Every bearing starts at the point you go **from**, facing **north**, and turns **clockwise**. Then press **The way back**: stand at the other end and do it again.',
  },

  // ── 5 · hotspot: find 120° ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Navigation',
    eyebrow: 'Tap it',
    title: 'Clockwise From North',
    label: 'Tap it',
    labelIcon: 'MousePointerClick',
    text: 'Face north. Turn **clockwise** — the way a clock\'s hands go.',
    sub: 'A quarter turn, 90°, brings you to east. A half turn, 180°, to south.',
    activity: {
      id: 'act_hotspot_bearing',
      type: 'hotspot',
      prompt: 'Tap the point that is on a bearing of $120^\\circ$ from $A$.',
      svg: DIAGRAMS.BEARING_PICK,
      viewBox: '0 0 600 420',
      targets: [
        { id: 'p060', x: 430, y: 140, r: 34, name: 'the point on a bearing of 060°' },
        { id: 'p120', x: 430, y: 290, r: 34, name: 'the point on a bearing of 120°' },
        { id: 'p240', x: 170, y: 290, r: 34, name: 'the point on 240° — that is turning anticlockwise' },
        { id: 'p300', x: 170, y: 140, r: 34, name: 'the point on a bearing of 300°' },
      ],
      correct: 'p120',
      explain: 'Face north and turn **clockwise**: 90° is due east, and 30° more is 120° — down and to the right. The point on 240° is what you reach turning the wrong way.',
    },
  },

  // ── 6 · back bearings ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: SKY,
    icon: 'ArrowLeftRight',
    eyebrow: 'Going back',
    title: 'The Way Back',
    ratio: 52,
    inlineSvg: DIAGRAMS.BACK_BEARING,
    content: 'To go back, face the **opposite** way.\n\nThe opposite direction is half a turn away.',
    notes: [
      { tone: 'write', text: '**Back bearing:** add $180^\\circ$ — or subtract $180^\\circ$ if the bearing is already more than $180^\\circ$.' },
    ],
    check: {
      id: 'chk_back_bearing',
      q: 'The bearing of $B$ from $A$ is $130^\\circ$. What is the bearing of $A$ from $B$?',
      options: [
        { val: 'A', text: '$050^\\circ$' },
        { val: 'B', text: '$230^\\circ$' },
        { val: 'C', text: '$130^\\circ$' },
        { val: 'D', text: '$310^\\circ$' },
      ],
      correct: 'D',
      expEn: '$130^\\circ + 180^\\circ = 310^\\circ$. $050^\\circ$ is $180^\\circ - 130^\\circ$, a different direction; $230^\\circ$ is $360^\\circ - 130^\\circ$.',
    },
  },

  // ════════════════════════════ PART 2 · RIGHT-ANGLED TRIANGLES ═════════════

  // ── 7 · predict: the ladder ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Part 2 · Right-angled triangles — decide first',
    title: 'How High Does It Reach?',
    ratio: 50,
    inlineSvg: DIAGRAMS.LADDER,
    content: 'A 5 m ladder leans against a wall.\n\nIts foot is 3 m from the wall.',
    activity: {
      id: 'act_predict_ladder',
      type: 'predict',
      prompt: 'How high up the wall does the ladder reach?',
      options: [
        { val: 'two', name: '2 m' },
        { val: 'four', name: '4 m' },
        { val: 'eight', name: '8 m' },
        { val: 'root', name: '5.8 m' },
      ],
      correct: 'four',
      explain: '$3^2 + h^2 = 5^2$, so $h^2 = 25 - 9 = 16$ and $h = 4$ m. The ladder is the longest side, so its square is the biggest — you **subtract**. 5.8 m adds the squares, which would make the wall taller than the ladder is long.',
    },
  },

  // ── 8 · Pythagoras ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'TriangleRight',
    eyebrow: 'Key word',
    title: 'Pythagoras and the Hypotenuse',
    ratio: 50,
    inlineSvg: DIAGRAMS.PYTHAG_SQUARES,
    content: 'The two small squares fill the big one.\n\nFinding the longest side: **add**. Finding a shorter side: **subtract**.',
    notes: [
      { tone: 'write', text: '**Hypotenuse:** the longest side, opposite the right angle.\n**Pythagoras:** $a^2 + b^2 = c^2$, where $c$ is the hypotenuse.' },
    ],
    check: {
      id: 'chk_pythag_exact',
      q: 'The two shorter sides of a right-angled triangle are 2 cm and 4 cm. Find the hypotenuse, exactly.',
      options: [
        { val: 'A', text: '$6$ cm' },
        { val: 'B', text: '$2\\sqrt{5}$ cm' },
        { val: 'C', text: '$\\sqrt{6}$ cm' },
        { val: 'D', text: '$4\\sqrt{5}$ cm' },
      ],
      correct: 'B',
      expEn: '$2^2 + 4^2 = 4 + 16 = 20$, and $\\sqrt{20} = \\sqrt{4} \\times \\sqrt{5} = 2\\sqrt{5}$ cm — exact, and simplified like a surd in Assignment 06. A adds the sides, not their squares; D forgets to take the root of 4.',
    },
  },

  // ── 9 · opposite and adjacent ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'Key words · from the angle',
    title: 'Opposite and Adjacent',
    ratio: 50,
    inlineSvg: DIAGRAMS.HOA,
    content: 'Stand at the marked angle.\n\nOne side runs away from you across the triangle. One side touches you — and is not the hypotenuse.',
    notes: [
      { tone: 'write', text: '**Opposite:** the side across from the angle.\n**Adjacent:** the side next to the angle that is not the hypotenuse.\nLabel the hypotenuse first, then the other two.' },
    ],
  },

  // ── 10 · hotspot: the adjacent side, turned round ─────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Tap it',
    title: 'Turned Round',
    label: 'Tap it',
    labelIcon: 'MousePointerClick',
    text: 'The triangle has turned. The names still come from the **angle**.',
    sub: 'Find the right angle, then the hypotenuse across from it. Then look at the marked angle.',
    activity: {
      id: 'act_hotspot_adjacent',
      type: 'hotspot',
      prompt: 'Tap the side that is ADJACENT to the marked angle $\\theta$.',
      svg: DIAGRAMS.HOA_PICK,
      viewBox: '0 0 600 400',
      targets: [
        { id: 'adj', x: 210, y: 195, r: 36, name: 'the side from θ to the right angle — adjacent' },
        { id: 'opp', x: 405, y: 180, r: 36, name: 'the side across from θ — opposite' },
        { id: 'hyp', x: 315, y: 285, r: 36, name: 'the side across from the right angle — the hypotenuse' },
      ],
      correct: 'adj',
      explain: 'The hypotenuse is across from the right angle — here it is the bottom side. Of the other two, the one that touches $\\theta$ is adjacent; the one across from $\\theta$ is opposite.',
    },
  },

  // ── 11 · the ratio lab (widget) ───────────────────────────────────────────
  {
    layout: 'showcase',
    accent: SKY,
    icon: 'Calculator',
    eyebrow: 'Change one thing at a time — predict first',
    title: 'Same Angle, Same Ratios',
    widget: RatioLab,
    caption: 'Change the **size**: do the three ratios move? Change the **angle**: do they now? Then mark the other angle and watch opposite and adjacent swap.',
  },

  // ── 12 · SOH CAH TOA ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: SKY,
    icon: 'Sigma',
    eyebrow: 'Three ratios · SOH CAH TOA',
    title: 'Choose the Ratio',
    label: 'Sort it',
    labelIcon: 'Sparkles',
    text: '$\\sin \\theta = \\dfrac{O}{H}$, $\\cos \\theta = \\dfrac{A}{H}$, $\\tan \\theta = \\dfrac{O}{A}$.',
    sub: 'Pick the ratio that uses the side you **know** and the side you **want**. The third side is not in it.',
    activity: {
      id: 'act_sort_ratio',
      type: 'sort',
      prompt: 'Which ratio does each question need?',
      bins: [
        { id: 'sin', name: 'sin — SOH' },
        { id: 'cos', name: 'cos — CAH' },
        { id: 'tan', name: 'tan — TOA' },
      ],
      cards: [
        { id: 'c1', name: 'know H, want O', bin: 'sin' },
        { id: 'c2', name: 'know O, want H', bin: 'sin' },
        { id: 'c3', name: 'know O and H, want the angle', bin: 'sin' },
        { id: 'c4', name: 'know H, want A', bin: 'cos' },
        { id: 'c5', name: 'know A and H, want the angle', bin: 'cos' },
        { id: 'c6', name: 'know A, want O', bin: 'tan' },
        { id: 'c7', name: 'know O, want A', bin: 'tan' },
        { id: 'c8', name: 'know O and A, want the angle', bin: 'tan' },
      ],
      explain: 'Each ratio holds exactly two sides: sin has O and H, cos has A and H, tan has O and A. Name the two sides in the question and the ratio follows.',
    },
  },

  // ── 13 · a side, unknown on top ───────────────────────────────────────────
  {
    layout: 'steps',
    accent: SKY,
    icon: 'PenLine',
    eyebrow: 'Worked example · a side',
    title: 'Finding a Side',
    inlineSvg: DIAGRAMS.SIDE_TOP,
    content: 'Find $x$. Give your answer to 3 significant figures.',
    steps: [
      { text: '**Label from $41^\\circ$:** 9 cm is the hypotenuse, $x$ is opposite.' },
      { text: '**Ratio:** opposite and hypotenuse — SOH. $\\sin 41^\\circ = \\dfrac{x}{9}$.' },
      { text: '**Rearrange:** $x$ is divided by 9, so multiply: $x = 9 \\times \\sin 41^\\circ$.' },
      { text: '**Calculate** in degrees: $x = 5.9045\\ldots = 5.90$ cm (3 s.f.).' },
    ],
    check: {
      id: 'chk_side_tan',
      q: 'An angle is $35^\\circ$. The side next to it (not the hypotenuse) is 7 cm, and $x$ is the side opposite it. Which calculation gives $x$?',
      options: [
        { val: 'A', text: '$7 \\times \\sin 35^\\circ$' },
        { val: 'B', text: '$7 \\div \\tan 35^\\circ$' },
        { val: 'C', text: '$7 \\times \\tan 35^\\circ$' },
        { val: 'D', text: '$\\tan 35^\\circ \\div 7$' },
      ],
      correct: 'C',
      expEn: 'Adjacent and opposite: TOA, $\\tan 35^\\circ = \\dfrac{x}{7}$. $x$ is on top, so multiply: $x = 7 \\tan 35^\\circ = 4.90$ cm. B divides, which is right only when $x$ is on the bottom; A uses sin, which needs the hypotenuse.',
    },
  },

  // ── 14 · the trap ─────────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    title: 'Where Is the Unknown?',
    content: 'Same angle, same ratio. The unknown moved — so the operation changed.',
    columns: [
      { heading: 'x on top: multiply', accent: GREEN, icon: 'CheckCircle2', inlineSvg: DIAGRAMS.TRAP_TOP },
      { heading: 'x on the bottom: divide', accent: RED, icon: 'AlertTriangle', inlineSvg: DIAGRAMS.TRAP_BOTTOM },
    ],
    check: {
      id: 'chk_trap_bottom',
      q: '$\\cos 50^\\circ = \\dfrac{8}{x}$. Find $x$.',
      options: [
        { val: 'A', text: '$x = 8 \\div \\cos 50^\\circ = 12.4$' },
        { val: 'B', text: '$x = 8 \\times \\cos 50^\\circ = 5.14$' },
        { val: 'C', text: '$x = \\cos 50^\\circ \\div 8 = 0.0803$' },
        { val: 'D', text: '$x = 8 \\div \\sin 50^\\circ = 10.4$' },
      ],
      correct: 'A',
      expEn: 'Multiply both sides by $x$: $x \\cos 50^\\circ = 8$. Then divide by $\\cos 50^\\circ$: $x = 12.4$. B multiplies as if $x$ were on top — and a hypotenuse can never be shorter than another side. D swaps cos for sin.',
    },
  },

  // ── 15 · an angle ─────────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: SKY,
    icon: 'Compass',
    eyebrow: 'Worked example · an angle',
    title: 'Finding an Angle',
    inlineSvg: DIAGRAMS.ANGLE_FIND,
    content: 'Find the angle $\\theta$. Give your answer to 1 decimal place.',
    steps: [
      { text: '**Label from $\\theta$:** 5 cm is opposite, 8 cm is adjacent.' },
      { text: '**Ratio:** TOA. $\\tan \\theta = \\dfrac{5}{8}$.' },
      { text: '**Inverse:** go from the ratio back to the angle — $\\theta = \\tan^{-1}\\left(\\dfrac{5}{8}\\right)$. On the calculator: SHIFT tan.' },
      { text: '**Calculate** in degrees: $\\theta = 32.005\\ldots = 32.0^\\circ$ (1 d.p.).' },
    ],
    check: {
      id: 'chk_inverse',
      q: '$\\cos \\theta = 0.5$. Find $\\theta$.',
      options: [
        { val: 'A', text: '$30^\\circ$' },
        { val: 'B', text: '$0.878^\\circ$' },
        { val: 'C', text: '$0.5^\\circ$' },
        { val: 'D', text: '$60^\\circ$' },
      ],
      correct: 'D',
      expEn: '$\\theta = \\cos^{-1}(0.5) = 60^\\circ$: press SHIFT cos. $30^\\circ$ is $\\sin^{-1}(0.5)$. 0.878 is $\\cos 0.5$ with the calculator in radians — the wrong button and the wrong mode.',
    },
  },

  // ── 16 · exact values ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'No calculator · 30°, 45°, 60°',
    title: 'Exact Values',
    ratio: 50,
    inlineSvg: DIAGRAMS.EQUILATERAL,
    content: 'Cut an equilateral triangle of side 2 in half.\n\nThe half has sides 1, $\\sqrt{3}$ and 2 — and angles of $30^\\circ$ and $60^\\circ$.',
    notes: [
      { tone: 'write', text: '$\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$, $\\cos 60^\\circ = \\dfrac{1}{2}$, $\\tan 60^\\circ = \\sqrt{3}$\n$\\sin 30^\\circ = \\dfrac{1}{2}$, $\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$\n$\\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$' },
    ],
    check: {
      id: 'chk_exact_height',
      q: 'A sloping side is 6 cm long and makes $60^\\circ$ with the ground. What is its height, exactly?',
      options: [
        { val: 'A', text: '$3$ cm' },
        { val: 'B', text: '$3\\sqrt{3}$ cm' },
        { val: 'C', text: '$3\\sqrt{2}$ cm' },
        { val: 'D', text: '$6\\sqrt{3}$ cm' },
      ],
      correct: 'B',
      expEn: 'Height $= 6 \\sin 60^\\circ = 6 \\times \\dfrac{\\sqrt{3}}{2} = 3\\sqrt{3}$ cm. A uses $\\sin 30^\\circ$; D forgets to divide by the 2 on the bottom.',
    },
  },

  // ── 17 · polygons ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hexagon',
    eyebrow: 'Regular polygons',
    title: 'Exterior and Interior Angles',
    ratio: 50,
    inlineSvg: DIAGRAMS.POLYGON_EXT,
    content: 'Walk once round a regular polygon and you turn through $360^\\circ$ — the same turn at every corner.',
    notes: [
      { tone: 'write', text: '**Exterior angle** of a regular polygon $= 360^\\circ \\div$ number of sides.\nInterior angle $= 180^\\circ -$ exterior angle.' },
    ],
    check: {
      id: 'chk_polygon',
      q: 'Each interior angle of a regular polygon is $140^\\circ$. How many sides does it have?',
      options: [
        { val: 'A', text: '7' },
        { val: 'B', text: '9' },
        { val: 'C', text: '14' },
        { val: 'D', text: '2.57' },
      ],
      correct: 'B',
      expEn: 'Exterior $= 180^\\circ - 140^\\circ = 40^\\circ$, and $360 \\div 40 = 9$ sides. D divides 360 by the INTERIOR angle — a number of sides is always a whole number.',
    },
  },

  // ── 18 · a bearing from trigonometry ──────────────────────────────────────
  {
    layout: 'steps',
    accent: SKY,
    icon: 'Navigation',
    eyebrow: 'Worked example · trigonometry and bearings',
    title: 'An Angle, Then a Bearing',
    inlineSvg: DIAGRAMS.BEARING_TRIG,
    content: '$B$ is 9 km due east of $A$, and $C$ is due north of $B$. $AC = 15$ km. Find the bearing of $C$ from $A$.',
    steps: [
      { text: '**CAH:** $\\cos \\theta = \\frac{9}{15}$' },
      { text: '$\\theta = 53.1^\\circ$ — from **east**' },
      { text: '**From north:** $90^\\circ - 53.1^\\circ$' },
      { text: '**Bearing** $= 036.9^\\circ$' },
    ],
    activity: {
      id: 'act_order_bearing',
      type: 'order',
      prompt: 'Put the method for a bearing from a triangle in order.',
      steps: [
        { id: 'north', name: 'Draw the north line at the point you go FROM' },
        { id: 'angle', name: 'Find the angle in the triangle with SOH CAH TOA' },
        { id: 'turn', name: 'Turn clockwise from north, adding or taking away that angle' },
        { id: 'three', name: 'Write the bearing with three figures' },
      ],
      explain: 'A bearing is always measured at the FROM point, from north — so that line comes first. The triangle gives an angle from some other line, and the last move turns it into a clockwise angle from north.',
    },
  },

  // ── 19 · keep the full value ──────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Calculator',
    eyebrow: 'Watch out · two triangles',
    title: 'Round Only at the End',
    content: 'When one triangle gives a side that the next triangle uses, keep **every** digit.\n\n$$BD = 5.3623\\ldots \\quad\\to\\quad BC = \\sqrt{(5.3623\\ldots)^2 + 9^2} = 10.476\\ldots$$\n\nThe paper takes a mark for rounding too early.',
    check: {
      id: 'chk_full_value',
      q: 'Your calculator shows $5.3623\\ldots$ for a side you will use again. What do you use in the next step?',
      options: [
        { val: 'A', text: 'The full value — press ANS' },
        { val: 'B', text: '$5.36$' },
        { val: 'C', text: '$5.4$' },
        { val: 'D', text: '$5$' },
      ],
      correct: 'A',
      expEn: 'Rounding in the middle can change the final answer, and premature rounding is penalised. Keep the whole value on the calculator (ANS, or the memory) and round only the final answer, to 3 s.f.',
    },
  },

  // ════════════════════════════ PART 3 · LINES AND DATA ═════════════════════

  // ── 20 · the angle a line makes ───────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'TrendingUp',
    eyebrow: 'Part 3 · Lines and data',
    title: 'The Angle With the Axis',
    ratio: 50,
    inlineSvg: DIAGRAMS.LINE_ANGLE,
    content: 'A line\'s **gradient** is how far it goes up for every 1 across: rise ÷ run.\n\nRise and run make a right-angled triangle. The rise is opposite the angle, the run adjacent — TOA.',
    notes: [
      { tone: 'write', text: '**Gradient:** $m = \\dfrac{\\text{rise}}{\\text{run}}$.\nAcute angle with the $x$-axis: $\\tan \\theta = m$, so $\\theta = \\tan^{-1}(m)$.' },
    ],
    check: {
      id: 'chk_line_angle',
      q: 'A line has gradient $\\dfrac{3}{4}$. What acute angle does it make with the $x$-axis?',
      options: [
        { val: 'A', text: '$53.1^\\circ$' },
        { val: 'B', text: '$41.4^\\circ$' },
        { val: 'C', text: '$36.9^\\circ$' },
        { val: 'D', text: '$0.75^\\circ$' },
      ],
      correct: 'C',
      expEn: '$\\theta = \\tan^{-1}(0.75) = 36.9^\\circ$. $53.1^\\circ$ is the angle with the $y$-axis instead; $41.4^\\circ$ uses $\\cos^{-1}$.',
    },
  },

  // ── 21 · correlation ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScatterChart',
    eyebrow: 'Key words · scatter diagrams',
    title: 'Correlation',
    ratio: 50,
    inlineSvg: DIAGRAMS.SCATTER_FIT,
    content: 'Each cross is one student: Test 1 across, Test 2 up.\n\nThe crosses rise together — a **positive** correlation.',
    notes: [
      { tone: 'write', text: '**Correlation:** positive (both rise together), negative (one rises as the other falls), or none.\n**Line of best fit:** a straight line through the middle of the crosses, following their trend.' },
    ],
    activity: {
      id: 'act_sort_correlation',
      type: 'sort',
      prompt: 'What correlation would each pair show?',
      bins: [
        { id: 'pos', name: 'Positive' },
        { id: 'neg', name: 'Negative' },
        { id: 'none', name: 'None' },
      ],
      cards: [
        { id: 'k1', name: 'height and arm length', bin: 'pos' },
        { id: 'k2', name: 'hours of revision and test score', bin: 'pos' },
        { id: 'k3', name: 'age of a car and its value', bin: 'neg' },
        { id: 'k4', name: 'outside temperature and heating bill', bin: 'neg' },
        { id: 'k5', name: 'shoe size and phone number', bin: 'none' },
        { id: 'k6', name: 'height and birthday month', bin: 'none' },
      ],
      explain: 'Taller people have longer arms: both rise — positive. An older car is worth less: one rises as the other falls — negative. A phone number has nothing to do with shoe size — no correlation.',
    },
  },

  // ── 22 · reading an estimate ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'Using the line',
    title: 'Estimating From the Line',
    ratio: 50,
    inlineSvg: DIAGRAMS.SCATTER_READ,
    content: 'A student scored 45 on Test 1 and missed Test 2.\n\nUp from 45 to the **line**, across to the axis: about **42**.',
    activity: {
      id: 'act_estimate_fit',
      type: 'estimate',
      prompt: 'Another student scored 25 on Test 1. Use the line of best fit to estimate their Test 2 mark.',
      min: 0,
      max: 80,
      step: 1,
      answer: 26,
      tolerance: 0.12,
      explain: 'Up from 25 to the line, then across: about 26. Read from the LINE, not the nearest cross — the line is the trend of the whole class.',
    },
  },

  // ── 23 · the checklist ───────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    title: 'Can You Do These?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 9.',
    items: [
      { text: 'Write a map scale in the form $1 : n$.' },
      { text: 'Measure a bearing clockwise from north, and find the way back.' },
      { text: 'Use Pythagoras — and leave an exact answer as a simplified surd.' },
      { text: 'Label H, O and A from the angle, and choose SOH, CAH or TOA.' },
      { text: 'Multiply when the unknown is on top; divide when it is on the bottom.' },
      { text: 'Find an angle with the inverse — in degrees.' },
      { text: 'Use the exact values of sin, cos and tan of $30^\\circ$, $45^\\circ$ and $60^\\circ$.' },
      { text: 'Find a bearing from a triangle, keeping full values until the end.' },
      { text: 'Describe correlation and estimate from a line of best fit.' },
    ],
    check: {
      id: 'chk_final',
      q: 'A 6 m ladder makes an angle of $70^\\circ$ with the ground. How high up the wall does it reach?',
      options: [
        { val: 'A', text: '$5.64$ m' },
        { val: 'B', text: '$2.05$ m' },
        { val: 'C', text: '$16.5$ m' },
        { val: 'D', text: '$6.39$ m' },
      ],
      correct: 'A',
      expEn: 'The ladder is the hypotenuse and the height is opposite the $70^\\circ$: SOH, $h = 6 \\sin 70^\\circ = 5.64$ m. B uses cos (the distance along the ground); C uses tan; D divides — and a wall height can never be longer than the ladder.',
    },
  },
];
