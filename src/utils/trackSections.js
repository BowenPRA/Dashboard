// How a track's units are numbered, grouped and summarised — shared by the
// student's track page, Home, and the teacher's gradebook, so "2.3" and
// "Unit 2" mean the same thing everywhere.

import { getTrackConfig } from '../components/trackRegistry';
import { getTrack } from '../data/index';
import { unitXPOf } from '../tasks/taskRegistry';
import { isUnitKey, isTaskKey } from './progressSchema';

/**
 * The coursebook number of a unit, read from its id: `U02_3` → "2.3".
 *
 * Only ids shaped like the Cambridge tracks' (`U<unit>_<lesson>`) have one;
 * everything else (`ENG_1A`, `AM_4B`, `T01`) returns '' and shows no number.
 */
export function unitNumberOf(unitId) {
  const m = /^U(\d+)_(\d+)$/.exec(String(unitId || ''));
  return m ? `${Number(m[1])}.${Number(m[2])}` : '';
}

/**
 * The shortest label that still identifies a unit, for a narrow column header:
 * the coursebook number where there is one ("2.3"), else the id without its
 * track prefix (`ENG_1A` → "1A", `AM_4B` → "4B", `T01` → "T01").
 */
export const unitShortLabel = (unitId) =>
  unitNumberOf(unitId) || String(unitId || '').split('_').pop();

/**
 * A track's units grouped under its registry `sections`.
 *
 * Always returns at least one group, so a caller renders the same way whether
 * or not the track declares sections: a track without them gets a single
 * untitled group (`label: null`) holding everything. Units matching no section
 * are kept, under "More" — a unit must never vanish because a registry row is
 * missing.
 */
export function sectionsOf(trackId, metaList = []) {
  const declared = getTrackConfig(trackId)?.sections;
  if (!declared?.length) return [{ key: 'all', label: null, title: '', units: metaList }];

  const groups = declared.map((s) => ({ key: s.prefix, label: s.label, title: s.title, units: [] }));
  const rest = [];
  for (const meta of metaList) {
    const home = groups.find((g) => String(meta.id).startsWith(g.key));
    (home ? home.units : rest).push(meta);
  }
  const out = groups.filter((g) => g.units.length > 0);
  if (rest.length) out.push({ key: 'more', label: 'More', title: '', units: rest });
  return out;
}

/** Newest timestamp in a unit's task records (ISO), or null if untouched. */
export function unitLastTouched(unitScores = {}) {
  let latest = null;
  for (const [key, rec] of Object.entries(unitScores || {})) {
    if (!isTaskKey(key) || !rec || typeof rec !== 'object') continue;
    const at = rec.updatedAt;
    if (at && (!latest || at > latest)) latest = at;
  }
  return latest;
}

/**
 * One track's progress at a glance, from that track's slice of the progress
 * blob: `{ total, done, started, xp, lastAt, lastUnitId }`.
 *
 * `lastUnitId` is the unit most recently worked on that still has XP to earn —
 * "where you left off". A finished unit is not somewhere to go back to.
 */
export function trackSummary(trackId, trackProgress = {}) {
  const { meta, data } = getTrack(trackId);
  let done = 0;
  let started = 0;
  let xp = 0;
  let lastAt = null;
  let lastUnitId = null;

  for (const m of meta) {
    const scores = trackProgress?.[m.id] || {};
    const unitXP = unitXPOf(data[m.id], scores);
    xp += unitXP;
    if (unitXP >= 100) done += 1;
    else if (unitXP > 0) started += 1;

    const at = unitLastTouched(scores);
    if (at && unitXP < 100 && (!lastAt || at > lastAt)) {
      lastAt = at;
      lastUnitId = m.id;
    }
  }

  return { total: meta.length, done, started, xp, lastAt, lastUnitId };
}

/** Unit ids a student has any record in, for a track's slice of progress. */
export const recordedUnitIds = (trackProgress = {}) =>
  Object.keys(trackProgress || {}).filter(isUnitKey);
