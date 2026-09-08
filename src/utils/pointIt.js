// src/utils/pointIt.js
//
// The derivation behind the POINT_IT task (Find It). The student is shown an
// authored picture of an application window and asked to point at a part of it:
// "Click the address bar." Correctness is DERIVED from which region the click
// landed in — the same derive-don't-store rule Number Gym, Graph It, Equations
// and Energy Diagrams follow. There is no stored answer beyond `target`, which
// is a region id this module resolves; an id that names no region is an
// authoring bug, and `checkItem` refuses it before it can ship as a prompt the
// student cannot possibly pass.
//
// GEOMETRY. Everything is in the item's own `viewBox` units, so the picture and
// its hit regions scale together and the task behaves the same on a laptop and
// on the tablet a nine-year-old is actually holding (see
// docs/digital-skills-course.md §5.5). A region's `rect` is [x, y, w, h].
//
// OVERLAP. Interfaces nest — a search box sits inside a page, which sits inside
// a window — so regions are allowed to contain one another and the SMALLEST
// region containing the point wins. That is what makes "click the search box on
// the page" reachable even though the whole page is also a region. What is not
// allowed is a PARTIAL overlap, where neither region contains the other: a click
// in the shared sliver would be graded by whichever rectangle happened to be
// smaller, which is a coin toss the author never intended. `checkItem` errors on
// those.

/** A region's rect as { x, y, w, h }, or null if it isn't four finite numbers. */
export function rectOf(region) {
  const r = region?.rect;
  if (!Array.isArray(r) || r.length !== 4) return null;
  const [x, y, w, h] = r.map(Number);
  if (![x, y, w, h].every(Number.isFinite)) return null;
  return { x, y, w, h };
}

/** The item's viewBox as { x, y, w, h }, or null if it doesn't parse. */
export function viewBoxOf(item) {
  const parts = String(item?.viewBox || '').trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || !parts.every(Number.isFinite)) return null;
  const [x, y, w, h] = parts;
  if (!(w > 0) || !(h > 0)) return null;
  return { x, y, w, h };
}

const contains = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
const area = (r) => r.w * r.h;

/**
 * Which region a point in viewBox coordinates lands in, or null for a click on
 * bare background. Smallest match wins, so a control drawn on top of a panel is
 * reachable even though the panel is a region too.
 */
export function regionAt(item, x, y) {
  let best = null;
  let bestArea = Infinity;
  for (const region of item?.regions || []) {
    const r = rectOf(region);
    if (!r || !contains(r, x, y)) continue;
    if (area(r) < bestArea) { best = region; bestArea = area(r); }
  }
  return best;
}

/** The region an id names, or undefined. */
export const regionById = (item, id) => (item?.regions || []).find((r) => r.id === id);

/**
 * Grade one click. `correct` is derived from the region hit, never compared
 * against anything stored; `hit` is handed back so the task can name what the
 * student actually pressed, which is the whole lesson ("that's the search box
 * inside the page, not the address bar").
 */
export function gradeClick(item, prompt, x, y) {
  const hit = regionAt(item, x, y);
  return { hit, correct: !!hit && hit.id === prompt?.target };
}

/**
 * A region is only usable if a child can hit it with a fingertip. Expressed as a
 * share of the viewBox rather than pixels, because the picture is scaled to
 * whatever width it is given — 2.5% of an 800-unit-wide interface is a 20-unit
 * target, about the size of a toolbar icon, and that is the floor.
 */
export const MIN_REGION_FRACTION = 0.025;

/**
 * Validate one authored POINT_IT item. Returns a list of problem strings (empty
 * = OK). The important one is the last check: a prompt whose `target` names no
 * region renders as a prompt with no correct answer, and nothing about reading
 * the data makes that visible.
 */
export function checkItem(item) {
  const problems = [];
  const id = item?.id || '(no id)';
  if (!item?.id) problems.push(`${id}: item has no id`);

  const vb = viewBoxOf(item);
  if (!vb) {
    problems.push(`${id}: viewBox "${item?.viewBox}" must be four numbers "x y w h" with positive width and height`);
  }
  const svg = String(item?.svg || '');
  if (!svg.includes('<svg')) {
    problems.push(`${id}: svg is missing — there is no interface to point at`);
  } else {
    // The overlay that catches clicks carries `item.viewBox`; the picture
    // carries its own. If the two disagree the regions sit a little away from
    // the things they name, and nothing about the rendered page says so.
    const drawn = /viewBox="([^"]+)"/.exec(svg)?.[1];
    const same = (a, b) => {
      const n = (s) => String(s).trim().split(/[\s,]+/).map(Number);
      const [p, q] = [n(a), n(b)];
      return p.length === 4 && q.length === 4 && p.every((v, i) => v === q[i]);
    };
    if (drawn && item?.viewBox && !same(drawn, item.viewBox)) {
      problems.push(`${id}: viewBox "${item.viewBox}" does not match the svg's own "${drawn}" — the regions will not line up`);
    }
  }

  const regions = item?.regions || [];
  if (!regions.length) problems.push(`${id}: no regions — nothing is clickable`);

  const seen = new Set();
  const rects = new Map();
  for (const region of regions) {
    const at = `${id}: region ${region?.id || '(no id)'}`;
    if (!region?.id) problems.push(`${id}: a region has no id`);
    else if (seen.has(region.id)) problems.push(`${at}: duplicate region id`);
    else seen.add(region.id);

    // The label is what a misfire and the reveal both say out loud, so it is
    // required, and this track is bilingual (see the track registry entry).
    if (!region?.label) problems.push(`${at} has no label`);
    if (!region?.labelVn) problems.push(`${at} has no Vietnamese label (labelVn)`);

    const r = rectOf(region);
    if (!r) { problems.push(`${at}: rect must be [x, y, w, h] — four numbers`); continue; }
    if (!(r.w > 0) || !(r.h > 0)) { problems.push(`${at}: rect ${JSON.stringify(region.rect)} has no area`); continue; }
    rects.set(region.id, r);

    if (vb) {
      if (r.x < vb.x || r.y < vb.y || r.x + r.w > vb.x + vb.w || r.y + r.h > vb.y + vb.h) {
        problems.push(`${at}: rect ${JSON.stringify(region.rect)} falls outside the viewBox "${item.viewBox}"`);
      }
      const minW = vb.w * MIN_REGION_FRACTION;
      const minH = vb.h * MIN_REGION_FRACTION;
      if (r.w < minW || r.h < minH) {
        problems.push(
          `${at}: ${r.w}×${r.h} is under ${(MIN_REGION_FRACTION * 100).toFixed(1)}% of the viewBox ` +
          `(${minW.toFixed(0)}×${minH.toFixed(0)}) — too small for a fingertip`
        );
      }
    }
  }

  // Partial overlaps: ambiguous, because smallest-wins picks between them.
  const entries = [...rects.entries()];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [aId, a] = entries[i];
      const [bId, b] = entries[j];
      const overlaps = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
      if (!overlaps) continue;
      const inside = (p, q) => p.x >= q.x && p.y >= q.y && p.x + p.w <= q.x + q.w && p.y + p.h <= q.y + q.h;
      if (!inside(a, b) && !inside(b, a)) {
        problems.push(
          `${id}: regions ${aId} and ${bId} partly overlap — a click in the shared area could be graded as either. ` +
          `Nest one fully inside the other, or pull them apart.`
        );
      }
    }
  }

  const prompts = item?.prompts || [];
  if (!prompts.length) problems.push(`${id}: no prompts — the picture is never asked about`);
  for (const p of prompts) {
    const at = `${id}: prompt "${p?.ask || '(no ask)'}"`;
    if (!p?.ask) problems.push(`${id}: a prompt has no ask`);
    if (!p?.askVn) problems.push(`${at} has no Vietnamese ask (askVn)`);
    if (!p?.target) problems.push(`${at} names no target region`);
    else if (!seen.has(p.target)) {
      problems.push(`${at}: target "${p.target}" is not a region on this item — the prompt can never be passed`);
    }
  }

  return problems;
}

/** Every problem across a unit's `pointIt` array. */
export function checkAll(items) {
  return (items || []).flatMap(checkItem);
}
