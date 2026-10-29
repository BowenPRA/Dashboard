// src/data/Y7_MATH/U05_2/notes.js
// 5.2 Intersecting lines — a self-study reduction of the classroom deck
// (C:\Users\sbowe\code\classroom, content/y7-math/U05_2, 26 slides, one period).
// English and French only (meta.vietnamese: false). 23 layout slides, 15 scored:
// 6 checks and 9 activities (predict · sort · anglepair). Plan:
// docs/y7-math/plans/U05_2.md.
//
// THE ONE IDEA: SEE WHICH PAIR YOU ARE LOOKING AT. An X (vertically opposite),
// an F (corresponding), a Z (alternate), a straight line (180°), or nothing
// because there are no arrows — then the size, then the reason, said as the
// Workbook wants it: "x = 70° because they are alternate angles."
//
// SPINE:
//   1–3    hero; the starter (predict: the handles); Mr Bowen's scissors
//   4–8    vertically opposite (check: the flat scissors); say why (check:
//          a reason names a fact); parallel and perpendicular (sort); reading
//          a diagram; one angle, three more (anglepair)
//   9–15   the bookshelf; vote F (predict); corresponding; Cross the Tracks
//          (predict: not parallel); vote Z (predict); alternate; X, F and Z
//          (sort: equal / 180° / you can't tell)
//   16–23  the Workbook's words (anglepair); x, y, z (check: which Z); which
//          shelf (check); which statement (check: no arrows); the ladder
//          (check); the walk (reveal); one angle, seven more (sort); checklist
//
// House notes:
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · An `anglepair` activity draws its own figure, so its slide carries no
//    diagram of the same thing (8 is a statement; 16 sits beside a table of words).
//  · No whiteboards, votes with hands, rulers, standing games, homework, date or
//    exit hero. The F stands upright and the Z is never mirrored, everywhere.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as PHOTO } from './diagramsB.js';
import { ScissorsStepper } from './scissors.jsx';
import { ShelfStory } from './story.jsx';
import { CrossTracks } from './tracks.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Hash',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 5 · 5.2',
    eyebrowFr: 'Unité 5 · 5.2',
    title: 'Intersecting Lines',
    titleFr: 'Les droites sécantes',
    subtitle: 'X, F and Z: find the angle, then say why.',
    subtitleFr: 'X, F et Z : trouve l’angle, puis dis pourquoi.',
    objective: 'Find vertically opposite angles where two lines cross; say what parallel and perpendicular lines are; use corresponding angles (an F) and alternate angles (a Z) where a line crosses two parallel lines, and know they only work when the lines are parallel; and give every answer with its reason.',
    objectiveFr: 'Trouver des angles opposés par le sommet là où deux droites se croisent ; dire ce que sont des droites parallèles et perpendiculaires ; utiliser les angles correspondants (un F) et les angles alternes-internes (un Z) quand une droite coupe deux droites parallèles, et savoir qu’ils ne marchent que si les droites sont parallèles ; et donner chaque réponse avec sa raison.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'You will **predict**, **sort** and **name the pair**, then give the reason. **15 things are scored**. The first is on the next slide.',
      textFr: 'Tu vas **prédire**, **trier** et **nommer la paire**, puis donner la raison. **15 éléments sont notés**. Le premier est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: the handles (PREDICT) ──────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter',
    eyebrowFr: 'Pour commencer',
    title: 'The Handles',
    titleFr: 'Les poignées',
    label: 'Predict',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Mr Bowen opens his scissors. The **blades** make an angle of **30°**.',
    textFr: 'M. Bowen ouvre ses ciseaux. Les **lames** font un angle de **30°**.',
    sub: 'What angle do the **handles** make? Decide before you go on: the next slide opens the scissors.',
    subFr: 'Quel angle font les **poignées** ? Décide avant de continuer : la diapo suivante ouvre les ciseaux.',
    activity: {
      id: 'act_handles',
      type: 'predict',
      prompt: 'The blades make **30°**. What angle do the handles make?',
      promptFr: 'Les lames font **30°**. Quel angle font les poignées ?',
      options: [
        { val: 'side', name: '150°', nameFr: '150°' },
        { val: 'same', name: '30°, the same as the blades', nameFr: '30°, comme les lames' },
        { val: 'short', name: 'Less than 30°: the handles are shorter', nameFr: 'Moins de 30° : les poignées sont plus courtes' },
        { val: 'double', name: '60°', nameFr: '60°' },
      ],
      correct: 'same',
      explain: '**30°.** The blades and the handles are two straight lines that cross at the screw, and the handles are across from the blades. How long the arms are does not change an angle, so shorter handles make the same angle. **150°** is the angle at each side: 180° − 30°.',
      explainFr: '**30°.** Les lames et les poignées sont deux droites qui se croisent à la vis, et les poignées sont en face des lames. La longueur des côtés ne change pas un angle, donc des poignées plus courtes font le même angle. **150°**, c’est l’angle de chaque côté : 180° − 30°.',
    },
  },

  // 3 ─ The scissors stepper ────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'X',
    eyebrow: 'Open them',
    eyebrowFr: 'Ouvre-les',
    title: 'Mr Bowen’s Scissors',
    titleFr: 'Les ciseaux de M. Bowen',
    widget: ScissorsStepper,
    caption: 'One press = **15°** wider. Before each press, say the **handles** and each **side**.',
    captionFr: 'Un clic = **15°** de plus. Avant chaque clic, dis les **poignées** et chaque **côté**.',
  },

  // 4 ─ Key word: vertically opposite, on real scissors (CHECK 1) ─────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'X',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Vertically Opposite Angles',
    titleFr: 'Angles opposés par le sommet',
    ratio: 45,
    inlineSvg: PHOTO.SCISSORS_PHOTO,
    content: '**Vertically** here is not “up and down”. It means at the **vertex**: the point where the lines cross.',
    contentFr: '**Vertically** ne veut pas dire « de haut en bas ». Il veut dire au **sommet** (vertex) : le point où les droites se croisent.',
    notes: [
      {
        tone: 'write',
        text: '**Vertically opposite angles** are equal.',
        textFr: '**Les angles opposés par le sommet (vertically opposite angles)** sont égaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Angles **next to** each other make a straight line: **180°** together.',
        textFr: 'Des angles **côte à côte** font une ligne droite : **180°** ensemble.',
      },
    ],
    check: {
      id: 'chk_opposite',
      q: 'In the photo the scissors lie flat. Which angle is **vertically opposite** the blades’ angle?',
      qFr: 'Sur la photo, les ciseaux sont à plat. Quel angle est **opposé par le sommet** à l’angle des lames ?',
      options: [
        { val: 'A', text: 'The angle between the handles', textFr: 'L’angle entre les poignées' },
        { val: 'B', text: 'The angle above the screw', textFr: 'L’angle au-dessus de la vis' },
        { val: 'C', text: 'The angle below the screw', textFr: 'L’angle en dessous de la vis' },
        { val: 'D', text: 'None: the handles are shorter than the blades', textFr: 'Aucun : les poignées sont plus courtes que les lames' },
      ],
      correct: 'A',
      expEn: 'The handles’ angle is across the screw from the blades’ angle, so the two are vertically opposite, and equal. “Vertically” means at the vertex, not up and down: the angles above and below the screw are **next to** the blades’ angle on a straight line, so each makes 180° with it. Shorter arms do not change an angle.',
      expFr: 'L’angle des poignées est de l’autre côté de la vis par rapport à l’angle des lames : ils sont opposés par le sommet, et égaux. « Vertically » veut dire au sommet, pas de haut en bas : les angles au-dessus et en dessous de la vis sont **à côté** de l’angle des lames, sur une ligne droite, donc chacun fait 180° avec lui. Des côtés plus courts ne changent pas un angle.',
    },
  },

  // 5 ─ English check: say why (CHECK 2) ────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Say Why',
    titleFr: 'Dis pourquoi',
    inlineSvg: DIAGRAMS.SAY_WHY,
    caption: 'The answer, then **because**, then the fact.',
    captionFr: 'La réponse, puis **because** (parce que), puis la propriété.',
    check: {
      id: 'chk_reason',
      q: 'Now find **c** in the picture. Which sentence is right, with a good reason?',
      qFr: 'Trouve maintenant **c** sur le dessin. Quelle phrase est juste, avec une bonne raison ?',
      options: [
        { val: 'A', text: 'c = 40° because they are vertically opposite angles.', textFr: 'c = 40° because they are vertically opposite angles. (car ils sont opposés par le sommet)' },
        { val: 'B', text: 'c = 140° because it looks the same as b.', textFr: 'c = 140° because it looks the same as b. (car il a l’air pareil que b)' },
        { val: 'C', text: 'c = 140° because they are equal.', textFr: 'c = 140° because they are equal. (car ils sont égaux)' },
        { val: 'D', text: 'c = 140° because b and c are vertically opposite angles.', textFr: 'c = 140° because b and c are vertically opposite angles. (car b et c sont opposés par le sommet)' },
      ],
      correct: 'D',
      expEn: '**c = 140°**: c is across the crossing from b, so b and c are vertically opposite. (c is also on a straight line with the 40°: 180° − 40° = 140°.) A reason names a **fact**. “They are equal” is the answer again, not a reason. “It looks the same” is not allowed: diagrams are not drawn accurately. And c is not 40°: the 40° is next to c, not across from it.',
      expFr: '**c = 140°** : c est de l’autre côté du croisement par rapport à b, donc b et c sont opposés par le sommet. (c est aussi sur une ligne droite avec 40° : 180° − 40° = 140°.) Une raison donne une **propriété**. « Ils sont égaux », c’est encore la réponse, pas une raison. « Il a l’air pareil » n’est pas permis : les dessins ne sont pas exacts. Et c ne fait pas 40° : le 40° est à côté de c, pas en face.',
    },
  },

  // 6 ─ Key words: parallel and perpendicular, from above a level crossing (SORT)
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Parallel and Perpendicular',
    titleFr: 'Parallèles et perpendiculaires',
    ratio: 45,
    inlineSvg: PHOTO.TRACKS_PHOTO,
    notes: [
      {
        tone: 'write',
        text: '**Parallel lines:** always the same distance apart. They never meet.\n**Perpendicular lines:** meet at a **right angle** (90°).',
        textFr: '**Droites parallèles (parallel) :** toujours à la même distance. Elles ne se coupent jamais.\n**Droites perpendiculaires (perpendicular) :** se coupent à **angle droit** (90°).',
      },
    ],
    activity: {
      id: 'act_parallel',
      type: 'sort',
      prompt: '**Parallel**, **perpendicular**, or **neither**? Sort the six pairs of lines.',
      promptFr: '**Parallèles**, **perpendiculaires**, ou **ni l’un ni l’autre** ? Trie les six paires de droites.',
      bins: [
        { id: 'par', name: 'Parallel', nameFr: 'Parallèles' },
        { id: 'perp', name: 'Perpendicular', nameFr: 'Perpendiculaires' },
        { id: 'neither', name: 'Neither', nameFr: 'Ni l’un ni l’autre' },
      ],
      cards: [
        { id: 'c1', name: 'The two rails of a railway', nameFr: 'Les deux rails d’une voie ferrée', bin: 'par' },
        { id: 'c2', name: 'The two diagonals of a square', nameFr: 'Les deux diagonales d’un carré', bin: 'perp' },
        { id: 'c3', name: 'The hands of a clock at 2 o’clock', nameFr: 'Les aiguilles d’une horloge à 2 heures', bin: 'neither' },
        { id: 'c4', name: 'The two long edges of a ruler', nameFr: 'Les deux grands bords d’une règle', bin: 'par' },
        { id: 'c5', name: 'The road and the rails in the photo', nameFr: 'La route et les rails sur la photo', bin: 'perp' },
        { id: 'c6', name: 'The blades of open scissors', nameFr: 'Les lames de ciseaux ouverts', bin: 'neither' },
      ],
      explain: 'Rails and a ruler’s edges stay the same distance apart: **parallel**. A square’s diagonals cross at 90°, so they are **perpendicular**, even though neither of them goes up and down. The road meets the rails at a right angle too. Clock hands at 2 o’clock and open scissors cross, but not at 90°: **neither**. Not every pair of lines is one or the other.',
      explainFr: 'Les rails et les bords d’une règle restent à la même distance : **parallèles**. Les diagonales d’un carré se coupent à 90°, donc elles sont **perpendiculaires**, même si aucune ne va de haut en bas. La route coupe aussi les rails à angle droit. Les aiguilles à 2 heures et des ciseaux ouverts se croisent, mais pas à 90° : **ni l’un ni l’autre**. Toutes les paires de droites ne sont pas l’un ou l’autre.',
    },
  },

  // 7 ─ How to read the diagram ─────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Read the picture',
    eyebrowFr: 'Lis le dessin',
    title: 'How to Read the Diagram',
    titleFr: 'Comment lire le dessin',
    inlineSvg: DIAGRAMS.READ,
    caption: '**No arrows?** Then do **not** guess that the lines are parallel.',
    captionFr: '**Pas de flèches ?** Alors ne **devine** pas que les droites sont parallèles.',
  },

  // 8 ─ One angle, three more: the engine on a slide (ANGLEPAIR) ───────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn · say why',
    eyebrowFr: 'À toi · dis pourquoi',
    title: 'One Angle, Three More',
    titleFr: 'Un angle, trois autres',
    text: 'Two straight lines cross. One angle is **115°**.',
    textFr: 'Deux droites se croisent. Un angle fait **115°**.',
    sub: 'First name the pair: an X, or a straight line? Then find the size.',
    subFr: 'Nomme d’abord la paire : un X, ou une ligne droite ? Puis trouve la taille.',
    activity: {
      id: 'act_cross',
      type: 'anglepair',
      kind: 'find',
      fig: { type: 'x', a: 25, th: 115 },
      given: [0, 0],
      find: [{ at: [0, 1], letter: 'b' }],
      prompt: 'Find **b**. Give a reason.',
      promptFr: 'Trouve **b**. Donne une raison.',
      explain: 'The other two angles: the one across from the 115° is **115°**, and the one across from b is **65°**, because they are vertically opposite angles. One angle gave you all three.',
      explainFr: 'Les deux autres angles : celui en face du 115° fait **115°**, et celui en face de b fait **65°**, car ils sont opposés par le sommet. Un angle t’a donné les trois.',
    },
  },

  // ── A LINE ACROSS PARALLEL LINES ───────────────────────────────────────────
  // 9 ─ What happens next? Mr Bowen's bookshelf ─────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'BookOpen',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Bookshelf',
    titleFr: 'Les étagères de M. Bowen',
    widget: ShelfStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 10 ─ The first vote: which angle is 70°? (PREDICT) ─────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Which Angle Is 70°?',
    titleFr: 'Quel angle fait 70° ?',
    text: 'The two lines are **parallel**. Which angle at the bottom is **also 70°**?',
    textFr: 'Les deux droites sont **parallèles**. Quel angle, en bas, fait **aussi 70°** ?',
    columns: [
      { heading: 'A', headingFr: 'A', accent: BLUE, inlineSvg: DIAGRAMS.ANS_F_A },
      { heading: 'B', headingFr: 'B', accent: ORANGE, inlineSvg: DIAGRAMS.ANS_F_B },
    ],
    activity: {
      id: 'act_vote_f',
      type: 'predict',
      prompt: 'Which angle at the bottom is also **70°**?',
      promptFr: 'Quel angle, en bas, fait aussi **70°** ?',
      options: [
        { val: 'A', name: 'A', nameFr: 'A' },
        { val: 'B', name: 'B', nameFr: 'B' },
      ],
      correct: 'A',
      explain: '**A.** It is in the same place at the bottom crossing: under the line, on the right of the line across. B is between the lines on the same side as the 70°: together they make 180°, so B is 110°. The next slide shows why A fits.',
      explainFr: '**A.** Il est à la même place au croisement du bas : sous la droite, à droite de la sécante. B est entre les droites, du même côté que le 70° : ensemble, ils font 180°, donc B fait 110°. La diapo suivante montre pourquoi A colle.',
    },
  },

  // 11 ─ Answer A: corresponding angles ─────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowDown',
    eyebrow: 'Answer: A',
    eyebrowFr: 'Réponse : A',
    title: 'Corresponding Angles',
    titleFr: 'Les angles correspondants',
    ratio: 45,
    inlineSvg: DIAGRAMS.SLIDE_DOWN,
    notes: [
      {
        tone: 'write',
        text: 'Where a line crosses two **parallel** lines, **corresponding angles** are equal.',
        textFr: 'Quand une droite coupe deux droites **parallèles**, les **angles correspondants (corresponding angles)** sont égaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Corresponding means **in the same place** at each crossing. Look for an **F**.',
        textFr: 'Correspondants veut dire **à la même place** à chaque croisement. Cherche un **F**.',
      },
    ],
  },

  // 12 ─ The model: turn it, slide it, bend it (PREDICT before the bend) ──
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'RotateCcw',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Cross the Tracks',
    titleFr: 'Traverse les rails',
    widget: CrossTracks,
    caption: 'Say the **bottom** angles first. Then slide it down to check.',
    captionFr: 'Dis d’abord les angles du **bas**. Puis fais-la glisser pour vérifier.',
    activity: {
      id: 'act_not_parallel',
      type: 'predict',
      prompt: 'Decide before you press **Make them not parallel**. The top angle stays **60°**. Is the angle in the same place at the bottom still 60°?',
      promptFr: 'Décide avant de cliquer sur **Rends-les non parallèles**. L’angle du haut reste **60°**. L’angle à la même place, en bas, fait-il encore 60° ?',
      options: [
        { val: 'always', name: 'Yes: corresponding angles are always equal', nameFr: 'Oui : les angles correspondants sont toujours égaux' },
        { val: 'only', name: 'No: they are only equal when the lines are parallel', nameFr: 'Non : ils ne sont égaux que si les droites sont parallèles' },
        { val: 'flip', name: 'No: it becomes 120°', nameFr: 'Non : il devient 120°' },
      ],
      correct: 'only',
      explain: 'Press it and see: the bottom line turns 11°, so the angle in the same place becomes **71°**, and the slide no longer fits. Corresponding angles, and alternate angles, are equal **only when the lines are parallel**. The arrows tell you that they are.',
      explainFr: 'Clique et regarde : la droite du bas tourne de 11°, donc l’angle à la même place devient **71°**, et la copie ne colle plus. Les angles correspondants, et les angles alternes-internes, ne sont égaux **que si les droites sont parallèles**. Ce sont les flèches qui te le disent.',
    },
  },

  // 13 ─ The second vote: between the lines (PREDICT) ──────────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide before you go on',
    eyebrowFr: 'Décide avant de continuer',
    title: 'Between the Lines',
    titleFr: 'Entre les droites',
    text: 'The lines are **parallel**. Between them, which angle is **also 70°**?',
    textFr: 'Les droites sont **parallèles**. Entre elles, quel angle fait **aussi 70°** ?',
    columns: [
      { heading: 'A', headingFr: 'A', accent: BLUE, inlineSvg: DIAGRAMS.ANS_Z_B },
      { heading: 'B', headingFr: 'B', accent: ORANGE, inlineSvg: DIAGRAMS.ANS_Z_A },
    ],
    activity: {
      id: 'act_vote_z',
      type: 'predict',
      prompt: 'Between the lines, which angle is also **70°**?',
      promptFr: 'Entre les droites, quel angle fait aussi **70°** ?',
      options: [
        { val: 'A', name: 'A', nameFr: 'A' },
        { val: 'B', name: 'B', nameFr: 'B' },
      ],
      correct: 'B',
      explain: '**B.** It is between the lines, on the **other side** of the line across: the 70° and B make a **Z**. A is between the lines on the **same side**: together they make 180°, so A is 110°.',
      explainFr: '**B.** Il est entre les droites, de **l’autre côté** de la sécante : le 70° et B forment un **Z**. A est entre les droites, du **même côté** : ensemble, ils font 180°, donc A fait 110°.',
    },
  },

  // 14 ─ Answer B: alternate angles ─────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse : B',
    title: 'Alternate Angles',
    titleFr: 'Les angles alternes-internes',
    ratio: 45,
    inlineSvg: DIAGRAMS.Z_PROOF,
    notes: [
      {
        tone: 'write',
        text: 'Where a line crosses two **parallel** lines, **alternate angles** are equal.',
        textFr: 'Quand une droite coupe deux droites **parallèles**, les **angles alternes-internes (alternate angles)** sont égaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Why: the **same place** (an F), then **opposite** that (an X), makes a **Z**. And A was **110°**: between the lines on the same side, the two angles make 180°.',
        textFr: 'Pourquoi : la **même place** (un F), puis **en face** (un X), cela fait un **Z**. Et A faisait **110°** : entre les droites, du même côté, les deux angles font 180°.',
      },
    ],
  },

  // 15 ─ X, F and Z: put it together (SORT: Equal or Not?, in words) ──────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'X, F and Z',
    titleFr: 'X, F et Z',
    ratio: 50,
    inlineSvg: DIAGRAMS.XFZ,
    drawThis: true,
    content: 'Copy the **X**, the **F** and the **Z** into your notebook, with their names.',
    contentFr: 'Recopie le **X**, le **F** et le **Z** dans ton cahier, avec leurs noms.',
    notes: [
      {
        tone: 'write',
        text: '**Give a reason:** write the angle fact after **because**.',
        textFr: '**Donne une raison (give a reason) :** écris la propriété après **because** (parce que).',
      },
    ],
    activity: {
      id: 'act_equal_or_not',
      type: 'sort',
      prompt: 'Equal, 180° together, or you can’t tell? Sort where the two angles are.',
      promptFr: 'Égaux, 180° ensemble, ou on ne peut pas savoir ? Trie où sont les deux angles.',
      bins: [
        { id: 'equal', name: 'Equal', nameFr: 'Égaux' },
        { id: 'sum', name: '180° together', nameFr: '180° ensemble' },
        { id: 'cant', name: 'You can’t tell', nameFr: 'On ne peut pas savoir' },
      ],
      cards: [
        { id: 'w1', name: 'Next to each other on a straight line', nameFr: 'Côte à côte sur une ligne droite', bin: 'sum' },
        { id: 'w2', name: 'In the same place at each crossing, with arrows', nameFr: 'À la même place à chaque croisement, avec des flèches', bin: 'equal' },
        { id: 'w3', name: 'In the same place at each crossing, but no arrows', nameFr: 'À la même place à chaque croisement, mais sans flèches', bin: 'cant' },
        { id: 'w4', name: 'Across from each other where two lines cross', nameFr: 'En face l’un de l’autre là où deux droites se croisent', bin: 'equal' },
        { id: 'w5', name: 'Between the parallel lines, on the same side', nameFr: 'Entre les droites parallèles, du même côté', bin: 'sum' },
        { id: 'w6', name: 'Between the parallel lines, on opposite sides of the line across', nameFr: 'Entre les droites parallèles, de part et d’autre de la sécante', bin: 'equal' },
      ],
      explain: 'Equal: an **X** (vertically opposite), an **F** (corresponding) and a **Z** (alternate). 180° together: next to each other on a straight line, and between the lines on the same side. No arrows: you do not know the lines are parallel, so an F or a Z tells you nothing. An X still works without arrows.',
      explainFr: 'Égaux : un **X** (opposés par le sommet), un **F** (correspondants) et un **Z** (alternes-internes). 180° ensemble : côte à côte sur une ligne droite, et entre les droites du même côté. Sans flèches : on ne sait pas si les droites sont parallèles, donc un F ou un Z ne dit rien. Un X marche toujours, même sans flèches.',
    },
  },

  // ── THE WORKBOOK'S ENGLISH ─────────────────────────────────────────────────
  // 16 ─ Read the question, then answer one in its words (ANGLEPAIR) ──────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check · the Workbook',
    eyebrowFr: 'Point d’anglais · le cahier',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    inlineSvg: DIAGRAMS.PHRASES,
    caption: 'Read each question, then what it means. Then answer one in the Workbook’s words.',
    captionFr: 'Lis chaque question, puis ce qu’elle veut dire. Puis réponds à une question avec les mots du cahier.',
    activity: {
      id: 'act_workbook',
      type: 'anglepair',
      kind: 'find',
      fig: { type: 'pair', a: 8, th: 56 },
      given: [0, 2],
      find: [{ at: [0, 3], letter: 'x' }],
      prompt: '**Calculate the size of angle x. Give a reason.**',
      promptFr: '**Calculate the size of angle x. Give a reason.** (Calcule l’angle x. Donne une raison.)',
      explain: 'The arrows are there, but x and the 56° are at the **same** crossing, next to each other: no F or Z is needed.',
      explainFr: 'Les flèches sont là, mais x et le 56° sont au **même** croisement, côte à côte : pas besoin de F ou de Z.',
    },
  },

  // 17 ─ Calculate x, y and z (reveal x, y; CHECK 3: which Z for z) ────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Your turn · the Workbook’s words',
    eyebrowFr: 'À toi · les mots du cahier',
    title: 'Calculate x, y and z',
    titleFr: 'Calcule x, y et z',
    ratio: 40,
    inlineSvg: DIAGRAMS.PRACTICE,
    content: 'Calculate the size of the angles that have letters.\n\nGive a reason for each.',
    contentFr: 'Calculate the size of the angles that have letters : calcule les angles qui ont une lettre.\n\nDonne une raison pour chacun.',
    reveal: {
      label: 'Check x and y',
      labelFr: 'Vérifie x et y',
      answer: '**x:** 48° + 75° = 123°, then 180° − 123° = **57°** because angles on a straight line add up to 180°.\n**y = 48°** because they are alternate angles.',
      answerFr: '**x :** 48° + 75° = 123°, puis 180° − 123° = **57°** car les angles sur une ligne droite font 180°.\n**y = 48°** car ce sont des angles alternes-internes.',
    },
    check: {
      id: 'chk_z',
      q: 'And **z**? Choose the answer with the right reason.',
      qFr: 'Et **z** ? Choisis la réponse avec la bonne raison.',
      options: [
        { val: 'A', text: 'z = 57° because z and x are alternate angles.', textFr: 'z = 57° because z and x are alternate angles. (car z et x sont alternes-internes)' },
        { val: 'B', text: 'z = 48° because they are alternate angles.', textFr: 'z = 48° because they are alternate angles. (car ce sont des angles alternes-internes)' },
        { val: 'C', text: 'z = 75° because they are corresponding angles.', textFr: 'z = 75° because they are corresponding angles. (car ce sont des angles correspondants)' },
        { val: 'D', text: 'z = 123° because angles on a straight line add up to 180°.', textFr: 'z = 123° because angles on a straight line add up to 180°. (car les angles sur une ligne droite font 180°)' },
      ],
      correct: 'A',
      expEn: '**z = 57°.** Between the parallel lines, z and **x** sit on opposite sides of the right-hand line: a Z. The 48° makes a Z with **y**, not with z. The 75° is not in the same place as z, so it is not corresponding. 123° is the 48° and the 75° together, not z.',
      expFr: '**z = 57°.** Entre les droites parallèles, z et **x** sont de part et d’autre de la droite de droite : un Z. Le 48° fait un Z avec **y**, pas avec z. Le 75° n’est pas à la même place que z, donc il n’est pas correspondant. 123°, c’est le 48° et le 75° ensemble, pas z.',
    },
  },

  // 18 ─ Back to the bookshelf: which shelf? (CHECK 4) ─────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'BookOpen',
    eyebrow: 'Back to the bookshelf · explain why',
    eyebrowFr: 'Retour aux étagères · explique pourquoi',
    title: 'Which Shelf?',
    titleFr: 'Quelle étagère ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.SHELVES,
    content: 'Mr Bowen measures the angle where each shelf meets the side.',
    contentFr: 'M. Bowen mesure l’angle entre chaque étagère et le montant.',
    check: {
      id: 'chk_shelf',
      q: 'Which shelf is **not** parallel to the others? **Explain why.**',
      qFr: 'Quelle étagère n’est **pas** parallèle aux autres ? **Explain why** (explique pourquoi).',
      options: [
        { val: 'A', text: 'B, because it is shorter than the others.', textFr: 'B, parce qu’elle est plus courte que les autres.' },
        { val: 'B', text: 'None: all three shelves meet the same side.', textFr: 'Aucune : les trois étagères touchent le même montant.' },
        { val: 'C', text: 'A and C, because 90° means perpendicular, not parallel.', textFr: 'A et C, parce que 90° veut dire perpendiculaire, pas parallèle.' },
        { val: 'D', text: 'B, because its angle is 82°, not 90°: the corresponding angles are not equal.', textFr: 'B, parce que son angle fait 82°, pas 90° : les angles correspondants ne sont pas égaux.' },
      ],
      correct: 'D',
      expEn: '**B.** The three angles are in the same place at each shelf, so they are corresponding angles. A and C are both 90°, so A and C are parallel. B is 82°, not equal, so B is not parallel, and its books slide off. A and C **are** perpendicular to the side, and that is why they are parallel to each other. Meeting the same side does not make shelves parallel: the angles decide. All three shelves are the same length.',
      expFr: '**B.** Les trois angles sont à la même place sur chaque étagère : ce sont des angles correspondants. A et C font tous les deux 90°, donc A et C sont parallèles. B fait 82°, pas pareil, donc B n’est pas parallèle, et ses livres glissent. A et C **sont** perpendiculaires au montant, et c’est pour cela qu’elles sont parallèles entre elles. Toucher le même montant ne rend pas les étagères parallèles : ce sont les angles qui décident. Les trois étagères ont la même longueur.',
    },
  },

  // 19 ─ Which statement is correct? No arrows (CHECK 5) ────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'The Workbook’s words',
    eyebrowFr: 'Les mots du cahier',
    title: 'Which Statement Is Correct?',
    titleFr: 'Quelle phrase est correcte ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STATEMENTS,
    content: 'Which statement, **A**, **B** or **C**, is correct? Give a reason.',
    contentFr: 'Quelle phrase, **A**, **B** ou **C**, est correcte ? Donne une raison.',
    check: {
      id: 'chk_statement',
      q: 'Which statement is correct?',
      qFr: 'Quelle phrase est correcte ?',
      options: [
        { val: 'A', text: 'x = 65°', textFr: 'x = 65°' },
        { val: 'B', text: 'x = 115°', textFr: 'x = 115°' },
        { val: 'C', text: 'You need more information.', textFr: 'You need more information. (Il faut plus d’informations.)' },
      ],
      correct: 'C',
      expEn: '**C.** Look for the arrows: there are none, so you do not know the lines are parallel. x and the 65° are in the same place (an F), but an F only works on parallel lines, so x might not be 65°. 115° would be the angle next to x on a straight line.',
      expFr: '**C.** Cherche les flèches : il n’y en a pas, donc on ne sait pas si les droites sont parallèles. x et le 65° sont à la même place (un F), mais un F ne marche que sur des droites parallèles, donc x ne fait peut-être pas 65°. 115° serait l’angle à côté de x, sur une ligne droite.',
    },
  },

  // 20 ─ Word problem: the ladder (CHECK 6) ──────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Ladder',
    titleFr: 'L’échelle de M. Bowen',
    ratio: 45,
    inlineSvg: PHOTO.LADDER,
    content: 'Mr Bowen’s ladder has **6** steps. The steps are **parallel**.\n\nThe side meets the bottom step at **87°**.',
    contentFr: 'L’échelle de M. Bowen a **6** barreaux. Les barreaux sont **parallèles**.\n\nLe montant fait **87°** avec le barreau du bas.',
    check: {
      id: 'chk_ladder',
      q: 'What angle does the side make with the **top** step, in the same place? Give a reason.',
      qFr: 'Quel angle le montant fait-il avec le barreau du **haut**, à la même place ? Donne une raison.',
      options: [
        { val: 'A', text: '93°, because 180° − 87° = 93°', textFr: '93°, car 180° − 87° = 93°' },
        { val: 'B', text: '87°, because they are corresponding angles', textFr: '87°, car ce sont des angles correspondants' },
        { val: 'C', text: '522°, because 87° × 6 = 522°', textFr: '522°, car 87° × 6 = 522°' },
        { val: 'D', text: '14.5°, because 87° ÷ 6 = 14.5°', textFr: '14.5°, car 87° ÷ 6 = 14.5°' },
      ],
      correct: 'B',
      expEn: '**87°.** The steps are parallel and the side crosses all of them, so the angle in the same place at the top step is a corresponding angle, and equal. The 6 does not matter: every step meets the side at 87°. 93° would be the angle next to it on a straight line.',
      expFr: '**87°.** Les barreaux sont parallèles et le montant les coupe tous, donc l’angle à la même place au barreau du haut est un angle correspondant, et égal. Le 6 ne compte pas : chaque barreau fait 87° avec le montant. 93° serait l’angle à côté, sur une ligne droite.',
    },
  },

  // 21 ─ Word problem: the walk (reveal) ──────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Walk',
    titleFr: 'La promenade de M. Bowen',
    content: 'Two railway rails are **parallel**. They are **1.4 m** apart.\n\nMr Bowen walks beside them for **300 km**, to find where they meet. How far apart are they at the end?',
    contentFr: 'Deux rails sont **parallèles**. Ils sont à **1.4 m** l’un de l’autre.\n\nM. Bowen marche à côté sur **300 km**, pour trouver où ils se rejoignent. Quelle distance les sépare à la fin ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**1.4 m.** Parallel lines never meet. He is still walking.',
      answerFr: '**1.4 m.** Des droites parallèles ne se rejoignent jamais. Il marche encore.',
    },
  },

  // 22 ─ The exit: one angle, seven more (SORT) ─────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'One Angle, Seven More',
    titleFr: 'Un angle, sept autres',
    ratio: 45,
    inlineSvg: DIAGRAMS.EXIT_ROAD,
    content: 'A road crosses two **parallel** railway lines. One angle is **65°**.',
    contentFr: 'Une route coupe deux voies ferrées **parallèles**. Un angle fait **65°**.',
    activity: {
      id: 'act_exit',
      type: 'sort',
      prompt: 'Sort the seven letters: which angles are **65°**, and which are **115°**?',
      promptFr: 'Trie les sept lettres : quels angles font **65°**, et lesquels font **115°** ?',
      bins: [
        { id: 'k65', name: '65°', nameFr: '65°' },
        { id: 'k115', name: '115°', nameFr: '115°' },
      ],
      cards: [
        { id: 'a', name: 'a', nameFr: 'a', bin: 'k115' },
        { id: 'b', name: 'b', nameFr: 'b', bin: 'k65' },
        { id: 'c', name: 'c', nameFr: 'c', bin: 'k115' },
        { id: 'd', name: 'd', nameFr: 'd', bin: 'k65' },
        { id: 'e', name: 'e', nameFr: 'e', bin: 'k115' },
        { id: 'f', name: 'f', nameFr: 'f', bin: 'k65' },
        { id: 'g', name: 'g', nameFr: 'g', bin: 'k115' },
      ],
      explain: '**b** is across from the 65° (an X). **d** is in the same place at the other crossing (corresponding), and **f** is across from d. The other four, a, c, e and g, each sit next to a 65° on a straight line: 180° − 65° = **115°**. One angle gave you all seven.',
      explainFr: '**b** est en face du 65° (un X). **d** est à la même place à l’autre croisement (correspondant), et **f** est en face de d. Les quatre autres, a, c, e et g, sont chacun à côté d’un 65° sur une ligne droite : 180° − 65° = **115°**. Un angle t’a donné les sept.',
    },
  },

  // 23 ─ Checklist ───────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you finish',
    eyebrowFr: 'Avant de finir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    content: '> Next: **X, F or Z?** Name the pair on new pictures, then find the angle.',
    contentFr: '> Ensuite : **X, F ou Z ?** Nomme la paire sur de nouveaux dessins, puis trouve l’angle.',
    items: [
      { text: 'Find **vertically opposite** angles where two lines cross.', textFr: 'Trouver des angles **opposés par le sommet**.' },
      { text: 'Say what **parallel** and **perpendicular** lines are.', textFr: 'Dire ce que sont des droites **parallèles** et **perpendiculaires**.' },
      { text: 'Use **corresponding** and **alternate** angles, only on parallel lines.', textFr: 'Utiliser les angles **correspondants** et **alternes-internes**, seulement sur des droites parallèles.' },
      { text: 'Give a **reason**: “… **because** they are … angles.”', textFr: 'Donner une **raison** : « … **because** they are … angles. »' },
    ],
  },
];
