// src/data/COORD_SCI/B10_1/data.js
// B10 Coordination and response — the nervous system, hormones and
// homeostasis. The first biology unit of the IGCSE Coordinated Science track,
// and the first of three built round Wolsey Hall Assignment 10 ("Coordination,
// Response and Reproduction"): this unit takes the assignment's B10 questions,
// B11_1 and B11_2 take the reproduction ones. English only — the track is not
// bilingual, so there are no `vn*` twins.
//
// What the teacher asked for, and where it lives:
//   · notes that are clearer and carry MORE to write down and to draw — the
//     deck has a "Write This Down" card on nearly every slide and a "Draw This"
//     corner on nine diagrams, and Label It asks for three of those diagrams
//     back with the labels taken off;
//   · one task that goes over the homework itself — HW_REVIEW ("Homework
//     Review"), every B10 question of the assignment asked again and worked.
//
// Gates (the COORD_SCI three, with Notes worth 20 because the deck is long):
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

export const B10_1_DATA = {
  meta: {
    id: 'B10_1',
    title: 'Coordination and Response',
    desc: 'Neurones and the reflex arc, hormones and their glands, and homeostasis: how insulin, glucagon and the skin keep blood glucose and body temperature at their set points.',
    track: 'COORD_SCI',
    icon: 'Brain',
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

  // Key words — the definitions are the ones the deck asks the student to copy,
  // so Vocab is the same sentence met a second time.
  realWords: [
    {
      word: 'Stimulus', isReal: true,
      def: 'A change in the environment that an organism detects and responds to. The plural is stimuli.',
      sent: 'The heat of the pan is the stimulus for the reflex.',
    },
    {
      word: 'Receptor', isReal: true,
      def: 'A cell that detects a stimulus, such as light, sound, touch or temperature.',
      sent: 'A pain receptor in the finger detects the heat.',
    },
    {
      word: 'Effector', isReal: true,
      def: 'A muscle or a gland that carries out a response.',
      sent: 'The arm muscle is the effector that pulls the hand away.',
    },
    {
      word: 'Neurone', isReal: true,
      def: 'A nerve cell, specialised to carry electrical impulses quickly over long distances.',
      sent: 'A motor neurone has a very long axon.',
    },
    {
      word: 'Reflex arc', isReal: true,
      def: 'The pathway an impulse takes in a reflex: receptor, sensory neurone, relay neurone, motor neurone, effector.',
      sent: 'The relay neurone of a reflex arc is in the spinal cord.',
    },
    {
      word: 'Central nervous system', isReal: true,
      def: 'The brain and the spinal cord, which coordinate the impulses travelling through the nervous system.',
      sent: 'The spinal cord is part of the central nervous system.',
    },
    {
      word: 'Hormone', isReal: true,
      def: 'A chemical substance, produced by a gland and carried by the blood, which alters the activity of one or more specific target organs.',
      sent: 'Insulin is a hormone made by the pancreas.',
    },
    {
      word: 'Target organ', isReal: true,
      def: 'An organ whose activity is changed by a particular hormone.',
      sent: 'The liver is a target organ for insulin.',
    },
    {
      word: 'Adrenaline', isReal: true,
      def: 'The hormone secreted by the adrenal glands in fight or flight situations. It increases breathing rate, heart rate and pupil diameter.',
      sent: 'Adrenaline makes the heart beat faster.',
    },
    {
      word: 'Insulin', isReal: true,
      def: 'The hormone secreted by the pancreas when blood glucose is too high. It lowers the blood glucose concentration.',
      sent: 'Insulin is secreted after a meal.',
    },
    {
      word: 'Glucagon', isReal: true,
      def: 'The hormone secreted by the pancreas when blood glucose is too low. It makes the liver break down glycogen, which raises the blood glucose concentration.',
      sent: 'Glucagon raises the blood glucose concentration.',
    },
    {
      word: 'Glycogen', isReal: true,
      def: 'The carbohydrate that the liver stores glucose as. It is a store, not a hormone.',
      sent: 'The liver converts glucose to glycogen.',
    },
    {
      word: 'Homeostasis', isReal: true,
      def: 'The maintenance of a constant internal environment.',
      sent: 'Controlling body temperature is an example of homeostasis.',
    },
    {
      word: 'Negative feedback', isReal: true,
      def: 'A change away from the set point causes a response that brings the value back to the set point.',
      sent: 'Blood glucose is controlled by negative feedback.',
    },
    {
      word: 'Vasodilation', isReal: true,
      def: 'The widening of the arterioles that supply the skin capillaries, so more blood flows near the surface and more heat is lost.',
      sent: 'Vasodilation happens when the body is too hot.',
    },
    {
      word: 'Vasoconstriction', isReal: true,
      def: 'The narrowing of the arterioles that supply the skin capillaries, so less blood flows near the surface and less heat is lost.',
      sent: 'Vasoconstriction helps to keep the body warm.',
    },
  ],

  // Label It: three of the diagrams the deck asked the student to draw, with
  // the labels painted off. Each is the coursebook figure itself (`image`), a
  // blank box on the end of every printed leader line. Pin positions come from
  // docs/coord-science/tools/build_a10_figures.py, which prints them.
  labelIt: [
    {
      id: 'motor_neurone',
      title: 'Label the motor neurone',
      image: 'images/COORD_SCI/B10_1/motor-neurone-blank.jpg', viewBox: '0 0 741 764', font: 26,
      pins: [
        { id: 'p1', x: 380, y: 35, side: 'right', answer: 'dendrite' },
        { id: 'p2', x: 380, y: 184, side: 'right', answer: 'nucleus' },
        { id: 'p3', x: 380, y: 357, side: 'right', answer: 'axon' },
        { id: 'p4', x: 380, y: 466, side: 'right', answer: 'myelin' },
        { id: 'p5', x: 380, y: 734, side: 'right', answer: 'ending' },
      ],
      bank: [
        { val: 'dendrite', text: 'Dendrite' },
        { val: 'nucleus', text: 'Nucleus' },
        { val: 'axon', text: 'Axon' },
        { val: 'myelin', text: 'Myelin sheath' },
        { val: 'ending', text: 'Nerve ending' },
        { val: 'receptor', text: 'Receptor' },
        { val: 'relay', text: 'Relay neurone' },
      ],
    },
    {
      id: 'reflex_arc',
      title: 'Label the reflex arc',
      image: 'images/COORD_SCI/B10_1/reflex-schematic-blank.jpg', viewBox: '0 0 825 577',
      pins: [
        { id: 'p1', x: 650, y: 200, side: 'center', answer: 'receptor' },
        { id: 'p2', x: 427, y: 152, side: 'center', answer: 'sensory' },
        { id: 'p3', x: 354, y: 301, side: 'center', answer: 'relay' },
        { id: 'p4', x: 427, y: 432, side: 'center', answer: 'motor' },
        { id: 'p5', x: 650, y: 386, side: 'center', answer: 'effector' },
      ],
      bank: [
        { val: 'receptor', text: 'Receptor' },
        { val: 'sensory', text: 'Sensory neurone' },
        { val: 'relay', text: 'Relay neurone' },
        { val: 'motor', text: 'Motor neurone' },
        { val: 'effector', text: 'Effector' },
        { val: 'brain', text: 'Brain' },
        { val: 'hormone', text: 'Hormone' },
      ],
    },
    {
      id: 'skin',
      title: 'Label the section through skin',
      image: 'images/COORD_SCI/B10_1/skin-blank.jpg', viewBox: '0 0 1564 726', font: 25, slotW: 210,
      pins: [
        { id: 'p1', x: 626, y: 92, side: 'left', answer: 'erector' },
        { id: 'p2', x: 904, y: 60, side: 'right', answer: 'hair' },
        { id: 'p3', x: 1338, y: 122, side: 'right', answer: 'pore' },
        { id: 'p4', x: 1338, y: 314, side: 'right', answer: 'capillary' },
        { id: 'p5', x: 1338, y: 480, side: 'right', answer: 'gland' },
        { id: 'p6', x: 220, y: 241, side: 'left', answer: 'temp' },
        { id: 'p7', x: 218, y: 671, side: 'left', answer: 'fat' },
      ],
      bank: [
        { val: 'erector', text: 'Hair erector muscle' },
        { val: 'hair', text: 'Hair' },
        { val: 'pore', text: 'Sweat pore' },
        { val: 'capillary', text: 'Blood capillary' },
        { val: 'gland', text: 'Sweat gland' },
        { val: 'temp', text: 'Temperature receptors' },
        { val: 'fat', text: 'Fat cells' },
        { val: 'adrenal', text: 'Adrenal gland' },
        { val: 'pancreas', text: 'Pancreas' },
      ],
    },
  ],

  // Short Answers: the written questions this chapter is examined with, each a
  // clean one-mark-per-line scheme (docs/question-quality.md). Plain text — the
  // prompts are not rendered as maths.
  shortQA: [
    {
      id: 'sq1',
      question: 'A person touches a very hot object and pulls their hand away at once. Describe the pathway that the nerve impulse takes in this reflex action, from the hand to the muscle.',
      suggestedWords: [['receptor'], ['sensory neurone'], ['relay neurone', 'spinal cord'], ['motor neurone', 'muscle']],
      scienceMaxMarks: 4,
      markScheme: [
        '1 mark: a (pain / temperature) receptor in the skin detects the heat (the stimulus).',
        '1 mark: an impulse travels along a sensory neurone to the spinal cord (the CNS).',
        '1 mark: a relay neurone in the spinal cord passes the impulse on.',
        '1 mark: a motor neurone carries the impulse to the arm muscle (the effector), which contracts.',
      ],
      modelAnswer: 'A pain receptor in the skin of the hand detects the heat. It sends an electrical impulse along a sensory neurone to the spinal cord. In the spinal cord a relay neurone passes the impulse to a motor neurone. The motor neurone carries the impulse to the muscle in the arm, which is the effector. The muscle contracts and pulls the hand away.',
    },
    {
      id: 'sq2',
      question: 'Explain why reflex actions are useful to the body, and why a reflex action is faster than a voluntary action.',
      suggestedWords: [['automatic', 'fast'], ['protect', 'damage'], ['brain', 'decision']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a reflex action is automatic and very fast.',
        '1 mark: so it protects the body from harm / reduces damage.',
        '1 mark: it is faster because the impulse does not have to go to the thinking part of the brain — no decision is needed / the pathway is shorter.',
      ],
      modelAnswer: 'Reflex actions are automatic and very fast, so they protect the body from harm, for example by moving a hand away from a hot object before it is badly burnt. A reflex is faster than a voluntary action because the impulse only has to travel through the spinal cord. It does not have to go to the brain for a decision to be made, so the pathway is shorter.',
    },
    {
      id: 'sq3',
      question: 'After a meal that contains carbohydrate, the concentration of glucose in the blood rises above normal. Explain how the body returns the blood glucose concentration to normal.',
      suggestedWords: [['pancreas', 'insulin'], ['liver'], ['glycogen']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the pancreas (detects the rise and) secretes insulin.',
        '1 mark: insulin makes the liver take up glucose from the blood.',
        '1 mark: the liver converts the glucose to glycogen, which is stored, so the blood glucose concentration falls (negative feedback).',
      ],
      modelAnswer: 'The pancreas detects that the blood glucose concentration is too high and secretes the hormone insulin into the blood. Insulin makes the liver take glucose out of the blood. The liver converts the glucose to glycogen and stores it, so the blood glucose concentration falls back to normal. This is an example of negative feedback.',
    },
    {
      id: 'sq4',
      question: 'On a hot day, the temperature of the body starts to rise above 37 degrees Celsius. Describe and explain two ways in which the skin helps to cool the body down.',
      suggestedWords: [['vasodilation', 'arterioles'], ['more blood', 'surface'], ['sweat', 'evaporates']],
      scienceMaxMarks: 4,
      markScheme: [
        '1 mark: vasodilation — the arterioles supplying the skin capillaries get wider.',
        '1 mark: more blood flows near the surface of the skin, so more heat is lost to the air.',
        '1 mark: the sweat glands produce more sweat.',
        '1 mark: the water in the sweat evaporates, taking heat from the skin.',
      ],
      modelAnswer: 'The arterioles that supply the capillaries near the surface of the skin get wider. This is called vasodilation. More blood flows close to the surface, so more heat is lost from the blood to the air. The sweat glands also produce more sweat. The water in the sweat evaporates from the skin, and this takes heat away from the body.',
    },
    {
      id: 'sq5',
      question: 'Describe three ways in which control by hormones is different from control by the nervous system.',
      suggestedWords: [['chemical', 'electrical'], ['blood', 'neurones'], ['slower', 'longer']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: a hormone is a chemical message, but a nerve impulse is an electrical message.',
        '1 mark: hormones are carried in the blood, but nerve impulses travel along neurones.',
        '1 mark: hormones act more slowly, and their effect lasts longer (nervous responses are fast and short-lived).',
      ],
      modelAnswer: 'Hormones are chemicals, but the nervous system sends electrical impulses. Hormones are carried around the body in the blood, but nerve impulses travel along neurones. Hormones act more slowly than nerve impulses, and their effect lasts for longer.',
    },
  ],

  notes: notes,
  workbook: workbook,
  hwReview: hwReview,
  assessment: assessment,
  games: games,
};
