import React, { useEffect, useRef } from 'react';
import { ChevronRight, Check, Play, PackageOpen, Trophy } from 'lucide-react';

import UnitCard from './UnitCard';
import { getTrackConfig, unitGateOf } from './trackRegistry';
import { getTrack } from '../data/index';
import { unitXPOf, isUnitComplete, resolveUnitTasks } from '../tasks/taskRegistry';
import { sectionsOf, unitNumberOf, unitLastTouched } from '../utils/trackSections';
import { suggestNextTask } from '../utils/nextTask';

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
 * A track's units: the "Continue" card, one tab per coursebook section
 * (trackRegistry `sections`), and the unit cards of the section on show.
 * A track with no sections renders as the plain list it always was.
 *
 * The page answers two questions in this order — what do I do now (the
 * Continue card, which starts the suggested task in one tap), and where is
 * everything else (the tabs, then the list). Each is asked once: the tabs are
 * the only section navigation, and the Continue card the only "next" nudge.
 *
 * Presentational on purpose — it is handed the scores rather than fetching
 * them, so the dev harness (preview-nav.html) can drive it with synthetic
 * progress and no login.
 */
export default function TrackUnits({ track, unitScores = {}, previewAll = false, requestedUnit = null, startMode, nav }) {
  const { expandedUnit, setExpandedUnit, section, setSection, scrollTarget, setScrollTarget } = nav;

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

  // Jumps made from the Continue card. Skips the mount pass: a target left
  // over from before a task opened is not a fresh request.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (!scrollTarget) return;
    document.getElementById(scrollTarget.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scrollTarget]);

  // --- the unit list, resolved once -------------------------------------------
  // One row per unit, in track order, carrying everything a card needs. Built
  // up front (rather than inside the render loop) because the tabs and the
  // Continue card read the same facts.
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

  // The Continue card is for a LIST. A one-unit track is its own card, so that
  // card carries the next-step strip instead.
  const showContinue = !!continueRow && unitRows.length > 1;
  const continueStep = showContinue
    ? suggestNextTask(
      continueRow.payload,
      continueRow.scores,
      resolveUnitTasks(continueRow.payload, continueRow.unitXP, continueRow.scores),
      continueRow.unitXP,
      previewAll,
    )
    : null;
  const allDone = unitRows.length > 1 && unitRows.every((r) => r.complete);

  // Until the student picks a tab themselves, the one on show holds the
  // deep-linked unit, else the one they are working in.
  const defaultSectionKey =
    sectionKeyOf(requestedUnit) || sectionKeyOf(continueRow?.meta.id) || sections[0]?.key;
  const activeKey = hasSections && sections.some((s) => s.key === section) ? section : defaultSectionKey;
  const shownSections = hasSections ? sections.filter((s) => s.key === activeKey) : sections;

  const jumpToUnit = (unitId) => {
    const key = sectionKeyOf(unitId);
    if (key) setSection(key);
    setExpandedUnit(unitId);
    setScrollTarget({ id: `unit-${unitId}` });
  };

  const pctOf = (xp, units) => (units ? Math.round((xp / (units * 100)) * 100) : 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 relative z-10">
      {META_DATA.length === 0 && <EmptyTrack title={trackTitle} theme={currentTheme} />}

      {/* What to do now: the unit last worked on (or the first not yet
          started), and the task in it to do next — one tap to start it. */}
      {showContinue && (
        <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-3xl text-white border-b-[6px] ${currentTheme.bg || 'bg-sky-500'} ${currentTheme.border || 'border-sky-700'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-black uppercase tracking-widest opacity-80">
                {continueRow.unitXP > 0 ? 'Continue where you left off' : 'Start here'}
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight leading-tight">
                {continueRow.number && <span className="mr-2 tabular-nums opacity-75">{continueRow.number}</span>}
                {continueRow.meta.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 max-w-sm">
                <span className="flex-1 h-2.5 rounded-full bg-black/20 overflow-hidden">
                  <span className="block h-full rounded-full bg-white transition-all duration-700" style={{ width: `${continueRow.unitXP}%` }} />
                </span>
                <span className="text-xs font-black tabular-nums whitespace-nowrap">{continueRow.unitXP} / 100 XP</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end sm:max-w-[16rem]">
              {continueStep && (
                <button
                  onClick={() => startMode(continueRow.meta.id, continueStep.task.id)}
                  className="group flex items-center justify-center gap-2.5 pl-4 pr-5 py-3 rounded-2xl bg-white text-slate-800 font-black text-base border-b-4 border-black/20 hover:bg-slate-50 active:border-b-0 active:translate-y-1 transition-all"
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${continueStep.task.color.bg} ${continueStep.task.color.text}`}>
                    <Play className="w-3.5 h-3.5 fill-current" strokeWidth={2.5} />
                  </span>
                  {continueStep.task.label}
                </button>
              )}
              {continueStep?.note && (
                <p className="text-xs font-bold opacity-90 text-center sm:text-right">{continueStep.note}</p>
              )}
              <button
                onClick={() => jumpToUnit(continueRow.meta.id)}
                className={`flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity
                  ${continueStep ? '' : 'px-5 py-3 rounded-2xl bg-white/15 opacity-100 text-sm'}`}
              >
                {continueStep ? 'See all tasks' : 'Open unit'}
                <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nothing left to finish: say so, rather than an empty space where the
          Continue card was. */}
      {allDone && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-b-4 border-emerald-200 dark:border-emerald-900/60 flex items-center gap-4">
          <span className="w-12 h-12 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Every unit is done!</p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Go back to any unit to push it to a full 100 XP.</p>
          </div>
        </div>
      )}

      {/* One tab per coursebook unit. Only tracks that declare sections (and
          have more than one in use) get them; the rest are one list. */}
      {hasSections && (
        <div role="tablist" aria-label="Units" className="mb-4 sm:mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 sm:gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => {
            const active = s.key === activeKey;
            const complete = s.done === s.rows.length;
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={active}
                onClick={() => setSection(s.key)}
                className={`flex-1 min-w-[9.5rem] sm:min-w-[12rem] text-left p-3 sm:p-4 rounded-2xl border-2 transition-all
                  ${active
                    ? `bg-white dark:bg-slate-900 border-b-4 ${currentTheme.border || 'border-sky-700'}`
                    : 'bg-slate-100 dark:bg-slate-900/50 border-transparent border-b-4 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-800'}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-black uppercase tracking-widest ${active ? (currentTheme.text || 'text-sky-600') : 'text-slate-400 dark:text-slate-500'}`}>
                    {s.label}
                  </span>
                  <span className={`flex items-center gap-1 text-[11px] font-black tabular-nums ${complete ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {complete && <Check className="w-3.5 h-3.5" strokeWidth={4} />}
                    {s.done}/{s.rows.length} done
                  </span>
                </span>
                <span className={`block mt-0.5 text-sm sm:text-base font-black tracking-tight leading-tight line-clamp-2 sm:line-clamp-1 ${active ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {s.title || 'More units'}
                </span>
                <span className="block mt-2.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <span
                    className={`block h-full rounded-full transition-all duration-500 ${complete ? 'bg-emerald-500' : (currentTheme.bg || 'bg-sky-500')}`}
                    style={{ width: `${pctOf(s.xp, s.rows.length)}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {shownSections.map((s) => (
        <div key={s.key} role={hasSections ? 'tabpanel' : undefined} aria-label={hasSections ? `${s.label}: ${s.title}` : undefined} className="space-y-3 animate-in fade-in duration-200">
          {s.rows.map((row) => (
            // The id is the scroll anchor for `?unit=` deep links.
            <div key={row.meta.id} id={`unit-${row.meta.id}`} className="scroll-mt-24">
              <UnitCard
                unit={row.payload}
                scores={row.scores}
                currentTheme={currentTheme}
                startMode={startMode}
                isExpanded={activeExpandedUnit === row.meta.id}
                onToggle={() => setExpandedUnit(activeExpandedUnit === row.meta.id ? 'NONE' : row.meta.id)}
                needsWork={!showContinue && row === continueRow}
                previewAll={previewAll}
                unitLock={row.unitLock}
                number={row.number}
                complete={row.complete}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
