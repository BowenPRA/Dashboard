// src/data/OLEVEL_PHYS/C09_1/notes.js
// Magnets and Magnetic Fields — book spreads 9.1 "Magnets" and 9.2 "Magnetic
// fields" (pages 198–201). English-only (this track is not bilingual), so
// there are no `vn*` twins. First unit of the track: nothing to recap.
//
// The deck's spine follows the two spreads: the poles found with iron filings →
// naming them with a hanging magnet → the force law, PREDICTED before it is
// shown → induced magnetism, the induced pole PREDICTED first → steel keeps it,
// iron loses it → three ways to make a magnet → magnetic and non-magnetic
// metals → hard and soft → ferrous → atomic magnets → demagnetising → the
// filings pattern PREDICTED, then the field and its lines → plotting a line
// with a compass → which way the arrow points → two magnets' fields combined,
// the neutral point PREDICTED first → screening → the Earth's field → magnetic
// north and the useless compass at the pole → a countable recap.
//
// Directions, all worked out from the rules (and drawn the same way in
// diagrams.js): the induced pole nearest a magnet's N pole is S, nearest its S
// pole is N; field arrows run N → S outside a magnet, so a compass beside the
// middle of a bar magnet points towards its S end; the Earth's magnetic pole
// near the geographic North Pole is a magnetic S pole.
//
// Sized for a 1280×720 laptop: a split slide's text column is only ~400px wide
// beside its diagram, so each slide carries two short paragraphs and one
// copy-down note at most. The wide two-panel diagram gets ratio 40.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare symbols or abbreviations.
import { DIAGRAMS } from './diagrams.js';

const POLE = '#c8102e';     // N-pole red: the slides about poles
const SPOLE = '#1a5fa8';    // S-pole blue: steel, the Earth
const FIELD = '#3b82f6';    // field blue: the slides about fields
const PURPLE = '#5c2483';   // predictions
const TEAL = '#0087a8';     // materials
const IRON = '#64748b';     // iron, demagnetising
const INDIGO = '#4338ca';   // inside the magnet, the recap

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: SPOLE,
    icon: 'Magnet',
    brand: 'O Level Physics',
    eyebrow: 'Chapter 9 · Spreads 9.1 and 9.2',
    title: 'Magnets and Magnetic Fields',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'A compass needle always swings round to point **north**. Nobody is turning it. In one sentence — what do you think is pulling it?',
    },
  },

  // ── 2 · Magnetic poles ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: POLE,
    icon: 'Magnet',
    eyebrow: 'Spread 9.1 · magnetic poles',
    title: 'Magnetic Poles',
    ratio: 45,
    inlineSvg: DIAGRAMS.POLES_FILINGS,
    content:
      'Dip a small bar magnet into iron filings. The filings cling thickly to its two **ends** — and hardly at all to the middle.\n\n' +
      'The magnetic force seems to come from two points, called the **poles** of the magnet.',
    notes: [
      {
        tone: 'write',
        text: '**Pole:** one of the two places on a magnet where the magnetic force is strongest.',
      },
    ],
    check: {
      id: 'c1',
      q: 'A bar magnet is dipped into iron filings. Where do the filings cling most thickly?',
      options: [
        { val: 'A', text: 'Halfway along the magnet' },
        { val: 'B', text: 'At its two ends' },
        { val: 'C', text: 'Evenly all along it' },
      ],
      correct: 'B',
      expEn: 'The filings cluster at the two ends, because that is where the magnetic force is strongest — the poles. Very few cling to the middle.',
    },
  },

  // ── 3 · Naming the poles ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: POLE,
    icon: 'Compass',
    eyebrow: 'Spread 9.1 · north-seeking and south-seeking',
    title: 'Naming the Poles',
    ratio: 45,
    inlineSvg: DIAGRAMS.SUSPENDED_MAGNET,
    content:
      'Hang a bar magnet from a thread so it can turn freely. The Earth pulls on its poles, and it swings round until it lies roughly **north–south**.\n\n' +
      'That is how the two poles get their names.',
    notes: [
      {
        tone: 'write',
        text: '**North-seeking pole (N pole):** the end that points north. **South-seeking pole (S pole):** the end that points south.',
      },
    ],
    check: {
      id: 'c2',
      q: 'What does "north-seeking pole" mean?',
      options: [
        { val: 'A', text: 'The pole that is attracted to iron' },
        { val: 'B', text: 'The pole that was made at the North Pole' },
        { val: 'C', text: 'The pole that points towards north when the magnet can turn freely' },
      ],
      correct: 'C',
      expEn: 'A freely turning magnet comes to rest north–south. The end that "seeks" (points towards) the north is the north-seeking pole, the N pole. Both poles attract iron, and where the magnet was made does not matter.',
    },
  },

  // ── 4 · Predict: two N poles ────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Two North Poles Meet',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'The N poles of two bar magnets are slowly brought close together.',
    activity: {
      id: 'a1',
      type: 'predict',
      prompt: 'What happens?',
      options: [
        { val: 'attract', name: 'They attract — they pull together' },
        { val: 'repel', name: 'They repel — they push apart' },
        { val: 'nothing', name: 'Nothing happens until they touch' },
      ],
      correct: 'repel',
      explain: 'They **repel**: you can feel them push apart before they touch. Like poles repel. The next slide gives the whole law.',
    },
  },

  // ── 5 · The force law ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: POLE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Spread 9.1 · the force between poles',
    title: 'Like Poles and Unlike Poles',
    ratio: 45,
    inlineSvg: DIAGRAMS.POLES_FORCES,
    drawThis: true,
    content:
      'Bring the ends of two magnets together and there is a force between the poles. N near N: pushed apart. N near S: pulled together.\n\n' +
      'The force grows quickly as the poles get closer.',
    notes: [
      {
        tone: 'write',
        text: '**Like poles repel; unlike poles attract. The closer the poles, the greater the force.**',
      },
    ],
    check: {
      id: 'c3',
      q: 'The S pole of one magnet is brought towards the N pole of another, then moved closer still. What happens to the force?',
      options: [
        { val: 'A', text: 'The pull gets stronger' },
        { val: 'B', text: 'The pull gets weaker' },
        { val: 'C', text: 'They begin to repel' },
      ],
      correct: 'A',
      expEn: 'S and N are unlike poles, so they attract — and the closer the poles, the greater the force. They never start to repel: only like poles do that.',
    },
  },

  // ── 6 · Predict: the induced pole ──────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'A Nail Under a Magnet',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'An unmagnetised iron nail hangs point-down, just below the **N pole** of a magnet.',
    activity: {
      id: 'a2',
      type: 'predict',
      prompt: 'Which pole appears at the top of the nail, nearest the magnet?',
      options: [
        { val: 'n', name: 'An N pole' },
        { val: 's', name: 'An S pole' },
        { val: 'none', name: 'No pole — iron is not a magnet' },
      ],
      correct: 's',
      explain: 'An **S pole**. The magnet makes the nail into a magnet, and the pole nearest the magnet is always the opposite one — so unlike poles face each other, and the nail is pulled up. The next slide shows it.',
    },
  },

  // ── 7 · Induced magnetism ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: POLE,
    icon: 'Magnet',
    eyebrow: 'Spread 9.1 · why iron is attracted',
    title: 'Induced Magnetism',
    ratio: 50,
    inlineSvg: DIAGRAMS.INDUCED_POLES,
    drawThis: true,
    content:
      'Iron and steel **become magnets themselves** when a magnet is near: the magnet **induces** magnetism in them.\n\n' +
      'Unlike poles attract — so the metal is held.',
    notes: [
      {
        tone: 'write',
        text: '**Induced magnetism:** magnetism a material gains because a magnet is near it. The induced pole nearest the magnet is the opposite pole.',
      },
    ],
    check: {
      id: 'c4',
      q: 'A steel paper clip sticks to the S pole of a magnet. Why?',
      options: [
        { val: 'A', text: 'The paper clip was already a magnet' },
        { val: 'B', text: 'An N pole is induced in the clip next to the magnet, and unlike poles attract' },
        { val: 'C', text: 'An S pole is induced in the clip next to the magnet' },
      ],
      correct: 'B',
      expEn: 'The magnet induces magnetism in the clip. The pole nearest the S pole is the opposite one, an N pole, and N and S attract. An induced S pole would be repelled. The clip did not need to be a magnet first.',
    },
  },

  // ── 8 · Steel keeps it, iron loses it ──────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Spread 9.1 · permanent and temporary',
    title: 'Steel Keeps It, Iron Loses It',
    columns: [
      {
        heading: 'Steel',
        accent: SPOLE,
        icon: 'Magnet',
        content: 'Pulled right away from the magnet, steel **keeps** some of its induced magnetism. It has become a **permanent magnet**.',
      },
      {
        heading: 'Iron',
        accent: IRON,
        icon: 'Power',
        content: 'Pulled right away, iron loses virtually **all** of its induced magnetism. It was only a **temporary magnet**.',
      },
    ],
    activity: {
      id: 'a3',
      type: 'sort',
      prompt: 'Which metal does each card describe?',
      bins: [
        { id: 'steel', name: 'Steel (hard)' },
        { id: 'iron', name: 'Iron (soft)' },
      ],
      cards: [
        { id: 'keeps', name: 'keeps its magnetism', bin: 'steel' },
        { id: 'loses', name: 'loses its magnetism at once', bin: 'iron' },
        { id: 'hardmag', name: 'hard to magnetise', bin: 'steel' },
        { id: 'easymag', name: 'easy to magnetise', bin: 'iron' },
        { id: 'perm', name: 'makes permanent magnets', bin: 'steel' },
        { id: 'core', name: 'electromagnet cores', bin: 'iron' },
      ],
      explain: 'Steel is hard to magnetise but keeps its magnetism, so it makes permanent magnets. Iron is easy to magnetise but loses it at once, so it is used where the magnetism must switch off — the core of an electromagnet.',
    },
  },

  // ── 9 · Making a magnet ─────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: SPOLE,
    icon: 'ListChecks',
    eyebrow: 'Spread 9.1 · three ways, weakest first',
    title: 'Making a Magnet',
    dense: true,
    inlineSvg: DIAGRAMS.STROKING,
    content: '> Three ways to magnetise a bar of **steel**:',
    steps: [
      { text: 'Leave it **near a magnet**. It becomes a permanent magnet, but a weak one.' },
      { text: '**Stroke** it with one end of a magnet, always the same way, lifting the magnet well clear on the way back.' },
      { text: 'Put it in a long **coil** of wire carrying a large **direct** (one-way) current — the most effective way. (Next unit.)' },
    ],
    check: {
      id: 'c5',
      q: 'Which method makes the strongest magnet from a steel bar?',
      options: [
        { val: 'A', text: 'Stroking it with one end of a magnet' },
        { val: 'B', text: 'Leaving it near a magnet overnight' },
        { val: 'C', text: 'Putting it in a coil carrying a large direct current' },
      ],
      correct: 'C',
      expEn: 'A large direct current in a long coil is the most effective method. Stroking gives a stronger magnet than just leaving the steel near a magnet, which gives only a weak one.',
    },
  },

  // ── 10 · Magnetic and non-magnetic materials ───────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Spread 9.1 · which metals?',
    title: 'Magnetic and Non-Magnetic Materials',
    ratio: 50,
    inlineSvg: DIAGRAMS.MAGNETIC_METALS,
    content:
      'A **magnetic material** can be magnetised and is attracted to a magnet. All strongly magnetic materials contain **iron, nickel or cobalt**: they are **ferromagnetic**.\n\n' +
      'Other metals, and all non-metals, are **non-magnetic**.',
    notes: [
      {
        tone: 'write',
        text: '**Magnetic:** iron, nickel, cobalt, steel. **Non-magnetic:** copper, brass, aluminium, zinc, tin.',
      },
    ],
    activity: {
      id: 'a4',
      type: 'sort',
      prompt: 'Will a magnet attract it?',
      bins: [
        { id: 'mag', name: 'Magnetic' },
        { id: 'non', name: 'Non-magnetic' },
      ],
      cards: [
        { id: 'fe', name: 'iron', bin: 'mag' },
        { id: 'cu', name: 'copper', bin: 'non' },
        { id: 'ni', name: 'nickel', bin: 'mag' },
        { id: 'brass', name: 'brass', bin: 'non' },
        { id: 'co', name: 'cobalt', bin: 'mag' },
        { id: 'al', name: 'aluminium', bin: 'non' },
        { id: 'steel', name: 'steel', bin: 'mag' },
        { id: 'zn', name: 'zinc', bin: 'non' },
        { id: 'sn', name: 'tin', bin: 'non' },
      ],
      explain: 'Only iron, nickel and cobalt — and alloys made from them, like steel — are attracted. Copper, brass, aluminium, zinc and tin are metals, but they are non-magnetic: being a metal is not enough.',
    },
  },

  // ── 11 · Hard and soft ──────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Spread 9.1 · ferromagnetic materials',
    title: 'Hard and Soft Magnetic Materials',
    columns: [
      {
        heading: 'Hard',
        accent: SPOLE,
        icon: 'Magnet',
        content: '**Steel**, and alloys called **Alcomax** and **Magnadur**. Difficult to magnetise, but they do not readily lose their magnetism. Used for **permanent magnets**.',
      },
      {
        heading: 'Soft',
        accent: IRON,
        icon: 'Power',
        content: '**Iron** and **Mumetal**. Easy to magnetise, but the magnetism is only **temporary**. Used in the **cores** of electromagnets and transformers, because the magnetism can be switched on, off or reversed.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Why is iron, not steel, used for the core of an electromagnet?',
      options: [
        { val: 'A', text: 'Iron loses its magnetism as soon as the current is switched off' },
        { val: 'B', text: 'Iron makes a stronger permanent magnet than steel' },
        { val: 'C', text: 'Iron is cheaper than steel' },
      ],
      correct: 'A',
      expEn: 'Iron is a soft magnetic material: its magnetism is temporary, so the electromagnet switches off when the current does. A steel core would stay magnetised. Iron is not a good permanent magnet — that is steel\'s job — and the price is not the reason.',
    },
  },

  // ── 12 · Ferrous and non-ferrous ───────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Languages',
    eyebrow: 'Every class is an English class',
    title: 'Ferrous and Non-Ferrous',
    content:
      '"Ferrum" is the Latin word for **iron**. (The symbol for iron, Fe, comes from it.)\n\n' +
      '> • **Ferrous** metals: iron, and alloys containing iron, such as steel.\n' +
      '> • **Non-ferrous** metals: aluminium, copper and the other non-magnetic metals.',
    check: {
      id: 'c7',
      q: 'Which of these is a ferrous metal?',
      options: [
        { val: 'A', text: 'Brass' },
        { val: 'B', text: 'Aluminium' },
        { val: 'C', text: 'Steel' },
      ],
      correct: 'C',
      expEn: 'Ferrous means "containing iron". Steel is an alloy that is mainly iron, so it is ferrous. Brass (copper and zinc) and aluminium contain no iron, so they are non-ferrous.',
    },
  },

  // ── 13 · Where magnetism comes from ────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Atom',
    eyebrow: 'Spread 9.1 · atomic magnets',
    title: 'Where Magnetism Comes From',
    ratio: 45,
    inlineSvg: DIAGRAMS.ATOMIC_MAGNETS,
    content:
      'Every electron acts as a tiny magnet. In most atoms these effects cancel, but in some they do not — so each atom is a tiny magnet.\n\n' +
      'Unmagnetised, the atomic magnets point every way. As the material is magnetised, more and more **line up**, and billions act as **one big magnet**.',
    check: {
      id: 'c8',
      q: 'What happens inside a steel bar as it is magnetised?',
      options: [
        { val: 'A', text: 'New atoms are added to its ends' },
        { val: 'B', text: 'Its atomic magnets line up with each other' },
        { val: 'C', text: 'Its electrons stop moving' },
      ],
      correct: 'B',
      expEn: 'The atomic magnets were there all along, pointing every way. Magnetising lines more and more of them up, so their effects add instead of cancelling. No atoms are added, and the electrons keep moving — that motion is what makes each one a tiny magnet.',
    },
  },

  // ── 14 · Demagnetising ──────────────────────────────────────────────────
  {
    layout: 'split',
    accent: IRON,
    icon: 'Hammer',
    eyebrow: 'Spread 9.1 · losing magnetism',
    title: 'Demagnetising a Magnet',
    content:
      'If a magnet is **hammered**, its atomic magnets are thrown out of line, and it becomes **demagnetised**.\n\n' +
      'Heating it to a **high temperature** has the same effect. (A third way, using alternating current in a coil, is in the next unit.)',
    notes: [
      {
        tone: 'write',
        text: '**Demagnetise:** to make a magnet lose its magnetism — by hammering it, or by heating it strongly.',
      },
    ],
    check: {
      id: 'c9',
      q: 'A magnet is dropped on a hard floor many times and gets weaker. Why?',
      options: [
        { val: 'A', text: 'The knocks throw its atomic magnets out of line' },
        { val: 'B', text: 'It loses electrons each time it lands' },
        { val: 'C', text: 'Its N and S poles swap over' },
      ],
      correct: 'A',
      expEn: 'Each knock jolts the atomic magnets, and more and more of them end up pointing every way, so their effects cancel — just like hammering. No electrons are lost, and the poles do not swap; the magnet simply gets weaker.',
    },
  },

  // ── 15 · Predict: iron filings on paper ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Spread 9.2 · no answer yet — just predict',
    title: 'Iron Filings on Paper',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A sheet of paper is laid over a bar magnet. Iron filings are sprinkled on the paper, and the paper is gently tapped.',
    activity: {
      id: 'a5',
      type: 'predict',
      prompt: 'What pattern do the filings make?',
      options: [
        { val: 'curves', name: 'Curved lines running from one pole round to the other' },
        { val: 'ring', name: 'A ring round the middle of the magnet' },
        { val: 'even', name: 'An even layer, spread everywhere' },
      ],
      correct: 'curves',
      explain: 'The filings form **curved lines from one pole to the other**, packed closest near the poles. Each filing becomes a tiny magnet and is pulled into line. The next slide names what they show.',
    },
  },

  // ── 16 · The magnetic field ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: FIELD,
    icon: 'Magnet',
    eyebrow: 'Spread 9.2 · field lines',
    title: 'The Magnetic Field',
    ratio: 50,
    inlineSvg: DIAGRAMS.FIELD_LINES_BAR,
    drawThis: true,
    content:
      'The filings line up because there is a **magnetic field** around the magnet.\n\n' +
      'Field lines run from the **N pole to the S pole**. The field is **strongest where the lines are closest** — at the poles.',
    notes: [
      {
        tone: 'write',
        text: '**Magnetic field:** the region around a magnet where a magnetic material feels a force.',
      },
    ],
    check: {
      id: 'c10',
      q: 'In a field diagram, where is the magnetic field strongest?',
      options: [
        { val: 'A', text: 'Where the lines are furthest apart' },
        { val: 'B', text: 'Halfway along the side of the magnet' },
        { val: 'C', text: 'Where the lines are closest together — near the poles' },
      ],
      correct: 'C',
      expEn: 'The closer the field lines, the stronger the field. They crowd together at the poles, where the filings cling most thickly. Far apart means weak, and beside the middle the lines are spread out.',
    },
  },

  // ── 17 · Plotting a field line ──────────────────────────────────────────
  {
    layout: 'steps',
    accent: FIELD,
    icon: 'Compass',
    eyebrow: 'Spread 9.2 · the plotting compass',
    title: 'Plotting a Field Line',
    dense: true,
    inlineSvg: DIAGRAMS.PLOTTING_COMPASS,
    steps: [
      { text: 'Its needle is a tiny magnet. Near one pole, mark a **dot** at each end of the needle.' },
      { text: 'Move the compass until the **back** of the needle is on the **front** dot. Mark the new front.' },
      { text: 'Repeat to the other pole. Join the dots: a **field line**.' },
      { text: 'Start somewhere else for the next line.' },
    ],
    check: {
      id: 'c11',
      q: 'A plotting compass sits on a field line. What does the way its N end points tell you?',
      options: [
        { val: 'A', text: 'The direction of the magnetic field at that point' },
        { val: 'B', text: 'Where the magnet\'s N pole is' },
        { val: 'C', text: 'Where the field is weakest' },
      ],
      correct: 'A',
      expEn: 'The needle is a tiny magnet, turned by the field until it lines up with it. Its N end points along the field at that spot. It does not point at the N pole — near the N pole it points away from it — and it says nothing about how strong the field is.',
    },
  },

  // ── 18 · Field direction ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: FIELD,
    icon: 'Compass',
    eyebrow: 'Spread 9.2 · field direction',
    title: 'Which Way Does the Arrow Point?',
    ratio: 45,
    inlineSvg: DIAGRAMS.COMPASS_DIRECTION,
    content:
      'Every field line gets an **arrow**: the way the N end of a compass needle points there.',
    notes: [
      {
        tone: 'write',
        text: '**Field direction:** the direction of the force on an N pole. Outside a magnet, field lines run from N to S.',
      },
    ],
    check: {
      id: 'c12',
      q: 'A compass is put beside the magnet, level with its middle (the "?" in the drawing). Which way does its N end point?',
      options: [
        { val: 'A', text: 'Towards the N pole end' },
        { val: 'B', text: 'Towards the S pole end, along the field line' },
        { val: 'C', text: 'Straight at the middle of the magnet' },
      ],
      correct: 'B',
      expEn: 'Beside the middle, the field line runs parallel to the magnet from the N end round to the S end. The compass\'s N end is pushed away from the N pole and pulled towards the S pole, so it points towards the S end.',
    },
  },

  // ── 19 · Predict: like poles facing ────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Two North Poles, Facing',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'Two bar magnets lie in a line, **N pole facing N pole**, a few centimetres apart.',
    activity: {
      id: 'a6',
      type: 'predict',
      prompt: 'What happens to the magnetic field between them?',
      options: [
        { val: 'cancel', name: 'At one point between them, the two fields cancel' },
        { val: 'double', name: 'The field there is twice as strong' },
        { val: 'same', name: 'The field is unchanged' },
      ],
      correct: 'cancel',
      explain: 'Halfway between them the two fields act in **opposite directions** with equal strength, so they **cancel**. That point is called a neutral point. The next slide shows it.',
    },
  },

  // ── 20 · Fields combine; the neutral point ─────────────────────────────
  {
    layout: 'split',
    accent: FIELD,
    icon: 'GitMerge',
    eyebrow: 'Spread 9.2 · neutral points',
    title: 'When Two Fields Combine',
    ratio: 42,
    inlineSvg: DIAGRAMS.TWO_MAGNETS,
    drawThis: true,
    content:
      '**Unlike poles facing:** an almost **uniform** field.\n\n' +
      '**Like poles facing:** the lines turn away, and the fields cancel at X.',
    notes: [
      {
        tone: 'write',
        text: '**Neutral point:** a point where two magnetic fields cancel, so the magnetic force there is zero.',
      },
    ],
    activity: {
      id: 'a7',
      type: 'hotspot',
      prompt: 'The labels are gone. Tap the neutral point.',
      svg: DIAGRAMS.TWO_MAGNETS,
      viewBox: '0 0 600 300',
      targets: [
        { id: 'x', x: 455, y: 150, r: 22, name: 'the neutral point' },
        { id: 'uniform', x: 145, y: 150, r: 26, name: 'between unlike poles — a strong, almost uniform field' },
        { id: 'end', x: 340, y: 150, r: 20, name: 'the end of a magnet — a pole, where the field is strong' },
        { id: 'pole', x: 395, y: 100, r: 20, name: 'just above an N pole — the field is strong here' },
        { id: 'above', x: 455, y: 64, r: 20, name: 'above the gap — the lines run straight up here' },
      ],
      correct: 'x',
      explain: 'The neutral point is **midway between the two N poles**, where the field from each magnet is equal and opposite. Each field pushes away from its N pole, so there they cancel. A small piece of iron placed there feels no magnetic force.',
    },
  },

  // ── 21 · Magnetic screening ─────────────────────────────────────────────
  {
    layout: 'callout',
    accent: IRON,
    icon: 'ShieldCheck',
    eyebrow: 'Spread 9.2 · shielding equipment',
    title: 'Magnetic Screening',
    content:
      'Some electronic equipment is easily upset by magnetic fields from nearby motors, generators and transformers — or from the Earth.\n\n' +
      'It can be **screened** (shielded) by enclosing it in a layer of a **soft** magnetic material, such as iron or nickel. The field lines pass through the layer instead of through the equipment.',
    check: {
      id: 'c13',
      q: 'Which would be the best box to screen a sensitive instrument from magnetic fields?',
      options: [
        { val: 'A', text: 'A box of aluminium' },
        { val: 'B', text: 'A box of hard steel' },
        { val: 'C', text: 'A box of soft iron' },
      ],
      correct: 'C',
      expEn: 'A screen must be a soft magnetic material, which the field lines pass through easily and which does not stay magnetised. Aluminium is non-magnetic, so the field goes straight through it. Hard steel would become a magnet itself.',
    },
  },

  // ── 22 · The Earth's magnetic field ────────────────────────────────────
  {
    layout: 'split',
    accent: SPOLE,
    icon: 'Earth',
    eyebrow: 'Spread 9.2 · a magnet the size of a planet',
    title: 'The Earth\'s Magnetic Field',
    ratio: 50,
    inlineSvg: DIAGRAMS.EARTH_FIELD,
    drawThis: true,
    content:
      'The Earth acts like a huge but very **weak bar magnet**, probably because of currents in its core.\n\n' +
      'A compass\'s N end points north, and an N pole is attracted to an **S** pole. So the Earth\'s **magnetic S pole is in the north**.',
    notes: [
      {
        tone: 'write',
        text: '**Magnetic north:** the place in Canada above the Earth\'s magnetic S pole.',
      },
    ],
    check: {
      id: 'c14',
      q: 'Why does the N end of a compass needle point north?',
      options: [
        { val: 'A', text: 'There is a magnetic N pole near the North Pole' },
        { val: 'B', text: 'The Earth\'s magnetic S pole is near the geographic North Pole, and unlike poles attract' },
        { val: 'C', text: 'The Earth spins from west to east' },
      ],
      correct: 'B',
      expEn: 'The needle\'s N end is attracted towards the north, and an N pole is only attracted to an S pole. So the pole of the Earth\'s field in the north must be a magnetic S pole. A magnetic N pole there would repel the needle\'s N end.',
    },
  },

  // ── 23 · Magnetic north is not the North Pole ──────────────────────────
  {
    layout: 'split',
    accent: SPOLE,
    icon: 'Globe',
    eyebrow: 'Spread 9.2 · the magnetic axis',
    title: 'Magnetic North Is Not the North Pole',
    ratio: 55,
    side: 'left',
    inlineSvg: DIAGRAMS.EARTH_FIELD,
    content:
      'Magnetic north is over **1200 km** from the geographic North Pole, because the Earth\'s magnetic axis is tilted away from its axis of rotation.\n\n' +
      'Near the poles the field lines are almost **vertical**. A compass needle can only turn **horizontally**, so there it is of no use.',
    check: {
      id: 'c15',
      q: 'Why is a compass of no use close to the North Pole?',
      options: [
        { val: 'A', text: 'The field lines there are nearly vertical, and the needle can only turn horizontally' },
        { val: 'B', text: 'There is no magnetic field at the poles' },
        { val: 'C', text: 'It is too cold there for the needle to turn' },
      ],
      correct: 'A',
      expEn: 'The field near the poles is very strong, but it points almost straight down into the ground. A compass needle swings only in a flat, horizontal circle, so there is almost no sideways pull to turn it. The cold has nothing to do with it.',
    },
  },

  // ── 24 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: INDIGO,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> In your notebook: **10 notes** and **5 drawings**.',
    items: [
      { text: 'Define the **N pole**.' },
      { text: 'State the **force law**.' },
      { text: 'Predict an **induced pole**.' },
      { text: 'Name three **magnetic** and three **non-magnetic** metals.' },
      { text: 'Plot a **field line** and arrow it.' },
      { text: 'Explain the **Earth\'s field**.' },
    ],
    check: {
      id: 'c16',
      q: 'A metal bar is held near one pole of a magnet, and the bar is REPELLED. What can you be sure of?',
      options: [
        { val: 'A', text: 'The bar is made of iron' },
        { val: 'B', text: 'The bar is non-magnetic' },
        { val: 'C', text: 'The bar must itself be a magnet — only a magnet can be repelled' },
      ],
      correct: 'C',
      expEn: 'Unmagnetised iron or steel is always ATTRACTED, because the induced pole is the opposite pole. Repulsion needs like poles facing, so the bar must already be a magnet. A non-magnetic bar feels no force at all.',
    },
  },
];
