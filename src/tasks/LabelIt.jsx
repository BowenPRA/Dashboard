import React, { useMemo, useRef, useState } from 'react';
import { CheckCircle2, GripVertical, Tag, ChevronRight, Construction, Info } from 'lucide-react';
import TopBar from '../components/TopBar';
import { stripLabels, viewBoxOf, grade } from '../utils/labelIt';

/**
 * Label It — the unit's own diagram with its printed labels stripped off and a
 * numbered pin where each label's leader line ends. Tap a label, tap a pin (or
 * drag the label onto the pin). Check marks every pin and shows the right
 * label on each wrong one; then the next diagram.
 *
 * Score: correct pins over all pins, out of 10. Resumes: the blob keeps every
 * finished diagram's placements, so the task reopens on the first unfinished
 * one. Data shape in src/utils/labelIt.js.
 */

const GREEN = '#58cc02';
const RED = '#ff4b4b';
const BLUE = '#1cb0f6';

const T = {
  en: { title: 'Label It', tap: 'Tap a label, then tap its pin', check: 'Check', next: 'Next diagram', finish: 'Finish',
    pins: 'pins', right: 'right', empty: 'No diagrams to label yet.', back: 'Return', placed: 'All labels placed', remove: 'Tap a placed label to remove it' },
  vn: { title: 'Gắn nhãn', tap: 'Chạm một nhãn, rồi chạm vào ghim của nó', check: 'Kiểm tra', next: 'Hình tiếp theo', finish: 'Hoàn thành',
    pins: 'ghim', right: 'đúng', empty: 'Chưa có hình để gắn nhãn.', back: 'Quay lại', placed: 'Đã đặt hết nhãn', remove: 'Chạm vào nhãn đã đặt để bỏ ra' },
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
  const firstOpen = Math.max(0, items.findIndex((it) => !done[it.id]));
  const [idx, setIdx] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [placements, setPlacements] = useState({});   // pinId -> val
  const [picked, setPicked] = useState(null);
  const [dragged, setDragged] = useState(null);
  const [checked, setChecked] = useState(null);       // grade() result for the current item
  const svgRef = useRef(null);
  const t = T[lang] || T.en;

  const item = items[idx];
  const vb = viewBoxOf(item) || { x: 0, y: 0, w: 100, h: 100, str: '0 0 100 100' };
  const bareSvg = useMemo(() => stripLabels(item?.inlineSvg), [item]);
  const pick = (en, vn) => (lang === 'vn' && vn ? vn : en);

  const finish = (nextDone) => {
    const d = nextDone || done;
    const items_ = items.flatMap((it) => (it.pins || []).map((p) => ({
      itemId: `${it.id}:${p.id}`, correct: !!d[it.id]?.perPin?.[p.id],
    })));
    onComplete?.(scoreFrom(d, items), { done: d }, { items: items_ });
  };
  const quit = () => (Object.keys(done).length ? finish() : onQuit?.());

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

  const toView = (e) => {
    const svg = svgRef.current;
    if (!svg?.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  };
  const pinAt = (pt) => {
    const r = vb.w / 18;
    return (item.pins || []).find((p) => Math.hypot(pt.x - p.x, pt.y - p.y) <= r);
  };
  const onDrop = (e) => {
    e.preventDefault();
    if (!dragged) return;
    const pt = toView(e);
    const pin = pt && pinAt(pt);
    if (pin) put(pin.id, dragged);
    setDragged(null);
  };

  const check = () => {
    const g = grade(item, placements);
    const nextDone = { ...done, [item.id]: { placements, ...g } };
    setDone(nextDone);
    setChecked(g);
    onProgress?.(scoreFrom(nextDone, items), { done: nextDone });
  };
  const next = () => {
    if (idx + 1 < items.length) {
      setIdx(idx + 1); setPlacements({}); setChecked(null); setPicked(null);
    } else {
      finish(done);
    }
  };

  const pinR = vb.w / 30;
  const fontSize = vb.w / 38;
  const labelOf = (val) => item.bank.find((b) => b.val === val);

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
                onDragStart={(e) => { setDragged(b.val); e.dataTransfer.effectAllowed = 'move'; }}
                onClick={() => setPicked(picked === b.val ? null : b.val)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-b-[4px] font-bold text-sm transition-all cursor-grab active:cursor-grabbing
                  ${picked === b.val ? 'bg-[#1cb0f6] border-[#1899d6] text-white scale-105' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:-translate-y-0.5'}`}>
                <GripVertical className="w-4 h-4 opacity-40" strokeWidth={3} />{pick(b.text, b.textVn)}
              </button>
            ))}
        </div>

        {/* the diagram, labels stripped, pins over the top */}
        <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white shadow-sm"
          // Height-capped so a tall diagram (a 820×560 apparatus) never pushes
          // the Check button off a tablet screen.
          style={{ aspectRatio: `${vb.w} / ${vb.h}`, width: `min(100%, calc(${(vb.w / vb.h).toFixed(3)} * 60vh))` }}
          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }} onDrop={onDrop}>
          <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: bareSvg }} />
          <svg ref={svgRef} viewBox={vb.str} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full touch-manipulation">
            {(item.pins || []).map((p, i) => {
              const val = placements[p.id];
              const ok = checked ? checked.perPin[p.id] : null;
              const fill = checked ? (ok ? GREEN : RED) : (val ? BLUE : '#ffffff');
              const stroke = checked ? (ok ? GREEN : RED) : (picked ? BLUE : '#334155');
              const label = val ? pick(labelOf(val)?.text, labelOf(val)?.textVn) : null;
              const shown = checked && !ok ? pick(labelOf(p.answer)?.text, labelOf(p.answer)?.textVn) : label;
              const right = p.x > vb.x + vb.w / 2;
              const tx = right ? p.x - pinR * 1.4 : p.x + pinR * 1.4;
              return (
                <g key={p.id} className={checked ? '' : 'cursor-pointer'}
                  onClick={() => { if (checked) return; if (picked) put(p.id, picked); else if (val) clearPin(p.id); }}>
                  {(picked && !checked) && <circle cx={p.x} cy={p.y} r={pinR * 1.9} fill={`${BLUE}22`} stroke={BLUE} strokeWidth={vb.w / 400} strokeDasharray="6 4" />}
                  <circle cx={p.x} cy={p.y} r={pinR} fill={fill} stroke={stroke} strokeWidth={vb.w / 250} />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={fontSize} fontWeight="900" fill={val || checked ? '#fff' : '#334155'} fontFamily="ui-sans-serif, system-ui, sans-serif" pointerEvents="none">{i + 1}</text>
                  {shown && (
                    <g pointerEvents="none">
                      <rect x={right ? tx - shown.length * fontSize * 0.62 : tx} y={p.y - fontSize * 0.85} width={shown.length * fontSize * 0.62 + fontSize * 0.6} height={fontSize * 1.7} rx={fontSize * 0.4}
                        fill={checked ? (ok ? GREEN : RED) : BLUE} opacity={0.95} transform={`translate(${right ? -fontSize * 0.6 : 0}, 0)`} />
                      <text x={right ? tx - fontSize * 0.3 : tx + fontSize * 0.3} y={p.y} textAnchor={right ? 'end' : 'start'} dominantBaseline="central" fontSize={fontSize} fontWeight="800" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif">
                        {checked && !ok && label && label !== shown ? `${shown}` : shown}
                      </text>
                    </g>
                  )}
                  {checked && (ok
                    ? <circle cx={p.x + pinR * 0.9} cy={p.y - pinR * 0.9} r={pinR * 0.45} fill="#fff" stroke={GREEN} strokeWidth={vb.w / 400} />
                    : <circle cx={p.x + pinR * 0.9} cy={p.y - pinR * 0.9} r={pinR * 0.45} fill="#fff" stroke={RED} strokeWidth={vb.w / 400} />)}
                </g>
              );
            })}
          </svg>
        </div>

        {checked && (
          <div className={`rounded-xl border-2 p-3 flex items-start gap-2 text-sm font-bold ${checked.correct === checked.total ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 text-amber-800 dark:text-amber-200'}`}>
            {checked.correct === checked.total ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : <Info className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <span>{checked.correct === checked.total
              ? (lang === 'vn' ? 'Đúng hết mọi ghim.' : 'Every pin right.')
              : (lang === 'vn' ? 'Ghim đỏ hiện nhãn đúng — hãy đọc lại chúng trước khi tiếp tục.' : 'The red pins now show the right label — read them again before you move on.')}</span>
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
