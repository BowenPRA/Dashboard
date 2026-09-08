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

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const WALL = '#eef4fb';
const BAR = '#1e293b';
const BAR_SOFT = '#334155';
const BLUE = '#3b82f6';
const RED = '#ef4444';
const AMBER = '#f59e0b';

/**
 * The desktop, with a window open on it. Used both as the POINT_IT picture and
 * as the labelled tour on the notes deck, so the student points at exactly the
 * screen the lesson walked them around.
 */
const DESKTOP_ANATOMY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="792" height="492" rx="14" fill="${WALL}" stroke="${LINE}" stroke-width="2"/>

  <!-- a desktop icon -->
  <rect x="40" y="40" width="72" height="72" rx="12" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <rect x="60" y="58" width="32" height="38" rx="4" fill="${FAINT}" stroke="${MUTED}" stroke-width="2"/>
  <text x="76" y="134" font-family="sans-serif" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">My Work</text>

  <!-- a window -->
  <rect x="250" y="90" width="430" height="280" rx="10" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="252" y="92" width="426" height="38" fill="${FAINT}"/>
  <text x="280" y="117" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}">Notes</text>
  <!-- window controls drawn as strokes, not glyphs: they survive greyscale and
       carry no text to overflow their 28px buttons -->
  <rect x="570" y="101" width="28" height="20" rx="4" fill="${LINE}"/>
  <path d="M 578 111 L 590 111" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <rect x="604" y="101" width="28" height="20" rx="4" fill="${LINE}"/>
  <path d="M 612 106 h 12 v 10 h -12 z" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="638" y="101" width="28" height="20" rx="4" fill="${RED}"/>
  <path d="M 647 106 L 657 116 M 657 106 L 647 116" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
  <text x="284" y="176" font-family="sans-serif" font-size="15" fill="${INK}">Monday: feed the fish</text>
  <text x="284" y="204" font-family="sans-serif" font-size="15" fill="${INK}">Tuesday: reading book</text>

  <!-- taskbar -->
  <rect x="4" y="440" width="792" height="52" fill="${BAR}"/>
  <rect x="20" y="452" width="40" height="28" rx="6" fill="${BLUE}"/>
  <path d="M 32 459 h 7 v 7 h -7 z M 41 459 h 7 v 7 h -7 z M 32 468 h 7 v 7 h -7 z M 41 468 h 7 v 7 h -7 z" fill="#ffffff"/>
  <rect x="76" y="452" width="40" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="124" y="452" width="40" height="28" rx="6" fill="${BAR_SOFT}"/>
  <rect x="180" y="450" width="200" height="32" rx="16" fill="${BAR_SOFT}"/>
  <text x="204" y="471" font-family="sans-serif" font-size="14" fill="#94a3b8">Search</text>
  <rect x="640" y="452" width="56" height="28" rx="6" fill="${BAR_SOFT}"/>
  <path d="M 654 470 q 14 -14 28 0" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
  <circle cx="668" cy="472" r="2.5" fill="#e2e8f0"/>
  <rect x="716" y="444" width="64" height="44" rx="6" fill="${BAR}"/>
  <text x="748" y="464" font-family="sans-serif" font-size="14" font-weight="bold" fill="#e2e8f0" text-anchor="middle">14:05</text>
  <text x="748" y="480" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Mon</text>
</svg>`;

/**
 * The whole machine: the power menu open on screen, and the physical power
 * button down on the case. Having both in one picture is the point of the unit —
 * the four soft choices are how you stop a computer, and the hard button is the
 * thing you only touch when nothing else answers.
 */
const POWER_MENU = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 520" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="692" height="430" rx="14" fill="#94a3b8"/>
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
  <path d="M 48 382 h 7 v 7 h -7 z M 57 382 h 7 v 7 h -7 z M 48 391 h 7 v 7 h -7 z M 57 391 h 7 v 7 h -7 z" fill="#ffffff"/>

  <!-- the case, and the button on it -->
  <rect x="4" y="440" width="692" height="76" rx="10" fill="${LINE}"/>
  <rect x="40" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="176" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="312" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="448" y="458" width="120" height="30" rx="6" fill="#e8edf3"/>
  <rect x="604" y="456" width="56" height="34" rx="9" fill="#475569"/>
  <circle cx="632" cy="473" r="8" fill="none" stroke="#ffffff" stroke-width="2.5"/>
  <path d="M 632 462 L 632 471" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

/**
 * Source Analysis: the sticky note on the monitor. Nothing on this picture is
 * technically broken, which is exactly why it works as a source — the student
 * has to notice that the security is defeated by a piece of paper.
 */
const LOGIN_STICKY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="412" rx="14" fill="#94a3b8"/>
  <rect x="24" y="24" width="592" height="336" rx="6" fill="#1f3a5f"/>

  <circle cx="320" cy="112" r="34" fill="#cbd5e1"/>
  <circle cx="320" cy="102" r="12" fill="#64748b"/>
  <path d="M 300 130 q 20 -18 40 0" fill="#64748b"/>
  <text x="320" y="182" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Ha Vi</text>
  <rect x="200" y="204" width="240" height="40" rx="20" fill="#ffffff"/>
  <text x="224" y="230" font-family="sans-serif" font-size="15" fill="${MUTED}">Password</text>
  <text x="320" y="284" font-family="sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle">Type your password to log in</text>

  <!-- the sticky note, taped to the bezel -->
  <rect x="430" y="292" width="172" height="104" rx="4" fill="#fde68a" stroke="#d9a441" stroke-width="2"/>
  <text x="516" y="326" font-family="sans-serif" font-size="14" font-weight="bold" fill="#7c5a10" text-anchor="middle">my password</text>
  <text x="516" y="356" font-family="monospace" font-size="18" font-weight="bold" fill="#7c5a10" text-anchor="middle">havi2016</text>
  <text x="516" y="380" font-family="sans-serif" font-size="12" fill="#8a6a20" text-anchor="middle">do not forget!</text>
</svg>`;

/**
 * Source Analysis: two screens that look similar and mean completely different
 * things. Telling "locked" from "off" is the single most useful reading on this
 * unit's screen, and it decides whether your work is still there.
 */
const LOCKED_VS_OFF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="372" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <text x="196" y="44" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Screen A</text>
  <rect x="36" y="60" width="320" height="240" rx="10" fill="#1f3a5f" stroke="${MUTED}" stroke-width="2"/>
  <circle cx="196" cy="128" r="26" fill="#cbd5e1"/>
  <text x="196" y="186" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Ha Vi</text>
  <rect x="96" y="204" width="200" height="34" rx="17" fill="#ffffff"/>
  <text x="116" y="226" font-family="sans-serif" font-size="13" fill="${MUTED}">Password</text>
  <text x="196" y="330" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="middle">A fan is running. A light is on.</text>

  <text x="564" y="44" font-family="sans-serif" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Screen B</text>
  <rect x="404" y="60" width="320" height="240" rx="10" fill="#0b0f14" stroke="${MUTED}" stroke-width="2"/>
  <text x="564" y="330" font-family="sans-serif" font-size="14" fill="${MUTED}" text-anchor="middle">No fan. No lights anywhere.</text>
</svg>`;

/**
 * The notes deck's stopping ladder: four ways to stop, drawn as a row so the
 * ordering (least final on the left, most final on the right) is visible before
 * a word of it is read.
 */
const STOP_LADDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="252" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <text x="380" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Your work stays open</text>

  <rect x="28" y="60" width="164" height="120" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="110" y="100" font-family="sans-serif" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">Sleep</text>
  <text x="110" y="130" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">Rests. Wakes</text>
  <text x="110" y="150" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">in a second.</text>

  <rect x="212" y="60" width="164" height="120" rx="12" fill="#fffbeb" stroke="${AMBER}" stroke-width="2.5"/>
  <text x="294" y="100" font-family="sans-serif" font-size="17" font-weight="bold" fill="#b45309" text-anchor="middle">Log out</text>
  <text x="294" y="130" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">Closes YOUR</text>
  <text x="294" y="150" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">work only.</text>

  <rect x="396" y="60" width="164" height="120" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2.5"/>
  <text x="478" y="100" font-family="sans-serif" font-size="17" font-weight="bold" fill="#7e22ce" text-anchor="middle">Restart</text>
  <text x="478" y="130" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">Off, then on</text>
  <text x="478" y="150" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">again by itself.</text>

  <rect x="580" y="60" width="164" height="120" rx="12" fill="#fef2f2" stroke="${RED}" stroke-width="2.5"/>
  <text x="662" y="100" font-family="sans-serif" font-size="17" font-weight="bold" fill="#b91c1c" text-anchor="middle">Shut down</text>
  <text x="662" y="130" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">All the way</text>
  <text x="662" y="150" font-family="sans-serif" font-size="13" fill="${INK}" text-anchor="middle">off.</text>

  <text x="380" y="218" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Save first. Every time.</text>
  <path d="M 40 240 L 720 240" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file, so `{ KEY }`
// would report every reference in the unit as undefined.
export const DIAGRAMS = {
  DESKTOP_ANATOMY: DESKTOP_ANATOMY,
  POWER_MENU: POWER_MENU,
  LOGIN_STICKY: LOGIN_STICKY,
  LOCKED_VS_OFF: LOCKED_VS_OFF,
  STOP_LADDER: STOP_LADDER,
};
