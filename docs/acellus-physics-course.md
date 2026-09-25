# Acellus Physics (`PHYSICS`) — Course Guide

How to build a unit of the **Acellus Physics** track, for a student sitting Acellus
Physics online and working alone on a screen.

**The exemplar is `src/data/PHYSICS/PHY_CIRC`** (Circular Motion & Gravity): a deck
built around a single formula page, a rearrangement task that shows every move and its
reason, and a workbook that reruns the student's own Acellus items through one method.
When in doubt, copy its structure.

**`src/data/PHYSICS/PHY_MOM`** (Momentum & Collisions) is the second unit, and the
exemplar for a module whose formulas are really **one equation with conditions put in**.
Its deck derives every collision formula from the conservation equation, and its Isolate
It items use the **Set up** stage, the **Factor** move and **signed** answers (§4.4).

| Unit | Acellus module | Items from |
|---|---|---|
| `PHY_CIRC` | Circular Motion & Gravity | ten screenshots, 2026-09-11 |
| `PHY_MOM` | Momentum: momentum, impulse, conservation, collisions, inelastic collisions, recoil | `physics (1).pdf`, 2026-09-25 — its elastic and 2-D items are the next unit's |

The two documents for this track:

| Read | For |
|---|---|
| this file | why the track looks the way it does, the unit shape, the Isolate It engine and its item schema, the deck rules, the checklist |
| [balance-tasks.md](balance-tasks.md) | the algebra-track cousin of Isolate It — same "do it to both sides" idea, one unknown and a scale |

Plus the general standards: [lesson-standard.md](lesson-standard.md),
[workbook-tasks.md](workbook-tasks.md), [svg-diagrams.md](svg-diagrams.md).

---

## 1. Track facts you need before you start

| | |
|---|---|
| Track id | `PHYSICS` — kept from the original Physics track so the progress bucket, the data folder and the enrolment key all still match. The old vectors unit is archived under `content-archive/PHYSICS/`. |
| Language | **Bilingual.** Every learner-facing string carries a `vn*` twin and the validator enforces it — the physics is rarely what stops her, "the tension in the rope at the top of the swing" is. |
| Unit id | `PHY_<TOPIC>` — `PHY_CIRC` is circular motion and gravity. One unit per Acellus module. |
| Folder | `src/data/PHYSICS/<UNIT>/` and `public/audio/PHYSICS/<UNIT>/` — the two names must match the unit id exactly. |
| Visibility | `PHYSICS` is in its own `Physics` group; the student's `app_metadata.enrolled_tracks` must include `"PHYSICS"`, or they must be on the preview/QA account. |
| Harness | `preview-physics.html` mounts every task without auth, opens Isolate It at the items whose algebraic shape is new, and lays every SVG on one page. |
| Constants | `g = 9.8` m/s², `G = 6.67 × 10⁻¹¹` N m²/kg² — declared per unit in `rearrange.constants`. Answers are marked within 1.5%, so a student using 9.81 or 6.674 is never marked wrong. |

---

## 2. The design principle: rebuild the working the answer box hides

The student's complaint is never "I can't do physics". It is a screenshot of an Acellus
item — four quantities, one unknown, a green answer box — and *"how do this mr bowen"*.
What Acellus hides is the working, and for this course the working is always the same
three moves:

1. **Rearrange the formula for the unknown, with letters, before any number goes in.**
2. **Put every number into SI units** — km, km/s and hours are the marks she loses.
3. **Substitute, calculate, answer with a unit** — and convert back if the box wants km or hours.

So the track's own task, **Isolate It**, is exactly those three stages, and the deck
teaches exactly that method and then uses it, unchanged, on every worked example.

Three rules follow, and they decide most of what an author does:

- **There is a fixed, short formula page, and every line of it is copy-down.** A student
  who is drowning in formulae needs *fewer* things to write, each in an orange "Write This
  Down" panel, and one slide near the end that shows the whole page so she can check her
  notebook against it. `PHY_CIRC` has eight lines. Nothing outside those panels is
  copy-down.
- **Rearranging is taught as undoing.** Look at what is being *done* to the target —
  multiplied, divided, squared, rooted, added to — and do the opposite to both sides.
  Every worked example prints the moves, not just the result, and the Isolate It engine
  writes the *reason* beside each move so what she copies down carries it.
- **Units get their own slide, their own stage and their own trap.** The deck has a
  units slide with a sort activity; Isolate It has a conversion stage that will not let a
  km/s value through; the workbook's last tier is the two "pay attention to your units"
  items.

---

## 3. The unit shape

| Phase | Gate | Tasks | XP |
|---|---|---|---|
| `concept` — **Learn** | 0 | `NOTES` 15 · `WORD_REC` 10 | 25 |
| `practice` — **Drill** | 15 | `REARRANGE` 35 · `WORKBOOK` 20 | 55 |
| `mastery` — **Prove** | 50 | `ASSESSMENT` 20 | 20 |
| `arcade` — reward | 80, `requires: 'ASSESSMENT'` | `GAMES` 0 | 0 |

100 XP. Every gate sits at or below **80% of the XP available before it** — `npm run
validate` fails otherwise ([ged-unit-shape.md](ged-unit-shape.md) §2). Isolate It carries
the largest share because it is the only place the student *produces* the rearrangement
with the picture answering back.

---

## 4. Isolate It (`REARRANGE`, dbKey `p32`)

The production task. Component `src/tasks/Rearrange.jsx`, engine `src/utils/formula.js`.

### 4.1 What the student does

One item is three stages, on one screen: the question and the accumulating working on
the left, the live stage on the right.

1. **Isolate.** The target letter is named. The student picks a move — `×`, `÷`, `+`,
   `−`, `( )²`, `√` — and a chip (every factor, number and term currently in the
   equation is offered), and presses **Do it to both sides**. The working builds up as a
   notebook page: each line, the move written under both sides, and the reason
   ("$r$ is dividing the $m$ term. Multiply both sides by $r$ to undo it."). Undo and
   Reset are free; **Show me** fills in the taught move and forfeits that mark. On
   isolation a copy-down panel asks for the whole working to go into the notebook.
2. **Units.** The pieces table lists every symbol the rearranged formula still needs:
   the givens, and the constants with a "constant" badge. A given in km, km/s or hours
   gets a box the student must fill with the SI value before going on; a wrong value is
   answered with the conversion rule.
3. **Calculate.** The rearranged formula with the numbers in it, in KaTeX, then a box for
   the SI answer — and, when the item asks for km or hours, a second box for the
   converted answer. A wrong number is diagnosed against the slips the engine knows
   (an unconverted given, a forgotten square, a forgotten root, the SI answer typed into
   the km box) and named rather than marked red. Two tries, then reveal.

Typed numbers accept `29.7`, `6.24e18`, `6.24×10^18`, `6.24*10^18`, `6.24 × 10¹⁸` and a
trailing unit. Marking is within 1.5% of the derived value.

### 4.2 Scoring

Two marks per item: one for isolating without Show me, one for the numbers (every box
right within two tries, nothing revealed). XP = share of marks, out of 10 (`nativeMax`),
scaled to the unit's `maxXP`. Checkpoints after every item (`onProgress`); the X saves;
finished items are skipped on resume and can be re-done, best marks kept.

### 4.3 The schema (`rearrange.js`)

```js
export const rearrange = {
  title: 'Isolate It', titleVn: '…',
  intro: 'Shown above the first item.', introVn: '…',
  symbols: {                                   // name and SI unit of every letter
    F: { name: 'centripetal force', nameVn: '…', si: 'N' },
    v: { name: 'speed', nameVn: '…', si: 'm/s' },
    // …
  },
  constants: {                                 // filled in for the student
    g: { value: 9.8, unit: 'm/s²' },
    G: { value: 6.67e-11, unit: 'N m²/kg²', show: '6.67 \\times 10^{-11}' },
  },
  items: [
    {
      id: 'c1_mass',
      formula: 'F = m v^2 / r',                // the formula as the sheet prints it
      target: 'm',                             // the letter to isolate
      prompt: '…the Acellus wording…', promptVn: '…',
      hint: 'One line under the prompt, optional.', hintVn: '…',
      given: { F: { value: 938, unit: 'N' }, v: { value: 6.77, unit: 'm/s' }, r: { value: 1.45, unit: 'm' } },
      ask: { unit: 'kg' },                     // the unit the answer box wants
    },
  ],
};
```

**Only the formula, the target and the givens are authored.** The engine derives the
chips, the hint, the target move count, every line of working, the substituted line, the
conversions, the answer and the traps. There is no answer key to get wrong.

Writing `formula`:

- Symbols are a letter, or a letter and a subscript (`F_c`). Greek names are words
  (`theta`, `omega`). `pi` and `sqrt(…)` are words; `^2` is a power.
- Multiplication is a space. `/` divides by the **one** factor or bracket after it:
  `G M / r^2` is $\frac{GM}{r^2}$; write `r^3 / (G M)` when a whole product divides.
- `+` and `−` split a side into terms. A bracketed sum survives as one bracket when it is
  multiplied or rooted — `T + m g = m v^2 / r` solved for $v$ gives
  $v = \sqrt{(T + mg)\,r / m}$ — which is how a physicist writes it.
- Every symbol must be the target, in `given`, or in `constants`. A symbol that cancels
  (the $m$ in $mg = mv^2/r$) need not be given: the pieces table only lists what the
  rearranged formula still uses.
- Units must be in the engine's `UNITS` table (`formula.js`); add a unit there with its
  SI unit and conversion factor before quoting it. `show` overrides how a value prints
  (`'111{,}000'` for the asteroid's radius).

The taught strategy (`suggestMove`), which is also what the hint follows and what
`npm run validate` checks the item against: subtract anything added to the target's
term → square if the target is under a root → multiply the target up if it is dividing →
multiply up whatever is dividing, then divide away whatever is multiplying → divide out a
number → square-root if the target is squared. An item the strategy cannot finish (target
on both sides, inside a bracket, or cubed) is refused at build time, and so is a
rearrangement that is not numerically equivalent to the formula it came from.

**Order items by the shape of the algebra**, one new idea each, and say why in the
file's header. `PHY_CIRC` runs: two moves · three (the root arrives) · a mass that cancels ·
a bracketed sum · multiply a square up · root only, 10ⁿ answer · square first · the km/s
trap · root last · √ with 4π² and hours out.

### 4.4 Set up, Factor and signs (added for `PHY_MOM`)

Three optional features, all off unless an item or unit asks for them — `PHY_CIRC` is
untouched by them.

**`setup` — derive the special case, don't remember it.** An item may start from a
GENERAL equation and list the story's conditions:

```js
{
  formula: 'm_1 v_1i + m_2 v_2i = m_1 v_1f + m_2 v_2f',   // the one collision equation
  target: 'v_f',
  setup: [
    { kind: 'zero', syms: ['v_2i'], clue: 'Car 2 is at rest.', clueVn: '…',
      because: 'Its velocity before is 0, so its term vanishes.', becauseVn: '…' },
    { kind: 'same', syms: ['v_1f', 'v_2f'], to: 'v_f', clue: 'They stick together.', clueVn: '…',
      because: 'Stuck together, they share one velocity.', becauseVn: '…' },
  ],
  …
}
```

The task then opens on a **Set up** stage: the clue is quoted, and the student taps the
velocity it makes 0 (`zero`, one or more `syms`) or the two it makes one (`same`). Each
applied condition lands in the working on its own line (`v_{2i} = 0 ⇒ m_2 v_{2i} = 0`)
with the `because` beneath it, so the notebook shows the special-case equation being
derived. Two wrong picks, or Show me, apply it anyway and cost the equation mark. The
chips are every symbol in the equation with the same letter as the condition's (every
`v`), so the choice is always "which one", never "what kind". `npm run validate` checks
each condition names letters the equation has at that point, and proves the setup: the
ORIGINAL formula must balance with the zeroed letters at 0 and the merged letters equal.

**Factor.** When a letter sits in two terms of one side, Isolate It offers a Factor move
(`m₁v_f + m₂v_f → (m₁ + m₂)v_f`), printed as one centred line. The strategy factors when
EVERY term left on the target's side carries the target; after that, dividing by the
bracket chip `(m₁ + m₂)` finishes the job. Factoring a letter that is not the target can
bury the target in a bracket — the task says "dead end, undo" rather than letting Show me
go silent.

**`signed: true`** (on the unit's `rearrange`, or an item). Answers may be negative,
givens are typed with their sign (`value: -41, show: '-41.0'`), and the substituted line
brackets every negative number: `37.0 − (−41.0)`. Two more traps are derived: a negative
given typed as positive ("check $v_i$: it is −41.0 m/s") and the right size with the wrong
sign. The calculate stage carries a one-line reminder that the sign is the direction.

**`objects`** names objects 1 and 2 for one item (`['the car', 'the truck']`, with an
`objectsVn` twin), and the symbol table's "object 1 / vật 1" is replaced in the pieces
table and in the setup's wrong-pick feedback.

Units `kg·m/s` and `N·s` (the same SI unit) are in the table; `Delta_t` renders as Δt.
Givens print with the figures the question gave (12.46 stays 12.46, not 12.5).

---

## 5. The notes deck

Standard `layout` slides ([lesson-standard.md](lesson-standard.md); components in
`src/components/notes/layouts/`). `PHY_CIRC/notes.js` has the spine in its header. What
is specific to a formula-heavy physics deck:

- **Open with a question, not a formula** — which way are you pushed in a turning car?
  The reveal is the first idea (force to the centre) before any letter appears.
- **Each formula gets a `statement` slide with the label "Write this down"** and a note
  card underneath listing every symbol *with its unit*. That card is the formula page
  entry. Nothing else on the deck is copy-down except the undo pairs and the units table.
- **The method slide (`steps`) comes before the first worked example** and every later
  worked example follows its five lines in the same order: pieces with units · formula ·
  rearrange with letters · substitute · answer with a unit.
- **Rearranging gets three slides**: undo what is done to the target; one formula worked
  move by move; the decision table ("look at what is touching the target") as write cards
  with an `order` activity that drills the moves on a fresh formula.
- **Units get a slide with a `sort` activity** (convert or use as it is) and the two
  "pay attention to your units" items are worked as their own `steps` slides, each with a
  reveal that shows how wrong the unconverted answer is.
- **The formula page slide** (`stack`, two columns, all write-tone) near the end, with
  *when to use it* on every line, then the Watch Out callout, then the recap that names
  the count ("8 formulas, the undo pairs, the units table").
- **The worked examples are the student's own Acellus items**, with the same numbers the
  Isolate It task derives ($g = 9.8$, $G = 6.67 × 10⁻¹¹$).
- **When a module's formulas are one equation with conditions** (momentum: at rest,
  stick together, recoil), teach ONE equation as copy-down and derive the rest on `stack`
  slides — the derivation in display maths in `content`, the result in a write card — then
  a `sort` activity on the question phrases that trigger each case. `PHY_MOM` slides 13–23.
  A `steps` slide renders no `notes`, so a derivation that ends in a copy-down line belongs
  on a `stack`.
- The usual rules: `$$…$$` only in `content`, callout bodies and `reveal.answer`; layout
  `title` and hero `objective` are plain text; `check`/`activity` last on its slide;
  activity strings use `name`/`explain`.

### Narration

`npm run sync-audio` fills only **missing** files, so delete `public/audio/PHYSICS/<UNIT>/`
before regenerating after a content edit. `speechify()` reads `\dfrac` as "over", `x^2`
as "x squared", `\sqrt{…}` as "the square root of", and `\times` as "times".

---

## 6. Workbook, quiz, arcade

- **Workbook** (`workbook.js`): Focus = concept and one-move questions; Practice = the
  Acellus items as typed calculations; Challenge = the unit-trap items and a
  rearrangement the deck did not show. Rearrangements are MCQs (the equivalence engine
  cannot mark a typed square root); calculations are typed boxes with rounding variants
  in `accept`, since marking is by exact value. The engine now reads `6.24e18` and
  `6.24×10^{18}` as numbers, so an answer written as `$6.24 \times 10^{18}$` marks a
  student's `6.24e18`.
- **Quiz** (`assessment.js`): ten MCQs, `$$…$$` only, key spread across A–D, every
  distractor a nameable mistake explained in `expEn`/`expVn`.
- **Arcade**: `TRACK_LEVELS.PHYSICS.<UNIT>` in `unitDifficulty.js` (map, theme, tier,
  blurb) and a Maths Bolt generator keyed by unit id in `mathChallenges.js`. `PHY_CIRC`'s
  asks unit conversions, small whole-number $F = mv^2/r$ sums and $v = \sqrt{gr}$ with
  $g = 10$. Answers must be integers; verify a new generator against an independent oracle
  before shipping it.

---

## 7. Checklist for a new unit

- [ ] `src/data/PHYSICS/<UNIT>/` with `data.js`, `notes.js`, `diagrams.js`, `rearrange.js`,
      `workbook.js`, `assessment.js`, `games.js`
- [ ] `meta.track === 'PHYSICS'`, `meta.id` matches the folder, `meta.icon` is in
      `UnitCard`'s icon map; every learner-facing string has its `vn*` twin
- [ ] Tasks total ≥ 100 XP; every gate ≤ 80% of the XP before it
- [ ] A short, fixed formula page: every formula on a "Write this down" statement slide
      with its symbols and units, and one slide showing the whole page with *when to use*
- [ ] The method slide before the first worked example; every worked example in its
      five lines; the Acellus items themselves as the examples
- [ ] Rearranging taught as undoing, with the decision table and an `order` activity
- [ ] A units slide with a `sort` activity; every unit trap worked with a reveal
- [ ] Isolate It items ordered by algebraic shape, order justified in the header;
      `npm run validate` green (it re-derives every item and proves each rearrangement)
- [ ] Directions in the module? `signed: true`, givens typed with their sign, and every
      "at rest / stick together" item as a `setup` on the general equation (§4.4)
- [ ] Workbook: rearrangements as MCQ, calculations typed with rounding variants
- [ ] Quiz key spread across A/B/C/D
- [ ] `npm run audit:svg PHYSICS` clean; `npm run lint` clean
- [ ] `npm run sync-audio`, then validate again (missing slide audio is an **error**)
- [ ] Walked every task in `preview-physics.html`, light and dark, EN and VN
- [ ] Arcade entry and Maths Bolt generator, verified against an oracle
