import { describe, expect, it } from 'vitest';
import {
  containsBGroupAdvertisementText,
  getBGroupAppFacingTextSegments,
  hasBGroupEssayQuestionAnalysisShape,
  hasNoBGroupAdvertisementText,
  type BGroupEssayQuestionAnalysis
} from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const cleanAdRemovedAnalysis: BGroupEssayQuestionAnalysis = {
  year: '114',
  number: 2,
  subject: 'information-management',
  sourceBatch: '114-pending-index-batch-1',
  examPoints: ['資訊系統規劃', '資料來源追蹤'],
  difficulty: 'basic',
  questionType: 'essay',
  originalQuestion: '請說明資訊系統導入前進行需求訪談的目的。',
  questionExplanation: '本題重點是把需求訪談連到利害關係人確認、範圍界定與後續驗收依據。',
  modelAnswer: '需求訪談可釐清使用者痛點、確認流程限制，並降低系統完成後與實際需求落差的風險。',
  modelAnswerDetails: [
    '回答時可先說明訪談對象包含使用者、主管與系統維護者。',
    '再說明訪談紀錄會轉成需求規格，作為設計與驗收依據。'
  ],
  diagramInstructions: '不適用：本題沒有要求流程圖或架構圖。',
  diagramAltText: '無圖解；以文字說明需求訪談目的。',
  keyTerms: ['需求訪談', '利害關係人', '需求規格'],
  scoringPoints: ['說明訪談目的', '連結需求規格', '指出降低落差或風險'],
  commonMistakes: ['只寫溝通很重要，未說明需求文件用途', '把訪談誤寫成系統測試'],
  handoutRefs: ['B-114-系統分析-需求訪談'],
  sourceRef: {
    fileName: '114.pdf',
    pageNumber: 'pending',
    originalExcerpt: '請說明資訊系統導入前進行需求訪談的目的。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  reviewStatus: 'needs-review'
};

function makeAnalysis(overrides: Partial<BGroupEssayQuestionAnalysis> = {}): BGroupEssayQuestionAnalysis {
  return {
    ...cleanAdRemovedAnalysis,
    ...overrides,
    sourceRef: {
      ...cleanAdRemovedAnalysis.sourceRef,
      ...overrides.sourceRef
    }
  };
}

describe('B group source trace ad removal', () => {
  it('keeps app-facing content free of URL, phone, Line, and marketing strings when adContentRemoved is true', () => {
    const appFacingContent = getBGroupAppFacingTextSegments(cleanAdRemovedAnalysis).join('\n');

    expect(cleanAdRemovedAnalysis.sourceRef.adContentRemoved).toBe(true);
    expect(hasNoBGroupAdvertisementText(cleanAdRemovedAnalysis)).toBe(true);
    expect(hasBGroupEssayQuestionAnalysisShape(cleanAdRemovedAnalysis)).toBe(true);
    expect(appFacingContent).not.toMatch(/https?:\/\/|www\.|電話[:：]|line\s*(id|@)|補習班|立即報名|限時優惠/i);
  });

  it.each([
    ['URL', '完整解析請看 https://ad.example.com/b-group'],
    ['phone', '洽詢電話：02-12345678'],
    ['Line', '加入 Line ID @examwinner 取得詳解'],
    ['marketing', '限時優惠，立即報名保證上榜']
  ])('detects %s advertisement text before it reaches app-facing content', (_label, text) => {
    expect(containsBGroupAdvertisementText(text)).toBe(true);
  });

  it('rejects an ad-removed source trace when the original excerpt still exposes advertisement text', () => {
    const pollutedSourceTrace = makeAnalysis({
      sourceRef: {
        ...cleanAdRemovedAnalysis.sourceRef,
        originalExcerpt: '請說明需求訪談目的。完整解答請加 Line ID @examwinner。'
      }
    });

    expect(pollutedSourceTrace.sourceRef.adContentRemoved).toBe(true);
    expect(hasNoBGroupAdvertisementText(pollutedSourceTrace)).toBe(false);
    expect(hasBGroupEssayQuestionAnalysisShape(pollutedSourceTrace)).toBe(false);
  });

  it('rejects an ad-removed analysis when generated teaching fields contain marketing leftovers', () => {
    const pollutedTeachingContent = makeAnalysis({
      questionExplanation: '本題重點是需求訪談；想看更多可參加補習班免費試聽。'
    });

    expect(pollutedTeachingContent.sourceRef.adContentRemoved).toBe(true);
    expect(hasNoBGroupAdvertisementText(pollutedTeachingContent)).toBe(false);
    expect(hasBGroupEssayQuestionAnalysisShape(pollutedTeachingContent)).toBe(false);
  });
});
