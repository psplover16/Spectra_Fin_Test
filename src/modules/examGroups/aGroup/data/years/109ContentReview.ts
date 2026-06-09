import {
  getAGroupContentReviewChecklist,
  getAGroupSystematicNoviceTeachingFailures,
  validateAGroupQuestionContent,
  type ContentReviewCheck,
  type ContentReviewFinding,
  type SystematicNoviceTeachingFailure
} from '@/modules/examGroups/aGroup/data/years/contentReview';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const CONFIRMED_RISKY_EXTRACTION_QUESTIONS: readonly number[] = [25, 38];

const CONTENT_REVIEW_CONFIG = {
  year: '109',
  fileName: '109.pdf',
  confirmedRiskyExtractionQuestions: CONFIRMED_RISKY_EXTRACTION_QUESTIONS
} as const;

export type { ContentReviewCheck, ContentReviewFinding, SystematicNoviceTeachingFailure };

export function getAGroup109SystematicNoviceTeachingFailures(
  questions: readonly ExamQuestionAnalysis[]
): SystematicNoviceTeachingFailure[] {
  return getAGroupSystematicNoviceTeachingFailures(questions);
}

export function getAGroup109ContentReviewChecklist(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewCheck[] {
  return getAGroupContentReviewChecklist(questions, CONTENT_REVIEW_CONFIG);
}

export function validateAGroup109QuestionContent(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewFinding[] {
  return validateAGroupQuestionContent(questions, CONTENT_REVIEW_CONFIG);
}
