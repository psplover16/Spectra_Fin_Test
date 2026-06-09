import { questions } from '@/modules/examGroups/aGroup/data/years/112';
import {
  createSourceBaselineRows,
  getSourceBaselineReviewChecklist as getConfiguredSourceBaselineReviewChecklist,
  validateSourceBaseline as validateConfiguredSourceBaseline,
  type SourceBaselineFinding,
  type SourceBaselineReviewCheck,
  type SourceBaselineRow
} from '@/modules/examGroups/aGroup/data/years/sourceBaselineReview';

const SOURCE_BASELINE_CONFIG = {
  year: '112',
  fileName: '112.pdf',
  pageCount: 4
} as const;

export type { SourceBaselineFinding, SourceBaselineReviewCheck, SourceBaselineRow };

export const sourceBaselineRows: SourceBaselineRow[] = createSourceBaselineRows(questions);

export function getSourceBaselineReviewChecklist(
  rows: readonly SourceBaselineRow[] = sourceBaselineRows
): SourceBaselineReviewCheck[] {
  return getConfiguredSourceBaselineReviewChecklist(rows, SOURCE_BASELINE_CONFIG);
}

export function validateSourceBaseline(rows: readonly SourceBaselineRow[]): SourceBaselineFinding[] {
  return validateConfiguredSourceBaseline(rows, SOURCE_BASELINE_CONFIG);
}
