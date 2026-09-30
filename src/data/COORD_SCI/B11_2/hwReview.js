// src/data/COORD_SCI/B11_2/hwReview.js
// Homework Review — Wolsey Hall IGCSE Co-ordinated Sciences, Assignment 10,
// the questions on reproduction in HUMANS and on HIV: multiple choice 12, 15,
// 17 and 18, and structured questions 23 and 24. (B10_1 reviews the
// coordination questions; B11_1 reviews the plant questions.)
//
// Each question is asked again, then worked: the steps, what the examiner
// credits, a model answer to copy, and the trap. A written question is re-asked
// in a form the screen can mark — dropdowns, or the marking points sorted into
// "earns a mark" and "does not".
//
// FIGURES. The downloaded assignment had lost most of its pictures. Q12 is the
// paper's own figure. Q15's timeline, Q17, Q18, Fig. 1.1 and Fig. 1.2 of Q23,
// and Fig. 5.1 and Fig. 5.2 of Q24 are REDRAWN here (from the coursebook's
// figures, with letters in place of labels) and say so, because the letters and
// the numbers on the student's own paper may not match. Item shape: the top of
// src/tasks/Workbook.jsx.
import { DIAGRAMS } from './diagrams.js';

const A10 = 'Assignment 10 · Question ';
const REDRAWN = 'This figure has been **redrawn** for the review, so the letters may not be in the same places as on your paper. Find the same **part** on yours.';
const LETTERS = ['A', 'B', 'C', 'D', 'E'].map((l) => ({ val: l, text: l }));

export const hwReview = [
  {
    tier: 'Multiple choice · Questions 12 to 18',
    theme: 'Practice',
    questions: [
      {
        id: 'q12', type: 'mcq', source: A10 + '12', marks: 1,
        prompt: 'The diagram shows a human female’s reproductive organs. What is the name of structure **X**?',
        image: 'images/COORD_SCI/B11_2/hw-q12-female.jpg',
        imageAlt: 'A front view of the female reproductive organs. X points to the narrow neck at the bottom of the uterus, where it meets the vagina.',
        options: [
          { val: 'A', text: 'A  Cervix' },
          { val: 'B', text: 'B  Ovary' },
          { val: 'C', text: 'C  Oviduct' },
          { val: 'D', text: 'D  Ovule' },
        ],
        correct: 'A',
        solution: [
          'Follow the line from X. It ends at the **narrow neck** at the bottom of the uterus, just above the vagina.',
          'That ring of muscle at the opening of the uterus is the **cervix**.',
          'The **ovaries** are the two round organs at the sides; the **oviducts** are the tubes at the top. An **ovule** is part of a flower — it is not in a human at all.',
        ],
        tip: 'Ovule is a plant word. When a human question offers it, cross it out straight away.',
        answer: 'A — Cervix',
      },
      {
        id: 'q15', type: 'mcq', source: A10 + '15', marks: 1,
        prompt: 'The diagram shows a timeline of a woman’s menstrual cycle, which lasts for 28 days. On which days of the menstrual cycle is a woman **most likely to become pregnant**?',
        inlineSvg: DIAGRAMS.MENSTRUAL_WHEEL_Q, wide: true,
        options: [
          { val: 'A', text: 'A  Days 1 – 4' },
          { val: 'B', text: 'B  Days 7 – 10' },
          { val: 'C', text: 'C  Days 13 – 16' },
          { val: 'D', text: 'D  Days 20 – 23' },
        ],
        correct: 'C',
        solution: [
          'Pregnancy needs an **egg** to be there. An egg is released at **ovulation**, about halfway through the cycle: **day 14** of 28.',
          'The egg lives for only a day or two, so the days round day 14 are the ones that matter: **days 13–16**.',
          'Days 1–4 are during menstruation. By days 20–23 the egg has already gone.',
        ],
        tip: 'Halve the length of the cycle to find ovulation: 28 ÷ 2 = day 14.',
        answer: 'C — Days 13 – 16',
      },
      {
        id: 'q17', type: 'mcq', source: A10 + '17', marks: 1,
        prompt: 'The diagram shows the female reproductive system. Where does **implantation** normally occur?',
        image: 'images/COORD_SCI/B11_2/hw-q17-female.jpg',
        imageAlt: 'A front view of the female reproductive system. B points to an oviduct, A to an ovary, C to the lining of the uterus and D to the vagina.',
        figureNote: REDRAWN,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'C',
        solution: [
          '**Implantation** is the embryo sinking into the **lining of the uterus**.',
          'On this drawing **C** points to the uterus lining. **B** is an oviduct (where fertilisation happens), **A** is an ovary (where eggs are made) and **D** is the vagina.',
        ],
        tip: 'On your own paper, the answer is whichever letter points into the **uterus** — the large space in the middle. Do not choose the oviduct: that is fertilisation.',
        answer: 'C — the lining of the uterus (on this drawing)',
      },
      {
        id: 'q18', type: 'mcq', source: A10 + '18', marks: 1,
        prompt: 'The diagram shows the male reproductive system. What is the tube labelled **X**?',
        image: 'images/COORD_SCI/B11_2/hw-q18-male-side.jpg',
        imageAlt: 'A side view of the male reproductive system. X labels the white tube that leaves the testis and loops up over the bladder.',
        figureNote: REDRAWN,
        options: [
          { val: 'A', text: 'A  Rectum' },
          { val: 'B', text: 'B  Sperm duct (vas deferens)' },
          { val: 'C', text: 'C  Ureter' },
          { val: 'D', text: 'D  Urethra' },
        ],
        correct: 'B',
        solution: [
          'Trace the tube to see where it **starts**. Here X is the tube leaving the **testis** and looping up over the bladder.',
          'A tube that carries sperm away from a testis is a **sperm duct**.',
          'The **urethra** starts at the bladder and runs down through the penis. A **ureter** runs from a kidney to the bladder. The **rectum** is part of the gut.',
        ],
        tip: 'If X on **your** paper is the tube running down the middle of the penis from the bladder, the answer is the urethra. Always check where the tube starts.',
        answer: 'B — Sperm duct (on this drawing)',
      },
    ],
  },
  {
    tier: 'Structured questions · 23 and 24',
    theme: 'Challenge',
    questions: [
      {
        id: 'q23a', type: 'inline', source: A10 + '23(a)', marks: 4,
        prompt: 'Fig. 1.1 is a diagram of the male reproductive system in humans. State the letter that represents each part.',
        image: 'images/COORD_SCI/B11_2/hw-q23-male-front.jpg',
        imageAlt: 'A front view of the male reproductive system. A points to a sperm duct, B to the prostate gland, C to the urethra, D to a testis and E to the scrotum.',
        figureNote: REDRAWN,
        textParts: ['Where meiosis occurs: ', '. Which secretes fluid for sperm to swim in: ', '. Which carries urine: ', '. Which produces sperm: ', '.'],
        blanks: {
          1: { correct: 'D', options: LETTERS },
          2: { correct: 'B', options: LETTERS },
          3: { correct: 'C', options: LETTERS },
          4: { correct: 'D', options: LETTERS },
        },
        solution: [
          'Name all five letters first. On this drawing: **A** sperm duct, **B** prostate gland, **C** urethra, **D** testis, **E** scrotum.',
          '**Meiosis** is the cell division that makes gametes, so it happens where sperm are made: the **testis** (D).',
          'The **prostate gland** (B) secretes the fluid.',
          'The **urethra** (C) carries urine from the bladder — and semen too.',
          'Sperm are **produced** in the **testis** — D again.',
        ],
        markScheme: ['meiosis — the testis', 'fluid — the prostate gland', 'urine — the urethra', 'produces sperm — the testis'],
        tip: 'A letter can be used **twice** (or not at all). Four parts and five letters is the clue.',
        answer: 'D, B, C, D',
      },
      {
        id: 'q23b', type: 'dnd', source: A10 + '23(b)', marks: 2,
        prompt: 'Fig. 1.2 is a drawing of a sperm cell. The paper asks you to label **two** features that adapt it for reproduction. Here, match each numbered feature to what it does.',
        image: 'images/COORD_SCI/B11_2/hw-q23-sperm.jpg', wide: true,
        imageAlt: 'A sperm cell. 1 is the long tail, 2 is the middle piece behind the head, 3 is the cap on the front of the head, 4 is the dark centre of the head.',
        figureNote: 'Fig. 1.2 was missing from the file, so this sperm cell has been **redrawn**, with numbers on four features.',
        bank: [
          { val: 'swim', text: 'swims, to move the sperm to the egg' },
          { val: 'energy', text: 'mitochondria here release energy for swimming' },
          { val: 'enzymes', text: 'contains enzymes that digest the jelly coat of the egg' },
          { val: 'chromosomes', text: 'carries the haploid set of chromosomes' },
        ],
        targets: [
          { id: 't1', title: '1 — flagellum (tail)' },
          { id: 't2', title: '2 — middle piece' },
          { id: 't3', title: '3 — acrosome' },
          { id: 't4', title: '4 — nucleus' },
        ],
        correctSets: { t1: ['swim'], t2: ['energy'], t3: ['enzymes'], t4: ['chromosomes'] },
        solution: [
          'An **adaptation** is a feature plus what it is **for**. Name the feature on the label line, then add its job.',
          '**Flagellum** — for swimming to the egg.',
          '**Middle piece with many mitochondria** — they release the energy for swimming.',
          '**Acrosome** — contains enzymes that digest a way through the jelly coat.',
        ],
        markScheme: ['flagellum / tail (for swimming)', 'acrosome (containing enzymes)', 'mitochondria / middle piece (to release energy)', 'any two, each correctly labelled'],
        tip: 'Two marks, so label **two** features — and the label line must touch the right part of the drawing.',
        answer: 'flagellum · mitochondria in the middle piece · acrosome (any two)',
      },
      {
        id: 'q23c', type: 'inline', source: A10 + '23(c)', marks: 1,
        prompt: 'Describe the difference between the arrangement of chromosomes found in the nuclei of sperm and those in a zygote.',
        textParts: ['The nucleus of a sperm is ', ': its chromosomes are ', '. The nucleus of a zygote is ', ': its chromosomes are ', '.'],
        blanks: {
          1: { correct: 'haploid', options: [{ val: 'haploid', text: 'haploid' }, { val: 'diploid', text: 'diploid' }] },
          2: { correct: 'single', options: [{ val: 'single', text: 'single — one of each kind (23)' }, { val: 'pairs', text: 'in pairs (46)' }] },
          3: { correct: 'diploid', options: [{ val: 'diploid', text: 'diploid' }, { val: 'haploid', text: 'haploid' }] },
          4: { correct: 'pairs', options: [{ val: 'pairs', text: 'in pairs (46)' }, { val: 'single', text: 'single — one of each kind (23)' }] },
        },
        solution: [
          'A sperm is a **gamete**, so it is **haploid**: one set of 23 chromosomes. They are **single** — not in pairs.',
          'A zygote is made when a sperm and an egg fuse: 23 + 23 = 46. It is **diploid**, and its chromosomes are **in pairs**.',
        ],
        markScheme: ['sperm: haploid / one set / unpaired chromosomes AND zygote: diploid / two sets / chromosomes in pairs'],
        modelAnswer: 'The nucleus of a sperm is haploid, so it has one set of single chromosomes. The nucleus of a zygote is diploid, so it has two sets and the chromosomes are in pairs.',
        tip: 'A "difference" needs **both** halves. Writing only "a sperm is haploid" does not get the mark.',
        answer: 'sperm: haploid, single chromosomes · zygote: diploid, in pairs',
      },
      {
        id: 'q24ai', type: 'inline', source: A10 + '24(a)(i)', marks: 2,
        prompt: 'Fig. 5.1 is a diagram of the human immunodeficiency virus (HIV). Name the parts of the virus labelled **X** and **Y**.',
        image: 'images/COORD_SCI/B11_2/hw-q24-hiv.jpg',
        imageAlt: 'A cut-away drawing of HIV. X points to the outer layer and to the ring of small spheres inside it. Y points to the coiled strand in the centre.',
        figureNote: REDRAWN,
        textParts: ['X is the ', '. Y is the ', '.'],
        blanks: {
          1: { correct: 'protein', options: [{ val: 'protein', text: 'protein coat' }, { val: 'wall', text: 'cell wall' }, { val: 'membrane', text: 'cell membrane' }, { val: 'genetic', text: 'genetic material' }] },
          2: { correct: 'genetic', options: [{ val: 'genetic', text: 'genetic material (RNA)' }, { val: 'nucleus', text: 'nucleus' }, { val: 'cytoplasm', text: 'cytoplasm' }, { val: 'protein', text: 'protein coat' }] },
        },
        solution: [
          'A virus has only **two** kinds of part: a coat made of **protein**, and **genetic material** inside it.',
          'X points at the coat and the spheres that make it: **protein coat**.',
          'Y points at the strand in the very centre: the **genetic material** (in HIV it is RNA).',
          'A virus is not a cell, so "cell wall", "cell membrane", "nucleus" and "cytoplasm" are never right for a virus.',
        ],
        markScheme: ['X — protein (coat)', 'Y — genetic material / RNA'],
        answer: 'X — protein coat · Y — genetic material (RNA)',
      },
      {
        id: 'q24aii', type: 'dnd', source: A10 + '24(a)(ii)', marks: 3,
        prompt: 'State **three** ways in which the structure of bacteria differs from the structure of viruses. Sort each structure: which ones can you use as a difference?',
        inlineSvgSolved: DIAGRAMS.BACTERIUM, wide: true,
        bank: [
          { val: 'wall', text: 'cell wall' },
          { val: 'membrane', text: 'cell membrane' },
          { val: 'cytoplasm', text: 'cytoplasm' },
          { val: 'ribosomes', text: 'ribosomes' },
          { val: 'genetic', text: 'genetic material' },
          { val: 'coat', text: 'protein coat' },
        ],
        targets: [
          { id: 'bacteria', title: 'Only in a bacterium' },
          { id: 'both', title: 'In both — not a difference' },
          { id: 'virus', title: 'Only in a virus' },
        ],
        correctSets: { bacteria: ['wall', 'membrane', 'cytoplasm', 'ribosomes'], both: ['genetic'], virus: ['coat'] },
        solution: [
          'A bacterium is a **cell**. A virus is **not** a cell. So list the parts of a cell that a virus lacks.',
          'A bacterium has a **cell wall**, a **cell membrane**, **cytoplasm** and **ribosomes** (and may have plasmids). A virus has none of them.',
          'A virus has a **protein coat** instead.',
          'Both have **genetic material**, so that is not a difference.',
        ],
        markScheme: ['bacteria have a cell wall; viruses do not', 'bacteria have a cell membrane; viruses do not', 'bacteria have cytoplasm / ribosomes / plasmids; viruses do not', 'viruses have a protein coat; bacteria do not', 'any three'],
        modelAnswer: 'Bacteria have a cell wall, but viruses do not. Bacteria have a cell membrane and cytoplasm, but viruses do not. Viruses have a protein coat, but bacteria do not.',
        tip: 'It asks about **structure**. "Viruses are smaller" is true, but the safest three answers are parts that one has and the other does not.',
        answer: 'cell wall · cell membrane · cytoplasm (or ribosomes) — bacteria have them, viruses do not',
      },
      {
        id: 'q24bi', type: 'dnd', source: A10 + '24(b)(i)', marks: 4,
        prompt: 'Fig. 5.2 shows the estimated numbers for sub-Saharan Africa. **Summarise** the changes between 1990 and 2009 in the number of people living with HIV and the number of people newly infected. Sort the six statements.',
        inlineSvg: DIAGRAMS.HIV_GRAPHS, wide: true, stack: true,
        figureNote: 'Fig. 5.2 was missing from the file. These two graphs have been **redrawn** to show the same trends; the exact values on your paper may be a little different, so read the numbers from **your** graphs.',
        bank: [
          { val: 'livingUp', text: 'The number of people living with HIV increased the whole time.' },
          { val: 'slower', text: 'It rose steeply at first, and more slowly after about 2000.' },
          { val: 'peak', text: 'The number newly infected rose to a peak in about 1997.' },
          { val: 'fell', text: 'After the peak, the number newly infected fell.' },
          { val: 'livingDown', text: 'The number of people living with HIV fell after 2000.' },
          { val: 'newUp', text: 'The number newly infected rose every year.' },
        ],
        targets: [
          { id: 'yes', title: 'Earns a mark' },
          { id: 'no', title: 'Does not earn a mark' },
        ],
        correctSets: { yes: ['livingUp', 'slower', 'peak', 'fell'], no: ['livingDown', 'newUp'] },
        solution: [
          '"Summarise" means **describe the pattern** — you are not asked to explain it. Take one graph at a time.',
          '**Living with HIV:** the line goes up all the way. It is steep until about 2000, then much flatter.',
          '**Newly infected:** the line goes up to a **peak** (about 2.6 million in 1997), then comes **down**.',
          'Add **figures with units** from the graph: for example, "from about 6 million in 1990 to about 22.5 million in 2009".',
        ],
        markScheme: [
          'the number living with HIV increased (throughout)',
          'the increase was rapid at first, then slower / levelled off',
          'the number newly infected increased to a peak (in the mid-1990s)',
          'then the number newly infected decreased',
          'a correct figure, with units, quoted from a graph',
        ],
        modelAnswer: 'The number of people living with HIV increased throughout, from about 6 million in 1990 to about 22.5 million in 2009. It rose quickly until about 2000 and then more slowly. The number of people newly infected rose from about 1.3 million in 1990 to a peak of about 2.6 million in 1997. After that it fell, to about 1.9 million in 2009.',
        tip: 'Four marks, two graphs: aim for **two points about each graph**, and quote at least one number with its unit (millions).',
        answer: 'living: up all the time, more slowly after 2000 · newly infected: up to a peak, then down',
      },
      {
        id: 'q24c', type: 'dnd', source: A10 + '24(c)', marks: 2,
        prompt: '**Suggest** why in 2010 the number of people living with HIV increased but the number of newly infected people decreased. Sort the five statements.',
        inlineSvg: DIAGRAMS.HIV_GRAPHS, wide: true, stack: true,
        bank: [
          { val: 'longer', text: 'People with HIV are living longer, because of antiretroviral drugs.' },
          { val: 'stillNew', text: 'There are still new infections each year, and they add to the total.' },
          { val: 'prevent', text: 'Education, condoms and testing mean that fewer people are being infected.' },
          { val: 'cured', text: 'People who are infected are cured after a few years.' },
          { val: 'noSpread', text: 'HIV can no longer be passed from person to person.' },
        ],
        targets: [
          { id: 'yes', title: 'Earns a mark' },
          { id: 'no', title: 'Does not earn a mark' },
        ],
        correctSets: { yes: ['longer', 'stillNew', 'prevent'], no: ['cured', 'noSpread'] },
        solution: [
          'Take the two halves separately. Why are there **fewer new** infections? Because prevention is working: education, condoms, testing, clean needles, screened blood.',
          'Why is the **total still rising**? People are still being infected every year, and those who already have HIV are **not dying as soon**, because antiretroviral drugs keep them alive.',
          'So more people join the total than leave it — even though fewer join than before.',
          'There is no cure for HIV, and it can still be transmitted.',
        ],
        markScheme: [
          'people with HIV are living longer / fewer are dying (because of antiretroviral drugs / better treatment)',
          'there are still new infections, which add to the total',
          'fewer new infections because of education / condoms / testing / less needle sharing',
          'any two',
        ],
        modelAnswer: 'The number of new infections fell because of better education and the use of condoms. The total number living with HIV still rose because people were still being infected, and because antiretroviral drugs mean that people with HIV now live much longer.',
        tip: '"Suggest" means use what you know to give a sensible reason. There is more than one acceptable answer.',
        answer: 'people with HIV live longer (antiretrovirals) · fewer new infections (prevention)',
      },
      {
        id: 'q24d', type: 'dnd', source: A10 + '24(d)', marks: 3,
        prompt: 'Describe **three** ways in which HIV is transmitted from infected to uninfected people. Sort the six.',
        bank: [
          { val: 'sex', text: 'unprotected sexual intercourse' },
          { val: 'needles', text: 'sharing needles, or a transfusion of infected blood' },
          { val: 'mother', text: 'from mother to baby — at birth, or in breast milk' },
          { val: 'hands', text: 'shaking hands or hugging' },
          { val: 'cups', text: 'sharing cups, plates or food' },
          { val: 'air', text: 'coughing and sneezing' },
        ],
        targets: [
          { id: 'yes', title: 'Transmits HIV — earns a mark' },
          { id: 'no', title: 'Does not transmit HIV' },
        ],
        correctSets: { yes: ['sex', 'needles', 'mother'], no: ['hands', 'cups', 'air'] },
        solution: [
          'HIV is passed on only in **body fluids**: blood, semen, vaginal fluid and breast milk.',
          'That gives three routes: **sexual contact**, **blood-to-blood contact**, and **mother to baby**.',
          'The virus is fragile. It is not spread by touch, through the air, or on cups and plates.',
        ],
        markScheme: [
          'unprotected sexual intercourse / sexual contact',
          'blood-to-blood contact: sharing needles / unscreened blood transfusion',
          'from mother to baby: across the placenta / during birth / in breast milk',
        ],
        modelAnswer: 'HIV can be passed on during unprotected sexual intercourse. It can be passed on by blood-to-blood contact, for example when people share needles to inject drugs. It can also be passed from an infected mother to her baby during birth or in her breast milk.',
        tip: '"Describe" wants a short phrase for each, not one word. "Blood" alone is weak; "sharing needles, so infected blood enters the body" is a description.',
        answer: 'sexual contact · blood-to-blood contact · mother to baby',
      },
      {
        id: 'q24e', type: 'inline', source: A10 + '24(e)', marks: 3,
        prompt: 'Describe the effects of HIV on the immune system.',
        textParts: [
          'HIV infects and destroys ',
          '. The number of these cells falls, so fewer ',
          ' are produced. The body can no longer ',
          ', and the person may develop AIDS.',
        ],
        blanks: {
          1: { correct: 'white', options: [{ val: 'white', text: 'white blood cells (lymphocytes)' }, { val: 'red', text: 'red blood cells' }, { val: 'platelets', text: 'platelets' }] },
          2: { correct: 'antibodies', options: [{ val: 'antibodies', text: 'antibodies' }, { val: 'antibiotics', text: 'antibiotics' }, { val: 'hormones', text: 'hormones' }] },
          3: { correct: 'fight', options: [{ val: 'fight', text: 'fight other infections' }, { val: 'carry', text: 'carry oxygen' }, { val: 'clot', text: 'make its blood clot' }] },
        },
        solution: [
          'HIV attacks the cells that normally defend the body: **white blood cells** called **lymphocytes**.',
          'It **destroys** them, so their number slowly falls. Lymphocytes make **antibodies**, so fewer antibodies are produced.',
          'With a weakened immune system the body **cannot fight other pathogens**. Infections that are usually mild become dangerous — this is AIDS.',
        ],
        markScheme: [
          'HIV infects / destroys lymphocytes (white blood cells)',
          'fewer antibodies are produced / the immune system is weakened',
          'the body cannot fight other infections / pathogens (leading to AIDS)',
        ],
        modelAnswer: 'HIV infects lymphocytes, which are white blood cells, and destroys them. The number of lymphocytes falls, so fewer antibodies are made and the immune system is weakened. The body cannot fight other infections, so the person may develop AIDS.',
        tip: 'Anti**bodies** are made by the body. Anti**biotics** are medicines, and they do not work on viruses at all.',
        answer: 'destroys lymphocytes · fewer antibodies · cannot fight other infections',
      },
    ],
  },
];
