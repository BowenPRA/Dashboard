// src/data/Y7_SCI/U03_7/ui.jsx
// The pieces the ported 3.7 widgets borrow from other classroom decks, kept
// local to this unit: the house button (classroom U03_models/ui.jsx, without
// its phone-remote hook), Mr Bowen (classroom src/lib/mrBowen.js, copied here
// as mrBowen.js). The seeded random numbers are in random.js.
import { mrBowenSvg } from './mrBowen.js'

const TONES = {
  teal: 'bg-[#0087a8] border-[#00697f]',
  orange: 'bg-[#c25e12] border-[#a04a0e]',
  slate: 'bg-slate-500 border-slate-700',
}

/** The house button, for widgets on a white plate. */
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none px-3 py-2 text-xs sm:px-4 sm:text-sm ${TONES[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={3} />}
      {children}
    </button>
  )
}

/** Mr Bowen, drawn into an SVG at (x, y) — see mrBowen.js for his frame and moods. */
export function MrBowen(props) {
  return <g dangerouslySetInnerHTML={{ __html: mrBowenSvg(props) }} />
}

/** An SVG string placed inside a JSX <svg>. */
export const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
