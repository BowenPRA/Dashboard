// src/data/Y7_MATH/U05_2/anglePairs.js
// X, F or Z? (ANGLE_PAIR, p82) — 14 items on six levels. An item states only
// the picture and what is asked; utils/anglePairs.js derives every angle, the
// pair, the answer, the reason sentence and the slip behind a wrong answer,
// and checkAnglePairItems (utils/anglePairCheck.js) proves each one in
// `npm run validate`. Schema at the top of utils/anglePairs.js.
//
//   fig  { type: 'x', a, th }        two lines cross: along a and a + th
//        { type: 'pair', a, th }     two parallel lines along a, a line across
//                                    along a + th (arrows unless arrows: false)
//        { type: 'three', a, th, bends }  three lines, one turned a few degrees
//   [c, w]  crossing c (0 = the upper line), sector w (0–3, anticlockwise from
//           the line's own direction: 2 and 3 at crossing 0 and 0 and 1 at
//           crossing 1 lie between the lines).
//
// The F is always the upright F (line across leaning back, th > 90; sector 3 at
// both crossings) and the Z always the true Z (leaning forward, th < 90;
// sectors 2 and 0). Variety comes from tilting the whole picture (a) and from
// the mix of X, F, Z, straight line and "can't tell".
//
// Numbers are fresh: not the deck's (30, 40, 65, 70, 115, 48, 75, 57, 82, 87),
// not the quiz's (38, 72, 47, 108, 64, 103, 62), not the short answers' (64,
// 70, 78, 74). Answers, for the reviewer:
//   L1  p1 tap the 133° opposite · p2 x = 104° (straight line)
//   L2  p3 tap the 63° corresponding · p4 x = 42° (corresponding)
//   L3  p5 x = 53° (alternate) · p6 y = 77° (alternate, given at the bottom)
//   L4  p7 x = 106° (straight line, tilted) · p8 y = 61° (alternate, tilted)
//       p9 no arrows: x can't tell, y = 58° (vertically opposite)
//       p10 x = 49° (corresponding, tilted)
//   L5  p11 z = 126° (corresponding then straight line, or straight line then Z)
//       p12 z = 67° (vertically opposite, then corresponding)
//   L6  p13 C is not parallel (printed 106°, 74°, 70°; in the same place 106°, 106°, 110°)
//       p14 A is not parallel (74°, 79°, 79° in the same place)
const pair = (a, th, more = {}) => ({ type: 'pair', a, th, ...more });

export const anglePairs = {
  title: 'X, F or Z?',
  titleFr: 'X, F ou Z ?',
  intro: 'Look at the picture. Name the pair first: an X, an F, a Z, a straight line, or no arrows so you can’t tell. Then find the angle.',
  introFr: 'Regarde le dessin. Nomme d’abord la paire : un X, un F, un Z, une ligne droite, ou pas de flèches donc on ne peut pas savoir. Puis trouve l’angle.',
  levels: {
    1: { en: 'Two lines cross', fr: 'Deux droites se croisent' },
    2: { en: 'F: corresponding angles', fr: 'F : angles correspondants' },
    3: { en: 'Z: alternate angles', fr: 'Z : angles alternes-internes' },
    4: { en: 'X, F, Z or none?', fr: 'X, F, Z ou rien ?' },
    5: { en: 'Two steps', fr: 'Deux étapes' },
    6: { en: 'Are they parallel?', fr: 'Sont-elles parallèles ?' },
  },
  items: [
    { id: 'p1', level: 1, kind: 'spot', fig: { type: 'x', a: 18, th: 47 }, given: [0, 1], ask: 'opp' },
    { id: 'p2', level: 1, kind: 'find', fig: { type: 'x', a: -22, th: 76 }, given: [0, 0], find: [{ at: [0, 1], letter: 'x' }] },
    { id: 'p3', level: 2, kind: 'spot', fig: pair(0, 117), given: [1, 3], ask: 'corr' },
    { id: 'p4', level: 2, kind: 'find', fig: pair(0, 138), given: [0, 3], find: [{ at: [1, 3], letter: 'x' }] },
    { id: 'p5', level: 3, kind: 'find', fig: pair(0, 53), given: [0, 2], find: [{ at: [1, 0], letter: 'x' }] },
    { id: 'p6', level: 3, kind: 'find', fig: pair(0, 77), given: [1, 0], find: [{ at: [0, 2], letter: 'y' }] },
    { id: 'p7', level: 4, kind: 'find', fig: pair(24, 106), given: [1, 3], find: [{ at: [1, 0], letter: 'x' }] },
    { id: 'p8', level: 4, kind: 'find', fig: pair(-28, 61), given: [0, 2], find: [{ at: [1, 0], letter: 'y' }] },
    {
      id: 'p9', level: 4, kind: 'find', fig: pair(12, 122, { arrows: false }), given: [0, 3],
      find: [{ at: [1, 3], letter: 'x' }, { at: [0, 1], letter: 'y' }],
    },
    { id: 'p10', level: 4, kind: 'find', fig: pair(-16, 131), given: [0, 3], find: [{ at: [1, 3], letter: 'x' }] },
    { id: 'p11', level: 5, kind: 'steps', fig: pair(0, 126), given: [0, 3], find: [{ at: [1, 0], letter: 'z' }] },
    { id: 'p12', level: 5, kind: 'steps', fig: pair(10, 113), given: [0, 1], find: [{ at: [1, 3], letter: 'z' }] },
    {
      id: 'p13', level: 6, kind: 'which', fig: { type: 'three', a: 0, th: 74, bends: [0, 0, 4] },
      given: [[0, 3], [1, 2], [2, 0]],
      context: 'Mr Bowen’s gate has three bars, A, B and C, and one bar across them. The numbers are the angles he measured.',
      contextFr: 'Le portail de M. Bowen a trois barres, A, B et C, et une barre qui les traverse. Les nombres sont les angles qu’il a mesurés.',
    },
    {
      id: 'p14', level: 6, kind: 'which', fig: { type: 'three', a: 0, th: 101, bends: [-5, 0, 0] },
      given: [[0, 1], [1, 1], [2, 0]],
      context: 'Mr Bowen puts up three new shelves, A, B and C, on one side. He measures one angle at each shelf.',
      contextFr: 'M. Bowen pose trois nouvelles étagères, A, B et C, sur un montant. Il mesure un angle à chaque étagère.',
    },
  ],
};
