#!/usr/bin/env node
/**
 * What still needs French, as JSON a translator can work through.
 *
 *   node scripts/french/extract.mjs Y7_MATH/U01_1            # the whole unit
 *   node scripts/french/extract.mjs Y7_MATH/U01_1 --out todo.json
 *   node scripts/french/extract.mjs Y7_MATH/U01_1 --count    # just the numbers
 *
 * Output: { "<file>": [ { id, line, key, en, vn, tm? }, … ], … } — `en` is the
 * English the twin translates (null when the object has none), `vn` the
 * Vietnamese, and `tm` the French the classroom deck already gives the same
 * English sentence (reuse it unless it reads wrong here). A value that is not a
 * plain string or string array is shown as { js: "<source>" }: answer that one
 * with { "js": "<French source>" }, keeping every ${…} as it is.
 *
 * Fill a translation file and run scripts/french/apply.mjs on it. Ids are
 * stable while other entries are filled, so extract → translate → apply can be
 * done in pieces. Exit code 0; the count goes to stderr.
 */
import fs from 'fs';
import { entriesOf, filesOf, classroomMemory, rel } from './core.mjs';

const args = process.argv.slice(2);
const outAt = args.indexOf('--out');
const out = outAt >= 0 ? args[outAt + 1] : null;
const countOnly = args.includes('--count');
const targets = args.filter((a, i) => !a.startsWith('--') && (outAt < 0 || i !== outAt + 1));
if (!targets.length) {
  console.error('usage: node scripts/french/extract.mjs <TRACK/UNIT | folder | file>… [--out file.json] [--count]');
  process.exit(2);
}

const tm = countOnly ? new Map() : classroomMemory();
const result = {};
let total = 0;
let suggested = 0;
for (const file of filesOf(targets)) {
  const entries = entriesOf(file);
  if (!entries.length) continue;
  total += entries.length;
  console.error(`${String(entries.length).padStart(5)}  ${rel(file)}`);
  result[rel(file)] = entries.map(({ id, line, key, en, vn }) => {
    const hit = typeof en === 'string' ? tm.get(en) : null;
    if (hit) suggested++;
    return { id, line, key, en, vn, ...(hit ? { tm: hit.fr } : null) };
  });
}
console.error(`${String(total).padStart(5)}  still need French${countOnly ? '' : ` (${suggested} with a classroom suggestion)`}`);
if (!countOnly) {
  const json = JSON.stringify(result, null, 1);
  if (out) fs.writeFileSync(out, json);
  else process.stdout.write(json + '\n');
}
