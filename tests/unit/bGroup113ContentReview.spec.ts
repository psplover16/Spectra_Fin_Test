import { describe, expect, it } from 'vitest';
import {
  getBGroupContentReviewChecklist,
  validateBGroupQuestionContent
} from '@/modules/examGroups/bGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/bGroup/data/years/113';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

function replaceQuestion(replacement: BGroupEssayQuestionAnalysis): BGroupEssayQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('B group 113 content review', () => {
  const config = { year: '113', fileName: '113.pdf' } as const;

  it('passes the B group content completeness checklist while retaining review flags', () => {
    expect(validateBGroupQuestionContent(questions, config)).toEqual([]);
    expect(getBGroupContentReviewChecklist(questions, config).every((check) => check.passed)).toBe(true);
  });

  it('rejects shallow essay content before it can be marked complete', () => {
    const shallowQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[1],
      questionExplanation: '太短',
      modelAnswer: 'Use PDCA.',
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
      ...questions[0],
      sourceRef: {
        ...questions[0].sourceRef,
        extractionStatus: 'verified'
      }
    };

    expect(validateBGroupQuestionContent(replaceQuestion(wrongSourceQuestion), config)).toContain(
      '每題 sourceRef 與年度 source index 一致'
    );
  });
});
