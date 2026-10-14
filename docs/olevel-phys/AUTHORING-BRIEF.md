# O Level Physics — authoring brief for one unit

The standing instructions for whoever writes the **content** of an `OLEVEL_PHYS` unit (a
person or an agent). The unit-specific part — which spreads, which slides, which items —
is the unit's plan under `plans/`. Read [../olevel-phys-course.md](../olevel-phys-course.md)
first.

**The student** is a teenager taking Cambridge O Level Physics (5054) by distance learning.
English is their second language: sentences are short and plain, but the physics is never
watered down.

## Read before writing

1. `docs/olevel-phys-course.md` — unit shape (§3), design rules (§4).
2. **The exemplar, every file:** `src/data/IGCSE_CHEM/M06_3/` (`data.js`, `notes.js`,
   `diagrams.js`, `assessment.js`, `games.js`; ignore `workbook.js` and `symbolEq.js`, this
   track has neither). Your files have the same shapes, comment style and quality.
3. `docs/lesson-standard.md`, `docs/question-quality.md`, `docs/svg-diagrams.md`.
4. `docs/y7-science/ENGAGEMENT-PLAN.md` §2.1 and `src/utils/activity.js` (`checkActivity`)
   for `activity:` blocks — `predict`, `sort`, `order`, `hotspot`, `estimate`.
5. `src/components/notes/layouts/primitives.jsx` — the notes icon whitelist. An unlisted
   icon silently renders as "Info". Do not edit that file. Icons that suit this track and
   are on the list: `Magnet`, `Compass`, `Zap`, `Earth`, `Cable`, `Power`, `Repeat`,
   `ArrowLeftRight`, `ArrowUpDown`, `Gauge`, `Hand`, `Waves`, `Activity`, `RotateCcw`,
   `Shuffle`, `Route`, `Crosshair`, `Hammer`, `Flame`, `Thermometer`, `Layers`,
   `ListChecks`, `CheckCircle2`, `Lightbulb`, `MessageSquare`, `Languages`,
   `AlertTriangle`, `Target`, `Move`, `Split`, `GitMerge`, `Sparkles`, `Globe`.
   `src/components/UnitCard.jsx` has a second, smaller `IconMap` for `meta.icon`
   (`Magnet`, `Zap`, `RotateCcw`, `Activity`, `Orbit` are there).

## Files (all in `src/data/OLEVEL_PHYS/<UNIT>/`)

| File | Contents |
|---|---|
| `notes.js` | `export const notes = [...]` — 22–26 slides, **every slide after the opener scored**, mixing `check:` MCQs with at least 6 `activity:` blocks of at least 3 types. |
| `diagrams.js` | 8–11 authored SVGs. `const NAME = \`<svg…\`` then `export const DIAGRAMS = {` with each entry **exactly** `  NAME: NAME,` (two spaces; shorthand fails the validator). |
| `assessment.js` | `export const assessment = { timeLimit: 720, passages: [], questions: [...] }` — 10 MCQ. |
| `data.js` | `export const <UNIT>_DATA = { meta, phases, realWords, shortQA, diagrams, notes: notes, assessment: assessment, games: games }` — every module property written out in full, never shorthand. |
| `games.js` | `export const games = { gameConfig: arcadeConfig('OLEVEL_PHYS', '<UNIT>') }` — copy `M06_3/games.js` and change the two ids. The arcade row already exists in `unitDifficulty.js`; do not edit that file. |

### `data.js`

- `meta: { id, title, desc, track: 'OLEVEL_PHYS', icon }`.
- `phases`, exactly this (the gates are derived from these numbers — change nothing):
  - Gate 0 `concept` "Gate 0: Learn", threshold 0 — `NOTES` (p10) **20**, `WORD_REC` (p1) 10.
  - Gate 1 `practice` "Gate 1: Apply", threshold **20** — `SHORT_ANSWERS` (p6) **25**, `DIAGRAMS` (p7) **25**.
  - Gate 2 `mastery` "Gate 2: Quiz & Arcade", threshold **60** — `ASSESSMENT` (p9) **30**, `GAMES` (p12) 0.
- `realWords`: 14–16, `{ word, isReal: true, def, sent }`. Every bold term in the plan's
  key-word list, in the plan's order.
- `shortQA`: 5 items, 3 marks each. Plain text — no `$`. `suggestedWords` must pass the
  spoiler test in `docs/question-quality.md`: words the answer will *use*, never the
  answer itself.
- `diagrams`: 3 Source Analysis items, 2 `type: 'mcq'` and 1 written, on your own SVGs,
  each with an `imageAlt` that describes the drawing in full.

## Rules

**Language**
- English only. No `vn` / `Vn` field anywhere.
- A slide `title` is read aloud: no bare symbols, abbreviations or units in it ("e.m.f."
  is fine in content, write "Induced Voltage" or "Induced E M F"-free titles). Put symbols
  in `eyebrow` or the content.
- **No `eyebrow: 'Extended'`.** O Level is one tier; the book's (E) margin marks are
  taught like everything else.

**Physics**
- Accuracy beats everything. Every direction — an induced pole, a field arrow, a
  left-hand-rule force, a galvanometer swing, which end of a coil is N — is worked out from
  the rule and matches the plan. If the plan and the book disagree, stop and say so in the
  report rather than guess.
- Conventional current flows + to −. Field lines run N → S outside a magnet; the arrow is
  the direction of the force on an N pole. Fleming's left hand: First finger = Field
  (N to S), seCond finger = Current (conventional), thuMb = Motion (force).
- The book's experiments are **taught in the deck**; every task item is a fresh set-up.
  No end-of-spread question is reproduced.
- Colour means something, track-wide:

  | Meaning | Colour | Pale fill |
  |---|---|---|
  | N pole | `#c8102e` | `#fde2e4` |
  | S pole | `#1a5fa8` | `#dbeafe` |
  | magnetic field lines, the Field finger | `#3b82f6` | — |
  | conventional current arrows, the Current finger | `#f59e0b` (`#b45309` for text on white) | — |
  | force, motion, the thuMb | `#059669` | `#d1fae5` |
  | iron / soft iron (cores, armatures, catches) | `#94a3b8` on `#e2e8f0` | — |
  | steel | `#64748b` on `#cbd5e1` | — |
  | copper wire and coils | `#b45309` | — |
  | plain wires in a circuit | ink `#1e293b` | — |
  | compass needle | N half `#c8102e`, S half `#f8fafc` with an ink outline | — |

  The three Fleming colours are not reused for anything else. Red is a pole or a force
  on nothing; green is motion or force only.

**Deck**
- The scored block (`check:` or `activity:`) is **always the last key** on its slide.
- Every `predict` comes *before* the slide that answers it, and its `explain` says what
  actually happens (the next slide shows why).
- Every slide must fit 1280×720 without scrolling: about two short paragraphs and one
  copy-down note beside a diagram. Check in the harness.
- Follow the plan's slide spine. You may merge or split a slide if it will not fit, but
  keep every scored item and every diagram the plan names.
- `check` options: three is the house count; four where a fourth distractor is a real
  mistake. The key letter varies across the deck.

**Diagrams**
- Drawn, never photographed, never copied from the book. A simple, schematic drawing
  beats a realistic one: a bar magnet is a rectangle split red/blue with N and S on it; a
  compass is a circle with a two-tone needle; a coil is a row of loops; a hand for a grip
  rule can be a stylised outline, or three labelled arrows at right angles.
- Every diagram opens with the white plate from the exemplar (`plate(w, h)`), so it is
  legible on light and dark slides.
- Field-line arrowheads: draw a small filled triangle with a helper (`arrowAt(x, y,
  angleDeg, colour)`), not an SVG `<marker>`. If you must use a `marker`, `clipPath` or
  gradient, its id carries the unit prefix in lower case (`c091-`).
- No nested backtick template inside an SVG string. Build repeated parts with a helper
  function above it.
- Label `<text>` is written out literally (not interpolated) so the audit can measure it;
  helpers draw shapes only. Subscripts and symbols are Unicode (e.m.f., N, S, ×, •), never
  `<tspan>`.
- A `hotspot` activity reuses one of your SVGs with `viewBox` set to that SVG's own
  viewBox; target `(x, y)` are in those units. Put the targets where a student would tap
  and keep decoys at least 60 units apart.

**Quiz**
- Every distractor is one nameable mistake (the pole swapped, the finger swapped, the
  factor that does nothing). The key is spread across A–D. No item copies a notes check.

**Tools**
- Write files with the Write / Edit tools. Never author file content through a shell
  heredoc: the shell halves backslashes.
- Write at most ~250 lines per Write call — split long files across a first Write and
  Edits that append. Long single writes have stalled before.
- Touch nothing outside your unit folder. No `sync-audio`, no `build`, no `deploy`, no git
  command that changes state, no edits to the registry, the difficulty table or the docs.
- Other units are being written at the same time, and the validator reads the whole
  repository. Ignore findings about other units. If a command fails on a lock or a
  half-written sibling file, wait a minute and run it again.

## Verify

1. `npm run validate` — no error or warning that names your unit, except the missing
   audio folder.
2. `npm run audit:svg OLEVEL_PHYS` — no finding in your unit.
3. `npx eslint src/data/OLEVEL_PHYS/<UNIT>` — clean.
4. Harness, in **your own new browser tab**: `preview-ophys.html?unit=<UNIT>` on the
   running dev server (`preview_start` with name `dashboard` reuses it), with
   `&open=NOTES&slide=N` to reach a slide and `&open=GALLERY` for every SVG on one page.
   Open each of your tasks once and check for console errors. Measure slides at 1280×720
   (`resize_window` width 1280 height 720): no slide may need to scroll.

## Report

Short. Files with counts; scored deck items by type; every direction you had to work out
and the answer; anything not validated and why; any icon the whitelist lacks; any place you
departed from the plan and why.
