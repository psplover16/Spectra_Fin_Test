import { describe, expect, it } from 'vitest';
import {
  B_GROUP_YEARS,
  B_GROUP_YEAR_SUMMARIES
} from '@/modules/examGroups/bGroup/data/yearSummaries';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';

describe('B group year summaries', () => {
  it('shows B group years in descending order', () => {
    expect(B_GROUP_YEARS).toEqual(['114', '113', '112', '111', '110', '109', '108', '107']);
    expect(B_GROUP_YEAR_SUMMARIES.map((summary) => summary.year)).toEqual(B_GROUP_YEARS);
  });

  it('derives each question count from the source index', () => {
    B_GROUP_YEAR_SUMMARIES.forEach((summary) => {
      expect(summary.routePath).toBe(`/b-group/${summary.year}`);
      expect(summary.questionCount).toBe(getBGroupSourceIndex(summary.year).length);
      expect(summary.statusLabel.trim().length).toBeGreaterThan(0);
    });
  });

  it('derives year status from source index extraction review state', () => {
    B_GROUP_YEAR_SUMMARIES.filter((summary) => ['114', '107'].includes(summary.year)).forEach((summary) => {
      expect(summary).toMatchObject({
          status: 'indexed',
          statusLabel: '題目索引已校對'
      });
    });

    B_GROUP_YEAR_SUMMARIES.filter((summary) => ['113', '112', '111', '110', '109', '108'].includes(summary.year)).forEach((summary) => {
      expect(summary).toMatchObject({
          status: 'pending-review',
          statusLabel: '題目索引待校對'
      });
    });
  });

  it('keeps reviewed source index entries traceable without hard-coded placeholder pages', () => {
    B_GROUP_YEARS.forEach((year) => {
      const sourceIndex = getBGroupSourceIndex(year);

      expect(sourceIndex).toHaveLength(6);
      expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
      sourceIndex.forEach((entry) => {
        expect(entry.year).toBe(year);
        expect(entry.fileName).toBe(`${year}.pdf`);
        expect(entry.pageNumber).not.toBe('pending');
        expect(entry.originalExcerpt.trim().length).toBeGreaterThan(20);
        expect(entry.adContentRemoved).toBe(true);
      });
    });
  });
});
