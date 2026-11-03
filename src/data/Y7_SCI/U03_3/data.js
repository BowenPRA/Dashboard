// src/data/Y7_SCI/U03_3/data.js
// 3.3 Movement in Space — Year 7 Science self-study unit, reduced from the
// classroom deck y7-science/U03_3 (Learner's Book pp. 91–96).
// Plan: docs/y7-science/plans/U03_3.md.
//
// The leaner shape (October 2026, "more polish and less busy work"): the
// interactive deck, the key words, ONE flagship task — Orbit Lab (ORBIT_LAB,
// p87), the book's three questions used on things the student has not met —
// four explanations to write, the quiz and the arcade. 105 XP, capped at 100.
// English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { orbitLab } from './orbitLab.js';

export const U03_3_DATA = {
  meta: {
    id: 'U03_3',
    title: 'Movement in Space',
    desc: 'Let go of the string: what keeps the planets going round, why the close ones are fastest, and why nothing out there slows them down. The Sun’s gravity, a bar graph of orbit speeds, air resistance and the vacuum of space, and how Neptune was found.',
    track: 'Y7_SCI',
    icon: 'Orbit',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_3', title: 'Science 3.3 · Movement in Space' },
    ],
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
      // 25 of the 35 XP before it (71%): the deck alone opens practice.
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'ORBIT_LAB', dbKey: 'p87', maxXP: 30 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // The quiz gate is 65 of the 85 XP before it (76%), not the usual 80,
      // as for 3.2: this unit has fewer tasks on purpose (less busy work, one
      // flagship), so only 85 XP comes before the quiz, and the 80% rule
      // (phase-gate-80-percent-rule) needs at least 100 before an 80 gate.
      // Finishing is unchanged: 80+ XP with the quiz sat (isUnitComplete).
      // Approved with the plan, 3 Nov 2026.
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 65,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  orbitLab: orbitLab,

  // The book's key words (circular, speed, air resistance, vacuum), the three
  // words of Think like a scientist, and the two the explanations lean on:
  // direction (every arrow question) and friction (the book's Q6). Orbit
  // (3.2) and gravity (3.1) are not repeated; air resistance is, because it
  // is one of 3.3's own Key words.
  realWords: [
    {
      word: 'Circular', fr: 'Circulaire',
      def: 'In the shape of a circle.',
      frDef: 'En forme de cercle.',
      sent: 'The planets’ orbits are almost circular.',
      frSent: 'Les orbites des planètes sont presque circulaires.',
      isReal: true,
    },
    {
      word: 'Direction', fr: 'Direction',
      def: 'The way something moves or points.',
      frDef: 'Le sens dans lequel un objet se déplace ou pointe.',
      sent: 'The Sun’s gravity pulls in the direction of the Sun.',
      frSent: 'La gravité du Soleil tire dans la direction du Soleil.',
      isReal: true,
    },
    {
      word: 'Speed', fr: 'Vitesse',
      def: 'How fast something moves.',
      frDef: 'La rapidité avec laquelle un objet se déplace.',
      sent: 'Mercury’s speed is 48 kilometres per second.',
      frSent: 'La vitesse de Mercure est de 48 kilomètres par seconde.',
      isReal: true,
    },
    {
      word: 'Air resistance', fr: 'Résistance de l’air',
      def: 'A force from the air that slows a moving object down.',
      frDef: 'Une force de l’air qui ralentit un objet en mouvement.',
      sent: 'Panels on the wing make more air resistance, so the plane slows down.',
      frSent: 'Les panneaux sur l’aile font plus de résistance de l’air, donc l’avion ralentit.',
      isReal: true,
    },
    {
      word: 'Friction', fr: 'Frottement',
      def: 'A force between two surfaces that rub together. It slows things down.',
      frDef: 'Une force entre deux surfaces qui frottent l’une contre l’autre. Elle ralentit les objets.',
      sent: 'Friction between the wheels and the road slows the bicycle down.',
      frSent: 'Le frottement entre les roues et la route ralentit le vélo.',
      isReal: true,
    },
    {
      word: 'Vacuum', fr: 'Vide',
      def: 'A space with no particles in it.',
      frDef: 'Un espace sans particules.',
      sent: 'Space is a vacuum, so there is no air resistance.',
      frSent: 'L’espace est un vide, donc il n’y a pas de résistance de l’air.',
      isReal: true,
    },
    {
      word: 'Observation', fr: 'Observation',
      def: 'What you see, measure and record.',
      frDef: 'Ce qu’on voit, mesure et note.',
      sent: 'Astronomers made observations of Uranus for many years.',
      frSent: 'Les astronomes ont fait des observations d’Uranus pendant des années.',
      isReal: true,
    },
    {
      word: 'Prediction', fr: 'Prédiction',
      def: 'What you think will happen.',
      frDef: 'Ce qu’on pense qu’il va se passer.',
      sent: 'Le Verrier’s prediction said where to look for the new planet.',
      frSent: 'La prédiction de Le Verrier disait où chercher la nouvelle planète.',
      isReal: true,
    },
    {
      word: 'Conclusion', fr: 'Conclusion',
      def: 'What you decide from the results.',
      frDef: 'Ce qu’on décide à partir des résultats.',
      sent: 'The conclusion was that another planet was pulling Uranus.',
      frSent: 'La conclusion était qu’une autre planète tirait Uranus.',
      isReal: true,
    },
  ],

  // Four explanations, marked on the mark scheme alone (no English score): one
  // tickable point per line, two lines each. sq1 and sq2 are the book's
  // checklist ("Explain why planets closer to the Sun move faster"), sq3 is
  // its Question 5, and sq4 is Think like a scientist Q4, written for a
  // student answering from the deck. Suggested words never give a mark away.
  shortQA: [
    {
      id: 'sq1',
      question: 'A planet goes round the Sun in an almost circular orbit. What keeps it in orbit, and what would happen to the planet if this force suddenly stopped?',
      frTranslation: 'Une planète tourne autour du Soleil sur une orbite presque circulaire. Qu’est-ce qui la garde en orbite, et que se passerait-il si cette force s’arrêtait d’un coup ?',
      suggestedWords: [['gravity'], ['direction'], ['orbit']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Sun’s gravity keeps the planet in orbit, pulling it towards the Sun.',
        '1 mark for saying that without it the planet would move off in a straight line, in the direction it was moving at that moment (not outwards, away from the Sun).',
      ],
      modelAnswer: 'The Sun’s gravity keeps the planet in orbit. It always pulls the planet towards the Sun. If the gravity suddenly stopped, nothing would pull the planet towards the Sun any more, so it would move off in a straight line, in the direction it was moving at that moment.',
    },
    {
      id: 'sq2',
      question: 'Mercury orbits the Sun at 48 km/s and Neptune at 5 km/s. Describe the pattern in the speeds of the planets, and explain it.',
      frTranslation: 'Mercure tourne autour du Soleil à 48 km/s et Neptune à 5 km/s. Décris la tendance dans la vitesse des planètes, et explique-la.',
      suggestedWords: [['distance'], ['speed'], ['pull', 'gravity']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the pattern: the further a planet is from the Sun, the slower it moves (as the distance from the Sun increases, the speed decreases).',
        '1 mark for the reason: the Sun’s gravity (pull) is weaker far from the Sun, or stronger close to it.',
      ],
      modelAnswer: 'As the distance from the Sun increases, the speed of the planets decreases: Mercury is the closest and the fastest, and Neptune is the furthest and the slowest. This is because the pull of the Sun’s gravity is stronger close to the Sun and weaker far away.',
    },
    {
      id: 'sq3',
      question: 'Voyager 1 moves through space at about 64 000 km/h, with its engines switched off. Explain why it does not slow down, and why it could not move this fast through the air on Earth.',
      frTranslation: 'Voyager 1 se déplace dans l’espace à environ 64 000 km/h, moteurs éteints. Explique pourquoi elle ne ralentit pas, et pourquoi elle ne pourrait pas aller aussi vite dans l’air, sur Terre.',
      suggestedWords: [['vacuum'], ['particles'], ['air resistance']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying space is a vacuum (no particles / no air), so there is no air resistance to slow it down.',
        '1 mark for saying that on Earth air resistance acts against its movement, and it is bigger at higher speed, so at that speed it would be very big and slow Voyager down.',
      ],
      modelAnswer: 'Space is a vacuum: there are no particles of air, so there is no air resistance to slow Voyager 1 down, and it keeps going. On Earth, air resistance would act against its movement. The faster an object moves, the bigger the air resistance, so at 64 000 km/h it would be huge and would slow Voyager down.',
    },
    {
      id: 'sq4',
      question: 'Scientists found Neptune by working out where it must be before anyone saw it. Use the words observation, prediction and conclusion to explain how.',
      frTranslation: 'Les scientifiques ont trouvé Neptune en calculant où elle devait être avant que quelqu’un la voie. Utilise les mots observation, prédiction et conclusion pour expliquer comment.',
      suggestedWords: [['Uranus'], ['gravity'], ['calculated']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying observations showed Uranus was not where the prediction (Bouvard’s calculations) said it would be.',
        '1 mark for saying scientists concluded that the gravity of another planet was pulling Uranus, and Le Verrier predicted where it must be, where Neptune was then seen (observed).',
      ],
      modelAnswer: 'Bouvard made a prediction of where Uranus would be, but observations showed that Uranus was not there. Scientists came to the conclusion that the gravity of another planet was pulling Uranus. Le Verrier predicted where this planet must be, and Galle looked there and observed Neptune.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
