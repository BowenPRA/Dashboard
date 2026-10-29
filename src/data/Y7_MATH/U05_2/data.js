// src/data/Y7_MATH/U05_2/data.js
// 5.2 Intersecting lines — self-study unit (plan: docs/y7-math/plans/U05_2.md).
// 120 XP on offer, capped at 100 by unitXPOf. Gates: 20 of 35 (57%) and 80 of
// 100 (80%), the same rule as 5.1 and 5.3. One flagship task, X, F or Z?
// (ANGLE_PAIR, p82): see the pair, name it, find the angle, say why.
//
// English and French only (meta.vietnamese: false), like the classroom deck
// (classroom/content/y7-math/U05_2). Every learner-facing string has a `…Fr` /
// `fr…` twin and no Vietnamese one. The reasons stay in English, as the class
// writes them; the French sits beside them.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { anglePairs } from './anglePairs.js';

export const U05_2_DATA = {
  meta: {
    id: 'U05_2',
    title: 'Intersecting Lines',
    desc: 'Find vertically opposite angles where two lines cross; say what parallel and perpendicular lines are; use corresponding (F) and alternate (Z) angles where a line crosses two parallel lines, and only then; and give every answer with its reason.',
    track: 'Y7_MATH',
    icon: 'Hash',
    vietnamese: false,
    classroom: [{ course: 'y7-math', slug: 'U05_2', title: 'Maths 5.2 · Intersecting Lines' }],
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
        { id: 'ANGLE_PAIR', dbKey: 'p82', maxXP: 45 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
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

  // Key words: the words every 5.2 question is written in. The sentences use
  // their own numbers, so none gives away a deck, task or quiz item.
  realWords: [
    {
      word: 'Intersecting', fr: 'Sécantes',
      def: 'Crossing each other. Intersecting lines meet at one point.',
      frDef: 'Qui se croisent. Des droites sécantes (intersecting) se coupent en un point.',
      sent: 'Two intersecting lines make four angles.',
      frSent: 'Deux droites sécantes font quatre angles.',
      isReal: true,
    },
    {
      word: 'Vertically opposite', fr: 'Opposés par le sommet',
      def: 'Across from each other where two lines cross. Vertically opposite angles are equal.',
      frDef: 'L’un en face de l’autre, là où deux droites se croisent. Des angles opposés par le sommet (vertically opposite) sont égaux.',
      sent: 'The angle vertically opposite 50° is also 50°.',
      frSent: 'L’angle opposé par le sommet à 50° fait aussi 50°.',
      isReal: true,
    },
    {
      word: 'Perpendicular', fr: 'Perpendiculaire',
      def: 'Meeting at a right angle, 90°. A small square marks it.',
      frDef: 'Qui se coupent à angle droit, 90°. Un petit carré le marque.',
      sent: 'The walls of a room are perpendicular to the floor.',
      frSent: 'Les murs d’une pièce sont perpendiculaires (perpendicular) au sol.',
      isReal: true,
    },
    {
      word: 'Parallel', fr: 'Parallèle',
      def: 'Always the same distance apart, so they never meet. Matching arrows mark them.',
      frDef: 'Toujours à la même distance, donc elles ne se coupent jamais. Des flèches pareilles les marquent.',
      sent: 'The lines on a page of your notebook are parallel.',
      frSent: 'Les lignes d’une page de ton cahier sont parallèles (parallel).',
      isReal: true,
    },
    {
      word: 'Corresponding', fr: 'Correspondant',
      def: 'In the same place at each crossing, where a line crosses two lines. On parallel lines they are equal: an F.',
      frDef: 'À la même place à chaque croisement, quand une droite coupe deux droites. Sur des parallèles, ils sont égaux : un F.',
      sent: 'The angle in the same place at the next crossing is its corresponding angle.',
      frSent: 'L’angle à la même place au croisement suivant est son angle correspondant (corresponding).',
      isReal: true,
    },
    {
      word: 'Alternate', fr: 'Alterne-interne',
      def: 'Between the two lines, on opposite sides of the line across. On parallel lines they are equal: a Z.',
      frDef: 'Entre les deux droites, de part et d’autre de la sécante. Sur des parallèles, ils sont égaux : un Z.',
      sent: 'Alternate angles make the shape of a Z.',
      frSent: 'Des angles alternes-internes (alternate) forment un Z.',
      isReal: true,
    },
    {
      word: 'Give a reason', fr: 'Donne une raison',
      def: 'Say the fact you used. Write it after the word because.',
      frDef: 'Dis la propriété que tu as utilisée. Écris-la après le mot because (parce que).',
      sent: 'Give a reason: write the angle fact after because.',
      frSent: 'Give a reason (donne une raison) : écris la propriété après because.',
      isReal: true,
    },
  ],

  // Short Answers: three questions where explaining IS the skill — the
  // Workbook's "Give a reason" and "Explain why", in the student's own English.
  // One mark per scheme line; prompts plain text; French in `frTranslation`.
  shortQA: [
    {
      id: 'sq1',
      question: 'Two straight lines cross. One angle is 64°. Lan says the angle opposite it is 116°, "because angles on a straight line add up to 180°". Explain her mistake. Then give the right size, with its reason.',
      frTranslation: 'Deux droites se croisent. Un angle fait 64°. Lan dit que l’angle en face fait 116°, « because angles on a straight line add up to 180° ». Explique son erreur. Puis donne la bonne taille, avec sa raison.',
      suggestedWords: [['vertex', 'crossing'], ['straight line'], ['because']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for the mistake: the angle opposite the 64° is across the crossing from it, not next to it on a straight line (116° is the size of the angle next to the 64°).',
        '1 mark for the size: the opposite angle is 64°, because vertically opposite angles are equal.',
        '1 mark for the reason written as a sentence with because, for example "it is 64° because they are vertically opposite angles".',
      ],
      modelAnswer: 'Lan used the wrong fact. The angle opposite the 64° is across the crossing from it, so the two angles are vertically opposite, not on a straight line. 116° is the angle next to the 64°. The opposite angle is 64° because they are vertically opposite angles.',
    },
    {
      id: 'sq2',
      question: 'A line crosses two parallel lines. One angle at the top crossing is 70°. Explain, in two steps, why its alternate angle at the bottom crossing is also 70°. Use corresponding angles first, then vertically opposite angles.',
      frTranslation: 'Une droite coupe deux droites parallèles. Un angle au croisement du haut fait 70°. Explique, en deux étapes, pourquoi son angle alterne-interne au croisement du bas fait aussi 70°. Utilise d’abord les angles correspondants, puis les angles opposés par le sommet.',
      suggestedWords: [['crossing'], ['parallel'], ['first', 'then']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for step 1: the angle in the same place at the bottom crossing is 70°, because corresponding angles on parallel lines are equal (an F).',
        '1 mark for step 2: the alternate angle is across the bottom crossing from that angle, so it is 70° too, because vertically opposite angles are equal (an X).',
        '1 mark for the conclusion: so the two angles in the Z are equal, both 70° (alternate angles are equal when the lines are parallel).',
      ],
      modelAnswer: 'First, the angle in the same place at the bottom crossing is 70°, because corresponding angles on parallel lines are equal. That angle and the alternate angle are across from each other at the bottom crossing, so they are vertically opposite, and the alternate angle is 70° too. So the two angles in the Z are both 70°: alternate angles are equal when the lines are parallel.',
    },
    {
      id: 'sq3',
      question: 'Mr Bowen’s fence has three rails, A, B and C, and one post. He measures the angle where each rail meets the post, in the same place each time: A is 78°, B is 78° and C is 74°. Which rail is not parallel to the other two? Explain why.',
      frTranslation: 'La clôture de M. Bowen a trois barres, A, B et C, et un poteau. Il mesure l’angle entre chaque barre et le poteau, à la même place à chaque fois : A fait 78°, B fait 78° et C fait 74°. Quelle barre n’est pas parallèle aux deux autres ? Explique pourquoi.',
      suggestedWords: [['post'], ['same place'], ['because']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark for naming rail C.',
        '1 mark for saying the three angles are corresponding angles (they are in the same place where each rail meets the post).',
        '1 mark for the reason: corresponding angles are equal only when the lines are parallel; A and B are both 78°, so they are parallel, but C is 74°, so C is not parallel to them.',
      ],
      modelAnswer: 'Rail C is not parallel to the other two. The three angles are in the same place where each rail meets the post, so they are corresponding angles. Corresponding angles are equal only when the lines are parallel. A and B are both 78°, so A and B are parallel, but C is 74°, so C is not parallel to them.',
    },
  ],

  // X, F or Z? (ANGLE_PAIR): the items, in anglePairs.js.
  anglePairs: anglePairs,

  notes: notes,
  assessment: assessment,
  games: games,
};
