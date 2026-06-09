import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { questions } from '@/modules/examGroups/bGroup/data/years/112';
import {
  hasBGroupEssayQuestionAnalysisShape,
  hasNoBGroupAdvertisementText
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 112 question content', () => {
  const sourceIndex = getBGroupSourceIndex('112');

  it('contains one analysis for every indexed 112 source question', () => {
    expect(questions).toHaveLength(sourceIndex.length);
    expect(questions.map((question) => question.number)).toEqual(sourceIndex.map((entry) => entry.number));
    expect(questions.every((question) => question.year === '112')).toBe(true);
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

  it('keeps risky SQL and C extraction questions under review', () => {
    expect(questions.find((question) => question.number === 1)?.reviewStatus).toBe('needs-review');
    expect(questions.find((question) => question.number === 4)?.sourceRef.extractionStatus).toBe('needs-review');
    expect(questions.find((question) => question.number === 4)?.reviewStatus).toBe('needs-review');
  });

  it('keeps required textual diagram support for stack and ETL questions', () => {
    expect(questions.find((question) => question.number === 5)?.diagramInstructions).toContain('top');
    expect(questions.find((question) => question.number === 6)?.diagramInstructions).toContain('pipeline');
  });
});
