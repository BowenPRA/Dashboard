// src/data/PHYSICS/FORCE_1A/workbook.js
// Reveal-solution practice for Adding Force Vectors — the whole Drill.
// See docs/workbook-tasks.md.
//
// Focus builds the two halves of the method separately (resolve one force;
// rebuild from two parts) so neither is ever being learned inside the other.
// Practice runs the full method, and deliberately includes the two cases that
// look broken but are not: a column that cancels to zero, and a resultant of
// exactly zero. Challenge reverses the method and asks for the balancing force.
//
// Every answer is a number, a pair or a short "size at angle" — never prose —
// so `accept` can do the marking. Sizes are asked to 1 d.p. and angles to the
// nearest 0.1°, with the rounded neighbours accepted, because a student who
// rounds the components before squaring them has not made a mistake.

export const workbook = [
  {
    tier: 'Focus',
    tierVn: 'Trọng tâm',
    questions: [
      {
        id: 'f1',
        prompt: 'A force of $50$ N points due east — that is, at $0°$. Write its x-part and its y-part.',
        promptVn: 'Một lực $50$ N chỉ về hướng đông — tức là tại $0°$. Hãy viết phần x và phần y của nó.',
        solution: [
          'Use the two formulas even when the answer looks obvious — it is the habit that survives the hard questions.',
          '$F_x = 50\\cos 0° = 50 \\times 1 = 50$ N.',
          '$F_y = 50\\sin 0° = 50 \\times 0 = 0$ N.',
          'A force that points straight along the x-axis is **all** x-part and no y-part.',
        ],
        solutionVn: [
          'Hãy dùng hai công thức ngay cả khi đáp án có vẻ hiển nhiên — chính thói quen đó sẽ giúp em ở những câu khó.',
          '$F_x = 50\\cos 0° = 50 \\times 1 = 50$ N.',
          '$F_y = 50\\sin 0° = 50 \\times 0 = 0$ N.',
          'Một lực chỉ đúng dọc trục x thì **toàn bộ** là phần x và không có phần y.',
        ],
        answer: '$F_x = 50$ N, $F_y = 0$ N',
        answerVn: '$F_x = 50$ N, $F_y = 0$ N',
        accept: ['50, 0', '(50, 0)', '50 and 0', '50,0'],
      },
      {
        id: 'f2',
        prompt: 'Resolve a force of $20$ N acting at $60°$ into its x-part and y-part. Give each to 2 d.p.',
        promptVn: 'Hãy phân tích lực $20$ N tác dụng tại $60°$ thành phần x và phần y. Cho mỗi phần chính xác đến 2 chữ số thập phân.',
        solution: [
          'The x-part is the flat leg, so it uses cosine: $F_x = 20\\cos 60°$.',
          '$\\cos 60° = 0.5$, so $F_x = 10.00$ N.',
          'The y-part is the upright leg, so it uses sine: $F_y = 20\\sin 60° = 20 \\times 0.8660 = 17.32$ N.',
          'Sense check: $60°$ is past halfway to vertical, so the upright part should be the bigger of the two — and it is.',
        ],
        solutionVn: [
          'Phần x là cạnh nằm ngang, nên dùng cos: $F_x = 20\\cos 60°$.',
          '$\\cos 60° = 0{,}5$, vậy $F_x = 10{,}00$ N.',
          'Phần y là cạnh dựng đứng, nên dùng sin: $F_y = 20\\sin 60° = 20 \\times 0{,}8660 = 17{,}32$ N.',
          'Kiểm tra cảm giác: $60°$ đã quá nửa đường tới thẳng đứng, nên phần dựng đứng phải lớn hơn — và đúng vậy.',
        ],
        answer: '$F_x = 10.00$ N, $F_y = 17.32$ N',
        answerVn: '$F_x = 10{,}00$ N, $F_y = 17{,}32$ N',
        accept: ['10, 17.32', '(10, 17.32)', '10 and 17.32', '10,17.32', '10.00, 17.32'],
      },
      {
        id: 'f3',
        prompt: 'Resolve a force of $100$ N acting at $150°$. Pay attention to the signs.',
        promptVn: 'Hãy phân tích lực $100$ N tác dụng tại $150°$. Chú ý dấu.',
        solution: [
          'First picture it: $150°$ is past $90°$, so the arrow leans up and to the **left**. The x-part must come out negative.',
          '$F_x = 100\\cos 150° = 100 \\times (-0.8660) = -86.60$ N.',
          '$F_y = 100\\sin 150° = 100 \\times 0.5 = 50.00$ N — positive, because the force still points upwards.',
          'The calculator supplies the minus sign for you, as long as you enter $150$ and not the $30°$ you can see in the triangle.',
        ],
        solutionVn: [
          'Trước hết hãy hình dung: $150°$ đã vượt $90°$, nên mũi tên nghiêng lên trên và sang **trái**. Phần x phải ra âm.',
          '$F_x = 100\\cos 150° = 100 \\times (-0{,}8660) = -86{,}60$ N.',
          '$F_y = 100\\sin 150° = 100 \\times 0{,}5 = 50{,}00$ N — dương, vì lực vẫn chỉ lên trên.',
          'Máy tính tự cho em dấu trừ, miễn là em nhập $150$ chứ không phải $30°$ mà em nhìn thấy trong tam giác.',
        ],
        answer: '$F_x = -86.60$ N, $F_y = 50.00$ N',
        answerVn: '$F_x = -86{,}60$ N, $F_y = 50{,}00$ N',
        accept: ['-86.6, 50', '(-86.6, 50)', '-86.60, 50.00', '-86.6,50'],
      },
      {
        id: 'f4',
        prompt: 'Without a calculator: for a force acting at $70°$, which is bigger — the x-part or the y-part? Answer "x" or "y".',
        promptVn: 'Không dùng máy tính: với một lực tác dụng tại $70°$, phần nào lớn hơn — phần x hay phần y? Trả lời "x" hoặc "y".',
        solution: [
          '$70°$ is much closer to straight up ($90°$) than to flat ($0°$), so the arrow is mostly pointing upwards.',
          'In numbers: $\\cos 70° = 0.34$ but $\\sin 70° = 0.94$.',
          'The rule to keep: **below $45°$ the x-part wins, above $45°$ the y-part wins**, and at exactly $45°$ they are equal.',
        ],
        solutionVn: [
          '$70°$ gần với thẳng đứng ($90°$) hơn nhiều so với nằm ngang ($0°$), nên mũi tên chủ yếu chỉ lên trên.',
          'Bằng số: $\\cos 70° = 0{,}34$ nhưng $\\sin 70° = 0{,}94$.',
          'Quy tắc cần nhớ: **dưới $45°$ thì phần x lớn hơn, trên $45°$ thì phần y lớn hơn**, và đúng $45°$ thì bằng nhau.',
        ],
        answer: 'the y-part',
        answerVn: 'phần y',
        accept: ['y', 'y-part', 'the y part', 'y part', 'vertical'],
      },
      {
        id: 'f5',
        prompt: 'A resultant has $R_x = 8$ N and $R_y = 6$ N. Find its size and its direction.',
        promptVn: 'Một lực tổng hợp có $R_x = 8$ N và $R_y = 6$ N. Hãy tìm độ lớn và hướng của nó.',
        solution: [
          'Rx and Ry are the two legs of a right triangle and the resultant is its hypotenuse.',
          '$|R| = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ N.',
          '$\\theta = \\tan^{-1}(6 \\div 8) = \\tan^{-1}(0.75) = 36.9°$.',
          'Both parts are positive, so the force points up and to the right — the first quadrant, where the calculator answer needs no correction.',
        ],
        solutionVn: [
          'Rx và Ry là hai cạnh góc vuông của một tam giác vuông, còn lực tổng hợp là cạnh huyền.',
          '$|R| = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ N.',
          '$\\theta = \\tan^{-1}(6 \\div 8) = \\tan^{-1}(0{,}75) = 36{,}9°$.',
          'Cả hai phần đều dương, nên lực chỉ lên trên và sang phải — góc phần tư thứ nhất, nơi kết quả máy tính không cần chỉnh gì.',
        ],
        answer: '$10$ N at $36.9°$',
        answerVn: '$10$ N tại $36{,}9°$',
        accept: ['10 N at 36.9', '10, 36.9', '10 at 36.9', '10N at 36.87', '10, 36.87'],
      },
    ],
  },

  {
    tier: 'Practice',
    tierVn: 'Luyện tập',
    questions: [
      {
        id: 'p1',
        prompt: 'A $5$ N force acts east and a $12$ N force acts north. Find the resultant.',
        promptVn: 'Một lực $5$ N tác dụng về hướng đông và một lực $12$ N về hướng bắc. Hãy tìm lực tổng hợp.',
        solution: [
          'East is $0°$ and north is $90°$, so the components need almost no work: $R_x = 5$, $R_y = 12$.',
          '$|R| = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ N.',
          '$\\theta = \\tan^{-1}(12 \\div 5) = 67.4°$.',
          'Note what did NOT happen: $5 + 12 = 17$ is nowhere in this answer.',
        ],
        solutionVn: [
          'Hướng đông là $0°$ và hướng bắc là $90°$, nên các thành phần gần như không phải tính: $R_x = 5$, $R_y = 12$.',
          '$|R| = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ N.',
          '$\\theta = \\tan^{-1}(12 \\div 5) = 67{,}4°$.',
          'Hãy để ý điều KHÔNG xảy ra: $5 + 12 = 17$ không hề xuất hiện trong đáp án này.',
        ],
        answer: '$13$ N at $67.4°$',
        answerVn: '$13$ N tại $67{,}4°$',
        accept: ['13 N at 67.4', '13, 67.4', '13 at 67.38', '13, 67.38'],
      },
      {
        id: 'p2',
        prompt: 'Two $40$ N forces act at $0°$ and $90°$. Find the resultant.',
        promptVn: 'Hai lực $40$ N tác dụng tại $0°$ và $90°$. Hãy tìm lực tổng hợp.',
        solution: [
          '$R_x = 40 + 0 = 40$ and $R_y = 0 + 40 = 40$.',
          '$|R| = \\sqrt{40^2 + 40^2} = \\sqrt{3200} = 56.6$ N.',
          '$\\theta = \\tan^{-1}(40 \\div 40) = \\tan^{-1}(1) = 45°$ — exactly between the two forces, which is what equal forces always do.',
          'Two $40$ N forces at a right angle make $56.6$ N, not $80$ N. About $30\\%$ of the effort is spent pulling against itself.',
        ],
        solutionVn: [
          '$R_x = 40 + 0 = 40$ và $R_y = 0 + 40 = 40$.',
          '$|R| = \\sqrt{40^2 + 40^2} = \\sqrt{3200} = 56{,}6$ N.',
          '$\\theta = \\tan^{-1}(40 \\div 40) = \\tan^{-1}(1) = 45°$ — đúng giữa hai lực, điều mà hai lực bằng nhau luôn tạo ra.',
          'Hai lực $40$ N vuông góc cho $56{,}6$ N, không phải $80$ N. Khoảng $30\\%$ công sức bị dùng để chống lại chính nó.',
        ],
        answer: '$56.6$ N at $45°$',
        answerVn: '$56{,}6$ N tại $45°$',
        accept: ['56.6 N at 45', '56.6, 45', '56.57, 45', '56.57 at 45'],
      },
      {
        id: 'p3',
        prompt: 'A $60$ N force acts at $20°$ and another $60$ N force acts at $160°$. Find the resultant.',
        promptVn: 'Một lực $60$ N tác dụng tại $20°$ và một lực $60$ N khác tại $160°$. Hãy tìm lực tổng hợp.',
        solution: [
          'x-parts: $60\\cos 20° = 56.38$ and $60\\cos 160° = -56.38$.',
          'They are equal and opposite, so $R_x = 0$. The two forces pull sideways against each other and cancel exactly.',
          'y-parts: $60\\sin 20° = 20.52$ and $60\\sin 160° = 20.52$. Both positive, so $R_y = 41.04$ N.',
          'With $R_x = 0$ the resultant points straight up: $|R| = 41.0$ N at $90°$. Do not put $0$ into $\\tan^{-1}$ — read the picture instead.',
        ],
        solutionVn: [
          'Phần x: $60\\cos 20° = 56{,}38$ và $60\\cos 160° = -56{,}38$.',
          'Chúng bằng nhau và ngược dấu, nên $R_x = 0$. Hai lực kéo sang ngang chống nhau và triệt tiêu hoàn toàn.',
          'Phần y: $60\\sin 20° = 20{,}52$ và $60\\sin 160° = 20{,}52$. Cả hai đều dương, nên $R_y = 41{,}04$ N.',
          'Với $R_x = 0$ thì lực tổng hợp chỉ thẳng lên: $|R| = 41{,}0$ N tại $90°$. Đừng đưa $0$ vào $\\tan^{-1}$ — hãy đọc hình vẽ.',
        ],
        answer: '$41.0$ N at $90°$',
        answerVn: '$41{,}0$ N tại $90°$',
        accept: ['41 N at 90', '41.0, 90', '41.04, 90', '41 at 90'],
      },
      {
        id: 'p4',
        prompt: 'A $30$ N force acts at $90°$ and a $30$ N force acts at $270°$. What is the resultant?',
        promptVn: 'Một lực $30$ N tác dụng tại $90°$ và một lực $30$ N tại $270°$. Lực tổng hợp bằng bao nhiêu?',
        solution: [
          '$90°$ is straight up and $270°$ is straight down, so this is one force pulling against an equal one.',
          'x-parts: $30\\cos 90° = 0$ and $30\\cos 270° = 0$, so $R_x = 0$.',
          'y-parts: $30\\sin 90° = +30$ and $30\\sin 270° = -30$, so $R_y = 0$.',
          '$|R| = 0$ N. The forces are **balanced**: the object behaves exactly as if nothing were pulling it. A zero resultant has no direction to state.',
        ],
        solutionVn: [
          '$90°$ là thẳng lên và $270°$ là thẳng xuống, nên đây là một lực kéo chống lại một lực bằng nó.',
          'Phần x: $30\\cos 90° = 0$ và $30\\cos 270° = 0$, nên $R_x = 0$.',
          'Phần y: $30\\sin 90° = +30$ và $30\\sin 270° = -30$, nên $R_y = 0$.',
          '$|R| = 0$ N. Hai lực **cân bằng**: vật hành xử đúng như thể không có gì kéo nó. Lực tổng hợp bằng không thì không có hướng để nêu.',
        ],
        answer: '$0$ N — the forces are balanced',
        answerVn: '$0$ N — hai lực cân bằng',
        accept: ['0', '0 N', 'zero', '0N'],
      },
      {
        id: 'p5',
        prompt: 'A $70$ N force acts at $40°$ and a $50$ N force acts at $300°$. Find the resultant.',
        promptVn: 'Một lực $70$ N tác dụng tại $40°$ và một lực $50$ N tại $300°$. Hãy tìm lực tổng hợp.',
        solution: [
          'x-parts: $70\\cos 40° = 53.62$ and $50\\cos 300° = 25.00$. So $R_x = 78.62$ N.',
          'y-parts: $70\\sin 40° = 45.00$ and $50\\sin 300° = -43.30$ — the second force points DOWN, so its y-part is negative. $R_y = 1.70$ N.',
          '$|R| = \\sqrt{78.62^2 + 1.70^2} = 78.6$ N.',
          '$\\theta = \\tan^{-1}(1.70 \\div 78.62) = 1.2°$ — very nearly flat, because the two forces almost cancel vertically while adding horizontally.',
        ],
        solutionVn: [
          'Phần x: $70\\cos 40° = 53{,}62$ và $50\\cos 300° = 25{,}00$. Vậy $R_x = 78{,}62$ N.',
          'Phần y: $70\\sin 40° = 45{,}00$ và $50\\sin 300° = -43{,}30$ — lực thứ hai chỉ XUỐNG, nên phần y của nó âm. $R_y = 1{,}70$ N.',
          '$|R| = \\sqrt{78{,}62^2 + 1{,}70^2} = 78{,}6$ N.',
          '$\\theta = \\tan^{-1}(1{,}70 \\div 78{,}62) = 1{,}2°$ — gần như nằm ngang, vì hai lực gần triệt tiêu nhau theo phương đứng trong khi cộng vào nhau theo phương ngang.',
        ],
        answer: '$78.6$ N at $1.2°$',
        answerVn: '$78{,}6$ N tại $1{,}2°$',
        accept: ['78.6 N at 1.2', '78.6, 1.2', '78.64, 1.23', '78.6 at 1.23'],
      },
    ],
  },

  {
    tier: 'Challenge',
    tierVn: 'Nâng cao',
    questions: [
      {
        id: 'c1',
        prompt: 'A resultant has $R_x = -12$ N and $R_y = -5$ N. Find its size and its direction, measured anticlockwise from the $+x$ axis.',
        promptVn: 'Một lực tổng hợp có $R_x = -12$ N và $R_y = -5$ N. Hãy tìm độ lớn và hướng của nó, đo ngược chiều kim đồng hồ từ trục $+x$.',
        solution: [
          'The size ignores the signs, because squaring destroys them: $|R| = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13$ N.',
          'Now the trap. The calculator gives $\\tan^{-1}(-5 \\div -12) = \\tan^{-1}(0.4167) = 22.6°$ — which points up and to the RIGHT.',
          'But both parts are negative, so this force points down and to the LEFT: the third quadrant, between $180°$ and $270°$.',
          'Add $180°$: $\\theta = 22.6 + 180 = 202.6°$. Sketching the two parts first would have caught this before the calculator did.',
        ],
        solutionVn: [
          'Độ lớn không quan tâm tới dấu, vì bình phương xoá dấu: $|R| = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13$ N.',
          'Bây giờ tới cái bẫy. Máy tính cho $\\tan^{-1}(-5 \\div -12) = \\tan^{-1}(0{,}4167) = 22{,}6°$ — hướng đó chỉ lên trên và sang PHẢI.',
          'Nhưng cả hai phần đều âm, nên lực này chỉ xuống dưới và sang TRÁI: góc phần tư thứ ba, giữa $180°$ và $270°$.',
          'Cộng $180°$: $\\theta = 22{,}6 + 180 = 202{,}6°$. Vẽ phác hai phần trước sẽ bắt được lỗi này sớm hơn cả máy tính.',
        ],
        answer: '$13$ N at $202.6°$',
        answerVn: '$13$ N tại $202{,}6°$',
        accept: ['13 N at 202.6', '13, 202.6', '13 at 202.62', '13, 202.62'],
      },
      {
        id: 'c2',
        prompt: 'Three forces of $10$ N each act at $0°$, $120°$ and $240°$. Find the resultant.',
        promptVn: 'Ba lực, mỗi lực $10$ N, tác dụng tại $0°$, $120°$ và $240°$. Hãy tìm lực tổng hợp.',
        solution: [
          'Three forces is no harder than two — the table just gets a third row.',
          'x-parts: $10$, $10\\cos 120° = -5$, $10\\cos 240° = -5$. Column total: $R_x = 0$.',
          'y-parts: $0$, $10\\sin 120° = 8.66$, $10\\sin 240° = -8.66$. Column total: $R_y = 0$.',
          '$|R| = 0$ N. Equal forces spread evenly around a full turn always cancel — this is why a three-legged stool is stable.',
        ],
        solutionVn: [
          'Ba lực không khó hơn hai lực — bảng chỉ thêm một hàng.',
          'Phần x: $10$, $10\\cos 120° = -5$, $10\\cos 240° = -5$. Tổng cột: $R_x = 0$.',
          'Phần y: $0$, $10\\sin 120° = 8{,}66$, $10\\sin 240° = -8{,}66$. Tổng cột: $R_y = 0$.',
          '$|R| = 0$ N. Các lực bằng nhau trải đều quanh một vòng tròn luôn triệt tiêu — vì thế cái ghế ba chân mới vững.',
        ],
        answer: '$0$ N',
        answerVn: '$0$ N',
        accept: ['0', '0 N', 'zero', '0N'],
      },
      {
        id: 'c3',
        prompt: 'Forces of $20$ N at $0°$ and $20$ N at $90°$ act on a box. What single force would hold the box still?',
        promptVn: 'Hai lực $20$ N tại $0°$ và $20$ N tại $90°$ tác dụng lên một cái hộp. Lực duy nhất nào sẽ giữ cho hộp đứng yên?',
        solution: [
          'First find what the two forces already do: $R_x = 20$, $R_y = 20$, so $|R| = 28.3$ N at $45°$.',
          'To hold the box still, the new force must cancel that exactly — same size, opposite direction.',
          'Opposite means $180°$ round: $45 + 180 = 225°$.',
          'So the balancing force is $28.3$ N at $225°$. It is called the **equilibrant**, and it is always the resultant turned back on itself.',
        ],
        solutionVn: [
          'Trước hết hãy tìm xem hai lực đang làm gì: $R_x = 20$, $R_y = 20$, nên $|R| = 28{,}3$ N tại $45°$.',
          'Để giữ hộp đứng yên, lực mới phải triệt tiêu đúng lực đó — cùng độ lớn, ngược hướng.',
          'Ngược hướng nghĩa là quay thêm $180°$: $45 + 180 = 225°$.',
          'Vậy lực cân bằng là $28{,}3$ N tại $225°$. Nó được gọi là **lực cân bằng**, và luôn là lực tổng hợp quay ngược lại.',
        ],
        answer: '$28.3$ N at $225°$',
        answerVn: '$28{,}3$ N tại $225°$',
        accept: ['28.3 N at 225', '28.3, 225', '28.28, 225', '28.3 at 225'],
      },
      {
        id: 'c4',
        prompt: 'A crate is dragged by a rope pulling $200$ N at $25°$ above the ground. How much of that force actually drags the crate forward, and how much of it lifts?',
        promptVn: 'Một thùng hàng bị kéo bằng sợi dây với lực $200$ N nghiêng $25°$ so với mặt đất. Bao nhiêu phần của lực đó thực sự kéo thùng đi tới, và bao nhiêu phần nâng nó lên?',
        solution: [
          'Forward is the x-direction: $F_x = 200\\cos 25° = 181.3$ N.',
          'Lift is the y-direction: $F_y = 200\\sin 25° = 84.5$ N.',
          'So only $181$ N of the $200$ N is doing the dragging — about $9\\%$ of the pull is wasted on lifting.',
          'Pull at a smaller angle and more of the force goes forward. Pull along the ground at $0°$ and all $200$ N does, which is why a rope is best kept low.',
        ],
        solutionVn: [
          'Đi tới là hướng x: $F_x = 200\\cos 25° = 181{,}3$ N.',
          'Nâng lên là hướng y: $F_y = 200\\sin 25° = 84{,}5$ N.',
          'Vậy chỉ $181$ N trong $200$ N là thực sự kéo — khoảng $9\\%$ lực kéo bị phí vào việc nâng.',
          'Kéo với góc nhỏ hơn thì phần lực đi tới nhiều hơn. Kéo sát mặt đất ở $0°$ thì cả $200$ N đều đi tới, vì vậy nên giữ dây thấp.',
        ],
        answer: 'forward $181.3$ N, lift $84.5$ N',
        answerVn: 'đi tới $181{,}3$ N, nâng $84{,}5$ N',
        accept: ['181.3, 84.5', '(181.3, 84.5)', '181, 84.5', '181.26, 84.52'],
      },
    ],
  },
];
