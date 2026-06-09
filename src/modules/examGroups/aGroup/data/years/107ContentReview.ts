import {
  getAGroupContentReviewChecklist,
  getAGroupSystematicNoviceTeachingFailures,
  validateAGroupQuestionContent,
  type ContentReviewCheck,
  type ContentReviewFinding,
  type SystematicNoviceTeachingFailure
} from '@/modules/examGroups/aGroup/data/years/contentReview';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const CONFIRMED_RISKY_EXTRACTION_QUESTIONS: readonly number[] = [];

const CONTENT_REVIEW_CONFIG = {
  year: '107',
  fileName: '107.pdf',
  confirmedRiskyExtractionQuestions: CONFIRMED_RISKY_EXTRACTION_QUESTIONS
} as const;

export type { ContentReviewCheck, ContentReviewFinding, SystematicNoviceTeachingFailure };

export function getAGroup107SystematicNoviceTeachingFailures(
  questions: readonly ExamQuestionAnalysis[]
): SystematicNoviceTeachingFailure[] {
  return getAGroupSystematicNoviceTeachingFailures(questions);
}

export function getAGroup107ContentReviewChecklist(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewCheck[] {
  return getAGroupContentReviewChecklist(questions, CONTENT_REVIEW_CONFIG);
}

export function validateAGroup107QuestionContent(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewFinding[] {
  return validateAGroupQuestionContent(questions, CONTENT_REVIEW_CONFIG);
}
