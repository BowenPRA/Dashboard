// Dev-only harness for the Year 7 number engines (Maths 3.1, 3.2): Bus Stop,
// Slide the Digits and Quick Fire mounted on sample pools, without auth or a
// unit. Entry point: preview-number.html, `?task=div|shift|fire|round|ineq|ineqfire` (default div),
// `?from=N` starts at item N. Not part of the production build.
import { createRoot } from 'react-dom/client';
import './index.css';
import ShortDivision from './tasks/ShortDivision.jsx';
import PlaceShift from './tasks/PlaceShift.jsx';
import QuickFire from './tasks/QuickFire.jsx';
import InequalityLine from './tasks/InequalityLine.jsx';

const params = new URLSearchParams(window.location.search);
const TASK = params.get('task') || 'div';
const FROM = Math.max(1, Number(params.get('from')) || 1);

const DIV = {
  title: 'Bus Stop', titleVn: 'Chia ngắn',
  intro: 'Digit on top, remainder up-left of the next digit.', introVn: 'Chữ số ở trên, số dư ở phía trên bên trái chữ số tiếp theo.',
  levels: {
    1: { en: 'Carry the remainder', vn: 'Nhớ số dư' }, 2: { en: 'The point is given', vn: 'Đã có dấu thập phân' },
    3: { en: 'Add zeros until it stops', vn: 'Thêm số 0 cho đến khi hết' }, 4: { en: 'One place further, then round', vn: 'Thêm một cột, rồi làm tròn' },
    5: { en: 'Keep the zero', vn: 'Giữ lại số 0' },
  },
  items: [
    { id: 'd1', level: 1, dividend: '936', divisor: 4 },
    { id: 'd2', level: 2, dividend: '9.35', divisor: 5 },
    { id: 'd3', level: 3, dividend: '47', divisor: 4 },
    { id: 'd4', level: 3, dividend: '3', divisor: 8 },
    { id: 'd5', level: 4, dividend: '58', divisor: 7, dp: 3 },
    { id: 'd6', level: 5, dividend: '62.7', divisor: 7, dp: 1, context: 'A 62.7 m rope is cut into 7 equal pieces.', contextVn: 'Một sợi dây dài 62.7 m được cắt thành 7 đoạn bằng nhau.' },
    { id: 'd7', level: 5, dividend: '100', divisor: 12, dp: 2 },
  ],
};
const SHIFT = {
  title: 'Slide the Digits', titleVn: 'Dịch chữ số',
  intro: 'The digits move. The point does not.', introVn: 'Chữ số dịch chuyển. Dấu thập phân thì không.',
  levels: {
    1: { en: 'Multiply', vn: 'Nhân' }, 2: { en: 'Divide', vn: 'Chia' }, 3: { en: 'Find the power', vn: 'Tìm số mũ' },
    4: { en: 'Metric mass', vn: 'Khối lượng' }, 5: { en: 'Chains', vn: 'Dịch nhiều lần' },
  },
  items: [
    { id: 's1', level: 1, n: '7.2', op: '×', p: 3 },
    { id: 's2', level: 1, n: '0.09', op: '×', p: 2 },
    { id: 's3', level: 2, n: '520', op: '÷', p: 4 },
    { id: 's4', level: 2, n: '7000', op: '÷', p: 2 },
    { id: 's5', level: 3, kind: 'power', n: '6.1', op: '×', result: '61000' },
    { id: 's6', level: 4, kind: 'convert', n: '4', from: 'kg', to: 'mg' },
    { id: 's7', level: 4, kind: 'convert', n: '350', from: 'g', to: 'kg' },
    { id: 's8', level: 5, kind: 'chain', n: '5', ops: [['×', 4], ['÷', 2], ['×', 3]], context: 'Mr Bowen keeps going.', contextVn: 'Thầy Bowen làm tiếp.' },
  ],
};
const INEQ = {
  title: 'Show It', titleVn: 'Biểu diễn trên trục số',
  intro: 'The circle first, then the arrow.', introVn: 'Vòng tròn trước, rồi đến mũi tên.',
  levels: { 1: { en: 'Draw it', vn: 'Vẽ' }, 2: { en: 'Read it', vn: 'Đọc' }, 3: { en: 'Negatives', vn: 'Số âm' }, 4: { en: 'Words', vn: 'Lời văn' }, 5: { en: 'Between', vn: 'Ở giữa' } },
  items: [
    { id: 'i1', level: 1, kind: 'draw', ineq: 'x > 3' },
    { id: 'i2', level: 2, kind: 'read', ineq: 'x < 4' },
    { id: 'i3', level: 3, kind: 'draw', ineq: 't < −2' },
    { id: 'i4', level: 3, kind: 'draw', ineq: 'p > 2.5' },
    { id: 'i5', level: 4, kind: 'words', ineq: 't < 0', phrase: 'below' },
    { id: 'i6', level: 4, kind: 'words', ineq: 'a < 18', context: 'You must be under 18 to enter. Use a for the age.', contextVn: 'Em phải dưới 18 tuổi mới được vào. Dùng a cho số tuổi.' },
    { id: 'i7', level: 5, kind: 'between', ineqs: ['s > 20', 's < 24'] },
    { id: 'i8', level: 5, kind: 'between', ineqs: ['c < 1', 'c > −1'], context: 'Mr Bowen has fewer than 1 cat. He has more than −1 cats.', contextVn: 'Thầy Bowen có ít hơn 1 con mèo. Thầy có nhiều hơn −1 con mèo.' },
    { id: 'i9', level: 5, kind: 'between', ineqs: ['n > 7', 'n < 8'] },
  ],
};
const FIRE = {
  div: null,
  fire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['shift', 'power', 'mass'], rounds: 8 },
  round: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['round'], rounds: 8 },
  ineqfire: { title: 'Quick Fire', titleVn: 'Hỏi nhanh', modes: ['compare', 'couldbe', 'integer'], rounds: 9 },
};

const saved = (pool) => Object.fromEntries((pool.items || []).slice(0, FROM - 1).map((it) => [it.id, 1]));
const common = {
  onComplete: (score, blob, log) => console.log('[harness] complete', score, blob, log),
  onProgress: (score, blob, log) => console.log('[harness] progress', score, blob, log),
  onQuit: () => console.log('[harness] quit'),
};

function Harness() {
  if (TASK === 'shift') return <PlaceShift pool={SHIFT} savedData={saved(SHIFT)} {...common} />;
  if (TASK === 'fire' || TASK === 'round' || TASK === 'ineqfire') return <QuickFire pool={FIRE[TASK]} {...common} />;
  if (TASK === 'ineq') return <InequalityLine pool={INEQ} savedData={saved(INEQ)} {...common} />;
  return <ShortDivision pool={DIV} savedData={saved(DIV)} {...common} />;
}

const el = document.getElementById('root');
const root = (window.__numberroot ||= createRoot(el));
root.render(<Harness />);
