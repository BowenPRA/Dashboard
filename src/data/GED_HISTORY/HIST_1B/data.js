// src/data/GED_HISTORY/HIST_1B/data.js
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS: WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION,
// SHORT_ANSWERS, DIAGRAMS, ESSAY, ASSESSMENT, GAMES

export const GED_HIST_1B_DATA = {
  meta: {
    id: "HIST_1B",
    title: "Independence & The Constitution",
    desc: "From the Declaration to the Bill of Rights: how the United States built a government that limits its own power.",
    track: "GED_HISTORY",
    icon: "Landmark",
    themeColor: "bg-rose-500 border-rose-700"
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
      // SPELLING removed — never tested on the GED (GED-SPRINT.md §4). Source
      // Analysis (DIAGRAMS) sits in the Drill next to Reading, matching the
      // History unit shape; both are the reading-with-a-source skill the test uses.
      tasks: [
        { id: "READ_COMP", dbKey: "p4", maxXP: 20 },
        { id: "DIAGRAMS", dbKey: "p7", maxXP: 20 }
      ]
    },
    {
      id: "mastery",
      title: "Prove",
      threshold: 45,
      tasks: [
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 20 },
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 20 }
      ]
    }
  ],

  realWords: [
    { word: "Independence", vn: "Độc lập", def: "Freedom from being ruled or controlled by another country.", vnDef: "Sự tự do, không bị một quốc gia khác cai trị hoặc kiểm soát.", sent: "The colonies declared independence from Great Britain in 1776.", vnSent: "Các thuộc địa đã tuyên bố độc lập khỏi Vương quốc Anh vào năm 1776.", isReal: true },
    { word: "Declaration", vn: "Tuyên ngôn", def: "A formal public statement announcing an important decision.", vnDef: "Một tuyên bố công khai chính thức thông báo một quyết định quan trọng.", sent: "The Declaration of Independence explained why the colonies were separating.", vnSent: "Bản Tuyên ngôn Độc lập giải thích tại sao các thuộc địa lại ly khai.", isReal: true },
    { word: "Constitution", vn: "Hiến pháp", def: "The document that sets out how a government is organised and limited.", vnDef: "Văn bản quy định cách thức tổ chức và giới hạn của một chính phủ.", sent: "The Constitution divides power between three separate branches.", vnSent: "Hiến pháp phân chia quyền lực giữa ba nhánh riêng biệt.", isReal: true },
    { word: "Ratify", vn: "Phê chuẩn", def: "To formally approve something so that it becomes official.", vnDef: "Chính thức chấp thuận điều gì đó để nó có hiệu lực.", sent: "Nine states had to ratify the Constitution before it took effect.", vnSent: "Chín tiểu bang phải phê chuẩn Hiến pháp trước khi nó có hiệu lực.", isReal: true },
    { word: "Federalism", vn: "Chủ nghĩa liên bang", def: "A system where power is shared between a national government and the states.", vnDef: "Hệ thống trong đó quyền lực được chia sẻ giữa chính quyền quốc gia và các tiểu bang.", sent: "Because of federalism, your state runs schools while the nation prints money.", vnSent: "Nhờ chủ nghĩa liên bang, tiểu bang của bạn điều hành trường học trong khi quốc gia in tiền.", isReal: true },
    { word: "Legislative", vn: "Lập pháp", def: "The branch of government that makes the laws.", vnDef: "Nhánh chính quyền có nhiệm vụ làm ra luật.", sent: "Congress is the legislative branch, so it writes and passes bills.", vnSent: "Quốc hội là nhánh lập pháp, nên nó soạn thảo và thông qua các dự luật.", isReal: true },
    { word: "Executive", vn: "Hành pháp", def: "The branch of government that carries out and enforces the laws.", vnDef: "Nhánh chính quyền có nhiệm vụ thi hành và thực thi luật pháp.", sent: "The President leads the executive branch of the government.", vnSent: "Tổng thống lãnh đạo nhánh hành pháp của chính phủ.", isReal: true },
    { word: "Judicial", vn: "Tư pháp", def: "The branch of government that interprets the laws and settles disputes.", vnDef: "Nhánh chính quyền có nhiệm vụ giải thích luật pháp và giải quyết tranh chấp.", sent: "The judicial branch decides whether a law agrees with the Constitution.", vnSent: "Nhánh tư pháp quyết định xem một đạo luật có phù hợp với Hiến pháp hay không.", isReal: true },
    { word: "Amendment", vn: "Tu chính án", def: "An official change or addition made to the Constitution.", vnDef: "Một sự thay đổi hoặc bổ sung chính thức được thực hiện đối với Hiến pháp.", sent: "The First Amendment protects freedom of speech and religion.", vnSent: "Tu chính án thứ nhất bảo vệ quyền tự do ngôn luận và tôn giáo.", isReal: true },
    { word: "Veto", vn: "Phủ quyết", def: "The President's power to reject a bill passed by Congress.", vnDef: "Quyền của Tổng thống trong việc bác bỏ một dự luật đã được Quốc hội thông qua.", sent: "The President used a veto to stop the bill from becoming law.", vnSent: "Tổng thống đã dùng quyền phủ quyết để ngăn dự luật trở thành luật.", isReal: true }
  ],

  passages: [
    {
      id: "passage_1",
      title: "A Government That Could Not Govern",
      vnTitle: "Một Chính Phủ Không Thể Cai Trị",
      meta: "The Articles of Confederation",
      text: [
        "After winning {independence}, the new states were terrified of creating another king. Their first plan of government, the Articles of Confederation, therefore gave almost all the power to the states and left the central government deliberately weak.",
        "The result was close to chaos. Congress could request money from the states but could not tax them, so it could not pay the soldiers who had just won the war. There was no national army, no national court system, and every state printed its own currency.",
        "In 1786 an armed uprising of indebted farmers in Massachusetts made the danger obvious: the government had no way to restore order. Leaders met in Philadelphia in 1787 intending to repair the Articles, and quickly decided to write an entirely new {constitution} instead."
      ].join(" "),
      vnText: [
        "Sau khi giành được độc lập, các tiểu bang mới vô cùng lo sợ việc tạo ra một vị vua khác. Vì vậy, kế hoạch chính quyền đầu tiên của họ, Các Điều khoản Hợp bang, đã trao gần như toàn bộ quyền lực cho các tiểu bang và cố ý để chính quyền trung ương yếu ớt.",
        "Kết quả gần như là hỗn loạn. Quốc hội có thể yêu cầu tiền từ các tiểu bang nhưng không thể đánh thuế họ, nên không thể trả lương cho những người lính vừa mới thắng trận. Không có quân đội quốc gia, không có hệ thống tòa án quốc gia, và mỗi tiểu bang tự in tiền riêng.",
        "Năm 1786, một cuộc nổi dậy vũ trang của những nông dân mắc nợ ở Massachusetts đã cho thấy rõ mối nguy hiểm: chính quyền không có cách nào lập lại trật tự. Các nhà lãnh đạo họp tại Philadelphia năm 1787 với ý định sửa chữa Các Điều khoản, và nhanh chóng quyết định viết một bản hiến pháp hoàn toàn mới thay thế."
      ].join(" "),
      glossary: {
        "independence": { vn: "Độc lập", def: "Freedom from being ruled by another country." },
        "constitution": { vn: "Hiến pháp", def: "The document setting out how a government is organised." }
      }
    },
    {
      id: "passage_2",
      title: "Three Branches, One Purpose",
      vnTitle: "Ba Nhánh, Một Mục Đích",
      meta: "Separation of Powers",
      text: [
        "The Framers had watched one man hold too much power, so they split the new government into three parts. The {legislative} branch, Congress, writes the laws. The {executive} branch, led by the President, carries them out. The {judicial} branch, the courts, decides what the laws mean.",
        "Separating the work was not enough on its own, because any one branch might still grow too strong. So each branch was given tools to restrain the others, a design called checks and balances.",
        "The clearest example is the {veto}. Congress can pass a bill, but the President may refuse to sign it. Congress can then override that refusal with a two-thirds vote in both houses. Meanwhile the Supreme Court can rule that the law conflicts with the Constitution and strike it down entirely."
      ].join(" "),
      vnText: [
        "Những Người Lập Quốc đã chứng kiến một người nắm giữ quá nhiều quyền lực, nên họ chia chính quyền mới thành ba phần. Nhánh lập pháp, tức Quốc hội, soạn thảo luật. Nhánh hành pháp, do Tổng thống đứng đầu, thi hành luật. Nhánh tư pháp, tức các tòa án, quyết định ý nghĩa của luật.",
        "Chỉ phân chia công việc thôi là chưa đủ, vì bất kỳ nhánh nào cũng vẫn có thể trở nên quá mạnh. Vì vậy mỗi nhánh được trao những công cụ để kiềm chế các nhánh khác, một thiết kế gọi là kiểm soát và cân bằng.",
        "Ví dụ rõ ràng nhất là quyền phủ quyết. Quốc hội có thể thông qua một dự luật, nhưng Tổng thống có thể từ chối ký. Quốc hội sau đó có thể bác bỏ sự từ chối đó bằng hai phần ba số phiếu ở cả hai viện. Trong khi đó, Tòa án Tối cao có thể phán quyết rằng đạo luật xung đột với Hiến pháp và hủy bỏ hoàn toàn."
      ].join(" "),
      glossary: {
        "legislative": { vn: "Lập pháp", def: "The branch that makes the laws." },
        "executive": { vn: "Hành pháp", def: "The branch that carries out the laws." },
        "judicial": { vn: "Tư pháp", def: "The branch that interprets the laws." },
        "veto": { vn: "Phủ quyết", def: "The President's power to reject a bill." }
      }
    },
    {
      id: "passage_3",
      title: "The Price of Approval",
      vnTitle: "Cái Giá Của Sự Chấp Thuận",
      meta: "Ratification & the Bill of Rights",
      text: [
        "Writing the Constitution was only half the battle. Nine of the thirteen states had to {ratify} it before it could take effect, and many citizens were deeply suspicious of the new national government.",
        "Their objection was simple: the document explained how the government would work but said almost nothing about what it could never do to ordinary people. Several states agreed to approve it only on the promise that protections would be added immediately.",
        "That promise became the Bill of Rights, the first ten amendments, added in 1791. They guarantee freedoms such as speech, religion and a fair trial. Changing the Constitution again remains deliberately hard: an {amendment} needs two-thirds of Congress to propose it and three-quarters of the states to approve it, which is why only twenty-seven have ever passed."
      ].join(" "),
      vnText: [
        "Viết ra Hiến pháp mới chỉ là một nửa cuộc chiến. Chín trong số mười ba tiểu bang phải phê chuẩn nó trước khi nó có hiệu lực, và nhiều công dân hết sức nghi ngờ chính quyền quốc gia mới.",
        "Sự phản đối của họ rất đơn giản: văn bản giải thích chính quyền sẽ hoạt động ra sao nhưng gần như không nói gì về những điều mà chính quyền không bao giờ được làm với người dân thường. Một số tiểu bang chỉ đồng ý thông qua với lời hứa rằng các biện pháp bảo vệ sẽ được bổ sung ngay lập tức.",
        "Lời hứa đó trở thành Đạo luật Nhân quyền, tức mười tu chính án đầu tiên, được bổ sung năm 1791. Chúng đảm bảo các quyền tự do như ngôn luận, tôn giáo và xét xử công bằng. Việc thay đổi Hiến pháp một lần nữa vẫn cố ý khó khăn: một tu chính án cần hai phần ba Quốc hội đề xuất và ba phần tư các tiểu bang chấp thuận, đó là lý do chỉ có hai mươi bảy tu chính án từng được thông qua."
      ].join(" "),
      glossary: {
        "ratify": { vn: "Phê chuẩn", def: "To formally approve so that it becomes official." },
        "amendment": { vn: "Tu chính án", def: "An official change or addition to the Constitution." }
      }
    }
  ],

  shortQA: [

    {
      id: "qa2",
      question: "Give two specific weaknesses of the Articles of Confederation and explain why each caused problems.",
      suggestedWords: [["tax", "taxes"], ["army", "military"], ["Congress"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Identifies that Congress could not tax, only request money from states.",
        "Identifies a second weakness such as no national army or no national court system.",
        "Explains a consequence, such as being unable to pay soldiers or restore order."
      ],
      modelAnswer: "First, Congress could not tax the states; it could only ask them for money, so it could not pay the soldiers who had won the war. Second, there was no national army, which meant that when armed farmers rebelled in Massachusetts the government had no way to restore order.",
      vnTranslation: "Hãy nêu hai điểm yếu cụ thể của Các Điều khoản Hợp bang và giải thích tại sao mỗi điểm gây ra vấn đề."
    },
    {
      id: "qa3",
      question: "Name the three branches of government and state what each one does with the laws.",
      suggestedWords: [["legislative"], ["executive"], ["judicial"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States the legislative branch (Congress) makes the laws.",
        "States the executive branch (President) carries out or enforces the laws.",
        "States the judicial branch (courts) interprets the laws."
      ],
      modelAnswer: "The legislative branch is Congress, and it makes the laws. The executive branch is led by the President, and it carries out and enforces the laws. The judicial branch is the courts, and it interprets the laws and decides what they mean.",
      vnTranslation: "Hãy nêu tên ba nhánh của chính quyền và cho biết mỗi nhánh làm gì với luật pháp."
    },

    {
      id: "qa5",
      question: "Explain what a veto is and how Congress can respond to one.",
      suggestedWords: [["veto"], ["President"], ["override", "two-thirds", "2/3"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Defines a veto as the President rejecting a bill passed by Congress.",
        "States that Congress can override the veto.",
        "States that an override requires a two-thirds vote in both houses."
      ],
      modelAnswer: "A veto is the President's power to reject a bill that Congress has passed, stopping it from becoming law. Congress can respond by overriding the veto, but this requires a two-thirds vote in both the House and the Senate.",
      vnTranslation: "Hãy giải thích quyền phủ quyết là gì và Quốc hội có thể phản ứng ra sao."
    },
    {
      id: "qa6",
      question: "What is federalism, and give one power that belongs to the federal government and one that belongs to the states.",
      suggestedWords: [["federalism"], ["shared", "divided", "both"], ["states"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Defines federalism as power shared between a national government and the states.",
        "Gives a correct federal power, such as printing money or declaring war.",
        "Gives a correct state power, such as running schools or issuing licences."
      ],
      modelAnswer: "Federalism is a system in which power is shared between the national government and the state governments. The federal government alone can print money and declare war, while individual states run public schools and issue drivers' licences.",
      vnTranslation: "Chủ nghĩa liên bang là gì, và hãy nêu một quyền thuộc về chính quyền liên bang và một quyền thuộc về các tiểu bang."
    },

    {
      id: "qa8",
      question: "Why did several states refuse to approve the Constitution until a Bill of Rights was promised?",
      suggestedWords: [["rights", "freedoms"], ["protect", "protection"], ["government"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that the original document described how government works but did not list individual protections.",
        "States that citizens feared the new national government could take away their freedoms."
      ],
      modelAnswer: "The original Constitution explained how the government would work but said almost nothing about what it could never do to ordinary people. Many citizens feared the strong new national government might take away their freedoms, so they demanded written protections before agreeing to approve it.",
      vnTranslation: "Tại sao một số tiểu bang từ chối thông qua Hiến pháp cho đến khi Đạo luật Nhân quyền được hứa hẹn?"
    },

    {
      id: "qa10",
      question: "The Supreme Court can strike down a law passed by Congress and signed by the President. Explain how this is an example of checks and balances.",
      suggestedWords: [["judicial", "court", "Supreme Court"], ["unconstitutional", "Constitution"], ["power"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the judicial branch can rule a law unconstitutional.",
        "Identifies that this checks the legislative and executive branches.",
        "Explains the purpose: preventing the other branches from exceeding their power."
      ],
      modelAnswer: "The judicial branch can rule that a law conflicts with the Constitution and strike it down. This is a check on both the legislative branch, which wrote the law, and the executive branch, which signed it. It stops those two branches from exceeding the limits the Constitution places on their power.",
      vnTranslation: "Tòa án Tối cao có thể hủy bỏ một đạo luật do Quốc hội thông qua và Tổng thống ký. Hãy giải thích tại sao đây là ví dụ về kiểm soát và cân bằng."
    }
  ],

  // Source Analysis on REAL primary sources (GED-SPRINT.md §4, imagery-sourcing.md).
  // The GED Social Studies test hands students actual documents and cartoons to
  // read, so these items do too — the Constitution and Declaration themselves and
  // a 1787 ratification-debate cartoon, all public domain. The civics *structure*
  // diagrams (three branches, checks & balances) stay as teaching SVGs in notes.js,
  // which is what a schematic is for; a source-analysis item wants a real source.
  // ~2 MCQ : 1 written, matching the real test. The grader is blind, so every
  // written mark scheme and model answer describes the image in words.
  diagrams: [
    {
      id: "diag_1_constitution_preamble",
      type: "mcq",
      // credit: U.S. Constitution, page 1 (1787), engrossed copy — U.S. National
      // Archives and Records Administration. Public domain (US federal record).
      imageFile: "constitution_p1.jpg",
      imageAlt: "The handwritten first page of the United States Constitution, opening with the large words 'We the People'.",
      credit: "U.S. Constitution, page 1 (1787) — U.S. National Archives",
      license: "Public domain",
      promptText: "This is the first page of the U.S. Constitution. It opens with the words 'We the People of the United States…'. What does that opening tell you about where the government's power comes from?",
      options: [
        { val: "A", text: "The government's power comes from the people themselves, not from a king." },
        { val: "B", text: "The government's power comes from Great Britain." },
        { val: "C", text: "Only the thirteen state governments hold power." },
        { val: "D", text: "The Church chooses who governs the country." }
      ],
      correct: "A",
      marks: 1,
      expEn: "'We the People' means the Constitution's authority flows up from the citizens. This idea, popular sovereignty, is the opposite of a king ruling from above.",
      expVn: "'We the People' (Chúng ta, Nhân dân) nghĩa là quyền lực của Hiến pháp bắt nguồn từ người dân. Đây là ý tưởng chủ quyền nhân dân, trái ngược với việc một vị vua cai trị từ trên xuống."
    },
    {
      id: "diag_2_declaration_purpose",
      type: "mcq",
      // credit: United States Declaration of Independence (1776), engrossed copy —
      // U.S. National Archives. Public domain (US federal record).
      imageFile: "declaration.jpg",
      imageAlt: "The engrossed Declaration of Independence of 1776, a large handwritten document with the bold heading and many signatures below.",
      credit: "Declaration of Independence (1776) — U.S. National Archives",
      license: "Public domain",
      promptText: "This is the Declaration of Independence (1776). Most of its text is a long list of complaints against the King of Great Britain. What was the main PURPOSE of listing those complaints?",
      options: [
        { val: "A", text: "To justify to the world why the colonies were breaking away from the King." },
        { val: "B", text: "To set out the three branches of the new government." },
        { val: "C", text: "To ask Britain for lower taxes and then remain loyal." },
        { val: "D", text: "To describe how a bill becomes a law." }
      ],
      correct: "A",
      marks: 1,
      expEn: "The Declaration lists the King's abuses (grievances) to prove the colonies had good reasons to separate. It announces independence; it does not design the later government — that is the Constitution's job.",
      expVn: "Bản Tuyên ngôn liệt kê những lạm quyền của Nhà vua (các khiếu nại) để chứng minh các thuộc địa có lý do chính đáng để ly khai. Nó tuyên bố độc lập; nó không thiết kế chính quyền sau này — đó là việc của Hiến pháp."
    },
    {
      id: "diag_3_looking_glass_1787",
      // credit: "The Looking Glass for 1787. A house divided against itself cannot
      // stand," attributed to Amos Doolittle, 1787 — Library of Congress,
      // LCCN 2008661778. Public domain.
      imageFile: "looking_glass_1787.jpg",
      imageAlt: "A 1787 political cartoon showing a wagon of goods stuck in the mud while two groups of men pull it in opposite directions.",
      credit: "'The Looking Glass for 1787', Amos Doolittle — Library of Congress",
      license: "Public domain",
      promptText: "This 1787 cartoon shows a loaded wagon stuck in the mud while two groups pull it in opposite directions. Americans were arguing about whether to approve the new Constitution. Explain what the cartoon is saying about the country at that moment, and connect it to federalism — the sharing of power between the states and a national government.",
      suggestedWords: [["divided", "disagree", "opposite"], ["federalism"], ["states", "national government"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Reads the image: the wagon is stuck because the two groups pull it in opposite directions, showing the country divided and unable to move forward.",
        "Connects this to the 1787 debate over ratifying the Constitution — Americans disagreed about approving the new national government.",
        "Explains federalism as power shared between the states and a national government, which is the balance the argument was really about."
      ],
      modelAnswer: "The cartoon shows a wagon full of goods sunk in the mud while two teams of men haul it in opposite directions, so it goes nowhere. It is a picture of a country pulling against itself. In 1787 that division was the fight over whether to ratify the new Constitution: some wanted a stronger national government and others feared it would swallow the states. The real question underneath was federalism — how much power the national government should hold and how much should stay with the states. The cartoon warns that while the two sides pull opposite ways, the whole country stays stuck."
    }
  ],

  assessment,
  games,
  notes
};
