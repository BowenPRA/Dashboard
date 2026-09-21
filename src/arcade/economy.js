// src/arcade/economy.js
//
// The arcade's gold economy, in one place.
//
// The rules the whole feature is built on:
//   - A student EARNS gold by studying. Every XP they hold, anywhere in their
//     curriculum, is one gold coin. Gold earned is therefore a pure read of
//     progress — there is nothing extra to store for it.
//   - A student SPENDS gold by playing: each game costs PLAY_COST. Spending is
//     the only thing that needs persisting, so a single running total lives in
//     the wallet (progress.ARCADE.__wallet.spent).
//   - Gold available = earned − spent, floored at zero.
//   - FREE PLAY is the mastery reward: the arcade stops charging while the
//     student has EITHER finished every unit, OR holds FREE_PLAY_RATIO of all
//     the XP on offer (see freePlayState for why there are two ways in).
//
// The arcade track itself is excluded from every sum here — its leaderboard
// scores and wallet are not XP, and letting a good run bankroll the next one
// would defeat the point of charging for a play.

import { getTrack } from '../data/index';
import { unitXPOf, isUnitComplete } from '../tasks/taskRegistry';
import { ARCADE_TRACK_ID } from '../components/trackRegistry';
import { WALLET_KEY } from '../utils/progressSchema';

/** One XP earns one gold. A finished unit (100 XP) buys ten plays. */
export const GOLD_PER_XP = 1;

/** What one game costs. */
export const PLAY_COST = 10;

/**
 * The share of ALL available XP that unlocks free play: 80%, the same bar a
 * single unit has to clear before its quiz can finish it (COMPLETE_MIN_XP).
 */
export const FREE_PLAY_RATIO = 0.8;

/**
 * The units that count toward gold and free play: every published unit in the
 * tracks the student can see, except the arcade's own (which has none anyway).
 *
 * `visibleTrackIds` is the same set Home shows — enrolled tracks, or the GED
 * default — so a student's gold reflects THEIR curriculum, not the whole app.
 */
export function availableUnits(visibleTrackIds = []) {
  const out = [];
  for (const track of visibleTrackIds) {
    if (track === ARCADE_TRACK_ID) continue;
    const { meta, data } = getTrack(track);
    for (const m of meta) {
      const unit = data[m.id];
      if (unit) out.push({ track, unitId: m.id, unit });
    }
  }
  return out;
}

/** Total XP a student holds across the given units — one coin per XP. */
export function goldEarned(allProgress = {}, units = []) {
  const xp = units.reduce(
    (sum, { track, unitId, unit }) =>
      sum + unitXPOf(unit, allProgress?.[track]?.[unitId] || {}),
    0
  );
  return xp * GOLD_PER_XP;
}

/** Gold spent so far — the one number the wallet persists. */
export function goldSpent(allProgress = {}) {
  return Number(allProgress?.[ARCADE_TRACK_ID]?.[WALLET_KEY]?.spent) || 0;
}

/** Gold a student can spend right now: earned − spent, never below zero. */
export function goldBalance(allProgress = {}, units = []) {
  return Math.max(0, goldEarned(allProgress, units) - goldSpent(allProgress));
}

/**
 * Free-play status. Two ways in, and either is enough:
 *
 *   1. every available unit is FINISHED (isUnitComplete: 100 XP, or 80+ with
 *      the quiz sat), or
 *   2. total XP is at least FREE_PLAY_RATIO of the maximum possible — the same
 *      "1,416 / 2,000 XP" the student sees on Home.
 *
 * The old rule was "every unit at 80+", all or nothing. That had two problems:
 * one forgotten unit at 75 shut out a student sitting on 95% overall, and the
 * day a new unit was published everybody lost free play at once, however much
 * they had done. The ratio fixes both — a new 0-XP unit moves 1,100/1,100 to
 * 1,100/1,200, still 92% — while route 1 keeps a clean finish line for the
 * student who simply completes everything without chasing every last point.
 *
 * It is a live reading, not a permanent unlock: fall under both bars (new units
 * arrive and go untouched) and plays cost gold again until the work is done.
 *
 * With no available units there is nothing to master, so free play stays locked
 * — otherwise a brand-new account would get it for free.
 */
export function freePlayState(allProgress = {}, units = []) {
  const total = units.length;
  let done = 0;
  let xp = 0;
  for (const { track, unitId, unit } of units) {
    const scores = allProgress?.[track]?.[unitId] || {};
    xp += unitXPOf(unit, scores);
    if (isUnitComplete(unit, scores)) done += 1;
  }
  const maxXp = total * 100;
  const needXp = Math.ceil(maxXp * FREE_PLAY_RATIO);
  const allDone = total > 0 && done === total;
  const ratioMet = total > 0 && xp >= needXp;
  return {
    unlocked: allDone || ratioMet,
    via: allDone ? 'units' : ratioMet ? 'xp' : null,
    done, total, xp, maxXp, needXp,
  };
}
