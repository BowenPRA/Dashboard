# The Daily Plan

**What it is:** the app assigns two units a day, Monday to Friday, and decides whether the
day's bar was cleared. It is the review-block successor to the day-by-day grid in
[GED-SPRINT.md](GED-SPRINT.md) §6 — that grid was a *shipping* schedule for authoring
units; this is a *study* schedule over the units that exist.

**The situation it was built for:** the student has passed his GED practice mock tests
across all four subjects. The next month or two is not new learning, it is keeping four
subjects warm and spaced until the real sittings. So the plan cycles the built units rather
than marching through them once.

---

## 1. The shape

| | |
|---|---|
| Days | Monday–Friday. Saturday and Sunday are rest / catch-up |
| Load | 2 units a day, 10 slots a week |
| Mix | **English 4 · Social Studies 3 · Math 2 · Science 1** |
| Bar | Assessment ≥ 70% **and** 40 XP of practice — **both on the same day** |
| Block | 8 weeks from the configured start date |

The mix follows the teacher's risk order (English ≫ Social Studies > Math > Science), the
same order [GED-SPRINT.md](GED-SPRINT.md) §1 records.

Two rules hold in the weekday pattern, and both matter more than they look:

- **No subject appears twice in one day.** Interleaving two subjects is what makes the
  recall effortful; two English units back to back is one long English session in a costume.
- **Each day pairs a reading-heavy subject with a lighter one**, so no day is two hours of
  dense prose for an ESL reader.

---

## 2. The one idea that makes it work

**A day's goal is measured from that day's attempts — never from `current`.**

`progress[track][unit][dbKey].current` is a lifetime high-water mark. A unit that has been
reviewed once sits at 100 XP forever, so any goal built on `current` would tick itself green
every morning and measure nothing. This is the exact trap a review-cycle plan walks into,
because by design it re-assigns units that are already finished.

`progressSchema.js` stamps every attempt with `at`, and `xpOnDay()` reads that:

- best attempt **logged today**, capped at the task's max XP;
- records predating the attempt log fall back to `updatedAt` + `last`, so an older account
  reads sensibly rather than showing a permanent zero;
- a unit maxed out yesterday reads **0** today. That is the point.

Redoing a task and scoring worse still counts *that* score for the day, not the old best —
`current` is untouched, so no phase ever re-locks.

---

## 3. How a day's two units are chosen

The plan is **derived, never stored**. A date plus `src/utils/studyPlanConfig.js` determines
the day's units, so there is no assignment table to keep in sync, the student screen and the
teacher screen cannot disagree, and yesterday's plan still reads the same today.

Each track walks its own unit list in order. A rotation cursor counts how many times that
track has come up since day one; `cursor % units.length` picks the unit. The gap between two
sightings of the same unit is therefore as wide as the built content allows:

| Subject | Units built | Slots/week | A unit returns every |
|---|---|---|---|
| English | 5 | 4 | ~8.8 days |
| Social Studies | 3 | 3 | 7 days |
| Math | 3 | 2 | ~10.5 days |
| Science | **1** | 1 | **7 days** |

### The precession rule

When a track's unit count is a whole multiple of its weekly slots, the cursor advances
exactly one full cycle per week and every unit welds itself to one weekday forever —
"Tuesday is always Reading Sources". Social Studies (3 units, 3 slots) hits this exactly.
The spacing is fine either way; the problem is that the *pairing* never varies, and a plan
that never surprises stops being read. So in that case the cursor is nudged by the week
index, which keeps the ~7-day gap while rotating which day and which partner it lands on.

---

## 4. The surfaces

| Route | Who | What |
|---|---|---|
| `/today` | Student | The day's two units, each with its two goals as progress bars; the Mon–Fri strip; the streak; a weekend catch-up list |
| `/home` | Student | A "Today's Plan" banner above the track grid — the intended way in |
| `/<TRACK>?unit=<ID>` | Student | Deep link: expands and scrolls to that unit. This is what a plan card's **Start** does |
| `/study-plan` | Teacher | Coverage vs. blueprint, rotation load, the ranked build queue, unfinished units, and the next 4 weeks of rotation |

`/study-plan` is teacher-gated by the same `TeacherRoute` as the roster.

---

## 5. What still needs authoring

`/study-plan` answers this live rather than from a list that goes stale: it diffs the
blueprint in `studyPlanConfig.js` (lifted from [GED-SPRINT.md](GED-SPRINT.md) §6) against
the units actually on disk, and ranks what is missing by **rotation strain** — how hard the
plan is being forced to repeat itself — then by the blueprint's own `critical` flag, then by
how many slots a week the subject takes.

**Science is the pressure point: 1 unit built of 6.** With one slot a week and one unit,
`SCI_0A` comes back every 7 days and Science stops being a review at all. Social Studies is
tied on strain (7 days) but carries 3× the weekly slots and holds Civics, which is 50% of
that test — which is why the queue currently reads
`HIST_2A → HIST_2B → HIST_3A → HIST_4A → SCI_1A`.

Every unit authored anywhere in the four GED tracks widens the rotation automatically. There
is no list to update.

---

## 6. Changing the plan

Everything is in **`src/utils/studyPlanConfig.js`** — the weekday pattern and subject mix,
the daily bar, the block start date and length, the blueprint, and the subject labels. Edit
that file and every screen follows it. There is no migration, because nothing is stored.

Common edits:

- **Different mix** — change `WEEK_PATTERN`. Keep the no-repeated-subject and
  heavy+light rules above.
- **Softer bar** — lower `BENCHMARK.practiceXP`, or drop `assessmentPct` toward 0.6.
  Setting `practiceXP: 0` makes the assessment the only gate.
- **Six-day week** — add a Saturday entry to `WEEK_PATTERN`. `weekOf()` and the week strip
  size themselves from the pattern's length.
- **New block** — move `PROGRAM.startISO` (must be a Monday) and `PROGRAM.weeks`.

## 7. Checking it

`preview-plan.html` (→ `src/preview-plan.jsx`) mounts the real `PlanScreen` and the real
engine against a synthesised progress blob, so the rotation, the weighting, the repeat
intervals and each benchmark state can be stepped through without a Supabase session. It
prints the weekly mix and per-track strain above the screen. Dev-only; not in the
production build.
