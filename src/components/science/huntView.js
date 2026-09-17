// src/components/science/huntView.js
//
// Element Hunt's screen logic that is not drawing: what the student's answer
// looks like for markHunt, how the table is drawn for a round before and after
// marking (so the table never gives the answer away), and the extra feedback
// lines for a wrong answer. Plain .js, so a Node script can drive it.

import { elementBySymbol } from '../../utils/elements.js';
import { makeHuntSession, makeHuntRound, HUNT_MODES } from '../../utils/elementHunt.js';
import { rngFrom } from '../../utils/labBench.js';

/** A round a student can answer: a tap/multi round must have something to tap. */
const playable = (r) => !((r.kind === 'tap' || r.kind === 'multi') && !r.targets?.length);

/**
 * makeHuntSession, minus unanswerable rounds. utils/elementHunt.js's metal round
 * can ask for "every non-metal in period 4" — K and Ca are both metals, so there
 * is nothing to tap (and Check needs a tap). Such a round is re-drawn in the
 * same mode from a seed derived from the session's, so a session is still
 * reproducible from its seed. [] when the config has no known mode.
 */
export function huntSession(config, seed) {
  if (!(config?.modes || []).some((m) => HUNT_MODES.includes(m))) return [];
  const rounds = makeHuntSession(config, seed);
  return rounds.map((r, i) => {
    if (playable(r)) return r;
    const rng = rngFrom((Number(seed) >>> 0) + 7919 * (i + 1));
    let next = r;
    for (let k = 0; k < 50 && !playable(next); k += 1) next = makeHuntRound(r.mode, rng);
    return next;
  });
}

/** The answer markHunt expects, from the screen's state. */
export function huntAnswer(round, { tap = null, picked = [], typed = '', choice = null } = {}) {
  if (round.kind === 'tap') return tap;
  if (round.kind === 'multi') return picked;
  if (round.kind === 'type') return typed;
  return choice;
}

/** The row / column a query is about — outlined on the table once marked. */
export function bandsFor(query) {
  if (!query) return [];
  const out = [];
  const g = query.group ?? (query.sameGroupAs ? elementBySymbol(query.sameGroupAs)?.group : null);
  const p = query.period ?? (query.samePeriodAs ? elementBySymbol(query.samePeriodAs)?.period : null);
  if (p != null) out.push({ period: p });
  if (g != null) out.push({ group: g });
  return out;
}

/**
 * How the table looks for a round.
 *
 * Before marking nothing on the table may answer the question:
 *   find    names hidden (the round says so); its `focus` IS the target, so it is not drawn
 *   symbol  the element's tile shows "?" (focused): where it is, not what it is
 *   name    names hidden: the four choices are otherwise all printed on the table
 *   metal   colours hidden (the multi round says so; the one-element choice round
 *           does not, but yellow/blue would answer it); a period round outlines its row
 *   mass    both elements focused — reading order is the reasoning
 *   place   the plain table
 * After marking: names and colours back, targets green (a multi round's missed
 * targets orange), wrong taps red, the query's row/column outlined.
 */
export function tableView(round, { checked = false, answer = null, picked = [] } = {}) {
  const highlight = {};
  let showNames = true;
  let colourByMetal = true;
  let masked = [];
  let bands = [];
  const interactive = !checked && (round.kind === 'tap' || round.kind === 'multi');

  if (!checked) {
    if (round.hideNames) showNames = false;
    if (round.colourHidden || (round.mode === 'metal' && round.kind === 'choice')) colourByMetal = false;
    if (round.kind === 'multi') for (const s of picked) highlight[s] = 'pick';
    if (round.kind === 'type') { masked = [round.answer]; highlight[round.answer] = 'focus'; }
    if (round.kind === 'choice') {
      if (round.mode === 'name') { showNames = false; highlight[round.answer] = 'focus'; }
      else if (round.mode === 'mass') for (const o of round.options) highlight[o.val] = 'focus';
      else if (round.focus) highlight[round.focus] = 'focus';
    }
    if (round.mode === 'metal' && round.kind === 'multi') bands = bandsFor({ period: round.query?.period });
    return { highlight, showNames, colourByMetal, masked, bands, interactive };
  }

  if (round.kind === 'tap') {
    for (const s of round.targets) highlight[s] = 'good';
    if (answer && !round.targets.includes(answer)) highlight[answer] = 'bad';
  } else if (round.kind === 'multi') {
    // tapped and right: green; in the set but not tapped: orange (missed); tapped and wrong: red
    const given = answer || [];
    for (const s of round.targets) highlight[s] = given.includes(s) ? 'good' : 'focus';
    for (const s of given) if (!round.targets.includes(s)) highlight[s] = 'bad';
  } else if (round.kind === 'type') {
    highlight[round.answer] = 'good';
  } else if (elementBySymbol(round.answer)) {
    // mass: both elements stay outlined (the pair is the question); name: only the answer and a wrong pick
    if (round.mode === 'mass') for (const o of round.options) highlight[o.val] = 'focus';
    highlight[round.answer] = 'good';
    if (answer && answer !== round.answer) highlight[answer] = 'bad';
  } else if (round.focus) {
    highlight[round.focus] = 'focus';
  }
  bands = bandsFor(round.query);
  return { highlight, showNames, colourByMetal, masked, bands, interactive };
}

/** A short line for the end-of-session summary: what the round was about, with its answer. */
export function huntRowLabel(round) {
  const el = (s) => elementBySymbol(s) || { sym: s, en: s, vn: s };
  const both = (fn) => ({ en: fn('en'), vn: fn('vn') });
  switch (round.mode) {
    case 'find': return both((l) => `${el(round.targets[0])[l]} → ${round.targets[0]}`);
    case 'symbol': return both((l) => `${el(round.answer)[l]} → ${round.answer}`);
    case 'name': return both((l) => `${round.answer} → ${el(round.answer)[l]}`);
    case 'mass': return both((l) => `${round.options.map((o) => o.val).join(' / ')} → ${el(round.answer)[l]}`);
    default:
      if (round.kind === 'choice') {
        const o = round.options.find((x) => x.val === round.answer);
        return both((l) => `${round.focus} → ${o ? o[l] : round.answer}`);
      }
      return both(() => round.targets.join(', '));
  }
}

/** Lines to show above the round's own `explain` when the answer was wrong. */
export function huntFeedback(round, answer, mark) {
  if (!mark || mark.ok) return [];
  if (round.kind === 'type') return mark.en ? [{ en: mark.en, vn: mark.vn }] : [];
  if (round.kind === 'tap') {
    const e = elementBySymbol(answer);
    return e ? [{ en: `You tapped ${e.sym} (${e.en}).`, vn: `Bạn đã chạm vào ${e.sym} (${e.vn}).` }] : [];
  }
  if (round.kind === 'multi') {
    const out = [];
    if (mark.missed?.length) out.push({ en: `Missed: ${mark.missed.join(', ')}.`, vn: `Còn thiếu: ${mark.missed.join(', ')}.` });
    if (mark.extra?.length) out.push({ en: `Not in the set: ${mark.extra.join(', ')}.`, vn: `Chọn thừa: ${mark.extra.join(', ')}.` });
    return out;
  }
  return [];
}
