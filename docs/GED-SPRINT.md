# GED SPRINT — The Operating Doc

**This is the authoritative plan. If another doc in `docs/` disagrees with this one, this one
wins.** The others are background: [ged-unit-shape.md](ged-unit-shape.md) (task detail),
[independent-learning.md](independent-learning.md) (why the structural changes),
[ged-english-lessons.md](ged-english-lessons.md) (how to write an RLA unit),
[question-quality.md](question-quality.md) (question standards).

---

## 1. The situation

- **One Vietnamese ESL student. Sits the GED in 6 weeks.** All four subject tests.
- **Studies alone, 2–3 hours a day**, in this app. No teacher in the room.
- **Risk order, from the teacher:** **English ≫ Social Studies ≫ Math > Science.**
- Goal: pass all four (145 each). Not enrichment. If it doesn't move a score, it doesn't ship.

### The test

| Test | Time | Weights |
|---|---|---|
| **RLA** | 150 min | Reading ~75% informational / 25% literary; language & editing in context; **45-min Extended Response essay** from two opposing sources |
| **Math** | 115 min | Quantitative 45%, Algebraic 55%. Formula sheet + on-screen TI-30XS |
| **Science** | 90 min | Life 40%, Physical 40%, Earth & Space 20%. No essay |
| **Social Studies** | 70 min | **Civics & Government 50%**, US History 20%, Geography 15%, Economics 15%. No essay |

Science and Social Studies are **reading tests with content on top** — they ride on the RLA
reading strand. Math is the least English-dependent test.

**Test sitting order (ascending worry, so the biggest gets the longest runway):**
**Math (W4) → Science (W5) → Social Studies (W6) → RLA (W6, last).**

---

## 2. Where the app is now

Content lives in `src/data/<TRACK>/<UNIT>/` (`data.js` = meta + phases + realWords +
questions; plus `notes.js`, `workbook.js`, `diagrams.js`, `assessment.js`, `widgets.jsx`).
Registries are the only source of truth for ids: `src/tasks/taskRegistry.js`,
`src/components/trackRegistry.js`. Units are auto-discovered — no central list.

**Built:** `GED_ENG` 5 (`ENG_0A` pronouns, `ENG_0B` subject–verb, `ENG_1A` main idea,
`ENG_1B` purpose/tone, `ENG_1C` claims & evidence) · `GED_MATH` 2 (`MATH_1A` expressions,
`MATH_1B` linear equations) · `GED_HISTORY` 2 (`HIST_1A`, `HIST_1B`, both US history) ·
`GED_SCIENCE` **0 — the track is registered but the data folder does not exist.**

**Reskinnable from outside the GED folders (~¼ the cost of authoring):**

| Source | → GED |
|---|---|
| `Y9/MATH_1A` correlation & scatter graphs | Data & statistics |
| `Y9/MATH_2A` solids, volume, surface area | Geometric measurement |
| `Y9/SCIENCE_2A` tectonics | Earth & space science |
| `Y8/SCIENCE_1A` light & colour | Physical science (waves) |
| `Y8/MATH_1A` parallel lines & angles | Geometry |
| `Y7_MATH/U01_1` integers | Number sense |

---

## 3. Decision 1 — one module = one day

**A module is a day's work: 100 XP, ~2–2.5 hours of core work.** Not a topic, not a chapter.
A day. This makes the module the unit of scheduling: a week is five modules, the sprint is a
25-cell grid (§6).

It only works if modules are **uniform in size**, which is what §4 enforces.

---

## 4. Decision 2 — the unit shape, and what gets cut

### What each task is worth on the GED

| Task | id · dbKey | Verdict |
|---|---|---|
| Notes | `NOTES` · p10 | Keep — **but XP must be earned** (§5) |
| Vocab | `WORD_REC` · p1 | Keep — **but it must actually test** (§5) |
| Reading | `READ_COMP` · p4 | Keep — highest-transfer task in the app |
| Edit | `GRAMMAR_EDIT` · p13 | Keep and **expand** — the RLA language strand, tested exactly this way |
| Questions | `SHORT_ANSWERS` · p6 | Keep — written production, AI-graded on content **and English 0–3** |
| Essay | `ESSAY` · p8 | Keep — the Extended Response |
| Assessment | `ASSESSMENT` · p9 | Keep — timed, mixed, bilingual explanations, review phase. The model |
| Diagram | `DIAGRAMS` · p7 | **Repurpose → "Source Analysis"** — see below |
| Extra | `WORKBOOK` · p11 | **Promote → "Practice"** — see below |
| Spelling | `SPELLING` · p2 | **CUT from all GED units** — never tested |
| Listening | `DICTATION` · p3 | **CUT from GED** — the GED has no listening component. Keep for `ESL` |
| Game | `GAMES` · p12 | **CUT for the sprint** — motivation only |

**Two free wins:**

- **`DIAGRAMS` is a GED Source Analysis task with the wrong name.** It already renders an
  `inlineSvg`/image, takes a written answer, and AI-grades content + English. That is exactly
  a Science chart item, a Social Studies political cartoon, a map or graph item. Only the
  label and the authored content need to change.

  Two changes on top of the rename:

  - **Items may be MCQ or written**, mixed in one pool (`type: 'mcq'`, else written).
    MCQs are graded from the answer key with a bilingual `expEn`/`expVn` explanation —
    no AI call, no English 0–3 component — and carry `marks` (default 1) into the same
    points total. On the real test Social Studies and Science are almost entirely
    multiple choice, so **aim for roughly 2 MCQ : 1 written per unit**: closer to the
    exam, far cheaper to author, and the one written item keeps the writing alive.
  - **The source may be a real document.** `imageFile: "<name>.png"` resolves to
    `public/images/<TRACK>/<UNIT>/<name>.png` (the audio convention). Social Studies and
    Science pull real public-domain material — Library of Congress, National Archives,
    Census/BLS, NASA/NOAA — and every such item carries `credit` and `license`, shown
    under the image. **Maths stays authored SVG**: we control the numbers, so the mark
    scheme is exact and the graph matches the on-screen tools.
- **`WORKBOOK` — the tiered Focus/Practice/Challenge reveal-solution task — is used by one
  unit in the whole repo, and it is not a GED unit.** It is the best self-serve practice
  shape we have. Wire it into `GED_MATH`.

**Busy work being removed:** `SPELLING` sits in **six of nine** GED units (`ENG_0A`,
`ENG_0B`, `HIST_1A`, `HIST_1B`, `MATH_1A`, `MATH_1B`) — roughly an hour of the sprint spent
spelling words that are never spelled on the test.

### The standard shape — 3 phases, 6 tasks, 100 XP

| Phase (`id`) | Threshold | XP |
|---|---|---|
| **Learn** (`concept`) | 0 | 20 |
| **Drill** (`practice`) | 15 | 40 |
| **Prove** (`mastery`) | 45 | 40 |

Thresholds sit below each phase's own total so a half-finished phase never locks the student out.

| Track / unit type | Learn | Drill | Prove |
|---|---|---|---|
| **ENG — reading** (`1A/1B/1C`) | NOTES 10 · WORD_REC 10 | READ_COMP 20 · GRAMMAR_EDIT 20 | SHORT_ANSWERS 20 · ASSESSMENT 20 |
| **ENG — editing** (`0A/0B/3/4/5`) | NOTES 10 · WORD_REC 10 | GRAMMAR_EDIT 30 · WORKBOOK 10 | SHORT_ANSWERS 10 · ASSESSMENT 30 |
| **ENG — essay capstone** (`10`) | NOTES 10 · WORD_REC 10 | READ_COMP 20 (the two sources) · SHORT_ANSWERS 20 (frame drill) | ESSAY 40 |
| **HISTORY** and **SCIENCE** | NOTES 10 · WORD_REC 10 | READ_COMP 20 · DIAGRAMS 20 | SHORT_ANSWERS 20 · ASSESSMENT 20 |
| **MATH** | NOTES 10 · WORD_REC 10 | WORKBOOK 25 · BALANCE 15 | DIAGRAMS 20 · ASSESSMENT 20 |

`BALANCE` ([balance-tasks.md](balance-tasks.md)) is the interactive equation solver:
pick an operation, press **Do it to both sides**, and watch it land under both sides of
a notebook-style working while a beam that never tilts shows why. Algebraic reasoning is
55% of the Math test and inverse operations are its spine, so it earns its own task
rather than sitting inside the workbook. Its 15 XP comes out of `WORKBOOK`'s 40.

**Maths carries no written-response task.** `SHORT_ANSWERS` is cut from `GED_MATH`
entirely. `MATH_1A` was asking for prose answers to *"What is the primary difference
between an expression and an equation?"* and *"Simplify −4(2x − 5)"*, then grading the
English 0–3 on them. Maths is the least English-dependent test on the paper; taxing it
with sentence-writing spends the student's scarcest resource on his strongest subject.
Maths writing is the workbook's stepped solutions, and source analysis is mostly MCQ.

### Migration of the 9 existing units

- [ ] Remove `SPELLING` from `ENG_0A`, `ENG_0B`, `HIST_1A`, `HIST_1B`, `MATH_1A`, `MATH_1B`
- [ ] Add `GRAMMAR_EDIT` to `ENG_1A`, `ENG_1B`, `ENG_1C`
- [ ] Remove `ESSAY` from `ENG_0A`, `ENG_0B` (grammar units don't need one)
- [ ] `MATH_1A`, `MATH_1B`: swap drill to `WORKBOOK` 40, remove `READ_COMP` **and
      `SHORT_ANSWERS`** (needs `workbook.js` authored first — both are empty stubs)
- [ ] Re-title phases Learn / Drill / Prove; thresholds 0 / 15 / 45; each unit totals 100 XP
- [ ] `npm run validate` green

---

## 5. Decision 3 — structural changes for recall

### Three fixes (do first, all small)

1. **`NOTES` pays 10 XP for reaching the last slide** (`taskRegistry.js:66`,
   `Notes.jsx:178`). Add 2–3 embedded check questions; pay on those.
2. **`WORD_REC` scores a point for either button** (`Recognition.jsx:20` — `setScore(s => s+1)`
   and `isCorrect: true` fire regardless). Vocabulary is never tested. With English as the top
   worry this is the worst bug in the app.
3. **Relabel** `DIAGRAMS` → "Source Analysis", `WORKBOOK` → "Practice" in `taskRegistry.js`.
   Labels only — **`dbKey` values never change.**

### Three new surfaces (none belong to a unit)

**Prerequisite — give progress a memory.** Today it is
`{ current: Math.max(existing, score), answers }` (`supabaseClient.js:105`). No timestamp, no
attempt history, no per-item record — so spaced review, retention measurement and any
"you're improving" signal are impossible. Add `updatedAt`, an attempt history, and a per-item
log `{ itemId, correct, at }`, plus a per-track vocabulary store `{ word: { seen, right,
wrong, lastSeen } }`.

| Surface | When | What |
|---|---|---|
| **Review** | Daily, 15 min, before the module | 8–12 mixed items from **completed** modules, weighted to previous misses and longest-unseen. Bilingual explanation on every miss. This is the interleaving |
| **Section Rehearsal** | Saturday, timed | `ASSESSMENT` with items pooled across a whole track. English-only from week 4 |
| **Vocabulary Bank** | Feeds both | Shared across tracks: GED stem language (*infer, imply, best summarises, cite, evaluate, contradict*) + per-subject terms |

### Do not build during the sprint

New Notes layouts, note-card tones, the imagery pipeline, bilingual widgets, English trend
charts, or any rewrite of a built unit that a diagnostic hasn't flagged.

---

## 6. The module grid

`✅` built · `♻` reskin · **bold** = new build

| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| **W1** | `ENG_0A` Pronouns ✅ | `ENG_0B` Subject–Verb ✅ | `MATH_1A` Expressions & Equations ✅ | `ENG_1A` Main Idea & Detail ✅ | `HIST_1A` Colonial America ✅ |
| **W2** | `ENG_1B` Purpose & Tone ✅ | `MATH_1B` Linear Equations ✅ | `ENG_1C` Claims & Evidence ✅ | `HIST_1B` Constitution ✅ | `MATH_0D` **Data & Statistics** ♻ |
| **W3** | `ENG_4` **Sentence Boundaries** | `HIST_2A` **Civics 1** | `MATH_0E` **Geometric Measurement** ♻ | `ENG_5` **Punctuation & Confusables** | `HIST_0A` **Reading SS Sources** |
| **W4** | `ENG_10` **Extended Response** | `SCI_0A` **Reading Science** | `HIST_2B` **Civics 2** | `MATH_1E` **Word Problems → Equations** | `SCI_1A` **Life Science** |
| **W5** | `ENG_3` **Verb Tense** | `HIST_3A` **Economics** | `SCI_3A` **Earth & Space** ♻ | `MATH_0B` **Fractions, Decimals, Percents** | `ENG_6` **Transitions & Organization** |
| **W6** | *no new modules — timed rehearsal, error review, the last two sittings* | | | | |

**9 modules exist, 16 need building.** Weeks 1–2 need almost nothing authored, which buys a
fortnight to build weeks 3–5. Subject split: English 10 / Social Studies 6 / Math 6 /
Science 3 — matching the risk order.

**If the build slips, drop from the tail in this order:** `ENG_6`, `MATH_0B`, `HIST_3A`,
`SCI_1A`. **Never drop `ENG_10`, `HIST_2A`, or `SCI_0A`.**

### New module specs

- `MATH_0D` Data & statistics: mean/median/mode, tables, graphs — *reskin `Y9/MATH_1A`*
- `MATH_0E` Area, perimeter, volume, surface area, Pythagoras — *reskin `Y9/MATH_2A` + `Y8/MATH_1A`*
- `MATH_1E` Word problems → equations — the one place the English tax hits maths
- `MATH_0B` Fractions, decimals, percents
- `ENG_3` Verb tense & consistency — a known Vietnamese-L1 difficulty
- `ENG_4` Sentence boundaries: fragments, run-ons, comma splices — commonest ESL error
- `ENG_5` Punctuation & confusables: commas, apostrophes, their/there/they're
- `ENG_6` Transitions & organization
- `ENG_10` Extended Response capstone — structure + **a bank of ~15 sentence frames**
  (*"The author of Source A claims that ___. However, this evidence is weak because ___."*)
  drilled to automaticity. ~20% of the RLA score and it is a formula
- `HIST_0A` Reading social studies sources: documents, political cartoons, maps, charts
- `HIST_2A` Civics 1: the Constitution, three branches, checks & balances, federalism
- `HIST_2B` Civics 2: rights & amendments, elections, the role of the citizen
- `HIST_3A` Economics: supply & demand, markets, money, incentives
- `SCI_0A` Reading science: passages, tables, charts; variables, hypothesis, experimental design
- `SCI_1A` Life science: cells, body systems, health & nutrition
- `SCI_3A` Earth & space — *mine `Y9/SCIENCE_2A`*

Civics is 50% of Social Studies, currently at zero coverage, and is finite and factual — the
cheapest large block of marks in the plan.

---

## 7. The student's day

| | Block | Notes |
|---|---|---|
| 15 min | **Review** | Mixed recall across all finished modules. This is the interleaving |
| ~2 h | **The module** | Learn → Drill → Prove, in order |
| 30 min | **Writing** | One short answer or a timed essay paragraph. **Every day from day one** |

New learning wants one subject uninterrupted; retention wants mixing — Review supplies the
mixing, the module supplies the focus.

**If a day runs short, cut the module's last task. Never cut the writing.**

**Saturday:** one full timed Section Rehearsal — phone away, clock running.
**Sunday:** completely off.

**Vietnamese fades on a schedule** (the test has none):
weeks 1–2 full bilingual · week 3 glossary-only in practice · weeks 4–6 **all timed practice
English-only**, with Vietnamese back on the review screen afterwards to explain the miss.

**Diagnostics:** run GED Ready across all four subjects in the weekend before week 1. It is
the only calibrated read on where the student actually is, and it will move modules around.
Keep the RLA essay it produces as the "before" writing sample. Re-run per subject ~4–5 days
before booking each real test; green = book it.

---

## 8. Build order

1. **The three fixes** (§5) + the progress-memory schema change.
2. **The 9-unit migration** (§4) — data edits, no code.
3. **Review surface**, then the Vocabulary Bank.
4. **`ENG_10`** + the sentence-frame bank, then **`HIST_2A`** — the two highest-value modules.
5. Then the grid in week order, taking the ♻ reskins early when a week runs light.
6. **Section Rehearsal** before week 4.

---

## 9. House rules for every module

- **Bilingual:** every learner-facing field has its `…Vn` twin.
- **Explanations on every wrong answer**, bilingual — the Assessment's `expEn`/`expVn` is the
  standard. Alone, a wrong answer with no explanation teaches the error.
- **Question quality:** one idea per item; `scienceMaxMarks` = number of `markScheme` lines;
  suggested words pass the spoiler test — [question-quality.md](question-quality.md).
- **No exam-board name** in any learner-facing field.
- **Ids and dbKeys come from the registries only.** Never hardcode.
- **Diagrams** pass `npm run audit:svg`.
- **After changing a unit's vocab/passages/notes:** delete `public/audio/<TRACK>/<UNIT>/`,
  then `npm run sync-audio`.
- **Done =** 100 XP across the 6 tasks · `npm run validate` green · EN and VN both present ·
  every wrong answer explained.

---

## Sources

[GED Test Subjects](https://www.ged.com/about-test/test-subjects.html) ·
[GED Scores](https://www.ged.com/about-test/scores.html) ·
[GED Ready](https://www.ged.com/study/ged-ready.html)
