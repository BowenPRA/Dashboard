// src/data/Y7_SCI/U03_6/ui.jsx
// The house button for this unit's widgets on a white plate — the classroom's
// U03_models/ui.jsx Btn, as 3.2's Dashboard unit ports it (copied here, not
// imported, so the unit stands alone). No phone-remote registration.

/** The house button (matches 3.1, 3.2 and 2.5). */
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none px-3 py-2 text-xs sm:px-4 sm:text-sm lg:px-5 lg:py-2.5 lg:text-base ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}
