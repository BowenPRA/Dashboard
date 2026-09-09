// src/data/PRIMARY_TECH/T04/diagrams.js
// T4 Saving Your Work — the unit's authored art, referenced by key
// (docs/svg-diagrams.md §1). Generic dialogs, real names.

const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';
const PAPER = '#f8fafc';
const BLUE = '#3b82f6';
const GREEN = '#58cc02';

/**
 * The Save As dialog — the single most important box in this unit, and the one
 * students click through without reading. It asks two questions, and the whole
 * lesson is noticing that it asked them: what is it called, and where is it
 * going.
 */
const SAVE_AS_DIALOG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="632" height="412" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>
  <rect x="60" y="50" width="520" height="320" rx="12" fill="#ffffff" stroke="${MUTED}" stroke-width="2"/>
  <rect x="62" y="52" width="516" height="40" fill="${FAINT}"/>
  <text x="86" y="79" font-family="sans-serif" font-size="16" font-weight="bold" fill="${INK}">Save As</text>

  <text x="90" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}">File name</text>
  <rect x="88" y="136" width="464" height="44" rx="8" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="106" y="165" font-family="monospace" font-size="16" fill="${MUTED}">Untitled</text>

  <text x="90" y="206" font-family="sans-serif" font-size="12" font-weight="bold" fill="${MUTED}">Save it in</text>
  <rect x="88" y="222" width="150" height="40" rx="8" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>
  <text x="163" y="248" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Documents</text>
  <rect x="250" y="222" width="140" height="40" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="320" y="248" font-family="sans-serif" font-size="15" font-weight="bold" fill="#475569" text-anchor="middle">Downloads</text>
  <rect x="402" y="222" width="120" height="40" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="462" y="248" font-family="sans-serif" font-size="15" font-weight="bold" fill="#475569" text-anchor="middle">Desktop</text>

  <rect x="300" y="300" width="110" height="44" rx="8" fill="#f1f5f9" stroke="${LINE}" stroke-width="2"/>
  <text x="355" y="328" font-family="sans-serif" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Cancel</text>
  <rect x="428" y="300" width="124" height="44" rx="8" fill="${GREEN}"/>
  <text x="490" y="328" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Save</text>
</svg>`;

/**
 * Save versus Save As, which is the one distinction this unit has to land. Drawn
 * as two paths out of the same document so the difference is visibly about how
 * many files you end up with, not about which menu item you picked.
 */
const SAVE_VS_SAVE_AS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" class="w-full h-full drop-shadow-md">
  <rect x="4" y="4" width="752" height="292" rx="14" fill="${PAPER}" stroke="${LINE}" stroke-width="2"/>

  <rect x="28" y="60" width="336" height="200" rx="12" fill="#eff6ff" stroke="${BLUE}" stroke-width="2.5"/>
  <text x="196" y="96" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Save</text>
  <text x="196" y="134" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Writes over the SAME file.</text>
  <text x="196" y="160" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">You still have ONE file.</text>
  <text x="196" y="200" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">The first time, it has to ask</text>
  <text x="196" y="222" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">where — so it opens Save As.</text>

  <rect x="396" y="60" width="336" height="200" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5"/>
  <text x="564" y="96" font-family="sans-serif" font-size="18" font-weight="bold" fill="#15803d" text-anchor="middle">Save As</text>
  <text x="564" y="134" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Makes a NEW file.</text>
  <text x="564" y="160" font-family="sans-serif" font-size="14" fill="${INK}" text-anchor="middle">Now you have TWO.</text>
  <text x="564" y="200" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">Use it to keep the old one,</text>
  <text x="564" y="222" font-family="sans-serif" font-size="13" fill="${MUTED}" text-anchor="middle">or to put a copy somewhere.</text>

  <text x="380" y="278" font-family="sans-serif" font-size="15" font-weight="bold" fill="${MUTED}" text-anchor="middle">Same document. Different question.</text>
</svg>`;

// Written out longhand, not as shorthand properties: the validator resolves a
// DIAGRAMS.KEY reference by looking for `  KEY:` in this file.
export const DIAGRAMS = {
  SAVE_AS_DIALOG: SAVE_AS_DIALOG,
  SAVE_VS_SAVE_AS: SAVE_VS_SAVE_AS,
};
