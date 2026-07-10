import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Y8_META, Y9_META, ESL_META, GED_MATH_META, GED_ENG_META, ADD_MATH_META } from '../data/index';
import { 
  X, Loader2, Trophy, Edit2, Check, XCircle, Gamepad2, BookOpen
} from 'lucide-react';

const TASK_MAP = {
  p1: { label: 'Vocab', bg: 'bg-[#58cc02]', border: 'border-[#58a700]', text: 'text-white' },
  p2: { label: 'Spelling', bg: 'bg-[#1cb0f6]', border: 'border-[#1899d6]', text: 'text-white' },
  p3: { label: 'Listening', bg: 'bg-[#ce82ff]', border: 'border-[#a567cc]', text: 'text-white' },
  p4: { label: 'Reading', bg: 'bg-[#ff9600]', border: 'border-[#cc7800]', text: 'text-white' },
  p6: { label: 'Questions', bg: 'bg-[#ffc800]', border: 'border-[#cca000]', text: 'text-white' },
  p7: { label: 'Diagram', bg: 'bg-[#ff4b4b]', border: 'border-[#cc3c3c]', text: 'text-white' },
  p8: { label: 'Essay', bg: 'bg-[#14b8a6]', border: 'border-[#0d9488]', text: 'text-white' },
  p9: { label: 'Assessment', bg: 'bg-[#2563eb]', border: 'border-[#1d4ed8]', text: 'text-white' },
  p10: { label: 'Notes', bg: 'bg-[#94a3b8]', border: 'border-[#64748b]', text: 'text-white' },
  p11: { label: 'Extra', bg: 'bg-[#ec4899]', border: 'border-[#be185d]', text: 'text-white' },
  p12: { label: 'Game', bg: 'bg-[#6366f1]', border: 'border-[#4f46e5]', text: 'text-white' }
};

// Helper function to grab the human-readable unit data
const getUnitMeta = (trackId, unitId) => {
  let metaArray = [];
  if (trackId === 'Y8') metaArray = Y8_META;
  else if (trackId === 'Y9') metaArray = Y9_META;
  else if (trackId === 'ESL') metaArray = ESL_META;
  else if (trackId === 'GED_MATH') metaArray = GED_MATH_META;
  else if (trackId === 'GED_ENG') metaArray = GED_ENG_META;
  else if (trackId === 'ADD_MATH') metaArray = ADD_MATH_META;

  return metaArray?.find(u => u.id === unitId) || { title: 'Unknown Unit', desc: '' };
};

export default function StudentProfileDrawer({ isOpen, onClose, studentId, studentName }) {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [draftXp, setDraftXp] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !studentId) return;

    const fetchDetailedProgress = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('students')
          .select('progress')
          .eq('id', studentId)
          .single();

        if (error) throw error;
        setProgressData(data?.progress || {});
      } catch (err) {
        console.error("Failed to fetch student details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedProgress();
    setEditingTask(null);
  }, [isOpen, studentId]);

  const handleSaveXp = async (trackId, unitId, taskId) => {
    if (draftXp === '' || isNaN(draftXp)) {
      setEditingTask(null);
      return;
    }

    setIsSaving(true);
    const newXp = parseInt(draftXp, 10);

    try {
      const { error } = await supabase.rpc('override_student_xp', {
        target_student_id: studentId,
        track_id: trackId,
        unit_id: unitId,
        task_id: taskId,
        new_xp: newXp
      });

      if (error) throw error;

      setProgressData(prev => ({
        ...prev,
        [trackId]: {
          ...prev[trackId],
          [unitId]: {
            ...prev[trackId][unitId],
            [taskId]: {
              ...prev[trackId][unitId][taskId],
              current: newXp
            }
          }
        }
      }));
    } catch (err) {
      console.error("Failed to save XP:", err);
      alert("Failed to save XP. Please try again.");
    } finally {
      setIsSaving(false);
      setEditingTask(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* INCREASED WIDTH: max-w-2xl -> max-w-4xl */}
      <div className="relative w-full max-w-4xl bg-slate-50 dark:bg-slate-950 h-full shadow-2xl border-l-2 border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right-full duration-300">
        
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 border-b-2 border-slate-200 dark:border-slate-800 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1">
              {studentName}'s Profile
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Detailed Academic Record</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
              <p className="text-sm font-black tracking-widest uppercase text-slate-400">Loading Records...</p>
            </div>
          ) : progressData ? (
            ['GED_MATH', 'GED_ENG', 'Y8', 'Y9', 'ESL', 'ADD_MATH'].map(trackId => {
              const trackData = progressData[trackId];
              if (!trackData || Object.keys(trackData).length === 0) return null;

              return (
                <div key={trackId} className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white border-b-4 border-slate-200 dark:border-slate-800 pb-3 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-indigo-500" strokeWidth={3} />
                    Track: {trackId}
                  </h3>

                  {Object.entries(trackData).map(([unitId, unitData]) => {
                    // Extract Unit Metadata for clean naming
                    const unitMeta = getUnitMeta(trackId, unitId);
                    
                    // Extract the specific Arcade score for THIS unit
                    const p12Score = unitData?.p12?.current || 0;
                    const gamesScore = unitData?.GAMES?.current || 0;
                    const gamesLowerScore = unitData?.games?.current || 0;
                    const unitArcadeScore = Math.max(p12Score, gamesScore, gamesLowerScore);

                    return (
                      <div key={unitId} className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
                        
                        {/* CLEANED UP UNIT HEADER */}
                        <div className="mb-6 border-b-2 border-slate-100 dark:border-slate-800/50 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <h4 className="font-black text-slate-800 dark:text-white text-xl md:text-2xl tracking-tight">
                                {unitMeta.title}
                              </h4>
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner">
                                {unitId}
                              </span>
                            </div>
                            {unitMeta.desc && (
                              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide">{unitMeta.desc}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Prominent Arcade High Score Display */}
                            {unitArcadeScore > 0 && (
                              <div className="flex flex-col sm:items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Arcade High</span>
                                <div className="flex items-center text-sm font-black tracking-widest uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3.5 py-1.5 rounded-xl border-b-[3px] border-orange-700 shadow-sm">
                                  <Gamepad2 className="w-4 h-4 mr-2 drop-shadow-sm" strokeWidth={2.5} />
                                  {unitArcadeScore.toLocaleString()}
                                </div>
                              </div>
                            )}

                            {(unitData.strikes || 0) >= 3 && (
                              <div className="flex flex-col sm:items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Safety Lock</span>
                                <span className="text-xs font-black uppercase tracking-widest bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl border border-rose-200">Engaged</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Fluid Task Badge Container */}
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(unitData)
                            .filter(([taskId]) => taskId !== 'strikes' && TASK_MAP[taskId])
                            .map(([taskId, taskData]) => {
                              const config = TASK_MAP[taskId];
                              const currentXp = taskData?.current || 0;
                              const isEditingThis = editingTask?.unitId === unitId && editingTask?.taskId === taskId;

                              return isEditingThis ? (
                                <div key={taskId} className={`flex items-center p-1.5 pl-4 rounded-xl border-b-[4px] shadow-sm animate-in zoom-in-95 ${config.bg} ${config.border} ${config.text}`}>
                                  <span className="text-xs font-black uppercase tracking-wider mr-3">{config.label}:</span>
                                  <input 
                                    type="number" 
                                    autoFocus
                                    value={draftXp}
                                    onChange={(e) => setDraftXp(e.target.value)}
                                    className="w-16 text-center font-black text-slate-800 rounded-lg py-1 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-inner"
                                    disabled={isSaving}
                                  />
                                  <button 
                                    onClick={() => handleSaveXp(trackId, unitId, taskId)}
                                    disabled={isSaving}
                                    className="ml-2 p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-colors active:scale-95"
                                  >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />}
                                  </button>
                                  <button 
                                    onClick={() => setEditingTask(null)}
                                    disabled={isSaving}
                                    className="ml-1 p-2 bg-white/20 hover:bg-white/40 hover:text-rose-200 rounded-lg transition-colors mr-1 active:scale-95"
                                  >
                                    <XCircle className="w-4 h-4" strokeWidth={3} />
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  key={taskId}
                                  onClick={() => {
                                    setEditingTask({ trackId, unitId, taskId });
                                    setDraftXp(currentXp.toString());
                                  }}
                                  className={`group relative flex items-center px-4 py-2.5 rounded-xl border-b-[4px] shadow-sm transition-all hover:scale-[1.03] active:scale-95 active:border-b-[2px] active:translate-y-[2px] ${config.bg} ${config.border} ${config.text}`}
                                >
                                  <span className="text-xs font-black uppercase tracking-wider mr-2">{config.label}:</span>
                                  <span className="text-sm font-black bg-black/10 px-2 py-0.5 rounded-md">{currentXp} XP</span>
                                  
                                  <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-3">
                                    <Edit2 className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3} />
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <BookOpen className="w-16 h-16 mb-4 opacity-20" strokeWidth={2} />
              <p className="text-center font-bold text-lg">No progress data recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}