// src/data/Y7_SCI/U03_2/ui.jsx
// Controls for this unit's space widgets, ported from the classroom's Models
// deck (content/y7-science/U03_models/ui.jsx). Two families:
//
//   Glass*   for the Formation model: a dark viewport needs dark, translucent
//            controls. Space is black in light mode too.
//   Btn      the house button, for ScaleShrink on its white plate.
//
// WHAT CHANGED IN THE PORT: the buttons no longer register with the
// classroom's phone remote (useSlideButton); LayerChip, Divider and Dock
// (used only by the Solar System model, which stays in the classroom) are gone.

export function GlassPanel({ className = '', children, style }) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-slate-950/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.45)] text-slate-100 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/** A labelled group of buttons, one of which is on. */
export function Segmented({ label, options, value, onChange, big = false }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      {label && (
        <span className={`font-black uppercase tracking-[0.18em] text-slate-400 px-1 ${big ? 'text-[0.8rem]' : 'text-[0.62rem]'}`}>{label}</span>
      )}
      <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              title={o.title}
              aria-pressed={on}
              className={`rounded-[0.6rem] font-bold whitespace-nowrap transition-colors ${big ? 'px-3.5 py-2 text-[1.02rem]' : 'px-2.5 py-1.5 text-[0.8rem]'} ${on ? 'bg-sky-400 text-slate-950 shadow' : 'text-slate-200 hover:bg-white/10'}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** A round icon button for the transport controls. */
export function GlassIconButton({ icon: Icon, onClick, title, active = false, big = false, accent = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`shrink-0 rounded-full flex items-center justify-center transition-colors border disabled:opacity-35 disabled:pointer-events-none ${big ? 'w-12 h-12' : 'w-9 h-9 sm:w-10 sm:h-10'} ${accent ? 'bg-amber-400 border-amber-300 text-slate-950 hover:bg-amber-300' : active ? 'bg-sky-400 border-sky-300 text-slate-950' : 'bg-white/5 border-white/15 text-slate-100 hover:bg-white/15'}`}
    >
      <Icon className={big ? 'w-6 h-6' : 'w-5 h-5'} strokeWidth={2.5} />
    </button>
  );
}

/** A pill button with an icon and words. */
export function GlassButton({ icon: Icon, onClick, children, big = false, tone = 'plain', active = false, disabled = false, title }) {
  const tones = {
    plain: active ? 'bg-sky-400 border-sky-300 text-slate-950' : 'bg-white/5 border-white/15 text-slate-100 hover:bg-white/15',
    amber: 'bg-amber-400 border-amber-300 text-slate-950 hover:bg-amber-300',
    sky: 'bg-sky-400 border-sky-300 text-slate-950 hover:bg-sky-300',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={tone === 'plain' ? active : undefined}
      className={`inline-flex items-center gap-2 rounded-xl border font-bold whitespace-nowrap transition-colors disabled:opacity-35 disabled:pointer-events-none ${big ? 'px-4 py-2.5 text-[1.05rem]' : 'px-3 py-2 text-[0.85rem]'} ${tones[tone]}`}
    >
      {Icon && <Icon className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

/** The house button (matches 3.1 and 2.5), for widgets on a white plate. */
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
