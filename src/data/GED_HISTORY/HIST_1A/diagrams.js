export const DIAGRAMS = {
  DIAGRAM_13_COLONIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <!-- New England -->
    <rect x="50" y="50" width="200" height="300" rx="15" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/>
    <text x="150" y="90" font-family="sans-serif" font-weight="900" font-size="24" fill="#1e3a8a" text-anchor="middle">New England</text>
    <line x1="70" y1="110" x2="230" y2="110" stroke="#3b82f6" stroke-width="2"/>
    <text x="150" y="140" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e40af" text-anchor="middle">Geography:</text>
    <text x="150" y="165" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Cold, Rocky Soil</text>
    <text x="150" y="215" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e40af" text-anchor="middle">Economy:</text>
    <text x="150" y="240" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Shipbuilding</text>
    <text x="150" y="265" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Fishing &amp; Timber</text>

    <!-- Middle -->
    <rect x="300" y="50" width="200" height="300" rx="15" fill="#fffbeb" stroke="#f59e0b" stroke-width="4"/>
    <text x="400" y="90" font-family="sans-serif" font-weight="900" font-size="24" fill="#78350f" text-anchor="middle">Middle</text>
    <line x1="320" y1="110" x2="480" y2="110" stroke="#f59e0b" stroke-width="2"/>
    <text x="400" y="140" font-family="sans-serif" font-weight="bold" font-size="16" fill="#92400e" text-anchor="middle">Geography:</text>
    <text x="400" y="165" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Moderate Climate</text>
    <text x="400" y="215" font-family="sans-serif" font-weight="bold" font-size="16" fill="#92400e" text-anchor="middle">Economy:</text>
    <text x="400" y="240" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">"Breadbasket"</text>
    <text x="400" y="265" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Wheat &amp; Grains</text>

    <!-- Southern -->
    <rect x="550" y="50" width="200" height="300" rx="15" fill="#f0fdf4" stroke="#10b981" stroke-width="4"/>
    <text x="650" y="90" font-family="sans-serif" font-weight="900" font-size="24" fill="#064e3b" text-anchor="middle">Southern</text>
    <line x1="570" y1="110" x2="730" y2="110" stroke="#10b981" stroke-width="2"/>
    <text x="650" y="140" font-family="sans-serif" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">Geography:</text>
    <text x="650" y="165" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Warm, Fertile Soil</text>
    <text x="650" y="215" font-family="sans-serif" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">Economy:</text>
    <text x="650" y="240" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Cash Crops</text>
    <text x="650" y="265" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">(Tobacco, Indigo)</text>
    <text x="650" y="290" font-family="sans-serif" font-size="14" fill="#ef4444" font-weight="bold" text-anchor="middle">Slave Labor</text>
  </svg>`,

  DIAGRAM_MERCANTILISM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
      </marker>
    </defs>
    
    <!-- Circles -->
    <circle cx="200" cy="200" r="80" fill="#f8fafc" stroke="#3b82f6" stroke-width="5"/>
    <text x="200" y="190" font-family="sans-serif" font-weight="900" font-size="22" fill="#1e3a8a" text-anchor="middle">13 Colonies</text>
    <text x="200" y="220" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">(Resource Rich)</text>

    <circle cx="600" cy="200" r="80" fill="#f8fafc" stroke="#ef4444" stroke-width="5"/>
    <text x="600" y="190" font-family="sans-serif" font-weight="900" font-size="22" fill="#7f1d1d" text-anchor="middle">Great Britain</text>
    <text x="600" y="220" font-family="sans-serif" font-weight="bold" font-size="14" fill="#64748b" text-anchor="middle">(Manufacturing)</text>

    <!-- Top Arrow: Raw Materials -->
    <path d="M 250 140 Q 400 50 550 140" fill="none" stroke="#1e293b" stroke-width="4" stroke-dasharray="8 4" marker-end="url(#arrowhead)"/>
    <text x="400" y="80" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1e293b" text-anchor="middle">Raw Materials</text>
    <text x="400" y="100" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">(Timber, Tobacco, Cotton)</text>
    <text x="400" y="120" font-family="sans-serif" font-weight="bold" font-size="14" fill="#10b981" text-anchor="middle">Low Prices</text>

    <!-- Bottom Arrow: Manufactured Goods -->
    <path d="M 550 260 Q 400 350 250 260" fill="none" stroke="#1e293b" stroke-width="4" marker-end="url(#arrowhead)"/>
    <text x="400" y="310" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1e293b" text-anchor="middle">Manufactured Goods</text>
    <text x="400" y="330" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">(Tools, Cloth, Tea)</text>
    <text x="400" y="350" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="middle">High Prices (Wealth for Britain)</text>
  </svg>`,

  DIAGRAM_TIMELINE_TENSIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" class="w-full h-full drop-shadow-md bg-white rounded-lg p-4">
    <!-- Main Line -->
    <line x1="50" y1="150" x2="750" y2="150" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Point 1: 1754-1763 -->
    <circle cx="150" cy="150" r="10" fill="#3b82f6" stroke="#fff" stroke-width="3"/>
    <text x="150" y="110" font-family="sans-serif" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">1754-1763</text>
    <rect x="70" y="180" width="160" height="60" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
    <text x="150" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">French &amp; Indian War</text>
    <text x="150" y="225" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">(Britain gains huge debt)</text>

    <!-- Point 2: 1765 -->
    <circle cx="320" cy="150" r="10" fill="#eab308" stroke="#fff" stroke-width="3"/>
    <text x="320" y="200" font-family="sans-serif" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">1765</text>
    <rect x="240" y="50" width="160" height="60" rx="8" fill="#fffbeb" stroke="#fde047" stroke-width="2"/>
    <text x="320" y="75" font-family="sans-serif" font-weight="bold" font-size="14" fill="#854d0e" text-anchor="middle">Stamp Act</text>
    <text x="320" y="95" font-family="sans-serif" font-size="12" fill="#a16207" text-anchor="middle">"No Taxation W/O Rep"</text>

    <!-- Point 3: 1770 -->
    <circle cx="490" cy="150" r="10" fill="#ef4444" stroke="#fff" stroke-width="3"/>
    <text x="490" y="110" font-family="sans-serif" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">1770</text>
    <rect x="410" y="180" width="160" height="60" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="2"/>
    <text x="490" y="205" font-family="sans-serif" font-weight="bold" font-size="14" fill="#991b1b" text-anchor="middle">Boston Massacre</text>
    <text x="490" y="225" font-family="sans-serif" font-size="12" fill="#b91c1c" text-anchor="middle">Rising violence</text>

    <!-- Point 4: 1773 -->
    <circle cx="660" cy="150" r="10" fill="#10b981" stroke="#fff" stroke-width="3"/>
    <text x="660" y="200" font-family="sans-serif" font-weight="900" font-size="20" fill="#1e293b" text-anchor="middle">1773</text>
    <rect x="580" y="50" width="160" height="60" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="660" y="75" font-family="sans-serif" font-weight="bold" font-size="14" fill="#166534" text-anchor="middle">Boston Tea Party</text>
    <text x="660" y="95" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">Sons of Liberty protest</text>
  </svg>`
};