import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import LanguageYearView from '@/modules/examGroups/language/views/LanguageYearView.vue';

const routeYear = ref('112');

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
  });

  it('loads the requested language year module when rendered', async () => {
    const wrapper = mount(LanguageYearView);

    await flushPromises();

    expect(loadLanguageYearQuestions).toHaveBeenCalledWith('112');
    expect(wrapper.get('[data-testid="language-year-view"]').text()).toContain('112 年語言逐題解析');
    expect(wrapper.text()).toContain('已載入 0 題解析資料');
  });
});
