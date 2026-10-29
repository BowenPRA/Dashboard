// The words and colours of Find It, Say Why's stage panel (AngleSumStage.jsx),
// kept apart so that file exports components only.
export const INK = '#5c2483';
export const GOOD = 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-200';
export const BAD = 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300';
export const IDLE = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#5c2483]';
export const PRIMARY = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none bg-[#58cc02] border-[#3e7500] text-white';

export const ST = {
  en: {
    stages: { first: 'First', decide: '180 or 360', add: 'Add', subtract: 'Subtract', share: 'Share', calc: 'Opposite', why: 'Say why', total: 'Add', quick: 'Answer' },
    first: 'Which angle can you find first?', firstSub: 'Find the letter that is the only angle you do not know in its fact.',
    decide: 'Decide first: 180° or 360°?', decideSub: 'A straight line is 180°. A full turn, or the four corners of a quadrilateral, is 360°.',
    add: 'Step 1 · Add the angles you know.', addFig: 'Tap every angle you know on the picture (a small square is 90°). Then add them.',
    addChips: 'Tap every angle you know. Then add them.', pickSome: 'Tap the angles first.',
    subtract: (T) => `Step 2 · Take the total away from ${T}°.`,
    share: (n) => `Share it: the ${n} angles with the same letter are the same size.`,
    calc: (L, v) => `${L} is opposite the ${v}° corner. How big is ${L}?`,
    why: 'Say why.', whySub: (line) => line,
    total: 'Add the angles at the point.', straight: 'Is XY a straight line?',
    quick: 'Type the angle, then choose the reason.', quickSub: 'A wrong answer opens the steps, where it went wrong.',
    because: 'because', check: 'Check', small: 'small square',
    working: 'Your working',
  },
  fr: {
    stages: { first: 'D’abord', decide: '180 ou 360', add: 'Additionne', subtract: 'Soustrais', share: 'Partage', calc: 'Opposé', why: 'Justifie', total: 'Additionne', quick: 'Réponse' },
    first: 'Quel angle peux-tu trouver d’abord ?', firstSub: 'Trouve la lettre qui est le seul angle inconnu de sa propriété.',
    decide: 'Décide d’abord : 180° ou 360° ?', decideSub: 'Une ligne droite fait 180°. Un tour complet, ou les quatre coins d’un quadrilatère, font 360°.',
    add: 'Étape 1 · Additionne les angles que tu connais.', addFig: 'Touche chaque angle que tu connais sur le dessin (un petit carré fait 90°). Puis additionne-les.',
    addChips: 'Touche chaque angle que tu connais. Puis additionne-les.', pickSome: 'Touche d’abord les angles.',
    subtract: (T) => `Étape 2 · Enlève le total de ${T}°.`,
    share: (n) => `Partage : les ${n} angles avec la même lettre ont la même taille.`,
    calc: (L, v) => `${L} est opposé au coin de ${v}°. Combien mesure ${L} ?`,
    why: 'Justifie.', whySub: (line) => line,
    total: 'Additionne les angles au point.', straight: 'XY est-elle une ligne droite ?',
    quick: 'Écris l’angle, puis choisis la raison.', quickSub: 'Une réponse fausse ouvre les étapes, là où ça s’est trompé.',
    because: 'car', check: 'Vérifier', small: 'petit carré',
    working: 'Ton travail',
  },
};
