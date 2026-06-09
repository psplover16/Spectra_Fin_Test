import {
  LANGUAGE_YEARS,
  type LanguageExtractionStatus,
  type LanguagePageState,
  type LanguageQuestionKind,
  type LanguageQuestionType,
  type LanguageSubject,
  type LanguageYear
} from '@/modules/examGroups/language/data/sourceIndex';

export const LANGUAGE_SUBJECTS = ['chinese', 'english', 'mixed'] as const satisfies readonly LanguageSubject[];
export const LANGUAGE_QUESTION_KINDS = [
  'chinese-reading',
  'chinese-composition',
  'english-grammar',
  'english-vocabulary',
  'english-cloze',
  'english-reading',
  'mixed'
] as const satisfies readonly LanguageQuestionKind[];
export const LANGUAGE_QUESTION_TYPES = ['choice', 'open', 'composition', 'mixed'] as const satisfies readonly LanguageQuestionType[];
export const LANGUAGE_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;
export const LANGUAGE_REVIEW_STATUSES = ['pending', 'needs-review', 'verified'] as const;
export const LANGUAGE_EXTRACTION_STATUSES = [
  'pending',
  'needs-review',
  'verified'
] as const satisfies readonly LanguageAnalysisExtractionStatus[];

export type LanguageDifficulty = (typeof LANGUAGE_DIFFICULTIES)[number];
export type LanguageReviewStatus = (typeof LANGUAGE_REVIEW_STATUSES)[number];
export type LanguageAnalysisExtractionStatus = LanguageExtractionStatus | 'pending';

export interface LanguageChoice {
  label: string;
  text: string;
}

export interface LanguageQuestionSourceRef {
  fileName: string;
  pageNumber: LanguagePageState;
  originalExcerpt: string;
  extractionStatus: LanguageAnalysisExtractionStatus;
  adContentRemoved: boolean;
}

export interface LanguageQuestionAnalysis {
  year: LanguageYear;
  number: number;
  subject: LanguageSubject;
  kind: LanguageQuestionKind;
  sourceBatch: string;
  examPoints: string[];
  difficulty: LanguageDifficulty;
  questionType: LanguageQuestionType;
  originalQuestion: string;
  choices: LanguageChoice[];
  acceptedAnswers: string[];
  answerExplanation: string;
  teachingNotes: string[];
  strategyTips: string[];
  diagramInstructions: string;
  diagramAltText: string;
  handoutRefs: string[];
  sourceRef: LanguageQuestionSourceRef;
  reviewStatus: LanguageReviewStatus;
}

const URL_PATTERN = /https?:\/\/|www\.[^\s]+|[A-Za-z0-9.-]+\.(?:com|tw|net|org)(?:\/|\b)/i;
const PHONE_PATTERN = /\b09\d{2}[-\s]?\d{3}[-\s]?\d{3}\b|\b0\d{1,3}[-\s]?\d{6,8}\b|(?:聯絡|洽詢|客服)?電話[:：]/i;
const LINE_PATTERN = /\bline\s*(?:id|@|官方|群組)|加入\s*line/i;
const MARKETING_PATTERN = /補習班|招生中|立即報名|報名專線|免費試聽|限時優惠|課程優惠|保證上榜|保證錄取|歡迎洽詢|掃描\s*QR\s*Code/i;

const ADVERTISEMENT_PATTERNS = [URL_PATTERN, PHONE_PATTERN, LINE_PATTERN, MARKETING_PATTERN] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

function isStringArray(value: unknown, allowEmpty = false): value is string[] {
  return Array.isArray(value) && (allowEmpty || value.length > 0) && value.every(isNonEmptyString);
}

function isOneOf<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.includes(value);
}

export function isLanguageYear(value: unknown): value is LanguageYear {
  return isOneOf(LANGUAGE_YEARS, value);
}

export function isLanguageReviewStatus(value: unknown): value is LanguageReviewStatus {
  return isOneOf(LANGUAGE_REVIEW_STATUSES, value);
}

export function isLanguageAnalysisExtractionStatus(value: unknown): value is LanguageAnalysisExtractionStatus {
  return isOneOf(LANGUAGE_EXTRACTION_STATUSES, value);
}

function isLanguagePageState(value: unknown): value is LanguagePageState {
  return (
    value === 'pending' ||
    isPositiveInteger(value) ||
    (typeof value === 'string' && /^[1-9]\d*-[1-9]\d*$/.test(value))
  );
}

function hasLanguageChoiceShape(value: unknown): value is LanguageChoice {
  return isRecord(value) && isNonEmptyString(value.label) && isNonEmptyString(value.text);
}

export function hasLanguageQuestionSourceRefShape(value: unknown): value is LanguageQuestionSourceRef {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.fileName) &&
    isLanguagePageState(value.pageNumber) &&
    isNonEmptyString(value.originalExcerpt) &&
    isLanguageAnalysisExtractionStatus(value.extractionStatus) &&
    typeof value.adContentRemoved === 'boolean'
  );
}

export function containsLanguageAdvertisementText(text: string): boolean {
  return ADVERTISEMENT_PATTERNS.some((pattern) => pattern.test(text));
}

export function getLanguageAppFacingTextSegments(analysis: LanguageQuestionAnalysis): string[] {
  return [
    analysis.sourceBatch,
    ...analysis.examPoints,
    analysis.originalQuestion,
    ...analysis.choices.flatMap((choice) => [choice.label, choice.text]),
    ...analysis.acceptedAnswers,
    analysis.answerExplanation,
    ...analysis.teachingNotes,
    ...analysis.strategyTips,
    analysis.diagramInstructions,
    analysis.diagramAltText,
    ...analysis.handoutRefs,
    analysis.sourceRef.originalExcerpt
  ];
}

export function hasNoLanguageAdvertisementText(analysis: LanguageQuestionAnalysis): boolean {
  return getLanguageAppFacingTextSegments(analysis).every((text) => !containsLanguageAdvertisementText(text));
}

export function hasLanguageQuestionAnalysisShape(value: unknown): value is LanguageQuestionAnalysis {
  if (!isRecord(value) || !hasLanguageQuestionSourceRefShape(value.sourceRef)) {
    return false;
  }

  const hasRequiredShape =
    isLanguageYear(value.year) &&
    isPositiveInteger(value.number) &&
    isOneOf(LANGUAGE_SUBJECTS, value.subject) &&
    isOneOf(LANGUAGE_QUESTION_KINDS, value.kind) &&
    isNonEmptyString(value.sourceBatch) &&
    isStringArray(value.examPoints) &&
    isOneOf(LANGUAGE_DIFFICULTIES, value.difficulty) &&
    isOneOf(LANGUAGE_QUESTION_TYPES, value.questionType) &&
    isNonEmptyString(value.originalQuestion) &&
    Array.isArray(value.choices) &&
    value.choices.every(hasLanguageChoiceShape) &&
    isStringArray(value.acceptedAnswers, true) &&
    isNonEmptyString(value.answerExplanation) &&
    isStringArray(value.teachingNotes) &&
    isStringArray(value.strategyTips) &&
    isNonEmptyString(value.diagramInstructions) &&
    isNonEmptyString(value.diagramAltText) &&
    isStringArray(value.handoutRefs, true) &&
    isLanguageReviewStatus(value.reviewStatus);

  if (!hasRequiredShape) {
    return false;
  }

  const analysis = value as unknown as LanguageQuestionAnalysis;

  return !analysis.sourceRef.adContentRemoved || hasNoLanguageAdvertisementText(analysis);
}
