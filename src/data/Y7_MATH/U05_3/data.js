// src/data/Y7_MATH/U05_3/data.js
// 5.3 Drawing lines and quadrilaterals — self-study unit with its own engine,
// Zero on the Line (ZERO_LINE, p83). Plan: docs/y7-math/plans/U05_3.md.
// 125 XP available, capped at 100 by unitXPOf. Gates: 20 of 35 (57%) and 80 of
// 105 (76%), both under the 80% rule.
//
// Less busy work, by design: the deck (most of the teaching), the key words,
// ONE flagship task that does the section's real work (Zero on the Line), one
// reasoning task (Short Answers: explaining a check or a mistake), the quiz and
// the arcade. No Workbook, Quick Fire or cloze reading.
//
// English and French only (meta.vietnamese: false), like the classroom deck.
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U05_3_DATA = {
  meta: {
    id: 'U05_3',
    title: 'Drawing Lines and Quadrilaterals',
    desc: 'Read and draw angles with a protractor, starting at 0 on the line; a square needs right angles; the perpendicular from a point; a parallel line by making the same angle; a quadrilateral from a sketch; and checking a drawing with 360°.',
    track: 'Y7_MATH',
    icon: 'TriangleRight',
    vietnamese: false,
    classroom: [{ course: 'y7-math', slug: 'U05_3', title: 'Maths 5.3 · Drawing Lines and Quadrilaterals' }],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 25 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 20,
      tasks: [
        { id: 'ZERO_LINE', dbKey: 'p83', maxXP: 45 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 25 },
      ],
    },
    {
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words: the section's own — the tool, the standard, the line it adds,
  // and the Workbook words its questions are written in. The example sentences
  // use their own numbers, so none gives away a deck, task or quiz item.
  realWords: [
    {
      word: 'Protractor', fr: 'Rapporteur',
      def: 'A half circle with two scales of degrees, for measuring and drawing angles.',
      frDef: 'Un demi-cercle avec deux échelles de degrés, pour mesurer et tracer des angles.',
      sent: 'Put the centre of the protractor on the point.',
      frSent: 'Pose le centre du rapporteur sur le point.',
      isReal: true,
    },
    {
      word: 'Accurate', fr: 'Précis',
      def: 'Exactly right: lengths to the nearest millimetre, angles to the nearest degree.',
      frDef: 'Exactement juste : les longueurs au millimètre près, les angles au degré près.',
      sent: 'An accurate drawing of a square has four right angles.',
      frSent: 'Un tracé précis d’un carré a quatre angles droits.',
      isReal: true,
    },
    {
      word: 'Diagonal', fr: 'Diagonale',
      def: 'A line from one corner of a shape to the opposite corner.',
      frDef: 'Une droite qui va d’un coin d’une figure au coin opposé.',
      sent: 'A rectangle has two diagonals of the same length.',
      frSent: 'Un rectangle a deux diagonales de même longueur.',
      isReal: true,
    },
    {
      word: 'Perpendicular from a point', fr: 'Perpendiculaire menée d’un point',
      def: 'The line from the point that meets the line at 90°. It is the shortest way to the line.',
      frDef: 'La droite partant du point qui coupe la droite à 90°. C’est le chemin le plus court jusqu’à la droite.',
      sent: 'The perpendicular from the lamp to the floor goes straight down.',
      frSent: 'La perpendiculaire menée de la lampe au sol descend tout droit.',
      isReal: true,
    },
    {
      word: 'Sketch', fr: 'Croquis',
      def: 'A quick drawing that shows a shape and its numbers, but is not accurate.',
      frDef: 'Un dessin rapide qui montre une figure et ses nombres, mais qui n’est pas précis.',
      sent: 'Draw the triangle again from the sketch, with a ruler and a protractor.',
      frSent: 'Retrace le triangle d’après le croquis, avec une règle et un rapporteur.',
      isReal: true,
    },
    {
      word: 'Through', fr: 'Passant par',
      def: 'A line through a point goes across that point and can carry on past it.',
      frDef: 'Une droite passant par un point traverse ce point et peut continuer après.',
      sent: 'Draw a line through Q, parallel to the edge of the page.',
      frSent: 'Trace une droite passant par Q, parallèle au bord de la page.',
      isReal: true,
    },
  ],

  // Short Answers: explaining is the skill here — the Workbook asks "How can
  // you check that your answer is correct?". One idea a question, three marks.
  shortQA: [
    {
      id: 'sq1',
      question: 'Mr Bowen nails four 40 cm sticks into a square frame, with one nail at each corner. When he picks it up, it squashes. All four sides are still 40 cm. Explain why it is not a square any more.',
      frTranslation: 'M. Bowen cloue quatre baguettes de 40 cm en un cadre carré, avec un clou à chaque coin. Quand il le soulève, il s’écrase. Les quatre côtés font encore 40 cm. Explique pourquoi ce n’est plus un carré.',
      suggestedWords: [['corner', 'corners'], ['side', 'sides'], ['angle', 'angles']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying a square needs four right angles (90°) as well as four equal sides.',
        '1 mark for explaining that one nail lets each corner turn, so the angles changed (for example to about 60° and 120°) while the sides stayed 40 cm.',
        '1 mark for naming the new shape: a rhombus (four equal sides, no right angles).',
      ],
      modelAnswer: 'A square needs four right angles as well as four equal sides. With only one nail at each corner, the corners can turn, so when he picked it up the angles changed to about 60° and 120°. The sides are still 40 cm, but there are no right angles now, so the frame is a rhombus, not a square.',
    },
    {
      id: 'sq2',
      question: 'Mr Bowen draws a line through P, parallel to AB. Further along, the two lines cross. He says they are "a little bit parallel". Is he right? Explain, and say what he probably did wrong.',
      frTranslation: 'M. Bowen trace une droite passant par P, parallèle à AB. Plus loin, les deux droites se coupent. Il dit qu’elles sont « un peu parallèles ». A-t-il raison ? Explique, et dis ce qu’il a sans doute mal fait.',
      suggestedWords: [['corresponding'], ['line across', 'crosses'], ['protractor']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for saying he is wrong: parallel lines never meet (they stay the same distance apart), so lines that cross are not parallel.',
        '1 mark for how a parallel line is drawn: the angle at P must be the same as the angle the line across makes with AB (corresponding angles).',
        '1 mark for the likely mistake: his angle at P was not the same — for example he read the other scale (180° minus the angle) or misread the protractor.',
      ],
      modelAnswer: 'He is wrong. Parallel lines never meet, because they stay the same distance apart, so two lines that cross are not parallel at all. To draw a parallel line, the angle at P must be the same as the angle the line across makes with AB, in the same place. His angle at P was probably not the same: he may have read the other scale and drawn 180° minus the angle.',
    },
    {
      id: 'sq3',
      question: 'Lan measures an acute angle with a protractor and writes 115°. What has she done wrong, and how can she get the right answer?',
      frTranslation: 'Lan mesure un angle aigu au rapporteur et écrit 115°. Qu’a-t-elle mal fait, et comment peut-elle trouver la bonne réponse ?',
      suggestedWords: [['scale', 'scales'], ['estimate'], ['zero', '0']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for noticing that 115° is obtuse (more than 90°), so it cannot be the size of an acute angle — the estimate shows the reading is wrong.',
        '1 mark for the cause: she read the other scale, the one that starts at 180 on the arm, instead of counting up from the 0 on the line.',
        '1 mark for the right answer: 180° − 115° = 65° (or: counting up from the 0 on the arm gives 65°).',
      ],
      modelAnswer: 'An acute angle is less than 90°, but 115° is more than 90°, so her reading must be wrong. She read the other scale, the one that starts at 180 on the arm, instead of counting up from the 0 that sits on the line. If she counts up from that 0 she gets 180° − 115° = 65°, which is acute.',
    },
    {
      id: 'sq4',
      question: 'Explain how to draw a line through P parallel to AB, using only a ruler and a protractor.',
      frTranslation: 'Explique comment tracer une droite passant par P, parallèle à AB, avec seulement une règle et un rapporteur.',
      suggestedWords: [['protractor'], ['line across', 'crosses'], ['corresponding']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for drawing a line through P that crosses AB.',
        '1 mark for measuring the angle this line makes with AB with the protractor (centre on the point, 0 on the line).',
        '1 mark for drawing the same angle at P, in the same position (corresponding angles), and ruling the line through P along it.',
      ],
      modelAnswer: 'First I draw a line through P that crosses AB. Then I measure the angle this line makes with AB, with the centre of the protractor on the point where they cross and the 0 on AB. Last, I put the protractor on P and draw the same angle, in the same position, and rule the line through P. The angles are corresponding angles, so the new line is parallel to AB.',
    },
  ],

  // Zero on the Line (ZERO_LINE): the protractor is placed for the student;
  // every reading, mark and slip is derived by utils/zeroLine.js. Levels 1–2
  // teach the full read (estimate, which 0, read); from level 3 an item is two
  // actions, and an extra stage opens only after a slip. Level 7 is on paper
  // and can be skipped.
  zeroLine: {
    title: 'Zero on the Line',
    titleFr: 'Le zéro sur la droite',
    intro: 'The protractor is placed for you. You decide: what kind of angle, which 0, where to read or mark. "Look closer" zooms in.',
    introFr: 'Le rapporteur est posé pour toi. Tu décides : quel genre d’angle, quel 0, où lire ou marquer. « Regarde de près » agrandit.',
    levels: {
      1: { en: 'Read: the 0 on the right', fr: 'Lire : le 0 de droite' },
      2: { en: 'Read: the 0 on the left', fr: 'Lire : le 0 de gauche' },
      3: { en: 'Turned, not on 0, and reflex', fr: 'Tourné, pas sur 0, et rentrant' },
      4: { en: 'Draw an angle', fr: 'Tracer un angle' },
      5: { en: 'Parallel and perpendicular', fr: 'Parallèle et perpendiculaire' },
      6: { en: 'From a sketch', fr: 'D’après un croquis' },
      7: { en: 'With your own tools', fr: 'Avec tes propres outils' },
    },
    items: [
      { id: 'r1', level: 1, kind: 'read', angle: 35, zero: 'right' },
      { id: 'r2', level: 1, kind: 'read', angle: 130, zero: 'right' },
      { id: 'r3', level: 2, kind: 'read', angle: 50, zero: 'left' },
      { id: 'r4', level: 2, kind: 'read', angle: 145, zero: 'left' },
      { id: 'r5', level: 3, kind: 'read', angle: 75, zero: 'right', turn: 30 },
      { id: 'r6', level: 3, kind: 'read', angle: 65, zero: 'right', offset: 20 },
      { id: 'r7', level: 3, kind: 'reflex', angle: 235 },
      { id: 'd1', level: 4, kind: 'draw', angle: 45, zero: 'right' },
      { id: 'd2', level: 4, kind: 'draw', angle: 110, zero: 'left' },
      { id: 'b1', level: 5, kind: 'parallel', angle: 65 },
      { id: 'b2', level: 5, kind: 'perp', AB: 7, C: [4.3, 3] },
      { id: 'q1', level: 6, kind: 'sketch', AB: 6.5, A: 75, AD: 4.5, B: 110, BC: 5 },
      { id: 'q2', level: 6, kind: 'shape', AB: 6.5, A: 75, AD: 4.5, B: 110, BC: 5, at: 'D' },
      { id: 'p1', level: 7, kind: 'paper', shape: 'square', side: 6 },
      { id: 'p2', level: 7, kind: 'paper', shape: 'quad', AB: 7, A: 70, AD: 4, B: 105, BC: 5.5 },
    ],
  },

  notes: notes,
  assessment: assessment,
  games: games,
};
