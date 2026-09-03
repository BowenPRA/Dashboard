import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TRACK_REGISTRY } from '../components/trackRegistry';
import { recordAttempt, mergeVocab, VOCAB_KEY, WALLET_KEY, ARCADE_KEY, isArcadeKey } from './progressSchema';
import { ARCADE_TRACK_ID } from '../components/trackRegistry';

// The single Supabase client for the whole app. Having a second createClient in
// another module spins up a second GoTrueClient on the same storage key, which
// Supabase warns about and which caused subtly divergent auth/session reads.
// `process` only exists once the production build has substituted it. Reading it
// unguarded throws `process is not defined` on the bare dev server, which took
// down every screen that transitively imports this module.
const nodeEnv = typeof process !== 'undefined' && process.env ? process.env : {};
const supabaseUrl = nodeEnv.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = nodeEnv.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * The top scores for one unit on one of the arcade's boards.
 *
 * `boardKey` is a progress key (see ARCADE_BOARDS) and reaches the server as the
 * RPC's second argument, so each cabinet ranks on its own board.
 *
 * The two-argument function is `docs/leaderboard-split.sql`, which has to be
 * applied by hand in the Supabase SQL editor — DDL cannot be run from the app.
 * Until someone does, the deployed site would otherwise show a network error on
 * a board that is simply not built yet, so this distinguishes the two cases:
 * PostgREST answers PGRST202 ("no function matches") when the new signature is
 * missing, and only then does this fall back. The old one-argument function read
 * the Tower Defense key and nothing else, so it can still answer honestly for
 * that board; for any newer board it reports `pending`, which the hub shows as
 * "not switched on yet" rather than as a failure.
 */
export const getGlobalGameLeaderboard = async (unitId, limit = 5, boardKey = ARCADE_KEY) => {
  const topN = (rows) => (rows || []).sort((a, b) => b.score - a.score).slice(0, limit);

  try {
    const { data, error } = await supabase.rpc('get_unit_leaderboard', {
      target_unit_id: unitId,
      target_key: boardKey,
    });
    if (!error) return { data: topN(data), error: null };

    if (error.code !== 'PGRST202') throw error;

    if (boardKey === ARCADE_KEY) {
      const legacy = await supabase.rpc('get_unit_leaderboard', { target_unit_id: unitId });
      if (legacy.error) throw legacy.error;
      return { data: topN(legacy.data), error: null };
    }
    return { data: null, error: null, pending: true };
  } catch (err) {
    console.error('Failed to parse leaderboard profiles:', err);
    return { data: null, error: err.message };
  }
};

export function useStudentProgress(navigate, track = 'GED_MATH') {
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
      const newFormat = {};

      validTracks.forEach(t => {
        newFormat[t] = dbProgress[t] || {};
      });

      const isSuperOldFormat = !Object.keys(dbProgress).some(key => ['Y8', 'Y9', 'ESL', 'GED', 'GED_MATH', 'GED_ENG', 'ADD_MATH', 'GED_HISTORY'].includes(key)) && Object.keys(dbProgress).length > 0;

      if (isSuperOldFormat) {
        newFormat['GED_MATH'] = dbProgress;
        needsUpdate = true;
      } else {
        const hasInvalidKeys = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (hasInvalidKeys) {
          if (dbProgress['GED'] && Object.keys(newFormat['GED_ENG']).length === 0) {
            newFormat['GED_ENG'] = dbProgress['GED'];
          }
          needsUpdate = true;
        } else {
          validTracks.forEach(t => {
            if (!dbProgress[t]) needsUpdate = true;
          });
        }
      }

      setAllProgress(newFormat);

      if (needsUpdate) {
        await supabase.from('students').update({ progress: newFormat }).eq('id', session.user.id);
      }

      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  /**
   * Save one completed attempt.
   *
   * `meta` is the task's memory of what just happened:
   *   items — [{ itemId, correct }] per-question log, for targeted review
   *   vocab — [{ word, correct }]   per-word results, for the track's word bank
   * A task that passes neither still saves exactly as it always did.
   */
  const saveScore = async (unitId, section, score, answers = null, meta = {}) => {
    // Functional update with a deep clone entirely prevents stale closures when
    // several tasks save in quick succession.
    setAllProgress(prev => {
      const newProgress = JSON.parse(JSON.stringify(prev));

      if (!newProgress[track]) newProgress[track] = {};
      if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

      newProgress[track][unitId][section] = recordAttempt(
        newProgress[track][unitId][section], score, answers, meta
      );

      // The arcade reports a raw game score in the thousands, but its task XP is
      // clamped to a handful of points — so the leaderboard cannot read the XP
      // key or every student would be tied. The unclamped score is kept beside
      // it, in this same update so it survives the next save.
      //
      // `meta.arcadeKey` names which cabinet's board it belongs on. It is
      // validated rather than trusted: it decides a key written into the
      // progress JSON, and an unrecognised value would either invent a board
      // nothing reads or shadow a real task record. Anything unknown falls back
      // to the Tower Defense board, which is where an arcade score went before
      // there was a second game.
      if (meta.arcadeScore != null) {
        const boardKey = isArcadeKey(meta.arcadeKey) ? meta.arcadeKey : ARCADE_KEY;
        newProgress[track][unitId][boardKey] = recordAttempt(
          newProgress[track][unitId][boardKey], meta.arcadeScore
        );
      }

      if (meta.vocab?.length) {
        newProgress[track][VOCAB_KEY] = mergeVocab(newProgress[track][VOCAB_KEY], meta.vocab);
      }

      // Fire and forget so the UI doesn't wait on the round-trip.
      supabase.from('students').update({ progress: newProgress }).eq('id', user.id)
        .then(({ error }) => { if (error) console.error("Supabase Save Error:", error); });

      return newProgress;
    });
  };

  /**
   * Charge a play. Gold spent is a single running total in the arcade track's
   * wallet — always the arcade bucket, whatever `track` this hook was opened
   * for. Gold earned is derived from XP (see arcade/economy.js), so nothing but
   * this total needs saving. Returns the new spent total from the functional
   * update so a caller can act on it without waiting for a re-render.
   */
  const spendGold = (cost) => {
    let nextSpent = 0;
    setAllProgress(prev => {
      const newProgress = JSON.parse(JSON.stringify(prev));
      if (!newProgress[ARCADE_TRACK_ID]) newProgress[ARCADE_TRACK_ID] = {};
      const wallet = newProgress[ARCADE_TRACK_ID][WALLET_KEY] || { spent: 0 };
      nextSpent = (Number(wallet.spent) || 0) + (Number(cost) || 0);
      newProgress[ARCADE_TRACK_ID][WALLET_KEY] = { ...wallet, spent: nextSpent };

      supabase.from('students').update({ progress: newProgress }).eq('id', user.id)
        .then(({ error }) => { if (error) console.error("Supabase Save Error:", error); });

      return newProgress;
    });
    return nextSpent;
  };

  const addStrike = async (unitId, newStrikes) => {
    setAllProgress(prev => {
      const newProgress = JSON.parse(JSON.stringify(prev));

      if (!newProgress[track]) newProgress[track] = {};
      if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

      newProgress[track][unitId].strikes = newStrikes;

      supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
      return newProgress;
    });
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
    spendGold,
    addStrike,
    handleLogout
  };
}
