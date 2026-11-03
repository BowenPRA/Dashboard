// src/data/Y7_SCI/U03_7/assessment.js
// Eight questions, one sitting, ten minutes. 1 a hair dryer's two useful
// energies, 2 a heater's glow (light wasted where heat is wanted), 3 the
// motorbike's wasted percentage, 4 lamp A at 1000 J, 5 the same output the
// other way round at 25%, 6 dissipated in new words (a cup of tea), 7 why a
// laptop has a fan, 8 "a machine that wastes no energy". Every distractor is a
// slip or misconception the unit names: heat is always wasted, the % read as
// joules, halving instead of multiplying, energy destroyed or used up, energy
// that can be stored after spreading out. No item copies a deck check, the
// engine or the Short Answers. Correct letters: C B D A C D A B.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_hair_dryer',
      type: 'mcq',
      title: '1. A hair dryer blows hot air onto wet hair. Which of its energies are useful?',
      options: [
        { val: 'A', text: 'A. Thermal only' },
        { val: 'B', text: 'B. Kinetic only' },
        { val: 'C', text: 'C. Thermal and kinetic' },
        { val: 'D', text: 'D. Sound and thermal' },
      ],
      correct: 'C',
      expEn: 'We want the air to be **hot** (thermal) and to **move** (kinetic), so both are useful. Thermal alone (A) or kinetic alone (B) leaves out half of what we want. The **sound** (D) is the noise: nobody wants it, so it is wasted.',
      expFr: 'On veut que l’air soit **chaud** (thermal) et qu’il **bouge** (kinetic), donc les deux sont utiles. Thermal seul (A) ou kinetic seul (B) oublie la moitié de ce qu’on veut. Le **son** (D), c’est le bruit : personne n’en veut, il est gaspillé.',
    },
    {
      id: 'a2_heater_glow',
      type: 'mcq',
      title: '2. An electric heater warms a room, and its bars glow red. Is its light useful or wasted?',
      options: [
        { val: 'A', text: 'A. Useful, because light is always useful' },
        { val: 'B', text: 'B. Wasted, because we want heat from a heater' },
        { val: 'C', text: 'C. Useful, because it shows the heater is on' },
        { val: 'D', text: 'D. Neither: light is not energy' },
      ],
      correct: 'B',
      expEn: '**Useful means what we want**, and from a heater we want heat, so its light is **wasted** — like a toaster’s glow. Light is not always useful (A): it depends on the job. A glow is not the heater’s job (C). And light is energy, a way energy is transferred (D).',
      expFr: '**Utile veut dire ce qu’on veut**, et d’un radiateur on veut de la chaleur, donc sa lumière est **gaspillée** — comme la lueur d’un grille-pain. La lumière n’est pas toujours utile (A) : ça dépend du travail. Briller n’est pas le travail du radiateur (C). Et la lumière est de l’énergie, une façon dont l’énergie est transférée (D).',
    },
    {
      id: 'a3_moto_pct',
      type: 'mcq',
      title: '3. Only 25% of the energy in a motorbike’s petrol makes it move. What percentage is wasted?',
      options: [
        { val: 'A', text: 'A. 25%' },
        { val: 'B', text: 'B. 50%' },
        { val: 'C', text: 'C. 100%' },
        { val: 'D', text: 'D. 75%' },
      ],
      correct: 'D',
      expEn: 'Useful + wasted = everything that goes in = 100%. So wasted = 100% − 25% = **75%**. 25% (A) is the useful part. 50% (B) would be half. 100% (C) is all of it — but a quarter does move the bike.',
      expFr: 'Utile + gaspillé = tout ce qui entre = 100%. Donc gaspillé = 100% − 25% = **75%**. 25% (A), c’est la partie utile. 50% (B) serait la moitié. 100% (C), c’est tout — mais un quart fait bien avancer la moto.',
    },
    {
      id: 'a4_lamp_1000',
      type: 'mcq',
      title: '4. Lamp A changes 15% of its energy into light. 1000 J of electrical energy goes in. How many joules are wasted?',
      options: [
        { val: 'A', text: 'A. 850 J' },
        { val: 'B', text: 'B. 150 J' },
        { val: 'C', text: 'C. 985 J' },
        { val: 'D', text: 'D. 85 J' },
      ],
      correct: 'A',
      expEn: 'Every 100 J gives 15 J of light; 1000 J is ten lots of 100 J, so the light is 10 × 15 = 150 J. Wasted = 1000 − 150 = **850 J**. 150 J (B) is the useful light. 985 J (C) takes away the percentage, 15, not the joules. 85 J (D) is the wasted percentage read as joules.',
      expFr: 'Chaque 100 J donne 15 J de lumière ; 1000 J, c’est dix fois 100 J, donc la lumière vaut 10 × 15 = 150 J. Gaspillé = 1000 − 150 = **850 J**. 150 J (B), c’est la lumière utile. 985 J (C) enlève le pourcentage, 15, pas les joules. 85 J (D), c’est le pourcentage gaspillé lu comme des joules.',
    },
    {
      id: 'a5_quarter_in',
      type: 'mcq',
      title: '5. A small motor turns a quarter (25%) of the energy that goes in into kinetic energy. It gives 50 J of kinetic energy. How much energy went in?',
      options: [
        { val: 'A', text: 'A. 12.5 J' },
        { val: 'B', text: 'B. 50 J' },
        { val: 'C', text: 'C. 200 J' },
        { val: 'D', text: 'D. 100 J' },
      ],
      correct: 'C',
      expEn: '50 J is only a quarter of what went in, so what went in is 4 × 50 = **200 J**. 12.5 J (A) is a quarter of 50 J — but 50 J is what comes out, and more goes in. 50 J (B) is only the kinetic energy. 100 J (D) doubles it: that works for half, not a quarter.',
      expFr: '50 J, c’est seulement un quart de ce qui est entré, donc il est entré 4 × 50 = **200 J**. 12.5 J (A), c’est un quart de 50 J — mais 50 J, c’est ce qui sort, et il en entre plus. 50 J (B), c’est seulement l’énergie cinétique. 100 J (D) double : ça marche pour la moitié, pas pour un quart.',
    },
    {
      id: 'a6_tea',
      type: 'mcq',
      title: '6. A cup of hot tea cools down to room temperature. Its extra thermal energy is now dissipated. This means that the energy…',
      options: [
        { val: 'A', text: 'A. …has been destroyed' },
        { val: 'B', text: 'B. …is still in the cup' },
        { val: 'C', text: 'C. …is stored, ready to use later' },
        { val: 'D', text: 'D. …has spread out into the air, and cannot be gathered back' },
      ],
      correct: 'D',
      expEn: 'Dissipated means **spread out** where there is no use for it, and it can never be recovered. Energy is not destroyed (A). It left the hot tea for the colder air, so it is not in the cup (B). And spread-out energy cannot be stored (C).',
      expFr: 'Dissipée veut dire **étalée** là où elle ne sert à rien, et on ne peut jamais la récupérer. L’énergie n’est pas détruite (A). Elle a quitté le thé chaud pour l’air plus froid, donc elle n’est pas dans la tasse (B). Et l’énergie étalée ne peut pas être stockée (C).',
    },
    {
      id: 'a7_laptop_fan',
      type: 'mcq',
      title: '7. Why does a laptop computer have a small fan inside it?',
      options: [
        { val: 'A', text: 'A. To blow out the wasted heat, so the laptop does not get too hot' },
        { val: 'B', text: 'B. To cool down the person using it' },
        { val: 'C', text: 'C. To store the wasted heat for later' },
        { val: 'D', text: 'D. To turn the wasted heat back into electrical energy' },
      ],
      correct: 'A',
      expEn: 'A laptop changes some electrical energy into **wasted heat**, like the projector and lamp A. The fan blows that heat out into the room so the laptop does not overheat — feel its air vent. It is not there to cool you (B). Wasted heat cannot be stored (C) or turned back into electrical energy (D): it spreads out for good.',
      expFr: 'Un ordinateur portable transforme une partie de l’énergie électrique en **chaleur gaspillée**, comme le projecteur et la lampe A. Le ventilateur souffle cette chaleur dans la pièce pour que l’ordinateur ne surchauffe pas — sens sa grille d’aération. Il n’est pas là pour te rafraîchir (B). La chaleur gaspillée ne peut pas être stockée (C) ni redevenir de l’énergie électrique (D) : elle s’étale pour de bon.',
    },
    {
      id: 'a8_no_waste',
      type: 'mcq',
      title: '8. A company says its new machine wastes no energy at all. A scientist does not believe it. Why not?',
      options: [
        { val: 'A', text: 'A. Machines cannot use electrical energy' },
        { val: 'B', text: 'B. Every time energy is changed or transferred, some of it is dissipated' },
        { val: 'C', text: 'C. Energy is destroyed every time a machine is used' },
        { val: 'D', text: 'D. Only lamps and engines waste energy' },
      ],
      correct: 'B',
      expEn: '**Some energy is always dissipated** — the ball, the candle, the motorbike, the fan, every one. A machine can waste less (like lamp B), but never nothing. Machines use electrical energy all the time (A). Energy is not destroyed (C): the wasted part spreads out. And every machine wastes some, not only lamps and engines (D).',
      expFr: '**Une partie de l’énergie est toujours dissipée** — la balle, la bougie, la moto, le ventilateur, à chaque fois. Une machine peut gaspiller moins (comme la lampe B), mais jamais rien. Les machines utilisent tout le temps de l’énergie électrique (A). L’énergie n’est pas détruite (C) : la partie gaspillée s’étale. Et toutes les machines en gaspillent, pas seulement les lampes et les moteurs (D).',
    },
  ],
};
