import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';

export const ANSWER_OPTIONS = ['A', 'B', 'C', 'D'] as const;

export type AnswerOption = (typeof ANSWER_OPTIONS)[number];
export type AnswerVerification = 'verified' | 'suspected-error' | 'needs-review';
export type ExtractionStatus = 'verified' | 'needs-review';

export type FourOptionRecord = Record<AnswerOption, string>;

export interface ExamQuestionSourceRef {
  year: AGroupYear;
  fileName: string;
  pageNumber?: number;
  extractionStatus: ExtractionStatus;
}

export interface ExamQuestionAnalysis {
  year: AGroupYear;
  number: number;
  acceptedAnswers: AnswerOption[];
  answerNote: string | null;
  answerVerification: AnswerVerification;
  originalStem: string;
  options: FourOptionRecord;
  coreTerms: string[];
  beginnerExplanation: string;
  solvingSteps: string[];
  optionExplanations: FourOptionRecord;
  keyTakeaways: string[];
  tags: string[];
  sourceRef: ExamQuestionSourceRef;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function isAnswerOption(value: unknown): value is AnswerOption {
  return typeof value === 'string' && (ANSWER_OPTIONS as readonly string[]).includes(value);
}

function hasFourOptionRecordShape(value: unknown): value is FourOptionRecord {
  if (!isRecord(value)) {
    return false;
  }

  const keys = Object.keys(value);

  return (
    keys.length === ANSWER_OPTIONS.length &&
    ANSWER_OPTIONS.every((option) => isNonEmptyString(value[option]))
  );
}

function hasSourceRefShape(value: unknown): value is ExamQuestionSourceRef {
  if (!isRecord(value)) {
    return false;
  }

  const extractionStatus = value.extractionStatus;
  const pageNumber = value.pageNumber;

  return (
    isNonEmptyString(value.year) &&
    isNonEmptyString(value.fileName) &&
    (extractionStatus === 'verified' || extractionStatus === 'needs-review') &&
    (pageNumber === undefined || (typeof pageNumber === 'number' && Number.isInteger(pageNumber) && pageNumber > 0))
  );
}

export function hasQuestionAnalysisShape(value: unknown): value is ExamQuestionAnalysis {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.year) &&
    typeof value.number === 'number' &&
    Number.isInteger(value.number) &&
    value.number > 0 &&
    Array.isArray(value.acceptedAnswers) &&
    value.acceptedAnswers.length > 0 &&
    value.acceptedAnswers.every(isAnswerOption) &&
    (value.answerNote === null || isNonEmptyString(value.answerNote)) &&
    (value.answerVerification === 'verified' ||
      value.answerVerification === 'suspected-error' ||
      value.answerVerification === 'needs-review') &&
    isNonEmptyString(value.originalStem) &&
    hasFourOptionRecordShape(value.options) &&
    isStringArray(value.coreTerms) &&
    isNonEmptyString(value.beginnerExplanation) &&
    isStringArray(value.solvingSteps) &&
    hasFourOptionRecordShape(value.optionExplanations) &&
    isStringArray(value.keyTakeaways) &&
    isStringArray(value.tags) &&
    hasSourceRefShape(value.sourceRef)
  );
}
