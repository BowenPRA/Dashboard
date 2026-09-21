// src/data/PRIMARY_TECH/T02/diagrams.js
// T2 Mouse, Keys and Windows — every authored picture in the unit, in one place
// and referenced by key (docs/svg-diagrams.md §1).
//
// A GENERIC operating system, not a copy of Windows or macOS
// (docs/digital-skills-course.md §5.2): invented pixels, real names. The mouse
// has a left button, a right button and a wheel; the keyboard has Enter,
// Backspace, Delete, Shift, Caps Lock, Esc and Ctrl where a real one has them;
// the window on top is the one in front with the darker title bar and the lit
// taskbar button — the transferable pattern, not one vendor's screenshot.
//
// Three kinds of text, and the class that says which (docs/primary-tech/
// UPGRADE-PLAN.md §3.3, ENGAGEMENT-PLAN §2.2):
//   · interface words that are PART OF THE PICTURE — a window's title, "14:05",
//     the letters on the keys, "Esc" on the Esc key — carry class="keep", so a
//     hotspot that strips labels still shows the screen the way it looks;
//   · labels that NAME a part ("Left button", "Active window") are plain <text>,
//     stripped by a hotspot or Label It, so a picture never answers its own
//     question;
//   · leader lines and their end dots carry class="lbl" (the `lead` helper).
//
// The keyboard is drawn once, as the KEYS_BASE fragment (plate, keys, and the
// letters on them, all keep), and used twice: KEYBOARD adds the special-key
// words as keep — the hotspots ask by JOB and the student reads the keyboard
// as it really looks — while LB_KEYS adds them as PLAIN text, so Label It
// strips them and the student has to know Enter, Shift and Esc by where they
// sit and what shape they are.
//
// House rules for this file: every <text> is written out literally (the SVG
// audit cannot measure a label a helper emits); helpers draw SHAPES only; a rect
// that could be mistaken for a text's box (an underline, the bumps on F and J)
// is a <path>, so the audit measures a label against the key or button it is
// really on; and no SVG template contains a nested backtick template.
//
// Label It pins (data.js `labelIt`) and hotspot targets (notes.js) are placed
// from `node scripts/svg-coords.mjs PRIMARY_TECH/T02 <KEY>`. LB_KEYS draws the
// keyboard inside translate(220 150): add that to a KEYS_BASE coordinate.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const WALL = '#eef4fb';
const BAR = '#1e293b';
const BAR_SOFT = '#334155';
const BAR_LIT = '#475569';
const CASE = '#94a3b8';
const BLUE = '#3b82f6';
const SKY = '#0ea5e9';
const RED = '#ef4444';
const AMBER = '#f59e0b';
const GREEN = '#10b981';
const TITLE_ON = '#cbd5e1';
const TITLE_OFF = '#f1f5f9';
const SELECTED = '#bae6fd';

/* ------------------------------------------------------------------ *
 * Shape helpers — shapes only, never text.
 * ------------------------------------------------------------------ */

/** A leader line from a label to the part it names, ending in a dot. Stripped with the labels. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="2" stroke-linecap="round"/>
  <circle class="lbl" cx="${x2}" cy="${y2}" r="4.5" fill="${MUTED}"/>`;

/**
 * A computer mouse seen from above: the body, the left and right buttons, the
 * scroll wheel between them, and the cable. Drawn in a 200 × 300 box (the cable
 * rises 90 above it) with its top-left at (x, y), scaled by s. `left` / `right`
 * fill the buttons, so a picture can show WHICH button a move uses.
 *
 * Local landmarks (multiply by s, add x/y): left button ≈ (50, 64), right
 * button ≈ (150, 64), wheel 88–112 × 24–84, cable M 100 0 C 100 -40 60 -50 50 -90.
 */
const mouseShape = (x, y, s, left = '#ffffff', right = '#ffffff') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 100 0 C 100 -40 60 -50 50 -90" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 100 0 C 158 0 200 34 200 112 L 200 196 C 200 262 158 300 100 300 C 42 300 0 262 0 196 L 0 112 C 0 34 42 0 100 0 Z" fill="${FAINT}"/>
    <path d="M 100 0 C 42 0 0 34 0 112 L 0 118 Q 50 128 100 128 Z" fill="${left}"/>
    <path d="M 100 0 C 158 0 200 34 200 112 L 200 118 Q 150 128 100 128 Z" fill="${right}"/>
    <path d="M 0 118 Q 100 138 200 118 M 100 0 L 100 128" fill="none" stroke="${MUTED}" stroke-width="3"/>
    <path d="M 100 0 C 158 0 200 34 200 112 L 200 196 C 200 262 158 300 100 300 C 42 300 0 262 0 196 L 0 112 C 0 34 42 0 100 0 Z" fill="none" stroke="${MUTED}" stroke-width="4"/>
    <rect x="88" y="24" width="24" height="60" rx="12" fill="${BAR_SOFT}"/>
    <path d="M 93 38 H 107 M 93 48 H 107 M 93 58 H 107 M 93 68 H 107" stroke="${CASE}" stroke-width="2.5" stroke-linecap="round"/>
  </g>`;

/** The mouse pointer: an arrow with its tip at (x, y), scaled by s. */
const pointer = (x, y, s = 1) => `<path d="M ${x} ${y} l 0 ${26 * s} l ${7 * s} ${-6 * s} l ${5 * s} ${11 * s} l ${5 * s} ${-2 * s} l ${-5 * s} ${-11 * s} l ${9 * s} 0 z" fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;

/** A 56 × 56 desktop icon tile with its top-left at (x, y); the glyph is drawn on its centre. */
const tile = (x, y, glyph, opacity = 1) => `<g opacity="${opacity}"><rect x="${x}" y="${y}" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${glyph(x + 28, y + 28)}</g>`;

const docGlyph = (cx, cy) => `<rect x="${cx - 12}" y="${cy - 16}" width="24" height="32" rx="3" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <path d="M ${cx - 7} ${cy - 7} h 14 M ${cx - 7} ${cy - 1} h 14 M ${cx - 7} ${cy + 5} h 9" stroke="${MUTED}" stroke-width="2" stroke-linecap="round"/>`;

const imageGlyph = (cx, cy) => `<rect x="${cx - 17}" y="${cy - 13}" width="34" height="26" rx="3" fill="#e0f2fe" stroke="${SKY}" stroke-width="2"/>
  <path d="M ${cx - 14} ${cy + 10} l 9 -10 l 7 7 l 5 -5 l 9 8 z" fill="${SKY}"/>
  <circle cx="${cx + 8}" cy="${cy - 5}" r="3.5" fill="${AMBER}"/>`;

const folderGlyph = (cx, cy) => `<path d="M ${cx - 18} ${cy - 12} h 13 l 4 5 h 19 v 21 h -36 z" fill="#fde68a" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>`;

const binGlyph = (cx, cy) => `<path d="M ${cx - 12} ${cy - 9} h 24 l -2 25 h -20 z" fill="${FAINT}" stroke="${MUTED}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M ${cx - 15} ${cy - 10} h 30 M ${cx - 5} ${cy - 14} h 10" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round"/>`;

/** The four-squares glyph of the menu button, centred on (cx, cy), `s` = one square's side. */
const menuGlyph = (cx, cy, s) => {
  const g = s / 4;
  return `<path d="M ${cx - s - g / 2} ${cy - s - g / 2} h ${s} v ${s} h ${-s} z M ${cx + g / 2} ${cy - s - g / 2} h ${s} v ${s} h ${-s} z M ${cx - s - g / 2} ${cy + g / 2} h ${s} v ${s} h ${-s} z M ${cx + g / 2} ${cy + g / 2} h ${s} v ${s} h ${-s} z" fill="#ffffff"/>`;
};

/**
 * The three window buttons — minimise, maximise, close — each w × h, starting
 * at x. `dim` draws them the way a window that is NOT on top shows them: faded.
 */
const windowButtons = (x, y, w, h, gap, stroke, dim = false) => {
  const cy = y + h / 2;
  const m = x + w / 2;
  const mx = x + w + gap + w / 2;
  const c = x + 2 * (w + gap) + w / 2;
  const u = h * 0.22;
  const bg = dim ? '#eef2f6' : LINE;
  const ink = dim ? CASE : INK;
  const shut = dim ? '#fecaca' : RED;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${bg}"/>
  <path d="M ${m - u * 1.3} ${cy} L ${m + u * 1.3} ${cy}" stroke="${ink}" stroke-width="${stroke}" stroke-linecap="round"/>
  <rect x="${x + w + gap}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${bg}"/>
  <path d="M ${mx - u * 1.2} ${cy - u} h ${u * 2.4} v ${u * 2} h ${-u * 2.4} z" fill="none" stroke="${ink}" stroke-width="${stroke}" stroke-linejoin="round"/>
  <rect x="${x + 2 * (w + gap)}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${shut}"/>
  <path d="M ${c - u} ${cy - u} L ${c + u} ${cy + u} M ${c + u} ${cy - u} L ${c - u} ${cy + u}" stroke="#ffffff" stroke-width="${stroke}" stroke-linecap="round"/>`;
};

/** Grey bars standing in for lines of writing, so a window has "work" in it without text to overflow. */
const writing = (x, y, widths, h, gap) => widths
  .map((w, i) => `<rect x="${x}" y="${y + i * (h + gap)}" width="${w}" height="${h}" rx="${h / 2}" fill="${FAINT}"/>`)
  .join('');

/** A little painting (sun, house, grass) for a Paint window, in a w × h area at (x, y). */
const painting = (x, y, w, h) => `<circle cx="${x + w * 0.8}" cy="${y + h * 0.25}" r="${h * 0.13}" fill="#fde047"/>
  <rect x="${x + w * 0.2}" y="${y + h * 0.5}" width="${w * 0.3}" height="${h * 0.38}" fill="#fca5a5"/>
  <path d="M ${x + w * 0.17} ${y + h * 0.52} L ${x + w * 0.35} ${y + h * 0.24} L ${x + w * 0.53} ${y + h * 0.52} Z" fill="#b91c1c"/>
  <path d="M ${x} ${y + h * 0.9} H ${x + w}" stroke="#86efac" stroke-width="${h * 0.08}"/>`;

/** `n` plain keys w × h in a row, `step` apart, starting at x0 — the letter keys of the keyboard. */
const keys = (y, x0, n, w = 44, h = 44, step = 48) => Array.from({ length: n }, (_, i) => `<rect x="${x0 + i * step}" y="${y}" width="${w}" height="${h}" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>`).join('');

/** An arrow head for a short horizontal arrow ending at (x, y), pointing right. */
const arrowRight = (x1, x2, y) => `<path d="M ${x1} ${y} H ${x2} M ${x2 - 9} ${y - 8} L ${x2} ${y} L ${x2 - 9} ${y + 8}" fill="none" stroke="${MUTED}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

/* ------------------------------------------------------------------ *
 * The mouse.
 * ------------------------------------------------------------------ */

/**
 * The deck's starter: a mouse on its mat, drawn big, with no words at all —
 * "tap the button you press most". The left button, the right button, the wheel,
 * the cable and the body are all hotspot targets, so a wrong tap is NAMED.
 * The mouse is mouseShape(140, 100, 1): left button ≈ (190, 164), right ≈ (290,
 * 164), wheel 228–252 × 124–184, cable from (240, 100) up to (190, 10).
 */
const MOUSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="472" height="412" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="70" y="40" width="340" height="364" rx="28" fill="#e0f2fe" stroke="#bae6fd" stroke-width="2"/>
  ${mouseShape(140, 100, 1)}
</svg>`;

/**
 * The mouse, labelled: the left button, the right button, the scroll wheel and
 * the cable. The "Meet the mouse" slide reads it; Label It strips the four
 * labels. Boxes sit in the left margin (Cable, Left button) and the right
 * margin (Scroll wheel, Right button). The mouse is mouseShape(285, 115, 1.15).
 */
const LB_MOUSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 470" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="800" height="470" rx="14" fill="#ffffff"/>
  <rect x="0.75" y="0.75" width="798.5" height="468.5" rx="13" fill="none" stroke="${FAINT}" stroke-width="1.5"/>

  ${mouseShape(285, 115, 1.15)}

  ${lead(220, 45, 360, 45)}
  ${lead(220, 189, 340, 189)}
  ${lead(580, 120, 408, 158)}
  ${lead(580, 189, 460, 189)}

  <text x="148" y="51" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Cable</text>
  <text x="148" y="195" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Left button</text>
  <text x="651" y="126" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Scroll wheel</text>
  <text x="651" y="195" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Right button</text>
</svg>`;

/**
 * The four moves, one panel each: which button (coloured on a small mouse),
 * how to press it, and what it does. Shown on the "Four things a mouse does"
 * steps slide beside the four steps it illustrates.
 */
const MOUSE_MOVES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" class="w-full h-full drop-shadow-md">
  <rect x="10" y="10" width="364" height="206" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="386" y="10" width="364" height="206" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="10" y="224" width="364" height="206" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="386" y="224" width="364" height="206" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  ${mouseShape(272, 72, 0.42, BLUE, '#ffffff')}
  ${mouseShape(648, 72, 0.42, BLUE, '#ffffff')}
  ${mouseShape(272, 286, 0.42, '#ffffff', AMBER)}
  ${mouseShape(648, 286, 0.42, BLUE, '#ffffff')}

  <!-- click: an icon, chosen (blue) -->
  <rect x="40" y="88" width="80" height="82" rx="10" fill="${SELECTED}"/>
  ${tile(52, 96, docGlyph)}
  ${pointer(92, 128, 0.9)}

  <!-- double-click: a folder, and the window it opens -->
  ${tile(416, 100, folderGlyph)}
  ${pointer(456, 132, 0.9)}
  ${arrowRight(484, 510, 128)}
  <rect x="518" y="92" width="104" height="76" rx="6" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="519" y="93" width="102" height="16" fill="${TITLE_ON}"/>
  ${folderGlyph(546, 138)}

  <!-- right-click: a file, and its menu -->
  ${tile(30, 312, imageGlyph)}
  ${pointer(66, 342, 0.9)}
  <rect x="100" y="300" width="130" height="92" rx="8" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <text x="116" y="323" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Open</text>
  <text x="116" y="352" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Rename</text>
  <text x="116" y="381" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">Delete</text>

  <!-- drag: a photo carried to a folder -->
  ${tile(406, 316, imageGlyph)}
  <path d="M 466 328 C 500 290 540 290 566 318" fill="none" stroke="${BLUE}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
  ${arrowRight(560, 570, 322)}
  ${tile(574, 316, folderGlyph)}
  ${pointer(520, 300, 0.9)}

  <text x="30" y="46" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Click</text>
  <text x="30" y="72" font-family="sans-serif" font-size="15" fill="${MUTED}">The left button, once</text>
  <text x="30" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1d4ed8">Chooses it</text>

  <text x="406" y="46" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Double-click</text>
  <text x="406" y="72" font-family="sans-serif" font-size="15" fill="${MUTED}">Two quick clicks, keep still</text>
  <text x="406" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1d4ed8">Opens it</text>

  <text x="30" y="260" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Right-click</text>
  <text x="30" y="286" font-family="sans-serif" font-size="15" fill="${MUTED}">The right button, once</text>
  <text x="30" y="418" font-family="sans-serif" font-size="17" font-weight="bold" fill="#b45309">Shows a menu</text>

  <text x="406" y="260" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}">Drag</text>
  <text x="406" y="286" font-family="sans-serif" font-size="15" fill="${MUTED}">Hold the left button, move</text>
  <text x="406" y="418" font-family="sans-serif" font-size="17" font-weight="bold" fill="#1d4ed8">Moves it</text>
</svg>`;

/**
 * No mouse? The same four moves on a mouse, a touch screen and a touchpad, as
 * a table the student reads (it sits on a split with its check). The
 * right-click row is tinted: it is the one row where the three differ most.
 */
const TOUCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 360" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="352" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <!-- the three devices -->
  <rect x="200" y="16" width="180" height="76" rx="10" fill="#e0f2fe"/>
  <rect x="384" y="16" width="180" height="76" rx="10" fill="#e0f2fe"/>
  <rect x="568" y="16" width="180" height="76" rx="10" fill="#e0f2fe"/>
  ${mouseShape(275, 24, 0.15)}
  <rect x="446" y="22" width="56" height="40" rx="6" fill="${BAR_SOFT}"/>
  <rect x="451" y="27" width="46" height="30" rx="2" fill="${WALL}"/>
  <circle cx="474" cy="42" r="12" fill="none" stroke="${AMBER}" stroke-width="2"/>
  <circle cx="474" cy="42" r="6" fill="#fcd9b6" stroke="#b45309" stroke-width="1.5"/>
  <rect x="622" y="24" width="72" height="38" rx="6" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="640" y="34" width="36" height="22" rx="3" fill="${LINE}"/>
  <circle cx="652" cy="45" r="5" fill="#fcd9b6" stroke="#b45309" stroke-width="1.5"/>
  <circle cx="665" cy="45" r="5" fill="#fcd9b6" stroke="#b45309" stroke-width="1.5"/>
  <text x="290" y="84" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Mouse</text>
  <text x="474" y="84" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Touch screen</text>
  <text x="658" y="84" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Touchpad</text>

  <!-- the four moves -->
  <rect x="16" y="96" width="180" height="60" rx="8" fill="#f1f5f9"/>
  <rect x="16" y="160" width="180" height="60" rx="8" fill="#f1f5f9"/>
  <rect x="16" y="224" width="180" height="60" rx="8" fill="#fef3c7"/>
  <rect x="16" y="288" width="180" height="60" rx="8" fill="#f1f5f9"/>
  <text x="106" y="133" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Click</text>
  <text x="106" y="197" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Double-click</text>
  <text x="106" y="261" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">Right-click</text>
  <text x="106" y="325" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Drag</text>

  <rect x="200" y="96" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="384" y="96" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="568" y="96" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="200" y="160" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="384" y="160" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="568" y="160" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="200" y="224" width="180" height="60" rx="8" fill="#fffbeb" stroke="${AMBER}" stroke-width="1.5"/>
  <rect x="384" y="224" width="180" height="60" rx="8" fill="#fffbeb" stroke="${AMBER}" stroke-width="1.5"/>
  <rect x="568" y="224" width="180" height="60" rx="8" fill="#fffbeb" stroke="${AMBER}" stroke-width="1.5"/>
  <rect x="200" y="288" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="384" y="288" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="568" y="288" width="180" height="60" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>

  <text x="290" y="132" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Left button</text>
  <text x="474" y="132" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Tap</text>
  <text x="658" y="132" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Tap</text>
  <text x="290" y="196" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Left button, twice</text>
  <text x="474" y="196" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Double-tap</text>
  <text x="658" y="196" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Double-tap</text>
  <text x="290" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Right button</text>
  <text x="474" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Press and hold</text>
  <text x="658" y="260" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Two-finger tap</text>
  <text x="290" y="324" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Hold left, move</text>
  <text x="474" y="324" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Hold and slide</text>
  <text x="658" y="324" font-family="sans-serif" font-size="16" fill="${INK}" text-anchor="middle">Press and slide</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Right-click and drag.
 * ------------------------------------------------------------------ */

/**
 * Two right-clicks, two different menus: on a file (Open, Rename, Delete) and
 * on the empty desktop (New folder…). The point of the slide is the pattern —
 * the menu is about the thing under the pointer — so the deck's prediction then
 * asks about a third thing the picture does not show (a word in a story).
 */
const RIGHT_CLICK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 320" class="w-full h-full drop-shadow-md">
  <rect x="10" y="10" width="364" height="300" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>
  <rect x="386" y="10" width="364" height="300" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <!-- a file, chosen, with its menu -->
  <rect x="18" y="80" width="132" height="108" rx="10" fill="${SELECTED}"/>
  ${tile(56, 88, imageGlyph)}
  <text class="keep" x="84" y="170" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">old drawing.png</text>
  ${pointer(96, 124, 1.1)}
  <rect x="160" y="104" width="180" height="138" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 170 150 H 330 M 170 194 H 330" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="184" y="134" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Open</text>
  <text class="keep" x="184" y="178" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Rename</text>
  <text class="keep" x="184" y="222" font-family="sans-serif" font-size="17" font-weight="bold" fill="${RED}">Delete</text>

  <!-- the empty desktop, with ITS menu -->
  ${pointer(470, 120, 1.1)}
  <rect x="482" y="124" width="230" height="94" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 492 171 H 702" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="506" y="156" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">New folder</text>
  <text class="keep" x="506" y="200" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Change background</text>

  <text x="192" y="46" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Right-click a file</text>
  <text x="568" y="46" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Right-click the desktop</text>
  <text x="192" y="286" font-family="sans-serif" font-size="15" fill="${MUTED}" text-anchor="middle">Things to do to THIS file</text>
  <text x="568" y="286" font-family="sans-serif" font-size="15" fill="${MUTED}" text-anchor="middle">Things to do to the desktop</text>
</svg>`;

/**
 * Drag and drop, in three numbered moments: press and hold on the photo, move
 * (still holding — the photo travels with the pointer), let go on the folder,
 * which lights up to say "drop it here".
 */
const DRAG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <defs><marker id="t02-drag-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${BLUE}"/></marker></defs>
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  ${tile(64, 74, imageGlyph)}
  <text class="keep" x="92" y="152" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">beach.jpg</text>

  <rect x="614" y="62" width="84" height="104" rx="12" fill="#e0f2fe" stroke="${SKY}" stroke-width="3"/>
  ${tile(628, 74, folderGlyph)}
  <text class="keep" x="656" y="152" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">Holiday</text>

  <path d="M 128 96 C 250 16 480 16 606 92" fill="none" stroke="${BLUE}" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round" marker-end="url(#t02-drag-arrow)"/>
  ${tile(346, 32, imageGlyph, 0.65)}
  ${pointer(378, 66, 1.1)}

  <circle cx="92" cy="218" r="17" fill="${BLUE}"/>
  <circle cx="380" cy="218" r="17" fill="${BLUE}"/>
  <circle cx="656" cy="218" r="17" fill="${BLUE}"/>
  <text x="92" y="225" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
  <text x="380" y="225" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
  <text x="656" y="225" font-family="sans-serif" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
  <text x="92" y="266" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Press and hold</text>
  <text x="380" y="266" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Move, still holding</text>
  <text x="656" y="266" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Let go</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Windows: the one on top.
 * ------------------------------------------------------------------ */

/**
 * Two windows on one screen, labelled: the story on top (the ACTIVE window —
 * in front, darker title bar, lit taskbar button), Paint behind it (faded title
 * and buttons), the taskbar, and the pointer on the empty desktop. The "window
 * on top" slide reads it; Label It strips the four labels. Margins are wide
 * because a Label It box is sized to the longest Vietnamese label.
 */
const LB_WINDOW_PAIR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 560" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="1080" height="560" rx="14" fill="#ffffff"/>
  <rect x="0.75" y="0.75" width="1078.5" height="558.5" rx="13" fill="none" stroke="${FAINT}" stroke-width="1.5"/>

  <!-- the screen -->
  <rect x="240" y="40" width="600" height="390" rx="10" fill="${WALL}" stroke="${CASE}" stroke-width="3"/>

  <!-- Paint, behind -->
  <rect x="270" y="70" width="330" height="220" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="272" y="72" width="326" height="30" fill="${TITLE_OFF}"/>
  <text class="keep" x="288" y="93" font-family="sans-serif" font-size="15" font-weight="bold" fill="${CASE}">Paint</text>
  ${windowButtons(520, 78, 22, 18, 4, 2, true)}
  ${painting(290, 110, 290, 170)}

  <!-- the story, on top -->
  <rect x="458" y="148" width="360" height="230" rx="8" fill="${MUTED}" opacity="0.2"/>
  <rect x="450" y="140" width="360" height="230" rx="8" fill="#ffffff" stroke="${MUTED}" stroke-width="2.5"/>
  <rect x="452" y="142" width="356" height="32" fill="${TITLE_ON}"/>
  <text class="keep" x="470" y="164" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">story</text>
  ${windowButtons(724, 148, 24, 20, 4, 2)}
  ${writing(476, 196, [280, 240, 300, 200, 260], 10, 16)}

  <!-- the pointer, on the empty desktop -->
  ${pointer(330, 318, 1.3)}

  <!-- the taskbar -->
  <path d="M 241.5 388 H 838.5 V 420 Q 838.5 428.5 830 428.5 H 250 Q 241.5 428.5 241.5 420 Z" fill="${BAR}"/>
  <rect x="252" y="396" width="34" height="26" rx="6" fill="${BLUE}"/>
  ${menuGlyph(269, 409, 6)}
  <rect x="296" y="396" width="96" height="26" rx="6" fill="${BAR_SOFT}"/>
  <text class="keep" x="344" y="414" font-family="sans-serif" font-size="13" font-weight="bold" fill="${CASE}" text-anchor="middle">Paint</text>
  <rect x="400" y="396" width="96" height="26" rx="6" fill="${BAR_LIT}"/>
  <text class="keep" x="448" y="413" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">story</text>
  <path d="M 422 420 H 474" stroke="${SKY}" stroke-width="3" stroke-linecap="round"/>
  <text class="keep" x="800" y="414" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>

  ${lead(225, 120, 300, 120)}
  ${lead(225, 330, 336, 334)}
  ${lead(855, 250, 790, 250)}
  ${lead(560, 480, 620, 410)}

  <text x="114" y="126" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Window behind</text>
  <text x="114" y="336" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Pointer</text>
  <text x="966" y="256" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Active window</text>
  <text x="560" y="506" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Taskbar</text>
</svg>`;

/**
 * The hotspot "where do the keys go?": the story is BEHIND and the Calculator
 * is on top — the trap is that the story is the window the student WANTS to
 * type in. Every word on it is part of the screen (keep). Calculator window
 * 400–680 × 120–410, story 130–560 × 40–360, taskbar 440–492 (the story's
 * button 72–192, the Calculator's 200–340, lit).
 */
const TWO_WINDOWS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <!-- a desktop icon -->
  ${tile(36, 44, folderGlyph)}
  <text class="keep" x="64" y="118" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">My Work</text>

  <!-- the story, behind -->
  <rect x="130" y="40" width="430" height="320" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="132" y="42" width="426" height="36" fill="${TITLE_OFF}"/>
  <text class="keep" x="152" y="66" font-family="sans-serif" font-size="16" font-weight="bold" fill="${CASE}">story</text>
  ${windowButtons(462, 50, 26, 20, 5, 2.5, true)}
  ${writing(156, 104, [360, 300, 380, 280, 340, 220, 300], 12, 20)}

  <!-- the Calculator, on top -->
  <rect x="408" y="128" width="280" height="290" rx="10" fill="${MUTED}" opacity="0.2"/>
  <rect x="400" y="120" width="280" height="290" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2.5"/>
  <rect x="402" y="122" width="276" height="36" fill="${TITLE_ON}"/>
  <text class="keep" x="420" y="146" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Calculator</text>
  ${windowButtons(586, 130, 26, 20, 5, 2.5)}
  <rect x="416" y="168" width="248" height="44" rx="6" fill="${TITLE_OFF}"/>
  <text class="keep" x="652" y="199" font-family="sans-serif" font-size="24" font-weight="bold" fill="${INK}" text-anchor="end">42</text>
  <rect x="416" y="222" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="480" y="222" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="544" y="222" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="608" y="222" width="56" height="38" rx="6" fill="${LINE}"/>
  <rect x="416" y="268" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="480" y="268" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="544" y="268" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="608" y="268" width="56" height="38" rx="6" fill="${LINE}"/>
  <rect x="416" y="314" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="480" y="314" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="544" y="314" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="608" y="314" width="56" height="38" rx="6" fill="${LINE}"/>
  <rect x="416" y="360" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="480" y="360" width="56" height="38" rx="6" fill="${FAINT}"/>
  <rect x="544" y="360" width="56" height="38" rx="6" fill="${LINE}"/>
  <rect x="608" y="360" width="56" height="38" rx="6" fill="${LINE}"/>
  <text class="keep" x="444" y="247" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
  <text class="keep" x="508" y="247" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
  <text class="keep" x="572" y="247" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
  <text class="keep" x="636" y="247" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">÷</text>
  <text class="keep" x="444" y="293" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
  <text class="keep" x="508" y="293" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
  <text class="keep" x="572" y="293" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
  <text class="keep" x="636" y="293" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">×</text>
  <text class="keep" x="444" y="339" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  <text class="keep" x="508" y="339" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  <text class="keep" x="572" y="339" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
  <text class="keep" x="636" y="339" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
  <text class="keep" x="444" y="385" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text class="keep" x="508" y="385" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
  <text class="keep" x="572" y="385" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">=</text>
  <text class="keep" x="636" y="385" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>

  <!-- the taskbar: the story's button, and the Calculator's, lit -->
  <rect x="4" y="440" width="792" height="52" fill="${BAR}"/>
  <rect x="20" y="452" width="40" height="28" rx="6" fill="${BLUE}"/>
  ${menuGlyph(40, 466, 7)}
  <rect x="72" y="452" width="120" height="28" rx="6" fill="${BAR_SOFT}"/>
  <text class="keep" x="132" y="471" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}" text-anchor="middle">story</text>
  <rect x="200" y="452" width="140" height="28" rx="6" fill="${BAR_LIT}"/>
  <text class="keep" x="270" y="470" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Calculator</text>
  <path d="M 238 477 H 302" stroke="${SKY}" stroke-width="3" stroke-linecap="round"/>
  <text class="keep" x="748" y="464" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
  <text class="keep" x="748" y="480" font-family="sans-serif" font-size="11" fill="${CASE}" text-anchor="middle">Mon</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The keyboard.
 * ------------------------------------------------------------------ */

/**
 * The keyboard, less the words on its special keys: the plate, every key, and
 * the letters, digits and marks on the ordinary keys (keep). A 15-key-wide
 * laptop layout, one key = 48 units: Esc, F1–F12 and Delete along the top;
 * Backspace ending the number row; Tab, Caps Lock, Enter and both Shifts where
 * a real keyboard has them; Ctrl, Fn, Alt, the space bar and the arrows along
 * the bottom. The special keys' rects are written out so the SVG audit can
 * measure the words KEYBOARD and LB_KEYS put on them.
 */
const KEYS_BASE = `<rect x="4" y="4" width="752" height="300" rx="16" fill="${LINE}" stroke="${CASE}" stroke-width="2"/>
  <rect x="22" y="18" width="56" height="28" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  ${keys(18, 94, 12, 44, 28)}
  <rect x="682" y="18" width="56" height="28" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  ${keys(54, 22, 13)}
  <rect x="646" y="54" width="92" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="22" y="102" width="68" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  ${keys(102, 94, 12)}
  <rect x="670" y="102" width="68" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="22" y="150" width="80" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  ${keys(150, 106, 11)}
  <rect x="634" y="150" width="104" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="22" y="198" width="104" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  ${keys(198, 130, 10)}
  <rect x="610" y="198" width="128" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="22" y="246" width="68" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="94" y="246" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="142" y="246" width="56" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="202" y="246" width="284" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="490" y="246" width="56" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="550" y="246" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="598" y="246" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="646" y="246" width="44" height="20" rx="4" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="646" y="270" width="44" height="20" rx="4" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="694" y="246" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <path d="M 612 268 L 626 260 L 626 276 Z M 668 250 L 661 262 L 675 262 Z M 668 286 L 661 274 L 675 274 Z M 724 268 L 710 260 L 710 276 Z" fill="${MUTED}"/>
  <path d="M 265 187 h 14 M 409 187 h 14" stroke="${MUTED}" stroke-width="3" stroke-linecap="round"/>

  <text class="keep" x="92" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  <text class="keep" x="140" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  <text class="keep" x="188" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
  <text class="keep" x="236" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
  <text class="keep" x="284" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
  <text class="keep" x="332" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
  <text class="keep" x="380" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
  <text class="keep" x="428" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
  <text class="keep" x="476" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
  <text class="keep" x="524" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
  <text class="keep" x="572" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">-</text>
  <text class="keep" x="620" y="82" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">=</text>

  <text class="keep" x="116" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
  <text class="keep" x="164" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
  <text class="keep" x="212" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">E</text>
  <text class="keep" x="260" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
  <text class="keep" x="308" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">T</text>
  <text class="keep" x="356" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Y</text>
  <text class="keep" x="404" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">U</text>
  <text class="keep" x="452" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">I</text>
  <text class="keep" x="500" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
  <text class="keep" x="548" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
  <text class="keep" x="596" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">[</text>
  <text class="keep" x="644" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">]</text>

  <text class="keep" x="128" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
  <text class="keep" x="176" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text class="keep" x="224" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
  <text class="keep" x="272" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">F</text>
  <text class="keep" x="320" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">G</text>
  <text class="keep" x="368" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
  <text class="keep" x="416" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">J</text>
  <text class="keep" x="464" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">K</text>
  <text class="keep" x="512" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">L</text>
  <text class="keep" x="560" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">;</text>
  <text class="keep" x="608" y="178" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">'</text>

  <text class="keep" x="152" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text class="keep" x="200" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
  <text class="keep" x="248" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  <text class="keep" x="296" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
  <text class="keep" x="344" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
  <text class="keep" x="392" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
  <text class="keep" x="440" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
  <text class="keep" x="488" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">,</text>
  <text class="keep" x="536" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
  <text class="keep" x="584" y="226" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">/</text>`;

/**
 * The keyboard as it really looks, words on its special keys (all keep): the
 * picture behind both keyboard hotspots, which ask by JOB — "the key that rubs
 * out the letter before the cursor", "the key that closes a menu without
 * choosing". Every key is a hotspot target (notes.js KEY_TARGETS), so a wrong
 * tap is named. Key centres: Esc (50, 32), Delete (710, 32), Backspace (692,
 * 76), Enter (686, 172), Shift (74, 220) and (674, 220), Ctrl (56, 268) and
 * (572, 268), the space bar (344, 268).
 */
const KEYBOARD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 308" class="w-full h-full drop-shadow-md">
  ${KEYS_BASE}
  <text class="keep" x="50" y="36" font-family="sans-serif" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Esc</text>
  <text class="keep" x="710" y="36" font-family="sans-serif" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Delete</text>
  <text class="keep" x="692" y="81" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Backspace</text>
  <text class="keep" x="56" y="129" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Tab</text>
  <text class="keep" x="62" y="177" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <text class="keep" x="686" y="177" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Enter</text>
  <text class="keep" x="74" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text class="keep" x="674" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text class="keep" x="56" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text class="keep" x="116" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Fn</text>
  <text class="keep" x="170" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Alt</text>
  <text class="keep" x="518" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Alt</text>
  <text class="keep" x="572" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
</svg>`;

/**
 * The keys that do a job, labelled: Esc, Delete, Backspace, Enter, Caps Lock,
 * Shift, Ctrl and the space bar. The "Keys that do a job" slide reads it. In
 * Label It every word comes off — the margin labels AND the words on the keys
 * (plain text here, unlike KEYBOARD) — so the student places Esc, Backspace,
 * Enter, Shift, Space bar and Ctrl by position and shape; the letters stay
 * (keep) so the keyboard is still a keyboard. Caps Lock and Delete are labelled
 * for the slide but not pinned. The keyboard is KEYS_BASE at translate(220 150).
 */
const LB_KEYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="1200" height="600" rx="14" fill="#ffffff"/>
  <rect x="0.75" y="0.75" width="1198.5" height="598.5" rx="13" fill="none" stroke="${FAINT}" stroke-width="1.5"/>
  <g transform="translate(220 150)">
  ${KEYS_BASE}
  <text x="50" y="36" font-family="sans-serif" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Esc</text>
  <text x="710" y="36" font-family="sans-serif" font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle">Delete</text>
  <text x="692" y="81" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Backspace</text>
  <text x="56" y="129" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Tab</text>
  <text x="62" y="177" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <text x="686" y="177" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Enter</text>
  <text x="74" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text x="674" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text x="56" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="116" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Fn</text>
  <text x="170" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Alt</text>
  <text x="518" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Alt</text>
  <text x="572" y="273" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  </g>

  ${lead(270, 110, 270, 172)}
  ${lead(930, 110, 930, 172)}
  ${lead(980, 226, 950, 226)}
  ${lead(980, 322, 950, 322)}
  ${lead(220, 322, 250, 322)}
  ${lead(220, 370, 250, 370)}
  ${lead(220, 418, 250, 418)}
  ${lead(564, 500, 564, 436)}

  <text x="270" y="98" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Esc</text>
  <text x="930" y="98" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Delete</text>
  <text x="1090" y="233" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Backspace</text>
  <text x="1090" y="329" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Enter</text>
  <text x="110" y="329" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <text x="110" y="377" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text x="110" y="425" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="564" y="530" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Space bar</text>
</svg>`;

/**
 * Backspace or Delete? The cursor sits inside "friend" (fri|end). Backspace
 * rubs out the letter BEFORE it (fr|end); Delete rubs out the letter AFTER it
 * (fri|nd). Monospace, so the cursor lands exactly between two letters.
 */
const CURSOR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 320" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="312" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="190" y="24" width="380" height="84" rx="12" fill="#ffffff" stroke="${CASE}" stroke-width="2"/>
  <text x="372" y="84" font-family="monospace" font-size="48" font-weight="bold" fill="${INK}" text-anchor="end">fri</text>
  <path d="M 380 38 V 96" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
  <text x="388" y="84" font-family="monospace" font-size="48" font-weight="bold" fill="${INK}">end</text>
  <path d="M 380 112 L 373 124 L 387 124 Z" fill="${BLUE}"/>
  <text x="380" y="144" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1d4ed8" text-anchor="middle">the cursor</text>

  <rect x="20" y="160" width="350" height="146" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="38" y="178" width="140" height="48" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <text x="108" y="209" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Backspace</text>
  ${arrowRight(186, 216, 202)}
  <rect x="226" y="174" width="134" height="56" rx="8" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text x="288" y="212" font-family="monospace" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">fr</text>
  <path d="M 292 184 V 220" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>
  <text x="296" y="212" font-family="monospace" font-size="30" font-weight="bold" fill="${INK}">end</text>
  <text x="195" y="274" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">rubs out the letter BEFORE it</text>

  <rect x="390" y="160" width="350" height="146" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="408" y="178" width="140" height="48" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <text x="478" y="209" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Delete</text>
  ${arrowRight(556, 586, 202)}
  <rect x="596" y="174" width="134" height="56" rx="8" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text x="668" y="212" font-family="monospace" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">fri</text>
  <path d="M 672 184 V 220" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>
  <text x="676" y="212" font-family="monospace" font-size="30" font-weight="bold" fill="${INK}">nd</text>
  <text x="565" y="274" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">rubs out the letter AFTER it</text>
</svg>`;

/**
 * Shift or Caps Lock? Shift is HELD for one capital (Shift + h = H); Caps Lock
 * is a switch, pressed once, with a light that shows it is on (hello → HELLO).
 */
const SHIFT_CAPS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="20" y="20" width="350" height="260" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="40" y="92" width="110" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <text x="95" y="125" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text x="170" y="127" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>
  <rect x="190" y="92" width="56" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <text x="218" y="126" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">h</text>
  <text x="268" y="127" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
  <text x="318" y="133" font-family="monospace" font-size="44" font-weight="bold" fill="#1d4ed8" text-anchor="middle">H</text>
  <text x="195" y="58" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Shift: hold it</text>
  <text x="195" y="198" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">One capital letter</text>
  <text x="195" y="230" font-family="sans-serif" font-size="15" fill="${MUTED}" text-anchor="middle">let go, and small letters come back</text>

  <rect x="390" y="20" width="350" height="260" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="410" y="92" width="150" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <text x="478" y="125" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <circle cx="542" cy="106" r="10" fill="${GREEN}" opacity="0.3"/>
  <circle cx="542" cy="106" r="5" fill="${GREEN}"/>
  ${arrowRight(572, 602, 118)}
  <text x="668" y="131" font-family="monospace" font-size="36" font-weight="bold" fill="#1d4ed8" text-anchor="middle">HELLO</text>
  <text x="565" y="58" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock: press it once</text>
  <text x="565" y="198" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">EVERY letter a capital</text>
  <text x="565" y="230" font-family="sans-serif" font-size="15" fill="${MUTED}" text-anchor="middle">until you press it again: watch its light</text>
</svg>`;

/** The four Ctrl shortcuts to know by heart: S save, Z undo, C copy, V paste. */
const CTRL_KEYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="20" y="20" width="350" height="124" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="390" y="20" width="350" height="124" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="156" width="350" height="124" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="390" y="156" width="350" height="124" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>

  <rect x="40" y="56" width="84" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="164" y="56" width="56" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="410" y="56" width="84" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="534" y="56" width="56" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="40" y="192" width="84" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="164" y="192" width="56" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="410" y="192" width="84" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>
  <rect x="534" y="192" width="56" height="52" rx="8" fill="${FAINT}" stroke="${CASE}" stroke-width="2"/>

  <text x="82" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="144" y="91" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>
  <text x="192" y="90" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text x="240" y="91" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
  <text x="264" y="91" font-family="sans-serif" font-size="24" font-weight="bold" fill="#047857">Save</text>

  <text x="452" y="89" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="514" y="91" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>
  <text x="562" y="90" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text x="610" y="91" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
  <text x="634" y="91" font-family="sans-serif" font-size="24" font-weight="bold" fill="#7e22ce">Undo</text>

  <text x="82" y="225" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="144" y="227" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>
  <text x="192" y="226" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  <text x="240" y="227" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
  <text x="264" y="227" font-family="sans-serif" font-size="24" font-weight="bold" fill="#1d4ed8">Copy</text>

  <text x="452" y="225" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="514" y="227" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>
  <text x="562" y="226" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">V</text>
  <text x="610" y="227" font-family="sans-serif" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
  <text x="634" y="227" font-family="sans-serif" font-size="24" font-weight="bold" fill="#b45309">Paste</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Source Analysis pictures.
 * ------------------------------------------------------------------ */

/**
 * Five windows in a pile. The story is third from the back; the Calculator is
 * on top (darker title bar, lit taskbar button). "Ha Vi wants to type the next
 * line of her story — what must she do first?"
 */
const FIVE_WINDOWS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <rect x="60" y="24" width="360" height="220" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="62" y="26" width="356" height="28" fill="${TITLE_OFF}"/>
  <text class="keep" x="76" y="46" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}">Browser</text>
  ${windowButtons(330, 31, 24, 18, 4, 2, true)}
  <rect x="74" y="64" width="332" height="20" rx="10" fill="${TITLE_OFF}" stroke="${FAINT}" stroke-width="1.5"/>
  <text class="keep" x="88" y="78" font-family="sans-serif" font-size="11" fill="${MUTED}">www.schoolsite.org</text>

  <rect x="120" y="64" width="360" height="220" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="122" y="66" width="356" height="28" fill="${TITLE_OFF}"/>
  <text class="keep" x="136" y="86" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}">Files</text>
  ${windowButtons(390, 71, 24, 18, 4, 2, true)}
  ${folderGlyph(150, 120)}

  <rect x="180" y="104" width="360" height="220" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="182" y="106" width="356" height="28" fill="${TITLE_OFF}"/>
  <text class="keep" x="196" y="126" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}">story</text>
  ${windowButtons(450, 111, 24, 18, 4, 2, true)}
  ${writing(198, 150, [300, 260, 320], 10, 14)}

  <rect x="240" y="144" width="360" height="220" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="242" y="146" width="356" height="28" fill="${TITLE_OFF}"/>
  <text class="keep" x="256" y="166" font-family="sans-serif" font-size="14" font-weight="bold" fill="${CASE}">Paint</text>
  ${windowButtons(510, 151, 24, 18, 4, 2, true)}
  ${painting(252, 180, 60, 60)}

  <rect x="308" y="192" width="360" height="220" rx="8" fill="${MUTED}" opacity="0.2"/>
  <rect x="300" y="184" width="360" height="220" rx="8" fill="#ffffff" stroke="${MUTED}" stroke-width="2.5"/>
  <rect x="302" y="186" width="356" height="28" fill="${TITLE_ON}"/>
  <text class="keep" x="316" y="206" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Calculator</text>
  ${windowButtons(570, 191, 24, 18, 4, 2)}
  <rect x="316" y="224" width="328" height="36" rx="6" fill="${TITLE_OFF}"/>
  <text class="keep" x="632" y="250" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="end">42</text>
  <rect x="316" y="270" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="400" y="270" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="484" y="270" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="568" y="270" width="76" height="30" rx="6" fill="${LINE}"/>
  <rect x="316" y="310" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="400" y="310" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="484" y="310" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="568" y="310" width="76" height="30" rx="6" fill="${LINE}"/>
  <rect x="316" y="350" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="400" y="350" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="484" y="350" width="74" height="30" rx="6" fill="${FAINT}"/>
  <rect x="568" y="350" width="76" height="30" rx="6" fill="${LINE}"/>
  <text class="keep" x="353" y="291" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
  <text class="keep" x="437" y="291" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
  <text class="keep" x="521" y="291" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
  <text class="keep" x="606" y="291" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
  <text class="keep" x="353" y="331" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
  <text class="keep" x="437" y="331" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
  <text class="keep" x="521" y="331" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
  <text class="keep" x="606" y="331" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">−</text>
  <text class="keep" x="353" y="371" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  <text class="keep" x="437" y="371" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
  <text class="keep" x="521" y="371" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
  <text class="keep" x="606" y="371" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">=</text>

  <rect x="4" y="440" width="792" height="52" fill="${BAR}"/>
  <rect x="20" y="452" width="40" height="28" rx="6" fill="${BLUE}"/>
  ${menuGlyph(40, 466, 7)}
  <rect x="72" y="452" width="108" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="186" y="452" width="108" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="300" y="452" width="108" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="414" y="452" width="108" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="528" y="452" width="120" height="28" rx="6" fill="${BAR_LIT}"/>
  <text class="keep" x="126" y="471" font-family="sans-serif" font-size="13" font-weight="bold" fill="${CASE}" text-anchor="middle">Browser</text>
  <text class="keep" x="240" y="471" font-family="sans-serif" font-size="13" font-weight="bold" fill="${CASE}" text-anchor="middle">Files</text>
  <text class="keep" x="354" y="471" font-family="sans-serif" font-size="13" font-weight="bold" fill="${CASE}" text-anchor="middle">story</text>
  <text class="keep" x="468" y="471" font-family="sans-serif" font-size="13" font-weight="bold" fill="${CASE}" text-anchor="middle">Paint</text>
  <text class="keep" x="588" y="470" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Calculator</text>
  <path d="M 558 477 H 618" stroke="${SKY}" stroke-width="3" stroke-linecap="round"/>
  <text class="keep" x="748" y="464" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
  <text class="keep" x="748" y="480" font-family="sans-serif" font-size="11" fill="${CASE}" text-anchor="middle">Mon</text>
</svg>`;

/**
 * A right-click menu open on the old drawing, with the pointer resting on
 * Delete (highlighted, as a real menu highlights the choice under the pointer).
 * "What will happen when she clicks?" — the answer the unit needs is that
 * Delete MOVES the file to the Recycle Bin, where Put it back undoes it.
 */
const SA_MENU = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="352" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <rect x="10" y="12" width="124" height="96" rx="10" fill="${SELECTED}"/>
  ${tile(44, 20, imageGlyph)}
  <text class="keep" x="72" y="96" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">old drawing.png</text>
  ${tile(44, 116, imageGlyph)}
  <text class="keep" x="72" y="192" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">new drawing.png</text>
  ${tile(44, 212, folderGlyph)}
  <text class="keep" x="72" y="288" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Holiday</text>
  ${tile(556, 20, binGlyph)}
  <text class="keep" x="584" y="96" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Recycle Bin</text>

  <rect x="150" y="56" width="190" height="138" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 160 104 H 330 M 160 148 H 330" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="174" y="88" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Open</text>
  <text class="keep" x="174" y="132" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Rename</text>
  <rect x="156" y="152" width="178" height="36" rx="6" fill="#fee2e2"/>
  <text class="keep" x="174" y="176" font-family="sans-serif" font-size="17" font-weight="bold" fill="${RED}">Delete</text>
  ${pointer(250, 168, 1.1)}

  <rect x="4" y="316" width="632" height="40" fill="${BAR}"/>
  <rect x="16" y="324" width="34" height="24" rx="6" fill="${BLUE}"/>
  ${menuGlyph(33, 336, 6)}
  <text class="keep" x="596" y="341" font-family="sans-serif" font-size="13" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
</svg>`;

/**
 * "I double-clicked the Holiday folder, and nothing opened!" The picture holds
 * the evidence for both usual reasons: the folder is highlighted (one click
 * landed and only CHOSE it — the second came too late), and it has moved from
 * the dashed outline where it was (the mouse moved while the button was down,
 * so the "double-click" became a little drag). No window is open.
 */
const SA_DOUBLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="392" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  ${tile(44, 20, docGlyph)}
  <text class="keep" x="72" y="96" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">homework.docx</text>

  <rect x="18" y="116" width="108" height="96" rx="10" fill="none" stroke="${CASE}" stroke-width="2" stroke-dasharray="6 5"/>
  <rect x="46" y="146" width="108" height="96" rx="10" fill="${SELECTED}"/>
  ${tile(72, 154, folderGlyph)}
  <text class="keep" x="100" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Holiday</text>
  ${pointer(112, 186, 1.2)}

  <rect x="270" y="56" width="340" height="132" rx="18" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 300 186 L 262 222 L 332 187" fill="#ffffff" stroke="${MUTED}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 302 185 H 330" stroke="#ffffff" stroke-width="4"/>
  <text x="440" y="100" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">I double-clicked the</text>
  <text x="440" y="128" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Holiday folder, and</text>
  <text x="440" y="156" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">nothing opened!</text>
  <text x="440" y="226" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Ha Vi</text>

  <rect x="4" y="356" width="632" height="40" fill="${BAR}"/>
  <rect x="16" y="364" width="34" height="24" rx="6" fill="${BLUE}"/>
  ${menuGlyph(33, 376, 6)}
  <text class="keep" x="596" y="381" font-family="sans-serif" font-size="13" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Workbook.
 * ------------------------------------------------------------------ */

/**
 * Workbook c1: Ha Vi held Shift for the H and the V of her name — and got
 * "hA vI". The keyboard's Caps Lock light is on: with Caps Lock on, Shift
 * gives SMALL letters, and everything else comes out in capitals.
 */
const WB_CAPS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="252" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="24" y="24" width="420" height="212" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="26" y="26" width="416" height="34" fill="${TITLE_ON}"/>
  <text class="keep" x="44" y="49" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">my name</text>
  ${windowButtons(356, 33, 24, 20, 4, 2)}
  <text class="keep" x="60" y="156" font-family="monospace" font-size="52" font-weight="bold" fill="${INK}">hA vI</text>
  <path d="M 224 112 V 166" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>

  <rect x="476" y="24" width="260" height="212" rx="14" fill="${LINE}" stroke="${CASE}" stroke-width="2"/>
  <rect x="492" y="40" width="92" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="590" y="40" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="640" y="40" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="492" y="92" width="110" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="608" y="92" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="658" y="92" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="492" y="144" width="130" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="628" y="144" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <rect x="678" y="144" width="44" height="44" rx="5" fill="#ffffff" stroke="${CASE}" stroke-width="1.2"/>
  <circle cx="590" cy="104" r="9" fill="${GREEN}" opacity="0.35"/>
  <circle cx="590" cy="104" r="4.5" fill="${GREEN}"/>
  <text class="keep" x="538" y="67" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Tab</text>
  <text class="keep" x="612" y="68" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
  <text class="keep" x="662" y="68" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">W</text>
  <text class="keep" x="536" y="119" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Caps Lock</text>
  <text class="keep" x="630" y="120" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
  <text class="keep" x="680" y="120" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text class="keep" x="557" y="171" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Shift</text>
  <text class="keep" x="650" y="172" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Z</text>
  <text class="keep" x="700" y="172" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">X</text>
  <text class="keep" x="606" y="220" font-family="sans-serif" font-size="13" font-weight="bold" fill="#047857" text-anchor="middle">Caps Lock light: on</text>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file, so `{ KEY }`
// would report every reference in the unit as undefined.
export const DIAGRAMS = {
  MOUSE: MOUSE,
  LB_MOUSE: LB_MOUSE,
  MOUSE_MOVES: MOUSE_MOVES,
  TOUCH: TOUCH,
  RIGHT_CLICK: RIGHT_CLICK,
  DRAG: DRAG,
  LB_WINDOW_PAIR: LB_WINDOW_PAIR,
  TWO_WINDOWS: TWO_WINDOWS,
  KEYBOARD: KEYBOARD,
  LB_KEYS: LB_KEYS,
  CURSOR: CURSOR,
  SHIFT_CAPS: SHIFT_CAPS,
  CTRL_KEYS: CTRL_KEYS,
  FIVE_WINDOWS: FIVE_WINDOWS,
  SA_MENU: SA_MENU,
  SA_DOUBLE: SA_DOUBLE,
  WB_CAPS: WB_CAPS,
};
