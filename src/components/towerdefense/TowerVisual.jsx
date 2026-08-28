// src/components/towerdefense/TowerVisual.jsx
import React, { memo } from 'react';

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

// A clear left-facing horse head: long muzzle, pointed ear, flowing rainbow mane
// down the neck and a spiral horn from the brow.
const UnicornBlook = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="uni-horn" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="30%" stopColor="#f59e0b" />
        <stop offset="55%" stopColor="#facc15" />
        <stop offset="78%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="uni-mane" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="45%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <g id="unicorn-blook">
      {/* Mane down the back of the neck */}
      <path d="M112,58 Q150,70 150,120 Q152,162 126,180 Q150,150 137,120 Q150,95 118,80 Q132,69 112,58 Z" fill="url(#uni-mane)" />
      <path d="M118,72 Q142,97 131,129 Q140,151 121,168 Q131,140 120,120 Q129,98 107,85 Z" fill="#c084fc" opacity="0.65" />

      {/* Head + neck silhouette, muzzle to the left */}
      <path d="M34,118 C29,107 34,97 45,95 L59,91 C65,68 79,56 97,55 C106,55 112,60 114,68 C138,76 150,104 149,150 L120,176 C109,177 99,174 93,167 C69,163 59,149 54,137 L47,131 C39,127 35,124 34,118 Z"
            fill="#fdf2ff" stroke="#efd6ff" strokeWidth="3" />

      {/* Muzzle shading */}
      <path d="M34,118 C29,107 34,97 45,95 L60,92 C58,104 55,116 52,126 L47,131 C39,127 35,124 34,118 Z" fill="#fbe8ff" />

      {/* Ear */}
      <polygon points="112,62 122,30 136,60" fill="#fdf2ff" stroke="#efd6ff" strokeWidth="3" />
      <polygon points="117,56 123,40 130,56" fill="#f0abfc" />

      {/* Forelock tuft at the brow */}
      <path d="M95,56 Q108,47 119,58 Q110,66 99,64 Z" fill="url(#uni-mane)" />

      {/* Spiral horn */}
      <polygon points="93,54 80,2 106,52" fill="url(#uni-horn)" stroke="#fff" strokeWidth="1.5" />
      <path d="M92,44 L100,42 M90,34 L98,32 M88,24 L95,22 M86,14 L92,13" stroke="#fff" strokeWidth="1.6" opacity="0.85" />

      {/* Eye */}
      <ellipse cx="83" cy="90" rx="6.5" ry="9" fill="#3b1d4e" />
      <circle cx="81" cy="86" r="2.4" fill="#fff" />

      {/* Nostril + mouth on the muzzle */}
      <ellipse cx="45" cy="110" rx="4" ry="5.5" fill="#d8a7e8" />
      <path d="M36,122 Q44,128 52,124" stroke="#d8a7e8" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {hasPassive && (
        <g id="twin-sparkle">
          <path d="M150,38 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 z" fill="#facc15" />
          <path d="M40,58 l2.5,6 l6,2.5 l-6,2.5 l-2.5,6 l-2.5,-6 l-6,-2.5 l6,-2.5 z" fill="#38bdf8" />
        </g>
      )}
    </g>
  </svg>
);

const VISUALS = {
  DART:    { Blook: DartHedgehog },
  SNIPER:  { Blook: SniperOwl },
  SPLASH:  { Blook: SplashHippo },
  FROST:   { Blook: FrostFox },
  CHAIN:   { Blook: ChainEel },
  NITRO:   { Blook: NitroAlien },
  UNICORN: { Blook: UnicornBlook }
};

const SIZES = {
  sm: { wrap: 'w-8 h-8' },
  md: { wrap: 'w-12 h-12' },
  lg: { wrap: 'w-16 h-16' },
  xl: { wrap: 'w-20 h-20' }
};

// ==========================================
// CSS Animations
// ==========================================
// Injected ONCE into document.head, not once per component. This used to render
// a <style> element inside every TowerVisual, so a board with twenty towers
// carried twenty identical copies of the same keyframes — each one re-created on
// every frame, and each one forcing the engine to re-parse them.
const TD_KEYFRAMES = `
  @keyframes td-fast-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes td-leg-l { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
  @keyframes td-leg-r { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
  @keyframes td-wing-flap { 0%, 100% { transform: scaleX(0.8) rotate(-20deg); } 50% { transform: scaleX(0.3) rotate(-5deg); } }
  .td-leg-l { animation: td-leg-l 0.25s ease-in-out infinite; transform-origin: center; }
  .td-leg-r { animation: td-leg-r 0.25s ease-in-out infinite; transform-origin: center; }
  .td-wing-l { animation: td-wing-flap 0.08s ease-in-out infinite; transform-origin: 25px 45px; }
  .td-wing-r { animation: td-wing-flap 0.08s ease-in-out infinite reverse; transform-origin: 75px 45px; }
`;

const STYLE_ID = 'td-visual-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = TD_KEYFRAMES;
  document.head.appendChild(el);
}

function TowerVisualBase({ typeId, size = 'md', selected = false, hovered = false, dimmed = false, upgrades = {} }) {
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

// Memoised: a tower's artwork only changes when it is selected, hovered or
// upgraded, but the board re-renders every frame to move the creeps. Without
// this, every tower's whole SVG tree was reconciled thirty times a second.
// `upgrades` is compared by content because the engine replaces the object.
const sameUpgrades = (a = {}, b = {}) =>
  a === b || (!!a.rate === !!b.rate && !!a.damage === !!b.damage && !!a.range === !!b.range &&
              !!a.targeting === !!b.targeting && !!a.passive === !!b.passive);

const TowerVisual = memo(TowerVisualBase, (p, n) =>
  p.typeId === n.typeId && p.size === n.size && p.selected === n.selected &&
  p.hovered === n.hovered && p.dimmed === n.dimmed && sameUpgrades(p.upgrades, n.upgrades)
);

export default TowerVisual;

// ==========================================
// INSECT SVG COMPONENTS FOR ENEMIES
// ==========================================
// Memoised on `type` alone: the artwork is identical for every creep of a kind,
// and only the wrapper's transform changes as it walks. This is the single
// biggest reconciliation saving on the board — two hundred creeps each carrying
// a twenty-node SVG were being diffed in full on every frame.
export const InsectVisual = memo(({ type }) => {
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

    // ===================== FROSTKIN (ICE arenas) =====================
    case 'ICE_FLEA': // swarm
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l"><path d="M50,55 L22,40" stroke="#0369a1" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,55 L78,40" stroke="#0369a1" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M50,60 L20,72" stroke="#0369a1" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M50,60 L80,72" stroke="#0369a1" strokeWidth="4" fill="none" strokeLinecap="round"/></g>
          <ellipse cx="50" cy="60" rx="20" ry="24" fill="#7dd3fc" />
          <circle cx="50" cy="32" r="14" fill="#e0f2fe" />
          <circle cx="44" cy="30" r="3" fill="#0c4a6e" />
          <circle cx="56" cy="30" r="3" fill="#0c4a6e" />
          <path d="M50,44 L50,80 M38,58 L62,58 M40,50 L60,66 M60,50 L40,66" stroke="#e0f7ff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case 'ICE_MOTH': // flyer
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse className="td-wing-l" cx="26" cy="45" rx="22" ry="13" fill="#bae6fd" opacity="0.9" />
          <ellipse className="td-wing-r" cx="74" cy="45" rx="22" ry="13" fill="#bae6fd" opacity="0.9" />
          <ellipse className="td-wing-l" cx="30" cy="62" rx="14" ry="9" fill="#e0f2fe" opacity="0.85" />
          <ellipse className="td-wing-r" cx="70" cy="62" rx="14" ry="9" fill="#e0f2fe" opacity="0.85" />
          <circle cx="50" cy="28" r="10" fill="#e2e8f0" />
          <ellipse cx="50" cy="58" rx="11" ry="22" fill="#cbd5e1" />
          <path d="M44,20 L36,8 M56,20 L64,8" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="45" cy="27" r="2.5" fill="#1e293b" />
          <circle cx="55" cy="27" r="2.5" fill="#1e293b" />
        </svg>
      );
    case 'ICE_GOLEM': // tank
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration:'0.6s'}}><rect x="30" y="80" width="12" height="18" rx="3" fill="#0ea5e9"/></g>
          <g className="td-leg-r" style={{animationDuration:'0.6s'}}><rect x="58" y="80" width="12" height="18" rx="3" fill="#0ea5e9"/></g>
          <polygon points="50,8 70,26 62,40 38,40 30,26" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2"/>
          <rect x="26" y="34" width="48" height="50" rx="10" fill="#38bdf8" stroke="#0284c7" strokeWidth="3"/>
          <polygon points="30,38 46,50 30,60" fill="#bae6fd" opacity="0.7"/>
          <polygon points="70,38 54,50 70,66" fill="#bae6fd" opacity="0.5"/>
          <circle cx="41" cy="55" r="5" fill="#0c4a6e"/>
          <circle cx="59" cy="55" r="5" fill="#0c4a6e"/>
          <circle cx="41" cy="54" r="2" fill="#7dd3fc"/>
          <circle cx="59" cy="54" r="2" fill="#7dd3fc"/>
        </svg>
      );
    case 'ICE_MATRON': // boss
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
          <polygon points="50,4 58,22 42,22" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5"/>
          <polygon points="34,10 42,26 26,24" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5"/>
          <polygon points="66,10 58,26 74,24" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5"/>
          <path d="M28,55 Q50,30 72,55 L64,92 Q50,100 36,92 Z" fill="#7dd3fc" />
          <path d="M34,60 Q50,44 66,60 L60,86 Q50,92 40,86 Z" fill="#e0f7ff" opacity="0.8"/>
          <circle cx="50" cy="34" r="15" fill="#e2f5ff" />
          <circle cx="44" cy="33" r="3" fill="#0369a1" />
          <circle cx="56" cy="33" r="3" fill="#0369a1" />
          <path d="M45,42 Q50,46 55,42" stroke="#0369a1" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="40" cy="70" r="3" fill="#bae6fd"/>
          <circle cx="60" cy="74" r="3" fill="#bae6fd"/>
        </svg>
      );
    case 'ICE_TITAN': // spawner
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(14,165,233,0.7)]">
          <polygon points="20,40 34,8 46,40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
          <polygon points="54,40 66,10 80,40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
          <polygon points="50,2 60,34 40,34" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2"/>
          <path d="M22,44 L78,44 L70,94 Q50,102 30,94 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="3"/>
          <polygon points="30,50 46,66 30,74" fill="#7dd3fc" opacity="0.7"/>
          <polygon points="70,50 54,66 70,78" fill="#7dd3fc" opacity="0.5"/>
          <circle cx="40" cy="62" r="6" fill="#082f49"/>
          <circle cx="60" cy="62" r="6" fill="#082f49"/>
          <circle cx="40" cy="60" r="2.5" fill="#7dd3fc"/>
          <circle cx="60" cy="60" r="2.5" fill="#7dd3fc"/>
          <path d="M36,82 L44,76 L52,82 L60,76 L64,82" stroke="#e0f7ff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    // ===================== NIGHTFALL (NIGHT arenas) =====================
    case 'NIGHT_SHADE': // swarm
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <path d="M30,45 Q30,18 50,18 Q70,18 70,45 L70,78 Q64,72 58,80 Q52,72 46,80 Q40,72 34,80 L30,72 Z" fill="#c7d2fe" opacity="0.92"/>
          <circle cx="42" cy="42" r="5" fill="#312e81"/>
          <circle cx="58" cy="42" r="5" fill="#312e81"/>
          <path d="M44,56 Q50,62 56,56" stroke="#4338ca" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case 'NIGHT_BAT': // flyer
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <path className="td-wing-l" d="M48,45 Q18,25 6,45 Q20,44 16,58 Q30,50 48,58 Z" fill="#4c1d95"/>
          <path className="td-wing-r" d="M52,45 Q82,25 94,45 Q80,44 84,58 Q70,50 52,58 Z" fill="#4c1d95"/>
          <ellipse cx="50" cy="52" rx="14" ry="17" fill="#5b21b6"/>
          <polygon points="40,36 44,24 50,38" fill="#5b21b6"/>
          <polygon points="60,36 56,24 50,38" fill="#5b21b6"/>
          <circle cx="44" cy="50" r="4" fill="#f87171"/>
          <circle cx="56" cy="50" r="4" fill="#f87171"/>
          <path d="M45,62 L48,58 L50,62 L52,58 L55,62" stroke="#ede9fe" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'NIGHT_KNIGHT': // tank
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration:'0.6s'}}><rect x="32" y="82" width="10" height="16" rx="3" fill="#334155"/></g>
          <g className="td-leg-r" style={{animationDuration:'0.6s'}}><rect x="58" y="82" width="10" height="16" rx="3" fill="#334155"/></g>
          <polygon points="50,6 66,16 62,30 38,30 34,16" fill="#64748b" stroke="#1e293b" strokeWidth="2"/>
          <rect x="30" y="30" width="40" height="52" rx="8" fill="#475569" stroke="#1e293b" strokeWidth="3"/>
          <rect x="38" y="40" width="24" height="16" rx="4" fill="#0f172a"/>
          <circle cx="46" cy="48" r="3" fill="#f87171"/>
          <circle cx="54" cy="48" r="3" fill="#f87171"/>
          <path d="M40,64 L60,64 M44,72 L56,72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20,44 L20,80 Q30,86 30,74 L30,50 Z" fill="#334155" stroke="#1e293b" strokeWidth="2"/>
        </svg>
      );
    case 'NIGHT_NECRO': // boss
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(126,34,206,0.6)]">
          <path d="M26,52 Q26,20 50,16 Q74,20 74,52 L70,94 Q50,100 30,94 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth="2"/>
          <path d="M34,50 Q34,26 50,24 Q66,26 66,50 L66,62 Q50,68 34,62 Z" fill="#1e1b4b"/>
          <circle cx="43" cy="46" r="5" fill="#a3e635"/>
          <circle cx="57" cy="46" r="5" fill="#a3e635"/>
          <circle cx="43" cy="46" r="2" fill="#f0fdf4"/>
          <circle cx="57" cy="46" r="2" fill="#f0fdf4"/>
          <line x1="78" y1="14" x2="78" y2="92" stroke="#3b2a1a" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="78" cy="14" r="8" fill="#a3e635" opacity="0.9"/>
          <circle cx="78" cy="14" r="4" fill="#f0fdf4"/>
        </svg>
      );
    case 'NIGHT_COLOSSUS': // spawner
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]">
          <g className="td-leg-l" style={{animationDuration:'1s'}}><rect x="26" y="80" width="14" height="18" rx="3" fill="#3b2f5e"/></g>
          <g className="td-leg-r" style={{animationDuration:'1s'}}><rect x="60" y="80" width="14" height="18" rx="3" fill="#3b2f5e"/></g>
          <polygon points="30,40 22,14 40,32" fill="#e5e7eb"/>
          <polygon points="70,40 78,14 60,32" fill="#e5e7eb"/>
          <rect x="24" y="34" width="52" height="52" rx="12" fill="#6d28d9" stroke="#3b0764" strokeWidth="3"/>
          <circle cx="50" cy="42" r="20" fill="#ede9fe"/>
          <circle cx="42" cy="42" r="7" fill="#1e1b4b"/>
          <circle cx="58" cy="42" r="7" fill="#1e1b4b"/>
          <circle cx="42" cy="42" r="3" fill="#c084fc"/>
          <circle cx="58" cy="42" r="3" fill="#c084fc"/>
          <path d="M40,58 L44,54 L48,58 L52,54 L56,58 L60,54" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinejoin="round"/>
          <path d="M40,70 L60,70" stroke="#3b0764" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );

    default:
      return null;
  }
});
InsectVisual.displayName = 'InsectVisual';

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