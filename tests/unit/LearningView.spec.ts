import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LearningView from '@/modules/learning/views/LearningView.vue';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('LearningView', () => {
  it('renders non-empty placeholder content without notebook controls', () => {
    const wrapper = mount(LearningView);

    expect(wrapper.find('[data-testid="learning-view"]').exists()).toBe(true);
    expect(wrapper.get('h2').text()).toBe('個人學習入口');
    expect(wrapper.text()).toContain('學習筆記區尚未建立');
    expect(wrapper.text()).not.toContain('新增筆記');
    expect(wrapper.text()).not.toContain('儲存筆記');
    expect(wrapper.text()).not.toContain('搜尋筆記');
    expect(wrapper.text()).not.toContain('匯出筆記');
  });

  it('does not read or write notebook storage while rendering the placeholder', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    mount(LearningView);

    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
