// src/data/PRIMARY_TECH/T01/pointIt.js
// T1 Starting and Stopping — "Find It" (POINT_IT, 25 XP).
//
// Two pictures, ten prompts. Item shape and the rules behind it are in
// src/tasks/PointIt.jsx; the mark comes from which region the click lands in, so
// there is no answer key here beyond each prompt's `target`.
//
// The prompts deliberately ask by DESCRIPTION, never by name — "the choice that
// turns the computer all the way off", not "click Shut down". Reading the word
// off the button is not the skill; knowing which button does the job is. Where
// two controls are confusable, the wrong one carries a `misfire` that names what
// it actually does, which is the whole lesson in one sentence.
import { DIAGRAMS } from './diagrams.js';

export const pointIt = [
  {
    id: 'desktop-anatomy',
    title: 'A desktop, with one window open',
    titleVn: 'Màn hình nền, với một cửa sổ đang mở',
    svg: DIAGRAMS.DESKTOP_ANATOMY,
    viewBox: '0 0 800 500',
    regions: [
      {
        id: 'desktop', rect: [4, 4, 792, 492],
        label: 'the desktop', labelVn: 'màn hình nền',
        misfire: 'That is the desktop — the empty space everything sits on. Look for the thing the question names.',
        misfireVn: 'Đó là màn hình nền — khoảng trống mà mọi thứ nằm trên đó. Hãy tìm đúng thứ mà câu hỏi nói tới.',
      },
      {
        id: 'taskbar', rect: [4, 440, 792, 52],
        label: 'the taskbar', labelVn: 'thanh tác vụ',
      },
      {
        id: 'menu', rect: [20, 452, 40, 28],
        label: 'the apps menu button', labelVn: 'nút trình đơn ứng dụng',
      },
      {
        id: 'search', rect: [180, 450, 200, 32],
        label: 'the search box', labelVn: 'ô tìm kiếm',
        misfire: 'That is the search box. It finds things by name — but the list of all your apps opens from the button at the very left end of the taskbar.',
        misfireVn: 'Đó là ô tìm kiếm. Nó tìm đồ vật theo tên — nhưng danh sách tất cả ứng dụng mở ra từ nút ở tận bên trái thanh tác vụ.',
      },
      {
        id: 'clock', rect: [716, 444, 64, 44],
        label: 'the clock', labelVn: 'đồng hồ',
      },
      {
        id: 'window', rect: [250, 90, 430, 280],
        label: 'the window', labelVn: 'cửa sổ',
        misfire: 'That is the inside of the window, where the work is. The question is asking about one of the buttons on it.',
        misfireVn: 'Đó là bên trong cửa sổ, nơi chứa bài làm. Câu hỏi đang hỏi về một trong các nút trên cửa sổ.',
      },
      {
        id: 'close', rect: [638, 101, 28, 20],
        label: 'the close button', labelVn: 'nút đóng',
        misfire: 'That is the close button — it shuts the window for good. Save your work before you press it.',
        misfireVn: 'Đó là nút đóng — nó đóng hẳn cửa sổ. Hãy lưu bài trước khi bấm nút này.',
      },
      {
        id: 'minimise', rect: [570, 101, 28, 20],
        label: 'the minimise button', labelVn: 'nút thu nhỏ',
        misfire: 'That button only hides the window down on the taskbar. The window is still open — it has not closed.',
        misfireVn: 'Nút đó chỉ giấu cửa sổ xuống thanh tác vụ. Cửa sổ vẫn đang mở — nó chưa hề đóng.',
      },
      {
        id: 'icon', rect: [40, 40, 72, 72],
        label: 'an icon', labelVn: 'biểu tượng',
      },
    ],
    prompts: [
      {
        ask: 'Click the clock.',
        askVn: 'Bấm vào đồng hồ.',
        target: 'clock',
      },
      {
        ask: 'Click the button that opens the list of all your apps.',
        askVn: 'Bấm vào nút mở danh sách tất cả ứng dụng.',
        target: 'menu',
      },
      {
        ask: 'Click the bar along the bottom that shows what is open.',
        askVn: 'Bấm vào thanh chạy dọc phía dưới, nơi cho thấy những gì đang mở.',
        target: 'taskbar',
      },
      {
        ask: 'Click the button that would close this window completely.',
        askVn: 'Bấm vào nút sẽ đóng hẳn cửa sổ này.',
        target: 'close',
      },
      {
        ask: 'Click an icon — one of the little pictures you double-click to open something.',
        askVn: 'Bấm vào một biểu tượng — một trong những hình nhỏ em bấm đúp để mở thứ gì đó.',
        target: 'icon',
      },
    ],
  },
  {
    id: 'stopping-properly',
    title: 'The power menu, and the button on the case',
    titleVn: 'Trình đơn nguồn, và nút trên thân máy',
    svg: DIAGRAMS.POWER_MENU,
    viewBox: '0 0 700 520',
    regions: [
      {
        id: 'menu-panel', rect: [36, 140, 300, 220],
        label: 'the power menu', labelVn: 'trình đơn nguồn',
        misfire: 'That is the menu itself, not one of its four choices. Click the words of the one you want.',
        misfireVn: 'Đó là chính trình đơn, không phải một trong bốn lựa chọn. Hãy bấm vào chữ của lựa chọn em muốn.',
      },
      {
        id: 'sleep', rect: [48, 182, 276, 40],
        label: 'Sleep', labelVn: 'Ngủ',
        misfire: 'Sleep only rests the computer. It wakes up in a second with everything still open — it is not off.',
        misfireVn: 'Ngủ chỉ cho máy nghỉ. Nó thức dậy trong một giây với mọi thứ vẫn đang mở — máy chưa tắt.',
      },
      {
        id: 'logout', rect: [48, 226, 276, 40],
        label: 'Log out', labelVn: 'Đăng xuất',
        misfire: 'Log out closes your account and hands the computer to the next person. The machine itself stays on.',
        misfireVn: 'Đăng xuất đóng tài khoản của em và giao máy cho người tiếp theo. Bản thân máy vẫn bật.',
      },
      {
        id: 'restart', rect: [48, 270, 276, 40],
        label: 'Restart', labelVn: 'Khởi động lại',
        misfire: 'Restart turns the computer off and straight back on by itself. You do not end up with it off.',
        misfireVn: 'Khởi động lại tắt máy rồi tự bật lên ngay. Cuối cùng máy vẫn không tắt.',
      },
      {
        id: 'shutdown', rect: [48, 314, 276, 40],
        label: 'Shut down', labelVn: 'Tắt máy',
        misfire: 'Shut down is the proper way to stop a computer — but this question is asking about the button on the case.',
        misfireVn: 'Tắt máy là cách dừng máy đúng đắn — nhưng câu hỏi này đang hỏi về nút trên thân máy.',
      },
      {
        id: 'menu-btn', rect: [36, 376, 40, 26],
        label: 'the apps menu button', labelVn: 'nút trình đơn ứng dụng',
      },
      {
        id: 'power-hardware', rect: [604, 456, 56, 34],
        label: 'the power button on the case', labelVn: 'nút nguồn trên thân máy',
        misfire: 'That is the power button on the machine itself. Pressing it is fine; HOLDING it is the emergency brake.',
        misfireVn: 'Đó là nút nguồn trên chính chiếc máy. Bấm nhẹ thì không sao; GIỮ nó mới là phanh khẩn cấp.',
      },
    ],
    prompts: [
      {
        ask: 'Click the choice that turns the computer all the way off.',
        askVn: 'Bấm vào lựa chọn tắt máy hoàn toàn.',
        target: 'shutdown',
      },
      {
        ask: 'Click the choice that rests the computer but leaves your work open.',
        askVn: 'Bấm vào lựa chọn cho máy nghỉ nhưng vẫn giữ bài làm đang mở.',
        target: 'sleep',
      },
      {
        ask: 'Your sister wants to use this computer with her own account. Click the choice you should use.',
        askVn: 'Chị của em muốn dùng máy này bằng tài khoản riêng. Bấm vào lựa chọn em nên dùng.',
        target: 'logout',
      },
      {
        ask: 'Click the choice that turns the computer off and straight back on again by itself.',
        askVn: 'Bấm vào lựa chọn tắt máy rồi tự bật lại ngay.',
        target: 'restart',
      },
      {
        ask: 'Click the button you should only hold down when the computer has frozen and nothing answers.',
        askVn: 'Bấm vào nút mà em chỉ nên giữ khi máy bị treo và không còn gì phản hồi.',
        target: 'power-hardware',
      },
    ],
  },
];
