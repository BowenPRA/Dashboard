// src/data/IGCSE_CHEM/M05_3/notes.js
// M05_3 Measuring the Rate of a Reaction — book spreads 9.1 and 9.2, plus the
// loss-of-mass method from 9.4. English only (IGCSE_CHEM is not bilingual), so
// there are no `vn*` twins anywhere.
//
// The spine follows the book: FAST AND SLOW (rust against a firework) → what
// RATE means → the RATE OF A REACTION → WHAT TO MEASURE (a gas is easiest) →
// the APPARATUS and a REASON for every step → the RESULTS TABLE → PREDICT the
// rate → the GRAPH and the three things its shape says → the rate in ONE
// MINUTE → the AVERAGE rate → UNITS → the second method (LOSS OF MASS) →
// SOURCES OF ERROR → the checklist, which hands over to the next unit (what
// CHANGES the rate — not taught here).
//
// Two sentences are the method the Rate Reader task stages, so they are said
// here in exactly the same words:
//   · reading a value: "up from the time, across to the volume";
//   · the rate in a given minute: "the minute's rate = end reading − start reading".
//
// The book's own magnesium results (14, 25, 33 … 40 cm³) are TAUGHT on the
// one-minute and average-rate slides, because the student has the book open.
// The table and graph drawn in this deck are our own run (diagrams.js: RUN).
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its
// slide — the audio generator narrates every field before it and stops there.
// Slide titles are read aloud, so they carry no symbols or units.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const INDIGO = '#4338ca';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'Timer',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 5 · The rate of reaction',
    title: 'Measuring the Rate of a Reaction',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'An iron gate **rusts**. It takes years. A firework **explodes**. It is over in less than a second. Both are chemical reactions. What would you need to **measure** to say exactly how fast each one goes?',
    },
  },

  // ── 2 · Fast and slow ──────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Zap',
    title: 'Some Reactions Race, Some Crawl',
    columns: [
      {
        heading: 'Fast reactions',
        accent: RED,
        icon: 'Zap',
        content:
          'Mix silver nitrate solution with sodium chloride solution. A white **precipitate** of silver chloride appears **at once**.\n\n' +
          'A firework explodes in a **fraction of a second**.',
      },
      {
        heading: 'Slow reactions',
        accent: BLUE,
        icon: 'Hourglass',
        content:
          'Wet concrete takes **a couple of days** to harden.\n\n' +
          'An old car takes **years** to rust away.\n\n' +
          'A factory needs more than "fast" or "slow". It needs to know **exactly** how fast.',
      },
    ],
    activity: {
      id: 'a1', type: 'order',
      prompt: 'Put these reactions in order, from the FASTEST to the SLOWEST.',
      steps: [
        { id: 'firework', name: 'A firework explodes' },
        { id: 'match', name: 'A match burns down' },
        { id: 'cake', name: 'A cake bakes in the oven' },
        { id: 'milk', name: 'Milk goes sour in a warm kitchen' },
        { id: 'gate', name: 'An iron gate rusts' },
      ],
      explain: 'A firework: under a second. A match: a few seconds. A cake: under an hour. Sour milk: a day or two. Rust: years. Words like "fast" and "slow" only put them in order — to say **how** fast, you need a number: a **rate**.',
    },
  },

  // ── 3 · What rate means ────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Gauge',
    title: 'What Does Rate Mean?',
    content:
      '**Rate** tells you how fast something changes. It always has **two parts**: **how much** changed, and **in how much time**.\n\n' +
      '> • A car goes 90 kilometres in one hour: a rate of **90 km per hour**.\n' +
      '> • A tap puts 12 litres into a bath each minute: **12 litres per minute**.\n' +
      '> • A heart beats 70 times each minute: **70 beats per minute**.\n\n' +
      'Any unit of time will do: a second, a minute, an hour, a day.',
    notes: [
      {
        tone: 'write',
        text: '**Rate:** a measure of the change that happens in **one unit of time**.',
      },
    ],
    check: {
      id: 'c1',
      q: 'Which of these is a RATE?',
      options: [
        { val: 'A', text: '45 litres' },
        { val: 'B', text: '45 litres per minute' },
        { val: 'C', text: '45 minutes' },
      ],
      correct: 'B',
      expEn: 'A rate needs both parts: an amount (45 litres) AND a unit of time (per minute). "45 litres" is only an amount, and "45 minutes" is only a time.',
    },
  },

  // ── 4 · The rate of a reaction ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'FlaskConical',
    eyebrow: 'Book spread 9.1',
    title: 'The Rate of a Reaction',
    content:
      'Zinc reacts with dilute sulfuric acid:\n\n' +
      '> $\\text{Zn}(\\text{s}) + \\text{H}_2\\text{SO}_4(\\text{aq}) \\rightarrow \\text{ZnSO}_4(\\text{aq}) + \\text{H}_2(\\text{g})$\n\n' +
      'As it goes, the zinc and the acid are **used up**, and zinc sulfate and hydrogen **form**. So you could follow the reaction by measuring **any one** of these: the zinc used up per minute, the acid used up per minute, the zinc sulfate made per minute, or the hydrogen made per minute.',
    notes: [
      {
        tone: 'write',
        text: '**Rate of reaction:** the amount of a **reactant used up** per unit of time, OR the amount of a **product formed** per unit of time.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Calcium carbonate reacts with hydrochloric acid and gives off carbon dioxide. Which of these measures the RATE of the reaction?',
      options: [
        { val: 'A', text: 'The mass of calcium carbonate put in at the start' },
        { val: 'B', text: 'The colour of the acid' },
        { val: 'C', text: 'The volume of carbon dioxide made each minute' },
        { val: 'D', text: 'The temperature of the room' },
      ],
      correct: 'C',
      expEn: 'Carbon dioxide is a product, and "each minute" is a unit of time: product formed per unit of time is a rate. The starting mass is an amount with no time in it.',
    },
  },

  // ── 5 · What could you measure? (sort) ─────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'Magnesium + hydrochloric acid → magnesium chloride + hydrogen',
    title: 'What Could You Measure?',
    content:
      'Magnesium ribbon reacts with dilute hydrochloric acid. The magnesium and the acid are **used up**. Magnesium chloride and hydrogen **form**.\n\n' +
      'Some measurements tell you the **rate**. Some do not. The test: does it say **how much per unit of time**?',
    activity: {
      id: 'a2', type: 'sort',
      prompt: 'Sort each measurement: does it follow a reactant, a product, or is it not a rate at all?',
      bins: [
        { id: 'used', name: 'Reactant used up per unit time' },
        { id: 'made', name: 'Product formed per unit time' },
        { id: 'not', name: 'Not a rate' },
      ],
      cards: [
        { id: 'mg', name: 'Mass of magnesium that disappears each minute', bin: 'used' },
        { id: 'acid', name: 'Amount of acid used up each minute', bin: 'used' },
        { id: 'h2', name: 'Volume of hydrogen collected each minute', bin: 'made' },
        { id: 'mgcl2', name: 'Mass of magnesium chloride formed each minute', bin: 'made' },
        { id: 'total', name: 'Total volume of hydrogen at the end', bin: 'not' },
        { id: 'flask', name: 'Size of the flask', bin: 'not' },
      ],
      explain: 'Magnesium and acid are reactants; hydrogen and magnesium chloride are products. The **total** volume at the end is only an amount — it has no time in it, so it cannot tell you how fast the gas came.',
    },
  },

  // ── 6 · Why the gas is easiest ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Wind',
    title: 'Why Measure the Gas?',
    content:
      'In the magnesium reaction, magnesium chloride stays **dissolved** in the water. You cannot see it or pick it out to weigh it.\n\n' +
      'Hydrogen is different. It is the **only gas** in the reaction, so it **bubbles off** and leaves the mixture on its own. You can **collect** it and measure its **volume**.\n\n' +
      'The same idea works for **any** reaction that gives off a gas.',
    check: {
      id: 'c3',
      q: 'Why is the hydrogen the easiest thing to measure in the magnesium reaction?',
      options: [
        { val: 'A', text: 'It is the only gas, so it bubbles off and can be collected and its volume measured' },
        { val: 'B', text: 'It is the only product of the reaction' },
        { val: 'C', text: 'It is a reactant, so it is used up' },
      ],
      correct: 'A',
      expEn: 'Hydrogen leaves the mixture by itself, so it can be caught and measured. It is not the only product — magnesium chloride forms too — and it is a product, not a reactant.',
    },
  },

  // ── 7 · The apparatus ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Beaker',
    eyebrow: 'Book spread 9.2 · The experiment',
    title: 'The Gas Syringe Apparatus',
    ratio: 42,
    inlineSvg: DIAGRAMS.GAS_SYRINGE_RIG,
    drawThis: true,
    content:
      'Every piece has a job:\n\n' +
      '> • **flask** — holds the magnesium and the acid\n' +
      '> • **stopper** — seals the flask, so no gas escapes\n' +
      '> • **delivery tube** — carries the gas to the syringe\n' +
      '> • **gas syringe** — collects the gas and measures its volume\n' +
      '> • **stopclock** — measures the time',
    notes: [
      {
        tone: 'write',
        text: '**Gas syringe:** a syringe that collects a gas. The gas pushes the plunger out, and the scale gives its **volume in cm³**.',
      },
    ],
  },

  // ── 8 · Hotspot: where is the gas measured? ─────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Crosshair',
    eyebrow: 'The same drawing, labels taken off',
    title: 'Where Is the Gas Measured?',
    content:
      'The hydrogen is **made** in one place and **measured** in another. Tap the part that **measures its volume**.',
    activity: {
      id: 'a3', type: 'hotspot',
      prompt: 'Tap the part of the apparatus that measures the volume of hydrogen.',
      svg: DIAGRAMS.GAS_SYRINGE_RIG, viewBox: '0 0 520 320',
      targets: [
        // The syringe barrel runs x 268–452 at y 40–80; the delivery tube's
        // straight run is y = 60 from x 130 to 252; the flask body centres near
        // (130, 228); the stopclock face is centred at (440, 200), r 38.
        { id: 'syringe', x: 360, y: 60, r: 85, name: 'the gas syringe' },
        { id: 'tube', x: 190, y: 60, r: 24, name: 'the delivery tube' },
        { id: 'flask', x: 130, y: 228, r: 48, name: 'the flask — the gas is made here' },
        { id: 'clock', x: 440, y: 200, r: 40, name: 'the stopclock' },
      ],
      correct: 'syringe',
      explain: 'The **gas syringe** collects the hydrogen and its scale gives the volume. The flask is where the gas is made, the tube only carries it, and the stopclock measures time, not volume.',
    },
  },

  // ── 9 · Reading the syringe ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    title: 'Reading the Gas Syringe',
    ratio: 44,
    side: 'left',
    inlineSvg: DIAGRAMS.SYRINGE_READINGS,
    content:
      'At the start no gas has been made, so the plunger is **all the way in**: the reading is **0 cm³**.\n\n' +
      'As hydrogen arrives, it **pushes the plunger out**. Read the mark the plunger has reached — here, **20 cm³**.\n\n' +
      'Each reading is the **total** collected **since the start**. You take one at regular **intervals** — for example every minute — and write it down.',
    check: {
      id: 'c4',
      q: 'The plunger of a gas syringe has moved out to the 35 mark. What does that tell you?',
      options: [
        { val: 'A', text: '35 cm³ of gas has been collected since the start' },
        { val: 'B', text: '35 cm³ of gas was made in the last minute' },
        { val: 'C', text: 'The reaction is 35% finished' },
      ],
      correct: 'A',
      expEn: 'A syringe reading is a running total: everything collected since the clock started. To find how much came in one minute, you need two readings — that comes later in this unit.',
    },
  },

  // ── 10 · Order the method ──────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'ListChecks',
    title: 'Put the Method in Order',
    content:
      'On the bench: a clean flask, a strip of **magnesium ribbon**, some sandpaper, **dilute hydrochloric acid**, the stopper with its delivery tube, a **gas syringe** and a **stopclock**.\n\n' +
      'Think about what must happen **before** the gas starts to come.',
    activity: {
      id: 'a4', type: 'order',
      prompt: 'Put the steps of the experiment in order.',
      steps: [
        { id: 'clean', name: 'Clean the magnesium ribbon with sandpaper' },
        { id: 'acid', name: 'Measure the dilute hydrochloric acid into the flask' },
        { id: 'drop', name: 'Drop the magnesium into the acid' },
        { id: 'seal', name: 'Put in the stopper and syringe at once, and start the clock' },
        { id: 'read', name: 'Read the volume on the syringe every minute' },
        { id: 'stop', name: 'Stop when the volume no longer changes' },
      ],
      explain: 'Clean the metal and set up the acid first. The moment the magnesium goes in, the gas starts — so the stopper goes in and the clock starts **at the same time**. Then read at regular intervals until nothing changes.',
    },
  },

  // ── 11 · A reason for every step ───────────────────────────────────────────
  {
    layout: 'stack',
    accent: ORANGE,
    icon: 'HelpCircle',
    columns: 2,
    eyebrow: 'An exam favourite: "explain why…"',
    title: 'A Reason for Every Step',
    content: 'Learn each step **with** its reason — the exam asks for the reason.',
    notes: [
      {
        tone: 'info', badge: 'Clean the ribbon',
        text: 'Magnesium has a thin coat of **magnesium oxide**. Sandpaper removes it, so the acid reaches the metal **straight away**.',
      },
      {
        tone: 'write',
        text: '**Excess:** more than enough. The acid is **in excess**, so **all** the magnesium reacts and some acid is left over.',
      },
      {
        tone: 'info', badge: 'Stopper in at once',
        text: 'Hydrogen made before the flask is sealed **escapes** into the air and is never measured.',
      },
      {
        tone: 'info', badge: 'Clock at the same moment',
        text: 'Every reading must be timed from the **real start** of the reaction.',
      },
      {
        tone: 'info', badge: 'Regular intervals',
        text: 'Equal gaps — every minute — let you compare one minute with the next.',
      },
      {
        tone: 'info', badge: 'Stop when nothing changes',
        text: 'When the volume is the **same** for two or three readings, the reaction is **complete**.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Why must the stopper and syringe go in immediately after the magnesium is added?',
      options: [
        { val: 'A', text: 'So that the acid does not evaporate' },
        { val: 'B', text: 'So that the reaction goes faster' },
        { val: 'C', text: 'So that the stopclock does not need to be started' },
        { val: 'D', text: 'So that no hydrogen escapes before it can be collected' },
      ],
      correct: 'D',
      expEn: 'The gas starts the instant the magnesium touches the acid. Any hydrogen made before the flask is sealed escapes, so every volume you read would be too low.',
    },
  },

  // ── 12 · The results table ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Clock',
    eyebrow: 'One run of the experiment',
    title: 'The Results Table',
    ratio: 44,
    inlineSvg: DIAGRAMS.RESULTS_TABLE,
    content:
      'This run used a **longer** piece of magnesium than your book\'s, so it made more gas.\n\n' +
      'The volume goes **up every minute** until 6 minutes, then stays at **60 cm³**. The reaction is **complete** when the volume **stops changing**.',
    notes: [
      {
        tone: 'plant',
        text: 'A table heading gives the **quantity / unit**: "Time / min" means time, measured in minutes. The cells hold **numbers only**.',
      },
    ],
    check: {
      id: 'c6',
      q: 'In this run, how do you know that the reaction was over after 6 minutes?',
      options: [
        { val: 'A', text: 'The gas syringe was full' },
        { val: 'B', text: 'The table ends at 8 minutes' },
        { val: 'C', text: 'The volume stopped changing: 60, 60, 60' },
      ],
      correct: 'C',
      expEn: 'When no more gas is made, the reading stays the same. From 6 minutes on it is 60 cm³ every time, so the reaction finished at 6 minutes. The student simply kept watching until 8.',
    },
  },

  // ── 13 · Predict: what happens to the rate? ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'No graph yet — just predict',
    title: 'What Happens to the Rate?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'The magnesium is being **used up** the whole time. What do you think happens to the **rate** — the gas made each minute — as the reaction goes on?',
    activity: {
      id: 'a5', type: 'predict',
      prompt: 'As the reaction goes on, the rate…',
      options: [
        { val: 'same', name: 'stays the same until the end' },
        { val: 'up', name: 'speeds up' },
        { val: 'down', name: 'is fastest at the start, then slows down until it stops' },
        { val: 'jump', name: 'speeds up, then suddenly stops' },
      ],
      correct: 'down',
      explain: 'Look at the table: **20 cm³** in the first minute, only **14 cm³** in the second, **11 cm³** in the third … The rate is **greatest at the start** and falls as the reaction goes on. The graph on the next slide shows it at a glance.',
    },
  },

  // ── 14 · Drawing and reading the graph (estimate) ───────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'LineChart',
    title: 'Drawing the Graph',
    ratio: 46,
    inlineSvg: DIAGRAMS.RATE_CURVE,
    drawThis: true,
    content:
      '**Time** goes along the bottom, **volume of gas** up the side, each with its unit. Plot the readings, then join them with one **smooth curve** — not a zigzag.\n\n' +
      'To read a value, find the time, go **straight up** to the curve, then **straight across** to the volume axis.',
    notes: [
      {
        tone: 'write',
        text: '**Reading a volume from the graph:** up from the time, across to the volume.',
      },
    ],
    activity: {
      id: 'a6', type: 'estimate',
      prompt: 'Up from 1.5 minutes, across to the volume. About how much hydrogen had been collected after 1.5 minutes?',
      min: 0, max: 70, step: 1, unit: 'cm³', answer: 28, tolerance: 0.1,
      explain: '1.5 minutes is halfway between the 1 and the 2. Straight up from there, the curve is between the 25 and 30 gridlines — about **28 cm³**. That sits between the 1-minute reading (20) and the 2-minute reading (34), as it must.',
    },
  },

  // ── 15 · Three things the curve tells you ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TrendingUp',
    title: 'Three Things the Curve Tells You',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.CURVE_THREE_PARTS,
    drawThis: true,
    content:
      '> **1. Steepest at the start** — the reaction is **fastest**.\n' +
      '> **2. Less steep** — the reaction is **slowing down**.\n' +
      '> **3. Flat** — no more gas: the reaction is **over**.\n\n' +
      'Why does it slow down? The magnesium is being **used up**, so **fewer** magnesium particles are left to react.',
    notes: [
      {
        tone: 'write',
        text: '**The faster the reaction, the steeper the curve.** The rate is greatest at the start, then decreases. Flat = the reaction is **over**.',
      },
    ],
    check: {
      id: 'c7',
      q: 'On a volume–time graph, the curve has gone flat. What does that tell you?',
      options: [
        { val: 'A', text: 'The reaction is at its fastest' },
        { val: 'B', text: 'The reaction has stopped: no more gas is being made' },
        { val: 'C', text: 'The gas is now being made at a steady rate' },
      ],
      correct: 'B',
      expEn: 'Flat means the volume is not going up at all, so no gas is being made — the reaction is over. The fastest part is the STEEPEST part, at the start.',
    },
  },

  // ── 16 · The rate in one minute ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'The rate in a given minute',
    title: 'The Rate in One Minute',
    content:
      'How much gas was made **during** one minute? Use two readings:\n\n' +
      '> **the minute\'s rate = end reading − start reading**\n\n' +
      'Your book\'s run: first minute $14 - 0 = 14$ cm³/min, second $25 - 14 = 11$ cm³/min, third $33 - 25 = 8$ cm³/min. The rate falls every minute.\n\n' +
      'Our run: the **third** minute runs from **2 to 3** minutes, so $45 - 34 = 11$ cm³/min.',
    notes: [
      {
        tone: 'write',
        text: '**Rate in a given minute** = the reading at the **end** of that minute − the reading at the **start** of it.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Use our run: 53 cm³ at 4 minutes, 58 cm³ at 5 minutes. What was the rate during the FIFTH minute?',
      options: [
        { val: 'A', text: '58 cm³/min' },
        { val: 'B', text: '53 cm³/min' },
        { val: 'C', text: '11.6 cm³/min' },
        { val: 'D', text: '5 cm³/min' },
      ],
      correct: 'D',
      expEn: 'The fifth minute runs from 4 to 5 minutes: end reading − start reading = 58 − 53 = 5 cm³/min. 58 is the total so far, not the gas made in that minute, and 58 ÷ 5 is an average over five minutes.',
    },
  },

  // ── 17 · The average rate ──────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Divide',
    title: 'The Average Rate',
    content:
      'The rate keeps changing, so one number for the whole reaction helps: the **average rate**.\n\n' +
      '> **average rate = total volume of gas ÷ total time the reaction took**\n\n' +
      'Your book\'s run: $40 \\div 5 = 8$ cm³/min. Our run: $60 \\div 6 = 10$ cm³/min.\n\n' +
      'Use the time the reaction **finished** — where the volume stopped changing — not the last time in the table.',
    notes: [
      {
        tone: 'write',
        text: '**Average rate** = total amount of product ÷ total time for the reaction. Volume **on top**, time **underneath**.',
      },
    ],
    check: {
      id: 'c9',
      q: 'Zinc in excess acid: 36 cm³ of hydrogen in total. The reading stopped changing at 4 minutes, but the student kept watching until 6 minutes. What is the average rate?',
      options: [
        { val: 'A', text: '6 cm³/min' },
        { val: 'B', text: '0.11 min/cm³' },
        { val: 'C', text: '9 cm³/min' },
        { val: 'D', text: '144 cm³/min' },
      ],
      correct: 'C',
      expEn: 'The reaction took 4 minutes, so 36 ÷ 4 = 9 cm³/min. Dividing by 6 uses the time the student stopped watching; 4 ÷ 36 puts the time on top; 144 multiplies instead of dividing.',
    },
  },

  // ── 18 · Units ─────────────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Saying the Units Out Loud',
    columns: [
      {
        heading: 'Measuring a gas',
        accent: INDIGO,
        icon: 'Wind',
        content:
          '**cm³/min** — "cubic centimetres **per** minute"\n\n' +
          '**cm³/s** — "cubic centimetres **per** second"\n\n' +
          'The slash is read **per**, and **per** means **in each**.',
        notes: [
          {
            tone: 'write',
            text: '**Unit of a rate** = unit of the amount / unit of time. The **time** always goes **under** the slash.',
          },
        ],
      },
      {
        heading: 'Measuring a mass',
        accent: GREEN,
        icon: 'Scale',
        content:
          '**g/min** — "grams **per** minute"\n\n' +
          '**g/s** — "grams **per** second"\n\n' +
          'Choose the unit from what you **measured**: a volume gives cm³, a mass gives g.',
      },
    ],
    check: {
      id: 'c10',
      q: 'A student weighs a flask every 30 seconds as carbon dioxide escapes. Which unit suits the rate?',
      options: [
        { val: 'A', text: 'cm³' },
        { val: 'B', text: 's/g' },
        { val: 'C', text: 'g/s' },
        { val: 'D', text: 'cm³/s' },
      ],
      correct: 'C',
      expEn: 'The student measured a MASS against TIME in seconds, so the rate is grams per second, g/s. cm³ has no time in it; s/g is upside down; cm³/s would be right only for a volume.',
    },
  },

  // ── 19 · The second method: loss of mass ────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Scale',
    eyebrow: 'From book spread 9.4',
    title: 'A Second Method: Loss of Mass',
    ratio: 48,
    inlineSvg: DIAGRAMS.MASS_LOSS_RIG,
    drawThis: true,
    content:
      'Marble chips (calcium carbonate) give off carbon dioxide with dilute hydrochloric acid:\n\n' +
      '> $\\text{CaCO}_3(\\text{s}) + 2\\text{HCl}(\\text{aq}) \\rightarrow \\text{CaCl}_2(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l}) + \\text{CO}_2(\\text{g})$\n\n' +
      'Stand the flask on a **balance**. As the gas **escapes**, the flask gets **lighter**. The **cotton wool plug** lets the gas out but stops acid **spraying** out.',
    notes: [
      {
        tone: 'write',
        text: '**Loss of mass method:** weigh the flask at regular intervals. **Loss in mass = mass at the start − mass at that time.** The rate is in **g/min** or **g/s**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'What is the cotton wool plug in the neck of the flask for?',
      options: [
        { val: 'A', text: 'It traps the carbon dioxide, so none is lost' },
        { val: 'B', text: 'It soaks up the acid, so the reaction stops' },
        { val: 'C', text: 'It lets the gas out but stops drops of acid spraying out' },
      ],
      correct: 'C',
      expEn: 'The gas MUST escape — that is what makes the mass fall. A bung would trap it and the reading would not change. The cotton wool lets the gas through but catches acid spray, which would add to the loss and make the rate look too high.',
    },
  },

  // ── 20 · Why not weigh hydrogen? ───────────────────────────────────────────
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Weight',
    eyebrow: 'Choosing the method',
    title: 'Why Not Weigh the Hydrogen?',
    content:
      'The balance method works well for carbon dioxide, because it is a **heavy** gas: the flask loses a mass you can see.\n\n' +
      'Hydrogen is the **lightest** gas of all. The same volume of carbon dioxide is **22 times** heavier. So for magnesium and acid, the balance reading hardly moves.\n\n' +
      '> **A heavy gas:** balance or gas syringe. **A very light gas like hydrogen:** gas syringe.',
    check: {
      id: 'c12',
      q: 'Why is the balance method a poor way to follow magnesium reacting with hydrochloric acid?',
      options: [
        { val: 'A', text: 'Hydrogen is very light, so the loss in mass is too small to measure well' },
        { val: 'B', text: 'Hydrogen cannot pass through cotton wool' },
        { val: 'C', text: 'The flask gets heavier as the hydrogen forms' },
      ],
      correct: 'A',
      expEn: 'Hydrogen is so light that the drop in mass is tiny — far harder to measure than the drop for carbon dioxide. Hydrogen passes through cotton wool easily, and a flask that gives off a gas can only get lighter. Collect hydrogen in a gas syringe instead.',
    },
  },

  // ── 21 · Sources of error ──────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: RED,
    icon: 'AlertTriangle',
    columns: 2,
    eyebrow: 'Name the error, then say what it does',
    title: 'Sources of Error',
    content: 'A **source of error** makes a reading differ from the true value. A good answer names the error **and** says what it does to the results.',
    notes: [
      {
        tone: 'homework', badge: 'Gas lost at the start',
        text: 'The stopper goes in late, so some hydrogen escapes. **Every volume reads too low.**',
      },
      {
        tone: 'homework', badge: 'Clock started late',
        text: 'Each time is written down too small, so the average rate comes out **too high**.',
      },
      {
        tone: 'homework', badge: 'Oxide coat left on',
        text: 'Magnesium that was not cleaned starts **slowly**, so the first readings are too low.',
      },
      {
        tone: 'homework', badge: 'Sticking plunger',
        text: 'The plunger sticks, then jumps, so the readings rise in **steps**, not smoothly.',
      },
      {
        tone: 'homework', badge: 'Reading late',
        text: 'The volume keeps changing while you read it. Read **exactly** on the time.',
      },
      {
        tone: 'homework', badge: 'Acid spray (balance)',
        text: 'Drops thrown out of the flask add to the mass lost, so the rate looks **too high**.',
      },
    ],
    check: {
      id: 'c13',
      q: 'A student put the stopper in five seconds after dropping the magnesium into the acid. What effect does this have on the results?',
      options: [
        { val: 'A', text: 'The volumes are too high, because air gets into the syringe' },
        { val: 'B', text: 'Some hydrogen escaped, so the volumes are too low' },
        { val: 'C', text: 'No effect: the hydrogen made early still reaches the syringe' },
      ],
      correct: 'B',
      expEn: 'Before the flask is sealed, the hydrogen that forms goes straight into the room. It never reaches the syringe, so every reading is lower than the true volume made.',
    },
  },

  // ── 22 · Recap ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Eight?',
    content:
      '> Your notebook should now have **10 write-this-down notes**, **2 apparatus drawings** and **2 graphs**. Next unit: what can you **change** to make a reaction faster?',
    items: [
      { text: 'Say what **rate** means, with an everyday example.' },
      { text: 'Define the **rate of a reaction** in two ways.' },
      { text: 'Say why a **gas** is the easiest thing to measure.' },
      { text: 'Label the **gas syringe** apparatus and give a reason for each step.' },
      { text: 'Describe the **loss of mass** method, and why it is poor for hydrogen.' },
      { text: 'Read a graph: **up from the time, across to the volume**; steep, less steep, flat.' },
      { text: 'Work out the **rate in one minute** and the **average rate**, with units.' },
      { text: 'Name a **source of error** and say what it does to the results.' },
    ],
    check: {
      id: 'c14',
      q: 'Two runs are drawn on one graph. Which is the best evidence that run X was faster than run Y?',
      options: [
        { val: 'A', text: 'The curve for X is steeper at the start' },
        { val: 'B', text: 'The curve for X ends higher up' },
        { val: 'C', text: 'The curve for X was drawn in a darker colour' },
      ],
      correct: 'A',
      expEn: 'Speed shows in the STEEPNESS: the faster the reaction, the steeper the curve. How high a curve ends tells you how MUCH gas was made, not how fast. Next unit uses exactly this to compare runs.',
    },
  },
];
