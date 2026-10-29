// src/data/Y7_MATH/U05_2/assessment.js
// Eight questions, one sitting, ten minutes. No maths markup is needed: the
// angles are plain text (Assessment renders maths only inside $$…$$). 1 the
// small square · 2 an X, answer and reason · 3 an F, answer and reason · 4
// which letter is alternate · 5 no arrows · 6 two steps (the same-side pair) ·
// 7 which two lines are parallel (angles in different places) · 8 a road
// across railway lines, in words. Every distractor is a diagnosis: the wrong
// pair, 180° − g for an equal pair, g for a 180° pair, "the lines look
// parallel", the printed numbers compared instead of the same place. No item
// copies a deck check, a short answer or an X, F or Z? item. The pictures are
// in diagrams.js (Q_…). English and French.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_square',
      type: 'mcq',
      title: '1. A small square is drawn where two lines meet. What does it tell you?',
      options: [
        { val: 'A', text: 'A. The lines are parallel.' },
        { val: 'B', text: 'B. The lines are perpendicular: they meet at 90°.' },
        { val: 'C', text: 'C. The angles are vertically opposite.' },
        { val: 'D', text: 'D. The lines never meet.' },
      ],
      correct: 'B',
      expEn: 'A small square marks a right angle, 90°, so the lines are perpendicular. Arrows (not a square) mark parallel lines, and parallel lines never meet, so they cannot have a square where they meet. Vertically opposite is about the angles across a crossing, not one 90° corner.',
      expFr: 'Un petit carré marque un angle droit, 90°, donc les droites sont perpendiculaires. Ce sont des flèches (pas un carré) qui marquent des droites parallèles, et des parallèles ne se coupent jamais, donc pas de carré là où elles se coupent. Opposés par le sommet parle des angles de part et d’autre d’un croisement, pas d’un coin de 90°.',
    },
    {
      id: 'a2_x',
      type: 'mcq',
      title: '2. Two straight lines cross. Find p, with its reason.',
      inlineSvg: DIAGRAMS.Q_X,
      options: [
        { val: 'A', text: 'A. p = 142° because angles on a straight line add up to 180°.' },
        { val: 'B', text: 'B. p = 38° because angles on a straight line add up to 180°.' },
        { val: 'C', text: 'C. p = 142° because they are vertically opposite angles.' },
        { val: 'D', text: 'D. p = 38° because they are vertically opposite angles.' },
      ],
      correct: 'D',
      expEn: 'p is across the crossing from the 38°: an X. Vertically opposite angles are equal, so p = 38°, and that is the reason. 142° is the angle next to the 38° on a straight line, not p. B has the right size with the wrong reason; C has the right reason with the wrong size.',
      expFr: 'p est de l’autre côté du croisement par rapport au 38° : un X. Des angles opposés par le sommet sont égaux, donc p = 38°, et c’est la raison. 142° est l’angle à côté du 38° sur une ligne droite, pas p. B a la bonne taille avec la mauvaise raison ; C a la bonne raison avec la mauvaise taille.',
    },
    {
      id: 'a3_f',
      type: 'mcq',
      title: '3. The arrows show the two lines are parallel. Find q, with its reason.',
      inlineSvg: DIAGRAMS.Q_F,
      options: [
        { val: 'A', text: 'A. q = 72° because they are corresponding angles.' },
        { val: 'B', text: 'B. q = 72° because they are alternate angles.' },
        { val: 'C', text: 'C. q = 108° because they are corresponding angles.' },
        { val: 'D', text: 'D. q = 108° because angles on a straight line add up to 180°.' },
      ],
      correct: 'A',
      expEn: 'q and the 72° are in the same place at each crossing, under the line and on the right of the line across: an F. On parallel lines corresponding angles are equal, so q = 72°. They are not alternate: alternate angles are between the lines on opposite sides (a Z). 108° would be the angle next to q.',
      expFr: 'q et le 72° sont à la même place à chaque croisement, sous la droite et à droite de la sécante : un F. Sur des parallèles, des angles correspondants sont égaux, donc q = 72°. Ils ne sont pas alternes-internes : ceux-là sont entre les droites, de part et d’autre (un Z). 108° serait l’angle à côté de q.',
    },
    {
      id: 'a4_z',
      type: 'mcq',
      title: '4. The two lines are parallel. Which angle is alternate to the 47°?',
      inlineSvg: DIAGRAMS.Q_Z,
      options: [
        { val: 'A', text: 'A. p' },
        { val: 'B', text: 'B. q' },
        { val: 'C', text: 'C. r' },
        { val: 'D', text: 'D. s' },
      ],
      correct: 'C',
      expEn: 'The 47° is between the lines, on the left of the line across. Its alternate angle is between the lines on the other side, the right: r. The two make a Z, and r is 47° too. p is between the lines on the same side as the 47°, so p and the 47° make 180°. s is in the same place as the 47° at the bottom crossing (corresponding), and q is next to r.',
      expFr: 'Le 47° est entre les droites, à gauche de la sécante. Son angle alterne-interne est entre les droites, de l’autre côté, à droite : r. Les deux forment un Z, et r fait aussi 47°. p est entre les droites du même côté que le 47°, donc p et le 47° font 180°. s est à la même place que le 47° au croisement du bas (correspondant), et q est à côté de r.',
    },
    {
      id: 'a5_noarrows',
      type: 'mcq',
      title: '5. Which statement is correct?',
      inlineSvg: DIAGRAMS.Q_NOARROWS,
      options: [
        { val: 'A', text: 'A. y = 108° because they are corresponding angles.' },
        { val: 'B', text: 'B. y = 72° because angles on a straight line add up to 180°.' },
        { val: 'C', text: 'C. y = 108° because the lines look parallel.' },
        { val: 'D', text: 'D. You need more information: there are no arrows.' },
      ],
      correct: 'D',
      expEn: 'There are no arrows, so you do not know the lines are parallel. y and the 108° are in the same place (an F), but an F only works on parallel lines. Looking parallel is not enough: diagrams are not drawn accurately. B uses a straight line, but y and the 108° are at different crossings.',
      expFr: 'Il n’y a pas de flèches, donc on ne sait pas si les droites sont parallèles. y et le 108° sont à la même place (un F), mais un F ne marche que sur des parallèles. Avoir l’air parallèle ne suffit pas : les dessins ne sont pas exacts. B utilise une ligne droite, mais y et le 108° sont à des croisements différents.',
    },
    {
      id: 'a6_side',
      type: 'mcq',
      title: '6. The two lines are parallel. Find t. (You need two steps.)',
      inlineSvg: DIAGRAMS.Q_SIDE,
      options: [
        { val: 'A', text: 'A. 64°' },
        { val: 'B', text: 'B. 116°' },
        { val: 'C', text: 'C. 26°' },
        { val: 'D', text: 'D. 296°' },
      ],
      correct: 'B',
      expEn: 'Step 1: the angle in the same place as the 64° at the bottom crossing is 64° (corresponding angles). Step 2: t is next to it on a straight line, so t = 180° − 64° = 116°. t and the 64° are between the lines on the same side, so they are not equal (A): together they make 180°. 26° is 90° − 64° and 296° is 360° − 64°.',
      expFr: 'Étape 1 : l’angle à la même place que le 64°, au croisement du bas, fait 64° (angles correspondants). Étape 2 : t est à côté, sur une ligne droite, donc t = 180° − 64° = 116°. t et le 64° sont entre les droites du même côté, donc ils ne sont pas égaux (A) : ensemble, ils font 180°. 26°, c’est 90° − 64°, et 296°, c’est 360° − 64°.',
    },
    {
      id: 'a7_three',
      type: 'mcq',
      title: '7. One line crosses the lines A, B and C. Which two of them are parallel?',
      inlineSvg: DIAGRAMS.Q_THREE,
      options: [
        { val: 'A', text: 'A. A and C' },
        { val: 'B', text: 'B. A and B' },
        { val: 'C', text: 'C. B and C' },
        { val: 'D', text: 'D. None of them' },
      ],
      correct: 'A',
      expEn: 'Move each angle to the same place before you compare: under the line, on the right of the line across. A: 103°. B: its 106° is across the crossing from that place (vertically opposite), so 106°. C: its 77° is next to that place on a straight line, so 180° − 77° = 103°. A and C are both 103°: equal corresponding angles, so A and C are parallel. B is 106°, so it is not. The printed numbers 103° and 106° look closest, but they are not in the same place.',
      expFr: 'Ramène chaque angle à la même place avant de comparer : sous la droite, à droite de la sécante. A : 103°. B : son 106° est en face de cette place (opposés par le sommet), donc 106°. C : son 77° est à côté de cette place, sur une ligne droite, donc 180° − 77° = 103°. A et C font tous les deux 103° : des angles correspondants égaux, donc A et C sont parallèles. B fait 106°, donc non. Les nombres 103° et 106° ont l’air proches, mais ils ne sont pas à la même place.',
    },
    {
      id: 'a8_road',
      type: 'mcq',
      title: '8. A road crosses two parallel railway lines. The road makes an angle of 62° with the first rail. What angle does it make with the second rail, in the same place?',
      options: [
        { val: 'A', text: 'A. 124°' },
        { val: 'B', text: 'B. 118°' },
        { val: 'C', text: 'C. 62°' },
        { val: 'D', text: 'D. 28°' },
      ],
      correct: 'C',
      expEn: 'The rails are parallel and the road crosses both, so the angle in the same place at the second rail is a corresponding angle: 62°. 118° is 180° − 62°, the angle next to it on a straight line. 124° doubles the 62°, and 28° is 90° − 62°.',
      expFr: 'Les rails sont parallèles et la route les coupe tous les deux, donc l’angle à la même place au deuxième rail est un angle correspondant : 62°. 118°, c’est 180° − 62°, l’angle à côté sur une ligne droite. 124° double le 62°, et 28°, c’est 90° − 62°.',
    },
  ],
};
