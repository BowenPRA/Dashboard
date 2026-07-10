This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

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
- Only files matching these patterns are included: src/data/ADD_MATH/**/*.js, src/data/Y8/SCIENCE_1A/**/*.js, src/components/math/MathGraph.jsx, src/components/WidgetRenderer.jsx
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/components/math/MathGraph.jsx
src/components/WidgetRenderer.jsx
src/data/ADD_MATH/MATH_1A/assessment.js
src/data/ADD_MATH/MATH_1A/data.js
src/data/ADD_MATH/MATH_1A/diagrams.js
src/data/ADD_MATH/MATH_1A/games.js
src/data/ADD_MATH/MATH_1A/notes.js
src/data/ADD_MATH/MATH_1A/workbook.js
src/data/ADD_MATH/SCIENCE_1A/assessment.js
src/data/ADD_MATH/SCIENCE_1A/data.js
src/data/ADD_MATH/SCIENCE_1A/diagrams.js
src/data/ADD_MATH/SCIENCE_1A/games.js
src/data/ADD_MATH/SCIENCE_1A/notes.js
src/data/ADD_MATH/SCIENCE_1A/workbook.js
src/data/Y8/SCIENCE_1A/assessment.js
src/data/Y8/SCIENCE_1A/data.js
src/data/Y8/SCIENCE_1A/diagrams.js
src/data/Y8/SCIENCE_1A/games.js
src/data/Y8/SCIENCE_1A/notes.js
src/data/Y8/SCIENCE_1A/workbook.js
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

<file path="src/data/ADD_MATH/MATH_1A/assessment.js">
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

<file path="src/data/ADD_MATH/MATH_1A/data.js">
import { notes } from './notes.js';

export const ADD_MATH_1A_DATA = {
  meta: {
    id: "MATH_1A",
    title: "Exponential Growth",
    desc: "Discover Euler's number, continuous compounding, and the power of e.",
    track: "ADD_MATH",
    icon: "Calculator",
    themeColor: "bg-cyan-500 border-cyan-700"
  },
  phases: [
    {
      id: "concept",
      title: "Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 10,
      tasks: [
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 40,
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
        { id: "GAMES", dbKey: "p12", maxXP: 20 }
      ]
    }
  ],
  // Scaffold empty arrays for the tasks until we build them out
  realWords: [
    { word: "Constant", vn: "Hằng số", def: "A fixed value.", vnDef: "Một giá trị cố định.", sent: "The value of e is a mathematical constant.", vnSent: "Giá trị của e là một hằng số toán học.", isReal: true },
    { word: "Compound", vn: "Kép / Ghép", def: "To calculate interest on previously accumulated interest.", vnDef: "Tính lãi trên số tiền lãi đã tích lũy trước đó.", sent: "Continuous compounding uses the constant e.", vnSent: "Lãi kép liên tục sử dụng hằng số e.", isReal: true }
  ],
  shortQA: [],
  assessment: { questions: [] },
  games: { gameConfig: { mapId: 'WAVE', lives: 20, bannedTowers: [] } },
  notes
};
</file>

<file path="src/data/ADD_MATH/MATH_1A/diagrams.js">
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

<file path="src/data/ADD_MATH/MATH_1A/games.js">
// Example for Y8/MATH_1A/games.js
export const games = {
  gameConfig: {
    bannedTowers: [], 
    lives: 20,
    mapId: 'STRAIGHT' // Use 'STRAIGHT' for the Science unit
  }
};
</file>

<file path="src/data/ADD_MATH/MATH_1A/notes.js">
// src/data/ADD_MATH/MATH_1A/notes.js
import { CompoundWidget, ExponentialExplorerWidget } from './widgets.jsx';

export const notes = [
  {
    type: "intro",
    title: "Exponential Growth & Euler's Number",
    titleVn: "Sự Tăng Trưởng Mũ & Số Euler",
    subtitle: "From discrete compound interest to the calculus of continuous growth.",
    subtitleVn: "Từ lãi kép rời rạc đến vi tích phân của sự tăng trưởng liên tục.",
    color: "bg-[#06b6d4]", 
    borderColor: "border-[#0891b2]",
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Discrete Compound Growth",
    titleVn: "Tăng trưởng Kép Rời rạc",
    icon: "Target",
    color: "bg-[#0ea5e9]",
    content: "Exponential growth begins with simple, discrete intervals.\n\nImagine investing 1 dollar into an account at an annual interest rate of 100%. If the institution pays interest exactly once at the end of the year, you receive your original principal back, plus 1 dollar in interest.\n\n> **Simple Interest:** Calculates the mathematical return exactly once per defined period.",
    contentVn: "Sự tăng trưởng mũ bắt đầu bằng những khoảng thời gian rời rạc, đơn giản.\n\nHãy tưởng tượng bạn đầu tư 1 đô la vào một tài khoản với lãi suất hàng năm là 100%. Nếu tổ chức trả lãi đúng một lần vào cuối năm, bạn sẽ nhận lại tiền gốc ban đầu, cộng thêm 1 đô la tiền lãi.\n\n> **Lãi đơn:** Tính toán lợi nhuận toán học chính xác một lần cho mỗi kỳ hạn được xác định.",
    spoken: "Exponential growth begins with simple, discrete intervals. Imagine investing 1 dollar into an account at an annual interest rate of 100 percent. If the institution pays interest exactly once at the end of the year, you receive your original principal back, plus one dollar in interest. Simple interest calculates the mathematical return exactly once per defined period.",
    exampleLabel: "The Standard Formula",
    exampleLabelVn: "Công thức Tiêu chuẩn",
    example: "Using the discrete compound interest formula:\n$$A = P(1 + r)^n$$\nWhere $P$ is the principal (1), $r$ is the rate (100%, or 1), and $n$ is the frequency of compounding (1).\n$$A = 1(1 + 1)^1 = 2.00$$",
    exampleVn: "Sử dụng công thức tính lãi kép rời rạc:\n$$A = P(1 + r)^n$$\nTrong đó $P$ là tiền gốc (1), $r$ là tỷ lệ (100%, hoặc 1), và $n$ là tần suất tính lãi (1).\n$$A = 1(1 + 1)^1 = 2.00$$",
    spokenExample: "Using the discrete compound interest formula: A equals P times, open parenthesis, 1 plus r, close parenthesis, to the power of n. Where P is the principal, 1. r is the rate, 1. And n is the frequency, 1. The final amount A equals 2.00.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Increasing Compounding Frequency",
    titleVn: "Tăng Tần suất Tính Lãi kép",
    icon: "Target",
    color: "bg-[#0ea5e9]",
    content: "What occurs if the interest is calculated more frequently?\n\nIf the return is paid **twice a year**, you earn 50% after six months, yielding a total of 1.50. In the second half of the year, you earn another 50%—but this time it is calculated on your *new* total of 1.50.\n\n> **Compound Interest:** The accrued interest begins earning its own interest, mathematically accelerating the overall growth rate.",
    contentVn: "Điều gì xảy ra nếu tiền lãi được tính thường xuyên hơn?\n\nNếu lợi nhuận được trả **hai lần một năm**, bạn kiếm được 50% sau sáu tháng, mang lại tổng cộng là 1.50. Trong nửa cuối năm, bạn kiếm thêm 50%—nhưng lần này nó được tính trên tổng số *mới* của bạn là 1.50.\n\n> **Lãi kép:** Tiền lãi tích lũy bắt đầu sinh ra tiền lãi của chính nó, làm tăng tốc độ tăng trưởng tổng thể một cách toán học.",
    spoken: "What occurs if the interest is calculated more frequently? If the return is paid twice a year, you earn 50 percent after six months, yielding a total of 1.50. In the second half of the year, you earn another 50 percent—but this time it is calculated on your new total of 1.50. Compound interest dictates that the accrued interest begins earning its own interest, mathematically accelerating the overall growth rate.",
    exampleLabel: "Semi-Annual Compounding",
    exampleLabelVn: "Tính Lãi kép Nửa năm",
    example: "First half of the year:\n$1.00 \\times (1 + 0.5) = 1.50$\n\nSecond half of the year:\n$1.50 \\times (1 + 0.5) = \\mathbf{2.25}$\n\nThe total value increases simply because the compounding frequency ($n$) was raised from 1 to 2.",
    exampleVn: "Nửa đầu năm:\n$1.00 \\times (1 + 0.5) = 1.50$\n\nNửa cuối năm:\n$1.50 \\times (1 + 0.5) = \\mathbf{2.25}$\n\nTổng giá trị tăng lên đơn giản vì tần suất tính lãi ($n$) được tăng từ 1 lên 2.",
    spokenExample: "First half of the year: 1.00 times 1.5 equals 1.50. Second half of the year: 1.50 times 1.5 equals 2.25. The total value increases simply because the compounding frequency, n, was raised from 1 to 2.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_3.mp3"
  },
  {
    type: "concept",
    title: "The Limit of Continuous Compounding",
    titleVn: "Giới hạn của Lãi kép Liên tục",
    icon: "BookOpen",
    color: "bg-[#8b5cf6]",
    content: "If compounding semi-annually yields more growth, what occurs when we compound monthly, daily, or every millisecond?\n\nAs the number of intervals ($n$) approaches infinity, the fraction of interest awarded per interval ($1/n$) becomes infinitely small.\n\n$$A = \\left(1 + \\frac{1}{n}\\right)^n$$\n\nObserve the data table. Does the value expand to infinity?\n\n> **The Asymptote:** The growth does not continue infinitely. It experiences diminishing returns and converges upon a strict mathematical limit.",
    contentVn: "Nếu tính lãi nửa năm mang lại nhiều sự tăng trưởng hơn, điều gì xảy ra khi chúng ta tính lãi hàng tháng, hàng ngày, hoặc mỗi mili giây?\n\nKhi số khoảng thời gian ($n$) tiến đến vô cực, phần tiền lãi được thưởng cho mỗi khoảng ($1/n$) trở nên nhỏ bé vô hạn.\n\n$$A = \\left(1 + \\frac{1}{n}\\right)^n$$\n\nHãy quan sát bảng dữ liệu. Có phải giá trị mở rộng đến vô cực không?\n\n> **Đường tiệm cận:** Sự tăng trưởng không tiếp tục vô hạn. Nó trải qua sự sụt giảm lợi nhuận biên và hội tụ tại một giới hạn toán học nghiêm ngặt.",
    spoken: "If compounding semi-annually yields more growth, what occurs when we compound monthly, daily, or every millisecond? As the number of intervals, n, approaches infinity, the fraction of interest awarded per interval becomes infinitely small. Observe the data table. Does the value expand to infinity? No. It experiences diminishing returns and converges upon a strict mathematical limit.",
    drawThis: false,
    inlineSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" class="w-full h-full drop-shadow-md">
      <rect x="20" y="20" width="460" height="310" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="3"/>
      
      <rect x="20" y="20" width="460" height="50" rx="16" fill="#8b5cf6"/>
      <rect x="20" y="50" width="460" height="20" fill="#8b5cf6"/>
      
      <text x="40" y="52" font-family="sans-serif" font-weight="900" font-size="16" fill="white">Frequency</text>
      <text x="250" y="52" font-family="sans-serif" font-weight="900" font-size="16" fill="white" text-anchor="middle">Periods (n)</text>
      <text x="460" y="52" font-family="sans-serif" font-weight="900" font-size="16" fill="white" text-anchor="end">Final Value</text>
      
      <rect x="20" y="70" width="460" height="40" fill="#ffffff"/>
      <text x="40" y="95" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Annually</text>
      <text x="250" y="95" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">1</text>
      <text x="460" y="95" font-family="monospace" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="end">2.00000</text>
      
      <rect x="20" y="110" width="460" height="40" fill="#f1f5f9"/>
      <text x="40" y="135" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Semi-Annually</text>
      <text x="250" y="135" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">2</text>
      <text x="460" y="135" font-family="monospace" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="end">2.25000</text>
      
      <rect x="20" y="150" width="460" height="40" fill="#ffffff"/>
      <text x="40" y="175" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Monthly</text>
      <text x="250" y="175" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">12</text>
      <text x="460" y="175" font-family="monospace" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="end">2.61304</text>
      
      <rect x="20" y="190" width="460" height="40" fill="#f1f5f9"/>
      <text x="40" y="215" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Daily</text>
      <text x="250" y="215" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">365</text>
      <text x="460" y="215" font-family="monospace" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="end">2.71457</text>
      
      <rect x="20" y="230" width="460" height="40" fill="#ffffff"/>
      <text x="40" y="255" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Hourly</text>
      <text x="250" y="255" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">8,760</text>
      <text x="460" y="255" font-family="monospace" font-weight="bold" font-size="14" fill="#0284c7" text-anchor="end">2.71813</text>
      
      <rect x="20" y="270" width="460" height="40" fill="#f1f5f9"/>
      <text x="40" y="295" font-family="sans-serif" font-weight="bold" font-size="14" fill="#475569">Secondly</text>
      <text x="250" y="295" font-family="monospace" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">31,536,000</text>
      <text x="460" y="295" font-family="monospace" font-weight="bold" font-size="16" fill="#8b5cf6" text-anchor="end">2.71828</text>
      
      <rect x="380" y="275" width="90" height="30" fill="none" stroke="#8b5cf6" stroke-width="3" rx="4"/>
    </svg>`,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_4.mp3"
  },
  {
    type: "concept",
    title: "Discrete vs. Continuous Growth",
    titleVn: "Tăng trưởng Rời rạc so với Liên tục",
    icon: "Target",
    color: "bg-[#8b5cf6]",
    content: "Use the slider to increase the compounding frequency ($n$). \n\nObserve how the discrete \"steps\" in value become progressively smaller and more frequent. Eventually, the discontinuous function smooths out entirely.\n\n> **Continuous Growth:** When a rate is applied continuously across infinitely small fractions of time, the discrete sequence resolves into a continuous exponential curve.",
    contentVn: "Sử dụng thanh trượt để tăng tần suất tính lãi kép ($n$). \n\nQuan sát cách các \"bước nhảy\" rời rạc trong giá trị trở nên nhỏ dần và thường xuyên hơn. Cuối cùng, hàm gián đoạn nhẵn mịn hoàn toàn.\n\n> **Tăng trưởng Liên tục:** Khi một tỷ lệ được áp dụng liên tục trên các khoảng thời gian nhỏ vô hạn, chuỗi rời rạc biến đổi thành một đường cong hàm mũ liên tục.",
    spoken: "Use the slider to increase the compounding frequency. Observe how the discrete steps in value become progressively smaller and more frequent. Eventually, the discontinuous function smooths out entirely. When a rate is applied continuously across infinitely small fractions of time, the discrete sequence resolves into a continuous exponential curve.",
    drawThis: false,
    widget: CompoundWidget,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_5.mp3"
  },
  {
    type: "concept",
    title: "Euler's Number, e",
    titleVn: "Số Euler, e",
    icon: "ShieldCheck",
    color: "bg-[#ec4899]",
    content: "Transitioning from Monthly to Daily compounding yields a minimal increase. Transitioning from Hourly to Secondly yields a microscopic fraction of a difference.\n\nThis absolute maximum boundary is **Euler's Number** ($e$), formally defined in calculus as the limit as $n$ approaches infinity.\n\n> **Euler's Number ($e$):** The mathematical constant representing the fundamental limit of continuous growth. It is an irrational number, approximately $2.71828$.",
    contentVn: "Việc chuyển đổi từ tính lãi Hàng tháng sang Hàng ngày mang lại mức tăng tối thiểu. Chuyển đổi từ Hàng giờ sang Hàng giây mang lại sự khác biệt vi mô.\n\nRanh giới tối đa tuyệt đối này là **Số Euler** ($e$), được định nghĩa chính thức trong vi tích phân là giới hạn khi $n$ tiến đến vô cực.\n\n> **Số Euler ($e$):** Hằng số toán học đại diện cho giới hạn cơ bản của sự tăng trưởng liên tục. Nó là một số vô tỉ, xấp xỉ $2.71828$.",
    spoken: "Transitioning from Monthly to Daily compounding yields a minimal increase. Transitioning from Hourly to Secondly yields a microscopic fraction of a difference. This absolute maximum boundary is Euler's Number, denoted as e. It is formally defined in calculus as the limit as n approaches infinity. It is an irrational number, approximately 2.71828.",
    exampleLabel: "The Limit Definition of e",
    exampleLabelVn: "Định nghĩa Giới hạn của e",
    example: "$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$$\n\nBecause $e$ is an irrational constant similar to $\\pi$, its decimal expansion continues infinitely without repetition:\n$e \\approx 2.718281828459...$",
    exampleVn: "$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$$\n\nBởi vì $e$ là một hằng số vô tỉ tương tự như $\\pi$, phần thập phân của nó kéo dài vô hạn mà không lặp lại:\n$e \\approx 2.718281828459...$",
    spokenExample: "Euler's Number is formally defined as the limit as n approaches infinity of, open parenthesis, 1 plus 1 over n, close parenthesis, to the power of n. Because e is an irrational constant similar to pi, its decimal expansion continues infinitely without repetition.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_6.mp3"
  },
  {
    type: "concept",
    title: "The Natural Exponential Function",
    titleVn: "Hàm số Mũ Tự nhiên",
    icon: "Activity",
    color: "bg-[#f59e0b]",
    content: "Because $e$ perfectly encapsulates continuous compounding, it serves as the base for the natural exponential function: **$f(x) = e^x$**.\n\nUnlike linear equations, an exponential function models relationships where the rate of change is directly proportional to the current magnitude.\n\n> **Natural Exponential:** $f(x) = e^x$. As the value of the function increases, its rate of growth accelerates proportionally.",
    contentVn: "Bởi vì $e$ tóm gọn hoàn hảo sự tính lãi liên tục, nó đóng vai trò là cơ số cho hàm số mũ tự nhiên: **$f(x) = e^x$**.\n\nKhông giống như các phương trình tuyến tính, hàm số mũ mô hình hóa các mối quan hệ trong đó tốc độ thay đổi tỷ lệ thuận trực tiếp với độ lớn hiện tại.\n\n> **Hàm Mũ Tự nhiên:** $f(x) = e^x$. Khi giá trị của hàm số tăng lên, tốc độ tăng trưởng của nó tăng tốc theo tỷ lệ tương ứng.",
    spoken: "Because e perfectly encapsulates continuous compounding, it serves as the base for the natural exponential function: f of x equals e to the power of x. Unlike linear equations, an exponential function models relationships where the rate of change is directly proportional to the current magnitude. As the value of the function increases, its rate of growth accelerates proportionally.",
    exampleLabel: "Interactive Graph",
    exampleLabelVn: "Đồ thị Tương tác",
    example: "Adjust the slider to observe the trajectory of $f(x) = e^x$. Notice the rapid vertical acceleration characteristic of exponential growth.",
    exampleVn: "Điều chỉnh thanh trượt để quan sát quỹ đạo của $f(x) = e^x$. Hãy lưu ý gia tốc thẳng đứng nhanh chóng đặc trưng của sự tăng trưởng mũ.",
    spokenExample: "Adjust the slider to observe the trajectory of f of x equals e to the power of x. Notice the rapid vertical acceleration characteristic of exponential growth.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: 'e^x', xRange: [-2, 4], yRange: [-1, 25] } 
    },
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_7.mp3"
  },
  {
    type: "concept",
    title: "The Derivative of eˣ",
    titleVn: "Đạo hàm của eˣ",
    icon: "Scale",
    color: "bg-[#10b981]",
    content: "Euler's number possesses a unique and fundamental property in calculus.\n\nFor the function $f(x) = e^x$, the gradient of the curve at any point is exactly equal to the value of the function at that point.\n\n> **Calculus Principle:** The natural exponential function $f(x) = e^x$ is the **only** function mathematically identical to its own derivative.",
    contentVn: "Số Euler sở hữu một đặc tính độc đáo và cơ bản trong vi tích phân.\n\nĐối với hàm số $f(x) = e^x$, hệ số góc của đường cong tại bất kỳ điểm nào hoàn toàn bằng với giá trị của hàm số tại điểm đó.\n\n> **Nguyên lý Vi tích phân:** Hàm số mũ tự nhiên $f(x) = e^x$ là hàm số **duy nhất** đồng nhất về mặt toán học với chính đạo hàm của nó.",
    spoken: "Euler's number possesses a unique and fundamental property in calculus. For the function f of x equals e to the power of x, the gradient of the curve at any point is exactly equal to the value of the function at that point. The natural exponential function is the only function mathematically identical to its own derivative.",
    exampleLabel: "Calculus Proof",
    exampleLabelVn: "Chứng minh Vi tích phân",
    example: "If $f(x) = e^x$, its derivative evaluates identically:\n$$\\frac{d}{dx} [e^x] = e^x$$\n\nFor instance, at the coordinate $(2, e^2)$:\n* The function's value ($y$) is $e^2$.\n* The gradient (slope) at that coordinate is also precisely $e^2$.",
    exampleVn: "Nếu $f(x) = e^x$, đạo hàm của nó tính ra y hệt:\n$$\\frac{d}{dx} [e^x] = e^x$$\n\nVí dụ, tại tọa độ $(2, e^2)$:\n* Giá trị của hàm số ($y$) là $e^2$.\n* Hệ số góc (độ dốc) tại tọa độ đó cũng chính xác là $e^2$.",
    spokenExample: "If f of x equals e to the power of x, its derivative evaluates identically: the derivative with respect to x of e to the power of x, equals e to the power of x. For instance, at the coordinate where x is 2, the function's value is e squared. The gradient at that coordinate is also precisely e squared.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_8.mp3"
  },
  {
    type: "concept",
    title: "The Natural Logarithm",
    titleVn: "Logarit Tự nhiên",
    icon: "Scale",
    color: "bg-[#0ea5e9]",
    content: "The inverse of the natural exponential function $f(x) = e^x$ is the natural logarithm, denoted as $f(x) = \\ln(x)$.\n\nBecause they operate as inverse functions, they algebraically neutralize one another.\n\n> **Inverse Relationship:** $\\ln(x)$ is the exact mathematical inverse of $e^x$. Geometrically, their graphs are reflections across the line $y = x$.",
    contentVn: "Hàm số ngược của hàm số mũ tự nhiên $f(x) = e^x$ là logarit tự nhiên, ký hiệu là $f(x) = \\ln(x)$.\n\nBởi vì chúng hoạt động như các hàm số ngược, chúng trung hòa lẫn nhau về mặt đại số.\n\n> **Mối quan hệ Nghịch đảo:** $\\ln(x)$ là nghịch đảo toán học chính xác của $e^x$. Về mặt hình học, đồ thị của chúng là sự phản xạ qua đường thẳng $y = x$.",
    spoken: "The inverse of the natural exponential function f of x equals e to the power of x, is the natural logarithm, denoted as f of x equals the natural log of x. Because they operate as inverse functions, they algebraically neutralize one another. The natural logarithm is the exact mathematical inverse of e to the power of x. Geometrically, their graphs are reflections across the line y equals x.",
    exampleLabel: "Properties of y = ln(x)",
    exampleLabelVn: "Tính chất của y = ln(x)",
    example: "1. **Domain:** $\\ln(x)$ is defined strictly for positive values ($x > 0$).\n2. **Root:** The function intersects the $x$-axis exactly at $(1, 0)$.\n3. **Asymptote:** As $x \\to 0$, $f(x) \\to -\\infty$, establishing the $y$-axis as a vertical asymptote.",
    exampleVn: "1. **Tập xác định:** $\\ln(x)$ được định nghĩa nghiêm ngặt cho các giá trị dương ($x > 0$).\n2. **Nghiệm:** Hàm số cắt trục $x$ chính xác tại $(1, 0)$.\n3. **Tiệm cận:** Khi $x \\to 0$, $f(x) \\to -\\infty$, thiết lập trục $y$ làm tiệm cận đứng.",
    spokenExample: "Property 1, Domain. The natural log of x is defined strictly for positive values. Property 2, Root. The function intersects the x-axis exactly at 1, 0. Property 3, Asymptote. As x approaches zero, the function approaches negative infinity, establishing the y-axis as a vertical asymptote.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_9.mp3"
  },
  {
    type: "concept",
    title: "Exponential Decay",
    titleVn: "Sự phân rã Hàm mũ",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "By introducing a constant $k$ into the exponent, the curve's behavior is altered.\n\nWhen the exponent is negative, the graph reflects horizontally, resulting in a rapid downward trajectory.\n\n> **Exponential Decay:** In $f(x) = e^{-x}$, the function approaches the horizontal asymptote $y = 0$ as $x \\to \\infty$.",
    contentVn: "Bằng cách đưa một hằng số $k$ vào số mũ, hành vi của đường cong bị thay đổi.\n\nKhi số mũ âm, đồ thị phản xạ theo chiều ngang, dẫn đến quỹ đạo đi xuống nhanh chóng.\n\n> **Sự phân rã Hàm mũ:** Trong $f(x) = e^{-x}$, hàm số tiến tới tiệm cận ngang $y = 0$ khi $x \\to \\infty$.",
    spoken: "By introducing a constant k into the exponent, the curve's behavior is altered. When the exponent is negative, the graph reflects horizontally, resulting in a rapid downward trajectory. In f of x equals e to the power of negative x, the function approaches the horizontal asymptote y equals zero as x approaches infinity.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: 'e^(-x)', xRange: [-2, 5], yRange: [-1, 10] } 
    }
  },
  {
    type: "concept",
    title: "Transformations: Horizontal Scaling",
    titleVn: "Biến đổi: Kéo giãn Ngang",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "Multiplying the independent variable $x$ by a constant $k$ applies a horizontal scaling transformation.\n\nObserve how $f(x) = e^{2x}$ exhibits a significantly steeper gradient than the standard curve $f(x) = e^x$.\n\n> **Rate Parameter:** A larger constant $k$ in the exponent dictates a more rapid exponential growth rate.",
    contentVn: "Nhân biến độc lập $x$ với một hằng số $k$ sẽ áp dụng phép biến đổi kéo giãn ngang.\n\nQuan sát cách $f(x) = e^{2x}$ thể hiện hệ số góc dốc hơn đáng kể so với đường cong tiêu chuẩn $f(x) = e^x$.\n\n> **Tham số Tỷ lệ:** Một hằng số $k$ lớn hơn trong số mũ quyết định tốc độ tăng trưởng mũ nhanh hơn.",
    spoken: "Multiplying the independent variable x by a constant k applies a horizontal scaling transformation. Observe how f of x equals e to the power of 2x exhibits a significantly steeper gradient than the standard curve. A larger constant k in the exponent dictates a more rapid exponential growth rate.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: 'e^(2*x)', xRange: [-2, 3], yRange: [-1, 20] } 
    }
  },
  {
    type: "concept",
    title: "Transformations: Vertical Stretch",
    titleVn: "Biến đổi: Kéo giãn Dọc",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "Multiplying the entire function by a constant factor $A$ applies a vertical stretch.\n\nThis transformation directly dictates the $y$-intercept, as any non-zero value raised to the power of zero equals 1.\n\n> **Initial Value:** For the function $f(x) = 3e^x$, the $y$-intercept is $(0, 3)$ because $3e^0 = 3$.",
    contentVn: "Nhân toàn bộ hàm số với một hệ số không đổi $A$ sẽ áp dụng phép kéo giãn dọc.\n\nPhép biến đổi này trực tiếp quyết định giao điểm với trục $y$, vì bất kỳ giá trị khác không nào lũy thừa không đều bằng 1.\n\n> **Giá trị Ban đầu:** Đối với hàm số $f(x) = 3e^x$, giao điểm trục $y$ là $(0, 3)$ vì $3e^0 = 3$.",
    spoken: "Multiplying the entire function by a constant factor A applies a vertical stretch. This transformation directly dictates the y-intercept, as any non-zero value raised to the power of zero equals 1. For the function f of x equals 3 times e to the power of x, the y-intercept is 0, 3 because 3 times e to the power of 0 equals 3.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: '3*e^(x)', xRange: [-3, 3], yRange: [-2, 15] } 
    }
  },
  {
    type: "concept",
    title: "Transformations: Vertical Translation",
    titleVn: "Biến đổi: Tịnh tiến Dọc",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "Adding or subtracting a constant $C$ outside the exponent applies a vertical translation to the entire graph.\n\nBecause exponential functions operate above a baseline asymptote, this translation shifts that boundary.\n\n> **Asymptote Shift:** In $f(x) = e^x - 5$, the horizontal asymptote is translated downwards from $y = 0$ to $y = -5$.",
    contentVn: "Cộng hoặc trừ một hằng số $C$ bên ngoài số mũ sẽ áp dụng phép tịnh tiến dọc cho toàn bộ đồ thị.\n\nVì các hàm số mũ hoạt động phía trên một đường tiệm cận cơ sở, phép tịnh tiến này sẽ dịch chuyển ranh giới đó.\n\n> **Dịch chuyển Tiệm cận:** Trong $f(x) = e^x - 5$, đường tiệm cận ngang được tịnh tiến xuống dưới từ $y = 0$ đến $y = -5$.",
    spoken: "Adding or subtracting a constant C outside the exponent applies a vertical translation to the entire graph. Because exponential functions operate above a baseline asymptote, this translation shifts that boundary. In f of x equals e to the power of x minus 5, the horizontal asymptote is translated downwards from y equals 0 to y equals negative 5.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: 'e^(x) - 5', xRange: [-3, 4], yRange: [-7, 10] } 
    }
  },
  {
    type: "concept",
    title: "Combined Transformations",
    titleVn: "Biến đổi Kết hợp",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "We can synthesize these principles into a combined transformation: **$f(x) = 3e^{-0.5x} - 2$**.\n\n* **Asymptote:** Translated downwards to $y = -2$.\n* **Intercept:** Evaluating $f(0)$ gives $3(1) - 2 = 1$, yielding $(0, 1)$.\n* **Decay:** The negative exponent dictates a decay towards the asymptote.",
    contentVn: "Chúng ta có thể tổng hợp các nguyên lý này thành một phép biến đổi kết hợp: **$f(x) = 3e^{-0.5x} - 2$**.\n\n* **Tiệm cận:** Được tịnh tiến xuống $y = -2$.\n* **Giao điểm:** Tính $f(0)$ cho ra $3(1) - 2 = 1$, thu được $(0, 1)$.\n* **Phân rã:** Số mũ âm quyết định sự phân rã về phía đường tiệm cận.",
    spoken: "We can synthesize these principles into a combined transformation: f of x equals 3 times e to the power of negative zero point five x, minus 2. The asymptote is translated downwards to y equals negative 2. Evaluating f of 0 gives 3 times 1 minus 2, yielding an intercept of 0, 1. The negative exponent dictates a decay towards the asymptote.",
    drawThis: true,
    widget: { 
        type: 'MathGraph', 
        params: { equation: '3*e^(-0.5*x) - 2', xRange: [-2, 10], yRange: [-4, 8] } 
    }
  },
  {
    type: "concept",
    title: "Algebraic Inversion",
    titleVn: "Nghịch đảo Đại số",
    icon: "ShieldCheck",
    color: "bg-[#ec4899]",
    content: "To determine the inverse function $f^{-1}(x)$ algebraically, we follow standard inverse procedures combined with logarithmic properties.\n\n> **Inversion Methodology:** Swap the $x$ and $y$ variables, isolate the exponential base, and apply the natural logarithm ($\\ln$) to both sides of the equation.",
    contentVn: "Để xác định hàm số ngược $f^{-1}(x)$ bằng đại số, chúng ta tuân theo các quy trình nghịch đảo tiêu chuẩn kết hợp với các tính chất logarit.\n\n> **Phương pháp Nghịch đảo:** Hoán đổi các biến $x$ và $y$, cô lập cơ số mũ và áp dụng logarit tự nhiên ($\\ln$) cho cả hai vế của phương trình.",
    spoken: "To determine the inverse function algebraically, we follow standard inverse procedures combined with logarithmic properties. The methodology is to swap the x and y variables, isolate the exponential base, and apply the natural logarithm to both sides of the equation.",
    exampleLabel: "Inverting an Exponential",
    exampleLabelVn: "Nghịch đảo Hàm Mũ",
    example: "Determine the inverse of $f(x) = 2e^{-4x} + 3$.\n\n**1. Swap Variables:**\n$x = 2e^{-4y} + 3$\n\n**2. Isolate the Base:**\n$\\frac{x - 3}{2} = e^{-4y}$\n\n**3. Apply Logarithm:**\n$\\ln\\left(\\frac{x - 3}{2}\\right) = -4y$\n\n**Final Result:**\n$f^{-1}(x) = -\\frac{1}{4}\\ln\\left(\\frac{x - 3}{2}\\right)$",
    exampleVn: "Xác định hàm ngược của $f(x) = 2e^{-4x} + 3$.\n\n**1. Hoán đổi Biến:**\n$x = 2e^{-4y} + 3$\n\n**2. Cô lập Cơ số:**\n$\\frac{x - 3}{2} = e^{-4y}$\n\n**3. Áp dụng Logarit:**\n$\\ln\\left(\\frac{x - 3}{2}\\right) = -4y$\n\n**Kết quả Cuối cùng:**\n$f^{-1}(x) = -\\frac{1}{4}\\ln\\left(\\frac{x - 3}{2}\\right)$",
    spokenExample: "Determine the inverse of f of x equals 2 times e to the power of negative 4x, plus 3. Step 1: swap variables to yield x equals 2 times e to the power of negative 4y, plus 3. Step 2: isolate the base to yield x minus 3 over 2 equals e to the power of negative 4y. Step 3: apply the natural logarithm to both sides. Dividing by negative 4 yields the final inverse function.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_12.mp3"
  },
  {
    type: "concept",
    title: "Application: Continuous Modeling",
    titleVn: "Ứng dụng: Mô hình hóa Liên tục",
    icon: "Target",
    color: "bg-[#0ea5e9]",
    content: "Exponential functions model empirical scenarios where a quantity scales continuously over time. \n\nA common application involves calculating the continuous rate constant ($k$) using a given doubling time.\n\n> **Continuous Model:** $P(t) = P_0 e^{kt}$ models continuous expansion, where $P_0$ represents the initial state.",
    contentVn: "Các hàm số mũ mô hình hóa các tình huống thực nghiệm trong đó một đại lượng thay đổi theo tỷ lệ liên tục theo thời gian. \n\nMột ứng dụng phổ biến liên quan đến việc tính hằng số tốc độ liên tục ($k$) bằng cách sử dụng thời gian nhân đôi đã cho.\n\n> **Mô hình Liên tục:** $P(t) = P_0 e^{kt}$ mô hình hóa sự mở rộng liên tục, trong đó $P_0$ đại diện cho trạng thái ban đầu.",
    spoken: "Exponential functions model empirical scenarios where a quantity scales continuously over time. A common application involves calculating the continuous rate constant, k, using a given doubling time. The continuous model, P of t equals P sub zero times e to the power of kt, models continuous expansion, where P sub zero represents the initial state.",
    exampleLabel: "Solving for the Rate Constant",
    exampleLabelVn: "Giải tìm Hằng số Tốc độ",
    example: "A culture begins with $50$ cells and doubles every $4$ hours. Determine the exact value of $k$ in $P(t) = P_0 e^{kt}$.\n\n**1. Formulate:**\nGiven $P(4) = 100$.\n$$100 = 50e^{4k}$$\n\n**2. Isolate:**\n$$2 = e^{4k}$$\n\n**3. Solve:**\n$$\\ln(2) = 4k$$\n$$k = \\frac{1}{4}\\ln(2)$$",
    exampleVn: "Một quá trình nuôi cấy bắt đầu với $50$ tế bào và nhân đôi mỗi $4$ giờ. Xác định giá trị chính xác của $k$ trong $P(t) = P_0 e^{kt}$.\n\n**1. Thiết lập:**\nCho biết $P(4) = 100$.\n$$100 = 50e^{4k}$$\n\n**2. Cô lập:**\n$$2 = e^{4k}$$\n\n**3. Giải:**\n$$\\ln(2) = 4k$$\n$$k = \\frac{1}{4}\\ln(2)$$",
    spokenExample: "A culture begins with 50 cells and doubles every 4 hours. Determine the exact value of k. Step 1: Formulate the equation. 100 equals 50 times e to the power of 4k. Step 2: Isolate the exponential base to yield 2 equals e to the power of 4k. Step 3: Solve by taking the natural logarithm. The natural log of 2 equals 4k, therefore k equals one quarter times the natural log of 2.",
    drawThis: false,
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_13.mp3"
  },
  {
    type: "concept",
    title: "General Exponential Form",
    titleVn: "Dạng Hàm số Mũ Tổng quát",
    icon: "Activity",
    color: "bg-[#8b5cf6]",
    content: "Explore the general exponential function: **$f(x) = Ae^{kx} + C$**.\n\nAdjust the parameters to observe how each transformation dictates the graphical output.\n\n> **Transformation Parameters:** \n> **$A$:** Initial value and vertical stretch.\n> **$k$:** Continuous rate (growth if $k > 0$, decay if $k < 0$).\n> **$C$:** Vertical translation, defining the horizontal asymptote.",
    contentVn: "Khám phá hàm số mũ tổng quát: **$f(x) = Ae^{kx} + C$**.\n\nĐiều chỉnh các tham số để quan sát cách mỗi phép biến đổi quyết định kết quả đồ thị.\n\n> **Các Tham số Biến đổi:** \n> **$A$:** Giá trị ban đầu và độ giãn dọc.\n> **$k$:** Tốc độ liên tục (tăng trưởng nếu $k > 0$, phân rã nếu $k < 0$).\n> **$C$:** Phép tịnh tiến dọc, xác định đường tiệm cận ngang.",
    spoken: "Explore the general exponential function: f of x equals A times e to the power of kx, plus C. Adjust the parameters to observe how each transformation dictates the graphical output. Parameter A dictates the initial value and vertical stretch. Parameter k dictates the continuous rate of growth or decay. Parameter C dictates the vertical translation and horizontal asymptote.",
    drawThis: false,
    widget: ExponentialExplorerWidget
  },
  {
    type: "summary",
    title: "Module Complete",
    titleVn: "Hoàn thành Học phần",
    subtitle: "You have completed the syllabus requirements for continuous compounding, Euler's Number, the natural exponential function, and algebraic inversions.",
    subtitleVn: "Bạn đã hoàn thành các yêu cầu của giáo trình về lãi kép liên tục, Số Euler, hàm số mũ tự nhiên và các phép nghịch đảo đại số.",
    color: "bg-[#10b981]",
    borderColor: "border-[#059669]",
    audio: "/audio/ADD_MATH/MATH_1A/slide_MATH_1A_14.mp3"
  }
];
</file>

<file path="src/data/ADD_MATH/MATH_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
</file>

<file path="src/data/ADD_MATH/SCIENCE_1A/assessment.js">
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

<file path="src/data/ADD_MATH/SCIENCE_1A/data.js">
// src/data/ADD_MATH/SCIENCE_1A/data.js
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
    track: "ADD_MATH",
    icon: "Sun",
    themeColor: "bg-amber-500 border-amber-700"
  },
  phases: [
    {
      id: "concept",
      title: "Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 10,
      tasks: [
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
        { id: "DICTATION", dbKey: "p4", maxXP: 15 },
        { id: "READ_COMP", dbKey: "p3", maxXP: 20 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 60,
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
        { id: "ESSAY", dbKey: "p8", maxXP: 20 },
        { id: "GAMES", dbKey: "p12", maxXP: 20 }
      ]
    }
  ],
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

<file path="src/data/ADD_MATH/SCIENCE_1A/diagrams.js">
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

<file path="src/data/ADD_MATH/SCIENCE_1A/games.js">
// Example for Y8/MATH_1A/games.js
export const games = {
  gameConfig: {
    bannedTowers: [], 
    lives: 20,
    mapId: 'STRAIGHT' // Use 'STRAIGHT' for the Science unit
  }
};
</file>

<file path="src/data/ADD_MATH/SCIENCE_1A/notes.js">
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

<file path="src/data/ADD_MATH/SCIENCE_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
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

<file path="src/data/Y8/SCIENCE_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
</file>

</files>
