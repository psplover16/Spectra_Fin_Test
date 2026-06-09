import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { containsBGroupAdvertisementText } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

describe('B group 114 source index', () => {
  const sourceIndex = getBGroupSourceIndex('114');

  it('defines six indexed essay questions from 114.pdf', () => {
    expect(sourceIndex).toHaveLength(6);
    expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(sourceIndex.every((entry) => entry.year === '114')).toBe(true);
    expect(sourceIndex.every((entry) => entry.fileName === '114.pdf')).toBe(true);
  });

  it('keeps source page, extraction status, and ad removal traceable', () => {
    expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual([1, 2, 3, 5, 6, 7]);

    sourceIndex.forEach((entry) => {
      expect(entry.originalExcerpt.trim().length).toBeGreaterThan(20);
      expect(entry.extractionStatus).toBe('verified');
      expect(entry.adContentRemoved).toBe(true);
      expect(containsBGroupAdvertisementText(entry.originalExcerpt)).toBe(false);
      expect(entry.originalExcerpt).not.toContain('公職王');
      expect(entry.originalExcerpt).not.toContain('public.com.tw');
    });
  });

  it('preserves the expected original question topics', () => {
    expect(sourceIndex[0]?.originalExcerpt).toContain('traceroute');
    expect(sourceIndex[0]?.originalExcerpt).toContain('TTL/ICMP');
    expect(sourceIndex[1]?.originalExcerpt).toContain('DoH/DoT');
    expect(sourceIndex[1]?.originalExcerpt).toContain('DNSSEC');
    expect(sourceIndex[2]?.originalExcerpt).toContain('IPv6');
    expect(sourceIndex[2]?.originalExcerpt).toContain('IPv4');
    expect(sourceIndex[3]?.originalExcerpt).toContain('isHappy');
    expect(sourceIndex[4]?.originalExcerpt).toContain('Java');
    expect(sourceIndex[5]?.originalExcerpt).toContain('SQL Injection');
    expect(sourceIndex[5]?.originalExcerpt).toContain('CSRF');
  });

  it('feeds the year summary question count from the confirmed source index', () => {
    const summary = B_GROUP_YEAR_SUMMARIES.find((candidate) => candidate.year === '114');

    expect(summary?.questionCount).toBe(sourceIndex.length);
    expect(summary?.status).toBe('indexed');
  });
});
