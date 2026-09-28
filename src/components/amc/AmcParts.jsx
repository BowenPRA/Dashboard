// The pieces the Practice Test and its Review share: the text of a problem,
// its figure, and the five choices. Kept out of the two task files so a
// problem looks the same while it is being sat and while it is being reviewed.
import { Check, X as XIcon } from 'lucide-react';
import { renderMath } from '../notes/renderMath';
import { splitInlineMath } from '../notes/splitInlineMath';
import { LETTERS } from '../../utils/amcTest';

const InlineMath = ({ math }) => {
  const { html, error } = renderMath(math, false);
  if (error) return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>;
  return <span className="mx-px" dangerouslySetInnerHTML={{ __html: html }} />;
};

const BlockMath = ({ math }) => {
  const { html, error } = renderMath(math, true);
  if (error) return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>;
  return <div className="overflow-x-auto py-1 my-3 flex justify-center" dangerouslySetInnerHTML={{ __html: html }} />;
};

/** `_italic_` inside a run of plain text. Maths has already been taken out. */
const Plain = ({ text }) =>
  String(text).split(/(_[^_\s][^_]*_)/g).map((part, i) =>
    part.length > 2 && part.startsWith('_') && part.endsWith('_')
      ? <em key={i}>{part.slice(1, -1)}</em>
      : <span key={i}>{part}</span>);

/** One line: **bold**, _italic_ and $inline maths$. */
export function Inline({ text }) {
  if (text == null) return null;
  return String(text).split(/(\*\*.+?\*\*)/g).map((part, i) => {
    const bold = part.length > 4 && part.startsWith('**') && part.endsWith('**');
    const runs = splitInlineMath(bold ? part.slice(2, -2) : part).map((m, j) =>
      m.math !== undefined ? <InlineMath key={j} math={m.math} /> : <Plain key={j} text={m.text} />);
    return bold
      ? <strong key={i} className="font-bold text-slate-900 dark:text-white">{runs}</strong>
      : <span key={i}>{runs}</span>;
  });
}

/**
 * A problem's text: paragraphs split on a blank line, `$$…$$` set on its own
 * line, and lines that start "• " set as a list.
 */
export function Prose({ text, className = '' }) {
  const blocks = String(text || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.startsWith('$$') && block.endsWith('$$') && block.length > 4) {
          return <BlockMath key={i} math={block.slice(2, -2).trim()} />;
        }
        const lines = block.split('\n');
        if (lines.every((l) => l.trim().startsWith('• '))) {
          return (
            <ul key={i} className="my-3 ml-6 list-disc space-y-1.5 marker:text-slate-400">
              {lines.map((l, j) => <li key={j} className="pl-1"><Inline text={l.trim().slice(2)} /></li>)}
            </ul>
          );
        }
        return <p key={i} className={i > 0 ? 'mt-3' : ''}><Inline text={block} /></p>;
      })}
    </div>
  );
}

/**
 * A figure, on white in both themes — the drawings are black ink, the way a
 * contest paper prints them, and are not theme-flipped.
 */
export function Figure({ svg, className = '' }) {
  if (!svg) return null;
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="max-w-full rounded-2xl bg-white p-3 sm:p-4 ring-1 ring-slate-200 dark:ring-slate-700 [&>svg]:max-h-[36vh] [&>svg]:min-h-[7rem] [&>svg]:w-auto"
        dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

const plainLength = (s) => String(s).replace(/\\[a-zA-Z]+|[${}\\]/g, '').length;

/** Long choices (a list of paths) stack; short ones sit in a row of five. */
const choicesAreLong =(choices = []) => choices.some((c) => plainLength(c) > 7);

/**
 * The five choices.
 *   pick      the letter chosen now
 *   onPick    omit to freeze the row
 *   marks     { A: 'right' | 'wrong' | 'ruled' } — how each choice is shown
 *             once something is known about it ('ruled' = already tried)
 */
export function Choices({ choices = [], pick = null, onPick, marks = {}, size = 'md' }) {
  const long = choicesAreLong(choices);
  const frozen = !onPick;
  return (
    <div className={`grid gap-2.5 sm:gap-3 ${long ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-5'}`} role="radiogroup">
      {choices.map((choice, i) => {
        const letter = LETTERS[i];
        const mark = marks[letter];
        const chosen = pick === letter;
        const dead = frozen || mark === 'ruled';

        let box = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200';
        let bubble = 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400';
        if (mark === 'right') {
          box = 'bg-emerald-50 dark:bg-emerald-900/25 border-emerald-500 text-emerald-900 dark:text-emerald-100';
          bubble = 'border-emerald-600 bg-emerald-600 text-white';
        } else if (mark === 'wrong') {
          box = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-900 dark:text-rose-100';
          bubble = 'border-rose-500 bg-rose-500 text-white';
        } else if (mark === 'ruled') {
          box = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600';
          bubble = 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600';
        } else if (chosen) {
          box = 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-400 text-slate-900 dark:text-white';
          bubble = 'border-blue-700 bg-blue-700 text-white dark:border-blue-400 dark:bg-blue-500';
        }

        return (
          <button
            key={letter}
            type="button"
            role="radio"
            aria-checked={chosen}
            aria-label={`Choice ${letter}`}
            disabled={dead}
            onClick={() => onPick?.(letter)}
            className={`flex items-center gap-2.5 rounded-2xl border-2 border-b-4 text-left transition-all
              ${size === 'sm' ? 'px-3 py-2' : 'px-3 sm:px-3.5 py-2.5 sm:py-3'}
              ${box}
              ${dead ? 'cursor-default' : 'cursor-pointer hover:border-blue-400 active:border-b-2 active:translate-y-[2px]'}
              ${mark === 'ruled' ? 'line-through decoration-slate-300 dark:decoration-slate-600' : ''}`}
          >
            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 font-sans text-sm font-black ${bubble}`}>
              {mark === 'right' ? <Check className="h-4 w-4" strokeWidth={4} /> : mark === 'wrong' ? <XIcon className="h-4 w-4" strokeWidth={4} /> : letter}
            </span>
            <span className="min-w-0 font-serif text-lg leading-snug"><Inline text={choice} /></span>
          </button>
        );
      })}
    </div>
  );
}
