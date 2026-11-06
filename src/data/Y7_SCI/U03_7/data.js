// src/data/Y7_SCI/U03_7/data.js
// 3.7 Where Does Energy Go? — Year 7 Science self-study unit, the last section
// of Unit 3 Forces and energy. Reduced from the classroom lesson
// y7-science/U03_7 (Learner's Book pp. 117–119). Plan: docs/y7-science/plans/U03_7.md.
//
// The leaner shape (October 2026, "more polish and less busy work"): the
// interactive deck, the key words, ONE flagship task — Where Did It Go?
// (ENERGY_SPLIT, p91): sort it, count it, chase it, one device at a time — four
// reasoning questions, the quiz and the arcade. 110 XP, capped at 100.
// English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { energySplit } from './energySplit.js';
import { DIAGRAMS } from './diagrams.js';

export const U03_7_DATA = {
  meta: {
    id: 'U03_7',
    title: 'Where Does Energy Go?',
    desc: 'Sort it, count it, chase it: useful and wasted energy, the two lamps that give the same light, and the heat that spreads out and never comes back.',
    track: 'Y7_SCI',
    icon: 'Wind',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_7', title: 'Science 3.7 · Where Does Energy Go?' },
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
        { id: 'ENERGY_SPLIT', dbKey: 'p91', maxXP: 35 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // The quiz gate is 65 of the 90 XP before it (72%), not the usual 80,
      // as in 3.2: fewer tasks on purpose (one flagship), and the 80% rule
      // (phase-gate-80-percent-rule) needs at least 100 XP before an 80 gate.
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

  // Where Did It Go? (utils/energySplit.js): fourteen items; the pictures are
  // this unit's drawings, one per device.
  energySplit: {
    ...energySplit,
    pictures: {
      candle: DIAGRAMS.DEV_CANDLE,
      radio: DIAGRAMS.DEV_RADIO,
      motorbike: DIAGRAMS.DEV_MOTORBIKE,
      lampA: DIAGRAMS.DEV_LAMP_A,
      lampB: DIAGRAMS.DEV_LAMP_B,
      toaster: DIAGRAMS.DEV_TOASTER,
      charger: DIAGRAMS.DEV_CHARGER,
      cyclist: DIAGRAMS.DEV_CYCLIST,
      kettle: DIAGRAMS.DEV_KETTLE,
      stairs: DIAGRAMS.DEV_STAIRS,
      fire: DIAGRAMS.DEV_FIRE,
      fan: DIAGRAMS.DEV_FAN,
      ball: DIAGRAMS.DEV_BALL,
    },
  },

  // The book's four key words (useful, wasted, dissipated, recovered) and the
  // words the explanations lean on.
  realWords: [
    {
      word: 'Useful energy', fr: 'Énergie utile',
      def: 'Energy changed into the kind we want.',
      frDef: 'L’énergie transformée en la forme que l’on veut.',
      sent: 'A lamp’s useful energy is its light.',
      frSent: 'L’énergie utile d’une lampe, c’est sa lumière.',
      isReal: true,
    },
    {
      word: 'Wasted energy', fr: 'Énergie gaspillée',
      def: 'Energy changed into kinds we do not want.',
      frDef: 'L’énergie transformée en formes que l’on ne veut pas.',
      sent: 'The heat and noise of a motorbike engine are wasted energy.',
      frSent: 'La chaleur et le bruit d’un moteur de moto sont de l’énergie gaspillée.',
      isReal: true,
    },
    {
      word: 'Dissipated', fr: 'Dissipée',
      def: 'Spread out where there is no use for it.',
      frDef: 'Étalée là où elle ne sert à rien.',
      sent: 'The coffee’s heat was dissipated into the room.',
      frSent: 'La chaleur du café s’est dissipée dans la pièce.',
      isReal: true,
    },
    {
      word: 'Recover', fr: 'Récupérer',
      def: 'To get something back.',
      frDef: 'Reprendre quelque chose qu’on avait perdu.',
      sent: 'Dissipated energy can never be recovered.',
      frSent: 'On ne peut jamais récupérer l’énergie dissipée.',
      isReal: true,
    },
    {
      word: 'Spread out', fr: 'S’étaler',
      def: 'To move out from one place to many places.',
      frDef: 'Partir d’un seul endroit vers beaucoup d’endroits.',
      sent: 'The heat spread out from the mug into the whole room.',
      frSent: 'La chaleur s’est étalée de la tasse à toute la pièce.',
      isReal: true,
    },
    {
      word: 'Percentage', fr: 'Pourcentage',
      def: 'A number out of 100, written with the sign %.',
      frDef: 'Un nombre sur 100, écrit avec le signe %.',
      sent: 'Only 25 percent of the petrol’s energy moves the bike.',
      frSent: 'Seulement 25 pour cent de l’énergie de l’essence fait avancer la moto.',
      isReal: true,
    },
    {
      word: 'Filament lamp', fr: 'Lampe à filament',
      def: 'An old kind of lamp with a thin wire that glows when it is very hot.',
      frDef: 'Un vieux type de lampe avec un fil fin qui brille quand il est très chaud.',
      sent: 'A filament lamp turns most of its energy into heat.',
      frSent: 'Une lampe à filament transforme presque toute son énergie en chaleur.',
      isReal: true,
    },
    {
      word: 'Energy-saving lamp', fr: 'Lampe basse consommation',
      def: 'A lamp that wastes less energy, so it needs less to give the same light.',
      frDef: 'Une lampe qui gaspille moins d’énergie, donc qui en a besoin de moins pour la même lumière.',
      sent: 'The energy-saving lamp needs only 30 joules for the same light.',
      frSent: 'La lampe basse consommation n’a besoin que de 30 joules pour la même lumière.',
      isReal: true,
    },
  ],

  // Four reasoning questions, marked on the mark scheme alone (no English
  // score): one tickable point per line, two lines each. The book's Q3b (sq1),
  // page 119's wood fire (sq2), page 118's two lamps (sq3) and Mr Bowen's bag
  // (sq4, the deck's chase). Suggested words are vocabulary, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'Petrol burns in a car engine. Describe the useful energy and the wasted energy.',
      frTranslation: 'L’essence brûle dans le moteur d’une voiture. Décris l’énergie utile et l’énergie gaspillée.',
      suggestedWords: [['useful energy'], ['wasted energy'], ['chemical']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the useful energy: kinetic energy (the car moves).',
        '1 mark for the wasted energy: thermal energy (the engine and the air get hot) and/or sound (the noise).',
      ],
      modelAnswer: 'The chemical energy in the petrol is changed into kinetic energy, which makes the car move: that is the useful energy. Some is changed into thermal energy that heats the engine and the air, and into sound: that is wasted energy.',
    },
    {
      id: 'sq2',
      question: 'A family cooks with a pot of water on a wood fire. They want heat, but some of the heat is still wasted. Explain where the wasted heat goes.',
      frTranslation: 'Une famille cuisine avec une marmite d’eau sur un feu de bois. Elle veut de la chaleur, mais une partie de la chaleur est quand même gaspillée. Explique où va la chaleur gaspillée.',
      suggestedWords: [['thermal energy', 'heat'], ['dissipated'], ['spread out']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying only the heat that goes into the water (or the food) is useful.',
        '1 mark for naming where the rest goes: it heats the pot, the stands, the ground or the air (or the steam carries it away), where it spreads out / is dissipated.',
      ],
      modelAnswer: 'Only the heat that goes into the water is useful. The fire also heats the metal pot, the stands, the ground and the air around it, and the steam carries heat away. That heat spreads out where it is no use: it is dissipated.',
    },
    {
      id: 'sq3',
      question: 'Lamp A changes 15% of its energy into light. Lamp B changes 50% of its energy into light. They give the same light. Use the percentages to explain which lamp wastes more energy.',
      frTranslation: 'La lampe A transforme 15% de son énergie en lumière. La lampe B transforme 50% de son énergie en lumière. Elles donnent la même lumière. Utilise les pourcentages pour expliquer quelle lampe gaspille le plus d’énergie.',
      suggestedWords: [['percentage', '%'], ['wasted energy'], ['thermal energy', 'heat']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying lamp A wastes more energy.',
        '1 mark for using the numbers: lamp A wastes 85% (as heat) and lamp B only 50%; or lamp A needs more energy in (100 J against 30 J) for the same light.',
      ],
      modelAnswer: 'Lamp A wastes more energy. Only 15% of its energy becomes light, so 85% is wasted as thermal energy. Lamp B wastes only 50%. For the same light, lamp A needs much more energy to go in.',
    },
    {
      id: 'sq4',
      question: 'Mr Bowen catches the hot air from his motorbike engine in a bag. Three hours later, the bag is cold. Explain where the heat went, and why he cannot get it back.',
      frTranslation: 'M. Bowen attrape l’air chaud du moteur de sa moto dans un sac. Trois heures plus tard, le sac est froid. Explique où est partie la chaleur, et pourquoi il ne peut pas la récupérer.',
      suggestedWords: [['dissipated'], ['recover'], ['spread out']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the heat moved out of the hot bag into the colder air and spread out (was dissipated) into the room.',
        '1 mark for saying dissipated energy is too spread out to gather back into one place, so it can never be recovered.',
      ],
      modelAnswer: 'Heat moves from hotter things to colder things, so the heat moved out of the bag into the colder air and spread out through the room: it was dissipated. Once energy has spread out, it cannot be gathered back into one place, so he can never recover it.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
