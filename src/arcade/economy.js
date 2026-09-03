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
//   - FREE PLAY is the mastery reward: once every currently-available unit sits
//     at FREE_PLAY_MIN_XP or above, the arcade stops charging.
//
// The arcade track itself is excluded from every sum here — its leaderboard
// scores and wallet are not XP, and letting a good run bankroll the next one
// would defeat the point of charging for a play.

import { getTrack } from '../data/index';
import { unitXPOf } from '../tasks/taskRegistry';
import { ARCADE_TRACK_ID } from '../components/trackRegistry';
import { WALLET_KEY } from '../utils/progressSchema';

/** One XP earns one gold. A finished unit (100 XP) buys ten plays. */
export const GOLD_PER_XP = 1;

/** What one game costs. */
export const PLAY_COST = 10;

/**
 * The per-unit XP that counts as "mastered" for the free-play unlock. Kept in
 * step with the arcade phase gate the units used to carry (80 of 100).
 */
export const FREE_PLAY_MIN_XP = 80;

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
 * Free-play status: unlocked once every available unit is at or above the
 * mastery bar. Also returns the count so the arcade can show "7 / 9 mastered"
 * as a goal to chase rather than a silent locked door.
 *
 * With no available units there is nothing to master, so free play stays locked
 * — otherwise a brand-new account would get it for free.
 */
export function freePlayState(allProgress = {}, units = []) {
  const total = units.length;
  const mastered = units.filter(
    ({ track, unitId, unit }) =>
      unitXPOf(unit, allProgress?.[track]?.[unitId] || {}) >= FREE_PLAY_MIN_XP
  ).length;
  return { unlocked: total > 0 && mastered === total, mastered, total };
}
