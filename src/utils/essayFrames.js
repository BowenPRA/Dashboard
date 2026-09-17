/**
 * The sentence-frame bank for the GED Extended Response.
 *
 * Frames are the highest-leverage ESL writing intervention there is: they take
 * the sentence-construction load off the student so the 45 minutes go on
 * judging the evidence rather than on assembling English. One shared bank,
 * grouped by the job each sentence does in the five-paragraph frame, shown in
 * the essay task's Frames pane and used by the planner. A unit may add its own
 * with `essay.frames`, appended to these.
 *
 * `___` marks the gap the student fills. The Vietnamese carries the frame's
 * meaning with the gap kept, so the student knows what the sentence DOES before
 * he knows every word in it.
 */

export const FRAME_STAGES = [
  { id: 'intro', label: 'Introduction', labelVn: 'Mở bài', hint: 'Say which source is better supported, and the one big reason.', hintVn: 'Nói nguồn nào được chứng minh tốt hơn, và lý do lớn nhất.' },
  { id: 'evidence', label: 'Give evidence', labelVn: 'Đưa bằng chứng', hint: 'Name the source and the specific detail — a number, a study, a result.', hintVn: 'Nêu tên nguồn và chi tiết cụ thể — một con số, một nghiên cứu, một kết quả.' },
  { id: 'evaluate', label: 'Judge the evidence', labelVn: 'Đánh giá bằng chứng', hint: 'Say WHY it is strong or weak. This is what separates a 1 from a 2.', hintVn: 'Nói VÌ SAO nó mạnh hay yếu. Đây là điều tách điểm 1 khỏi điểm 2.' },
  { id: 'contrast', label: 'Answer the other side', labelVn: 'Trả lời phía bên kia', hint: 'Admit what the weaker side gets right, then show what it misses.', hintVn: 'Thừa nhận điều phía yếu hơn nói đúng, rồi chỉ ra điều họ bỏ sót.' },
  { id: 'conclusion', label: 'Conclusion', labelVn: 'Kết luận', hint: 'Restate the judgement in new words. No new evidence here.', hintVn: 'Nhắc lại phán đoán bằng lời mới. Không thêm bằng chứng mới ở đây.' },
];

export const FRAMES = [
  // Introduction
  { stage: 'intro', text: 'Both sources discuss whether ___, but Source ___ is better supported because ___.', textVn: 'Cả hai nguồn bàn về việc ___, nhưng Nguồn ___ được chứng minh tốt hơn vì ___.' },
  { stage: 'intro', text: 'The author of Source 1 claims that ___, while the author of Source 2 argues that ___.', textVn: 'Tác giả Nguồn 1 cho rằng ___, trong khi tác giả Nguồn 2 lập luận rằng ___.' },
  { stage: 'intro', text: 'Although both writers make a case, the evidence in Source ___ is stronger.', textVn: 'Dù cả hai tác giả đều đưa ra lập luận, bằng chứng trong Nguồn ___ mạnh hơn.' },

  // Evidence
  { stage: 'evidence', text: 'According to Source ___, ___.', textVn: 'Theo Nguồn ___, ___.' },
  { stage: 'evidence', text: 'The author supports this claim with ___, which shows that ___.', textVn: 'Tác giả củng cố luận điểm này bằng ___, cho thấy rằng ___.' },
  { stage: 'evidence', text: 'For example, the source reports that ___.', textVn: 'Ví dụ, nguồn này cho biết rằng ___.' },
  { stage: 'evidence', text: 'The strongest evidence in Source ___ is ___.', textVn: 'Bằng chứng mạnh nhất trong Nguồn ___ là ___.' },

  // Evaluate
  { stage: 'evaluate', text: 'This evidence is strong because it is a measured result, not an opinion.', textVn: 'Bằng chứng này mạnh vì nó là một kết quả đo được, không phải một ý kiến.' },
  { stage: 'evaluate', text: 'This evidence is convincing because it comes from ___ and can be checked.', textVn: 'Bằng chứng này thuyết phục vì nó đến từ ___ và có thể kiểm chứng.' },
  { stage: 'evaluate', text: 'However, this claim is weak because the author gives no numbers to support it.', textVn: 'Tuy nhiên, luận điểm này yếu vì tác giả không đưa ra con số nào để chứng minh.' },
  { stage: 'evaluate', text: 'This is a prediction, not a result, so it proves less than it seems to.', textVn: 'Đây là một dự đoán, không phải kết quả, nên nó chứng minh được ít hơn vẻ ngoài.' },
  { stage: 'evaluate', text: 'The author of Source ___ never explains ___, which leaves a gap in the argument.', textVn: 'Tác giả Nguồn ___ không bao giờ giải thích ___, để lại một lỗ hổng trong lập luận.' },
  { stage: 'evaluate', text: 'The source relies on ___, which is an opinion rather than evidence.', textVn: 'Nguồn này dựa vào ___, vốn là ý kiến chứ không phải bằng chứng.' },

  // Contrast / concession
  { stage: 'contrast', text: 'It is true that ___. However, ___.', textVn: 'Đúng là ___. Tuy nhiên, ___.' },
  { stage: 'contrast', text: 'In contrast, Source ___ ___.', textVn: 'Ngược lại, Nguồn ___ ___.' },
  { stage: 'contrast', text: 'Source 2 makes a fair point about ___, but it does not answer ___.', textVn: 'Nguồn 2 nêu một điểm hợp lý về ___, nhưng không trả lời được ___.' },
  { stage: 'contrast', text: 'Even if ___ is correct, it does not change the fact that ___.', textVn: 'Ngay cả khi ___ là đúng, điều đó không thay đổi sự thật rằng ___.' },

  // Conclusion
  { stage: 'conclusion', text: 'In conclusion, Source ___ is better supported because ___.', textVn: 'Tóm lại, Nguồn ___ được chứng minh tốt hơn vì ___.' },
  { stage: 'conclusion', text: 'Therefore, the evidence shows that ___.', textVn: 'Vì vậy, bằng chứng cho thấy rằng ___.' },
  { stage: 'conclusion', text: 'For these reasons, the argument in Source ___ is the more convincing one.', textVn: 'Vì những lý do này, lập luận trong Nguồn ___ là thuyết phục hơn.' },
];

/** The shared bank plus any frames the unit adds, grouped by stage in order. */
export function framesByStage(extra = []) {
  const all = [...FRAMES, ...(Array.isArray(extra) ? extra : [])];
  return FRAME_STAGES.map((s) => ({ ...s, frames: all.filter((f) => f.stage === s.id) }));
}

/**
 * The five questions the planner asks, in the order the essay answers them.
 * Each maps onto one paragraph of the frame, so a filled plan IS an outline.
 */
export const PLAN_FIELDS = [
  { id: 'position', label: 'Which source is better supported, and why in one line?', labelVn: 'Nguồn nào được chứng minh tốt hơn, và vì sao (một dòng)?', placeholder: 'Source 2, because its evidence is measured and it answers the cost question.', stage: 'intro' },
  { id: 'strong', label: 'The stronger source: its best evidence, and why it is strong', labelVn: 'Nguồn mạnh hơn: bằng chứng tốt nhất, và vì sao nó mạnh', placeholder: 'Marsden had to buy unbudgeted vehicles — a measured, checkable result.', stage: 'evaluate' },
  { id: 'weak', label: 'The weaker source: its evidence, and what is missing or weak', labelVn: 'Nguồn yếu hơn: bằng chứng của nó, và điều gì thiếu hoặc yếu', placeholder: 'Ridership rose 30% in Elmwood — real, but the writer never says who pays.', stage: 'evaluate' },
  { id: 'concede', label: 'One fair point the weaker side makes, and your answer to it', labelVn: 'Một điểm hợp lý của phía yếu hơn, và câu trả lời của bạn', placeholder: 'Collecting fares does cost money; but that does not cover drivers and fuel.', stage: 'contrast' },
  { id: 'conclusion', label: 'Your conclusion in one sentence', labelVn: 'Kết luận của bạn trong một câu', placeholder: 'Source 2 is better supported because it follows the money to the end.', stage: 'conclusion' },
];
