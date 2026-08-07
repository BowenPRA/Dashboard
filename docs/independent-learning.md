# Independent Learning — What the App Must Replace

The `lessons` repo is a **classroom** tool: a teacher paces it, asks the questions, and
checks the notebooks. The Dashboard is the opposite — a Vietnamese ESL student, alone,
on a laptop, working toward the **GED**.

[lesson-standard.md](lesson-standard.md) is the bar for the *teaching*. This document is
the bar for everything the teacher used to do and now nobody does.

---

## 1. The three things the room provided

When you take the teacher out, three functions disappear silently. Nothing in the app
currently replaces them.

| The teacher did this | Independently, today |
|---|---|
| **Paced it** — "we're doing 1.1 today, twenty minutes on the number line" | The student faces a grid of unit cards and must self-direct |
| **Checked it** — walked the room, looked at the notebook, cold-called | Notes award full XP for pressing Next; vocabulary is never tested |
| **Made them come back** — the next lesson revisits yesterday | Nothing in the app ever asks about a unit again once it is finished |

The third is the expensive one. **A unit completed at 100 XP in March is indistinguishable
from one completed yesterday**, and no mechanism ever asks the student to prove they still
know it. For a test taken months after the studying, that is the whole ballgame.

---

## 2. What already works — build on these, don't replace them

- **Assessment is the model.** Timed (`timeLimit`), per-passage glossaries, a review phase,
  and **bilingual explanations on every item** (`expEn` / `expVn`). A student who gets an
  item wrong is told why, in Vietnamese if they need it. This is exactly right; the rest of
  the app should aspire to it.
- **Per-slide audio**, derived from slide position
  ([taskRegistry.js:60](../src/tasks/taskRegistry.js#L60)). The `lessons` decks have no
  narration because a teacher was talking. Here it is the teacher's voice — a genuine
  advantage of the independent format, and currently under-used.
- **The Workbook task** — tiered Focus / Practice / Challenge with stepped solutions
  ([workbook-tasks.md](workbook-tasks.md)) — is the best-shaped self-serve practice in the
  app: the student attempts, then unfolds the reasoning one step at a time.
- **GrammarEdit** is the most GED-shaped task we have, correctly identified in
  [ged-english-lessons.md](ged-english-lessons.md) §3.
- **Two-part grading, suggested-words-not-required, and the integrity lockdown**
  ([question-quality.md](question-quality.md)) are already thought through and hold up.
- **Phase thresholds** give a unit a spine: concept → practice → mastery, gated on XP.

---

## 3. The gaps

### 3.1 Structural: progress has no time dimension

Progress is stored per task as `{ current, answers }`, where `current` is
`Math.max(existing, score)` ([supabaseClient.js:105](../src/utils/supabaseClient.js#L105)).

That single line rules out, today:

- **Spaced review** — nothing knows when anything was last done.
- **Streaks or any daily habit loop.**
- **Any measure of retention** — the score is a permanent high-water mark that can only
  go up. It records the best day the student ever had, not what they know now.
- **Any longitudinal graph** of the thing we most want to move: their English.

Everything else in this document depends on fixing this first. The minimum viable change is
a timestamp and an attempt history per task; the useful version adds a per-item log.

### 3.2 No per-item history, so nothing can adapt

`answers` is a resume blob, not a record. We cannot answer "which words does this student
keep failing?" or "does he lose marks on subject–verb agreement or on run-ons?" — so we
cannot build review that targets weakness, and neither the student nor the teacher gets an
error log.

### 3.3 Notes are unearned XP

`onComplete(10)` is hardcoded and fires when the last slide is reached
([taskRegistry.js:66](../src/tasks/taskRegistry.js#L66),
[Notes.jsx:178](../src/tasks/Notes.jsx#L178)). Clicking Next thirteen times is worth full
marks.

Worse, the notes are written for a projector. A solo student reads *"Play in teams of two,
one whiteboard each"*, *"discuss with your partner"*, *"copy this into your notebook"* —
instructions with no one on the other end. In the classroom the copy-down panel worked
because the teacher checked the notebook. Here it is a suggestion into the void.

### 3.4 Vocabulary is exposed, never tested

`Recognition` awards a point and marks the answer correct **whichever button is pressed**
([Recognition.jsx:20–23](../src/tasks/Recognition.jsx#L20)). It is a self-rated flashcard,
which is a fine *first* exposure — but it is scored as if it were a check.

The word is then reinforced twice more inside the same unit (Spelling, Dictation) and
**never appears again**. For an ESL learner whose ceiling on every other GED subject is
vocabulary, that is the wrong shape: a word met three times in one hour and never revisited
is a word forgotten by next month.

### 3.5 English is measured every time, then thrown away

Every open response is graded on English 0–3 by the backend grader, shown in the feedback
panel, folded into XP, and discarded
([ShortAnswers.jsx:116](../src/tasks/ShortAnswers.jsx#L116),
[Diagrams.jsx:202](../src/tasks/Diagrams.jsx#L202),
[Essay.jsx:282](../src/tasks/Essay.jsx#L282)).

"Constantly improving English" is the stated goal, we generate the exact signal that would
show it, and we keep none of it. A student cannot see that their English mark has gone from
1.4 to 2.3 over eight weeks — which is the single most motivating thing we could show them.

### 3.6 Nothing is cumulative, and nothing is mixed

Every task is scoped to one unit, and every unit teaches one focus. The GED is the
opposite: mixed, timed, cumulative, with no label telling you which skill an item is
testing. **A student can finish every unit in the app at 100 XP and never once have faced a
mixed set** — which means the first time they meet one will be the real test.

### 3.7 GED readiness is unmeasurable, and three of the four tests have no plan

There is no mapping from units to GED test sections, no practice test, and no readiness
estimate. The app's whole purpose is "pass the GED" and it cannot say how close anyone is.

Coverage is thinner than the goal implies:

| GED test | Blueprint | Units built |
|---|---|---|
| **RLA (English)** | [ged-english-lessons.md](ged-english-lessons.md) — 10 lessons | 5 of 10 (`ENG_0A`, `0B`, `1A`, `1B`, `1C`) |
| **Mathematical Reasoning** | ✗ none | 2 (`MATH_1A`, `MATH_1B`) |
| **Social Studies** | ✗ none | 2 (`HIST_1A`, `HIST_1B`) |
| **Science** | ✗ none | **0** — `GED_SCIENCE` is registered in [trackRegistry.js:37](../src/components/trackRegistry.js#L37) with no data folder |

The RLA blueprint is good and should be the template. The other three need one before any
more units get written, or we will build by accretion and discover the gaps late.

### 3.8 The Vietnamese scaffold never fades

`vn` fields sit alongside English everywhere, including inside the Assessment. That is
right for instruction and wrong for a rehearsal of an English-only test: a student who
always reads the Vietnamese never finds out whether they could have managed without it.

There is no policy on where the scaffold belongs, so it is simply everywhere.

### 3.9 There is no "what do I do today"

Home → track → a grid of unit cards. No daily target, no session shape, no recommendation,
no sense of a finish line. Self-direction is a skill; we are currently requiring it as a
prerequisite rather than teaching it.

---

## 4. Principles for the independent version

The counterpart to the seven principles in [lesson-standard.md](lesson-standard.md).

### 1. Retrieval beats volume
The fix for "they forgot it" is **not more exercises** — it is meeting the same item again
later. Five minutes of mixed recall on Thursday is worth more than thirty more questions on
Monday. This is also the answer to "no busy work": spaced review lets us build *less*
practice per unit, not more.

### 2. Nothing is finished, it only becomes due
Replace "unit complete, 100 XP" as the terminal state. A unit that has not been touched in
three weeks should surface again as a short review, not as a card that already says 100.

### 3. Every wrong answer must teach
Alone, a wrong answer with no explanation is worse than no question — the student either
guesses again or absorbs the error. The Assessment's bilingual `expEn`/`expVn` explanations
are the standard; Reading MCQs, GrammarEdit items and vocab checks should all meet it.

### 4. Earn the XP
XP should be evidence that something was learned. A task that pays out for pressing Next
teaches the student that clicking is the goal, and it makes every dashboard number a lie.

### 5. Rehearse the real test, not just the syllabus
Somewhere in each track there must be a **mixed, timed, English-only, unlabelled** set. Not
often — but before test day, several times.

### 6. The scaffold fades on purpose
Vietnamese is a bridge, not a permanent fixture. Full bilingual for instruction and
explanation; glossary-only for practice; **English-only for anything that rehearses the
test**, with the Vietnamese available on the review screen afterwards.

### 7. Show the student they are getting better
The English mark, the review accuracy, the readiness estimate. An independent learner has
no teacher saying "that's much better than last month" — the app has to say it, from data,
truthfully.

---

## 5. Proposed waves

Ordered so each is independently useful, and each unblocks the next. "Not busywork" is a
required column, not a rhetorical one.

### Wave 1 — Give progress a memory *(unblocks everything)*
Extend the progress record from `{ current, answers }` to include `updatedAt`, an attempt
history, and a per-item log (`{ itemId, correct, at }`). Add a per-track vocabulary store
keyed by word: `{ seen, right, wrong, lastSeen }`.

*Schema-only. No student-visible change, and no new work for the learner.*

### Wave 2 — The Review deck
One button on the track dashboard. Five minutes, 8–12 items, drawn **only from units the
student has already completed**, weighted toward items answered wrong and items unseen the
longest. Mixed types: a vocab check, a grammar item, a short reading question. Bilingual
explanation on every miss.

*Not busywork: it replaces re-grinding a finished unit, and it lets every future unit ship
with fewer practice items because retention no longer depends on volume.*

### Wave 3 — Make Notes earn their XP, and give the notebook a home
- 2–3 **check questions** embedded in the deck (predict → answer → reveal), with XP
  proportional to those rather than to reaching the last slide.
- A **notebook capture**: the 3–4 items a slide marks as copy-down get typed once into a
  saved field the student can read back — and those become source items for the Wave 2
  review deck.
- Rewrite projector-only instructions ("in pairs", "on your whiteboard") into solo form
  ("think of your answer, then reveal").

*Not busywork: the typing replaces a notebook they were supposed to keep anyway, and it is
the only artefact of the lesson that survives it.*

### Wave 4 — Vocabulary that is actually tested, and comes back
Keep the self-rating first pass, then add a real check (word → definition, distractors from
the same unit), logging right/wrong per word into the Wave 1 store. Words the student gets
wrong resurface in Review; words they get right three times stop appearing.

### Wave 5 — GED readiness
- Tag every unit and every assessment item with a **GED skill code**.
- A readiness panel per track: skills covered, skills weak, last mixed-practice score.
- One **full-length timed practice test** per track, assembled from the item bank, English
  only, unlocked at a threshold.
- Write the missing blueprints — **Math, Social Studies, Science** — on the model of
  [ged-english-lessons.md](ged-english-lessons.md), before authoring more units.

### Wave 6 — Show the improvement
Persist `englishScore` with a timestamp on every graded response and chart it. Ask the
backend grader to also return 1–2 structured `errorTags` (e.g. `run-on`,
`subject-verb`, `article`) so the app can say *"your commonest slip this month is sentence
boundaries — here are three GrammarEdit items on it."*

*Requires a backend grader change; see [question-quality.md](question-quality.md)
§Implementation status for the deploy path.*

### Wave 7 — A daily shape
A small "today" card on the track dashboard: `5-min review → continue ENG_1C practice`.
One recommendation, not a planner. Streak optional and only if it never punishes.

---

## 6. What we should *not* build

Stated explicitly, because each is a plausible-sounding way to add busywork:

- **More Spelling and Dictation.** Already flagged as the easiest tasks to become filler
  ([ged-english-lessons.md](ged-english-lessons.md) §3). Reps are not the problem;
  spacing is.
- **Longer units.** The fix for weak retention is Wave 2, not more questions per unit.
- **Leaderboards or competitive streaks.** One or two students, working alone; a streak
  that punishes a missed day is a reason to stop.
- **General English enrichment.** The RLA standard is already correct: if it doesn't move
  the needle on the test, it doesn't ship.
- **A second Notes format.** Fix the one we have (Wave 3) rather than forking it.
- **Any new task type before Wave 1.** Without a memory, every new task is another thing
  the student does once and never sees again.

---

## Related

[lesson-standard.md](lesson-standard.md) · [lesson-renderer-gap.md](lesson-renderer-gap.md) ·
[ged-english-lessons.md](ged-english-lessons.md) · [question-quality.md](question-quality.md) ·
[workbook-tasks.md](workbook-tasks.md)
