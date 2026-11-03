// src/data/Y7_SCI/U03_3/notes.js
// 3.3 Movement in Space — the self-study deck, reduced from the classroom deck
// y7-science/U03_3 (23 slides, one period, Learner's Book pp. 91–96). 17
// slides, 12 scored: 5 checks, 3 predict, 2 Orbit Lab, 1 order, 1 sort. Plan,
// with every cut and why: docs/y7-science/plans/U03_3.md.
//
// LET GO OF THE STRING. Mr Bowen's ball on a string is the model for the
// whole deck: the string is gravity (what keeps it going round); letting go
// shows what gravity does (without it, straight on); and the ball that would
// slow down in the room, but not in space, is the vacuum.
//
// For a student alone: the hand vote is a `predict`, the four-finger vote and
// the whiteboard questions are checks, Draw This and the bar graph are Orbit
// Lab items on the slide, and the copy-down panels are Key word cards. The
// demo itself stays in the classroom: slide 5 says "picture it".
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text. No maths here.
import { DIAGRAMS } from './diagrams.js';
import { LetGo } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U03_3/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textFr) => ({ tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen', text, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Orbit',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.3 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.3 · Forces et énergie',
    title: 'Movement in Space',
    titleFr: 'Le mouvement dans l’espace',
    objective: 'Explain what keeps the planets in orbit and what would happen without it; find the pattern in the planets’ speeds, and say why; explain why things moving in space do not slow down.',
    objectiveFr: 'Expliquer ce qui garde les planètes en orbite et ce qui se passerait sans cela ; trouver la tendance dans la vitesse des planètes, et dire pourquoi ; expliquer pourquoi les objets qui se déplacent dans l’espace ne ralentissent pas.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'Let go of the string: what keeps the planets going round, and why does nothing slow them down? You will **predict**, draw the **arrows** and build a **bar graph**. **12 things are scored**: the first is on the next slide.',
      textFr: 'Lâche la ficelle : qu’est-ce qui fait tourner les planètes, et pourquoi rien ne les ralentit ? Tu vas **prédire**, tracer les **flèches** et construire un **diagramme en barres**. **12 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: ORDER the planets (the book's Getting started) ─────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Globe',
    eyebrow: 'Start here · from 3.2',
    eyebrowFr: 'Pour commencer · de la 3.2',
    title: 'The Planets in Order',
    titleFr: 'Les planètes dans l’ordre',
    label: 'Put them in order',
    labelFr: 'Remets-les dans l’ordre',
    labelIcon: 'Sparkles',
    text: 'Eight planets **orbit** the Sun.',
    textFr: 'Huit planètes sont **en orbite** autour du Soleil.',
    sub: 'Start with the one **closest to the Sun**.',
    subFr: 'Commence par la plus **proche du Soleil**.',
    activity: {
      id: 'act_planet_order',
      type: 'order',
      prompt: 'Put the eight planets in order, starting with the one closest to the Sun.',
      promptFr: 'Remets les huit planètes dans l’ordre, en commençant par la plus proche du Soleil.',
      steps: [
        { id: 'mercury', name: 'Mercury', nameFr: 'Mercure' },
        { id: 'venus', name: 'Venus', nameFr: 'Vénus' },
        { id: 'earth', name: 'Earth', nameFr: 'Terre' },
        { id: 'mars', name: 'Mars', nameFr: 'Mars' },
        { id: 'jupiter', name: 'Jupiter', nameFr: 'Jupiter' },
        { id: 'saturn', name: 'Saturn', nameFr: 'Saturne' },
        { id: 'uranus', name: 'Uranus', nameFr: 'Uranus' },
        { id: 'neptune', name: 'Neptune', nameFr: 'Neptune' },
      ],
      explain: '**Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.** The first letters make "**M**y **V**ery **E**asy **M**ethod **J**ust **S**peeds **U**p **N**aming". The four small rocky planets are close to the Sun; the four giants are far out.',
      explainFr: '**Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune.** En français : « **M**e **V**oici **T**oute **M**ignonne, **J**e **S**uis **U**ne **N**ébuleuse ». Les quatre petites planètes rocheuses sont près du Soleil ; les quatre géantes sont loin.',
    },
  },

  // 3 ─ The answer, photographed (and the Moon) ─────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'The planets, photographed',
    eyebrowFr: 'Les planètes, en photo',
    title: 'The Planets in Order',
    titleFr: 'Les planètes dans l’ordre',
    inlineSvg: DIAGRAMS.PLANET_ROW,
    caption: 'The orange words help you remember the order. The **Moon** orbits the **Earth**, not the Sun.',
    captionFr: 'Les mots orange (en anglais) aident à retenir l’ordre. La **Lune** tourne autour de la **Terre**, pas du Soleil.',
  },

  // 4 ─ The Sun + CHECK: the second strongest gravity (the book's Q3) ────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'The biggest mass',
    eyebrowFr: 'La plus grande masse',
    title: 'The Sun',
    titleFr: 'Le Soleil',
    ratio: 45,
    image: img('sun.jpg'),
    content: 'Mass: **330 000 times** the Earth’s. More than all the planets together.\n\nGravity: **270 N/kg**, 27 times the Earth’s.\n\n**Never** look straight at the Sun.',
    contentFr: 'Masse : **330 000 fois** celle de la Terre. Plus que toutes les planètes réunies.\n\nGravité : **270 N/kg**, 27 fois celle de la Terre.\n\nNe regarde **jamais** le Soleil en face.',
    check: {
      id: 'chk_second_gravity',
      q: 'After the Sun, which object in the Solar System has the strongest gravity?',
      qFr: 'Après le Soleil, quel objet du système solaire a la gravité la plus forte ?',
      options: [
        { val: 'A', text: 'The Earth', textFr: 'La Terre' },
        { val: 'B', text: 'Jupiter', textFr: 'Jupiter' },
        { val: 'C', text: 'Saturn', textFr: 'Saturne' },
        { val: 'D', text: 'Mercury', textFr: 'Mercure' },
      ],
      correct: 'B',
      expEn: '**Jupiter**: after the Sun, it has the most mass (318 Earths), so the strongest gravity, 25 N/kg. We feel the Earth’s gravity most because we live on it, but its mass is small (A). Saturn is big but has much less mass than Jupiter (C). Being close to the Sun gives Mercury no extra gravity: it is the smallest planet (D).',
      expFr: '**Jupiter** : après le Soleil, c’est lui qui a le plus de masse (318 Terres), donc la gravité la plus forte, 25 N/kg. On sent surtout la gravité de la Terre parce qu’on vit dessus, mais sa masse est petite (A). Saturne est grosse, mais elle a beaucoup moins de masse que Jupiter (C). Être près du Soleil ne donne pas plus de gravité à Mercure : c’est la plus petite planète (D).',
    },
  },

  // 5 ─ The question, folded into the model: a ball on a string ─────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'RotateCcw',
    eyebrow: 'The planets move very fast. Why don’t they fly off into space?',
    eyebrowFr: 'Les planètes vont très vite. Pourquoi ne s’envolent-elles pas dans l’espace ?',
    title: 'A Ball on a String',
    titleFr: 'Une balle au bout d’une ficelle',
    ratio: 42,
    inlineSvg: DIAGRAMS.STRING_DEMO,
    content: 'Picture Mr Bowen swinging a ball on a string, round and round over his head.\n\nHis hand is the **Sun**. The ball is a **planet**. The string pulls the ball in, all the time: the string is the Sun’s **gravity**.',
    contentFr: 'Imagine M. Bowen qui fait tourner une balle au bout d’une ficelle, au-dessus de sa tête.\n\nSa main, c’est le **Soleil**. La balle, c’est une **planète**. La ficelle tire la balle vers l’intérieur, tout le temps : la ficelle, c’est la **gravité** du Soleil.',
  },

  // 6 ─ PREDICT: what if he lets go? (the classroom vote) ───────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'What If He Lets Go?',
    titleFr: 'Et s’il lâche ?',
    columns: [
      { heading: 'A · away from the centre', headingFr: 'A · loin du centre', accent: BLUE, inlineSvg: DIAGRAMS.ANS_OUT },
      { heading: 'B · straight on', headingFr: 'B · tout droit', accent: ORANGE, inlineSvg: DIAGRAMS.ANS_ON },
    ],
    activity: {
      id: 'act_let_go',
      type: 'predict',
      prompt: 'The ball is at the top of the circle, moving left. Mr Bowen lets go of the string. Which way does the ball go?',
      promptFr: 'La balle est en haut du cercle et va vers la gauche. M. Bowen lâche la ficelle. Par où part la balle ?',
      options: [
        { val: 'out', name: 'A · straight out, away from the centre', nameFr: 'A · tout droit vers l’extérieur, loin du centre' },
        { val: 'on', name: 'B · straight on, the way it was going', nameFr: 'B · tout droit, dans le sens où elle allait' },
        { val: 'curve', name: 'C · it keeps curving round', nameFr: 'C · elle continue à tourner en rond' },
      ],
      correct: 'on',
      explain: '**B: straight on**, the way it was moving at that moment, along the edge of the circle. While the string pulls, the ball keeps turning. When the string stops pulling, nothing turns it any more. Nothing throws it outwards (A), and nothing keeps it curving (C).',
      explainFr: '**B : tout droit**, dans le sens où elle allait à ce moment-là, le long du bord du cercle. Tant que la ficelle tire, la balle tourne. Quand la ficelle ne tire plus, plus rien ne la fait tourner. Rien ne la lance vers l’extérieur (A), et rien ne la fait continuer en rond (C).',
    },
  },

  // 7 ─ LetGo + PREDICT before Play: which planet goes round most? ──────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Now for planets',
    eyebrowFr: 'Maintenant, les planètes',
    title: 'Switch Off the Sun’s Gravity',
    titleFr: 'Coupe la gravité du Soleil',
    widget: LetGo,
    caption: 'The four planets closest to the Sun, their orbits drawn to scale. Predict first, then press **Play**. Then press **Gravity off**.',
    captionFr: 'Les quatre planètes les plus proches du Soleil, orbites à l’échelle. Prédis d’abord, puis appuie sur **Lancer**. Puis sur **Sans gravité**.',
    activity: {
      id: 'act_most_laps',
      type: 'predict',
      prompt: 'Before you press Play: in one Earth year, which planet goes round the Sun the most times?',
      promptFr: 'Avant d’appuyer sur Lancer : en une année terrestre, quelle planète fait le plus de tours autour du Soleil ?',
      options: [
        { val: 'mercury', name: 'Mercury, the closest to the Sun', nameFr: 'Mercure, la plus proche du Soleil' },
        { val: 'mars', name: 'Mars, the furthest from the Sun', nameFr: 'Mars, la plus loin du Soleil' },
        { val: 'same', name: 'They all go round together, like a wheel', nameFr: 'Elles tournent toutes ensemble, comme une roue' },
      ],
      correct: 'mercury',
      explain: '**Mercury**: it goes round four times while the Earth goes round once. The planets do not turn together like a wheel: the closer ones move faster. Now press **Gravity off**: every planet goes **straight on**, the way it was going, like the ball.',
      explainFr: '**Mercure** : elle fait quatre tours pendant que la Terre en fait un. Les planètes ne tournent pas ensemble comme une roue : les plus proches vont plus vite. Appuie maintenant sur **Sans gravité** : chaque planète part **tout droit**, dans le sens où elle allait, comme la balle.',
    },
  },

  // 8 ─ The book's p. 92 diagram + Key word + ORBIT LAB (pull, a new place) ─
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw it · page 92',
    eyebrowFr: 'Trace-la · page 92',
    title: 'What Keeps Planets in Orbit',
    titleFr: 'Ce qui garde les planètes en orbite',
    ratio: 42,
    inlineSvg: DIAGRAMS.ORBIT_DRAW,
    notes: [
      keyWord(
        '**Circular:** in the shape of a circle. The planets’ orbits are almost circular.\nThe Sun’s **gravity** keeps the planets in orbit. It always pulls **towards the Sun**.',
        '**Circulaire (circular) :** en forme de cercle. Les orbites des planètes sont presque circulaires.\nLa **gravité** du Soleil garde les planètes en orbite. Elle tire toujours **vers le Soleil**.',
      ),
    ],
    activity: {
      id: 'act_orbit_arrows',
      type: 'orbitlab',
      kind: 'pull',
      scene: 'sun',
      orbiter: 'mars',
      at: 135,
      dir: 'acw',
      ask: ['pull', 'path'],
      prompt: 'Now you. Mars is somewhere else on its orbit. Draw the two arrows of the drawing for Mars.',
      promptFr: 'À toi. Mars est ailleurs sur son orbite. Trace pour Mars les deux flèches du dessin.',
      explain: 'The Sun’s gravity pulls Mars **towards the Sun**, wherever Mars is. With no gravity, Mars goes **straight on**, along the edge of its orbit, the way it was moving.',
      explainFr: 'La gravité du Soleil tire Mars **vers le Soleil**, où que soit Mars. Sans gravité, Mars part **tout droit**, le long du bord de son orbite, dans le sens où elle allait.',
    },
  },

  // 9 ─ The book's Activity: ORBIT LAB (graph) on the book's table ──────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Ruler',
    eyebrow: 'Activity · page 94',
    eyebrowFr: 'Activité · page 94',
    title: 'Planet Speeds',
    titleFr: 'La vitesse des planètes',
    ratio: 40,
    inlineSvg: DIAGRAMS.SPEED_TABLE,
    content: '**km/s** = kilometres **per** second. Mercury goes 48 km **every** second!',
    contentFr: '**km/s** = kilomètres **par** seconde. Mercure parcourt 48 km **chaque** seconde !',
    activity: {
      id: 'act_speed_graph',
      type: 'orbitlab',
      kind: 'graph',
      set: 'planets',
      given: ['mercury'],
      ask: ['draw', 'pattern'],
      prompt: 'Draw the bar graph of the table. Mercury’s bar is done for you.',
      promptFr: 'Trace le diagramme en barres du tableau. La barre de Mercure est déjà tracée.',
      explain: 'The bars get shorter from Mercury to Neptune: **as the distance from the Sun increases, the speed of the planets decreases.** A graph shows that at a glance; in the table you must read every number.',
      explainFr: 'Les barres raccourcissent de Mercure à Neptune : **plus on s’éloigne du Soleil, plus la vitesse des planètes diminue.** Un graphique le montre d’un coup d’œil ; dans le tableau, il faut lire chaque nombre.',
    },
  },

  // 10 ─ Speed (key word) + CHECK: why are the close planets faster? ────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word · and the reason',
    eyebrowFr: 'Mot clé · et la raison',
    title: 'Speed',
    titleFr: 'La vitesse',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPEED_PULL,
    content: 'Mercury goes 48 km every second: about **170 000 km every hour**.',
    contentFr: 'Mercure parcourt 48 km chaque seconde : environ **170 000 km chaque heure**.',
    notes: [
      keyWord(
        '**Speed:** how fast something moves.\nAs the distance from the Sun increases, the speed of the planets **decreases**.',
        '**Vitesse (speed) :** la rapidité avec laquelle un objet se déplace.\nPlus on s’éloigne du Soleil, plus la vitesse des planètes **diminue**.',
      ),
    ],
    check: {
      id: 'chk_why_faster',
      q: 'Why do the planets close to the Sun move faster?',
      qFr: 'Pourquoi les planètes proches du Soleil vont-elles plus vite ?',
      options: [
        { val: 'A', text: 'The far planets are bigger, so they are slower', textFr: 'Les planètes lointaines sont plus grosses, donc plus lentes' },
        { val: 'B', text: 'The far planets have further to go', textFr: 'Les planètes lointaines ont plus de chemin à faire' },
        { val: 'C', text: 'The Sun’s pull is stronger close to the Sun', textFr: 'L’attraction du Soleil est plus forte près du Soleil' },
        { val: 'D', text: 'It is hotter close to the Sun', textFr: 'Il fait plus chaud près du Soleil' },
      ],
      correct: 'C',
      expEn: '**The Sun’s pull is stronger close to the Sun**, and weaker far away (3.1: gravity is weaker far away). Size is not the reason: Jupiter is the biggest planet, and it is faster than Saturn, Uranus and Neptune (A). A longer path makes a longer year, not a lower speed (B). Heat does not move planets (D).',
      expFr: '**L’attraction du Soleil est plus forte près du Soleil**, et plus faible loin de lui (3.1 : la gravité est plus faible loin). La taille n’est pas la raison : Jupiter est la plus grosse planète, et elle va plus vite que Saturne, Uranus et Neptune (A). Un chemin plus long donne une année plus longue, pas une vitesse plus faible (B). La chaleur ne fait pas bouger les planètes (D).',
    },
  },

  // 11 ─ Feel the air: PREDICT, then try it at the desk ─────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Wind',
    eyebrow: 'Try it at your desk',
    eyebrowFr: 'Essaie à ta table',
    title: 'Feel the Air',
    titleFr: 'Sens l’air',
    label: 'Predict, then try',
    labelFr: 'Prédis, puis essaie',
    labelIcon: 'Sparkles',
    text: 'Wave your closed exercise book: **slowly**, then **fast**.',
    textFr: 'Agite ton cahier fermé : **lentement**, puis **vite**.',
    sub: 'Then move it **edge first**. What do you feel on your hand?',
    subFr: 'Puis **tranche en avant**. Que sens-tu sur ta main ?',
    activity: {
      id: 'act_feel_air',
      type: 'predict',
      prompt: 'Predict first: when will you feel the biggest push from the air?',
      promptFr: 'Prédis d’abord : quand sentiras-tu la plus forte poussée de l’air ?',
      options: [
        { val: 'flatFast', name: 'Flat side first, moving fast', nameFr: 'Côté plat devant, vite' },
        { val: 'edgeFast', name: 'Edge first, moving fast', nameFr: 'Tranche devant, vite' },
        { val: 'flatSlow', name: 'Flat side first, moving slowly', nameFr: 'Côté plat devant, lentement' },
        { val: 'same', name: 'The same every time', nameFr: 'Pareil à chaque fois' },
      ],
      correct: 'flatFast',
      explain: '**Flat side first, fast.** The air pushes **against** your hand as the book moves. The push is bigger when you go **faster**, and bigger with the **flat side** first, because it pushes more air. Now try it. It is why the flat paper fell slowly in 3.1.',
      explainFr: '**Côté plat devant, vite.** L’air pousse **contre** ta main quand le cahier bouge. La poussée est plus forte quand tu vas **plus vite**, et plus forte côté plat devant, parce qu’il pousse plus d’air. Essaie maintenant. C’est pour ça que la feuille à plat tombait lentement en 3.1.',
    },
  },

  // 12 ─ Air resistance (key word), the plane's spoilers ────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Air Resistance',
    titleFr: 'La résistance de l’air',
    ratio: 45,
    image: img('spoilers.jpg'),
    content: 'This plane has just landed. Panels on its wing stand up to make **more** air resistance, and slow it down.',
    contentFr: 'Cet avion vient d’atterrir. Des panneaux se lèvent sur l’aile pour faire **plus** de résistance de l’air, et le ralentir.',
    notes: [
      keyWord(
        '**Air resistance:** a force from the air that slows a moving object down. It acts in the **opposite** direction to the movement.\nThe faster an object moves, the **bigger** the air resistance.',
        '**Résistance de l’air (air resistance) :** une force de l’air qui ralentit un objet en mouvement. Elle agit dans le sens **opposé** au mouvement.\nPlus un objet va vite, plus la résistance de l’air est **grande**.',
      ),
    ],
  },

  // 13 ─ Vacuum (key word) + CHECK: the book's Q6, adapted ─────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CircleSlash',
    eyebrow: 'Air resistance comes from particles of air. Is there air resistance in space?',
    eyebrowFr: 'La résistance de l’air vient des particules d’air. Y en a-t-il dans l’espace ?',
    title: 'Vacuum',
    titleFr: 'Le vide',
    ratio: 45,
    image: img('juno.jpg'),
    content: 'In 2016, the **Juno** probe passed Jupiter at **266 000 km/h**.',
    contentFr: 'En 2016, la sonde **Juno** est passée près de Jupiter à **266 000 km/h**.',
    notes: [
      keyWord(
        '**Vacuum:** a space with no particles.\nSpace is a vacuum, so there is no air resistance. Only **gravity** acts on the planets.',
        '**Vide (vacuum) :** un espace sans particules.\nL’espace est un vide, donc il n’y a pas de résistance de l’air. Seule la **gravité** agit sur les planètes.',
      ),
    ],
    check: {
      id: 'chk_which_forces',
      q: 'Which forces act on the Earth as it orbits the Sun?',
      qFr: 'Quelles forces agissent sur la Terre quand elle tourne autour du Soleil ?',
      options: [
        { val: 'A', text: 'Gravity only', textFr: 'La gravité seulement' },
        { val: 'B', text: 'No forces: there is no gravity in space', textFr: 'Aucune force : il n’y a pas de gravité dans l’espace' },
        { val: 'C', text: 'Gravity and air resistance', textFr: 'La gravité et la résistance de l’air' },
        { val: 'D', text: 'Gravity, air resistance and friction', textFr: 'La gravité, la résistance de l’air et le frottement' },
      ],
      correct: 'A',
      expEn: '**Gravity only.** There IS gravity in space: the Sun’s gravity keeps the Earth in orbit (B). Space is a vacuum, so there is no air resistance (C). Nothing rubs on the Earth, so there is no friction (D).',
      expFr: '**La gravité seulement.** Il y a bien de la gravité dans l’espace : la gravité du Soleil garde la Terre en orbite (B). L’espace est un vide, donc pas de résistance de l’air (C). Rien ne frotte sur la Terre, donc pas de frottement (D).',
    },
  },

  // 14 ─ Voyager 1 + CHECK: engines off, so why does it keep going? ─────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Still going',
    eyebrowFr: 'Toujours en route',
    title: 'Voyager 1',
    titleFr: 'Voyager 1',
    ratio: 45,
    image: img('voyager.jpg'),
    content: 'Launched in **1977**. Now outside the Solar System, at **64 000 km/h**.\n\nOn **18 November 2026** it will be so far away that a radio message takes a **whole day** to reach it.',
    contentFr: 'Lancée en **1977**. Aujourd’hui hors du système solaire, à **64 000 km/h**.\n\nLe **18 novembre 2026**, elle sera si loin qu’un message radio mettra **une journée entière** pour l’atteindre.',
    check: {
      id: 'chk_voyager',
      q: 'Voyager 1’s engines were switched off long ago. Why does it keep moving so fast?',
      qFr: 'Les moteurs de Voyager 1 sont éteints depuis longtemps. Pourquoi continue-t-elle d’aller aussi vite ?',
      options: [
        { val: 'A', text: 'There is no gravity in space', textFr: 'Il n’y a pas de gravité dans l’espace' },
        { val: 'B', text: 'Its engines still push it a little', textFr: 'Ses moteurs la poussent encore un peu' },
        { val: 'C', text: 'The stars ahead of it pull it along', textFr: 'Les étoiles devant elle la tirent' },
        { val: 'D', text: 'Space is a vacuum: no air resistance slows it down', textFr: 'L’espace est un vide : aucune résistance de l’air ne la ralentit' },
      ],
      correct: 'D',
      expEn: '**Space is a vacuum**, so nothing pushes against its movement. A moving thing does not need a push to keep moving: it only slows down if a force acts against it. There is gravity in space: the Sun’s gravity still pulls Voyager back a tiny bit (A). Its engines are off (B). The stars are far too far away to pull it along (C).',
      expFr: '**L’espace est un vide**, donc rien ne pousse contre son mouvement. Un objet en mouvement n’a pas besoin d’être poussé pour continuer : il ralentit seulement si une force agit contre lui. Il y a de la gravité dans l’espace : la gravité du Soleil retient encore un tout petit peu Voyager (A). Ses moteurs sont éteints (B). Les étoiles sont bien trop loin pour la tirer (C).',
    },
  },

  // 15 ─ Think like a scientist: how Neptune was found ──────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Telescope',
    eyebrow: 'Think like a scientist · page 95',
    eyebrowFr: 'Pense comme un scientifique · page 95',
    title: 'How Neptune Was Found',
    titleFr: 'Comment on a trouvé Neptune',
    inlineSvg: DIAGRAMS.NEPTUNE_STORY,
    caption: 'Uranus kept drifting off the path Bouvard had worked out. Something else was pulling it: something with **gravity**, further out.',
    captionFr: 'Uranus sortait sans cesse du chemin calculé par Bouvard. Autre chose la tirait : quelque chose avec de la **gravité**, plus loin. Bouvard et Le Verrier étaient français !',
  },

  // 16 ─ SORT: observation, prediction or conclusion? (TLAS Q1–3) ──────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Every class is an English class',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Which Word Fits?',
    titleFr: 'Quel mot convient ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.WORDS3,
    content: 'Three words scientists use all the time. In French they are almost the same: but the English **prediction** has no accent.',
    contentFr: 'Trois mots que les scientifiques utilisent tout le temps. En français, ils sont presque pareils : mais l’anglais **prediction** n’a pas d’accent.',
    activity: {
      id: 'act_three_words',
      type: 'sort',
      prompt: 'Is each part of the Neptune story an observation, a prediction or a conclusion?',
      promptFr: 'Chaque partie de l’histoire de Neptune est-elle une observation, une prédiction ou une conclusion ?',
      bins: [
        { id: 'observation', name: 'Observation', nameFr: 'Observation' },
        { id: 'prediction', name: 'Prediction', nameFr: 'Prédiction' },
        { id: 'conclusion', name: 'Conclusion', nameFr: 'Conclusion' },
      ],
      cards: [
        { id: 'bouvard', name: 'Bouvard calculated where Uranus would be.', nameFr: 'Bouvard a calculé où serait Uranus.', bin: 'prediction' },
        { id: 'seen', name: 'Uranus was seen further from the Sun. The results were recorded.', nameFr: 'On a vu Uranus plus loin du Soleil. On a noté les résultats.', bin: 'observation' },
        { id: 'source', name: '“Another source of gravity is pulling Uranus.”', nameFr: '« Une autre source de gravité tire Uranus. »', bin: 'conclusion' },
        { id: 'leverrier', name: 'Le Verrier worked out where the new planet must be.', nameFr: 'Le Verrier a calculé où devait être la nouvelle planète.', bin: 'prediction' },
        { id: 'galle', name: 'Galle looked there and saw Neptune.', nameFr: 'Galle a regardé là et a vu Neptune.', bin: 'observation' },
      ],
      explain: 'A **prediction** says what you think will happen: both calculations. An **observation** is what you see, measure and record: Uranus off its path, and Neptune in the telescope. A **conclusion** is what you decide from the results: another planet’s gravity was pulling Uranus.',
      explainFr: 'Une **prédiction** dit ce qu’on pense qu’il va se passer : les deux calculs. Une **observation**, c’est ce qu’on voit, mesure et note : Uranus hors de son chemin, et Neptune dans la lunette. Une **conclusion**, c’est ce qu’on décide à partir des résultats : la gravité d’une autre planète tirait Uranus.',
    },
  },

  // 17 ─ Checklist + the exit question as a CHECK (the book's Q7) ───────────
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
    content: 'Next: the Vocab, then the **Orbit Lab**.',
    contentFr: 'Ensuite : le vocabulaire, puis le **Labo des orbites**.',
    items: [
      { text: 'Name the force that keeps the planets in **orbit**.', textFr: 'Nommer la force qui garde les planètes en **orbite**.' },
      { text: 'Say which way this force acts on a planet.', textFr: 'Dire dans quel sens cette force agit sur une planète.' },
      { text: 'Explain why planets closer to the Sun move **faster**.', textFr: 'Expliquer pourquoi les planètes proches du Soleil vont **plus vite**.' },
      { text: 'Explain why things in space do not **slow down**.', textFr: 'Expliquer pourquoi les objets dans l’espace ne **ralentissent** pas.' },
    ],
    check: {
      id: 'chk_exit_january',
      q: 'Exit question: the Earth is a little closer to the Sun in January than in July. When does it move faster?',
      qFr: 'Question de sortie : la Terre est un peu plus proche du Soleil en janvier qu’en juillet. Quand va-t-elle plus vite ?',
      options: [
        { val: 'A', text: 'In July: it is further away, so it has more room', textFr: 'En juillet : elle est plus loin, donc elle a plus de place' },
        { val: 'B', text: 'In January: closer, so the Sun’s pull is stronger', textFr: 'En janvier : plus proche, donc l’attraction du Soleil est plus forte' },
        { val: 'C', text: 'The same all year: its orbit is a circle', textFr: 'Pareil toute l’année : son orbite est un cercle' },
        { val: 'D', text: 'In July: it is summer in the north, so it is hotter', textFr: 'En juillet : c’est l’été au nord, donc il fait plus chaud' },
      ],
      correct: 'B',
      expEn: '**In January.** Closer to the Sun, its pull is stronger, so the Earth moves faster: about 30.3 km/s in January and 29.3 km/s in July. The same pattern as the planets, inside one orbit. More room does not make anything faster (A). The orbit is **almost** circular, not exactly (C). Summer and winter do not change the Earth’s speed (D).',
      expFr: '**En janvier.** Plus près du Soleil, l’attraction est plus forte, donc la Terre va plus vite : environ 30.3 km/s en janvier et 29.3 km/s en juillet. La même tendance que pour les planètes, sur une seule orbite. Avoir plus de place ne rend rien plus rapide (A). L’orbite est **presque** circulaire, pas exactement (C). L’été et l’hiver ne changent pas la vitesse de la Terre (D).',
    },
  },
];
