import { describe, expect, it } from 'vitest';
import {
  hasLanguageQuestionAnalysisShape,
  hasLanguageQuestionSourceRefShape,
  type LanguageQuestionAnalysis
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';

const baseAnalysis: LanguageQuestionAnalysis = {
  year: '112',
  number: 1,
  subject: 'english',
  kind: 'english-grammar',
  sourceBatch: '112-language-batch-1',
  examPoints: ['現在完成式', '時態辨析'],
  difficulty: 'basic',
  questionType: 'choice',
  originalQuestion: 'Choose the best answer: I have lived here ___ 2020.',
  choices: [
    { label: 'A', text: 'for' },
    { label: 'B', text: 'since' }
  ],
  acceptedAnswers: ['B'],
  answerExplanation: '答案是 since，因為 2020 是明確起點時間。',
  teachingNotes: ['現在完成式搭配 since 表示從某個時間點開始延續到現在。'],
  strategyTips: ['看到年份或明確日期，優先判斷是否需要 since。'],
  diagramInstructions: '不適用：本題為時態介系詞辨析，不需要圖形。',
  diagramAltText: '無圖解；以文字說明 since 與 for 的差異。',
  handoutRefs: ['L-112-present-perfect'],
  sourceRef: {
    fileName: '112.pdf',
    pageNumber: 1,
    originalExcerpt: 'I have lived here ___ 2020.',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  reviewStatus: 'verified'
};

describe('language question analysis shape', () => {
  it('accepts a traceable language question analysis record', () => {
    expect(hasLanguageQuestionSourceRefShape(baseAnalysis.sourceRef)).toBe(true);
    expect(hasLanguageQuestionAnalysisShape(baseAnalysis)).toBe(true);
  });

  it.each(['year', 'kind', 'originalQuestion', 'answerExplanation', 'diagramInstructions'] as const)(
    'rejects missing required field %s',
    (field) => {
      expect(hasLanguageQuestionAnalysisShape({ ...baseAnalysis, [field]: '' })).toBe(false);
    }
  );

  it('allows open questions to keep empty choices and accepted answers explicitly', () => {
    expect(
      hasLanguageQuestionAnalysisShape({
        ...baseAnalysis,
        subject: 'chinese',
        kind: 'chinese-composition',
        questionType: 'composition',
        choices: [],
        acceptedAnswers: [],
        answerExplanation: '作文題沒有單一標準答案，需看立意、結構、例證與語句。'
      })
    ).toBe(true);
  });

  it('requires sourceRef to carry source file, page state, original excerpt, extraction status, and ad flag', () => {
    expect(hasLanguageQuestionSourceRefShape({ ...baseAnalysis.sourceRef, pageNumber: 2 })).toBe(true);
    expect(hasLanguageQuestionSourceRefShape({ ...baseAnalysis.sourceRef, pageNumber: 0 })).toBe(false);
    expect(hasLanguageQuestionSourceRefShape({ ...baseAnalysis.sourceRef, fileName: '' })).toBe(false);
    expect(hasLanguageQuestionSourceRefShape({ ...baseAnalysis.sourceRef, originalExcerpt: ' ' })).toBe(false);
    expect(hasLanguageQuestionSourceRefShape({ ...baseAnalysis.sourceRef, adContentRemoved: 'yes' })).toBe(false);
  });
});
