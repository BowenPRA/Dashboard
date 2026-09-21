// src/data/PRIMARY_TECH/T04/pointIt.js
// T4 Saving Your Work — "Find It" (POINT_IT, 10 XP).
//
// Two pictures, five prompts each: the Save As box, then the file manager.
// Every prompt asks by DESCRIPTION — what the part does, or what you are
// trying to do — never by the word printed on it, because the words are on the
// screen and reading them is not the skill; knowing which one does what is.
//
// Both pictures are the deck's own drawings (SAVE_AS_DIALOG and FILE_MANAGER,
// cropped from the Label It versions), so a region here is the same rectangle
// the deck's hotspots and Label It point at. Their viewBoxes do not start at
// 0 0 — the regions below are in those same coordinates.
import { DIAGRAMS } from './diagrams.js';

export const pointIt = [
  {
    id: 'save-as-dialog',
    title: 'The Save As box',
    titleVn: 'Hộp thoại Save As',
    svg: DIAGRAMS.SAVE_AS_DIALOG,
    viewBox: '210 30 520 400',
    regions: [
      {
        id: 'dialog', rect: [230, 50, 480, 360],
        label: 'the Save As box', labelVn: 'hộp thoại Save As',
        misfire: 'That is the box itself. The question is about one of the things inside it.',
        misfireVn: 'Đó là chính hộp thoại. Câu hỏi đang hỏi về một thứ bên trong nó.',
      },
      {
        id: 'nameBox', rect: [256, 140, 428, 46],
        label: 'the file name box', labelVn: 'ô tên tệp',
        misfire: 'That is where the NAME goes. It decides what the file is called, not where it is kept.',
        misfireVn: 'Đó là chỗ nhập TÊN. Nó quyết định tệp tên gì, không phải tệp được cất ở đâu.',
      },
      {
        id: 'folderDocs', rect: [256, 232, 140, 44],
        label: 'the Documents folder', labelVn: 'thư mục Documents',
        misfire: 'Documents is the folder for your own school work.',
        misfireVn: 'Documents là thư mục dành cho bài vở của chính em.',
      },
      {
        id: 'folderDownloads', rect: [408, 232, 140, 44],
        label: 'the Downloads folder', labelVn: 'thư mục Downloads',
        misfire: 'Downloads is where the browser drops things you fetch from the internet. Your own work does not belong there — even though the computer picked it.',
        misfireVn: 'Downloads là nơi trình duyệt thả những thứ em tải từ internet về. Bài làm của chính em không thuộc về đó — dù máy tính đã tự chọn nó.',
      },
      {
        id: 'folderDesktop', rect: [560, 232, 124, 44],
        label: 'the Desktop folder', labelVn: 'thư mục Desktop',
        misfire: 'That is the Desktop — the screen itself. Handy for today, a mess by next month.',
        misfireVn: 'Đó là Desktop — chính màn hình nền. Tiện cho hôm nay, bừa bộn vào tháng sau.',
      },
      {
        id: 'saveBtn', rect: [574, 338, 110, 46],
        label: 'the Save button', labelVn: 'nút Save',
        misfire: 'Save writes the file with whatever name and folder the box shows right now.',
        misfireVn: 'Save ghi tệp xuống với đúng cái tên và thư mục mà hộp thoại đang hiện.',
      },
      {
        id: 'cancelBtn', rect: [452, 338, 110, 46],
        label: 'the Cancel button', labelVn: 'nút Cancel',
        misfire: 'Cancel closes this box and saves nothing at all. Your work would still be unsaved.',
        misfireVn: 'Cancel đóng hộp thoại này và không lưu gì cả. Bài của em vẫn sẽ chưa được lưu.',
      },
    ],
    prompts: [
      {
        ask: 'Click the box where you type what the file is called.',
        askVn: 'Bấm vào ô để em gõ tên của tệp.',
        target: 'nameBox',
      },
      {
        ask: 'Click the folder your school work should go in.',
        askVn: 'Bấm vào thư mục nên chứa bài vở của em.',
        target: 'folderDocs',
      },
      {
        ask: 'Click the button that actually saves the file.',
        askVn: 'Bấm vào nút thực sự lưu tệp lại.',
        target: 'saveBtn',
      },
      {
        ask: 'Click the button that closes this box WITHOUT saving anything.',
        askVn: 'Bấm vào nút đóng hộp thoại này mà KHÔNG lưu gì cả.',
        target: 'cancelBtn',
      },
      {
        ask: 'Your teacher says "put it on the Desktop this time". Click that folder.',
        askVn: 'Cô giáo nói "lần này để nó trên Desktop". Bấm vào thư mục đó.',
        target: 'folderDesktop',
      },
    ],
  },
  {
    id: 'file-manager',
    title: 'The file manager',
    titleVn: 'Trình quản lý tệp',
    svg: DIAGRAMS.FILE_MANAGER,
    viewBox: '210 20 520 440',
    regions: [
      {
        id: 'window', rect: [230, 40, 480, 400],
        label: 'the file manager window', labelVn: 'cửa sổ trình quản lý tệp',
        misfire: 'That is the window itself. Look for the one part of it the question describes.',
        misfireVn: 'Đó là chính cửa sổ. Hãy tìm đúng phần mà câu hỏi mô tả.',
      },
      {
        id: 'folderDocs', rect: [240, 92, 140, 36],
        label: 'the Documents folder', labelVn: 'thư mục Documents',
        misfire: 'Documents is your own work — and it is the folder open right now.',
        misfireVn: 'Documents chứa bài của chính em — và đó là thư mục đang mở.',
      },
      {
        id: 'folderDownloads', rect: [240, 134, 140, 36],
        label: 'the Downloads folder', labelVn: 'thư mục Downloads',
        misfire: 'Downloads holds things the browser fetched from the internet.',
        misfireVn: 'Downloads chứa những thứ trình duyệt tải từ internet về.',
      },
      {
        id: 'folderDesktop', rect: [240, 176, 140, 36],
        label: 'the Desktop folder', labelVn: 'thư mục Desktop',
        misfire: 'The Desktop is the screen itself.',
        misfireVn: 'Desktop là chính màn hình nền.',
      },
      {
        id: 'bin', rect: [240, 218, 140, 36],
        label: 'the Recycle Bin', labelVn: 'Recycle Bin (thùng rác)',
        misfire: 'The Recycle Bin is where deleted files wait until you put them back.',
        misfireVn: 'Recycle Bin là nơi các tệp đã xoá nằm chờ cho đến khi em lấy lại.',
      },
      {
        id: 'header', rect: [398, 92, 160, 28],
        label: 'the name of the open folder, above its files', labelVn: 'tên của thư mục đang mở, phía trên các tệp',
        misfire: 'That is the NAME of the open folder, written above its files. The folders themselves are in the list on the left.',
        misfireVn: 'Đó là TÊN của thư mục đang mở, ghi phía trên các tệp của nó. Còn các thư mục thì nằm trong danh sách bên trái.',
      },
      {
        id: 'search', rect: [566, 90, 132, 28],
        label: 'the search box', labelVn: 'ô tìm kiếm',
        misfire: 'The search box finds a file by part of its name.',
        misfireVn: 'Ô tìm kiếm tìm một tệp theo một phần tên của nó.',
      },
      {
        id: 'rowVolcano', rect: [396, 134, 304, 38],
        label: 'volcano report.docx', labelVn: 'volcano report.docx',
      },
      {
        id: 'dotsVolcano', rect: [668, 138, 28, 30],
        label: 'the ⋮ button for volcano report', labelVn: 'nút ⋮ của volcano report',
        misfire: 'That ⋮ opens the actions for volcano report: Rename, Move to, Delete.',
        misfireVn: 'Nút ⋮ đó mở các thao tác cho volcano report: Rename, Move to, Delete.',
      },
      {
        id: 'rowMaths', rect: [396, 178, 304, 38],
        label: 'maths homework.docx', labelVn: 'maths homework.docx',
      },
      {
        id: 'rowPoster', rect: [396, 222, 304, 38],
        label: 'rainforest poster.png — a picture', labelVn: 'rainforest poster.png — một tấm ảnh',
      },
      {
        id: 'rowTrip', rect: [396, 266, 304, 38],
        label: 'class trip plan.docx', labelVn: 'class trip plan.docx',
      },
    ],
    prompts: [
      {
        ask: 'You cannot remember which folder a file is in. Click where you would type part of its name.',
        askVn: 'Em không nhớ một tệp nằm trong thư mục nào. Bấm vào chỗ em sẽ gõ một phần tên của nó.',
        target: 'search',
      },
      {
        ask: 'You deleted a file by mistake. Click the place you would look for it.',
        askVn: 'Em lỡ tay xoá một tệp. Bấm vào nơi em sẽ tìm nó.',
        target: 'bin',
      },
      {
        ask: 'Click the button that opens the list of actions — rename, move, delete — for the volcano report.',
        askVn: 'Bấm vào nút mở danh sách thao tác — đổi tên, chuyển, xoá — cho bài báo cáo núi lửa.',
        target: 'dotsVolcano',
      },
      {
        ask: 'Things you fetch from the internet land in one folder. Click it.',
        askVn: 'Những thứ em tải từ internet về đều rơi vào một thư mục. Bấm vào thư mục đó.',
        target: 'folderDownloads',
      },
      {
        ask: 'In the folder list, click the folder that is open right now.',
        askVn: 'Trong danh sách thư mục, bấm vào thư mục đang được mở lúc này.',
        target: 'folderDocs',
      },
    ],
  },
];
