// src/data/AMC8/PT_02/data.js
// PT_02 — Practice Test 2. The second unit of the AMC 8 Prep track: one full
// contest paper (the problems of the 2025 AMC 8), sat under contest
// conditions and then reviewed. English only: the track is not bilingual, so
// there are no `vn*` twins.
//
// Built to the PT_01 exemplar (docs/amc8-course.md):
//   Step 1 (Toolkit)        — the notes deck, 12 slides                  20 XP
//   Step 2 (Practice Test)  — the timed paper, 25 questions, 40 minutes  60 XP
//   Step 3 (Review)         — opens when the paper is handed in          20 XP
//
// No XP gates: the deck comes first on the card, but the test is open from
// the start. Only the Review waits, for the paper to be handed in.
//
// There is no Quiz: the Practice Test is the assessment. An AMC8 unit
// finishes at 60 XP (the track's `completeMinXP`; taskRegistry.isUnitComplete).
// Module properties are written out in full (`notes: notes,`) so the audio
// generator reads them the way it reads every other unit.
import { notes } from './notes.js';
import { amcTest } from './test.js';

export const PT_02_DATA = {
  meta: {
    id: 'PT_02',
    title: 'Practice Test 2',
    desc: 'The 2025 AMC 8 paper: read the toolkit, sit 25 questions in 40 minutes, then review every problem with its solution.',
    track: 'AMC8',
    icon: 'Award',
  },

  phases: [
    {
      id: 'concept',
      title: 'Step 1: Toolkit',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 20 },
      ],
    },
    {
      id: 'practice',
      title: 'Step 2: Practice Test',
      threshold: 0,
      tasks: [
        { id: 'AMC_TEST', dbKey: 'p53', maxXP: 60 },
      ],
    },
    {
      // Held shut until the paper is HANDED IN (`requires`, read through the
      // test's `isSat`): a solution seen before the test is a test wasted.
      id: 'mastery',
      title: 'Step 3: Review',
      threshold: 0,
      requires: 'AMC_TEST',
      tasks: [
        { id: 'AMC_REVIEW', dbKey: 'p54', maxXP: 20 },
      ],
    },
  ],

  notes: notes,
  amcTest: amcTest,
};
