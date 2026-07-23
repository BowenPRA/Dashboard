/**
 * SVG text-fit audit.
 *   A) text overflowing the viewBox
 *   B) text overflowing the <rect> it sits inside  <-- the usual visible bug
 * Width is estimated as chars * fontSize * glyphFactor for the sans-serif stack.
 */
import fs from 'fs';
import path from 'path';

const SRC = 'C:/Users/bowen/Dashboard/src/data';
const ONLY = process.argv[2];
const PAD = 6; // px of breathing room required inside a rect

const factor = (weight) => (weight === '900' ? 0.60 : weight === 'bold' ? 0.57 : 0.52);
const widthOf = (s, size, weight) => s.length * size * factor(weight);

/** Extract `KEY: \`...\`` template blocks by scanning for the closing backtick. */
function extractBlocks(src) {
  const out = [];
  const re = /^[ \t]*([A-Z_0-9]+):[ \t]*`/gm;
  let m;
  while ((m = re.exec(src))) {
    const start = re.lastIndex;
    let i = start;
    while (i < src.length) {
      if (src[i] === '\\') { i += 2; continue; }
      if (src[i] === '`') break;
      i++;
    }
    out.push([m[1], src.slice(start, i)]);
    re.lastIndex = i + 1;
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").trim();

function parseTexts(svg) {
  const out = [];
  for (const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = m[1];
    const content = decode(m[2]);
    if (!content) continue;
    out.push({
      content,
      x: Number(/\bx="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN),
      y: Number(/\by="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN),
      size: Number(/font-size="([\d.]+)"/.exec(a)?.[1] ?? 16),
      weight: /font-weight="([^"]+)"/.exec(a)?.[1] || 'normal',
      anchor: /text-anchor="([^"]+)"/.exec(a)?.[1] || 'start',
      rotated: /transform="[^"]*rotate/.test(a),
    });
  }
  return out;
}

function parseRects(svg) {
  const out = [];
  for (const m of svg.matchAll(/<rect\b([^>]*)\/?>/g)) {
    const a = m[1];
    const x = Number(/\bx="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN);
    const y = Number(/\by="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN);
    const w = Number(/\bwidth="([\d.]+)"/.exec(a)?.[1] ?? NaN);
    const h = Number(/\bheight="([\d.]+)"/.exec(a)?.[1] ?? NaN);
    if ([x, y, w, h].some(Number.isNaN)) continue;
    out.push({ x, y, w, h });
  }
  return out;
}

const bounds = (t) => {
  const w = widthOf(t.content, t.size, t.weight);
  if (t.anchor === 'middle') return [t.x - w / 2, t.x + w / 2];
  if (t.anchor === 'end') return [t.x - w, t.x];
  return [t.x, t.x + w];
};

const findings = [];

function audit(label, key, svg) {
  const vb = /viewBox="([\d.\-\s]+)"/.exec(svg);
  if (!vb) return;
  const [minX, , vw] = vb[1].trim().split(/\s+/).map(Number);
  const maxX = minX + vw;
  const rects = parseRects(svg);

  for (const t of parseTexts(svg)) {
    if (Number.isNaN(t.x) || t.rotated) continue;
    const [l, r] = bounds(t);

    // A) viewBox overflow
    const over = [];
    if (l < minX - 1) over.push(`${Math.round(minX - l)}px past left edge`);
    if (r > maxX + 1) over.push(`${Math.round(r - maxX)}px past right edge`);
    if (over.length) {
      findings.push({ label, key, kind: 'FRAME', msg: `"${t.content.slice(0, 46)}" ${over.join(' and ')}` });
      continue;
    }

    // B) overflows the smallest rect that contains its anchor point
    if (Number.isNaN(t.y)) continue;
    const holders = rects
      .filter((c) => t.x >= c.x && t.x <= c.x + c.w && t.y >= c.y - t.size && t.y <= c.y + c.h + 2)
      .sort((a, b) => a.w * a.h - b.w * b.h);
    const box = holders[0];
    if (!box) continue;
    const slackL = l - box.x;
    const slackR = box.x + box.w - r;
    if (slackL < PAD || slackR < PAD) {
      const amt = Math.round(Math.max(PAD - slackL, PAD - slackR));
      findings.push({
        label, key, kind: 'BOX',
        msg: `"${t.content.slice(0, 46)}${t.content.length > 46 ? '…' : ''}" (${t.size}px) needs ~${Math.round(widthOf(t.content, t.size, t.weight))}px in a ${box.w}px box — short by ${amt}px`,
      });
    }
  }
}

for (const track of fs.readdirSync(SRC)) {
  if (ONLY && track !== ONLY) continue;
  const tp = path.join(SRC, track);
  if (!fs.statSync(tp).isDirectory()) continue;
  for (const unit of fs.readdirSync(tp)) {
    const dir = path.join(tp, unit);
    if (!fs.statSync(dir).isDirectory()) continue;

    const dg = path.join(dir, 'diagrams.js');
    if (fs.existsSync(dg)) {
      for (const [key, svg] of extractBlocks(fs.readFileSync(dg, 'utf8'))) audit(`${track}/${unit}`, key, svg);
    }
    for (const f of ['assessment.js', 'notes.js']) {
      const p = path.join(dir, f);
      if (!fs.existsSync(p)) continue;
      const src = fs.readFileSync(p, 'utf8');
      let i = 0;
      for (const m of src.matchAll(/inlineSvg:\s*`([\s\S]*?)`,\n/g)) audit(`${track}/${unit}`, `${f} inline #${++i}`, m[1]);
    }
  }
}

const byUnit = {};
for (const f of findings) (byUnit[f.label] ||= []).push(f);
for (const u of Object.keys(byUnit).sort()) {
  const frame = byUnit[u].filter((f) => f.kind === 'FRAME');
  const box = byUnit[u].filter((f) => f.kind === 'BOX');
  console.log(`\n${u}   ${frame.length} frame, ${box.length} box`);
  for (const f of [...frame, ...box]) console.log(`  [${f.kind}] ${f.key.padEnd(28)} ${f.msg}`);
}
console.log(`\ntotal: ${findings.filter((f) => f.kind === 'FRAME').length} frame overflows, ${findings.filter((f) => f.kind === 'BOX').length} box overflows`);
