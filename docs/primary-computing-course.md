# Computing — the programming path (`PRIMARY_COMP`)

> **Shelved — this is not the Technology track.** The track a Cambridge upper-primary
> student needs first is **practical computer skills**, and that is
> [digital-skills-course.md](digital-skills-course.md): switching a machine on, saving
> a file, using a browser, sending an email, getting onto wifi. Build that.
>
> This document is the *later* path — algorithms, block programming, binary,
> packet routing — kept because the thinking is sound and it is the natural
> follow-on once a student can actually operate a computer. Treat it as enrichment
> for a strong Stage 6 student, or as the seed of a lower-secondary track. Nothing
> here should be built before the Technology track ships.

The course spine for a `PRIMARY_COMP` track aimed at Cambridge upper primary
(Stages 4–6, ages 8–11): what the units are, what tasks carry them, which tasks
already exist, and which are worth building.

Read alongside [lesson-standard.md](lesson-standard.md) (the bar for a projected
lesson), [ged-unit-shape.md](ged-unit-shape.md) (the three-gate skeleton and the 80%
gate rule, which this track inherits) and [question-quality.md](question-quality.md)
(the mark-scheme standard for every open response).

Status: **deferred proposal**. Nothing here is built yet. Its `dbKey`s start at `p27`
because `p24`–`p26` are reserved for the Technology track's tasks.

---

## 1. The subject, and where it comes from

The Cambridge **Primary Computing** framework organises the subject into five
strands. This course keeps those five as its spine so the track maps cleanly onto
what a Cambridge school actually reports on:

| Strand | Short name used here | What it covers |
|---|---|---|
| Computational Thinking | **CT** | Decomposition, pattern recognition, abstraction, algorithms, logic |
| Programming | **PR** | Sequence, repetition, selection, variables, events, debugging |
| Managing Data | **MD** | Collecting, sorting, filtering, spreadsheets, charts, truthfulness |
| Networks & Digital Communication | **ND** | How the internet moves a message; search; safety and citizenship |
| Computer Systems | **CS** | Input → process → output → storage; hardware vs software; binary |

### What the good sources actually contribute

These are the places worth stealing from, and the specific thing each one gives us:

- **CS Unplugged** (University of Canterbury) — binary place-value cards, images as
  pixel grids, the parity magic trick, sorting networks. These are the single best
  primary CS activities in existence and every one of them is a *mechanic*, not a
  worksheet. Two of the proposed task types are direct ports.
- **Code.org CS Fundamentals** (Courses C–F) — the "unplugged first, then plugged"
  order, and the **block-limit** mechanic ("solve it in 5 blocks"), which is how a
  child discovers a loop rather than being told about one.
- **NCCE / Teach Computing (UK)** — **PRIMM**: Predict, Run, Investigate, Modify,
  Make. This is the pedagogy that makes a programming task teach rather than
  entertain, and it maps directly onto three of the tasks below.
- **Barefoot Computing (BCS)** — the concepts/**approaches** split. Tinkering,
  debugging, persevering, collaborating are learnable behaviours, and "debugging"
  deserves to be its own scored activity, not a side effect.
- **Bebras** challenges — short, self-contained computational-thinking puzzles,
  already age-banded. A near-perfect fit for `WORKBOOK` items with zero new code.
- **Harvard ScratchEd Creative Computing** — **use → modify → create**. A student
  should meet a working program before being asked to write one.
- **micro:bit Foundation** — input → process → output as a *physical* loop, which is
  the cleanest way to teach the Computer Systems strand.
- **Google Be Internet Awesome** / **Common Sense Education** — digital citizenship
  framed as decisions, not rules: spot the phishing message, judge the source.

---

## 2. Track setup (one-time)

```js
// src/components/trackRegistry.js
{
  id: 'PRIMARY_COMP',
  title: 'Technology',
  desc: 'Cambridge Primary Computing',
  icon: Cpu,               // lucide-react
  group: 'Cambridge',
  // Bilingual, unlike COORD_SCI and ADD_MATH. Those two are English-only because
  // the exam is; a nine-year-old learning what "abstraction" means is not sitting
  // an English-language exam, and the concept is the point, not the word.
  bilingual: true,
  theme: { bg: 'bg-lime-500', border: 'border-lime-700', /* … */ },
}
```

`lime` is unclaimed by every existing track, and reads as "primary" next to the
GED blues and the Cambridge teals.

Also needed:
- `src/data/PRIMARY_COMP/` + an entry in `src/data/index.js`.
- A `TRACK_ARENAS` entry in `src/components/towerdefense/unitDifficulty.js` so the
  arcade has a map for it (suggest `mapId: 'CIRCUIT'`, `themeId: 'NIGHT'` — a
  circuit-board arena is on-theme and already exists).
- Nothing for gold: the [arcade economy](../src/views/Arcade.jsx) pays from XP on
  *any* track, so a Technology unit feeds it the day it ships.
- Nothing for audio: `npm run sync-audio PRIMARY_COMP` narrates the decks once the
  notes exist.

---

## 3. Unit shape

The three-gate skeleton, inherited unchanged so a student never has to relearn where
they are. Two adjustments for primary:

- **A unit is ~60–75 minutes, not three hours.** Same 100 XP, same six-to-seven
  tasks — *fewer items inside each task*. 8 workbook questions, not 12. 3 short
  answers, not 5. 6 quiz questions, not 8.
- **Every gate is generous.** Primary students quit when a door won't open.

| Gate | Threshold | Tasks | XP |
|---|---|---|---|
| **0 · Learn** | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| **1 · Apply** | 15 | Two strand tasks (25 + 20) · `WORKBOOK` 10 · `SHORT_ANSWERS` 20 | 75 |
| **2 · Prove** | 60 | `DIAGRAMS` 20 · `ASSESSMENT` 20 · `GAMES` 0 | 40 |

Totals 135, capped at 100 by `unitXPOf`, so a student can skip a task and still
finish. Gate 1 sits at 15 of the 20 before it (75%); Gate 2 at 60 of 95 (63%). Both
inside [the 80% rule](ged-unit-shape.md#2-the-standard-shape) the validator enforces —
**re-derive these whenever a task's XP changes.**

---

## 4. The course map — 12 units

Ordered so that the unplugged idea always lands before the plugged one, and so the
Programming strand runs as a four-unit arc that builds one game.

| # | Unit | Strand | The one thing it teaches | Strand tasks (Gate 1) |
|---|---|---|---|---|
| **T1.1** | Algorithms Everywhere | CT | A computer does *exactly* what you said, not what you meant | `WORKBOOK` (order) · `SHORT_ANSWERS` |
| **T1.2** | Patterns and Hiding Detail | CT | Spot the repeat; abstraction is deciding what to *leave out* | `WORKBOOK` (order/dnd) · `DIAGRAMS` |
| **T2.1** | Sequence and Repetition | PR | A loop is what you write when you notice a pattern | **`BLOCK_CODE`** · **`TRACE`** |
| **T2.2** | If This, Then That | PR | Selection lets one program behave two ways | **`BLOCK_CODE`** · **`TRACE`** |
| **T2.3** | Variables and Score | PR | A variable is a labelled box the program can change | **`BLOCK_CODE`** · `WORKBOOK` |
| **T2.4** | Debugging Detectives | PR | Bugs are normal; finding them is a method, not luck | **`BLOCK_CODE`** (debug mode) · **`TRACE`** |
| **T3.1** | Inside the Machine | CS | Input → process → output → storage explains every device | `DIAGRAMS` · `WORKBOOK` |
| **T3.2** | Ones and Zeros | CS | Numbers, letters and pictures are all just switches | **`BIT_LAB`** · `WORKBOOK` |
| **T4.1** | Data We Collect | MD | A spreadsheet is a machine for asking questions of data | **`SHEET`** · `WORKBOOK` |
| **T4.2** | Charts That Tell the Truth | MD | The same numbers can be drawn honestly or dishonestly | `DIAGRAMS` · **`SHEET`** |
| **T5.1** | How a Message Crosses the World | ND | Your message travels in numbered pieces, by no fixed route | **`NET_ROUTE`** · `DIAGRAMS` |
| **T5.2** | Safe, Kind and Sure | ND | Judge the message and the source before you act | `READ_COMP` · `SHORT_ANSWERS` |

A note on **T2.1–T2.4**: they should build **one** artefact — a simple catch-the-thing
game — across four units. Sequence gets it moving, selection makes it react, variables
give it a score, debugging fixes the version that's deliberately broken. That
continuity is what ScratchEd's use→modify→create is for, and it is the difference
between four exercises and a course.

---

## 5. Tasks

### 5.1 What already exists and carries straight over

| Task | Use in this track |
|---|---|
| `NOTES` | The projected lesson. The `layout` slides ported from Lessons (Hero, Compare, Steps, Showcase) are a strong fit — Steps for an algorithm, Compare for hardware vs software |
| `WORD_REC` | *algorithm, sequence, loop, condition, variable, debug, input, output, data, packet, password, source* — bilingual |
| `WORKBOOK` | **The quiet hero.** Its `order` type already sequences algorithm steps, and `dnd` already sorts things into buckets. Whole CT units can ship with no new code. Bebras puzzles drop in as `mcq` |
| `SHORT_ANSWERS` | "Explain why the robot ended up in the wrong square." Mark-scheme-only grading, per [short-answer-mark-scheme-only](question-quality.md) |
| `DIAGRAMS` (Source Analysis) | Read a flowchart, a network diagram, a spreadsheet screenshot, **a deliberately misleading bar chart** — and write about it. Already exactly the right shape |
| `READ_COMP` | A passage on how search ranking works, or a phishing email as the "source" |
| `ASSESSMENT` | The unit quiz |
| `GAMES` | 0 XP arcade reward, as everywhere else |

**This is the important finding: units T1.1, T1.2, T3.1 and T5.2 can be authored and
shipped today with zero new components.** Do those first.

### 5.2 New task types worth building

Each follows the house **derive-don't-store** rule that `SYMBOL_EQ`, `ENERGY_PROFILE`,
`NUM_DRILL` and `POLY_DIV` established: correctness is computed from a model, never
compared against an authored answer string, so a wrong answer key cannot ship.
Technology is the best-suited subject in the app for that rule — *a program has an
interpreter, so the answer is whatever running it produces.*

Next free `dbKey` is **`p27`** (`p1`–`p23` taken, `p5` reserved as a workbook question id).

---

#### ① `BLOCK_CODE` — "Code It" · `p27` · 25 XP · the flagship

A block editor beside a grid world. The student drags blocks (`move`, `turn`,
`repeat n`, `if path ahead`, `set score`) into a script; pressing Run steps a sprite
through the grid with the script highlighted line by line.

- **Correctness is derived by execution.** The item declares a grid, a start, a goal
  and a block bank. The interpreter runs the student's program and asks whether the
  end state matches the goal. There is no answer to author and none to get wrong.
- **Block limit as the loop-teacher.** `maxBlocks: 5` on a path needing 12 moves makes
  `repeat` the only way through. Code.org's mechanic, and it works.
- **A `debug` mode** — the item ships a nearly-working script pre-loaded and the
  student fixes it — is a *mode flag*, not a second task type. One less `dbKey`, and
  it gives T2.4 its spine.
- Item shape: `{ id, grid, start, goal, blockBank, maxBlocks?, requiredBlocks?, preload? }`.

Biggest build here by some distance, and the one that justifies the track. Everything
else in the Programming strand reuses its interpreter.

#### ② `TRACE` — "Predict the Output" · `p28` · 20 XP · cheapest big win

PRIMM's *Predict* and *Run*, scored. A short program is shown; before it runs the
student commits to an answer — the sprite's final square, a variable's final value,
what gets printed. Then it runs, animated, and they see whether they were right.

- Runs on the **same interpreter** as `BLOCK_CODE`: build it once, get two tasks.
- The expected answer is derived by executing the authored program, so items are
  trivial to write and impossible to mis-key.
- This is where understanding actually shows. A student can drag blocks until
  something works; they cannot guess a trace.

#### ③ `BIT_LAB` — "Ones and Zeros" · `p29` · 20 XP · small build, high delight

Two modes, both straight from CS Unplugged:

- **Binary cards.** Five cards showing 16 · 8 · 4 · 2 · 1 dots. Tap to flip them face
  up; a live running total shows the number made. "Make 23." Place value becomes
  something the student *sees*.
- **Pixel grid.** Type a row of 1s and 0s and the picture appears square by square;
  or read an authored picture back off into binary. Then: "how many bits for this
  8×8 image?"

All judgement is arithmetic on the flipped cards or the grid — nothing stored.

#### ④ `NET_ROUTE` — "Send the Packet" · `p30` · 20 XP · medium build

A small network graph of routers. The student splits a message into numbered packets
and routes them hop by hop to an address. Then a link goes down mid-send and they
must re-route; then packets arrive out of order and must be reassembled by number.

- Path validity is derived from the graph's edges; reassembly is derived from the
  packet numbers.
- Carries the whole ND strand, and "the internet has no fixed route" is the single
  hardest idea in it to convey with a static diagram.

#### ⑤ `SHEET` — "Cells and Formulas" · `p31` · 20 XP · medium build

A 6×8 spreadsheet grid with a tiny formula evaluator (`=SUM(B2:B6)`, `=A2*C2`,
`=AVERAGE(...)`, `=IF(...)`). The task states a goal — "put the class total in B8" —
and the app checks the *evaluated cell value*, so any correct formula passes.

- Cambridge Primary asks for real spreadsheet skill, and this is the only honest way
  to assess it in-app.
- Pairs with `DIAGRAMS` in T4.2: build the data here, then read a chart of it there.

### 5.3 Deliberately not proposed

- **A free-text code editor.** Wrong altitude for upper primary, and marking it needs
  a language runtime.
- **Photograph-your-unplugged-activity.** Tasks have no upload path. Where an
  unplugged activity is the right teaching (and often it is), put it on a `NOTES`
  activity slide as something to do at the table, and assess the *idea* in
  `SHORT_ANSWERS`.
- **A separate `DEBUG` task.** It's a `BLOCK_CODE` mode. Burning a `dbKey` on it buys
  nothing.

---

## 6. Suggested build order

**Phase 0 — prove the track with no new code.** Register `PRIMARY_COMP`, author
**T1.1** and **T3.1** using `NOTES` / `WORD_REC` / `WORKBOOK` (`order`, `dnd`, Bebras
`mcq`) / `SHORT_ANSWERS` / `DIAGRAMS` / `ASSESSMENT`. Run `npm run validate` and put it
in front of a student. This is a few days' authoring and it de-risks everything after.

**Phase 1 — the interpreter.** `src/utils/blockProgram.js` (grid world, block set,
step-wise execution, self-check over every authored item), then `BLOCK_CODE` and
`TRACE`. Ship **T2.1** and **T2.2**. Add `preview-tech.html` to the no-auth harness set
alongside the existing previews.

**Phase 2 — finish Programming.** `BLOCK_CODE` debug mode; **T2.3**, **T2.4**.

**Phase 3 — `BIT_LAB`**, then **T3.2**. Smallest new component, biggest reaction.

**Phase 4 — `SHEET`** and **`NET_ROUTE`**; **T4.1**, **T4.2**, **T5.1**, **T5.2**, and
the two CT units that were left (T1.2).

---

## 7. Definition of done, per unit

Same checklist the coord-science units use:

- `npm run validate` — gate thresholds inside the 80% rule, no empty tasks, bilingual
  twins present (this track **is** bilingual, so `vn*` fields are checked).
- `npm run audit:svg PRIMARY_COMP` for any authored diagram.
- `npm run build`.
- A `node` self-check over every new-task item (the `chemFormula.checkItem` pattern):
  every `BLOCK_CODE` item must be *solvable within its block limit*, and every `TRACE`
  item's expected answer must come from actually running it.
- `npm run sync-audio PRIMARY_COMP` for the notes narration.
- The no-auth harness page mounts every task in the unit.
