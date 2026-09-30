// src/data/COORD_SCI/B10_1/notes.js
// B10 Coordination and response — the nervous system (B10.01), hormones
// (B10.02) and homeostasis (B10.03). Written from the teacher's snips of the
// Cambridge IGCSE Co-ordinated Sciences coursebook, for the student who has just
// sat Wolsey Hall Assignment 10 on this chapter. English-only, like the track.
//
// This deck is built to be COPIED. Every orange "Write This Down" card is a
// note for the notebook, in lines short enough to write in one go, and every
// picture with the yellow "Draw This" corner is a diagram to copy and label.
// The closing slide counts them, so the student can check the notebook against
// the deck. The pictures are the coursebook's own figures (cropped into
// public/images/COORD_SCI/B10_1); the schemes and graphs are drawn in
// diagrams.js.
//
// Body copy is kept to two or three short sentences a slide. Beside a check, a
// split slide's text column is about 330 px wide on a 1280 × 720 laptop, and a
// long paragraph pushes the orange card — the point of the slide — off the
// bottom of it.
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
const INDIGO = '#4338ca';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'Brain',
    brand: 'IGCSE Coordinated Science',
    eyebrow: 'B10 Coordination and response',
    title: 'How Your Body Senses, Decides and Responds',
    card: {
      icon: 'NotebookPen',
      badge: 'Notebook open — then think',
      text: 'Get your **notebook** ready: every **orange box** in this lesson is a note to copy, and every picture with a **yellow corner** is a diagram to draw. First, think: you touch a hot pan and your hand jumps back **before** you feel the pain. Why is it useful that the pulling away happens before the thinking?',
    },
  },

  // ── 2 · The five steps of every response ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Route',
    eyebrow: 'B10.01 The nervous system',
    title: 'Stimulus, Receptor, Effector',
    ratio: 44,
    inlineSvg: DIAGRAMS.RESPONSE_CHAIN,
    drawThis: true,
    content:
      'Every response your body makes follows the same five steps. Copy the chain, with the hot pan example beside it.',
    notes: [
      {
        tone: 'write',
        text: '**Stimulus:** a change in the environment.\n**Receptor:** a cell that detects a stimulus.\n**Effector:** a **muscle** or a **gland** — it carries out the response.',
      },
    ],
    check: {
      id: 'c1',
      q: 'You smell food cooking and your mouth waters. What is the effector?',
      options: [
        { val: 'A', text: 'The smell of the food' },
        { val: 'B', text: 'The salivary glands — they secrete saliva' },
        { val: 'C', text: 'The receptor cells in the nose' },
      ],
      correct: 'B',
      expEn: 'The smell is the stimulus and the cells in your nose are the receptors. The part that ACTS is the effector — here a gland, releasing saliva. Effectors are always muscles or glands.',
    },
  },

  // ── 3 · The neurone ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'The cell that carries the message',
    title: 'A Neurone Is a Nerve Cell',
    ratio: 46,
    image: 'images/COORD_SCI/B10_1/motor-neurone.jpg',
    drawThis: true,
    content:
      'A neurone is a cell stretched into long, thin fibres, so it can carry a signal a long way, fast. The signal goes **one way**: in at the dendrites, away down the axon.',
    notes: [
      {
        tone: 'write',
        text: '**Neurone:** a nerve cell. It carries **electrical impulses**.\n**Dendrites:** short fibres that pick up impulses.\n**Axon:** the long fibre that carries the impulse away.\n**Myelin sheath:** a fatty layer that speeds the impulse up.',
      },
    ],
    check: {
      id: 'c2',
      q: 'In what form does a message travel along a neurone?',
      options: [
        { val: 'A', text: 'As a hormone carried in the blood' },
        { val: 'B', text: 'As a chemical that the axon pumps along inside it' },
        { val: 'C', text: 'As an electrical impulse' },
      ],
      correct: 'C',
      expEn: 'Neurones carry electrical impulses. Chemicals carried in the blood are hormones — a different, slower system that comes later in this lesson.',
    },
  },

  // ── 4 · Three types of neurone ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'GitMerge',
    eyebrow: 'Look for the cell body',
    title: 'Three Types of Neurone',
    ratio: 48,
    image: 'images/COORD_SCI/B10_1/neurone-types.jpg',
    drawThis: true,
    content:
      'An exam will ask you to tell them apart from a drawing. **Find the cell body first** — where it sits gives the neurone away.',
    notes: [
      {
        tone: 'write',
        text: '**Sensory neurone:** receptor → CNS. Cell body **off to the side**.\n**Relay neurone:** inside the CNS. **Short**.\n**Motor neurone:** CNS → effector. Cell body at **one end**.',
      },
    ],
    check: {
      id: 'c3',
      q: 'A drawing shows a neurone with its cell body at one end, a ring of dendrites round it, and then one very long axon. Which type is it?',
      options: [
        { val: 'A', text: 'A motor neurone' },
        { val: 'B', text: 'A sensory neurone' },
        { val: 'C', text: 'A relay neurone' },
      ],
      correct: 'A',
      expEn: 'Cell body at the END, then a long axon: motor neurone. A sensory neurone has its cell body off to the side, part-way along the fibre; a relay neurone is short.',
    },
  },

  // ── 5 · CNS and PNS ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Brain',
    eyebrow: 'Two parts, two sets of initials',
    title: 'The Central and Peripheral Nervous Systems',
    ratio: 52,
    image: 'images/COORD_SCI/B10_1/cns.jpg',
    drawThis: true,
    content:
      'The **central** nervous system is only two things. Its job is to **coordinate**: it receives impulses and sends them on to the right place. All the **nerves** outside it are the **peripheral** nervous system.',
    notes: [
      {
        tone: 'write',
        text: '**CNS** = brain + spinal cord.\n**PNS** = the nerves **outside** the brain and spinal cord.',
      },
      {
        tone: 'homework',
        text: 'A nerve in your arm is **not** part of the CNS, even though it is joined to it.',
      },
    ],
    check: {
      id: 'c4',
      q: 'Which of these is part of the central nervous system?',
      options: [
        { val: 'A', text: 'A nerve running down the arm' },
        { val: 'B', text: 'A touch receptor in the skin' },
        { val: 'C', text: 'The spinal cord' },
      ],
      correct: 'C',
      expEn: 'The CNS is the brain and the spinal cord, and nothing else. Nerves and receptors are outside it, so they belong to the peripheral nervous system.',
    },
  },

  // ── 6 · The reflex arc in the arm ──────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Hand',
    eyebrow: 'Follow the blue line with your finger',
    title: 'A Hand on a Hot Plate',
    ratio: 38,
    image: 'images/COORD_SCI/B10_1/reflex-arc.jpg',
    content:
      '**1** A **pain receptor** in the finger detects the heat.\n**2** A **sensory neurone** carries an impulse up the arm to the spinal cord.\n**3** A **relay neurone** passes it across the spinal cord.\n**4** A **motor neurone** carries it back down the arm.\n**5** The arm **muscle** contracts and pulls the hand away.',
    notes: [
      {
        tone: 'write',
        text: '**Reflex arc:** receptor → sensory neurone → relay neurone → motor neurone → effector.',
      },
    ],
  },

  // ── 7 · The reflex arc as a diagram to copy ────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'The version to learn',
    title: 'Draw the Reflex Arc',
    ratio: 44,
    image: 'images/COORD_SCI/B10_1/reflex-schematic.jpg',
    drawThis: true,
    content:
      'The same pathway with everything else taken away. Copy it **with the arrows**. The relay neurone is inside the **spinal cord** — the brain is not on the diagram at all.',
    notes: [
      {
        tone: 'plant',
        text: 'The order, by first letters: **R S R M E** — **R**eceptor, **S**ensory, **R**elay, **M**otor, **E**ffector.',
      },
    ],
    activity: {
      id: 'a1',
      type: 'order',
      prompt: 'Put the five parts of the reflex arc in the order the impulse passes through them.',
      steps: [
        { id: 'receptor', name: 'Receptor' },
        { id: 'sensory', name: 'Sensory neurone' },
        { id: 'relay', name: 'Relay neurone' },
        { id: 'motor', name: 'Motor neurone' },
        { id: 'effector', name: 'Effector' },
      ],
      explain: 'The impulse starts where the stimulus is detected (the receptor), goes IN to the spinal cord along the sensory neurone, across the relay neurone, and OUT along the motor neurone to the effector — the muscle that does the pulling.',
    },
  },

  // ── 8 · Reflex (involuntary) and voluntary actions ─────────────────────────
  {
    layout: 'compare',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'Did you decide to do it?',
    title: 'Reflex Actions and Voluntary Actions',
    columns: [
      {
        heading: 'Involuntary (reflex)',
        accent: RED,
        icon: 'Zap',
        content: 'Blinking, coughing, sneezing, pulling away from heat.',
        notes: [
          {
            tone: 'write',
            text: '**Reflex action:** a **fast**, **automatic** response to a stimulus. No decision is needed, so it **protects** the body quickly.',
          },
        ],
      },
      {
        heading: 'Voluntary',
        accent: BLUE,
        icon: 'Brain',
        content: 'Talking, reading, cycling, picking up a pen.',
        notes: [
          {
            tone: 'write',
            text: '**Voluntary action:** an action you **decide** to do. It starts in the brain, so it is **slower**.',
          },
        ],
      },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'Sort each action: is it involuntary (a reflex) or voluntary?',
      bins: [
        { id: 'inv', name: 'Involuntary' },
        { id: 'vol', name: 'Voluntary' },
      ],
      cards: [
        { id: 'cough', name: 'Coughing', bin: 'inv' },
        { id: 'sneeze', name: 'Sneezing', bin: 'inv' },
        { id: 'blink', name: 'Blinking when dust hits your eye', bin: 'inv' },
        { id: 'talk', name: 'Talking', bin: 'vol' },
        { id: 'cycle', name: 'Cycling', bin: 'vol' },
        { id: 'read', name: 'Reading', bin: 'vol' },
      ],
      explain: 'Coughing, sneezing and blinking happen to you — nobody decides to sneeze. Talking, cycling and reading are all things you choose to start and can choose to stop, so they are voluntary.',
    },
  },

  // ── 9 · Sense organs ───────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: ORANGE,
    icon: 'Eye',
    columns: 2,
    eyebrow: 'Where the receptors are',
    title: 'Sense Organs',
    content:
      'Receptor cells are often grouped together into a **sense organ**. Each one responds to **one kind of stimulus** — your eye cannot hear, and your ear cannot see.',
    notes: [
      {
        tone: 'write',
        text: '**Sense organ:** a group of **receptor cells** that respond to one particular stimulus — light, sound, touch, temperature or chemicals.',
      },
      {
        tone: 'info',
        badge: 'Five to know',
        text: '**Eye** — light.  **Ear** — sound.\n**Nose** and **tongue** — chemicals.\n**Skin** — touch, pressure, temperature, pain.',
      },
    ],
    check: {
      id: 'c5',
      q: 'Which type of cell do ALL sense organs contain?',
      options: [
        { val: 'A', text: 'Receptor cells' },
        { val: 'B', text: 'Effector cells' },
        { val: 'C', text: 'Ciliated cells' },
      ],
      correct: 'A',
      expEn: 'A sense organ is a group of receptor cells — that is its definition. Effectors (muscles and glands) carry out responses; they do not detect anything.',
    },
  },

  // ── 10 · Bridge to hormones ────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'A second way to send a message',
    title: 'Fast Is Not Always What You Need',
    label: 'Think',
    labelIcon: 'MessageSquare',
    text: 'A nerve impulse is over in a fraction of a second and reaches **one** muscle. How could the body send a message to **many** organs at once — and make it **last** for minutes or hours?',
  },

  // ── 11 · Hormones and endocrine glands ─────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Droplet',
    eyebrow: 'B10.02 Hormones',
    title: 'Chemical Messages in the Blood',
    ratio: 46,
    image: 'images/COORD_SCI/B10_1/endocrine.jpg',
    drawThis: true,
    content:
      'Put a **chemical** into the blood and it reaches every organ — but only its **target organs** respond. Copy the outline and mark the four glands.',
    notes: [
      {
        tone: 'write',
        text: '**Hormone:** a chemical substance, produced by a **gland** and carried by the **blood**, which alters the activity of one or more specific **target organs**.',
      },
    ],
    check: {
      id: 'c6',
      q: 'How does a hormone get from the gland that makes it to its target organ?',
      options: [
        { val: 'A', text: 'It travels along a neurone as an impulse' },
        { val: 'B', text: 'It is carried in the blood' },
        { val: 'C', text: 'It passes down a tube that joins the two organs' },
      ],
      correct: 'B',
      expEn: 'Endocrine glands release hormones straight into the blood, which carries them round the whole body in the plasma. Only the target organs respond.',
    },
  },

  // ── 12 · Four glands and their hormones ────────────────────────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'ListChecks',
    columns: 2,
    eyebrow: 'Copy these as a table: gland · hormone · what it does',
    title: 'Four Glands, Five Hormones',
    notes: [
      {
        tone: 'write',
        badge: 'Adrenal glands',
        text: '**Adrenaline** — prepares the body for action ("fight or flight").',
      },
      {
        tone: 'write',
        badge: 'Pancreas',
        text: '**Insulin** — lowers blood glucose. **Glucagon** — raises it.',
      },
      {
        tone: 'write',
        badge: 'Testes',
        text: '**Testosterone** — causes the male secondary sexual characteristics.',
      },
      {
        tone: 'write',
        badge: 'Ovaries',
        text: '**Oestrogen** — causes the female secondary sexual characteristics; helps control the menstrual cycle.',
      },
    ],
    check: {
      id: 'c7',
      q: 'Which of these organs produces a hormone?',
      options: [
        { val: 'A', text: 'The lung' },
        { val: 'B', text: 'The ovary' },
        { val: 'C', text: 'The spinal cord' },
      ],
      correct: 'B',
      expEn: 'The ovaries are endocrine glands: they make oestrogen. The lungs exchange gases and the spinal cord carries nerve impulses — neither secretes a hormone.',
    },
  },

  // ── 13 · Adrenaline ────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'HeartPulse',
    eyebrow: 'The "fight or flight" hormone',
    title: 'What Adrenaline Does',
    content:
      'When you are **frightened** or **excited**, the **adrenal glands** (one above each kidney) secrete adrenaline. It gets more glucose and more oxygen to the muscles, so they can respire faster.',
    notes: [
      {
        tone: 'write',
        text: 'Adrenaline:\n• **increases breathing rate** — more oxygen into the blood;\n• **increases heart rate** — blood reaches the muscles faster;\n• **widens the pupils** — more light enters the eye;\n• makes the **liver release glucose** — more fuel for respiration.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Adrenaline makes one organ release glucose into the blood. Which organ?',
      options: [
        { val: 'A', text: 'The liver' },
        { val: 'B', text: 'The adrenal gland' },
        { val: 'C', text: 'The kidney' },
      ],
      correct: 'A',
      expEn: 'The liver stores glucose as glycogen, so it is the organ that can release glucose. The adrenal gland MAKES the adrenaline — it is the gland, not the target organ.',
    },
  },

  // ── 14 · Nervous v hormonal ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: INDIGO,
    icon: 'ArrowLeftRight',
    eyebrow: 'A favourite two-mark question — copy both lists',
    title: 'Nervous Control and Hormonal Control',
    columns: [
      {
        heading: 'Nervous system',
        accent: BLUE,
        icon: 'Zap',
        notes: [
          {
            tone: 'write',
            text: 'Made of **neurones**.\nThe message is an **electrical impulse**.\nIt travels **along neurones**.\nIt is **very fast**.\nThe effect lasts a **short time**.',
          },
        ],
      },
      {
        heading: 'Hormonal (endocrine) system',
        accent: PURPLE,
        icon: 'Droplet',
        notes: [
          {
            tone: 'write',
            text: 'Made of **glands**.\nThe message is a **chemical** (a hormone).\nIt is carried **in the blood**.\nIt is **slower**.\nThe effect **lasts longer**.',
          },
        ],
      },
    ],
    check: {
      id: 'c9',
      q: 'Which statement correctly compares the two systems?',
      options: [
        { val: 'A', text: 'Hormones are faster, but the effect of a nerve impulse lasts longer' },
        { val: 'B', text: 'Both are carried in the blood, but only hormones are chemicals' },
        { val: 'C', text: 'Nerve impulses are faster, but the effect of a hormone usually lasts longer' },
      ],
      correct: 'C',
      expEn: 'Speed and how long the effect lasts are the two differences to learn: nerves are fast and short-lived, hormones are slower and longer-lasting. Only hormones travel in the blood.',
    },
  },

  // ── 15 · Homeostasis ───────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Gauge',
    eyebrow: 'B10.03 Homeostasis',
    title: 'Keeping the Inside the Same',
    content:
      'The world outside you keeps changing — hot, cold, a big meal, no meal. The cells inside you need conditions to stay almost the same.',
    notes: [
      {
        tone: 'write',
        text: '**Homeostasis:** the maintenance of a **constant internal environment**.\nThree things kept constant: **body temperature** (37 °C), **blood glucose concentration**, and the **water content** of the blood.',
      },
    ],
    check: {
      id: 'c10',
      q: 'Which of these is an example of homeostasis?',
      options: [
        { val: 'A', text: 'Keeping the blood glucose concentration steady' },
        { val: 'B', text: 'Breathing in oxygen' },
        { val: 'C', text: 'Passing undigested food out through the anus' },
      ],
      correct: 'A',
      expEn: 'Homeostasis means keeping a condition INSIDE the body constant. Regulating blood glucose does exactly that. Breathing and egestion are life processes, but neither holds an internal condition steady.',
    },
  },

  // ── 16 · Controlling blood glucose ─────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Repeat',
    eyebrow: 'Two hormones, one gland, one store',
    title: 'Controlling Blood Glucose',
    ratio: 42,
    inlineSvg: DIAGRAMS.GLUCOSE_LOOP,
    drawThis: true,
    content:
      'The **pancreas** detects the glucose concentration and secretes a hormone. The **liver** then does the work. Start in the middle of the diagram and follow each loop round.',
    notes: [
      {
        tone: 'write',
        text: '**Too high:** the pancreas secretes **insulin**. The liver stores glucose as **glycogen**, so blood glucose **falls**.\n**Too low:** the pancreas secretes **glucagon**. The liver breaks glycogen down to glucose, so blood glucose **rises**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'After a meal the blood glucose concentration rises. What brings it back down?',
      options: [
        { val: 'A', text: 'Adrenaline, secreted by the adrenal glands' },
        { val: 'B', text: 'Glucagon, secreted by the pancreas' },
        { val: 'C', text: 'Insulin, secreted by the pancreas' },
      ],
      correct: 'C',
      expEn: 'Insulin is the only hormone here that LOWERS blood glucose: it makes the liver take glucose in and store it as glycogen. Glucagon and adrenaline both raise it.',
    },
  },

  // ── 17 · Three words that look alike ───────────────────────────────────────
  {
    layout: 'stack',
    accent: RED,
    icon: 'AlertTriangle',
    columns: 3,
    eyebrow: 'The spelling decides the mark',
    title: 'Glucose, Glycogen, Glucagon',
    content: 'Three words, one letter apart. Write each one with its meaning, and say them aloud.',
    notes: [
      { tone: 'write', badge: 'Glucose', text: 'The **sugar** carried in the blood. Cells use it in respiration.' },
      { tone: 'write', badge: 'Glycogen', text: 'The **store** of glucose in the liver. It is a carbohydrate, not a hormone.' },
      { tone: 'write', badge: 'Glucagon', text: 'The **hormone** that raises blood glucose. When the glucose is **gone**, you need gluca**gon**.' },
    ],
    check: {
      id: 'c12',
      q: 'Which of the three is a hormone?',
      options: [
        { val: 'A', text: 'Glycogen' },
        { val: 'B', text: 'Glucagon' },
        { val: 'C', text: 'Glucose' },
      ],
      correct: 'B',
      expEn: 'Glucagon is the hormone, secreted by the pancreas when blood glucose is too low. Glycogen is the storage carbohydrate in the liver, and glucose is the sugar itself.',
    },
  },

  // ── 18 · Negative feedback ─────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Activity',
    eyebrow: 'The idea behind all homeostasis',
    title: 'Negative Feedback and the Set Point',
    ratio: 44,
    inlineSvg: DIAGRAMS.NEGATIVE_FEEDBACK,
    drawThis: true,
    content:
      'The value is never perfectly still — it wobbles above and below normal. Each time, the body responds in a way that **reverses** the change.',
    notes: [
      {
        tone: 'write',
        text: '**Set point:** the normal value of a condition in the body.\n**Negative feedback:** a change away from the set point causes a response that brings the value **back** to the set point.',
      },
    ],
    check: {
      id: 'c13',
      q: 'Blood glucose falls below its set point, so glucagon is secreted and the glucose rises again. Why is this called NEGATIVE feedback?',
      options: [
        { val: 'A', text: 'Because the glucose concentration became a negative number' },
        { val: 'B', text: 'Because the response reverses the change that caused it' },
        { val: 'C', text: 'Because the response makes the change even bigger' },
      ],
      correct: 'B',
      expEn: '"Negative" means opposite: the response pushes the value the opposite way to the change, back towards the set point. A response that made the change bigger would be positive feedback.',
    },
  },

  // ── 19 · Reading a blood glucose graph ─────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'LineChart',
    eyebrow: 'The graph the exam likes',
    title: 'Blood Glucose After a Meal',
    ratio: 44,
    inlineSvg: DIAGRAMS.GLUCOSE_GRAPH,
    drawThis: true,
    content:
      'A meal containing starch is eaten at time 0. Sketch the curve and write the three labels on it.',
    notes: [
      {
        tone: 'write',
        text: '**1 Rises:** starch is digested to glucose, which is absorbed into the blood.\n**2 Falls:** the pancreas secretes insulin; the liver stores glucose as glycogen.\n**3 Dips, then rises:** the fall overshoots, so glucagon brings it back up.',
      },
    ],
    check: {
      id: 'c14',
      q: 'On the graph, the concentration falls between 1½ and 3½ hours. What is the best explanation?',
      options: [
        { val: 'A', text: 'Glucagon has been secreted, so the liver is releasing glucose' },
        { val: 'B', text: 'All the glucose has been lost from the body in urine' },
        { val: 'C', text: 'Insulin has been secreted, so the liver is storing glucose as glycogen' },
      ],
      correct: 'C',
      expEn: 'A FALL in blood glucose is the work of insulin: the pancreas secretes it and the liver converts glucose to glycogen (cells also use some in respiration). Glucagon does the opposite, later on, when the value has gone too low.',
    },
  },

  // ── 20 · The skin ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Controlling body temperature',
    title: 'A Section Through Skin',
    ratio: 34,
    image: 'images/COORD_SCI/B10_1/skin.jpg',
    drawThis: true,
    content:
      'The skin does most of the work of keeping you at 37 °C. Draw the section and label these five parts.',
    notes: [
      {
        tone: 'write',
        text: '**Sweat gland:** makes sweat.\n**Blood capillaries:** heat is lost from the blood here.\n**Hair erector muscle:** pulls the hair upright.\n**Temperature receptors:** detect a change.\n**Fat cells:** insulate the body.',
      },
    ],
  },

  // ── 21 · Too hot and too cold ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Thermometer',
    eyebrow: 'The brain (the hypothalamus) detects the temperature of the blood',
    title: 'Too Hot, Too Cold',
    ratio: 36,
    image: 'images/COORD_SCI/B10_1/skin-hot-cold.jpg',
    notes: [
      {
        tone: 'write',
        badge: 'Too hot — write this down',
        text: '**Vasodilation:** the arterioles supplying the skin capillaries get **wider**. More blood flows near the surface, so **more heat is lost**.\n**More sweat:** its water **evaporates**, taking heat from the skin.',
      },
      {
        tone: 'write',
        badge: 'Too cold — write this down',
        text: '**Vasoconstriction:** the arterioles get **narrower**. Less blood flows near the surface, so **less heat is lost**.\n**Shivering** releases heat. **Less sweat.** Hairs stand up and trap air.',
      },
    ],
  },

  // ── 22 · Sort the responses ────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Shuffle',
    eyebrow: 'Close your notebook for this one',
    title: 'Lose Heat, or Keep It?',
    content:
      'Every response in the skin does one of two jobs. When you are **too hot**, it helps the body **lose** heat. When you are **too cold**, it helps the body **keep** heat — or make more.\n\nAsk that one question about each card: does this lose heat, or keep it?',
    activity: {
      id: 'a3',
      type: 'sort',
      prompt: 'Sort each response: does it happen when the body is too hot or too cold?',
      bins: [
        { id: 'hot', name: 'Body too hot' },
        { id: 'cold', name: 'Body too cold' },
      ],
      cards: [
        { id: 'dilate', name: 'Arterioles in the skin dilate (widen)', bin: 'hot' },
        { id: 'sweat', name: 'Sweat production increases', bin: 'hot' },
        { id: 'flat', name: 'Hairs lie flat', bin: 'hot' },
        { id: 'constrict', name: 'Arterioles in the skin constrict (narrow)', bin: 'cold' },
        { id: 'shiver', name: 'Shivering', bin: 'cold' },
        { id: 'up', name: 'Hairs stand on end', bin: 'cold' },
      ],
      explain: 'When you are too hot the body tries to LOSE heat: wider arterioles bring more blood to the surface, and sweat evaporates. When you are too cold it tries to KEEP heat and make more: narrower arterioles, trapped air, and shivering.',
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
      '> **Blood vessels do not move.** Never write "the vessels move nearer the surface". They get **wider** or **narrower** — that is all.\n> **It is the arterioles that change**, not the capillaries.\n> **Sweat only cools you when it evaporates.** Write "the water in sweat **evaporates**, taking heat from the skin".',
    check: {
      id: 'c15',
      q: 'The body temperature rises above normal. What happens in the skin?',
      options: [
        { val: 'A', text: 'The arterioles dilate and sweat production increases' },
        { val: 'B', text: 'The arterioles constrict and sweat production increases' },
        { val: 'C', text: 'The arterioles dilate and sweat production decreases' },
      ],
      correct: 'A',
      expEn: 'Both changes have to help the body LOSE heat. Wider arterioles (dilation) bring more warm blood to the surface, and more sweat means more evaporation. Constriction and less sweat are the responses to being too cold.',
    },
  },

  // ── 24 · Recap ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Check your notebook against this list',
    title: 'Can You Do All Eight?',
    content:
      '> Your notebook should now have about **25 definitions**, the **gland and hormone table**, and **9 diagrams**: the response chain, a motor neurone, the three neurones, the CNS, the reflex arc, the glands, the glucose loop, the glucose graph and a section through skin.',
    items: [
      { text: 'Name the five parts of a **reflex arc**, in order.' },
      { text: 'Tell a **sensory**, **relay** and **motor** neurone apart in a drawing.' },
      { text: 'Say what the **CNS** is made of.' },
      { text: 'Define a **hormone**, and match four glands to their hormones.' },
      { text: 'List the effects of **adrenaline**.' },
      { text: 'Give two differences between **nervous** and **hormonal** control.' },
      { text: 'Explain how **insulin** and **glucagon** control blood glucose by **negative feedback**.' },
      { text: 'Explain how the skin responds when you are **too hot** and **too cold**.' },
    ],
    check: {
      id: 'c16',
      q: 'A runner finishes a race with a very fast heartbeat, fast breathing and wide pupils. Which hormone has caused all three?',
      options: [
        { val: 'A', text: 'Insulin' },
        { val: 'B', text: 'Oestrogen' },
        { val: 'C', text: 'Adrenaline' },
      ],
      correct: 'C',
      expEn: 'Increased heart rate, breathing rate and pupil diameter are the three effects of adrenaline to learn. Insulin lowers blood glucose; oestrogen is a sex hormone.',
    },
  },
];
