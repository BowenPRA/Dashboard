// src/data/COORD_SCI/B11_1/notes.js
// B11.01 Asexual and sexual reproduction, and B11.02 Sexual reproduction in
// plants. Written from the teacher's snips of the Cambridge IGCSE Co-ordinated
// Sciences coursebook, for the student who has just sat Wolsey Hall
// Assignment 10. English-only, like the track.
//
// Like B10_1, this deck is built to be COPIED: an orange "Write This Down" card
// on nearly every slide, and a yellow "Draw This" corner on the diagrams. The
// flower, the carpel, the potato and the bee are the coursebook's own figures
// (public/images/COORD_SCI/B11_1). Wind pollination, the pollen tube and
// germination were not among the snips, so those slides are written from the
// syllabus and drawn in diagrams.js.
//
// Body copy is two or three short sentences a slide — beside a check, a split
// slide's text column is about 330 px wide on a laptop, and a long paragraph
// pushes the orange card off the bottom of it.
//
// The `check:` or `activity:` block is ALWAYS the LAST key on its slide — the
// audio generator narrates every field before it and stops there. Activity
// cards use `name` / `explain` (never `text`) so they are not read aloud.
import { DIAGRAMS } from './diagrams.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const PINK = '#c2185b';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Flower2',
    brand: 'IGCSE Coordinated Science',
    eyebrow: 'B11.01–B11.02 Reproduction in plants',
    title: 'One Parent or Two? How Plants Reproduce',
    card: {
      icon: 'NotebookPen',
      badge: 'Notebook open — then think',
      text: 'Every **orange box** is a note to copy; every picture with a **yellow corner** is a diagram to draw. First, think: a strawberry plant can make new plants in **two** ways — by sending out runners that root nearby, and by making flowers and seeds. Why might a plant bother to have both?',
    },
  },

  // ── 2 · The two definitions ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Split',
    eyebrow: 'B11.01 Two ways to reproduce',
    title: 'Asexual and Sexual Reproduction',
    columns: [
      {
        heading: 'Asexual',
        accent: ORANGE,
        icon: 'Copy',
        content: 'One parent. No gametes. No fertilisation.',
        notes: [
          {
            tone: 'write',
            text: '**Asexual reproduction:** a process resulting in the production of **genetically identical** offspring from **one parent**.',
          },
        ],
      },
      {
        heading: 'Sexual',
        accent: PINK,
        icon: 'Dna',
        content: 'Two gametes. Fertilisation. Usually two parents.',
        notes: [
          {
            tone: 'write',
            text: '**Sexual reproduction:** a process involving the **fusion of the nuclei of two gametes** to form a **zygote**. The offspring are **genetically different** from each other.',
          },
        ],
      },
    ],
    check: {
      id: 'c1',
      q: 'Which pair describes ASEXUAL reproduction?',
      options: [
        { val: 'A', text: 'Fusion of gamete nuclei, and no genetic variety in the offspring' },
        { val: 'B', text: 'No fusion of gamete nuclei, and no genetic variety in the offspring' },
        { val: 'C', text: 'No fusion of gamete nuclei, but genetic variety in the offspring' },
      ],
      correct: 'B',
      expEn: 'Asexual reproduction has one parent and no gametes, so nothing fuses — and the offspring are copies of the parent, so there is no genetic variety. Fusion and variety both belong to sexual reproduction.',
    },
  },

  // ── 3 · An example of asexual reproduction ─────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Copy',
    eyebrow: 'An example to learn',
    title: 'Asexual Reproduction in a Potato',
    ratio: 44,
    image: 'images/COORD_SCI/B11_1/potato.jpg',
    drawThis: true,
    content:
      'A potato plant grows swollen underground stems called **tubers**. Next year each tuber grows into a new plant, with exactly the same genes as its parent.',
    notes: [
      {
        tone: 'write',
        text: '**Example of asexual reproduction:** a potato plant makes **tubers**. Each tuber grows into a new plant that is **genetically identical** to the parent — a **clone**.',
      },
    ],
    check: {
      id: 'c2',
      q: 'One potato plant produces ten tubers, and each grows into a new plant. How do the genes of the ten new plants compare?',
      options: [
        { val: 'A', text: 'All ten are different from each other' },
        { val: 'B', text: 'They have half the genes of the parent' },
        { val: 'C', text: 'All ten have the same genes as each other and as the parent' },
      ],
      correct: 'C',
      expEn: 'There was only one parent and no gametes, so every tuber is a copy of it: genetically identical to the parent and to each other.',
    },
  },

  // ── 4 · Gametes, fertilisation, zygote ─────────────────────────────────────
  {
    layout: 'split',
    accent: PINK,
    icon: 'Dna',
    eyebrow: 'The three words of sexual reproduction',
    title: 'Gametes, Fertilisation, Zygote',
    ratio: 44,
    inlineSvg: DIAGRAMS.CHROMOSOMES,
    drawThis: true,
    content:
      'A gamete has **half** the usual number of chromosomes, so that when two fuse the number is right again.',
    notes: [
      {
        tone: 'write',
        text: '**Gamete:** a sex cell. Its nucleus is **haploid** — one set of chromosomes.\n**Fertilisation:** the fusion of the nuclei of two gametes.\n**Zygote:** the cell made by fertilisation. It is **diploid** — two sets.',
      },
    ],
    check: {
      id: 'c3',
      q: 'The body cells of a durian tree have 28 chromosomes. How many are there in the nucleus of one of its gametes?',
      options: [
        { val: 'A', text: '14' },
        { val: 'B', text: '28' },
        { val: 'C', text: '56' },
      ],
      correct: 'A',
      expEn: 'A gamete is haploid: it has half the number in a body cell, so 28 ÷ 2 = 14. Two gametes then fuse to give a zygote with 14 + 14 = 28 again.',
    },
  },

  // ── 5 · Advantages and disadvantages ───────────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'For a plant living in the wild',
    title: 'Which Is Better?',
    columns: [
      {
        heading: 'Asexual',
        accent: ORANGE,
        icon: 'Copy',
        notes: [
          {
            tone: 'write',
            text: '**For:** needs only one parent; it is fast; the offspring are all well adapted if conditions stay the same.\n**Against:** **no genetic variation** — one disease, or one change in the environment, could kill them all; the offspring grow close by, so they **compete**.',
          },
        ],
      },
      {
        heading: 'Sexual',
        accent: PINK,
        icon: 'Dna',
        notes: [
          {
            tone: 'write',
            text: '**For:** **genetic variation** — some offspring may survive a new disease or a change; seeds are **dispersed**, so there is less competition.\n**Against:** slower; needs two gametes to meet (pollination).',
          },
        ],
      },
    ],
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Sort each statement: is it true of asexual or of sexual reproduction in plants?',
      bins: [
        { id: 'asex', name: 'Asexual' },
        { id: 'sex', name: 'Sexual' },
      ],
      cards: [
        { id: 'one', name: 'Needs only one parent', bin: 'asex' },
        { id: 'identical', name: 'All the offspring are genetically identical', bin: 'asex' },
        { id: 'disease', name: 'One new disease could kill every plant', bin: 'asex' },
        { id: 'variation', name: 'Produces genetic variation', bin: 'sex' },
        { id: 'pollination', name: 'Needs pollination', bin: 'sex' },
        { id: 'seeds', name: 'Seeds are spread over a wide area', bin: 'sex' },
      ],
      explain: 'Asexual reproduction copies one parent, so the offspring are identical — quick and reliable, but with no variation a single disease can kill them all. Sexual reproduction mixes the genes of two gametes, so the offspring vary, and the seeds it makes can be carried far away.',
    },
  },

  // ── 6 · The parts of a flower ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: PINK,
    icon: 'Flower2',
    eyebrow: 'B11.02 Sexual reproduction in plants',
    title: 'The Parts of a Flower',
    ratio: 34,
    image: 'images/COORD_SCI/B11_1/flower-labelled.jpg',
    drawThis: true,
    content:
      'A flower has two jobs: to **make gametes**, and to make sure **fertilisation** happens. Draw this half-flower, large, and label every part.',
    notes: [
      {
        tone: 'write',
        text: '**Stamen** (the male part) = **anther** + **filament**.\n**Carpel** (the female part) = **stigma** + **style** + **ovary**, with **ovules** inside the ovary.',
      },
    ],
  },

  // ── 7 · What each part does ────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: GREEN,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'Copy these as a table: part · what it does',
    title: 'What Each Part Does',
    notes: [
      { tone: 'write', badge: 'Sepals', text: '**Protect** the flower while it is a bud.' },
      { tone: 'write', badge: 'Petals', text: 'Brightly coloured, to **attract insects**.' },
      { tone: 'write', badge: 'Anther', text: '**Makes pollen grains**, which contain the male gametes.' },
      { tone: 'write', badge: 'Filament', text: '**Holds the anther** up.' },
      { tone: 'write', badge: 'Stigma', text: '**Catches pollen** grains.' },
      { tone: 'write', badge: 'Ovary', text: 'Contains the **ovules**, which contain the female gametes.' },
    ],
    check: {
      id: 'c4',
      q: 'Which part of a flower produces pollen?',
      options: [
        { val: 'A', text: 'The stigma' },
        { val: 'B', text: 'The ovary' },
        { val: 'C', text: 'The anther' },
      ],
      correct: 'C',
      expEn: 'Pollen grains are made in the anthers, at the top of the stamens. The stigma is where pollen LANDS, and the ovary holds the ovules.',
    },
  },

  // ── 8 · Where the gametes are ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sprout',
    eyebrow: 'A section through the female part',
    title: 'Where the Gametes Are',
    ratio: 50,
    image: 'images/COORD_SCI/B11_1/carpel.jpg',
    drawThis: true,
    content:
      'Cut a carpel down the middle and you can see the **ovules** in a row inside the ovary. Each one contains a nucleus that is a female gamete.',
    notes: [
      {
        tone: 'write',
        text: '**Male gametes:** inside the **pollen grains**, made in the **anthers**.\n**Female gametes:** inside the **ovules**, in the **ovary**.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Where are the female gametes of a flowering plant found?',
      options: [
        { val: 'A', text: 'Inside the ovules' },
        { val: 'B', text: 'Inside the pollen grains' },
        { val: 'C', text: 'On the surface of the stigma' },
      ],
      correct: 'A',
      expEn: 'Each ovule contains a nucleus that is a female gamete. The male gametes are inside the pollen grains.',
    },
  },

  // ── 9 · Pollination ────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Bug',
    eyebrow: 'The first step: moving the pollen',
    title: 'Pollination',
    content:
      'A bee comes for **nectar**. It brushes past the **anthers** and pollen sticks to its body. At the next flower, some of that pollen rubs off onto the sticky **stigma**.',
    notes: [
      {
        tone: 'write',
        text: '**Pollination:** the transfer of pollen grains from an **anther** to a **stigma**.',
      },
      {
        tone: 'info',
        badge: 'Two agents of pollination',
        text: 'Pollen is carried by **insects** or by the **wind**.',
      },
    ],
    check: {
      id: 'c6',
      q: 'What is pollination?',
      options: [
        { val: 'A', text: 'The fusion of a pollen nucleus with a nucleus in an ovule' },
        { val: 'B', text: 'The transfer of pollen grains from an anther to a stigma' },
        { val: 'C', text: 'The transfer of pollen grains from a stigma to an anther' },
      ],
      correct: 'B',
      expEn: 'Pollination is only the JOURNEY of the pollen: anther to stigma. The fusion of the nuclei comes later and has its own name — fertilisation.',
    },
  },

  // ── 10 · A wind-pollinated flower ──────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Wind',
    eyebrow: 'Grasses, and many trees',
    title: 'A Wind-Pollinated Flower',
    ratio: 42,
    inlineSvg: DIAGRAMS.WIND_FLOWER,
    drawThis: true,
    content:
      'The wind cannot see colour or smell scent, so this flower does not waste energy on petals or nectar. Everything sticks **out** into the moving air.',
    notes: [
      {
        tone: 'write',
        text: '**Anthers** hang **outside** the flower on long filaments, so the wind shakes the pollen out.\n**Stigmas** are **feathery** and hang outside the flower: a large surface area to **catch** pollen.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Why are the stigmas of a wind-pollinated flower feathery?',
      options: [
        { val: 'A', text: 'To attract insects to the flower' },
        { val: 'B', text: 'To give a large surface area for catching pollen from the air' },
        { val: 'C', text: 'To protect the ovary from the wind' },
      ],
      correct: 'B',
      expEn: 'Pollen blown by the wind arrives by chance, so the stigma is a large, feathery net held out in the air to catch it. Wind-pollinated flowers do not need to attract insects at all.',
    },
  },

  // ── 11 · Insect v wind ─────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Copy both lists, side by side',
    title: 'Insect-Pollinated or Wind-Pollinated?',
    columns: [
      {
        heading: 'Insect-pollinated',
        accent: PINK,
        icon: 'Bug',
        notes: [
          {
            tone: 'write',
            text: 'Large, **brightly coloured petals**.\n**Scent** and **nectar**.\nAnthers **inside** the flower.\n**Sticky** stigma inside the flower.\nSmall amounts of **large, sticky or spiky** pollen.',
          },
        ],
      },
      {
        heading: 'Wind-pollinated',
        accent: GREEN,
        icon: 'Wind',
        notes: [
          {
            tone: 'write',
            text: '**No petals**, or small green ones.\n**No scent**, no nectar.\nAnthers hang **outside** the flower.\n**Feathery** stigmas outside the flower.\nHuge amounts of **small, smooth, light** pollen.',
          },
        ],
      },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'Sort each feature: does it belong to an insect-pollinated or a wind-pollinated flower?',
      bins: [
        { id: 'insect', name: 'Insect-pollinated' },
        { id: 'wind', name: 'Wind-pollinated' },
      ],
      cards: [
        { id: 'petals', name: 'Large, brightly coloured petals', bin: 'insect' },
        { id: 'nectar', name: 'Scent and nectar', bin: 'insect' },
        { id: 'sticky', name: 'Sticky pollen', bin: 'insect' },
        { id: 'feathery', name: 'Feathery stigmas outside the flower', bin: 'wind' },
        { id: 'hanging', name: 'Anthers hanging outside the flower', bin: 'wind' },
        { id: 'light', name: 'Huge amounts of light, smooth pollen', bin: 'wind' },
      ],
      explain: 'Everything about an insect-pollinated flower is an advertisement or a reward: colour, scent, nectar, and pollen that sticks to the visitor. A wind-pollinated flower advertises nothing — it just holds its anthers and stigmas out in the air and makes pollen light enough to blow.',
    },
  },

  // ── 12 · Two kinds of pollen ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'CircleDot',
    eyebrow: 'Seen under a microscope',
    title: 'Two Kinds of Pollen',
    ratio: 44,
    inlineSvg: DIAGRAMS.POLLEN_COMPARE,
    drawThis: true,
    content:
      'Most wind-blown pollen never lands on a stigma, so the plant has to make a huge amount of it.',
    notes: [
      {
        tone: 'write',
        text: '**Insect-pollinated:** pollen grains are **larger** and **sticky or spiky**, to stick to an insect. Fewer are made.\n**Wind-pollinated:** pollen grains are **smaller**, **smooth** and **light**, to be carried by the wind. Far more are made.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Why does a wind-pollinated plant make far more pollen than an insect-pollinated one?',
      options: [
        { val: 'A', text: 'Because most of its pollen is wasted — it never lands on a stigma' },
        { val: 'B', text: 'Because insects eat most of its pollen' },
        { val: 'C', text: 'Because each of its flowers has more ovules' },
      ],
      correct: 'A',
      expEn: 'The wind scatters pollen in every direction, so only a tiny fraction happens to land on a stigma of the right species. An insect flies from flower to flower, so far less is lost.',
    },
  },

  // ── 13 · Fertilisation in a flower ─────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'The second step: joining the nuclei',
    title: 'Fertilisation in a Flower',
    ratio: 42,
    inlineSvg: DIAGRAMS.POLLEN_TUBE,
    drawThis: true,
    content:
      'The pollen grain is on the stigma, but the ovule is deep inside the ovary. The grain grows a **pollen tube** down through the style, and the male nucleus travels down it.',
    notes: [
      {
        tone: 'write',
        text: '**Fertilisation** happens when a **pollen nucleus fuses with a nucleus in an ovule**.\nAfter fertilisation, the **ovule** becomes a **seed** and the **ovary** becomes a **fruit**.',
      },
    ],
    activity: {
      id: 'a3',
      type: 'order',
      prompt: 'Put the five events in order, from a pollen grain arriving to a seed being made.',
      steps: [
        { id: 'land', name: 'A pollen grain lands on the stigma' },
        { id: 'tube', name: 'A pollen tube grows down through the style' },
        { id: 'travel', name: 'The male nucleus travels down the pollen tube' },
        { id: 'fuse', name: 'The male nucleus fuses with the nucleus in the ovule' },
        { id: 'seed', name: 'The ovule develops into a seed' },
      ],
      explain: 'Pollination comes first (the grain lands), then the tube grows and carries the male nucleus to the ovule, then the two nuclei fuse — that is fertilisation — and only then does the ovule become a seed.',
    },
  },

  // ── 14 · The two words that get mixed up ───────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'Two ways marks are lost',
    title: 'Watch Out',
    content:
      '> **Pollination is not fertilisation.** Pollination is pollen moving from an anther to a stigma. Fertilisation is two nuclei fusing, down in the ovule. A flower can be pollinated and still not be fertilised.\n> **Seeds develop in the ovary**, from the ovules — not in the anther, the stigma or the petals.',
    check: {
      id: 'c9',
      q: 'In which part of a flower do the seeds develop?',
      options: [
        { val: 'A', text: 'The anther' },
        { val: 'B', text: 'The stigma' },
        { val: 'C', text: 'The ovary' },
      ],
      correct: 'C',
      expEn: 'A seed is a fertilised ovule, and the ovules are inside the ovary. The ovary itself swells up round the seeds and becomes the fruit.',
    },
  },

  // ── 15 · Germination ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Sprout',
    eyebrow: 'When a seed starts to grow',
    title: 'What a Seed Needs to Germinate',
    ratio: 40,
    inlineSvg: DIAGRAMS.GERMINATION,
    drawThis: true,
    content:
      'A dry seed can wait for years. It starts to grow only when three conditions are all right at once.',
    notes: [
      {
        tone: 'write',
        text: '**Germination:** when a seed starts to grow.\nIt needs **water**, **oxygen** and a **suitable temperature**.',
      },
      {
        tone: 'homework',
        text: 'Most seeds do **not** need **light** — they germinate underground. They do not need carbon dioxide or mineral salts either.',
      },
    ],
    check: {
      id: 'c10',
      q: 'Which of these is NOT needed for the germination of all seeds?',
      options: [
        { val: 'A', text: 'Light' },
        { val: 'B', text: 'Oxygen' },
        { val: 'C', text: 'Water' },
      ],
      correct: 'A',
      expEn: 'Water, oxygen and a suitable temperature are needed by every seed. Light is not: most seeds germinate in the dark, under the soil, and only need light once their leaves are out.',
    },
  },

  // ── 16 · The germination experiment ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'FlaskConical',
    eyebrow: 'An investigation the exam likes',
    title: 'Four Flasks of Seeds',
    ratio: 32,
    inlineSvg: DIAGRAMS.FLASKS,
    drawThis: true,
    content:
      'Each flask is set up differently. Boiling water drives the **dissolved oxygen** out of it.\n\nBefore you go on, decide: in which flask will the seeds germinate most quickly?',
    notes: [
      {
        tone: 'task',
        text: 'Write **A, B, C, D** down the margin. Beside each, write which of the three conditions the seeds **have**, and which is **missing**.',
      },
    ],
  },

  // ── 17 · What each flask shows ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'FlaskConical',
    eyebrow: 'Check your four answers',
    title: 'What Each Flask Shows',
    content: 'Only one flask gives the seeds all three conditions.',
    notes: [
      {
        tone: 'write',
        text: '**A** — dry cotton wool: no **water**. No germination.\n**B** — under boiled water: no **oxygen**. No germination.\n**C** — damp, at 18 °C: water, oxygen and warmth. **Germinates quickly.**\n**D** — damp, at 2 °C: **too cold**. Very slow, or none.',
      },
    ],
    check: {
      id: 'c11',
      q: 'In flask B the seeds are covered with water that has been boiled and cooled. Which condition for germination is missing?',
      options: [
        { val: 'A', text: 'Water' },
        { val: 'B', text: 'A suitable temperature' },
        { val: 'C', text: 'Oxygen' },
      ],
      correct: 'C',
      expEn: 'Boiling drives the dissolved oxygen out of the water, and the water then keeps the air away from the seeds. They have water and warmth, but no oxygen for respiration.',
    },
  },

  // ── 18 · Recap ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: GREEN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Check your notebook against this list',
    title: 'Can You Do All Eight?',
    content:
      '> Your notebook should now have about **20 definitions**, the two **comparison tables**, and **7 diagrams**: the potato, the chromosome numbers, the half-flower, the carpel, the wind-pollinated flower, the pollen tube and the four flasks.',
    items: [
      { text: 'Define **asexual** and **sexual** reproduction.' },
      { text: 'Give the advantages and disadvantages of each, for a plant in the wild.' },
      { text: 'Label the parts of an **insect-pollinated flower** and say what each does.' },
      { text: 'Define **pollination**, and name its two agents.' },
      { text: 'Compare insect-pollinated and wind-pollinated **flowers**, and their **pollen**.' },
      { text: 'Describe **fertilisation** in a flower, and what the ovule and ovary become.' },
      { text: 'State the three conditions for **germination**.' },
      { text: 'Explain what each flask in the germination experiment shows.' },
    ],
    check: {
      id: 'c12',
      q: 'A flower has no petals, no scent, anthers hanging outside it and feathery stigmas. How is it pollinated?',
      options: [
        { val: 'A', text: 'By insects' },
        { val: 'B', text: 'By the wind' },
        { val: 'C', text: 'It is not pollinated — it reproduces asexually' },
      ],
      correct: 'B',
      expEn: 'No petals, no scent, anthers and feathery stigmas held out in the air: every feature fits a flower whose pollen is carried by the wind.',
    },
  },
];
