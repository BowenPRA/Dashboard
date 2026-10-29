// src/data/Y7_MATH/U05_1/assessment.js
// Eight questions, one sitting, ten minutes, mixed and unlabelled: no question
// says which fact to use. 1 "sum" in use, 2 a quadrilateral with a small
// square, 3 three angles on a straight line, 4 a reflex angle round a point,
// 5 equal angles round a point, 6 a parallelogram, 7 two steps (a side drawn
// on), 8 a word problem (a square and three equilateral triangles round a point).
// Every distractor is a named slip from the deck and Find It, Say Why: the
// small square left out, 180° for a point, 360° for a line, the sum written as
// the answer, not shared, next-door angles taken as equal, the angle outside
// the shape added in. Angles are plain text; there is no other maths, so no
// $$…$$. Questions and options in English, like the test; explanations in
// English and French. No item copies a deck check, a task item or the Workbook.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_sum',
      type: 'mcq',
      title: '1. Three angles have a sum of 180°. Two of them are 70° and 45°. What is the third angle?',
      options: [
        { val: 'A', text: 'A. 115°' },
        { val: 'B', text: 'B. 65°' },
        { val: 'C', text: 'C. 245°' },
        { val: 'D', text: 'D. 180°' },
      ],
      correct: 'B',
      expEn: 'A sum is a total: the three angles add up to 180°. Add the two you know, 70° + 45° = 115°, and take it away: 180° − 115° = 65°. A is the two angles added — only step 1. C takes them away from 360°. D reads “a sum of 180°” as “one angle is 180°”.',
      expFr: 'Une somme (sum) est un total : les trois angles font 180° en tout. Additionne les deux connus, 70° + 45° = 115°, et enlève-les : 180° − 115° = 65°. A, c’est les deux angles additionnés — seulement l’étape 1. C les enlève de 360°. D lit « a sum of 180° » comme « un angle fait 180° ».',
    },
    {
      id: 'a2_square',
      type: 'mcq',
      title: '2. Work out the size of angle t.',
      inlineSvg: DIAGRAMS.QZ_QUAD,
      options: [
        { val: 'A', text: 'A. 175°' },
        { val: 'B', text: 'B. 275°' },
        { val: 'C', text: 'C. 165°' },
        { val: 'D', text: 'D. 85°' },
      ],
      correct: 'D',
      expEn: 'A quadrilateral’s angles add up to 360°, and the small square is an angle too: 90°. 90° + 105° + 80° = 275°, so t = 360° − 275° = 85°. A leaves out the small square. B is the angles you know, added, but not taken away. C leaves out the 80°.',
      expFr: 'Les angles d’un quadrilatère font 360° en tout, et le petit carré est aussi un angle : 90°. 90° + 105° + 80° = 275°, donc t = 360° − 275° = 85°. A oublie le petit carré. B, c’est le total des angles connus, sans l’enlever. C oublie les 80°.',
    },
    {
      id: 'a3_line',
      type: 'mcq',
      title: '3. AB is a straight line. Work out the size of angle m.',
      inlineSvg: DIAGRAMS.QZ_LINE,
      options: [
        { val: 'A', text: 'A. 76°' },
        { val: 'B', text: 'B. 256°' },
        { val: 'C', text: 'C. 104°' },
        { val: 'D', text: 'D. 142°' },
      ],
      correct: 'A',
      expEn: 'Angles on a straight line add up to 180°. 38° + 66° = 104°, so m = 180° − 104° = 76°. B uses 360°, but the angles are on one side of a straight line. C stops after adding. D takes away only the 38°.',
      expFr: 'Les angles sur une ligne droite font 180° en tout. 38° + 66° = 104°, donc m = 180° − 104° = 76°. B utilise 360°, mais les angles sont d’un seul côté d’une ligne droite. C s’arrête après l’addition. D n’enlève que les 38°.',
    },
    {
      id: 'a4_reflex',
      type: 'mcq',
      title: '4. Two angles round a point are 125° and w. Work out w.',
      inlineSvg: DIAGRAMS.QZ_POINT,
      options: [
        { val: 'A', text: 'A. 55°' },
        { val: 'B', text: 'B. 125°' },
        { val: 'C', text: 'C. 235°' },
        { val: 'D', text: 'D. 485°' },
      ],
      correct: 'C',
      expEn: 'Angles around a point add up to 360°: w = 360° − 125° = 235°. An angle can be bigger than 180° — this one goes the long way round. A uses 180°, which is for a straight line. B guesses that the two angles are the same. D adds instead of taking away.',
      expFr: 'Les angles autour d’un point font 360° en tout : w = 360° − 125° = 235°. Un angle peut dépasser 180° — celui-ci fait le grand tour. A utilise 180°, qui est pour une ligne droite. B suppose que les deux angles sont égaux. D additionne au lieu d’enlever.',
    },
    {
      id: 'a5_equal',
      type: 'mcq',
      title: '5. Five angles meet round a point. One is 120°. The other four are all the same size. How big is each of the four?',
      options: [
        { val: 'A', text: 'A. 72°' },
        { val: 'B', text: 'B. 60°' },
        { val: 'C', text: 'C. 240°' },
        { val: 'D', text: 'D. 15°' },
      ],
      correct: 'B',
      expEn: 'Take away the angle you know: 360° − 120° = 240°. Four equal angles share what is left: 240° ÷ 4 = 60° each. A shares 360° between all five — but the 120° is not the same size as the others. C forgets to share. D uses 180°: (180° − 120°) ÷ 4.',
      expFr: 'Enlève l’angle connu : 360° − 120° = 240°. Quatre angles égaux se partagent ce qui reste : 240° ÷ 4 = 60° chacun. A partage 360° entre les cinq — mais les 120° n’ont pas la même taille que les autres. C oublie de partager. D utilise 180° : (180° − 120°) ÷ 4.',
    },
    {
      id: 'a6_para',
      type: 'mcq',
      title: '6. One angle of a parallelogram is 74°. What are the other three angles?',
      options: [
        { val: 'A', text: 'A. 74°, 106° and 106°' },
        { val: 'B', text: 'B. 74°, 74° and 138°' },
        { val: 'C', text: 'C. 74°, 143° and 143°' },
        { val: 'D', text: 'D. 74°, 53° and 53°' },
      ],
      correct: 'A',
      expEn: 'Opposite angles in a parallelogram are equal, so the angle opposite is 74°. That leaves 360° − 74° − 74° = 212° for the other two, which are opposite each other: 212° ÷ 2 = 106° each. B makes a next-door angle equal too — it is opposite angles that are equal. C takes away only one 74°. D uses 180° instead of 360°.',
      expFr: 'Dans un parallélogramme, les angles opposés sont égaux, donc l’angle opposé fait 74°. Il reste 360° − 74° − 74° = 212° pour les deux autres, qui sont opposés : 212° ÷ 2 = 106° chacun. B rend aussi un angle voisin égal — ce sont les angles opposés qui sont égaux. C n’enlève qu’un seul 74°. D utilise 180° au lieu de 360°.',
    },
    {
      id: 'a7_two_steps',
      type: 'mcq',
      title: '7. The bottom side of the quadrilateral is drawn on as a straight line. Work out the size of angle z.',
      inlineSvg: DIAGRAMS.QZ_EXT,
      options: [
        { val: 'A', text: 'A. 113°' },
        { val: 'B', text: 'B. 183°' },
        { val: 'C', text: 'C. 290°' },
        { val: 'D', text: 'D. 73°' },
      ],
      correct: 'D',
      expEn: 'Two steps. First the corner next to the 70°: it is on the straight line with it, so it is 180° − 70° = 110°. Then the quadrilateral: 92° + 110° + 85° = 287°, so z = 360° − 287° = 73°. A puts the 70° in as a corner, but it is outside the shape. B leaves that corner out. C is 360° − 70°.',
      expFr: 'Deux étapes. D’abord le coin à côté des 70° : il est sur la ligne droite avec lui, donc il fait 180° − 70° = 110°. Puis le quadrilatère : 92° + 110° + 85° = 287°, donc z = 360° − 287° = 73°. A prend les 70° comme un coin, mais ils sont à l’extérieur de la figure. B oublie ce coin. C, c’est 360° − 70°.',
    },
    {
      id: 'a8_tiles',
      type: 'mcq',
      title: '8. Mr Bowen tiles his kitchen floor. At one point, one square tile and three tiles shaped like equilateral triangles meet. Every angle of an equilateral triangle is 60°. What angle is left at that point?',
      options: [
        { val: 'A', text: 'A. 270°' },
        { val: 'B', text: 'B. 150°' },
        { val: 'C', text: 'C. 90°' },
        { val: 'D', text: 'D. 180°' },
      ],
      correct: 'C',
      expEn: 'The corners meet round a point: 360°. The square gives 90° and the three triangles give 3 × 60° = 180°, so 90° + 180° = 270°, and 360° − 270° = 90° is left — just right for another square tile. A stops after adding. B counts only two triangles. D forgets the square.',
      expFr: 'Les coins se rejoignent autour d’un point : 360°. Le carré donne 90° et les trois triangles donnent 3 × 60° = 180°, donc 90° + 180° = 270°, et il reste 360° − 270° = 90° — juste ce qu’il faut pour un autre carreau carré. A s’arrête après l’addition. B ne compte que deux triangles. D oublie le carré.',
    },
  ],
};
