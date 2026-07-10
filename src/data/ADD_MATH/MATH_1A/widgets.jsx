import React, { useState, useMemo } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

const COMPOUND_STAGES = [
  { name: "Annually", n: 1 },
  { name: "Semi-Annually", n: 2 },
  { name: "Quarterly", n: 4 },
  { name: "Monthly", n: 12 },
  { name: "Weekly", n: 52 },
  { name: "Daily", n: 365 },
  { name: "Continuously", n: 1000000, label: "∞" }
];

export const CompoundWidget = () => {
  const [index, setIndex] = useState(0);
  
  const stage = COMPOUND_STAGES[index];
  const euler = 2.718281828;
  const finalValue = Math.pow(1 + 1 / stage.n, stage.n);
  
  const viewBoxWidth = 1000;
  const viewBoxHeight = 500;
  
  const padding = { top: 60, right: 100, bottom: 60, left: 100 };
  const graphWidth = viewBoxWidth - padding.left - padding.right;
  const graphHeight = viewBoxHeight - padding.top - padding.bottom;
  
  const xMin = 0;
  const xMax = 1; 
  const yMin = 0.8; 
  const yMax = 3.0; 
  
  const mapX = (t) => padding.left + ((t - xMin) / (xMax - xMin)) * graphWidth;
  const mapY = (v) => padding.top + graphHeight - ((v - yMin) / (yMax - yMin)) * graphHeight;

  const yEuler = mapY(euler);
  
  const generateStairs = () => {
    if (stage.n > 365) return ""; 
    
    let path = `M ${mapX(0)} ${mapY(1.0)}`;
    let currentVal = 1.0;
    const rate = 1.0; 
    const stepTime = 1 / stage.n;
    
    for (let i = 1; i <= stage.n; i++) {
      const t = i * stepTime;
      path += ` L ${mapX(t)} ${mapY(currentVal)}`;
      currentVal = currentVal * (1 + rate / stage.n);
      path += ` L ${mapX(t)} ${mapY(currentVal)}`;
    }
    return path;
  };

  const renderNodes = () => {
    if (stage.n > 12) return null; 
    
    const nodes = [];
    let currentVal = 1.0;
    const rate = 1.0;
    const stepTime = 1 / stage.n;

    nodes.push(
      <circle key="node-start" cx={mapX(0)} cy={mapY(1.0)} r="6" fill="#c084fc" stroke="#fff" strokeWidth="2" className="drop-shadow-sm" />
    );

    for (let i = 1; i <= stage.n; i++) {
      const t = i * stepTime;
      currentVal = currentVal * (1 + rate / stage.n);
      nodes.push(
        <circle key={`node-${i}`} cx={mapX(t)} cy={mapY(currentVal)} r="6" fill="#c084fc" stroke="#fff" strokeWidth="2" className="drop-shadow-md z-10" />
      );
    }
    return nodes;
  };

  const generateSmoothCurve = () => {
    let path = `M ${mapX(0)} ${mapY(1.0)}`;
    const steps = 100;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const v = Math.pow(euler, t); 
      path += ` L ${mapX(t)} ${mapY(v)}`;
    }
    return path;
  };

  const yTicks = [1.0, 1.5, 2.0, 2.5, 3.0];
  const xTicks = [
    { val: 0, label: "Start" },
    { val: 0.25, label: "3 Mo" },
    { val: 0.5, label: "6 Mo" },
    { val: 0.75, label: "9 Mo" },
    { val: 1.0, label: "1 Year" }
  ];

  return (
    <div className="w-full h-full flex flex-col font-sans select-none">
      
      <div className="flex-1 w-full bg-slate-900 rounded-3xl sm:rounded-[2rem] border-4 border-slate-800 shadow-inner relative flex flex-col p-4 sm:p-6 overflow-hidden min-h-[300px]">
        
        <div className="flex justify-between items-start z-10 relative">
          <div>
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center mb-1">
              <TrendingUp className="w-4 h-4 mr-1.5 text-purple-400" /> Valuation Over 1 Year
            </h3>
            <div className="text-3xl sm:text-5xl font-black text-white font-mono drop-shadow-md transition-all">
              {finalValue.toFixed(5)}
            </div>
          </div>
          <div className="text-right">
             <span className="bg-[#1cb0f6]/10 text-[#1cb0f6] border border-[#1cb0f6]/30 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest inline-block shadow-sm">
                Limit Base (e): 2.71828
             </span>
          </div>
        </div>

        <div className="flex-1 w-full relative mt-4">
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            
            {yTicks.map(val => (
              <g key={`grid-y-${val}`}>
                <line x1={padding.left} y1={mapY(val)} x2={viewBoxWidth - padding.right} y2={mapY(val)} stroke="currentColor" className="text-slate-700/50" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x={padding.left - 16} y={mapY(val) + 5} textAnchor="end" className="fill-slate-500 font-mono text-[16px] font-bold">
                  {val.toFixed(2)}
                </text>
              </g>
            ))}

            {xTicks.map(tick => (
              <g key={`grid-x-${tick.val}`}>
                <line x1={mapX(tick.val)} y1={padding.top} x2={mapX(tick.val)} y2={viewBoxHeight - padding.bottom} stroke="currentColor" className="text-slate-700/50" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1={mapX(tick.val)} y1={viewBoxHeight - padding.bottom} x2={mapX(tick.val)} y2={viewBoxHeight - padding.bottom + 8} stroke="currentColor" className="text-slate-500" strokeWidth="2" />
                <text x={mapX(tick.val)} y={viewBoxHeight - padding.bottom + 28} textAnchor="middle" className="fill-slate-400 text-[14px] font-black tracking-widest uppercase">
                  {tick.label}
                </text>
              </g>
            ))}
            
            <line x1={padding.left} y1={viewBoxHeight - padding.bottom} x2={viewBoxWidth - padding.right} y2={viewBoxHeight - padding.bottom} stroke="currentColor" className="text-slate-500" strokeWidth="3" strokeLinecap="round" />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={viewBoxHeight - padding.bottom} stroke="currentColor" className="text-slate-500" strokeWidth="3" strokeLinecap="round" />
            
            <line x1={padding.left} y1={yEuler} x2={viewBoxWidth - padding.right} y2={yEuler} stroke="#1cb0f6" strokeWidth="3" strokeDasharray="8 6" opacity="0.9" />
            <text x={padding.left + 16} y={yEuler - 14} fill="#1cb0f6" fontSize="16" fontWeight="bold" fontFamily="monospace">Limit Asymptote (e)</text>

            <path d={generateSmoothCurve()} fill="none" stroke="#10b981" strokeWidth="4" opacity="0.25" strokeLinecap="round" />

            {stage.n <= 365 ? (
              <>
                <path 
                  d={generateStairs()} 
                  fill="none" 
                  stroke="#c084fc" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_10px_rgba(192,132,252,0.4)] transition-all duration-300" 
                />
                {renderNodes()}
              </>
            ) : (
              <path 
                d={generateSmoothCurve()} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" 
              />
            )}
            
            <circle 
              cx={mapX(1.0)} 
              cy={mapY(finalValue)} 
              r="10" 
              fill={stage.n > 365 ? "#10b981" : "#c084fc"} 
              stroke="#fff" 
              strokeWidth="3" 
              className="drop-shadow-xl"
            />
          </svg>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-3 z-20 flex-shrink-0">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-4">
          <div className="w-full sm:w-1/3 shrink-0">
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              Interval Frequency
            </span>
            <span className={`text-xl sm:text-2xl font-black ${stage.n > 365 ? 'text-[#10b981]' : 'text-slate-700 dark:text-slate-200'}`}>
               {stage.name}
            </span>
          </div>

          <div className="w-full sm:w-2/3 flex justify-end overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 px-4 py-3 sm:px-5 sm:py-3 rounded-xl shadow-inner flex items-center max-w-full overflow-x-auto custom-scrollbar">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mr-4 hidden sm:block shrink-0">Model:</span>
              
              <div className="flex items-center flex-nowrap whitespace-nowrap shrink-0 text-slate-700 dark:text-slate-100 font-mono text-xl sm:text-2xl font-black">
                <span className="mr-2">1.00 &times; ( 1 + </span>
                <div className="flex flex-col items-center justify-center text-base mx-1 shrink-0">
                  <span className="border-b-2 border-slate-400 leading-[0.8] w-full text-center">1</span>
                  <span className={`leading-[1.1] font-bold ${stage.n > 365 ? 'text-[#10b981]' : 'text-purple-500'}`}>{stage.label || stage.n.toLocaleString()}</span>
                </div>
                <span className="ml-1">)</span>
                <sup className={`text-sm -mt-5 ml-1 font-bold ${stage.n > 365 ? 'text-[#10b981]' : 'text-purple-500'}`}>
                  {stage.label || stage.n.toLocaleString()}
                </sup>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-2 px-1">
          <input 
            type="range" 
            min="0" 
            max={COMPOUND_STAGES.length - 1} 
            step="1"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
            className={`w-full h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer transition-all z-10 relative
              ${stage.n > 365 ? 'accent-[#10b981]' : 'accent-purple-500 hover:accent-purple-400'}`}
          />
          <div className="flex justify-between mt-4 px-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
             <span className="text-slate-400 flex items-center">Discrete Steps <ArrowRight className="w-3 h-3 ml-1.5 opacity-50" /></span>
             <span className="text-[#10b981]">Continuous Function (e)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExponentialExplorerWidget = () => {
  const [a, setA] = useState(1);
  const [k, setK] = useState(1);
  const [c, setC] = useState(0);

  const xMin = -4, xMax = 4;
  const yMin = -10, yMax = 15;
  const width = 600, height = 350;

  const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const mapY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const pathData = useMemo(() => {
    const pts = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * ((xMax - xMin) / steps);
      const y = a * Math.exp(k * x) + c;
      pts.push(`${mapX(x)},${mapY(Math.max(yMin - 10, Math.min(yMax + 10, y)))}`);
    }
    return pts.length ? `M ${pts.join(' L ')}` : '';
  }, [a, k, c]);

  const formatEqJSX = () => {
    const signC = c > 0 ? ` + ${c}` : c < 0 ? ` - ${Math.abs(c)}` : '';
    const aStr = a === 1 ? '' : a === -1 ? '-' : a;
    const kStr = k === 1 ? 'x' : k === -1 ? '-x' : `${k}x`;
    
    if (a === 0) return <span>y = {c}</span>;
    if (k === 0) return <span>y = {a + c}</span>;
    
    return (
      <span>
        y = {aStr}e<sup className="-mt-1 ml-[1px] text-[0.85em] font-bold">{kStr}</sup>{signC}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col items-center select-none touch-none max-w-2xl mx-auto">
      
      <div className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] overflow-hidden relative shadow-inner mb-4 min-h-[250px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-sm" preserveAspectRatio="none">
          <defs>
            <clipPath id="graphClipExplorer">
              <rect x="0" y="0" width={width} height={height} />
            </clipPath>
          </defs>
          
          {/* Grid lines */}
          {[...Array(9)].map((_, i) => (
             <line key={`v-${i}`} x1={mapX(xMin + i)} y1={0} x2={mapX(xMin + i)} y2={height} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />
          ))}
          {[...Array(6)].map((_, i) => (
             <line key={`h-${i}`} x1={0} y1={mapY(-10 + i * 5)} x2={width} y2={mapY(-10 + i * 5)} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1.5" strokeDasharray="4 4" />
          ))}

          {/* Axes */}
          <line x1="0" y1={mapY(0)} x2={width} y2={mapY(0)} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />
          <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={height} stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2" />

          {/* Asymptote (y = C) */}
          <line x1="0" y1={mapY(c)} x2={width} y2={mapY(c)} stroke="#f43f5e" strokeWidth="3" strokeDasharray="8 6" opacity="0.8" />
          <text x={width - 15} y={mapY(c) - 10} textAnchor="end" fill="#f43f5e" className="font-mono font-bold text-sm">Asymptote y = {c}</text>

          {/* Exponential Curve (Clipped) */}
          <g clipPath="url(#graphClipExplorer)">
            <path d={pathData} fill="none" stroke="#1cb0f6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Y-Intercept Tracer */}
          <line x1={mapX(0)} y1={mapY(a + c)} x2={mapX(0) + 30} y2={mapY(a + c)} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx={mapX(0)} cy={mapY(a + c)} r="7" fill="#f59e0b" stroke="#fff" strokeWidth="2" className="drop-shadow-md" />
          
          <rect x={mapX(0) + 15} y={mapY(a + c) - 12} width="105" height="24" rx="6" fill="#f59e0b" className="drop-shadow-sm" />
          <text x={mapX(0) + 22} y={mapY(a + c) + 4} fill="white" className="font-mono font-bold text-xs tracking-wide">Root: (0, {a + c})</text>
        </svg>

        {/* Dynamic Equation Readout */}
        <div className="absolute top-4 right-4 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl border-2 border-slate-700/50 dark:border-slate-200/50 shadow-lg font-mono text-base sm:text-lg font-black text-white dark:text-slate-900 flex items-center">
           <span className="opacity-60 mr-2 uppercase tracking-widest text-[10px] sm:text-xs">Function</span>
           {formatEqJSX()}
        </div>
      </div>

      {/* Control Dashboard */}
      <div className="w-full space-y-4 bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-sm">
        
        {/* Stretch Coefficient (A) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/20 px-3 sm:px-4 py-1.5 rounded-xl w-36 sm:w-48 shrink-0 shadow-inner">
             <span className="text-[10px] sm:text-xs font-black uppercase text-[#1899d6] tracking-widest block">A (Initial/Stretch)</span>
             <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 font-mono">{a.toFixed(1)}</span>
          </div>
          <input type="range" min="-5" max="5" step="0.5" value={a} onChange={e => setA(parseFloat(e.target.value))} className="flex-1 h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#1cb0f6]" />
        </div>

        {/* Rate (k) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-[#f59e0b]/10 border-2 border-[#f59e0b]/20 px-3 sm:px-4 py-1.5 rounded-xl w-36 sm:w-48 shrink-0 shadow-inner">
             <span className="text-[10px] sm:text-xs font-black uppercase text-[#d97706] tracking-widest block">k (Growth Rate)</span>
             <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 font-mono">{k.toFixed(1)}</span>
          </div>
          <input type="range" min="-3" max="3" step="0.1" value={k} onChange={e => setK(parseFloat(e.target.value))} className="flex-1 h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#f59e0b]" />
        </div>

        {/* Constant Shift (C) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-[#f43f5e]/10 border-2 border-[#f43f5e]/20 px-3 sm:px-4 py-1.5 rounded-xl w-36 sm:w-48 shrink-0 shadow-inner">
             <span className="text-[10px] sm:text-xs font-black uppercase text-[#e11d48] tracking-widest block">C (Asymptote)</span>
             <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 font-mono">{c.toFixed(1)}</span>
          </div>
          <input type="range" min="-10" max="10" step="1" value={c} onChange={e => setC(parseFloat(e.target.value))} className="flex-1 h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#f43f5e]" />
        </div>

      </div>
    </div>
  );
}