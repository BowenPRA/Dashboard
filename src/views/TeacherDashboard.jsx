import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { getRoster, listClasses, assignStudents } from '../utils/adminApi';
import StudentProfileDrawer from '../components/StudentProfileDrawer';
import AddStudentModal from '../components/AddStudentModal';
import ClassManagerModal from '../components/ClassManagerModal';
import TeacherViews from '../components/teacher/TeacherViews';
import useDarkMode from '../hooks/useDarkMode';
import {
  Users, AlertTriangle, Loader2, LogOut, UserPlus, CalendarDays, Layers, RefreshCw, Sun, Moon,
} from 'lucide-react';

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

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [isDark, toggleDarkMode] = useDarkMode();
  const [roster, setRoster] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState('');
  // `{ student, track?, unitId? }` — the gradebook opens a student AT a unit.
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showClasses, setShowClasses] = useState(false);

  // Reload without the full-page spinner: the roster stays on screen and swaps
  // in place, so closing a drawer never blanks the page you were reading.
  const reload = async () => {
    setIsRefreshing(true);
    try {
      const { roster: list, classes: cls } = await fetchDashboard();
      setRoster(list);
      setClasses(cls);
      setLoadError('');
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setLoadError(err.message || 'Could not load the dashboard.');
    } finally {
      setIsRefreshing(false);
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

  const handleAssign = async (classId, studentIds) => {
    try {
      await assignStudents(classId, studentIds);
      await reload();
    } catch (err) {
      setLoadError(err.message || 'Could not assign students.');
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

  const headerBtn = 'flex items-center px-4 py-2.5 rounded-2xl shadow-sm border-b-[4px] transition-all font-black text-xs uppercase tracking-widest';
  const quietBtn = `${headerBtn} bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 active:border-b-[2px] active:translate-y-[2px]`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] border-indigo-700">
            <Users className="w-6 h-6 drop-shadow-sm" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">Teacher Command</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Who is working, on what, and who needs you</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setShowAdd(true)} className={`${headerBtn} bg-[#58cc02] text-white border-[#58a700] active:border-b-0 active:translate-y-[4px]`}>
            <UserPlus className="w-4 h-4 mr-2" strokeWidth={3} /> Add Student
          </button>
          <button onClick={() => setShowClasses(true)} className={`${quietBtn} hover:text-indigo-500`}>
            <Layers className="w-4 h-4 mr-2" strokeWidth={3} /> Classes
          </button>
          <button onClick={() => navigate('/study-plan')} className={`${quietBtn} hover:text-indigo-500`}>
            <CalendarDays className="w-4 h-4 mr-2" strokeWidth={3} /> Study Plan
          </button>
          <button onClick={reload} disabled={isRefreshing} aria-label="Refresh" title="Refresh" className={`${quietBtn} !px-3 hover:text-indigo-500 disabled:opacity-60`}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={3} />
          </button>
          <button onClick={toggleDarkMode} aria-label="Toggle dark mode" title="Toggle dark mode" className={`${quietBtn} !px-3`}>
            {isDark ? <Sun className="w-4 h-4 text-amber-400" strokeWidth={3} /> : <Moon className="w-4 h-4" strokeWidth={3} />}
          </button>
          <button onClick={handleLogout} className={`${quietBtn} hover:text-rose-500 hover:border-rose-200`}>
            <LogOut className="w-4 h-4 mr-2" strokeWidth={3} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {loadError && (
          <div className="mb-6 flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl font-bold">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            {loadError}
          </div>
        )}

        <TeacherViews
          roster={roster}
          classes={classes}
          onOpenStudent={(student, where = {}) => setSelected({ student, ...where })}
          onAssign={handleAssign}
        />
      </div>

      <StudentProfileDrawer
        isOpen={selected !== null}
        student={selected?.student}
        focusTrack={selected?.track}
        focusUnit={selected?.unitId}
        classes={classes}
        onClose={() => { setSelected(null); reload(); }}
      />

      <AddStudentModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={reload}
      />

      <ClassManagerModal
        isOpen={showClasses}
        onClose={() => setShowClasses(false)}
        onChanged={reload}
      />
    </div>
  );
}
