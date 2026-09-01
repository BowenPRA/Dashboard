// src/tasks/chemWidgets.jsx
// Shared chemistry rendering + tile styling for the Formulae (FormulaWrite) and
// Equations (SymbolEquation) tasks, so both read as one polished system.
//
// Chemistry is written with real typography: element counts as SUBSCRIPTS
// (PbBr₂) and ion charges as SUPERSCRIPTS (Pb²⁺, SO₄²⁻). We render <sub>/<sup>
// rather than baking Unicode, so it stays crisp at any size and is easy to author.

/** Render a formula string with numeric subscripts: "PbBr2" → Pb Br₂, "Al2O3" → Al₂O₃. */
export function Formula({ text, className = '' }) {
  if (text === null || text === undefined || text === '') {
    return <span className="text-slate-300 dark:text-slate-600">—</span>;
  }
  const parts = String(text).split(/(\d+)/g).filter((p) => p !== '');
  return (
    <span className={`font-mono font-black tracking-tight ${className}`}>
      {parts.map((p, i) =>
        /^\d+$/.test(p)
          ? <sub key={i} className="text-[0.68em] font-black">{p}</sub>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

/** Render an ion charge as a superscript: mag 2, sign '+' → ²⁺ ; mag 1 → just the sign. */
export function Charge({ mag, sign, className = '' }) {
  if (!sign) return null;
  return <sup className={`text-[0.62em] font-black ${className}`}>{mag > 1 ? mag : ''}{sign === '+' ? '+' : '−'}</sup>;
}

/** An ion written in full: symbol + superscript charge, e.g. Pb²⁺, Br⁻, SO₄²⁻. */
export function Ion({ symbol, mag, sign, className = '' }) {
  return (
    <span className={`inline-flex items-start font-mono font-black ${className}`}>
      <Formula text={symbol} />
      <Charge mag={mag} sign={sign} />
    </span>
  );
}

/** One species in an equation: optional coefficient + formula, e.g. 2NaCl. */
export function Species({ coeff, formula, className = '' }) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {Number(coeff) > 1 && <span className="font-mono font-black mr-[1px]">{coeff}</span>}
      <Formula text={formula} />
    </span>
  );
}

// Shared teal palette so the two tasks match.
export const CHEM = {
  teal: '#0087a8',
  tealDark: '#026e88',
  tealSoft: 'rgba(0,135,168,0.10)',
  green: '#58cc02',
  greenDark: '#3e7500',
  red: '#ff4b4b',
  amber: '#f59e0b',
};
