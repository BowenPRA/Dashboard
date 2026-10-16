// src/data/Y7_SCI/U03_1/data.js
// 3.1 Gravity, Weight and Mass — Year 7 Science self-study unit, reduced from
// the classroom lesson y7-science/U03_1 (one deck taught over two periods) to
// the Y7 Science shape of U02_8 (docs/y7-science/unit2-close-engines.md §1):
// an interactive deck (16 scored items), the deck's nine key words, a mixed
// Workbook, Weigh It (the formula triangle, WEIGH_IT p80), Label It on three
// force pictures, cloze reading and four reasoning questions. 145 XP
// available, capped at 100.
//
// The first Year 7 Science unit in English and French only (meta.vietnamese:
// false): every learner-facing string has a …Fr twin and no …Vn twin.
// The Learner's Book's Questions 1–12 (pp. 75–84) live in the Workbook, the
// Short Answers and Label It, rewritten; the deck's checks are its own.
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { workbook } from './workbook.js';
import { weighIt } from './weighIt.js';
import { DIAGRAMS } from './diagrams.js';

export const U03_1_DATA = {
  meta: {
    id: 'U03_1',
    title: 'Gravity, Weight and Mass',
    desc: 'Do heavy things fall faster? A bowling ball, a hammer and a feather on the Moon, and Galileo — then gravity, weight in newtons, the contact force, mass in kilograms, and W = m × 10 on every planet.',
    track: 'Y7_SCI',
    icon: 'Globe',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_1', title: 'Science 3.1 · Gravity, Weight and Mass' },
    ],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 15 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%).
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 20 },
        { id: 'WEIGH_IT', dbKey: 'p80', maxXP: 20 },
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 15 },
        { id: 'READ_COMP', dbKey: 'p4', maxXP: 15 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // Quiz and arcade share one gate at 80 of the 125 XP before it (64%).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 80,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Weigh It (utils/weighIt.js): fifteen items, weight on Earth → two steps.
  weighIt: weighIt,

  // The deck's eight Key word cards, plus "air resistance" — the deck's
  // paper-and-feather word, which the questions lean on.
  realWords: [
    {
      word: 'Gravity', fr: 'Gravité',
      def: 'A force that pulls objects towards each other.',
      frDef: 'Une force qui attire les objets les uns vers les autres.',
      sent: 'Gravity pulls a dropped spoon down to the kitchen floor.',
      frSent: 'La gravité tire une cuillère lâchée vers le sol de la cuisine.',
      isReal: true,
    },
    {
      word: 'Weight', fr: 'Poids',
      def: 'The force of gravity on an object. It is measured in newtons.',
      frDef: 'La force de gravité sur un objet. Il se mesure en newtons.',
      sent: 'A bunch of bananas has a weight of about 9 newtons.',
      frSent: 'Un régime de bananes a un poids d’environ 9 newtons.',
      isReal: true,
    },
    {
      word: 'Newton', fr: 'Newton',
      def: 'The unit of force, and so of weight. Its symbol is N.',
      frDef: 'L’unité de force, donc de poids. Son symbole est N.',
      sent: 'A bar of soap weighs about one newton.',
      frSent: 'Une savonnette pèse environ un newton.',
      isReal: true,
    },
    {
      word: 'Contact force', fr: 'Force de contact',
      def: 'The push from a surface that holds an object up.',
      frDef: 'La poussée d’une surface qui soutient un objet.',
      sent: 'The shelf gives a contact force that holds up the plant pot.',
      frSent: 'L’étagère exerce une force de contact qui soutient le pot de fleurs.',
      isReal: true,
    },
    {
      word: 'Mass', fr: 'Masse',
      def: 'The quantity (amount) of matter in an object. It is measured in kilograms.',
      frDef: 'La quantité de matière dans un objet. Elle se mesure en kilogrammes.',
      sent: 'A full water bottle has a mass of 1.5 kg on the Earth and on Mars.',
      frSent: 'Une bouteille d’eau pleine a une masse de 1.5 kg sur la Terre et sur Mars.',
      isReal: true,
    },
    {
      word: 'Kilogram', fr: 'Kilogramme',
      def: 'The unit of mass. Its symbol is kg.',
      frDef: 'L’unité de masse. Son symbole est kg.',
      sent: 'There are 1000 grams in one kilogram.',
      frSent: 'Il y a 1000 grammes dans un kilogramme.',
      isReal: true,
    },
    {
      word: 'Strength of gravity', fr: 'Intensité de la gravité',
      def: 'How hard gravity pulls on each kilogram, in newtons per kilogram (N/kg).',
      frDef: 'La force avec laquelle la gravité tire sur chaque kilogramme, en newtons par kilogramme (N/kg).',
      sent: 'The strength of gravity on Jupiter is much bigger than on the Earth.',
      frSent: 'L’intensité de la gravité sur Jupiter est bien plus grande que sur la Terre.',
      isReal: true,
    },
    {
      word: 'Accelerate', fr: 'Accélérer',
      def: 'To speed up.',
      frDef: 'Aller de plus en plus vite.',
      sent: 'A bus accelerates when it pulls away from the bus stop.',
      frSent: 'Un bus accélère quand il quitte l’arrêt.',
      isReal: true,
    },
    {
      word: 'Air resistance', fr: 'Résistance de l’air',
      def: 'The push of the air on a moving object. It slows the object down.',
      frDef: 'La poussée de l’air sur un objet qui bouge. Elle le ralentit.',
      sent: 'Air resistance makes a parachute fall slowly.',
      frSent: 'La résistance de l’air fait tomber un parachute lentement.',
      isReal: true,
    },
  ],

  passages: [
    {
      id: 'passage_1',
      title: 'Heavy and Light',
      text: 'For two thousand years, people believed that heavy things fall faster than light things. Galileo said they were wrong. Drop a book and an eraser together and you hear one bang: {gravity} pulls both of them down, and they land at the same time. A flat sheet of paper is slower, because {air resistance} pushes up on it. On the Moon there is no air at all, so an astronaut’s hammer and feather land together. As they fall, they both {accelerate}: every second, they go faster than before.',
      frTitle: 'Lourd et léger',
      frText: 'Pendant deux mille ans, on a cru que les objets lourds tombent plus vite que les objets légers. Galilée a dit que c’était faux. Lâche un livre et une gomme ensemble et tu entends un seul bruit : la {gravity} (gravité) les tire tous les deux vers le bas, et ils arrivent en même temps. Une feuille de papier à plat est plus lente, parce que la {air resistance} (résistance de l’air) pousse dessous. Sur la Lune, il n’y a pas d’air du tout, alors le marteau et la plume d’un astronaute arrivent ensemble. Pendant leur chute, ils vont tous les deux {accelerate} (accélérer) : chaque seconde, ils vont plus vite qu’avant.',
    },
    {
      id: 'passage_2',
      title: 'The Push Back',
      text: 'Your {weight} is the force of gravity on you. Like every force, it is measured in newtons, and the symbol for one {newton} is N. When you sit on a chair, gravity pulls you down, but you do not fall through the seat. The chair pushes back up with a {contact force}. If nothing moves, the push is exactly as big as your weight. Soft sand cannot push back hard enough, so a heavy car sinks into it until the push grows to match.',
      frTitle: 'La poussée en retour',
      frText: 'Ton {weight} (poids), c’est la force de gravité sur toi. Comme toute force, il se mesure en newtons, et le symbole d’un {newton} est N. Quand tu t’assois sur une chaise, la gravité te tire vers le bas, mais tu ne passes pas à travers le siège. La chaise repousse vers le haut avec une {contact force} (force de contact). Si rien ne bouge, la poussée est exactement aussi grande que ton poids. Le sable mou ne peut pas repousser assez fort, alors une voiture lourde s’y enfonce, jusqu’à ce que la poussée devienne assez grande.',
    },
    {
      id: 'passage_3',
      title: 'The Same Everywhere',
      text: 'The {mass} of an object is the amount of matter in it, measured in kilograms. One {kilogram} is 1000 grams. Mass does not change when you travel, but weight does, because the {strength of gravity} is different on each planet: 10 N/kg on the Earth, but only 1.6 N/kg on the Moon. To find a weight, multiply the mass by the strength of gravity. An astronaut with a mass of 70 kg weighs 700 N on the Earth and only 112 N on the Moon.',
      frTitle: 'Partout la même',
      frText: 'La {mass} (masse) d’un objet, c’est la quantité de matière qu’il contient, mesurée en kilogrammes. Un {kilogram} (kilogramme) vaut 1000 grammes. La masse ne change pas quand tu voyages, mais le poids, si, parce que la {strength of gravity} (intensité de la gravité) est différente sur chaque planète : 10 N/kg sur la Terre, mais seulement 1.6 N/kg sur la Lune. Pour trouver un poids, multiplie la masse par l’intensité de la gravité. Un astronaute de masse 70 kg pèse 700 N sur la Terre et seulement 112 N sur la Lune.',
    },
  ],

  // The book's reasoning questions (4, 8, 11, 12), rewritten so a student can
  // answer them from the deck.
  shortQA: [
    {
      id: 'sq1',
      question: 'Some people say there is no gravity on the Moon. Use what you know about mass and gravity to explain why they are wrong.',
      frTranslation: 'Certains disent qu’il n’y a pas de gravité sur la Lune. Utilise ce que tu sais sur la masse et la gravité pour expliquer pourquoi ils ont tort.',
      suggestedWords: [['the Moon', 'mass', 'large'], ['every object', 'pulls', 'gravity'], ['weaker', '1.6 N/kg', 'hammer fell']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Moon has a (large) mass, and objects with mass have gravity / pull other objects towards them.',
        '1 mark for saying the Moon’s gravity is weaker than the Earth’s (1.6 N/kg, not 10 N/kg), or for evidence that it pulls: the hammer and feather fell; astronauts come back down when they jump.',
      ],
      modelAnswer: 'They are wrong because the Moon has a very large mass, and every object with mass has gravity that pulls other objects towards it. The Moon’s gravity is weaker than the Earth’s — 1.6 N/kg instead of 10 N/kg — but it is still there. That is why the hammer and the feather fell to the ground, and why astronauts come back down when they jump.',
    },
    {
      id: 'sq2',
      question: 'Bathroom scales show a number in kilograms. Explain what really pushes down on the scales, and how the scales turn it into kilograms.',
      frTranslation: 'Un pèse-personne affiche un nombre en kilogrammes. Explique ce qui appuie vraiment sur le pèse-personne, et comment il le transforme en kilogrammes.',
      suggestedWords: [['weight', 'force', 'newtons'], ['pushes down', 'gravity'], ['divide', '10', 'mass in kg']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying your weight pushes down on the scales — a force, in newtons (the pull of gravity on you).',
        '1 mark for explaining that the scales divide that weight by 10 (the strength of gravity on Earth) and show the answer, your mass, in kilograms.',
      ],
      modelAnswer: 'Your weight pushes down on the scales. Weight is the force of gravity on you, so it is measured in newtons. The scales are made for the Earth, where the strength of gravity is 10 N/kg, so they divide your weight by 10 and show the answer in kilograms. That number is your mass.',
    },
    {
      id: 'sq3',
      question: 'A spacecraft needs a much bigger force to take off from the Earth than to take off from the Moon, even though its mass is the same. Explain why.',
      frTranslation: 'Une fusée a besoin d’une force bien plus grande pour décoller de la Terre que pour décoller de la Lune, alors que sa masse est la même. Explique pourquoi.',
      suggestedWords: [['strength of gravity', 'stronger', 'Earth'], ['10 N/kg', '1.6 N/kg'], ['weight', 'bigger', 'lift']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the strength of gravity is greater on the Earth (10 N/kg) than on the Moon (1.6 N/kg).',
        '1 mark for explaining that the same mass therefore has a bigger weight on the Earth (about six times bigger), and the force must be bigger than the weight to lift it.',
      ],
      modelAnswer: 'The mass of the spacecraft is the same in both places, but the strength of gravity is not: 10 N/kg on the Earth and only 1.6 N/kg on the Moon. Weight is mass times the strength of gravity, so the spacecraft’s weight is about six times bigger on the Earth. To take off, the force from the engines must be bigger than the weight, so leaving the Earth needs a much bigger force.',
    },
    {
      id: 'sq4',
      question: 'A car drives onto soft mud and starts to sink. The deeper it goes, the harder the mud pushes up. Explain why the car sinks at first, and when it stops sinking.',
      frTranslation: 'Une voiture roule sur de la boue molle et commence à s’enfoncer. Plus elle s’enfonce, plus la boue pousse fort vers le haut. Explique pourquoi la voiture s’enfonce au début, et quand elle arrête de s’enfoncer.',
      suggestedWords: [['contact force', 'smaller', 'weight'], ['sinks', 'pushes up'], ['equal', 'balanced', 'stops']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for explaining that at first the contact force from the mud is smaller than the car’s weight, so the car moves down (sinks).',
        '1 mark for saying it stops when the contact force has grown to be equal to the weight — the forces are balanced.',
      ],
      modelAnswer: 'At first the soft mud cannot push up hard enough: the contact force is smaller than the car’s weight, so the weight wins and the car sinks. As it sinks deeper, the mud pushes up harder. The car stops sinking when the contact force has grown to be equal to its weight, because then the forces are balanced.',
    },
  ],

  // Label It (ENGAGEMENT-PLAN §2.2): three new force pictures, labels stripped
  // at runtime. Coordinates from `node scripts/svg-coords.mjs Y7_SCI/U03_1 <KEY>`:
  // each box sits where its printed label was, its leader on the part. Weight
  // is drawn from the object's centre towards the centre of the Earth; the
  // contact force from the surface. Every bank's distractors are absent from
  // the drawing.
  labelIt: [
    {
      id: 'desk',
      title: 'Label the forces on the book', titleFr: 'Légende les forces sur le livre',
      inlineSvg: DIAGRAMS.FORCE_DESK, viewBox: '0 0 840 560',
      pins: [
        { id: 'p1', x: 306, y: 230, to: [420, 322], side: 'left', answer: 'centre' },
        { id: 'p2', x: 552, y: 224, to: [470, 224], side: 'right', answer: 'contact' },
        { id: 'p3', x: 552, y: 492, to: [420, 492], side: 'right', answer: 'weight' },
        { id: 'p4', x: 230, y: 458, to: [280, 394], side: 'below', answer: 'surface' },
      ],
      bank: [
        { val: 'weight', text: 'Weight', textFr: 'Poids' },
        { val: 'contact', text: 'Contact force', textFr: 'Force de contact' },
        { val: 'centre', text: 'Centre of the book', textFr: 'Centre du livre' },
        { val: 'surface', text: 'Surface of the desk', textFr: 'Surface de la table' },
        { val: 'mass', text: 'Mass', textFr: 'Masse' },
        { val: 'air', text: 'Air resistance', textFr: 'Résistance de l’air' },
      ],
    },
    {
      id: 'globe',
      title: 'Label the forces around the Earth', titleFr: 'Légende les forces autour de la Terre',
      inlineSvg: DIAGRAMS.FORCE_GLOBE, viewBox: '0 0 840 560',
      pins: [
        { id: 'p1', x: 552, y: 140, to: [300, 140], side: 'right', answer: 'weight' },
        { id: 'p2', x: 552, y: 280, to: [300, 280], side: 'right', answer: 'centre' },
        { id: 'p3', x: 552, y: 420, to: [300, 420], side: 'right', answer: 'weight' },
        { id: 'p4', x: 552, y: 520, to: [328, 520], side: 'right', answer: 'contact' },
        { id: 'p5', x: 130, y: 492, to: [276, 462], side: 'below', answer: 'south' },
      ],
      bank: [
        { val: 'weight', text: 'Weight', textFr: 'Poids' },
        { val: 'centre', text: 'Centre of the Earth', textFr: 'Centre de la Terre' },
        { val: 'contact', text: 'Contact force', textFr: 'Force de contact' },
        { val: 'south', text: 'South Pole', textFr: 'Pôle Sud' },
        { val: 'away', text: 'Weight — away from the Earth', textFr: 'Poids — loin de la Terre' },
        { val: 'air', text: 'Air resistance', textFr: 'Résistance de l’air' },
      ],
    },
    {
      id: 'sink',
      title: 'Label the crate on rock and in mud', titleFr: 'Légende la caisse sur la roche et dans la boue',
      inlineSvg: DIAGRAMS.FORCE_SINK, viewBox: '0 0 1120 440',
      slotW: 270,
      pins: [
        { id: 'p1', x: 285, y: 50, answer: 'balanced' },
        { id: 'p2', x: 296, y: 206, to: [410, 230], side: 'left', answer: 'contact' },
        { id: 'p3', x: 336, y: 388, to: [365, 388], side: 'left', answer: 'weight' },
        { id: 'p4', x: 835, y: 50, answer: 'sinks' },
        { id: 'p5', x: 846, y: 196, to: [960, 250], side: 'left', answer: 'contact' },
        { id: 'p6', x: 886, y: 400, to: [915, 400], side: 'left', answer: 'weight' },
      ],
      bank: [
        { val: 'weight', text: 'Weight', textFr: 'Poids' },
        { val: 'contact', text: 'Contact force', textFr: 'Force de contact' },
        { val: 'balanced', text: 'Balanced: it stays still', textFr: 'Équilibré : elle ne bouge pas' },
        { val: 'sinks', text: 'Weight bigger: it sinks', textFr: 'Poids plus grand : elle s’enfonce' },
        { val: 'wrong', text: 'Contact force bigger: it sinks', textFr: 'Force de contact plus grande : elle s’enfonce' },
        { val: 'mass', text: 'Mass', textFr: 'Masse' },
      ],
    },
  ],

  notes: notes,
  workbook: workbook,
  assessment: assessment,
  games: games,
};
