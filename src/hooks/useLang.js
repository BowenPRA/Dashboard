import { useState } from 'react';
import { resolveLangs, nextLang } from '../utils/lang';

/**
 * A task screen's language: always opens in English, and the TopBar toggle
 * steps through whatever the track offers (EN → VN → FR → EN on Year 7).
 *
 * `langs` comes from the host (YearDashboard passes `langsOf(track)` to every
 * task); a screen mounted by an older harness may only have `bilingual`.
 * `toggleLang` is undefined when there is nothing to switch to, which is what
 * TopBar's `onLangToggle` reads to leave the button out.
 */
export default function useLang({ langs, bilingual } = {}) {
  const offered = resolveLangs(langs, bilingual);
  const [lang, setLang] = useState('en');
  const toggleLang = offered.length > 1 ? () => setLang((l) => nextLang(offered, l)) : undefined;
  return { lang, setLang, langs: offered, toggleLang };
}
