import React, { useMemo, useState } from 'react';
import {
  Users, Zap, ListChecks, ShieldAlert, Search, Filter, Loader2, Check, X,
  CheckSquare, LayoutList, Table2,
} from 'lucide-react';
import RosterList from './RosterList';
import Gradebook from './Gradebook';
import { daysSince, weekActivity, attentionReasons, INACTIVE_DAYS } from './teacherStats';

const SORTS = {
  recent: { label: 'Most Recent', fn: (a, b) => daysSince(a.last_active) - daysSince(b.last_active) },
  week: { label: 'Busiest This Week', fn: (a, b) => (weekActivity(b)?.tasks || 0) - (weekActivity(a)?.tasks || 0) },
  attention: {
    label: 'Needs Attention',
    fn: (a, b) => attentionReasons(b).length - attentionReasons(a).length
      || daysSince(b.last_active) - daysSince(a.last_active),
  },
  highest_xp: { label: 'Highest XP', fn: (a, b) => (b.total_xp || 0) - (a.total_xp || 0) },
  lowest_xp: { label: 'Lowest XP', fn: (a, b) => (a.total_xp || 0) - (b.total_xp || 0) },
  alphabetical: { label: 'Alphabetical', fn: (a, b) => a.name.localeCompare(b.name) },
};

/**
 * Everything on the teacher page below its header: class chips, the headline
 * numbers for the class in view, and the two ways of looking at it — the
 * student list and the gradebook grid.
 *
 * Presentational: it is handed the roster and reports clicks upward, so the dev
 * harness (preview-nav.html?view=teacher) can drive it without a login.
 *
 *   onOpenStudent(student, { track?, unitId? })   open the profile drawer
 *   onAssign(classIdOrNull, studentIds)           bulk class assignment (async)
 */
export default function TeacherViews({ roster, classes, onOpenStudent, onAssign }) {
  const [classFilter, setClassFilter] = useState('all'); // 'all' | classId | 'unassigned'
  const [view, setView] = useState('students'); // 'students' | 'gradebook'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [attentionOnly, setAttentionOnly] = useState(false);

  // Bulk class assignment.
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState(() => new Set());
  const [assignTarget, setAssignTarget] = useState('');
  const [assigning, setAssigning] = useState(false);

  const classNameById = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);

  // Students whose class is not in the list count as unassigned — the classes
  // endpoint is fetched best-effort, so it can be empty while class_ids are not.
  const isUnassigned = (s) => !s.class_id || !classNameById[s.class_id];
  const unassignedCount = roster.filter(isUnassigned).length;

  const inClass = roster.filter((s) => {
    if (classFilter === 'all') return true;
    if (classFilter === 'unassigned') return isUnassigned(s);
    return s.class_id === classFilter;
  });

  // Headline numbers describe the class in view, not the whole school.
  const activeThisWeek = inClass.filter((s) => daysSince(s.last_active) < INACTIVE_DAYS).length;
  const weekTasks = inClass.reduce((sum, s) => sum + (weekActivity(s)?.tasks || 0), 0);
  const hasFeed = inClass.some((s) => Array.isArray(s.recent));
  const attention = inClass.filter((s) => attentionReasons(s).length > 0);
  const locks = inClass.filter((s) => s.is_locked).length;

  const shown = inClass
    .filter((s) => s.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    .filter((s) => !attentionOnly || attentionReasons(s).length > 0)
    .sort(SORTS[sortBy]?.fn || SORTS.recent.fn);

  // Section the list by class only when every class is on screen at once.
  const groups = useMemo(() => {
    if (classFilter !== 'all' || classes.length === 0) return [{ key: 'one', label: null, students: shown }];
    const out = classes
      .map((c) => ({ key: c.id, label: c.name, students: shown.filter((s) => s.class_id === c.id) }))
      .filter((g) => g.students.length);
    const loose = shown.filter((s) => !s.class_id || !classNameById[s.class_id]);
    if (loose.length) out.push({ key: '__none__', label: 'Unassigned', students: loose });
    return out;
  }, [shown, classes, classFilter, classNameById]);

  const togglePick = (id) => setPicked((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const cancelSelect = () => { setSelectMode(false); setPicked(new Set()); setAssignTarget(''); };
  const runAssign = async () => {
    if (!picked.size || !assignTarget) return;
    setAssigning(true);
    try {
      await onAssign(assignTarget === 'unassigned' ? null : assignTarget, [...picked]);
      cancelSelect();
    } finally {
      setAssigning(false);
    }
  };

  const chip = (on) => `flex-shrink-0 flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-xl border-2 border-b-[3px] text-xs font-black uppercase tracking-widest transition-all active:border-b-2 active:translate-y-[1px] ${on
    ? 'bg-indigo-500 border-indigo-700 text-white'
    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`;
  const count = (on) => `px-1.5 py-0.5 rounded-md tabular-nums tracking-normal ${on ? 'bg-black/15' : 'bg-slate-100 dark:bg-slate-800'}`;

  const selectedClass = classes.find((c) => c.id === classFilter);

  return (
    <div>
      {/* Class chips — the scope for everything below. */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button onClick={() => setClassFilter('all')} className={chip(classFilter === 'all')}>
          Everyone <span className={count(classFilter === 'all')}>{roster.length}</span>
        </button>
        {classes.map((c) => {
          const n = roster.filter((s) => s.class_id === c.id).length;
          return (
            <button key={c.id} onClick={() => setClassFilter(c.id)} className={chip(classFilter === c.id)}>
              {c.name} <span className={count(classFilter === c.id)}>{n}</span>
            </button>
          );
        })}
        {unassignedCount > 0 && classes.length > 0 && (
          <button onClick={() => setClassFilter('unassigned')} className={chip(classFilter === 'unassigned')}>
            Unassigned <span className={count(classFilter === 'unassigned')}>{unassignedCount}</span>
          </button>
        )}
      </div>

      {/* Headline numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Metric icon={Users} tone="blue" label="Students" value={inClass.length} sub={selectedClass?.name || (classFilter === 'unassigned' ? 'Unassigned' : 'All classes')} />
        <Metric
          icon={Zap} tone={activeThisWeek === inClass.length && inClass.length ? 'green' : 'slate'}
          label="Active this week" value={`${activeThisWeek}/${inClass.length}`}
          sub={activeThisWeek === inClass.length ? 'Everyone has worked' : `${inClass.length - activeThisWeek} quiet for ${INACTIVE_DAYS}d+`}
        />
        <Metric icon={ListChecks} tone="amber" label="Tasks this week" value={hasFeed ? weekTasks : '—'} sub={hasFeed && inClass.length ? `${(weekTasks / inClass.length).toFixed(1)} per student` : ''} />
        <Metric
          icon={ShieldAlert} tone={attention.length ? 'rose' : 'slate'} alert={attention.length > 0}
          label="Needs attention" value={attention.length}
          sub={attention.length ? (attentionOnly ? 'Showing only these — tap to clear' : `${locks ? `${locks} AI lock · ` : ''}tap to filter`) : 'Nobody flagged'}
          onClick={attention.length || attentionOnly ? () => setAttentionOnly((v) => !v) : undefined}
          pressed={attentionOnly}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="flex p-1 bg-slate-200/70 dark:bg-slate-800 rounded-2xl flex-shrink-0 self-start">
          {[['students', 'Students', LayoutList], ['gradebook', 'Gradebook', Table2]].map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => { setView(id); if (id === 'gradebook') cancelSelect(); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                ${view === id ? 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2.5} /> {label}
            </button>
          ))}
        </div>

        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-indigo-400 transition-all shadow-sm"
          />
        </div>

        <div className="relative min-w-[210px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" strokeWidth={2.5} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort students"
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer"
          >
            {Object.entries(SORTS).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {view === 'students' && (
        <>
          {/* Select-mode toolbar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap min-h-[2.5rem]">
            {selectMode ? (
              <>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">{picked.size} selected</span>
                <select
                  value={assignTarget}
                  onChange={(e) => setAssignTarget(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 appearance-none cursor-pointer"
                >
                  <option value="">Assign to…</option>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  <option value="unassigned">Remove from class</option>
                </select>
                <button onClick={runAssign} disabled={!picked.size || !assignTarget || assigning}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl border-b-[3px] border-indigo-700 active:border-b-0 active:translate-y-[3px] font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all">
                  {assigning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />} Assign
                </button>
                <button onClick={cancelSelect} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95">
                  <X className="w-4 h-4" strokeWidth={3} /> Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setSelectMode(true)}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-indigo-500 rounded-xl font-black text-xs uppercase tracking-widest transition-colors">
                <CheckSquare className="w-4 h-4" strokeWidth={2.5} /> Select to assign class
              </button>
            )}
          </div>

          {groups.map((group) => (
            <div key={group.key} className="mb-8">
              {group.label && (
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{group.label}</h2>
                  <span className="text-xs font-black text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border-2 border-slate-200 dark:border-slate-800">{group.students.length}</span>
                  <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
              )}
              {group.students.length > 0 && (
                <RosterList
                  students={group.students}
                  classNameById={classNameById}
                  showClass={false}
                  selectMode={selectMode}
                  picked={picked}
                  onPick={togglePick}
                  onOpen={(s) => onOpenStudent(s)}
                />
              )}
            </div>
          ))}
        </>
      )}

      {view === 'gradebook' && shown.length > 0 && (
        <Gradebook
          students={shown}
          preferTracks={selectedClass?.enrolled_tracks || []}
          isExpected={(s, trackId) => !!classes.find((c) => c.id === s.class_id)?.enrolled_tracks?.includes(trackId)}
          onOpen={onOpenStudent}
        />
      )}

      {shown.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400">
          <Search className="w-12 h-12 mb-4 opacity-50" strokeWidth={2} />
          <p className="font-black text-lg tracking-tight">No students found</p>
        </div>
      )}
    </div>
  );
}

function Metric({ icon: Icon, tone, label, value, sub, onClick, pressed = false, alert = false }) {
  const tones = {
    blue: 'bg-[#1cb0f6] text-white border-[#1899d6]',
    amber: 'bg-amber-400 text-white border-amber-600',
    green: 'bg-[#58cc02] text-white border-[#58a700]',
    rose: 'bg-rose-500 text-white border-rose-700',
    slate: 'bg-slate-300 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-800',
  };
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      aria-pressed={onClick ? pressed : undefined}
      className={`text-left p-4 sm:p-5 rounded-[1.5rem] border-2 shadow-sm flex items-center transition-all
        ${alert ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}
        ${onClick ? 'border-b-[4px] active:border-b-2 active:translate-y-[2px] cursor-pointer' : ''}
        ${pressed ? 'ring-4 ring-rose-200 dark:ring-rose-900' : ''}`}
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 border-b-[4px] shrink-0 ${tones[tone] || tones.slate}`}>
        <Icon className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 truncate">{label}</p>
        <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tabular-nums leading-tight">{value}</p>
        {sub && <p className="text-[11px] font-bold text-slate-400 truncate">{sub}</p>}
      </div>
    </Comp>
  );
}
