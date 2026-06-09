import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AGroupQuestionCard from '@/modules/examGroups/aGroup/components/AGroupQuestionCard.vue';
import type { AnswerVerification, ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

const question: ExamQuestionAnalysis = {
  year: '114',
  number: 1,
  acceptedAnswers: ['C'],
  answerNote: null,
  answerVerification: 'verified',
  originalStem: '在 6 位元 2 的補數系統中，執行 100111+111000 後，以 10 進位表示為何？',
  options: {
    A: '0',
    B: '1',
    C: '31',
    D: '33'
  },
  coreTerms: ['二補數加法'],
  beginnerExplanation: '先判斷符號位，再把結果轉回十進位。',
  solvingSteps: ['對齊位元', '執行加法', '判斷 6 位元結果'],
  optionExplanations: {
    A: 'A 少算了補數結果。',
    B: 'B 沒有保留 6 位元結果。',
    C: 'C 是官方答案。',
    D: 'D 超出 6 位元可表示的正數範圍。'
  },
  keyTakeaways: ['二補數需先確認位元寬度。'],
  tags: ['computer-principles'],
  sourceRef: {
    year: '114',
    fileName: '114.pdf',
    pageNumber: 1,
    extractionStatus: 'verified'
  }
};

function makeQuestion(answerVerification: AnswerVerification, answerNote: string | null): ExamQuestionAnalysis {
  return {
    ...question,
    answerVerification,
    answerNote
  };
}

describe('AGroupQuestionCard', () => {
  it('separates original exam content from generated teaching analysis', () => {
    const wrapper = mount(AGroupQuestionCard, {
      props: { question }
    });
    const originalSection = wrapper.find('[data-testid="original-exam-section"]');
    const teachingSection = wrapper.find('[data-testid="teaching-analysis-section"]');

    expect(originalSection.text()).toContain(question.originalStem);
    expect(originalSection.text()).toContain('官方答案：C');
    expect(originalSection.text()).toContain('A. 0');
    expect(originalSection.text()).toContain('B. 1');
    expect(originalSection.text()).toContain('C. 31');
    expect(originalSection.text()).toContain('D. 33');

    expect(teachingSection.text()).toContain(question.beginnerExplanation);
    expect(teachingSection.text()).toContain('選項解析');
    expect(teachingSection.text()).not.toContain(question.originalStem);
  });

  it('shows beginner teaching fields for a professional subject question', () => {
    const wrapper = mount(AGroupQuestionCard, {
      props: { question }
    });
    const teachingSection = wrapper.find('[data-testid="teaching-analysis-section"]');
    const text = teachingSection.text();

    expect(text).toContain('核心術語');
    expect(text).toContain('二補數加法');
    expect(text).toContain(question.beginnerExplanation);
    expect(text).toContain('解題步驟');
    expect(text).toContain('對齊位元');
    expect(text).toContain('重點整理');
    expect(text).toContain('二補數需先確認位元寬度。');
    expect(text).toContain('標籤');
    expect(text).toContain('computer-principles');
  });

  it('renders beginner explanation line breaks as readable paragraphs', () => {
    const paragraphQuestion: ExamQuestionAnalysis = {
      ...question,
      beginnerExplanation: ['先建立前置觀念。', '再套用本題條件。', '最後提醒常見陷阱。'].join('\n')
    };
    const wrapper = mount(AGroupQuestionCard, {
      props: { question: paragraphQuestion }
    });
    const paragraphs = wrapper.findAll('[data-testid="beginner-explanation"] p');

    expect(paragraphs).toHaveLength(3);
    expect(paragraphs.map((paragraph) => paragraph.text())).toEqual([
      '先建立前置觀念。',
      '再套用本題條件。',
      '最後提醒常見陷阱。'
    ]);
  });

  it.each([
    ['verified', null, '官方答案已驗證'],
    [
      'needs-review',
      'Extracted official answer and extracted option text require human review',
      '官方答案仍需人工確認'
    ],
    [
      'suspected-error',
      'Teaching analysis identifies a conflict between the official answer and the technical rule',
      '疑似官方答案錯誤'
    ]
  ] satisfies [AnswerVerification, string | null, string][])(
    'shows explicit answer verification state for %s',
    (answerVerification, answerNote, expectedLabel) => {
      const wrapper = mount(AGroupQuestionCard, {
        props: {
          question: makeQuestion(answerVerification, answerNote)
        }
      });
      const verificationStatus = wrapper.find('[data-testid="answer-verification-status"]');

      expect(verificationStatus.text()).toContain(expectedLabel);
      if (answerNote) {
        expect(verificationStatus.text()).toContain(answerNote);
      }
    }
  );

  it('shows source year, source PDF file, and page number when available', () => {
    const wrapper = mount(AGroupQuestionCard, {
      props: { question }
    });
    const source = wrapper.find('[data-testid="source-traceability"]');

    expect(source.text()).toContain('來源');
    expect(source.text()).toContain('114 年');
    expect(source.text()).toContain('114.pdf');
    expect(source.text()).toContain('第 1 頁');
  });
});
