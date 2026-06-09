import { describe, expect, it } from 'vitest';
import {
  getAGroup113ContentReviewChecklist,
  getAGroup113SystematicNoviceTeachingFailures,
  validateAGroup113QuestionContent
} from '@/modules/examGroups/aGroup/data/years/113ContentReview';
import { questions } from '@/modules/examGroups/aGroup/data/years/113';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

function replaceQuestion(replacement: ExamQuestionAnalysis): ExamQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('113 A group content review checklist', () => {
  it('passes the full 113 question content review', () => {
    expect(getAGroup113SystematicNoviceTeachingFailures(questions)).toEqual([]);
    expect(validateAGroup113QuestionContent(questions)).toEqual([]);
    expect(getAGroup113ContentReviewChecklist(questions).every((check) => check.passed)).toBe(true);
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

    expect(validateAGroup113QuestionContent(replaceQuestion(shallowQuestion))).not.toEqual([]);
  });
});
