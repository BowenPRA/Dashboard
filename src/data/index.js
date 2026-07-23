// src/data/index.js
//
// Discovers every unit under src/data/<TRACK>/<UNIT>/data.js and groups it by the
// `meta.track` the unit declares.
//
// Units are keyed by whatever track they declare, NOT by a hardcoded branch list.
// A unit that declares an unregistered track used to vanish silently — that is how
// the entire GED English track sat invisible. It now warns loudly in dev instead.

import { TRACK_IDS } from '../components/trackRegistry';

const modules = import.meta.glob('./**/*.js', { eager: true });

/** @type {Record<string, { meta: object[], data: Record<string, object> }>} */
export const TRACKS = Object.fromEntries(TRACK_IDS.map((id) => [id, { meta: [], data: {} }]));

const problems = [];

for (const path in modules) {
  if (path.endsWith('/index.js')) continue;

  const mod = modules[path];
  const unit = Object.values(mod).find((exp) => exp && typeof exp === 'object' && exp.meta?.id);
  if (!unit) continue;

  const { id, track } = unit.meta;

  if (!track) {
    problems.push(`${path} — unit "${id}" declares no meta.track`);
    continue;
  }
  if (!TRACKS[track]) {
    problems.push(
      `${path} — unit "${id}" declares track "${track}", which is not in TRACK_REGISTRY. ` +
        `Valid tracks: ${TRACK_IDS.join(', ')}. This unit will not appear anywhere.`
    );
    continue;
  }
  if (TRACKS[track].data[id]) {
    problems.push(`${path} — duplicate unit id "${id}" in track "${track}"; keeping the first one found`);
    continue;
  }
  if (!Array.isArray(unit.phases)) {
    problems.push(`${path} — unit "${id}" has no phases array, so it can never award XP`);
  }

  TRACKS[track].data[id] = unit;
  TRACKS[track].meta.push(unit.meta);
}

for (const t of Object.values(TRACKS)) {
  t.meta.sort((a, b) => a.id.localeCompare(b.id));
}

if (problems.length && import.meta.env.DEV) {
  console.warn(`[content] ${problems.length} problem(s) loading unit data:\n  ${problems.join('\n  ')}`);
}

/** Content for a track. Always returns a shape, never undefined. */
export const getTrack = (id) => TRACKS[id] || { meta: [], data: {} };

/** Problems found while loading, for a diagnostics view or a test. */
export const contentProblems = problems;
