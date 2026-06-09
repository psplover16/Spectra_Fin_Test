import { describe, expect, it } from 'vitest';
import type { SourceBaselineRow } from '@/modules/examGroups/aGroup/data/years/sourceBaselineReview';
import {
  getSourceBaselineReviewChecklist,
  validateSourceBaseline
} from '@/modules/examGroups/aGroup/data/years/sourceBaselineReview';

const reviewConfig = {
  year: '107',
  fileName: '107.pdf',
  pageCount: 4,
  expectedQuestionCount: 2
} as const;

const validRows: SourceBaselineRow[] = [
  {
    number: 1,
    originalStem: '題幹一',
    options: { A: '選項 A', B: '選項 B', C: '選項 C', D: '選項 D' },
    officialAnswers: ['A'],
    sourceRef: { year: '107', fileName: '107.pdf', pageNumber: 1, extractionStatus: 'verified' }
  },
  {
    number: 2,
    originalStem: '題幹二',
    options: { A: '選項 A', B: '選項 B', C: '選項 C', D: '選項 D' },
    officialAnswers: ['B', 'C'],
    sourceRef: { year: '107', fileName: '107.pdf', pageNumber: 2, extractionStatus: 'needs-review' }
  }
];

describe('A group source baseline review helper', () => {
  it('accepts complete rows for the configured year and PDF', () => {
    expect(validateSourceBaseline(validRows, reviewConfig)).toEqual([]);
    expect(getSourceBaselineReviewChecklist(validRows, reviewConfig)).toEqual([
      { label: '題號 1 至 2 無缺題', passed: true },
      { label: '題號 1 至 2 無重號', passed: true },
      { label: '每題皆有原題題幹、A 至 D 選項與官方答案', passed: true },
      { label: '每題皆標示 107.pdf PDF sourceRef', passed: true }
    ]);
  });

  it('rejects missing options, duplicate numbers, and mismatched PDF references', () => {
    const invalidRows: SourceBaselineRow[] = [
      validRows[0],
      {
        ...validRows[0],
        originalStem: '',
        options: { A: '選項 A', B: '選項 B', C: '選項 C', D: '' },
        officialAnswers: [],
        sourceRef: { year: '108', fileName: '108.pdf', pageNumber: 5, extractionStatus: 'verified' }
      }
    ];

    expect(validateSourceBaseline(invalidRows, reviewConfig)).toEqual([
      'Duplicate question number: 1.',
      'Question 1 is missing the original stem.',
      'Question 1 is missing the official answer.',
      'Question 1 option D is empty.',
      'Question 1 is missing a usable 107.pdf source reference.',
      'Missing question number: 2.'
    ]);
  });
});
