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

// ── English / French units (`meta.vietnamese: false`) ──────────────────────
// Year 7 from Maths Unit 4 and Science Unit 3 is English and French only, as
// the classroom decks are (src/utils/lang.js). Such a unit writes a `…Fr` twin
// beside every English string and no `…Vn` twin at all. The validator checks it
// in three steps: no Vietnamese anywhere (vnTwinPaths), the usual "needs a
// bilingual X" rules run on a copy whose French stands in the Vietnamese slots
// (vnShadow, so every required-twin rule now requires French), and no English
// string left without French where the unit translates that field elsewhere
// (enFrProblems).

/** The Vietnamese twin's key for a French one: `textFr` → `textVn`, `frDef` → `vnDef`, `fr` → `vn`. */
export function vnKeyOf(frKey) {
  if (/Fr$/.test(frKey)) return frKey.replace(/Fr$/, 'Vn');
  if (/^fr(?=[A-Z]|$)/.test(frKey)) return frKey.replace(/^fr/, 'vn');
  return null;
}

// Words outside the maths, not counting unit symbols (cm, kg, min), which are
// the same in every language.
const UNIT_SYMBOLS = /\b(?:mm|cm|km|mg|kg|ml|min|kN|Hz)\b/g;
const hasWords = (s) => typeof s === 'string'
  && /[A-Za-z]{2,}/.test(s.replace(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g, '').replace(UNIT_SYMBOLS, ''));
const hasText = (v) => (typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) && v.some((x) => typeof x === 'string' && x.trim()));

/** Where a unit carries Vietnamese — every non-empty `…Vn` / `vn…` field. */
export function vnTwinPaths(root) {
  const out = [];
  const seen = new Set();
  const walk = (node, at) => {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${at}[${i}]`)); return; }
    if (!isPlain(node)) return;
    for (const [k, v] of Object.entries(node)) {
      if (frKeyOf(k) && hasText(v)) out.push(`${at}.${k}`);
      walk(v, `${at}.${k}`);
    }
  };
  walk(root, 'unit');
  return out;
}

/**
 * A copy of the unit with each French twin also written into its Vietnamese
 * slot, so a rule that demands `qVn` is satisfied by `qFr` — and fails, naming
 * `qVn`, when the French is missing. Plain objects and arrays are copied;
 * functions, components and anything else are shared, untouched.
 */
export function vnShadow(root) {
  const memo = new Map();
  const copy = (node) => {
    if (!node || typeof node !== 'object') return node;
    if (memo.has(node)) return memo.get(node);
    if (Array.isArray(node)) {
      const out = [];
      memo.set(node, out);
      node.forEach((v) => out.push(copy(v)));
      return out;
    }
    if (!isPlain(node)) return node;
    const out = {};
    memo.set(node, out);
    for (const [k, v] of Object.entries(node)) out[k] = copy(v);
    for (const [k, v] of Object.entries(node)) {
      const vk = vnKeyOf(k);
      if (vk && !(vk in node)) out[vk] = copy(v);
    }
    return out;
  };
  return copy(root);
}

/** The keys a French twin of English field `k` may have. */
function frCandidates(k) {
  const c = [`${k}Fr`, `fr${k[0].toUpperCase()}${k.slice(1)}`];
  if (/En$/.test(k)) c.push(k.replace(/En$/, 'Fr'));
  if (['en', 'word', 'term', 'name', 'text', 'label'].includes(k)) c.push('fr');
  if (['question', 'q', 'prompt'].includes(k)) c.push('frTranslation');
  return c;
}
const isTwinKey = (k) => !!(frKeyOf(k) || vnKeyOf(k));

// Every plain object under `root` with its path, indices blanked (`notes[3]` →
// `notes[]`), so one field in every slide or question shares a path.
function objectsOf(root) {
  const out = [];
  const seen = new Set();
  const walk = (node, at) => {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${at}[${i}]`)); return; }
    if (!isPlain(node)) return;
    out.push([node, at]);
    for (const [k, v] of Object.entries(node)) if (!(at === 'unit' && k === 'meta')) walk(v, `${at}.${k}`);
  };
  walk(root, 'unit');
  return out;
}
const shapeOf = (at) => at.replace(/\[\d+\]/g, '[]');

/**
 * The fields a unit translates, as path shapes (`unit.notes[].check.q`): every
 * English field with a French or Vietnamese twin beside it. The validator
 * gathers these from every unit of the French tracks, so an English / French
 * unit is held to what the trilingual units already translate.
 */
export function translatedShapes(root, into = new Set()) {
  for (const [o, at] of objectsOf(root)) {
    for (const k of Object.keys(o)) {
      if (isTwinKey(k)) continue;
      if (frCandidates(k).some((c) => c in o) || frCandidates(k).some((c) => vnKeyOf(c) && vnKeyOf(c) in o)) into.add(`${shapeOf(at)}.${k}`);
    }
  }
  return into;
}

/**
 * English left untranslated in an English / French unit: a string field with
 * words in it and no French twin beside it, where that field — the same path
 * shape — is translated in this unit or in `reference` (translatedShapes of
 * the trilingual units). So a slide title or a check option must have its
 * French; an id, a colour, an answer key or a phase title need not. `meta` is
 * skipped; the unit card shows the English title.
 */
export function enFrProblems(root, reference = new Set()) {
  const local = translatedShapes(root);
  const problems = [];
  for (const [o, at] of objectsOf(root)) {
    for (const [k, v] of Object.entries(o)) {
      if (isTwinKey(k)) continue;
      const shape = `${shapeOf(at)}.${k}`;
      if (!local.has(shape) && !reference.has(shape)) continue;
      const words = typeof v === 'string' ? hasWords(v) : Array.isArray(v) && v.some(hasWords);
      if (!words || frCandidates(k).some((c) => c in o)) continue;
      const snip = (typeof v === 'string' ? v : v.filter((x) => typeof x === 'string').join(' ')).slice(0, 40);
      problems.push(`${at}.${k} has no French twin ("${snip}")`);
    }
  }
  return problems;
}
