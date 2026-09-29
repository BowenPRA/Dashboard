# AMC 8 Prep (`AMC8`) — Course Guide

How to build a unit of the **AMC 8 Prep** track: one full practice paper, sat under contest
conditions and then reviewed problem by problem.

**The exemplar is `src/data/AMC8/PT_01`** (Practice Test 1, the problems of the 2024
AMC 8). When in doubt, copy its structure.

| Unit | Paper | Deck | Notes |
|---|---|---|---|
| `PT_01` | 2024 AMC 8 | 14 slides (plan ×3, 9 tools) | also holds hidden vocab / warm-up / Factor Blitz |
| `PT_02` | 2025 AMC 8 | 12 slides (plan ×1, 9 tools) | only the three live tasks' data; problem 13's choices are histograms (see §4) |

---

## 1. Track facts

| | |
|---|---|
| Track id | `AMC8` (registered in `src/components/trackRegistry.js`, red, `Trophy`, group *Problem Solving*) |
| Language | **English only** (`bilingual: false`): no `vn*` twins. The contest words are what the Vocab task teaches. |
| Unit id | `PT_<two digits>` — `PT_01` is Practice Test 1. One unit is one paper. |
| Folder | `src/data/AMC8/<UNIT>/` and `public/audio/AMC8/<UNIT>/` |
| Visibility | Not in the `GED` group: the student's `app_metadata.enrolled_tracks` must include `"AMC8"` (teacher admin), or they must be on the preview/QA account. |
| Harness | `preview-amc8.html?unit=PT_01` mounts every task without auth. `?open=AMC_TEST`, `?paper=mixed` (a handed-in paper, for the Review), `?paper=BCEEB-…` (a paper you choose), `?paper=mixed&over=1` (time ran out and the blanks were answered in extra time; `over=open` is still in extra time), `?left=5` (a paper with 5 seconds left — watch the time run out), `?open=NOTES&slide=12`; the FIGURES and DIAGRAMS cases lay every SVG on one page. |

The contest: **25 questions, five choices each, 40 minutes, no calculator, 1 point for a
correct answer and 0 for a blank or a wrong one.**

---

## 2. The unit shape

| Step | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Toolkit** | open | `NOTES` 20 | 20 |
| `practice` — **Practice Test** | open | `AMC_TEST` 60 | 60 |
| `mastery` — **Review** | the test handed in (`requires: 'AMC_TEST'`) | `AMC_REVIEW` 20 | 20 |

There is no Quiz — the paper is the assessment. **An AMC8 unit finishes at 60 XP, not
the usual 80** (`completeMinXP: 60` on the track in `trackRegistry.js`, read by
`taskRegistry.isUnitComplete`; the backend roster holds the same number in
`progressStats.js` `TRACK_DONE_XP`). The paper is scored like the contest, where 15/25 is
strong: at 80, the toolkit and review done plus 15/25 (76 XP) read "not done". 60 is the
toolkit and review plus 9/25 or better — above what guessing scores. Keep the two numbers
in step if the XP split changes. There are no XP gates: the deck comes first on the card,
but the test is open from the start.

PT_01 also carries the contest vocabulary (`realWords`), a warm-up (`workbook.js`) and
Factor Blitz, with their audio generated, but none is declared in `phases`, so nothing
draws them. Bowen asked for the plain thing — the deck, the test, its solutions — so ask
before adding a task around the test. If one does come back, the rule is: **nothing
before the test works a problem of the test** — fresh numbers and fresh contexts only.

### The toolkit deck

PT_01's deck is 14 slides, streamlined from a first version of 20 that taught fourteen
one-problem tricks (Bowen found it "all over the place"). Every deck keeps this shape:

- **Hero, then the plan, then the tools, two or three per topic** in the results screen's
  four topics, **then a checklist**. One colour per part (`PLAN`, `NUMBER`, `RATIO`,
  `GEOMETRY`, `COUNTING`). PT_01 teaches the plan in three slides (how it is scored, two
  passes, use the choices); from PT_02 on it is **one recap slide** (three Write cards
  and a check), because the student has met it — the slides go on new tools instead.
- **New tools for each paper.** PT_02 does not repeat PT_01's nine; read the earlier
  decks before choosing, and pick the ideas the new paper leans on.
- **Every tool slide has the same shape**: eyebrow `"<Topic> · <tool>"`, the idea in a
  sentence or two with one example (or a diagram), **one** orange Write card, **one**
  check with fresh numbers. No reveals, no activities.
- A tool earns a slide when **more than one** kind of contest question uses it. A trick
  for a single problem belongs in that problem's Review solution.
- **Every slide fits a 1280 × 720 laptop without scrolling.** Display maths (`$$…$$`)
  costs ~180 px in a callout — prefer inline `$\dfrac{…}{…}$`; `\tfrac` in Write cards.

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
- **Sat once.** There is no second attempt: a handed-in paper only ever reopens on its
  results, and its score is what is saved.
- **The clock stops when the test is closed.** The seconds left are kept in the resume blob
  (`remaining`) and written with every answer, every 15 seconds, and on the way out.
  Leaving keeps the time that was on the clock; coming back carries on from it.
- **Extra time.** When the clock runs out with questions blank, the answers given are
  **locked in** and banked as the score (`timeUp: true`), and a *Time's up* dialog offers
  *Keep going* or *Finish now*. In extra time the clock counts up (violet), locked answers
  cannot change, Back/Next step through the blanks only, and new answers go in `extra`
  (bubbled violet). The results screen shows them as "After the time: N more correct"
  and the score it would have been; the Review says "In extra time you answered (C)".
  Nothing that scores reads `extra`. A paper with nothing blank is simply handed in.
- **Results**: the score out of 25, right / wrong / blank per question, the score by topic,
  and the award line reached. It does **not** show the answers — that is the Review's job.
- The score is the number of correct answers (`nativeMax: 25`), scaled to the task's XP.

### Review — `AMC_REVIEW`, dbKey `p54`, `src/tasks/AmcReview.jsx`

- Locked until the paper is **handed in**. A phase's `requires` normally opens as soon as a
  progress record exists; the test has one from its first checkpoint, so its registry entry
  carries `isSat` (= `submitted` in the blob) and `resolveUnitTasks` asks that instead.
- Every problem is shown with what was answered, the correct answer and the solution. No
  second tries. The list opens on the missed problems; the whole paper is one tap away.
- The solution is set out as: **Key idea** → numbered steps → figure → **Answer** →
  **Watch out** (the trap behind a tempting choice) or **Quick tip**.
- XP is for opening the solutions of the missed problems, as a share of the problems missed.

---

## 4. Files in a unit

| File | Holds |
|---|---|
| `data.js` | meta, phases, `realWords` (the contest's vocabulary), the imports |
| `notes.js` + `diagrams.js` | the toolkit deck (Step 1) |
| `workbook.js` | the warm-up — *hidden for now* |
| `factorBlitz.js` | mental-arithmetic speed — *hidden for now* |
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
- `awards` are that year's cutoffs — check them; they move from year to year. 2025
  (PT_02): Honor Roll 19, Distinguished 23. 2024 (PT_01): 18 / 22. Both checked
  2026-09-29 against published results (AoPS historical results, Areteem, Think Academy).
- **Picture choices.** A choice button holds text, not an SVG. When a contest problem's
  choices are pictures (PT_02 problem 13: five histograms), draw all five in the figure,
  labelled A–E, and make the choices name them (`'Histogram A'` …).
- **The source PDF** (from Downloads, English + Vietnamese + key): the English pages are
  scanned images, so render them to PNG with PyMuPDF (`page.get_pixmap(dpi=110)`) and
  read them; copy the file to an ASCII name first (the `Đ` in its name breaks the reader).
  The key is the last page, as text. Compare the finished `test.js` key with it letter by
  letter.

---

## 5. Checklist for a new unit

- [ ] `src/data/AMC8/PT_NN/` with the six files above; `meta.track === 'AMC8'`
- [ ] 25 problems, key checked by working each one
- [ ] Nothing in the deck, vocab or warm-up reuses a problem of the paper
- [ ] Every figure looked at in the harness, light and dark
- [ ] `npm run lint`, `npm run audit:svg AMC8`, `npm run validate` (runs `checkAmcTest`)
- [ ] Dry-run the narration, then generate audio, then validate again
- [ ] Walked the test (begin → answer → leave and come back → hand in → results), the
      time running out (`?left=5` → extra time → finish), and the Review in
      `preview-amc8.html` at 1280 × 720 and at 390 px wide
- [ ] Every deck slide fits 1280 × 720 without scrolling
