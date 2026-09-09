// src/data/PRIMARY_TECH/T04/pointIt.js
// T4 Saving Your Work — "Find It" (POINT_IT, 15 XP).
//
// One picture, five prompts, all on the Save As dialog. Find It is smaller in
// this unit than in T1 and T7 because Try It carries the doing here — the point
// of pointing at the dialog is to name its two questions before the simulator
// asks them for real.
import { DIAGRAMS } from './diagrams.js';

export const pointIt = [
  {
    id: 'save-as-dialog',
    title: 'The Save As box',
    titleVn: 'Hộp thoại Save As',
    svg: DIAGRAMS.SAVE_AS_DIALOG,
    viewBox: '0 0 640 420',
    regions: [
      {
        id: 'dialog', rect: [60, 50, 520, 320],
        label: 'the Save As box', labelVn: 'hộp thoại Save As',
        misfire: 'That is the box itself. The question is about one of the things inside it.',
        misfireVn: 'Đó là chính hộp thoại. Câu hỏi đang hỏi về một thứ bên trong nó.',
      },
      {
        id: 'nameBox', rect: [88, 136, 464, 44],
        label: 'the file name box', labelVn: 'ô tên tệp',
        misfire: 'That is where the NAME goes. It decides what the file is called, not where it is kept.',
        misfireVn: 'Đó là chỗ nhập TÊN. Nó quyết định tệp tên gì, không phải tệp được cất ở đâu.',
      },
      {
        id: 'folderDocs', rect: [88, 222, 150, 40],
        label: 'the Documents folder', labelVn: 'thư mục Documents',
      },
      {
        id: 'folderDownloads', rect: [250, 222, 140, 40],
        label: 'the Downloads folder', labelVn: 'thư mục Downloads',
        misfire: 'Downloads is where the browser drops things you fetch from the internet. Your own work does not belong there.',
        misfireVn: 'Downloads là nơi trình duyệt thả những thứ em tải từ internet về. Bài làm của chính em không thuộc về đó.',
      },
      {
        id: 'folderDesktop', rect: [402, 222, 120, 40],
        label: 'the Desktop folder', labelVn: 'thư mục Desktop',
      },
      {
        id: 'saveBtn', rect: [428, 300, 124, 44],
        label: 'the Save button', labelVn: 'nút Save',
      },
      {
        id: 'cancelBtn', rect: [300, 300, 110, 44],
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
];
