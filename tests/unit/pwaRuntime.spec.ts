import { describe, expect, it, vi } from 'vitest';

vi.mock('virtual:pwa-register', () => ({ registerSW: vi.fn() }));

import { createPwaRuntime } from '@/app/pwa';

describe('PWA plugin runtime wrapper', () => {
  it('reports unsupported browsers without calling the plugin register function', () => {
    const registerSW = vi.fn();
    const runtime = createPwaRuntime({
      registerSW,
      serviceWorkerSupported: false
    });

    expect(registerSW).not.toHaveBeenCalled();
    expect(runtime.state.value.status).toBe('unsupported');
    expect(runtime.state.value.message).toContain('離線功能尚未就緒');
  });

  it('wraps vite-plugin-pwa registration callbacks without manual service worker registration', () => {
    const updateServiceWorker = vi.fn();
    const registerSW = vi.fn().mockReturnValue(updateServiceWorker);
    const runtime = createPwaRuntime({
      registerSW,
      serviceWorkerSupported: true
    });
    const options = registerSW.mock.calls[0]?.[0];

    expect(registerSW).toHaveBeenCalledTimes(1);
    expect(options.immediate).toBe(true);
    expect(runtime.updateServiceWorker).toBe(updateServiceWorker);

    options.onOfflineReady();
    expect(runtime.state.value.status).toBe('ready');
    expect(runtime.state.value.message).toBe('離線閱讀已就緒');
  });

  it('surfaces update availability from the plugin runtime', () => {
    const registerSW = vi.fn().mockReturnValue(vi.fn());
    const runtime = createPwaRuntime({
      registerSW,
      serviceWorkerSupported: true
    });
    const options = registerSW.mock.calls[0]?.[0];

    options.onNeedRefresh();

    expect(runtime.state.value.status).toBe('updateAvailable');
    expect(runtime.state.value.message).toBe('有新版講義可更新');
  });

  it('surfaces plugin registration errors without throwing', () => {
    const registerSW = vi.fn(() => {
      throw new Error('plugin registration failed');
    });
    const runtime = createPwaRuntime({
      registerSW,
      serviceWorkerSupported: true
    });

    expect(runtime.state.value.status).toBe('error');
    expect(runtime.state.value.message).toContain('離線功能尚未就緒');
  });
});
