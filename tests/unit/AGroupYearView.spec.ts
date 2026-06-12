import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import AGroupYearView from '@/modules/examGroups/aGroup/views/AGroupYearView.vue';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import {
  readYearQuestionBookmark,
  setYearQuestionBookmark
} from '@/modules/examGroups/shared/storage/yearQuestionBookmarkStorage';

const routeYear = ref('114');
const scrollIntoView = vi.fn();

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

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      get year() {
        return routeYear.value;
      }
    }
  })
}));

vi.mock('@/modules/examGroups/aGroup/composables/useAGroupYearQuestions', () => ({
  loadAGroupYearQuestions: vi.fn(async (year: string) => ({
    status: 'complete',
    year,
    questions: [{ ...question, year }]
  }))
}));

describe('AGroupYearView', () => {
  beforeEach(() => {
    routeYear.value = '114';
    localStorage.clear();
    document.body.innerHTML = '';
    scrollIntoView.mockClear();
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView
    });
  });

  it('renders complete year question cards with separated original and teaching sections', async () => {
    const wrapper = mount(AGroupYearView);

    await flushPromises();

    expect(wrapper.find('[data-testid="a-group-question-card"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="original-exam-section"]').text()).toContain(question.originalStem);
    expect(wrapper.find('[data-testid="teaching-analysis-section"]').text()).toContain(question.beginnerExplanation);
  });

  it('renders a historical valid year with complete question analysis cards', async () => {
    routeYear.value = '113';

    const wrapper = mount(AGroupYearView);

    await flushPromises();

    expect(wrapper.get('[data-testid="a-group-year-view"]').text()).toContain('113 年 A 組逐題解析');
    expect(wrapper.get('[data-testid="a-group-year-view"]').text()).not.toContain('等待版型確認後製作');
    expect(wrapper.findAll('[data-testid="a-group-question-card"]')).toHaveLength(1);
    expect(wrapper.text()).toContain('已載入 1 題解析資料');
  });

  it('stores the bookmarked question for the current A group year page', async () => {
    const wrapper = mount(AGroupYearView, {
      attachTo: document.body
    });

    await flushPromises();

    const bookmarkButton = wrapper.get('[data-testid="question-bookmark-button"]');
    expect(bookmarkButton.text()).toContain('書籤');
    expect(bookmarkButton.attributes('aria-pressed')).toBe('false');

    await bookmarkButton.trigger('click');

    expect(readYearQuestionBookmark('a-group', '114')?.questionNumber).toBe(1);
    expect(bookmarkButton.text()).toContain('已書籤');
    expect(bookmarkButton.attributes('aria-pressed')).toBe('true');
  });

  it('scrolls to the stored A group question bookmark when the year page loads', async () => {
    setYearQuestionBookmark('a-group', '114', 1);

    const wrapper = mount(AGroupYearView, {
      attachTo: document.body
    });

    await flushPromises();
    await flushPromises();

    expect(wrapper.get('[data-testid="question-bookmark-button"]').text()).toContain('已書籤');
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
