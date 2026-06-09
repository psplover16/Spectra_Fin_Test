import { describe, expect, it } from 'vitest';
import {
  getBGroupContentReviewChecklist,
  validateBGroupQuestionContent
} from '@/modules/examGroups/bGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/bGroup/data/years/111';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

function replaceQuestion(replacement: BGroupEssayQuestionAnalysis): BGroupEssayQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('B group 111 content review', () => {
  const config = { year: '111', fileName: '111.pdf' } as const;

  it('passes the B group content completeness checklist', () => {
    expect(validateBGroupQuestionContent(questions, config)).toEqual([]);
    expect(getBGroupContentReviewChecklist(questions, config).every((check) => check.passed)).toBe(true);
  });

  it('rejects shallow QuickSort teaching content', () => {
    const shallowQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[5],
      questionExplanation: '太短',
      modelAnswer: 'Use quicksort.',
      modelAnswerDetails: [],
      scoringPoints: [],
      commonMistakes: []
    };

    expect(validateBGroupQuestionContent(replaceQuestion(shallowQuestion), config)).toContain(
      '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤'
    );
  });

  it('rejects source traces that drift away from the source index', () => {
    const wrongSourceQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[4],
      sourceRef: {
        ...questions[4].sourceRef,
        extractionStatus: 'verified'
      }
    };

    expect(validateBGroupQuestionContent(replaceQuestion(wrongSourceQuestion), config)).toContain(
      '每題 sourceRef 與年度 source index 一致'
    );
  });
});
