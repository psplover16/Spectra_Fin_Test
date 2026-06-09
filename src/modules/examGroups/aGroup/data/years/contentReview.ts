import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import { validateRiskyExtractionReview } from '@/modules/examGroups/aGroup/data/years/riskyExtractionReview';
import { ANSWER_OPTIONS, type ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

export interface ContentReviewCheck {
  label: string;
  passed: boolean;
}

export type ContentReviewFinding = string;

const systematicNoviceTeachingLabel = '每題皆符合新手系統教學解析標準';
const specialAnswerStateLabel = '多答案與送分題皆保留人工複核註記';
const riskyExtractionReviewLabel = '風險 PDF 抽取題保留人工確認狀態';
const DEFAULT_EXPECTED_QUESTION_COUNT = 50;

export interface ContentReviewConfig {
  year: AGroupYear;
  fileName: `${AGroupYear}.pdf`;
  expectedQuestionCount?: number;
  confirmedRiskyExtractionQuestions?: readonly number[];
}

export interface SystematicNoviceTeachingFailure {
  number: number;
  missing: string[];
}

function getExpectedQuestionCount(config: ContentReviewConfig): number {
  return config.expectedQuestionCount ?? DEFAULT_EXPECTED_QUESTION_COUNT;
}

function hasContinuousUniqueNumbers(questions: readonly ExamQuestionAnalysis[], config: ContentReviewConfig): boolean {
  const expectedQuestionCount = getExpectedQuestionCount(config);
  const numbers = new Set(questions.map((question) => question.number));

  return (
    questions.length === expectedQuestionCount &&
    Array.from({ length: expectedQuestionCount }, (_, index) => index + 1).every((number) => numbers.has(number))
  );
}

function hasAllOptionsAndExplanations(question: ExamQuestionAnalysis): boolean {
  const optionKeys = Object.keys(question.options).sort();
  const explanationKeys = Object.keys(question.optionExplanations).sort();
  const expectedKeys = [...ANSWER_OPTIONS].sort();

  return (
    optionKeys.join('|') === expectedKeys.join('|') &&
    explanationKeys.join('|') === expectedKeys.join('|') &&
    ANSWER_OPTIONS.every(
      (option) => question.options[option].trim().length > 0 && question.optionExplanations[option].trim().length > 0
    )
  );
}

function hasTraceableAnswerState(question: ExamQuestionAnalysis, config: ContentReviewConfig): boolean {
  return (
    question.tags.length > 0 &&
    question.tags.every((tag) => tag.trim().length > 0) &&
    question.sourceRef.year === config.year &&
    question.sourceRef.fileName === config.fileName &&
    typeof question.sourceRef.pageNumber === 'number' &&
    question.sourceRef.pageNumber > 0 &&
    (question.answerVerification === 'verified' ||
      question.answerVerification === 'suspected-error' ||
      question.answerVerification === 'needs-review')
  );
}

function hasRequiredSpecialAnswerState(question: ExamQuestionAnalysis): boolean {
  if (question.acceptedAnswers.length <= 1) {
    return true;
  }

  return (
    question.answerVerification !== 'verified' &&
    question.answerNote !== null &&
    question.answerNote.trim().length > 0
  );
}

function hasProfessionalTeachingContent(question: ExamQuestionAnalysis): boolean {
  const teachingText = [
    question.beginnerExplanation,
    ...question.solvingSteps,
    ...Object.values(question.optionExplanations),
    ...question.keyTakeaways
  ].join('\n');

  return (
    question.coreTerms.length > 0 &&
    question.beginnerExplanation.trim().length > 0 &&
    question.solvingSteps.length >= 3 &&
    question.keyTakeaways.length >= 2 &&
    !teachingText.includes('本題先辨識考點') &&
    !teachingText.includes('PDF 題本標示答案') &&
    !teachingText.includes('待審查解析骨架') &&
    !teachingText.includes('後續內容審查') &&
    !teachingText.includes('來源基準骨架') &&
    !teachingText.includes('仍需由逐題解析') &&
    !teachingText.includes('正式完成前')
  );
}

function containsAny(text: string, markers: readonly string[]): boolean {
  return markers.some((marker) => text.includes(marker));
}

function getSystematicNoviceTeachingMissingItems(question: ExamQuestionAnalysis): string[] {
  const beginnerExplanation = question.beginnerExplanation.trim();
  const solvingSteps = question.solvingSteps.map((step) => step.trim());
  const optionExplanations = ANSWER_OPTIONS.map((option) => question.optionExplanations[option].trim());
  const keyTakeaways = question.keyTakeaways.map((takeaway) => takeaway.trim());
  const solvingText = solvingSteps.join('\n');
  const optionText = optionExplanations.join('\n');
  const takeawayText = keyTakeaways.join('\n');
  const trapText = [optionText, takeawayText].join('\n');
  const teachingText = [beginnerExplanation, solvingText, optionText, takeawayText].join('\n');

  const conceptMarkers = [
    '前置',
    '觀念',
    '概念',
    '定義',
    '表示',
    '代表',
    '架構',
    '機制',
    '模型',
    '性質',
    '特性',
    '差別',
    '差異',
    '重點',
    '核心',
    '用途',
    '目的',
    '是',
    '把',
    '用',
    '會',
    '能',
    '支援',
    '允許',
    '範圍',
    '層',
    '協定',
    '交易',
    '排程',
    '演算法',
    '資料',
    '位元',
    '認證',
    '防護'
  ];
  const ruleMarkers = [
    '公式',
    '規則',
    '來源',
    '條件',
    '適用',
    '要求',
    '標準',
    '權重',
    '校驗',
    '計算',
    '檢查',
    '判斷',
    '比對',
    '對應',
    '使用',
    '屬於',
    '核心',
    '重點',
    '差異',
    '是',
    '用',
    '把',
    '可',
    '會',
    '能',
    '應',
    '要',
    '需',
    '依',
    '不',
    '不是',
    '不能'
  ];
  const applicationMarkers = [
    '先',
    '再',
    '確認',
    '辨認',
    '判斷',
    '計算',
    '比對',
    '檢查',
    '排除',
    '使用',
    '套用',
    '得到',
    '選出',
    '對應',
    '看',
    '找',
    '分',
    '讀',
    '選',
    '減去',
    '放入',
    '剩餘',
    '總數'
  ];
  const trapMarkers = [
    '陷阱',
    '混淆',
    '注意',
    '常見',
    '重點',
    '典型',
    '錯',
    '誤',
    '顛倒',
    '漏',
    '少了',
    '缺',
    '不是',
    '不符合',
    '不',
    '不能',
    '不等於',
    '並非',
    '沒有',
    '必須',
    '類似',
    '超過',
    '排除',
    '只'
  ];

  const missing: string[] = [];

  if (beginnerExplanation.length < 45) {
    missing.push('前置說明過短');
  }

  if (!containsAny(beginnerExplanation, conceptMarkers)) {
    missing.push('缺少前置觀念訊號');
  }

  if (!containsAny(teachingText, ruleMarkers)) {
    missing.push('缺少規則或機制訊號');
  }

  if (solvingSteps.length < 3 || solvingSteps.some((step) => step.length < 4)) {
    missing.push('解題步驟不足');
  }

  if (!containsAny(solvingText, applicationMarkers)) {
    missing.push('缺少逐步套用訊號');
  }

  if (optionExplanations.some((explanation) => explanation.length < 10)) {
    missing.push('選項辨析過短');
  }

  if (!containsAny(trapText, trapMarkers)) {
    missing.push('缺少常見陷阱或排除訊號');
  }

  if (keyTakeaways.length < 3 || keyTakeaways.some((takeaway) => takeaway.length < 6)) {
    missing.push('可複用重點不足');
  }

  if (!containsAny(takeawayText, [...ruleMarkers, ...trapMarkers])) {
    missing.push('重點缺少規則或陷阱訊號');
  }

  return missing;
}

export function getAGroupSystematicNoviceTeachingFailures(
  questions: readonly ExamQuestionAnalysis[]
): SystematicNoviceTeachingFailure[] {
  return questions
    .map((question) => ({ number: question.number, missing: getSystematicNoviceTeachingMissingItems(question) }))
    .filter((failure) => failure.missing.length > 0);
}

function hasSystematicNoviceTeachingContent(question: ExamQuestionAnalysis): boolean {
  return getSystematicNoviceTeachingMissingItems(question).length === 0;
}

export function getAGroupContentReviewChecklist(
  questions: readonly ExamQuestionAnalysis[],
  config: ContentReviewConfig
): ContentReviewCheck[] {
  const expectedQuestionCount = getExpectedQuestionCount(config);

  return [
    { label: `${expectedQuestionCount} 題題號唯一且連續`, passed: hasContinuousUniqueNumbers(questions, config) },
    { label: '每題皆有 A 至 D 原始選項與四份選項辨析', passed: questions.every(hasAllOptionsAndExplanations) },
    {
      label: '每題皆有非空 tags、PDF sourceRef 與官方答案狀態',
      passed: questions.every((question) => hasTraceableAnswerState(question, config))
    },
    { label: specialAnswerStateLabel, passed: questions.every(hasRequiredSpecialAnswerState) },
    {
      label: riskyExtractionReviewLabel,
      passed:
        validateRiskyExtractionReview(questions, {
          year: config.year,
          confirmedQuestionNumbers: config.confirmedRiskyExtractionQuestions
        }).length === 0
    },
    { label: '每題皆有專業教學解析、解題步驟與重點整理', passed: questions.every(hasProfessionalTeachingContent) },
    { label: systematicNoviceTeachingLabel, passed: questions.every(hasSystematicNoviceTeachingContent) }
  ];
}

export function validateAGroupQuestionContent(
  questions: readonly ExamQuestionAnalysis[],
  config: ContentReviewConfig
): ContentReviewFinding[] {
  const findings: ContentReviewFinding[] = [];

  for (const check of getAGroupContentReviewChecklist(questions, config)) {
    if (!check.passed) {
      findings.push(check.label);
    }
  }

  return findings;
}
