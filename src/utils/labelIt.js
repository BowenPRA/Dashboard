/**
 * Label It — the pure parts. `LabelIt.jsx` renders; this file strips the
 * printed labels off an authored diagram, grades a set of placements, and
 * checks an item's data for the validator.
 *
 * Item shape (docs/y7-science/ENGAGEMENT-PLAN.md §2.2):
 *   { id, title, titleVn, inlineSvg, viewBox: '0 0 760 430',
 *     pins: [{ id, x, y, answer }],          // answer = a bank `val`
 *     bank: [{ val, text, textVn }] }        // at least one distractor is good
 */

/** Remove every <text> element (and its content) from an SVG string. */
export function stripLabels(svg) {
  return String(svg || '')
    .replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, '')
    .replace(/<text\b[^>]*\/>/g, '');
}

/** The viewBox a pin's coordinates live in, parsed. */
export function viewBoxOf(item) {
  const src = item?.viewBox || (String(item?.inlineSvg || '').match(/viewBox="([^"]+)"/) || [])[1];
  if (!src) return null;
  const [x, y, w, h] = String(src).split(/[\s,]+/).map(Number);
  if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return null;
  return { x, y, w, h, str: `${x} ${y} ${w} ${h}` };
}

/** Grade placements `{ pinId: val }` → `{ perPin: { [pinId]: boolean }, correct, total }`. */
export function grade(item, placements = {}) {
  const perPin = {};
  let correct = 0;
  for (const pin of item.pins || []) {
    const ok = placements[pin.id] != null && placements[pin.id] === pin.answer;
    perPin[pin.id] = ok;
    if (ok) correct += 1;
  }
  return { perPin, correct, total: (item.pins || []).length };
}

/** Problems with one item, as strings. Empty when it is sound. */
export function checkItem(item) {
  const out = [];
  if (!item || typeof item !== 'object') return ['item is not an object'];
  const at = item.id || '?';
  if (!item.id) out.push('has no id');
  if (!item.inlineSvg) out.push(`${at}: has no inlineSvg`);
  const vb = viewBoxOf(item);
  if (!vb) out.push(`${at}: no usable viewBox (set item.viewBox to match the svg)`);
  const bank = item.bank || [];
  if (bank.length < 2) out.push(`${at}: bank needs at least 2 labels`);
  const vals = new Set();
  for (const b of bank) {
    if (!b?.val || !b?.text) out.push(`${at}: bank entry needs val and text`);
    if (vals.has(b?.val)) out.push(`${at}: duplicate bank val "${b.val}"`);
    vals.add(b?.val);
  }
  const pins = item.pins || [];
  if (pins.length < 2) out.push(`${at}: needs at least 2 pins`);
  const pinIds = new Set();
  for (const p of pins) {
    if (!p?.id) out.push(`${at}: a pin has no id`);
    if (pinIds.has(p?.id)) out.push(`${at}: duplicate pin id "${p.id}"`);
    pinIds.add(p?.id);
    if (!Number.isFinite(p?.x) || !Number.isFinite(p?.y)) out.push(`${at}: pin ${p?.id} needs numeric x and y`);
    else if (vb && (p.x < vb.x || p.x > vb.x + vb.w || p.y < vb.y || p.y > vb.y + vb.h)) out.push(`${at}: pin ${p.id} (${p.x}, ${p.y}) is outside the viewBox`);
    if (!vals.has(p?.answer)) out.push(`${at}: pin ${p?.id} answer "${p?.answer}" is not in the bank`);
  }
  const answers = new Set(pins.map((p) => p.answer));
  if (bank.length <= answers.size) out.push(`${at}: no distractor — add a label that belongs to no pin`);
  return out;
}

export function checkAll(items) {
  if (!Array.isArray(items)) return ['labelIt must be an array'];
  const out = [];
  const ids = new Set();
  for (const it of items) {
    if (ids.has(it?.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    out.push(...checkItem(it));
  }
  return out;
}
