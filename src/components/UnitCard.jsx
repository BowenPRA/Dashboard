import React from 'react';
import {
  Languages, BookOpen, Lock, Award, AlertCircle,
  ChevronDown, Globe, Atom, Leaf, GraduationCap,
  Microscope, Telescope, Brain, Rocket, Calculator, Dna, FlaskConical,
  Compass, Lightbulb, Activity, Zap, Landmark, Magnet, Move3d, Grid3x3, Hash,
  Boxes, Layers, ScanEye, History, MonitorPlay, ExternalLink, Variable, Droplets,
  Thermometer, Sigma, Orbit, SquareRadical, Blend, Keyboard, MousePointerClick, Wrench, Check, Play, ChevronRight,
  TriangleRight, Combine, Star
} from 'lucide-react';
import { resolveUnitTasks, resolveTask, unitXPOf } from '../tasks/taskRegistry';
import { ARCADE_KEYS } from '../utils/progressSchema';
import { classroomLessonsOf, classroomLessonUrl } from '../utils/classroomLink';
import { canResume, suggestNextTask } from '../utils/nextTask';

const IconMap = {
  "Award": Award, "GraduationCap": GraduationCap, "BookOpen": BookOpen,
  "Globe": Globe, "Atom": Atom, "Leaf": Leaf, "Languages": Languages,
  "Microscope": Microscope, "Telescope": Telescope, "Brain": Brain,
  "Rocket": Rocket, "Calculator": Calculator, "Dna": Dna, "FlaskConical": FlaskConical,
  "Compass": Compass, "Lightbulb": Lightbulb, "Activity": Activity, "Zap": Zap,
  "Landmark": Landmark, "Magnet": Magnet, "Move3d": Move3d, "Grid3x3": Grid3x3,
  "Hash": Hash, "Boxes": Boxes, "Layers": Layers, "ScanEye": ScanEye,
  "Variable": Variable, "Droplets": Droplets, "Thermometer": Thermometer, "Sigma": Sigma,
  "Orbit": Orbit, "SquareRadical": SquareRadical, "Blend": Blend,
  "Keyboard": Keyboard, "MousePointerClick": MousePointerClick, "TriangleRight": TriangleRight, "Combine": Combine
};

// Task labels, icons and colours now live in src/tasks/taskRegistry.js so the card
// and the launcher cannot drift apart.

/**
 * A phase's display name. The data titles its phases "Phase 0: Lesson" — an
 * authoring label that reads as jargon to a student, and counts from zero. The
 * card numbers the steps itself (1, 2, 3), so only the name after the colon is
 * shown. Titles without the prefix ("Learn", "Drill") pass through untouched.
 * "& Arcade" goes too: the games left the units for the Arcade track (see
 * resolveUnitTasks), so a step named "Quiz & Arcade" now only holds the quiz.
 */
const phaseName = (title = '') =>
  String(title)
    .replace(/^\s*phase\s*\d+\s*[:.\-–—]\s*/i, '')
    .replace(/\s*&\s*arcade\s*$/i, '')
    .trim() || String(title);

/**
 * The ring round a unit's icon: how much of the unit's 100 XP is banked. One
 * glance down the list shows which units are untouched, part done and full,
 * without a number or a medal colour on every row.
 */
function ProgressRing({ value = 0, colorClass = 'text-sky-500', children }) {
  const r = 25;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" className="stroke-slate-200 dark:stroke-slate-800" />
        {value > 0 && (
          <circle
            cx="28" cy="28" r={r} fill="none" strokeWidth="5" strokeLinecap="round"
            stroke="currentColor" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(value, 100) / 100)}
            className={`${colorClass} transition-[stroke-dashoffset] duration-700`}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/**
 * The one thing to do next in a unit, and why — a single tap into the task.
 * `inset` is the version drawn as the foot of a closed card.
 */
function NextStep({ suggestion, onStart, inset = false }) {
  const { task, note } = suggestion;
  return (
    <button
      onClick={onStart}
      className={`group/next w-full flex items-center gap-3 text-left transition-colors
        ${inset
          ? 'px-4 sm:px-5 py-2.5 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-b-[1.1rem] sm:rounded-b-[1.35rem]'
          : 'p-2.5 pr-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
    >
      <span className="hidden sm:block pl-1 text-[10px] font-black uppercase tracking-widest text-slate-400 flex-shrink-0">Next</span>
      <span className={`flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-lg border-b-[3px] text-xs sm:text-sm font-black tracking-wide flex-shrink-0 ${task.color.bg} ${task.color.border} ${task.color.text}`}>
        <Play className="w-3 h-3 fill-current" strokeWidth={2.5} />
        {task.label}
      </span>
      <span className="min-w-0 flex-1 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 truncate">{note}</span>
      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 transition-transform group-hover/next:translate-x-0.5 group-hover/next:text-slate-500" strokeWidth={3} />
    </button>
  );
}

/**
 * `unitLock` is `{ need, prevTitle, prevXP }` when the PREVIOUS unit has not
 * scored enough to open this one (a `unitGate` track — see trackRegistry), and
 * null whenever the unit is available. The card then refuses to expand: the
 * phase locks inside it are about pacing within a unit, while this one is about
 * the order the units are taken in, so it has to sit outside them.
 *
 * `number` is the coursebook number ("2.3") where the track has one. The card is
 * deliberately quiet when closed — a ring, the title, one line of description
 * (none on a phone), the XP — because a track is a LIST of these and the list
 * keeps growing. Everything else comes out when it is opened.
 *
 * `complete` is the track's verdict (taskRegistry.isUnitComplete: 100 XP, or
 * 80+ with the quiz sat): a green tick. A full 100 gets the gold star.
 *
 * `needsWork` puts the suggested next task on the foot of the CLOSED card. The
 * track page only asks for it when it has no "Continue" banner of its own; an
 * open card always leads with its next step.
 */
export default function UnitCard({ unit, scores = {}, currentTheme = {}, startMode, isExpanded, onToggle, needsWork, previewAll = false, unitLock = null, number = '', complete = false }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;
  const unitPhases = unit.phases || [];

  const unitXP = unitXPOf(unit, scores);
  const perfect = unitXP >= 100;
  const done = complete || perfect;

  const themeBg = currentTheme.bg || 'bg-sky-500';
  const themeText = currentTheme.text || 'text-sky-600 dark:text-sky-400';

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  // Raw arcade high score, kept outside the XP keys — see progressSchema. The
  // arcade has a board per cabinet; this one badge is "your best arcade run on
  // this unit", so it takes whichever game they did better at.
  const arcadeBest = ARCADE_KEYS.reduce(
    (best, key) => Math.max(best, scores[key]?.current || 0),
    0
  );

  // Resolved against the registry: carries label/icon/colour/dbKey/maxXP plus
  // `locked` (phase threshold not met, or a phase `requires` gate unmet) and
  // `empty` (unit has no data for it). `scores` lets the attempt-gate see
  // whether the required task (e.g. the assessment) has a progress record yet.
  const allTasks = resolveUnitTasks(unit, unitXP, scores);

  // The one thing to do next, and why (nextTask.js): on the foot of a closed
  // card the track is nudging towards, and at the top of any open unit that is
  // not finished yet.
  const wantSuggestion = !unitLock && (needsWork || (isExpanded && !done));
  const suggestion = wantSuggestion ? suggestNextTask(unit, scores, allTasks, unitXP, previewAll) : null;
  const start = (taskId) => startMode(unit.id, taskId);

  const renderTaskButton = (task, isLocked = false) => {
    if (!task) return null;

    const config = task.color;
    const TaskIcon = task.icon;
    const taskMaxXP = task.maxXP;
    const taskScore = Math.min(scores[task.dbKey]?.current || 0, taskMaxXP);
    const taskDone = taskMaxXP > 0 && taskScore >= taskMaxXP;
    const fixCount = task.fixCount ? task.fixCount(unit, scores[task.dbKey], taskMaxXP) : 0;
    const resumable = !isLocked && !fixCount && canResume(scores[task.dbKey], taskMaxXP);

    // Every tile is a solid block in its task's own colour, the same size, so a
    // step reads as a row of bright, pressable buttons.
    const tileShape = 'relative flex flex-col items-center justify-between w-full h-32 sm:h-36 p-3 sm:p-4 rounded-[1.5rem]';

    if (task.empty) {
      return (
        <div key={task.id} className={`${tileShape} justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 opacity-70`}>
          <TaskIcon className="w-8 h-8 mb-2 opacity-40" strokeWidth={2} />
          <span className="font-bold text-xs tracking-widest uppercase text-center">No {task.label}</span>
        </div>
      );
    }

    // The strip along the bottom: XP won so far, filling as it is earned. A
    // task worth no XP is a reward, not a grade — the arcade's prize is its
    // high score, so it shows that rather than a meaningless "0 / 0 XP". Behind
    // a locked step's glass it says what the task is worth.
    const xpLabel = taskMaxXP === 0
      ? (arcadeBest > 0 ? `Best ${arcadeBest.toLocaleString()}` : 'Bonus')
      : isLocked ? `${taskMaxXP} XP` : `${taskScore} / ${taskMaxXP} XP`;
    const body = (
      <>
        <span className="flex flex-col items-center mt-1">
          <TaskIcon className="w-7 h-7 sm:w-8 sm:h-8 mb-1.5 drop-shadow-sm" strokeWidth={2.5} />
          <span className="font-black text-base sm:text-lg tracking-wide leading-tight text-center drop-shadow-sm">{task.label}</span>
        </span>
        <span className="relative w-full mt-auto rounded-xl py-1.5 bg-black/15 overflow-hidden flex items-center justify-center">
          {!isLocked && taskMaxXP > 0 && (
            <span className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-500" style={{ width: `${(taskScore / taskMaxXP) * 100}%` }} />
          )}
          <span className="relative text-[10px] font-black uppercase tracking-[0.15em] text-white/90 tabular-nums">{xpLabel}</span>
        </span>
      </>
    );

    // Locked: the same bright tile, seen through the step's frosted-glass pane
    // (which says what opens it). Not a button — nothing behind the glass can
    // be pressed.
    if (isLocked) {
      return (
        <div key={task.id} className={`${tileShape} border-b-[6px] ${config.bg} ${config.border} ${config.text}`}>
          {body}
        </div>
      );
    }

    return (
      <button
        key={task.id}
        onClick={() => start(task.id)}
        title={task.label}
        className={`${tileShape} border-b-[6px] ${config.bg} ${config.border} ${config.text} transition-all duration-150 hover:brightness-110 active:border-b-0 active:translate-y-[6px] cursor-pointer`}
      >
        {/* A finished task with mistakes it lets the student put right (Notes):
            it reopens on its results, one tap from redoing just those. */}
        {fixCount > 0 && (
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[9px] font-black uppercase tracking-widest shadow-sm">
            <Wrench className="w-3 h-3" strokeWidth={3} /> Fix {fixCount}
          </span>
        )}
        {/* Saved work waiting: the task reopens where it was left. */}
        {resumable && (
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-slate-700 text-[9px] font-black uppercase tracking-widest shadow-sm">
            <History className="w-3 h-3" strokeWidth={3} /> Continue
          </span>
        )}
        {/* Full marks. */}
        {taskDone && !fixCount && (
          <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow-sm" title="Full marks">
            <Check className="w-3.5 h-3.5" strokeWidth={4} />
          </span>
        )}
        {body}
      </button>
    );
  };

  // What sits in the ring: a lock, the finished marks, or the unit's own icon.
  let marker;
  if (unitLock) {
    marker = <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" strokeWidth={2.5} />;
  } else if (perfect) {
    marker = (
      <span className="w-[76%] h-[76%] rounded-full bg-amber-400 border-b-[3px] border-amber-600 flex items-center justify-center">
        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" strokeWidth={2} />
      </span>
    );
  } else if (done) {
    marker = (
      <span className="w-[76%] h-[76%] rounded-full bg-emerald-500 border-b-[3px] border-emerald-700 flex items-center justify-center">
        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={4} />
      </span>
    );
  } else {
    marker = <HeaderIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${unitXP > 0 ? themeText : 'text-slate-400 dark:text-slate-500'}`} strokeWidth={2.5} />;
  }

  // Numbered from 1 over the phases actually shown (a phase whose only task
  // was filtered out, like the old in-unit arcade, takes no number).
  const shownPhases = unitPhases
    .map((phase) => ({ phase, tasks: allTasks.filter((t) => t.phaseId === phase.id) }))
    .filter((p) => p.tasks.length > 0);

  return (
    <div className={`relative w-full rounded-[1.25rem] sm:rounded-3xl bg-white dark:bg-slate-900 border-2 border-b-4 transition-colors duration-200
      ${isExpanded && !unitLock
        ? 'border-slate-300 dark:border-slate-700 shadow-md shadow-slate-200/60 dark:shadow-none'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}>

      <div
        onClick={unitLock ? undefined : onToggle}
        role="button"
        tabIndex={unitLock ? -1 : 0}
        aria-expanded={isExpanded && !unitLock}
        aria-disabled={unitLock ? true : undefined}
        onKeyDown={(e) => {
          if (unitLock || e.target !== e.currentTarget) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
        }}
        className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-[1.1rem] sm:rounded-[1.35rem] ${unitLock ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <ProgressRing value={unitLock || done ? 0 : unitXP} colorClass={themeText}>
          {marker}
        </ProgressRing>

        <div className={`min-w-0 flex-1 ${unitLock ? 'opacity-70' : ''}`}>
          <h2 className="text-base sm:text-xl font-black text-slate-800 dark:text-white tracking-tight leading-snug">
            {number && <span className={`mr-1.5 sm:mr-2 tabular-nums ${unitLock ? 'text-slate-400' : themeText}`}>{number}</span>}
            {title || 'Unit Title'}
          </h2>
          {/* A locked unit says what opens it, not what is in it — naming the
              unit before it and the number needed is the only thing the
              student can act on from here. */}
          {unitLock ? (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm">
              Score <span className="text-slate-700 dark:text-slate-200">{unitLock.need} XP</span> in
              {' '}<span className="text-slate-700 dark:text-slate-200">{unitLock.prevTitle}</span> to unlock
              {' '}<span className="text-slate-400 dark:text-slate-500">({unitLock.prevXP} so far)</span>
            </p>
          ) : (
            // On a phone the description is never squeezed in beside the XP:
            // it is dropped while the card is closed, and shown full width
            // at the top of the open card instead.
            <p className={`mt-0.5 max-sm:hidden text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm ${isExpanded ? '' : 'line-clamp-1'}`}>
              {description || 'Complete the tasks below.'}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {!unitLock && (
            perfect ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-black tabular-nums whitespace-nowrap" title="Full marks: 100 / 100 XP">
                <Star className="w-3.5 h-3.5 fill-current" strokeWidth={2} /> 100
              </span>
            ) : done ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black whitespace-nowrap" title={`Finished with ${unitXP} XP. Keep going for the full 100!`}>
                <Check className="w-3.5 h-3.5" strokeWidth={4} /> Done
                <span className="hidden sm:inline tabular-nums font-bold opacity-70 ml-0.5">· {unitXP}</span>
              </span>
            ) : (
              <span className="text-right leading-none whitespace-nowrap">
                <span className={`text-base sm:text-lg font-black tabular-nums ${unitXP > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>{unitXP}</span>
                <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 tabular-nums">/100 XP</span>
              </span>
            )
          )}

          <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors
            ${unitLock
              ? 'text-slate-300 dark:text-slate-600'
              : isExpanded
                ? `${themeBg} text-white`
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
            {unitLock
              ? <Lock className="w-4 h-4" strokeWidth={3} />
              : <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={3} />}
          </span>
        </div>
      </div>

      {/* The nudged unit, closed: one tap from the list straight into its task. */}
      {suggestion && !isExpanded && <NextStep inset suggestion={suggestion} onStart={() => start(suggestion.task.id)} />}

      {isExpanded && !unitLock && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200 border-t-2 border-slate-100 dark:border-slate-800 px-3 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6 space-y-5">
          <p className="sm:hidden text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
            {description || 'Complete the tasks below.'}
          </p>

          {isAILocked && (
            <div className="bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-800 p-4 rounded-2xl flex items-start">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-rose-800 dark:text-rose-300">AI Safety Lock Engaged</h4>
                <p className="text-rose-600 dark:text-rose-400 text-sm font-bold mt-1">Due to repeated inappropriate inputs, AI grading has been disabled for this unit.</p>
              </div>
            </div>
          )}

          {suggestion && <NextStep suggestion={suggestion} onStart={() => start(suggestion.task.id)} />}

          {/* The classroom twin: the projected deck this unit was taught from.
              Missed the lesson, or want it again before the tasks? Watch it. */}
          {classroomLessonsOf(unit.meta).length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-1">
                <MonitorPlay className="w-4 h-4" strokeWidth={2.5} /> From the classroom
              </span>
              {classroomLessonsOf(unit.meta).map((c) => (
                <a
                  key={`${c.course}/${c.slug}`}
                  href={classroomLessonUrl(c)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-b-[3px] text-xs font-black text-slate-600 dark:text-slate-300 hover:border-[#1cb0f6] hover:text-[#1899d6] active:border-b-2 active:translate-y-[1px] transition-all"
                >
                  {c.title || `${c.course} · ${c.slug}`}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          )}

          {/* The phases as numbered steps down a path: each says plainly what it
              is worth so far, or exactly what opens it. */}
          <ol className="space-y-6">
            {shownPhases.map(({ phase, tasks: phaseTasks }, i) => {
              // Single source of truth for the lock: a phase is locked when
              // any of its resolved tasks is locked, which folds in both the
              // XP threshold and an optional `requires` attempt-gate (§6.4).
              const isPhaseLocked = !previewAll && phaseTasks.some((t) => t.locked);
              const graded = phaseTasks.filter((t) => !t.empty && t.maxXP > 0);
              const phaseMax = graded.reduce((s, t) => s + t.maxXP, 0);
              const phaseXP = graded.reduce((s, t) => s + Math.min(scores[t.dbKey]?.current || 0, t.maxXP), 0);
              const phaseDone = phaseMax > 0 && phaseXP >= phaseMax;
              const toGo = (phase.threshold || 0) - unitXP;
              const lockNote = toGo > 0
                ? `Earn ${phase.threshold} XP to unlock`
                : `Do the ${resolveTask({ id: phase.requires })?.label || 'task before it'} to unlock`;
              const isLast = i === shownPhases.length - 1;

              return (
                <li key={phase.id} className="relative">
                  {/* The path joining this step's number to the next one's. */}
                  {!isLast && <span aria-hidden="true" className="hidden sm:block absolute left-4 top-10 -bottom-5 w-0.5 -translate-x-1/2 rounded-full bg-slate-100 dark:bg-slate-800" />}

                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black
                      ${phaseDone
                        ? 'bg-emerald-500 text-white'
                        : isPhaseLocked
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                          : `${themeBg} text-white`}`}>
                      {phaseDone ? <Check className="w-4 h-4" strokeWidth={4} /> : isPhaseLocked ? <Lock className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <h3 className={`min-w-0 text-base sm:text-lg font-black tracking-tight ${isPhaseLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                      {phaseName(phase.title)}
                    </h3>
                    <span className="flex-1" />
                    {/* A locked step's note is on its glass pane, not repeated here. */}
                    {!isPhaseLocked && phaseMax > 0 && (
                      <span className={`text-[11px] sm:text-xs font-black tabular-nums whitespace-nowrap ${phaseDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {phaseXP} / {phaseMax} XP
                      </span>
                    )}
                  </div>

                  <div className="sm:pl-11">
                    <div className="group/locked relative">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3" aria-hidden={isPhaseLocked || undefined}>
                        {phaseTasks.map((task) => renderTaskButton(task, isPhaseLocked))}
                      </div>

                      {/* Frosted glass over a locked step: the colourful tiles
                          show through, and the pane says what opens them. */}
                      {isPhaseLocked && (
                        <div className="absolute -inset-1.5 z-10 flex items-center justify-center p-2 rounded-[1.35rem] bg-white/35 dark:bg-slate-900/45 backdrop-blur-[3px] border-2 border-white/80 dark:border-slate-700/70 ring-1 ring-slate-200/70 dark:ring-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-none">
                          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border-2 border-b-4 border-slate-200 dark:border-slate-700 shadow-lg transition-transform duration-200 group-hover/locked:scale-105">
                            <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                              <Lock className="w-4 h-4 text-slate-500 dark:text-slate-300" strokeWidth={3} />
                            </span>
                            <span className="leading-tight">
                              <span className="block text-sm font-black text-slate-700 dark:text-slate-100">{lockNote}</span>
                              {toGo > 0 && (
                                <span className="block text-[11px] font-bold text-slate-400 dark:text-slate-400">{toGo} more XP to go</span>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
