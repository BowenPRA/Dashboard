// The languages a task screen can show. English is the source; every other
// language is a twin field written beside it, and a missing twin falls back to
// English — never to another translation.
//
//   en  English     always
//   vn  Vietnamese  every track, unless it declares `bilingual: false`
//   fr  French      tracks that declare `french: true` (Y7_MATH, Y7_SCI)
//
// Twin names follow the Vietnamese one they sit beside: a `…Vn` suffix becomes
// `…Fr` (`title` / `titleVn` / `titleFr`), and the older `vn…` prefix becomes
// `fr…` (`vnDef` → `frDef`, `vnTranslation` → `frTranslation`, `vn` → `fr`).
// Interface text inside a component takes all three at once:
// `tr(lang, 'Check', 'Kiểm tra', 'Vérifier')`, or an `{ en, vn, fr }` table.
//
// The French matches the course, not France: numbers, decimal points, units
// and every `$…$` span stay exactly as the English has them. The validator
// refuses a French twin whose maths differs (scripts/validate-entry.js).

/** The languages a track offers, in toggle order. `cfg` is its registry entry. */
export function langsFor(cfg) {
  if (cfg?.bilingual === false) return ['en'];
  return cfg?.french ? ['en', 'vn', 'fr'] : ['en', 'vn'];
}

/**
 * The languages a task screen offers when its host passed `langs` — or, from a
 * host that predates French, only `bilingual` (false → English alone).
 */
export function resolveLangs(langs, bilingual = true) {
  if (Array.isArray(langs) && langs.length) return langs;
  return bilingual === false ? ['en'] : ['en', 'vn'];
}

/** The language after `lang` in `langs`, wrapping round — the TopBar toggle. */
export function nextLang(langs, lang) {
  const i = langs.indexOf(lang);
  return langs[(i + 1) % langs.length] || 'en';
}

/** Choose one of three strings for `lang`, falling back to English. */
export function tr(lang, en, vn, fr) {
  if (lang === 'vn') return vn ?? en;
  if (lang === 'fr') return fr ?? en;
  return en;
}

/** The French twin's key for a Vietnamese key: `textVn` → `textFr`, `vnDef` → `frDef`. */
export function frKeyOf(vnKey) {
  if (/Vn$/.test(vnKey)) return vnKey.replace(/Vn$/, 'Fr');
  if (/^vn(?=[A-Z]|$)/.test(vnKey)) return vnKey.replace(/^vn/, 'fr');
  return null;
}

/**
 * The `key` field of `obj` in `lang` — `obj.keyVn` / `obj.keyFr`, else `obj.key`.
 * For a prefix-style twin pass the Vietnamese key as well:
 * `field(word, 'def', lang, 'vnDef')` reads `vnDef` / `frDef`.
 */
export function field(obj, key, lang, vnKey = `${key}Vn`) {
  if (!obj) return undefined;
  return tr(lang, obj[key], obj[vnKey], obj[frKeyOf(vnKey)]);
}

/** A `{ en, vn, fr }` table's entry for `lang`, English when it has none. */
export function pickTable(table, lang) {
  return (table && (table[lang] ?? table.en)) || undefined;
}
