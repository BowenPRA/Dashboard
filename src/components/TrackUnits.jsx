import React, { useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, Check, Play, PackageOpen } from 'lucide-react';

import UnitCard from './UnitCard';
import { getTrackConfig, unitGateOf } from './trackRegistry';
import { getTrack } from '../data/index';
import { unitXPOf, isUnitComplete } from '../tasks/taskRegistry';
import { sectionsOf, unitNumberOf, unitLastTouched } from '../utils/trackSections';

function EmptyTrack({ title, theme }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
        <PackageOpen className={`w-10 h-10 ${theme?.text || 'text-slate-400'}`} strokeWidth={2.5} />
      </div>
      <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">No units yet</h2>
      <p className="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
        {title} is set up and ready, but no lessons have been published to it yet. Check back soon!
      </p>
    </div>
  );
}

/**
 * A track's units: the jump bar, the Continue button, and the unit cards
 * grouped under collapsible coursebook sections (trackRegistry `sections`).
 * A track with no sections renders as the plain list it always was.
 *
 * Presentational on purpose — it is handed the scores rather than fetching
 * them, so the dev harness (preview-nav.html) can drive it with synthetic
 * progress and no login.
 *
 * `stickyTop` is the Tailwind class that parks the jump bar under whatever
 * header the page has (the track page's is h-20).
 */
export default function TrackUnits({ track, unitScores = {}, previewAll = false, requestedUnit = null, startMode, nav, stickyTop = 'top-20' }) {
  const { expandedUnit, setExpandedUnit, openSections, setOpenSections, scrollTarget, setScrollTarget } = nav;

  const trackConfig = getTrackConfig(track);
  const currentTheme = trackConfig?.theme || {};
  const trackTitle = trackConfig?.title || 'Unknown Track';
  const { meta: META_DATA, data: UNIT_DATA } = getTrack(track);
  const activeExpandedUnit = expandedUnit !== null ? expandedUnit : 'NONE';

  // On arrival — a `?unit=` deep link, or coming back from a task — put the
  // open unit on screen. Expanding a card below the fold otherwise looks like
  // nothing happened. Instant, not smooth: this is restoring a position.
  const arrivedAt = useRef(expandedUnit);
  useEffect(() => {
    if (!arrivedAt.current) return;
    document.getElementById(`unit-${arrivedAt.current}`)?.scrollIntoView({ block: 'start' });
  }, []);

  // Jumps made from the bar or the Continue button. Skips the mount pass: a
  // target left over from before a task opened is not a fresh request.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (!scrollTarget) return;
    document.getElementById(scrollTarget.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scrollTarget]);

  // --- the unit list, resolved once -------------------------------------------
  // One row per unit, in track order, carrying everything a card needs. Built
  // up front (rather than inside the render loop) because the section headers,
  // the jump bar and the Continue button all read the same facts.
  let firstIncompleteFound = false;
  // Carries the previous unit's score down the list so a track with `unitGate`
  // can hold each unit shut until the one before it is half done. Tracks
  // without the setting see `unitLock` null.
  let prevUnitXP = 0;
  let prevUnitTitle = '';

  const unitRows = [];
  for (const [unitIndex, metaUnit] of META_DATA.entries()) {
    const contentData = UNIT_DATA[metaUnit.id] || {};
    const scores = unitScores?.[metaUnit.id] || {};
    const unitXP = unitXPOf(contentData, scores);
    // Finished = 100 XP, or 80+ with the quiz sat (taskRegistry.isUnitComplete).
    const complete = isUnitComplete(contentData, scores);

    const gate = unitGateOf(track, unitIndex, prevUnitXP, unitXP);
    // Preview/QA accounts ignore this exactly as they ignore phase locks, so
    // the whole track stays walkable for checking.
    const unitLock = gate.locked && !previewAll
      ? { need: gate.need, prevTitle: prevUnitTitle, prevXP: prevUnitXP }
      : null;
    prevUnitXP = unitXP;
    prevUnitTitle = metaUnit.title;

    const isInProgress = unitXP > 0 && !complete;
    // A locked unit is not the one to nudge them towards, and it must not
    // consume the "next up" slot from the unit that is.
    const isNext = unitXP === 0 && !firstIncompleteFound && !unitLock;
    if (!complete && !unitLock) firstIncompleteFound = true;

    unitRows.push({
      meta: metaUnit,
      scores,
      unitXP,
      complete,
      unitLock,
      isNext,
      needsWork: (isInProgress || isNext) && !unitLock,
      number: unitNumberOf(metaUnit.id),
      touchedAt: isInProgress && !unitLock ? unitLastTouched(scores) : null,
      payload: {
        ...contentData,
        id: metaUnit.id,
        meta: {
          id: metaUnit.id,
          title: metaUnit.title,
          description: metaUnit.desc,
          icon: contentData.meta?.icon || 'BookOpen',
          themeColor: contentData.meta?.themeColor,
          glowColor: contentData.meta?.glowColor,
          thresholds: contentData.meta?.thresholds,
          classroom: contentData.meta?.classroom,
        },
      },
    });
  }

  const rowById = Object.fromEntries(unitRows.map((r) => [r.meta.id, r]));
  const sections = sectionsOf(track, META_DATA).map((s) => {
    const rows = s.units.map((m) => rowById[m.id]);
    return {
      ...s,
      rows,
      done: rows.filter((r) => r.complete).length,
      xp: rows.reduce((sum, r) => sum + r.unitXP, 0),
    };
  });
  const hasSections = sections.length > 1;
  const sectionKeyOf = (unitId) => sections.find((s) => s.rows.some((r) => r.meta.id === unitId))?.key;

  // Where to send them: the in-progress unit they touched most recently, else
  // the first unit not yet started.
  const continueRow =
    unitRows.filter((r) => r.touchedAt).sort((a, b) => (a.touchedAt < b.touchedAt ? 1 : -1))[0]
    || unitRows.find((r) => r.unitXP > 0 && !r.complete && !r.unitLock)
    || unitRows.find((r) => r.isNext)
    || null;

  // Until the student opens or closes a section themselves, exactly one is
  // open: the one holding the deep-linked unit, else the one they are working
  // in. Everything else stays folded so the page is short.
  const defaultSectionKey =
    sectionKeyOf(requestedUnit) || sectionKeyOf(continueRow?.meta.id) || sections[0]?.key;
  const effectiveOpen = openSections ?? new Set(defaultSectionKey ? [defaultSectionKey] : []);

  const toggleSection = (key) => {
    const next = new Set(effectiveOpen);
    if (next.has(key)) next.delete(key); else next.add(key);
    setOpenSections(next);
  };

  const jumpToSection = (key) => {
    setOpenSections(new Set([...effectiveOpen, key]));
    setScrollTarget({ id: `section-${key}` });
  };

  const jumpToUnit = (unitId) => {
    const key = sectionKeyOf(unitId);
    if (key) setOpenSections(new Set([...effectiveOpen, key]));
    setExpandedUnit(unitId);
    setScrollTarget({ id: `unit-${unitId}` });
  };


  return (
    <>
      {/* Jump bar — one chip per coursebook unit, pinned under the header so
          the far end of a long track is always one tap away. Only tracks
          that declare sections (and have more than one in use) get it. */}
      {hasSections && (
        <div className={`sticky ${stickyTop} z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sections.map((s) => {
              const complete = s.done === s.rows.length;
              const isOpen = effectiveOpen.has(s.key);
              return (
                <button
                  key={s.key}
                  onClick={() => jumpToSection(s.key)}
                  title={s.title}
                  className={`flex-shrink-0 flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border-2 border-b-[3px] text-xs font-black uppercase tracking-widest transition-all active:border-b-2 active:translate-y-[1px]
                    ${isOpen
                      ? `${currentTheme.bg} ${currentTheme.border} text-white`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  <span className="whitespace-nowrap">{s.label}</span>
                  <span className="hidden sm:inline normal-case tracking-normal font-bold opacity-80 max-w-[11rem] truncate">{s.title}</span>
                  <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md tabular-nums tracking-normal ${isOpen ? 'bg-black/15' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {complete && <Check className="w-3 h-3" strokeWidth={4} />}
                    {s.done}/{s.rows.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 relative z-10">
        {META_DATA.length === 0 && <EmptyTrack title={trackTitle} theme={currentTheme} />}

        {/* Where you left off — the unit last worked on (or the first one
            not yet started), one tap from the top of the page. */}
        {continueRow && unitRows.length > 3 && (
          <button
            onClick={() => jumpToUnit(continueRow.meta.id)}
            className={`group w-full mb-8 flex items-center gap-4 p-4 sm:p-5 rounded-[1.75rem] text-left text-white border-b-[6px] transition-all hover:brightness-110 active:border-b-0 active:translate-y-[6px] ${currentTheme.bg} ${currentTheme.border}`}
          >
            <span className="w-11 h-11 rounded-xl bg-black/15 flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 fill-current" strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-black uppercase tracking-widest opacity-80">
                {continueRow.unitXP > 0 ? 'Continue where you left off' : 'Start here'}
              </span>
              <span className="block text-lg sm:text-xl font-black tracking-tight truncate">
                {continueRow.number && <span className="mr-2 tabular-nums opacity-80">{continueRow.number}</span>}
                {continueRow.meta.title}
              </span>
            </span>
            <span className="hidden sm:block px-3 py-1.5 rounded-xl bg-black/15 text-xs font-black tracking-widest tabular-nums whitespace-nowrap">
              {continueRow.unitXP} / 100 XP
            </span>
            <ChevronRight className="w-6 h-6 flex-shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </button>
        )}

        {sections.map((section) => {
          const isOpen = !hasSections || effectiveOpen.has(section.key);
          const pct = section.rows.length ? Math.round((section.xp / (section.rows.length * 100)) * 100) : 0;

          return (
            <section key={section.key} id={`section-${section.key}`} className={hasSections ? 'mb-6 scroll-mt-36' : ''}>
              {hasSections && (
                <button
                  onClick={() => toggleSection(section.key)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center gap-3 py-3 mb-2 text-left"
                >
                  <span className={`flex-shrink-0 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest text-white border-b-[3px] ${currentTheme.bg} ${currentTheme.border}`}>
                    {section.label}
                  </span>
                  <span className="min-w-0 flex-1 sm:flex-none text-lg sm:text-xl font-black tracking-tight leading-tight text-slate-800 dark:text-white sm:truncate">
                    {section.title}
                  </span>
                  <span className="hidden sm:block flex-1 h-0.5 min-w-[1rem] bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <span className="hidden sm:block w-24 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                    <span className={`block h-full rounded-full transition-all duration-500 ${section.done === section.rows.length ? 'bg-amber-400' : currentTheme.bg}`} style={{ width: `${pct}%` }} />
                  </span>
                  <span className="flex-shrink-0 text-xs font-black tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {section.done}/{section.rows.length} done
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                  </span>
                </button>
              )}

              {isOpen && (
                <div className={hasSections ? 'animate-in fade-in slide-in-from-top-1 duration-200' : ''}>
                  {section.rows.map((row) => (
                    // The id is the scroll anchor for `?unit=` deep links.
                    <div key={row.meta.id} id={`unit-${row.meta.id}`} className={hasSections ? 'scroll-mt-36' : 'scroll-mt-24'}>
                      <UnitCard
                        unit={row.payload}
                        scores={row.scores}
                        currentTheme={currentTheme}
                        startMode={startMode}
                        isExpanded={activeExpandedUnit === row.meta.id}
                        onToggle={() => setExpandedUnit(activeExpandedUnit === row.meta.id ? 'NONE' : row.meta.id)}
                        needsWork={row.needsWork}
                        previewAll={previewAll}
                        unitLock={row.unitLock}
                        number={row.number}
                        complete={row.complete}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
