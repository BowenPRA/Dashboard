// src/data/COORD_SCI/B11_2/notes.js
// B11.03 Sexual reproduction in humans, and B11.04 Sexually transmitted
// infections. Written from the teacher's snips of the Cambridge IGCSE
// Co-ordinated Sciences coursebook, for the student who has just sat Wolsey
// Hall Assignment 10. English-only, like the track.
//
// Like B10_1 and B11_1, this deck is built to be COPIED: an orange "Write This
// Down" card on nearly every slide and a yellow "Draw This" corner on the
// diagrams. The organs, the route of the sperm, fertilisation, the menstrual
// cycle and the virus are the coursebook's own figures
// (public/images/COORD_SCI/B11_2); the two gametes, the 28-day wheel and the
// bacterium are drawn in diagrams.js. Implantation and meiosis were not among
// the snips — those two slides are written from the syllabus, because the
// assignment asks about both.
//
// Body copy is two or three short sentences a slide — beside a check, a split
// slide's text column is about 330 px wide on a laptop.
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
    color: PINK,
    icon: 'Dna',
    brand: 'IGCSE Coordinated Science',
    eyebrow: 'B11.03–B11.04 Reproduction in humans',
    title: 'From Two Cells to One: Human Reproduction',
    card: {
      icon: 'NotebookPen',
      badge: 'Notebook open — then think',
      text: 'Every **orange box** is a note to copy; every picture with a **yellow corner** is a diagram to draw. First, think: a man makes **millions** of sperm every day, but a woman releases about **one** egg a month. Why might the two gametes be made in such different numbers?',
    },
  },

  // ── 2 · The male reproductive system ───────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'B11.03 · Front view',
    title: 'The Male Reproductive System',
    ratio: 40,
    image: 'images/COORD_SCI/B11_2/male-front.jpg',
    drawThis: true,
    content:
      'Draw this front view and label all nine parts. Follow the white tube from each **testis** up and round to the middle: that is a **sperm duct**.',
    notes: [
      {
        tone: 'write',
        text: 'The male reproductive system: **testes**, **scrotum**, **sperm ducts**, **prostate gland**, **urethra** and **penis**.',
      },
    ],
  },

  // ── 3 · What each male part does ───────────────────────────────────────────
  {
    layout: 'stack',
    accent: BLUE,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'Copy these as a table: part · what it does',
    title: 'What Each Part Does',
    notes: [
      { tone: 'write', badge: 'Testes', text: '**Make sperm** (the male gametes) and the hormone **testosterone**.' },
      { tone: 'write', badge: 'Scrotum', text: 'The sac that **holds the testes** outside the body, where it is cooler.' },
      { tone: 'write', badge: 'Sperm ducts', text: '**Carry sperm** from the testes to the urethra.' },
      { tone: 'write', badge: 'Prostate gland', text: '**Makes a fluid** for the sperm to swim in. Sperm + fluid = **semen**.' },
      { tone: 'write', badge: 'Urethra', text: 'Carries **semen** out through the penis — and also **urine** from the bladder.' },
      { tone: 'write', badge: 'Penis', text: 'Passes semen into the **vagina** during sexual intercourse.' },
    ],
    check: {
      id: 'c1',
      q: 'Which part makes the fluid that sperm swim in?',
      options: [
        { val: 'A', text: 'The scrotum' },
        { val: 'B', text: 'The prostate gland' },
        { val: 'C', text: 'The sperm duct' },
      ],
      correct: 'B',
      expEn: 'The prostate gland secretes the fluid. Sperm and fluid together are called semen. The scrotum only holds the testes, and the sperm duct only carries the sperm.',
    },
  },

  // ── 4 · Three tubes that sound alike ───────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The same organs from the side',
    title: 'Three Tubes With Similar Names',
    ratio: 44,
    image: 'images/COORD_SCI/B11_2/male-side.jpg',
    content:
      'On a side view, trace each tube to see where it **starts**. A tube that starts at a **testis** is a sperm duct. A tube that starts at the **bladder** is the urethra.',
    notes: [
      {
        tone: 'write',
        text: '**Sperm duct:** testis → urethra. Carries **sperm**.\n**Urethra:** bladder → outside. Carries **urine and semen**.\n**Ureter:** kidney → bladder. Carries **urine**. It is not part of the reproductive system.',
      },
    ],
    check: {
      id: 'c2',
      q: 'A tube leaves a testis, loops up over the bladder and joins another tube near the prostate gland. What is it?',
      options: [
        { val: 'A', text: 'The urethra' },
        { val: 'B', text: 'A ureter' },
        { val: 'C', text: 'A sperm duct' },
      ],
      correct: 'C',
      expEn: 'It starts at a testis, so it is a sperm duct. The tube it joins is the urethra, which runs from the bladder to the outside. A ureter runs from a kidney to the bladder and never goes near a testis.',
    },
  },

  // ── 5 · The female reproductive system ─────────────────────────────────────
  {
    layout: 'split',
    accent: PINK,
    icon: 'PenLine',
    eyebrow: 'Front view',
    title: 'The Female Reproductive System',
    ratio: 42,
    image: 'images/COORD_SCI/B11_2/female.jpg',
    drawThis: true,
    content:
      'Draw this front view and label all six parts. The small drawing at the bottom left shows where the organs are in the body.',
    notes: [
      {
        tone: 'write',
        text: 'The female reproductive system: **ovaries**, **oviducts**, **uterus**, **cervix** and **vagina**.',
      },
    ],
  },

  // ── 6 · What each female part does ─────────────────────────────────────────
  {
    layout: 'stack',
    accent: PINK,
    icon: 'ListChecks',
    columns: 3,
    eyebrow: 'Copy these as a table: part · what it does',
    title: 'What Each Part Does',
    notes: [
      { tone: 'write', badge: 'Ovaries', text: '**Make eggs** (the female gametes) and the hormone **oestrogen**.' },
      { tone: 'write', badge: 'Oviducts', text: 'Carry the egg to the uterus. **Fertilisation happens here.**' },
      { tone: 'write', badge: 'Uterus', text: 'Where the **embryo develops**. It has a thick, muscular wall.' },
      { tone: 'write', badge: 'Uterus lining', text: 'Where the embryo **implants**. It is lost during menstruation.' },
      { tone: 'write', badge: 'Cervix', text: 'A **ring of muscle** at the narrow opening of the uterus.' },
      { tone: 'write', badge: 'Vagina', text: 'Receives the penis during sexual intercourse; **sperm are left here**.' },
    ],
    check: {
      id: 'c3',
      q: 'What is the ring of muscle at the narrow opening of the uterus called?',
      options: [
        { val: 'A', text: 'The cervix' },
        { val: 'B', text: 'The oviduct' },
        { val: 'C', text: 'The ovary' },
      ],
      correct: 'A',
      expEn: 'The cervix is the narrow, muscular neck of the uterus, where it opens into the vagina. The oviducts are the two tubes at the top, and the ovaries are where the eggs are made.',
    },
  },

  // ── 7 · The sperm cell ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'The male gamete',
    title: 'A Sperm Cell Is Built to Swim',
    ratio: 44,
    inlineSvg: DIAGRAMS.SPERM_CELL,
    drawThis: true,
    content:
      'A sperm has one job: to carry its nucleus to an egg. Every part of it is an **adaptation** for that.',
    notes: [
      {
        tone: 'write',
        text: '**Flagellum** (tail): for **swimming** to the egg.\n**Middle piece:** many **mitochondria**, which release energy for swimming.\n**Acrosome:** contains **enzymes** that digest a way through the jelly coat of the egg.\n**Nucleus:** **haploid** — 23 chromosomes.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Why does the middle piece of a sperm cell contain many mitochondria?',
      options: [
        { val: 'A', text: 'To digest the jelly coat of the egg' },
        { val: 'B', text: 'To carry the chromosomes' },
        { val: 'C', text: 'To release the energy needed for swimming' },
      ],
      correct: 'C',
      expEn: 'Mitochondria release energy by aerobic respiration, and the flagellum uses that energy to swim. Digesting the jelly coat is the job of the enzymes in the acrosome; the chromosomes are in the nucleus.',
    },
  },

  // ── 8 · The egg cell ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PINK,
    icon: 'Egg',
    eyebrow: 'The female gamete',
    title: 'An Egg Cell Is Built to Last',
    ratio: 44,
    inlineSvg: DIAGRAMS.EGG_CELL,
    drawThis: true,
    content:
      'An egg cannot move by itself. It is about **0.1 mm** across — many times larger than a sperm — because it carries the food for the first few days of a new life.',
    notes: [
      {
        tone: 'write',
        text: '**Energy stores** in the cytoplasm: food for the first few days after fertilisation.\n**Jelly coat:** changes after fertilisation, so that **no more sperm** can get in.\n**Nucleus:** **haploid** — 23 chromosomes.',
      },
    ],
    check: {
      id: 'c5',
      q: 'What is the job of the jelly coat round an egg cell?',
      options: [
        { val: 'A', text: 'It changes after fertilisation, so that only one sperm can enter' },
        { val: 'B', text: 'It releases the energy the egg needs to swim' },
        { val: 'C', text: 'It contains the chromosomes' },
      ],
      correct: 'A',
      expEn: 'Once one sperm has entered, the jelly coat and the egg membrane change so that no more sperm can get through. An egg does not swim, and its chromosomes are in its nucleus.',
    },
  },

  // ── 9 · Sperm v egg ────────────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Size, number, movement — copy both lists',
    title: 'Comparing the Two Gametes',
    columns: [
      {
        heading: 'Sperm',
        accent: BLUE,
        icon: 'Zap',
        notes: [
          {
            tone: 'write',
            text: '**Very small.**\nMade in **huge numbers** — millions.\n**Motile:** it swims, using its flagellum.\nAlmost **no food store**.',
          },
        ],
      },
      {
        heading: 'Egg',
        accent: PINK,
        icon: 'Egg',
        notes: [
          {
            tone: 'write',
            text: '**Much larger.**\nMade in **small numbers** — about one a month.\n**Cannot move** by itself.\nA large **energy store** in the cytoplasm.',
          },
        ],
      },
    ],
    activity: {
      id: 'a1',
      type: 'sort',
      prompt: 'Sort each feature: does it belong to a sperm cell or an egg cell?',
      bins: [
        { id: 'sperm', name: 'Sperm cell' },
        { id: 'egg', name: 'Egg cell' },
      ],
      cards: [
        { id: 'flagellum', name: 'Has a flagellum', bin: 'sperm' },
        { id: 'acrosome', name: 'Has an acrosome containing enzymes', bin: 'sperm' },
        { id: 'millions', name: 'Made in millions', bin: 'sperm' },
        { id: 'jelly', name: 'Has a jelly coat', bin: 'egg' },
        { id: 'store', name: 'Has a large energy store', bin: 'egg' },
        { id: 'month', name: 'About one is released each month', bin: 'egg' },
      ],
      explain: 'A sperm is small, made by the million and built to swim: a flagellum, mitochondria to power it, and an acrosome to get into the egg. An egg is large, rare and still: it carries the energy store, and a jelly coat that lets only one sperm in.',
    },
  },

  // ── 10 · The route of the sperm ────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Route',
    eyebrow: 'Where the two gametes meet',
    title: 'The Journey to the Egg',
    ratio: 42,
    image: 'images/COORD_SCI/B11_2/sperm-route.jpg',
    drawThis: true,
    content:
      'Follow the numbers on the picture. Out of millions of sperm, only a few hundred ever reach the oviduct.',
    notes: [
      {
        tone: 'write',
        text: '**1** Sperm are left at the top of the **vagina**.\n**2** They swim through the **cervix** and the **uterus**.\n**3** They reach an **oviduct**. If an egg is there, **fertilisation** takes place.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Where in the female reproductive system does fertilisation normally take place?',
      options: [
        { val: 'A', text: 'In the uterus' },
        { val: 'B', text: 'In an oviduct' },
        { val: 'C', text: 'In an ovary' },
      ],
      correct: 'B',
      expEn: 'The egg is released from the ovary into the oviduct, and that is where the sperm meet it. The uterus is where the embryo later implants and develops.',
    },
  },

  // ── 11 · Fertilisation ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'One sperm, and only one',
    title: 'Fertilisation',
    ratio: 46,
    image: 'images/COORD_SCI/B11_2/fertilisation.jpg',
    content:
      'Many sperm reach the egg, but only the **nucleus of one** gets in.',
    notes: [
      {
        tone: 'write',
        text: '**Fertilisation:** the fusion of the **nucleus of a sperm** with the **nucleus of an egg**, forming a **zygote**.\nEnzymes from the **acrosome** digest a path through the jelly coat. Then the jelly coat and membrane change, so **no more sperm** can enter.',
      },
    ],
    activity: {
      id: 'a2',
      type: 'order',
      prompt: 'Put the events of fertilisation in order.',
      steps: [
        { id: 'reach', name: 'Sperm reach the egg in the oviduct' },
        { id: 'digest', name: 'Enzymes from the acrosome digest a path through the jelly coat' },
        { id: 'enter', name: 'The head of one sperm enters the egg' },
        { id: 'block', name: 'The jelly coat changes, so no more sperm can enter' },
        { id: 'fuse', name: 'The sperm nucleus fuses with the egg nucleus' },
      ],
      explain: 'The sperm has to get through the jelly coat first (the acrosome enzymes), then its head enters, the coat changes to keep every other sperm out, and last of all the two nuclei fuse. That fusion is the moment of fertilisation.',
    },
  },

  // ── 12 · Chromosome numbers and meiosis ────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Dna',
    eyebrow: 'Counting the chromosomes',
    title: 'Haploid, Diploid and Meiosis',
    content:
      'In a body cell the chromosomes are in **pairs**. A gamete is given only **one from each pair**, so that the zygote ends up with pairs again.',
    notes: [
      {
        tone: 'write',
        text: '**Sperm and egg:** **haploid** — **23** single chromosomes (one set).\n**Zygote:** **diploid** — **46** chromosomes, in **23 pairs** (two sets).\n**Meiosis:** the kind of cell division that makes gametes. It halves the chromosome number. It happens in the **testes** and in the **ovaries**.',
      },
    ],
    check: {
      id: 'c7',
      q: 'How are the chromosomes in a sperm nucleus different from those in a zygote?',
      options: [
        { val: 'A', text: 'A sperm has two sets, in pairs; a zygote has one set' },
        { val: 'B', text: 'A sperm has one set of single chromosomes; a zygote has two sets, in pairs' },
        { val: 'C', text: 'They are the same — both have 46 chromosomes' },
      ],
      correct: 'B',
      expEn: 'A sperm is haploid: 23 chromosomes, one of each kind, not in pairs. The zygote is diploid: 23 from the sperm and 23 from the egg make 46, arranged in 23 pairs.',
    },
  },

  // ── 13 · Implantation ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Baby',
    eyebrow: 'What happens to the zygote',
    title: 'From Zygote to Embryo: Implantation',
    ratio: 46,
    image: 'images/COORD_SCI/B11_2/female.jpg',
    content:
      'The zygote does not stay in the oviduct. Over a few days it divides again and again as it is moved slowly down to the uterus.',
    notes: [
      {
        tone: 'write',
        text: 'The zygote divides to form a ball of cells called an **embryo**.\n**Implantation:** the embryo sinks into the **lining of the uterus**, where it will develop.',
      },
      {
        tone: 'homework',
        text: '**Fertilisation** → in an **oviduct**. **Implantation** → in the **uterus lining**. Two events, two places.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Where does implantation normally occur?',
      options: [
        { val: 'A', text: 'In the lining of the uterus' },
        { val: 'B', text: 'In an oviduct' },
        { val: 'C', text: 'In the vagina' },
      ],
      correct: 'A',
      expEn: 'The embryo implants in the thick, blood-rich lining of the uterus. The oviduct is where fertilisation happened, a few days earlier.',
    },
  },

  // ── 14 · Puberty and the sex hormones ──────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'The hormones that start it all',
    title: 'Puberty and the Sex Hormones',
    columns: [
      {
        heading: 'Testosterone',
        accent: BLUE,
        icon: 'Droplet',
        notes: [
          {
            tone: 'write',
            text: 'Secreted by the **testes**.\nCauses the **male secondary sexual characteristics** during puberty: a deeper voice, facial and body hair, more muscle, and sperm production begins.',
          },
        ],
      },
      {
        heading: 'Oestrogen',
        accent: PINK,
        icon: 'Droplet',
        notes: [
          {
            tone: 'write',
            text: 'Secreted by the **ovaries**.\nCauses the **female secondary sexual characteristics** during puberty: breasts develop, hips widen, body hair grows, and the **menstrual cycle** begins.',
          },
        ],
      },
    ],
    check: {
      id: 'c9',
      q: 'Which organ secretes oestrogen?',
      options: [
        { val: 'A', text: 'The uterus' },
        { val: 'B', text: 'The testis' },
        { val: 'C', text: 'The ovary' },
      ],
      correct: 'C',
      expEn: 'The ovaries secrete oestrogen, as well as making eggs. The testes secrete testosterone. The uterus does not make either hormone.',
    },
  },

  // ── 15 · The menstrual cycle, as the book draws it ─────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Repeat',
    eyebrow: 'Start at the top and go round clockwise',
    title: 'The Menstrual Cycle',
    ratio: 34,
    image: 'images/COORD_SCI/B11_2/menstrual.jpg',
    content:
      'Every month the uterus gets ready to receive an embryo. If no embryo arrives, the lining is not needed, and the cycle starts again.',
    notes: [
      {
        tone: 'write',
        text: '**Follicle:** the small structure in an ovary in which an egg develops.\n**Ovulation:** the release of an egg from an ovary.\n**Menstruation:** the breakdown and loss of the uterus lining through the vagina — a **period**.',
      },
    ],
  },

  // ── 16 · The 28 days ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'CalendarDays',
    eyebrow: 'Day 1 is the first day of the period',
    title: 'The 28 Days',
    ratio: 42,
    inlineSvg: DIAGRAMS.MENSTRUAL_WHEEL,
    drawThis: true,
    content:
      'Copy the wheel and colour the four parts. An egg lives for only a day or two, so a woman is most likely to become pregnant in the days round **ovulation**.',
    notes: [
      {
        tone: 'write',
        text: '**Days 1–5:** menstruation — the lining breaks down.\n**Days 6–12:** the lining is repaired; an egg develops in a follicle.\n**Days 13–16:** ovulation, at about day 14 — pregnancy is most likely.\n**Days 17–28:** the lining stays thick, ready for an embryo.',
      },
    ],
    check: {
      id: 'c10',
      q: 'An egg is released on day 14 of a 28-day cycle. What is this event called?',
      options: [
        { val: 'A', text: 'Ovulation' },
        { val: 'B', text: 'Menstruation' },
        { val: 'C', text: 'Implantation' },
      ],
      correct: 'A',
      expEn: 'Ovulation is the release of an egg from an ovary, about halfway through the cycle. Menstruation is the loss of the lining in days 1 to 5; implantation only happens if the egg has been fertilised.',
    },
  },

  // ── 17 · STIs and HIV ──────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Biohazard',
    eyebrow: 'B11.04 Sexually transmitted infections',
    title: 'HIV Is a Virus',
    ratio: 44,
    image: 'images/COORD_SCI/B11_2/hiv.jpg',
    drawThis: true,
    content:
      'A virus is tiny — the scale bar is 10 **nanometres** — and very simple: a **protein** coat round its **genetic material**.',
    notes: [
      {
        tone: 'write',
        text: '**Sexually transmitted infection (STI):** an infection that is passed on during sexual contact.\n**HIV** (human immunodeficiency virus) is the **pathogen**. It can lead to the disease **AIDS**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'What is the difference between HIV and AIDS?',
      options: [
        { val: 'A', text: 'AIDS is the virus; HIV is the disease it can lead to' },
        { val: 'B', text: 'They are two names for the same bacterium' },
        { val: 'C', text: 'HIV is the virus; AIDS is the disease it can lead to' },
      ],
      correct: 'C',
      expEn: 'HIV is the virus — the pathogen. AIDS (acquired immune deficiency syndrome) is the disease that an untreated HIV infection can lead to, often many years later.',
    },
  },

  // ── 18 · A bacterium, for comparison ───────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Bug',
    eyebrow: 'First, a pathogen that IS a cell',
    title: 'A Bacterium Is a Cell',
    ratio: 40,
    inlineSvg: DIAGRAMS.BACTERIUM,
    drawThis: true,
    content:
      'To see how simple a virus is, put it beside a bacterium. A bacterium is a complete living cell.',
    notes: [
      {
        tone: 'write',
        text: 'A **bacterium** has a **cell wall**, a **cell membrane**, **cytoplasm** and **ribosomes**. Its DNA is a loop, and it may have **plasmids**.',
      },
    ],
  },

  // ── 19 · A virus is not a cell ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Biohazard',
    eyebrow: 'A difference in structure the exam asks for',
    title: 'A Virus Is Not a Cell',
    ratio: 44,
    inlineSvg: DIAGRAMS.VIRUS,
    drawThis: true,
    content:
      'A virus has none of the parts of a cell. It can only multiply inside a living cell of another organism.',
    notes: [
      {
        tone: 'write',
        text: 'A **virus** has only a **protein coat** round its **genetic material**.\nNo cell wall, no cell membrane, no cytoplasm, no ribosomes — and it is far **smaller** than a bacterium.',
      },
    ],
    check: {
      id: 'c12',
      q: 'Which of these does a bacterium have that a virus does not?',
      options: [
        { val: 'A', text: 'Genetic material' },
        { val: 'B', text: 'Cytoplasm' },
        { val: 'C', text: 'A protein coat' },
      ],
      correct: 'B',
      expEn: 'A bacterium is a cell, so it has cytoplasm (and a cell wall, a cell membrane and ribosomes). Both have genetic material, and the protein coat belongs to the virus.',
    },
  },

  // ── 20 · How HIV is transmitted ────────────────────────────────────────────
  {
    layout: 'stack',
    accent: RED,
    icon: 'ShieldAlert',
    columns: 2,
    eyebrow: 'Only through body fluids',
    title: 'How HIV Is Transmitted',
    content:
      'HIV cannot survive outside the body. It is passed on only when the **body fluids** of an infected person get into the body of another.',
    notes: [
      { tone: 'write', badge: 'Sexual contact', text: 'During **unprotected sexual intercourse** — in semen and in the fluid of the vagina.' },
      { tone: 'write', badge: 'Blood contact', text: 'By **sharing needles**, or a **transfusion** of blood that has not been screened.' },
      { tone: 'write', badge: 'Mother to baby', text: 'Across the placenta or during **childbirth**, and in **breast milk**.' },
      { tone: 'info', badge: 'Not like this', text: 'It is **not** passed on by touching, shaking hands, sharing cups, coughing or sneezing.' },
    ],
    activity: {
      id: 'a3',
      type: 'sort',
      prompt: 'Sort each one: can HIV be transmitted this way, or not?',
      bins: [
        { id: 'yes', name: 'Can transmit HIV' },
        { id: 'no', name: 'Cannot transmit HIV' },
      ],
      cards: [
        { id: 'sex', name: 'Unprotected sexual intercourse', bin: 'yes' },
        { id: 'needle', name: 'Sharing a needle to inject drugs', bin: 'yes' },
        { id: 'milk', name: 'Breast feeding by an infected mother', bin: 'yes' },
        { id: 'hands', name: 'Shaking hands', bin: 'no' },
        { id: 'cup', name: 'Drinking from the same cup', bin: 'no' },
        { id: 'sneeze', name: 'Being near someone who sneezes', bin: 'no' },
      ],
      explain: 'HIV is carried in blood, semen, vaginal fluid and breast milk, so it spreads only when one of those fluids passes from an infected person into someone else. It is a fragile virus: it is not spread through the air, by touch, or on cups and plates.',
    },
  },

  // ── 21 · What HIV does to the immune system ────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'ShieldAlert',
    eyebrow: 'Why an HIV infection is so dangerous',
    title: 'HIV and the Immune System',
    content:
      'Most pathogens are destroyed by white blood cells. HIV is different: the cells it infects **are** white blood cells.',
    notes: [
      {
        tone: 'write',
        text: 'HIV **infects and destroys white blood cells** (lymphocytes).\nThe number of lymphocytes falls, so **fewer antibodies** are made.\nThe body **cannot fight other infections**, such as pneumonia. This is **AIDS**.',
      },
    ],
    check: {
      id: 'c13',
      q: 'Why does a person with AIDS often die of another infection, such as pneumonia?',
      options: [
        { val: 'A', text: 'HIV turns into the pneumonia pathogen after a few years' },
        { val: 'B', text: 'HIV has destroyed so many white blood cells that the body cannot fight other pathogens' },
        { val: 'C', text: 'HIV destroys the red blood cells, so less oxygen is carried' },
      ],
      correct: 'B',
      expEn: 'HIV destroys lymphocytes, a kind of white blood cell. With too few of them, the immune system cannot make enough antibodies to destroy other pathogens, so an infection that a healthy person would survive can be fatal.',
    },
  },

  // ── 22 · Controlling the spread ────────────────────────────────────────────
  {
    layout: 'stack',
    accent: GREEN,
    icon: 'ShieldCheck',
    columns: 2,
    eyebrow: 'Each one blocks a route',
    title: 'Controlling the Spread of HIV',
    notes: [
      { tone: 'write', badge: 'Condoms', text: 'A **barrier** that stops body fluids passing between partners.' },
      { tone: 'write', badge: 'Clean needles', text: '**Never sharing** needles; using a sterile needle every time.' },
      { tone: 'write', badge: 'Testing and tracing', text: '**Testing** people, and tracing their contacts, so they know and can avoid passing it on.' },
      { tone: 'write', badge: 'Antiretroviral drugs', text: 'Stop the virus multiplying. People **live longer**, and are far less likely to pass it on — including a mother to her baby.' },
    ],
    check: {
      id: 'c14',
      q: 'Antiretroviral drugs do not cure HIV. What do they do?',
      options: [
        { val: 'A', text: 'They destroy every virus in the body within a week' },
        { val: 'B', text: 'They act as a barrier during sexual intercourse' },
        { val: 'C', text: 'They stop the virus multiplying, so the person stays healthy for longer' },
      ],
      correct: 'C',
      expEn: 'Antiretroviral drugs stop HIV multiplying inside the cells. The virus is still there, but the person can live a long and healthy life and is much less likely to infect anyone else. A condom is the barrier.',
    },
  },

  // ── 23 · The mistakes to avoid ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'ShieldAlert',
    eyebrow: 'Three ways marks are lost',
    title: 'Watch Out',
    content:
      '> **Urethra, ureter, uterus.** The **urethra** carries urine (and semen) out of the body. A **ureter** joins a kidney to the bladder. The **uterus** is where the embryo develops.\n> **Oviduct or uterus?** Fertilisation is in the **oviduct**. Implantation is in the **uterus lining**.\n> **Testis, twice.** The testes **make sperm**, and **meiosis** happens there. One letter can be the answer to two parts of a question.',
    check: {
      id: 'c15',
      q: 'On a diagram of the male reproductive system, which part is the answer to BOTH "where meiosis occurs" and "which produces sperm"?',
      options: [
        { val: 'A', text: 'The testis' },
        { val: 'B', text: 'The prostate gland' },
        { val: 'C', text: 'The sperm duct' },
      ],
      correct: 'A',
      expEn: 'Sperm are made in the testes, and they are made by meiosis — so it is the same organ both times. The prostate gland makes the fluid, and the sperm duct only carries the sperm.',
    },
  },

  // ── 24 · Recap ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: PINK,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Check your notebook against this list',
    title: 'Can You Do All Eight?',
    content:
      '> Your notebook should now have about **30 definitions**, **two tables** of parts and functions, and **9 diagrams**: the male and female systems, a sperm, an egg, the journey to the egg, the 28-day wheel, HIV, a bacterium and a virus.',
    items: [
      { text: 'Label the **male** reproductive system and give the function of each part.' },
      { text: 'Label the **female** reproductive system and give the function of each part.' },
      { text: 'Describe how a **sperm** and an **egg** are adapted, and compare them.' },
      { text: 'Describe **fertilisation**, and say where it and **implantation** happen.' },
      { text: 'Compare the chromosomes of a **gamete** and a **zygote**.' },
      { text: 'Describe the **menstrual cycle**, and say when **ovulation** happens.' },
      { text: 'Say how **HIV** is transmitted and how its spread is controlled.' },
      { text: 'Describe the effect of HIV on the **immune system**.' },
    ],
    check: {
      id: 'c16',
      q: 'A sperm has an acrosome. An egg has a jelly coat. How do the two work together?',
      options: [
        { val: 'A', text: 'The jelly coat supplies energy to the acrosome' },
        { val: 'B', text: 'The acrosome turns into the jelly coat after fertilisation' },
        { val: 'C', text: 'Enzymes from the acrosome digest a path through the jelly coat' },
      ],
      correct: 'C',
      expEn: 'The acrosome is a small bag of enzymes at the tip of the sperm. They digest a pathway through the jelly coat so that the head of the sperm can reach the egg membrane.',
    },
  },
];
