// src/tasks/chemPalette.js
//
// The shared teal palette for the two chemistry tasks — Formulae (FormulaWrite)
// and Equations (SymbolEquation) — so both read as one system.
//
// It lives here rather than in `chemWidgets.jsx` because that file exports React
// components, and a module that exports components AND plain values cannot be
// hot-swapped by fast refresh: editing a colour would tear down and remount the
// task instead of repainting it. Same reason `src/components/survivor/format.js`
// sits beside its components rather than inside them.
export const CHEM = {
  teal: '#0087a8',
  tealDark: '#026e88',
  tealSoft: 'rgba(0,135,168,0.10)',
  green: '#58cc02',
  greenDark: '#3e7500',
  red: '#ff4b4b',
  amber: '#f59e0b',
};
