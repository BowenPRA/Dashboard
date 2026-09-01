// src/data/COORD_SCI/U04_1/data.js
// C4.1 Electrolysis — the first unit of the IGCSE Coordinated Science track, a
// self-study adaptation of the classroom deck (C:\Users\bowen\lessons). English
// only: this track is not bilingual, so there are no `vn*` twins.
//
// Gate structure (the teacher's spec):
//   Gate 0 (Learn)   — Notes + Vocab
//   Gate 1 (Apply)   — Symbol Equations + Practice + Questions + Source Analysis
//   Gate 2 (Quiz)    — the Quiz and the Games arcade, unlocked together
//
// Task XP totals 110 (capped at 100 by unitXPOf), so a student can drop one task
// and still finish. Module properties are written out in full (`notes: notes,`)
// so the audio generator never over-reads the realWords array (see the Y7 note).
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { formulaWrite } from './formulaWrite.js';
import { symbolEq } from './symbolEq.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { DIAGRAMS } from './diagrams.js';

export const U04_1_DATA = {
  meta: {
    id: 'U04_1',
    title: 'Electrolysis',
    desc: 'Define electrolysis and electrolytes, read the lead(II) bromide equation and its half-equations, and predict and write symbol equations for molten binary salts.',
    track: 'COORD_SCI',
    icon: 'FlaskConical',
  },

  phases: [
    {
      id: 'concept',
      title: 'Gate 0: Learn',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Gate 1: Apply',
      threshold: 15,
      tasks: [
        { id: 'FORMULA_WRITE', dbKey: 'p20', maxXP: 20 },
        { id: 'SYMBOL_EQ', dbKey: 'p19', maxXP: 20 },
        { id: 'WORKBOOK', dbKey: 'p11', maxXP: 10 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
        { id: 'DIAGRAMS', dbKey: 'p7', maxXP: 20 },
      ],
    },
    {
      // The Quiz and the arcade share one gate: both open at 70 XP. GAMES stays
      // 0 XP (a reward the unit unlocks, not a task paid for by it).
      id: 'mastery',
      title: 'Gate 2: Quiz & Arcade',
      threshold: 70,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Key words — the vocabulary a student needs to READ the questions and the
  // exam. English-only (word + def + sentence); Recognition uses word + def.
  realWords: [
    {
      word: 'Electrolyte', isReal: true,
      def: 'A liquid or solution that conducts electricity and is broken down by it, because it contains ions free to move.',
      sent: 'Molten lead(II) bromide is an electrolyte.',
    },
    {
      word: 'Electrolysis', isReal: true,
      def: 'The breakdown of an ionic compound, when molten or dissolved, by passing an electric current through it.',
      sent: 'Electrolysis of molten lead bromide gives lead and bromine.',
    },
    {
      word: 'Electrode', isReal: true,
      def: 'A rod or plate that carries the current into and out of the electrolyte.',
      sent: 'The two electrodes are often made of graphite.',
    },
    {
      word: 'Inert', isReal: true,
      def: 'Unreactive; an inert electrode (graphite or platinum) carries the current without reacting.',
      sent: 'Graphite is used because it is inert.',
    },
    {
      word: 'Cathode', isReal: true,
      def: 'The negative (−) electrode, where positive ions gain electrons.',
      sent: 'The metal forms at the cathode.',
    },
    {
      word: 'Anode', isReal: true,
      def: 'The positive (+) electrode, where negative ions lose electrons.',
      sent: 'Bromine gas forms at the anode.',
    },
    {
      word: 'Cation', isReal: true,
      def: 'A positive ion; it is attracted to the cathode.',
      sent: 'A lead cation, Pb2+, moves to the cathode.',
    },
    {
      word: 'Anion', isReal: true,
      def: 'A negative ion; it is attracted to the anode.',
      sent: 'A bromide anion, Br-, moves to the anode.',
    },
    {
      word: 'Reduction', isReal: true,
      def: 'Gain of electrons; it happens at the cathode.',
      sent: 'Reduction of Pb2+ makes lead metal.',
    },
    {
      word: 'Oxidation', isReal: true,
      def: 'Loss of electrons; it happens at the anode.',
      sent: 'Oxidation of bromide ions makes bromine.',
    },
    {
      word: 'Half-equation', isReal: true,
      def: 'An ionic equation for what happens at one electrode, showing the electrons gained or lost.',
      sent: 'The cathode half-equation shows two electrons gained.',
    },
  ],

  // Short Answers: reasoning questions, each a clean one-mark-per-line scheme
  // (docs/question-quality.md). Prompts are plain text — ShortAnswers.jsx does
  // not render $…$.
  shortQA: [
    {
      id: 'sq1',
      question: 'A copper wire and a beaker of salty water both conduct electricity. Explain how the way each carries the current is different.',
      suggestedWords: [['electrons'], ['ions'], ['broken down', 'changed']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: in the metal, free electrons move to carry the current.',
        '1 mark: in the salty water, ions move to carry the current.',
        '1 mark: the metal is unchanged, but the electrolyte is broken down into new substances.',
      ],
      modelAnswer: 'In the copper wire, free electrons move through the metal and the copper itself is not changed. In the salty water, it is the ions that move to carry the current, and the compound is broken down into new substances at the electrodes.',
    },
    {
      id: 'sq2',
      question: 'Explain why an ionic compound must be molten or dissolved before it can be electrolysed, but cannot be electrolysed as a solid.',
      suggestedWords: [['ions'], ['lattice', 'fixed'], ['free to move']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: an ionic compound is made of charged ions.',
        '1 mark: in a solid the ions are locked in a fixed lattice and cannot move.',
        '1 mark: when molten or dissolved the ions are free to move to the electrodes, so it can conduct and be broken down.',
      ],
      modelAnswer: 'An ionic compound is a lattice of charged ions. In a solid these ions are locked in fixed positions and cannot move, so no charge can flow. Only when it is molten or dissolved are the ions free to move to the electrodes, so only then can it conduct and be broken down.',
    },
    {
      id: 'sq3',
      question: 'At the cathode during the electrolysis of molten lead(II) bromide, lead ions become lead metal. State which electrode is the cathode, and explain what happens to the ions in terms of electrons.',
      suggestedWords: [['negative', 'cathode'], ['gain', 'electrons'], ['reduction']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: the cathode is the negative (−) electrode.',
        '1 mark: the positive lead ions gain electrons.',
        '1 mark: gaining electrons is reduction (Pb2+ + 2e- gives Pb).',
      ],
      modelAnswer: 'The cathode is the negative electrode. The positive lead ions are attracted to it and each gains two electrons to become a neutral lead atom. Gaining electrons is called reduction.',
    },
    {
      id: 'sq4',
      question: 'When brine (sodium chloride dissolved in water) is electrolysed, hydrogen gas is produced at the cathode instead of sodium. Suggest why, and name the other two useful products.',
      suggestedWords: [['reactive', 'sodium'], ['hydrogen', 'water'], ['chlorine', 'sodium hydroxide']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: sodium is very reactive, so hydrogen (from the water) is released at the cathode instead of sodium.',
        '1 mark: chlorine gas is produced at the anode.',
        '1 mark: sodium hydroxide is left behind in the solution.',
      ],
      modelAnswer: 'Sodium is very reactive, so instead of sodium the hydrogen from the water is discharged at the cathode. Chlorine gas is produced at the anode, and sodium hydroxide is left behind in the solution. All three are valuable industrial chemicals.',
    },
    {
      id: 'sq5',
      question: 'Give two reasons why electrolysis is economically important to industry.',
      suggestedWords: [['reactive metals', 'aluminium'], ['electroplating', 'chlorine']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark: it is the only way to extract very reactive metals such as aluminium and sodium from their ores.',
        '1 mark: any second valid use — electrolysis of brine to make chlorine and sodium hydroxide, OR electroplating to coat objects with metal.',
      ],
      modelAnswer: 'Electrolysis is the only way to extract very reactive metals such as aluminium and sodium from their ores. It is also used to electroplate objects with a thin metal coat, and to make chlorine and sodium hydroxide from brine.',
    },
  ],

  // Source Analysis (Diagrams): all three items centre on the electrolysis of
  // copper(II) sulfate solution with inert carbon electrodes. 2 MCQ : 1 written.
  diagrams: [
    {
      id: 'diag_1_cathode',
      type: 'mcq',
      inlineSvg: DIAGRAMS.COPPER_SULFATE_CELL,
      imageAlt: 'An electrolysis cell of blue copper(II) sulfate solution with two carbon electrodes; a copper coating builds on the cathode and gas bubbles form at the anode.',
      promptText: 'This is the electrolysis of copper(II) sulfate solution using inert carbon electrodes. What forms on the CATHODE (the negative electrode)?',
      options: [
        { val: 'A', text: 'A pink-brown layer of copper metal.' },
        { val: 'B', text: 'Bubbles of chlorine gas.' },
        { val: 'C', text: 'A layer of sulfur.' },
        { val: 'D', text: 'Nothing forms there.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'Copper ions (Cu²⁺) are positive, so they move to the negative cathode, gain electrons, and are deposited as a layer of copper metal. The gas (oxygen) forms at the anode, not the cathode.',
    },
    {
      id: 'diag_2_blue_fades',
      type: 'mcq',
      inlineSvg: DIAGRAMS.COPPER_SULFATE_CELL,
      imageAlt: 'The same copper(II) sulfate cell; the solution is drawn blue.',
      promptText: 'As the electrolysis of copper(II) sulfate solution continues with carbon electrodes, the blue colour slowly fades. Why?',
      options: [
        { val: 'A', text: 'The blue copper(II) ions are being removed from the solution and deposited as copper.' },
        { val: 'B', text: 'The water is boiling away.' },
        { val: 'C', text: 'The sulfate ions turn white.' },
        { val: 'D', text: 'New copper(II) ions are being added.' },
      ],
      correct: 'A',
      marks: 1,
      expEn: 'The blue colour comes from copper(II) ions in solution. As they are discharged at the cathode and deposited as copper metal, fewer remain in solution, so the blue fades.',
    },
    {
      id: 'diag_3_observe',
      inlineSvg: DIAGRAMS.COPPER_SULFATE_CELL,
      imageAlt: 'The copper(II) sulfate electrolysis cell with carbon electrodes: copper on the cathode, gas at the anode.',
      promptText: 'Copper(II) sulfate solution is electrolysed using inert carbon electrodes. Describe what you would observe at each electrode, and explain what is happening in terms of the ions.',
      suggestedWords: [['cathode', 'copper'], ['anode', 'oxygen', 'gas'], ['ions', 'blue']],
      scienceMaxMarks: 3,
      markScheme: [
        '1 mark: at the cathode, a pink-brown coat of copper forms (copper(II) ions gain electrons).',
        '1 mark: at the anode, bubbles of a gas (oxygen) are seen (from the water/hydroxide ions).',
        '1 mark: the blue colour of the solution fades as copper(II) ions are removed.',
      ],
      modelAnswer: 'At the cathode, a pink-brown layer of copper builds up, because the positive copper(II) ions are attracted there and gain electrons to become copper metal. At the anode, bubbles of oxygen gas are given off from the water. As the copper(II) ions leave the solution, the blue colour gradually fades.',
    },
  ],

  notes: notes,
  workbook: workbook,
  formulaWrite: formulaWrite,
  symbolEq: symbolEq,
  assessment: assessment,
  games: games,
};
