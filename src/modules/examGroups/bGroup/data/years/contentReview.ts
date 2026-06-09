import {
  getBGroupSourceIndex,
  type BGroupSourceIndexEntry,
  type BGroupYear
} from '@/modules/examGroups/bGroup/data/sourceIndex';
import {
  hasBGroupEssayQuestionAnalysisShape,
  hasNoBGroupAdvertisementText,
  type BGroupEssayQuestionAnalysis
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

export interface BGroupContentReviewCheck {
  label: string;
  passed: boolean;
}

export type BGroupContentReviewFinding = string;

export interface BGroupContentReviewConfig {
  year: BGroupYear;
  fileName: `${BGroupYear}.pdf`;
}

const batchSizeLabel = 'sourceBatch 維持每批 2 至 3 題';
const sourceTraceLabel = '每題 sourceRef 與年度 source index 一致';
const completenessLabel = '每題皆有原題、題意拆解、擬答、細節、評分重點、常見錯誤與來源追蹤';

function getSourceIndexByNumber(config: BGroupContentReviewConfig): Map<number, BGroupSourceIndexEntry> {
  return new Map(getBGroupSourceIndex(config.year).map((entry) => [entry.number, entry]));
}

function hasIndexedQuestionNumbers(
  questions: readonly BGroupEssayQuestionAnalysis[],
  sourceIndex: readonly BGroupSourceIndexEntry[]
): boolean {
  const expectedNumbers = sourceIndex.map((entry) => entry.number).sort((a, b) => a - b);
  const actualNumbers = questions.map((question) => question.number).sort((a, b) => a - b);

  return (
    questions.length === sourceIndex.length &&
    expectedNumbers.length === actualNumbers.length &&
    expectedNumbers.every((number, index) => actualNumbers[index] === number)
  );
}

function hasTraceableSourceRef(
  question: BGroupEssayQuestionAnalysis,
  config: BGroupContentReviewConfig,
  sourceIndexByNumber: Map<number, BGroupSourceIndexEntry>
): boolean {
  const sourceIndexEntry = sourceIndexByNumber.get(question.number);

  return (
    question.year === config.year &&
    question.sourceRef.fileName === config.fileName &&
    sourceIndexEntry !== undefined &&
    question.sourceRef.pageNumber === sourceIndexEntry.pageNumber &&
    question.sourceRef.originalExcerpt === sourceIndexEntry.originalExcerpt &&
    question.sourceRef.extractionStatus === sourceIndexEntry.extractionStatus &&
    question.sourceRef.adContentRemoved === sourceIndexEntry.adContentRemoved
  );
}

function hasCompleteEssayContent(question: BGroupEssayQuestionAnalysis): boolean {
  return (
    hasBGroupEssayQuestionAnalysisShape(question) &&
    hasNoBGroupAdvertisementText(question) &&
    question.examPoints.length >= 2 &&
    question.modelAnswerDetails.length >= 2 &&
    question.keyTerms.length >= 2 &&
    question.scoringPoints.length >= 3 &&
    question.commonMistakes.length >= 2 &&
    question.questionExplanation.trim().length >= 30 &&
    question.modelAnswer.trim().length >= 30 &&
    question.diagramInstructions.trim().length >= 8 &&
    question.diagramAltText.trim().length >= 8
  );
}

function hasControlledSourceBatches(questions: readonly BGroupEssayQuestionAnalysis[]): boolean {
  const batchCounts = new Map<string, number>();

  questions.forEach((question) => {
    batchCounts.set(question.sourceBatch, (batchCounts.get(question.sourceBatch) ?? 0) + 1);
  });

  return Array.from(batchCounts.values()).every((count) => count >= 2 && count <= 3);
}

export function getBGroupContentReviewChecklist(
  questions: readonly BGroupEssayQuestionAnalysis[],
  config: BGroupContentReviewConfig
): BGroupContentReviewCheck[] {
  const sourceIndex = getBGroupSourceIndex(config.year);
  const sourceIndexByNumber = getSourceIndexByNumber(config);

  return [
    {
      label: '題號完整對應年度 source index',
      passed: hasIndexedQuestionNumbers(questions, sourceIndex)
    },
    {
      label: sourceTraceLabel,
      passed: questions.every((question) => hasTraceableSourceRef(question, config, sourceIndexByNumber))
    },
    {
      label: batchSizeLabel,
      passed: hasControlledSourceBatches(questions)
    },
    {
      label: completenessLabel,
      passed: questions.every(hasCompleteEssayContent)
    }
  ];
}

export function validateBGroupQuestionContent(
  questions: readonly BGroupEssayQuestionAnalysis[],
  config: BGroupContentReviewConfig
): BGroupContentReviewFinding[] {
  return getBGroupContentReviewChecklist(questions, config)
    .filter((check) => !check.passed)
    .map((check) => check.label);
}
