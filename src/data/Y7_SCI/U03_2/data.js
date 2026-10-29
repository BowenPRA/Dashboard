// src/data/Y7_SCI/U03_2/data.js
// 3.2 Formation of the Solar System — Year 7 Science self-study unit. Two
// classroom decks reduced to ONE deck (pairing rule 10): y7-science/U03_2
// (Learner's Book pp. 85–90) and y7-science/U03_models ("Models: Space").
// Plan: docs/y7-science/plans/U03_2.md.
//
// The leaner shape asked for in October 2026 ("more polish and less busy
// work"): the interactive deck, the key words, ONE flagship task — the
// Storyboard (SOLAR_STORY, p84), the book's own storyboard Activity, marked —
// four reasoning questions, the quiz and the arcade. 105 XP, capped at 100.
// English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { storyboard } from './storyboard.js';
import { DIAGRAMS } from './diagrams.js';

export const U03_2_DATA = {
  meta: {
    id: 'U03_2',
    title: 'Formation of the Solar System',
    desc: 'Nobody was there — so how do we know? A cloud of dust and gas, gravity, one spinning disc, and the Sun and planets it made; the evidence for the story, the two planets that seem to contradict it, and what a model can and cannot show.',
    track: 'Y7_SCI',
    icon: 'Orbit',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_2', title: 'Science 3.2 · Formation of the Solar System' },
      { course: 'y7-science', slug: 'U03_models', title: 'Science · Models: Space' },
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
        { id: 'SOLAR_STORY', dbKey: 'p84', maxXP: 30 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // The quiz gate is 65 of the 85 XP before it (76%), not the usual 80.
      // This unit has fewer tasks on purpose (less busy work, one flagship), so
      // only 85 XP comes before the quiz, and the 80% rule
      // (phase-gate-80-percent-rule) needs at least 100 before an 80 gate.
      // Finishing is unchanged: 80+ XP with the quiz sat (isUnitComplete).
      // Approved by the integrator, 29 Oct 2026.
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 65,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Storyboard (utils/solarStory.js): twelve items; the frames are this unit's
  // drawings, in the order of the story.
  storyboard: {
    ...storyboard,
    frames: {
      cloud: DIAGRAMS.FRAME_CLOUD,
      collapse: DIAGRAMS.FRAME_COLLAPSE,
      disc: DIAGRAMS.FRAME_DISC,
      sun: DIAGRAMS.FRAME_SUN,
      clumps: DIAGRAMS.FRAME_CLUMPS,
      planets: DIAGRAMS.FRAME_PLANETS,
      today: DIAGRAMS.FRAME_TODAY,
    },
  },

  // The book's key words that the explanations are written in (formed is
  // glossed on the slides; spin and axis are carried by the drawing), plus
  // hypothesis and limitation, which the book's questions lean on.
  realWords: [
    {
      word: 'Observe', fr: 'Observer',
      def: 'To watch something carefully as it happens.',
      frDef: 'Regarder quelque chose avec attention pendant que ça se passe.',
      sent: 'Nobody was there to observe the Solar System form.',
      frSent: 'Personne n’était là pour observer la formation du système solaire.',
      isReal: true,
    },
    {
      word: 'Evidence', fr: 'Preuves',
      def: 'Facts from observations or experiments.',
      frDef: 'Des faits tirés d’observations ou d’expériences.',
      sent: 'Young stars with flat discs of dust are evidence for the hypothesis.',
      frSent: 'Les jeunes étoiles entourées d’un disque plat de poussière sont des preuves pour l’hypothèse.',
      isReal: true,
    },
    {
      word: 'Hypothesis', fr: 'Hypothèse',
      def: 'An idea that can be tested.',
      frDef: 'Une idée qu’on peut tester.',
      sent: 'The hypothesis says the Sun and the planets formed from one spinning cloud.',
      frSent: 'L’hypothèse dit que le Soleil et les planètes se sont formés à partir d’un seul nuage qui tournait.',
      isReal: true,
    },
    {
      word: 'Support', fr: 'Confirmer',
      def: 'To agree with an idea. A fact that fits a hypothesis supports it.',
      frDef: 'Être d’accord avec une idée. Un fait qui va avec une hypothèse la confirme.',
      sent: 'Cake crumbs on the cat’s face support the idea that the cat ate the cake.',
      frSent: 'Des miettes de gâteau sur le museau du chat confirment l’idée que le chat a mangé le gâteau.',
      isReal: true,
    },
    {
      word: 'Contradict', fr: 'Contredire',
      def: 'To go against an idea. It is the opposite of support.',
      frDef: 'Aller contre une idée. C’est le contraire de confirmer.',
      sent: 'Venus spins the other way, so it seems to contradict the hypothesis.',
      frSent: 'Vénus tourne dans l’autre sens, donc elle semble contredire l’hypothèse.',
      isReal: true,
    },
    {
      word: 'Orbit', fr: 'Orbite',
      def: 'The path of a planet around the Sun.',
      frDef: 'Le chemin d’une planète autour du Soleil.',
      sent: 'The Earth takes one year to go once round its orbit.',
      frSent: 'La Terre met un an pour faire une fois le tour de son orbite.',
      isReal: true,
    },
    {
      word: 'Plane', fr: 'Plan',
      def: 'A flat surface. (Not an aeroplane!)',
      frDef: 'Une surface plate. (Pas un avion !)',
      sent: 'All the planets orbit the Sun in the same plane, so the Solar System is flat.',
      frSent: 'Toutes les planètes tournent autour du Soleil dans le même plan, donc le système solaire est plat.',
      isReal: true,
    },
    {
      word: 'Nebula', fr: 'Nébuleuse',
      def: 'A cloud of dust and gas in space.',
      frDef: 'Un nuage de poussière et de gaz dans l’espace.',
      sent: 'New stars are forming inside the Orion Nebula.',
      frSent: 'De nouvelles étoiles se forment dans la nébuleuse d’Orion.',
      isReal: true,
    },
    {
      word: 'Model', fr: 'Modèle',
      def: 'A way of showing something that is hard to observe directly.',
      frDef: 'Une façon de montrer quelque chose qu’on ne peut pas bien observer directement.',
      sent: 'A computer model shows millions of years in a few seconds.',
      frSent: 'Un modèle sur ordinateur montre des millions d’années en quelques secondes.',
      isReal: true,
    },
    {
      word: 'Limitation', fr: 'Limite',
      def: 'Something a model cannot do, gets wrong or leaves out.',
      frDef: 'Ce qu’un modèle ne peut pas faire, montre mal ou oublie.',
      sent: 'One limitation of the dust model is that it is flat.',
      frSent: 'Une limite du modèle de poussière, c’est qu’il est plat.',
      isReal: true,
    },
  ],

  // Four reasoning questions, marked on the mark scheme alone (no English
  // score): one tickable point per line, two lines each. They are the book's
  // storyboard "reasons why" (sq1), p. 87's chain (sq2) and Think like a
  // scientist Q3 and Q1 (sq3, sq4), written for a student answering from the
  // deck. Suggested words are vocabulary to use, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'All eight planets orbit the Sun in the same direction, and in the same plane. Use the hypothesis of how the Solar System formed to explain why.',
      frTranslation: 'Les huit planètes tournent autour du Soleil dans le même sens, et dans le même plan. Utilise l’hypothèse sur la formation du système solaire pour expliquer pourquoi.',
      suggestedWords: [['nebula', 'cloud of dust and gas'], ['hypothesis'], ['formed', 'formation']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Sun and the planets formed from one cloud (or disc) of dust and gas that was spinning one way, so the planets still orbit in that direction.',
        '1 mark for saying the spinning cloud flattened into a disc, so the planets that formed in it orbit in one plane.',
      ],
      modelAnswer: 'The hypothesis says the Sun and all the planets formed from one cloud of dust and gas that was spinning one way. The planets grew in that cloud, so they still go round the Sun in the direction it was spinning. As the cloud shrank, the spin flattened it into a disc, so the planets that formed in the disc all orbit in the same flat plane.',
    },
    {
      id: 'sq2',
      question: 'Explain how gravity can turn a cloud of dust and gas into a star.',
      frTranslation: 'Explique comment la gravité peut transformer un nuage de poussière et de gaz en étoile.',
      suggestedWords: [['particles', 'grains'], ['clump'], ['nebula']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying gravity pulls the particles of dust and gas towards each other, so they stick together into a clump.',
        '1 mark for explaining that as the clump’s mass increases its gravity gets stronger, so it pulls in even more dust and gas (until it is big and hot enough to shine as a star).',
      ],
      modelAnswer: 'Every particle of dust and gas has a little gravity, so the particles pull on each other and stick together into a clump. As the clump gets more mass, its gravity gets stronger, so it pulls in even more dust and gas and grows faster and faster. When it has enough mass, it gets hot enough in the middle to shine: it becomes a star.',
    },
    {
      id: 'sq3',
      question: 'Venus spins on its axis the opposite way to most planets. Explain why this seems to contradict the hypothesis, and why scientists still keep the hypothesis.',
      frTranslation: 'Vénus tourne sur son axe dans le sens opposé à la plupart des planètes. Explique pourquoi cela semble contredire l’hypothèse, et pourquoi les scientifiques gardent quand même l’hypothèse.',
      suggestedWords: [['axis', 'spin'], ['evidence'], ['hypothesis']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining that one cloud spinning one way should make all the planets spin the same way, so a planet spinning the other way does not fit.',
        '1 mark for saying scientists keep the hypothesis because most of the evidence still supports it (and they look for another explanation, such as a crash).',
      ],
      modelAnswer: 'The hypothesis says all the planets formed from one cloud that was spinning one way, so they should all spin the same way. Venus spins the opposite way, so it seems to contradict the hypothesis. Scientists still keep the hypothesis because most of the evidence supports it, and they look for another reason, such as a giant crash that turned Venus round.',
    },
    {
      id: 'sq4',
      question: 'Scientists use computer models to study how stars and planets form. Give one reason for using a model, and one limitation of the dust model in this unit.',
      frTranslation: 'Les scientifiques utilisent des modèles sur ordinateur pour étudier la formation des étoiles et des planètes. Donne une raison d’utiliser un modèle, et une limite du modèle de poussière de cette leçon.',
      suggestedWords: [['observe', 'observation'], ['computer'], ['limitation']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for a reason to use a model: nobody can observe a star forming; it takes millions of years and the model shows it quickly; it is too big or too far away for a lab; or it can be changed and run again.',
        '1 mark for a limitation of the dust model: it is flat (not three-dimensional); it has only 240 grains; it has no gas or no heat; or it is not to scale.',
      ],
      modelAnswer: 'Nobody can watch a star and its planets form, because it takes millions of years, but a model can show it in a few seconds. One limitation of our dust model is that it is flat, but a real cloud of dust and gas is three-dimensional.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
