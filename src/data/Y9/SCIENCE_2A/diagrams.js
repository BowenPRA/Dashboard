export const DIAGRAMS = {
  // --- LECTURE NOTES SLIDES ---

  NOTES_EARTH_LAYERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <path d="M 20 250 A 180 180 0 0 1 380 250 Z" fill="#475569" stroke="#334155" stroke-width="4"/> <path d="M 35 250 A 165 165 0 0 1 365 250 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/> <path d="M 100 250 A 100 100 0 0 1 300 250 Z" fill="#f97316" stroke="#c2410c" stroke-width="4"/> <path d="M 150 250 A 50 50 0 0 1 250 250 Z" fill="#eab308" stroke="#a16207" stroke-width="4"/> <line x1="200" y1="65" x2="200" y2="20" stroke="#1e293b" stroke-width="3" stroke-dasharray="4"/>
    <rect x="150" y="2" width="100" height="24" rx="4" fill="white" stroke="#334155" stroke-width="2"/>
    <text x="200" y="18" font-family="sans-serif" font-weight="bold" font-size="12" fill="#1e293b" text-anchor="middle">Crust</text>

    <line x1="280" y1="120" x2="340" y2="80" stroke="#1e293b" stroke-width="3" stroke-dasharray="4"/>
    <rect x="310" y="55" width="80" height="24" rx="4" fill="white" stroke="#b91c1c" stroke-width="2"/>
    <text x="350" y="71" font-family="sans-serif" font-weight="bold" font-size="12" fill="#b91c1c" text-anchor="middle">Mantle</text>

    <line x1="260" y1="180" x2="330" y2="150" stroke="#1e293b" stroke-width="3" stroke-dasharray="4"/>
    <rect x="320" y="130" width="80" height="24" rx="4" fill="white" stroke="#c2410c" stroke-width="2"/>
    <text x="360" y="146" font-family="sans-serif" font-weight="bold" font-size="12" fill="#c2410c" text-anchor="middle">Outer Core</text>

    <line x1="220" y1="220" x2="320" y2="220" stroke="#1e293b" stroke-width="3" stroke-dasharray="4"/>
    <rect x="320" y="208" width="80" height="24" rx="4" fill="white" stroke="#a16207" stroke-width="2"/>
    <text x="360" y="224" font-family="sans-serif" font-weight="bold" font-size="12" fill="#a16207" text-anchor="middle">Inner Core</text>
  </svg>`,

  NOTES_MANTLE_CONVECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="20" y="210" width="360" height="40" fill="#ef4444" stroke="#b91c1c" stroke-width="4" rx="4"/>
    <text x="200" y="235" font-family="sans-serif" font-weight="bold" font-size="16" fill="#fff" text-anchor="middle">Superheated Core</text>
    
    <rect x="20" y="50" width="360" height="160" fill="#fed7aa" stroke="#fb923c" stroke-width="4" rx="4"/>
    <text x="200" y="135" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ea580c" text-anchor="middle" opacity="0.3">Mantle</text>

    <rect x="20" y="20" width="170" height="30" fill="#64748b" stroke="#334155" stroke-width="4" rx="2"/>
    <rect x="210" y="20" width="170" height="30" fill="#64748b" stroke="#334155" stroke-width="4" rx="2"/>
    
    <line x1="60" y1="35" x2="30" y2="35" stroke="#fff" stroke-width="4" marker-end="url(#plate-arrow)"/>
    <line x1="340" y1="35" x2="370" y2="35" stroke="#fff" stroke-width="4" marker-end="url(#plate-arrow)"/>

    <path d="M 180 190 L 180 90 Q 180 70 150 70 L 90 70 Q 60 70 60 100 L 60 170 Q 60 190 90 190 L 130 190" fill="none" stroke="#ea580c" stroke-width="6"/>
    <polygon points="145,190 125,180 125,200" fill="#ea580c"/> <polygon points="100,70 120,60 120,80" fill="#ea580c"/> <path d="M 220 190 L 220 90 Q 220 70 250 70 L 310 70 Q 340 70 340 100 L 340 170 Q 340 190 310 190 L 270 190" fill="none" stroke="#ea580c" stroke-width="6"/>
    <polygon points="255,190 275,180 275,200" fill="#ea580c"/> <polygon points="300,70 280,60 280,80" fill="#ea580c"/> <defs>
      <marker id="plate-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <polygon points="0 0, 10 5, 0 10" fill="#fff"/>
      </marker>
    </defs>
  </svg>`,

  NOTES_DIVERGENT_BOUNDARY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="20" y="100" width="360" height="130" fill="#fed7aa" stroke="#fb923c" stroke-width="4" rx="8"/>
    
    <path d="M 170 230 C 180 150, 150 110, 200 70 C 250 110, 220 150, 230 230 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
    
    <polygon points="20,50 180,50 170,110 20,110" fill="#475569" stroke="#1e293b" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="380,50 220,50 230,110 380,110" fill="#475569" stroke="#1e293b" stroke-width="4" stroke-linejoin="round"/>
    
    <line x1="120" y1="80" x2="40" y2="80" stroke="#f8fafc" stroke-width="6"/>
    <polygon points="30,80 50,70 50,90" fill="#f8fafc"/>
    
    <line x1="280" y1="80" x2="360" y2="80" stroke="#f8fafc" stroke-width="6"/>
    <polygon points="370,80 350,70 350,90" fill="#f8fafc"/>

    <rect x="130" y="10" width="140" height="30" rx="4" fill="white" stroke="#1e293b" stroke-width="2"/>
    <text x="200" y="30" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">New Crust Forms</text>
  </svg>`,

  NOTES_CONTINENTAL_DRIFT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="0" y="0" width="400" height="250" fill="#bfdbfe" rx="12"/>
    
    <path d="M 130 50 L 165 50 Q 185 100 160 160 L 120 220 Q 90 220 100 150 Q 105 100 130 50 Z" fill="#22c55e" stroke="#14532d" stroke-width="4" stroke-linejoin="round"/>
    
    <path d="M 175 40 L 260 40 Q 280 40 290 80 L 250 220 L 190 220 L 205 180 L 180 150 Q 200 100 175 40 Z" fill="#eab308" stroke="#713f12" stroke-width="4" stroke-linejoin="round"/>
    
    <path d="M 170 45 L 175 45 Q 195 100 170 160 L 130 220" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="6"/>
    
    <text x="120" y="130" font-family="sans-serif" font-weight="bold" font-size="16" fill="#14532d" text-anchor="middle">S.A.</text>
    <text x="230" y="110" font-family="sans-serif" font-weight="bold" font-size="16" fill="#713f12" text-anchor="middle">Africa</text>

    <rect x="230" y="190" width="150" height="40" rx="8" fill="white" stroke="#3b82f6" stroke-width="3"/>
    <text x="305" y="215" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="middle">"Jigsaw" Fit</text>
  </svg>`,

  // --- ASSESSMENT DIAGRAMS ---

  ASSESSMENT_CONVECTION_MODEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="180" y="210" width="40" height="30" fill="#94a3b8" stroke="#475569" stroke-width="4" rx="4"/>
    <path d="M 185 210 Q 200 170 215 210 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
    <text x="260" y="230" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ef4444">Heat Source</text>

    <path d="M 80 40 L 80 200 A 10 10 0 0 0 90 210 L 310 210 A 10 10 0 0 0 320 200 L 320 40" fill="none" stroke="#64748b" stroke-width="6"/>
    
    <path d="M 83 70 L 317 70 L 317 200 A 7 7 0 0 1 310 207 L 90 207 A 7 7 0 0 1 83 200 Z" fill="#bfdbfe"/>
    
    <rect x="120" y="55" width="70" height="15" fill="#475569" stroke="#1e293b" stroke-width="3"/>
    <rect x="210" y="55" width="70" height="15" fill="#475569" stroke="#1e293b" stroke-width="3"/>
    
    <line x1="140" y1="40" x2="100" y2="40" stroke="#1e293b" stroke-width="4"/>
    <polygon points="90,40 105,33 105,47" fill="#1e293b"/>
    <line x1="260" y1="40" x2="300" y2="40" stroke="#1e293b" stroke-width="4"/>
    <polygon points="310,40 295,33 295,47" fill="#1e293b"/>

    <path d="M 180 180 L 180 100 C 180 80, 110 80, 110 120 L 110 160" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <polygon points="110,170 102,155 118,155" fill="#3b82f6"/>
    
    <path d="M 220 180 L 220 100 C 220 80, 290 80, 290 120 L 290 160" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <polygon points="290,170 282,155 298,155" fill="#3b82f6"/>

    <circle cx="155" cy="62" r="12" fill="white" stroke="#1e293b" stroke-width="2"/>
    <text x="155" y="67" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e293b" text-anchor="middle">A</text>

    <circle cx="200" cy="140" r="12" fill="white" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="145" font-family="sans-serif" font-weight="bold" font-size="14" fill="#3b82f6" text-anchor="middle">B</text>
  </svg>`,

  ASSESSMENT_BOUNDARY_TYPE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="20" y="90" width="360" height="140" fill="#fed7aa" stroke="#fb923c" stroke-width="4" rx="4"/>
    
    <polygon points="20,40 180,40 170,100 20,100" fill="#64748b" stroke="#334155" stroke-width="4" stroke-linejoin="round"/>
    <line x1="150" y1="70" x2="80" y2="70" stroke="#f8fafc" stroke-width="6"/>
    <polygon points="70,70 85,60 85,80" fill="#f8fafc"/>
    
    <polygon points="380,40 220,40 230,100 380,100" fill="#64748b" stroke="#334155" stroke-width="4" stroke-linejoin="round"/>
    <line x1="250" y1="70" x2="320" y2="70" stroke="#f8fafc" stroke-width="6"/>
    <polygon points="330,70 315,60 315,80" fill="#f8fafc"/>

    <path d="M 175 180 C 180 120, 160 90, 200 40 C 240 90, 220 120, 225 180 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>

    <circle cx="200" cy="180" r="25" fill="white" stroke="#1e293b" stroke-width="4"/>
    <text x="200" y="190" font-family="sans-serif" font-weight="900" font-size="28" fill="#1e293b" text-anchor="middle">?</text>
  </svg>`,

  ASSESSMENT_FOSSIL_EVIDENCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" class="w-full h-full drop-shadow-md">
    <rect x="0" y="0" width="400" height="250" fill="#bfdbfe" rx="12"/>
    
    <path d="M 80 50 L 115 50 Q 135 100 110 160 L 70 220 Q 40 220 50 150 Q 55 100 80 50 Z" fill="#cbd5e1" stroke="#475569" stroke-width="4" stroke-linejoin="round"/>
    
    <path d="M 235 40 L 320 40 Q 340 40 350 80 L 310 220 L 250 220 L 265 180 L 240 150 Q 260 100 235 40 Z" fill="#cbd5e1" stroke="#475569" stroke-width="4" stroke-linejoin="round"/>
    
    <path d="M 98 100 L 115 100 Q 120 110 115 120 L 92 120 Z" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
    <path d="M 236 100 L 280 100 L 273 120 L 245 120 Z" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
    
    <path d="M 86 140 L 111 140 Q 110 150 105 160 L 78 160 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
    <path d="M 241 140 L 266 140 L 258 160 L 251 160 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>

    <line x1="120" y1="110" x2="235" y2="110" stroke="#f97316" stroke-width="3" stroke-dasharray="6"/>
    <line x1="112" y1="150" x2="245" y2="150" stroke="#22c55e" stroke-width="3" stroke-dasharray="6"/>

    <rect x="130" y="20" width="150" height="30" rx="4" fill="white" stroke="#3b82f6" stroke-width="2"/>
    <text x="205" y="40" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1d4ed8" text-anchor="middle">Fossil Evidence</text>
  </svg>`
};