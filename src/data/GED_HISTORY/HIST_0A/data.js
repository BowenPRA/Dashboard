// src/data/GED_HISTORY/HIST_0A/data.js
// HIST_0A — Reading Social Studies Sources (the cross-cutting spine of the GED
// Social Studies test; GED-SPRINT.md §6). The skill, not the content: tell a
// primary source from a secondary one, fact from opinion, and read a document,
// a political cartoon, a map and a photograph — including the bias in each.
// Source Analysis runs on REAL public-domain material (imagery-sourcing.md).
import { notes } from './notes.js';
import { assessment } from './assessment.js';

export const GED_HIST_0A_DATA = {
  meta: {
    id: "HIST_0A",
    title: "Reading Social Studies Sources",
    desc: "The reading skill the whole Social Studies test rides on: tell a primary source from a secondary one, fact from opinion, and read a cartoon, a map and a photograph — bias and all.",
    track: "GED_HISTORY",
    icon: "ScanEye",
  },

  phases: [
    {
      id: "concept",
      title: "Learn",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 10 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 10 },
      ],
    },
    {
      id: "practice",
      title: "Drill",
      threshold: 15,
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 },
      ],
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 },
      ],
    },
  ],

  realWords: [
    { word: "Source", vn: "Nguồn tư liệu", def: "Anything that gives us information about the past — a document, an image, a map or an object.", vnDef: "Bất cứ thứ gì cho ta thông tin về quá khứ — một văn bản, hình ảnh, bản đồ hoặc đồ vật.", sent: "The historian studied every source she could find about the war.", vnSent: "Nhà sử học nghiên cứu mọi nguồn tư liệu bà tìm được về cuộc chiến.", isReal: true },
    { word: "Primary source", vn: "Nguồn sơ cấp", def: "A source made by someone who was there at the time, such as a letter, photo or speech.", vnDef: "Nguồn do người có mặt vào thời điểm đó tạo ra, như một lá thư, bức ảnh hay bài phát biểu.", sent: "A soldier's diary is a primary source about the battle.", vnSent: "Nhật ký của một người lính là nguồn sơ cấp về trận đánh.", isReal: true },
    { word: "Secondary source", vn: "Nguồn thứ cấp", def: "A source made later by someone who studied the event, such as a textbook.", vnDef: "Nguồn được tạo ra sau này bởi người nghiên cứu sự kiện, như một cuốn sách giáo khoa.", sent: "Your history textbook is a secondary source.", vnSent: "Sách giáo khoa lịch sử của bạn là một nguồn thứ cấp.", isReal: true },
    { word: "Political cartoon", vn: "Tranh biếm họa chính trị", def: "A drawing that uses pictures and humor to give an opinion about news or politics.", vnDef: "Một bức vẽ dùng hình ảnh và sự hài hước để nêu quan điểm về tin tức hoặc chính trị.", sent: "The political cartoon mocked the greedy politician.", vnSent: "Bức tranh biếm họa chính trị chế giễu vị chính khách tham lam.", isReal: true },
    { word: "Symbol", vn: "Biểu tượng", def: "A picture that stands for a bigger idea — a dove for peace, a flag for a country.", vnDef: "Một hình ảnh đại diện cho một ý lớn hơn — chim bồ câu cho hòa bình, lá cờ cho một quốc gia.", sent: "The artist drew a chain as a symbol of slavery.", vnSent: "Người họa sĩ vẽ một sợi xích làm biểu tượng của chế độ nô lệ.", isReal: true },
    { word: "Bias", vn: "Thiên vị", def: "Favoring one side unfairly instead of showing both sides evenly.", vnDef: "Nghiêng về một phía một cách không công bằng thay vì thể hiện cả hai phía đồng đều.", sent: "A source written by one side often shows bias.", vnSent: "Một nguồn do một bên viết thường có sự thiên vị.", isReal: true },
    { word: "Point of view", vn: "Quan điểm", def: "The position or attitude from which a person sees and describes an event.", vnDef: "Vị trí hoặc thái độ mà từ đó một người nhìn và mô tả một sự kiện.", sent: "A king and a farmer would describe the same tax from a different point of view.", vnSent: "Một vị vua và một nông dân sẽ mô tả cùng một loại thuế từ quan điểm khác nhau.", isReal: true },
    { word: "Fact", vn: "Sự thật", def: "A statement that can be checked and proven true.", vnDef: "Một phát biểu có thể kiểm chứng và chứng minh là đúng.", sent: "\"The vote was held in 1920\" is a fact.", vnSent: "\"Cuộc bỏ phiếu diễn ra năm 1920\" là một sự thật.", isReal: true },
    { word: "Opinion", vn: "Ý kiến", def: "A belief or judgment that cannot be proven true or false.", vnDef: "Một niềm tin hoặc phán xét không thể chứng minh đúng hay sai.", sent: "\"That was the best law ever passed\" is an opinion.", vnSent: "\"Đó là đạo luật hay nhất từng được thông qua\" là một ý kiến.", isReal: true },
    { word: "Infer", vn: "Suy luận", def: "To work out something that is not stated directly, using clues in the source.", vnDef: "Suy ra điều không được nói trực tiếp, dựa vào các manh mối trong nguồn.", sent: "From her worried face you can infer that times were hard.", vnSent: "Từ khuôn mặt lo âu của bà, bạn có thể suy luận rằng thời đó rất khó khăn.", isReal: true },
  ],

  passages: [
    {
      id: "passage_1",
      title: "Primary and Secondary Sources",
      vnTitle: "Nguồn Sơ cấp và Thứ cấp",
      meta: "Where information comes from",
      text: [
        "Everything we know about the past comes from sources. A source is anything that carries information about an event: a letter, a photograph, a map, a law, even an old shopping list.",
        "A primary source is made by someone who was actually there at the time. A soldier's diary, a speech, a photograph taken during the event, or the original text of a law are all primary sources. They are close to the event, but each one shows only one person's point of view.",
        "A secondary source is made later by someone who studied the event but did not live through it. Your textbook and this lesson are secondary sources. They can compare many primary sources at once, but they are one step further away from what happened.",
      ].join(" "),
      vnText: [
        "Mọi điều ta biết về quá khứ đều đến từ các nguồn. Một nguồn là bất cứ thứ gì mang thông tin về một sự kiện: một lá thư, một bức ảnh, một bản đồ, một đạo luật, thậm chí một tờ danh sách mua sắm cũ.",
        "Nguồn sơ cấp do người thực sự có mặt vào thời điểm đó tạo ra. Nhật ký của một người lính, một bài phát biểu, một bức ảnh chụp trong sự kiện, hay văn bản gốc của một đạo luật đều là nguồn sơ cấp. Chúng gần với sự kiện, nhưng mỗi nguồn chỉ cho thấy quan điểm của một người.",
        "Nguồn thứ cấp được tạo ra sau này bởi người nghiên cứu sự kiện nhưng không sống qua nó. Sách giáo khoa của bạn và bài học này là nguồn thứ cấp. Chúng có thể so sánh nhiều nguồn sơ cấp cùng lúc, nhưng ở xa hơn một bước so với điều đã xảy ra.",
      ].join(" "),
      glossary: {
        "primary source": { vn: "Nguồn sơ cấp", def: "A source made by someone who was there at the time." },
        "secondary source": { vn: "Nguồn thứ cấp", def: "A source made later by someone who studied the event." },
      },
    },
    {
      id: "passage_2",
      title: "Fact or Opinion?",
      vnTitle: "Sự thật hay Ý kiến?",
      meta: "Testing a statement",
      text: [
        "On the test you must often decide whether a statement is a fact or an opinion. A fact can be checked and proven true: \"Women won the right to vote in 1920.\" You could look that up.",
        "An opinion is a belief or judgment that cannot be proven true or false: \"1920 was the most important year in American history.\" Someone else could disagree, and neither of you could prove it.",
        "Watch for opinion signal words such as best, worst, should, beautiful, terrible and I believe. They often mark a judgment. A source is not wrong for having opinions — but you must know which parts are facts you can trust and which are the writer's point of view.",
      ].join(" "),
      vnText: [
        "Trong bài thi, bạn thường phải quyết định một phát biểu là sự thật hay ý kiến. Một sự thật có thể kiểm chứng và chứng minh là đúng: \"Phụ nữ giành được quyền bầu cử năm 1920.\" Bạn có thể tra cứu điều đó.",
        "Một ý kiến là niềm tin hoặc phán xét không thể chứng minh đúng hay sai: \"1920 là năm quan trọng nhất trong lịch sử nước Mỹ.\" Người khác có thể không đồng ý, và không ai chứng minh được.",
        "Hãy để ý các từ báo hiệu ý kiến như hay nhất, tệ nhất, nên, đẹp, khủng khiếp và tôi tin rằng. Chúng thường đánh dấu một phán xét. Một nguồn không sai khi có ý kiến — nhưng bạn phải biết phần nào là sự thật đáng tin và phần nào là quan điểm của người viết.",
      ].join(" "),
      glossary: {
        "fact": { vn: "Sự thật", def: "A statement that can be checked and proven true." },
        "opinion": { vn: "Ý kiến", def: "A belief or judgment that cannot be proven true or false." },
      },
    },
    {
      id: "passage_3",
      title: "Reading a Political Cartoon",
      vnTitle: "Đọc một Bức tranh Biếm họa Chính trị",
      meta: "Symbols, exaggeration and purpose",
      text: [
        "A political cartoon is not just a funny drawing. The artist is making an argument, and every part of the picture is a clue. First, look for symbols — a picture that stands for a bigger idea, like a dollar sign for money or a snake for danger.",
        "Next, notice exaggeration. Cartoonists draw a person very fat, very small or very ugly on purpose, to say something about them. That choice tells you the artist's point of view.",
        "Finally, ask the two questions that matter most: what is the cartoonist's opinion, and who or what are they attacking or defending? A cartoon almost always shows bias — it takes a side. Your job is to name the side and the message, not to be fooled into thinking a drawing is neutral.",
      ].join(" "),
      vnText: [
        "Một bức tranh biếm họa chính trị không chỉ là hình vẽ vui. Người họa sĩ đang đưa ra một lập luận, và mỗi phần của bức tranh là một manh mối. Trước tiên, hãy tìm các biểu tượng — một hình ảnh đại diện cho ý lớn hơn, như dấu đô la cho tiền bạc hay con rắn cho sự nguy hiểm.",
        "Tiếp theo, hãy chú ý sự phóng đại. Họa sĩ cố ý vẽ một người rất béo, rất nhỏ hoặc rất xấu để nói điều gì đó về họ. Lựa chọn đó cho bạn biết quan điểm của người họa sĩ.",
        "Cuối cùng, hãy hỏi hai câu quan trọng nhất: ý kiến của người họa sĩ là gì, và họ đang công kích hay bảo vệ ai/điều gì? Một bức biếm họa gần như luôn thể hiện sự thiên vị — nó đứng về một phía. Việc của bạn là gọi tên phía đó và thông điệp, đừng bị lừa rằng một bức vẽ là trung lập.",
      ].join(" "),
      glossary: {
        "symbols": { vn: "Biểu tượng", def: "A picture that stands for a bigger idea." },
        "bias": { vn: "Thiên vị", def: "Favoring one side unfairly." },
      },
    },
  ],

  shortQA: [
    {
      id: "qa1",
      question: "What is the difference between a primary source and a secondary source? Give an example of each.",
      suggestedWords: [["there", "at the time"], ["later", "studied"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States a primary source is made by someone who was there at the time.",
        "States a secondary source is made later by someone who studied the event.",
        "Gives one correct example of each (e.g. a diary/photo vs a textbook).",
      ],
      modelAnswer: "A primary source is made by someone who was there at the time, such as a soldier's diary or a photograph taken during the event. A secondary source is made later by someone who studied the event but was not there, such as a history textbook.",
      vnTranslation: "Sự khác biệt giữa nguồn sơ cấp và nguồn thứ cấp là gì? Cho một ví dụ về mỗi loại.",
    },
    {
      id: "qa2",
      question: "How can you test whether a statement is a fact or an opinion?",
      suggestedWords: [["proven", "checked"], ["belief", "judgment"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States a fact can be checked and proven true.",
        "States an opinion is a belief or judgment that cannot be proven true or false.",
      ],
      modelAnswer: "A fact can be checked and proven true, so you can look it up and confirm it. An opinion is a belief or judgment that cannot be proven true or false, and another person could reasonably disagree with it.",
      vnTranslation: "Làm thế nào để kiểm tra một phát biểu là sự thật hay ý kiến?",
    },
    {
      id: "qa3",
      question: "Name two things you should look for when you read a political cartoon, and say what each one tells you.",
      suggestedWords: [["symbol", "symbols"], ["exaggeration", "point of view", "bias"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies symbols and explains they stand for a bigger idea.",
        "Identifies exaggeration (or a second technique) and explains it shows the artist's opinion.",
        "States that a cartoon takes a side / shows the cartoonist's point of view or bias.",
      ],
      modelAnswer: "First, look for symbols — pictures that stand for a bigger idea, such as a dollar sign for money. Second, look for exaggeration, where the artist draws someone in an unflattering way on purpose. Both clues reveal the cartoonist's point of view, because a cartoon almost always takes a side.",
      vnTranslation: "Hãy nêu hai điều cần chú ý khi đọc một bức tranh biếm họa chính trị, và cho biết mỗi điều nói lên điều gì.",
    },
    {
      id: "qa4",
      question: "Why is it useful to know the point of view of the person who made a source?",
      suggestedWords: [["side", "one side"], ["bias", "trust"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that every source is made from one person's point of view.",
        "Explains this can create bias, so knowing it helps you judge how far to trust the source.",
      ],
      modelAnswer: "Every source is made from one person's point of view, so it may leave things out or favor one side. Knowing whose point of view it is helps you spot possible bias and decide how far to trust what the source says.",
      vnTranslation: "Vì sao việc biết quan điểm của người tạo ra một nguồn lại hữu ích?",
    },
    {
      id: "qa5",
      question: "What does it mean to infer something from a source? Give a short example.",
      suggestedWords: [["clues", "not stated"], ["work out", "example"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that to infer is to work out something not stated directly, using clues.",
        "Gives a sensible example of an inference from a source.",
      ],
      modelAnswer: "To infer means to work out something the source does not say directly, using clues inside it. For example, if a photograph shows worn clothes and a worried face, you can infer that the family was poor, even though no words say so.",
      vnTranslation: "Suy luận điều gì đó từ một nguồn nghĩa là gì? Cho một ví dụ ngắn.",
    },
  ],

  // Source Analysis on REAL public-domain sources — one cartoon, one map, one
  // photograph, so the student practises three source types (imagery-sourcing.md,
  // docs/credits.md). ~2 MCQ : 1 written. The grader is blind, so the written
  // mark scheme and model answer describe the image in words.
  diagrams: [
    {
      id: "diag_1_nast_tammany",
      type: "mcq",
      // credit: "The Tammany Ring" / "Who stole the people's money? / 'Twas him",
      // Thomas Nast, Harper's Weekly, 1871 — public domain.
      imageFile: "nast_tammany_ring.jpg",
      imageAlt: "Thomas Nast's 1871 cartoon: a ring of well-dressed men, each pointing to the man beside him, standing for New York's corrupt Tammany politicians.",
      credit: "'The Tammany Ring', Thomas Nast, Harper's Weekly, 1871 — public domain",
      license: "Public domain",
      promptText: "In this 1871 cartoon, a group of powerful politicians who were accused of stealing public money stand in a circle. The caption asks, 'Who stole the people's money?' — and every man is pointing at the man next to him. What is the cartoonist's message?",
      options: [
        { val: "A", text: "They are all guilty, and each one just blames someone else.", textVn: "Tất cả họ đều có tội, và mỗi người chỉ đổ lỗi cho người khác." },
        { val: "B", text: "One honest man is being blamed unfairly by the others.", textVn: "Một người trung thực đang bị những người kia đổ lỗi oan." },
        { val: "C", text: "The politicians solved the theft together.", textVn: "Các chính khách đã cùng nhau giải quyết vụ trộm." },
        { val: "D", text: "Nobody in the picture had any power.", textVn: "Không ai trong tranh có quyền lực." },
      ],
      correct: "A",
      marks: 1,
      expEn: "The circle of pointing fingers is the joke: each man passes the blame to the next, so no one takes responsibility. Nast is saying the whole group is corrupt — a clear, biased attack, not a neutral report.",
      expVn: "Vòng tròn những ngón tay chỉ trỏ chính là điểm châm biếm: mỗi người đẩy lỗi sang người kế bên, nên không ai nhận trách nhiệm. Nast muốn nói cả nhóm đều tham nhũng — một sự công kích thiên vị rõ ràng, không phải bản tin trung lập.",
    },
    {
      id: "diag_2_free_slave_map",
      type: "mcq",
      // credit: "Free and slave territory in the United States, 1861" — Wikimedia
      // Commons (User:Golbez), CC BY-SA 4.0. A modern map of an 1861 situation.
      imageFile: "free_slave_map_1861.png",
      imageAlt: "A color-coded map of the United States in 1861 showing free states, slave states, and territories.",
      credit: "'Free and slave territory in the U.S., 1861', Golbez / Wikimedia — CC BY-SA 4.0",
      license: "CC BY-SA 4.0",
      promptText: "This map shows the United States in 1861. The legend (key) colors each area by whether slavery was allowed. What must you use to read a map like this correctly?",
      options: [
        { val: "A", text: "The legend, which tells you what each color means.", textVn: "Chú giải, cho biết mỗi màu có nghĩa là gì." },
        { val: "B", text: "The size of the letters in the title.", textVn: "Kích thước chữ trong tiêu đề." },
        { val: "C", text: "The year it was printed, and nothing else.", textVn: "Chỉ năm in, không gì khác." },
        { val: "D", text: "The name of the mapmaker.", textVn: "Tên người vẽ bản đồ." },
      ],
      correct: "A",
      marks: 1,
      expEn: "A map's legend (or key) is what turns its colors and symbols into meaning. Without reading the legend you cannot tell which regions allowed slavery and which did not.",
      expVn: "Chú giải của bản đồ là thứ biến màu sắc và ký hiệu thành ý nghĩa. Không đọc chú giải thì bạn không thể biết vùng nào cho phép chế độ nô lệ và vùng nào không.",
    },
    {
      id: "diag_3_migrant_mother",
      // credit: "Migrant Mother", Dorothea Lange, 1936 — U.S. Farm Security
      // Administration / Library of Congress. Public domain (US federal work).
      imageFile: "migrant_mother.jpg",
      imageAlt: "Dorothea Lange's 1936 photograph of a worried mother in worn clothes with two children turning away from the camera during the Great Depression.",
      credit: "'Migrant Mother', Dorothea Lange, 1936 — Library of Congress (FSA)",
      license: "Public domain",
      promptText: "This 1936 photograph was taken for the U.S. government during the Great Depression, a time when many families had no work. Look at the mother's face, her clothes, and the children. What can you INFER about this family's life, and why might the government have wanted people to see this photo?",
      suggestedWords: [["poor", "hard times", "no work"], ["infer", "worried"], ["help", "support"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Reads the image: the worn clothes, the worried expression and the clinging children show a family in hardship / poverty.",
        "Makes a supported inference — nothing states they are poor, but the clues let you work it out.",
        "Explains a likely purpose: to build sympathy and public support for helping struggling families during the Depression.",
      ],
      modelAnswer: "From the mother's deeply worried face, her worn clothing and the children pressing against her, I can infer that this family was very poor and living through hard times, even though nothing in the photo says so in words. The government likely wanted people to see this image to build sympathy for families hit by the Great Depression and to win public support for programs that would help them.",
      vnTranslation: "Bức ảnh năm 1936 này được chụp cho chính phủ Mỹ trong thời Đại Khủng hoảng, khi nhiều gia đình không có việc làm. Nhìn khuôn mặt người mẹ, quần áo và những đứa trẻ. Bạn có thể SUY LUẬN gì về cuộc sống của gia đình này, và vì sao chính phủ muốn mọi người xem bức ảnh?",
    },
  ],

  assessment,
  notes,
};
