# O Level Physics (`OLEVEL_PHYS`) — Course Guide

How to build a unit of the Cambridge **O Level Physics 5054** track. The student's course
reads from *Complete Physics for Cambridge IGCSE* (Oxford, Stephen Pople), the sister book
of the chemistry track's text, so the two tracks are built the same way and the same
student meets the same furniture in both.

The book is cut into numbered **chapters**, each a run of numbered two-page **spreads**
("9.3 Magnetic effect of a current"). A spread is one lesson's worth of reading. So here:

> **one unit = one or two spreads, cut where the physics changes · one chapter = one
> section of the track.**

Three or four units per chapter is the usual count. Chapter 9 (seven spreads) became three.

**The three built units** — copy their structure when in doubt:

| Unit | Spreads | What it is the exemplar for |
|---|---|---|
| `C09_1` Magnets and Magnetic Fields | 9.1, 9.2 | a **phenomena** unit: observe, name, sort, and draw a field |
| `C09_2` Currents, Coils and Electromagnets | 9.3, 9.4 | a **rules and devices** unit: a hand rule, then machines that use it |
| `C09_3` Motors and Electromagnetic Induction | 9.5, 9.6, 9.7 | a **two-way effect** unit: current → force, then motion → current |

The documents for this track:

| Read | For |
|---|---|
| this file | the chapter map, the unit shape, the checklist |
| [olevel-phys/AUTHORING-BRIEF.md](olevel-phys/AUTHORING-BRIEF.md) | the standing brief for whoever writes a unit's content, with the physics palette |
| [olevel-phys/plans/](olevel-phys/plans/) | one page per built unit |

Plus the general standards: [lesson-standard.md](lesson-standard.md),
[question-quality.md](question-quality.md), [svg-diagrams.md](svg-diagrams.md), and the
sister track's guide [igcse-chem-course.md](igcse-chem-course.md), whose `M06_3` unit is
the file-by-file exemplar for the shapes used here.

---

## 1. Track facts

| | |
|---|---|
| Track id | `OLEVEL_PHYS` (registered in `src/components/trackRegistry.js`, blue, `Zap`) |
| Language | **English only.** `bilingual: false`, so no `vn*` twins anywhere. |
| Unit id | `C<chapter, two digits>_<n>` — `C09_2` is the second unit cut from Chapter 9. The number is the unit's place in the chapter, **not** a spread number: `C09_1` covers spreads 9.1 and 9.2. |
| Sections | one per chapter, matched by prefix (`C09_`) in the registry's `sections`. **A new chapter needs a new row.** |
| Folder | `src/data/OLEVEL_PHYS/<UNIT>/` and `public/audio/OLEVEL_PHYS/<UNIT>/` |
| Visibility | The student's `app_metadata.enrolled_tracks` must include `"OLEVEL_PHYS"` (teacher admin), or use the preview/QA account. |
| Arcade | one hand-authored row per unit in `unitDifficulty.js` → `TRACK_LEVELS.OLEVEL_PHYS`. Vocab Bolt only. |
| Harness | `preview-ophys.html?unit=<UNIT>[&open=NOTES&slide=N]` mounts every task without auth; `&open=GALLERY` lays out every SVG. |
| Tier | O Level has **one tier**. The book marks IGCSE supplement content with an (E) in the margin; this track teaches all of it and does **not** use the `eyebrow: 'Extended'` convention the chemistry track uses. |

### The sources

The chapter arrived as **photographs of the book's pages** (one photo per page, taken by the
teacher). They are not in the repository: the book is copyrighted. Units are written from
them, never copied from them — every diagram is drawn, every question is reworded with fresh
situations, and no photograph from the book is used.

Chapter 9, "Magnets and currents", spreads 9.1–9.7, pages 198–211. Spreads 9.8 onwards
(generators, transformers, mains electricity) have not been supplied and are not built.

---

## 2. The chapter map

★ = built.

### Chapter 9 — Magnets and Currents

| Unit | Title | Spreads | Core ideas |
|---|---|---|---|
| `C09_1` ★ | Magnets and Magnetic Fields | 9.1 Magnets · 9.2 Magnetic fields | poles and the force law · induced magnetism · permanent vs temporary · magnetic, hard, soft and non-magnetic materials (iron, nickel, cobalt, steel vs copper, brass, aluminium…) · ferrous/non-ferrous · atomic magnets and demagnetising · plotting a field with a compass · field direction = force on an N pole · neutral points · screening · the Earth's field |
| `C09_2` ★ | Currents, Coils and Electromagnets | 9.3 Magnetic effect of a current · 9.4 Electromagnets | the field round a wire · conventional current · the right-hand grip rule for field direction · coil and solenoid fields · the grip rule for a coil's poles · making and demagnetising with a solenoid (d.c. / a.c.) · the electromagnet and its soft core · strength factors · the relay · the circuit breaker · magnetic recording |
| `C09_3` ★ | Motors and Electromagnetic Induction | 9.5 Magnetic force on a current · 9.6 Electric motors · 9.7 Electromagnetic induction | the force on a current in a field and its factors · Fleming's left-hand rule · the combined (catapult) field · the moving-coil loudspeaker · turning effect on a coil, the moving-coil meter · the d.c. motor, commutator and brushes · practical motors · induced e.m.f. in a moving wire and in a coil · Faraday's law · what reverses or kills the induced e.m.f. |

Later chapters (9.8–9.11 generators and transformers, Chapter 10 electrons and
electronics…) each get a new `sections` row and their own `C<nn>_` units.

---

## 3. The unit shape

The teacher asked for a **light** unit for this track: the deck, the key words, written
questions, diagram reading and the quiz — **no Practice workbook and no production
engine**. The deck carries the interaction (every slide after the opener is scored), the
questions carry the exam practice.

| Gate | Threshold | Tasks |
|---|---|---|
| 0 · Learn | 0 | **Notes** 20 · **Vocab** (`WORD_REC`) 10 |
| 1 · Apply | 20 | **Questions** (`SHORT_ANSWERS`) 25 · **Source Analysis** (`DIAGRAMS`) 25 |
| 2 · Quiz | 60 | **Quiz** (`ASSESSMENT`) 30 · **Games** 0 |

XP on offer is 110, capped at 100, so a student can drop ten marks and still finish. Gate 1
sits at 20 of the 30 before it (67%) and Gate 2 at 60 of 80 (75%), both inside the 80%
rule the validator enforces ([phase gates](../scripts/validate-entry.js)). Notes is worth
20 here rather than the usual 10 because, with no workbook, the deck's 22–24 scored items
are the unit's practice.

### What each piece is for

- **Notes** — 22–26 slides, **every slide after the opener scored**, a mix of `check:`
  MCQs and `activity:` blocks (`predict`, `sort`, `order`, `hotspot`; `estimate` where a
  number is on offer). Every "what do you think happens" in the book becomes a `predict`
  *before* the slide that shows it. The scored block is always the **last key** on its
  slide. Diagrams on most slides: this is a drawing subject.
- **Vocab** — 14–16 key words: every bold term in the spreads plus the words an O Level
  question is written in (*induced*, *conventional current*, *commutator*). Word,
  definition, one sentence.
- **Questions** — 5 written answers, three marks each, one mark per line of the scheme.
  Built on the ideas of the book's end-of-spread questions, **reworded with fresh
  situations**; "describe", "explain", "state two ways" — the O Level command words.
- **Source Analysis** — 3 items on the unit's own SVGs: 2 MCQ, 1 written. The grader
  cannot see the picture, so the written item's scheme describes it in full.
- **Quiz** — 10 MCQ, 12 minutes. Every distractor is one nameable mistake; the key is
  spread across A–D.

---

## 4. Design rules

1. **Fresh situations.** The book's experiments (the suspended magnet, the three bars
   A–D, the copper wire in the U-magnet, the magnet in the coil) are *taught* in the deck —
   the student has the book open beside them. Every task item is a different set-up: a
   different metal, a different direction, a different device.
2. **Conventions are content.** Conventional current runs + to −. Field lines run N to S
   outside a magnet, and their direction is the force on an N pole. Fleming's left hand:
   First finger Field, seCond finger Current, thuMb Motion. Every diagram and every answer
   follows these; a diagram that breaks one is wrong, not stylised.
3. **Colour means something.** N pole red `#c8102e` · S pole blue `#1a5fa8` · field lines
   blue `#3b82f6` · conventional current amber `#f59e0b` · force / motion green `#059669`
   · iron and steel greys · copper coils brown `#b45309`. The three Fleming colours (field
   blue, current amber, force green) are never reused for anything else in this track.
4. **Draw it.** No photographs from the book. Magnets, compasses, coils, relays, motors
   and galvanometers are authored SVG in the unit's `diagrams.js` and pass
   `npm run audit:svg OLEVEL_PHYS`.
5. **Right answers only.** Every direction in a diagram or an item (an induced pole, a
   field arrow, a force from the left-hand rule, a galvanometer deflection) is worked out
   from the rule before it is drawn, and written in the plan. A direction cannot be "about
   right".
6. **Plain English, full physics.** Sentences are short — the student reads in a second
   language — but nothing is watered down: *e.m.f.* is named and defined, *proportional to
   the rate* is said in those words.

---

## 5. Build loop for a new unit

1. Read the spread(s). Write `docs/olevel-phys/plans/<UNIT>.md`: objective, the mistakes
   the unit is built around, gate table, key words, slide spine, diagram list, item list,
   with every direction worked out.
2. Create `src/data/OLEVEL_PHYS/<UNIT>/` — `data.js`, `notes.js`, `diagrams.js`,
   `assessment.js`, `games.js`.
3. Add the arcade row in `unitDifficulty.js`; a new chapter also needs a `sections` row.
4. `npm run validate` · `npm run audit:svg OLEVEL_PHYS` · `npm run lint`.
5. Walk every task in `preview-ophys.html?unit=<UNIT>` at 1280×720.
6. `npm run sync-audio` (delete the unit's audio folder first if slides changed).
7. `npm run build`, deploy.
