// src/data/Y7_MATH/U05_1/data.js
// 5.1 A sum of 360° — self-study unit, reduced from the classroom deck
// lessons/content/y7-math/U05_1 (one period). Plan: docs/y7-math/plans/U05_1.md.
// 125 XP available, capped at 100 by unitXPOf. Gates: 20 of 35 (57%) and
// 80 of 105 (76%), both under the 80% rule — the same as 4.5.
//
// English and French only (meta.vietnamese: false): every learner-facing
// string has a `…Fr` / `fr…` twin and no Vietnamese one.
//
// One idea: find a missing angle and SAY WHY. Fewer tasks, each doing
// different work: the deck meets each fact and predicts before it is told;
// Find It, Say Why (ANGLE_SUM) is the section's real work; Short Answers
// makes the student write the reason in their own sentence.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

export const U05_1_DATA = {
  meta: {
    id: 'U05_1',
    title: 'A Sum of 360°',
    desc: 'Find a missing angle on a straight line (180°), around a point (360°) and in a quadrilateral (360°) in two steps; share what is left between equal angles; use the opposite angles of a parallelogram; and give the fact as the reason.',
    track: 'Y7_MATH',
    icon: 'Compass',
    vietnamese: false,
    classroom: [{ course: 'y7-math', slug: 'U05_1', title: 'Maths 5.1 · A Sum of 360°' }],
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
        { id: 'ANGLE_SUM', dbKey: 'p81', maxXP: 45 },
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

  // Key words: the section's two (sum, quadrilateral), the two places the
  // facts live (a straight line, around a point), the shape with its own fact
  // (parallelogram) and the instruction the questions use (work out). The
  // sentences use their own numbers, so none gives away a deck, task or quiz item.
  realWords: [
    {
      word: 'Sum', fr: 'La somme',
      def: 'The total when you add numbers together.',
      frDef: 'Le total quand on additionne des nombres.',
      sent: 'The sum of 30 and 50 is 80.',
      frSent: 'La somme de 30 et 50, c’est 80.',
      isReal: true,
    },
    {
      word: 'Quadrilateral', fr: 'Le quadrilatère',
      def: 'A flat shape with four straight sides.',
      frDef: 'Une figure plane à quatre côtés droits.',
      sent: 'A kite is a quadrilateral.',
      frSent: 'Un cerf-volant est un quadrilatère.',
      isReal: true,
    },
    {
      word: 'Straight line', fr: 'La ligne droite',
      def: 'A line that does not bend. It is half a turn: 180°.',
      frDef: 'Une ligne qui ne tourne pas. C’est un demi-tour : 180°.',
      sent: 'The edge of a ruler is a straight line.',
      frSent: 'Le bord d’une règle est une ligne droite.',
      isReal: true,
    },
    {
      word: 'Around a point', fr: 'Autour d’un point',
      def: 'All the way round one point: a full turn, 360°.',
      frDef: 'Tout le tour d’un point : un tour complet, 360°.',
      sent: 'The hands of a clock turn around a point.',
      frSent: 'Les aiguilles d’une horloge tournent autour d’un point.',
      isReal: true,
    },
    {
      word: 'Parallelogram', fr: 'Le parallélogramme',
      def: 'A quadrilateral with two pairs of parallel sides. Its opposite angles are equal.',
      frDef: 'Un quadrilatère avec deux paires de côtés parallèles. Ses angles opposés sont égaux.',
      sent: 'A rectangle is a special parallelogram.',
      frSent: 'Un rectangle est un parallélogramme spécial.',
      isReal: true,
    },
    {
      word: 'Work out', fr: 'Calculer',
      def: 'Find the answer. In a question, work out means the same as calculate.',
      frDef: 'Trouver la réponse. Dans une question, work out veut dire la même chose que calculate.',
      sent: 'Work out the size of the angle that has a letter.',
      frSent: 'Calcule la taille de l’angle qui a une lettre.',
      isReal: true,
    },
  ],

  // Short Answers: the reason in the student's own sentence. The Workbook's
  // Practice 4 (is it straight?) and Challenge 10 (eight angles, two
  // quadrilaterals), the deck's big mistake (180° for a point) and the reason
  // every quadrilateral is 360°. Fresh numbers; one mark per scheme line.
  shortQA: [
    {
      id: 'sq1',
      question: 'Two angles meet at a point on the line XY. They are 64° and 115°. Lan says XY is a straight line, because it looks straight. Is Lan right? Give a reason.',
      frTranslation: 'Deux angles se rejoignent en un point de la ligne XY. Ils font 64° et 115°. Lan dit que XY est une ligne droite, parce qu’elle a l’air droite. Lan a-t-elle raison ? Donne une raison.',
      suggestedWords: [['add up to', 'total'], ['because'], ['degrees']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for adding the two angles: 64° + 115° = 179°.',
        '1 mark for the fact: angles on a straight line add up to 180°.',
        '1 mark for the conclusion: 179° is not 180°, so XY is not a straight line and Lan is wrong (looking is not a reason).',
      ],
      modelAnswer: 'Lan is wrong. The two angles add up to 64° + 115° = 179°. Angles on a straight line add up to 180°, and 179° is not 180°, so XY is not a straight line. It only looks straight, because 1° is too small to see.',
    },
    {
      id: 'sq2',
      question: 'Two angles round a point are 152° and x. Mr Bowen writes: x = 180° − 152° = 28°. Explain his mistake, and find x.',
      frTranslation: 'Deux angles autour d’un point font 152° et x. M. Bowen écrit : x = 180° − 152° = 28°. Explique son erreur, et trouve x.',
      suggestedWords: [['full turn', 'all the way round'], ['because'], ['subtract', 'take away']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the mistake: he used 180°, but the angles are around a point, not on a straight line.',
        '1 mark for the fact: angles around a point add up to 360° (a full turn).',
        '1 mark for the answer: x = 360° − 152° = 208°.',
      ],
      modelAnswer: 'Mr Bowen used 180°, but 180° is for angles on a straight line. These angles go all the way round a point, and angles around a point add up to 360°, because it is a full turn. So x = 360° − 152° = 208°.',
    },
    {
      id: 'sq3',
      question: 'Explain why the four angles of any quadrilateral add up to 360°, even a very strange one.',
      frTranslation: 'Explique pourquoi les quatre angles de n’importe quel quadrilatère font 360° en tout, même s’il est très bizarre.',
      suggestedWords: [['triangle', 'triangles'], ['corner', 'corners'], ['add up to']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for a method that works for any quadrilateral: a straight line from one corner to the opposite corner cuts it into two triangles (or: tear off the four corners and put the points together).',
        '1 mark for the reason: the angles of each triangle add up to 180° (or: the four corners meet round one point).',
        '1 mark for the total: 180° + 180° = 360° (or: angles around a point make a full turn, 360°).',
      ],
      modelAnswer: 'Draw a straight line from one corner to the opposite corner. It cuts the quadrilateral into two triangles. The angles in each triangle add up to 180°, and together the two triangles make the four angles of the quadrilateral. So the angles add up to 180° + 180° = 360°. This works for any quadrilateral, because any one of them can be cut into two triangles.',
    },
    {
      id: 'sq4',
      question: 'Two quadrilaterals have eight angles in total. Could the eight angles be 40°, 55°, 70°, 85°, 100°, 115°, 130° and 145°? Explain your answer.',
      frTranslation: 'Deux quadrilatères ont huit angles en tout. Les huit angles pourraient-ils être 40°, 55°, 70°, 85°, 100°, 115°, 130° et 145° ? Explique ta réponse.',
      suggestedWords: [['sum', 'total'], ['quadrilateral', 'quadrilaterals']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the total two quadrilaterals need: 2 × 360° = 720°.',
        '1 mark for adding the eight angles: they add up to 740°.',
        '1 mark for the conclusion: 740° is not 720°, so they cannot be the angles of two quadrilaterals.',
      ],
      modelAnswer: 'The angles of one quadrilateral add up to 360°, so the eight angles of two quadrilaterals must add up to 2 × 360° = 720°. The sum of these eight angles is 40 + 55 + 70 + 85 + 100 + 115 + 130 + 145 = 740°. 740° is not 720°, so they cannot be the angles of two quadrilaterals.',
    },
  ],

  // Find It, Say Why (ANGLE_SUM): the item states the diagram only;
  // utils/angleSum.js derives every stage, answer, reason and named slip, and
  // utils/angleSumCheck.js proves each item in `npm run validate`. Levels 1–2
  // are walked stage by stage; from level 3 the angle and its reason are given
  // straight away and a wrong answer opens the stages where it went wrong.
  // Numbers are fresh: not the deck's, the quiz's, the Short Answers' or the
  // Workbook's. Answers, for the reviewer:
  //   L1  a = 52 · b = 79
  //   L2  c = 115 · d = 75 (a small square) · e = 214 (a reflex answer)
  //   L3  f = 68 · g = 83 (a small square) · h = 48 (the garden, the cat)
  //   L4  k = 78 (three the same) · n = 70 (two the same)
  //   L5  67° + 111° = 178°: not straight · 49° + 86° + 45° = 180°: straight
  //   L6  x = 73 then y = 107 · v = 116 then u = 60 (64° is outside) ·
  //       parallelogram q = 58 then p = r = 122
  angleSum: {
    title: 'Find It, Say Why',
    titleFr: 'Trouve-le, justifie',
    intro: 'Find each letter, then say why. Levels 1 and 2 go step by step. From level 3 you answer straight away, and a wrong answer opens the steps.',
    introFr: 'Trouve chaque lettre, puis dis pourquoi. Les niveaux 1 et 2 vont étape par étape. À partir du niveau 3, tu réponds directement, et une réponse fausse ouvre les étapes.',
    levels: {
      1: { en: 'On a straight line', fr: 'Sur une ligne droite' },
      2: { en: 'Round a point', fr: 'Autour d’un point' },
      3: { en: 'In a quadrilateral', fr: 'Dans un quadrilatère' },
      4: { en: 'The same size', fr: 'La même taille' },
      5: { en: 'Is it straight?', fr: 'Est-ce droit ?' },
      6: { en: 'Two steps', fr: 'Deux étapes' },
    },
    items: [
      { id: 'l1', level: 1, kind: 'line', angles: [128, 'a'] },
      { id: 'l2', level: 1, kind: 'line', angles: [44, 'b', 57] },
      { id: 'p1', level: 2, kind: 'point', angles: [105, 'c', 140] },
      { id: 'p2', level: 2, kind: 'point', angles: ['R', 115, 'd', 80] },
      { id: 'p3', level: 2, kind: 'point', angles: [146, 'e'] },
      { id: 'q1', level: 3, kind: 'quad', angles: [72, 'f', 124, 96] },
      { id: 'q2', level: 3, kind: 'quad', angles: ['R', 'g', 112, 75] },
      {
        id: 'q3', level: 3, kind: 'quad', angles: ['R', 104, 'h', 118],
        context: 'Mr Bowen’s garden has four straight sides. One corner is a right angle. Two corners are 104° and 118°. His cat sleeps in the fourth corner, h. What size is the cat’s corner?',
        contextFr: 'Le jardin de M. Bowen a quatre côtés droits. Un coin est un angle droit (right angle). Deux coins font 104° et 118°. Son chat dort dans le quatrième coin, h. Quelle est la taille du coin du chat ?',
      },
      { id: 's1', level: 4, kind: 'quad', angles: [126, 'k', 'k', 'k'] },
      { id: 's2', level: 4, kind: 'quad', angles: [100, 'n', 120, 'n'] },
      { id: 't1', level: 5, kind: 'straight', angles: [67, 111] },
      { id: 't2', level: 5, kind: 'straight', angles: [49, 86, 45] },
      { id: 'c1', level: 6, kind: 'quad', angles: [95, 110, 'x', 82], ext: { at: 2, angle: 'y' } },
      { id: 'c2', level: 6, kind: 'quad', angles: [100, 'v', 'u', 84], ext: { at: 1, angle: 64 } },
      { id: 'c3', level: 6, kind: 'para', angles: [58, 'p', 'q', 'r'] },
    ],
  },

  notes: notes,
  assessment: assessment,
  games: games,
};
