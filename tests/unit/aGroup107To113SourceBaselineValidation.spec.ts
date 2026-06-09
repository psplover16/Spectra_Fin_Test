import { describe, expect, it } from 'vitest';
import type { SourceBaselineRow } from '@/modules/examGroups/aGroup/data/years/sourceBaselineReview';
import {
  sourceBaselineRows as sourceBaselineRows107,
  validateSourceBaseline as validateSourceBaseline107
} from '@/modules/examGroups/aGroup/data/years/107SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows108,
  validateSourceBaseline as validateSourceBaseline108
} from '@/modules/examGroups/aGroup/data/years/108SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows109,
  validateSourceBaseline as validateSourceBaseline109
} from '@/modules/examGroups/aGroup/data/years/109SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows110,
  validateSourceBaseline as validateSourceBaseline110
} from '@/modules/examGroups/aGroup/data/years/110SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows111,
  validateSourceBaseline as validateSourceBaseline111
} from '@/modules/examGroups/aGroup/data/years/111SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows112,
  validateSourceBaseline as validateSourceBaseline112
} from '@/modules/examGroups/aGroup/data/years/112SourceBaseline';
import {
  sourceBaselineRows as sourceBaselineRows113,
  validateSourceBaseline as validateSourceBaseline113
} from '@/modules/examGroups/aGroup/data/years/113SourceBaseline';

const historicalBaselines = [
  { year: '107', rows: sourceBaselineRows107, validate: validateSourceBaseline107 },
  { year: '108', rows: sourceBaselineRows108, validate: validateSourceBaseline108 },
  { year: '109', rows: sourceBaselineRows109, validate: validateSourceBaseline109 },
  { year: '110', rows: sourceBaselineRows110, validate: validateSourceBaseline110 },
  { year: '111', rows: sourceBaselineRows111, validate: validateSourceBaseline111 },
  { year: '112', rows: sourceBaselineRows112, validate: validateSourceBaseline112 },
  { year: '113', rows: sourceBaselineRows113, validate: validateSourceBaseline113 }
] as const;

function replaceFirstRow(
  rows: readonly SourceBaselineRow[],
  patch: (row: SourceBaselineRow) => SourceBaselineRow
): SourceBaselineRow[] {
  return rows.map((row, index) => (index === 0 ? patch(row) : row));
}

describe('107 through 113 A group source baseline validation', () => {
  it.each(historicalBaselines)('reports missing questions for $year', ({ rows, validate }) => {
    const findings = validate(rows.filter((row) => row.number !== 1));

    expect(findings).toContain('Expected 50 source rows, received 49.');
    expect(findings).toContain('Missing question number: 1.');
  });

  it.each(historicalBaselines)('reports missing options for $year', ({ rows, validate }) => {
    const findings = validate(
      replaceFirstRow(rows, (row) => ({
        ...row,
        options: { ...row.options, D: '' }
      }))
    );

    expect(findings).toContain('Question 1 option D is empty.');
  });

  it.each(historicalBaselines)('reports unusable PDF page references for $year', ({ year, rows, validate }) => {
    const findings = validate(
      replaceFirstRow(rows, (row) => ({
        ...row,
        sourceRef: { ...row.sourceRef, pageNumber: 99 }
      }))
    );

    expect(findings).toContain(`Question 1 is missing a usable ${year}.pdf source reference.`);
  });
});
