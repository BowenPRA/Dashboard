import { useMemo } from 'react';
import { figureOf } from '../../utils/angleSumGeometry';

/**
 * The diagram of a Find It, Say Why item, drawn to scale by
 * utils/angleSumGeometry.js. Known angles teal, the letter being found orange,
 * found letters green with their value. During "Add" the angles you could know
 * are buttons: tap to add one in (purple), tap again to take it out.
 *
 *   <AngleSumFigure model={model} found={{ x: 73 }} current={['y']}
 *     pickable={['k0', 'k1', 'ext']} picked={['k0']} onPick={(key) => …} />
 */

const INK = '#2b2b2b';
const TONE = {
  known: { fill: '#e2f2f6', text: '#0087a8' },
  letter: { fill: '#fdf1e3', text: '#c25e12' },
  current: { fill: '#fbd7b0', text: '#a04a0e' },
  found: { fill: '#eef6e6', text: '#3f7a1d' },
  picked: { fill: '#e4d5f0', text: '#5c2483' },
};

export default function AngleSumFigure({ model, found = {}, current = [], pickable = [], picked = [], onPick, maxHeight = '42vh', label }) {
  const fig = useMemo(() => figureOf(model), [model]);
  const toneOf = (w) => {
    const el = model.els[w.key];
    if (picked.includes(w.key)) return TONE.picked;
    if (el.letter && found[el.letter] != null) return TONE.found;
    if (el.letter) return current.includes(el.letter) ? TONE.current : TONE.letter;
    return TONE.known;
  };
  const textOf = (w) => {
    const el = model.els[w.key];
    if (el.letter && found[el.letter] != null) return `${found[el.letter]}°`;
    return w.text;
  };
  return (
    <svg viewBox={`0 0 ${fig.w} ${fig.h}`} role="img" aria-label={label || 'angle diagram'}
      className="block w-full h-auto mx-auto select-none" style={{ maxHeight, touchAction: 'manipulation' }}>
      <rect x="0" y="0" width={fig.w} height={fig.h} rx="14" fill="#ffffff" />
      {fig.polygon && <polygon points={fig.polygon.map((p) => p.join(',')).join(' ')} fill="#eef1f4" stroke={INK} strokeWidth="3" strokeLinejoin="round" />}
      {fig.wedges.map((w) => {
        const tone = toneOf(w);
        const can = !!onPick && pickable.includes(w.key);
        return (
          <g key={w.key}
            onClick={can ? () => onPick(w.key) : undefined}
            onKeyDown={can ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(w.key); } } : undefined}
            role={can ? 'button' : undefined} tabIndex={can ? 0 : undefined}
            aria-pressed={can ? picked.includes(w.key) : undefined}
            aria-label={can ? (w.right ? '90°' : textOf(w)) : undefined}
            style={can ? { cursor: 'pointer', outline: 'none' } : undefined}>
            <path d={w.path} fill={tone.fill} stroke={INK} strokeWidth="1.5" />
            {can && <circle cx={w.lx} cy={w.ly} r="24" fill={picked.includes(w.key) ? 'rgba(92,36,131,0.12)' : 'rgba(255,255,255,0.01)'} stroke="#5c2483" strokeWidth="2" strokeDasharray={picked.includes(w.key) ? 'none' : '5 4'} />}
          </g>
        );
      })}
      {fig.segs.map((s) => <line key={s.id} x1={s.p[0]} y1={s.p[1]} x2={s.q[0]} y2={s.q[1]} stroke={INK} strokeWidth="3.5" strokeLinecap="round" pointerEvents="none" />)}
      {fig.wedges.filter((w) => w.box).map((w) => <path key={`b${w.key}`} d={w.box} fill="none" stroke={INK} strokeWidth="2.5" pointerEvents="none" />)}
      {fig.dot && <circle cx={fig.dot[0]} cy={fig.dot[1]} r="5" fill={INK} pointerEvents="none" />}
      {fig.wedges.filter((w) => !w.right).map((w) => {
        const el = model.els[w.key];
        const tone = toneOf(w);
        const letterShown = el.letter && found[el.letter] == null;
        return (
          <text key={`t${w.key}`} x={w.lx} y={w.ly + 8} textAnchor="middle" pointerEvents="none"
            fontFamily="Inter, 'Segoe UI', system-ui, sans-serif" fontSize={letterShown ? 26 : 22} fontWeight="bold"
            fontStyle={letterShown ? 'italic' : 'normal'} fill={tone.text}>{textOf(w)}</text>
        );
      })}
      {fig.tags.map((t) => (
        <text key={t.text} x={t.p[0]} y={t.p[1] + 8} textAnchor="middle" pointerEvents="none"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif" fontSize="22" fontWeight="bold" fontStyle="italic" fill="#5b6770">{t.text}</text>
      ))}
    </svg>
  );
}
