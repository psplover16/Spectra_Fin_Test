import { expect } from 'vitest';
import { getLanguageSourceIndex, type LanguageYear } from '@/modules/examGroups/language/data/sourceIndex';
import { LANGUAGE_YEAR_SUMMARIES } from '@/modules/examGroups/language/data/yearSummaries';
import { containsLanguageAdvertisementText } from '@/modules/examGroups/language/types/languageQuestionAnalysis';

export interface ExpectedLanguageSourceIndexShape {
  year: LanguageYear;
  pages: readonly (number | string)[];
  statuses: readonly string[];
  topics: readonly string[];
}

export function expectLanguageSourceIndexShape(expected: ExpectedLanguageSourceIndexShape): void {
  const sourceIndex = getLanguageSourceIndex(expected.year);

  expect(sourceIndex).toHaveLength(6);
  expect(sourceIndex.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
  expect(sourceIndex.map((entry) => entry.kind)).toEqual([
    'chinese-composition',
    'english-vocabulary',
    'english-grammar',
    'english-cloze',
    'english-cloze',
    'english-reading'
  ]);
  expect(sourceIndex.map((entry) => entry.questionType)).toEqual([
    'composition',
    'choice',
    'choice',
    'choice',
    'choice',
    'choice'
  ]);
  expect(sourceIndex.map((entry) => entry.pageNumber)).toEqual(expected.pages);
  expect(sourceIndex.map((entry) => entry.extractionStatus)).toEqual(expected.statuses);

  sourceIndex.forEach((entry) => {
    expect(entry.year).toBe(expected.year);
    expect(entry.fileName).toBe(`${expected.year}.pdf`);
    expect(entry.originalExcerpt.trim().length).toBeGreaterThan(30);
    expect(entry.adContentRemoved).toBe(true);
    expect(containsLanguageAdvertisementText(entry.originalExcerpt)).toBe(false);
    expect(entry.originalExcerpt).not.toContain('公職王');
    expect(entry.originalExcerpt).not.toContain('public.com.tw');
  });

  expected.topics.forEach((topic, index) => {
    expect(sourceIndex[index]?.originalExcerpt).toContain(topic);
  });

  const summary = LANGUAGE_YEAR_SUMMARIES.find((candidate) => candidate.year === expected.year);

  expect(summary?.questionCount).toBe(sourceIndex.length);
  expect(summary?.status).toBe(expected.statuses.every((status) => status === 'verified') ? 'indexed' : 'pending-review');
}
