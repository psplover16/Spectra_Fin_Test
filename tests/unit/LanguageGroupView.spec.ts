import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '@/app/router';
import LanguageGroupView from '@/modules/examGroups/language/views/LanguageGroupView.vue';
import { LANGUAGE_YEAR_SUMMARIES } from '@/modules/examGroups/language/data/yearSummaries';
import { readLanguageProgressSnapshot } from '@/modules/examGroups/language/storage/languageProgressStorage';

beforeEach(() => {
  localStorage.clear();
});

async function mountLanguageGroupView() {
  const router = createAppRouter(createMemoryHistory());

  await router.push('/language');
  await router.isReady();

  const wrapper = mount(LanguageGroupView, {
    global: {
      plugins: [router]
    }
  });

  return { wrapper, router };
}

describe('LanguageGroupView', () => {
  it('renders language source year rows in descending order', async () => {
    const { wrapper } = await mountLanguageGroupView();
    const rows = wrapper.findAll('[data-testid="language-year-row"]');

    expect(rows.map((row) => row.attributes('data-year'))).toEqual(['112', '111', '110', '109', '108', '107']);
    expect(rows.map((row) => row.attributes('data-year'))).not.toContain('113');
    expect(rows.map((row) => row.attributes('data-year'))).not.toContain('114');

    rows.forEach((row, index) => {
      const summary = LANGUAGE_YEAR_SUMMARIES[index];

      expect(row.text()).toContain(`${summary.year} 年`);
      expect(row.text()).toContain(`${summary.questionCount} 題`);
      expect(row.text()).toContain(summary.statusLabel);
    });
  });

  it('links each year row main area to the matching language year route', async () => {
    const { wrapper, router } = await mountLanguageGroupView();
    const yearMain = wrapper.get('[data-testid="language-year-main"][data-year="112"]');
    const resolved = router.resolve(yearMain.attributes('href'));

    expect(yearMain.attributes('href')).toBe('/language/112');
    expect(resolved.name).toBe('language-year');
    expect(resolved.matched.at(-1)?.name).not.toBe('not-found');
  });

  it('persists a bookmark without navigating away from the language list', async () => {
    const { wrapper, router } = await mountLanguageGroupView();
    const bookmarkControl = wrapper.get('[data-testid="language-bookmark-control"][data-year="112"]');

    await bookmarkControl.trigger('click');

    expect(router.currentRoute.value.fullPath).toBe('/language');
    expect(bookmarkControl.attributes('data-bookmarked')).toBe('true');
    expect(readLanguageProgressSnapshot().bookmark?.year).toBe('112');
  });

  it('persists completion and clears the bookmark for the completed language year', async () => {
    const { wrapper, router } = await mountLanguageGroupView();
    const bookmarkControl = wrapper.get('[data-testid="language-bookmark-control"][data-year="112"]');
    const completionControl = wrapper.get<HTMLInputElement>(
      '[data-testid="language-completion-control"][data-year="112"]'
    );

    await bookmarkControl.trigger('click');
    await completionControl.setValue(true);

    const snapshot = readLanguageProgressSnapshot();

    expect(router.currentRoute.value.fullPath).toBe('/language');
    expect(completionControl.element.checked).toBe(true);
    expect(snapshot.completedYears).toEqual(['112']);
    expect(snapshot.bookmark).toBeNull();
    expect(bookmarkControl.attributes('data-bookmarked')).toBe('false');
  });
});
