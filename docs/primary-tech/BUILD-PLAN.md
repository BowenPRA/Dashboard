# `PRIMARY_TECH` — build plan

The ordered work list for the Technology track. The *what and why* lives in
[../digital-skills-course.md](../digital-skills-course.md); this is the *how*, broken
into steps that can each be finished, validated and committed on their own.

Every step ends green: `npm run validate && npm run lint && npm run build`.

**Progress.** Steps 0-4 are done (0-2 on 2026-09-08, 3 and T4 on 2026-09-09): the track is
registered; `POINT_IT` ships with `preview-tech.html`; **T1**, **T7** and **T4** are
authored and playable; and the simulator engine, the `files` skin, the `SIM` task, the
`AppSim` notes widget and the solvability self-check are all in. **T5 · Folders and
Finding** is what remains of step 4; step 5 is the `mail` skin and `TYPE_GYM`.

Two things found while authoring step 2 are worth knowing before writing another deck — a `check` on a `showcase` slide shrinks its picture past
readable, and `CompareLayout` silently drops `inlineSvg`; both are recorded in
[../lesson-renderer-gap.md](../lesson-renderer-gap.md) §0.

---

## Step 0 — the track exists (½ day)

**Goal:** `/PRIMARY_TECH` routes, shows on Home, and renders an empty dashboard.

1. `src/components/trackRegistry.js` — add the entry. `id: 'PRIMARY_TECH'`,
   `title: 'Technology'`, `desc: 'Everyday computer skills'`,
   `icon: MonitorSmartphone` (import it), `group: 'Cambridge'`, `bilingual: true`,
   `sky` theme (unclaimed; copy the shape of the `Y7_MATH` entry exactly).
2. `src/components/towerdefense/unitDifficulty.js` — add a `TRACK_ARENAS` entry so the
   arcade has a map: `mapId: 'CIRCUIT'`, `themeId: 'NIGHT'`, with a name and blurb.
3. `mkdir src/data/PRIMARY_TECH` — nothing else. `src/data/index.js` discovers units by
   glob and groups them by the `meta.track` each declares; there is no list to edit.

**Done when:** the track appears on Home, opens, and dev console shows no `[content]`
warning.

---

## Step 1 — `POINT_IT`, the first new task (2–3 days)

**Goal:** "Click the address bar." The cheapest task in the plan and the one that fixes
the address-bar-vs-search-box confusion. It also proves the track before the simulator
exists.

### 1a · The task component

`src/tasks/PointIt.jsx`. Renders an authored SVG of an interface with invisible
clickable regions over it, and a list of prompts worked one at a time.

Item shape — document it in a header comment, as every other task does:

```js
{
  id: 'browser-anatomy',
  svg: '<svg …>',                    // or a component; house style per svg-diagrams.md
  viewBox: '0 0 800 500',
  regions: [
    { id: 'addr',   rect: [120, 40, 520, 34], label: 'address bar',  labelVn: 'thanh địa chỉ' },
    { id: 'search', rect: [260, 210, 300, 40], label: 'search box on the page',
      labelVn: 'ô tìm kiếm trên trang',
      misfire: 'That is the search box inside the page. The address bar is at the very top.' },
  ],
  prompts: [
    { ask: 'Click the address bar.', askVn: '…', target: 'addr' },
  ],
}
```

Rules that make it teach rather than test:

- **Name what they hit.** A wrong click on a region with a `misfire` string shows it.
  That sentence is the lesson; a bare red X is not.
- **Derive the mark from the region hit.** No stored answer beyond `target`, which is a
  region id the component resolves — an unknown id must throw at author time, not
  render a silently unpassable prompt.
- Two attempts per prompt, then reveal and move on. Score = prompts right / total,
  scaled to `maxXP`.

### 1b · Registry

`src/tasks/taskRegistry.js` — add the entry after `ENERGY_PROFILE`:

```js
{
  id: 'POINT_IT', nativeMax: 10, dbKey: 'p24',
  label: 'Find It', icon: MousePointerClick,
  color: { bg: 'bg-sky-500', border: 'border-sky-700', text: 'text-white' },
  defaultMaxXP: 15, phase: 'practice',
  component: lazy(() => import('./PointIt.jsx')),
  hasContent: (u) => notEmpty(u.pointIt),
  buildPool: (u) => u.pointIt || [],
  props: ({ pool, onComplete, onQuit }) => ({ pool, onComplete, onQuit }),
}
```

`p24` is the next free key — `p1`–`p23` are taken and `p5` is reserved as a workbook
question id. **`p24`–`p26` belong to this track; the shelved programming plan starts at
`p27`.** Follow the existing comment convention and say so in the entry.

### 1c · Harness

`preview-tech.html` + `src/preview-tech.jsx`, copying `preview-coordsci.*`. Mounts every
task in the track with no auth, so a skin can be worked on without logging in.

**Done when:** `preview-tech.html` runs `POINT_IT` end to end and awards XP.

---

## Step 2 — first two units, no simulator (3–4 days)

**Goal:** two complete, shippable units built only from `NOTES`, `WORD_REC`, `POINT_IT`,
`WORKBOOK`, `DIAGRAMS`, `SHORT_ANSWERS`, `ASSESSMENT`, `GAMES`.

Build **T1 · Starting and Stopping** and **T7 · Inside a Browser** — the two units that
survive best without a simulator, because both are largely *identify and order*.

Per unit, in `src/data/PRIMARY_TECH/T01/` (then `T07/`), following the file split the
coord-science units use: `data.js`, `notes.js`, `workbook.js`, `pointIt.js`,
`diagrams.js`, `assessment.js`, `games.js`.

Gate structure for these two (no `SIM` yet, so the XP redistributes — **re-derive, do
not copy the course doc's table**):

| Gate | Threshold | Tasks | XP |
|---|---|---|---|
| 0 · Learn | 0 | `NOTES` 10 · `WORD_REC` 10 | 20 |
| 1 · Do | 15 | `POINT_IT` 25 · `WORKBOOK` 15 | 40 |
| 2 · Prove | 45 | `DIAGRAMS` 20 · `SHORT_ANSWERS` 15 · `ASSESSMENT` 20 · `GAMES` 0 | 55 |

Gate 1 = 15/20 (75%), Gate 2 = 45/60 (75%). Both inside the 80% rule.

Content notes:

- Bilingual: every learner-facing field needs its `vn*` twin. The validator enforces it
  for this track.
- Author the interface art per [../svg-diagrams.md](../svg-diagrams.md) — a **generic**
  operating system, not a Windows or Chrome copy. Real *names* (address bar, Recycle
  Bin, `Ctrl+S`), invented pixels.
- Two `SHORT_ANSWERS` per unit, tight mark schemes, per
  [../question-quality.md](../question-quality.md). This is a nine-year-old.
- Close each `NOTES` deck with the unassessed **"On your own computer"** card.
- `npm run audit:svg PRIMARY_TECH` must pass on every authored diagram.
- `npm run sync-audio` for narration once the notes are final.

**Done when:** both units are playable start to finish and `npm run validate` is clean.
**This is the point to ship** — a real Technology track in front of a student before the
engine is written.

---

## Step 3 — the simulator engine (1–2 weeks)

**Goal:** `src/utils/appSim.js` — the state model that every skin and both consumers
(the `SIM` task and the `AppSim` notes widget) share.

### 3a · The engine

Pure, no React. It owns:

- **State.** A plain object per skin (`{ files, folders, mail, browser, settings, … }`).
- **Actions.** `apply(state, action) -> state`. Every UI gesture becomes an action, so
  the whole session is an append-only action log — which gives replay, undo and the
  self-check for free.
- **Goals.** `evaluate(state, goal[]) -> { met, failed[] }` over
  `{ path, equals | matches | gte | contains }` clauses. **Assert on state, never on
  clicks** — `Ctrl+S`, right-click ▸ Save and File ▸ Save must all pass.
- **Undo.** Pop the log. No dead ends: the student must always be able to get back.
- `solve(item)` — runs an item's authored `solution` action list and asserts the goal is
  met. This is the self-check in step 3d.

### 3b · The `files` skin

`src/tasks/appsim/skins/FilesSkin.jsx` — a window with a folder tree (Documents,
Downloads, Desktop, Recycle Bin), a file list, a Save-As dialog, right-click menus, and
keyboard shortcuts. Tap- and drag-friendly at tablet size; one fixed aspect ratio,
scaled.

### 3c · The `SIM` task + the notes widget

- `src/tasks/AppSim.jsx` — brief, the skin, a move counter, `hintAfter` nudge (glow the
  region, drop the score, **never end the task**), `parMoves` bonus.
- `src/tasks/taskRegistry.js` — `SIM`, `dbKey: 'p25'`, label `Try It`, 30 XP,
  `hasContent: (u) => notEmpty(u.sim)`.
- `src/components/WidgetRenderer.jsx` — register `type: 'AppSim'` with
  `params: { skin, script }` for **demo mode**, so a `NOTES` slide can drive the same
  engine through the steps while the narration explains them. Build once, use twice.

### 3d · The self-check that matters

A `node` script (the `chemFormula.checkItem` pattern) that loads every authored `sim`
item, runs its `solution` action list through the engine and asserts the goal evaluates
`met`. **An unsolvable sim item is this track's wrong answer key and is invisible from
reading the data.** Wire it into `npm run validate`.

**Done when:** `preview-tech.html` runs a `files` job end to end, a scripted solution
passes the self-check, and a `NOTES` slide plays the same job in demo mode.

---

## Step 4 — the file units (3–4 days)

**T4 · Saving Your Work** and **T5 · Folders and Finding**, on the `files` skin. Full
gate structure from [the course doc §3](../digital-skills-course.md#3-unit-shape) minus
`TYPE_GYM` (not built yet) — re-derive the thresholds.

---

## Step 5 — `mail` skin + `TYPE_GYM` (1 week)

- `MailSkin.jsx`: compose, To/Cc/Subject, attach from the file system the `files` skin
  already models, send, reply / reply-all / forward, and an inbox that can contain a
  phishing message the correct response to which is *not clicking it*.
- `src/tasks/TypeGym.jsx` + registry entry `dbKey: 'p26'`, 10 XP, home-row-first, WPM
  and accuracy derived, target climbing across the course.
- Ship **T3**, **T9**, **T10**.

---

## Step 6 — remaining skins and units

`browser` (T2, T7 upgrade, T8) → `desktop` (T1 upgrade) → `settings` (T13) →
`doc` (T6, T11, T12) → **T14** last, since it pulls the safety threads together.

---

## Per-unit definition of done

- `npm run validate` — gates inside the 80% rule, no empty tasks, `vn*` twins present.
- The `sim` solvability self-check passes for every authored item.
- `npm run audit:svg PRIMARY_TECH`.
- `npm run lint && npm run build`.
- `npm run sync-audio` for the narration.
- `preview-tech.html` mounts every task in the unit.
