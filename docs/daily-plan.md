# The Daily Plan

**What it is:** the app looks at every unit the student has not finished, deals the next
three each day, and counts how many get finished. The goal is two a day; the third is a
bonus. It replaced the fixed two-a-day review rotation on 2026-10-02.

**Why it changed:** the rotation picked units from the calendar — a date decided the day's
two units, whatever the student had or had not done. It never looked at what was still
unfinished, and a missed day simply went by. In practice it was not followed: by the time it
was replaced, 17 of 31 GED units were started and only 3 finished. The plan now starts from
the work that exists and carries anything unfinished forward.

---

## 1. The shape

| | |
|---|---|
| Days | Monday–Friday carry a goal. Weekends are free; work done then still counts |
| Goal | **2 units finished** a day |
| List | **3 units offered** a day — the third is the bonus, and first in line tomorrow if it is not done |
| Week | 10 units (goal × 5), weekends included in the running total |
| Finished means | 100 XP, or 80 XP with the quiz sat — `taskRegistry.isUnitComplete`, the same rule as everywhere else in the app |
| Counts toward the day | **Any** unit finished that day, on the list or not |

---

## 2. Which units, in what order

The **backlog** is every unit in the plan's tracks that is not finished. Each day's list is
the front of that queue:

1. **Started units first, nearest to finished first.** A half-done unit is the cheapest
   unit to finish, and a plan that keeps opening new units over a pile of half-done ones
   never gets anything counted.
2. **Then untouched units, in course order.** Ids sort numerically here (`ENG_3` before
   `ENG_10`), unlike the track page.
3. **Subjects are mixed in proportion to what each has left** (smooth weighted
   round-robin, within each of the two groups above). A subject with eight units left
   against another's four comes up twice as often, and they all run out at about the same
   time rather than leaving one subject to finish alone.

---

## 3. The idea that makes it work

**The plan is derived, never stored.** There is no assignment table. Every attempt in
`students.progress` carries a timestamp (`attempts[].at`), so a unit's history can be
replayed — `unitTimeline()` in `studyPlan.js` — to answer two questions for any date:

- **What was its XP at midnight?** That decides the day's list. The list is dealt from
  where each unit stood at the *start* of the day, so it does not reshuffle while the
  student works through it, and a unit finished at 10am stays on the list, ticked.
- **On which day did it cross the finish line?** That is the day it counts for. It is how
  the week strip, the streak and the teacher's day-by-day record are filled in — including
  for days before this plan existed.

Two edges, handled on purpose:

- **Undated work** — records with no attempts and no `updatedAt` (set by a teacher, or
  written before attempts were logged) — is treated as having always been there. It counts
  toward the unit, and toward no particular day.
- **Checkpoint saves** raise `current` without logging an attempt. That XP is dated by the
  record's `updatedAt`.

The replay always ends exactly where the live rule does (`unitXPOf` / `isUnitComplete`); the
dev harness checks this on every unit.

---

## 4. What is tracked

| | |
|---|---|
| Today | units finished against the goal of 2, and the bonus third |
| This week | a cell per study day (green = goal hit, amber = short, rose = nothing), and the total out of 10 |
| Streak | study days in a row with the goal hit. An unfinished today is "not yet", not a miss |
| Days on goal | goal hit on *n* of *m* study days since `PLAN.startISO` |
| Overall | units finished out of all, per subject, and the date the backlog runs out at 2 a day and at 3 |

`PLAN.startISO` only decides where the streak and the days-on-goal tally begin, so the days
before the plan existed are not scored as misses. The plan itself is live on any date.

---

## 5. When everything is finished

Once the backlog is shorter than the day's list, the list is topped up with **review**:
finished units, the one left longest first. A review counts for the day when its quiz is
re-sat that day at 70% or better (`REVIEW.quizPct`).

Reviews only count on a day the list had room for them, and only as many as there was room
for. Otherwise re-sitting an easy quiz would be a way to hit the goal without touching the
work still owed.

New units published in the plan's tracks join the backlog automatically.

---

## 6. The surfaces

| Route | Who | What |
|---|---|---|
| `/today` | Student | The day's goal, the week, the three units with their XP and next step, what is coming up, and overall progress with the finish date |
| `/home` | Student | A "Today's Plan" banner above the track grid: today's count and the subjects still on the list |
| `/<TRACK>?unit=<ID>` | Student | Deep link: expands and scrolls to that unit. This is what a list card's button does |
| `/study-plan` | Teacher | The headline numbers, today's list as the student sees it, progress by subject, the last 14 days day by day, and every unfinished unit laid over the coming study days |

`/study-plan` is teacher-gated by the same `TeacherRoute` as the roster. Its schedule is a
projection at goal pace — the real list is re-dealt each morning from what got done.

Who sees the plan: `src/utils/studyPlanAccess.js` (an email allowlist, or
`app_metadata.study_plan`, which a class can switch on). Everyone else sees no banner, and
`/today` sends them home.

The arcade's questions follow the day's list (`src/arcade/questionSource.js`).

---

## 7. Changing the plan

Everything is in **`src/utils/studyPlanConfig.js`**. Edit it and every screen follows.
There is no migration, because nothing is stored.

- **Different pace** — `PLAN.goal` (units to finish) and `PLAN.stretch` (units offered).
- **Six-day week** — add `6` to `PLAN.studyWeekdays`. The week strip and the weekly target
  size themselves from it.
- **Other tracks** — `PLAN_TRACKS` and `SUBJECT_LABEL`.
- **Restart the tally** — move `PLAN.startISO`.
- **Stricter review** — `REVIEW.quizPct`.

## 8. Checking it

`preview-plan.html` (→ `src/preview-plan.jsx`) mounts the real student screen, the real
teacher report and the real engine against a synthesised progress blob: nothing done, mid-way,
one / two / three finished today, a missed day, the review tail, and everything finished. It
steps through dates, and prints the morning's queue and whether the replay agrees with the
live rule. Dev-only; not in the production build.

To look at a real student, put their progress in `src/preview-plan-real.json.local` as
`{ "<name>": <progress> }`. `*.local` is gitignored, so it never reaches the repo.
