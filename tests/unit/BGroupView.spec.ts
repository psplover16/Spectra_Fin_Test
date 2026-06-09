import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '@/app/router';
import BGroupView from '@/modules/examGroups/bGroup/views/BGroupView.vue';
import { B_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/bGroup/data/yearSummaries';
import { readBGroupProgressSnapshot } from '@/modules/examGroups/bGroup/storage/bGroupProgressStorage';

beforeEach(() => {
  localStorage.clear();
});

async function mountBGroupView() {
  const router = createAppRouter(createMemoryHistory());

  await router.push('/b-group');
  await router.isReady();

  const wrapper = mount(BGroupView, {
    global: {
      plugins: [router]
    }
  });

  return { wrapper, router };
}

describe('BGroupView', () => {
  it('renders indexed B group year rows in descending order', async () => {
    const { wrapper } = await mountBGroupView();
    const rows = wrapper.findAll('[data-testid="b-group-year-row"]');

    expect(rows.map((row) => row.attributes('data-year'))).toEqual([
      '114',
      '113',
      '112',
      '111',
      '110',
      '109',
      '108',
      '107'
    ]);

    rows.forEach((row, index) => {
      const summary = B_GROUP_YEAR_SUMMARIES[index];

      expect(row.text()).toContain(`${summary.year} 年`);
      expect(row.text()).toContain(`${summary.questionCount} 題`);
      expect(row.text()).toContain(summary.statusLabel);
    });
  });

  it('links each year row main area to the matching B group year route', async () => {
    const { wrapper, router } = await mountBGroupView();
    const yearMain = wrapper.get('[data-testid="b-group-year-main"][data-year="114"]');
    const resolved = router.resolve(yearMain.attributes('href'));

    expect(yearMain.attributes('href')).toBe('/b-group/114');
    expect(resolved.name).toBe('b-group-year');
    expect(resolved.matched.at(-1)?.name).not.toBe('not-found');
  });

  it('persists a bookmark without navigating away from the B group list', async () => {
    const { wrapper, router } = await mountBGroupView();
    const bookmarkControl = wrapper.get('[data-testid="b-group-bookmark-control"][data-year="114"]');

    await bookmarkControl.trigger('click');

    expect(router.currentRoute.value.fullPath).toBe('/b-group');
    expect(bookmarkControl.attributes('data-bookmarked')).toBe('true');
    expect(readBGroupProgressSnapshot().bookmark?.year).toBe('114');
  });

  it('persists completion and clears the bookmark for the completed B group year', async () => {
    const { wrapper, router } = await mountBGroupView();
    const bookmarkControl = wrapper.get('[data-testid="b-group-bookmark-control"][data-year="114"]');
    const completionControl = wrapper.get<HTMLInputElement>(
      '[data-testid="b-group-completion-control"][data-year="114"]'
    );

    await bookmarkControl.trigger('click');
    await completionControl.setValue(true);

    const snapshot = readBGroupProgressSnapshot();

    expect(router.currentRoute.value.fullPath).toBe('/b-group');
    expect(completionControl.element.checked).toBe(true);
    expect(snapshot.completedYears).toEqual(['114']);
    expect(snapshot.bookmark).toBeNull();
    expect(bookmarkControl.attributes('data-bookmarked')).toBe('false');
  });
});
