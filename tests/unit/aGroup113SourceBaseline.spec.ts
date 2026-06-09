import { describe, expect, it } from 'vitest';
import { ANSWER_OPTIONS } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import {
  getSourceBaselineReviewChecklist,
  sourceBaselineRows,
  validateSourceBaseline
} from '@/modules/examGroups/aGroup/data/years/113SourceBaseline';

describe('113 A group source extraction baseline', () => {
  it('contains one source row for each 113 question', () => {
    expect(sourceBaselineRows).toHaveLength(50);
    expect(sourceBaselineRows.map((row) => row.number)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1)
    );
  });

  it('maps every row to original exam content, official answer, and PDF sourceRef', () => {
    for (const row of sourceBaselineRows) {
      expect(row.originalStem.trim().length).toBeGreaterThan(0);
      expect(row.officialAnswers.length).toBeGreaterThan(0);
      expect(row.officialAnswers.every((answer) => ANSWER_OPTIONS.includes(answer))).toBe(true);
      expect(Object.keys(row.options).sort()).toEqual([...ANSWER_OPTIONS]);
      expect(ANSWER_OPTIONS.every((option) => row.options[option].trim().length > 0)).toBe(true);
      expect(row.sourceRef.year).toBe('113');
      expect(row.sourceRef.fileName).toBe('113.pdf');
      expect(row.sourceRef.pageNumber).toBeGreaterThan(0);
      expect(row.sourceRef.pageNumber).toBeLessThanOrEqual(4);
      expect(row.sourceRef.extractionStatus).toMatch(/^(verified|needs-review)$/);
    }
  });

  it('passes the content review checks for gaps, duplicates, and unlabeled sources', () => {
    expect(validateSourceBaseline(sourceBaselineRows)).toEqual([]);
  });

  it('publishes an explicit content review checklist', () => {
    expect(getSourceBaselineReviewChecklist(sourceBaselineRows)).toEqual([
      { label: '題號 1 至 50 無缺題', passed: true },
      { label: '題號 1 至 50 無重號', passed: true },
      { label: '每題皆有原題題幹、A 至 D 選項與官方答案', passed: true },
      { label: '每題皆標示 113.pdf PDF sourceRef', passed: true }
    ]);
  });
});
