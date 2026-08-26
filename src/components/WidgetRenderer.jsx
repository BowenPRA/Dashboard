import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy-load complex mathematical and physics widgets to keep bundle size small
const MathGraph = lazy(() => import('../components/math/MathGraph'));
const ParabolaLab = lazy(() => import('../components/math/ParabolaLab'));
const VectorLab = lazy(() => import('../components/math/VectorLab'));

const KNOWN = ['MathGraph', 'ParabolaLab', 'VectorLab'];

export default function WidgetRenderer({ config, lang = 'en' }) {
  if (!config) return null;

  // 1. Legacy Support: If the config is passed directly as a functional React component
  // (Maintains backwards compatibility with Y8/SCIENCE_1A hardcoded imports). Forward
  // `lang` so a bilingual widget (e.g. Y7_MATH TranslateWidget) follows the deck's
  // EN/VN toggle; widgets that ignore the prop are unaffected.
  if (typeof config === 'function' || (typeof config === 'object' && config.$$typeof)) {
    const LegacyWidget = config;
    return <LegacyWidget lang={lang} />;
  }

  // 2. Dynamic Component resolution for Phase 3 configuration objects
  const { type, params } = config;

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <span className="text-xs font-bold tracking-widest uppercase">Loading Tool...</span>
      </div>
    }>
      {type === 'MathGraph' && <MathGraph {...params} />}
      {/* Interface text inside a widget follows the deck's EN/VN toggle, so the
          language has to travel with the config. */}
      {type === 'ParabolaLab' && <ParabolaLab {...params} lang={lang} />}
      {type === 'VectorLab' && <VectorLab {...params} lang={lang} />}

      {/* Fallback for unrecognized dynamically requested widgets */}
      {!KNOWN.includes(type) && (
        <div className="p-6 border-2 border-dashed border-rose-300 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-500 font-bold flex flex-col items-center text-center">
          <span>Widget Type "{type}" Not Found</span>
          <span className="text-sm font-medium mt-2 text-rose-400">Ensure it is registered in WidgetRenderer.jsx</span>
        </div>
      )}
    </Suspense>
  );
}