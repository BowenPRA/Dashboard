# `PRIMARY_TECH` — the upgrade to the Year 7 standard

**The ask (2026-09-21):** "carefully polish and improve the current 3 tech units to get
them to the standard of the recent y7 math and science units."

T1, T4 and T7 were built as the *first* units of a new track (see
[BUILD-PLAN.md](BUILD-PLAN.md)), and they read like it: correct, well-argued, and thin.
Y7 Science and Maths have since set a much higher bar for a self-study unit
([../y7-science/ENGAGEMENT-PLAN.md](../y7-science/ENGAGEMENT-PLAN.md)). This plan closes the
gap. It is also the brief the three unit rebuilds are authored against.

---

## 1. The gap

| | Y7 Science 2.5 / Maths 2.4 | Tech T1 / T4 / T7 before |
|---|---|---|
| Deck | 22–26 slides, **16–20 scored items**, 4–6 activity types | 9–12 slides, **3 checks**, no activities |
| Starter | an interaction on slide 2 (tap, guess, sort) | "Think about…" — an instruction |
| Paper | no slide sends the student to paper or a partner | "Check your notebook" slide in every deck |
| The engine | a derive-everything task per unit (Element Hunt, Flow Solve…) | T4 has Try It; **T1 and T7 have none** |
| Never the same twice | one generative task per unit | nothing generative |
| Label the diagram | Label It on 2–3 drawn diagrams | none — Find It only |
| Practice set | 10–12 questions, 5–6 answer types, no type twice in a row | 6–8 questions |
| Written answers | 3–4, bilingual prompt (`vnTranslation`), suggested words | 2, English-only prompt |
| Quiz | 8 questions, 10 minutes | 6 questions, 8 minutes |
| Checks | 4 options, the right letter spread across A–D | 3 options |

## 2. The unit shape after this plan

| Gate | Threshold | Tasks | XP |
|---|---|---|---|
| **0 · Learn** | 0 | `NOTES` 20 · `WORD_REC` 15 | 35 |
| **1 · Do** | 25 | `SIM` 25 · `LABEL_IT` 15 · `POINT_IT` 10 · `WORKBOOK` 15 · `TYPE_GYM` 10 | 75 |
| **2 · Prove** | 80 | `SHORT_ANSWERS` 10 · `DIAGRAMS` 10 · `ASSESSMENT` 20 · `GAMES` 0 | 40 |

150 XP available, capped at 100 — the validator warns only above 150. Gate 1 is 25 of
the 35 before it (71%); Gate 2 is 80 of the 110 before it (73%). Both inside the 80% rule;
**re-derive them if any XP changes.** The track's `unitGate: 50` (the next unit opens at
50 XP) is unchanged: 50 is still "did Learn and most of Do".

Phase titles stay the track's own: `Gate 0: Learn`, `Gate 1: Do`, `Gate 2: Prove`.
`READ_COMP` is deliberately *not* in the shape: `WORD_REC`, Label It and the Typing Gym
already carry the words three ways, and a fourth pass is the "SPELLING problem" Y7 Science
dropped.

## 3. The engines

### 3.1 Try It gets two new skins — `desktop` (T1) and `browser` (T7)

The simulator (`src/utils/appSim.js`, the `SIM` task and the `AppSim` notes widget) had
one skin, `files`. It gains `desktop` and `browser`, on the same four rules: assert on
STATE never on clicks; no dead ends (undo is "drop the last action and replay"); nudge,
don't fail; par is a bonus. Every item's `solution` is replayed by `npm run validate`, which
refuses an unsolvable item and one whose goal is met before the student does anything.

**Typing is one move.** A text action (`dialogName`, `search`, `typePassword`,
`typeAddress`, `typeSiteSearch`) that follows another of the same type *replaces* it in
the log instead of appending. Before this, every keystroke of a file name was a move: a
student typing "volcano report" blew par on the first word and, because each keystroke
"made no progress", was nudged after three letters — capping the job at 6/10. A solution
therefore types each field in ONE action: `{ type: 'dialogName', name: 'volcano report' }`.

**A nudge waits for par.** The nudge (glow + score capped at 6) needs `hintAfter` moves
without getting closer AND more moves than `parMoves`. Most jobs are several steps that
close no goal clause until the last (menu → Power → Shut down), so the old "no progress"
count alone nudged a student on the *perfect* route before its final step.

**Hints can say when they apply.** `hints: [{ after, region, say, sayVn, when? }]` —
`when` is a goal clause (or list) about the state NOW, e.g. `{ path: 'power', equals: 'off' }`.
The shown hint is the last one whose `after` has passed and whose `when` holds, so "the
power button is on the case" is never shown to a student already at the login screen.
Without an authored hint, the default glow reads the state too (unsaved work → its Save
button; never the power button on a working machine).

**Every step must do something.** The validator replays each solution and each deck demo
and refuses a step the engine ignores (a link not on the page, a mistyped window title).

**Layout.** From `lg` the Try It screen is two columns — the job, feedback and buttons on
the left, the machine on the right at full height — so nothing is below the fold on a
1280×720 laptop. The desktop is drawn at 720×486 and scaled to fit.

#### `desktop` — the machine itself

```js
initial: {
  power: 'on',            // 'off' | 'login' | 'on' | 'sleep'          (default 'on')
  user: 'Ha Vi',          // the account on the login screen          (default 'Ha Vi')
  password: 'sunflower',  // that account's password                  (default 'sunflower')
  frozen: false,          // a frozen machine ignores everything but a HELD power button
  windows: [              // open programs, if the power is 'on' or 'sleep'
    { app: 'notes', title: 'story', state: 'normal', saved: false },
  ],
}
```

Apps: `notes` (Notes), `paint` (Paint), `browser` (Browser), `files` (Files),
`calculator` (Calculator). A window is addressed by its **title**, which must be unique.
`state` is `normal | max | min`.

| action | params | what it does |
|---|---|---|
| `pressPower` | | a short press of the button on the case: off → starts up to the login screen; on → sleep; sleep → wakes. Ignored while frozen. |
| `holdPower` | | holding the button: forced off from ANY state. Every window closes and unsaved work is lost; `forced` counts it. The only thing a frozen machine answers. |
| `wake` | | tap the sleeping screen / press a key: back to where it was |
| `typePassword` | `text` | the password box (text action) |
| `submitLogin` | | Enter / the arrow: the right password logs in; a wrong one clears the box and says so |
| `openMenu` | | the menu button at the left of the taskbar (again closes it) |
| `openPowerMenu` | | the power entry at the bottom of the menu |
| `closeMenu` | | |
| `openApp` | `app` | from the menu or a desktop icon; restores the window if it is already open |
| `minimise` / `maximise` / `restore` / `close` | `title` | the three corner buttons, and a taskbar button (`restore`). `maximise` toggles max ↔ normal. Closing an unsaved window asks first. |
| `edit` | `title` | typing in a window — its work becomes unsaved (demos) |
| `save` | `title` | the window's Save button / Ctrl+S |
| `sleep` / `logout` / `restart` / `shutdown` | | the power menu. Log out, Restart and Shut down with unsaved work open **stop and ask** ("story has not been saved") |
| `dialogSave` / `dialogDiscard` / `dialogCancel` | | the "save changes?" box a close raises |
| `dialogAnyway` / `dialogCancel` | | the "not saved — stop anyway?" box a stop raises |

What restart and log out leave behind: both end at the **login screen** (`power: 'login'`),
restart having gone off and on again. Shut down ends at `off`. Sleep keeps every window.

Goal paths (`view()`):

| path | value |
|---|---|
| `power` | `'off' \| 'login' \| 'on' \| 'sleep'` |
| `loggedIn` | `true` when on and a user is logged in |
| `open` · `minimised` · `maximised` · `unsaved` | window titles |
| `lost` · `lostCount` | work thrown away (closed unsaved, forced off, stopped anyway) |
| `forced` · `shutdowns` · `restarts` · `logouts` · `sleeps` | how many times each happened |
| `lastStop` | `'sleep' \| 'logout' \| 'restart' \| 'shutdown' \| 'forced' \| null` |
| `frozen` · `menu` | `false \| 'apps' \| 'power'` for the menu |

Hint regions: `power` (the case button), `screen`, `password`, `menu`, `powerMenu`,
`stop:shutdown` / `stop:sleep` / `stop:logout` / `stop:restart`, `app:<app>`,
`taskbar:<title>`, `min:<title>`, `max:<title>`, `close:<title>`, `save:<title>`,
`dialog`.

A normal "shut it down" job should carry `{ path: 'forced', equals: 0 }` and
`{ path: 'lostCount', equals: 0 }` — then holding the button, or shutting down over unsaved
work, fails the job the way it fails in life, and Undo is right there.

#### `browser` — a small, fake web

The web lives in the engine (`WEB`), so every page is the same in the deck, the task and
the validator. Addresses are exact, like real ones:

| address | page | on it |
|---|---|---|
| `www.schoolsite.org` | Riverside School (home) | links Library · Homework · News; the site's own search box |
| `www.schoolsite.org/library` | School Library | Download `reading-list.pdf`; search box |
| `www.schoolsite.org/homework` | Homework | Download `maths-sheet.pdf` |
| `www.schoolsite.org/news` | School News | Sports Day story |
| `www.citylibrary.org` | City Library | opening times; link Kids' books; search box |
| `www.citylibrary.org/kids` | Kids' Books | Download `summer-reading.pdf` |
| `www.weathernow.org` | Weather Now | today's weather |
| `www.kidsmaths.org` | Kids Maths | times-table games |

Other locations: `newtab`; `search:<words>` (the address bar sent words to the search
engine — a results page linking the pages above); `<site>/search:<words>` (a page's OWN
search box — it only ever finds pages on that site, and "No results" for an address);
`notfound:<typed>` ("can't find this site — check the spelling"); `downloads` (All
downloads). A typed address is trimmed, lower-cased, and loses `https://`, a trailing `/`,
and a missing `www.` if the `www.` form exists. Anything with a space, or with no dot, is
words, not an address.

```js
initial: {
  tabs: ['www.schoolsite.org'],                 // one location per tab, or
  // tabs: [{ history: ['www.schoolsite.org', 'www.schoolsite.org/homework'] }],  // back works
  active: 0,
  bookmarks: [],
  downloads: [],                                 // names already in Downloads
  broken: false,                                 // the active page only half-loaded (Reload fixes)
}
```

| action | params | what it does |
|---|---|---|
| `typeAddress` | `text` | the address bar (text action; clicking it selects the old address) |
| `go` | | Enter: an address opens that page, words go to the search engine |
| `typeSiteSearch` / `siteSearch` | `text` / — | the page's own search box, then its button |
| `clickLink` | `to` | a link on the page (`to` is the location it goes to) |
| `back` · `forward` · `reload` | | the three arrows (Alt+← and F5 too) |
| `newTab` · `switchTab` · `closeTab` | — · `index` · `index` | the tab strip. Closing the LAST tab closes the browser |
| `openBrowser` | | the browser icon, after it has been closed |
| `bookmark` | | the star (toggles the current page) |
| `openBookmark` | `url` | the bookmarks bar |
| `download` | `file` | a download button on the page; the file lands in Downloads and the download bar appears |
| `showInFolder` · `allDownloads` · `closeFolder` | | the download bar's two buttons; closing the folder |

Goal paths: `url` (the active tab's location), `site`, `title`, `urls` (every tab),
`tabCount`, `closed`, `bookmarks`, `downloads` (also `at.Downloads`), `shownInFolder`,
`broken`, `history`, `searches` (words sent from the address bar), `siteSearches` (what was
typed into a page's own box).

Hint regions: `address`, `back`, `forward`, `reload`, `star`, `newtab`, `tab:<i>`,
`siteSearch`, `link:<to>`, `download:<file>`, `showInFolder`, `bookmarks`, `page`.

### 3.2 `TYPE_GYM` — "Typing" (`p26`, 10 XP) — never the same twice

The key the course reserved for it (p24–p26 are this track's). Touch typing, home row
first, **stop-on-error**: the caret only moves on the right key, a wrong key flashes and
counts. No backspace to fight with. An on-screen keyboard lights the next key and colours
the fingers; F and J carry their bumps. Speed and accuracy are DERIVED from the keystrokes;
nothing is stored but the line.

```js
typeGym: {
  title: 'Typing Gym', titleVn: 'Phòng tập gõ phím',
  modes: ['home', 'words', 'sentences'],  // rounds cycle through these
  rounds: 6,
  words: ['desktop', 'taskbar', 'icon'],  // the unit's interface words ('words' mode)
  sentences: ['Save your work first.'],   // 'sentences' mode
  addresses: ['www.schoolsite.org'],      // 'addresses' mode
  names: ['volcano report'],              // 'names' mode — file names
  target: { wpm: 8, accuracy: 0.9 },      // this unit's goal; climbs across the course
}
```

Modes: `home` (generated home-row drills and home-row words), `words` (5–6 of the unit's
words), `sentences`, `addresses`, `names`. Every line is drawn fresh from a seed
(`makeSession(config, seed)` in `src/utils/typeGym.js`), so a second go is practice, not
memory. Characters are plain ASCII: letters, digits, space and `. , - / : ; ' ! ?`.
Score out of 10: 70% accuracy against the target, 30% speed against the target — accuracy
first, which is how touch typing is taught.

Targets: T1 6 wpm / 85% (first time on the home row), T4 8 / 90%, T7 10 / 90%.

### 3.3 What is NOT new

Deck activities use the existing types (`hotspot`, `sort`, `order`, `predict`, `estimate`;
[ENGAGEMENT-PLAN §2.1](../y7-science/ENGAGEMENT-PLAN.md)). `hotspot` strips `<text>` from the
picture so it cannot answer its own question — **tag interface words that are part of the
picture `class="keep"`** (the "Save" on a button, the address in the bar, "14:05"), and ask
by FUNCTION ("tap the button that closes the window for good"), never by the word printed
on it. Label It is unchanged ([§2.2](../y7-science/ENGAGEMENT-PLAN.md)).

## 4. Deck rules (all three units)

1. **Slide 2 is an interaction**, never an instruction. The hero card says what the lesson
   is and how many things are scored (the Y7 hero card: "You will tap, sort and predict your
   way through it. **N things are scored**").
2. **22–26 slides, 15–18 scored items**: checks and activities, at least **four** activity
   types, never three checks in a row, and roughly one scored item every 1–2 slides.
3. **Checks have 4 options (A–D)**, each distractor a nameable mistake, the right letter
   spread evenly across A–D over the deck. `check:`/`activity:` is the LAST key of its slide;
   never both on one slide.
4. **Show → Do in the deck.** At least two `AppSim` demo slides (widget in a `split` slide
   at `ratio: 62`, narrated script, same engine and window as Try It).
5. **Hotspots on the interface pictures** — where the classroom would point, the student
   taps. Decoys: list every plausible control as a target so a wrong tap is *named*.
6. **No paper.** The "Check your notebook" slide becomes the Y7 closing pair: a `stack`
   with `variant: 'checklist'` ("Can you do these?", 4 items, what comes next) carrying the
   **exit check**, then the unassessed **"On your own computer"** callout, which stays the
   last slide (course doc §5.4 — the transfer to a real machine is the point).
7. Layout traps ([../lesson-renderer-gap.md](../lesson-renderer-gap.md) §0): `compare`
   drops `inlineSvg`; below `lg` a check under a `showcase` shrinks its picture, so put a
   picture that must be READ on a `split` when it carries a check, or ask about it with a
   hotspot. A plain `stack` renders `notes`, not `items` (only `variant: 'checklist'` renders
   items).
8. Activity strings are `name`/`explain`, never `text`/`content` (the narrator reads those).
   Every learner-facing string has its `…Vn` twin.
9. Generic operating system, real names ([../digital-skills-course.md](../digital-skills-course.md)
   §5.2): invented pixels, the real words (address bar, Recycle Bin, Ctrl+S). Name **two ways
   to do everything** (the button and the key) wherever there are two.

## 5. The other tasks (all three units)

- **Label It — 2–3 diagrams, 4–7 pins each, a distractor in every bank** that is a real
  interface word ABSENT from the picture. Draw `LB_*` versions of the unit's art with room
  in the margins for the boxes (the validator fails boxes that overlap or leave the
  viewBox — iterate on it). Leader lines and their dots carry `class="lbl"`; interface
  words that are part of the screen carry `class="keep"`. `node scripts/svg-coords.mjs
  PRIMARY_TECH/T01 LB_DESKTOP` prints coordinates.
- **Find It** stays (10 XP), 2 pictures × 5 prompts, prompts by description.
- **Workbook — 10–12 questions**, Focus/Practice/Challenge, at least five answer types
  (`mcq`, `inline`, `dnd`, `order`, `fill_blank` with word `accept`s, an `inlineSvg` item),
  never the same type twice in a row. No typed maths box: a typed answer is marked by
  algebraic equivalence, which reads `www.x.org` as algebra.
- **Short answers — 3**, each with `vnTranslation` and `suggestedWords`, 2–3 marks, one
  mark per scheme line ([../question-quality.md](../question-quality.md)).
- **Source analysis (`DIAGRAMS`) — 3**: two MCQ + one written, each on a picture.
- **Quiz — 8 questions, `timeLimit: 600`**, plain English (the quiz renders only the
  explanation bilingually), no item copying a deck check, right letters spread A–D.
- **Vocab — 10–12 interface words**, each with `vn`, `def`, `vnDef`, `sent`, `vnSent`.
  Module properties written in full (`notes: notes,`) — a shorthand right after
  `realWords` makes the audio generator skip the word audio.
- **Try It — 5–6 jobs**, each with at least one hint, `parMoves`, and a goal that the
  wrong-but-plausible route FAILS (shutting down over unsaved work, typing an address into
  the site's box, leaving a copy behind in Downloads).

## 6. Per-unit briefs

The spines below are the design; adapt a beat if something reads better on the slide.

### T1 · Starting and Stopping (`desktop` skin)

- **Starter:** `hotspot` on a row of four symbols (power ⏻, wifi, volume, battery) — "which
  one is the power button?" The ⏻ symbol is on every machine they will meet.
- Turning it on (steps + the "nothing happened — check the plug" reveal) → **AppSim demo:
  press, wait, log in** → `order` the four start-up steps.
- Your password is yours (split, sticky note) + check → `sort` password habits into "keeps
  it yours / gives it away".
- The desktop tour (showcase) → `hotspot` the taskbar → `hotspot` the menu button.
- Three buttons in the corner + check → `hotspot` on a large window corner: the button that
  closes for good → **AppSim demo: minimise, bring it back from the taskbar, maximise, close**
  → `predict` where a minimised window goes.
- Four ways to stop (the ladder) → `sort` four situations into Sleep / Log out / Restart /
  Shut down → check (which one is all the way off).
- Do not hold the power button (callout) + `predict` (holding it while a file is saving).
- Stopping properly (steps + reveal) → **AppSim demo: save, menu, Shut down** → `order` the
  five stopping steps.
- Frozen: statement + check. Locked or off? (LOCKED_VS_OFF on a split) + `hotspot` the one
  still switched on.
- Checklist + exit check → On your own computer.
- **Try It (6):** turn it on and log in (password in the brief); a minimised window —
  bring it back and make it fill the screen; save the story then shut down properly;
  hand the computer to your sister (log out); twenty minutes for dinner — sleep, work still
  open (the menu AND a short press of the power button both pass); frozen — get it working
  and log back in.
- **Label It:** `LB_COMPUTER` (screen, keyboard, touchpad, power button, power light;
  distractor Printer), `LB_DESKTOP` (desktop, icon, window, taskbar, menu button, clock;
  distractor Address bar), `LB_WINDOW` (title bar, minimise, maximise, close, the work
  area; distractor Recycle Bin).
- **Typing:** `home`, `words`, `sentences`; target 6 wpm / 85%.

### T4 · Saving Your Work (`files` skin)

- **Starter:** `predict` — an hour of typing, the power goes off, you never pressed Save:
  what is left? (nothing — the work lived only in the open window).
- Unsaved work: the dot in the title; `hotspot` the document that is NOT saved yet.
- Saving asks two questions (statement + check) → the Save As box (showcase) → `hotspot`
  where the name goes → `hotspot` the folder for your own school work → **AppSim demo:
  watch it happen** (exists) → `order` the four saving steps.
- Save or Save As (showcase) → `predict` how many files after Save As → check (keep the
  first draft).
- Naming (stack + check) → `sort` names you would find next month / would not.
- Where things live (steps) → `sort` six things into Documents / Downloads / Desktop /
  Recycle Bin.
- Two ways to do everything: Save and Ctrl+S; the ⋮ menu and right-click + check.
- The file manager (showcase) → `hotspot` the folder deleted files go to.
- Delete is a move (check) → **AppSim demo: get it back from the bin** → `predict` what
  emptying the bin does.
- Lost it? Search for part of the name + check.
- Checklist + exit check → On your own computer.
- **Try It (6):** the four existing jobs + keep your first draft (Save As a copy, both
  exist) + find a file by searching and move it into Documents. (Search now looks in
  every folder, the way a real one does.)
- **Label It:** `LB_SAVE_AS` labelled by FUNCTION ("where the name goes", "where it will be
  kept", "saves the file", "closes without saving"; distractor "deletes the file"),
  `LB_FILE_MANAGER` (folder list, file list, search box, Recycle Bin, a file's ⋮ menu;
  distractor Address bar).
- **Source analysis (new, 3):** a desktop buried in Untitled files (MCQ); a Downloads list
  with dates — which one came today (MCQ); a Documents folder — which file names would you
  find next month, and why (written).
- **Typing:** `home`, `words`, `names`; target 8 wpm / 90%.

### T7 · Inside a Browser (`browser` skin)

- **Starter:** `hotspot` on a taskbar of five app icons — which one opens websites?
- Which one is the browser? (the gallery) → the parts (showcase) → `hotspot` the address
  bar → `hotspot` the button that opens a new tab.
- Address bar or search box? (compare + check) → side by side (showcase) → `predict` what
  the school's box does with `www.citylibrary.org`.
- Going to a website you were given (steps + typo reveal) → **AppSim demo: type it, Enter**
  → check: which address reaches the school (exact match among lookalikes) → `sort`
  addresses vs words to search.
- Links (`hotspot` the link on a page) → tabs (split + check) → **AppSim demo: a second
  tab**.
- Back, forward, reload (steps) → `sort` situations into the three buttons.
- Bookmark (statement + check).
- Downloading (showcase) → `hotspot` the button that shows where it went → **AppSim demo:
  download, Show in folder** → check (closing the browser does not lose it).
- Checklist + exit check → On your own computer.
- **Try It (6–7):** go to an address you were given (the page's own search box is right
  there as the trap); keep this page and open the library in a second tab; back to where
  you were; the page half-loaded — fix it without leaving; bookmark it; download the
  reading list and show where it went; find the homework sheet with the school's own
  search box.
- **Label It:** `LB_BROWSER` (tabs, new tab, back, reload, address bar, bookmark star, the
  page; distractor Taskbar), `LB_ADDRESS` (the parts of `www.schoolsite.org/library`: the
  website's name, the ending, a page on the site, the start; distractor "a password").
- **Typing:** `words`, `addresses`, `sentences`; target 10 wpm / 90%.

## 7. Definition of done, per unit

- `npm run validate` (gates, sims solvable, activities, Label It layout, bilingual twins),
  `npm run audit:svg PRIMARY_TECH`, `npm run lint`, `npm run build`.
- Every slide swept in `preview-tech.html?unit=T0x&open=NOTES&slide=N` at 1280×720: no raw
  `**`, no `.katex-error`, every picture readable, every activity completable.
- Every Try It job done by hand at least once by the route a student would take.
- Slide audio regenerated (delete `public/audio/PRIMARY_TECH/T0x/` first — slide audio is
  keyed by position, and every deck grew).

---

## 8. New units: T2 and T3 (asked for 2026-09-21)

"Make units 2 and 3" — **T2 · Mouse, Keys and Windows** and **T3 · Typing Properly**
from the course map (docs/digital-skills-course.md §6), built to this plan from the start.
Both became buildable the day the `desktop` skin and `TYPE_GYM` landed.

**The unit gate.** Units sort by id, so T2 and T3 slot in between T1 and T4 — and the
track's `unitGate` locks a unit until the one before it has 50 XP. From now on **a unit
the student has already started never locks**: the gate stops skipping ahead, it does not
take away work in progress. Without that, adding T2 would have re-locked T4 for every
student already working in it.

### 8.1 Shapes

| Gate | T2 · Mouse, Keys and Windows | T3 · Typing Properly |
|---|---|---|
| **0 · Learn** (0) | `NOTES` 20 · `WORD_REC` 15 | `NOTES` 20 · `WORD_REC` 15 |
| **1 · Do** (25) | `SIM` 25 · `MOUSE_GYM` 15 · `LABEL_IT` 10 · `WORKBOOK` 15 · `TYPE_GYM` 10 | `TYPE_GYM` 30 · `LABEL_IT` 15 · `POINT_IT` 10 · `WORKBOOK` 15 |
| **2 · Prove** (80) | `SHORT_ANSWERS` 10 · `DIAGRAMS` 10 · `ASSESSMENT` 20 · `GAMES` 0 | `SHORT_ANSWERS` 10 · `DIAGRAMS` 10 · `ASSESSMENT` 20 · `GAMES` 0 |
| total | 150 | 145 |

Gate 2 is 80 of 115 (T2, 70%) and 80 of 105 (T3, 76%). T3 has no Try It — the course map
gives it none; the Typing Gym *is* the doing, so it carries 30 XP. T2 swaps Find It for
the Mouse Gym, so no two units share a task list.

### 8.2 Engine additions

**`desktop` skin — things on the desktop, right-click, drag.** An item is a file or a
folder that sits on the desktop (the four app shortcuts and the Recycle Bin are always
there):

```js
initial: {
  items: [
    { name: 'old drawing.png' },               // kind comes from the extension
    { name: 'Holiday', kind: 'folder' },
    { name: 'beach.jpg', in: 'Holiday' },      // inside a desktop folder
    { name: 'test.docx', in: 'bin' },          // already in the Recycle Bin
  ],
  windows: [ … ],                               // as before
}
```

| action | params | what it does |
|---|---|---|
| `openItem` | `name` | double-click an item: a folder opens a Files window titled with its name, a document opens Notes, a picture opens Paint |
| `openContext` | `target` | right-click (press-and-hold on a tablet) on `desktop`, `item:<name>`, `app:<app>`, `bin` or `taskbar:<title>` |
| `closeContext` | | click away / Esc |
| `contextChoose` | `choice` | desktop → `newFolder`; item → `open` · `rename` · `delete`; app → `open`; bin → `open`; taskbar → `close` |
| `drag` | `name`, `to` | drag an item onto `bin` or onto a desktop folder's name |
| `deleteItem` | `name` | select it and press Delete |
| `typeName` · `commitName` · `cancelName` | `text` · — · — | the rename box (a text action), Enter, Esc. `newFolder` opens the box on "New folder" |
| `restoreItem` | `name` | "Put it back" inside the Recycle Bin window |
| `openBin` | | double-click the Recycle Bin (the same window right-click ▸ Open gives) |

Drag in the skin is by pointer (mouse and finger alike) and drops onto whatever carries
`data-drop` — the bin, a folder icon, an open folder window, or the desktop. A tablet's
press-and-hold opens the right-click menu. Delete removes the selected item; Esc closes
a menu or a name box. Names are unique across the whole machine (an item is addressed
by its name), so author distinct names.

**`files` skin — two fixes found while authoring T4.** Save As now pre-fills the name
WITHOUT its extension (a student adding " 2" gets `report 2.docx`, not `report.docx 2`),
and a Save As onto a name already in that folder asks **"Replace it?"** first (a second
`dialogConfirm` replaces; `dialogCancel` goes back to the box). The new goal path
`overwritten` lists files written over since the start — by Save on an existing file or a
confirmed replace — so "keep the first draft" can finally tell a real Save As from
"Save, then Save As": `{ path: 'overwritten', excludes: 'volcano report.docx' }`.

New goal paths: `at.desktop`, `at.bin`, `at.<folder>` (item names), `folders` (desktop
folders), `focus` (the title of the window on top), `context` (the open right-click menu's
target, or null), `renaming`. Hint regions: `item:<name>`, `bin`, `context:<choice>`,
`rename`.

**`MOUSE_GYM` — "Mouse Gym" (`p45`), generative.** Twelve quick rounds on a play area:
click the target (decoys around it), double-click it, right-click it and choose the named
thing from its menu, drag it into the box. On a tablet: tap, double-tap, press-and-hold,
drag — the screen says which, by the pointer it sees. Positions, targets and menu choices
are drawn from a seed (`src/utils/mouseGym.js`). A round done first time scores in full; a
slip (one click where two were needed, the left button for the right) is named and the
round carries on.

```js
mouseGym: { title: 'Mouse Gym', titleVn: 'Phòng tập chuột', modes: ['click', 'double', 'right', 'drag'], rounds: 12 }
```

**`TYPE_GYM` — three more generated modes:** `top` (top-row reaches from the home row),
`bottom` (bottom-row reaches) and `shift` (capital letters with the OPPOSITE hand's
Shift). They need no pool.

### 8.3 T2 · Mouse, Keys and Windows (`desktop` skin)

- **Starter:** `hotspot` on a drawn mouse — "tap the button you press most" (left; decoys
  the right button and the wheel).
- The mouse (split, MOUSE diagram) + check → the four things a mouse does (steps: click,
  double-click, right-click, drag) → `sort` jobs into the four → on a touch screen and a
  touchpad (tap, double-tap, press-and-hold / two-finger tap, drag) + check.
- **AppSim demo:** double-click Paint's icon; right-click the old drawing and Delete;
  right-click the desktop → New folder, type a name, Enter.
- A right-click menu is about the thing you clicked (statement) + `predict`.
- Drag and drop (steps) + `order`.
- Many windows: the one on top is the one you are using → `hotspot` on TWO_WINDOWS →
  switching from the taskbar (**AppSim demo**) + check.
- Keys that do a job (Enter, Backspace, Delete, Shift, Caps Lock, Space, Esc, Ctrl) →
  `hotspot` Backspace and Esc on a keyboard → Backspace vs Delete + check → Shift vs Caps
  Lock + `predict` → Ctrl shortcuts (Ctrl+S, Ctrl+Z, Ctrl+C, Ctrl+V) + `sort` → Esc, the
  way out + check.
- Checklist + exit check → On your own computer.
- **Try It (6):** open Paint from its desktop icon (double-click, right-click ▸ Open and the
  menu all pass); the Calculator is hidden behind — bring it to the front (`focus`); make
  Paint fill the screen, then close the Calculator and keep Paint; put the old drawing in
  the Recycle Bin (drag, right-click ▸ Delete, Delete key); right-click the desktop and
  make a folder called "My Games"; drag both photos into the Holiday folder.
- **Label It:** `LB_MOUSE` (left button, right button, scroll wheel, cable; distractor
  Touchpad), `LB_KEYS` (Enter, Backspace, Shift, Space bar, Esc, Ctrl; distractor Power
  button), optionally `LB_WINDOW_PAIR` (the window on top, the window behind, the taskbar).
- **Source analysis:** five windows stacked — which one is the student using (MCQ); a
  right-click menu open on a file (MCQ); written — "I double-clicked the folder and
  nothing opened" (two clicks too slow, or a click-and-move that became a drag).
- **Mouse Gym:** all four modes, 12 rounds. **Typing:** `words`, `shift`, `sentences`
  (the keys unit — capitals and full stops); target 6 wpm / 85%.

### 8.4 T3 · Typing Properly (no Try It)

- **Starter:** `estimate` — how many words a minute does a good touch typist type? (about
  40; tolerance 0.35).
- Why type properly (statement: looking down costs twice) → sit like this (split,
  POSTURE) + `sort` good and bad habits.
- The home row (showcase) → `hotspot` F → the bumps on F and J + check → every finger has
  its own keys (FINGER_ZONES showcase) → `hotspot` a key the right little finger presses →
  thumbs on the space bar + check.
- Reach and come home (steps) + `order`. Shift for capitals, the other hand's Shift +
  `predict`. Enter and Backspace + check. Full stops, commas, question marks.
- Accuracy first, then speed (statement) + `estimate`/check; little and often (callout);
  don't look down — how to check without looking + check.
- Checklist + exit check → On your own computer.
- **Label It:** `LB_KEYBOARD` (home row, space bar, Shift, Enter, Backspace, Caps Lock, Tab;
  distractor Scroll wheel), `LB_HANDS` (the finger zones: left little, left index, right
  index, right little, thumbs; distractor "a palm key").
- **Find It:** the keyboard, prompts by job ("the key your left index finger rests on", "the
  key that makes the next letter a capital", "the long key under your thumbs"…); a second
  picture of your choice (a laptop keyboard, or the finger-zone keyboard).
- **Source analysis:** a student sitting badly (MCQ: what to fix first); two typists'
  results — fast and 60% right vs slower and 95% right (MCQ); written — why F and J have
  bumps, and why looking down slows you.
- **Typing:** `home`, `top`, `bottom`, `shift`, `words`, `sentences`, 10 rounds; target
  8 wpm / 90%.
