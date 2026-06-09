import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { containsBGroupAdvertisementText } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 109 source index', () => {
  const sourceIndex = getBGroupSourceIndex('109');

  it('defines six indexed essay questions from 109.pdf', () => {
    expect(sourceIndex).toHaveLength(6);
    expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sourceIndex.every((entry) => entry.year === '109')).toBe(true);
    expect(sourceIndex.every((entry) => entry.fileName === '109.pdf')).toBe(true);
  });

  it('keeps source page, extraction status, and ad removal traceable', () => {
    expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual([1, 2, 3, 3, 4, 5]);
    expect(sourceIndex.map((entry) => entry.extractionStatus)).toEqual([
      'needs-review',
      'verified',
      'verified',
      'verified',
      'needs-review',
      'verified'
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
    expect(sourceIndex[0]?.originalExcerpt).toContain('1NF');
    expect(sourceIndex[1]?.originalExcerpt).toContain('PaaS');
    expect(sourceIndex[2]?.originalExcerpt).toContain('APT');
    expect(sourceIndex[3]?.originalExcerpt).toContain('class B');
    expect(sourceIndex[4]?.originalExcerpt).toContain('leftchild');
    expect(sourceIndex[5]?.originalExcerpt).toContain('Maximum pairwise product');
  });

  it('feeds the year summary question count from the source index and keeps review status pending', () => {
    const summary = B_GROUP_YEAR_SUMMARIES.find((candidate) => candidate.year === '109');

    expect(summary?.questionCount).toBe(sourceIndex.length);
    expect(summary?.status).toBe('pending-review');
  });
});
