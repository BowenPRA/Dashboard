// src/data/Y7_MATH/U01_1/data.js
// 1.1 Adding & Subtracting Integers — see docs/y7-math-course.md
import { notes } from './notes.js';
import { workbook } from './workbook.js';

export const U01_1_DATA = {
  meta: {
    id: "U01_1",
    title: "Adding & Subtracting Integers",
    desc: "Add and subtract positive and negative integers using a number line.",
    track: "Y7_MATH",
    icon: "Hash",
  },
  phases: [
    {
      id: "concept",
      title: "Phase 0: Lesson",
      threshold: 0,
      tasks: [
        { id: "NOTES", dbKey: "p10", maxXP: 50 },
      ],
    },
    {
      id: "practice",
      title: "Phase 1: Practice",
      threshold: 40,
      tasks: [
        { id: "WORKBOOK", dbKey: "p11", maxXP: 50 },
      ],
    },
  ],
  // Key words (§ Cambridge 1.1). Kept for future vocab tasks; not yet in a phase.
  realWords: [
    {
      word: "Integer", vn: "Số nguyên",
      def: "A whole number that can be positive, negative, or zero.",
      vnDef: "Một số nguyên vẹn, có thể là dương, âm hoặc bằng không.",
      sent: "The number line shows every integer from -5 to 5.",
      vnSent: "Trục số hiển thị mọi số nguyên từ -5 đến 5.",
      dictSent: "An integer never has a fraction or a decimal part.",
      isReal: true,
    },
    {
      word: "Inverse", vn: "Số đối",
      def: "The opposite of a number; the inverse of 5 is -5.",
      vnDef: "Số ngược dấu của một số; số đối của 5 là -5.",
      sent: "To subtract a number, you can add its inverse.",
      vnSent: "Để trừ một số, em có thể cộng số đối của nó.",
      dictSent: "The inverse of a negative integer is a positive integer.",
      isReal: true,
    },
    {
      word: "Number line", vn: "Trục số",
      def: "A line on which numbers are placed in order from small to large.",
      vnDef: "Một đường thẳng trên đó các số được sắp xếp theo thứ tự từ nhỏ đến lớn.",
      sent: "Moving right along the number line makes a value larger.",
      vnSent: "Di chuyển sang phải trên trục số làm cho giá trị lớn hơn.",
      dictSent: "Zero sits in the middle of this number line.",
      isReal: true,
    },
    {
      word: "Positive", vn: "Số dương",
      def: "A number greater than zero.",
      vnDef: "Một số lớn hơn không.",
      sent: "Adding a positive integer moves you right on the number line.",
      vnSent: "Cộng một số dương làm em đi sang phải trên trục số.",
      dictSent: "A positive number is written without a minus sign.",
      isReal: true,
    },
    {
      word: "Negative", vn: "Số âm",
      def: "A number less than zero, written with a minus sign.",
      vnDef: "Một số nhỏ hơn không, được viết với dấu trừ.",
      sent: "Subtracting a negative is the same as adding.",
      vnSent: "Trừ một số âm thì giống như cộng.",
      dictSent: "A negative integer is always to the left of zero.",
      isReal: true,
    },
  ],
  notes,
  workbook,
};
