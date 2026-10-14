// src/data/Y7_MATH/U01_1/drill.js
// The Number Gym drill for 1.1. Operands only — NumberDrill.jsx derives every
// carry and borrow (see utils/columnArithmetic.js).
//
// column-add-sub is this unit's arithmetic floor: regrouping (carrying and
// borrowing) is exactly the skill the number line hides — the line shows the
// direction, but the digits still have to be carried and borrowed. Items are
// [a, b, op]; subtraction always has the larger number first. A rung unlocks
// only when the one above is clear.

export const drill = {
  mode: 'column-add-sub',
  title: 'Column Add & Subtract', titleVn: 'Cộng & Trừ theo cột', titleFr: 'Calcul posé (+ et −)',
  intro: 'Fill in one box at a time. The grid checks each digit, and the small box is the carry (for +) or the borrow (for −).',
  introVn: 'Điền từng ô một. Lưới kiểm tra từng chữ số, và ô nhỏ là số nhớ (với +) hoặc số mượn (với −).',
  introFr: 'Remplis une case à la fois. La grille vérifie chaque chiffre, et la petite case est la retenue (pour +) ou l’emprunt (pour −).',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', levelFr: 'Échauffement', items: [[24, 13, '+'], [46, 32, '-'], [35, 24, '+']] },
    { level: 'Regroup', levelVn: 'Có nhớ / mượn', levelFr: 'Retenues', items: [[47, 28, '+'], [63, 45, '-'], [72, 59, '-']] },
    { level: 'Stretch', levelVn: 'Nâng cao', levelFr: 'Défi', items: [[268, 47, '+'], [402, 158, '-']] },
  ],
};
