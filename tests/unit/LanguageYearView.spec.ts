import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import LanguageYearView from '@/modules/examGroups/language/views/LanguageYearView.vue';
import { questions as languageQuestions112 } from '@/modules/examGroups/language/data/years/112';
import {
  readYearQuestionBookmark,
  setYearQuestionBookmark
} from '@/modules/examGroups/shared/storage/yearQuestionBookmarkStorage';

const routeYear = ref('112');
const scrollIntoView = vi.fn();
const sampleQuestion = languageQuestions112[0];

const loadLanguageYearQuestions = vi.fn(async (year: string) => ({
  status: 'complete',
  year,
  questions: []
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      get year() {
        return routeYear.value;
      }
    }
  })
}));

vi.mock('@/modules/examGroups/language/composables/useLanguageYearQuestions', () => ({
  loadLanguageYearQuestions: (year: string) => loadLanguageYearQuestions(year)
}));

describe('LanguageYearView', () => {
  beforeEach(() => {
    routeYear.value = '112';
    loadLanguageYearQuestions.mockClear();
    localStorage.clear();
    document.body.innerHTML = '';
    scrollIntoView.mockClear();
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView
    });
  });

  it('loads the requested language year module when rendered', async () => {
    const wrapper = mount(LanguageYearView);

    await flushPromises();

    expect(loadLanguageYearQuestions).toHaveBeenCalledWith('112');
    expect(wrapper.get('[data-testid="language-year-view"]').text()).toContain('112 年語言逐題解析');
    expect(wrapper.text()).toContain('已載入 0 題解析資料');
  });

  it('stores the bookmarked question for the current language year page', async () => {
    loadLanguageYearQuestions.mockResolvedValueOnce({
      status: 'complete',
      year: '112',
      questions: [sampleQuestion]
    });

    const wrapper = mount(LanguageYearView, {
      attachTo: document.body
    });

    await flushPromises();

    const bookmarkButton = wrapper.get('[data-testid="question-bookmark-button"]');
    await bookmarkButton.trigger('click');

    expect(readYearQuestionBookmark('language', '112')?.questionNumber).toBe(sampleQuestion.number);
    expect(bookmarkButton.text()).toContain('已書籤');
  });

  it('scrolls to the stored language question bookmark when the year page loads', async () => {
    setYearQuestionBookmark('language', '112', sampleQuestion.number);
    loadLanguageYearQuestions.mockResolvedValueOnce({
      status: 'complete',
      year: '112',
      questions: [sampleQuestion]
    });

    const wrapper = mount(LanguageYearView, {
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
