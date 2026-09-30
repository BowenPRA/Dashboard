// src/data/COORD_SCI/B11_2/data.js
// B11.03–B11.04 Reproduction in humans — the reproductive systems, the two
// gametes, fertilisation and implantation, the menstrual cycle, and HIV. The
// third of the three units built round Wolsey Hall Assignment 10
// ("Coordination, Response and Reproduction"); B10_1 has the coordination
// questions and B11_1 the plant ones. English only — the track is not bilingual.
//
// Same shape as B10_1 and B11_1: a deck written to be copied into a notebook,
// Label It asking for four of its diagrams back, and HW_REVIEW going over the
// assignment's own questions on this topic (12, 15, 17, 18, 23 and 24).
//
// Gates:
//   Gate 0 (Learn)  — Notes + Vocab
//   Gate 1 (Apply)  — Label It + Practice + Questions + Homework Review
//   Gate 2 (Quiz)   — the Quiz and the arcade, unlocked together
// 120 XP on offer (capped at 100). Gate 1 sits at 20 of 30 (67%) and Gate 2 at
// 70 of 100 (70%), inside the validator's 80% rule.
//
// Module properties are written out in full (`notes: notes,`) so the audio
// generator never over-reads the realWords array.
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { hwReview } from './hwReview.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const B11_2_DATA = {
  meta: {
    id: 'B11_2',
    title: 'Reproduction in Humans',
    desc: 'The male and female reproductive systems, how sperm and eggs are adapted, fertilisation and implantation, the menstrual cycle, and how HIV is transmitted and controlled.',
    track: 'COORD_SCI',
    icon: 'Dna',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 20,
      tasks: [
        { id: 'LABEL_IT', dbKey: 'p28', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'HW_REVIEW', dbKey: 'p60', maxXP: 20 },
      ],
    },
    {
      // The Quiz and the arcade share one gate. GAMES stays 0 XP — a reward the
      // unit unlocks, not a task paid for by it.
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 70,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words — the definitions are the ones the deck asks the student to copy.
  realWords: [
    {
      word: 'Testis', isReal: true,
      def: 'The male organ that makes sperm and the hormone testosterone. The plural is testes.',
      sent: 'Sperm are made in each testis.',
    },
    {
      word: 'Sperm duct', isReal: true,
      def: 'The tube that carries sperm from a testis to the urethra.',
      sent: 'The sperm duct joins the urethra near the prostate gland.',
    },
    {
      word: 'Prostate gland', isReal: true,
      def: 'The gland that makes the fluid that sperm swim in.',
      sent: 'The prostate gland adds fluid to the sperm.',
    },
    {
      word: 'Urethra', isReal: true,
      def: 'The tube that carries urine out of the body. In males it also carries semen.',
      sent: 'The urethra runs through the penis.',
    },
    {
      word: 'Ovary', isReal: true,
      def: 'The female organ that makes eggs and the hormone oestrogen.',
      sent: 'An egg is released from an ovary each month.',
    },
    {
      word: 'Oviduct', isReal: true,
      def: 'The tube that carries an egg from an ovary to the uterus. Fertilisation takes place here.',
      sent: 'The sperm meets the egg in the oviduct.',
    },
    {
      word: 'Uterus', isReal: true,
      def: 'The organ with a thick muscular wall in which an embryo develops.',
      sent: 'The embryo implants in the lining of the uterus.',
    },
    {
      word: 'Cervix', isReal: true,
      def: 'The ring of muscle at the narrow opening of the uterus.',
      sent: 'Sperm swim through the cervix into the uterus.',
    },
    {
      word: 'Acrosome', isReal: true,
      def: 'The part of the head of a sperm that contains enzymes to digest a way through the jelly coat of an egg.',
      sent: 'Enzymes from the acrosome digest the jelly coat.',
    },
    {
      word: 'Flagellum', isReal: true,
      def: 'The tail of a sperm cell, used for swimming.',
      sent: 'The sperm swims using its flagellum.',
    },
    {
      word: 'Embryo', isReal: true,
      def: 'The ball of cells formed when a zygote divides.',
      sent: 'The embryo sinks into the lining of the uterus.',
    },
    {
      word: 'Implantation', isReal: true,
      def: 'The sinking of an embryo into the lining of the uterus.',
      sent: 'Implantation happens a few days after fertilisation.',
    },
    {
      word: 'Ovulation', isReal: true,
      def: 'The release of an egg from an ovary, at about day 14 of the menstrual cycle.',
      sent: 'Ovulation happens about halfway through the cycle.',
    },
    {
      word: 'Menstruation', isReal: true,
      def: 'The breakdown of the lining of the uterus and its loss through the vagina. It is also called a period.',
      sent: 'Menstruation lasts for about five days.',
    },
    {
      word: 'Meiosis', isReal: true,
      def: 'The kind of cell division that makes gametes. It halves the number of chromosomes.',
      sent: 'Meiosis takes place in the testes and the ovaries.',
    },
    {
      word: 'Antiretroviral', isReal: true,
      def: 'Describes a drug that stops HIV multiplying inside the cells of the body.',
      sent: 'An antiretroviral drug helps a person with HIV to stay healthy.',
    },
  ],

  // Label It: the two systems are the coursebook figures with their labels
  // painted off (`image`; pins printed by
  // docs/coord-science/tools/build_a10_figures.py). The two gametes are this
  // unit's own drawings, whose labels and leader lines are stripped at runtime.
  labelIt: [
    {
      id: 'female',
      title: 'Label the female reproductive system',
      image: 'images/COORD_SCI/B11_2/female-blank.jpg', viewBox: '0 0 1059 948', font: 26,
      pins: [
        { id: 'p1', x: 256, y: 50, side: 'right', answer: 'oviduct' },
        { id: 'p2', x: 782, y: 245, side: 'right', answer: 'ovary' },
        { id: 'p3', x: 566, y: 370, side: 'right', answer: 'wall' },
        { id: 'p4', x: 566, y: 437, side: 'right', answer: 'lining' },
        { id: 'p5', x: 566, y: 570, side: 'right', answer: 'cervix' },
        { id: 'p6', x: 566, y: 695, side: 'right', answer: 'vagina' },
      ],
      bank: [
        { val: 'oviduct', text: 'Oviduct' },
        { val: 'ovary', text: 'Ovary' },
        { val: 'wall', text: 'Uterus wall' },
        { val: 'lining', text: 'Uterus lining' },
        { val: 'cervix', text: 'Cervix' },
        { val: 'vagina', text: 'Vagina' },
        { val: 'urethra', text: 'Urethra' },
        { val: 'bladder', text: 'Bladder' },
      ],
    },
    {
      id: 'male',
      title: 'Label the male reproductive system',
      image: 'images/COORD_SCI/B11_2/male-front-blank.jpg', viewBox: '0 0 1058 691',
      pins: [
        { id: 'p1', x: 804, y: 108, side: 'right', answer: 'bladder' },
        { id: 'p2', x: 806, y: 262, side: 'right', answer: 'prostate' },
        { id: 'p3', x: 804, y: 356, side: 'right', answer: 'duct' },
        { id: 'p4', x: 804, y: 540, side: 'right', answer: 'testis' },
        { id: 'p5', x: 257, y: 333, side: 'left', answer: 'urethra' },
        { id: 'p6', x: 257, y: 530, side: 'left', answer: 'scrotum' },
        { id: 'p7', x: 255, y: 659, side: 'left', answer: 'penis' },
      ],
      bank: [
        { val: 'bladder', text: 'Bladder' },
        { val: 'prostate', text: 'Prostate gland' },
        { val: 'duct', text: 'Sperm duct' },
        { val: 'testis', text: 'Testis' },
        { val: 'urethra', text: 'Urethra' },
        { val: 'scrotum', text: 'Scrotum' },
        { val: 'penis', text: 'Penis' },
        { val: 'ureter', text: 'Ureter' },
        { val: 'ovary', text: 'Ovary' },
      ],
    },
    {
      id: 'sperm',
      title: 'Label the sperm cell',
      inlineSvg: DIAGRAMS.SPERM_CELL, viewBox: '0 0 600 340',
      pins: [
        { id: 'p1', x: 150, y: 274, to: [150, 226], side: 'below', answer: 'flagellum' },
        { id: 'p2', x: 330, y: 114, to: [366, 190], side: 'above', answer: 'middle' },
        { id: 'p3', x: 446, y: 260, to: [458, 168], side: 'below', answer: 'nucleus' },
        { id: 'p4', x: 528, y: 74, to: [518, 128], side: 'above', answer: 'acrosome' },
      ],
      bank: [
        { val: 'flagellum', text: 'Flagellum' },
        { val: 'middle', text: 'Middle piece' },
        { val: 'nucleus', text: 'Nucleus' },
        { val: 'acrosome', text: 'Acrosome' },
        { val: 'jelly', text: 'Jelly coat' },
        { val: 'wall', text: 'Cell wall' },
      ],
    },
    {
      id: 'egg',
      title: 'Label the egg cell',
      inlineSvg: DIAGRAMS.EGG_CELL, viewBox: '0 0 600 340',
      pins: [
        { id: 'p1', x: 406, y: 54, to: [292, 76], side: 'right', answer: 'jelly' },
        { id: 'p2', x: 406, y: 122, to: [306, 122], side: 'right', answer: 'membrane' },
        { id: 'p3', x: 406, y: 190, to: [280, 150], side: 'right', answer: 'cytoplasm' },
        { id: 'p4', x: 406, y: 258, to: [244, 204], side: 'right', answer: 'nucleus' },
      ],
      bank: [
        { val: 'jelly', text: 'Jelly coat' },
        { val: 'membrane', text: 'Cell membrane' },
        { val: 'cytoplasm', text: 'Cytoplasm' },
        { val: 'nucleus', text: 'Nucleus' },
        { val: 'acrosome', text: 'Acrosome' },
        { val: 'flagellum', text: 'Flagellum' },
      ],
    },
  ],

  // Short Answers: the written questions this topic is examined with, each a
  // clean one-mark-per-line scheme (docs/question-quality.md). Plain text.
  shortQA: [
    {
      id: 'sq1',
      question: 'Describe three ways in which a sperm cell is adapted for its function.',
      suggestedWords: [['flagellum', 'swim'], ['mitochondria', 'energy'], ['acrosome', 'enzymes']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: it has a flagellum (tail) so that it can swim to the egg.',
        '1 mark: it has many mitochondria (in the middle piece) to release energy for swimming.',
        '1 mark: it has an acrosome containing enzymes, which digest a way through the jelly coat of the egg.',
      ],
      modelAnswer: 'A sperm cell has a flagellum, which it uses to swim to the egg. Its middle piece contains many mitochondria, which release the energy needed for swimming. Its head has an acrosome containing enzymes, which digest a pathway through the jelly coat of the egg.',
    },
    {
      id: 'sq2',
      question: 'Compare a human egg cell with a human sperm cell. In your answer, write about their size, their numbers and how they move.',
      suggestedWords: [['larger', 'smaller'], ['numbers', 'millions'], ['swim', 'cannot move']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: an egg cell is much larger than a sperm cell.',
        '1 mark: eggs are produced in much smaller numbers (about one a month); sperm are produced in very large numbers (millions).',
        '1 mark: a sperm can swim (is motile), but an egg cannot move by itself.',
      ],
      modelAnswer: 'An egg cell is much larger than a sperm cell, because it contains an energy store. Eggs are produced in much smaller numbers, usually one each month, but sperm are produced in millions. A sperm can swim using its flagellum, but an egg cannot move by itself.',
    },
    {
      id: 'sq3',
      question: 'Describe what happens from the moment a sperm reaches an egg in the oviduct until an embryo has implanted.',
      suggestedWords: [['acrosome', 'jelly coat'], ['nuclei', 'fuse', 'zygote'], ['divides', 'embryo'], ['uterus lining']],
      scienceMaxMarks: 4,
      markScheme: [
        '1 mark: enzymes from the acrosome digest a pathway through the jelly coat, and the head of one sperm enters the egg.',
        '1 mark: the nucleus of the sperm fuses with the nucleus of the egg (fertilisation), forming a zygote.',
        '1 mark: the zygote divides to form a ball of cells, the embryo.',
        '1 mark: the embryo moves down the oviduct and implants in the lining of the uterus.',
      ],
      modelAnswer: 'Enzymes from the acrosome of the sperm digest a pathway through the jelly coat, and the head of one sperm enters the egg. The nucleus of the sperm fuses with the nucleus of the egg. This is fertilisation, and it forms a zygote. The zygote divides many times to form a ball of cells called an embryo. The embryo moves down the oviduct to the uterus and implants in the lining of the uterus.',
    },
    {
      id: 'sq4',
      question: 'Describe the changes in the lining of the uterus during one menstrual cycle of 28 days, and state when ovulation happens.',
      suggestedWords: [['breaks down', 'menstruation'], ['repaired', 'thicker'], ['day 14', 'ovulation']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: in the first (about five) days the lining breaks down and is lost through the vagina — menstruation.',
        '1 mark: the lining is then repaired / becomes thick again and stays thick for the rest of the cycle, ready to receive an embryo.',
        '1 mark: ovulation (the release of an egg) happens at about day 14 / the middle of the cycle.',
      ],
      modelAnswer: 'For about the first five days of the cycle the lining of the uterus breaks down and is lost through the vagina. This is menstruation. After that the lining is repaired and becomes thick again, with many blood vessels, ready to receive an embryo. Ovulation, which is the release of an egg from an ovary, happens at about day 14. If the egg is not fertilised, the lining breaks down again and a new cycle begins.',
    },
    {
      id: 'sq5',
      question: 'Describe three ways in which the spread of HIV can be controlled, and explain how each one works.',
      suggestedWords: [['condom', 'barrier'], ['needles'], ['testing', 'antiretroviral']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: using a condom, which is a barrier that stops body fluids passing between partners.',
        '1 mark: not sharing needles / using sterile needles / screening donated blood, so infected blood does not enter another person.',
        '1 mark: testing and tracing contacts so that people know they are infected, OR treating infected people (including pregnant women) with antiretroviral drugs so they are less likely to pass the virus on.',
      ],
      modelAnswer: 'Using a condom during sexual intercourse acts as a barrier, so that body fluids containing the virus cannot pass from one partner to the other. Not sharing needles, and screening blood before a transfusion, stops infected blood getting into another person. Testing people and tracing their contacts means that they know they have the virus, and treating them with antiretroviral drugs makes them much less likely to pass it on.',
    },
  ],

  notes: notes,
  workbook: workbook,
  hwReview: hwReview,
  assessment: assessment,
  games: games,
};
