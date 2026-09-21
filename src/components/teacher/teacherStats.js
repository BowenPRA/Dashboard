// Small pure helpers behind the teacher views. A roster row is what the
// backend's getRoster returns:
//
//   { id, name, pra_id, class_id, current_track,
//     total_xp, units_completed, is_locked, last_active,
//     units:  { [track]: { [unitId]: [xp, lastTouchedISO | null] } },
//     recent: [{ at, track, unit, key, score }] }   // last 14 days, newest first
//
// `units` and `recent` are newer than the rest, so everything here treats them
// as optional — an older backend simply shows less, it never breaks the page.

/** A student counts as "inactive" once this many days pass with no work. */
export const INACTIVE_DAYS = 7;

/** A gradebook cell is marked "recent" when touched within this many days. */
export const RECENT_DAYS = 7;

const dayMs = 86400000;

export const daysSince = (iso) => (iso ? (Date.now() - new Date(iso).getTime()) / dayMs : Infinity);

// Calendar days, not elapsed hours: 9pm last night is "Yesterday" at 8am, even
// though fewer than 24 hours have passed.
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
const calendarDaysAgo = (iso) => Math.round((startOfDay(new Date()) - startOfDay(new Date(iso))) / dayMs);

export function relTime(iso) {
  if (!iso) return 'Never';
  const days = calendarDaysAgo(iso);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/**
 * Events per calendar day for the last `days` days, OLDEST FIRST (so the last
 * entry is today). Bucketed here, in the teacher's timezone, from the raw
 * timestamps — see computeDetail in the backend for why.
 */
export function activityDays(recent, days = 14) {
  const out = Array(days).fill(0);
  for (const r of recent || []) {
    const idx = days - 1 - calendarDaysAgo(r.at);
    if (idx >= 0 && idx < days) out[idx] += 1;
  }
  return out;
}

/** `{ tasks, days }` for the last seven calendar days, or null on an old backend. */
export function weekActivity(student) {
  if (!Array.isArray(student?.recent)) return null;
  const week = activityDays(student.recent, 7);
  return { tasks: week.reduce((a, b) => a + b, 0), days: week.filter(Boolean).length };
}

/** The unit a student touched most recently: `{ track, unitId, xp, at }` or null. */
export function latestUnit(student) {
  let best = null;
  for (const [track, units] of Object.entries(student?.units || {})) {
    for (const [unitId, [xp, at]] of Object.entries(units || {})) {
      if (at && (!best || at > best.at)) best = { track, unitId, xp, at };
    }
  }
  return best;
}

/**
 * Why a student is worth a look, as short labels — empty when they are fine.
 * A student who has never worked is "Not started" rather than "inactive": the
 * two need different conversations.
 */
export function attentionReasons(student) {
  const reasons = [];
  if (student.is_locked) reasons.push('AI lock');
  if (!student.last_active) reasons.push('Not started');
  else if (daysSince(student.last_active) >= INACTIVE_DAYS) reasons.push(`Quiet ${relTime(student.last_active).replace(' ago', '')}`);
  return reasons;
}

/** Tailwind classes for a gradebook cell, by unit XP. Numbers carry the value; colour is the scan. */
export function xpCellClass(xp) {
  if (!xp) return 'bg-slate-50 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600';
  if (xp >= 100) return 'bg-emerald-500 text-white';
  if (xp >= 80) return 'bg-emerald-200 dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-100';
  if (xp >= 40) return 'bg-amber-200 dark:bg-amber-700/50 text-amber-900 dark:text-amber-100';
  return 'bg-rose-200 dark:bg-rose-800/50 text-rose-900 dark:text-rose-100';
}

export const XP_LEGEND = [
  { label: '1–39', xp: 20 },
  { label: '40–79', xp: 60 },
  { label: '80–99', xp: 90 },
  { label: '100', xp: 100 },
];
