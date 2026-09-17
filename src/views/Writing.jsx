import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Loader2, Sun, Moon, PenLine, Trophy, TrendingUp, TrendingDown, Minus,
  FileText, ArrowRight, Eye,
} from 'lucide-react';

import { useStudentProgress } from '../utils/supabaseClient';
import { TRACK_REGISTRY } from '../components/trackRegistry';
import { Card, Button } from '../components/ui';
import EssayReport from '../components/essay/EssayReport';
import { TRAITS } from '../components/essay/traits';
import EssayTrend from '../components/essay/EssayTrend';
import EssayRow from '../components/essay/EssayRow';
import { allEssays, essayStats, kindTotals, errorDensity } from '../utils/essayArchive';
import useDarkMode from '../hooks/useDarkMode';

/**
 * My Writing — every GED essay the student has written, read back.
 *
 * The Essay task shows a report once, the moment the score arrives, and then
 * the student moves on. This is where the essays stay: the trend across them,
 * the errors that keep coming back, and each essay with the examiner's report
 * and any note the teacher left. Reads `progress[track].__essays` for every GED
 * track (utils/essayArchive.js); never writes.
 */

const GED_TRACKS = TRACK_REGISTRY.filter((t) => t.group === 'GED').map((t) => t.id);

function Stat({ label, value, sub, icon: Icon, tone = 'text-slate-800 dark:text-white' }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
        <Icon className="w-3.5 h-3.5" strokeWidth={3} /> {label}
      </div>
      <div className={`text-3xl font-black tabular-nums tracking-tight ${tone}`}>{value}</div>
      {sub && <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
    </Card>
  );
}

function ChangeStat({ change }) {
  if (change === null) {
    return <Stat label="Since your first" value="—" sub="Needs two scored essays" icon={Minus} tone="text-slate-400" />;
  }
  const up = change > 0;
  const flat = change === 0;
  return (
    <Stat
      label="Since your first"
      value={`${up ? '+' : ''}${change}`}
      sub={flat ? 'Same score as your first essay' : up ? 'points higher than your first essay' : 'points lower than your first essay'}
      icon={flat ? Minus : up ? TrendingUp : TrendingDown}
      tone={flat ? 'text-slate-500' : up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}
    />
  );
}

/**
 * The page itself, given its essays. Split from the data wrapper so
 * preview-writing.jsx can mount it against synthetic entries — the route sits
 * behind Supabase auth.
 */
export function WritingScreen({ essays = [], onBack, onWrite, isDark, onToggleDark }) {
  const [selectedId, setSelectedId] = useState(null);
  const reportRef = useRef(null);

  const stats = useMemo(() => essayStats(essays), [essays]);
  const kinds = useMemo(() => kindTotals(essays).slice(0, 6), [essays]);
  const selected = essays.find((e) => e.id === selectedId) || essays[0] || null;

  const pick = (entry) => {
    setSelectedId(entry.id);
    // Below lg the report sits under the list, out of sight — take the student to it.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onBack}
              className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400 flex-shrink-0"
              title="Back"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={3} />
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-white truncate">My Writing</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
                Extended Response essays
              </p>
            </div>
          </div>
          <button
            onClick={onToggleDark}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex-shrink-0"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {essays.length === 0 ? (
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
          <Card className="p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-[1.75rem] bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center mb-6">
              <PenLine className="w-9 h-9 text-indigo-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">No essays yet</h2>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Every Extended Response you finish in GED Language Arts is kept here — the score, the
              examiner&apos;s report, the errors marked, and how they change from one essay to the next.
            </p>
            {onWrite && (
              <Button onClick={onWrite} size="md">
                Go to Language Arts <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </Button>
            )}
          </Card>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat
              label="Essays"
              value={stats.count}
              sub={stats.examCount ? `${stats.examCount} under exam conditions` : 'None under exam conditions yet'}
              icon={FileText}
            />
            <Stat
              label="Average"
              value={<>{stats.average}<span className="text-lg text-slate-400"> / 6</span></>}
              sub={`Best ${stats.best} / 6`}
              icon={Trophy}
            />
            <ChangeStat change={stats.change} />
            <Stat
              label="Errors per 100 words"
              value={stats.averageDensity}
              sub={`Essays average ${Math.round(stats.averageWords)} words`}
              icon={Eye}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card className="p-6 lg:col-span-3 min-w-0 text-slate-700 dark:text-slate-300">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Score, essay by essay</h2>
              <EssayTrend entries={essays} onPick={pick} selectedId={selected?.id} />
            </Card>
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Trait averages</h2>
              <div className="space-y-4">
                {TRAITS.map((t) => {
                  const v = stats.traits[t.key] || 0;
                  return (
                    <div key={t.key}>
                      <div className="flex items-baseline justify-between gap-3 mb-1.5">
                        <span className="text-sm font-black text-slate-700 dark:text-slate-200">{t.short}</span>
                        <span className="text-xs font-black text-slate-400 tabular-nums">{v} / 2</span>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(v / 2) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {kinds.length > 0 && (
            <Card className="p-6">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">The errors that keep coming back</h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-5">
                Across every essay. The top of this list is what to check first when you proofread.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {kinds.map((k) => (
                  <div key={k.kind} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-black text-slate-800 dark:text-white">{k.kind}</span>
                      <span className="text-xs font-black text-rose-600 dark:text-rose-400 tabular-nums whitespace-nowrap">× {k.count}</span>
                    </div>
                    {k.rule && <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{k.rule}</p>}
                    {k.example?.quote && (
                      <p className="text-sm font-medium mt-2">
                        <span className="line-through text-rose-500">{k.example.quote}</span>
                        <span className="mx-1.5 text-slate-300">→</span>
                        <span className="text-emerald-700 dark:text-emerald-300 font-bold">{k.example.correction}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)] gap-6 items-start">
            <div className="space-y-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">
                All essays · newest first
              </h2>
              {essays.map((e) => (
                <EssayRow key={e.id} entry={e} selected={e.id === selected?.id} onPick={pick} />
              ))}
            </div>

            <div ref={reportRef} className="min-w-0 scroll-mt-28 space-y-6">
              {selected && (
                <>
                  <Card className="p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      {selected.unitTitle}
                    </p>
                    <h2 className="text-xl font-black text-slate-800 dark:text-white leading-snug">
                      {selected.promptTitle || 'Extended Response'}
                    </h2>
                    {selected.task && (
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{selected.task}</p>
                    )}
                    {!selected.nonScorable && selected.wordCount > 0 && (
                      <p className="text-xs font-bold text-slate-400 mt-3">
                        {(selected.revisions || []).length} errors marked · {errorDensity(selected)} per 100 words
                        {selected.secondsUsed ? ` · ${Math.round(selected.secondsUsed / 60)} min` : ''}
                        {selected.minutesAllowed ? ` of ${selected.minutesAllowed}` : ''}
                      </p>
                    )}
                  </Card>
                  <EssayReport key={selected.id} entry={selected} showText />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Writing() {
  const navigate = useNavigate();
  // Reads every GED track's archive; the `track` argument only decides where
  // saveScore would write, and this page never saves.
  const { allProgress, isLoadingDB } = useStudentProgress(navigate, 'GED_ENG');
  const [isDark, toggleDarkMode] = useDarkMode();
  const essays = useMemo(() => allEssays(allProgress, GED_TRACKS), [allProgress]);

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-500 font-black tracking-widest uppercase">Loading your essays</p>
      </div>
    );
  }

  return (
    <WritingScreen
      essays={essays}
      isDark={isDark}
      onToggleDark={toggleDarkMode}
      onBack={() => navigate('/home')}
      onWrite={() => navigate('/GED_ENG')}
    />
  );
}
