// src/data/GED_MATH/MATH_0C/balance.js
// Equations for the Balance task, each one produced by a proportion or rate
// word problem from this unit (cross-multiply first, then solve). See
// docs/balance-tasks.md. Every answer is a whole number; the shape rises from
// one-step (ax = b) to two-step (ax + b = c) rate problems.

export const balance = [
  {
    id: 'e1',
    equation: '5x = 45',
    prompt: '5 kg of rice cost $45. Price per kg: 5x = 45. One step — undo the multiply.',
    promptVn: '5 kg gạo giá 45 đô la. Giá mỗi kg: 5x = 45. Một bước — hoàn tác phép nhân.',
  },
  {
    id: 'e2',
    equation: '3x = 84',
    prompt: '3 tickets cost $12; what do 7 cost? 3/12 = 7/x, cross-multiply: 3x = 84.',
    promptVn: '3 vé giá 12 đô la; 7 vé giá bao nhiêu? 3/12 = 7/x, nhân chéo: 3x = 84.',
  },
  {
    id: 'e3',
    equation: '4x = 60',
    prompt: 'A 4-by-6 photo enlarged to width 10: 4/6 = 10/x gives 4x = 60. Find the height.',
    promptVn: 'Ảnh 4 × 6 phóng to rộng 10: 4/6 = 10/x cho 4x = 60. Tìm chiều cao.',
  },
  {
    id: 'e4',
    equation: '12x = 72',
    prompt: '2 cups of flour make 12 cookies; cups for 36? 2/12 = x/36 gives 12x = 72.',
    promptVn: '2 cốc bột làm 12 cái bánh; cần mấy cốc cho 36 cái? 2/12 = x/36 cho 12x = 72.',
  },
  {
    id: 'e5',
    equation: '2x = 250',
    prompt: 'Map: 2 inches = 50 miles. Distance for 5 inches? 2/50 = 5/x gives 2x = 250.',
    promptVn: 'Bản đồ: 2 inch = 50 dặm. Khoảng cách cho 5 inch? 2/50 = 5/x cho 2x = 250.',
  },
  {
    id: 'e6',
    equation: '8x = 40',
    prompt: 'Red : blue marbles = 3 : 5, and 40 in total. Each share is x, so 3x + 5x = 8x = 40.',
    promptVn: 'Bi đỏ : xanh = 3 : 5, tổng cộng 40 viên. Mỗi phần là x, nên 3x + 5x = 8x = 40.',
  },
  {
    id: 'e7',
    equation: '2x + 4 = 20',
    prompt: 'A taxi charges $4 plus $2 per mile. The ride cost $20. Miles: 2x + 4 = 20. Clear the +4 first.',
    promptVn: 'Taxi tính 4 đô la cộng 2 đô la mỗi dặm. Chuyến đi hết 20 đô la. Số dặm: 2x + 4 = 20. Bỏ +4 trước.',
  },
  {
    id: 'e8',
    equation: '45x + 30 = 165',
    prompt: 'A plumber charges $45 per hour plus a $30 call-out. The bill is $165. Hours: 45x + 30 = 165.',
    promptVn: 'Thợ ống nước tính 45 đô la mỗi giờ cộng 30 đô la phí gọi. Hóa đơn 165 đô la. Số giờ: 45x + 30 = 165.',
  },
];
