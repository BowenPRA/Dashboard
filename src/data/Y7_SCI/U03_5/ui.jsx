// src/data/Y7_SCI/U03_5/ui.jsx
// The two pieces the 3.5 widgets borrow from other decks in the classroom:
// the house button (U03_models/ui.jsx; the same as Y7_SCI/U03_2/ui.jsx) and
// Mr Bowen the cartoon (U03_coffee/dating.jsx), as copies, so this unit stands
// on its own.
import { mrBowenSvg } from './mrBowen.js';

/** The house button (matches 3.1 and 3.2), for widgets on a white plate. */
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

/** Mr Bowen, placed in an SVG (props as mrBowenSvg). */
export function MrBowen(props) {
  return <g dangerouslySetInnerHTML={{ __html: mrBowenSvg(props) }} />;
}
