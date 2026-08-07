# The Lesson Standard

The bar every projected lesson in this app is held to from now on.

This is the **method** — what makes a deck good and the order to build it in.
[math-lessons.md](math-lessons.md) is the **reference** for the fields the current
renderer actually reads; [lesson-renderer-gap.md](lesson-renderer-gap.md) records where
the renderer cannot yet express what this document asks for.

## Where the standard comes from

It is reverse-engineered from three decks that taught well, all in the sibling
`lessons` repo (`C:\Users\bowen\lessons`), not in this one:

| Deck | Path | What to steal from it |
|---|---|---|
| **Science 1.1 Cells** | `content/y7-science/U01_1/` | The hook, the scale ladder, the gallery of organelles, the countable recap |
| **Science 1.2 Animal Cells** | `content/y7-science/U01_2/` | Ask-before-you-tell used twice, the `steps` practical, "similar is not the same" |
| **Math 1.1 Adding & Subtracting Integers** | `content/y7-math/U01_1/` | Language-as-the-spine, the signal-word compare, the four word problems |

Their own governing docs are `CLAUDE.md`, `docs/LESSON-PLAYBOOK.md` and
`.claude/skills/new-lesson/SKILL.md` in that repo. Read them before a big authoring
run; this file is the part that transfers to the Dashboard.

**Who the lesson is for.** Mr Bowen, on a projector, to Vietnamese ESL Year 7
students. Their arithmetic is fine. What stops them is the English of the question.
That single fact decides most of what follows.

---

## 1. The seven principles

### 1. Every class is an English class
The language is not a garnish on the maths or the science — it is a teaching beat with
its own slide.

Math 1.1 stops the lesson three separate times for a word: *"negative five" or "minus
five"?*; *subtract 5 **from** 8* (the numbers arrive in the opposite order to the
calculation); *find the **difference*** versus *−3 minus 4*. Science 1.2 does the same
with *similar* ≠ *the same*, and with *stain* — a word the class already owns, with the
opposite feeling attached to it.

Give these slides the eyebrow **"Every class is an English class"** so the class learns
to expect them.

### 2. Ask before you tell
Put the question on its own slide, **with no numbers on it**, before any slide that
works it out.

Science 1.1 slide 2 is only: *one average cell in Mr Bowen's body, magnified to the size
of a soda can — how big would Mr Bowen be?* plus his height. Pairs, no calculators,
guesses on the board. Slide 3 has the numbers. **The gap between their guess and
10.68 km is the lesson**; showing the working first throws it away.

Science 1.2 uses it twice: *how many cells is Mr Bowen?* before "100 trillion", and
*spot the difference* before the three plant-only parts.

### 3. Accent everything they have to write down
The single most important rule. **A definition that looks like discussion prose does not
get copied into a notebook.**

- Copy-down content goes in a **"write this down" panel or an orange bumper. Nothing
  else does.**
- Discussion, context and narration stay as plain body text.
- Write the term as `**Term:** definition` so the key word prints the way the book does.
- **Game rules, task instructions and safety notes are not copy-down.** They belong in a
  differently-toned panel (task / homework / info). Today's Y7_MATH 1.1 slide 2 puts the
  four rules of the team game in `>` bumpers — that is the mistake this rule exists to
  prevent, and it is a renderer gap, not an authoring one (§ gap doc).

### 4. Prefer the plain slide, and split before you compress
**Building something clever where something simple was wanted is the failure that recurs
most.**

If a slide needs a scrollbar on a projector, it is two slides. Splitting is free; a
cut-off definition is not. In Science 1.1 the five plant-only organelles were one dense
gallery; split into *"What holds a plant up"* and *"How a plant feeds itself"*, each got
a reason to exist and room for a real micrograph. The deck went 17 → 22 slides and got
**easier** to teach.

Corollary: slide-count targets are not a quality measure. The exemplars run 20–25 slides.
The current `math-lessons.md` "8–13 slides" ceiling is what produced 12 dense slides
instead of 22 light ones — treat it as superseded.

### 5. A widget must do one thing a static slide cannot
Otherwise it is a note.

- No sliders, no emoji, no gimmicks unless the fiddling **is** the learning.
- **Hide the rule behind a button.** `NumberLineWidget` lets the class work out
  left/right from the jumps and only then check itself. A widget that states the rule up
  front has replaced the thinking, not caused it.
- **Highlighting must be unmissable at the back of the room** — the selected part keeps
  its colour and gains a halo while everything else drops to flat grey. A slightly
  thicker outline is not enough on a projector.
- Never hide the picture behind the interaction.
- The widget's own buttons and labels are learner-facing text and must be bilingual.

### 6. Pair the drawing with the real thing
Three sources of imagery, each with a job:

| Source | Use it for |
|---|---|
| **Crops from the textbook page** | The exact figure students will look at in the book, and Draw This targets. Crop the *figure*, never show a whole page. |
| **Openly-licensed photographs** | The real phenomenon — what a cell actually looks like, the real instrument, the real place. |
| **Authored SVG** | Teaching diagrams where you control exactly what is emphasised — isolates, light paths, process diagrams. |

A drawn chloroplast next to a photograph of real chloroplasts teaches more than either
alone. Science 1.1 pairs every drawn organelle with onion or pondweed under a
microscope; Math 1.1 anchors each word problem to a photograph (a lift panel, a piggy
bank, the South Pole station, a snail).

Licensing rules and sourcing mechanics: [imagery-sourcing.md](imagery-sourcing.md).
Every file gets a credit entry with an honest licence — **including textbook scans,
which are not openly licensed and must say so.**

### 7. Close with a countable recap
End on a checklist of "can you…" lines, and **name the count**:

> *your notebook should now have **13 definitions** and **2 labelled drawings**. Check.*

It turns a vague instruction into a checkable one. Then the homework slide, then a short
closing slide carrying the **exit question**.

---

## 2. The spine of a lesson

Not a template to fill in — the shape the three exemplars converge on.

1. **Opener** with the starter task the class does while settling. One card, one
   instruction, written as a full English sentence.
2. **A hook that is a question**, on its own slide, no numbers (§1.2). Then the reveal,
   usually against a photograph.
3. **The teaching run.** One idea per slide. Every slide carries a diagram, a worked
   example, a widget or a photograph — no bare text slides. Definitions land in
   copy-down panels as they arrive.
4. **At least one English slide** (§1.1), placed where the word actually bites.
5. **A comparison** where the subject has one: animal vs plant, up-words vs down-words,
   drawing vs photograph.
6. **Application.** Word problems for maths (Math 1.1 runs four, each with a photograph
   and a click-to-reveal answer); the practical or the group build for science.
7. **Beyond the book** — one optional slide, explicitly flagged as not examinable. The
   ER in Science 1.1, nerve cells in Science 1.2. *"You will not be tested on this — but
   scientists never stop at the syllabus."*
8. **Countable recap** (§1.7).
9. **Homework**, as its own red-toned card, precise about pages and about what "answer
   it" means ("full, complete English sentences — not single words").
10. **Close** with the exit question.

For **maths** specifically: teach the vocabulary of change and comparison, drill
sentence → calculation in both directions, use **Mr Bowen** in worked examples (never
invented student names), and close with word problems that get increasingly silly —
presented completely deadpan, never flagged as jokes.

### Check questions — what the deck is scored on

A solo student has no teacher cold-calling them, so **the deck has to ask**. Attach a
`check` to **2–3 concept slides** (a `warmup` slide may carry one too). The student
cannot leave a slide until they have answered it, the explanation is revealed either
way, and the NOTES task's XP is the fraction they got right — reaching the last slide
now pays nothing on its own.

```js
{
  type: 'concept',
  title: 'Adding a negative',
  content: '…',
  check: {
    id: 'c1',                                   // stable — it is the key in the item log
    q: 'What is $4 + (-6)$?', qVn: '…',
    options: [
      { val: 'A', text: '10', textVn: '10' },
      { val: 'B', text: '−2', textVn: '−2' },
    ],
    correct: 'B',
    expEn: 'Adding −6 moves six places left from 4.', expVn: '…',
  },
}
```

Place them where the idea has just landed, not at the end — the check is the retrieval,
so it has to interrupt the reading. Ask about the thing the slide taught, never about a
detail of the wording. `npm run validate` fails a check with a missing bilingual field,
an answer that is not one of its options, or one parked on an `intro`/`summary` slide,
and warns when a deck has none.

---

## 3. House style

- **Mimic the Learner's Book.** Solid colour header strip over a tinted body — that is
  the book's box. Key words in the book's orange, bold, inside the sentence, exactly
  where the book prints them. Flat line art on white, dark ink outlines, pale flat fills.
  No gradients, no drop shadows, no 3D.
- **The palette is semantic, not decorative.** In the exemplars: teal `#0087a8` sections,
  purple `#5c2483` activities, orange `#c25e12` copy-down, green `#4a8b23` plant-only,
  red `#c8102e` homework, blue `#1a5fa8` beyond-the-book, crimson `#c2185b` animal.
  The Dashboard currently uses a brighter Duolingo-ish family
  ([math-lessons.md](math-lessons.md) §6); whichever set we settle on, **the mapping from
  colour to meaning must be fixed across every unit** — a reader should know what a slide
  is for before reading it.
- **Bilingual from the first draft.** Retro-fitting `…Vn` twins is worse than writing them
  inline: you re-read every slide, and Vietnamese runs longer than English so it hides
  layout problems until the end. Every learner-facing string, including widget interface
  text.
- **Never put a `$` in prose.** The inline parser splits on `/(\$[\s\S]+?\$)/`, so any two
  dollar signs on a line become a maths span and the words between them vanish. Write
  "20 dollars". Keep `$…$` for real maths. A lone signed number reads better as plain
  text with a Unicode minus (`−5`) than as `$-5$`.
- **Write SVG label `<text>` out literally.** `npm run audit:svg` extracts template blocks
  and regexes for `<text>`; anything emitted from a `${helper(...)}` call is invisible to
  it, so the audit reports "0 overflows" while measuring nothing. Helpers for shapes and
  leader lines only. Full house style: [svg-diagrams.md](svg-diagrams.md).
- **Mr Bowen** in every worked example.
- **No exam-board name** in any learner-facing field.

---

## 4. Build order

1. **Read** an exemplar deck end to end, plus the section's book pages. Note the Key
   words, the worked example, and the exercise questions — the questions are usually the
   best classroom activities, already written for you.
2. **Write the beat sheet first.** One line per slide, in teaching order, before any code.
   Mark which slides are questions, which are copy-down, which are Draw This. This is
   where the lesson is actually designed and it is cheap to change: a structural mistake
   found here costs a minute, found in `notes.js` it costs an hour.
3. **Source the images**, recording every credit as you go, not afterwards. Look at every
   image before committing to it — roughly a third of search results are not what the
   title claims.
4. **Author the diagrams**, then render a contact sheet and *look at it* before wiring
   anything into slides. Leader-line dots landing inside the shape is the error you will
   actually make, and only the contact sheet shows it.
5. **Write `notes.js`, bilingual inline.**
6. **Write the workbook task** ([workbook-tasks.md](workbook-tasks.md)) and the
   **one-page teacher plan** ([lesson-plans.md](lesson-plans.md)). A stale plan is worse
   than no plan.
7. **Verify** (§5). Fix. Re-verify.

---

## 5. Definition of done

- [ ] `npm run lint` clean, `npm run build` clean
- [ ] `npm run audit:svg Y7_MATH` clean
- [ ] Every learner-facing string has a `…Vn` twin — **including widget UI text**
- [ ] Every copy-down item is in a copy-down panel; nothing else is
- [ ] Task instructions, game rules and safety notes are *not* in copy-down panels
- [ ] At least one ask-before-you-tell slide and one English slide
- [ ] **2–3 `check` questions in the deck** (§2), bilingual, explained both ways
- [ ] Every image credited with an honest licence
- [ ] Checked by eye in **light and dark**, in **EN and VN**, and in **project mode** at
      the room's real resolution — project mode swaps to `clamp()` type roughly 40%
      larger, so a deck that is spotless in a window can scroll on a third of its slides
      on the TV
- [ ] Teacher plan matches the deck
- [ ] The workbook task exists and its answers agree with the lesson

The last three cannot be automated today. See
[lesson-renderer-gap.md](lesson-renderer-gap.md) for the tooling the `lessons` repo has
that this one does not.

---

## 6. Traps that have already cost time

Each of these passed lint *and* build while being visibly broken.

- **A `$` in body text ate the sentence.** Even the escaped `$\$20$` printed a stray
  backslash and swallowed the words between. → Write "20 dollars".
- **`audit:svg` only sees literal text.** Labels from a `${label(...)}` helper are
  invisible to it, so it reported "0 overflows" while checking zero labels.
- **`fill="currentColor"` in dark mode** inherited near-black onto a dark panel and went
  invisible. → Give every diagram its own white plate covering the viewBox and explicit
  fills, so it reads on a light *or* dark slide.
- **Bold text on a surface that does not follow the theme.** A card that is *always*
  white, with bold defaulting to `dark:text-slate-100`, printed white-on-white in dark
  mode. → When the surface is a fixed colour, pin the emphasis colour to the surface,
  not to the theme.
- **Layout heuristics keyed off the wrong number.** A gallery chose its compact card by
  *item count*, so four cards in two rows still overflowed. → Key off what actually
  causes the overflow.
- **Any author-facing string must go through the inline parser.** Caption and checklist
  fields that skipped it printed literal `**asterisks**`.
- **Tailwind must scan the data directory.** Lesson data carries Tailwind classes
  (`color: 'bg-[#8b5cf6]'`); if the content glob misses that directory the class is never
  generated and the slide renders white-on-white.
