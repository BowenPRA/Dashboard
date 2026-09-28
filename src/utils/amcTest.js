// The Practice Test and its Review (src/tasks/AmcTest.jsx, AmcReview.jsx):
// the marking, the two resume blobs, and the check `npm run validate` runs
// over a unit's `amcTest`. Pure functions — no React, no clock of their own.
//
// ── The test's blob: progress[track][unit].p53.answers ──────────────────────
//   {
//     v: 1,
//     startedAt,   // ms — when "Begin" was pressed
//     deadline,    // ms — startedAt + the test's minutes. The clock is a
//                  //      DEADLINE, not a countdown: closing the tab does not
//                  //      stop it, which is what "contest conditions" means.
//     picks,       // { q1: 'B', q7: 'E' } — a blank is simply absent
//     flags,       // ['q12'] — "come back to this one"
//     submitted,   // true once handed in (by the student or by the clock)
//     usedSeconds, // how long the sitting took
//     sitting,     // 1, 2, 3 … — which attempt this is
//   }
//
// ── The review's blob: progress[track][unit].p54.answers ────────────────────
//   {
//     v: 1,
//     sitting,     // the test sitting this review belongs to; a re-sit starts
//                  // the review again
//     work: { q7: { tries: ['A', 'E'], fixed: true, gaveUp: true, read: true } },
//   }
//
// The Review opens only once the test is HANDED IN. A checkpoint written in
// the middle of the test already makes a progress record, so "a record
// exists" is not enough — `isTestSubmitted` reads the flag instead
// (taskRegistry's AMC_TEST entry hands it to the phase gate as `isSat`).

export const LETTERS = ['A', 'B', 'C', 'D', 'E'];
export const TOPICS = ['Number', 'Algebra', 'Geometry', 'Counting'];
export const TOPIC_LABEL = {
  Number: 'Number',
  Algebra: 'Algebra & Ratio',
  Geometry: 'Geometry',
  Counting: 'Counting & Probability',
};
export const DEFAULT_MINUTES = 40;

/** How many second tries the Review allows before it shows the solution. */
export const MAX_RETRIES = 2;

export const problemsOf = (test) => (Array.isArray(test?.problems) ? test.problems : []);
export const secondsAllowed = (test) => Math.round((Number(test?.minutes) || DEFAULT_MINUTES) * 60);

/** True once the test has been handed in. Takes the task's progress RECORD. */
export const isTestSubmitted = (record) => record?.answers?.submitted === true;

/** A blob that is this test, part-way through or finished — never a stray object. */
export const isTestBlob = (blob) =>
  !!blob && typeof blob === 'object' && blob.v === 1 && Number.isFinite(blob.startedAt) && Number.isFinite(blob.deadline);

export function newSitting(test, now, previous = null) {
  return {
    v: 1,
    startedAt: now,
    deadline: now + secondsAllowed(test) * 1000,
    picks: {},
    flags: [],
    submitted: false,
    sitting: (Number(previous?.sitting) || 0) + 1,
  };
}

export const markOf = (problem, pick) => (!pick ? 'blank' : pick === problem.correct ? 'right' : 'wrong');

/**
 * The contest's scoring: one point for a correct answer, nothing for a wrong
 * one, nothing for a blank. `byTopic` is for the results screen.
 */
export function scoreTest(test, picks = {}) {
  const out = { right: 0, wrong: 0, blank: 0, total: 0, byTopic: {} };
  for (const p of problemsOf(test)) {
    const mark = markOf(p, picks[p.id]);
    out[mark] += 1;
    out.total += 1;
    const t = (out.byTopic[p.topic] ||= { right: 0, total: 0 });
    t.total += 1;
    if (mark === 'right') t.right += 1;
  }
  return out;
}

/** The per-item log a finished sitting hands to progressSchema. */
export const itemsOf = (test, picks = {}) =>
  problemsOf(test).map((p) => ({ itemId: p.id, correct: picks[p.id] === p.correct }));

/** The highest award line a score reaches, or null. */
export function awardFor(test, score) {
  return [...(test?.awards || [])].sort((a, b) => b.score - a.score).find((a) => score >= a.score) || null;
}

export const formatClock = (seconds) => {
  const s = Math.max(0, Math.ceil(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// ── Review ──────────────────────────────────────────────────────────────────

/** The problems the sitting got wrong or left blank, in paper order. */
export const missedOf = (test, picks = {}) => problemsOf(test).filter((p) => picks[p.id] !== p.correct);

/** A review blob that belongs to this sitting, or a fresh one. */
export function reviewFor(blob, sitting) {
  if (blob && typeof blob === 'object' && blob.v === 1 && blob.sitting === sitting && blob.work && typeof blob.work === 'object') {
    return blob;
  }
  return { v: 1, sitting, work: {} };
}

/**
 * What one missed problem has earned in the Review:
 *   1    put right on a second try
 *   0.5  not put right, but the solution was worked through and ticked
 *   0    not dealt with yet
 */
export function creditOf(entry) {
  if (entry?.fixed) return 1;
  if (entry?.read) return 0.5;
  return 0;
}

/** True when a missed problem needs nothing more from the student. */
export const isSettled = (entry) => !!(entry?.fixed || entry?.read);

/** True when the second tries are over: found, used up, or given up. */
export const triesSpent = (entry) => !!entry?.fixed || !!entry?.gaveUp || (entry?.tries?.length || 0) >= MAX_RETRIES;

/**
 * The Review's score out of 10: the share of the missed problems dealt with.
 * A perfect paper has nothing to put right and earns the 10 for reading.
 */
export function reviewScore(test, picks, work = {}) {
  const missed = missedOf(test, picks);
  if (!missed.length) return 10;
  const earned = missed.reduce((sum, p) => sum + creditOf(work[p.id]), 0);
  return Math.round((earned / missed.length) * 10);
}

export const reviewItemsOf = (test, picks, work = {}) =>
  missedOf(test, picks).map((p) => ({ itemId: p.id, correct: !!work[p.id]?.fixed, retried: true }));

// ── Validation ──────────────────────────────────────────────────────────────

const dollarsBalanced = (s) => {
  // An escaped dollar is money, not a delimiter.
  const bare = String(s).replace(/\\\$/g, '');
  return (bare.match(/\$/g) || []).length % 2 === 0;
};

/**
 * Problems with a unit's `amcTest`, as strings. Empty means the test can be
 * sat and reviewed. What it guards against is this task's version of a wrong
 * answer key: a key that names no choice, a problem with four choices, a
 * solution that was never written — each of which looks fine in the data and
 * fails in front of the student.
 */
export function checkAmcTest(test) {
  const out = [];
  if (!test || typeof test !== 'object') return ['amcTest is not an object'];
  if (!test.title) out.push('amcTest needs a title');
  if (!(Number(test.minutes) > 0)) out.push('amcTest needs minutes > 0');
  for (const a of test.awards || []) {
    if (!(a.score > 0) || !a.label) out.push('amcTest: every award needs a score and a label');
  }

  const problems = problemsOf(test);
  if (problems.length !== 25) out.push(`amcTest has ${problems.length} problems — an AMC 8 paper has 25`);

  const seen = new Set();
  const tally = {};
  problems.forEach((p, i) => {
    const at = `amcTest problem ${i + 1}`;
    if (!p.id) out.push(`${at} has no id`);
    else if (seen.has(p.id)) out.push(`${at}: duplicate id "${p.id}"`);
    seen.add(p.id);
    if (!TOPICS.includes(p.topic)) out.push(`${at}: topic "${p.topic}" is not one of ${TOPICS.join('/')}`);
    if (!p.text) out.push(`${at} has no text`);
    if (!Array.isArray(p.choices) || p.choices.length !== 5) out.push(`${at} has ${p.choices?.length ?? 0} choices — it needs 5, (A) to (E)`);
    else {
      if (p.choices.some((c) => typeof c !== 'string' || !c.trim())) out.push(`${at} has an empty choice`);
      if (new Set(p.choices).size !== 5) out.push(`${at} has two choices the same`);
    }
    if (!LETTERS.includes(p.correct)) out.push(`${at}: correct "${p.correct}" is not one of A–E`);
    tally[p.correct] = (tally[p.correct] || 0) + 1;

    if (!p.hint) out.push(`${at} has no hint for the Review`);
    if (!p.idea) out.push(`${at} has no key idea for the Review`);
    if (!Array.isArray(p.solution) || p.solution.length < 2) out.push(`${at} needs a worked solution of at least 2 steps`);
    if (p.trap && p.tip) out.push(`${at} carries a trap AND a tip — one or the other`);
    if (p.figure !== undefined && !/^<svg[\s>]/.test(String(p.figure))) out.push(`${at}: figure is not an SVG (a missing key in figures.js?)`);
    if (p.solutionFigure !== undefined && !/^<svg[\s>]/.test(String(p.solutionFigure))) out.push(`${at}: solutionFigure is not an SVG`);

    for (const s of [p.text, p.hint, p.idea, p.trap, p.tip, ...(p.choices || []), ...(p.solution || [])]) {
      if (s && !dollarsBalanced(s)) out.push(`${at}: an unclosed $ in "${String(s).slice(0, 40)}…"`);
    }
  });

  // A key that leans on one letter is guessable, and a real paper never does.
  const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  if (problems.length >= 20 && top && top[1] / problems.length > 0.4) {
    out.push(`amcTest: ${top[1]} of ${problems.length} answers are (${top[0]})`);
  }
  return out;
}
