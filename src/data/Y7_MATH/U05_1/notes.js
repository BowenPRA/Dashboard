// src/data/Y7_MATH/U05_1/notes.js
// 5.1 A sum of 360° — a self-study reduction of the classroom deck
// (lessons/content/y7-math/U05_1, 26 slides, one period). English and French
// only (meta.vietnamese: false). 18 layout slides, 14 scored items: 6 checks and
// 8 activities (sort · anglesum · predict · anglesum · predict · anglesum · sort ·
// anglesum) — no two activities of the same type in a row. Slide 12 is the Tear
// It widget, unscored.
//
// ONE IDEA: FIND THE MISSING ANGLE AND SAY WHY. On a straight line 180°, round
// a point 360°, in a quadrilateral 360°; the classroom's TWO STEPS (add what
// you know, take it away from 180° or 360°); then the fact, after "because".
// The `anglesum` activity is the unit's engine (Find It, Say Why) on a slide,
// on the room's own numbers; its panel offers the angles as buttons, so it
// never needs the picture beside it. The exit question (slide 18) opens QUICK.
//
// SPINE:
//   1–3    hero; the starter (sort: 90° / 180° / 360°); how to read an angle
//   4–5    on a straight line (anglesum 130° and a); is it straight? (predict, 57° + 121°)
//   6–8    the pizza (check: one slice); round a point (anglesum 100°, 120°, b);
//          two steps (check: which calculation finds c)
//   9–10   sum (check: sum or some); quadrilateral
//   11–13  every quadrilateral? (predict on the tear strip); Tear It (widget);
//          a sum of 360° (anglesum 70°, 95°, 120°, d)
//   14–17  read the question (sort: the Workbook's words); three the same
//          (check); parallelogram (check); Mr Bowen's chair (check)
//   18     the checklist and the exit question (anglesum, quick)
//
// House notes:
//  · Angles are plain text (130°), never `$…$`: KaTeX's ° would need ^\circ.
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · No whiteboards, hand votes, pairs, paper, date, notebook count or exit hero.
import { DIAGRAMS } from './diagrams.js';
import { TearIt } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Triangle',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 5 · 5.1',
    eyebrowFr: 'Unité 5 · 5.1',
    title: 'A Sum of 360°',
    titleFr: 'Une somme de 360°',
    subtitle: 'Find the missing angle. Say why.',
    subtitleFr: 'Trouve l’angle qui manque. Dis pourquoi.',
    objective: 'Find a missing angle on a straight line, around a point and in a quadrilateral in two steps — add the angles you know, then take the total away from 180° or 360° — and give the fact as your reason.',
    objectiveFr: 'Trouver un angle qui manque sur une ligne droite, autour d’un point et dans un quadrilatère en deux étapes — additionner les angles connus, puis enlever le total de 180° ou de 360° — et donner la propriété comme raison.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **sort**, **predict** and **find missing angles**, and say **why**. **14 things are scored**; the first is on the next slide.',
      textFr: 'Tu vas **trier**, **prédire** et **trouver des angles qui manquent**, et dire **pourquoi**. **14 éléments sont notés** ; le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: four numbers (SORT) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowFr: 'Pour commencer',
    title: 'Four Numbers',
    titleFr: 'Quatre nombres',
    inlineSvg: DIAGRAMS.FACTS_Q,
    caption: 'Four pictures you already know. How many **degrees** is each one?',
    captionFr: 'Quatre dessins que tu connais déjà. Combien de **degrés** fait chacun ?',
    activity: {
      id: 'act_facts',
      type: 'sort',
      prompt: 'How many degrees? Sort each one into **90°**, **180°** or **360°**.',
      promptFr: 'Combien de degrés ? Range chacun dans **90°**, **180°** ou **360°**.',
      bins: [
        { id: 'b90', name: '**90°**', nameFr: '**90°**' },
        { id: 'b180', name: '**180°**', nameFr: '**180°**' },
        { id: 'b360', name: '**360°**', nameFr: '**360°**' },
      ],
      cards: [
        { id: 'c1', name: 'a right angle', nameFr: 'un angle droit', bin: 'b90' },
        { id: 'c2', name: 'a straight line', nameFr: 'une ligne droite', bin: 'b180' },
        { id: 'c3', name: 'a full turn', nameFr: 'un tour complet', bin: 'b360' },
        { id: 'c4', name: 'the three angles of a triangle, added', nameFr: 'les trois angles d’un triangle, additionnés', bin: 'b180' },
        { id: 'c5', name: 'half a turn', nameFr: 'un demi-tour', bin: 'b180' },
        { id: 'c6', name: 'a quarter turn', nameFr: 'un quart de tour', bin: 'b90' },
      ],
      explain: 'A right angle is a quarter turn: **90°**. A straight line is half a turn: **180°** — and so are the three angles of a triangle, added. A full turn is **360°**. Today you use 180° and 360° again and again.',
      explainFr: 'Un angle droit, c’est un quart de tour : **90°**. Une ligne droite, c’est un demi-tour : **180°** — comme les trois angles d’un triangle, additionnés. Un tour complet fait **360°**. Aujourd’hui, tu utilises 180° et 360° encore et encore.',
    },
  },

  // 3 ─ How to read an angle ───────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Read the picture',
    eyebrowFr: 'Lis le dessin',
    title: 'How to Read an Angle',
    titleFr: 'Comment lire un angle',
    inlineSvg: DIAGRAMS.READ,
    caption: 'A **number** is an angle you know. A **letter** is a missing angle: your job is to find it. A **small square** is 90°, even with no number.',
    captionFr: 'Un **nombre** est un angle que tu connais. Une **lettre** est un angle qui manque : ton travail, c’est de le trouver. Un **petit carré** fait 90°, même sans nombre.',
  },

  // 4 ─ On a straight line (ANGLESUM, walked) ────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Minus',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'On a Straight Line',
    titleFr: 'Sur une ligne droite',
    ratio: 45,
    inlineSvg: DIAGRAMS.LINE,
    content: 'Together, the two angles make the **straight line**: half a turn.',
    contentFr: 'Ensemble, les deux angles font la **ligne droite** : un demi-tour.',
    notes: [
      {
        tone: 'write',
        text: 'Angles on a **straight line** add up to **180°**.',
        textFr: 'Les angles sur une **ligne droite** font **180°** en tout.',
      },
      {
        tone: 'info',
        badge: false,
        text: '**Give a reason** means: write the fact you used, after **because**.',
        textFr: '**Give a reason** (donne une raison) veut dire : écris la propriété que tu as utilisée, après **because** (car).',
      },
    ],
    activity: {
      id: 'act_line',
      type: 'anglesum',
      kind: 'line',
      angles: [130, 'a'],
      prompt: 'Find **a**. Decide 180° or 360°, take away, then say why.',
      promptFr: 'Trouve **a**. Décide 180° ou 360°, enlève, puis dis pourquoi.',
      explain: 'The two angles share one side of the straight line, so together they make half a turn, 180°.',
      explainFr: 'Les deux angles sont du même côté de la ligne droite, donc ensemble ils font un demi-tour, 180°.',
    },
  },

  // 5 ─ Is it straight? (PREDICT) ───────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Is It Straight?',
    titleFr: 'Est-ce droit ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STRAIGHT_Q,
    content: 'Two angles are **57°** and **121°**. Together, do they make a **straight line** from X to Y?',
    contentFr: 'Deux angles font **57°** et **121°**. Ensemble, font-ils une **ligne droite** de X à Y ?',
    activity: {
      id: 'act_straight',
      type: 'predict',
      prompt: 'Is XY a straight line?',
      promptFr: 'XY est-elle une ligne droite ?',
      options: [
        { val: 'yes', name: '**Yes** — it is a straight line', nameFr: '**Oui** — c’est une ligne droite' },
        { val: 'no', name: '**No** — it is not straight', nameFr: '**Non** — elle n’est pas droite' },
      ],
      correct: 'no',
      explain: '**57° + 121° = 178°**, and a straight line is **180°**. So XY is **not** straight. It looks straight: the picture is drawn true, and 2° is too small to see. Do not trust your eyes. Always add.',
      explainFr: '**57° + 121° = 178°**, et une ligne droite fait **180°**. Donc XY n’est **pas** droite. Elle a l’air droite : le dessin est exact, et 2° est trop petit pour se voir. Ne te fie pas à tes yeux. Additionne toujours.',
    },
  },

  // 6 ─ Mr Bowen's pizza (CHECK 1) ──────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Think · a full turn',
    eyebrowFr: 'Réfléchis · un tour complet',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    ratio: 45,
    image: assetUrl('images/Y7_MATH/U04_5/pizza.jpg'),
    content: 'Mr Bowen cuts his pizza into **8 equal slices**. All the slices meet in the middle.',
    contentFr: 'M. Bowen coupe sa pizza en **8 parts égales**. Toutes les parts se rejoignent au milieu.',
    check: {
      id: 'chk_pizza',
      q: 'What angle is **one** slice, at the middle?',
      qFr: 'Quel est l’angle d’**une** part, au milieu ?',
      options: [
        { val: 'A', text: '2880°', textFr: '2880°' },
        { val: 'B', text: '22.5°', textFr: '22.5°' },
        { val: 'C', text: '45°', textFr: '45°' },
      ],
      correct: 'C',
      expEn: 'The slices go all the way round the middle: a **full turn**, **360°**. Eight equal slices share it: **360° ÷ 8 = 45°**. A is 360 × 8 — sharing means divide. B is 180° ÷ 8: 180° is only half a turn, half the pizza.',
      expFr: 'Les parts font tout le tour du milieu : un **tour complet**, **360°**. Huit parts égales se le partagent : **360° ÷ 8 = 45°**. A, c’est 360 × 8 — partager veut dire diviser. B, c’est 180° ÷ 8 : 180°, ce n’est qu’un demi-tour, la moitié de la pizza.',
    },
  },

  // 7 ─ Round a point (ANGLESUM, walked) ─────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Circle',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'Round a Point',
    titleFr: 'Autour d’un point',
    ratio: 45,
    inlineSvg: DIAGRAMS.POINT,
    content: 'Together, the angles make a **full turn**.',
    contentFr: 'Ensemble, les angles font un **tour complet**.',
    notes: [
      {
        tone: 'write',
        text: 'Angles **around a point** add up to **360°**.',
        textFr: 'Les angles **autour d’un point** font **360°** en tout.',
      },
    ],
    activity: {
      id: 'act_point',
      type: 'anglesum',
      kind: 'point',
      angles: [100, 120, 'b'],
      prompt: 'Find **b**. This time there are two angles to add first.',
      promptFr: 'Trouve **b**. Cette fois, il y a deux angles à additionner d’abord.',
      explain: 'Round a point is a full turn, so it is 360°, not 180°. It took two steps: add, then take away.',
      explainFr: 'Autour d’un point, c’est un tour complet, donc 360°, pas 180°. Il a fallu deux étapes : additionner, puis enlever.',
    },
  },

  // 8 ─ The method: two steps (CHECK 2) ───────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ListChecks',
    eyebrow: 'The method',
    eyebrowFr: 'La méthode',
    title: 'Two Steps',
    titleFr: 'Deux étapes',
    notes: [
      {
        tone: 'write',
        text: '**To find a missing angle:**\n**1.** Add the angles you know.\n**2.** Take the total away from **180°** or **360°**.',
        textFr: '**Pour trouver un angle qui manque :**\n**1.** Additionne les angles que tu connais.\n**2.** Enlève le total de **180°** ou de **360°**.',
      },
    ],
    check: {
      id: 'chk_steps',
      q: 'Three angles round a point are **90°**, **150°** and **c**. Which calculation finds **c**?',
      qFr: 'Trois angles autour d’un point font **90°**, **150°** et **c**. Quel calcul trouve **c** ?',
      options: [
        { val: 'A', text: '360° − 150°', textFr: '360° − 150°' },
        { val: 'B', text: '360° − (90° + 150°)', textFr: '360° − (90° + 150°)' },
        { val: 'C', text: '180° − (90° + 150°)', textFr: '180° − (90° + 150°)' },
        { val: 'D', text: '90° + 150°', textFr: '90° + 150°' },
      ],
      correct: 'B',
      expEn: 'Step 1 adds **both** angles you know: 90° + 150° = 240°. Step 2 takes the total away from **360°**, because the angles go round a point: c = 360° − 240° = 120°. A leaves out the 90° — in a picture it is often just a small square. C uses 180°, which gives an angle below zero. D stops after step 1.',
      expFr: 'L’étape 1 additionne **les deux** angles connus : 90° + 150° = 240°. L’étape 2 enlève le total de **360°**, car les angles font le tour d’un point : c = 360° − 240° = 120°. A oublie les 90° — sur un dessin, c’est souvent juste un petit carré. C utilise 180°, ce qui donne un angle sous zéro. D s’arrête après l’étape 1.',
    },
  },

  // ── KEY WORDS ─────────────────────────────────────────────────────────────
  // 9 ─ Sum (CHECK 3) ────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'Key word · English check',
    eyebrowFr: 'Mot clé · point d’anglais',
    title: 'Sum',
    titleFr: 'La somme',
    ratio: 45,
    inlineSvg: DIAGRAMS.SUM_SOME,
    content: '**Sum** and **some** sound exactly the same. In a maths question, it is always **sum**.',
    contentFr: '**Sum** (somme) et **some** (quelques) se prononcent pareil. Dans une question de maths, c’est toujours **sum**.',
    notes: [
      {
        tone: 'write',
        text: '**Sum:** the total when you add numbers together.',
        textFr: '**Somme (sum) :** le total quand on additionne des nombres.',
      },
    ],
    check: {
      id: 'chk_sum',
      q: 'A question says: “The angles have a **sum** of 180°.” What does it mean?',
      qFr: 'Une question dit : « The angles have a **sum** of 180°. » Qu’est-ce que cela veut dire ?',
      options: [
        { val: 'A', text: 'The angles add up to 180°.', textFr: 'Les angles font 180° en tout.' },
        { val: 'B', text: 'Some of the angles are 180°.', textFr: 'Certains des angles font 180°.' },
        { val: 'C', text: 'Each angle is 180°.', textFr: 'Chaque angle fait 180°.' },
      ],
      correct: 'A',
      expEn: 'A **sum** is a total: add them all. “A sum of 180°” means the angles **add up to** 180°. B hears “some” — it sounds the same, but a maths question means sum. C would make each angle a whole straight line.',
      expFr: 'Une **somme** (sum) est un total : on additionne tout. « A sum of 180° » veut dire que les angles **font 180° en tout**. B entend « some » — ça se prononce pareil, mais une question de maths veut dire sum. C ferait de chaque angle une ligne droite entière.',
    },
  },

  // 10 ─ Quadrilateral ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Square',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Quadrilateral',
    titleFr: 'Le quadrilatère',
    ratio: 45,
    inlineSvg: DIAGRAMS.QUADS,
    content: '**quad** = 4 · **lateral** = side',
    contentFr: '**quad** = 4 · **lateral** = côté',
    notes: [
      {
        tone: 'write',
        text: '**Quadrilateral:** a flat shape with **four** straight sides.',
        textFr: '**Quadrilatère (quadrilateral) :** une figure plane à **quatre** côtés droits.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'A strange shape counts too: any four straight sides make a quadrilateral.',
        textFr: 'Une figure bizarre compte aussi : quatre côtés droits, quels qu’ils soient, font un quadrilatère.',
      },
    ],
  },

  // ── ANGLES IN A QUADRILATERAL ─────────────────────────────────────────────
  // 11 ─ Every quadrilateral? (PREDICT on the tear strip) ─────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Scissors',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Every Quadrilateral?',
    titleFr: 'Tous les quadrilatères ?',
    inlineSvg: DIAGRAMS.TEAR,
    caption: 'Draw any quadrilateral. Tear off its four corners and put the points together. What do they make?',
    captionFr: 'Dessine n’importe quel quadrilatère. Déchire ses quatre coins et mets les pointes ensemble. Que font-ils ?',
    activity: {
      id: 'act_tear',
      type: 'predict',
      prompt: 'The four corners of a quadrilateral, put together, make…',
      promptFr: 'Les quatre coins d’un quadrilatère, mis ensemble, font…',
      options: [
        { val: 'line', name: '**a straight line**: 180°, like a triangle', nameFr: '**une ligne droite** : 180°, comme un triangle' },
        { val: 'full', name: '**a full turn**: 360°, for every quadrilateral', nameFr: '**un tour complet** : 360°, pour tous les quadrilatères' },
        { val: 'depends', name: '**it depends on the shape**: only squares and rectangles make 360°', nameFr: '**ça dépend de la figure** : seuls les carrés et les rectangles font 360°' },
      ],
      correct: 'full',
      explain: 'A **full turn**, every time — for a square, and for the strangest four-sided shape you can draw. Try it on the next slide. 180° is the three corners of a triangle; a quadrilateral has one corner more.',
      explainFr: 'Un **tour complet**, à chaque fois — pour un carré, et pour la figure à quatre côtés la plus bizarre que tu puisses dessiner. Essaie sur la diapo suivante. 180°, ce sont les trois coins d’un triangle ; un quadrilatère a un coin de plus.',
    },
  },

  // 12 ─ Tear It (widget, unscored) ───────────────────────────────────────────
  // A showcase, so the widget gets the whole card: on a phone a split gives
  // the text 45% of the height and squeezes the shape too small for a finger.
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Scissors',
    eyebrow: 'Try it · drag the corners',
    eyebrowFr: 'Essaie · fais glisser les coins',
    title: 'Always a Full Turn',
    titleFr: 'Toujours un tour complet',
    widget: TearIt,
    caption: 'Make the shape as **strange** as you like, then tear off the corners. Another way to see it: one line from corner to corner makes **two triangles**, and **180° + 180° = 360°**.',
    captionFr: 'Rends la figure aussi **bizarre** que tu veux, puis déchire les coins. Une autre façon de le voir : une ligne d’un coin à l’autre fait **deux triangles**, et **180° + 180° = 360°**.',
  },

  // 13 ─ A sum of 360° (ANGLESUM, walked) ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Square',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'A Sum of 360°',
    titleFr: 'Une somme de 360°',
    ratio: 45,
    inlineSvg: DIAGRAMS.WORKED,
    content: 'Three angles of a quadrilateral are **70°**, **95°** and **120°**.',
    contentFr: 'Trois angles d’un quadrilatère font **70°**, **95°** et **120°**.',
    notes: [
      {
        tone: 'write',
        text: 'The angles in a **quadrilateral** add up to **360°**.',
        textFr: 'Les angles d’un **quadrilatère** font **360°** en tout.',
      },
    ],
    activity: {
      id: 'act_quad',
      type: 'anglesum',
      kind: 'quad',
      angles: [70, 95, 120, 'd'],
      prompt: 'Find **d**: decide, add, take away, then say why.',
      promptFr: 'Trouve **d** : décide, additionne, enlève, puis dis pourquoi.',
      explain: 'Four corners make 360°, so take the three you know away from 360°.',
      explainFr: 'Quatre coins font 360°, donc enlève de 360° les trois que tu connais.',
    },
  },

  // ── THE WORKBOOK'S WORDS ──────────────────────────────────────────────────
  // 14 ─ Read the question (SORT) ──────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    text: 'Workbook questions have their own words.',
    textFr: 'Les questions du cahier d’exercices ont leurs propres mots.',
    sub: 'What does each sentence tell you to **do**?',
    subFr: 'Que te dit de **faire** chaque phrase ? Les phrases restent en anglais, comme dans le cahier.',
    activity: {
      id: 'act_words',
      type: 'sort',
      prompt: 'Sort the Workbook’s sentences by what they tell you to do.',
      promptFr: 'Range les phrases du cahier selon ce qu’elles te disent de faire.',
      bins: [
        { id: 'find', name: 'Find a number', nameFr: 'Trouver un nombre' },
        { id: 'b180', name: 'Use 180°', nameFr: 'Utiliser 180°' },
        { id: 'b360', name: 'Use 360°', nameFr: 'Utiliser 360°' },
        { id: 'why', name: 'Say the fact you used', nameFr: 'Dire la propriété utilisée' },
      ],
      cards: [
        { id: 'w1', name: 'Calculate the value of a.', nameFr: 'Calculate the value of a.', bin: 'find' },
        { id: 'w2', name: 'Work out the size of the angles that have a letter.', nameFr: 'Work out the size of the angles that have a letter.', bin: 'find' },
        { id: 'w3', name: 'AB is a straight line.', nameFr: 'AB is a straight line.', bin: 'b180' },
        { id: 'w4', name: 'The angles are around a point.', nameFr: 'The angles are around a point.', bin: 'b360' },
        { id: 'w5', name: 'One angle of a quadrilateral is 120°.', nameFr: 'One angle of a quadrilateral is 120°.', bin: 'b360' },
        { id: 'w6', name: 'Give a reason.', nameFr: 'Give a reason.', bin: 'why' },
        { id: 'w7', name: 'Explain how you know.', nameFr: 'Explain how you know.', bin: 'why' },
      ],
      explain: '**Calculate** and **work out** both mean **find**. “AB is a straight line” tells you to use **180°**. Round a point, or the corners of a quadrilateral: **360°**. **Give a reason** and **explain how you know** mean: write the fact you used, after **because**.',
      explainFr: '**Calculate** et **work out** veulent dire **trouve**. « AB is a straight line » te dit d’utiliser **180°**. Autour d’un point, ou les coins d’un quadrilatère : **360°**. **Give a reason** et **explain how you know** veulent dire : écris la propriété utilisée, après **because** (car).',
    },
  },

  // 15 ─ Three the same (CHECK 4) ──────────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Equal',
    eyebrow: 'The same size',
    eyebrowFr: 'La même taille',
    title: 'Three the Same',
    titleFr: 'Trois pareils',
    text: 'One angle of a quadrilateral is **150°**. The other three angles are **the same size**.',
    textFr: 'Un angle d’un quadrilatère fait **150°**. Les trois autres angles ont **la même taille**.',
    sub: '“The same size” means **equal**. Take away what you know, then share what is left.',
    subFr: '« The same size » veut dire **égaux**. Enlève ce que tu connais, puis partage ce qui reste.',
    check: {
      id: 'chk_same',
      q: 'How big is each of the other three angles?',
      qFr: 'Combien mesure chacun des trois autres angles ?',
      options: [
        { val: 'A', text: '210°', textFr: '210°' },
        { val: 'B', text: '90°', textFr: '90°' },
        { val: 'C', text: '10°', textFr: '10°' },
        { val: 'D', text: '70°', textFr: '70°' },
      ],
      correct: 'D',
      expEn: 'Take away the angle you know: 360° − 150° = 210°. Three equal angles share it: **210° ÷ 3 = 70°** each. A stops before sharing. B is 360° ÷ 4 — but only three angles are the same size. C uses 180°: (180° − 150°) ÷ 3.',
      expFr: 'Enlève l’angle connu : 360° − 150° = 210°. Trois angles égaux se le partagent : **210° ÷ 3 = 70°** chacun. A s’arrête avant de partager. B, c’est 360° ÷ 4 — mais seulement trois angles ont la même taille. C utilise 180° : (180° − 150°) ÷ 3.',
    },
  },

  // 16 ─ Parallelogram (CHECK 5) ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Shapes',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'Parallelogram',
    titleFr: 'Le parallélogramme',
    ratio: 45,
    inlineSvg: DIAGRAMS.PARA,
    content: 'One angle is **65°**. Find **q** first. Then **p** and **r**.',
    contentFr: 'Un angle fait **65°**. Trouve d’abord **q**. Puis **p** et **r**.',
    notes: [
      {
        tone: 'write',
        text: 'In a **parallelogram**, opposite angles are **equal**.',
        textFr: 'Dans un **parallélogramme**, les angles opposés sont **égaux**.',
      },
    ],
    check: {
      id: 'chk_para',
      q: 'What size is **p**?',
      qFr: 'Combien mesure **p** ?',
      options: [
        { val: 'A', text: '65°', textFr: '65°' },
        { val: 'B', text: '115°', textFr: '115°' },
        { val: 'C', text: '230°', textFr: '230°' },
        { val: 'D', text: '295°', textFr: '295°' },
      ],
      correct: 'B',
      expEn: '**q** is opposite the 65°, so q = 65°. That leaves 360° − 65° − 65° = 230° for **p** and **r**, which are opposite each other, so equal: **230° ÷ 2 = 115°**. A makes p equal to the angle next to it — it is OPPOSITE angles that are equal. C forgets to share between p and r. D takes away only one 65°.',
      expFr: '**q** est opposé au 65°, donc q = 65°. Il reste 360° − 65° − 65° = 230° pour **p** et **r**, qui sont opposés, donc égaux : **230° ÷ 2 = 115°**. A rend p égal à l’angle voisin — ce sont les angles OPPOSÉS qui sont égaux. C oublie de partager entre p et r. D n’enlève qu’un seul 65°.',
    },
  },

  // ── WORD PROBLEM (deadpan) ────────────────────────────────────────────────
  // 17 ─ Mr Bowen's chair (CHECK 6) ──────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'RotateCcw',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Chair',
    titleFr: 'La chaise de M. Bowen',
    content: 'Mr Bowen sits on his chair, facing the board.\n\nHe spins round **2½ times**.',
    contentFr: 'M. Bowen est assis sur sa chaise, face au tableau.\n\nIl tourne **2 fois et demie**.',
    check: {
      id: 'chk_chair',
      q: 'How many degrees does he turn, and what is he facing now?',
      qFr: 'De combien de degrés tourne-t-il, et que regarde-t-il maintenant ?',
      options: [
        { val: 'A', text: '900°, facing the board', textFr: '900°, face au tableau' },
        { val: 'B', text: '450°, facing the back of the room', textFr: '450°, face au fond de la classe' },
        { val: 'C', text: '900°, facing the back of the room', textFr: '900°, face au fond de la classe' },
        { val: 'D', text: '720°, facing the board', textFr: '720°, face au tableau' },
      ],
      correct: 'C',
      expEn: 'One full turn is 360°, so two full turns are 720°, and the half turn adds 180°: **720° + 180° = 900°**. Two full turns bring him back to the board; the half turn leaves him facing the **back** of the room. The lesson is behind him. A forgets what the half turn does. B counts a turn as 180°. D drops the half turn.',
      expFr: 'Un tour complet fait 360°, donc deux tours complets font 720°, et le demi-tour ajoute 180° : **720° + 180° = 900°**. Deux tours complets le ramènent face au tableau ; le demi-tour le laisse face au **fond** de la classe. La leçon est derrière lui. A oublie ce que fait le demi-tour. B compte un tour comme 180°. D oublie le demi-tour.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 18 ─ Checklist + the exit question (ANGLESUM, quick) ──────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you start the tasks',
    eyebrowFr: 'Avant de commencer les exercices',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Say each one out loud. If one feels shaky, go back to its slide before the practice.',
    contentFr: '> Dis chacune à voix haute. Si l’une te paraît fragile, retourne à sa diapo avant les exercices.',
    items: [
      { text: 'Find a missing angle on a **straight line** (180°).', textFr: 'Trouver un angle sur une **ligne droite** (180°).' },
      { text: 'Find a missing angle **around a point** (360°).', textFr: 'Trouver un angle **autour d’un point** (360°).' },
      { text: 'Find the fourth angle of a **quadrilateral** (360°).', textFr: 'Trouver le quatrième angle d’un **quadrilatère** (360°).' },
      { text: 'Give a reason: the **fact**, after **because**.', textFr: 'Donner une raison : la **propriété**, après **because** (car).' },
    ],
    activity: {
      id: 'act_exit',
      type: 'anglesum',
      kind: 'quad',
      angles: [85, 100, 110, 'x'],
      walk: false,
      prompt: 'Exit question: three angles of a quadrilateral are **85°**, **100°** and **110°**. Work out the fourth angle, **x**, and give a reason.',
      promptFr: 'Question de sortie : trois angles d’un quadrilatère font **85°**, **100°** et **110°**. Calcule le quatrième angle, **x**, et donne une raison.',
      explain: 'This one opened the quick way, like the practice from level 3: the angle and its reason together. A wrong answer opens the steps.',
      explainFr: 'Celle-ci s’ouvrait directement, comme les exercices à partir du niveau 3 : l’angle et sa raison ensemble. Une réponse fausse ouvre les étapes.',
    },
  },
];
