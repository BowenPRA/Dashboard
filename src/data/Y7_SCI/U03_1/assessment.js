// src/data/Y7_SCI/U03_1/assessment.js
// Eight questions, one sitting, ten minutes. 1 the key word gravity, 2 mass on
// the scales, 3 gravity at the South Pole, 4 the contact force, 5 W = m × 10,
// 6 a mass from a weight on the Moon, 7 mass does not change on Mars,
// 8 a parachute and air resistance (transfer: the deck dropped paper, not a
// skydiver). Every distractor is a misconception the deck names: weight in
// kilograms, gravity pulls "down the page", a floor does not push, mass changes
// on another planet, gravity stops without air. No item copies a deck check,
// the Workbook or Weigh It.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_gravity',
      type: 'mcq',
      title: '1. A force pulls the Moon and the Earth towards each other. What is this force called?',
      options: [
        { val: 'A', text: 'A. Contact force' },
        { val: 'B', text: 'B. Air resistance' },
        { val: 'C', text: 'C. Gravity' },
        { val: 'D', text: 'D. Mass' },
      ],
      correct: 'C',
      expEn: 'A force that pulls objects towards each other is **gravity**. A contact force is a push from a surface that touches the object (A); air resistance is the push of the air (B); and mass is the amount of matter, not a force (D).',
      expFr: 'Une force qui attire les objets les uns vers les autres, c’est la **gravité**. Une force de contact est la poussée d’une surface qui touche l’objet (A) ; la résistance de l’air est la poussée de l’air (B) ; et la masse est une quantité de matière, pas une force (D).',
    },
    {
      id: 'a2_scales',
      type: 'mcq',
      title: '2. Minh stands on bathroom scales. They show 38. Which sentence is right in science?',
      options: [
        { val: 'A', text: 'A. Minh’s weight is 38 kg.' },
        { val: 'B', text: 'B. Minh’s mass is 38 kg.' },
        { val: 'C', text: 'C. Minh’s mass is 38 N.' },
        { val: 'D', text: 'D. Minh’s weight is 38 N.' },
      ],
      correct: 'B',
      expEn: 'Scales show **mass**, in **kilograms**: Minh’s mass is 38 kg. His weight is a force, in newtons — about 380 N, not 38 kg (A) and not 38 N (D). Mass is never in newtons (C).',
      expFr: 'Un pèse-personne affiche la **masse**, en **kilogrammes** : la masse de Minh est de 38 kg. Son poids est une force, en newtons — environ 380 N, pas 38 kg (A) ni 38 N (D). La masse n’est jamais en newtons (C).',
    },
    {
      id: 'a3_south_pole',
      type: 'mcq',
      title: '3. A scientist at the South Pole lets go of a pencil. Which way does the force of gravity pull it?',
      options: [
        { val: 'A', text: 'A. Towards the centre of the Earth' },
        { val: 'B', text: 'B. Away from the Earth, into space' },
        { val: 'C', text: 'C. Towards the North Pole' },
        { val: 'D', text: 'D. It does not pull — the pencil floats' },
      ],
      correct: 'A',
      expEn: 'Gravity acts **towards the centre of the Earth** everywhere, so the pencil falls to the ground at the scientist’s feet. It does not fly into space (B) or towards the North Pole (C) — "down" means towards the centre — and gravity never switches off (D).',
      expFr: 'La gravité agit **vers le centre de la Terre** partout, donc le crayon tombe par terre aux pieds de la scientifique. Il ne part pas dans l’espace (B) ni vers le pôle Nord (C) — « en bas » veut dire vers le centre — et la gravité ne s’arrête jamais (D).',
    },
    {
      id: 'a4_contact',
      type: 'mcq',
      title: '4. A television weighs 150 N. It stands still on a table. How big is the contact force from the table?',
      options: [
        { val: 'A', text: 'A. 15 N' },
        { val: 'B', text: 'B. 1500 N' },
        { val: 'C', text: 'C. 150 N' },
        { val: 'D', text: 'D. 0 N' },
      ],
      correct: 'C',
      expEn: 'Nothing moves, so the table pushes up exactly as hard as gravity pulls down: contact force = weight = **150 N**. 15 N (A) and 1500 N (B) wrongly use × 10 or ÷ 10 — the weight is already in newtons; with 0 N (D) the television would fall through the table.',
      expFr: 'Rien ne bouge, donc la table pousse vers le haut exactement aussi fort que la gravité tire vers le bas : force de contact = poids = **150 N**. 15 N (A) et 1500 N (B) utilisent × 10 ou ÷ 10 à tort — le poids est déjà en newtons ; avec 0 N (D), la télévision passerait à travers la table.',
    },
    {
      id: 'a5_dog',
      type: 'mcq',
      title: '5. A dog has a mass of 12 kg. What is its weight on Earth?',
      options: [
        { val: 'A', text: 'A. 1.2 N' },
        { val: 'B', text: 'B. 12 N' },
        { val: 'C', text: 'C. 120 kg' },
        { val: 'D', text: 'D. 120 N' },
      ],
      correct: 'D',
      expEn: '$W = m \\times 10 = 12 \\times 10 = 120$ N. 1.2 N divides instead of multiplying (A); 12 N forgets the 10 (B); and a weight is in newtons, not kilograms (C).',
      expFr: '$W = m \\times 10 = 12 \\times 10 = 120$ N. 1.2 N divise au lieu de multiplier (A) ; 12 N oublie le 10 (B) ; et un poids s’exprime en newtons, pas en kilogrammes (C).',
    },
    {
      id: 'a6_moon_rock',
      type: 'mcq',
      title: '6. On the Moon, a rock weighs 16 N. The strength of gravity on the Moon is 1.6 N/kg. What is the mass of the rock?',
      options: [
        { val: 'A', text: 'A. 10 kg' },
        { val: 'B', text: 'B. 25.6 kg' },
        { val: 'C', text: 'C. 1.6 kg' },
        { val: 'D', text: 'D. 160 kg' },
      ],
      correct: 'A',
      expEn: 'Cover m: W over g is left, so divide. $m = 16 \\div 1.6 = 10$ kg. 25.6 multiplies (B); 1.6 kg uses the Earth’s 10 N/kg on the Moon (C); and 160 kg multiplies by 10 (D).',
      expFr: 'Cache m : il reste W au-dessus de g, donc on divise. $m = 16 \\div 1.6 = 10$ kg. 25.6 multiplie (B) ; 1.6 kg utilise les 10 N/kg de la Terre sur la Lune (C) ; et 160 kg multiplie par 10 (D).',
    },
    {
      id: 'a7_mars_robot',
      type: 'mcq',
      title: '7. A 30 kg robot is sent from the Earth to Mars, where gravity is weaker. Which is true on Mars?',
      options: [
        { val: 'A', text: 'A. Its mass is smaller, and its weight is the same.' },
        { val: 'B', text: 'B. Its mass is the same, and its weight is smaller.' },
        { val: 'C', text: 'C. Its mass and its weight are both smaller.' },
        { val: 'D', text: 'D. Its mass and its weight are both the same.' },
      ],
      correct: 'B',
      expEn: 'The robot has the same amount of matter on Mars, so its **mass stays 30 kg**. Gravity is weaker there, so its **weight is smaller** (30 × 3.7 = 111 N instead of 300 N). Mass never changes from planet to planet (A, C), and weight does (D).',
      expFr: 'Le robot a la même quantité de matière sur Mars, donc sa **masse reste de 30 kg**. La gravité y est plus faible, donc son **poids est plus petit** (30 × 3.7 = 111 N au lieu de 300 N). La masse ne change jamais d’une planète à l’autre (A, C), et le poids, si (D).',
    },
    {
      id: 'a8_parachute',
      type: 'mcq',
      title: '8. A skydiver jumps from a plane and speeds up as she falls. Then she opens her parachute and slows down. Why?',
      options: [
        { val: 'A', text: 'A. Opening the parachute makes her mass smaller.' },
        { val: 'B', text: 'B. Gravity stops pulling on her when the parachute opens.' },
        { val: 'C', text: 'C. The parachute makes her weight bigger.' },
        { val: 'D', text: 'D. The wide parachute catches the air, and air resistance pushes up on her.' },
      ],
      correct: 'D',
      expEn: 'Like the flat sheet of paper, the wide parachute catches a lot of air: **air resistance** pushes up and slows her. Her mass does not change (A); gravity still pulls her down — she keeps falling (B); and her weight is the same with or without the parachute (C).',
      expFr: 'Comme la feuille de papier à plat, le large parachute attrape beaucoup d’air : la **résistance de l’air** pousse vers le haut et la ralentit. Sa masse ne change pas (A) ; la gravité la tire toujours vers le bas — elle continue de tomber (B) ; et son poids est le même avec ou sans parachute (C).',
    },
  ],
};
