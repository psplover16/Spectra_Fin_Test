import {
  getLanguageSourceIndex,
  type LanguageSourceIndexEntry,
  type LanguageYear
} from '@/modules/examGroups/language/data/sourceIndex';
import {
  hasLanguageQuestionAnalysisShape,
  hasNoLanguageAdvertisementText,
  type LanguageQuestionAnalysis
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';

export interface LanguageContentReviewCheck {
  label: string;
  passed: boolean;
}

export type LanguageContentReviewFinding = string;

export interface LanguageContentReviewConfig {
  year: LanguageYear;
  fileName: `${LanguageYear}.pdf`;
}

const sourceTraceLabel = '每題 sourceRef 與語言年度 source index 一致';
const batchSizeLabel = 'sourceBatch 維持每批 2 至 3 題';
const completenessLabel = '每題皆有原題、題型、答案解析、教學筆記、策略提醒與來源追蹤';
const englishTeachingLabel = '英文題符合國二程度英文老師教學語氣';
const chineseTeachingLabel = '國文題聚焦作文結構、評分重點與常見錯誤';

function getSourceIndexByNumber(config: LanguageContentReviewConfig): Map<number, LanguageSourceIndexEntry> {
  return new Map(getLanguageSourceIndex(config.year).map((entry) => [entry.number, entry]));
}

function hasIndexedQuestionNumbers(
  questions: readonly LanguageQuestionAnalysis[],
  sourceIndex: readonly LanguageSourceIndexEntry[]
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
  question: LanguageQuestionAnalysis,
  config: LanguageContentReviewConfig,
  sourceIndexByNumber: Map<number, LanguageSourceIndexEntry>
): boolean {
  const sourceIndexEntry = sourceIndexByNumber.get(question.number);

  return (
    question.year === config.year &&
    question.sourceRef.fileName === config.fileName &&
    sourceIndexEntry !== undefined &&
    question.kind === sourceIndexEntry.kind &&
    question.sourceRef.pageNumber === sourceIndexEntry.pageNumber &&
    question.sourceRef.originalExcerpt === sourceIndexEntry.originalExcerpt &&
    question.sourceRef.extractionStatus === sourceIndexEntry.extractionStatus &&
    question.sourceRef.adContentRemoved === sourceIndexEntry.adContentRemoved
  );
}

function hasControlledSourceBatches(questions: readonly LanguageQuestionAnalysis[]): boolean {
  const batchCounts = new Map<string, number>();

  questions.forEach((question) => {
    batchCounts.set(question.sourceBatch, (batchCounts.get(question.sourceBatch) ?? 0) + 1);
  });

  return Array.from(batchCounts.values()).every((count) => count >= 2 && count <= 3);
}

function hasCompleteLanguageContent(question: LanguageQuestionAnalysis): boolean {
  return (
    hasLanguageQuestionAnalysisShape(question) &&
    hasNoLanguageAdvertisementText(question) &&
    question.examPoints.length >= 2 &&
    question.answerExplanation.trim().length >= 40 &&
    question.teachingNotes.length >= 3 &&
    question.strategyTips.length >= 3 &&
    question.diagramInstructions.trim().length >= 8 &&
    question.diagramAltText.trim().length >= 8 &&
    question.handoutRefs.every((ref) => ref.trim().length > 0)
  );
}

export function hasJuniorHighFriendlyEnglishTeaching(question: LanguageQuestionAnalysis): boolean {
  if (question.subject !== 'english') {
    return true;
  }

  const teachingText = [
    question.answerExplanation,
    ...question.teachingNotes,
    ...question.strategyTips,
    question.diagramInstructions
  ].join('\n');

  return (
    teachingText.includes('國二') &&
    /例句[:：]/.test(teachingText) &&
    /(context|since|however|credibility|main idea|clue|grammar|vocabulary|reading|cloze)/i.test(teachingText)
  );
}

export function hasChineseExamTeachingFocus(question: LanguageQuestionAnalysis): boolean {
  if (question.subject !== 'chinese') {
    return true;
  }

  const teachingText = [
    question.answerExplanation,
    ...question.teachingNotes,
    ...question.strategyTips,
    question.diagramInstructions
  ].join('\n');

  return (
    teachingText.includes('作文') &&
    teachingText.includes('結構') &&
    teachingText.includes('評分') &&
    teachingText.includes('例子')
  );
}

export function getLanguageContentReviewChecklist(
  questions: readonly LanguageQuestionAnalysis[],
  config: LanguageContentReviewConfig
): LanguageContentReviewCheck[] {
  const sourceIndex = getLanguageSourceIndex(config.year);
  const sourceIndexByNumber = getSourceIndexByNumber(config);

  return [
    {
      label: '題號完整對應語言年度 source index',
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
      passed: questions.every(hasCompleteLanguageContent)
    },
    {
      label: englishTeachingLabel,
      passed: questions.every(hasJuniorHighFriendlyEnglishTeaching)
    },
    {
      label: chineseTeachingLabel,
      passed: questions.every(hasChineseExamTeachingFocus)
    }
  ];
}

export function validateLanguageQuestionContent(
  questions: readonly LanguageQuestionAnalysis[],
  config: LanguageContentReviewConfig
): LanguageContentReviewFinding[] {
  return getLanguageContentReviewChecklist(questions, config)
    .filter((check) => !check.passed)
    .map((check) => check.label);
}
