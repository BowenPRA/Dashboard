#!/usr/bin/env node
/**
 * Write French twins into the source, right after the Vietnamese they sit beside.
 *
 *   node scripts/french/apply.mjs fr.json          # write
 *   node scripts/french/apply.mjs fr.json --dry    # report only
 *
 * fr.json: { "<file>": { "<id>": "French" | ["French", …] | { "js": "<source>" } } }
 * with the ids from scripts/french/extract.mjs. Each twin is inserted as
 * `<key>Fr: '…'` on its own line when the Vietnamese is on its own line, or
 * inline after it otherwise — English and Vietnamese are never touched.
 *
 * Refused (and reported) rather than written: an id that no longer exists, a
 * string where an array is needed or the wrong number of array entries, an
 * empty string, and French whose $…$ maths differs from the English. Exits 1
 * if anything was refused.
 */
import fs from 'fs';
import path from 'path';
import { entriesOf, jsString, ROOT } from './core.mjs';
import { mathsOf } from '../../src/utils/langCheck.js';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const input = args.find((a) => !a.startsWith('--'));
if (!input) {
  console.error('usage: node scripts/french/apply.mjs <fr.json> [--dry]');
  process.exit(2);
}
const plan = JSON.parse(fs.readFileSync(input, 'utf8'));

let written = 0;
const refused = [];
for (const [relFile, map] of Object.entries(plan)) {
  const file = path.resolve(ROOT, relFile);
  const src = fs.readFileSync(file, 'utf8');
  const byId = new Map(entriesOf(file, src).map((e) => [e.id, e]));
  const edits = [];
  for (const [id, fr] of Object.entries(map)) {
    const e = byId.get(id);
    const at = `${relFile}:${id}`;
    if (!e) { refused.push(`${at} — no such entry (already done, or the source changed; re-extract)`); continue; }
    const ref = (i) => {
      const en = Array.isArray(e.en) ? e.en[i] : e.en;
      return typeof en === 'string' ? en : (Array.isArray(e.vn) ? e.vn[i] : e.vn);
    };
    let literal;
    if (fr && typeof fr === 'object' && !Array.isArray(fr) && typeof fr.js === 'string') {
      if (!fr.js.trim()) { refused.push(`${at} — empty js`); continue; }
      literal = fr.js;
    } else if (e.kind === 'array') {
      if (!Array.isArray(fr) || fr.length !== e.vn.length) { refused.push(`${at} — needs an array of ${e.vn.length}`); continue; }
      const bad = fr.findIndex((x, i) => typeof x !== 'string' || (e.vn[i].trim() && !x.trim()) || mathsOf(x) !== mathsOf(ref(i)));
      if (bad >= 0) { refused.push(`${at}[${bad}] — empty, or maths "${mathsOf(fr[bad])}" ≠ "${mathsOf(ref(bad))}"`); continue; }
      const multiline = src.slice(e.prop.value.start, e.prop.value.end).includes('\n');
      if (multiline) {
        const ind = indentAt(src, e.prop.start);
        literal = `[\n${fr.map((x) => `${ind}  ${jsString(x)},`).join('\n')}\n${ind}]`;
      } else literal = `[${fr.map(jsString).join(', ')}]`;
    } else if (e.kind === 'string') {
      if (typeof fr !== 'string' || !fr.trim()) { refused.push(`${at} — needs a non-empty string`); continue; }
      if (mathsOf(fr) !== mathsOf(ref(0))) { refused.push(`${at} — maths "${mathsOf(fr)}" ≠ "${mathsOf(ref(0))}"`); continue; }
      literal = jsString(fr);
    } else {
      refused.push(`${at} — the Vietnamese is code; answer with { "js": "…" }`);
      continue;
    }
    // An object entry gets a `…Fr` property after the Vietnamese; a call entry
    // (`pick(lang, en, vn)`) gets the French as one more argument.
    const ownLine = /^[ \t]*$/.test(src.slice(src.lastIndexOf('\n', e.prop.start - 1) + 1, e.prop.start));
    const item = e.frKey ? `${e.frKey}: ${literal}` : literal;
    const text = ownLine ? `,\n${indentAt(src, e.prop.start)}${item}` : `, ${item}`;
    edits.push({ at: e.prop.end, text });
  }
  edits.sort((a, b) => b.at - a.at);
  let next = src;
  for (const ed of edits) next = next.slice(0, ed.at) + ed.text + next.slice(ed.at);
  if (!dry && edits.length) fs.writeFileSync(file, next);
  written += edits.length;
  console.error(`${String(edits.length).padStart(5)}  ${dry ? 'would write' : 'written'}  ${relFile}`);
}

function indentAt(src, pos) {
  const lineStart = src.lastIndexOf('\n', pos - 1) + 1;
  return src.slice(lineStart).match(/^[ \t]*/)[0];
}

if (refused.length) {
  console.error(`\n${refused.length} refused:`);
  refused.forEach((r) => console.error('  x ' + r));
}
console.error(`\n${written} French twin(s) ${dry ? 'would be ' : ''}written, ${refused.length} refused`);
process.exit(refused.length ? 1 : 0);
