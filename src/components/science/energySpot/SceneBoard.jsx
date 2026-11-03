import { tr } from '../../../utils/lang';
import { ENERGIES, pinRadius } from '../../../utils/energySpot';
import { FamilyButtons } from './Cards.jsx';
import { familyInk } from './spotText.js';

/* ------------------------------------------------------------------ *
 * Name That Energy: a scene. The drawing with its numbered pins (each
 * leader ends on its clue), and under it one row per pin: its name, the
 * energy chosen for it, and — in the second stage — store or transfer. Tap a
 * badge or a row to choose the pin, then an energy card (Round.jsx holds the
 * cards). `per` is the engine's result per pin after a Check.
 * ------------------------------------------------------------------ */
const MAX_H = 340; // px: a tall scene never pushes the cards off the screen

export function ScenePicture({ m, active = null, per = null, onPin }) {
  const [w, h] = m.viewBox;
  const r = pinRadius(m.viewBox);
  const res = (id) => per?.find((x) => x.id === id);
  return (
    <div className="mx-auto w-full relative rounded-xl overflow-hidden bg-white border-2 border-slate-200 dark:border-slate-700"
      style={{ aspectRatio: `${w} / ${h}`, maxWidth: `${Math.round((MAX_H * w) / h)}px` }}>
      <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: m.svg }} />
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {m.pins.map((p) => {
          const x = res(p.id);
          const fill = x?.ok ? '#58a700' : x && !x.ok ? '#e11d48' : p.id === active ? '#f59e0b' : '#2b2b2b';
          return (
            <g key={p.id} onClick={() => onPin?.(p.id)} style={{ cursor: onPin ? 'pointer' : 'default' }}>
              <line x1={p.x} y1={p.y} x2={p.to[0]} y2={p.to[1]} stroke={fill} strokeWidth={r * 0.14} />
              <circle cx={p.to[0]} cy={p.to[1]} r={r * 0.28} fill={fill} />
              <circle cx={p.x} cy={p.y} r={r} fill={fill} stroke="#ffffff" strokeWidth={r * 0.16} />
              <text x={p.x} y={p.y + r * 0.38} fontSize={r * 1.1} fontWeight="900" fill="#ffffff" textAnchor="middle"
                fontFamily="Inter, 'Segoe UI', system-ui, sans-serif">{p.n}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** One row per pin. `mode` 'names' (pick a pin) or 'families' (store / transfer each). */
export function PinRows({ m, lang, mode, active, placed = {}, fams = {}, per = null, locked = false, onPin, onFamily }) {
  const res = (id) => per?.find((x) => x.id === id);
  return (
    <div className="grid sm:grid-cols-2 gap-1.5">
      {m.pins.map((p) => {
        const x = res(p.id);
        const e = placed[p.id];
        const isActive = mode === 'names' && active === p.id;
        const border = x?.ok ? 'border-[#58a700] bg-[#d7ffb8]/40 dark:bg-lime-900/20'
          : x && !x.ok ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
            : isActive ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800';
        const Tag = mode === 'names' && !locked && !x?.ok ? 'button' : 'div';
        return (
          <Tag key={p.id} type={Tag === 'button' ? 'button' : undefined} onClick={Tag === 'button' ? () => onPin?.(p.id) : undefined}
            className={`text-left rounded-xl border-2 px-2.5 py-2 flex flex-col gap-1.5 ${border}`}>
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 shrink-0 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center">{p.n}</span>
              <span className="min-w-0 flex-1 text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug">{tr(lang, p.en, null, p.fr)}</span>
              <span className={`shrink-0 text-xs sm:text-sm font-black ${e ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}
                style={e && mode === 'families' && x?.ok ? { color: familyInk(p.family) } : undefined}>
                {e ? tr(lang, ENERGIES[e].en, null, ENERGIES[e].fr) : '…'}
              </span>
            </div>
            {mode === 'families' && (
              <FamilyButtons lang={lang} small value={fams[p.id] || null} right={x?.ok ? p.family : null} locked={locked || x?.ok}
                onPick={(f) => onFamily?.(p.id, f)} />
            )}
            {x && !x.ok && <p className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-300 leading-snug">{tr(lang, x.en, null, x.fr)}</p>}
          </Tag>
        );
      })}
    </div>
  );
}
