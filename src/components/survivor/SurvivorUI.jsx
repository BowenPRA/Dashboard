// src/components/survivor/SurvivorUI.jsx
//
// Every screen around the canvas: the pre-run loadout, the in-run HUD, the
// level-up card draft (with its question) and the results card.
//
// These use the live <TowerVisual> component rather than the rasterised sprites —
// outside the swarm there is no density problem, so the UI shows the real
// artwork at full fidelity, animations and all.

import React, { useEffect, useRef, useState } from 'react';
import {
  Coins, Heart, X, ChevronLeft, Skull, Zap, Clock, Swords, Check, Minus, Plus,
} from 'lucide-react';
import TowerVisual from '../towerdefense/TowerVisual';
import { TOWERS } from '../towerdefense/gameData';
import {
  HEROES, LOADOUT_ITEMS, loadoutCost, WEAPONS, MAX_WEAPON_LEVEL, RUN,
} from './survivorData';
import { normalizeAnswer } from './survivorChallenges';
import { fmtTime, fmtScore } from './format';

// =====================================================================
// LOADOUT — where the unit's XP gold is spent
// =====================================================================

export function LoadoutScreen({ gold, tierLabel, mapName, briefing, onDeploy, onBack }) {
  const [heroId, setHeroId] = useState(HEROES[0].typeId);
  const [counts, setCounts] = useState({});

  const spent = loadoutCost(counts, heroId);
  const left = gold - spent;

  // Changing to a hero you cannot afford would strand you at negative gold, so
  // the pick is refused rather than silently rebalanced.
  const pickHero = (h) => {
    const cost = loadoutCost(counts, h.typeId);
    if (cost <= gold) setHeroId(h.typeId);
  };

  const bump = (item, delta) => {
    setCounts(prev => {
      const cur = prev[item.id] || 0;
      const next = Math.max(0, Math.min(item.max, cur + delta));
      const trial = { ...prev, [item.id]: next };
      if (loadoutCost(trial, heroId) > gold) return prev;
      return trial;
    });
  };

  const hero = HEROES.find(h => h.typeId === heroId) || HEROES[0];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-y-auto">
      {/* Clipped: these deliberately hang off the edges, and this screen scrolls,
          so without it they hand the whole page a horizontal scrollbar. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-rose-600 opacity-20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-violet-600 opacity-20 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto p-5 sm:p-8 pb-2">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-lg">Swarm Survivor</h1>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-xs sm:text-sm mt-2">
              {mapName} · {tierLabel}
            </p>
          </div>
          <button
            onClick={onBack}
            className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all border-b-[6px] border-slate-950 active:border-b-0 active:translate-y-[6px] shrink-0"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        </div>

        {briefing && (
          <div className="mb-8 text-slate-300 font-medium text-sm sm:text-base leading-snug bg-black/20 border-l-4 border-rose-500 rounded-r-xl px-5 py-4">
            {briefing}
          </div>
        )}

        {/* Purse */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-[#FFC800] text-amber-950 px-5 py-3 rounded-2xl border-b-4 border-[#D1A300] font-black shadow-md">
            <Coins className="w-5 h-5" fill="currentColor" strokeWidth={1.5} />
            <span className="text-2xl tabular-nums">{left}</span>
            <span className="uppercase tracking-widest text-[10px] pt-1">gold left</span>
          </div>
          <p className="text-slate-400 font-bold text-sm">
            Earned from the XP you banked in this unit. Spend it — none of it carries over.
          </p>
        </div>

        {/* Hero */}
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Choose your fighter</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {HEROES.map(h => {
            const conf = TOWERS[h.typeId];
            const selected = h.typeId === heroId;
            const affordable = loadoutCost(counts, h.typeId) <= gold;
            return (
              <button
                key={h.typeId}
                onClick={() => pickHero(h)}
                disabled={!affordable}
                className={`relative text-left p-4 rounded-3xl border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px]
                  ${selected ? 'bg-[#1CB0F6] border-[#1899D6]' : affordable ? 'bg-slate-800 border-slate-950 hover:bg-slate-700' : 'bg-slate-800/50 border-slate-950 opacity-45 cursor-not-allowed'}`}
              >
                {h.cost > 0 && (
                  <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${selected ? 'bg-white/25 text-white' : 'bg-[#FFC800] text-amber-950'}`}>
                    <Coins className="w-3 h-3" fill="currentColor" strokeWidth={1.5} />{h.cost}
                  </div>
                )}
                {selected && (
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#1CB0F6]" strokeWidth={4} />
                  </div>
                )}
                <div className="flex justify-center my-2">
                  <TowerVisual typeId={h.typeId} size="lg" />
                </div>
                <div className="font-black text-lg leading-tight">{conf?.name}</div>
                <div className={`text-xs font-bold leading-snug mt-1 ${selected ? 'text-white/85' : 'text-slate-400'}`}>
                  {h.tagline}
                </div>
                <div className={`mt-3 flex gap-3 text-[11px] font-black uppercase tracking-wider ${selected ? 'text-white/80' : 'text-slate-500'}`}>
                  <span>{h.hp + (h.hpBonus || 0)} hp</span>
                  <span>{h.speed} spd</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Perk line for the chosen hero */}
        <div className="mb-10 flex items-center gap-3 bg-slate-800 border-b-4 border-slate-950 rounded-2xl px-5 py-4">
          <span className="text-2xl leading-none">{TOWERS[hero.typeId]?.emoji}</span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Starting weapon · {WEAPONS[hero.weapon]?.typeId && TOWERS[hero.weapon]?.name}</div>
            <div className="font-bold text-slate-200 text-sm">{WEAPONS[hero.weapon]?.blurb} <span className="text-emerald-400">{hero.perk}</span></div>
          </div>
        </div>

        {/* Kit */}
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Kit out the run</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {LOADOUT_ITEMS.map(item => {
            const n = counts[item.id] || 0;
            const canAdd = n < item.max && loadoutCost({ ...counts, [item.id]: n + 1 }, heroId) <= gold;
            return (
              <div key={item.id} className={`p-4 rounded-3xl border-b-[6px] transition-colors ${n > 0 ? 'bg-slate-700 border-slate-900' : 'bg-slate-800 border-slate-950'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl leading-none">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-base">{item.name}</div>
                    <div className="text-slate-400 font-bold text-xs leading-snug">{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FFC800] text-amber-950 px-2 py-1 rounded-lg text-[11px] font-black shrink-0">
                    <Coins className="w-3 h-3" fill="currentColor" strokeWidth={1.5} />{item.cost}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1">
                    {Array.from({ length: item.max }).map((_, i) => (
                      <div key={i} className={`w-6 h-2 rounded-full ${i < n ? 'bg-[#58A700]' : 'bg-slate-900'}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => bump(item, -1)} disabled={n === 0}
                      className="w-9 h-9 rounded-xl bg-slate-900 border-b-[3px] border-black/50 active:border-b-0 active:translate-y-[3px] disabled:opacity-30 flex items-center justify-center"
                    ><Minus className="w-4 h-4" strokeWidth={3} /></button>
                    <button
                      onClick={() => bump(item, 1)} disabled={!canAdd}
                      className="w-9 h-9 rounded-xl bg-[#58A700] border-b-[3px] border-[#3f7a00] active:border-b-0 active:translate-y-[3px] disabled:opacity-30 flex items-center justify-center"
                    ><Plus className="w-4 h-4" strokeWidth={3} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky so the kit list can be as long as it likes without the student
            losing the way in. No negative margins here: pulling it wider than the
            container gives the whole screen a horizontal scrollbar. */}
        <div className="sticky bottom-5 z-20 flex justify-center pt-10 pb-2">
          <button
            onClick={() => onDeploy({ heroId, counts })}
            className="px-10 py-5 rounded-3xl bg-[#EA2B2B] border-b-[8px] border-[#a81c1c] active:border-b-0 active:translate-y-[8px] font-black text-xl uppercase tracking-widest shadow-[0_10px_40px_rgba(15,23,42,0.85)] ring-4 ring-slate-900/70 flex items-center gap-3"
          >
            <Swords className="w-6 h-6" strokeWidth={3} /> Hold the line
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// HUD
// =====================================================================

/** Driven by hudSnapshot — plain numbers, refreshed once per frame. */
export function SurvivorHUD({ hud, onQuit }) {
  const hpPct = Math.max(0, hud.hp / hud.maxHp);
  const xpPct = Math.max(0, Math.min(1, hud.xp / hud.xpNext));
  const boss = hud.boss;
  const toBoss = Math.max(0, RUN.bossAtMs - hud.t);

  return (
    <>
      <header className="relative z-30 bg-slate-800 border-b-4 border-slate-950 flex items-center gap-3 px-3 sm:px-5 py-2.5 shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#EA2B2B] border-b-4 border-[#a81c1c] shrink-0">
          <Skull className="w-5 h-5 text-white" strokeWidth={3} />
        </div>

        {/* Health */}
        <div className="flex-1 min-w-0 max-w-xs">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#EA2B2B]" fill="currentColor" /> Health</span>
            <span className="tabular-nums text-slate-300">{Math.ceil(hud.hp)}/{hud.maxHp}</span>
          </div>
          <div className="h-3 rounded-full bg-slate-900 overflow-hidden border border-black/40">
            <div
              className={`h-full transition-[width] duration-100 ${hpPct > 0.5 ? 'bg-[#58A700]' : hpPct > 0.25 ? 'bg-[#FFC800]' : 'bg-[#EA2B2B]'}`}
              style={{ width: `${hpPct * 100}%` }}
            />
          </div>
        </div>

        {/* Level + XP */}
        <div className="hidden sm:block flex-1 min-w-0 max-w-xs">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#FFC800]" fill="currentColor" /> Level {hud.level}</span>
            <span className="tabular-nums text-slate-300">{hud.xp}/{hud.xpNext}</span>
          </div>
          <div className="h-3 rounded-full bg-slate-900 overflow-hidden border border-black/40">
            <div className="h-full bg-[#1CB0F6] transition-[width] duration-100" style={{ width: `${xpPct * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <div className="flex flex-col items-center px-2">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none flex items-center gap-1">
              <Clock className="w-3 h-3" strokeWidth={3} />{hud.bossSpawned ? 'Boss' : 'Time'}
            </div>
            <div className="text-white font-black text-lg leading-tight tabular-nums">{fmtTime(hud.t)}</div>
          </div>
          <div className="hidden xs:flex flex-col items-center px-2">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none">Score</div>
            <div className="text-white font-black text-lg leading-tight tabular-nums">{fmtScore(hud.score)}</div>
          </div>
          {hud.revives > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40">
              <span className="text-base leading-none">💖</span>
              <span className="font-black text-rose-300 text-sm">{hud.revives}</span>
            </div>
          )}
          <button
            onClick={onQuit}
            className="p-2.5 bg-slate-900 hover:bg-rose-500 rounded-2xl transition-all border-b-4 border-black/50 active:border-b-0 active:translate-y-[4px]"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>
      </header>

      {/* Boss bar — only while there is a boss to track. */}
      {boss && (
        <div className="relative z-20 px-4 py-2 bg-slate-950/90 border-b-2 border-rose-900 shrink-0">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">
              <span>The Broodmother</span>
              <span className="tabular-nums">{Math.max(0, Math.ceil(boss.hp))}</span>
            </div>
            <div className="h-3 rounded-full bg-black overflow-hidden border border-rose-900">
              <div className="h-full bg-gradient-to-r from-rose-600 to-red-500" style={{ width: `${Math.max(0, boss.hp / boss.maxHp) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Countdown to the boss, once it is close enough to matter. */}
      {!hud.bossSpawned && toBoss < 30000 && (
        <div className="relative z-20 py-1.5 text-center bg-rose-950/80 border-b-2 border-rose-900 shrink-0">
          <span className="font-black uppercase tracking-widest text-xs text-rose-300 animate-pulse">
            Broodmother in {fmtTime(toBoss)}
          </span>
        </div>
      )}
    </>
  );
}

/** The squad strip — which towers are fighting with you and at what rank. */
export function SquadBar({ squad }) {
  return (
    <div className="relative z-20 flex items-center gap-2 px-3 py-2 bg-slate-800/95 border-t-4 border-slate-950 shrink-0 overflow-x-auto">
      {squad.map((w, i) => {
        const conf = WEAPONS[w.id];
        return (
          <div key={`${w.id}_${i}`} className="flex items-center gap-1.5 bg-slate-900 rounded-2xl pl-1.5 pr-3 py-1 border-b-[3px] border-black/50 shrink-0">
            <div className="scale-[0.62] origin-center w-8 h-8 flex items-center justify-center">
              <TowerVisual typeId={w.id} size="md" />
            </div>
            <div className="leading-none">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-wide">{TOWERS[w.id]?.name}</div>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: MAX_WEAPON_LEVEL }).map((_, k) => (
                  <div key={k} className={`w-1.5 h-1.5 rounded-full ${k < w.level ? 'bg-[#FFC800]' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
            {i === 0 && <span className="text-[8px] font-black uppercase text-[#1CB0F6] tracking-widest ml-1">You</span>}
            {conf?.kind === 'AURA' && <span className="text-[8px] font-black uppercase text-emerald-400 tracking-widest ml-1">Aura</span>}
          </div>
        );
      })}
    </div>
  );
}

// =====================================================================
// LEVEL UP — the draft, gated by a question
// =====================================================================

/**
 * Answer the question and you pick your upgrade; skip it or miss it and the run
 * picks for you. The level always happens either way — the question buys CHOICE,
 * which in this genre is the whole game.
 */
export function LevelUpModal({ level, cards, challenge, onPick }) {
  // Mounted fresh for every level-up (the shell keys it on the level), so the
  // initial state IS the reset — no effect has to undo the previous question.
  const [phase, setPhase] = useState(challenge ? 'ASK' : 'PICK');
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(false);
  const [revealed, setRevealed] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'ASK' && challenge?.mode === 'TYPE') {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, challenge]);

  // Both answers pause on the reveal before moving on. A right answer that
  // snapped straight to the upgrade cards taught nothing — the point of asking is
  // that the word (with its example sentence and gloss) is SEEN, and the moment
  // a student is most receptive to it is the second after they got it right.
  const settle = (correct) => {
    setRevealed({ correct, answer: challenge.answer, reveal: challenge.reveal });
    setPhase('REVEAL');
    if (correct) {
      timerRef.current = setTimeout(() => setPhase('PICK'), 1400);
    } else {
      setWrong(true);
      // A miss still levels you — the run just rolls the card itself, after a
      // beat long enough to read the right answer.
      timerRef.current = setTimeout(
        () => onPick(cards[Math.floor(Math.random() * cards.length)], false),
        2100
      );
    }
  };

  // The modal can be torn down mid-beat (the run ends, the student quits), and a
  // pending onPick firing into an unmounted run would apply a phantom upgrade.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const submitTyped = (e) => {
    e.preventDefault();
    settle(normalizeAnswer(input) === normalizeAnswer(challenge.answer));
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-auto animate-in zoom-in-95 duration-200">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-[#FFC800] text-amber-950 px-5 py-2 rounded-2xl border-b-4 border-[#D1A300] font-black uppercase tracking-widest text-sm">
            <Zap className="w-5 h-5" fill="currentColor" strokeWidth={1.5} /> Level {level}
          </div>
        </div>

        {/* The question */}
        {challenge && phase !== 'PICK' && (
          <div className={`bg-white rounded-[2rem] border-b-8 p-6 sm:p-8 mb-5 ${wrong ? 'border-rose-300' : 'border-slate-200'}`}>
            <div className="text-center mb-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {challenge.kind === 'MATH' ? 'Answer to choose your upgrade' : 'Which word means this?'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 leading-snug">{challenge.prompt}</div>
            </div>

            {revealed ? (
              <div className={`text-center rounded-2xl p-4 ${revealed.correct ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                <div className={`font-black text-xl ${revealed.correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {revealed.correct ? `Correct — pick your upgrade!` : `Answer: ${revealed.answer}`}
                </div>
                {revealed.reveal?.sent && (
                  <div className="text-slate-500 font-bold text-sm mt-2 italic">“{revealed.reveal.sent}”</div>
                )}
                {revealed.reveal?.vn && (
                  <div className="text-slate-400 font-bold text-sm mt-1">{revealed.reveal.vn}</div>
                )}
                {!revealed.correct && (
                  <div className="text-rose-500 font-bold text-xs mt-3 uppercase tracking-widest">Rolling an upgrade for you…</div>
                )}
              </div>
            ) : challenge.mode === 'CHOICE' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.choices.map(c => (
                  <button
                    key={c}
                    onClick={() => settle(normalizeAnswer(c) === normalizeAnswer(challenge.answer))}
                    className="px-5 py-4 rounded-2xl bg-slate-100 hover:bg-[#1CB0F6] hover:text-white border-b-4 border-slate-300 hover:border-[#1899D6] active:border-b-0 active:translate-y-[4px] font-black text-lg text-slate-700 transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={submitTyped} className="flex gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your answer"
                  className="flex-1 px-5 py-4 rounded-2xl bg-slate-100 border-2 border-slate-300 focus:border-[#1CB0F6] focus:outline-none font-black text-lg text-slate-800"
                />
                <button type="submit" className="px-6 py-4 rounded-2xl bg-[#58A700] border-b-4 border-[#3f7a00] active:border-b-0 active:translate-y-[4px] text-white font-black uppercase tracking-widest">
                  Check
                </button>
              </form>
            )}

            {!revealed && (
              <button
                onClick={() => onPick(cards[Math.floor(Math.random() * cards.length)], false)}
                className="w-full mt-4 py-2 text-slate-400 hover:text-slate-600 font-black uppercase tracking-widest text-xs"
              >
                Skip — take a random upgrade
              </button>
            )}
          </div>
        )}

        {/* The draft */}
        {phase === 'PICK' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map(card => (
              <button
                key={card.key}
                onClick={() => onPick(card, true)}
                className={`text-left p-5 rounded-[1.75rem] border-b-[8px] active:border-b-0 active:translate-y-[8px] transition-all
                  ${card.kind === 'RECRUIT' ? 'bg-[#1CB0F6] border-[#1899D6]' : card.kind === 'WEAPON' ? 'bg-[#58A700] border-[#3f7a00]' : 'bg-slate-700 border-slate-900'}`}
              >
                <div className="flex items-center justify-center h-20 mb-3">
                  {card.kind === 'PERK'
                    ? <span className="text-5xl leading-none">{card.icon}</span>
                    : <TowerVisual typeId={card.weaponId} size="xl" />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">{card.subtitle}</div>
                <div className="font-black text-white text-xl leading-tight mb-2">{card.title}</div>
                <div className="text-white/85 font-bold text-sm leading-snug">{card.desc}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================================
// RESULTS
// =====================================================================

export function RunEndModal({ outcome, score, best, kills, time, level, onRetry, onExit }) {
  const won = outcome === 'WON';
  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/92 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] border-b-8 border-slate-200 p-8 text-center max-w-md w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="text-6xl mb-4">{won ? '🏆' : '💀'}</div>
        <div className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
          {won ? 'Broodmother Down' : 'Overwhelmed'}
        </div>
        <div className="text-base font-bold text-slate-500 mb-6">
          {won ? 'You held the line to the very end.' : 'The swarm got through.'}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[['Time', time], ['Kills', kills], ['Level', level]].map(([label, value]) => (
            <div key={label} className="bg-slate-100 rounded-2xl py-3">
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</div>
              <div className="text-xl font-black text-slate-700 tabular-nums">{value}</div>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl py-4 mb-6 shadow-inner">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Final Score</div>
          <div className="text-4xl font-black text-[#EA2B2B] tabular-nums">{Math.round(score).toLocaleString()}</div>
          {score >= best && score > 0 && <div className="text-sm font-bold text-[#FFC800] mt-1">New Best!</div>}
        </div>

        <div className="flex gap-3">
          <button onClick={onRetry} className="flex-1 px-5 py-4 rounded-2xl bg-[#58A700] border-b-4 border-[#3f7a00] active:border-b-0 active:translate-y-[4px] text-white font-black uppercase tracking-widest text-sm">
            Play Again
          </button>
          <button onClick={onExit} className="flex-1 px-5 py-4 rounded-2xl bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-600 font-black uppercase tracking-widest text-sm">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

/** Shown while spriteForge rasterises the artwork for the canvas. */
export function ForgeSplash() {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-slate-900 text-white gap-4">
      <div className="text-5xl animate-bounce">🐜</div>
      <div className="font-black uppercase tracking-widest text-slate-400 text-sm animate-pulse">
        Preparing the swarm…
      </div>
    </div>
  );
}
