/**
 * The daily study plan engine — pure functions over the config + progress.
 *
 * Two ideas carry the whole feature:
 *
 * 1. **The plan is derived, not stored.** A date plus `studyPlanConfig.js`
 *    determines the day's two units, so the student screen and the teacher
 *    screen cannot disagree and there is no assignment table to keep in sync.
 *
 * 2. **A day's goal is measured from TODAY's attempts, never from `current`.**
 *    `current` is a lifetime high-water mark; a reviewed unit sits at 100 XP
 *    forever, so any goal built on it would tick itself green every morning.
 *    `progressSchema.js` stamps every attempt with `at`, and everything below
 *    reads that.
 *
 * Nothing here imports React or touches the network.
 */

import { getTrack } from '../data/index';
import { resolveTask } from '../tasks/taskRegistry';
import {
  PROGRAM, WEEK_PATTERN, BENCHMARK, CONTENT_BLUEPRINT, PLAN_TRACKS, SUBJECT_LABEL,
} from './studyPlanConfig';

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

/** Mon–Fri only. Weekends are rest / catch-up, and carry no assignment. */
export const isStudyDay = (iso) => {
  const d = fromDayISO(iso).getDay();
  return d >= 1 && d <= 5;
};

/**
 * How many study days have elapsed since the programme started, counting this
 * one. `null` for weekends and for dates before the start.
 *
 * Counted by walking days rather than by arithmetic on the difference: the walk
 * is obviously correct across DST and month ends, and the block is at most a
 * few hundred days long.
 */
export function studyDayIndex(iso) {
  if (!isStudyDay(iso)) return null;
  if (iso < PROGRAM.startISO) return null;

  let cursor = PROGRAM.startISO;
  let index = 0;
  // Hard stop well past the longest block this is ever configured for.
  for (let guard = 0; guard < 2000; guard += 1) {
    if (cursor === iso) return index;
    if (cursor > iso) return null;
    if (isStudyDay(cursor)) index += 1;
    cursor = addDays(cursor, 1);
  }
  return null;
}

/** Study days in the whole block, so the UI can say "week 3 of 8". */
export const totalStudyDays = () => PROGRAM.weeks * WEEK_PATTERN.length;

// --- rotation ---------------------------------------------------------------

/** How many slots a week gives a track. English 4, Social Studies 3, ... */
export function slotsPerWeek(track) {
  return WEEK_PATTERN.reduce((n, d) => n + d.slots.filter((s) => s === track).length, 0);
}

/** Units a track can actually deal, in id order (the order data/index sorts). */
export function unitsOf(track) {
  return getTrack(track).meta.map((m) => m.id);
}

/**
 * How many times this track has already come up before a given slot, counting
 * from day one of the block.
 *
 * This is the rotation cursor: `cursor % units.length` picks the unit, so a
 * track with 5 units and 4 slots a week walks its whole list every 1.25 weeks
 * and never deals the same unit twice running. Deterministic, which is why
 * yesterday's plan still reads the same today.
 */
function trackCursor(dayIndex, slotIndex, track) {
  const week = Math.floor(dayIndex / WEEK_PATTERN.length);
  const weekday = dayIndex % WEEK_PATTERN.length;
  const perWeek = slotsPerWeek(track);

  let before = week * perWeek;
  for (let d = 0; d < weekday; d += 1) {
    before += WEEK_PATTERN[d].slots.filter((s) => s === track).length;
  }
  before += WEEK_PATTERN[weekday].slots.slice(0, slotIndex).filter((s) => s === track).length;

  // Precession, for the degenerate case where a track's unit count is a whole
  // multiple of its weekly slots — Social Studies has 3 units and 3 slots, so
  // the cursor advances exactly one full cycle a week and every unit welds
  // itself to one weekday forever ("Tuesday is always Reading Sources"). The
  // spacing is fine either way; the problem is that the *pairing* never varies,
  // and a plan that never surprises stops being read. Nudging by the week index
  // keeps the ~7-day gap while rotating which day and which partner it lands on.
  const units = unitsOf(track);
  if (perWeek > 0 && units.length > 0 && units.length % perWeek === 0) {
    before += week;
  }
  return before;
}

/**
 * The day's assignment list. Always returns a shape:
 *   { dateISO, dayName, isStudyDay, dayIndex, weekIndex, assignments[] }
 *
 * An assignment whose track has no units yet comes back with `missing: true`
 * rather than being dropped — a hole in the plan is exactly the signal the
 * teacher screen needs.
 */
export function planForDate(iso) {
  const dayIndex = studyDayIndex(iso);
  const base = {
    dateISO: iso,
    dayName: dayName(iso),
    isStudyDay: isStudyDay(iso),
    beforeStart: iso < PROGRAM.startISO,
    inProgram: dayIndex !== null && dayIndex < totalStudyDays(),
    dayIndex,
    weekIndex: dayIndex === null ? null : Math.floor(dayIndex / WEEK_PATTERN.length),
    assignments: [],
  };
  if (dayIndex === null) return base;

  const weekday = dayIndex % WEEK_PATTERN.length;
  base.assignments = WEEK_PATTERN[weekday].slots.map((track, slotIndex) => {
    const units = unitsOf(track);
    if (units.length === 0) {
      return { slotIndex, track, subject: SUBJECT_LABEL[track] || track, unitId: null, missing: true };
    }
    const unitId = units[trackCursor(dayIndex, slotIndex, track) % units.length];
    const meta = getTrack(track).meta.find((m) => m.id === unitId) || {};
    return {
      slotIndex,
      track,
      subject: SUBJECT_LABEL[track] || track,
      unitId,
      title: meta.title || unitId,
      desc: meta.desc || '',
      missing: false,
    };
  });

  return base;
}

// --- "what happened today" --------------------------------------------------

/**
 * Best XP a task record earned on one calendar day, capped at the task's max.
 *
 * `attempts[].score` is already stored in XP (YearDashboard normalises before
 * saving), so no rescaling is needed here. Records written before the attempt
 * log existed fall back to `updatedAt` + `last`, so an older account still
 * reads sensibly instead of showing a permanent zero.
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

/** Most recent day any task in a unit was touched, or null. */
export function lastTouchedISO(unitScores = {}) {
  let latest = null;
  for (const [key, rec] of Object.entries(unitScores)) {
    if (key === 'strikes' || !rec?.updatedAt) continue;
    const iso = toDayISO(new Date(rec.updatedAt));
    if (!latest || iso > latest) latest = iso;
  }
  return latest;
}

/** The unit's declared tasks, split into the assessment and everything else. */
function unitTasks(unit) {
  const declared = (unit?.phases || []).flatMap((p) => p.tasks || []);
  const resolved = declared.map(resolveTask).filter(Boolean);
  return {
    assessment: resolved.find((t) => t.id === 'ASSESSMENT') || null,
    // A task worth 0 XP is a reward (the arcade), not work. It cannot count
    // toward a practice target it has no way to move.
    practice: resolved.filter((t) => t.id !== 'ASSESSMENT' && t.maxXP > 0),
  };
}

/**
 * Did one assigned unit clear the day's bar?
 *
 * Returns both gates separately so the card can show *which* half is missing —
 * "assessment done, 25 of 40 practice XP" is actionable; a red cross is not.
 */
export function evaluateAssignment(assignment, trackProgress = {}, iso) {
  const unit = assignment.unitId ? getTrack(assignment.track).data?.[assignment.unitId] : null;
  const scores = trackProgress?.[assignment.unitId] || {};

  if (!unit) {
    return { ...assignment, unavailable: true, complete: false, assessment: null, practice: null };
  }

  const { assessment, practice } = unitTasks(unit);

  const assessMax = assessment?.maxXP || 0;
  const assessXP = assessment ? xpOnDay(scores[assessment.dbKey], iso, assessMax) : 0;
  const assessPct = assessMax > 0 ? assessXP / assessMax : 0;
  const assessDone = !!assessment && assessPct >= BENCHMARK.assessmentPct;

  const practiceXP = practice.reduce(
    (sum, t) => sum + xpOnDay(scores[t.dbKey], iso, t.maxXP), 0
  );
  const practiceDone = practiceXP >= BENCHMARK.practiceXP;

  return {
    ...assignment,
    unavailable: false,
    // A unit with no assessment authored yet cannot be held to a gate it has no
    // way to clear, so its practice half stands alone.
    assessment: assessment
      ? { xp: assessXP, max: assessMax, pct: assessPct, done: assessDone, target: BENCHMARK.assessmentPct }
      : null,
    practice: { xp: practiceXP, target: BENCHMARK.practiceXP, done: practiceDone },
    complete: practiceDone && (assessment ? assessDone : true),
    lastTouchedISO: lastTouchedISO(scores),
  };
}

/** The whole day: its assignments, each evaluated, plus a done/total count. */
export function evaluateDay(iso, allProgress = {}) {
  const plan = planForDate(iso);
  const assignments = plan.assignments.map((a) =>
    evaluateAssignment(a, allProgress[a.track] || {}, iso)
  );
  const done = assignments.filter((a) => a.complete).length;
  return {
    ...plan,
    assignments,
    done,
    total: assignments.length,
    complete: assignments.length > 0 && done === assignments.length,
  };
}

/** The five study dates of the plan week containing `iso` (Mon–Fri). */
export function weekOf(iso) {
  const d = fromDayISO(iso);
  const shift = (d.getDay() + 6) % 7; // Monday = 0
  const monday = addDays(iso, -shift);
  return WEEK_PATTERN.map((_, i) => addDays(monday, i));
}

/**
 * Consecutive study days fully cleared, walking backwards.
 *
 * Today only breaks the streak once it is over — an unfinished today is "not
 * yet", not a miss — so the count starts at yesterday unless today is already
 * complete. Weekends are skipped rather than counted as misses.
 */
export function computeStreak(allProgress, iso = todayISO()) {
  let streak = 0;

  if (isStudyDay(iso) && evaluateDay(iso, allProgress).complete) streak += 1;

  let cursor = addDays(iso, -1);
  for (let guard = 0; guard < 400; guard += 1) {
    if (cursor < PROGRAM.startISO) break;
    if (isStudyDay(cursor)) {
      if (!evaluateDay(cursor, allProgress).complete) break;
      streak += 1;
    }
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/**
 * Study days in the current week that were assigned but not cleared, and are
 * now in the past. This is the weekend catch-up list.
 */
export function missedThisWeek(allProgress, iso = todayISO()) {
  return weekOf(iso)
    .filter((d) => d < iso && d >= PROGRAM.startISO)
    .map((d) => evaluateDay(d, allProgress))
    .filter((day) => day.total > 0 && !day.complete);
}

// --- the teacher's view: what is left, and what is missing ------------------

/**
 * Per track: what exists, what the blueprint still wants, and how hard the
 * rotation is leaning on the units that do exist.
 *
 * `repeatDays` is the honest number behind "we need to make more": with one
 * Science unit and one Science slot a week, SCI_0A comes back every 7 days and
 * the review stops being a review.
 */
export function coverageReport(allProgress = {}) {
  return PLAN_TRACKS.map((track) => {
    const built = unitsOf(track);
    const blueprint = CONTENT_BLUEPRINT[track] || [];
    const builtSet = new Set(built);

    const missing = blueprint.filter((m) => !builtSet.has(m.id));
    const perWeek = slotsPerWeek(track);
    // Study days between two sightings of the same unit -> calendar days.
    const repeatDays = perWeek > 0 && built.length > 0
      ? Math.round((built.length / perWeek) * 7 * 10) / 10
      : null;

    const trackProgress = allProgress[track] || {};
    const units = built.map((id) => {
      const scores = trackProgress[id] || {};
      const meta = getTrack(track).meta.find((m) => m.id === id) || {};
      return { id, title: meta.title || id, lastTouchedISO: lastTouchedISO(scores) };
    });

    return {
      track,
      subject: SUBJECT_LABEL[track] || track,
      built,
      units,
      blueprintTotal: blueprint.length,
      builtCount: built.length,
      missing,
      slotsPerWeek: perWeek,
      repeatDays,
      // A unit seen more often than once a week is being drilled, not reviewed.
      strained: repeatDays !== null && repeatDays < 7,
    };
  });
}

/**
 * What to author next, ranked.
 *
 * Ordered by how badly the rotation is repeating itself (a track that recycles
 * every 7 days needs a unit more than one that recycles every 11), then by the
 * blueprint's own `critical` flag, then by how many slots a week the subject
 * takes. Purely advisory — it prints a build queue, it does not gate anything.
 */
export function buildQueue(report) {
  const rows = [];
  for (const t of report || coverageReport()) {
    for (const m of t.missing) {
      rows.push({
        ...m,
        track: t.track,
        subject: t.subject,
        repeatDays: t.repeatDays,
        slotsPerWeek: t.slotsPerWeek,
        strained: t.strained,
      });
    }
  }
  return rows.sort((a, b) => {
    const strain = (a.repeatDays ?? 99) - (b.repeatDays ?? 99);
    if (strain !== 0) return strain;
    if (!!b.critical !== !!a.critical) return b.critical ? 1 : -1;
    return b.slotsPerWeek - a.slotsPerWeek;
  });
}

/**
 * Units the student has never finished (lifetime XP under 100), per track.
 * The plan is a review cycle, so anything still unfinished is a genuine hole
 * rather than something the rotation will get to eventually.
 *
 * `unitXPOf` is injected rather than imported so this module stays free of the
 * task registry's lazily-loaded React components in any consumer that only
 * wants the dates.
 */
export function unfinishedUnits(allProgress, unitXPOf) {
  const rows = [];
  for (const track of PLAN_TRACKS) {
    const { meta, data } = getTrack(track);
    for (const m of meta) {
      const scores = (allProgress?.[track] || {})[m.id] || {};
      const xp = unitXPOf(data[m.id], scores);
      if (xp < 100) {
        rows.push({ track, subject: SUBJECT_LABEL[track] || track, id: m.id, title: m.title, xp });
      }
    }
  }
  return rows.sort((a, b) => b.xp - a.xp);
}
