// src/data/PRIMARY_TECH/T07/diagrams.js
// T7 Inside a Browser — every authored picture in the unit, referenced by key
// (docs/svg-diagrams.md §1). The deck, the hotspots, Label It, Find It, the
// Practice set and Source Analysis all draw from here, so the student meets the
// same browser, the same school website and the same addresses everywhere.
//
// A GENERIC browser, not a copy of Chrome (docs/digital-skills-course.md §5.2).
// The transferable facts are that the tabs run along the top, the address bar
// is above every page and shows where you are, and a download tells you where
// it went — not one vendor's pixels. Real names throughout: address bar, tab,
// bookmark, reload, Downloads. The websites are the Try It skin's fake web
// (docs/primary-tech/UPGRADE-PLAN.md §3.1): www.schoolsite.org (Riverside
// School), www.citylibrary.org, www.weathernow.org, www.kidsmaths.org.
//
// House rules:
//  · label and interface <text> is written out literally, never built by a
//    helper, so `npm run audit:svg` can measure it. Helpers draw SHAPES only
//    (arrows, crosses, stars, icons, leader lines);
//  · no nested backtick template inside an SVG template — a helper call instead;
//  · words that are part of the SCREEN (the address in the bar, a tab's title,
//    "Show in folder" on its button) carry class="keep", so a hotspot or Label
//    It that strips printed labels leaves the screen itself readable;
//  · printed labels and their leader lines (the LB_* diagrams) carry no keep,
//    and the leaders and their end dots carry class="lbl", so Label It strips
//    them and draws its own boxes in their place.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const BLUE = '#3b82f6';
const BLUE_D = '#1d4ed8';
const AMBER = '#f59e0b';
const AMBER_D = '#b45309';
const GREEN = '#10b981';
const GREEN_D = '#047857';
const RED = '#ef4444';
const PURPLE = '#8b5cf6';
const SKY = '#0ea5e9';
const LEAD = '#7c8a95';

/* ---------------------------------------------------------------------------
 * Shape helpers. No <text> in any of these.
 * ------------------------------------------------------------------------- */

/** A leader line from a printed label to the part, ending in a dot. Label It strips both. */
const lead = (x1, y1, x2, y2) => `<line class="lbl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="2"/>
  <circle class="lbl" cx="${x2}" cy="${y2}" r="4" fill="${LEAD}"/>`;

/** The little coloured square a website puts on its tab. */
const favicon = (cx, cy, fill) => `<rect x="${cx - 7}" y="${cy - 7}" width="14" height="14" rx="3" fill="${fill}"/>`;

/** An ×: on a tab it closes that page; in the window corner it closes everything. */
const cross = (cx, cy, s = 5, stroke = MUTED) => `<path d="M ${cx - s} ${cy - s} L ${cx + s} ${cy + s} M ${cx + s} ${cy - s} L ${cx - s} ${cy + s}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;

/** The + that opens a new tab. */
const plusGlyph = (cx, cy, s = 7) => `<path d="M ${cx - s} ${cy} h ${2 * s} M ${cx} ${cy - s} v ${2 * s}" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round"/>`;

/** Back (◀), forward (▶, grey until you have gone back) and reload (↻). */
const backGlyph = (cx, cy) => `<path d="M ${cx + 6} ${cy} h -16 M ${cx - 3} ${cy - 8} l -8 8 l 8 8" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const fwdGlyph = (cx, cy) => `<path d="M ${cx - 8} ${cy} h 16 M ${cx + 1} ${cy - 8} l 8 8 l -8 8" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const reloadGlyph = (cx, cy) => `<path d="M ${cx - 8} ${cy} a 8 8 0 1 1 3 6" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M ${cx - 12} ${cy - 6} l 5 6 l 6 -4" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

/** The bookmark star, `s` times its toolbar size. */
const starGlyph = (cx, cy, s = 1, fill = 'none', stroke = MUTED) => `<path d="M ${cx} ${cy - 11 * s} l ${4.5 * s} ${9 * s} l ${10 * s} ${1.5 * s} l ${-7 * s} ${7 * s} l ${1.5 * s} ${10 * s} l ${-9 * s} ${-4.5 * s} l ${-9 * s} ${4.5 * s} l ${1.5 * s} ${-10 * s} l ${-7 * s} ${-7 * s} l ${10 * s} ${-1.5 * s} z" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>`;

/** A magnifying glass: the sign for "search". */
const magnifier = (cx, cy, stroke = MUTED) => `<circle cx="${cx - 2}" cy="${cy - 2}" r="6.5" fill="none" stroke="${stroke}" stroke-width="2.5"/>
  <path d="M ${cx + 3} ${cy + 3} l 5 5" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round"/>`;

/** An arrow into a tray: the sign for "download". */
const downloadGlyph = (cx, cy, stroke) => `<path d="M ${cx} ${cy - 10} v 12 M ${cx - 6} ${cy - 3} l 6 6 l 6 -6 M ${cx - 9} ${cy + 5} v 4 h 18 v -4" fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A PDF file: a page with a red band. */
const pdfIcon = (cx, cy) => `<rect x="${cx - 8}" y="${cy - 11}" width="16" height="22" rx="2" fill="#ffffff" stroke="${RED}" stroke-width="2"/>
  <rect x="${cx - 8}" y="${cy + 1}" width="16" height="6" fill="${RED}"/>`;

/** A green tick in a circle: finished. */
const tick = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="10" fill="${GREEN}"/>
  <path d="M ${cx - 5} ${cy} l 3.5 4 l 6.5 -8" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

/** The window's own three buttons, far right: minimise, maximise, close. */
const winControls = (x, cy) => `<path d="M ${x - 7} ${cy} h 14" stroke="${MUTED}" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="${x + 23}" y="${cy - 7}" width="14" height="14" rx="2" fill="none" stroke="${MUTED}" stroke-width="2"/>
  ${cross(x + 62, cy, 6)}`;

/** A mouse pointer, its tip at (x, y). */
const pointer = (x, y) => `<path d="M ${x} ${y} l 0 28 l 7 -7 l 5 12 l 6 -2.5 l -5 -12 l 10 0 z" fill="#ffffff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;

/* Taskbar app icons, each centred on (cx, cy) inside a 56-unit tile. */
const menuGlyph = (cx, cy) => `<rect x="${cx - 13}" y="${cy - 13}" width="11" height="11" rx="2.5" fill="${BLUE}"/>
  <rect x="${cx + 2}" y="${cy - 13}" width="11" height="11" rx="2.5" fill="${BLUE}"/>
  <rect x="${cx - 13}" y="${cy + 2}" width="11" height="11" rx="2.5" fill="${BLUE}"/>
  <rect x="${cx + 2}" y="${cy + 2}" width="11" height="11" rx="2.5" fill="${BLUE}"/>`;
const folderIcon = (cx, cy) => `<path d="M ${cx - 18} ${cy - 12} h 13 l 4 5 h 19 v 21 h -36 z" fill="#fbbf24" stroke="${AMBER_D}" stroke-width="2" stroke-linejoin="round"/>`;
const notesIcon = (cx, cy) => `<rect x="${cx - 13}" y="${cy - 17}" width="26" height="34" rx="3" fill="#ffffff" stroke="${BLUE}" stroke-width="2"/>
  <path d="M ${cx - 7} ${cy - 8} h 14 M ${cx - 7} ${cy - 1} h 14 M ${cx - 7} ${cy + 6} h 9" stroke="${BLUE}" stroke-width="2" stroke-linecap="round"/>`;
const paintIcon = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="19" ry="15" fill="#fef3c7" stroke="${AMBER_D}" stroke-width="2"/>
  <circle cx="${cx + 8}" cy="${cy + 6}" r="4" fill="#ffffff" stroke="${AMBER_D}" stroke-width="1.5"/>
  <circle cx="${cx - 9}" cy="${cy - 4}" r="3.5" fill="${RED}"/>
  <circle cx="${cx - 1}" cy="${cy - 8}" r="3.5" fill="${BLUE}"/>
  <circle cx="${cx + 8}" cy="${cy - 5}" r="3.5" fill="${GREEN}"/>
  <circle cx="${cx - 8}" cy="${cy + 6}" r="3.5" fill="${PURPLE}"/>`;
const globeIcon = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="18" fill="#dbeafe" stroke="${BLUE_D}" stroke-width="2.5"/>
  <ellipse cx="${cx}" cy="${cy}" rx="8" ry="18" fill="none" stroke="${BLUE_D}" stroke-width="2"/>
  <path d="M ${cx - 18} ${cy} h 36 M ${cx - 15} ${cy - 9} q 15 5 30 0 M ${cx - 15} ${cy + 9} q 15 -5 30 0" fill="none" stroke="${BLUE_D}" stroke-width="2"/>`;
const calcIcon = (cx, cy) => `<rect x="${cx - 13}" y="${cy - 18}" width="26" height="36" rx="4" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <rect x="${cx - 8}" y="${cy - 13}" width="16" height="8" rx="1.5" fill="#ffffff" stroke="${MUTED}" stroke-width="1.5"/>
  <circle cx="${cx - 6}" cy="${cy + 3}" r="2.2" fill="${MUTED}"/><circle cx="${cx}" cy="${cy + 3}" r="2.2" fill="${MUTED}"/><circle cx="${cx + 6}" cy="${cy + 3}" r="2.2" fill="${MUTED}"/>
  <circle cx="${cx - 6}" cy="${cy + 11}" r="2.2" fill="${MUTED}"/><circle cx="${cx}" cy="${cy + 11}" r="2.2" fill="${MUTED}"/><circle cx="${cx + 6}" cy="${cy + 11}" r="2.2" fill="${AMBER}"/>`;

/** A drawn school building in a picture frame (the photo on the school's home page). */
const schoolPicture = (x, y) => `<rect x="${x}" y="${y}" width="220" height="170" rx="10" fill="#e0f2fe" stroke="${LINE}" stroke-width="2"/>
  <path d="M ${x} ${y + 140} q 110 -24 220 0 v 20 a 10 10 0 0 1 -10 10 h -200 a 10 10 0 0 1 -10 -10 z" fill="#bbf7d0"/>
  <path d="M ${x + 110} ${y + 28} v -18" stroke="${INK}" stroke-width="2"/>
  <path d="M ${x + 110} ${y + 10} l 18 5 l -18 5 z" fill="${GREEN}"/>
  <path d="M ${x + 30} ${y + 72} L ${x + 110} ${y + 28} L ${x + 190} ${y + 72} Z" fill="#fca5a5" stroke="#b91c1c" stroke-width="2" stroke-linejoin="round"/>
  <rect x="${x + 40}" y="${y + 72}" width="140" height="78" fill="#fde68a" stroke="${AMBER_D}" stroke-width="2"/>
  <rect x="${x + 55}" y="${y + 88}" width="26" height="20" fill="#ffffff" stroke="${AMBER_D}" stroke-width="2"/>
  <rect x="${x + 139}" y="${y + 88}" width="26" height="20" fill="#ffffff" stroke="${AMBER_D}" stroke-width="2"/>
  <rect x="${x + 95}" y="${y + 110}" width="30" height="40" fill="#92400e"/>`;

/** A picture that did not load: a dashed empty frame with a torn picture icon. */
const brokenPicture = (x, y) => `<rect x="${x}" y="${y}" width="300" height="170" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="${x + 125}" y="${y + 62}" width="50" height="40" rx="4" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <path d="M ${x + 129} ${y + 96} l 12 -14 l 9 9 l 7 -6 l 14 11" fill="none" stroke="${MUTED}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M ${x + 160} ${y + 58} l -6 12 l 8 6 l -7 12 l 7 8 l -5 12" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A square bracket over (up) or under (down) one part of an address. */
const bracketUp = (x1, x2, y, stroke) => `<path d="M ${x1} ${y} V ${y - 10} H ${x2} V ${y}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`;
const bracketDown = (x1, x2, y, stroke) => `<path d="M ${x1} ${y} V ${y + 10} H ${x2} V ${y}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`;

/* ---------------------------------------------------------------------------
 * The shared browser, 800 units wide.
 *
 * Two tabs (Riverside School, and School Library — the one you are looking
 * at), the + for a new tab, the window's own three buttons, then back /
 * forward / reload, the address bar and the bookmark star. Drawn once so the
 * anatomy picture and the after-download picture are the same machine.
 * ------------------------------------------------------------------------- */

/** Back, forward and reload on the left of the toolbar, the star on the right (y 64–100). */
const TOOLBAR = `
  <rect x="20" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${backGlyph(38, 82)}
  <rect x="64" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${fwdGlyph(82, 82)}
  <rect x="108" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${reloadGlyph(126, 82)}
  <rect x="724" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${starGlyph(742, 82)}`;

const CHROME = `
  <rect x="20" y="12" width="200" height="40" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${favicon(40, 32, GREEN)}
  <text class="keep" x="54" y="37" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Riverside School</text>
  ${cross(204, 32, 4.5)}
  <rect x="228" y="12" width="210" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(248, 32, BLUE)}
  <text class="keep" x="262" y="37" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">School Library</text>
  ${cross(420, 32, 4.5, INK)}
  <rect x="448" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(462, 32)}
  ${winControls(700, 32)}
  ${TOOLBAR}
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.schoolsite.org/library</text>`;

/** The School Library page itself: heading, the site's own search box, a link, a Download button. */
const LIBRARY_PAGE = `
  <text class="keep" x="400" y="165" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">School Library</text>
  <rect x="250" y="195" width="300" height="48" rx="10" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  ${magnifier(274, 219)}
  <text class="keep" x="294" y="225" font-family="sans-serif" font-size="16" fill="${MUTED}">Search this site</text>
  <text class="keep" x="400" y="292" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Year 6 reading list</text>
  <rect x="310" y="330" width="180" height="48" rx="10" fill="${BLUE}"/>
  ${downloadGlyph(340, 354, '#ffffff')}
  <text class="keep" x="412" y="360" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Download PDF</text>`;

/**
 * The browser, unlabelled — the hotspot on slide 5, Find It, and Source
 * Analysis. The search box on the page is drawn a long way from the address
 * bar on purpose, so the confusion between them is about what each one DOES,
 * not about which is nearer.
 */
const BROWSER_ANATOMY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${CHROME}
  <rect x="20" y="112" width="760" height="372" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  ${LIBRARY_PAGE}
</svg>`;

/**
 * The same browser one second after the download. The bar along the bottom is
 * the whole answer to "where did it go?" — and it is the thing students click
 * away without reading.
 */
const AFTER_DOWNLOAD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 540" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="532" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${CHROME}
  <rect x="20" y="112" width="760" height="330" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  ${LIBRARY_PAGE}
  <rect x="20" y="452" width="760" height="72" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="40" y="466" width="300" height="44" rx="8" fill="#eff6ff" stroke="${BLUE}" stroke-width="2"/>
  ${pdfIcon(60, 488)}
  <text class="keep" x="80" y="494" font-family="monospace" font-size="16" fill="${INK}">reading-list.pdf</text>
  ${tick(316, 488)}
  <rect x="380" y="466" width="190" height="44" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="475" y="494" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Show in folder</text>
  <rect x="590" y="466" width="170" height="44" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="675" y="494" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">All downloads</text>
</svg>`;

/**
 * Label It and the deck's "parts of a browser": the same browser drawn narrower,
 * with the margins left free for the seven labels (tabs, new tab, back, reload,
 * address bar, bookmark star, the page). Printed labels and leaders are
 * stripped by Label It; the words ON the screen are class="keep".
 * Pin coordinates: `node scripts/svg-coords.mjs PRIMARY_TECH/T07 LB_BROWSER`.
 */
const LB_BROWSER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 580" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="1040" height="580" rx="14" fill="#ffffff"/>
  <rect x="220" y="120" width="600" height="440" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="232" y="130" width="170" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${favicon(250, 148, GREEN)}
  <text class="keep" x="263" y="153" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">Riverside School</text>
  <rect x="408" y="130" width="170" height="36" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(426, 148, BLUE)}
  <text class="keep" x="439" y="153" font-family="sans-serif" font-size="13" font-weight="bold" fill="${INK}">School Library</text>
  <rect x="586" y="134" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(600, 148, 6)}
  <rect x="232" y="176" width="32" height="32" rx="7" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${backGlyph(250, 192)}
  <rect x="270" y="176" width="32" height="32" rx="7" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${fwdGlyph(286, 192)}
  <rect x="308" y="176" width="32" height="32" rx="7" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${reloadGlyph(326, 192)}
  <rect x="350" y="176" width="410" height="32" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="366" y="198" font-family="monospace" font-size="15" fill="${INK}">www.schoolsite.org/library</text>
  <rect x="768" y="176" width="32" height="32" rx="7" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${starGlyph(784, 192, 0.85)}
  <rect x="232" y="218" width="576" height="330" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="520" y="266" font-family="sans-serif" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">School Library</text>
  <rect x="380" y="288" width="280" height="40" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  ${magnifier(402, 308)}
  <text class="keep" x="420" y="313" font-family="sans-serif" font-size="14" fill="${MUTED}">Search this site</text>
  <text class="keep" x="520" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Year 6 reading list</text>
  <rect x="430" y="394" width="180" height="44" rx="10" fill="${BLUE}"/>
  ${downloadGlyph(458, 416, '#ffffff')}
  <text class="keep" x="530" y="421" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Download PDF</text>

  <text x="360" y="87" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Tabs</text>
  ${lead(360, 96, 317, 137)}
  ${lead(360, 96, 493, 137)}
  <text x="600" y="87" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">New tab button</text>
  ${lead(600, 96, 600, 137)}
  <text x="880" y="87" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Address bar</text>
  ${lead(880, 96, 700, 186)}
  <text x="206" y="198" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">Back button</text>
  ${lead(210, 192, 238, 202)}
  <text x="206" y="268" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}" text-anchor="end">Reload button</text>
  ${lead(210, 262, 322, 204)}
  <text x="834" y="198" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}">Bookmark star</text>
  ${lead(830, 192, 796, 192)}
  <text x="834" y="456" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}">The web page</text>
  ${lead(830, 450, 770, 450)}
</svg>`;

/**
 * The top of a browser with three pages open — the new-tab hotspot and the
 * tabs slide. Every X here closes something different: the one on a tab closes
 * that page, the one in the window corner closes the whole browser. The + is
 * the only thing that opens anything.
 */
const TAB_STRIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 200" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="720" height="200" rx="14" fill="#ffffff"/>
  <rect x="10" y="10" width="700" height="180" rx="12" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="20" width="170" height="52" rx="10" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${favicon(40, 46, AMBER)}
  <text class="keep" x="56" y="52" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Homework</text>
  ${cross(170, 46)}
  <rect x="196" y="20" width="190" height="52" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(216, 46, PURPLE)}
  <text class="keep" x="232" y="52" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">City Library</text>
  ${cross(366, 46, 5, INK)}
  <rect x="392" y="20" width="168" height="52" rx="10" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${favicon(412, 46, SKY)}
  <text class="keep" x="428" y="52" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}">Weather Now</text>
  ${cross(544, 46)}
  <rect x="568" y="28" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(586, 46, 8)}
  ${winControls(638, 46)}
  <rect x="20" y="84" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${backGlyph(38, 102)}
  <rect x="62" y="84" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${fwdGlyph(80, 102)}
  <rect x="104" y="84" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${reloadGlyph(122, 102)}
  <rect x="150" y="84" width="490" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="170" y="108" font-family="monospace" font-size="16" fill="${INK}">www.citylibrary.org</text>
  <rect x="650" y="84" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${starGlyph(668, 102)}
  <rect x="20" y="130" width="680" height="50" rx="8" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="360" y="165" font-family="sans-serif" font-size="22" font-weight="900" fill="${INK}" text-anchor="middle">City Library</text>
</svg>`;

/**
 * The starter: a desktop and its taskbar. No names under the icons — a real
 * taskbar has none — so the student finds the browser by its picture, and the
 * explanation names every one.
 */
const TASKBAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="800" height="240" rx="14" fill="#ffffff"/>
  <rect x="10" y="10" width="780" height="150" rx="10" fill="#e0f2fe"/>
  <circle cx="690" cy="58" r="24" fill="#fde68a"/>
  <path d="M 10 118 Q 190 70 400 112 T 790 96 V 160 H 10 Z" fill="#bbf7d0"/>
  <rect x="10" y="150" width="780" height="80" rx="10" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <rect x="22" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${menuGlyph(50, 190)}
  <rect x="92" y="170" width="160" height="40" rx="20" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${magnifier(116, 190)}
  <text class="keep" x="134" y="196" font-family="sans-serif" font-size="15" fill="${MUTED}">Search</text>
  <rect x="270" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${folderIcon(298, 190)}
  <rect x="346" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${notesIcon(374, 190)}
  <rect x="422" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${paintIcon(450, 190)}
  <rect x="498" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${globeIcon(526, 190)}
  <rect x="574" y="162" width="56" height="56" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${calcIcon(602, 190)}
  <text class="keep" x="740" y="197" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">14:05</text>
</svg>`;

/**
 * The teaching diagram for the confusion this whole unit exists to fix. Both
 * boxes are drawn the same shape on purpose — the difference is not what they
 * look like, it is where they live and what they reach.
 */
const ADDRESS_VS_SEARCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="28" y="50" width="336" height="200" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="196" y="86" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE_D}" text-anchor="middle">Address bar</text>
  <rect x="56" y="102" width="280" height="34" rx="17" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="76" y="125" font-family="monospace" font-size="14" fill="${INK}">www.citylibrary.org</text>
  <text x="196" y="172" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">At the TOP of the browser.</text>
  <text x="196" y="198" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Takes you to ANY website.</text>
  <text x="196" y="224" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You type an address.</text>

  <rect x="396" y="50" width="336" height="200" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2.5"/>
  <text x="564" y="86" font-family="sans-serif" font-size="18" font-weight="bold" fill="${AMBER_D}" text-anchor="middle">Search box</text>
  <rect x="424" y="102" width="280" height="34" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="444" y="125" font-family="sans-serif" font-size="14" fill="${MUTED}">Search this site</text>
  <text x="564" y="172" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">INSIDE the page.</text>
  <text x="564" y="198" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Searches THIS site only.</text>
  <text x="564" y="224" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You type words.</text>

  <text x="380" y="276" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Two boxes. Two different jobs.</text>
</svg>`;

/**
 * The predict slide: the mistake, a second before it happens. The school's home
 * page, with the City Library's ADDRESS typed into the school's OWN search box
 * and the pointer on its Search button.
 */
const SITE_SEARCH_MISTAKE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 430" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="422" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="12" width="220" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(40, 32, GREEN)}
  <text class="keep" x="54" y="37" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Riverside School</text>
  ${cross(222, 32, 4.5, INK)}
  <rect x="250" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(264, 32)}
  ${winControls(700, 32)}
  ${TOOLBAR}
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.schoolsite.org</text>
  <rect x="20" y="112" width="760" height="302" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="400" y="162" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">Riverside School</text>
  <text class="keep" x="300" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Library</text>
  <text class="keep" x="400" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Homework</text>
  <text class="keep" x="500" y="204" font-family="sans-serif" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">News</text>
  <rect x="170" y="240" width="360" height="52" rx="10" fill="#ffffff" stroke="${AMBER}" stroke-width="3"/>
  ${magnifier(196, 266)}
  <text class="keep" x="216" y="273" font-family="monospace" font-size="18" fill="${INK}">www.citylibrary.org</text>
  <line x1="410" y1="253" x2="410" y2="280" stroke="${INK}" stroke-width="2"/>
  <rect x="542" y="240" width="100" height="52" rx="10" fill="${BLUE}"/>
  <text class="keep" x="592" y="273" font-family="sans-serif" font-size="17" font-weight="bold" fill="#ffffff" text-anchor="middle">Search</text>
  ${pointer(606, 276)}
  <text class="keep" x="400" y="360" font-family="sans-serif" font-size="16" fill="${MUTED}" text-anchor="middle">Welcome back! Sports Day is on Friday.</text>
</svg>`;

/**
 * Going to an address, the two moments that matter: one click SELECTS the old
 * address (it turns blue), and typing REPLACES it. The address text is given a
 * fixed length so the blue selection always fits it, whatever monospace font
 * the device has.
 */
const ADDRESS_SELECTED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 296" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="640" height="296" rx="14" fill="#ffffff"/>
  <text x="30" y="40" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}">1. Click once in the address bar</text>
  <rect x="30" y="60" width="580" height="48" rx="24" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
  <rect x="46" y="70" width="234" height="28" rx="4" fill="#bfdbfe"/>
  <text x="56" y="91" font-family="monospace" font-size="20" fill="${INK}" textLength="216" lengthAdjust="spacingAndGlyphs">www.schoolsite.org</text>
  <text x="30" y="134" font-family="sans-serif" font-size="15" fill="${MUTED}">The old address turns blue: it is selected.</text>
  <text x="30" y="172" font-family="sans-serif" font-size="18" font-weight="bold" fill="${INK}">2. Type the new address</text>
  <rect x="30" y="194" width="580" height="48" rx="24" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="56" y="225" font-family="monospace" font-size="20" fill="${INK}" textLength="228" lengthAdjust="spacingAndGlyphs">www.citylibrary.org</text>
  <line x1="289" y1="206" x2="289" y2="232" stroke="${INK}" stroke-width="2"/>
  <text x="30" y="268" font-family="sans-serif" font-size="15" fill="${MUTED}">It replaces the blue one. There is nothing to delete.</text>
</svg>`;

/**
 * Label It and the deck's English beat: one address, four parts. Each part is
 * its own <text> with a fixed length, so the four sit end to end as one
 * address, and each has its own colour and bracket. The address is part of the
 * screen (class="keep"); the four printed names are what the student supplies.
 */
const LB_ADDRESS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 370" class="w-full h-full drop-shadow-md">
  <rect x="0" y="0" width="1000" height="370" rx="14" fill="#ffffff"/>
  <text x="500" y="42" font-family="sans-serif" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">One address, four parts</text>
  <rect x="110" y="160" width="780" height="80" rx="40" fill="#ffffff" stroke="${LINE}" stroke-width="3"/>
  <text class="keep" x="150" y="214" font-family="monospace" font-size="44" fill="${MUTED}" textLength="108" lengthAdjust="spacingAndGlyphs">www.</text>
  <text class="keep" x="258" y="214" font-family="monospace" font-size="44" fill="${BLUE_D}" textLength="270" lengthAdjust="spacingAndGlyphs">schoolsite</text>
  <text class="keep" x="528" y="214" font-family="monospace" font-size="44" fill="${GREEN_D}" textLength="108" lengthAdjust="spacingAndGlyphs">.org</text>
  <text class="keep" x="636" y="214" font-family="monospace" font-size="44" fill="${AMBER_D}" textLength="216" lengthAdjust="spacingAndGlyphs">/library</text>
  ${bracketUp(152, 256, 150, MUTED)}
  ${bracketDown(260, 526, 250, BLUE_D)}
  ${bracketUp(530, 634, 150, GREEN_D)}
  ${bracketDown(638, 850, 250, AMBER_D)}

  <text x="204" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">The start</text>
  ${lead(204, 110, 204, 140)}
  <text x="393" y="318" font-family="sans-serif" font-size="20" font-weight="bold" fill="${BLUE_D}" text-anchor="middle">The website's name</text>
  ${lead(393, 294, 393, 260)}
  <text x="582" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="${GREEN_D}" text-anchor="middle">The ending</text>
  ${lead(582, 110, 582, 140)}
  <text x="744" y="318" font-family="sans-serif" font-size="20" font-weight="bold" fill="${AMBER_D}" text-anchor="middle">A page on the website</text>
  ${lead(744, 294, 744, 260)}
</svg>`;

/**
 * Links: the school's home page with exactly ONE link on it, sitting inside a
 * sentence. Everything else — a big heading, a picture, bold words, plain
 * words — is there to be tapped by mistake and named.
 */
const PAGE_WITH_LINK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="432" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="12" width="220" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(40, 32, GREEN)}
  <text class="keep" x="54" y="37" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Riverside School</text>
  ${cross(222, 32, 4.5, INK)}
  <rect x="250" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(264, 32)}
  ${winControls(700, 32)}
  ${TOOLBAR}
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text class="keep" x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.schoolsite.org</text>
  <rect x="20" y="112" width="760" height="312" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text class="keep" x="400" y="160" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">Riverside School</text>
  ${schoolPicture(60, 190)}
  <text class="keep" x="320" y="214" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}">This week</text>
  <text class="keep" x="320" y="250" font-family="sans-serif" font-size="18" fill="${INK}">Sports Day is on Friday.</text>
  <text class="keep" x="320" y="278" font-family="sans-serif" font-size="18" fill="${INK}">Bring a hat and some water.</text>
  <text class="keep" x="320" y="318" font-family="sans-serif" font-size="18" fill="${INK}">Your reading list is on the</text>
  <text class="keep" x="320" y="348" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE}" text-decoration="underline">Library page</text>
</svg>`;

/**
 * The Practice set's broken page: Weather Now, half loaded. The picture never
 * arrived and most of the words are still grey bars. Nothing is wrong with the
 * computer; the page needs fetching again.
 */
const HALF_LOADED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="412" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="20" y="12" width="220" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${favicon(40, 32, SKY)}
  <text x="54" y="37" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Weather Now</text>
  ${cross(222, 32, 4.5, INK)}
  <rect x="250" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  ${plusGlyph(264, 32)}
  ${winControls(700, 32)}
  ${TOOLBAR}
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.weathernow.org</text>
  <rect x="20" y="112" width="760" height="292" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text x="400" y="160" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">Weather Now</text>
  ${brokenPicture(60, 190)}
  <text x="400" y="214" font-family="sans-serif" font-size="20" font-weight="bold" fill="${INK}">Today: sunny, 31°C</text>
  <rect x="400" y="236" width="320" height="14" rx="7" fill="${FAINT}"/>
  <rect x="400" y="264" width="270" height="14" rx="7" fill="${FAINT}"/>
  <rect x="400" y="292" width="300" height="14" rx="7" fill="${FAINT}"/>
  <rect x="400" y="320" width="200" height="14" rx="7" fill="${FAINT}"/>
</svg>`;

/**
 * Source Analysis and the "is it gone?" slide: the Downloads folder, later. A
 * downloaded file is a file like any other, filed by name and by date in a
 * folder that already exists — not something that lives inside the browser.
 */
const DOWNLOADS_FOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="712" height="412" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="6" y="6" width="708" height="40" fill="${FAINT}"/>
  <text x="32" y="33" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Downloads</text>

  <rect x="6" y="46" width="180" height="364" fill="${PAPER}"/>
  <text x="30" y="84" font-family="sans-serif" font-size="15" fill="${MUTED}">Desktop</text>
  <text x="30" y="120" font-family="sans-serif" font-size="15" fill="${MUTED}">Documents</text>
  <rect x="14" y="136" width="164" height="32" rx="6" fill="#dbeafe"/>
  <text x="30" y="158" font-family="sans-serif" font-size="15" font-weight="bold" fill="${BLUE_D}">Downloads</text>
  <text x="30" y="196" font-family="sans-serif" font-size="15" fill="${MUTED}">Pictures</text>

  <rect x="194" y="46" width="514" height="364" fill="#ffffff"/>
  <text x="246" y="76" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">Name</text>
  <text x="590" y="76" font-family="sans-serif" font-size="13" font-weight="bold" fill="${MUTED}">Date</text>
  <rect x="206" y="88" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  ${pdfIcon(226, 112)}
  <text x="246" y="118" font-family="monospace" font-size="16" fill="${INK}">reading-list.pdf</text>
  <text x="590" y="118" font-family="sans-serif" font-size="13" fill="${MUTED}">today 14:06</text>
  <rect x="206" y="144" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  ${pdfIcon(226, 168)}
  <text x="246" y="174" font-family="monospace" font-size="16" fill="${INK}">summer-reading.pdf</text>
  <text x="590" y="174" font-family="sans-serif" font-size="13" fill="${MUTED}">yesterday</text>
  <rect x="206" y="200" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  ${pdfIcon(226, 224)}
  <text x="246" y="230" font-family="monospace" font-size="16" fill="${INK}">maths-sheet.pdf</text>
  <text x="590" y="230" font-family="sans-serif" font-size="13" fill="${MUTED}">3 days ago</text>
  <text x="246" y="282" font-family="sans-serif" font-size="14" fill="${MUTED}">3 items</text>
</svg>`;

/* ---------------------------------------------------------------------------
 * Browser app icons.
 *
 * These are AUTHORED, SIMPLIFIED marks in the house palette — a tri-colour ring,
 * a swoosh, a compass — not reproductions of the Chrome, Edge or Safari logos,
 * which are trademarks we have no licence to redraw (docs/svg-diagrams.md §7,
 * and the same stance §5.2 of the course doc takes on screenshots). They carry
 * the shape and the colour family a nine-year-old actually navigates by, and the
 * real NAME is printed under each one, which is the part that has to transfer.
 * ------------------------------------------------------------------------- */

const CHROME_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full">
  <path d="M 32 32 L 7.75 18 A 28 28 0 0 1 56.25 18 Z" fill="#ef4444"/>
  <path d="M 32 32 L 56.25 18 A 28 28 0 0 1 32 60 Z" fill="#f59e0b"/>
  <path d="M 32 32 L 32 60 A 28 28 0 0 1 7.75 18 Z" fill="#10b981"/>
  <circle cx="32" cy="32" r="13" fill="#ffffff"/>
  <circle cx="32" cy="32" r="10" fill="#3b82f6"/>
</svg>`;

const EDGE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full">
  <circle cx="32" cy="32" r="28" fill="#0e7490"/>
  <path d="M 17 43 Q 29 19 53 26 Q 38 23 30 35 Q 24 45 35 51 Q 22 51 17 43 Z" fill="#67e8f9"/>
</svg>`;

const SAFARI_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full">
  <circle cx="32" cy="32" r="28" fill="#0ea5e9"/>
  <circle cx="32" cy="32" r="21" fill="#f8fafc"/>
  <path d="M 46 18 L 34 34 L 30 30 Z" fill="#ef4444"/>
  <path d="M 18 46 L 30 30 L 34 34 Z" fill="#94a3b8"/>
  <circle cx="32" cy="32" r="2.5" fill="#1e293b"/>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file.
export const DIAGRAMS = {
  TASKBAR: TASKBAR,
  CHROME_ICON: CHROME_ICON,
  EDGE_ICON: EDGE_ICON,
  SAFARI_ICON: SAFARI_ICON,
  BROWSER_ANATOMY: BROWSER_ANATOMY,
  LB_BROWSER: LB_BROWSER,
  TAB_STRIP: TAB_STRIP,
  ADDRESS_VS_SEARCH: ADDRESS_VS_SEARCH,
  SITE_SEARCH_MISTAKE: SITE_SEARCH_MISTAKE,
  ADDRESS_SELECTED: ADDRESS_SELECTED,
  LB_ADDRESS: LB_ADDRESS,
  PAGE_WITH_LINK: PAGE_WITH_LINK,
  HALF_LOADED: HALF_LOADED,
  AFTER_DOWNLOAD: AFTER_DOWNLOAD,
  DOWNLOADS_FOLDER: DOWNLOADS_FOLDER,
};
