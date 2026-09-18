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
| **Find & Fix** (`PROOFREAD`, p33) | finding a slip in running prose, then fixing it | every editing lesson, and after the essay — it is the conventions trait's actual skill |
| **Order It** (`SEQUENCE`, p34) | organisation and transitions | organisation lessons and the essay capstone — Trait 2 made visible |
| **Essay** | Extended Response | see §4 |
| **Assessment** | mixed GED-style check | end of a lesson; keep it short, mirror real item types |
| **Games** | motivation | optional; never the point of a lesson |

**Find & Fix item** (`unit.proofread`, engine `src/utils/proofread.js`): a passage of
30+ words with 2+ errors. Each error quotes the wrong phrase *exactly* (≤ 6 words, once
in the passage, on word boundaries) and gives `right`, optional `accept` alternatives,
a `kind` (the name the essay report uses: *Comma splice*, *Subject-verb agreement*…) and
a bilingual explanation. The student clicks the words, types the fix; offsets, marking
and the "almost — check your capitals / punctuation" hints are derived. The validator
refuses an error the screen could not find.

```js
proofread: [{ id: "pf1", title: "The Late Delivery", titleVn: "…",
  passage: "Our shop ordered fifty boxes of paper last Monday, the delivery was …",
  errors: [{ id: "e1", wrong: "Monday, the delivery", right: "Monday, but the delivery",
    accept: ["Monday. The delivery"], kind: "Comma splice", expEn: "…", expVn: "…" }] }]
```

**Order It item** (`unit.sequence`, engine `src/utils/sequence.js`): 3–8 `items` authored
in the correct order, each `{ text, textVn }`, plus bilingual `title`, `prompt` and
explanation. The scramble is a seeded derangement (nothing starts in place; the same
puzzle every time), and marking is slot by slot.

Rules of thumb:
- **Grammar lesson** → Notes + GrammarEdit + a short Assessment; light vocab.
- **Reading lesson** → Notes + on-topic Vocab + Reading + Short Answers + Diagrams,
  then the practice Essay and a short Assessment. GrammarEdit optional; `Games` and
  `Workbook` are dropped as off-focus. Lessons 7–9 (ENG_1A/1B/1C) are the reference
  shape, each 100 XP across concept/practice/mastery phases.
- Keep total volume tight: enough reps to learn, not to grind.

## 4. The essay standard

- **Timing.** A prompt's `minutesAllowed` applies in *practice* mode only (the reading
  units' `er1` allow 60 as an ESL accommodation). **Exam mode is always 45** — test day —
  whatever the prompt says (`GED_EXAM_MINUTES` in `src/utils/essayPrompts.js`), and it
  hides the `guidelines`, which are coaching the real test never prints.
- Exactly **two `sources`** presenting **opposing positions** on one contemporary
  issue, in an informational/argumentative register.
- **The test-length format** — what the real stimulus looks like, and the standard for
  every new prompt. `ENG_11` (six prompts) and the reading units' `er1` are the reference:
  - **550–650 words across the two sources**, four to six paragraphs each (separate
    paragraphs with `\n\n`; the screen numbers them straight through both texts). The
    validator fails a prompt over 700; at 500+ the picker tags it **Test length**.
  - Each source carries a **`type`** (*Op-ed, Speech, Letter to the editor, Press release,
    News article, Government report, Public statement*) and a **`byline`** (*"By Dr. Rebecca
    Tran, professor of economics at…"*, *"Issued by the … Association, which represents…"*).
    Who is speaking is evidence — an interested party vs. a researcher — so the byline is
    shown under the title **and** folded into what the grader reads (`graderSources()`; the
    backend only reads `title` and `text`).
  - **Both sides use some evidence and at least one fair point.** The weaker side leans on
    the moves the GED rewards naming: one story as proof, a forecast stated as fact,
    "everyone agrees", the unnamed expert, cause read into coincidence, fear/feelings, a
    stake in the outcome. Give the stronger side one soft spot too.
  - Vary which side is stronger (not always Source 1, not always the change), and make
    some prompts genuinely close — `ENG_11`'s leaf-blower pair is the model.
  - American spelling and settings; invented places, people and organizations.
  - `task` in the test's words: *"The [kind] and the [kind] present opposing views on
    whether …. In your response, analyze both positions presented in the two texts to
    determine which one is best supported. Use relevant and specific evidence from both
    texts to support your response. You should expect to spend up to 45 minutes planning,
    drafting, and editing your response."*
- The shorter practice pairs (~150 words a side — `ENG_10`'s bank, the reading units' `er2`)
  stay as the lower rung of the ladder: the formula first, then test length.
- Graded on the GED's three traits (argument & evidence, development & organisation,
  conventions; 0–2 each) by the GED-calibrated grader — never the Content-mark-scheme
  model. A GED prompt needs no `markScheme`/`modelAnswer`.
- **A GED unit's `essay` is a bank** — an array of prompts, each with an `id` (it keys
  the student's saved work) and a short `title` for the picker. `src/utils/essayPrompts.js`
  normalises a single object and a bank to the same shape, and the validator requires
  two sources of 60+ words per GED prompt. Two prompts per unit is the norm, so a unit
  revisited on the study plan is a fresh essay.
- **The task flow** (`src/tasks/Essay.jsx`, GED path): a start screen (pick a prompt,
  *practice* or *exam conditions*, and a "watch for these" list built from the errors in
  the student's last three essays) → a planner (position, strongest evidence, weakest
  evidence, concession, conclusion) → writing, with a sentence-frames pane
  (`src/utils/essayFrames.js`; a prompt may append its own with `frames`) → the score →
  the revision workshop.
- **Every graded essay is kept** in `progress[track].__essays` (`src/utils/essayArchive.js`):
  the text, plan, score, the examiner's whole report and the errors marked, upserted by
  id when the revision finishes. The student reads them back on **My Writing** (`/writing`,
  `src/views/Writing.jsx`): trend, trait averages, the errors that keep coming back, and
  each essay's report. The teacher sees the same report in the student drawer and can
  leave a note (`annotateEssay` admin endpoint), which the student sees above the report.

## 5. The 10-lesson blueprint

The whole RLA, covered in ten contained lessons. Language/editing first (concrete
and high-yield for an ESL learner), then reading, then the essay as the capstone.
Add lessons later if a topic needs its own; for now, ten.

| # | Lesson | Strand | Status |
|---|---|---|---|
| 1 | Pronouns | Language | **ENG_0A — built, polished** |
| 2 | Subject–Verb Agreement | Language | **ENG_0B — built, polished** |
| 3 | Verb Tense & Consistency | Language | **ENG_3 — built** |
| 4 | Sentence Boundaries (fragments, run-ons, comma splices) | Language | **ENG_4 — built** |
| 5 | Punctuation & Confusable Words (commas, apostrophes, their/there/they're) | Language | **ENG_5 — built** |
| 6 | Transitions & Organization | Language / Writing | **ENG_6 — built** (Order It) |
| 7 | Reading for Main Idea & Detail | Reading | **ENG_1A — built** |
| 8 | Author's Purpose, Tone & Point of View | Reading | **ENG_1B — built** |
| 9 | Claims, Evidence & Evaluating Arguments | Reading | **ENG_1C — built** |
| 10 | The Extended Response Essay | Writing | **ENG_10 — built** (capstone, no assessment) |
| 11 | The Full-Length Extended Response | Writing | **ENG_11 — built** (test-length sources) |

**Current inventory:**
- **ENG_0A (Pronouns), ENG_0B (Subject–Verb Agreement)** → lessons 1–2. Built and polished.
- **ENG_1A (Main Idea & Detail)** → lesson 7. Refocused from the old broad "Foundations
  of Reading & Argument" unit; its argument half moved to ENG_1C.
- **ENG_1B (Purpose, Tone & Point of View)** → lesson 8. Refocused from the old
  "Rhetorical Analysis & Syntax" unit; the college-level rhetoric (juxtaposition,
  subordination, synthesis) was above GED/ESL level and was retired.
- **ENG_1C (Claims, Evidence & Evaluating Arguments)** → lesson 9. New unit mined from
  the ENG_1A/1B argument material; carries the flagship two-source Extended Response.
- **ENG_2A (Speeches)** → **removed.** Public-speaking analysis isn't on the RLA.

Each reading unit (7–9) is contained to one focus and uses the shape Notes + Vocab +
Reading + Short Answers + Find & Fix + Diagrams + Essay + Assessment, with
`games`/`workbook` dropped as off-focus.
- **ENG_3, ENG_4, ENG_5** → lessons 3–5, the editing shape: Notes + Vocab | GrammarEdit 25 ·
  Find & Fix 15 | Short Answers 10 · Assessment 30. **ENG_6** swaps Find & Fix for Order It.
- **ENG_10** → lesson 10, the capstone: Reading (the sources) · Order It · Short Answers
  (frame drill) | Essay 30 · Find & Fix 10. No assessment — the essay is the test.
- ENG_0A/0B gained Find & Fix in the Prove phase; ENG_1A/1B/1C gained it in Drill and
  a two-prompt essay bank. Their `er1` prompts were rebuilt at test length on 2026-09-18
  (same ids, tasks and positions), and every deck now carries three Notes checks.
- **ENG_11** → lesson 11, added after the ten: the essay against **test-length sources**.
  Notes (the real stimulus, reading 600 words in ten minutes, who is speaking, six
  reasoning moves, weighing two sides that both have numbers) + Vocab | an argument-
  evaluation Quiz 20 (in Drill: spotting the moves is practice, not the test) + four
  paragraph-writing assignments 20 (credibility, name two flaws, weigh two sets of
  numbers, concede-and-rebut) | a six-prompt test-length Essay bank 30 + Find & Fix 10.
  Its prompts add frames for credibility and reasoning moves (`frames` on each prompt).

## 6. Authoring checklist (per lesson)

- [ ] One clear focus, describable in a single sentence.
- [ ] Maps to a real RLA skill (Reading / Language / Writing).
- [ ] Activity mix serves the focus — no filler, no task-for-its-own-sake.
- [ ] Vocab is on-topic and genuinely useful, not padding.
- [ ] GrammarEdit / Reading / Short Answer items follow [question-quality.md](question-quality.md).
- [ ] MCQ distractors are clean and parallel — each isolates the one thing being
      tested, with no smuggled extra words (e.g. verb-form options differ only in the verb).
- [ ] Essay: two opposing sources in the test-length format (§4) — `type`, `byline`,
      550–650 words, evidence and a fair point on both sides; in a bank, every prompt has
      an `id` and a `title`.
- [ ] Find & Fix errors quote the passage exactly, once each; `kind` uses the essay
      report's names so the Writing page totals them together.
- [ ] Bilingual `vn` fields present.
- [ ] Assessment mirrors GED item types, stays short, and has a **balanced A–D
      answer key** — the validator warns on a lopsided key (>50% one letter) or an
      option that is never correct.
- [ ] Any new or edited diagram passes `npm run audit:svg` (see [svg-diagrams.md](svg-diagrams.md)).
- [ ] After changing a unit's vocab, passages or notes, refresh its audio: delete
      `public/audio/GED_ENG/<UNIT>/` then run `npm run sync-audio` (it only fills
      files that are missing).
- [ ] `npm run validate` green; task ids/dbKeys only from the registries.

## Related

[README.md](README.md) · [question-quality.md](question-quality.md) ·
[svg-diagrams.md](svg-diagrams.md) · [imagery-sourcing.md](imagery-sourcing.md)
