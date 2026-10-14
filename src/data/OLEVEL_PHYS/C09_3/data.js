// src/data/OLEVEL_PHYS/C09_3/data.js
// Chapter 9, unit 3: Motors and Electromagnetic Induction — book spreads 9.5
// "Magnetic force on a current" (pages 206–207), 9.6 "Electric motors" (pages
// 208–209) and 9.7 "Electromagnetic induction" (pages 210–211). English only:
// this track is not bilingual, so there are no `vn*` twins.
//
// A TWO-WAY EFFECT unit: a current in a field feels a force (the motor effect),
// and a conductor moved through a field has an e.m.f. induced in it (the
// generator effect) — the same three things, field, current and motion, with
// a different one unknown. The light shape this track uses (no workbook, no
// production engine; the deck's 23 scored items are the practice):
//   Gate 0 (Learn)   — Notes (20) + Vocab (10)
//   Gate 1 (Apply)   — Questions (25) + Source Analysis (25)
//   Gate 2 (Quiz)    — the Quiz (30) and the Games arcade (0), unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf), so a student can drop ten
// marks and still finish. Gate 1 sits at 20 of the 30 XP before it (67%) and
// Gate 2 at 60 of 80 (75%), both inside the 80% rule the validator enforces.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
//
// Every direction in an item here — a force from Fleming's left-hand rule, a
// galvanometer swing — is worked out in the comment on the diagram it uses
// (diagrams.js) and in docs/olevel-phys/plans/C09_3.md.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const C09_3_DATA = {
  meta: {
    id: 'C09_3',
    title: 'Motors and Electromagnetic Induction',
    desc: 'Use Fleming\'s left-hand rule to find the force on a current in a magnetic field, explain how loudspeakers, meters and d.c. motors use it, and describe how moving a wire or a magnet induces an e.m.f. and what decides its size and direction.',
    track: 'OLEVEL_PHYS',
    icon: 'RotateCcw',
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

  // Key words — every bold term in the three spreads, plus the words an O Level
  // question is written in (conductor, induced, e.m.f.). English-only (word +
  // def + sentence); Recognition uses word + def. In the plan's order.
  realWords: [
    {
      word: 'Fleming\'s left-hand rule', isReal: true,
      def: 'A rule for the direction of the force on a current in a magnetic field. On the left hand: First finger = Field, seCond finger = Current, thuMb = Motion.',
      sent: 'Using Fleming\'s left-hand rule, she found that the force on the wire was upwards.',
    },
    {
      word: 'Conductor', isReal: true,
      def: 'A material or object that lets an electric current pass through it, such as a copper wire.',
      sent: 'A current-carrying conductor in a magnetic field feels a force.',
    },
    {
      word: 'Radial field', isReal: true,
      def: 'A magnetic field whose lines point straight out from a centre, like the spokes of a wheel.',
      sent: 'The cylindrical magnet gives a radial field, at right angles to every part of the coil.',
    },
    {
      word: 'Moving-coil loudspeaker', isReal: true,
      def: 'A device in which an alternating current in a coil, sitting in a magnet\'s field, makes the coil and a cone vibrate to produce sound.',
      sent: 'Most loudspeakers in phones and radios are moving-coil loudspeakers.',
    },
    {
      word: 'Cone', isReal: true,
      def: 'The stiff paper or plastic part of a loudspeaker, fixed to the coil, that vibrates and pushes the air to make sound waves.',
      sent: 'As the coil moves in and out, the cone pushes the air.',
    },
    {
      word: 'Turning effect', isReal: true,
      def: 'The ability of forces to make something rotate about an axle or pivot.',
      sent: 'The forces on the two sides of the coil produce a turning effect.',
    },
    {
      word: 'Moving-coil meter', isReal: true,
      def: 'A meter whose pointer is fixed to a coil in a magnetic field; the bigger the current, the further the coil turns against its springs.',
      sent: 'The ammeter on the bench is a moving-coil meter.',
    },
    {
      word: 'D.c. motor', isReal: true,
      def: 'An electric motor that runs on direct current — the one-way current that flows from a battery.',
      sent: 'The toy car is driven by a small d.c. motor.',
    },
    {
      word: 'Commutator', isReal: true,
      def: 'A split ring fixed to a motor\'s coil. It reverses the current in the coil every half turn, so the coil keeps turning the same way.',
      sent: 'The commutator turns with the coil and rubs against the brushes.',
    },
    {
      word: 'Brushes', isReal: true,
      def: 'Two contacts, usually made of carbon, that rub against the commutator and keep the turning coil connected to the supply.',
      sent: 'When the brushes wear down, the motor stops working.',
    },
    {
      word: 'Armature', isReal: true,
      def: 'The iron core on which a motor\'s coils are wound. It becomes magnetised and makes the magnetic field stronger.',
      sent: 'The coils of a drill motor are wound on an iron armature.',
    },
    {
      word: 'Electromagnetic induction', isReal: true,
      def: 'Producing an e.m.f. in a conductor by moving it through a magnetic field, or by moving a magnetic field past it.',
      sent: 'Electromagnetic induction makes a current flow when a magnet is pushed into a coil.',
    },
    {
      word: 'E.m.f.', isReal: true,
      def: 'Electromotive force: the voltage a source provides, measured in volts. A battery, or a wire moving through a magnetic field, is a source.',
      sent: 'Moving the wire faster induced a larger e.m.f.',
    },
    {
      word: 'Induced', isReal: true,
      def: 'Produced in something by a magnetic field, without touching it. A voltage is made in a wire by cutting field lines.',
      sent: 'An e.m.f. is induced in the coil while the magnet moves.',
    },
    {
      word: 'Galvanometer', isReal: true,
      def: 'A very sensitive meter for small currents. On a centre-zero one, the pointer moves left or right of zero, depending on the current\'s direction.',
      sent: 'The galvanometer needle flicked to the left as the wire moved up.',
    },
    {
      word: 'Faraday\'s law', isReal: true,
      def: 'The e.m.f. induced in a conductor is proportional to the rate at which it cuts magnetic field lines.',
      sent: 'By Faraday\'s law, moving the magnet twice as fast induces a bigger e.m.f.',
    },
  ],

  // Short Answers: three-mark reasoning questions, each a clean one-mark-per-line
  // scheme (docs/question-quality.md), built on the ideas of the spreads' end
  // questions but with fresh set-ups. Prompts are plain text — ShortAnswers.jsx
  // does not render $…$ — so symbols are Unicode.
  shortQA: [
    {
      id: 'sq1',
      question: 'A straight wire carrying a current lies at right angles to the magnetic field between two magnetic poles, and the force on it is upwards. State two different changes, each of which on its own would make the force act downwards, and one change that would make the force zero.',
      suggestedWords: [['reverse'], ['parallel'], ['right angles']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: reverse the current (e.g. turn the battery round).',
        '1 mark: reverse the magnetic field (e.g. swap the poles over / turn the magnet round).',
        '1 mark: turn the wire so that it lies parallel to the field lines, or switch the current off.',
      ],
      modelAnswer: 'The force would act downwards if the current were reversed, for example by turning the battery round. It would also act downwards if the magnetic field were reversed by turning the magnet round, so that the poles swap sides. The force would become zero if the wire were turned so that it lies parallel to the field lines, or if the current were switched off.',
    },
    {
      id: 'sq2',
      question: 'Explain how a moving-coil loudspeaker turns an alternating current from an amplifier into sound.',
      suggestedWords: [['radial'], ['reverse'], ['vibrate']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the coil sits in the (radial) field of the magnet, so a current in it feels a force (given by the left-hand rule).',
        '1 mark: because the current alternates, the force on the coil keeps reversing, so the coil and the cone vibrate in and out.',
        '1 mark: the vibrating cone pushes the air to and fro, making sound waves.',
      ],
      modelAnswer: 'The coil of the loudspeaker sits in the strong radial field of a cylindrical magnet, so when a current flows in the coil there is a force on it, as the left-hand rule predicts. The amplifier sends an alternating current, which flows backwards and forwards, so the force on the coil keeps reversing too. The coil and the paper cone fixed to it therefore vibrate in and out. The vibrating cone pushes the air backwards and forwards, which sends out sound waves.',
    },
    {
      id: 'sq3',
      question: 'In a simple d.c. motor, explain why the coil turns, and what the commutator does and why it is needed.',
      suggestedWords: [['opposite'], ['split ring'], ['vertical']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the two sides of the coil carry current in opposite directions, so (by the left-hand rule) the forces on them are opposite and there is a turning effect.',
        '1 mark: the commutator (split ring) reverses the current in the coil every half turn, just as the coil passes the vertical.',
        '1 mark: without it the forces would turn the coil back and it would stop in the vertical position; with it the forces keep pushing the coil round the same way.',
      ],
      modelAnswer: 'The current flows along one side of the coil and back along the other, so the two sides carry current in opposite directions. By Fleming\'s left-hand rule the forces on them are opposite, one up and one down, so there is a turning effect on the coil. The commutator is a split ring that turns with the coil, and it reverses the current in the coil every half turn, just as the coil passes the vertical. This is needed because, without it, the forces would turn the coil back once it had passed the vertical, and the coil would come to rest there. With the current reversed, the forces keep pushing the coil round the same way.',
    },
    {
      id: 'sq4',
      question: 'A toy motor with one coil and flat-faced magnets turns weakly and jerkily. Explain two features of a practical motor that give it a stronger, smoother turning effect.',
      suggestedWords: [['armature'], ['radial'], ['segments']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: names two features from: several coils at different angles, each with its own pair of commutator segments; coils wound on an iron armature; curved pole pieces.',
        '1 mark: explains the first named feature — e.g. several coils: one coil is always near its best position, so the turning effect is larger and steadier; armature: the iron is magnetised and strengthens the field; curved pole pieces: the field is radial, so the turning effect stays near its maximum for most of the turn.',
        '1 mark: explains the second named feature in the same way.',
      ],
      modelAnswer: 'First, a practical motor has several coils set at different angles, each with its own pair of commutator segments. At any moment one of the coils is near the position where its turning effect is biggest, so the motor turns more strongly and more smoothly. Second, its pole pieces are curved, which makes the magnetic field radial. The sides of the coils then cut across the field at right angles for most of each turn, so the turning effect stays near its maximum instead of dropping away.',
    },
    {
      id: 'sq5',
      question: 'A bar magnet is pushed N pole first into a coil connected to a centre-zero galvanometer, held still inside the coil for a moment, then pulled out again. Describe what the galvanometer shows at each stage, and explain why.',
      suggestedWords: [['cut'], ['induced'], ['opposite']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: pushed in — the needle deflects one way, because the moving field lines are cut by the coil, inducing an e.m.f. that drives a current.',
        '1 mark: held still — the needle returns to / stays at zero, because no field lines are being cut, so there is no e.m.f.',
        '1 mark: pulled out — the needle deflects the other way, because the lines are cut in the opposite direction, so the induced e.m.f. and current are reversed.',
      ],
      modelAnswer: 'While the magnet is being pushed in, the needle flicks to one side. The moving field lines are being cut by the coil, so an e.m.f. is induced in it, and this drives a current through the galvanometer. While the magnet is held still, the needle goes back to zero, because no field lines are being cut and so no e.m.f. is induced. While the magnet is pulled out, the needle flicks the opposite way, because the field lines are now cut in the opposite direction, so the induced e.m.f. and current are reversed.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so the written item's mark
  // scheme and model answer describe it in full. Item 1 reverses the FIELD
  // (the deck's c5 already reverses the current); with the field out of the
  // page and the current up the page, F = I × B: y × z = +x → to the RIGHT.
  diagrams: [
    {
      id: 'diag_1_field_reversed',
      type: 'mcq',
      inlineSvg: DIAGRAMS.LHR_EXAMPLE,
      imageAlt: 'A square region filled with rows of blue × marks, which means the magnetic field points into the page. A vertical copper wire runs up the middle, with orange arrowheads on it pointing up the page: the current flows up. A thick green arrow points from the wire to the left: the force. A key at the side reads: × = into the page, • = out of the page, a green arrow is the force, an orange arrow is the current; field into the page, current up the page, force to the left.',
      promptText: 'In the drawing the field is into the page and the current flows up the page, so the force on the wire is to the left. A student now turns the magnet round, so the field points OUT of the page. The current still flows up. Which way is the force now?',
      options: [
        { val: 'A', text: 'To the right' },
        { val: 'B', text: 'Still to the left — only the current decides the direction' },
        { val: 'C', text: 'Up the page, along the current' },
        { val: 'D', text: 'There is no force now' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'Reversing the field reverses the force. With the left hand: first finger out of the page, second finger up the page — the thumb points to the right. The field matters as much as the current (B), the force is never along the current (C), and the field and current are still at right angles, so there is still a force (D).',
    },
    {
      id: 'diag_2_vertical_no_turn',
      type: 'mcq',
      inlineSvg: DIAGRAMS.COMMUTATOR_ACTION,
      imageAlt: 'Three end views of a motor coil between an N pole on the left and an S pole on the right, with field lines from N to S. Each shows the coil\'s two sides as circles, a split ring round the axle, two brushes at the left and right of the ring, and a battery below. Panel 1, coil horizontal: the left side carries current out of the page and is pushed up, the right side carries current into the page and is pushed down; a curved arrow shows the coil turning clockwise. Panel 2, coil vertical: the top side is pushed straight up and the bottom side straight down, along one vertical line through the axle; the gaps in the split ring are at the brushes. Panel 3, just past vertical: the current in each side has reversed, the side near the top is pushed down and the side near the bottom is pushed up, and the coil turns on clockwise.',
      promptText: 'In the middle panel the coil is vertical, and the forces on its two sides are still drawn: one up, one down. Why is there no turning effect at that instant?',
      options: [
        { val: 'A', text: 'The two forces act along the same line through the axle, so they cannot turn the coil' },
        { val: 'B', text: 'The current has stopped, so there are no forces' },
        { val: 'C', text: 'The coil has moved out of the magnetic field' },
        { val: 'D', text: 'The brushes have worn out' },
      ],
      correct: 'A',
      expEn: 'A force turns the coil only if it acts to one side of the axle. At the vertical, the upward force on the top side and the downward force on the bottom side lie on one line through the axle, so they pull the coil apart instead of turning it. The forces are drawn, so there is still a current (B); both sides are still between the poles (C); and nothing about the brushes has changed (D).',
    },
    {
      id: 'diag_3_moving_wire',
      inlineSvg: DIAGRAMS.INDUCED_WIRE,
      imageAlt: 'Two panels side by side. In each, the N pole of a magnet is on the left and the S pole on the right, with blue field lines running from N to S between them. A copper wire, seen end-on, sits in the middle of the field, joined by two leads to a centre-zero galvanometer below. Left panel, "wire moved down": a green arrow beside the wire points down, and the galvanometer needle points to the right of zero. Right panel, "wire moved up": the green arrow points up, and the needle points to the left of zero.',
      promptText: 'The left panel shows the wire moved down through the field, and the right panel shows it moved up. Describe what the galvanometer does in each case, and give two ways to make the deflection larger.',
      suggestedWords: [['induced'], ['e.m.f.', 'emf'], ['field lines']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: moved down, the needle deflects one way (to the right); moved up, it deflects the opposite way (to the left) — the direction of the induced e.m.f. / current depends on the direction of motion.',
        '1 mark: move the wire faster.',
        '1 mark: use a stronger magnet, or put more wire in the field (e.g. loop the wire through the field several times).',
      ],
      modelAnswer: 'When the wire is moved down through the field, an e.m.f. is induced in it and the galvanometer needle flicks to the right. When the wire is moved up, the needle flicks to the left, because reversing the direction of motion reverses the induced e.m.f. and current. To make the deflection larger, the wire could be moved faster, so that it cuts the field lines at a greater rate. A stronger magnet could also be used, or the wire could be looped through the field several times so that more wire cuts the lines.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
