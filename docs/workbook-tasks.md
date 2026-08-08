# Workbook Tasks — Reveal-Solution Practice (`workbook.js`)

The self-serve practice task: the section's exercise questions, beautifully laid out,
each with a **"Show solution"** button that reveals a clear, worked answer. This is
the `WORKBOOK` task (label "Extra", `dbKey: p11`) in
[taskRegistry.js](../src/tasks/taskRegistry.js) — registered but not yet built
(`component: null`), so it renders a placeholder until we ship the screen (§Implementation).

Design goal: **clean, visually engaging, and built to maximise understanding** — a
student who got a question wrong should learn *how* from the revealed steps, not just
see the final number.

---

## 1. Where the questions come from

Each Cambridge section ends with an **Exercise** split into tiers:

- **Focus** — the core, do-these-first questions.
- **Practice** — standard fluency.
- **Challenge** — stretch / reasoning.

We mirror those tiers. Transcribe the questions faithfully, but **every question gets
a full worked solution we write** (the workbook only prints answers in the back, if at
all — the value we add is the *method*).

---

## 2. Data schema (`workbook.js`)

`workbook` is an array of **tier groups**; each holds question items. Keep it data —
no JSX in here.

```js
// src/data/Y7_MATH/U01_1/workbook.js
export const workbook = [
  {
    tier: "Focus",                      // "Focus" | "Practice" | "Challenge"
    tierVn: "Trọng tâm",
    questions: [
      {
        id: "f1",
        prompt: "Work out $-3 + -4$.",
        promptVn: "Tính $-3 + -4$.",
        // Optional: an SVG (from diagrams.js) or a small table shown with the prompt
        inlineSvg: null,
        // The revealed solution: an ordered list of steps. Each step is one line of
        // reasoning; the last step should state the answer.
        solution: [
          "Both numbers are negative, so we move left twice.",
          "Start at $-3$, move $4$ left: $-3 + -4 = -7$.",
        ],
        solutionVn: [
          "Cả hai số đều âm, nên ta di chuyển sang trái.",
          "Bắt đầu từ $-3$, đi $4$ đơn vị sang trái: $-3 + -4 = -7$.",
        ],
        answer: "$-7$",                 // the headline result, shown emphasised
        answerVn: "$-7$",
      },
      // …more Focus questions
    ],
  },
  {
    tier: "Practice",
    tierVn: "Luyện tập",
    questions: [ /* … */ ],
  },
  {
    tier: "Challenge",
    tierVn: "Nâng cao",
    questions: [ /* … */ ],
  },
];
```

Field notes:

- `prompt` / `solution` steps support the **same markdown-lite + KaTeX** as lessons:
  `$…$` inline, `$$…$$` block, `**bold**`. Use math markup for *all* notation.
- `solution` is an **array of steps**, not a paragraph — this is what makes the reveal
  teach. One idea per step; the final step contains the answer.
- `answer` is the short headline result, shown as a highlighted pill when revealed —
  **and it is what the student's typed answer is marked against**, so keep it to a
  value (`$-7$`, `$x = 12$`, `$x \geq 5$`, `Expression`), never a sentence. The
  equivalence engine parses maths, so you do **not** need to list reorderings,
  spacings, factored forms or `x=`/bare-value variants — those are handled.
- `accept` (optional) is for the cases the engine can't parse: **word answers with
  extra words** (`"open circle"`, `"4 hours"`, a Vietnamese translation) and
  deliberate leniencies (allowing a bare `"13"` for an inequality answer). Do not use
  it for algebra — `"20-8x"` alongside `$-8x+20$` is already redundant.
- `inlineSvg` (optional) references a diagram/table from `diagrams.js` — e.g. the
  "copy and complete this table" questions. Build it per [svg-diagrams.md](svg-diagrams.md).
- `inlineSvgSolved` (optional) is the **filled-in** version of `inlineSvg`. When the
  student reveals the solution, the diagram swaps to this — the `?` cells become the
  answers (highlighted). Author the pair as `WB_FOO` (blanks) and `WB_FOO_SOLVED`
  (answers) in `diagrams.js`. This is how "revealing fills in the diagram" works.
- Multi-part questions (a, b, c, d): make each part its **own item** (`f1a`, `f1b`, …)
  so each has its own reveal. Cleaner than one giant solution block.

---

## 3. UX & visual spec (the shipped component)

`Workbook.jsx` is **slide-per-problem** — one question on screen at a time, navigated
like the lesson deck (this is the shape we want; do not go back to a scrolling list):

- **One problem per slide**, centred in a card with a coloured **tier header strip**
  (Focus green → Practice blue → Challenge purple) and a `Question n / N` badge.
- **Prompt** rendered large with KaTeX; optional **diagram** below it.
- **"Show solution"** (full-width, tier-coloured). Revealing:
  - swaps `inlineSvg` → `inlineSvgSolved` so **fill-in diagrams fill in** (animated),
  - opens the numbered **stepped solution** and the `answer` pill,
  - toggles to **"Hide solution"**; reveal state is remembered per problem.
- **Answer entry above the reveal**, for any question with an `answer`. The student
  types a value and presses **Check**, marked locally by
  [mathEquivalence.js](../src/utils/mathEquivalence.js) — which tests genuine
  algebraic equivalence, not string equality. `10+2x` is right for `$2x+10$`,
  `3(x+5)` for `$3x+15$`, `4>x` for `$x<4$`, and a bare `6` for `$x=6$`. It also
  distinguishes what it should: `x≤4` is **not** accepted for `$x<4$`. Right or wrong,
  the solution then opens — the method is the teaching either way. **Revealing before
  answering is allowed and scores nothing**, the honest trade for a stuck student.
- **Bottom nav:** Prev · a dot strip (click any dot to jump; revealed dots are
  marked) · Next, becoming **Done** on the last problem (awards XP). Arrow keys move,
  Space/Enter reveals.
- **EN/VN toggle** in the TopBar, matching the Notes deck; TopBar shows progress.
- **XP is the share of markable questions answered right before the reveal**, out of
  10 (the task's `nativeMax`); a workbook with no `answer` anywhere still pays on
  completion. Questions without an `answer` — "copy and complete this table" — are
  worth doing but not worth points.
- Still practice, not an exam: **no integrity lockdown, no strikes, unlimited time**,
  and prompt text stays selectable. The mark exists so the XP means something, not to
  police anyone.
- Fully responsive; the problem body scrolls inside its card, never the page.

---

## 4. Writing good solutions

The revealed steps are the whole point. Hold them to this bar:

- **Show the method a Year 7 can follow**, not a terse answer. "Move 4 left" beats
  "= −7".
- **Clean numbers** — the workbook already picks them; keep the arithmetic light so
  the *method* is the lesson.
- **Name the reason** where there is one ("add the inverse", "common factor is 4"),
  mirroring the lesson's language and the workbook's **Key words**.
- **One step per line.** If a step does two things, split it.
- The **last step states the answer**, and `answer` repeats it as the pill.
- Match the worked example on the page — same notation, same approach — so the practice
  reinforces the lesson rather than teaching a second method.

---

## 5. Authoring checklist

- [ ] Questions grouped by **Focus / Practice / Challenge**, in book order.
- [ ] Multi-part questions split into one item per part.
- [ ] Every item has a stepped `solution` (array) **and** an `answer` headline.
- [ ] All notation uses `$…$` / `$$…$$`; `**bold**` for emphasis.
- [ ] Solutions teach the **method** and name the reason; one step per line.
- [ ] Any tables/figures are SVGs in `diagrams.js`, `audit:svg`-clean.
- [ ] EN + VN present on `prompt`, `solution`, `answer`, `tier`.
- [ ] Renders cleanly on a phone; long solutions scroll in-card.

---

## Implementation status

Built and live (2026-07-28).

- [x] **`src/tasks/Workbook.jsx`** — slide-per-problem navigator (§3): tier header,
      KaTeX prompt, diagram that swaps to `inlineSvgSolved` on reveal, stepped
      solution + answer pill, dot-strip nav, arrow-key / Space-Enter controls, EN/VN.
- [x] **Wired** in [taskRegistry.js](../src/tasks/taskRegistry.js): `component:
      lazy(() => import('./Workbook.jsx'))`, `props` passes `pool`/`onComplete`/`onQuit`.
- [x] `hasContent` gates on a non-empty `workbook` array (empty tile when absent).

Author `workbook.js` files against this schema now; they'll light up the moment the
component lands.
