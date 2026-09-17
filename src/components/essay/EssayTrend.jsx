import React from 'react';

/**
 * The score trend, essay by essay — a small SVG, no chart library.
 *
 * Total out of 6 as bars in date order, with the three trait scores stacked
 * inside each bar so a student can see WHICH trait is moving. Exam-condition
 * essays are outlined, because those are the honest ones. Non-scorable essays
 * show as an empty slot rather than a zero that looks like a collapse.
 */
const COLORS = { arguments: '#6366f1', development: '#0ea5e9', conventions: '#f59e0b' };

const fmtDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : `${d.getDate()}/${d.getMonth() + 1}`;
};

export default function EssayTrend({ entries = [], onPick, selectedId = null }) {
  const list = [...entries].sort((a, b) => String(a.at).localeCompare(String(b.at)));
  if (list.length === 0) return null;

  const W = Math.max(320, list.length * 44 + 40);
  const H = 160;
  const padL = 28;
  const padB = 26;
  const padT = 10;
  const chartH = H - padB - padT;
  const unit = chartH / 6;
  const barW = 26;
  const gap = (W - padL - 8) / list.length;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="max-w-full" role="img" aria-label="Essay scores over time">
        {[0, 2, 4, 6].map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - 4} y1={padT + chartH - v * unit} y2={padT + chartH - v * unit} stroke="currentColor" strokeOpacity="0.12" />
            <text x={padL - 6} y={padT + chartH - v * unit + 4} fontSize="10" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontWeight="700">{v}</text>
          </g>
        ))}
        {list.map((e, i) => {
          const x = padL + i * gap + (gap - barW) / 2;
          const t = e.score?.traits || {};
          const segs = ['arguments', 'development', 'conventions'];
          let y = padT + chartH;
          const selected = e.id === selectedId;
          return (
            <g key={e.id || i} onClick={() => onPick?.(e)} style={{ cursor: onPick ? 'pointer' : 'default' }}>
              {e.nonScorable ? (
                <rect x={x} y={padT + chartH - 4} width={barW} height={4} rx="2" fill="#f43f5e" fillOpacity="0.5" />
              ) : segs.map((k) => {
                const h = (t[k] || 0) * unit;
                y -= h;
                return h > 0 ? <rect key={k} x={x} y={y} width={barW} height={h} fill={COLORS[k]} rx="2" /> : null;
              })}
              {e.mode === 'exam' && (
                <rect x={x - 2} y={padT + chartH - (e.score?.total || 0) * unit - 2} width={barW + 4} height={(e.score?.total || 0) * unit + 4} rx="4" fill="none" stroke="#0f172a" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
              {selected && (
                <rect x={x - 4} y={padT - 4} width={barW + 8} height={chartH + 8} rx="6" fill="none" stroke="#6366f1" strokeWidth="2" />
              )}
              <text x={x + barW / 2} y={H - 8} fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.55" fontWeight="700">{fmtDate(e.at)}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        {Object.entries(COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center"><span className="w-3 h-3 rounded-sm mr-1.5" style={{ background: c }} />{k}</span>
        ))}
        <span className="flex items-center"><span className="w-3 h-3 rounded-sm mr-1.5 border-2 border-dashed border-slate-500" />exam conditions</span>
      </div>
    </div>
  );
}
