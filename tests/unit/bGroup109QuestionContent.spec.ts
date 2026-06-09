import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { questions } from '@/modules/examGroups/bGroup/data/years/109';
import {
  hasBGroupEssayQuestionAnalysisShape,
  hasNoBGroupAdvertisementText
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 109 question content', () => {
  const sourceIndex = getBGroupSourceIndex('109');

  it('contains one analysis for every indexed 109 source question', () => {
    expect(questions).toHaveLength(sourceIndex.length);
    expect(questions.map((question) => question.number)).toEqual(sourceIndex.map((entry) => entry.number));
    expect(questions.every((question) => question.year === '109')).toBe(true);
  });

  it('keeps source references aligned with the source index', () => {
    questions.forEach((question) => {
      const sourceIndexEntry = sourceIndex.find((entry) => entry.number === question.number);

      expect(question.sourceRef).toEqual({
        fileName: sourceIndexEntry?.fileName,
        pageNumber: sourceIndexEntry?.pageNumber,
        originalExcerpt: sourceIndexEntry?.originalExcerpt,
        extractionStatus: sourceIndexEntry?.extractionStatus,
        adContentRemoved: sourceIndexEntry?.adContentRemoved
      });
    });
  });

  it('uses the traceable B group essay analysis shape with no advertisement text', () => {
    questions.forEach((question) => {
      expect(hasBGroupEssayQuestionAnalysisShape(question)).toBe(true);
      expect(hasNoBGroupAdvertisementText(question)).toBe(true);
      expect(question.modelAnswerDetails.length).toBeGreaterThanOrEqual(2);
      expect(question.scoringPoints.length).toBeGreaterThanOrEqual(3);
      expect(question.commonMistakes.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('keeps high-risk normalization and tree-mirror questions under review', () => {
    expect(questions.find((question) => question.number === 1)?.reviewStatus).toBe('needs-review');
    expect(questions.find((question) => question.number === 5)?.reviewStatus).toBe('needs-review');
  });

  it('keeps controlled review batches at two to three questions per batch', () => {
    const batchSizes = questions.reduce<Record<string, number>>((accumulator, question) => {
      accumulator[question.sourceBatch] = (accumulator[question.sourceBatch] ?? 0) + 1;
      return accumulator;
    }, {});

    expect(Object.values(batchSizes)).toEqual([3, 3]);
  });
});
