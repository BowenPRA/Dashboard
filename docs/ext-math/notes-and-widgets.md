# IGCSE Mathematics (Extended) — the notes deck and its widgets

How an `EXT_MATH` deck is written so that a student alone with a screen *does* the
mathematics rather than reads about it. The exemplar is
[`src/data/EXT_MATH/EM_06/notes.js`](../../src/data/EXT_MATH/EM_06/notes.js) — thirty
slides, twenty-two scored items, three widgets. Read with
[../lesson-standard.md](../lesson-standard.md) (the bar), [../math-lessons.md](../math-lessons.md)
(the layouts) and [../add-math/notes-and-activities.md](../add-math/notes-and-activities.md)
(the activity types this deck shares).

---

## 1. What a slide is for

A deck is scored on its **checks and activities** — the NOTES task pays the fraction of
them the student gets right, and nothing for reaching the last slide. So every slide
either teaches one idea or asks one thing, and the asking is spread through the deck where
each idea has just landed.

The shape EM_06 converges on, borrowed from the classroom decks in the sibling `lessons`
repo (Science 2.5 / 2.6, Maths 2.3):

| Beat | Slides | What the student does |
|---|---|---|
| **Ask before you tell** | 1 | a `predict` on the *contradiction* the topic resolves ("30 students, 33 likes") |
| **Key words, one per slide** | 3–5 | a `split` slide: diagram on one side, a `write` Note panel with the words to copy |
| **Touch the notation** | 2–3 | a `venn` activity: shade $A \cap B'$, then $(A \cup B)'$ |
| **The explorer** | 1 | a `showcase` widget — the same diagram, eight pieces of notation |
| **Words → symbols** | 1 | a `sort`: the English an exam hides the notation in |
| **The trap** | 1 | a `compare` of the two pictures that look alike, with a `check` |
| **Worked example** | 2–3 | a `steps` slide as the book works it, with the figure beside it |
| **The method, drilled** | 1 | an `order` of the moves |
| **Recap** | 1 | the `stack` checklist and a final `check` |

Twenty-eight to thirty slides for an assignment that spans two topics; twenty for one.
Ten to twelve checks, eight to ten activities. **A slide with an interaction on it needs
less text**, because the interaction is the explanation.

Rules that hold across every slide:

- **One idea per slide**, and the body never repeats its own Write panel. The diagram
  carries the picture; the panel carries the words to copy.
- **The check asks the idea, never the wording.** Every distractor is a nameable mistake,
  and `expEn` names it.
- `check` or `activity` is the **last key** on its slide, never both.
- Activity strings use `name` / `explain` (not `text` / `content`) so the cards are not
  narrated, and `prompt` sits after the `activity:` key so it is not narrated either.
- `$$…$$` only in `content`, a callout body and `reveal.answer`. Everything else
  (`steps[].text`, note text, statement `text`/`sub`, checks, activity strings) is inline
  `$…$` only.
- **Bare notation stays out of titles.** Titles are narrated, so `Intersection ∩` is read
  "Intersection intersection". Put the symbol in the `eyebrow` (not narrated):
  `eyebrow: 'Symbol 1 · AND · ∩', title: 'Intersection'`.
- English only. No `vn*` twins anywhere in this track.

---

## 2. The `venn` activity

Set notation answered by **shading**. Schema and renderer: `src/utils/activity.js`
(`checkActivity`, run by the validator) and `src/components/notes/ActivityBlock.jsx`; the
figure is `src/components/math/VennFigure.jsx`, the same component the Venn task and the
unit's widget use — so the picture a student learns on is the picture they are tested on.

```js
activity: {
  id: 'act_venn_neither',
  type: 'venn',
  prompt: "Shade $(A \\cup B)'$.",
  expr: "(A ∪ B)'",          // Unicode or LaTeX; parsed by utils/sets.js
  sets: ['A', 'B'],          // optional; two or three, default ['A', 'B']
  labels: { A: 'F' },        // optional: the letters printed on the circles
  counts: { '10': 12, … },   // optional: print a number in each region too
  explain: '$A \\cup B$ is both whole circles. NOT that is …',
}
```

The student taps regions (tap again to clear) and presses Check; the marked answer is the
region set **derived** from `expr`, and on check the right regions stay shaded — green
when right, amber when shown. The validator refuses an expression that mixes ∪ and ∩
without brackets, names a set the activity does not declare, or covers no region.

Three sets work the same way: `sets: ['A', 'B', 'C']` and an expression like
`A ∩ B ∩ C'`. Use one three-set activity per unit at most — eight regions on a phone is
already a lot of tapping.

**Where to put it:** on the slide that introduces the idea, never the one after. In EM_06
the complement is *shaded* on slide 8 and 10, and only counted from slide 13 onwards.

---

## 3. The widgets

Three, in `src/data/EXT_MATH/EM_06/widgets.jsx`, each mounted on a `showcase` slide with
`widget: <Component>`. Every number they show is **derived** from the example's question
by `utils/sets.js` / `utils/surds.js`, so a widget cannot show a wrong answer. They take
`lang` and ignore it (English-only track).

| Widget | What it does that a still slide cannot |
|---|---|
| `SetNotationExplorer` | Tap one of eight pieces of notation: the Venn shades it, it is said in words ("say: P intersection B"), the shaded regions are named, and — only when the student presses **Count it** — it is counted and turned into a probability. One diagram, eight questions. |
| `SurdBreaker` | The factor-tree method one press at a time: split into primes, **ring the pairs**, watch each pair jump out of the root as one number, multiply what came out. It is the picture behind "find a square factor", and it is the tree the student already draws in the margin. |
| `ConjugateMachine` | Rationalising a two-term denominator as a stepper: the conjugate arrives, the bottom multiplies out in a grid, the two surd cells are struck through as they cancel, then the top, then simplify fully. |

House rules for a widget here:

- **A stepper, not an animation.** Back / Next step / Next example, so the student can be
  asked to say what happens *before* pressing — the self-study version of the classroom's
  "say it, then I press".
- **Draw the stage as one SVG** where the text must scale with the panel (the two maths
  steppers), and keep only the buttons as HTML. Open every SVG with a white plate, so it
  reads on a light or dark slide.
- **No answer keys.** Import the derivation; if a widget needs a number the engines do not
  derive, that is a sign the engine is missing something.
- Check them on one page with the harness's **WIDGETS** case
  (`preview-extmath.html?unit=EM_06` → WIDGETS), which mounts every export at the height a
  showcase slide gives it. A widget on a gated slide is otherwise reachable only by
  answering every item in front of it.

---

## 4. Checklist before `npm run validate`

- [ ] 20–30 slides; 10–12 `check`s and 8–10 activities, spread through the deck
- [ ] A `predict` first, a `venn` shading before any counting, a `sort` of the words, an
      `order` of a method, and a `compare` of the look-alike pair
- [ ] Every check's distractors are nameable mistakes, named in `expEn`
- [ ] `check`/`activity` last on its slide; activity strings use `name`/`explain`
- [ ] No `$$…$$` outside `content` / callout / `reveal.answer`; no bare `∩ ∪ ′` in a title
- [ ] Every `inlineSvg` key exists in `diagrams.js`; `npm run audit:svg EXT_MATH` clean
- [ ] Delete `public/audio/EXT_MATH/<UNIT>/` and regenerate after any edit to a slide's
      text (the generator only fills missing files)
- [ ] Walked in `preview-extmath.html?unit=<UNIT>` → NOTES (use `?slide=N` to jump), every
      activity answered wrong once and right once
