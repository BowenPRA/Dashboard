// src/data/Y7_MATH/U05_2/ui.jsx
// The two pieces the ported 5.2 widgets borrow from other classroom decks,
// kept local to this unit: the house button (classroom U03_models/ui.jsx,
// without its phone-remote hook) and Mr Bowen, the cartoon from Coffee, Carbon
// and Stars (classroom src/lib/mrBowen.js, copied here as mrBowen.js).
import { mrBowenSvg } from './mrBowen.js';

const TONES = {
  teal: 'bg-[#0087a8] border-[#00697f]',
  orange: 'bg-[#c25e12] border-[#a04a0e]',
  blue: 'bg-[#1a5fa8] border-[#134a85]',
  purple: 'bg-[#5c2483] border-[#43195f]',
  green: 'bg-[#4a8b23] border-[#386a1a]',
  slate: 'bg-slate-500 border-slate-700',
};

/** The house button, for widgets on a white plate. */
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children, big = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none ${big ? 'px-6 py-3 text-lg' : 'px-3 py-2 text-xs sm:px-4 sm:text-sm'} ${TONES[tone]}`}
    >
      {Icon && <Icon className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />}
      {children}
    </button>
  );
}

/** Mr Bowen, drawn into an SVG at (x, y) — see mrBowen.js for his frame and moods. */
export function MrBowen(props) {
  return <g dangerouslySetInnerHTML={{ __html: mrBowenSvg(props) }} />;
}
