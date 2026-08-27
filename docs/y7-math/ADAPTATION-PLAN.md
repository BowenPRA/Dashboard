# Adapting Y7 Maths 1.1–1.6 for Independent Learning

The plan for turning the six classroom decks in the `lessons` repo
(`content/y7-math/U01_1 … U01_6`) into six self-study units in the Dashboard's
`Y7_MATH` track.

Read alongside:
[independent-learning.md](../independent-learning.md) (what the teacher used to do),
[lesson-standard.md](../lesson-standard.md) (the teaching bar),
[y7-math-course.md](../y7-math-course.md) (the track's spine),
[workbook-tasks.md](../workbook-tasks.md), [question-quality.md](../question-quality.md).

**Decisions already taken** (2026-08-26):

1. The drill is **one flexible task with per-unit modes**, not one task per operation.
2. `U01_1` is **rebuilt** from the current classroom deck, not retrofitted — the
   existing `notes.js` predates the layout system and the check gate.
3. The audience is **Year 7**. The drill's lower rungs are the only part deliberately
   built to catch a student who arrives without the primary arithmetic.
4. The Dashboard deck is **not a port**. It is shorter, tighter and more focused than
   the classroom deck. See §2.
5. **Every unit gets a short `ASSESSMENT`** — six questions, one sitting. Paid for by
   cutting repetition elsewhere, not by adding to the pile. See §6.

---

## 1. What the classroom deck assumes that a solo student does not have

The classroom decks are good *because* they are terse: a teacher is talking over them,
asking the questions, and reading the room. Take that away and three things break.

| The room provided | Where it shows up in these six decks | What replaces it here |
|---|---|---|
| **A voice explaining the slide** | Every deck: slides carry a headline and a diagram, not an explanation | **Per-slide narration** (`generate_all_audio.py` reads `title`, `content`, `notes`, `steps` from layout slides). Slides that were terse because Mr Bowen was talking now need a written sentence to narrate. |
| **A teacher cold-calling** | "On your whiteboard, before anybody says the answer" — `U01_1` s12/s17, `U01_2` s2/s9, `U01_3` s9, `U01_4` s10 | **`check` MCQs.** These slides are already checks in disguise: the prompt is the question, the `reveal` is the explanation. One-to-one conversion. |
| **A partner to talk to** | "In pairs — no calculators": `U01_2` s4, `U01_3` s2, `U01_4` s2, `U01_5` s2, `U01_6` s2. "Tell your partner": `U01_3` s13. "Discuss": `U01_1` s13, `U01_2` s7, `U01_3` s4, `U01_4` s7 | Keep the **thinking beat**, drop the partner. "Two minutes. Pen and paper. Write your guess before you tap." The `reveal` box already does the rest. |
| **Teams, timers and a whiteboard each** | `U01_1` s2 Team Game: Name the Negatives (`TeamActivityWidget`); `U01_2` s13 Team Game: Hunt the Pairs (`PairsGameWidget`) | **Cut** the team game. The Hunt-the-Pairs mechanic survives as a solo timed game (see §7); Name the Negatives becomes the hero card's warm-up. |
| **A teacher setting homework** | "For Next Lesson" callout, all six decks | **Cut the slide.** In the app the unit card *is* the assignment list; a homework slide naming Learner's Book pages is a dead end for a student with no book. |
| **A teacher pacing it** | 18–23 slides per deck, ~45 minutes with talk over the top | **Fewer, denser slides.** §2. |

**The rule that falls out of the table:** every classroom move that needed another
person becomes either a `check` (if it was a question) or a cut (if it was a game).
Nothing gets left in as an instruction into the void.

---

## 2. The deck gets shorter, and the cut material has somewhere to go

Target: **11–14 slides**, down from 18–23. Not by compressing slides — by dropping
whole beats and moving practice into the tasks that exist for it.

The budget per deck:

| Beat | Slides | Notes |
|---|---|---|
| Hero + starter | 1 | Starter card reworded as "do this before you go on" |
| The hook question | 1 | Keep. It is the best slide in every one of these decks. |
| Key words | 1–2 | The English slides. **Never cut these** — they are the whole point of the course. |
| Teaching run | 4–5 | One idea per slide, each with a diagram, worked example or widget |
| The big rule + watch-out | 1–2 | Where two of the checks live |
| Application | 2 | The two strongest word problems only |
| Countable recap | 1 | `stack` — ideal for a solo student |
| Closer | 1 | `hero` "Lesson complete" |

**Where the cut material goes**

- Word problems 3 and 4 → the unit's **Workbook** as `Challenge` tier questions. They
  are already written with stepped reveals; the schemas are compatible.
- The whiteboard drill slides → **`check` MCQs** on the slides that remain.
- The homework callout → deleted; the tasks are the homework.
- The team games → deleted or converted (§7).

A slide is only cut if its content lands somewhere else or it was purely a room move.
Nothing taught is lost — it moves from "projected at you" to "asked of you".

---

## 3. Check questions: the spine of the scored deck

`NOTES` is worth **20 XP** here and is scored entirely on checks
([Notes.jsx](../../src/tasks/Notes.jsx), `answerCheck`). A deck with no checks pays
full marks for pressing Next 13 times.

- **5 checks per deck.** At 20 XP that is 4 XP an item — one slip costs little, and
  with the unit capped at 100 out of 120 it can be absorbed entirely (§6).
- **Placement:** after the key word lands, after the big rule, after the method, on the
  widget slide, and on one word problem. Never at the end — the check *is* the
  retrieval, so it has to interrupt.
- **Source:** convert the deck's own "write it on your whiteboard before I show you"
  moments. The distractor should be the mistake the classroom slide was written to
  catch (e.g. `U01_3` "Do Not Just Multiply Them" → the distractor is 4 × 6 = 24).
- **Never test the wording of a slide**, only the idea.
- Bilingual `q`/`qVn`, `expEn`/`expVn`, and every option `text`/`textVn`, or `validate`
  fails.

---

## 4. Vocabulary: the words the exercise uses and never explains

Right now `U01_1` has `realWords` authored but **no vocab task in any phase**, so five
carefully written words are dead data. That changes — but with **one vocab task, not
three**: `WORD_REC`, 20 XP, as first exposure with audio.

Be clear-eyed about what that 20 XP buys: `Recognition` marks the answer correct
whichever button is pressed, so it is **participation XP**, not a measure. That is
defensible here — it is the cheapest task in the unit and the overflow design (§6) means
it is not the difference between finishing and not — but if it grates, the fix is to
make `Recognition` actually check, not to reprice it.

`SPELLING` and `DICTATION` are both cut.

- `SPELLING` is a third pass over the same six words in one sitting.
- `DICTATION` plays a sentence and grades what the student types by string similarity
  ([Dictation.jsx:152](../../src/tasks/Dictation.jsx#L152)). For maths that is
  transcription practice in which **the maths is incidental** — full marks are
  available without understanding the sentence. It trains listening; this course's
  barrier is *reading a question and turning it into a calculation*.

`WORD_REC` marks itself correct whichever button is pressed
([independent-learning.md](../independent-learning.md) §3.4), so it is honestly
labelled: the tasks **expose** the vocabulary and the assessment **tests** it (§6.2,
items 1–2), which is the only place a word being known is actually established.

**If the listening channel is wanted later**, the task to build is not dictation of a
definition but dictation of a *calculation*: 🔊 "minus six plus negative four" → the
student types `-6 + -4`, graded with `answersEquivalent` from `mathEquivalence` rather
than string similarity. That is mathematical English → symbols, the same skill as the
`TranslateWidget` and the "Say It, Then Write It" slides. One component change; not
blocking, because the deck widget and assessment item 6 already cover the skill.

Selection rule (from the decks' own English slides — these words were chosen once
already, correctly): the word a Vietnamese student needs in order to *read the
question*, not the word that names the maths.

| Unit | `realWords` (5–6) | The word that actually costs marks |
|---|---|---|
| 1.1 | integer, positive, negative, inverse, difference, number line | **difference** — "the difference between −4 and 7" is a subtraction, and nothing on the page says so |
| 1.2 | product, multiply, divide, brackets, estimate, quotient | **product** — the book says "find the product" and means × |
| 1.3 | multiple, common, lowest, common multiple, LCM | **common** — everyday English says *ordinary*; maths says *shared*. `U01_3` s4 is built on this |
| 1.4 | factor, common factor, highest, HCF, exactly | **factor vs multiple** — one list stops, the other never does |
| 1.5 | divisible, digit, remainder, sum, test | **divisible by / factor of / multiple of** — three sentences for one fact (`U01_5` s4) |
| 1.6 | square, square root, cube, cube root, consecutive | **consecutive** — the exercise uses it and the book never defines it |

Each word still needs `word`, `vn`, `def`, `vnDef`, `sent`, `vnSent` — `WORD_REC` plays
the word, the definition and the sentence. `dictSent` is no longer needed (nothing reads
it once `DICTATION` is out of the phases), and dictation audio need not be generated.
See the audio trap in §10.

---

## 5. The drill task (new): `NUM_DRILL`

### 5.1 Why a new task and not another Workbook

The Workbook marks a **final answer**. A student who gets 47 × 26 wrong got one carry
wrong, and the Workbook can only tell them the whole thing is wrong. For an algorithm,
the feedback has to land on **the digit that caused it**.

The model already exists in this repo: `GraphPlot` and `VectorAdd` are *production*
tasks where every answer is derived from the item, not authored. `NUM_DRILL` is the
same idea for column arithmetic.

### 5.2 Registry entry

```js
{
  id: 'NUM_DRILL',
  nativeMax: 10,
  dbKey: 'p17',              // p1–p16 are taken; p5 is unused but reads as a
                             // workbook question id everywhere — do not reuse it
  label: 'Number Gym',
  icon: Grid3x3,
  defaultMaxXP: 20,
  phase: 'mastery',
  component: lazy(() => import('./NumberDrill.jsx')),
  hasContent: (u) => !!u.drill?.ladder?.length,
  buildPool: (u) => u.drill,
  props: ({ pool, savedData, onComplete, onQuit }) => ({ pool, savedData, onComplete, onQuit }),
}
```

### 5.3 Modes — one component, four behaviours

| Mode | What the student fills in | Used by |
|---|---|---|
| `column-add-sub` | Column sum with a carry/borrow row | 1.1 |
| `long-mult` | Partial-product rows, then the final column add | 1.2, 1.6 |
| `long-div` | Bus-stop: quotient digit, product, subtraction, bring-down | 1.4, 1.5 |
| `times-sprint` | A timed grid of single facts — the remediation floor | 1.3 |

### 5.4 Data shape — operands only

```js
// src/data/Y7_MATH/U01_2/drill.js
export const drill = {
  mode: 'long-mult',
  title: 'Two-Digit Multiplication',      titleVn: 'Nhân số có hai chữ số',
  intro: 'Fill in one box at a time. The grid checks each digit as you go.',
  introVn: '…',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[23, 12], [31, 21], [42, 13]] },
    { level: 'Carries', levelVn: 'Có nhớ',    items: [[47, 26], [68, 34], [59, 47]] },
    { level: 'Stretch', levelVn: 'Nâng cao',  items: [[236, 47], [418, 65]] },
  ],
};
```

**Every intermediate cell is derived by the component.** Authoring a unit's drill is
eight number pairs. That is what makes six units affordable, and it is what lets the
ladder be extended for a struggling student without writing new solutions.

### 5.5 Grading and the remediation ladder

- Each item is right when **every cell** is right. A cell wrong twice is revealed and
  the item pays half.
- XP = share of the ladder cleared, scaled from `nativeMax: 10` to the unit's 20.
- **Level 2 unlocks when Level 1 is clean.** A Year 7 student clears Warm-up in ninety
  seconds; a student who cannot is held there instead of drowning in Stretch — and can
  still bank real XP without ever reaching the top rung.
- Wrong cells are logged per position (`carry`, `partial-1`, `bring-down`), so the
  error log can eventually say *which step of the algorithm* fails. Do not skip this —
  it is the one thing a paper worksheet cannot do.

### 5.6 Per-unit assignment

The drill is explicitly extra, but it is not random — each one is the arithmetic the
unit leans on.

| Unit | Mode | Why it belongs here |
|---|---|---|
| 1.1 Add & subtract integers | `column-add-sub` | Regrouping is the skill the number line hides |
| 1.2 Multiply & divide integers | `long-mult` | The sign rules are useless without the multiplication |
| 1.3 LCM | `times-sprint` | Multiples *are* times tables; listing them is the method |
| 1.4 HCF | `long-div` (exact) | "Does it divide exactly?" is the factor test |
| 1.5 Divisibility | `long-div` (remainders) | The test predicts; the division proves it |
| 1.6 Square & cube roots | `long-mult` (squaring) | 25², 32² by hand — the roots list stops being magic |

---

## 6. Task and XP layout

Six tasks, each worth **20 XP**, in a fixed order. **120 XP is available and the unit
caps at 100** — the student can drop a whole task, or twenty points spread across all
of them, and still finish the unit at 100%.

> **Update (2026-08-27).** Three changes have landed on top of the layout below:
> - **`ASSESSMENT` now presents as "Quiz"** — a single registry label, so the rename
>   is global (every track), id/dbKey unchanged (`ASSESSMENT`/`p9`).
> - **The arcade shares the quiz's gate.** `GAMES` moved into the `mastery` phase
>   alongside the quiz; the separate `reward` phase and its `requires: 'ASSESSMENT'`
>   attempt-gate are gone. Both open at 80 XP. `GAMES` is still 0 XP (a `reward` task,
>   which the validator allows a zero for regardless of phase).
> - **1.4 and 1.5 gain a seventh task, `FACTOR_BLITZ` (15 XP, `p18`)** — a timed
>   "tap every factor under 13" grid (`src/tasks/FactorBlitz.jsx`). Those two units run
>   135 XP available (still under the validator's 150 warning line); the other four are
>   unchanged at 120.

| Order | Phase | Threshold | Task | XP |
|---|---|---|---|---|
| 1 | `concept` | 0 | `NOTES` | 20 |
| 2 | `concept` | 0 | `WORD_REC` | 20 |
| 3 | `practice` | 30 | `WORKBOOK` | 20 |
| 4 | `practice` | 30 | `NUM_DRILL` | 20 |
| — | `practice` | 30 | `FACTOR_BLITZ` (1.4, 1.5 only) | 15 |
| 5 | `practice` | 30 | `SHORT_ANSWERS` | 20 |
| 6 | `mastery` | 80 | `ASSESSMENT` (shown as "Quiz") | 20 |
| — | `mastery` | 80 | `GAMES` | 0 |

**Why over-provision.** `unitXPOf` already caps a unit at 100
([taskRegistry.js](../../src/tasks/taskRegistry.js), `Math.min(raw, 100)`), so the
overflow costs nothing and buys the thing that matters: perfection stops being the
price of a finished unit. A student who bombs the drill can still reach 100 through the
other five. Nobody has to replay a task to scrub out a lost mark.

It also makes the gates *more* forgiving, not less: 80 XP is 80% of the 100 reachable
before mastery, but **67% of the 120 actually on offer**.

**This needs a validator change — see §9.** `validate-entry.js:93` currently fails any
unit that does not total exactly 100.

### 6.1 What got cut, and how long each task should take

Six tasks at 20 XP is not licence for six long tasks. Each one is deliberately small —
the unit is **one good evening**, not a grind.

| Task | Size | Roughly |
|---|---|---|
| `NOTES` | 11–14 slides, 5 checks (§2, §3) | 12 min |
| `WORD_REC` | 5–6 key words (§4) | 4 min |
| `WORKBOOK` | **12 questions** — 4 Focus · 5 Practice · 3 Challenge, the last two being word problems demoted from the deck | 15 min |
| `NUM_DRILL` | **8 items** across three rungs (§5) | 8 min |
| `SHORT_ANSWERS` | **4 questions** (§6.3) | 10 min |
| `ASSESSMENT` | **6 questions**, `timeLimit: 8` (§6.2) | 8 min |

Cut on the way here: `SPELLING` (third pass over the same six words) and `DICTATION`
(transcription in which the maths is incidental) — both §4.

### 6.2 The assessment: six questions, one sitting

Short and real, and it comes **last**. `timeLimit: 8` minutes, `ASSESSMENT` /
`dbKey: p9`, 20 XP, behind an 80 XP gate — by the time a student opens it they have
done the deck, the words, the practice, the drill and the written answers.

| # | Item | Purpose |
|---|---|---|
| 1–2 | **Key words in context** | The vocabulary check that `WORD_REC` cannot give (it marks itself correct). Ask the word by *using* it: "Find the **product** of −6 and 4", not "what does product mean?" |
| 3–5 | **The unit's core skill** | One routine, one with the classic mistake as a distractor, one worked backwards |
| 6 | **One word problem** | Read the English, choose the calculation. The whole course in one item. |

Rules:

- **Maths only inside `$$…$$`** in assessment data. A single `$` is literal here — the
  opposite of notes and workbook. This is the trap that will bite when a question is
  copied across from `workbook.js`.
- **Bilingual `expEn`/`expVn` on every item**, enforced by `validate`. The explanation
  is the point: a wrong answer must teach.
- **Distractors are diagnoses**, not noise — the answer you get from the specific
  mistake the deck warned about (`4 × 6 = 24` for the LCM, `0` for an HCF, dropping a
  sign on `− −`). See [question-quality.md](../question-quality.md).
- No item may be a copy of a check question or a workbook question. Same skill, new
  numbers — otherwise it measures memory of this unit's screens, not the maths.

### 6.3 Short Answers: where the English actually gets measured

`SHORT_ANSWERS` (`dbKey: p6`, `nativeMax: 20`) is AI-graded on **content and English**.
For a course whose stated barrier is the English of the question, it is the only task
that generates that signal — and the only place a student writes a sentence.

**Four questions**, each asking for reasoning rather than a number:

- *"Explain why the LCM of 4 and 6 is 12 and not 24."* — the mistake the deck warned about
- *"Mr Bowen says the difference between −4 and 7 is 3. What has he done wrong?"*
- *"Write a sentence that means the same as 20 ÷ 5, using the word 'divided'."*
- One "which method would you use, and why" on the unit's core skill

Rules: bilingual prompts; a mark scheme, not a model answer; suggested words offered but
never required. Hold to [question-quality.md](../question-quality.md) — the two-part
grading and integrity lockdown there are already thought through.

### 6.4 The arcade shares the quiz's gate

`GAMES` is worth **0 XP** — it is what finishing the unit buys, not another thing to
grind, and its prize is the shared per-unit leaderboard. The validator permits a zero
for `reward` tasks whatever phase they sit in.

**As of 2026-08-27 it sits in the `mastery` phase beside the quiz, and both open at
80 XP** — one gate, no attempt condition. The earlier design gave the arcade its own
`reward` phase gated on the quiz being *attempted* (`requires: 'ASSESSMENT'`); that was
rolled into the quiz gate so the two unlock together. The attempt-gate machinery in
`resolveUnitTasks` (§9.3) still exists and other tracks may use it — only the Y7 units
stopped needing it.

---

## 7. Widgets

| Widget | Unit | Verdict |
|---|---|---|
| `TeamActivityWidget` | 1.1 | **Cut** — a two-minute team timer with peer scoring |
| `NumberLineWidget` | 1.1 | **Port** — does the one thing a static slide cannot |
| `TranslateWidget` | 1.1, 1.2 | **Port** — sentence → calculation, the course's whole thesis |
| `PairsGameWidget` | 1.2 | **Convert** to a solo timed game, or promote to the `GAMES` reward slot |
| `LcmFinderWidget` | 1.3 | **Port** — but the check now precedes the reveal |
| `HcfFinderWidget` | 1.4 | **Port**, same |
| `FactorHuntWidget` | 1.5 | **Port** |
| `WorkedExampleWidget` | 1.6 | **Port** — a self-paced stepper is *better* solo than projected |

Widgets receive `lang` from the layout context, exactly as in the classroom decks
([SplitLayout.jsx:16](../../src/components/notes/layouts/SplitLayout.jsx#L16)), so the
VN twins port unchanged.

---

## 8. Per-unit adaptation notes

Classroom slide numbers refer to `content/y7-math/<UNIT>/slides.js` in the `lessons`
repo, in document order.

### 1.1 Adding & Subtracting Integers — 22 → 13

- **Cut:** s2 Team Game (whiteboards, teams, timer) · s21 Homework callout.
- **Merge:** s4 "Above Zero, Below Zero" into s3 "The Number Line".
- **Cut to workbook:** Problem 2 The Bank Account, Problem 3 The Research Station →
  `Challenge` tier. Keep The Car Park and The Snail on the deck.
- **Convert to checks:** s12 "Read It Very Carefully" (whiteboards) and s14 "Two
  Questions That Look the Same" (discuss) — both are already questions with reveals.
- **Keep untouched:** the four English slides. s5 "Negative Five or Minus Five", s11
  "Which Way Does the Word Send You" (`compare`), s13 "Say It, Then Write It"
  (`TranslateWidget`), s15 "How Much Warmer? How Much Lower?".
- **Checks:** number line reading · adding a negative (s9 widget) · minus-a-negative
  (s10, the big rule) · which-way-does-the-word-send-you · The Snail.
- **Drill:** `column-add-sub`.

### 1.2 Multiplying & Dividing Integers — 21 → 13

- **Cut:** s13 Team Game: Hunt the Pairs (→ `GAMES` or solo widget) · s18 Homework.
- **Cut to workbook:** Problem 2 The Long Night, Problem 3 The Dive. Keep The Empty
  Account and The Durian Run (the durian problem is the deadpan-silly closer and it
  earns its place).
- **Convert to checks:** s2 "Check the starter" (whiteboards) and s9 "Which Number Gets
  Cut Up?" — the second is the single most valuable English moment in the unit.
- **Keep:** s4 "Keep the Pattern Going" (the derivation of −×− = +; the pattern is the
  proof and it must not become an assertion) · s7 "Is That Sentence Always True?" ·
  s8 Key word: Product · s10 "Say It, Then Write It".
- **Checks:** the pattern's next line · the four sign rules · product vs sum · which
  number gets divided · brackets first.
- **Drill:** `long-mult` — the headline 2-digit × 2-digit unit.

### 1.3 Lowest Common Multiples — 18 → 12

- **Cut:** s17 Homework · s13 the *Father of the Bride* clip (`HotDogClipWidget`, a
  YouTube embed). It was a room-laughing device and it depends on the network; keep
  `hotdog.jpg` and the problem itself, which stands on its own.
- **Cut to workbook:** Problem 3 The Two Taps, Problem 4 The Two Alarms.
- **Reword:** s2 "In pairs — no calculators" → "Two minutes, pen and paper. Write your
  guess." The flashing-lights hook is the best opener in the six decks; it stays.
- **Keep:** s3 Key word: Multiple · s4 "What Does *Common* Mean?" · s8 Mr Bowen's
  Method · s10 "Do Not Just Multiply Them".
- **Checks:** multiple vs multiply · *common* = shared, not ordinary · the LCM of 4 and
  6 (distractor: 24) · lights meeting at 12 · the buses.
- **Drill:** `times-sprint`.

### 1.4 Highest Common Factors — 20 → 13

- **Cut:** s19 Homework.
- **Cut to workbook:** Problem 3 The Staff Room Fruit Baskets.
- **Convert to checks:** s10 "Find the HCF" (whiteboards before the button) and s7
  "Why *Highest* This Time?".
- **Keep, and protect:** s5 "Factor or Multiple?" (`compare`) and s14–s15 "Numbers Next
  Door" → "All Three Are 1". That pair is the unit's investigation — the student makes
  a conjecture and then meets the word *conjecture*. It is the most valuable thing in
  the deck and it works better self-paced than projected.
- **Checks:** factor vs multiple · common factors of 12 and 18 · why highest · HCF is
  never "none" (distractor: 0) · the ribbons.
- **Drill:** `long-div`, exact division.

### 1.5 Tests for Divisibility — 20 → 13

- **Cut:** s19 Homework.
- **Cut to workbook:** Problem 2 The Biscuit Tins, Problem 3 The School Hall.
- **Reword:** s2 "Mr Bowen's Number" — the running hook where the class guesses which
  tests 3960 passes, then ticks their own sheet as each rule arrives. Solo this is
  *better*: the student's guesses persist in the deck and s11 scores them.
- **Merge:** the 2/5/10 and 4/8 test slides can share one `stack` if the deck runs long,
  but prefer keeping them separate — a rule per slide is the point.
- **Keep:** s4 "Three Ways to Say One Thing" (divisible by / factor of / multiple of) ·
  s10 "One Number Is Missing" (there is no easy test for 7 — an honest slide, rare).
- **Checks:** last-digit test · digit-sum for 9 · the 6 test needs *both* · why 7 has no
  test · the missing digit.
- **Drill:** `long-div` with remainders.

### 1.6 Square Roots & Cube Roots — 23 → 14

- **Cut:** s22 Homework.
- **Cut to workbook:** Problem 3 One Number Two Names, Problem 5 The Bathroom Wall.
  Keep Trap the Root, Mr Bowen's Number and The Cube Watermelons.
- **Keep:** the four key-word slides (square number, square root, cube number, cube
  root) and s14 "Consecutive" — the word the exercise uses and the book never defines.
- **Keep:** s13 "One Line at a Time" (`WorkedExampleWidget`); a self-paced stepper is
  strictly better solo than teacher-paced.
- **Checks:** which one is 5² (distractor: 10) · √144 · cube vs square · trap the root
  between two integers · consecutive.
- **Drill:** `long-mult`, squaring two-digit numbers.

---

## 9. Build order

**Phase 0 — code, once (nothing content-shaped until this lands)**

1. `NumberDrill.jsx` + the `NUM_DRILL` registry entry (§5). Build `long-mult` first,
   then `long-div`; `column-add-sub` and `times-sprint` are simplifications of those.

2. **Allow over-provisioned units** ([validate-entry.js:93](../../scripts/validate-entry.js#L93)).
   Today: `if (total !== 100) err(…)`. A six-task unit at 20 XP each totals 120 and is
   rejected, even though `unitXPOf` has always capped payout at 100.

   ```js
   if (total < 100) err(`${label}: tasks total ${total} XP — 100 is unreachable`);
   else if (total > 150) warn(`${label}: ${total} XP available for a 100 XP unit — gates lose meaning`);
   ```

   Every existing unit totals exactly 100, so relaxing the floor breaks nothing. Keep
   the **lower** bound as an error: a unit that cannot reach 100 is a real bug, and it
   is the one this check was written to catch.

3. **Attempt-gated phases**, for the arcade (§6.4). `resolveUnitTasks(unit, unitXP)`
   currently computes `locked: unitXP < phase.threshold` only. Add an optional
   `requires: 'ASSESSMENT'` on a phase, pass `scores` through, and lock while the
   required task has no progress record:

   ```js
   const gate = phase.requires ? resolveTask({ id: phase.requires })?.dbKey : null;
   locked: unitXP < (phase.threshold || 0) || (gate ? !scores?.[gate] : false),
   ```

   One call site to update (`UnitCard.jsx`). Validate that `requires` names a task the
   unit actually declares in an **earlier** phase — otherwise the arcade is unlockable
   only in theory, and it fails silently, which is this repo's signature failure.

4. Extend `validate-entry.js` for `unit.drill`: known `mode`, a non-empty `ladder`,
   bilingual `level`/`levelVn`, operands in range for the mode.

5. Add the drill's icon to the `IconMap` in `UnitCard.jsx` **and** confirm each unit's
   `meta.icon` resolves — an unknown name renders a generic book silently.

**Phase 1 — one unit end to end: 1.2**

Not 1.1. 1.2 is the unit whose drill (`long-mult`) is the headline ask, it has a
team-game cut, an English slide worth protecting, and word problems to push down into
the workbook — every adaptation move appears once. Get it right, then it is the
template.

**Phase 2 — 1.1, 1.3, 1.4, 1.5, 1.6**, in that order (1.1 first because it is a
rebuild over existing files, so it carries the only migration risk).

Per unit, the loop:

1. `data.js` — meta, phases (§6), `realWords` (§4), and **explicit** `notes: notes,`
   `workbook: workbook,` `drill: drill,` `assessment: assessment,` (see the trap below).
2. `notes.js` — reduce per §8, add 5 checks, add the narration prose the teacher used
   to supply.
3. `workbook.js` — 12 questions: the section's core exercise plus the two word problems
   demoted from the deck.
4. `drill.js` — one mode, three rungs, eight items, operands only.
5. `shortQA` in `data.js` — four reasoning questions with mark schemes (§6.3).
6. `assessment.js` — six questions, `timeLimit: 8`, `$$…$$` maths (§6.2).
7. `games.js` — the arcade's `gameConfig`, 0 XP, unlocked on an assessment attempt (§6.4).
8. `diagrams.js` / `widgets.jsx` — port; drop the classroom-only widgets.
9. Copy `images/*.jpg` → `public/images/Y7_MATH/<UNIT>/`, carry the `CREDITS.json`
   entries into [docs/credits.md](../credits.md). The Wikimedia photos are properly
   licensed; keep the attribution honest.
10. Update `docs/y7-math/plans/<UNIT>.md`.

**Gate, every unit:**

```bash
npm run validate && npm run audit:svg && npm run lint
```

Audio, after any deck edit:

```bash
PYTHONIOENCODING=utf-8 python generate_all_audio.py
```

---

## 10. Traps that will cost a day if forgotten

1. **`realWords: [...]` followed by a shorthand property generates no vocab audio.**
   `generate_all_audio.py` terminates the array at the next `name:`; `workbook,` has no
   colon, so the unit ships with slide narration and **no word, definition or sentence
   audio** and nothing reports it. Always write `workbook: workbook,`.
2. **Slide audio is keyed by position** (`slide_<unit>_<n>.mp3`). Inserting or removing
   a slide silently shifts every later file. Since this whole plan is *removing*
   slides, regenerate the entire unit's audio after any deck edit — never patch one file.
3. **Tasks must total at least 100 XP** and `unitXPOf` caps the payout at 100. Until
   the §9 change lands, `validate` demands *exactly* 100 and will reject these units.
4. **`Assessment.jsx` renders maths only inside `$$…$$`.** Notes and workbook use
   `$…$`. Copying a question between them breaks it silently.
5. **`meta.icon` resolves against a hand-written `IconMap`**, not all of lucide.
6. **`audit:svg` cannot see `<text>` emitted from a helper call** — it will report zero
   overflows while measuring nothing. Write label text literally.
7. **Checks may sit on any `layout` slide**, but on legacy `type` slides only
   `concept`/`warmup`. All six decks are layout-based, so this only bites if a slide
   gets downgraded during the reduction.
8. Screens sit behind Supabase auth — verify with a `preview-*.html` harness rather
   than trying to log in.

---

## 11. Still open

- **`PairsGameWidget`**: solo widget, or promote to the `GAMES` reward slot with the
  per-unit leaderboard? The leaderboard is a real motivator and costs no XP.
- **A seventh, cumulative unit** covering 1.1–1.6 — mixed, timed, no label saying which
  skill an item tests. The six short assessments each check one section in isolation;
  nothing in the plan yet makes a student face a *mixed* set, which is the gap
  [independent-learning.md](../independent-learning.md) §3.6 names and the shape the
  real end-of-unit test has. Cheap to build once the six exist: it is a selection from
  them with new numbers.
- **The *Father of the Bride* clip** — cut here; confirm that is acceptable.
- Whether the drill's per-position error log needs a teacher-facing view now or later.
