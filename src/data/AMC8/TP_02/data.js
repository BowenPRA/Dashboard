// src/data/AMC8/TP_02/data.js
// TP_02 — Arrangements. The second PROBLEM-TYPE unit of the AMC 8 Prep track,
// built on TP_01 (How Many Ways?) the way a sequel is: TP_01's slots are
// recapped in one slide, and the new method is "line them up, then fix the
// overcount" (docs/amc8-course.md, "Problem-type units").
//
//   Step 1 (Learn)     — the deck: n!, k of n, repeats, together, apart, fixed  10 XP
//   Step 2 (Practice)  — Step by Step: ten problems, the scaffold fading        20 XP
//   Step 3 (Test)      — ten questions of this type in 16 minutes, sat once     60 XP
//   Step 4 (Review)    — opens when the test is handed in                       10 XP
//
// The split keeps the track's finish line (60 XP, `completeMinXP`) honest:
// everything but the test is 40, so the unit finishes only with the test sat
// and at least 4 of its 10 questions right. No XP gates; only the Review
// waits, for the test to be handed in.
//
// Every problem in the unit is original. Nothing is worked twice: the deck,
// the practice set and the test each use their own numbers and words.
// English only: the track is not bilingual, so there are no `vn*` twins.
// Module properties are written out in full (`notes: notes,`) so the audio
// generator reads them the way it reads every other unit.
import { notes } from './notes.js';
import { stepPractice } from './stepPractice.js';
import { amcTest } from './test.js';

export const TP_02_DATA = {
  meta: {
    id: 'TP_02',
    title: 'Arrangements',
    desc: 'Lining things up: arrange everything or some, then fix the count for repeated letters, blocks that stay together, things kept apart and fixed places. Then 10 contest-style questions in 16 minutes.',
    track: 'AMC8',
    icon: 'Shuffle',
  },

  phases: [
    {
      id: 'concept',
      title: 'Step 1: Learn the Method',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 10 },
      ],
    },
    {
      id: 'practice',
      title: 'Step 2: Practice',
      threshold: 0,
      tasks: [
        { id: 'STEP_PRACTICE', dbKey: 'p93', maxXP: 20 },
      ],
    },
    {
      id: 'test',
      title: 'Step 3: Test',
      threshold: 0,
      tasks: [
        { id: 'AMC_TEST', dbKey: 'p53', maxXP: 60 },
      ],
    },
    {
      // Held shut until the test is HANDED IN (`requires`, read through the
      // test's `isSat`): a solution seen before the test is a test wasted.
      id: 'mastery',
      title: 'Step 4: Review',
      threshold: 0,
      requires: 'AMC_TEST',
      tasks: [
        { id: 'AMC_REVIEW', dbKey: 'p54', maxXP: 10 },
      ],
    },
  ],

  notes: notes,
  stepPractice: stepPractice,
  amcTest: amcTest,
};
