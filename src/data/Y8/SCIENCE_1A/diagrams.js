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
  NOTES_INCIDENT_RAY_NORMAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 0 425 250" class="w-full h-full drop-shadow-md">
      <line x1="100" y1="180" x2="300" y2="180" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
      <path d="M 110 180 L 95 195 M 140 180 L 125 195 M 170 180 L 155 195 M 200 180 L 185 195 M 230 180 L 215 195 M 260 180 L 245 195 M 290 180 L 275 195" stroke="#94a3b8" stroke-width="2"/>
      
      <line x1="200" y1="40" x2="200" y2="180" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8"/>
      <text x="200" y="30" font-family="sans-serif" font-weight="bold" font-size="16" fill="#64748b" text-anchor="middle">Normal Line</text>
      
      <line x1="100" y1="60" x2="200" y2="180" stroke="#ef4444" stroke-width="4"/>
      <polygon points="145,114 160,135 140,129" fill="#ef4444" transform="rotate(-10 150 120)"/>
      <text x="90" y="50" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="end">Incident Ray</text>
      
      <rect x="200" y="165" width="15" height="15" fill="none" stroke="#64748b" stroke-width="2"/>
    </svg>`,

  NOTES_LAW_OF_REFLECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 250" class="w-full h-full drop-shadow-md">
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

  NOTES_DISPERSION_PRISM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585 250" class="w-full h-full drop-shadow-md">
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