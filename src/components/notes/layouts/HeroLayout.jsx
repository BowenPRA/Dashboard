// Full-color hero: openers and closers. Big centered title with an optional
// brand pill, unit eyebrow, date, icon, subtitle/objective, and a white callout
// card (starter task / warm-up / exit question). Generalizes intro + summary.
import { Ic, Reveal } from './primitives.jsx';
import { parseInlineText, toHex } from './helpers.jsx';

export default function HeroLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx;
  const accent = toHex(s.accent || s.color, '#0087a8');
  // Always paint the background inline from the parsed hex, so it can't break
  // silently (white text on white) if Tailwind never scanned an arbitrary class.
  const bgStyle = { backgroundColor: toHex(s.color || s.accent, accent) };
  const title = pick(s.title, s.titleVn);
  const subtitle = pick(s.subtitle, s.subtitleVn);
  const objective = pick(s.objective, s.objectiveVn);
  const brand = pick(s.brand, s.brandVn);
  const eyebrow = pick(s.eyebrow, s.eyebrowVn);
  const card = s.card || (s.warmUp ? { text: s.warmUp, textVn: s.warmUpVn, icon: 'Pencil', badge: lang === 'vn' ? 'Khởi động · Làm ngay vào vở' : 'Warm-Up · Do this now in your book' } : null);
  const cardText = card ? pick(card.text, card.textVn) : null;
  const cardBadge = card ? pick(card.badge, card.badgeVn) : null;

  // Both surfaces on a hero are a FIXED colour that does not follow the theme:
  // the callout card is always white, the field behind the title is always the
  // hero colour. So the emphasis colour has to be pinned to the surface.
  const STRONG_ON_CARD = 'font-black text-slate-900';
  const STRONG_ON_FIELD = 'font-black text-white underline decoration-white/40 underline-offset-4';

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center text-white overflow-y-auto custom-scrollbar min-h-0 p-8 sm:p-12" style={bgStyle}>
      {(brand || s.date) && (
        <div className={`flex items-center justify-center gap-2 flex-wrap ${isDisplayMode ? 'mb-5' : 'mb-4'}`}>
          {brand && (
            <span className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'}`}>{brand}</span>
          )}
          {s.date && (
            <span className={`inline-block bg-white/10 text-white/90 font-bold tracking-wide rounded-full border border-white/20 ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'}`}>{s.date}</span>
          )}
        </div>
      )}

      <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center shadow-inner border-4 border-white/30 ${isDisplayMode ? 'w-32 h-32 mb-8' : 'w-24 h-24 mb-6 sm:mb-8'}`}>
        <Ic name={s.icon || 'BookOpen'} className={isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'} strokeWidth={2.5} />
      </div>

      {eyebrow && (
        <div className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full mb-5 border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.9rem,1.4vw,1.4rem)] px-6 py-2' : 'text-xs sm:text-sm px-4 py-1.5'}`}>{eyebrow}</div>
      )}

      <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>{title || 'Introduction'}</h1>

      {objective ? (
        <div className={`bg-white/15 backdrop-blur-sm rounded-2xl border-2 border-white/25 shadow-inner max-w-3xl mx-auto ${isDisplayMode ? 'px-8 py-6' : 'px-5 py-4'}`}>
          <div className={`font-black uppercase tracking-[0.2em] opacity-80 mb-1.5 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.1rem)]' : 'text-[10px] sm:text-xs'}`}>{lang === 'vn' ? 'Mục tiêu' : 'Objective'}</div>
          <p className={`font-bold opacity-95 drop-shadow-sm leading-snug ${isDisplayMode ? 'text-[clamp(1.4rem,2.6vw,2.6rem)]' : 'text-lg lg:text-2xl'}`}>{objective}</p>
        </div>
      ) : subtitle ? (
        <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>{parseInlineText(subtitle, { strongClass: STRONG_ON_FIELD })}</p>
      ) : null}

      {cardText && (
        <div className={`bg-white rounded-2xl shadow-xl border-2 border-white/60 text-left max-w-3xl mx-auto ${isDisplayMode ? 'mt-8 px-8 py-6' : 'mt-6 px-5 py-4'}`}>
          <div className={`flex items-center gap-2 font-black uppercase tracking-[0.15em] mb-2 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.15rem)]' : 'text-[11px] sm:text-xs'}`} style={{ color: accent }}>
            <Ic name={card.icon || 'Pencil'} className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
            {cardBadge || (lang === 'vn' ? 'Nhiệm vụ' : 'Task')}
          </div>
          <div className={`font-bold text-slate-800 leading-snug ${isDisplayMode ? 'text-[clamp(1.3rem,2.4vw,2.4rem)]' : 'text-lg lg:text-2xl'}`}>{parseInlineText(cardText, { strongClass: STRONG_ON_CARD })}</div>
        </div>
      )}

      {s.reveal && (
        <div className="mt-6 max-w-3xl mx-auto w-full">
          <Reveal reveal={s.reveal} lang={lang} accent="#0f172a" isDisplayMode={isDisplayMode} />
        </div>
      )}
    </div>
  );
}
