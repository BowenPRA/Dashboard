// Dev-only harness for the GED Extended Response task.
//
// The Essay task sits behind Supabase auth, two unit-selection screens and a
// live Gemini call, none of which help when the thing to look at is the layout
// and the score report. So this mounts the real `Essay` component with the real
// ENG_1C essay data and stubs the grader endpoint, letting the writing screen
// and every branch of the results screen be inspected directly.
// Entry point: preview-essay.html. Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Essay from './tasks/Essay';
import { ENGLISH_1C_DATA } from './data/GED_ENG/ENG_1C/data';

/** Canned grader replies, one per branch of the report worth eyeballing. */
const REPLIES = {
  'Strong — 5/6': {
    mode: 'ged',
    isHarmful: false, isGarbage: false,
    gedTraits: { arguments: 2, development: 2, conventions: 1 },
    gedTotal: 5, gedScaled: 10,
    wordCount: 342, paragraphs: 5,
    positionStated: 'Source 2 is better supported, because it answers the cost question Source 1 leaves open.',
    evidenceCited: [
      'The thirty percent rise in ridership in Elmwood (Source 1)',
      'The cost of running ticket machines and inspectors (Source 1)',
      'Marsden having to buy unbudgeted vehicles (Source 2)',
    ],
    analysisOfArgumentation:
      'You weigh the two measured results against each other and point out that Source 1 never says who pays for the free service — that is real evaluation, not summary.',
    // Quotes here must appear verbatim in whatever is typed into the response
    // box, or the workshop will (correctly) drop them. Type the sample response
    // in src/preview-essay-sample.txt to exercise every card.
    revisions: [
      {
        quote: 'the buses is free',
        correction: 'the buses are free',
        kind: 'Subject-verb agreement',
        why: '"Buses" is more than one, so the verb must be "are".',
        rule: 'Plural subject takes are, were, have',
      },
      {
        quote: 'Source 2 give evidence',
        correction: 'Source 2 gives evidence',
        kind: 'Subject-verb agreement',
        why: 'One source is singular, so the verb needs an -s.',
        rule: 'Singular subject takes verb + s',
      },
      {
        quote: 'expensive, because of this the town',
        correction: 'expensive. Because of this, the town',
        kind: 'Comma splice',
        why: 'Two complete sentences cannot be joined with only a comma.',
        rule: 'Join full sentences with a full stop',
      },
      {
        quote: 'they had to buy new vehicle',
        correction: 'they had to buy new vehicles',
        kind: 'Plural noun',
        why: 'More than one vehicle was bought, so add -s.',
        rule: 'Countable nouns need a plural -s',
      },
      {
        quote: 'In conclusion i think',
        correction: 'In conclusion, I think',
        kind: 'Capital letter',
        why: 'The word "I" is always a capital, and the opening phrase takes a comma.',
        rule: 'Always write I with a capital letter',
      },
    ],
    conventionIssues: [
      '"the buses is free" — subject-verb agreement',
      '"Source 2 give evidence" — missing -s',
      '"expensive, because of this the town" — comma splice',
    ],
    traitFeedback: {
      arguments: 'You state your position in the first line and never lose it. The Marsden and Elmwood figures are both used precisely. Naming the cost Source 1 never answers is exactly the judgement the top band asks for.',
      development: 'Five paragraphs, each doing one job, with a conclusion that does more than repeat the opening. Transitions like "however" and "because of this" hold it together.',
      conventions: 'The meaning is always clear, but the same three errors repeat: verbs after plural subjects, and two clauses joined by a comma. A repeated pattern of error caps this trait at 1.',
    },
    scoreNotes: [],
    nonScorableReason: '',
    nextStep: 'Read each sentence aloud and check the verb matches the subject — that one habit is worth a whole mark here.',
  },
  'Summary only — capped': {
    mode: 'ged',
    isHarmful: false, isGarbage: false,
    gedTraits: { arguments: 1, development: 1, conventions: 2 },
    gedTotal: 4, gedScaled: 8,
    wordCount: 118, paragraphs: 2,
    positionStated: 'Free buses are a good idea.',
    evidenceCited: ['The thirty percent rise in ridership in Elmwood (Source 1)'],
    analysisOfArgumentation: '',
    conventionIssues: [],
    traitFeedback: {
      arguments: 'You pick a side and you use one real figure from Source 1, which earns credit. But you never say whether that evidence is strong, and Source 2 is left untouched.',
      development: 'Two short paragraphs. The idea about cost is stated and then dropped rather than developed.',
      conventions: 'Clean, varied sentences throughout. Very little to correct here.',
    },
    scoreNotes: [
      'Trait 1 is capped at 1: the response chooses a side but never judges how good either side’s evidence is.',
      'Trait 2 is capped at 1: at 118 words there is not room to develop and organise ideas fully. Aim for 150+.',
    ],
    nonScorableReason: '',
    nextStep: 'Add one sentence saying which side’s evidence you trust more, and why.',
  },
  'Copied — not scorable': {
    mode: 'ged',
    isHarmful: false, isGarbage: false,
    gedTraits: { arguments: 0, development: 0, conventions: 0 },
    gedTotal: 0, gedScaled: 0,
    wordCount: 96, paragraphs: 1,
    positionStated: '',
    evidenceCited: [],
    analysisOfArgumentation: '',
    conventionIssues: [],
    traitFeedback: {
      arguments: 'There is no argument of your own here to score.',
      development: 'The response reproduces the source rather than developing an idea.',
      conventions: 'There is not enough of your own writing to judge.',
    },
    scoreNotes: [],
    nonScorableReason:
      'About 84% of this response is copied word-for-word from the sources or the prompt. A copied response scores zero on the real test — the marks are for your own analysis.',
    nextStep: 'Close the source pane and write one sentence in your own words saying which side you believe.',
  },
};

/**
 * A response containing, verbatim, every quote the "Strong — 5/6" reply flags.
 *
 * The response box blocks paste under exam conditions, which makes typing 200
 * words by hand the only way into Part 2 — so the harness writes it in through
 * React's own value setter instead.
 */
const SAMPLE = `Free buses is an idea that both sources talk about, but they do not agree about the cost.

Source 1 argues that a town should not charge for public transport at all. It says that in Elmwood the ridership rose by thirty percent in one year after the fares were removed. That number is real evidence and it is hard to argue with. However the writer never says who pays for the service once the fares are gone, and that silence is the weakest part of the argument.

Source 2 give evidence from Marsden instead. When the buses became busy there, they had to buy new vehicle that the town had not budgeted for, and running the service became expensive, because of this the town had to cut money from other services. This is a stronger case because it follows the money all the way to the end.

Also when the buses is free some people ride for one stop when they would have walked before, so the buses get crowded without helping anyone travel further.

In conclusion i think Source 2 is better supported, because it answers the question about cost that Source 1 leaves open.`;

/** Writes into a controlled React textarea the way a keyboard would. */
const fillResponse = () => {
  const box = document.querySelector('textarea');
  if (!box) return;
  const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
  setValue.call(box, SAMPLE);
  box.dispatchEvent(new Event('input', { bubbles: true }));
};

// Stubbed at module scope so the real fetch path inside aiGrader still runs,
// with the picked reply read at call time.
let activeReply = 'Strong — 5/6';
window.fetch = async (url) => {
  if (String(url).includes('gradeEssay')) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, status: 200, json: async () => REPLIES[activeReply] };
  }
  return { ok: false, status: 404, statusText: 'stubbed', json: async () => ({}) };
};

function Harness() {
  const [reply, setReply] = useState(activeReply);
  const [nonce, setNonce] = useState(0);

  return (
    <div>
      <div className="fixed bottom-4 left-4 z-50 flex flex-wrap gap-2 bg-white dark:bg-slate-900 border-2 border-indigo-400 rounded-2xl p-3 shadow-lg">
        {Object.keys(REPLIES).map((k) => (
          <button
            key={k}
            onClick={() => { activeReply = k; setReply(k); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${
              reply === k ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}
          >
            {k}
          </button>
        ))}
        <button
          onClick={fillResponse}
          className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-600 text-white"
        >
          Fill sample
        </button>
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-800 text-white"
        >
          Reset
        </button>
      </div>

      <Essay
        key={nonce}
        pool={{ essay: ENGLISH_1C_DATA.essay }}
        track="GED_ENG"
        unitTitle="Evaluating Arguments"
        savedData={{}}
        strikes={0}
        onAddStrike={() => {}}
        onComplete={(xp) => console.log('complete, xp =', xp)}
        onQuit={() => console.log('quit')}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
