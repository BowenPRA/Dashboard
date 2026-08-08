// Shared component building blocks for the flexible slide layouts: an icon
// resolver, typed note cards, a reveal box, media frames, header bars, and pills.
// Everything here is theme-safe (light + dark). Non-component helpers live in
// helpers.jsx. Ported from the Lessons project, adapted to the Dashboard's
// WidgetRenderer and image-zoom conventions.
import { useState, createElement, Component } from 'react';
import {
  BookOpen, Microscope, FlaskConical, Leaf, Pencil, Hourglass, Home, Sparkles,
  Zap, Info, CheckCircle2, Lightbulb, Ruler, Maximize2, Quote, Boxes, Sprout,
  Building2, Dna, Atom, ScanEye, Telescope, GraduationCap, Beaker, TestTube,
  Layers, ArrowRight, Target, Users, MessageSquare, Scale, Equal, AlertTriangle,
  ShieldCheck, Repeat, HelpCircle, ChevronDown, Sun, Droplet, Landmark, Calculator,
  Globe, Vote, Coins, Map, Gavel,
} from 'lucide-react';
import WidgetRenderer from '../../WidgetRenderer.jsx';
import { parseInlineText, renderContent, NOTE_TONES } from './helpers.jsx';

// A local error boundary so a crashing widget never takes the slide with it.
class WidgetErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error('Interactive Widget Crashed:', error, info); }
  render() {
    if (this.state.failed) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
          <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" strokeWidth={2.5} />
          <h3 className="text-base font-black text-slate-700 dark:text-slate-200 tracking-tight">Widget Unavailable</h3>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Icon resolver ──────────────────────────────────────────────────────────
const ICONS = {
  BookOpen, Microscope, FlaskConical, Leaf, Pencil, Hourglass, Home, Sparkles,
  Zap, Info, CheckCircle2, Lightbulb, Ruler, Quote, Boxes, Sprout, Building2,
  Dna, Atom, ScanEye, Telescope, GraduationCap, Beaker, TestTube, Layers,
  ArrowRight, Target, Users, MessageSquare, Scale, Equal, AlertTriangle,
  ShieldCheck, Repeat, HelpCircle, Sun, Droplet, Landmark, Calculator, Globe,
  Vote, Coins, Map, Gavel,
};

/** Render a lucide icon by name (falls back to Info). */
export function Ic({ name, ...props }) {
  return createElement(ICONS[name] || Info, props);
}

// ── Typed note cards (the `.note-*` boxes) ───────────────────────────────────
/**
 * A typed note card, shaped like a Cambridge Learner's Book panel: a solid
 * colour header strip over a tinted body with a matching hairline border.
 * `note` = { tone, text, badge, badgeVn, icon }. `badge: false` hides the strip.
 * **Bold** runs inside the body take the tone's key-word colour.
 */
export function Note({ note, lang = 'en', isDisplayMode = false }) {
  const tone = NOTE_TONES[note.tone] || NOTE_TONES.write;
  const text = lang === 'vn' ? (note.textVn || note.text) : note.text;
  const showBadge = note.badge !== false;
  const badgeText = note.badge != null && note.badge !== true && note.badge !== false
    ? (lang === 'vn' ? (note.badgeVn || note.badge) : note.badge)
    : (lang === 'vn' ? tone.labelVn : tone.label);
  const iconName = note.icon || tone.icon;
  const lines = String(text || '').split('\n').filter((l) => l.trim());

  return (
    <div className={`overflow-hidden rounded-xl border-2 ${tone.border} shadow-sm`}>
      {showBadge && (
        <div className={`flex items-center gap-2 text-white font-black uppercase tracking-[0.15em] ${isDisplayMode ? 'text-[clamp(0.7rem,1vw,1rem)] px-4 py-2' : 'text-[10px] sm:text-[11px] px-3.5 py-2'}`}
          style={{ backgroundColor: tone.accent }}>
          <Ic name={iconName} className={isDisplayMode ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
          {badgeText}
        </div>
      )}
      <div className={`${tone.card} ${tone.text} font-semibold leading-relaxed space-y-2 ${isDisplayMode ? 'p-[clamp(1rem,1.7vw,1.6rem)]' : 'p-3.5 sm:p-5'}`}>
        {lines.map((line, i) => (
          <p key={i} className={isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.55rem)]' : 'text-[15px] sm:text-base lg:text-lg'}>
            {parseInlineText(line, { strongClass: tone.strong })}
          </p>
        ))}
      </div>
    </div>
  );
}

/** A row/grid of note cards. */
export function NoteStack({ notes = [], lang = 'en', isDisplayMode = false, columns = 1 }) {
  if (!notes.length) return null;
  return (
    <div className={`grid gap-3 sm:gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
      {notes.map((note, i) => (
        <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />
      ))}
    </div>
  );
}

// ── Reveal box (answer-box / flip-card) ──────────────────────────────────────
// The autonomous translation of the classroom "ask, then tell": the student
// predicts, then taps to check. `reveal` = { label, answer, prompt, ...Vn }.
export function Reveal({ reveal, lang = 'en', accent = '#8b5cf6', isDisplayMode = false }) {
  const [open, setOpen] = useState(false);
  if (!reveal) return null;
  const label = lang === 'vn' ? (reveal.labelVn || reveal.label || 'Hiện đáp án') : (reveal.label || 'Reveal the answer');
  const prompt = lang === 'vn' ? (reveal.promptVn || reveal.prompt) : reveal.prompt;
  const answer = lang === 'vn' ? (reveal.answerVn || reveal.answer) : reveal.answer;

  return (
    <div className="w-full">
      {prompt && (
        <p className={`text-slate-600 dark:text-slate-300 font-bold mb-3 ${isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.5rem)]' : 'text-base lg:text-lg'}`}>
          {parseInlineText(prompt)}
        </p>
      )}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className={`inline-flex items-center gap-2 rounded-2xl font-black text-white uppercase tracking-widest shadow-sm border-b-4 active:border-b-0 active:translate-y-1 transition-all ${isDisplayMode ? 'text-[clamp(0.85rem,1.3vw,1.2rem)] px-7 py-4' : 'text-sm px-6 py-3.5'}`}
          style={{ backgroundColor: accent, borderColor: 'rgba(0,0,0,0.25)' }}>
          <ChevronDown className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
          {label}
        </button>
      ) : (
        <div className="rounded-2xl border-2 bg-slate-50 dark:bg-slate-800/60 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ borderColor: accent, borderLeftWidth: 6 }}>
          <div className={isDisplayMode ? 'p-[clamp(1.25rem,2vw,2rem)]' : 'p-4 sm:p-6'}>
            <div className={`font-bold text-slate-800 dark:text-slate-100 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.6rem)]' : 'text-base lg:text-xl'}`}>
              {renderContent(answer, { isDisplayMode })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Media frame (widget · inline SVG · real image) ───────────────────────────
/**
 * The framed media element used by layouts. Chooses widget / inlineSvg / image
 * from `source` (defaults to the slide). `drawThis` adds the amber badge.
 * `ctx.onZoom` receives { type, config|content|src } matching the Notes modal.
 */
export function Media({ slide, source, ctx, drawThis = (source || slide).drawThis, className = '' }) {
  const { lang, isDisplayMode, onZoom } = ctx;
  const src = source || slide;
  const hasWidget = !!src.widget;
  const hasSvg = !!src.inlineSvg;
  const hasImage = !!src.image;
  if (!hasWidget && !hasSvg && !hasImage) return null;
  const title = lang === 'vn' ? (src.titleVn || src.title) : src.title;

  const onExpand = () => {
    if (hasWidget) onZoom({ type: 'widget', config: src.widget });
    else if (hasSvg) onZoom({ type: 'svg', content: src.inlineSvg });
    else onZoom({ type: 'img', src: src.image });
  };

  return (
    <div className={`relative w-full h-full bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center overflow-hidden group transition-all ${isDisplayMode ? 'rounded-[2rem]' : 'rounded-2xl lg:rounded-[2rem]'} ${drawThis ? 'border-[3px] lg:border-[4px] border-[#ffc800]' : 'border-2 border-slate-200 dark:border-slate-700'} ${className}`}>
      {drawThis && (
        <div className={`absolute top-0 right-0 bg-[#ffc800] text-amber-950 font-black uppercase tracking-widest rounded-bl-2xl lg:rounded-bl-3xl z-20 shadow-sm flex items-center border-b-2 border-l-2 border-[#cca000] ${isDisplayMode ? 'text-[clamp(0.75rem,1vw,1.1rem)] px-5 py-2.5' : 'text-[9px] sm:text-xs px-3 lg:px-4 py-1.5 lg:py-2'}`}>
          <Pencil className={isDisplayMode ? 'w-4 h-4 mr-2' : 'w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2'} strokeWidth={3} />
          {lang === 'vn' ? 'Vẽ Hình Này' : 'Draw This'}
        </div>
      )}
      {hasWidget ? (
        <div className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-2 sm:p-4'}`}>
          <WidgetErrorBoundary><WidgetRenderer config={src.widget} lang={lang} /></WidgetErrorBoundary>
        </div>
      ) : hasSvg ? (
        // text-slate-* matters: diagram labels use fill="currentColor", which
        // would otherwise inherit near-black and vanish on a dark panel.
        <div className={`w-full h-full flex items-center justify-center text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'p-6' : 'p-3 sm:p-4'}`} dangerouslySetInnerHTML={{ __html: src.inlineSvg }} />
      ) : (
        <img src={src.image} alt={title || 'Diagram'} className={`w-full h-full object-contain ${isDisplayMode ? 'p-4' : 'p-2 sm:p-3'}`} draggable={false} />
      )}
      <button
        onClick={onExpand}
        className="absolute top-2 lg:top-4 right-2 lg:right-4 p-2.5 lg:p-3 bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-600 hover:text-[#1cb0f6] rounded-xl shadow-sm border-2 border-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 active:scale-95 border-b-4 active:border-b-2 active:translate-y-0.5"
        title="Expand">
        <Maximize2 className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ── Header bar (accent strip + icon + title) ─────────────────────────────────
export function HeaderBar({ title, icon = 'BookOpen', accent = '#1cb0f6', eyebrow, isDisplayMode = false, action = null }) {
  return (
    <div className={`text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10 ${isDisplayMode ? 'p-2 sm:p-3 lg:p-4' : 'p-4 lg:p-6'}`}
      style={{ backgroundColor: accent }}>
      <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 z-10 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
        <Ic name={icon} className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
      </div>
      <div className="z-10 min-w-0 flex-1">
        {eyebrow && (
          <div className={`font-black uppercase tracking-[0.2em] opacity-80 ${isDisplayMode ? 'text-[clamp(0.6rem,0.9vw,0.95rem)]' : 'text-[10px] sm:text-xs'}`}>{eyebrow}</div>
        )}
        <h2 className={`font-black tracking-tight drop-shadow-md truncate ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>{title}</h2>
      </div>
      {action && <div className="z-10 ml-3 flex-shrink-0">{action}</div>}
    </div>
  );
}

/** Small pill used above titles on hero / statement layouts. */
export function Pill({ children, filled = false, accent = '#1cb0f6', isDisplayMode = false }) {
  if (!children) return null;
  return (
    <span
      className={`inline-block font-black uppercase tracking-[0.2em] rounded-full border ${isDisplayMode ? 'text-[clamp(0.7rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'} ${filled ? 'text-white border-transparent shadow-sm' : 'border-current'}`}
      style={filled ? { backgroundColor: accent } : { color: accent }}>
      {children}
    </span>
  );
}
