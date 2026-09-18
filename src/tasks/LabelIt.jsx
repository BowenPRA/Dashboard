import React, { useMemo, useRef, useState } from 'react';
import { CheckCircle2, GripVertical, Tag, ChevronRight, Construction, Info } from 'lucide-react';
import TopBar from '../components/TopBar';
import { stripLabels, viewBoxOf, grade, layout } from '../utils/labelIt';

/**
 * Label It — the unit's own diagram, drawn whole, with its printed labels
 * stripped off. Each part to name has a leader line running out to an empty
 * box where its label used to sit, like an exam paper. Tap a label, tap a box
 * (or drag the label onto the box). Check marks every box and writes the right
 * label into each wrong one; then the next diagram.
 *
 * Score: correct boxes over all boxes, out of 10. Resumes: the blob keeps every
 * finished diagram's placements, so the task reopens on the first unfinished
 * one. Data shape and box layout in src/utils/labelIt.js.
 */

const GREEN = '#58cc02';
const RED = '#ff4b4b';
const BLUE = '#1cb0f6';
const LEAD = '#475569';
const FONT = 'ui-sans-serif, system-ui, sans-serif';

const T = {
  en: { title: 'Label It', tap: 'Tap a label, then tap its box', check: 'Check', next: 'Next diagram', finish: 'Finish',
    right: 'right', empty: 'No diagrams to label yet.', back: 'Return', placed: 'All labels placed', remove: 'Now tap the box it belongs in' },
  vn: { title: 'Gắn nhãn', tap: 'Chạm một nhãn, rồi chạm vào ô của nó', check: 'Kiểm tra', next: 'Hình tiếp theo', finish: 'Hoàn thành',
    right: 'đúng', empty: 'Chưa có hình để gắn nhãn.', back: 'Quay lại', placed: 'Đã đặt hết nhãn', remove: 'Giờ chạm vào ô phù hợp' },
};

const scoreFrom = (done, items) => {
  const total = items.reduce((s, it) => s + (it.pins || []).length, 0);
  const correct = items.reduce((s, it) => s + (done[it.id]?.correct || 0), 0);
  return total ? Math.round((correct / total) * 10) : 0;
};

export default function LabelIt({ pool = [], onComplete, onProgress, onQuit, savedData = {} }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : []).filter((it) => it && it.inlineSvg && (it.pins || []).length), [pool]);
  const [lang, setLang] = useState('en');
  // finished diagrams: { [itemId]: { placements, correct, total } }
  const [done, setDone] = useState(() => (savedData && typeof savedData.done === 'object' ? savedData.done : {}));
  const [openedWith] = useState(done);
  const firstOpen = Math.max(0, items.findIndex((it) => !done[it.id]));
  const [idx, setIdx] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [placements, setPlacements] = useState({});   // pinId -> val
  const [picked, setPicked] = useState(null);
  const [dragged, setDragged] = useState(null);
  const [hover, setHover] = useState(null);           // pinId under the pointer
  const [checked, setChecked] = useState(null);       // grade() result for the current item
  const svgRef = useRef(null);
  const t = T[lang] || T.en;

  const item = items[idx];
  const vb = viewBoxOf(item) || { x: 0, y: 0, w: 100, h: 100, str: '0 0 100 100' };
  const bareSvg = useMemo(() => stripLabels(item?.inlineSvg), [item]);
  const lay = useMemo(() => (item ? layout(item) : null), [item]);
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  const finish = (nextDone) => {
    const d = nextDone || done;
    const items_ = items.flatMap((it) => (it.pins || []).map((p) => ({
      itemId: `${it.id}:${p.id}`, correct: !!d[it.id]?.perPin?.[p.id],
    })));
    onComplete?.(scoreFrom(d, items), { done: d }, { items: items_ });
  };
  // What the task opened with. X only logs an attempt when something was answered
  // THIS sitting — otherwise opening a finished task and closing it stamped a
  // full-score attempt on today, and the daily goal went green with no work done.
  const quit = () => (done !== openedWith && Object.keys(done).length ? finish() : onQuit?.());

  if (!items.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 text-slate-400 mb-3" />
        <p className="font-black text-slate-600 dark:text-slate-300 mb-4">{t.empty}</p>
        <button onClick={onQuit} className="px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">{t.back}</button>
      </div>
    );
  }

  const usedVals = Object.values(placements);
  const bank = (item.bank || []).filter((b) => !usedVals.includes(b.val));
  const allPlaced = (item.pins || []).every((p) => placements[p.id] != null);
  const labelOf = (val) => item.bank.find((b) => b.val === val);

  const put = (pinId, val) => {
    if (checked) return;
    setPlacements((p) => {
      const n = { ...p };
      for (const k of Object.keys(n)) if (n[k] === val) delete n[k];
      n[pinId] = val;
      return n;
    });
    setPicked(null); setDragged(null);
  };
  const clearPin = (pinId) => {
    if (checked) return;
    setPlacements((p) => { const n = { ...p }; delete n[pinId]; return n; });
  };
  const tapBox = (pinId) => {
    if (checked) return;
    if (picked) put(pinId, picked);
    else if (placements[pinId] != null) clearPin(pinId);
  };

  const toView = (e) => {
    const svg = svgRef.current;
    if (!svg?.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  };
  const boxAt = (pt) => {
    const slack = lay.font * 0.6;
    return lay.boxes.find((b) => pt.x >= b.x - slack && pt.x <= b.x + b.w + slack && pt.y >= b.y - slack && pt.y <= b.y + b.h + slack);
  };
  const onDrop = (e) => {
    e.preventDefault();
    if (!dragged) return;
    const pt = toView(e);
    const box = pt && boxAt(pt);
    if (box) put(box.id, dragged);
    setDragged(null);
  };

  const check = () => {
    const g = grade(item, placements);
    const nextDone = { ...done, [item.id]: { placements, ...g } };
    setDone(nextDone);
    setChecked(g);
    setPicked(null);
    onProgress?.(scoreFrom(nextDone, items), { done: nextDone });
  };
  const next = () => {
    if (idx + 1 < items.length) {
      setIdx(idx + 1); setPlacements({}); setChecked(null); setPicked(null); setHover(null);
    } else {
      finish(done);
    }
  };

  const { font, lineH, boxes } = lay;
  const stroke = font * 0.12;
  const inviting = (picked || dragged) && !checked;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={t.title} current={idx + 1} total={items.length} lang={lang} onLangToggle={() => setLang((l) => (l === 'en' ? 'vn' : 'en'))} />

      <div className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 pb-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center border-b-[4px] border-[#1899d6] shrink-0"><Tag className="w-5 h-5" strokeWidth={2.5} /></span>
          <div>
            <h2 className="font-black text-slate-800 dark:text-slate-100 text-lg sm:text-xl leading-tight">{pick(item.title, item.titleVn)}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{checked ? `${checked.correct} / ${checked.total} ${t.right}` : (picked ? t.remove : t.tap)}</p>
          </div>
        </div>

        {/* the label bank */}
        <div className="flex flex-wrap gap-2 items-center justify-center p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 min-h-[60px]">
          {bank.length === 0
            ? <span className="text-slate-400 font-black uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{t.placed}</span>
            : bank.map((b) => (
              <button key={b.val} draggable={!checked}
                onDragStart={(e) => { setDragged(b.val); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(b.val)); }}
                onDragEnd={() => setDragged(null)}
                onClick={() => setPicked(picked === b.val ? null : b.val)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-b-[4px] font-bold text-sm transition-all cursor-grab active:cursor-grabbing
                  ${picked === b.val ? 'bg-[#1cb0f6] border-[#1899d6] text-white scale-105' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:-translate-y-0.5'}`}>
                <GripVertical className="w-4 h-4 opacity-40" strokeWidth={3} />{pick(b.text, b.textVn)}
              </button>
            ))}
        </div>

        {/* the diagram, labels stripped, a blank box on the end of every leader line */}
        <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm"
          // Height-capped so a tall diagram (a 820×560 apparatus) never pushes
          // the Check button off a tablet screen.
          style={{ aspectRatio: `${vb.w} / ${vb.h}`, width: `min(100%, calc(${(vb.w / vb.h).toFixed(3)} * 60vh))` }}
          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }} onDrop={onDrop}>
          <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: bareSvg }} />
          <svg ref={svgRef} viewBox={vb.str} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full touch-manipulation" fontFamily={FONT}>
            {/* leader lines first, so every box sits on top of its own line */}
            {boxes.map((b) => {
              const ok = checked ? checked.perPin[b.id] : null;
              const lit = hover === b.id && !checked;
              const colour = checked ? (ok ? '#46a302' : '#e03131') : (lit ? BLUE : LEAD);
              return (
                <g key={`lead-${b.id}`} pointerEvents="none">
                  {b.to.map(([tx, ty], k) => {
                    const pin = item.pins.find((p) => p.id === b.id);
                    return <line key={k} x1={pin.x} y1={pin.y} x2={tx} y2={ty} stroke={colour} strokeWidth={lit ? stroke * 1.6 : stroke} strokeLinecap="round" />;
                  })}
                  {b.to.map(([tx, ty], k) => (
                    <circle key={`d${k}`} cx={tx} cy={ty} r={font * (lit ? 0.34 : 0.26)} fill={colour} stroke="#fff" strokeWidth={stroke * 0.8} />
                  ))}
                </g>
              );
            })}

            {boxes.map((b) => {
              const val = placements[b.id];
              const ok = checked ? checked.perPin[b.id] : null;
              const answer = item.pins.find((p) => p.id === b.id)?.answer;
              const shownVal = checked && !ok ? answer : val;
              const lbl = shownVal != null ? labelOf(shownVal) : null;
              const text = lbl ? pick(lbl.text, lbl.textVn) : '';
              const lines = text ? lay.linesOf(text) : [];
              const filled = val != null;
              const fill = checked ? (ok ? '#d7ffb8' : '#ffe3e3') : (filled ? '#e0f4fe' : (inviting ? '#f0faff' : '#ffffff'));
              const edge = checked ? (ok ? GREEN : RED) : (filled ? BLUE : (inviting || hover === b.id ? BLUE : '#94a3b8'));
              const ink = checked ? (ok ? '#2f6b00' : '#c92a2a') : '#0f3a52';
              const r = font * 0.35;
              return (
                <g key={b.id} data-box={b.id} className={checked ? '' : 'cursor-pointer'}
                  onClick={() => tapBox(b.id)} onMouseEnter={() => setHover(b.id)} onMouseLeave={() => setHover((h) => (h === b.id ? null : h))}>
                  {/* a generous invisible hit area — a box is small on a phone */}
                  <rect x={b.x - font * 0.5} y={b.y - font * 0.5} width={b.w + font} height={b.h + font} fill="transparent" />
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={r} fill={fill} stroke={edge}
                    strokeWidth={filled || checked ? stroke * 1.5 : stroke * 1.2}
                    strokeDasharray={filled || checked ? undefined : `${font * 0.45} ${font * 0.3}`} />
                  {lines.length > 0 && (
                    <text x={b.cx} y={b.cy - ((lines.length - 1) * lineH) / 2} textAnchor="middle" dominantBaseline="central"
                      fontSize={font} fontWeight="800" fill={ink} pointerEvents="none">
                      {lines.map((ln, k) => <tspan key={k} x={b.cx} dy={k === 0 ? 0 : lineH}>{ln}</tspan>)}
                    </text>
                  )}
                  {checked && (
                    <g pointerEvents="none" transform={`translate(${b.x + b.w}, ${b.y})`}>
                      <circle r={font * 0.55} fill={ok ? GREEN : RED} stroke="#fff" strokeWidth={stroke} />
                      <path d={ok
                        ? `M ${-font * 0.25} 0 L ${-font * 0.06} ${font * 0.2} L ${font * 0.27} ${-font * 0.2}`
                        : `M ${-font * 0.2} ${-font * 0.2} L ${font * 0.2} ${font * 0.2} M ${font * 0.2} ${-font * 0.2} L ${-font * 0.2} ${font * 0.2}`}
                        fill="none" stroke="#fff" strokeWidth={stroke * 1.4} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {checked && (
          <div className={`rounded-xl border-2 p-3 flex items-start gap-2 text-sm font-bold ${checked.correct === checked.total ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 text-amber-800 dark:text-amber-200'}`}>
            {checked.correct === checked.total ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : <Info className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <span>{checked.correct === checked.total
              ? (lang === 'vn' ? 'Đúng hết mọi ô.' : 'Every box right.')
              : (lang === 'vn' ? 'Ô đỏ giờ hiện nhãn đúng — hãy đọc lại chúng trước khi tiếp tục.' : 'The red boxes now show the right label — read them again before you move on.')}</span>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-auto">
          {!checked
            ? <button onClick={check} disabled={!allPlaced} className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#58cc02] border-b-[4px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none">{t.check}</button>
            : <button onClick={next} className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white hover:bg-[#159bd9] active:border-b-0 active:translate-y-[4px] transition-all flex items-center gap-1">
                {idx + 1 < items.length ? t.next : t.finish}<ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>}
        </div>
      </div>
    </div>
  );
}
