import { describe, expect, it } from 'vitest';

import { createAGroupYearQuestions } from '@/modules/examGroups/aGroup/data/years/yearQuestionFactory';

describe('createAGroupYearQuestions', () => {
  it('preserves a reviewed null answer note instead of falling back to pending copy', () => {
    const [question] = createAGroupYearQuestions(
      '111',
      [
        {
          number: 1,
          answers: ['A'],
          pageNumber: 1,
          topic: 'sample topic',
          stem: 'sample stem',
          options: {
            A: 'correct',
            B: 'wrong B',
            C: 'wrong C',
            D: 'wrong D'
          },
          tags: ['sample'],
          extractionStatus: 'verified'
        }
      ],
      {
        1: {
          answerVerification: 'verified',
          answerNote: null,
          coreTerms: ['sample'],
          beginnerExplanation:
            '前置觀念：已完成解析。\n判斷規則：依題幹判斷。\n套用到本題：答案 A 成立。\n常見混淆：不要把待審查文案帶到已審查題。',
          solvingSteps: ['讀題幹。', '比對選項。', '確認 A。'],
          optionExplanations: {
            A: 'A 正確。',
            B: 'B 錯誤。',
            C: 'C 錯誤。',
            D: 'D 錯誤。'
          },
          keyTakeaways: ['已 reviewed 題目的 null answerNote 代表不顯示備註。'],
          tags: ['reviewed']
        }
      }
    );

    expect(question.answerVerification).toBe('verified');
    expect(question.answerNote).toBeNull();
  });
});
