// What a student should do next in a unit — the one-line suggestion on a unit
// card. Replaces the old "Needs Work" badge, which named a problem ("this unit
// needs work") without naming the move.

import { COMPLETE_MIN_XP } from '../tasks/taskRegistry';

/**
 * True when a task has work saved that it can pick up again: a resume blob
 * with something in it, and the task not yet at full marks. The blob is
 * opaque here (each task keeps its own shape), so this is a hint, not a
 * promise — enough to tell the student "you were in the middle of this".
 */
export const canResume = (record, maxXP) => {
  const blob = record?.answers;
  if (!blob || typeof blob !== 'object' || !(maxXP > 0)) return false;
  if ((record.current || 0) >= maxXP) return false;
  if (Array.isArray(blob)) return blob.length > 0;
  // Notes keeps { slide, total, checks }: in progress past slide one, or with
  // a check answered. A finished deck is not "in the middle" — it keeps its
  // answers (`finished: true`) and gets the "Fix N" pill instead.
  if ('slide' in blob && 'checks' in blob) {
    if (blob.finished) return false;
    return (blob.slide || 0) > 0 || Object.keys(blob.checks || {}).length > 0;
  }
  return Object.keys(blob).length > 0;
};

const sat = (rec) => !!rec && ((rec.attempts?.length || 0) > 0 || (Number(rec.current) || 0) > 0);

/**
 * The next task to do, and why: `{ task, note }`, or null when there is
 * nothing open to suggest.
 *
 * `tasks` is `resolveUnitTasks(unit, unitXP, scores)`. In order:
 *
 *   1. 80+ XP and the quiz not yet sat  → the quiz; sitting it FINISHES the
 *      unit (taskRegistry.isUnitComplete), so nothing else is worth more.
 *   2. a task left half done            → carry on with it.
 *   3. a task never tried               → the first one, in unit order — the
 *      phases are already the intended sequence.
 *   4. otherwise                        → the task with the most XP still to
 *      win, because that is the quickest route to the next unlock.
 *
 * When a later phase is still locked the note says how far away it is, so the
 * suggestion always points at the finish: "12 more XP unlocks the quiz".
 * `ignoreLocks` is the preview/QA account, which can open everything.
 */
export function suggestNextTask(unit, scores = {}, tasks = [], unitXP = 0, ignoreLocks = false) {
  const open = tasks.filter((t) => !t.empty && t.maxXP > 0 && (ignoreLocks || !t.locked));
  const gapOf = (t) => t.maxXP - Math.min(scores[t.dbKey]?.current || 0, t.maxXP);
  const todo = open.filter((t) => gapOf(t) > 0);
  if (todo.length === 0) return null;

  const quiz = open.find((t) => t.id === 'ASSESSMENT');
  if (quiz && unitXP >= COMPLETE_MIN_XP && !sat(scores[quiz.dbKey])) {
    return { task: quiz, note: 'Do the quiz to finish the unit' };
  }

  // How far the next locked phase is, for the note.
  const nextLocked = ignoreLocks ? null : (unit?.phases || [])
    .filter((p) => (p.threshold || 0) > unitXP)
    .sort((a, b) => a.threshold - b.threshold)[0];
  const unlockNote = nextLocked
    ? `${nextLocked.threshold - unitXP} more XP unlocks ${(nextLocked.tasks || []).some((t) => t.id === 'ASSESSMENT') ? 'the quiz' : 'the next tasks'}`
    : null;

  const resumable = todo.find((t) => canResume(scores[t.dbKey], t.maxXP));
  if (resumable) return { task: resumable, note: unlockNote || 'Pick up where you left off' };

  const fresh = todo.find((t) => !scores[t.dbKey]);
  if (fresh) {
    return { task: fresh, note: unitXP === 0 ? 'Start here' : unlockNote || `Worth ${fresh.maxXP} XP` };
  }

  // Everything open has been tried: go back to where the most XP is left.
  const richest = [...todo].sort((a, b) => gapOf(b) - gapOf(a))[0];
  const toFinish = COMPLETE_MIN_XP - unitXP;
  return {
    task: richest,
    note: unlockNote
      || (toFinish > 0 ? `${toFinish} more XP finishes the unit` : `${gapOf(richest)} more XP to win here`),
  };
}
