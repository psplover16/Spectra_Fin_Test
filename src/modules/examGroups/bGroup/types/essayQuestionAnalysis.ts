import {
  B_GROUP_YEARS,
  type BGroupExtractionStatus,
  type BGroupPageState,
  type BGroupQuestionType,
  type BGroupSubject,
  type BGroupYear
} from '@/modules/examGroups/bGroup/data/sourceIndex';

export const B_GROUP_SUBJECTS = ['information-management', 'programming', 'mixed'] as const satisfies readonly BGroupSubject[];
export const B_GROUP_QUESTION_TYPES = ['essay', 'short-answer', 'mixed'] as const satisfies readonly BGroupQuestionType[];
export const B_GROUP_DIFFICULTIES = ['basic', 'intermediate', 'advanced'] as const;
export const B_GROUP_REVIEW_STATUSES = ['pending', 'needs-review', 'verified'] as const;
export const B_GROUP_EXTRACTION_STATUSES = [
  'pending',
  'needs-review',
  'verified'
] as const satisfies readonly BGroupEssayExtractionStatus[];
export const B_GROUP_CHILD_ITEM_KINDS = ['essay-part', 'short-answer', 'calculation', 'diagram', 'choice-fragment'] as const;

export type BGroupDifficulty = (typeof B_GROUP_DIFFICULTIES)[number];
export type BGroupReviewStatus = (typeof B_GROUP_REVIEW_STATUSES)[number];
export type BGroupEssayExtractionStatus = BGroupExtractionStatus | 'pending';
export type BGroupChildItemKind = (typeof B_GROUP_CHILD_ITEM_KINDS)[number];

export interface BGroupEssayChildItem {
  kind: BGroupChildItemKind;
  label: string;
  prompt: string;
  expectedAnswer: string;
  scoringPoints: string[];
  choices?: string[];
  acceptedChoiceLabels?: string[];
}

export interface BGroupEssaySourceRef {
  fileName: string;
  pageNumber: BGroupPageState;
  originalExcerpt: string;
  extractionStatus: BGroupEssayExtractionStatus;
  adContentRemoved: boolean;
}

export interface BGroupEssayQuestionAnalysis {
  year: BGroupYear;
  number: number;
  subject: BGroupSubject;
  sourceBatch: string;
  examPoints: string[];
  difficulty: BGroupDifficulty;
  questionType: BGroupQuestionType;
  originalQuestion: string;
  questionExplanation: string;
  modelAnswer: string;
  modelAnswerDetails: string[];
  diagramInstructions: string;
  diagramAltText: string;
  keyTerms: string[];
  scoringPoints: string[];
  commonMistakes: string[];
  handoutRefs: string[];
  sourceRef: BGroupEssaySourceRef;
  reviewStatus: BGroupReviewStatus;
  childItems?: BGroupEssayChildItem[];
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

export function isBGroupYear(value: unknown): value is BGroupYear {
  return isOneOf(B_GROUP_YEARS, value);
}

export function isBGroupReviewStatus(value: unknown): value is BGroupReviewStatus {
  return isOneOf(B_GROUP_REVIEW_STATUSES, value);
}

export function isBGroupEssayExtractionStatus(value: unknown): value is BGroupEssayExtractionStatus {
  return isOneOf(B_GROUP_EXTRACTION_STATUSES, value);
}

function isBGroupPageState(value: unknown): value is BGroupPageState {
  return value === 'pending' || isPositiveInteger(value);
}

function hasNoTopLevelAGroupChoiceFacade(value: Record<string, unknown>): boolean {
  return !('options' in value) && !('acceptedAnswers' in value) && !('answerVerification' in value) && !('originalStem' in value);
}

function hasBGroupEssayChildItemShape(value: unknown): value is BGroupEssayChildItem {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isOneOf(B_GROUP_CHILD_ITEM_KINDS, value.kind) &&
    isNonEmptyString(value.label) &&
    isNonEmptyString(value.prompt) &&
    isNonEmptyString(value.expectedAnswer) &&
    isStringArray(value.scoringPoints) &&
    (value.choices === undefined || isStringArray(value.choices)) &&
    (value.acceptedChoiceLabels === undefined || isStringArray(value.acceptedChoiceLabels))
  );
}

export function hasBGroupEssaySourceRefShape(value: unknown): value is BGroupEssaySourceRef {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonEmptyString(value.fileName) &&
    isBGroupPageState(value.pageNumber) &&
    isNonEmptyString(value.originalExcerpt) &&
    isBGroupEssayExtractionStatus(value.extractionStatus) &&
    typeof value.adContentRemoved === 'boolean'
  );
}

export function containsBGroupAdvertisementText(text: string): boolean {
  return ADVERTISEMENT_PATTERNS.some((pattern) => pattern.test(text));
}

export function getBGroupAppFacingTextSegments(analysis: BGroupEssayQuestionAnalysis): string[] {
  const childItemSegments = (analysis.childItems ?? []).flatMap((item) => [
    item.label,
    item.prompt,
    item.expectedAnswer,
    ...item.scoringPoints,
    ...(item.choices ?? []),
    ...(item.acceptedChoiceLabels ?? [])
  ]);

  return [
    analysis.sourceBatch,
    ...analysis.examPoints,
    analysis.originalQuestion,
    analysis.questionExplanation,
    analysis.modelAnswer,
    ...analysis.modelAnswerDetails,
    analysis.diagramInstructions,
    analysis.diagramAltText,
    ...analysis.keyTerms,
    ...analysis.scoringPoints,
    ...analysis.commonMistakes,
    ...analysis.handoutRefs,
    analysis.sourceRef.originalExcerpt,
    ...childItemSegments
  ];
}

export function hasNoBGroupAdvertisementText(analysis: BGroupEssayQuestionAnalysis): boolean {
  return getBGroupAppFacingTextSegments(analysis).every((text) => !containsBGroupAdvertisementText(text));
}

export function hasBGroupEssayQuestionAnalysisShape(value: unknown): value is BGroupEssayQuestionAnalysis {
  if (!isRecord(value) || !hasNoTopLevelAGroupChoiceFacade(value)) {
    return false;
  }

  if (!hasBGroupEssaySourceRefShape(value.sourceRef)) {
    return false;
  }

  const hasRequiredShape =
    isBGroupYear(value.year) &&
    isPositiveInteger(value.number) &&
    isOneOf(B_GROUP_SUBJECTS, value.subject) &&
    isNonEmptyString(value.sourceBatch) &&
    isStringArray(value.examPoints) &&
    isOneOf(B_GROUP_DIFFICULTIES, value.difficulty) &&
    isOneOf(B_GROUP_QUESTION_TYPES, value.questionType) &&
    isNonEmptyString(value.originalQuestion) &&
    isNonEmptyString(value.questionExplanation) &&
    isNonEmptyString(value.modelAnswer) &&
    isStringArray(value.modelAnswerDetails) &&
    isNonEmptyString(value.diagramInstructions) &&
    isNonEmptyString(value.diagramAltText) &&
    isStringArray(value.keyTerms) &&
    isStringArray(value.scoringPoints) &&
    isStringArray(value.commonMistakes) &&
    isStringArray(value.handoutRefs, true) &&
    isBGroupReviewStatus(value.reviewStatus) &&
    (value.childItems === undefined || (Array.isArray(value.childItems) && value.childItems.every(hasBGroupEssayChildItemShape)));

  if (!hasRequiredShape) {
    return false;
  }

  const analysis = value as unknown as BGroupEssayQuestionAnalysis;

  return !analysis.sourceRef.adContentRemoved || hasNoBGroupAdvertisementText(analysis);
}
