import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import {
  ANSWER_OPTIONS,
  type AnswerOption,
  type ExamQuestionAnalysis,
  type ExamQuestionSourceRef,
  type FourOptionRecord
} from '@/modules/examGroups/aGroup/types/questionAnalysis';

export interface SourceBaselineRow {
  number: number;
  originalStem: string;
  options: FourOptionRecord;
  officialAnswers: AnswerOption[];
  sourceRef: ExamQuestionSourceRef & { pageNumber: number };
}

export interface SourceBaselineReviewConfig {
  year: AGroupYear;
  fileName: `${AGroupYear}.pdf`;
  pageCount: number;
  expectedQuestionCount?: number;
}

export type SourceBaselineFinding = string;

export interface SourceBaselineReviewCheck {
  label: string;
  passed: boolean;
}

const DEFAULT_EXPECTED_QUESTION_COUNT = 50;

export function createSourceBaselineRows(questions: readonly ExamQuestionAnalysis[]): SourceBaselineRow[] {
  return questions.map((question) => ({
    number: question.number,
    originalStem: question.originalStem,
    options: question.options,
    officialAnswers: question.acceptedAnswers,
    sourceRef: {
      ...question.sourceRef,
      pageNumber: question.sourceRef.pageNumber ?? 0
    }
  }));
}

function getExpectedQuestionCount(config: SourceBaselineReviewConfig): number {
  return config.expectedQuestionCount ?? DEFAULT_EXPECTED_QUESTION_COUNT;
}

function hasAllExpectedNumbers(rows: readonly SourceBaselineRow[], config: SourceBaselineReviewConfig): boolean {
  const expectedQuestionCount = getExpectedQuestionCount(config);
  const numbers = new Set(rows.map((row) => row.number));

  return (
    rows.length === expectedQuestionCount &&
    Array.from({ length: expectedQuestionCount }, (_, index) => index + 1).every((number) => numbers.has(number))
  );
}

function hasNoDuplicateNumbers(rows: readonly SourceBaselineRow[]): boolean {
  return new Set(rows.map((row) => row.number)).size === rows.length;
}

function hasCompleteOriginalContent(row: SourceBaselineRow): boolean {
  return (
    row.originalStem.trim().length > 0 &&
    row.officialAnswers.length > 0 &&
    row.officialAnswers.every((answer) => ANSWER_OPTIONS.includes(answer)) &&
    Object.keys(row.options).sort().join('|') === [...ANSWER_OPTIONS].sort().join('|') &&
    ANSWER_OPTIONS.every((option) => row.options[option].trim().length > 0)
  );
}

function hasUsableSourceRef(row: SourceBaselineRow, config: SourceBaselineReviewConfig): boolean {
  return (
    row.sourceRef.year === config.year &&
    row.sourceRef.fileName === config.fileName &&
    row.sourceRef.pageNumber >= 1 &&
    row.sourceRef.pageNumber <= config.pageCount
  );
}

export function getSourceBaselineReviewChecklist(
  rows: readonly SourceBaselineRow[],
  config: SourceBaselineReviewConfig
): SourceBaselineReviewCheck[] {
  const expectedQuestionCount = getExpectedQuestionCount(config);

  return [
    { label: `題號 1 至 ${expectedQuestionCount} 無缺題`, passed: hasAllExpectedNumbers(rows, config) },
    { label: `題號 1 至 ${expectedQuestionCount} 無重號`, passed: hasNoDuplicateNumbers(rows) },
    { label: '每題皆有原題題幹、A 至 D 選項與官方答案', passed: rows.every(hasCompleteOriginalContent) },
    { label: `每題皆標示 ${config.fileName} PDF sourceRef`, passed: rows.every((row) => hasUsableSourceRef(row, config)) }
  ];
}

export function validateSourceBaseline(
  rows: readonly SourceBaselineRow[],
  config: SourceBaselineReviewConfig
): SourceBaselineFinding[] {
  const findings: SourceBaselineFinding[] = [];
  const seenNumbers = new Set<number>();
  const optionKeys = [...ANSWER_OPTIONS].sort();
  const expectedQuestionCount = getExpectedQuestionCount(config);

  if (rows.length !== expectedQuestionCount) {
    findings.push(`Expected ${expectedQuestionCount} source rows, received ${rows.length}.`);
  }

  for (const row of rows) {
    if (seenNumbers.has(row.number)) {
      findings.push(`Duplicate question number: ${row.number}.`);
    }
    seenNumbers.add(row.number);

    if (!row.originalStem.trim()) {
      findings.push(`Question ${row.number} is missing the original stem.`);
    }

    if (row.officialAnswers.length === 0) {
      findings.push(`Question ${row.number} is missing the official answer.`);
    }

    for (const answer of row.officialAnswers) {
      if (!ANSWER_OPTIONS.includes(answer)) {
        findings.push(`Question ${row.number} has invalid official answer ${answer}.`);
      }
    }

    if (Object.keys(row.options).sort().join('|') !== optionKeys.join('|')) {
      findings.push(`Question ${row.number} does not have exactly A to D options.`);
    }

    for (const option of ANSWER_OPTIONS) {
      if (!row.options[option].trim()) {
        findings.push(`Question ${row.number} option ${option} is empty.`);
      }
    }

    if (!hasUsableSourceRef(row, config)) {
      findings.push(`Question ${row.number} is missing a usable ${config.fileName} source reference.`);
    }
  }

  for (let number = 1; number <= expectedQuestionCount; number += 1) {
    if (!seenNumbers.has(number)) {
      findings.push(`Missing question number: ${number}.`);
    }
  }

  return findings;
}
