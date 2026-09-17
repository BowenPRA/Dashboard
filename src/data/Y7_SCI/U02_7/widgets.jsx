// src/data/Y7_SCI/U02_7/widgets.jsx
// Widgets for 2.7 Compounds and Mixtures, ported from the classroom deck
// (content/y7-science/U02_7/widgets.jsx).
//
//   IronSulfurClip     The book's practical, filmed: iron and sulfur heated
//                      until they glow and become iron sulfide. A student at
//                      home has no Bunsen burner and no fume cupboard (the
//                      reaction gives off sulfur dioxide), so this IS the
//                      experiment. A plain <video> with its own controls, served
//                      from public/ so it plays offline once cached. The film is
//                      4:29; the first three minutes are weighing and mixing, so
//                      it opens at 3:15 (#t=195), just before the heating.
//                      Video: Deni Ingilizovski, CC BY-SA 4.0, Wikimedia Commons.
//
// The classroom's second widget, MixtureOrCompound (a left-hand / right-hand
// vote game for the whole room), does not port: its pairs — salt and sea
// water, iron sulfide and iron with sulfur stirred, pure and tap water — are
// the deck's `particles` activities now, where the student sorts the particles
// themselves instead of a name.
import { assetUrl } from '../../../utils/assetPaths';

const ironSulfurVideo = assetUrl('images/Y7_SCI/U02_7/ironsulfur.webm');

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en);

// No extra frame: `showcase` already wraps the media in a padded panel. Sized
// from the HEIGHT it is given (showcase boxes are short and wide).
export function IronSulfurClip({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
        <video
          className="w-full h-full object-contain"
          src={`${ironSulfurVideo}#t=195`}
          controls
          playsInline
          preload="metadata"
          aria-label={tr(lang, 'Iron and sulfur heated together', 'Đun nóng sắt và lưu huỳnh')}
        />
      </div>
    </div>
  );
}
