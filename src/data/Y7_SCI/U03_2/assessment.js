// src/data/Y7_SCI/U03_2/assessment.js
// Eight questions, one sitting, ten minutes. 1 the key word evidence, 2 a
// hypothesis is not a fact, 3 more mass pulls in more, 4 why the Solar System
// is flat, 5 why the far planets are giants, 6 why Jupiter is not a star,
// 7 a limitation of a scale model, 8 the dark rings in a young star's disc
// (transfer: the deck shows HL Tauri, but never asks why the gaps are there).
// Every distractor is a misconception the unit names: heat pulls, gravity grows
// with time, the Sun's gravity sets the direction, heavy rock sinks, any clump
// becomes a star, a model has "errors". No item copies a deck check, the
// Storyboard or the Questions. Correct letters: B D A C D A C B.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_evidence',
      type: 'mcq',
      title: '1. “All eight planets orbit the Sun in the same direction.” Scientists use facts like this to test an idea. What do we call facts used in this way?',
      options: [
        { val: 'A', text: 'A. A hypothesis' },
        { val: 'B', text: 'B. Evidence' },
        { val: 'C', text: 'C. A model' },
        { val: 'D', text: 'D. A limitation' },
      ],
      correct: 'B',
      expEn: 'Facts from observations or experiments are **evidence**. A hypothesis is the idea being tested (A), a model shows something that is hard to observe (C), and a limitation is something a model cannot do (D).',
      expFr: 'Des faits tirés d’observations ou d’expériences sont des **preuves** (evidence). Une hypothèse est l’idée qu’on teste (A), un modèle montre ce qui est difficile à observer (C), et une limite est ce qu’un modèle ne peut pas faire (D).',
    },
    {
      id: 'a2_hypothesis',
      type: 'mcq',
      title: '2. Which of these is a hypothesis, not a fact?',
      options: [
        { val: 'A', text: 'A. Venus spins the opposite way to most planets.' },
        { val: 'B', text: 'B. The Sun has 99.8% of the mass in the Solar System.' },
        { val: 'C', text: 'C. All the planets orbit the Sun in one flat plane.' },
        { val: 'D', text: 'D. The Sun and the planets formed from one spinning cloud of dust and gas.' },
      ],
      correct: 'D',
      expEn: 'Nobody was there to observe the Solar System form, so **how it formed is a hypothesis**: an idea that can be tested. A, B and C can all be measured today — they are facts, and we use them as evidence to test the hypothesis.',
      expFr: 'Personne n’était là pour voir le système solaire se former, donc **la façon dont il s’est formé est une hypothèse** : une idée qu’on peut tester. A, B et C se mesurent aujourd’hui — ce sont des faits, et on s’en sert comme preuves pour tester l’hypothèse.',
    },
    {
      id: 'a3_more_mass',
      type: 'mcq',
      title: '3. In a cloud of dust, one clump has more mass than the clumps around it. What happens next?',
      options: [
        { val: 'A', text: 'A. Its gravity is stronger, so it pulls in more dust and grows even faster.' },
        { val: 'B', text: 'B. It stops growing, because it is already the biggest.' },
        { val: 'C', text: 'C. The smaller clumps pull harder and break it apart.' },
        { val: 'D', text: 'D. It waits, because gravity only gets stronger as time goes on.' },
      ],
      correct: 'A',
      expEn: '**More mass, stronger gravity**, so it pulls in even more and grows faster and faster. Nothing makes it stop (B); small clumps pull less, not more (C); and gravity grows with mass, not with time (D).',
      expFr: '**Plus de masse, gravité plus forte** : il attire encore plus et grossit de plus en plus vite. Rien ne l’arrête (B) ; les petits amas attirent moins, pas plus (C) ; et la gravité augmente avec la masse, pas avec le temps (D).',
    },
    {
      id: 'a4_flat',
      type: 'mcq',
      title: '4. Seen from the side, the orbits of the planets make an almost flat layer. What is the best explanation?',
      options: [
        { val: 'A', text: 'A. The Sun’s gravity pushes every planet down onto the same level.' },
        { val: 'B', text: 'B. The planets are too heavy to move up or down.' },
        { val: 'C', text: 'C. The cloud they formed from was spinning, and the spin flattened it into a disc.' },
        { val: 'D', text: 'D. It happened by chance.' },
      ],
      correct: 'C',
      expEn: 'A spinning cloud **flattens into a disc**, like spun pizza dough, and the planets grew in that disc. Gravity pulls towards the Sun, it does not push planets onto a level (A); weight has nothing to do with it (B); and eight planets in one plane is not chance (D).',
      expFr: 'Un nuage qui tourne **s’aplatit en disque**, comme une pâte à pizza, et les planètes ont grandi dans ce disque. La gravité attire vers le Soleil, elle ne pousse pas les planètes sur un niveau (A) ; le poids n’y est pour rien (B) ; et huit planètes dans un seul plan, ce n’est pas un hasard (D).',
    },
    {
      id: 'a5_giants',
      type: 'mcq',
      title: '5. Jupiter, Saturn, Uranus and Neptune are giants, far from the Sun. Which explanation fits the hypothesis?',
      options: [
        { val: 'A', text: 'A. Light gas floated away from the Sun, and heavy rock sank towards it.' },
        { val: 'B', text: 'B. They formed first, when there was more dust.' },
        { val: 'C', text: 'C. The Sun’s gravity stretched them and made them bigger.' },
        { val: 'D', text: 'D. Far from the young Sun it was cold enough for ice, so big cores grew and pulled in gas.' },
      ],
      correct: 'D',
      expEn: 'Far out, **ice** survived as well as rock, so the cores grew big enough to **pull in gas**. Nothing sinks or floats in space (A); the hypothesis says nothing about them forming first (B); and the Sun’s pull does not make planets bigger (C).',
      expFr: 'Loin du Soleil, la **glace** a survécu en plus de la roche, donc les noyaux sont devenus assez gros pour **attirer du gaz**. Rien ne coule ni ne flotte dans l’espace (A) ; l’hypothèse ne dit pas qu’elles se sont formées en premier (B) ; et l’attraction du Soleil ne grossit pas les planètes (C).',
    },
    {
      id: 'a6_jupiter',
      type: 'mcq',
      title: '6. Jupiter is the biggest planet, but it is not a star. Why not?',
      options: [
        { val: 'A', text: 'A. It does not have enough mass to get hot enough to shine.' },
        { val: 'B', text: 'B. It is too far from the Sun.' },
        { val: 'C', text: 'C. It formed too late, so it has not had time yet.' },
        { val: 'D', text: 'D. It is made of gas, and stars are made of rock.' },
      ],
      correct: 'A',
      expEn: 'A clump only becomes a star if it has **enough mass** to get hot enough to shine: Jupiter would need about **80 times** more mass. Distance from the Sun does not decide it (B); waiting does not turn a clump into a star (C); and stars are not made of rock (D).',
      expFr: 'Un amas ne devient une étoile que s’il a **assez de masse** pour devenir assez chaud pour briller : Jupiter aurait besoin d’environ **80 fois** plus de masse. La distance au Soleil ne décide rien (B) ; attendre ne transforme pas un amas en étoile (C) ; et les étoiles ne sont pas faites de roche (D).',
    },
    {
      id: 'a7_limitation',
      type: 'mcq',
      title: '7. A student makes a model of the Solar System: a football for the Sun and a tennis ball for the Earth, side by side. Which is a limitation of this model?',
      options: [
        { val: 'A', text: 'A. It shows that the Sun is bigger than the Earth.' },
        { val: 'B', text: 'B. You can hold it in your hands.' },
        { val: 'C', text: 'C. The Earth is far too big, and far too close to the Sun.' },
        { val: 'D', text: 'D. It uses round objects, like the real Sun and Earth.' },
      ],
      correct: 'C',
      expEn: 'A **limitation** is something a model gets wrong or leaves out: with a football Sun, the Earth should be a 2 mm pinhead about 24 m away. A and D are strengths — things it shows correctly — and B is not about what it shows at all.',
      expFr: 'Une **limite**, c’est ce qu’un modèle montre mal ou oublie : avec un Soleil-ballon, la Terre devrait être une tête d’épingle de 2 mm, à environ 24 m. A et D sont des points forts — ce qu’il montre bien — et B ne parle pas de ce qu’il montre.',
    },
    {
      id: 'a8_rings',
      type: 'mcq',
      title: '8. A young star has a flat disc of dust round it. In the disc there are dark rings with almost no dust. What is the best explanation?',
      options: [
        { val: 'A', text: 'A. The star’s heat has burned the dust away in rings.' },
        { val: 'B', text: 'B. Growing clumps are sweeping up the dust as they become planets.' },
        { val: 'C', text: 'C. The dust in the rings has fallen into the star.' },
        { val: 'D', text: 'D. The disc spins too fast to hold any dust.' },
      ],
      correct: 'B',
      expEn: 'In the disc, clumps pull in the dust near them with their gravity, leaving **gaps where planets are growing** — what HL Tauri shows. Heat does not burn dust into rings (A); dust falling into the star would not leave rings far out (C); and the rest of the disc spins too, and keeps its dust (D).',
      expFr: 'Dans le disque, les amas attirent la poussière proche par leur gravité, et laissent des **vides là où des planètes grandissent** — ce que montre HL Tauri. La chaleur ne brûle pas la poussière en anneaux (A) ; de la poussière tombée dans l’étoile ne laisserait pas d’anneaux loin d’elle (C) ; et le reste du disque tourne aussi, et garde sa poussière (D).',
    },
  ],
};
