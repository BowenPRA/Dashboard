// src/data/EXT_MATH/EM_06/notes.js
// EM_06 — Sets, Surds and Rationalising. IGCSE Mathematics (Extended),
// Wolsey Hall Oxford Assignment 06, Questions 4 and 5.
//
// THE EXEMPLAR DECK for the EXT_MATH track (docs/ext-math-course.md). Written to
// the classroom exemplars (Science 2.5, 2.6 and Maths 2.3 in the classroom app):
// short sentences, one idea each, and a slide body never repeats its Write
// panel. A diagram carries the picture; the Write panel carries the words to
// copy. Where the classroom asks for a hand vote, this deck asks for a tap:
// a `predict` before the answer, a `venn` shading before the rule is used, a
// `sort` of the words the exam hides the notation in.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. NOTATION IS A PICTURE. Every symbol is introduced as a shaded diagram and
//    a word (∩ and, ∪ or, ′ not), and then SHADED by the student before any
//    counting. The worked homework showed a student who could add the numbers
//    but had to guess which ones; shading first removes the guess.
//
// 2. THE ENGLISH IS THE BARRIER. "Does not like apples and does not like
//    bananas" contains the word AND and means NEITHER. The sort on slide 11
//    and the trap on slide 12 exist for that one sentence.
//
// 3. ROOTS BREAK INTO PAIRS. The student's own margin working was a factor
//    tree. The deck keeps it: a prime pair is a square, and a square comes out
//    of the root as one number (the widget on slide 20). Rationalising then
//    rests on the factorising in the same assignment: (a + b)(a − b) = a² − b².
//
// SPINE:
//   1–2    hero; predict — 30 students, 33 "likes"
//   3–7    key words: set/element/n(A), ℰ and the Venn diagram, ∩, ∪, ′
//   8–12   shade it; the notation explorer; neither; words → symbols; the trap
//   13–16  read counts and a probability; fill from facts; the hidden middle x;
//          three sets
//   17–24  surds: predict, key word, why roots multiply, pairs jump out, the
//          method, simplify FULLY, like surds, multiplying
//   25–29  rationalising: the idea, a single surd, conjugates, the machine, a
//          two-term bottom
//   30     the checklist
//
// House notes:
//  · ENGLISH ONLY — EXT_MATH declares `bilingual: false`; no `vn*` twins.
//  · `$$…$$` only in renderContent fields (content, callout body,
//    reveal.answer). steps[].text, note text, statement text/sub, check and
//    activity strings are inline-only.
//  · `check` or `activity` is always the LAST key on its slide.
//  · Every number is original: the assignment's own questions are the
//    homework and are not worked here.
import { DIAGRAMS } from './diagrams.js';
import { SetNotationExplorer, SurdBreaker, ConjugateMachine } from './widgets.jsx';

const PINK = '#be185d';
const TEAL = '#0f766e';
const ORANGE = '#c2410c';
const VIOLET = '#7c3aed';
const PURPLE = '#5c2483';
const RED = '#c8102e';
const GREEN = '#15803d';

export const notes = [
  // ── 1 · hero ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PINK,
    icon: 'Blend',
    brand: 'IGCSE Mathematics · Extended',
    eyebrow: 'Assignment 06 · Questions 4 and 5',
    title: 'Sets, Surds & Rationalising',
    objective: 'I can read and shade set notation on a Venn diagram, simplify a surd fully, and rationalise a denominator.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      text: 'You will **shade**, **sort** and **predict** your way through it. **22 things are scored** — the first one is on the next slide.',
    },
  },

  // ── 2 · predict: 30 students, 33 likes ───────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    title: 'Thirty Students, 33 Votes?',
    content: 'A class has **30** students.\n\n**18** like mangoes. **15** like durian.\n\n18 + 15 = **33**. That is more than the class.',
    activity: {
      id: 'act_predict_double',
      type: 'predict',
      prompt: 'How can 33 "likes" come from 30 students?',
      options: [
        { val: 'wrong', name: 'Someone counted wrong' },
        { val: 'both', name: 'Some students like **both**, so they were counted twice' },
        { val: 'neither', name: 'Some students like neither' },
        { val: 'never', name: 'It cannot happen' },
      ],
      correct: 'both',
      explain: 'Some students are in **both** groups, and 18 + 15 counts them twice. A Venn diagram stops the double counting: every student sits in exactly **one** region.',
    },
  },

  // ── 3 · set, element, n(A) ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key words',
    title: 'Set, Element, n(A)',
    ratio: 46,
    inlineSvg: DIAGRAMS.SET_BRACES,
    content: 'A **set** is a collection of things.\n\nWe list them inside curly brackets.',
    notes: [
      {
        tone: 'write',
        text: '**Set:** a collection of objects, written inside { }.\n**Element:** one member of a set. $6 \\in A$ means 6 is in $A$. $5 \\notin A$ means it is not.\n**n(A):** the number of elements in $A$.',
      },
    ],
    check: {
      id: 'chk_n',
      q: 'If $B = \\{1, 3, 5, 7, 9\\}$, what is $n(B)$?',
      options: [
        { val: 'A', text: '$9$' },
        { val: 'B', text: '$5$' },
        { val: 'C', text: '$25$' },
        { val: 'D', text: '$1$' },
      ],
      correct: 'B',
      expEn: '$n(B)$ counts the elements: 1, 3, 5, 7, 9 — five of them. 9 is the biggest element, not how many there are, and 25 is their sum.',
    },
  },

  // ── 4 · ℰ and the Venn diagram ───────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Square',
    eyebrow: 'Key words',
    title: 'The Universal Set',
    ratio: 50,
    inlineSvg: DIAGRAMS.VENN_ANATOMY,
    content: 'Everything the question is about lives in the rectangle.\n\nEach set is a circle. Where two circles overlap, things are in both.',
    notes: [
      {
        tone: 'write',
        text: '**Universal set, ℰ:** everything in the question. It is the rectangle.\n**Venn diagram:** a rectangle for ℰ, with a circle for each set.',
      },
    ],
  },

  // ── 5 · intersection ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Blend',
    // The symbol lives in the eyebrow, which is not narrated: in the title it
    // would be read aloud as "Intersection intersection".
    eyebrow: 'Symbol 1 · AND · ∩',
    title: 'Intersection',
    ratio: 50,
    inlineSvg: DIAGRAMS.SHADE_INTERSECT,
    content: 'The overlap.\n\nIn **both** sets at the same time.',
    notes: [
      { tone: 'write', text: '**Intersection, $A \\cap B$:** the elements in $A$ **and** in $B$.' },
    ],
  },

  // ── 6 · union ────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Symbol 2 · OR · ∪',
    title: 'Union',
    ratio: 50,
    inlineSvg: DIAGRAMS.SHADE_UNION,
    content: 'Everything in **either** circle.\n\nThe overlap counts too.',
    notes: [
      { tone: 'write', text: '**Union, $A \\cup B$:** the elements in $A$ **or** $B$ **or both**.' },
    ],
    check: {
      id: 'chk_union_word',
      q: 'Which word goes with $\\cup$?',
      options: [
        { val: 'A', text: 'and' },
        { val: 'B', text: 'not' },
        { val: 'C', text: 'only' },
        { val: 'D', text: 'or' },
      ],
      correct: 'D',
      expEn: '$\\cup$ is union: in $A$ or $B$ or both. It looks like a cup — it holds everything poured in from both sets. $\\cap$ is "and", the overlap; a dash, $\'$, is "not".',
    },
  },

  // ── 7 · complement ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'CircleSlash',
    eyebrow: 'Symbol 3 · NOT · A′',
    title: 'Complement',
    ratio: 50,
    inlineSvg: DIAGRAMS.SHADE_COMPLEMENT,
    content: 'Everything in ℰ that is **not** in $A$.\n\nThat includes the space outside every circle.',
    notes: [
      { tone: 'write', text: "**Complement, $A'$:** the elements of ℰ that are **not** in $A$." },
    ],
  },

  // ── 8 · shade it: A ∩ B′ ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'Target',
    eyebrow: 'Put two symbols together',
    title: 'Read It Symbol by Symbol',
    label: 'Shade it',
    labelIcon: 'MousePointerClick',
    text: "$A \\cap B'$ means: in $A$ **and** not in $B$.",
    sub: 'Say each symbol as its word. Then tap the regions that fit. Tap again to clear.',
    activity: {
      id: 'act_venn_a_not_b',
      type: 'venn',
      prompt: "Shade $A \\cap B'$.",
      expr: "A ∩ B'",
      explain: 'In $A$ and NOT in $B$ is the part of circle $A$ outside circle $B$ — the crescent on the left. The middle is in $B$, so it stays white.',
    },
  },

  // ── 9 · the notation explorer ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Blend',
    eyebrow: 'Tap a card — say it before you look',
    title: 'Eight Questions, One Diagram',
    widget: SetNotationExplorer,
    caption: 'Say each card in words **before** you look at the shading. Then press **Count it**.',
  },

  // ── 10 · shade it: neither ───────────────────────────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'Target',
    eyebrow: 'Brackets first',
    title: 'Not Either One',
    label: 'Shade it',
    labelIcon: 'MousePointerClick',
    text: "$(A \\cup B)'$: first the union, then **not** that.",
    sub: 'Brackets first, as in algebra. Shade what is left when you take away everything in $A \\cup B$.',
    activity: {
      id: 'act_venn_neither',
      type: 'venn',
      prompt: "Shade $(A \\cup B)'$.",
      expr: "(A ∪ B)'",
      explain: '$A \\cup B$ is both whole circles. NOT that is everything outside both circles — only the outside region. This is the "neither" region, the one an exam asks for with "does not like … and does not like …".',
    },
  },

  // ── 11 · words into symbols ──────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    title: 'Words Into Symbols',
    label: 'Sort it',
    labelIcon: 'Sparkles',
    text: 'Exam questions are written in **words**. The marks are in the **notation**.',
    sub: '"Both" is ∩. "Either … or" is ∪. "Not" and "neither" need a ′. Read the whole description, not one word.',
    activity: {
      id: 'act_sort_words',
      type: 'sort',
      prompt: 'Sort each student into the right notation. A = likes apples, B = likes bananas.',
      bins: [
        { id: 'and', name: '$A \\cap B$' },
        { id: 'or', name: '$A \\cup B$' },
        { id: 'neither', name: "$(A \\cup B)'$" },
        { id: 'only', name: "$A \\cap B'$" },
      ],
      cards: [
        { id: 'w1', name: 'likes apples and bananas', bin: 'and' },
        { id: 'w2', name: 'likes both fruits', bin: 'and' },
        { id: 'w3', name: 'likes at least one of the fruits', bin: 'or' },
        { id: 'w4', name: 'likes apples or bananas', bin: 'or' },
        { id: 'w5', name: 'likes neither fruit', bin: 'neither' },
        { id: 'w6', name: 'does not like apples and does not like bananas', bin: 'neither' },
        { id: 'w7', name: 'likes apples but not bananas', bin: 'only' },
        { id: 'w8', name: 'likes only apples', bin: 'only' },
      ],
      explain: '"Does not like apples AND does not like bananas" has the word **and** in it — but it describes the **neither** region, $(A \\cup B)\'$. "At least one" is the union: one fruit or both.',
    },
  },

  // ── 12 · the trap ────────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    title: 'Neither Is Not "Not Both"',
    content: 'They look alike. They shade different pictures.',
    columns: [
      { heading: '(A ∪ B)′ — neither', accent: GREEN, icon: 'CheckCircle2', inlineSvg: DIAGRAMS.NEITHER_RIGHT },
      { heading: 'A′ ∪ B′ — not both', accent: RED, icon: 'AlertTriangle', inlineSvg: DIAGRAMS.NEITHER_WRONG },
    ],
    check: {
      id: 'chk_neither',
      q: 'Which notation means a student likes **neither** apples ($A$) nor bananas ($B$)?',
      options: [
        { val: 'A', text: "$A' \\cup B'$" },
        { val: 'B', text: "$(A \\cup B)'$" },
        { val: 'C', text: '$A \\cap B$' },
        { val: 'D', text: "$(A \\cap B)'$" },
      ],
      correct: 'B',
      expEn: "Neither is outside both circles: $(A \\cup B)'$. $A' \\cup B'$ is everything except the middle, so it includes students who like one fruit. $(A \\cap B)'$ is that same picture.",
    },
  },

  // ── 13 · reading counts and a probability ────────────────────────────────
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Hash',
    eyebrow: 'Worked example',
    title: 'Counting From the Diagram',
    inlineSvg: DIAGRAMS.VENN_FOOD,
    content: '30 students were asked if they like phở ($P$) and bánh mì ($B$). Shade first, then add.',
    steps: [
      { text: '**Everyone:** $n(\\mathscr{E}) = 11 + 7 + 9 + 3 = 30$. The 3 outside count too.' },
      { text: '**One set:** $n(B) = 7 + 9 = 16$. The middle is part of $B$.' },
      { text: '**Union:** $n(P \\cup B) = 11 + 7 + 9 = 27$.' },
      { text: "**Probability:** $P(\\text{neither}) = \\dfrac{n((P \\cup B)')}{n(\\mathscr{E})} = \\dfrac{3}{30}$. The bottom is **everyone**." },
    ],
    check: {
      id: 'chk_nP',
      q: 'Using the same diagram, what is $n(P)$?',
      options: [
        { val: 'A', text: '$11$' },
        { val: 'B', text: '$27$' },
        { val: 'C', text: '$18$' },
        { val: 'D', text: '$7$' },
      ],
      correct: 'C',
      expEn: "$P$ is the whole circle: $11 + 7 = 18$. The 11 is only the students who like phở **but not** bánh mì — that is $P \\cap B'$. 27 is $P \\cup B$.",
    },
  },

  // ── 14 · fill from facts ─────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'LayoutGrid',
    eyebrow: 'Worked example',
    title: 'Start in the Middle',
    inlineSvg: DIAGRAMS.VENN_FILL,
    content: '50 people: 28 drink coffee ($C$), 19 drink tea ($T$), 7 drink both. Fill the diagram.',
    steps: [
      { text: '**1 · The middle:** both = 7.' },
      { text: '**2 · C only:** $28 - 7 = 21$. The 28 includes the middle, so take it away.' },
      { text: '**3 · T only:** $19 - 7 = 12$.' },
      { text: '**4 · Outside:** $50 - 21 - 7 - 12 = 10$.' },
    ],
    activity: {
      id: 'act_order_fill',
      type: 'order',
      prompt: 'Put the method for filling a two-set Venn diagram in order.',
      steps: [
        { id: 'mid', name: 'Write the number in both sets in the middle' },
        { id: 'only', name: 'For each circle: its total minus the middle' },
        { id: 'inside', name: 'Add up everything inside the circles' },
        { id: 'out', name: 'Outside = n(ℰ) minus that total' },
      ],
      explain: 'Every other region is found by taking something away from a total, and every set total includes the middle. So the middle has to be known first, and the outside comes last.',
    },
  },

  // ── 15 · the hidden middle ───────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Variable',
    eyebrow: 'When the middle is not given',
    title: 'Call the Middle x',
    content: '40 students: 23 in art club ($A$), 17 in music club ($M$), 6 in neither.\n\n$$(23 - x) + x + (17 - x) + 6 = 40$$\n\n$$46 - x = 40 \\quad\\Rightarrow\\quad x = 6$$',
    notes: [
      { tone: 'write', text: 'Middle not given? Call it $x$. Write every region using $x$, then add them all to make $n(\\mathscr{E})$.' },
    ],
    check: {
      id: 'chk_x',
      q: 'Back to slide 2: 30 students, 18 like mangoes, 15 like durian, and 4 like neither. How many like both?',
      options: [
        { val: 'A', text: '$7$' },
        { val: 'B', text: '$3$' },
        { val: 'C', text: '$4$' },
        { val: 'D', text: '$11$' },
      ],
      correct: 'A',
      expEn: 'Let both = $x$: $(18 - x) + x + (15 - x) + 4 = 30$, so $37 - x = 30$ and $x = 7$. Answer B forgets the 4 who like neither — they are part of the 30 too.',
    },
  },

  // ── 16 · three sets ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Blend',
    eyebrow: 'Three sets',
    title: 'Eight Regions',
    label: 'Shade it',
    labelIcon: 'MousePointerClick',
    text: 'Three circles cut ℰ into **eight** regions.',
    sub: 'The same three symbols still work. $A \\cap B \\cap C$ is the very middle. Fill a three-set diagram from there outwards.',
    activity: {
      id: 'act_venn_three',
      type: 'venn',
      sets: ['A', 'B', 'C'],
      prompt: "Shade $A \\cap B \\cap C'$ — in $A$ and $B$, but not $C$.",
      expr: "A ∩ B ∩ C'",
      explain: 'In $A$ and $B$ is the lens where those two circles overlap. NOT $C$ removes the part of the lens inside $C$ — including the very middle. Only the top of the lens is shaded.',
    },
  },

  // ── 17 · surds: predict ──────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'SquareRadical',
    eyebrow: 'Part 2 · Surds — decide first',
    title: 'Do Roots Add?',
    label: 'Predict',
    labelIcon: 'Sparkles',
    text: 'Is $\\sqrt{9} + \\sqrt{16}$ the same as $\\sqrt{25}$?',
    sub: 'Work out both sides before you choose.',
    activity: {
      id: 'act_predict_roots',
      type: 'predict',
      prompt: 'Is $\\sqrt{9} + \\sqrt{16} = \\sqrt{25}$?',
      options: [
        { val: 'yes', name: 'Yes — add the numbers under the root' },
        { val: 'no', name: 'No — they are different numbers' },
        { val: 'close', name: 'Almost — they differ by a tiny amount' },
      ],
      correct: 'no',
      explain: '$\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$, but $\\sqrt{25} = 5$. Roots do **not** add. They do **multiply**: $\\sqrt{9} \\times \\sqrt{16} = 3 \\times 4 = 12 = \\sqrt{144}$.',
    },
  },

  // ── 18 · surd ────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'SquareRadical',
    eyebrow: 'Key word',
    title: 'Surd',
    ratio: 50,
    inlineSvg: DIAGRAMS.ROOTS_LINE,
    content: 'Most square roots are not whole numbers.\n\nLeave them as roots. $\\sqrt{2}$ is exact; 1.414 is not.',
    notes: [
      { tone: 'write', text: '**Surd:** a square root that is not a whole number, like $\\sqrt{2}$ or $\\sqrt{12}$. A surd is an **exact** value.' },
    ],
    check: {
      id: 'chk_surd',
      q: 'Which of these is **not** a surd?',
      options: [
        { val: 'A', text: '$\\sqrt{2}$' },
        { val: 'B', text: '$\\sqrt{20}$' },
        { val: 'C', text: '$\\sqrt{49}$' },
        { val: 'D', text: '$\\sqrt{50}$' },
      ],
      correct: 'C',
      expEn: '$\\sqrt{49} = 7$, a whole number, because 49 is a square number. 2, 20 and 50 are not square numbers, so their roots are surds.',
    },
  },

  // ── 19 · why roots multiply ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Square',
    eyebrow: 'Why it works',
    title: 'Roots Multiply',
    ratio: 50,
    inlineSvg: DIAGRAMS.AREA_SQUARE,
    content: 'A square of area 12 is four squares of area 3.\n\nSo its side is two sides of $\\sqrt{3}$.',
    notes: [
      { tone: 'write', text: '$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$\n$\\sqrt{12} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$' },
    ],
  },

  // ── 20 · pairs jump out (widget) ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: VIOLET,
    icon: 'Scissors',
    eyebrow: 'Press Next step — say what happens first',
    title: 'Pairs Jump Out',
    widget: SurdBreaker,
    caption: 'A pair of the same prime is a square number. So a pair comes out of the root as **one** number.',
  },

  // ── 21 · the method ──────────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: VIOLET,
    icon: 'Scissors',
    eyebrow: 'The method',
    title: 'Simplifying a Surd',
    inlineSvg: DIAGRAMS.SQUARE_NUMBERS,
    content: 'Simplify $\\sqrt{72}$.',
    steps: [
      { text: '**Find** the largest square number that divides 72. Start at the top of the list: 36 does.' },
      { text: '**Split:** $\\sqrt{72} = \\sqrt{36} \\times \\sqrt{2}$.' },
      { text: '**Root the square:** $\\sqrt{36} = 6$, so $\\sqrt{72} = 6\\sqrt{2}$.' },
      { text: '**Check:** can 2 be broken down? No. It is finished.' },
    ],
    check: {
      id: 'chk_48',
      q: 'Simplify $\\sqrt{48}$ fully.',
      options: [
        { val: 'A', text: '$2\\sqrt{12}$' },
        { val: 'B', text: '$4\\sqrt{3}$' },
        { val: 'C', text: '$16\\sqrt{3}$' },
        { val: 'D', text: '$3\\sqrt{4}$' },
      ],
      correct: 'B',
      expEn: '$48 = 16 \\times 3$ and $\\sqrt{16} = 4$, so $\\sqrt{48} = 4\\sqrt{3}$. $2\\sqrt{12}$ is equal but not finished — 12 still has the square factor 4. $16\\sqrt{3}$ forgot to take the root of 16.',
    },
  },

  // ── 22 · simplify FULLY ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    title: 'Is It Finished?',
    ratio: 52,
    inlineSvg: DIAGRAMS.FULLY,
    content: 'A small square factor still works.\n\nBut then you need another round.',
    notes: [
      { tone: 'write', text: '**Simplify fully:** keep going until the number under the root has **no** square factor.' },
    ],
    check: {
      id: 'chk_fully',
      q: 'All four equal $\\sqrt{200}$. Which one is **fully** simplified?',
      options: [
        { val: 'A', text: '$\\sqrt{200}$' },
        { val: 'B', text: '$2\\sqrt{50}$' },
        { val: 'C', text: '$5\\sqrt{8}$' },
        { val: 'D', text: '$10\\sqrt{2}$' },
      ],
      correct: 'D',
      expEn: 'Only $10\\sqrt{2}$ is finished: 2 has no square factor. $50 = 25 \\times 2$ and $8 = 4 \\times 2$ can both be broken down again.',
    },
  },

  // ── 23 · like surds ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: VIOLET,
    icon: 'Layers',
    eyebrow: 'Adding and subtracting',
    title: 'Like Surds Collect',
    label: 'Sort it',
    labelIcon: 'Sparkles',
    text: '$3\\sqrt{2} + 5\\sqrt{2} = 8\\sqrt{2}$, just like $3x + 5x = 8x$.',
    sub: 'Different roots do not collect, just like $3x + 5y$. But **simplify first** — some roots are secretly alike.',
    activity: {
      id: 'act_sort_like',
      type: 'sort',
      prompt: 'Can each one be written as ONE surd?',
      bins: [
        { id: 'yes', name: 'Yes — one surd' },
        { id: 'no', name: 'No — leave it' },
      ],
      cards: [
        { id: 'l1', name: '$\\sqrt{2} + \\sqrt{8}$', bin: 'yes' },
        { id: 'l2', name: '$\\sqrt{3} + \\sqrt{5}$', bin: 'no' },
        { id: 'l3', name: '$\\sqrt{12} + \\sqrt{27}$', bin: 'yes' },
        { id: 'l4', name: '$\\sqrt{6} + \\sqrt{10}$', bin: 'no' },
        { id: 'l5', name: '$\\sqrt{50} - \\sqrt{18}$', bin: 'yes' },
        { id: 'l6', name: '$\\sqrt{20} + \\sqrt{3}$', bin: 'no' },
      ],
      explain: '$\\sqrt{8} = 2\\sqrt{2}$; $\\sqrt{12} = 2\\sqrt{3}$ and $\\sqrt{27} = 3\\sqrt{3}$; $\\sqrt{50} = 5\\sqrt{2}$ and $\\sqrt{18} = 3\\sqrt{2}$ — alike once simplified. $\\sqrt{20} = 2\\sqrt{5}$ still does not match $\\sqrt{3}$.',
    },
  },

  // ── 24 · multiplying ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Grid3x3',
    eyebrow: 'Multiplying',
    title: 'Multiplying Surds',
    ratio: 50,
    inlineSvg: DIAGRAMS.MULTIPLY_RULE,
    content: 'Numbers in front multiply.\n\nNumbers under the roots multiply.',
    notes: [
      { tone: 'write', text: '$a\\sqrt{b} \\times c\\sqrt{d} = ac\\sqrt{bd}$\n$\\sqrt{a} \\times \\sqrt{a} = a$' },
    ],
    check: {
      id: 'chk_square',
      q: 'What is $(2\\sqrt{3})^2$?',
      options: [
        { val: 'A', text: '$6$' },
        { val: 'B', text: '$12$' },
        { val: 'C', text: '$4\\sqrt{3}$' },
        { val: 'D', text: '$36$' },
      ],
      correct: 'B',
      expEn: '$(2\\sqrt{3})^2 = 2\\sqrt{3} \\times 2\\sqrt{3} = 4 \\times 3 = 12$. Square the 2 **and** the root. A multiplies 2 by 3 without squaring; C squares the 2 but forgets that $\\sqrt{3} \\times \\sqrt{3} = 3$.',
    },
  },

  // ── 25 · rationalising: the idea ─────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'Part 3 · Rationalising',
    title: 'No Surds on the Bottom',
    ratio: 50,
    inlineSvg: DIAGRAMS.SAME_VALUE,
    content: 'Multiplying the top and the bottom by the same thing does not change a fraction.\n\nSo choose something that clears the root.',
    notes: [
      { tone: 'write', text: '**Rationalise the denominator:** rewrite a fraction so there is no surd on the bottom.' },
    ],
    activity: {
      id: 'act_predict_multiplier',
      type: 'predict',
      prompt: 'What should $\\dfrac{1}{\\sqrt{2}}$ be multiplied by?',
      options: [
        { val: 'two', name: '$\\dfrac{2}{2}$' },
        { val: 'root', name: '$\\dfrac{\\sqrt{2}}{\\sqrt{2}}$' },
        { val: 'bottom', name: '$\\sqrt{2}$, on the bottom only' },
      ],
      correct: 'root',
      explain: '$\\dfrac{1}{\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, because $\\sqrt{2} \\times \\sqrt{2} = 2$. $\\dfrac{2}{2}$ leaves $2\\sqrt{2}$ on the bottom, and multiplying the bottom alone changes the value.',
    },
  },

  // ── 26 · a single surd on the bottom ─────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Worked example',
    title: 'A Single Surd on the Bottom',
    content: 'Rationalise $\\dfrac{10}{\\sqrt{8}}$.',
    steps: [
      { text: '**Multiply** the top and the bottom by $\\sqrt{8}$: $\\dfrac{10}{\\sqrt{8}} \\times \\dfrac{\\sqrt{8}}{\\sqrt{8}} = \\dfrac{10\\sqrt{8}}{8}$.' },
      { text: '**Simplify the root:** $\\sqrt{8} = 2\\sqrt{2}$, so the top is $20\\sqrt{2}$.' },
      { text: '**Divide through** by 4: $\\dfrac{20\\sqrt{2}}{8} = \\dfrac{5\\sqrt{2}}{2}$.' },
    ],
    check: {
      id: 'chk_12_root6',
      q: 'Rationalise $\\dfrac{12}{\\sqrt{6}}$.',
      options: [
        { val: 'A', text: '$\\dfrac{12\\sqrt{6}}{36}$' },
        { val: 'B', text: '$\\sqrt{2}$' },
        { val: 'C', text: '$2\\sqrt{6}$' },
        { val: 'D', text: '$\\dfrac{\\sqrt{6}}{2}$' },
      ],
      correct: 'C',
      expEn: '$\\dfrac{12}{\\sqrt{6}} \\times \\dfrac{\\sqrt{6}}{\\sqrt{6}} = \\dfrac{12\\sqrt{6}}{6} = 2\\sqrt{6}$. A thinks $\\sqrt{6} \\times \\sqrt{6} = 36$ — it is 6. D turned the fraction upside down.',
    },
  },

  // ── 27 · conjugates ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Remember factorising?',
    title: 'The Surds Cancel',
    ratio: 50,
    inlineSvg: DIAGRAMS.GRID_CONJUGATE,
    content: 'This assignment also factorised $a^2 - b^2 = (a + b)(a - b)$.\n\nRun it backwards with a surd, and the middle terms cancel.',
    notes: [
      { tone: 'write', text: '**Conjugate:** the same two terms with the sign between them changed.\n$(6 - \\sqrt{5})(6 + \\sqrt{5}) = 36 - 5 = 31$ — no surd left.' },
    ],
    check: {
      id: 'chk_conjugate',
      q: 'What is $(4 + \\sqrt{3})(4 - \\sqrt{3})$?',
      options: [
        { val: 'A', text: '$13$' },
        { val: 'B', text: '$19$' },
        { val: 'C', text: '$16 - \\sqrt{3}$' },
        { val: 'D', text: '$13 + 8\\sqrt{3}$' },
      ],
      correct: 'A',
      expEn: '$4^2 - (\\sqrt{3})^2 = 16 - 3 = 13$. The cells $-4\\sqrt{3}$ and $+4\\sqrt{3}$ cancel. B adds the 3 instead of subtracting it; D keeps a middle term that should have cancelled.',
    },
  },

  // ── 28 · the conjugate machine (widget) ──────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'Press Next step — predict the bottom first',
    title: 'Rationalising, Step by Step',
    widget: ConjugateMachine,
    caption: 'Multiply the top and the bottom by the **conjugate**: the same bracket with the middle sign changed.',
  },

  // ── 29 · a two-term bottom ───────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Worked example',
    title: 'A Two-Term Bottom',
    content: 'Rationalise $\\dfrac{6}{4 - \\sqrt{10}}$.',
    steps: [
      { text: '**Conjugate:** change the middle sign — $4 + \\sqrt{10}$.' },
      { text: '**Bottom:** $(4 - \\sqrt{10})(4 + \\sqrt{10}) = 16 - 10 = 6$.' },
      { text: '**Top:** $6(4 + \\sqrt{10}) = 24 + 6\\sqrt{10}$.' },
      { text: '**Simplify:** $\\dfrac{24 + 6\\sqrt{10}}{6} = 4 + \\sqrt{10}$. Divide **every** term by 6.' },
    ],
    activity: {
      id: 'act_order_rationalise',
      type: 'order',
      prompt: 'Put the method for a two-term bottom in order.',
      steps: [
        { id: 'conj', name: 'Write the conjugate: change the middle sign' },
        { id: 'mult', name: 'Multiply the top AND the bottom by it' },
        { id: 'expand', name: 'Multiply out — the bottom becomes a whole number' },
        { id: 'divide', name: 'Divide every term by any common factor' },
      ],
      explain: 'The conjugate comes first because it is what you multiply by. The bottom only becomes a whole number once it is multiplied out, and "simplify fully" is always the last line — divide every term, not just one.',
    },
  },

  // ── 30 · checklist ───────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    title: 'Can You Do These?',
    content: '> Every orange **Write** panel belongs in your notebook. There are 12.',
    items: [
      { text: 'Read $\\cap$, $\\cup$ and $\'$ as **and**, **or**, **not**.' },
      { text: 'Shade any notation on a Venn diagram.' },
      { text: 'Turn a question in words into notation.' },
      { text: 'Fill a Venn diagram from the middle out — with $x$ if you must.' },
      { text: 'Find a probability from a Venn diagram.' },
      { text: 'Simplify a surd **fully**.' },
      { text: 'Collect like surds, and multiply surds.' },
      { text: 'Rationalise $\\dfrac{a}{\\sqrt{b}}$ and $\\dfrac{a}{b + \\sqrt{c}}$.' },
    ],
    check: {
      id: 'chk_final',
      q: 'Simplify $\\sqrt{2} + \\sqrt{32}$.',
      options: [
        { val: 'A', text: '$\\sqrt{34}$' },
        { val: 'B', text: '$4\\sqrt{2}$' },
        { val: 'C', text: '$6\\sqrt{2}$' },
        { val: 'D', text: '$5\\sqrt{2}$' },
      ],
      correct: 'D',
      expEn: '$\\sqrt{32} = \\sqrt{16} \\times \\sqrt{2} = 4\\sqrt{2}$, so $\\sqrt{2} + 4\\sqrt{2} = 5\\sqrt{2}$. A adds under the root, which never works; B forgets the first $\\sqrt{2}$.',
    },
  },
];
