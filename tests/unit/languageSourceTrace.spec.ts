import { describe, expect, it } from 'vitest';
import {
  containsLanguageAdvertisementText,
  hasLanguageQuestionAnalysisShape,
  hasNoLanguageAdvertisementText,
  type LanguageQuestionAnalysis
} from '@/modules/examGroups/language/types/languageQuestionAnalysis';

const cleanAnalysis: LanguageQuestionAnalysis = {
  year: '112',
  number: 2,
  subject: 'chinese',
  kind: 'chinese-reading',
  sourceBatch: '112-language-batch-1',
  examPoints: ['閱讀理解', '文意判斷'],
  difficulty: 'intermediate',
  questionType: 'choice',
  originalQuestion: '請依上文判斷作者主要態度。',
  choices: [
    { label: 'A', text: '肯定' },
    { label: 'B', text: '反諷' }
  ],
  acceptedAnswers: ['A'],
  answerExplanation: '文章反覆使用正面語詞，主旨是肯定題中行動。',
  teachingNotes: ['先找情緒詞，再回到主旨句確認作者態度。'],
  strategyTips: ['避免只看單一句，要看段落整體語氣。'],
  diagramInstructions: '不適用：本題只需文字證據，不需要結構圖。',
  diagramAltText: '無圖解；以文意證據判斷作者態度。',
  handoutRefs: ['L-112-reading-attitude'],
  sourceRef: {
    fileName: '112.pdf',
    pageNumber: 'pending',
    originalExcerpt: '請依上文判斷作者主要態度。',
    extractionStatus: 'needs-review',
    adContentRemoved: true
  },
  reviewStatus: 'needs-review'
};

describe('language source trace ad removal', () => {
  it('keeps app-facing language content free of advertisement strings when adContentRemoved is true', () => {
    expect(cleanAnalysis.sourceRef.adContentRemoved).toBe(true);
    expect(hasNoLanguageAdvertisementText(cleanAnalysis)).toBe(true);
    expect(hasLanguageQuestionAnalysisShape(cleanAnalysis)).toBe(true);
  });

  it.each([
    ['URL', '完整解析請看 https://ad.example.com/language'],
    ['phone', '洽詢電話：02-12345678'],
    ['Line', '加入 Line ID @examwinner 取得詳解'],
    ['marketing', '限時優惠，立即報名保證上榜']
  ])('detects %s advertisement text before it reaches app-facing content', (_label, text) => {
    expect(containsLanguageAdvertisementText(text)).toBe(true);
  });

  it('rejects an ad-removed language source trace when the excerpt still exposes advertisement text', () => {
    const polluted = {
      ...cleanAnalysis,
      sourceRef: {
        ...cleanAnalysis.sourceRef,
        originalExcerpt: '請依上文判斷作者主要態度。完整解答請加 Line ID @examwinner。'
      }
    };

    expect(hasNoLanguageAdvertisementText(polluted)).toBe(false);
    expect(hasLanguageQuestionAnalysisShape(polluted)).toBe(false);
  });
});
