import {
  getLanguageSourceIndex,
  LANGUAGE_YEARS,
  type LanguageYear
} from '@/modules/examGroups/language/data/sourceIndex';

export { LANGUAGE_YEARS };
export type { LanguageYear };

export type LanguageYearStatus = 'indexed' | 'pending-review';

export interface LanguageYearSummary {
  year: LanguageYear;
  routePath: `/language/${LanguageYear}`;
  status: LanguageYearStatus;
  questionCount: number;
  statusLabel: string;
}

export const LANGUAGE_YEAR_SUMMARIES: readonly LanguageYearSummary[] = LANGUAGE_YEARS.map((year) => {
  const sourceIndex = getLanguageSourceIndex(year);
  const isIndexed =
    sourceIndex.length > 0 && sourceIndex.every((entry) => entry.extractionStatus === 'verified');

  return {
    year,
    routePath: `/language/${year}`,
    status: isIndexed ? 'indexed' : 'pending-review',
    questionCount: sourceIndex.length,
    statusLabel: isIndexed ? '題目索引已校對' : '題目索引待校對'
  };
});
