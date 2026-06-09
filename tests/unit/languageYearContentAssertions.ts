import { expect } from 'vitest';
import { getLanguageSourceIndex, type LanguageYear } from '@/modules/examGroups/language/data/sourceIndex';
import {
  getLanguageContentReviewChecklist,
  validateLanguageQuestionContent
} from '@/modules/examGroups/language/data/years/contentReview';
import {
  hasLanguageQuestionAnalysisShape,
  hasNoLanguageAdvertisementText,
  type LanguageQuestionAnalysis
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';

export function expectLanguageYearQuestionContent(
  year: LanguageYear,
  questions: readonly LanguageQuestionAnalysis[]
): void {
  const sourceIndex = getLanguageSourceIndex(year);

  expect(questions).toHaveLength(sourceIndex.length);
  expect(questions.map((question) => question.number)).toEqual(sourceIndex.map((entry) => entry.number));
  expect(questions.every((question) => question.year === year)).toBe(true);

  questions.forEach((question) => {
    const sourceIndexEntry = sourceIndex.find((entry) => entry.number === question.number);

    expect(question.kind).toBe(sourceIndexEntry?.kind);
    expect(question.sourceRef).toEqual({
      fileName: sourceIndexEntry?.fileName,
      pageNumber: sourceIndexEntry?.pageNumber,
      originalExcerpt: sourceIndexEntry?.originalExcerpt,
      extractionStatus: sourceIndexEntry?.extractionStatus,
      adContentRemoved: sourceIndexEntry?.adContentRemoved
    });
    expect(hasLanguageQuestionAnalysisShape(question)).toBe(true);
    expect(hasNoLanguageAdvertisementText(question)).toBe(true);
    expect(question.reviewStatus).toBe('needs-review');
    expect(question.answerExplanation.length).toBeGreaterThan(40);
    expect(question.teachingNotes.length).toBeGreaterThanOrEqual(3);
    expect(question.strategyTips.length).toBeGreaterThanOrEqual(3);

    if (question.questionType === 'choice') {
      expect(question.choices.length).toBeGreaterThanOrEqual(1);
    }

    if (question.questionType === 'composition') {
      expect(question.choices).toEqual([]);
      expect(question.acceptedAnswers).toEqual([]);
    }
  });

  const batchSizes = questions.reduce<Record<string, number>>((accumulator, question) => {
    accumulator[question.sourceBatch] = (accumulator[question.sourceBatch] ?? 0) + 1;
    return accumulator;
  }, {});

  expect(Object.values(batchSizes).sort()).toEqual([3, 3]);
}

export function expectLanguageContentReviewPasses(
  year: LanguageYear,
  questions: readonly LanguageQuestionAnalysis[]
): void {
  const config = { year, fileName: `${year}.pdf` } as const;

  expect(validateLanguageQuestionContent(questions, config)).toEqual([]);
  expect(getLanguageContentReviewChecklist(questions, config)).toEqual([
    { label: '題號完整對應語言年度 source index', passed: true },
    { label: '每題 sourceRef 與語言年度 source index 一致', passed: true },
    { label: 'sourceBatch 維持每批 2 至 3 題', passed: true },
    {
      label: '每題皆有原題、題型、答案解析、教學筆記、策略提醒與來源追蹤',
      passed: true
    },
    { label: '英文題符合國二程度英文老師教學語氣', passed: true },
    { label: '國文題聚焦作文結構、評分重點與常見錯誤', passed: true }
  ]);
}

export function expectLanguageContentReviewRejectsShallowContent(
  year: LanguageYear,
  questions: readonly LanguageQuestionAnalysis[]
): void {
  const config = { year, fileName: `${year}.pdf` } as const;
  const shallowQuestion: LanguageQuestionAnalysis = {
    ...questions[0],
    answerExplanation: '答案是看題目。',
    teachingNotes: [],
    strategyTips: []
  };
  const shallowQuestions = questions.map((question) =>
    question.number === shallowQuestion.number ? shallowQuestion : question
  );

  expect(validateLanguageQuestionContent(shallowQuestions, config)).toContain(
    '每題皆有原題、題型、答案解析、教學筆記、策略提醒與來源追蹤'
  );
}

export function expectLanguageContentReviewRejectsSourceDrift(
  year: LanguageYear,
  questions: readonly LanguageQuestionAnalysis[]
): void {
  const config = { year, fileName: `${year}.pdf` } as const;
  const wrongSourceQuestion: LanguageQuestionAnalysis = {
    ...questions[1],
    sourceRef: {
      ...questions[1].sourceRef,
      pageNumber: 'pending'
    }
  };
  const wrongSourceQuestions = questions.map((question) =>
    question.number === wrongSourceQuestion.number ? wrongSourceQuestion : question
  );

  expect(validateLanguageQuestionContent(wrongSourceQuestions, config)).toContain(
    '每題 sourceRef 與語言年度 source index 一致'
  );
}
