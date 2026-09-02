// src/components/survivor/SurvivorCanvas.jsx
//
// The draw pass. Reads `gRef.current` and paints it; it never mutates the run.
//
// Everything on this canvas is Tower Defense artwork: the enemy sprites are the
// arena tribe's InsectVisual drawings and the hero and companions are the tower
// blooks, both rasterised by spriteForge. The ground is MAP_THEMES — the same
// palette and the same scatter of decoration symbols the board uses — so a
// student who walks out of the Cryo Lab tower defense and into Survivor is
// standing on the same floor.

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { MAP_THEMES } from '../towerdefense/themeData';
import { WORLD, WEAPONS, weaponStats } from './survivorData';

const TAU = Math.PI * 2;

/** Deterministic scatter, so the ground does not reshuffle between frames. */
function makeDecor(count, seed) {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: 40 + rnd() * (WORLD.width - 80),
      y: 40 + rnd() * (WORLD.height - 80),
      v: Math.floor(rnd() * 5),
      s: 0.6 + rnd() * 0.5,
      // Deliberately faint. The scenery and the swarm are both little coloured
      // glyphs on a flat field, and at equal weight a student cannot tell a bat
      // from a moon at a glance — which in a game about not being touched is the
      // only thing they need to tell. Ground dressing loses the contrast fight
      // on purpose.
      a: 0.11 + rnd() * 0.15,
    });
  }
  return out;
}

/**
 * Where the camera actually sits, clamped so it never shows past the arena wall.
 *
 * The engine's camera simply follows the hero, which is the right rule for the
 * simulation but the wrong one for the view: standing in a corner would put half
 * the screen outside the world, an empty field of background colour with a
 * dashed line through it. Clamping here rather than in the engine keeps the
 * simulation ignorant of viewport size — but it means the pointer-to-world
 * conversion has to use this same function, or a click would land somewhere the
 * player did not aim.
 */
function cameraAt(cam, w, h, scale) {
  const viewW = w / scale;
  const viewH = h / scale;
  const x = viewW >= WORLD.width
    ? WORLD.width / 2
    : Math.min(Math.max(cam.x, viewW / 2), WORLD.width - viewW / 2);
  const y = viewH >= WORLD.height
    ? WORLD.height / 2
    : Math.min(Math.max(cam.y, viewH / 2), WORLD.height - viewH / 2);
  return { x, y, viewW, viewH };
}

const PROJ_COLOR = {
  DART: '#38bdf8',
  SNIPER: '#34d399',
  SPLASH: '#fb7185',
  CHAIN: '#fbbf24',
};

export default function SurvivorCanvas({ gRef, sprites, themeId = 'STANDARD', onPointer }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1, scale: 1 });
  // Lets the resize handler repaint without depending on a React commit — see
  // the note in `apply` below.
  const drawRef = useRef(null);

  const theme = MAP_THEMES[themeId] || MAP_THEMES.STANDARD;
  const decor = useMemo(() => makeDecor(190, 0x5eed + themeId.length * 977), [themeId]);

  // ---- sizing ----------------------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const apply = (w, h) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Zoom so a phone sees a useful slice of the arena rather than a close-up
      // of the hero's feet, without letting a wide monitor shrink the sprites.
      const scale = Math.max(0.62, Math.min(1.45, Math.min(w / 1000, h / 620)));
      sizeRef.current = { w, h, dpr, scale };
      // Assigning canvas.width WIPES the canvas, and the next repaint only comes
      // with the next React commit. While the loop is running that is a frame
      // away and invisible — but the loop stops for the level-up screen, so a
      // window resize or a tablet rotation there would leave the arena black
      // behind the modal until the student dismissed it. Repaint immediately.
      drawRef.current?.();
    };

    const obs = new ResizeObserver(entries => {
      const r = entries[0]?.contentRect;
      if (r) apply(r.width, r.height);
    });
    obs.observe(wrap);
    apply(wrap.clientWidth, wrap.clientHeight);
    return () => obs.disconnect();
  }, []);

  // ---- pointer ---------------------------------------------------------
  // Reported in WORLD coordinates so the engine never has to know about the
  // camera. Held-pointer steering is the control that works identically with a
  // mouse and with a thumb, which matters — this runs on classroom tablets.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const toWorld = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h, scale } = sizeRef.current;
      const g = gRef.current;
      const cam = cameraAt(g ? g.cam : { x: 0, y: 0 }, w, h, scale);
      return {
        wx: (clientX - rect.left - w / 2) / scale + cam.x,
        wy: (clientY - rect.top - h / 2) / scale + cam.y,
      };
    };

    const down = (e) => {
      e.preventDefault();
      canvas.setPointerCapture?.(e.pointerId);
      onPointer({ pointerDown: true, ...toWorld(e.clientX, e.clientY) });
    };
    const move = (e) => onPointer({ ...toWorld(e.clientX, e.clientY) });
    const up = () => onPointer({ pointerDown: false });

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [gRef, onPointer]);

  // ---- draw ------------------------------------------------------------
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const g = gRef.current;
    if (!canvas || !g) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h, dpr, scale } = sizeRef.current;
    if (!w || !h) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // --- ground ---------------------------------------------------------
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, w, h);

    const shake = g.shake > 0 ? g.shake : 0;
    const sx = shake ? (Math.random() - 0.5) * shake : 0;
    const sy = shake ? (Math.random() - 0.5) * shake : 0;

    const cam = cameraAt(g.cam, w, h, scale);

    ctx.save();
    ctx.translate(w / 2 + sx, h / 2 + sy);
    ctx.scale(scale, scale);
    ctx.translate(-cam.x, -cam.y);

    const { viewW, viewH } = cam;
    const left = cam.x - viewW / 2 - 80;
    const right = cam.x + viewW / 2 + 80;
    const top = cam.y - viewH / 2 - 80;
    const bottom = cam.y + viewH / 2 + 80;
    const visible = (x, y, pad = 0) => x > left - pad && x < right + pad && y > top - pad && y < bottom + pad;

    // Grid, clipped to what the camera can see.
    ctx.strokeStyle = theme.gridStr;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const G = 96;
    for (let x = Math.floor(left / G) * G; x < right; x += G) {
      ctx.moveTo(x, Math.max(0, top)); ctx.lineTo(x, Math.min(WORLD.height, bottom));
    }
    for (let y = Math.floor(top / G) * G; y < bottom; y += G) {
      ctx.moveTo(Math.max(0, left), y); ctx.lineTo(Math.min(WORLD.width, right), y);
    }
    ctx.stroke();

    // The theme's scenery — the same emoji the TD board scatters beside its road.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const d of decor) {
      if (!visible(d.x, d.y)) continue;
      ctx.globalAlpha = d.a;
      ctx.font = `${Math.round(30 * d.s)}px system-ui`;
      ctx.fillText(theme.decoSymbols[d.v] || '·', d.x, d.y);
    }
    ctx.globalAlpha = 1;

    // The arena wall. Running out of room is the point, so it is drawn loudly.
    ctx.strokeStyle = theme.pathOutline;
    ctx.lineWidth = 10;
    ctx.setLineDash([26, 18]);
    ctx.strokeRect(0, 0, WORLD.width, WORLD.height);
    ctx.setLineDash([]);

    // --- gems -----------------------------------------------------------
    for (const gem of g.gems) {
      if (!visible(gem.x, gem.y, 20)) continue;
      const r = gem.heal ? 11 : gem.big ? 9 : 6;
      ctx.beginPath();
      ctx.arc(gem.x, gem.y, r + 4, 0, TAU);
      ctx.fillStyle = gem.heal ? 'rgba(52,211,153,0.28)' : 'rgba(96,165,250,0.25)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(gem.x, gem.y, r, 0, TAU);
      ctx.fillStyle = gem.heal ? '#34d399' : gem.big ? '#f472b6' : '#60a5fa';
      ctx.fill();
    }

    // --- ground effects --------------------------------------------------
    for (const f of g.fx) {
      const k = f.life / f.max;
      if (f.kind === 'nova') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.05 - k * 0.35), 0, TAU);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = k * 0.8;
        ctx.lineWidth = 5;
        ctx.stroke();
      } else if (f.kind === 'boom') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.15 - k * 0.5), 0, TAU);
        ctx.fillStyle = f.color;
        ctx.globalAlpha = k * 0.45;
        ctx.fill();
      } else if (f.kind === 'burst') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.4 - k), 0, TAU);
        ctx.fillStyle = f.color;
        ctx.globalAlpha = k * 0.5;
        ctx.fill();
      } else if (f.kind === 'arc') {
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x2, f.y2);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = k;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // --- the rainbow lance ------------------------------------------------
    for (const wpn of g.weapons) {
      if (wpn.id !== 'UNICORN' || wpn.sweep < 0) continue;
      const s = weaponStats('UNICORN', wpn.level);
      const a = wpn.sweepFrom + (wpn.sweep / s.sweepMs) * TAU;
      const len = 1400;
      ctx.save();
      ctx.translate(g.hero.x, g.hero.y);
      ctx.rotate(a);
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0.95)');
      grad.addColorStop(0.25, 'rgba(244,114,182,0.85)');
      grad.addColorStop(0.55, 'rgba(129,140,248,0.7)');
      grad.addColorStop(1, 'rgba(45,212,191,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, -s.width / 2, len, s.width);
      ctx.restore();
    }

    // --- enemies ----------------------------------------------------------
    for (const e of g.enemies) {
      if (!visible(e.x, e.y, e.r * 2)) continue;
      const img = sprites[e.slot];
      // Drawn a little larger than the body radius: the artwork has transparent
      // margins, and a forgiving hitbox is the right way round for students.
      const size = e.r * 2.9;

      ctx.save();
      ctx.translate(e.x, e.y);

      // Ground shadow, so the swarm reads as bodies rather than stickers.
      ctx.beginPath();
      ctx.ellipse(0, e.r * 0.72, e.r * 0.8, e.r * 0.3, 0, 0, TAU);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fill();

      // Face the player, exactly as the board turns its creeps along the road.
      const ang = Math.atan2(g.hero.y - e.y, g.hero.x - e.x) + Math.PI / 2;
      ctx.rotate(ang);
      // The rasterised sprite lost its CSS leg animation; a small sway puts the
      // life back for a fraction of the cost.
      ctx.rotate(Math.sin(g.t / 90 + e.phase) * 0.09);

      if (img) ctx.drawImage(img, -size / 2, -size / 2, size, size);
      else {
        ctx.beginPath();
        ctx.arc(0, 0, e.r, 0, TAU);
        ctx.fillStyle = '#7f1d1d';
        ctx.fill();
      }
      ctx.restore();

      if (e.slowT > 0) {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 1.05, 0, TAU);
        ctx.fillStyle = 'rgba(103,232,249,0.32)';
        ctx.fill();
      }
      if (e.flash > 0) {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 1.05, 0, TAU);
        ctx.fillStyle = `rgba(255,255,255,${0.55 * (e.flash / 120)})`;
        ctx.fill();
      }

      // Only the things worth tracking carry a bar; two hundred ant health bars
      // would be the loudest thing on screen and say nothing.
      if ((e.boss || e.elite) && e.hp < e.maxHp) {
        const bw = e.r * 2.6;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(e.x - bw / 2, e.y - e.r - 16, bw, 7);
        ctx.fillStyle = e.boss ? '#ef4444' : '#a855f7';
        ctx.fillRect(e.x - bw / 2, e.y - e.r - 16, bw * (e.hp / e.maxHp), 7);
      }
    }

    // --- bullets ----------------------------------------------------------
    for (const b of g.bullets) {
      if (!visible(b.x, b.y, 24)) continue;
      const color = PROJ_COLOR[b.kind] || '#e2e8f0';
      if (b.splash) {
        // Lobbed: lift the shell off the ground along its flight for the arc.
        const k = b.arc ? b.arcT / b.arc : 0;
        const lift = Math.sin(Math.min(1, k) * Math.PI) * 46;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, 7, 3, 0, 0, TAU);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(b.x, b.y - lift, b.r, 0, TAU);
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        const a = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(a);
        ctx.fillStyle = color;
        const len = b.kind === 'SNIPER' ? 26 : 14;
        ctx.fillRect(-len, -b.r / 2, len, b.r);
        ctx.beginPath();
        ctx.arc(0, 0, b.r / 1.6, 0, TAU);
        ctx.fill();
        ctx.restore();
      }
    }

    // --- companions --------------------------------------------------------
    const compCount = Math.max(1, g.weapons.length - 1);
    for (let i = 1; i < g.weapons.length; i++) {
      const wpn = g.weapons[i];
      const a = (g.t / 2600) * TAU + ((i - 1) / compCount) * TAU;
      const cx = g.hero.x + Math.cos(a) * 64;
      const cy = g.hero.y + Math.sin(a) * 64;
      const img = sprites[wpn.id];
      // Companions sit a step smaller than the hero and orbit a little wider, so
      // a full squad of five never buries the thing the student is steering.
      const size = 38 + wpn.level * 2.5;

      ctx.beginPath();
      ctx.ellipse(cx, cy + size * 0.36, size * 0.3, size * 0.12, 0, 0, TAU);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fill();

      if (img) {
        const bob = Math.sin(g.t / 220 + i) * 3;
        ctx.drawImage(img, cx - size / 2, cy - size / 2 + bob, size, size);
      }
      // A ring of pips for the weapon's level — readable at a glance mid-fight.
      if (wpn.level > 1) {
        ctx.fillStyle = '#fbbf24';
        for (let p = 0; p < wpn.level - 1; p++) {
          ctx.beginPath();
          ctx.arc(cx - 8 + p * 5, cy + size * 0.46, 2, 0, TAU);
          ctx.fill();
        }
      }
    }

    // --- hero --------------------------------------------------------------
    {
      const h = g.hero;
      const size = 64;
      const bob = Math.sin(h.walkPhase) * 3.5;

      ctx.beginPath();
      ctx.ellipse(h.x, h.y + size * 0.4, size * 0.34, size * 0.14, 0, 0, TAU);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fill();

      // Cryo's chill radius is the one weapon whose range you have to stand in,
      // so it is the one that gets drawn.
      const nova = g.weapons.find(x => WEAPONS[x.id]?.kind === 'NOVA');
      if (nova) {
        const s = weaponStats(nova.id, nova.level);
        ctx.beginPath();
        ctx.arc(h.x, h.y, s.radius, 0, TAU);
        ctx.strokeStyle = 'rgba(103,232,249,0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(h.x, h.y + bob);
      if (h.facing < 0) ctx.scale(-1, 1);
      const img = sprites[h.typeId];
      if (img) ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();

      if (h.iframe > 0) {
        ctx.beginPath();
        ctx.arc(h.x, h.y, size * 0.62, 0, TAU);
        ctx.strokeStyle = `rgba(255,255,255,${0.25 + 0.35 * Math.abs(Math.sin(g.t / 60))})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      if (h.hurtFlash > 0) {
        ctx.beginPath();
        ctx.arc(h.x, h.y, size * 0.6, 0, TAU);
        ctx.fillStyle = `rgba(239,68,68,${0.5 * (h.hurtFlash / 220)})`;
        ctx.fill();
      }
    }

    // --- floating text ------------------------------------------------------
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const p of g.pops) {
      const k = p.life / p.max;
      ctx.globalAlpha = Math.min(1, k * 1.6);
      ctx.font = '900 19px system-ui, sans-serif';
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(15,23,42,0.85)';
      ctx.strokeText(p.text, p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, p.x, p.y);
    }
    ctx.globalAlpha = 1;

    ctx.restore();

    // --- off-screen threat markers -------------------------------------------
    // The boss and the elites can be outside the view while they matter most, so
    // an arrow on the rim keeps them findable without zooming the camera out.
    for (const e of g.enemies) {
      if (!e.boss && !e.elite) continue;
      if (visible(e.x, e.y, 0)) continue;
      const dx = e.x - cam.x, dy = e.y - cam.y;
      const a = Math.atan2(dy, dx);
      const rx = w / 2 + Math.cos(a) * (Math.min(w, h) / 2 - 34);
      const ry = h / 2 + Math.sin(a) * (Math.min(w, h) / 2 - 34);
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(14, 0); ctx.lineTo(-10, -9); ctx.lineTo(-10, 9);
      ctx.closePath();
      ctx.fillStyle = e.boss ? '#ef4444' : '#a855f7';
      ctx.fill();
      ctx.restore();
    }
  }, [gRef, sprites, theme, decor]);

  useEffect(() => { drawRef.current = draw; }, [draw]);

  // Repaint on every commit; the engine commits once per animation frame.
  useLayoutEffect(() => { draw(); });

  return (
    <div ref={wrapRef} className="relative flex-1 min-h-0 w-full overflow-hidden">
      <canvas ref={canvasRef} className="block touch-none select-none cursor-crosshair" />
    </div>
  );
}
