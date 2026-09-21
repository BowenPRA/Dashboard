// src/data/PRIMARY_TECH/T04/diagrams.js
// T4 Saving Your Work — the unit's authored art, referenced by key
// (docs/svg-diagrams.md §1). Generic windows, real names: the pixels are
// invented, the words (Save As, Documents, Recycle Bin, Ctrl+S) are the real ones
// (docs/digital-skills-course.md §5.2). Colours echo the Try It window (sky-blue
// Save and open folder, green Save in the box) so the deck's pictures, the demo
// and the task all look like the same machine.
//
// TWO VIEWS OF ONE DRAWING. The Save As box and the file manager are each drawn
// ONCE, as a fragment in the coordinates of their Label It version
// (SA_DIALOG, FM_WINDOW), and interpolated twice:
//   · LB_SAVE_AS / LB_FILE_MANAGER — the fragment with room in the margins, the
//     printed labels and their leader lines. Shown labelled in the deck; Label It
//     strips the labels and draws a blank box on each leader.
//   · SAVE_AS_DIALOG / FILE_MANAGER — the same fragment, cropped by the viewBox
//     (which therefore does not start at 0 0). Find It and the deck's hotspots
//     use these, so every coordinate is shared across all three tasks.
// `npm run audit:svg` splices a `${FRAGMENT}` into the picture that uses it, so
// the fragment's labels are measured in both.
//
// Tagging, for the tasks that strip text (hotspot, Label It):
//   · class="keep" — words that are PART OF THE SCREEN (Save, Documents, a file
//     name). They survive, and the question asks by function instead.
//   · class="lbl"  — leader lines and their end dots (the `lead` helper).
//   · plain <text>  — a teaching label; stripped.
// Helpers draw shapes only. Every word is written out literally in the
// template, because the svg audit cannot see text a helper emits.

const INK = '#1e293b';
const MUTED = '#64748b';
const SLATE = '#475569';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PANEL = '#f1f5f9';
const PAPER = '#f8fafc';
const BLUE = '#3b82f6';
const SKY = '#0ea5e9';
const SKY_DARK = '#0369a1';
const SKY_PALE = '#e0f2fe';
const GREEN = '#58cc02';
const GREEN_DARK = '#15803d';
const RED = '#ef4444';
const PURPLE = '#a855f7';
const LABEL = '#7e22ce';
const WALL = '#dbeafe';

/* ------------------------------------------------------------------ *
 * Shape helpers (no text)
 * ------------------------------------------------------------------ */

/** A leader line from a printed label to the part it names, ending in a dot. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${PURPLE}" stroke-width="2" stroke-linecap="round"/>
  <circle class="lbl" cx="${x2}" cy="${y2}" r="4" fill="${PURPLE}"/>`;

/** A folder, 20 × 15, top-left at (x, y). */
const folderIcon = (x, y, fill = '#fcd34d', stroke = '#d97706') =>
  `<path d="M ${x} ${y + 2} q 0 -2 2 -2 h 5 l 2 2 h 9 q 2 0 2 2 v 9 q 0 2 -2 2 h -16 q -2 0 -2 -2 z" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>`;

/** A document, 16 × 20, top-left at (x, y): a page with a folded corner. */
const docIcon = (x, y, stroke = MUTED) =>
  `<path d="M ${x} ${y + 2} q 0 -2 2 -2 h 8 l 6 6 v 12 q 0 2 -2 2 h -12 q -2 0 -2 -2 z" fill="#ffffff" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M ${x + 10} ${y} v 6 h 6" fill="none" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M ${x + 4} ${y + 11} h 8 M ${x + 4} ${y + 15} h 8" stroke="${stroke}" stroke-width="1.4"/>`;

/** A PDF: the document with a red band across it. */
const pdfIcon = (x, y) => `${docIcon(x, y)}
  <path d="M ${x + 1} ${y + 8} h 14 v 5 h -14 z" fill="${RED}"/>`;

/** A picture, 18 × 16, top-left at (x, y): a frame, a hill and a sun. */
const imageIcon = (x, y, stroke = MUTED) =>
  `<path d="M ${x + 2} ${y + 2} h 14 q 2 0 2 2 v 12 q 0 2 -2 2 h -14 q -2 0 -2 -2 v -12 q 0 -2 2 -2 z" fill="#ffffff" stroke="${stroke}" stroke-width="1.6"/>
  <path d="M ${x + 2} ${y + 16} l 5 -6 l 4 4 l 2 -2 l 4 4 z" fill="#86efac" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="${x + 13}" cy="${y + 7}" r="2" fill="#fbbf24"/>`;

/** The Recycle Bin, 16 × 18, top-left at (x, y). */
const binIcon = (x, y, stroke = SLATE) =>
  `<path d="M ${x} ${y + 3} h 16 M ${x + 5} ${y + 3} v -2 h 6 v 2" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M ${x + 2} ${y + 6} h 12 l -1.2 12 h -9.6 z" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M ${x + 6} ${y + 9} v 6 M ${x + 10} ${y + 9} v 6" stroke="${stroke}" stroke-width="1.4" stroke-linecap="round"/>`;

/** The ⋮ button: three dots stacked, centred on (x, y). */
const dotsIcon = (x, y, fill = SLATE) =>
  `<circle cx="${x}" cy="${y - 5}" r="1.9" fill="${fill}"/><circle cx="${x}" cy="${y}" r="1.9" fill="${fill}"/><circle cx="${x}" cy="${y + 5}" r="1.9" fill="${fill}"/>`;

/** A magnifying glass centred near (x, y). */
const magIcon = (x, y, stroke = MUTED) =>
  `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${stroke}" stroke-width="2"/>
  <path d="M ${x + 3.6} ${y + 3.6} l 4.4 4.4" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;

/** Minimise, maximise and close, starting at (x, y) and 22 apart. */
const winButtons = (x, y, stroke = MUTED) =>
  `<path d="M ${x - 5} ${y + 4} h 10" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
  <path d="M ${x + 17} ${y - 4} h 10 v 9 h -10 z" fill="none" stroke="${stroke}" stroke-width="1.8"/>
  <path d="M ${x + 39} ${y - 4} l 9 9 M ${x + 48} ${y - 4} l -9 9" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>`;

/** A computer mouse, 22 × 32, top-left at (x, y), its RIGHT button pressed. */
const mouseIcon = (x, y) =>
  `<path d="M ${x} ${y + 11} q 0 -11 11 -11 q 11 0 11 11 v 10 q 0 11 -11 11 q -11 0 -11 -11 z" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
  <path d="M ${x + 11} ${y} q 11 0 11 11 v 1 h -11 z" fill="${PURPLE}" stroke="${INK}" stroke-width="1.5"/>
  <path d="M ${x} ${y + 12} h 22 M ${x + 11} ${y} v 12" stroke="${INK}" stroke-width="1.5"/>`;

/** Grey bars standing in for lines of typed text. `widths` in viewBox units. */
const textLines = (x, y, widths, gap = 20) =>
  widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="8" rx="4" fill="${FAINT}"/>`).join('');

/** A scaled copy of any icon helper's output. */
const big = (x, y, k, inner) => `<g transform="translate(${x} ${y}) scale(${k})">${inner}</g>`;

/* ------------------------------------------------------------------ *
 * The Save As box — drawn once (SA_DIALOG), shown twice
 * ------------------------------------------------------------------ */

/**
 * The single most important box in this unit, and the one students click
 * through without reading. It asks two questions — what is it called, and which
 * folder — and it has ALREADY answered both badly: Untitled, in Downloads. That
 * is the picture of how "I saved it but I can't find it" happens.
 * Coordinates are LB_SAVE_AS's (viewBox 0 0 940 460).
 */
const SA_DIALOG = `
  <rect x="230" y="50" width="480" height="360" rx="14" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 232 64 q 0 -12 12 -12 h 452 q 12 0 12 12 v 32 h -476 z" fill="${FAINT}"/>
  <text class="keep" x="254" y="81" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Save As</text>

  <text class="keep" x="258" y="126" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">File name</text>
  <rect x="256" y="140" width="428" height="46" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="274" y="170" font-family="monospace" font-size="17" fill="${MUTED}">Untitled</text>

  <text class="keep" x="258" y="217" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">Save it in</text>
  <rect x="256" y="232" width="140" height="44" rx="8" fill="${PANEL}" stroke="${LINE}" stroke-width="2"/>
  ${folderIcon(268, 247)}
  <text class="keep" x="342" y="259" font-family="sans-serif" font-size="15" font-weight="bold" fill="${SLATE}" text-anchor="middle">Documents</text>
  <rect x="408" y="232" width="140" height="44" rx="8" fill="${SKY}" stroke="${SKY_DARK}" stroke-width="2"/>
  ${folderIcon(420, 247, '#ffffff', '#ffffff')}
  <text class="keep" x="494" y="259" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Downloads</text>
  <rect x="560" y="232" width="124" height="44" rx="8" fill="${PANEL}" stroke="${LINE}" stroke-width="2"/>
  ${folderIcon(572, 247)}
  <text class="keep" x="638" y="259" font-family="sans-serif" font-size="15" font-weight="bold" fill="${SLATE}" text-anchor="middle">Desktop</text>

  <rect x="452" y="338" width="110" height="46" rx="8" fill="${PANEL}" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="507" y="367" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Cancel</text>
  <rect x="574" y="338" width="110" height="46" rx="8" fill="${GREEN}"/>
  <text class="keep" x="629" y="367" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>`;

/** The Save As box alone, cropped from LB_SAVE_AS. Find It, the hotspots, the workbook. */
const SAVE_AS_DIALOG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="210 30 520 400" class="w-full h-full drop-shadow-md">
  <rect x="210" y="30" width="520" height="400" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${SA_DIALOG}
</svg>`;

/**
 * The Save As box labelled by FUNCTION, not by the word on the control: the
 * words are already on the screen, and what a student has to know is what each
 * part DOES. Label It strips these four and leaves a blank box on each leader.
 */
const LB_SAVE_AS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 460" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="940" height="460" rx="14" fill="${PAPER}"/>
  <rect x="1" y="1" width="938" height="458" rx="13" fill="none" stroke="${LINE}" stroke-width="2"/>
  ${SA_DIALOG}

  ${lead(722, 163, 678, 163)}
  ${lead(218, 254, 262, 254)}
  ${lead(722, 361, 678, 361)}
  ${lead(218, 361, 458, 361)}
  <text x="728" y="168" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}">Where the name goes</text>
  <text x="212" y="259" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}" text-anchor="end">Where it will be kept</text>
  <text x="728" y="366" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}">Saves the file</text>
  <text x="212" y="366" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}" text-anchor="end">Closes without saving</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * The file manager — drawn once (FM_WINDOW), shown twice
 * ------------------------------------------------------------------ */

/**
 * The same window as the Try It task: folder list on the left (Documents open),
 * the files in it on the right, a search box, and a ⋮ on every row. Coordinates
 * are LB_FILE_MANAGER's (viewBox 0 0 940 480).
 */
const FM_WINDOW = `
  <rect x="230" y="40" width="480" height="400" rx="14" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 232 54 q 0 -12 12 -12 h 452 q 12 0 12 12 v 26 h -476 z" fill="${FAINT}"/>
  ${folderIcon(248, 54)}
  <text class="keep" x="276" y="67" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Files</text>
  ${winButtons(640, 61)}
  <path d="M 232 81 h 156 v 357 h -144 q -12 0 -12 -12 z" fill="${PANEL}"/>
  <path d="M 388 81 v 357 M 232 81 h 476" stroke="${FAINT}" stroke-width="2"/>

  <rect x="240" y="92" width="140" height="36" rx="9" fill="${SKY}"/>
  ${folderIcon(250, 103, '#ffffff', '#ffffff')}
  <text class="keep" x="278" y="115" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">Documents</text>
  ${folderIcon(250, 145)}
  <text class="keep" x="278" y="157" font-family="sans-serif" font-size="14" font-weight="bold" fill="${SLATE}">Downloads</text>
  ${folderIcon(250, 187)}
  <text class="keep" x="278" y="199" font-family="sans-serif" font-size="14" font-weight="bold" fill="${SLATE}">Desktop</text>
  ${binIcon(252, 227)}
  <text class="keep" x="278" y="241" font-family="sans-serif" font-size="14" font-weight="bold" fill="${SLATE}">Recycle Bin</text>

  <text class="keep" x="404" y="109" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Documents</text>
  <text class="keep" x="490" y="109" font-family="sans-serif" font-size="11" font-weight="bold" fill="${MUTED}">4 items</text>
  <rect x="566" y="90" width="132" height="28" rx="7" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${magIcon(580, 103)}
  <text x="594" y="109" font-family="sans-serif" font-size="12" fill="#94a3b8">Search</text>
  <path d="M 388 126 h 320" stroke="${FAINT}" stroke-width="2"/>

  <rect x="396" y="134" width="304" height="38" rx="9" fill="${SKY_PALE}" stroke="${SKY}" stroke-width="2"/>
  ${docIcon(408, 143)}
  <text class="keep" x="434" y="158" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">volcano report.docx</text>
  ${dotsIcon(682, 153)}
  ${docIcon(408, 187)}
  <text class="keep" x="434" y="202" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">maths homework.docx</text>
  ${dotsIcon(682, 197)}
  ${imageIcon(407, 232)}
  <text class="keep" x="434" y="246" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">rainforest poster.png</text>
  ${dotsIcon(682, 241)}
  ${docIcon(408, 275)}
  <text class="keep" x="434" y="290" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">class trip plan.docx</text>
  ${dotsIcon(682, 285)}
  <path d="M 404 219 h 288 M 404 263 h 288 M 404 307 h 288" stroke="${FAINT}" stroke-width="1.5"/>`;

/** The file manager alone, cropped from LB_FILE_MANAGER. Find It and the bin hotspot. */
const FILE_MANAGER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="210 20 520 440" class="w-full h-full drop-shadow-md">
  <rect x="210" y="20" width="520" height="440" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${FM_WINDOW}
</svg>`;

/** The file manager with its five parts named. The deck shows it; Label It strips it. */
const LB_FILE_MANAGER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="940" height="480" rx="14" fill="${PAPER}"/>
  <rect x="1" y="1" width="938" height="478" rx="13" fill="none" stroke="${LINE}" stroke-width="2"/>
  ${FM_WINDOW}

  ${lead(218, 152, 262, 152)}
  ${lead(218, 236, 260, 236)}
  ${lead(722, 104, 692, 104)}
  ${lead(722, 153, 684, 153)}
  ${lead(722, 340, 604, 292)}
  <text x="212" y="157" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}" text-anchor="end">Folder list</text>
  <text x="212" y="241" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}" text-anchor="end">Recycle Bin</text>
  <text x="728" y="109" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}">Search box</text>
  <text x="728" y="158" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}">A file's ⋮ menu</text>
  <text x="728" y="345" font-family="sans-serif" font-size="16" font-weight="bold" fill="${LABEL}">File list</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Saved or not saved — the dot in the title
 * ------------------------------------------------------------------ */

/**
 * The same document twice: before Save (a red dot after the name, NOT SAVED)
 * and after (no dot, and the strip says where it went). The strip at the top is
 * the one place that always tells the truth about whether work is safe.
 */
const TITLE_BARS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 350" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="350" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="30" y="20" width="700" height="140" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 32 32 q 0 -10 10 -10 h 676 q 10 0 10 10 v 36 h -696 z" fill="${PANEL}"/>
  ${docIcon(46, 34)}
  <text class="keep" x="72" y="52" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">story</text>
  <circle cx="125" cy="46" r="6" fill="${RED}"/>
  <text class="keep" x="140" y="51" font-family="sans-serif" font-size="11" font-weight="bold" fill="${MUTED}">NOT SAVED</text>
  <rect x="560" y="32" width="74" height="28" rx="7" fill="${SKY}"/>
  <text class="keep" x="597" y="51" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  <rect x="644" y="32" width="76" height="28" rx="7" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="682" y="51" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Save As</text>
  ${textLines(54, 88, [320, 280, 150])}
  <line x1="408" y1="118" x2="130" y2="54" stroke="${RED}" stroke-width="2" stroke-linecap="round"/>
  <text x="414" y="124" font-family="sans-serif" font-size="15" font-weight="bold" fill="${RED}">The red dot: NOT saved yet</text>

  <rect x="30" y="190" width="700" height="140" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 32 202 q 0 -10 10 -10 h 676 q 10 0 10 10 v 36 h -696 z" fill="${PANEL}"/>
  ${docIcon(46, 204)}
  <text class="keep" x="72" y="222" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">story.docx</text>
  <text class="keep" x="182" y="221" font-family="sans-serif" font-size="11" font-weight="bold" fill="${GREEN_DARK}">SAVED IN DOCUMENTS</text>
  <rect x="560" y="202" width="74" height="28" rx="7" fill="${SKY}"/>
  <text class="keep" x="597" y="221" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  <rect x="644" y="202" width="76" height="28" rx="7" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="682" y="221" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">Save As</text>
  ${textLines(54, 258, [320, 280, 150])}
  <line x1="408" y1="288" x2="300" y2="228" stroke="${GREEN_DARK}" stroke-width="2" stroke-linecap="round"/>
  <text x="414" y="294" font-family="sans-serif" font-size="15" font-weight="bold" fill="${GREEN_DARK}">Saved, and it says where</text>
</svg>`;

/**
 * Three open windows, one with unsaved changes (the dot after "story.docx").
 * The deck's hotspot: "which one would you lose if the power went off now?"
 * Every word here is on the screen, so all of it is `keep`.
 */
const THREE_WINDOWS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 340" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="900" height="340" rx="14" fill="${WALL}"/>

  <rect x="20" y="40" width="270" height="260" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 22 52 q 0 -10 10 -10 h 246 q 10 0 10 10 v 30 h -266 z" fill="${PANEL}"/>
  ${docIcon(32, 52)}
  <text class="keep" x="54" y="68" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">maths homework.docx</text>
  <rect x="226" y="50" width="54" height="24" rx="6" fill="${SKY}"/>
  <text class="keep" x="253" y="66" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  ${textLines(40, 104, [210, 180, 200, 120, 190, 150, 90], 24)}

  <rect x="315" y="40" width="270" height="260" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 317 52 q 0 -10 10 -10 h 246 q 10 0 10 10 v 30 h -266 z" fill="${PANEL}"/>
  ${imageIcon(326, 52)}
  <text class="keep" x="350" y="68" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">poster.png</text>
  <rect x="521" y="50" width="54" height="24" rx="6" fill="${SKY}"/>
  <text class="keep" x="548" y="66" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  <rect x="340" y="100" width="220" height="180" rx="8" fill="#ecfccb"/>
  <path d="M 340 280 l 70 -86 l 50 58 l 30 -32 l 70 60 z" fill="#86efac" stroke="${GREEN_DARK}" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="512" cy="136" r="18" fill="#fbbf24"/>
  <rect x="396" y="206" width="12" height="44" fill="#a16207"/>
  <circle cx="402" cy="196" r="22" fill="#22c55e" stroke="${GREEN_DARK}" stroke-width="2"/>

  <rect x="610" y="40" width="270" height="260" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 612 52 q 0 -10 10 -10 h 246 q 10 0 10 10 v 30 h -266 z" fill="${PANEL}"/>
  ${docIcon(622, 52)}
  <text class="keep" x="644" y="68" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">story.docx</text>
  <circle cx="729" cy="63" r="5.5" fill="${RED}"/>
  <rect x="816" y="50" width="54" height="24" rx="6" fill="${SKY}"/>
  <text class="keep" x="843" y="66" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  ${textLines(630, 104, [220, 200, 210, 170, 215, 190, 60], 24)}
</svg>`;

/* ------------------------------------------------------------------ *
 * Save or Save As
 * ------------------------------------------------------------------ */

/**
 * Save versus Save As, the one distinction this unit has to land. Two paths out
 * of the same document, drawn as a count of FILES afterwards — one, or two —
 * because that is the whole difference, not which menu item you picked.
 */
const SAVE_VS_SAVE_AS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 340" class="w-full h-full drop-shadow-md">
  <defs>
    <marker id="t4-over" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${BLUE}"/>
    </marker>
  </defs>
  <rect x="4" y="4" width="752" height="332" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="28" y="30" width="336" height="258" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="196" y="64" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Save</text>
  <text x="196" y="96" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Writes over the SAME file.</text>
  <text x="196" y="118" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You still have ONE file.</text>
  ${big(180, 138, 2, docIcon(0, 0, SLATE))}
  <path d="M 222 150 q 26 18 0 36" fill="none" stroke="${BLUE}" stroke-width="2.5" marker-end="url(#t4-over)"/>
  <text x="196" y="202" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">story</text>
  <text x="196" y="242" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">The first time, it has to ask</text>
  <text x="196" y="264" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">where — so it opens Save As.</text>

  <rect x="396" y="30" width="336" height="258" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5"/>
  <text x="564" y="64" font-family="sans-serif" font-size="18" font-weight="bold" fill="${GREEN_DARK}" text-anchor="middle">Save As</text>
  <text x="564" y="96" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Makes a NEW file.</text>
  <text x="564" y="118" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Now you have TWO.</text>
  ${big(506, 138, 2, docIcon(0, 0, SLATE))}
  ${big(590, 138, 2, docIcon(0, 0, GREEN_DARK))}
  <text x="522" y="202" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}" text-anchor="middle">story</text>
  <text x="606" y="202" font-family="sans-serif" font-size="13" font-weight="bold" fill="${GREEN_DARK}" text-anchor="middle">story 2</text>
  <text x="564" y="242" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">Use it to keep the old one,</text>
  <text x="564" y="264" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">or to put a copy somewhere.</text>

  <text x="380" y="318" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Same document. Different question.</text>
</svg>`;

/**
 * What "keep your first draft" leaves behind: two files, side by side, the old
 * one untouched. The deck's check asks how to get here; Try It job 2 asks the
 * student to actually do it.
 */
const DRAFTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="300" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="20" width="720" height="210" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 22 32 q 0 -10 10 -10 h 696 q 10 0 10 10 v 30 h -716 z" fill="${PANEL}"/>
  ${folderIcon(38, 34)}
  <text class="keep" x="66" y="47" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Documents</text>
  <text class="keep" x="70" y="88" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}">Name</text>
  <text class="keep" x="360" y="88" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}">Date</text>

  <rect x="36" y="100" width="688" height="48" rx="9" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  ${docIcon(46, 114, SLATE)}
  <text class="keep" x="70" y="130" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">volcano report.docx</text>
  <text class="keep" x="360" y="130" font-family="sans-serif" font-size="14" fill="${MUTED}">Mon 14 Sep</text>
  <text x="500" y="130" font-family="sans-serif" font-size="14" font-weight="bold" fill="${LABEL}">your first draft, safe</text>

  <rect x="36" y="160" width="688" height="48" rx="9" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
  ${docIcon(46, 174, GREEN_DARK)}
  <text class="keep" x="70" y="190" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">volcano report 2.docx</text>
  <text class="keep" x="360" y="190" font-family="sans-serif" font-size="14" fill="${MUTED}">Mon 21 Sep</text>
  <text x="500" y="190" font-family="sans-serif" font-size="14" font-weight="bold" fill="${GREEN_DARK}">the new version</text>

  <text x="380" y="266" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="middle">Save As made the second file. Nothing touched the first.</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Two ways to do everything
 * ------------------------------------------------------------------ */

/**
 * The button and the key; the ⋮ and the right-click. Knowing two routes to
 * everything is what keeps a student from being stuck on an unfamiliar machine
 * — and Cmd+S is named, so a Mac is not a different subject.
 */
const TWO_WAYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 320" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="320" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="16" y="16" width="356" height="288" rx="14" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="194" y="48" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Save</text>
  <rect x="134" y="66" width="120" height="40" rx="9" fill="${SKY}"/>
  <text class="keep" x="194" y="92" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
  <text x="194" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="${MUTED}" text-anchor="middle">or</text>
  <rect x="96" y="160" width="86" height="54" rx="10" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
  <text class="keep" x="139" y="194" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Ctrl</text>
  <text x="194" y="194" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
  <rect x="206" y="160" width="86" height="54" rx="10" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
  <text class="keep" x="249" y="194" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
  <text x="194" y="248" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">On a Mac: Cmd + S</text>
  <text x="194" y="276" font-family="sans-serif" font-size="12" fill="${MUTED}" text-anchor="middle">It works in almost every program.</text>

  <rect x="388" y="16" width="356" height="288" rx="14" fill="#faf5ff" stroke="${PURPLE}" stroke-width="2.5"/>
  <text x="566" y="48" font-family="sans-serif" font-size="18" font-weight="bold" fill="${LABEL}" text-anchor="middle">A file's actions</text>
  <rect x="408" y="66" width="316" height="40" rx="9" fill="#ffffff" stroke="${SKY}" stroke-width="2"/>
  ${docIcon(420, 76)}
  <text class="keep" x="444" y="91" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">volcano report.docx</text>
  <circle cx="704" cy="86" r="12" fill="#e9d5ff"/>
  ${dotsIcon(704, 86, INK)}
  <rect x="566" y="114" width="150" height="112" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="586" y="142" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Rename</text>
  <text class="keep" x="586" y="174" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">Move to</text>
  <text class="keep" x="586" y="206" font-family="sans-serif" font-size="14" font-weight="bold" fill="${RED}">Delete</text>
  ${mouseIcon(414, 236)}
  <text x="448" y="258" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}">or right-click the file:</text>
  <text x="448" y="280" font-family="sans-serif" font-size="13" fill="${MUTED}">the same menu opens</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Lost it? Search
 * ------------------------------------------------------------------ */

/** Part of a name in the search box, and every file that has it, wherever it is. */
const SEARCH_RESULTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="300" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="20" width="720" height="236" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="44" y="40" width="672" height="52" rx="12" fill="#ffffff" stroke="${SKY}" stroke-width="3"/>
  ${big(62, 52, 1.8, magIcon(6, 6, SKY_DARK))}
  <text class="keep" x="98" y="74" font-family="monospace" font-size="20" fill="${INK}">poster</text>
  <text class="keep" x="48" y="122" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">2 results</text>

  <rect x="44" y="136" width="672" height="46" rx="9" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  ${imageIcon(58, 150)}
  <text class="keep" x="90" y="165" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">rainforest poster.png</text>
  <text class="keep" x="700" y="165" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="end">in Desktop</text>
  <rect x="44" y="190" width="672" height="46" rx="9" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  ${docIcon(59, 203)}
  <text class="keep" x="90" y="219" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">poster ideas.docx</text>
  <text class="keep" x="700" y="219" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="end">in Documents</text>

  <text x="380" y="282" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="middle">Only part of the name was typed. Both files have it.</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Source analysis (DIAGRAMS task) — three pictures to read
 * ------------------------------------------------------------------ */

/**
 * A desktop buried in files the computer named. Every one was "saved", and not
 * one of them says what it is — which is the whole argument for the two
 * questions in the Save As box, made without a word.
 */
const SA_DESKTOP_MESS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 470" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="470" rx="14" fill="${WALL}"/>

  ${big(57, 30, 1.6, docIcon(0, 0))}
  <text class="keep" x="70" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Untitled1.docx</text>
  ${big(181, 30, 1.6, docIcon(0, 0))}
  <text class="keep" x="194" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Untitled2.docx</text>
  ${big(305, 30, 1.6, docIcon(0, 0))}
  <text class="keep" x="318" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Document1.docx</text>
  ${big(426, 34, 1.6, folderIcon(0, 0))}
  <text class="keep" x="442" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">New folder</text>
  ${big(553, 30, 1.6, docIcon(0, 0))}
  <text class="keep" x="566" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">asdf.docx</text>
  ${big(677, 30, 1.6, docIcon(0, 0))}
  <text class="keep" x="690" y="84" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">final.docx</text>

  ${big(57, 146, 1.6, docIcon(0, 0))}
  <text class="keep" x="70" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">final (2).docx</text>
  ${big(181, 146, 1.6, docIcon(0, 0))}
  <text class="keep" x="194" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Untitled3.docx</text>
  ${big(304, 148, 1.6, imageIcon(0, 0))}
  <text class="keep" x="318" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">IMG_0412.jpg</text>
  ${big(429, 146, 1.6, docIcon(0, 0))}
  <text class="keep" x="442" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Document2.docx</text>
  ${big(553, 146, 1.6, docIcon(0, 0))}
  <text class="keep" x="566" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">doc.docx</text>
  ${big(674, 150, 1.6, folderIcon(0, 0))}
  <text class="keep" x="690" y="200" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">New folder (2)</text>

  ${big(57, 262, 1.6, docIcon(0, 0))}
  <text class="keep" x="70" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Untitled4.docx</text>
  ${big(181, 262, 1.6, docIcon(0, 0))}
  <text class="keep" x="194" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">final FINAL.docx</text>
  ${big(304, 264, 1.6, imageIcon(0, 0))}
  <text class="keep" x="318" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">IMG_0413.jpg</text>
  ${big(429, 262, 1.6, docIcon(0, 0))}
  <text class="keep" x="442" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Untitled5.docx</text>
  ${big(553, 262, 1.6, docIcon(0, 0))}
  <text class="keep" x="566" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">Document3.docx</text>
  ${big(677, 262, 1.6, docIcon(0, 0))}
  <text class="keep" x="690" y="316" font-family="sans-serif" font-size="12" fill="${INK}" text-anchor="middle">stuff.docx</text>

  <path d="M 0 420 h 760 v 36 q 0 14 -14 14 h -732 q -14 0 -14 -14 z" fill="${INK}"/>
  <circle cx="30" cy="445" r="14" fill="${SKY}"/>
  <text class="keep" x="738" y="451" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="end">14:05</text>
</svg>`;

/**
 * A Downloads folder sorted by NAME, with the date each file arrived — and the
 * same worksheet downloaded twice, the second copy renamed "(1)" by the
 * computer. Which one came today is in the Date column and the clock, not in
 * the name and not in the order of the list.
 */
const SA_DOWNLOADS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="430" rx="14" fill="${WALL}"/>
  <rect x="20" y="16" width="720" height="360" rx="14" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 22 30 q 0 -12 12 -12 h 692 q 12 0 12 12 v 30 h -716 z" fill="${FAINT}"/>
  ${folderIcon(40, 31)}
  <text class="keep" x="68" y="45" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Downloads</text>
  <rect x="22" y="62" width="716" height="34" fill="${PANEL}"/>
  <text class="keep" x="70" y="84" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">Name</text>
  <path d="M 114 81 l 5 -7 l 5 7 z" fill="${INK}"/>
  <text class="keep" x="420" y="84" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">Date</text>

  ${imageIcon(39, 115)}
  <text class="keep" x="70" y="130" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">class-photo.jpg</text>
  <text class="keep" x="420" y="130" font-family="sans-serif" font-size="15" fill="${SLATE}">3 Sep 2026, 16:20</text>
  ${pdfIcon(40, 166)}
  <text class="keep" x="70" y="182" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">maths-sheet (1).pdf</text>
  <text class="keep" x="420" y="182" font-family="sans-serif" font-size="15" fill="${SLATE}">21 Sep 2026, 08:14</text>
  ${pdfIcon(40, 218)}
  <text class="keep" x="70" y="234" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">maths-sheet.pdf</text>
  <text class="keep" x="420" y="234" font-family="sans-serif" font-size="15" fill="${SLATE}">7 Sep 2026, 17:02</text>
  ${pdfIcon(40, 270)}
  <text class="keep" x="70" y="286" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">reading-list.pdf</text>
  <text class="keep" x="420" y="286" font-family="sans-serif" font-size="15" fill="${SLATE}">14 Aug 2026, 10:31</text>
  ${pdfIcon(40, 322)}
  <text class="keep" x="70" y="338" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">summer-reading.pdf</text>
  <text class="keep" x="420" y="338" font-family="sans-serif" font-size="15" fill="${SLATE}">2 Jul 2026, 12:45</text>
  <path d="M 36 148 h 688 M 36 200 h 688 M 36 252 h 688 M 36 304 h 688" stroke="${FAINT}" stroke-width="1.5"/>

  <path d="M 0 386 h 760 v 30 q 0 14 -14 14 h -732 q -14 0 -14 -14 z" fill="${INK}"/>
  <circle cx="30" cy="408" r="12" fill="${SKY}"/>
  <text class="keep" x="738" y="404" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="end">08:20</text>
  <text class="keep" x="738" y="422" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="end">Mon 21 Sep 2026</text>
</svg>`;

/**
 * A Documents folder, sorted by name the way a file manager sorts it: four
 * names that say what the work is, four that say nothing. The written source
 * question asks which is which, and why.
 */
const SA_DOCUMENTS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 460" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="760" height="460" rx="14" fill="${WALL}"/>
  <rect x="20" y="16" width="720" height="428" rx="14" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M 22 30 q 0 -12 12 -12 h 692 q 12 0 12 12 v 30 h -716 z" fill="${FAINT}"/>
  ${folderIcon(40, 31)}
  <text class="keep" x="68" y="45" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Documents</text>
  <text class="keep" x="170" y="45" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}">8 items</text>

  ${docIcon(40, 76)}
  <text class="keep" x="70" y="92" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">asdf.docx</text>
  ${docIcon(40, 122)}
  <text class="keep" x="70" y="138" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">doc.docx</text>
  ${docIcon(40, 168)}
  <text class="keep" x="70" y="184" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">final FINAL.docx</text>
  ${docIcon(40, 214)}
  <text class="keep" x="70" y="230" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">maths homework week 3.docx</text>
  ${imageIcon(39, 261)}
  <text class="keep" x="70" y="276" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">rainforest poster.png</text>
  ${docIcon(40, 306)}
  <text class="keep" x="70" y="322" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">science test notes.docx</text>
  ${docIcon(40, 352)}
  <text class="keep" x="70" y="368" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">Untitled3.docx</text>
  ${docIcon(40, 398)}
  <text class="keep" x="70" y="414" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}">volcano report.docx</text>
  <path d="M 36 108 h 688 M 36 154 h 688 M 36 200 h 688 M 36 246 h 688 M 36 292 h 688 M 36 338 h 688 M 36 384 h 688" stroke="${FAINT}" stroke-width="1.5"/>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file.
export const DIAGRAMS = {
  SAVE_AS_DIALOG: SAVE_AS_DIALOG,
  LB_SAVE_AS: LB_SAVE_AS,
  FILE_MANAGER: FILE_MANAGER,
  LB_FILE_MANAGER: LB_FILE_MANAGER,
  TITLE_BARS: TITLE_BARS,
  THREE_WINDOWS: THREE_WINDOWS,
  SAVE_VS_SAVE_AS: SAVE_VS_SAVE_AS,
  DRAFTS: DRAFTS,
  TWO_WAYS: TWO_WAYS,
  SEARCH_RESULTS: SEARCH_RESULTS,
  SA_DESKTOP_MESS: SA_DESKTOP_MESS,
  SA_DOWNLOADS: SA_DOWNLOADS,
  SA_DOCUMENTS: SA_DOCUMENTS,
};
