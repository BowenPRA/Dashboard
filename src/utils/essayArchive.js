/**
 * The essay archive — every GED essay the student has written, kept.
 *
 * Until now an essay lived only in the ESSAY task's resume blob: the latest
 * text, overwritten by the next attempt. For a student whose whole risk is the
 * Extended Response that threw away the one thing worth keeping — the writing
 * itself, the score it earned, the errors the examiner marked, and how all of
 * that moves from week to week. This module gives those a home:
 *
 *   progress[track][ESSAYS_KEY] = [ entry, entry, … ]   (oldest first, capped)
 *
 * It sits beside the units in the track's progress, like the vocabulary bank,
 * because an essay belongs to the student's writing history rather than to
 * one unit's score. `isUnitKey` (progressSchema.js) already skips reserved
 * keys, so nothing that iterates units sees it.
 *
 * Everything here is a pure function over that array. The student's Writing
 * page and the teacher's drawer both read it; the Essay task writes it through
 * `meta.essay` on save (supabaseClient.saveScore).
 */

export const ESSAYS_KEY = '__essays';

/** Rewritten in full on every save, so the archive is capped. One student's
 *  term of daily writing is well under this. */
export const MAX_ESSAYS = 30;

export const newEssayId = (unitId, promptKey) =>
  `${unitId}:${promptKey}:${Date.now().toString(36)}`;

/** The archive of one track's progress, always an array. */
export const essaysOf = (trackProgress) => {
  const list = (trackProgress || {})[ESSAYS_KEY];
  return Array.isArray(list) ? list : [];
};

/**
 * Adds or replaces an entry by id. The task saves once when the score comes
 * back and again when the revision finishes, so the second write must land on
 * the first entry, not beside it.
 */
export function upsertEssay(list, entry) {
  if (!entry?.id) return essaysOf({ [ESSAYS_KEY]: list });
  const current = essaysOf({ [ESSAYS_KEY]: list });
  const i = current.findIndex((e) => e.id === entry.id);
  const next = i === -1 ? [...current, entry] : current.map((e, j) => (j === i ? { ...e, ...entry } : e));
  return next.slice(-MAX_ESSAYS);
}

/** Every essay across the given tracks, newest first. */
export function allEssays(allProgress, trackIds) {
  const out = [];
  for (const t of trackIds || []) for (const e of essaysOf(allProgress?.[t])) out.push({ ...e, track: e.track || t });
  return out.sort((a, b) => String(b.at).localeCompare(String(a.at)));
}

/* -------------------------------------------------------------------------- *
 * Building an entry from the task's grading result
 * -------------------------------------------------------------------------- */

const countWords = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;

/** `{ kind: count }` from a list of revisions. */
export function kindCounts(revisions = []) {
  const out = {};
  for (const r of revisions) {
    const k = String(r?.kind || 'Correction').trim() || 'Correction';
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

/**
 * One archive entry from a graded GED response. Keeps the examiner's whole
 * report — the student reads it back later, and a score without the reasons
 * behind it teaches nothing on the second reading either.
 */
export function buildEssayEntry({
  id, track, unitId, unitTitle, prompt, mode, minutesAllowed, secondsUsed, text, plan, feedback,
}) {
  const revisions = (feedback?.revisions || []).map((r) => ({
    quote: r.quote, correction: r.correction, kind: r.kind, why: r.why, rule: r.rule,
  }));
  return {
    id,
    at: new Date().toISOString(),
    track,
    unitId,
    unitTitle: unitTitle || unitId,
    promptKey: prompt?.key ?? '0',
    promptTitle: prompt?.title || '',
    task: prompt?.task || '',
    mode: mode || 'practice',
    minutesAllowed: minutesAllowed || null,
    secondsUsed: Number.isFinite(secondsUsed) ? secondsUsed : null,
    text: String(text || ''),
    wordCount: Number.isFinite(feedback?.wordCount) ? feedback.wordCount : countWords(text),
    paragraphs: Number.isFinite(feedback?.paragraphs) ? feedback.paragraphs : null,
    plan: plan && Object.values(plan).some((v) => String(v || '').trim()) ? plan : null,
    score: {
      total: Number(feedback?.gedTotal) || 0,
      traits: {
        arguments: Number(feedback?.gedTraits?.arguments) || 0,
        development: Number(feedback?.gedTraits?.development) || 0,
        conventions: Number(feedback?.gedTraits?.conventions) || 0,
      },
    },
    nonScorable: feedback?.nonScorableReason || '',
    positionStated: feedback?.positionStated || '',
    evidenceCited: feedback?.evidenceCited || [],
    analysisOfArgumentation: feedback?.analysisOfArgumentation || '',
    traitFeedback: feedback?.traitFeedback || {},
    scoreNotes: feedback?.scoreNotes || [],
    nextStep: feedback?.nextStep || '',
    revisions,
    errorKinds: kindCounts(revisions),
    revision: null,       // filled in when Part 2 finishes: { fixed, total, revisedText }
    teacherNote: null,    // { text, at } — written from the teacher's drawer
  };
}

/* -------------------------------------------------------------------------- *
 * Reading the archive back
 * -------------------------------------------------------------------------- */

/** Error kinds totalled across entries, commonest first, with one rule each. */
export function kindTotals(entries = []) {
  const map = new Map();
  for (const e of entries) {
    for (const r of e?.revisions || []) {
      const kind = r.kind || 'Correction';
      const cur = map.get(kind) || { kind, count: 0, rule: r.rule || '', example: r };
      cur.count += 1;
      if (!cur.rule && r.rule) cur.rule = r.rule;
      map.set(kind, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

/**
 * The few error types to carry into the NEXT essay: the commonest kinds in the
 * most recent essays. Shown before the student starts writing, because "watch
 * your verb endings" only helps if it arrives before the verbs do.
 */
export function watchList(entries = [], { recent = 3, top = 3 } = {}) {
  const latest = [...entries].sort((a, b) => String(b.at).localeCompare(String(a.at))).slice(0, recent);
  return kindTotals(latest).slice(0, top);
}

/** Errors per hundred words — the conventions trend that matters. */
export const errorDensity = (e) =>
  e?.wordCount ? Math.round(((e.revisions || []).length / e.wordCount) * 100 * 10) / 10 : 0;

/** Headline numbers for a set of essays (newest-first or not; order-agnostic). */
export function essayStats(entries = []) {
  const scored = entries.filter((e) => !e.nonScorable);
  const n = scored.length;
  const avg = (f) => (n ? Math.round((scored.reduce((s, e) => s + f(e), 0) / n) * 10) / 10 : 0);
  const sorted = [...entries].sort((a, b) => String(a.at).localeCompare(String(b.at)));
  const first = sorted[0] || null;
  const latest = sorted[sorted.length - 1] || null;
  const sortedScored = sorted.filter((e) => !e.nonScorable);
  const firstScored = sortedScored[0] || null;
  const latestScored = sortedScored[sortedScored.length - 1] || null;
  return {
    count: entries.length,
    scoredCount: n,
    best: scored.reduce((m, e) => Math.max(m, e.score?.total || 0), 0),
    average: avg((e) => e.score?.total || 0),
    traits: {
      arguments: avg((e) => e.score?.traits?.arguments || 0),
      development: avg((e) => e.score?.traits?.development || 0),
      conventions: avg((e) => e.score?.traits?.conventions || 0),
    },
    averageWords: avg((e) => e.wordCount || 0),
    averageDensity: avg(errorDensity),
    examCount: entries.filter((e) => e.mode === 'exam').length,
    first,
    latest,
    // The delta the student can feel: first scored essay vs the latest one.
    // Taken from the scored essays only — a non-scorable first attempt must not
    // blank the trend for a student who has since written several scored ones.
    change: firstScored && latestScored && firstScored !== latestScored
      ? (latestScored.score?.total || 0) - (firstScored.score?.total || 0)
      : null,
  };
}
