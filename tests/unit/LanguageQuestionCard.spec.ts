import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LanguageQuestionCard from '@/modules/examGroups/language/components/LanguageQuestionCard.vue';
import { questions } from '@/modules/examGroups/language/data/years/112';

describe('LanguageQuestionCard', () => {
  it('separates original language prompt from generated teaching content', () => {
    const question = questions[2];
    const wrapper = mount(LanguageQuestionCard, {
      props: { question }
    });
    const originalSection = wrapper.get('[data-testid="language-original-section"]');
    const teachingSection = wrapper.get('[data-testid="language-teaching-section"]');

    expect(originalSection.text()).toContain(question.originalQuestion);
    expect(originalSection.text()).toContain('題型');
    expect(originalSection.text()).not.toContain(question.answerExplanation);

    expect(teachingSection.text()).toContain('答案解析');
    expect(teachingSection.text()).toContain(question.answerExplanation);
    expect(teachingSection.text()).toContain('教學筆記');
    expect(teachingSection.text()).toContain('策略提醒');
    expect(teachingSection.text()).not.toContain(question.originalQuestion);
  });

  it('renders text diagram and alt text without image assets', () => {
    const question = questions[5];
    const wrapper = mount(LanguageQuestionCard, {
      props: { question }
    });
    const diagramSection = wrapper.get('[data-testid="language-diagram-section"]');

    expect(diagramSection.text()).toContain('文字圖解');
    expect(diagramSection.text()).toContain('Alt text');
    expect(diagramSection.text()).toContain(question.diagramAltText);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('shows a question bookmark button and emits the current question number', async () => {
    const question = questions[5];
    const wrapper = mount(LanguageQuestionCard, {
      props: {
        question,
        isBookmarked: true
      }
    });
    const bookmarkButton = wrapper.get('[data-testid="question-bookmark-button"]');

    expect(bookmarkButton.text()).toContain('已書籤');
    expect(bookmarkButton.attributes('aria-pressed')).toBe('true');

    await bookmarkButton.trigger('click');

    expect(wrapper.emitted('toggleBookmark')).toEqual([[question.number]]);
  });

  it('shows source traceability with PDF file, page state, and extraction status', () => {
    const question = questions[5];
    const wrapper = mount(LanguageQuestionCard, {
      props: { question }
    });
    const source = wrapper.get('[data-testid="language-source-traceability"]');

    expect(source.text()).toContain('112.pdf');
    expect(source.text()).toContain('4-5');
    expect(source.text()).toContain('needs-review');
  });
});
