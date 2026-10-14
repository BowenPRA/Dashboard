// The French-twin check for a `french: true` track (src/utils/lang.js). Used
// by the validator on every unit's data, and by scripts/french/* while a unit
// is being translated. Pure: no React, no app imports.
import { frKeyOf } from './lang.js';

/**
 * The English field a Vietnamese twin translates. Suffix twins drop the `Vn`
 * (`textVn` → `text`); the older prefix twins name theirs here. `null` when the
 * object has none — the French is then compared with the Vietnamese instead.
 */
export function enKeyOf(vnKey, obj) {
  if (/Vn$/.test(vnKey)) {
    // `expVn` sits beside `expEn` (the check and quiz explanations).
    const k = vnKey.replace(/Vn$/, '');
    return [k, `${k}En`].find((c) => c in obj) || null;
  }
  const rest = vnKey.replace(/^vn/, '');
  const candidates = rest
    ? [rest[0].toLowerCase() + rest.slice(1)]
    : ['en', 'word', 'term', 'name', 'text', 'label'];
  if (vnKey === 'vnTranslation') candidates.push('question', 'q', 'prompt');
  return candidates.find((k) => k in obj) || null;
}

/**
 * Every `$…$` / `$$…$$` span of a string, joined — the maths, which is the
 * same in every language. Words inside `\text{…}` are prose and may be
 * translated, so they are blanked; spacing is not compared.
 */
export function mathsOf(s) {
  if (typeof s !== 'string') return '';
  return (s.match(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g) || [])
    .map((m) => m.replace(/\\text\{[^}]*\}/g, '\\text{}').replace(/\s+/g, ''))
    .join(' ');
}

const isPlain = (v) => v && typeof v === 'object' && !Array.isArray(v) && !v.$$typeof;

/**
 * Problems with the French twins under `root`, as readable strings. A twin is
 * needed wherever a non-empty Vietnamese string or string array sits; it must
 * be the same shape, and carry the same maths as the English (or, with no
 * English sibling, the Vietnamese).
 */
export function frenchProblems(root) {
  const problems = [];
  const seen = new Set();
  const walk = (node, at) => {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${at}[${i}]`)); return; }
    if (!isPlain(node)) return;
    for (const [k, v] of Object.entries(node)) {
      const fk = frKeyOf(k);
      if (fk && (typeof v === 'string' ? v.trim() : Array.isArray(v) && v.some((x) => typeof x === 'string'))) {
        const fr = node[fk];
        const ek = enKeyOf(k, node);
        const ref = ek ? node[ek] : v;
        const where = `${at}.${fk}`;
        const snip = (typeof v === 'string' ? v : v.join(' ')).slice(0, 40);
        if (Array.isArray(v)) {
          if (!Array.isArray(fr)) problems.push(`${where} is missing (beside "${snip}")`);
          else if (fr.length !== v.length) problems.push(`${where} has ${fr.length} entries, ${k} has ${v.length}`);
          else fr.forEach((x, i) => {
            const r = Array.isArray(ref) ? ref[i] : v[i];
            // A fill-in sentence's pieces may be '' on purpose (a blank at the
            // very start or end); the French is only owed where the VN has words.
            if (typeof v[i] === 'string' && v[i].trim() && !(typeof x === 'string' && x.trim())) problems.push(`${where}[${i}] is empty`);
            else if (typeof x !== 'string' && typeof v[i] === 'string') problems.push(`${where}[${i}] is not a string`);
            else if (typeof x === 'string' && mathsOf(x) !== mathsOf(r)) problems.push(`${where}[${i}] maths "${mathsOf(x)}" differs from "${mathsOf(r)}"`);
          });
        } else if (!(typeof fr === 'string' && fr.trim())) {
          problems.push(`${where} is missing (beside "${snip}")`);
        } else if (mathsOf(fr) !== mathsOf(typeof ref === 'string' ? ref : v)) {
          problems.push(`${where} maths "${mathsOf(fr)}" differs from "${mathsOf(typeof ref === 'string' ? ref : v)}"`);
        }
      }
      walk(v, `${at}.${k}`);
    }
  };
  walk(root, 'unit');
  return problems;
}

/**
 * Source-level slips in a unit's own code (widgets.jsx and friends): a
 * two-language test or picker can never show French. Returns line-tagged
 * problems for one file's text.
 */
export function frenchSourceProblems(src, file) {
  const out = [];
  src.split('\n').forEach((line, i) => {
    // A line that also names French is a three-way test written out by hand.
    if (/===?\s*['"]vn['"]|['"]vn['"]\s*===?/.test(line) && !/['"]fr['"]/.test(line)) out.push(`${file}:${i + 1} tests lang === 'vn' — use tr(lang, en, vn, fr)`);
    else if (/\(\s*lang\s*,\s*en\s*,\s*vn\s*\)/.test(line)) out.push(`${file}:${i + 1} defines a two-language picker — use tr(lang, en, vn, fr)`);
  });
  return out;
}
