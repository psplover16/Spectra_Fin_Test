import { questions } from '@/modules/examGroups/aGroup/data/years/114';
import {
  ANSWER_OPTIONS,
  type AnswerOption,
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

export type SourceBaselineFinding = string;

export interface SourceBaselineReviewCheck {
  label: string;
  passed: boolean;
}

const SOURCE_YEAR = '114';
const SOURCE_FILE_NAME = '114.pdf';
const SOURCE_PAGE_COUNT = 4;

export const sourceBaselineRows: SourceBaselineRow[] = questions.map((question) => ({
  number: question.number,
  originalStem: question.originalStem,
  options: question.options,
  officialAnswers: question.acceptedAnswers,
  sourceRef: {
    ...question.sourceRef,
    pageNumber: question.sourceRef.pageNumber ?? 0
  }
}));

function hasAllExpectedNumbers(rows: readonly SourceBaselineRow[]): boolean {
  const numbers = new Set(rows.map((row) => row.number));

  return rows.length === 50 && Array.from({ length: 50 }, (_, index) => index + 1).every((number) => numbers.has(number));
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

function hasUsableSourceRef(row: SourceBaselineRow): boolean {
  return (
    row.sourceRef.year === SOURCE_YEAR &&
    row.sourceRef.fileName === SOURCE_FILE_NAME &&
    row.sourceRef.pageNumber >= 1 &&
    row.sourceRef.pageNumber <= SOURCE_PAGE_COUNT
  );
}

export function getSourceBaselineReviewChecklist(
  rows: readonly SourceBaselineRow[] = sourceBaselineRows
): SourceBaselineReviewCheck[] {
  return [
    { label: '題號 1 至 50 無缺題', passed: hasAllExpectedNumbers(rows) },
    { label: '題號 1 至 50 無重號', passed: hasNoDuplicateNumbers(rows) },
    { label: '每題皆有原題題幹、A 至 D 選項與官方答案', passed: rows.every(hasCompleteOriginalContent) },
    { label: '每題皆標示 114.pdf PDF sourceRef', passed: rows.every(hasUsableSourceRef) }
  ];
}

export function validateSourceBaseline(rows: readonly SourceBaselineRow[]): SourceBaselineFinding[] {
  const findings: SourceBaselineFinding[] = [];
  const seenNumbers = new Set<number>();
  const optionKeys = [...ANSWER_OPTIONS].sort();

  if (rows.length !== 50) {
    findings.push(`Expected 50 source rows, received ${rows.length}.`);
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

    if (!hasUsableSourceRef(row)) {
      findings.push(`Question ${row.number} is missing a usable 114.pdf source reference.`);
    }
  }

  for (let number = 1; number <= 50; number += 1) {
    if (!seenNumbers.has(number)) {
      findings.push(`Missing question number: ${number}.`);
    }
  }

  return findings;
}
