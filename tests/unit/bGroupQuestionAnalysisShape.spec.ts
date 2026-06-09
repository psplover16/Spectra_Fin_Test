import { describe, expect, it } from 'vitest';
import {
  hasBGroupEssayQuestionAnalysisShape,
  hasBGroupEssaySourceRefShape,
  type BGroupEssayQuestionAnalysis
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const baseAnalysis: BGroupEssayQuestionAnalysis = {
  year: '114',
  number: 1,
  subject: 'mixed',
  sourceBatch: '114-pending-index-batch-1',
  examPoints: ['資訊管理申論', '程式設計觀念整合'],
  difficulty: 'intermediate',
  questionType: 'essay',
  originalQuestion: '說明資料庫正規化的目的，並舉例分析過度重複資料可能造成的問題。',
  questionExplanation: '題目要求先界定正規化，再把重複資料造成的異常連回維護成本與資料一致性。',
  modelAnswer: '正規化是透過拆分資料表與建立關聯，降低重複資料並避免更新、刪除與新增異常。',
  modelAnswerDetails: [
    '先指出第一、第二與第三正規化都在處理欄位相依與重複資料。',
    '再用客戶訂單同表儲存的例子說明同一客戶資料重複會造成更新異常。'
  ],
  diagramInstructions: '不適用：本題為概念說明題，不需要圖形輔助。',
  diagramAltText: '無圖解；以文字說明正規化目的與資料異常即可。',
  keyTerms: ['正規化', '資料重複', '更新異常'],
  scoringPoints: ['清楚定義正規化', '說明至少一種資料異常', '例子能連回資料一致性'],
  commonMistakes: ['只背名詞而未說明異常', '把備份誤寫成正規化目的'],
  handoutRefs: ['B-114-資料庫-正規化'],
  sourceRef: {
    fileName: '114.pdf',
    pageNumber: 'pending',
    originalExcerpt: '待依 114.pdf 題目索引校對第 1 題原文。',
    extractionStatus: 'needs-review',
    adContentRemoved: false
  },
  reviewStatus: 'pending'
};

function makeAnalysis(overrides: Partial<BGroupEssayQuestionAnalysis> = {}): BGroupEssayQuestionAnalysis {
  return {
    ...baseAnalysis,
    ...overrides,
    sourceRef: {
      ...baseAnalysis.sourceRef,
      ...overrides.sourceRef
    }
  };
}

describe('B group essay question analysis shape guard', () => {
  it('accepts a complete essay analysis record with an explicit pending page state', () => {
    expect(hasBGroupEssayQuestionAnalysisShape(baseAnalysis)).toBe(true);
    expect(hasBGroupEssaySourceRefShape(baseAnalysis.sourceRef)).toBe(true);
  });

  it('accepts typed child items without pretending the essay question is an A group four-option item', () => {
    const withChildItems = makeAnalysis({
      childItems: [
        {
          kind: 'short-answer',
          label: '子題一',
          prompt: '列出兩項正規化可降低的資料維護風險。',
          expectedAnswer: '更新異常與刪除異常。',
          scoringPoints: ['答案需明確列出兩項異常', '需連回資料維護風險']
        }
      ]
    });

    expect(hasBGroupEssayQuestionAnalysisShape(withChildItems)).toBe(true);
  });

  it.each([
    'sourceBatch',
    'originalQuestion',
    'questionExplanation',
    'modelAnswer',
    'diagramInstructions',
    'diagramAltText'
  ] as const)('rejects records with an empty %s field', (field) => {
    expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ [field]: '   ' }))).toBe(false);
  });

  it.each(['examPoints', 'modelAnswerDetails', 'keyTerms', 'scoringPoints', 'commonMistakes'] as const)(
    'rejects records when %s is missing non-empty array content',
    (field) => {
      expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ [field]: [] }))).toBe(false);
      expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ [field]: ['有效內容', ''] }))).toBe(false);
    }
  );

  it('requires handoutRefs to be an array while allowing an explicit empty list', () => {
    expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ handoutRefs: [] }))).toBe(true);
    expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ handoutRefs: 'B-114' as unknown as string[] }))).toBe(false);
  });

  it('rejects illegal years, question numbers, review statuses, and extraction statuses', () => {
    expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ year: '106' as BGroupEssayQuestionAnalysis['year'] }))).toBe(
      false
    );
    expect(hasBGroupEssayQuestionAnalysisShape(makeAnalysis({ number: 0 }))).toBe(false);
    expect(
      hasBGroupEssayQuestionAnalysisShape(
        makeAnalysis({ reviewStatus: 'done' as BGroupEssayQuestionAnalysis['reviewStatus'] })
      )
    ).toBe(false);
    expect(
      hasBGroupEssayQuestionAnalysisShape(
        makeAnalysis({
          sourceRef: {
            ...baseAnalysis.sourceRef,
            extractionStatus: 'done' as BGroupEssayQuestionAnalysis['sourceRef']['extractionStatus']
          }
        })
      )
    ).toBe(false);
  });

  it('requires sourceRef to carry a source file, usable page state, original excerpt, extraction status, and ad flag', () => {
    expect(hasBGroupEssaySourceRefShape({ ...baseAnalysis.sourceRef, pageNumber: 2 })).toBe(true);
    expect(hasBGroupEssaySourceRefShape({ ...baseAnalysis.sourceRef, pageNumber: 0 })).toBe(false);
    expect(hasBGroupEssaySourceRefShape({ ...baseAnalysis.sourceRef, fileName: '' })).toBe(false);
    expect(hasBGroupEssaySourceRefShape({ ...baseAnalysis.sourceRef, originalExcerpt: ' ' })).toBe(false);
    expect(hasBGroupEssaySourceRefShape({ ...baseAnalysis.sourceRef, adContentRemoved: 'yes' })).toBe(false);
  });

  it('rejects A group four-option fields at the B group essay top level', () => {
    const aGroupFacade = {
      ...baseAnalysis,
      options: { A: '甲', B: '乙', C: '丙', D: '丁' },
      acceptedAnswers: ['A']
    };

    expect(hasBGroupEssayQuestionAnalysisShape(aGroupFacade)).toBe(false);
  });
});
