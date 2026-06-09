import { describe, expect, it } from 'vitest';
import {
  getAGroup112ContentReviewChecklist,
  getAGroup112SystematicNoviceTeachingFailures,
  validateAGroup112QuestionContent
} from '@/modules/examGroups/aGroup/data/years/112ContentReview';
import { validateRiskyExtractionReview } from '@/modules/examGroups/aGroup/data/years/riskyExtractionReview';
import { questions } from '@/modules/examGroups/aGroup/data/years/112';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

function replaceQuestion(replacement: ExamQuestionAnalysis): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('112 A group content review checklist', () => {
  it('passes the full 112 question content review', () => {
    expect(getAGroup112SystematicNoviceTeachingFailures(questions)).toEqual([]);
    expect(validateAGroup112QuestionContent(questions)).toEqual([]);
    expect(getAGroup112ContentReviewChecklist(questions)).toEqual([
      { label: '50 題題號唯一且連續', passed: true },
      { label: '每題皆有 A 至 D 原始選項與四份選項辨析', passed: true },
      { label: '每題皆有非空 tags、PDF sourceRef 與官方答案狀態', passed: true },
      { label: '多答案與送分題皆保留人工複核註記', passed: true },
      { label: '風險 PDF 抽取題保留人工確認狀態', passed: true },
      { label: '每題皆有專業教學解析、解題步驟與重點整理', passed: true },
      { label: '每題皆符合新手系統教學解析標準', passed: true }
    ]);
  });

  it('rejects shallow teaching content before merge', () => {
    const shallowQuestion: ExamQuestionAnalysis = {
      ...questions[0],
      beginnerExplanation: '答案是 PDF 標示的選項，直接選即可。',
      solvingSteps: ['看 PDF 答案。', '選出答案。'],
      optionExplanations: {
        A: '不是答案。',
        B: '不是答案。',
        C: '是答案。',
        D: '不是答案。'
      },
      keyTakeaways: ['記住答案。']
    };

    expect(validateAGroup112QuestionContent(replaceQuestion(shallowQuestion))).not.toEqual([]);
  });

  it('requires a confirmed list entry before a risky extraction can be treated as verified', () => {
    expect(
      validateRiskyExtractionReview(questions, {
        year: '112',
        confirmedQuestionNumbers: []
      })
    ).toEqual([
      '112-Q033 is marked verified before manual extraction confirmation: repeated or misplaced text requires manual confirmation.'
    ]);

    expect(
      validateRiskyExtractionReview(questions, {
        year: '112',
        confirmedQuestionNumbers: [33]
      })
    ).toEqual([]);
  });
});
