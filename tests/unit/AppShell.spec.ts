import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import { createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';
import AppShell from '@/app/AppShell.vue';
import { offlineReadinessKey, type OfflineReadinessState } from '@/app/pwa';
import { createAppRouter } from '@/app/router';

async function mountShellAt(path: string, offlineReadiness?: OfflineReadinessState) {
  const router = createAppRouter(createMemoryHistory());

  await router.push(path);
  await router.isReady();

  return mount(AppShell, {
    global: {
      plugins: [router],
      provide: offlineReadiness
        ? {
            [offlineReadinessKey as symbol]: ref(offlineReadiness)
          }
        : {}
    }
  });
}

describe('AppShell primary navigation', () => {
  it('shows group navigation links', async () => {
    const wrapper = await mountShellAt('/a-group');
    const links = wrapper.findAll('[data-testid="primary-nav-link"]');

    expect(links.map((link) => link.text())).toEqual(['A 組', 'B 組', '語言']);
    expect(links.map((link) => link.attributes('href'))).toEqual(['/a-group', '/b-group', '/language']);
  });

  it('marks the active group route', async () => {
    const wrapper = await mountShellAt('/b-group');
    const activeLink = wrapper.find('[data-testid="primary-nav-link"][aria-current="page"]');

    expect(activeLink.exists()).toBe(true);
    expect(activeLink.text()).toBe('B 組');
    expect(activeLink.attributes('data-active')).toBe('true');
  });

  it('renders unsupported PWA status without blocking the A group learning route', async () => {
    const wrapper = await mountShellAt('/a-group', {
      status: 'unsupported',
      message: '離線功能尚未就緒，仍可線上瀏覽'
    });

    await flushPromises();

    const status = wrapper.find('[data-testid="offline-readiness"]');
    expect(status.attributes('data-status')).toBe('unsupported');
    expect(status.text()).toContain('離線功能尚未就緒');
    expect(wrapper.find('[data-testid="a-group-view"]').exists()).toBe(true);
  });

  it('renders update availability without blocking the A group learning route', async () => {
    const wrapper = await mountShellAt('/a-group', {
      status: 'updateAvailable',
      message: '有新版講義可更新'
    });

    await flushPromises();

    const status = wrapper.find('[data-testid="offline-readiness"]');
    expect(status.attributes('data-status')).toBe('updateAvailable');
    expect(status.text()).toBe('有新版講義可更新');
    expect(wrapper.find('[data-testid="a-group-view"]').exists()).toBe(true);
  });
});
