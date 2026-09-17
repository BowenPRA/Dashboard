// src/data/GED_SCIENCE/SCI_2B/assessment.js
// Timed mixed check for Force, Motion & Energy. Two short experiment passages
// in the test's own style (pulling a cart with bricks in it; hot water cooling
// in four cups) carry five of the ten items: a speed calculation, a conclusion,
// a fair-test comparison, a temperature-drop calculation and a conduction
// explanation. The rest read a described distance–time graph, balanced forces,
// Newton's third law, an energy "missing joules" sum and two tuning forks.
// Each passage question restates the key numbers in its stem, so it can be
// answered even on a screen that shows the stem alone. Bilingual explanations
// on every question; answer key balanced A–D.
//
// Numbers checked: cart trials follow a = F ÷ m and d = ½·a·t² with t = 2 s
// (2 N/1 kg → 4 m, 2 N/2 kg → 2 m, 2 N/4 kg → 1 m, 4 N/2 kg → 4 m).

export const assessment = {
  timeLimit: 1800, // 30 minutes
  passages: [
    {
      id: "p_carts",
      title: "Carts and Bricks",
      vnTitle: "Xe đẩy và Gạch",
      meta: "Experiment description with data",
      text: "A student wanted to find out how the size of a pull and the mass of an object change how quickly the object speeds up. She used a small cart on a smooth, flat track. Each time, the cart started at rest, and she pulled it with a spring scale, keeping the pulling force the same for the whole run. She measured how far the cart travelled in the first 2 seconds. To add mass, she put bricks in the cart.\nHer results (total mass = cart + bricks):\nTrial 1: 2 N pull, total mass 1 kg. The cart travelled 4 metres.\nTrial 2: 2 N pull, total mass 2 kg. The cart travelled 2 metres.\nTrial 3: 2 N pull, total mass 4 kg. The cart travelled 1 metre.\nTrial 4: 4 N pull, total mass 2 kg. The cart travelled 4 metres.\nShe used the same cart, the same track and the same stopwatch in every trial.",
      vnText: "Một học sinh muốn tìm hiểu độ lớn của lực kéo và khối lượng của một vật làm thay đổi tốc độ tăng tốc của vật đó như thế nào. Cô dùng một chiếc xe đẩy nhỏ trên một đường ray phẳng và trơn. Mỗi lần, xe bắt đầu từ trạng thái đứng yên, và cô kéo nó bằng một lực kế lò xo, giữ lực kéo không đổi trong suốt lần chạy. Cô đo quãng đường xe đi được trong 2 giây đầu tiên. Để tăng khối lượng, cô đặt gạch vào xe.\nKết quả của cô (tổng khối lượng = xe + gạch):\nLần 1: kéo 2 N, tổng khối lượng 1 kg. Xe đi được 4 mét.\nLần 2: kéo 2 N, tổng khối lượng 2 kg. Xe đi được 2 mét.\nLần 3: kéo 2 N, tổng khối lượng 4 kg. Xe đi được 1 mét.\nLần 4: kéo 4 N, tổng khối lượng 2 kg. Xe đi được 4 mét.\nCô dùng cùng một chiếc xe, cùng đường ray và cùng đồng hồ bấm giờ trong mọi lần thử.",
    },
    {
      id: "p_cups",
      title: "Four Cups of Hot Water",
      vnTitle: "Bốn Cốc Nước Nóng",
      meta: "Experiment description with data",
      text: "A student wanted to find out which kind of cup keeps a drink hot the longest. He took four cups of the same size and shape, made of metal, glass, plastic and foam. He poured 200 mL of water at 80 °C into each cup and left all four cups side by side on the same table, with no lids, in a room at 25 °C.\nAfter 20 minutes he measured the temperature of the water in each cup:\nMetal cup: 42 °C.\nGlass cup: 51 °C.\nPlastic cup: 58 °C.\nFoam cup: 70 °C.\nHe also noticed that the outside of the metal cup felt warm to the touch within the first few minutes, while the outside of the foam cup stayed cool.",
      vnText: "Một học sinh muốn tìm hiểu loại cốc nào giữ đồ uống nóng lâu nhất. Cậu lấy bốn chiếc cốc cùng kích thước và hình dạng, làm bằng kim loại, thủy tinh, nhựa và xốp. Cậu rót 200 mL nước ở 80 °C vào mỗi cốc và để cả bốn cốc cạnh nhau trên cùng một chiếc bàn, không đậy nắp, trong một căn phòng 25 °C.\nSau 20 phút, cậu đo nhiệt độ của nước trong từng cốc:\nCốc kim loại: 42 °C.\nCốc thủy tinh: 51 °C.\nCốc nhựa: 58 °C.\nCốc xốp: 70 °C.\nCậu cũng nhận thấy mặt ngoài của cốc kim loại sờ vào đã thấy ấm ngay trong vài phút đầu, còn mặt ngoài của cốc xốp vẫn mát.",
    },
  ],
  questions: [
    {
      id: "q1_mcq_cart_speed",
      type: "mcq",
      passageId: "p_carts",
      title: "1. In Trial 1, the cart travelled 4 metres in the first 2 seconds. What was its average speed over those 2 seconds?",
      options: [
        { val: "A", text: "A. 8 m/s" },
        { val: "B", text: "B. 0.5 m/s" },
        { val: "C", text: "C. 2 m/s" },
        { val: "D", text: "D. 6 m/s" },
      ],
      correct: "C",
      expEn: "Speed = distance ÷ time = 4 m ÷ 2 s = 2 metres per second. The cart was speeding up, so this is its average speed — slower at the start, faster at the end. Multiplying (4 × 2 = 8) or dividing the wrong way round (2 ÷ 4 = 0.5) are the two common slips: distance always goes on top. Adding the numbers (4 + 2 = 6) does not give a speed at all.",
      expVn: "Tốc độ = quãng đường ÷ thời gian = 4 m ÷ 2 s = 2 mét mỗi giây. Xe đang tăng tốc, nên đây là tốc độ trung bình — lúc đầu chậm hơn, lúc cuối nhanh hơn. Nhân lên (4 × 2 = 8) hoặc chia ngược (2 ÷ 4 = 0,5) là hai lỗi thường gặp: quãng đường luôn ở trên. Cộng hai số (4 + 2 = 6) hoàn toàn không cho ra tốc độ.",
    },
    {
      id: "q2_mcq_cart_mass",
      type: "mcq",
      passageId: "p_carts",
      title: "2. In Trials 1, 2 and 3 the pull was always 2 N, but the total mass was 1 kg, then 2 kg, then 4 kg. In 2 seconds the cart travelled 4 m, then 2 m, then 1 m. Which conclusion do these three trials support?",
      options: [
        { val: "A", text: "A. With the same pull, a heavier cart speeds up less" },
        { val: "B", text: "B. With the same pull, a heavier cart speeds up more" },
        { val: "C", text: "C. Mass has no effect, because the pull was the same each time" },
        { val: "D", text: "D. Doubling the pull doubles the distance the cart travels" },
      ],
      correct: "A",
      expEn: "Only the mass changed in Trials 1–3; the pull stayed at 2 N. Each time the mass doubled (1 → 2 → 4 kg), the distance in 2 seconds halved (4 → 2 → 1 m), so the heavier cart sped up less. That is Newton's second law. The statement about doubling the pull may be true, but the pull never changed in these three trials, so they cannot show it — you would need Trial 4 for that.",
      expVn: "Trong Lần 1–3 chỉ có khối lượng thay đổi; lực kéo giữ nguyên 2 N. Mỗi lần khối lượng tăng gấp đôi (1 → 2 → 4 kg), quãng đường trong 2 giây giảm một nửa (4 → 2 → 1 m), nên xe nặng hơn tăng tốc ít hơn. Đó là định luật thứ hai của Newton. Câu về việc tăng gấp đôi lực kéo có thể đúng, nhưng lực kéo không hề thay đổi trong ba lần thử này, nên chúng không thể chứng minh điều đó — bạn cần đến Lần 4.",
    },
    {
      id: "q3_mcq_fair_test",
      type: "mcq",
      passageId: "p_carts",
      title: "3. The student wants to test the effect of the size of the PULL alone. Her trials were: Trial 1 (2 N, 1 kg, 4 m), Trial 2 (2 N, 2 kg, 2 m), Trial 3 (2 N, 4 kg, 1 m) and Trial 4 (4 N, 2 kg, 4 m). Which two trials should she compare?",
      options: [
        { val: "A", text: "A. Trials 1 and 4" },
        { val: "B", text: "B. Trials 1 and 3" },
        { val: "C", text: "C. Trials 3 and 4" },
        { val: "D", text: "D. Trials 2 and 4" },
      ],
      correct: "D",
      expEn: "A fair test changes only one variable at a time. Trials 2 and 4 both have a total mass of 2 kg; only the pull changes (2 N → 4 N), and the distance doubles (2 m → 4 m). Trials 1 and 4 both went 4 m, but the pull AND the mass are different, so you cannot tell which one caused the result — the same problem as Trials 3 and 4. Trials 1 and 3 have the same 2 N pull, so they test mass, not force.",
      expVn: "Một thí nghiệm công bằng chỉ thay đổi một biến mỗi lần. Lần 2 và Lần 4 đều có tổng khối lượng 2 kg; chỉ lực kéo thay đổi (2 N → 4 N), và quãng đường tăng gấp đôi (2 m → 4 m). Lần 1 và Lần 4 đều đi được 4 m, nhưng cả lực kéo LẪN khối lượng đều khác nhau, nên bạn không thể biết cái nào gây ra kết quả — Lần 3 và Lần 4 cũng mắc lỗi đó. Lần 1 và Lần 3 có cùng lực kéo 2 N, nên chúng kiểm tra khối lượng, không phải lực.",
    },
    {
      id: "q4_mcq_cups_drop",
      type: "mcq",
      passageId: "p_cups",
      title: "4. All four cups started with water at 80 °C. After 20 minutes the water in the metal cup was at 42 °C and the water in the foam cup was at 70 °C. How many MORE degrees did the water in the metal cup cool down than the water in the foam cup?",
      options: [
        { val: "A", text: "A. 38 °C" },
        { val: "B", text: "B. 28 °C" },
        { val: "C", text: "C. 10 °C" },
        { val: "D", text: "D. 112 °C" },
      ],
      correct: "B",
      expEn: "Work out each drop first. Metal: 80 − 42 = 38 °C. Foam: 80 − 70 = 10 °C. The difference is 38 − 10 = 28 °C. (A quicker way gives the same answer: 70 − 42 = 28.) 38 °C is only the metal cup's drop and 10 °C is only the foam cup's; adding the two final temperatures (42 + 70 = 112) means nothing here.",
      expVn: "Tính mức giảm của từng cốc trước. Kim loại: 80 − 42 = 38 °C. Xốp: 80 − 70 = 10 °C. Chênh lệch là 38 − 10 = 28 °C. (Cách nhanh hơn cho cùng đáp án: 70 − 42 = 28.) 38 °C chỉ là mức giảm của cốc kim loại và 10 °C chỉ là của cốc xốp; cộng hai nhiệt độ cuối (42 + 70 = 112) không có ý nghĩa gì ở đây.",
    },
    {
      id: "q5_mcq_cups_conduction",
      type: "mcq",
      passageId: "p_cups",
      title: "5. In 20 minutes, the water in the foam cup cooled from 80 °C to 70 °C, while the water in the metal cup cooled from 80 °C to 42 °C and the outside of the metal cup felt warm. Which explanation BEST fits these results?",
      options: [
        { val: "A", text: "A. Metal is a good conductor, so heat escaped through it quickly; foam is an insulator and slows heat down" },
        { val: "B", text: "B. Foam blocks the cold air in the room from getting into the water" },
        { val: "C", text: "C. The foam cup gave some of its own heat to the water inside it" },
        { val: "D", text: "D. The metal cup held less water, so its water had less heat to lose" },
      ],
      correct: "A",
      expEn: "Heat always flows from hot to cold, so heat left the 80 °C water toward the 25 °C room, passing through the cup wall by conduction. Metal is a good conductor — that is why its outside felt warm — so the water lost heat fast. Foam is an insulator, so heat got through slowly and its outside stayed cool. Cold does not flow in, no cup adds heat, and every cup held the same 200 mL.",
      expVn: "Nhiệt luôn chảy từ nóng sang lạnh, nên nhiệt rời khỏi nước 80 °C ra căn phòng 25 °C, đi qua thành cốc bằng dẫn nhiệt. Kim loại dẫn nhiệt tốt — vì thế mặt ngoài của nó sờ thấy ấm — nên nước mất nhiệt nhanh. Xốp là chất cách nhiệt, nên nhiệt truyền qua chậm và mặt ngoài vẫn mát. Cái lạnh không \"chảy\" vào, không cốc nào thêm nhiệt, và cốc nào cũng chứa cùng 200 mL nước.",
    },
    {
      id: "q6_mcq_dt_return",
      type: "mcq",
      title: "6. A distance–time graph shows how far Minh is from home on a walk. From minute 0 to minute 20 the line rises steadily from 0 km to 2 km. From minute 20 to minute 30 it is flat at 2 km. From minute 30 to minute 40 it slopes down from 2 km back to 0 km. What happened in the last 10 minutes?",
      options: [
        { val: "A", text: "A. Minh stopped to rest" },
        { val: "B", text: "B. Minh kept walking away from home, but more slowly" },
        { val: "C", text: "C. Minh walked back home, more slowly than on the way out" },
        { val: "D", text: "D. Minh walked back home, faster than on the way out" },
      ],
      correct: "D",
      expEn: "The graph shows distance FROM HOME, so a line sloping down means he is getting closer to home. On the way out he covered 2 km in 20 minutes (0.1 km per minute); on the way back he covered the same 2 km in only 10 minutes (0.2 km per minute) — twice as fast, which is why that part of the line is steeper. A flat line means stopped, and that was minutes 20 to 30.",
      expVn: "Đồ thị cho biết khoảng cách TỪ NHÀ, nên đường dốc xuống nghĩa là Minh đang đến gần nhà hơn. Lúc đi, cậu đi 2 km trong 20 phút (0,1 km mỗi phút); lúc về, cậu đi cùng 2 km chỉ trong 10 phút (0,2 km mỗi phút) — nhanh gấp đôi, vì thế đoạn đó dốc hơn. Đường phẳng nghĩa là đang dừng, và đó là từ phút 20 đến phút 30.",
    },
    {
      id: "q7_mcq_balanced_cyclist",
      type: "mcq",
      title: "7. A cyclist rides along a flat, straight road at a steady 20 km/h. Her pedalling gives a forward force of 80 N. What is the total backward force from friction and air resistance?",
      options: [
        { val: "A", text: "A. 0 N — once she is moving, nothing pushes back" },
        { val: "B", text: "B. Less than 80 N — the forward force must be bigger to keep her moving" },
        { val: "C", text: "C. 80 N — a steady speed means the forces are balanced" },
        { val: "D", text: "D. 160 N — the two forces add together" },
      ],
      correct: "C",
      expEn: "A steady speed in a straight line means her velocity is not changing — no acceleration, so no net force. The forces must be balanced: 80 N forward and 80 N backward. It can feel as if you need extra force just to keep going, but by Newton's first law a moving object keeps the same speed unless the forces are unbalanced. If the backward force were less than 80 N, she would be speeding up.",
      expVn: "Tốc độ đều trên đường thẳng nghĩa là vận tốc của cô không thay đổi — không có gia tốc, nên không có lực tổng hợp. Các lực phải cân bằng: 80 N về phía trước và 80 N về phía sau. Có thể bạn cảm thấy cần thêm lực chỉ để tiếp tục đi, nhưng theo định luật thứ nhất của Newton, một vật đang chuyển động giữ nguyên tốc độ trừ khi các lực không cân bằng. Nếu lực cản phía sau nhỏ hơn 80 N, cô ấy sẽ đang tăng tốc.",
    },
    {
      id: "q8_mcq_third_law",
      type: "mcq",
      title: "8. A swimmer at the end of a pool pushes backward on the wall with her feet with a force of 150 N, and she shoots forward through the water. What force does the wall put on the swimmer?",
      options: [
        { val: "A", text: "A. No force — a wall cannot push" },
        { val: "B", text: "B. 150 N forward, in the direction she moves" },
        { val: "C", text: "C. Less than 150 N forward, because the wall does not move" },
        { val: "D", text: "D. 150 N backward, in the same direction as her push" },
      ],
      correct: "B",
      expEn: "Newton's third law: every push has an equal push back in the opposite direction. She pushes the wall backward with 150 N, so the wall pushes her forward with 150 N — that forward push is what sends her across the pool. The wall does not move because it is part of the pool, fixed to the ground, not because its push is smaller.",
      expVn: "Định luật thứ ba của Newton: mọi lực đẩy đều có một lực đẩy ngược lại bằng nhau theo hướng ngược lại. Cô đẩy bức tường về phía sau với 150 N, nên bức tường đẩy cô về phía trước với 150 N — chính lực đẩy đó đưa cô lao qua hồ bơi. Bức tường không di chuyển vì nó là một phần của hồ bơi, gắn chặt với mặt đất, chứ không phải vì lực đẩy của nó nhỏ hơn.",
    },
    {
      id: "q9_mcq_missing_energy",
      type: "mcq",
      title: "9. A skateboarder starts at rest at the top of a ramp with 600 J of potential energy. At the bottom she has 540 J of kinetic energy and no potential energy left. Which statement BEST explains the missing 60 J?",
      options: [
        { val: "A", text: "A. It was destroyed on the way down the ramp" },
        { val: "B", text: "B. It is still stored as potential energy at the bottom" },
        { val: "C", text: "C. Friction with the ramp and the air changed it into heat and sound" },
        { val: "D", text: "D. Energy is conserved only for a falling object, not on a ramp" },
      ],
      correct: "C",
      expEn: "Energy is never made or destroyed — it only changes form. The 600 J − 540 J = 60 J did not become kinetic energy, and the question says no potential energy is left. Friction between the wheels, the ramp and the air turned it into thermal energy (heat) and a little sound, which spread into the surroundings. Conservation holds everywhere, not just for a falling ball: 540 J kinetic + 60 J heat and sound = 600 J, the same total she started with.",
      expVn: "Năng lượng không bao giờ được tạo ra hay bị hủy — nó chỉ đổi dạng. Phần 600 J − 540 J = 60 J đã không trở thành động năng, và đề bài nói không còn thế năng nào. Ma sát giữa bánh xe, mặt dốc và không khí đã biến nó thành nhiệt năng (nhiệt) và một chút âm thanh, lan ra môi trường xung quanh. Định luật bảo toàn đúng ở mọi nơi, không chỉ với quả bóng rơi: 540 J động năng + 60 J nhiệt và âm thanh = 600 J, bằng đúng tổng lúc đầu.",
    },
    {
      id: "q10_mcq_tuning_forks",
      type: "mcq",
      title: "10. Tuning fork A vibrates 256 times each second (256 Hz). Tuning fork B vibrates 512 times each second (512 Hz). Both are struck equally hard. How does the sound from fork B compare with the sound from fork A?",
      options: [
        { val: "A", text: "A. B has a higher pitch and a shorter wavelength" },
        { val: "B", text: "B. B is louder, because it vibrates more times each second" },
        { val: "C", text: "C. B has a higher pitch and a longer wavelength" },
        { val: "D", text: "D. B's sound travels through the air twice as fast" },
      ],
      correct: "A",
      expEn: "Frequency sets pitch: 512 Hz is double 256 Hz, so B sounds higher. More waves passing each second means each wave is shorter, so B's wavelength is shorter — half as long. Loudness depends on amplitude, and both forks were struck equally hard. Both sounds travel through the same air at the same speed, about 340 m/s.",
      expVn: "Tần số quyết định độ cao của âm: 512 Hz gấp đôi 256 Hz, nên âm thoa B nghe cao hơn. Nhiều sóng đi qua mỗi giây hơn nghĩa là mỗi sóng ngắn hơn, nên bước sóng của B ngắn hơn — chỉ bằng một nửa. Độ to phụ thuộc vào biên độ, mà cả hai âm thoa được gõ mạnh như nhau. Cả hai âm thanh truyền qua cùng không khí với cùng tốc độ, khoảng 340 m/s.",
    },
  ],
};
