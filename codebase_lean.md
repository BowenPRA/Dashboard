This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

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
- Files matching these patterns are excluded: src/data/ADD_MATH/**, src/data/ESL/**, src/data/GED/**, src/data/Y9/**, src/data/Y8/MATH_1A/**, src/components/towerdefense/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
.repomixignore
eslint.config.js
generate_all_audio.py
index.html
package.json
postcss.config.js
README.md
src/App.css
src/App.jsx
src/components/Feedback.jsx
src/components/math/MathGraph.jsx
src/components/StudentProfileDrawer.jsx
src/components/TeacherRoute.jsx
src/components/TopBar.jsx
src/components/trackRegistry.js
src/components/UnitCard.jsx
src/components/WidgetRenderer.jsx
src/data/index.js
src/data/Y8/SCIENCE_1A/assessment.js
src/data/Y8/SCIENCE_1A/data.js
src/data/Y8/SCIENCE_1A/diagrams.js
src/data/Y8/SCIENCE_1A/games.js
src/data/Y8/SCIENCE_1A/notes.js
src/data/Y8/SCIENCE_1A/widgets.jsx
src/data/Y8/SCIENCE_1A/workbook.js
src/data/Y8/Y8_1A.js
src/data/Y8/Y8_1B.js
src/data/Y8/Y8_2A.js
src/data/Y8/Y8_3A.js
src/hooks/useStudentProgress.js
src/index.css
src/main.jsx
src/pages/Login.jsx
src/tasks/Assessment.jsx
src/tasks/Diagrams.jsx
src/tasks/Dictation.jsx
src/tasks/Essay.jsx
src/tasks/Games.jsx
src/tasks/games/TowerDefense.jsx
src/tasks/Notes.jsx
src/tasks/Reading.jsx
src/tasks/Recognition.jsx
src/tasks/ShortAnswers.jsx
src/tasks/Spell.jsx
src/tasks/VocabWriting.jsx
src/utils/aiGrader.js
src/utils/sound.js
src/utils/supabaseClient.js
src/views/Home.jsx
src/views/TeacherDashboard.jsx
src/views/YearDashboard.jsx
tailwind.config.js
vite.config.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".repomixignore">
# ==========================================
# 1. Prevent Recursive Context Bloat
# ==========================================
# Ignore all previous repomix/context files
*.xml
*.md
!README.md
*codebase*.md

# ==========================================
# 2. Ignore Media & Assets
# ==========================================
public/audio/
public/images/
**/*.mp3
**/*.svg
**/*.png
**/*.jpg
**/*.jpeg

# ==========================================
# 3. Ignore Build/Config Artifacts (Optional)
# ==========================================
package-lock.json
yarn.lock
</file>

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

<file path="src/data/Y8/SCIENCE_1A/assessment.js">
// src/data/Y8/SCIENCE_1A/assessment.js
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [], 
  questions: [
    {
      id: "q1_mcq_reflection",
      type: "mcq",
      title: "1. Look at the diagram below. A light ray strikes a mirror at an angle of 40 degrees to the normal line. According to the Law of Reflection, what will the angle of the reflected ray be?",
      inlineSvg: DIAGRAMS.ASSESSMENT_REFLECTION_40,
      options: [
        { val: "A", text: "A. 20 degrees" },
        { val: "B", text: "B. 40 degrees" },
        { val: "C", text: "C. 50 degrees" },
        { val: "D", text: "D. 80 degrees" }
      ],
      correct: "B",
      expEn: "The Law of Reflection states that the angle of incidence is always equal to the angle of reflection. If the incoming ray is 40 degrees, the reflected ray must also be exactly 40 degrees.",
      expVn: "Định luật Phản xạ phát biểu rằng góc tới luôn bằng góc phản xạ. Nếu tia tới là 40 độ, tia phản xạ cũng phải chính xác là 40 độ."
    },
    {
      id: "q2_inline_refraction",
      type: "inline",
      title: "2. Complete the sentences to describe the process of refraction.",
      options: [],
      textParts: [
        "Light travels incredibly fast through the air. However, when it enters a glass block, it is moving into a denser ",
        ". This sudden change causes the light to ",
        " and bend ",
        " the normal line."
      ],
      blanks: {
        "1": {
          correct: "medium",
          options: [
            { val: "spectrum", text: "spectrum" },
            { val: "medium", text: "medium" },
            { val: "filter", text: "filter" }
          ]
        },
        "2": {
          correct: "slow down",
          options: [
            { val: "speed up", text: "speed up" },
            { val: "slow down", text: "slow down" }
          ]
        },
        "3": {
          correct: "towards",
          options: [
            { val: "towards", text: "towards" },
            { val: "away from", text: "away from" }
          ]
        }
      },
      expEn: "A medium is any substance light travels through. Dense mediums like glass cause light to slow down, which makes the ray bend inwards towards the normal line.",
      expVn: "Môi trường là bất kỳ chất nào ánh sáng truyền qua. Các môi trường đặc như thủy tinh làm cho ánh sáng chậm lại, khiến tia sáng uốn cong hướng vào trong về phía đường pháp tuyến."
    },
    {
      id: "q3_mcq_density_inference",
      type: "mcq",
      title: "3. Analyze the diagram. A ray of light is travelling from Medium A into Medium B. Based on the way the light bends, what can you infer about the two mediums?",
      inlineSvg: DIAGRAMS.ASSESSMENT_DENSITY_INFERENCE,
      options: [
        { val: "A", text: "A. Medium B is denser than Medium A." },
        { val: "B", text: "B. Medium A is denser than Medium B." },
        { val: "C", text: "C. Both mediums have the exact same density." },
        { val: "D", text: "D. The light is slowing down in Medium B." }
      ],
      correct: "B",
      expEn: "The light ray is bending AWAY from the normal line. This only happens when light speeds up. Therefore, it must be moving from a denser medium (Medium A) into a less dense medium (Medium B).",
      expVn: "Tia sáng đang uốn cong RA XA đường pháp tuyến. Điều này chỉ xảy ra khi ánh sáng tăng tốc. Do đó, nó phải đang di chuyển từ một môi trường đặc hơn (Môi trường A) sang một môi trường ít đặc hơn (Môi trường B)."
    },
    {
      id: "q4_mcq_dispersion",
      type: "mcq",
      title: "4. A triangular glass prism can be used to reveal the hidden colours inside white light. What is the scientific name for this splitting process?",
      options: [
        { val: "A", text: "A. Reflection" },
        { val: "B", text: "B. Refraction" },
        { val: "C", text: "C. Dispersion" },
        { val: "D", text: "D. Addition" }
      ],
      correct: "C",
      expEn: "Dispersion is the specific process where white light is split into its continuous spectrum of colours because each colour slows down by a different amount inside the prism.",
      expVn: "Tán sắc là quá trình cụ thể trong đó ánh sáng trắng bị tách thành quang phổ màu liên tục vì mỗi màu chậm lại với một lượng khác nhau bên trong lăng kính."
    },
    {
      id: "q5_order_spectrum",
      type: "order",
      title: "5. Drag the colours of the visible spectrum into their correct order, starting from the colour that bends the LEAST at the top, to the colour that bends the MOST at the bottom.",
      options: [],
      bank: [
        { id: "c1", val: "Red", text: "Red" },
        { id: "c2", val: "Orange", text: "Orange" },
        { id: "c3", val: "Yellow", text: "Yellow" },
        { id: "c4", val: "Green", text: "Green" },
        { id: "c5", val: "Blue", text: "Blue" },
        { id: "c6", val: "Indigo", text: "Indigo" },
        { id: "c7", val: "Violet", text: "Violet" }
      ],
      targets: [
        { id: "spectrum", title: "Order of the Spectrum" }
      ],
      correctSets: {
        "spectrum": ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
      },
      expEn: "Red light slows down the least, so it stays at the top. Violet light slows down the most, pulling it to the bottom. The acronym to remember this is ROYGBIV.",
      expVn: "Ánh sáng đỏ chậm lại ít nhất, nên nó ở trên cùng. Ánh sáng tím chậm lại nhiều nhất, kéo nó xuống dưới cùng. Từ viết tắt để nhớ điều này là ROYGBIV."
    },
    {
      id: "q6_dnd_secondary_colours",
      type: "dnd",
      title: "6. Mixing coloured light creates bright new colours. Drag the Primary Colours into the targets to mathematically create the correct Secondary Colours.",
      options: [],
      bank: [
        { id: "r1", val: "Red", text: "Red" },
        { id: "r2", val: "Red", text: "Red" },
        { id: "g1", val: "Green", text: "Green" },
        { id: "g2", val: "Green", text: "Green" },
        { id: "b1", val: "Blue", text: "Blue" },
        { id: "b2", val: "Blue", text: "Blue" }
      ],
      targets: [
        { id: "yellow", title: "Make Yellow" },
        { id: "cyan", title: "Make Cyan" },
        { id: "magenta", title: "Make Magenta" }
      ],
      correctSets: {
        "yellow": ["Red", "Green"],
        "cyan": ["Green", "Blue"],
        "magenta": ["Red", "Blue"]
      },
      expEn: "Yellow is made from Red + Green. Cyan is made from Green + Blue. Magenta is made from Red + Blue. These combinations are the foundation of all digital screens.",
      expVn: "Màu Vàng được tạo ra từ Đỏ + Lục. Màu Xanh lơ (Cyan) được tạo ra từ Lục + Lam. Màu Đỏ thắm (Magenta) được tạo ra từ Đỏ + Lam. Những sự kết hợp này là nền tảng của tất cả các màn hình kỹ thuật số."
    },
    {
      id: "q7_inline_white_light",
      type: "inline",
      title: "7. Complete the statement regarding the primary colours of light.",
      options: [],
      textParts: [
        "If you shine all three primary colours of light (Red, Green, and Blue) at the exact same spot on a dark wall, the overlapping colours will mathematically combine to create pure ",
        " light."
      ],
      blanks: {
        "1": {
          correct: "White",
          options: [
            { val: "Black", text: "Black" },
            { val: "Brown", text: "Brown" },
            { val: "White", text: "White" }
          ]
        }
      },
      expEn: "Unlike paint which turns brown or black when mixed, adding all three primary colours of light together recreates pure white light.",
      expVn: "Không giống như sơn sẽ chuyển sang màu nâu hoặc đen khi trộn lẫn, việc cộng cả ba màu cơ bản của ánh sáng lại với nhau sẽ tái tạo lại ánh sáng trắng tinh khiết."
    },
    {
      id: "q8_inline_filters",
      type: "inline",
      title: "8. A scientist shines white light at a piece of coloured plastic. Complete the sentence to explain how it works.",
      options: [],
      textParts: [
        "A Colour Filter does not dye the light. Instead, a Blue filter will ",
        " the red and green light, and only allow the blue light to ",
        " to the other side."
      ],
      blanks: {
        "1": {
          correct: "absorb",
          options: [
            { val: "absorb", text: "absorb" },
            { val: "reflect", text: "reflect" }
          ]
        },
        "2": {
          correct: "pass through",
          options: [
            { val: "pass through", text: "pass through" },
            { val: "disperse", text: "disperse" }
          ]
        }
      },
      expEn: "Filters work by subtraction. They absorb the unwanted colours (turning that energy into heat) and only let their own colour pass through.",
      expVn: "Kính lọc hoạt động bằng phép trừ. Chúng hấp thụ những màu không mong muốn (biến năng lượng đó thành nhiệt) và chỉ cho phép màu của chính chúng đi qua."
    },
    {
      id: "q9_mcq_double_filter",
      type: "mcq",
      title: "9. Look at the experiment below. White light is shone through a Red Filter, and then immediately through a Green Filter. What will appear on the final screen?",
      inlineSvg: DIAGRAMS.FILTER_DOUBLE_EXPERIMENT,
      options: [
        { val: "A", text: "A. Red Light" },
        { val: "B", text: "B. Green Light" },
        { val: "C", text: "C. Yellow Light" },
        { val: "D", text: "D. No Light (Black)" }
      ],
      correct: "D",
      expEn: "The red filter lets only red light pass. When that pure red light hits the green filter, the green filter absorbs it completely. Since no light makes it through, the screen is dark (black).",
      expVn: "Kính lọc đỏ chỉ cho ánh sáng đỏ đi qua. Khi ánh sáng đỏ tinh khiết đó chạm vào kính lọc lục, kính lọc lục sẽ hấp thụ nó hoàn toàn. Vì không có ánh sáng nào lọt qua, màn hình sẽ tối (đen)."
    },
    {
      id: "q10_inline_summary",
      type: "inline",
      title: "10. Read the scenario and select the correct scientific terms to complete the summary.",
      options: [],
      textParts: [
        "A student points a laser beam at a flat mirror. The beam bounces off, demonstrating the law of ",
        ". The beam then travels through the air and enters a thick block of water. This new ",
        " causes the laser to slow down and bend. Finally, the laser hits a blue plastic sheet which acts as a ",
        ", absorbing the unwanted colours."
      ],
      blanks: {
        "1": {
          correct: "reflection",
          options: [
            { val: "reflection", text: "reflection" },
            { val: "dispersion", text: "dispersion" }
          ]
        },
        "2": {
          correct: "medium",
          options: [
            { val: "spectrum", text: "spectrum" },
            { val: "medium", text: "medium" }
          ]
        },
        "3": {
          correct: "filter",
          options: [
            { val: "prism", text: "prism" },
            { val: "filter", text: "filter" }
          ]
        }
      },
      expEn: "Bouncing off a mirror is reflection. Moving into water means entering a new medium (causing refraction). A coloured plastic sheet is a filter.",
      expVn: "Bật ra khỏi gương là sự phản xạ. Đi vào nước có nghĩa là đi vào một môi trường mới (gây ra sự khúc xạ). Một tấm nhựa màu là một kính lọc."
    }
  ]
};
</file>

<file path="src/data/Y8/SCIENCE_1A/data.js">
// src/data/Y8/SCIENCE_1A/data.js
import { DIAGRAMS } from './diagrams.js';
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const SCIENCE_1A_DATA = {
  meta: {
    id: "SCIENCE_1A",
    title: "Light & Colour",
    desc: "Explore the laws of reflection, refraction, dispersion, and how coloured light behaves.",
    track: "Y8",
    icon: "Sun"
  },
  phases: {
    phase1: {
      unlocked: true,
      tasks: ["WORD_REC", "SPELLING", "READ_COMP", "DICTATION"]
    },
    phase2: {
      unlocked: false,
      tasks: ["VOCAB_WRITING", "SHORT_ANSWERS", "DIAGRAMS"]
    },
    phase3: {
      unlocked: false,
      tasks: ["ASSESSMENT", "ESSAY"]
    }
  },
  realWords: [
    { word: "Reflection", vn: "Phản xạ", def: "The bouncing of light rays off a surface like a mirror.", vnDef: "Sự bật lại của các tia sáng khi chạm vào một bề mặt như gương.", sent: "The law of reflection states that the angle of incidence equals the angle of reflection.", vnSent: "Định luật phản xạ phát biểu rằng góc tới bằng góc phản xạ.", dictSent: "Reflection happens when light bounces off a smooth surface.", isReal: true },
    { word: "Medium", vn: "Môi trường", def: "A material or substance that light travels through, such as air, water, or glass.", vnDef: "Vật liệu hoặc chất mà ánh sáng truyền qua, chẳng hạn như không khí, nước hoặc thủy tinh.", sent: "Light slows down when it enters a denser medium like a block of solid glass.", vnSent: "Ánh sáng đi chậm lại khi đi vào một môi trường đặc hơn như một khối thủy tinh đặc.", dictSent: "A medium is any substance that light can travel through.", isReal: true },
    { word: "Refraction", vn: "Khúc xạ", def: "The bending of light as it changes speed when passing from one medium to another.", vnDef: "Sự bẻ cong của ánh sáng do thay đổi tốc độ khi truyền từ môi trường này sang môi trường khác.", sent: "Refraction causes a pencil sitting in a glass of water to look completely broken.", vnSent: "Khúc xạ khiến một chiếc bút chì cắm trong cốc nước trông như bị gãy hoàn toàn.", dictSent: "Refraction is the bending of light as it changes speed.", isReal: true },
    { word: "Dispersion", vn: "Tán sắc", def: "The splitting of white light into its continuous spectrum of colours.", vnDef: "Sự phân tách của ánh sáng trắng thành một dải quang phổ màu liên tục.", sent: "Dispersion of sunlight through a glass prism creates a beautiful rainbow effect.", vnSent: "Sự tán sắc của ánh sáng mặt trời qua lăng kính thủy tinh tạo ra hiệu ứng cầu vồng tuyệt đẹp.", dictSent: "Dispersion splits white light into a spectrum of colours.", isReal: true },
    { word: "Normal Line", vn: "Pháp tuyến", def: "An imaginary dashed line drawn exactly at 90 degrees to a reflecting surface.", vnDef: "Một đường đứt nét tưởng tượng được vẽ vuông góc chính xác 90 độ với bề mặt phản xạ.", sent: "In physics, we always measure the angle of a light ray starting from the normal line.", vnSent: "Trong vật lý, chúng ta luôn đo góc của tia sáng bắt đầu từ đường pháp tuyến.", dictSent: "The normal line is drawn at ninety degrees to the mirror.", isReal: true },
    { word: "Incident Ray", vn: "Tia tới", def: "The incoming ray of light that strikes a surface.", vnDef: "Tia sáng đi tới đập vào một bề mặt.", sent: "The incident ray travels towards the glass block before it hits the surface and bends.", vnSent: "Tia tới truyền về phía khối thủy tinh trước khi nó chạm vào bề mặt và bị bẻ cong.", dictSent: "The incident ray travels directly toward the surface.", isReal: true },
    { word: "Spectrum", vn: "Quang phổ", def: "The band of colours produced when light is separated, such as by a prism.", vnDef: "Dải màu được tạo ra khi ánh sáng bị tách ra, chẳng hạn như bởi lăng kính.", sent: "Red, green, and violet are all colours found naturally in the visible spectrum.", vnSent: "Đỏ, lục và tím đều là những màu được tìm thấy trong tự nhiên trong quang phổ nhìn thấy được.", dictSent: "A rainbow is a natural example of the visible light spectrum.", isReal: true },
    { word: "Prism", vn: "Lăng kính", def: "A transparent, triangular piece of glass used to disperse white light.", vnDef: "Một khối thủy tinh trong suốt, hình tam giác được sử dụng để tán sắc ánh sáng trắng.", sent: "When white light enters the prism, the dense glass splits it into seven distinct colours.", vnSent: "Khi ánh sáng trắng đi vào lăng kính, lớp thủy tinh đặc sẽ phân tách nó thành bảy màu riêng biệt.", dictSent: "A glass prism can bend and separate white light.", isReal: true },
    { word: "Primary Colours", vn: "Màu cơ bản", def: "The three colours of light (red, green, blue) that can be mixed to make white light.", vnDef: "Ba màu của ánh sáng (đỏ, lục, lam) có thể được pha trộn để tạo ra ánh sáng trắng.", sent: "By adding the three primary colours of light together, you get pure white.", vnSent: "Bằng cách cộng ba màu cơ bản của ánh sáng lại với nhau, bạn sẽ có màu trắng tinh khiết.", dictSent: "Red, green, and blue are the primary colours of light.", isReal: true },
    { word: "Secondary Colours", vn: "Màu thứ cấp", def: "Colours of light created by mixing two primary colours together (cyan, magenta, and yellow).", vnDef: "Các màu của ánh sáng được tạo ra bằng cách trộn hai màu cơ bản với nhau (xanh lơ, đỏ thắm và vàng).", sent: "Cyan is a secondary colour created by adding green and blue light together.", vnSent: "Xanh lơ là một màu thứ cấp được tạo ra bằng cách cộng ánh sáng lục và lam lại với nhau.", dictSent: "Adding two primary colours creates a secondary colour.", isReal: true },
    { word: "Filter", vn: "Kính lọc", def: "A transparent material that absorbs certain colours and lets others pass through.", vnDef: "Một vật liệu trong suốt hấp thụ một số màu nhất định và cho phép những màu khác đi qua.", sent: "A red filter will absorb green and blue light, but let red light pass safely through.", vnSent: "Kính lọc đỏ sẽ hấp thụ ánh sáng lục và lam, nhưng cho phép ánh sáng đỏ đi qua một cách an toàn.", dictSent: "A filter absorbs unwanted colours and passes its own colour.", isReal: true }
  ],
  fakeWords: [
    { word: "Reflectation", imitating: "Reflection", isReal: false },
    { word: "Mediumate", imitating: "Medium", isReal: false },
    { word: "Refractance", imitating: "Refraction", isReal: false },
    { word: "Dispersity", imitating: "Dispersion", isReal: false },
    { word: "Normalizer", imitating: "Normal Line", isReal: false },
    { word: "Incidentor", imitating: "Incident Ray", isReal: false },
    { word: "Spectron", imitating: "Spectrum", isReal: false },
    { word: "Prismate", imitating: "Prism", isReal: false },
    { word: "Primer Colours", imitating: "Primary Colours", isReal: false },
    { word: "Second Colours", imitating: "Secondary Colours", isReal: false },
    { word: "Filteration", imitating: "Filter", isReal: false }
  ],
  dictation: [
    { sent: "Reflection happens when light bounces off a smooth surface.", vnSent: "Phản xạ xảy ra khi ánh sáng bật ra khỏi một bề mặt nhẵn." },
    { sent: "A medium is any substance that light can travel through.", vnSent: "Môi trường là bất kỳ chất nào mà ánh sáng có thể truyền qua." },
    { sent: "Refraction is the bending of light as it changes speed.", vnSent: "Khúc xạ là sự bẻ cong của ánh sáng khi nó thay đổi tốc độ." },
    { sent: "Dispersion splits white light into a spectrum of colours.", vnSent: "Sự tán sắc chia ánh sáng trắng thành một quang phổ màu." },
    { sent: "The normal line is drawn at ninety degrees to the mirror.", vnSent: "Đường pháp tuyến được vẽ vuông góc chín mươi độ với gương." },
    { sent: "The incident ray travels directly toward the surface.", vnSent: "Tia tới truyền trực tiếp về phía bề mặt." },
    { sent: "A rainbow is a natural example of the visible light spectrum.", vnSent: "Cầu vồng là một ví dụ tự nhiên về quang phổ ánh sáng nhìn thấy được." },
    { sent: "A glass prism can bend and separate white light.", vnSent: "Một lăng kính thủy tinh có thể bẻ cong và phân tách ánh sáng trắng." },
    { sent: "Red, green, and blue are the primary colours of light.", vnSent: "Đỏ, lục và lam là những màu cơ bản của ánh sáng." },
    { sent: "Adding two primary colours creates a secondary colour.", vnSent: "Việc cộng hai màu cơ bản tạo ra một màu thứ cấp." },
    { sent: "A filter absorbs unwanted colours and passes its own colour.", vnSent: "Kính lọc hấp thụ những màu không mong muốn và cho phép màu của chính nó đi qua." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "The Law of the Mirror",
      text: "When an {incident ray} of light strikes a perfectly flat mirror, it bounces off in a very predictable way. To calculate this bounce, scientists draw a {normal line} exactly at 90 degrees to the surface. The law of {reflection} states that the angle at which the light hits the normal will always perfectly match the angle at which it leaves. This is why mirrors create such accurate images.",
      vnTitle: "Định luật của Gương",
      vnText: "Khi một {incident ray} của ánh sáng đập vào một chiếc gương phẳng hoàn hảo, nó bật lại theo một cách rất dễ đoán. Để tính toán độ bật này, các nhà khoa học vẽ một {normal line} vuông góc chính xác 90 độ với bề mặt. Định luật {reflection} phát biểu rằng góc mà ánh sáng đập vào pháp tuyến sẽ luôn khớp hoàn hảo với góc mà nó rời đi. Đây là lý do tại sao gương tạo ra những hình ảnh chính xác như vậy."
    },
    {
      id: "passage_2",
      title: "The Bending Illusion",
      text: "Have you ever noticed that your legs look shorter when you stand in a swimming pool? This optical illusion is caused by {refraction}. When light leaves the water and enters the air, it moves into a different {medium}. Because air is less dense than water, the light speeds up and bends away from the normal. This bending makes our eyes believe the object is in a different location than it actually is.",
      vnTitle: "Ảo giác Bẻ cong",
      vnText: "Bạn đã bao giờ nhận thấy chân mình trông ngắn hơn khi đứng trong hồ bơi chưa? Ảo giác quang học này được gây ra bởi {refraction}. Khi ánh sáng rời khỏi mặt nước và đi vào không khí, nó di chuyển vào một {medium} khác. Vì không khí ít đặc hơn nước, ánh sáng tăng tốc và uốn cong ra xa pháp tuyến. Sự bẻ cong này làm cho mắt chúng ta tin rằng vật thể đang ở một vị trí khác với thực tế."
    },
    {
      id: "passage_3",
      title: "Splitting the Rainbow",
      text: "White light is a trick played on our eyes. It is actually a mixture of many different colours. When white light passes through a {prism}, the glass slows each colour down by a slightly different amount. Red light slows down the least, so it bends the least. Violet light slows down the most. This causes the light to fan out into a beautiful {spectrum}, a process known to scientists as {dispersion}.",
      vnTitle: "Phân tách Cầu vồng",
      vnText: "Ánh sáng trắng là một trò đánh lừa đôi mắt của chúng ta. Nó thực chất là một hỗn hợp của nhiều màu sắc khác nhau. Khi ánh sáng trắng đi qua một {prism}, thủy tinh làm chậm mỗi màu lại với một mức độ hơi khác nhau. Ánh sáng đỏ chậm lại ít nhất, nên nó bẻ cong ít nhất. Ánh sáng tím chậm lại nhiều nhất. Điều này khiến ánh sáng xòe ra thành một {spectrum} tuyệt đẹp, một quá trình được các nhà khoa học gọi là {dispersion}."
    },
    {
      id: "passage_4",
      title: "Painting with Light",
      text: "When an artist paints, mixing all the colours together creates a dark, muddy brown. However, light behaves completely differently. In physics, the {Primary Colours} of light are red, green, and blue. If you shine all three of these lights together, they combine to create pure white light! By mixing just two primary colours, you can create bright {Secondary Colours}. For example, mixing red and green light creates yellow, while blue and red create magenta.",
      vnTitle: "Vẽ tranh bằng Ánh sáng",
      vnText: "Khi một họa sĩ vẽ tranh, việc trộn tất cả các màu lại với nhau sẽ tạo ra một màu nâu tối và đục. Tuy nhiên, ánh sáng hoạt động hoàn toàn khác. Trong vật lý, các {Primary Colours} của ánh sáng là đỏ, lục và lam. Nếu bạn chiếu cả ba ánh sáng này cùng nhau, chúng sẽ kết hợp để tạo ra ánh sáng trắng tinh khiết! Bằng cách trộn chỉ hai màu cơ bản, bạn có thể tạo ra các {Secondary Colours} rực rỡ. Ví dụ, trộn ánh sáng đỏ và lục tạo ra màu vàng, trong khi ánh sáng lam và đỏ tạo ra màu đỏ thắm."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Light & Colour Rules",
    vnTitle: "Bài 1A: Các Quy tắc về Ánh sáng & Màu sắc",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập của bạn.",
    sections: [
      {
        heading: "1. Reflection & Refraction",
        vnHeading: "1. Phản xạ & Khúc xạ",
        text: "**Reflection** happens when light bounces off a surface. The angle of the **Incident Ray** always equals the angle of reflection. **Refraction** happens when light changes speed because it enters a different **Medium** (like glass), causing the ray to bend.",
        vnText: "**Phản xạ** xảy ra khi ánh sáng bật ra khỏi một bề mặt. Góc của **Tia tới** luôn bằng góc phản xạ. **Khúc xạ** xảy ra khi ánh sáng thay đổi tốc độ vì nó đi vào một **Môi trường** khác (như thủy tinh), khiến tia sáng bị bẻ cong."
      },
      {
        heading: "2. Dispersion",
        vnHeading: "2. Tán sắc",
        text: "White light is a mix of colours. A **Prism** causes **Dispersion**, splitting white light into a continuous **Spectrum**. Red bends the least, while violet bends the most.",
        vnText: "Ánh sáng trắng là một hỗn hợp các màu. Một **Lăng kính** gây ra sự **Tán sắc**, phân tách ánh sáng trắng thành một **Quang phổ** liên tục. Màu đỏ bẻ cong ít nhất, trong khi màu tím bẻ cong nhiều nhất."
      },
      {
        heading: "3. Mixing & Filtering Colour",
        vnHeading: "3. Pha trộn & Lọc Màu",
        text: "The **Primary Colours** of light are Red, Green, and Blue. Mixing them creates **Secondary Colours** like Cyan, Magenta, and Yellow. A **Filter** only allows its own colour to pass through, absorbing all other colours.",
        vnText: "**Màu cơ bản** của ánh sáng là Đỏ, Lục và Lam. Trộn chúng tạo ra các **Màu thứ cấp** như Xanh lơ, Đỏ thắm và Vàng. Một **Kính lọc** chỉ cho phép màu của chính nó đi qua, hấp thụ tất cả các màu khác."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "According to the Law of Reflection, what is the relationship between the angle of incidence and the angle of reflection?",
      requiredWords: [["equal", "same"]],
      scienceMaxMarks: 1,
      markScheme: [
        "1 mark for stating that the angles are always equal to each other."
      ],
      modelAnswer: "The angle of incidence is exactly equal to the angle of reflection."
    },
    {
      id: "q2",
      question: "Explain what happens to the speed and direction of a light ray when it enters a glass block from the air.",
      requiredWords: [["slow", "slower", "slows down"], ["towards", "closer"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that the light slows down.",
        "1 mark for stating that it bends towards the normal line."
      ],
      modelAnswer: "When light enters the denser glass block, it slows down. This change in speed causes the light to bend towards the normal line."
    },
    {
      id: "q3",
      question: "When white light passes through a prism, why does violet light appear at the bottom of the spectrum while red light is at the top?",
      requiredWords: [["red", "least"], ["violet", "most"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that red light bends (or slows down) the least.",
        "1 mark for explaining that violet light bends (or slows down) the most."
      ],
      modelAnswer: "Violet light bends the most when it enters the prism, pushing it to the bottom. Red light bends the least, keeping it near the top."
    }
  ],
  diagrams: [
    {
      id: "d1",
      inlineSvg: DIAGRAMS.DATA_REFLECTION_55,
      promptText: "Look at the diagram showing an incident ray hitting a mirror. Calculate the angle of the missing reflected ray and state the law that proves your answer.",
      requiredWords: [["equal", "same", "reflection"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for correctly stating the angle is 55 degrees.",
        "1 mark for referencing the Law of Reflection (angle of incidence equals angle of reflection)."
      ],
      modelAnswer: "The reflected ray will be exactly 55 degrees. This is because the Law of Reflection states that the angle of incidence is always equal to the angle of reflection."
    },
    {
      id: "d2",
      inlineSvg: DIAGRAMS.DATA_REFRACTION_GLASS_BLOCK,
      promptText: "The diagram shows refraction through a glass block. Compare what is happening to the light ray at point A (inside the glass) and point B (exiting the glass). Based on this bending, what can you infer about the glass block compared to the air?",
      requiredWords: [["towards", "closer"], ["away", "further"], ["medium"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for stating that at A, the light bends towards the normal.",
        "1 mark for stating that at B, the light bends away from the normal.",
        "1 mark for inferring that the glass block is a denser medium than the air (causing the light to change speed)."
      ],
      modelAnswer: "At point A, the light bends towards the normal line. At point B, it bends away from the normal. Because the light bends towards the normal when entering the block, we can infer that the glass is a denser medium than the air."
    },
    {
      id: "d3",
      inlineSvg: DIAGRAMS.FILTER_DOUBLE_EXPERIMENT,
      promptText: "Lily sets up an experiment shining white light through a red filter, and then a green filter. Predict what she will see on the screen. Explain your reasoning using the words 'absorb' and 'pass'.",
      requiredWords: [["black", "nothing", "no light", "dark"], ["absorb", "absorbs", "absorbed"], ["pass", "passes"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for predicting that the screen will be dark/black (no light).",
        "1 mark for explaining that the red filter lets only red light pass (absorbing the rest).",
        "1 mark for explaining that the green filter absorbs the red light, letting nothing pass."
      ],
      modelAnswer: "Lily will see no light (black) on the screen. The first filter lets only red light pass through and absorbs the rest. When that red light hits the green filter, the green filter absorbs it completely, leaving total darkness."
    }
  ],
  essay: {
    task: "Explain the process of Dispersion. In your answer, describe what happens when white light passes through a glass prism, explain why the colours separate, and list the colours of the visible spectrum in the correct order.",
    guidelines: [
      "Define what white light is made of.",
      "Explain the role of the prism in changing the speed of different colours.",
      "List the 7 colours of the spectrum in order from least bent to most bent."
    ],
    requiredWords: [
      ["prism"], 
      ["speed", "slow", "bend", "refract"], 
      ["spectrum", "dispersion"], 
      ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for explaining that a prism separates white light because different colours slow down/bend by different amounts.",
      "1 mark for using the correct scientific terms (dispersion and spectrum).",
      "1 mark for listing the colours in the correct order (ROYGBIV)."
    ],
    modelAnswer: "Dispersion is the process of splitting white light into its continuous spectrum. White light is actually a mixture of all visible colours. When it passes through a glass prism, the glass causes the light to slow down and bend (refract). However, each colour slows down by a slightly different amount. Red light slows down the least, so it bends the least, while violet slows down and bends the most. This causes the light to fan out into the visible spectrum in this exact order: Red, Orange, Yellow, Green, Blue, Indigo, and Violet."
  },
  assessment,
  notes,
  workbook,
  games
};
</file>

<file path="src/data/Y8/SCIENCE_1A/diagrams.js">
// src/data/Y8/SCIENCE_1A/diagrams.js

export const DIAGRAMS = {
  // --- ASSESSMENT DIAGRAMS ---
  ASSESSMENT_REFLECTION_40: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <line x1="50" y1="200" x2="350" y2="200" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <path d="M 60 200 L 40 220 M 100 200 L 80 220 M 140 200 L 120 220 M 180 200 L 160 220 M 220 200 L 200 220 M 260 200 L 240 220 M 300 200 L 280 220 M 340 200 L 320 220" stroke="#94a3b8" stroke-width="2"/>
        
        <line x1="200" y1="50" x2="200" y2="200" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
        <text x="200" y="40" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">Normal Line</text>
        
        <line x1="80" y1="60" x2="200" y2="200" stroke="#ef4444" stroke-width="4"/>
        <polygon points="135,124 150,143 130,140" fill="#ef4444" transform="rotate(-10 140 130)"/>
        
        <line x1="200" y1="200" x2="320" y2="60" stroke="#3b82f6" stroke-width="4" stroke-dasharray="6"/>
        <text x="310" y="50" font-family="sans-serif" font-weight="bold" font-size="24" fill="#3b82f6" text-anchor="start">?</text>

        <path d="M 160 153 A 60 60 0 0 1 200 140" fill="none" stroke="#ef4444" stroke-width="3"/>
        <text x="160" y="135" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">40 degrees</text>
      </svg>`,

  ASSESSMENT_DENSITY_INFERENCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full drop-shadow-md">
        <rect x="50" y="20" width="300" height="130" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/>
        <text x="70" y="50" font-family="sans-serif" font-weight="bold" font-size="18" fill="#0284c7">Medium A</text>
        
        <rect x="50" y="150" width="300" height="130" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
        <text x="70" y="260" font-family="sans-serif" font-weight="bold" font-size="18" fill="#64748b">Medium B</text>
        
        <line x1="200" y1="40" x2="200" y2="260" stroke="#64748b" stroke-width="3" stroke-dasharray="8"/>
        
        <line x1="120" y1="40" x2="200" y2="150" stroke="#eab308" stroke-width="4"/>
        <polygon points="150,81 165,100 145,98" fill="#eab308" transform="rotate(-10 155 90)"/>
        
        <line x1="200" y1="150" x2="340" y2="200" stroke="#eab308" stroke-width="4"/>
        <polygon points="260,171 275,190 255,188" fill="#eab308" transform="rotate(-35 265 180)"/>
        
        <path d="M 175 115 A 40 40 0 0 0 200 100" fill="none" stroke="#ef4444" stroke-width="3"/>
        <path d="M 200 200 A 50 50 0 0 0 280 180" fill="none" stroke="#3b82f6" stroke-width="3"/>
      </svg>`,

  FILTER_DOUBLE_EXPERIMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 200" class="w-full h-full drop-shadow-md">
        <line x1="20" y1="100" x2="110" y2="100" stroke="#64748b" stroke-width="6"/>
        <polygon points="110,90 120,100 110,110" fill="#64748b"/>
        <text x="60" y="80" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">White Light</text>

        <rect x="140" y="40" width="20" height="120" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
        <text x="150" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="middle">Red Filter</text>

        <line x1="160" y1="100" x2="270" y2="100" stroke="#ef4444" stroke-width="6"/>
        <polygon points="270,90 280,100 270,110" fill="#ef4444"/>

        <rect x="300" y="40" width="20" height="120" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
        <text x="310" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#22c55e" text-anchor="middle">Green Filter</text>

        <line x1="410" y1="40" x2="410" y2="160" stroke="#1e293b" stroke-width="4"/>
        <text x="410" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">Screen</text>
        
        <circle cx="365" cy="100" r="16" fill="white" stroke="#1e293b" stroke-width="3" stroke-dasharray="4"/>
        <text x="365" y="106" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1e293b" text-anchor="middle">?</text>
      </svg>`,

  // --- SHORT QA & ANALYSIS DIAGRAMS ---
  DATA_REFLECTION_55: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
        <line x1="50" y1="200" x2="350" y2="200" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <path d="M 60 200 L 40 220 M 100 200 L 80 220 M 140 200 L 120 220 M 180 200 L 160 220 M 220 200 L 200 220 M 260 200 L 240 220 M 300 200 L 280 220 M 340 200 L 320 220" stroke="#94a3b8" stroke-width="2"/>
        
        <line x1="200" y1="50" x2="200" y2="200" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
        
        <line x1="80" y1="80" x2="200" y2="200" stroke="#ef4444" stroke-width="4"/>
        <polygon points="135,125 148,142 130,140" fill="#ef4444" transform="rotate(-15 135 135)"/>
        
        <line x1="200" y1="200" x2="320" y2="80" stroke="#3b82f6" stroke-width="4" stroke-dasharray="6"/>
        <text x="310" y="70" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6" text-anchor="start">?</text>

        <path d="M 170 170 A 42 42 0 0 1 200 158" fill="none" stroke="#ef4444" stroke-width="3"/>
        <text x="160" y="145" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">55 degrees</text>
      </svg>`,

  DATA_REFRACTION_GLASS_BLOCK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full drop-shadow-md">
        <rect x="100" y="100" width="200" height="100" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4" rx="4"/>
        
        <line x1="160" y1="50" x2="160" y2="150" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6"/>
        <line x1="240" y1="150" x2="240" y2="250" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6"/>
        
        <line x1="80" y1="40" x2="160" y2="100" stroke="#eab308" stroke-width="4"/>
        <polygon points="110,50 125,68 105,65" fill="#eab308" transform="rotate(-10 115 60)"/>
        
        <line x1="160" y1="100" x2="240" y2="200" stroke="#ef4444" stroke-width="5"/>
        <text x="180" y="145" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ef4444">A</text>
        
        <line x1="240" y1="200" x2="320" y2="260" stroke="#3b82f6" stroke-width="5"/>
        <text x="290" y="225" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6">B</text>
      </svg>`,

  // --- LECTURE NOTES SLIDES ---
  NOTES_INCIDENT_RAY_NORMAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="100" y1="180" x2="300" y2="180" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <path d="M 110 180 L 95 195 M 140 180 L 125 195 M 170 180 L 155 195 M 200 180 L 185 195 M 230 180 L 215 195 M 260 180 L 245 195 M 290 180 L 275 195" stroke="#94a3b8" stroke-width="2"/>
      
      <line x1="200" y1="40" x2="200" y2="180" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
      <text x="200" y="30" font-family="sans-serif" font-weight="bold" font-size="16" fill="#64748b" text-anchor="middle">Normal Line</text>
      
      <line x1="100" y1="60" x2="200" y2="180" stroke="#ef4444" stroke-width="4"/>
      <polygon points="145,114 160,135 140,129" fill="#ef4444" transform="rotate(-10 150 120)"/>
      <text x="90" y="50" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="end">Incident Ray</text>
      
      <rect x="200" y="165" width="15" height="15" fill="none" stroke="#64748b" stroke-width="2"/>
    </svg>`,

  NOTES_LAW_OF_REFLECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <line x1="80" y1="180" x2="320" y2="180" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <path d="M 90 180 L 75 195 M 130 180 L 115 195 M 170 180 L 155 195 M 210 180 L 195 195 M 250 180 L 235 195 M 290 180 L 275 195" stroke="#94a3b8" stroke-width="2"/>
      
      <line x1="200" y1="40" x2="200" y2="180" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
      
      <line x1="100" y1="60" x2="200" y2="180" stroke="#ef4444" stroke-width="4"/>
      <polygon points="145,114 160,135 140,129" fill="#ef4444" transform="rotate(-10 150 120)"/>
      
      <line x1="200" y1="180" x2="300" y2="60" stroke="#3b82f6" stroke-width="4"/>
      <polygon points="245,129 260,135 255,114" fill="#3b82f6" transform="rotate(20 250 120)"/>
      <text x="310" y="50" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6" text-anchor="start">Reflected Ray</text>
      
      <path d="M 160 132 A 62 62 0 0 1 200 118" fill="none" stroke="#ef4444" stroke-width="3"/>
      <text x="175" y="140" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ef4444">i</text>
      
      <path d="M 200 118 A 62 62 0 0 1 240 132" fill="none" stroke="#3b82f6" stroke-width="3"/>
      <text x="215" y="140" font-family="sans-serif" font-weight="bold" font-size="20" fill="#3b82f6">r</text>
    </svg>`,

  NOTES_MEDIUMS_SPEED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="30" y="50" width="150" height="150" rx="12" fill="#f0f9ff" stroke="#bae6fd" stroke-width="4"/>
      <text x="105" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="#0284c7" text-anchor="middle">Air (Thin Medium)</text>
      <circle cx="60" cy="110" r="3" fill="#7dd3fc"/>
      <circle cx="140" cy="160" r="3" fill="#7dd3fc"/>
      <circle cx="80" cy="180" r="3" fill="#7dd3fc"/>
      <circle cx="120" cy="120" r="3" fill="#7dd3fc"/>
      
      <line x1="40" y1="140" x2="160" y2="140" stroke="#eab308" stroke-width="3" stroke-dasharray="12 4"/>
      <polygon points="160,140 150,135 150,145" fill="#eab308"/>
      <text x="105" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="middle">Fast Light Speed</text>

      <rect x="220" y="50" width="150" height="150" rx="12" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/>
      <text x="295" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="#0369a1" text-anchor="middle">Glass (Dense)</text>
      
      <circle cx="240" cy="110" r="4" fill="#38bdf8"/>
      <circle cx="260" cy="130" r="4" fill="#38bdf8"/>
      <circle cx="280" cy="100" r="4" fill="#38bdf8"/>
      <circle cx="300" cy="140" r="4" fill="#38bdf8"/>
      <circle cx="320" cy="115" r="4" fill="#38bdf8"/>
      <circle cx="340" cy="160" r="4" fill="#38bdf8"/>
      <circle cx="250" cy="170" r="4" fill="#38bdf8"/>
      <circle cx="290" cy="180" r="4" fill="#38bdf8"/>
      <circle cx="330" cy="130" r="4" fill="#38bdf8"/>

      <line x1="230" y1="140" x2="350" y2="140" stroke="#eab308" stroke-width="6"/>
      <polygon points="350,140 340,132 340,148" fill="#eab308"/>
      <text x="295" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0369a1" text-anchor="middle">Slow Light Speed</text>
    </svg>`,

  NOTES_REFRACTION_ENTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="100" y="120" width="200" height="120" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/>
      <text x="200" y="220" font-family="sans-serif" font-weight="bold" font-size="16" fill="#0284c7" text-anchor="middle">Glass Block</text>
      
      <line x1="200" y1="40" x2="200" y2="180" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
      
      <line x1="120" y1="20" x2="200" y2="120" stroke="#eab308" stroke-width="4"/>
      <polygon points="155,60 170,80 150,75" fill="#eab308" transform="rotate(-15 160 70)"/>
      
      <line x1="200" y1="120" x2="240" y2="240" stroke="#eab308" stroke-width="4"/>
      
      <path d="M 200 160 A 40 40 0 0 0 213 160" fill="none" stroke="#ef4444" stroke-width="3"/>
      <text x="260" y="150" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">Bends Towards</text>
      <path d="M 255 145 L 220 155" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow_red)"/>
      
      <defs>
        <marker id="arrow_red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#ef4444"/>
        </marker>
      </defs>
    </svg>`,

  NOTES_REFRACTION_EXIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <rect x="100" y="50" width="200" height="100" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/>
      
      <line x1="160" y1="20" x2="160" y2="100" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6"/>
      <line x1="240" y1="100" x2="240" y2="200" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6"/>
      
      <line x1="80" y1="10" x2="160" y2="50" stroke="#eab308" stroke-width="4"/>
      <line x1="160" y1="50" x2="240" y2="150" stroke="#eab308" stroke-width="4"/>
      <line x1="240" y1="150" x2="320" y2="190" stroke="#eab308" stroke-width="4"/>
      <polygon points="275,162 290,180 270,175" fill="#eab308" transform="rotate(-15 280 170)"/>
      
      <path d="M 240 180 A 30 30 0 0 0 295 178" fill="none" stroke="#ef4444" stroke-width="3"/>
      <text x="250" y="215" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">Bends Away</text>
    </svg>`,

  NOTES_WHITE_LIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
      <circle cx="80" cy="100" r="40" fill="#fef08a" opacity="0.8"/>
      <circle cx="80" cy="100" r="20" fill="#ffffff"/>
      <line x1="130" y1="100" x2="320" y2="100" stroke="#cbd5e1" stroke-width="12" stroke-linecap="round"/>
      <polygon points="240,85 260,100 240,115" fill="#cbd5e1"/>
      <text x="200" y="80" font-family="sans-serif" font-weight="bold" font-size="18" fill="#64748b" text-anchor="middle">Pure White Light</text>
    </svg>`,

  NOTES_DISPERSION_PRISM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" class="w-full h-full drop-shadow-md">
      <polygon points="200,40 120,200 280,200" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" stroke-linejoin="round"/>
      
      <line x1="20" y1="140" x2="160" y2="120" stroke="#475569" stroke-width="6"/>
      <text x="80" y="120" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569" text-anchor="middle">White Light</text>
      
      <line x1="160" y1="120" x2="235" y2="110" stroke="#ef4444" stroke-width="3"/>
      <line x1="160" y1="120" x2="245" y2="130" stroke="#22c55e" stroke-width="3"/>
      <line x1="160" y1="120" x2="255" y2="150" stroke="#8b5cf6" stroke-width="3"/>
      
      <line x1="235" y1="110" x2="400" y2="80" stroke="#ef4444" stroke-width="5"/>
      <line x1="245" y1="130" x2="400" y2="120" stroke="#22c55e" stroke-width="5"/>
      <line x1="255" y1="150" x2="400" y2="160" stroke="#8b5cf6" stroke-width="5"/>
      
      <text x="420" y="85" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">Red (Bends Least)</text>
      <text x="420" y="165" font-family="sans-serif" font-weight="bold" font-size="14" fill="#8b5cf6">Violet (Bends Most)</text>
    </svg>`,

  NOTES_VISIBLE_SPECTRUM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" class="w-full h-full drop-shadow-md">
      <rect x="50" y="40" width="300" height="120" rx="8" fill="#1e293b"/>
      <rect x="100" y="40" width="28" height="120" fill="#ef4444"/>
      <rect x="128" y="40" width="28" height="120" fill="#f97316"/>
      <rect x="156" y="40" width="28" height="120" fill="#eab308"/>
      <rect x="184" y="40" width="28" height="120" fill="#22c55e"/>
      <rect x="212" y="40" width="28" height="120" fill="#3b82f6"/>
      <rect x="240" y="40" width="28" height="120" fill="#4f46e5"/>
      <rect x="268" y="40" width="28" height="120" fill="#a855f7"/>
      
      <text x="114" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#ef4444" text-anchor="middle">R</text>
      <text x="142" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#f97316" text-anchor="middle">O</text>
      <text x="170" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#eab308" text-anchor="middle">Y</text>
      <text x="198" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#22c55e" text-anchor="middle">G</text>
      <text x="226" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#3b82f6" text-anchor="middle">B</text>
      <text x="254" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#4f46e5" text-anchor="middle">I</text>
      <text x="282" y="180" font-family="sans-serif" font-weight="900" font-size="16" fill="#a855f7" text-anchor="middle">V</text>
    </svg>`,

  NOTES_PRIMARY_COLOURS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
      <circle cx="100" cy="125" r="40" fill="#ef4444"/>
      <text x="100" y="190" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444" text-anchor="middle">Red</text>
      
      <circle cx="200" cy="125" r="40" fill="#22c55e"/>
      <text x="200" y="190" font-family="sans-serif" font-weight="bold" font-size="16" fill="#22c55e" text-anchor="middle">Green</text>
      
      <circle cx="300" cy="125" r="40" fill="#3b82f6"/>
      <text x="300" y="190" font-family="sans-serif" font-weight="bold" font-size="16" fill="#3b82f6" text-anchor="middle">Blue</text>
      
      <text x="150" y="132" font-family="sans-serif" font-weight="900" font-size="24" fill="#64748b" text-anchor="middle">+</text>
      <text x="250" y="132" font-family="sans-serif" font-weight="900" font-size="24" fill="#64748b" text-anchor="middle">+</text>
    </svg>`,

  NOTES_SECONDARY_VENN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350" class="w-full h-full drop-shadow-md">
      <defs>
        <circle id="C_Red" cx="240" cy="130" r="70"/>
        <circle id="C_Green" cx="160" cy="130" r="70"/>
        <circle id="C_Blue" cx="200" cy="200" r="70"/>

        <clipPath id="clip_R"><use href="#C_Red"/></clipPath>
        <clipPath id="clip_G"><use href="#C_Green"/></clipPath>
        <clipPath id="clip_B"><use href="#C_Blue"/></clipPath>
        <clipPath id="clip_RG" clip-path="url(#clip_R)"><use href="#C_Green"/></clipPath>
      </defs>

      <use href="#C_Red" fill="#ef4444" />
      <use href="#C_Green" fill="#22c55e" />
      <use href="#C_Blue" fill="#3b82f6" />

      <use href="#C_Green" fill="#fef08a" clip-path="url(#clip_R)" />
      <use href="#C_Blue" fill="#f472b6" clip-path="url(#clip_R)" /> 
      <use href="#C_Blue" fill="#22d3ee" clip-path="url(#clip_G)" /> 

      <use href="#C_Blue" fill="#ffffff" clip-path="url(#clip_RG)" />

      <rect x="150" y="10" width="100" height="30" fill="white" stroke="#1e293b" stroke-width="2"/>
      <text x="200" y="30" font-family="sans-serif" font-weight="bold" font-size="14" fill="#eab308" text-anchor="middle">Yellow</text>
      <path d="M 200 40 L 200 110" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow_dark)"/>

      <rect x="10" y="270" width="100" height="30" fill="white" stroke="#1e293b" stroke-width="2"/>
      <text x="60" y="290" font-family="sans-serif" font-weight="bold" font-size="14" fill="#06b6d4" text-anchor="middle">Cyan</text>
      <path d="M 110 285 L 160 210" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow_dark)"/>

      <rect x="290" y="270" width="100" height="30" fill="white" stroke="#1e293b" stroke-width="2"/>
      <text x="340" y="290" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ec4899" text-anchor="middle">Magenta</text>
      <path d="M 290 285 L 240 210" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow_dark)"/>

      <text x="140" y="130" font-family="sans-serif" font-weight="bold" font-size="16" fill="white" text-anchor="middle">Green</text>
      <text x="260" y="130" font-family="sans-serif" font-weight="bold" font-size="16" fill="white" text-anchor="middle">Red</text>
      <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="16" fill="white" text-anchor="middle">Blue</text>

      <defs>
        <marker id="arrow_dark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#1e293b"/>
        </marker>
      </defs>
    </svg>`,

  NOTES_COLOUR_FILTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 200" class="w-full h-full drop-shadow-md">
      <line x1="20" y1="100" x2="150" y2="100" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
      <polygon points="140,85 160,100 140,115" fill="#64748b"/>
      <text x="80" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="#64748b" text-anchor="middle">White Light</text>

      <rect x="180" y="40" width="30" height="120" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      <text x="195" y="25" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444" text-anchor="middle">Red Filter</text>

      <line x1="210" y1="100" x2="360" y2="100" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
      <polygon points="350,85 370,100 350,115" fill="#ef4444"/>
      <text x="290" y="80" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444" text-anchor="middle">Red Light Passes</text>
      
      <text x="195" y="180" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">(Absorbs Green &amp; Blue)</text>
    </svg>`
};
</file>

<file path="src/data/Y8/SCIENCE_1A/games.js">
// Example for Y8/MATH_1A/games.js
export const games = {
  gameConfig: {
    bannedTowers: [], 
    lives: 20,
    mapId: 'STRAIGHT' // Use 'STRAIGHT' for the Science unit
  }
};
</file>

<file path="src/data/Y8/SCIENCE_1A/notes.js">
// src/data/Y8/SCIENCE_1A/notes.js
import { DIAGRAMS } from './diagrams.js';
import { ReflectionWidget, FilterWidget, RGBWidget } from './widgets.jsx'; 

export const notes = [
  {
    type: "intro",
    title: "Light & Colour",
    titleVn: "Ánh sáng & Màu sắc",
    subtitle: "Objective: Understand reflection, refraction, dispersion, and colour addition.",
    subtitleVn: "Mục tiêu: Hiểu về sự phản xạ, khúc xạ, tán sắc và sự cộng màu.",
    color: "bg-[#0ea5e9]", 
    borderColor: "border-[#0284c7]",
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Light Rays & The Normal",
    titleVn: "Tia sáng & Pháp tuyến",
    icon: "Target",
    color: "bg-[#f59e0b]",
    content: "Light travels in perfectly straight lines called rays. When a light ray hits a smooth surface like a mirror, scientists draw a reference line to measure its bounce.\n\n> The **Normal** is an imaginary line drawn exactly at **90 degrees** to the surface.",
    contentVn: "Ánh sáng truyền đi theo những đường thẳng tắp gọi là tia sáng. Khi một tia sáng chạm vào một bề mặt nhẵn như gương, các nhà khoa học vẽ một đường tham chiếu để đo độ bật của nó.\n\n> **Pháp tuyến** là một đường tưởng tượng được vẽ chính xác ở góc **90 độ** so với bề mặt.",
    exampleLabel: "Measurement Rule",
    exampleLabelVn: "Quy tắc Đo lường",
    example: "We always measure angles starting from the Normal line, never from the mirror itself.",
    exampleVn: "Chúng bản luôn đo các góc bắt đầu từ đường Pháp tuyến, không bao giờ đo từ chính mặt gương.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_INCIDENT_RAY_NORMAL,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_2.mp3"
  },
  {
    type: "concept",
    title: "The Law of Reflection",
    titleVn: "Định luật Phản xạ",
    icon: "Target",
    color: "bg-[#f59e0b]",
    content: "When light hits a mirror, it bounces off in a very predictable and perfectly mirrored way.\n\n> The **Law of Reflection** states that the **Angle of Incidence** is always equal to the **Angle of Reflection**.",
    contentVn: "Khi ánh sáng đập vào gương, nó bật lại theo một cách rất dễ đoán và đối xứng hoàn hảo.\n\n> **Định luật Phản xạ** phát biểu rằng **Góc tới** luôn luôn bằng với **Góc phản xạ**.",
    exampleLabel: "Interactive Tool",
    exampleLabelVn: "Công cụ Tương tác",
    example: "Adjust the slider below to change the angle of the incident ray. Notice how the reflected ray mirrors it perfectly.",
    exampleVn: "Điều chỉnh thanh trượt bên dưới để thay đổi góc của tia tới. Hãy chú ý cách tia phản xạ đối xứng với nó một cách hoàn hảo.",
    drawThis: false,
    widget: ReflectionWidget,
    inlineSvg: DIAGRAMS.NOTES_LAW_OF_REFLECTION,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Mediums & Light",
    titleVn: "Môi trường & Ánh sáng",
    icon: "ShieldCheck",
    color: "bg-[#8b5cf6]",
    content: "Light travels incredibly fast, but its speed depends on the material it is passing through.\n\n> A **Medium** is any substance light travels through, like air, water, or glass.\n> Denser mediums cause light to **slow down**.",
    contentVn: "Ánh sáng truyền đi cực kỳ nhanh, nhưng tốc độ của nó phụ thuộc vào vật liệu mà nó đi qua.\n\n> Một **Môi trường** là bất kỳ chất nào mà ánh sáng truyền qua, như không khí, nước hoặc thủy tinh.\n> Những môi trường đặc hơn khiến ánh sáng **đi chậm lại**.",
    exampleLabel: "Analogy",
    exampleLabelVn: "Sự so sánh",
    example: "Air is a 'thin' medium, so light zips right through it. Glass is a 'dense' medium, acting like thick mud that slows the light down.",
    exampleVn: "Không khí là một môi trường 'loãng', nên ánh sáng lao qua nó một cách nhanh chóng. Thủy tinh là một môi trường 'đặc', hoạt động như lớp bùn dày làm chậm ánh sáng lại.",
    drawThis: false,
    inlineSvg: DIAGRAMS.NOTES_MEDIUMS_SPEED,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_4.mp3"
  },
  {
    type: "concept",
    title: "Refraction: Entering",
    titleVn: "Khúc xạ: Đi vào",
    icon: "ShieldCheck",
    color: "bg-[#8b5cf6]",
    content: "When light travels from air into a dense block of glass, the sudden change in speed causes it to change direction.\n\n> **Refraction** is light **bending** when moving between mediums.\n> Light bends **towards the normal** when entering a denser medium.",
    contentVn: "Khi ánh sáng truyền từ không khí vào một khối thủy tinh đặc, sự thay đổi tốc độ đột ngột khiến nó đổi hướng.\n\n> **Khúc xạ** là sự **bẻ cong** của ánh sáng khi di chuyển giữa các môi trường.\n> Ánh sáng uốn cong **về phía pháp tuyến** khi đi vào một môi trường đặc hơn.",
    exampleLabel: "Visualizing It",
    exampleLabelVn: "Hình dung",
    example: "Imagine a shopping cart rolling from smooth pavement into thick mud. The wheels hit the mud, slow down, and turn inward.",
    exampleVn: "Hãy tưởng tượng một chiếc xe đẩy siêu thị lăn từ vỉa hè nhẵn nhụi vào lớp bùn dày. Các bánh xe chạm bùn, chạy chậm lại và chuyển hướng vào trong.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_REFRACTION_ENTER,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_5.mp3"
  },
  {
    type: "concept",
    title: "Refraction: Exiting",
    titleVn: "Khúc xạ: Đi ra",
    icon: "ShieldCheck",
    color: "bg-[#8b5cf6]",
    content: "The opposite happens when the light ray finally escapes the glass block and returns to the air.\n\n> Light **speeds up** and bends **away from the normal** when entering a less dense medium.",
    contentVn: "Điều ngược lại xảy ra khi tia sáng cuối cùng thoát ra khỏi khối thủy tinh và trở lại không khí.\n\n> Ánh sáng **tăng tốc** và uốn cong **ra xa pháp tuyến** khi đi vào môi trường ít đặc hơn.",
    exampleLabel: "Observation",
    exampleLabelVn: "Quan sát",
    example: "The ray of light that exits the glass will end up traveling in the exact same parallel direction as the ray that originally entered it.",
    exampleVn: "Tia sáng thoát ra khỏi thủy tinh cuối cùng sẽ di chuyển theo cùng một hướng song song chính xác như tia sáng ban đầu đi vào nó.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_REFRACTION_EXIT,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_6.mp3"
  },
  {
    type: "concept",
    title: "White Light",
    titleVn: "Ánh sáng trắng",
    icon: "BookOpen",
    color: "bg-[#ec4899]",
    content: "The light that comes from the sun or a light bulb looks perfectly clear and white to our eyes, but it is hiding a secret.\n\n> **White light** is actually a mixture of **all the colours** of the rainbow combined together.",
    contentVn: "Ánh sáng đến từ mặt trời hoặc bóng đèn trông hoàn toàn trong trẻo và trắng đối với mắt chúng ta, nhưng nó đang che giấu một bí mật.\n\n> **Ánh sáng trắng** thực chất là hỗn hợp của **tất cả các màu sắc** của cầu vồng kết hợp lại với nhau.",
    exampleLabel: "Fun Fact",
    exampleLabelVn: "Sự thật thú vị",
    example: "To prove this, scientists use a solid triangular block of glass called a prism to reveal the hidden colours.",
    exampleVn: "Để chứng minh điều này, các nhà khoa học sử dụng một khối thủy tinh hình tam giác đặc gọi là lăng kính để khám phá những màu sắc ẩn giấu.",
    drawThis: false,
    inlineSvg: DIAGRAMS.NOTES_WHITE_LIGHT,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_7.mp3"
  },
  {
    type: "concept",
    title: "Dispersion",
    titleVn: "Sự tán sắc",
    icon: "BookOpen",
    color: "bg-[#ec4899]",
    content: "When white light passes through a glass prism, the dense medium slows each hidden colour down by a slightly different amount.\n\n> **Dispersion** is the splitting of white light. **Red** bends the least, and **Violet** bends the most.",
    contentVn: "Khi ánh sáng trắng đi qua lăng kính thủy tinh, môi trường đặc làm chậm mỗi màu ẩn với một lượng hơi khác nhau.\n\n> **Sự tán sắc** là sự phân tách của ánh sáng trắng. Màu **Đỏ** uốn cong ít nhất, và màu **Tím** uốn cong nhiều nhất.",
    exampleLabel: "Explanation",
    exampleLabelVn: "Giải thích",
    example: "Because every colour bends at a completely unique angle, they fan out and separate from each other completely.",
    exampleVn: "Bởi vì mỗi màu uốn cong ở một góc hoàn toàn duy nhất, chúng xòe ra và tách rời nhau hoàn toàn.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_DISPERSION_PRISM,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_8.mp3"
  },
  {
    type: "concept",
    title: "The Visible Spectrum",
    titleVn: "Quang phổ nhìn thấy được",
    icon: "BookOpen",
    color: "bg-[#ec4899]",
    content: "The beautiful, continuous band of colours produced by dispersion is known as the visible spectrum.\n\n> The **Visible Spectrum** always appears in this exact order: **Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)**.",
    contentVn: "Dải màu đẹp đẽ, liên tục được tạo ra bởi sự tán sắc được gọi là quang phổ nhìn thấy được.\n\n> **Quang phổ Nhìn thấy được** luôn xuất hiện theo thứ tự chính xác này: **Đỏ, Cam, Vàng, Lục, Lam, Chàm, Tím (ROYGBIV)**.",
    exampleLabel: "Real World Example",
    exampleLabelVn: "Ví dụ Thực tế",
    example: "A natural rainbow is the perfect example of the visible spectrum being dispersed by water droplets in the sky.",
    exampleVn: "Cầu vồng tự nhiên là ví dụ hoàn hảo về quang phổ nhìn thấy được tán sắc bởi các giọt nước trên bầu trời.",
    drawThis: false,
    inlineSvg: DIAGRAMS.NOTES_VISIBLE_SPECTRUM,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_9.mp3"
  },
  {
    type: "concept",
    title: "The Primary Colours",
    titleVn: "Màu Cơ bản",
    icon: "Scale",
    color: "bg-[#10b981]",
    content: "Mixing coloured light is completely different from mixing paint in art class! \n\n> The **Primary Colours** of light are **Red, Green, and Blue**. Adding them all together makes **White**.",
    contentVn: "Pha trộn ánh sáng màu hoàn toàn khác với pha trộn sơn trong lớp mỹ thuật!\n\n> Các **Màu Cơ bản** của ánh sáng là **Đỏ, Lục và Lam**. Việc cộng tất cả chúng lại với nhau sẽ tạo ra màu **Trắng**.",
    exampleLabel: "Art Fact",
    exampleLabelVn: "Sự thật Công nghệ",
    example: "This is different than the primary colours of paint (Red, Yellow, Blue) because light works by adding colours together, while paint works by absorbing light and subtracting colours.",
    exampleVn: "Hãy nhìn kỹ vào màn hình TV hoặc điện thoại. Nó chỉ sử dụng các điểm ảnh phát sáng siêu nhỏ màu đỏ, lục và lam để đánh lừa mắt bạn nhìn thấy mọi màu sắc.",
    drawThis: false,
    inlineSvg: DIAGRAMS.NOTES_PRIMARY_COLOURS,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_10.mp3"
  },
  {
    type: "concept",
    title: "Secondary Colours",
    titleVn: "Màu Thứ cấp",
    icon: "Scale",
    color: "bg-[#10b981]",
    content: "When we add just two of the primary colours together, we create bright new colours.\n\n> Adding two primary colours creates a **Secondary Colour**: **Cyan, Magenta, or Yellow**.",
    contentVn: "Khi chúng ta cộng chỉ hai trong số các màu cơ bản lại với nhau, chúng ta tạo ra các màu sắc mới tươi sáng.\n\n> Việc cộng hai màu cơ bản tạo ra một **Màu Thứ cấp**: **Xanh lơ, Đỏ thắm hoặc Vàng**.",
    exampleLabel: "Colour Mixing",
    exampleLabelVn: "Pha trộn Màu sắc",
    example: "Red and Green make Yellow. Green and Blue make Cyan. Red and Blue make Magenta.",
    exampleVn: "Đỏ và Lục tạo ra Vàng. Lục và Lam tạo ra Xanh lơ. Đỏ và Lam tạo ra Đỏ thắm.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_SECONDARY_VENN,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_11.mp3"
  },
  {
    // --- NEW RGB PIXELS WIDGET SLIDE ---
    type: "concept",
    title: "RGB Pixels in Technology",
    titleVn: "Điểm ảnh RGB trong Công nghệ",
    icon: "Scale",
    color: "bg-[#10b981]",
    content: "Every screen you look at—phones, TVs, laptops—uses millions of tiny light-emitting dots called **pixels** to create images.\n\n> A single pixel is actually made of three microscopic sub-pixels: **Red, Green, and Blue**.\n> By changing the brightness of these three tiny lights, your screen can trick your eyes into seeing over 16 million different colours!",
    contentVn: "Mọi màn hình bạn nhìn vào—điện thoại, TV, máy tính xách tay—đều sử dụng hàng triệu điểm phát sáng li ti gọi là **điểm ảnh (pixel)** để tạo ra hình ảnh.\n\n> Một điểm ảnh duy nhất thực chất được tạo thành từ ba điểm ảnh phụ siêu nhỏ: **Đỏ, Lục và Lam**.\n> Bằng cách thay đổi độ sáng của ba ngọn đèn nhỏ này, màn hình của bạn có thể đánh lừa mắt bạn nhìn thấy hơn 16 triệu màu khác nhau!",
    exampleLabel: "Digital Microscope",
    exampleLabelVn: "Kính hiển vi Kỹ thuật số",
    example: "Play with the RGB sliders below to adjust the brightness of the microscopic sub-pixels. Can you match the recipe cards to create new colours?",
    exampleVn: "Chơi với các thanh trượt RGB bên dưới để điều chỉnh độ sáng của các điểm ảnh phụ siêu nhỏ. Bạn có thể làm theo các thẻ công thức để tạo ra những màu mới không?",
    drawThis: false,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_12.mp3",

    widget: RGBWidget, 
    // Uses widget dynamically in Notes.jsx
  },
  {
    type: "concept",
    title: "Colour Filters",
    titleVn: "Kính lọc Màu",
    icon: "MessageSquare",
    color: "bg-[#3b82f6]",
    content: "A filter is a piece of coloured plastic or glass that blocks certain light rays from reaching our eyes.\n\n> A **Colour Filter** works by **absorbing** unwanted colours and letting its own colour **pass through**.",
    contentVn: "Kính lọc là một mảnh nhựa hoặc thủy tinh màu ngăn chặn các tia sáng nhất định truyền đến mắt chúng ta.\n\n> **Kính lọc Màu** hoạt động bằng cách **hấp thụ** những màu không mong muốn và cho phép màu của chính nó **đi qua**.",
    exampleLabel: "How It Works",
    exampleLabelVn: "Cách thức Hoạt động",
    example: "A red filter absorbs blue and green light. It only allows red light to pass straight through to the other side.",
    exampleVn: "Kính lọc đỏ hấp thụ ánh sáng lam và lục. Nó chỉ cho phép ánh sáng đỏ đi thẳng qua phía bên kia.",
    drawThis: true,
    inlineSvg: DIAGRAMS.NOTES_COLOUR_FILTER,
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_13.mp3"
  },
  {
    type: "concept",
    title: "Lab: Filter Combinations",
    titleVn: "Phòng thí nghiệm: Kết hợp Kính lọc",
    icon: "Target",
    color: "bg-[#3b82f6]", 
    drawThis: false,
    widget: FilterWidget
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can now map the paths of light rays, dispersion, and colour addition.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn có thể vẽ đường đi của các tia sáng, sự tán sắc và sự cộng màu.",
    color: "bg-[#10b981]",
    borderColor: "border-[#059669]",
    audio: "/audio/Y8/SCIENCE_1A/slide_SCIENCE_1A_13.mp3"
  }
];
</file>

<file path="src/data/Y8/SCIENCE_1A/widgets.jsx">
import React, { useState, useRef, useEffect } from 'react';

// --- WIDGET 1: REFLECTION ---
export const ReflectionWidget = () => {
  const [angle, setAngle] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);

  const numericAngle = parseInt(angle, 10);
  const originX = 200;
  const originY = 180;
  const rayLength = 140;
  const arcRadius = 40;
  const angleInRadians = numericAngle * (Math.PI / 180);
  const incidentX = originX - rayLength * Math.sin(angleInRadians);
  const incidentY = originY - rayLength * Math.cos(angleInRadians);
  const reflectedX = originX + rayLength * Math.sin(angleInRadians);
  const reflectedY = originY - rayLength * Math.cos(angleInRadians);
  const arcIncidentX = originX - arcRadius * Math.sin(angleInRadians);
  const arcIncidentY = originY - arcRadius * Math.cos(angleInRadians);
  const arcReflectedX = originX + arcRadius * Math.sin(angleInRadians);
  const arcReflectedY = originY - arcRadius * Math.cos(angleInRadians);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    updateAngleFromEvent(e);
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateAngleFromEvent(e);
  };
  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };
  const updateAngleFromEvent = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 250 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const dx = originX - x;
    const dy = originY - y;
    let newAngle = Math.atan2(dx, dy) * (180 / Math.PI);
    newAngle = Math.max(10, Math.min(80, newAngle));
    setAngle(Math.round(newAngle));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center touch-none select-none">
      <div className="w-full flex-1 min-h-[200px] lg:min-h-[250px] relative flex flex-col items-center justify-center p-2">
        {isDragging && <div className="absolute inset-0 z-0 bg-slate-100/30 dark:bg-slate-800/30 rounded-2xl animate-pulse pointer-events-none"></div>}
        <svg 
          ref={svgRef}
          onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" 
          className={`w-full h-full drop-shadow-md z-10 transition-transform ${isDragging ? 'cursor-grabbing scale-[1.02]' : 'cursor-grab scale-100'}`}
          style={{ touchAction: 'none' }}
        >
          <line x1="40" y1={originY} x2="360" y2={originY} stroke="#1e293b" strokeWidth="4" strokeLinecap="round"/>
          <path d={`M 50 ${originY} L 35 ${originY + 15} M 90 ${originY} L 75 ${originY + 15} M 130 ${originY} L 115 ${originY + 15} M 170 ${originY} L 155 ${originY + 15} M 210 ${originY} L 195 ${originY + 15} M 250 ${originY} L 235 ${originY + 15} M 290 ${originY} L 275 ${originY + 15} M 330 ${originY} L 315 ${originY + 15}`} stroke="#94a3b8" strokeWidth="2"/>
          <line x1={originX} y1="30" x2={originX} y2={originY} stroke="#94a3b8" strokeWidth="3" strokeDasharray="8"/>
          <text x={originX} y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#64748b" textAnchor="middle">Normal Line</text>
          
          <path d={`M ${originX} ${originY - arcRadius} A ${arcRadius} ${arcRadius} 0 0 0 ${arcIncidentX} ${arcIncidentY}`} fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.6"/>
          <path d={`M ${originX} ${originY - arcRadius} A ${arcRadius} ${arcRadius} 0 0 1 ${arcReflectedX} ${arcReflectedY}`} fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.6"/>

          <line x1={incidentX} y1={incidentY} x2={originX} y2={originY} stroke="#ef4444" strokeWidth="5" strokeLinecap="round"/>
          <g transform={`translate(${originX - (originX - incidentX)*0.5}, ${originY - (originY - incidentY)*0.5}) rotate(${90 - numericAngle})`}><polygon points="-10,-8 10,0 -10,8" fill="#ef4444" /></g>
          
          <line x1={originX} y1={originY} x2={reflectedX} y2={reflectedY} stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
          <g transform={`translate(${originX + (reflectedX - originX)*0.5}, ${originY - (originY - reflectedY)*0.5}) rotate(${-90 + numericAngle})`}><polygon points="-10,-8 10,0 -10,8" fill="#3b82f6" /></g>

          <text x={incidentX - 12} y={incidentY - 12} fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#ef4444" textAnchor="end">Incident ({numericAngle}°)</text>
          <text x={reflectedX + 12} y={reflectedY - 12} fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#3b82f6" textAnchor="start">Reflected ({numericAngle}°)</text>
          
          <circle cx={incidentX} cy={incidentY} r="18" fill="#ef4444" opacity="0.2" className="animate-pulse" />
          <circle cx={incidentX} cy={incidentY} r="6" fill="#ef4444" />
          <circle cx={originX} cy={originY} r="5" fill="#1e293b" />
        </svg>
      </div>
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-3 sm:p-5 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 z-20 flex-shrink-0 mt-2">
        <div className="flex justify-between items-end mb-3">
          <span className="text-slate-400 font-bold text-sm">10°</span>
          <div className="text-center">
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5 sm:mb-1">Angle of Incidence</span>
            <span className="text-xl sm:text-2xl font-black text-[#1cb0f6] transition-colors duration-200">{numericAngle}°</span>
          </div>
          <span className="text-slate-400 font-bold text-sm">80°</span>
        </div>
        <input type="range" min="10" max="80" value={numericAngle} onChange={(e) => setAngle(e.target.value)} className="w-full h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#1cb0f6] hover:accent-[#1899d6] transition-all"/>
      </div>
    </div>
  );
};


// --- WIDGET 2: OPTICS LAB (COLOR FILTERS) ---
const FILTER_SPECS = {
  none:    { r: 1, g: 1, b: 1, hex: 'transparent', name: 'Clear' },
  red:     { r: 1, g: 0, b: 0, hex: '#ef4444', name: 'Red' },
  green:   { r: 0, g: 1, b: 0, hex: '#22c55e', name: 'Green' },
  blue:    { r: 0, g: 0, b: 1, hex: '#3b82f6', name: 'Blue' },
  cyan:    { r: 0, g: 1, b: 1, hex: '#06b6d4', name: 'Cyan' },
  magenta: { r: 1, g: 0, b: 1, hex: '#d946ef', name: 'Magenta' },
  yellow:  { r: 1, g: 1, b: 0, hex: '#eab308', name: 'Yellow' }
};

const getLightHex = (light) => {
  if (light.r && light.g && light.b) return '#ffffff';
  if (light.r && light.g && !light.b) return '#eab308';
  if (light.r && !light.g && light.b) return '#d946ef';
  if (!light.r && light.g && light.b) return '#06b6d4';
  if (light.r && !light.g && !light.b) return '#ef4444';
  if (!light.r && light.g && !light.b) return '#22c55e';
  if (!light.r && !light.g && light.b) return '#3b82f6';
  return '#0f172a';
};

export const FilterWidget = () => {
  const [filters, setFilters] = useState(['none', 'none', 'none']);

  const updateFilter = (index, colorKey) => {
    const newFilters = [...filters];
    newFilters[index] = colorKey;
    setFilters(newFilters);
  };

  let currentLight = { r: 1, g: 1, b: 1 };
  const beams = [];
  beams.push({ hex: getLightHex(currentLight), active: true });
  
  filters.forEach(filterKey => {
    const filter = FILTER_SPECS[filterKey];
    currentLight = {
      r: currentLight.r * filter.r,
      g: currentLight.g * filter.g,
      b: currentLight.b * filter.b
    };
    const hex = getLightHex(currentLight);
    beams.push({ hex, active: hex !== '#0f172a' }); 
  });

  const finalBeam = beams[3];
  const isDark = !finalBeam.active;

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 w-full bg-slate-900 rounded-3xl sm:rounded-[2rem] border-4 border-slate-800 shadow-inner relative flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[250px]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" className="w-full h-full z-10 drop-shadow-lg max-w-2xl">
          <defs>
            <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="impact-glow" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {beams.map((beam, i) => beam.active && <rect key={`beam-${i}`} x={50 + (i * 100)} y="80" width="100" height="40" fill={beam.hex} opacity="0.85" filter="url(#beam-glow)" />)}
          <rect x="10" y="60" width="40" height="80" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="4"/>
          <line x1="50" y1="80" x2="50" y2="120" stroke="#ffffff" strokeWidth="4" />
          <text x="30" y="50" fontFamily="sans-serif" fontWeight="bold" fontSize="12" fill="#94a3b8" textAnchor="middle">White</text>

          {[150, 250, 350].map((xPos, i) => {
            const filterKey = filters[i];
            const isEmpty = filterKey === 'none';
            const beamIn = beams[i];
            const beamOut = beams[i+1];
            const isAbsorbing = beamIn.active && !beamOut.active;

            return (
              <g key={`filter-${i}`}>
                {isEmpty ? (
                  <rect x={xPos - 8} y="50" width="16" height="100" rx="4" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="4"/>
                ) : (
                  <rect x={xPos - 8} y="50" width="16" height="100" rx="4" fill={FILTER_SPECS[filterKey].hex} stroke="#ffffff" strokeWidth="2" opacity="0.85" />
                )}
                <text x={xPos} y="170" fontFamily="sans-serif" fontWeight="bold" fontSize="12" fill="#64748b" textAnchor="middle">Slot {i+1}</text>
                {isAbsorbing && !isEmpty && <line x1={xPos - 8} y1="50" x2={xPos - 8} y2="150" stroke={beamIn.hex} strokeWidth="5" filter="url(#impact-glow)" opacity="0.9" />}
              </g>
            );
          })}
          <rect x="450" y="40" width="10" height="120" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
          <text x="455" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#cbd5e1" textAnchor="middle">Screen</text>
          {finalBeam.active && <line x1="450" y1="40" x2="450" y2="160" stroke={finalBeam.hex} strokeWidth="8" filter="url(#impact-glow)" opacity="0.9" />}
        </svg>
      </div>
      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-5 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 z-20 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm sm:text-base text-slate-700 dark:text-slate-200 tracking-tight">Configure Filters</span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700">
             <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Result:</span>
             <span className="text-xs sm:text-sm font-black" style={{ color: isDark ? '#94a3b8' : finalBeam.hex }}>{isDark ? 'No Light Passes' : 'Light Passes'}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[0, 1, 2].map((slotIndex) => (
            <div key={`ctrl-${slotIndex}`} className="flex flex-col items-center bg-slate-50 dark:bg-slate-700/50 p-2 sm:p-3 rounded-xl border-2 border-slate-100 dark:border-slate-700">
              <span className="text-[10px] sm:text-xs font-black uppercase text-slate-400 mb-2 sm:mb-3 text-center tracking-widest"><span className="hidden sm:inline">Filter </span>{slotIndex + 1}</span>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-[120px]">
                {Object.entries(FILTER_SPECS).map(([key, spec]) => {
                   const isActive = filters[slotIndex] === key;
                   return (
                     <button key={key} onClick={() => updateFilter(slotIndex, key)} title={spec.name} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-200 border-2 ${isActive ? 'scale-110 border-slate-800 dark:border-white shadow-md' : 'scale-90 border-transparent hover:scale-100 opacity-60'} ${key === 'none' ? 'border-dashed border-slate-400 bg-transparent' : ''}`} style={{ backgroundColor: key !== 'none' ? spec.hex : 'transparent' }} />
                   )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- WIDGET 3: RGB SCREEN PIXELS ---
const COLOR_RECIPES = [
  { name: 'Yellow', nameVn: 'Vàng', r: 255, g: 255, b: 0, hex: '#eab308' },
  { name: 'Cyan', nameVn: 'Xanh lơ', r: 0, g: 255, b: 255, hex: '#06b6d4' },
  { name: 'Magenta', nameVn: 'Đỏ thắm', r: 255, g: 0, b: 255, hex: '#d946ef' },
  { name: 'Orange', nameVn: 'Cam', r: 255, g: 165, b: 0, hex: '#f97316' },
  { name: 'Purple', nameVn: 'Tím', r: 128, g: 0, b: 128, hex: '#a855f7' },
  { name: 'White', nameVn: 'Trắng', r: 255, g: 255, b: 255, hex: '#ffffff' }
];

export const RGBWidget = () => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  // Derive the combined color
  const combinedColor = `rgb(${r}, ${g}, ${b})`;
  
  // Calculate relative opacities (0.1 minimum to show they exist even when 'off')
  const rOp = Math.max(0.1, r / 255);
  const gOp = Math.max(0.1, g / 255);
  const bOp = Math.max(0.1, b / 255);

  return (
    <div className="w-full h-full flex flex-col select-none relative">
      
      {/* 1. Visual Presentation Area */}
      <div 
        className="w-full flex-1 min-h-[220px] rounded-3xl sm:rounded-[2rem] border-4 border-slate-800 shadow-inner relative flex items-center justify-center overflow-hidden transition-colors duration-300 mb-2 sm:mb-4"
        style={{ backgroundColor: combinedColor }}
      >
        {/* Empty Screen Helper Text */}
        {r === 0 && g === 0 && b === 0 && (
          <div className="absolute text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse z-0">Screen is Off</div>
        )}

        {/* The Magnifying Glass (Microscope View) */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-24 h-24 sm:w-32 sm:h-32 bg-[#0f172a] rounded-full border-[4px] sm:border-[6px] border-slate-300 shadow-2xl flex items-center justify-center p-2 z-10">
          
          {/* Glass reflection highlight */}
          <div className="absolute inset-0 rounded-full border-t-[4px] border-white/20 pointer-events-none"></div>
          
          {/* Microscope Label */}
          <div className="absolute -top-7 sm:-top-8 bg-slate-800 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
            1000x Zoom
          </div>

          {/* Sub-Pixels (R, G, B) */}
          <div className="flex gap-1 sm:gap-1.5 w-full h-full p-2 sm:p-3 items-center justify-center">
            
            {/* Red Sub-pixel */}
            <div className="flex-1 h-full max-h-16 rounded-sm bg-red-600 transition-opacity duration-200 shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                 style={{ opacity: rOp, boxShadow: `0 0 ${r/10}px rgba(220,38,38,${rOp})` }}></div>
            
            {/* Green Sub-pixel */}
            <div className="flex-1 h-full max-h-16 rounded-sm bg-green-500 transition-opacity duration-200 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                 style={{ opacity: gOp, boxShadow: `0 0 ${g/10}px rgba(34,197,94,${gOp})` }}></div>
            
            {/* Blue Sub-pixel */}
            <div className="flex-1 h-full max-h-16 rounded-sm bg-blue-600 transition-opacity duration-200 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                 style={{ opacity: bOp, boxShadow: `0 0 ${b/10}px rgba(37,99,235,${bOp})` }}></div>
          </div>
        </div>
      </div>

      {/* 2. Control Panel & Recipes */}
      <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 flex-shrink-0">
        
        {/* Sliders Area */}
        <div className="flex-[1.5] bg-white dark:bg-slate-800 p-3 sm:p-5 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 flex flex-col justify-center gap-3">
          
          {/* R Slider */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 sm:w-8 font-black text-red-500 text-sm sm:text-base">R</div>
            <input type="range" min="0" max="255" value={r} onChange={(e) => setR(Number(e.target.value))} className="flex-1 h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400 transition-all" />
            <div className="w-8 sm:w-10 text-right font-bold text-slate-500 dark:text-slate-400 text-xs sm:text-sm">{r}</div>
          </div>

          {/* G Slider */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 sm:w-8 font-black text-green-500 text-sm sm:text-base">G</div>
            <input type="range" min="0" max="255" value={g} onChange={(e) => setG(Number(e.target.value))} className="flex-1 h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all" />
            <div className="w-8 sm:w-10 text-right font-bold text-slate-500 dark:text-slate-400 text-xs sm:text-sm">{g}</div>
          </div>

          {/* B Slider */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 sm:w-8 font-black text-blue-500 text-sm sm:text-base">B</div>
            <input type="range" min="0" max="255" value={b} onChange={(e) => setB(Number(e.target.value))} className="flex-1 h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all" />
            <div className="w-8 sm:w-10 text-right font-bold text-slate-500 dark:text-slate-400 text-xs sm:text-sm">{b}</div>
          </div>
        </div>

        {/* Recipe Cards Area */}
        <div className="flex-[1] bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-black uppercase text-slate-400 mb-2 sm:mb-3 text-center tracking-widest block">
            Colour Recipes
          </span>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {COLOR_RECIPES.map((recipe) => (
              <button 
                key={recipe.name}
                onClick={() => { setR(recipe.r); setG(recipe.g); setB(recipe.b); }}
                className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400 active:scale-95 transition-all group shadow-sm"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mb-1 sm:mb-1.5 shadow-inner border border-black/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: recipe.hex }}></div>
                <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-300 leading-tight">
                  {recipe.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
</file>

<file path="src/data/Y8/SCIENCE_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
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

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
</file>

<file path="generate_all_audio.py">
import asyncio
import edge_tts
import os
import random
import re
import glob

OUTPUT_BASE = "public/audio"
DATA_DIR = "src/data"

# Swapped Jenny for Aria (highly natural and expressive)
VOICES = [
    "en-US-AriaNeural",             
    "en-US-RogerNeural"          
]

async def generate_audio(text, output_dir, filename, voice):
    file_path = os.path.join(output_dir, filename)
    print(f"  🎙️ Generating missing file: {filename}")
    
    communicate = edge_tts.Communicate(text, voice)
    try:
        await communicate.save(file_path)
    except Exception as e:
        print(f"  ❌ Failed to generate {filename}: {e}")

def parse_js_to_dict(filepath):
    """
    Safely parses JS objects using regex capture groups to properly 
    extract full strings containing apostrophes.
    """
    data = {
        "realWords": [],
        "dictation": [],
        "passages": [],
        "notes": []
    }
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Remove comments to prevent false positive matches
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        content = re.sub(r'(?<!:)//.*', '', content)
        
        def extract_array_block(key):
            pattern = rf'{key}\s*:\s*\[(.*?)\](?=\s*,\s*[a-zA-Z0-9_]+\s*:|\s*}}\s*$)'
            match = re.search(pattern, content, re.DOTALL)
            return match.group(1) if match else ""

        # 2. Extract realWords 
        rw_block = extract_array_block("realWords")
        if rw_block:
            blocks = re.findall(r'\{(.*?)\}', rw_block, re.DOTALL)
            for block in blocks:
                word_m = re.search(r'word\s*:\s*(["\'])(.*?)\1', block)
                def_m = re.search(r'def\s*:\s*(["\'])(.*?)\1', block)
                sent_m = re.search(r'sent\s*:\s*(["\'])(.*?)\1', block)
                
                if word_m:
                    data["realWords"].append({
                        "word": word_m.group(2).strip(),
                        "def": def_m.group(2).strip() if def_m else "",
                        "sent": sent_m.group(2).strip() if sent_m else ""
                    })

        # 3. Extract dictation
        dict_block = extract_array_block("dictation")
        if dict_block:
            blocks = re.findall(r'\{(.*?)\}', dict_block, re.DOTALL)
            for block in blocks:
                sent_m = re.search(r'sent\s*:\s*(["\'])(.*?)\1', block)
                if sent_m:
                    data["dictation"].append({
                        "sent": sent_m.group(2).strip()
                    })

        # 4. Extract passages
        pass_block = extract_array_block("passages")
        if pass_block:
            blocks = re.findall(r'\{(.*?)\}', pass_block, re.DOTALL)
            for block in blocks:
                text_m = re.search(r'text\s*:\s*(["\'])(.*?)\1', block, re.DOTALL)
                if text_m:
                    data["passages"].append({
                        "text": text_m.group(2).strip()
                    })

        # 5. Extract notes directly from notes.js
        if 'notes.js' in filepath:
            notes_match = re.search(r'export const notes\s*=\s*\[(.*)\];', content, re.DOTALL)
            if notes_match:
                slides = re.split(r'(?=type\s*:)', notes_match.group(1))
                for slide in slides:
                    if not slide.strip(): continue
                    
                    type_m = re.search(r'type\s*:\s*(["\'])(.*?)\1', slide)
                    title_m = re.search(r'title\s*:\s*(["\'])(.*?)\1', slide)
                    sub_m = re.search(r'subtitle\s*:\s*(["\'])(.*?)\1', slide)
                    
                    # Core visual content fields
                    content_m = re.search(r'content\s*:\s*(["\'])(.*?)\1', slide, re.DOTALL)
                    ex_m = re.search(r'example\s*:\s*(["\'])(.*?)\1', slide, re.DOTALL)
                    
                    # Dedicated audio script fields (Preferred if available)
                    spoken_m = re.search(r'spoken\s*:\s*(["\'])(.*?)\1', slide, re.DOTALL)
                    spoken_ex_m = re.search(r'spokenExample\s*:\s*(["\'])(.*?)\1', slide, re.DOTALL)
                    
                    if type_m:
                        data["notes"].append({
                            "type": type_m.group(2).strip(),
                            "title": title_m.group(2).strip() if title_m else "",
                            "subtitle": sub_m.group(2).strip() if sub_m else "",
                            "content": spoken_m.group(2).strip() if spoken_m else (content_m.group(2).strip() if content_m else ""),
                            "example": spoken_ex_m.group(2).strip() if spoken_ex_m else (ex_m.group(2).strip() if ex_m else "")
                        })

        return data
    except Exception as e:
        if 'games.js' not in filepath and 'workbook.js' not in filepath and 'assessment.js' not in filepath:
            print(f"  ⚠️ Could not parse data from {filepath}: {e}")
        return {}

async def main():
    print(f"\n🔍 Scanning {DATA_DIR} and taking inventory of {OUTPUT_BASE}...")
    
    js_files = glob.glob(f"{DATA_DIR}/**/*.js", recursive=True)
    global_tasks = []
    
    for file in js_files:
        if 'index.js' in file:
            continue
            
        rel_path = os.path.relpath(file, DATA_DIR).replace('\\', '/')
        subfolder_raw = os.path.dirname(rel_path)
        
        if not subfolder_raw:
            continue
            
        # FORCE UPPERCASE: Aggressively separate by slash and upper() every part
        # This completely negates Windows case-preservation faults 
        subfolder_parts = [p.upper() for p in subfolder_raw.split('/') if p]
        subfolder = "/".join(subfolder_parts)
        unit_id = subfolder_parts[-1]
        
        target_out_dir = os.path.join(OUTPUT_BASE, subfolder).replace('\\', '/')
        os.makedirs(target_out_dir, exist_ok=True)
            
        print(f"\n📄 Checking Data: {file}")
        data = parse_js_to_dict(file)
        
        expected_files = []
        
        words = data.get("realWords", [])
        dictations = data.get("dictation", [])
        
        for idx, item in enumerate(words):
            word = item.get("word", "").strip()
            definition = item.get("def", "").strip()
            sentence = item.get("sent", "").strip()
            
            if not word: continue
            clean_word = word.lower()
            bound_voice = random.choice(VOICES)
            
            expected_files.append({"filename": f"word_{clean_word}.mp3", "text": f"{word}.", "voice": bound_voice})
            
            if definition:
                expected_files.append({"filename": f"def_{clean_word}.mp3", "text": definition, "voice": bound_voice})
            if sentence:
                expected_files.append({"filename": f"sentence_{clean_word}.mp3", "text": sentence, "voice": bound_voice})
            
            if idx < len(dictations):
                dictation_sent = dictations[idx].get("sent", "").strip()
                if dictation_sent:
                    expected_files.append({"filename": f"dictation_{clean_word}.mp3", "text": dictation_sent, "voice": bound_voice})
        
        passages = data.get("passages", [])
        for idx, passage in enumerate(passages):
            raw_text = passage.get("text", "")
            clean_passage = re.sub(r'\{|\}', '', raw_text)
            
            if clean_passage.strip():
                bound_voice = random.choice(VOICES)
                filename = f"passage_{unit_id}_{idx + 1}.mp3"
                expected_files.append({"filename": filename, "text": clean_passage, "voice": bound_voice})
            
        notes = data.get("notes", [])
        if notes:
            presentation_voice = random.choice(VOICES)
            
            for idx, note in enumerate(notes):
                parts = []
                note_type = note.get("type", "concept")
                
                if note_type in ["intro", "summary"]:
                    if note.get("title"): parts.append(note["title"])
                    if note.get("subtitle"): parts.append(note["subtitle"])
                else:
                    if note.get("content"):
                        # CLEANUP FIX: Replaces both literal \n strings and actual newlines with periods
                        clean_content = note["content"].replace('\\n', '. ').replace('\n', '. ')
                        # Strip out markdown bolding
                        clean_content = re.sub(r'\*\*', '', clean_content)
                        # Strip out blockquotes
                        clean_content = re.sub(r'>\s*', '', clean_content)
                        parts.append(clean_content)
                        
                    if note.get("example"):
                        # Apply the same line break fix to examples
                        clean_example = note["example"].replace('\\n', '. ').replace('\n', '. ')
                        parts.append("For example: " + clean_example)
                    
                text_to_read = ". ".join(parts)
                
                if text_to_read.strip():
                    filename = f"slide_{unit_id}_{idx + 1}.mp3"
                    expected_files.append({"filename": filename, "text": text_to_read, "voice": presentation_voice})
        
        existing_count = 0
        missing_count = 0
        unit_tasks = []
        
        for item in expected_files:
            file_path = os.path.join(target_out_dir, item["filename"])
            if os.path.exists(file_path):
                existing_count += 1
            else:
                missing_count += 1
                unit_tasks.append(generate_audio(item["text"], target_out_dir, item["filename"], item["voice"]))
                
        if expected_files:
            print(f"  📊 Status: {existing_count}/{len(expected_files)} files exist. {missing_count} missing.")
        
        if missing_count > 0:
            global_tasks.extend(unit_tasks)
                
    if global_tasks:
        print(f"\n✅ Queued {len(global_tasks)} total missing tracks. Processing...")
        chunk_size = 15
        for i in range(0, len(global_tasks), chunk_size):
            await asyncio.gather(*global_tasks[i:i+chunk_size])
            await asyncio.sleep(1) 
        print("\n🎉 All missing audio generation complete!")
    else:
        print("\n🎉 All units are 100% synced! No new audio needed.")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError as e:
        if str(e) == "Event loop is closed":
            pass
        else:
            raise
</file>

<file path="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dashboard</title>

    <script>
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</file>

<file path="postcss.config.js">
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
</file>

<file path="src/App.css">
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
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

<file path="src/data/Y8/Y8_1A.js">
export const Y8_1A_DATA = {
  "realWords": [
    {"word": "Respiratory System", "phonetic": "/res-puh-ruh-tawr-ee sis-tuhm/", "def": "The organs that help you breathe and exchange gases.", "vn": "Hệ hô hấp", "vnDef": "Các cơ quan giúp bạn hít thở và trao đổi khí.", "sent": "Your respiratory system takes in oxygen and removes carbon dioxide.", "vnSent": "Hệ hô hấp của bạn lấy vào oxy và loại bỏ carbon dioxide."},
    {"word": "Trachea", "phonetic": "/tray-kee-uh/", "def": "The main tube carrying air from your mouth to your lungs.", "vn": "Khí quản", "vnDef": "Ống chính dẫn không khí từ miệng đến phổi của bạn.", "sent": "The trachea is kept open by strong rings of cartilage.", "vnSent": "Khí quản được giữ mở nhờ các vòng sụn chắc chắn."},
    {"word": "Bronchi", "phonetic": "/brong-kye/", "def": "The two main branches of the trachea that go into each lung.", "vn": "Phế quản", "vnDef": "Hai nhánh chính của khí quản đi vào mỗi lá phổi.", "sent": "The trachea splits into two bronchi, one for each lung.", "vnSent": "Khí quản chia thành hai phế quản, mỗi phế quản đi vào một lá phổi."},
    {"word": "Alveoli", "phonetic": "/al-vee-oh-lye/", "def": "The tiny air sacs in the lungs where gas exchange happens.", "vn": "Phế nang", "vnDef": "Những túi khí nhỏ xíu trong phổi, nơi diễn ra sự trao đổi khí.", "sent": "The alveoli have very thin walls so gases can easily pass through.", "vnSent": "Phế nang có thành rất mỏng để các chất khí có thể dễ dàng đi qua."},
    {"word": "Capillaries", "phonetic": "/kap-uh-ler-eez/", "def": "Tiny blood vessels wrapped around the alveoli.", "vn": "Mao mạch", "vnDef": "Các mạch máu nhỏ xíu bao quanh phế nang.", "sent": "Capillaries carry blood extremely close to the air inside the lungs.", "vnSent": "Mao mạch vận chuyển máu đến rất gần không khí bên trong phổi."},
    {"word": "Diffusion", "phonetic": "/dih-fyoo-zhun/", "def": "The movement of gas from an area of high concentration to low concentration.", "vn": "Khuếch tán", "vnDef": "Sự di chuyển của khí từ nơi có nồng độ cao đến nơi có nồng độ thấp.", "sent": "Oxygen enters the blood from the lungs by diffusion.", "vnSent": "Oxy đi vào máu từ phổi bằng sự khuếch tán."},
    {"word": "Breathing", "phonetic": "/bree-thing/", "def": "The physical movement of air into and out of the lungs.", "vn": "Sự thở", "vnDef": "Sự di chuyển vật lý của không khí vào và ra khỏi phổi.", "sent": "Breathing happens when the volume of your chest changes.", "vnSent": "Sự thở xảy ra khi thể tích lồng ngực của bạn thay đổi."},
    {"word": "Diaphragm", "phonetic": "/dye-uh-fram/", "def": "The large sheet of muscle under the lungs that helps you breathe.", "vn": "Cơ hoành", "vnDef": "Lớp cơ lớn dưới phổi giúp bạn hít thở.", "sent": "The diaphragm moves down to pull air into your body.", "vnSent": "Cơ hoành di chuyển xuống để kéo không khí vào cơ thể bạn."},
    {"word": "Contract", "phonetic": "/kun-trakt/", "def": "To tighten and shorten a muscle to create movement.", "vn": "Co cơ", "vnDef": "Thắt chặt và làm ngắn một cơ để tạo ra chuyển động.", "sent": "Your muscles must contract to increase the space in your chest.", "vnSent": "Các cơ của bạn phải co lại để tăng không gian trong lồng ngực."},
    {"word": "Relax", "phonetic": "/ri-laks/", "def": "When a muscle stops working and returns to its normal size.", "vn": "Dãn cơ", "vnDef": "Khi một cơ ngừng hoạt động và trở về kích thước bình thường.", "sent": "When your breathing muscles relax, air is pushed back out.", "vnSent": "Khi các cơ hô hấp của bạn dãn ra, không khí bị đẩy ra ngoài."}
  ],
  "fakeWords": [
    {"word": "Respirational", "imitating": "Respiratory System"},
    {"word": "Trachi", "imitating": "Trachea"},
    {"word": "Bronchio", "imitating": "Bronchi"},
    {"word": "Alveolum", "imitating": "Alveoli"},
    {"word": "Capillar", "imitating": "Capillaries"},
    {"word": "Diffusation", "imitating": "Diffusion"},
    {"word": "Breathment", "imitating": "Breathing"},
    {"word": "Diaphram", "imitating": "Diaphragm"},
    {"word": "Contractment", "imitating": "Contract"},
    {"word": "Relaxate", "imitating": "Relax"}
  ],
  "dictation": [
    {"sent": "The respiratory system helps us take in oxygen.", "vnSent": "Hệ hô hấp giúp chúng ta lấy vào oxy."},
    {"sent": "Air moves down the trachea into the lungs.", "vnSent": "Không khí di chuyển xuống khí quản vào phổi."},
    {"sent": "The trachea divides into two smaller bronchi.", "vnSent": "Khí quản chia thành hai phế quản nhỏ hơn."},
    {"sent": "Alveoli are tiny air sacs inside the lungs.", "vnSent": "Phế nang là những túi khí nhỏ xíu bên trong phổi."},
    {"sent": "Capillaries are extremely small blood vessels.", "vnSent": "Mao mạch là những mạch máu cực kỳ nhỏ."},
    {"sent": "Gases move into the blood by diffusion.", "vnSent": "Các chất khí đi vào máu bằng sự khuếch tán."},
    {"sent": "Breathing moves air in and out of the body.", "vnSent": "Sự thở di chuyển không khí vào và ra khỏi cơ thể."},
    {"sent": "The diaphragm is a large muscle below the lungs.", "vnSent": "Cơ hoành là một cơ lớn nằm dưới phổi."},
    {"sent": "Intercostal muscles contract to pull the ribs up.", "vnSent": "Cơ liên sườn co lại để kéo xương sườn lên."},
    {"sent": "Muscles relax to push air out of the chest.", "vnSent": "Các cơ dãn ra để đẩy không khí ra khỏi lồng ngực."}
  ],
  "passages": [
    {
      "title": "The Structure of the Airways",
      "text": "Air enters the body and travels through the {respiratory system}. It moves down a main tube called the {trachea}, which is kept open by strong rings of cartilage. This tube splits into two {bronchi}, with one going into each lung. These branch into even smaller tubes that end in tiny air sacs called {alveoli}.",
      "vnText": "Không khí đi vào cơ thể và đi qua hệ hô hấp. Nó di chuyển xuống một ống chính gọi là khí quản, ống này được giữ mở bởi các vòng sụn chắc chắn. Ống này chia thành hai phế quản, mỗi nhánh đi vào một lá phổi. Chúng tiếp tục phân nhánh thành những ống thậm chí còn nhỏ hơn, kết thúc bằng những túi khí nhỏ xíu gọi là phế nang."
    },
    {
      "title": "The Process of Gas Exchange",
      "text": "Each air sac is surrounded by tiny blood vessels called {capillaries}. Because the walls are extremely thin, oxygen can easily pass from the air into the blood. This movement happens through a process called {diffusion}. At the same time, carbon dioxide diffuses out of the blood so it can be removed from the body.",
      "vnText": "Mỗi túi khí được bao quanh bởi các mạch máu nhỏ xíu gọi là mao mạch. Vì thành mạch cực kỳ mỏng nên oxy có thể dễ dàng đi từ không khí vào máu. Sự di chuyển này xảy ra thông qua một quá trình gọi là sự khuếch tán. Cùng lúc đó, carbon dioxide khuếch tán ra khỏi máu để có thể được loại bỏ khỏi cơ thể."
    },
    {
      "title": "How We Move Air",
      "text": "To keep fresh air moving, the body relies on {breathing}. A large muscle at the bottom of the chest, called the {diaphragm}, helps control this. When you breathe in, this muscle and the muscles between your ribs will {contract}. This makes the chest larger and pulls air in. When you breathe out, these muscles {relax}, squeezing the air back out into the environment.",
      "vnText": "Để giữ cho không khí trong lành luôn lưu thông, cơ thể dựa vào sự thở. Một cơ lớn ở đáy lồng ngực, gọi là cơ hoành, giúp kiểm soát điều này. Khi bạn hít vào, cơ này và các cơ giữa các xương sườn của bạn sẽ co lại. Điều này làm cho lồng ngực lớn hơn và kéo không khí vào. Khi bạn thở ra, các cơ này dãn ra, ép không khí trở lại môi trường bên ngoài."
    }
  ],
  "notebookArticle": {
    "title": "Unit 1A: The Respiratory System",
    "vnTitle": "Bài 1A: Hệ hô hấp",
    "instructions": "Read the following passage carefully. Write down the highlighted vocabulary words in your physical notebook, along with their definitions. This will help you synthesize the concepts for your writing tasks.",
    "vnInstructions": "Hãy đọc kỹ đoạn văn sau. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng. Điều này sẽ giúp bạn tổng hợp các khái niệm cho các bài tập viết sau này.",
    "sections": [
      {
        "heading": "1. The Structure of the Airways",
        "vnHeading": "1. Cấu trúc của đường hô hấp",
        "text": "Air enters the body and travels through the **Respiratory System**. It moves down a main tube called the **Trachea**, which is kept open by strong rings of cartilage. This tube splits into two **Bronchi**, with one going into each lung. These branch into even smaller tubes that end in tiny air sacs called **Alveoli**.",
        "vnText": "Không khí đi vào cơ thể và đi qua **Hệ hô hấp**. Nó di chuyển xuống một ống chính gọi là **Khí quản**, ống này được giữ mở bởi các vòng sụn chắc chắn. Ống này chia thành hai **Phế quản**, mỗi nhánh đi vào một lá phổi. Chúng tiếp tục phân nhánh thành những ống thậm chí còn nhỏ hơn, kết thúc bằng những túi khí nhỏ xíu gọi là **Phế nang**."
      },
      {
        "heading": "2. The Process of Gas Exchange",
        "vnHeading": "2. Quá trình trao đổi khí",
        "text": "Each air sac is surrounded by tiny blood vessels called **Capillaries**. Because the walls are extremely thin, oxygen can easily pass from the air into the blood. This movement happens through a process called **Diffusion**. At the same time, carbon dioxide diffuses out of the blood so it can be removed from the body.",
        "vnText": "Mỗi túi khí được bao quanh bởi các mạch máu nhỏ xíu gọi là **Mao mạch**. Vì thành mạch cực kỳ mỏng nên oxy có thể dễ dàng đi từ không khí vào máu. Sự di chuyển này xảy ra thông qua một quá trình gọi là **Sự khuếch tán**. Cùng lúc đó, carbon dioxide khuếch tán ra khỏi máu để có thể được loại bỏ khỏi cơ thể."
      },
      {
        "heading": "3. How We Move Air",
        "vnHeading": "3. Cách chúng ta di chuyển không khí",
        "text": "To keep fresh air moving, the body relies on **Breathing**. A large muscle at the bottom of the chest, called the **Diaphragm**, helps control this. When you breathe in, this muscle and the muscles between your ribs will **Contract**. This makes the chest larger and pulls air in. When you breathe out, these muscles **Relax**, squeezing the air back out into the environment.",
        "vnText": "Để giữ cho không khí trong lành luôn lưu thông, cơ thể dựa vào **Sự thở**. Một cơ lớn ở đáy lồng ngực, gọi là **Cơ hoành**, giúp kiểm soát điều này. Khi bạn hít vào, cơ này và các cơ giữa các xương sườn của bạn sẽ **Co lại**. Điều này làm cho lồng ngực lớn hơn và kéo không khí vào. Khi bạn thở ra, các cơ này **Dãn ra**, ép không khí trở lại môi trường bên ngoài."
      }
    ]
  },
  "shortQA": [
    {
      "question": "What is the path that air takes to get deep into the lungs?",
      "requiredWords": [
        ["Trachea", "windpipe"], 
        ["Bronchi", "bronchus"], 
        ["Alveoli", "alveolus"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for stating air first travels down the trachea.",
        "1 mark for stating it then splits into the bronchi.",
        "1 mark for stating it finally reaches the alveoli."
      ],
      "modelAnswer": "When you breathe in, air travels down the main trachea, which then splits into two bronchi. Finally, the air reaches deep into the lungs to fill up the tiny alveoli."
    },
    {
      "question": "How does oxygen get from the lungs into the bloodstream?",
      "requiredWords": [
        ["Diffusion", "diffuse", "diffuses", "diffusing"], 
        ["Capillaries", "capillary"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for identifying diffusion as the method of transport.",
        "1 mark for identifying capillaries as the destination blood vessels."
      ],
      "modelAnswer": "Oxygen moves out of the lungs and into the surrounding capillaries through a process called diffusion, crossing the very thin walls."
    },
    {
      "question": "What happens to the muscles in your chest when you take a deep breath in?",
      "requiredWords": [
        ["Contract", "contracts", "contracting", "contracted"], 
        ["Diaphragm", "diaphram"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating the diaphragm (and other chest muscles) contract.",
        "1 mark for explaining this pulls air into the lungs / increases chest space."
      ],
      "modelAnswer": "When you breathe in, the diaphragm and intercostal muscles contract. This increases the space in the chest and pulls air inside."
    },
    {
      "question": "What happens to your chest when you push the air out?",
      "requiredWords": [
        ["Relax", "relaxes", "relaxing", "relaxed"], 
        ["Breathing", "breathe", "exhale"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating the muscles relax.",
        "1 mark for explaining this decreases chest space / forces air out during breathing."
      ],
      "modelAnswer": "During the breathing out phase, the muscles relax and return to their normal size, which squeezes the chest and pushes the air back out."
    },
    {
      "question": "Why is the respiratory system important for human survival?",
      "requiredWords": [
        ["Respiratory System", "respiratory"], 
        ["Oxygen", "O2"], 
        ["Carbon Dioxide", "CO2"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for mentioning the respiratory system acts as the exchange center.",
        "1 mark for stating it brings necessary oxygen into the body.",
        "1 mark for stating it removes toxic carbon dioxide."
      ],
      "modelAnswer": "The respiratory system is vital because it brings oxygen into the body, which our cells need to survive, while simultaneously removing waste carbon dioxide."
    }
  ],
  "essay": {
    "task": "Imagine you are a particle of oxygen floating in the air. Describe your journey from the outside environment all the way into the blood.",
    "guidelines": [
      "Start your story entering the nose or mouth.",
      "Describe traveling down the different tubes to reach the deepest part of the lungs.",
      "Explain how you cross over into the bloodstream.",
      "Finish by describing what you see on the other side."
    ],
    "requiredWords": [
      ["Capillaries", "capillary"], 
      ["Diffusion", "diffuse", "diffusing"]
    ],
    "scienceMaxMarks": 5,
    "markScheme": [
      "1 mark for describing the journey down the trachea.",
      "1 mark for mentioning the split into the bronchi.",
      "1 mark for arriving at the alveoli.",
      "1 mark for describing the process of diffusion.",
      "1 mark for successfully entering the capillaries/blood."
    ],
    "modelAnswer": "I started my journey floating in the breeze before suddenly rushing into a student's mouth! I traveled down a long, dark tube called the trachea. Soon, the path split, and I took a turn down one of the bronchi. I kept tumbling through smaller and smaller tubes until I ended up trapped inside a tiny, balloon-like sac called the alveoli. I realized the walls were incredibly thin! Using diffusion, I easily squeezed right through the wall. Suddenly, I found myself swimming in the rushing blood of the capillaries, ready to travel to the rest of the body."
  },
  "diagrams": [
    {
      "id": "1A_respiratory_anatomy",
      "imageUrl": "/images/Y8/Gemini_Generated_Image_.png",
      "prompt": "Using the provided anatomical diagram, trace the main pathway of air from the larynx to the tiny air sacs, and identify the large muscle at the bottom that helps control breathing.",
      "requiredWords": [
        ["Trachea", "windpipe"], 
        ["Bronchus", "bronchi", "bronchioles"], 
        ["Diaphragm", "diaphram"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for stating air moves down the trachea.",
        "1 mark for stating it passes through the bronchus/bronchioles.",
        "1 mark for stating it reaches the alveoli.",
        "1 mark for identifying the diaphragm as the muscle controlling breathing."
      ],
      "modelAnswer": "Air travels from the larynx down the trachea, which then splits into the bronchus and smaller bronchioles, finally reaching the tiny alveoli. This entire breathing process is aided by the large diaphragm muscle at the bottom."
    },
    {
      "id": "1A_gas_exchange",
      "imageUrl": "/images/Y8/lungspathway.jpg",
      "prompt": "This diagram shows a close-up of an air sac in the lungs. Identify the specific process shown by the blue arrows, and explain why the diagram emphasizes that the walls of the air sac and blood capillary are 'thin'.",
      "requiredWords": [
        ["Diffusion", "diffuse"], 
        ["Oxygen", "O2"], 
        ["Carbon Dioxide", "CO2"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for identifying the process as diffusion.",
        "1 mark for stating oxygen diffuses into the red blood cells.",
        "1 mark for stating carbon dioxide diffuses out into the air sac.",
        "1 mark for explaining that thin walls allow gases to pass through easily and quickly."
      ],
      "modelAnswer": "The blue arrows illustrate the process of diffusion, where oxygen diffuses into the red blood cells and waste carbon dioxide diffuses into the air sac. The walls are thin so that these gases can easily and rapidly cross over during gas exchange."
    }
  ]
};
</file>

<file path="src/data/Y8/Y8_1B.js">
export const Y8_1B_DATA = {
  "realWords": [
    {"word": "Respiration", "phonetic": "/res-puh-ray-shuhn/", "def": "A chemical reaction in every living cell that releases energy from food.", "vn": "Hô hấp tế bào", "vnDef": "Phản ứng hóa học xảy ra trong mọi tế bào sống để giải phóng năng lượng từ thức ăn.", "sent": "All living things use respiration to get the energy they need to survive.", "vnSent": "Tất cả các sinh vật sống đều sử dụng quá trình hô hấp để có được năng lượng cần thiết để tồn tại."},
    {"word": "Mitochondria", "phonetic": "/my-toh-kon-dree-uh/", "def": "The part of a cell where respiration happens.", "vn": "Ty thể", "vnDef": "Thành phần của tế bào nơi diễn ra quá trình hô hấp.", "sent": "Most of the energy in a cell is produced inside the mitochondria.", "vnSent": "Hầu hết năng lượng trong tế bào được tạo ra bên trong ty thể."},
    {"word": "Glucose", "phonetic": "/gloo-kohs/", "def": "A type of sugar that cells use as fuel for respiration.", "vn": "Đường Glucose", "vnDef": "Một loại đường mà tế bào sử dụng làm nhiên liệu để hô hấp.", "sent": "Our bodies break down carbohydrates into glucose for energy.", "vnSent": "Cơ thể chúng ta phân hủy carbohydrate thành đường glucose để lấy năng lượng."},
    {"word": "Aerobic Respiration", "phonetic": "/air-oh-bik res-puh-ray-shuhn/", "def": "Respiration that uses oxygen to release energy.", "vn": "Hô hấp hiếu khí", "vnDef": "Quá trình hô hấp sử dụng oxy để giải phóng năng lượng.", "sent": "Animals perform aerobic respiration when they have enough oxygen.", "vnSent": "Động vật thực hiện hô hấp hiếu khí khi chúng có đủ oxy."},
    {"word": "Reactants", "phonetic": "/ree-ak-tuhnts/", "def": "The substances you start with in a chemical reaction.", "vn": "Chất phản ứng", "vnDef": "Những chất ban đầu trong một phản ứng hóa học.", "sent": "For respiration, the two main reactants are glucose and oxygen.", "vnSent": "Đối với quá trình hô hấp, hai chất phản ứng chính là glucose và oxy."},
    {"word": "Red Blood Cells", "phonetic": "/red bluhd selz/", "def": "Cells that carry oxygen around the body.", "vn": "Hồng cầu", "vnDef": "Các tế bào vận chuyển oxy đi khắp cơ thể.", "sent": "Healthy red blood cells are needed to carry oxygen to your muscles.", "vnSent": "Cần có các tế bào hồng cầu khỏe mạnh để vận chuyển oxy đến cơ bắp của bạn."},
    {"word": "Haemoglobin", "phonetic": "/hee-muh-gloh-bin/", "def": "The red pigment in red blood cells that joins with oxygen.", "vn": "Huyết sắc tố", "vnDef": "Chất màu đỏ trong hồng cầu kết hợp với oxy.", "sent": "Iron is an important part of haemoglobin in our blood.", "vnSent": "Sắt là một phần quan trọng của huyết sắc tố trong máu chúng ta."},
    {"word": "White Blood Cells", "phonetic": "/hwyt bluhd selz/", "def": "Cells that protect the body from germs.", "vn": "Bạch cầu", "vnDef": "Các tế bào bảo vệ cơ thể khỏi mầm bệnh.", "sent": "White blood cells act like a tiny army to fight infections.", "vnSent": "Bạch cầu hoạt động như một đội quân nhỏ để chống lại các bệnh nhiễm trùng."},
    {"word": "Blood Plasma", "phonetic": "/bluhd plaz-muh/", "def": "The liquid part of the blood that carries cells and nutrients.", "vn": "Huyết tương", "vnDef": "Phần lỏng của máu vận chuyển tế bào và chất dinh dưỡng.", "sent": "About half of your blood is made of a liquid called blood plasma.", "vnSent": "Khoảng một nửa lượng máu của bạn được tạo thành từ một chất lỏng gọi là huyết tương."},
    {"word": "Oxyhaemoglobin", "phonetic": "/ok-see-hee-muh-gloh-bin/", "def": "The substance formed when oxygen and haemoglobin join together.", "vn": "Oxyhaemoglobin", "vnDef": "Chất được tạo ra khi oxy và haemoglobin kết hợp với nhau.", "sent": "Oxyhaemoglobin gives arterial blood its bright red color.", "vnSent": "Oxyhaemoglobin làm cho máu động mạch có màu đỏ tươi."}
  ],
  "fakeWords": [
    {"word": "Respirase", "imitating": "Respiration"},
    {"word": "Mitoplasm", "imitating": "Mitochondria"},
    {"word": "Glucatose", "imitating": "Glucose"},
    {"word": "Oxyrobic", "imitating": "Aerobic"},
    {"word": "Reactates", "imitating": "Reactants"},
    {"word": "Haemocyte", "imitating": "Haemoglobin"},
    {"word": "Plasmosol", "imitating": "Plasma"},
    {"word": "Oxyglobin", "imitating": "Oxyhaemoglobin"},
    {"word": "Antibiotin", "imitating": "Antibodies"},
    {"word": "Pathogenics", "imitating": "Pathogens"}
  ],
  "dictation": [
    {"sent": "Respiration is a chemical reaction that happens in every cell.", "vnSent": "Hô hấp tế bào là một phản ứng hóa học xảy ra trong mọi tế bào."},
    {"sent": "The mitochondria are often called the power centers of the cell.", "vnSent": "Ty thể thường được gọi là trung tâm năng lượng của tế bào."},
    {"sent": "Oxygen is one of the reactants needed for respiration.", "vnSent": "Oxy là một trong những chất phản ứng cần thiết cho quá trình hô hấp."},
    {"sent": "Red blood cells carry oxygen to every part of the body.", "vnSent": "Các tế bào hồng cầu vận chuyển oxy đến mọi bộ phận của cơ thể."},
    {"sent": "Haemoglobin is the pigment that makes our blood look red.", "vnSent": "Huyết sắc tố là chất tạo màu làm cho máu của chúng ta có màu đỏ."},
    {"sent": "White blood cells protect us from harmful germs.", "vnSent": "Bạch cầu bảo vệ chúng ta khỏi các vi trùng có hại."},
    {"sent": "Blood plasma transports nutrients and waste.", "vnSent": "Huyết tương vận chuyển chất dinh dưỡng và chất thải."},
    {"sent": "When oxygen joins with blood, it forms oxyhaemoglobin.", "vnSent": "Khi oxy kết hợp với máu, nó tạo thành oxyhaemoglobin."},
    {"sent": "Aerobic respiration only happens when oxygen is present.", "vnSent": "Hô hấp hiếu khí chỉ xảy ra khi có oxy."},
    {"sent": "White blood cells produce antibodies to fight disease.", "vnSent": "Bạch cầu tạo ra kháng thể để chống lại bệnh tật."}
  ],
  "passages": [
    {
      "title": "How Cells Get Energy",
      "text": "Every living cell needs energy to stay alive and grow. Cells get this energy through a process called {respiration}. This chemical reaction takes place in small structures called {mitochondria}. To start this reaction, the cell needs two {reactants}: {glucose} from food and oxygen from the air. Because this process uses oxygen, it is specifically called {aerobic respiration}.",
      "vnText": "Mọi tế bào sống đều cần năng lượng để tồn tại và phát triển. Tế bào lấy năng lượng này thông qua một quá trình gọi là hô hấp tế bào. Phản ứng hóa học này diễn ra trong các cấu trúc nhỏ gọi là ty thể. Để bắt đầu phản ứng này, tế bào cần hai chất phản ứng: đường glucose từ thức ăn và oxy từ không khí. Vì quá trình này sử dụng oxy, nó được gọi cụ thể là hô hấp hiếu khí."
    },
    {
      "title": "The Transport System",
      "text": "The body uses a transport system to move supplies. {Blood plasma} is the pale yellow liquid that carries everything. Millions of {red blood cells} float in this liquid. These cells contain a special red protein called {haemoglobin}. In the lungs, oxygen joins with this protein to form {oxyhaemoglobin}. This turns the blood bright red as it travels to deliver oxygen to the rest of the body.",
      "vnText": "Cơ thể sử dụng một hệ thống vận chuyển để di chuyển các nguồn cung cấp. Huyết tương là chất lỏng màu vàng nhạt vận chuyển mọi thứ. Hàng triệu tế bào hồng cầu trôi nổi trong chất lỏng này. Những tế bào này chứa một loại protein màu đỏ đặc biệt gọi là huyết sắc tố (haemoglobin). Trong phổi, oxy kết hợp với protein này để tạo thành oxyhaemoglobin. Điều này làm cho máu chuyển sang màu đỏ tươi khi nó di chuyển để phân phối oxy đến phần còn lại của cơ thể."
    },
    {
      "title": "Protecting the Body",
      "text": "The blood also helps to defend the body from illness. {White blood cells} identify and destroy germs known as pathogens. Unlike red cells, each white blood cell contains a nucleus to control its actions. Some white cells produce antibodies to kill germs quickly. Doctors often use a stain on blood slides to identify these cells under a microscope.",
      "vnText": "Máu cũng giúp bảo vệ cơ thể khỏi bệnh tật. Các tế bào bạch cầu xác định và tiêu diệt vi trùng được gọi là mầm bệnh. Không giống như hồng cầu, mỗi tế bào bạch cầu chứa một nhân để kiểm soát các hoạt động của nó. Một số bạch cầu tạo ra kháng thể để tiêu diệt vi trùng một cách nhanh chóng. Bác sĩ thường sử dụng một loại thuốc nhuộm trên các tiêu bản máu để xác định các tế bào này dưới kính hiển vi."
    }
  ],
  "notebookArticle": {
    "title": "Unit 1B: Respiration & Blood",
    "vnTitle": "Bài 1B: Hô hấp tế bào & Máu",
    "instructions": "Read the following passage carefully. Write down the highlighted vocabulary words in your physical notebook, along with their definitions. This will help you synthesize the concepts for your writing tasks.",
    "vnInstructions": "Hãy đọc kỹ đoạn văn sau. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng. Điều này sẽ giúp bạn tổng hợp các khái niệm cho các bài tập viết sau này.",
    "sections": [
      {
        "heading": "1. How Cells Get Energy",
        "vnHeading": "1. Cách tế bào lấy năng lượng",
        "text": "Every living cell needs energy to stay alive and grow. Cells get this energy through a process called **Respiration**. This chemical reaction takes place in small structures called **Mitochondria**. To start this reaction, the cell needs two **Reactants**: **Glucose** from food and oxygen from the air. Because this process uses oxygen, it is specifically called **Aerobic Respiration**.",
        "vnText": "Mọi tế bào sống đều cần năng lượng để tồn tại và phát triển. Tế bào lấy năng lượng này thông qua một quá trình gọi là **Hô hấp tế bào**. Phản ứng hóa học này diễn ra trong các cấu trúc nhỏ gọi là **Ty thể**. Để bắt đầu phản ứng này, tế bào cần hai **Chất phản ứng**: **Đường glucose** từ thức ăn và oxy từ không khí. Vì quá trình này sử dụng oxy, nó được gọi cụ thể là **Hô hấp hiếu khí**."
      },
      {
        "heading": "2. The Transport System",
        "vnHeading": "2. Hệ thống vận chuyển",
        "text": "The body uses a transport system to move supplies. **Blood Plasma** is the pale yellow liquid that carries everything. Millions of **Red Blood Cells** float in this liquid. These cells contain a special red protein called **Haemoglobin**. In the lungs, oxygen joins with this protein to form **Oxyhaemoglobin**. This turns the blood bright red as it travels to deliver oxygen to the rest of the body.",
        "vnText": "Cơ thể sử dụng một hệ thống vận chuyển để di chuyển các nguồn cung cấp. **Huyết tương** là chất lỏng màu vàng nhạt vận chuyển mọi thứ. Hàng triệu **Hồng cầu** trôi nổi trong chất lỏng này. Những tế bào này chứa một loại protein màu đỏ đặc biệt gọi là **Huyết sắc tố**. Trong phổi, oxy kết hợp với protein này để tạo thành **Oxyhaemoglobin**. Điều này làm cho máu chuyển sang màu đỏ tươi khi nó di chuyển để phân phối oxy đến phần còn lại của cơ thể."
      },
      {
        "heading": "3. Protecting the Body",
        "vnHeading": "3. Bảo vệ cơ thể",
        "text": "The blood also helps to defend the body from illness. **White Blood Cells** identify and destroy germs known as pathogens. Unlike red cells, each white blood cell contains a nucleus to control its actions. Some white cells produce antibodies to kill germs quickly. Doctors often use a stain on blood slides to identify these cells under a microscope.",
        "vnText": "Máu cũng giúp bảo vệ cơ thể khỏi bệnh tật. Các **Bạch cầu** xác định và tiêu diệt vi trùng được gọi là mầm bệnh. Không giống như hồng cầu, mỗi tế bào bạch cầu chứa một nhân để kiểm soát các hoạt động của nó. Một số bạch cầu tạo ra kháng thể để tiêu diệt vi trùng một cách nhanh chóng. Bác sĩ thường sử dụng một loại thuốc nhuộm trên các tiêu bản máu để xác định các tế bào này dưới kính hiển vi."
      }
    ]
  },
  "shortQA": [
    {
      "question": "How is respiration different from breathing?",
      "requiredWords": [
        ["Respiration", "respire", "respirations"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating breathing is the physical movement of air into and out of the lungs.",
        "1 mark for explaining respiration is a chemical reaction inside cells that releases energy."
      ],
      "modelAnswer": "Breathing is the physical action of moving air in and out of the lungs, but respiration is the chemical reaction inside cells that releases energy from food."
    },
    {
      "question": "How does the blood move supplies to your body cells?",
      "requiredWords": [
        ["Blood Plasma", "plasma"],
        ["Red Blood Cells", "red cells", "RBCs"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating blood plasma carries nutrients/glucose.",
        "1 mark for stating red blood cells carry oxygen."
      ],
      "modelAnswer": "The liquid blood plasma transports nutrients like glucose, while the red blood cells carry the needed oxygen through the body."
    },
    {
      "question": "How do white blood cells protect you from getting sick?",
      "requiredWords": [
        ["White Blood Cells", "white cells", "WBCs"], 
        ["Antibodies", "antibody"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating white blood cells identify and attack pathogens (germs).",
        "1 mark for mentioning they produce antibodies to help kill the pathogens."
      ],
      "modelAnswer": "White blood cells defend the body by attacking invading germs and producing special chemicals called antibodies to kill them quickly."
    },
    {
      "question": "Where does aerobic respiration happen and what is needed for it?",
      "requiredWords": [
        ["Mitochondria", "mitochondrion"], 
        ["Reactants", "reactant"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating it happens inside the mitochondria.",
        "1 mark for stating the reactants (glucose and oxygen) are needed to start the process."
      ],
      "modelAnswer": "Aerobic respiration happens inside the mitochondria of a cell, and it needs two main reactants—glucose and oxygen—to begin."
    },
    {
      "question": "Why does your body temperature go up when you run or exercise?",
      "requiredWords": [
        ["Respiration", "respire", "respirating"], 
        ["Heat Energy", "heat", "energy"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating that exercise requires more respiration in muscles.",
        "1 mark for explaining that respiration releases heat energy as a byproduct."
      ],
      "modelAnswer": "When you exercise, your muscle cells perform more respiration to get energy, and this chemical reaction naturally releases heat energy."
    },
    {
      "question": "What is the job of the liquid part of your blood?",
      "requiredWords": [
        ["Blood Plasma", "plasma"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for identifying the liquid as blood plasma.",
        "1 mark for stating it transports dissolved substances and cells around the body."
      ],
      "modelAnswer": "The liquid part of the blood is called blood plasma, and its job is to act as a transport system carrying cells and dissolved nutrients."
    }
  ],
  "essay": {
    "task": "A doctor is examining a patient who feels constantly tired and gets sick very easily. Explain how a lower-than-normal amount of red and white blood cells could cause these two specific symptoms.",
    "guidelines": [
      "Explain the job of red blood cells and how a lack of them affects aerobic respiration.",
      "Explain the job of white blood cells and how a lack of them affects the body's defense system."
    ],
    "requiredWords": [
      ["Red Blood Cells", "red cells", "RBCs"], 
      ["Respiration", "respire", "energy"], 
      ["White Blood Cells", "white cells", "WBCs"]
    ],
    "scienceMaxMarks": 4,
    "markScheme": [
      "1 mark for stating red blood cells carry oxygen.",
      "1 mark for linking a lack of oxygen to less aerobic respiration/less energy (causing tiredness).",
      "1 mark for stating white blood cells fight pathogens/germs.",
      "1 mark for concluding that fewer white blood cells means the body cannot defend itself well (getting sick easily)."
    ],
    "modelAnswer": "If the patient has a low amount of red blood cells, their body cannot transport enough oxygen to their cells. Without enough oxygen, the cells cannot perform aerobic respiration efficiently, meaning less energy is released, causing constant tiredness. Additionally, white blood cells act as the body's defense army against pathogens. If there are too few white blood cells, the patient cannot produce enough antibodies or fight off infections, which makes them get sick very easily."
  },
  "diagrams": [
    {
      "id": "1B_blood_microscope",
      "imageUrl": "/images/Y8/blood_microscope.jpg",
      "prompt": "This photograph shows a sample of human blood viewed through a microscope after a special stain was added. Identify the two types of cells visible and explain two differences between them based ONLY on what you can see in the image.",
      "requiredWords": [
        ["Red Blood Cells", "red cells", "RBCs"], 
        ["White Blood Cells", "white cells", "WBCs"],
        ["Nucleus", "nuclei", "purple"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for identifying both red and white blood cells.",
        "1 mark for noting that the white blood cells have dark purple nuclei visible (due to the stain).",
        "1 mark for noting that the red blood cells are much more numerous OR do not have visible nuclei."
      ],
      "modelAnswer": "The image shows both red blood cells and white blood cells floating in the blood plasma. Based on the photograph, the main differences are that the white blood cells are slightly larger and have dark purple nuclei visible due to the stain, whereas the red blood cells are much more numerous and do not have nuclei."
    },
    {
      "id": "1B_whitebloodcell",
      "imageUrl": "/images/Y8/whitebloodcell.jpg",
      "prompt": "The diagram illustrates two different methods that white blood cells use to defend the body against invading pathogens. Describe both of these methods in detail.",
      "requiredWords": [
        ["Capture", "engulf", "digest", "swallow"], 
        ["Antibodies", "antibody"], 
        ["Pathogens", "bacteria", "germs"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for describing the first method as the cell changing shape to capture/engulf the pathogen.",
        "1 mark for mentioning the cell digests or destroys the captured pathogen.",
        "1 mark for describing the second method as the cell producing Y-shaped antibodies.",
        "1 mark for explaining that antibodies stick to pathogens to kill them or clump them together."
      ],
      "modelAnswer": "White blood cells use two primary methods to defend the body. First, some white blood cells can change their shape, pushing out their cytoplasm to capture and digest the pathogen directly. Second, other white blood cells produce special chemicals called antibodies. These Y-shaped antibodies stick to the pathogens, either killing them directly or clumping them together so other cells can easily destroy them."
    }
  ]
};
</file>

<file path="src/data/Y8/Y8_2A.js">
export const Y8_2A_DATA = {
  "title": "Unit 2: Solutions and Solubility",
  "description": "Explore the properties of materials by learning how substances dissolve to form solutions, the difference between concentrated and dilute mixtures, and how temperature affects solubility.",
  "realWords": [
    {"word": "Dissolving", "phonetic": "/dih-zol-ving/", "def": "The process where a substance mixes completely with a liquid to form a solution.", "vn": "Sự hòa tan", "vnDef": "Quá trình một chất trộn lẫn hoàn toàn với một chất lỏng để tạo thành dung dịch.", "sent": "Stirring the tea speeds up the dissolving of the sugar.", "vnSent": "Khuấy trà làm tăng tốc độ hòa tan của đường."},
    {"word": "Solution", "phonetic": "/suh-loo-shuhn/", "def": "A transparent mixture made when a solute is dissolved in a solvent.", "vn": "Dung dịch", "vnDef": "Một hỗn hợp trong suốt được tạo ra khi chất tan hòa tan trong dung môi.", "sent": "Salt and water mix together to create a colourless solution.", "vnSent": "Muối và nước hòa quyện với nhau để tạo ra một dung dịch không màu."},
    {"word": "Solute", "phonetic": "/sol-yoot/", "def": "The solid substance that dissolves into a liquid.", "vn": "Chất tan", "vnDef": "Chất rắn hòa tan vào trong chất lỏng.", "sent": "In a cup of sweet coffee, the sugar acts as the solute.", "vnSent": "Trong một tách cà phê ngọt, đường đóng vai trò là chất tan."},
    {"word": "Solvent", "phonetic": "/sol-vuhnt/", "def": "The liquid that a substance dissolves into.", "vn": "Dung môi", "vnDef": "Chất lỏng mà một chất hòa tan vào.", "sent": "Water is considered a universal solvent because it dissolves many things.", "vnSent": "Nước được coi là dung môi phổ biến vì nó hòa tan nhiều thứ."},
    {"word": "Transparent", "phonetic": "/trans-par-uhnt/", "def": "A material or liquid that you can easily see through.", "vn": "Trong suốt", "vnDef": "Một vật liệu hoặc chất lỏng mà bạn có thể dễ dàng nhìn xuyên qua.", "sent": "A true solution is always transparent, even if it has a colour.", "vnSent": "Một dung dịch thực sự luôn trong suốt, ngay cả khi nó có màu."},
    {"word": "Opaque", "phonetic": "/oh-payk/", "def": "A material or liquid that you cannot see through.", "vn": "Đục / Không trong suốt", "vnDef": "Một vật liệu hoặc chất lỏng mà bạn không thể nhìn xuyên qua.", "sent": "Milk is opaque, so we know it is not a proper solution.", "vnSent": "Sữa có màu đục, vì vậy chúng ta biết nó không phải là một dung dịch thích hợp."},
    {"word": "Concentrated", "phonetic": "/kon-suhn-tray-tid/", "def": "A solution that contains a large number of solute particles.", "vn": "Đậm đặc", "vnDef": "Một dung dịch chứa một số lượng lớn các hạt chất tan.", "sent": "A concentrated dark blue dye has many colour particles in it.", "vnSent": "Thuốc nhuộm màu xanh đậm đặc chứa rất nhiều hạt màu trong đó."},
    {"word": "Dilute", "phonetic": "/dye-loot/", "def": "A solution that contains only a small number of solute particles.", "vn": "Loãng", "vnDef": "Một dung dịch chỉ chứa một số lượng nhỏ các hạt chất tan.", "sent": "Adding more water to the mixture will make it more dilute.", "vnSent": "Thêm nhiều nước vào hỗn hợp sẽ làm cho nó loãng hơn."},
    {"word": "Solubility", "phonetic": "/sol-yuh-bil-ih-tee/", "def": "The measurement of how much solute can dissolve in a solvent.", "vn": "Độ hòa tan", "vnDef": "Thước đo lượng chất tan có thể hòa tan trong một dung môi.", "sent": "The table shows the solubility of different salts in water.", "vnSent": "Bảng này cho thấy độ hòa tan của các loại muối khác nhau trong nước."},
    {"word": "Saturated", "phonetic": "/sach-uh-ray-tid/", "def": "A solution that cannot dissolve any more solute at that temperature.", "vn": "Bão hòa", "vnDef": "Một dung dịch không thể hòa tan thêm bất kỳ chất tan nào ở nhiệt độ đó.", "sent": "The water became saturated, leaving solid salt at the bottom of the beaker.", "vnSent": "Nước trở nên bão hòa, để lại muối rắn ở đáy cốc."}
  ],
  "fakeWords": [
    {"word": "Dissolvation", "imitating": "Dissolving"},
    {"word": "Solutiology", "imitating": "Solution"},
    {"word": "Solutary", "imitating": "Solute"},
    {"word": "Solvention", "imitating": "Solvent"},
    {"word": "Transparic", "imitating": "Transparent"},
    {"word": "Opaqual", "imitating": "Opaque"},
    {"word": "Concentratious", "imitating": "Concentrated"},
    {"word": "Dilutivity", "imitating": "Dilute"},
    {"word": "Solubleness", "imitating": "Solubility"},
    {"word": "Saturational", "imitating": "Saturated"}
  ],
  "dictation": [
    {"sent": "A solution is made when a solute dissolves in a solvent.", "vnSent": "Một dung dịch được tạo ra khi chất tan hòa tan trong dung môi."},
    {"sent": "The substance that seems to disappear is the solute.", "vnSent": "Chất dường như biến mất được gọi là chất tan."},
    {"sent": "The liquid that does the dissolving is called the solvent.", "vnSent": "Chất lỏng thực hiện việc hòa tan được gọi là dung môi."},
    {"sent": "All solutions are transparent, meaning you can see through them.", "vnSent": "Tất cả các dung dịch đều trong suốt, nghĩa là bạn có thể nhìn xuyên qua chúng."},
    {"sent": "Milk is opaque, therefore it is not a true solution.", "vnSent": "Sữa có màu đục, do đó nó không phải là một dung dịch thực sự."},
    {"sent": "A concentrated mixture has many dissolved solute particles.", "vnSent": "Một hỗn hợp đậm đặc có nhiều hạt chất tan được hòa tan."},
    {"sent": "Adding more liquid makes a solution more dilute.", "vnSent": "Thêm nhiều chất lỏng sẽ làm cho dung dịch loãng hơn."},
    {"sent": "Solubility measures how much powder can dissolve in a liquid.", "vnSent": "Độ hòa tan đo lường lượng bột có thể hòa tan trong một chất lỏng."},
    {"sent": "A saturated solution cannot absorb any more solid powder.", "vnSent": "Một dung dịch bão hòa không thể hấp thụ thêm bất kỳ bột rắn nào nữa."},
    {"sent": "Heating a liquid usually increases its overall solubility.", "vnSent": "Việc đun nóng một chất lỏng thường làm tăng độ hòa tan tổng thể của nó."}
  ],
  "passages": [
    {
      "title": "Making a Mixture",
      "text": "When you mix sugar into water, it seems to disappear. This process is called {dissolving}. The solid sugar is the {solute}, and the liquid water is the {solvent}. Together, they form a clear mixture called a {solution}. Unlike milk, which is {opaque}, true solutions are always {transparent}, even if they have a bright colour.",
      "vnText": "Khi bạn trộn đường vào nước, nó dường như biến mất. Quá trình này được gọi là sự hòa tan. Đường ở thể rắn là chất tan, và nước ở thể lỏng là dung môi. Cùng nhau, chúng tạo thành một hỗn hợp trong trẻo gọi là dung dịch. Không giống như sữa có màu đục, các dung dịch thực sự luôn trong suốt, ngay cả khi chúng có màu sắc sặc sỡ."
    },
    {
      "title": "Changing the Strength",
      "text": "You can change how strong a liquid mixture is by adjusting the ingredients. A {concentrated} mixture has a large number of dissolved particles packed together in the liquid. If you add more water, the particles spread out further, creating a much more {dilute} mixture with fewer particles in the same space.",
      "vnText": "Bạn có thể thay đổi độ mạnh của hỗn hợp chất lỏng bằng cách điều chỉnh các thành phần. Một hỗn hợp đậm đặc có một số lượng lớn các hạt hòa tan tập trung lại với nhau trong chất lỏng. Nếu bạn thêm nhiều nước hơn, các hạt sẽ phân tán ra xa hơn, tạo ra một hỗn hợp loãng hơn nhiều với ít hạt hơn trong cùng một không gian."
    },
    {
      "title": "Heat and Limits",
      "text": "Every substance has a limit to how much can dissolve, known as its {solubility}. When a liquid can no longer absorb any more solid, it becomes {saturated}. If you heat the liquid, the particles gain energy, vibrate, and move faster. This extra energy usually allows a greater mass of solid to dissolve.",
      "vnText": "Mỗi chất đều có giới hạn về lượng có thể hòa tan, được gọi là độ hòa tan. Khi một chất lỏng không thể hấp thụ thêm bất kỳ chất rắn nào nữa, nó trở nên bão hòa. Nếu bạn đun nóng chất lỏng, các hạt sẽ thu được năng lượng, rung động và di chuyển nhanh hơn. Năng lượng bổ sung này thường cho phép một khối lượng chất rắn lớn hơn được hòa tan."
    }
  ],
  "notebookArticle": {
    "title": "Unit 2: Solutions and Solubility",
    "vnTitle": "Bài 2: Dung dịch và Độ hòa tan",
    "instructions": "Read the following passage carefully. Write down the highlighted vocabulary words in your physical notebook, along with their definitions. This will help you synthesize the concepts for your writing tasks.",
    "vnInstructions": "Hãy đọc kỹ đoạn văn sau. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng. Điều này sẽ giúp bạn tổng hợp các khái niệm cho các bài tập viết sau này.",
    "sections": [
      {
        "heading": "1. What is a Solution?",
        "vnHeading": "1. Dung dịch là gì?",
        "text": "When you place sugar in water, it undergoes **Dissolving**. The solid substance is called the **Solute**, and the liquid it enters is the **Solvent**. The resulting mixture is a **Solution**. All true solutions are **Transparent**, meaning you can see through them, unlike milk which is **Opaque**.",
        "vnText": "Khi bạn cho đường vào nước, nó trải qua **Sự hòa tan**. Chất rắn được gọi là **Chất tan**, và chất lỏng mà nó đi vào là **Dung môi**. Hỗn hợp tạo thành là một **Dung dịch**. Tất cả các dung dịch thực sự đều **Trong suốt**, nghĩa là bạn có thể nhìn xuyên qua chúng, không giống như sữa có màu **Đục**."
      },
      {
        "heading": "2. Particle Concentration",
        "vnHeading": "2. Nồng độ hạt",
        "text": "The strength of a solution depends on its particles. A **Concentrated** solution contains many dissolved particles. If you add more solvent, the particles spread out, creating a **Dilute** solution.",
        "vnText": "Độ mạnh của một dung dịch phụ thuộc vào các hạt của nó. Một dung dịch **Đậm đặc** chứa nhiều hạt hòa tan. Nếu bạn thêm nhiều dung môi hơn, các hạt sẽ lan rộng ra, tạo ra một dung dịch **Loãng**."
      },
      {
        "heading": "3. Temperature and Solubility",
        "vnHeading": "3. Nhiệt độ và Độ hòa tan",
        "text": "Different solids have different limits for dissolving, known as their **Solubility**. Once a liquid cannot dissolve any more powder, it is considered **Saturated**. Increasing the temperature gives particles more kinetic energy, which usually increases the solubility of the substance.",
        "vnText": "Các chất rắn khác nhau có giới hạn hòa tan khác nhau, được gọi là **Độ hòa tan** của chúng. Khi một chất lỏng không thể hòa tan thêm bột, nó được coi là **Bão hòa**. Việc tăng nhiệt độ cung cấp cho các hạt nhiều động năng hơn, điều này thường làm tăng độ hòa tan của chất đó."
      }
    ]
  },
  "shortQA": [
    {
      "question": "What is the scientific difference between a solute and a solvent?",
      "requiredWords": [
        ["Solute", "solutes"], 
        ["Solvent", "solvents"],
        ["Dissolve", "dissolving", "dissolved"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating the solute is the substance that gets dissolved.",
        "1 mark for stating the solvent is the liquid that does the dissolving."
      ],
      "modelAnswer": "The solute is the solid substance that dissolves, while the solvent is the liquid that the solute dissolves into."
    },
    {
      "question": "How can you tell if a liquid mixture is a true solution or not just by looking at it?",
      "requiredWords": [
        ["Transparent", "clear"], 
        ["Opaque", "cloudy"], 
        ["See through", "light"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for explaining that true solutions are always transparent (you can see through them).",
        "1 mark for stating that non-solutions are opaque (cannot be seen through)."
      ],
      "modelAnswer": "You can tell because a true solution is always transparent, meaning you can see clearly through it. If the liquid is opaque and you cannot see through it, it is not a solution."
    },
    {
      "question": "Using the particle theory, explain the difference between a concentrated and a dilute solution.",
      "requiredWords": [
        ["Concentrated", "concentration"], 
        ["Dilute", "diluted"], 
        ["Particles", "particle"]
      ],
      "scienceMaxMarks": 2,
      "markScheme": [
        "1 mark for stating concentrated solutions have a large number of solute particles.",
        "1 mark for stating dilute solutions have fewer solute particles in the same volume."
      ],
      "modelAnswer": "A concentrated solution has a large number of solute particles packed into the solvent. In contrast, a dilute solution has fewer solute particles spread out over the same volume of liquid."
    },
    {
      "question": "Explain why increasing the temperature of water allows more sugar to dissolve.",
      "requiredWords": [
        ["Temperature", "heat", "hot"], 
        ["Energy", "kinetic energy"], 
        ["Move", "vibrate", "faster"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for stating particles gain more energy.",
        "1 mark for stating particles vibrate and move faster.",
        "1 mark for explaining this movement helps separate the sugar particles to mix with water."
      ],
      "modelAnswer": "When you increase the temperature, the water particles gain more energy. They vibrate and move much faster, which helps them bump into the sugar and separate the particles more easily, increasing solubility."
    }
  ],
  "essay": {
    "task": "A student accidentally mixed a small amount of solid copper sulfate and sand together. The student needs to separate the copper sulfate from the sand. Describe a step-by-step scientific method to do this, explaining *why* each step works based on the properties of solubility.",
    "guidelines": [
      "Explain the first step involving water and stirring.",
      "Explain why one substance acts as a solute while the other does not.",
      "Describe how to physically separate the newly formed liquid from the sand.",
      "Explain how to get the solid copper sulfate back from the liquid."
    ],
    "requiredWords": [
      ["Solvent", "water"], 
      ["Solute", "copper sulfate"], 
      ["Dissolve", "dissolves", "soluble"],
      ["Solution", "mixture"],
      ["Filter", "filtration", "funnel"],
      ["Evaporate", "evaporation", "heat"]
    ],
    "scienceMaxMarks": 6,
    "markScheme": [
      "1 mark for adding water and stirring.",
      "1 mark for explaining that copper sulfate acts as a solute and dissolves in the solvent.",
      "1 mark for explaining that sand is insoluble (does not dissolve).",
      "1 mark for filtering the mixture.",
      "1 mark for stating the sand stays in the filter while the copper sulfate solution passes through.",
      "1 mark for evaporating/heating the water to leave the solid copper sulfate crystals behind."
    ],
    "modelAnswer": "First, the student should add water (the solvent) to the mixture and stir it. Because copper sulfate is soluble, it will act as the solute and dissolve into the water to form a blue solution. The sand is insoluble, meaning it will not dissolve. Next, the student should pour the mixture through a filter. The solid sand will get trapped in the filter paper, while the transparent copper sulfate solution will pass straight through. Finally, to get the solid copper sulfate back, the student should heat the solution to evaporate the water, leaving only the copper sulfate crystals behind."
  },
  "diagrams": [
    {
      "id": "2A_solubility_table",
      "imageUrl": "/images/Y8/solubility_table.jpg",
      "prompt": "A scientist has 100 g of water at 50 °C and wants to make a fully saturated solution of potassium nitrate. According to the table, exactly how many grams should they add? If they then cool the water down to 20 °C, describe what will happen to the solution.",
      "requiredWords": [
        ["84", "eighty-four"], 
        ["32", "thirty-two"], 
        ["Solid", "crystals", "precipitate"],
        ["Decrease", "drop", "lower"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for correctly reading 84 grams from the table.",
        "1 mark for correctly identifying that the solubility decreases to 32 grams at 20 °C.",
        "1 mark for explaining that the excess dissolved salt will turn back into solid crystals."
      ],
      "modelAnswer": "To make a saturated solution at 50 °C, the scientist should add exactly 84 grams of potassium nitrate. If they cool the water down to 20 °C, the solubility drops significantly to only 32 grams. Because the cooler water cannot hold as much solute, the extra dissolved salt will fall out of the solution and form solid crystals at the bottom."
    },
    {
      "id": "2A_solubility_graph",
      "imageUrl": "/images/Y8/solubility_graph.jpg",
      "prompt": "Looking at the solubility graph, compare the line for sodium nitrate with the line for potassium nitrate. Describe how their solubility changes as the temperature rises from 0 °C to 80 °C, and identify at roughly what temperature their solubilities are equal.",
      "requiredWords": [
        ["Potassium nitrate", "potassium"], 
        ["Sodium nitrate", "sodium"], 
        ["Steep", "steeper", "faster", "rapidly"],
        ["Intersect", "cross", "equal"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for stating sodium nitrate starts with a higher solubility.",
        "1 mark for noting that potassium nitrate's line curves upwards much more steeply/faster.",
        "1 mark for stating that the lines intersect or cross.",
        "1 mark for estimating the intersection temperature at roughly 68 °C (accept 67-70 °C)."
      ],
      "modelAnswer": "At lower temperatures, sodium nitrate starts with a much higher solubility, but its line rises at a steady, moderate pace. In contrast, potassium nitrate starts very low, but its line curves upwards much more steeply, meaning its solubility increases much faster as it gets hotter. Because of this rapid increase, the two lines intersect at roughly 68 °C, which is the point where both salts have exactly the same solubility."
    }
  ]
};
</file>

<file path="src/data/Y8/Y8_3A.js">
export const Y8_3A_DATA = {
  "title": "Unit 3A: Forces, Motion, and Speed",
  "description": "Learn how balanced and unbalanced forces affect motion, and how to mathematically calculate speed using distance-time graphs.",
  "realWords": [
    {"word": "Force", "phonetic": "/fawrs/", "def": "A push, pull, or twist acting on an object.", "vn": "Lực", "vnDef": "Lực đẩy, lực kéo hoặc lực xoắn tác dụng lên một vật.", "sent": "A large force is needed to move the heavy rock.", "vnSent": "Cần một lực lớn để di chuyển tảng đá nặng."},
    {"word": "Balanced", "phonetic": "/bal-uhnst/", "def": "When two forces are equal in size and opposite in direction.", "vn": "Cân bằng", "vnDef": "Khi hai lực có độ lớn bằng nhau và ngược chiều nhau.", "sent": "The rock does not move because the forces acting on it are balanced.", "vnSent": "Tảng đá không di chuyển vì các lực tác dụng lên nó được cân bằng."},
    {"word": "Unbalanced", "phonetic": "/uhn-bal-uhnst/", "def": "When forces on an object are unequal, causing it to change its motion.", "vn": "Không cân bằng", "vnDef": "Khi các lực tác dụng lên một vật không bằng nhau, khiến vật thay đổi chuyển động.", "sent": "An unbalanced force causes the falling parachute to slow down.", "vnSent": "Một lực không cân bằng làm cho chiếc dù đang rơi chậm lại."},
    {"word": "Friction", "phonetic": "/frik-shuhn/", "def": "A force between two touching surfaces that resists movement.", "vn": "Lực ma sát", "vnDef": "Lực giữa hai bề mặt tiếp xúc chống lại sự di chuyển.", "sent": "Friction between the rock and the ground stops it from sliding.", "vnSent": "Lực ma sát giữa tảng đá và mặt đất ngăn không cho nó trượt đi."},
    {"word": "Weight", "phonetic": "/wayt/", "def": "The force of gravity pulling an object toward the centre of the Earth.", "vn": "Trọng lượng", "vnDef": "Lực hấp dẫn kéo một vật về phía tâm Trái đất.", "sent": "The object falls downwards because of its weight.", "vnSent": "Vật rơi xuống do trọng lượng của nó."},
    {"word": "Air Resistance", "phonetic": "/air ri-zis-tuhns/", "def": "A frictional force that pushes against objects falling through the air.", "vn": "Lực cản không khí", "vnDef": "Lực ma sát đẩy ngược lại các vật đang rơi qua không khí.", "sent": "The open parachute creates a lot of air resistance.", "vnSent": "Chiếc dù mở tạo ra nhiều lực cản không khí."},
    {"word": "Speed", "phonetic": "/speed/", "def": "How fast an object travels over a certain distance.", "vn": "Tốc độ", "vnDef": "Vật di chuyển nhanh như thế nào trên một khoảng cách nhất định.", "sent": "The car traveled down the highway at a very high speed.", "vnSent": "Chiếc xe chạy trên đường cao tốc với tốc độ rất cao."},
    {"word": "Newtons", "phonetic": "/noo-tuhnz/", "def": "The scientific unit used to measure force.", "vn": "Newton (Đơn vị đo lực)", "vnDef": "Đơn vị khoa học được sử dụng để đo lực.", "sent": "We measure the push or pull on an object in Newtons.", "vnSent": "Chúng ta đo lực đẩy hoặc kéo lên một vật bằng Newton."},
    {"word": "Metres per second", "phonetic": "/mee-terz per sek-uhnd/", "def": "The standard unit for measuring speed.", "vn": "Mét trên giây", "vnDef": "Đơn vị tiêu chuẩn để đo tốc độ.", "sent": "The speed of the car is 10 metres per second.", "vnSent": "Tốc độ của xe ô tô là 10 mét trên giây."},
    {"word": "Constant", "phonetic": "/kon-stuhnt/", "def": "Remaining steady and unchanged over time.", "vn": "Không đổi / Hằng số", "vnDef": "Luôn ổn định và không thay đổi theo thời gian.", "sent": "The object fell at a constant speed once the forces balanced out.", "vnSent": "Vật rơi với tốc độ không đổi khi các lực đã cân bằng."}
  ],
  "fakeWords": [
    {"word": "Fource", "imitating": "Force"},
    {"word": "Ballanced", "imitating": "Balanced"},
    {"word": "Unballanced", "imitating": "Unbalanced"},
    {"word": "Friccion", "imitating": "Friction"},
    {"word": "Wieght", "imitating": "Weight"},
    {"word": "Air Resistence", "imitating": "Air Resistance"},
    {"word": "Spead", "imitating": "Speed"},
    {"word": "Nutons", "imitating": "Newtons"},
    {"word": "Metres per seccond", "imitating": "Metres per second"},
    {"word": "Constent", "imitating": "Constant"}
  ],
  "dictation": [
    {"sent": "Forces are measured to see if they are balanced or unbalanced.", "vnSent": "Các lực được đo để xem chúng cân bằng hay không cân bằng."},
    {"sent": "A balanced force means the object will not change its movement.", "vnSent": "Lực cân bằng có nghĩa là vật sẽ không thay đổi chuyển động của nó."},
    {"sent": "Friction is a contact force that slows down moving objects.", "vnSent": "Ma sát là lực tiếp xúc làm chậm các vật đang chuyển động."},
    {"sent": "Weight is the force of gravity pulling toward the Earth.", "vnSent": "Trọng lượng là lực hấp dẫn kéo về phía Trái đất."},
    {"sent": "Air resistance makes a fast falling object slow down.", "vnSent": "Lực cản không khí làm cho một vật đang rơi nhanh bị chậm lại."},
    {"sent": "An unbalanced force can make an object change direction.", "vnSent": "Lực không cân bằng có thể làm một vật thay đổi hướng."},
    {"sent": "Force is always measured in units called Newtons.", "vnSent": "Lực luôn được đo bằng đơn vị gọi là Newton."},
    {"sent": "The standard unit for speed is metres per second.", "vnSent": "Đơn vị tiêu chuẩn cho tốc độ là mét trên giây."},
    {"sent": "A distance-time graph shows how far an object traveled.", "vnSent": "Biểu đồ khoảng cách-thời gian cho thấy một vật đã đi được bao xa."},
    {"sent": "A steeper line on the graph means a faster speed.", "vnSent": "Đường dốc hơn trên biểu đồ có nghĩa là tốc độ nhanh hơn."}
  ],
  "passages": [
    {
      "title": "Forces and Motion",
      "text": "An object will not move if the forces acting on it are perfectly {balanced}. For example, the {weight} pulling a heavy rock down is balanced by an upward contact {force} of exactly the same number of {Newtons} pushing up from the ground. If wind pushes the rock from the side, {friction} from the ground might balance it to keep it still. If a much larger, {unbalanced} push is applied, the rock will finally start to move or change direction.",
      "vnText": "Một vật sẽ không di chuyển nếu các lực tác dụng lên nó hoàn toàn cân bằng. Ví dụ, trọng lượng kéo một tảng đá nặng xuống được cân bằng bởi lực tiếp xúc hướng lên có cùng số Newton đẩy lên từ mặt đất. Nếu gió đẩy tảng đá từ một bên, lực ma sát từ mặt đất có thể cân bằng nó để giữ nó đứng yên. Nếu một lực đẩy lớn hơn nhiều, không cân bằng được áp dụng, tảng đá cuối cùng sẽ bắt đầu di chuyển hoặc thay đổi hướng."
    },
    {
      "title": "Slowing Down and Changing Direction",
      "text": "Forces can also make moving objects slow down. A parachute creates a huge amount of {air resistance} that pushes up against the pull of gravity. When this upward push equals the downward pull, the forces become balanced again, and the person falls at a {constant} speed. Unbalanced forces are also required to make objects change direction, like gravity keeping a planet in a circular orbit.",
      "vnText": "Các lực cũng có thể làm cho các vật thể đang chuyển động chậm lại. Một chiếc dù tạo ra một lượng lực cản không khí khổng lồ đẩy ngược lại lực kéo của trọng lực. Khi lực đẩy lên này bằng lực kéo xuống, các lực lại trở nên cân bằng, và người đó rơi với tốc độ không đổi. Các lực không cân bằng cũng cần thiết để làm cho vật thể thay đổi hướng, giống như trọng lực giữ một hành tinh trên quỹ đạo tròn."
    },
    {
      "title": "Calculating Speed",
      "text": "To find out how fast something is moving, you must find its {speed}. Scientists do this by measuring the total distance travelled and dividing it by the total time taken. To avoid confusion globally, the standard unit used for this measurement in all countries is {metres per second}.",
      "vnText": "Để tìm hiểu xem một vật đang di chuyển nhanh như thế nào, bạn phải tìm tốc độ của nó. Các nhà khoa học làm điều này bằng cách đo tổng khoảng cách đã đi và chia cho tổng thời gian đã thực hiện. Để tránh nhầm lẫn trên toàn cầu, đơn vị tiêu chuẩn được sử dụng cho phép đo này ở tất cả các quốc gia là mét trên giây."
    }
  ],
  "notebookArticle": {
    "title": "Unit 3A: Forces, Motion, and Speed",
    "vnTitle": "Bài 3A: Lực, Chuyển động và Tốc độ",
    "instructions": "Read the following passage carefully. Write down the highlighted vocabulary words in your physical notebook, along with their definitions. This will help you synthesize the concepts for your writing tasks.",
    "vnInstructions": "Hãy đọc kỹ đoạn văn sau. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng. Điều này sẽ giúp bạn tổng hợp các khái niệm cho các bài tập viết sau này.",
    "sections": [
      {
        "heading": "1. Balanced and Unbalanced",
        "vnHeading": "1. Cân bằng và Không cân bằng",
        "text": "Objects do not move if the forces acting on them are **Balanced**. The **Weight** pulling an object down is countered by a contact **Force** pushing up with the same amount of **Newtons**. If wind pushes an object, **Friction** can balance it. However, if an **Unbalanced** force is applied, the object will start moving.",
        "vnText": "Vật thể không di chuyển nếu các lực tác dụng lên chúng được **Cân bằng**. **Trọng lượng** kéo một vật xuống bị chống lại bởi **Lực** tiếp xúc đẩy lên với cùng số lượng **Newton**. Nếu gió đẩy một vật, **Ma sát** có thể cân bằng nó. Tuy nhiên, nếu áp dụng một lực **Không cân bằng**, vật thể sẽ bắt đầu di chuyển."
      },
      {
        "heading": "2. Slowing Down",
        "vnHeading": "2. Chậm lại",
        "text": "Forces can make objects slow down. A parachute creates **Air Resistance** that pushes up against gravity. Once the upward push equals the downward pull, the object falls at a steady, **Constant** speed.",
        "vnText": "Lực có thể làm cho vật thể chậm lại. Một chiếc dù tạo ra **Lực cản không khí** đẩy ngược lại trọng lực. Khi lực đẩy lên bằng lực kéo xuống, vật thể sẽ rơi với tốc độ đều đặn, **Không đổi**."
      },
      {
        "heading": "3. The Mathematics of Speed",
        "vnHeading": "3. Toán học về Tốc độ",
        "text": "To find out how fast something is moving, you must find its **Speed**. You do this by measuring the total distance travelled and dividing it by the total time taken. The standard unit is **Metres per second**.",
        "vnText": "Để tìm hiểu xem một vật đang di chuyển nhanh như thế nào, bạn phải tìm **Tốc độ** của nó. Bạn làm điều này bằng cách đo tổng khoảng cách đã đi và chia nó cho tổng thời gian đã thực hiện. Đơn vị tiêu chuẩn là **Mét trên giây**."
      }
    ]
  },
  "shortQA": [
    {
      "question": "Imagine a heavy rock resting on the ground. Why does the rock stay still and not fall toward the center of the Earth?",
      "requiredWords": [
        ["Weight", "gravity"], 
        ["Contact force", "ground", "pushing up"],
        ["Balanced", "equal", "opposite"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for identifying the downward force as weight.",
        "1 mark for identifying the upward force as the contact force from the ground.",
        "1 mark for stating that these two forces are perfectly balanced."
      ],
      "modelAnswer": "The rock stays still because the downward pull of its weight is perfectly balanced by the upward contact force from the ground."
    },
    {
      "question": "A bus travels 100 metres in 20 seconds. How do you find its speed? Write the math formula and the final answer with units.",
      "requiredWords": [
        ["Divide", "divided", "÷"], 
        ["100", "distance"], 
        ["20", "time"],
        ["5", "five"],
        ["Metres per second", "m/s"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for stating you must divide distance by time.",
        "1 mark for putting the correct numbers in the formula (100 ÷ 20).",
        "1 mark for finding the correct number (5).",
        "1 mark for using the correct units (metres per second)."
      ],
      "modelAnswer": "You find speed by dividing the distance by the time. So, you divide 100 by 20. The final answer is a speed of 5 metres per second."
    },
    {
      "question": "A person jumps out of an airplane and opens a parachute. This makes them slow down. What two forces are acting on the person? Why do they slow down?",
      "requiredWords": [
        ["Weight", "gravity", "pull"], 
        ["Air resistance", "parachute", "push"], 
        ["Unbalanced", "larger", "bigger"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for identifying weight as the force pulling down.",
        "1 mark for identifying air resistance as the force pushing up.",
        "1 mark for explaining the forces are unbalanced because air resistance is larger."
      ],
      "modelAnswer": "The two forces are weight pulling them down and air resistance pushing them up. When the parachute opens, the air resistance becomes much larger than the weight. This makes an unbalanced force that slows the person down."
    }
  ],
  "diagrams": [
    {
      "id": "3A_rock_force",
      "imageUrl": "/images/Y8/rock_force.jpg",
      "prompt": "This diagram shows four forces acting on a rock. The downward weight is 500 Newtons. The upward contact force is 500 Newtons. The wind pushes left with 50 Newtons. Friction pushes right with 50 Newtons. Do the math to find the total vertical force and total horizontal force. Will the rock move?",
      "requiredWords": [
        ["Subtract", "minus", "-"],
        ["0", "Zero"], 
        ["Balanced", "equal"], 
        ["Stationary", "not move", "still"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for calculating vertical force: 500 - 500 = 0 Newtons.",
        "1 mark for calculating horizontal force: 50 - 50 = 0 Newtons.",
        "1 mark for stating that the forces are balanced.",
        "1 mark for concluding the rock will not move."
      ],
      "modelAnswer": "To find the total force, we subtract the opposite sides. Vertically, 500 - 500 = 0 Newtons. Horizontally, 50 - 50 = 0 Newtons. Because the total force is 0, the forces are completely balanced. The rock will not move."
    },
    {
      "id": "3A_distance_time_graph",
      "imageUrl": "/images/Y8/distance_time_graph.jpg",
      "prompt": "This graph shows a car's journey. Look at the blue section (1) and the pink section (4). The pink line is steeper. What does a steeper line tell us about the speed of the car?",
      "requiredWords": [
        ["Gradient", "slope", "steepness", "steep"], 
        ["Faster", "higher", "greater"],
        ["Less time", "shorter time", "quicker"]
      ],
      "scienceMaxMarks": 3,
      "markScheme": [
        "1 mark for noting the pink line has a steeper gradient or slope.",
        "1 mark for stating this means the car was moving at a faster speed.",
        "1 mark for explaining it takes less time to travel the same distance when moving faster."
      ],
      "modelAnswer": "The pink line is steeper than the blue line. A steeper line on a distance-time graph means the car is moving at a faster speed. Because the car is faster, it takes less time to finish the journey."
    },
    {
      "id": "3A_movement_graph",
      "imageUrl": "/images/Y8/movement_graph.jpg",
      "prompt": "This graph shows a train journey. Look at the first part of the journey where the train leaves station P. It travels 2000 metres in 200 seconds. What is its speed? Use the formula: Speed = Distance ÷ Time.",
      "requiredWords": [
        ["Divide", "÷", "/"], 
        ["2000", "distance"], 
        ["200", "time"], 
        ["10", "ten"],
        ["Metres per second", "m/s"]
      ],
      "scienceMaxMarks": 4,
      "markScheme": [
        "1 mark for stating they must divide distance by time.",
        "1 mark for using the correct numbers: 2000 and 200.",
        "1 mark for the correct math answer: 10.",
        "1 mark for using the correct units: metres per second or m/s."
      ],
      "modelAnswer": "To find the speed, we divide the distance by the time. The distance is 2000 metres and the time is 200 seconds. 2000 ÷ 200 = 10. The speed of the train is 10 metres per second."
    }
  ]
};
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

<file path="src/index.css">
@tailwind base;
@tailwind components;
@tailwind utilities;
</file>

<file path="src/main.jsx">
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
</file>

<file path="src/tasks/Assessment.jsx">
// src/tasks/Assessment.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, GripVertical, CornerDownRight, Clock, AlertTriangle, Construction, FileQuestion, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Assessment({ unit, onComplete, onQuit }) {
  const assessmentData = unit?.assessment;
  
  if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions) || assessmentData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Construction className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Assessment Unavailable</h2>
        <div className="bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10 text-lg font-bold text-slate-500 dark:text-slate-400">
          No assessment data is currently configured for this unit.
        </div>
        <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const questions = assessmentData.questions;
  const passages = assessmentData.passages || [];
  const totalQuestions = questions.length;

  const [testPhase, setTestPhase] = useState('testing'); 
  const [answers, setAnswers] = useState({}); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(assessmentData.timeLimit || 1800); 
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null); 

  const currentQuestion = questions[currentQIndex] || null;
  const currentPassage = currentQuestion ? passages.find(p => p.id === currentQuestion.passageId) : null;

  const isDND = currentQuestion?.type === 'dnd' || currentQuestion?.type === 'order';
  const isInline = currentQuestion?.type === 'inline' || currentQuestion?.type === 'scrollBox';
  const isMCQ = !isDND && !isInline;

  const hasGraphic = currentQuestion?.inlineSvg || currentQuestion?.imageUrl || currentQuestion?.imageFile;
  const hasPassage = !!currentPassage;
  const hasLHS = hasGraphic || hasPassage;

  const currentAns = answers[currentQIndex] || {};

  useEffect(() => {
    if (testPhase !== 'testing') return;
    if (timeLeft <= 0 && !isTimeUp) {
      setIsTimeUp(true);
      finishTest();
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, testPhase, isTimeUp]);

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => { 
    setActiveGlossaryTerm(null); 
  }, [currentQIndex, testPhase]);

  const updateAnswer = (payload) => {
    setAnswers(prev => {
      const currentAnsObj = prev[currentQIndex] || {};
      return { ...prev, [currentQIndex]: { ...currentAnsObj, ...payload } };
    });
  };

  const handleSelectOption = (val) => {
    if (testPhase !== 'testing') return;
    updateAnswer({ selectedOption: val });
  };

  const handleDragStart = (e, itemId) => {
    if (testPhase !== 'testing') return;
    setDraggedItem(itemId);
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    e.stopPropagation();
    if (testPhase !== 'testing' || !draggedItem) return;
    
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    
    for (const key in newDrops) { 
      if (newDrops[key] === draggedItem) delete newDrops[key]; 
    }
    
    newDrops[slotId] = draggedItem;
    updateAnswer({ droppedItems: newDrops });
    setDraggedItem(null);
  };

  const removeDroppedItem = (slotId) => {
    if (testPhase !== 'testing') return;
    const currentDrops = currentAns.droppedItems || {};
    const newDrops = { ...currentDrops };
    delete newDrops[slotId];
    updateAnswer({ droppedItems: newDrops });
  };

  const handleInlineChange = (blankIndex, val) => {
    if (testPhase !== 'testing') return;
    const currentInline = currentAns.inlineAnswers || {};
    updateAnswer({ inlineAnswers: { ...currentInline, [blankIndex]: val } });
  };

  let isCurrentAnswered = false;
  if (currentQuestion) {
    if (isMCQ) isCurrentAnswered = !!currentAns.selectedOption;
    if (isInline) isCurrentAnswered = Object.keys(currentAns.inlineAnswers || {}).length === Object.keys(currentQuestion.blanks || {}).length;
    if (isDND) {
      let totalSlots = 0;
      (currentQuestion.targets || []).forEach(t => totalSlots += (currentQuestion.correctSets?.[t.id]?.length || 1));
      isCurrentAnswered = Object.keys(currentAns.droppedItems || {}).length === totalSlots;
    }
  }

  // Global Keyboard Navigation
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (testPhase === 'testing' && isCurrentAnswered) handleNextTest();
        else if (testPhase === 'reviewing') handleNextReview();
        else if (testPhase === 'intermission') { setCurrentQIndex(0); setTestPhase('reviewing'); }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (testPhase === 'testing') handlePrevTest();
        else if (testPhase === 'reviewing') handlePrevReview();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [testPhase, currentQIndex, isCurrentAnswered]);


  const checkQuestionCorrect = (qIndex) => {
    const q = questions[qIndex];
    const ans = answers[qIndex] || {};
    
    if (q.type === 'mcq') return ans.selectedOption === q.correct;
    
    if (q.type === 'inline' || q.type === 'scrollBox') {
      const userInline = ans.inlineAnswers || {};
      const blanks = q.blanks || {};
      for (const blankId of Object.keys(blanks)) {
        if (userInline[blankId] !== blanks[blankId].correct) return false;
      }
      return true;
    }
    
    if (q.type === 'dnd' || q.type === 'order') {
      const dropped = ans.droppedItems || {};
      let allCorrect = true;
      for (const target of (q.targets || [])) {
        const expectedArr = q.correctSets?.[target.id] || [];
        const userDroppedVals = [];
        
        for (let i = 0; i < expectedArr.length; i++) {
          const dId = dropped[`${target.id}_${i}`];
          const bankItem = (q.bank || []).find(b => b.id === dId);
          if (bankItem) userDroppedVals.push(bankItem.val);
        }

        if (q.type === 'order') {
          if (JSON.stringify(userDroppedVals) !== JSON.stringify(expectedArr)) allCorrect = false;
        } else {
          if (userDroppedVals.length !== expectedArr.length) allCorrect = false;
          const unmatchedExpected = [...expectedArr];
          for (const val of userDroppedVals) {
             const idx = unmatchedExpected.indexOf(val);
             if (idx !== -1) {
                unmatchedExpected.splice(idx, 1);
             } else {
                allCorrect = false;
             }
          }
        }
      }
      return allCorrect;
    }
    return false;
  };

  const finishTest = () => {
    let totalPossible = 0;
    let totalEarned = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const q = questions[i];
      const ans = answers[i] || {};

      if (q.type === 'mcq') {
        totalPossible += 1;
        if (ans.selectedOption === q.correct) totalEarned += 1;
      } else if (q.type === 'inline' || q.type === 'scrollBox') {
        const blanks = q.blanks || {};
        const userInline = ans.inlineAnswers || {};
        for (const blankId of Object.keys(blanks)) {
          totalPossible += 1;
          if (userInline[blankId] === blanks[blankId].correct) totalEarned += 1;
        }
      } else if (q.type === 'dnd' || q.type === 'order') {
        const dropped = ans.droppedItems || {};
        for (const target of (q.targets || [])) {
          const expectedArr = q.correctSets?.[target.id] || [];
          totalPossible += expectedArr.length;

          const userDroppedVals = [];
          for (let s = 0; s < expectedArr.length; s++) {
             const dId = dropped[`${target.id}_${s}`];
             const bankItem = (q.bank || []).find(b => b.id === dId);
             if (bankItem) userDroppedVals.push(bankItem.val);
          }

          if (q.type === 'order') {
            for (let s = 0; s < expectedArr.length; s++) {
              if (userDroppedVals[s] === expectedArr[s]) totalEarned += 1;
            }
          } else {
            const unmatchedExpected = [...expectedArr];
            for (const val of userDroppedVals) {
               const idx = unmatchedExpected.indexOf(val);
               if (idx !== -1) {
                 totalEarned += 1;
                 unmatchedExpected.splice(idx, 1);
               }
            }
          }
        }
      }
    }

    const calculatedScore = totalPossible === 0 ? 0 : Math.ceil((totalEarned / totalPossible) * 10);
    setFinalScore(calculatedScore);
    setTestPhase('intermission');
  };

  const handleNextTest = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else finishTest();
  };

  const handlePrevTest = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const handleNextReview = () => {
    if (currentQIndex + 1 < totalQuestions) setCurrentQIndex(prev => prev + 1);
    else {
      if (typeof onComplete === 'function') onComplete(finalScore);
    }
  };

  const handlePrevReview = () => {
    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
  };

  const renderPassageWithGlossary = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\{([^}]+)\}/g);
    return parts.map((part, i) => {
      if (i % 2 !== 0) {
        const cleanWord = part.toLowerCase();
        const termData = currentPassage?.glossary?.[cleanWord];
        if (!termData) return <span key={i} className="font-bold text-slate-800 dark:text-slate-200">{part}</span>;
        return (
          <button 
            key={i} 
            onClick={() => { setActiveGlossaryTerm({ word: part, ...termData }); }}
            className="text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-dashed border-emerald-600 dark:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors mx-0.5 rounded px-1"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (testPhase === 'intermission') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden transition-colors">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200 opacity-40 blur-[120px] pointer-events-none" />
        
        <TopBar onQuit={onQuit} current={totalQuestions} total={totalQuestions} modeTitle="Assessment Module" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 animate-in zoom-in-95 duration-500">
          <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-2xl w-full">
             <div className="w-32 h-32 mx-auto bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <CheckCircle2 className="w-16 h-16" strokeWidth={3} />
             </div>
             <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4">Assessment Complete</h1>
             <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-8">Let's see how you did.</p>
             
             <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-8 mb-10 shadow-sm">
                <span className="block text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Normalized XP</span>
                <div className="text-6xl font-black text-emerald-500">
                  {finalScore} <span className="text-4xl text-slate-300 dark:text-slate-600">/ 10</span>
                </div>
             </div>

             <button 
                onClick={() => { setCurrentQIndex(0); setTestPhase('reviewing'); }}
                className="w-full py-5 rounded-2xl font-black text-white text-xl uppercase tracking-widest transition-all bg-[#1CB0F6] border-b-[6px] border-[#1899D6] hover:bg-[#1899D6] active:border-b-0 active:translate-y-[6px] shadow-lg flex items-center justify-center"
             >
                Review Answers <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentlyCorrect = testPhase === 'reviewing' ? checkQuestionCorrect(currentQIndex) : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans relative transition-colors">
      
      <TopBar 
        onQuit={onQuit} 
        current={currentQIndex + 1} 
        total={totalQuestions} 
        modeTitle={testPhase === 'testing' ? "Assessment Module" : "Assessment Review"} 
      />

      {isTimeUp && testPhase === 'testing' && (
        <div className="bg-red-600 text-white p-3 text-center font-bold text-lg uppercase tracking-widest flex justify-center items-center shadow-md z-30 animate-in slide-in-from-top-2">
          <AlertTriangle className="mr-2" /> Time is up! Submitting answers...
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
        
        {hasLHS && (
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 pb-32 transition-colors">
            {hasPassage && (
              <div className={`animate-in fade-in duration-300 ${hasGraphic ? 'mb-8 border-b-2 border-slate-100 dark:border-slate-800 pb-8' : ''}`}>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-6 leading-tight">{currentPassage.title}</h2>
                <div className="mb-6">
                  {currentPassage.meta && (
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 gap-3">
                      <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{currentPassage.meta}</h3>
                    </div>
                  )}
                  <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                    {(currentPassage.text || []).map((p, i) => (
                      <p key={i}>{renderPassageWithGlossary(p)}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hasGraphic && (
              <div className="w-full animate-in fade-in duration-300">
                {currentQuestion.inlineSvg ? (
                  <div 
                    className="w-full h-auto flex items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.inlineSvg }}
                  />
                ) : (
                  <img 
                    src={`${import.meta.env.BASE_URL || ''}images/${unit?.id || 'MATH_1A'}/${(currentQuestion.imageFile || currentQuestion.imageUrl).split('/').pop()}`} 
                    alt="Assessment Diagram" 
                    className="w-full h-auto object-contain rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-inner p-6 dark:opacity-90"
                  />
                )}
              </div>
            )}
          </div>
        )}

        <div className={`w-full ${hasLHS ? 'md:w-1/2 bg-slate-50 dark:bg-slate-950' : 'max-w-4xl mx-auto bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800'} flex flex-col relative overflow-hidden pb-48 transition-colors`}>
          
          {testPhase === 'testing' && !isTimeUp && (
            <div className="absolute top-4 right-4 z-30 flex items-center font-black text-lg px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm text-slate-700 dark:text-slate-200">
               <Clock className="w-5 h-5 mr-2" />
               {formatTime(timeLeft)}
            </div>
          )}

          <div className="p-6 md:p-8 overflow-y-auto h-full relative animate-in fade-in slide-in-from-right-4 duration-300 pt-16 md:pt-10">
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-snug tracking-tight mb-8 pr-20">{currentQuestion.title}</h3>
            
            {isMCQ && (
              <div className="space-y-3">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = currentAns.selectedOption === opt.val;
                  const isCorrectAnswer = opt.val === currentQuestion.correct;
                  let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 shadow-sm hover:shadow-md";
                  
                  if (testPhase === 'reviewing') {
                    if (isCorrectAnswer) btnStyle = "bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635] shadow-sm";
                    else if (isSelected && !isCorrectAnswer) btnStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] text-[#A32D23] dark:text-[#f87171] shadow-sm";
                    else btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60";
                  } else if (isSelected) {
                    btnStyle = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 border-b-4 text-emerald-800 dark:text-emerald-400 translate-y-[-2px] shadow-md";
                  }

                  return (
                    <button 
                      key={opt.val}
                      onClick={() => handleSelectOption(opt.val)}
                      disabled={testPhase !== 'testing'}
                      className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-lg transition-all ${btnStyle}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {isDND && (
              <div className="space-y-8">
                <div className="sticky top-0 z-30 pt-1 pb-4 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md shadow-[0_15px_15px_-15px_rgba(0,0,0,0.1)] -mt-2">
                  <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Options Bank</h4>
                    <div className="flex flex-wrap gap-3">
                      {(currentQuestion.bank || []).map((opt) => {
                        const isUsed = Object.values(currentAns.droppedItems || {}).includes(opt.id);
                        if (isUsed) return null;
                        return (
                          <div
                            key={opt.id}
                            draggable={testPhase === 'testing'}
                            onDragStart={(e) => handleDragStart(e, opt.id)}
                            className={`flex items-center px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-all ${testPhase === 'testing' ? 'cursor-grab active:cursor-grabbing hover:border-emerald-400 hover:shadow-md' : 'opacity-50'}`}
                          >
                            <GripVertical className="w-5 h-5 mr-2 text-slate-400 dark:text-slate-500" />
                            {opt.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Targets</h4>
                  <div className={`grid gap-4 ${(currentQuestion.targets || []).length > 1 && currentQuestion.type !== 'order' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                    {(currentQuestion.targets || []).map((target) => {
                      const requiredCount = currentQuestion.correctSets?.[target.id]?.length || 1;
                      return (
                        <div key={target.id} className="flex flex-col bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                          <div className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-[15px] leading-tight text-center border-b-2 border-slate-100 dark:border-slate-800 pb-3">{target.title}</div>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: requiredCount }).map((_, slotIndex) => {
                              const slotId = `${target.id}_${slotIndex}`;
                              const droppedId = (currentAns.droppedItems || {})[slotId];
                              const droppedObj = (currentQuestion.bank || []).find(b => b.id === droppedId);
                              
                              let slotStyle = "bg-slate-50 dark:bg-slate-950 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500";
                              
                              if (testPhase === 'reviewing') {
                                const expectedArr = currentQuestion.correctSets?.[target.id] || [];
                                const droppedVal = droppedObj ? droppedObj.val : null;
                                let isCorrectInSlot = currentQuestion.type === 'order' ? expectedArr[slotIndex] === droppedVal : expectedArr.includes(droppedVal);
                                
                                if (!droppedId) slotStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] border-solid text-[#A32D23] dark:text-[#f87171] shadow-sm";
                                else if (isCorrectInSlot) slotStyle = "bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] border-solid text-[#3E7500] dark:text-[#a3e635] shadow-sm";
                                else slotStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] border-solid text-[#A32D23] dark:text-[#f87171] shadow-sm";
                              } else if (droppedObj) {
                                slotStyle = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 border-solid text-emerald-800 dark:text-emerald-400 shadow-sm";
                              }

                              return (
                                <div 
                                  key={slotId}
                                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                                  onDrop={(e) => handleDrop(e, slotId)}
                                  onClick={() => droppedObj && removeDroppedItem(slotId)}
                                  className={`min-h-[70px] flex items-center p-3 rounded-2xl border-2 transition-all ${slotStyle} ${testPhase === 'testing' && droppedObj ? 'cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950 hover:border-rose-300' : ''}`}
                                >
                                  {!droppedObj ? (
                                    <div className="flex items-center justify-center w-full">
                                      <CornerDownRight className="w-5 h-5 mr-2 opacity-50" />
                                      <span className="font-medium text-sm">{testPhase === 'reviewing' ? 'Left Blank' : 'Drop Item Here'}</span>
                                    </div>
                                  ) : (
                                    <div className="font-bold flex items-center justify-between w-full text-[15px]">
                                      <span>{droppedObj.text}</span>
                                      {testPhase === 'testing' && <XCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-rose-500 ml-2 flex-shrink-0 transition-colors" />}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isInline && (
              <div className="text-lg leading-loose text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                {(currentQuestion.textParts || []).map((part, i) => {
                  const blankIndex = i + 1;
                  const blankData = currentQuestion.blanks?.[blankIndex];
                  const selectedVal = (currentAns.inlineAnswers || {})[blankIndex];
                  
                  let selectStyle = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-100 hover:shadow-md';
                  let showCorrection = false;

                  if (testPhase === 'reviewing') {
                    const isCorrect = selectedVal === blankData?.correct;
                    if (isCorrect) selectStyle = 'bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635]';
                    else {
                      selectStyle = 'bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] text-[#A32D23] dark:text-[#f87171]';
                      showCorrection = true;
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {part}
                      {blankData && (
                        <span className="inline-flex items-center">
                          <select
                            value={selectedVal || ""}
                            onChange={(e) => handleInlineChange(blankIndex, e.target.value)}
                            disabled={testPhase !== 'testing'}
                            className={`mx-2 p-2 border-b-4 border-2 rounded-xl font-bold cursor-pointer transition-all outline-none appearance-none pr-8 bg-no-repeat shadow-sm ${selectStyle}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                          >
                            <option value="" disabled>{testPhase === 'reviewing' ? 'Blank' : 'Select...'}</option>
                            {(blankData.options || []).map(opt => <option key={opt.val} value={opt.val}>{opt.text}</option>)}
                          </select>
                          {showCorrection && (
                            <span className="text-[#3E7500] dark:text-[#a3e635] bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border border-[#58A700] px-2 py-1 rounded-lg ml-1 text-sm font-bold shadow-sm">
                              {blankData.options.find(o => o.val === blankData.correct)?.text}
                            </span>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {testPhase === 'testing' && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
            <button 
              onClick={handlePrevTest} 
              disabled={currentQIndex === 0}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30"
            >
              Previous
            </button>
            <button 
              onClick={handleNextTest}
              disabled={!isCurrentAnswered}
              className="px-10 py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all active:translate-y-[4px] border-b-[4px] active:border-b-0 shadow-md bg-[#1CB0F6] border-[#1899D6] hover:bg-[#159bd9] disabled:opacity-50 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500"
            >
              {currentQIndex === totalQuestions - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {testPhase === 'reviewing' && (
        <Feedback 
          isCorrect={isCurrentlyCorrect}
          expEn={currentQuestion.expEn}
          expVn={currentQuestion.expVn}
          onPrev={handlePrevReview}
          onNext={handleNextReview}
          isFirst={currentQIndex === 0}
          isLast={currentQIndex === totalQuestions - 1}
        />
      )}

    </div>
  );
}
</file>

<file path="src/tasks/Diagrams.jsx">
import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, ImageIcon, Type, FlaskConical, FileEdit, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeDiagram } from '../utils/aiGrader';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkRequiredWordGroup = (wordGroup, text) => {
  if (!text) return false;
  const group = Array.isArray(wordGroup) ? wordGroup : [wordGroup];

  for (let reqWord of group) {
    if (text.toLowerCase().includes(reqWord.toLowerCase())) return true;
    if (!reqWord.includes(' ')) {
      const words = text.split(/[\s,.-]+/);
      for (let w of words) {
        if (calculateSimilarity(reqWord, w) >= 0.85) return true;
      }
    }
  }
  return false;
};

export default function Diagrams({ pool, unitId, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike }) {
  const questions = pool?.diagrams || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); // Q, LOADING, A, SAVED_PERFECT, SAVED_API_ERROR
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];
    
    if (saved) {
      const text = typeof saved === 'string' ? saved : saved.text;
      const status = typeof saved === 'string' ? 'perfect' : saved.status;

      setUserAnswer(text);
      setFeedback(null);

      if (status === 'perfect') {
        setGameState('SAVED_PERFECT');
      } else if (status === 'api_error') {
        setGameState('SAVED_API_ERROR');
      } else if (status === 'strike_fallback') {
        setGameState('Q'); 
      } else {
        setGameState('Q');
      }
    } else {
      setUserAnswer('');
      setFeedback(null);
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <ImageIcon className="w-16 h-16 text-rose-300 mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Coming Soon</h2>
        <p className="text-lg text-slate-500 mb-8 max-w-md">Teacher is currently uploading the Diagrams for this unit.</p>
        <button onClick={onQuit} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all">
          Return
        </button>
      </div>
    );
  }

  const handleLocalFallbackGrade = () => {
    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    
    const trimmed = userAnswer.trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0; 

    const pointsEarned = usedWordGroups.length + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: currentQ.markScheme.map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Start with a capital and end with a period.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No Cambridge marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'strike_fallback' } }));
    setGameState('A');
  };

  const handleGrade = async () => {
    if (!userAnswer.trim()) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primaryRequiredWords = currentQ.requiredWords.map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      promptText: currentQ.prompt || currentQ.promptText,
      studentAnswer: userAnswer.trim(),
      requiredWords: primaryRequiredWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme
    };

    let aiData;

    try {
      aiData = await gradeDiagram(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeDiagram(payload);
      } catch (e2) {
        console.error("AI Grade Failed twice. Entering Error State.");
        setGameState('SAVED_API_ERROR');
        setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'api_error' } }));
        return;
      }
    }

    if (aiData.isHarmful || aiData.isGarbage) {
      const newStrikes = strikes + 1;
      if (onAddStrike) onAddStrike(newStrikes);
      
      if (newStrikes >= 3) {
        alert("Strike 3! You have submitted too many inappropriate or nonsense answers. The AI Grader is permanently disabled for this unit.");
        handleLocalFallbackGrade();
      } else {
        alert(`Warning! Nonsense or inappropriate answer detected. Strike ${newStrikes}/3.`);
        setGameState('Q'); 
      }
      return;
    }

    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = currentQ.markScheme.map((_, i) => i < scienceScore);

    const pointsEarned = usedWordGroups.length + scienceScore + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3; 
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.fixedAnswer || aiData.reworkedAnswer || userAnswer.trim(),
      isStrikeFallback: false
    });

    if (isPerfect) {
      setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'perfect' } }));
    }
    
    setGameState('A');
  };

  const handleNext = () => {
    let newCumPoints = cumulativePoints;
    let newMaxPoints = maxPossiblePoints;

    if (gameState === 'SAVED_PERFECT') {
      const maxP = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;
      newCumPoints += maxP;
      newMaxPoints += maxP;
    } else if (feedback) {
      newCumPoints += feedback.pointsEarned;
      newMaxPoints += feedback.maxPoints;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += currentQ.requiredWords.length + currentQ.scienceMaxMarks + 3;
    }

    setCumulativePoints(newCumPoints);
    setMaxPossiblePoints(newMaxPoints);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalXP = newMaxPoints === 0 ? 0 : Math.ceil((newCumPoints / newMaxPoints) * 20);
      onComplete(finalXP, localAnswers); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      if (gameState === 'Q' || gameState === 'SAVED_API_ERROR') {
        if (userAnswer.trim()) handleGrade();
      } else if (gameState === 'A' || gameState === 'SAVED_PERFECT') {
        handleNext();
      }
    }
  };

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-40 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 border-orange-300";
    textAreaClass += "text-orange-900";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 border-rose-400";
    textAreaClass += "text-rose-900";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] border-[#84cc16]";
    textAreaClass += "text-[#3f6212]";
  } else {
    containerClass += "bg-white border-slate-200";
    textAreaClass += "text-slate-800";
  }

  // Dynamic Image Logic Helper
  const renderVisual = () => {
    if (currentQ.inlineSvg) {
      return (
        <div 
          className="w-full h-auto max-h-[500px] flex items-center justify-center p-4 rounded-xl"
          dangerouslySetInnerHTML={{ __html: currentQ.inlineSvg }}
        />
      );
    } 
    
    if (currentQ.imageFile || currentQ.imageUrl) {
      const fallbackImage = currentQ.imageFile || currentQ.imageUrl;
      // Strip any leading slashes or directories for clean formatting
      const cleanImageName = fallbackImage.startsWith('/') ? fallbackImage.split('/').pop() : fallbackImage;
      const dynamicSrc = `${import.meta.env.BASE_URL || ''}images/${unitId}/${cleanImageName}`;

      return (
        <img 
          src={dynamicSrc} 
          alt="Science Diagram" 
          className="w-full h-auto max-h-[500px] object-contain rounded-xl"
        />
      );
    }
    
    return (
      <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
        <ImageIcon className="w-12 h-12" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <TopBar 
        current={currentIndex} 
        total={questions.length} 
        onQuit={() => onComplete(0, localAnswers)} 
        modeTitle="Diagram Analysis" 
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Image/SVG Viewer */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24">
               {renderVisual()}
            </div>
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            <div className="w-full mb-6 animate-in fade-in duration-300">
              <h2 className="text-rose-500 font-black text-xl mb-2 uppercase tracking-widest">
                Analysis {currentIndex + 1}
              </h2>
              <p className="text-2xl font-bold text-slate-800 leading-snug">
                {currentQ.prompt || currentQ.promptText}
              </p>
            </div>

            <div className={containerClass}>
              <textarea 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                disabled={gameState !== 'Q'}
                placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Analyze the diagram here..."}
                className={textAreaClass}
              />
            </div>

            {gameState !== 'LOADING' && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Required Vocabulary
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentQ.requiredWords.map((wordGroup, i) => {
                    const isUsed = feedback 
                      ? feedback.usedWordGroups.includes(wordGroup) 
                      : checkRequiredWordGroup(wordGroup, userAnswer);
                    const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                    
                    return (
                      <span 
                        key={i} 
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                          isUsed 
                            ? 'bg-[#d7ffb8] text-[#3e7500] border-[#58a700]' 
                            : 'bg-white text-[#58a700] border-[#58a700]'
                        }`}
                      >
                        {displayWord}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {gameState === 'SAVED_PERFECT' && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 pt-6 animate-in fade-in">
                 <button 
                   onClick={handleNext} 
                   className="flex items-center px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                 >
                   {currentIndex < questions.length - 1 ? 'Continue' : 'Complete Section'} 
                   <ArrowRight className="w-6 h-6 ml-3" />
                 </button>
              </div>
            )}

            {gameState === 'SAVED_API_ERROR' && (
              <div className="w-full animate-in fade-in">
                <div className="bg-orange-50 border border-orange-200 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
                   <div className="flex items-center mb-4">
                     <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                     <h3 className="text-xl font-black text-orange-800">Connection Failed</h3>
                   </div>
                   <p className="text-sm font-bold text-orange-700 mt-2">
                     The AI grader is currently offline. Your answer has been saved. Please continue and resubmit on a future attempt.
                   </p>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                     {currentIndex < questions.length - 1 ? 'Skip Question' : 'Complete Section'} <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>
              </div>
            )}

            {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 pt-6">
                <button 
                  onClick={handleGrade} 
                  disabled={!userAnswer.trim()} 
                  className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
                >
                  Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
                </button>
              </div>
            )}

            {gameState === 'LOADING' && (
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-slate-200 shadow-sm animate-pulse mb-8">
                 <div className="bg-rose-100 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-rose-500 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700">AI Tutor is analyzing your answer...</h3>
              </div>
            )}

            {gameState === 'A' && feedback && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                {!feedback.isPerfect && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Your Attempt
                    </span>
                    <p className="text-lg text-slate-700 font-medium italic">
                      "{feedback.originalAnswer}"
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-6 border-b border-slate-200 pb-6">
                  <div className={`p-3 rounded-full mr-4 flex-shrink-0 bg-rose-500`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-1">
                      Accuracy Score: 
                      <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {feedback.pointsEarned} / {feedback.maxPoints} Pts
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4 text-slate-800">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-amber-500" />
                      <h3 className="text-lg font-black">Cambridge Mark Scheme Breakdown</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-lg text-sm">
                      {feedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {currentQ.markScheme.map((mark, i) => (
                      <li key={i} className="flex items-start">
                        {feedback.scienceMarks[i] ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                   <div className="bg-[#fff9e6] border border-[#fde68a] p-6 rounded-[1.5rem]">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center text-[#d97706]">
                         <Type className="w-5 h-5 mr-2" />
                         <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                       </div>
                       <span className="bg-[#fef3c7] text-[#b45309] font-bold px-2 py-0.5 rounded-md text-xs">
                         {feedback.englishScore} / 3 Pts
                       </span>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.englishFeedback}
                     </p>
                   </div>
                   
                   <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-[1.5rem]">
                     <div className="flex items-center text-[#2563eb] mb-3">
                       <FlaskConical className="w-5 h-5 mr-2" />
                       <h4 className="font-black text-sm uppercase tracking-widest">Science Feedback</h4>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.scienceFeedback}
                     </p>
                   </div>
                </div>

                <div className="bg-[#ecfccb] border border-[#bbf7d0] p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
                  <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  
                  <h4 className="font-black text-[#3f6212] text-sm uppercase tracking-widest mb-4">
                    Suggested Notebook Answer
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        {feedback.isPerfect ? "Your Perfect Analysis:" : "Fixed Version of Your Analysis:"}
                      </span>
                      <p className="text-lg font-bold text-[#166534]">
                        "{feedback.fixedAnswer}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#d9f99d]">
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        Official Model Answer:
                      </span>
                      <p className="text-lg font-bold text-[#166534]">
                        "{currentQ.modelAnswer}"
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm font-bold text-[#3f6212] mt-6 bg-[#d9f99d] inline-block px-4 py-2 rounded-lg">
                    📝 Write one of these down in your notebook for full credit.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button 
                     onClick={handleNext} 
                     className="flex items-center px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                   >
                     {currentIndex < questions.length - 1 ? 'Next Diagram' : 'Complete Section'} 
                     <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/tasks/Dictation.jsx">
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkFormatting = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return { hasCapital: false, hasPunctuation: false };
  const firstChar = trimmed.charAt(0);
  const hasCapital = /^[A-Z]/.test(firstChar); 
  const hasPunctuation = trimmed.endsWith('.');
  return { hasCapital, hasPunctuation };
};

export default function Dictation({ pool, track, unitId, savedData = {}, onComplete }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  const initialSaved = savedData[0];
  
  const [gameState, setGameState] = useState(initialSaved?.status === 'perfect' ? 'SAVED_PERFECT' : 'Q'); 
  const [userInput, setUserInput] = useState(initialSaved?.status === 'perfect' ? initialSaved.text : '');
  const [score, setScore] = useState(initialSaved?.status === 'perfect' ? 1 : 0);
  const [userAnswer, setUserAnswer] = useState(initialSaved?.status === 'perfect' ? { isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true } : null);
  
  const audioState = useRef(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const btnCooldown = useRef(false);
  
  const [canAdvance, setCanAdvance] = useState(false);

  const currentWordObj = realWords[wordIndex];

  const calculateXP = (currentScore) => {
    if (!realWords || realWords.length === 0) return 0;
    return Math.floor((currentScore / realWords.length) * 10);
  };

  const playAudioSequence = useCallback((isManual = false) => {
    if (!currentWordObj) return;

    if (isManual) {
      if (btnCooldown.current) return;
      btnCooldown.current = true;
      setIsBtnDisabled(true);
      setTimeout(() => {
        btnCooldown.current = false;
        setIsBtnDisabled(false);
      }, 500); 
    }

    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
        audioState.current.currentAudio.currentTime = 0;
      }
    }

    const state = { isCancelled: false, currentAudio: null };
    audioState.current = state;
    const basePath = import.meta.env.BASE_URL || '/';

    const aDict = new Audio(`${basePath}audio/${track}/${unitId}/dictation_${currentWordObj.word.toLowerCase()}.mp3`);

    const playAudioObj = (audioObj) => new Promise((resolve) => {
      state.currentAudio = audioObj;
      audioObj.onended = resolve;
      audioObj.onerror = resolve; 
      audioObj.play().catch(() => resolve());
    });

    const runSequence = async () => {
      if (state.isCancelled) return;
      await playAudioObj(aDict);
    };

    runSequence();
  }, [currentWordObj, track, unitId]); 

  useEffect(() => {
    if (gameState === 'Q') {
      const timer = setTimeout(() => playAudioSequence(false), 400);
      return () => clearTimeout(timer);
    }
  }, [gameState, playAudioSequence]);

  useEffect(() => {
    if (wordIndex === 0) return; 

    const saved = localAnswers[wordIndex];
    if (saved && saved.status === 'perfect') {
      setUserInput(saved.text);
      setUserAnswer({ isPass: true, percentage: 100, formattingPenalty: false, hasCapital: true, hasPunctuation: true });
      setGameState('SAVED_PERFECT');
      setScore(s => s + 1);
    } else {
      setUserInput('');
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  useEffect(() => {
    if (gameState === 'SAVED_PERFECT') {
       setCanAdvance(true); 
    } else if (gameState !== 'Q') {
      setCanAdvance(false);
      const timer = setTimeout(() => setCanAdvance(true), 600); 
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (gameState !== 'Q' || !userInput.trim()) return;

    const sim = calculateSimilarity(userInput, currentWordObj.dictSent);
    let percentage = Math.round(sim * 20) * 5; 

    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    let formattingPenalty = false;

    if (!hasCapital || !hasPunctuation) {
      percentage = Math.max(0, percentage - 5);
      formattingPenalty = true;
    }

    const isPass = percentage >= 85;
    
    if (isPass) {
      setScore(s => s + 1);
      if (percentage === 100 && !formattingPenalty) {
        setLocalAnswers(prev => ({ ...prev, [wordIndex]: { text: userInput.trim(), status: 'perfect' } }));
      }
    }
    playChime(isPass ? 'correct' : 'incorrect');

    setUserAnswer({ isPass, percentage, formattingPenalty, hasCapital, hasPunctuation });
    setGameState(isPass ? 'A_PASS' : 'A_FAIL');
  };

  const handleNext = (overrideScore) => {
    if (audioState.current) {
      audioState.current.isCancelled = true;
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
      }
    }
    
    const finalScore = overrideScore !== undefined ? overrideScore : score;

    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
    } else {
      onComplete(calculateXP(finalScore), localAnswers);
    }
  };

  const checkRetry = () => {
    if (gameState !== 'A_FAIL') return false;
    const { hasCapital, hasPunctuation } = checkFormatting(userInput);
    const sim = calculateSimilarity(userInput, currentWordObj?.dictSent || "");
    let percentage = Math.round(sim * 20) * 5;
    if (!hasCapital || !hasPunctuation) percentage = Math.max(0, percentage - 5);
    return percentage >= 85 && hasCapital && hasPunctuation;
  };

  const isRetryCorrect = checkRetry();
  const isPassState = gameState === 'A_PASS' || gameState === 'SAVED_PERFECT';

  // Global Keyboard Accessibility (Ignoring input)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'ArrowRight') {
        if (canAdvance) {
          if (isPassState || (gameState === 'A_FAIL' && isRetryCorrect)) {
            e.preventDefault();
            document.getElementById('continue-btn')?.click(); 
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPassState, gameState, isRetryCorrect, canAdvance]);

  if (!currentWordObj) return null;

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-56 lg:pb-40 transition-colors duration-500
      ${isPassState ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : gameState === 'A_FAIL' ? 'bg-[#FFF0F0] dark:bg-[#FFF0F0]/10' : 'bg-slate-50 dark:bg-slate-950'}`}>
      
      <TopBar current={wordIndex} total={realWords.length} onQuit={() => onComplete(calculateXP(score), localAnswers)} modeTitle="Dictation" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm sm:text-base mb-4 text-center">
          {gameState === 'Q' ? 'Type the sentence you hear' : gameState === 'SAVED_PERFECT' ? 'Perfect Score Saved!' : isPassState ? 'Excellent Listening!' : 'Review & Correct'}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col mb-8">
          <div className="relative">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isPassState}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  if (gameState === 'Q' && userInput.trim().length > 0) {
                    handleSubmit(e);
                  }
                }
              }}
              placeholder={gameState === 'SAVED_PERFECT' ? '' : "Type what you hear..."}
              className={`w-full h-32 sm:h-40 p-5 text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border-2 rounded-3xl focus:outline-none resize-none transition-all shadow-sm
                ${isPassState ? 'border-[#58A700] text-[#3E7500] dark:text-[#a3e635] disabled:bg-[#F0FDE6] dark:disabled:bg-[#F0FDE6]/10' 
                : gameState === 'A_FAIL' ? (isRetryCorrect ? 'border-[#58A700] focus:border-[#58A700] bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : 'border-[#EA2B2B] focus:border-[#EA2B2B] bg-[#FFF0F0] dark:bg-[#FFF0F0]/10') 
                : 'border-slate-200 dark:border-slate-700 focus:border-[#1CB0F6]'}`}
            />
          </div>

          {gameState === 'Q' && (
            <div className="flex justify-center mt-6">
              <button 
                type="submit"
                disabled={!userInput.trim()}
                className="w-full sm:w-auto min-w-[250px] px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm"
              >
                Check Answer
              </button>
            </div>
          )}
        </form>

        <div className="text-center">
          <button 
            disabled={isBtnDisabled}
            onClick={() => playAudioSequence(true)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] flex items-center justify-center shadow-xl transition-all active:scale-95 mx-auto disabled:opacity-80
              ${isPassState ? 'bg-[#58A700] shadow-[#58A700]/30' : gameState === 'A_FAIL' ? 'bg-[#EA2B2B] shadow-[#EA2B2B]/30' : 'bg-[#1CB0F6] hover:bg-[#1899D6] shadow-[#1CB0F6]/30'}`}
          >
            <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </button>
          <p className="mt-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs">Replay Audio</p>
        </div>

      </div>

      {gameState !== 'Q' && (
        <div className={`fixed bottom-0 left-0 w-full border-t-[6px] p-4 md:p-6 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50
          ${isPassState ? 'bg-[#D7FFB8] dark:bg-slate-800 border-[#58A700]' : 'bg-[#FFDFE0] dark:bg-slate-800 border-[#EA2B2B]'}`}>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">

            <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start flex-shrink-0">
              <div className={`flex items-center ${isPassState ? 'text-[#58A700]' : 'text-[#EA2B2B] dark:text-[#f87171]'} mb-0`}>
                {isPassState ? <CheckCircle2 className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" /> : <XCircle className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" />}
                <span className="text-2xl font-black tracking-wide">{gameState === 'SAVED_PERFECT' ? 'Saved!' : isPassState ? 'Great!' : 'Review'}</span>
              </div>
            </div>

            <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                    Target Sentence
                  </span>
                  <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest bg-white/50 dark:bg-slate-900/50 px-2.5 py-0.5 rounded-md ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                    Accuracy: {userAnswer?.percentage}%
                  </span>
                </div>
                <p className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-tight">
                  {currentWordObj.dictSent}
                </p>

                {gameState === 'A_FAIL' && (
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    {userAnswer?.formattingPenalty && (
                      <span className="bg-[#EA2B2B] text-white px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
                        <AlertCircle className="w-3 h-3 mr-1" /> Missing Capital/Period (-5%)
                      </span>
                    )}
                    <span className="text-[#C9362A] dark:text-[#f87171] font-bold text-[11px] sm:text-xs bg-[#FFCCCC]/50 dark:bg-[#FFCCCC]/10 px-2 py-1 rounded-md border border-[#EA2B2B]/20">
                      {(!userAnswer?.hasCapital || !userAnswer?.hasPunctuation) ? "Fix formatting to continue!" : "Retype exactly to continue."}
                    </span>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px bg-black/10 dark:bg-white/10"></div>

              <div className="flex-1 border-t md:border-t-0 border-black/5 dark:border-white/5 pt-3 md:pt-0">
                <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1.5 ${isPassState ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                  Vietnamese Translation
                </span>
                <p className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-tight">
                  "{currentWordObj.dictVn}"
                </p>
              </div>

            </div>

            <button
              id="continue-btn"
              disabled={gameState === 'A_FAIL' && !isRetryCorrect}
              onClick={() => {
                if (gameState === 'A_FAIL') {
                  const newScore = score + 1;
                  setScore(newScore);
                  handleNext(newScore);
                } else {
                  handleNext();
                }
              }}
              className={`w-full lg:w-auto px-10 py-5 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all flex-shrink-0 border-b-[5px] active:border-b-0 active:translate-y-[5px] mt-2 lg:mt-0 
                ${(gameState === 'A_FAIL' && !isRetryCorrect) ? 'bg-slate-300 dark:bg-slate-700 border-slate-400 dark:border-slate-800 cursor-not-allowed opacity-50 text-slate-500' : 'bg-[#58A700] hover:bg-[#468500] border-[#468500]'}`}
            >
              {(gameState === 'A_FAIL' && !isRetryCorrect) ? 'Fix It First' : 'Continue'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
</file>

<file path="src/tasks/Essay.jsx">
import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, Type, FlaskConical, FileEdit, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeEssay } from '../utils/aiGrader';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkRequiredWordGroup = (wordGroup, text) => {
  if (!text) return false;
  const group = Array.isArray(wordGroup) ? wordGroup : [wordGroup];

  for (let reqWord of group) {
    if (text.toLowerCase().includes(reqWord.toLowerCase())) return true;
    if (!reqWord.includes(' ')) {
      const words = text.split(/[\s,.-]+/);
      for (let w of words) {
        if (calculateSimilarity(reqWord, w) >= 0.85) return true;
      }
    }
  }
  return false;
};

const MIN_CHARS = 100; 

export default function Essay({ pool, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike }) {
  const currentQ = pool?.essay || pool;
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  const [gameState, setGameState] = useState('Q'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[0] || savedData[0] || savedData;
    
    if (saved && saved.text) {
      const text = saved.text;
      const status = saved.status;

      setUserAnswer(text || '');
      setFeedback(null);

      if (status === 'perfect') {
        setGameState('SAVED_PERFECT');
      } else if (status === 'api_error') {
        setGameState('SAVED_API_ERROR');
      } else if (status === 'strike_fallback') {
        setGameState('Q'); 
      } else {
        setGameState('Q');
      }
    } else {
      setUserAnswer('');
      setFeedback(null);
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  // Safe check to prevent crashing if the unit has no essay
  if (!currentQ || !currentQ.task) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <FileEdit className="w-16 h-16 text-indigo-300 mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Coming Soon</h2>
        <p className="text-lg text-slate-500 mb-8 max-w-md">The teacher is currently uploading the Essay task for this unit.</p>
        <button onClick={onQuit} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all">
          Return
        </button>
      </div>
    );
  }

  const handleLocalFallbackGrade = () => {
    // Bulletproofed mapping
    const usedWordGroups = (currentQ.requiredWords || []).filter(group => checkRequiredWordGroup(group, userAnswer));
    
    const trimmed = (userAnswer || '').trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0; 

    const pointsEarned = usedWordGroups.length + englishScore;
    const maxPoints = (currentQ.requiredWords || []).length + (currentQ.scienceMaxMarks || 0) + 3;

    setFeedback({
      originalAnswer: trimmed,
      usedWordGroups,
      scienceMarks: (currentQ.markScheme || []).map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Ensure proper sentence structure.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No Cambridge marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers({ 0: { text: trimmed, status: 'strike_fallback' } });
    setGameState('A');
  };

  const handleGrade = async () => {
    const trimmedAnswer = (userAnswer || '').trim();
    if (trimmedAnswer.length < MIN_CHARS) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primaryRequiredWords = (currentQ.requiredWords || []).map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      task: currentQ.task,
      studentAnswer: trimmedAnswer,
      requiredWords: primaryRequiredWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme
    };

    let aiData;

    try {
      aiData = await gradeEssay(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeEssay(payload);
      } catch (e2) {
        console.error("AI Grade Failed twice. Entering Error State.");
        setGameState('SAVED_API_ERROR');
        setLocalAnswers({ 0: { text: trimmedAnswer, status: 'api_error' } });
        return;
      }
    }

    if (aiData.isHarmful || aiData.isGarbage) {
      const newStrikes = strikes + 1;
      if (onAddStrike) onAddStrike(newStrikes);
      
      if (newStrikes >= 3) {
        alert("Strike 3! You have submitted too many inappropriate or nonsense answers. The AI Grader is permanently disabled for this unit.");
        handleLocalFallbackGrade();
      } else {
        alert(`Warning! Nonsense or inappropriate answer detected. Strike ${newStrikes}/3.`);
        setGameState('Q'); 
      }
      return;
    }

    const usedWordGroups = (currentQ.requiredWords || []).filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = (currentQ.markScheme || []).map((_, i) => i < scienceScore);

    const pointsEarned = usedWordGroups.length + scienceScore + englishScore;
    const maxPoints = (currentQ.requiredWords || []).length + (currentQ.scienceMaxMarks || 0) + 3; 
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: trimmedAnswer,
      usedWordGroups,
      scienceMarks,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.fixedAnswer || aiData.reworkedAnswer || trimmedAnswer,
      isStrikeFallback: false
    });

    if (isPerfect) {
      setLocalAnswers({ 0: { text: trimmedAnswer, status: 'perfect' } });
    }
    
    setGameState('A');
  };

  const handleNext = () => {
    let finalXP = 0;

    if (gameState === 'SAVED_PERFECT') {
      finalXP = 10;
    } else if (feedback) {
      finalXP = Math.ceil((feedback.pointsEarned / feedback.maxPoints) * 10);
    } else if (gameState === 'SAVED_API_ERROR') {
      finalXP = 0;
    }

    onComplete(finalXP, localAnswers); 
  };

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-64 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent leading-relaxed ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 border-orange-300";
    textAreaClass += "text-orange-900";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 border-rose-400";
    textAreaClass += "text-rose-900";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] border-[#84cc16]";
    textAreaClass += "text-[#3f6212]";
  } else {
    containerClass += "bg-white border-slate-200";
    textAreaClass += "text-slate-800";
  }

  // Bulletproof fallback so length check never crashes
  const charsTyped = (userAnswer || '').trim().length;
  const isLengthValid = charsTyped >= MIN_CHARS;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <TopBar 
        current={0} 
        total={1} 
        onQuit={() => onComplete(0, localAnswers)} 
        modeTitle="Essay Writing" 
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Guidelines & Task */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24">
              <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-2xl mb-6 font-bold tracking-widest uppercase text-sm">
                <FileEdit className="w-5 h-5 mr-2" /> Essay Prompt
              </div>
              <h2 className="text-2xl font-black text-slate-800 leading-snug mb-6">
                {currentQ.task}
              </h2>
              
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Writing Guidelines</h3>
                <ul className="space-y-3">
                  {(currentQ.guidelines || []).map((guide, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Interaction & Feedback */}
          <div className="w-full lg:w-2/3 flex flex-col">
            
            <div className={containerClass}>
              <textarea 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                disabled={gameState !== 'Q'}
                placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Start writing your essay here..."}
                className={textAreaClass}
              />
            </div>

            {gameState !== 'LOADING' && (
              <div className="w-full mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
                  Required Vocabulary
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(currentQ.requiredWords || []).map((wordGroup, i) => {
                    const isUsed = feedback 
                      ? feedback.usedWordGroups.includes(wordGroup) 
                      : checkRequiredWordGroup(wordGroup, userAnswer);
                    const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                    
                    return (
                      <span 
                        key={i} 
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                          isUsed 
                            ? 'bg-[#d7ffb8] text-[#3e7500] border-[#58a700]' 
                            : 'bg-white text-[#58a700] border-[#58a700]'
                        }`}
                      >
                        {displayWord}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {gameState === 'SAVED_PERFECT' && (
              <div className="w-full flex justify-end mb-8 border-t border-slate-200 pt-6 animate-in fade-in">
                 <button 
                   onClick={handleNext} 
                   className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                 >
                   Complete Section <ArrowRight className="w-6 h-6 ml-3" />
                 </button>
              </div>
            )}

            {gameState === 'SAVED_API_ERROR' && (
              <div className="w-full animate-in fade-in">
                <div className="bg-orange-50 border border-orange-200 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
                   <div className="flex items-center mb-4">
                     <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                     <h3 className="text-xl font-black text-orange-800">Connection Failed</h3>
                   </div>
                   <p className="text-sm font-bold text-orange-700 mt-2">
                     The AI grader is currently offline. Your essay has been saved. Please continue and resubmit on a future attempt.
                   </p>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                     Complete Section <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>
              </div>
            )}

            {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 border-t border-slate-200 pt-6">
                <span className={`text-sm font-bold mb-4 sm:mb-0 ${isLengthValid ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {charsTyped} / {MIN_CHARS} characters minimum
                </span>
                <button 
                  onClick={handleGrade} 
                  disabled={!isLengthValid} 
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
                >
                  Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
                </button>
              </div>
            )}

            {gameState === 'LOADING' && (
              <div className="w-full h-40 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-slate-200 shadow-sm animate-pulse mb-8">
                 <div className="bg-indigo-100 p-3 rounded-full mb-3">
                   <Bot className="w-8 h-8 text-indigo-600 animate-bounce" />
                 </div>
                 <h3 className="text-lg font-black text-slate-700">AI Tutor is reading your essay...</h3>
              </div>
            )}

            {gameState === 'A' && feedback && (
              <div className="w-full animate-in slide-in-from-bottom-8 duration-500">

                {!feedback.isPerfect && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Your Attempt
                    </span>
                    <p className="text-lg text-slate-700 font-medium italic leading-relaxed">
                      "{feedback.originalAnswer}"
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-6 border-b border-slate-200 pb-6">
                  <div className={`p-3 rounded-full mr-4 flex-shrink-0 bg-indigo-600`}>
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-1">
                      Accuracy Score: 
                      <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {feedback.pointsEarned} / {feedback.maxPoints} Pts
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4 text-slate-800">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-amber-500" />
                      <h3 className="text-lg font-black">Cambridge Mark Scheme Breakdown</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-lg text-sm">
                      {feedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {(currentQ.markScheme || []).map((mark, i) => (
                      <li key={i} className="flex items-start">
                        {feedback.scienceMarks[i] ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                          {mark}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                   <div className="bg-[#fff9e6] border border-[#fde68a] p-6 rounded-[1.5rem]">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center text-[#d97706]">
                         <Type className="w-5 h-5 mr-2" />
                         <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                       </div>
                       <span className="bg-[#fef3c7] text-[#b45309] font-bold px-2 py-0.5 rounded-md text-xs">
                         {feedback.englishScore} / 3 Pts
                       </span>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.englishFeedback}
                     </p>
                   </div>
                   
                   <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-[1.5rem]">
                     <div className="flex items-center text-[#2563eb] mb-3">
                       <FlaskConical className="w-5 h-5 mr-2" />
                       <h4 className="font-black text-sm uppercase tracking-widest">Science Feedback</h4>
                     </div>
                     <p className="text-slate-700 font-medium leading-relaxed">
                       {feedback.scienceFeedback}
                     </p>
                   </div>
                </div>

                <div className="bg-[#ecfccb] border border-[#bbf7d0] p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
                  <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  
                  <h4 className="font-black text-[#3f6212] text-sm uppercase tracking-widest mb-4">
                    Suggested Notebook Answer
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        {feedback.isPerfect ? "Your Perfect Essay:" : "Polished Version of Your Essay:"}
                      </span>
                      <p className="text-lg font-bold text-[#166534] leading-relaxed">
                        "{feedback.fixedAnswer}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#d9f99d]">
                      <span className="block text-xs font-bold text-[#65a30d] uppercase mb-1">
                        Official Model Answer:
                      </span>
                      <p className="text-lg font-bold text-[#166534] leading-relaxed">
                        "{currentQ.modelAnswer}"
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm font-bold text-[#3f6212] mt-6 bg-[#d9f99d] inline-block px-4 py-2 rounded-lg">
                    📝 Note down key sentence structures from the model answer.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 mb-8">
                   <button 
                     onClick={handleNext} 
                     className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                   >
                     Complete Section <ArrowRight className="w-6 h-6 ml-3" />
                   </button>
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/tasks/Games.jsx">
import { TRACK_REGISTRY } from '../components/trackRegistry'; // <-- ADD THIS IMPORT AT THE TOP
import React, { useState, useMemo } from 'react';
import { 
  X, Shield, Trophy, Lock, Loader2, Users, Award, ChevronLeft, 
  Crown, Medal, Map as MapIcon, Heart, Ban, Coins 
} from 'lucide-react';
import { getGlobalGameLeaderboard, supabase } from '../hooks/useStudentProgress';
import TowerDefense from './games/TowerDefense';
import TowerVisual from '../components/towerdefense/TowerVisual';

export default function Games({ pool, unitId, scores, onComplete, onQuit }) {
  const [view, setView] = useState('MENU');
  const [toast, setToast] = useState(null);
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  const unitXP = Object.entries(scores || {})
    .filter(([key]) => key !== 'GAMES')
    .reduce((sum, [, section]) => sum + (Number(section?.current) || 0), 0);

  // Restored your exact original multiplier
  const startingCredits = Math.max(20, unitXP * 2);

  // Dynamic Assignments directly linked to the unit
  const gameConfig = useMemo(() => {
    const isScience = unitId?.toLowerCase().includes('science');
    const isMath = unitId?.toLowerCase().includes('math');

    if (isScience) {
      return { mapId: 'STRAIGHT', lives: 20, bannedTowers: [] };
    }
    if (isMath) {
      return { mapId: 'WAVE', lives: 20, bannedTowers: [] };
    }
    // Default fallback
    return { mapId: 'WAVE', lives: 20, bannedTowers: [] };
  }, [unitId]);

  const fetchScores = async () => {
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    const { data, error } = await getGlobalGameLeaderboard(unitId, 5); 
    
    if (error) {
      setLeaderboardError('Failed to synchronize with network.');
    } else {
      setLeaderboard(data || []);
    }
    setLoadingLeaderboard(false);
  };

  const handleModeSelect = (mode) => {
    if (mode === 'SURVIVOR' || mode === 'WALL') {
      setToast(`${mode === 'SURVIVOR' ? 'Survivor' : 'The Wall'} Mode is currently in development!`);
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (mode === 'LEADERBOARD') {
      fetchScores();
      setView('LEADERBOARD');
      return;
    }
    if (mode === 'TD') {
      setView('TD');
    }
  };

  const renderRankBadge = (index) => {
    switch(index) {
      case 0: return <Crown className="w-6 h-6 text-amber-950" />;
      case 1: return <Medal className="w-6 h-6 text-slate-800" />;
      case 2: return <Medal className="w-6 h-6 text-amber-100" />;
      default: return <span className="font-black text-xl">#{index + 1}</span>;
    }
  };

const handleGameComplete = async (score) => {
    if (onComplete) onComplete(score);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('students').select('progress').eq('id', session.user.id).single();
        if (data?.progress) {
          let prog = data.progress;
          let updated = false;
          
          // MAP OVER REGISTRY INSTEAD OF HARDCODED ARRAY
          TRACK_REGISTRY.forEach(trackObj => {
            const t = trackObj.id;
            if (prog[t] && prog[t][unitId]) {
              if (!prog[t][unitId].GAMES) prog[t][unitId].GAMES = { current: 0 };
              if (score > (prog[t][unitId].GAMES.current || 0)) {
                  prog[t][unitId].GAMES.current = score;
                  updated = true;
              }
            }
          });
          
          if (updated) {
              await supabase.from('students').update({ progress: prog }).eq('id', session.user.id);
          }
        }
      }
    } catch (err) {
      console.error("Backup DB save failed", err);
    }
  };
  
  if (view === 'TD') {
    return (
      <TowerDefense 
        pool={pool} 
        unitId={unitId} 
        gameConfig={gameConfig}
        startingCredits={startingCredits}
        onComplete={handleGameComplete} 
        onQuit={() => setView('MENU')} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {toast && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
          <div className="bg-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black tracking-widest uppercase border-b-4 border-rose-700 flex items-center">
            <Lock className="w-6 h-6 mr-3" /> {toast}
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        
        {/* MENU VIEW */}
        {view === 'MENU' && (
          <div className="w-full max-w-5xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-2">Arcade Hub</h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-sm md:text-base">Select your deployment protocol</p>
              </div>
              <button onClick={onQuit} className="p-4 bg-slate-800 hover:bg-rose-500 rounded-2xl transition-all border-b-[6px] border-slate-950 hover:border-rose-700 active:border-b-0 active:translate-y-[6px]">
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Refined Minimal Tower Defense Button */}
              <button onClick={() => handleModeSelect('TD')} className="relative group bg-[#1CB0F6] p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-[#1899D6] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg flex flex-col h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-8 drop-shadow-md relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border-b-4 border-black/10 shrink-0">
                    <Shield className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-sm tracking-tight">Tower Defense</h2>
                </div>
                
                {/* Minimal Meta Row (Badges) */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-white/90 font-bold text-sm sm:text-base mb-8 relative z-10">
                  
                  {/* Map */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <MapIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span>{gameConfig.mapId.charAt(0) + gameConfig.mapId.slice(1).toLowerCase()}</span>
                  </div>
                  
                  {/* Lives */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                    <span>{gameConfig.lives}</span>
                  </div>
                  
                  {/* Bans */}
                  <div className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    <Ban className="w-4 h-4 text-white/70" strokeWidth={2.5} />
                    <span className="text-white/70 uppercase tracking-widest text-[10px] sm:text-xs">Bans:</span>
                    {gameConfig.bannedTowers.length > 0 ? (
                      <div className="flex items-center gap-1.5 ml-1">
                        {gameConfig.bannedTowers.map(t => (
                          <div key={t} className="w-6 h-6 flex items-center justify-center bg-black/20 rounded-lg">
                            {/* Wraps SVG to perfectly miniaturize it */}
                            <div className="scale-[0.55] origin-center flex items-center justify-center">
                              <TowerVisual typeId={t} size="sm" dimmed={false} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-black text-white tracking-widest text-[10px] sm:text-xs uppercase ml-1">None</span>
                    )}
                  </div>

                </div>

                <div className="flex items-center justify-between mt-auto relative z-10">
                  <div className="bg-white text-[#1CB0F6] font-black uppercase tracking-widest text-sm sm:text-base px-6 py-3 rounded-2xl shadow-sm border-b-4 border-slate-200 group-hover:scale-105 transition-transform">
                    Play
                  </div>
                  
                  <div className="text-white font-black text-sm sm:text-base flex items-center gap-2 bg-black/10 px-4 py-2.5 rounded-2xl border border-white/10 shadow-inner">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-white/80 pt-0.5">XP Bonus</span> 
                    <span className="text-xl leading-none">{unitXP}</span>
                    <Coins className="w-5 h-5 text-[#FFC800] drop-shadow-sm" fill="currentColor" strokeWidth={1.5} />
                  </div>
                </div>
              </button>

              <button onClick={() => handleModeSelect('LEADERBOARD')} className="relative group bg-[#FFC800] p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-[#D1A300] active:border-b-0 active:translate-y-[8px] transition-all text-left overflow-hidden shadow-lg flex flex-col h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border-b-4 border-black/10 shadow-sm shrink-0 relative z-10">
                  <Trophy className="w-7 h-7 text-amber-950" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-amber-950 mb-2 drop-shadow-sm relative z-10">Leaderboard</h2>
                <p className="text-amber-900/80 font-bold text-sm sm:text-base mb-8 relative z-10">Global Rankings</p>
                <div className="flex items-center mt-auto relative z-10">
                  <p className="text-amber-900 font-black uppercase tracking-widest text-xs sm:text-sm bg-black/10 px-4 py-2.5 rounded-2xl">View Top 5</p>
                </div>
              </button>

              <button onClick={() => handleModeSelect('SURVIVOR')} className="relative group bg-slate-800 p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-slate-950 active:border-b-0 active:translate-y-[8px] transition-all text-left opacity-80 hover:opacity-100 overflow-hidden h-full flex flex-col">
                <div className="absolute top-6 right-6 bg-slate-700 text-slate-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-600 shadow-inner">Coming Soon</div>
                <Lock className="w-12 h-12 text-slate-500 mb-8" strokeWidth={2.5} />
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Survivor</h2>
                <p className="text-slate-400 font-bold text-sm sm:text-base">One life. Endless waves.</p>
              </button>

              <button onClick={() => handleModeSelect('WALL')} className="relative group bg-slate-800 p-6 sm:p-8 rounded-[3rem] border-b-[8px] border-slate-950 active:border-b-0 active:translate-y-[8px] transition-all text-left opacity-80 hover:opacity-100 overflow-hidden h-full flex flex-col">
                <div className="absolute top-6 right-6 bg-slate-700 text-slate-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-600 shadow-inner">Coming Soon</div>
                <Lock className="w-12 h-12 text-slate-500 mb-8" strokeWidth={2.5} />
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">The Wall</h2>
                <p className="text-slate-400 font-bold text-sm sm:text-base">Multiplayer cooperative defense.</p>
              </button>

            </div>
          </div>
        )}

        {/* LEADERBOARD VIEW */}
        {view === 'LEADERBOARD' && (
          <div className="w-full max-w-4xl animate-in zoom-in-95 duration-300 flex flex-col h-full py-6">
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setView('MENU')} className="bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all text-white border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 shadow-sm">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center drop-shadow-md">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFC800] mr-2 sm:mr-4" /> Global Leaderboard
                </h2>
                <p className="text-slate-400 font-bold tracking-widest uppercase mt-2 text-xs sm:text-sm">Top 5 Commanders • Sector {unitId}</p>
              </div>
              <div className="w-16"></div> 
            </div>

            <div className="flex-1 bg-slate-800 border-4 border-slate-900 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl overflow-y-auto">
              {loadingLeaderboard ? (
                <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 className="w-12 h-12 animate-spin text-[#FFC800] mb-4" />
                  <span className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing Orbital Data...</span>
                </div>
              ) : leaderboardError ? (
                <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <X className="w-16 h-16 text-rose-500 mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">Network Error</h3>
                  <p className="text-slate-400 font-medium">{leaderboardError}</p>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <Users className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">No Deployments Recorded</h3>
                  <p className="text-slate-400 font-medium">Be the first agent to secure this sector!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.id || index} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border-b-4 transition-transform hover:scale-[1.01] ${index === 0 ? 'bg-[#FFC800] border-[#D1A300]' : index === 1 ? 'bg-slate-300 border-slate-400' : index === 2 ? 'bg-amber-700 border-amber-900' : 'bg-slate-700 border-slate-900'}`}>
                      
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-sm ${index === 0 ? 'bg-white/40 text-amber-950' : index === 1 ? 'bg-white/50 text-slate-800' : index === 2 ? 'bg-white/20 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                          {renderRankBadge(index)}
                        </div>
                        <div>
                          <span className={`block text-xl sm:text-2xl font-black tracking-wide ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>
                            {entry.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right bg-black/10 sm:bg-transparent rounded-xl p-3 sm:p-0">
                        <span className={`block text-xs font-black uppercase tracking-widest mb-1 ${index === 0 ? 'text-amber-900' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-amber-200' : 'text-slate-400'}`}>Score</span>
                        <span className={`text-3xl sm:text-4xl font-black tabular-nums ${index === 0 ? 'text-amber-950' : index === 1 ? 'text-slate-900' : index === 2 ? 'text-white' : 'text-white'}`}>
                          {entry.score.toLocaleString()}
                        </span>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/tasks/games/TowerDefense.jsx">
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TOWERS, ENEMIES, getSellValue } from '../../components/towerdefense/gameData';
import { MAP_LAYOUTS, WAVE_PRESETS } from '../../components/towerdefense/wavePresets';
import GameBoard from '../../components/towerdefense/GameBoard';
import BuildMenu from '../../components/towerdefense/BuildMenu';
import UpgradePanel from '../../components/towerdefense/UpgradePanel';
import VocabChallenge from '../../components/towerdefense/VocabChallenge';
import HUD from '../../components/towerdefense/HUD';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import { useGameEngine } from '../../components/towerdefense/useGameEngine';

const CHALLENGE_DURATION = 15;

function buildPathSet(path) {
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
}

function generateDecorations(layout, pathSet) {
  const out = [];
  let id = 1;
  for (let r = 0; r < layout.rows; r++) {
    for (let c = 0; c < layout.cols; c++) {
      if (pathSet.has(`${r}_${c}`)) continue;
      if (Math.random() < 0.16) {
        out.push({ id: id++, row: r, col: c, variant: Math.floor(Math.random() * 5) });
      }
    }
  }
  return out;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TowerDefense({
  gameConfig = { mapId: 'WAVE', lives: 20, bannedTowers: [] },
  pool = [],
  startingCredits = 150,
  unitId = 'default',
  themeId = 'STANDARD',
  onQuit = () => window.history.back(),
  onComplete = () => {}
}) {
  const layout = MAP_LAYOUTS[gameConfig.mapId] || MAP_LAYOUTS.WAVE;
  
  // Calculate specific limits dynamically based on the Hub rules
  const allTowerIds = ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO'];
  const allowedTowers = useMemo(() => {
    return allTowerIds.filter(t => !gameConfig.bannedTowers.includes(t));
  }, [gameConfig.bannedTowers]);

  const totalWaves = WAVE_PRESETS.SET_1.length; 
  
  const pathSet = useMemo(() => buildPathSet(layout.path), [layout.path]);

  const vocab = useMemo(() => {
    if (pool && pool.length > 0) {
      return pool.map(w => ({ word: w.word, def: w.def || w.vnDef || '' }));
    }
    return [{ word: 'Default', def: 'Missing vocab pool' }];
  }, [pool]);

  const activeThemeId = useMemo(() => {
    const requestedTheme = gameConfig.themeId || themeId;
    if (requestedTheme === 'RANDOM') {
      const themes = ['STANDARD', 'NIGHT', 'ICE', 'DESERT'];
      return themes[Math.floor(Math.random() * themes.length)];
    }
    return requestedTheme;
  }, [gameConfig.themeId, themeId]);

  const basicEnemyType = useMemo(() => {
    return WAVE_PRESETS.SET_1?.[0]?.[0]?.type || Object.keys(ENEMIES)[0];
  }, []);

  const engineConfig = useMemo(() => ({
    waves: WAVE_PRESETS.SET_1,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR
  }), []);

  const gRef = useRef(null);
  
  // Re-initialize state safely if unmounted/remounted
  if (gRef.current === null) {
    gRef.current = {
      credits: startingCredits, lives: gameConfig.lives, maxLives: gameConfig.lives, wave: 0, score: 0, bolts: 0,
      speed: 1, gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      decorations: generateDecorations(layout, pathSet),
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, nextId: 1, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: {}, // Changed from [] to {} to track usage per mode
      autoPlayDelay: 0, triggerNextWave: false
    };
  }
  const g = gRef.current;

  const [, setTick] = useState(0);
  const render = () => setTick(t => (t + 1) % 1e9);

  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [hoveredTowerId] = useState(null);
  const [activeBuilder, setActiveBuilder] = useState(null);
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const autoPlayRef = useRef(false);
  const [bestScore, setBestScore] = useState(0);

  const [challenge, setChallenge] = useState(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [challengeShakeKey, setChallengeShakeKey] = useState(0);
  const challengeActiveRef = useRef(false);

  const boardWrapperRef = useRef(null);
  const [boardScale, setBoardScale] = useState(1);

  useGameEngine({
    gRef, render, layout, engineConfig,
    onTriggerChallenge: buildChallengeTrigger,
    challengeActiveRef, autoPlayRef
  });

  useEffect(() => {
    if (g.triggerNextWave) {
      handleStartWave();
      g.triggerNextWave = false;
    }
  }, [g.triggerNextWave]);

  useEffect(() => {
    const saved = localStorage.getItem(`td_best_${unitId}`);
    if (saved) setBestScore(Number(saved));
  }, [unitId]);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const bw = layout.cols * 48; 
        const bh = layout.rows * 48;
        const scale = Math.min((width - 16) / bw, (height - 16) / bh);
        setBoardScale(Math.max(0.5, Math.min(scale, 2.5)));
      }
    });
    if (boardWrapperRef.current) obs.observe(boardWrapperRef.current);
    return () => obs.disconnect();
  }, [layout]);

  function buildChallengeTrigger() {
    if (!vocab || vocab.length === 0) return;
    
    // 1. Compile a list of all available specific questions (Word + Mode)
    let available = [];
    vocab.forEach(v => {
      const usage = g.usedVocab[v.word] || { TYPE: false, CHOICE: false };
      if (!usage.TYPE) available.push({ item: v, mode: 'TYPE' });
      if (!usage.CHOICE) available.push({ item: v, mode: 'CHOICE' });
    });
    
    // 2. Endless looping - if all specific questions are used, reset the tracker to ensure endless play
    if (available.length === 0) {
      g.usedVocab = {};
      vocab.forEach(v => {
        available.push({ item: v, mode: 'TYPE' });
        available.push({ item: v, mode: 'CHOICE' });
      });
    }

    // 3. Pick one specific challenge at random
    const { item, mode } = available[Math.floor(Math.random() * available.length)];

    // 4. Mark exactly that mode as used for that word so it gets removed from the bank
    if (!g.usedVocab[item.word]) g.usedVocab[item.word] = { TYPE: false, CHOICE: false };
    g.usedVocab[item.word][mode] = true;

    // 5. Generate distractors if CHOICE
    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== item.word.toLowerCase());
      const distractors = shuffle(others).slice(0, 3).map(x => x.word);
      choices = shuffle([item.word, ...distractors]);
    }
    
    challengeActiveRef.current = true;
    setChallenge({ mode, word: item.word, def: item.def, choices });
    setChallengeInput('');
    setChallengeTimeLeft(CHALLENGE_DURATION);
  }

  function closeChallenge() {
    challengeActiveRef.current = false;
    setChallenge(null);
    setChallengeInput('');
  }

  function awardChallengeWin() {
    g.bolts += 1;
    g.score += 50;
    g.floaters.push({
      id: g.nextId++, text: '⚡ +1', row: 1, col: layout.cols / 2, colorClass: 'text-[#FFC800] font-black', life: 1500, maxLife: 1500
    });
  }

  function punishChallengeFail() {
    const count = Math.max(1, Math.floor(g.wave / 2));
    g.spawnQueue.unshift({ type: basicEnemyType, count, interval: 350 });
    g.spawnTimer = 9999;
    g.floaters.push({
      id: g.nextId++, text: `+${count} 👾`, row: 1, col: layout.cols / 2, colorClass: 'text-[#EA2B2B] font-black', life: 1600, maxLife: 1600
    });
  }

  useEffect(() => {
    if (!challenge) return;
    if (challengeTimeLeft <= 0) {
      if (challenge.mode === 'CHOICE') punishChallengeFail(); 
      closeChallenge();
      return;
    }
    const t = setTimeout(() => setChallengeTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [challenge, challengeTimeLeft]);

  function handleStartWave() {
    if (g.waveInProgress || g.gameState !== 'PLAYING') return;
    let data;
    if (g.wave < engineConfig.waves.length) {
      data = engineConfig.waves[g.wave];
    } else if (engineConfig.generateInfiniteWave) {
      data = engineConfig.generateInfiniteWave(g.wave);
    } else return; 

    g.spawnQueue = data.map(w => ({ ...w }));
    g.spawnTimer = 9999;
    g.wave += 1;
    g.waveInProgress = true;
    if (g.wave === 5 && !g.wave5ChallengeSpawned) g.challengeTimer = 8000; 
    render();
  }

  function handleCellClick(r, c, isPath) {
    if (activeBuilder) {
      if (isPath) return;
      if (g.towers.some(t => t.row === r && t.col === c)) return;
      const conf = TOWERS[activeBuilder.typeId];
      if (g.credits < conf.cost) return;
      g.credits -= conf.cost;
      g.towers.push({ id: g.nextId++, typeId: activeBuilder.typeId, row: r, col: c, upgrades: {} });
      setActiveBuilder(null);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
    } else setSelectedTowerId(null);
  }

  function handleCellHover(r, c, isPath) {
    if (!activeBuilder) { 
      if (hoverCell.row !== -1) setHoverCell({ row: -1, col: -1, valid: false }); 
      return; 
    }
    if (hoverCell.row === r && hoverCell.col === c) return;

    const valid = !isPath && !g.towers.some(t => t.row === r && t.col === c);
    setHoverCell({ row: r, col: c, valid });
  }

  function handleTowerClick(id) {
    if (activeBuilder) { setActiveBuilder(null); return; }
    setSelectedTowerId(id);
  }

  function handleUpgrade(key) {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    const conf = TOWERS[t.typeId];
    const upg = conf.upgrades[key];
    if (!upg || t.upgrades[key] || g.credits < upg.cost) return;
    g.credits -= upg.cost;
    t.upgrades = { ...t.upgrades, [key]: true };
    render();
  }

  function handleSell() {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    g.credits += getSellValue(t);
    g.towers = g.towers.filter(x => x.id !== selectedTowerId);
    delete g.fireCooldowns[t.id];
    setSelectedTowerId(null);
    render();
  }

  function handleUseBolt() {
    if (g.bolts <= 0) return;
    g.bolts -= 1;
    g.creeps.forEach(c => {
      c.hp -= 500;
      if (c.hp <= 0) g.credits += ENEMIES[c.typeKey].reward;
    });
    g.particles.push({ id: g.nextId++, row: layout.rows / 2, col: layout.cols / 2, radius: Math.max(layout.rows, layout.cols), color: 'rgba(99,102,241,0.6)', life: 450, maxLife: 450 });
    render();
  }

  function handleChallengeSubmit(e) {
    e.preventDefault();
    if (!challenge || challenge.mode !== 'TYPE') return;
    const guess = challengeInput.trim().toLowerCase();
    if (!guess) return;
    if (guess === challenge.word.toLowerCase()) { awardChallengeWin(); closeChallenge(); }
    else { setChallengeShakeKey(k => k + 1); setChallengeInput(''); }
  }

  function handleChallengeChoice(choice) {
    if (!challenge || challenge.mode !== 'CHOICE') return;
    if (choice.toLowerCase() === challenge.word.toLowerCase()) awardChallengeWin();
    else punishChallengeFail();
    closeChallenge();
  }

  function handleChallengeDismiss() {
    punishChallengeFail();
    closeChallenge();
  }

  function handleReset() {
    Object.assign(g, {
      credits: startingCredits, lives: gameConfig.lives, maxLives: gameConfig.lives, wave: 0, score: 0, bolts: 0,
      gameState: 'PLAYING', towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      waveInProgress: false, spawnQueue: [], spawnTimer: 0, fireCooldowns: {}, challengeTimer: Infinity, wave5ChallengeSpawned: false, 
      usedVocab: {}, // Reset the tracker dictionary entirely
      autoPlayDelay: 0
    });
    challengeActiveRef.current = false;
    setSelectedTowerId(null);
    setActiveBuilder(null);
    setChallenge(null);
    setChallengeInput('');
    render();
  }

  function confirmExit() {
    setShowExitConfirm(false);
    if (g.score > bestScore) {
      localStorage.setItem(`td_best_${unitId}`, g.score);
      setBestScore(g.score);
    }
    onComplete(g.score);
    onQuit();
  }

  useEffect(() => {
    if (g.score > bestScore) {
      setBestScore(g.score);
      localStorage.setItem(`td_best_${unitId}`, g.score);
    }
  }, [g.score, bestScore, unitId]);

  const selectedTower = g.towers.find(t => t.id === selectedTowerId) || null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      <HUD
        credits={g.credits}
        lives={g.lives}
        wave={g.wave}
        totalWaves={totalWaves}
        score={g.score}
        bestScore={bestScore}
        speed={g.speed}
        gameState={g.gameState}
        waveInProgress={g.waveInProgress}
        autoPlay={autoPlayRef.current}
        onStartWave={handleStartWave}
        onToggleAutoPlay={() => { autoPlayRef.current = !autoPlayRef.current; render(); }}
        onSetSpeed={(s) => { g.speed = s; render(); }}
        onQuit={() => setShowExitConfirm(true)}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative bg-slate-900">
        <main ref={boardWrapperRef} className="flex-1 order-1 flex items-center justify-center overflow-hidden p-0 sm:p-0">
          <div style={{ transform: `scale(${boardScale})`, transformOrigin: 'center' }}>
             <GameBoard
               layout={layout} towers={g.towers} creeps={g.creeps} projectiles={g.projectiles}
               floaters={g.floaters} particles={g.particles} burnZones={g.burnZones}
               decorations={g.decorations} lives={g.lives} maxLives={g.maxLives}
               selectedTowerId={selectedTowerId} hoveredTowerId={hoveredTowerId}
               activeBuilder={activeBuilder} hoverCell={hoverCell}
               onCellClick={handleCellClick} onCellHover={handleCellHover}
               onCellLeave={() => setHoverCell({ row: -1, col: -1, valid: false })}
               onTowerClick={handleTowerClick} themeId={activeThemeId}
             />
          </div>
        </main>

        <div className="order-2 flex h-auto md:h-full z-20">
          <UpgradePanel
            tower={selectedTower} towers={g.towers} credits={g.credits}
            onUpgrade={handleUpgrade} onSell={handleSell} onClose={() => setSelectedTowerId(null)}
          />
        </div>

        <div className="order-3 flex h-auto md:h-full z-20">
          <BuildMenu
            allowedTowers={allowedTowers} credits={g.credits}
            activeBuilder={activeBuilder} bolts={g.bolts} onUseBolt={handleUseBolt}
            onSelect={(b) => setActiveBuilder(prev => prev?.typeId === b.typeId ? null : b)}
          />
        </div>
      </div>

      <VocabChallenge
        challenge={challenge} 
        input={challengeInput} 
        onInputChange={setChallengeInput}
        onSubmit={handleChallengeSubmit} 
        onChoice={handleChallengeChoice}
        onDismiss={handleChallengeDismiss}
        timeLeft={challengeTimeLeft} 
        maxTime={CHALLENGE_DURATION} 
        shakeKey={challengeShakeKey}
      />

      <ExitConfirmModal open={showExitConfirm} onCancel={() => setShowExitConfirm(false)} onConfirm={confirmExit} />

      {g.gameState !== 'PLAYING' && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] border-b-8 border-slate-200 p-8 text-center max-w-md w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="text-6xl mb-4">{g.gameState === 'WON' ? '🏆' : '💀'}</div>
            <div className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {g.gameState === 'WON' ? 'Victory' : 'Defeat'}
            </div>
            <div className="text-base font-bold text-slate-500 mb-6">
              {g.gameState === 'WON' ? 'You defended every wave!' : 'Too many enemies got through.'}
            </div>
            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl py-4 mb-6 shadow-inner">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Final Score</div>
              <div className="text-4xl font-black text-[#1CB0F6] tabular-nums">{g.score}</div>
              {g.score >= bestScore && g.score > 0 && <div className="text-sm font-bold text-[#FFC800] mt-1">New Best!</div>}
            </div>
            <div className="flex gap-3">
              <button onClick={handleReset} className="flex-1 px-5 py-4 rounded-2xl bg-[#58A700] border-b-[4px] border-[#46a802] active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm">
                Play Again
              </button>
              <button onClick={confirmExit} className="flex-1 px-5 py-4 rounded-2xl bg-slate-200 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-600 font-black transition-all uppercase tracking-widest text-sm">
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
</file>

<file path="src/tasks/Notes.jsx">
import React, { useState, useEffect, useRef, Component } from 'react';
import { 
  ChevronRight, ChevronLeft, BookOpen, Scale, Target, 
  MessageSquare, ShieldCheck, CheckCircle2, Construction, 
  PlayCircle, PauseCircle, Maximize2, X, Pencil, MonitorPlay, Minimize2,
  Volume2
} from 'lucide-react';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import TopBar from '../components/TopBar';
import WidgetRenderer from '../components/WidgetRenderer';

const IconMap = { BookOpen, Scale, Target, MessageSquare, ShieldCheck };

const SafeInlineMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const cleanMath = math.replace(/[\u200B-\u200D\uFEFF]/g, '');
    const html = k.renderToString(cleanMath, { throwOnError: true, displayMode: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} className="mx-0.5" />;
  } catch (err) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>;
  }
};

const SafeBlockMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const cleanMath = math.replace(/[\u200B-\u200D\uFEFF]/g, '');
    const html = k.renderToString(cleanMath, { throwOnError: true, displayMode: true });
    return (
      <div 
        className="overflow-x-auto overflow-y-hidden w-full py-4 my-2 px-4 flex justify-center custom-scrollbar" 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  } catch (err) {
    return (
      <div className="flex flex-col items-center bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 max-w-full overflow-x-auto my-4 w-full">
        <span className="text-rose-500 font-black text-xs uppercase tracking-widest mb-2">KaTeX Error</span>
        <span className="text-rose-700 dark:text-rose-300 font-mono text-sm text-center mb-2">{err.message}</span>
        <span className="text-rose-800/50 dark:text-rose-200/50 font-mono text-xs text-center break-all">{math}</span>
      </div>
    );
  }
};

class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Interactive Widget Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 text-center animate-in fade-in">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <Construction className="w-6 h-6 text-rose-500 dark:text-rose-400" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-1 tracking-tight">Widget Unavailable</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[250px]">
            This interactive tool encountered an error. Please continue with the lesson.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Notes({ slides, onComplete, onQuit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [lang, setLang] = useState('en');
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  
  const audioRef = useRef(null);
  const activeAudioUrl = useRef(null); 
  const containerRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch(e) {
        console.warn("Audio cleanup error:", e);
      }
    }
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  useEffect(() => {
    stopAudio();
  }, [currentIndex]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsDisplayMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timeout;
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      if (isDisplayMode) {
        timeout = setTimeout(() => setIsIdle(true), 3000);
      }
    };

    if (isDisplayMode) {
      handleActivity();
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('touchstart', handleActivity);
    } else {
      setIsIdle(false);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isDisplayMode]);

  const toggleDisplayMode = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsDisplayMode(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsDisplayMode(false);
      }
    }
  };

  const handleQuit = () => {
    stopAudio();
    if (document.fullscreenElement) document.exitFullscreen();
    if (typeof onQuit === 'function') onQuit();
  };

  const handleComplete = () => {
    stopAudio();
    if (document.fullscreenElement) document.exitFullscreen();
    if (typeof onComplete === 'function') onComplete();
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleDisplayMode();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [currentIndex, slides?.length, zoomedImage]);

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight">Notes Unavailable</h2>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          No lecture slides have been configured for this module yet.
        </div>
        <button onClick={handleQuit} className="px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const currentSlide = slides[currentIndex];
  const slideTitle = lang === 'vn' ? (currentSlide.titleVn || currentSlide.title) : currentSlide.title;
  const slideSubtitle = lang === 'vn' ? (currentSlide.subtitleVn || currentSlide.subtitle) : currentSlide.subtitle;
  
  const slideContent = lang === 'vn' ? (currentSlide.contentVn || currentSlide.content) : currentSlide.content;
  const slideExample = lang === 'vn' ? (currentSlide.exampleVn || currentSlide.example) : currentSlide.example;
  
  const hasContent = !!slideContent;
  const hasExample = !!slideExample;
  const hasDiagram = !!currentSlide.widget || !!currentSlide.image || !!currentSlide.inlineSvg;
  
  // ADAPTIVE LAYOUT LOGIC
  // If there is an Example but NO Diagram, we render the Example in a beautiful Right-Hand Panel
  const showExampleOnRight = hasExample && !hasDiagram;
  const rightPanelExists = hasDiagram || showExampleOnRight;

  const labelEn = currentSlide.exampleLabel || 'Example';
  const labelVn = currentSlide.exampleLabelVn || currentSlide.exampleLabel || 'Ví Dụ';
  const displayLabel = lang === 'vn' ? labelVn : labelEn;

  const toggleAudio = (audioUrl) => {
    if (!audioUrl) return;
    try {
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        if (!audioRef.current || activeAudioUrl.current !== audioUrl) {
          if (audioRef.current) audioRef.current.pause();
          audioRef.current = new Audio(audioUrl);
          activeAudioUrl.current = audioUrl;
          audioRef.current.onended = () => setIsPlayingAudio(false);
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingAudio(true)).catch(error => {
            console.warn("Audio playback prevented by browser:", error);
            setIsPlayingAudio(false);
          });
        }
      }
    } catch (e) {
      console.warn("Audio interaction failed:", e);
      setIsPlayingAudio(false);
    }
  };

  const parseInlineText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const innerText = part.slice(2, -2);
        const mathParts = innerText.split(/(\$[\s\S]+?\$)/g);
        
        return (
          <strong key={`bold-${i}`} className="font-black text-slate-900 dark:text-slate-100">
            {mathParts.map((m, j) => {
              if (m.startsWith('$') && m.endsWith('$')) {
                return <SafeInlineMath key={`m-${j}`} math={m.slice(1, -1).trim()} />;
              }
              return <span key={`t-${j}`}>{m}</span>;
            })}
          </strong>
        );
      }
      
      const mathParts = part.split(/(\$[\s\S]+?\$)/g);
      return mathParts.map((m, j) => {
        if (m.startsWith('$') && m.endsWith('$')) {
          return <SafeInlineMath key={`m-${i}-${j}`} math={m.slice(1, -1).trim()} />;
        }
        return <span key={`t-${i}-${j}`}>{m}</span>;
      });
    });
  };

  const renderContent = (text, isExample = false) => {
    if (!text || typeof text !== 'string') return null;

    const blockParts = text.split(/(\$\$[\s\S]+?\$\$)/g);
    const elements = [];
    let groupedBumpers = [];

    const flushBumpers = () => {
      if (groupedBumpers.length > 0) {
        elements.push(
          <div key={`bumper-${elements.length}`} className={`my-4 bg-[#ffc800]/10 dark:bg-amber-900/10 border-l-[6px] border-[#ffc800] p-4 sm:p-5 rounded-r-2xl relative animate-in fade-in transition-all ${isDisplayMode ? 'ml-[clamp(1rem,1.5vw,1.5rem)]' : 'ml-0'}`}>
            <div className={`absolute ${isDisplayMode ? '-left-[18px] top-4 p-1.5' : '-left-[14px] top-4 p-1.5'} bg-[#ffc800] text-amber-950 rounded-full shadow-sm border-[2px] border-white dark:border-slate-900 z-10`}>
              <Pencil className={isDisplayMode ? "w-5 h-5" : "w-4 h-4"} strokeWidth={3} />
            </div>
            <div className={`space-y-3 ${isDisplayMode ? 'ml-3' : 'ml-3'}`}>
              {groupedBumpers.map((line, idx) => (
                <p key={idx} className={`text-amber-950 dark:text-amber-200 font-bold leading-relaxed ${isDisplayMode ? 'text-[clamp(1.15rem,1.8vw,1.6rem)]' : 'text-sm sm:text-base lg:text-lg'}`}>
                  {parseInlineText(line)}
                </p>
              ))}
            </div>
          </div>
        );
        groupedBumpers = [];
      }
    };

    blockParts.forEach((blockPart, i) => {
      if (blockPart.startsWith('$$') && blockPart.endsWith('$$')) {
        flushBumpers();
        const mathExpression = blockPart.slice(2, -2).trim();
        
        elements.push(
          <div key={`math-block-${i}`} className={`w-full text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'text-4xl' : 'text-xl lg:text-2xl'}`}>
            <SafeBlockMath math={mathExpression} />
          </div>
        );
      } else {
        const lines = blockPart.split('\n');
        lines.forEach((line, j) => {
          if (!line.trim()) {
            flushBumpers();
            elements.push(<div key={`space-${i}-${j}`} className={isDisplayMode ? "h-[clamp(0.75rem,1.5vh,1.5rem)]" : "h-3"} />);
          } else if (line.trim().startsWith('>')) {
            groupedBumpers.push(line.replace('>', '').trim());
          } else {
            flushBumpers();
            elements.push(
              <p key={`p-${i}-${j}`} className={`${isExample ? 'mb-1' : 'mb-3'} text-slate-700 dark:text-slate-300 font-medium ${isDisplayMode ? 'text-[clamp(1rem,1.8vw,1.6rem)] leading-relaxed tracking-tight' : 'text-[15px] sm:text-base lg:text-lg leading-relaxed'}`}>
                {parseInlineText(line)}
              </p>
            );
          }
        });
      }
    });
    
    flushBumpers(); 
    return elements;
  };

  return (
    <div 
      ref={containerRef} 
      className={`h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 overflow-hidden relative transition-colors duration-300 ${isDisplayMode && isIdle ? 'cursor-none' : ''}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.3); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.4); }
      `}} />

      {!isDisplayMode && (
        <TopBar 
          onQuit={handleQuit} 
          current={currentIndex + 1} 
          total={slides.length} 
          modeTitle="Lesson Notes" 
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex justify-center items-center z-10 overflow-hidden relative min-h-0 ${isDisplayMode ? 'p-0' : 'p-3 sm:p-6 lg:p-8'}`}>
        
        {/* Animated Wrapper for Cross-fade on slide change */}
        <div 
          key={currentIndex}
          className={`w-full max-h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-[0.98]
          ${isDisplayMode 
            ? 'h-full max-w-none rounded-none border-0' 
            : `rounded-3xl lg:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-800 h-full ${rightPanelExists ? 'max-w-7xl' : 'max-w-4xl'}`
          }`}
        >
          
          {currentSlide.type === 'intro' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#1cb0f6] dark:bg-[#1899d6]'} overflow-y-auto min-h-0`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <BookOpen className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={2.5} />
              </div>
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>
                {slideTitle || 'Introduction'}
              </h1>
              <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>
                {slideSubtitle}
              </p>
              
              {!isDisplayMode && currentSlide.audio && (
                 <button onClick={() => toggleAudio(currentSlide.audio)} className="mt-12 mx-auto flex items-center bg-white text-slate-800 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md border-b-[4px] border-slate-200 active:border-b-0 active:translate-y-[4px] px-6 py-3 text-sm">
                   {isPlayingAudio ? <PauseCircle className="w-6 h-6 mr-3 text-slate-800" /> : <PlayCircle className="w-6 h-6 mr-3 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'concept' && (() => {
            const SlideIcon = IconMap[currentSlide.icon] || BookOpen;
            const themeColor = currentSlide.color || 'bg-[#1cb0f6]';

            return (
              <>
                {/* Header Banner */}
                <div className={`${themeColor} ${isDisplayMode ? 'p-2 sm:p-3 lg:p-4' : 'p-4 lg:p-6'} text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10 transition-all`}>
                  <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 z-10 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
                    <SlideIcon className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className={`font-black tracking-tight z-10 relative drop-shadow-md pr-16 sm:pr-64 ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                    {slideTitle || 'Concept'}
                  </h2>
                  
                  {!isDisplayMode && currentSlide.audio && (
                    <button 
                      onClick={() => toggleAudio(currentSlide.audio)} 
                      className="ml-auto z-10 bg-white/20 hover:bg-white/30 transition-colors rounded-xl shadow-sm border border-white/30 active:scale-95 border-b-[4px] active:border-b-[1px] active:translate-y-[3px] p-2 lg:p-3"
                    >
                      {isPlayingAudio ? <PauseCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" /> : <PlayCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" />}
                    </button>
                  )}
                </div>
                
                {/* Content Body */}
                <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
                  
                  {/* Left Panel: Primary Content & Inline Examples */}
                  {(hasContent || (hasExample && hasDiagram)) && (
                    <div className={`flex-none h-[45%] lg:h-auto lg:flex-1 flex flex-col overflow-y-auto custom-scrollbar border-b-2 lg:border-b-0 border-slate-100 dark:border-slate-800 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${rightPanelExists ? 'lg:border-r-2 lg:w-[45%]' : 'w-full max-w-4xl mx-auto'}`}>
                      
                      {hasContent && <div className={hasExample && hasDiagram ? "pb-4 lg:pb-6" : ""}>{renderContent(slideContent)}</div>}
                      
                      {/* Only render example on Left side if the Right side is occupied by a Diagram */}
                      {hasExample && hasDiagram && (
                        <div className={`bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-3xl relative shadow-sm shrink-0 ${isDisplayMode ? 'mt-6 p-[clamp(1.25rem,2vw,2rem)]' : 'mt-6 lg:mt-8 p-4 lg:p-6'}`}>
                          <div className={`absolute -top-3.5 lg:-top-4 left-4 lg:left-6 ${themeColor} text-white font-black uppercase tracking-widest rounded-lg lg:rounded-xl shadow-sm ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] lg:text-xs px-3 lg:px-4 py-1'}`}>
                            {displayLabel}
                          </div>
                          
                          <div className={`font-bold text-slate-800 dark:text-slate-200 mt-1 lg:mt-2 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-sm sm:text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Right Panel: Diagram OR Adaptive Example Block */}
                  {rightPanelExists && (
                    <div className={`flex-1 w-full ${hasContent ? 'lg:w-[55%]' : 'lg:w-full'} bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
                      
                      {hasDiagram ? (
                        <div className={`relative w-full h-full bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center overflow-hidden group transition-all duration-300 
                          ${isDisplayMode ? 'rounded-[2rem]' : 'rounded-2xl lg:rounded-[2rem]'} 
                          ${currentSlide.drawThis ? 'border-[3px] lg:border-[4px] border-[#ffc800]' : 'border-2 border-slate-200 dark:border-slate-700'}`}>
                          
                          {currentSlide.drawThis && (
                            <div className={`absolute top-0 right-0 bg-[#ffc800] text-amber-950 font-black uppercase tracking-widest rounded-bl-2xl lg:rounded-bl-3xl z-20 shadow-sm flex items-center border-b-2 border-l-2 border-[#cca000] ${isDisplayMode ? 'text-[clamp(0.75rem,1vw,1.1rem)] px-5 py-2.5' : 'text-[9px] sm:text-xs px-3 lg:px-4 py-1.5 lg:py-2'}`}>
                              <Pencil className={`${isDisplayMode ? 'w-4 h-4 mr-2' : 'w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2'}`} strokeWidth={3} />
                              {lang === 'vn' ? 'Vẽ Hình Này' : 'Draw This'}
                            </div>
                          )}

                          {currentSlide.widget ? (
                            <div className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-2 sm:p-4'}`}>
                              <WidgetErrorBoundary>
                                <WidgetRenderer config={currentSlide.widget} />
                              </WidgetErrorBoundary>
                            </div>
                          ) : currentSlide.inlineSvg ? (
                            <div 
                              className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-3 sm:p-4'}`}
                              dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }} 
                            />
                          ) : (
                            <iframe 
                              src={currentSlide.image} 
                              title={slideTitle || "Educational Diagram"}
                              className="absolute inset-0 w-full h-full pointer-events-none select-none dark:opacity-90 object-contain"
                              scrolling="no"
                              frameBorder="0"
                            />
                          )}
                          
                          <button 
                            onClick={() => setZoomedImage(
                              currentSlide.widget 
                                ? { type: 'widget', config: currentSlide.widget }
                                : currentSlide.inlineSvg 
                                  ? { type: 'svg', content: currentSlide.inlineSvg } 
                                  : { type: 'url', src: currentSlide.image }
                            )}
                            className="absolute top-2 lg:top-4 right-2 lg:right-4 p-2.5 lg:p-3 bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-600 hover:text-[#1cb0f6] rounded-xl shadow-sm border-2 border-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 scale-95 hover:scale-100 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                            title="Expand"
                          >
                            <Maximize2 className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
                          </button>
                        </div>
                      ) : showExampleOnRight ? (
                        
                        /* ADAPTIVE RHS EXAMPLE PANEL (No messy scrolling!) */
                        <div className={`w-full h-full bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-[2rem] relative shadow-inner flex flex-col overflow-hidden`}>
                          <div className={`w-full ${themeColor} text-white font-black uppercase tracking-widest flex items-center shadow-md ${isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.3rem)] px-8 py-5' : 'text-xs px-6 py-4'}`}>
                            <Target className="w-5 h-5 mr-3 opacity-80" />
                            {displayLabel}
                          </div>
                          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 font-bold text-slate-800 dark:text-slate-200 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>

                      ) : null}
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {currentSlide.type === 'summary' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#58cc02]'} min-h-0 overflow-y-auto`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <CheckCircle2 className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={3} />
              </div>
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>{slideTitle || "Complete"}</h1>
              <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>{slideSubtitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Top-Right Floating Presenter Control Dock (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`absolute top-2.5 sm:top-3 right-3 sm:right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/15 z-50 transition-all duration-500 pointer-events-auto ${isIdle ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-1 px-1.5 border-r border-l border-white/20">
            <button onClick={() => setLang('en')} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === 'en' ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('vn')} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === 'vn' ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>VN</button>
          </div>

          {currentSlide.audio && (
            <button 
              onClick={() => toggleAudio(currentSlide.audio)}
              className={`flex items-center justify-center p-2 rounded-xl font-black transition-colors ${isPlayingAudio ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              title="Play Audio"
            >
              {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <PlayCircle className="w-5 h-5" strokeWidth={2.5} />}
            </button>
          )}

          <button onClick={toggleDisplayMode} className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-rose-500 hover:text-white transition-colors" title="Exit Presentation (Esc)">
             <Minimize2 className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button onClick={handleNext} className="p-2 rounded-xl bg-[#58cc02] text-white hover:bg-[#46a802] transition-colors shadow-sm ml-0.5">
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Subtle 3D Progress Bar Bottom Anchored (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`fixed bottom-0 left-0 right-0 h-1.5 bg-slate-200/20 dark:bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-500 pointer-events-none ${isIdle ? 'opacity-0' : 'opacity-100'}`}>
          <div 
            className="h-full bg-[#58cc02] transition-all duration-500 ease-out relative shadow-[0_-1px_10px_rgba(88,204,2,0.4)]"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40"></div>
          </div>
        </div>
      )}

      {/* Standard Bottom Navigation (Hidden in Display Mode) */}
      {!isDisplayMode && (
        <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 p-3 sm:p-5 z-20 flex-shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-1 sm:px-2 gap-3 sm:gap-4">
            
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none bg-white dark:bg-slate-900"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
            </button>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-1 sm:p-1.5 flex-shrink-0">
                <button 
                  onClick={() => setLang('en')} 
                  className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('vn')} 
                  className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === 'vn' ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
                >
                  VN
                </button>
              </div>

              <button 
                onClick={toggleDisplayMode}
                className="hidden md:flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-[#1cb0f6] transition-all border-2 border-slate-200 dark:border-slate-700 active:scale-95"
                title="Project to TV (Fullscreen)"
              >
                <MonitorPlay className="w-5 h-5 mr-2" strokeWidth={2.5} />
                <span className="text-xs font-black uppercase tracking-widest">Project</span>
              </button>
            </div>

            <button 
              onClick={handleNext}
              className={`flex items-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg tracking-widest uppercase transition-all border-b-[4px] active:border-b-0 active:translate-y-[4px]
                ${currentIndex === slides.length - 1 
                  ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]' 
                  : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
            >
              <span className="hidden sm:inline">{currentIndex === slides.length - 1 ? 'Finish' : 'Continue'}</span>
              <span className="sm:hidden">{currentIndex === slides.length - 1 ? 'End' : 'Next'}</span>
              {currentIndex !== slides.length - 1 && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-1 sm:ml-2 -mr-1 sm:-mr-2" strokeWidth={3} />}
            </button>

          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 pointer-events-auto cursor-auto">
          <button 
            onClick={() => setZoomedImage(null)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl transition-colors shadow-xl border-2 border-slate-200 active:scale-95 z-50 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden p-2 sm:p-6 animate-in zoom-in-95 duration-300 border-4 border-slate-200 dark:border-slate-700">
             {zoomedImage.type === 'widget' ? (
               <WidgetErrorBoundary>
                 <WidgetRenderer config={zoomedImage.config} />
               </WidgetErrorBoundary>
             ) : zoomedImage.type === 'svg' ? (
               <div 
                 className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm"
                 dangerouslySetInnerHTML={{ __html: zoomedImage.content }} 
               />
             ) : (
               <iframe 
                 src={zoomedImage.src} 
                 title="Expanded Diagram"
                 className="w-full h-full pointer-events-none select-none dark:opacity-90 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
                 scrolling="no"
                 frameBorder="0"
               />
             )}
          </div>
        </div>
      )}
    </div>
  );
}
</file>

<file path="src/tasks/Reading.jsx">
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle2, BookOpen, Volume2, VolumeX, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { playChime } from '../utils/sound';

export default function Reading({ pool, track, unitId, savedData = {}, onComplete, onQuit }) {
  const passages = useMemo(() => pool || [], [pool]);
  const [passageIndex, setPassageIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); 
  const [inputs, setInputs] = useState({});
  const [cumulativeCorrect, setCumulativeCorrect] = useState(0);
  const [btnCooldown, setBtnCooldown] = useState(false);
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const inputRefs = useRef([]);
  const audioState = useRef({ currentAudio: null });

  const currentPassage = passages[passageIndex];
  
  const blankWords = useMemo(() => {
    if (!currentPassage) return [];
    return currentPassage.text.match(/\{.*?\}/g)?.map(w => w.slice(1, -1)) || [];
  }, [currentPassage]);

  const calculateXP = (correct) => {
    let totalBlanks = 0;
    passages.forEach(p => {
      totalBlanks += (p.text.match(/\{.*?\}/g) || []).length;
    });
    if (totalBlanks === 0) return 0;
    return Math.floor((correct / totalBlanks) * 10);
  };

  const getPrefixLength = (word) => {
    if (!word) return 1;
    if (word.length <= 4) return 1;
    if (word.length <= 8) return 2;
    return 3;
  };

  const playPassageAudio = () => {
    if (audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
      audioState.current.currentAudio.currentTime = 0;
    }
    
    const basePath = import.meta.env.BASE_URL || '/';
    const audio = new Audio(`${basePath}audio/${track}/${unitId}/passage_${unitId}_${passageIndex + 1}.mp3`);
    audioState.current.currentAudio = audio;
    audio.play().catch(err => console.warn(`Could not play passage audio for ${unitId}`, err));
  };

  const stopAudio = () => {
    if (audioState.current && audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
    }
  };

  // State setup and Smart Reattempts Check
  useEffect(() => {
    if (gameState === 'Q') {
      const initialInputs = {};
      const savedPassage = localAnswers[passageIndex];
      const isPreviouslyPerfect = savedPassage?.status === 'perfect';

      blankWords.forEach((word, idx) => {
        const targetLetters = word.replace(/[^a-zA-Z]/g, '');
        // PRE-FILL if previous attempt was perfect
        initialInputs[idx] = isPreviouslyPerfect 
          ? targetLetters 
          : targetLetters.substring(0, getPrefixLength(targetLetters));
      });
      setInputs(initialInputs);

      if (isPreviouslyPerfect) {
        setCumulativeCorrect(prev => prev + blankWords.length);
        setGameState('A');
      } else {
        setTimeout(() => { if (inputRefs.current[0]) inputRefs.current[0].focus(); }, 100);
      }
    } else if (gameState === 'A') {
      let currentScore = 0;
      blankWords.forEach((word, idx) => {
        const targetLetters = word.replace(/[^a-zA-Z]/g, '');
        if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
      });
      
      const isPerfect = currentScore === blankWords.length;
      if (isPerfect) {
         setLocalAnswers(prev => ({ ...prev, [passageIndex]: { status: 'perfect' } }));
      }

      playChime(isPerfect ? 'correct' : 'incorrect');
      setTimeout(() => playPassageAudio(), 600);
    }

    return stopAudio;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, passageIndex]);

  const handleInputChange = (idx, val) => {
    setInputs(prev => ({ ...prev, [idx]: val }));
  };

  const checkAnswers = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 500);

    let currentScore = 0;
    blankWords.forEach((word, idx) => {
      const targetLetters = word.replace(/[^a-zA-Z]/g, '');
      if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
    });
    setCumulativeCorrect(prev => prev + currentScore);
    setGameState('A');
  };

  const handleNext = () => {
    if (btnCooldown) return;
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 500);
    
    stopAudio();

    if (passageIndex < passages.length - 1) {
      setPassageIndex(prev => prev + 1);
      setGameState('Q');
    } else {
      onComplete(calculateXP(cumulativeCorrect), localAnswers);
    }
  };

  // Global Keyboard Accessibility
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'Q') checkAnswers();
        else if (gameState === 'A') handleNext();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, inputs]); 

  const renderPassage = () => {
    if (!currentPassage) return null;
    const parts = currentPassage.text.split(/(\{.*?\})/g);
    let wordIdx = 0;

    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const targetWord = part.slice(1, -1);
        const targetLetters = targetWord.replace(/[^a-zA-Z]/g, '');
        const currentIndex = wordIdx++;
        const value = inputs[currentIndex] || '';
        const prefixLen = getPrefixLength(targetLetters);
        const prefix = targetLetters.substring(0, prefixLen);

        if (gameState === 'A') {
          const isCorrect = value.toLowerCase() === targetLetters.toLowerCase();
          return (
            <span key={i} className={`inline-flex items-center px-3 py-1 mx-1 rounded-xl border-2 font-bold shadow-sm transition-all ${isCorrect ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635]' : 'bg-[#FFDFE0] dark:bg-[#FFDFE0]/20 border-[#EA2B2B] text-[#A32D23] dark:text-[#f87171]'}`}>
              {isCorrect ? targetWord : <span className="line-through opacity-70 mr-2">{value}</span>}
              {!isCorrect && <span>{targetWord}</span>}
            </span>
          );
        }

        let inputIdx = 0;

        return (
          <span key={i} className="inline-flex relative align-middle mx-[4px] top-[-2px]">
            <input
              ref={el => inputRefs.current[currentIndex] = el}
              type="text"
              value={value}
              maxLength={targetLetters.length} 
              autoComplete="off"
              spellCheck="false"
              onChange={(e) => {
                let val = e.target.value.replace(/[^a-zA-Z]/g, ''); 
                if (val.length < prefixLen) {
                  val = prefix;
                } else if (!val.toLowerCase().startsWith(prefix.toLowerCase())) {
                  val = prefix + val.substring(prefixLen);
                }
                handleInputChange(currentIndex, val);

                if (val.length === targetLetters.length) {
                  setTimeout(() => {
                    if (inputRefs.current[currentIndex + 1]) {
                      inputRefs.current[currentIndex + 1].focus();
                    }
                  }, 50); 
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (inputRefs.current[currentIndex + 1]) {
                    inputRefs.current[currentIndex + 1].focus();
                  } else {
                     checkAnswers();
                  }
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
            />
            <div className="flex gap-[3px] sm:gap-[4px] pointer-events-none items-center">
              {Array.from(targetWord).map((char, charIdx) => {
                if (!/[a-zA-Z]/.test(char)) {
                  return <div key={charIdx} className="w-2 sm:w-3 flex items-center justify-center text-slate-300 dark:text-slate-600 font-bold">-</div>;
                }

                const letter = value[inputIdx] || '';
                const isPrefix = inputIdx < prefixLen;
                const isFilled = inputIdx < value.length;
                inputIdx++;
                
                let borderClass = 'border-slate-300 dark:border-slate-600 text-transparent shadow-[0_2px_0_0_#e2e8f0] dark:shadow-[0_2px_0_0_#475569]';
                if (isPrefix) borderClass = 'border-transparent text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-none';
                else if (isFilled) borderClass = 'border-[#1CB0F6] text-[#1CB0F6] bg-[#1CB0F6]/10 shadow-[0_2px_0_0_#1CB0F6]';

                return (
                  <div key={charIdx} className={`w-[24px] h-[32px] sm:w-[28px] sm:h-[38px] border-[2px] flex items-center justify-center font-bold text-[16px] sm:text-[18px] uppercase transition-all rounded-[6px] ${borderClass}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          </span>
        );
      }
      return <span key={i} className="leading-[2.8] text-slate-800 dark:text-slate-200">{part}</span>;
    });
  };

  if (!currentPassage) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans pb-56 lg:pb-40 transition-colors duration-300">
      <TopBar 
        current={passageIndex} 
        total={passages.length} 
        onQuit={() => { stopAudio(); onQuit(); }} 
        modeTitle="Reading" 
      />
      
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-2xl mb-3 font-bold tracking-widest uppercase text-sm">
            <BookOpen className="w-5 h-5 mr-2" /> {currentPassage.title}
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Complete the text with the correct words</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg shadow-slate-200 dark:shadow-none border-2 border-slate-100 dark:border-slate-800 overflow-hidden w-full mb-8">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="text-xl sm:text-2xl font-medium">
              {renderPassage()}
            </div>
          </div>
        </div>

        {gameState === 'Q' && (
          <button 
            disabled={btnCooldown}
            onClick={checkAnswers}
            className="w-full sm:w-auto min-w-[250px] px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm disabled:opacity-70"
          >
            Check Answers
          </button>
        )}

        {gameState === 'A' && (() => {
          let currentScore = 0;
          blankWords.forEach((word, idx) => {
            const targetLetters = word.replace(/[^a-zA-Z]/g, '');
            if ((inputs[idx] || '').toLowerCase() === targetLetters.toLowerCase()) currentScore++;
          });
          const isPerfect = currentScore === blankWords.length;

          return (
            <div className={`fixed bottom-0 left-0 w-full border-t-[6px] p-4 md:p-6 animate-in slide-in-from-bottom-10 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.2)] z-50
              ${isPerfect ? 'bg-[#D7FFB8] dark:bg-slate-800 border-[#58A700]' : 'bg-[#FFDFE0] dark:bg-slate-800 border-[#EA2B2B]'}`}>
              
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
                
                {/* Status Indicator */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start flex-shrink-0">
                  <div className={`flex items-center ${isPerfect ? 'text-[#58A700]' : 'text-[#EA2B2B] dark:text-[#f87171]'} mb-0`}>
                    {isPerfect ? <CheckCircle2 className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" /> : <XCircle className="w-10 h-10 mr-2 bg-white dark:bg-slate-900 rounded-full" />}
                    <span className="text-2xl font-black tracking-wide">{isPerfect ? 'Perfect!' : 'Review'}</span>
                  </div>
                </div>

                {/* Banner Middle Section: Audio Controls & Translation */}
                <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-white/60 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
                  
                  {/* Left Half: Audio Playback */}
                  <div className="flex-1 flex flex-col justify-center">
                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-2 ${isPerfect ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                      Passage Audio
                    </span>
                    <div className="flex items-center space-x-3">
                       <button onClick={() => { stopAudio(); playPassageAudio(); }} className="flex-1 flex items-center justify-center bg-[#1CB0F6] hover:bg-[#1899D6] text-white py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-sm transition-all active:scale-95">
                         <Volume2 className="w-4 h-4 mr-2" /> Replay
                       </button>
                       <button onClick={stopAudio} className="flex-1 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-[#EA2B2B] dark:hover:text-red-400 border-2 border-slate-200 dark:border-slate-600 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-sm transition-all active:scale-95">
                         <VolumeX className="w-4 h-4 mr-2" /> Stop
                       </button>
                    </div>
                  </div>

                  <div className="hidden md:block w-px bg-black/10 dark:bg-white/10"></div>

                  {/* Right Half: Vietnamese Translation (Scrollable) */}
                  <div className="flex-[2] max-h-[100px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1 ${isPerfect ? 'text-[#468500] dark:text-[#a3e635]' : 'text-[#C9362A] dark:text-[#f87171]'}`}>
                      {currentPassage.vnTitle}
                    </span>
                    <p className="font-medium text-sm text-slate-700 dark:text-slate-300 italic leading-snug">
                      "{currentPassage.vnText}"
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <button 
                  disabled={btnCooldown}
                  onClick={handleNext}
                  className={`w-full lg:w-auto px-10 py-5 rounded-xl font-black text-white text-lg uppercase tracking-widest transition-all flex-shrink-0 border-b-[5px] active:border-b-0 active:translate-y-[5px] mt-2 lg:mt-0 
                    ${isPerfect ? 'bg-[#58A700] hover:bg-[#468500] border-[#468500]' : 'bg-[#EA2B2B] hover:bg-[#C9362A] border-[#C9362A]'}`}
                >
                  Continue
                </button>

              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
</file>

<file path="src/tasks/Recognition.jsx">
import React, { useState, useEffect, useCallback } from 'react';
import { Check, BookOpen } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Recognition({ pool, track, unitId, onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [gameState, setGameState] = useState('Q');
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const currentWord = pool[wordIndex];

  const calculateXP = (currentScore) => {
    if (!pool || pool.length === 0) return 0;
    return Math.floor((currentScore / pool.length) * 10);
  };

  const handleAnswer = useCallback((choice) => {
    if (gameState !== 'Q') return;
    setScore(s => s + 1);
    setUserAnswer({ choice, isCorrect: true });
    setGameState('A');
  }, [gameState]);

  const handleNext = useCallback(() => {
    if (gameState !== 'A') return;
    if (wordIndex + 1 < pool.length) {
      setWordIndex(w => w + 1);
      setGameState('Q');
    } else {
      onComplete(calculateXP(score));
    }
  }, [gameState, wordIndex, pool.length, onComplete, score]);

  useEffect(() => {
    const handleGlobalNav = (e) => {
      // Ignore if focus is in an input
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      
      if (gameState === 'Q') {
        if (key === 'y') handleAnswer('yes');
        if (key === 'n') handleAnswer('no');
      } else if (gameState === 'A') {
        if (e.key === 'Enter' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, handleAnswer, handleNext]);

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32 transition-colors duration-300">
      <TopBar 
        current={wordIndex} 
        total={pool.length} 
        onQuit={() => onComplete(calculateXP(score))} 
        modeTitle="Word Recognition"
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto">
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm sm:text-base mb-8 text-center px-4">
          These core scientific vocabulary terms will act as your foundation for the upcoming activities. Read each definition carefully and write them down inside your physical science notebook before proceeding.
        </p>

        <div className="w-full flex items-center justify-center mb-12 min-h-[120px]">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-800 dark:text-slate-100 tracking-tight text-center break-words px-4 capitalize">
            {currentWord.word}
          </h1>
        </div>

        <div className="flex flex-row justify-center gap-6 sm:gap-12 w-full max-w-2xl">
          <button
            disabled={gameState === 'A'}
            onClick={() => handleAnswer('yes')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white dark:bg-slate-900 flex-shrink-0
              ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-not-allowed' 
              : 'border-slate-300 dark:border-slate-700 border-b-[8px] hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <Check className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'text-slate-400 dark:text-slate-600' : 'text-[#58A700] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${gameState === 'A' && userAnswer?.choice !== 'yes' ? 'text-slate-400 dark:text-slate-600' : 'text-[#58A700]'}`}>Yes, I know it<br/><span className="text-sm opacity-70">(Y)</span></span>
          </button>
          
          <button
            disabled={gameState === 'A'}
            onClick={() => handleAnswer('no')}
            className={`group flex flex-col items-center justify-center w-40 h-40 sm:w-52 sm:h-52 border-2 rounded-[2rem] transition-all bg-white dark:bg-slate-900 flex-shrink-0
              ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-not-allowed' 
              : 'border-slate-300 dark:border-slate-700 border-b-[8px] hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-[6px]'}`}
          >
            <BookOpen className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-colors ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'text-slate-400 dark:text-slate-600' : 'text-[#1CB0F6] group-hover:scale-110'}`} strokeWidth={4} />
            <span className={`font-black text-lg sm:text-xl uppercase tracking-widest text-center px-2 ${gameState === 'A' && userAnswer?.choice !== 'no' ? 'text-slate-400 dark:text-slate-600' : 'text-[#1CB0F6]'}`}>No, teach me<br/><span className="text-sm opacity-70">(N)</span></span>
          </button>
        </div>
      </div>

      {gameState === 'A' && (
        <Feedback 
          isCorrect={userAnswer?.isCorrect} 
          currentWord={currentWord} 
          isWordRecognition={true} 
          track={track}
          unitId={unitId}
          onNext={handleNext} 
        />
      )}
    </div>
  );
}
</file>

<file path="src/tasks/ShortAnswers.jsx">
import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, XCircle, Award, PenTool, Type, FlaskConical, FileEdit, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';

import { gradeShortAnswer } from '../utils/aiGrader';

const calculateSimilarity = (str1, str2) => {
  const clean = (s) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim();
  const a = clean(str1);
  const b = clean(str2);
  if (a.length === 0) return 0;
  if (a === b) return 1;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return Math.max(0, 1 - distance / Math.max(a.length, b.length));
};

const checkRequiredWordGroup = (wordGroup, text) => {
  if (!text) return false;
  const group = Array.isArray(wordGroup) ? wordGroup : [wordGroup];

  for (let reqWord of group) {
    if (text.toLowerCase().includes(reqWord.toLowerCase())) return true;
    if (!reqWord.includes(' ')) {
      const words = text.split(/[\s,.-]+/);
      for (let w of words) {
        if (calculateSimilarity(reqWord, w) >= 0.85) return true;
      }
    }
  }
  return false;
};

export default function ShortAnswers({ pool, onComplete, onQuit, savedData = {}, strikes = 0, onAddStrike }) {
  const questions = pool?.shortQA || [];
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('Q'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [cumulativePoints, setCumulativePoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localAnswers[currentIndex];
    
    if (saved) {
      const text = typeof saved === 'string' ? saved : saved.text;
      const status = typeof saved === 'string' ? 'perfect' : saved.status;

      setUserAnswer(text);
      setFeedback(null);

      if (status === 'perfect') {
        setGameState('SAVED_PERFECT');
      } else if (status === 'api_error') {
        setGameState('SAVED_API_ERROR');
      } else if (status === 'strike_fallback') {
        setGameState('Q'); 
      } else {
        setGameState('Q');
      }
    } else {
      setUserAnswer('');
      setFeedback(null);
      setGameState('Q');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleLocalFallbackGrade = () => {
    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    
    const trimmed = userAnswer.trim();
    const hasCapital = /^[A-Z]/.test(trimmed);
    const hasPeriod = /[.!?]$/.test(trimmed);
    const englishScore = (hasCapital && hasPeriod) ? 1 : 0;

    const pointsEarned = usedWordGroups.length + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 2; 

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks: currentQ.markScheme.map(() => false),
      scienceScore: 0,
      englishScore,
      pointsEarned,
      maxPoints,
      isPerfect: false,
      englishFeedback: englishScore ? "1 point awarded for capital letter and punctuation." : "Missed extra point. Start with a capital and end with a period.",
      scienceFeedback: "AI Grader is disabled for this unit due to 3 strikes. No Cambridge marks can be awarded.",
      fixedAnswer: "AI Grader disabled.",
      isStrikeFallback: true
    });

    setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'strike_fallback' } }));
    setGameState('A');
  };

  const handleGrade = async () => {
    if (!userAnswer.trim()) return;

    if (strikes >= 3) {
      handleLocalFallbackGrade();
      return;
    }

    setGameState('LOADING');

    const primaryRequiredWords = currentQ.requiredWords.map(w => Array.isArray(w) ? w[0] : w);
    const payload = {
      question: currentQ.question,
      studentAnswer: userAnswer.trim(),
      requiredWords: primaryRequiredWords,
      expectedAnswer: currentQ.modelAnswer,
      scienceMaxMarks: currentQ.scienceMaxMarks,
      markScheme: currentQ.markScheme
    };

    let aiData;

    try {
      aiData = await gradeShortAnswer(payload);
    } catch (e1) {
      console.warn("AI Grade Failed, retrying in 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      try {
        aiData = await gradeShortAnswer(payload);
      } catch (e2) {
        console.error("AI Grade Failed twice. Entering Error State.");
        setGameState('SAVED_API_ERROR');
        setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'api_error' } }));
        return;
      }
    }

    if (aiData.isHarmful || aiData.isGarbage) {
      const newStrikes = strikes + 1;
      if (onAddStrike) onAddStrike(newStrikes);
      
      if (newStrikes >= 3) {
        alert("Strike 3! You have submitted too many inappropriate or nonsense answers. The AI Grader is permanently disabled for this unit.");
        handleLocalFallbackGrade();
      } else {
        alert(`Warning! Nonsense or inappropriate answer detected. Strike ${newStrikes}/3.`);
        setGameState('Q'); 
      }
      return;
    }

    const usedWordGroups = currentQ.requiredWords.filter(group => checkRequiredWordGroup(group, userAnswer));
    const scienceScore = aiData.scienceScore || 0;
    const englishScore = aiData.englishScore || 0;
    const scienceMarks = currentQ.markScheme.map((_, i) => i < scienceScore);

    const pointsEarned = usedWordGroups.length + scienceScore + englishScore;
    const maxPoints = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 2; 
    const isPerfect = pointsEarned >= maxPoints;

    setFeedback({
      originalAnswer: userAnswer.trim(),
      usedWordGroups,
      scienceMarks,
      scienceScore,
      englishScore,
      pointsEarned: Math.min(pointsEarned, maxPoints),
      maxPoints,
      isPerfect,
      englishFeedback: aiData.englishFeedback || "No feedback provided.",
      scienceFeedback: aiData.scienceFeedback || "No feedback provided.",
      fixedAnswer: aiData.reworkedAnswer || userAnswer.trim(),
      isStrikeFallback: false
    });

    if (isPerfect) {
      setLocalAnswers(prev => ({ ...prev, [currentIndex]: { text: userAnswer.trim(), status: 'perfect' } }));
    }
    
    setGameState('A');
  };

  const handleNext = () => {
    let newCumPoints = cumulativePoints;
    let newMaxPoints = maxPossiblePoints;

    if (gameState === 'SAVED_PERFECT') {
      const maxP = currentQ.requiredWords.length + currentQ.scienceMaxMarks + 2;
      newCumPoints += maxP;
      newMaxPoints += maxP;
    } else if (feedback) {
      newCumPoints += feedback.pointsEarned;
      newMaxPoints += feedback.maxPoints;
    } else if (gameState === 'SAVED_API_ERROR') {
      newMaxPoints += currentQ.requiredWords.length + currentQ.scienceMaxMarks + 2;
    }

    setCumulativePoints(newCumPoints);
    setMaxPossiblePoints(newMaxPoints);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalXP = newMaxPoints === 0 ? 0 : Math.ceil((newCumPoints / newMaxPoints) * 20);
      onComplete(finalXP, localAnswers); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      if (gameState === 'Q' || gameState === 'SAVED_API_ERROR') {
        if (userAnswer.trim()) handleGrade();
      } else if (gameState === 'A' || gameState === 'SAVED_PERFECT') {
        handleNext();
      }
    }
  };

  // Global Keyboard Accessibility (Ignoring TEXTAREA)
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'A' || gameState === 'SAVED_PERFECT' || gameState === 'SAVED_API_ERROR') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, handleNext]);


  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
        <PenTool className="w-16 h-16 text-teal-300 dark:text-teal-500 mb-4" />
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Coming Soon</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md">Teacher is currently writing the Short Answer questions for this unit.</p>
        <button onClick={onQuit} className="px-8 py-4 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black uppercase tracking-widest border-b-[5px] border-[#1899D6] active:border-b-0 active:translate-y-[5px] transition-all">
          Return
        </button>
      </div>
    );
  }

  let containerClass = "w-full rounded-[1.5rem] shadow-sm border p-6 sm:p-8 mb-6 relative transition-all duration-300 ";
  let textAreaClass = "w-full h-40 text-lg font-medium bg-transparent focus:outline-none resize-none disabled:bg-transparent ";
  
  if (gameState === 'SAVED_API_ERROR') {
    containerClass += "bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800/50";
    textAreaClass += "text-orange-900 dark:text-orange-100";
  } else if (strikes >= 3 || (gameState === 'A' && feedback?.isStrikeFallback)) {
    containerClass += "bg-rose-50 dark:bg-rose-950/30 border-rose-400 dark:border-rose-800/50";
    textAreaClass += "text-rose-900 dark:text-rose-100";
  } else if ((gameState === 'A' && feedback?.isPerfect) || gameState === 'SAVED_PERFECT') {
    containerClass += "bg-[#ecfccb] dark:bg-[#3f6212]/20 border-[#84cc16] dark:border-[#4d7c0f]";
    textAreaClass += "text-[#3f6212] dark:text-[#a3e635]";
  } else {
    containerClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700";
    textAreaClass += "text-slate-800 dark:text-slate-100";
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 transition-colors duration-300">
      <TopBar 
        current={currentIndex} 
        total={questions.length} 
        onQuit={() => onComplete(0, localAnswers)} 
        modeTitle="Short Answers" 
      />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-4xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full mb-8 animate-in fade-in duration-300">
          <h2 className="text-[#14b8a6] font-black text-xl mb-3 uppercase tracking-widest">
            Question {currentIndex + 1}
          </h2>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 leading-snug">
            {currentQ.question}
          </p>
        </div>

        <div className={containerClass}>
          <textarea 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            disabled={gameState !== 'Q'}
            placeholder={strikes >= 3 ? "AI Grader disabled. Local fallback grading only." : "Type your answer here..."}
            className={textAreaClass}
          />
        </div>

        {gameState !== 'LOADING' && (
          <div className="w-full mb-10">
            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
              Required Vocabulary
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {currentQ.requiredWords.map((wordGroup, i) => {
                const isUsed = feedback 
                  ? feedback.usedWordGroups.includes(wordGroup) 
                  : checkRequiredWordGroup(wordGroup, userAnswer);
                const displayWord = Array.isArray(wordGroup) ? wordGroup[0] : wordGroup;
                
                return (
                  <span 
                    key={i} 
                    className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-colors duration-300 ${
                      isUsed 
                        ? 'bg-[#d7ffb8] dark:bg-[#d7ffb8]/20 text-[#3e7500] dark:text-[#a3e635] border-[#58a700]' 
                        : 'bg-white dark:bg-slate-800 text-[#58a700] dark:text-[#84cc16] border-[#58a700] dark:border-[#84cc16]'
                    }`}
                  >
                    {displayWord}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'SAVED_PERFECT' && (
          <div className="w-full flex justify-end mt-2 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6 animate-in fade-in">
             <button 
               onClick={handleNext} 
               className="flex items-center px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
             >
               {currentIndex < questions.length - 1 ? 'Continue' : 'Complete Section'} 
               <ArrowRight className="w-6 h-6 ml-3" />
             </button>
          </div>
        )}

        {gameState === 'SAVED_API_ERROR' && (
          <div className="w-full mt-2 animate-in fade-in">
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 p-6 sm:p-8 rounded-[1.5rem] shadow-sm mb-8">
               <div className="flex items-center mb-4">
                 <XCircle className="w-8 h-8 text-orange-500 mr-3" />
                 <h3 className="text-xl font-black text-orange-800 dark:text-orange-400">Connection Failed</h3>
               </div>
               <p className="text-sm font-bold text-orange-700 dark:text-orange-300 mt-2">
                 The AI grader is currently offline. Your answer has been saved. Please continue and resubmit on a future attempt.
               </p>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
               <button onClick={handleNext} className="flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-orange-700 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm">
                 {currentIndex < questions.length - 1 ? 'Skip Question' : 'Complete Section'} <ArrowRight className="w-6 h-6 ml-3" />
               </button>
            </div>
          </div>
        )}

        {(gameState === 'Q' || gameState === 'SAVED_API_ERROR') && (
          <div className="w-full flex justify-end mt-2 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
            <button 
              onClick={handleGrade} 
              disabled={!userAnswer.trim()} 
              className="px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] disabled:opacity-50 transition-all shadow-sm"
            >
              Submit to {strikes >= 3 ? "Local Grader" : "AI Tutor"}
            </button>
          </div>
        )}

        {gameState === 'LOADING' && (
          <div className="w-full h-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse mt-8">
             <div className="bg-teal-100 dark:bg-teal-900/40 p-3 rounded-full mb-3">
               <Bot className="w-8 h-8 text-teal-600 dark:text-teal-400 animate-bounce" />
             </div>
             <h3 className="text-lg font-black text-slate-700 dark:text-slate-300">AI Tutor is analyzing your answer...</h3>
          </div>
        )}

        {gameState === 'A' && feedback && (
          <div className="w-full mt-2 animate-in slide-in-from-bottom-8 duration-500">

            {!feedback.isPerfect && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Your Attempt
                </span>
                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic">
                  "{feedback.originalAnswer}"
                </p>
              </div>
            )}

            <div className="flex items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className={`p-3 rounded-full mr-4 flex-shrink-0 ${feedback.isStrikeFallback ? 'bg-rose-500' : 'bg-[#14b8a6]'}`}>
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {feedback.isStrikeFallback ? "Local Fallback Evaluation" : "AI Tutor Evaluation"}
                </h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
                  Accuracy Score: 
                  <span className={`ml-2 text-base ${feedback.isPerfect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    {feedback.pointsEarned} / {feedback.maxPoints} Pts
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4 text-slate-800 dark:text-slate-200">
                <div className="flex items-center">
                  <Award className="w-6 h-6 mr-2 text-amber-500" />
                  <h3 className="text-lg font-black">Cambridge Mark Scheme Breakdown</h3>
                </div>
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-lg text-sm">
                  {feedback.scienceScore} / {currentQ.scienceMaxMarks} Pts
                </span>
              </div>
              
              <ul className="space-y-3">
                {currentQ.markScheme.map((mark, i) => (
                  <li key={i} className="flex items-start">
                    {feedback.scienceMarks[i] ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 dark:text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-base font-medium ${feedback.scienceMarks[i] ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600 line-through'}`}>
                      {mark}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div className="bg-[#fff9e6] dark:bg-[#fff9e6]/10 border border-[#fde68a] dark:border-[#fde68a]/20 p-6 rounded-[1.5rem]">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center text-[#d97706] dark:text-[#fbbf24]">
                     <Type className="w-5 h-5 mr-2" />
                     <h4 className="font-black text-sm uppercase tracking-widest">English Feedback</h4>
                   </div>
                   <span className="bg-[#fef3c7] dark:bg-[#fef3c7]/20 text-[#b45309] dark:text-[#fcd34d] font-bold px-2 py-0.5 rounded-md text-xs">
                     {feedback.englishScore} / 2 Pts
                   </span>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                   {feedback.englishFeedback}
                 </p>
               </div>
               
               <div className="bg-[#eff6ff] dark:bg-[#eff6ff]/10 border border-[#bfdbfe] dark:border-[#bfdbfe]/20 p-6 rounded-[1.5rem]">
                 <div className="flex items-center text-[#2563eb] dark:text-[#60a5fa] mb-3">
                   <FlaskConical className="w-5 h-5 mr-2" />
                   <h4 className="font-black text-sm uppercase tracking-widest">Science Feedback</h4>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                   {feedback.scienceFeedback}
                 </p>
               </div>
            </div>

            <div className="bg-[#ecfccb] dark:bg-[#3f6212]/20 border border-[#bbf7d0] dark:border-[#4d7c0f] p-6 sm:p-8 rounded-[1.5rem] relative overflow-hidden mb-8">
              <div className="absolute top-4 right-4 bg-[#84cc16] p-2 rounded-full text-white">
                <FileEdit className="w-5 h-5" />
              </div>
              
              <h4 className="font-black text-[#3f6212] dark:text-[#a3e635] text-sm uppercase tracking-widest mb-4">
                Suggested Notebook Answer
              </h4>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-bold text-[#65a30d] dark:text-[#bef264] uppercase mb-1">
                    {feedback.isPerfect ? "Your Perfect Sentence:" : "Fixed Version of Your Sentence:"}
                  </span>
                  <p className="text-lg font-bold text-[#166534] dark:text-[#ecfccb]">
                    "{feedback.fixedAnswer}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9f99d] dark:border-[#65a30d]">
                  <span className="block text-xs font-bold text-[#65a30d] dark:text-[#bef264] uppercase mb-1">
                    Official Model Answer:
                  </span>
                  <p className="text-lg font-bold text-[#166534] dark:text-[#ecfccb]">
                    "{currentQ.modelAnswer}"
                  </p>
                </div>
              </div>
              
              <p className="text-sm font-bold text-[#3f6212] dark:text-[#a3e635] mt-6 bg-[#d9f99d] dark:bg-[#3f6212]/50 inline-block px-4 py-2 rounded-lg">
                📝 Write one of these down in your notebook for full credit.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
               <button 
                 onClick={handleNext} 
                 className="flex items-center px-10 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-[#0d9488] active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
               >
                 {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Section'} 
                 <ArrowRight className="w-6 h-6 ml-3" />
               </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
</file>

<file path="src/tasks/Spell.jsx">
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import TopBar from '../components/TopBar';
import Feedback from '../components/Feedback';

export default function Spell({ pool, track, unitId, savedData = {}, onComplete, onQuit }) {
  const realWords = useMemo(() => (pool || []).filter(w => w.isReal !== false), [pool]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [localAnswers, setLocalAnswers] = useState(savedData);
  
  const [gameState, setGameState] = useState('Q');
  const [userAnswer, setUserAnswer] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  
  const inputRef = useRef(null);
  const currentWord = realWords[wordIndex];

  const calculateXP = (currentScore) => {
    if (!realWords || realWords.length === 0) return 0;
    return Math.floor((currentScore / realWords.length) * 10);
  };

  const getPrefixLength = (word) => {
    if (!word) return 1;
    if (word.length <= 4) return 1;
    if (word.length <= 8) return 2;
    return 3;
  };

  useEffect(() => {
    if (!currentWord) return;
    
    // Check historical data for a perfect score
    const saved = localAnswers[wordIndex];
    if (saved && saved.status === 'perfect') {
      const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
      setUserInput(targetLetters);
      setGameState('SAVED_PERFECT');
      setScore(s => s + 1);
    } else {
      const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
      setUserInput(targetLetters.substring(0, getPrefixLength(targetLetters)));
      setGameState('Q');
      setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
    }
  }, [wordIndex, currentWord]);

  const checkAnswer = () => {
    if (gameState !== 'Q') return;
    const targetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
    const isCorrect = userInput.toLowerCase() === targetLetters.toLowerCase();
    
    if (isCorrect) {
      setScore(s => s + 1);
      setLocalAnswers(prev => ({ ...prev, [wordIndex]: { status: 'perfect' } }));
    }
    
    setUserAnswer({ isCorrect });
    setGameState('A');
  };

  const handleNext = () => {
    if (gameState !== 'A' && gameState !== 'SAVED_PERFECT') return;
    if (wordIndex < realWords.length - 1) {
      setWordIndex(w => w + 1);
    } else {
      onComplete(calculateXP(score), localAnswers);
    }
  };

  // Global Keyboard Accessibility (WITH THE BUG FIX)
  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        
        if (gameState === 'Q') {
            const targetLetters = currentWord?.word.replace(/[^a-zA-Z]/g, '');
            if (userInput.length === targetLetters?.length && e.key === 'Enter') {
               e.preventDefault();
               checkAnswer();
            }
        }
        else if (gameState === 'A') {
            // CRITICAL FIX: Only allow ArrowRight here. 
            // Feedback.jsx natively handles the 'Enter' key with a perfect 400ms safety cooldown.
            if (e.key === 'ArrowRight') {
               e.preventDefault();
               handleNext();
            }
        }
        else if (gameState === 'SAVED_PERFECT') {
            e.preventDefault();
            handleNext();
        }
      }
    };
    
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
  }, [gameState, userInput, currentWord]);

  const renderInteractiveSentence = () => {
    if (!currentWord) return null;
    const targetWord = currentWord.word;
    const targetLetters = targetWord.replace(/[^a-zA-Z]/g, '');
    const prefixLen = getPrefixLength(targetLetters);
    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const parts = currentWord.sent.split(regex);
    
    if (parts.length === 1) {
       return (
         <div className="flex flex-col items-center w-full">
           <span className="text-xl text-slate-500 dark:text-slate-400 italic mb-4 text-center">"{currentWord.sent}"</span>
           {renderLetterBoxes(targetWord, targetLetters, prefixLen)}
         </div>
       );
    }
    return (
      <div className="text-2xl sm:text-3xl text-slate-800 dark:text-slate-200 leading-[2.5] font-medium text-center w-full">
        <span>{parts[0]}</span>
        {renderLetterBoxes(targetWord, targetLetters, prefixLen)}
        <span>{parts[1]}</span>
      </div>
    );
  };

  const renderLetterBoxes = (targetWord, targetLetters, prefixLen) => {
    let inputIdx = 0;
    const isLongWord = targetWord.length > 10;
    
    return (
      <span className="relative inline-block align-middle mx-2 sm:mx-3 top-[-2px] max-w-full">
        <input ref={inputRef} type="text" value={userInput} maxLength={targetLetters.length} disabled={gameState === 'A' || gameState === 'SAVED_PERFECT'} autoComplete="off" spellCheck="false"
          onChange={(e) => {
            let val = e.target.value.replace(/[^a-zA-Z]/g, ''); 
            if (val.length < prefixLen) val = targetLetters.substring(0, prefixLen);
            else if (!val.toLowerCase().startsWith(targetLetters.substring(0, prefixLen).toLowerCase())) val = targetLetters.substring(0, prefixLen) + val.substring(prefixLen);
            setUserInput(val);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' && userInput.length === targetLetters.length) { e.preventDefault(); checkAnswer(); } }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10" />
        
        <div className="flex flex-wrap justify-center gap-[4px] sm:gap-[6px] pointer-events-none items-center max-w-full">
          {Array.from(targetWord).map((char, i) => {
            if (!/[a-zA-Z]/.test(char)) {
              return <div key={i} className="w-2 sm:w-4 flex items-center justify-center text-slate-300 dark:text-slate-600 font-black text-xl sm:text-2xl">-</div>;
            }

            const letter = userInput[inputIdx] || ''; 
            const isPrefix = inputIdx < prefixLen; 
            const isFilled = inputIdx < userInput.length;
            const currentInputIdx = inputIdx; 
            inputIdx++; 
            
            let boxClass = 'border-slate-300 dark:border-slate-600 text-transparent shadow-[0_3px_0_0_#e2e8f0] dark:shadow-[0_3px_0_0_#475569]';
            if (isPrefix) boxClass = 'border-transparent text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 shadow-none';
            else if (isFilled) boxClass = 'border-[#1CB0F6] text-[#1CB0F6] bg-[#1CB0F6]/10 shadow-[0_3px_0_0_#1CB0F6]'; 
            
            if (gameState === 'A' || gameState === 'SAVED_PERFECT') {
              const isPerfectState = gameState === 'SAVED_PERFECT' || (userInput.toLowerCase() === targetLetters.toLowerCase());
              boxClass = isPerfectState 
                ? 'border-[#58A700] text-[#58A700] dark:text-[#a3e635] bg-[#F0FDE6] dark:bg-[#F0FDE6]/20 shadow-[0_3px_0_0_#58A700]' 
                : 'border-[#EA2B2B] text-[#EA2B2B] dark:text-[#f87171] bg-[#FFDFE0] dark:bg-[#FFDFE0]/20 shadow-[0_3px_0_0_#EA2B2B]';
            }

            const sizeClass = isLongWord 
              ? 'w-6 h-8 sm:w-8 sm:h-10 text-lg sm:text-xl' 
              : 'w-8 h-10 sm:w-10 sm:h-12 text-xl sm:text-2xl';
            
            return (
              <div key={i} className={`${sizeClass} border-2 flex items-center justify-center font-black uppercase transition-all rounded-lg ${boxClass}`}>
                {(gameState === 'A' || gameState === 'SAVED_PERFECT') && !isFilled ? targetLetters[currentInputIdx] : letter}
              </div>
            );
          })}
        </div>
      </span>
    );
  };

  if (!currentWord) return null;
  const currentTargetLetters = currentWord.word.replace(/[^a-zA-Z]/g, '');
  const isPerfectState = gameState === 'SAVED_PERFECT';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#1CB0F6]/20 selection:text-[#1CB0F6] pb-32 transition-colors duration-300 ${isPerfectState ? 'bg-[#F0FDE6] dark:bg-[#F0FDE6]/10' : 'bg-slate-50 dark:bg-slate-950'}`}>
      <TopBar current={wordIndex} total={realWords.length} onQuit={() => onComplete(calculateXP(score), localAnswers)} modeTitle="Spelling" />
      <div className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8">
        
        <div className="w-full text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-2xl mb-4 font-bold tracking-widest uppercase text-sm">
            <BookOpen className="w-5 h-5 mr-2" /> {isPerfectState ? 'Perfect Score Saved' : 'Context Clues'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {currentWord.def}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-2">
            {currentWord.vnDef}
          </p>
        </div>
        
        <div className={`w-full rounded-[2rem] shadow-lg border-2 p-6 sm:p-12 mb-8 transition-colors duration-300 flex justify-center
          ${isPerfectState 
            ? 'bg-[#D7FFD7]/50 dark:bg-slate-800 border-[#58A700]/30 dark:border-[#58A700]/50 shadow-none' 
            : 'bg-white dark:bg-slate-900 shadow-slate-200 dark:shadow-none border-slate-100 dark:border-slate-800'}`}>
          {renderInteractiveSentence()}
        </div>

        {gameState === 'Q' && (
          <button 
            onClick={checkAnswer} 
            disabled={userInput.length < currentTargetLetters.length} 
            className="w-full max-w-sm px-8 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] disabled:opacity-50 transition-all shadow-sm"
          >
            Check Answer
          </button>
        )}

        {isPerfectState && (
          <button 
            onClick={handleNext}
            className="w-full max-w-sm px-8 py-5 bg-[#58A700] hover:bg-[#468500] text-white rounded-2xl font-black text-xl tracking-wide border-b-[6px] border-[#468500] active:border-b-0 active:translate-y-[6px] transition-all shadow-sm"
          >
            Continue
          </button>
        )}
      </div>

      {gameState === 'A' && (
        <Feedback 
          isCorrect={userAnswer?.isCorrect} 
          currentWord={currentWord} 
          isWordRecognition={false} 
          track={track} 
          unitId={unitId} 
          onNext={handleNext} 
        />
      )}
    </div>
  );
}
</file>

<file path="src/tasks/VocabWriting.jsx">
import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Volume2, PenTool, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import TopBar from '../components/TopBar';

export default function VocabWriting({ pool, track, onComplete, onQuit }) {
  const { realWords = [], passages = [] } = pool || {};
  const audioState = useRef({ currentAudio: null });
  const [btnCooldown, setBtnCooldown] = useState(false);

  // Start page at the top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    
    return () => {
      if (audioState.current.currentAudio) {
        audioState.current.currentAudio.pause();
      }
    };
  }, []);

  const playAudio = (type, word) => {
    if (btnCooldown) return;
    
    setBtnCooldown(true);
    setTimeout(() => setBtnCooldown(false), 400);

    if (audioState.current.currentAudio) {
      audioState.current.currentAudio.pause();
      audioState.current.currentAudio.currentTime = 0;
    }

    const basePath = import.meta.env.BASE_URL || '/';
    const audio = new Audio(`${basePath}audio/${track}/${type}_${word.toLowerCase()}.mp3`);
    
    audioState.current.currentAudio = audio;
    audio.play().catch(err => console.warn(`Could not play ${type} audio for ${word}`, err));
  };

  const renderPassageWithHighlights = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const word = part.slice(1, -1);
        return (
          <strong key={i} className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md mx-0.5 shadow-sm border border-indigo-200">
            {word}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-32">
      <TopBar current={0} total={1} onQuit={onQuit} modeTitle="Vocab Writing" />

      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 w-full max-w-5xl mx-auto mt-2 sm:mt-6">
        
        <div className="w-full bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] p-8 sm:p-10 shadow-lg text-white mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
            <FileText className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center bg-white/20 px-4 py-2 rounded-2xl mb-4 font-bold tracking-widest uppercase text-sm backdrop-blur-sm border border-white/20">
              <FileText className="w-5 h-5 mr-2" /> Phase 2
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">Vocab Writing</h1>
            <p className="text-lg text-indigo-50 font-medium max-w-3xl">
              Write each vocabulary word and its definition carefully into your physical notebook. Review the sentences and passages below to see how these words are used in real scientific context.
            </p>
          </div>
        </div>

        <div className="w-full space-y-6">
          {realWords.map((wordObj, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
              
              <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 capitalize flex items-center flex-wrap gap-3">
                    {wordObj.word}
                    <span className="text-lg font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                      {wordObj.vn}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => playAudio('word', wordObj.word)} className="flex items-center bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border-2 border-slate-200 hover:border-indigo-300 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">
                    <Volume2 className="w-4 h-4 mr-2" /> Word
                  </button>
                  <button onClick={() => playAudio('def', wordObj.word)} className="flex items-center bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border-2 border-slate-200 hover:border-indigo-300 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">
                    <Volume2 className="w-4 h-4 mr-2" /> Def
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-4">
                  <div>
                    <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest mb-1.5 block">English Definition</span>
                    <p className="font-bold text-lg text-slate-800 leading-snug">{wordObj.def}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest mb-1.5 block">Vietnamese Meaning</span>
                    <p className="font-medium text-slate-600 italic leading-snug">{wordObj.vnDef}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-[11px] text-slate-400 uppercase tracking-widest">Sample Sentence</span>
                      <button onClick={() => playAudio('sentence', wordObj.word)} className="text-indigo-500 hover:text-indigo-700 transition-colors p-1 bg-indigo-50 rounded-lg"><Volume2 className="w-4 h-4" /></button>
                    </div>
                    <p className="font-bold text-base text-slate-800 leading-snug">"{wordObj.sent}"</p>
                    <p className="font-medium text-sm text-slate-500 italic mt-1">"{wordObj.vnSent}"</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-16">
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-black text-slate-800">Reading Passages in Context</h2>
          </div>
          
          <div className="space-y-6">
            {passages.map((p, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">{p.title}</h3>
                <p className="text-lg text-slate-700 leading-loose">
                  {renderPassageWithHighlights(p.text)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-[2rem] p-8 sm:p-10 text-center mt-16 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-200">
             <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-3xl font-black text-amber-900 mb-3 tracking-tight">Teacher Review Required</h3>
          <p className="text-lg text-amber-800 font-medium max-w-2xl mx-auto">
            To earn points for this section, you must show Mr. Bowen your <strong className="font-black">vocabulary definitions</strong> written down, PLUS the <strong className="font-black">answers to the Short Answers</strong> from the next section written in your physical notebook.
          </p>
          
          <button 
            onClick={() => onComplete(0)} 
            className="mt-8 px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xl uppercase tracking-widest rounded-2xl shadow-md border-b-[5px] border-amber-700 active:border-b-0 active:translate-y-[5px] transition-all"
          >
            <span className="flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 mr-2" /> I Understand
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
</file>

<file path="src/utils/aiGrader.js">
// Pointing to your live Vercel Production deployment!
const API_BASE_URL = 'https://y8-science-backend.vercel.app/api';

export const gradeShortAnswer = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeShortQA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to grade short answer:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const gradeDiagram = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeDiagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade diagram:", error);
    throw error;
  }
};

// NEW: Added the Essay grading endpoint!
export const gradeEssay = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeEssay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade essay:", error);
    throw error;
  }
};
</file>

<file path="src/utils/sound.js">
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let activeNodes = [];

export const playChime = (type) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  // Anti-Spam: Instantly kill any currently playing sound effects
  activeNodes.forEach(node => {
    try { node.stop(); node.disconnect(); } catch (e) { }
  });
  activeNodes = [];

  const playTone = (freq, startTime, duration, waveType = 'sine') => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Smooth envelope to make it sound like a bell/marimba (no harsh clicks)
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    activeNodes.push(osc);
  };

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    // Pleasant, bright "Ding-Ding" (C5 -> E5)
    playTone(523.25, now, 0.4); 
    playTone(659.25, now + 0.12, 0.6); 
  } else {
    // Soft, dull "Bloop" (Low F)
    playTone(174.61, now, 0.3, 'sine');
  }
};
</file>

<file path="tailwind.config.js">
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
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

<file path="package.json">
{
  "name": "dashboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist -a",
    "sync-audio": "python generate_all_audio.py"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.105.3",
    "katex": "^0.17.0",
    "lucide-react": "^1.14.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-katex": "^3.1.0",
    "react-router-dom": "^7.15.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "gh-pages": "^6.3.0",
    "globals": "^17.5.0",
    "postcss": "^8.5.14",
    "tailwindcss": "^3.4.15",
    "vite": "^8.0.10"
  }
}
</file>

<file path="src/utils/supabaseClient.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TRACK_REGISTRY } from '../components/trackRegistry';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const getGlobalGameLeaderboard = async (unitId, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('id, raw_user_meta_data, email, progress, updated_at');
      
    if (error) throw error;

    let parsedScores = [];
    
    data.forEach(student => {
      const name = student.raw_user_meta_data?.name || student.email?.split('@')[0] || 'Unknown Agent';
      let maxScore = 0;
      
      TRACK_REGISTRY.forEach(trackObj => {
        const track = trackObj.id;
        if (student.progress?.[track]?.[unitId]?.p12?.current) {
          maxScore = Math.max(maxScore, student.progress[track][unitId].p12.current);
        }
      });

      if (maxScore > 0) {
        parsedScores.push({ 
          id: student.id,
          name, 
          score: maxScore,
          date: student.updated_at ? new Date(student.updated_at).toLocaleDateString() : 'N/A'
        });
      }
    });

    parsedScores.sort((a, b) => b.score - a.score);
    return { data: parsedScores.slice(0, limit), error: null };
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

<file path="vite.config.js">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/',
  build: {
    rollupOptions: {
      output: {
        // This splits your heavy libraries into a separate file called 'vendor'
        // Browsers can cache this file, making your app load faster for students!
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Optional: Increases the limit slightly just to be safe
    chunkSizeWarningLimit: 800,
  },
})
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
