# Additional Mathematics — the notes deck and its activities

How an `ADD_MATH` deck is written so that a student alone with a screen *does* the
mathematics rather than reads about it. The exemplar is
[`src/data/ADD_MATH/AM_4B/notes.js`](../../src/data/ADD_MATH/AM_4B/notes.js) (twenty-one
slides, seventeen scored items); the rewritten
[`AM_4A/notes.js`](../../src/data/ADD_MATH/AM_4A/notes.js) is the second. Read with
[../lesson-standard.md](../lesson-standard.md) (the bar) and
[../math-lessons.md](../math-lessons.md) (the layouts).

---

## 1. What a slide is for

A deck is scored on its **checks and activities** — the NOTES task pays the fraction
of them the student gets right, and nothing for reaching the last slide. So every slide
either teaches one idea or asks one thing, and the asking is spread through the deck
where each idea has just landed, never bunched at the end.

The shape that works, from the two exemplars:

| Beat | Slides | What the student does |
|---|---|---|
| **Ask before you tell** | 1 | a `predict`: what will this look like / how many answers will there be — *before* the slide that shows it |
| **The rule** | 1–2 | a `statement` with the result, then a `showcase` with why |
| **The picture, touched** | 1 | a `plot` / `reflect` / `hotspot`: the student clicks the vertex, taps the pieces, finds the touch |
| **The worked example** | 2 | a `steps` slide as the book works it, then the `showcase` sketch with `drawThis`, and a `check` |
| **The method, drilled** | 1 | a `sort` (which shape / which sign) or an `order` (the moves in order) |
| **The trap** | 1 | a `callout` in the red tone, with a `check` that asks the trap |
| **The exercise's other shapes** | 2–4 | `split` slides pairing a printed figure with how to read it |
| **Recap** | 1 | the `stack` checklist and a final `check` |

Twenty to twenty-seven slides. Ten to twelve checks, six to eight activities.
**A slide with an interaction on it needs less text**, because the interaction is the
explanation — the exemplar's activity slides carry three sentences, not eight.

Rules that hold across every slide:

- **One idea per slide.** If the `content` is more than five short paragraphs it is two
  slides.
- **The check asks the idea, never the wording.** Every distractor is a nameable
  mistake, and `expEn` names it.
- `check` or `activity` is the **last key** on its slide, never both. The narration
  generator reads everything before it and stops.
- Activity strings use `name` / `explain` (not `text` / `content`) so the cards are not
  narrated, and `prompt` sits after the `activity:` key so it is not narrated either.
- `$$…$$` only in `content`, a callout body and `reveal.answer`. Everything else
  (`steps[].text`, note text, statement `text`/`sub`, checks, activity strings) is
  inline `$…$` only.
- English only. No `vn*` twins anywhere in this track.

---

## 2. The activity types

Schema and renderer: `src/utils/activity.js` (`checkActivity`, run by the validator)
and `src/components/notes/ActivityBlock.jsx`. The five general types came with the
Y7 Science plan ([../y7-science/ENGAGEMENT-PLAN.md](../y7-science/ENGAGEMENT-PLAN.md)
§2.1); the three maths types were added for this track.

| type | what the student does | scored when | use it for |
|---|---|---|---|
| `predict` | choose before the reveal | the `correct` option | ask-before-you-tell: shape, count of solutions |
| `sort` | cards into named bins | every card right on first check | classify by shape / sign / rule |
| `order` | arrange shuffled steps | every step in place | the method in order |
| `hotspot` | tap the named part of an SVG | hit within two tries | "tap where it touches" |
| `plot` | click lattice points on a small grid | every target placed, nothing extra | vertex, zeros, crossings with a level |
| `numberline` | place endpoints and shade | the drawn set equals the solution | the SHAPE of an inequality's answer |
| `reflect` | tap the pieces of a cubic below the axis | the tapped set is the below set | the modulus of a graph |
| `estimate` | slider guess | within tolerance | (science; rarely in maths) |

### `plot` — the in-deck Graph It

```js
activity: {
  id: 'act_plot_meets', type: 'plot',
  prompt: 'Solve $|x - 2| = 3$ by picture: click every point where the V meets the line.',
  equation: 'y = |x - 2|',                              // KaTeX, shown to the student
  curve: { kind: 'modulus', a: 1, h: 2, k: 0 },         // the truth: y = a|x − h| + k
  grid: { xMin: -4, xMax: 8, yMin: -2, yMax: 6 },       // optional; default −7..7 × −6..8
  step: { kind: 'meets', at: 3 },                       // 'vertex' | 'zeros' | 'meets'
  explain: 'The crossings are $(-1, 3)$ and $(5, 3)$ …',
}
```

The targets are derived from `curve` by `plotTargets` (in `utils/activity.js`, the same
`graphCurve` functions Graph It uses). Every target must be a whole-number point inside
the grid, or the validator refuses it. A `zeros` / `meets` step with **no** targets is
answered with the "There are none" button. Keep the grid small — it renders in the
slide's footer at about a third of the screen height.

### `numberline` — shade the answer

```js
activity: {
  id: 'act_line_more', type: 'numberline',
  prompt: 'Shade the answer to $|x + 1| > 5$. Two rays or one interval? Open or closed?',
  display: '|x + 1| > 5',                 // KaTeX, shown above the line
  solution: 'x < -6 or x > 4',            // read by utils/interval.js parseInequality
  min: -10, max: 8,                       // integer ticks; default −8..8
  explain: '…',
}
```

Tap a tick for an open circle, again to fill it, again to remove it; tap above the line
to shade. Marked with `sameSet` against the parsed solution, so any endpoint that is not
a whole number on the line is refused by the validator (`solution` accepts the shapes
`parseInequality` documents: `x > 3`, `2 <= x <= 6`, `x < -6 or x > 4`).

### `reflect` — fold the modulus

```js
activity: {
  id: 'act_reflect_we8', type: 'reflect',
  prompt: 'Tap every piece of $y = (x - 1)^2(x + 1)$ that lies below the axis, then reflect.',
  factors: [[1, -1], [1, -1], [1, 1]],    // the Sketch It item shape; k optional
  display: '(x - 1)^2(x + 1)',
  explain: 'Just the left tail …',
}
```

Draws the cubic with `CubicFigure`; the arcs between roots (and the two tails) are
tappable; on check the tapped pieces fold up into $|f(x)|$. The below set is derived by
`arcsOf` in `utils/cubic.js`. A curve that touches is the best item for this — the
touch is not reflected, and a student who taps it learns why.

### `hotspot` on a maths figure

`svg` takes a diagram from `diagrams.js`; the printed labels are stripped at runtime so
the figure cannot answer its own question. Target coordinates are in the SVG's own
viewBox: take them from the diagram's `win()` — `X(x)`, `Y(y)` — and list every
plausible part as a target (the crossing, the y-intercept) so a wrong tap is graded, not
ignored.

---

## 3. Writing the interaction slides

- **The prompt says what to do and why it matters, in one line.** "Click the vertex.
  The corner is where the inside of the bars is zero."
- **`explain` teaches the wrong answer too.** It is shown right or wrong; write it so a
  student who got it wrong knows what they missed ("the touch is not reflected, because
  the curve never went below the axis there").
- **Put the interaction on the slide that introduces the idea, not the one after.** The
  `reflect` sits on the "Reflect what is below" slide; the sketch of the finished modulus
  comes next and confirms it.
- **Sorts need a trap card.** In the AM_4B end-behaviour sort, $(2 - x)(3 - x)(x + 1)$
  has *two* negatives and climbs; in the AM_4A shape sort, $|3x + 2| = 2|x|$ is still
  modulus = modulus.
- **Orders are the book's order**, so the activity and the worked example agree.

---

## 4. Checklist before `npm run validate`

- [ ] 20–27 slides; 10–12 `check`s and 6–8 activities, spread through the deck
- [ ] At least one `predict` before a reveal, one touch-the-picture activity
      (`plot` / `reflect` / `hotspot`), one `sort` or `order` of the method
- [ ] Every check's distractors are nameable mistakes, named in `expEn`
- [ ] `check`/`activity` last on its slide; activity strings use `name`/`explain`
- [ ] No `$$…$$` outside `content` / callout / `reveal.answer`
- [ ] Every `inlineSvg` key exists in `diagrams.js`; `npm run audit:svg ADD_MATH` clean
- [ ] Delete `public/audio/ADD_MATH/<UNIT>/` and run `npm run sync-audio` after any edit
      to a slide's text (the generator only fills missing files)
- [ ] Walked in `preview-addmath.html?unit=<UNIT>` → NOTES, every activity answered
      wrong once and right once
