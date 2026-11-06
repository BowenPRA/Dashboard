// src/data/Y7_SCI/U03_5/assessment.js
// Eight questions, one sitting, ten minutes. 1 the joule, 2 joules for four
// floors, 3 a bow held still, 4 a transfer among stores, 5 the battery, 6 which
// keeps its energy for a year, 7 why a hot drink does not, 8 a skier on a
// chair lift (transfer: the deck never shows a mountain). Every distractor is
// a misconception the unit names: N for energy, "a battery stores electricity",
// "still means no energy", "sound is a store", "caffeine uses it up". No item
// copies a deck check, Name That Energy or the Questions. Correct letters:
// C A D B A C D B.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_unit',
      type: 'mcq',
      title: '1. Boiling a kettle of water takes about 400 000 ___ of energy. Which unit goes in the gap?',
      options: [
        { val: 'A', text: 'A. newtons (N)' },
        { val: 'B', text: 'B. kilograms (kg)' },
        { val: 'C', text: 'C. joules (J)' },
        { val: 'D', text: 'D. metres (m)' },
      ],
      correct: 'C',
      expEn: 'Energy is measured in **joules (J)**. Newtons (A) measure force and weight, kilograms (B) measure mass, and metres (D) measure length.',
      expFr: 'L’énergie se mesure en **joules (J)**. Les newtons (A) mesurent la force et le poids, les kilogrammes (B) la masse, et les mètres (D) la longueur.',
    },
    {
      id: 'a2_floors',
      type: 'mcq',
      title: '2. Climbing one floor of stairs takes about 2 000 J. Mr Bowen climbs 4 floors. About how much energy does he need?',
      options: [
        { val: 'A', text: 'A. 8 000 J' },
        { val: 'B', text: 'B. 2 004 J' },
        { val: 'C', text: 'C. 500 J' },
        { val: 'D', text: 'D. 80 000 J' },
      ],
      correct: 'A',
      expEn: '**4 × 2 000 J = 8 000 J.** 2 004 (B) adds the 4 instead of multiplying, 500 (C) divides, and 80 000 (D) has one zero too many.',
      expFr: '**4 × 2 000 J = 8 000 J.** 2 004 (B) ajoute le 4 au lieu de multiplier, 500 (C) divise, et 80 000 (D) a un zéro de trop.',
    },
    {
      id: 'a3_bow',
      type: 'mcq',
      title: '3. An archer pulls a bow back and holds it still, ready to shoot. Which energy store does the bow have?',
      options: [
        { val: 'A', text: 'A. Kinetic' },
        { val: 'B', text: 'B. Gravitational potential' },
        { val: 'C', text: 'C. Chemical' },
        { val: 'D', text: 'D. Elastic potential' },
      ],
      correct: 'D',
      expEn: 'The bow is **bent out of shape**: an **elastic potential** store. It is not moving, so not kinetic (A); it has not been lifted up high (B); and it is not food, a fuel or a battery (C).',
      expFr: 'L’arc est **déformé** : une réserve **potentielle élastique**. Il ne bouge pas, donc pas cinétique (A) ; on ne l’a pas soulevé en hauteur (B) ; et ce n’est ni de la nourriture, ni un combustible, ni une pile (C).',
    },
    {
      id: 'a4_transfer',
      type: 'mcq',
      title: '4. Which of these is an energy transfer, not an energy store?',
      options: [
        { val: 'A', text: 'A. Kinetic' },
        { val: 'B', text: 'B. Sound' },
        { val: 'C', text: 'C. Chemical' },
        { val: 'D', text: 'D. Gravitational potential' },
      ],
      correct: 'B',
      expEn: '**Sound** moves energy from a vibrating thing to your ears; nothing keeps it. Kinetic (A), chemical (C) and gravitational potential (D) are all stores. The three transfers are electrical, sound and light (and thermal is both).',
      expFr: 'Le **son** transporte l’énergie d’une chose qui vibre jusqu’à tes oreilles ; rien ne la garde. Cinétique (A), chimique (C) et potentielle de pesanteur (D) sont des réserves. Les trois transferts sont électrique, sonore et lumineux (et le thermique est les deux).',
    },
    {
      id: 'a5_battery',
      type: 'mcq',
      title: '5. A torch has a battery inside it. Which energy is stored in the battery?',
      options: [
        { val: 'A', text: 'A. Chemical' },
        { val: 'B', text: 'B. Electrical' },
        { val: 'C', text: 'C. Light' },
        { val: 'D', text: 'D. Kinetic' },
      ],
      correct: 'A',
      expEn: 'A battery stores **chemical** energy. When the torch is switched on, a current transfers **electrical** energy (B) to the bulb, which transfers **light** (C) — but those are transfers, not what the battery keeps. Nothing in it is moving (D).',
      expFr: 'Une pile stocke de l’énergie **chimique**. Quand on allume la lampe, un courant transfère de l’énergie **électrique** (B) jusqu’à l’ampoule, qui transfère de la **lumière** (C) — mais ce sont des transferts, pas ce que la pile garde. Rien ne bouge dedans (D).',
    },
    {
      id: 'a6_year',
      type: 'mcq',
      title: '6. Which of these will still have its energy a year from now?',
      options: [
        { val: 'A', text: 'A. A bowl of hot soup' },
        { val: 'B', text: 'B. A spinning top' },
        { val: 'C', text: 'C. Petrol in a car’s tank' },
        { val: 'D', text: 'D. A ball rolling across the floor' },
      ],
      correct: 'C',
      expEn: 'Petrol is a fuel: a **chemical** store, which lasts until it is used. Hot soup (A) is a thermal store and cools in an hour; a spinning top (B) and a rolling ball (D) are kinetic stores and slow down and stop.',
      expFr: 'L’essence est un combustible : une réserve **chimique**, qui dure jusqu’à ce qu’on l’utilise. La soupe chaude (A) est une réserve thermique et refroidit en une heure ; une toupie (B) et une balle qui roule (D) sont des réserves cinétiques, qui ralentissent et s’arrêtent.',
    },
    {
      id: 'a7_coffee',
      type: 'mcq',
      title: '7. Mr Bowen makes a hot coffee at 7 a.m. By noon it is cold. Why can a thermal store not keep its energy for long?',
      options: [
        { val: 'A', text: 'A. The caffeine uses the energy up.' },
        { val: 'B', text: 'B. Energy disappears when a thing stands still.' },
        { val: 'C', text: 'C. Coffee has no energy, even when it is hot.' },
        { val: 'D', text: 'D. Its heat goes into the colder air and desk around it.' },
      ],
      correct: 'D',
      expEn: 'A hot thing always cools: its **heat goes into the colder things around it**. Caffeine gives almost no energy (A); a still thing can store plenty, like a book on a shelf (B); and hot coffee does have a thermal store — it just does not last (C).',
      expFr: 'Une chose chaude refroidit toujours : sa **chaleur part dans les choses plus froides autour**. La caféine ne donne presque pas d’énergie (A) ; une chose immobile peut en stocker beaucoup, comme un livre sur une étagère (B) ; et un café chaud a bien une réserve thermique — elle ne dure simplement pas (C).',
    },
    {
      id: 'a8_skier',
      type: 'mcq',
      title: '8. A skier rides a chair lift from the bottom of a mountain to the top. Which of her energy stores gets bigger?',
      options: [
        { val: 'A', text: 'A. Elastic potential' },
        { val: 'B', text: 'B. Gravitational potential' },
        { val: 'C', text: 'C. Thermal' },
        { val: 'D', text: 'D. Sound' },
      ],
      correct: 'B',
      expEn: 'She is **lifted up high**, so her **gravitational potential** store gets bigger. Nothing is stretched or squashed (A), she does not get hotter (C), and sound is a transfer, not a store (D).',
      expFr: 'Elle est **soulevée en hauteur**, donc sa réserve **potentielle de pesanteur** augmente. Rien n’est étiré ni écrasé (A), elle ne se réchauffe pas (C), et le son est un transfert, pas une réserve (D).',
    },
  ],
};
