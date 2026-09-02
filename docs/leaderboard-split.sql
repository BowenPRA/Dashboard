-- =============================================================================
-- Split the arcade leaderboard into one board per game.
--
-- HOW TO RUN: Supabase Studio -> SQL Editor -> paste all of this -> Run.
-- DDL cannot be applied from the app: the service-role key only reaches
-- PostgREST, not the database directly. Safe to run repeatedly.
--
-- WHAT IT CHANGES
-- ---------------
-- `get_unit_leaderboard` read one hard-coded key, 'GAMES', which was right when
-- the arcade had one cabinet. It now has two — Tower Defense and Swarm Survivor
-- — and they score on completely different scales, so a pooled board would rank
-- a good defence against a good escape and tell a student nothing about either.
-- Each game now writes its own key in a unit's progress:
--
--     progress -> <track> -> <unitId> -> 'GAMES'     Tower Defense
--     progress -> <track> -> <unitId> -> 'SURVIVOR'  Swarm Survivor
--
-- so the function takes a second argument naming which board to read. The body
-- is otherwise the track-agnostic version from FIX_LEADERBOARD.sql (2026-08-28),
-- unchanged: it scans every track for the unit id, so new tracks keep working.
--
-- SAFE TO RUN WHILE THE SITE IS LIVE
-- ----------------------------------
-- `target_key` DEFAULTs to 'GAMES', so a client that still calls with one
-- argument resolves to this same function and sees exactly the Tower Defense
-- scores it saw before. Deploy order does not matter, and no existing score
-- moves: every Tower Defense score ever saved is already under 'GAMES'.
-- =============================================================================

-- Drop any existing overloads by name (the return type or arity may differ, so
-- CREATE OR REPLACE is not enough on its own).
do $$
declare r record;
begin
  for r in
    select p.oid::regprocedure::text as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'get_unit_leaderboard'
  loop
    execute 'drop function ' || r.sig;
  end loop;
end $$;

create function public.get_unit_leaderboard(
  target_unit_id text,
  target_key     text default 'GAMES'
)
returns table (id uuid, name text, score int)
language sql
stable
security definer
set search_path = public
as $$
  select
    s.id,
    coalesce(nullif(btrim(s.display_name), ''), 'Student') as name,
    max( floor( (u.value #>> array[target_key, 'current'])::numeric )::int ) as score
  from public.students s
       cross join lateral jsonb_each(coalesce(s.progress, '{}'::jsonb)) as t(track_key, track_val)
       cross join lateral jsonb_each(
         case when jsonb_typeof(t.track_val) = 'object' then t.track_val else '{}'::jsonb end
       ) as u(unit_key, value)
  where u.unit_key = target_unit_id
    -- Only the arcade's own keys are readable. Without this allow-list the
    -- argument would be a free hand to read ANY key of a unit's progress —
    -- task records included — through a security-definer function.
    and target_key in ('GAMES', 'SURVIVOR')
    and jsonb_typeof(u.value) = 'object'
    and (u.value #>> array[target_key, 'current']) ~ '^[0-9]+(\.[0-9]+)?$'
    and (u.value #>> array[target_key, 'current'])::numeric > 0
  group by s.id, s.display_name
  order by score desc
  limit 100;
$$;

grant execute on function public.get_unit_leaderboard(text, text) to anon, authenticated;

-- Check it. The first should list Tower Defense scores exactly as before; the
-- second is the new Survivor board (empty until someone plays it); the third
-- proves the one-argument call an older client sends still resolves.
--
--   select * from get_unit_leaderboard('U01_1', 'GAMES');
--   select * from get_unit_leaderboard('U01_1', 'SURVIVOR');
--   select * from get_unit_leaderboard('U01_1');
--
-- KNOWN LIMITATION (unchanged by this migration): unit ids that repeat across
-- tracks — MATH_1A in GED_MATH and Y8, SCIENCE_1A in Y8 and Y9 — still pool both
-- classes onto one board; that is what the `max(...) group by student` is doing.
-- Boards per-(track, unit) would need a third argument here AND a matching
-- change in getGlobalGameLeaderboard / Games.jsx.
