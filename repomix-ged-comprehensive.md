This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/components/**/*.{js,jsx}, src/views/**/*.{js,jsx}, src/pages/**/*.{js,jsx}, src/hooks/useStudentProgress.js, src/data/index.js, src/App.jsx
- Files matching these patterns are excluded: **/tasks/**, **/widgets/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/App.jsx
src/components/Feedback.jsx
src/components/math/MathGraph.jsx
src/components/StudentProfileDrawer.jsx
src/components/TeacherRoute.jsx
src/components/TopBar.jsx
src/components/towerdefense/BuildMenu.jsx
src/components/towerdefense/ExitConfirmModal.jsx
src/components/towerdefense/GameBoard.jsx
src/components/towerdefense/gameData.js
src/components/towerdefense/HUD.jsx
src/components/towerdefense/themeData.js
src/components/towerdefense/TowerVisual.jsx
src/components/towerdefense/UpgradeBadges.jsx
src/components/towerdefense/UpgradePanel.jsx
src/components/towerdefense/useGameEngine.js
src/components/towerdefense/VocabChallenge.jsx
src/components/towerdefense/wavePresets.js
src/components/trackRegistry.js
src/components/UnitCard.jsx
src/components/WidgetRenderer.jsx
src/data/index.js
src/hooks/useStudentProgress.js
src/pages/Login.jsx
src/views/Home.jsx
src/views/TeacherDashboard.jsx
src/views/YearDashboard.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/math/MathGraph.jsx">
import React, { useState, useMemo, useRef } from 'react';

// Safely evaluates standard math expressions without using eval()
const safeEvaluate = (eq, x) => {
  if (!eq) return x;
  let expr = eq.replace(/\s+/g, '')
               .replace(/e\^\(([^)]+)\)/g, 'Math.exp($1)') 
               .replace(/e\^x/g, 'Math.exp(x)')             
               .replace(/x\^2/g, '(x*x)')
               .replace(/x\^3/g, '(x*x*x)')
               .replace(/sin\(x\)/g, 'Math.sin(x)')
               .replace(/cos\(x\)/g, 'Math.cos(x)')
               .replace(/ln\(x\)/g, 'Math.log(x)');
  try {
    const func = new Function('x', 'Math', `return ${expr};`);
    return func(x, Math);
  } catch (e) {
    return 0;
  }
};

// Helper to calculate "nice" round numbers for grid lines
const getNiceStep = (span, maxTicks) => {
  const roughStep = span / maxTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const rel = roughStep / mag;
  let niceMult = 1;
  if (rel < 1.5) niceMult = 1;
  else if (rel < 3) niceMult = 2;
  else if (rel < 7) niceMult = 5;
  else niceMult = 10;
  return niceMult * mag;
};

export default function MathGraph({ equation = 'e^x', xRange = [-3, 3], yRange = [0, 20] }) {
  const [sliderX, setSliderX] = useState(0);
  const containerRef = useRef(null);

  const width = 600;
  const height = 350;
  
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const mapY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const xAxisY = clamp(mapY(0), 10, height - 10);
  const yAxisX = clamp(mapX(0), 10, width - 10);

  const xStep = getNiceStep(xMax - xMin, 8);
  const yStep = getNiceStep(yMax - yMin, 6);
  
  const xTicks = [];
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) xTicks.push(x);
  
  const yTicks = [];
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) yTicks.push(y);

  const { pathData, areaData } = useMemo(() => {
    const points = [];
    const steps = 200; 
    const stepSize = (xMax - xMin) / steps;
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * stepSize;
      const y = safeEvaluate(equation, x);
      // Plot points extending slightly past the bounds to ensure smooth clipping
      if (y >= yMin - (yMax - yMin) && y <= yMax + (yMax - yMin)) {
         points.push(`${mapX(x)},${mapY(y)}`);
      }
    }
    
    if (points.length === 0) return { pathData: '', areaData: '' };
    
    const path = `M ${points.join(' L ')}`;
    const area = `${path} L ${points[points.length-1].split(',')[0]},${height} L ${points[0].split(',')[0]},${height} Z`;
    
    return { pathData: path, areaData: area };
  }, [equation, xMin, xMax, yMin, yMax, height]);

  const currentY = safeEvaluate(equation, sliderX);
  const pointX = mapX(sliderX);
  const pointY = mapY(currentY);
  const isPointVisible = currentY >= yMin && currentY <= yMax;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center touch-none select-none" ref={containerRef}>
      
      <div className="w-full flex-1 min-h-[250px] relative flex flex-col items-center justify-center p-2 lg:p-4">
        <div className="w-full h-full relative max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] shadow-inner overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1cb0f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1cb0f6" stopOpacity="0.0" />
              </linearGradient>
              <clipPath id="graphClip">
                <rect x="0" y="0" width={width} height={height} />
              </clipPath>
            </defs>

            {/* Grid Lines */}
            {xTicks.map(x => <line key={`gx-${x}`} x1={mapX(x)} y1="0" x2={mapX(x)} y2={height} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />)}
            {yTicks.map(y => <line key={`gy-${y}`} x1="0" y1={mapY(y)} x2={width} y2={mapY(y)} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />)}
            
            {/* Main Axes */}
            <line x1="0" y1={xAxisY} x2={width} y2={xAxisY} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />
            <line x1={yAxisX} y1="0" x2={yAxisX} y2={height} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />

            {/* Labels */}
            {xTicks.map(x => (
              <g key={`xt-${x}`}>
                <line x1={mapX(x)} y1={xAxisY - 4} x2={mapX(x)} y2={xAxisY + 4} stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                {x !== 0 && <text x={mapX(x)} y={xAxisY + 20} fontSize="12" textAnchor="middle" fill="currentColor" className="text-slate-500 font-bold">{parseFloat(x.toPrecision(3))}</text>}
              </g>
            ))}

            {yTicks.map(y => (
              <g key={`yt-${y}`}>
                <line x1={yAxisX - 4} y1={mapY(y)} x2={yAxisX + 4} y2={mapY(y)} stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                {y !== 0 && <text x={yAxisX - 8} y={mapY(y) + 4} fontSize="12" textAnchor="end" fill="currentColor" className="text-slate-500 font-bold">{parseFloat(y.toPrecision(3))}</text>}
              </g>
            ))}
            
            <text x={yAxisX - 8} y={xAxisY + 16} fontSize="12" textAnchor="end" fill="currentColor" className="text-slate-400 font-black">0</text>

            <g clipPath="url(#graphClip)">
              {areaData && <path d={areaData} fill="url(#curveFill)" />}
              {pathData && <path d={pathData} fill="none" stroke="#1cb0f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md" />}
            </g>

            {/* Tracers */}
            {isPointVisible && (
              <>
                <line x1={pointX} y1={xAxisY} x2={pointX} y2={pointY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <line x1={yAxisX} y1={pointY} x2={pointX} y2={pointY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <circle cx={pointX} cy={pointY} r="8" fill="#f59e0b" className="animate-pulse opacity-40" />
                <circle cx={pointX} cy={pointY} r="5" fill="#f59e0b" stroke="white" strokeWidth="2" className="drop-shadow-md" />
              </>
            )}
          </svg>

          {/* Dynamic Tooltip */}
          {isPointVisible && (
            <div 
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-[120%] transition-all duration-75 ease-out z-20"
              style={{ left: `${(pointX / width) * 100}%`, top: `${(pointY / height) * 100}%` }}
            >
              <div className="bg-slate-900/90 dark:bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-xl border border-white/20 dark:border-slate-800/20 text-white dark:text-slate-900 text-xs sm:text-sm font-mono font-bold flex flex-col items-center">
                <span>{parseFloat(sliderX).toFixed(2)}, {parseFloat(currentY).toFixed(2)}</span>
                <div className="absolute -bottom-1.5 w-3 h-3 bg-slate-900/90 dark:bg-white/95 rotate-45 border-r border-b border-white/20 dark:border-slate-800/20"></div>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-md font-mono text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 flex items-center">
            <span className="text-[#1cb0f6] mr-2">f(x) =</span> {equation}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-700 z-20 flex-shrink-0 mt-2">
        <div className="flex justify-between items-end mb-5">
          <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center shadow-inner">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mr-2 sm:mr-3">Domain (x)</span>
            <span className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200 font-mono w-20 text-right">{parseFloat(sliderX).toFixed(2)}</span>
          </div>
          
          <div className="bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/30 px-4 py-2 rounded-xl flex items-center shadow-inner">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1899d6] mr-2 sm:mr-3">Range (y)</span>
            <span className="text-xl sm:text-2xl font-black text-[#1cb0f6] font-mono w-20 text-right">
               {currentY > 999 ? '∞' : parseFloat(currentY).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="relative flex items-center w-full px-2">
          <span className="text-slate-400 font-bold text-sm w-8 text-right mr-3">{xMin}</span>
          <input 
            type="range" 
            min={xMin} 
            max={xMax} 
            step={(xMax - xMin) / 300}
            value={sliderX} 
            onChange={(e) => setSliderX(parseFloat(e.target.value))} 
            className="flex-1 h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#f59e0b] hover:accent-[#d97706] transition-all"
          />
          <span className="text-slate-400 font-bold text-sm w-8 ml-3">{xMax}</span>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/components/StudentProfileDrawer.jsx">
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Y8_META, Y9_META, ESL_META, GED_META } from '../data/index';
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
  else if (trackId === 'GED') metaArray = GED_META;

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
            ['Y8', 'Y9', 'ESL', 'GED'].map(trackId => {
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
</file>

<file path="src/components/TeacherRoute.jsx">
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; // Ensure this path matches your project
import { Loader2 } from 'lucide-react';

export default function TeacherRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkTeacherAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session exists, or if the role is not 'teacher', deny access
      if (!session || session.user.user_metadata?.role !== 'teacher') {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkTeacherAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" strokeWidth={3} />
      </div>
    );
  }

  // Bounce unauthorized users (students) to their standard home dashboard
  if (!isAuthorized) {
    return <Navigate to="/home" replace />;
  }

  // If they pass the check, render the Teacher Dashboard!
  return children;
}
</file>

<file path="src/components/trackRegistry.js">
import { Atom, Leaf, Languages, GraduationCap, Calculator } from 'lucide-react';

export const TRACK_REGISTRY = [
  { 
    id: 'Y8', 
    title: 'Year 8 Science', 
    desc: 'Biology & Chemistry', 
    icon: Atom, 
    theme: { 
      bg: 'bg-indigo-500', 
      border: 'border-indigo-700', 
      hover: 'hover:bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400', 
      ambient1: 'bg-indigo-400', 
      ambient2: 'bg-purple-500', 
      glow: 'hover:border-indigo-400 dark:hover:border-indigo-600' 
    }
  },
  { 
    id: 'Y9', 
    title: 'Year 9 Science', 
    desc: 'Ecology & Physics', 
    icon: Leaf, 
    theme: { 
      bg: 'bg-emerald-500', 
      border: 'border-emerald-700', 
      hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400', 
      ambient1: 'bg-emerald-400', 
      ambient2: 'bg-teal-500', 
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600' 
    }
  },
  { 
    id: 'ESL', 
    title: 'ESL Foundation', 
    desc: 'Core Vocab & Phonics', 
    icon: Languages, 
    theme: { 
      bg: 'bg-amber-400', 
      border: 'border-amber-600', 
      hover: 'hover:bg-amber-300',
      text: 'text-amber-600 dark:text-amber-400', 
      ambient1: 'bg-amber-400', 
      ambient2: 'bg-orange-500', 
      glow: 'hover:border-amber-400 dark:hover:border-amber-600' 
    }
  },
  { 
    id: 'GED', 
    title: 'English', 
    desc: 'Reading & Language', 
    icon: GraduationCap, 
    theme: { 
      bg: 'bg-rose-500', 
      border: 'border-rose-700', 
      hover: 'hover:bg-rose-400',
      text: 'text-rose-600 dark:text-rose-400', 
      ambient1: 'bg-rose-400', 
      ambient2: 'bg-pink-500', 
      glow: 'hover:border-rose-400 dark:hover:border-rose-600' 
    }
  },
  { 
    id: 'ADD_MATH', 
    title: 'Additional Math', 
    desc: 'Cambridge IGCSE Math', 
    icon: Calculator, 
    theme: { 
      bg: 'bg-cyan-500', 
      border: 'border-cyan-700', 
      hover: 'hover:bg-cyan-400',
      text: 'text-cyan-600 dark:text-cyan-400', 
      ambient1: 'bg-cyan-400', 
      ambient2: 'bg-blue-500', 
      glow: 'hover:border-cyan-400 dark:hover:border-cyan-600' 
    }
  }
];
</file>

<file path="src/components/WidgetRenderer.jsx">
import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy-load complex mathematical and physics widgets to keep bundle size small
const MathGraph = lazy(() => import('../components/math/MathGraph'));

export default function WidgetRenderer({ config }) {
  if (!config) return null;

  // 1. Legacy Support: If the config is passed directly as a functional React component 
  // (Maintains backwards compatibility with Y8/SCIENCE_1A hardcoded imports)
  if (typeof config === 'function' || (typeof config === 'object' && config.$$typeof)) {
    const LegacyWidget = config;
    return <LegacyWidget />;
  }

  // 2. Dynamic Component resolution for Phase 3 configuration objects
  const { type, params } = config;

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <span className="text-xs font-bold tracking-widest uppercase">Loading Tool...</span>
      </div>
    }>
      {type === 'MathGraph' && <MathGraph {...params} />}
      
      {/* Fallback for unrecognized dynamically requested widgets */}
      {type !== 'MathGraph' && (
        <div className="p-6 border-2 border-dashed border-rose-300 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-500 font-bold flex flex-col items-center text-center">
          <span>Widget Type "{type}" Not Found</span>
          <span className="text-sm font-medium mt-2 text-rose-400">Ensure it is registered in WidgetRenderer.jsx</span>
        </div>
      )}
    </Suspense>
  );
}
</file>

<file path="src/views/TeacherDashboard.jsx">
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import StudentProfileDrawer from '../components/StudentProfileDrawer';
import { 
  Users, Star, AlertTriangle, Search, Filter, 
  Trophy, BookOpen, ShieldAlert, Loader2, LogOut
} from 'lucide-react';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('highest_xp');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const { data, error } = await supabase.rpc('get_teacher_roster');
        
        if (error) throw error;
        setRoster(data || []);
      } catch (err) {
        console.error('Error fetching roster:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoster();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'Never logged in';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    });
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
        
        <button 
          onClick={handleLogout}
          className="flex items-center px-5 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-rose-500 hover:border-rose-200 shadow-sm border-b-[4px] active:border-b-[2px] active:translate-y-[2px] transition-all font-black text-xs uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4 mr-2" strokeWidth={3} />
          Sign Out
        </button>
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
                    <p className="text-xs font-bold text-slate-400 tracking-wide">Last Login: {formatLastLogin(student.last_login)}</p>
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
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
</file>

<file path="src/components/Feedback.jsx">
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { playChime } from '../utils/sound';

export default function Feedback({ 
  // Core / Vocab Props
  isCorrect, 
  currentWord, 
  isWordRecognition, 
  track, 
  unitId,
  onNext,
  // Assessment Review Props
  expEn, 
  expVn, 
  onPrev, 
  isFirst, 
  isLast 
}) {
  const isAssessmentMode = !currentWord;
  const audioState = useRef({ isCancelled: false, currentAudio: null });
  const [btnCooldown, setBtnCooldown] = useState(false);
  const [enterActive, setEnterActive] = useState(false);

  // 1. Enter Key Listener
  useEffect(() => {
    if (isAssessmentMode) return;
    
    const timer = setTimeout(() => setEnterActive(true), 400);
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && enterActive && !btnCooldown) {
        e.preventDefault(); 
        setBtnCooldown(true);
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handleKeyDown); };
  }, [onNext, enterActive, btnCooldown, isAssessmentMode]);

  // 2. Audio Sequences & Chimes
  useEffect(() => {
    if (isAssessmentMode) return;

    playChime(isCorrect ? 'correct' : 'incorrect');
    if (!currentWord?.isReal) return;

    const state = audioState.current;
    state.isCancelled = false;

    // Trust the dashboard injection FIRST to guarantee perfect absolute routes
    const aWord = new Audio(currentWord.audio);
    const aDef = new Audio(currentWord.defAudio);
    const aSent = new Audio(currentWord.sentAudio);

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve()); 
    });

    const playSequence = async () => {
      try {
        if (state.isCancelled) return;
        if (isWordRecognition) {
          await playAudioObj(aWord);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 300));
          if (state.isCancelled) return; await playAudioObj(aDef);
          if (state.isCancelled) return; await new Promise(r => setTimeout(r, 400));
          if (state.isCancelled) return; await playAudioObj(aSent);
        } else {
          await playAudioObj(aSent);
        }
      } catch (err) { console.warn(`Spoken audio skipped for ${track}`); }
    };

    if (currentWord.isReal) playSequence();

    return () => {
      state.isCancelled = true;
      if (state.currentAudio) { state.currentAudio.pause(); state.currentAudio.currentTime = 0; }
    };
  }, [isCorrect, currentWord, isWordRecognition, track, unitId, isAssessmentMode]);

  const handleManualAudio = () => {
    if (isAssessmentMode || !currentWord?.isReal || btnCooldown) return;
    setBtnCooldown(true); setTimeout(() => setBtnCooldown(false), 500);
    if (audioState.current.currentAudio) { audioState.current.currentAudio.pause(); audioState.current.currentAudio.currentTime = 0; }
    
    // Blindly trust the absolute URL injected by YearDashboard.jsx
    const audio = new Audio(currentWord.sentAudio);
    audioState.current.currentAudio = audio;
    audio.play().catch(() => console.warn("Manual audio failed"));
  };

  const handleNextClick = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    onNext();
  };

  if (isAssessmentMode) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-50 animate-in slide-in-from-bottom-8 duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex flex-col">
        <div className={`p-6 md:p-8 flex flex-col border-t-4 ${isCorrect ? 'bg-[#D7FFD7] border-[#58A700]' : 'bg-[#FFE5E5] border-[#EA4335]'}`}>
          <div className="max-w-7xl mx-auto w-full">
             <div className={`font-black text-2xl flex items-center mb-3 tracking-tight ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>
                {isCorrect ? (
                  <><CheckCircle2 className="w-7 h-7 mr-2" strokeWidth={2.5} /> Correct Answer</>
                ) : (
                  <><XCircle className="w-7 h-7 mr-2" strokeWidth={2.5} /> Incorrect Answer</>
                )}
             </div>
             {(expEn || expVn) && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-3 border-t border-black/10">
                 <div>
                   <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Explanation</span>
                   <p className={`text-[15px] font-medium leading-relaxed ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{expEn}</p>
                 </div>
                 <div>
                   <span className={`text-xs font-black uppercase tracking-widest block mb-1.5 opacity-80 ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>Giải thích</span>
                   <p className={`text-[15px] font-medium italic leading-relaxed ${isCorrect ? 'text-[#3E7500]' : 'text-[#A32D23]'}`}>{expVn}</p>
                 </div>
               </div>
             )}
          </div>
        </div>
        
        <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <button 
              onClick={onPrev} 
              disabled={isFirst} 
              className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={onNext} 
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#58cc02] border-[#58a700] hover:bg-[#46a802]"
            >
              {isLast ? 'Finish Review' : 'Next Review'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bgClass = isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]';
  const textClass = isCorrect ? 'text-[#468500]' : 'text-[#C9362A]';
  const borderClass = isCorrect ? 'border-[#58A700]' : 'border-[#EA2B2B]';
  
  return (
    <div className={`fixed bottom-0 left-0 w-full ${bgClass} border-t-[6px] ${borderClass} p-6 md:p-8 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 w-full overflow-hidden">
          {currentWord?.isReal ? (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/5 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 w-full bg-white/50 p-5 md:p-6 rounded-[2rem] border border-white/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-black/5">
                  <div><h3 className="text-3xl font-black text-slate-800 capitalize">{currentWord.word}</h3><p className="text-xl font-bold text-slate-500 mt-1">{currentWord.vn}</p></div>
                  <button disabled={btnCooldown} onClick={handleManualAudio} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-70">
                    <Volume2 className="w-6 h-6 mr-2" /><span className="font-bold text-sm uppercase tracking-widest">Play Audio</span>
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-slate-800 leading-snug">{currentWord.def}</p>
                  <p className={`text-md font-medium mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>{currentWord.vnDef}</p>
                </div>
                <div className={`pt-4 border-t ${isCorrect ? 'border-[#58A700]/20' : 'border-[#EA2B2B]/20'}`}>
                  <span className={`font-black text-xs uppercase tracking-widest block mb-2 ${textClass}`}>Sample Sentence</span>
                  <p className="text-xl font-medium italic leading-relaxed text-slate-800">
                    {currentWord.sent.split(new RegExp(`(${currentWord.word})`, 'gi')).map((part, i) => part.toLowerCase() === currentWord.word.toLowerCase() ? <strong key={i} className={`px-1 rounded ${isCorrect ? 'bg-[#58A700]/20 text-[#3E7500]' : 'bg-[#EA2B2B]/20 text-[#A32D23]'}`}>{part}</strong> : part)}
                  </p>
                  <p className={`text-lg font-medium italic mt-1 ${isCorrect ? 'text-[#3E7500]/80' : 'text-[#A32D23]/80'}`}>"{currentWord.vnSent}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/4 flex-shrink-0">
                <div className={`flex items-center ${isCorrect ? 'text-[#58A700]' : 'text-[#EA2B2B]'} mb-0 flex-shrink-0`}>
                  {isCorrect ? <CheckCircle2 className="w-12 h-12 mr-3 bg-white rounded-full" /> : <XCircle className="w-12 h-12 mr-3 bg-white rounded-full" />}
                  <span className="text-3xl font-black tracking-wide hidden sm:inline">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                </div>
              </div>
              <div className={`flex-1 min-w-0 w-full p-5 md:p-6 rounded-[2rem] border shadow-sm ${isCorrect ? 'bg-white/50 border-[#58A700]/30' : 'bg-white/50 border-[#EA2B2B]/30'}`}>
                 <h3 className={`text-2xl font-black mb-2 ${isCorrect ? 'text-[#468500]' : 'text-[#C9362A]'}`}>{isCorrect ? "You spotted it!" : "Watch out!"}</h3>
                 <p className="text-xl font-medium text-slate-800 flex items-center"><span className="font-bold uppercase tracking-widest text-sm bg-white px-3 py-1 rounded-lg shadow-sm mr-3">Fake Word</span> <strong>{currentWord.word}</strong></p>
                 {currentWord?.imitating && (
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <p className="flex items-center text-lg text-slate-700 font-medium"><AlertCircle className="w-5 h-5 mr-2 text-slate-400" />This was trying to imitate: <strong className="ml-2 font-black text-xl text-slate-900">{currentWord.imitating}</strong></p>
                  </div>
                 )}
              </div>
            </div>
          )}
        </div>
        <button disabled={btnCooldown} onClick={handleNextClick} className={`w-full md:w-auto px-12 py-6 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all flex-shrink-0 border-b-[6px] active:border-b-0 active:translate-y-[6px] mt-2 md:mt-0 ${isCorrect ? 'bg-[#58A700] hover:bg-[#468500] border-[#468500]' : 'bg-[#EA2B2B] hover:bg-[#C9362A] border-[#C9362A]'} disabled:opacity-80`}>Continue</button>
      </div>
    </div>
  );
}
</file>

<file path="src/components/TopBar.jsx">
import React, { useEffect, useState } from 'react';
import { BookOpen, X as XIcon, Sun, Moon } from 'lucide-react';

export default function TopBar({ onQuit, current, total, progress, modeTitle }) {
  const displayScore = current !== undefined ? current : 0;
  const displayTotal = total !== undefined ? total : 0;
  const displayProgress = progress !== undefined ? progress : (displayTotal > 0 ? (displayScore / displayTotal) * 100 : 0);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-20 relative h-16 transition-colors duration-300">
      
      <div className="flex items-center text-slate-700 dark:text-slate-200 font-black text-lg w-1/4">
        <div className="flex items-center text-[#1CB0F6]">
          <BookOpen className="w-6 h-6 mr-2 drop-shadow-sm" strokeWidth={2.5} />
          <span className="hidden sm:inline whitespace-nowrap tracking-wide">{modeTitle || 'Science Vocab'}</span>
        </div>
      </div>

      {/* Gamified 3D Progress Bar */}
      <div className="flex-1 mx-4 max-w-md hidden md:block">
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 shadow-inner border border-slate-300 dark:border-slate-700 overflow-hidden relative">
          <div 
            className="bg-[#58cc02] h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden" 
            style={{ width: `${displayProgress}%` }}
          >
            {/* White light gleam for 3D effect */}
            <div className="absolute top-1 left-2 right-2 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-1/4 min-w-[140px]">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="mr-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-5 h-5" strokeWidth={2.5} />}
        </button>

        {/* Fraction Score Visual */}
        {displayTotal > 0 && (
          <div className="flex items-center space-x-1.5 font-black text-sm px-4 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase tracking-widest mr-4 shadow-sm">
            <span className="text-[#58cc02]">{displayScore}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-500 dark:text-slate-400">{displayTotal}</span>
          </div>
        )}

        <button 
          onClick={onQuit} 
          className="flex items-center text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-black text-sm uppercase tracking-wider transition-colors active:scale-95 group"
          title="Save & Quit"
        >
          <span className="hidden sm:inline mr-1 group-hover:opacity-100 opacity-70 transition-opacity">Quit</span>
          <XIcon className="w-7 h-7" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/BuildMenu.jsx">
// src/components/towerdefense/BuildMenu.jsx
import React, { useState } from 'react';
import { Coins, Zap, Crosshair, Clock, Maximize2, Info } from 'lucide-react';
import { TOWERS, TOWER_ORDER } from './gameData';
import TowerVisual from './TowerVisual'; 

const TOWER_THEME = {
  DART:   { bg: 'bg-[#62b530]', border: 'border-[#4e9226]', text: 'text-white' },
  SNIPER: { bg: 'bg-[#14bdd2]', border: 'border-[#1098a8]', text: 'text-white' },
  SPLASH: { bg: 'bg-[#c21487]', border: 'border-[#9b106c]', text: 'text-white' },
  FROST:  { bg: 'bg-[#8dbcf0]', border: 'border-[#7196c0]', text: 'text-slate-900' },
  CHAIN:  { bg: 'bg-[#f3c40f]', border: 'border-[#c39d0c]', text: 'text-amber-950' },
  NITRO:  { bg: 'bg-[#8842d0]', border: 'border-[#6d35a6]', text: 'text-white' }
};

export default function BuildMenu({ allowedTowers, credits, activeBuilder, onSelect, bolts, onUseBolt }) {
  const ids = TOWER_ORDER.filter(id => allowedTowers.includes(id));
  const [hoveredTower, setHoveredTower] = useState(null);

  const renderTooltip = (t) => {
    if (!t) return null;
    return (
      <>
        <div className="text-white font-black text-lg flex items-center justify-between mb-1">
          <span>{t.name}</span>
          <span className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
            {t.type === 'BUFF' ? 'Support' : t.type === 'SPLASH' ? 'AoE' : t.type}
          </span>
        </div>
        <div className="text-slate-400 text-[11px] font-bold mb-3 leading-snug">{t.desc}</div>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-widest">
          {t.type !== 'BUFF' && t.base.damage && (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Crosshair className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-300">DMG</span>
              <span className="text-white ml-auto">{t.base.damage}</span>
            </div>
          )}
          {t.base.cooldown && (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-300">SPD</span>
              <span className="text-white ml-auto">{(t.base.cooldown/1000).toFixed(1)}s</span>
            </div>
          )}
          {(t.base.range || t.base.auraRange) && (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Maximize2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-slate-300">RNG</span>
              <span className="text-white ml-auto">{t.base.range || t.base.auraRange}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">TGT</span>
              <span className="text-white ml-auto truncate max-w-[40px] text-right">{t.defaultTargeting || 'ALL'}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <aside className="relative order-3 md:order-none w-full md:w-28 h-auto bg-slate-800 md:border-l-4 border-t-4 md:border-t-0 border-slate-950 flex flex-row md:flex-col p-2 sm:p-3 md:p-4 gap-2 sm:gap-3 flex-shrink-0 z-50 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      {/* Mobile Hover Tooltip */}
      {hoveredTower && (
        <div className="md:hidden absolute bottom-[calc(100%+8px)] left-2 right-2 bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 shadow-2xl flex flex-col z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          {renderTooltip(TOWERS[hoveredTower])}
        </div>
      )}

      {/* Desktop Hover Tooltip */}
      {hoveredTower && (
        <div className="hidden md:flex absolute top-0 right-[calc(100%+16px)] w-64 bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 shadow-2xl flex-col z-[100] pointer-events-none animate-in fade-in slide-in-from-right-2 duration-200">
          {renderTooltip(TOWERS[hoveredTower])}
        </div>
      )}

      {/* Scrollable list of towers */}
      <div className="flex-1 overflow-x-auto md:overflow-visible flex flex-row md:flex-col gap-2 md:gap-3 items-center md:items-stretch custom-scrollbar h-[72px] md:h-auto pb-1 md:pb-0 relative">
        
        {ids.map(id => {
          const t = TOWERS[id];
          if (!t) return null;
          const theme = TOWER_THEME[id];
          const canAfford = credits >= t.cost;
          const isSelected = activeBuilder?.typeId === id;

          let cls;
          if (isSelected) {
            cls = `${theme.bg} ${theme.text} translate-y-1 border-b-0 ring-4 ring-offset-2 ring-offset-slate-800 ring-white`;
          } else if (canAfford) {
            cls = `${theme.bg} border-b-[6px] ${theme.border} ${theme.text} hover:brightness-110 active:border-b-0 active:translate-y-[6px]`;
          } else {
            cls = 'bg-slate-700 border-b-[6px] border-slate-900 text-slate-500 opacity-50 cursor-not-allowed';
          }

          return (
            <button
              key={id}
              onClick={() => canAfford && onSelect({ typeId: id })}
              onMouseEnter={() => setHoveredTower(id)}
              onMouseLeave={() => setHoveredTower(null)}
              disabled={!canAfford}
              className={`group relative h-16 md:h-auto aspect-square md:w-full rounded-2xl transition-all flex flex-col items-center justify-center gap-1 p-2 shrink-0 ${cls}`}
            >
              <TowerVisual typeId={id} size="sm" dimmed={!canAfford} />

              <div className={`flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-lg mt-0.5 text-[10px] font-black tabular-nums bg-black/20 ${!canAfford && 'text-slate-400'}`}>
                <Coins className="w-2.5 h-2.5" strokeWidth={3} />
                {t.cost}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reward Blasts */}
      <div className="flex flex-row md:flex-col items-center justify-center md:border-t-2 border-slate-700 md:pt-4 gap-2 w-auto md:w-full shrink-0 border-l-2 md:border-l-0 pl-3 md:pl-0">
        <div className="hidden md:block text-[9px] font-black uppercase text-slate-400 text-center leading-tight">Reward<br/>Blasts</div>
        <button
          onClick={onUseBolt}
          disabled={bolts === 0}
          title="Ignore Armor! Massive damage to all!"
          className={`h-16 aspect-square md:w-full rounded-2xl flex flex-col items-center justify-center transition-all 
            ${bolts > 0 
              ? 'bg-indigo-500 border-b-[6px] border-indigo-700 active:border-b-0 active:translate-y-[6px] text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:brightness-110' 
              : 'bg-slate-700 border-b-[6px] border-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
        >
          <Zap className={`w-6 h-6 ${bolts > 0 ? 'fill-current animate-pulse' : ''}`} strokeWidth={2.5} />
          <span className="font-black mt-1 text-sm tabular-nums">{bolts}</span>
        </button>
      </div>

    </aside>
  );
}
</file>

<file path="src/components/towerdefense/ExitConfirmModal.jsx">
// src/components/towerdefense/ExitConfirmModal.jsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ExitConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2rem] border-b-8 border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-rose-100 border-b-4 border-rose-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-rose-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Leave the battle?</h2>
          <p className="text-base font-bold text-slate-500 leading-snug">
            Your towers will be lost and your wave progress won't be saved.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-700 font-black transition-all uppercase tracking-widest text-sm"
          >
            Keep Playing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" strokeWidth={3} /> End Run
          </button>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/GameBoard.jsx">
// src/components/towerdefense/GameBoard.jsx
import React, { useMemo, useRef, memo } from 'react';
import { ENEMIES, TOWERS, getEffectiveStats, getNitroBuff } from './gameData';
import { MAP_THEMES } from './themeData';
import TowerVisual, { InsectVisual, DonutBase } from './TowerVisual';
import UpgradeBadges from './UpgradeBadges';

export const CELL_SIZE = 48;

const StaticEnvironment = memo(({ width, height, theme, pathPoints, decorations }) => {
  const fallbackDecos = ['🌳', '🌲', '🍄', '🌿', '🪨'];
  const symbols = theme.decoSymbols || fallbackDecos;

  return (
    <>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
        <defs>
          <pattern id="td-grid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
            <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke={theme.gridStr} strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#td-grid)" />
      </svg>

      {decorations.map(d => (
        <div
          key={`dec_${d.id}`}
          className="absolute pointer-events-none select-none drop-shadow-md z-10"
          style={{
            transform: `translate(${d.col * CELL_SIZE + CELL_SIZE / 2}px, ${d.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)`,
            fontSize: d.variant === 0 || d.variant === 1 ? 28 : 20,
            opacity: d.variant === 4 ? 0.7 : 0.95
          }}
        >
          {symbols[d.variant % symbols.length]}
        </div>
      ))}

      <svg className="absolute inset-0 pointer-events-none z-0 transition-colors duration-500" width={width} height={height}>
        <polyline points={pathPoints} fill="none" stroke={theme.pathOutline} strokeWidth={CELL_SIZE - 4} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={pathPoints} fill="none" stroke={theme.pathCore} strokeWidth={CELL_SIZE - 12} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </>
  );
});

export default function GameBoard({
  layout, towers, creeps, projectiles, floaters, particles, burnZones, decorations,
  lives, maxLives, selectedTowerId, hoveredTowerId, activeBuilder, hoverCell,
  onCellClick, onCellHover, onCellLeave, onTowerClick, themeId = 'STANDARD'
}) {
  const { rows, cols, path } = layout;
  const width = cols * CELL_SIZE;
  const height = rows * CELL_SIZE;
  const theme = MAP_THEMES[themeId] || MAP_THEMES.STANDARD;
  const boardRef = useRef(null);

  const pathCellSet = useMemo(() => {
    const s = new Set();
    for (let i = 0; i < path.length - 1; i++) {
      const [r1, c1] = path[i];
      const [r2, c2] = path[i + 1];
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) s.add(`${r}_${c}`);
      }
    }
    return s;
  }, [path]);

  const pathPoints = useMemo(() =>
    path.map(([r, c]) => `${c * CELL_SIZE + CELL_SIZE / 2},${r * CELL_SIZE + CELL_SIZE / 2}`).join(' ')
  , [path]);

  const handlePointerInteraction = (e, isClick) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const scaleX = rect.width / width;
    const scaleY = rect.height / height;
    
    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;
    
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const isPath = pathCellSet.has(`${row}_${col}`);
      if (isClick) {
        onCellClick(row, col, isPath);
      } else {
        if (hoverCell.row !== row || hoverCell.col !== col) {
          onCellHover(row, col, isPath);
        }
      }
    }
  };

  const rangeTower = towers.find(t => t.id === selectedTowerId) || towers.find(t => t.id === hoveredTowerId);
  const rangeStats = rangeTower ? getEffectiveStats(rangeTower, towers) : null;
  const rangeVal = rangeStats ? (rangeStats.range || rangeStats.auraRange) : 0;

  return (
    <div
      ref={boardRef}
      onMouseMove={(e) => handlePointerInteraction(e, false)}
      onClick={(e) => handlePointerInteraction(e, true)}
      onMouseLeave={onCellLeave}
      className="relative w-full h-full overflow-hidden shadow-2xl cursor-pointer transition-colors duration-500"
      style={{ width, height, backgroundColor: theme.bg }}
    >
      <style>{`
        @keyframes td-pop-in {
          0% { transform: scale(0) translateY(-12px); }
          70% { transform: scale(1.12) translateY(0); }
          100% { transform: scale(1) translateY(0); }
        }
        .td-pop-in { animation: td-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .gpu-accel { will-change: transform; backface-visibility: hidden; }

        .creep-visual * {
          animation-duration: 0.6s !important;
          animation-timing-function: steps(2, end) !important;
        }
      `}</style>

      <StaticEnvironment 
        width={width} height={height} 
        theme={theme} pathPoints={pathPoints} 
        decorations={decorations} 
      />

      <PortalMarker row={path[0][0]} col={path[0][1]} kind="in" />
      <PortalMarker row={path[path.length - 1][0]} col={path[path.length - 1][1]} kind="out" healthPct={lives / maxLives} />

      {burnZones.map(z => (
        <div
          key={z.id}
          className="absolute pointer-events-none rounded-full z-10 gpu-accel bg-rose-500"
          style={{
            transform: `translate(${z.col * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE}px, ${z.row * CELL_SIZE + CELL_SIZE / 2 - z.radius * CELL_SIZE}px)`,
            width: z.radius * 2 * CELL_SIZE, height: z.radius * 2 * CELL_SIZE,
            opacity: Math.min(0.25, z.life / z.maxLife)
          }}
        />
      ))}

      {rangeTower && rangeStats && rangeVal > 0 && (
        <div
          className="absolute pointer-events-none rounded-full border-[3px] border-white z-10 transition-all duration-300"
          style={{
            transform: `translate(${rangeTower.col * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px, ${rangeTower.row * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px)`,
            width: rangeVal * 2 * CELL_SIZE, height: rangeVal * 2 * CELL_SIZE,
            background: 'rgba(255,255,255,0.15)', borderStyle: 'dashed'
          }}
        />
      )}

      {activeBuilder && hoverCell.row >= 0 && (() => {
        const tConf = TOWERS[activeBuilder.typeId];
        if (!tConf) return null;
        const fakeTower = { id: 'temp_builder', typeId: activeBuilder.typeId, row: hoverCell.row, col: hoverCell.col, upgrades: {} };
        const rangeStats = getEffectiveStats(fakeTower, towers);
        const range = rangeStats.range || rangeStats.auraRange || 0;
        return (
          <>
            {range > 0 && (
              <div
                className="absolute pointer-events-none rounded-full border-[3px] z-10 transition-all duration-75"
                style={{
                  transform: `translate(${hoverCell.col * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px)`,
                  width: range * 2 * CELL_SIZE, height: range * 2 * CELL_SIZE,
                  borderStyle: 'dashed',
                  borderColor: hoverCell.valid ? 'rgba(255,255,255,0.9)' : 'rgba(234,43,43,0.9)',
                  background: hoverCell.valid ? 'rgba(255,255,255,0.15)' : 'rgba(234,43,43,0.2)'
                }}
              />
            )}
            <div
              className="absolute pointer-events-none flex items-center justify-center z-10 transition-all duration-75"
              style={{
                transform: `translate(${hoverCell.col * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE}px)`,
                width: CELL_SIZE, height: CELL_SIZE, opacity: hoverCell.valid ? 0.9 : 0.4
              }}
            >
              <TowerVisual typeId={activeBuilder.typeId} size="md" dimmed={!hoverCell.valid} />
            </div>
          </>
        );
      })()}

      {towers.map(t => {
        const isSelected = selectedTowerId === t.id;
        const isHovered = hoveredTowerId === t.id;
        const isBuffed = t.typeId !== 'NITRO' && getNitroBuff(t, towers).rateMul < 1;

        return (
          <div
            key={t.id}
            onClick={(e) => { e.stopPropagation(); onTowerClick(t.id); }}
            className="absolute cursor-pointer z-20"
            style={{ 
               transform: `translate(${t.col * CELL_SIZE}px, ${t.row * CELL_SIZE}px)`, 
               width: CELL_SIZE, height: CELL_SIZE 
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center td-pop-in">
              {isBuffed && <div className="absolute inset-0 scale-125 bg-yellow-400/20 border-2 border-yellow-400/40 rounded-full animate-pulse z-0 pointer-events-none" />}
              <UpgradeBadges upgrades={t.upgrades} />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                 <TowerVisual typeId={t.typeId} size="md" selected={isSelected} hovered={isHovered} upgrades={t.upgrades} />
              </div>
            </div>
          </div>
        );
      })}

      {projectiles.map(p => {
        if (p.kind === 'DART_PROJ') {
          const angleDeg = Math.atan2(p.targetRow - p.row, p.targetCol - p.col) * (180 / Math.PI);
          return (
            <div key={p.id} className="absolute z-30 pointer-events-none gpu-accel" 
                 style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px)` }}>
              <div className="absolute flex items-center justify-center" style={{ width: p.passive ? 24 : 16, height: p.passive ? 24 : 16, transform: `translate(-50%, -50%) rotate(${angleDeg + 90}deg)` }}>
                 <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                    {p.passive ? <polygon points="12,2 18,22 12,18 6,22" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2"/> : <polygon points="12,4 16,20 12,16 8,20" fill="#a855f7" stroke="#4c1d95" strokeWidth="2"/>}
                 </svg>
              </div>
            </div>
          );
        }
        
        if (p.kind === 'SNIPER_PROJ') {
          const angleDeg = Math.atan2(p.targetRow - p.row, p.targetCol - p.col) * (180 / Math.PI);
          return (
            <div key={p.id} className="absolute z-30 pointer-events-none gpu-accel" 
                 style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px)` }}>
               <div className="absolute border border-white/50" style={{ 
                 width: p.passive ? 28 : 20, height: p.passive ? 8 : 4, background: p.passive ? '#f59e0b' : '#10b981', 
                 borderRadius: '4px', transform: `translate(-50%, -50%) rotate(${angleDeg}deg)` 
               }} />
            </div>
          );
        }

        return (
          <div
            key={p.id} className="absolute pointer-events-none z-30 gpu-accel"
            style={{ transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2}px, ${p.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)` }}
          >
            {p.kind === 'CHAIN' ? (
              <svg width={(p.range || 6) * CELL_SIZE * 2} height={(p.range || 6) * CELL_SIZE * 2}
                   className="absolute pointer-events-none"
                   style={{ transform: `translate(${-(p.range || 6) * CELL_SIZE}px, ${-(p.range || 6) * CELL_SIZE}px)` }}>
                {(p.lines || []).map((ln, i) => (
                  <line key={i} x1={(p.range || 6) * CELL_SIZE} y1={(p.range || 6) * CELL_SIZE} x2={(ln.col - p.col) * CELL_SIZE + (p.range || 6) * CELL_SIZE} y2={(ln.row - p.row) * CELL_SIZE + (p.range || 6) * CELL_SIZE} stroke="#FFC800" strokeWidth="4" strokeLinecap="round" opacity={p.life / p.maxLife} />
                ))}
              </svg>
            ) : p.kind === 'LANCE' ? (
              <div
                className="absolute border border-amber-300/50"
                style={{
                  width: p.length * CELL_SIZE, height: 12, borderRadius: 6,
                  background: 'linear-gradient(90deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.8) 40%, rgba(239,68,68,1) 100%)',
                  transform: `translate(0, -6px) rotate(${p.angle}rad)`, transformOrigin: '0 50%',
                  opacity: Math.max(0, p.life / p.maxLife)
                }}
              />
            ) : (
              <div
                className="rounded-full border border-white/50"
                style={{
                  width: p.kind === 'SPLASH' ? 14 : 8, height: p.kind === 'SPLASH' ? 14 : 8,
                  background: p.color || '#fff', transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </div>
        );
      })}

      {particles.map(p => (
        <div
          key={p.id} className="absolute pointer-events-none rounded-full z-30 gpu-accel border border-white/20"
          style={{
            transform: `translate(${p.col * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE}px, ${p.row * CELL_SIZE + CELL_SIZE / 2 - p.radius * CELL_SIZE}px) scale(${1 - p.life / p.maxLife * 0.3})`,
            width: p.radius * 2 * CELL_SIZE, height: p.radius * 2 * CELL_SIZE,
            background: p.color || 'rgba(255,255,255,0.5)', opacity: p.life / p.maxLife,
          }}
        />
      ))}

      {creeps.map(c => {
        const eConf = ENEMIES[c.typeKey];
        if (!eConf) return null;
        const hpPct = Math.max(0, c.hp / c.maxHp);
        const rotationAngle = (c.angle || 0) + 90;

        return (
          <div
            key={c.id} className="absolute pointer-events-none z-20 flex flex-col items-center justify-center gpu-accel"
            style={{ transform: `translate(${c.col * CELL_SIZE + CELL_SIZE / 2}px, ${c.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)` }}
          >
            <div className="absolute -top-4 w-10 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700 z-30">
              <div className="h-full rounded-full" style={{ width: `${hpPct * 100}%`, background: hpPct > 0.5 ? '#58A700' : hpPct > 0.25 ? '#FFC800' : '#EA2B2B' }} />
            </div>
            
            <div
              className="flex items-center justify-center relative creep-visual"
              style={{ 
                width: eConf.radius * 2.5, 
                height: eConf.radius * 2.5, 
                transform: `rotate(${rotationAngle}deg)`,
                filter: c.freezeTimer > 0 ? 'sepia(1) hue-rotate(180deg) saturate(4) brightness(1.2)' : 'none'
              }}
            >
              <InsectVisual type={c.typeKey} />
            </div>

            {c.freezeTimer > 0 && <div className="absolute -top-8 text-xs">❄️</div>}
            {(c.burning > 0 || (c.burnStacks && c.burnStacks.length > 0)) && <div className="absolute -top-8 text-xs">🔥</div>}
            {eConf.damageReduction > 0 && hpPct > 0 && <div className="absolute -bottom-5 text-[10px] bg-slate-800 text-slate-300 font-black px-1 rounded-sm border border-slate-700">🛡️</div>}
          </div>
        );
      })}

      {floaters.map(f => (
        <div
          key={f.id} className={`absolute pointer-events-none font-black text-sm sm:text-base z-40 gpu-accel ${f.colorClass}`}
          style={{
            transform: `translate(${f.col * CELL_SIZE + CELL_SIZE / 2}px, ${f.row * CELL_SIZE + CELL_SIZE / 2 - (1 - f.life / f.maxLife) * 35}px) translate(-50%, -50%)`,
            opacity: f.life / f.maxLife, WebkitTextStroke: '1px rgba(0,0,0,0.8)'
          }}
        >
          {f.text}
        </div>
      ))}
    </div>
  );
}

function PortalMarker({ row, col, kind, healthPct }) {
  const isIn = kind === 'in';
  return (
    <div
      className="absolute pointer-events-none flex items-center justify-center z-10"
      style={{ transform: `translate(${col * CELL_SIZE}px, ${row * CELL_SIZE}px)`, width: CELL_SIZE, height: CELL_SIZE }}
    >
      {isIn ? (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500 fill-current drop-shadow-md animate-pulse" style={{ transform: 'translateX(20%)' }}>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ) : (
        <DonutBase healthPct={healthPct} />
      )}
    </div>
  );
}
</file>

<file path="src/components/towerdefense/gameData.js">
// src/components/towerdefense/gameData.js

// =====================================================================
// Shared definitions for the Tower Defense game.
// Everything lives here so levels stay simple and share the same units.
// =====================================================================

// ---------- Enemies ----------
export const ENEMIES = {
  ANT: {
    name: "Worker Ant",
    color: "bg-red-200", 
    border: "border-red-400",
    hp: 30,
    speed: 1.1,
    reward: 1,
    radius: 12, 
    damageReduction: 0
  },
  WASP: {
    name: "Wasp",
    color: "bg-yellow-300",
    border: "border-yellow-500",
    hp: 70, 
    speed: 1.7,
    reward: 3, 
    radius: 14, 
    damageReduction: 0
  },
  BEETLE: {
    name: "Stag Beetle",
    color: "bg-amber-800",
    border: "border-amber-950",
    hp: 400, 
    speed: 0.6,
    reward: 5, 
    radius: 20, 
    damageReduction: 20 
  },
  QUEEN: {
    name: "Queen Brood",
    color: "bg-purple-600",
    border: "border-purple-800",
    hp: 2500, 
    speed: 0.45,
    reward: 10,
    radius: 28, 
    damageReduction: 30 
  },
  GIANT_ANT: {
    name: "Broodmother",
    color: "bg-red-900",
    border: "border-red-950",
    hp: 5000, 
    speed: 0.75, 
    reward: 15,
    radius: 34, 
    damageReduction: 40 
  }
};

// ---------- Towers ----------
export const TOWERS = {
  DART: {
    id: 'DART',
    name: "Sentry",
    emoji: "🎯",
    cost: 20,
    type: 'SINGLE',
    desc: "Cheap, rapid-fire defender. Deals +2 damage for each adjacent tower.",
    gradient: "from-sky-400 to-sky-600",
    accent: "bg-sky-500",
    ring: "ring-sky-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.2, damage: 9, cooldown: 800 },
    upgrades: {
      rate:    { cost: 30, label: "Rapid Fire", desc: "Fires twice as fast" },
      damage:  { cost: 45, label: "Sharp Tips", desc: "+200% damage" },
      range:   { cost: 25, label: "Eagle Eye",  desc: "+1 range" },
      passive: { cost: 75, label: "Pierce",     desc: "Each shot also hits a 2nd nearby enemy" }
    }
  },

  SNIPER: {
    id: 'SNIPER',
    name: "Marksman",
    emoji: "🔭",
    cost: 50,
    type: 'SINGLE',
    desc: "Long range, heavy damage, ignores armor, slow fire.",
    gradient: "from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    ring: "ring-emerald-400",
    defaultTargeting: 'STRONG',
    base: { range: 6, damage: 65, cooldown: 3800 },
    upgrades: {
      rate:      { cost: 120, label: "Quick Reload",   desc: "Fires 35% faster" },
      damage:    { cost: 110, label: "Heavy Caliber",  desc: "+100% damage" },
      range:     { cost: 60,  label: "Extended Scope", desc: "+2 range" },
      targeting: { cost: 70,  label: "Shatter",        desc: "Targets enemies with highest armor" },
      passive:   { cost: 180, label: "Piercing Lance", desc: "Adds enemy reduction to damage. Shots penetrate hitting all enemies in a short line." }
    }
  },

  SPLASH: {
    id: 'SPLASH',
    name: "Mortar",
    emoji: "💣",
    cost: 100, 
    type: 'SPLASH',
    desc: "Lobs explosives for area damage",
    gradient: "from-rose-400 to-rose-600",
    accent: "bg-rose-500",
    ring: "ring-rose-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.5, damage: 18, splashRadius: 1.5, cooldown: 1600 },
    upgrades: {
      rate:      { cost: 90,  label: "Auto Loader",  desc: "Fires 35% faster" },
      damage:    { cost: 120, label: "Heavy Shells", desc: "+90% damage" },
      range:     { cost: 60,  label: "Long Lob",     desc: "+1 range" },
      targeting: { cost: 80,  label: "Cluster Bomb", desc: "Targets densest enemy group" },
      passive:   { cost: 150, label: "Napalm",       desc: "Applies a stacking burn. Each stack reduces armor by 1." }
    }
  },

  FROST: {
    id: 'FROST',
    name: "Cryo",
    emoji: "❄️",
    cost: 60,
    type: 'FROST',
    desc: "Slows enemies with chilling shots",
    gradient: "from-cyan-300 to-cyan-500",
    accent: "bg-cyan-400",
    ring: "ring-cyan-400",
    defaultTargeting: 'FIRST',
    base: { range: 2.5, damage: 6, slowPercent: 0.45, slowDuration: 1500, cooldown: 1500 },
    upgrades: {
      rate:      { cost: 70,  label: "Frostpulse",    desc: "Fires 35% faster" },
      damage:    { cost: 60,  label: "Permafrost",    desc: "Slow lasts 60% longer" },
      range:     { cost: 50,  label: "Frigid Air",    desc: "+1 range" },
      targeting: { cost: 60,  label: "Fresh Targets", desc: "Prioritizes non-frozen enemies" },
      passive:   { cost: 150, label: "Frost Burst",   desc: "Splash-slows nearby enemies" }
    }
  },

  CHAIN: {
    id: 'CHAIN',
    name: "Tesla",
    emoji: "⚡",
    cost: 140, 
    type: 'CHAIN',
    desc: "Lightning chains between enemies",
    gradient: "from-amber-300 to-amber-500",
    accent: "bg-amber-400",
    ring: "ring-amber-400",
    defaultTargeting: 'FIRST',
    base: { range: 3, damage: 20, bounces: 2, cooldown: 1200 }, 
    upgrades: {
      rate:      { cost: 150, label: "Static Build",   desc: "Fires 35% faster" },
      damage:    { cost: 140, label: "High Voltage",   desc: "+100% damage" },
      range:     { cost: 80,  label: "Conductor",      desc: "+1 range" },
      targeting: { cost: 100, label: "Cluster Strike", desc: "Targets densest cluster" },
      passive:   { cost: 180, label: "Overload",       desc: "+3 chain bounces" }
    }
  },

  NITRO: {
    id: 'NITRO',
    name: "Nitro",
    emoji: "⚙️",
    cost: 250,
    type: 'BUFF',
    desc: "Boosts speed. Buffs do not stack (strongest applies).",
    gradient: "from-yellow-300 to-yellow-500",
    accent: "bg-yellow-400",
    ring: "ring-yellow-400",
    base: { auraRange: 2.0, buff: 0.8 }, 
    upgrades: {
      rate:    { cost: 220, label: "Pure Octane", desc: "Aura makes towers 35% faster" },
      range:   { cost: 150, label: "Eagle Eye Aura",  desc: "Buffed towers gain +1.5 range" },
      passive: { cost: 350, label: "Overcharge",  desc: "Buffed towers also gain +30% damage" }
    }
  }
};

export const TOWER_ORDER = ['DART', 'SNIPER', 'FROST', 'SPLASH', 'CHAIN', 'NITRO'];

// ---------- Stat helpers ----------
// Dynamic calculation now fully accepts allTowers to bake the Adjacency and Buff modifiers directly into the UI
export function getEffectiveStats(tower, allTowers = []) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return null;
  const u = tower.upgrades || {};
  const stats = { ...tConf.base };

  switch (tower.typeId) {
    case 'DART':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.5;
      if (u.damage) stats.damage   = Math.round(stats.damage * 3);
      if (u.range)  stats.range    = stats.range + 1;
      stats.pierce = !!u.passive;
      break;

    case 'SNIPER':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 2);
      if (u.range)  stats.range    = stats.range + 2;
      stats.armorPiercing = !!u.passive;
      break;

    case 'SPLASH':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 1.9);
      if (u.range)  stats.range    = stats.range + 1;
      stats.napalm = !!u.passive;
      break;

    case 'FROST':
      if (u.rate)   stats.cooldown     = stats.cooldown * 0.65;
      if (u.damage) stats.slowDuration = Math.round(stats.slowDuration * 1.6);
      if (u.range)  stats.range        = stats.range + 1;
      stats.frostBurst = !!u.passive;
      break;

    case 'CHAIN':
      if (u.rate)    stats.cooldown = stats.cooldown * 0.65;
      if (u.damage)  stats.damage   = Math.round(stats.damage * 2);
      if (u.range)   stats.range    = stats.range + 1;
      if (u.passive) stats.bounces  = stats.bounces + 3;
      break;

    case 'NITRO':
      if (u.rate)  stats.buff      = Math.max(0.4, stats.buff - 0.15);
      stats.overcharge = !!u.passive;
      stats.rangeBoost = !!u.range;
      break;

    default:
      break;
  }

  // Apply Adjacency & Nitro Buffs automatically if the board state is provided
  if (allTowers.length > 0 && tower.typeId !== 'NITRO') {
    
    // Adjacency for DART
    if (tower.typeId === 'DART') {
      let adj = 0;
      allTowers.forEach(t => {
        if (t.id !== tower.id && Math.hypot(t.row - tower.row, t.col - tower.col) <= 1.5) adj++;
      });
      stats.damage += adj * 2; // Increased to +2
    }

    // Nitro Buffs
    const { rateMul, damageMul, rangeAdd } = getNitroBuff(tower, allTowers);
    if (stats.cooldown) stats.cooldown = stats.cooldown * rateMul;
    if (stats.damage)   stats.damage   = Math.round(stats.damage * damageMul);
    if (stats.range)    stats.range   += rangeAdd;
  }

  return stats;
}

// Highest-value buff a non-Nitro tower receives from Nitro towers in range. Does NOT stack.
export function getNitroBuff(tower, allTowers) {
  if (tower.typeId === 'NITRO') return { rateMul: 1, damageMul: 1, rangeAdd: 0 };
  
  let bestRateMul = 1;
  let bestDamageMul = 1;
  let bestRangeAdd = 0;

  for (const other of allTowers) {
    if (other.typeId !== 'NITRO') continue;
    const tConf = TOWERS['NITRO'];
    const s = tConf.base; 
    const u = other.upgrades || {};
    
    const dist = Math.sqrt(
      Math.pow(other.row - tower.row, 2) + Math.pow(other.col - tower.col, 2)
    );
    
    // Check if within Nitro Aura Range
    if (dist <= s.auraRange) {
      let buff = s.buff;
      if (u.rate) buff = Math.max(0.4, buff - 0.15);
      
      if (buff < bestRateMul) bestRateMul = buff; 
      if (u.passive && bestDamageMul < 1.3) bestDamageMul = 1.3;
      if (u.range && bestRangeAdd < 1.5) bestRangeAdd = 1.5;
    }
  }
  
  return { rateMul: bestRateMul, damageMul: bestDamageMul, rangeAdd: bestRangeAdd };
}

export function getTotalSpent(tower) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return 0;
  let total = tConf.cost;
  for (const key of Object.keys(tower.upgrades || {})) {
    if (tower.upgrades[key] && tConf.upgrades[key]) {
      total += tConf.upgrades[key].cost;
    }
  }
  return total;
}

export function getSellValue(tower) {
  return Math.floor(getTotalSpent(tower) * 0.6);
}
</file>

<file path="src/components/towerdefense/HUD.jsx">
// src/components/towerdefense/HUD.jsx
import React from 'react';
import { Coins, Heart, Play, X, Shield, ShieldCheck, FastForward } from 'lucide-react';

function formatScore(num) {
  if (num >= 10000) return Number((num / 1000).toFixed(1)) + 'k';
  return num;
}

export default function HUD({
  credits, lives, wave, totalWaves, score, bestScore, speed,
  gameState, waveInProgress, autoPlay,
  onStartWave, onToggleAutoPlay, onSetSpeed, onQuit
}) {
  return (
    <header className="relative z-30 bg-slate-800 border-b-4 border-slate-950 flex flex-col md:flex-row items-center px-4 sm:px-6 justify-between flex-shrink-0 shadow-sm py-3 md:py-0 md:h-16 gap-3 md:gap-0">
      
      {/* Top Row / Desktop Left & Right Wraps */}
      <div className="flex w-full md:w-auto items-center justify-between">
        
        {/* Left: Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1CB0F6] border-b-4 border-[#1899D6] mr-2">
            <Shield className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          
          <StatPill icon={<Coins className="w-5 h-5 text-[#FFC800]" />} value={credits} size="lg" />
          <StatPill icon={<Heart className="w-5 h-5 text-[#EA2B2B]" />} value={lives} size="lg" />
          
          <div className="hidden md:flex flex-col ml-2 justify-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Score</div>
            <div className="text-white font-black leading-none text-xl tabular-nums">{formatScore(score)}</div>
          </div>

          {/* Prominent High Score Tag */}
          {bestScore > 0 && (
            <div className="hidden md:flex flex-col ml-3 justify-center items-center px-3 py-1 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-xl border-b-2 border-amber-600 shadow-md transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="text-[9px] font-black text-amber-900 uppercase tracking-widest leading-none">Best</div>
              <div className="text-amber-950 font-black leading-none text-lg tabular-nums drop-shadow-sm">{formatScore(bestScore)}</div>
            </div>
          )}
        </div>

        {/* Mobile-only Speed & Exit (Stays top-right) */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center bg-slate-900 border-b-4 border-slate-950 rounded-2xl p-1 h-10">
            <FastForward className="w-4 h-4 text-slate-500 mx-1.5 hidden sm:block" strokeWidth={3} />
            {[1, 2, 3].map(s => (
              <button
                key={s} onClick={() => onSetSpeed(s)}
                className={`px-2 h-7 text-xs font-black rounded-xl transition-all uppercase ${speed === s ? 'bg-[#1CB0F6] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {s}×
              </button>
            ))}
          </div>

          <button
            onClick={onQuit} title="Exit"
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 active:border-b-0 active:translate-y-[4px] text-white transition-all"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* CENTER: Wave Controls (Stacks underneath main header on mobile) */}
      <div className="flex items-center justify-center w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 gap-2 bg-slate-900 p-1.5 rounded-[1.25rem] border-b-4 border-slate-950 shadow-inner">
        <div className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest tabular-nums border-r-2 border-slate-700">
          Wave {wave}/{totalWaves}
        </div>
        
        {!waveInProgress && gameState === 'PLAYING' ? (
          <button
            onClick={onStartWave}
            className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-[#58A700] hover:bg-[#46a802] text-white font-black uppercase tracking-widest text-xs transition-all shadow-sm"
          >
            <Play className="w-4 h-4 fill-white" strokeWidth={3} /> Next
          </button>
        ) : (
          <div className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-slate-800 text-slate-500 font-black uppercase tracking-widest text-xs border border-slate-700">
            {waveInProgress ? <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> : <ShieldCheck className="w-4 h-4" />}
            {waveInProgress ? 'Live' : 'Clear'}
          </div>
        )}

        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center justify-center h-8 px-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border ${autoPlay ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/30' : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'}`}
          title="Auto-start next wave"
        >
          Auto
        </button>
      </div>

      {/* RIGHT: Desktop Speed & Exit */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-slate-900 border-b-4 border-slate-950 rounded-2xl p-1 h-10">
          <FastForward className="w-4 h-4 text-slate-500 mx-1.5" strokeWidth={3} />
          {[1, 2, 3].map(s => (
            <button
              key={s} onClick={() => onSetSpeed(s)}
              className={`px-3 h-7 text-xs font-black rounded-xl transition-all uppercase ${speed === s ? 'bg-[#1CB0F6] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              {s}×
            </button>
          ))}
        </div>

        <button
          onClick={onQuit} title="Exit"
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 active:border-b-0 active:translate-y-[4px] text-white transition-all"
        >
          <X className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}

function StatPill({ icon, value, size = "md" }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 rounded-2xl bg-slate-900 border-b-[3px] border-slate-950 font-black shadow-inner ${size === 'lg' ? 'h-10 text-base sm:text-lg' : 'h-8 text-sm'}`}>
      {icon}
      <span className="tabular-nums text-white leading-none mt-0.5">{value}</span>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/themeData.js">
// src/components/towerdefense/themeData.js

export const MAP_THEMES = {
  STANDARD: {
    bg: '#58A700',
    gridStr: 'rgba(255,255,255,0.2)',
    pathOutline: '#D97706',
    pathCore: '#F59E0B',
    decoSymbols: ['🌳', '🌲', '🍄', '🌿', '🪨']
  },
  NIGHT: {
    bg: '#1e1b4b',
    gridStr: 'rgba(255,255,255,0.08)',
    pathOutline: '#312e81',
    pathCore: '#4338ca',
    decoSymbols: ['🔮', '🌙', '🦇', '🥀', '🕸️']
  },
  ICE: {
    bg: '#bae6fd',
    gridStr: 'rgba(255,255,255,0.4)',
    pathOutline: '#38bdf8',
    pathCore: '#e0f2fe',
    decoSymbols: ['❄️', '⛄', '🧊', '🌲', '🏔️']
  },
  DESERT: {
    bg: '#d97706',
    gridStr: 'rgba(0,0,0,0.1)',
    pathOutline: '#78350f',
    pathCore: '#f59e0b',
    decoSymbols: ['🌵', '🏜️', '💀', '🦂', '🪨']
  }
};
</file>

<file path="src/components/towerdefense/TowerVisual.jsx">
// src/components/towerdefense/TowerVisual.jsx
import React from 'react';

// ==========================================
// TOWER SVGS WITH PASSIVE MODIFIERS
// ==========================================
const DartHedgehog = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="dart-hedgehog">
      {hasPassive && (
        <g id="mega-spikes">
          <polygon points="100,10 130,50 70,50" fill="#4e342e" />
          <polygon points="40,30 75,75 45,85" fill="#4e342e" />
          <polygon points="160,30 155,85 125,75" fill="#4e342e" />
          <polygon points="20,80 65,110 30,130" fill="#4e342e" />
          <polygon points="180,80 170,130 135,110" fill="#4e342e" />
        </g>
      )}
      <circle cx="100" cy="100" r="65" fill="#8b6351"/>
      <rect x="50" y="55" width="100" height="90" rx="35" fill="#a47d6c"/>
      <rect x="65" y="90" width="70" height="50" rx="25" fill="#edd4c5"/>
      <circle cx="100" cy="100" r="8" fill="#3e2723"/>
      <circle cx="75" cy="80" r="7" fill="#3e2723"/>
      <circle cx="125" cy="80" r="7" fill="#3e2723"/>
      <circle cx="73" cy="78" r="2.5" fill="#ffffff"/>
      <circle cx="123" cy="78" r="2.5" fill="#ffffff"/>
      <path d="M45,60 Q100,75 155,60 L145,40 Q100,60 55,40 Z" fill="#ff3b3b"/>
      <circle cx="100" cy="51" r="5" fill="#ffffff"/>
      <circle cx="100" cy="51" r="2" fill="#ff3b3b"/>
    </g>
  </svg>
);

const SniperOwl = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="sniper-owl">
      <polygon points="50,60 40,25 75,55" fill="#6d4c41"/>
      <polygon points="150,60 160,25 125,55" fill="#6d4c41"/>
      <rect x="45" y="50" width="110" height="95" rx="40" fill="#8d6e63"/>
      <circle cx="75" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="125" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="75" cy="90" r="14" fill="#ffca28"/>
      {hasPassive ? (
        <g id="crosshair-eye">
          <circle cx="125" cy="90" r="18" fill="#111" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="95" y1="90" x2="155" y2="90" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="60" x2="125" y2="120" stroke="#ff3b3b" strokeWidth="4"/>
          <circle cx="125" cy="90" r="4" fill="#ff3b3b" />
        </g>
      ) : (
        <>
          <circle cx="125" cy="90" r="14" fill="#ffca28"/>
          <circle cx="125" cy="90" r="8" fill="#3e2723"/>
          <circle cx="123" cy="87" r="3" fill="#ffffff"/>
        </>
      )}
      <circle cx="75" cy="90" r="8" fill="#3e2723"/>
      <circle cx="73" cy="87" r="3" fill="#ffffff"/>
      <polygon points="90,100 110,100 100,120" fill="#f57f17"/>
      {!hasPassive && (
        <>
          <circle cx="125" cy="90" r="32" fill="none" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="45" x2="125" y2="135" stroke="#ff3b3b" strokeWidth="2.5"/>
          <line x1="80" y1="90" x2="170" y2="90" stroke="#ff3b3b" strokeWidth="2.5"/>
        </>
      )}
    </g>
  </svg>
);

const SplashHippo = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="splash-hippo">
      <rect x="60" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="120" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="50" y="60" width="100" height="85" rx="40" fill="#8a83a4"/>
      <circle cx="60" cy="55" r="14" fill="#8a83a4"/>
      <circle cx="140" cy="55" r="14" fill="#8a83a4"/>
      <rect x="30" y="90" width="140" height="75" rx="37.5" fill="#9c94b3"/>
      <ellipse cx="65" cy="115" rx="9" ry="14" fill="#524a66"/>
      <ellipse cx="135" cy="115" rx="9" ry="14" fill="#524a66"/>
      <rect x="75" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      <rect x="111" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      {hasPassive && (
        <g id="fire-breath">
          <path d="M100,165 Q125,200 100,215 Q75,200 100,165" fill="#ff5722"/>
          <path d="M100,170 Q115,195 100,205 Q85,195 100,170" fill="#ff9800"/>
          <path d="M100,175 Q108,190 100,200 Q92,190 100,175" fill="#ffeb3b"/>
        </g>
      )}
      <circle cx="75" cy="75" r="9" fill="#ffffff"/>
      <circle cx="125" cy="75" r="9" fill="#ffffff"/>
      <circle cx="75" cy="75" r="4" fill="#2c3e50"/>
      <circle cx="125" cy="75" r="4" fill="#2c3e50"/>
      <path d="M50,145 Q100,170 150,145" fill="none" stroke="#8a83a4" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const FrostFox = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="frost-fox">
      {hasPassive && (
        <g id="ice-crown">
           <polygon points="100,-10 115,30 85,30" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="65,10 80,45 50,40" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="135,10 150,40 120,45" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
        </g>
      )}
      <polygon points="55,65 40,20 85,55" fill="#0288d1"/>
      <polygon points="145,65 160,20 115,55" fill="#0288d1"/>
      <polygon points="58,60 48,32 75,55" fill="#b3e5fc"/>
      <polygon points="142,60 152,32 125,55" fill="#b3e5fc"/>
      <path d="M45,60 Q100,40 155,60 L145,120 Q100,160 55,120 Z" fill="#29b6f6"/>
      <path d="M48,95 Q100,75 152,95 L140,125 Q100,155 60,125 Z" fill="#e1f5fe"/>
      <circle cx="100" cy="135" r="7" fill="#01579b"/>
      <circle cx="75" cy="95" r="7" fill="#01579b"/>
      <circle cx="125" cy="95" r="7" fill="#01579b"/>
      <path d="M92,60 L108,76 M108,60 L92,76 M100,53 L100,83 M85,68 L115,68" stroke="#e1f5fe" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const ChainEel = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="chain-eel">
      <polygon points="50,75 25,95 50,115" fill="#ffa000"/>
      <polygon points="150,75 175,95 150,115" fill="#ffa000"/>
      {hasPassive && (
        <g id="lightning-aura" stroke="#ffff00" strokeWidth="4" fill="none" strokeLinejoin="round">
          <polyline points="10,50 30,20 50,40 70,10" />
          <polyline points="190,50 170,20 150,40 130,10" />
          <polyline points="10,150 30,180 50,160 70,190" />
          <polyline points="190,150 170,180 150,160 130,190" />
        </g>
      )}
      <rect x="50" y="50" width="100" height="95" rx="35" fill="#ffca28"/>
      <circle cx="70" cy="85" r="10" fill="#3e2723"/>
      <circle cx="130" cy="85" r="10" fill="#3e2723"/>
      <circle cx="67" cy="82" r="3" fill="#ffffff"/>
      <circle cx="127" cy="82" r="3" fill="#ffffff"/>
      <circle cx="60" cy="110" r="8" fill="#ff6f00"/>
      <circle cx="140" cy="110" r="8" fill="#ff6f00"/>
      <path d="M85,120 Q100,135 115,120" fill="none" stroke="#3e2723" strokeWidth="4" strokeLinecap="round"/>
      <polygon points="105,45 90,65 102,65 95,85 115,60 102,60" fill="#ffffff"/>
    </g>
  </svg>
);

const NitroAlien = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="nitro-alien">
      {hasPassive && (
        <g id="tentacles">
          <path d="M65,70 Q20,90 25,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M60,80 Q10,110 15,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M135,70 Q180,90 175,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M140,80 Q190,110 185,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
      <line x1="85" y1="55" x2="65" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <line x1="115" y1="55" x2="135" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="65" cy="25" r="9" fill="#1de9b6"/>
      <circle cx="135" cy="25" r="9" fill="#1de9b6"/>
      <rect x="50" y="55" width="100" height="85" rx="35" fill="#b39ddb"/>
      <circle cx="70" cy="95" r="12" fill="#311b92"/>
      <circle cx="130" cy="95" r="12" fill="#311b92"/>
      <circle cx="100" cy="75" r="15" fill="#311b92"/>
      <circle cx="70" cy="93" r="4" fill="#ffffff"/>
      <circle cx="130" cy="93" r="4" fill="#ffffff"/>
      <circle cx="100" cy="72" r="5" fill="#ffffff"/>
      <rect x="92" y="115" width="16" height="5" rx="2.5" fill="#311b92"/>
    </g>
  </svg>
);

const VISUALS = {
  DART:   { Blook: DartHedgehog },
  SNIPER: { Blook: SniperOwl },
  SPLASH: { Blook: SplashHippo },
  FROST:  { Blook: FrostFox },
  CHAIN:  { Blook: ChainEel },
  NITRO:  { Blook: NitroAlien }
};

const SIZES = {
  sm: { wrap: 'w-8 h-8' },
  md: { wrap: 'w-12 h-12' },
  lg: { wrap: 'w-16 h-16' },
  xl: { wrap: 'w-20 h-20' }
};

// ==========================================
// CSS Animations defined inline for easy scope
// ==========================================
const InjectStyles = () => (
  <style>{`
    @keyframes td-fast-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes td-leg-l { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
    @keyframes td-leg-r { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
    @keyframes td-wing-flap { 0%, 100% { transform: scaleX(0.8) rotate(-20deg); } 50% { transform: scaleX(0.3) rotate(-5deg); } }
    .td-leg-l { animation: td-leg-l 0.25s ease-in-out infinite; transform-origin: center; }
    .td-leg-r { animation: td-leg-r 0.25s ease-in-out infinite; transform-origin: center; }
    .td-wing-l { animation: td-wing-flap 0.08s ease-in-out infinite; transform-origin: 25px 45px; }
    .td-wing-r { animation: td-wing-flap 0.08s ease-in-out infinite reverse; transform-origin: 75px 45px; }
  `}</style>
);

export default function TowerVisual({ typeId, size = 'md', selected = false, hovered = false, dimmed = false, upgrades = {} }) {
  const conf = VISUALS[typeId];
  if (!conf) return null;
  const { Blook } = conf;
  const s = SIZES[size] || SIZES.md;
  
  // Minor Visual Modifiers based on upgrades
  const hasRate = !!upgrades.rate;
  const hasDamage = !!upgrades.damage;
  const hasRange = !!upgrades.range;
  const hasTargeting = !!upgrades.targeting;
  const hasPassive = !!upgrades.passive;

  const baseScale = hasRange ? 1.25 : 1; 
  const finalScale = selected ? baseScale + 0.1 : hovered ? baseScale + 0.05 : baseScale;
  const transformY = selected ? '-4px' : hovered ? '-2px' : '0px';

  return (
    <div 
      className={`relative ${s.wrap} flex items-center justify-center transition-all duration-300 ${dimmed ? 'opacity-50 grayscale' : ''}`}
      style={{ transform: `scale(${finalScale}) translateY(${transformY})` }}
    >
      <InjectStyles />
      
      {/* TARGETING AURA: Faint white glow */}
      {hasTargeting && (
        <div className="absolute inset-[-10%] rounded-full bg-white/20 blur-md z-0 pointer-events-none" />
      )}

      {/* Ground shadow block */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-2.5 rounded-full blur-[3px] bg-black/40 z-0" />
      
      {/* Container tracking rate of fire speed changes */}
      <div 
        className={`relative w-full h-full z-10 
          ${selected ? 'drop-shadow-xl' : 'drop-shadow-md'}
          ${hasRate ? 'animate-[td-fast-bob_0.6s_ease-in-out_infinite]' : ''}
        `}
        style={hasDamage ? { filter: 'saturate(1.8) contrast(1.2)' } : {}}
      >
        <Blook className="w-full h-full" hasPassive={hasPassive} />
      </div>

    </div>
  );
}

// ==========================================
// INSECT SVG COMPONENTS FOR ENEMIES
// ==========================================
export const InsectVisual = ({ type }) => {
  switch (type) {
    case 'ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l"><path d="M50,50 L20,30" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L20,50" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M50,50 L20,70" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L80,30" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M50,50 L80,50" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,50 L80,70" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <circle cx="50" cy="25" r="12" fill="#d81b60" /> 
          <circle cx="50" cy="50" r="10" fill="#c2185b" /> 
          <ellipse cx="50" cy="80" rx="14" ry="18" fill="#880e4f" />
          <path d="M45,15 L35,5 M55,15 L65,5" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case 'WASP':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse className="td-wing-l" cx="25" cy="45" rx="20" ry="10" fill="#e0f7fa" opacity="0.8" />
          <ellipse className="td-wing-r" cx="75" cy="45" rx="20" ry="10" fill="#e0f7fa" opacity="0.8" />
          <circle cx="50" cy="25" r="10" fill="#fbc02d" />
          <circle cx="50" cy="45" r="12" fill="#212121" />
          <ellipse cx="50" cy="75" rx="14" ry="22" fill="#fbc02d" />
          <path d="M38,70 Q50,75 62,70 M36,80 Q50,85 64,80" stroke="#212121" strokeWidth="5" fill="none" />
          <polygon points="48,95 52,95 50,110" fill="#212121" />
        </svg>
      );
    case 'BEETLE':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L15,35" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L10,55" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L15,75" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L85,35" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M50,50 L90,55" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M50,50 L85,75" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <path d="M40,25 C30,10 20,15 25,5" stroke="#3e2723" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M60,25 C70,10 80,15 75,5" stroke="#3e2723" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="50" cy="25" r="12" fill="#4e342e" />
          <ellipse cx="50" cy="60" rx="25" ry="35" fill="#5d4037" />
          <line x1="50" y1="25" x2="50" y2="95" stroke="#3e2723" strokeWidth="3" />
        </svg>
      );
    case 'QUEEN':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(156,39,176,0.6)]">
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L10,10" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L5,30" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L5,50" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L10,70" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L90,10" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L95,30" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M50,40 L95,50" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M50,40 L90,70" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <ellipse cx="50" cy="70" rx="35" ry="25" fill="#7b1fa2" />
          <circle cx="50" cy="40" r="16" fill="#6a1b9a" />
          <circle cx="50" cy="20" r="12" fill="#4a148c" />
          <circle cx="45" cy="18" r="3" fill="#69f0ae" />
          <circle cx="55" cy="18" r="3" fill="#69f0ae" />
          <circle cx="40" cy="15" r="2" fill="#69f0ae" />
          <circle cx="60" cy="15" r="2" fill="#69f0ae" />
          <circle cx="35" cy="70" r="4" fill="#ea80fc" opacity="0.6"/>
          <circle cx="50" cy="80" r="5" fill="#ea80fc" opacity="0.6"/>
          <circle cx="65" cy="65" r="3" fill="#ea80fc" opacity="0.6"/>
        </svg>
      );
    case 'GIANT_ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(185,28,28,0.7)]">
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L5,25" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L5,50" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L5,75" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L95,25" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M50,50 L95,50" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M50,50 L95,75" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          
          {/* Main Body */}
          <ellipse cx="50" cy="75" rx="26" ry="32" fill="#7f1d1d" />
          <circle cx="50" cy="40" r="16" fill="#991b1b" />
          <circle cx="50" cy="18" r="14" fill="#b91c1c" />
          <path d="M40,5 L20,-5 M60,5 L80,-5" stroke="#450a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="43" cy="14" r="4" fill="#fca5a5" />
          <circle cx="57" cy="14" r="4" fill="#fca5a5" />
        </svg>
      );
    default:
      return null;
  }
};

// ==========================================
// OVERSIZED DONUT HEALTH TRACKER
// ==========================================
export const DonutBase = ({ healthPct, isHit }) => (
  <div className={`relative transition-all duration-100 ${isHit ? 'scale-125 drop-shadow-[0_0_20px_rgba(234,43,43,1)]' : 'scale-[1.75] drop-shadow-xl'}`}>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <circle cx="50" cy="50" r="40" fill="#fca5a5" />
      <circle cx="50" cy="50" r="35" fill="#fbcfe8" />
      <circle cx="50" cy="50" r="12" fill="#58A700" /> 
      
      <line x1="30" y1="30" x2="35" y2="25" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="30" x2="65" y2="35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="70" x2="35" y2="65" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="70" x2="75" y2="75" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

      {healthPct < 0.2 && (
        <circle cx="85" cy="25" r="24" fill="#58A700" />
      )}
    </svg>
  </div>
);
</file>

<file path="src/components/towerdefense/UpgradeBadges.jsx">
import React from 'react';
import { Gauge, Swords, Maximize2, Target, Sparkles } from 'lucide-react';

const ICONS = {
  rate:      { Icon: Gauge,      bg: 'bg-sky-500'    },
  damage:    { Icon: Swords,     bg: 'bg-rose-500'   },
  range:     { Icon: Maximize2,  bg: 'bg-violet-500' },
  targeting: { Icon: Target,     bg: 'bg-orange-500' },
  passive:   { Icon: Sparkles,   bg: 'bg-amber-400'  }
};

const ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];

export default function UpgradeBadges({ upgrades }) {
  const owned = ORDER.filter(k => upgrades?.[k]);
  if (owned.length === 0) return null;

  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex -space-x-1 pointer-events-none z-10">
      {owned.map((key, i) => {
        const { Icon, bg } = ICONS[key];
        return (
          <div
            key={key}
            className={`w-4 h-4 rounded-full ${bg} border-2 border-white shadow-md flex items-center justify-center`}
            style={{ zIndex: 10 + i }}
          >
            <Icon className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
        );
      })}
    </div>
  );
}
</file>

<file path="src/components/towerdefense/UpgradePanel.jsx">
// src/components/towerdefense/UpgradePanel.jsx
import React from 'react';
import {
  Coins, Gauge, Swords, Maximize2, Target, Sparkles,
  Trash2, Check, Lock, X, ShieldAlert
} from 'lucide-react';
import { TOWERS, getEffectiveStats, getSellValue } from './gameData';
import TowerVisual from './TowerVisual';

const UPGRADE_ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];
const UPGRADE_ICONS = {
  rate:      Gauge,
  damage:    Swords,
  range:     Maximize2,
  targeting: Target,
  passive:   Sparkles
};

export default function UpgradePanel({ tower, towers, credits, onUpgrade, onSell, onClose }) {
  if (!tower) {
    return (
      <aside className="hidden md:flex order-2 md:order-none w-80 bg-slate-800 border-l-4 border-slate-950 flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 text-slate-500">
          <div className="text-lg font-black text-slate-300 mb-2">No tower selected</div>
          <div className="text-sm font-bold leading-relaxed">Tap any tower on the board to view upgrades.</div>
        </div>
      </aside>
    );
  }

  const tConf = TOWERS[tower.typeId];
  // Calculate fully derived stats directly from the board state
  const stats = getEffectiveStats(tower, towers);
  const sellValue = getSellValue(tower);
  const upgrades = tower.upgrades || {};

  return (
    <aside className="order-2 md:order-none flex w-full md:w-80 h-auto md:h-full bg-slate-800 md:border-l-4 border-b-4 md:border-b-0 border-slate-950 flex-col md:flex-col flex-shrink-0 z-20 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      <div className="flex flex-row md:flex-col">
        {/* Name/Icon Card */}
        <div className={`relative ${tConf.accent} p-3 md:p-6 flex items-center md:border-b-4 border-slate-900 w-48 md:w-full shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all border-b-2 border-black/40 active:border-b-0 active:translate-y-[2px] z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center border-b-4 border-black/20 shadow-sm shrink-0">
              <TowerVisual typeId={tower.typeId} size="md" upgrades={upgrades} />
            </div>
            <div className="min-w-0 pr-6 md:pr-0">
              <div className="text-lg md:text-2xl font-black text-white leading-tight drop-shadow-sm truncate">{tConf.name}</div>
              <div className="text-[9px] md:text-[11px] font-bold text-white/90 leading-tight mt-0.5 line-clamp-2">{tConf.desc}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Live Stats Strip */}
        <div className="hidden sm:flex md:flex px-4 py-2 md:py-4 bg-slate-900 md:border-b-2 border-l-2 md:border-l-0 border-slate-700 flex-wrap gap-2 md:gap-4 text-xs font-black shadow-inner items-center shrink-0">
          {tConf.type === 'BUFF' ? (
            <>
              <Stat label="AURA" value={stats.auraRange} modified={stats.auraRange !== tConf.base.auraRange} />
              <Stat label="BOOST" value={`+${Math.round((1 - stats.buff) * 100)}%`} modified={stats.buff !== tConf.base.buff} />
              {stats.rangeBoost && <Stat label="RNG" value="+1.5" modified={true} />}
              {stats.overcharge && <Stat label="DMG" value="+30%" modified={true} />}
            </>
          ) : (
            <>
              {stats.damage != null && <Stat label="DMG" value={stats.damage} modified={stats.damage !== tConf.base.damage} />}
              <Stat label="RNG" value={stats.range} modified={stats.range !== tConf.base.range} />
              <Stat label="CD"  value={`${(stats.cooldown / 1000).toFixed(1)}s`} modified={stats.cooldown !== tConf.base.cooldown} />
              {stats.pierce && <Stat label="PIERCE" value="YES" modified={true} />}
              {stats.armorPiercing && <Stat label="ARMOR PEN" value="YES" modified={true} />}
              {stats.napalm && <Stat label="NAPALM" value="YES" modified={true} />}
              {stats.frostBurst && <Stat label="BURST" value="YES" modified={true} />}
              {stats.bounces != null && <Stat label="CHAIN" value={stats.bounces} modified={stats.bounces !== tConf.base.bounces} />}
            </>
          )}
        </div>
      </div>

      {/* Upgrades Scrolling Container */}
      <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-3 custom-scrollbar bg-slate-800 border-t-2 md:border-t-0 border-slate-700">
        {UPGRADE_ORDER.map(key => {
          const upg = tConf.upgrades[key];
          if (!upg) return null;
          
          const ownedByMe = !!upgrades[key];
          const canAfford = credits >= upg.cost;
          const Icon = UPGRADE_ICONS[key];
          const isPassive = key === 'passive';
          
          const globalPassiveOwned = towers.some(t => t.typeId === tower.typeId && t.upgrades?.passive);
          const uniqueLocked = isPassive && tower.typeId !== 'DART' && globalPassiveOwned && !ownedByMe;

          let cls;
          if (ownedByMe) {
            cls = 'bg-[#58A700] border-b-[4px] border-[#46a802] text-white';
          } else if (uniqueLocked) {
            cls = 'bg-slate-800 border-b-[4px] border-slate-900 opacity-60 cursor-not-allowed text-slate-400 grayscale';
          } else if (!canAfford) {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 opacity-50 cursor-not-allowed text-slate-300';
          } else {
            cls = 'bg-slate-700 border-b-[4px] border-slate-900 hover:bg-slate-600 active:translate-y-[4px] active:border-b-0 cursor-pointer text-slate-100';
          }

          return (
            <button
              key={key}
              onClick={() => !ownedByMe && canAfford && !uniqueLocked && onUpgrade(key)}
              disabled={ownedByMe || !canAfford || uniqueLocked}
              className={`w-64 md:w-full flex-shrink-0 text-left rounded-2xl p-3 md:p-4 transition-all ${cls} relative`}
            >
              <div className="flex items-center gap-3 h-full">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner
                  ${ownedByMe ? 'bg-white/20' : uniqueLocked ? 'bg-slate-900' : 'bg-slate-800 border border-slate-600'}`}>
                  {ownedByMe 
                    ? <Check className="w-5 h-5 text-white" strokeWidth={4} />
                    : uniqueLocked
                      ? <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-slate-500" strokeWidth={2.5} />
                      : <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[13px] md:text-sm font-black leading-tight truncate drop-shadow-sm flex items-center gap-2">
                    {upg.label}
                    {isPassive && !uniqueLocked && !ownedByMe && tower.typeId !== 'DART' && <span className="text-[8px] bg-[#FFC800] text-amber-950 px-1.5 py-0.5 rounded uppercase tracking-widest">Unique</span>}
                  </div>
                  <div className={`text-[10px] md:text-[11px] font-bold mt-0.5 md:mt-1 line-clamp-2 ${ownedByMe ? 'text-green-100' : uniqueLocked ? 'text-slate-500' : 'text-slate-400'}`}>
                    {uniqueLocked ? "Owned by another tower" : upg.desc}
                  </div>
                </div>
                {!ownedByMe && !uniqueLocked && (
                  <div className={`flex flex-col items-center justify-center px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-[10px] md:text-xs font-black flex-shrink-0 bg-slate-900 shadow-inner
                    ${canAfford ? 'text-[#FFC800]' : 'text-slate-500'}`}>
                    {canAfford ? <Coins className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} /> : <Lock className="w-3 h-3 md:w-4 md:h-4 mb-0.5" strokeWidth={3} />}
                    {upg.cost}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-2 md:p-4 border-t-2 border-slate-700 bg-slate-900 flex-shrink-0 w-auto">
        <button
          onClick={onSell}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-4 rounded-xl md:rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 text-white font-black text-xs md:text-sm uppercase tracking-wider transition-all active:scale-95 active:translate-y-[4px] active:border-b-0 shadow-sm"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
          Sell
          <span className="flex items-center gap-1 text-[#FFC800] bg-black/20 px-2 py-0.5 rounded-lg ml-1">
            <Coins className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
            {sellValue}
          </span>
        </button>
      </div>
    </aside>
  );
}

function Stat({ label, value, modified }) {
  return (
    <div className={`flex flex-col gap-0.5 px-2 py-1 md:px-3 md:py-1.5 rounded-xl border shadow-inner min-w-[50px] transition-colors ${modified ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800 border-slate-700'}`}>
      <span className={`text-[8px] md:text-[9px] tracking-widest leading-none ${modified ? 'text-indigo-300' : 'text-slate-400'}`}>{label}</span>
      <span className={`text-xs md:text-sm leading-none font-black ${modified ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-white'}`}>{value}</span>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/useGameEngine.js">
// src/components/towerdefense/useGameEngine.js
import { useEffect } from 'react';
import { TOWERS, ENEMIES, getEffectiveStats } from './gameData';

const TILE_SPEED = 2.0;

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

export function useGameEngine({ 
  gRef, render, layout, engineConfig, 
  onTriggerChallenge, challengeActiveRef, autoPlayRef 
}) {

  useEffect(() => {
    let raf;
    let last = performance.now();
    
    // STRICT FIXED TIMESTEP (30 FPS)
    const FPS_CAP = 30;
    const fpsInterval = 1000 / FPS_CAP;
    const FIXED_DT = fpsInterval;

    const g = gRef.current;
    const newId = () => g.nextId++;

    function distAlong(c) {
      if (c.waypointIdx >= layout.path.length - 1) return Infinity;
      const [pr, pc] = layout.path[c.waypointIdx];
      const [tr, tc] = layout.path[c.waypointIdx + 1];
      const total = Math.hypot(tr - pr, tc - pc);
      const rem = Math.hypot(tr - c.row, tc - c.col);
      return c.waypointIdx + (1 - rem / total);
    }

    function moveCreep(c, dt) {
      let slowMul = 1;
      if (c.freezeTimer > 0) { slowMul = 1 - c.slowPercent; c.freezeTimer -= dt; }
      let dist = c.speed * slowMul * (dt / 1000) * TILE_SPEED;
      
      while (dist > 0 && c.waypointIdx < layout.path.length - 1) {
        const [tr, tc] = layout.path[c.waypointIdx + 1];
        const dr = tr - c.row, dc = tc - c.col;
        c.angle = Math.atan2(dr, dc) * (180 / Math.PI);
        
        const d = Math.hypot(dr, dc);
        if (d <= dist) { 
          c.row = tr; c.col = tc; c.waypointIdx++; dist -= d; 
        } else { 
          c.row += (dr / d) * dist; c.col += (dc / d) * dist; dist = 0; 
        }
      }
      if (c.waypointIdx >= layout.path.length - 1) c.reachedEnd = true;
    }

    function towerTargetingMode(tower) {
      const conf = TOWERS[tower.typeId];
      if (tower.upgrades?.targeting) {
        if (tower.typeId === 'SNIPER') return 'ARMOR';
        if (tower.typeId === 'SPLASH') return 'DENSEST';
        if (tower.typeId === 'CHAIN')  return 'DENSEST';
        if (tower.typeId === 'FROST')  return 'FRESH';
      }
      return conf.defaultTargeting || 'FIRST';
    }

    function findTarget(tower, mode, stats) {
      const range = stats.range;
      const pool = g.creeps.filter(c =>
        c.hp > 0 && !c.reachedEnd && Math.hypot(c.row - tower.row, c.col - tower.col) <= range
      );
      if (pool.length === 0) return null;
      if (mode === 'STRONG') return pool.reduce((a, b) => a.hp > b.hp ? a : b);
      if (mode === 'LOWEST') return pool.reduce((a, b) => a.hp < b.hp ? a : b);
      if (mode === 'ARMOR') return pool.reduce((a, b) => (a.damageReduction || 0) >= (b.damageReduction || 0) ? a : b);
      if (mode === 'FRESH') {
        const fresh = pool.filter(c => c.freezeTimer <= 0);
        const arr = fresh.length ? fresh : pool;
        return arr.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
      }
      if (mode === 'DENSEST') {
        let best = pool[0], bestN = -1;
        for (const c of pool) {
          const n = g.creeps.reduce((acc, x) => acc + (Math.hypot(x.row - c.row, x.col - c.col) < 1.8 ? 1 : 0), 0);
          if (n > bestN) { bestN = n; best = c; }
        }
        return best;
      }
      return pool.reduce((a, b) => distAlong(a) > distAlong(b) ? a : b);
    }

    function damageCreep(c, dmg, ignoreArmor = false, flatArmorPen = 0) {
      if (c.hp <= 0) return;
      const shred = c.activeArmorShred || 0;
      const currentArmor = Math.max(0, (c.damageReduction || 0) - shred);
      const reduction = ignoreArmor ? 0 : Math.max(0, currentArmor - flatArmorPen);
      const actualDmg = Math.max(1, dmg - reduction);
      const d = Math.round(actualDmg);
      
      c.hp -= d;
      
      if (d > 0) {
        g.floaters.push({
          id: newId(), text: `-${d}`, row: c.row, col: c.col,
          colorClass: 'text-white font-black', life: 500, maxLife: 500
        });
      }
      if (c.hp <= 0) {
        const conf = ENEMIES[c.typeKey];
        let reward = conf.reward;
        if (g.wave >= 51) reward = Math.floor(reward / 4);
        g.credits += reward;
        g.score += conf.reward * 10;
        
        g.particles.push({
          id: newId(), row: c.row, col: c.col, radius: 0.6,
          color: 'rgba(255,200,0,0.55)', life: 400, maxLife: 400
        });
        if (reward > 0) {
          g.floaters.push({
            id: newId(), text: `+$${reward}`, row: c.row, col: c.col - 0.4,
            colorClass: 'text-[#FFC800] font-black', life: 700, maxLife: 700
          });
        }
      }
    }

    function spawnCreep(typeKey) {
      const conf = ENEMIES[typeKey];
      const [sr, sc] = layout.path[0];
      const [nr, nc] = layout.path.length > 1 ? layout.path[1] : [sr, sc];
      const initAngle = Math.atan2(nr - sr, nc - sc) * (180 / Math.PI);
      
      g.creeps.push({
        id: newId(), typeKey, row: sr, col: sc,
        hp: conf.hp, maxHp: conf.hp, speed: conf.speed, waypointIdx: 0, angle: initAngle,
        freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0, damageReduction: conf.damageReduction || 0,
        burnStacks: [], spawnTimer: typeKey === 'GIANT_ANT' ? 2000 : 0
      });
    }

    function fireTower(tower, logicDt) {
      const conf = TOWERS[tower.typeId];
      if (conf.type === 'BUFF') return;
      const id = tower.id;
      g.fireCooldowns[id] = (g.fireCooldowns[id] || 0) - logicDt;
      if (g.fireCooldowns[id] > 0) return;

      const stats = getEffectiveStats(tower, g.towers);
      const target = findTarget(tower, towerTargetingMode(tower), stats);
      if (!target) return;

      g.fireCooldowns[id] = stats.cooldown;
      let damage = stats.damage || 0;
      const color = PROJ_COLOR[tower.typeId];

      if (tower.typeId === 'DART') {
        damageCreep(target, damage);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && Math.hypot(c.row - target.row, c.col - target.col) < 1.6);
          if (second) damageCreep(second, damage);
        }
        
        g.projectiles.push({
          id: newId(), kind: 'DART_PROJ', passive: stats.pierce,
          row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col,
          speed: 18, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'CHAIN') {
        const hit = [target];
        let last = target;
        for (let i = 0; i < stats.bounces; i++) {
          const next = g.creeps
            .filter(c => c.hp > 0 && !hit.includes(c) && Math.hypot(c.row - last.row, c.col - last.col) < 2.5)
            .sort((a, b) => Math.hypot(a.row - last.row, a.col - last.col) - Math.hypot(b.row - last.row, b.col - last.col))[0];
          if (!next) break;
          hit.push(next); last = next;
        }
        g.projectiles.push({
          id: newId(), kind: 'CHAIN', row: tower.row, col: tower.col,
          range: stats.range, lines: hit.map(c => ({ row: c.row, col: c.col })), life: 220, maxLife: 220
        });
        hit.forEach(c => damageCreep(c, damage));
        
      } else if (tower.typeId === 'SPLASH') {
        g.projectiles.push({
          id: newId(), kind: 'SPLASH', color, row: tower.row, col: tower.col,
          targetRow: target.row, targetCol: target.col, damage, splashRadius: stats.splashRadius, napalm: stats.napalm,
          speed: 7, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'SNIPER') {
        let ignoreArmor = true;
        let finalDamage = damage;
        
        if (stats.armorPiercing) { 
          finalDamage = Math.round(damage + (target.damageReduction || 0));
          const angle = Math.atan2(target.row - tower.row, target.col - tower.col);
          const lanceLength = 4.0; 
          
          const ux = Math.cos(angle);
          const uy = Math.sin(angle);
          const distToT = Math.hypot(target.col - tower.col, target.row - tower.row);
          
          g.creeps.forEach(c => {
             if (c === target || c.hp <= 0) return;
             const vx = c.col - tower.col;
             const vy = c.row - tower.row;
             const proj = vx * ux + vy * uy; 
             
             if (proj > distToT && proj <= distToT + lanceLength) {
                 const perp = Math.abs(vx * uy - vy * ux); 
                 if (perp < 0.8) {
                     damageCreep(c, finalDamage, true, 0);
                 }
             }
          });
          
          g.projectiles.push({
             id: newId(), kind: 'LANCE', color: '#f59e0b',
             row: tower.row, col: tower.col, angle, length: distToT + lanceLength,
             life: 250, maxLife: 250
          });
        }
        
        damageCreep(target, finalDamage, ignoreArmor, 0);
        g.projectiles.push({
          id: newId(), kind: 'SNIPER_PROJ', passive: stats.armorPiercing,
          row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, 
          speed: 30, life: 9999, maxLife: 9999
        });
        
      } else if (tower.typeId === 'FROST') {
        target.freezeTimer = stats.slowDuration;
        target.slowPercent = stats.slowPercent;
        damageCreep(target, damage);
        if (stats.frostBurst) {
          g.creeps.forEach(c => {
            if (c === target || c.hp <= 0) return;
            if (Math.hypot(c.row - target.row, c.col - target.col) < 1.6) {
              c.freezeTimer = Math.max(c.freezeTimer, stats.slowDuration * 0.6);
              c.slowPercent = stats.slowPercent;
            }
          });
        }
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color, row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, speed: 14, life: 9999, maxLife: 9999
        });
        
      } else {
        damageCreep(target, damage);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && Math.hypot(c.row - target.row, c.col - target.col) < 1.6);
          if (second) damageCreep(second, damage);
        }
        g.projectiles.push({
          id: newId(), kind: 'BULLET', color, row: tower.row, col: tower.col, targetRow: target.row, targetCol: target.col, speed: 16, life: 9999, maxLife: 9999
        });
      }
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      
      const elapsed = now - last;
      if (elapsed < fpsInterval) return;
      if (elapsed > 1000) {
          last = now;
          return;
      }

      last = now - (elapsed % fpsInterval);
      
      if (g.gameState !== 'PLAYING') { render(); return; }
      const dt = FIXED_DT * g.speed;

      // ==========================================
      // OVERHAULED SIMULTANEOUS SPAWN LOGIC
      // ==========================================
      if (g.waveInProgress && g.spawnQueue.length > 0) {
        // We iterate backwards so we can safely splice empty groups out of the queue
        for (let i = g.spawnQueue.length - 1; i >= 0; i--) {
          const group = g.spawnQueue[i];
          
          // Initialize an independent timer for this enemy group if it doesn't have one yet.
          if (group.timer === undefined) {
            // Setting it to 'interval' forces an immediate spawn on frame 1.
            // Subtracting (i * 200) slightly staggers the groups so 4 enemies don't perfectly overlap on the exact same pixel.
            // Subtracting 'delay' allows you to hold back certain spawns natively in wavePresets.js if you ever want to.
            group.timer = group.interval - (i * 200) - (group.delay || 0);
          }
          
          group.timer += dt;
          
          if (group.timer >= group.interval) {
            spawnCreep(group.type);
            group.count--;
            group.timer = 0;
            
            // If this specific enemy group is exhausted, remove it from the active queue
            if (group.count <= 0) {
              g.spawnQueue.splice(i, 1);
            }
          }
        }
      }

      g.creeps.forEach(c => {
        if (c.hp <= 0) return;
        moveCreep(c, dt);

        if (c.typeKey === 'GIANT_ANT') {
          c.spawnTimer = (c.spawnTimer || 0) - dt;
          if (c.spawnTimer <= 0 && !c.reachedEnd) {
            c.spawnTimer = 2000; 
            for(let i=0; i<6; i++) {
              const rOff = (Math.random() - 0.5) * 0.5;
              const cOff = (Math.random() - 0.5) * 0.5;
              g.creeps.push({
                id: newId(), typeKey: 'ANT', row: c.row + rOff, col: c.col + cOff,
                hp: ENEMIES.ANT.hp, maxHp: ENEMIES.ANT.hp, speed: ENEMIES.ANT.speed * 1.15,
                waypointIdx: c.waypointIdx, angle: c.angle,
                freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0, damageReduction: 0,
                burnStacks: [], spawnTimer: 0
              });
            }
            g.particles.push({ id: newId(), row: c.row, col: c.col, radius: 1.2, color: 'rgba(185,28,28,0.6)', life: 300, maxLife: 300 });
          }
        }

        if (c.burnStacks && c.burnStacks.length > 0) {
          let activeStacks = 0;
          for (let i = c.burnStacks.length - 1; i >= 0; i--) {
            let b = c.burnStacks[i];
            b.life -= dt; b.tick -= dt;
            if (b.tick <= 0) { damageCreep(c, 8); b.tick = 400; }
            if (b.life > 0) activeStacks++;
            else c.burnStacks.splice(i, 1);
          }
          c.activeArmorShred = activeStacks;
        } else {
          c.activeArmorShred = 0;
        }

        if (c.burning > 0) {
          c.burning -= dt; c.burnTick -= dt;
          if (c.burnTick <= 0) { damageCreep(c, 8); c.burnTick = 400; }
        }
      });

      g.creeps.forEach(c => { if (c.reachedEnd) { g.lives -= 1; c.hp = -1; } });
      g.creeps = g.creeps.filter(c => c.hp > 0 && !c.reachedEnd);

      g.towers.forEach(t => fireTower(t, dt));

      g.projectiles.forEach(p => {
        p.life -= dt;
        if (p.kind === 'BULLET' || p.kind === 'SPLASH' || p.kind === 'DART_PROJ' || p.kind === 'SNIPER_PROJ') {
          const dr = p.targetRow - p.row;
          const dc = p.targetCol - p.col;
          const d = Math.hypot(dr, dc);
          const step = (p.speed || 12) * (dt / 1000);
          
          if (d <= step) {
            if (p.kind === 'SPLASH') {
              g.creeps.forEach(c => {
                if (Math.hypot(c.row - p.targetRow, c.col - p.targetCol) <= p.splashRadius) {
                    damageCreep(c, p.damage);
                    if (p.napalm) {
                        if (!c.burnStacks) c.burnStacks = [];
                        c.burnStacks.push({ life: 4000, tick: 400 });
                    }
                }
              });
              g.particles.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius, color: 'rgba(234,43,43,0.6)', life: 320, maxLife: 320 });
              if (p.napalm) g.burnZones.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius * 0.7, life: 4000, maxLife: 4000 });
            }
            p.life = 0;
          } else {
            p.row += (dr / d) * step; p.col += (dc / d) * step;
          }
        }
      });
      g.projectiles = g.projectiles.filter(p => p.life > 0);
      g.floaters = g.floaters.filter(f => (f.life -= dt) > 0);
      g.particles = g.particles.filter(p => (p.life -= dt) > 0);
      g.burnZones = g.burnZones.filter(z => (z.life -= dt) > 0);

      if (g.waveInProgress && g.spawnQueue.length === 0 && g.creeps.length === 0) {
        g.waveInProgress = false;
        g.credits += 50;
        g.score += 100;
        
        if (!engineConfig.generateInfiniteWave && g.wave >= engineConfig.waves.length) {
          g.gameState = 'WON';
        } else {
          g.autoPlayDelay = 1500;
        }
      }

      if (!g.waveInProgress && g.gameState === 'PLAYING' && autoPlayRef.current) {
        g.autoPlayDelay -= dt;
        if (g.autoPlayDelay <= 0) { g.autoPlayDelay = 9999; g.triggerNextWave = true; }
      }

      if (g.lives <= 0) { g.lives = 0; g.gameState = 'LOST'; }

      if (g.waveInProgress && g.wave >= 5) {
        g.challengeTimer -= dt;
        if (g.wave === 5 && !g.wave5ChallengeSpawned) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.wave5ChallengeSpawned = true; 
            g.challengeTimer = 90000 + Math.random() * 30000; 
          }
        } else if (g.wave > 5) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.challengeTimer = 90000 + Math.random() * 30000;
          }
        }
      }

      render();
    }
    
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gRef, render, layout, engineConfig, onTriggerChallenge, challengeActiveRef, autoPlayRef]);
}
</file>

<file path="src/components/towerdefense/VocabChallenge.jsx">
import React, { useEffect, useRef } from 'react';
import { Zap, Clock, Keyboard, ListChecks, BookOpen, X } from 'lucide-react';

export default function VocabChallenge({
  challenge,
  input,
  onInputChange,
  onSubmit,
  onChoice,
  onDismiss,
  timeLeft,
  maxTime = 15,
  shakeKey = 0
}) {
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (challenge?.mode === 'TYPE' && inputRef.current) inputRef.current.focus();
  }, [challenge]);

  useEffect(() => {
    if (shakeKey === 0) return;
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove('td-shake');
    void el.offsetWidth;
    el.classList.add('td-shake');
  }, [shakeKey]);

  if (!challenge) return null;

  const pct = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));
  const lowTime = timeLeft <= 5;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-in fade-in duration-300 pointer-events-none">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto" />
      
      <style>{`
        @keyframes td-shake-kf {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
        .td-shake { animation: td-shake-kf 0.4s ease-in-out; }
      `}</style>

      <div
        ref={cardRef}
        className="relative z-10 pointer-events-auto bg-white rounded-[2rem] border-b-8 border-slate-200 w-full max-w-lg overflow-hidden p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center border-b-4 border-indigo-200">
               <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Vocab Bolt</div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                {challenge.mode === 'TYPE' ? (
                  <><Keyboard className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Type it</>
                ) : (
                  <><ListChecks className="w-4 h-4 text-indigo-500" strokeWidth={3} /> Pick one</>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm border-b-4 ${lowTime ? 'bg-rose-500 border-rose-700 text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
              <Clock className="w-4 h-4" strokeWidth={3} />
              {timeLeft}s
            </div>
            <button
              onClick={onDismiss}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-200 text-slate-500 hover:bg-rose-500 hover:text-white border-b-4 border-slate-300 hover:border-rose-700 active:border-b-0 active:translate-y-[4px] transition-all"
              title="Skip & Take Penalty"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 border-2 border-slate-200 overflow-hidden mb-6">
          <div
            className={`h-full transition-all duration-300 ease-linear rounded-full ${lowTime ? 'bg-rose-500' : 'bg-[#FFC800]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl mb-4 font-black tracking-widest uppercase text-[10px]">
             <BookOpen className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} /> Definition Target
          </div>
          <div className="text-slate-800 font-black text-xl sm:text-2xl leading-snug">
            {challenge.def}
          </div>
        </div>

        {challenge.mode === 'TYPE' ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-8">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type the word here…"
              autoComplete="off"
              spellCheck={false}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-[#1CB0F6] focus:outline-none focus:ring-4 focus:ring-[#1CB0F6]/20 font-bold text-slate-800 text-xl text-center placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] text-white font-black uppercase tracking-widest text-lg border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all"
            >
              Submit Answer
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {challenge.choices?.map((c) => (
              <button
                key={c}
                onClick={() => onChoice?.(c)}
                className="px-4 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-[6px] active:translate-y-[6px] active:border-b-[2px] font-black text-slate-700 text-lg sm:text-xl transition-all capitalize"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {challenge.mode === 'CHOICE' && (
          <div className="mt-6 text-center text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 rounded-xl py-3 border border-rose-100">
            ⚠ Incorrect choice spawns extra enemies!
          </div>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/components/towerdefense/wavePresets.js">
// src/components/towerdefense/wavePresets.js

export const MAP_LAYOUTS = {
  WAVE: {
    rows: 10,
    cols: 15,
    path: [
      [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
    ]
  },
  STRAIGHT: {
    rows: 10,
    cols: 15,
    path: [
      [5, 0], [5, 14]
    ]
  },
  SPIRAL: {
    rows: 10,
    cols: 15,
    path: [
      [1, 0], [1, 13], [8, 13], [8, 2], [3, 2], 
      [3, 11], [6, 11], [6, 4], [4, 4], [4, 9], [5, 9]
    ]
  }
};

export const WAVE_PRESETS = {
  SET_1: [
    // --- EARLY GAME (1-10) --- 
    [{ type: 'ANT',  count: 8,  interval: 1500 }],
    [{ type: 'ANT',  count: 12, interval: 1200 }],
    // Wasps enter 3 seconds after Ants start
    [{ type: 'ANT',  count: 10, interval: 1000 }, { type: 'WASP', count: 5,  interval: 800, delay: 3000 }],
    [{ type: 'WASP', count: 12, interval: 700  }],
    // Beetle acts as a mini-boss 4 seconds in
    [{ type: 'ANT',  count: 15, interval: 600  }, { type: 'BEETLE', count: 1,  interval: 2000, delay: 4000 }],
    [{ type: 'ANT',  count: 20, interval: 800  }, { type: 'WASP', count: 8,  interval: 600, delay: 3500 }],
    [{ type: 'BEETLE', count: 3,  interval: 1500 }, { type: 'WASP', count: 8,  interval: 500, delay: 2500 }],
    [{ type: 'ANT',  count: 25, interval: 400  }],
    [{ type: 'WASP', count: 20, interval: 400  }, { type: 'BEETLE', count: 3,  interval: 1000, delay: 4000 }],
    [{ type: 'BEETLE', count: 5,  interval: 1000 }, { type: 'QUEEN',   count: 1,  interval: 3000, delay: 6000 }],
    
    // --- MID GAME (11-20) ---
    [{ type: 'ANT',  count: 35, interval: 350  }],
    [{ type: 'WASP', count: 25, interval: 300  }, { type: 'BEETLE', count: 6,  interval: 1000, delay: 3500 }],
    [{ type: 'ANT',  count: 20, interval: 300  }, { type: 'WASP', count: 20, interval: 250, delay: 2000 }],
    [{ type: 'BEETLE', count: 10, interval: 1000 }],
    [{ type: 'WASP', count: 30, interval: 200  }, { type: 'QUEEN',   count: 1,  interval: 2000, delay: 5000 }],
    [{ type: 'ANT',  count: 40, interval: 250  }, { type: 'BEETLE', count: 8,  interval: 800, delay: 3000 }],
    [{ type: 'WASP', count: 40, interval: 200  }],
    [{ type: 'BEETLE', count: 18, interval: 600  }],
    [{ type: 'ANT',  count: 30, interval: 200  }, { type: 'WASP', count: 30, interval: 200, delay: 2500 }],
    [{ type: 'BEETLE', count: 15, interval: 500  }, { type: 'QUEEN',   count: 3,  interval: 1500, delay: 5500 }],

    // --- LATE GAME ESCALATION (21-30) ---
    [{ type: 'ANT',  count: 45, interval: 200  }, { type: 'WASP', count: 25, interval: 250, delay: 3000 }],
    [{ type: 'WASP', count: 35, interval: 200  }, { type: 'BEETLE', count: 15, interval: 600, delay: 4000 }],
    [{ type: 'ANT',  count: 50, interval: 150  }],
    [{ type: 'BEETLE', count: 20, interval: 450  }, { type: 'QUEEN',   count: 2,  interval: 2000, delay: 6000 }],
    [{ type: 'GIANT_ANT', count: 1, interval: 2000 }], 
    [{ type: 'QUEEN',   count: 4,  interval: 2000 }],
    [{ type: 'BEETLE', count: 30, interval: 400  }],
    [{ type: 'ANT',  count: 65, interval: 100  }, { type: 'WASP', count: 35, interval: 150, delay: 3500 }],
    [{ type: 'WASP', count: 50, interval: 150  }, { type: 'QUEEN',   count: 4,  interval: 1500, delay: 4500 }],
    [{ type: 'BEETLE', count: 25, interval: 350  }, { type: 'QUEEN',   count: 5,  interval: 1800, delay: 5000 }],

    // --- THE GAUNTLET (31-40) ---
    [{ type: 'ANT',  count: 75, interval: 100  }],
    [{ type: 'WASP', count: 65, interval: 120  }],
    [{ type: 'BEETLE', count: 35, interval: 300  }],
    [{ type: 'ANT',  count: 55, interval: 100  }, { type: 'WASP', count: 55, interval: 100, delay: 2000 }],
    [{ type: 'QUEEN',   count: 6,  interval: 1500 }, { type: 'BEETLE', count: 20, interval: 500, delay: 3000 }],
    [{ type: 'WASP', count: 70, interval: 100  }, { type: 'QUEEN',   count: 3,  interval: 2000, delay: 4000 }],
    [{ type: 'BEETLE', count: 45, interval: 250  }],
    [{ type: 'ANT',  count: 90, interval: 80   }],
    [{ type: 'WASP', count: 60, interval: 120  }, { type: 'BEETLE', count: 30, interval: 300, delay: 3500 }],
    [{ type: 'QUEEN',   count: 8,  interval: 1200 }, { type: 'WASP', count: 40, interval: 200, delay: 4500 }],

    // --- BRUTAL FINAL WAVES (41-50) ---
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 40, interval: 150, delay: 2500 }],
    [{ type: 'BEETLE', count: 55, interval: 250  }],
    [{ type: 'WASP', count: 85, interval: 100  }],
    [{ type: 'QUEEN',   count: 10, interval: 1000 }],
    [{ type: 'ANT',  count: 120,interval: 70   }],
    [{ type: 'WASP', count: 95, interval: 90   }, { type: 'BEETLE', count: 25, interval: 400, delay: 3500 }],
    [{ type: 'BEETLE', count: 60, interval: 200  }, { type: 'QUEEN',   count: 6,  interval: 1500, delay: 4000 }],
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 90, interval: 80, delay: 2000 }],
    [{ type: 'BEETLE', count: 70, interval: 180  }],
    // Final scripted wave: Ants instantly, Queens at 4s, Beetles at 7s, Wasps at 10s
    [
      { type: 'GIANT_ANT', count: 2, interval: 3000 }, 
      { type: 'QUEEN', count: 5, interval: 1500, delay: 4000 }, 
      { type: 'BEETLE', count: 25, interval: 350, delay: 7000 }, 
      { type: 'WASP', count: 30, interval: 200, delay: 10000 }
    ]
  ],

  // --- INFINITE QUADRATIC SCALING (51+) ---
  INFINITE_GENERATOR: (waveIndex) => {
    // Exact Override Requirement (as requested previously)
    if (waveIndex === 67) {
      return [{ type: 'GIANT_ANT', count: 67, interval: 350 }];
    }

    const x = waveIndex - 50; 
    const linear = x;
    const quad = Math.pow(x, 2);

    const wave = [
      { 
        type: 'ANT',  
        count: Math.floor(Math.min(1200, 80 + (10 * linear) + (0.5 * quad))), 
        interval: Math.max(15, 100 - (linear * 2) - (quad * 0.05)) 
      },
      { 
        type: 'WASP', 
        count: Math.floor(Math.min(900, 60 + (8 * linear) + (0.4 * quad))), 
        interval: Math.max(20, 120 - (linear * 2.5) - (quad * 0.05)),
        delay: 3500 // Wasps enter the track 3.5 seconds in
      },
      { 
        type: 'BEETLE', 
        count: Math.floor(Math.min(600, 40 + (5 * linear) + (0.25 * quad))),  
        interval: Math.max(40, 250 - (linear * 3) - (quad * 0.1)),
        delay: 7500 // Heavies enter 7.5 seconds in
      },
      { 
        type: 'QUEEN',   
        count: Math.floor(Math.min(200, 10 + (1.5 * linear) + (0.1 * quad))),     
        interval: Math.max(80, 1000 - (linear * 15) - (quad * 0.5)),
        delay: 12000 // Bosses enter 12 seconds in
      }
    ];

    if (waveIndex >= 55 && waveIndex % 5 === 0) {
      const bossTier = (waveIndex - 50) / 5; 
      const broodCount = Math.floor(Math.min(75, 2 + bossTier + (Math.pow(bossTier, 2) * 0.5)));
      wave.push({ 
        type: 'GIANT_ANT', 
        count: broodCount, 
        interval: Math.max(400, 4000 - (quad * 2)),
        delay: 15000 // Broodmothers deploy 15 seconds in
      });
    }

    return wave;
  }
};
</file>

<file path="src/components/UnitCard.jsx">
import React from 'react';
import { 
  Languages, Keyboard, BookOpen, Headphones, FileText, 
  Image as ImageIcon, Lock, Award, AlertCircle, 
  ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil,
  ChevronDown, ChevronUp, Trophy, Globe, Atom, Leaf, GraduationCap,
  Microscope, Telescope, Brain, Rocket, Calculator, Dna, FlaskConical,
  Compass, Lightbulb, Activity, Zap
} from 'lucide-react';

const IconMap = {
  "Award": Award, "GraduationCap": GraduationCap, "BookOpen": BookOpen,
  "Globe": Globe, "Atom": Atom, "Leaf": Leaf, "Languages": Languages,
  "Microscope": Microscope, "Telescope": Telescope, "Brain": Brain,
  "Rocket": Rocket, "Calculator": Calculator, "Dna": Dna, "FlaskConical": FlaskConical,
  "Compass": Compass, "Lightbulb": Lightbulb, "Activity": Activity, "Zap": Zap
};

const TaskUIConfig = {
  "WORD_REC":      { label: "Vocab", icon: Languages, bg: "bg-[#58cc02]", border: "border-[#58a700]", text: "text-white" },
  "NOTES":         { label: "Notes", icon: FileText, bg: "bg-[#94a3b8]", border: "border-[#64748b]", text: "text-white" },
  "WORKBOOK":      { label: "Extra", icon: FileBox, bg: "bg-[#ec4899]", border: "border-[#be185d]", text: "text-white" },
  
  "SPELLING":      { label: "Spelling", icon: Keyboard, bg: "bg-[#1cb0f6]", border: "border-[#1899d6]", text: "text-white" },
  "READ_COMP":     { label: "Reading", icon: BookOpen, bg: "bg-[#ff9600]", border: "border-[#cc7800]", text: "text-white" },
  "DICTATION":     { label: "Listening", icon: Headphones, bg: "bg-[#ce82ff]", border: "border-[#a567cc]", text: "text-white" },
  
  "SHORT_ANSWERS": { label: "Questions", icon: HelpCircle, bg: "bg-[#ffc800]", border: "border-[#cca000]", text: "text-white" },
  "DIAGRAMS":      { label: "Diagram", icon: ImageIcon, bg: "bg-[#ff4b4b]", border: "border-[#cc3c3c]", text: "text-white" },
  "ESSAY":         { label: "Essay", icon: Pencil, bg: "bg-[#14b8a6]", border: "border-[#0d9488]", text: "text-white" },
  
  "ASSESSMENT":    { label: "Assessment", icon: ClipboardCheck, bg: "bg-[#2563eb]", border: "border-[#1d4ed8]", text: "text-white" },
  "GAMES":         { label: "Game", icon: Gamepad2, bg: "bg-[#6366f1]", border: "border-[#4f46e5]", text: "text-white" }
};

export default function UnitCard({ unit, scores = {}, currentTheme, startMode, isExpanded, onToggle, needsWork }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;
  
  // Directly pull the color strictly from the unit's meta data
  const unitThemeColor = unit.meta?.themeColor || currentTheme.banner || 'bg-indigo-500 border-indigo-700';
  const unitPhases = unit.phases || [];

  // 1. Dynamically calculate Unit XP
  let rawUnitXP = 0;
  unitPhases.forEach(phase => {
    (phase.tasks || []).forEach(task => {
      const score = scores[task.dbKey]?.current || 0;
      rawUnitXP += Math.min(score, task.maxXP);
    });
  });
  const unitXP = Math.min(rawUnitXP, 100);

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  const getTrophyStyles = (xp) => {
    if (xp === 100) return { 
      container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", 
      icon: "text-amber-950",
      aura: "absolute -inset-[3px] bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 rounded-2xl opacity-80 blur-[6px] animate-pulse"
    };
    if (xp >= 90) return { container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", icon: "text-amber-950" };
    if (xp >= 75) return { container: "bg-slate-300 text-slate-800 border-b-[4px] border-slate-400", icon: "text-slate-700" };
    if (xp >= 60) return { container: "bg-orange-700 text-white border-b-[4px] border-orange-900", icon: "text-orange-200" };
    return { container: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400 dark:text-slate-500" };
  };

  const trophy = getTrophyStyles(unitXP);

  const checkIsEmpty = (taskId) => {
    if (taskId === 'NOTES' && (!unit.notes || !Array.isArray(unit.notes) || unit.notes.length === 0)) return true;
    if (taskId === 'WORKBOOK' && (!unit.workbook || unit.workbook.length === 0)) return true;
    if (taskId === 'GAMES' && (!unit.games || unit.games.length === 0)) return true;
    if (taskId === 'ASSESSMENT' && (!unit.assessment || !unit.assessment.questions || unit.assessment.questions.length === 0)) return true;
    return false;
  };

  // 2. Dynamically compile Needs Work
  const allTasks = [];
  unitPhases.forEach(phase => {
    const isPhaseLocked = unitXP < phase.threshold;
    (phase.tasks || []).forEach(task => {
      allTasks.push({ ...task, locked: isPhaseLocked });
    });
  });

  const needsWorkTasks = allTasks.filter(t => {
    if (t.id === 'GAMES') return false; 
    if (t.locked) return false;
    if (checkIsEmpty(t.id)) return false;
    
    const current = scores[t.dbKey]?.current || 0;
    return current < t.maxXP; 
  }).slice(0, 3); 

  const showNeedsWork = needsWork && needsWorkTasks.length > 0;

  const renderTaskButton = (task, isLocked = false) => {
    const config = TaskUIConfig[task.id];
    if (!config) return null;
    
    const TaskIcon = config.icon;
    const isEmpty = checkIsEmpty(task.id);
    const rawScore = scores[task.dbKey]?.current || 0;
    const taskScore = Math.min(rawScore, task.maxXP);

    if (isEmpty) {
      return (
        <div key={task.id} className="relative flex flex-col items-center justify-center p-5 rounded-[1.5rem] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 w-full h-36 opacity-70">
          <TaskIcon className="w-8 h-8 mb-2 opacity-40" strokeWidth={2} />
          <h4 className="font-bold text-xs tracking-widest uppercase">No {config.label}</h4>
        </div>
      );
    }

    return (
      <button 
        key={task.id}
        disabled={isLocked}
        onClick={() => startMode(unit.id, task.id)} 
        className={`relative flex flex-col items-center justify-between p-4 rounded-[1.5rem] transition-all duration-200 w-full h-36
          ${isLocked 
            ? `${config.bg} border-b-[6px] ${config.border} ${config.text} opacity-80 cursor-not-allowed saturate-[0.85]` 
            : `${config.bg} border-b-[6px] ${config.border} ${config.text} hover:brightness-110 active:border-b-0 active:translate-y-[6px] cursor-pointer`
          }`}
      >
        {isLocked && <Lock className="absolute top-4 right-4 w-5 h-5 text-white/80 drop-shadow-sm" strokeWidth={3} />}
        <div className="flex flex-col items-center mt-1">
          <TaskIcon className="w-8 h-8 mb-2 drop-shadow-sm" strokeWidth={2.5} />
          <h4 className="font-black text-lg tracking-wide drop-shadow-sm">
            {config.label}
          </h4>
        </div>
        
        <div className="w-full bg-black/15 rounded-xl py-1.5 mt-auto flex items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/90">
            {taskScore} / {task.maxXP} XP
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className={`relative w-full rounded-[2.5rem] mb-8 transition-all duration-300 z-10 hover:z-50
      ${unitXP === 100 ? 'bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 p-[3px] pb-[8px] shadow-lg shadow-fuchsia-500/20' : ''}
      ${showNeedsWork && unitXP !== 100 ? 'shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'shadow-sm'}
    `}>
      
      <div className={`w-full bg-white dark:bg-slate-900 transition-all duration-300 relative
        ${unitXP === 100 ? 'rounded-[2.35rem] h-full overflow-hidden' : 'rounded-[2.5rem] border-2 border-b-[8px] hover:border-slate-300 dark:hover:border-slate-700'}
        ${unitXP >= 90 && unitXP < 100 ? 'border-amber-400 dark:border-amber-500 hover:border-amber-500 dark:hover:border-amber-400' : ''}
        ${unitXP >= 75 && unitXP < 90 ? 'border-slate-400 dark:border-slate-500 hover:border-slate-500 dark:hover:border-slate-400' : ''}
        ${unitXP >= 60 && unitXP < 75 ? 'border-orange-700 dark:border-orange-900 hover:border-orange-800 dark:hover:border-orange-800' : ''}
        ${unitXP < 60 && unitXP !== 100 ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : ''}
      `}>
        
        <div onClick={onToggle} className={`p-6 sm:p-8 relative group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer`}>
          
          <div className="relative z-10 flex items-center w-full md:w-auto">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-sm border-b-[4px] ${unitThemeColor} group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 flex-shrink-0`}>
              <HeaderIcon className={`w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm`} strokeWidth={2.5} />
            </div>
            
            <div className="ml-4 sm:ml-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 flex items-center flex-wrap gap-3 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                {title || 'Unit Title'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-base tracking-wide">{description || 'Complete the tasks below.'}</p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-4 self-end md:self-auto w-full md:w-auto justify-end md:justify-start mt-4 md:mt-0">
            
            <div className="flex flex-col items-center gap-2 relative z-50">
              <div className="relative flex items-center justify-center">
                {trophy.aura && <div className={trophy.aura}></div>}
                <div className={`relative z-10 flex items-center justify-center px-4 py-2 rounded-xl transition-all shadow-sm font-black ${trophy.container}`}>
                  <Trophy className={`w-5 h-5 mr-2 ${trophy.icon}`} strokeWidth={2.5} />
                  <span className="text-xl tracking-tight">{unitXP}</span>
                </div>
              </div>

              {showNeedsWork && (
                <div className="relative group/badge">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 rounded-full text-[10px] uppercase tracking-widest border border-rose-300/50 dark:border-rose-700/50 shadow-sm cursor-help transition-all group-hover/badge:bg-rose-200 dark:group-hover/badge:bg-rose-800/50">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    Needs Work
                  </span>

                  <div className="absolute top-full right-1/2 translate-x-1/2 mt-3 w-[13rem] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-700 p-3 opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 scale-95 group-hover/badge:scale-100 pointer-events-none z-[100]">
                    <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-slate-200 dark:border-b-slate-700">
                      <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-white dark:border-b-slate-800"></div>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1 text-center">Tasks to attempt</p>
                    <div className="space-y-2">
                      {needsWorkTasks.map(t => {
                        const config = TaskUIConfig[t.id];
                        const Icon = config.icon;
                        return (
                          <div key={t.id} className="flex items-center p-2 rounded-xl border-b-2 border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${config.bg} ${config.text} border-b-[3px] ${config.border} mr-2.5 shrink-0`}>
                              <Icon className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate tracking-wide">{config.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`flex w-10 h-10 sm:w-14 sm:h-14 rounded-full items-center justify-center border-2 shadow-sm transition-all duration-300 border-b-[4px]
              ${isExpanded 
                ? 'bg-[#1cb0f6] border-[#1899d6] text-white translate-x-0 opacity-100'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 sm:translate-x-4 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-hover:bg-[#1cb0f6] sm:group-hover:border-[#1899d6] sm:group-hover:text-white'
              }`}>
              {isExpanded ? <ChevronUp className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={3} /> : <ChevronDown className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={3} />}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-4 duration-300 border-t-2 border-slate-100 dark:border-slate-800 pb-4">
            {isAILocked && (
              <div className="mx-6 sm:mx-8 mt-8 bg-rose-100 dark:bg-rose-900/40 border-2 border-rose-300 dark:border-rose-800 p-4 rounded-[1.5rem] flex items-start shadow-sm">
                <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-rose-800 dark:text-rose-300">AI Safety Lock Engaged</h4>
                  <p className="text-rose-600 dark:text-rose-400 text-sm font-bold mt-1">Due to repeated inappropriate inputs, AI grading has been disabled for this unit.</p>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-10">
              {/* 3. Dynamically Loop Over Phases */}
              {unitPhases.map(phase => {
                const isPhaseLocked = unitXP < phase.threshold;
                
                return (
                  <div key={phase.id} className="relative group">
                    {/* Locking Overlay */}
                    {isPhaseLocked && (
                      <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[2rem] transition-all duration-300 border-2 border-dashed border-slate-300 dark:border-slate-700">
                        <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-lg border-2 border-slate-200 dark:border-slate-700 flex items-center transform transition-transform group-hover:scale-105">
                           <Lock className="w-5 h-5 text-slate-400 mr-3" strokeWidth={2.5} />
                          <span className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">Earn {phase.threshold} XP to unlock</span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`transition-all ${isPhaseLocked ? 'pointer-events-none opacity-50' : ''}`}>
                      <div className="mb-4 flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-2">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{phase.title}</h3>
                        {phase.threshold > 0 && (
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{phase.threshold} XP to Unlock</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {phase.tasks.map(task => renderTaskButton(task, isPhaseLocked))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/data/index.js">
// src/data/index.js

export const Y8_META = []; export const Y8_DATA = {};
export const Y9_META = []; export const Y9_DATA = {};
export const ESL_META = []; export const ESL_DATA = {};
export const GED_META = []; export const GED_DATA = {};
export const ADD_MATH_META = []; export const ADD_MATH_DATA = {}; // <-- 1. Add these exports

// Automatically pulls all .js files in these folders
const modules = import.meta.glob('./**/*.js', { eager: true });

for (const path in modules) {
  if (path.includes('index.js')) continue;

  const module = modules[path];
  
  let data = null;
  for (const key in module) {
    const exp = module[key];
    if (exp && typeof exp === 'object' && exp.meta && exp.meta.id) {
      data = exp;
      break;
    }
  }
  
  if (!data) continue;

  const id = data.meta.id;
  const track = data.meta.track?.toUpperCase() || 'Y8';

  // Strict deduplication: Only push if the ID isn't already registered
  if (track === 'Y8' && !Y8_DATA[id]) { Y8_DATA[id] = data; Y8_META.push(data.meta); }
  else if (track === 'Y9' && !Y9_DATA[id]) { Y9_DATA[id] = data; Y9_META.push(data.meta); }
  else if (track === 'ESL' && !ESL_DATA[id]) { ESL_DATA[id] = data; ESL_META.push(data.meta); }
  else if (track === 'GED' && !GED_DATA[id]) { GED_DATA[id] = data; GED_META.push(data.meta); }
  else if (track === 'ADD_MATH' && !ADD_MATH_DATA[id]) { ADD_MATH_DATA[id] = data; ADD_MATH_META.push(data.meta); } // <-- 2. Add this condition
}

const sortById = (a, b) => a.id.localeCompare(b.id);
Y8_META.sort(sortById);
Y9_META.sort(sortById);
ESL_META.sort(sortById);
GED_META.sort(sortById);
ADD_MATH_META.sort(sortById); // <-- 3. Sort the new array
</file>

<file path="src/hooks/useStudentProgress.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TRACK_REGISTRY } from '../components/trackRegistry';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getGlobalGameLeaderboard = async (unitId, limit = 5) => {
  try {
    const { data, error } = await supabase.rpc('get_unit_leaderboard', { 
      target_unit_id: unitId 
    });
      
    if (error) {
      console.error("DEBUG - Supabase Error:", error);
      throw error;
    }

    const sortedData = (data || []).sort((a, b) => b.score - a.score).slice(0, limit);
    return { data: sortedData, error: null };
  } catch (err) {
    console.error('Failed to parse leaderboard profiles:', err);
    return { data: null, error: err.message };
  }
};

export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  
  const initialProgress = {};
  TRACK_REGISTRY.forEach(t => { initialProgress[t.id] = {}; });
  const [allProgress, setAllProgress] = useState(initialProgress);
  
  const [isLoadingDB, setIsLoadingDB] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/');
        return;
      }
      
      setUser(session.user);

      const { data } = await supabase
        .from('students')
        .select('progress')
        .eq('id', session.user.id)
        .single();

      const validTracks = TRACK_REGISTRY.map(t => t.id);
      let dbProgress = data?.progress || {};
      let needsUpdate = false;

      const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
      if (isOldFormat) {
        const newFormat = {};
        validTracks.forEach(t => { newFormat[t] = {}; });
        newFormat['Y9'] = dbProgress; 
        dbProgress = newFormat;
        needsUpdate = true;
      } else {
        validTracks.forEach(t => {
          if (!dbProgress[t]) {
            dbProgress[t] = {};
            needsUpdate = true;
          }
        });
      }

      setAllProgress(dbProgress);

      if (needsUpdate) {
        await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        current: Math.max(existingScore, score),
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, 
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}
</file>

<file path="src/views/Home.jsx">
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, Sun, Moon, Loader2 } from 'lucide-react';
import { TRACK_REGISTRY } from '../components/trackRegistry';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [visibleTracks, setVisibleTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');

    const fetchUserAndTracks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const enrolled = session.user.user_metadata?.enrolled_tracks;
        if (enrolled && Array.isArray(enrolled) && enrolled.length > 0) {
          // RBAC: Only show enrolled tracks
          setVisibleTracks(TRACK_REGISTRY.filter(t => enrolled.includes(t.id)));
        } else {
          // Fallback: If no metadata exists yet, show all tracks
          setVisibleTracks(TRACK_REGISTRY);
        }
      } else {
        setVisibleTracks(TRACK_REGISTRY);
      }
      setLoading(false);
    };

    fetchUserAndTracks();
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm z-50"
        title="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
      </button>

      <div className="relative z-10 w-full max-w-5xl">
        
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-8 border-b-[6px] transform hover:-translate-y-1 transition-transform">
             <LayoutDashboard className="w-10 h-10 text-slate-800 dark:text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-slate-800 dark:text-white drop-shadow-sm">
            Curriculum
          </h1>
          <p className="text-sm font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 inline-block px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
            Select Learning Track
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visibleTracks.map((t, index) => {
            const Icon = t.icon;
            return (
              <button 
                key={t.id}
                onClick={() => navigate(`/${t.id}`)}
                className="group relative w-full text-left flex flex-col p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 transition-all duration-200 active:translate-y-[8px] active:border-b-2 bg-white dark:bg-slate-900 border-b-[8px] hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <div className={`w-16 h-16 ${t.theme.bg} rounded-2xl flex items-center justify-center mb-6 shadow-sm border-b-[4px] ${t.theme.border} group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 text-white ${t.id === 'ESL' ? 'text-amber-950' : ''} drop-shadow-sm`} strokeWidth={2.5} />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                      {t.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-base tracking-wide">
                      {t.desc}
                    </p>
                  </div>

                  <div className="hidden sm:flex w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-[#1cb0f6] group-hover:border-[#1899d6] group-hover:text-white transition-all transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 border-b-[4px] group-hover:border-b-[4px]">
                    <ChevronRight className="w-7 h-7" strokeWidth={3} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/views/YearDashboard.jsx">
import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction, Trophy, Sun, Moon, Sparkles } from 'lucide-react';

import { useStudentProgress } from '../hooks/useStudentProgress';
import UnitCard from '../components/UnitCard';
import { TRACK_REGISTRY } from '../components/trackRegistry';

import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA, ADD_MATH_META, ADD_MATH_DATA} from '../data/index';

const Recognition = lazy(() => import('../tasks/Recognition'));
const Spell = lazy(() => import('../tasks/Spell'));
const Dictation = lazy(() => import('../tasks/Dictation'));
const Reading = lazy(() => import('../tasks/Reading'));
const ShortAnswers = lazy(() => import('../tasks/ShortAnswers'));
const Diagrams = lazy(() => import('../tasks/Diagrams'));
const Essay = lazy(() => import('../tasks/Essay'));
const Assessment = lazy(() => import('../tasks/Assessment'));
const Notes = lazy(() => import('../tasks/Notes'));
const Games = lazy(() => import('../tasks/Games'));

function PlaceholderView({ title, onQuit }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
        <Construction className="w-10 h-10 text-slate-400" strokeWidth={2.5} />
      </div>
      <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">{title}</h2>
      <div className="bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 mb-10 text-xs font-black text-slate-500 uppercase tracking-widest">
        Under Construction
      </div>
      <button 
        onClick={onQuit} 
        className="px-8 py-4 bg-[#1cb0f6] text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-[#159bd9] border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm"
      >
        Return
      </button>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  
  const { user, unitScores = {}, isLoadingDB, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  const [appState, setAppState] = useState('MENU');
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState(null); 
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // --- DYNAMIC CENTRAL REGISTRY MAPPING ---
  const trackRegistryItem = TRACK_REGISTRY.find(t => t.id === track);
  const currentTheme = trackRegistryItem?.theme || TRACK_REGISTRY[0].theme;
  const trackTitle = trackRegistryItem?.title || "Unknown Track";

  let META_DATA = [];
  let UNIT_DATA = {};
  
  if (track === 'Y8') { META_DATA = Y8_META || []; UNIT_DATA = Y8_DATA || {}; }
  else if (track === 'Y9') { META_DATA = Y9_META || []; UNIT_DATA = Y9_DATA || {}; }
  else if (track === 'ESL') { META_DATA = ESL_META || []; UNIT_DATA = ESL_DATA || {}; }
  else if (track === 'GED') { META_DATA = GED_META || []; UNIT_DATA = GED_DATA || {}; }
  else if (track === 'ADD_MATH') { META_DATA = ADD_MATH_META || []; UNIT_DATA = ADD_MATH_DATA || {}; }

  const activeExpandedUnit = expandedUnit !== null ? expandedUnit : 'NONE';

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-6" strokeWidth={3} />
        <p className="text-xs text-slate-500 font-black tracking-widest uppercase">Syncing</p>
      </div>
    );
  }

  let totalTrackXP = 0;
  let maxTrackXP = META_DATA.length * 100;
  
  META_DATA.forEach(unit => {
    const s = unitScores?.[unit.id] || {};
    let rawUnitTotal = Object.entries(s)
      .filter(([key]) => key !== 'strikes')
      .reduce((sum, [key, val]) => {
        let max = 10;
        if (['p1', 'p10', 'p11'].includes(key)) max = 5;
        if (['p6', 'p7', 'p8'].includes(key)) max = 20;
        return sum + Math.min(val?.current || 0, max);
      }, 0);
    totalTrackXP += Math.min(rawUnitTotal, 100);
  });

  const getGlobalTrophyStyles = (total, max) => {
    if (max === 0) return { container: "bg-slate-100 dark:bg-slate-800 text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400" };
    const pct = (total / max) * 100;
    
    if (pct === 100) return {
      container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600",
      icon: "text-amber-950",
      aura: "absolute -inset-[3px] bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-500 rounded-xl opacity-80 blur-[6px] animate-pulse"
    };
    if (pct >= 90) return { container: "bg-amber-400 text-amber-950 border-b-[4px] border-amber-600", icon: "text-amber-950" };
    if (pct >= 75) return { container: "bg-slate-300 text-slate-800 border-b-[4px] border-slate-400", icon: "text-slate-700" };
    if (pct >= 60) return { container: "bg-orange-700 text-white border-b-[4px] border-orange-900", icon: "text-orange-200" };
    
    return { container: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b-[4px] border-slate-200 dark:border-slate-700", icon: "text-slate-400 dark:text-slate-500" };
  };

  const globalTrophy = getGlobalTrophyStyles(totalTrackXP, maxTrackXP);
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const startMode = (unitId, mode) => {
    setActiveUnit(unitId);
    const data = UNIT_DATA[unitId];
    if (!data) return;

    const basePath = import.meta.env.BASE_URL === '/' ? '' : (import.meta.env.BASE_URL || '').replace(/\/$/, '');

    const realW = (data.realWords || []).map(w => ({ 
      ...w, 
      isReal: true,
      audio: `${basePath}/audio/${track}/${unitId}/word_${w.word.toLowerCase()}.mp3`,
      defAudio: `${basePath}/audio/${track}/${unitId}/def_${w.word.toLowerCase()}.mp3`,
      sentAudio: `${basePath}/audio/${track}/${unitId}/sentence_${w.word.toLowerCase()}.mp3`
    }));

    if (mode === 'WORD_REC') setCurrentPool([...realW]);
    else if (mode === 'SPELLING') setCurrentPool([...realW].sort(() => Math.random() - 0.5));
    else if (mode === 'DICTATION') {
      const dictationData = data.dictation || [];
      const dictationPool = realW.map((w, i) => ({
        ...w, dictSent: dictationData[i]?.sent || w.sent, dictVn: dictationData[i]?.vnSent || w.vnSent
      })).sort(() => Math.random() - 0.5);
      setCurrentPool(dictationPool);
    } 
    else if (mode === 'GAMES') {
      const gamePool = [...realW].sort(() => Math.random() - 0.5);
      gamePool.gameConfig = data.games?.gameConfig || null;
      setCurrentPool(gamePool);
    } 
    else if (mode === 'READ_COMP') setCurrentPool(data.passages || []);
    else if (mode === 'SHORT_ANSWERS') setCurrentPool({ shortQA: data.shortQA || [] });
    else if (mode === 'DIAGRAMS') setCurrentPool({ diagrams: data.diagrams || [] });
    else if (mode === 'ESSAY') setCurrentPool({ essay: data.essay || null });
    else if (mode === 'ASSESSMENT') setCurrentPool([]);
    else if (mode === 'NOTES') {
      const fixedNotes = (data.notes || []).map(note => {
        const newNote = { ...note };
        if (note.audio) newNote.audio = `${basePath}/${note.audio.replace(/^\//, '')}`;
        if (note.image) newNote.image = `${basePath}/${note.image.replace(/^\//, '')}`;
        return newNote;
      });
      setCurrentPool(fixedNotes);
    }
    
    setAppState(mode);
  };

  const handleTaskComplete = async (section, rawScore, answers = null) => {
    let finalScore = rawScore;
    if (['p1', 'p10', 'p11'].includes(section)) {
      if (section === 'p10' || section === 'p11') finalScore = 5; 
      else finalScore = Math.min(5, Math.ceil((rawScore / 10) * 5)); 
    } else if (['p6', 'p7', 'p8'].includes(section)) {
      finalScore = rawScore <= 10 ? Math.ceil((rawScore / 10) * 20) : rawScore; 
      finalScore = Math.min(20, finalScore);
    } else {
      finalScore = Math.min(10, finalScore);
    }
    await saveScore(activeUnit, section, finalScore, answers);
    setAppState('MENU');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-200 transition-colors duration-300">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${currentTheme.ambient1} opacity-10 dark:opacity-20 blur-[100px] transition-colors duration-500`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ${currentTheme.ambient2} opacity-10 dark:opacity-15 blur-[100px] transition-colors duration-500`} />
      </div>

      {appState === 'MENU' && (
        <div className="animate-in fade-in duration-500 pb-20 relative z-10">
          
          <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
                
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/home')} 
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400"
                >
                  <ChevronLeft className="w-7 h-7" strokeWidth={3} />
                </button>
                <h1 className={`text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm ${currentTheme.text}`}>
                  {trackTitle}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative items-center justify-center hidden sm:flex">
                  {globalTrophy.aura && <div className={globalTrophy.aura}></div>}
                  <div className={`relative z-10 flex items-center px-4 py-2 rounded-xl shadow-sm ${globalTrophy.container}`}>
                    <Trophy className={`w-5 h-5 mr-2 ${globalTrophy.icon}`} strokeWidth={2.5} />
                    <span className="text-xs font-black tracking-widest mt-0.5">{totalTrackXP} / {maxTrackXP} XP</span>
                  </div>
                </div>

                <button 
                  onClick={toggleDarkMode}
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50"
                  title="Toggle Dark Mode"
                >
                  {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
                </button>

                <button 
                  onClick={() => setShowHowItWorks(true)} 
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-slate-200 dark:border-slate-700 border-b-[4px] active:border-b-2 active:translate-y-[2px] text-slate-500 dark:text-slate-400"
                >
                  <Info className="w-6 h-6" strokeWidth={2.5} />
                </button>

                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                  <span className="px-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hidden md:block">{userName}</span>
                  <button 
                    onClick={handleLogout} 
                    className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl hover:text-rose-500 transition-colors shadow-sm border-2 border-slate-200 dark:border-slate-700 active:scale-95" 
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 relative z-10">
            {(() => {
              let firstIncompleteFound = false;

              return META_DATA.map((metaUnit) => {
                const contentData = UNIT_DATA[metaUnit.id] || {};
                
                const s = unitScores?.[metaUnit.id] || {};
                let rawUnitTotal = Object.entries(s)
                  .filter(([key]) => key !== 'strikes')
                  .reduce((sum, [key, val]) => {
                    let max = 10;
                    if (['p1', 'p10', 'p11'].includes(key)) max = 5;
                    if (['p6', 'p7', 'p8'].includes(key)) max = 20;
                    return sum + Math.min(val?.current || 0, max);
                  }, 0);
                const unitXP = Math.min(rawUnitTotal, 100);

                const isInProgress = unitXP > 0 && unitXP < 100;
                const isNext = unitXP === 0 && !firstIncompleteFound;
                if (unitXP < 100) firstIncompleteFound = true;
                
                const needsWork = isInProgress || isNext;

                const combinedUnitPayload = {
                  ...contentData,
                  id: metaUnit.id,
                  meta: {
                    id: metaUnit.id,
                    title: metaUnit.title,
                    description: metaUnit.desc,
                    icon: contentData.meta?.icon || 'BookOpen',
                    themeColor: contentData.meta?.themeColor, 
                    glowColor: contentData.meta?.glowColor,
                    thresholds: contentData.meta?.thresholds
                  }
                };

                return (
                  <UnitCard 
                    key={metaUnit.id} 
                    unit={combinedUnitPayload} 
                    scores={unitScores?.[metaUnit.id] || {}} 
                    currentTheme={currentTheme} 
                    startMode={startMode} 
                    isExpanded={activeExpandedUnit === metaUnit.id}
                    onToggle={() => setExpandedUnit(activeExpandedUnit === metaUnit.id ? 'NONE' : metaUnit.id)}
                    needsWork={needsWork}
                  />
                );
              });
            })()}
          </div>
        </div>
      )}

      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto border-4 border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Sparkles className="w-8 h-8 text-[#ffc800] mr-3 drop-shadow-sm" strokeWidth={2.5} />
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">How It Works</h2>
                </div>
                <button 
                  onClick={() => setShowHowItWorks(false)} 
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                >
                  <XCircle className="w-6 h-6" strokeWidth={2.5}/>
                </button>
             </div>
             
             <p className="text-base text-slate-500 dark:text-slate-400 font-bold mb-8 leading-relaxed">
               Welcome! 🚀 We're so excited to help you learn Science and English at the same time. This is called <strong className="text-slate-800 dark:text-white font-black">CLIL</strong>, and it's a super fun way to build your vocabulary while exploring the world around you!
             </p>
             
             <div className="space-y-4 mb-8">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-start">
                 <div className="w-10 h-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 border-b-[4px] border-[#1899d6]"><span className="font-black text-sm">1</span></div>
                 <div>
                   <h3 className="font-black text-slate-800 dark:text-white text-lg mb-1">Quick Practice</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">Fun, bite-sized games and spelling drills designed to boost your memory and speed.</p>
                 </div>
               </div>
               
               <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-start">
                 <div className="w-10 h-10 rounded-xl bg-[#58cc02] text-white flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 border-b-[4px] border-[#58a700]"><span className="font-black text-sm">2</span></div>
                 <div>
                   <h3 className="font-black text-slate-800 dark:text-white text-lg mb-1">Smart Feedback</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-bold">Write essays and answer questions, and our smart AI will give you helpful tips instantly to improve your writing!</p>
                 </div>
               </div>
             </div>

             <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 p-5 rounded-2xl mb-8 flex items-start shadow-sm">
               <AlertTriangle className="w-6 h-6 text-rose-400 dark:text-rose-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
               <div>
                 <h4 className="font-black text-xs text-rose-800 dark:text-rose-300 uppercase tracking-widest mb-2">Safety & Respect</h4>
                 <p className="text-rose-600 dark:text-rose-400 text-sm font-bold leading-relaxed">
                   We want to keep this a safe, positive space for everyone. If you type anything unkind or inappropriate 3 times, the AI grading will take a pause.
                 </p>
               </div>
             </div>
             
             <button 
               onClick={() => setShowHowItWorks(false)} 
               className="w-full bg-[#1cb0f6] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-[#159bd9] transition-all border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px]"
             >
               Let's Go!
             </button>
          </div>
        </div>
      )}

      {appState === 'WORKBOOK' && <PlaceholderView title="Extra Practice" onQuit={() => setAppState('MENU')} />}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" strokeWidth={3} />
        </div>
      }>
        {appState === 'WORD_REC' && <Recognition pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p1', s)} />}
        {appState === 'SPELLING' && <Spell pool={currentPool} track={track} unitId={activeUnit} savedData={unitScores[activeUnit]?.p2?.answers || {}} onComplete={(s, answers) => handleTaskComplete('p2', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'DICTATION' && <Dictation pool={currentPool} track={track} unitId={activeUnit} savedData={unitScores[activeUnit]?.p3?.answers || {}} onComplete={(s, answers) => handleTaskComplete('p3', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'READ_COMP' && <Reading pool={currentPool} track={track} unitId={activeUnit} savedData={unitScores[activeUnit]?.p4?.answers || {}} onComplete={(s, answers) => handleTaskComplete('p4', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'NOTES' && <Notes slides={currentPool} onComplete={() => handleTaskComplete('p10', 10)} onQuit={() => setAppState('MENU')} />}
        {appState === 'SHORT_ANSWERS' && <ShortAnswers pool={currentPool} savedData={unitScores[activeUnit]?.p6?.answers || {}} strikes={unitScores[activeUnit]?.strikes || 0} onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)} onComplete={(s, answers) => handleTaskComplete('p6', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'DIAGRAMS' && <Diagrams pool={currentPool} unitId={activeUnit} savedData={unitScores[activeUnit]?.p7?.answers || {}} strikes={unitScores[activeUnit]?.strikes || 0} onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)} onComplete={(s, answers) => handleTaskComplete('p7', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'ESSAY' && <Essay pool={currentPool} savedData={unitScores[activeUnit]?.p8?.answers || {}} strikes={unitScores[activeUnit]?.strikes || 0} onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)} onComplete={(s, answers) => handleTaskComplete('p8', s, answers)} onQuit={() => setAppState('MENU')} />}
        {appState === 'ASSESSMENT' && <Assessment unit={UNIT_DATA[activeUnit]} onComplete={(score) => handleTaskComplete('p9', score)} onQuit={() => setAppState('MENU')} />}
        {appState === 'GAMES' && <Games pool={currentPool} unitId={activeUnit} scores={unitScores[activeUnit] || {}} onComplete={(score) => handleTaskComplete('p12', score)} onQuit={() => setAppState('MENU')} />}
      </Suspense>
    </div>
  );
}
</file>

<file path="src/App.jsx">
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './views/Home';
import YearDashboard from './views/YearDashboard';

// NEW IMPORTS
import TeacherRoute from './components/TeacherRoute';
import TeacherDashboard from './views/TeacherDashboard'; // We build this next!

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Gatekeeper */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. The Main Menu */}
        <Route path="/home" element={<Home />} />
        
        {/* 3. The Curricular Tracks */}
        <Route path="/Y8" element={<YearDashboard track="Y8" />} />
        <Route path="/Y9" element={<YearDashboard track="Y9" />} />
        <Route path="/ESL" element={<YearDashboard track="ESL" />} />
        <Route path="/GED" element={<YearDashboard track="GED" />} />
        <Route path="/ADD_MATH" element={<YearDashboard track="ADD_MATH" />} />
        
        {/* NEW: Protected Teacher Route */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          } 
        />

        {/* Default Fallback: Force everyone to login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
</file>

<file path="src/pages/Login.jsx">
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { User, KeyRound, Loader2, AlertTriangle, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim() || !pin.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    const formattedEmail = `${name.toLowerCase().trim()}@science.local`;
    const formattedPassword = `${pin.trim()}-y8s`;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formattedEmail,
        password: formattedPassword,
      });

      if (error) throw new Error("Incorrect Name or Secret Code. Please try again.");
      
      if (data.user) {
        // Check the metadata role to fork the routing
        const userRole = data.user.user_metadata?.role;
        
        if (userRole === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          // Standard student behavior
          navigate('/home');
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 font-sans overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-indigo-200 transition-colors duration-300">
      
      {/* Absolute Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-2xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-sm z-50"
        title="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
      </button>

      {/* Playful Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1cb0f6] opacity-10 dark:opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#58cc02] opacity-10 dark:opacity-15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-500">
        
        {/* Gamified Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="relative mb-6">
            <div className="relative w-24 h-24 bg-[#1cb0f6] text-white rounded-[2rem] flex items-center justify-center shadow-sm border-b-[6px] border-[#1899d6] transform hover:scale-[1.05] active:scale-95 active:border-b-0 active:translate-y-[6px] transition-all duration-200 cursor-default">
              <BookOpen className="w-12 h-12 drop-shadow-sm" strokeWidth={2.5} />
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-[#ffc800] animate-bounce drop-shadow-sm" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-slate-800 dark:text-white drop-shadow-sm">
            Student Portal
          </h1>
          <p className="text-[#1cb0f6] font-black text-xs tracking-widest uppercase bg-white dark:bg-slate-900 px-5 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
            Welcome Back!
          </p>
        </div>

        {/* Tactile Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 p-8 sm:p-10 transition-colors">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">
                First Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors">
                  <User className="h-6 w-6 text-slate-400 group-focus-within:text-[#1cb0f6] transition-colors" strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bowen"
                  disabled={isLoading}
                  className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6] focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">
                Secret Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <KeyRound className="h-6 w-6 text-slate-400 group-focus-within:text-[#1cb0f6] transition-colors" strokeWidth={2.5} />
                </div>
                <input
                  type="password"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="000"
                  maxLength={3}
                  disabled={isLoading}
                  className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-xl font-black text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6] focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 tracking-[0.4em] shadow-inner"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-start bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 px-5 py-4 rounded-2xl border-2 border-rose-300 dark:border-rose-800 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="font-bold text-sm leading-snug">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !name.trim() || !pin.trim()}
              className="w-full mt-8 flex items-center justify-center px-8 py-5 bg-[#1cb0f6] text-white rounded-2xl font-black text-xl tracking-widest uppercase hover:bg-[#159bd9] border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
</file>

</files>
