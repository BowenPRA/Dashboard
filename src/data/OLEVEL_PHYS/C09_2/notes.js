// src/data/OLEVEL_PHYS/C09_2/notes.js
// C09_2 Currents, Coils and Electromagnets — book spreads 9.3 "Magnetic effect
// of a current" and 9.4 "Electromagnets" (pages 202–205). English-only (this
// track is not bilingual), so there are no `vn*` twins.
//
// A rules-and-devices deck. The spine follows the two spreads: a one-slide
// recap of C09_1 → a current moves a compass, PREDICTED before it is shown →
// the field round a wire → conventional current → the right-hand grip rule
// for a wire → one turn, then a solenoid → what makes a coil's field stronger,
// weaker or reversed → the grip rule for a coil's poles, then USED on a fresh
// drawing (the hotspot) → making and demagnetising a magnet with a coil (d.c.
// and a.c.) → iron in the coil, PREDICTED first → the electromagnet, compared
// with a permanent magnet, and its strength factors → the relay, PREDICTED
// first, then ordered step by step → normally open and normally closed → the
// circuit breaker, then ordered as it trips → magnetic recording → a
// countable recap.
//
// Every direction on these slides is worked out from a rule (see the header
// of diagrams.js). The hotspot on slide 11 uses SOLENOID_POLES_Q: + on the
// right, current DOWN the front of the turns, so the N pole is the
// RIGHT-HAND end.
//
// Sized for a 1280×720 laptop: a split slide's text column is narrow beside
// its diagram and the check panel, so each slide carries about two short
// paragraphs and one copy-down note at most.
//
// The scored block (`check:` or `activity:`) is ALWAYS the LAST key on its
// slide — the audio generator narrates every field before it and stops
// there. Slide titles are read aloud, so they carry no symbols or
// abbreviations ("d.c." and "a.c." live in the content). Narrated text avoids
// arrows and circled symbols, which a voice reads badly.
import { DIAGRAMS } from './diagrams.js';

const FIELD_BLUE = '#2563eb';
const CURRENT_AMBER = '#b45309';
const PURPLE = '#5c2483';
const SLATE = '#475569';
const TEAL = '#0087a8';

export const notes = [
  // ── 1 · Opener ──────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: FIELD_BLUE,
    icon: 'Magnet',
    brand: 'O Level Physics',
    eyebrow: 'Chapter 9 · Spreads 9.3 and 9.4',
    title: 'How a Current Makes a Magnet',
    card: {
      icon: 'Lightbulb',
      badge: 'Starter — think, then answer',
      text: 'A scrapyard crane lifts a whole car with a magnet, swings it over the pile — and lets go. A permanent magnet cannot let go. In one sentence — what must be different about this magnet?',
    },
  },

  // ── 2 · One-slide recap of C09_1 ───────────────────────────────────────
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Magnet',
    eyebrow: 'Recap from the last unit',
    title: 'Poles, Field Lines and Soft Iron',
    content:
      '> • Like poles **repel**; unlike poles **attract**.\n' +
      '> • Field lines run from **N to S** outside a magnet. They show the force on an N pole.\n' +
      '> • **Soft iron** loses its magnetism easily. **Steel** keeps it.\n\n' +
      'Today a magnetic field comes from somewhere new: an **electric current**.',
    check: {
      id: 'c1',
      q: 'Which material loses its magnetism as soon as the magnetising field is removed?',
      options: [
        { val: 'A', text: 'Steel' },
        { val: 'B', text: 'Alcomax' },
        { val: 'C', text: 'Soft iron' },
      ],
      correct: 'C',
      expEn: 'Soft iron is a soft magnetic material: it is magnetised easily and loses its magnetism at once. Steel and Alcomax are hard magnetic materials. They keep their magnetism, so they are used for permanent magnets.',
    },
  },

  // ── 3 · Predict: a current and a compass ───────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Can a Wire Move a Compass?',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A plotting compass sits beside a straight copper wire. The switch is closed, and a current flows through the wire.',
    activity: {
      id: 'a1',
      type: 'predict',
      prompt: 'What does the compass needle do?',
      options: [
        { val: 'turns', name: 'It turns to point a new way' },
        { val: 'nothing', name: 'Nothing — a copper wire is not a magnet' },
        { val: 'along', name: 'It turns to point along the wire' },
      ],
      correct: 'turns',
      explain: 'The needle **turns**. The current makes a **magnetic field** around the wire, and the needle lines up with that field. The field goes round the wire, not along it — the next slide shows its shape.',
    },
  },

  // ── 4 · The field round a straight wire ────────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'Target',
    eyebrow: 'Spread 9.3 · magnetic effect of a current',
    title: 'The Field Around a Wire',
    inlineSvg: DIAGRAMS.WIRE_FIELD,
    drawThis: true,
    content:
      'Look **along** the wire: it is just a dot. A dot in a circle means the current comes **out of the page**, towards you. The field lines are **circles**.',
    notes: [
      {
        tone: 'write',
        text: '**Field round a wire:** circles centred on the wire — strongest close to it, and stronger with a bigger current.',
      },
    ],
    check: {
      id: 'c2',
      q: 'Which describes the magnetic field around a long straight wire carrying a current?',
      options: [
        { val: 'A', text: 'Circles centred on the wire, closer together near the wire' },
        { val: 'B', text: 'Straight lines pointing away from the wire' },
        { val: 'C', text: 'The same pattern as a bar magnet, with N and S at the two ends' },
      ],
      correct: 'A',
      expEn: 'The field lines are circles centred on the wire. They are closest together near the wire, where the field is strongest. They do not point away from the wire, and a straight wire has no poles at its ends.',
    },
  },

  // ── 5 · Conventional current ───────────────────────────────────────────
  {
    layout: 'split',
    accent: CURRENT_AMBER,
    icon: 'Zap',
    eyebrow: 'Current essentials',
    title: 'Which Way Does a Current Flow?',
    content:
      'In a wire, the current is a flow of **electrons**: tiny negative particles that come from atoms. Being negative, they flow from − to +.\n\n' +
      'But the current arrows on circuit diagrams run from **+ to −**. This is the **conventional current** direction. Every rule in this chapter uses it.',
    notes: [
      {
        tone: 'write',
        text: '**Conventional current:** the direction from + to − round a circuit. Electrons flow the other way.',
      },
    ],
    check: {
      id: 'c3',
      q: 'A battery has its + terminal on the left. Which way do the current arrows on the circuit diagram point?',
      options: [
        { val: 'A', text: 'From the − terminal, round the circuit to the +' },
        { val: 'B', text: 'From the + terminal on the left, round the circuit to the −' },
        { val: 'C', text: 'Both ways at once, because the current goes round and back' },
      ],
      correct: 'B',
      expEn: 'Circuit arrows show the conventional current, which leaves the + terminal and flows round to the −. The electrons really flow the other way, from − to +, but the rules always use the conventional direction.',
    },
  },

  // ── 6 · The right-hand grip rule for a wire ────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'Hand',
    eyebrow: 'Spread 9.3 · a rule for field direction',
    title: 'The Right-Hand Grip Rule',
    inlineSvg: DIAGRAMS.GRIP_RULE_WIRE,
    content:
      'Imagine gripping the wire with your **right** hand, so that your **thumb** points along the conventional current.\n\n' +
      'Your **fingers** then curl the same way as the **field lines**.',
    notes: [
      {
        tone: 'write',
        text: '**Right-hand grip rule (wire):** thumb along the current, fingers curl the way the field goes.',
      },
    ],
    check: {
      id: 'c4',
      q: 'The current in the wire is reversed. What happens to the magnetic field?',
      options: [
        { val: 'A', text: 'It disappears, because the two directions cancel' },
        { val: 'B', text: 'It becomes stronger' },
        { val: 'C', text: 'It points the opposite way round the circles' },
      ],
      correct: 'C',
      expEn: 'Turn your right thumb the other way, and your fingers curl the other way. The field lines are the same circles, but their direction is reversed. The strength depends on the size of the current, which has not changed.',
    },
  },

  // ── 7 · One turn of wire ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'RotateCcw',
    eyebrow: 'Spread 9.3 · fields from coils',
    title: 'One Turn of Wire',
    inlineSvg: DIAGRAMS.COIL_FIELD,
    content:
      'Bend the wire into a loop and look at it **edge-on**. The wire crosses the page twice: current comes out at the top and goes in at the bottom.\n\n' +
      'Inside the loop, the circles round **both** parts point the same way. Their fields **add up**, so the field there is stronger.',
    check: {
      id: 'c5',
      q: 'Why is the field inside a loop of wire stronger than beside a straight wire carrying the same current?',
      options: [
        { val: 'A', text: 'The wire in a loop is shorter' },
        { val: 'B', text: 'The fields from all parts of the wire point the same way inside the loop, so they add together' },
        { val: 'C', text: 'The current is bigger when the wire is bent into a loop' },
      ],
      correct: 'B',
      expEn: 'Inside the loop, the circles round the top and the bottom of the wire both point the same way, so their fields add up. The current is the same all round the circuit: bending the wire does not change it.',
    },
  },

  // ── 8 · The solenoid ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'Magnet',
    eyebrow: 'Spread 9.3 · a long coil',
    title: 'The Solenoid',
    inlineSvg: DIAGRAMS.SOLENOID_FIELD,
    drawThis: true,
    content:
      'A long coil of many turns is a **solenoid**. Its field has the shape of a **bar magnet\'s**: out of one end, round, and back in at the other. Inside, the lines run straight.',
    notes: [
      {
        tone: 'write',
        text: '**Solenoid:** a long coil of wire. Its field is shaped like a bar magnet\'s, with a pole at each end.',
      },
    ],
    check: {
      id: 'c6',
      q: 'Where are the magnetic poles of a solenoid?',
      options: [
        { val: 'A', text: 'At its two ends' },
        { val: 'B', text: 'Along its top and bottom sides' },
        { val: 'C', text: 'It has no poles — only circles round each wire' },
      ],
      correct: 'A',
      expEn: 'A solenoid\'s field has the shape of a bar magnet\'s, and like a bar magnet it has a pole at each end. The field lines leave one end, loop round the outside, and go back in at the other.',
    },
  },

  // ── 9 · Stronger, weaker, reversed ─────────────────────────────────────
  {
    layout: 'steps',
    accent: FIELD_BLUE,
    icon: 'Gauge',
    eyebrow: 'Spread 9.3 · the field of a coil',
    title: 'Changing the Field of a Coil',
    dense: true,
    content: 'Three things change the field of a coil — and a fourth is coming up soon.',
    steps: [
      { text: 'More **current**: a stronger field.' },
      { text: 'More **turns** on the coil: a stronger field.' },
      { text: '**Reverse** the current: the field reverses, so the N and S poles swap ends.' },
      { text: 'A soft **iron core** inside the coil: a much stronger field.' },
    ],
    activity: {
      id: 'a2',
      type: 'sort',
      prompt: 'What does each change do to the field of a coil?',
      bins: [
        { id: 'stronger', name: 'Stronger' },
        { id: 'weaker', name: 'Weaker' },
        { id: 'reversed', name: 'Reversed' },
      ],
      cards: [
        { id: 'double', name: 'double the current', bin: 'stronger' },
        { id: 'swap', name: 'swap the battery round', bin: 'reversed' },
        { id: 'halve', name: 'halve the current', bin: 'weaker' },
        { id: 'more', name: 'add more turns', bin: 'stronger' },
        { id: 'other', name: 'join the + to the other end of the coil', bin: 'reversed' },
        { id: 'fewer', name: 'take off half the turns', bin: 'weaker' },
      ],
      explain: 'More current or more turns make the field stronger; less of either makes it weaker. Turning the battery round, or joining the + to the other end of the coil, reverses the current — so the field reverses and the poles swap. Its strength stays the same.',
    },
  },

  // ── 10 · The grip rule for a coil ──────────────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'Hand',
    eyebrow: 'Spread 9.3 · a rule for poles',
    title: 'The Grip Rule for a Coil',
    inlineSvg: DIAGRAMS.GRIP_RULE_COIL,
    content:
      'A second **right-hand grip rule** finds the poles. Curl your right **fingers** the way the conventional current flows round the turns: your **thumb** points to the **N pole**.',
    notes: [
      {
        tone: 'write',
        text: '**Right-hand grip rule (coil):** fingers round the turns with the current, thumb points to the N pole.',
      },
    ],
    check: {
      id: 'c7',
      q: 'The battery connected to a solenoid is turned round. What happens?',
      options: [
        { val: 'A', text: 'The N and S poles swap ends' },
        { val: 'B', text: 'The field gets weaker' },
        { val: 'C', text: 'Nothing changes — it is the same coil' },
      ],
      correct: 'A',
      expEn: 'Turning the battery round reverses the current round the turns. Your right fingers now curl the other way, so your thumb — and the N pole — points to the other end. The size of the current, and so the strength, is unchanged.',
    },
  },

  // ── 11 · Use the rule: which end is N? ─────────────────────────────────
  {
    layout: 'split',
    accent: FIELD_BLUE,
    icon: 'Crosshair',
    eyebrow: 'Use the rule',
    title: 'Find the North Pole',
    ratio: 55,
    inlineSvg: DIAGRAMS.SOLENOID_POLES_Q,
    content:
      'The battery is now the other way round. Work it out — do not remember it.\n\n' +
      '> • Follow the current arrows on the **front** of the turns.\n' +
      '> • Curl your right fingers the **same way**. Your thumb points to N.',
    activity: {
      id: 'a3',
      type: 'hotspot',
      prompt: 'Tap the end of the solenoid that is its N pole.',
      svg: DIAGRAMS.SOLENOID_POLES_Q,
      viewBox: '0 0 520 300',
      targets: [
        { id: 'right', x: 412, y: 120, r: 36, name: 'the right-hand end' },
        { id: 'left', x: 108, y: 120, r: 36, name: 'the left-hand end' },
        { id: 'middle', x: 260, y: 120, r: 36, name: 'the middle of the coil' },
        { id: 'battery', x: 260, y: 250, r: 30, name: 'the battery' },
      ],
      correct: 'right',
      explain: 'The + is on the right, so the current flows **down** the front of every turn. Fingers down the front and up the back: your thumb points **right**. The right-hand end is N; the left-hand end is S.',
    },
  },

  // ── 12 · Making a magnet with a coil ───────────────────────────────────
  {
    layout: 'split',
    accent: CURRENT_AMBER,
    icon: 'Magnet',
    eyebrow: 'Spread 9.3 · making a magnet',
    title: 'Making a Magnet',
    inlineSvg: DIAGRAMS.MAKE_MAGNET_SOLENOID,
    content:
      'Put a **steel** bar inside a solenoid and pass a large **direct current (d.c.)** — a current that flows one way only. The steel becomes magnetised, and the field is much stronger than before.\n\n' +
      'Switch off: the steel **stays magnetised**. Nearly all permanent magnets are made this way.',
    check: {
      id: 'c8',
      q: 'Why is a steel bar, not an iron one, used to make a permanent magnet in a solenoid?',
      options: [
        { val: 'A', text: 'Steel is a better conductor of electricity' },
        { val: 'B', text: 'Iron cannot be magnetised at all' },
        { val: 'C', text: 'Steel keeps its magnetism when the current stops; iron would lose it' },
      ],
      correct: 'C',
      expEn: 'Steel is a hard magnetic material: once magnetised, it stays magnetised. Iron is magnetised easily too, but it is soft — it loses its magnetism as soon as the current is switched off. Conducting electricity has nothing to do with it.',
    },
  },

  // ── 13 · Demagnetising with a coil ─────────────────────────────────────
  {
    layout: 'split',
    accent: CURRENT_AMBER,
    icon: 'Repeat',
    eyebrow: 'Spread 9.3 · demagnetising a magnet',
    title: 'Demagnetising With a Coil',
    content:
      '**Alternating current (a.c.)** flows backwards, forwards, backwards, forwards… many times a second. So the field of the solenoid keeps **reversing**.\n\n' +
      'Pull a magnet **slowly** out of the coil. The changing field throws its atoms out of line, and the magnet is **demagnetised**.',
    notes: [
      {
        tone: 'write',
        text: '**d.c.** flows one way only. **a.c.** reverses its direction many times a second.',
      },
    ],
    check: {
      id: 'c9',
      q: 'Why must the current in the coil be a.c. to demagnetise a magnet?',
      options: [
        { val: 'A', text: 'Alternating current is always stronger than direct current' },
        { val: 'B', text: 'Its field keeps reversing, which throws the atomic magnets out of line' },
        { val: 'C', text: 'Alternating current heats the magnet until it loses its magnetism' },
      ],
      correct: 'B',
      expEn: 'An a.c. field flips direction many times a second, so the atomic magnets are pushed one way, then the other, and end up pointing in all directions. A d.c. field pulls them all the same way — that magnetises. Heating can demagnetise, but that is not what the coil does.',
    },
  },

  // ── 14 · Predict: iron inside the coil ─────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'Iron Inside the Coil',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A bar of soft iron is slid into the middle of a coil that is carrying a current.',
    activity: {
      id: 'a4',
      type: 'predict',
      prompt: 'What happens to the magnetic field?',
      options: [
        { val: 'stronger', name: 'It becomes about a thousand times stronger' },
        { val: 'same', name: 'It stays about the same' },
        { val: 'weaker', name: 'It becomes weaker, because the iron blocks it' },
      ],
      correct: 'stronger',
      explain: 'It becomes about **a thousand times stronger**. The coil magnetises the iron, and the field of the iron adds to the field of the coil. Switch off, and soft iron loses its magnetism at once. The next slide shows the device this makes.',
    },
  },

  // ── 15 · The electromagnet ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Magnet',
    eyebrow: 'Spread 9.4 · electromagnets',
    title: 'The Electromagnet',
    inlineSvg: DIAGRAMS.ELECTROMAGNET,
    drawThis: true,
    content:
      'A **coil** of several hundred turns of **insulated** copper wire is wound round a **core** of iron or Mumetal. The current magnetises the core, but only while it flows: the magnetism is **temporary**.',
    notes: [
      {
        tone: 'write',
        text: '**Electromagnet:** a coil with a soft iron core — a magnet that can be switched on and off.',
      },
    ],
    check: {
      id: 'c10',
      q: 'Why would a steel core be a mistake in an electromagnet?',
      options: [
        { val: 'A', text: 'It would stay magnetised when the current is switched off' },
        { val: 'B', text: 'It would melt when the current flows' },
        { val: 'C', text: 'Steel is a non-magnetic material' },
      ],
      correct: 'A',
      expEn: 'Steel is a hard magnetic material, so it would become permanently magnetised — the electromagnet could not be switched off. Steel is magnetic, and it does not melt: the current flows in the coil, not the core.',
    },
  },

  // ── 16 · Permanent magnet or electromagnet ─────────────────────────────
  {
    layout: 'compare',
    accent: SLATE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Side by side',
    title: 'Permanent Magnet or Electromagnet?',
    columns: [
      {
        heading: 'Permanent magnet',
        accent: TEAL,
        icon: 'Magnet',
        content: 'Always **on**.\nIts strength is **fixed**.\nIts poles are **fixed**.',
      },
      {
        heading: 'Electromagnet',
        accent: SLATE,
        icon: 'Power',
        content: 'Switched **on and off**.\nStronger with more **current** or more **turns**.\nReverse the current, and the poles **swap**.',
      },
    ],
    check: {
      id: 'c11',
      q: 'Steel cans must be lifted off a moving belt and then dropped into a bin. Which magnet can do this, and why?',
      options: [
        { val: 'A', text: 'A permanent magnet, because it is always strong' },
        { val: 'B', text: 'Either one, because both can be switched off' },
        { val: 'C', text: 'An electromagnet, because it can be switched off to drop the cans' },
      ],
      correct: 'C',
      expEn: 'Only an electromagnet can be switched off. A permanent magnet is always on, so it would keep hold of the cans — it cannot let them drop.',
    },
  },

  // ── 17 · Strength factors ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Gauge',
    eyebrow: 'Spread 9.4 · the strength of the field',
    title: 'Making It Stronger',
    content:
      'The field of an electromagnet is made **stronger** by:\n\n' +
      '> • a bigger **current**\n' +
      '> • more **turns** on the coil.\n\n' +
      '**Reversing** the current does not change the strength. It reverses the direction of the field, so the poles swap.',
    check: {
      id: 'c12',
      q: 'A student cannot change the power supply, but wants a stronger electromagnet. What should they do?',
      options: [
        { val: 'A', text: 'Replace the iron core with a steel one' },
        { val: 'B', text: 'Wind more turns of wire on the coil' },
        { val: 'C', text: 'Use thicker insulation on the wire' },
      ],
      correct: 'B',
      expEn: 'With the current fixed, the other way to strengthen the field is more turns. A steel core would stay magnetised when switched off, and the insulation only stops the turns touching — it does not change the field.',
    },
  },

  // ── 18 · Predict: a small key, a big motor ─────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'No answer yet — just predict',
    title: 'A Small Key and a Big Motor',
    label: 'Predict',
    labelIcon: 'MessageSquare',
    text: 'A car\'s starter motor needs a very large current — far too big for the thin wires behind the dashboard. Yet a small key switch starts it.',
    activity: {
      id: 'a5',
      type: 'predict',
      prompt: 'How can the small switch control such a big current?',
      options: [
        { val: 'brief', name: 'The key switch carries the big current, but only for a moment' },
        { val: 'relay', name: 'The key switch works an electromagnet, which closes a second, heavy-duty switch' },
        { val: 'itself', name: 'The motor starts itself; the key only unlocks it' },
      ],
      correct: 'relay',
      explain: 'The key switch sends only a **small** current, through an electromagnet. The electromagnet pulls a second, heavy-duty switch closed, and **that** switch carries the big current to the motor. This device is a **relay** — next slide.',
    },
  },

  // ── 19 · The magnetic relay ────────────────────────────────────────────
  // A showcase, not a split: the relay circuit is wide and has nine labels,
  // and beside the order activity a split's media column shrank them to about
  // 8px at 1280×720. The copy-down note for "relay" is on slide 20.
  {
    layout: 'showcase',
    accent: SLATE,
    icon: 'Power',
    eyebrow: 'Spread 9.4 · the magnetic relay',
    title: 'The Magnetic Relay',
    inlineSvg: DIAGRAMS.RELAY,
    caption: 'A **relay** is a switch worked by an electromagnet. Switch S, in the **input circuit**, controls the motor in the **output circuit**.',
    activity: {
      id: 'a6',
      type: 'order',
      prompt: 'Switch S is closed. Put the events in order.',
      steps: [
        { id: 'small', name: 'A small current flows in the coil' },
        { id: 'core', name: 'The iron core becomes magnetised' },
        { id: 'pull', name: 'The iron armature is pulled to the core' },
        { id: 'push', name: 'The armature pushes contacts C together' },
        { id: 'large', name: 'A large current flows to the motor' },
        { id: 'runs', name: 'The motor runs' },
      ],
      explain: 'Closing S lets a small current through the coil. The core becomes magnetised and pulls the iron armature towards it. The armature turns on its pivot and pushes contacts C together. That completes the output circuit: a large current flows, and the motor runs.',
    },
  },

  // ── 20 · Normally open, normally closed ────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Split',
    eyebrow: 'Spread 9.4 · two ways to wire a relay',
    title: 'Normally Open or Normally Closed',
    content:
      'The relay on the last slide is **normally open**: input switch OFF, output OFF.\n\n' +
      'A **normally closed** relay works the other way round: input OFF, output ON — and input ON, output OFF. Most relays can be connected either way.\n\n' +
      'Why use a relay at all? The small switch and its thin wires carry only the **small** input current. Only the thick wires of the output circuit carry the big one.',
    notes: [
      {
        tone: 'write',
        text: '**Relay:** a switch operated by an electromagnet. A small current in one circuit switches on a large current in another.',
      },
    ],
    check: {
      id: 'c13',
      q: 'A normally closed relay is used. Its input switch is turned ON. What happens to the output circuit?',
      options: [
        { val: 'A', text: 'It is switched OFF' },
        { val: 'B', text: 'It is switched ON' },
        { val: 'C', text: 'Both the input and the output circuits switch off' },
      ],
      correct: 'A',
      expEn: 'A normally closed relay works the opposite way to a normally open one: with the input OFF the output is ON, and turning the input ON switches the output OFF. The input circuit itself is on — its current is what works the relay.',
    },
  },

  // ── 21 · The circuit breaker ───────────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'ShieldCheck',
    eyebrow: 'Spread 9.4 · the circuit breaker',
    title: 'The Circuit Breaker',
    ratio: 40,
    inlineSvg: DIAGRAMS.CIRCUIT_BREAKER,
    content:
      'The current flows through its **contacts** and an **electromagnet**. Too much current, and it **trips** — the same job as a fuse, but it can be **reset**.',
    notes: [
      {
        tone: 'write',
        text: '**Circuit breaker:** an automatic switch that trips if the current is too high, and can be reset.',
      },
    ],
    check: {
      id: 'c14',
      q: 'What advantage does a circuit breaker have over a fuse?',
      options: [
        { val: 'A', text: 'It lets a bigger current through' },
        { val: 'B', text: 'It can be reset instead of replaced' },
        { val: 'C', text: 'It works without any electricity' },
      ],
      correct: 'B',
      expEn: 'A fuse melts when the current is too high, so it has to be replaced. A circuit breaker opens its contacts instead, and pressing the reset button closes them again. It does not let a bigger current through — it protects the circuit in the same way.',
    },
  },

  // ── 22 · How it trips ──────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: SLATE,
    icon: 'ListChecks',
    eyebrow: 'Inside the circuit breaker',
    title: 'How a Circuit Breaker Trips',
    dense: true,
    content: 'Each part on the last drawing has one job.',
    steps: [
      { text: 'The **contacts** carry the current while they are closed.' },
      { text: 'The **spring** is always trying to pull the contacts apart.' },
      { text: 'The **iron catch** holds the contacts closed, against the spring.' },
      { text: 'The **electromagnet** pulls on the catch — harder when the current is bigger.' },
    ],
    activity: {
      id: 'a7',
      type: 'order',
      prompt: 'The current is too high. Order the events.',
      steps: [
        { id: 'rises', name: 'The current in the coil rises' },
        { id: 'strong', name: 'The electromagnet pulls hard enough' },
        { id: 'catch', name: 'The iron catch is released' },
        { id: 'apart', name: 'The spring pulls the contacts apart' },
        { id: 'stops', name: 'The current stops' },
        { id: 'reset', name: 'The reset button closes the contacts again' },
      ],
      explain: 'The big current flows through the electromagnet, so its pull grows until it is strong enough to release the iron catch. Nothing holds the contacts now: the spring pulls them apart and the current stops. Once the fault is put right, pressing the reset button closes the contacts again.',
    },
  },

  // ── 23 · Magnetic recording ────────────────────────────────────────────
  {
    layout: 'split',
    accent: SLATE,
    icon: 'Save',
    eyebrow: 'Spread 9.4 · magnetic storage',
    title: 'Magnetic Recording',
    inlineSvg: DIAGRAMS.RECORDING_HEAD,
    content:
      'Recording tape and hard discs are coated with **iron oxide**. Magnetically, it is between soft and hard: it **keeps** a pattern, but is easy to demagnetise for the next recording.\n\n' +
      'The **recording head** is a tiny electromagnet. The sound varies its current, so it leaves a track of **varying magnetism**.',
    check: {
      id: 'c15',
      q: 'Why is iron oxide a good coating for recording tape?',
      options: [
        { val: 'A', text: 'It is a soft magnetic material, so it loses the pattern at once' },
        { val: 'B', text: 'It is non-magnetic, so it does not change the sound' },
        { val: 'C', text: 'It keeps its magnetism, but can still be demagnetised for the next recording' },
      ],
      correct: 'C',
      expEn: 'Iron oxide is between soft and hard. It keeps the pattern of magnetism, so the recording lasts — but it is easy enough to demagnetise that the tape can be recorded again. A soft material would lose the pattern, and a non-magnetic one could not hold it at all.',
    },
  },

  // ── 24 · Countable recap ───────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 3,
    eyebrow: 'Before we finish',
    title: 'Can You Do All Six?',
    content: '> In your notebook: **9 notes** (two of them grip rules) and **3 drawings**.',
    items: [
      { text: 'Draw the **field** round a wire.' },
      { text: 'Use the **grip rule** for a wire.' },
      { text: 'Use the **grip rule** for a coil.' },
      { text: 'Say what a **core** is for.' },
      { text: 'Explain a **relay**.' },
      { text: 'Explain a **circuit breaker**.' },
    ],
    check: {
      id: 'c16',
      q: 'A solenoid\'s N pole is at its left end. The current is reversed AND the number of turns is doubled. What is true now?',
      options: [
        { val: 'A', text: 'N stays at the left end, and the field is stronger' },
        { val: 'B', text: 'N is at the right end, and the field is stronger' },
        { val: 'C', text: 'N is at the right end, and the field is weaker' },
      ],
      correct: 'B',
      expEn: 'Two changes, two effects. Reversing the current reverses the field, so the poles swap: N moves to the right end. Doubling the turns makes the field stronger. Reversing does not weaken it.',
    },
  },
];
