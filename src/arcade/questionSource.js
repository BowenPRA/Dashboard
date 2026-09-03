// src/arcade/questionSource.js
//
// Where the arcade's in-game questions come from.
//
// The games (Tower Defense's Bolt, Survivor's level-up screen) quiz the student
// on vocabulary and arithmetic. When the arcade lived inside a unit those came
// from that unit. The arcade is now its own track with no lessons of its own, so
// the questions instead follow what the student is CURRENTLY studying:
//
//   1. the units the daily plan assigned for today, if any apply to them;
//   2. otherwise the units they have in progress (started, not yet finished);
//   3. otherwise everything available to them.
//
// So a run always drills the words and the maths of the work in front of the
// student — the arcade doubles as spaced review — without a teacher having to
// wire anything up. The vocabulary pool aggregates across every source unit; the
// arithmetic generator is a single one, taken from a source unit that has one
// (a maths unit), or absent (vocab-only) when none do.

import { audioUrl } from '../utils/assetPaths';
import { unitXPOf } from '../tasks/taskRegistry';
import { mathChallengeFor } from '../components/towerdefense/mathChallenges';
import { planForDate, todayISO } from '../utils/studyPlan';

/** realWords decorated with the audio URLs the vocab tasks (and games) expect. */
function decorateWords(track, unitId, unit) {
  return (unit?.realWords || []).map((w) => ({
    ...w,
    isReal: true,
    audio: audioUrl(track, unitId, 'word', w.word),
    defAudio: audioUrl(track, unitId, 'def', w.word),
    sentAudio: audioUrl(track, unitId, 'sentence', w.word),
  }));
}

/**
 * The units whose content should feed a run, most-relevant first.
 *
 * `available` is the student's whole visible set (from economy.availableUnits);
 * this narrows it to what they are actively working on.
 */
function sourceUnits(allProgress, available) {
  // 1. Today's assignment, kept only where it overlaps what the student can see.
  const assigned = (planForDate(todayISO()).assignments || [])
    .map((a) => available.find((u) => u.track === a.track && u.unitId === a.unitId))
    .filter(Boolean);
  if (assigned.length) return assigned;

  // 2. Units in progress — started but not yet finished.
  const inProgress = available.filter(({ track, unitId, unit }) => {
    const xp = unitXPOf(unit, allProgress?.[track]?.[unitId] || {});
    return xp > 0 && xp < 100;
  });
  if (inProgress.length) return inProgress;

  // 3. Nothing started yet — draw from the whole curriculum.
  return available;
}

/**
 * Builds the question inputs for one arcade run.
 *
 * Returns `{ pool, mathUnitId }` — exactly the two things the games consume:
 *   pool        the aggregated, audio-decorated vocabulary (deduped by word)
 *   mathUnitId  a source unit id that has an arithmetic generator, or null
 *
 * Both games already degrade gracefully on an empty pool / null generator (a
 * level with no question bank just offers a free choice), so a student studying
 * only vocabulary-free or word-free material still gets a playable run.
 */
export function arcadeQuestionSource(allProgress = {}, available = []) {
  const units = sourceUnits(allProgress, available);

  const seen = new Set();
  const pool = [];
  for (const { track, unitId, unit } of units) {
    for (const w of decorateWords(track, unitId, unit)) {
      const key = String(w.word || '').trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      pool.push(w);
    }
  }

  // One arithmetic generator per run, taken from a source unit that has one.
  const mathUnitId = units.map((u) => u.unitId).find((id) => mathChallengeFor(id)) || null;

  return { pool, mathUnitId };
}
