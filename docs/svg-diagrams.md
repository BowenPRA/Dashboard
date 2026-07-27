# SVG Diagram Standards

How we draw the inline teaching diagrams. One look-and-feel across every unit, so a
math diagram and a history diagram feel like they came from the same textbook.

**Reference exemplar:** `NOTES_ANATOMY` in
[src/data/GED_MATH/MATH_1A/diagrams.js](../src/data/GED_MATH/MATH_1A/diagrams.js) —
the `4x + 7 = 15` diagram with colour-coded **Terms / Variable / Coefficient /
Constants** callouts. When in doubt, copy its structure.

---

## 1. Where diagrams live & how they're used

- Each unit keeps its SVGs in `src/data/<TRACK>/<UNIT>/diagrams.js`:
  ```js
  export const DIAGRAMS = {
    NOTES_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">…</svg>`,
  };
  ```
- They're referenced by key, never pasted twice:
  ```js
  // in data.js (diagrams[] item, or a notes slide)
  inlineSvg: DIAGRAMS.NOTES_ANATOMY,
  ```
- SVGs are **inlined** into the page (`dangerouslySetInnerHTML`), which is why
  Tailwind classes on the `<svg>` (`w-full h-full drop-shadow-md`) work.
- One-off SVGs may sit inline in `notes.js` / `assessment.js` as `inlineSvg: \`<svg…>\``.
  Anything reused belongs in `diagrams.js`.

## 2. Anatomy of a good diagram (the callout pattern)

1. **A neutral card** as the base: `<rect rx="20" fill="#f8fafc" stroke="#cbd5e1">`
   (or no card, on a transparent ground). Diagrams render on white — they are **not**
   theme-flipped, so always use dark ink on light fills.
2. **The subject, big and centred** — the equation, shape, or figure — in the right
   font (§4).
3. **Colour-coded leader lines** (`<path>` with `stroke-linecap="round"`) from each
   part out to…
4. **short sans-serif labels**, each in the same colour as its leader.
5. Optional **arrow markers** defined once in `<defs>`:
   ```svg
   <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
     <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
   </marker>
   ```

## 3. Palette (semantic — keep to this set)

| Role | Hex |
|---|---|
| Ink / primary text | `#1e293b` |
| Muted text / captions | `#64748b` |
| Grid & thin lines | `#e2e8f0`, `#cbd5e1` |
| Card fill | `#f8fafc` |
| Blue accent | `#3b82f6` (pale `#eff6ff`) |
| Red accent | `#ef4444` (pale `#fef2f2`) |
| Green accent | `#10b981` (pale `#f0fdf4`) |
| Amber accent | `#f59e0b` / `#d97706` (pale `#fffbeb` / `#fef3c7`) |
| Purple accent | `#a855f7` (pale `#f3e8ff`) |

Give each *concept* one colour and keep it consistent within a diagram (Coefficient
is red, Constants are green, etc.). Don't introduce new hues per diagram.

## 4. Typography

- **`font-family="monospace"`** for anything mathematical — equations, numbers,
  variables, coordinates. It keeps digits aligned and reads as "notation".
- **`font-family="sans-serif"`** for labels, captions, and prose.
- Weights: `bold` for labels, `900` for the hero equation. Label size ~14–16px;
  hero math 32–48px.

## 5. Sizing

- `viewBox="0 0 W H"` sized snugly to the content; no giant empty margins.
- Root class: `class="w-full h-full drop-shadow-md"` (add `bg-white rounded-lg p-4`
  only when the diagram needs its own card, e.g. graphs on a grid).

## 6. The one hard rule: text must fit

The most common visible bug is a label spilling past its box or the frame. We have a
checker for exactly this:

```bash
npm run audit:svg            # all units
npm run audit:svg GED_MATH   # one track
```

It flags two things per [scripts/svg-audit.mjs](../scripts/svg-audit.mjs):
- **FRAME** — text runs past the `viewBox` edge.
- **BOX** — text overflows the `<rect>` it sits inside (needs ≥6px padding).

It scans every unit's `diagrams.js` **and** inline `inlineSvg` blocks in `notes.js`
and `assessment.js`, so one-off diagrams are checked too.

Width is estimated as `characters × fontSize × glyphFactor`, where the factor
depends on weight: **0.52** for normal text, **0.57** for `bold`, **0.60** for
`font-weight="900"`. Practical consequences:
- Keep labels short ("Coefficient", not "The coefficient of the term").
- **Bold and 900 labels are wider than they look** — a heading that fits as normal
  weight can overflow once you bold it. Size its box for the heavier factor.
- Size label rects to the text plus ≥6px slack each side; prefer `text-anchor="middle"`
  with the anchor at the box centre.
- **A new or edited diagram is not done until `npm run audit:svg` is clean for it.**

## 7. Accessibility & robustness

- The diagram must make sense in greyscale — colour reinforces meaning, it never
  *is* the meaning. Always pair a colour with a text label.
- Self-contained only: no external fonts, images, or scripts inside the SVG.
- **The AI grader cannot see the diagram.** For any `diagrams[]` question, the
  `markScheme` and `modelAnswer` must fully describe what the image shows — see
  [question-quality.md](question-quality.md). The picture is for the student; the
  words are for the grader.

## 8. Checklist

- [ ] Lives in `diagrams.js` if reused; referenced by key.
- [ ] Neutral card, dark ink on light fill (renders on white, not theme-flipped).
- [ ] Palette from §3; one colour per concept.
- [ ] Monospace math, sans-serif labels (§4).
- [ ] `viewBox` snug; root has `w-full h-full drop-shadow-md`.
- [ ] `npm run audit:svg <track>` clean — no FRAME/BOX overflows.
- [ ] Meaning survives greyscale; every colour also has a label.
- [ ] If it's a graded diagram, the mark scheme describes it in full.

---

## Subject-specific notes

### Math
The house style, and where SVG shines. **Annotate the notation** the way
`NOTES_ANATOMY` labels an equation, `NOTES_SLOPE_TRIANGLE` labels rise/run, and
`NOTES_DISTRIBUTIVE` shows the multiply arcs. Guidance:
- Draw the object (equation, number line, coordinate plane, shape) in monospace,
  then hang colour-coded callouts off the parts you're naming.
- Number lines / graphs: light grid via a `<pattern>`, bold axes (`#1e293b`),
  points as filled circles (`#ef4444`).
- One idea per diagram — don't label eight things at once.

### History
History is usually **better served by a real public-domain image** (a political
cartoon, photograph, map, or primary-source document) than by an abstract SVG — see
[imagery-sourcing.md](imagery-sourcing.md). Reserve SVG for **structure**: timelines,
cause→effect chains, and civics diagrams (branches of government, checks & balances,
how a bill becomes law). Keep those neutral and heavily labelled; no decorative
flourishes.

### Science
Labelled anatomy, apparatus, and cycles. Use leader lines to name each part (as in
math, but on a drawn figure). For anything that must look real — microscopy, real
specimens, lab equipment — use a **photograph** (`public/images/…`) rather than
drawing it; SVG is for schematic clarity, not realism.

### ELA / Reading
Structure diagrams — argument pyramids, fact-vs-opinion splits, sentence-clause maps
(see `public/images/GED/argument_pyramid.png`, `fact_opinion1.svg`). Boxes and arrows
in the §3 palette; the point is to make an abstract relationship visible.
