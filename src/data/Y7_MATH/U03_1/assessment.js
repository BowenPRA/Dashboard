// src/data/Y7_MATH/U03_1/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here. 1 the power counts the zeros, 2–3 multiplying (a decimal, then a
// decimal that starts with 0), 4–5 dividing with placeholder zeros, 6 the
// missing power, 7 metric mass, 8 a chain of two moves. Every distractor is a
// diagnosis: zeros stuck on after the point, the digits moved the wrong way,
// one place too few or too many, a lost placeholder, the zeros counted instead
// of the places, one step on the mass ladder instead of two.
// No item copies a deck check, a workbook question or a Slide the Digits item.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_power_zeros',
      type: 'mcq',
      title: '1. Which number is $$10^6$$?',
      options: [
        { val: 'A', text: 'A. $$60$$' },
        { val: 'B', text: 'B. $$100000$$' },
        { val: 'C', text: 'C. $$1000000$$' },
        { val: 'D', text: 'D. $$10000000$$' },
      ],
      correct: 'C',
      expEn: 'The power counts the zeros after the 1, so $$10^6$$ is a 1 followed by six zeros: $$1000000$$, one million. A multiplied 10 by the power. B has only five zeros — that is $$10^5$$. D has seven — that is $$10^7$$.',
      expVn: 'Số mũ đếm số chữ số 0 đứng sau số 1, nên $$10^6$$ là một số 1 và sáu số 0 theo sau: $$1000000$$, một triệu. A lấy 10 nhân với số mũ. B chỉ có năm số 0 — đó là $$10^5$$. D có bảy số 0 — đó là $$10^7$$.',
    },
    {
      id: 'a2_multiply_decimal',
      type: 'mcq',
      title: '2. Work out $$2.9 × 10^4$$.',
      options: [
        { val: 'A', text: 'A. $$2.90000$$' },
        { val: 'B', text: 'B. $$2900$$' },
        { val: 'C', text: 'C. $$290000$$' },
        { val: 'D', text: 'D. $$29000$$' },
      ],
      correct: 'D',
      expEn: 'Every digit moves 4 places left: the 2 lands in the ten-thousands and the 9 in the thousands, and the three empty columns get placeholder zeros: $$29000$$. A stuck four zeros on after the point, which is still $$2.9$$. B moved only 3 places. C took the point out and then added four zeros — that moves the digits 5 places.',
      expVn: 'Mọi chữ số dịch 4 cột sang trái: số 2 vào hàng chục nghìn và số 9 vào hàng nghìn, và ba cột trống cần số 0 giữ chỗ: $$29000$$. A thêm bốn số 0 vào sau phần thập phân, mà số đó vẫn là $$2.9$$. B chỉ dịch 3 cột. C bỏ dấu thập phân rồi thêm bốn số 0 — như vậy là dịch các chữ số 5 cột.',
    },
    {
      id: 'a3_multiply_small',
      type: 'mcq',
      title: '3. Work out $$0.025 × 10^4$$.',
      options: [
        { val: 'A', text: 'A. $$25$$' },
        { val: 'B', text: 'B. $$250$$' },
        { val: 'C', text: 'C. $$2500$$' },
        { val: 'D', text: 'D. $$0.0250000$$' },
      ],
      correct: 'B',
      expEn: 'Every digit moves 4 places left: the 2 lands in the hundreds and the 5 in the tens. The ones column is left empty, so it gets a placeholder 0: $$250$$. A moved only 3 places and C moved 5. D stuck four zeros on the end, which is still $$0.025$$.',
      expVn: 'Mọi chữ số dịch 4 cột sang trái: số 2 vào hàng trăm và số 5 vào hàng chục. Cột hàng đơn vị bị trống, nên cần một số 0 giữ chỗ: $$250$$. A chỉ dịch 3 cột, còn C dịch 5 cột. D thêm bốn số 0 vào cuối, mà số đó vẫn là $$0.025$$.',
    },
    {
      id: 'a4_divide_placeholders',
      type: 'mcq',
      title: '4. Work out $$68 ÷ 10^3$$.',
      options: [
        { val: 'A', text: 'A. $$0.068$$' },
        { val: 'B', text: 'B. $$0.68$$' },
        { val: 'C', text: 'C. $$0.0068$$' },
        { val: 'D', text: 'D. $$68000$$' },
      ],
      correct: 'A',
      expEn: 'Every digit moves 3 places right: the 6 lands in the hundredths and the 8 in the thousandths. The ones and tenths columns are left empty, so each needs a placeholder 0: $$0.068$$. B lost a placeholder — that is only 2 places. C moved 4 places. D moved the digits left, which is multiplying.',
      expVn: 'Mọi chữ số dịch 3 cột sang phải: số 6 vào hàng phần trăm và số 8 vào hàng phần nghìn. Cột hàng đơn vị và hàng phần mười bị trống, nên mỗi cột cần một số 0 giữ chỗ: $$0.068$$. B làm mất một số 0 giữ chỗ — như vậy chỉ là dịch 2 cột. C dịch 4 cột. D dịch các chữ số sang trái, tức là phép nhân.',
    },
    {
      id: 'a5_divide_decimal',
      type: 'mcq',
      title: '5. Work out $$4.5 ÷ 10^2$$.',
      options: [
        { val: 'A', text: 'A. $$450$$' },
        { val: 'B', text: 'B. $$0.45$$' },
        { val: 'C', text: 'C. $$0.045$$' },
        { val: 'D', text: 'D. $$0.0045$$' },
      ],
      correct: 'C',
      expEn: 'Every digit moves 2 places right: the 4 lands in the hundredths and the 5 in the thousandths, and the empty ones and tenths columns get placeholder zeros: $$0.045$$. A moved the digits left — that is $$4.5 × 10^2$$. B moved only one place. D wrote two zeros after the point instead of moving two places, which is three places.',
      expVn: 'Mọi chữ số dịch 2 cột sang phải: số 4 vào hàng phần trăm và số 5 vào hàng phần nghìn, và các cột trống ở hàng đơn vị và hàng phần mười cần số 0 giữ chỗ: $$0.045$$. A dịch các chữ số sang trái — đó là $$4.5 × 10^2$$. B chỉ dịch một cột. D viết hai số 0 sau dấu thập phân thay vì dịch hai cột, tức là đã dịch ba cột.',
    },
    {
      id: 'a6_missing_power',
      type: 'mcq',
      title: '6. $$7.3 × 10^n = 730000$$. What is the value of $$n$$?',
      options: [
        { val: 'A', text: 'A. $$4$$' },
        { val: 'B', text: 'B. $$6$$' },
        { val: 'C', text: 'C. $$100000$$' },
        { val: 'D', text: 'D. $$5$$' },
      ],
      correct: 'D',
      expEn: 'Follow the 7: it moves from the ones to the hundred-thousands, 5 places left, so $$n = 5$$. A counted the four zeros in $$730000$$ — but the 3 moved as well. B counted all six digits. C gave the number $$10^5$$ itself, not the power.',
      expVn: 'Theo dõi số 7: nó dịch từ hàng đơn vị lên hàng trăm nghìn, 5 cột sang trái, nên $$n = 5$$. A đếm bốn số 0 trong $$730000$$ — nhưng số 3 cũng đã dịch. B đếm cả sáu chữ số. C viết chính số $$10^5$$, không phải số mũ.',
    },
    {
      id: 'a7_mass',
      type: 'mcq',
      title: '7. A mouse has a mass of $$0.03$$ kg. What is its mass in milligrams?',
      options: [
        { val: 'A', text: 'A. $$30$$ mg' },
        { val: 'B', text: 'B. $$30000$$ mg' },
        { val: 'C', text: 'C. $$0.03000000$$ mg' },
        { val: 'D', text: 'D. $$0.00000003$$ mg' },
      ],
      correct: 'B',
      expEn: 'kg to g to mg is two steps down the ladder, so multiply by $$10^3$$ twice: $$× 10^6$$. The 3 moves 6 places left: $$30000$$ mg. A took only one step — $$30$$ is the mass in grams. C stuck six zeros on the end, which is still $$0.03$$. D divided, but a smaller unit needs a bigger number.',
      expVn: 'Từ kg sang g sang mg là hai bậc đi xuống thang, nên nhân với $$10^3$$ hai lần: $$× 10^6$$. Số 3 dịch 6 cột sang trái: $$30000$$ mg. A chỉ đi một bậc — $$30$$ là khối lượng tính theo gam. C thêm sáu số 0 vào cuối, mà số đó vẫn là $$0.03$$. D đã chia, nhưng đơn vị nhỏ hơn thì số đo phải lớn hơn.',
    },
    {
      id: 'a8_chain',
      type: 'mcq',
      title: '8. A number is multiplied by $$10^5$$ and then divided by $$10^2$$. Which single move does the same job?',
      options: [
        { val: 'A', text: 'A. $$× 10^3$$' },
        { val: 'B', text: 'B. $$× 10^7$$' },
        { val: 'C', text: 'C. $$÷ 10^3$$' },
        { val: 'D', text: 'D. $$× 10^{10}$$' },
      ],
      correct: 'A',
      expEn: 'Multiplying moves the digits 5 places left, then dividing moves them 2 places back to the right: $$5 − 2 = 3$$ places left overall, which is $$× 10^3$$. B added the two powers, as if both moves went left. C went the wrong way. D multiplied the two powers.',
      expVn: 'Phép nhân làm các chữ số dịch 5 cột sang trái, rồi phép chia làm chúng dịch ngược lại 2 cột sang phải: tổng cộng $$5 − 2 = 3$$ cột sang trái, tức là $$× 10^3$$. B cộng hai số mũ, như thể cả hai lần đều dịch sang trái. C đi sai chiều. D nhân hai số mũ với nhau.',
    },
  ],
};
