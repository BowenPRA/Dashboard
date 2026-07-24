import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { getRoster } from '../utils/adminApi';
import StudentProfileDrawer from '../components/StudentProfileDrawer';
import AddStudentModal from '../components/AddStudentModal';
import {
  Users, Star, AlertTriangle, Search, Filter,
  Trophy, BookOpen, ShieldAlert, Loader2, LogOut, UserPlus
} from 'lucide-react';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('highest_xp');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const fetchRoster = async () => {
    setIsLoading(true);
    try {
      const { roster: list } = await getRoster();
      setRoster(list || []);
      setLoadError('');
    } catch (err) {
      console.error('Error fetching roster:', err);
      setLoadError(err.message || 'Could not load the roster.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // --- Derived Metrics ---
  const totalStudents = roster.length;
  const activeAlerts = roster.filter(s => s.is_locked).length;
  const avgXp = totalStudents > 0 
    ? Math.round(roster.reduce((sum, s) => sum + (s.total_xp || 0), 0) / totalStudents) 
    : 0;

  // --- Filter & Sort Logic ---
  const filteredAndSortedRoster = [...roster]
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'highest_xp') return (b.total_xp || 0) - (a.total_xp || 0);
      if (sortBy === 'lowest_xp') return (a.total_xp || 0) - (b.total_xp || 0);
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      if (sortBy === 'locked') {
        if (a.is_locked === b.is_locked) return (b.total_xp || 0) - (a.total_xp || 0);
        return a.is_locked ? -1 : 1;
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
        <p className="text-xs font-black tracking-widest uppercase text-slate-400">Loading Roster...</p>
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
        
        <div className="flex items-center gap-3">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
            <div className="w-14 h-14 bg-[#1cb0f6] text-white rounded-2xl flex items-center justify-center mr-5 border-b-[4px] border-[#1899d6]">
              <Users className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Students</p>
              <p className="text-3xl font-black text-slate-800 dark:text-white">{totalStudents}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
            <div className="w-14 h-14 bg-amber-400 text-white rounded-2xl flex items-center justify-center mr-5 border-b-[4px] border-amber-600">
              <Star className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Class Avg XP</p>
              <p className="text-3xl font-black text-slate-800 dark:text-white">{avgXp}</p>
            </div>
          </div>

          <div className={`p-6 rounded-[2rem] border-2 shadow-sm flex items-center transition-colors ${activeAlerts > 0 ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 border-b-[4px] ${activeAlerts > 0 ? 'bg-rose-500 text-white border-rose-700' : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
              {activeAlerts > 0 ? <ShieldAlert className="w-7 h-7 animate-pulse" strokeWidth={2.5} /> : <ShieldAlert className="w-7 h-7" strokeWidth={2.5} />}
            </div>
            <div>
              <p className={`text-xs font-black uppercase tracking-widest ${activeAlerts > 0 ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400'}`}>Active AI Locks</p>
              <p className={`text-3xl font-black ${activeAlerts > 0 ? 'text-rose-700 dark:text-rose-300' : 'text-slate-800 dark:text-white'}`}>{activeAlerts}</p>
            </div>
          </div>
        </div>

        {/* Toolbox Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
          
          <div className="relative min-w-[200px]">
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
              <option value="locked">Needs Attention</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {loadError && (
          <div className="mb-6 flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl font-bold">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            {loadError}
          </div>
        )}

        {/* Tactile Student Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedRoster.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent({ id: student.id, name: student.name })}
              className={`group text-left relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 shadow-sm border-b-[6px] active:border-b-[2px] active:translate-y-[4px] transition-all duration-200 overflow-hidden
                ${student.is_locked 
                  ? 'border-rose-300 dark:border-rose-800 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }
              `}
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl border-b-[3px] mr-4 
                    ${student.is_locked ? 'bg-rose-500 border-rose-700' : 'bg-[#1cb0f6] border-[#1899d6] group-hover:scale-110 transition-transform'}
                  `}>
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-800 dark:text-white truncate max-w-[150px]">
                      {student.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 tracking-wide">
                      {student.pra_id ? `PRA ${student.pra_id}` : 'No PRA id'}
                    </p>
                  </div>
                </div>

                {student.is_locked && (
                  <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 p-2 rounded-xl border border-rose-200 dark:border-rose-800 animate-pulse">
                    <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                )}
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
          ))}

          {filteredAndSortedRoster.length === 0 && (
             <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400">
               <Search className="w-12 h-12 mb-4 opacity-50" strokeWidth={2} />
               <p className="font-black text-lg tracking-tight">No students found</p>
             </div>
          )}
        </div>

      </div>

      <StudentProfileDrawer
        isOpen={selectedStudent !== null}
        studentId={selectedStudent?.id}
        studentName={selectedStudent?.name}
        onClose={() => { setSelectedStudent(null); fetchRoster(); }}
      />

      <AddStudentModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={fetchRoster}
      />
    </div>
  );
}