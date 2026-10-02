/**
 * The daily study plan engine — pure functions over the config + progress.
 *
 * Three ideas carry the whole feature:
 *
 * 1. **The plan is the backlog.** Every unit in the plan's tracks that the
 *    student has not finished (`taskRegistry.isUnitComplete` — 100 XP, or 80+
 *    with the quiz sat) is work still owed. Each day the plan deals the next few
 *    from the front of that queue: units already started come first, nearest to
 *    finished first, then untouched units in course order, with the subjects
 *    mixed in proportion to how much each has left.
 *
 * 2. **The plan is derived, not stored.** Progress records carry a timestamp on
 *    every attempt, so a unit's history can be replayed: what its XP was at any
 *    midnight, and on which day it crossed the finish line. That is enough to
 *    rebuild any day — what was on the list that morning, what got finished —
 *    without an assignment table. A day's list is dealt from the state at the
 *    START of that day, so it holds still while the student works through it.
 *
 * 3. **A day is measured by units finished that day.** Any unit that crosses
 *    the line counts, whether or not it was on the list — the list is a
 *    recommendation, the goal is the count.
 *
 * Nothing here imports React or touches the network.
 */

import { getTrack } from '../data/index';
import { resolveTask, resolveUnitTasks, completeMinXPOf } from '../tasks/taskRegistry';
import { suggestNextTask } from './nextTask';
import { PLAN, REVIEW, PLAN_TRACKS, SUBJECT_LABEL } from './studyPlanConfig';

// --- dates ------------------------------------------------------------------
// Everything is keyed by a LOCAL calendar day string. The student's "today" is
// the day on his wall, not UTC's — a 9pm session in Vietnam must not land on
// tomorrow's card.

/** `Date` -> local `YYYY-MM-DD`. */
export function toDayISO(date) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** `YYYY-MM-DD` -> local midnight `Date`. */
export function fromDayISO(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export const todayISO = () => toDayISO(new Date());

export function addDays(iso, n) {
  const d = fromDayISO(iso);
  d.setDate(d.getDate() + n);
  return toDayISO(d);
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayName = (iso) => DAY_NAMES[fromDayISO(iso).getDay()];

/** A day that carries a goal. Weekends are free: work done then still counts. */
export const isStudyDay = (iso) => PLAN.studyWeekdays.includes(fromDayISO(iso).getDay());

export function nextStudyDay(iso) {
  let cursor = addDays(iso, 1);
  for (let guard = 0; guard < 14 && !isStudyDay(cursor); guard += 1) cursor = addDays(cursor, 1);
  return cursor;
}

/** All seven dates, Monday first, of the week containing `iso`. */
function fullWeekOf(iso) {
  const shift = (fromDayISO(iso).getDay() + 6) % 7; // Monday = 0
  const monday = addDays(iso, -shift);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

/** The study dates of the week containing `iso`. */
export const weekOf = (iso) => fullWeekOf(iso).filter(isStudyDay);

/** Local midnight at the start of a day, in ms — the cut between two days. */
const dayStart = (iso) => fromDayISO(iso).getTime();

// --- replaying a unit -------------------------------------------------------

/**
 * A unit's history, replayed from its attempt log: one entry per moment its XP
 * could have changed, oldest first, each `{ t, xp, complete }`.
 *
 * `t` is ms, or `-Infinity` for work that carries no date (records written
 * before attempts were logged, or set by a teacher) — that work is treated as
 * having always been there, which is the honest reading of "we cannot say when".
 *
 * The last entry always agrees with the live rule (`unitXPOf` /
 * `isUnitComplete`), because every score is capped the same way and anything
 * `current` holds beyond the logged attempts is added as one more entry:
 *   - a checkpoint save raises `current` without logging an attempt, so that
 *     XP is dated by the record's `updatedAt`;
 *   - a teacher lowering `current` caps every older attempt at the new value.
 */
export function unitTimeline(unit, scores = {}) {
  const tasks = (unit?.phases || []).flatMap((p) => p.tasks || []).map(resolveTask).filter(Boolean);
  const quizKey = tasks.find((t) => t.id === 'ASSESSMENT' && t.maxXP > 0)?.dbKey || null;
  const minXP = completeMinXPOf(unit);

  const events = [];
  for (const task of tasks) {
    const rec = scores?.[task.dbKey];
    if (!rec || typeof rec !== 'object') continue;

    const cap = Math.min(Number(rec.current) || 0, task.maxXP);
    const attempts = Array.isArray(rec.attempts) ? rec.attempts : [];
    let logged = 0;
    for (const a of attempts) {
      const t = Date.parse(a?.at);
      const score = Math.min(Number(a?.score) || 0, cap);
      logged = Math.max(logged, score);
      events.push({ t: Number.isNaN(t) ? -Infinity : t, key: task.dbKey, score });
    }
    if (cap > logged) {
      const t = Date.parse(rec.updatedAt);
      events.push({ t: Number.isNaN(t) ? -Infinity : t, key: task.dbKey, score: cap });
    }
  }
  events.sort((a, b) => (a.t === b.t ? 0 : a.t < b.t ? -1 : 1));

  const best = {};
  let sum = 0;
  // A unit with no quiz (the Extended Response) finishes on the XP alone.
  let quizSat = !quizKey;
  return events.map((e) => {
    const had = best[e.key] || 0;
    if (e.score > had) {
      sum += e.score - had;
      best[e.key] = e.score;
    }
    if (e.key === quizKey) quizSat = true;
    const xp = Math.min(sum, 100);
    return { t: e.t, xp, complete: xp >= 100 || (xp >= minXP && quizSat) };
  });
}

/** Where a unit stood just before `cutoff` (ms): `{ xp, complete, t }`. */
function stateBefore(timeline, cutoff) {
  let at = { xp: 0, complete: false, t: -Infinity };
  for (const e of timeline) {
    if (e.t >= cutoff) break;
    at = e;
  }
  return at;
}

/** The day a timeline entry belongs to; `''` (before every date) if undated. */
const dayOfMs = (t) => (t === -Infinity ? '' : toDayISO(new Date(t)));

/**
 * Best XP a task record earned on one calendar day, capped at the task's max.
 * Only the review tail reads this — a unit being reviewed is already finished,
 * so its lifetime `current` says nothing about what was done today.
 */
export function xpOnDay(record, iso, cap = Infinity) {
  if (!record) return 0;

  let best = 0;
  if (Array.isArray(record.attempts) && record.attempts.length) {
    for (const a of record.attempts) {
      if (a?.at && toDayISO(new Date(a.at)) === iso) best = Math.max(best, Number(a.score) || 0);
    }
    return Math.min(best, cap);
  }

  if (record.updatedAt && toDayISO(new Date(record.updatedAt)) === iso) {
    best = Number(record.last ?? record.current) || 0;
  }
  return Math.min(best, cap);
}

// --- the state everything else reads ----------------------------------------

/**
 * Every unit in the plan's tracks, with its history replayed:
 *   { track, subject, unitId, title, order, unit, scores, timeline, quiz,
 *     minXP, xp, complete, completedOn }
 *
 * `completedOn` is the local day the unit first counted as finished — `''` if
 * it was finished before attempts were dated, `null` if it is not finished.
 *
 * `order` is the unit's place in its course. Ids sort numerically here
 * (`ENG_3` before `ENG_10`), unlike the track page's plain sort, because this
 * order decides what a student is handed next.
 */
export function planState(allProgress = {}) {
  const units = [];
  for (const track of PLAN_TRACKS) {
    const { meta, data } = getTrack(track);
    const inOrder = [...meta].sort((a, b) =>
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true })
    );
    inOrder.forEach((m, order) => {
      const unit = data[m.id];
      const scores = allProgress?.[track]?.[m.id] || {};
      const timeline = unitTimeline(unit, scores);
      const last = timeline[timeline.length - 1];
      const finish = timeline.find((e) => e.complete);
      const quiz = (unit?.phases || []).flatMap((p) => p.tasks || []).map(resolveTask)
        .find((t) => t?.id === 'ASSESSMENT' && t.maxXP > 0);
      units.push({
        track,
        subject: SUBJECT_LABEL[track] || track,
        unitId: m.id,
        title: m.title || m.id,
        order,
        unit,
        scores,
        timeline,
        quiz: quiz ? { dbKey: quiz.dbKey, maxXP: quiz.maxXP } : null,
        minXP: completeMinXPOf(unit),
        xp: last?.xp || 0,
        complete: !!finish,
        completedOn: finish ? dayOfMs(finish.t) : null,
      });
    });
  }
  return { units };
}

// --- the queue --------------------------------------------------------------

/**
 * Deals rows out of per-subject lanes so the subjects come up in proportion to
 * how much each has — smooth weighted round-robin. A subject with 8 units left
 * against another's 4 appears twice as often, and never in a block: the lanes
 * all run dry together, so no subject is left to finish alone at the end.
 */
function interleave(rows, compare) {
  const lanes = PLAN_TRACKS
    .map((track) => rows.filter((r) => r.track === track).sort(compare))
    .filter((lane) => lane.length > 0);
  const weights = lanes.map((lane) => lane.length);
  const total = weights.reduce((a, b) => a + b, 0);
  const credit = lanes.map(() => 0);

  const out = [];
  while (out.length < total) {
    let pick = -1;
    for (let i = 0; i < lanes.length; i += 1) {
      if (lanes[i].length === 0) continue;
      credit[i] += weights[i];
      if (pick === -1 || credit[i] > credit[pick]) pick = i;
    }
    credit[pick] -= total;
    out.push(lanes[pick].shift());
  }
  return out;
}

/**
 * Everything still unfinished at the start of `iso`, in the order the plan
 * hands it out. Each row gains `startXP`, its XP that morning.
 *
 * Started units come first — closest to finished first — because a half-done
 * unit is the cheapest unit to finish, and a plan that keeps opening new units
 * over a pile of half-done ones never gets anything counted. Untouched units
 * follow in course order.
 *
 * Built only from the state before that day's midnight, so the order cannot
 * shift under the student while they work.
 */
export function queueAt(state, iso) {
  const cutoff = dayStart(iso);
  const open = [];
  for (const u of state.units) {
    const before = stateBefore(u.timeline, cutoff);
    if (!before.complete) open.push({ ...u, startXP: before.xp });
  }
  return [
    ...interleave(open.filter((u) => u.startXP > 0), (a, b) => b.startXP - a.startXP || a.order - b.order),
    ...interleave(open.filter((u) => u.startXP <= 0), (a, b) => a.order - b.order),
  ];
}

/** Did a finished unit's quiz get re-sat on `iso`, at the review mark or better? */
function reviewedOn(u, iso) {
  if (!u.quiz) return false;
  return xpOnDay(u.scores[u.quiz.dbKey], iso, u.quiz.maxXP) / u.quiz.maxXP >= REVIEW.quizPct;
}

/** How many units the plan lists after the day's own, as "coming up". */
const UP_NEXT = 4;

/**
 * The day's list: `{ picks, upNext }`.
 *
 * `picks` is the front `PLAN.stretch` of the queue (`kind: 'finish'`). Once the
 * queue is shorter than that — nearly everything is finished — the list is
 * topped up with finished units to keep warm (`kind: 'review'`), the one left
 * longest first.
 */
export function picksFor(state, iso) {
  const cutoff = dayStart(iso);
  const queue = queueAt(state, iso);
  const picks = queue.slice(0, PLAN.stretch).map((u) => ({ ...u, kind: 'finish' }));

  if (picks.length < PLAN.stretch) {
    const trackRank = (u) => PLAN_TRACKS.indexOf(u.track);
    const reviews = state.units
      .filter((u) => u.quiz && stateBefore(u.timeline, cutoff).complete)
      .map((u) => ({ ...u, kind: 'review', startXP: u.xp, lastTouched: stateBefore(u.timeline, cutoff).t }))
      // -Infinity minus -Infinity is NaN, which falls through to the next key.
      .sort((a, b) => (a.lastTouched - b.lastTouched) || (trackRank(a) - trackRank(b)) || (a.order - b.order));
    picks.push(...reviews.slice(0, PLAN.stretch - picks.length));
  }

  return { picks, upNext: queue.slice(PLAN.stretch, PLAN.stretch + UP_NEXT) };
}

// --- measuring a day --------------------------------------------------------

/**
 * What one day amounted to:
 *   { iso, isStudyDay, finished[], reviewed[], count, goal, goalHit, stretchHit }
 *
 * `finished` is every unit that crossed the line that day. Reviews only count
 * on a day the list had room for them (the backlog was shorter than the list),
 * and only as many as there was room for — otherwise re-sitting an easy quiz
 * would be a way to hit the goal without touching the work still owed.
 */
export function dayTally(state, iso) {
  const cutoff = dayStart(iso);
  const finished = state.units.filter((u) => u.completedOn === iso);

  const doneBefore = state.units.filter((u) => stateBefore(u.timeline, cutoff).complete);
  const reviewSlots = Math.max(0, PLAN.stretch - (state.units.length - doneBefore.length));
  const reviewed = reviewSlots > 0
    ? doneBefore.filter((u) => reviewedOn(u, iso)).slice(0, reviewSlots)
    : [];

  const count = finished.length + reviewed.length;
  const study = isStudyDay(iso);
  const goal = study ? PLAN.goal : 0;
  return {
    iso,
    isStudyDay: study,
    finished,
    reviewed,
    count,
    goal,
    goalHit: study && count >= goal,
    stretchHit: count >= PLAN.stretch,
  };
}

/**
 * Consecutive study days on which the goal was hit, walking backwards.
 *
 * Today only breaks the streak once it is over — an unfinished today is "not
 * yet", not a miss — so it adds to the count when hit and is skipped when not.
 * Weekends are skipped, and the walk stops at the day the plan began.
 */
export function streakOf(state, iso = todayISO()) {
  let streak = dayTally(state, iso).goalHit ? 1 : 0;

  let cursor = addDays(iso, -1);
  for (let guard = 0; guard < 400 && cursor >= PLAN.startISO; guard += 1) {
    if (isStudyDay(cursor)) {
      if (!dayTally(state, cursor).goalHit) break;
      streak += 1;
    }
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/**
 * Every day from `fromISO` to `toISO` that either carried a goal or had work
 * finished on it, oldest first, each a `dayTally`.
 */
export function history(state, fromISO, toISO) {
  const days = [];
  let cursor = fromISO;
  for (let guard = 0; guard < 400 && cursor <= toISO; guard += 1) {
    const tally = dayTally(state, cursor);
    if (tally.isStudyDay || tally.count > 0) days.push(tally);
    cursor = addDays(cursor, 1);
  }
  return days;
}

/**
 * The day the backlog runs out at `pace` units a study day, or null if there
 * is none. Today only has the room its pace has not already used.
 */
function finishDate(remaining, pace, iso, doneToday) {
  if (remaining <= 0 || pace <= 0) return null;
  const roomToday = isStudyDay(iso) ? Math.max(0, pace - doneToday) : 0;
  if (remaining <= roomToday) return iso;

  let cursor = nextStudyDay(iso);
  for (let left = remaining - roomToday - pace; left > 0; left -= pace) cursor = nextStudyDay(cursor);
  return cursor;
}

/**
 * The backlog laid out over the coming study days at goal pace:
 *   [{ iso, units[] }]
 *
 * A projection, not a promise: the real list is re-dealt every morning from
 * what actually got done, so a slow day pushes everything back and a unit
 * opened out of turn moves up.
 */
export function forecast(state, iso = todayISO(), maxDays = 60) {
  const left = queueAt(state, iso).filter((u) => !u.complete);
  const out = [];

  let cursor = iso;
  let room = isStudyDay(iso) ? Math.max(0, PLAN.goal - dayTally(state, iso).count) : 0;
  if (room === 0) {
    cursor = nextStudyDay(iso);
    room = PLAN.goal;
  }
  for (let i = 0; i < left.length && out.length < maxDays; ) {
    out.push({ iso: cursor, units: left.slice(i, i + room) });
    i += room;
    cursor = nextStudyDay(cursor);
    room = PLAN.goal;
  }
  return out;
}

// --- one call for a whole screen --------------------------------------------

/** A pick, plus how it stands right now and the next thing to do in it. */
function withStatus(u, iso) {
  if (u.kind === 'review') {
    const pct = xpOnDay(u.scores[u.quiz.dbKey], iso, u.quiz.maxXP) / u.quiz.maxXP;
    return { ...u, quizPct: pct, doneToday: pct >= REVIEW.quizPct, next: null };
  }
  const step = u.complete
    ? null
    : suggestNextTask(u.unit, u.scores, resolveUnitTasks(u.unit, u.xp, u.scores), u.xp);
  return {
    ...u,
    doneToday: u.complete,
    next: step ? { label: step.task.label, note: step.note } : null,
  };
}

/**
 * Everything a plan screen shows for one student on one day.
 *
 *   picks, upNext   the day's list and what follows it
 *   today           the day's tally (count, goal, goalHit, ...)
 *   week            a tally per study day of this week
 *   weekCount       units counted this week so far, weekends included
 *   weekTarget      goal x study days
 *   streak          consecutive study days on goal
 *   onTarget        { hit, of } — study days on goal since the plan began
 *   pace            units a day over the last five study days, or null
 *   totals          { done, total, remaining, byTrack[] }
 *   finishAt        { goal, stretch } — the day the backlog runs out at each pace
 */
export function planSummary(allProgress = {}, iso = todayISO()) {
  const state = planState(allProgress);
  const { picks, upNext } = picksFor(state, iso);
  const today = dayTally(state, iso);

  const week = weekOf(iso).map((d) => dayTally(state, d));
  const weekCount = fullWeekOf(iso)
    .filter((d) => d <= iso)
    .reduce((n, d) => n + dayTally(state, d).count, 0);

  // Study days since the plan began. Today is left out until it is hit, for
  // the same reason it cannot break the streak.
  const scored = history(state, PLAN.startISO, iso)
    .filter((d) => d.isStudyDay && (d.iso < iso || d.goalHit));
  const recent = scored.filter((d) => d.iso < iso).slice(-5);

  const done = state.units.filter((u) => u.complete).length;
  const remaining = state.units.length - done;

  return {
    iso,
    state,
    picks: picks.map((u) => withStatus(u, iso)),
    upNext,
    today,
    week,
    weekCount,
    weekTarget: PLAN.goal * weekOf(iso).length,
    streak: streakOf(state, iso),
    onTarget: { hit: scored.filter((d) => d.goalHit).length, of: scored.length },
    pace: recent.length ? recent.reduce((n, d) => n + d.count, 0) / recent.length : null,
    totals: {
      done,
      total: state.units.length,
      remaining,
      byTrack: PLAN_TRACKS.map((track) => {
        const mine = state.units.filter((u) => u.track === track);
        return {
          track,
          subject: SUBJECT_LABEL[track] || track,
          done: mine.filter((u) => u.complete).length,
          total: mine.length,
        };
      }),
    },
    finishAt: {
      goal: finishDate(remaining, PLAN.goal, iso, today.count),
      stretch: finishDate(remaining, PLAN.stretch, iso, today.count),
    },
  };
}
