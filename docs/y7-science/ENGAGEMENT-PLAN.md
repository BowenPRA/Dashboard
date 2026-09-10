# Y7 Science engagement plan — tasks a student would choose to do

**The complaint (2026-09-10):** the science units were faithful reductions of the
classroom decks, and that was the problem. "Write it on paper" starters make no
sense to a student alone with a tablet; the practice was read-then-answer; and
every unit had the same seven task shapes, so the second unit already felt like
the first. A learning app on a laptop or tablet can do things a projector and a
whiteboard cannot — let the student *touch* the diagram, *sort* the cards, *guess*
and be shown how close they were, *read* a scale that is different every time.
This plan makes the science units do that.

## 1. Principles

1. **The starter is an interaction, never an instruction.** A self-study deck
   opens with something the student *does* on the screen and gets feedback on —
   an estimate, a sort, a tap on a diagram — not "write two solids on paper".
2. **Touch the science.** Where the classroom pointed at a diagram, the app lets
   the student tap or drag on it: label the cell, tap the organ, sort the
   substances, put the slide-making steps in order.
3. **Never the same twice.** At least one task per unit is generative — the
   numbers, the readings, or the order change every attempt — so re-doing it is
   practice, not memory.
4. **Vary the shape.** No unit repeats another unit's task list exactly, and no
   practice set repeats one question type more than twice in a row.
5. **Every wrong answer teaches.** Each interaction shows the right answer *in
   place* (the label on the pin, the card in its bin) with one sentence of why.
6. **Keep what worked.** The deck's five checks, the vocab with audio, the cloze
   reading and the AI-marked questions stay. They are the spine; the new tasks
   are the muscle.

## 2. What is being built

### 2.1 Interactive slide activities (`activity` block on a Notes slide)

A slide may carry an `activity` instead of a `check`. It is scored exactly like a
check (one item, right or wrong, counted in the deck's score out of 10) and the
student must complete it before the deck moves on. Five types:

| type | what the student does | scored when |
|---|---|---|
| `sort` | tap or drag cards into named bins | every card in its right bin on the first check |
| `order` | arrange shuffled steps into sequence | every step in place on the first check |
| `estimate` | slide to a guess, lock it in, see the answer | guess within the tolerance |
| `hotspot` | tap the named part on a diagram | hit within two tries |
| `predict` | choose a prediction, then see the reveal | the chosen option (or always, if the activity has no `correct`) |

Schema (the `activity:` block is the **last** key on its slide, like `check:`, so
the narration stops before it):

```js
activity: {
  id: 'a1', type: 'sort',
  prompt: 'Sort the six into the right state.', promptVn: '…',
  bins:  [{ id: 'solid', name: 'Solid', nameVn: 'Chất rắn' }, …],
  cards: [{ id: 'ice', name: 'Ice', nameVn: 'Nước đá', bin: 'solid' }, …],
  explain: 'Sand pours, but every grain keeps its shape — solid.', explainVn: '…',
}
activity: { id, type: 'order', prompt, promptVn, steps: [{ id, name, nameVn }, …in the correct order], explain }
activity: { id, type: 'estimate', prompt, promptVn, min, max, step, unit, answer, tolerance /* fraction of answer, e.g. 0.25 */, explain }
activity: { id, type: 'hotspot', prompt, promptVn, svg: DIAGRAMS.X, viewBox: '0 0 760 430', targets: [{ id, x, y, r, name, nameVn }], correct: 'id', explain }
activity: { id, type: 'predict', prompt, promptVn, options: [{ val, name, nameVn }], correct?: 'val', explain, explainVn }
```

Field names are deliberately `name`/`explain` rather than `text`/`content`, so
the audio generator (which narrates `title|content|text|caption|prompt…`) does
not read the cards aloud. It also stops at `activity:` as it stops at `check:`.

### 2.2 Label It (`LABEL_IT`, dbKey `p28`)

The unit's own SVG diagram, with its printed labels stripped off at runtime and
a numbered pin where each label's leader line ends. A bank of labels (with one or
two distractors); tap a label, tap a pin (or drag). Check marks every pin, shows
the right label on each wrong pin, and the next diagram loads. Scored per pin.
Resumes (the blob keeps finished diagrams).

```js
labelIt: [
  { id: 'animal', title: 'Label the animal cell', titleVn: '…',
    inlineSvg: DIAGRAMS.ANIMAL_CELL, viewBox: '0 0 760 430',
    pins: [{ id: 'p1', x: 231, y: 132, answer: 'membrane' }, …],   // leader-line ends
    bank: [{ val: 'membrane', text: 'Cell membrane', textVn: 'Màng tế bào' }, …, one or two distractors] },
]
```

`node scripts/svg-coords.mjs Y7_SCI/U01_1 ANIMAL_CELL` prints the viewBox and
every text/line/circle position in a diagram; the pin goes where the label's
leader line ends.

### 2.3 Lab Bench (`LAB_BENCH`, dbKey `p29`) — generative

The skill tasks that must never be the same twice. A session is eight rounds
drawn from the unit's modes; every round is drawn fresh, with a procedurally
drawn SVG and a typed numeric answer:

- `cylinder` — read a measuring cylinder (random volume, random scale)
- `thermometer` — read a thermometer (random temperature, random scale)
- `curve` — read a heating curve (random start and rate; "what was the
  temperature at minute N?", "when did it start boiling?")

Generators live in `src/utils/labBench.js` (pure functions; the validator calls
them) so a mode can be tested without a browser. 2.2 uses all three; future
units add modes (a microscope magnification calculator, a particle counter…).

```js
labBench: { modes: ['cylinder', 'thermometer', 'curve'], rounds: 8, title: 'Lab Bench', titleVn: '…' }
```

### 2.4 A real Practice workbook for science (`WORKBOOK`, existing engine)

The Workbook engine already renders five answer widgets — typed, multiple
choice, fill-the-blanks, dropdown-in-sentence, and drag-into-targets (unordered
and ordered). The science units simply never used it. Each unit gets a
10–12 question Practice set that **mixes** those types: sort into targets, order
the steps, choose the word in the sentence, complete the definition, one typed
number. Same tiers as maths (Focus · Practice · Challenge), one problem per
screen, reveal-solution.

## 3. The unit shape after this plan

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — deck with checks **and activities** (interactive starter) | 20 |
| concept | 0 | WORD_REC | 15 |
| practice | 25 | WORKBOOK — mixed-type Practice, 10–12 Q | 20 |
| practice | 25 | LABEL_IT — 2–3 diagrams | 20 |
| practice | 25 | READ_COMP | 15 |
| practice | 25 | SHORT_ANSWERS | 20 |
| practice | 25 | DIAGRAMS | 15 |
| practice | 25 | LAB_BENCH (2.2; other units as modes exist) | 15 |
| mastery | 80 | ASSESSMENT | 20 |
| mastery | 80 | GAMES | 0 |

145–160 XP available, capped at 100 (the validator warns above 150, which is
acceptable for the one unit that carries the Lab Bench). SPELLING is dropped: it
was the third pass over the same words and the least liked task. Gates stay
under the 80% rule: 25 of 35, 80 of ≥125.

## 4. Per-unit content brief

Each unit gets, in this order of value:

1. **An interactive starter** replacing the paper task, on the hero's next slide
   (an `estimate`, `sort`, `hotspot` or `predict`).
2. **One or two mid-deck activities** where the classroom stopped to *do*
   something (spot-the-difference → `hotspot`; the levels drill → `sort`; slide
   steps → `order`; the syringe vote → `predict`).
3. **Label It** on the unit's 2–3 best labelled diagrams.
4. **A mixed Practice workbook** of 10–12 questions.
5. **Lab Bench** modes where the unit has a measuring skill (2.2 now).

| Unit | Starter | Mid-deck | Label It | Lab Bench |
|---|---|---|---|---|
| 1.1 Cells | `estimate` — how many times bigger is a can than a cell | `hotspot` nucleus on the animal cell; `sort` plant-only vs every-cell parts | ANIMAL_CELL, PLANT_CELL, MICROSCOPE_LIGHT | — |
| 1.2 Animal cells | `predict` — how many cells in a person | `hotspot` spot-the-difference; `order` making the slide | ANIMAL_CELL, SLIDE_PREP | — |
| 1.3 Specialised | `sort` — part → job | `predict` why no nucleus; `sort` cell → function | RED_BLOOD_CELL, NEURONE, ROOT_HAIR_CELL | — |
| 1.4 Tissues, organs | `hotspot` — tap the stomach on the body | `sort` the five levels; `order` cell → organism | LEVELS_LADDER, LEAF_SECTION, RESPIRATORY_SYSTEM | — |
| 2.1 States | `sort` — six substances into states | `predict` the syringes; `sort` particle facts | SYRINGES, THREE_ARRANGEMENTS, VACUUM_BOX | — |
| 2.2 Changes | `order` — the five changes on the cycle | `estimate` boiling point; `predict` the heating curve | STATE_CYCLE, APPARATUS, MENISCUS | cylinder · thermometer · curve |

## 5. Build order and who does what

1. **Engines (done first, by hand):** `ActivityBlock.jsx` inside Notes;
   `LabelIt.jsx` + `utils/labelIt.js`; `LabBench.jsx` + `utils/labBench.js`;
   registry entries; validator rules for all three; harness cases; the audio
   generator stops at `activity:`.
2. **Exemplar (by hand): U01_1** — starter, mid-deck activities, Label It,
   Practice workbook, new phases.
3. **Delegated, in parallel, one agent per unit: U01_2, U01_3, U01_4, U02_1,
   U02_2** — each follows the exemplar and this brief, runs the validator, and
   reports what it built and what it could not.
4. **Integration:** validate · audit:svg · lint · regenerate every touched
   unit's audio (slide positions moved) · browser pass · deploy.

## 6. Definition of done for a unit

- The deck opens with an interaction, not an instruction; no slide tells the
  student to write on paper or talk to a partner.
- At least three activity types appear across the deck's checks/activities.
- Label It has 2–3 diagrams with 3–7 pins each and at least one distractor.
- The Practice set uses at least four of the five Workbook widgets.
- `npm run validate` passes; `npm run audit:svg Y7_SCI` is clean; audio regenerated.
- The plan under `docs/y7-science/plans/<UNIT>.md` says what changed and why.
