# IGCSE Chemistry (`IGCSE_CHEM`) — Course Guide

How to build a unit of the Cambridge IGCSE **Chemistry 0620** track for the student
taking it through **Wolsey Hall Oxford**.

Wolsey cuts the course into **modules**, and each module into numbered **topics**
("Topic Two (6.2): Reactions of Acids and Bases"). The reading for every topic is a run
of pages from *Complete Chemistry for Cambridge IGCSE* (Oxford, 4th edition), and each
module ends in a multiple-choice quiz. So here:

> **one Wolsey topic = one unit · one Wolsey module = one section of the track.**

**The three exemplars** — copy their structure when in doubt:

| Unit | What it is the exemplar for |
|---|---|
| `M05_2` Bond Energies & Calculating ΔH | a **calculation** unit: one method, worked in the same order every time |
| `M05_3` Measuring the Rate of a Reaction | a **graph and practical** unit: reading results rather than recalling facts |
| `M06_2` Reactions of Acids and Bases | an **equations** unit: word → symbol → ionic, with two engines side by side |

The documents for this track:

| Read | For |
|---|---|
| this file | the module map, the unit shape, the checklist |
| [igcse-chem/task-engines.md](igcse-chem/task-engines.md) | Bond Ledger, Rate Reader, Spectator Strike, Titration Bench: what each is for and the data it reads |
| [igcse-chem/AUTHORING-BRIEF.md](igcse-chem/AUTHORING-BRIEF.md) | the standing brief for whoever writes a unit's content |
| [igcse-chem/plans/](igcse-chem/plans/) | one page per built unit |

Plus the general standards: [lesson-standard.md](lesson-standard.md),
[question-quality.md](question-quality.md), [workbook-tasks.md](workbook-tasks.md),
[svg-diagrams.md](svg-diagrams.md), and the sister track's plans under
[coord-science/plans/](coord-science/plans/).

---

## 1. Track facts

| | |
|---|---|
| Track id | `IGCSE_CHEM` (registered in `src/components/trackRegistry.js`, lime, `TestTubes`) |
| Language | **English only.** `bilingual: false`, so no `vn*` twins anywhere. |
| Unit id | `M<module, two digits>_<topic>` — `M06_2` is Module 6, topic 2. A topic too wide for one sitting adds `A` / `B` (`M06_4A`). |
| Sections | one per module, matched by prefix (`M05_`, `M06_`) in the registry's `sections`. **A new module needs a new row.** |
| Folder | `src/data/IGCSE_CHEM/<UNIT>/` and `public/audio/IGCSE_CHEM/<UNIT>/` |
| Visibility | The student's `app_metadata.enrolled_tracks` must include `"IGCSE_CHEM"` (teacher admin), or use the preview/QA account. |
| Arcade | one hand-authored row per unit in `unitDifficulty.js` → `TRACK_LEVELS.IGCSE_CHEM`. Vocab Bolt only. |
| Harness | `preview-chem.html?unit=<UNIT>[&slide=N]` mounts every task without auth. |

### The sources, and what is wrong with their names

Two scans were supplied, both of the textbook, photographed as two-page spreads. They
hold no text layer — render the pages with PyMuPDF and read the images.

| File as downloaded | What it actually contains | Book pages |
|---|---|---|
| `Chemistry IGCSE Module 5 Textbook.pdf` | Ch. 8 Energy changes · Ch. 9 Rate of reaction · Ch. 10 Reversible reactions | 92–97, 100–127 |
| `Chemistry IGCSE Module 8 Textbook.pdf` | Ch. 11 Acids, bases and salts · Ch. 12 The Periodic Table — **this is Module 6**, not 8 | 128–159 |

Pages 98–99 (the hydrogen–oxygen fuel cell, which the Chapter 8 checklist asks for) are
missing from the first scan. Nothing on those two pages is set in any unit until they
turn up.

The scans are **not** in the repository: they are a copyrighted book. Units are written
from them, never copied from them — every diagram is drawn, every number is fresh, and no
photograph from the book is used.

---

## 2. The module map

★ = built. Topic names in Module 6 are Wolsey's own (from the course page). Module 5's
course page has not been seen, so **its topic names are ours** — rename the units' titles
when the real list arrives; the ids can stay.

### Module 5 — Energy Changes, Rates & Reversible Reactions

| Unit | Title | Book | Production task |
|---|---|---|---|
| `M05_1` | Energy Changes in Reactions | 8.1, 8.2 | Energy Diagrams (`ENERGY_PROFILE`, exists) |
| `M05_2` ★ | Bond Energies & Calculating ΔH | 8.3 | **Bond Ledger** (`BOND_ENERGY`) |
| `M05_3` ★ | Measuring the Rate of a Reaction | 9.1, 9.2 | **Rate Reader** (`RATE_GRAPH`) |
| `M05_4` | Changing the Rate | 9.3, 9.4 | Rate Reader, two curves on one grid |
| `M05_5` | Collision Theory & Catalysts | 9.5, 9.6, enzymes | Energy Diagrams (the catalysed pathway) |
| `M05_6` | Reversible Reactions & Equilibrium | 10.1, 10.2 | *to design:* shift the equilibrium |
| `M05_7` | The Haber & Contact Processes | 10.3, 10.4 | Equations; *to design:* reading yield curves |

### Module 6 — Acids, Bases, Salts & the Periodic Table

| Unit | Wolsey topic | Book | Production task |
|---|---|---|---|
| `M06_1` ★ | 6.1 Acids, Bases and Alkalis | 11.1, 11.2 | Formulae (`FORMULA_WRITE`) |
| `M06_2` ★ | 6.2 Reactions of Acids and Bases | 11.3, 11.4 | Equations + **Spectator Strike** (`IONIC_EQ`) |
| `M06_3` ★ | 6.3 Oxides | 11.5 | Equations (`SYMBOL_EQ`) |
| `M06_4A` ★ | 6.4 Making Salts — the methods | 11.6, 11.7 | Order It (`SEQUENCE`) + Spectator Strike (precipitation) |
| `M06_4B` ★ | 6.4 Making Salts — titration calculations | 11.8 | **Titration Bench** (`TITRATION`) |
| `M06_5` ★ | 6.5 Periodic Table | 12.1, 12.4, the history pages | Element Hunt (`ELEMENT_HUNT`) and the `periodic` deck activity |
| `M06_6` ★ | 6.6 Group 1, Alkali Metals | 12.2 | Equations |
| `M06_7` ★ | 6.7 Group 7, Halogens | 12.3 | Equations + Spectator Strike (displacement) |
| `M06_8` ★ | 6.8 Transition Elements | 12.5 | Formulae (variable oxidation numbers) |

6.4 is split because the book gives it three spreads, and the third is a calculation that
wants its own engine. Split at the topic boundary, as `EXT_MATH` does.

---

## 3. The unit shape

Same three gates as `COORD_SCI`, so a student moving between the two tracks meets nothing
new in the furniture:

| Gate | Threshold | Tasks |
|---|---|---|
| 0 · Learn | 0 | **Notes** 10 · **Vocab** (`WORD_REC`) 10 |
| 1 · Apply | 15 | the unit's **production task(s)** 20–30 each · **Practice** (`WORKBOOK`) 10 · **Questions** (`SHORT_ANSWERS`) 20 · **Source Analysis** (`DIAGRAMS`) 20 |
| 2 · Quiz | 70 | **Quiz** (`ASSESSMENT`) 20 · **Games** 0 |

XP on offer is 120–150, capped at 100, so a student can drop a task and still finish.
Both thresholds must stay under **80% of the XP before them** — the validator errors
otherwise ([phase gates](../src/utils/)).

### What each piece is for

- **Notes** — 18–22 slides, **at least 12 scored**, and a mix of `check:` MCQs and
  `activity:` blocks (`sort`, `order`, `predict`, `estimate`, `hotspot`). Every "predict"
  in the book becomes a `predict` activity *before* the slide that answers it. The
  scored block is always the **last key** on its slide.
- **Vocab** — 10–14 key words. Word, definition, one sentence. These are the words the
  exam question is written in.
- **The production task** — the thing the exam asks the student to *do*, staged. Derived,
  never stored: the engine works the answer out from the item, and `checkItem` refuses an
  item that contradicts itself.
- **Practice** — 12 questions in three tiers (4 Focus · 5 Practice · 3 Challenge), only
  answerable widgets (`mcq`, `inline`, `dnd`). It carries whatever the engine does not
  stage.
- **Questions** — 5 written answers, three marks each, one mark per line of the scheme.
  Built on the book's end-of-spread questions and the Checkup, **reworded with fresh
  substances and numbers**.
- **Source Analysis** — 3 items on authored diagrams or graphs: 2 MCQ, 1 written.
- **Quiz** — 8–10 MCQ, 10–12 minutes, modelled on the module quiz. Every distractor is
  one nameable mistake; the key is spread across A–D.

### Core and Extended

The book marks Extended (supplement) content with a bar in the margin, and the Checkup
lists it separately. The student sits **Extended**, so units teach all of it — but the
deck says which is which (`eyebrow: 'Extended'`), and the first tier of Practice stays on
Core so a shaky student has somewhere to stand.

---

## 4. Design rules

1. **Fresh numbers, fresh substances.** The book's worked examples (H₂ + Cl₂, the
   decomposition of ammonia, the magnesium results table) are *taught* in the deck,
   because the student has the book open beside them. Every task item is a different
   reaction or a different data set. The Checkup questions are never reproduced.
2. **One method, one order.** Where the book gives a method as numbered steps (energy in,
   energy out, subtract), the engine walks those steps in that order and the deck names
   them the same way.
3. **Derive, don't store.** An engine item states the chemistry (the molecules, the data
   points, the species and their states); the engine derives every count, total, reading
   and ion. `npm run validate` runs each engine's `check…Items`.
4. **Colour means something.** Warm red = energy out / exothermic. Cool blue = energy
   in / endothermic. Orange = activation energy. Acid = red, alkali = blue-violet,
   neutral = green, following universal indicator. Do not reuse these for decoration.
5. **Draw it.** No photographs from the book. Apparatus, graphs and particle pictures are
   authored SVG in the unit's `diagrams.js` and pass `npm run audit:svg IGCSE_CHEM`.
6. **State symbols are content.** `(s)`, `(l)`, `(g)`, `(aq)` appear wherever the book
   puts them: an ionic equation cannot be written without them.

---

## 5. Build loop for a new unit

1. Read the spread(s). Write `docs/igcse-chem/plans/<UNIT>.md`: objective, the mistakes
   the unit is built around, gate table, key words, item list.
2. Create `src/data/IGCSE_CHEM/<UNIT>/` — `data.js`, `notes.js`, `diagrams.js`,
   `workbook.js`, `assessment.js`, `games.js`, and one file per engine pool.
3. Add the arcade row in `unitDifficulty.js`.
4. `npm run validate` · `npm run audit:svg IGCSE_CHEM` · `npm run lint`.
5. Walk every task in `preview-chem.html?unit=<UNIT>` at 1280×720.
6. `npm run sync-audio` (delete the unit's audio folder first if slides changed).
7. `npm run build`, deploy.
