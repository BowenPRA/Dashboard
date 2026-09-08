# Technology — everyday computer skills (`PRIMARY_TECH`)

**Start here.** The course spine for the Technology track: a Cambridge upper-primary
(Stages 4–6, ages 8–11) course in *actually operating a computer* — turning one on,
saving a file where you can find it again, using a browser, sending an email, getting
onto wifi, and not being fooled.

This is a **practical skills** course, not a computing course. The programming path
(algorithms, block coding, binary) is kept separately in
[primary-computing-course.md](primary-computing-course.md) and is deliberately
deferred: a child who cannot find the file they saved yesterday is not ready to be
taught abstraction, and will get far more out of the fifteen minutes spent learning
where Downloads lives.

Read alongside [lesson-standard.md](lesson-standard.md) (the bar for a projected
lesson), [ged-unit-shape.md](ged-unit-shape.md) (the three-gate skeleton and the 80%
gate rule, which this track inherits) and [question-quality.md](question-quality.md)
(the mark-scheme standard for every open response).

Status: **proposal**. Nothing here is built yet.

---

## 1. The design problem, and the answer

Everything else in this app assesses *knowing*. This track has to assess **doing**, and
you cannot assess "can use a browser" with a multiple-choice question. A student who
can pick "the address bar" out of four options on Monday will still type `www.bbc.co.uk`
into a search box on Tuesday.

So the spine of this track is a **simulator**: a fake computer rendered inside the task,
which the student operates. The app watches the *state* of that fake computer and checks
whether the job got done. Right-click ▸ Save, `Ctrl+S`, and File ▸ Save all pass, because
the goal is "the file exists in Documents with a sensible name", not "you clicked the
button I was thinking of".

That is the house **derive-don't-store** rule — the one `SYMBOL_EQ`, `ENERGY_PROFILE`
and `POLY_DIV` already follow — applied to a desktop. There is no answer key to author
and none to get wrong; the answer is whatever the simulated machine ends up in.

### Where the curriculum comes from

- **Cambridge ICT Starters** (*Initial Steps* / *On Track*) — Cambridge's own practical
  syllabus, and a much better fit for this track than the Primary Computing framework.
  Its modules are purpose-shaped: *Documents for a Purpose*, *Communication*,
  *Exploring and Searching*. The course map below follows its logic.
- **ICDL / ECDL** — the long-standing "can you actually use a computer" certification.
  Two things worth taking: its module split (Computer Essentials, Online Essentials,
  Word Processing, IT Security), and the fact that **its exams are simulated application
  tasks**. That model is thirty years proven and it is exactly what §4.1 proposes.
- **Northstar Digital Literacy** — assessment built as clickable simulated screens, with
  a published standards list per skill. The best available checklist of what "basic
  computer skills" concretely means, item by item.
- **GCFGlobal (GCFLearnFree)** — the best free practical curriculum online: Computer
  Basics, Internet Basics, Email Basics, Windows Basics, Online Safety. Excellent for
  *granularity* — it shows how small a teachable step should be.
- **BBC Dance Mat Typing / TypingClub** — touch typing for this exact age, and the
  reason typing is a cross-cutting task here rather than an afterthought.
- **Google Applied Digital Skills** — task-shaped lessons ("write a letter", "plan an
  event") rather than feature tours. Every unit below has a real job at its centre for
  the same reason.
- **Be Internet Awesome** / **Common Sense Education** / **Internet Matters** — safety
  and citizenship framed as *decisions* (trust it? ignore it? ask an adult?) rather
  than rules to recite.

---

## 2. Track setup (one-time)

```js
// src/components/trackRegistry.js
{
  id: 'PRIMARY_TECH',
  title: 'Technology',
  desc: 'Everyday computer skills',
  icon: MonitorSmartphone,   // lucide-react
  group: 'Cambridge',
  // Bilingual, unlike COORD_SCI and ADD_MATH. Those are English-only because the
  // exam is. Here the opposite argument applies twice over: the student is nine,
  // AND the interface words ("address bar", "attachment", "shut down") are half
  // of what the course teaches — so they need the English and the Vietnamese.
  bilingual: true,
  theme: { bg: 'bg-sky-500', border: 'border-sky-700', /* … */ },
}
```

`sky` is unclaimed by every existing track. Also needed: `src/data/PRIMARY_TECH/` (no
`src/data/index.js` edit — it discovers units by glob and groups them by the
`meta.track` each one declares) and a `TRACK_ARENAS` entry in
`src/components/towerdefense/unitDifficulty.js` so the arcade has a map. Nothing extra
for gold (the arcade pays from XP on any track) and nothing for audio (`npm run
sync-audio PRIMARY_TECH` narrates the decks once the notes exist).

---

## 3. Unit shape

The three-gate skeleton, inherited so a student never relearns where they are — but
**re-weighted toward doing**. In a maths unit the practice tasks are the drill; here the
simulator *is* the lesson, and it should be the biggest number on the card.

| Gate | Threshold | Tasks | XP |
|---|---|---|---|
| **0 · Learn** | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| **1 · Do** | 15 | **`SIM` 30** · **`POINT_IT` 15** · `WORKBOOK` 10 · **`TYPE_GYM`** 10 | 65 |
| **2 · Prove** | 60 | `SHORT_ANSWERS` 15 · `ASSESSMENT` 20 · `GAMES` 0 | 35 |

Totals 120, capped at 100 by `unitXPOf`, so a student can skip a task and still finish.
Gate 1 sits at 15 of the 20 before it (75%); Gate 2 at 60 of 85 (71%). Both inside
[the 80% rule](ged-unit-shape.md#2-the-standard-shape) the validator enforces —
**re-derive these whenever a task's XP changes.**

A unit is **~45–60 minutes**: same shape as elsewhere, fewer items inside each task.
6 workbook questions, 2 short answers, 6 quiz questions, 3–4 simulator jobs.

---

## 4. The tasks

### 4.1 `SIM` — "Try It" · `p24` · 30 XP · **the flagship**

One engine, many skins. A fake application fills the task pane; the student does a
real job in it; the app checks the resulting state.

```js
{
  id: 'e3',
  skin: 'mail',                                  // which fake app
  brief: 'Send your science homework to Ms Lee.', // + briefVn
  initial: { files: [{ name: 'volcano.docx', in: 'Documents' }], mail: { inbox: [] } },
  goal: [                                        // ALL clauses must hold at the end
    { path: 'mail.sent[0].to',                equals: 'ms.lee@school.edu' },
    { path: 'mail.sent[0].subject',           matches: '\\S{3,}' },
    { path: 'mail.sent[0].attachments.length', equals: 1 },
  ],
  parMoves: 6,      // what a confident user takes; a bonus for matching it
  hintAfter: 3,     // wrong moves before the target region is highlighted
}
```

Four rules make it work, and each one is a teaching decision:

- **Assert on state, never on clicks.** `goal` is a list of predicates over the fake
  machine's state. Multiple correct routes all pass — which *is* the skill. A student
  who learns only one path has not learned to use a computer.
- **No dead ends.** Every screen has Back and Undo, and nothing is unrecoverable.
  "You can almost always undo it" is one of the most valuable things this course
  teaches, and the simulator should teach it by being true.
- **Nudge, don't fail.** After `hintAfter` wrong moves, glow the region. The score
  drops; the task does not end. Primary students quit at a wall.
- **Par moves, for a bonus not a penalty.** "You did it in 9 moves — it can be done
  in 6. Try again?" Rewards fluency without punishing the slow route.

**The skins**, in the order they earn their build cost:

| Skin | What the student does | Carries units |
|---|---|---|
| `files` | Save with Save As, name the file, put it in the right folder, find it again, move it, rename it, delete and recover from the bin | T4, T5, T6 |
| `mail` | Compose, To/Cc/Subject, attach a file, send, reply vs reply-all vs forward, spot the phishing one and *don't* click it | T9, T10, T14 |
| `browser` | Address bar **vs** search box, tabs, back/forward, reload, follow a link, bookmark, download — and where the download went | T7, T8 |
| `desktop` | Log in, find an app, window minimise/maximise/close, switch between two windows, shut down vs sleep vs log out | T1, T2 |
| `settings` | Connect to a wifi network, enter the password, check whether you're online, change the volume, find a setting by searching | T13 |
| `doc` | Apply a heading, bold, a bulleted list, spellcheck, insert a picture, save as PDF, print preview | T11, T12 |

Building all six is a lot. Building `files` and `mail` is not, and those two alone
carry five units.

### 4.2 `POINT_IT` — "Point At It" · `p25` · 15 XP · **build this first**

A labelled application window with clickable regions. *"Click the address bar."*
*"Click the button that makes a copy."* *"Which one is the attachment?"* Wrong clicks
are told what they hit — "that's the search box inside the page, not the address bar" —
which is the whole lesson in one sentence.

- Roughly a tenth of the sim engine's build cost and delivers a surprising share of its
  value. It is the ICDL/Northstar identification item, and it is how you fix the
  address-bar-vs-search-box confusion.
- Item shape: an authored SVG of the interface plus `regions: [{ id, rect, label,
  labelVn, misfireHint }]` and a list of prompts. Correctness is derived from the
  region hit — nothing stored.
- Ship it before the simulator so the track exists while the engine is being built.

### 4.3 `TYPE_GYM` — "Typing" · `p26` · 10 XP · small build, daily habit

Home-row-first touch typing: a target line, a live caret, per-key accuracy, WPM. Sits
in every unit at 10 XP so it becomes a daily two minutes rather than a unit.

- Scored on derived WPM + accuracy against an age-appropriate target that climbs across
  the course (Stage 4 ≈ 10 wpm, Stage 6 ≈ 20 wpm at 90%+).
- Naming follows `NUM_DRILL` ("Number Gym"), which set the pattern.
- Hunt-and-peck is the single biggest tax on everything else in this course.

### 4.4 What already exists and carries straight over

| Task | Use here |
|---|---|
| `NOTES` | The lesson deck. `Steps` layout for a procedure, `Compare` for Save vs Save As, `Showcase` for a labelled window. **Can embed the simulator in demo mode** — see §5 |
| `WORD_REC` | *browser, address bar, folder, file, save, attachment, download, shut down, wifi, password, router, spam.* This is not decoration — the interface is in English, and knowing these words **is** the skill |
| `WORKBOOK` | `order` for procedures ("put the five steps of sending an email in order"), `dnd` for sorting (file types into "picture / document / video"), `mcq` for judgement calls. **No new code** |
| `SHORT_ANSWERS` | Two per unit, tight mark schemes: "Explain the difference between Save and Save As." Keep it short — this is a nine-year-old, not a GED candidate |
| `DIAGRAMS` (Source Analysis) | Show a suspicious email, a browser window, a list of wifi networks, a full Downloads folder — and ask them to write about what they see. Already exactly the right shape |
| `ASSESSMENT` | The unit quiz — *when* and *why*, since the sim already tested *how* |
| `GAMES` | 0 XP arcade reward, as everywhere else |

### 4.5 Deliberately not proposed

- **A separate troubleshooting task.** "It's not working — what do you check first?"
  is a `WORKBOOK` `order` item and a `SHORT_ANSWERS` question. No new code.
- **A separate safety task.** Phishing is a `mail` skin item; judging a website is a
  `DIAGRAMS` item. Folding safety into the tool that has the risk is better teaching
  than a standalone safety unit anyway — though T14 still exists to pull it together.
- **Real screenshots of Windows or Chrome.** See §5.2.
- **Uploading a file the student made on their real computer.** Tasks have no upload
  path. The real-computer transfer happens on the closing NOTES card (§5.4).

---

## 5. How to present it

### 5.1 Show → Do → Judge, with one engine behind all three

Every unit runs the same three beats, and the simulator serves two of them:

1. **Show.** The `NOTES` deck demonstrates the job — with the sim embedded as a widget
   in *demo mode*, driving itself through the steps while the narration explains them.
   `WidgetRenderer.jsx` already takes `{ type, params }`, so registering
   `type: 'AppSim'` with `params: { skin, script }` is a few lines. **Build the engine
   once, get the lesson demo and the graded task.** That payoff is the strongest
   architectural argument for the sim.
2. **Do.** The same engine, no script, a brief and a goal. `SIM`.
3. **Judge.** `ASSESSMENT` and `SHORT_ANSWERS` ask the questions the doing can't:
   *when* would you use Save As instead of Save, *why* does the wifi need a password,
   *should* you reply-all to this.

### 5.2 Author a generic interface, not a Windows clone

Draw the fake apps as authored SVG/DOM in the house style
([svg-diagrams.md](svg-diagrams.md)) — a plausible, neutral operating system, not a
pixel copy of Windows 11 or Chrome. Three reasons:

- **Licensing.** It matches the stance the coord-science units already take: authored
  imagery, no `CREDITS.json` needed, no third-party screenshots.
- **It doesn't age.** A course built on Windows 10 screenshots is wrong within two
  years and unfixable without redrawing everything.
- **It teaches the pattern, not the path.** The transferable facts are *there is always
  a File menu*, *right-click always offers the actions for the thing you clicked*,
  *the address bar is at the top and shows where you are*. Teach those, and name **two
  ways to do everything** (menu and keyboard), so the student is not helpless on a Mac.

But keep the **real names**: address bar, Recycle Bin, `Ctrl+S`, attachment, Cc. The
vocabulary must transfer even though the pixels don't.

### 5.3 Vocabulary is half the subject

For an ESL primary learner the barrier is often not the concept but the label on the
button. `WORD_REC` should carry the interface words of the unit, and the `NOTES` deck
should show each word *on the thing it names* rather than in a glossary. The bilingual
`vn*` twins matter more in this track than in any other.

### 5.4 End every unit on the real machine

Close each deck with an unassessed **"On your own computer"** card: one job to do for
real, today. *Find the file you saved in this lesson. Send one email to a person in
your house. Check which wifi network you are on.* The simulator is a rehearsal; the
transfer is the point, and naming it explicitly is what makes it happen.

### 5.5 Make it forgiving on any screen

Design each skin at one fixed aspect ratio and scale it, so a sim behaves the same on
a laptop and on the tablet a student actually has. A fake desktop that needs a mouse is
useless to a child holding a tablet — every interaction must work by tap and drag.

---

## 6. The course map — 14 units

Ordered so nothing depends on a skill not yet taught. Each unit has a real job at its
centre, in the Applied-Digital-Skills style, rather than a tour of features.

| # | Unit | The job at its centre | `SIM` skin |
|---|---|---|---|
| **T1** | Starting and Stopping | Turn it on, log in, look around the desktop, shut it down properly — and why you don't hold the power button | `desktop` |
| **T2** | Mouse, Keys and Windows | Click, double-click, right-click, drag; Enter / Backspace / Shift / Ctrl / Esc; minimise, maximise, close, switch between two windows | `desktop` |
| **T3** | Typing Properly | Home row, both hands, don't look down | *(none — `TYPE_GYM`)* |
| **T4** | Saving Your Work | Save a piece of work, name it so you'll know it next week, and know **where it went** | `files` |
| **T5** | Folders and Finding | Make a folder, move things into it, search for a file, delete one and get it back | `files` |
| **T6** | File Types and Sharing | Tell a picture from a document from a video; make a PDF; get a file onto a USB stick or a cloud drive | `files` |
| **T7** | Inside a Browser | Go to a website you were *given*, open a second tab, go back, bookmark it, download a file and find it after | `browser` |
| **T8** | Searching Well | Search with keywords not sentences; read a results page; tell an advert from a result; decide whether to believe it | `browser` |
| **T9** | Sending an Email | Write one proper email to a teacher: To, Subject, greeting, message, sign-off, Send | `mail` |
| **T10** | Reply, Attach, Careful | Attach your homework; reply vs reply-all vs forward; what Cc means; what to do with a message that smells wrong | `mail` |
| **T11** | A Document Worth Reading | Take a wall of text and make it readable: heading, bold, a list, spellcheck, a picture, save as PDF | `doc` |
| **T12** | Slides and Simple Data | A few slides that aren't awful; a small table and a chart made from it | `doc` |
| **T13** | Wifi and Getting Online | Connect to a network, enter the password, tell wifi from mobile data, work out whether you're actually online | `settings` |
| **T14** | Safe, Private and Unstuck | A password worth having; what you leave behind online; and a method for when something breaks | `mail` / `settings` |

T14's troubleshooting method is worth teaching explicitly as four steps, because it is
the skill that outlives every other one here: **what changed? · is it plugged in and
turned on? · have you restarted it? · who do you ask, and what do you tell them?**

---

## 7. Suggested build order

**Phase 0 — a real track with one small component.** Register `PRIMARY_TECH`, build
`POINT_IT` (§4.2), and author **T1** and **T7** using `NOTES` / `WORD_REC` /
`POINT_IT` / `WORKBOOK` / `DIAGRAMS` / `ASSESSMENT`. Days, not weeks, and it puts a
usable Technology unit in front of a student before the engine exists.

**Phase 1 — the simulator.** `src/utils/appSim.js` (state model, action log, goal
predicate evaluation, a scripted-solution self-check) plus the `SIM` task screen, the
`files` skin, and registration as the `AppSim` notes widget. Ship **T4**, **T5**. Add
`preview-tech.html` to the no-auth harness set alongside the existing previews.

**Phase 2 — `mail` skin and `TYPE_GYM`.** Ship **T3**, **T9**, **T10**. Email is the
highest-value single skill in the course and the most satisfying to simulate.

**Phase 3 — `browser` and `desktop` skins.** Upgrade **T7**, ship **T2**, **T8**.

**Phase 4 — `settings` and `doc` skins.** Ship **T6**, **T11**, **T12**, **T13**,
**T14**.

---

## 8. Definition of done, per unit

Same checklist the coord-science units use, plus one addition that matters:

- `npm run validate` — gate thresholds inside the 80% rule, no empty tasks, and the
  bilingual `vn*` twins present (this track **is** bilingual).
- **A `node` self-check that every `SIM` item is solvable**, by running a scripted
  solution path against the goal predicates — the `chemFormula.checkItem` pattern. An
  unsolvable sim item is this track's version of a wrong answer key, and it will not
  be visible by reading the data.
- `npm run audit:svg PRIMARY_TECH` for every authored interface.
- `npm run build`.
- `npm run sync-audio PRIMARY_TECH` for the notes narration.
- `preview-tech.html` mounts every task in the unit.
