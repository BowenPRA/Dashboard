// src/data/ACELLUS/ALG_INEQ/intervals.js
// Number Line — draw the solution set, then write it in interval notation.
//
// Only `solution` is authored. The endpoints, the open/closed circles, the
// shading, the interval notation and every piece of feedback are DERIVED from
// it by src/utils/interval.js, so there is no answer key to get wrong, and
// `npm run validate` proves each one can actually be drawn on the line it is
// given (whole-number endpoints, inside the window).
//
// `display` overrides the statement shown above the line. The later items use
// it to show the ORIGINAL absolute value inequality — which is exactly the
// Acellus item — so the student has to solve it before they can graph it. The
// earlier items leave it off and show the solved inequality, keeping those
// about the representation rather than the algebra.
//
// Order: one ray → two rays → a squeezed middle → absolute value.
export const intervals = [
  {
    id: 'n1',
    solution: 'x > 3',
    min: -8,
    max: 8,
    prompt: 'One endpoint, and everything to one side of it.',
    promptVn: 'Một điểm mút, và tất cả những gì nằm về một phía của nó.',
  },
  {
    id: 'n2',
    solution: 'x <= -2',
    min: -8,
    max: 8,
    prompt: 'Look hard at the sign before you choose the circle.',
    promptVn: 'Hãy nhìn kỹ dấu trước khi chọn loại vòng tròn.',
  },
  {
    id: 'n3',
    solution: 'x >= -5',
    min: -8,
    max: 8,
    prompt: 'One end never stops. Which bracket does that end always take?',
    promptVn: 'Một đầu kéo dài mãi. Đầu đó luôn dùng loại ngoặc nào?',
  },
  {
    id: 'n4',
    solution: '-3 < x <= 0',
    min: -8,
    max: 8,
    prompt: 'From your Acellus screen. Two endpoints, and they are not the same kind of circle.',
    promptVn: 'Từ màn hình Acellus của em. Hai điểm mút, và hai vòng tròn không cùng loại.',
  },
  {
    id: 'n5',
    solution: '1 <= x < 6',
    min: -3,
    max: 9,
    prompt: 'A squeezed inequality is always ONE shaded piece.',
    promptVn: 'Bất phương trình bị kẹp luôn chỉ có MỘT đoạn được tô.',
  },
  {
    id: 'n6',
    display: '−12 < 3x − 6 ≤ 21',
    solution: '-2 < x <= 9',
    min: -6,
    max: 12,
    prompt: 'From your Acellus screen. Solve it first — do the same thing to all three parts — then graph what you get.',
    promptVn: 'Từ màn hình Acellus của em. Hãy giải trước — làm cùng một việc với cả ba phần — rồi vẽ kết quả.',
  },
  {
    id: 'n7',
    solution: 'x <= -1 or x > 4',
    min: -8,
    max: 8,
    prompt: 'The word OR means two pieces. You will need the union button.',
    promptVn: 'Từ OR nghĩa là hai đoạn. Em sẽ cần đến nút hợp.',
  },
  {
    id: 'n8',
    solution: 'x < -2 or x > 7',
    min: -8,
    max: 10,
    prompt: 'Both endpoints are open here. Nothing in the middle belongs to the answer.',
    promptVn: 'Cả hai điểm mút ở đây đều rỗng. Không có gì ở giữa thuộc về đáp án.',
  },
  {
    id: 'n9',
    display: '|x| < 4',
    solution: '-4 < x < 4',
    min: -8,
    max: 8,
    prompt: 'Less than means CLOSE to zero. Which numbers are less than 4 steps from zero?',
    promptVn: 'Nhỏ hơn nghĩa là GẦN 0. Những số nào cách 0 chưa tới 4 bước?',
  },
  {
    id: 'n10',
    display: '|x| > 4',
    solution: 'x < -4 or x > 4',
    min: -8,
    max: 8,
    prompt: 'Greater than means FAR from zero — the same picture as the last one, turned inside out.',
    promptVn: 'Lớn hơn nghĩa là XA 0 — vẫn hình đó, nhưng lộn từ trong ra ngoài.',
  },
  {
    id: 'n11',
    display: '|2x − 5| > 9',
    solution: 'x < -2 or x > 7',
    min: -8,
    max: 10,
    prompt: 'From your Acellus screen. Split it into 2x − 5 > 9 and 2x − 5 < −9, solve both, then graph.',
    promptVn: 'Từ màn hình Acellus của em. Tách thành 2x − 5 > 9 và 2x − 5 < −9, giải cả hai, rồi vẽ.',
  },
  {
    id: 'n12',
    display: '|x + 1| ≤ 6',
    solution: '-7 <= x <= 5',
    min: -10,
    max: 8,
    prompt: 'Less than, so one piece — and this time the endpoints are included.',
    promptVn: 'Nhỏ hơn, nên chỉ một đoạn — và lần này hai điểm mút đều được lấy.',
  },
];
