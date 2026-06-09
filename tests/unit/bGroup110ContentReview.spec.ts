import { describe, expect, it } from 'vitest';
import {
  getBGroupContentReviewChecklist,
  validateBGroupQuestionContent
} from '@/modules/examGroups/bGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/bGroup/data/years/110';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

function replaceQuestion(replacement: BGroupEssayQuestionAnalysis): BGroupEssayQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('B group 110 content review', () => {
  const config = { year: '110', fileName: '110.pdf' } as const;

  it('passes the B group content completeness checklist', () => {
    expect(validateBGroupQuestionContent(questions, config)).toEqual([]);
    expect(getBGroupContentReviewChecklist(questions, config).every((check) => check.passed)).toBe(true);
  });

  it('rejects missing elevator scoring details', () => {
    const incompleteQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[5],
      modelAnswerDetails: [],
      scoringPoints: []
    };

    expect(validateBGroupQuestionContent(replaceQuestion(incompleteQuestion), config)).toContain(
      '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤'
    );
  });

  it('rejects a source trace that hides the extraction review state', () => {
    const wrongSourceQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[5],
      sourceRef: {
        ...questions[5].sourceRef,
        extractionStatus: 'verified'
      }
    };

    expect(validateBGroupQuestionContent(replaceQuestion(wrongSourceQuestion), config)).toContain(
      '每題 sourceRef 與年度 source index 一致'
    );
  });
});
