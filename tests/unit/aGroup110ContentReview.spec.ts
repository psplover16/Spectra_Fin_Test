import { describe, expect, it } from 'vitest';
import {
  getAGroup110ContentReviewChecklist,
  getAGroup110SystematicNoviceTeachingFailures,
  validateAGroup110QuestionContent
} from '@/modules/examGroups/aGroup/data/years/110ContentReview';
import { questions } from '@/modules/examGroups/aGroup/data/years/110';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

function replaceQuestion(replacement: ExamQuestionAnalysis): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('110 A group content review checklist', () => {
  it('passes the full 110 question content review', () => {
    expect(getAGroup110SystematicNoviceTeachingFailures(questions)).toEqual([]);
    expect(validateAGroup110QuestionContent(questions)).toEqual([]);
    expect(getAGroup110ContentReviewChecklist(questions).every((check) => check.passed)).toBe(true);
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

    expect(validateAGroup110QuestionContent(replaceQuestion(shallowQuestion))).not.toEqual([]);
  });
});
