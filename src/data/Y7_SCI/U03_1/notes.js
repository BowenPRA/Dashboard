// src/data/Y7_SCI/U03_1/notes.js
// 3.1 Gravity, Weight and Mass — the self-study deck, reduced from the
// classroom lesson content/y7-science/U03_1 (45 slides over two periods) to
// ONE deck of 23 layout slides (pairing rule 10). 16 scored items: 10 checks
// and 6 activities of five types (predict ×2 · hotspot · order · sort ·
// estimate). English and French only (meta.vietnamese: false).
//
// THE SPINE IS THE CLASSROOM'S: do heavy things fall faster? Slide 2 asks it
// (a bowling ball and a football), the desk tests and the Moon answer it, and
// slides 20–22 come back to it: falling things accelerate, and a heavy ball is
// pulled harder but is harder to speed up, so the two land together. Between
// them, the book's 3.1 in its own order — gravity, weight, contact force, mass,
// W = m × 10, other planets.
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter and the hand vote (bowling ball or football) → one
//    `predict` on two photos (slide 2). The vote cards are dropped.
//  · The desk tests (book and eraser; flat and crumpled paper) stay — a student
//    at home has a book, an eraser and paper — as one statement with a reveal
//    of what happens and a check on why (slide 3).
//  · The BBC vacuum chamber (YouTube, BBC copyright) goes (pairing rule 8);
//    Apollo 15's hammer and feather (NASA, public domain) makes its point, with
//    a `predict` before it plays (slide 5).
//  · "Point with your arm" (Question 3) → a `hotspot`: tap the point every ball
//    falls towards (slide 8). The Draw This slides stay as diagrams.
//  · The vote "The weight / mass of my bag is 10 kg" → a check (slide 14).
//  · The book's Questions 1–12 are NOT deck checks: they are the Workbook, the
//    Short Answers and Label It, rewritten. The deck's checks are its own.
//  · Planet Scales stays as a widget, with an `order` activity on it (slide 17);
//    the book's Mass or Weight? game (a room vote) → a `sort` (slide 19); the
//    Drop Race widget gets an `estimate` first (slide 22).
//  · Dropped as room-only: the two exit heroes (the Part 1 exit question is the
//    contact-force check; the Part 2 one closes the checklist), the "how could
//    we test it?" lab planning and the catch-the-ruler pair activity (the ruler
//    table is a Workbook question), the Part 2 starter, Mr Bowen's whiteboard
//    practice (→ Weigh It), the scales question (→ Short Answers), Questions
//    6–12 on whiteboards, and SPEED_FALL (its
//    numbers are a sentence on slide 20).
//  · The eight write panels stay as Key word cards — badge renamed, so no card
//    tells a student alone to copy anything.
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text. Maths in $…$ only
// — never a dollar sign in prose.
// Every photograph and film is openly licensed and credited in docs/credits.md.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PHOTO } from './diagramsB.js';
import { Apollo15Clip, MoonJumpClip, DropRace, PlanetScales } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U03_1/${f}`);

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
    icon: 'Globe',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.1 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.1 · Forces et énergie',
    title: 'Gravity, Weight and Mass',
    titleFr: 'Gravité, poids et masse',
    objective: 'Explain what gravity does and which way it pulls; tell weight (in newtons) from mass (in kilograms); calculate weight with W = m × 10, and on other planets; explain why heavy and light things land together.',
    objectiveFr: 'Expliquer ce que fait la gravité et dans quel sens elle attire ; distinguer le poids (en newtons) de la masse (en kilogrammes) ; calculer un poids avec W = m × 10, et sur d’autres planètes ; expliquer pourquoi le lourd et le léger arrivent ensemble.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **predict**, watch a hammer and a feather fall **on the Moon**, sort **mass** from **weight** and race a drop on the Earth against the Moon. **16 things are scored** — the first is on the next slide.',
      textFr: 'Tu vas **prédire**, regarder un marteau et une plume tomber **sur la Lune**, trier la **masse** et le **poids**, et faire la course entre une chute sur Terre et sur la Lune. **16 activités sont notées** — la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: PREDICT — which lands first? ─────────────────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Start here · predict',
    eyebrowFr: 'Pour commencer · prédis',
    title: 'Which Lands First?',
    titleFr: 'Lequel arrive en premier ?',
    columns: [
      {
        heading: 'A bowling ball · 7 kg',
        headingFr: 'Une boule de bowling · 7 kg',
        accent: BLUE,
        image: img('bowling.jpg'),
        caption: 'Heavy.',
        captionFr: 'Lourde.',
      },
      {
        heading: 'A football · 0.4 kg',
        headingFr: 'Un ballon de foot · 0.4 kg',
        accent: ORANGE,
        image: img('football.jpg'),
        caption: 'Light.',
        captionFr: 'Léger.',
      },
    ],
    activity: {
      id: 'act_which_first',
      type: 'predict',
      prompt: 'Mr Bowen drops both at the same time, from the same height. Which one hits the ground first?',
      promptFr: 'M. Bowen les lâche en même temps, de la même hauteur. Lequel touche le sol en premier ?',
      options: [
        { val: 'heavy', name: 'The bowling ball — it is heavier', nameFr: 'La boule de bowling — elle est plus lourde' },
        { val: 'light', name: 'The football — it is lighter', nameFr: 'Le ballon de foot — il est plus léger' },
        { val: 'same', name: 'Both at the same time', nameFr: 'Les deux en même temps' },
      ],
      correct: 'same',
      explain: '**Both at the same time.** Most people choose the bowling ball — people believed that for 2000 years. But heavy things do not fall faster. The next slides show you how we know.',
      explainFr: '**Les deux en même temps.** La plupart des gens choisissent la boule de bowling — on l’a cru pendant 2000 ans. Mais les objets lourds ne tombent pas plus vite. Les diapos suivantes te montrent comment on le sait.',
    },
  },

  // 3 ─ The desk tests + CHECK ────────────────────────────────────────────────
  // A split, not the classroom's statement: the big statement text and the
  // reveal did not fit beside the check at 1280×720 in French.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'BookOpen',
    eyebrow: 'Try it at your desk',
    eyebrowFr: 'Essaie à ton bureau',
    title: 'One Bang or Two?',
    titleFr: 'Un bruit ou deux ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.DESK_TESTS,
    content: 'Hold a **book** and an **eraser** at the same height. Let go together and listen: **one bang** or **two**?\n\nThen try the book with a **flat sheet of paper** — and with the same paper crumpled into a **ball**.',
    contentFr: 'Tiens un **livre** et une **gomme** à la même hauteur. Lâche-les ensemble et écoute : **un bruit** ou **deux** ?\n\nPuis essaie le livre avec une **feuille à plat** — et avec la même feuille froissée en **boule**.',
    reveal: {
      label: 'What happens?',
      labelFr: 'Que se passe-t-il ?',
      answer: '**Book and eraser:** one bang — they land together.\n**Book and flat paper:** the paper lands long after the book.\n**Book and paper ball:** one bang again.',
      answerFr: '**Livre et gomme :** un seul bruit — ils arrivent ensemble.\n**Livre et papier à plat :** le papier arrive bien après le livre.\n**Livre et boule de papier :** de nouveau un seul bruit.',
    },
    check: {
      id: 'chk_paper',
      q: 'The paper ball lands with the book, but the flat sheet does not. It is the same paper. What slowed the flat sheet down?',
      qFr: 'La boule de papier arrive avec le livre, mais pas la feuille à plat. C’est le même papier. Qu’est-ce qui a ralenti la feuille à plat ?',
      options: [
        { val: 'A', text: 'Its mass — a flat sheet has less matter', textFr: 'Sa masse — une feuille à plat a moins de matière' },
        { val: 'B', text: 'Gravity — it pulls less on flat things', textFr: 'La gravité — elle attire moins les objets plats' },
        { val: 'C', text: 'The air — it pushes up on the wide, flat sheet', textFr: 'L’air — il pousse sous la feuille large et plate' },
      ],
      correct: 'C',
      expEn: '**The air.** Air pushes up on a falling object — **air resistance** — and a wide, flat sheet catches much more air than a small ball. Crumpling does not change the mass (A): it is the same paper. Gravity pulls on the paper the same, flat or crumpled (B).',
      expFr: '**L’air.** L’air pousse vers le haut sur un objet qui tombe — la **résistance de l’air** — et une feuille large et plate attrape beaucoup plus d’air qu’une petite boule. Froisser ne change pas la masse (A) : c’est le même papier. La gravité attire le papier pareil, à plat ou froissé (B).',
    },
  },

  // 4 ─ The story ─────────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Building2',
    eyebrow: 'Over 400 years ago',
    eyebrowFr: 'Il y a plus de 400 ans',
    title: 'Galileo and the Tower of Pisa',
    titleFr: 'Galilée et la tour de Pise',
    inlineSvg: PHOTO.FALL_STORY,
    caption: 'Aristotle said heavy things fall faster. The story says Galileo dropped a heavy ball and a light ball from the top of the tower — and they landed together.',
    captionFr: 'Aristote disait que les objets lourds tombent plus vite. On raconte que Galilée a lâché une balle lourde et une balle légère du haut de la tour — et qu’elles sont arrivées ensemble.',
  },

  // 5 ─ PREDICT, then Apollo 15 ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'The Moon, 1971 · predict first',
    eyebrowFr: 'La Lune, 1971 · prédis d’abord',
    title: 'A Hammer and a Feather',
    titleFr: 'Un marteau et une plume',
    widget: Apollo15Clip,
    caption: 'The Moon has **no air**. Astronaut David Scott tests Galileo’s idea. Watch his hands at about 0:38.',
    captionFr: 'Sur la Lune, il n’y a **pas d’air**. L’astronaute David Scott teste l’idée de Galilée. Regarde ses mains vers 0:38.',
    activity: {
      id: 'act_hammer_feather',
      type: 'predict',
      prompt: 'No air at all. He lets go of a hammer and a feather together. Which lands first?',
      promptFr: 'Pas d’air du tout. Il lâche un marteau et une plume ensemble. Lequel arrive en premier ?',
      options: [
        { val: 'hammer', name: 'The hammer', nameFr: 'Le marteau' },
        { val: 'feather', name: 'The feather', nameFr: 'La plume' },
        { val: 'same', name: 'They land together', nameFr: 'Ils arrivent ensemble' },
      ],
      correct: 'same',
      explain: '**They land together.** With no air to slow the feather, a heavy hammer and a light feather fall in exactly the same way. "Mr Galileo was correct," says David Scott. Play the film to see it.',
      explainFr: '**Ils arrivent ensemble.** Sans air pour freiner la plume, un marteau lourd et une plume légère tombent exactement de la même façon. « Monsieur Galilée avait raison », dit David Scott. Lance le film pour le voir.',
    },
  },

  // 6 ─ English check + CHECK ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Drop, Fall, Land',
    titleFr: 'Drop, fall, land',
    inlineSvg: DIAGRAMS.DROP_WORDS,
    caption: '**You** drop it. **It** falls. Then it lands.',
    captionFr: '**Tu** le lâches (drop). **Il** tombe (fall). Puis il touche le sol (land).',
    check: {
      id: 'chk_verbs',
      q: 'Choose the right words: "Mr Bowen ___ the hammer. It ___ and ___ on the floor."',
      qFr: 'Choisis les bons mots : « Mr Bowen ___ the hammer. It ___ and ___ on the floor. »',
      options: [
        { val: 'A', text: 'falls · drops · lands', textFr: 'falls · drops · lands' },
        { val: 'B', text: 'drops · falls · lands', textFr: 'drops · falls · lands' },
        { val: 'C', text: 'drops · lands · falls', textFr: 'drops · lands · falls' },
        { val: 'D', text: 'lands · falls · drops', textFr: 'lands · falls · drops' },
      ],
      correct: 'B',
      expEn: '**Mr Bowen drops the hammer. It falls and lands on the floor.** You **drop** something; it **falls** by itself; it **lands** at the end. In A, Mr Bowen "falls" the hammer — but you cannot fall something. In C it lands before it falls, and D is backwards.',
      expFr: '**Mr Bowen drops the hammer. It falls and lands on the floor.** On **drop** (lâche) quelque chose ; ça **falls** (tombe) tout seul ; ça **lands** (touche le sol) à la fin. Dans A, M. Bowen « falls » le marteau — mais on ne peut pas « fall » quelque chose. Dans C, il touche le sol avant de tomber, et D est à l’envers.',
    },
  },

  // 7 ─ Gravity (key word) ────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Key word · what pulls it down?',
    eyebrowFr: 'Mot clé · qu’est-ce qui la tire vers le bas ?',
    title: 'Gravity',
    titleFr: 'La gravité',
    ratio: 45,
    inlineSvg: PHOTO.EARTH_PULL,
    content: 'You drop a ball. What pulls it down? **The Earth.**\n\n**Everything** pulls on everything else — even two pencils. You only feel the pull when the mass is huge.',
    contentFr: 'Tu lâches une balle. Qu’est-ce qui la tire vers le bas ? **La Terre.**\n\n**Tout** attire tout — même deux crayons. On ne sent l’attraction que si la masse est énorme.',
    notes: [
      keyWord(
        '**Gravity:** a force that pulls objects towards each other.\nObjects with a large **mass**, like the Earth, have strong gravity.',
        '**Gravité (gravity) :** une force qui attire les objets les uns vers les autres.\nLes objets de grande **masse**, comme la Terre, ont une gravité forte.',
      ),
    ],
  },

  // 8 ─ HOTSPOT: which way is down? (Question 3, as a tap) ─────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Globe',
    eyebrow: 'Which way is down?',
    eyebrowFr: 'Où est le bas ?',
    title: 'Four Balls, One Point',
    titleFr: 'Quatre balles, un seul point',
    inlineSvg: DIAGRAMS.EARTH_ABCD,
    caption: 'Four balls are dropped at four places around the Earth. Every one of them falls towards the **same point**.',
    captionFr: 'On lâche quatre balles à quatre endroits autour de la Terre. Chacune tombe vers le **même point**.',
    activity: {
      id: 'act_centre',
      type: 'hotspot',
      prompt: 'Every ball falls towards one point. Tap it.',
      promptFr: 'Chaque balle tombe vers un seul point. Touche-le.',
      svg: DIAGRAMS.EARTH_ABCD,
      viewBox: '0 0 1120 440',
      targets: [
        { id: 'centre', x: 560, y: 220, r: 48, name: 'The centre of the Earth', nameFr: 'Le centre de la Terre' },
        { id: 'top', x: 560, y: 34, r: 30, name: 'The ball at the top', nameFr: 'La balle du haut' },
        { id: 'right', x: 762, y: 220, r: 30, name: 'The ball on the right', nameFr: 'La balle de droite' },
        { id: 'bottom', x: 560, y: 406, r: 30, name: 'The ball at the bottom', nameFr: 'La balle du bas' },
        { id: 'left', x: 358, y: 220, r: 30, name: 'The ball on the left', nameFr: 'La balle de gauche' },
      ],
      correct: 'centre',
      explain: 'The **centre of the Earth**. The ball at the top falls down the page, the one on the right falls left, the one at the bottom falls **up** the page — every one towards the centre.',
      explainFr: 'Le **centre de la Terre**. La balle du haut tombe vers le bas de la page, celle de droite vers la gauche, celle du bas **vers le haut** de la page — chacune vers le centre.',
    },
  },

  // 9 ─ Towards the centre (key word) ──────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Globe',
    eyebrow: 'Key word · the answer to your tap',
    eyebrowFr: 'Mot clé · la réponse à ton toucher',
    title: 'Towards the Centre',
    titleFr: 'Vers le centre',
    ratio: 40,
    inlineSvg: DIAGRAMS.EARTH_ARROWS,
    content: '"Down" means **towards the centre**, everywhere on the Earth. So people at the **South Pole** do not fall off!',
    contentFr: '« En bas » veut dire **vers le centre**, partout sur la Terre. Alors les gens au **pôle Sud** ne tombent pas !',
    notes: [
      keyWord(
        'The force of gravity acts **towards the centre** of the Earth.',
        'La force de gravité agit **vers le centre** de la Terre.',
      ),
    ],
  },

  // 10 ─ Further away, weaker + CHECK ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Rocket',
    eyebrow: 'Further away',
    eyebrowFr: 'Plus loin',
    title: 'Weaker Far Away',
    titleFr: 'Plus faible au loin',
    ratio: 40,
    inlineSvg: DIAGRAMS.FURTHER_WEAKER,
    content: 'Fly away from the Earth. Its gravity pulls on you **less and less** — but it never stops completely.',
    contentFr: 'Éloigne-toi de la Terre. Sa gravité t’attire **de moins en moins** — mais elle ne s’arrête jamais complètement.',
    check: {
      id: 'chk_far',
      q: 'A spaceship flies further and further away from the Earth. What happens to the pull of the Earth’s gravity on it?',
      qFr: 'Une fusée s’éloigne de plus en plus de la Terre. Que devient l’attraction de la gravité de la Terre sur elle ?',
      options: [
        { val: 'A', text: 'It gets weaker', textFr: 'Elle devient plus faible' },
        { val: 'B', text: 'It gets stronger', textFr: 'Elle devient plus forte' },
        { val: 'C', text: 'It stays the same', textFr: 'Elle reste la même' },
        { val: 'D', text: 'It stops as soon as the ship leaves the air', textFr: 'Elle s’arrête dès que la fusée quitte l’air' },
      ],
      correct: 'A',
      expEn: 'The further away, the **weaker** the pull. It does not get stronger (B) or stay the same (C), and gravity has nothing to do with air — it still pulls far out in space, where there is no air at all (D).',
      expFr: 'Plus on est loin, plus l’attraction est **faible**. Elle ne devient pas plus forte (B) et ne reste pas la même (C), et la gravité n’a rien à voir avec l’air — elle attire encore loin dans l’espace, là où il n’y a pas d’air du tout (D).',
    },
  },

  // 11 ─ Weight (key word), how big a newton is ───────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Key word · how big is a newton?',
    eyebrowFr: 'Mot clé · combien vaut un newton ?',
    title: 'Weight',
    titleFr: 'Le poids',
    ratio: 38,
    inlineSvg: DIAGRAMS.NEWTON_LADDER,
    content: 'Gravity pulls everything **down**, towards the centre of the Earth. That pull is the object’s **weight**. Hold an apple: it weighs about **1 N**.',
    contentFr: 'La gravité tire tout vers le **bas**, vers le centre de la Terre. Cette attraction, c’est le **poids** de l’objet. Tiens une pomme : elle pèse environ **1 N**.',
    notes: [
      keyWord(
        '**Weight:** the force of gravity on an object.\nWeight is measured in **newtons (N)**.',
        '**Poids (weight) :** la force de gravité sur un objet.\nLe poids se mesure en **newtons (N)**.',
      ),
    ],
  },

  // 12 ─ Contact force (key word) + CHECK ─────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowUpDown',
    eyebrow: 'Key word · why doesn’t it fall?',
    eyebrowFr: 'Mot clé · pourquoi ne tombe-t-il pas ?',
    title: 'Contact Force',
    titleFr: 'La force de contact',
    ratio: 42,
    inlineSvg: DIAGRAMS.FORCE_DESK,
    content: 'Gravity pulls a book down with **5 N**. So why doesn’t it go **through** the desk? The desk **pushes back up** with 5 N.',
    contentFr: 'La gravité tire un livre vers le bas avec **5 N**. Alors pourquoi ne passe-t-il pas **à travers** la table ? La table **repousse vers le haut** avec 5 N.',
    notes: [
      keyWord(
        '**Contact force:** the push from a surface that holds an object up.\nIf nothing moves, contact force = weight.',
        '**Force de contact (contact force) :** la poussée d’une surface qui soutient un objet.\nSi rien ne bouge, force de contact = poids.',
      ),
    ],
    check: {
      id: 'chk_contact',
      q: 'A box of books weighs 120 N. It sits still on the floor. What is the contact force from the floor?',
      qFr: 'Une caisse de livres pèse 120 N. Elle est posée, immobile, sur le sol. Quelle est la force de contact du sol ?',
      options: [
        { val: 'A', text: '120 N, pushing down', textFr: '120 N, vers le bas' },
        { val: 'B', text: '0 N — a floor does not push', textFr: '0 N — un sol ne pousse pas' },
        { val: 'C', text: '1200 N, pushing up', textFr: '1200 N, vers le haut' },
        { val: 'D', text: '120 N, pushing up', textFr: '120 N, vers le haut' },
      ],
      correct: 'D',
      expEn: 'Nothing moves, so the contact force **equals the weight**: **120 N**, pushing **up** from the surface. The weight is the force that pulls down (A); with 0 N the box would fall through the floor (B); and 1200 N is ten times too big (C).',
      expFr: 'Rien ne bouge, donc la force de contact **égale le poids** : **120 N**, vers le **haut**, depuis la surface. C’est le poids qui tire vers le bas (A) ; avec 0 N, la caisse passerait à travers le sol (B) ; et 1200 N, c’est dix fois trop (C).',
    },
  },

  // 13 ─ When the surface loses ───────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'When the push is too small',
    eyebrowFr: 'Quand la poussée est trop faible',
    title: 'Sinking',
    titleFr: 'Ça s’enfonce',
    ratio: 40,
    inlineSvg: PHOTO.SAND_CAR,
    content: 'Soft sand cannot push up hard enough. The car’s **weight** is **bigger** than the **contact force**, so the car sinks.',
    contentFr: 'Le sable mou ne peut pas pousser assez fort. Le **poids** de la voiture est **plus grand** que la **force de contact**, alors la voiture s’enfonce.',
    reveal: {
      label: 'More examples',
      labelFr: 'D’autres exemples',
      answer: 'Thin ice that breaks · a chair that breaks · your feet in wet sand',
      answerFr: 'De la glace fine qui casse · une chaise qui casse · tes pieds dans le sable mouillé',
    },
  },

  // 14 ─ Mass (key word) + CHECK — the classroom's "bag" vote ─────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Mass',
    titleFr: 'La masse',
    ratio: 45,
    inlineSvg: DIAGRAMS.MASS_STUFF,
    content: 'Kilograms measure **mass**. Newtons measure **weight**. Two boxes the same size can hold different amounts of matter.',
    contentFr: 'Les kilogrammes mesurent la **masse**. Les newtons mesurent le **poids**. Deux boîtes de même taille peuvent contenir des quantités de matière différentes.',
    notes: [
      keyWord(
        '**Mass:** the quantity (amount) of matter in an object.\nMass is measured in **kilograms (kg)**.',
        '**Masse (mass) :** la quantité de matière dans un objet.\nLa masse se mesure en **kilogrammes (kg)**.',
      ),
    ],
    check: {
      id: 'chk_bag',
      q: 'Which sentence is right in science?',
      qFr: 'Quelle phrase est juste en sciences ?',
      options: [
        { val: 'A', text: 'The weight of my bag is 10 kg.', textFr: 'The weight of my bag is 10 kg. (Le poids de mon sac est de 10 kg.)' },
        { val: 'B', text: 'The mass of my bag is 10 N.', textFr: 'The mass of my bag is 10 N. (La masse de mon sac est de 10 N.)' },
        { val: 'C', text: 'The mass of my bag is 10 kg.', textFr: 'The mass of my bag is 10 kg. (La masse de mon sac est de 10 kg.)' },
        { val: 'D', text: 'My bag has no weight.', textFr: 'My bag has no weight. (Mon sac n’a pas de poids.)' },
      ],
      correct: 'C',
      expEn: '**Kilograms measure mass**, so "the mass of my bag is 10 kg" is right. People say "weight" for kilograms every day (A), but in science weight is a force, in newtons — the bag weighs 100 N. Mass is never in newtons (B), and everything on the Earth has a weight (D).',
      expFr: '**Les kilogrammes mesurent la masse**, donc « the mass of my bag is 10 kg » est juste. Tous les jours, on dit « poids » pour des kilogrammes (A), mais en sciences le poids est une force, en newtons — le sac pèse 100 N. La masse n’est jamais en newtons (B), et tout ce qui est sur la Terre a un poids (D).',
    },
  },

  // 15 ─ The formula (key word) + CHECK ───────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'The formula',
    eyebrowFr: 'La formule',
    title: 'Weight = Mass × 10',
    titleFr: 'Poids = masse × 10',
    ratio: 45,
    inlineSvg: DIAGRAMS.TRIANGLE,
    content: 'On Earth, gravity pulls **10 N** on every **1 kg**.\n\nSay "10 newtons **per** kilogram". **Per** means **for every**.',
    contentFr: 'Sur Terre, la gravité tire **10 N** sur chaque **1 kg**.\n\nDis « 10 newtons **par** kilogramme ». **Per** veut dire **pour chaque**.',
    notes: [
      keyWord(
        '**weight (N) = mass (kg) × 10**\n$W = m \\times 10$\nOn Earth, the strength of gravity is **10 N/kg**.',
        '**poids (N) = masse (kg) × 10**\n$W = m \\times 10$\nSur Terre, l’intensité de la gravité est de **10 N/kg**.',
      ),
    ],
    check: {
      id: 'chk_cement',
      q: 'A bag of cement has a mass of 25 kg. What is its weight on Earth?',
      qFr: 'Un sac de ciment a une masse de 25 kg. Quel est son poids sur Terre ?',
      options: [
        { val: 'A', text: '2.5 N', textFr: '2.5 N' },
        { val: 'B', text: '25 N', textFr: '25 N' },
        { val: 'C', text: '250 kg', textFr: '250 kg' },
        { val: 'D', text: '250 N', textFr: '250 N' },
      ],
      correct: 'D',
      expEn: '$W = m \\times 10 = 25 \\times 10 = 250$ N. Dividing by 10 gives 2.5 (A); 25 N forgets to multiply (B); and a weight is a force, so it is in **newtons**, never kilograms (C).',
      expFr: '$W = m \\times 10 = 25 \\times 10 = 250$ N. En divisant par 10, on trouve 2.5 (A) ; 25 N oublie de multiplier (B) ; et un poids est une force, donc il s’exprime en **newtons**, jamais en kilogrammes (C).',
    },
  },

  // 16 ─ The formula triangle + CHECK ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'Cover what you want to find',
    eyebrowFr: 'Cache ce que tu cherches',
    title: 'The Formula Triangle',
    titleFr: 'Le triangle de formule',
    inlineSvg: DIAGRAMS.TRIANGLE_USE,
    caption: 'Cover the letter you want. What is left tells you what to do: **m × 10** means multiply; **W over 10** means divide.',
    captionFr: 'Cache la lettre que tu cherches. Ce qui reste te dit quoi faire : **m × 10** veut dire multiplier ; **W au-dessus de 10** veut dire diviser.',
    check: {
      id: 'chk_suitcase_mass',
      q: 'A suitcase weighs 150 N on Earth. What is its mass?',
      qFr: 'Une valise pèse 150 N sur Terre. Quelle est sa masse ?',
      options: [
        { val: 'A', text: '15 kg', textFr: '15 kg' },
        { val: 'B', text: '1500 kg', textFr: '1500 kg' },
        { val: 'C', text: '15 N', textFr: '15 N' },
        { val: 'D', text: '150 kg', textFr: '150 kg' },
      ],
      correct: 'A',
      expEn: 'Cover **m**: W is left over 10, so divide. $m = 150 \\div 10 = 15$ kg. Multiplying gives 1500 (B); a mass is in **kilograms**, not newtons (C); and 150 kg just changes the unit without dividing (D).',
      expFr: 'Cache **m** : il reste W au-dessus de 10, donc on divise. $m = 150 \\div 10 = 15$ kg. En multipliant, on trouve 1500 (B) ; une masse s’exprime en **kilogrammes**, pas en newtons (C) ; et 150 kg change seulement l’unité, sans diviser (D).',
    },
  },

  // 17 ─ Planet Scales + ORDER ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Other planets',
    eyebrowFr: 'D’autres planètes',
    title: 'Mr Bowen in Space',
    titleFr: 'M. Bowen dans l’espace',
    widget: PlanetScales,
    caption: 'Tap a planet. Work out his weight **first** — 80 × its strength of gravity — then press **Show weight**.',
    captionFr: 'Touche une planète. Calcule son poids **d’abord** — 80 × l’intensité de sa gravité — puis appuie sur **Voir le poids**.',
    activity: {
      id: 'act_planet_order',
      type: 'order',
      prompt: 'Mr Bowen visits five places. Put his weight in order, smallest first. Tap the planets above to check each one.',
      promptFr: 'M. Bowen visite cinq endroits. Range son poids dans l’ordre, du plus petit au plus grand. Touche les planètes au-dessus pour vérifier.',
      steps: [
        { id: 'moon', name: 'the Moon', nameFr: 'la Lune' },
        { id: 'mars', name: 'Mars', nameFr: 'Mars' },
        { id: 'venus', name: 'Venus', nameFr: 'Vénus' },
        { id: 'earth', name: 'the Earth', nameFr: 'la Terre' },
        { id: 'jupiter', name: 'Jupiter', nameFr: 'Jupiter' },
      ],
      explain: '**Moon 128 N → Mars 296 N → Venus 712 N → Earth 800 N → Jupiter 2000 N.** The stronger the gravity, the bigger his weight. His mass is 80 kg on every one of them.',
      explainFr: '**Lune 128 N → Mars 296 N → Vénus 712 N → Terre 800 N → Jupiter 2000 N.** Plus la gravité est forte, plus son poids est grand. Sa masse est de 80 kg partout.',
    },
  },

  // 18 ─ Same mass, less weight (key word) + CHECK — Apollo 16 ─────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'Apollo 16, 1972',
    eyebrowFr: 'Apollo 16, 1972',
    title: 'Same Mass, Less Weight',
    titleFr: 'Même masse, moins de poids',
    ratio: 45,
    widget: MoonJumpClip,
    content: 'On the Moon, an astronaut’s weight is about **6 times smaller**. So he can bounce, even in a heavy suit.',
    contentFr: 'Sur la Lune, le poids d’un astronaute est environ **6 fois plus petit**. Alors il peut bondir, même avec une combinaison lourde.',
    notes: [
      keyWord(
        'Mass **does not change**. Weight changes when the strength of gravity changes.',
        'La masse **ne change pas**. Le poids change quand l’intensité de la gravité change.',
      ),
    ],
    check: {
      id: 'chk_camera',
      q: 'Mr Bowen’s camera has a mass of 2 kg on Earth. He takes it to the Moon. What is its mass there?',
      qFr: 'L’appareil photo de M. Bowen a une masse de 2 kg sur Terre. Il l’emporte sur la Lune. Quelle est sa masse là-bas ?',
      options: [
        { val: 'A', text: '2 kg', textFr: '2 kg' },
        { val: 'B', text: '3.2 kg', textFr: '3.2 kg' },
        { val: 'C', text: '0 kg — there is no gravity', textFr: '0 kg — il n’y a pas de gravité' },
        { val: 'D', text: '20 N', textFr: '20 N' },
      ],
      correct: 'A',
      expEn: '**Still 2 kg** — the same amount of matter. Only its **weight** changes (20 N on Earth, 3.2 N on the Moon). B multiplies the mass by 1.6; the Moon does have gravity (C); and 20 N is a weight, not a mass (D).',
      expFr: '**Toujours 2 kg** — la même quantité de matière. Seul son **poids** change (20 N sur Terre, 3.2 N sur la Lune). B multiplie la masse par 1.6 ; la Lune a bien une gravité (C) ; et 20 N est un poids, pas une masse (D).',
    },
  },

  // 19 ─ SORT: Mass or Weight? (the book's Activity) ───────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'The book’s game, for one',
    eyebrowFr: 'Le jeu du livre, en solo',
    title: 'Mass or Weight?',
    titleFr: 'Masse ou poids ?',
    label: 'Sort it',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'Eight facts. Each one is about **mass** or about **weight**.',
    textFr: 'Huit faits. Chacun parle de la **masse** ou du **poids**.',
    sub: 'Newtons or kilograms? Does it change on the Moon?',
    subFr: 'Newtons ou kilogrammes ? Est-ce que ça change sur la Lune ?',
    activity: {
      id: 'act_mass_weight',
      type: 'sort',
      prompt: 'Mass or weight? Sort the eight.',
      promptFr: 'Masse ou poids ? Trie les huit.',
      bins: [
        { id: 'mass', name: 'Mass', nameFr: 'Masse' },
        { id: 'weight', name: 'Weight', nameFr: 'Poids' },
      ],
      cards: [
        { id: 'newtons', name: 'measured in newtons (N)', nameFr: 'se mesure en newtons (N)', bin: 'weight' },
        { id: 'kilograms', name: 'measured in kilograms (kg)', nameFr: 'se mesure en kilogrammes (kg)', bin: 'mass' },
        { id: 'matter', name: 'the amount of matter in an object', nameFr: 'la quantité de matière dans un objet', bin: 'mass' },
        { id: 'force', name: 'a force', nameFr: 'une force', bin: 'weight' },
        { id: 'moon', name: 'smaller on the Moon', nameFr: 'plus petit sur la Lune', bin: 'weight' },
        { id: 'every', name: 'the same on every planet', nameFr: 'le même sur toutes les planètes', bin: 'mass' },
        { id: 'grams', name: 'can be measured in grams (g)', nameFr: 'peut se mesurer en grammes (g)', bin: 'mass' },
        { id: 'away', name: 'gets smaller far from the Earth', nameFr: 'diminue loin de la Terre', bin: 'weight' },
      ],
      explain: '**Mass:** kilograms or grams, the amount of matter, the same on every planet. **Weight:** a force in newtons, so it changes with gravity — smaller on the Moon and far from the Earth.',
      explainFr: '**Masse :** des kilogrammes ou des grammes, la quantité de matière, la même sur toutes les planètes. **Poids :** une force en newtons, donc il change avec la gravité — plus petit sur la Lune et loin de la Terre.',
    },
  },

  // 20 ─ Accelerate (key word), with the real multi-flash photo ───────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word · the same speed all the way down?',
    eyebrowFr: 'Mot clé · la même vitesse jusqu’en bas ?',
    title: 'Accelerate',
    titleFr: 'Accélérer',
    ratio: 62,
    image: img('strobe.jpg'),
    content: 'One photo of a falling ball, with a flash **20 times** a second. The gaps get **bigger**: each flash, the ball has gone further.\n\nEvery second, a falling ball gets **36 km/h** faster. After 3 seconds it is as fast as a car on a motorway.',
    contentFr: 'Une seule photo d’une balle qui tombe, avec un flash **20 fois** par seconde. Les écarts **grandissent** : à chaque flash, la balle est allée plus loin.\n\nChaque seconde, une balle qui tombe gagne **36 km/h**. Après 3 secondes, elle va aussi vite qu’une voiture sur l’autoroute.',
    notes: [
      keyWord(
        '**Accelerate:** to speed up.\nA **force** makes an object accelerate. Gravity makes falling objects accelerate.',
        '**Accélérer (accelerate) :** aller de plus en plus vite.\nUne **force** fait accélérer un objet. La gravité fait accélérer les objets qui tombent.',
      ),
    ],
  },

  // 21 ─ Back to the starter: why they land together + CHECK ──────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Lightbulb',
    eyebrow: 'Back to the bowling ball',
    eyebrowFr: 'Retour à la boule de bowling',
    title: 'Why Do They Land Together?',
    titleFr: 'Pourquoi arrivent-elles ensemble ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.PULL_VS_MASS,
    content: 'Gravity pulls the heavy ball **harder**.\n\nBut a heavy ball is also **harder to speed up**, like a full shopping trolley. The two cancel out, so both speed up at the same rate.',
    contentFr: 'La gravité tire **plus fort** sur la balle lourde.\n\nMais une balle lourde est aussi **plus dure à accélérer**, comme un chariot plein. Les deux s’annulent, donc les deux accélèrent de la même façon.',
    check: {
      id: 'chk_together',
      q: 'Gravity pulls a 5 kg ball five times harder than a 1 kg ball. Why do they land together?',
      qFr: 'La gravité tire cinq fois plus fort sur une balle de 5 kg que sur une de 1 kg. Pourquoi arrivent-elles ensemble ?',
      options: [
        { val: 'A', text: 'Gravity only pulls light things', textFr: 'La gravité n’attire que le léger' },
        { val: 'B', text: 'The 5 kg ball is five times harder to speed up', textFr: 'La balle de 5 kg est cinq fois plus dure à accélérer' },
        { val: 'C', text: 'Air pushes the 1 kg ball down', textFr: 'L’air pousse la balle de 1 kg vers le bas' },
        { val: 'D', text: 'They don’t — the 5 kg ball lands first', textFr: 'Faux — la balle de 5 kg arrive avant' },
      ],
      correct: 'B',
      expEn: 'Five times the pull, but also **five times harder to speed up**, so both speed up at the same rate. Gravity pulls everything (A); air pushes UP (C); and heavy things did not land first (D).',
      expFr: 'Cinq fois plus d’attraction, mais aussi **cinq fois plus dure à accélérer** : les deux accélèrent au même rythme. La gravité attire tout (A) ; l’air pousse VERS LE HAUT (C) ; et le lourd n’est pas arrivé en premier (D).',
    },
  },

  // 22 ─ Drop Race + ESTIMATE ─────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'Earth and Moon, from 5 m · estimate first',
    eyebrowFr: 'Terre et Lune, de 5 m · estime d’abord',
    title: 'Drop Race',
    titleFr: 'Course de chute',
    widget: DropRace,
    caption: 'On Earth the drop takes **1.0 s**. Estimate the Moon first, then press **Drop** — or **Slow motion** to watch the gaps grow.',
    captionFr: 'Sur Terre, la chute dure **1.0 s**. Estime d’abord pour la Lune, puis appuie sur **Lâcher** — ou sur **Ralenti** pour voir les écarts grandir.',
    activity: {
      id: 'act_moon_time',
      type: 'estimate',
      prompt: 'On Earth, a 5 m drop takes 1.0 s. How long does the same drop take on the Moon?',
      promptFr: 'Sur Terre, une chute de 5 m dure 1.0 s. Combien de temps dure la même chute sur la Lune ?',
      min: 1,
      max: 6,
      step: 0.1,
      unit: 's',
      answer: 2.5,
      tolerance: 0.2,
      explain: '**2.5 s** — two and a half times as long. The Moon’s gravity is weaker (1.6 N/kg, not 10), so things speed up more slowly. In each lane the heavy thing and the light thing still land together.',
      explainFr: '**2.5 s** — deux fois et demie plus long. La gravité de la Lune est plus faible (1.6 N/kg, pas 10), donc les objets accélèrent plus lentement. Dans chaque couloir, l’objet lourd et l’objet léger arrivent quand même ensemble.',
    },
  },

  // 23 ─ Checklist + the exit question as a CHECK ─────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **Weigh It**.',
    contentFr: 'Ensuite : le vocabulaire, puis **Pèse-le**.',
    items: [
      { text: 'Say why planets have **gravity**, and which way it acts.', textFr: 'Dire pourquoi les planètes ont une **gravité**, et dans quel sens elle agit.' },
      { text: 'Describe **weight**, **mass** and the **contact force**.', textFr: 'Décrire le **poids**, la **masse** et la **force de contact**.' },
      { text: 'Calculate a weight: $W = m \\times 10$ on Earth, $W = m \\times g$ anywhere.', textFr: 'Calculer un poids : $W = m \\times 10$ sur Terre, $W = m \\times g$ ailleurs.' },
      { text: 'Explain why falling things **accelerate**, and land together.', textFr: 'Expliquer pourquoi ce qui tombe **accélère**, et arrive ensemble.' },
    ],
    check: {
      id: 'chk_exit_jupiter',
      q: 'Exit question: a suitcase has a mass of 20 kg. What is its weight on Jupiter, where the strength of gravity is 25 N/kg?',
      qFr: 'Question de sortie : une valise a une masse de 20 kg. Quel est son poids sur Jupiter, où l’intensité de la gravité est de 25 N/kg ?',
      options: [
        { val: 'A', text: '200 N', textFr: '200 N' },
        { val: 'B', text: '45 N', textFr: '45 N' },
        { val: 'C', text: '500 N', textFr: '500 N' },
        { val: 'D', text: '500 kg', textFr: '500 kg' },
      ],
      correct: 'C',
      expEn: '$W = m \\times g = 20 \\times 25 = 500$ N. 200 N is its weight on **Earth**, with 10 N/kg (A); 45 adds the numbers instead of multiplying (B); and a weight is in newtons — the mass is still 20 kg (D).',
      expFr: '$W = m \\times g = 20 \\times 25 = 500$ N. 200 N, c’est son poids sur **Terre**, avec 10 N/kg (A) ; 45 additionne les nombres au lieu de les multiplier (B) ; et un poids s’exprime en newtons — la masse est toujours de 20 kg (D).',
    },
  },
];
