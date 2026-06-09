import { B_GROUP_YEARS, getBGroupSourceIndex, type BGroupYear } from '@/modules/examGroups/bGroup/data/sourceIndex';

export { B_GROUP_YEARS };
export type { BGroupYear };

export type BGroupYearStatus = 'indexed' | 'pending-review';

export interface BGroupYearSummary {
  year: BGroupYear;
  routePath: `/b-group/${BGroupYear}`;
  status: BGroupYearStatus;
  questionCount: number;
  statusLabel: string;
}

export const B_GROUP_YEAR_SUMMARIES: readonly BGroupYearSummary[] = B_GROUP_YEARS.map((year) => {
  const sourceIndex = getBGroupSourceIndex(year);
  const isIndexed = sourceIndex.every((entry) => entry.extractionStatus === 'verified');

  return {
    year,
    routePath: `/b-group/${year}`,
    status: isIndexed ? 'indexed' : 'pending-review',
    questionCount: sourceIndex.length,
    statusLabel: isIndexed ? '題目索引已校對' : '題目索引待校對'
  };
});
