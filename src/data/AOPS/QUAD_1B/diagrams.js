// src/data/AOPS/QUAD_1B/diagrams.js
// Teaching diagrams for QUAD_1B — Zeros and the Factored Form.
//
// Drawn to the same rules as QUAD_1A (docs/svg-diagrams.md): a white plate
// first so the artwork reads on any surface, the house slate/tailwind palette,
// monospace for every number and equation, sans for prose labels, and every
// <text> written out LITERALLY — `npm run audit:svg` cannot see text emitted
// from a `${helper(...)}` call, so a helper that prints labels silently opts
// the whole diagram out of checking.
//
// ONE GRID, USED EVERYWHERE, and it is NOT the QUAD_1A grid: this unit lives
// below the x-axis as much as above it, so the window is
//     x from -6 to 6, y from -6 to 8, 30 px per unit in BOTH directions,
//     origin at (420, 265) in an 840 x 470 viewBox.
// Equal scale on both axes, as before — a squashed axis would move the zeros
// visually without moving them mathematically.
//
// ONE CURVE, USED THREE TIMES: y = (x + 1)(x - 3). Its zeros are -1 and 3, its
// axis of symmetry is x = 1 and its vertex is (1, -4) — all whole numbers, so
// the class can check every claim by eye. ZEROS_ON_GRAPH introduces it,
// MIDPOINT asks where the vertex is, and the workbook returns to it.

const INK = '#1e293b';
const MUTED = '#64748b';
const KEY = '#d97706';
const GRID = '#e2e8f0';
const RED = '#ef4444';
const BLUE = '#3b82f6';
const GREEN = '#10b981';
const PURPLE = '#a855f7';
const BLUE_T = '#eff6ff';
const GREEN_T = '#f0fdf4';
const ORANGE_T = '#fffbeb';
const PURPLE_T = '#f3e8ff';
const RED_T = '#fef2f2';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const MONO = "ui-monospace, 'Cascadia Mono', 'Consolas', monospace";

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

// ── The shared grid ────────────────────────────────────────────────────────
const U = 30;
const OX = 420;
const OY = 265;
const XMIN = -6;
const XMAX = 6;
const YMIN = -6;
const YMAX = 8;

const X = (x) => OX + x * U;
const Y = (y) => OY - y * U;

/** Grid lines + the two axes. Shapes only — the numbers are written literally. */
const grid = () => {
  let s = '';
  for (let x = XMIN; x <= XMAX; x++)
    s += `<line x1="${X(x)}" y1="${Y(YMAX)}" x2="${X(x)}" y2="${Y(YMIN)}" stroke="${GRID}" stroke-width="1"/>`;
  for (let y = YMIN; y <= YMAX; y++)
    s += `<line x1="${X(XMIN)}" y1="${Y(y)}" x2="${X(XMAX)}" y2="${Y(y)}" stroke="${GRID}" stroke-width="1"/>`;
  s += `<line x1="${X(XMIN)}" y1="${Y(0)}" x2="${X(XMAX)}" y2="${Y(0)}" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<line x1="${X(0)}" y1="${Y(YMAX)}" x2="${X(0)}" y2="${Y(YMIN)}" stroke="${INK}" stroke-width="2.2"/>`;
  return s;
};

/** A curve y = f(x), sampled finely and clipped to the grid's y window. */
const curve = (f, color, width = 3.4, dash = '') => {
  let d = '';
  let pen = false;
  for (let i = 0; i <= 400; i++) {
    const x = XMIN + (i / 400) * (XMAX - XMIN);
    const y = f(x);
    if (y < YMIN || y > YMAX) { pen = false; continue; }
    d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
    pen = true;
  }
  return `<path d="${d.trim()}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
};

const dot = (x, y, color, r = 7) =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>`;

/** A thin leader line ending in a dot, for a label out in the margin. */
const leader = (x1, y1, x2, y2, color) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.6"/><circle cx="${x2}" cy="${y2}" r="3.4" fill="${color}"/>`;

/** A mini axis pair for the three-panel "how many" diagram. Shapes only. */
const miniAxes = (cx, cy, w, h) =>
  `<line x1="${cx - w}" y1="${cy}" x2="${cx + w}" y2="${cy}" stroke="${INK}" stroke-width="2"/>
    <line x1="${cx}" y1="${cy - h}" x2="${cx}" y2="${cy + 36}" stroke="${INK}" stroke-width="2"/>`;

/** A parabola drawn in a mini panel: y = a(x-h)^2+k, 22px per unit, clipped. */
const miniCurve = (cx, cy, a, h, k, color) => {
  const u = 22;
  let d = '';
  let pen = false;
  for (let i = 0; i <= 200; i++) {
    const x = -4 + (i / 200) * 8;
    const y = a * (x - h) * (x - h) + k;
    if (y > 8 || y < -2.4) { pen = false; continue; }
    d += `${pen ? 'L' : 'M'}${(cx + x * u).toFixed(1)},${(cy - y * u).toFixed(1)} `;
    pen = true;
  }
  return `<path d="${d.trim()}" fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round"/>`;
};

const miniDot = (cx, cy, x, color) =>
  `<circle cx="${cx + x * 22}" cy="${cy}" r="6" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>`;

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // WHAT A ZERO IS. y = (x + 1)(x - 3), which crosses at -1 and 3. The whole
  // x-axis is called out as "the line where y = 0", because the definition is
  // not "where it crosses" but "where y is zero" — the crossing is the picture
  // of that fact, not the fact itself.
  // ───────────────────────────────────────────────────────────────────────────
  ZEROS_ON_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    ${curve((x) => (x + 1) * (x - 3), BLUE)}
    ${dot(-1, 0, KEY)}
    ${dot(3, 0, KEY)}

    <text x="446" y="284" font-family="${MONO}" font-size="16" fill="${MUTED}">0</text>
    <text x="${X(-4)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(2)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">2</text>
    <text x="${X(4)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(-4) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">−4</text>

    ${leader(214, 150, X(-1) - 6, Y(0) - 6, KEY)}
    <text x="204" y="144" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="end">a zero</text>
    <text x="204" y="166" font-family="${MONO}" font-size="17" fill="${INK}" text-anchor="end">x = −1</text>

    ${leader(636, 150, X(3) + 6, Y(0) - 6, KEY)}
    <text x="646" y="144" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">the other zero</text>
    <text x="646" y="166" font-family="${MONO}" font-size="17" fill="${INK}">x = 3</text>

    ${leader(636, 366, X(4.6), Y(0), MUTED)}
    <text x="646" y="360" font-family="${FONT}" font-size="17" font-weight="bold" fill="${MUTED}">the x-axis</text>
    <text x="646" y="382" font-family="${FONT}" font-size="16" fill="${MUTED}">every point on it has</text>
    <text x="646" y="402" font-family="${MONO}" font-size="16" fill="${MUTED}">y = 0</text>

    ${leader(210, 372, X(-2.2), Y(2.4), BLUE)}
    <text x="200" y="366" font-family="${MONO}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="end">y = (x + 1)(x − 3)</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE ZERO PRODUCT RULE, with no grid — it is an arithmetic fact, not a
  // picture. The worked line underneath is the whole method the unit needs.
  // ───────────────────────────────────────────────────────────────────────────
  ZERO_PRODUCT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}

    <text x="420" y="52" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}" text-anchor="middle">Two numbers multiply to zero. What do you know?</text>

    <rect x="150" y="82" width="540" height="96" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.4"/>
    <text x="420" y="144" font-family="${MONO}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">A × B = 0</text>

    <text x="420" y="216" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">then A = 0, or B = 0, or both.</text>
    <text x="420" y="248" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">Nothing else multiplies to zero. Two numbers away from zero never can.</text>

    <rect x="90" y="286" width="660" height="146" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="120" y="322" font-family="${FONT}" font-size="17" font-weight="bold" fill="${BLUE}">Use it on a parabola</text>
    <text x="120" y="360" font-family="${MONO}" font-size="21" fill="${INK}">(x − 2)(x − 5) = 0</text>
    <text x="120" y="396" font-family="${MONO}" font-size="21" fill="${INK}">x − 2 = 0   or   x − 5 = 0</text>
    <text x="120" y="424" font-family="${MONO}" font-size="21" font-weight="bold" fill="${GREEN}">x = 2   or   x = 5</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE FACTORED FORM, LABELLED. Same shape of diagram as QUAD_1A's vertex-form
  // anatomy on purpose: the student should recognise "here is a form, here is
  // what each letter tells you" as a repeated move.
  // ───────────────────────────────────────────────────────────────────────────
  FACTORED_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="100" y="44" width="640" height="132" rx="18" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.6"/>
    <text x="420" y="131" font-family="${MONO}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">y = a(x − p)(x − q)</text>

    <line x1="285" y1="176" x2="155" y2="242" stroke="${BLUE}" stroke-width="1.8"/>
    <circle cx="285" cy="176" r="4" fill="${BLUE}"/>
    <circle cx="155" cy="242" r="4" fill="${BLUE}"/>
    <line x1="455" y1="176" x2="420" y2="242" stroke="${GREEN}" stroke-width="1.8"/>
    <circle cx="455" cy="176" r="4" fill="${GREEN}"/>
    <circle cx="420" cy="242" r="4" fill="${GREEN}"/>
    <line x1="625" y1="176" x2="685" y2="242" stroke="${PURPLE}" stroke-width="1.8"/>
    <circle cx="625" cy="176" r="4" fill="${PURPLE}"/>
    <circle cx="685" cy="242" r="4" fill="${PURPLE}"/>

    <rect x="30" y="248" width="250" height="120" rx="12" fill="${BLUE_T}"/>
    <text x="48" y="288" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}">a — the shape</text>
    <text x="48" y="322" font-family="${FONT}" font-size="18" fill="${INK}">narrow, wide, or</text>
    <text x="48" y="348" font-family="${FONT}" font-size="18" fill="${INK}">flipped over</text>

    <rect x="295" y="248" width="250" height="120" rx="12" fill="${GREEN_T}"/>
    <text x="313" y="288" font-family="${FONT}" font-size="21" font-weight="bold" fill="${GREEN}">p — one zero</text>
    <text x="313" y="322" font-family="${FONT}" font-size="18" fill="${INK}">the curve crosses</text>
    <text x="313" y="348" font-family="${MONO}" font-size="18" fill="${INK}">at x = p</text>

    <rect x="560" y="248" width="250" height="120" rx="12" fill="${PURPLE_T}"/>
    <text x="578" y="288" font-family="${FONT}" font-size="21" font-weight="bold" fill="${PURPLE}">q — the other</text>
    <text x="578" y="322" font-family="${FONT}" font-size="18" fill="${INK}">it crosses again</text>
    <text x="578" y="348" font-family="${MONO}" font-size="18" fill="${INK}">at x = q</text>

    <rect x="30" y="404" width="780" height="126" rx="14" fill="#f8fafc" stroke="${KEY}" stroke-width="2"/>
    <text x="420" y="452" font-family="${MONO}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">zeros at x = p and x = q</text>
    <text x="420" y="494" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">Read them straight off the brackets. Watch the minus signs.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // HOW MANY ZEROS ARE POSSIBLE. Three mini panels, same scale, so the only
  // difference the eye sees is how high the curve sits. That is the whole
  // argument: the count is decided by where the vertex is relative to the axis.
  // Panel centres at x = 170, 420, 670, with the axis line at y = 300.
  // ───────────────────────────────────────────────────────────────────────────
  HOW_MANY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 400" class="w-full h-full">
    ${plate(840, 400)}

    <text x="420" y="42" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}" text-anchor="middle">A parabola can cross the x-axis twice, once, or not at all</text>

    ${miniAxes(170, 300, 90, 190)}
    ${miniCurve(170, 300, 1, 0, -2, GREEN)}
    ${miniDot(170, 300, -1.414, GREEN)}
    ${miniDot(170, 300, 1.414, GREEN)}
    <text x="170" y="352" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">two zeros</text>
    <text x="170" y="376" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="middle">vertex below the axis</text>

    ${miniAxes(420, 300, 90, 190)}
    ${miniCurve(420, 300, 1, 0, 0, BLUE)}
    ${miniDot(420, 300, 0, BLUE)}
    <text x="420" y="352" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">one zero</text>
    <text x="420" y="376" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="middle">vertex sitting on it</text>

    ${miniAxes(670, 300, 90, 190)}
    ${miniCurve(670, 300, 1, 0, 1.6, RED)}
    <text x="670" y="352" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">no zeros</text>
    <text x="670" y="376" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="middle">vertex above the axis</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE ZEROS FIND THE VERTEX. Same curve as ZEROS_ON_GRAPH, asked a second
  // question: the axis of symmetry is exactly halfway between the two zeros, so
  // the vertex costs one addition and one substitution rather than a table.
  // Zeros -1 and 3, midpoint 1, vertex (1, -4).
  // ───────────────────────────────────────────────────────────────────────────
  MIDPOINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}
    ${grid()}
    <line x1="${X(1)}" y1="${Y(YMAX)}" x2="${X(1)}" y2="${Y(YMIN)}" stroke="${RED}" stroke-width="2" stroke-dasharray="7 6"/>
    ${curve((x) => (x + 1) * (x - 3), BLUE)}
    <path d="M ${X(-1)} ${Y(0) + 28} L ${X(1)} ${Y(0) + 28}" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${X(1)} ${Y(0) + 28} L ${X(3)} ${Y(0) + 28}" stroke="${KEY}" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 5"/>
    ${dot(-1, 0, KEY)}
    ${dot(3, 0, KEY)}
    ${dot(1, -4, RED)}

    <text x="446" y="284" font-family="${MONO}" font-size="16" fill="${MUTED}">0</text>
    <text x="${X(-4)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">−4</text>
    <text x="${X(-2)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">−2</text>
    <text x="${X(4)}" y="288" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">4</text>
    <text x="410" y="${Y(2) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">2</text>
    <text x="410" y="${Y(4) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">4</text>
    <text x="410" y="${Y(-4) + 5}" font-family="${MONO}" font-size="16" fill="${MUTED}" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="end">−4</text>

    ${leader(200, 130, X(-1.4), Y(2.6), KEY)}
    <text x="190" y="124" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="end">zeros at −1 and 3</text>
    <text x="190" y="148" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="end">halfway between is 1</text>

    ${leader(640, 214, X(1) + 6, Y(1.6), RED)}
    <text x="650" y="208" font-family="${MONO}" font-size="18" font-weight="bold" fill="${RED}">x = 1</text>
    <text x="650" y="230" font-family="${FONT}" font-size="16" fill="${INK}">the axis of symmetry</text>

    ${leader(636, 400, X(1.4), Y(-4), RED)}
    <text x="646" y="394" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}">the vertex</text>
    <text x="646" y="416" font-family="${FONT}" font-size="16" fill="${INK}">put x = 1 back in:</text>
    <text x="646" y="438" font-family="${MONO}" font-size="16" fill="${INK}">y = 2 × (−2) = −4</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // SQUARE-ROOTING BOTH SIDES, which is how a vertex-form equation gives up its
  // zeros. The plus-or-minus is the whole point and gets its own colour: one
  // square root, two answers, because two different numbers square to 9.
  // ───────────────────────────────────────────────────────────────────────────
  PLUS_MINUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 470" class="w-full h-full">
    ${plate(840, 470)}

    <text x="420" y="48" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">Finding the zeros of y = (x − 2)² − 9</text>

    <rect x="90" y="76" width="660" height="66" rx="12" fill="#f8fafc" stroke="${GRID}" stroke-width="2"/>
    <text x="120" y="118" font-family="${MONO}" font-size="24" fill="${INK}">(x − 2)² − 9 = 0</text>
    <text x="470" y="116" font-family="${FONT}" font-size="17" fill="${MUTED}">set y to zero</text>

    <rect x="90" y="154" width="660" height="66" rx="12" fill="#f8fafc" stroke="${GRID}" stroke-width="2"/>
    <text x="120" y="196" font-family="${MONO}" font-size="24" fill="${INK}">(x − 2)² = 9</text>
    <text x="470" y="194" font-family="${FONT}" font-size="17" fill="${MUTED}">add 9 to both sides</text>

    <rect x="90" y="232" width="660" height="78" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="2.4"/>
    <text x="120" y="280" font-family="${MONO}" font-size="24" font-weight="bold" fill="${RED}">x − 2 = +3   or   x − 2 = −3</text>
    <text x="120" y="302" font-family="${FONT}" font-size="16" fill="${INK}">both 3 and −3 square to 9, so there are two roads out</text>

    <rect x="90" y="322" width="660" height="66" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.4"/>
    <text x="120" y="364" font-family="${MONO}" font-size="24" font-weight="bold" fill="${GREEN}">x = 5   or   x = −1</text>

    <text x="420" y="424" font-family="${FONT}" font-size="18" fill="${INK}" text-anchor="middle">Check against the vertex: it sits at x = 2, exactly halfway between −1 and 5.</text>
    <text x="420" y="450" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">Forgetting the minus root is how one of the two zeros goes missing.</text>
  </svg>`,
};
