import {
  getAGroupContentReviewChecklist,
  getAGroupSystematicNoviceTeachingFailures,
  validateAGroupQuestionContent,
  type ContentReviewCheck,
  type ContentReviewFinding,
  type SystematicNoviceTeachingFailure
} from '@/modules/examGroups/aGroup/data/years/contentReview';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const CONTENT_REVIEW_CONFIG = {
  year: '114',
  fileName: '114.pdf'
} as const;

export type { ContentReviewCheck, ContentReviewFinding, SystematicNoviceTeachingFailure };

export function getAGroup114SystematicNoviceTeachingFailures(
  questions: readonly ExamQuestionAnalysis[]
): SystematicNoviceTeachingFailure[] {
  return getAGroupSystematicNoviceTeachingFailures(questions);
}

export function getAGroup114ContentReviewChecklist(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewCheck[] {
  return getAGroupContentReviewChecklist(questions, CONTENT_REVIEW_CONFIG);
}

export function validateAGroup114QuestionContent(
  questions: readonly ExamQuestionAnalysis[]
): ContentReviewFinding[] {
  return validateAGroupQuestionContent(questions, CONTENT_REVIEW_CONFIG);
}
