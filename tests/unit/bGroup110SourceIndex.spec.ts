import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { containsBGroupAdvertisementText } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 110 source index', () => {
  const sourceIndex = getBGroupSourceIndex('110');

  it('defines six indexed essay questions from 110.pdf', () => {
    expect(sourceIndex).toHaveLength(6);
    expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sourceIndex.every((entry) => entry.year === '110')).toBe(true);
    expect(sourceIndex.every((entry) => entry.fileName === '110.pdf')).toBe(true);
  });

  it('keeps source page, extraction status, and ad removal traceable', () => {
    expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual([1, 1, 3, 4, 5, 6]);
    expect(sourceIndex.map((entry) => entry.extractionStatus)).toEqual([
      'verified',
      'needs-review',
      'verified',
      'verified',
      'needs-review',
      'needs-review'
    ]);

    sourceIndex.forEach((entry) => {
      expect(entry.originalExcerpt.trim().length).toBeGreaterThan(20);
      expect(entry.adContentRemoved).toBe(true);
      expect(containsBGroupAdvertisementText(entry.originalExcerpt)).toBe(false);
      expect(entry.originalExcerpt).not.toContain('公職王');
      expect(entry.originalExcerpt).not.toContain('public.com.tw');
      expect(entry.originalExcerpt).not.toContain('https://');
    });
  });

  it('preserves the expected original question topics', () => {
    expect(sourceIndex[0]?.originalExcerpt).toContain('資訊系統');
    expect(sourceIndex[1]?.originalExcerpt).toContain('B3169');
    expect(sourceIndex[2]?.originalExcerpt).toContain('SQL Injection');
    expect(sourceIndex[3]?.originalExcerpt).toContain('CellNumber');
    expect(sourceIndex[4]?.originalExcerpt).toContain('GetNumber');
    expect(sourceIndex[5]?.originalExcerpt).toContain('SelElev');
  });

  it('feeds the year summary question count from the source index and keeps review status pending', () => {
    const summary = B_GROUP_YEAR_SUMMARIES.find((candidate) => candidate.year === '110');

    expect(summary?.questionCount).toBe(sourceIndex.length);
    expect(summary?.status).toBe('pending-review');
  });
});
