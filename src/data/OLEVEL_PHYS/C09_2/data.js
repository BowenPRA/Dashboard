// src/data/OLEVEL_PHYS/C09_2/data.js
// Chapter 9, unit 2: Currents, Coils and Electromagnets — book spreads 9.3
// "Magnetic effect of a current" and 9.4 "Electromagnets" (pages 202–205).
// English only: this track is not bilingual, so there are no `vn*` twins.
//
// A rules-and-devices unit in the light shape the track uses (no workbook, no
// production engine — docs/olevel-phys-course.md §3):
//   Gate 0 (Learn)   — Notes (24 slides, 23 scored: 16 checks + 7 activities)
//                      + Vocab
//   Gate 1 (Apply)   — Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf), so a student can drop ten
// marks and still finish. Gate 1 sits at 20 of the 30 XP before it (67%) and
// Gate 2 at 60 of 80 (75%), both inside the 80% rule the validator enforces.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
//
// Every item is a fresh situation: the book's own examples (the compass by
// the wire, the solenoid, the relay with its motor, the tape recorder) are
// taught in the deck, and no end-of-spread question is reproduced.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const C09_2_DATA = {
  meta: {
    id: 'C09_2',
    title: 'Currents, Coils and Electromagnets',
    desc: 'Draw the field round a wire and a solenoid, use the two right-hand grip rules to find a field direction and a coil\'s N pole, and explain how electromagnets work in relays, circuit breakers and magnetic recording.',
    track: 'OLEVEL_PHYS',
    icon: 'Zap',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 20,
      tasks: [
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 25 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 25 },
      ],
    },
    {
      // The Quiz and the arcade share one gate: both open at 60 XP. GAMES stays
      // 0 XP (a reward the unit unlocks, not a task paid for by it).
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 60,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 30 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words — every bold term in the two spreads, plus the words an O Level
  // question is written in, in the order the deck meets them. English-only
  // (word + def + sentence); Recognition uses word + def. No apostrophes in
  // these strings: the audio generator reads them with a simple pattern.
  realWords: [
    {
      word: 'Conventional current', isReal: true,
      def: 'The direction a current is shown flowing on a circuit diagram: from the + terminal round to the − terminal. Electrons flow the other way.',
      sent: 'The arrows on the circuit show the conventional current, from + to −.',
    },
    {
      word: 'Right-hand grip rule', isReal: true,
      def: 'A rule for field direction. Grip a wire with your right hand, thumb along the current: your fingers curl the way the field goes. For a coil, the fingers follow the current and the thumb points to the N pole.',
      sent: 'She used the right-hand grip rule to find which end of the coil was the N pole.',
    },
    {
      word: 'Coil', isReal: true,
      def: 'Wire wound round and round in loops, called turns. A current in a coil makes a stronger field than the same current in a straight wire.',
      sent: 'The coil had two hundred turns of wire.',
    },
    {
      word: 'Solenoid', isReal: true,
      def: 'A long coil of wire with many turns. Its magnetic field has the same shape as the field of a bar magnet, with a pole at each end.',
      sent: 'The steel bar was magnetised inside a solenoid.',
    },
    {
      word: 'Direct current', isReal: true,
      def: 'A current that flows in one direction only, written d.c. A battery gives a direct current.',
      sent: 'A large direct current through the coil magnetised the steel bar.',
    },
    {
      word: 'Alternating current', isReal: true,
      def: 'A current that keeps reversing its direction, backwards and forwards, many times a second. It is written a.c.',
      sent: 'Pulling a magnet slowly out of a coil carrying alternating current demagnetises it.',
    },
    {
      word: 'Electromagnet', isReal: true,
      def: 'A coil of wire round a soft iron core. It is a magnet only while a current flows, so it can be switched on and off.',
      sent: 'The scrapyard crane drops the car when its electromagnet is switched off.',
    },
    {
      word: 'Core', isReal: true,
      def: 'The bar of iron or Mumetal inside the coil of an electromagnet. The coil magnetises it, and it makes the field far stronger.',
      sent: 'The core of an electromagnet must be soft iron, not steel.',
    },
    {
      word: 'Insulated wire', isReal: true,
      def: 'Wire covered with a layer that does not conduct, such as plastic or varnish, so that the turns of a coil cannot touch each other electrically.',
      sent: 'The coil is wound from insulated copper wire.',
    },
    {
      word: 'Relay', isReal: true,
      def: 'A switch worked by an electromagnet. A small current in one circuit switches on a large current in another.',
      sent: 'A relay lets the small key switch start the car.',
    },
    {
      word: 'Armature', isReal: true,
      def: 'The piece of iron in a relay that is pulled by the electromagnet. As it moves, it opens or closes the contacts.',
      sent: 'When the coil was switched on, the armature clicked down onto the core.',
    },
    {
      word: 'Contacts', isReal: true,
      def: 'The two metal parts of a switch that touch to complete a circuit, and move apart to break it.',
      sent: 'The armature pushes the contacts together, and the motor starts.',
    },
    {
      word: 'Circuit breaker', isReal: true,
      def: 'An automatic switch that cuts off the current if it rises above a set value. Unlike a fuse, it can be reset.',
      sent: 'The circuit breaker cut off the current when the heater developed a fault.',
    },
    {
      word: 'Trip', isReal: true,
      def: 'To switch off suddenly and automatically. A circuit breaker trips when the current is too high.',
      sent: 'The breaker tripped as soon as the faulty drill was plugged in.',
    },
    {
      word: 'Reset button', isReal: true,
      def: 'The button on a circuit breaker that closes its contacts again after it has tripped.',
      sent: 'After the fault was fixed, he pressed the reset button and the lights came back on.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions
  // but with fresh situations: a factory cable, a door lock, a fire-door
  // holder, a greenhouse heater, a kitchen circuit. Prompts are plain text —
  // ShortAnswers.jsx does not render $…$.
  shortQA: [
    {
      id: 'sq1',
      question: 'A long, straight cable carries a direct current to a machine in a factory. Describe the shape of the magnetic field around the cable, and state how the strength of the field depends on the distance from the cable and on the current.',
      suggestedWords: [['pattern'], ['distance'], ['increase']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the field lines are circles centred on the cable (in planes at right angles to it).',
        '1 mark: the field is weaker further from the cable / strongest close to it (the circles are further apart further out).',
        '1 mark: the field is stronger when the current is increased.',
      ],
      modelAnswer: 'The magnetic field lines are circles centred on the cable, in planes at right angles to it. The field is strongest close to the cable and gets weaker further away, so the circles are drawn further apart as you move out. If the current is increased, the field becomes stronger at every point.',
    },
    {
      id: 'sq2',
      question: 'A solenoid in an electric door lock is connected to a battery. State the rule you would use to find which end of the solenoid is its N pole, and explain what happens to its poles if the battery is connected the other way round.',
      suggestedWords: [['right hand'], ['conventional'], ['reverse']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: grip the coil with the right hand, with the fingers pointing the way the conventional current flows round the turns.',
        '1 mark: the thumb then points to the N pole.',
        '1 mark: reversing the battery reverses the current, so the field reverses and the N and S poles swap ends.',
      ],
      modelAnswer: 'I would use the right-hand grip rule for a coil. Grip the coil with your right hand so that your fingers point the way the conventional current flows round the turns, from + to −. Your thumb then points to the N pole. If the battery is connected the other way round, the current flows round the turns the other way, so the field is reversed: the N and S poles swap ends.',
    },
    {
      id: 'sq3',
      question: 'An electromagnet that holds a fire door open is made by winding a coil of insulated wire around a bar of iron. When the fire alarm sounds, the current is switched off and the door must close. Explain what the iron bar is for, why iron is used rather than steel, and give one other way to make the electromagnet stronger.',
      suggestedWords: [['core'], ['temporary'], ['turns']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the iron is the core: it is magnetised by the field of the coil and makes the field much stronger (about a thousand times).',
        '1 mark: iron is a soft magnetic material — it loses its magnetism as soon as the current stops (so the door is released), whereas steel would stay magnetised.',
        '1 mark: increase the current, or increase the number of turns on the coil.',
      ],
      modelAnswer: 'The iron bar is the core. The current in the coil magnetises it, and the magnetised core makes the field about a thousand times stronger than the coil alone. Iron is used because it is a soft magnetic material: its magnetism is only temporary, so it is lost as soon as the current is switched off and the door is let go. A steel core would stay magnetised and keep holding the door. The electromagnet could also be made stronger by increasing the current, or by winding more turns on the coil.',
    },
    {
      id: 'sq4',
      question: 'The heater of a greenhouse takes a large current, but the gardener switches it on with a small switch with thin wires, by the door. Explain, using the word relay, how this works.',
      suggestedWords: [['input', 'output'], ['armature'], ['contacts']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the small switch closes the input circuit, so a small current flows through the electromagnet (coil) of the relay.',
        '1 mark: the magnetised core attracts the iron armature, which closes the contacts.',
        '1 mark: the contacts complete the separate output circuit, whose thick wires carry the large current of the heater — the small switch never carries it.',
      ],
      modelAnswer: 'The small switch is in the input circuit of a relay. When the gardener closes it, a small current flows through the coil of the relay, which is an electromagnet. The core becomes magnetised and attracts the iron armature, which moves and closes the contacts. The contacts complete a separate output circuit with thick wires, and these carry the large current to the heater. The small switch and its thin wires only ever carry the small current.',
    },
    {
      id: 'sq5',
      question: 'A circuit breaker protects the wiring of a kitchen. Explain how it switches the current off when a fault makes the current too large, and state one advantage it has over a fuse.',
      suggestedWords: [['electromagnet'], ['catch'], ['reset']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the current flows through the electromagnet of the breaker, so a larger current makes a stronger pull.',
        '1 mark: when the pull is strong enough it releases the iron catch, and the contacts spring open, stopping the current.',
        '1 mark: it can be reset (with the button) after it has tripped — a fuse has to be replaced.',
      ],
      modelAnswer: 'The current to the kitchen flows through the contacts and through the electromagnet of the circuit breaker. When a fault makes the current too large, the electromagnet pulls harder, until its pull is strong enough to release the iron catch. A spring then pulls the contacts apart and the current stops. The advantage over a fuse is that a circuit breaker does not melt: once the fault is fixed, it can be reset by pressing its button, whereas a fuse has to be replaced.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full.
  diagrams: [
    {
      id: 'diag_1_wire_reversed',
      type: 'mcq',
      inlineSvg: DIAGRAMS.WIRE_FIELD,
      imageAlt: 'Looking along a straight wire, end-on. The wire is a small circle with a dot in the middle: the current flows out of the page, towards the viewer. Three circular field lines are centred on the wire, close together near it and further apart further out, and the arrows on them run anticlockwise. Labels say the field is strongest near the wire and weaker further out.',
      promptText: 'The drawing shows the field around a wire carrying a current out of the page. The current is reversed, so it now flows INTO the page. Which describes the new field?',
      options: [
        { val: 'A', text: 'The same circles, still running anticlockwise' },
        { val: 'B', text: 'The same circles, but now running clockwise' },
        { val: 'C', text: 'Straight lines pointing away from the wire' },
        { val: 'D', text: 'No field, because the current is going the other way' },
      ],
      correct: 'B',
      marks: 1,
      expEn: 'Reversing the current reverses the field. With your right thumb pointing into the page, your fingers curl clockwise as you look at it, so the circles keep their shape and spacing but now run clockwise. The pattern is still circles (not C), and a current in either direction makes a field (not D).',
    },
    {
      id: 'diag_2_relay_wire_breaks',
      type: 'mcq',
      inlineSvg: DIAGRAMS.RELAY,
      imageAlt: 'A relay circuit. On the left, the input circuit: a battery, a switch S (drawn open) and the coil of an electromagnet wound on an upright iron core. Above the core is an L-shaped iron armature on a pivot; its lower end sits beside contacts C, which are drawn open. On the right, the output circuit: the power supply for the motor, an electric motor and contacts C, all in one loop. A dotted box round the core, coil, armature and contacts is labelled relay.',
      promptText: 'Switch S has been closed and the motor is running. Then the thin wire of the input circuit breaks. What happens, and why?',
      options: [
        { val: 'A', text: 'The motor keeps running, because its own power supply is not broken' },
        { val: 'B', text: 'The motor speeds up, because all the current now goes to the motor' },
        { val: 'C', text: 'The motor stops: the electromagnet loses its magnetism, the armature is released and contacts C open' },
        { val: 'D', text: 'The motor keeps running, because the input battery now powers it' },
      ],
      correct: 'C',
      marks: 1,
      expEn: 'The motor circuit is only complete while contacts C are held closed — and it is the electromagnet that holds them. With the input wire broken, no current flows in the coil, the iron core loses its magnetism, the armature is released and contacts C spring apart, so the motor stops. Its own supply being unbroken does not help (A), and the input current never flows to the motor (B, D).',
    },
    {
      id: 'diag_3_breaker_trips',
      inlineSvg: DIAGRAMS.CIRCUIT_BREAKER,
      imageAlt: 'A circuit breaker. The current comes in from the left to the pivot of a metal arm, flows along the arm, through a pair of closed contacts near its right-hand end, down a metal post, and then through the coil of an electromagnet before it leaves on the right. A spring above the arm pulls it upwards, which would open the contacts. An iron catch, pivoted at its lower end and held by a small spring, hooks over the tip of the arm and holds the contacts closed. The electromagnet sits beside the iron catch. A reset button above the arm can push the arm back down.',
      promptText: 'The diagram shows a circuit breaker. Describe what happens inside it when the current rises above its limit, and how it is put back into use.',
      suggestedWords: [['magnetised', 'magnetic'], ['spring'], ['pivot']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the larger current makes the electromagnet pull harder on the iron catch.',
        '1 mark: the catch is released, the spring pulls the contacts apart and the current stops.',
        '1 mark: the reset button pushes the contacts closed again (and the catch holds them), so nothing needs replacing.',
      ],
      modelAnswer: 'All the current flows through the contacts and through the coil of the electromagnet. When the current rises above the limit, the electromagnet becomes strong enough to pull the iron catch towards it. The catch turns on its pivot and its hook slides off the tip of the arm, so the spring pulls the arm up and the contacts apart. The circuit is broken and the current stops. Once the fault has been put right, pressing the reset button pushes the arm back down, the contacts close and the catch holds them again, so nothing needs to be replaced.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
