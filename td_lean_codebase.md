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
- Only files matching these patterns are included: src/views/YearDashboard.jsx, src/components/UnitCard.jsx, src/hooks/useStudentProgress.js, src/tasks/Games.jsx, src/data/index.js, src/data/GED/ENG_1A/**/*.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/components/UnitCard.jsx
src/data/GED/ENG_1A/assessment.js
src/data/GED/ENG_1A/data.js
src/data/GED/ENG_1A/games.js
src/data/GED/ENG_1A/notes.js
src/data/GED/ENG_1A/workbook.js
src/data/index.js
src/hooks/useStudentProgress.js
src/tasks/Games.jsx
src/views/YearDashboard.jsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/UnitCard.jsx">
import React from 'react';
import { 
  Languages, Keyboard, BookOpen, Headphones, FileText, 
  Image as ImageIcon, Lock, Award, AlertCircle, 
  ClipboardCheck, Gamepad2, FileBox, HelpCircle, Pencil
} from 'lucide-react';

const IconMap = {
  "Award": Award,
  "GraduationCap": Award,
  "BookOpen": BookOpen
};

const TaskUIConfig = {
  "WORD_REC":      { label: "Vocab", icon: Languages, bg: "bg-[#58cc02]", border: "border-[#58a700]", text: "text-[#58cc02]" },
  "NOTES":         { label: "Notes", icon: FileText, bg: "bg-[#94a3b8]", border: "border-[#64748b]", text: "text-[#94a3b8]" },
  "WORKBOOK":      { label: "Extra", icon: FileBox, bg: "bg-[#ec4899]", border: "border-[#be185d]", text: "text-[#ec4899]" },
  
  "SPELLING":      { label: "Spelling", icon: Keyboard, bg: "bg-[#1cb0f6]", border: "border-[#1899d6]", text: "text-[#1cb0f6]" },
  "READ_COMP":     { label: "Reading", icon: BookOpen, bg: "bg-[#ff9600]", border: "border-[#cc7800]", text: "text-[#ff9600]" },
  "DICTATION":     { label: "Listening", icon: Headphones, bg: "bg-[#ce82ff]", border: "border-[#a567cc]", text: "text-[#ce82ff]" },
  
  "SHORT_ANSWERS": { label: "Questions", icon: HelpCircle, bg: "bg-[#ffc800]", border: "border-[#cca000]", text: "text-[#ffc800]" },
  "DIAGRAMS":      { label: "Diagram", icon: ImageIcon, bg: "bg-[#ff4b4b]", border: "border-[#cc3c3c]", text: "text-[#ff4b4b]" },
  "ESSAY":         { label: "Essay", icon: Pencil, bg: "bg-[#14b8a6]", border: "border-[#0d9488]", text: "text-[#14b8a6]" },
  
  "ASSESSMENT":    { label: "Assessment", icon: ClipboardCheck, bg: "bg-[#2563eb]", border: "border-[#1d4ed8]", text: "text-[#2563eb]" },
  "GAMES":         { label: "Game", icon: Gamepad2, bg: "bg-[#6366f1]", border: "border-[#4f46e5]", text: "text-[#6366f1]" }
};

const getMaxXP = (taskId) => {
  if (['WORD_REC', 'NOTES', 'WORKBOOK'].includes(taskId)) return 5;
  if (['SHORT_ANSWERS', 'DIAGRAMS', 'ESSAY'].includes(taskId)) return 20;
  return 10;
};

const getDbKeyMax = (dbKey) => {
  if (['p1', 'p10', 'p11'].includes(dbKey)) return 5;
  if (['p6', 'p7', 'p8'].includes(dbKey)) return 20;
  return 10;
};

export default function UnitCard({ unit, scores = {}, currentTheme, startMode }) {
  if (!unit) return null;

  const { title, description, icon } = unit.meta || {};
  const HeaderIcon = IconMap[icon] || BookOpen;

  const phases = {
    resources: [
      { id: "NOTES", dbKey: "p10" },
      { id: "WORD_REC", dbKey: "p1" },
      { id: "WORKBOOK", dbKey: "p11" }
    ],
    practice: [
      { id: "SPELLING", dbKey: "p2" },
      { id: "READ_COMP", dbKey: "p4" },
      { id: "DICTATION", dbKey: "p3" }
    ],
    application: [
      { id: "SHORT_ANSWERS", dbKey: "p6" },
      { id: "DIAGRAMS", dbKey: "p7" },
      { id: "ESSAY", dbKey: "p8" }
    ],
    mastery: [
      { id: "ASSESSMENT", dbKey: "p9" },
      { id: "GAMES", dbKey: "p12" }
    ]
  };

  // Strictly enforce max boundaries on read calculation
  const unitXP = Object.entries(scores)
    .filter(([key]) => key !== 'strikes')
    .reduce((sum, [key, val]) => sum + Math.min(val?.current || 0, getDbKeyMax(key)), 0);

  const strikes = scores.strikes || 0;
  const isAILocked = strikes >= 3;

  const thresholds = unit.meta?.thresholds || { p1: 10, p2: 30, p3: 60 };
  const practiceLocked = unitXP < (thresholds.p1 || 0); 
  const applicationLocked = unitXP < (thresholds.p2 || 30);
  const masteryLocked = unitXP < (thresholds.p3 || 60);

  let trophyStyle = "bg-orange-50 text-orange-800 border-orange-200"; 
  if (unitXP > 100) {
    trophyStyle = "bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 text-white border-transparent shadow-[0_0_25px_rgba(250,204,21,0.8)] animate-pulse";
  } else if (unitXP === 100) {
    trophyStyle = "bg-yellow-400 text-yellow-900 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-pulse";
  } else if (unitXP >= 50) {
    trophyStyle = "bg-slate-200 text-slate-800 border-slate-300 shadow-sm";
  }

  const checkIsEmpty = (taskId) => {
    if (taskId === 'NOTES' && (!unit.notes || !Array.isArray(unit.notes) || unit.notes.length === 0)) return true;
    if (taskId === 'WORKBOOK' && (!unit.workbook || unit.workbook.length === 0)) return true;
    if (taskId === 'GAMES' && (!unit.games || unit.games.length === 0)) return true;
    if (taskId === 'ASSESSMENT' && (!unit.assessment || !unit.assessment.questions || unit.assessment.questions.length === 0)) return true;
    return false;
  };

  const renderTaskButton = (task, isLocked = false) => {
    const config = TaskUIConfig[task.id];
    if (!config) return null;
    
    const TaskIcon = config.icon;
    const isEmpty = checkIsEmpty(task.id);
    
    const maxTaskXP = getMaxXP(task.id);
    const rawScore = scores[task.dbKey]?.current || 0;
    const taskScore = Math.min(rawScore, maxTaskXP);

    if (isEmpty) {
      return (
        <div key={task.id} className="relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[3px] border-dashed border-slate-200 bg-slate-50 text-slate-400 w-full h-36 sm:h-44 opacity-70 transition-all hover:opacity-90">
          <TaskIcon className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 opacity-40 ${config.text}`} strokeWidth={2} />
          <h4 className="font-black text-sm sm:text-base tracking-wide leading-tight text-center px-2">
            No {config.label}
          </h4>
        </div>
      );
    }

    return (
      <button 
        key={task.id}
        disabled={isLocked}
        onClick={() => startMode(unit.id, task.id)} 
        className={`relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-b-[6px] transition-all text-white w-full h-36 sm:h-44 shadow-sm hover:shadow-md
          ${isLocked 
            ? 'bg-slate-200 border-slate-300 opacity-60 cursor-not-allowed grayscale' 
            : `${config.bg} ${config.border} active:border-b-0 active:translate-y-[6px] hover:brightness-110 cursor-pointer`
          }`}
      >
        <div className="flex flex-col items-center mt-1 sm:mt-2">
          {isLocked ? <Lock className="w-8 h-8 sm:w-10 sm:h-10 mb-2 opacity-80" /> : <TaskIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 drop-shadow-sm" strokeWidth={2.5} />}
          <h4 className="font-black text-lg sm:text-xl tracking-wide leading-tight drop-shadow-sm">
            {config.label}
          </h4>
        </div>
        
        <div className="w-full bg-black/15 rounded-xl py-1.5 sm:py-2 mt-auto flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-95">
            {taskScore} / {maxTaskXP} XP
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-2xl">
      
      <div className={`p-6 sm:p-8 bg-gradient-to-br ${currentTheme.banner} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="p-4 bg-white/20 rounded-2xl mr-5 backdrop-blur-md text-white border border-white/30 shadow-sm flex-shrink-0">
              <HeaderIcon className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">{title || 'Unit Title'}</h2>
              <p className="text-white/80 font-medium text-sm sm:text-base mt-1 max-w-xl drop-shadow-sm">{description || 'Complete the tasks below.'}</p>
            </div>
          </div>
          <div className={`flex flex-col items-center justify-center px-6 py-3 rounded-2xl border-2 shadow-sm flex-shrink-0 min-w-[120px] backdrop-blur-sm ${trophyStyle}`}>
            <span className="text-xs font-black uppercase tracking-widest opacity-80 mb-0.5">Total XP</span>
            <span className="text-2xl sm:text-3xl font-black">{unitXP}</span>
          </div>
        </div>
      </div>

      {isAILocked && (
        <div className="bg-rose-50 border-b border-rose-200 p-4 flex items-start animate-in slide-in-from-top-2">
          <AlertCircle className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-800">AI Safety Lock Engaged</h4>
            <p className="text-rose-600 text-sm font-medium">Due to repeated inappropriate inputs, AI grading has been disabled for this unit.</p>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-10">
        
        <div>
          <div className="flex items-center mb-5 border-b-2 border-slate-100 pb-2">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Resources</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {phases.resources.map(task => renderTaskButton(task, false))}
          </div>
        </div>

        <div className="relative">
          {practiceLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Earn {thresholds.p1} XP to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${practiceLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-end mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 1: Practice</h3>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{thresholds.p2} XP to Unlock Phase 2</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.practice.map(task => renderTaskButton(task, practiceLocked))}
            </div>
          </div>
        </div>

        <div className="relative">
          {applicationLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Earn {thresholds.p2} XP in Phase 1 to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${applicationLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-end mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 2: Understanding</h3>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{thresholds.p3} XP to Unlock Mastery</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.application.map(task => renderTaskButton(task, applicationLocked))}
            </div>
          </div>
        </div>

        <div className="relative">
          {masteryLocked && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-[2rem] border-2 border-slate-100/50">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center">
                <Lock className="w-6 h-6 text-slate-400 mr-3" />
                <span className="font-bold text-slate-600">Complete Phase 2 to unlock.</span>
              </div>
            </div>
          )}
          <div className={`transition-all ${masteryLocked ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center mb-5 border-b-2 border-slate-100 pb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Phase 3: Assessment</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {phases.mastery.map(task => renderTaskButton(task, masteryLocked))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
</file>

<file path="src/data/GED/ENG_1A/assessment.js">
// src/data/GED/ENG_1A/assessment.js
export const assessment = {
  timeLimit: 2700, 
  passages: [
    {
      id: "p1_gardens",
      title: "The Case for Community Gardens",
      meta: "Editorial: City Planning Board Review",
      text: [
        "A community garden is a shared space where people come together to grow food and plants. This is an indisputable fact. Currently, the Riverton City Council is debating whether to turn the empty lot on 4th Street into a community garden or a commercial shopping mall. While some argue that commercial development brings immediate tax revenue, building a shopping mall on our last remaining green space is incredibly shortsighted.",
        "The primary purpose of our town should be to foster a healthy, connected community, not just generate cold, hard cash. Numerous academic studies have shown that access to green spaces significantly reduces neighborhood stress levels and lowers local crime rates. Therefore, the claim that we must build a mall to improve our town's quality of life is completely false. We need the garden to ensure a better future for our children."
      ],
      glossary: {
        "fact": { "def": "A statement that can be proven true or false.", "vn": "Sự thật", "vnDef": "Một tuyên bố có thể được chứng minh là đúng hay sai." },
        "purpose": { "def": "The reason an author writes or an action is done.", "vn": "Mục đích", "vnDef": "Lý do tác giả viết hoặc một hành động được thực hiện." },
        "claim": { "def": "The main argument a writer is trying to defend.", "vn": "Luận điểm", "vnDef": "Lập luận chính mà người viết đang cố gắng bảo vệ." }
      }
    },
    {
      id: "p_hist_1898",
      title: "Historical Opinion: The Eight-Hour Workday",
      meta: "Adapted from an 1898 address by labor leader Unionist Thomas O'Donnell",
      text: [
        "For decades, the American industrial worker has been treated as little more than an extension of the iron machinery he operates. We hear from the captains of industry that to shorten the workday from twelve hours to eight would invite economic ruin, decrease national productivity, and encourage idleness among the working classes. I stand before you today to argue that this claim is not only false, but it also ignores the fundamental laws of human nature and economic progress.",
        "First, let us examine the argument of productivity. A exhausted man is not an efficient man. When a laborer is forced to toil for twelve hours in a dark, poorly ventilated factory, his physical strength wanes long before his shift concludes. The work performed in the final four hours of a twelve-hour day is marked by fatigue, leading to frequent errors, ruined materials, and tragic, preventable workplace accidents. By limiting the workday to eight hours, we restore the worker’s vitality. A rested worker is alert, precise, and highly motivated. Historical evidence from factories that have voluntarily adopted the eight-hour standard reveals that total daily output does not decrease; rather, it often increases due to the heightened efficiency and focus of the workforce.",
        "Second, we must consider the moral and social dimensions of this issue. Opponents of our movement argue that additional leisure hours will lead workers to vice and degradation. What a cynical view of the American citizen! When a man is worked to the point of utter exhaustion, he has no time or energy remaining to cultivate his mind, care for his children, or participate in the civic life of his community. He is reduced to a state of mere survival. Give the worker eight hours for work, eight hours for rest, and eight hours for what he wills. With those eight hours of personal time, the worker will seek education, enjoy his family, and become a more informed, responsible participant in our democracy.",
        "The wealth of our nation should not be measured solely by the bank accounts of our monopolists, but by the health, intelligence, and dignity of our producing classes. The eight-hour day is not a plea for charity; it is a demand for justice and a necessary step toward a stronger, more prosperous republic."
      ]
    },
    {
      id: "p_handwriting",
      title: "The Decline of Handwriting",
      meta: "Contemporary Opinion Piece",
      text: [
        "In an era dominated by touchscreens and voice-to-text technology, the traditional art of handwriting is quietly facing extinction. Across the nation, school districts are dropping cursive from their mandatory curricula, and keyboard proficiency has taken center stage. While efficiency advocates celebrate this shift as a victory for modernization, we are sacrificing a profound cognitive tool in our rush to embrace the digital future.",
        "The primary argument for abandoning handwriting is speed. Proponents of digital-first education argue that typing allows students to capture information much faster than writing by hand ever could. This is undoubtedly true, but it confuses transcription with comprehension. When students type lecture notes on a laptop, they tend to record the speaker's words verbatim without processing their meaning. The laptop becomes a recording device, bypassing the brain.",
        "In contrast, writing by hand is a slower, more deliberate process. Because we cannot write as fast as someone speaks, our brains are forced to summarize, synthesize, and prioritize information in real-time. We must actively decide what is important enough to commit to paper. Neurological studies have consistently shown that the physical act of forming letters activates unique neural pathways linked to memory retention and critical thinking. Students who take notes by hand demonstrate a significantly deeper conceptual understanding of the material than those who type.",
        "Furthermore, handwriting is a deeply personal expression of identity. A typed font is uniform, sterile, and anonymous; it carries no trace of the writer’s physical presence or emotional state. A handwritten letter, however, possesses a unique signature style, capturing a moment in time and a physical connection between sender and receiver.",
        "By relegating handwriting to a relic of history, we are not just changing our medium of communication—we are weakening our cognitive capacities and sanitizing our personal interactions. Efficiency should not be the sole metric of educational progress. We must ensure that our classrooms continue to make space for the pen, even in a world ruled by the keyboard."
      ]
    },
    {
      id: "p_videogames",
      title: "The Educational Value of Video Games",
      meta: "Contemporary Opinion Article",
      text: [
        "For decades, the public narrative surrounding video games has been overwhelmingly negative. Critics routinely accuse them of encouraging violence, promoting social isolation, and rotting the brains of youth. However, this reactionary stance ignores a growing body of scientific research and educational theory. Far from being a mindless distraction, video games are actually one of the most powerful and effective tools we have for developing complex, 21st-century cognitive skills.",
        "To understand why video games are beneficial, one must compare them to more passive forms of media, such as television or film. When a child watches a movie, they are a consumer of a pre-determined story. They sit back, observe, and accept the narrative. When a child plays a video game, however, they are an active agent. The game does not progress unless the player makes decisions, solves puzzles, and reacts to changing circumstances.",
        "Most modern video games are, at their core, complex exercises in systemic problem-solving. In strategy and role-playing games, players must manage scarce resources, anticipate long-term consequences of their choices, and adapt to unpredictable environments. When a player fails to complete a level, they do not simply quit; they analyze what went wrong, formulate a new hypothesis, and try again. This iterative cycle of trial, failure, and adaptation is the exact foundation of the scientific method.",
        "Additionally, the rise of multiplayer online games has transformed gaming into a highly collaborative, social activity. To succeed in cooperative games, players must communicate effectively, delegate tasks based on individual strengths, and negotiate conflicts under pressure. These are the precise 'soft skills' that modern employers desperately seek in the workplace.",
        "While moderation is certainly necessary—as it is with any activity—the outright demonization of video games is outdated and counterproductive. Instead of treating gaming as an enemy of education, parents and educators should learn to leverage its interactive power to prepare youth for a highly complex, digital world."
      ]
    },
    {
      id: "p_fiction_marcus",
      title: "Starting Over",
      meta: "Literary Narrative (Fiction)",
      text: [
        "The fluorescent lights of the community college hallway hummed with a low, persistent buzz that matched the anxious vibration in Marcus’s chest. At thirty-five, he felt like a giant occupying a world built for people ten years younger. He adjusted the strap of his backpack, which felt ridiculously heavy, stuffed with a pristine college algebra textbook and a brand-new spiral notebook.",
        "Twelve years ago, Marcus had walked away from a half-finished degree to support his family, taking a job at the local packaging plant. For a decade, the rhythm of the assembly line had been his life—predictable, physical, and secure. But when the plant automated its main line last winter, Marcus found himself staring at a severance package and an uncertain future. He had made a choice: it was time to finish what he started and pivot to computer science.",
        "Now, standing outside Room 204 for his first programming lab, doubt crept in like a cold draft. Through the door's glass pane, he saw clusters of students laughing, their fingers flying across smartphone screens with effortless ease. They looked like natives of this digital landscape; Marcus felt like an explorer who had lost his map.",
        "\"First day jitters?\"",
        "Marcus turned to see an older woman with a kind face and a silver streak in her dark hair. She was carrying a worn laptop bag.",
        "\"Is it that obvious?\" Marcus managed a weak smile.",
        "\"I’ve taught this class for fifteen years, Marcus—it's Marcus, right?\" she asked, glancing at her roster. He nodded. \"The career changers always stand outside the door the longest. I'm Professor Vance.\"",
        "\"I just feel like I'm starting a mile behind everyone else in there,\" Marcus admitted, gesturing toward the younger students. \"They grew up with these machines.\"",
        "Professor Vance smiled, her eyes crinkling. \"They grew up using them, yes. But that doesn't mean they know how they work. Coding isn't about how fast you can type or how many apps you use. It’s about logic, patience, and solving puzzles. If you can survive a decade of troubleshooting mechanical errors on a factory floor, you have exactly the kind of grit this class requires. Don't underestimate the value of your mileage.\"",
        "She gave him a reassuring pat on the shoulder and opened the door. Marcus took a deep breath, letting her words sink in. He looked down at his calloused hands—hands that knew how to fix things, hands that knew how to work hard. He walked into the classroom and took a seat right in the front row."
      ]
    }
  ],
  questions: [
    {
      id: "q1_gardens_mcq",
      passageId: "p1_gardens",
      type: "mcq",
      title: "1. What is the author's primary purpose in writing this editorial?",
      options: [
        { val: "A", text: "A. To inform residents about how to grow their own food." },
        { val: "B", text: "B. To persuade the City Council to choose the community garden over the shopping mall." },
        { val: "C", text: "C. To entertain readers with a story about an empty lot." },
        { val: "D", text: "D. To explain the financial benefits of commercial development." }
      ],
      correct: "B",
      expEn: "The author uses persuasive language ('incredibly shortsighted', 'completely false') to convince the reader and the council that building a garden is better than building a mall.",
      expVn: "Tác giả sử dụng ngôn ngữ mang tính thuyết phục ('tầm nhìn vô cùng hạn hẹp', 'hoàn toàn sai lầm') để thuyết phục người đọc và hội đồng rằng việc xây dựng một khu vườn tốt hơn so với xây dựng một trung tâm mua sắm."
    },
    {
      id: "q2_gardens_dnd",
      passageId: "p1_gardens",
      type: "dnd",
      title: "2. Drag and drop the statements from the text into the correct categories (Fact vs. Opinion).",
      options: [],
      bank: [
        { val: "A", text: "A community garden is a shared space to grow food." },
        { val: "B", text: "Building a shopping mall is incredibly shortsighted." },
        { val: "C", text: "The primary purpose of our town should be to foster a connected community." },
        { val: "D", text: "Studies show green spaces reduce stress and crime rates." }
      ],
      targets: [
        { id: "facts", title: "Objective Facts (Can be proven)" },
        { id: "opinions", title: "Personal Opinions (Beliefs or judgments)" }
      ],
      correctSets: {
        "facts": ["A", "D"],
        "opinions": ["B", "C"]
      },
      expEn: "Options A and D are facts because they can be objectively proven via definitions and studies. Options B and C are opinions because they rely on the author's personal values and judgments.",
      expVn: "Lựa chọn A và D là sự thật vì chúng có thể được chứng minh khách quan thông qua các định nghĩa và nghiên cứu. Lựa chọn B và C là ý kiến cá nhân vì chúng dựa trên những giá trị và phán xét cá nhân của tác giả."
    },
    {
      id: "q3_gardens_inline",
      passageId: "p1_gardens",
      type: "inline",
      title: "3. Grammar & Logic: Select the correct rhetorical terms to complete the analysis of the text.",
      options: [],
      textParts: [
        "In the editorial, the author's main ",
        " is that the town must build a community garden instead of a mall. To back up this argument, the author provides clear ",
        " by referencing academic studies about stress and crime rates. Finally, the author's overall ",
        " is highly critical of the commercial development plan, describing it as 'shortsighted'."
      ],
      blanks: {
        "1": {
          correct: "claim",
          options: [
            { val: "claim", text: "claim" },
            { val: "fact", text: "fact" },
            { val: "transition", text: "transition" }
          ]
        },
        "2": {
          correct: "evidence",
          options: [
            { val: "tone", text: "tone" },
            { val: "opinion", text: "opinion" },
            { val: "evidence", text: "evidence" }
          ]
        },
        "3": {
          correct: "tone",
          options: [
            { val: "purpose", text: "purpose" },
            { val: "tone", text: "tone" },
            { val: "analyze", text: "analyze" }
          ]
        }
      },
      expEn: "The 'claim' is the main argument. The academic studies serve as the 'evidence' to prove that claim. The critical emotional attitude of the writer represents the 'tone'.",
      expVn: "'Claim' (luận điểm) là lập luận chính. Các nghiên cứu học thuật đóng vai trò là 'evidence' (bằng chứng) để chứng minh luận điểm đó. Thái độ cảm xúc chỉ trích của người viết thể hiện 'tone' (giọng điệu)."
    },
    {
      id: "q_hist_1",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "4. Which of the following best states the main argument of the passage?",
      options: [
        { val: "A", text: "A. Factory owners should provide safer working conditions and higher wages." },
        { val: "B", text: "B. Reducing the workday to eight hours benefits both economic productivity and societal well-being." },
        { val: "C", text: "C. The American government must intervene to break up monopolies in the manufacturing sector." },
        { val: "D", text: "D. Workers who labor for twelve hours are more prone to moral vice than those who work eight hours." }
      ],
      correct: "B",
      expEn: "The author argues that reducing the workday to eight hours will increase factory productivity (by reducing fatigue and errors) and improve societal well-being (by allowing workers time to rest, learn, and engage in democracy).",
      expVn: "Tác giả lập luận rằng việc giảm ngày làm việc xuống còn tám giờ sẽ làm tăng năng suất nhà máy (bằng cách giảm mệt mỏi và sai sót) và cải thiện phúc lợi xã hội (bằng cách cho phép công nhân có thời gian nghỉ ngơi, học tập và tham gia vào nền dân chủ)."
    },
    {
      id: "q_hist_2",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "5. How does the author counter the claim that shorter workdays lead to economic ruin?",
      options: [
        { val: "A", text: "A. By arguing that factory owners can afford to lose money." },
        { val: "B", text: "B. By pointing out that a rested worker is more productive and makes fewer costly mistakes." },
        { val: "C", text: "C. By suggesting that the government subsidize factories that adopt the eight-hour day." },
        { val: "D", text: "D. By demonstrating that consumers are willing to pay higher prices for goods." }
      ],
      correct: "B",
      expEn: "In the second paragraph, the author argues that exhausted workers make mistakes and ruin materials, and that a rested worker is more alert and efficient, keeping total daily output high.",
      expVn: "Trong đoạn thứ hai, tác giả lập luận rằng những công nhân kiệt sức thường mắc sai lầm, và một công nhân được nghỉ ngơi sẽ tỉnh táo và hiệu quả hơn, giúp giữ sản lượng tổng thể hàng ngày ở mức cao."
    },
    {
      id: "q_hist_3",
      passageId: "p_hist_1898",
      type: "mcq",
      title: "6. As used in the third paragraph, what does the word \"cultivate\" most nearly mean?",
      options: [
        { val: "A", text: "A. To harvest or farm" },
        { val: "B", text: "B. To restrict or limit" },
        { val: "C", text: "C. To develop or improve" },
        { val: "D", text: "D. To ignore or neglect" }
      ],
      correct: "C",
      expEn: "In this context, to 'cultivate his mind' means to develop or improve his intellect through education and thought.",
      expVn: "Trong ngữ cảnh này, 'cultivate his mind' (trau dồi trí tuệ) có nghĩa là phát triển hoặc cải thiện trí tuệ thông qua giáo dục và suy nghĩ."
    },
    {
      id: "q_hw_1",
      passageId: "p_handwriting",
      type: "mcq",
      title: "7. What is the author’s primary purpose in writing this piece?",
      options: [
        { val: "A", text: "A. To persuade school districts to completely ban laptops and tablets in classrooms." },
        { val: "B", text: "B. To argue that handwriting offers cognitive and personal benefits that typing cannot replicate." },
        { val: "C", text: "C. To explain the scientific process of how the brain stores memories during typing." },
        { val: "D", text: "D. To demonstrate that typing speeds are vastly superior to handwriting speeds." }
      ],
      correct: "B",
      expEn: "The author is advocating for the preservation of handwriting, arguing that it has cognitive benefits (like better memory retention) and personal values that typing lacks.",
      expVn: "Tác giả đang ủng hộ việc duy trì chữ viết tay, lập luận rằng nó mang lại những lợi ích nhận thức (như ghi nhớ tốt hơn) và những giá trị cá nhân mà việc đánh máy không có."
    },
    {
      id: "q_hw_2",
      passageId: "p_handwriting",
      type: "mcq",
      title: "8. Which piece of evidence does the author use to support the claim that handwriting improves memory retention?",
      options: [
        { val: "A", text: "A. Surveys showing that teachers prefer graded handwritten essays over printed ones." },
        { val: "B", text: "B. Brain scans showing that forming letters activates neural pathways linked to critical thinking." },
        { val: "C", text: "C. Statistics comparing the graduation rates of schools with and without cursive programs." },
        { val: "D", text: "D. Anecdotes from historical figures who wrote their famous works by hand." }
      ],
      correct: "B",
      expEn: "The author cites 'neurological studies' showing that physical writing activates unique neural pathways linked to critical thinking and memory.",
      expVn: "Tác giả trích dẫn 'các nghiên cứu thần kinh học' cho thấy việc viết tay kích hoạt các đường dẫn thần kinh đặc biệt liên quan đến tư duy phản biện và trí nhớ."
    },
    {
      id: "q_hw_3",
      passageId: "p_handwriting",
      type: "mcq",
      title: "9. Why does the author mention that typed fonts are \"uniform, sterile, and anonymous\"?",
      options: [
        { val: "A", text: "A. To emphasize that typing is more professional than writing by hand." },
        { val: "B", text: "B. To criticize technology companies for not designing more creative fonts." },
        { val: "C", text: "C. To highlight the loss of individuality and personal connection associated with digital communication." },
        { val: "D", text: "D. To suggest that typing makes it easier to write plagiarized material undetected." }
      ],
      correct: "C",
      expEn: "The author uses these terms to contrast the cold, emotionless nature of typed text with the unique, expressive, and human nature of handwriting.",
      expVn: "Tác giả sử dụng các thuật ngữ này để đối chiếu bản chất vô cảm, lạnh lẽo của văn bản đánh máy với bản chất độc đáo, biểu cảm và đậm chất con người của chữ viết tay."
    },
    {
      id: "q_vg_1",
      passageId: "p_videogames",
      type: "mcq",
      title: "10. How does the author structure the argument in the second paragraph?",
      options: [
        { val: "A", text: "A. By presenting a chronological history of media consumption from television to video games." },
        { val: "B", text: "B. By comparing and contrasting the passive nature of watching television with the active nature of playing video games." },
        { val: "C", text: "C. By listing the negative physical side effects of excessive screen time." },
        { val: "D", text: "D. By citing expert testimony from pediatricians regarding media habits." }
      ],
      correct: "B",
      expEn: "The author compares and contrasts television (where the viewer sits back and passively consumes a story) with video games (where the player must be an active agent who makes decisions to progress).",
      expVn: "Tác giả so sánh và đối chiếu truyền hình (nơi người xem thụ động tiếp nhận câu chuyện) với trò chơi điện tử (nơi người chơi phải là một tác nhân chủ động đưa ra quyết định)."
    },
    {
      id: "q_vg_2",
      passageId: "p_videogames",
      type: "mcq",
      title: "11. According to the author, how does playing video games mimic the scientific method?",
      options: [
        { val: "A", text: "A. It requires players to memorize vast amounts of scientific data." },
        { val: "B", text: "B. It encourages players to work in isolated laboratory environments." },
        { val: "C", text: "C. It involves a cycle of testing a strategy, failing, analyzing the result, and trying a new approach." },
        { val: "D", text: "D. It forces players to write down their hypotheses before starting a new level." }
      ],
      correct: "C",
      expEn: "The third paragraph describes the gaming cycle of trying a strategy, failing, analyzing the failure, and trying again as the core foundation of the scientific method.",
      expVn: "Đoạn thứ ba mô tả chu kỳ chơi game: thử nghiệm chiến lược, thất bại, phân tích thất bại, và thử lại. Đây chính là nền tảng cốt lõi của phương pháp khoa học."
    },
    {
      id: "q_vg_3",
      passageId: "p_videogames",
      type: "mcq",
      title: "12. Which of the following assumptions does the author make about the reader?",
      options: [
        { val: "A", text: "A. The reader already believes that video games are highly educational." },
        { val: "B", text: "B. The reader is familiar with the negative stereotypes associated with video games." },
        { val: "C", text: "C. The reader prefers television over video games for entertainment." },
        { val: "D", text: "D. The reader is an employer looking to hire skilled tech workers." }
      ],
      correct: "B",
      expEn: "The author begins by stating, 'For decades, the public narrative surrounding video games has been overwhelmingly negative,' which assumes the reader is already familiar with these common stereotypes.",
      expVn: "Tác giả bắt đầu bằng cách khẳng định định kiến tiêu cực của công chúng về trò chơi điện tử đã tồn tại nhiều thập kỷ, điều này ngầm định rằng người đọc đã quen thuộc với những khuôn mẫu này."
    },
    {
      id: "q_fict_1",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "13. What is the primary conflict Marcus experiences in the story?",
      options: [
        { val: "A", text: "A. He is struggling to pass a difficult college algebra exam." },
        { val: "B", text: "B. He feels out of place and insecure about returning to school as an older student." },
        { val: "C", text: "C. He cannot afford the tuition fees for his computer science program." },
        { val: "D", text: "D. He is angry at his former employer for automating his job at the factory." }
      ],
      correct: "B",
      expEn: "Marcus's main conflict is internal; he feels self-conscious, insecure, and doubtful about his ability to succeed in college alongside younger, tech-savvy students.",
      expVn: "Xung đột chính của Marcus là xung đột nội tâm; anh ấy cảm thấy tự ti, không an tâm và nghi ngờ về khả năng thành công của mình khi học cùng những sinh viên trẻ tuổi rành công nghệ."
    },
    {
      id: "q_fict_2",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "14. What does Professor Vance mean when she tells Marcus, \"Don't underestimate the value of your mileage\"?",
      options: [
        { val: "A", text: "A. He should keep track of how many miles he drives to commute to campus." },
        { val: "B", text: "B. His age and past work experience are assets that have prepared him for college." },
        { val: "C", text: "C. Younger students are physically faster at typing than he is." },
        { val: "D", text: "D. He will need to work twice as hard to catch up to his classmates." }
      ],
      correct: "B",
      expEn: "'Mileage' is a metaphor for life experience. Professor Vance is telling him that his years of working and solving real-world problems have given him valuable grit and logic.",
      expVn: "'Mileage' (số dặm/đường dài) là một ẩn dụ cho kinh nghiệm sống. Giáo sư Vance đang nói với anh ấy rằng những năm tháng làm việc và giải quyết các vấn đề thực tế đã mang lại cho anh ấy sự bền bỉ và tư duy logic quý giá."
    },
    {
      id: "q_fict_3",
      passageId: "p_fiction_marcus",
      type: "mcq",
      title: "15. How does the setting of the hallway reflect Marcus’s internal state?",
      options: [
        { val: "A", text: "A. The bright, cheerful hallway makes him feel optimistic about his future." },
        { val: "B", text: "B. The empty, quiet hallway emphasizes his feelings of complete loneliness." },
        { val: "C", text: "C. The low, humming fluorescent lights mirror the nervous tension he feels inside." },
        { val: "D", text: "D. The chaotic, crowded hallway makes him feel angry and overwhelmed." }
      ],
      correct: "C",
      expEn: "The author explicitly states that the 'low, persistent buzz' of the lights 'matched the anxious vibration in Marcus's chest.'",
      expVn: "Tác giả tuyên bố rõ ràng rằng 'tiếng vo ve trầm, dai dẳng' của ánh đèn 'phù hợp với sự rung động lo âu trong ngực Marcus.'"
    }
  ]
};
</file>

<file path="src/data/GED/ENG_1A/data.js">
// src/data/GED/ENG_1A/data.js
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { workbook } from './workbook.js';
import { games } from './games.js';

export const ENGLISH_1A_DATA = {
  meta: {
    id: "ENG_1A",
    title: "English for the GED: Foundations of Reading & Argument",
    desc: "An introduction to reading comprehension, identifying author's purpose, recognizing tone, and understanding basic claims and evidence.",
    track: "GED",
    icon: "GraduationCap"
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
    {
      word: "Theme",
      vn: "Chủ đề",
      def: "The main subject, topic, or underlying message in a piece of writing.",
      vnDef: "Chủ đề chính, đề tài hoặc thông điệp ẩn chứa trong một bài viết.",
      sent: "The central theme of the story is the importance of family and loyalty.", 
      vnSent: "Chủ đề trung tâm của câu chuyện là tầm quan trọng của gia đình và lòng trung thành.",
      dictSent: "Understanding the theme helps you grasp the author's overall message.",
      isReal: true
    },
    {
      word: "Purpose",
      vn: "Mục đích",
      def: "The reason an author writes a text, such as to inform, persuade, or entertain.",
      vnDef: "Lý do tác giả viết một văn bản, chẳng hạn như để thông tin, thuyết phục hoặc giải trí.",
      sent: "The writer's primary purpose is to persuade the reader to protect the environment.",
      vnSent: "Mục đích chính của người viết là thuyết phục người đọc bảo vệ môi trường.",
      dictSent: "Always ask yourself what the author's main purpose is before answering the questions.",
      isReal: true
    },
    {
      word: "Tone",
      vn: "Giọng điệu",
      def: "The author's attitude or feeling toward the subject they are writing about.",
      vnDef: "Thái độ hoặc cảm xúc của tác giả đối với chủ đề họ đang viết.",
      sent: "The serious tone of the article matched the tragedy of the breaking news.",
      vnSent: "Giọng điệu nghiêm túc của bài báo phù hợp với thảm kịch của tin tức nóng hổi.",
      dictSent: "You can often guess the tone by looking at the descriptive adjectives used.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "Facts, statistics, or examples that support an author's claim or argument.",
      vnDef: "Sự thật, số liệu thống kê hoặc ví dụ hỗ trợ cho tuyên bố hoặc lập luận của tác giả.",
      sent: "The lawyer presented strong evidence to prove his client was innocent.",
      vnSent: "Luật sư đã đưa ra bằng chứng mạnh mẽ để chứng minh thân chủ của mình vô tội.",
      dictSent: "Good writers always back up their claims with solid and reliable evidence.",
      isReal: true
    },
    {
      word: "Fact",
      vn: "Sự thật (Dữ kiện)",
      def: "A statement that can be proven true or false with objective information.",
      vnDef: "Một tuyên bố có thể được chứng minh là đúng hoặc sai bằng thông tin khách quan.",
      sent: "It is a scientific fact that water boils at one hundred degrees Celsius.",
      vnSent: "Đó là một sự thật khoa học rằng nước sôi ở một trăm độ C.",
      dictSent: "A strong argument relies on fact rather than raw emotion or personal bias.",
      isReal: true
    },
    {
      word: "Opinion",
      vn: "Ý kiến cá nhân",
      def: "A personal belief or judgment that cannot be objectively proven true or false.",
      vnDef: "Một niềm tin hoặc đánh giá cá nhân không thể được chứng minh một cách khách quan là đúng hay sai.",
      sent: "Saying that pizza is the best food in the world is just an opinion.",
      vnSent: "Nói rằng pizza là món ăn ngon nhất trên thế giới chỉ là một ý kiến cá nhân.",
      dictSent: "Be careful not to confuse a writer's opinion with actual historical facts.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Sự chuyển tiếp",
      def: "Words or phrases that connect ideas and help a text flow smoothly from one thought to the next.",
      vnDef: "Các từ hoặc cụm từ kết nối các ý tưởng và giúp văn bản trôi chảy từ suy nghĩ này sang suy nghĩ khác.",
      sent: "Words like 'however' and 'therefore' act as a transition between paragraphs.",
      vnSent: "Các từ như 'tuy nhiên' và 'do đó' đóng vai trò như sự chuyển tiếp giữa các đoạn văn.",
      dictSent: "A good transition makes it much easier for the reader to follow your logic.",
      isReal: true
    },
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The main argument or point that a writer is trying to make and defend.",
      vnDef: "Lập luận hoặc điểm chính mà người viết đang cố gắng đưa ra và bảo vệ.",
      sent: "The author's main claim is that daily exercise improves long-term mental health.",
      vnSent: "Luận điểm chính của tác giả là tập thể dục hàng ngày cải thiện sức khỏe tinh thần lâu dài.",
      dictSent: "Every persuasive essay must have a clear and strong claim at the beginning.",
      isReal: true
    },
    {
      word: "Analyze",
      vn: "Phân tích",
      def: "To examine something carefully in order to understand its different parts and meaning.",
      vnDef: "Kiểm tra điều gì đó cẩn thận để hiểu các phần khác nhau và ý nghĩa của nó.",
      sent: "Students must analyze the poem to find its hidden message about nature.",
      vnSent: "Học sinh phải phân tích bài thơ để tìm ra thông điệp ẩn giấu của nó về thiên nhiên.",
      dictSent: "You will need to analyze the data carefully before making a final decision.",
      isReal: true
    },
    {
      word: "Conclude",
      vn: "Kết luận",
      def: "To bring to an end or to reach a logical decision based on the information provided.",
      vnDef: "Kết thúc hoặc đạt được một quyết định logic dựa trên thông tin được cung cấp.",
      sent: "After reading the report, we can conclude that the new project was a success.",
      vnSent: "Sau khi đọc báo cáo, chúng ta có thể kết luận rằng dự án mới đã thành công.",
      dictSent: "Your final paragraph should effectively conclude your entire argument for the reader.",
      isReal: true
    }
  ],
  dictation: [
    { sent: "Understanding the theme helps you grasp the author's overall message.", vnSent: "Hiểu được chủ đề giúp bạn nắm bắt được thông điệp tổng thể của tác giả." },
    { sent: "Always ask yourself what the author's main purpose is before answering the questions.", vnSent: "Luôn tự hỏi mục đích chính của tác giả là gì trước khi trả lời các câu hỏi." },
    { sent: "You can often guess the tone by looking at the descriptive adjectives used.", vnSent: "Bạn thường có thể đoán được giọng điệu bằng cách nhìn vào các tính từ miêu tả được sử dụng." },
    { sent: "Good writers always back up their claims with solid and reliable evidence.", vnSent: "Những người viết tốt luôn củng cố luận điểm của họ bằng bằng chứng vững chắc và đáng tin cậy." },
    { sent: "A strong argument relies on fact rather than raw emotion or personal bias.", vnSent: "Một lập luận mạnh mẽ dựa trên sự thật hơn là cảm xúc nhất thời hoặc thành kiến cá nhân." },
    { sent: "Be careful not to confuse a writer's opinion with actual historical facts.", vnSent: "Hãy cẩn thận đừng nhầm lẫn ý kiến của người viết với sự thật lịch sử thực tế." },
    { sent: "A good transition makes it much easier for the reader to follow your logic.", vnSent: "Một sự chuyển tiếp tốt làm cho người đọc dễ dàng theo dõi logic của bạn hơn nhiều." },
    { sent: "Every persuasive essay must have a clear and strong claim at the beginning.", vnSent: "Mỗi bài luận thuyết phục phải có một luận điểm rõ ràng và mạnh mẽ ngay từ đầu." },
    { sent: "You will need to analyze the data carefully before making a final decision.", vnSent: "Bạn sẽ cần phân tích dữ liệu cẩn thận trước khi đưa ra quyết định cuối cùng." },
    { sent: "Your final paragraph should effectively conclude your entire argument for the reader.", vnSent: "Đoạn văn cuối cùng của bạn nên kết luận một cách hiệu quả toàn bộ lập luận của bạn cho người đọc." }
  ],
  passages: [
    {
      id: "passage_1",
      title: "Understanding the Author's Intent",
      text: "Every text is written with a specific {purpose}. Sometimes an author wants to teach you a {fact} about history, while other times they want to convince you to agree with their {opinion}. Figuring out the 'why' behind the writing is the very first step to good reading comprehension and analysis.",
      vnText: "Mỗi văn bản được viết với một mục đích cụ thể. Đôi khi tác giả muốn dạy cho bạn một sự thật về lịch sử, trong khi những lúc khác họ muốn thuyết phục bạn đồng ý với ý kiến của họ. Tìm ra lý do 'tại sao' đằng sau bài viết là bước đầu tiên để đọc hiểu và phân tích tốt."
    },
    {
      id: "passage_2",
      title: "Listening to the Writer's Voice",
      text: "You can tell a lot about a text by paying attention to the {tone}. If the author uses angry or urgent words, they are likely upset about the {theme} they are discussing. Paying attention to these emotional clues helps you {analyze} the true meaning behind the words on the page.",
      vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến giọng điệu. Nếu tác giả sử dụng những từ ngữ tức giận hoặc khẩn cấp, có thể họ đang bực tức về chủ đề mà họ đang thảo luận. Chú ý đến những manh mối cảm xúc này giúp bạn phân tích ý nghĩa thực sự đằng sau những từ ngữ trên trang giấy."
    },
    {
      id: "passage_3",
      title: "Building a Solid Argument",
      text: "To make a strong {claim}, a writer cannot simply state what they believe. They must provide solid {evidence} to back it up. Furthermore, using a smooth {transition} between sentences ensures that the reader does not get confused as the argument builds toward the end.",
      vnText: "Để đưa ra một luận điểm mạnh mẽ, người viết không thể chỉ đơn giản nêu ra những gì họ tin tưởng. Họ phải cung cấp bằng chứng vững chắc để chứng minh. Hơn nữa, việc sử dụng sự chuyển tiếp mượt mà giữa các câu đảm bảo rằng người đọc không bị nhầm lẫn khi lập luận được xây dựng về cuối."
    }
  ],
  notebookArticle: {
    title: "Unit 1A: Foundations of Reading & Argument",
    vnTitle: "Bài 1A: Cơ sở của việc Đọc hiểu & Lập luận",
    instructions: "Read the following summary carefully. Write down the highlighted vocabulary words in your notebook along with their definitions.",
    vnInstructions: "Hãy đọc kỹ bản tóm tắt sau đây. Viết các từ vựng được in đậm vào vở bài tập cùng với định nghĩa của chúng.",
    sections: [
      {
        heading: "1. The Author's Intent",
        vnHeading: "1. Ý định của Tác giả",
        text: "Every text is written with a specific **Purpose**. Sometimes an author wants to teach you a **Fact**, while other times they want to share their **Opinion**.",
        vnText: "Mỗi văn bản được viết với một **Mục đích** cụ thể. Đôi khi tác giả muốn dạy cho bạn một **Sự thật**, trong khi những lúc khác họ muốn chia sẻ **Ý kiến** của họ."
      },
      {
        heading: "2. Voice and Message",
        vnHeading: "2. Giọng điệu và Thông điệp",
        text: "You can tell a lot about a text by paying attention to the **Tone**. Paying attention to these emotional clues helps you **Analyze** the true meaning and **Theme** behind the words.",
        vnText: "Bạn có thể hiểu nhiều điều về một văn bản bằng cách chú ý đến **Giọng điệu**. Chú ý đến những manh mối cảm xúc này giúp bạn **Phân tích** ý nghĩa thực sự và **Chủ đề** đằng sau những từ ngữ."
      },
      {
        heading: "3. Building an Argument",
        vnHeading: "3. Xây dựng một Lập luận",
        text: "To make a strong **Claim**, a writer must provide solid **Evidence**. Using a smooth **Transition** between sentences ensures the reader can follow along until you **Conclude** the argument.",
        vnText: "Để đưa ra một **Luận điểm** mạnh mẽ, người viết phải cung cấp **Bằng chứng** vững chắc. Sử dụng **Sự chuyển tiếp** mượt mà giữa các câu đảm bảo người đọc có thể theo dõi cho đến khi bạn **Kết luận** lập luận."
      }
    ]
  },
  shortQA: [
    {
      id: "q1",
      question: "Why is it helpful for a reader to identify the author's purpose before reading a long passage?",
      requiredWords: [["understand", "understanding"], ["expect", "expectations"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that it helps the reader know what to expect from the text.",
        "1 mark for explaining that it makes it easier to understand the main message."
      ],
      modelAnswer: "Identifying the author's purpose is helpful because it tells the reader what to expect, making it much easier to understand the main message of the text."
    },
    {
      id: "q2",
      question: "What is the primary difference between a fact and an opinion in an informational text?",
      requiredWords: [["prove", "proven", "proof"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for stating that a fact can be proven with objective evidence.",
        "1 mark for stating that an opinion is a personal belief that cannot be proven."
      ],
      modelAnswer: "The primary difference is that a fact can be objectively proven with evidence, whereas an opinion is a personal belief that cannot be proven."
    },
    {
      id: "q3",
      question: "Why must a writer include evidence when making a strong claim?",
      requiredWords: [["support", "prove", "back"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that evidence is needed to prove the claim is true.",
        "1 mark for noting that without evidence, the claim is just an unsupported opinion."
      ],
      modelAnswer: "A writer must include evidence to prove that their claim is true; otherwise, their argument is simply an unsupported opinion."
    }
  ],
  diagrams: [
    {
      id: "d1",
      imageUrl: "/images/GED/reading_map1.png",
      promptText: "Look at the basic paragraph structure chart. In which section does the author usually introduce their main claim?",
      requiredWords: [["beginning", "start", "first"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for identifying the beginning or introduction.",
        "1 mark for explaining that this sets up the argument for the rest of the paragraph."
      ],
      modelAnswer: "The author usually introduces their main claim at the very beginning of the paragraph to clearly set up the argument."
    },
    {
      id: "d2",
      imageUrl: "/images/GED/fact_opinion1.png",
      promptText: "Review the graphic sorting statements. What is the key feature that separates the statements in the 'Fact' column from the 'Opinion' column?",
      requiredWords: [["proof", "proven", "prove"], ["objective", "evidence"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for noting that facts can be proven with objective evidence.",
        "1 mark for noting that opinions cannot be proven."
      ],
      modelAnswer: "The key feature is that facts can be proven true or false with objective evidence, whereas opinions are personal beliefs that cannot be proven."
    }
  ],
  essay: {
    task: "Explain why it is important for a reader to be able to distinguish between an author's objective facts and personal opinions when reading the news.",
    guidelines: [
      "Define what makes a statement a fact.",
      "Define what makes a statement an opinion.",
      "Explain the danger of confusing the two when reading news."
    ],
    requiredWords: [
      ["Fact", "facts"], 
      ["Opinion", "opinions", "beliefs"],
      ["Evidence", "prove", "proof"]
    ],
    scienceMaxMarks: 3,
    markScheme: [
      "1 mark for accurately defining a fact (can be proven).",
      "1 mark for accurately defining an opinion (personal belief).",
      "1 mark for explaining that confusing them can lead to misinformation or biased thinking."
    ],
    modelAnswer: "It is incredibly important to distinguish between the two because a fact can be proven with objective evidence, while an opinion is just a personal belief. When reading the news, if a reader cannot tell the difference, they might mistake a writer's biased opinion for the absolute truth, leading to misinformation and a lack of critical thinking."
  },
  assessment,
  notes,
  workbook,
  games
};
</file>

<file path="src/data/GED/ENG_1A/games.js">
// src/data/GED/ENG_1A/games.js

export const games = {
  gameConfig: {
    layout: {
      rows: 10,
      cols: 15,
      path: [
        [1, 0], [1, 3], [7, 3], [7, 7], [2, 7], [2, 11], [8, 11], [8, 14]
      ]
    },
    enemies: {
      GLAZED:   { name: "Glazed", color: "bg-amber-100", border: "border-amber-300", hp: 30, speed: 1.1, reward: 1, radius: 12 },
      CRULLER:  { name: "Cruller", color: "bg-yellow-300", border: "border-yellow-500", hp: 15, speed: 1.7, reward: 1, radius: 10 },
      FRITTER:  { name: "Fritter", color: "bg-amber-700", border: "border-amber-900", hp: 150, speed: 0.6, reward: 3, radius: 16 },
      JELLY:    { name: "Jelly Boss", color: "bg-rose-500", border: "border-rose-700", hp: 600, speed: 0.45, reward: 15, radius: 22 }
    },
    towers: {
      DART: {
        id: 'DART', name: "Sentry", type: "SINGLE",
        desc: "Cheap, fast-firing basic defense.", color: "bg-sky-400 border-sky-600 text-sky-100",
        tiers: [
          { cost: 15, range: 3, damage: 10, cooldown: 800 },
          { cost: 30, range: 3.5, damage: 25, cooldown: 600 },
          { cost: 75, range: 4, damage: 65, cooldown: 300 }
        ]
      },
      SNIPER: {
        id: 'SNIPER', name: "Marksman", type: "SINGLE",
        desc: "Extreme range and high damage, but slow.", color: "bg-emerald-500 border-emerald-700 text-emerald-100",
        tiers: [
          { cost: 25, range: 6, damage: 45, cooldown: 2500 },
          { cost: 60, range: 7, damage: 120, cooldown: 2200 },
          { cost: 150, range: 10, damage: 350, cooldown: 2000 }
        ]
      },
      SPLASH: {
        id: 'SPLASH', name: "Mortar", type: "SPLASH",
        desc: "Fires explosives dealing area damage.", color: "bg-rose-500 border-rose-700 text-rose-100",
        tiers: [
          { cost: 40, range: 3.5, damage: 15, radius: 1.5, cooldown: 1800 },
          { cost: 90, range: 4, damage: 40, radius: 2, cooldown: 1600 },
          { cost: 200, range: 4.5, damage: 100, radius: 2.5, cooldown: 1400 }
        ]
      },
      FROST: {
        id: 'FROST', name: "Cryo", type: "FROST",
        desc: "Chills enemies, slowing their movement.", color: "bg-cyan-300 border-cyan-500 text-cyan-900",
        tiers: [
          { cost: 50, range: 2.5, damage: 5, slowPercent: 0.4, duration: 1500, cooldown: 1500 },
          { cost: 110, range: 3, damage: 15, slowPercent: 0.55, duration: 2000, cooldown: 1200 },
          { cost: 240, range: 3.5, damage: 40, slowPercent: 0.75, duration: 3000, cooldown: 1000 }
        ]
      },
      CHAIN: {
        id: 'CHAIN', name: "Tesla", type: "CHAIN",
        desc: "Lightning chains to nearby enemies.", color: "bg-amber-400 border-amber-600 text-amber-900",
        tiers: [
          { cost: 60, range: 3, damage: 20, bounces: 2, cooldown: 1200 },
          { cost: 150, range: 3.5, damage: 50, bounces: 4, cooldown: 1100 },
          { cost: 300, range: 4, damage: 120, bounces: 7, cooldown: 900 }
        ]
      },
      BANK: {
        id: 'BANK', name: "Generator", type: "INCOME",
        desc: "Generates credits at the end of each wave.", color: "bg-yellow-400 border-yellow-600 text-yellow-900",
        tiers: [
          { cost: 75, income: 10, range: 0, damage: 0, cooldown: 99999 },
          { cost: 175, income: 30, range: 0, damage: 0, cooldown: 99999 },
          { cost: 400, income: 85, range: 0, damage: 0, cooldown: 99999 }
        ]
      }
    },
    waves: [
      [ { type: 'GLAZED', count: 5, interval: 1500 } ],
      [ { type: 'GLAZED', count: 8, interval: 1200 } ],
      [ { type: 'GLAZED', count: 5, interval: 1000 }, { type: 'CRULLER', count: 3, interval: 800 } ],
      [ { type: 'CRULLER', count: 8, interval: 700 } ],
      [ { type: 'GLAZED', count: 12, interval: 600 }, { type: 'FRITTER', count: 1, interval: 2000 } ],
      [ { type: 'GLAZED', count: 15, interval: 800 }, { type: 'CRULLER', count: 5, interval: 600 } ],
      [ { type: 'FRITTER', count: 3, interval: 1500 }, { type: 'CRULLER', count: 5, interval: 500 } ],
      [ { type: 'GLAZED', count: 20, interval: 400 } ],
      [ { type: 'CRULLER', count: 15, interval: 400 }, { type: 'FRITTER', count: 2, interval: 1000 } ],
      [ { type: 'FRITTER', count: 5, interval: 1000 }, { type: 'JELLY', count: 1, interval: 3000 } ],
      [ { type: 'GLAZED', count: 25, interval: 350 } ],
      [ { type: 'CRULLER', count: 15, interval: 300 }, { type: 'FRITTER', count: 4, interval: 1000 } ],
      [ { type: 'GLAZED', count: 10, interval: 300 }, { type: 'CRULLER', count: 15, interval: 250 } ],
      [ { type: 'FRITTER', count: 8, interval: 1000 } ],
      [ { type: 'CRULLER', count: 20, interval: 200 }, { type: 'JELLY', count: 1, interval: 2000 } ],
      [ { type: 'GLAZED', count: 30, interval: 250 }, { type: 'FRITTER', count: 5, interval: 800 } ],
      [ { type: 'CRULLER', count: 30, interval: 200 } ],
      [ { type: 'FRITTER', count: 15, interval: 600 } ],
      [ { type: 'GLAZED', count: 20, interval: 200 }, { type: 'CRULLER', count: 20, interval: 200 } ],
      [ { type: 'FRITTER', count: 12, interval: 500 }, { type: 'JELLY', count: 3, interval: 1500 } ]
    ]
  }
};
</file>

<file path="src/data/GED/ENG_1A/notes.js">
// src/data/GED/ENG_1A/notes.js

export const notes = [
  {
    type: "intro",
    title: "Understanding Reading & Arguments",
    titleVn: "Hiểu về Đọc hiểu & Lập luận",
    subtitle: "Objective: Identify the author's purpose, distinguish facts from opinions, and analyze claims and evidence.",
    subtitleVn: "Mục tiêu: Nhận diện mục đích của tác giả, phân biệt sự thật với ý kiến, và phân tích luận điểm và bằng chứng.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Author's Purpose",
    titleVn: "Mục đích của Tác giả",
    icon: "Target",
    color: "bg-[#ff9600]",
    content: "Every text is written with a specific **Purpose** in mind. Before you can analyze a text, you must figure out why the author wrote it in the first place.\n\n> The three most common purposes are **PIE**:\n> **P**ersuade: To convince you to agree.\n> **I**nform: To teach you objective facts.\n> **E**ntertain: To amuse or tell a story.",
    contentVn: "Mỗi văn bản đều được viết với một **Mục đích** cụ thể. Trước khi có thể phân tích văn bản, bạn phải hiểu tại sao tác giả lại viết nó.\n\n> Ba mục đích phổ biến nhất là:\n> **Thuyết phục:** Để thuyết phục bạn đồng ý.\n> **Thông tin:** Để dạy bạn những sự thật khách quan.\n> **Giải trí:** Để làm bạn vui hoặc kể một câu chuyện.",
    example: "A newspaper editorial arguing that the city needs more parks is written to Persuade.",
    exampleVn: "Một bài xã luận trên báo lập luận rằng thành phố cần nhiều công viên hơn được viết để Thuyết phục.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_1.mp3"
  },
  {
    type: "concept",
    title: "Fact vs. Opinion",
    titleVn: "Sự thật vs. Ý kiến",
    icon: "Scale",
    color: "bg-[#58cc02]",
    content: "When reading informational texts or the news, it is critical to separate what is actually true from what the author simply believes.\n\n> A **Fact** is a statement that can be objectively proven true or false using evidence, science, or historical records.\n> An **Opinion** is a personal belief, judgment, or feeling that cannot be universally proven.",
    contentVn: "Khi đọc các văn bản thông tin hoặc tin tức, điều rất quan trọng là phải phân biệt điều gì thực sự đúng với điều mà tác giả chỉ đơn giản tin là đúng.\n\n> **Sự thật** là một tuyên bố có thể được chứng minh khách quan là đúng hoặc sai bằng bằng chứng, khoa học hoặc hồ sơ lịch sử.\n> **Ý kiến** là niềm tin cá nhân, đánh giá hoặc cảm giác không thể được chứng minh một cách phổ quát.",
    example: "Fact: The human body is composed of about 60% water.\nOpinion: Swimming is the best way to exercise.",
    exampleVn: "Sự thật: Cơ thể con người bao gồm khoảng 60% là nước.\nÝ kiến: Bơi lội là cách tốt nhất để tập thể dục.",
    image: "/images/GED/fact_opinion1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_2.mp3"
  },
  {
    type: "concept",
    title: "Claims & Evidence",
    titleVn: "Luận điểm & Bằng chứng",
    icon: "ShieldCheck",
    color: "bg-[#ff4b4b]",
    content: "When an author wants to persuade you, they will build an argument. An argument is not a fight; it is a logical structure.\n\n> **The Claim:** The main argument or point the author is trying to defend.\n> **The Evidence:** The statistics, expert quotes, or historical facts used to prove the claim is valid.",
    contentVn: "Khi một tác giả muốn thuyết phục bạn, họ sẽ xây dựng một lập luận. Lập luận không phải là một cuộc cãi vã; nó là một cấu trúc logic.\n\n> **Luận điểm:** Lập luận chính hoặc điểm mà tác giả đang cố gắng bảo vệ.\n> **Bằng chứng:** Các số liệu thống kê, trích dẫn chuyên gia, hoặc sự thật lịch sử được sử dụng để chứng minh luận điểm là hợp lý.",
    example: "Claim: Daily reading improves vocabulary.\nEvidence: A university study showed that students who read for 20 minutes a day learned 1,800,000 new words a year.",
    exampleVn: "Luận điểm: Đọc sách hàng ngày cải thiện vốn từ vựng.\nBằng chứng: Một nghiên cứu đại học cho thấy những sinh viên đọc 20 phút mỗi ngày học được 1.800.000 từ mới một năm.",
    image: "/images/GED/reading_map1.svg",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_3.mp3"
  },
  {
    type: "concept",
    title: "Author's Tone",
    titleVn: "Giọng điệu của Tác giả",
    icon: "MessageSquare",
    color: "bg-[#ce82ff]",
    content: "Because you cannot hear the author's voice when reading, you have to look for emotional clues in the text.\n\n> The **Tone** is the author's underlying attitude or feeling toward the subject they are writing about.\n\nYou can often determine the tone by examining the descriptive adjectives and verbs the author chooses to use.",
    contentVn: "Vì bạn không thể nghe được giọng của tác giả khi đọc, bạn phải tìm kiếm các manh mối cảm xúc trong văn bản.\n\n> **Giọng điệu** là thái độ hoặc cảm xúc cơ bản của tác giả đối với chủ đề mà họ đang viết.\n\nBạn thường có thể xác định giọng điệu bằng cách xem xét các tính từ và động từ miêu tả mà tác giả chọn sử dụng.",
    example: "Using words like 'devastating', 'tragic', and 'heartbreaking' creates a serious, sorrowful tone.\nUsing words like 'ridiculous', 'absurd', and 'nonsense' creates a sarcastic or critical tone.",
    exampleVn: "Sử dụng các từ như 'tàn phá', 'bi thảm' và 'đau lòng' tạo ra một giọng điệu nghiêm túc, buồn bã.\nSử dụng các từ như 'lố bịch', 'vô lý' và 'vô nghĩa' tạo ra một giọng điệu mỉa mai hoặc chỉ trích.",
    audio: "/audio/GED/ENG_1A/slide_ENG_1A_4.mp3"
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You now understand purpose, claims, and evidence.",
    subtitleVn: "Đạt được mục tiêu: Bây giờ bạn đã hiểu mục đích, luận điểm và bằng chứng.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
</file>

<file path="src/data/GED/ENG_1A/workbook.js">
// src/data/GED/ENG_1A/workbook.js
export const workbook = null;
</file>

<file path="src/data/index.js">
// src/data/index.js

export const Y8_META = []; export const Y8_DATA = {};
export const Y9_META = []; export const Y9_DATA = {};
export const ESL_META = []; export const ESL_DATA = {};
export const GED_META = []; export const GED_DATA = {};

// Automatically pulls all .js files in these folders
const modules = import.meta.glob('./**/*.js', { eager: true });

for (const path in modules) {
  if (path.includes('index.js')) continue;

  const module = modules[path];
  
  let data = null;
  for (const key in module) {
    const exp = module[key];
    if (exp && typeof exp === 'object' && exp.meta && exp.meta.id) {
      data = exp;
      break;
    }
  }
  
  if (!data) continue;

  const id = data.meta.id;
  const track = data.meta.track?.toUpperCase() || 'Y8';

  // Strict deduplication: Only push if the ID isn't already registered
  if (track === 'Y8' && !Y8_DATA[id]) { Y8_DATA[id] = data; Y8_META.push(data.meta); }
  else if (track === 'Y9' && !Y9_DATA[id]) { Y9_DATA[id] = data; Y9_META.push(data.meta); }
  else if (track === 'ESL' && !ESL_DATA[id]) { ESL_DATA[id] = data; ESL_META.push(data.meta); }
  else if (track === 'GED' && !GED_DATA[id]) { GED_DATA[id] = data; GED_META.push(data.meta); }
}

const sortById = (a, b) => a.id.localeCompare(b.id);
Y8_META.sort(sortById);
Y9_META.sort(sortById);
ESL_META.sort(sortById);
GED_META.sort(sortById);
</file>

<file path="src/hooks/useStudentProgress.js">
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ensure this matches how you initialize Supabase in your project!
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Notice we added 'track' as a parameter here, defaulting to Y9
export function useStudentProgress(navigate, track = 'Y9') {
  const [user, setUser] = useState(null);
  const [allProgress, setAllProgress] = useState({
    Y8: {},
    Y9: {},
    ESL: {},
    GED: {}
  });
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

      if (data && data.progress) {
        let dbProgress = data.progress;
        const validTracks = ['Y8', 'Y9', 'ESL', 'GED'];

        // AUTO-MIGRATION: If keys are old unit IDs like "U1", move everything to Y9
        const isOldFormat = Object.keys(dbProgress).some(key => !validTracks.includes(key));
        if (isOldFormat) {
          dbProgress = {
            Y8: {},
            Y9: dbProgress,
            ESL: {},
            GED: {}
          };
          // Silently fix the database in the background so it doesn't happen again
          await supabase.from('students').update({ progress: dbProgress }).eq('id', session.user.id);
        } else {
          // Ensure the base structure exists even if a track is empty
          validTracks.forEach(t => {
            if (!dbProgress[t]) dbProgress[t] = {};
          });
        }

        setAllProgress(dbProgress);
      }
      
      setIsLoadingDB(false);
    };

    fetchProgress();
  }, [navigate]);

  const saveScore = async (unitId, section, score, answers = null) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    // Get the existing score (defaults to 0 if they have never played this section)
    const existingScore = newProgress[track][unitId][section]?.current || 0;

    newProgress[track][unitId] = {
      ...newProgress[track][unitId],
      [section]: {
        // ⚠️ FIX: Math.max ensures we only ever keep the highest XP score
        current: Math.max(existingScore, score),
        // We still update the answers if they provide new ones so they can see their latest work
        answers: answers || newProgress[track][unitId][section]?.answers || null
      }
    };

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const addStrike = async (unitId, newStrikes) => {
    const newProgress = { ...allProgress };
    
    if (!newProgress[track]) newProgress[track] = {};
    if (!newProgress[track][unitId]) newProgress[track][unitId] = {};

    newProgress[track][unitId].strikes = newStrikes;

    setAllProgress(newProgress);
    await supabase.from('students').update({ progress: newProgress }).eq('id', user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { 
    user, 
    allProgress, // <-- THE FIX: Exposing allProgress so the Dashboard can actually read it
    unitScores: allProgress[track] || {}, 
    isLoadingDB, 
    saveScore, 
    addStrike, 
    handleLogout 
  };
}
</file>

<file path="src/tasks/Games.jsx">
// src/tasks/Games.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Play, Skull, RefreshCcw, X, GraduationCap, Coins, Snowflake, Timer } from 'lucide-react';

const DEFAULT_CONFIG = { layout: { rows: 10, cols: 15, path: [] }, enemies: {}, towers: {}, waves: [] };

export default function Games({ pool, unitId, scores, onComplete, onQuit }) {
  const config = pool?.gameConfig || DEFAULT_CONFIG;
  const vocabPool = (pool && Array.isArray(pool)) ? pool.filter(w => w.isReal) : [];
  
  const unitXP = Object.entries(scores || {})
    .filter(([key]) => key !== 'strikes')
    .reduce((sum, [key, val]) => sum + (val?.current || 0), 0);
  
  const initialCredits = Math.max(0, unitXP);

  const [gameState, setGameState] = useState('IDLE');
  const [uiState, setUiState] = useState({ credits: initialCredits, lives: 100, wave: 0, score: 0 });
  const [renderData, setRenderData] = useState({ creeps: [], projectiles: [], towers: [], floaters: [], particles: [] });
  
  const [activeBuilder, setActiveBuilder] = useState(null); 
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [selectedTower, setSelectedTower] = useState(null); 
  const [hoveredTowerId, setHoveredTowerId] = useState(null);
  
  const [vocabChallenge, setVocabChallenge] = useState(null);
  const [vocabInput, setVocabInput] = useState('');
  const [vocabTimeLeft, setVocabTimeLeft] = useState(5);

  const engine = useRef({
    credits: initialCredits,
    lives: 100,
    wave: 0,
    score: 0,
    creeps: [],
    projectiles: [],
    towers: [],
    floaters: [],
    particles: [],
    spawnQueue: [],
    lastTick: 0,
    lastUiSync: 0,
    timeSinceLastSpawn: 0,
    entityIdCounter: 0
  });

  const requestRef = useRef();

  const generateWave = (waveNum) => {
    const queue = [];
    const waveIndex = waveNum - 1;

    if (config.waves && config.waves[waveIndex]) {
      config.waves[waveIndex].forEach(group => {
        for (let i = 0; i < group.count; i++) {
          const stats = config.enemies[group.type];
          queue.push({ typeKey: group.type, hp: stats.hp, maxHp: stats.hp, ...stats, delay: group.interval });
        }
      });
    } else {
      const endlessLevel = waveNum - (config.waves?.length || 0); 
      const hpMultiplier = Math.pow(1.15, endlessLevel);
      const enemyCount = 20 + Math.floor(endlessLevel * 3);
      const types = ['GLAZED', 'CRULLER', 'CRULLER', 'FRITTER', 'FRITTER', 'JELLY'];

      for (let i = 0; i < enemyCount; i++) {
        const typeKey = types[Math.floor(Math.random() * types.length)];
        const stats = config.enemies[typeKey];
        queue.push({
          typeKey, 
          hp: stats.hp * hpMultiplier, maxHp: stats.hp * hpMultiplier,
          ...stats, speed: stats.speed * (typeKey === 'JELLY' ? 1 : 1.05),
          delay: 400 + Math.random() * 400 
        });
      }
    }
    engine.current.spawnQueue = queue;
  };

  const endWave = () => {
    const e = engine.current;
    let bankIncome = 0;
    
    e.towers.filter(t => config.towers[t.typeId].type === 'INCOME').forEach(bank => {
      const tier = config.towers[bank.typeId].tiers[bank.level];
      bankIncome += tier.income;
      spawnFloater(bank.row, bank.col, `+$${tier.income}`, 'text-yellow-400');
    });

    const waveBonus = 10 + (e.wave * 2);
    e.credits += waveBonus + bankIncome;
    
    setGameState('PAUSED');
    if (e.wave > 1 && e.wave % 5 === 0) triggerVocabChallenge();
  };

  const spawnFloater = (row, col, text, colorClass) => {
    engine.current.floaters.push({
      id: `f_${engine.current.entityIdCounter++}`,
      row, col, text, colorClass, life: 1000, maxLife: 1000
    });
  };

  const spawnParticle = (row, col, colorClass, radius) => {
    engine.current.particles.push({
      id: `p_${engine.current.entityIdCounter++}`,
      row, col, colorClass, radius, life: 300, maxLife: 300
    });
  };

  const triggerVocabChallenge = () => {
    setGameState('VOCAB');
    if (!vocabPool || vocabPool.length === 0) { resolveVocab(true); return; }
    const target = vocabPool[Math.floor(Math.random() * vocabPool.length)];
    
    // Strict enforcement: uses target.def (English definition)
    setVocabChallenge({ word: target.word, def: target.def });
    setVocabInput('');
    setVocabTimeLeft(5);
  };

  useEffect(() => {
    if (gameState === 'VOCAB') {
      const timer = setInterval(() => {
        setVocabTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            resolveVocab(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleVocabSubmit = (e) => {
    e.preventDefault();
    if (vocabChallenge && vocabInput.trim().toLowerCase() === vocabChallenge.word.toLowerCase()) {
      resolveVocab(true);
    }
  };

  const resolveVocab = (success) => {
    if (success) {
      engine.current.credits += 25; 
      engine.current.creeps.forEach(c => c.hp *= 0.2); 
    }
    setVocabChallenge(null);
    setGameState('PLAYING');
    engine.current.lastTick = performance.now(); 
  };

  const findTarget = (tower, creeps, range) => {
    let validTargets = creeps.filter(c => {
      const dist = Math.sqrt(Math.pow(c.row - tower.row, 2) + Math.pow(c.col - tower.col, 2));
      return dist <= range;
    });

    if (validTargets.length === 0) return null;

    switch (tower.targeting) {
      case 'FIRST': return validTargets.reduce((a, b) => (a.pathIndex + a.progress > b.pathIndex + b.progress ? a : b));
      case 'LAST': return validTargets.reduce((a, b) => (a.pathIndex + a.progress < b.pathIndex + b.progress ? a : b));
      case 'STRONG': return validTargets.reduce((a, b) => (a.hp > b.hp ? a : b));
      case 'CLOSE': 
        return validTargets.reduce((a, b) => {
          const dA = Math.pow(a.row - tower.row, 2) + Math.pow(a.col - tower.col, 2);
          const dB = Math.pow(b.row - tower.row, 2) + Math.pow(b.col - tower.col, 2);
          return dA < dB ? a : b;
        });
      default: return validTargets[0];
    }
  };

  const tick = useCallback((time) => {
    if (gameState !== 'PLAYING') return;

    const e = engine.current;
    if (!e.lastTick) e.lastTick = time;
    const delta = time - e.lastTick;
    e.lastTick = time;

    // 1. Spawning
    if (e.spawnQueue.length > 0) {
      e.timeSinceLastSpawn += delta;
      if (e.timeSinceLastSpawn >= e.spawnQueue[0].delay) {
        const next = e.spawnQueue.shift();
        e.creeps.push({
          id: `creep_${e.entityIdCounter++}`, ...next,
          pathIndex: 0, progress: 0, freezeTimer: 0, freezeMod: 0,
          row: config.layout.path[0][0], col: config.layout.path[0][1]
        });
        e.timeSinceLastSpawn = 0;
      }
    } else if (e.creeps.length === 0 && e.spawnQueue.length === 0) {
      e.wave += 1;
      endWave();
      return; 
    }

    // 2. Creeps
    for (let i = e.creeps.length - 1; i >= 0; i--) {
      const c = e.creeps[i];
      if (c.freezeTimer > 0) c.freezeTimer -= delta;

      const startNode = config.layout.path[c.pathIndex];
      const endNode = config.layout.path[c.pathIndex + 1];

      if (!endNode) {
        e.lives -= 1;
        e.creeps.splice(i, 1);
        if (e.lives <= 0) { setGameState('GAMEOVER'); return; }
        continue;
      }

      const dist = Math.abs(endNode[0] - startNode[0]) + Math.abs(endNode[1] - startNode[1]);
      const currentSpeed = c.freezeTimer > 0 ? c.speed * (1 - c.freezeMod) : c.speed;
      const moveAmount = (currentSpeed * (delta / 1000)) / dist;
      c.progress += moveAmount;

      if (c.progress >= 1) {
        c.pathIndex++;
        c.progress = 0;
        c.row = endNode[0]; c.col = endNode[1];
      } else {
        c.row = startNode[0] + (endNode[0] - startNode[0]) * c.progress;
        c.col = startNode[1] + (endNode[1] - startNode[1]) * c.progress;
      }
    }

    // 3. Towers
    e.towers.forEach(t => {
      const tConf = config.towers[t.typeId];
      if (tConf.type === 'INCOME') return; 
      
      const tier = tConf.tiers[t.level];
      t.timeSinceFired += delta;
      
      if (t.timeSinceFired >= tier.cooldown) {
        const target = findTarget(t, e.creeps, tier.range);
        if (target) {
          t.timeSinceFired = 0;
          t.visualScale = 1.2; 
          
          e.projectiles.push({
            id: `proj_${e.entityIdCounter++}`,
            row: t.row, col: t.col,
            targetId: target.id,
            towerType: tConf.type,
            tierParams: tier,
            color: tConf.color.split(' ')[0], 
            progress: 0,
            speed: tConf.type === 'SNIPER' ? 300 : 150
          });
        }
      } else if (t.visualScale > 1) {
        t.visualScale = Math.max(1, t.visualScale - (delta / 100)); 
      }
    });

    // 4. Projectiles
    for (let i = e.projectiles.length - 1; i >= 0; i--) {
      const p = e.projectiles[i];
      let target = e.creeps.find(c => c.id === p.targetId);
      
      if (!target) { e.projectiles.splice(i, 1); continue; }

      p.progress += delta / p.speed; 

      if (p.progress >= 1) {
        e.projectiles.splice(i, 1);
        spawnParticle(target.row, target.col, p.color, 1);

        const dealDamage = (creep, dmg) => {
          creep.hp -= dmg;
          if (creep.hp <= 0 && !creep.dead) {
            creep.dead = true; 
            e.credits += creep.reward;
            e.score += creep.reward * 10;
            spawnFloater(creep.row, creep.col, `+$${creep.reward}`, 'text-amber-300');
          }
        };

        if (p.towerType === 'SPLASH') {
          spawnParticle(target.row, target.col, 'bg-rose-500', p.tierParams.radius);
          e.creeps.forEach(c => {
            const dist = Math.sqrt(Math.pow(c.row - target.row, 2) + Math.pow(c.col - target.col, 2));
            if (dist <= p.tierParams.radius) dealDamage(c, p.tierParams.damage);
          });
        } 
        else if (p.towerType === 'CHAIN') {
          dealDamage(target, p.tierParams.damage);
          if (p.bounces === undefined) p.bounces = p.tierParams.bounces;
          if (p.bounces > 0 && !target.dead) {
            const nextTarget = e.creeps
              .filter(c => c.id !== target.id && !c.dead)
              .map(c => ({ c, d: Math.pow(c.row - target.row, 2) + Math.pow(c.col - target.col, 2) }))
              .filter(o => Math.sqrt(o.d) <= 3)
              .sort((a, b) => a.d - b.d)[0];

            if (nextTarget) {
              e.projectiles.push({
                ...p, id: `proj_${e.entityIdCounter++}`,
                row: target.row, col: target.col,
                targetId: nextTarget.c.id, bounces: p.bounces - 1, progress: 0
              });
            }
          }
        }
        else if (p.towerType === 'FROST') {
          dealDamage(target, p.tierParams.damage);
          target.freezeTimer = p.tierParams.duration;
          target.freezeMod = p.tierParams.slowPercent;
        }
        else {
          dealDamage(target, p.tierParams.damage);
        }

      } else {
        p.currentRow = p.row + (target.row - p.row) * p.progress;
        p.currentCol = p.col + (target.col - p.col) * p.progress;
      }
    }

    e.creeps = e.creeps.filter(c => !c.dead);
    e.particles.forEach(p => p.life -= delta);
    e.particles = e.particles.filter(p => p.life > 0);
    e.floaters.forEach(f => f.life -= delta);
    e.floaters = e.floaters.filter(f => f.life > 0);

    // 5. Throttled UI State Sync (Prevents rendering lag)
    if (time - e.lastUiSync > 40) { 
      setUiState({ credits: Math.floor(e.credits), lives: e.lives, wave: e.wave, score: Math.floor(e.score) });
      setRenderData({
        creeps: [...e.creeps], projectiles: [...e.projectiles],
        towers: [...e.towers], floaters: [...e.floaters], particles: [...e.particles]
      });
      e.lastUiSync = time;
    }

    requestRef.current = requestAnimationFrame(tick);
  }, [gameState, config]);

  useEffect(() => {
    if (gameState === 'PLAYING') requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, tick]);

  const handleStartWave = () => {
    generateWave(engine.current.wave + 1);
    setGameState('PLAYING');
    engine.current.lastTick = performance.now();
  };

  const handleMouseMove = (e) => {
    if (!activeBuilder || (gameState !== 'PLAYING' && gameState !== 'IDLE' && gameState !== 'PAUSED')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const col = Math.floor(((e.clientX - rect.left) / rect.width) * config.layout.cols);
    const row = Math.floor(((e.clientY - rect.top) / rect.height) * config.layout.rows);
    
    if (col < 0 || col >= config.layout.cols || row < 0 || row >= config.layout.rows) return;
    if (hoverCell.row === row && hoverCell.col === col) return;

    let valid = true;
    const isOnPath = config.layout.path.some((p, i, arr) => {
      if (i === arr.length - 1) return false;
      const [r1, c1] = p, [r2, c2] = arr[i + 1];
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      return row >= minR && row <= maxR && col >= minC && col <= maxC;
    });
    if (isOnPath) valid = false;
    if (engine.current.towers.some(t => t.row === row && t.col === col)) valid = false;

    setHoverCell({ row, col, valid });
  };

  const handleGridClick = () => {
    if (gameState === 'GAMEOVER') return;

    if (activeBuilder) {
      if (hoverCell.valid) {
        const tConf = config.towers[activeBuilder];
        const cost = tConf.tiers[0].cost;
        if (engine.current.credits >= cost) {
          engine.current.credits -= cost;
          engine.current.towers.push({
            id: `tower_${engine.current.entityIdCounter++}`,
            typeId: activeBuilder, level: 0,
            row: hoverCell.row, col: hoverCell.col,
            timeSinceFired: 9999, targeting: 'FIRST', visualScale: 1
          });
          setUiState(prev => ({ ...prev, credits: Math.floor(engine.current.credits) }));
          setActiveBuilder(null);
          setHoverCell({ row: -1, col: -1, valid: false });
        }
      } else {
        setActiveBuilder(null);
      }
    } else {
      const clickedTower = engine.current.towers.find(t => t.row === hoverCell.row && t.col === hoverCell.col);
      setSelectedTower(clickedTower ? { ...clickedTower } : null);
    }
  };

  const handleUpgrade = () => {
    if (!selectedTower) return;
    const tRef = engine.current.towers.find(t => t.id === selectedTower.id);
    const tConf = config.towers[tRef.typeId];
    const nextTier = tConf.tiers[tRef.level + 1];
    
    if (nextTier && engine.current.credits >= nextTier.cost) {
      engine.current.credits -= nextTier.cost;
      tRef.level += 1;
      setSelectedTower({ ...tRef });
      setUiState(prev => ({ ...prev, credits: Math.floor(engine.current.credits) }));
    }
  };

  const handleSell = () => {
    if (!selectedTower) return;
    const tRef = engine.current.towers.find(t => t.id === selectedTower.id);
    const tConf = config.towers[tRef.typeId];
    
    let baseCost = tConf.tiers[0].cost;
    let upgradeCost = 0;
    for(let i = 1; i <= tRef.level; i++) {
        upgradeCost += tConf.tiers[i].cost;
    }
    const sellValue = Math.floor((baseCost * 0.5) + (upgradeCost * 0.25));
    
    engine.current.credits += sellValue;
    engine.current.towers = engine.current.towers.filter(t => t.id !== selectedTower.id);
    
    setSelectedTower(null);
    setHoveredTowerId(null);
    setUiState(prev => ({ ...prev, credits: Math.floor(engine.current.credits) }));
  };

  const handleChangeTargeting = (mode) => {
    if (!selectedTower) return;
    const tRef = engine.current.towers.find(t => t.id === selectedTower.id);
    tRef.targeting = mode;
    setSelectedTower({ ...tRef });
  };

  let displaySellValue = 0;
  if (selectedTower) {
    const tConf = config.towers[selectedTower.typeId];
    let uCost = 0;
    for(let i=1; i<=selectedTower.level; i++) uCost += tConf.tiers[i].cost;
    displaySellValue = Math.floor((tConf.tiers[0].cost * 0.5) + (uCost * 0.25));
  }

  const cellW = 100 / config.layout.cols;
  const cellH = 100 / config.layout.rows;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 font-sans select-none overflow-hidden">
      
      {/* HUD HEADER */}
      <div className="h-20 bg-slate-800 border-b-4 border-slate-900 flex items-center justify-between px-6 shrink-0 shadow-md z-30">
        <div className="flex items-center space-x-6">
          <div className="bg-slate-900 px-5 py-2.5 rounded-xl border border-slate-700 flex items-center shadow-inner">
            <Heart className="w-6 h-6 mr-3 text-rose-500 fill-current" />
            <span className="text-2xl font-black text-white">{uiState.lives}</span>
          </div>
          <div className="bg-slate-900 px-5 py-2.5 rounded-xl border border-slate-700 flex items-center shadow-inner">
            <Coins className="w-6 h-6 text-yellow-400 mr-3" />
            <span className="text-2xl font-black text-white">${uiState.credits}</span>
          </div>
        </div>
        
        {/* DYNAMIC WAVE BUTTON / INDICATOR */}
        <div className="flex-1 flex justify-center">
          {gameState === 'IDLE' || gameState === 'PAUSED' ? (
            <button 
              onClick={handleStartWave}
              className="flex items-center px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-black text-2xl tracking-widest border-b-[6px] border-indigo-700 active:border-b-0 active:translate-y-[6px] transition-all shadow-lg animate-pulse"
            >
              <Play className="w-6 h-6 mr-3 fill-current" /> START WAVE {uiState.wave + 1}
            </button>
          ) : (
            <div className="flex items-center bg-indigo-900 px-8 py-3 rounded-2xl border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <span className="text-indigo-300 text-lg font-black uppercase tracking-widest mr-4">Wave</span>
              <span className="text-3xl font-black text-white">{uiState.wave}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="block text-slate-400 text-xs font-black uppercase tracking-widest">Score</span>
            <span className="block text-2xl font-black text-emerald-400 leading-none">{uiState.score}</span>
          </div>
          <button onClick={onQuit} className="p-3 bg-slate-700 hover:bg-rose-500 rounded-xl transition-colors border-b-4 border-slate-900 hover:border-rose-700 active:border-b-0 active:translate-y-[4px]">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* RESPONSIVE SCALING CONTAINER */}
      <div className="flex-1 w-full relative flex items-center justify-center p-2 sm:p-4 min-h-0 bg-slate-900">
        <div 
          className="relative bg-emerald-400 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-8 border-slate-800 cursor-crosshair shrink-0"
          style={{ 
            aspectRatio: '15 / 10', 
            width: 'min(100%, calc((100vh - 200px) * 1.5))', 
            maxHeight: '100%' 
          }}
          onMouseMove={handleMouseMove}
          onClick={handleGridClick}
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `linear-gradient(45deg, #10b981 25%, transparent 25%, transparent 75%, #10b981 75%, #10b981), linear-gradient(45deg, #10b981 25%, transparent 25%, transparent 75%, #10b981 75%, #10b981)`, backgroundSize: `${cellW * 2}% ${cellH * 2}%`, backgroundPosition: `0 0, ${cellW}% ${cellH}%` }}></div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline 
              points={config.layout.path.map(p => `${(p[1] + 0.5) * cellW},${(p[0] + 0.5) * cellH}`).join(' ')}
              fill="none" stroke="#451a03" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" 
            />
            <polyline 
              points={config.layout.path.map(p => `${(p[1] + 0.5) * cellW},${(p[0] + 0.5) * cellH}`).join(' ')}
              fill="none" stroke="#78350f" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter"
            />
          </svg>

          {config.layout.path.length > 0 && (
            <>
              <div className="absolute w-[4%] h-[6%] bg-slate-900 border-4 border-slate-700 rounded-lg z-10 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${(config.layout.path[0][1] + 0.5) * cellW}%`, top: `${(config.layout.path[0][0] + 0.5) * cellH}%` }}/>
              <div className="absolute w-[4%] h-[6%] bg-slate-900 border-4 border-slate-700 rounded-lg z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl" style={{ left: `${(config.layout.path[config.layout.path.length-1][1] + 0.5) * cellW}%`, top: `${(config.layout.path[config.layout.path.length-1][0] + 0.5) * cellH}%` }}/>
            </>
          )}

          {renderData.towers.map((t) => {
            const tConf = config.towers[t.typeId];
            const isSelected = selectedTower && selectedTower.id === t.id;
            const isHovered = hoveredTowerId === t.id;
            const showRange = isSelected || isHovered;

            return (
              <div key={t.id} onMouseEnter={() => setHoveredTowerId(t.id)} onMouseLeave={() => setHoveredTowerId(null)}>
                {showRange && (
                  <div className="absolute rounded-full border-4 border-white/40 bg-white/10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ width: `${tConf.tiers[t.level].range * cellW * 2}%`, height: `${tConf.tiers[t.level].range * cellH * 2}%`, left: `${(t.col + 0.5) * cellW}%`, top: `${(t.row + 0.5) * cellH}%` }} />
                )}
                <div 
                  className={`absolute flex items-center justify-center rounded-2xl border-b-4 z-20 ${tConf.color} transform -translate-x-1/2 -translate-y-1/2 transition-transform shadow-lg ${isSelected ? 'ring-4 ring-white' : ''}`}
                  style={{ width: `${cellW * 0.8}%`, height: `${cellH * 0.8}%`, left: `${(t.col + 0.5) * cellW}%`, top: `${(t.row + 0.5) * cellH}%`, transform: `translate(-50%, -50%) scale(${t.visualScale || 1})` }}
                >
                  <span className="font-black opacity-80 text-[1.2vw] sm:text-lg">T{t.level + 1}</span>
                </div>
              </div>
            );
          })}

          {activeBuilder && hoverCell.row !== -1 && (
            <div className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${(hoverCell.col + 0.5) * cellW}%`, top: `${(hoverCell.row + 0.5) * cellH}%` }}>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 ${hoverCell.valid ? 'border-white/50 bg-white/20' : 'border-rose-500/80 bg-rose-500/30'}`} style={{ width: `${config.towers[activeBuilder].tiers[0].range * cellW * 2}%`, height: `${config.towers[activeBuilder].tiers[0].range * cellH * 2}%` }} />
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border-b-4 flex items-center justify-center ${config.towers[activeBuilder].color} ${hoverCell.valid ? 'opacity-80' : 'opacity-40 grayscale'}`} style={{ width: `${cellW * 0.8}%`, height: `${cellH * 0.8}%` }} />
            </div>
          )}

          {renderData.creeps.map((c) => (
            <div 
              key={c.id}
              className={`absolute rounded-full shadow-[0_4px_0_rgba(0,0,0,0.2)] border-2 z-20 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${c.color} ${c.border} ${c.freezeTimer > 0 ? 'ring-4 ring-cyan-300' : ''}`}
              style={{ width: `${c.radius * 2}px`, height: `${c.radius * 2}px`, left: `${(c.col + 0.5) * cellW}%`, top: `${(c.row + 0.5) * cellH}%`, transition: 'left 40ms linear, top 40ms linear' }}
            >
              <div className="absolute -top-3 w-8 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div className={`h-full ${c.freezeTimer > 0 ? 'bg-cyan-400' : 'bg-emerald-400'}`} style={{ width: `${(c.hp / c.maxHp) * 100}%` }}></div>
              </div>
              {c.freezeTimer > 0 && <Snowflake className="w-4 h-4 text-cyan-600 absolute" />}
            </div>
          ))}

          {renderData.projectiles.map((p) => (
            <div key={p.id} className={`absolute rounded-full z-30 shadow-[0_0_10px_currentColor] transform -translate-x-1/2 -translate-y-1/2 ${p.color}`} style={{ width: p.towerType === 'SPLASH' ? '12px' : '6px', height: p.towerType === 'SPLASH' ? '12px' : '6px', left: `${(p.currentCol + 0.5) * cellW}%`, top: `${(p.currentRow + 0.5) * cellH}%` }} />
          ))}

          {renderData.particles.map((p) => (
            <div key={p.id} className={`absolute rounded-full z-10 opacity-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${p.colorClass}`} style={{ width: `${p.radius * cellW * 2}%`, height: `${p.radius * cellH * 2}%`, left: `${(p.col + 0.5) * cellW}%`, top: `${(p.row + 0.5) * cellH}%`, transform: `translate(-50%, -50%) scale(${1 + (1 - p.life/p.maxLife)})`, opacity: p.life / p.maxLife }} />
          ))}

          {renderData.floaters.map((f) => (
            <div key={f.id} className={`absolute z-40 font-black text-[1.5vw] sm:text-xl pointer-events-none transform -translate-x-1/2 drop-shadow-md ${f.colorClass}`} style={{ left: `${(f.col + 0.5) * cellW}%`, top: `${(f.row + 0.5) * cellH}%`, transform: `translate(-50%, -${(1 - f.life/f.maxLife) * 40}px)`, opacity: f.life / f.maxLife }}>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* BUILD/UPGRADE HUD */}
      <div className="bg-slate-800 border-t-8 border-slate-900 p-6 z-40 relative flex-shrink-0 h-36">
        {selectedTower ? (
          <div className="flex items-center justify-between bg-slate-700 p-4 rounded-3xl border border-slate-600 animate-in slide-in-from-bottom-4 absolute inset-4">
            <div className="flex items-center space-x-6">
              <div className={`w-16 h-16 rounded-2xl border-b-4 flex items-center justify-center ${config.towers[selectedTower.typeId].color}`}>
                <span className="font-black text-2xl opacity-80">T{selectedTower.level + 1}</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{config.towers[selectedTower.typeId].name}</h3>
                <div className="flex space-x-3 mt-1">
                  <div className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded-md">DMG: {config.towers[selectedTower.typeId].tiers[selectedTower.level].damage || 0}</div>
                  <div className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded-md">RNG: {config.towers[selectedTower.typeId].tiers[selectedTower.level].range || 0}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {config.towers[selectedTower.typeId].type !== 'INCOME' && (
                <div className="flex flex-col justify-center mr-4">
                  <span className="text-[10px] text-slate-400 font-black uppercase mb-1">Target Priority</span>
                  <select value={selectedTower.targeting} onChange={(e) => handleChangeTargeting(e.target.value)} className="bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-600 outline-none cursor-pointer">
                    <option value="FIRST">First</option><option value="LAST">Last</option>
                    <option value="STRONG">Strong</option><option value="CLOSE">Close</option>
                  </select>
                </div>
              )}
              
              <button onClick={handleSell} className="px-6 py-4 bg-rose-500 hover:bg-rose-400 border-b-[6px] border-rose-700 active:border-b-0 active:translate-y-[6px] rounded-2xl text-white font-black transition-all">
                Sell (+${displaySellValue})
              </button>
              
              {config.towers[selectedTower.typeId].tiers[selectedTower.level + 1] ? (
                <button onClick={handleUpgrade} disabled={uiState.credits < config.towers[selectedTower.typeId].tiers[selectedTower.level + 1].cost} className={`px-8 py-4 border-b-[6px] rounded-2xl text-white font-black transition-all ${uiState.credits >= config.towers[selectedTower.typeId].tiers[selectedTower.level + 1].cost ? 'bg-emerald-500 hover:bg-emerald-400 border-emerald-700 active:border-b-0 active:translate-y-[6px]' : 'bg-slate-600 border-slate-700 opacity-50 cursor-not-allowed'}`}>
                  Upgrade (${config.towers[selectedTower.typeId].tiers[selectedTower.level + 1].cost})
                </button>
              ) : (
                <div className="px-8 py-4 flex items-center justify-center bg-amber-400 rounded-2xl text-amber-900 font-black opacity-60">MAXED</div>
              )}
              <button onClick={() => {setSelectedTower(null); setHoveredTowerId(null);}} className="p-4 bg-slate-600 hover:bg-slate-500 rounded-2xl text-white border-b-[6px] border-slate-800 active:border-b-0 active:translate-y-[6px] transition-all"><X className="w-6 h-6"/></button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-6 h-full items-center">
            {Object.values(config.towers).map(t => (
              <button 
                key={t.id} onClick={() => setActiveBuilder(activeBuilder === t.id ? null : t.id)}
                disabled={uiState.credits < t.tiers[0].cost}
                className={`relative flex flex-col items-center justify-center p-3 w-36 h-full rounded-3xl border-b-[6px] transition-all transform hover:-translate-y-1
                  ${activeBuilder === t.id ? 'ring-4 ring-white scale-105' : ''}
                  ${uiState.credits >= t.tiers[0].cost ? `${t.color} hover:brightness-110 active:border-b-0 active:translate-y-[6px]` : 'bg-slate-700 border-slate-900 text-slate-500 cursor-not-allowed opacity-60'}`}
              >
                <span className="text-xs font-black uppercase tracking-widest mb-1 opacity-90">{t.name}</span>
                <span className="text-xl font-black bg-black/20 px-4 py-1 rounded-xl border border-black/10">${t.tiers[0].cost}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CLIL TYPING CHALLENGE OVERLAY */}
      {gameState === 'VOCAB' && vocabChallenge && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md px-4">
          <form onSubmit={handleVocabSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-2xl w-full border-8 border-indigo-500 animate-in zoom-in-95 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-3 bg-indigo-500 transition-all duration-1000 ease-linear" style={{ width: `${(vocabTimeLeft / 5) * 100}%` }}></div>
            
            <div className="flex justify-between items-center mb-6 mt-2">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-200"><GraduationCap className="w-8 h-8 text-indigo-600" /></div>
              <div className="flex items-center text-rose-500 font-black text-4xl animate-pulse"><Timer className="w-8 h-8 mr-2" /> {vocabTimeLeft}s</div>
            </div>
            
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Tactical Override Requires Action</h3>
            <p className="text-2xl font-black text-slate-800 mb-8 border-l-4 border-indigo-400 pl-4 bg-indigo-50/50 p-4 rounded-r-xl">"{vocabChallenge.def}"</p>
            
            <input 
              type="text" 
              autoFocus
              value={vocabInput} 
              onChange={(e) => setVocabInput(e.target.value)}
              placeholder="Type the exact vocabulary word..."
              className="w-full text-3xl font-black text-slate-800 bg-slate-100 p-6 rounded-2xl border-4 border-slate-200 outline-none focus:border-indigo-400 focus:bg-white transition-colors uppercase"
            />
          </form>
        </div>
      )}

      {/* GAME OVER OVERLAY */}
      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-rose-950/90 backdrop-blur-md">
          <Skull className="w-32 h-32 text-rose-500 mb-6 animate-pulse" />
          <h2 className="text-7xl font-black text-white tracking-tight mb-2">Breached</h2>
          <p className="text-rose-200 font-medium text-2xl mb-2">You survived to <strong className="text-white">Wave {uiState.wave}</strong></p>
          <p className="text-rose-300 font-bold uppercase tracking-widest text-xl mb-12">Final Score: {uiState.score}</p>
          <div className="flex space-x-6">
            <button onClick={() => {
                engine.current = { credits: initialCredits, lives: 100, wave: 0, score: 0, creeps: [], projectiles: [], towers: [], floaters: [], particles: [], spawnQueue: [], lastTick: 0, lastUiSync: 0, timeSinceLastSpawn: 0, entityIdCounter: 0 };
                setUiState({ credits: initialCredits, lives: 100, wave: 0, score: 0 }); setRenderData({ creeps: [], projectiles: [], towers: [], floaters: [], particles: [] }); setGameState('IDLE');
              }} className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-3xl font-black text-xl uppercase tracking-widest border-b-[6px] border-slate-900 active:border-b-0 active:translate-y-[6px] transition-all flex items-center"><RefreshCcw className="w-6 h-6 mr-3" /> Retry</button>
            <button onClick={() => onComplete(Math.min(10, Math.floor(uiState.score / 100)))} className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-3xl font-black text-xl uppercase tracking-widest border-b-[6px] border-indigo-700 active:border-b-0 active:translate-y-[6px] transition-all">Submit Score</button>
          </div>
        </div>
      )}

    </div>
  );
}
</file>

<file path="src/views/YearDashboard.jsx">
import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, XCircle, Loader2, LogOut, AlertTriangle, Construction } from 'lucide-react';

import { useStudentProgress } from '../hooks/useStudentProgress';
import UnitCard from '../components/UnitCard';

import { Y8_META, Y8_DATA, Y9_META, Y9_DATA, ESL_META, ESL_DATA, GED_META, GED_DATA } from '../data/index';

const Recognition = lazy(() => import('../tasks/Recognition'));
const Spell = lazy(() => import('../tasks/Spell'));
const Dictation = lazy(() => import('../tasks/Dictation'));
const Reading = lazy(() => import('../tasks/Reading'));
const ShortAnswers = lazy(() => import('../tasks/ShortAnswers'));
const Diagrams = lazy(() => import('../tasks/Diagrams'));
const Essay = lazy(() => import('../tasks/Essay'));
const Assessment = lazy(() => import('../tasks/Assessment'));
const Notes = lazy(() => import('../tasks/Notes'));
const Games = lazy(() => import('../tasks/Games')); // <-- Add this line

const THEMES = {
  Y8: { bg: 'bg-indigo-50', banner: 'from-indigo-500 via-indigo-600 to-blue-700', iconBg: 'bg-indigo-100', iconText: 'text-indigo-700', accent: 'border-indigo-400' },
  Y9: { bg: 'bg-emerald-50', banner: 'from-emerald-500 via-emerald-600 to-teal-700', iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', accent: 'border-emerald-400' },
  ESL: { bg: 'bg-amber-50', banner: 'from-amber-500 via-amber-600 to-orange-700', iconBg: 'bg-amber-100', iconText: 'text-amber-700', accent: 'border-amber-400' },
  GED: { bg: 'bg-rose-50', banner: 'from-rose-500 via-rose-600 to-red-700', iconBg: 'bg-rose-100', iconText: 'text-rose-700', accent: 'border-rose-400' }
};

// Generic Fallback view for missing components
function PlaceholderView({ title, onQuit }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Construction className="w-12 h-12 text-amber-500" />
      </div>
      <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">{title}</h2>
      <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 mb-10 text-lg font-bold text-slate-500">
        Under Construction / Coming Soon
      </div>
      <button onClick={onQuit} className="px-10 py-5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-2xl font-black text-xl uppercase tracking-widest border-b-[6px] border-[#1899D6] active:border-b-0 active:translate-y-[6px] transition-all">
        Return to Dashboard
      </button>
    </div>
  );
}

export default function YearDashboard({ track }) {
  const navigate = useNavigate();
  
  const { user, unitScores = {}, isLoadingDB, saveScore, addStrike, handleLogout } = useStudentProgress(navigate, track);

  const [appState, setAppState] = useState('MENU');
  const [activeUnit, setActiveUnit] = useState(null);
  const [currentPool, setCurrentPool] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  if (isLoadingDB) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-bold tracking-widest uppercase animate-pulse">Syncing with Cloud...</p>
      </div>
    );
  }

  let META_DATA = [];
  let UNIT_DATA = {};
  let trackTitle = "";
  const currentTheme = THEMES[track] || THEMES.Y8;

  if (track === 'Y8') { META_DATA = Y8_META || []; UNIT_DATA = Y8_DATA || {}; trackTitle = "Year 8 Science"; }
  else if (track === 'Y9') { META_DATA = Y9_META || []; UNIT_DATA = Y9_DATA || {}; trackTitle = "Year 9 Science"; }
  else if (track === 'ESL') { META_DATA = ESL_META || []; UNIT_DATA = ESL_DATA || {}; trackTitle = "ESL Foundation"; }
  else if (track === 'GED') { META_DATA = GED_META || []; UNIT_DATA = GED_DATA || {}; trackTitle = "English"; }

  let totalTrackXP = 0;
  let maxTrackXP = META_DATA.length * 100; // Visual standard scale (but true maximum is actually 125 per unit)
  
  META_DATA.forEach(unit => {
    const s = unitScores?.[unit.id] || {};
    const unitTotal = Object.entries(s)
      .filter(([key]) => key !== 'strikes')
      .reduce((sum, [key, val]) => {
        let max = 10;
        if (['p1', 'p10', 'p11'].includes(key)) max = 5;
        if (['p6', 'p7', 'p8'].includes(key)) max = 20;
        return sum + Math.min(val?.current || 0, max);
      }, 0);
    totalTrackXP += unitTotal;
  });

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const startMode = (unitId, mode) => {
    setActiveUnit(unitId);
    const data = UNIT_DATA[unitId];
    if (!data) return;

    // Standardize the arrays
    const realW = (data.realWords || []).map(w => ({ ...w, isReal: true }));

    if (mode === 'WORD_REC' || mode === 'SPELLING') {
      setCurrentPool([...realW].sort(() => Math.random() - 0.5));
    } else if (mode === 'DICTATION') {
      const dictationData = data.dictation || [];
      const dictationPool = realW.map((w, i) => ({
        ...w,
        dictSent: dictationData[i]?.sent || w.sent,
        dictVn: dictationData[i]?.vnSent || w.vnSent
      })).sort(() => Math.random() - 0.5);
      setCurrentPool(dictationPool);
    } else if (mode === 'GAMES') {
      // <-- Add this block to pass both vocab and the level config
      const gamePool = [...realW].sort(() => Math.random() - 0.5);
      gamePool.gameConfig = data.games?.gameConfig || null;
      setCurrentPool(gamePool);
    } else if (mode === 'READ_COMP') {
      setCurrentPool(data.passages || []);
    } else if (mode === 'SHORT_ANSWERS') {
      setCurrentPool({ shortQA: data.shortQA || [] });
    } else if (mode === 'DIAGRAMS') {
      setCurrentPool({ diagrams: data.diagrams || [] });
    } else if (mode === 'ESSAY') {
      setCurrentPool({ essay: data.essay || null });
    } else if (mode === 'ASSESSMENT') {
      setCurrentPool([]); // Assessment pulls full unit data directly in render
    } else if (mode === 'NOTES') {
      setCurrentPool(data.notes || []);
    }
    
    setAppState(mode);
  };

  const handleTaskComplete = async (section, rawScore, answers = null) => {
    let finalScore = rawScore;

    // Enforce Capped Boundaries at the DB write stage
    if (['p1', 'p10', 'p11'].includes(section)) {
      if (section === 'p10' || section === 'p11') finalScore = 5; 
      else finalScore = Math.min(5, Math.ceil((rawScore / 10) * 5)); 
    } else if (['p6', 'p7', 'p8'].includes(section)) {
      finalScore = rawScore <= 10 ? Math.ceil((rawScore / 10) * 20) : rawScore; 
      finalScore = Math.min(20, finalScore);
    } else {
      finalScore = Math.min(10, finalScore);
    }

    await saveScore(activeUnit, section, finalScore, answers);
    setAppState('MENU');
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} selection:bg-indigo-200 selection:text-indigo-900 transition-colors duration-500`}>
      {appState === 'MENU' && (
        <div className="animate-in fade-in duration-500 pb-20">
          
          <div className={`relative w-full bg-gradient-to-r ${currentTheme.banner} shadow-xl overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-white opacity-20 rounded-full blur-[90px] mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -left-24 w-[25rem] h-[25rem] bg-black opacity-20 rounded-full blur-[70px] mix-blend-multiply"></div>
              <div className="absolute top-10 left-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-[60px] animate-pulse"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.2] mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                <div className="flex items-center space-x-6">
                  <button onClick={() => navigate('/home')} className="bg-white/10 p-4 rounded-2xl hover:bg-white/25 transition-all text-white backdrop-blur-md active:scale-95 shadow-sm border border-white/20">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-md">{trackTitle}</h1>
                    <div className="inline-flex bg-gradient-to-b from-amber-400 to-amber-500 text-amber-900 px-5 py-2.5 rounded-2xl shadow-lg border-b-[4px] border-amber-600 items-center space-x-3 backdrop-blur-md">
                      <span className="text-2xl drop-shadow-sm">🏆</span>
                      <span className="text-[13px] font-black uppercase tracking-widest opacity-90 mt-0.5">Total XP</span>
                      <span className="text-lg font-black bg-white/40 px-3 py-0.5 rounded-xl shadow-inner border border-white/30">{totalTrackXP} / {maxTrackXP}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white">
                  <button onClick={() => setShowHowItWorks(true)} className="flex items-center bg-white/10 px-5 py-3.5 rounded-2xl text-sm font-bold hover:bg-white/25 transition-all shadow-sm backdrop-blur-md border border-white/20 active:scale-95">
                    <Info className="w-5 h-5 mr-2 opacity-90" /> How it Works
                  </button>
                  <div className="flex items-center bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm pl-5 pr-3 group transition-all hover:bg-white/15">
                    <span className="font-black text-sm uppercase tracking-widest text-white mr-4 drop-shadow-sm">{userName}</span>
                    <button onClick={handleLogout} className="bg-white/20 hover:bg-rose-500 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95" title="Logout">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-10">
            {META_DATA.map((metaUnit) => {
              const contentData = UNIT_DATA[metaUnit.id] || {};
              const combinedUnitPayload = {
                ...contentData,
                id: metaUnit.id,
                meta: {
                  id: metaUnit.id,
                  title: metaUnit.title,
                  description: metaUnit.desc,
                  icon: contentData.meta?.icon || 'BookOpen',
                  thresholds: contentData.meta?.thresholds
                }
              };

              return (
                <UnitCard 
                  key={metaUnit.id} 
                  unit={combinedUnitPayload} 
                  scores={unitScores?.[metaUnit.id] || {}} 
                  currentTheme={currentTheme} 
                  startMode={startMode} 
                />
              );
            })}
          </div>
        </div>
      )}

      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full p-8 md:p-10 relative max-h-[90vh] overflow-y-auto">
             <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-3xl font-black text-slate-800 flex items-center tracking-tight"><div className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-4 shadow-inner"><Info className="w-7 h-7"/></div>How it Works</h2>
                <button onClick={() => setShowHowItWorks(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><XCircle className="w-8 h-8"/></button>
             </div>
             
             <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
               Welcome to the <strong className="text-slate-800">Science Lab</strong>! This platform uses <strong className="text-indigo-600">CLIL</strong> (Content and Language Integrated Learning) to help you master English through real scientific concepts. Here is how your learning journey works:
             </p>
             
             <div className="space-y-4 mb-8">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 1: Core Practice</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Fast-paced language drills inspired by the <strong>DET</strong> (Duolingo English Test) and <strong>PTE</strong> formats. Build your spelling, listening, and reading skills.</p>
                 </div>
               </div>
               
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start shadow-sm hover:shadow-md transition-all">
                 <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-inner"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div></div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-xl mb-1">Phase 2: AI Graded Writing</h3>
                   <p className="text-slate-500 font-medium leading-relaxed">Practice short answers and essays. Our AI Tutor grades your work instantly using the official <strong>Cambridge Mark Scheme</strong> to give you personalized feedback.</p>
                 </div>
               </div>
             </div>

             <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl mb-8 flex items-start shadow-sm">
               <AlertTriangle className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-black text-rose-800 text-sm uppercase tracking-widest mb-1 opacity-90">AI Monitoring & Safety</h4>
                 <p className="text-rose-700 text-sm font-medium leading-relaxed">
                   Student submissions to the AI grader are monitored. Any harmful, inappropriate, or "joke" answers are flagged. <strong>After 3 strikes</strong>, you will be permanently locked out of the AI Tutor for that unit and can only earn partial points.
                 </p>
               </div>
             </div>
             
             <div className="flex justify-end">
               <button onClick={() => setShowHowItWorks(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest px-10 py-4 rounded-2xl border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-md">
                 Understood
               </button>
             </div>
          </div>
        </div>
      )}

      {appState === 'WORKBOOK' && <PlaceholderView title="Extra Workbook Practice" onQuit={() => setAppState('MENU')} />}

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 animate-spin text-indigo-500" /></div>}>
        {appState === 'WORD_REC' && <Recognition pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p1', s)} />}
        {appState === 'SPELLING' && <Spell pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p2', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'DICTATION' && <Dictation pool={currentPool} track={track} onComplete={(s) => handleTaskComplete('p3', s)} onQuit={() => setAppState('MENU')} />}
        {appState === 'READ_COMP' && <Reading pool={currentPool} track={track} unitId={activeUnit} onComplete={(s) => handleTaskComplete('p4', s)} onQuit={() => setAppState('MENU')} />}
        
        {appState === 'NOTES' && <Notes slides={currentPool} onComplete={() => handleTaskComplete('p10', 10)} onQuit={() => setAppState('MENU')} />}

        {appState === 'SHORT_ANSWERS' && (
          <ShortAnswers 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p6?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p6', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
        
        {appState === 'DIAGRAMS' && (
          <Diagrams 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p7?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p7', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ESSAY' && (
          <Essay 
            pool={currentPool} 
            savedData={unitScores[activeUnit]?.p8?.answers || {}} 
            strikes={unitScores[activeUnit]?.strikes || 0}
            onAddStrike={(newStrikes) => addStrike(activeUnit, newStrikes)}
            onComplete={(s, answers) => handleTaskComplete('p8', s, answers)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}

        {appState === 'ASSESSMENT' && (
          <Assessment 
            unit={UNIT_DATA[activeUnit]} 
            onComplete={(score) => handleTaskComplete('p9', score)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
        {appState === 'GAMES' && (
          <Games 
            pool={currentPool} 
            unitId={activeUnit}
            scores={unitScores[activeUnit] || {}} 
            onComplete={(score) => handleTaskComplete('p12', score)} 
            onQuit={() => setAppState('MENU')} 
          />
        )}
      </Suspense>

    </div>
  );
}
</file>

</files>
