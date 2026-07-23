import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';

// VALID TASK IDS FOR AI CONTEXT: 
// WORD_REC, NOTES, WORKBOOK, SPELLING, READ_COMP, DICTATION, SHORT_ANSWERS, ESSAY, ASSESSMENT, GAMES

export const HIST_1A_DATA = {
  meta: {
    id: "HIST_1A",
    title: "Colonial America & The Road to Revolution",
    desc: "Explore the foundation of the 13 Colonies and the growing economic and political tensions that led to American independence.",
    track: "GED_HISTORY",
    icon: "Landmark",
    themeColor: "bg-blue-600 border-blue-800"
  },
  
  phases: [
    {
      id: "concept",
      title: "Phase 0: Core Concepts",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 15 },
        { id: "WORD_REC", dbKey: "p1", maxXP: 15 }
      ]
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 20, 
      tasks: [
        { id: "SPELLING", dbKey: "p2", maxXP: 15 },   
        { id: "READ_COMP", dbKey: "p4", maxXP: 15 },
        { id: "SHORT_ANSWERS", dbKey: "p6", maxXP: 25 }
      ]
    },
    {
      id: "mastery",
      title: "Phase 2: Mastery",
      threshold: 40, 
      tasks: [
        { id: "ASSESSMENT", dbKey: "p9", maxXP: 15 }
      ]
    }
  ],

  realWords: [
    { word: "Colony", vn: "Thuộc địa", def: "A territory settled and controlled by people from a distant land.", vnDef: "Một vùng lãnh thổ được định cư và kiểm soát bởi những người từ một vùng đất xa xôi.", sent: "Massachusetts was established as a British colony in the 1600s.", vnSent: "Massachusetts được thành lập như một thuộc địa của Anh vào những năm 1600.", isReal: true },
    { word: "Mercantilism", vn: "Chủ nghĩa Trọng thương", def: "An economic policy where a nation builds wealth by exploiting its colonies.", vnDef: "Một chính sách kinh tế trong đó một quốc gia xây dựng sự giàu có bằng cách bóc lột các thuộc địa của mình.", sent: "Under mercantilism, the colonies could only trade their raw materials with Great Britain.", vnSent: "Dưới chủ nghĩa trọng thương, các thuộc địa chỉ có thể giao dịch nguyên liệu thô của họ với Vương quốc Anh.", isReal: true },
    { word: "Parliament", vn: "Nghị viện", def: "The legislative (law-making) body of Great Britain.", vnDef: "Cơ quan lập pháp (làm luật) của Vương quốc Anh.", sent: "The British Parliament passed several new taxes on the American colonies.", vnSent: "Nghị viện Anh đã thông qua một số loại thuế mới đối với các thuộc địa ở Mỹ.", isReal: true },
    { word: "Grievance", vn: "Khiếu nại", def: "A formal complaint over something believed to be wrong or unfair.", vnDef: "Một lời phàn nàn chính thức về một điều gì đó được cho là sai trái hoặc bất công.", sent: "The colonists drafted a list of their grievances against the King.", vnSent: "Những người dân thuộc địa đã soạn thảo một danh sách các khiếu nại của họ chống lại Nhà vua.", isReal: true },
    { word: "Boycott", vn: "Tẩy chay", def: "A refusal to buy or use goods as a form of protest.", vnDef: "Sự từ chối mua hoặc sử dụng hàng hóa như một hình thức phản đối.", sent: "To protest the new taxes, the colonists organized a boycott of British tea.", vnSent: "Để phản đối các loại thuế mới, những người dân thuộc địa đã tổ chức tẩy chay trà của Anh.", isReal: true },
    { word: "Repeal", vn: "Bãi bỏ", def: "To officially cancel or revoke a law.", vnDef: "Chính thức hủy bỏ hoặc thu hồi một đạo luật.", sent: "The successful boycott forced the government to repeal the Stamp Act.", vnSent: "Cuộc tẩy chay thành công đã buộc chính phủ phải bãi bỏ Đạo luật Tem.", isReal: true },
    { word: "Militia", vn: "Dân quân", def: "A military force raised from the civil population.", vnDef: "Một lực lượng quân sự được tuyển mộ từ dân sự.", sent: "Farmers and shopkeepers joined the local militia to defend their town.", vnSent: "Nông dân và chủ cửa hàng đã tham gia lực lượng dân quân địa phương để bảo vệ thị trấn của họ.", isReal: true },
    { word: "Tyranny", vn: "Sự bạo ngược", def: "Cruel, unreasonable, or arbitrary use of power or control.", vnDef: "Việc sử dụng quyền lực hoặc kiểm soát một cách tàn nhẫn, vô lý hoặc độc đoán.", sent: "The Americans fought a war to escape what they viewed as British tyranny.", vnSent: "Người Mỹ đã tiến hành một cuộc chiến tranh để thoát khỏi những gì họ coi là sự bạo ngược của Anh.", isReal: true },
    { word: "Patriot", vn: "Người yêu nước", def: "A colonist who rejected British rule over the colonies.", vnDef: "Một người dân thuộc địa bác bỏ sự cai trị của Anh đối với các thuộc địa.", sent: "The patriot gave a passionate speech demanding independence from Great Britain.", vnSent: "Người yêu nước đã có một bài phát biểu đầy nhiệt huyết đòi độc lập khỏi Vương quốc Anh.", isReal: true },
    { word: "Loyalist", vn: "Người trung thành", def: "A colonist who remained loyal to the British Crown.", vnDef: "Một người dân thuộc địa vẫn trung thành với Vương miện Anh.", sent: "The loyalist argued that rebelling against the King was a dangerous crime.", vnSent: "Người trung thành lập luận rằng nổi loạn chống lại Nhà vua là một tội ác nguy hiểm.", isReal: true }
  ],

  passages: [
    {
      id: "passage_1",
      title: "The Economics of Empire",
      vnTitle: "Nền Kinh tế của Đế chế",
      meta: "Historical Context",
      text: [
        "In the 1600s, Great Britain established a series of colonies along the Atlantic coast of North America. Geography deeply influenced how these regions developed. The New England colonies had rocky soil, so they relied on shipbuilding. The Middle colonies had a moderate climate perfect for growing wheat. The Southern colonies had a warm climate, allowing them to grow profitable cash crops using enslaved labor.",
        "Britain did not create these settlements just for exploration; they wanted wealth. They used an economic system called {mercantilism}. Under this system, the colonies were treated as a source of cheap raw materials, like timber and tobacco.",
        "The colonies were then forced to buy expensive manufactured goods, such as clothing and iron tools, exclusively from Great Britain. This system ensured that the wealth always flowed back to the British Empire."
      ].join(" "),
      vnText: [
        "Vào những năm 1600, Vương quốc Anh đã thiết lập một loạt các thuộc địa dọc theo bờ biển Đại Tây Dương của Bắc Mỹ. Địa lý ảnh hưởng sâu sắc đến cách các khu vực này phát triển. Các thuộc địa New England có đất nhiều sỏi đá, vì vậy họ dựa vào việc đóng tàu. Các thuộc địa Trung bộ có khí hậu ôn hòa hoàn hảo để trồng lúa mì. Các thuộc địa Nam bộ có khí hậu ấm áp, cho phép họ trồng các loại cây công nghiệp sinh lời bằng cách sử dụng lao động nô lệ.",
        "Anh không tạo ra những khu định cư này chỉ để khám phá; họ muốn của cải. Họ sử dụng một hệ thống kinh tế được gọi là chủ nghĩa trọng thương. Theo hệ thống này, các thuộc địa được coi là nguồn nguyên liệu thô giá rẻ, như gỗ và thuốc lá.",
        "Các thuộc địa sau đó buộc phải mua các mặt hàng sản xuất đắt tiền, chẳng hạn như quần áo và dụng cụ bằng sắt, độc quyền từ Vương quốc Anh. Hệ thống này đảm bảo rằng của cải luôn chảy ngược về Đế quốc Anh."
      ].join(" "),
      glossary: {
        "mercantilism": { vn: "Chủ nghĩa trọng thương", def: "An economic policy where a nation builds wealth by exploiting its colonies." }
      }
    },
    {
      id: "passage_2",
      title: "The End of Salutary Neglect",
      vnTitle: "Sự Kết thúc của Việc Bỏ mặc Hữu ích",
      meta: "Road to Revolution",
      text: [
        "For many decades, Britain practiced a policy known as Salutary Neglect. Because the colonies were an ocean away, the British {parliament} did not strictly enforce trade laws and mostly left the Americans to govern themselves.",
        "This changed drastically after the French and Indian War (1754–1763). Britain won the territory, but the war left them with massive debt. To pay off this debt, Britain ended Salutary Neglect and began taxing the colonists heavily.",
        "The colonists were shocked. Having enjoyed self-government for generations, they viewed these sudden taxes as a form of {tyranny}."
      ].join(" "),
      vnText: [
        "Trong nhiều thập kỷ, Anh đã thực hiện một chính sách được gọi là Bỏ mặc Hữu ích. Bởi vì các thuộc địa cách xa một đại dương, Nghị viện Anh đã không thực thi nghiêm ngặt các luật thương mại và hầu như để cho người Mỹ tự quản lý.",
        "Điều này thay đổi mạnh mẽ sau Chiến tranh Pháp và Người Da đỏ (1754–1763). Anh đã giành được lãnh thổ, nhưng cuộc chiến đã để lại cho họ khoản nợ khổng lồ. Để trả khoản nợ này, Anh đã chấm dứt việc Bỏ mặc Hữu ích và bắt đầu đánh thuế nặng nề đối với người dân thuộc địa.",
        "Những người dân thuộc địa đã bị sốc. Từng được hưởng quyền tự trị trong nhiều thế hệ, họ coi những khoản thuế đột ngột này là một hình thức của sự bạo ngược."
      ].join(" "),
      glossary: {
        "parliament": { vn: "Nghị viện", def: "The legislative (law-making) body of Great Britain." },
        "tyranny": { vn: "Sự bạo ngược", def: "Cruel, unreasonable, or arbitrary use of power." }
      }
    },
    {
      id: "passage_3",
      title: "A Boiling Point in Boston",
      vnTitle: "Điểm Sôi ở Boston",
      meta: "Key Events",
      text: [
        "The primary {grievance} of the American colonists was not just the taxes themselves, but the fact that they had no elected voice in the government passing them. Their famous slogan became 'No taxation without representation.'",
        "To fight back, colonists organized a massive {boycott} of British goods. Tensions peaked in Massachusetts. In 1770, an angry mob confronted British soldiers, resulting in the Boston Massacre. Three years later, protesters dumped heavily taxed tea into the harbor during the Boston Tea Party.",
        "Refusing to {repeal} the taxes, Britain punished the colonists with harsh new military laws. In response, local {militia} units began stockpiling weapons, pushing the two sides closer to all-out war."
      ].join(" "),
      vnText: [
        "Khiếu nại chính của những người dân thuộc địa Mỹ không chỉ là bản thân các khoản thuế, mà là thực tế họ không có tiếng nói dân cử trong chính phủ thông qua chúng. Khẩu hiệu nổi tiếng của họ trở thành 'Không đóng thuế nếu không có đại diện.'",
        "Để chống trả, những người dân thuộc địa đã tổ chức một cuộc tẩy chay quy mô lớn đối với hàng hóa của Anh. Căng thẳng lên đến đỉnh điểm ở Massachusetts. Năm 1770, một đám đông giận dữ đối đầu với binh lính Anh, dẫn đến vụ Thảm sát Boston. Ba năm sau, những người biểu tình đã đổ loại trà bị đánh thuế nặng xuống bến cảng trong Bữa tiệc Trà Boston.",
        "Từ chối bãi bỏ các khoản thuế, Anh trừng phạt những người dân thuộc địa bằng các luật quân sự mới khắc nghiệt. Đáp lại, các đơn vị dân quân địa phương bắt đầu dự trữ vũ khí, đẩy hai bên đến gần hơn với một cuộc chiến tranh toàn diện."
      ].join(" "),
      glossary: {
        "grievance": { vn: "Khiếu nại", def: "A formal complaint over something believed to be wrong." },
        "boycott": { vn: "Tẩy chay", def: "A refusal to buy goods as a form of protest." },
        "repeal": { vn: "Bãi bỏ", def: "To officially cancel a law." },
        "militia": { vn: "Dân quân", def: "A military force raised from the civil population." }
      }
    }
  ],

  shortQA: [
    {
      id: "qa1",
      question: "Why did the New England, Middle, and Southern colonies develop completely different economies?",
      requiredWords: [["geography", "climate", "soil"], ["New England"], ["South", "Southern"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Links the differences to geography, soil or climate.",
        "Describes New England's cold, rocky land leading to shipbuilding, fishing or timber.",
        "Describes the South's warm climate and fertile soil leading to cash-crop plantations."
      ],
      modelAnswer: "Their economies differed because of geography. New England had cold weather and rocky soil, so people turned to shipbuilding, fishing and timber. The Middle colonies had a moderate climate good for growing wheat and grain. The South had warm weather and fertile soil, which suited large plantations growing cash crops like tobacco.",
      vnTranslation: "Tại sao các thuộc địa New England, Trung bộ và Nam bộ lại phát triển các nền kinh tế hoàn toàn khác nhau?"
    },
    {
      id: "qa2",
      question: "Explain the economic policy of mercantilism and how it affected the colonies.",
      requiredWords: [["mercantilism"], ["raw materials", "resources"], ["manufactured", "finished goods"]],
      scienceMaxMarks: 3,
      markScheme: [
        "Defines mercantilism as a system where the mother country builds wealth through controlled trade.",
        "States that Britain took cheap raw materials from the colonies.",
        "States that the colonies were forced to buy back expensive manufactured goods."
      ],
      modelAnswer: "Mercantilism is an economic system in which a mother country builds up wealth by controlling trade with its colonies. Britain bought cheap raw materials such as timber and tobacco from the colonies, then sold manufactured goods back to them at high prices. The colonies were not allowed to trade freely with other nations, so the wealth flowed to Britain.",
      vnTranslation: "Hãy giải thích chính sách kinh tế của chủ nghĩa trọng thương và cách nó ảnh hưởng đến các thuộc địa."
    },

    {
      id: "qa4",
      question: "How did the end of the French and Indian War change the relationship between Great Britain and the colonies?",
      requiredWords: [["debt"], ["tax", "taxes", "taxation"], ["neglect", "control"]],
      scienceMaxMarks: 3,
      markScheme: [
        "States that the war left Britain with an enormous debt.",
        "Explains that Britain ended Salutary Neglect and tightened control to raise money.",
        "States that new taxes on the colonists damaged the relationship."
      ],
      modelAnswer: "The war left Great Britain with an enormous debt. To pay it off, Britain ended its policy of Salutary Neglect and began enforcing control over the colonies again, imposing heavy new taxes on the colonists. The colonists resented paying for a war debt they had no say in, and the relationship quickly soured.",
      vnTranslation: "Sự kết thúc của Chiến tranh Pháp và Người Da đỏ đã thay đổi mối quan hệ giữa Vương quốc Anh và các thuộc địa như thế nào?"
    },
    {
      id: "qa5",
      question: "What did the colonists mean when they shouted 'No taxation without representation'?",
      requiredWords: [["representation", "represent", "representative"], ["Parliament"], ["unfair", "consent"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Explains that the colonists had no elected representatives in the British Parliament.",
        "Explains that they therefore considered the taxes unfair or illegitimate."
      ],
      modelAnswer: "They meant that Parliament had no right to tax them because the colonists were not allowed to elect any representatives to speak for them in that Parliament. Without a voice in the government imposing the tax, they viewed the taxation as unfair and without their consent.",
      vnTranslation: "Những người dân thuộc địa có ý gì khi họ hô vang 'Không đóng thuế nếu không có đại diện'?"
    },

    {
      id: "qa7",
      question: "Why did the British Parliament eventually decide to repeal the Stamp Act?",
      requiredWords: [["boycott", "boycotts"], ["merchants", "money", "profits"]],
      scienceMaxMarks: 2,
      markScheme: [
        "States that widespread colonial boycotts sharply cut British sales.",
        "Explains that British merchants losing money pressured Parliament to repeal the Act."
      ],
      modelAnswer: "Parliament repealed the Stamp Act because the widespread colonial boycotts of British goods caused British merchants to lose a great deal of money. Those merchants then pressured their own government to cancel the tax so that trade could return to normal.",
      vnTranslation: "Tại sao Nghị viện Anh cuối cùng đã quyết định bãi bỏ Đạo luật Tem?"
    },

    {
      id: "qa9",
      question: "What was the primary difference between a Patriot and a Loyalist?",
      requiredWords: [["Patriot"], ["Loyalist"], ["independence", "independent"]],
      scienceMaxMarks: 2,
      markScheme: [
        "Defines a Patriot as a colonist who wanted independence from Britain.",
        "Defines a Loyalist as a colonist who wanted to stay loyal to the British King."
      ],
      modelAnswer: "A Patriot was a colonist who rejected British rule and wanted the colonies to become an independent country. A Loyalist was a colonist who believed they should remain faithful subjects of the British King and stay part of the empire.",
      vnTranslation: "Sự khác biệt chính giữa Người Yêu nước và Người Trung thành là gì?"
    },

  ],

  assessment,
  games,
  notes
};