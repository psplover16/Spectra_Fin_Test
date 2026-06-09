import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { describe, expect, it, vi } from 'vitest';
import { createAppRouter } from '@/app/router';
import AGroupView from '@/modules/examGroups/aGroup/views/AGroupView.vue';
import { A_GROUP_YEAR_SUMMARIES } from '@/modules/examGroups/aGroup/data/yearSummaries';

describe('A group year summaries', () => {
  async function mountAGroupView() {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/a-group');
    await router.isReady();

    const wrapper = mount(AGroupView, {
      global: {
        plugins: [router]
      }
    });

    return { router, wrapper };
  }

  it('lists exactly eight years in descending order', () => {
    expect(A_GROUP_YEAR_SUMMARIES.map((summary) => summary.year)).toEqual([
      '114',
      '113',
      '112',
      '111',
      '110',
      '109',
      '108',
      '107'
    ]);
    expect(A_GROUP_YEAR_SUMMARIES).toHaveLength(8);
    expect(A_GROUP_YEAR_SUMMARIES.every((summary) => summary.status === 'complete')).toBe(true);
    expect(A_GROUP_YEAR_SUMMARIES.every((summary) => summary.questionCount === 50)).toBe(true);
  });

  it('renders the ordered year rows on the A group page', async () => {
    const { wrapper } = await mountAGroupView();
    const rows = wrapper.findAll('[data-testid="a-group-year-row"]');

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
  });

  it.each([
    ['114', '/a-group/114'],
    ['113', '/a-group/113'],
    ['107', '/a-group/107']
  ])('navigates from year %s row main area', async (year, routePath) => {
    const { router, wrapper } = await mountAGroupView();
    const push = vi.spyOn(router, 'push');

    await wrapper.find(`[data-testid="a-group-year-main"][data-year="${year}"]`).trigger('click', {
      button: 0
    });
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flushPromises();

    expect(push).toHaveBeenCalledWith(routePath);
  });

  it('persists one bookmark and restores it after remount', async () => {
    localStorage.clear();
    const { wrapper } = await mountAGroupView();

    await wrapper.find('[data-testid="a-group-bookmark-control"][data-year="114"]').trigger('click');
    await wrapper.find('[data-testid="a-group-bookmark-control"][data-year="113"]').trigger('click');

    expect(JSON.parse(localStorage.getItem('finpub:a-group-progress:v1') ?? '{}').bookmark.year).toBe('113');

    wrapper.unmount();
    const { wrapper: reloadedWrapper } = await mountAGroupView();

    expect(
      reloadedWrapper
        .find('[data-testid="a-group-bookmark-control"][data-year="113"]')
        .attributes('data-bookmarked')
    ).toBe('true');
    expect(
      reloadedWrapper
        .find('[data-testid="a-group-bookmark-control"][data-year="114"]')
        .attributes('data-bookmarked')
    ).toBe('false');
  });

  it('persists completed years and restores them after remount', async () => {
    localStorage.clear();
    const { wrapper } = await mountAGroupView();

    await wrapper.find('[data-testid="a-group-completion-control"][data-year="114"]').setValue(true);

    expect(JSON.parse(localStorage.getItem('finpub:a-group-progress:v1') ?? '{}').completedYears).toEqual([
      '114'
    ]);

    wrapper.unmount();
    const { wrapper: reloadedWrapper } = await mountAGroupView();
    const reloadedControl = reloadedWrapper.find(
      '[data-testid="a-group-completion-control"][data-year="114"]'
    );

    expect((reloadedControl.element as HTMLInputElement).checked).toBe(true);

    await reloadedControl.setValue(false);

    expect(JSON.parse(localStorage.getItem('finpub:a-group-progress:v1') ?? '{}').completedYears).toEqual([]);
  });

  it('clears the visible bookmark when the bookmarked year is completed', async () => {
    localStorage.clear();
    const { wrapper } = await mountAGroupView();

    await wrapper.find('[data-testid="a-group-bookmark-control"][data-year="114"]').trigger('click');
    await wrapper.find('[data-testid="a-group-completion-control"][data-year="114"]').setValue(true);

    expect(
      wrapper.find('[data-testid="a-group-bookmark-control"][data-year="114"]').attributes('data-bookmarked')
    ).toBe('false');
    expect(JSON.parse(localStorage.getItem('finpub:a-group-progress:v1') ?? '{}').bookmark).toBeNull();
  });

  it('does not navigate when bookmark and completion controls are used', async () => {
    localStorage.clear();
    const { router, wrapper } = await mountAGroupView();
    const push = vi.spyOn(router, 'push');

    await wrapper.find('[data-testid="a-group-bookmark-control"][data-year="114"]').trigger('click');
    await wrapper.find('[data-testid="a-group-completion-control"][data-year="114"]').setValue(true);

    expect(push).not.toHaveBeenCalled();
    expect(router.currentRoute.value.fullPath).toBe('/a-group');
  });

  it('renders with no completed years or bookmark when progress storage is corrupt', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    localStorage.setItem('finpub:a-group-progress:v1', '{not-json');

    const { wrapper } = await mountAGroupView();

    expect(wrapper.findAll('[data-testid="a-group-year-row"]')).toHaveLength(8);
    expect(
      wrapper.findAll('[data-testid="a-group-bookmark-control"]').every((control) => {
        return control.attributes('data-bookmarked') === 'false';
      })
    ).toBe(true);
    expect(
      wrapper.findAll('[data-testid="a-group-completion-control"]').every((control) => {
        return (control.element as HTMLInputElement).checked === false;
      })
    ).toBe(true);
    expect(error).not.toHaveBeenCalled();

    error.mockRestore();
  });
});
