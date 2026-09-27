// src/data/IGCSE_CHEM/M06_4B/notes.js
// 6.4 Making Salts: Titration Calculations — book spread 11.8 "Finding
// concentration by titration" (pages 142–143), with a short recap of 11.6
// (titration as a method, taught in M06_4A). English only (IGCSE_CHEM is not
// bilingual), so there are no `*Vn` twins anywhere.
//
// A CALCULATION unit, built like M05_2: one method, named the same way every
// time, in the order the Titration Bench task (TITRATION) walks it:
//   read the burette (final − initial) → change cm³ to dm³ →
//   Step 1 moles of the solution you know (concentration × volume) →
//   Step 2 the ratio from the equation → Step 3 moles of the other solution →
//   Step 4 its concentration (moles ÷ volume in dm³).
// The spine: opener → recap of the titration (Core) → what each piece of
// apparatus is for → the end-point → reading the burette, then tapping where
// to read it → EXTENDED from here: concentration and the standard solution →
// cm³ to dm³ → the triangle → the four steps → the English of a titration
// question → the book's first worked example (PREDICTED before it is worked),
// one step per slide → the vinegar example → why a weak acid still reacts
// completely → the method in order → finding a volume → the other way round →
// a countable recap.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its
// slide — the audio generator narrates every field before it and stops there.
// Titles are read aloud, so no bare formulae or units go in them. Equations
// are KaTeX ($…$) with \text{} keeping element symbols upright; units in
// prose stay Unicode (cm³, mol/dm³).
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const ACID = '#c8102e';
const ALKALI = '#4338ca';
const NEUTRAL = '#2f8f5b';
const INDIGO = '#3730a3';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ACID,
    icon: 'Calculator',
    brand: 'IGCSE Chemistry',
    eyebrow: 'Module 6 · Topic 6.4 Making salts · spread 11.8',
    title: 'Finding a Concentration by Titration',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'Vinegar contains **ethanoic acid** — but how much? You have a burette, an alkali of known strength and an indicator. In one sentence: how could you find out?',
    },
  },

  // ── 2 · Recap of 11.6: what a titration is ─────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'FlaskConical',
    eyebrow: 'Recap from topic 6.4 · making salts',
    title: 'What a Titration Is',
    ratio: 55,
    inlineSvg: DIAGRAMS.TITRATION_RIG,
    drawThis: true,
    content:
      'One solution is added to another **a little at a time** until the reaction is just complete. An **indicator** shows when.\n\n' +
      'You used it to make a salt from an **alkali**. Now it has a new job: finding a **concentration**.',
    notes: [
      {
        tone: 'write',
        text: '**Titration:** adding one solution to another a little at a time, with an indicator, to find how much is needed to react.',
      },
    ],
    check: {
      id: 'c1',
      q: 'When you make a salt from an acid and an ALKALI, why do you do a titration first?',
      options: [
        { val: 'A', text: 'To make the reaction go faster' },
        { val: 'B', text: 'Both reactants dissolve, so any excess cannot be filtered off — the titration finds the exact amounts' },
        { val: 'C', text: 'To remove the water from the salt' },
      ],
      correct: 'B',
      expEn: 'An insoluble base can be added in excess and filtered off. An alkali dissolves, so an excess would stay mixed with the salt. The titration tells you exactly how much acid reacts with the alkali, with nothing left over.',
    },
  },

  // ── 3 · What each piece of apparatus is for ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Beaker',
    eyebrow: 'The apparatus',
    title: 'What Each Piece Is For',
    content:
      'Every piece of the apparatus has **one job**.\n\n' +
      '> Two of them **measure volumes** exactly.\n' +
      '> One is where the **reaction happens**.\n' +
      '> Two help you **spot the end-point**.',
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Sort each piece of apparatus by its job.',
      bins: [
        { id: 'measure', name: 'Measures a volume exactly' },
        { id: 'react', name: 'Holds the reaction' },
        { id: 'see', name: 'Helps you spot the end-point' },
      ],
      cards: [
        { id: 'pipette', name: 'volumetric pipette', bin: 'measure' },
        { id: 'burette', name: 'burette', bin: 'measure' },
        { id: 'flask', name: 'conical flask', bin: 'react' },
        { id: 'indicator', name: 'indicator', bin: 'see' },
        { id: 'tile', name: 'white tile', bin: 'see' },
      ],
      explain: 'The **volumetric pipette** measures one exact volume (25.0 cm³) into the flask; the **burette** measures how much is added from it. The **conical flask** holds the mixture and can be swirled without spilling. The **indicator** changes colour at the end-point, and the **white tile** makes that change easy to see.',
    },
  },

  // ── 4 · The end-point ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'The end-point',
    title: 'One Drop Changes the Colour',
    content:
      'In the book\'s example the alkali is in the flask with **methyl orange**, which is **yellow** in the alkali.\n\n' +
      'Drip the acid in slowly and **keep swirling**. Stop when **a single drop** finally turns the indicator **red**. Neutralisation is complete.',
    notes: [
      {
        tone: 'write',
        text: '**End-point:** the point where the indicator changes colour, because the reaction is just complete.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Acid is dripped into an alkali with methyl orange. When should you stop adding acid?',
      options: [
        { val: 'A', text: 'As soon as the first drop of acid goes in' },
        { val: 'B', text: 'When a single drop turns the whole solution red' },
        { val: 'C', text: 'When the burette is empty' },
      ],
      correct: 'B',
      expEn: 'The end-point is the drop that finally changes the colour for good. Stopping early leaves alkali unreacted; running the burette empty adds far too much acid.',
    },
  },

  // ── 5 · Reading the burette ────────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Ruler',
    eyebrow: 'Book spread 11.8 · the burette',
    title: 'Final Reading Minus Initial Reading',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.BURETTE_READINGS,
    drawThis: true,
    content:
      'A burette is numbered **down** the tube, so the reading goes **up** as acid runs out.\n\n' +
      'Read it **before** and **after**. The liquid curves at the top — read the **bottom of the curve**, with your eye level with it.',
    notes: [
      {
        tone: 'write',
        text: '**Volume used = final reading − initial reading.** Read the bottom of the **meniscus** (the curved surface), at eye level.',
      },
    ],
    check: {
      id: 'c3',
      q: 'A burette reads 2.5 cm³ at the start and 21.3 cm³ at the end-point. What volume of acid was added?',
      options: [
        { val: 'A', text: '23.8 cm³' },
        { val: 'B', text: '21.3 cm³' },
        { val: 'C', text: '18.8 cm³' },
      ],
      correct: 'C',
      expEn: 'Final − initial = 21.3 − 2.5 = 18.8 cm³. Answer A added the two readings; answer B used the final reading alone, as if the burette had started at zero.',
    },
  },

  // ── 6 · Tap where you read it ──────────────────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'Crosshair',
    eyebrow: 'Reading the burette · close up',
    title: 'Where Do You Read the Level?',
    content:
      'Here is a burette close up. Acid **clings to the glass**, so its surface is not flat: it curves **up** at the edges.\n\n' +
      'That curve is the **meniscus**. Only one point on it gives the right reading.',
    activity: {
      id: 'a2',
      type: 'hotspot',
      prompt: 'Tap the point you read the burette at.',
      svg: DIAGRAMS.BURETTE_METER,
      viewBox: '0 0 420 300',
      targets: [
        { id: 'bottom', x: 210, y: 162, r: 16, name: 'the bottom of the meniscus' },
        { id: 'edgeL', x: 167, y: 140, r: 12, name: 'where the liquid meets the glass' },
        { id: 'edgeR', x: 253, y: 140, r: 12, name: 'where the liquid meets the glass' },
        { id: 'deep', x: 210, y: 236, r: 18, name: 'inside the liquid' },
      ],
      correct: 'bottom',
      explain: 'Read the **bottom of the meniscus**, with your eye level with it. Here it sits on **15.1 cm³** — one small mark past 15. The edges climb the glass, so reading there gives about 14.9 cm³, which is wrong.',
    },
  },

  // ── 7 · EXTENDED: concentration and the standard solution ──────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'Scale',
    eyebrow: 'Extended · Concentration',
    title: 'Moles in Every Cubic Decimetre',
    content:
      'The **concentration** of a solution is the number of **moles** dissolved in each **dm³** (cubic decimetre). Its unit is **mol/dm³**.\n\n' +
      'The solution whose concentration you **know** is the **standard solution**. You titrate the other one **against** it.',
    notes: [
      {
        tone: 'write',
        text: '**Concentration:** the moles of a substance dissolved in 1 dm³ of solution, in **mol/dm³**. **Standard solution:** a solution of known concentration.',
      },
    ],
    check: {
      id: 'c4',
      q: 'A solution of potassium hydroxide has a concentration of 2 mol/dm³. What does this mean?',
      options: [
        { val: 'A', text: '2 moles of potassium hydroxide are dissolved in every 1 dm³ of solution' },
        { val: 'B', text: '1 mole of potassium hydroxide is dissolved in every 2 dm³ of solution' },
        { val: 'C', text: '2 moles of potassium hydroxide are dissolved in every 1 cm³ of solution' },
      ],
      correct: 'A',
      expEn: 'mol/dm³ means "moles per dm³": 2 mol/dm³ is 2 moles in each dm³. Answer B turns it upside down (that would be 0.5 mol/dm³); answer C confuses dm³ with cm³, which is a thousand times smaller.',
    },
  },

  // ── 8 · EXTENDED: cm³ into dm³ ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Box',
    eyebrow: 'Extended · Volumes',
    title: 'Changing Cubic Centimetres into Cubic Decimetres',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.CONVERSION_STRIP,
    drawThis: true,
    content:
      'Burettes and pipettes measure in **cm³**. Concentration is per **dm³**. So change every volume into dm³ **before** you use it.\n\n' +
      'A 10 cm cube holds **1000 cm³**, and that is **1 dm³**.',
    notes: [
      {
        tone: 'write',
        text: '**1000 cm³ = 1 dm³.** To change cm³ into dm³, **divide by 1000**: move the decimal point 3 places left.',
      },
    ],
    activity: {
      id: 'a3',
      type: 'estimate',
      prompt: 'How many dm³ is 250 cm³? Slide to your answer.',
      min: 0, max: 2.5, step: 0.05, unit: 'dm³', answer: 0.25, tolerance: 0.1,
      explain: '250 ÷ 1000 = **0.25 dm³**. If you landed on 2.5, you divided by 100 — there are **1000** cm³ in a dm³, so the point moves **three** places.',
    },
  },

  // ── 9 · EXTENDED: the calculation triangle ─────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'Extended · The calculation triangle',
    title: 'Cover What You Want to Find',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.CALC_TRIANGLE,
    drawThis: true,
    content:
      'Moles, concentration and volume are joined by one rule. Cover the one you want with your finger; the other two show how to work it out.\n\n' +
      'The volume is **always in dm³**.',
    notes: [
      {
        tone: 'write',
        text: '**moles = concentration × volume** (in dm³). **concentration = moles ÷ volume.** **volume = moles ÷ concentration.**',
      },
    ],
    check: {
      id: 'c5',
      q: 'You cover "concentration" on the triangle. What is left?',
      options: [
        { val: 'A', text: 'moles × volume' },
        { val: 'B', text: 'volume ÷ moles' },
        { val: 'C', text: 'moles ÷ volume' },
      ],
      correct: 'C',
      expEn: 'Moles sits on top of volume, and a line on top of another means divide: concentration = moles ÷ volume. You only multiply the two on the bottom row.',
    },
  },

  // ── 10 · EXTENDED: the four steps ──────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ListChecks',
    eyebrow: 'Extended · The method',
    title: 'Four Steps, Always in This Order',
    ratio: 55,
    side: 'left',
    inlineSvg: DIAGRAMS.FOUR_STEPS,
    content:
      'Read the burette and change cm³ to dm³ first. Then the four steps, in the order the Titration Bench task uses.\n\n' +
      'Always **start from the solution you know**: its concentration **and** volume are given.',
    notes: [
      {
        tone: 'write',
        text: '**1** moles of the solution you know · **2** the ratio from the equation · **3** moles of the other solution · **4** its concentration = moles ÷ volume in dm³.',
      },
    ],
    check: {
      id: 'c6',
      q: 'What do you need for Step 2, the ratio?',
      options: [
        { val: 'A', text: 'The balanced equation for the reaction' },
        { val: 'B', text: 'The two burette readings' },
        { val: 'C', text: 'The two concentrations' },
      ],
      correct: 'A',
      expEn: 'The ratio is read from the big numbers in front of the formulae in the balanced equation. The burette readings give a volume, and one of the two concentrations is the thing you are trying to find.',
    },
  },

  // ── 11 · Every class is an English class ───────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Reading a Titration Question',
    content:
      'A titration question hides its numbers in long sentences. Find each one by its **unit**:\n\n' +
      '> **cm³** or **dm³** — a volume\n' +
      '> **mol/dm³** — a concentration\n' +
      '> the **big numbers** in the equation — the ratio',
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'What does each part of a question give you?',
      bins: [
        { id: 'vol', name: 'A volume' },
        { id: 'conc', name: 'A concentration' },
        { id: 'ratio', name: 'The ratio' },
      ],
      cards: [
        { id: 'pip', name: '25.0 cm³ of alkali was pipetted', bin: 'vol' },
        { id: 'needed', name: '18.6 cm³ of acid was needed', bin: 'vol' },
        { id: 'sol', name: 'nitric acid, 0.2 mol/dm³', bin: 'conc' },
        { id: 'std', name: 'a 0.5 mol/dm³ standard solution', bin: 'conc' },
        { id: 'eq', name: 'H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O', bin: 'ratio' },
        { id: 'words', name: '1 mole of acid to 2 of alkali', bin: 'ratio' },
      ],
      explain: 'Look at the unit. **cm³** is always a volume. **mol/dm³** is always a concentration, even when the words around it are "standard solution". The **equation**, or a sentence about moles reacting, gives the ratio.',
    },
  },

  // ── 12 · Worked example 1: the titration, then predict ─────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Extended · Worked example 1 · the titration',
    title: 'Hydrochloric Acid Against Sodium Carbonate',
    dense: true,
    content: '> Find the concentration of some hydrochloric acid, using 1 mol/dm³ sodium carbonate solution.',
    steps: [
      { text: 'Pipette **25 cm³** of the sodium carbonate into a flask, with methyl orange (yellow).' },
      { text: 'Fill the burette with the acid. **Initial reading: 1.0 cm³.**' },
      { text: 'Add acid, swirling, until one drop turns it red. **Final reading: 28.8 cm³.**' },
      { text: 'Volume of acid used = 28.8 − 1.0 = **27.8 cm³**.' },
    ],
    activity: {
      id: 'a5',
      type: 'predict',
      prompt: '25 cm³ of the 1 mol/dm³ alkali needed 27.8 cm³ of acid. So is the acid more or less concentrated than the alkali?',
      options: [
        { val: 'less', name: 'Less concentrated — it took MORE acid than alkali' },
        { val: 'same', name: 'About the same — the two volumes are close' },
        { val: 'more', name: 'More concentrated — once you know the equation' },
      ],
      correct: 'more',
      explain: 'It looks weaker, because it took more acid. But one sodium carbonate needs **two** HCl, so the acid had to supply **twice** the moles. The next three slides prove it: **1.8 mol/dm³**, stronger than the alkali.',
    },
  },

  // ── 13 · Worked example 1: step 1 ──────────────────────────────────────
  {
    layout: 'callout',
    accent: ALKALI,
    icon: 'Hash',
    eyebrow: 'Extended · Worked example 1 · Step 1',
    title: 'Moles of the Solution You Know',
    content:
      'You know the **sodium carbonate**: its concentration (1 mol/dm³) **and** its volume (25 cm³). So start there.\n\n' +
      '> 25 cm³ = 25 ÷ 1000 = **0.025 dm³**\n' +
      '> moles = concentration × volume = 1 × 0.025 = **0.025 mol** of sodium carbonate',
    check: {
      id: 'c7',
      q: 'Why does Step 1 use the sodium carbonate, and not the acid?',
      options: [
        { val: 'A', text: 'Because it is in the flask, and Step 1 always uses the flask' },
        { val: 'B', text: 'Because its concentration AND its volume are both known' },
        { val: 'C', text: 'Because its volume is the bigger one' },
      ],
      correct: 'B',
      expEn: 'moles = concentration × volume needs both numbers. Only the sodium carbonate has both; the acid\'s concentration is what you are finding. Where it sits does not matter — "the other way round", the known solution is in the burette.',
    },
  },

  // ── 14 · Worked example 1: steps 2 and 3 ───────────────────────────────
  {
    layout: 'split',
    accent: ACID,
    icon: 'ArrowLeftRight',
    eyebrow: 'Extended · Worked example 1 · Steps 2 and 3',
    title: 'The Ratio, Then the Moles of Acid',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.RATIO_PICTURE,
    drawThis: true,
    content:
      '**Step 2:** the equation has **2** in front of HCl and **1** in front of $\\text{Na}_2\\text{CO}_3$. The ratio is 2 moles of acid to 1 mole of alkali.\n\n' +
      '**Step 3:** 1 mole of alkali neutralises 2 moles of acid, so the moles of acid are **twice** the moles of alkali.',
    check: {
      id: 'c8',
      q: '0.025 mol of sodium carbonate reacts. How many moles of hydrochloric acid did it neutralise?',
      options: [
        { val: 'A', text: '0.0125 mol' },
        { val: 'B', text: '0.025 mol' },
        { val: 'C', text: '0.05 mol' },
      ],
      correct: 'C',
      expEn: 'Two HCl for every one Na₂CO₃: 2 × 0.025 = 0.05 mol. Answer A used the ratio upside down (halved); answer B ignored the ratio, as if it were 1 : 1.',
    },
  },

  // ── 15 · Worked example 1: step 4 ──────────────────────────────────────
  {
    layout: 'callout',
    accent: ACID,
    icon: 'Divide',
    eyebrow: 'Extended · Worked example 1 · Step 4',
    title: 'Its Concentration',
    content:
      'The acid\'s volume was **27.8 cm³ = 0.0278 dm³**.\n\n' +
      '> concentration = moles ÷ volume in dm³ = 0.05 ÷ 0.0278 = **1.8 mol/dm³**\n\n' +
      'The acid **is** more concentrated than the 1 mol/dm³ alkali — even though more of it was needed. The ratio made the difference.',
    check: {
      id: 'c9',
      q: 'Which calculation gives the concentration of the acid?',
      options: [
        { val: 'A', text: '0.05 ÷ 27.8' },
        { val: 'B', text: '0.05 ÷ 0.0278' },
        { val: 'C', text: '0.0278 ÷ 0.05' },
      ],
      correct: 'B',
      expEn: 'Moles ÷ volume, with the volume in dm³: 0.05 ÷ 0.0278 = 1.8 mol/dm³. Answer A left the volume in cm³ and gives an answer 1000 times too small; answer C divides the wrong way round.',
    },
  },

  // ── 16 · Worked example 2: vinegar ─────────────────────────────────────
  {
    layout: 'steps',
    accent: NEUTRAL,
    icon: 'Droplet',
    eyebrow: 'Extended · Worked example 2 · vinegar',
    title: 'How Much Acid Is in Vinegar?',
    dense: true,
    content: '> 25 cm³ of vinegar was neutralised by 20 cm³ of 1 mol/dm³ sodium hydroxide. $\\text{CH}_3\\text{COOH}(\\text{aq}) + \\text{NaOH}(\\text{aq}) \\rightarrow \\text{CH}_3\\text{COONa}(\\text{aq}) + \\text{H}_2\\text{O}(\\text{l})$',
    steps: [
      { text: '**Step 1** — you know the alkali: 20 cm³ = 0.020 dm³, so 1 × 0.020 = **0.02 mol** of sodium hydroxide.' },
      { text: '**Step 2** — 1 mole of acid to 1 mole of alkali: a **1 : 1** ratio.' },
      { text: '**Step 3** — so **0.02 mol** of ethanoic acid was neutralised.' },
      { text: '**Step 4** — 25 cm³ = 0.025 dm³, so 0.02 ÷ 0.025 = **0.8 mol/dm³**.' },
    ],
    check: {
      id: 'c10',
      q: 'Another vinegar needs 40 cm³ of the same alkali for 25 cm³. What is its concentration?',
      options: [
        { val: 'A', text: '0.4 mol/dm³' },
        { val: 'B', text: '1.6 mol/dm³' },
        { val: 'C', text: '0.8 mol/dm³' },
      ],
      correct: 'B',
      expEn: 'Twice the alkali means twice the moles of acid (0.04 mol) in the same 0.025 dm³: 0.04 ÷ 0.025 = 1.6 mol/dm³. Answer A halved it — more alkali needed means MORE acid, not less.',
    },
  },

  // ── 17 · EXTENDED: a weak acid still reacts completely ─────────────────
  {
    layout: 'split',
    accent: NEUTRAL,
    icon: 'Repeat',
    eyebrow: 'Extended · A weak acid',
    title: 'Why a Weak Acid Still Reacts Completely',
    ratio: 50,
    inlineSvg: DIAGRAMS.WEAK_ACID,
    content:
      'Ethanoic acid is a **weak** acid: only a few of its molecules are **dissociated** into ions at any time.\n\n' +
      'But as the alkali uses up the $\\text{H}^{+}$ ions, **more molecules dissociate** — until all of the acid has reacted.',
    notes: [
      {
        tone: 'write',
        text: 'A titration measures **all** of a weak acid, because more molecules dissociate as the $\\text{H}^{+}$ ions are used up.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Only a few ethanoic acid molecules are ionised at a time. Why does the titration still measure ALL of the acid?',
      options: [
        { val: 'A', text: 'The alkali reacts with the molecules without needing any H⁺ ions' },
        { val: 'B', text: 'It does not — a titration only measures the ions present at the start' },
        { val: 'C', text: 'As the H⁺ ions are used up, more molecules dissociate, until all the acid has reacted' },
      ],
      correct: 'C',
      expEn: 'The OH⁻ ions remove H⁺ ions as water, and more ethanoic acid molecules then dissociate to replace them. This carries on until every molecule has reacted, so the end-point counts all of the acid.',
    },
  },

  // ── 18 · The whole method, in order ────────────────────────────────────
  {
    layout: 'callout',
    accent: INDIGO,
    icon: 'ListChecks',
    eyebrow: 'Put it together',
    title: 'One Method, One Order',
    content:
      'Both worked examples used the **same method in the same order**. So will every titration question — and the Titration Bench task.\n\n' +
      'Put the whole method in order before you move on.',
    activity: {
      id: 'a6',
      type: 'order',
      prompt: 'Put the method in order, from the burette to the answer.',
      steps: [
        { id: 'read', name: 'Read the burette: final reading − initial reading' },
        { id: 'dm3', name: 'Change the volumes from cm³ to dm³' },
        { id: 's1', name: 'Step 1: moles of the solution you know = concentration × volume' },
        { id: 's2', name: 'Step 2: the ratio from the balanced equation' },
        { id: 's3', name: 'Step 3: moles of the other solution, using the ratio' },
        { id: 's4', name: 'Step 4: its concentration = moles ÷ volume in dm³' },
      ],
      explain: '**Read** the burette → **cm³ to dm³** → **moles** of what you know → the **ratio** → moles of the **other** solution → **concentration**. You cannot use the ratio until you have some moles to use it on.',
    },
  },

  // ── 19 · EXTENDED: finding a volume instead ────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Beaker',
    eyebrow: 'Extended · Finding a volume',
    title: 'When Both Concentrations Are Known',
    dense: true,
    content: '> What volume of 0.4 mol/dm³ nitric acid neutralises 20.0 cm³ of 0.3 mol/dm³ potassium hydroxide?',
    steps: [
      { text: '**Step 1** — 20.0 cm³ = 0.020 dm³, so 0.3 × 0.020 = **0.006 mol** of potassium hydroxide.' },
      { text: '**Steps 2 and 3** — $\\text{HNO}_3 + \\text{KOH} \\rightarrow \\text{KNO}_3 + \\text{H}_2\\text{O}$ is **1 : 1**, so **0.006 mol** of acid is needed.' },
      { text: '**Step 4** — cover **volume** on the triangle: volume = moles ÷ concentration.' },
      { text: 'Then change dm³ back into cm³: **multiply by 1000**.' },
    ],
    check: {
      id: 'c12',
      q: 'What volume of the nitric acid is needed?',
      options: [
        { val: 'A', text: '15.0 cm³' },
        { val: 'B', text: '0.015 cm³' },
        { val: 'C', text: '2.4 cm³' },
      ],
      correct: 'A',
      expEn: '0.006 ÷ 0.4 = 0.015 dm³, and 0.015 × 1000 = 15.0 cm³. Answer B forgot to change dm³ back into cm³; answer C multiplied the moles by the concentration (0.0024 dm³) instead of dividing.',
    },
  },

  // ── 20 · EXTENDED: the other way round ─────────────────────────────────
  {
    layout: 'split',
    accent: ALKALI,
    icon: 'ArrowUpDown',
    eyebrow: 'Extended · The other way round',
    title: 'Finding the Concentration of an Alkali',
    content:
      'To find an **alkali\'s** concentration, turn it round: use an **acid of known concentration** — the standard solution.\n\n' +
      'The method does not change. **Start from the solution you know**, which is now the acid.',
    notes: [
      {
        tone: 'write',
        text: 'To find the concentration of an **alkali**, titrate it against an **acid of known concentration**. Step 1 then uses the **acid**.',
      },
    ],
    check: {
      id: 'c13',
      q: 'Potassium hydroxide of unknown concentration is in the flask. Nitric acid of known concentration is in the burette. Step 1 works out the moles of…',
      options: [
        { val: 'A', text: 'potassium hydroxide, because it is in the flask' },
        { val: 'B', text: 'nitric acid, because its concentration and volume are both known' },
        { val: 'C', text: 'water, because it is made in every neutralisation' },
      ],
      correct: 'B',
      expEn: 'Step 1 always starts from the solution you know. Here that is the nitric acid in the burette. The moles of potassium hydroxide come in Step 3, from the ratio.',
    },
  },

  // ── 21 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before you finish',
    title: 'Can You Do All Six?',
    content: '> Notebook: **9 copy-down notes**, **2 worked examples**, **5 drawings**.',
    items: [
      { text: 'Give each **apparatus** its job.' },
      { text: 'Read a burette: **final − initial**.' },
      { text: 'Define a **standard solution**.' },
      { text: 'Change **cm³ into dm³**.' },
      { text: 'Work the **four steps**.' },
      { text: 'Explain the **weak acid** case.' },
    ],
    check: {
      id: 'c14',
      q: 'In Step 1, a student uses 25 instead of 0.025 for a volume of 25 cm³. What happens to her number of moles?',
      options: [
        { val: 'A', text: 'It is 1000 times too big' },
        { val: 'B', text: 'It is 1000 times too small' },
        { val: 'C', text: 'Nothing — the units cancel out' },
      ],
      correct: 'A',
      expEn: 'moles = concentration × volume, and 25 is 1000 times bigger than 0.025, so the moles come out 1000 times too big. Every step after that carries the mistake.',
    },
  },
];
