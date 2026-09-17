// src/data/GED_SCIENCE/SCI_1B/assessment.js
// Timed mixed check for Ecosystems, Energy Flow & Heredity. Two short GED-style
// passages (a duckweed growth experiment; a guinea-pig breeding record) carry
// five of the ten items; the rest are a food chain, the 10% rule, the carbon
// cycle, natural selection and similar bones. Bilingual explanations on every
// question; MCQ key balanced A3 B2 C2 D2. Each passage question restates the
// numbers it needs in its stem, so it can be answered even on a screen that
// shows the stem alone.

export const assessment = {
  timeLimit: 1200, // 20 minutes
  passages: [
    {
      id: "sci1b_bp1",
      title: "Duckweed in Two Tanks",
      vnTitle: "Bèo tấm trong Hai Bể",
      meta: "Experiment report",
      text: "A student grew {duckweed}, a tiny green plant that floats on the surface of ponds, in two identical tanks. Both tanks sat by the same sunny window, held the same amount of pond water, and started with 20 plants. Each week the student added plant food, which supplies {nutrients}, to Tank A only. Tank B got none.\nShe counted the plants once a week. The numbers of plants at weeks 0, 1, 2, 3, 4, 5 and 6 were:\nTank A (plant food): 20, 60, 180, 360, 400, 410, 400.\nTank B (no plant food): 20, 50, 110, 170, 200, 200, 190.\nBy week 4, the plants in Tank A covered the whole water surface. The plants in Tank B never covered more than about half of the surface, and many of them were pale yellow instead of green.",
      vnText: "Một học sinh trồng bèo tấm, một loại cây xanh rất nhỏ nổi trên mặt ao, trong hai bể giống hệt nhau. Cả hai bể đặt cạnh cùng một cửa sổ nhiều nắng, chứa cùng một lượng nước ao, và bắt đầu với 20 cây. Mỗi tuần, học sinh thêm phân bón, thứ cung cấp chất dinh dưỡng, vào riêng Bể A. Bể B không được thêm gì.\nCô đếm số cây mỗi tuần một lần. Số cây ở tuần 0, 1, 2, 3, 4, 5 và 6 là:\nBể A (có phân bón): 20; 60; 180; 360; 400; 410; 400.\nBể B (không phân bón): 20; 50; 110; 170; 200; 200; 190.\nĐến tuần 4, cây trong Bể A phủ kín toàn bộ mặt nước. Cây trong Bể B chưa bao giờ phủ quá khoảng một nửa mặt nước, và nhiều cây có màu vàng nhạt thay vì xanh.",
      glossary: {
        "duckweed": { vn: "Bèo tấm", def: "A tiny green plant that floats on the surface of ponds.", vnDef: "Loài cây xanh rất nhỏ nổi trên mặt ao." },
        "nutrients": { vn: "Chất dinh dưỡng", def: "Substances a living thing needs to grow.", vnDef: "Những chất mà sinh vật cần để lớn lên." },
      },
    },
    {
      id: "sci1b_bp2",
      title: "Guinea Pig Colours",
      vnTitle: "Màu Lông Chuột lang",
      meta: "Breeding record",
      text: "In guinea pigs, one gene controls fur colour. The version for black fur (B) is {dominant}, and the version for white fur (b) is {recessive}.\nA {breeder} owned a pair of guinea pigs, and both parents had black fur. Over three years, the pair had 40 babies: 31 had black fur and 9 had white fur.\nThe breeder was surprised by the white babies, because both parents were black.",
      vnText: "Ở chuột lang, một gen điều khiển màu lông. Phiên bản cho lông đen (B) là trội, và phiên bản cho lông trắng (b) là lặn.\nMột người nhân giống nuôi một cặp chuột lang, và cả hai con bố mẹ đều có lông đen. Trong ba năm, cặp này sinh được 40 con: 31 con lông đen và 9 con lông trắng.\nNgười nhân giống ngạc nhiên vì có những con lông trắng, bởi cả hai con bố mẹ đều lông đen.",
      glossary: {
        "dominant": { vn: "Trội", def: "Shows its trait even when only one copy is present.", vnDef: "Thể hiện đặc điểm ngay cả khi chỉ có một bản sao." },
        "recessive": { vn: "Lặn", def: "Shows its trait only when both copies are recessive.", vnDef: "Chỉ thể hiện đặc điểm khi cả hai bản sao đều lặn." },
        "breeder": { vn: "Người nhân giống", def: "A person who keeps animals and pairs them up to have young.", vnDef: "Người nuôi động vật và ghép đôi chúng để sinh con." },
      },
    },
  ],
  questions: [
    {
      id: "q1_mcq_carrying_capacity",
      type: "mcq",
      passageId: "sci1b_bp1",
      title: "1. In the duckweed experiment, Tank A (with plant food) grew from 20 plants to 400 by week 4, then stayed between 400 and 410 until week 6. What is the BEST estimate of Tank A's carrying capacity?",
      options: [
        { val: "A", text: "A. 20 plants" },
        { val: "B", text: "B. About 200 plants" },
        { val: "C", text: "C. About 400 plants" },
        { val: "D", text: "D. About 800 plants, because it would keep doubling" },
      ],
      correct: "C",
      expEn: "Carrying capacity is the largest population a place can support over time. Tank A rose and then levelled off at 400–410 from week 4 to week 6, so its carrying capacity is about 400. 200 is where Tank B levelled off, 20 was only the starting number, and the data shows no sign of doubling again.",
      expVn: "Sức chứa là quần thể lớn nhất mà một nơi có thể nuôi sống lâu dài. Bể A tăng rồi đi ngang ở mức 400–410 từ tuần 4 đến tuần 6, nên sức chứa của nó khoảng 400. 200 là mức Bể B đi ngang, 20 chỉ là số cây ban đầu, và dữ liệu không cho thấy dấu hiệu tăng gấp đôi nữa.",
    },
    {
      id: "q2_mcq_space_limit",
      type: "mcq",
      passageId: "sci1b_bp1",
      title: "2. When Tank A stopped growing at about 400 plants, its whole water surface was covered. Duckweed must float on the surface to get light. Which limiting factor MOST likely stopped Tank A from growing?",
      options: [
        { val: "A", text: "A. Space on the water surface" },
        { val: "B", text: "B. Too much plant food" },
        { val: "C", text: "C. Predators eating the duckweed" },
        { val: "D", text: "D. Too few plants at the start" },
      ],
      correct: "A",
      expEn: "Growth stopped just as the surface filled up. With no room left to float in the light, new plants could not survive, so space was the limiting factor. The passage mentions no predators, Tank A grew the most so the plant food was helping, and both tanks started with the same 20 plants.",
      expVn: "Sự tăng trưởng dừng lại đúng lúc mặt nước bị phủ kín. Không còn chỗ để nổi ra ánh sáng, cây mới không thể sống, nên không gian là yếu tố giới hạn. Bài đọc không nhắc đến kẻ săn mồi, Bể A tăng nhiều nhất nên phân bón đang giúp ích, và cả hai bể đều bắt đầu với 20 cây như nhau.",
    },
    {
      id: "q3_mcq_nutrient_limit",
      type: "mcq",
      passageId: "sci1b_bp1",
      title: "3. Tank B got no plant food. It levelled off at about 200 plants, even though half of its water surface was still empty and many of its plants were pale yellow. Which conclusion does this evidence BEST support?",
      options: [
        { val: "A", text: "A. Space limited Tank B more than it limited Tank A" },
        { val: "B", text: "B. A lack of nutrients limited Tank B, so plant food raised the carrying capacity" },
        { val: "C", text: "C. Tank B got less sunlight than Tank A" },
        { val: "D", text: "D. Duckweed grows best without plant food" },
      ],
      correct: "B",
      expEn: "Tank B still had empty space, so space was not what stopped it. The only difference between the tanks was the plant food, and the pale plants look starved, so nutrients were Tank B's limiting factor. Adding them let Tank A reach about 400 instead of 200. Both tanks sat by the same window, so sunlight was kept the same.",
      expVn: "Bể B vẫn còn chỗ trống, nên không gian không phải thứ làm nó dừng lại. Khác biệt duy nhất giữa hai bể là phân bón, và cây vàng nhạt trông như bị thiếu chất, nên chất dinh dưỡng là yếu tố giới hạn của Bể B. Thêm chất dinh dưỡng giúp Bể A đạt khoảng 400 thay vì 200. Cả hai bể đặt cạnh cùng một cửa sổ, nên ánh sáng được giữ như nhau.",
    },
    {
      id: "q4_mcq_food_chain",
      type: "mcq",
      title: "4. In a lake, the food chain is algae → shrimp → trout → heron. Fishermen catch almost all of the trout. What is MOST likely to happen next?",
      options: [
        { val: "A", text: "A. Shrimp decrease and herons increase" },
        { val: "B", text: "B. Algae increase and shrimp decrease" },
        { val: "C", text: "C. Nothing changes, because trout are not producers" },
        { val: "D", text: "D. Shrimp increase and herons decrease" },
      ],
      correct: "D",
      expEn: "Trout eat shrimp, so with the trout gone fewer shrimp are eaten and the shrimp increase. Herons eat trout, so they lose their food and decrease. The extra shrimp would then eat more algae, so the algae would fall, not rise.",
      expVn: "Cá hồi ăn tôm, nên khi không còn cá hồi, ít tôm bị ăn hơn và tôm tăng lên. Diệc ăn cá hồi, nên chúng mất thức ăn và giảm. Số tôm tăng thêm sau đó sẽ ăn nhiều tảo hơn, nên tảo sẽ giảm chứ không tăng.",
    },
    {
      id: "q5_mcq_energy_pyramid",
      type: "mcq",
      title: "5. In an ocean food chain, phytoplankton (tiny producers) hold 50,000 units of energy. Krill eat the phytoplankton, small fish eat the krill, and seals eat the small fish. Using the 10% rule, about how much energy reaches the seals?",
      options: [
        { val: "A", text: "A. 5,000 units" },
        { val: "B", text: "B. 50 units" },
        { val: "C", text: "C. 500 units" },
        { val: "D", text: "D. 45,000 units" },
      ],
      correct: "B",
      expEn: "There are three steps up from the phytoplankton to the seals, so divide by 10 three times: 50,000 → 5,000 (krill) → 500 (small fish) → 50 (seals). 5,000 and 500 stop too early, and 45,000 is the 90% lost at the very first step.",
      expVn: "Từ thực vật phù du đến hải cẩu có ba bước đi lên, nên chia cho 10 ba lần: 50.000 → 5.000 (tôm krill) → 500 (cá nhỏ) → 50 (hải cẩu). 5.000 và 500 dừng lại quá sớm, còn 45.000 là 90% bị mất ngay ở bước đầu tiên.",
    },
    {
      id: "q6_inline_carbon_cycle",
      type: "inline",
      title: "6. Complete the sentences about the carbon cycle.",
      options: [],
      textParts: [
        "Plants take ",
        " out of the air to make their food. When plants and animals die, ",
        " such as fungi and bacteria break them down and return the carbon to the air and soil.",
      ],
      blanks: {
        "1": {
          correct: "carbon dioxide",
          options: [
            { val: "carbon dioxide", text: "carbon dioxide" },
            { val: "oxygen", text: "oxygen" },
            { val: "water vapour", text: "water vapour" },
          ],
        },
        "2": {
          correct: "decomposers",
          options: [
            { val: "decomposers", text: "decomposers" },
            { val: "producers", text: "producers" },
            { val: "predators", text: "predators" },
          ],
        },
      },
      expEn: "Plants take carbon dioxide from the air during photosynthesis — that is how carbon enters living things. Fungi and bacteria are decomposers: they break down dead matter and release the carbon again, so it keeps cycling.",
      expVn: "Cây lấy carbon dioxide từ không khí khi quang hợp — đó là cách carbon đi vào sinh vật. Nấm và vi khuẩn là sinh vật phân hủy: chúng phân giải vật chất chết và thải carbon ra lại, nên carbon cứ quay vòng.",
    },
    {
      id: "q7_mcq_parent_genotypes",
      type: "mcq",
      passageId: "sci1b_bp2",
      title: "7. Two guinea pigs with BLACK fur had 40 babies: 31 black and 9 white. Black fur (B) is dominant and white fur (b) is recessive. What must the genotype of BOTH parents be?",
      options: [
        { val: "A", text: "A. BB and BB" },
        { val: "B", text: "B. BB and Bb" },
        { val: "C", text: "C. bb and bb" },
        { val: "D", text: "D. Bb and Bb" },
      ],
      correct: "D",
      expEn: "A white baby is bb, so it got one b from EACH parent. Both parents have black fur, so each also has a B. The only genotype that is black and carries b is Bb. BB × BB or BB × Bb could never give a baby two b's, and bb parents would be white.",
      expVn: "Một con lông trắng là bb, nên nó nhận một b từ MỖI con bố mẹ. Cả hai con bố mẹ đều lông đen, nên mỗi con cũng có một B. Kiểu gen duy nhất vừa lông đen vừa mang b là Bb. BB × BB hoặc BB × Bb không bao giờ cho ra con có hai b, còn bố mẹ bb thì phải lông trắng.",
    },
    {
      id: "q8_mcq_ratio_conclusion",
      type: "mcq",
      passageId: "sci1b_bp2",
      title: "8. For two Bb parents, a Punnett square predicts 3 black : 1 white. Out of 40 babies, that is about 30 black and 10 white. The guinea pigs actually had 31 black and 9 white. What is the BEST conclusion?",
      options: [
        { val: "A", text: "A. The results are close to the prediction, so they support it" },
        { val: "B", text: "B. The results prove the Punnett square is wrong" },
        { val: "C", text: "C. White fur must be the dominant trait" },
        { val: "D", text: "D. Every litter will have exactly 3 black babies for each white one" },
      ],
      correct: "A",
      expEn: "A Punnett square gives chances, not exact counts. 31 black and 9 white is very close to the predicted 30 and 10, so the data supports the prediction. White appears in only 9 of the 40 babies, so it is not dominant, and no single litter has to match the ratio exactly.",
      expVn: "Bảng Punnett cho biết khả năng, không phải số đếm chính xác. 31 con đen và 9 con trắng rất gần với dự đoán 30 và 10, nên dữ liệu ủng hộ dự đoán. Lông trắng chỉ xuất hiện ở 9 trong 40 con, nên nó không phải tính trạng trội, và không lứa nào bắt buộc phải khớp đúng tỉ lệ.",
    },
    {
      id: "q9_mcq_resistance",
      type: "mcq",
      title: "9. A farmer sprays a field with a poison that kills 99% of the beetles. The few that survive carry a gene that lets them resist the poison. The farmer buys the same poison fresh every year, but after 10 years it barely kills any beetles. What BEST explains this?",
      options: [
        { val: "A", text: "A. The poison made each beetle's body stronger during its life" },
        { val: "B", text: "B. The beetles learned to avoid the poison and taught their young" },
        { val: "C", text: "C. Beetles with the resistance gene survived and passed it on, so most beetles now carry it" },
        { val: "D", text: "D. The poison got weaker in storage" },
      ],
      correct: "C",
      expEn: "This is natural selection. There was variation: a few beetles already carried the resistance gene. The poison killed the others, so the resistant beetles had most of the young and passed the gene on, and after many generations most beetles carry it. The poison was bought fresh each year, and a single beetle cannot change its own genes.",
      expVn: "Đây là chọn lọc tự nhiên. Đã có biến dị: một vài con bọ vốn mang gen kháng thuốc. Thuốc giết những con khác, nên bọ kháng thuốc sinh ra phần lớn con non và truyền gen lại, và sau nhiều thế hệ hầu hết bọ đều mang gen đó. Thuốc được mua mới mỗi năm, và một con bọ không thể tự thay đổi gen của mình.",
    },
    {
      id: "q10_mcq_common_ancestor",
      type: "mcq",
      title: "10. A human arm, a bat wing and a whale flipper do very different jobs, but they contain the same set of bones in the same order. What does this evidence MOST strongly suggest?",
      options: [
        { val: "A", text: "A. The three animals share a common ancestor" },
        { val: "B", text: "B. The three animals live in the same habitat" },
        { val: "C", text: "C. Bones cannot change over time" },
        { val: "D", text: "D. Whales evolved from bats" },
      ],
      correct: "A",
      expEn: "The same bone pattern used for grabbing, flying and swimming is best explained by a common ancestor that had it, which each group later changed for its own way of life. The bones have clearly changed shape, so C is wrong; the three animals live in very different places; and nothing shows that one of them came from another.",
      expVn: "Cùng một kiểu xương được dùng để cầm nắm, bay và bơi được giải thích tốt nhất bằng một tổ tiên chung có kiểu xương đó, rồi mỗi nhóm về sau biến đổi nó cho lối sống riêng. Các xương rõ ràng đã đổi hình dạng, nên C sai; ba loài sống ở những nơi rất khác nhau; và không có gì cho thấy loài này sinh ra từ loài kia.",
    },
  ],
};
