import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { containsBGroupAdvertisementText } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 107 source index', () => {
  const sourceIndex = getBGroupSourceIndex('107');

  it('defines six indexed essay questions from 107.pdf', () => {
    expect(sourceIndex).toHaveLength(6);
    expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sourceIndex.every((entry) => entry.year === '107')).toBe(true);
    expect(sourceIndex.every((entry) => entry.fileName === '107.pdf')).toBe(true);
  });

  it('keeps source page, extraction status, and ad removal traceable', () => {
    expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual([1, 2, 3, 3, 4, 4]);
    expect(sourceIndex.map((entry) => entry.extractionStatus)).toEqual([
      'verified',
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
    expect(sourceIndex[0]?.originalExcerpt).toContain('大資料平台');
    expect(sourceIndex[1]?.originalExcerpt).toContain('NoSQL');
    expect(sourceIndex[2]?.originalExcerpt).toContain('資通安全管理法');
    expect(sourceIndex[3]?.originalExcerpt).toContain('Session');
    expect(sourceIndex[4]?.originalExcerpt).toContain('Regular Expression');
    expect(sourceIndex[5]?.originalExcerpt).toContain('Circular Queue');
  });

  it('feeds the year summary question count from the confirmed source index', () => {
    const summary = B_GROUP_YEAR_SUMMARIES.find((candidate) => candidate.year === '107');

    expect(summary?.questionCount).toBe(sourceIndex.length);
    expect(summary?.status).toBe('indexed');
  });
});
