import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { containsBGroupAdvertisementText } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 113 source index', () => {
  const sourceIndex = getBGroupSourceIndex('113');

  it('defines six indexed essay questions from 113.pdf', () => {
    expect(sourceIndex).toHaveLength(6);
    expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sourceIndex.every((entry) => entry.year === '113')).toBe(true);
    expect(sourceIndex.every((entry) => entry.fileName === '113.pdf')).toBe(true);
  });

  it('keeps source page, extraction status, and ad removal traceable', () => {
    expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual([1, 3, 3, 6, 7, 9]);
    expect(sourceIndex.map((entry) => entry.extractionStatus)).toEqual([
      'needs-review',
      'verified',
      'verified',
      'verified',
      'verified',
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
    expect(sourceIndex[0]?.originalExcerpt).toContain('Product');
    expect(sourceIndex[0]?.originalExcerpt).toContain('鐵粉');
    expect(sourceIndex[0]?.originalExcerpt).toContain('B+ tree');
    expect(sourceIndex[1]?.originalExcerpt).toContain('SaaS');
    expect(sourceIndex[1]?.originalExcerpt).toContain('PDCA');
    expect(sourceIndex[2]?.originalExcerpt).toContain('UML');
    expect(sourceIndex[3]?.originalExcerpt).toContain('JBHCDIGAEF');
    expect(sourceIndex[3]?.originalExcerpt).toContain('AVL');
    expect(sourceIndex[4]?.originalExcerpt).toContain('InsertionSort');
    expect(sourceIndex[4]?.originalExcerpt).toContain('isInverse');
    expect(sourceIndex[5]?.originalExcerpt).toContain('2^30');
    expect(sourceIndex[5]?.originalExcerpt).toContain('|a - b|');
  });

  it('feeds the year summary question count from the confirmed source index', () => {
    const summary = B_GROUP_YEAR_SUMMARIES.find((candidate) => candidate.year === '113');

    expect(summary?.questionCount).toBe(sourceIndex.length);
    expect(summary?.status).toBe('pending-review');
  });
});
