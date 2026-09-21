// src/data/PRIMARY_TECH/T01/pointIt.js
// T1 Starting and Stopping — "Find It" (POINT_IT, 10 XP).
//
// Two pictures, ten prompts. Item shape and the rules behind it are in
// src/tasks/PointIt.jsx; the mark comes from which region the click lands in, so
// there is no answer key here beyond each prompt's `target`.
//
// The prompts deliberately ask by DESCRIPTION, never by name — "the part of the
// screen that tells you the time", not "click the clock". Reading the word off
// the button is not the skill; knowing which button does the job is.
//
// Every control on the picture is a region, so a wrong click is answered by
// NAME. A region's `misfire` is shown whenever that region is clicked for the
// wrong prompt, so it says what the thing IS and DOES — never "the question is
// asking about…", which is only true for one prompt of five.
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
        misfire: 'That is the desktop — the empty background everything sits on.',
        misfireVn: 'Đó là màn hình nền — phần nền trống mà mọi thứ nằm trên đó.',
      },
      {
        id: 'taskbar', rect: [4, 440, 792, 52],
        label: 'the taskbar', labelVn: 'thanh tác vụ',
        misfire: 'That is the taskbar, the bar along the bottom. Look for one particular thing on it.',
        misfireVn: 'Đó là thanh tác vụ, thanh chạy dọc phía dưới. Hãy tìm một thứ cụ thể trên đó.',
      },
      {
        id: 'menu', rect: [20, 452, 40, 28],
        label: 'the menu button', labelVn: 'nút trình đơn',
        misfire: 'That is the menu button. It opens the list of all your apps — and the Power choices.',
        misfireVn: 'Đó là nút trình đơn. Nó mở danh sách tất cả ứng dụng — và các lựa chọn Nguồn.',
      },
      {
        id: 'notes-btn', rect: [76, 452, 40, 28],
        label: 'the Notes window’s button on the taskbar', labelVn: 'nút của cửa sổ Notes trên thanh tác vụ',
        misfire: 'That button belongs to the open Notes window. It brings the window back when it is hidden.',
        misfireVn: 'Nút đó thuộc về cửa sổ Notes đang mở. Nó đưa cửa sổ trở lại khi cửa sổ bị giấu đi.',
      },
      {
        id: 'files-btn', rect: [124, 452, 40, 28],
        label: 'Files, on the taskbar', labelVn: 'Files, trên thanh tác vụ',
        misfire: 'That opens Files — one program. The list of ALL your apps opens from the button at the very left end.',
        misfireVn: 'Nút đó mở Files — một chương trình. Danh sách TẤT CẢ ứng dụng mở ra từ nút ở tận đầu bên trái.',
      },
      {
        id: 'search', rect: [180, 450, 200, 32],
        label: 'the search box', labelVn: 'ô tìm kiếm',
        misfire: 'That is the search box. It finds things by name when you type.',
        misfireVn: 'Đó là ô tìm kiếm. Nó tìm đồ vật theo tên khi em gõ.',
      },
      {
        id: 'wifi', rect: [640, 452, 56, 28],
        label: 'the wifi symbol', labelVn: 'biểu tượng wifi',
        misfire: 'That is the wifi symbol. It shows whether the computer is connected to the internet.',
        misfireVn: 'Đó là biểu tượng wifi. Nó cho biết máy tính có kết nối internet hay không.',
      },
      {
        id: 'clock', rect: [716, 444, 64, 44],
        label: 'the clock', labelVn: 'đồng hồ',
        misfire: 'That is the clock, at the right end of the taskbar.',
        misfireVn: 'Đó là đồng hồ, ở đầu bên phải thanh tác vụ.',
      },
      {
        id: 'window', rect: [250, 90, 430, 280],
        label: 'the window', labelVn: 'cửa sổ',
        misfire: 'That is inside the window — the box your work sits in.',
        misfireVn: 'Đó là bên trong cửa sổ — cái khung chứa bài làm của em.',
      },
      {
        id: 'titlebar', rect: [252, 92, 426, 38],
        label: 'the title bar', labelVn: 'thanh tiêu đề',
        misfire: 'That is the title bar — it shows the window’s name. Its three buttons are at the right end.',
        misfireVn: 'Đó là thanh tiêu đề — nó cho biết tên cửa sổ. Ba nút của nó nằm ở đầu bên phải.',
      },
      {
        id: 'minimise', rect: [570, 101, 28, 20],
        label: 'the minimise button', labelVn: 'nút thu nhỏ',
        misfire: 'That button only hides the window down on the taskbar. The window is still open.',
        misfireVn: 'Nút đó chỉ giấu cửa sổ xuống thanh tác vụ. Cửa sổ vẫn đang mở.',
      },
      {
        id: 'maximise', rect: [604, 101, 28, 20],
        label: 'the maximise button', labelVn: 'nút phóng to',
        misfire: 'That button makes the window fill the whole screen. It does not hide or close anything.',
        misfireVn: 'Nút đó cho cửa sổ chiếm đầy màn hình. Nó không giấu hay đóng thứ gì cả.',
      },
      {
        id: 'close', rect: [638, 101, 28, 20],
        label: 'the close button', labelVn: 'nút đóng',
        misfire: 'That is the close button — it shuts the window for good. Save your work before you press it.',
        misfireVn: 'Đó là nút đóng — nó đóng hẳn cửa sổ. Hãy lưu bài trước khi bấm nút này.',
      },
      {
        id: 'icon', rect: [40, 40, 72, 72],
        label: 'an icon', labelVn: 'một biểu tượng',
        misfire: 'That is an icon — a little picture you double-click to open something.',
        misfireVn: 'Đó là một biểu tượng — hình nhỏ em bấm đúp để mở một thứ gì đó.',
      },
    ],
    prompts: [
      {
        ask: 'Click the part of the screen that tells you the time.',
        askVn: 'Bấm vào phần màn hình cho em biết giờ.',
        target: 'clock',
      },
      {
        ask: 'Click the button that opens the list of all your apps.',
        askVn: 'Bấm vào nút mở danh sách tất cả ứng dụng.',
        target: 'menu',
      },
      {
        ask: 'Click the button that hides this window on the taskbar, but keeps it open.',
        askVn: 'Bấm vào nút giấu cửa sổ này xuống thanh tác vụ, nhưng vẫn giữ nó mở.',
        target: 'minimise',
      },
      {
        ask: 'Click the button that would close this window completely.',
        askVn: 'Bấm vào nút sẽ đóng hẳn cửa sổ này.',
        target: 'close',
      },
      {
        ask: 'Click one of the little pictures you double-click to open something.',
        askVn: 'Bấm vào một trong những hình nhỏ em bấm đúp để mở thứ gì đó.',
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
        misfire: 'Shut down closes everything and turns the computer all the way off — the proper way to stop it.',
        misfireVn: 'Tắt máy đóng mọi thứ và tắt máy hoàn toàn — cách dừng máy đúng đắn.',
      },
      {
        id: 'menu-btn', rect: [36, 376, 40, 26],
        label: 'the menu button', labelVn: 'nút trình đơn',
        misfire: 'That is the menu button. The menu is already open above it.',
        misfireVn: 'Đó là nút trình đơn. Trình đơn đã mở sẵn ở phía trên nó rồi.',
      },
      {
        id: 'power-hardware', rect: [604, 456, 56, 34],
        label: 'the power button on the case', labelVn: 'nút nguồn trên thân máy',
        misfire: 'That is the power button on the machine itself. A short press is fine; HOLDING it is the emergency brake.',
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
        ask: 'Click the button you should only HOLD down when the computer has frozen and nothing answers.',
        askVn: 'Bấm vào nút mà em chỉ nên GIỮ khi máy bị treo và không còn gì phản hồi.',
        target: 'power-hardware',
      },
    ],
  },
];
