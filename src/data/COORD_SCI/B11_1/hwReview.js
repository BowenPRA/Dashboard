// src/data/COORD_SCI/B11_1/hwReview.js
// Homework Review — Wolsey Hall IGCSE Co-ordinated Sciences, Assignment 10,
// the questions on reproduction in PLANTS: multiple choice 11, 13, 14, 16, 19
// and 20, and structured question 21. (B10_1 reviews the coordination
// questions; B11_2 reviews human reproduction and HIV.)
//
// Each question is asked again, then worked: the steps, what the examiner
// credits, a model answer to copy, and the trap. A written question is re-asked
// in a form the screen can mark — dropdowns, or the marking points sorted into
// "earns a mark" and "does not".
//
// FIGURES. The downloaded assignment had lost most of its pictures. The table
// in Q11 is the paper's own; the flower in Q14, the flasks in Q20 and the
// wind-pollinated flower of Q21 (Fig. 1.1) are REDRAWN here and say so, because
// the letters on the student's own paper may not match. Item shape: the top of
// src/tasks/Workbook.jsx.
import { DIAGRAMS } from './diagrams.js';

const A10 = 'Assignment 10 · Question ';
const REDRAWN = 'This figure has been **redrawn** for the review, so the letters may not be in the same places as on your paper. Find the same **part** on yours.';

export const hwReview = [
  {
    tier: 'Multiple choice · Questions 11 to 20',
    theme: 'Practice',
    questions: [
      {
        id: 'q11', type: 'mcq', source: A10 + '11', marks: 1,
        prompt: 'What are the characteristics of **asexual** reproduction?',
        inlineSvg: DIAGRAMS.TABLE_Q11, wide: true,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'D',
        solution: [
          'Asexual reproduction has **one parent** and **no gametes**. With no gametes, there are no gamete nuclei to fuse — so the first column is a **cross**.',
          'The offspring are copies of that one parent: **genetically identical**. No genetic variety — so the second column is a **cross** too.',
          'Two crosses is row D. Row A (two ticks) describes **sexual** reproduction.',
        ],
        tip: 'Learn the two definitions as opposites: sexual = fusion + variation; asexual = no fusion + no variation.',
        answer: 'D — no fusion, no genetic variety',
      },
      {
        id: 'q13', type: 'mcq', source: A10 + '13', marks: 1,
        prompt: 'What must **always** be available to allow seeds to germinate?',
        options: [
          { val: 'A', text: 'A  Carbon dioxide' },
          { val: 'B', text: 'B  Light' },
          { val: 'C', text: 'C  Mineral salts' },
          { val: 'D', text: 'D  Water' },
        ],
        correct: 'D',
        solution: [
          'The three conditions for germination are **water**, **oxygen** and a **suitable temperature**. Only one of them is in the list.',
          '**Carbon dioxide** and **light** are for photosynthesis — a seed has no leaves yet, and lives on its food store.',
          '**Mineral salts** are taken in by roots later on, once the plant is growing.',
        ],
        tip: 'A seed germinates underground, in the dark. That is how you know light cannot be essential.',
        answer: 'D — Water',
      },
      {
        id: 'q14', type: 'mcq', source: A10 + '14', marks: 1,
        prompt: 'The diagram shows a flower. In which structure do seeds develop?',
        inlineSvg: DIAGRAMS.FLOWER_AD, wide: true,
        figureNote: REDRAWN,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'B',
        solution: [
          'A seed is a **fertilised ovule**, and the ovules are inside the **ovary** — the swollen part at the base of the carpel, in the middle of the flower.',
          'On this drawing **B** points to the ovary. **A** is an anther (it makes pollen), **C** is a petal and **D** is the stigma (it catches pollen).',
        ],
        tip: 'On your own paper, the answer is whichever letter points at the **ovary**: the rounded part at the bottom of the centre of the flower.',
        answer: 'B — the ovary (on this drawing)',
      },
      {
        id: 'q16', type: 'mcq', source: A10 + '16', marks: 1,
        prompt: 'Which environmental condition is **not** essential for the germination of all seeds?',
        options: [
          { val: 'A', text: 'A  Availability of light.' },
          { val: 'B', text: 'B  Availability of oxygen.' },
          { val: 'C', text: 'C  Availability of water.' },
          { val: 'D', text: 'D  Suitable temperature.' },
        ],
        correct: 'A',
        solution: [
          'Cross off the three conditions every seed needs: **water**, **oxygen**, **suitable temperature**. They are options C, B and D.',
          'What is left is **light**. Most seeds germinate in the dark, under the soil.',
        ],
        tip: 'Underline the word "not" before you start. This is Question 13 asked the other way round.',
        answer: 'A — Availability of light',
      },
      {
        id: 'q19', type: 'mcq', source: A10 + '19', marks: 1,
        prompt: 'Which combination of structural features is found in a **wind-pollinated** flower?',
        options: [
          { val: 'A', text: 'A  Anthers inside flower, smooth pollen, no scent' },
          { val: 'B', text: 'B  Coloured petals, sticky pollen, strong scent' },
          { val: 'C', text: 'C  Large flowers, nectaries present, light pollen' },
          { val: 'D', text: 'D  No petals, anthers outside flower, no nectaries' },
        ],
        correct: 'D',
        solution: [
          'A wind-pollinated flower has nothing to attract an insect: **no petals**, **no scent**, **no nectaries**. Its **anthers hang outside** the flower, and its pollen is small, smooth and light.',
          'All three parts of an option have to be right. **A** fails on "anthers inside flower". **C** fails on "large flowers" and "nectaries present".',
          '**B** describes an insect-pollinated flower in every part.',
          'Only **D** is right three times over.',
        ],
        tip: 'In a "combination" question, one wrong feature rules the whole option out. Hunt for the wrong one.',
        answer: 'D — no petals, anthers outside flower, no nectaries',
      },
      {
        id: 'q20', type: 'mcq', source: A10 + '20', marks: 1,
        prompt: 'The diagram shows four flasks which were set up to investigate the conditions needed for germination. In which experiment will the seeds germinate most quickly?',
        inlineSvg: DIAGRAMS.FLASKS, wide: true,
        figureNote: 'The picture on your paper was missing from the file. This one has been **redrawn** from the labels that were left: dry cotton wool, boiled water, damp cotton wool, and the four temperatures.',
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'C',
        solution: [
          'For each flask ask: does it have **water**, **oxygen** and a **suitable temperature**?',
          '**A** — dry cotton wool: no water.',
          '**B** — under boiled water: boiling drives out the dissolved oxygen, so there is no oxygen.',
          '**D** — damp, but at 2 °C: too cold for the enzymes to work quickly.',
          '**C** has damp cotton wool (water), air in the flask (oxygen) and 18 °C — all three.',
        ],
        tip: 'Always test all three conditions, flask by flask. The wrong flasks are each missing exactly one.',
        answer: 'C — damp cotton wool at 18 °C',
      },
    ],
  },
  {
    tier: 'Structured question · 21',
    theme: 'Challenge',
    questions: [
      {
        id: 'q21ai', type: 'inline', source: A10 + '21(a)(i)', marks: 2,
        prompt: 'Fig. 1.1 is a diagram of a wind-pollinated flower. Identify the part of the flower that produces pollen. On the paper you draw a label line **and** add its name. Here, choose where the line goes and what you write.',
        inlineSvg: DIAGRAMS.WIND_FLOWER_Y, wide: true,
        figureNote: 'Fig. 1.1 was missing from the file, so this wind-pollinated flower has been **drawn for the review**, with **Y** on a feathery stigma.',
        textParts: ['The label line goes to ', ', and the name to write is ', '.'],
        blanks: {
          1: {
            correct: 'hanging',
            options: [
              { val: 'hanging', text: 'a hanging yellow part' },
              { val: 'feathery', text: 'a feathery part at the top' },
              { val: 'base', text: 'the swelling at the base' },
            ],
          },
          2: {
            correct: 'anther',
            options: [
              { val: 'anther', text: 'anther' },
              { val: 'stigma', text: 'stigma' },
              { val: 'ovary', text: 'ovary' },
              { val: 'filament', text: 'filament' },
            ],
          },
        },
        solution: [
          'Pollen is made in the **anthers**.',
          'In a wind-pollinated flower the anthers **hang outside** the flower on long filaments, so the wind can shake the pollen out. They are the two fat yellow structures at the ends of the thin stalks.',
          'The label line must **touch** the anther itself — not the filament it hangs from. Writing "stamen" is not exact enough: the stamen is the anther and the filament together.',
        ],
        markScheme: ['a label line drawn to an anther', 'the name "anther"'],
        tip: 'Two marks, two things to do: a **line** and a **name**. A name with no line (or a line with no name) earns only one.',
        answer: 'a line to a hanging anther, labelled "anther"',
      },
      {
        id: 'q21aii', type: 'mcq', source: A10 + '21(a)(ii)', marks: 1,
        prompt: 'Draw an **X** on Fig. 1.1 to identify the part where **fertilisation** takes place. Where does the X go?',
        inlineSvg: DIAGRAMS.WIND_FLOWER_Y, wide: true,
        options: [
          { val: 'A', text: 'On a feathery stigma' },
          { val: 'B', text: 'On an anther' },
          { val: 'C', text: 'On the ovary, at the base of the flower' },
          { val: 'D', text: 'On a filament' },
        ],
        correct: 'C',
        solution: [
          'Fertilisation is a pollen nucleus fusing with a nucleus **in an ovule**.',
          'The ovules are inside the **ovary** — the small swelling at the base of the flower, where the stigmas and filaments join on.',
          'The stigma is where **pollination** ends. Fertilisation happens later, lower down.',
        ],
        markScheme: ['X drawn on the ovary / on an ovule'],
        tip: 'Pollination → stigma. Fertilisation → ovule (in the ovary). Do not swap them.',
        answer: 'On the ovary (the ovule inside it)',
      },
      {
        id: 'q21aiii', type: 'dnd', source: A10 + '21(a)(iii)', marks: 2,
        prompt: 'Describe **two** ways that the part labelled **Y** is adapted for wind-pollination. Sort the five statements.',
        inlineSvg: DIAGRAMS.WIND_FLOWER_Y, wide: true,
        bank: [
          { val: 'feathery', text: 'It is feathery, so it has a large surface area to catch pollen.' },
          { val: 'outside', text: 'It hangs outside the flower, where the wind can reach it.' },
          { val: 'colour', text: 'It is brightly coloured to attract insects.' },
          { val: 'nectar', text: 'It produces nectar.' },
          { val: 'pollen', text: 'It makes large amounts of light pollen.' },
        ],
        targets: [
          { id: 'yes', title: 'Earns a mark' },
          { id: 'no', title: 'Does not earn a mark' },
        ],
        correctSets: { yes: ['feathery', 'outside'], no: ['colour', 'nectar', 'pollen'] },
        solution: [
          'First name Y: the feathery structure sticking out at the top is a **stigma**. Its job is to **catch pollen**.',
          'It is **feathery**: a large surface area, like a net.',
          'It **hangs outside** the flower, exposed to the wind that is carrying the pollen.',
          'Colour and nectar attract insects — no use to the wind. **Making** pollen is the anther\'s job, not the stigma\'s.',
        ],
        markScheme: ['feathery / large surface area', 'hangs outside the flower / exposed to the wind', '(so that it can) catch / trap pollen'],
        modelAnswer: 'Y is a stigma. It is feathery, which gives it a large surface area to catch pollen grains. It also hangs outside the flower, so the wind can blow pollen onto it.',
        tip: 'If Y on **your** paper points at an anther instead, the two answers are: it hangs outside the flower, and it is loosely attached so the wind can shake the pollen out.',
        answer: 'feathery (large surface area) · hangs outside the flower',
      },
      {
        id: 'q21aiv', type: 'dnd', source: A10 + '21(a)(iv)', marks: 2,
        prompt: 'Describe **two** ways a pollen grain from an insect-pollinated flower is different from a pollen grain from a wind-pollinated flower. Sort the six descriptions.',
        bank: [
          { val: 'large', text: 'larger and heavier' },
          { val: 'sticky', text: 'sticky or spiky' },
          { val: 'few', text: 'made in smaller amounts' },
          { val: 'small', text: 'smaller and lighter' },
          { val: 'smooth', text: 'smooth' },
          { val: 'many', text: 'made in huge amounts' },
        ],
        targets: [
          { id: 'insect', title: 'Pollen of an insect-pollinated flower' },
          { id: 'wind', title: 'Pollen of a wind-pollinated flower' },
        ],
        correctSets: { insect: ['large', 'sticky', 'few'], wind: ['small', 'smooth', 'many'] },
        solution: [
          'Insect pollen has to **stick** to an insect: it is **larger** and **sticky or spiky**.',
          'Wind pollen has to **float** on the air: it is **smaller**, **lighter** and **smooth**.',
          'The question asks how the **insect** grain is different, so write about that one: "it is larger, and it is spiky (or sticky)".',
        ],
        markScheme: ['larger / heavier', 'sticky / spiky / rough surface'],
        modelAnswer: 'A pollen grain from an insect-pollinated flower is larger and heavier than one from a wind-pollinated flower. It is also sticky or spiky, so that it sticks to the body of an insect, but wind-blown pollen is smooth.',
        tip: 'A difference needs a **comparing** word: larger, heavier, stickier. "It is big" on its own does not compare anything.',
        answer: 'insect pollen is larger (heavier) and sticky or spiky',
      },
      {
        id: 'q21b', type: 'dnd', source: A10 + '21(b)', marks: 3,
        prompt: 'Some plants are able to reproduce asexually. Describe the **disadvantages** of asexual reproduction for plants in the wild. Sort the six statements: which three would earn a mark?',
        bank: [
          { val: 'novar', text: 'There is no genetic variation — the offspring are all identical.' },
          { val: 'disease', text: 'A disease or a change in conditions that kills one plant could kill them all.' },
          { val: 'compete', text: 'The offspring grow close to the parent, so they compete for light, water and minerals.' },
          { val: 'two', text: 'It needs two parents.' },
          { val: 'slow', text: 'It is a slow way to reproduce.' },
          { val: 'insects', text: 'It needs insects to carry pollen.' },
        ],
        targets: [
          { id: 'yes', title: 'Earns a mark' },
          { id: 'no', title: 'Does not earn a mark' },
        ],
        correctSets: { yes: ['novar', 'disease', 'compete'], no: ['two', 'slow', 'insects'] },
        solution: [
          'Start from the definition: asexual reproduction gives **genetically identical** offspring. So there is **no variation**.',
          'Say why that matters: if a **disease** arrives, or the **environment changes**, none of them is any better adapted than the rest — they could **all** die.',
          'A second, separate problem: there are no seeds to disperse, so the offspring grow **close to the parent** and **compete** with it and with each other.',
          'The three wrong statements are all about **sexual** reproduction, which is slower and needs two gametes and pollination.',
        ],
        markScheme: [
          'no genetic variation / offspring are genetically identical (clones)',
          'less able to adapt to a change in the environment / all could be killed by the same disease',
          'offspring are not dispersed, so there is competition / overcrowding',
        ],
        modelAnswer: 'The offspring are genetically identical to the parent, so there is no genetic variation. If a new disease arrives or the environment changes, all the plants could be killed, because none of them is better adapted than the others. The offspring also grow close to the parent plant, so they compete with it for light, water and mineral ions.',
        tip: 'Three marks = three separate points. "No variation" and "they are all the same" are one point said twice.',
        answer: 'no variation · one disease or change could kill them all · competition',
      },
    ],
  },
];
