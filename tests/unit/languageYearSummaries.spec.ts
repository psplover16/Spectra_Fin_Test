import { describe, expect, it } from 'vitest';
import {
  LANGUAGE_YEARS,
  LANGUAGE_YEAR_SUMMARIES
} from '@/modules/examGroups/language/data/yearSummaries';
import { getLanguageSourceIndex } from '@/modules/examGroups/language/data/sourceIndex';

describe('language year summaries', () => {
  it('shows language source years in descending order without 113 or 114', () => {
    expect(LANGUAGE_YEARS).toEqual(['112', '111', '110', '109', '108', '107']);
    expect(LANGUAGE_YEAR_SUMMARIES.map((summary) => summary.year)).toEqual(LANGUAGE_YEARS);
    expect(LANGUAGE_YEAR_SUMMARIES.map((summary) => summary.year)).not.toContain('113');
    expect(LANGUAGE_YEAR_SUMMARIES.map((summary) => summary.year)).not.toContain('114');
  });

  it('derives each question count from the source index', () => {
    LANGUAGE_YEAR_SUMMARIES.forEach((summary) => {
      expect(summary.routePath).toBe(`/language/${summary.year}`);
      expect(summary.questionCount).toBe(getLanguageSourceIndex(summary.year).length);
      expect(summary.statusLabel.trim().length).toBeGreaterThan(0);
    });
  });
});
