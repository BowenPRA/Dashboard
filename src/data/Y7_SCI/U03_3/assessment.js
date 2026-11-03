// src/data/Y7_SCI/U03_3/assessment.js
// Eight questions, one sitting, ten minutes. 1 the direction of the pull,
// 2 no pull → a straight line, 3 comets and asteroids (the book's Q2), 4 a new
// table, Uranus's moons, read backwards (transfer), 5 why the close planets
// are faster, 6 bar or line graph (the Activity's Q4), 7 the forces on the
// Moon (transfer), 8 Le Verrier's calculation was a prediction.
// Every distractor is a misconception the unit names: the outward fling,
// gravity pushes it round, bigger is slower, no gravity in space, air in
// space. No item copies a deck check, an Orbit Lab item or the Questions.
// Correct letters: C A D B A D C B.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_direction',
      type: 'mcq',
      title: '1. A planet orbits the Sun. In which direction does the Sun’s gravity pull the planet?',
      options: [
        { val: 'A', text: 'A. The way the planet is moving' },
        { val: 'B', text: 'B. Away from the Sun' },
        { val: 'C', text: 'C. Towards the Sun' },
        { val: 'D', text: 'D. Backwards along its orbit' },
      ],
      correct: 'C',
      expEn: 'Gravity pulls **towards the Sun**, wherever the planet is on its orbit. It does not push the planet round (A) or back (D), and nothing pulls it away from the Sun (B).',
      expFr: 'La gravité tire **vers le Soleil**, où que soit la planète sur son orbite. Elle ne pousse pas la planète en avant (A) ni en arrière (D), et rien ne la tire loin du Soleil (B).',
    },
    {
      id: 'a2_no_gravity',
      type: 'mcq',
      title: '2. A moon orbits a planet. Suddenly, the planet’s gravity stops. What happens to the moon?',
      options: [
        { val: 'A', text: 'A. It moves off in a straight line, the way it was moving' },
        { val: 'B', text: 'B. It flies straight out, away from the planet' },
        { val: 'C', text: 'C. It keeps going round in a circle' },
        { val: 'D', text: 'D. It falls onto the planet' },
      ],
      correct: 'A',
      expEn: '**A straight line, the way it was moving**, like the ball when Mr Bowen lets go. Nothing throws it outwards (B); without a pull, nothing keeps turning it (C); and with no pull, it cannot fall in (D).',
      expFr: '**Une ligne droite, dans le sens où elle allait**, comme la balle quand M. Bowen lâche la ficelle. Rien ne la lance vers l’extérieur (B) ; sans attraction, rien ne la fait tourner (C) ; et sans attraction, elle ne peut pas tomber (D).',
    },
    {
      id: 'a3_comets',
      type: 'mcq',
      title: '3. Comets and asteroids also orbit the Sun. What keeps them in orbit?',
      options: [
        { val: 'A', text: 'A. Their engines' },
        { val: 'B', text: 'B. Air resistance in space' },
        { val: 'C', text: 'C. The Earth’s gravity' },
        { val: 'D', text: 'D. The Sun’s gravity' },
      ],
      correct: 'D',
      expEn: '**The Sun’s gravity** keeps everything that goes round the Sun in orbit: planets, comets and asteroids. Comets have no engines (A), space is a vacuum with no air (B), and the Earth is much too small and far away to hold them (C).',
      expFr: '**La gravité du Soleil** garde en orbite tout ce qui tourne autour du Soleil : planètes, comètes et astéroïdes. Les comètes n’ont pas de moteur (A), l’espace est un vide sans air (B), et la Terre est bien trop petite et trop loin pour les retenir (C).',
    },
    {
      id: 'a4_uranus_moons',
      type: 'mcq',
      title: '4. Five moons of Uranus and their speeds: Miranda 6.7 km/s, Ariel 5.5 km/s, Umbriel 4.7 km/s, Titania 3.6 km/s, Oberon 3.2 km/s. Which moon is furthest from Uranus?',
      options: [
        { val: 'A', text: 'A. Miranda' },
        { val: 'B', text: 'B. Oberon' },
        { val: 'C', text: 'C. Ariel' },
        { val: 'D', text: 'D. You cannot tell from speeds' },
      ],
      correct: 'B',
      expEn: '**Oberon**, the slowest. The further a moon is from Uranus, the weaker Uranus’s pull, and the slower it goes: the same pattern as the planets. Miranda is the fastest, so it is the closest (A). The pattern lets you tell (D).',
      expFr: '**Obéron**, la plus lente. Plus une lune est loin d’Uranus, plus l’attraction d’Uranus est faible, et plus elle va lentement : la même tendance que pour les planètes. Miranda est la plus rapide, donc la plus proche (A). La tendance permet de le savoir (D).',
    },
    {
      id: 'a5_why_faster',
      type: 'mcq',
      title: '5. Mercury moves faster than Neptune. Why?',
      options: [
        { val: 'A', text: 'A. Mercury is closer to the Sun, so the Sun’s pull on it is stronger' },
        { val: 'B', text: 'B. Mercury is hotter' },
        { val: 'C', text: 'C. There is more air resistance far from the Sun' },
        { val: 'D', text: 'D. Neptune is bigger, so it is slower' },
      ],
      correct: 'A',
      expEn: '**The Sun’s pull is stronger close to the Sun.** Heat does not move a planet (B), space is a vacuum all the way out (C), and size is not the reason: Jupiter is the biggest planet, and it is faster than Neptune (D).',
      expFr: '**L’attraction du Soleil est plus forte près du Soleil.** La chaleur ne fait pas bouger une planète (B), l’espace est un vide jusqu’au bout (C), et la taille n’est pas la raison : Jupiter est la plus grosse planète, et elle va plus vite que Neptune (D).',
    },
    {
      id: 'a6_bar_graph',
      type: 'mcq',
      title: '6. A student has a table of the speeds of the eight planets. Why should the student draw a bar graph, and not a line graph?',
      options: [
        { val: 'A', text: 'A. A bar graph is easier to draw' },
        { val: 'B', text: 'B. The speeds are too big for a line graph' },
        { val: 'C', text: 'C. A line graph needs more numbers' },
        { val: 'D', text: 'D. The planets are separate things: there is nothing between two planets to join with a line' },
      ],
      correct: 'D',
      expEn: '**The planets are separate things.** A line joins in-between values, like the temperature between two times; there is no planet halfway between Venus and the Earth. How easy it is (A), how big the numbers are (B) or how many there are (C) does not decide the type of graph.',
      expFr: '**Les planètes sont des choses séparées.** Une courbe relie des valeurs intermédiaires, comme la température entre deux heures ; il n’y a pas de planète à mi-chemin entre Vénus et la Terre. La facilité (A), la taille des nombres (B) ou leur nombre (C) ne décident pas du type de graphique.',
    },
    {
      id: 'a7_moon_forces',
      type: 'mcq',
      title: '7. Which forces act on the Moon as it orbits the Earth?',
      options: [
        { val: 'A', text: 'A. Gravity and air resistance' },
        { val: 'B', text: 'B. No forces: there is no gravity in space' },
        { val: 'C', text: 'C. Gravity only' },
        { val: 'D', text: 'D. Gravity and friction' },
      ],
      correct: 'C',
      expEn: '**Gravity only**: the Earth’s gravity keeps the Moon in orbit. Space is a vacuum, so there is no air resistance (A). There is gravity in space (B). Nothing rubs on the Moon, so there is no friction (D).',
      expFr: '**La gravité seulement** : la gravité de la Terre garde la Lune en orbite. L’espace est un vide, donc pas de résistance de l’air (A). Il y a de la gravité dans l’espace (B). Rien ne frotte sur la Lune, donc pas de frottement (D).',
    },
    {
      id: 'a8_prediction',
      type: 'mcq',
      title: '8. Le Verrier used the movement of Uranus to calculate where an unseen planet must be. What was his calculation?',
      options: [
        { val: 'A', text: 'A. An observation' },
        { val: 'B', text: 'B. A prediction' },
        { val: 'C', text: 'C. A conclusion' },
        { val: 'D', text: 'D. A result' },
      ],
      correct: 'B',
      expEn: 'It said where the planet **would be** found: **a prediction**. The observation came after, when Galle looked and saw Neptune (A). The conclusion was that another planet’s gravity was pulling Uranus (C). A result is what an experiment gives (D).',
      expFr: 'Le calcul disait où la planète **serait** trouvée : **une prédiction**. L’observation est venue après, quand Galle a regardé et vu Neptune (A). La conclusion, c’était que la gravité d’une autre planète tirait Uranus (C). Un résultat, c’est ce que donne une expérience (D).',
    },
  ],
};
