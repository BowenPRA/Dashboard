# The classroom ↔ Dashboard pairing

Two apps teach the same Cambridge sections to the same students:

| | **classroom** (`C:\Users\bowen\lessons`, live at bowenpra.github.io/classroom) | **Dashboard** (this repo, live at bowenpra.github.io/Dashboard) |
|---|---|---|
| What it is | The lesson as taught in the room — a projected deck, a teacher pacing it, whiteboards, a plan | The same section rebuilt for a student working **alone** — scored tasks, XP, audio, resume |
| Unit of content | a *lesson* (`content/<course>/<unit>/`) | a *unit* (`src/data/<TRACK>/<UNIT>/`) |
| Slide schema | `layout` slides — hero / split / statement / compare / stack / steps / callout / gallery | the **same** `layout` slides (ported renderer in `src/components/notes/layouts/`) plus a `check` block |
| Who reads it | the class, with Mr Bowen talking | one student, with the Listen button |

They are **two halves of one course**. The classroom deck comes first (that is
where the teaching is designed and tested against real faces); the Dashboard
unit is its self-study adaptation, built once the deck has survived a lesson.
This doc is the contract between the two.

---

## 1. The links, in both directions

Every paired unit/lesson carries a pointer to its twin, and both apps render it.

**Dashboard → classroom.** A unit declares its classroom lesson(s) in `meta`:

```js
// src/data/Y7_SCI/U02_1/data.js
meta: {
  id: 'U02_1',
  …
  classroom: [
    { course: 'y7-science', slug: 'U02_1a', title: 'Science 2.1a · Solids, Liquids and Gases' },
    { course: 'y7-science', slug: 'U02_1b', title: 'Science 2.1b · Particle Theory' },
  ],
},
```

An **array**, because one Dashboard unit can cover two classroom lessons (Science
2.1 = the *a* + *b* pair). `UnitCard` renders each entry as a "From the classroom"
chip linking to the live deck. Helper: `src/utils/classroomLink.js`. The
validator checks the shape and, when the sibling repo is on disk, warns if the
lesson folder does not exist.

**classroom → Dashboard.** A lesson declares its self-study unit in `meta`:

```js
// content/y7-science/U02_1a/index.js
meta: {
  …
  dashboard: { track: 'Y7_SCI', unit: 'U02_1' },
},
```

The course page and the deck's toolbar render it as a "Self-study" link that
opens the Dashboard with that unit expanded and scrolled into view
(`#/<TRACK>?unit=<UNIT>`). Helper: `src/lib/dashboardLink.js`.

**Rule:** a link is added on *both* sides in the same commit, or on neither. A
one-way link is how the two sequences drifted apart in the first place (see
§4).

---

## 2. Naming: keep the ids the same

| Cambridge section | classroom slug | Dashboard unit id |
|---|---|---|
| Maths 2.1 | `y7-math/U02_1` | `Y7_MATH/U02_1` |
| Science 1.3 | `y7-science/U01_3` | `Y7_SCI/U01_3` |
| Science 2.1 (taught as two lessons) | `y7-science/U02_1a`, `U02_1b` | `Y7_SCI/U02_1` |
| Science 2.2 (two lessons + a model) | `U02_2a`, `U02_2b`, `U02_model_states` | `Y7_SCI/U02_2` |

The Dashboard follows the **book**: one section = one unit, zero-padded
(`U02_1`). The classroom follows the **timetable**: a section that takes two
periods is two lessons (`U02_1a`, `U02_1b`). When they differ, the Dashboard
unit lists every classroom lesson it absorbs, in teaching order.

Non-section classroom content (`U00_1` Day One, `U00_2` the accuracy lab,
`U00_3` the planters, the Word Wall game) has no Dashboard twin and should not
get one — it only exists with a room.

---

## 3. What changes in the adaptation

The classroom deck is the source; the self-study deck is a **reduction**, not a
copy. The rules, distilled from doing it eight times (Maths 1.1–2.2, Science
1.1–2.2):

1. **Ask-first slides fold into the slide that answers them.** "In pairs, two
   minutes, no calling out" has no meaning alone. Keep the *question* — as the
   eyebrow, or the first paragraph — and answer it on the same slide. If the
   answer really must wait, use a `reveal`.
2. **The reveals stay.** A `reveal` is the self-study version of ask-then-tell:
   write first, press second. Keep the ones that ask the student to *do*
   something before pressing; cut the ones that only existed to pace the room.
3. **Five `check` blocks per deck, spread across the deck**, correct answers
   spread across A/B/C. They are the deck's score, so they must be answerable
   from the slides before them, and the explanation must teach — say why the
   distractors are wrong. The `check:` key is always the **last** key on its
   slide (the narration reads fields in order and stops there).
4. **Whiteboard tasks become paper tasks.** "On your whiteboard" → "On paper".
   "Hands up" → "Decide before you go on". "Say it to your partner" → "Say it
   out loud". Never leave a classroom-only instruction in a self-study slide.
5. **Group activities, games and homework go.** Their content moves: the
   worked questions to the Workbook or Short Answers, the "which change is
   this" drill to a reveal, the homework reading to nothing (the deck *is* the
   reading). The Word Wall, the organ relay, the stand-up-you-are-the-particles
   activity, the peer assessment (→ a self-check) are room things.
6. **Learner's Book scans do not ship.** They are not openly licensed
   (`CREDITS.json` says "classroom teaching only"). Use the drawn diagram that
   carries the same content, or a licensed photograph. Everything else is
   copied to `public/images/<TRACK>/<UNIT>/` and credited in
   [credits.md](credits.md).
7. **Photos are referenced, not imported.** Classroom decks `import` images
   (Vite hashes them). Dashboard notes use
   `assetUrl('images/<TRACK>/<UNIT>/<file>')` — see `src/utils/assetPaths.js`,
   which is idempotent so a pre-mapped path is safe in nested places (compare
   columns, gallery items, widgets).
8. **Widgets port as-is** if they take `lang` and use only React + Tailwind +
   lucide. Rewrite `import x from './images/…'` to `assetUrl(…)` (there is a
   script for it in the session notes; it is a one-line regex). Drop widgets
   that only work with a room: team timers, YouTube clips, the Word Wall link.
9. **Dates and "part 1 of 2" leave the hero, and so does the starter task.**
   The self-study hero carries the `objective` and an "In this lesson" card; the
   starter becomes an **interactive activity on the next slide** (an
   `estimate`, `sort`, `hotspot` or `predict` — see
   [y7-science/ENGAGEMENT-PLAN.md](y7-science/ENGAGEMENT-PLAN.md) §2.1). A
   student alone with a tablet is never told to write on paper.
10. **Two classroom lessons → one unit** means one deck of ~20 slides, not two
    decks glued together. Cut the second lesson's recap-of-the-first; keep both
    recaps' items in one closing checklist.

What a self-study unit adds that the deck never had: vocabulary with audio
(`realWords`), a cloze reading (`passages`), reasoning questions with mark
schemes (`shortQA`), label-and-explain diagrams (`diagrams`), and a six-question
quiz (`assessment`). Those are written fresh, from the deck's content — the
shapes are in [y7-science-course.md](y7-science-course.md) and
[y7-math/ADAPTATION-PLAN.md](y7-math/ADAPTATION-PLAN.md).

---

## 4. Keeping the sequences in step

The two Y7 Maths sequences were once out of step (classroom at 2.1, Dashboard
at 1.6) and it cost a session: "make maths 2.2" meant different things in each
repo. The rule now:

- **The classroom leads by at most one section.** A deck is taught, then its
  Dashboard unit is built before the *next* deck is written — so the two never
  differ by more than the lesson currently being taught.
- **Check both `ls` before starting.** `ls C:\Users\bowen\lessons\content\y7-math`
  against `ls src\data\Y7_MATH`. The gap is the work.
- **A bare section number means the classroom repo** when a *lesson* is being
  asked for, and this repo when a *unit* is. If the request could mean either,
  say which you took.

---

## 5. The build loop for one section

1. Teach the classroom deck. Fix what the room broke. Commit it there.
2. Copy `diagrams.js` (and `widgets.jsx`, and the licensed photos) into the
   Dashboard unit folder. Run the widget image rewrite if needed.
3. Write `notes.js` as a reduction (§3), with five checks.
4. Write `data.js`: `meta` (with `classroom`), `phases` (the track's shape),
   `realWords`, `passages`, `shortQA`, `diagrams`; `assessment.js`; `games.js`.
5. `npm run validate` · `npm run audit:svg <TRACK>` · `npm run lint`.
6. Add `dashboard: { track, unit }` to the classroom lesson's `meta`; lint there.
7. `npm run sync-audio` (fills only what is missing; needs the network).
8. Open the harness — `preview-y7math.html?unit=…` or
   `preview-y7sci.html?unit=…` — and click through every task once.
9. Commit and deploy **both** repos ([dashboard-deploy-sequence] for this one;
   `npm run deploy` in the classroom repo).
10. Write the one-page plan under `docs/<course>/plans/<UNIT>.md`.

---

## Related

- [y7-math-course.md](y7-math-course.md) · [y7-math/ADAPTATION-PLAN.md](y7-math/ADAPTATION-PLAN.md) — the maths shape
- [y7-science-course.md](y7-science-course.md) — the science shape
- [lesson-standard.md](lesson-standard.md) — the bar the classroom deck is held to
- [independent-learning.md](independent-learning.md) — what the app must replace when there is no teacher in the room
- `C:\Users\bowen\lessons\docs\LESSON-PLAYBOOK.md` — the classroom method
