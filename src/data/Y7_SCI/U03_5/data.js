// src/data/Y7_SCI/U03_5/data.js
// 3.5 Energy — Year 7 Science self-study unit, reduced from the classroom deck
// y7-science/U03_5 (Learner's Book pp. 105–110). Plan: docs/y7-science/plans/U03_5.md.
//
// The leaner shape (October 2026): the interactive deck, the key words, ONE
// flagship task — Name That Energy (ENERGY_SPOT, p89): find the clue, name the
// energy, store or transfer — four reasoning questions, the quiz and the
// arcade. 105 XP, capped at 100. English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { energySpot } from './energySpot.js';
import { PICS, SCENES, PINS } from './spotArt.js';
import { pose } from './art.js';

const ENERGY_IDS = ['kinetic', 'chemical', 'thermal', 'elastic', 'gravitational', 'electrical', 'sound', 'light'];
// The eight cards carry the deck's actions (run on the spot, eat, fan your face…).
const poseCard = (e) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190" class="w-full h-full">${pose(e, 100, 142, 0.62)}</svg>`;

export const U03_5_DATA = {
  meta: {
    id: 'U03_5',
    title: 'Energy',
    desc: 'How much, what kind, how long? Measure energy in joules; find the clue that names each of the five energy stores and three transfers; and say which stores last for years and which are gone in an hour.',
    track: 'Y7_SCI',
    icon: 'Zap',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_5', title: 'Science 3.5 · Energy' },
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
        { id: 'ENERGY_SPOT', dbKey: 'p89', maxXP: 30 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // The quiz gate is 65 of the 85 XP before it (76%), as in 3.2: one
      // flagship and no Workbook leave 85 XP before the quiz, and the 80% rule
      // (phase-gate-80-percent-rule) needs at least 100 before an 80 gate.
      // Finishing is unchanged: 80+ XP with the quiz sat (isUnitComplete).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 65,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Name That Energy (utils/energySpot.js): fourteen items; the pictures and
  // scenes are this unit's drawings (spotArt.js), the cards its action poses.
  energySpot: {
    ...energySpot,
    pics: PICS,
    poses: Object.fromEntries(ENERGY_IDS.map((e) => [e, poseCard(e)])),
    scenes: Object.fromEntries(Object.entries(SCENES).map(([k, s]) => [k, { ...s, pins: PINS[k] }])),
  },

  // The book's key words the deck copies (energy, joule, store, transfer), the
  // five stores, and luminous, which the transfers table leans on. Electrical,
  // sound and light are everyday words; fuel is glossed on the slides.
  realWords: [
    {
      word: 'Energy', fr: 'Énergie',
      def: 'Something that must be changed or transferred to make anything happen.',
      frDef: 'Ce qui doit être transformé ou transféré pour que quelque chose se passe.',
      sent: 'Climbing stairs and boiling water both need energy.',
      frSent: 'Monter des escaliers et faire bouillir de l’eau demandent de l’énergie.',
      isReal: true,
    },
    {
      word: 'Joule', fr: 'Joule',
      def: 'The unit for measuring energy. Its symbol is J.',
      frDef: 'L’unité qui sert à mesurer l’énergie. Son symbole est J.',
      sent: 'Climbing one floor of stairs takes about 2 000 joules.',
      frSent: 'Monter un étage demande environ 2 000 joules.',
      isReal: true,
    },
    {
      word: 'Energy store', fr: 'Réserve d’énergie',
      def: 'A way that energy is kept until it is used.',
      frDef: 'Une façon de garder l’énergie jusqu’à ce qu’on l’utilise.',
      sent: 'A book on a high shelf has a gravitational potential energy store.',
      frSent: 'Un livre sur une étagère haute a une réserve d’énergie potentielle de pesanteur.',
      isReal: true,
    },
    {
      word: 'Energy transfer', fr: 'Transfert d’énergie',
      def: 'A way that energy moves from one place to another.',
      frDef: 'Une façon dont l’énergie passe d’un endroit à un autre.',
      sent: 'A current in the wires is an electrical energy transfer.',
      frSent: 'Un courant dans les fils est un transfert d’énergie électrique.',
      isReal: true,
    },
    {
      word: 'Kinetic', fr: 'Cinétique',
      def: 'The energy store of anything that is moving.',
      frDef: 'La réserve d’énergie de tout ce qui bouge.',
      sent: 'A bus driving up a hill has a kinetic energy store.',
      frSent: 'Un bus qui monte une colline a une réserve d’énergie cinétique.',
      isReal: true,
    },
    {
      word: 'Chemical', fr: 'Chimique',
      def: 'The energy store in food, fuels and batteries.',
      frDef: 'La réserve d’énergie de la nourriture, des combustibles et des piles.',
      sent: 'A banana keeps its chemical energy for days.',
      frSent: 'Une banane garde son énergie chimique pendant des jours.',
      isReal: true,
    },
    {
      word: 'Thermal', fr: 'Thermique',
      def: 'The energy of hot things: a store, and a transfer from hot things to colder ones.',
      frDef: 'L’énergie des choses chaudes : une réserve, et un transfert du chaud vers le plus froid.',
      sent: 'A hot coffee loses its thermal energy in about an hour.',
      frSent: 'Un café chaud perd son énergie thermique en une heure environ.',
      isReal: true,
    },
    {
      word: 'Elastic potential', fr: 'Potentielle élastique',
      def: 'The energy store of something stretched or squashed out of shape.',
      frDef: 'La réserve d’énergie de quelque chose d’étiré ou d’écrasé.',
      sent: 'A bow pulled back has an elastic potential energy store.',
      frSent: 'Un arc tendu a une réserve d’énergie potentielle élastique.',
      isReal: true,
    },
    {
      word: 'Gravitational potential', fr: 'Potentielle de pesanteur',
      def: 'The energy store of something lifted up high.',
      frDef: 'La réserve d’énergie de quelque chose de soulevé en hauteur.',
      sent: 'Water held behind a dam has a gravitational potential energy store.',
      frSent: 'L’eau retenue par un barrage a une réserve d’énergie potentielle de pesanteur.',
      isReal: true,
    },
    {
      word: 'Luminous', fr: 'Lumineux',
      def: 'Giving out its own light.',
      frDef: 'Qui produit sa propre lumière.',
      sent: 'The Sun is luminous, but the Moon only reflects its light.',
      frSent: 'Le Soleil est lumineux, mais la Lune ne fait que refléter sa lumière.',
      isReal: true,
    },
  ],

  // Four reasoning questions, marked on the mark scheme alone (no English
  // score): one tickable point per line, two lines each. The book's Question 1
  // (sq1), the shelf of Question 2d (sq2), Questions 3 and 4 together (sq3),
  // and Question 2c (sq4), written for a student answering from the deck.
  // Suggested words are vocabulary to use, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'A battery is connected to a bulb by two wires, and the bulb lights up. Name the energy store in the battery and the energy transfer in the wires. Then explain the difference between an energy store and an energy transfer.',
      frTranslation: 'Une pile est reliée à une ampoule par deux fils, et l’ampoule s’allume. Nomme la réserve d’énergie de la pile et le transfert d’énergie dans les fils. Puis explique la différence entre une réserve d’énergie et un transfert d’énergie.',
      suggestedWords: [['energy store'], ['energy transfer'], ['battery', 'wires']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for naming both: chemical energy is stored in the battery, and electrical energy is transferred in the wires.',
        '1 mark for the difference: a store keeps energy until it is used, and a transfer moves energy from one place to another.',
      ],
      modelAnswer: 'The battery has a chemical energy store, and the wires transfer electrical energy to the bulb. An energy store keeps energy until it is used, but an energy transfer moves energy from one place to another.',
    },
    {
      id: 'sq2',
      question: 'Mr Bowen’s book is on a high shelf. It is not moving. Explain why the book still has energy, and name its energy store.',
      frTranslation: 'Le livre de M. Bowen est sur une étagère haute. Il ne bouge pas. Explique pourquoi le livre a quand même de l’énergie, et nomme sa réserve d’énergie.',
      suggestedWords: [['lift', 'lifted'], ['keep', 'keeps'], ['shelf']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining that energy was used to lift the book up, and the book keeps (stores) that energy while it stays up (it can fall if it is knocked off).',
        '1 mark for naming the store: gravitational potential.',
      ],
      modelAnswer: 'Mr Bowen used energy to lift the book up onto the shelf, and the book keeps that energy while it stays up there, even though it is not moving. If it is knocked off, it falls and crashes. The book has a gravitational potential energy store.',
    },
    {
      id: 'sq3',
      question: 'Coal formed millions of years ago, and it still has its energy. A hot coffee is cold in about an hour. Use the words "energy store" to explain the difference.',
      frTranslation: 'Le charbon s’est formé il y a des millions d’années, et il a encore son énergie. Un café chaud est froid en une heure environ. Utilise les mots « réserve d’énergie » pour expliquer la différence.',
      suggestedWords: [['energy store'], ['last', 'lasts'], ['cool', 'cools']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying coal has a chemical energy store, which can last a very long time (millions of years) until it is used.',
        '1 mark for saying the coffee has a thermal energy store, which does not last: its heat goes into the colder room around it as it cools.',
      ],
      modelAnswer: 'Coal has a chemical energy store, and chemical stores can last for millions of years until they are used. The hot coffee has a thermal energy store, which does not last: its heat goes into the colder air and desk around it, so it is cold in about an hour.',
    },
    {
      id: 'sq4',
      question: 'A rock is falling off a cliff. Name two energy stores that the rock has, and give the clue for each one.',
      frTranslation: 'Un rocher tombe d’une falaise. Nomme deux réserves d’énergie du rocher, et donne l’indice de chacune.',
      suggestedWords: [['clue'], ['cliff'], ['energy store']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for kinetic, because the rock is moving (falling).',
        '1 mark for gravitational potential, because the rock is still high up above the ground.',
      ],
      modelAnswer: 'The rock has a kinetic energy store, because it is moving. It also has a gravitational potential energy store, because it is still high up above the ground.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
