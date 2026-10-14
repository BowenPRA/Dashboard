// src/data/OLEVEL_PHYS/C09_3/notes.js
// C09_3 Motors and Electromagnetic Induction — book spreads 9.5 "Magnetic force
// on a current", 9.6 "Electric motors" and 9.7 "Electromagnetic induction"
// (pages 206–211). English-only (this track is not bilingual), so there are no
// `vn*` twins.
//
// The deck's spine follows the three spreads (docs/olevel-phys/plans/C09_3.md):
// a one-slide recap of C09_2 → the wire in the U-magnet, PREDICTED before it
// is shown → why there is a force (the catapult field) → what makes it bigger,
// reversed or zero → Fleming's left-hand rule, then used on a flat drawing →
// when the rule works → the loudspeaker, PREDICTED first → the turning effect
// on a coil → the moving-coil meter → what a coil does at the vertical,
// PREDICTED → the simple d.c. motor and the commutator's job → changing a
// motor → practical motors → a moving wire and a meter with no battery,
// PREDICTED → electromagnetic induction → Faraday's law and its factors → a
// magnet and a coil → the two effects side by side → a countable recap.
//
// Every slide after the opener is scored: 15 checks (c1–c15) and 8 activities
// (a1–a8: four predicts, three sorts and the induction chain ordered on slide
// 20), numbered in slide order. Every force in a slide or a check is worked
// out with Fleming's left-hand rule (F = I × B) in the comment on its diagram.
//
// Sized for a 1280×720 laptop: a split slide's text column is narrow beside its
// diagram, so each carries about two short paragraphs and one copy-down note.
// Beside the check panel a slide is only ~820px wide, so wide drawings get
// ratio 50–58 and the text is kept short. The commutator slide is a showcase,
// not the plan's steps layout: steps gives its picture a fixed 20rem box
// beside the list, far too small for three panels side by side, so the steps
// are written into the drawing's panel captions instead. Slide 21's five
// factor steps are merged into three cards so they clear its sort panel.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its slide
// — the audio generator narrates every field before it and stops there. Slide
// titles are read aloud, so they carry no bare symbols or abbreviations
// ("e.m.f.", "d.c." live in eyebrows and content).
import { DIAGRAMS } from './diagrams.js';

const INDIGO = '#4338ca';    // the motor effect
const PURPLE = '#5c2483';    // predictions
const CYAN = '#0e7490';      // electromagnetic induction
const SLATE = '#475569';     // recap, warnings, summary
const MOTION = '#059669';    // the motor-effect column: force and motion
const GEN_BLUE = '#1d4ed8';  // the generator-effect column

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'RotateCcw',
    brand: 'O Level Physics',
    eyebrow: 'Chapter 9 · Spreads 9.5, 9.6 and 9.7',
    title: 'Motors and Electromagnetic Induction',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'A drill, a washing machine, an electric car and the tiny buzz in your phone all use the same trick. In one line: what do you think a **magnet** and a **current** can do to each other?',
    },
  },

  // ── 2 · One-slide recap of C09_2 ────────────────────────────────────────
  {
    layout: 'callout',
    accent: SLATE,
    icon: 'Zap',
    eyebrow: 'Recap from spreads 9.3 and 9.4',
    title: 'Currents Make Magnetic Fields',
    content:
      '> • **Conventional current** flows from **+ to −** round a circuit.\n' +
      '> • Field lines run from **N to S** outside a magnet.\n' +
      '> • A coil carrying a current is a magnet, with **poles at its ends**.\n' +
      '> • **Reverse the current** and its field reverses too.\n\n' +
      'Today two fields meet — and something **moves**.',
    check: {
      id: 'c1',
      q: 'Outside a magnet, which way do the field lines run?',
      options: [
        { val: 'A', text: 'In circles round the magnet' },
        { val: 'B', text: 'From the N pole to the S pole' },
        { val: 'C', text: 'From the S pole to the N pole' },
      ],
      correct: 'B',
      expEn: 'Outside a magnet the lines leave the N pole and go into the S pole, because their direction is the way a free N pole would be pushed — away from N, towards S. Circles are the field round a straight wire, not round a magnet.',
    },
  },

  // ── 3 · Predict: the wire in the U-magnet ──────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'A Wire Between the Poles',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A copper wire hangs loosely between the poles of a U-shaped magnet. First there is no current. Then the switch is closed.',
    activity: {
      id: 'a1',
      type: 'predict',
      prompt: 'What happens to the wire?',
      options: [
        { val: 'never', name: 'No force either time — copper is non-magnetic' },
        { val: 'across', name: 'No force until the current flows; then the wire is pushed sideways, across the field' },
        { val: 'pole', name: 'Once the current flows, the wire is pulled to the N pole' },
      ],
      correct: 'across',
      explain: 'On its own, copper feels nothing from the magnet. But a current makes its own magnetic field, and the two fields together push the wire **across** the gap — not towards either pole. The next slide shows which way.',
    },
  },

  // ── 4 · The force on a current ─────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Magnet',
    eyebrow: 'Spread 9.5 · the motor effect',
    title: 'The Force on a Current',
    ratio: 50,
    inlineSvg: DIAGRAMS.WIRE_IN_FIELD,
    drawThis: true,
    content:
      'With a current, the wire is pushed **up**. Reverse the current **or** turn the magnet round, and it is pushed **down**.\n\n' +
      'It moves **across** the field — never towards a pole.',
    notes: [
      {
        tone: 'write',
        text: 'A **current-carrying conductor** in a magnetic field feels a **force** at right angles to the field and the current.',
      },
    ],
    check: {
      id: 'c2',
      q: 'The battery is turned round, so the current flows the other way. What happens now?',
      options: [
        { val: 'A', text: 'The wire is pushed down instead of up' },
        { val: 'B', text: 'The wire is pulled towards the N pole' },
        { val: 'C', text: 'Nothing changes — the magnet has not changed' },
      ],
      correct: 'A',
      expEn: 'Reversing the current reverses the force, so the wire is pushed down. The force is always across the field, never towards a pole. And it depends on the current as well as the magnet — change either one and the force changes.',
    },
  },

  // ── 5 · Why there is a force: the catapult field ────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Waves',
    eyebrow: 'Spread 9.5 · field and force',
    title: 'Why There Is a Force',
    ratio: 40,
    inlineSvg: DIAGRAMS.CATAPULT_FIELD,
    content:
      'The wire\'s circular field adds to the magnet\'s straight field. **Below** the wire the two point the same way and the lines **crowd together**. **Above** it they point opposite ways and **cancel**.\n\n' +
      'Field lines act like stretched elastic trying to straighten, so the wire is catapulted **away from the crowded side**.',
    check: {
      id: 'c3',
      q: 'In a combined field like this, which way is the force on the wire?',
      options: [
        { val: 'A', text: 'Towards the N pole' },
        { val: 'B', text: 'Along the wire' },
        { val: 'C', text: 'Away from the side where the field lines are crowded' },
      ],
      correct: 'C',
      expEn: 'Where the two fields add, the lines are crowded; where they cancel, the lines are thin. The wire is pushed from the crowded side towards the thin side — here, upwards. It is not pulled to a pole, and the force is never along the wire: it is at right angles to the current.',
    },
  },

  // ── 6 · Bigger, reversed, none ─────────────────────────────────────────
  {
    layout: 'steps',
    accent: INDIGO,
    icon: 'ListChecks',
    eyebrow: 'Spread 9.5 · what the force depends on',
    title: 'Bigger Force, Reversed Force, No Force',
    dense: true,
    steps: [
      { text: 'More **current** → a bigger force.' },
      { text: 'A **stronger magnet** → a bigger force.' },
      { text: 'A **longer length** of wire in the field → a bigger force.' },
      { text: 'Reverse the current **or** the field → the force **reverses**.' },
      { text: 'Wire **parallel** to the field lines, or no current → **no force**.' },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'What does each change do to the force on the wire?',
      bins: [
        { id: 'bigger', name: 'Bigger force' },
        { id: 'reversed', name: 'Force reversed' },
        { id: 'none', name: 'No force' },
      ],
      cards: [
        { id: 'current', name: 'increase the current', bin: 'bigger' },
        { id: 'magnet', name: 'use a stronger magnet', bin: 'bigger' },
        { id: 'length', name: 'put a longer length of wire in the field', bin: 'bigger' },
        { id: 'battery', name: 'swap the battery round', bin: 'reversed' },
        { id: 'poles', name: 'swap the magnet\'s poles', bin: 'reversed' },
        { id: 'along', name: 'turn the wire so it lies along the field lines', bin: 'none' },
        { id: 'off', name: 'switch the current off', bin: 'none' },
      ],
      explain: 'The current, the strength of the field and the length of wire in the field all make the force bigger. Swapping the battery OR the poles reverses it. With no current, or with the wire lying along the field lines, there is no force at all.',
    },
  },

  // ── 7 · Fleming's left-hand rule ───────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Hand',
    eyebrow: 'Spread 9.5 · the direction of the force',
    title: 'Fleming\'s Left-Hand Rule',
    ratio: 50,
    inlineSvg: DIAGRAMS.FLEMING_LHR,
    drawThis: true,
    content:
      'Hold the thumb and first two fingers of your **left** hand at right angles to each other, like the corner of a box.',
    notes: [
      {
        tone: 'write',
        text: '**Fleming\'s left-hand rule:** **F**irst finger = **F**ield (N → S), se**C**ond finger = **C**urrent (+ → −), thu**M**b = **M**otion (the force).',
      },
    ],
    check: {
      id: 'c4',
      q: 'In Fleming\'s left-hand rule, which finger points along the current?',
      options: [
        { val: 'A', text: 'The first finger' },
        { val: 'B', text: 'The second finger' },
        { val: 'C', text: 'The thumb' },
      ],
      correct: 'B',
      expEn: 'SeCond finger = Current. The First finger is the Field, and the thuMb gives the Motion — the direction of the force.',
    },
  },

  // ── 8 · Using the rule on a flat drawing ───────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Crosshair',
    eyebrow: 'Spread 9.5 · × means into the page',
    title: 'Using the Rule',
    ratio: 45,
    inlineSvg: DIAGRAMS.LHR_EXAMPLE,
    content:
      'Each **×** is the tail of a field arrow going **into the page**. The current flows **up the page**.\n\n' +
      'First finger into the page, second finger up… your thumb points **left**. The force is to the **left**.',
    check: {
      id: 'c5',
      q: 'The same field, into the page. The current now flows DOWN the page. Which way is the force?',
      options: [
        { val: 'A', text: 'To the right' },
        { val: 'B', text: 'To the left' },
        { val: 'C', text: 'There is no force' },
      ],
      correct: 'A',
      expEn: 'Reversing the current reverses the force. First finger into the page, second finger down, and the thumb points right. There is still a force, because the current and the field are still at right angles.',
    },
  },

  // ── 9 · When the rule works ────────────────────────────────────────────
  {
    layout: 'callout',
    accent: SLATE,
    icon: 'AlertTriangle',
    eyebrow: 'Spread 9.5 · when the rule works',
    title: 'Only at Right Angles',
    content:
      'Fleming\'s rule works when the current and the field are **at right angles**.\n\n' +
      '> • At other angles the force is **smaller**, and its direction is harder to predict.\n' +
      '> • Current **along** the field → **no force**.\n' +
      '> • A beam of electrons **is a current** — so it feels the force too.',
    check: {
      id: 'c6',
      q: 'A wire carrying a large current lies along the field lines, parallel to the field. What force does it feel?',
      options: [
        { val: 'A', text: 'A large force, because the current is large' },
        { val: 'B', text: 'A force along the wire' },
        { val: 'C', text: 'No force at all' },
      ],
      correct: 'C',
      expEn: 'When the current and the field are parallel there is no force, however large the current. The force only appears when the wire crosses the field lines, and it is biggest at right angles.',
    },
  },

  // ── 10 · Predict: the loudspeaker coil ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'What Does a Loudspeaker Coil Do?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A loudspeaker\'s coil sits in a magnet\'s field. The amplifier sends it **alternating current**: current that flows one way, then the other, many times a second.',
    activity: {
      id: 'a3',
      type: 'predict',
      prompt: 'What does the coil do?',
      options: [
        { val: 'inout', name: 'Moves in and out, in time with the current' },
        { val: 'spin', name: 'Spins round and round' },
        { val: 'glow', name: 'Heats up and glows' },
      ],
      correct: 'inout',
      explain: 'It **moves in and out**. Each time the current reverses, the force on the coil reverses, so the coil — and the cone fixed to it — vibrate backwards and forwards. The next slide shows how it is built.',
    },
  },

  // ── 11 · The moving-coil loudspeaker ───────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Waves',
    eyebrow: 'Spread 9.5 · the moving-coil loudspeaker',
    title: 'The Moving-Coil Loudspeaker',
    ratio: 42,
    inlineSvg: DIAGRAMS.LOUDSPEAKER,
    content:
      'A cylindrical magnet gives a strong **radial** ("spoke-like") field, at right angles to every part of the coil. The coil is fixed to a stiff paper **cone**.\n\n' +
      'The amplifier sends **alternating current**, so the force on the coil goes backwards, forwards, backwards… The cone **vibrates** and pushes the air: **sound waves**.',
    check: {
      id: 'c7',
      q: 'Why must the current in a loudspeaker coil alternate?',
      options: [
        { val: 'A', text: 'So the force keeps reversing and the cone vibrates' },
        { val: 'B', text: 'To stop the coil getting too hot' },
        { val: 'C', text: 'To make the magnet stronger' },
      ],
      correct: 'A',
      expEn: 'A one-way current would push the cone out once and hold it there — no sound. An alternating current reverses the force again and again, so the cone vibrates and makes sound waves. The current does not change the magnet.',
    },
  },

  // ── 12 · Turning effect on a coil ──────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'RotateCcw',
    eyebrow: 'Spread 9.5 · end view, looking along the axle',
    title: 'Turning Effect on a Coil',
    ratio: 50,
    inlineSvg: DIAGRAMS.COIL_TURNING,
    drawThis: true,
    content:
      'End-on, the current comes **towards you** (⊙) along one side and goes **away** (⊗) along the other.\n\n' +
      'One side is pushed **up**, the other **down**: a **turning effect**. More turns make it bigger.',
    notes: [
      {
        tone: 'write',
        text: 'The two sides carry current in **opposite** directions, so their forces are opposite and the coil **turns**.',
      },
    ],
    check: {
      id: 'c8',
      q: 'Why does the coil turn, rather than move bodily up or down?',
      options: [
        { val: 'A', text: 'Only one side of the coil is in the field' },
        { val: 'B', text: 'Its two sides carry current in opposite directions, so the forces on them are opposite' },
        { val: 'C', text: 'The coil is heavier on one side' },
      ],
      correct: 'B',
      expEn: 'Both sides are in the same field, but the current goes one way along one side and back the other way along the other. So one force is up and the other is down, and together they turn the coil about its axle.',
    },
  },

  // ── 13 · The moving-coil meter ─────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Gauge',
    eyebrow: 'Spread 9.5 · the moving-coil meter',
    title: 'The Moving-Coil Meter',
    content:
      'Many meters use the turning effect. The pointer is fixed to a coil that sits in a magnet\'s field, held by **springs**.\n\n' +
      '> More current → a bigger turning effect → the coil turns further against the springs → the pointer moves further along the scale.',
    check: {
      id: 'c9',
      q: 'The current through a moving-coil meter is doubled. What does the pointer do?',
      options: [
        { val: 'A', text: 'It swings back to zero' },
        { val: 'B', text: 'It moves the other way' },
        { val: 'C', text: 'It moves further round the scale' },
      ],
      correct: 'C',
      expEn: 'A bigger current gives a bigger turning effect, so the coil turns further against the springs before they stop it, and the pointer moves further along the scale. Only reversing the current would move it the other way.',
    },
  },

  // ── 14 · Predict: what happens at the vertical? ────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'What Happens at the Vertical?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A coil in a magnetic field turns until it is **vertical**. Suppose the current kept flowing the **same** way through it.',
    activity: {
      id: 'a4',
      type: 'predict',
      prompt: 'What would the coil do next?',
      options: [
        { val: 'stop', name: 'Stop at the vertical: rock to and fro, then come to rest' },
        { val: 'spin', name: 'Keep spinning round' },
        { val: 'back', name: 'Turn back the other way and keep going' },
      ],
      correct: 'stop',
      explain: 'It would **stop**. Just past the vertical, the same forces turn it **back**, so it rocks to rest in the vertical position. A motor needs something that reverses the current at just that moment. The next slide shows the part that does it.',
    },
  },

  // ── 15 · The simple d.c. motor ─────────────────────────────────────────
  // A showcase: the labelled oblique sketch needs the whole width.
  {
    layout: 'showcase',
    accent: INDIGO,
    icon: 'RotateCcw',
    eyebrow: 'Spread 9.6 · a motor that runs on direct current (d.c.)',
    title: 'The Simple Direct-Current Motor',
    inlineSvg: DIAGRAMS.DC_MOTOR,
    drawThis: true,
    caption: 'A coil of insulated copper wire turns between the poles. The **commutator** (split ring) turns with it; two carbon **brushes** rub on it. **Brushes connect; the commutator reverses.**',
    check: {
      id: 'c10',
      q: 'What is the job of the brushes?',
      options: [
        { val: 'A', text: 'To keep the turning coil connected to the battery' },
        { val: 'B', text: 'To reverse the current every half turn' },
        { val: 'C', text: 'To provide the magnetic field' },
      ],
      correct: 'A',
      expEn: 'The brushes are two carbon contacts that rub on the commutator, so the battery stays connected while the coil spins. Reversing the current is the commutator\'s job, and the field comes from the magnet.',
    },
  },

  // ── 16 · The commutator's job ──────────────────────────────────────────
  // The plan's steps layout, set as a showcase: the three end-view panels
  // need the whole width at 1280×720 (see the header note). Steps 1–3 are
  // each panel's two-line caption in the drawing; step 4 is the caption here.
  {
    layout: 'showcase',
    accent: INDIGO,
    icon: 'Repeat',
    eyebrow: 'Spread 9.6 · the action of the commutator',
    title: 'The Commutator\'s Job',
    inlineSvg: DIAGRAMS.COMMUTATOR_ACTION,
    caption: 'Just past the vertical, the gaps pass the brushes and the current **reverses** — so the forces push the coil on round the **same way**, half a turn at a time.',
    check: {
      id: 'c11',
      q: 'Why must the current in the coil reverse every half turn?',
      options: [
        { val: 'A', text: 'To stop the coil overheating' },
        { val: 'B', text: 'So the forces keep pushing the coil round the same way, instead of turning it back' },
        { val: 'C', text: 'So the battery lasts longer' },
      ],
      correct: 'B',
      expEn: 'Past the vertical, the old forces would turn the coil back. Reversing the current reverses the forces at just that moment, so they keep pushing the coil round the same way. It has nothing to do with heat or the battery.',
    },
  },

  // ── 17 · Faster, stronger, backwards ───────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'RotateCcw',
    eyebrow: 'Spread 9.6 · changing the motor',
    title: 'Faster, Stronger, Backwards',
    content:
      'The turning effect gets **bigger** with more **current**, a **stronger magnet**, more **turns** on the coil, or a bigger coil **area** (longer sides in the field; a wider coil gives more leverage).\n\n' +
      'Reverse the battery **or** the magnet\'s poles → the motor turns **the other way**. Reverse **both** → no change.',
    activity: {
      id: 'a5',
      type: 'sort',
      prompt: 'What does each change do to the motor?',
      bins: [
        { id: 'bigger', name: 'Bigger turning effect' },
        { id: 'other', name: 'Turns the other way' },
        { id: 'same', name: 'No change' },
      ],
      cards: [
        { id: 'turns', name: 'more turns on the coil', bin: 'bigger' },
        { id: 'magnet', name: 'a stronger magnet', bin: 'bigger' },
        { id: 'current', name: 'a larger current', bin: 'bigger' },
        { id: 'wider', name: 'a wider coil', bin: 'bigger' },
        { id: 'battery', name: 'swap the battery\'s terminals', bin: 'other' },
        { id: 'poles', name: 'swap the magnet\'s poles', bin: 'other' },
        { id: 'both', name: 'swap the battery AND the poles', bin: 'same' },
      ],
      explain: 'More turns, a stronger magnet, a larger current and a wider coil all increase the turning effect. Swapping the battery OR the poles reverses the forces, so the motor turns the other way. Swapping BOTH reverses the forces twice — so the motor turns the same way as before.',
    },
  },

  // ── 18 · Practical motors ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: INDIGO,
    icon: 'Power',
    eyebrow: 'Spread 9.6 · stronger and smoother than the simple motor',
    title: 'Practical Motors',
    ratio: 50,
    inlineSvg: DIAGRAMS.PRACTICAL_MOTOR,
    content:
      '• **Several coils** at different angles, each with its own commutator segments: smoother, stronger turning.\n' +
      '• An iron **armature** inside the coils is magnetised and makes the field stronger.\n' +
      '• **Curved pole pieces** make the field **radial**, so the turning effect stays near its maximum.\n' +
      '• An **electromagnet** for the field lets a motor run on a.c.: the field reverses with the current.',
    check: {
      id: 'c12',
      q: 'Why do practical motors have curved pole pieces?',
      options: [
        { val: 'A', text: 'To make the motor lighter' },
        { val: 'B', text: 'To stop the coil touching the magnet' },
        { val: 'C', text: 'To make the field radial, so the turning effect stays high for most of the turn' },
      ],
      correct: 'C',
      expEn: 'Curved pole pieces make the field radial — "spoke-like" — so the sides of the coils cross it at right angles for most of each turn, and the turning effect stays near its maximum. Weight and touching have nothing to do with it.',
    },
  },

  // ── 19 · Predict: a moving wire and a meter, no battery ────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'A Wire, a Magnet, No Battery',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A wire is joined to a centre-zero galvanometer — a meter for tiny currents. There is **no battery**. The wire is pulled down through the field between two magnets.',
    activity: {
      id: 'a6',
      type: 'predict',
      prompt: 'What does the galvanometer needle do?',
      options: [
        { val: 'flick', name: 'Flicks to one side while the wire is moving' },
        { val: 'nothing', name: 'Nothing — there is no battery' },
        { val: 'stays', name: 'Moves over and stays there' },
      ],
      correct: 'flick',
      explain: 'The needle **flicks to one side** while the wire moves, then goes back to zero when it stops. Moving the wire across the field makes a voltage in it — the wire itself becomes the source. The next slide names the effect.',
    },
  },

  // ── 20 · Electromagnetic induction ─────────────────────────────────────
  {
    layout: 'split',
    accent: CYAN,
    icon: 'Activity',
    eyebrow: 'Spread 9.7 · induced e.m.f. in a moving wire',
    title: 'Electromagnetic Induction',
    ratio: 50,
    inlineSvg: DIAGRAMS.INDUCED_WIRE,
    drawThis: true,
    content:
      'Move a wire **across** a magnetic field and a small voltage, an **e.m.f.**, is **induced** in it: **electromagnetic induction**. In a circuit it drives a current, shown by a centre-zero **galvanometer**.',
    notes: [
      {
        tone: 'write',
        text: '**e.m.f. (electromotive force):** the voltage a source provides, in volts. A wire moving through a magnetic field is a source.',
      },
    ],
    activity: {
      id: 'a7',
      type: 'order',
      prompt: 'The wire is pulled down through the field. Put the events in order.',
      steps: [
        { id: 'move', name: 'The wire moves across the field' },
        { id: 'cut', name: 'Field lines are cut' },
        { id: 'emf', name: 'An e.m.f. is induced in the wire' },
        { id: 'current', name: 'The complete circuit lets a current flow' },
        { id: 'needle', name: 'The galvanometer needle flicks to one side' },
      ],
      explain: 'Motion comes first: as the wire moves it cuts field lines, and that induces an e.m.f. in it. An e.m.f. is a voltage, not yet a current — a current flows only because the wire is part of a complete circuit, and the galvanometer shows that current. Stop the wire and the chain breaks at its first link: nothing is cut, so nothing is induced.',
    },
  },

  // ── 21 · Faraday's law and the factors ─────────────────────────────────
  {
    layout: 'steps',
    accent: CYAN,
    icon: 'Gauge',
    eyebrow: 'Spread 9.7 · the size of the induced e.m.f.',
    title: 'Faraday\'s Law',
    dense: true,
    content: '> **Faraday\'s law:** the e.m.f. induced in a conductor is **proportional to the rate at which magnetic field lines are cut**.',
    steps: [
      { text: 'Move **faster**, use a **stronger magnet** (lines closer together), or loop **more wire** through the field → a **bigger** e.m.f.' },
      { text: 'Reverse the motion **or** the field → the e.m.f. **reverses**.' },
      { text: 'Wire **still**, or moving **parallel** to the lines → nothing is cut → **zero**.' },
    ],
    activity: {
      id: 'a8',
      type: 'sort',
      prompt: 'What does each change do to the induced e.m.f.?',
      bins: [
        { id: 'bigger', name: 'Bigger e.m.f.' },
        { id: 'reversed', name: 'E.m.f. reversed' },
        { id: 'zero', name: 'Zero e.m.f.' },
      ],
      cards: [
        { id: 'faster', name: 'move the wire faster', bin: 'bigger' },
        { id: 'stronger', name: 'use a stronger magnet', bin: 'bigger' },
        { id: 'loop', name: 'loop the wire through the field three times', bin: 'bigger' },
        { id: 'up', name: 'move the wire up instead of down', bin: 'reversed' },
        { id: 'turn', name: 'turn the magnet round', bin: 'reversed' },
        { id: 'still', name: 'hold the wire still', bin: 'zero' },
        { id: 'along', name: 'move the wire along the field lines', bin: 'zero' },
      ],
      explain: 'Faster motion, a stronger magnet and more wire all cut more field lines each second, so the e.m.f. is bigger. Moving the other way, or turning the magnet round, reverses it. A wire held still, or moving along the lines, cuts none — zero.',
    },
  },

  // ── 22 · A magnet and a coil ───────────────────────────────────────────
  {
    layout: 'split',
    accent: CYAN,
    icon: 'Magnet',
    eyebrow: 'Spread 9.7 · induced e.m.f. in a coil',
    title: 'A Magnet and a Coil',
    ratio: 50,
    inlineSvg: DIAGRAMS.INDUCED_COIL,
    content:
      'Push a magnet into a coil. Now the **field** moves instead of the wire, but lines are still cut — so an e.m.f. is induced.\n' +
      '• Pull it **out**, or push the **S pole** in: the needle flicks the **other** way.\n' +
      '• Hold it **still**: **no** e.m.f.\n' +
      '• Faster, a stronger magnet, more turns: **bigger**.',
    check: {
      id: 'c13',
      q: 'A magnet is pushed into a coil, then held still inside it. What does the needle do?',
      options: [
        { val: 'A', text: 'It flicks, then returns to zero' },
        { val: 'B', text: 'It flicks and stays deflected' },
        { val: 'C', text: 'It flicks the other way while the magnet is still' },
      ],
      correct: 'A',
      expEn: 'An e.m.f. is induced only while field lines are being cut. While the magnet moves, the needle flicks; once it is still, no lines are cut, so the e.m.f. and the current fall to zero. The other way is for pulling the magnet out.',
    },
  },

  // ── 23 · The two effects side by side ──────────────────────────────────
  {
    layout: 'compare',
    accent: SLATE,
    icon: 'ArrowLeftRight',
    eyebrow: 'The big picture',
    title: 'Two Effects, Side by Side',
    columns: [
      {
        heading: 'Motor effect',
        accent: MOTION,
        icon: 'RotateCcw',
        content:
          '**current + field → force**\n\n' +
          'The loudspeaker, the moving-coil meter and the electric motor.\n\n' +
          'The direction: Fleming\'s **left**-hand rule.',
      },
      {
        heading: 'Generator effect',
        accent: GEN_BLUE,
        icon: 'Zap',
        content:
          '**motion + field → induced e.m.f.**\n\n' +
          'Guitar pick-ups, the playback heads in hard drives, and generators (next unit).\n\n' +
          'The size: **Faraday\'s law**.',
      },
    ],
    check: {
      id: 'c14',
      q: 'Faraday\'s law says that the induced e.m.f. is proportional to…',
      options: [
        { val: 'A', text: 'the strength of the magnet only' },
        { val: 'B', text: 'the resistance of the wire' },
        { val: 'C', text: 'the rate at which field lines are cut' },
      ],
      correct: 'C',
      expEn: 'The induced e.m.f. is proportional to the RATE at which field lines are cut. A stronger magnet is one way to cut more lines each second — but the speed and the length of wire matter too. Resistance changes the current, not the e.m.f.',
    },
  },

  // ── 24 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: SLATE,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> In your notebook: **4 notes** — the force, the left-hand rule, the turning coil and e.m.f.',
    items: [
      { text: 'Use Fleming\'s **left** hand.' },
      { text: 'Give the three **force** factors.' },
      { text: 'Explain the **commutator** and **brushes**.' },
      { text: '**Reverse** a motor.' },
      { text: 'State **Faraday\'s law**.' },
      { text: 'Say when the induced e.m.f. is **zero**.' },
    ],
    check: {
      id: 'c15',
      q: 'A student moves a magnet into a coil twice as fast as before. What happens to the induced e.m.f.?',
      options: [
        { val: 'A', text: 'It is the same — it is the same magnet and coil' },
        { val: 'B', text: 'It is larger' },
        { val: 'C', text: 'There is none — the magnet must be still for an e.m.f.' },
      ],
      correct: 'B',
      expEn: 'Moving the magnet faster cuts field lines at a greater rate, and by Faraday\'s law the induced e.m.f. is proportional to that rate — so it is larger. A still magnet induces nothing at all.',
    },
  },
];
