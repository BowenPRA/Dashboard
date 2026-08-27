// Dev-only harness for the Number Gym drill (NumberDrill.jsx), mounted straight
// from a sample ladder so it can be checked without Supabase auth. Entry point:
// preview-drill.html. Not part of the production build.
import { createRoot } from 'react-dom/client';
import './index.css';
import NumberDrill from './tasks/NumberDrill';

// Two ladders so both drill modes can be smoke-tested. Pick with ?mode=addsub.
const MULT = {
  mode: 'long-mult',
  title: 'Two-Digit Multiplication', titleVn: 'Nhân số có hai chữ số',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[23, 12], [31, 21], [42, 13]] },
    { level: 'Carries', levelVn: 'Có nhớ', items: [[47, 26], [68, 34], [59, 47]] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[236, 47], [418, 65]] },
  ],
};

const ADDSUB = {
  mode: 'column-add-sub',
  title: 'Column Add & Subtract', titleVn: 'Cộng & Trừ theo cột',
  ladder: [
    { level: 'Warm-up', levelVn: 'Khởi động', items: [[24, 13, '+'], [46, 32, '-'], [35, 24, '+']] },
    { level: 'Regroup', levelVn: 'Có nhớ / mượn', items: [[47, 28, '+'], [63, 45, '-'], [72, 59, '-']] },
    { level: 'Stretch', levelVn: 'Nâng cao', items: [[268, 47, '+'], [402, 158, '-']] },
  ],
};

function Harness() {
  const params = new URLSearchParams(window.location.search);
  const DRILL = params.get('mode') === 'addsub' ? ADDSUB : MULT;
  return (
    <NumberDrill
      pool={DRILL}
      onComplete={(score, _b, log) => { console.log('drill complete, raw/10 =', score, log); }}
      onQuit={() => console.log('quit')}
    />
  );
}

createRoot(document.getElementById('root')).render(<Harness />);
