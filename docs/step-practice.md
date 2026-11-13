# Step by Step — the data-driven step practice (`STEP_PRACTICE`, p93)

A Workbook problem, broken into short steps a student answers one at a time,
written as data alone so a set can be made for any class (Years 1–6 English,
Maths, Science, and later Year 7). It is the friendlier replacement for the
Practice screen (`WORKBOOK`, p11) in new units, and it takes its look from the
two engines Bowen likes: Find Every Angle (`ANGLE_CHASE`, AngleKit) and the
Unit 4 step screen (StepKit).

- Task: `STEP_PRACTICE`, dbKey **p93**, label "Step by Step", 40 XP by default,
  phase `practice`, unit key `stepPractice`. p97 is the next free key (p94–p96: the ACELLUS quadratics tasks).
- Try it: `npx vite --port 5191` then
  `http://localhost:5191/Dashboard/preview-steps.html?set=y5maths` (see the
  harness header in `src/preview-steps.jsx` for `level`, `item`, `lang`, `big`,
  `saved`, `core`).

## 1. The portable core

The engine will also run in PRA Learn (learn.pra.edu.vn). Everything that
draws or marks a set lives in **`src/stepPractice/`** and imports nothing from
the Dashboard except one line:

| File | What it is |
|---|---|
| `model.js` | reading the data, marking a response, slips, shown order, working lines, `tr` / `txt` |
| `run.js` | how one item runs, as plain state changes (testable in Node) |
| `progress.js` | the save blob and the score |
| `check.js` | the authoring rules (`checkStepPractice`), run by `npm run validate` |
| `say.js`, `words.js` | the frame's words in EN / VN / FR; the level colours |
| `text.js`, `StepText.jsx` | the `{{given}}` `[[find]]` `<<found>>` markup and KaTeX |
| `parts.jsx`, `inputs.jsx` | the look: step pills, notes, feedback, question card, working, done card; the seven answer widgets |
| `ItemRunner.jsx` | one item, first step to done card |
| `StepPracticeSet.jsx` | a whole set: `set`, `lang`, `saved`, `onSave`, `onFinish`, `onPos` |
| `equivalence.js` | **the one outside import**: re-exports `src/utils/mathEquivalence.js`, which imports nothing |
| `samples/` | the three sample sets and `figures.js` (number line, floors) |

To copy it into another React + Tailwind app: copy `src/stepPractice/` and
`src/utils/mathEquivalence.js`, point `equivalence.js` at the copy, and have
`react`, `katex` and `lucide-react` installed (`tailwindcss-animate` gives the
fade-ins; without it they are simply absent). No auth, XP, TopBar or Supabase.

**What the host hears.** `onSave` / `onFinish` get `{ score, blob, items, done, total }`.
Each entry of `items` is one item finished this sitting:

```js
{ itemId: 'p1', correct: false,          // correct = finished without Show me or a filled-in step
  slips: ['s2.1', 'neg-sign'],           // the slips hit, each once, in order
  shows: { s3: 1 },                      // Show me presses per step ("s<n>", from 1)
  hints: 1, wrong: 3 }                   // hints opened, wrong answers (nudges not counted)
```

A slip's key is its own `key` when it has one (letters, digits, `. : _ -`, 40 at
most), else `s<step>.<slip>` counted from 1: `s2.1` is the first slip on step 2.
`slipsByKey(item)` in `model.js` turns keys back into `{ step, slip }`, so a teacher
page can show the slip's own `msg`. Nothing the child typed is in the report.
Give a slip a `key` if its step may move later, so old results still match.

The Dashboard wiring is **`src/tasks/StepPractice.jsx`** alone: the TopBar
(language toggle, Save & Quit), `useLang`, and the save round-trip
(`savedData` in, `onProgress?.(score, blob, { items })` after each finished
item, `onComplete` at the end or on quit after work this sitting).

## 2. Data

```js
stepPractice: {
  title: 'Negative numbers: step by step', titleVn: '…', titleFr: '…',
  big: false,        // young learners: larger type, no sub lines, shorter 1-2-3 strip
  signed: true,      // number boxes get a +/− key (phones have no minus on the number pad)
  items: [
    {
      id: 'p1', level: 'practice',              // 'focus' | 'practice' | 'challenge'
      prompt: 'In Sa Pa it was {{4 °C}} at 6 pm. … [[What was the temperature at midnight?]]',
      promptVn: '…', promptFr: '…',
      inlineSvg: numberLine({ min: -7, max: 5, given: [4] }),   // optional; inlineSvgVn twin allowed
      // or image: 'path', alt: '…'   or   table: { head, headVn, rows: [[…]], caption }
      steps: [
        {
          title: 'How much further does it fall?',   // 8 words at most (+ titleVn / titleFr)
          sub: '…',                                    // optional ONE line; a default is given per input
          key: true,                                   // Practice asks key steps (the last always)
          label: 'Fall',                               // optional 1-2 word pill label
          input: { type: 'number', before: '{{9}} − <<4>> =', after: 'degrees', afterVn: 'độ', answer: '5' },
          line: '…@…',                                 // optional working line; @ = the answer (green)
          hint: '…', hintVn: '…',                      // required
          why: '…', whyVn: '…',                        // optional: the green note after a right answer
          slips: [{ value: '13', step: 1, msg: '…', msgVn: '…' }],
        },
      ],
    },
  ],
}
```

**Markup** in any text: `{{…}}` given (teal), `[[…]]` what you are finding
(orange, green when the item is done), `<<…>>` found (green), `**bold**`,
`$…$` KaTeX. Earlier steps' answers written into a later step use `<<…>>`.

**Inputs**

| type | fields | marking |
|---|---|---|
| `number` | `answer`, `accept[]`, `tol`, `exact`, `unit`, `before`, `after`, `width` | `mathEquivalence` (so `0.5` = `1/2`); `tol` is ± absolute; `exact: true` compares the text (a fraction that must be written as one); a typed unit or the plain `after` word is ignored; `2,5` is a nudge, not a try |
| `text` | `answer` (string or list), `accept[]`, `caseSensitive`, `before`, `after` | trimmed, case-free, final full stop ignored |
| `choice` | `options: [{ id, text, textVn, svg?, image?, alt? }]`, `answer`, `shuffle` | the id; answers on tap; a wrong option is struck through |
| `multi` | `options`, `answer: [ids]` | the exact set |
| `order` | `items: [{ id, text }]` **written in the right order** | shown in a fixed shuffle; tap in order, tap again to undo |
| `gap` | `text` with `___` per gap, `answers: [[accepted…], …]`, `bank?` | each gap case-free; a bank fills the next empty gap |
| `tap` | `sentence`, `answer: ['word' or place number]` | one answer word taps at once; several need Check. A word that appears twice is given by its place (1 = first word) |

**Slips**: `value` has the shape of a response (a number string, an option id,
a list of ids, a list of gap words, a list of words). `step` (a number from 1,
or a step `id`) is the step the slip comes from: earlier or this one, never
later. `msg` names the slip and the right idea; never just "wrong". Optional
`key` (e.g. `'neg-sign'`) names the slip in results; it must be unique in the item.

## 3. How it behaves

- Question card left (level strip, prompt, figure), steps right; one column on
  a phone, where the step scrolls back into view after each answer.
- The 1-2-3 strip appears on the first item of each level, instead of an intro.
- Teal = given, orange = what you are finding (and every answer box), green =
  found, in the prompt, the figures, the boxes and the working.
- `ok` / `shown` notes sit ABOVE the new step (about the step just finished);
  `bad` / `info` UNDER the work (about this step).
- **Focus** walks every step. A wrong answer gets its slip's message (and the
  pill of the step it points at pulses), or "Not yet" + the hint; a second
  wrong answer fills the step in and moves on.
- **Practice** asks the key steps only (`key: true` + the last: 2–3 actions).
  A wrong answer opens the skipped steps before it, from the step its slip
  points at when that one was skipped; the steps before that are written as
  "in your head". Skipped steps are written into the working that way too.
- **Challenge** asks for the answer (the last step). A wrong answer opens the
  step its slip points at (the steps before it count as done, "in your head")
  and says what the student wrote; an answer no slip explains opens every step.
- **Show me** fills the step, shows the answer + why (or the hint) and moves on.
- The done card: how it went (right first time / one wrong turn / with help)
  and the working to copy into the book.
- Language: the screen opens in the host's first language; twins fall back to
  English. English-lesson sentences (tap / gap) stay English in every language.

**Saving**: blob `{ [itemId]: 1 }` for items finished without Show me or a
filled-in step (a wrong turn the student put right still counts). An item that
needed help stays out of the blob and comes back next time; once saved, an item
stays saved. Score out of 10: saved items 1, helped items this sitting ½. The
run opens on the items not yet saved; when all are saved it runs the whole set.

## 4. Design rules

1. One action per step. If a step asks two things, split it.
2. Step titles say what to do, 8 words at most; the sub line only when the
   input's default ("Type the number.") is not enough.
3. Every step has a hint that points at the method, never the answer.
4. Slips are real misconceptions with their values worked out (5 − 3 = 2 for
   "from −3 to 5"; `swimmed`; the most water ≠ the tallest plant).
5. Challenge items need at least one slip on the last step that points back at
   an earlier step (the validator insists): that is what makes Challenge teach.
6. Practice: mark the 1–2 steps where the thinking is (crossing zero, choosing
   the rows); leave the arithmetic around them unmarked.
7. Write working lines as the book would: "From −3 to 5 is 8 degrees." Give
   choice and tap steps a `line`, or the default is "Title: answer".
8. Never mark the answer's place on a figure (no "?" at the answer on a
   number line).
9. Plain words; no names of real students (the repo is public). Teachers'
   names are fine.
10. Vietnamese written as a Vietnamese teacher would say it to a child ("Em
    đếm…"), not translated word for word. PRA is a language center: learners
    are "học viên" or "các em", never the words for pupils or a school.

## 5. Turning a Workbook problem bank into a set

1. Read the unit's Workbook exercise (Focus / Practice / Challenge) and the
   Learner's Book worked example. Note each **question type**, not the questions.
2. For each type write fresh problems with new numbers and contexts (local
   ones: Hội An, Sa Pa, the river, the market). Never copy a book's wording,
   numbers or pictures.
3. Write the full steps of the book's method for each, the same method the
   class was taught. Focus items for the first type, Practice for the middle,
   Challenge for the multi-step and reasoning ones: about 4 / 4 / 3.
4. For every step, list what a Year 5 child gets wrong; turn the common ones
   into slips with the step they come from.
5. Write the Vietnamese twins (or French) for prompt, titles, sub, hint, why,
   slip messages, option text in the instruction language, before/after words.
6. Add figures from `samples/figures.js` (or an SVG on a light ground in the
   palette of `docs/svg-diagrams.md`), or a `table`.
7. Run `npm run validate`, then click through every item in the harness at
   1280×720 and 390×844, once right, once with each slip, once with Show me.

## 6. Authoring checklist

- [ ] Each item has an id, a level, a prompt with `{{given}}` and `[[find]]`.
- [ ] Focus, Practice and Challenge items all present (9–12 items in a set).
- [ ] Step titles ≤ 8 words; one action per step; every step has a hint.
- [ ] Practice items mark 1–2 key steps (asks 2–3 in all, fewer than all steps).
- [ ] Challenge items have a slip on the last step pointing at an earlier step.
- [ ] Every slip value is wrong, distinct, and names its step.
- [ ] Working lines read as sentences for the book.
- [ ] Twins for the track's languages; `npm run validate` passes.
- [ ] No book text or pictures; no student names; PRA named as a language center.
- [ ] Clicked through on desktop and phone, including a wrong answer and Show me.

## 7. Before a unit uses it

Add `stepPractice` to the unit (a `stepPractice.js` beside `data.js` is
tidiest), declare `{ id: 'STEP_PRACTICE', maxXP }` in a phase, keep the unit at
100 XP and its gates within the 80% rule, run `npm run validate`, and look at
it in that track's harness.
