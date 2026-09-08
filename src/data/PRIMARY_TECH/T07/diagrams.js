// src/data/PRIMARY_TECH/T07/diagrams.js
// T7 Inside a Browser — every authored picture in the unit, referenced by key
// (docs/svg-diagrams.md §1). The POINT_IT interfaces live here too so that
// `npm run audit:svg PRIMARY_TECH` can see them.
//
// A GENERIC browser, not a copy of Chrome (docs/digital-skills-course.md §5.2).
// The transferable facts are that the address bar is at the top and shows where
// you are, that tabs sit above it, and that a download tells you where it went —
// not one vendor's pixels. Real names throughout: address bar, tab, bookmark,
// reload, Downloads.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const BLUE = '#3b82f6';
const AMBER = '#f59e0b';

/** Shared chrome: the tab strip and the toolbar, identical in both browser
 *  pictures so the student is looking at the same machine twice. */
const CHROME = `
  <rect x="20" y="12" width="210" height="40" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="125" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Class Notes</text>
  <rect x="238" y="12" width="190" height="40" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <text x="333" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">School Library</text>
  <rect x="440" y="18" width="28" height="28" rx="6" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 447 31 h 14 M 454 24 v 14" stroke="${MUTED}" stroke-width="2.5" stroke-linecap="round"/>

  <rect x="20" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 44 82 h -16 M 35 74 l -8 8 l 8 8" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="64" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 74 82 h 16 M 83 74 l 8 8 l -8 8" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="108" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 118 82 a 8 8 0 1 1 3 6" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 114 76 l 5 6 l 6 -4" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="156" y="64" width="560" height="36" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="176" y="88" font-family="monospace" font-size="16" fill="${INK}">www.schoolsite.org/library</text>
  <rect x="724" y="64" width="36" height="36" rx="8" fill="${FAINT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M 742 71 l 4.5 9 l 10 1.5 l -7 7 l 1.5 10 l -9 -4.5 l -9 4.5 l 1.5 -10 l -7 -7 l 10 -1.5 z" fill="none" stroke="${MUTED}" stroke-width="2" stroke-linejoin="round"/>`;

/**
 * The browser, labelled by nothing — the student supplies the labels. This is
 * the POINT_IT picture and the notes tour, and the search box on the page is
 * deliberately drawn a long way from the address bar so the confusion between
 * them is about what each one DOES, not about which is nearer.
 */
const BROWSER_ANATOMY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  ${CHROME}
  <rect x="20" y="112" width="760" height="372" rx="10" fill="#ffffff" stroke="${FAINT}" stroke-width="2"/>
  <text x="400" y="172" font-family="sans-serif" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">School Library</text>
  <rect x="250" y="210" width="300" height="48" rx="10" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="272" y="241" font-family="sans-serif" font-size="16" fill="${MUTED}">Search this site</text>
  <text x="400" y="313" font-family="sans-serif" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle" text-decoration="underline">Year 6 reading list</text>
  <rect x="310" y="350" width="180" height="48" rx="10" fill="${BLUE}"/>
  <text x="400" y="381" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Download PDF</text>
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
  <text x="400" y="180" font-family="sans-serif" font-size="26" font-weight="900" fill="${INK}" text-anchor="middle">School Library</text>
  <text x="400" y="230" font-family="sans-serif" font-size="17" fill="${MUTED}" text-anchor="middle">Your file has finished downloading.</text>

  <rect x="20" y="452" width="760" height="72" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="40" y="466" width="300" height="44" rx="8" fill="#eff6ff" stroke="${BLUE}" stroke-width="2"/>
  <text x="64" y="494" font-family="monospace" font-size="16" fill="${INK}">reading-list.pdf</text>
  <rect x="380" y="466" width="190" height="44" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="475" y="494" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Show in folder</text>
  <rect x="590" y="466" width="170" height="44" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="675" y="494" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">All downloads</text>
</svg>`;

/**
 * The teaching diagram for the confusion this whole unit exists to fix. Both
 * boxes are drawn the same shape on purpose — the difference is not what they
 * look like, it is where they live and what they reach.
 */
const ADDRESS_VS_SEARCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="28" y="50" width="336" height="200" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="196" y="86" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Address bar</text>
  <rect x="56" y="102" width="280" height="34" rx="17" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="76" y="125" font-family="monospace" font-size="14" fill="${INK}">www.bbc.co.uk</text>
  <text x="196" y="172" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">At the TOP of the browser.</text>
  <text x="196" y="198" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Takes you to ANY website.</text>
  <text x="196" y="224" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You type an address.</text>

  <rect x="396" y="50" width="336" height="200" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2.5"/>
  <text x="564" y="86" font-family="sans-serif" font-size="18" font-weight="bold" fill="#b45309" text-anchor="middle">Search box</text>
  <rect x="424" y="102" width="280" height="34" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="444" y="125" font-family="sans-serif" font-size="14" fill="${MUTED}">Search this site</text>
  <text x="564" y="172" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">INSIDE the page.</text>
  <text x="564" y="198" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Searches THIS site only.</text>
  <text x="564" y="224" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You type words.</text>

  <text x="380" y="276" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Two boxes. Two different jobs.</text>
</svg>`;

/**
 * Source Analysis: the Downloads folder, a week after the download. The lesson
 * is that a downloaded file is a file like any other, filed by name and by date
 * in a folder that already exists — not something that lives inside the browser.
 */
const DOWNLOADS_FOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="712" height="412" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="6" y="6" width="708" height="40" fill="${FAINT}"/>
  <text x="32" y="33" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Downloads</text>

  <rect x="6" y="46" width="180" height="364" fill="${PAPER}"/>
  <text x="30" y="84" font-family="sans-serif" font-size="15" fill="${MUTED}">Desktop</text>
  <text x="30" y="120" font-family="sans-serif" font-size="15" fill="${MUTED}">Documents</text>
  <rect x="14" y="136" width="164" height="32" rx="6" fill="#dbeafe"/>
  <text x="30" y="158" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1d4ed8">Downloads</text>
  <text x="30" y="196" font-family="sans-serif" font-size="15" fill="${MUTED}">Pictures</text>

  <rect x="194" y="46" width="514" height="364" fill="#ffffff"/>
  <rect x="206" y="66" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <text x="234" y="96" font-family="monospace" font-size="16" fill="${INK}">reading-list.pdf</text>
  <text x="600" y="96" font-family="sans-serif" font-size="13" fill="${MUTED}">today 14:06</text>
  <rect x="206" y="126" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <text x="234" y="156" font-family="monospace" font-size="16" fill="${INK}">class-photo.jpg</text>
  <text x="600" y="156" font-family="sans-serif" font-size="13" fill="${MUTED}">yesterday</text>
  <rect x="206" y="186" width="490" height="48" rx="6" fill="${PAPER}" stroke="${FAINT}" stroke-width="2"/>
  <text x="234" y="216" font-family="monospace" font-size="16" fill="${INK}">homework.docx</text>
  <text x="600" y="216" font-family="sans-serif" font-size="13" fill="${MUTED}">3 days ago</text>
  <text x="234" y="272" font-family="sans-serif" font-size="14" fill="${MUTED}">3 items</text>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file.
export const DIAGRAMS = {
  BROWSER_ANATOMY: BROWSER_ANATOMY,
  AFTER_DOWNLOAD: AFTER_DOWNLOAD,
  ADDRESS_VS_SEARCH: ADDRESS_VS_SEARCH,
  DOWNLOADS_FOLDER: DOWNLOADS_FOLDER,
};
