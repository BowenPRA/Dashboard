// src/data/PRIMARY_TECH/T01/diagrams.js
// T1 Starting and Stopping — every authored picture in the unit, in one place
// and referenced by key (docs/svg-diagrams.md §1). The POINT_IT interfaces live
// here too rather than in pointIt.js, so `npm run audit:svg PRIMARY_TECH` sees
// them: the audit reads diagrams.js and inline blocks in notes.js/assessment.js,
// and art it cannot see is art whose labels can quietly overflow.
//
// These are a GENERIC operating system, not a copy of Windows or macOS
// (docs/digital-skills-course.md §5.2): invented pixels, real names. The point is
// the transferable pattern — there is always a menu, the clock is on the taskbar,
// the close button is the one on the end — not one vendor's screenshot, which is
// wrong within two years and unfixable without redrawing everything.
//
// Three kinds of text, and the class that says which (docs/primary-tech/
// UPGRADE-PLAN.md §3.3, ENGAGEMENT-PLAN §2.2):
//   · interface words that are PART OF THE SCREEN — "14:05", a window's title,
//     "Password" in the login box — carry class="keep", so a hotspot or Label It
//     that strips labels still shows the screen the way it really looks;
//   · labels that NAME a part ("Taskbar", "Power button") are plain <text>, and
//     are stripped by a hotspot / Label It, so the picture never answers its own
//     question;
//   · leader lines and their end dots carry class="lbl" (the `lead` helper), so a
//     stripped picture has no lines pointing at nothing.
//
// House rules for this file: every <text> is written out literally (the SVG
// audit cannot measure a label a helper emits); helpers draw SHAPES only; and no
// SVG template contains a nested backtick template (the audit stops reading a
// block at its first inner backtick) — conditional or repeated shapes come from
// the helper functions below.
//
// Label It (data.js `labelIt`) pins are placed on the LB_* pictures from
// `node scripts/svg-coords.mjs PRIMARY_TECH/T01 <KEY>`: a label's leader line
// ends on the part (the pin's `to`), and its printed label sits where the blank
// box will go.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const WALL = '#eef4fb';
const BAR = '#1e293b';
const BAR_SOFT = '#334155';
const BEZEL = '#334155';
const CASE = '#94a3b8';
const BLUE = '#3b82f6';
const RED = '#ef4444';
const AMBER = '#f59e0b';
const GREEN = '#10b981';

/* ------------------------------------------------------------------ *
 * Shape helpers — shapes only, never text.
 * ------------------------------------------------------------------ */

/** A leader line from a label to the part it names, ending in a dot. Stripped with the labels. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="2" stroke-linecap="round"/>
  <circle class="lbl" cx="${x2}" cy="${y2}" r="4.5" fill="${MUTED}"/>`;

/** The four-squares glyph of the menu button, centred on (cx, cy), `s` = one square's side. */
const menuGlyph = (cx, cy, s) => {
  const g = s / 4;
  return `<path d="M ${cx - s - g / 2} ${cy - s - g / 2} h ${s} v ${s} h ${-s} z M ${cx + g / 2} ${cy - s - g / 2} h ${s} v ${s} h ${-s} z M ${cx - s - g / 2} ${cy + g / 2} h ${s} v ${s} h ${-s} z M ${cx + g / 2} ${cy + g / 2} h ${s} v ${s} h ${-s} z" fill="#ffffff"/>`;
};

/**
 * The power symbol ⏻ — a circle broken at the top with a line through the gap —
 * centred on (cx, cy) with radius r. The same mark as on every real power
 * button: it grew out of 1 and 0, on and off.
 */
const powerGlyph = (cx, cy, r, color, w) => {
  const dx = Math.round(r * Math.sin(Math.PI * 40 / 180) * 10) / 10;
  const dy = Math.round(r * Math.cos(Math.PI * 40 / 180) * 10) / 10;
  return `<path d="M ${cx + dx} ${cy - dy} A ${r} ${r} 0 1 1 ${cx - dx} ${cy - dy}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
  <path d="M ${cx} ${cy - r - w * 0.4} L ${cx} ${cy - r * 0.15}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
};

/** The three window buttons — minimise, maximise, close — each w × h, starting at x. */
const windowButtons = (x, y, w, h, gap, stroke) => {
  const cy = y + h / 2;
  const m = x + w / 2;
  const mx = x + w + gap + w / 2;
  const c = x + 2 * (w + gap) + w / 2;
  const u = h * 0.22;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${LINE}"/>
  <path d="M ${m - u * 1.3} ${cy} L ${m + u * 1.3} ${cy}" stroke="${INK}" stroke-width="${stroke}" stroke-linecap="round"/>
  <rect x="${x + w + gap}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${LINE}"/>
  <path d="M ${mx - u * 1.2} ${cy - u} h ${u * 2.4} v ${u * 2} h ${-u * 2.4} z" fill="none" stroke="${INK}" stroke-width="${stroke}" stroke-linejoin="round"/>
  <rect x="${x + 2 * (w + gap)}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="${RED}"/>
  <path d="M ${c - u} ${cy - u} L ${c + u} ${cy + u} M ${c + u} ${cy - u} L ${c - u} ${cy + u}" stroke="#ffffff" stroke-width="${stroke}" stroke-linecap="round"/>`;
};

/** Grey bars standing in for lines of writing, so a window has "work" in it without text to overflow. */
const writing = (x, y, widths, h, gap) => widths
  .map((w, i) => `<rect x="${x}" y="${y + i * (h + gap)}" width="${w}" height="${h}" rx="${h / 2}" fill="${FAINT}"/>`)
  .join('');

/** A row of `n` keyboard keys from x0 to x1 at height y. */
const keyRow = (y, x0, x1, n, h) => {
  const gap = 4;
  const w = (x1 - x0 - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => `<rect x="${Math.round((x0 + i * (w + gap)) * 10) / 10}" y="${y}" width="${Math.round(w * 10) / 10}" height="${h}" rx="3" fill="#ffffff" stroke="${CASE}" stroke-width="1"/>`).join('');
};

/** A desk fan seen from the front, centred on (cx, cy): three blades in a ring. */
const fanGlyph = (cx, cy, r, color) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2.5"/>
  <path d="M ${cx} ${cy} q ${r * 0.1} ${-r * 0.8} ${r * 0.55} ${-r * 0.55} z M ${cx} ${cy} q ${r * 0.65} ${r * 0.45} ${r * 0.2} ${r * 0.75} z M ${cx} ${cy} q ${-r * 0.75} ${r * 0.35} ${-r * 0.75} ${-r * 0.2} z" fill="${color}"/>`;

/** Two short arcs beside a fan, to show it spinning. */
const spinMarks = (cx, cy, r, color) => `<path d="M ${cx + r + 5} ${cy - r * 0.6} A ${r + 5} ${r + 5} 0 0 1 ${cx + r + 5} ${cy + r * 0.6} M ${cx - r - 5} ${cy + r * 0.6} A ${r + 5} ${r + 5} 0 0 1 ${cx - r - 5} ${cy - r * 0.6}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`;

/* ------------------------------------------------------------------ *
 * The deck's starter: four symbols found on every machine.
 * ------------------------------------------------------------------ */

/**
 * Wi-Fi, battery, power and volume, each on its own tile. The starter hotspot
 * asks for the power symbol with the names stripped, so the student has to know
 * the mark itself — the one thing that lets them turn on a machine they have
 * never seen. Power is deliberately NOT first in the row.
 */
const SYMBOLS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 250" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="242" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="38" y="28" width="150" height="150" rx="24" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <rect x="222" y="28" width="150" height="150" rx="24" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <rect x="406" y="28" width="150" height="150" rx="24" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <rect x="590" y="28" width="150" height="150" rx="24" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>

  <!-- Wi-Fi: three arcs over a dot -->
  <path d="M 94.6 116.6 A 26 26 0 0 1 131.4 116.6 M 77.6 99.6 A 50 50 0 0 1 148.4 99.6 M 60.7 82.7 A 74 74 0 0 1 165.3 82.7" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="113" cy="137" r="8" fill="${INK}"/>

  <!-- battery, three bars of four -->
  <rect x="249" y="80" width="88" height="48" rx="9" fill="none" stroke="${INK}" stroke-width="7"/>
  <rect x="340" y="93" width="10" height="22" rx="3" fill="${INK}"/>
  <rect x="259" y="90" width="18" height="28" rx="2" fill="${GREEN}"/>
  <rect x="281" y="90" width="18" height="28" rx="2" fill="${GREEN}"/>
  <rect x="303" y="90" width="18" height="28" rx="2" fill="${GREEN}"/>

  <!-- power -->
  ${powerGlyph(481, 108, 38, INK, 10)}

  <!-- volume: a speaker and two sound waves -->
  <path d="M 624 90 h 18 l 26 -24 v 74 l -26 -24 h -18 z" fill="${INK}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M 682.6 87.4 A 22 22 0 0 1 682.6 118.6 M 695.3 74.7 A 40 40 0 0 1 695.3 131.3" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>

  <text x="113" y="214" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Wi-Fi</text>
  <text x="297" y="214" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Battery</text>
  <text x="481" y="214" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Power</text>
  <text x="665" y="214" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Volume</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The machine itself.
 * ------------------------------------------------------------------ */

/**
 * A laptop, labelled: screen, keyboard, touchpad, the power button (carrying
 * the ⏻ from the starter) and the power light. Shown on the "Turning it on"
 * slide, where the button and the light are the two things the steps talk
 * about, and it is the first Label It picture — so the margins are kept clear
 * for the answer boxes (left of x=184, right of x=640).
 */
const LB_COMPUTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="800" height="500" rx="14" fill="#ffffff"/>
  <rect x="0.75" y="0.75" width="798.5" height="498.5" rx="13" fill="none" stroke="${FAINT}" stroke-width="1.5"/>

  <!-- the lid and its screen, showing a tiny desktop -->
  <rect x="230" y="24" width="340" height="226" rx="14" fill="${BEZEL}"/>
  <rect x="244" y="38" width="312" height="196" rx="4" fill="${WALL}"/>
  <rect x="258" y="50" width="26" height="26" rx="5" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="340" y="76" width="176" height="112" rx="6" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="341" y="77" width="174" height="18" fill="${FAINT}"/>
  <rect x="494" y="81" width="14" height="10" rx="2" fill="${RED}"/>
  ${writing(354, 106, [120, 96, 132], 8, 10)}
  <rect x="244" y="218" width="312" height="16" fill="${BAR}"/>
  <rect x="250" y="221" width="16" height="10" rx="2" fill="${BLUE}"/>

  <!-- hinge and the base -->
  <rect x="222" y="250" width="356" height="8" rx="3" fill="${MUTED}"/>
  <path d="M 222 258 L 578 258 L 626 446 Q 628 458 614 458 L 186 458 Q 172 458 174 446 Z" fill="${FAINT}" stroke="${CASE}" stroke-width="2.5" stroke-linejoin="round"/>

  <!-- keyboard -->
  <path d="M 262 272 L 530 272 L 546 368 L 246 368 Z" fill="${LINE}"/>
  ${keyRow(278, 266, 528, 12, 18)}
  ${keyRow(300, 262, 532, 12, 18)}
  ${keyRow(322, 258, 537, 12, 18)}
  <rect x="254" y="344" width="44" height="18" rx="3" fill="#ffffff" stroke="${CASE}" stroke-width="1"/>
  <rect x="304" y="344" width="184" height="18" rx="3" fill="#ffffff" stroke="${CASE}" stroke-width="1"/>
  <rect x="494" y="344" width="44" height="18" rx="3" fill="#ffffff" stroke="${CASE}" stroke-width="1"/>

  <!-- the power button, with the power symbol on it -->
  <circle cx="564" cy="292" r="15" fill="${BEZEL}"/>
  ${powerGlyph(564, 293, 7, '#ffffff', 2.5)}

  <!-- touchpad -->
  <rect x="344" y="380" width="112" height="62" rx="8" fill="${LINE}" stroke="${CASE}" stroke-width="2"/>

  <!-- the power light, glowing -->
  <circle cx="232" cy="440" r="11" fill="${GREEN}" opacity="0.25"/>
  <circle cx="232" cy="440" r="5.5" fill="${GREEN}"/>

  ${lead(184, 110, 262, 110)}
  ${lead(184, 318, 272, 318)}
  ${lead(184, 440, 226, 440)}
  ${lead(640, 250, 564, 292)}
  ${lead(640, 410, 452, 410)}

  <text x="112" y="116" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Screen</text>
  <text x="112" y="324" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Keyboard</text>
  <text x="112" y="446" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Power light</text>
  <text x="712" y="256" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Power button</text>
  <text x="712" y="416" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Touchpad</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The desktop.
 * ------------------------------------------------------------------ */

/**
 * The desktop, with a window open on it. The POINT_IT picture and the picture
 * behind both desktop hotspots in the deck. Every word on it is part of the
 * screen (class="keep"), so the hotspots show it exactly as it looks.
 *
 * The taskbar, left to right: the menu button, the button for the open Notes
 * window (the blue underline says "open"), Files (pinned, not open), the search
 * box, the wifi symbol, the clock.
 */
const DESKTOP_ANATOMY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <!-- a desktop icon -->
  <rect x="40" y="40" width="72" height="72" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="60" y="58" width="32" height="38" rx="4" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <text class="keep" x="76" y="134" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">My Work</text>

  <!-- a window -->
  <rect x="250" y="90" width="430" height="280" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="252" y="92" width="426" height="38" fill="${FAINT}"/>
  <text class="keep" x="280" y="117" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Notes</text>
  <!-- window controls drawn as strokes, not glyphs: they survive greyscale and
       carry no text to overflow their 28px buttons -->
  ${windowButtons(570, 101, 28, 20, 6, 2.5)}
  <text class="keep" x="284" y="176" font-family="sans-serif" font-size="15" fill="${INK}">Monday: feed the fish</text>
  <text class="keep" x="284" y="204" font-family="sans-serif" font-size="15" fill="${INK}">Tuesday: reading book</text>

  <!-- taskbar -->
  <rect x="4" y="440" width="792" height="52" fill="${BAR}"/>
  <rect x="20" y="452" width="40" height="28" rx="6" fill="${BLUE}"/>
  ${menuGlyph(40, 466, 7)}
  <rect x="76" y="452" width="40" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="88" y="457" width="16" height="17" rx="2" fill="#ffffff"/>
  <path d="M 91 462 h 10 M 91 466 h 10 M 91 470 h 6" stroke="${MUTED}" stroke-width="1.5"/>
  <rect x="86" y="477" width="20" height="3" rx="1.5" fill="${BLUE}"/>
  <rect x="124" y="452" width="40" height="28" rx="6" fill="${BAR_SOFT}"/>
  <path d="M 134 460 h 8 l 3 3 h 9 v 11 h -20 z" fill="${AMBER}"/>
  <rect x="180" y="450" width="200" height="32" rx="16" fill="${BAR_SOFT}"/>
  <text class="keep" x="204" y="471" font-family="sans-serif" font-size="14" fill="#94a3b8">Search</text>
  <rect x="640" y="452" width="56" height="28" rx="6" fill="${BAR_SOFT}"/>
  <path d="M 656 463 q 12 -10 24 0 M 661 469 q 7 -6 14 0" fill="none" stroke="${FAINT}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="668" cy="474" r="2.5" fill="${FAINT}"/>
  <rect x="716" y="444" width="64" height="44" rx="6" fill="${BAR}"/>
  <text class="keep" x="748" y="464" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>
  <text class="keep" x="748" y="480" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Mon</text>
</svg>`;

/**
 * The desktop tour: the same screen, smaller, with the six words the unit
 * teaches hung off the things they name. The deck's tour slide shows it
 * labelled; Label It strips the six labels and leaves the screen's own words.
 * Boxes: icon and desktop in the left margin, the window on the right, and the
 * menu button, taskbar and clock in a row underneath.
 */
const LB_DESKTOP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 540" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="1000" height="540" rx="14" fill="#ffffff"/>
  <rect x="0.75" y="0.75" width="998.5" height="538.5" rx="13" fill="none" stroke="${FAINT}" stroke-width="1.5"/>

  <!-- the screen -->
  <rect x="200" y="40" width="600" height="390" rx="10" fill="${WALL}" stroke="${CASE}" stroke-width="3"/>

  <!-- an icon -->
  <rect x="226" y="66" width="56" height="56" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="242" y="79" width="24" height="30" rx="3" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <text class="keep" x="254" y="142" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">My Work</text>

  <!-- a window -->
  <rect x="380" y="100" width="330" height="210" rx="8" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="382" y="102" width="326" height="30" fill="${FAINT}"/>
  <text class="keep" x="398" y="122" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Notes</text>
  ${windowButtons(624, 108, 24, 18, 5, 2)}
  ${writing(400, 152, [220, 180, 240, 150], 10, 14)}

  <!-- the taskbar -->
  <path d="M 201.5 388 H 798.5 V 420 Q 798.5 428.5 790 428.5 H 210 Q 201.5 428.5 201.5 420 Z" fill="${BAR}"/>
  <rect x="212" y="396" width="34" height="26" rx="6" fill="${BLUE}"/>
  ${menuGlyph(229, 409, 6)}
  <rect x="254" y="396" width="34" height="26" rx="6" fill="${BAR_SOFT}"/>
  <rect x="264" y="400" width="14" height="15" rx="2" fill="#ffffff"/>
  <rect x="261" y="418" width="20" height="3" rx="1.5" fill="${BLUE}"/>
  <text class="keep" x="760" y="414" font-family="sans-serif" font-size="14" font-weight="bold" fill="${FAINT}" text-anchor="middle">14:05</text>

  ${lead(180, 94, 226, 94)}
  ${lead(180, 250, 300, 250)}
  ${lead(820, 205, 690, 230)}
  ${lead(229, 470, 229, 424)}
  ${lead(500, 470, 500, 409)}
  ${lead(760, 470, 760, 422)}

  <text x="98" y="100" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Icon</text>
  <text x="98" y="256" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Desktop</text>
  <text x="902" y="211" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Window</text>
  <text x="229" y="495" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Menu button</text>
  <text x="500" y="495" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Taskbar</text>
  <text x="760" y="495" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Clock</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The window and its three buttons.
 * ------------------------------------------------------------------ */

/**
 * A window, labelled: the title bar, the three buttons and the work area. On
 * the "Three buttons in the corner" slide it is read; in Label It the five
 * labels come off. The three buttons sit side by side, so their boxes fan out:
 * the title bar, minimise and maximise in a row above, close to the right.
 */
const LB_WINDOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="960" height="540" rx="14" fill="${WALL}"/>
  <rect x="0.75" y="0.75" width="958.5" height="538.5" rx="13" fill="none" stroke="${LINE}" stroke-width="1.5"/>

  <rect x="200" y="120" width="540" height="360" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2.5"/>
  <path d="M 201.5 170 V 132 Q 201.5 121.5 212 121.5 H 728 Q 738.5 121.5 738.5 132 V 170 Z" fill="${FAINT}"/>
  <text class="keep" x="224" y="153" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}">story</text>
  ${windowButtons(584, 129, 44, 30, 6, 3)}
  ${writing(236, 206, [420, 360, 440, 300, 400, 250], 14, 22)}

  ${lead(330, 80, 430, 140)}
  ${lead(540, 80, 606, 136)}
  ${lead(740, 80, 656, 136)}
  ${lead(780, 146, 714, 144)}
  ${lead(780, 330, 640, 330)}

  <text x="330" y="68" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Title bar</text>
  <text x="540" y="68" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Minimise</text>
  <text x="740" y="68" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Maximise</text>
  <text x="862" y="152" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Close</text>
  <text x="862" y="336" font-family="sans-serif" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Work area</text>
</svg>`;

/**
 * The top-right corner of a window, drawn big: the hotspot for "the button that
 * closes the window for good". At full-slide size the three buttons are 100
 * units wide, so a fingertip on a tablet lands on the one it means.
 */
const WINDOW_CORNER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="372" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>
  <rect x="40" y="40" width="690" height="336" rx="16" fill="#ffffff" stroke="${MUTED}" stroke-width="3"/>
  <path d="M 41.5 138 V 56 Q 41.5 41.5 56 41.5 H 714 Q 728.5 41.5 728.5 56 V 138 Z" fill="${FAINT}"/>
  <text class="keep" x="80" y="102" font-family="sans-serif" font-size="30" font-weight="bold" fill="${INK}">story</text>
  ${windowButtons(388, 58, 100, 64, 12, 6)}
  ${writing(80, 180, [420, 500, 360, 460], 16, 20)}
</svg>`;

/* ------------------------------------------------------------------ *
 * Stopping.
 * ------------------------------------------------------------------ */

/**
 * The whole machine: the power menu open on screen, and the physical power
 * button down on the case. Having both in one picture is the point of the unit —
 * the four soft choices are how you stop a computer, and the hard button is the
 * thing you only HOLD when nothing else answers.
 */
const POWER_MENU = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 520" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="692" height="430" rx="14" fill="${CASE}"/>
  <rect x="24" y="24" width="652" height="386" rx="6" fill="${WALL}"/>

  <!-- the open menu -->
  <rect x="36" y="140" width="300" height="220" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <text x="60" y="170" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Power</text>
  <rect x="48" y="182" width="276" height="40" rx="8" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <circle cx="68" cy="202" r="8" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="92" y="208" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Sleep</text>
  <rect x="48" y="226" width="276" height="40" rx="8" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <circle cx="68" cy="246" r="8" fill="none" stroke="${AMBER}" stroke-width="2.5"/>
  <text x="92" y="252" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Log out</text>
  <rect x="48" y="270" width="276" height="40" rx="8" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <circle cx="68" cy="290" r="8" fill="none" stroke="#a855f7" stroke-width="2.5"/>
  <text x="92" y="296" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Restart</text>
  <rect x="48" y="314" width="276" height="40" rx="8" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <circle cx="68" cy="334" r="8" fill="none" stroke="${RED}" stroke-width="2.5"/>
  <text x="92" y="340" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Shut down</text>

  <!-- taskbar -->
  <rect x="24" y="368" width="652" height="42" fill="${BAR}"/>
  <rect x="36" y="376" width="40" height="26" rx="6" fill="${BLUE}"/>
  ${menuGlyph(56, 389, 7)}

  <!-- the case, and the button on it -->
  <rect x="4" y="440" width="692" height="76" rx="10" fill="${LINE}"/>
  <rect x="40" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="176" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="312" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="448" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="604" y="456" width="56" height="34" rx="9" fill="#475569"/>
  ${powerGlyph(632, 474, 8, '#ffffff', 2.5)}
</svg>`;

/**
 * The deck's stopping ladder: four ways to stop, drawn as a row so the ordering
 * (least final on the left, most final on the right) is visible before a word
 * of it is read — and, under each, what happens to the work you had open. Only
 * Sleep keeps it; that one strip is the reason for "save first".
 */
const STOP_LADDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <defs><marker id="t01-ladder-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${MUTED}"/></marker></defs>
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text x="380" y="32" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Left to right, each one goes further</text>
  <path d="M 40 46 L 716 46" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" marker-end="url(#t01-ladder-arrow)"/>

  <rect x="28" y="62" width="164" height="118" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="110" y="100" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Sleep</text>
  <text x="110" y="130" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Rests. Wakes</text>
  <text x="110" y="150" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">in a second.</text>

  <rect x="212" y="62" width="164" height="118" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2.5"/>
  <text x="294" y="100" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">Log out</text>
  <text x="294" y="130" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You leave.</text>
  <text x="294" y="150" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">It stays on.</text>

  <rect x="396" y="62" width="164" height="118" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2.5"/>
  <text x="478" y="100" font-family="sans-serif" font-size="18" font-weight="bold" fill="#7e22ce" text-anchor="middle">Restart</text>
  <text x="478" y="130" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Off, then on</text>
  <text x="478" y="150" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">again by itself.</text>

  <rect x="580" y="62" width="164" height="118" rx="12" fill="#fef2f2" stroke="${RED}" stroke-width="2.5"/>
  <text x="662" y="100" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b91c1c" text-anchor="middle">Shut down</text>
  <text x="662" y="130" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">All the way</text>
  <text x="662" y="150" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">off.</text>

  <rect x="28" y="192" width="164" height="36" rx="8" fill="#ecfdf5" stroke="${GREEN}" stroke-width="2"/>
  <text x="110" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">Work stays open</text>
  <rect x="212" y="192" width="164" height="36" rx="8" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="294" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">Work closes</text>
  <rect x="396" y="192" width="164" height="36" rx="8" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="478" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">Work closes</text>
  <rect x="580" y="192" width="164" height="36" rx="8" fill="#fef2f2" stroke="${RED}" stroke-width="2"/>
  <text x="662" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">Work closes</text>

  <text x="380" y="266" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Save first. Every time.</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Source Analysis pictures.
 * ------------------------------------------------------------------ */

/**
 * Source Analysis: the sticky note on the monitor. Nothing on this picture is
 * technically broken, which is exactly why it works as a source — the student
 * has to notice that the security is defeated by a piece of paper.
 */
const LOGIN_STICKY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="412" rx="14" fill="${CASE}"/>
  <rect x="24" y="24" width="592" height="336" rx="6" fill="#1f3a5f"/>

  <circle cx="320" cy="112" r="34" fill="${LINE}"/>
  <circle cx="320" cy="102" r="12" fill="${MUTED}"/>
  <path d="M 300 130 q 20 -18 40 0" fill="${MUTED}"/>
  <text x="320" y="182" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Ha Vi</text>
  <rect x="200" y="204" width="240" height="40" rx="20" fill="#ffffff"/>
  <text x="224" y="230" font-family="sans-serif" font-size="15" fill="${MUTED}">Password</text>
  <text x="320" y="284" font-family="sans-serif" font-size="14" fill="${LINE}" text-anchor="middle">Type your password to log in</text>

  <!-- the sticky note, taped to the bezel -->
  <rect x="430" y="292" width="172" height="104" rx="4" fill="#fde68a" stroke="#d9a441" stroke-width="2"/>
  <text x="516" y="326" font-family="sans-serif" font-size="14" font-weight="bold" fill="#7c5a10" text-anchor="middle">my password</text>
  <text x="516" y="356" font-family="monospace" font-size="18" font-weight="bold" fill="#7c5a10" text-anchor="middle">havi2016</text>
  <text x="516" y="380" font-family="sans-serif" font-size="12" fill="#8a6a20" text-anchor="middle">do not forget!</text>
</svg>`;

/**
 * Two screens that look alike and mean completely different things. Telling
 * "locked" from "off" is the single most useful reading on this unit's screen,
 * and it decides whether your work is still there. The evidence is DRAWN — a
 * glowing light and a spinning fan against a dark light and a still one — and
 * spelled out underneath in words that are part of the picture (class="keep"),
 * because the deck asks about it with a hotspot, which strips plain labels.
 */
const LOCKED_VS_OFF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="392" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <text class="keep" x="196" y="40" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Screen A</text>
  <rect x="56" y="54" width="280" height="194" rx="12" fill="${BEZEL}"/>
  <rect x="68" y="66" width="256" height="160" rx="4" fill="#1f3a5f"/>
  <circle cx="196" cy="104" r="22" fill="${LINE}"/>
  <circle cx="196" cy="98" r="8" fill="${MUTED}"/>
  <path d="M 184 116 q 12 -12 24 0" fill="${MUTED}"/>
  <text class="keep" x="196" y="152" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Ha Vi</text>
  <rect x="116" y="166" width="160" height="30" rx="15" fill="#ffffff"/>
  <text class="keep" x="134" y="186" font-family="sans-serif" font-size="13" fill="${MUTED}">Password</text>
  <circle cx="318" cy="237" r="10" fill="${GREEN}" opacity="0.3"/>
  <circle cx="318" cy="237" r="5" fill="${GREEN}"/>
  <rect x="176" y="248" width="40" height="22" fill="${CASE}"/>
  <rect x="136" y="270" width="120" height="10" rx="5" fill="${CASE}"/>

  <text class="keep" x="564" y="40" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Screen B</text>
  <rect x="424" y="54" width="280" height="194" rx="12" fill="${BEZEL}"/>
  <rect x="436" y="66" width="256" height="160" rx="4" fill="#0b0f14"/>
  <circle cx="686" cy="237" r="5" fill="#0f172a"/>
  <rect x="544" y="248" width="40" height="22" fill="${CASE}"/>
  <rect x="504" y="270" width="120" height="10" rx="5" fill="${CASE}"/>

  <!-- the evidence -->
  <circle cx="96" cy="316" r="17" fill="${GREEN}" opacity="0.25"/>
  <circle cx="96" cy="316" r="9" fill="${GREEN}"/>
  <text class="keep" x="128" y="323" font-family="sans-serif" font-size="20" font-weight="bold" fill="#047857">Light: on</text>
  ${fanGlyph(96, 360, 13, INK)}
  ${spinMarks(96, 360, 13, MUTED)}
  <text class="keep" x="128" y="367" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}">Fan: running</text>

  <circle cx="464" cy="316" r="9" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <text class="keep" x="496" y="323" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}">Light: off</text>
  ${fanGlyph(464, 360, 13, MUTED)}
  <text class="keep" x="496" y="367" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}">Fan: silent</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Workbook.
 * ------------------------------------------------------------------ */

/**
 * Workbook p5: the story window has vanished, but its button is still on the
 * taskbar with the "open" underline. Reading that underline is the whole
 * question — the work is minimised, not gone.
 */
const WB_TASKBAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 210" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="202" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>
  <rect x="34" y="26" width="56" height="56" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="50" y="39" width="24" height="30" rx="3" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <text class="keep" x="62" y="104" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">My Work</text>

  <path d="M 5 138 H 755 V 192 Q 755 205 742 205 H 18 Q 5 205 5 192 Z" fill="${BAR}"/>
  <rect x="20" y="150" width="46" height="40" rx="8" fill="${BLUE}"/>
  ${menuGlyph(43, 170, 8)}

  <rect x="80" y="150" width="136" height="40" rx="8" fill="${BAR_SOFT}"/>
  <rect x="92" y="159" width="18" height="21" rx="2" fill="#ffffff"/>
  <path d="M 96 165 h 10 M 96 170 h 10 M 96 175 h 6" stroke="${MUTED}" stroke-width="1.5"/>
  <text class="keep" x="120" y="176" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">story</text>
  <path d="M 122 186 H 174" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>

  <rect x="226" y="150" width="46" height="40" rx="8" fill="${BAR_SOFT}"/>
  <path d="M 238 162 h 9 l 3 3 h 10 v 13 h -22 z" fill="${AMBER}"/>

  <text class="keep" x="712" y="176" font-family="sans-serif" font-size="16" font-weight="bold" fill="${FAINT}" text-anchor="middle">16:40</text>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file, so `{ KEY }`
// would report every reference in the unit as undefined.
export const DIAGRAMS = {
  SYMBOLS: SYMBOLS,
  LB_COMPUTER: LB_COMPUTER,
  DESKTOP_ANATOMY: DESKTOP_ANATOMY,
  LB_DESKTOP: LB_DESKTOP,
  LB_WINDOW: LB_WINDOW,
  WINDOW_CORNER: WINDOW_CORNER,
  POWER_MENU: POWER_MENU,
  STOP_LADDER: STOP_LADDER,
  LOGIN_STICKY: LOGIN_STICKY,
  LOCKED_VS_OFF: LOCKED_VS_OFF,
  WB_TASKBAR: WB_TASKBAR,
};
