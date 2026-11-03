# Building one Year 7 unit in a parallel session

The brief every builder session follows when several classroom lessons are turned
into Dashboard units at once (first used 2026-11-03 for Maths 6.1–6.2 and Science
3.3–3.7). Your session prompt names **your** unit, its classroom deck, its marker
id, its dbKey and its port. Everything else is here.

## 1. Read first

- [classroom-dashboard-pairing.md](classroom-dashboard-pairing.md) — the contract:
  the ten reduction rules (§3) and the build loop (§5).
- The track shape: [y7-math/ADAPTATION-PLAN.md](y7-math/ADAPTATION-PLAN.md) or
  [y7-science/ENGAGEMENT-PLAN.md](y7-science/ENGAGEMENT-PLAN.md).
- [french.md](french.md) — these units are **English and French only**:
  `meta.vietnamese: false`, `…Fr` twins from the start, NO `…Vn` fields. The
  validator refuses a missing French twin or English left untranslated.
- The newest exemplars, built in the same shape: plans
  `docs/y7-math/plans/U05_1.md` … `U05_3.md` and `docs/y7-science/plans/U03_2.md`;
  units `src/data/Y7_MATH/U05_1` … `U05_3` and `src/data/Y7_SCI/U03_2` (and the
  engines they registered at their `@@U05_…@@` / `@@SCI_U03_2_…@@` markers).
- [lesson-standard.md](lesson-standard.md) and [independent-learning.md](independent-learning.md).
- **Your classroom deck**, read in full, every slide: `C:\Users\sbowe\code\classroom\content\<course>\<slug>\`
  (`slides.js`, `plan.js`, `diagrams.js`, widgets, `images/CREDITS.json`). It is
  **read-only**: never edit, commit or deploy the classroom repo (it carries
  another session's uncommitted work). The lead adds the `meta.dashboard`
  back-link there after merging.

## 2. The shape: more polish, less busy work

Mr Bowen's direction (2026-10-29): *"carefully look thru the slides and figure out
which stuff in them should be interactive questions. for the tasks, think about
meaningful tasks".*

- Wherever the deck asks the room something (a vote, a whiteboard question, "what
  happens next?", a prediction before a model), consider an interactive item, and
  keep it only where answering IS the learning. Distractors are real
  misconceptions; explanations say why the wrong ones are wrong.
- Tasks: **NOTES · WORD_REC · ONE flagship engine · SHORT_ANSWERS only if
  explaining is the skill · ASSESSMENT · GAMES.** No Workbook, cloze READ_COMP or
  Quick Fire unless your plan argues it is the meaningful task. Each task gets a
  one-line "the thinking only it makes the student do".
- The engine fades the scaffold: levels 1–2 walk every stage; later items take
  2–3 actions; a wrong answer opens the stages where its slip happened. Every
  answer and named slip is derived in code and proved by a checker the validator
  runs (see `angleSumCheck.js`, `solarStoryCheck.js`).
- Gates: with fewer tasks the quiz gate may need to drop below 80 — a gate above
  80% of the XP before it locks students out (the validator errors).
- Five-ish `check` blocks plus activities in the deck; `check:` is always the
  **last** key on its slide. Slide `icon` names must exist in
  `src/components/notes/layouts/primitives.jsx` (a missing one silently shows Info).
- Wide deck activities need their type in Notes.jsx `SIDE_ACTIVITIES` (your
  `_SIDE@@` marker), or they squeeze the slide at 1280×720.

## 3. Stop after the plan

Before writing any code, write `docs/<y7-math|y7-science>/plans/<UNIT>.md` in the
exemplars' form: objective, classroom twin, the task table (phase · gate · task ·
XP · the thinking only it asks for), then **slide by slide** what is kept, folded,
cut and made interactive, the engine's levels and item types, the arcade level.
Commit it, then **end your turn and ask Mr Bowen to review the plan**. Build only
after he approves; fold his changes into the plan.

## 4. Working in your worktree

- Your session runs in its own git worktree on its own branch. Before the first
  `npm` command, link the main checkout's packages (a junction, not a copy):
  `cmd //c mklink /J node_modules C:\Users\sbowe\Dashboard\node_modules`.
  Before the worktree is removed, delete the junction with
  `cmd //c rmdir node_modules`, never a recursive delete (that follows the link).
- Validate with your own bundle folder, so parallel validates don't collide:
  `VALIDATE_OUT=.validate-<id> npx vite build --config vite.validate.config.js && node .validate-<id>/validate.mjs`
  (`npm run validate` ignores `VALIDATE_OUT` in its second half). Delete the folder after.
- Dev server: add your own entry to this worktree's `.claude/launch.json` on your
  port (`npx vite --port <port> --strictPort`), open the harness
  `preview-y7math.html?unit=<UNIT>` or `preview-y7sci.html?unit=<UNIT>`. Never
  commit `launch.json`. Stop your server before you finish.
- **Own only new files plus your own marker lines** (`@@<ID>_…@@`) in the shared
  files: taskRegistry.js (IMPORT, TASKS), Notes.jsx (SIDE), utils/activity.js
  (ACT_IMPORT, ACT_TYPES, ACT_CHECK), notes/ActivityBlock.jsx (ACT_IMPORT,
  ACT_CASE), scripts/validate-entry.js (IMPORT, CHECK), towerdefense/mathChallenges.js
  (GEN, GEN_MAP, GEN_TRACK), towerdefense/unitDifficulty.js (TD), docs/credits.md
  (CREDITS). Put your code directly under your marker; touch nothing else in those
  files. Don't edit `docs/y7-math-course.md` / `docs/y7-science-course.md`
  (the lead does). Use only your reserved dbKey.
- Name shared-looking exports after your unit (another builder may write
  `checkItems` too).
- Component file before its registry entry; `data.js` last, so the app never
  imports a file that doesn't exist yet.
- Write at most ~250 lines per Write call and commit checkpoints: long single
  writes have stalled agents for 600 s.
- Photos: copy licensed ones to `public/images/<TRACK>/<UNIT>/`, reference with
  `assetUrl(…)`, credit at your marker in `docs/credits.md`. No Learner's Book scans.

## 5. Done means

1. `validate` PASS, `npm run audit:svg <TRACK>` clean for your unit, `npm run lint` clean.
2. Every slide checked at **1280×720 and 375×812, in English and French**: no page
   or inner overflow that hides a Check button, no leaked `**`/`$`, no broken image.
   Measure in the DOM (screenshots time out when the Browser pane is hidden).
3. Every task clicked through once in the harness, the engine at an early and a late level.
4. Narration for your unit only: `PYTHONIOENCODING=utf-8 npm run sync-audio` fills
   only missing files (in your worktree that is just your unit). If Python cannot
   open a script on the long worktree path, copy it to a short folder such as
   `%TEMP%\claude\au\`. Commit the audio.
5. The plan updated to "as built".
6. Everything committed on **your branch**. Do not merge into `main`, push or
   deploy — the lead merges all the branches, adds the classroom back-links and ships.

Your final message: the branch name, the commits, the validate line, what you
verified and how, and anything left open (with the slide or file).
