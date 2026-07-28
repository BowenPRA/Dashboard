# Math Lessons — the Projected TV Lesson (`notes.js`)

How to build the lesson a teacher projects on the classroom TV. This is the `Notes`
activity ([src/tasks/Notes.jsx](../src/tasks/Notes.jsx)) — a slide deck with a
fullscreen **"Project"** mode, an **EN/VN** toggle, KaTeX math, and embedded widgets.

The goal for Year 7: a **clean, visually engaging, not-too-wordy** lesson that gives
the students' notebooks purpose without eating the period. Discussion and doing over
reading. The reference for *polish* is [Y8 MATH_1A notes](../src/data/Y8/MATH_1A/notes.js);
this guide adds the Year 7 lesson **shape** (warm-up → objective → concepts → check).

---

## 1. The lesson shape

A section lesson is a short deck, roughly:

1. **Title slide** (`intro`) — unit number, section title, and the **objective**.
2. **Warm-up** (`warmup`) — a "Do Now" the students write and answer as they arrive.
3. **3–6 concept slides** (`concept`) — one idea each, with a diagram, worked example,
   or widget. Include at least one **discussion** prompt and, where it fits, one
   **activity**.
4. **Summary** (`summary`) — objective restated as "you can now…", one exit question.

Keep it to **6–10 slides**. If a section is big, it's still one lesson — cut to the
core, push extra practice into the workbook task.

---

## 2. Slide schema (what the renderer reads)

Slides are objects in the exported `notes` array. Fields the renderer honours:

| Field | Applies to | Purpose |
|---|---|---|
| `type` | all | `"intro"` · `"warmup"` · `"concept"` · `"summary"` |
| `title` / `titleVn` | all | slide heading |
| `subtitle` / `subtitleVn` | intro, summary | one supporting line |
| `content` / `contentVn` | concept, warmup | body text (markdown-lite, see §5) |
| `example` / `exampleVn` | concept | worked example; own panel |
| `exampleLabel` / `exampleLabelVn` | concept | badge over the example (default "Example") |
| `icon` | concept | one of the IconMap names (§6) |
| `color` | all | Duolingo-style `bg-[#hex]` header/background |
| `inlineSvg` | concept, warmup | an SVG from `diagrams.js`, right panel |
| `widget` | concept | an interactive widget (see [math-widgets.md](math-widgets.md)) |
| `image` | concept | iframe'd diagram (prefer `inlineSvg` for math) |
| `drawThis` | concept | amber "Draw This" badge — student copies the diagram |
| `unit`, `objective` | intro | **new** — unit label + objective (§3) |

`content` supports one special construct: a line starting with `>` renders as an
amber **"Draw This / write this down"** bumper — perfect for the note you want in
every notebook.

---

## 3. The title slide (optional rich variant)

Two title styles; pick per unit.

**Simple** (what Y8 uses) — big title + one objective line as the subtitle:

```js
{
  type: "intro",
  title: "Adding & Subtracting Integers",
  titleVn: "Cộng và Trừ số nguyên",
  subtitle: "Objective: add and subtract positive and negative integers using a number line.",
  subtitleVn: "Mục tiêu: cộng và trừ số nguyên …",
  color: "bg-[#8b5cf6]",
}
```

**Rich** (new fields, for units that want the fuller header) — surfaces the unit
number and objective as distinct, styled elements:

```js
{
  type: "intro",
  unit: "Unit 1 · 1.1",              // small eyebrow above the title
  title: "Adding & Subtracting Integers",
  titleVn: "Cộng và Trừ số nguyên",
  objective: "I can add and subtract positive and negative integers using a number line.",
  objectiveVn: "Em có thể cộng và trừ số nguyên bằng trục số.",
  color: "bg-[#8b5cf6]",
}
```

Both are valid. A unit that omits `unit`/`objective` gets the simple layout — so
older/simpler lessons keep working untouched. Rendering the rich fields needs the
small Notes.jsx change in §Implementation.

Write the objective as a student-voice **"I can…"** statement — it doubles as the
success criterion on the summary slide.

---

## 4. The warm-up slide ("Do Now")

A distinct, amber-themed slide students copy and answer while settling in. One or two
quick questions that recall yesterday or bridge into today — never new material.

```js
{
  type: "warmup",
  title: "Do Now",
  titleVn: "Khởi động",
  content:
    "Write these down and work them out:\n\n" +
    "> 1.  What is $7 + 3$?\n" +
    "> 2.  What is $7 - 3$?\n" +
    "> 3.  On a number line, which way do you move to **subtract**?",
  contentVn:
    "Viết ra và tính:\n\n" +
    "> 1.  $7 + 3$ bằng bao nhiêu?\n" +
    "> 2.  $7 - 3$ bằng bao nhiêu?\n" +
    "> 3.  Trên trục số, ta di chuyển về phía nào để **trừ**?",
  color: "bg-[#ff9600]",
}
```

Keep it to what fits on the screen with no scrolling. Answers go in the lesson plan,
not on the slide (reveal them live).

---

## 5. Writing the body (markdown-lite + math)

Inside `content` / `example`:

- **Bold** with `**double asterisks**` → rendered heavy.
- **Inline math** with `$…$`, **block math** with `$$…$$` (KaTeX). Use it for every
  bit of notation: `$-5 + 9 = 4$`, not `-5 + 9 = 4`.
- **`>` bumper** — a line to copy into the notebook (amber, pencil icon).
- Blank line = spacer. Keep paragraphs to a sentence or two.

Concision rules (Year 7):

- One idea per slide. If you're explaining two things, that's two slides.
- Prefer a **diagram or widget + a worked example** over a paragraph of prose.
- Definitions go in a `>` bumper so they land in the notebook verbatim.
- No wall of text — if a slide's `content` is more than ~4 short lines, cut it.

---

## 6. Icons, colour & diagrams

- `icon` must be one of the names in the Notes `IconMap`: `BookOpen`, `Scale`,
  `Target`, `MessageSquare`, `ShieldCheck`, `Repeat`, `AlertTriangle`, `UserCheck`,
  `HelpCircle`, `Equal`, `Scissors`, `Users`. Need another? Add it to the map in
  [Notes.jsx](../src/tasks/Notes.jsx) — don't invent a name that isn't wired.
- `color` is a Duolingo-ish solid. Reuse the family Y8 uses: `#1cb0f6` blue,
  `#ff9600` orange, `#ff4b4b` red, `#14b8a6` teal, `#ce82ff`/`#8b5cf6` purple,
  `#58cc02` green. Give related ideas related colours.
- Math diagrams: author an SVG in `diagrams.js` per [svg-diagrams.md](svg-diagrams.md)
  and reference it with `inlineSvg: DIAGRAMS.KEY`. Set `drawThis: true` when you want
  students to copy it. Run `npm run audit:svg Y7_MATH` before calling a diagram done.

---

## 7. Discussion, activities & videos

Make the lesson interactive, not a monologue.

- **Discussion slide** — a `concept` slide with `icon: "MessageSquare"` whose body is
  a single open question ("*Why does subtracting a negative move you right?*"). No
  answer on the slide; you field it live. Aim for **at least one** per lesson.
- **Activity** — a `concept` slide with `icon: "Users"` describing a 2–3 minute paired
  task ("*With your partner, place these four numbers on the class number line*"), or
  an embedded **widget** the class manipulates together (see
  [math-widgets.md](math-widgets.md)). An interactive widget beats a static picture
  whenever the concept moves (number line, fraction bar, factor tree).
- **Videos / resources** — keep short video links in the **lesson plan**, not the
  slides, so the deck stays self-contained and offline-safe. (An optional `video`
  slide field can be added later if we want an embed; not built today.)

---

## 8. Bilingual

Every learner-facing field needs its `…Vn` twin: `titleVn`, `subtitleVn`,
`contentVn`, `exampleVn`, `objectiveVn`, `exampleLabelVn`. The EN/VN toggle falls back
to English when a `Vn` field is missing — so a missing translation silently shows
English. Don't rely on that; fill them in.

---

## 9. Authoring checklist

- [ ] Deck is **6–10 slides**: title → warm-up → concepts → summary.
- [ ] Title slide has an **objective** as an "I can…" statement.
- [ ] Warm-up is **recall/bridge**, fits the screen, no new material.
- [ ] Each concept slide is **one idea** with a diagram, example, or widget.
- [ ] At least **one discussion** prompt and, where natural, **one activity/widget**.
- [ ] Definitions and the key result are in `>` bumpers (they land in notebooks).
- [ ] All notation uses `$…$` / `$$…$$`; `**bold**` for emphasis.
- [ ] Every `icon` exists in the IconMap; every `inlineSvg` key exists in `diagrams.js`.
- [ ] `npm run audit:svg Y7_MATH` clean.
- [ ] Every EN field has a `…Vn` counterpart.
- [ ] Summary restates the objective as "you can now…" + one exit question.

---

## Implementation status

The renderer supports `intro`, `concept`, `summary` today. Two small additions make
the Year 7 shape display; **lessons can be authored to this spec now** and will render
once these land:

- [ ] **`warmup` slide type** — style like a concept slide with an amber header and a
      "Do Now" badge; render `content`/`contentVn` with the existing `renderContent`
      (so `>` bumpers work). Add the `type === 'warmup'` branch in
      [Notes.jsx](../src/tasks/Notes.jsx).
- [ ] **Rich `intro` fields** — when `unit` / `objective` are present on an `intro`
      slide, render `unit` as a small eyebrow above the title and `objective`
      (with `objectiveVn`) in a boxed "Objective" panel; otherwise fall back to the
      current `subtitle` layout. No change needed for units that don't set them.

Until then, a warm-up can be authored as a `concept` slide (`title: "Do Now"`,
`icon: "Target"`, amber `color`) and the objective as the intro `subtitle` — both
render immediately with zero code change.
