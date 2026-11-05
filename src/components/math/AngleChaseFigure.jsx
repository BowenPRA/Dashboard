import { useMemo } from 'react';
import { wedgeOf, arrowsOf, chevron } from '../../utils/angleChaseGeom';

/**
 * The diagram of a Find Every Angle item (utils/angleChase.js), drawn to
 * scale. Printed angles teal, letters orange, found letters green with their
 * value, a stepping stone "?" in purple. The letter being found is a white
 * letter on an orange badge, its angle filled and outlined in orange — the
 * same badge as the step panel's "Find b". When a fact is chosen its angles
 * glow amber and its lines are traced (the F, the Z, the straight line, the
 * triangle).
 *
 *   <AngleChaseFigure model={m} found={{ a: 67 }} current="b" lit={{ keys, rays, segs, poly }}
 *     tappable={['b', 'c']} onTap={(name) => …} />
 */

const INK = '#2b2b2b';
const GLOW = '#f5b301';
const TONE = {
  known: { fill: '#e2f2f6', text: '#0087a8' },
  letter: { fill: '#fff4ea', text: '#c25e12' },
  current: { fill: '#ffc896', text: '#ffffff', badge: '#e8590c', edge: '#e8590c' },
  found: { fill: '#eef6e6', text: '#3f7a1d' },
  stone: { fill: '#e6d9f2', text: '#ffffff', badge: '#5c2483', edge: '#5c2483' },
  stoneFound: { fill: '#f3f0f6', text: '#6b5b7b' },
  lit: { fill: '#fff1c2', text: '#8a5a00' },
};
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

export default function AngleChaseFigure({ model, found = {}, current = null, stones = [], lit = null, tappable = [], onTap, maxHeight = '60vh', label }) {
  const F = model.F;
  // Every angle that can carry a label: marks, plus any stepping stone in use.
  const shown = useMemo(() => {
    const keys = new Set(Object.keys(model.marks));
    for (const n of [...stones, current].filter(Boolean)) for (const k of model.vars[n]?.keys || []) keys.add(k);
    for (const n of Object.keys(found)) for (const k of model.vars[n]?.keys || []) keys.add(k);
    return [...keys];
  }, [model, stones, current, found]);
  const wedges = useMemo(() => Object.fromEntries(Object.keys(F.sectors).map((k) => [k, wedgeOf(F, k)])), [F]);
  const arrows = useMemo(() => arrowsOf(F), [F]);
  const litKeys = new Set(lit?.keys || []);
  const tapKeys = new Set(tappable.flatMap((n) => model.vars[n]?.keys || []));

  const infoOf = (key) => {
    const mk = model.marks[key];
    const name = model.varOf[key];
    if (!name) return { text: mk?.show === 'R' ? '' : `${F.sectors[key].size}°`, tone: litKeys.has(key) ? TONE.lit : TONE.known, right: mk?.show === 'R' };
    const v = model.vars[name];
    const isStone = !v.letter;
    if (found[name] != null) return { text: `${found[name]}°`, tone: litKeys.has(key) ? TONE.lit : isStone ? TONE.stoneFound : TONE.found, small: isStone };
    if (name === current) return { text: isStone ? '?' : v.letter, tone: isStone ? TONE.stone : TONE.current, letter: true, current: true };
    if (isStone) return { text: '?', tone: { fill: '#efe7f6', text: '#5c2483' }, letter: true };
    return { text: v.letter, tone: TONE.letter, letter: true };
  };

  return (
    <svg viewBox={`0 0 ${F.W} ${F.H}`} role="img" aria-label={label || 'angle diagram'}
      className="block w-full h-auto mx-auto select-none" style={{ maxHeight, touchAction: 'manipulation' }}>
      <rect x="0" y="0" width={F.W} height={F.H} rx="14" fill="#ffffff" />
      {lit?.poly && <polygon points={lit.poly.map((p) => p.join(',')).join(' ')} fill="#fff6d6" stroke="none" />}
      {(lit?.segs || []).map((s, i) => (
        <polyline key={`g${i}`} points={s.map((p) => p.join(',')).join(' ')} fill="none" stroke={GLOW} strokeOpacity="0.55" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {/* The current angle last, so its orange edge sits on top. */}
      {[...shown].sort((a, b) => (infoOf(a).current ? 1 : 0) - (infoOf(b).current ? 1 : 0)).map((key) => {
        const w = wedges[key];
        const info = infoOf(key);
        const edge = litKeys.has(key) ? GLOW : info.tone.edge || INK;
        return (
          <path key={`w${key}`} d={w.path} fill={info.tone.fill} stroke={edge} strokeWidth={litKeys.has(key) || info.current ? 3 : 1.25}>
            {info.current && <animate attributeName="fill-opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" />}
          </path>
        );
      })}
      {F.lines.map((L) => <line key={L.id} x1={L.ends[0][0]} y1={L.ends[0][1]} x2={L.ends[1][0]} y2={L.ends[1][1]} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />)}
      {arrows.map((a, i) => <path key={`a${i}`} d={chevron(a.tip, a.dir)} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
      {shown.filter((k) => wedges[k].box && (model.marks[k]?.show === 'R')).map((k) => <path key={`b${k}`} d={wedges[k].box} fill="none" stroke={INK} strokeWidth="2.5" />)}
      {F.verts.filter((v) => v.rays.length >= 3 && v.lines.some((id) => { const L = F.lineById[id]; return L.ray != null; })).map((v) => (
        <circle key={`d${v.id}`} cx={v.px[0]} cy={v.px[1]} r="5" fill={INK} />
      ))}
      {shown.map((key) => {
        const w = wedges[key];
        const info = infoOf(key);
        if (info.right) return null;
        if (info.current) {
          return (
            <g key={`t${key}`} pointerEvents="none">
              <circle cx={w.badge[0]} cy={w.badge[1]} r="19" fill={info.tone.badge} stroke="#ffffff" strokeWidth="3" />
              <text x={w.badge[0]} y={w.badge[1] + 9} textAnchor="middle" fontFamily={FONT} fontSize="25" fontWeight="bold"
                fontStyle={info.text !== '?' ? 'italic' : 'normal'} fill="#ffffff">{info.text}</text>
            </g>
          );
        }
        return (
          <text key={`t${key}`} x={w.label[0]} y={w.label[1] + 8} textAnchor="middle" pointerEvents="none"
            fontFamily={FONT} fontSize={info.letter ? 27 : info.small ? 20 : 23} fontWeight="bold"
            fontStyle={info.letter && info.text !== '?' ? 'italic' : 'normal'} fill={info.tone.text}>{info.text}</text>
        );
      })}
      {onTap && [...tapKeys].map((key) => {
        const w = wedges[key];
        const name = model.varOf[key];
        const info = infoOf(key);
        return (
          <g key={`h${key}`} role="button" tabIndex={0} aria-label={info.text === '?' ? 'an angle' : info.text}
            onClick={() => onTap(name)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(name); } }}
            style={{ cursor: 'pointer', outline: 'none' }}>
            <path d={w.hit} fill="rgba(255,255,255,0.01)" />
            <circle cx={w.label[0]} cy={w.label[1]} r="23" fill="rgba(92,36,131,0.06)" stroke="#5c2483" strokeWidth="2" strokeDasharray="5 4" />
          </g>
        );
      })}
    </svg>
  );
}
