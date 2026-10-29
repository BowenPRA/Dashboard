// src/data/Y7_SCI/U03_2/notes.js
// 3.2 Formation of the Solar System — the self-study deck. TWO classroom decks
// reduced to ONE (pairing rule 10): y7-science/U03_2 (27 slides, Learner's Book
// pp. 85–90) and y7-science/U03_models ("Models: Space", 20 slides). 21 slides,
// 13 scored: 5 predict, 1 sort, 1 order, 6 checks. Plan, with every cut and why:
// docs/y7-science/plans/U03_2.md.
//
// ONE QUESTION HOLDS IT TOGETHER: NOBODY WAS THERE — SO HOW DO WE KNOW?
// The words first, on a cake (evidence, hypothesis, support, contradict); then
// the facts (one direction, one plane); then the story, built step by step with
// two working models a student predicts before pressing Start; then the
// evidence that seems to contradict it; then what a model can and cannot show.
//
// For a student alone: the hand votes are `predict` activities, the whiteboard
// and finger votes are checks, "act it out" and the book-page starter are gone,
// and the copy-down panels are Key word cards. The scored item is always the
// thinking step: a prediction before the model runs, the reason after it.
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text. No maths here.
import { DIAGRAMS } from './diagrams.js';
import { StillCloud, SpinningCloud } from './widgets.jsx';
import { Formation } from './formation.jsx';
import { ScaleShrink } from './scale.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U03_2/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textFr) => ({ tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen', text, textFr });
const panel = (badge, badgeFr, text, textFr) => ({ tone: 'write', badge, badgeFr, icon: 'BookOpen', text, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Orbit',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.2 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.2 · Forces et énergie',
    title: 'Formation of the Solar System',
    titleFr: 'La formation du système solaire',
    objective: 'Explain how gravity and one spinning cloud of dust and gas made the Sun and the planets; say whether a fact supports or contradicts that idea, and what a model can and cannot show.',
    objectiveFr: 'Expliquer comment la gravité et un seul nuage de poussière et de gaz qui tournait ont fait le Soleil et les planètes ; dire si un fait confirme ou contredit cette idée, et ce qu’un modèle peut montrer ou non.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'Nobody was there — so how do we know? You will **predict** what two models do, put the story **in order**, and judge the **evidence**. **13 things are scored**: the first is on the next slide.',
      textFr: 'Personne n’était là — alors comment le sait-on ? Tu vas **prédire** ce que font deux modèles, remettre l’histoire **dans l’ordre**, et juger les **preuves**. **13 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: PREDICT — strong gravity needs…? (the book's Getting started) ─
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Start here · predict',
    eyebrowFr: 'Pour commencer · prédis',
    title: 'Strong Gravity',
    titleFr: 'Une gravité forte',
    ratio: 45,
    inlineSvg: DIAGRAMS.OPTIONS,
    content: 'In 3.1 you met **gravity**: every object pulls on every other object.\n\nSome objects pull much harder than others. What makes the difference?',
    contentFr: 'En 3.1, tu as vu la **gravité** : chaque objet attire tous les autres.\n\nCertains objets attirent beaucoup plus fort que d’autres. Qu’est-ce qui fait la différence ?',
    activity: {
      id: 'act_strong_gravity',
      type: 'predict',
      prompt: 'An object has a strong force of gravity. What must it have?',
      promptFr: 'Un objet a une force de gravité forte. Que doit-il avoir ?',
      options: [
        { val: 'size', name: 'A large size', nameFr: 'Une grande taille' },
        { val: 'mass', name: 'A large mass', nameFr: 'Une grande masse' },
        { val: 'hot', name: 'A hot surface', nameFr: 'Une surface chaude' },
      ],
      correct: 'mass',
      explain: '**A large mass.** Size is not enough: a beach ball is bigger than a bowling ball, but it has far less mass. Of these four, the **Sun** has the largest mass — 99.8% of all the mass in the Solar System — and it sits at the **centre**. Keep this in mind: the whole story runs on mass.',
      explainFr: '**Une grande masse.** La taille ne suffit pas : un ballon de plage est plus gros qu’une boule de bowling, mais il a beaucoup moins de masse. Des quatre, c’est le **Soleil** qui a la plus grande masse — 99.8% de toute la masse du système solaire — et il est au **centre**. Retiens-le : toute l’histoire repose sur la masse.',
    },
  },

  // 3 ─ SORT: Who ate the cake? (the book's "how do we know?", everyday first) ─
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Nobody was there — so how do we know?',
    eyebrowFr: 'Personne n’était là — alors comment le sait-on ?',
    title: 'Who Ate the Cake?',
    titleFr: 'Qui a mangé le gâteau ?',
    inlineSvg: DIAGRAMS.CAKE_CLUES,
    caption: 'The Solar System **formed** (was made) 4.6 billion years ago. Nobody was there to **observe** (watch) it. A detective has the same problem — and so does Mr Bowen.',
    captionFr: 'Le système solaire s’est **formé** il y a 4.6 milliards d’années. Personne n’était là pour l’**observer**. Un détective a le même problème — et M. Bowen aussi.',
    activity: {
      id: 'act_cake',
      type: 'sort',
      prompt: 'Hypothesis: the cat ate the cake. Does each clue support it, or contradict it?',
      promptFr: 'Hypothèse : le chat a mangé le gâteau. Chaque indice la confirme-t-il, ou la contredit-il ?',
      bins: [
        { id: 'supports', name: 'Supports it (agrees)', nameFr: 'La confirme (d’accord)' },
        { id: 'contradicts', name: 'Contradicts it (goes against)', nameFr: 'La contredit (va contre)' },
      ],
      cards: [
        { id: 'crumbs', name: 'Cake crumbs on the cat’s face', nameFr: 'Des miettes de gâteau sur le museau du chat', bin: 'supports' },
        { id: 'asleep', name: 'The cat is asleep, and very round', nameFr: 'Le chat dort, et il est tout rond', bin: 'supports' },
        { id: 'locked', name: 'The cat was locked outside all day', nameFr: 'Le chat était enfermé dehors toute la journée', bin: 'contradicts' },
      ],
      explain: 'The **crumbs** and the **fat, sleepy cat** fit the hypothesis: they support it. But the cat was **locked outside all day** — that goes against it: it contradicts it. Two for, one against. Scientists test an idea nobody could watch in the same way.',
      explainFr: 'Les **miettes** et le **chat gros et endormi** vont avec l’hypothèse : ils la confirment. Mais le chat était **enfermé dehors toute la journée** — ça va contre : ça la contredit. Deux pour, un contre. Les scientifiques testent de la même façon une idée que personne n’a pu observer.',
    },
  },

  // 4 ─ Evidence: the words (key word panel) + reveal ───────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Search',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Evidence',
    titleFr: 'Les preuves (evidence)',
    ratio: 50,
    inlineSvg: DIAGRAMS.CAKE_VERDICT,
    content: 'Two clues for, one against. What now?',
    contentFr: 'Deux indices pour, un contre. Et maintenant ?',
    notes: [
      keyWord(
        '**Evidence:** facts from observations or experiments.\n**Hypothesis:** an idea that can be tested.\nEvidence can **support** (agree with) or **contradict** (go against) a hypothesis.',
        '**Preuves (evidence, pas « évidence ») :** des faits tirés d’observations ou d’expériences.\n**Hypothèse (hypothesis) :** une idée qu’on peut tester.\nLes preuves peuvent **confirmer** (support) ou **contredire** (contradict) une hypothèse.',
      ),
    ],
    reveal: {
      label: 'So is the hypothesis wrong?',
      labelFr: 'Alors, l’hypothèse est-elle fausse ?',
      answer: '**Not yet.** Two clues support it. First look for an explanation: was a window open? Remember this — the Solar System has a "locked door" too.',
      answerFr: '**Pas encore.** Deux indices la confirment. Cherche d’abord une explication : une fenêtre était-elle ouverte ? Retiens-le — le système solaire a aussi sa « porte fermée ».',
    },
  },

  // 5 ─ The facts: look closely (the book's p. 86 drawing) + reveal ──────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The facts · find them first',
    eyebrowFr: 'Les faits · trouve-les d’abord',
    title: 'Look Closely',
    titleFr: 'Regarde bien',
    ratio: 34,
    inlineSvg: DIAGRAMS.SOLAR_SYSTEM,
    content: 'The eight planets and their **orbits** (paths) round the Sun.\n\nFind **two things** that are the same for every planet. Then open the answer.',
    contentFr: 'Les huit planètes et leurs **orbites** (chemins) autour du Soleil.\n\nTrouve **deux choses** qui sont pareilles pour toutes les planètes. Puis ouvre la réponse.',
    reveal: {
      label: 'Two things',
      labelFr: 'Deux choses',
      answer: 'They all go round the Sun **the same way**: every arrow points the same way round.\nAll the orbits lie in **one flat layer**.',
      answerFr: 'Elles tournent toutes autour du Soleil **dans le même sens** : toutes les flèches vont dans le même sens.\nToutes les orbites sont dans **une seule couche plate**.',
    },
  },

  // 6 ─ The same plane: the desk test, a spacecraft photo + CHECK (book Q2) ───
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Try it at your desk',
    eyebrowFr: 'Essaie à ton bureau',
    title: 'The Same Plane',
    titleFr: 'Le même plan',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIDE_VIEW,
    content: 'Lay a pen, an eraser and a ruler **flat** on your desk. Now look along the desk, with your eyes at the level of the desk. What do you see?\n\nA spacecraft took this photo. Mercury, Mars and Saturn are in a **line**.',
    contentFr: 'Pose un stylo, une gomme et une règle **à plat** sur ta table. Regarde maintenant le long de la table, les yeux à la hauteur de la table. Que vois-tu ?\n\nUn vaisseau spatial a pris cette photo. Mercure, Mars et Saturne sont **alignées**.',
    check: {
      id: 'chk_plane',
      q: 'All the planets orbit the Sun in the same plane. What does that mean?',
      qFr: 'Toutes les planètes tournent autour du Soleil dans le même plan (plane). Qu’est-ce que ça veut dire ?',
      options: [
        { val: 'A', text: 'They are all the same distance from the Sun', textFr: 'Elles sont toutes à la même distance du Soleil' },
        { val: 'B', text: 'Their orbits could all lie on one flat surface', textFr: 'Leurs orbites pourraient toutes être posées sur une seule surface plate' },
        { val: 'C', text: 'They all move at the same speed', textFr: 'Elles vont toutes à la même vitesse' },
        { val: 'D', text: 'Their orbits go all around the Sun, like a ball', textFr: 'Leurs orbites entourent le Soleil de tous les côtés, comme une boule' },
      ],
      correct: 'B',
      expEn: '**One flat surface**, like the pen, eraser and ruler on your desk. From the side, flat things make a line: that is why the spacecraft saw three planets in a row. (A plane here is not an aeroplane!) The planets are at different distances (A) and speeds (C), and their orbits make a flat plate, not a ball (D).',
      expFr: '**Une seule surface plate**, comme le stylo, la gomme et la règle sur ta table. De côté, des choses à plat forment une ligne : c’est pour ça que le vaisseau a vu trois planètes alignées. (Ici, « plane » veut dire plan, pas avion !) Les planètes sont à des distances (A) et des vitesses (C) différentes, et leurs orbites forment une assiette plate, pas une boule (D).',
    },
  },

  // 7 ─ Orbit, spin, axis: the facts (key panel), and "just luck?" ──────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Orbit',
    eyebrow: 'The facts',
    eyebrowFr: 'Les faits',
    title: 'Orbit, Spin, Axis',
    titleFr: 'Orbite, rotation, axe',
    ratio: 54,
    inlineSvg: DIAGRAMS.ORBIT_SPIN,
    content: 'The Sun spins the same way too, and so do most moons.\n\nAll the same way, all in one plane: **just luck?** Or did something make it happen?',
    contentFr: 'Le Soleil tourne aussi dans ce sens, et la plupart des lunes aussi.\n\nToutes dans le même sens, dans un seul plan : **un hasard ?** Ou est-ce que quelque chose l’a causé ?',
    notes: [
      panel(
        'The facts', 'Les faits',
        'All the planets **orbit** the Sun in the same direction, in the same **plane** (one flat surface).\nMost planets **spin** on their **axes** in the same direction too.\nThese facts are our **evidence**.',
        'Toutes les planètes **orbitent** autour du Soleil dans le même sens, dans le même **plan** (une seule surface plate).\nLa plupart des planètes **tournent** sur leur **axe** dans le même sens aussi.\nCes faits sont nos **preuves**.',
      ),
    ],
  },

  // 8 ─ A nebula, and a model (key panels) + reveal: one other reason ───────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key words · how stars begin',
    eyebrowFr: 'Mots clés · comment naissent les étoiles',
    title: 'A Nebula, and a Model',
    titleFr: 'Une nébuleuse, et un modèle',
    ratio: 55,
    inlineSvg: DIAGRAMS.MODEL_REAL,
    content: 'The **Orion Nebula** (Hubble): stars are forming in it today. Nobody can watch one form — it takes **millions of years** — so scientists make a **model**. Think of **one other** reason to use one.',
    contentFr: 'La **nébuleuse d’Orion** (Hubble) : des étoiles s’y forment aujourd’hui. Personne ne peut en voir une se former — cela prend **des millions d’années** — alors les scientifiques font un **modèle**. Trouve **une autre** raison d’en utiliser un.',
    notes: [
      keyWord(
        '**Nebula:** a cloud of dust and gas in space.\n**Model:** a way of showing something that is hard to observe directly.',
        '**Nébuleuse (nebula) :** un nuage de poussière et de gaz dans l’espace.\n**Modèle (model) :** une façon de montrer quelque chose qu’on ne peut pas bien observer directement.',
      ),
    ],
    reveal: {
      label: 'Other reasons',
      labelFr: 'D’autres raisons',
      answer: 'Nobody can watch it happen · it is far too big for a lab · it is too far away · you can change the cloud and run it again',
      answerFr: 'Personne ne peut le voir se faire · c’est bien trop grand pour un labo · c’est trop loin · on peut changer le nuage et recommencer',
    },
  },

  // 9 ─ The clump model, still + PREDICT: steadily, or faster and faster? ───
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'A model · predict first',
    eyebrowFr: 'Un modèle · prédis d’abord',
    title: 'From Dust to a Star',
    titleFr: 'De la poussière à une étoile',
    widget: StillCloud,
    caption: '240 dust grains. Each one pulls on every other one by **gravity**, and grains that touch stick together. Predict first, then press **Start**.',
    captionFr: '240 grains de poussière. Chacun attire tous les autres par la **gravité**, et les grains qui se touchent se collent. Prédis d’abord, puis appuie sur **Démarrer**.',
    activity: {
      id: 'act_clump_grows',
      type: 'predict',
      prompt: 'When you press Start, how will the biggest clump grow?',
      promptFr: 'Quand tu appuies sur Démarrer, comment le plus gros amas va-t-il grossir ?',
      options: [
        { val: 'steady', name: 'Steadily: the same amount every second', nameFr: 'Régulièrement : autant chaque seconde' },
        { val: 'faster', name: 'Faster and faster', nameFr: 'De plus en plus vite' },
        { val: 'stops', name: 'A little, and then it stops', nameFr: 'Un peu, puis il s’arrête' },
      ],
      correct: 'faster',
      explain: '**Faster and faster.** Press Start and watch the graph bend upwards: the biggest clump goes 1, 5, 11, 25 grains… and then sweeps up everything, and lights up as a star. The next slide says why.',
      explainFr: '**De plus en plus vite.** Appuie sur Démarrer et regarde la courbe se relever : le plus gros amas passe à 1, 5, 11, 25 grains… puis ramasse tout, et s’allume comme une étoile. La diapo suivante dit pourquoi.',
    },
  },

  // 10 ─ More mass, more pull (the book's chain, p. 87) + CHECK: why? ────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Why faster and faster?',
    eyebrowFr: 'Pourquoi de plus en plus vite ?',
    title: 'More Mass, More Pull',
    titleFr: 'Plus de masse, plus d’attraction',
    ratio: 45,
    inlineSvg: DIAGRAMS.LOOP,
    content: 'The clump grew **faster and faster**. Follow the arrows round the loop.',
    contentFr: 'L’amas a grossi **de plus en plus vite**. Suis les flèches autour de la boucle.',
    notes: [
      panel(
        'The chain', 'La chaîne',
        '**Gravity** pulls the dust and gas together: more mass → stronger gravity → it pulls in even more.',
        'La **gravité** rassemble la poussière et le gaz : plus de masse → gravité plus forte → elle attire encore plus.',
      ),
    ],
    check: {
      id: 'chk_why_faster',
      q: 'Why did the biggest clump grow faster and faster?',
      qFr: 'Pourquoi le plus gros amas a-t-il grossi de plus en plus vite ?',
      options: [
        { val: 'A', text: 'It got hotter, and heat pulls dust in', textFr: 'Il a chauffé, et la chaleur attire la poussière' },
        { val: 'B', text: 'Gravity gets stronger as time goes on', textFr: 'La gravité devient plus forte avec le temps' },
        { val: 'C', text: 'More mass gave it stronger gravity, so it pulled in even more', textFr: 'Plus de masse lui a donné une gravité plus forte, donc il a attiré encore plus' },
        { val: 'D', text: 'Big clumps are stickier than small ones', textFr: 'Les gros amas collent plus que les petits' },
      ],
      correct: 'C',
      expEn: '**More mass, stronger gravity**, so it pulls in even more — a loop that speeds itself up. Heat does not pull anything (A); gravity grows with mass, not with time (B); and grains stick only when they touch — it is the pull that brings them together (D).',
      expFr: '**Plus de masse, gravité plus forte**, donc il attire encore plus — une boucle qui s’accélère toute seule. La chaleur n’attire rien (A) ; la gravité augmente avec la masse, pas avec le temps (B) ; et les grains ne se collent que quand ils se touchent — c’est l’attraction qui les rapproche (D).',
    },
  },

  // 11 ─ Star or planet? (the Sun and Jupiter to scale) + reveal ────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Page 88',
    eyebrowFr: 'Page 88',
    title: 'Star or Planet?',
    titleFr: 'Étoile ou planète ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STAR_PLANET,
    content: 'A clump grows into a ball. Big enough, and its middle gets **hot** enough to shine: a **star**. If not: a **planet**.\n\nIt takes **millions of years**.',
    contentFr: 'Un amas devient une boule. Assez grosse, son centre devient assez **chaud** pour briller : une **étoile**. Sinon : une **planète**.\n\nCela prend **des millions d’années**.',
    reveal: {
      label: 'Jupiter: almost a star?',
      labelFr: 'Jupiter : presque une étoile ?',
      answer: 'It is the biggest planet. To be a star, it would need about **80 times** more mass.',
      answerFr: 'C’est la plus grosse planète. Pour être une étoile, il lui faudrait environ **80 fois** plus de masse.',
    },
  },

  // 12 ─ The clump model, spinning + PREDICT: which way round? ───────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'The model again · predict first',
    eyebrowFr: 'Encore le modèle · prédis d’abord',
    title: 'Now the Cloud Spins',
    titleFr: 'Maintenant, le nuage tourne',
    widget: SpinningCloud,
    caption: 'The same model, but now the cloud turns slowly, like a wheel. Predict first, then press **Start**. It stops by itself.',
    captionFr: 'Le même modèle, mais maintenant le nuage tourne lentement, comme une roue. Prédis d’abord, puis appuie sur **Démarrer**. Il s’arrête tout seul.',
    activity: {
      id: 'act_spin_way',
      type: 'predict',
      prompt: 'A star forms in the middle and planets form round it. How will the planets go round?',
      promptFr: 'Une étoile se forme au centre et des planètes se forment autour. Comment les planètes vont-elles tourner ?',
      options: [
        { val: 'mixed', name: 'Some one way, some the other way', nameFr: 'Certaines dans un sens, d’autres dans l’autre' },
        { val: 'same', name: 'All the same way round', nameFr: 'Toutes dans le même sens' },
        { val: 'none', name: 'No planets: everything falls into the star', nameFr: 'Pas de planètes : tout tombe dans l’étoile' },
      ],
      correct: 'same',
      explain: '**All the same way round.** Watch the trails: every planet goes round the way the cloud was turning. That answers "just luck?": they go the same way because they formed from **one cloud spinning one way**.',
      explainFr: '**Toutes dans le même sens.** Regarde les traces : chaque planète tourne dans le sens où tournait le nuage. Voilà la réponse à « un hasard ? » : elles tournent dans le même sens parce qu’elles viennent d’**un seul nuage qui tournait dans un sens**.',
    },
  },

  // 13 ─ The hypothesis: spin faster, go flat + ORDER the four steps ─────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'RotateCcw',
    eyebrow: 'The hypothesis',
    eyebrowFr: 'L’hypothèse',
    title: 'One Spinning Cloud',
    titleFr: 'Un seul nuage qui tourne',
    inlineSvg: DIAGRAMS.SPIN_FLAT,
    caption: 'The Sun and the planets formed from **one spinning cloud**. As a spinning thing shrinks, it spins **faster** (arms in!). And spinning makes it go **flat**, like pizza dough.',
    captionFr: 'Le Soleil et les planètes viennent d’**un seul nuage qui tournait**. Quand une chose qui tourne rétrécit, elle tourne **plus vite** (bras rentrés !). Et en tournant, elle s’**aplatit**, comme une pâte à pizza.',
    activity: {
      id: 'act_four_steps',
      type: 'order',
      prompt: 'Put the four steps of the story in order, first to last. The next slide plays them.',
      promptFr: 'Remets les quatre étapes de l’histoire dans l’ordre, de la première à la dernière. La diapo suivante les montre.',
      steps: [
        { id: 'pull', name: 'Gravity pulls the nebula together, and it spins faster.', nameFr: 'La gravité rassemble la nébuleuse, et elle tourne plus vite.' },
        { id: 'flat', name: 'It flattens into a spinning disc.', nameFr: 'Elle s’aplatit en un disque qui tourne.' },
        { id: 'sun', name: 'The hot middle becomes the Sun.', nameFr: 'Le centre chaud devient le Soleil.' },
        { id: 'planets', name: 'Dust sticks together and grows into planets.', nameFr: 'La poussière se colle et forme des planètes.' },
      ],
      explain: '**Cloud → disc → Sun → planets.** Gravity pulls the cloud in, and as it shrinks it spins faster and goes flat; the hot middle becomes the Sun; the dust left in the disc sticks together into planets. On the next slide, press **Next step** to watch each one.',
      explainFr: '**Nuage → disque → Soleil → planètes.** La gravité rassemble le nuage ; en rétrécissant, il tourne plus vite et s’aplatit ; le centre chaud devient le Soleil ; la poussière restée dans le disque se colle en planètes. Sur la diapo suivante, appuie sur **Étape suivante** pour voir chacune.',
    },
  },

  // 14 ─ The formation model, seven steps (no score: the model is the slide) ─
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Orbit',
    eyebrow: 'A model · one step at a time',
    eyebrowFr: 'Un modèle · une étape à la fois',
    title: 'How the Solar System Formed',
    titleFr: 'Comment le système solaire s’est formé',
    widget: Formation,
    caption: 'Press **Next step** for one step at a time. At step 3, press **Side**: the disc is flat. (A model: not to scale.)',
    captionFr: 'Appuie sur **Étape suivante** pour avancer d’une étape à la fois. À l’étape 3, appuie sur **Côté** : le disque est plat. (Un modèle : pas à l’échelle.)',
  },

  // 15 ─ Rocky or giant? + CHECK: why rocky near the Sun ─────────────────────
  // (The Models deck's two-column compare, as one drawing on a split: a phone
  // cannot fit two pictures in columns beside a check.)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Step 6 of the model',
    eyebrowFr: 'Étape 6 du modèle',
    title: 'Rocky or Giant?',
    titleFr: 'Rocheuse ou géante ?',
    ratio: 30,
    inlineSvg: DIAGRAMS.ROCKY_GIANT,
    content: '**Near the Sun (hot):** Mercury, Venus, Earth and Mars are small and **rocky**.\n\n**Far away (cold):** Jupiter, Saturn, Uranus and Neptune are **giants**.',
    contentFr: '**Près du Soleil (chaud) :** Mercure, Vénus, la Terre et Mars sont petites et **rocheuses**.\n\n**Loin (froid) :** Jupiter, Saturne, Uranus et Neptune sont des **géantes**.',
    check: {
      id: 'chk_rocky',
      q: 'Why are the four planets nearest the Sun small and rocky?',
      qFr: 'Pourquoi les quatre planètes les plus proches du Soleil sont-elles petites et rocheuses ?',
      options: [
        { val: 'A', text: 'Near the young Sun it was too hot for ice, so only rock and metal could clump together', textFr: 'Près du jeune Soleil, il faisait trop chaud pour la glace : seuls la roche et le métal pouvaient se coller' },
        { val: 'B', text: 'Heavy rock sank towards the Sun, and light gas floated away', textFr: 'La roche lourde a coulé vers le Soleil, et le gaz léger s’est envolé' },
        { val: 'C', text: 'The Sun’s gravity squeezed them small', textFr: 'La gravité du Soleil les a écrasées' },
        { val: 'D', text: 'They are older, so their gas has worn away', textFr: 'Elles sont plus vieilles, donc leur gaz s’est usé' },
      ],
      correct: 'A',
      expEn: '**Too hot for ice.** Near the young Sun only rock and metal could clump, so the planets there are small and rocky. Far out, ice survived too, so cores grew big enough to pull in gas: giants. Nothing sinks or floats in space (B); the Sun’s pull does not squeeze planets (C); and all the planets formed at about the same time (D).',
      expFr: '**Trop chaud pour la glace.** Près du jeune Soleil, seuls la roche et le métal pouvaient se coller, donc les planètes y sont petites et rocheuses. Plus loin, la glace a survécu aussi, donc des noyaux sont devenus assez gros pour attirer du gaz : des géantes. Rien ne coule ni ne flotte dans l’espace (B) ; l’attraction du Soleil n’écrase pas les planètes (C) ; et toutes les planètes se sont formées à peu près en même temps (D).',
    },
  },

  // 16 ─ Evidence: a real young star with a flat disc ───────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Evidence · a real photo, 2014',
    eyebrowFr: 'Une preuve · une vraie photo, 2014',
    title: 'We Can See It Happening',
    titleFr: 'On peut le voir en ce moment',
    ratio: 45,
    image: img('hltau.jpg'),
    content: '**HL Tauri** is a young star with a **flat disc** of dust round it: the disc step, happening far away today.\n\nThe dark rings may be where new **planets** are sweeping up the dust.\n\nA model must match what we **see**. This photo is **evidence** that supports the hypothesis.',
    contentFr: '**HL Tauri** est une jeune étoile entourée d’un **disque plat** de poussière : l’étape du disque, en train de se passer loin d’ici, aujourd’hui.\n\nLes anneaux sombres sont peut-être là où de nouvelles **planètes** ramassent la poussière.\n\nUn modèle doit correspondre à ce qu’on **voit**. Cette photo est une **preuve** qui confirme l’hypothèse.',
  },

  // 17 ─ Venus and Uranus + PREDICT: support, contradict, or prove wrong? ────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'The Solar System’s locked door',
    eyebrowFr: 'La porte fermée du système solaire',
    title: 'Two Odd Ones Out',
    titleFr: 'Deux exceptions',
    inlineSvg: DIAGRAMS.SPIN_ODD,
    caption: 'The Earth and most planets spin the same way. **Venus** spins the opposite way. **Uranus** spins on its side.',
    captionFr: 'La Terre et la plupart des planètes tournent dans le même sens. **Vénus** tourne dans le sens opposé. **Uranus** tourne couchée sur le côté.',
    activity: {
      id: 'act_odd_ones',
      type: 'predict',
      prompt: 'What do these two facts do to the hypothesis?',
      promptFr: 'Que font ces deux faits à l’hypothèse ?',
      options: [
        { val: 'supports', name: 'They support it', nameFr: 'Ils la confirment' },
        { val: 'contradicts', name: 'They seem to contradict it', nameFr: 'Ils semblent la contredire' },
        { val: 'wrong', name: 'They prove it is wrong', nameFr: 'Ils prouvent qu’elle est fausse' },
      ],
      correct: 'contradicts',
      explain: '**They seem to contradict it.** One cloud spinning one way should make every planet spin the same way, and these two do not. But they do not prove it wrong: most of the evidence still supports it, like the cake. Scientists think giant crashes may have turned them — nobody is sure yet.',
      explainFr: '**Ils semblent la contredire.** Un seul nuage qui tourne dans un sens devrait faire tourner toutes les planètes pareil, et ces deux-là non. Mais ils ne prouvent pas qu’elle est fausse : la plupart des preuves la confirment encore, comme pour le gâteau. Les scientifiques pensent que d’énormes collisions les ont peut-être retournées — personne n’en est encore sûr.',
    },
  },

  // 18 ─ The book's Think like a scientist Q4 + CHECK: which two? ────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Think like a scientist · page 90',
    eyebrowFr: 'Pense comme un scientifique · page 90',
    title: 'Which Two?',
    titleFr: 'Lesquelles ?',
    content: 'Which **two** statements describe the hypothesis of how the Solar System formed?\n\n**a** It has been proven to be correct.\n**b** Most, but not all, of the evidence supports it.\n**c** The model that is used has limitations.\n**d** It can be fully tested by experiments.',
    contentFr: 'Quelles **deux** phrases décrivent l’hypothèse sur la formation du système solaire ?\n\n**a** On a prouvé qu’elle est juste.\n**b** La plupart des preuves, mais pas toutes, la confirment.\n**c** Le modèle utilisé a des limites.\n**d** On peut la tester entièrement par des expériences.',
    check: {
      id: 'chk_which_two',
      q: 'Which two statements describe the hypothesis?',
      qFr: 'Quelles deux phrases décrivent l’hypothèse ?',
      options: [
        { val: 'A', text: 'a and d', textFr: 'a et d' },
        { val: 'B', text: 'a and b', textFr: 'a et b' },
        { val: 'C', text: 'c and d', textFr: 'c et d' },
        { val: 'D', text: 'b and c', textFr: 'b et c' },
      ],
      correct: 'D',
      expEn: '**b and c.** Most of the evidence supports it, but not all: Venus and Uranus seem to contradict it, like the locked door in the cake story. And the models used have limitations. It has **not** been proven (a): nobody was there to observe it. And it cannot be fully tested by experiments (d): nobody can make a solar system in a lab.',
      expFr: '**b et c.** La plupart des preuves la confirment, mais pas toutes : Vénus et Uranus semblent la contredire, comme la porte fermée dans l’histoire du gâteau. Et les modèles utilisés ont des limites. On ne l’a **pas** prouvée (a) : personne n’était là pour l’observer. Et on ne peut pas la tester entièrement par des expériences (d) : personne ne peut fabriquer un système solaire dans un labo.',
    },
  },

  // 19 ─ A scale model: the football Sun + PREDICT: how big is the Earth? ────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'A scale model · predict first',
    eyebrowFr: 'Un modèle à l’échelle · prédis d’abord',
    title: 'If the Sun Were a Football',
    titleFr: 'Si le Soleil était un ballon',
    widget: ScaleShrink,
    caption: 'A **scale model**: every size and every distance shrunk by the same amount. Predict first, then press **Shrink the next one**.',
    captionFr: 'Un **modèle à l’échelle** : chaque taille et chaque distance réduites de la même façon. Prédis d’abord, puis appuie sur **Réduire le suivant**.',
    activity: {
      id: 'act_football_earth',
      type: 'predict',
      prompt: 'The Sun is shrunk to a 22 cm football. Shrunk by the same amount, how big is the Earth?',
      promptFr: 'Le Soleil est réduit à un ballon de foot de 22 cm. Réduite de la même façon, quelle taille a la Terre ?',
      options: [
        { val: 'tennis', name: 'A tennis ball', nameFr: 'Une balle de tennis' },
        { val: 'marble', name: 'A marble', nameFr: 'Une bille' },
        { val: 'pinhead', name: 'A pinhead', nameFr: 'Une tête d’épingle' },
      ],
      correct: 'pinhead',
      explain: '**A pinhead: 2 mm**, and 24 m away from the football. Every drawing of the Solar System — like the one on slide 5 — shows the planets far too big and far too close. A scale model gets that right, but it is too big for a page, and nothing in it moves. Every model has limitations.',
      explainFr: '**Une tête d’épingle : 2 mm**, et à 24 m du ballon. Tous les dessins du système solaire — comme celui de la diapo 5 — montrent les planètes beaucoup trop grosses et trop proches. Un modèle à l’échelle corrige ça, mais il est trop grand pour une page, et rien n’y bouge. Tout modèle a des limites.',
    },
  },

  // 20 ─ Limitation (key word) + CHECK: which word? (Think like a scientist Q2)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Key word · English check',
    eyebrowFr: 'Mot clé · point d’anglais',
    title: 'A Limitation',
    titleFr: 'Une limite (a limitation)',
    ratio: 52,
    inlineSvg: DIAGRAMS.FOUR_WORDS,
    content: 'Exam questions often ask: "Give one **limitation** of this model."',
    contentFr: 'Les sujets d’examen demandent souvent : « Give one **limitation** of this model. » (Donne une limite de ce modèle.)',
    notes: [
      keyWord(
        '**Limitation:** something a model cannot do, gets wrong or leaves out. Every model has limitations.',
        '**Limite (limitation) :** ce qu’un modèle ne peut pas faire, montre mal ou oublie. Tous les modèles ont des limites.',
      ),
    ],
    reveal: {
      label: 'Our dust model',
      labelFr: 'Notre modèle de poussière',
      answer: '**Limitations:** it is flat; it has only 240 grains; it has no gas and no heat. **A strength:** millions of years in a few seconds.',
      answerFr: '**Limites :** il est plat ; il n’a que 240 grains ; il n’a ni gaz ni chaleur. **Un point fort :** des millions d’années en quelques secondes.',
    },
    check: {
      id: 'chk_limitation',
      q: 'A globe is a model of the Earth, but it does not spin by itself and has no clouds. Which word describes this?',
      qFr: 'Un globe est un modèle de la Terre, mais il ne tourne pas tout seul et n’a pas de nuages. Quel mot décrit cela ?',
      options: [
        { val: 'A', text: 'an error', textFr: 'an error (une erreur)' },
        { val: 'B', text: 'a mistake', textFr: 'a mistake (une faute)' },
        { val: 'C', text: 'a limitation', textFr: 'a limitation (une limite)' },
        { val: 'D', text: 'a strength', textFr: 'a strength (un point fort)' },
      ],
      correct: 'C',
      expEn: '**A limitation:** something the model cannot do or leaves out. It is nobody’s fault. An error (A) and a mistake (B) mean the same thing: someone did something wrong. A strength (D) is a good point, like showing the shapes of the continents.',
      expFr: '**Une limite :** ce que le modèle ne peut pas faire ou oublie. Ce n’est la faute de personne. « An error » (A) et « a mistake » (B) veulent dire la même chose : quelqu’un a fait une erreur. « A strength » (D) est un point fort, comme montrer la forme des continents.',
    },
  },

  // 21 ─ Checklist + the exit question as a CHECK (a transfer) ───────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then the **Storyboard**.',
    contentFr: 'Ensuite : le vocabulaire, puis le **Storyboard**.',
    items: [
      { text: 'Say what a **nebula** is, and how **gravity** pulls it together.', textFr: 'Dire ce qu’est une **nébuleuse**, et comment la **gravité** la rassemble.' },
      { text: 'Tell the story in order, and why the planets go round **the same way**.', textFr: 'Raconter l’histoire dans l’ordre, et pourquoi les planètes tournent **dans le même sens**.' },
      { text: 'Say if a fact **supports** or **contradicts** a hypothesis.', textFr: 'Dire si un fait **confirme** ou **contredit** une hypothèse.' },
      { text: 'Say how scientists use a **model**, and give one **limitation**.', textFr: 'Dire comment les scientifiques utilisent un **modèle**, et donner une **limite**.' },
    ],
    check: {
      id: 'chk_exit_new_star',
      q: 'Exit question: astronomers find a young star with five new planets round it. What does the hypothesis predict about them?',
      qFr: 'Question de sortie : des astronomes trouvent une jeune étoile avec cinq nouvelles planètes autour. Que prédit l’hypothèse à leur sujet ?',
      options: [
        { val: 'A', text: 'They orbit in random directions', textFr: 'Elles tournent dans des sens au hasard' },
        { val: 'B', text: 'They all orbit the same way, in one flat plane', textFr: 'Elles tournent toutes dans le même sens, dans un seul plan' },
        { val: 'C', text: 'The biggest planet is nearest the star', textFr: 'La plus grosse planète est la plus proche de l’étoile' },
        { val: 'D', text: 'They are all the same size', textFr: 'Elles ont toutes la même taille' },
      ],
      correct: 'B',
      expEn: '**The same way, in one plane**: if they formed from one spinning disc, like ours, they keep its spin. Random directions (A) would go against the hypothesis; the hypothesis puts the giants far out, where it is cold (C); and planets of very different sizes formed in our own disc (D).',
      expFr: '**Dans le même sens, dans un seul plan** : si elles viennent d’un seul disque qui tourne, comme le nôtre, elles gardent sa rotation. Des sens au hasard (A) iraient contre l’hypothèse ; l’hypothèse place les géantes loin, là où il fait froid (C) ; et des planètes de tailles très différentes se sont formées dans notre propre disque (D).',
    },
  },
];
