import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AGroupQuestionCard from '@/modules/examGroups/aGroup/components/AGroupQuestionCard.vue';
import { questions as questions107 } from '@/modules/examGroups/aGroup/data/years/107';
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
    const answerToggle = originalSection.get('[data-testid="official-answer-toggle"]');

    expect(originalSection.text()).toContain(question.originalStem);
    expect(answerToggle.text()).toContain('官方答案');
    expect(answerToggle.text()).not.toContain('答案：C');
    expect(originalSection.text()).not.toContain('答案：C');
    expect(originalSection.text()).not.toContain('官方答案狀態');
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

  it('renders optional teaching comparison tables', () => {
    const tableQuestion: ExamQuestionAnalysis = {
      ...question,
      teachingTables: [
        {
          title: 'list、tuple 與 set 核心差異',
          headers: ['比較面向', 'list', 'tuple', 'set'],
          rows: [
            ['是否可修改內容', '可變', '不可變', 'set 可變'],
            ['是否支援索引', '支援', '支援', '不支援']
          ]
        }
      ]
    };
    const wrapper = mount(AGroupQuestionCard, {
      props: { question: tableQuestion }
    });
    const tableSection = wrapper.find('[data-testid="teaching-tables"]');

    expect(tableSection.exists()).toBe(true);
    expect(tableSection.text()).toContain('list、tuple 與 set 核心差異');
    expect(tableSection.text()).toContain('比較面向');
    expect(tableSection.text()).toContain('是否可修改內容');
    expect(tableSection.text()).toContain('不可變');
    expect(tableSection.text()).toContain('不支援');
  });

  it.each([
    ['verified', null],
    ['needs-review', 'Extracted official answer and extracted option text require human review'],
    [
      'suspected-error',
      'Teaching analysis identifies a conflict between the official answer and the technical rule'
    ]
  ] satisfies [AnswerVerification, string | null][])(
    'reveals the official answer details for %s only after clicking the official answer',
    async (answerVerification, answerNote) => {
      const wrapper = mount(AGroupQuestionCard, {
        props: {
          question: makeQuestion(answerVerification, answerNote)
        }
      });

      expect(wrapper.find('[data-testid="official-answer-details"]').exists()).toBe(false);
      const answerToggle = wrapper.get('[data-testid="official-answer-toggle"]');
      expect(answerToggle.attributes('aria-expanded')).toBe('false');
      expect(answerToggle.text()).not.toContain('答案：C');

      await answerToggle.trigger('click');

      expect(answerToggle.attributes('aria-expanded')).toBe('true');
      const answerDetails = wrapper.get('[data-testid="official-answer-details"]');
      expect(answerDetails.text()).toContain('答案：C');
      expect(answerDetails.text()).not.toContain('官方答案狀態');
      expect(answerDetails.text()).not.toContain('官方答案已驗證');
      if (answerNote) {
        expect(answerDetails.text()).toContain(answerNote);
      }
    }
  );

  it('hides answer details again when the official answer is clicked twice', async () => {
    const wrapper = mount(AGroupQuestionCard, {
      props: { question }
    });
    const answerToggle = wrapper.get('[data-testid="official-answer-toggle"]');

    await answerToggle.trigger('click');
    expect(wrapper.find('[data-testid="official-answer-details"]').exists()).toBe(true);

    await answerToggle.trigger('click');
    expect(wrapper.find('[data-testid="official-answer-details"]').exists()).toBe(false);
    expect(answerToggle.attributes('aria-expanded')).toBe('false');
  });

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

  it('renders a 107 historical question while keeping source content and teaching analysis separate', () => {
    const historicalQuestion = questions107[0];
    const wrapper = mount(AGroupQuestionCard, {
      props: { question: historicalQuestion }
    });
    const originalSection = wrapper.find('[data-testid="original-exam-section"]');
    const teachingSection = wrapper.find('[data-testid="teaching-analysis-section"]');
    const source = wrapper.find('[data-testid="source-traceability"]');

    expect(originalSection.text()).toContain(historicalQuestion.originalStem);
    expect(originalSection.text()).toContain('官方答案');
    expect(originalSection.text()).not.toContain(`答案：${historicalQuestion.acceptedAnswers.join('、')}`);
    expect(originalSection.text()).toContain(`A. ${historicalQuestion.options.A}`);
    expect(originalSection.text()).toContain(`D. ${historicalQuestion.options.D}`);
    expect(teachingSection.text()).toContain(historicalQuestion.beginnerExplanation.split('\n')[0]);
    expect(teachingSection.text()).not.toContain(historicalQuestion.originalStem);
    expect(source.text()).toContain('107 年');
    expect(source.text()).toContain('107.pdf');
  });
});
