// src/data/Y7_SCI/U03_6/data.js
// 3.6 Changes in Energy — Year 7 Science self-study unit, the twin of the
// classroom deck y7-science/U03_6 (Learner's Book pp. 111–116).
// Plan: docs/y7-science/plans/U03_6.md.
//
// The leaner shape (October 2026, "more polish and less busy work"): the
// interactive deck, the key words, ONE flagship task — From… To…
// (ENERGY_CHANGE, p90), the book's energy-change diagrams built box by box —
// three reasoning questions, the quiz and the arcade. 105 XP, capped at 100.
// English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { fromTo } from './fromTo.js';
import { SCENE_PICS } from './scenes.js';

export const U03_6_DATA = {
  meta: {
    id: 'U03_6',
    title: 'Changes in Energy',
    desc: 'Change it, draw it, follow it. When something happens, energy changes: a bouncing ball, an event or a process; energy-change diagrams with boxes and arrows, from a kettle to a power station; useful and dangerous changes; and heat, which moves from hotter to colder.',
    track: 'Y7_SCI',
    icon: 'Repeat',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_6', title: 'Science 3.6 · Changes in Energy' },
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
        { id: 'ENERGY_CHANGE', dbKey: 'p90', maxXP: 35 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 15 },
      ],
    },
    {
      // The quiz gate is 65 of the 85 XP before it (76%), not the usual 80,
      // as in 3.2: one flagship task means only 85 XP comes before the quiz,
      // and the 80% rule (phase-gate-80-percent-rule) needs at least 100
      // before an 80 gate. Finishing is unchanged: 80+ XP with the quiz sat
      // (isUnitComplete). Approved with the plan, 3 Nov 2026.
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 65,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // From… To… (utils/energyChange.js): sixteen items; the pictures are this
  // unit's drawings, by scene.
  energyChange: {
    ...fromTo,
    pictures: SCENE_PICS,
  },

  // The book's three key words (change, event, process), the diagram, the
  // book's "useful" (and its opposite on the same page), and the words the
  // deck says aloud: generator, typhoon, freeze.
  realWords: [
    {
      word: 'Change', fr: 'Changer, transformer',
      def: 'To become different. Energy changes from one kind to another when something happens.',
      frDef: 'Devenir différent. L’énergie change d’une forme à une autre quand il se passe quelque chose.',
      sent: 'In a kettle, electrical energy changes into thermal energy.',
      frSent: 'Dans une bouilloire, l’énergie électrique se transforme en énergie thermique.',
      isReal: true,
    },
    {
      word: 'Event', fr: 'Un événement',
      def: 'Something that happens once and is over quickly.',
      frDef: 'Quelque chose qui arrive une fois et qui est vite fini.',
      sent: 'A book falling off a shelf is an event.',
      frSent: 'Un livre qui tombe d’une étagère est un événement.',
      isReal: true,
    },
    {
      word: 'Process', fr: 'Un processus',
      def: 'Something that keeps going for a long time.',
      frDef: 'Quelque chose qui continue longtemps.',
      sent: 'Burning is a process: a candle burns for hours.',
      frSent: 'La combustion est un processus : une bougie brûle pendant des heures.',
      isReal: true,
    },
    {
      word: 'Energy-change diagram', fr: 'Un schéma de transformation',
      def: 'A drawing with a box for each kind of energy and an arrow for each change.',
      frDef: 'Un dessin avec une case pour chaque forme d’énergie et une flèche pour chaque changement.',
      sent: 'The energy-change diagram for a television has two arrows from one box.',
      frSent: 'Le schéma de transformation d’une télévision a deux flèches depuis une case.',
      isReal: true,
    },
    {
      word: 'Useful', fr: 'Utile',
      def: 'Doing what we want. A useful energy change is the one we want.',
      frDef: 'Qui fait ce que l’on veut. Un changement utile, c’est celui que l’on veut.',
      sent: 'The useful energy change in a lamp is electrical to light.',
      frSent: 'Le changement utile dans une lampe, c’est électrique en lumineuse.',
      isReal: true,
    },
    {
      word: 'Dangerous', fr: 'Dangereux',
      def: 'Able to hurt people or damage things.',
      frDef: 'Qui peut blesser des gens ou abîmer des choses.',
      sent: 'The wind in a typhoon is dangerous: it can knock down trees.',
      frSent: 'Le vent d’un typhon est dangereux : il peut abattre des arbres.',
      isReal: true,
    },
    {
      word: 'Generator', fr: 'Un générateur',
      def: 'A machine that spins to make electricity.',
      frDef: 'Une machine qui tourne pour faire de l’électricité.',
      sent: 'In a power station, hot gas spins the generators.',
      frSent: 'Dans une centrale, le gaz chaud fait tourner les générateurs.',
      isReal: true,
    },
    {
      word: 'Typhoon', fr: 'Un typhon',
      def: 'A huge storm with very strong winds.',
      frDef: 'Une énorme tempête avec des vents très forts.',
      sent: 'Typhoon Yagi knocked down thousands of trees in Hà Nội.',
      frSent: 'Le typhon Yagi a abattu des milliers d’arbres à Hà Nội.',
      isReal: true,
    },
    {
      word: 'Freeze', fr: 'Geler',
      def: 'To turn from a liquid into a solid because it gets cold.',
      frDef: 'Passer de l’état liquide à l’état solide parce que ça refroidit.',
      sent: 'Water freezes when its thermal energy moves out into the colder freezer air.',
      frSent: 'L’eau gèle quand son énergie thermique part dans l’air plus froid du congélateur.',
      isReal: true,
    },
  ],

  // Three reasoning questions, marked on the mark scheme alone (no English
  // score): one tickable point per line, two lines each. The book's Question 1
  // applied to the starter (sq1), its freezing-water Activity (sq2) and its
  // candle experiment, Questions 2 and 5 (sq3). Suggested words are
  // vocabulary to use, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'Mr Bowen drops a tennis ball from 2 m. It bounces back up to only 1.1 m. Describe the energy changes as it falls and bounces, and explain why it does not get back to 2 m.',
      frTranslation: 'M. Bowen lâche une balle de tennis de 2 m. Elle ne remonte qu’à 1.1 m. Décris les changements d’énergie pendant qu’elle tombe et rebondit, et explique pourquoi elle ne remonte pas à 2 m.',
      suggestedWords: [['gravitational potential'], ['kinetic'], ['elastic potential', 'squashes']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for the changes: gravitational potential to kinetic as it falls (and kinetic to elastic potential and back to kinetic at the bounce, then kinetic to gravitational potential as it rises).',
        '1 mark for explaining that at the bounce some of the energy changed to sound and heat (thermal) and left the ball, so less energy is left to lift it back up.',
      ],
      modelAnswer: 'As the ball falls, its gravitational potential energy changes to kinetic energy. When it hits the floor it squashes, so the kinetic energy changes to elastic potential energy, and then back to kinetic as it springs up. At the bounce, some of the energy changes to sound and heat, which leave the ball, so there is less energy to change back into gravitational potential. That is why it only reaches 1.1 m.',
    },
    {
      id: 'sq2',
      question: 'A cup of water at 25 °C is put in a freezer at −18 °C, and it turns to ice. What moves, and in which direction? Explain why.',
      frTranslation: 'Un verre d’eau à 25 °C est mis dans un congélateur à −18 °C, et il devient de la glace. Qu’est-ce qui bouge, et dans quel sens ? Explique pourquoi.',
      suggestedWords: [['thermal energy', 'heat'], ['hotter'], ['colder']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying thermal energy (heat) moves out of the water into the freezer air — not cold moving into the water.',
        '1 mark for explaining that thermal energy moves from hotter things to colder things: the water (25 °C) is hotter than the freezer air (−18 °C), so the water loses energy and gets colder until it freezes.',
      ],
      modelAnswer: 'Thermal energy moves out of the water into the air in the freezer. Cold does not move into the water. This happens because thermal energy always moves from hotter things to colder things, and the water at 25 °C is hotter than the air at −18 °C. The water loses thermal energy, so it gets colder and colder until it freezes.',
    },
    {
      id: 'sq3',
      question: 'In the candle experiment, a candle heats some cooking oil in a glass beaker. Where did the energy that heated the oil come from? Suggest one change to the experiment so that the oil heats up faster.',
      frTranslation: 'Dans l’expérience de la bougie, une bougie chauffe de l’huile dans un bécher en verre. D’où vient l’énergie qui a chauffé l’huile ? Propose un changement à l’expérience pour que l’huile chauffe plus vite.',
      suggestedWords: [['chemical'], ['wax', 'burns'], ['thermal']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the energy came from the chemical energy stored in the candle wax, released when it burns (chemical to thermal).',
        '1 mark for one sensible change: put the candle closer to the beaker; put a lid on the beaker; use a metal can instead of glass; shield the flame from draughts; wrap the sides of the beaker; use more candles or less oil.',
      ],
      modelAnswer: 'The energy came from the chemical energy stored in the wax of the candle. When the wax burns, chemical energy changes into thermal energy, and some of it heats the oil. To make the oil heat up faster, I would put a lid on the beaker so less heat escapes into the air.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
