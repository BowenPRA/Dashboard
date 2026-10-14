// src/data/Y7_SCI/U02_7/notes.js
// 2.7 Compounds and Mixtures — the self-study deck, reduced from the classroom
// lesson content/y7-science/U02_7 to docs/y7-science/particle-engines.md §4.
// 24 layout slides; 18 scored items — 8 checks and 10 activities of five types
// (sort · predict · formula · particles · estimate).
//
// THE SPINE IS THE CLASSROOM'S. The same two elements, iron and sulfur, are
// first only STIRRED (a mixture: a magnet pulls the iron out) and then HEATED
// (a compound: the magnet does nothing). Each result is predicted before it is
// shown. Then the book's two everyday mixtures, air and water.
//
// WHAT THE ROOM DID, AND WHAT THE STUDENT DOES HERE
//  · The paper starter (element or compound, nine names) → the `sort` on
//    slide 2.
//  · The three hand votes (stirred · heated · tap water) → `predict` blocks,
//    each answered on the next slide.
//  · The Draw This of iron and sulfur, mixed then bonded → the diagram stays;
//    the student tests boxes of those particles with a magnet instead.
//  · "What is air? Tell your partner" → classify three boxes of gas.
//  · The room game Mixture or Compound? → `particles` activities: pure or a
//    mixture (slide 22) and find the compounds (slide 23), keeping the game's
//    pairs — salt and sea water, iron sulfide and iron with sulfur stirred.
//  · The book's question slides → a check each, the rest in the `reveal`.
//  · The homework (copy a bottle's label) and the "Lesson Complete" exit hero
//    are gone; the exit question (salt water) is the checklist's check.
//  · The ten "write" panels stay as Key word cards — badge renamed, so no card
//    tells a student alone with a tablet to copy anything.
//
// House notes: bilingual everywhere; a slide's `check:` or `activity:` is its
// LAST key and no slide carries both; formulae in slide text use Unicode
// subscripts, activity `formula`/`boxes` use plain ASCII. Every photograph is
// openly licensed and credited in docs/y7-science/plans/U02_7.md.
import { DIAGRAMS } from './diagrams.js';
import { IronSulfurClip } from './widgets.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U02_7/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const BLUE = '#1a5fa8';
const RED = '#c8102e';
const GREEN = '#4a8b23';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textVn, textFr) => ({ tone: 'write', badge: 'Key word', badgeVn: 'Từ khóa', badgeFr: 'Mot clé', icon: 'BookOpen', text, textVn, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 2 · 2.7',
    eyebrowVn: 'Chương 2 · 2.7',
    eyebrowFr: 'Unité 2 · 2.7',
    title: 'Compounds & Mixtures',
    titleVn: 'Hợp chất & Hỗn hợp',
    titleFr: 'Composés & mélanges',
    objective: 'Tell a compound from a mixture and explain the difference, using iron and sulfur stirred and then heated; give air, mineral water and tap water as examples of mixtures; say what pure means in science.',
    objectiveVn: 'Phân biệt hợp chất với hỗn hợp và giải thích sự khác nhau, qua sắt và lưu huỳnh được khuấy rồi được đun nóng; nêu không khí, nước khoáng và nước máy là ví dụ về hỗn hợp; nói được "tinh khiết" nghĩa là gì trong khoa học.',
    objectiveFr: 'Distinguer un composé d’un mélange et expliquer la différence, avec du fer et du soufre remués puis chauffés ; donner l’air, l’eau minérale et l’eau du robinet comme exemples de mélanges ; dire ce que veut dire pur en sciences.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeVn: 'Trong bài này',
      badgeFr: 'Dans cette leçon',
      text: 'You will **sort**, **predict**, **write a formula** and **test boxes of particles** with a magnet. **18 things are scored** — the first is on the next slide.',
      textVn: 'Em sẽ **sắp xếp**, **dự đoán**, **viết công thức** và **thử các hộp hạt** bằng nam châm. **18 mục được tính điểm** — mục đầu tiên ở slide sau.',
      textFr: 'Tu vas **trier**, **prédire**, **écrire une formule** et **tester des cases de particules** avec un aimant. **18 activités sont notées** — la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: SORT — element or compound? ─────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Last lesson: elements and compounds',
    eyebrowVn: 'Bài trước: nguyên tố và hợp chất',
    eyebrowFr: 'Leçon précédente : éléments et composés',
    title: 'Element or Compound?',
    titleVn: 'Nguyên tố hay hợp chất?',
    titleFr: 'Élément ou composé ?',
    label: 'Sort it',
    labelVn: 'Sắp xếp',
    labelFr: 'Trie',
    labelIcon: 'Sparkles',
    text: 'An **element** has one kind of atom. A **compound** has two or more kinds, **bonded** together.',
    textVn: '**Nguyên tố** chỉ có một loại nguyên tử. **Hợp chất** có từ hai loại trở lên, **liên kết** với nhau.',
    textFr: 'Un **élément** a une seule sorte d’atome. Un **composé** a deux sortes d’atomes ou plus, **liées** ensemble.',
    sub: 'Nine names and formulae. Sort every one.',
    subVn: 'Chín tên gọi và công thức. Hãy sắp xếp tất cả.',
    subFr: 'Neuf noms et formules. Trie-les tous.',
    activity: {
      id: 'act_el_comp',
      type: 'sort',
      prompt: 'Sort each substance: element or compound?',
      promptVn: 'Sắp xếp từng chất: nguyên tố hay hợp chất?',
      promptFr: 'Trie chaque substance : élément ou composé ?',
      bins: [
        { id: 'element', name: 'Element', nameVn: 'Nguyên tố', nameFr: 'Élément' },
        { id: 'compound', name: 'Compound', nameVn: 'Hợp chất', nameFr: 'Composé' },
      ],
      cards: [
        { id: 'nitrogen', name: 'nitrogen', nameVn: 'nitơ (nitrogen)', nameFr: 'nitrogen (azote)', bin: 'element' },
        { id: 'co2', name: 'carbon dioxide', nameVn: 'cacbon đioxit (carbon dioxide)', nameFr: 'carbon dioxide', bin: 'compound' },
        { id: 'cacl2', name: 'calcium chloride', nameVn: 'canxi clorua (calcium chloride)', nameFr: 'calcium chloride', bin: 'compound' },
        { id: 'sodium', name: 'sodium', nameVn: 'natri (sodium)', nameFr: 'sodium', bin: 'element' },
        { id: 'o2', name: 'O₂', nameVn: 'O₂', nameFr: 'O₂', bin: 'element' },
        { id: 'cao', name: 'CaO', nameVn: 'CaO', nameFr: 'CaO', bin: 'compound' },
        { id: 'ch4', name: 'CH₄', nameVn: 'CH₄', nameFr: 'CH₄', bin: 'compound' },
        { id: 'h2o', name: 'H₂O', nameVn: 'H₂O', nameFr: 'H₂O', bin: 'compound' },
        { id: 'k', name: 'K', nameVn: 'K', nameFr: 'K', bin: 'element' },
      ],
      explain: '**Elements:** nitrogen, sodium, O₂ and K — one kind of atom each. **Compounds:** carbon dioxide, calcium chloride, CaO, CH₄ and H₂O — two or more kinds, bonded. The trap is **O₂**: two oxygen atoms are still only one kind of atom.',
      explainVn: '**Nguyên tố:** nitơ, natri, O₂ và K — mỗi chất chỉ một loại nguyên tử. **Hợp chất:** cacbon đioxit, canxi clorua, CaO, CH₄ và H₂O — hai loại trở lên, liên kết với nhau. Cái bẫy là **O₂**: hai nguyên tử oxi vẫn chỉ là một loại nguyên tử.',
      explainFr: '**Éléments :** nitrogen (azote), sodium, O₂ et K — une seule sorte d’atome chacun. **Composés :** carbon dioxide, calcium chloride, CaO, CH₄ et H₂O — deux sortes ou plus, liées. Le piège, c’est **O₂** : deux atomes d’oxygène, c’est toujours une seule sorte d’atome.',
    },
  },

  // 3 ─ Iron and sulfur + CHECK ─────────────────────────────────────────────
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Learner’s Book, page 65 · two elements',
    eyebrowVn: 'Sách học sinh, trang 65 · hai nguyên tố',
    eyebrowFr: 'Livre de l’élève, page 65 · deux éléments',
    title: 'Iron and Sulfur',
    titleVn: 'Sắt và lưu huỳnh',
    titleFr: 'Fer et soufre',
    columns: [
      {
        heading: 'Iron · magnetic',
        headingVn: 'Sắt · bị nam châm hút',
        headingFr: 'Fer · attiré par l’aimant',
        accent: BLUE,
        icon: 'Magnet',
        image: img('filings.jpg'),
        caption: 'Iron **filings**: tiny pieces of iron. Grey, and a magnet pulls them.',
        captionVn: '**Mạt sắt** (iron filings): những mẩu sắt rất nhỏ. Màu xám, và nam châm hút được.',
        captionFr: 'De la **limaille** de fer (iron filings) : de tout petits morceaux de fer. Grise, et un aimant l’attire.',
      },
      {
        heading: 'Sulfur · not magnetic',
        headingVn: 'Lưu huỳnh · không bị nam châm hút',
        headingFr: 'Soufre · pas attiré par l’aimant',
        accent: ORANGE,
        icon: 'Flame',
        image: img('ijen.jpg'),
        caption: 'Yellow sulfur, dug out of a volcano in Indonesia. A magnet does nothing to it.',
        captionVn: 'Lưu huỳnh màu vàng, đào từ một ngọn núi lửa ở Indonesia. Nam châm không hút được nó.',
        captionFr: 'Du soufre jaune, extrait d’un volcan en Indonésie. Un aimant n’a aucun effet sur lui.',
      },
    ],
    check: {
      id: 'chk_both_elements',
      q: 'Iron is magnetic and sulfur is not. Which of them is an element?',
      qVn: 'Sắt bị nam châm hút còn lưu huỳnh thì không. Chất nào là nguyên tố?',
      qFr: 'Le fer est attiré par l’aimant, le soufre non. Lequel est un élément ?',
      options: [
        { val: 'A', text: 'Only iron — elements are metals', textVn: 'Chỉ sắt — nguyên tố là kim loại', textFr: 'Seulement le fer — les éléments sont des métaux' },
        { val: 'B', text: 'Only sulfur — it comes from a volcano', textVn: 'Chỉ lưu huỳnh — nó đến từ núi lửa', textFr: 'Seulement le soufre — il vient d’un volcan' },
        { val: 'C', text: 'Neither — they are both mixtures', textVn: 'Không chất nào — cả hai đều là hỗn hợp', textFr: 'Aucun — ce sont tous les deux des mélanges' },
        { val: 'D', text: 'Both — each has only one kind of atom', textVn: 'Cả hai — mỗi chất chỉ có một loại nguyên tử', textFr: 'Les deux — chacun n’a qu’une seule sorte d’atome' },
      ],
      correct: 'D',
      expEn: '**Both.** Iron is only iron atoms and sulfur is only sulfur atoms, so each is an element. A is wrong because non-metals such as sulfur and oxygen are elements too; where sulfur is found (B) says nothing about its atoms.',
      expVn: '**Cả hai.** Sắt chỉ gồm nguyên tử sắt và lưu huỳnh chỉ gồm nguyên tử lưu huỳnh, nên mỗi chất là một nguyên tố. A sai vì phi kim như lưu huỳnh và oxi cũng là nguyên tố; nơi tìm thấy lưu huỳnh (B) không cho biết gì về nguyên tử của nó.',
      expFr: '**Les deux.** Le fer, ce ne sont que des atomes de fer, et le soufre que des atomes de soufre, donc chacun est un élément. A est faux parce que les non-métaux comme le soufre et l’oxygène sont aussi des éléments ; l’endroit où l’on trouve le soufre (B) ne dit rien sur ses atomes.',
    },
  },

  // 4 ─ PREDICT: stirred ─────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Stir Them Together',
    titleVn: 'Khuấy chúng lại với nhau',
    titleFr: 'Mélange-les',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Iron filings and yellow sulfur powder are **stirred** together in a dish.',
    textVn: 'Mạt sắt và bột lưu huỳnh màu vàng được **khuấy** với nhau trong một cái đĩa.',
    textFr: 'De la limaille de fer et de la poudre de soufre jaune sont **remuées** ensemble dans une coupelle.',
    sub: 'Then a magnet is held over the dish. Can it pull the iron out?',
    subVn: 'Sau đó người ta đưa nam châm lại gần đĩa. Nam châm có hút sắt ra được không?',
    subFr: 'Puis on tient un aimant au-dessus de la coupelle. Peut-il retirer le fer ?',
    activity: {
      id: 'act_predict_stirred',
      type: 'predict',
      prompt: 'Iron and sulfur, stirred. Can a magnet pull the iron out?',
      promptVn: 'Sắt và lưu huỳnh, khuấy đều. Nam châm có hút sắt ra được không?',
      promptFr: 'Fer et soufre, remués. Un aimant peut-il retirer le fer ?',
      options: [
        { val: 'yes', name: 'Yes — the iron is still iron', nameVn: 'Có — sắt vẫn là sắt', nameFr: 'Oui — le fer est toujours du fer' },
        { val: 'no', name: 'No — stirring has joined them together', nameVn: 'Không — khuấy đã nối chúng lại với nhau', nameFr: 'Non — remuer les a attachés ensemble' },
      ],
      correct: 'yes',
      explain: '**Yes.** Stirring only puts the two elements side by side. Nothing is bonded, so the iron is still iron — and iron is magnetic. The next slide shows it.',
      explainVn: '**Có.** Khuấy chỉ đặt hai nguyên tố cạnh nhau. Không có gì liên kết, nên sắt vẫn là sắt — và sắt bị nam châm hút. Slide sau cho thấy điều đó.',
      explainFr: '**Oui.** Remuer ne fait que mettre les deux éléments côte à côte. Rien n’est lié, donc le fer est toujours du fer — et le fer est attiré par l’aimant. La diapo suivante le montre.',
    },
  },

  // 5 ─ The answer: a mixture ────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Magnet',
    eyebrow: 'Key words · the answer to your prediction',
    eyebrowVn: 'Từ khóa · đáp án cho dự đoán của em',
    eyebrowFr: 'Mots clés · la réponse à ta prédiction',
    title: 'A Mixture',
    titleVn: 'Một hỗn hợp',
    titleFr: 'Un mélange',
    ratio: 45,
    image: img('magnet.jpg'),
    content:
      '**Yes!** The magnet pulls the iron filings out of the sulfur.\n\n' +
      'The iron is still iron. The sulfur is still sulfur. They are mixed, but **not bonded**.',
    contentVn:
      '**Có!** Nam châm hút mạt sắt ra khỏi lưu huỳnh.\n\n' +
      'Sắt vẫn là sắt. Lưu huỳnh vẫn là lưu huỳnh. Chúng trộn lẫn, nhưng **không liên kết**.',
    contentFr: '**Oui !** L’aimant retire la limaille de fer du soufre.\n\nLe fer est toujours du fer. Le soufre est toujours du soufre. Ils sont mélangés, mais **pas liés**.',
    notes: [
      keyWord(
        '**Filings:** very small pieces of metal.',
        '**Mạt (filings):** những mẩu kim loại rất nhỏ.',
        '**Limaille (filings) :** de tout petits morceaux de métal.',
      ),
      keyWord(
        '**Mixture:** different substances mixed together, but **not bonded**.',
        '**Hỗn hợp (mixture):** các chất khác nhau trộn lẫn với nhau, nhưng **không liên kết**.',
        '**Mélange (mixture) :** des substances différentes mélangées ensemble, mais **pas liées**.',
      ),
    ],
  },

  // 6 ─ PREDICT: heated ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Flame',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Now Heat Them',
    titleVn: 'Bây giờ đun nóng',
    titleFr: 'Maintenant, chauffe',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Now the same mixture is **heated** until it glows, then left to cool.',
    textVn: 'Bây giờ chính hỗn hợp đó được **đun nóng** cho đến khi phát sáng, rồi để nguội.',
    textFr: 'Maintenant, on **chauffe** le même mélange jusqu’à ce qu’il rougeoie, puis on le laisse refroidir.',
    sub: 'Can a magnet **still** pull the iron out?',
    subVn: 'Nam châm **vẫn** hút sắt ra được không?',
    subFr: 'Un aimant peut-il **encore** retirer le fer ?',
    activity: {
      id: 'act_predict_heated',
      type: 'predict',
      prompt: 'Iron and sulfur, heated. Can a magnet still pull the iron out?',
      promptVn: 'Sắt và lưu huỳnh, đun nóng. Nam châm vẫn hút sắt ra được không?',
      promptFr: 'Fer et soufre, chauffés. Un aimant peut-il encore retirer le fer ?',
      options: [
        { val: 'yes', name: 'Yes — the iron is still in there', nameVn: 'Có — sắt vẫn còn ở trong đó', nameFr: 'Oui — le fer est toujours dedans' },
        { val: 'no', name: 'No — something new has been made', nameVn: 'Không — một chất mới đã được tạo ra', nameFr: 'Non — quelque chose de nouveau s’est formé' },
      ],
      correct: 'no',
      explain: '**No.** The heat made every iron atom **bond** to a sulfur atom. They are one new substance now, and it is not magnetic. Watch it happen on the next slide.',
      explainVn: '**Không.** Nhiệt làm mỗi nguyên tử sắt **liên kết** với một nguyên tử lưu huỳnh. Bây giờ chúng là một chất mới, và chất đó không bị nam châm hút. Xem điều đó xảy ra ở slide sau.',
      explainFr: '**Non.** La chaleur a fait que chaque atome de fer s’est **lié** à un atome de soufre. C’est maintenant une seule nouvelle substance, et elle n’est pas attirée par l’aimant. Regarde ça se passer sur la diapo suivante.',
    },
  },

  // 7 ─ The video: iron and sulfur heated ────────────────────────────────────
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Flame',
    eyebrow: 'Learner’s Book, page 66 · watch closely',
    eyebrowVn: 'Sách học sinh, trang 66 · xem kỹ nhé',
    eyebrowFr: 'Livre de l’élève, page 66 · regarde bien',
    title: 'Heating Iron and Sulfur',
    titleVn: 'Đun nóng sắt và lưu huỳnh',
    titleFr: 'On chauffe fer et soufre',
    widget: IronSulfurClip,
    caption: 'The film starts just before the heating; no sound is needed. What colour is it **before**? What colour is it **after**?',
    captionVn: 'Đoạn phim bắt đầu ngay trước khi đun; không cần âm thanh. **Trước** khi đun nó màu gì? **Sau** khi đun nó màu gì?',
    captionFr: 'Le film commence juste avant le chauffage ; pas besoin de son. Quelle couleur **avant** ? Quelle couleur **après** ?',
  },

  // 8 ─ The answer: iron sulfide + FORMULA ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'The answer to your prediction · a new substance',
    eyebrowVn: 'Đáp án cho dự đoán của em · một chất mới',
    eyebrowFr: 'La réponse à ta prédiction · une nouvelle substance',
    title: 'Iron Sulfide',
    titleVn: 'Sắt sunfua',
    titleFr: 'Sulfure de fer',
    ratio: 45,
    image: img('ironsulfide.jpg'),
    content:
      '**No!** The magnet does nothing.\n\n' +
      'The glow was the iron and sulfur **bonding**. The yellow and grey powder is gone. What is left is a **dark grey solid**, the same all through.\n\n' +
      'It is a compound: **iron sulfide**. Its name tells you what is in it — iron, and sulf**ide** for sulfur.',
    contentVn:
      '**Không!** Nam châm không hút được.\n\n' +
      'Ánh sáng phát ra là lúc sắt và lưu huỳnh **liên kết** với nhau. Bột vàng và xám đã biến mất. Thứ còn lại là một **chất rắn màu xám đen**, giống nhau từ trong ra ngoài.\n\n' +
      'Đó là một hợp chất: **sắt sunfua (iron sulfide)**. Tên gọi cho em biết trong đó có gì — sắt, và sulf**ide** là lưu huỳnh.',
    contentFr: '**Non !** L’aimant ne fait rien.\n\nLa lueur, c’était le fer et le soufre qui se **liaient**. La poudre jaune et grise a disparu. Il reste un **solide gris foncé**, le même partout.\n\nC’est un composé : **iron sulfide** (sulfure de fer). Son nom te dit ce qu’il contient — iron, le fer, et sulf**ide** pour sulfur, le soufre.',
    activity: {
      id: 'act_formula_fes',
      type: 'formula',
      ask: 'write',
      formula: 'FeS',
      prompt: 'This is one particle of iron sulfide. Write its formula.',
      promptVn: 'Đây là một hạt sắt sunfua. Hãy viết công thức của nó.',
      promptFr: 'Voici une particule de sulfure de fer. Écris sa formule.',
      explain: '**FeS**: one iron atom (Fe) bonded to one sulfur atom (S). When there is only one atom of an element, no small number is written.',
      explainVn: '**FeS**: một nguyên tử sắt (Fe) liên kết với một nguyên tử lưu huỳnh (S). Khi chỉ có một nguyên tử của một nguyên tố thì không viết số nhỏ.',
      explainFr: '**FeS** : un atome de fer (Fe) lié à un atome de soufre (S). Quand il n’y a qu’un seul atome d’un élément, on n’écrit pas de petit nombre.',
    },
  },

  // 9 ─ Mixed, then bonded + PARTICLES (magnet) ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Magnet',
    eyebrow: 'Learner’s Book, page 65 · the same two elements, twice',
    eyebrowVn: 'Sách học sinh, trang 65 · cùng hai nguyên tố, hai lần',
    eyebrowFr: 'Livre de l’élève, page 65 · les deux mêmes éléments, deux fois',
    title: 'Mixed, Then Bonded',
    titleVn: 'Trộn lẫn, rồi liên kết',
    titleFr: 'Mélangés, puis liés',
    ratio: 40,
    inlineSvg: DIAGRAMS.MIX_COMPOUND,
    content:
      '**Stirred:** the iron atoms and sulfur atoms sit side by side, not bonded. A **mixture**.\n\n' +
      '**Heated:** each iron atom bonds to a sulfur atom. A **compound**, iron sulfide.\n\n' +
      'A magnet pulls on **free** iron — iron that is not bonded to anything.',
    contentVn:
      '**Khuấy:** các nguyên tử sắt và lưu huỳnh nằm cạnh nhau, không liên kết. Một **hỗn hợp**.\n\n' +
      '**Đun nóng:** mỗi nguyên tử sắt liên kết với một nguyên tử lưu huỳnh. Một **hợp chất**, sắt sunfua.\n\n' +
      'Nam châm hút sắt **tự do** — sắt không liên kết với chất nào.',
    contentFr: '**Remués :** les atomes de fer et de soufre sont côte à côte, pas liés. Un **mélange**.\n\n**Chauffés :** chaque atome de fer se lie à un atome de soufre. Un **composé**, le sulfure de fer.\n\nUn aimant attire le fer **libre** — le fer qui n’est lié à rien.',
    activity: {
      id: 'act_magnet_boxes',
      type: 'particles',
      ask: 'magnet',
      boxes: [
        ['Fe', 'S', 'Fe', 'S', 'Fe', 'S', 'Fe', 'S'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'FeS', 'FeS'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'Fe', 'Fe', 'Fe'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'S', 'S', 'S'],
      ],
      prompt: 'Would a magnet pull iron out of each box?',
      promptVn: 'Nam châm có hút được sắt ra khỏi từng hộp không?',
      promptFr: 'Un aimant retirerait-il du fer de chaque case ?',
      explain: 'A magnet pulls only on **free iron atoms**. **Yes** for iron and sulfur stirred, and **yes** for iron sulfide with some iron left over — those spare iron atoms are not bonded. **No** for iron sulfide on its own, and **no** for iron sulfide with spare sulfur: every iron atom there is bonded.',
      explainVn: 'Nam châm chỉ hút **nguyên tử sắt tự do**. **Có** với sắt và lưu huỳnh được khuấy, và **có** với sắt sunfua còn dư sắt — những nguyên tử sắt dư đó không liên kết. **Không** với sắt sunfua riêng, và **không** với sắt sunfua còn dư lưu huỳnh: mọi nguyên tử sắt ở đó đều đã liên kết.',
      explainFr: 'Un aimant n’attire que les **atomes de fer libres**. **Oui** pour le fer et le soufre remués, et **oui** pour le sulfure de fer avec un reste de fer — ces atomes de fer en trop ne sont pas liés. **Non** pour le sulfure de fer seul, et **non** pour le sulfure de fer avec du soufre en trop : là, chaque atome de fer est lié.',
    },
  },

  // 10 ─ Mixture vs compound + CHECK ─────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'The difference',
    eyebrowVn: 'Sự khác nhau',
    eyebrowFr: 'La différence',
    title: 'Mixture vs Compound',
    titleVn: 'Hỗn hợp và hợp chất',
    titleFr: 'Mélange ou composé',
    columns: [
      {
        heading: 'Mixture',
        headingVn: 'Hỗn hợp',
        headingFr: 'Mélange',
        accent: BLUE,
        icon: 'Boxes',
        content: 'Iron and sulfur, **stirred**.',
        contentVn: 'Sắt và lưu huỳnh, **khuấy đều**.',
        contentFr: 'Fer et soufre, **remués**.',
        notes: [
          {
            tone: 'write',
            badge: 'Mixture',
            badgeVn: 'Hỗn hợp',
            badgeFr: 'Mélange',
            icon: 'BookOpen',
            text: '**Not bonded.**\nEach substance **keeps** its properties.\n**Easy** to separate.',
            textVn: '**Không liên kết.**\nMỗi chất **giữ nguyên** tính chất.\n**Dễ** tách ra.',
            textFr: '**Pas liés.**\nChaque substance **garde** ses propriétés.\n**Facile** à séparer.',
          },
        ],
      },
      {
        heading: 'Compound',
        headingVn: 'Hợp chất',
        headingFr: 'Composé',
        accent: ORANGE,
        icon: 'Atom',
        content: 'Iron and sulfur, **heated**: iron sulfide.',
        contentVn: 'Sắt và lưu huỳnh, **đun nóng**: sắt sunfua.',
        contentFr: 'Fer et soufre, **chauffés** : du sulfure de fer.',
        notes: [
          {
            tone: 'write',
            badge: 'Compound',
            badgeVn: 'Hợp chất',
            badgeFr: 'Composé',
            icon: 'BookOpen',
            text: '**Bonded.**\nIt has **new** properties.\n**Hard** to separate.',
            textVn: '**Liên kết.**\nNó có tính chất **mới**.\n**Khó** tách ra.',
            textFr: '**Liés.**\nIl a de **nouvelles** propriétés.\n**Difficile** à séparer.',
          },
        ],
      },
    ],
    check: {
      id: 'chk_mixture_props',
      q: 'Which sentence is true of a MIXTURE?',
      qVn: 'Câu nào đúng với một HỖN HỢP?',
      qFr: 'Quelle phrase est vraie pour un MÉLANGE ?',
      options: [
        { val: 'A', text: 'Each substance keeps its own properties, and it is easy to separate', textVn: 'Mỗi chất giữ nguyên tính chất của nó, và dễ tách ra', textFr: 'Chaque substance garde ses propres propriétés, et il est facile à séparer' },
        { val: 'B', text: 'The substances in it are bonded together', textVn: 'Các chất trong đó liên kết với nhau', textFr: 'Les substances qu’il contient sont liées ensemble' },
        { val: 'C', text: 'It has new properties that none of its substances had', textVn: 'Nó có tính chất mới mà không chất nào trong đó có', textFr: 'Il a de nouvelles propriétés qu’aucune de ses substances n’avait' },
        { val: 'D', text: 'It is very hard to separate', textVn: 'Nó rất khó tách ra', textFr: 'Il est très difficile à séparer' },
      ],
      correct: 'A',
      expEn: 'In a mixture nothing is bonded, so the iron stays magnetic and a magnet separates it easily. B, C and D all describe a **compound**: bonded, with new properties, and hard to separate.',
      expVn: 'Trong hỗn hợp không có gì liên kết, nên sắt vẫn bị nam châm hút và nam châm tách nó ra dễ dàng. B, C và D đều mô tả **hợp chất**: có liên kết, có tính chất mới, và khó tách ra.',
      expFr: 'Dans un mélange, rien n’est lié, donc le fer reste attiré par l’aimant et un aimant le sépare facilement. B, C et D décrivent tous un **composé** : lié, avec de nouvelles propriétés, et difficile à séparer.',
    },
  },

  // 11 ─ Book questions 1–2 + CHECK ─────────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 67 · Think like a scientist',
    eyebrowVn: 'Sách học sinh, trang 67 · Suy nghĩ như nhà khoa học',
    eyebrowFr: 'Livre de l’élève, page 67 · Pense comme un scientifique',
    title: 'Questions 1–2',
    titleVn: 'Câu hỏi 1–2',
    titleFr: 'Questions 1–2',
    content:
      '> **1.** Describe what it looks like: **a** the mixture of iron and sulfur **b** the iron sulfide\n' +
      '> **2.** Can a magnet remove the iron from iron sulfide? Explain.\n\n' +
      'Question 1b is scored. Answer 1a and 2 in your head, then check them.',
    contentVn:
      '> **1.** Mô tả vẻ ngoài của: **a** hỗn hợp sắt và lưu huỳnh **b** sắt sunfua\n' +
      '> **2.** Nam châm có tách được sắt ra khỏi sắt sunfua không? Giải thích.\n\n' +
      'Câu 1b được tính điểm. Trả lời câu 1a và 2 trong đầu, rồi kiểm tra.',
    contentFr: '> **1.** Décris son aspect : **a** le mélange de fer et de soufre **b** le sulfure de fer\n> **2.** Un aimant peut-il retirer le fer du sulfure de fer ? Explique.\n\nLa question 1b est notée. Réponds à 1a et 2 dans ta tête, puis vérifie.',
    reveal: {
      label: 'Check 1a and 2',
      labelVn: 'Kiểm tra 1a và 2',
      labelFr: 'Vérifier 1a et 2',
      answer: '**1a** A yellow and grey powder. You can see bits of both.\n**2.** No. The iron is bonded to the sulfur. Iron sulfide is a compound, and it is not magnetic.',
      answerVn: '**1a** Bột màu vàng và xám. Nhìn thấy được cả hai chất.\n**2.** Không. Sắt đã liên kết với lưu huỳnh. Sắt sunfua là hợp chất và không bị nam châm hút.',
      answerFr: '**1a** Une poudre jaune et grise. On voit des bouts des deux.\n**2.** Non. Le fer est lié au soufre. Le sulfure de fer est un composé, et il n’est pas attiré par l’aimant.',
    },
    check: {
      id: 'chk_fes_looks',
      q: 'Question 1b: what does iron sulfide look like?',
      qVn: 'Câu 1b: sắt sunfua trông như thế nào?',
      qFr: 'Question 1b : à quoi ressemble le sulfure de fer ?',
      options: [
        { val: 'A', text: 'A yellow and grey powder — you can see bits of both', textVn: 'Bột màu vàng và xám — nhìn thấy được cả hai', textFr: 'Une poudre jaune et grise — on voit des bouts des deux' },
        { val: 'B', text: 'A dark grey or black solid, the same all through', textVn: 'Chất rắn màu xám đen, giống nhau từ trong ra ngoài', textFr: 'Un solide gris foncé ou noir, le même partout' },
        { val: 'C', text: 'Shiny grey filings that jump to a magnet', textVn: 'Mạt màu xám bóng bị nam châm hút', textFr: 'De la limaille grise et brillante qui saute vers l’aimant' },
        { val: 'D', text: 'A bright yellow powder', textVn: 'Bột màu vàng tươi', textFr: 'Une poudre jaune vif' },
      ],
      correct: 'B',
      expEn: 'Iron sulfide is a **dark grey solid** with no yellow or grey bits: it is one new substance. A is the **mixture** before heating (question 1a); C is iron alone, and D is sulfur alone.',
      expVn: 'Sắt sunfua là **chất rắn màu xám đen** không còn mẩu vàng hay xám: nó là một chất mới duy nhất. A là **hỗn hợp** trước khi đun (câu 1a); C là sắt riêng, còn D là lưu huỳnh riêng.',
      expFr: 'Le sulfure de fer est un **solide gris foncé** sans bouts jaunes ni gris : c’est une seule nouvelle substance. A, c’est le **mélange** avant de chauffer (question 1a) ; C, c’est le fer seul, et D le soufre seul.',
    },
  },

  // 12 ─ What is air? PARTICLES (kind) ───────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Wind',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'What Is Air?',
    titleVn: 'Không khí là gì?',
    titleFr: 'Qu’est-ce que l’air ?',
    label: 'Sort the boxes',
    labelVn: 'Phân loại các hộp',
    labelFr: 'Trie les cases',
    labelIcon: 'Sparkles',
    text: 'You breathe it all day. Is air an **element**, a **compound** or a **mixture**?',
    textVn: 'Em hít thở nó cả ngày. Không khí là **nguyên tố**, **hợp chất** hay **hỗn hợp**?',
    textFr: 'Tu le respires toute la journée. L’air est-il un **élément**, un **composé** ou un **mélange** ?',
    sub: 'Three boxes of gas, drawn particle by particle. One of them is a sample of air.',
    subVn: 'Ba hộp khí, vẽ từng hạt một. Một trong số đó là một mẫu không khí.',
    subFr: 'Trois cases de gaz, dessinées particule par particule. L’une d’elles est un échantillon d’air.',
    activity: {
      id: 'act_air_kind',
      type: 'particles',
      ask: 'kind',
      boxes: [
        ['N2', 'N2', 'N2', 'N2', 'N2', 'N2', 'N2'],
        ['N2', 'N2', 'N2', 'N2', 'N2', 'O2', 'O2', 'CO2', 'H2O'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O'],
      ],
      choices: ['element', 'compound', 'mixture'],
      prompt: 'Element, compound or mixture? Choose under every box.',
      promptVn: 'Nguyên tố, hợp chất hay hỗn hợp? Chọn dưới mỗi hộp.',
      promptFr: 'Élément, composé ou mélange ? Choisis sous chaque case.',
      explain: 'Nitrogen on its own is an **element** — one kind of atom. Water vapour on its own is a **compound** — hydrogen and oxygen, bonded. The box with nitrogen, oxygen, carbon dioxide and water is **air**: several substances, not bonded to each other — a **mixture**.',
      explainVn: 'Nitơ riêng là **nguyên tố** — một loại nguyên tử. Hơi nước riêng là **hợp chất** — hiđro và oxi, liên kết với nhau. Hộp có nitơ, oxi, cacbon đioxit và nước là **không khí**: nhiều chất, không liên kết với nhau — một **hỗn hợp**.',
      explainFr: 'L’azote seul est un **élément** — une seule sorte d’atome. La vapeur d’eau seule est un **composé** — hydrogène et oxygène, liés. La case avec de l’azote, de l’oxygène, du dioxyde de carbone et de l’eau, c’est l’**air** : plusieurs substances, pas liées entre elles — un **mélange**.',
    },
  },

  // 13 ─ Air is a mixture + book questions 1–3 + CHECK ───────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Wind',
    eyebrow: 'Learner’s Book, page 68',
    eyebrowVn: 'Sách học sinh, trang 68',
    eyebrowFr: 'Livre de l’élève, page 68',
    title: 'Air Is a Mixture',
    titleVn: 'Không khí là hỗn hợp',
    titleFr: 'L’air est un mélange',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR,
    content:
      'Air is mostly **nitrogen** and **oxygen**, with a little **carbon dioxide** and **water**. The particles are mixed, not bonded to each other.\n\n' +
      'So air is a **mixture** — of elements **and** compounds.\n\n' +
      '> **1.** Which is the most common element in air?\n' +
      '> **3.** Which is the least common compound?',
    contentVn:
      'Không khí chủ yếu là **nitơ** và **oxi**, với một ít **cacbon đioxit** và **nước**. Các hạt trộn lẫn, không liên kết với nhau.\n\n' +
      'Vậy không khí là một **hỗn hợp** — gồm cả nguyên tố **và** hợp chất.\n\n' +
      '> **1.** Nguyên tố nào có nhiều nhất trong không khí?\n' +
      '> **3.** Hợp chất nào có ít nhất?',
    contentFr: 'L’air est surtout fait d’**azote** et d’**oxygène**, avec un peu de **dioxyde de carbone** et d’**eau**. Les particules sont mélangées, pas liées entre elles.\n\nDonc l’air est un **mélange** — d’éléments **et** de composés.\n\n> **1.** Quel est l’élément le plus courant dans l’air ?\n> **3.** Quel est le composé le moins courant ?',
    reveal: {
      label: 'Check 1 and 3',
      labelVn: 'Kiểm tra 1 và 3',
      labelFr: 'Vérifier 1 et 3',
      answer: '**1.** nitrogen **3.** carbon dioxide',
      answerVn: '**1.** nitơ **3.** cacbon đioxit',
      answerFr: '**1.** l’azote **3.** le dioxyde de carbone',
    },
    check: {
      id: 'chk_air_substances',
      q: 'Question 2: how many different substances can you see in the sample of air?',
      qVn: 'Câu 2: em thấy bao nhiêu chất khác nhau trong mẫu không khí?',
      qFr: 'Question 2 : combien de substances différentes vois-tu dans l’échantillon d’air ?',
      options: [
        { val: 'A', text: '1 — it is all air', textVn: '1 — tất cả đều là không khí', textFr: '1 — tout est de l’air' },
        { val: 'B', text: '2 — nitrogen and oxygen', textVn: '2 — nitơ và oxi', textFr: '2 — azote et oxygène' },
        { val: 'C', text: '4 — nitrogen, oxygen, carbon dioxide and water', textVn: '4 — nitơ, oxi, cacbon đioxit và nước', textFr: '4 — azote, oxygène, dioxyde de carbone et eau' },
        { val: 'D', text: '36 — one for every particle', textVn: '36 — mỗi hạt là một chất', textFr: '36 — une par particule' },
      ],
      correct: 'C',
      expEn: 'There are **four kinds** of particle, so four substances. Air is not one substance (A); B forgets the carbon dioxide and water; and D counts particles, not kinds — 26 nitrogen particles are still one substance.',
      expVn: 'Có **bốn loại** hạt, nên có bốn chất. Không khí không phải một chất (A); B quên cacbon đioxit và nước; còn D đếm số hạt, không phải số loại — 26 hạt nitơ vẫn chỉ là một chất.',
      expFr: 'Il y a **quatre sortes** de particules, donc quatre substances. L’air n’est pas une seule substance (A) ; B oublie le dioxyde de carbone et l’eau ; et D compte les particules, pas les sortes — 26 particules d’azote, c’est toujours une seule substance.',
    },
  },

  // 14 ─ ESTIMATE: how much is nitrogen? ─────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Guess first',
    eyebrowVn: 'Đoán trước',
    eyebrowFr: 'Devine d’abord',
    title: 'How Much Is Nitrogen?',
    titleVn: 'Nitơ chiếm bao nhiêu?',
    titleFr: 'Combien d’azote ?',
    label: 'Estimate',
    labelVn: 'Ước lượng',
    labelFr: 'Estime',
    labelIcon: 'Sparkles',
    text: 'Every 100 litres of air hold some nitrogen, some oxygen and a little of everything else.',
    textVn: 'Mỗi 100 lít không khí chứa một phần nitơ, một phần oxi và một ít các khí khác.',
    textFr: 'Chaque 100 litres d’air contiennent de l’azote, de l’oxygène et un peu de tout le reste.',
    sub: 'Out of 100, how much is **nitrogen**? Slide to your guess.',
    subVn: 'Trong 100 phần, **nitơ** chiếm bao nhiêu? Kéo thanh trượt đến dự đoán của em.',
    subFr: 'Sur 100, combien est de l’**azote** ? Fais glisser jusqu’à ta réponse.',
    activity: {
      id: 'act_estimate_nitrogen',
      type: 'estimate',
      prompt: 'What percentage of air is nitrogen?',
      promptVn: 'Nitơ chiếm bao nhiêu phần trăm không khí?',
      promptFr: 'Quel pourcentage de l’air est de l’azote ?',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      answer: 78,
      tolerance: 0.1,
      explain: 'About **78%** — more than three-quarters of every breath. Oxygen, the gas your body needs, is only about **21%**, and everything else together is about **1%**.',
      explainVn: 'Khoảng **78%** — hơn ba phần tư mỗi hơi thở. Oxi, khí cơ thể em cần, chỉ khoảng **21%**, và tất cả các khí còn lại cộng lại khoảng **1%**.',
      explainFr: 'Environ **78%** — plus des trois quarts de chaque respiration. L’oxygène, le gaz dont ton corps a besoin, ne fait qu’environ **21%**, et tout le reste ensemble environ **1%**.',
    },
  },

  // 15 ─ Composition ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word · Learner’s Book, page 67',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 67',
    eyebrowFr: 'Mot clé · Livre de l’élève, page 67',
    title: 'Composition',
    titleVn: 'Thành phần',
    titleFr: 'Composition',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR_PIE,
    content:
      'The pie chart shows the **composition** of air.\n\n' +
      'The water in air changes with the **weather**, so the composition of air can change. A mixture can. A compound cannot: iron sulfide is always one iron atom to one sulfur atom.',
    contentVn:
      'Biểu đồ tròn cho thấy **thành phần** của không khí.\n\n' +
      'Lượng hơi nước trong không khí thay đổi theo **thời tiết**, nên thành phần không khí có thể thay đổi. Hỗn hợp thì được. Hợp chất thì không: sắt sunfua luôn là một nguyên tử sắt với một nguyên tử lưu huỳnh.',
    contentFr: 'Le diagramme circulaire montre la **composition** de l’air.\n\nL’eau dans l’air change avec la **météo**, donc la composition de l’air peut changer. Un mélange le peut. Un composé, non : le sulfure de fer, c’est toujours un atome de fer pour un atome de soufre.',
    notes: [
      keyWord(
        '**Composition:** what a mixture is made of, and how much of each.\nAir: 78% nitrogen, 21% oxygen, 1% other gases.',
        '**Thành phần (composition):** hỗn hợp gồm những chất gì, và mỗi chất bao nhiêu.\nKhông khí: 78% nitơ, 21% oxi, 1% các khí khác.',
        '**Composition (composition) :** ce dont un mélange est fait, et combien de chaque chose.\nAir : 78% d’azote, 21% d’oxygène, 1% d’autres gaz.',
      ),
    ],
  },

  // 16 ─ What changes the air ────────────────────────────────────────────────
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'CloudFog',
    eyebrow: 'Key word · Learner’s Book, page 67',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 67',
    eyebrowFr: 'Mot clé · Livre de l’élève, page 67',
    title: 'The Air Changes',
    titleVn: 'Không khí thay đổi',
    titleFr: 'L’air change',
    columns: [
      {
        heading: 'From nature',
        headingVn: 'Từ tự nhiên',
        headingFr: 'Par la nature',
        accent: GREEN,
        icon: 'Mountain',
        image: img('volcano.jpg'),
        notes: [
          keyWord(
            '**Natural emissions:** gases that nature gives out. Volcanoes, animals and plants give out carbon dioxide.',
            '**Khí thải tự nhiên (natural emissions):** các khí do tự nhiên thải ra. Núi lửa, động vật và thực vật thải ra cacbon đioxit.',
            '**Émissions naturelles (natural emissions) :** les gaz que la nature rejette. Les volcans, les animaux et les plantes rejettent du dioxyde de carbone.',
          ),
        ],
        caption: 'Volcano gas over the crater lake at Kawah Ijen, Indonesia.',
        captionVn: 'Khí núi lửa trên hồ miệng núi lửa Kawah Ijen, Indonesia.',
        captionFr: 'Gaz volcanique au-dessus du lac du cratère du Kawah Ijen, en Indonésie.',
      },
      {
        heading: 'From people',
        headingVn: 'Từ con người',
        headingFr: 'Par les humains',
        accent: RED,
        icon: 'Gauge',
        image: img('traffic.jpg'),
        content: 'Burning petrol gives out **carbon dioxide** too. Every motorbike adds a little to the air.',
        contentVn: 'Đốt xăng cũng thải ra **cacbon đioxit**. Mỗi chiếc xe máy thêm một ít vào không khí.',
        contentFr: 'Brûler de l’essence rejette aussi du **dioxyde de carbone**. Chaque moto en ajoute un peu dans l’air.',
        caption: 'Motorbikes in Hà Nội.',
        captionVn: 'Xe máy ở Hà Nội.',
        captionFr: 'Des motos à Hà Nội.',
      },
    ],
  },

  // 17 ─ Pure: the English check + CHECK ─────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Pure',
    titleVn: 'Tinh khiết',
    titleFr: 'Pur',
    text: 'On a water bottle, **pure** just means clean.',
    textVn: 'Trên chai nước, **pure** (tinh khiết) chỉ có nghĩa là sạch.',
    textFr: 'Sur une bouteille d’eau, **pure** veut juste dire propre.',
    sub: 'In science, **pure** means something much stricter.',
    subVn: 'Trong khoa học, **pure** có nghĩa chặt chẽ hơn nhiều.',
    subFr: 'En sciences, **pur** veut dire quelque chose de bien plus strict.',
    notes: [
      keyWord(
        '**Pure:** contains only **one** substance. Pure water is only water.',
        '**Tinh khiết (pure):** chỉ chứa **một** chất. Nước tinh khiết chỉ có nước.',
        '**Pur (pure) :** ne contient qu’**une seule** substance. L’eau pure, c’est seulement de l’eau.',
      ),
    ],
    check: {
      id: 'chk_pure_meaning',
      q: 'A bottle says PURE DRINKING WATER. What does pure mean in science?',
      qVn: 'Một chai ghi NƯỚC UỐNG TINH KHIẾT. Trong khoa học, tinh khiết nghĩa là gì?',
      qFr: 'Une bouteille dit PURE DRINKING WATER (eau potable pure). Que veut dire pur en sciences ?',
      options: [
        { val: 'A', text: 'Clean and safe to drink', textVn: 'Sạch và an toàn để uống', textFr: 'Propre et bonne à boire' },
        { val: 'B', text: 'Only one substance is in it', textVn: 'Chỉ có một chất trong đó', textFr: 'Il n’y a qu’une seule substance dedans' },
        { val: 'C', text: 'It came from a mountain spring', textVn: 'Nó đến từ một con suối trên núi', textFr: 'Elle vient d’une source de montagne' },
        { val: 'D', text: 'It has healthy minerals in it', textVn: 'Nó có khoáng chất tốt cho sức khỏe', textFr: 'Elle contient des minéraux bons pour la santé' },
      ],
      correct: 'B',
      expEn: 'In science, **pure = one substance**. "Clean" (A) is the everyday meaning on the label — clean water can still have minerals dissolved in it. Where it came from (C) does not matter, and water with minerals in it (D) is a mixture, so it is **not** pure.',
      expVn: 'Trong khoa học, **tinh khiết = một chất**. "Sạch" (A) là nghĩa đời thường trên nhãn — nước sạch vẫn có thể có khoáng chất hòa tan. Nguồn gốc (C) không quan trọng, và nước có khoáng chất (D) là hỗn hợp, nên **không** tinh khiết.',
      expFr: 'En sciences, **pur = une seule substance**. « Propre » (A), c’est le sens de tous les jours sur l’étiquette — une eau propre peut quand même contenir des minéraux dissous. D’où elle vient (C) ne compte pas, et une eau qui contient des minéraux (D) est un mélange, donc elle n’est **pas** pure.',
    },
  },

  // 18 ─ Mineral water + book question 4 + CHECK ─────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: 'Key word · Learner’s Book, page 68',
    eyebrowVn: 'Từ khóa · Sách học sinh, trang 68',
    eyebrowFr: 'Mot clé · Livre de l’élève, page 68',
    title: 'Mineral Water',
    titleVn: 'Nước khoáng',
    titleFr: 'Eau minérale',
    ratio: 45,
    inlineSvg: DIAGRAMS.MINERAL_LABEL,
    content:
      'The label lists what is **dissolved** in the water, in milligrams per litre (mg/l). The bigger the number, the more there is.\n\n' +
      '> **4.** List the **three** most abundant minerals. (most abundant = the most)',
    contentVn:
      'Nhãn liệt kê những chất **hòa tan** trong nước, tính bằng miligam mỗi lít (mg/l). Số càng lớn thì chất đó càng nhiều.\n\n' +
      '> **4.** Kể tên **ba** khoáng chất có nhiều nhất. (most abundant = nhiều nhất)',
    contentFr: 'L’étiquette donne ce qui est **dissous** dans l’eau, en milligrammes par litre (mg/l). Plus le nombre est grand, plus il y en a.\n\n> **4.** Nomme les **trois** minéraux les plus abondants. (most abundant = le plus abondant)',
    notes: [
      keyWord(
        '**Mineral:** a natural substance from rocks. Mineral water is a mixture: water and minerals.',
        '**Khoáng chất (mineral):** một chất tự nhiên từ đất đá. Nước khoáng là hỗn hợp: nước và khoáng chất.',
        '**Minéral (mineral) :** une substance naturelle qui vient des roches. L’eau minérale est un mélange : de l’eau et des minéraux.',
      ),
    ],
    check: {
      id: 'chk_mineral_top3',
      q: 'Question 4: read the label. Which are the three most abundant minerals?',
      qVn: 'Câu 4: đọc nhãn. Ba khoáng chất nào có nhiều nhất?',
      qFr: 'Question 4 : lis l’étiquette. Quels sont les trois minéraux les plus abondants ?',
      options: [
        { val: 'A', text: 'calcium, magnesium, potassium', textVn: 'canxi, magie, kali (calcium, magnesium, potassium)', textFr: 'calcium, magnésium, potassium' },
        { val: 'B', text: 'sulphate, nitrate, iron', textVn: 'sunfat, nitrat, sắt (sulphate, nitrate, iron)', textFr: 'sulfate, nitrate, fer' },
        { val: 'C', text: 'nitrate, iron, aluminium', textVn: 'nitrat, sắt, nhôm (nitrate, iron, aluminium)', textFr: 'nitrate, fer, aluminium' },
        { val: 'D', text: 'bicarbonate, calcium, chloride', textVn: 'bicacbonat, canxi, clorua (bicarbonate, calcium, chloride)', textFr: 'bicarbonate, calcium, chloride' },
      ],
      correct: 'D',
      expEn: '**Bicarbonate (248), calcium (55) and chloride (37)** have the biggest numbers. A is just the first three lines of the label — the order on a label is not the order of amount. C has the smallest amounts, and B mixes small ones.',
      expVn: '**Bicacbonat (248), canxi (55) và clorua (37)** có số lớn nhất. A chỉ là ba dòng đầu của nhãn — thứ tự trên nhãn không phải thứ tự theo lượng. C có lượng nhỏ nhất, còn B là các chất có lượng nhỏ.',
      expFr: '**Bicarbonate (248), calcium (55) et chloride (37)** ont les plus grands nombres. A, ce sont juste les trois premières lignes de l’étiquette — l’ordre sur une étiquette n’est pas l’ordre des quantités. C a les plus petites quantités, et B mélange des petites.',
    },
  },

  // 19 ─ PREDICT: is tap water pure? ─────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Droplets',
    eyebrow: 'Predict first',
    eyebrowVn: 'Dự đoán trước',
    eyebrowFr: 'Prédis d’abord',
    title: 'Is Tap Water Pure?',
    titleVn: 'Nước máy có tinh khiết không?',
    titleFr: 'L’eau du robinet est-elle pure ?',
    label: 'Predict',
    labelVn: 'Dự đoán',
    labelFr: 'Prédis',
    labelIcon: 'Sparkles',
    text: 'Water from the tap looks clear, with nothing in it.',
    textVn: 'Nước từ vòi trông trong suốt, không có gì trong đó.',
    textFr: 'L’eau du robinet a l’air limpide, sans rien dedans.',
    sub: 'Is tap water **pure**, or a **mixture**?',
    subVn: 'Nước máy **tinh khiết**, hay là **hỗn hợp**?',
    subFr: 'L’eau du robinet est-elle **pure**, ou un **mélange** ?',
    activity: {
      id: 'act_predict_tap',
      type: 'predict',
      prompt: 'Tap water: pure, or a mixture?',
      promptVn: 'Nước máy: tinh khiết, hay hỗn hợp?',
      promptFr: 'L’eau du robinet : pure, ou un mélange ?',
      options: [
        { val: 'pure', name: 'Pure — it is only water', nameVn: 'Tinh khiết — nó chỉ có nước', nameFr: 'Pure — ce n’est que de l’eau' },
        { val: 'mixture', name: 'A mixture — something else is in it', nameVn: 'Hỗn hợp — có chất khác trong đó', nameFr: 'Un mélange — il y a autre chose dedans' },
      ],
      correct: 'mixture',
      explain: '**A mixture.** On its way to the tap the water flowed through rocks, and minerals **dissolved** in it. You cannot see them — but boil the water away and they are left behind. The next two slides show how.',
      explainVn: '**Hỗn hợp.** Trên đường đến vòi, nước chảy qua đất đá, và khoáng chất **hòa tan** vào nó. Em không nhìn thấy chúng — nhưng đun cho nước bay hơi hết thì chúng còn lại. Hai slide sau cho thấy cách làm.',
      explainFr: '**Un mélange.** Sur le chemin du robinet, l’eau a coulé à travers des roches, et des minéraux s’y sont **dissous**. Tu ne peux pas les voir — mais fais évaporer l’eau et ils restent. Les deux diapos suivantes montrent comment.',
    },
  },

  // 20 ─ Evaporating basin ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Beaker',
    eyebrow: 'Key word · how to find out',
    eyebrowVn: 'Từ khóa · cách tìm ra câu trả lời',
    eyebrowFr: 'Mot clé · comment le savoir',
    title: 'Evaporating Basin',
    titleVn: 'Bát cô cạn',
    titleFr: 'Capsule d’évaporation',
    ratio: 45,
    image: img('basin.jpg'),
    content:
      'Pour tap water into an **evaporating basin** and heat it until all the water has evaporated.\n\n' +
      'If the water were pure, the basin would be **empty** at the end. Is anything **left**?',
    contentVn:
      'Rót nước máy vào **bát cô cạn** và đun cho đến khi nước bay hơi hết.\n\n' +
      'Nếu nước tinh khiết thì cuối cùng bát sẽ **trống không**. Có gì **còn lại** không?',
    contentFr: 'Verse de l’eau du robinet dans une **capsule d’évaporation** et chauffe-la jusqu’à ce que toute l’eau se soit évaporée.\n\nSi l’eau était pure, la capsule serait **vide** à la fin. Reste-t-il **quelque chose** ?',
    notes: [
      keyWord(
        '**Evaporating basin:** a dish for heating a liquid until the water evaporates.',
        '**Bát cô cạn (evaporating basin):** cái bát dùng để đun chất lỏng cho đến khi nước bay hơi hết.',
        '**Capsule d’évaporation (evaporating basin) :** une coupelle pour chauffer un liquide jusqu’à ce que l’eau s’évapore.',
      ),
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        badgeFr: 'Sécurité',
        icon: 'AlertTriangle',
        text: 'Hot liquid can **spit** out of the basin. In the lab, wear **safety glasses**.',
        textVn: 'Chất lỏng nóng có thể **bắn** ra khỏi bát. Trong phòng thí nghiệm, đeo **kính bảo hộ**.',
        textFr: 'Le liquide chaud peut **gicler** hors de la capsule. Au labo, porte des **lunettes de protection**.',
      },
    ],
  },

  // 21 ─ Something is left behind + CHECK ────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The answer to your prediction',
    eyebrowVn: 'Đáp án cho dự đoán của em',
    eyebrowFr: 'La réponse à ta prédiction',
    title: 'Something Is Left Behind',
    titleVn: 'Có thứ còn lại',
    titleFr: 'Il reste quelque chose',
    ratio: 45,
    image: img('kettle.jpg'),
    content:
      '**A mixture!** When the water has gone, a **white solid** is left in the basin.\n\n' +
      'It was **dissolved** in the water. It came from the rocks.\n\n' +
      'The white crust inside an old kettle is the same thing: minerals left behind, boil after boil.',
    contentVn:
      '**Hỗn hợp!** Khi nước bay hơi hết, một **chất rắn màu trắng** còn lại trong bát.\n\n' +
      'Nó đã **hòa tan** trong nước. Nó đến từ đất đá.\n\n' +
      'Lớp cặn trắng bên trong một chiếc ấm đun nước cũ cũng chính là nó: khoáng chất còn lại, sau mỗi lần đun.',
    contentFr: '**Un mélange !** Quand l’eau est partie, un **solide blanc** reste dans la capsule.\n\nIl était **dissous** dans l’eau. Il venait des roches.\n\nLe dépôt blanc dans une vieille bouilloire, c’est la même chose : des minéraux laissés là, ébullition après ébullition.',
    check: {
      id: 'chk_solid_left',
      q: 'Why does the white solid show that tap water is a mixture?',
      qVn: 'Vì sao chất rắn màu trắng cho thấy nước máy là hỗn hợp?',
      qFr: 'Pourquoi le solide blanc montre-t-il que l’eau du robinet est un mélange ?',
      options: [
        { val: 'A', text: 'Pure water would leave nothing behind when it evaporated', textVn: 'Nước tinh khiết sẽ không để lại gì khi bay hơi', textFr: 'De l’eau pure ne laisserait rien en s’évaporant' },
        { val: 'B', text: 'Pure water always leaves a white solid', textVn: 'Nước tinh khiết luôn để lại chất rắn màu trắng', textFr: 'L’eau pure laisse toujours un solide blanc' },
        { val: 'C', text: 'The heat turned the water into a white solid', textVn: 'Nhiệt đã biến nước thành chất rắn màu trắng', textFr: 'La chaleur a transformé l’eau en solide blanc' },
        { val: 'D', text: 'The white solid is frozen water', textVn: 'Chất rắn màu trắng là nước đá', textFr: 'Le solide blanc est de l’eau gelée' },
      ],
      correct: 'A',
      expEn: 'Pure water is **only water**, so when it evaporates nothing is left. Something was left, so something else was dissolved in it: a mixture. B is false; the water became a gas, not a solid (C); and nothing freezes in a hot basin (D).',
      expVn: 'Nước tinh khiết **chỉ có nước**, nên khi bay hơi thì không còn gì. Đã có thứ còn lại, nên có chất khác hòa tan trong đó: một hỗn hợp. B sai; nước đã thành khí, không thành rắn (C); và không có gì đông đặc trong bát nóng (D).',
      expFr: 'L’eau pure, c’est **seulement de l’eau**, donc quand elle s’évapore, il ne reste rien. Il est resté quelque chose, donc autre chose y était dissous : c’est un mélange. B est faux ; l’eau est devenue un gaz, pas un solide (C) ; et rien ne gèle dans une capsule chaude (D).',
    },
  },

  // 22 ─ Book questions 1–5 + PARTICLES (pure) ───────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 69 · Think like a scientist',
    eyebrowVn: 'Sách học sinh, trang 69 · Suy nghĩ như nhà khoa học',
    eyebrowFr: 'Livre de l’élève, page 69 · Pense comme un scientifique',
    title: 'Is Water Really a Mixture?',
    titleVn: 'Nước có thật là hỗn hợp?',
    titleFr: 'L’eau, un vrai mélange ?',
    content:
      '> **1.** Use particles to explain why the water evaporated. **2.** What was left in the basin?\n' +
      '> **3.** Where did it come from? **4.** Was the water pure, or a mixture? Explain. **5.** Why wear safety glasses?\n\n' +
      'Answer them in your head, then check. Then test four boxes of particles.',
    contentVn:
      '> **1.** Dùng kiến thức về hạt để giải thích vì sao nước bay hơi. **2.** Cái gì còn lại trong bát?\n' +
      '> **3.** Nó đến từ đâu? **4.** Nước đó tinh khiết hay là hỗn hợp? Giải thích. **5.** Vì sao phải đeo kính bảo hộ?\n\n' +
      'Trả lời trong đầu, rồi kiểm tra. Sau đó thử bốn hộp hạt.',
    contentFr: '> **1.** Utilise les particules pour expliquer pourquoi l’eau s’est évaporée. **2.** Qu’est-ce qui est resté dans la capsule ?\n> **3.** D’où cela venait-il ? **4.** L’eau était-elle pure, ou un mélange ? Explique. **5.** Pourquoi porter des lunettes de protection ?\n\nRéponds dans ta tête, puis vérifie. Ensuite, teste quatre cases de particules.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**1.** Heat gives the particles energy. They move fast enough to escape as a gas. **2.** a white solid (minerals) **3.** dissolved in the water, from rocks **4.** A mixture: something else was in it. **5.** Hot liquid can spit.',
      answerVn: '**1.** Nhiệt cho các hạt năng lượng. Chúng chuyển động đủ nhanh để thoát ra thành khí. **2.** chất rắn màu trắng (khoáng chất) **3.** hòa tan trong nước, từ đất đá **4.** Hỗn hợp: có chất khác trong đó. **5.** Chất lỏng nóng có thể bắn ra.',
      answerFr: '**1.** La chaleur donne de l’énergie aux particules. Elles bougent assez vite pour s’échapper sous forme de gaz. **2.** un solide blanc (des minéraux) **3.** dissous dans l’eau, il vient des roches **4.** Un mélange : il y avait autre chose dedans. **5.** Le liquide chaud peut gicler.',
    },
    activity: {
      id: 'act_pure_boxes',
      type: 'particles',
      ask: 'pure',
      boxes: [
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'CaCl2', 'MgCl2'],
        ['O2', 'O2', 'O2', 'O2', 'O2', 'O2'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'NaCl', 'NaCl'],
      ],
      prompt: 'Pure, or a mixture? Choose under every box.',
      promptVn: 'Tinh khiết, hay hỗn hợp? Chọn dưới mỗi hộp.',
      promptFr: 'Pur, ou un mélange ? Choisis sous chaque case.',
      explain: '**Pure** means one substance. The box of water particles and the box of oxygen particles are both **pure** — an element can be pure too. Water with dissolved minerals (like tap water) and water with salt (like sea water) hold more than one substance: **mixtures**.',
      explainVn: '**Tinh khiết** nghĩa là một chất. Hộp hạt nước và hộp hạt oxi đều **tinh khiết** — nguyên tố cũng có thể tinh khiết. Nước có khoáng chất hòa tan (như nước máy) và nước có muối (như nước biển) chứa nhiều hơn một chất: **hỗn hợp**.',
      explainFr: '**Pur** veut dire une seule substance. La case de particules d’eau et la case de particules d’oxygène sont toutes les deux **pures** — un élément aussi peut être pur. L’eau avec des minéraux dissous (comme l’eau du robinet) et l’eau avec du sel (comme l’eau de mer) contiennent plus d’une substance : ce sont des **mélanges**.',
    },
  },

  // 23 ─ Mixture or compound? PARTICLES (find) ───────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Mixture or compound?',
    eyebrowVn: 'Hỗn hợp hay hợp chất?',
    eyebrowFr: 'Mélange ou composé ?',
    title: 'Find the Compounds',
    titleVn: 'Tìm các hợp chất',
    titleFr: 'Trouve les composés',
    label: 'Find it',
    labelVn: 'Tìm',
    labelFr: 'Trouve',
    labelIcon: 'Sparkles',
    text: 'Salt. Sea water. Iron sulfide. Iron and sulfur, stirred.',
    textVn: 'Muối. Nước biển. Sắt sunfua. Sắt và lưu huỳnh, khuấy đều.',
    textFr: 'Le sel. L’eau de mer. Le sulfure de fer. Le fer et le soufre, remués.',
    sub: 'Four boxes, one for each. A compound is **one** substance with **bonded** atoms.',
    subVn: 'Bốn hộp, mỗi hộp một chất. Hợp chất là **một** chất có các nguyên tử **liên kết**.',
    subFr: 'Quatre cases, une pour chacun. Un composé, c’est **une seule** substance aux atomes **liés**.',
    activity: {
      id: 'act_find_compounds',
      type: 'particles',
      ask: 'find',
      find: 'compound',
      boxes: [
        ['NaCl', 'NaCl', 'NaCl', 'NaCl', 'NaCl', 'NaCl'],
        ['H2O', 'H2O', 'H2O', 'H2O', 'H2O', 'NaCl', 'NaCl'],
        ['FeS', 'FeS', 'FeS', 'FeS', 'FeS', 'FeS'],
        ['Fe', 'S', 'Fe', 'S', 'Fe', 'S', 'Fe', 'S'],
      ],
      prompt: 'Tap every box that is a compound.',
      promptVn: 'Chạm vào mọi hộp là hợp chất.',
      promptFr: 'Touche chaque case qui est un composé.',
      explain: 'The compounds are **salt** (sodium chloride: every particle the same, sodium bonded to chlorine) and **iron sulfide** (iron bonded to sulfur). Sea water is salt **and** water, not bonded to each other, and iron with sulfur stirred is two elements side by side — both are **mixtures**.',
      explainVn: 'Các hợp chất là **muối** (natri clorua: mọi hạt giống nhau, natri liên kết với clo) và **sắt sunfua** (sắt liên kết với lưu huỳnh). Nước biển là muối **và** nước, không liên kết với nhau, còn sắt với lưu huỳnh khuấy đều là hai nguyên tố nằm cạnh nhau — cả hai đều là **hỗn hợp**.',
      explainFr: 'Les composés sont le **sel** (chlorure de sodium : toutes les particules sont pareilles, du sodium lié à du chlore) et le **sulfure de fer** (du fer lié à du soufre). L’eau de mer, c’est du sel **et** de l’eau, pas liés entre eux, et le fer remué avec du soufre, ce sont deux éléments côte à côte — ce sont tous les deux des **mélanges**.',
    },
  },

  // 24 ─ Checklist + the exit question as a CHECK ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowVn: 'Trước khi tiếp tục',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **Particle Lab** — new boxes of particles every time you play.',
    contentVn: 'Tiếp theo: Từ vựng, rồi **Phòng thí nghiệm hạt** — mỗi lần chơi là những hộp hạt mới.',
    contentFr: 'Ensuite : le vocabulaire, puis le **Labo des particules** — de nouvelles cases de particules à chaque partie.',
    items: [
      { text: 'Tell a **compound** from a **mixture**, from its particles.', textVn: 'Phân biệt **hợp chất** với **hỗn hợp** qua các hạt của nó.', textFr: 'Distingue un **composé** d’un **mélange** grâce à ses particules.' },
      { text: 'Explain the **difference**: bonded or not, new properties or the same, hard or easy to separate.', textVn: 'Giải thích **sự khác nhau**: có liên kết hay không, tính chất mới hay giữ nguyên, khó hay dễ tách.', textFr: 'Explique la **différence** : liés ou non, nouvelles propriétés ou les mêmes, difficile ou facile à séparer.' },
      { text: 'Give **examples** of mixtures: air, sea water, mineral water, tap water.', textVn: 'Nêu **ví dụ** về hỗn hợp: không khí, nước biển, nước khoáng, nước máy.', textFr: 'Donne des **exemples** de mélanges : l’air, l’eau de mer, l’eau minérale, l’eau du robinet.' },
      { text: 'Say what **pure** means in science, and why tap water is not pure.', textVn: 'Nói được **tinh khiết** nghĩa là gì trong khoa học, và vì sao nước máy không tinh khiết.', textFr: 'Dis ce que veut dire **pur** en sciences, et pourquoi l’eau du robinet n’est pas pure.' },
      { text: 'Read the **composition** of air: 78% nitrogen, 21% oxygen, 1% other gases.', textVn: 'Đọc **thành phần** không khí: 78% nitơ, 21% oxi, 1% các khí khác.', textFr: 'Lis la **composition** de l’air : 78% d’azote, 21% d’oxygène, 1% d’autres gaz.' },
    ],
    check: {
      id: 'chk_salt_water',
      q: 'Exit question: salt water. Mixture or compound?',
      qVn: 'Câu hỏi cuối bài: nước muối. Hỗn hợp hay hợp chất?',
      qFr: 'Question de sortie : l’eau salée. Mélange ou composé ?',
      options: [
        { val: 'A', text: 'A compound — the salt and water are bonded', textVn: 'Hợp chất — muối và nước liên kết với nhau', textFr: 'Un composé — le sel et l’eau sont liés' },
        { val: 'B', text: 'An element — it is mostly water', textVn: 'Nguyên tố — nó chủ yếu là nước', textFr: 'Un élément — c’est surtout de l’eau' },
        { val: 'C', text: 'A mixture — salt and water are not bonded, and boiling the water away gives the salt back', textVn: 'Hỗn hợp — muối và nước không liên kết, và đun cho nước bay hơi hết thì lấy lại được muối', textFr: 'Un mélange — le sel et l’eau ne sont pas liés, et faire évaporer l’eau rend le sel' },
        { val: 'D', text: 'A compound — it tastes different from pure water', textVn: 'Hợp chất — nó có vị khác nước tinh khiết', textFr: 'Un composé — il a un autre goût que l’eau pure' },
      ],
      correct: 'C',
      expEn: 'Salt water is a **mixture**: the salt is dissolved, not bonded, and evaporating the water leaves the salt behind — easy to separate. A and D mistake a mixture for a compound (a taste is not a bond), and water is itself a compound, never an element (B).',
      expVn: 'Nước muối là **hỗn hợp**: muối hòa tan, không liên kết, và làm bay hơi nước thì muối còn lại — dễ tách ra. A và D nhầm hỗn hợp với hợp chất (vị không phải liên kết), còn nước tự nó là hợp chất, không bao giờ là nguyên tố (B).',
      expFr: 'L’eau salée est un **mélange** : le sel est dissous, pas lié, et évaporer l’eau laisse le sel — c’est facile à séparer. A et D prennent un mélange pour un composé (un goût n’est pas une liaison), et l’eau est elle-même un composé, jamais un élément (B).',
    },
  },
];
