# GED English (RLA) Lesson Standards

How we build the GED English track. The goal is narrow and concrete: prepare **one
Vietnamese ESL learner to pass the GED Reasoning Through Language Arts (RLA) test.**
Every design choice serves real test prep — not general English enrichment. When a
lesson or activity doesn't move the needle on the RLA, it doesn't ship.

> The learner is a Vietnamese speaker, so bilingual (`vn*`) support, plain wording,
> and extra time are baseline requirements, not extras.

---

## 1. What the GED RLA test actually assesses

Build **to** the test, not around it. The RLA has three strands:

1. **Reading comprehension** (~75% informational texts, ~25% literary). Skills:
   central idea & supporting details, how ideas develop, author's purpose and point
   of view, tone/word choice, and **evaluating an argument and its evidence**.
2. **Language / editing** — grammar and usage tested *in context* by fixing a
   passage: sentence boundaries (fragments, run-ons, comma splices), agreement
   (subject–verb, pronoun–antecedent), verb tense & consistency, punctuation (commas,
   apostrophes), commonly confused words (their/there/they're), and transitions /
   organization. **This maps exactly onto the GrammarEdit drop-down task** — our
   most GED-shaped activity.
3. **Extended Response (the essay)** — read **two source passages that argue opposing
   positions** on one issue, then write an evidence-based argument analyzing them and
   taking a side. Officially **45 minutes**; **we give 60** as an ESL accommodation.
   Scored on argument/evidence, development/organization, and clarity/conventions.

Public speaking, presentation skills, and "speech analysis" are **not on the RLA.**
Content like that is out of scope and should be removed, not polished.

## 2. Design principles

- **Bite-size and contained.** One teachable focus per lesson (e.g. "pronouns" — not
  "grammar"). If it takes more than one sentence to describe the focus, split it.
- **No busy work.** Every activity must build a *testable* skill. Cut filler,
  needless repetition, and anything off-test. Fewer, sharper activities beat many.
- **Balanced skill mix, weighted to the focus.** Each lesson touches vocab, reading,
  and grammar in proportion to its focus — it does **not** use every task every time.
- **ESL-aware.** Bilingual `vn` fields throughout, plain language, scaffolding before
  assessment, generous time.
- **Real-test fidelity.** Passages, item types, and essay sources should look and
  feel like the GED: informational register, contemporary issues, two-sided arguments.

## 3. The activity toolkit — what each is for

Tasks come from `src/tasks/taskRegistry.js`. Choose by the skill the lesson targets:

| Task | Builds | Use when |
|---|---|---|
| **Notes** | teaches the concept | every lesson — the short, clear explanation up front |
| **Vocab (Recognition)** | vocabulary | words the lesson/passages actually use; keep on-topic |
| **Spelling / Dictation** | spelling reinforcement | **sparingly** — easiest tasks to become busy work |
| **Reading** | reading comprehension | reading-strand lessons |
| **Short Answers** | analysis in writing | reading lessons; follows [question-quality.md](question-quality.md) |
| **GrammarEdit** | the Language/editing strand | grammar lessons — the highest-value GED task |
| **Essay** | Extended Response | see §4 |
| **Assessment** | mixed GED-style check | end of a lesson; keep it short, mirror real item types |
| **Games** | motivation | optional; never the point of a lesson |

Rules of thumb:
- **Grammar lesson** → Notes + GrammarEdit + a short Assessment; light vocab.
- **Reading lesson** → Notes + Reading + Short Answers + on-topic vocab; GrammarEdit optional.
- Keep total volume tight: enough reps to learn, not to grind.

## 4. The essay standard

- `minutesAllowed: 60` (ESL accommodation vs. the real 45).
- Exactly **two `sources`** presenting **opposing positions** on one contemporary
  issue, in an informational/argumentative register — short enough for an ESL reader
  (~one tight paragraph each), like the real Extended Response. ENG_0A's phones-in-
  class pair is the reference shape.
- `task`: analyze which position is better supported and write an evidence-based
  argument — GED extended-response phrasing.
- Grades on the two-part model (Content mark scheme + English) per
  [question-quality.md](question-quality.md); the essay grader stays GED-calibrated.

## 5. The 10-lesson blueprint

The whole RLA, covered in ten contained lessons. Language/editing first (concrete
and high-yield for an ESL learner), then reading, then the essay as the capstone.
Add lessons later if a topic needs its own; for now, ten.

| # | Lesson | Strand | Status |
|---|---|---|---|
| 1 | Pronouns | Language | **ENG_0A — good; polish** |
| 2 | Subject–Verb Agreement | Language | **ENG_0B — good; polish** |
| 3 | Verb Tense & Consistency | Language | new |
| 4 | Sentence Boundaries (fragments, run-ons, comma splices) | Language | new |
| 5 | Punctuation & Confusable Words (commas, apostrophes, their/there/they're) | Language | new |
| 6 | Transitions & Organization | Language / Writing | new |
| 7 | Reading for Main Idea & Detail | Reading | from **ENG_1A** |
| 8 | Author's Purpose, Tone & Point of View | Reading | new (mine ENG_1B) |
| 9 | Claims, Evidence & Evaluating Arguments | Reading | from **ENG_1A/1B** |
| 10 | The Extended Response Essay | Writing | capstone |

**Current inventory:**
- **ENG_0A (Pronouns), ENG_0B (Subject–Verb Agreement)** → lessons 1–2. Good; polish only.
- **ENG_1A (Foundations of Reading & Argument)** → basis for lessons 7 and 9.
- **ENG_1B (Rhetorical Analysis & Syntax Mastery)** → tries to do too much at once;
  mine it for lessons 8 and 9, split into contained pieces.
- **ENG_2A (Speeches)** → **remove.** Public-speaking analysis isn't on the RLA.

## 6. Authoring checklist (per lesson)

- [ ] One clear focus, describable in a single sentence.
- [ ] Maps to a real RLA skill (Reading / Language / Writing).
- [ ] Activity mix serves the focus — no filler, no task-for-its-own-sake.
- [ ] Vocab is on-topic and genuinely useful, not padding.
- [ ] GrammarEdit / Reading / Short Answer items follow [question-quality.md](question-quality.md).
- [ ] Essay: 60 minutes, two GED-style opposing sources.
- [ ] Bilingual `vn` fields present.
- [ ] Assessment mirrors GED item types and stays short.
- [ ] `npm run validate` green; task ids/dbKeys only from the registries.

## Related

[README.md](README.md) · [question-quality.md](question-quality.md) ·
[svg-diagrams.md](svg-diagrams.md) · [imagery-sourcing.md](imagery-sourcing.md)
