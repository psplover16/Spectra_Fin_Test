import { describe, expect, it } from 'vitest';
import {
  getAGroupContentReviewChecklist,
  validateAGroupQuestionContent
} from '@/modules/examGroups/aGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/aGroup/data/years/114';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const reviewConfig = {
  year: '114',
  fileName: '114.pdf'
} as const;

function replaceQuestion(replacement: ExamQuestionAnalysis): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('A group content review helper', () => {
  it('keeps the 114 reviewed content passing through the shared rubric', () => {
    expect(validateAGroupQuestionContent(questions, reviewConfig)).toEqual([]);
    expect(getAGroupContentReviewChecklist(questions, reviewConfig).map((check) => check.label)).toEqual([
      '50 題題號唯一且連續',
      '每題皆有 A 至 D 原始選項與四份選項辨析',
      '每題皆有非空 tags、PDF sourceRef 與官方答案狀態',
      '多答案與送分題皆保留人工複核註記',
      '風險 PDF 抽取題保留人工確認狀態',
      '每題皆有專業教學解析、解題步驟與重點整理',
      '每題皆符合新手系統教學解析標準'
    ]);
  });

  it('rejects multi-answer records that are incorrectly marked as ordinary verified answers', () => {
    const invalidMultiAnswerQuestion: ExamQuestionAnalysis = {
      ...questions[0],
      acceptedAnswers: ['B', 'C'],
      answerVerification: 'verified',
      answerNote: null
    };

    expect(validateAGroupQuestionContent(replaceQuestion(invalidMultiAnswerQuestion), reviewConfig)).toContain(
      '多答案與送分題皆保留人工複核註記'
    );
  });

  it('accepts all-awarded records only when they keep a review note', () => {
    const allAwardedQuestion: ExamQuestionAnalysis = {
      ...questions[0],
      acceptedAnswers: ['A', 'B', 'C', 'D'],
      answerVerification: 'needs-review',
      answerNote: 'PDF 題本標示一律送分，學習時仍保留原題解析並提醒答案狀態。'
    };

    expect(validateAGroupQuestionContent(replaceQuestion(allAwardedQuestion), reviewConfig)).not.toContain(
      '多答案與送分題皆保留人工複核註記'
    );
  });

  it.each([
    {
      field: 'beginnerExplanation',
      patch: { beginnerExplanation: '' }
    },
    {
      field: 'solvingSteps',
      patch: { solvingSteps: [] }
    },
    {
      field: 'optionExplanations',
      patch: {
        optionExplanations: {
          A: '',
          B: questions[0].optionExplanations.B,
          C: questions[0].optionExplanations.C,
          D: questions[0].optionExplanations.D
        }
      }
    },
    {
      field: 'keyTakeaways',
      patch: { keyTakeaways: [] }
    }
  ])('rejects merge candidates missing $field', ({ patch }) => {
    const incompleteQuestion: ExamQuestionAnalysis = {
      ...questions[0],
      ...patch
    };

    expect(validateAGroupQuestionContent(replaceQuestion(incompleteQuestion), reviewConfig)).not.toEqual([]);
  });
});
