// src/data/PRIMARY_TECH/T03/pointIt.js
// T3 Typing Properly — "Find It" (POINT_IT, 10 XP).
//
// Two pictures, ten prompts: the unit's keyboard, then a laptop from above —
// the same keys in a different case, so the student finds them on the machine
// they are more likely to have. Item shape and the rules behind it are in
// src/tasks/PointIt.jsx; the mark comes from which region the click lands in.
//
// Every prompt asks by FINGER or JOB, never by the name printed on the key —
// "the key your right middle finger rests on", not "click K". Reading a letter
// off a key is not the skill; knowing which finger owns it is.
//
// Every key is a region, read off the same KEY_LIST / LAPTOP_LIST tables the
// pictures are drawn from (diagrams.js), so a region can never drift off its
// key. A wrong click is answered by NAME and by FINGER ("That is J — the home
// key of your right index finger"), and the keys a student reliably confuses
// carry their own `misfire` — Delete for Backspace, Shift for Caps Lock, the
// palm rest for the touchpad. A misfire says what the thing IS and DOES, never
// "the question is asking about…", because it shows for every prompt.
import { DIAGRAMS, KEY_LIST, LAPTOP_LIST, ZONE } from './diagrams.js';

const FINGER_OF = {
  L4: ['your left little finger', 'ngón út tay trái'],
  L3: ['your left ring finger', 'ngón áp út tay trái'],
  L2: ['your left middle finger', 'ngón giữa tay trái'],
  L1: ['your left index finger', 'ngón trỏ tay trái'],
  R1: ['your right index finger', 'ngón trỏ tay phải'],
  R2: ['your right middle finger', 'ngón giữa tay phải'],
  R3: ['your right ring finger', 'ngón áp út tay phải'],
  R4: ['your right little finger', 'ngón út tay phải'],
};
const HOME_KEYS = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);

/** What a region is called, EN and VN, with its article ("Yes — that is the space bar."). */
const NAMED = {
  backspace: ['the Backspace key', 'phím Backspace'],
  tab: ['the Tab key', 'phím Tab'],
  caps: ['the Caps Lock key', 'phím Caps Lock'],
  enter: ['the Enter key', 'phím Enter'],
  lshift: ['the left Shift', 'phím Shift bên trái'],
  rshift: ['the right Shift', 'phím Shift bên phải'],
  lctrl: ['a Ctrl key', 'phím Ctrl'],
  rctrl: ['a Ctrl key', 'phím Ctrl'],
  lalt: ['an Alt key', 'phím Alt'],
  ralt: ['an Alt key', 'phím Alt'],
  space: ['the space bar', 'phím cách'],
  esc: ['the Esc key', 'phím Esc'],
  del: ['the Delete key', 'phím Delete'],
  fn: ['the Fn key', 'phím Fn'],
  left: ['the left arrow key', 'phím mũi tên trái'],
  right: ['the right arrow key', 'phím mũi tên phải'],
  updown: ['the up and down arrow keys', 'phím mũi tên lên và xuống'],
};

/** The legend a key shows (K, ;, F5) — for the "That is …" of a misfire. */
const legendOf = (k) => (k.main ? k.main.toUpperCase() : k.id.toUpperCase());

/** A key's region: its rectangle, its name, and a misfire that names the finger that owns it. */
function keyRegion(k, own = {}) {
  const [label, labelVn] = NAMED[k.id] || [`the ${legendOf(k)} key`, `phím ${legendOf(k)}`];
  const z = ZONE[k.id];
  let misfire = null;
  if (own[k.id]) misfire = own[k.id];
  else if (/^f\d+$/.test(k.id)) {
    misfire = [`That is ${k.id.toUpperCase()}, one of the function keys along the top. Each does a special job, like changing the brightness — none of them types a letter.`, `Đó là phím ${k.id.toUpperCase()}, một phím chức năng ở hàng trên cùng. Mỗi phím làm một việc đặc biệt, như chỉnh độ sáng — không phím nào gõ ra chữ.`];
  } else if (z && z !== 'T' && k.main) {
    const [fEn, fVn] = FINGER_OF[z];
    misfire = HOME_KEYS.has(k.id)
      ? [`That is ${legendOf(k)} — the home key of ${fEn}.`, `Đó là phím ${legendOf(k)} — phím cơ sở của ${fVn}.`]
      : [`That is ${legendOf(k)} — ${fEn} reaches out to it.`, `Đó là phím ${legendOf(k)} — ${fVn} với tới phím này.`];
  }
  return {
    id: k.id,
    rect: [k.x, k.y, k.w, k.h],
    label,
    labelVn,
    ...(misfire ? { misfire: misfire[0], misfireVn: misfire[1] } : {}),
  };
}

/** The confusions both pictures share. */
const SHARED_MISFIRES = {
  space: ['That is the space bar — both thumbs rest on it, and a tap makes a space between words.', 'Đó là phím cách — hai ngón cái đặt trên nó, chạm một cái là có dấu cách giữa các từ.'],
  lshift: ['That is the left Shift. Your left little finger holds it down for ONE capital typed by the right hand.', 'Đó là phím Shift bên trái. Ngón út tay trái giữ nó để gõ MỘT chữ in hoa bằng tay phải.'],
  rshift: ['That is the right Shift. Your right little finger holds it down for ONE capital typed by the left hand.', 'Đó là phím Shift bên phải. Ngón út tay phải giữ nó để gõ MỘT chữ in hoa bằng tay trái.'],
  caps: ['That is Caps Lock. It makes EVERY letter a capital until you press it again — for one capital, hold Shift instead.', 'Đó là phím Caps Lock. Nó làm MỌI chữ thành chữ in hoa cho đến khi em bấm lại — muốn một chữ in hoa thì giữ Shift.'],
  tab: ['That is Tab. Your left little finger reaches up to it, and it jumps the cursor forward to the next box.', 'Đó là phím Tab. Ngón út tay trái với lên nó, và nó đưa con trỏ nhảy tới ô tiếp theo.'],
  enter: ['That is Enter. Your right little finger reaches across to it to start a new line.', 'Đó là phím Enter. Ngón út tay phải với sang nó để xuống dòng mới.'],
  backspace: ['That is Backspace. Your right little finger reaches up to it, and it rubs out the letter just BEFORE the cursor.', 'Đó là phím Backspace. Ngón út tay phải với lên nó, và nó xoá chữ ngay TRƯỚC con trỏ.'],
  lctrl: ['That is Ctrl — a key for shortcuts like Ctrl + S, not for typing words.', 'Đó là phím Ctrl — phím dùng cho phím tắt như Ctrl + S, không dùng để gõ chữ.'],
  rctrl: ['That is Ctrl — a key for shortcuts like Ctrl + S, not for typing words.', 'Đó là phím Ctrl — phím dùng cho phím tắt như Ctrl + S, không dùng để gõ chữ.'],
  lalt: ['That is Alt — a key for shortcuts, not for typing words.', 'Đó là phím Alt — phím dùng cho phím tắt, không dùng để gõ chữ.'],
  ralt: ['That is Alt — a key for shortcuts, not for typing words.', 'Đó là phím Alt — phím dùng cho phím tắt, không dùng để gõ chữ.'],
};

export const pointIt = [
  {
    id: 'keyboard',
    title: 'A keyboard',
    titleVn: 'Một bàn phím',
    svg: DIAGRAMS.KEYBOARD,
    viewBox: '0 0 900 330',
    regions: [
      {
        id: 'frame', rect: [6, 6, 888, 318],
        label: 'the frame of the keyboard', labelVn: 'khung bàn phím',
        misfire: 'That is the keyboard’s frame, between the keys. Aim for the middle of a key.',
        misfireVn: 'Đó là khung bàn phím, nằm giữa các phím. Hãy nhắm vào giữa một phím.',
      },
      ...KEY_LIST.map((k) => keyRegion(k, SHARED_MISFIRES)),
    ],
    prompts: [
      {
        ask: 'Click the key your right middle finger rests on.',
        askVn: 'Bấm vào phím mà ngón giữa tay phải của em đặt lên.',
        target: 'k',
      },
      {
        ask: 'Click the long key your thumbs rest on.',
        askVn: 'Bấm vào phím dài mà hai ngón cái của em đặt lên.',
        target: 'space',
      },
      {
        ask: 'Your left hand is about to type a capital T. Click the key your right little finger holds down first.',
        askVn: 'Tay trái của em sắp gõ chữ T in hoa. Bấm vào phím mà ngón út tay phải giữ xuống trước.',
        target: 'rshift',
      },
      {
        ask: 'Click the key your right little finger reaches across to, to start a new line.',
        askVn: 'Bấm vào phím mà ngón út tay phải với sang để xuống dòng mới.',
        target: 'enter',
      },
      {
        ask: 'Click the key your left little finger rests on.',
        askVn: 'Bấm vào phím mà ngón út tay trái của em đặt lên.',
        target: 'a',
      },
    ],
  },
  {
    id: 'laptop',
    title: 'A laptop, from above',
    titleVn: 'Một máy tính xách tay, nhìn từ trên xuống',
    svg: DIAGRAMS.LAPTOP,
    viewBox: '0 0 960 620',
    regions: [
      {
        id: 'case', rect: [20, 14, 920, 592],
        label: 'the laptop’s case', labelVn: 'vỏ máy tính xách tay',
        misfire: 'That is the laptop’s case, not a key or the touchpad.',
        misfireVn: 'Đó là vỏ máy tính xách tay, không phải một phím hay bàn di chuột.',
      },
      {
        id: 'touchpad', rect: [356, 392, 248, 172],
        label: 'the touchpad', labelVn: 'bàn di chuột',
        misfire: 'That is the touchpad. A finger — or a palm resting on it by mistake — moves the pointer.',
        misfireVn: 'Đó là bàn di chuột. Một ngón tay — hoặc lòng bàn tay lỡ tì lên — sẽ làm con trỏ chuột di chuyển.',
      },
      {
        id: 'palmLeft', rect: [30, 380, 316, 212],
        label: 'the palm rest', labelVn: 'chỗ kê tay',
        misfire: 'That is the palm rest, beside the touchpad. It does nothing — your wrists float just above it while you type.',
        misfireVn: 'Đó là chỗ kê tay, bên cạnh bàn di chuột. Nó không làm gì cả — cổ tay em nâng nhẹ ngay phía trên nó khi gõ.',
      },
      {
        id: 'palmRight', rect: [614, 380, 316, 212],
        label: 'the palm rest', labelVn: 'chỗ kê tay',
        misfire: 'That is the palm rest, beside the touchpad. It does nothing — your wrists float just above it while you type.',
        misfireVn: 'Đó là chỗ kê tay, bên cạnh bàn di chuột. Nó không làm gì cả — cổ tay em nâng nhẹ ngay phía trên nó khi gõ.',
      },
      ...LAPTOP_LIST.map((k) => keyRegion(k, {
        ...SHARED_MISFIRES,
        del: ['That is Delete. It rubs out the letter AFTER the cursor — the key for the one before it is at the end of the number row.', 'Đó là phím Delete. Nó xoá chữ ở SAU con trỏ — phím xoá chữ ở trước con trỏ nằm ở cuối hàng số.'],
        esc: ['That is Esc — the way out of a menu or a box. It does not type anything.', 'Đó là phím Esc — lối thoát khỏi một trình đơn hay một hộp thoại. Nó không gõ ra gì cả.'],
        fn: ['That is Fn. Hold it to make the top row of keys do their special jobs.', 'Đó là phím Fn. Giữ nó để hàng phím trên cùng làm những việc đặc biệt của chúng.'],
        left: ['That is an arrow key — it moves the cursor without typing anything.', 'Đó là một phím mũi tên — nó di chuyển con trỏ mà không gõ ra gì cả.'],
        right: ['That is an arrow key — it moves the cursor without typing anything.', 'Đó là một phím mũi tên — nó di chuyển con trỏ mà không gõ ra gì cả.'],
        updown: ['Those are arrow keys — they move the cursor up and down without typing anything.', 'Đó là các phím mũi tên — chúng di chuyển con trỏ lên xuống mà không gõ ra gì cả.'],
      })),
    ],
    prompts: [
      {
        ask: 'Click the key your right index finger rests on.',
        askVn: 'Bấm vào phím mà ngón trỏ tay phải của em đặt lên.',
        target: 'j',
      },
      {
        ask: 'Click the key your right little finger reaches up to, to rub out the letter just before the cursor.',
        askVn: 'Bấm vào phím mà ngón út tay phải với lên để xoá chữ ngay trước con trỏ.',
        target: 'backspace',
      },
      {
        ask: 'Click the key that makes EVERY letter a capital until you press it again.',
        askVn: 'Bấm vào phím làm MỌI chữ thành chữ in hoa cho đến khi em bấm lại nó.',
        target: 'caps',
      },
      {
        ask: 'Click the part of the laptop that moves the pointer if your palm rests on it while you type.',
        askVn: 'Bấm vào bộ phận của máy tính xách tay sẽ làm con trỏ chuột di chuyển nếu lòng bàn tay em tì lên nó khi gõ.',
        target: 'touchpad',
      },
      {
        ask: 'Click the key your left little finger reaches up to, to jump the cursor forward to the next box.',
        askVn: 'Bấm vào phím mà ngón út tay trái với lên để đưa con trỏ nhảy tới ô tiếp theo.',
        target: 'tab',
      },
    ],
  },
];
