# Lesson Renderer — Gap Against the Standard

What [lesson-standard.md](lesson-standard.md) asks for, versus what
[src/tasks/Notes.jsx](../src/tasks/Notes.jsx) can render today. This is the work list for
bringing Dashboard lessons up to the bar set by the `lessons` repo's Science 1.1 / 1.2 and
Math 1.1 decks.

Nothing here is built. This document exists so the build is deliberate.

---

## 1. Layouts

`Notes.jsx` has four slide types. Three of them are full-bleed title cards; **all teaching
happens in exactly one layout**: a coloured header banner, then a left text column and a
right media panel ([Notes.jsx:479–597](../src/tasks/Notes.jsx#L479)).

| Standard needs | `lessons` layout | Dashboard today |
|---|---|---|
| Open the lesson, set the starter task | `hero` | `intro` — close, but the card is a single warm-up string |
| **Pose a question and stop** (§1.2) | `statement` | ✗ — no way to put one big question on a canvas |
| Explain with a diagram/widget beside the text | `split` | ✓ `concept` |
| **One big figure, edge to edge** (a Draw This target) | `showcase` | ✗ — media is locked to 55% of the width |
| **A vs B** (animal vs plant, up-words vs down-words) | `compare` | ✗ |
| **A set of terms, one picture each** | `gallery` | ✗ |
| **A numbered practical or method** | `steps` | ✗ |
| Recap checklist | `stack` + `checklist` | ✗ — a `>` bumper list is the nearest thing |
| Aside, cross-curricular link, homework | `callout` | ✗ |

Consequence: three of the standard's seven principles are currently unbuildable.
Ask-before-you-tell has no slide to live on, the comparison beat has no shape, and the
countable recap degrades into a wall of bumpers. The 12-slide Y7_MATH 1.1 deck is dense
not because it was written badly but because **every beat had to be squeezed into the same
box**.

**Priority: highest.** `statement`, `compare` and `stack`/checklist buy the most per line
of code; `gallery`, `steps`, `showcase` and `callout` complete the set.

---

## 2. Note cards have one tone

The renderer supports exactly one accented panel: a line starting with `>` becomes an
amber "copy this down" bumper ([Notes.jsx:345–357](../src/tasks/Notes.jsx#L345)).
The exemplars use six typed tones with optional badges and icons — `write` (orange,
copy-down), `task` (purple), `homework` (red), `theory` (blue), `info` (teal),
`plant` (green).

This is not cosmetic. §1.3 of the standard says copy-down content goes in a copy-down
panel **and nothing else does**. With one tone available, anything an author wants
emphasised gets the copy-this-down treatment — and
[Y7_MATH/U01_1/notes.js:34–37](../src/data/Y7_MATH/U01_1/notes.js#L34) duly puts the four
rules of a team game into copy-down bumpers. The same slide in the `lessons` deck uses a
purple `task` panel badged "Game Rules". **The renderer taught the author the wrong
habit.**

**Priority: highest**, and cheap — a `notes: [{ tone, text, badge?, icon? }]` array with a
tone→colour table.

---

## 3. No click-to-reveal

There is no `reveal`. Every answer on a Dashboard slide is either visible from the moment
the slide appears, or hidden inside a bespoke widget —
`TempDropProblemWidget` and `WarmerProblemWidget`
([widgets.jsx:360, 374](../src/data/Y7_MATH/U01_1/widgets.jsx#L360)) exist only because
there is no generic way to hide an answer behind a button.

The exemplars lean on `{ label, prompt?, answer }` constantly: the etymology of "cell",
the electron-microscope puzzle, all four Math 1.1 word problems, the *subtract 5 from 8*
trap. It is the mechanism that makes ask-before-you-tell work in the room.

**Priority: highest.** One small component removes a whole class of one-off widgets.

---

## 4. Photographs are not really supported

`image` is rendered as an **`<iframe src=…>`**
([Notes.jsx:556](../src/tasks/Notes.jsx#L556)) — it was built for iframed diagram pages,
not for a JPEG. There is no per-unit `images/` folder, no bundler-hashed import path, and
no `CREDITS.json` convention in `src/data/`; [imagery-sourcing.md](imagery-sourcing.md)
currently routes images through `public/`.

So §1.6 — pair the drawing with the real thing — cannot be done. Y7_MATH 1.1 has no
photographs at all; the `lessons` version of the same lesson has four, one anchoring each
word problem, plus credits.

**Priority: high.** Needs three things together: a real `<img>` path with caption support,
a per-unit `images/` folder that the bundler hashes, and a credits file with an honest
licence per entry (textbook scans included, marked as not openly licensed).

---

## 5. Widgets are monolingual

`WidgetRenderer` renders the component with **no props**
([WidgetRenderer.jsx:12–15](../src/components/WidgetRenderer.jsx#L12)), and every Y7_MATH
widget is declared `() => {…}` with hardcoded English strings.

A lesson where the slide text flips to Vietnamese but the tool beside it stays in English
is half-bilingual. The `lessons` decks pass `lang` into every widget and use a two-line
`pick(lang, en, vn)` helper throughout.

**Priority: high, and small.** Pass `lang` through `WidgetRenderer`, add the helper, then
translate the existing widgets. The `lessons` repo's `TeamActivityWidget` /
`NumberLineWidget` / `TranslateWidget` are drop-in references — they are the same three
widgets, already bilingual.

---

## 6. Verification stops at `audit:svg`

| Check | `lessons` | Dashboard |
|---|---|---|
| lint / build | ✓ | ✓ |
| SVG text-fit audit | ✓ | ✓ `npm run audit:svg` |
| **Walk every slide: overflow, broken images, console errors** | ✓ `check:deck` | ✗ |
| **Project/fullscreen mode at the room's resolution, EN and VN** | ✓ `project-check.mjs` | ✗ |
| **Missing `…Vn` twin, unpaired `$`** | ✓ `slides-lint.mjs` | ✗ |

The gap that matters most is project mode. Fullscreen swaps every layout to `clamp()` type
roughly 40% larger, so a deck that is spotless in a window can scroll on a third of its
slides on the TV — and the Dashboard has no way to see that except by projecting it.
Two gotchas are already documented in the `lessons` playbook §6 and will bite here too:
`requestFullscreen()` needs a trusted user gesture (an injected `element.click()` is not
one), and headless Chrome ignores `--window-size` for it.

Also missing: `check:deck`-style detection of a slide whose content overflows its panel,
which found three real bugs in the `lessons` repo that lint and build were happy with.

**Priority: medium** — but it becomes high the moment §1 lands, because new layouts are
exactly what overflow checks catch.

---

## 7. Smaller things

- **`IconMap` is 12 icons** ([Notes.jsx:15](../src/tasks/Notes.jsx#L15)). The exemplars
  reach for `Microscope`, `Leaf`, `Ruler`, `Quote`, `Droplet`, `Beaker`, `Home`,
  `Sparkles`, `ArrowRight`, `Layers`, `Boxes`, `ScanEye`, `Telescope`, `Dna`. An unmapped
  name silently falls back to `BookOpen`.
- **No `eyebrow`** on concept slides, so "Every class is an English class", "Problem 2",
  "Beyond the book" and "Learner's Book, page 9" have nowhere to go but the title.
- **No caption under media**, so a photograph cannot carry the sentence that explains it.
- **Slide-count guidance is wrong.** [math-lessons.md](math-lessons.md) §1 says 8–13
  slides; the exemplars run 20–25 and are lighter per slide. Fix the doc when §1 lands.
- **`onComplete(10)` is hardcoded** ([Notes.jsx:178](../src/tasks/Notes.jsx#L178)) with a
  comment that phase calculations depend on it. Worth understanding before touching the
  deck plumbing.

---

## 8. What the Dashboard has that `lessons` does not

Do not port blindly in the other direction. This app carries things the deck repo has no
concept of, and they constrain the design:

- **Graded tasks and the task/track registries** — `data.js`, phases, `realWords`,
  Short Answers, Essay, Diagrams, the Workbook task.
- **Per-slide audio**, derived from slide position.
- **Student accounts, progress, phase locking, teacher admin.**
- **The workbook reveal-solution task** ([workbook-tasks.md](workbook-tasks.md)), which is
  where practice lives — so a Dashboard lesson can afford to be *shorter* on drill than a
  `lessons` deck and push it there.

The right shape is: **borrow the deck vocabulary, keep the Dashboard's spine.**

---

## 9. Suggested waves

Ordered so each wave is independently useful and each unblocks authoring.

| Wave | Contents | Unblocks |
|---|---|---|
| **1 — Expressiveness** | Typed note cards (§2), `reveal` (§3), `eyebrow` + media `caption`, `IconMap` expansion | Ask-before-you-tell; correct copy-down discipline; deletes two one-off widgets |
| **2 — Layouts** | `statement`, `compare`, `stack`/checklist, then `gallery`, `steps`, `showcase`, `callout` (§1) | The full lesson spine; density fixed by splitting, not compressing |
| **3 — Imagery** | Real `<img>` path, per-unit `images/`, `CREDITS.json` (§4) | Pair the drawing with the real thing |
| **4 — Bilingual widgets** | `lang` through `WidgetRenderer`, translate existing widgets (§5) | A genuinely bilingual deck |
| **5 — Verification** | deck-walk, project-mode check, `Vn`/`$` lint (§6) | Confidence that a 25-slide deck is clean on the TV |
| **6 — Re-author** | Rebuild Y7_MATH 1.1 to the standard as the new reference exemplar | Everything after it has something to copy |

Waves 1 and 4 are small. Wave 2 is the big one and is where the visual quality actually
comes from.
