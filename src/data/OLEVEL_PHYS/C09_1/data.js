// src/data/OLEVEL_PHYS/C09_1/data.js
// Chapter 9, unit 1: Magnets and Magnetic Fields — book spreads 9.1 "Magnets"
// and 9.2 "Magnetic fields" (pages 198–201). English only: this track is not
// bilingual, so there are no `vn*` twins. Plan: docs/olevel-phys/plans/C09_1.md.
//
// A phenomena unit in the track's light shape — no workbook, no engine:
//   Gate 0 (Learn)   — Notes (24 slides, 23 scored) + Vocab
//   Gate 1 (Apply)   — Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf), so a student can drop ten
// marks and still finish. Gate 1 sits at 20 of the 30 XP before it (67%) and
// Gate 2 at 60 of 80 (75%), both inside the 80% rule the validator enforces.
// Notes is worth 20, not the usual 10: with no workbook, the deck's scored items
// are the unit's practice. Module properties are written out in full
// (`notes: notes,`) so the audio generator never over-reads the realWords array.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const C09_1_DATA = {
  meta: {
    id: 'C09_1',
    title: 'Magnets and Magnetic Fields',
    desc: 'Name the poles of a magnet and state the force law, predict induced poles, sort magnetic, hard and soft materials, plot and arrow a field line with a compass, find a neutral point, and explain why a compass points north.',
    track: 'OLEVEL_PHYS',
    icon: 'Magnet',
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

  // Key words — every bold term in the two spreads, in the plan's order. English
  // only (word + def + sentence); Recognition uses word + def, so no definition
  // contains its own word. Every sentence is a fresh situation.
  realWords: [
    {
      word: 'Pole', isReal: true,
      def: 'One of the two places on a magnet where the magnetic force is strongest — usually at its ends.',
      sent: 'Most of the paper clips hung from the two poles of the magnet.',
    },
    {
      word: 'North-seeking pole (N pole)', isReal: true,
      def: 'The pole of a magnet that points north when the magnet is free to turn.',
      sent: 'The red end of the compass needle is its north-seeking pole.',
    },
    {
      word: 'South-seeking pole (S pole)', isReal: true,
      def: 'The pole of a magnet that points south when the magnet is free to turn.',
      sent: 'When the hanging magnet stopped swinging, its south-seeking pole faced south.',
    },
    {
      word: 'Repel', isReal: true,
      def: 'To push away. Like poles do this to each other.',
      sent: 'When she turned one magnet round, the two magnets began to repel.',
    },
    {
      word: 'Attract', isReal: true,
      def: 'To pull towards. Unlike poles do this, and a magnet does it to iron and steel.',
      sent: 'A magnet will attract an iron nail but not a copper coin.',
    },
    {
      word: 'Induced magnetism', isReal: true,
      def: 'Magnetism that a material gains because a magnet is near it. The pole that appears nearest the magnet is the opposite pole.',
      sent: 'Induced magnetism holds a chain of nails hanging from the magnet.',
    },
    {
      word: 'Permanent magnet', isReal: true,
      def: 'A magnet that keeps its magnetism for a long time. Made from hard magnetic materials such as steel.',
      sent: 'A fridge magnet is a permanent magnet.',
    },
    {
      word: 'Temporary magnet', isReal: true,
      def: 'A material that is a magnet only while a magnet is near it, and loses its magnetism when the magnet is taken away.',
      sent: 'The iron nail was only a temporary magnet: it dropped the pins as soon as the magnet was removed.',
    },
    {
      word: 'Ferromagnetic', isReal: true,
      def: 'Strongly magnetic. Iron, nickel and cobalt, and alloys containing them, are like this.',
      sent: 'Nickel is ferromagnetic, so a magnet picks up a nickel washer.',
    },
    {
      word: 'Hard magnetic material', isReal: true,
      def: 'A material that is difficult to magnetise but keeps its magnetism, such as steel. Used for permanent magnets.',
      sent: 'Steel is a hard magnetic material, so a magnetised steel needle stays magnetised.',
    },
    {
      word: 'Soft magnetic material', isReal: true,
      def: 'A material that is easy to magnetise but loses its magnetism easily, such as iron. Used for the cores of electromagnets.',
      sent: 'The core of the crane\'s electromagnet is made of a soft magnetic material.',
    },
    {
      word: 'Non-magnetic material', isReal: true,
      def: 'A material that cannot be magnetised and is not attracted to a magnet, such as copper, aluminium or plastic.',
      sent: 'Aluminium cans are non-magnetic, so the magnet at the recycling centre leaves them behind.',
    },
    {
      word: 'Ferrous', isReal: true,
      def: 'Containing iron. Iron and steel are metals of this kind.',
      sent: 'The magnet pulled the ferrous scrap out of the pile; the copper pipes were non-ferrous and stayed.',
    },
    {
      word: 'Magnetic field', isReal: true,
      def: 'The region around a magnet where a magnetic material feels a force.',
      sent: 'The plotting compass showed the shape of the magnetic field around the magnet.',
    },
    {
      word: 'Field line', isReal: true,
      def: 'A line showing which way a magnet\'s force on an N pole acts. Outside a magnet these lines run from N to S.',
      sent: 'Near the poles the field lines are packed closely together.',
    },
    {
      word: 'Neutral point', isReal: true,
      def: 'A point where two magnetic fields cancel, so there is no magnetic force there.',
      sent: 'A tiny piece of iron at the neutral point was not pulled either way.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md), built on the ideas of the spreads' questions
  // but with fresh situations. Prompts are plain text — ShortAnswers.jsx does
  // not render $…$. Suggested words are vocabulary an answer USES, never the
  // answer (the spoiler test).
  shortQA: [
    {
      id: 'sq1',
      question: 'A student is given a bar magnet with no labels on it, and a reel of thread. Explain how she can find out which end is the N pole, and what the name "north-seeking pole" means.',
      suggestedWords: [['thread', 'freely'], ['Earth'], ['settles', 'comes to rest']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: hang the magnet from the thread so it can turn freely; the Earth\'s magnetic field turns it until it comes to rest lying (roughly) north–south.',
        '1 mark: the end that points north is the N pole (the end pointing south is the S pole).',
        '1 mark: "north-seeking" means it is the pole that seeks / points towards the north when the magnet is free to turn.',
      ],
      modelAnswer: 'She should tie the thread round the middle of the magnet and hang it up, so that it can turn freely. The Earth\'s magnetic field turns the magnet until it comes to rest lying roughly north–south. The end that points north is the N pole, and the end that points south is the S pole. "North-seeking" means that this pole seeks, or points towards, the north whenever the magnet is free to turn.',
    },
    {
      id: 'sq2',
      question: 'An iron nail and a steel nail are each touched against the S pole of a bar magnet, and both stick. They are then pulled off. Explain why both nails stuck, and describe what is different about the two nails afterwards.',
      suggestedWords: [['induced'], ['pole'], ['hard', 'soft']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the magnet induces magnetism in each nail, with an N pole at the end touching the magnet\'s S pole, and unlike poles attract.',
        '1 mark: afterwards the steel nail keeps some of its magnetism — it is now a (weak) permanent magnet, because steel is a hard magnetic material.',
        '1 mark: the iron nail loses (almost) all of its magnetism — it was only a temporary magnet, because iron is a soft magnetic material.',
      ],
      modelAnswer: 'The magnet induces magnetism in each nail. The pole induced at the end touching the magnet is the opposite pole, an N pole, and because unlike poles attract, both nails stick to the S pole. When they are pulled off, the steel nail keeps some of its induced magnetism, because steel is a hard magnetic material: it is now a weak permanent magnet. The iron nail loses almost all of its magnetism, because iron is a soft magnetic material: it was only a temporary magnet.',
    },
    {
      id: 'sq3',
      question: 'Three rods look exactly the same. One is brass, one is iron, and one is a steel magnet. Using only one bar magnet whose poles are labelled, describe how you could tell which rod is which.',
      suggestedWords: [['pole'], ['bring', 'test'], ['induced']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the brass rod is neither attracted nor repelled by either pole — it is non-magnetic.',
        '1 mark: the iron rod is attracted by both poles, whichever of its ends is tested, and is never repelled (its attraction comes from induced magnetism).',
        '1 mark: the steel magnet is the rod that is repelled — one of its ends is pushed away by one pole of the known magnet; repulsion is the only sure test for a magnet.',
      ],
      modelAnswer: 'Bring each pole of the labelled magnet up to each end of every rod. The brass rod is not attracted or repelled at all, because brass is non-magnetic. The iron rod is attracted by both poles of the magnet, whichever end of it you try, but it is never repelled, because the magnet only induces magnetism in it. The steel magnet is the rod that is repelled: one of its ends is pushed away by one pole of the labelled magnet. Repulsion is the only sure test, because only a magnet can be repelled.',
    },
    {
      id: 'sq4',
      question: 'Describe how you would use a plotting compass to draw one magnetic field line around a bar magnet, and explain how a finished field diagram shows where the field is strongest.',
      suggestedWords: [['needle'], ['dots'], ['pencil', 'paper']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: place the compass near one pole and mark a dot at each end of the needle; move the compass so the back of the needle is on the front dot, mark the new front, and repeat.',
        '1 mark: join the dots into a line and add an arrow in the direction the N end of the needle pointed (from the N pole towards the S pole).',
        '1 mark: the field is strongest where the field lines are closest together — near the poles.',
      ],
      modelAnswer: 'Put the magnet on a sheet of paper and place the plotting compass near one pole. Mark a dot at each end of the needle. Then move the compass so that the back of the needle sits on the front dot, and mark the new position of the front. Repeat this until you reach the other pole, then join the dots with a smooth line. Add an arrow pointing the way the N end of the needle pointed, which is from the N pole towards the S pole. In the finished diagram, the field is strongest where the lines are closest together, which is near the poles.',
    },
    {
      id: 'sq5',
      question: 'A hiker uses a compass to find her way. Explain why the N end of the compass needle points towards the north, and why a compass would be of no use to an explorer close to the North Pole.',
      suggestedWords: [['bar magnet'], ['geographic'], ['swing', 'turn']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the Earth\'s field is like that of a (weak) bar magnet inside it, with its magnetic S pole near the geographic north (under magnetic north).',
        '1 mark: unlike poles attract, so the N end of the needle is pulled towards the north.',
        '1 mark: near the North Pole the field lines are (almost) vertical, so there is (almost) no horizontal pull to turn the needle, which can only swing horizontally.',
      ],
      modelAnswer: 'The Earth behaves as if it has a large but weak bar magnet inside it. Its magnetic S pole is in the north, under a place called magnetic north. Unlike poles attract, so the N end of the compass needle is pulled towards the north. Close to the North Pole, the Earth\'s field lines are almost vertical: they point nearly straight down into the ground. A compass needle can only swing horizontally, so there is almost no sideways pull to turn it, and the compass is of no use.',
    },
  ],

  // Source Analysis (Diagrams): reading the unit's own drawings. 2 MCQ : 1
  // written. The grader cannot see the picture, so every imageAlt, and the
  // written item's mark scheme and model answer, describe it in full.
  diagrams: [
    {
      id: 'diag_1_magnet_turned_over',
      type: 'mcq',
      inlineSvg: DIAGRAMS.INDUCED_POLES,
      imageAlt: 'Two panels. Left, "With the magnet": a magnet stands upright with its S pole at the top and its N pole at the bottom. An iron bar and a steel bar hang from its N pole; each has an S at its top end, labelled "induced S", and an N at its bottom end, labelled "induced N". Right, "Magnet taken away": the iron bar has no poles marked and is labelled "temporary magnet"; the steel bar is still marked S at the top and N at the bottom and is labelled "permanent magnet".',
      promptText: 'In the drawing, the magnet\'s N pole faces down. The magnet is now turned over, so its S pole faces down, and a fresh, unmagnetised iron bar is hung from it. Which poles are induced in this iron bar?',
      options: [
        { val: 'A', text: 'S at the top, N at the bottom — the same as in the drawing' },
        { val: 'B', text: 'N at the top, S at the bottom' },
        { val: 'C', text: 'S at both ends' },
        { val: 'D', text: 'None, because iron is not a magnet' },
      ],
      correct: 'B',
      expEn: 'The induced pole nearest a magnet is always the opposite of the pole beside it. With the S pole now facing down, an N pole is induced at the top of the bar, and so an S pole at the bottom — the reverse of the drawing. A bar always has two different poles (not C), and iron is a magnetic material, so it does become a magnet while the magnet is near (not D).',
    },
    {
      id: 'diag_2_compass_on_line',
      type: 'mcq',
      inlineSvg: DIAGRAMS.FIELD_LINES_BAR,
      imageAlt: 'A bar magnet, N pole on the left and S pole on the right, with six field lines looping from its N end round to its S end (three above, three below) and two straight lines along its axis. The lines are closest together at the poles. Every arrow on the loops points from the N end towards the S end; both axis arrows point left — away from the N pole on the left, and into the S pole on the right. A compass on the outer upper loop, above and to the left of the N pole, has its red N end pointing along the line, up and to the right. Caption: "Outside the magnet, the field lines run from N to S."',
      promptText: 'The compass sits on a field line, and the red N end of its needle points the same way as the arrow on the line. What does this tell you about the arrows on field lines?',
      options: [
        { val: 'A', text: 'They show the direction of the force on an N pole, so outside the magnet they point from the N pole to the S pole' },
        { val: 'B', text: 'They point towards whichever pole is nearer' },
        { val: 'C', text: 'They point towards where the field is weakest' },
        { val: 'D', text: 'They show the direction the magnet would move' },
      ],
      correct: 'A',
      expEn: 'A field line\'s arrow is defined as the direction of the force on an N pole — exactly the way a compass\'s N end points. Outside a magnet that is from N to S. Near the N pole the arrows point away from it, not towards the nearer pole (B); arrows say nothing about how strong the field is (C); and the magnet is not moving at all (D).',
    },
    {
      id: 'diag_3_two_fields',
      inlineSvg: DIAGRAMS.TWO_MAGNETS,
      imageAlt: 'Two panels. Left, "Unlike poles facing": two bar magnets in a line, the N pole of the left magnet facing the S pole of the right one. Between them run five straight, parallel, evenly spaced field lines with arrows from the N pole to the S pole, and curved lines bulge above and below; labelled "almost uniform". Right, "Like poles facing": the N pole of the left magnet faces the N pole of the right magnet. Lines leave each N pole and bend away from the other magnet, turning up or down; none crosses the gap. A point marked X sits midway between the two N poles, where the lines from the two sides turn apart; labelled "X: neutral point — the two fields cancel here".',
      promptText: 'The diagram shows two pairs of magnets. Describe the magnetic field between the magnets in each panel, and explain what would happen to a small piece of iron placed exactly at X.',
      suggestedWords: [['unlike', 'like'], ['spacing'], ['combine']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: unlike poles (left panel): the lines between the magnets are straight, parallel and evenly spaced, running from N to S — the field there is (almost) uniform.',
        '1 mark: like poles (right panel): the lines from the two N poles turn away from each other, and X is a neutral point, where the two fields are equal and opposite and cancel.',
        '1 mark: a piece of iron at X feels no magnetic force / is not pulled either way.',
      ],
      modelAnswer: 'In the left panel an N pole faces an S pole. Between them the field lines are straight, parallel and evenly spaced, running from the N pole to the S pole, so the field there is almost uniform. In the right panel two N poles face each other. The lines from each N pole bend away from the other magnet, and no line crosses the gap. At X, midway between them, the fields of the two magnets are equal in strength and opposite in direction, so they cancel: X is a neutral point. A small piece of iron placed exactly at X would feel no magnetic force, so it would not be pulled either way.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
