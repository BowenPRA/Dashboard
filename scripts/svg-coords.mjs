// Print the coordinates inside an authored SVG diagram, for placing LabelIt
// pins and hotspot targets without guessing.
//
//   node scripts/svg-coords.mjs Y7_SCI/U01_1 ANIMAL_CELL [diagramsB]
//
// Evaluates the unit's diagrams module (so `${FONT}`-style template values are
// real numbers), then lists the viewBox and every <text>, <line>, <circle> and
// <ellipse> with its position. A label's leader line ends where the part is —
// that end is where the pin goes.
import path from 'path';
import { pathToFileURL } from 'url';

const [, , unit, key, file = 'diagrams'] = process.argv;
if (!unit || !key) {
  console.error('usage: node scripts/svg-coords.mjs <TRACK/UNIT> <DIAGRAM_KEY> [diagrams|diagramsB]');
  process.exit(1);
}
const modPath = path.resolve('src/data', unit, `${file}.js`);
const mod = await import(pathToFileURL(modPath).href);
const svg = mod.DIAGRAMS?.[key];
if (!svg) {
  console.error(`no DIAGRAMS.${key} in ${modPath}; keys: ${Object.keys(mod.DIAGRAMS || {}).join(', ')}`);
  process.exit(1);
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
};
const vb = svg.match(/viewBox="([^"]+)"/);
console.log(`viewBox ${vb ? vb[1] : '?'}`);
for (const m of svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)) {
  const a = m[1];
  console.log(`text  x=${attr(a, 'x')} y=${attr(a, 'y')} anchor=${attr(a, 'text-anchor') || 'start'}  "${m[2].trim()}"`);
}
for (const m of svg.matchAll(/<line\b([^>]*)\/?>/g)) {
  const a = m[1];
  console.log(`line  (${attr(a, 'x1')},${attr(a, 'y1')}) -> (${attr(a, 'x2')},${attr(a, 'y2')})`);
}
for (const m of svg.matchAll(/<circle\b([^>]*)\/?>/g)) {
  const a = m[1];
  console.log(`circle cx=${attr(a, 'cx')} cy=${attr(a, 'cy')} r=${attr(a, 'r')} fill=${attr(a, 'fill')}`);
}
for (const m of svg.matchAll(/<ellipse\b([^>]*)\/?>/g)) {
  const a = m[1];
  console.log(`ellipse cx=${attr(a, 'cx')} cy=${attr(a, 'cy')} rx=${attr(a, 'rx')} ry=${attr(a, 'ry')} fill=${attr(a, 'fill')}`);
}
