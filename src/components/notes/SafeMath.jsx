// Shared KaTeX render helpers for the Notes task and its layout components.
// Extracted verbatim from Notes.jsx so the ported lesson layouts render maths
// the same way the legacy `type`-based slides always have.
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Strip zero-width joiners/spaces (U+200B–U+200D, U+FEFF) that break KaTeX.
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200D\\uFEFF]', 'g');

export const SafeInlineMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const html = k.renderToString(String(math).replace(ZERO_WIDTH, ''), { throwOnError: true, displayMode: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} className="mx-0.5" />;
  } catch (err) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={err.message}>{math}</span>;
  }
};

export const SafeBlockMath = ({ math }) => {
  try {
    const k = katex.default || katex;
    const html = k.renderToString(String(math).replace(ZERO_WIDTH, ''), { throwOnError: true, displayMode: true });
    return (
      <div
        className="overflow-x-auto overflow-y-hidden w-full py-4 my-2 px-4 flex justify-center custom-scrollbar"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (err) {
    return (
      <div className="flex flex-col items-center bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 max-w-full overflow-x-auto my-4 w-full">
        <span className="text-rose-500 font-black text-xs uppercase tracking-widest mb-2">KaTeX Error</span>
        <span className="text-rose-700 dark:text-rose-300 font-mono text-sm text-center mb-2">{err.message}</span>
        <span className="text-rose-800/50 dark:text-rose-200/50 font-mono text-xs text-center break-all">{math}</span>
      </div>
    );
  }
};
