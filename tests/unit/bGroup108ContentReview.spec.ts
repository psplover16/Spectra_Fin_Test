import { describe, expect, it } from 'vitest';
import {
  getBGroupContentReviewChecklist,
  validateBGroupQuestionContent
} from '@/modules/examGroups/bGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/bGroup/data/years/108';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

function replaceQuestion(replacement: BGroupEssayQuestionAnalysis): BGroupEssayQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('B group 108 content review', () => {
  const config = { year: '108', fileName: '108.pdf' } as const;

  it('passes the B group content completeness checklist', () => {
    expect(validateBGroupQuestionContent(questions, config)).toEqual([]);
    expect(getBGroupContentReviewChecklist(questions, config).every((check) => check.passed)).toBe(true);
  });

  it('rejects incomplete BST explanation', () => {
    const incompleteQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[4],
      modelAnswerDetails: [],
      scoringPoints: []
    };

    expect(validateBGroupQuestionContent(replaceQuestion(incompleteQuestion), config)).toContain(
      '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤'
    );
  });

  it('rejects a source trace with a mismatched page number', () => {
    const wrongSourceQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[3],
      sourceRef: {
        ...questions[3].sourceRef,
        pageNumber: 3
      }
    };

    expect(validateBGroupQuestionContent(replaceQuestion(wrongSourceQuestion), config)).toContain(
      '每題 sourceRef 與年度 source index 一致'
    );
  });
});
