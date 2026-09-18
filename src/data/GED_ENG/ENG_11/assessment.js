// src/data/GED_ENG/ENG_11/assessment.js
// Lesson 11 check — evaluating an argument the way the RLA reading section
// asks about it: the strongest evidence, how a writer answers the other side,
// naming a reasoning move, the effect of a writer's stake, what would weaken a
// claim, and where two opposing writers agree. One paired stimulus (an op-ed
// and a letter), eight items, answer key balanced 2× A / B / C / D.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p11_trucks",
      title: "Food Trucks Bring Life Downtown",
      meta: "Op-ed • By Dr. Hannah Weiss, professor of urban planning at Crestview University",
      text: [
        "Crestview should allow food trucks to park on three downtown streets at lunchtime. When the city of Alder opened four streets to food trucks in 2021, its pedestrian counters recorded 18 percent more people downtown between noon and 2 p.m., and the sales tax collected from downtown businesses rose by 5 percent the next year.",
        "Restaurant owners fear that the trucks will steal their customers. Alder's experience suggests the opposite: more people on the street means more customers for everyone. Alder required trucks to park at least 100 feet from any restaurant door, and only two of its 48 downtown restaurants closed in the following two years, fewer than in the two years before.",
        "Food trucks also give new cooks an affordable way to start a business. A truck costs a fraction of what a restaurant does, and several of Alder's truck owners have since opened restaurants of their own."
      ],
      glossary: {
        "pedestrian": { def: "A person walking, not driving.", vn: "Người đi bộ", vnDef: "Người đang đi bộ, không lái xe." },
        "sales tax": { def: "Money a city collects on things that are sold.", vn: "Thuế bán hàng", vnDef: "Tiền thành phố thu trên hàng hóa được bán." },
        "fraction": { def: "A small part of something.", vn: "Một phần nhỏ", vnDef: "Một phần nhỏ của cái gì đó." }
      }
    },
    {
      id: "p11_diner",
      title: "Food Trucks Would Hurt Our Restaurants",
      meta: "Letter to the editor • From Paul Grady, owner of Grady's Diner, for the Crestview Downtown Restaurant Association",
      text: [
        "Downtown restaurants pay rent, property taxes and staff wages all year round. Food trucks pay none of that, yet they would park right outside our doors and sell to our customers at lunch, our busiest hour.",
        "I have run Grady's Diner for thirty years, and I know my customers. If they can buy a cheap taco from a truck, many of them will. Every restaurant owner in our association agrees that the trucks would cut our sales. Once the first restaurant closes, others will follow, and downtown will be full of empty windows.",
        "The city should protect the businesses that have supported Crestview for decades, not hand our customers to newcomers who can drive away whenever they like."
      ],
      glossary: {
        "property taxes": { def: "Taxes paid every year by people who own buildings or land.", vn: "Thuế tài sản", vnDef: "Thuế trả hằng năm bởi người sở hữu nhà cửa hoặc đất đai." },
        "association": { def: "A group of people or businesses that work together.", vn: "Hiệp hội", vnDef: "Một nhóm người hoặc doanh nghiệp làm việc cùng nhau." },
        "decades": { def: "Periods of ten years.", vn: "Nhiều thập kỷ", vnDef: "Những khoảng thời gian mười năm." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p11_trucks",
      type: "mcq",
      title: "1. Which detail is the STRONGEST support for the claim that food trucks bring more people downtown?",
      options: [
        { val: "A", text: "A. Several of Alder's truck owners later opened restaurants." },
        { val: "B", text: "B. Alder's pedestrian counters recorded 18 percent more people at lunchtime." },
        { val: "C", text: "C. Restaurant owners fear that trucks will steal their customers." },
        { val: "D", text: "D. A truck costs a fraction of what a restaurant does." }
      ],
      correct: "B",
      expEn: "The claim is about MORE PEOPLE downtown, and B is a measured count of exactly that. A and D support a different claim (trucks help new cooks), and C is the other side's worry, not support.",
      expVn: "Luận điểm nói về việc có NHIỀU NGƯỜI HƠN ở trung tâm, và B là một phép đếm đo đúng điều đó. A và D hỗ trợ một luận điểm khác (xe bán đồ ăn giúp đầu bếp mới), còn C là nỗi lo của phía bên kia, không phải sự hỗ trợ."
    },
    {
      id: "q2",
      passageId: "p11_trucks",
      type: "mcq",
      title: "2. How does the author of the op-ed respond to the restaurant owners' fear?",
      options: [
        { val: "A", text: "A. She says the owners are only thinking of their own profits." },
        { val: "B", text: "B. She admits that many restaurants will close but says it is worth it." },
        { val: "C", text: "C. She uses Alder's restaurant closures and its 100-foot rule to show the fear did not come true." },
        { val: "D", text: "D. She suggests that restaurants should lower their prices to compete." }
      ],
      correct: "C",
      expEn: "She answers the counterclaim with evidence: a distance rule and a count of closures (two of 48, fewer than before). That is a rebuttal. She never attacks the owners (A), never says restaurants will close (B), and never mentions prices (D).",
      expVn: "Bà trả lời luận điểm đối lập bằng bằng chứng: một quy định khoảng cách và số nhà hàng đóng cửa (hai trên 48, ít hơn trước). Đó là sự bác bỏ. Bà không công kích các chủ nhà hàng (A), không nói nhà hàng sẽ đóng cửa (B), và không nhắc đến giá cả (D)."
    },
    {
      id: "q3",
      passageId: "p11_diner",
      type: "mcq",
      title: "3. \"Once the first restaurant closes, others will follow, and downtown will be full of empty windows.\" This sentence is an example of —",
      options: [
        { val: "A", text: "A. a prediction presented without evidence." },
        { val: "B", text: "B. a measured result from another city." },
        { val: "C", text: "C. testimony from a named expert." },
        { val: "D", text: "D. a statistic from a study." }
      ],
      correct: "A",
      expEn: "\"Will follow\" and \"will be\" look into the future, and the letter gives nothing to show it would happen — a chain of predictions that plays on fear. There is no measurement (B), no expert (C) and no number (D) in it.",
      expVn: "\"Will follow\" và \"will be\" nhìn vào tương lai, và lá thư không đưa ra gì để cho thấy điều đó sẽ xảy ra — một chuỗi dự đoán đánh vào nỗi sợ. Trong câu không có phép đo (B), không có chuyên gia (C) và không có con số (D)."
    },
    {
      id: "q4",
      passageId: "p11_diner",
      type: "mcq",
      title: "4. \"Every restaurant owner in our association agrees that the trucks would cut our sales.\" Why is this weak evidence?",
      options: [
        { val: "A", text: "A. The owners have not been in business long enough to know." },
        { val: "B", text: "B. It is a statistic, and statistics can always be changed." },
        { val: "C", text: "C. It describes restaurants in a different city." },
        { val: "D", text: "D. The owners would lose money from the change, and agreeing that sales will fall is not showing that they did." }
      ],
      correct: "D",
      expEn: "This is \"everyone agrees\" from a group with a stake: the owners are the people the trucks would compete with, and their shared opinion is not a measurement. A is contradicted by the letter (thirty years), B is not a statistic at all, and C is false — they are Crestview restaurants.",
      expVn: "Đây là kiểu \"ai cũng đồng ý\" từ một nhóm có quyền lợi: các chủ nhà hàng chính là những người mà xe bán đồ ăn sẽ cạnh tranh, và ý kiến chung của họ không phải là một phép đo. A bị lá thư phủ nhận (ba mươi năm), B hoàn toàn không phải số liệu, còn C sai — đó là các nhà hàng ở Crestview."
    },
    {
      id: "q5",
      passageId: "p11_diner",
      type: "mcq",
      title: "5. Which statement best describes how the evidence in the two texts differs?",
      options: [
        { val: "A", text: "A. The op-ed relies on one person's experience; the letter relies on measured data." },
        { val: "B", text: "B. The op-ed uses measured results from another city; the letter relies mainly on the writer's experience and predictions." },
        { val: "C", text: "C. Both texts rely mainly on statistics from studies." },
        { val: "D", text: "D. Both texts rely mainly on the opinions of named experts." }
      ],
      correct: "B",
      expEn: "The op-ed's support is counted: pedestrians, sales tax, closures in Alder. The letter's support is thirty years of running a diner, a shared opinion and a forecast. A reverses the two, and C and D describe only one text at most.",
      expVn: "Sự hỗ trợ của bài xã luận được đếm: người đi bộ, thuế bán hàng, số nhà hàng đóng cửa ở Alder. Sự hỗ trợ của lá thư là ba mươi năm điều hành quán ăn, một ý kiến chung và một dự báo. A đảo ngược hai văn bản, còn C và D chỉ mô tả tối đa một văn bản."
    },
    {
      id: "q6",
      passageId: "p11_diner",
      type: "mcq",
      title: "6. Which point in the letter is FAIR and should be answered in a strong essay?",
      options: [
        { val: "A", text: "A. Restaurants pay rent, property taxes and wages all year, while food trucks do not." },
        { val: "B", text: "B. Every restaurant owner in the association agrees." },
        { val: "C", text: "C. Downtown will be full of empty windows." },
        { val: "D", text: "D. Food truck owners are newcomers who can drive away whenever they like." }
      ],
      correct: "A",
      expEn: "A is a checkable fact about unequal costs, and the op-ed never answers it — so a fair essay concedes it, then weighs it. B is agreement, not evidence; C is a fearful prediction; D is a jab at the truck owners rather than a reason.",
      expVn: "A là một sự thật có thể kiểm chứng về chi phí không công bằng, và bài xã luận không bao giờ trả lời nó — nên một bài luận công bằng thừa nhận nó, rồi cân nhắc. B là sự đồng tình, không phải bằng chứng; C là một dự đoán gây sợ hãi; D là một lời châm chọc các chủ xe chứ không phải lý do."
    },
    {
      id: "q7",
      passageId: "p11_trucks",
      type: "mcq",
      title: "7. Which fact, if it were true, would most WEAKEN the evidence from Alder in the op-ed?",
      options: [
        { val: "A", text: "A. Alder's food trucks mostly sold tacos and sandwiches." },
        { val: "B", text: "B. Alder's restaurants are also open on weekends." },
        { val: "C", text: "C. A new office tower with 2,000 workers opened in downtown Alder in 2021." },
        { val: "D", text: "D. Alder's truck owners paid the city a yearly permit fee." }
      ],
      correct: "C",
      expEn: "If 2,000 new office workers arrived the same year, they could explain the extra lunchtime crowds and sales tax by themselves — so the trucks might not have caused them. That is cause from coincidence. A, B and D do not offer another explanation for the numbers.",
      expVn: "Nếu 2.000 nhân viên văn phòng mới đến trong cùng năm, riêng họ đã có thể giải thích đám đông buổi trưa và thuế bán hàng tăng thêm — nên có thể xe bán đồ ăn không phải nguyên nhân. Đó là nguyên nhân từ sự trùng hợp. A, B và D không đưa ra cách giải thích nào khác cho các con số."
    },
    {
      id: "q8",
      passageId: "p11_trucks",
      type: "mcq",
      title: "8. Which idea would BOTH writers most likely accept?",
      options: [
        { val: "A", text: "A. Food trucks should be banned from the whole city." },
        { val: "B", text: "B. Food trucks never affect restaurant sales." },
        { val: "C", text: "C. Restaurants should close at lunchtime to save money." },
        { val: "D", text: "D. A busy downtown with plenty of customers is good for Crestview." }
      ],
      correct: "D",
      expEn: "The op-ed wants more people downtown; the letter fears empty windows. Both value a busy downtown — they disagree about whether trucks help or hurt it. Neither calls for a city-wide ban (A), the letter rejects B, and C appears in neither.",
      expVn: "Bài xã luận muốn có nhiều người hơn ở trung tâm; lá thư lo sợ những ô cửa trống. Cả hai đều coi trọng một khu trung tâm nhộn nhịp — họ chỉ bất đồng về việc xe bán đồ ăn giúp hay hại nó. Không ai kêu gọi cấm toàn thành phố (A), lá thư bác bỏ B, và C không xuất hiện ở văn bản nào."
    }
  ]
};
