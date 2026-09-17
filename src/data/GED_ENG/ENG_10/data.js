// src/data/GED_ENG/ENG_10/data.js
// Lesson 10 of the GED RLA blueprint — the Extended Response capstone. The
// essay is taught as a FORMULA: a fixed five-paragraph frame, a bank of
// sentence frames, and one rule — judge the evidence, never just repeat it.
// Shape: Notes + Vocab (Learn) · Reading + Order It + the paragraph drill
// (Drill) · the 45-minute essay bank + Find & Fix (Prove). No assessment: the
// essay IS the assessment.
import { notes } from './notes.js';

export const ENGLISH_10_DATA = {
  meta: {
    id: "ENG_10",
    title: "The Extended Response",
    desc: "Write the 45-minute two-source essay the same way every time: a fixed five-paragraph frame, a bank of sentence frames, and the rule that separates a 1 from a 2 — evaluate the evidence, do not summarise it.",
    track: "GED_ENG",
    icon: "PenTool"
  },
  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 }
      ]
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "SEQUENCE", dbKey: "p34", maxXP: 15 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      // 45 of the 70 XP before it (64%) — inside the 80% rule.
      threshold: 45,
      tasks: [
        { id: "ESSAY", dbKey: "p8", maxXP: 30 },
        { id: "PROOFREAD", dbKey: "p33", maxXP: 10 }
      ]
    }
  ],
  realWords: [
    {
      word: "Claim",
      vn: "Luận điểm",
      def: "The point a writer wants the reader to accept.",
      vnDef: "Điểm mà người viết muốn người đọc chấp nhận.",
      sent: "The author of Source 1 claims that free buses reduce traffic.",
      vnSent: "Tác giả Nguồn 1 cho rằng xe buýt miễn phí làm giảm giao thông.",
      isReal: true
    },
    {
      word: "Evidence",
      vn: "Bằng chứng",
      def: "The facts, numbers or examples used to prove a claim.",
      vnDef: "Các sự thật, con số hoặc ví dụ dùng để chứng minh một luận điểm.",
      sent: "This evidence is strong because it is a measured result from a named city.",
      vnSent: "Bằng chứng này mạnh vì nó là kết quả đo được từ một thành phố có tên.",
      isReal: true
    },
    {
      word: "Evaluate",
      vn: "Đánh giá",
      def: "To judge how strong or weak something is.",
      vnDef: "Phán xét điều gì đó mạnh hay yếu đến mức nào.",
      sent: "To score full marks, I must evaluate the evidence, not just repeat it.",
      vnSent: "Để đạt điểm tối đa, tôi phải đánh giá bằng chứng, không chỉ nhắc lại nó.",
      isReal: true
    },
    {
      word: "Position",
      vn: "Lập trường",
      def: "The side a writer takes on an issue.",
      vnDef: "Phía mà người viết đứng về trong một vấn đề.",
      sent: "Source 1's position is better supported because its numbers can be checked.",
      vnSent: "Lập trường của Nguồn 1 được chứng minh tốt hơn vì các con số của nó có thể kiểm chứng.",
      isReal: true
    },
    {
      word: "Counterclaim",
      vn: "Luận điểm đối lập",
      def: "The opposing point that argues against a claim.",
      vnDef: "Điểm đối lập lập luận chống lại một luận điểm.",
      sent: "Source 2's counterclaim is that free buses would cost the city too much.",
      vnSent: "Luận điểm đối lập của Nguồn 2 là xe buýt miễn phí sẽ khiến thành phố tốn quá nhiều.",
      isReal: true
    },
    {
      word: "Concede",
      vn: "Thừa nhận",
      def: "To admit that the other side has made a fair point.",
      vnDef: "Công nhận rằng phía kia đã đưa ra một điểm hợp lý.",
      sent: "I concede that Source 2 is right about the cost of new buses.",
      vnSent: "Tôi thừa nhận rằng Nguồn 2 đúng về chi phí của xe buýt mới.",
      isReal: true
    },
    {
      word: "Rebut",
      vn: "Bác bỏ",
      def: "To answer the other side's point and show why it does not change your judgement.",
      vnDef: "Trả lời điểm của phía kia và cho thấy vì sao nó không thay đổi phán đoán của bạn.",
      sent: "Even so, I can rebut this point, because Source 1 shows the fares paid for themselves.",
      vnSent: "Dù vậy, tôi có thể bác bỏ điểm này, vì Nguồn 1 cho thấy tiền vé đã tự trang trải.",
      isReal: true
    },
    {
      word: "Cite",
      vn: "Trích dẫn",
      def: "To name the source a piece of evidence comes from.",
      vnDef: "Nêu tên nguồn mà một bằng chứng đến từ đó.",
      sent: "Always cite the source: according to Source 1, ridership rose by thirty percent.",
      vnSent: "Luôn trích dẫn nguồn: theo Nguồn 1, lượng khách tăng ba mươi phần trăm.",
      isReal: true
    },
    {
      word: "Paraphrase",
      vn: "Diễn giải",
      def: "To say an idea in your own words instead of copying it.",
      vnDef: "Nói một ý bằng lời của bạn thay vì sao chép nó.",
      sent: "I paraphrase the study instead of copying its sentence word for word.",
      vnSent: "Tôi diễn giải nghiên cứu thay vì sao chép nguyên văn câu của nó.",
      isReal: true
    },
    {
      word: "Transition",
      vn: "Từ nối",
      def: "A word or phrase that links one idea to the next, such as however or therefore.",
      vnDef: "Một từ hoặc cụm từ nối ý này với ý tiếp theo, như however hoặc therefore.",
      sent: "A transition such as \"in contrast\" tells the reader a new paragraph is about the other source.",
      vnSent: "Một từ nối như \"in contrast\" cho người đọc biết đoạn mới nói về nguồn kia.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "What the Scorers Look For",
      vnTitle: "Người chấm Tìm điều gì",
      meta: "The three traits in plain English",
      text: [
        "Your essay is scored on three things, and each one is worth 0, 1 or 2.",
        "The first trait is your argument. You must take a clear {position} on which source is better supported, and you must {cite} specific evidence from both sources — a number, a study, a named example. But that alone only scores 1. To score 2, you must {evaluate} the evidence: say why one side's proof is strong and why the other side's is weak.",
        "The second trait is organisation. The scorer wants an introduction that states your position, body paragraphs that each do one job, and a conclusion, with transitions between them. Ideas must be explained, not just listed.",
        "The third trait is clear English. Simple, correct sentences score better than long, broken ones. Repeated small errors — a missing -s, a missing -ed — count as a pattern and cost a mark.",
        "One more rule: copying sentences from the sources is not writing. Copied text earns nothing. Put the {evidence} in your own words and add your judgement.",
      ].join(" "),
      vnText: [
        "Bài luận của bạn được chấm trên ba điều, mỗi điều đáng 0, 1 hoặc 2 điểm.",
        "Tiêu chí thứ nhất là lập luận. Bạn phải nêu một lập trường rõ ràng về nguồn nào được chứng minh tốt hơn, và phải trích dẫn bằng chứng cụ thể từ cả hai nguồn — một con số, một nghiên cứu, một ví dụ có tên. Nhưng chỉ vậy mới được 1 điểm. Để được 2, bạn phải đánh giá bằng chứng: nói vì sao chứng cứ của một phía mạnh và của phía kia yếu.",
        "Tiêu chí thứ hai là tổ chức. Người chấm muốn thấy mở bài nêu lập trường, các đoạn thân bài mỗi đoạn làm một việc, và kết luận, với từ nối giữa các đoạn. Ý phải được giải thích, không chỉ liệt kê.",
        "Tiêu chí thứ ba là tiếng Anh rõ ràng. Câu đơn giản và đúng được điểm cao hơn câu dài mà sai. Lỗi nhỏ lặp lại — thiếu -s, thiếu -ed — được tính là một khuôn mẫu và làm mất điểm.",
        "Thêm một quy tắc: sao chép câu từ nguồn không phải là viết. Văn bản sao chép không được điểm nào. Hãy đặt bằng chứng vào lời của bạn và thêm phán đoán của bạn.",
      ].join(" "),
      glossary: {
        "trait": { vn: "Tiêu chí", def: "One of the three things the essay is scored on." },
        "pattern": { vn: "Khuôn mẫu", def: "The same error made more than once." },
      },
    },
    {
      id: "passage_2",
      title: "A Model Response, Paragraph by Paragraph",
      vnTitle: "Bài mẫu, Từng đoạn một",
      meta: "Prompt: should high schools require uniforms?",
      text: [
        "Both sources discuss whether high schools should require uniforms. Source 1's {position} is better supported, because its evidence is measured, while Source 2 relies on opinion.",
        "The author of Source 1 claims that uniforms improve behaviour. According to Source 1, after Milford High introduced uniforms in 2018, the number of students sent out of class fell by 22% in one year. This {evidence} is strong because it is a real result from a named school, not a guess.",
        "In contrast, the main {claim} of Source 2 is that uniforms stop students expressing themselves. However, Source 2 never explains how this harms learning, and the writer gives no number. The only support is a quote from one parent who says her daughter hates the uniform. One person's feeling is not evidence.",
        "It is true that Source 2 makes a fair point about cost, because a uniform can be expensive for a large family. Even so, this does not change the judgement, since Source 1 reports that Milford gave free uniforms to families who needed them. I {concede} that the cost is real, but it was answered.",
        "Therefore, Source 1's position is better supported. It offers a measured change in a named school, while Source 2 offers a feeling and a prediction.",
      ].join(" "),
      vnText: [
        "Cả hai nguồn bàn về việc trường trung học có nên bắt buộc đồng phục. Lập trường của Nguồn 1 được chứng minh tốt hơn, vì bằng chứng của nó được đo lường, trong khi Nguồn 2 dựa vào ý kiến.",
        "Tác giả Nguồn 1 cho rằng đồng phục cải thiện hành vi. Theo Nguồn 1, sau khi trường Milford High áp dụng đồng phục năm 2018, số học sinh bị đuổi khỏi lớp giảm 22% trong một năm. Bằng chứng này mạnh vì nó là kết quả thực từ một trường có tên, không phải phỏng đoán.",
        "Ngược lại, luận điểm chính của Nguồn 2 là đồng phục ngăn học sinh thể hiện bản thân. Tuy nhiên, Nguồn 2 không bao giờ giải thích điều này gây hại cho việc học như thế nào, và người viết không đưa ra con số nào. Sự hỗ trợ duy nhất là lời của một phụ huynh nói rằng con gái bà ghét đồng phục. Cảm xúc của một người không phải là bằng chứng.",
        "Đúng là Nguồn 2 có điểm hợp lý về chi phí, vì đồng phục có thể đắt đối với một gia đình đông người. Dù vậy, điều này không thay đổi phán đoán, vì Nguồn 1 cho biết Milford đã phát đồng phục miễn phí cho các gia đình cần. Tôi thừa nhận chi phí là có thật, nhưng nó đã được trả lời.",
        "Vì vậy, lập trường của Nguồn 1 được chứng minh tốt hơn. Nó đưa ra một thay đổi đo được ở một trường có tên, trong khi Nguồn 2 đưa ra một cảm xúc và một dự đoán.",
      ].join(" "),
      glossary: {
        "in contrast": { vn: "Ngược lại", def: "A transition that starts the paragraph about the other source." },
        "even so": { vn: "Dù vậy", def: "A transition that turns a concession into a rebuttal." },
      },
    },
    {
      id: "passage_3",
      title: "Five Ways to Lose Marks",
      vnTitle: "Năm Cách Mất điểm",
      meta: "The mistakes scorers see most",
      text: [
        "First, copying. If you copy a sentence from a source, it earns nothing, because the scorer already knows what the source says. Put the idea in your own words — {paraphrase} it — and keep only the number.",
        "Second, summarising without judging. Many students explain Source 1, explain Source 2, and stop. That is a 1. You must {evaluate}: this evidence is strong because it was measured; that evidence is weak because it is only a prediction.",
        "Third, writing one paragraph. A single block of text cannot show organisation, however good it is. Five paragraphs, each with one job, is the safe shape.",
        "Fourth, having no position. The essay must say, in one clear sentence, which source is better supported. A reader should never have to guess.",
        "Fifth, ignoring one source. Some students write only about the side they agree with. A strong essay names the {counterclaim} from the other side, concedes what is fair, and then goes on to {rebut} it. Both sources must appear in your essay.",
      ].join(" "),
      vnText: [
        "Thứ nhất, sao chép. Nếu bạn chép một câu từ nguồn, nó không được điểm nào, vì người chấm đã biết nguồn nói gì. Hãy đặt ý vào lời của bạn — diễn giải nó — và chỉ giữ lại con số.",
        "Thứ hai, tóm tắt mà không đánh giá. Nhiều học sinh giải thích Nguồn 1, giải thích Nguồn 2, rồi dừng lại. Đó là 1 điểm. Bạn phải đánh giá: bằng chứng này mạnh vì đã được đo lường; bằng chứng kia yếu vì chỉ là dự đoán.",
        "Thứ ba, viết một đoạn. Một khối văn bản duy nhất không thể cho thấy tổ chức, dù hay đến đâu. Năm đoạn, mỗi đoạn một việc, là khuôn mẫu an toàn.",
        "Thứ tư, không có lập trường. Bài luận phải nói, trong một câu rõ ràng, nguồn nào được chứng minh tốt hơn. Người đọc không bao giờ phải đoán.",
        "Thứ năm, bỏ qua một nguồn. Một số học sinh chỉ viết về phía mình đồng ý. Một bài luận mạnh nêu tên luận điểm đối lập từ phía kia, thừa nhận điều hợp lý, rồi tiếp tục bác bỏ nó. Cả hai nguồn phải xuất hiện trong bài luận của bạn.",
      ].join(" "),
      glossary: {
        "block of text": { vn: "Khối văn bản", def: "Writing with no paragraph breaks." },
        "safe shape": { vn: "Khuôn mẫu an toàn", def: "The structure that always scores on organisation." },
      },
    }
  ],
  sequence: [
    {
      id: "sq1",
      title: "The five paragraphs",
      titleVn: "Năm đoạn văn",
      prompt: "Each card summarises one paragraph of a model essay about Sunday library opening. Put the five paragraphs in the order the frame uses.",
      promptVn: "Mỗi thẻ tóm tắt một đoạn của bài luận mẫu về việc mở thư viện ngày Chủ nhật. Sắp xếp năm đoạn theo thứ tự của khung bài.",
      items: [
        { text: "Introduction: both sources discuss Sunday opening; Source 1 is better supported because its evidence comes from a measured trial.", textVn: "Mở bài: cả hai nguồn bàn về việc mở cửa Chủ nhật; Nguồn 1 được chứng minh tốt hơn vì bằng chứng của nó đến từ một thử nghiệm đo được." },
        { text: "Body 1: Source 1 reports that visits in Hartley rose 40% during a six-month Sunday trial — strong because it is a real, counted result.", textVn: "Thân bài 1: Nguồn 1 cho biết lượt ghé thăm ở Hartley tăng 40% trong sáu tháng thử nghiệm mở Chủ nhật — mạnh vì đó là kết quả thực, được đếm." },
        { text: "Body 2: in contrast, Source 2 predicts that staff costs would be \"too high\", but never gives a figure — a prediction, not a measurement.", textVn: "Thân bài 2: ngược lại, Nguồn 2 dự đoán chi phí nhân viên sẽ \"quá cao\", nhưng không bao giờ đưa ra con số — một dự đoán, không phải phép đo." },
        { text: "Body 3: it is true that staff need a day off; even so, Source 1 shows Hartley used volunteers on Sundays, so the point is answered.", textVn: "Thân bài 3: đúng là nhân viên cần ngày nghỉ; dù vậy, Nguồn 1 cho thấy Hartley dùng tình nguyện viên vào Chủ nhật, nên điểm này đã được trả lời." },
        { text: "Conclusion: therefore Source 1's position is better supported — measured results beat an unpriced worry.", textVn: "Kết luận: vì vậy lập trường của Nguồn 1 được chứng minh tốt hơn — kết quả đo được thắng một nỗi lo không có giá." },
      ],
      expEn: "The frame never changes: introduction (position + reason) → Body 1 (stronger source, why strong) → Body 2 (\"In contrast\", weaker source, what is missing) → Body 3 (\"It is true that… Even so…\") → conclusion (\"Therefore\"). The transitions tell you where each card belongs.",
      expVn: "Khung bài không bao giờ đổi: mở bài (lập trường + lý do) → Thân bài 1 (nguồn mạnh hơn, vì sao mạnh) → Thân bài 2 (\"In contrast\", nguồn yếu hơn, điều còn thiếu) → Thân bài 3 (\"It is true that… Even so…\") → kết luận (\"Therefore\"). Các từ nối cho bạn biết mỗi thẻ thuộc về đâu."
    },
    {
      id: "sq2",
      title: "One introduction",
      titleVn: "Một đoạn mở bài",
      prompt: "Put the five sentences of this introduction in the best order. The prompt asks whether students should be paid for good grades.",
      promptVn: "Sắp xếp năm câu của đoạn mở bài này theo thứ tự tốt nhất. Đề bài hỏi có nên trả tiền cho học sinh vì điểm tốt.",
      items: [
        { text: "Both sources discuss whether schools should pay students for good grades.", textVn: "Cả hai nguồn bàn về việc trường học có nên trả tiền cho học sinh vì điểm tốt." },
        { text: "Source 1 argues that payment motivates students, while Source 2 argues that it damages their interest in learning.", textVn: "Nguồn 1 lập luận rằng tiền thưởng thúc đẩy học sinh, trong khi Nguồn 2 lập luận rằng nó làm hỏng hứng thú học tập." },
        { text: "Although both writers feel strongly, only one of them supports the claim with measured evidence.", textVn: "Dù cả hai người viết đều có cảm xúc mạnh, chỉ một người chứng minh luận điểm bằng bằng chứng đo được." },
        { text: "Source 2's position is better supported, because it cites a two-year study with clear numbers.", textVn: "Lập trường của Nguồn 2 được chứng minh tốt hơn, vì nó trích dẫn một nghiên cứu hai năm với con số rõ ràng." },
        { text: "In contrast, Source 1 relies on a prediction about what students might do.", textVn: "Ngược lại, Nguồn 1 dựa vào một dự đoán về điều học sinh có thể làm." },
      ],
      expEn: "Name the issue first (\"Both sources discuss…\"), then what each side says, then the turn (\"Although… only one…\"), then the position (\"Source 2's position is better supported, because…\"), and finally the contrast that sets up Body 2 (\"In contrast…\").",
      expVn: "Nêu vấn đề trước (\"Both sources discuss…\"), rồi mỗi bên nói gì, rồi bước ngoặt (\"Although… only one…\"), rồi lập trường (\"Source 2's position is better supported, because…\"), và cuối cùng là phần đối lập chuẩn bị cho Thân bài 2 (\"In contrast…\")."
    },
    {
      id: "sq3",
      title: "One body paragraph",
      titleVn: "Một đoạn thân bài",
      prompt: "Put the five sentences of this body paragraph in order: claim → evidence → why it is strong → contrast → link back to the position.",
      promptVn: "Sắp xếp năm câu của đoạn thân bài này: luận điểm → bằng chứng → vì sao mạnh → đối lập → nối lại với lập trường.",
      items: [
        { text: "The author of Source 1 claims that solar panels on school roofs save money.", textVn: "Tác giả Nguồn 1 cho rằng tấm pin mặt trời trên mái trường tiết kiệm tiền." },
        { text: "According to Source 1, Greenfield School cut its electricity bill by $18,000 in the first year after the panels were installed.", textVn: "Theo Nguồn 1, trường Greenfield đã giảm hóa đơn điện 18.000 đô la trong năm đầu sau khi lắp tấm pin." },
        { text: "This evidence is strong because it is a measured saving from a named school, not an estimate.", textVn: "Bằng chứng này mạnh vì nó là khoản tiết kiệm đo được từ một trường có tên, không phải ước tính." },
        { text: "Source 2, on the other hand, only says that panels \"could\" be expensive to repair, without any figure.", textVn: "Nguồn 2, ngược lại, chỉ nói rằng tấm pin \"có thể\" tốn kém khi sửa chữa, mà không có con số nào." },
        { text: "As a result, Source 1's claim about saving money is the better-supported one.", textVn: "Kết quả là, luận điểm của Nguồn 1 về tiết kiệm tiền là luận điểm được chứng minh tốt hơn." },
      ],
      expEn: "A body paragraph opens with the claim (\"The author of Source 1 claims…\"), gives the cited evidence (\"According to Source 1…\"), judges it (\"This evidence is strong because…\"), contrasts the other side (\"on the other hand\"), and closes with the link back (\"As a result…\").",
      expVn: "Đoạn thân bài mở đầu bằng luận điểm (\"The author of Source 1 claims…\"), đưa bằng chứng có trích dẫn (\"According to Source 1…\"), đánh giá nó (\"This evidence is strong because…\"), đối chiếu phía kia (\"on the other hand\"), và kết bằng câu nối lại (\"As a result…\")."
    },
    {
      id: "sq4",
      title: "The 45-minute plan",
      titleVn: "Kế hoạch 45 phút",
      prompt: "Put the six steps of the essay plan in the order you do them on test day.",
      promptVn: "Sắp xếp sáu bước của kế hoạch bài luận theo thứ tự bạn làm trong ngày thi.",
      items: [
        { text: "Read both sources once, quickly, to understand the issue.", textVn: "Đọc cả hai nguồn một lần, nhanh, để hiểu vấn đề." },
        { text: "Read again and mark every number, study or named example S (strong) or W (weak).", textVn: "Đọc lại và đánh dấu mọi con số, nghiên cứu hoặc ví dụ có tên là S (mạnh) hoặc W (yếu)." },
        { text: "Decide which source is better supported and write down one main reason.", textVn: "Quyết định nguồn nào được chứng minh tốt hơn và ghi lại một lý do chính." },
        { text: "Note one piece of evidence for each body paragraph.", textVn: "Ghi một bằng chứng cho mỗi đoạn thân bài." },
        { text: "Write the five paragraphs using the sentence frames, about six minutes each.", textVn: "Viết năm đoạn bằng các khung câu, khoảng sáu phút mỗi đoạn." },
        { text: "Use the last five minutes to check verb + s, past -ed, articles, plurals and capital I.", textVn: "Dùng năm phút cuối để kiểm tra động từ + s, quá khứ -ed, mạo từ, số nhiều và chữ I viết hoa." },
      ],
      expEn: "Read → mark → decide → plan the evidence → write → check. You cannot mark evidence before reading, cannot decide before marking, and cannot plan paragraphs before deciding. Writing comes only after the plan, and checking is always last.",
      expVn: "Đọc → đánh dấu → quyết định → lập kế hoạch bằng chứng → viết → kiểm tra. Không thể đánh dấu bằng chứng trước khi đọc, không thể quyết định trước khi đánh dấu, và không thể lập dàn ý trước khi quyết định. Viết chỉ đến sau kế hoạch, và kiểm tra luôn là bước cuối."
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "SOURCE 1 — Start School Later: When Ridgeway High moved its start time from 7:30 to 8:30, a one-year study found that students slept 45 minutes more on average and the number of students late to first lesson fell by 30%. Teachers also reported fewer students falling asleep in class.\n\nSOURCE 2 — Keep the Early Start: A later start would cause problems for working parents, who need to drop children off before work. Buses would also have to change their routes, which could cost the district money. Many parents feel that students should simply go to bed earlier.\n\nTASK: Write the INTRODUCTION only (2–3 sentences). Name the issue, then state in one sentence which source is better supported and give the one main reason.",
      vnTranslation: "NGUỒN 1 — Bắt đầu học muộn hơn: Khi trường Ridgeway High dời giờ vào học từ 7:30 sang 8:30, một nghiên cứu kéo dài một năm cho thấy học sinh ngủ thêm trung bình 45 phút và số học sinh đi muộn tiết đầu giảm 30%. Giáo viên cũng cho biết ít học sinh ngủ gật trong lớp hơn.\n\nNGUỒN 2 — Giữ giờ vào học sớm: Vào học muộn hơn sẽ gây khó khăn cho phụ huynh đi làm, những người cần đưa con đến trường trước giờ làm. Xe buýt cũng phải đổi tuyến, điều này có thể khiến khu học chánh tốn tiền. Nhiều phụ huynh cảm thấy học sinh chỉ cần đi ngủ sớm hơn.\n\nNHIỆM VỤ: Chỉ viết đoạn MỞ BÀI (2–3 câu). Nêu vấn đề, rồi nói trong một câu nguồn nào được chứng minh tốt hơn và đưa ra một lý do chính.",
      suggestedWords: [["Both sources", "discuss"], ["position", "better supported"], ["measured", "study"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for naming the issue (whether school should start later) in an opening sentence.",
        "1 mark for clearly stating which source is better supported (Source 1) as a position, not a preference.",
        "1 mark for giving one reason that judges the evidence (Source 1 has a measured, one-year study with numbers; Source 2 offers predictions and feelings)."
      ],
      modelAnswer: "Both sources discuss whether high schools should start the day later. Source 1 argues for a later start, while Source 2 argues that the early start should stay. Source 1's position is better supported, because its evidence comes from a one-year study with measured results — 45 more minutes of sleep and 30% fewer late students — while Source 2 relies on what parents feel and on costs that 'could' happen."
    },
    {
      id: "q2",
      question: "SOURCE 1 — Ban Plastic Bags: After the city of Norwood banned single-use plastic bags in 2021, a count by the city's clean-up teams found 62% fewer plastic bags in the river the following year. Shops reported that 8 in 10 customers switched to reusable bags within three months.\n\nSOURCE 2 — Let Shoppers Choose: A ban punishes people who reuse plastic bags as bin liners. Paper bags are heavier to transport, so a ban might actually increase pollution from delivery trucks. Shoppers should be free to decide for themselves.\n\nTASK: Write ONE body paragraph about the STRONGER source (Source 1). State its claim, cite its evidence, and explain WHY that evidence is strong.",
      vnTranslation: "NGUỒN 1 — Cấm túi nhựa: Sau khi thành phố Norwood cấm túi nhựa dùng một lần năm 2021, một cuộc đếm của đội dọn dẹp thành phố cho thấy số túi nhựa trên sông giảm 62% vào năm sau. Các cửa hàng cho biết 8 trên 10 khách hàng chuyển sang túi tái sử dụng trong vòng ba tháng.\n\nNGUỒN 2 — Để người mua tự chọn: Lệnh cấm trừng phạt những người tái sử dụng túi nhựa làm túi rác. Túi giấy nặng hơn khi vận chuyển, nên lệnh cấm có thể thực sự làm tăng ô nhiễm từ xe tải giao hàng. Người mua nên được tự do quyết định.\n\nNHIỆM VỤ: Viết MỘT đoạn thân bài về nguồn MẠNH HƠN (Nguồn 1). Nêu luận điểm của nó, trích dẫn bằng chứng, và giải thích VÌ SAO bằng chứng đó mạnh.",
      suggestedWords: [["The author of Source 1", "According to Source 1"], ["counted", "result"], ["named", "specific"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for stating Source 1's claim (banning plastic bags reduces plastic waste / pollution).",
        "1 mark for citing a specific detail from Source 1 by name (the 62% fewer bags in the river, or 8 in 10 customers switching).",
        "1 mark for explaining WHY the evidence is strong (it is a measured or counted result from a named city, after a real ban), not just repeating it.",
        "1 mark for using an essay frame or transition (e.g. 'The author of Source 1 claims…', 'According to Source 1…', 'This evidence is strong because…')."
      ],
      modelAnswer: "The author of Source 1 claims that banning plastic bags reduces pollution. According to Source 1, after Norwood banned single-use bags in 2021, the city's clean-up teams counted 62% fewer plastic bags in the river the next year. This evidence is strong because it is a measured result from a named city, collected after a real ban, not a prediction. Source 1 also reports that 8 in 10 shoppers switched to reusable bags within three months, which shows the change was real and quick."
    },
    {
      id: "q3",
      question: "SOURCE 1 — Free Public Wi-Fi: When the town of Ashby installed free Wi-Fi in its centre, a survey of 500 residents found that 41% used it at least once a week, and the library reported 25% more visitors in the first six months. The network cost $90,000 to build.\n\nSOURCE 2 — Not the Town's Job: Free Wi-Fi is a waste of money. Most people already have internet on their phones. The network will probably be slow and crowded, and hackers could steal people's information. The town should spend the money on roads instead.\n\nTASK: Write ONE body paragraph about the WEAKER source (Source 2). State its claim, then explain what is MISSING from its evidence.",
      vnTranslation: "NGUỒN 1 — Wi-Fi công cộng miễn phí: Khi thị trấn Ashby lắp Wi-Fi miễn phí ở trung tâm, một khảo sát 500 cư dân cho thấy 41% dùng nó ít nhất một lần mỗi tuần, và thư viện cho biết lượng khách tăng 25% trong sáu tháng đầu. Mạng tốn 90.000 đô la để xây dựng.\n\nNGUỒN 2 — Không phải việc của thị trấn: Wi-Fi miễn phí là lãng phí tiền. Hầu hết mọi người đã có internet trên điện thoại. Mạng có lẽ sẽ chậm và quá tải, và tin tặc có thể đánh cắp thông tin của mọi người. Thị trấn nên chi tiền cho đường sá thay vào đó.\n\nNHIỆM VỤ: Viết MỘT đoạn thân bài về nguồn YẾU HƠN (Nguồn 2). Nêu luận điểm của nó, rồi giải thích điều gì còn THIẾU trong bằng chứng của nó.",
      suggestedWords: [["In contrast", "However"], ["prediction", "predicts"], ["figure", "data"]],
      scienceMaxMarks: 4,
      markScheme: [
        "1 mark for stating Source 2's claim (free Wi-Fi is a waste of money / not the town's job).",
        "1 mark for referring to a specific point Source 2 makes (most people have phone internet; the network will be slow; hackers; spend on roads).",
        "1 mark for naming what is missing (no numbers, no named example, only predictions with 'probably' / 'could', or it ignores the measured use in Source 1).",
        "1 mark for using a contrast transition or frame (e.g. 'In contrast…', 'However, Source 2 never explains…', 'This is only a prediction…')."
      ],
      modelAnswer: "In contrast, the author of Source 2 claims that free Wi-Fi is a waste of the town's money. The writer says that most people already have internet on their phones and that the network will probably be slow and crowded. However, Source 2 never gives a number for any of this — no survey, no named town, no cost. The words 'probably' and 'could' show that these are only predictions, not measurements. Source 2 also ignores the evidence in Source 1 that 41% of residents actually used the network, so its claim that nobody needs it is not answered."
    },
    {
      id: "q4",
      question: "SOURCE 1 — Try a Four-Day Week: A company called Brightline moved 200 staff to a four-day week for six months. A university team measured the results: output stayed the same, staff sick days fell by 35%, and only 2 employees left during the trial, compared with 11 in the previous six months.\n\nSOURCE 2 — Five Days Works: Customers expect service every weekday. A four-day week would mean longer days, and tired workers make more mistakes. One manager said his team 'would never cope' with four days. Businesses should not experiment with people's jobs.\n\nTASK: Write the CONCLUSION only (2–3 sentences). Restate which source is better supported and the main reason, without adding new evidence.",
      vnTranslation: "NGUỒN 1 — Thử tuần làm việc bốn ngày: Một công ty tên Brightline chuyển 200 nhân viên sang tuần bốn ngày trong sáu tháng. Một nhóm đại học đo kết quả: sản lượng giữ nguyên, ngày nghỉ ốm giảm 35%, và chỉ 2 nhân viên nghỉ việc trong thời gian thử nghiệm, so với 11 trong sáu tháng trước đó.\n\nNGUỒN 2 — Năm ngày là hợp lý: Khách hàng mong đợi dịch vụ mọi ngày trong tuần. Tuần bốn ngày nghĩa là ngày làm dài hơn, và công nhân mệt mỏi mắc nhiều lỗi hơn. Một quản lý nói đội của ông 'sẽ không bao giờ chịu nổi' bốn ngày. Doanh nghiệp không nên thử nghiệm với công việc của mọi người.\n\nNHIỆM VỤ: Chỉ viết đoạn KẾT LUẬN (2–3 câu). Nhắc lại nguồn nào được chứng minh tốt hơn và lý do chính, không thêm bằng chứng mới.",
      suggestedWords: [["Therefore", "In conclusion"], ["position", "better supported"], ["measured", "opinion"]],
      scienceMaxMarks: 3,
      markScheme: [
        "1 mark for opening with a concluding transition (Therefore / In conclusion / Overall) and restating that Source 1's position is better supported.",
        "1 mark for restating the main reason as a judgement of the evidence (Source 1 has a measured six-month trial with numbers; Source 2 has one manager's opinion and predictions).",
        "1 mark for keeping it a conclusion: no new evidence is introduced, and the judgement is stated in a clear, complete sentence."
      ],
      modelAnswer: "Therefore, Source 1's position is better supported. Its evidence comes from a measured six-month trial of 200 staff, with clear numbers on sick days and on workers leaving, while Source 2 offers only one manager's opinion and a prediction about tired workers. A measured result will always be stronger than a worry without numbers."
    }
  ],
  essay: [
    {
      id: "er1",
      title: "Remote work vs. the office",
      minutesAllowed: 45,
      sources: [
        {
          title: "Let Staff Work From Home",
          text:
            "Companies should let office staff work from home for most of the week. In 2023 the software firm Northgate let 1,200 employees work from home three days a week and asked a university team to measure the results. Over twelve months, the number of tasks completed per employee rose by 9%, and sick days fell by 12%. Staff saved an average of 54 minutes of travel every day, time that many of them used to start work earlier. The company also saved money: it gave up one of its three office floors and cut its rent by a fifth. At the end of the year, Northgate made the policy permanent, and in its annual staff survey 81% of employees said they would be less likely to leave the company because of it. Working from home is not a favour to staff. Measured properly, it is simply better for the business.",
        },
        {
          title: "Bring People Back to the Office",
          text:
            "Staff should be in the office. Work is not only a list of tasks; it is also the conversations that happen when people sit together. A manager at one accounting firm says her new employees learn the job much faster when they can turn to an experienced colleague at the next desk instead of waiting for a reply online. A survey of managers found that 68% believe remote staff are less committed to the company, and many worry that people at home are distracted by children, television and housework. If this continues, companies will slowly lose their culture, and young workers will never learn how a good office runs. Remote work may look cheaper on paper, but the real cost — weaker teams and slower training — will show up in a few years, when it is too late to fix. The office exists for a reason.",
        },
      ],
      task:
        "Both writers argue about whether office staff should work from home or in the office. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State in ONE sentence which position is better supported and why.",
        "Use specific evidence — numbers, studies, named examples — from BOTH sources.",
        "Judge the evidence: say why it is strong or weak. Do not just repeat it.",
        "Five paragraphs: introduction, stronger source, weaker source, concede and rebut, conclusion.",
      ],
      suggestedWords: [
        ["measured", "result", "study"],
        ["prediction", "believe", "opinion"],
        ["productivity", "cost", "commute"],
      ],
    },
    {
      id: "er2",
      title: "Cars in the city centre",
      minutesAllowed: 45,
      sources: [
        {
          title: "Close the Centre to Cars",
          text:
            "Cities should ban private cars from their centres. The city of Brenford closed twelve central streets to cars in 2021 and kept only buses, bicycles and delivery vans. Two years later, the city's air monitors showed that nitrogen dioxide, the main pollutant from car engines, had fallen by 24% in the centre. Injuries to pedestrians on those streets dropped from 31 a year to 14. The shop owners who feared empty streets were wrong: counters at the entrances to the main shopping street recorded 8% more people walking past than before the ban, and the city's business survey found that sales in the closed streets rose slightly rather than falling. Bus journeys through the centre became eleven minutes faster because buses no longer sat in traffic. A centre without cars is cleaner, safer and, as Brenford's numbers show, better for business too.",
        },
        {
          title: "Keep the Centre Open",
          text:
            "Banning cars from the centre would hurt the people who keep it alive. The city's Shop Owners' Association warns that customers who drive in from the suburbs will simply go to the out-of-town shopping mall instead, where parking is free. One furniture store owner estimates that he would lose a third of his customers, because nobody carries a sofa home on a bus. Elderly and disabled residents, who cannot walk far or cycle, would be cut off from the doctors, banks and pharmacies in the centre. Deliveries would become slower and more expensive. A poll of local drivers found that 55% oppose the plan, and a ban that most drivers reject is likely to be ignored or fought in court. The centre belongs to everyone, including the people who arrive by car. The city should improve the buses first and leave the streets open.",
        },
      ],
      task:
        "Both writers argue about whether cities should ban cars from their centres. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State in ONE sentence which position is better supported and why.",
        "Use specific evidence — numbers, studies, named examples — from BOTH sources.",
        "Judge the evidence: is it a measured result, or a prediction? Does it ignore a cost?",
        "Concede the other side's fairest point, then rebut it.",
      ],
      suggestedWords: [
        ["measured", "recorded", "monitor"],
        ["estimate", "predicts", "warns"],
        ["pollution", "customers", "traffic"],
      ],
    },
    {
      id: "er3",
      title: "Raising the minimum wage",
      minutesAllowed: 45,
      sources: [
        {
          title: "Raise the Minimum Wage",
          text:
            "The minimum wage should rise. Critics always predict that a higher wage destroys jobs, but the evidence says otherwise. When the state of Alder raised its minimum wage from $9 to $12 an hour over three years, a university study followed 3,000 restaurants and shops across the state. Employment in those businesses fell by less than 1%, which is within the normal yearly change, while the average pay of their lowest-paid workers rose by 18%. The number of families in the state receiving food assistance fell by 6% over the same period, saving the government money. Workers who earn more spend more in local shops, so the money does not disappear; it moves through the town. Prices in Alder's restaurants rose by about 2%, less than the cost of one extra coffee a week. A higher minimum wage is not a gamble. It has been tried, measured and found to work.",
        },
        {
          title: "A Raise That Costs Jobs",
          text:
            "Raising the minimum wage sounds kind, but it is the workers with the fewest skills who pay for it. A small business cannot print money: if wages go up, the owner must raise prices, cut hours or let people go. The owner of a café in the capital says that a rise to $12 would push her labour costs up by 30%, and that she would have to close on Sundays and lose two part-time staff. The state's business federation forecasts that as many as 40,000 jobs could be lost across the state if the increase goes ahead, mostly among young people taking their first job. Machines are cheaper every year, and a higher wage makes the self-service screen more attractive than a teenager at the counter. Politicians who vote for the increase will not be the ones losing their jobs. The kindest wage is the one that lets a business keep hiring.",
        },
      ],
      task:
        "Both writers argue about whether the minimum wage should be raised. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State in ONE sentence which position is better supported and why.",
        "Use specific evidence — numbers, studies, named examples — from BOTH sources.",
        "Judge the evidence: a study of 3,000 businesses versus one owner's estimate and a forecast — say which is stronger and why.",
        "Five paragraphs, with a transition to start each one.",
      ],
      suggestedWords: [
        ["study", "followed", "measured"],
        ["forecast", "estimate", "could"],
        ["wage", "employment", "jobs"],
      ],
    },
    {
      id: "er4",
      title: "Homework in high school",
      minutesAllowed: 45,
      sources: [
        {
          title: "Keep Homework",
          text:
            "High schools should keep setting homework. A 2020 review that combined the results of 60 separate studies found that high-school students who did one to two hours of homework a night scored, on average, 10 percentile points higher in tests than students who did none. The effect was strongest in mathematics and languages, the subjects where practice matters most. The review also found that more than two hours a night brought no extra benefit, so the answer is sensible homework, not endless homework. When Danby High School replaced homework with 'free study time' in class, its mathematics scores fell by 7% in a single year, and the school brought homework back. Homework also teaches students to organise their own time, a skill every college and employer expects. Homework is not a punishment. It is practice, and the measurements show that practice works.",
        },
        {
          title: "Cut Homework",
          text:
            "Homework is doing more harm than good. In a survey of 1,100 high-school students, 56% said that homework was the main source of stress in their lives, ahead of exams and friendships. Many students stay up past midnight to finish it, and tired students learn less the next day, so the homework cancels itself out. One experienced teacher says that most of the homework he collects has been copied from a friend or from the internet, so it tells him nothing about what a student actually knows. Students who do not have a quiet room or an adult to help are punished twice: once at home and again when the work is marked. If homework were cut, students would have time to read, play sport and sleep, and they would probably arrive at school more ready to learn. Schools should teach in school hours and give the evenings back.",
        },
      ],
      task:
        "Both writers argue about whether high schools should keep setting homework. In your response, analyze both positions to decide which one is better supported. Use specific evidence from the sources.",
      guidelines: [
        "State in ONE sentence which position is better supported and why.",
        "Use specific evidence — numbers, studies, named examples — from BOTH sources.",
        "Judge the evidence: measured test scores versus a survey of feelings and a prediction — weigh them, and name what each side ignores.",
        "Use the last five minutes to check verb + s, past -ed, articles and plurals.",
      ],
      suggestedWords: [
        ["review", "studies", "scores"],
        ["survey", "feel", "probably"],
        ["stress", "practice", "benefit"],
      ],
    },
  ],
  proofread: [
    {
      id: "pf1",
      title: "Body 1 — free buses",
      titleVn: "Thân bài 1 — xe buýt miễn phí",
      passage: "The author of Source 1 claim that free buses help a city. According to Source 1, when Elmwood remove the fares last year, ridership rose by thirty percent, this is strong evidence because it is a measured result from a real city. Source 2 argues that free buses cost too much, but there evidence is only a prediction. The writer says that many rider might crowd the buses, but no number is given. i think Source 1 is better supported because it measured a real change, while Source 2 only guesses what could happen. A measured result is always stronger than a guess, and a guess with no number is the weakest evidence of all.",
      errors: [
        {
          id: "e1",
          wrong: "claim that",
          right: "claims that",
          accept: [],
          kind: "Verb + s",
          expEn: "\"The author\" is one person, so the present-tense verb needs -s: \"claims\".",
          expVn: "\"The author\" là một người, nên động từ thì hiện tại cần -s: \"claims\"."
        },
        {
          id: "e2",
          wrong: "remove the fares",
          right: "removed the fares",
          accept: [],
          kind: "Past -ed",
          expEn: "\"Last year\" puts this in the past, so the verb needs -ed: \"removed\".",
          expVn: "\"Last year\" đặt việc này trong quá khứ, nên động từ cần -ed: \"removed\"."
        },
        {
          id: "e3",
          wrong: "percent, this",
          right: "percent. This",
          accept: ["percent; this"],
          kind: "Comma splice",
          expEn: "Two complete ideas cannot be joined by a comma alone. End the first with a full stop and start the next with a capital.",
          expVn: "Hai ý hoàn chỉnh không thể nối chỉ bằng dấu phẩy. Kết thúc ý đầu bằng dấu chấm và bắt đầu ý sau bằng chữ hoa."
        },
        {
          id: "e4",
          wrong: "there evidence",
          right: "their evidence",
          accept: [],
          kind: "Their / there",
          expEn: "\"Their\" shows possession — the evidence belongs to Source 2. \"There\" means a place.",
          expVn: "\"Their\" chỉ sở hữu — bằng chứng thuộc về Nguồn 2. \"There\" chỉ nơi chốn."
        },
        {
          id: "e5",
          wrong: "many rider",
          right: "many riders",
          accept: [],
          kind: "Plural",
          expEn: "\"Many\" always takes a plural noun: \"many riders\".",
          expVn: "\"Many\" luôn đi với danh từ số nhiều: \"many riders\"."
        },
        {
          id: "e6",
          wrong: "i think",
          right: "I think",
          accept: [],
          kind: "Capital I",
          expEn: "The pronoun \"I\" is always a capital letter, wherever it sits in the sentence.",
          expVn: "Đại từ \"I\" luôn viết hoa, dù nó nằm ở đâu trong câu."
        }
      ]
    },
    {
      id: "pf2",
      title: "Body 2 — back to the office",
      titleVn: "Thân bài 2 — trở lại văn phòng",
      passage: "In contrast, the author of Source 2 believe that workers should return to a office. Two year ago, the company report that teamwork improved when staff came back three days a week. This sounds convincing at first. However Source 2 never gives a number for this improvement, so the reader cannot check it. The writer also ignores the cost of travel, which Source 1 measured at almost an hour a day. Because they're evidence is only a description with no data, Source 2 is the weaker source. A claim without a number is hard to trust, and this paragraph shows why the second writer loses the argument.",
      errors: [
        {
          id: "e1",
          wrong: "believe that",
          right: "believes that",
          accept: [],
          kind: "Verb + s",
          expEn: "\"The author\" is singular, so the verb takes -s: \"believes\".",
          expVn: "\"The author\" là số ít, nên động từ mang -s: \"believes\"."
        },
        {
          id: "e2",
          wrong: "a office",
          right: "an office",
          accept: [],
          kind: "Article",
          expEn: "\"Office\" starts with a vowel sound, so the article is \"an\".",
          expVn: "\"Office\" bắt đầu bằng nguyên âm, nên mạo từ là \"an\"."
        },
        {
          id: "e3",
          wrong: "Two year ago",
          right: "Two years ago",
          accept: [],
          kind: "Plural",
          expEn: "After a number bigger than one, the noun is plural: \"two years\".",
          expVn: "Sau một số lớn hơn một, danh từ ở số nhiều: \"two years\"."
        },
        {
          id: "e4",
          wrong: "company report that",
          right: "company reported that",
          accept: [],
          kind: "Past -ed",
          expEn: "\"Two years ago\" is the past, so the verb needs -ed: \"reported\".",
          expVn: "\"Two years ago\" là quá khứ, nên động từ cần -ed: \"reported\"."
        },
        {
          id: "e5",
          wrong: "However Source 2",
          right: "However, Source 2",
          accept: [],
          kind: "Comma after transition",
          expEn: "A transition word that opens a sentence is followed by a comma: \"However, …\".",
          expVn: "Từ nối mở đầu câu được theo sau bởi dấu phẩy: \"However, …\"."
        },
        {
          id: "e6",
          wrong: "they're evidence",
          right: "their evidence",
          accept: [],
          kind: "Their / they're",
          expEn: "\"They're\" means \"they are\". The evidence belongs to them, so it is \"their\".",
          expVn: "\"They're\" nghĩa là \"they are\". Bằng chứng thuộc về họ, nên phải là \"their\"."
        }
      ]
    },
    {
      id: "pf3",
      title: "Body 3 and conclusion — homework",
      titleVn: "Thân bài 3 và kết luận — bài tập về nhà",
      passage: "It is true that Source 2 make a fair point about stress, because student need rest after a long day. Even so, this do not change the judgement. Source 1 cites a named study that was publish in 2019, and that study found that pupils who did a hour of homework scored 8% higher in tests. Source 2 gives no number for the stress it describes. Therefore, Source 1 is better supported, it gives a measured result from a real study, while Source 2 only describes a feeling. In the end, a number you can check will always beat a worry you cannot, and that is why the first writer wins this argument.",
      errors: [
        {
          id: "e1",
          wrong: "make a fair point",
          right: "makes a fair point",
          accept: [],
          kind: "Verb + s",
          expEn: "\"Source 2\" is one thing, so the verb takes -s: \"makes\".",
          expVn: "\"Source 2\" là một thứ, nên động từ mang -s: \"makes\"."
        },
        {
          id: "e2",
          wrong: "student need rest",
          right: "students need rest",
          accept: [],
          kind: "Plural",
          expEn: "This means students in general, so the noun is plural: \"students need\".",
          expVn: "Ý này nói về học sinh nói chung, nên danh từ ở số nhiều: \"students need\"."
        },
        {
          id: "e3",
          wrong: "this do not change",
          right: "this does not change",
          accept: [],
          kind: "Verb + s",
          expEn: "\"This\" is singular, so the helping verb is \"does\": \"this does not change\".",
          expVn: "\"This\" là số ít, nên trợ động từ là \"does\": \"this does not change\"."
        },
        {
          id: "e4",
          wrong: "was publish in",
          right: "was published in",
          accept: [],
          kind: "Past -ed",
          expEn: "After \"was\", the verb needs its -ed form: \"was published\".",
          expVn: "Sau \"was\", động từ cần dạng -ed: \"was published\"."
        },
        {
          id: "e5",
          wrong: "a hour",
          right: "an hour",
          accept: [],
          kind: "Article",
          expEn: "The h in \"hour\" is silent, so it starts with a vowel sound: \"an hour\".",
          expVn: "Chữ h trong \"hour\" là âm câm, nên từ bắt đầu bằng nguyên âm: \"an hour\"."
        },
        {
          id: "e6",
          wrong: "supported, it gives",
          right: "supported. It gives",
          accept: ["supported; it gives", "supported because it gives"],
          kind: "Comma splice",
          expEn: "Two complete sentences cannot be joined by a comma. Use a full stop, a semicolon, or a joining word like \"because\".",
          expVn: "Hai câu hoàn chỉnh không thể nối bằng dấu phẩy. Dùng dấu chấm, dấu chấm phẩy, hoặc từ nối như \"because\"."
        }
      ]
    }
  ],
  notes
};
