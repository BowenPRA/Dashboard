import React, { useState, useRef } from 'react';

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