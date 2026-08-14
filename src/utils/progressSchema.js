/**
 * The shape of `students.progress`, in one place.
 *
 * Until now a task record was `{ current, answers }` — a permanent high-water
 * mark with no time dimension, which made spaced review, retention measurement
 * and any "you're improving" signal impossible to build. This module adds the
 * memory without changing what `current` means, so every existing XP
 * calculation keeps working untouched.
 *
 *   progress[track][unitId][dbKey] = {
 *     current,    // high-water mark — XP maths reads this and nothing else
 *     last,       // most recent score: what they know NOW, not their best day
 *     answers,    // resume blob, unchanged
 *     updatedAt,  // ISO — "when was this last touched"
 *     attempts,   // [{ score, at }], newest last, capped
 *     items,      // [{ itemId, correct, at }] — per-item log for targeted review
 *   }
 *
 *   progress[track][VOCAB_KEY] = {
 *     [word]: { seen, right, wrong, lastSeen }
 *   }
 *
 * The vocabulary bank sits beside the units rather than inside one because a
 * word is met in one unit and needs to come back in every later review.
 */

/** Reserved key beside the unit ids in a track's progress. Never a unit id. */
export const VOCAB_KEY = '__vocab';

/**
 * Where a unit's raw arcade high score lives, beside the task records.
 *
 * It is deliberately not a dbKey: the GAMES task's XP is clamped to a few
 * points, so the unclamped score needs its own home for the shared per-unit
 * leaderboard to be able to rank anyone. Never counted as unit XP.
 */
export const ARCADE_KEY = 'GAMES';

/** Keys inside a track's progress that are not units. */
const RESERVED_TRACK_KEYS = [VOCAB_KEY];

/** Keys inside a unit's progress that are not task dbKeys. */
const RESERVED_UNIT_KEYS = ['strikes', ARCADE_KEY];

/** True for keys that address a real unit. Use before iterating a track. */
export const isUnitKey = (key) => !RESERVED_TRACK_KEYS.includes(key);

/** True for keys that address a real task inside a unit. */
export const isTaskKey = (key) => !RESERVED_UNIT_KEYS.includes(key);

// The record lives in a JSON column that is rewritten in full on every save, so
// the logs are capped. Both are far more than a six-week sprint will produce.
export const MAX_ATTEMPTS = 30;
export const MAX_ITEMS = 300;

/**
 * Folds one completed attempt into a task's record.
 *
 * `current` stays `max(existing, score)` because phase thresholds and the unit
 * XP total are built on it — a student must never lose access to a phase by
 * re-doing a task and scoring worse. `last` carries the honest number.
 *
 * meta.items — `[{ itemId, correct }]` — is what makes targeted review possible:
 * which item, right or wrong, when.
 */
export function recordAttempt(prev, score, answers = null, meta = {}) {
  const at = new Date().toISOString();
  const value = Number(score) || 0;
  const previous = prev || {};

  const attempts = [...(previous.attempts || []), { score: value, at }].slice(-MAX_ATTEMPTS);

  const logged = (meta.items || [])
    .filter((i) => i && i.itemId != null)
    .map((i) => ({ itemId: String(i.itemId), correct: !!i.correct, at }));
  const items = [...(previous.items || []), ...logged].slice(-MAX_ITEMS);

  return {
    ...previous,
    current: Math.max(Number(previous.current) || 0, value),
    last: value,
    answers: answers ?? previous.answers ?? null,
    updatedAt: at,
    attempts,
    ...(items.length ? { items } : null),
  };
}

/**
 * Folds vocabulary results into a track's word bank.
 *
 * Keyed by lowercased word so the same term met in two units accumulates one
 * history — which is the point: a word is only known if it survives the gap
 * between the unit that taught it and the review that asks again.
 */
export function mergeVocab(store, entries = []) {
  const at = new Date().toISOString();
  const next = { ...(store || {}) };

  for (const entry of entries) {
    const word = String(entry?.word || '').trim().toLowerCase();
    if (!word) continue;
    const prev = next[word] || { seen: 0, right: 0, wrong: 0, lastSeen: null };
    next[word] = {
      seen: (prev.seen || 0) + 1,
      right: (prev.right || 0) + (entry.correct ? 1 : 0),
      wrong: (prev.wrong || 0) + (entry.correct ? 0 : 1),
      lastSeen: at,
    };
  }

  return next;
}

/** A track's vocabulary bank, or `{}` if nothing has been logged yet. */
export const vocabBank = (trackProgress) => (trackProgress || {})[VOCAB_KEY] || {};
