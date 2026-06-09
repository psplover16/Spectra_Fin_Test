import { describe, expect, it } from 'vitest';
import {
  getBGroupContentReviewChecklist,
  validateBGroupQuestionContent
} from '@/modules/examGroups/bGroup/data/years/contentReview';
import { questions } from '@/modules/examGroups/bGroup/data/years/114';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

function replaceQuestion(replacement: BGroupEssayQuestionAnalysis): BGroupEssayQuestionAnalysis[] {
  return questions.map((question) => (question.number === replacement.number ? replacement : question));
}

describe('B group 114 content review', () => {
  const config = { year: '114', fileName: '114.pdf' } as const;

  it('passes the B group content completeness checklist', () => {
    expect(validateBGroupQuestionContent(questions, config)).toEqual([]);
    expect(getBGroupContentReviewChecklist(questions, config)).toEqual([
      { label: '題號完整對應年度 source index', passed: true },
      { label: '每題 sourceRef 與年度 source index 一致', passed: true },
      { label: 'sourceBatch 維持每批 2 至 3 題', passed: true },
      {
        label: '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤',
        passed: true
      }
    ]);
  });

  it('rejects shallow essay content before it can be marked complete', () => {
    const shallowQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[0],
      questionExplanation: '太短',
      modelAnswer: 'Use traceroute.',
      modelAnswerDetails: [],
      scoringPoints: [],
      commonMistakes: []
    };

    expect(validateBGroupQuestionContent(replaceQuestion(shallowQuestion), config)).toContain(
      '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤'
    );
  });

  it('rejects content whose source trace no longer matches the source index', () => {
    const wrongSourceQuestion: BGroupEssayQuestionAnalysis = {
      ...questions[1],
      sourceRef: {
        ...questions[1].sourceRef,
        pageNumber: 99
      }
    };

    expect(validateBGroupQuestionContent(replaceQuestion(wrongSourceQuestion), config)).toContain(
      '每題 sourceRef 與年度 source index 一致'
    );
  });
});
