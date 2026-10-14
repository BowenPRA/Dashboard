// Shared machinery for scripts/french/extract.mjs and apply.mjs.
//
// A unit's source is parsed (acorn + JSX), every object property that is a
// Vietnamese twin (`textVn`, `vnDef`, `vn` …) and has no French twin beside it
// becomes an ENTRY: its English sibling, its Vietnamese, and an id that is a
// hash of the key and the Vietnamese source — stable while other entries are
// filled, so a translation file can be applied in pieces.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import * as acorn from 'acorn';
import jsx from 'acorn-jsx';
import { frKeyOf } from '../../src/utils/lang.js';
import { enKeyOf } from '../../src/utils/langCheck.js';

const Parser = acorn.Parser.extend(jsx());
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');

export function parse(src) {
  return Parser.parse(src, { ecmaVersion: 'latest', sourceType: 'module', locations: true, allowHashBang: true });
}

/** Every node of an acorn tree, depth first. */
export function* nodes(n) {
  if (!n || typeof n.type !== 'string') return;
  yield n;
  for (const k of Object.keys(n)) {
    if (k === 'loc' || k === 'start' || k === 'end') continue;
    const v = n[k];
    if (Array.isArray(v)) for (const c of v) yield* nodes(c);
    else if (v && typeof v.type === 'string') yield* nodes(v);
  }
}

export const keyName = (p) => {
  if (p.type !== 'Property' || p.computed) return null;
  if (p.key.type === 'Identifier') return p.key.name;
  if (p.key.type === 'Literal' && typeof p.key.value === 'string') return p.key.value;
  return null;
};

/** A string, an array of strings, or `{ js }` (the raw source) when it is not static. */
export function staticValue(node, src) {
  const str = (n) => {
    if (n.type === 'Literal' && typeof n.value === 'string') return n.value;
    if (n.type === 'TemplateLiteral' && n.expressions.length === 0) return n.quasis.map((q) => q.value.cooked).join('');
    if (n.type === 'BinaryExpression' && n.operator === '+') {
      const a = str(n.left); const b = str(n.right);
      return a !== null && b !== null ? a + b : null;
    }
    return null;
  };
  const s = str(node);
  if (s !== null) return s;
  if (node.type === 'ArrayExpression' && node.elements.every((e) => e && str(e) !== null)) return node.elements.map(str);
  return { js: src.slice(node.start, node.end) };
}

/** The entries of one file: Vietnamese twins with no French twin beside them. */
export function entriesOf(file, src = fs.readFileSync(file, 'utf8')) {
  const ast = parse(src);
  const out = [];
  const seenIds = new Map();
  const push = (seed, e) => {
    const base = crypto.createHash('sha1').update(seed).digest('hex').slice(0, 8);
    const nth = (seenIds.get(base) || 0) + 1;
    seenIds.set(base, nth);
    out.push({ id: nth > 1 ? `${base}-${nth}` : base, ...e });
  };
  for (const n of nodes(ast)) {
    // A widget's interface text: `pick(lang, 'English', 'Vietnamese')` (or
    // `tr(…)`) with no French yet. The French goes in as a fourth argument,
    // after the Vietnamese one (`prop`). `pick(on, colour, ghost)` and the
    // like are not language picks — the first argument must be `lang`.
    if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && /^(pick|tr)$/.test(n.callee.name)
      && n.arguments.length === 3 && n.arguments[0].type === 'Identifier' && n.arguments[0].name === 'lang') {
      const [, enArg, vnArg] = n.arguments;
      const vn = staticValue(vnArg, src);
      if (typeof vn === 'string' && !vn.trim()) continue;
      push(`call\0${src.slice(enArg.start, vnArg.end)}`, {
        line: vnArg.loc.start.line,
        key: `${n.callee.name}()`,
        frKey: null,
        en: staticValue(enArg, src),
        vn,
        kind: typeof vn === 'string' ? 'string' : Array.isArray(vn) ? 'array' : 'js',
        prop: vnArg,
      });
      continue;
    }
    if (n.type !== 'ObjectExpression') continue;
    const props = n.properties.filter((p) => keyName(p));
    const names = new Set(props.map(keyName));
    const shape = Object.fromEntries(props.map((p) => [keyName(p), true]));
    for (const p of props) {
      const k = keyName(p);
      const fk = frKeyOf(k);
      if (!fk || names.has(fk)) continue;
      const vn = staticValue(p.value, src);
      if (typeof vn === 'string' && !vn.trim()) continue;
      if (Array.isArray(vn) && !vn.length) continue;
      const ek = enKeyOf(k, shape);
      const enProp = ek ? props.find((q) => keyName(q) === ek) : null;
      const raw = src.slice(p.value.start, p.value.end);
      push(`${k}\0${raw}`, {
        line: p.loc.start.line,
        key: k,
        frKey: fk,
        en: enProp ? staticValue(enProp.value, src) : null,
        vn,
        kind: typeof vn === 'string' ? 'string' : Array.isArray(vn) ? 'array' : 'js',
        prop: p,
      });
    }
  }
  return out;
}

/** `Y7_MATH/U01_1`, a unit folder, or a file → the .js/.jsx files to work on. */
export function filesOf(args) {
  const files = [];
  for (const a of args) {
    let p = path.resolve(ROOT, a);
    if (!fs.existsSync(p)) p = path.resolve(ROOT, 'src/data', a);
    if (!fs.existsSync(p)) throw new Error(`no such file or unit: ${a}`);
    const walk = (d) => {
      for (const f of fs.readdirSync(d).sort()) {
        const full = path.join(d, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (/\.jsx?$/.test(f)) files.push(full);
      }
    };
    if (fs.statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
  return files;
}

/**
 * A translation memory from the classroom decks (../lessons), which carry
 * French for the same Year 7 lessons these units were reduced from: English
 * string → { fr, vn }. Read from `…Fr` twins and from `tr(lang, en, vn, fr)`
 * calls with literal arguments.
 */
export function classroomMemory() {
  const dir = path.resolve(ROOT, '../lessons/content');
  const tm = new Map();
  if (!fs.existsSync(dir)) return tm;
  const add = (en, vn, fr) => {
    if (typeof en === 'string' && typeof fr === 'string' && en.trim() && fr.trim() && !tm.has(en)) tm.set(en, { fr, vn: typeof vn === 'string' ? vn : null });
  };
  for (const course of ['y7-math', 'y7-science']) {
    const cdir = path.join(dir, course);
    if (!fs.existsSync(cdir)) continue;
    for (const lesson of fs.readdirSync(cdir)) {
      const ldir = path.join(cdir, lesson);
      if (!fs.statSync(ldir).isDirectory()) continue;
      for (const f of fs.readdirSync(ldir).filter((x) => /\.jsx?$/.test(x))) {
        const src = fs.readFileSync(path.join(ldir, f), 'utf8');
        let ast;
        try { ast = parse(src); } catch { continue; }
        for (const n of nodes(ast)) {
          if (n.type === 'ObjectExpression') {
            const props = Object.fromEntries(n.properties.filter((p) => keyName(p)).map((p) => [keyName(p), p]));
            for (const [k, p] of Object.entries(props)) {
              if (!/Fr$/.test(k)) continue;
              const base = k.replace(/Fr$/, '');
              if (props[base]) add(staticValue(props[base].value, src), props[`${base}Vn`] && staticValue(props[`${base}Vn`].value, src), staticValue(p.value, src));
            }
          } else if (n.type === 'CallExpression' && n.arguments.length === 4 && n.callee.type === 'Identifier') {
            const [, en, vn, fr] = n.arguments.map((a) => staticValue(a, src));
            add(en, vn, fr);
          }
        }
      }
    }
  }
  return tm;
}

/** A JS string literal for `s`, quoted the way that needs the fewest escapes. */
export function jsString(s) {
  const esc = (t) => t.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  if (!s.includes("'")) return `'${esc(s)}'`;
  if (!s.includes('"')) return `"${esc(s)}"`;
  return `'${esc(s).replace(/'/g, "\\'")}'`;
}
