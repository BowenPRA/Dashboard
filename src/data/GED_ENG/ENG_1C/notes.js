import { DIAGRAMS } from './diagrams.js';
// src/data/GED_ENG/ENG_1C/notes.js
// Lesson 9 — Claims, Evidence & Evaluating Arguments (Reading strand).

export const notes = [
  {
    type: "intro",
    title: "Claims, Evidence & Arguments",
    titleVn: "Luận điểm, Bằng chứng & Lập luận",
    subtitle: "Objective: Find the writer's claim, test the evidence behind it, and decide which of two arguments is better supported.",
    subtitleVn: "Mục tiêu: Tìm luận điểm của người viết, kiểm tra bằng chứng phía sau nó, và quyết định lập luận nào trong hai lập luận được chứng minh tốt hơn.",
    color: "bg-[#1cb0f6]",
    borderColor: "border-[#1899d6]"
  },
  {
    type: "concept",
    title: "Claim and Evidence",
    titleVn: "Luận điểm và Bằng chứng",
    icon: "ShieldCheck",
    color: "bg-[#58cc02]",
    content: "An argument is not a fight. It is a **claim** backed by **evidence**.\n\n> The **claim** is the one point the writer wants you to believe.\n> The **evidence** is the facts, numbers or examples that show the claim is true.\n\nOn the GED, your job is to find the claim first, then ask: *what backs it up?* A claim with no evidence is only an opinion.",
    contentVn: "Một lập luận không phải là một cuộc cãi vã. Nó là một **luận điểm** được hỗ trợ bởi **bằng chứng**.\n\n> **Luận điểm** là điểm duy nhất mà người viết muốn bạn tin.\n> **Bằng chứng** là các sự thật, con số hoặc ví dụ cho thấy luận điểm là đúng.\n\nTrong bài thi GED, nhiệm vụ của bạn là tìm luận điểm trước, rồi hỏi: *điều gì chứng minh nó?* Một luận điểm không có bằng chứng chỉ là một ý kiến.",
    example: "Claim: The new bus lane helps the city.\nEvidence: Travel times fell by nine minutes after it opened.",
    exampleVn: "Luận điểm: Làn xe buýt mới giúp ích cho thành phố.\nBằng chứng: Thời gian di chuyển giảm chín phút sau khi nó mở.",
    inlineSvg: DIAGRAMS.CLAIM_EVIDENCE_REASONING,
  },
  {
    type: "concept",
    title: "Fact vs. Opinion",
    titleVn: "Sự thật vs. Ý kiến",
    icon: "Scale",
    color: "bg-[#ff9600]",
    content: "Strong evidence is built from **facts**, not **opinions**.\n\n> A **fact** can be proven true or false — a number, a date, a record.\n> An **opinion** is a personal judgement that cannot be proven.\n\nWatch for judgement words like *should, best, terrible*. They signal an opinion, not proof. A writer may believe something strongly and still give you no fact to check.",
    contentVn: "Bằng chứng mạnh được xây dựng từ **sự thật**, không phải **ý kiến**.\n\n> Một **sự thật** có thể được chứng minh đúng hoặc sai — một con số, một ngày tháng, một hồ sơ.\n> Một **ý kiến** là một đánh giá cá nhân không thể được chứng minh.\n\nHãy chú ý các từ đánh giá như *should, best, terrible*. Chúng báo hiệu một ý kiến, không phải bằng chứng. Một người viết có thể tin điều gì đó mạnh mẽ mà vẫn không đưa cho bạn sự thật nào để kiểm tra.",
    example: "Fact: The library lends 400 books a week.\nOpinion: The library is the best place in town.",
    exampleVn: "Sự thật: Thư viện cho mượn 400 cuốn sách mỗi tuần.\nÝ kiến: Thư viện là nơi tốt nhất trong thị trấn.",
    inlineSvg: DIAGRAMS.FACT_VS_OPINION,
  },
  {
    type: "concept",
    title: "How Strong Is the Evidence?",
    titleVn: "Bằng chứng mạnh đến mức nào?",
    icon: "BarChart3",
    color: "bg-[#ce82ff]",
    content: "Not all evidence is equally strong. Rank it before you trust it.\n\n> **Strongest:** a number or study you can check.\n> **Strong:** a specific, named example.\n> **Weak:** a vague claim — *\"many people say\"*.\n> **Weakest:** feelings only — *\"it is obviously bad\"*.\n\nThe GED essay rewards the student who notices *how* strong each side's evidence is, not just what each side claims.",
    contentVn: "Không phải mọi bằng chứng đều mạnh như nhau. Hãy xếp hạng nó trước khi bạn tin nó.\n\n> **Mạnh nhất:** một con số hoặc nghiên cứu bạn có thể kiểm tra.\n> **Mạnh:** một ví dụ cụ thể, có tên.\n> **Yếu:** một tuyên bố mơ hồ — *\"nhiều người nói\"*.\n> **Yếu nhất:** chỉ có cảm xúc — *\"rõ ràng là tệ\"*.\n\nBài luận GED thưởng cho học sinh nào nhận ra bằng chứng của mỗi bên *mạnh* đến mức nào, không chỉ mỗi bên tuyên bố điều gì.",
    example: "Strong: \"Crime fell 12% in the year after the change.\"\nWeak: \"Everybody knows the change made things worse.\"",
    exampleVn: "Mạnh: \"Tội phạm giảm 12% trong năm sau khi thay đổi.\"\nYếu: \"Ai cũng biết sự thay đổi làm mọi thứ tệ hơn.\"",
    inlineSvg: DIAGRAMS.EVIDENCE_STRENGTH,
  },
  {
    type: "concept",
    title: "Weighing Two Sides",
    titleVn: "Cân nhắc Hai phía",
    icon: "Gavel",
    color: "bg-[#ff4b4b]",
    content: "The GED Extended Response gives you **two sources that disagree**. You do not pick the side you like — you pick the side that is **better supported**.\n\n> 1. Name each side's claim.\n> 2. Test the evidence under each claim (facts or feelings?).\n> 3. Notice a **counterclaim** — where one writer answers the other.\n> 4. Decide which side proves more, and say why.",
    contentVn: "Bài Trả lời Mở rộng của GED cho bạn **hai nguồn không đồng ý với nhau**. Bạn không chọn phía mình thích — bạn chọn phía được **chứng minh tốt hơn**.\n\n> 1. Nêu tên luận điểm của mỗi phía.\n> 2. Kiểm tra bằng chứng dưới mỗi luận điểm (sự thật hay cảm xúc?).\n> 3. Nhận ra một **luận điểm đối lập** — nơi một người viết trả lời người kia.\n> 4. Quyết định phía nào chứng minh được nhiều hơn, và nói tại sao.",
    example: "\"Source 1 gives a measured result; Source 2 only predicts what might happen — so Source 1 is better supported.\"",
    exampleVn: "\"Nguồn 1 đưa ra một kết quả đo được; Nguồn 2 chỉ dự đoán điều có thể xảy ra — nên Nguồn 1 được chứng minh tốt hơn.\"",
  },
  {
    type: "summary",
    title: "Lesson Complete!",
    titleVn: "Hoàn thành Bài học!",
    subtitle: "Objective Achieved: You can find a claim, judge the evidence under it, and argue which of two sources is better supported.",
    subtitleVn: "Đạt được mục tiêu: Bạn có thể tìm một luận điểm, đánh giá bằng chứng dưới nó, và lập luận nguồn nào trong hai nguồn được chứng minh tốt hơn.",
    color: "bg-[#14b8a6]",
    borderColor: "border-[#0d9488]"
  }
];
