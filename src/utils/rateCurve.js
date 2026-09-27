// src/utils/rateCurve.js
//
// The derivation behind the RATE_GRAPH task (Rate Reader). An item states an
// experiment as its RESULTS — the points a student would have plotted — and a
// list of things to read off the curve. Every answer is worked out here from
// those points:
//
//   read      the amount at a given time         up from the time, across
//   timeFor   the time to reach a given amount   across from the amount, down
//   interval  the rate during one interval       end reading − start reading
//   end       when the reaction finished         where the curve goes flat
//   total     how much was made altogether       the height of the flat part
//   average   the average rate                   total ÷ time taken
//   steepest  the interval with the highest rate
//   compare   which of two curves was faster, or made more
//   why       why the curve goes flat            the reactant NOT in excess
//
// so an author cannot ship a reading the graph does not show. The curve is
// drawn with the same monotone interpolation the readings use, which means the
// dot the student drags is always ON the line and a flat run stays flat — a
// plain spline overshoots at the shoulder and draws a reaction that un-reacts.
//
// A reading is marked to half a small square, as a mark scheme marks it. A rate
// is marked against the true value OR against the student's own two readings,
// so one slightly-off reading is not punished twice.

const EPS = 1e-9;

/** Tangents for a monotone cubic through the points (Fritsch–Carlson). */
function tangents(pts) {
  const n = pts.length;
  const d = [];
  for (let i = 0; i < n - 1; i++) d.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
  const m = new Array(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(d[i]) < EPS) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * d[i];
      m[i + 1] = t * b * d[i];
    }
  }
  return m;
}

/** The curve's height at any x inside its range. Exact at every data point. */
export function valueAt(points, x) {
  const pts = points;
  if (x <= pts[0][0]) return pts[0][1];
  if (x >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  const m = tangents(pts);
  let i = 0;
  while (i < pts.length - 2 && x > pts[i + 1][0]) i++;
  const [x0, y0] = pts[i];
  const [x1, y1] = pts[i + 1];
  const h = x1 - x0;
  const t = (x - x0) / h;
  const t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * h * m[i]
    + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * h * m[i + 1];
}

/** The same curve as cubic Bézier segments, in data units, for the SVG path. */
export function bezierOf(points) {
  const m = tangents(points);
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const h = x1 - x0;
    out.push([[x0 + h / 3, y0 + (m[i] * h) / 3], [x1 - h / 3, y1 - (m[i + 1] * h) / 3], [x1, y1]]);
  }
  return out;
}

// A calculated answer has no reading error of its own: it is right to 1%, or
// right for the student's own readings (see markBoxes).
const exact = (v) => Math.max(0.005, Math.abs(v) * 0.01);
const pointAt = (points, x) => points.find((p) => Math.abs(p[0] - x) < EPS);
const round = (v, dp = 4) => Math.round(v * 10 ** dp) / 10 ** dp;

/** How much was made altogether: the height the curve finishes at. */
export const totalOf = (points) => points[points.length - 1][1];

/** When the reaction finished: the first result that reads the final amount. */
export function endOf(points) {
  const last = totalOf(points);
  return points.find((p) => Math.abs(p[1] - last) < EPS)[0];
}

/** The rate over an interval: change in amount ÷ time taken. */
export function rateOver(points, from, to) {
  return round((pointAt(points, to)[1] - pointAt(points, from)[1]) / (to - from));
}

/** The average rate over the whole reaction: total ÷ time taken. */
export const averageOf = (points) => round(totalOf(points) / endOf(points));

/** The equal intervals the reaction ran through, until it finished. */
export function intervalsOf(points, width) {
  const out = [];
  const end = endOf(points);
  for (let a = points[0][0]; a + width <= end + width - EPS && pointAt(points, a + width); a += width) {
    if (!pointAt(points, a)) break;
    out.push({ from: round(a), to: round(a + width), rate: rateOver(points, a, a + width) });
  }
  return out;
}

const ORDINAL = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
const UNIT_WORD = { min: 'minute', s: 'second', h: 'hour' };
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

/** "the second minute", or "the time from 20 s to 30 s" when that is clearer. */
export function intervalName(item, from, to) {
  const u = item.x.unit;
  const width = round(to - from);
  if (width === 1 && Number.isInteger(to) && ORDINAL[to] && UNIT_WORD[u]) return `the ${ORDINAL[to]} ${UNIT_WORD[u]}`;
  if (from === 0 && UNIT_WORD[u]) return `the first ${plural(width, UNIT_WORD[u])}`;
  return `the time from ${from} ${u} to ${to} ${u}`;
}

/** Half a small square on each axis: how closely a reading has to be made. */
export function toleranceOf(item) {
  return {
    x: item.x.step / (item.x.minor || 1) / 2,
    y: item.y.step / (item.y.minor || 1) / 2,
  };
}

export const rateUnit = (item) => `${item.y.unit}/${item.x.unit}`;

/** The right unit for a rate, and the three slips that are usually written. */
export function unitChoices(item) {
  const { unit: xu } = item.x;
  const { unit: yu } = item.y;
  return [
    { val: `${yu}/${xu}`, ok: true },
    { val: `${xu}/${yu}`, why: `That is upside down. A rate is the amount made per unit of TIME, so the time unit goes underneath: ${yu}/${xu}.` },
    { val: yu, why: `${yu} is only an amount. A rate says how much in each ${UNIT_WORD[xu] || xu}: ${yu}/${xu}.` },
    { val: xu, why: `${xu} is only a time. A rate says how much in each ${UNIT_WORD[xu] || xu}: ${yu}/${xu}.` },
  ];
}

const curveOf = (item, id) => (item.curves || []).find((c) => c.id === id) || item.curves?.[0];
const named = (item, c) => ((item.curves || []).length > 1 ? ` for ${c.label || `curve ${c.id}`}` : '');
const stuff = (item) => item.quantity || item.y.label.toLowerCase();
const measure = (item) => item.y.label.toLowerCase();

/**
 * One ask, made ready to put on the screen.
 *   { kind, prompt, method, boxes: [{ key, label, answer, tol, unit }],
 *     options, correct, wantsUnit, guide: { curve, xs: [] , ys: [] }, explain }
 * `boxes` are typed answers; `options` make it a choice instead.
 */
export function deriveAsk(item, ask) {
  const tol = toleranceOf(item);
  const c = curveOf(item, ask.curve);
  const pts = c?.points || [];
  const xu = item.x.unit;
  const yu = item.y.unit;
  const base = { kind: ask.kind, id: ask.id, curve: c?.id };

  if (ask.kind === 'read') {
    const y = pointAt(pts, ask.at)[1];
    return {
      ...base,
      prompt: `What was the ${measure(item)} after ${ask.at} ${xu}${named(item, c)}?`,
      method: `Find ${ask.at} on the time axis. Go UP to the curve, then ACROSS to the ${item.y.label.toLowerCase()} axis.`,
      boxes: [{ key: 'v', label: item.y.label, answer: y, tol: tol.y, unit: yu }],
      guide: { curve: c.id, xs: [ask.at] },
      explain: `Up from ${ask.at} ${xu} to the curve, then across: ${y} ${yu}.`,
    };
  }

  if (ask.kind === 'timeFor') {
    const hit = pts.find((p) => Math.abs(p[1] - ask.value) < EPS);
    return {
      ...base,
      prompt: `How long did it take for the ${measure(item)} to reach ${ask.value} ${yu}${named(item, c)}?`,
      method: `This time start on the ${item.y.label.toLowerCase()} axis. Go ACROSS from ${ask.value} to the curve, then DOWN to the time axis.`,
      boxes: [{ key: 't', label: item.x.label, answer: hit[0], tol: tol.x, unit: xu }],
      guide: { curve: c.id, xs: [hit[0]] },
      explain: `Across from ${ask.value} ${yu} to the curve, then down: ${hit[0]} ${xu}.`,
    };
  }

  if (ask.kind === 'interval') {
    const y0 = pointAt(pts, ask.from)[1];
    const y1 = pointAt(pts, ask.to)[1];
    const width = round(ask.to - ask.from);
    const rate = rateOver(pts, ask.from, ask.to);
    return {
      ...base,
      prompt: `What was the rate of the reaction during ${intervalName(item, ask.from, ask.to)}${named(item, c)}?`,
      method: `Read the curve at the START and at the END of the interval. The rate is the end reading minus the start reading${width === 1 ? '' : `, divided by the ${plural(width, UNIT_WORD[xu] || xu)} it took`}.`,
      boxes: [
        { key: 'a', label: `Reading at ${ask.from} ${xu}`, answer: y0, tol: tol.y, unit: yu },
        { key: 'b', label: `Reading at ${ask.to} ${xu}`, answer: y1, tol: tol.y, unit: yu },
        { key: 'r', label: 'Rate', answer: rate, tol: exact(rate), from: ['a', 'b'], width, isRate: true },
      ],
      wantsUnit: true,
      guide: { curve: c.id, xs: [ask.from, ask.to] },
      explain: `${y1} − ${y0} = ${round(y1 - y0)} ${yu}${width === 1 ? ` in one ${UNIT_WORD[xu] || xu}` : ` in ${width} ${xu}`}, so the rate is ${rate} ${rateUnit(item)}.`,
    };
  }

  if (ask.kind === 'end') {
    const end = endOf(pts);
    return {
      ...base,
      prompt: `After how long was the reaction over${named(item, c)}?`,
      method: 'Find where the curve first goes FLAT. No more is being made from there on. Read the time underneath.',
      boxes: [{ key: 't', label: item.x.label, answer: end, tol: tol.x, unit: xu }],
      guide: { curve: c.id, xs: [end] },
      explain: `The curve goes flat at ${end} ${xu}: after that the reading stays at ${totalOf(pts)} ${yu}.`,
    };
  }

  if (ask.kind === 'total') {
    const total = totalOf(pts);
    return {
      ...base,
      prompt: `How much ${stuff(item)} was produced altogether${named(item, c)}?`,
      method: 'Read the height of the flat part of the curve.',
      boxes: [{ key: 'v', label: item.y.label, answer: total, tol: tol.y, unit: yu }],
      guide: { curve: c.id, xs: [endOf(pts)] },
      explain: `The curve levels off at ${total} ${yu}, so that is all the ${stuff(item)} the reaction made.`,
    };
  }

  if (ask.kind === 'average') {
    const total = totalOf(pts);
    const end = endOf(pts);
    const avg = averageOf(pts);
    return {
      ...base,
      prompt: `What was the AVERAGE rate of the whole reaction${named(item, c)}?`,
      method: 'Average rate = total amount produced ÷ total time the reaction took. Stop the clock where the curve goes flat.',
      boxes: [
        { key: 'a', label: `Total ${stuff(item)}`, answer: total, tol: tol.y, unit: yu },
        { key: 'b', label: 'Time taken', answer: end, tol: tol.x, unit: xu },
        { key: 'r', label: 'Average rate', answer: avg, tol: exact(avg), ratioOf: ['a', 'b'], isRate: true },
      ],
      wantsUnit: true,
      guide: { curve: c.id, xs: [end] },
      explain: `${total} ${yu} ÷ ${end} ${xu} = ${avg} ${rateUnit(item)}.`,
    };
  }

  if (ask.kind === 'steepest') {
    const width = ask.width || item.x.step;
    const runs = intervalsOf(pts, width).slice(0, 4);
    const best = runs.reduce((a, b) => (b.rate > a.rate ? b : a));
    return {
      ...base,
      prompt: `During which interval was the reaction FASTEST${named(item, c)}?`,
      method: 'The faster the reaction, the steeper the curve. Look for the steepest part.',
      options: runs.map((r) => ({
        val: `${r.from}-${r.to}`,
        text: `${intervalName(item, r.from, r.to).replace(/^the /, 'The ')}`,
        why: `The curve rises ${round(r.rate * width)} ${yu} there. It rises more than that in ${intervalName(item, best.from, best.to)}.`,
      })),
      correct: `${best.from}-${best.to}`,
      guide: { curve: c.id, xs: [best.from, best.to] },
      explain: `The curve is steepest in ${intervalName(item, best.from, best.to)}: it rises ${round(best.rate * width)} ${yu}, more than in any later interval. The rate is greatest at the start, when there is most reactant.`,
    };
  }

  if (ask.kind === 'compare') {
    const [a, b] = item.curves;
    const name = (k) => k.label || `Curve ${k.id}`;
    const opts = [
      { val: a.id, text: name(a) },
      { val: b.id, text: name(b) },
      { val: 'same', text: 'They were the same' },
    ];
    if (ask.what === 'amount') {
      const ta = totalOf(a.points), tb = totalOf(b.points);
      const correct = Math.abs(ta - tb) < EPS ? 'same' : ta > tb ? a.id : b.id;
      return {
        ...base,
        prompt: `Which experiment produced MORE ${stuff(item)} in the end?`,
        method: 'Compare the heights of the two flat parts — not how steep the curves are.',
        options: opts.map((o) => ({ ...o, why: 'Look at where each curve levels off. How steep it is tells you the rate, not the amount.' })),
        correct,
        guide: { curve: a.id, xs: [] },
        explain: correct === 'same'
          ? `Both curves level off at ${ta} ${yu}. The same amount of the reactant that ran out was used, so the same amount was made — one reaction just got there sooner.`
          : `${name(correct === a.id ? a : b)} levels off higher (${Math.max(ta, tb)} ${yu} against ${Math.min(ta, tb)} ${yu}).`,
      };
    }
    const ea = endOf(a.points), eb = endOf(b.points);
    const ra = totalOf(a.points) / ea, rb = totalOf(b.points) / eb;
    const first = a.points[1][0];
    const sa = rateOver(a.points, a.points[0][0], first);
    const sb = rateOver(b.points, b.points[0][0], b.points[1][0]);
    const correct = Math.abs(sa - sb) < EPS ? 'same' : sa > sb ? a.id : b.id;
    return {
      ...base,
      prompt: 'Which experiment was the FASTER reaction?',
      method: 'Compare how steep the two curves are at the start. The steeper curve is the faster reaction.',
      options: opts.map((o) => ({ ...o, why: 'The faster reaction has the STEEPER curve, and goes flat sooner. Compare the two at the start.' })),
      correct,
      guide: { curve: correct === 'same' ? a.id : correct, xs: [] },
      explain: correct === 'same' ? 'The two curves rise together.'
        : `${name(correct === a.id ? a : b)} is steeper at the start and finishes after ${correct === a.id ? ea : eb} ${xu}, against ${correct === a.id ? eb : ea} ${xu}. Its average rate is ${round(correct === a.id ? ra : rb, 2)} ${rateUnit(item)}.`,
    };
  }

  if (ask.kind === 'why') {
    const used = item.limiting;
    const spare = item.excess;
    return {
      ...base,
      prompt: `Why does the curve go flat${named(item, c)}?`,
      method: 'A flat curve means no more product is being made. What has to be true for the reaction to stop?',
      options: [
        { val: 'limiting', text: `All the ${used} has been used up`, why: '' },
        { val: 'excess', text: `All the ${spare} has been used up`, why: `The ${spare} is in EXCESS — there is more than enough of it, so some is left over at the end. It is the ${used} that runs out.` },
        { val: 'slow', text: 'The reaction is still going, but too slowly to see', why: `A flat line means the reading has stopped changing altogether. The reaction has finished, because the ${used} has run out.` },
        { val: 'full', text: 'The apparatus cannot measure any more', why: `The reading stops at ${totalOf(pts)} ${yu}, well inside what the apparatus can measure. The reaction has finished.` },
      ],
      correct: 'limiting',
      guide: { curve: c.id, xs: [endOf(pts)] },
      explain: `The ${spare} is in excess, so the ${used} runs out first. With no ${used} left there is nothing to react, no more ${stuff(item)} forms, and the curve goes flat.`,
    };
  }

  return { ...base, prompt: '', boxes: [] };
}

/**
 * Mark the typed boxes of one ask. `typed` is { key: number }.
 * A rate is right if it matches the truth, or if it follows correctly from the
 * student's own readings when those readings were themselves accepted.
 */
export function markBoxes(derived, typed) {
  const marks = {};
  for (const b of derived.boxes || []) {
    const v = Number(typed?.[b.key]);
    if (!Number.isFinite(v)) { marks[b.key] = false; continue; }
    let ok = Math.abs(v - b.answer) <= b.tol + EPS;
    const pair = b.from || b.ratioOf;
    if (!ok && pair && pair.every((k) => marks[k])) {
      const p = Number(typed[pair[0]]);
      const q = Number(typed[pair[1]]);
      const own = b.from ? (q - p) / b.width : p / q;
      ok = Number.isFinite(own) && Math.abs(v - own) <= Math.max(0.005, Math.abs(own) * 0.01) + EPS;
    }
    marks[b.key] = ok;
  }
  return marks;
}

const decimals = (v) => (String(v).split('.')[1] || '').length;

/** Problems with authored items, as strings. Empty when the pool is sound. */
export function checkRateItems(items) {
  const out = [];
  const seen = new Set();
  const KINDS = ['read', 'timeFor', 'interval', 'end', 'total', 'average', 'steepest', 'compare', 'why'];

  for (const item of items || []) {
    const id = item?.id || '(no id)';
    const say = (m) => out.push(`item ${id}: ${m}`);
    if (!item?.id) out.push('an item has no id');
    if (seen.has(id)) say('duplicate id');
    seen.add(id);
    if (!item?.name) say('needs a name');
    if (!item?.context) say('needs a context sentence (what was reacted, and what was measured)');

    let axesOk = true;
    for (const k of ['x', 'y']) {
      const ax = item?.[k];
      if (!ax?.label || !ax?.unit) { say(`${k} axis needs a label and a unit`); axesOk = false; continue; }
      if (!(ax.max > 0) || !(ax.step > 0)) { say(`${k} axis needs max and step above zero`); axesOk = false; continue; }
      if (Math.abs(ax.max / ax.step - Math.round(ax.max / ax.step)) > EPS) say(`${k} axis: max ${ax.max} is not a whole number of steps of ${ax.step}`);
      if (ax.max / ax.step > 12) say(`${k} axis: ${ax.max / ax.step} numbered lines will not fit — raise step`);
      if (ax.minor !== undefined && (!Number.isInteger(ax.minor) || ax.minor < 1 || ax.minor > 10)) say(`${k} axis: minor must be a whole number 1–10`);
    }
    if (!axesOk) continue;

    const curves = item.curves || [];
    if (!curves.length || curves.length > 2) { say('needs one or two curves'); continue; }
    let curvesOk = true;
    const ids = new Set();
    for (const c of curves) {
      if (!c?.id || ids.has(c.id)) { say('every curve needs its own id'); curvesOk = false; }
      ids.add(c?.id);
      if (curves.length > 1 && !c.label) say(`curve ${c.id} needs a label when there are two curves`);
      const pts = c?.points || [];
      if (pts.length < 4) { say(`curve ${c?.id}: needs at least 4 results`); curvesOk = false; continue; }
      for (let i = 0; i < pts.length; i++) {
        const [x, y] = pts[i];
        if (!Number.isFinite(x) || !Number.isFinite(y)) { say(`curve ${c.id}: result ${i} is not two numbers`); curvesOk = false; continue; }
        if (x < 0 || x > item.x.max || y < 0 || y > item.y.max) say(`curve ${c.id}: result (${x}, ${y}) is off the grid`);
        if (i > 0 && x <= pts[i - 1][0]) { say(`curve ${c.id}: times must increase (${pts[i - 1][0]} then ${x})`); curvesOk = false; }
        if (i > 0 && y < pts[i - 1][1] - EPS) say(`curve ${c.id}: the amount falls from ${pts[i - 1][1]} to ${y} — a product cannot un-form`);
      }
      if (!curvesOk) continue;
      if (pts[0][0] !== 0 || pts[0][1] !== 0) say(`curve ${c.id}: must start at (0, 0)`);
      // A reaction slows down: each interval's rate must not beat the one before.
      for (let i = 2; i < pts.length; i++) {
        const before = (pts[i - 1][1] - pts[i - 2][1]) / (pts[i - 1][0] - pts[i - 2][0]);
        const now = (pts[i][1] - pts[i - 1][1]) / (pts[i][0] - pts[i - 1][0]);
        if (now > before + EPS) say(`curve ${c.id}: the rate rises between ${pts[i - 1][0]} and ${pts[i][0]} — a reaction slows as it goes`);
      }
      const n = pts.length;
      if (Math.abs(pts[n - 1][1] - pts[n - 2][1]) > EPS) say(`curve ${c.id}: the last two results differ, so the reaction is not shown finishing`);
    }
    if (!curvesOk) continue;

    const asks = item.asks || [];
    if (asks.length < 3) say('needs at least 3 asks');
    const askIds = new Set();
    for (const [i, ask] of asks.entries()) {
      const at = `ask ${i + 1} (${ask?.kind})`;
      if (!KINDS.includes(ask?.kind)) { say(`${at}: known kinds are ${KINDS.join('/')}`); continue; }
      if (!ask.id || askIds.has(ask.id)) say(`${at}: needs its own id`);
      askIds.add(ask.id);
      if (ask.curve !== undefined && !ids.has(ask.curve)) { say(`${at}: curve "${ask.curve}" is not one of the curves`); continue; }
      if (curves.length > 1 && ask.kind !== 'compare' && ask.curve === undefined) { say(`${at}: with two curves, say which one`); continue; }
      const pts = curveOf(item, ask.curve).points;
      const end = endOf(pts);

      if (ask.kind === 'read') {
        if (!pointAt(pts, ask.at)) say(`${at}: ${ask.at} is not the time of a result, so the answer cannot be exact`);
        else if (ask.at > end) say(`${at}: ${ask.at} is after the reaction finished — that is a "total" ask`);
      }
      if (ask.kind === 'timeFor') {
        const hits = pts.filter((p) => Math.abs(p[1] - ask.value) < EPS);
        if (hits.length !== 1) say(`${at}: ${ask.value} is the reading of ${hits.length} results — it must be the reading of exactly one`);
      }
      if (ask.kind === 'interval') {
        if (!pointAt(pts, ask.from) || !pointAt(pts, ask.to)) say(`${at}: both ends (${ask.from}, ${ask.to}) must be times of results`);
        else if (!(ask.to > ask.from)) say(`${at}: "to" must be after "from"`);
        else if (ask.to > end + EPS) say(`${at}: the interval runs past the end of the reaction`);
        else if (decimals(rateOver(pts, ask.from, ask.to)) > 2) say(`${at}: the rate ${rateOver(pts, ask.from, ask.to)} has more than 2 decimal places`);
      }
      if (ask.kind === 'average' && decimals(averageOf(pts)) > 2) say(`${at}: the average rate ${averageOf(pts)} has more than 2 decimal places — change the total or the end time`);
      if (ask.kind === 'steepest') {
        const runs = intervalsOf(pts, ask.width || item.x.step).slice(0, 4);
        if (runs.length < 3) say(`${at}: fewer than 3 intervals to choose from`);
        else {
          const top = Math.max(...runs.map((r) => r.rate));
          if (runs.filter((r) => Math.abs(r.rate - top) < EPS).length > 1) say(`${at}: two intervals tie for the fastest`);
        }
      }
      if (ask.kind === 'compare') {
        if (curves.length !== 2) say(`${at}: needs two curves`);
        if (!['faster', 'amount'].includes(ask.what)) say(`${at}: what must be "faster" or "amount"`);
      }
      if (ask.kind === 'why' && (!item.limiting || !item.excess)) say(`${at}: the item must name its limiting reactant and the one in excess`);
    }
  }
  return out;
}
