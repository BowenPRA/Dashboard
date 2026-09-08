import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { getRoster, listClasses, assignStudents } from '../utils/adminApi';
import StudentProfileDrawer from '../components/StudentProfileDrawer';
import AddStudentModal from '../components/AddStudentModal';
import ClassManagerModal from '../components/ClassManagerModal';
import {
  Users, Star, AlertTriangle, Search, Filter,
  Trophy, BookOpen, ShieldAlert, Loader2, LogOut, UserPlus, CalendarDays,
  Layers, Clock, CheckSquare, Square, Check, X, Zap,
} from 'lucide-react';

// A student counts as "inactive" once this many days pass with no attempt.
const INACTIVE_DAYS = 7;

const dayMs = 86400000;
const daysSince = (iso) => (iso ? (Date.now() - new Date(iso).getTime()) / dayMs : Infinity);

function relTime(iso) {
  if (!iso) return 'Never';
  const d = daysSince(iso);
  if (d < 1) return 'Today';
  if (d < 2) return 'Yesterday';
  if (d < 7) return `${Math.floor(d)}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('highest_xp');
  const [classFilter, setClassFilter] = useState('all'); // 'all' | classId | 'unassigned'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showClasses, setShowClasses] = useState(false);

  // Bulk class assignment.
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState(() => new Set());
  const [assignTarget, setAssignTarget] = useState('');
  const [assigning, setAssigning] = useState(false);

  // The roster is the essential data; classes are a supplementary grouping. A
  // broken or not-yet-deployed classes endpoint must NOT blank the whole
  // dashboard, so classes are fetched best-effort and degrade to none.
  const fetchDashboard = async () => {
    const [{ roster: list }, clsResult] = await Promise.all([
      getRoster(),
      listClasses().catch((err) => {
        console.warn('Classes unavailable, continuing without them:', err);
        return { classes: [] };
      }),
    ]);
    return { roster: list || [], classes: clsResult?.classes || [] };
  };

  const loadAll = async ({ spinner = true } = {}) => {
    if (spinner) setIsLoading(true);
    try {
      const { roster: list, classes: cls } = await fetchDashboard();
      setRoster(list);
      setClasses(cls);
      setLoadError('');
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setLoadError(err.message || 'Could not load the dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { roster: list, classes: cls } = await fetchDashboard();
        if (!alive) return;
        setRoster(list);
        setClasses(cls);
        setLoadError('');
      } catch (err) {
        console.error('Error loading dashboard:', err);
        if (alive) setLoadError(err.message || 'Could not load the dashboard.');
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const classNameById = useMemo(() => {
    const m = {};
    classes.forEach((c) => { m[c.id] = c.name; });
    return m;
  }, [classes]);

  // --- Derived Metrics ---
  const totalStudents = roster.length;
  const activeAlerts = roster.filter((s) => s.is_locked).length;
  const inactiveCount = roster.filter((s) => daysSince(s.last_active) >= INACTIVE_DAYS).length;
  const activeThisWeek = totalStudents - inactiveCount;
  const avgXp = totalStudents > 0
    ? Math.round(roster.reduce((sum, s) => sum + (s.total_xp || 0), 0) / totalStudents)
    : 0;

  // --- Filter & Sort ---
  const filtered = roster
    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((s) => {
      if (classFilter === 'all') return true;
      if (classFilter === 'unassigned') return !s.class_id;
      return s.class_id === classFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'highest_xp') return (b.total_xp || 0) - (a.total_xp || 0);
      if (sortBy === 'lowest_xp') return (a.total_xp || 0) - (b.total_xp || 0);
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      if (sortBy === 'recent') return daysSince(a.last_active) - daysSince(b.last_active);
      if (sortBy === 'locked') {
        if (a.is_locked === b.is_locked) return (b.total_xp || 0) - (a.total_xp || 0);
        return a.is_locked ? -1 : 1;
      }
      return 0;
    });

  // Group the filtered roster by class for section headers (only when showing all).
  const groups = useMemo(() => {
    if (classFilter !== 'all') return [{ key: classFilter, label: null, students: filtered }];
    const byClass = new Map();
    filtered.forEach((s) => {
      const key = s.class_id || '__none__';
      if (!byClass.has(key)) byClass.set(key, []);
      byClass.get(key).push(s);
    });
    const out = [];
    classes.forEach((c) => {
      if (byClass.has(c.id)) out.push({ key: c.id, label: c.name, students: byClass.get(c.id) });
    });
    if (byClass.has('__none__')) out.push({ key: '__none__', label: 'Unassigned', students: byClass.get('__none__') });
    return out;
  }, [filtered, classes, classFilter]);

  const togglePick = (id) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const cancelSelect = () => { setSelectMode(false); setPicked(new Set()); setAssignTarget(''); };

  const runAssign = async () => {
    if (!picked.size) return;
    setAssigning(true);
    try {
      await assignStudents(assignTarget === 'unassigned' ? null : assignTarget, [...picked]);
      cancelSelect();
      await loadAll({ spinner: false });
    } catch (err) {
      setLoadError(err.message || 'Could not assign students.');
    } finally {
      setAssigning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
        <p className="text-xs font-black tracking-widest uppercase text-slate-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-sm border-b-[4px] border-indigo-700">
            <Users className="w-7 h-7 drop-shadow-sm" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Teacher Command</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Manage your classroom</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowClasses(true)}
            className="flex items-center px-5 py-3 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 border-2 border-indigo-200 dark:border-indigo-900 rounded-2xl shadow-sm border-b-[4px] active:border-b-[2px] active:translate-y-[2px] transition-all font-black text-xs uppercase tracking-widest"
          >
            <Layers className="w-4 h-4 mr-2" strokeWidth={3} />
            Classes
          </button>
          <button
            onClick={() => navigate('/study-plan')}
            className="flex items-center px-5 py-3 bg-indigo-500 text-white rounded-2xl shadow-sm border-b-[4px] border-indigo-700 active:border-b-0 active:translate-y-[4px] transition-all font-black text-xs uppercase tracking-widest"
          >
            <CalendarDays className="w-4 h-4 mr-2" strokeWidth={3} />
            Study Plan
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center px-5 py-3 bg-[#58cc02] text-white rounded-2xl shadow-sm border-b-[4px] border-[#58a700] active:border-b-0 active:translate-y-[4px] transition-all font-black text-xs uppercase tracking-widest"
          >
            <UserPlus className="w-4 h-4 mr-2" strokeWidth={3} />
            Add Student
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-5 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-rose-500 hover:border-rose-200 shadow-sm border-b-[4px] active:border-b-[2px] active:translate-y-[2px] transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4 mr-2" strokeWidth={3} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <MetricCard icon={Users} tone="blue" label="Total Students" value={totalStudents} />
          <MetricCard icon={Star} tone="amber" label="Class Avg XP" value={avgXp} />
          <MetricCard
            icon={Zap} tone={inactiveCount > 0 ? 'slate' : 'green'}
            label="Active This Week" value={`${activeThisWeek}/${totalStudents}`}
            sub={inactiveCount > 0 ? `${inactiveCount} inactive ${INACTIVE_DAYS}d+` : 'Everyone active'}
          />
          <div className={`p-6 rounded-[2rem] border-2 shadow-sm flex items-center transition-colors ${activeAlerts > 0 ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 border-b-[4px] shrink-0 ${activeAlerts > 0 ? 'bg-rose-500 text-white border-rose-700' : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
              <ShieldAlert className={`w-7 h-7 ${activeAlerts > 0 ? 'animate-pulse' : ''}`} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-black uppercase tracking-widest ${activeAlerts > 0 ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400'}`}>AI Locks</p>
              <p className={`text-3xl font-black ${activeAlerts > 0 ? 'text-rose-700 dark:text-rose-300' : 'text-slate-800 dark:text-white'}`}>{activeAlerts}</p>
            </div>
          </div>
        </div>

        {/* Toolbox Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-lg font-bold text-slate-800 dark:text-white focus:outline-none focus:border-indigo-400 transition-all shadow-sm"
            />
          </div>

          <div className="relative min-w-[190px]">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Layers className="h-5 w-5 text-slate-400" strokeWidth={2.5} />
            </div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              <option value="unassigned">Unassigned</option>
            </select>
          </div>

          <div className="relative min-w-[190px]">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-slate-400" strokeWidth={2.5} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[1.5rem] text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="highest_xp">Highest XP</option>
              <option value="lowest_xp">Lowest XP</option>
              <option value="recent">Most Recent</option>
              <option value="locked">Needs Attention</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Select-mode toolbar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {selectMode ? (
            <>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">{picked.size} selected</span>
              <select
                value={assignTarget}
                onChange={(e) => setAssignTarget(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-400 appearance-none cursor-pointer"
              >
                <option value="">Assign to…</option>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                <option value="unassigned">Remove from class</option>
              </select>
              <button onClick={runAssign} disabled={!picked.size || !assignTarget || assigning}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white rounded-xl border-b-[3px] border-indigo-700 active:border-b-0 active:translate-y-[3px] font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all">
                {assigning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />} Assign
              </button>
              <button onClick={cancelSelect} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95">
                <X className="w-4 h-4" strokeWidth={3} /> Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setSelectMode(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-500 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-colors">
              <CheckSquare className="w-4 h-4" strokeWidth={2.5} /> Select to assign class
            </button>
          )}
        </div>

        {loadError && (
          <div className="mb-6 flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl font-bold">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            {loadError}
          </div>
        )}

        {/* Grouped student grid */}
        {groups.map((group) => (
          <div key={group.key} className="mb-10">
            {group.label && (
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{group.label}</h2>
                <span className="text-xs font-black text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border-2 border-slate-200 dark:border-slate-800">{group.students.length}</span>
                <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.students.map((student) => {
                const inactive = daysSince(student.last_active) >= INACTIVE_DAYS;
                const isPicked = picked.has(student.id);
                return (
                  <button
                    key={student.id}
                    onClick={() => selectMode ? togglePick(student.id) : setSelectedStudent({ id: student.id, name: student.name })}
                    className={`group text-left relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 shadow-sm border-b-[6px] active:border-b-[2px] active:translate-y-[4px] transition-all duration-200 overflow-hidden
                      ${isPicked ? 'border-indigo-400 ring-4 ring-indigo-200 dark:ring-indigo-900' : student.is_locked
                        ? 'border-rose-300 dark:border-rose-800 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}
                    `}
                  >
                    {selectMode && (
                      <div className="absolute top-4 right-4 z-20 text-indigo-500">
                        {isPicked ? <CheckSquare className="w-6 h-6" strokeWidth={2.5} /> : <Square className="w-6 h-6 text-slate-300" strokeWidth={2.5} />}
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center min-w-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-[3px] mr-4 shrink-0
                          ${student.is_locked ? 'bg-rose-500 border-rose-700' : 'bg-[#1cb0f6] border-[#1899d6] group-hover:scale-110 transition-transform'}`}>
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-xl text-slate-800 dark:text-white truncate max-w-[150px]">{student.name}</h3>
                          <p className="text-xs font-bold text-slate-400 tracking-wide">
                            {student.pra_id ? `PRA ${student.pra_id}` : 'No PRA id'}
                          </p>
                        </div>
                      </div>
                      {student.is_locked && !selectMode && (
                        <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 p-2 rounded-xl border border-rose-200 dark:border-rose-800 animate-pulse">
                          <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    {/* Meta row: current track + last active */}
                    <div className="flex items-center gap-2 mb-3 relative z-10 flex-wrap">
                      {student.current_track && (
                        <span className="text-[10px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">
                          {student.current_track}
                        </span>
                      )}
                      {classFilter === 'all' && student.class_id && classNameById[student.class_id] && (
                        <span className="text-[10px] font-black uppercase tracking-wide text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-900 px-2 py-0.5 rounded-md">
                          {classNameById[student.class_id]}
                        </span>
                      )}
                      <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md border ${inactive ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900' : 'text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
                        <Clock className="w-3 h-3" strokeWidth={2.5} /> {relTime(student.last_active)}
                      </span>
                    </div>

                    <div className="flex gap-2 relative z-10">
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center">
                        <Trophy className="w-5 h-5 text-amber-400 mb-1" strokeWidth={2.5} />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-200">{student.total_xp || 0} XP</span>
                      </div>
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#58cc02] mb-1" strokeWidth={2.5} />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-200">{student.units_completed || 0} Units</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <Search className="w-12 h-12 mb-4 opacity-50" strokeWidth={2} />
            <p className="font-black text-lg tracking-tight">No students found</p>
          </div>
        )}

      </div>

      <StudentProfileDrawer
        isOpen={selectedStudent !== null}
        studentId={selectedStudent?.id}
        studentName={selectedStudent?.name}
        classes={classes}
        onClose={() => { setSelectedStudent(null); loadAll({ spinner: false }); }}
      />

      <AddStudentModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={() => loadAll({ spinner: false })}
      />

      <ClassManagerModal
        isOpen={showClasses}
        onClose={() => setShowClasses(false)}
        onChanged={() => loadAll({ spinner: false })}
      />
    </div>
  );
}

function MetricCard({ icon: Icon, tone, label, value, sub }) {
  const tones = {
    blue: 'bg-[#1cb0f6] text-white border-[#1899d6]',
    amber: 'bg-amber-400 text-white border-amber-600',
    green: 'bg-[#58cc02] text-white border-[#58a700]',
    slate: 'bg-slate-400 text-white border-slate-600',
  };
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 border-b-[4px] shrink-0 ${tones[tone] || tones.slate}`}>
        <Icon className="w-7 h-7" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 truncate">{label}</p>
        <p className="text-3xl font-black text-slate-800 dark:text-white">{value}</p>
        {sub && <p className="text-[11px] font-bold text-slate-400 truncate">{sub}</p>}
      </div>
    </div>
  );
}
