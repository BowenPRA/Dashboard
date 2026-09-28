# AMC 8 Prep (`AMC8`) — Course Guide

How to build a unit of the **AMC 8 Prep** track: one full practice paper, sat under contest
conditions and then reviewed problem by problem.

**The exemplar is `src/data/AMC8/PT_01`** (Practice Test 1, the problems of the 2024
AMC 8). When in doubt, copy its structure.

---

## 1. Track facts

| | |
|---|---|
| Track id | `AMC8` (registered in `src/components/trackRegistry.js`, red, `Trophy`, group *Problem Solving*) |
| Language | **English only** (`bilingual: false`): no `vn*` twins. The contest words are what the Vocab task teaches. |
| Unit id | `PT_<two digits>` — `PT_01` is Practice Test 1. One unit is one paper. |
| Folder | `src/data/AMC8/<UNIT>/` and `public/audio/AMC8/<UNIT>/` |
| Visibility | Not in the `GED` group: the student's `app_metadata.enrolled_tracks` must include `"AMC8"` (teacher admin), or they must be on the preview/QA account. |
| Harness | `preview-amc8.html?unit=PT_01` mounts every task without auth. `?open=AMC_TEST`, `?paper=mixed` (a handed-in paper, for the Review), `?paper=BCEEB-…` (a paper you choose), `?left=90` (a paper with 90 seconds left), `?slide=12`; the FIGURES and DIAGRAMS cases lay every SVG on one page. |

The contest: **25 questions, five choices each, 40 minutes, no calculator, 1 point for a
correct answer and 0 for a blank or a wrong one.**

---

## 2. The unit shape

| Step | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Get Ready** | 0 | `NOTES` 10 · `WORD_REC` 10 · `WORKBOOK` 15 · `FACTOR_BLITZ` 10 | 45 |
| `practice` — **Practice Test** | 10 XP | `AMC_TEST` 40 | 40 |
| `mastery` — **Review** | 10 XP **and** the test handed in (`requires: 'AMC_TEST'`) | `AMC_REVIEW` 25 | 25 |

110 XP for a 100 XP unit. There is no Quiz — the paper is the assessment — so the unit
finishes at 80 XP (`taskRegistry.isUnitComplete`).

**The one rule: nothing before the test works a problem of the test.** The deck, the vocab
and the warm-up teach the *ideas* the paper leans on, with fresh numbers and fresh
contexts. The paper's own problems are met twice only: in the test, and in the Review.
Give a content author the list of the paper's problems so they know what to stay away from.

---

## 3. The two engines

Both read the unit's `amcTest` (`test.js`). Helpers, blob shapes and the validator check
are in `src/utils/amcTest.js`; the shared problem text, figure and choice row are in
`src/components/amc/AmcParts.jsx`.

### Practice Test — `AMC_TEST`, dbKey `p53`, `src/tasks/AmcTest.jsx`

- **Cover**: the rules, written as the front of a booklet, and *Begin*.
- **Running**: one problem at a time beside a bubble sheet (either can be used to answer).
  Flag a question, erase an answer, jump by number; keys `A`–`E`, arrows, `F`. Nothing is
  marked while the test runs.
- **The clock is a deadline.** *Begin* stamps `deadline` into the resume blob and every
  answer is checkpointed, so closing the tab does not stop the clock and does not lose the
  paper. A paper whose time ran out while it was closed is handed in as it stood.
- **Results**: the score out of 25, right / wrong / blank per question, the score by topic,
  and the award line reached. It does **not** show the answers — that is the Review's job.
- The score is the number of correct answers (`nativeMax: 25`), scaled to the task's XP.
- *Sit the test again* gives a blank paper; the best score is kept and the Review restarts
  from the new paper.

### Review — `AMC_REVIEW`, dbKey `p54`, `src/tasks/AmcReview.jsx`

- Locked until the paper is **handed in**. A phase's `requires` normally opens as soon as a
  progress record exists; the test has one from its first checkpoint, so its registry entry
  carries `isSat` (= `submitted` in the blob) and `resolveUnitTasks` asks that instead.
- A problem answered correctly is marked, with its solution one tap away.
- A **missed** problem (wrong or blank) gets a **second try first**: the choice made in the
  test is crossed out, a hint is on offer, two tries. Put right, or out of tries, the
  solution opens.
- The solution is set out as: **Key idea** → numbered steps → figure → **Answer** →
  **Watch out** (the trap behind a tempting choice) or **Quick tip**.
- XP is for dealing with the missed problems: 1 for one put right on a second try, ½ for
  one whose solution was worked through and ticked, as a share of the problems missed.

---

## 4. Files in a unit

| File | Holds |
|---|---|
| `data.js` | meta, phases, `realWords` (the contest's vocabulary), the imports |
| `notes.js` + `diagrams.js` | the "toolkit" deck: test strategy, then one tool per idea |
| `workbook.js` | the warm-up: 12 fresh problems, three tiers, mostly five-choice |
| `factorBlitz.js` | mental-arithmetic speed (no calculator in the contest) |
| `test.js` | the 25 problems, each with `hint`, `idea`, `solution`, `trap`/`tip` |
| `figures.js` | the test's figures and the solutions' figures |

`figures.js` is not `diagrams.js`: test figures look like a contest paper (black ink, gray
shading, serif letters) and are built by small functions; `npm run audit:svg` does not read
them, so **look at them** in the harness (`?open=FIGURES`).

### Writing the paper

- Keep the contest's numbers, names, five choices and order, so a score means what it means
  on the real paper. **Write the wording yourself and draw the figures yourself** — do not
  paste the printed paper.
- Work every problem before trusting the key.
- `text` takes `**bold**`, `_italic_`, `$inline$`, `$$block$$`, blank-line paragraphs and
  `• ` bullets. Degrees inside maths are `^\circ`.
- Every solution step is one move. The `trap` names the mistake behind a wrong choice.
- `awards` are that year's cutoffs — check them; they move from year to year.

---

## 5. Checklist for a new unit

- [ ] `src/data/AMC8/PT_NN/` with the six files above; `meta.track === 'AMC8'`
- [ ] 25 problems, key checked by working each one
- [ ] Nothing in the deck, vocab or warm-up reuses a problem of the paper
- [ ] Every figure looked at in the harness, light and dark
- [ ] `npm run lint`, `npm run audit:svg AMC8`, `npm run validate` (runs `checkAmcTest`)
- [ ] Dry-run the narration, then generate audio, then validate again
- [ ] Walked the test (begin → answer → hand in → results) and the Review (second try,
      hint, solution) in `preview-amc8.html` at 1280 × 720 and at 390 px wide
