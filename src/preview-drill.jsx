// Dev-only harness for the Number Gym drill (NumberDrill.jsx), mounted straight
// from a sample ladder so it can be checked without Supabase auth. Entry point:
// preview-drill.html. Not part of the production build.
import { createRoot } from 'react-dom/client';
import './index.css';
import NumberDrill from './tasks/NumberDrill';

// The 1.2 plan ladder (§5.4): operands only, three rungs.
const DRILL = {
  mode: 'long-mult',
  title: 'Two-Digit Multiplication', titleVn: 'Nhân số có hai chữ số',
  intro: 'Fill in one box at a time. The grid checks each digit as you go.',
  introVn: 'Điền từng ô một. Lưới sẽ kiểm tra từng chữ số khi em làm.',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[23, 12], [31, 21], [42, 13]] },
    { level: 'Carries', levelVn: 'Có nhớ', items: [[47, 26], [68, 34], [59, 47]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[236, 47], [418, 65]] },
  ],
};

function Harness() {
  return (
    <NumberDrill
      pool={DRILL}
      onComplete={(score, _b, log) => { console.log('drill complete, raw/10 =', score, log); }}
      onQuit={() => console.log('quit')}
    />
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
