import { describe, expect, it, vi } from 'vitest';
import { getServiceWorkerScriptUrl, registerExamServiceWorker } from '@/app/pwa';

describe('PWA service worker registration', () => {
  it('builds the service worker URL and scope from the current app base path', () => {
    expect(getServiceWorkerScriptUrl('/finPubTest/')).toEqual({
      scriptUrl: '/finPubTest/service-worker.js',
      scope: '/finPubTest/'
    });
  });

  it('reports unsupported browsers without throwing', async () => {
    const state = await registerExamServiceWorker({}, '/finPubTest/');

    expect(state.status).toBe('unsupported');
    expect(state.message).toContain('離線功能尚未就緒');
  });

  it('reports readiness after registration and ready promise resolve', async () => {
    const register = vi.fn().mockResolvedValue({});
    const state = await registerExamServiceWorker(
      {
        serviceWorker: {
          register,
          ready: Promise.resolve({})
        }
      },
      '/finPubTest/'
    );

    expect(register).toHaveBeenCalledWith('/finPubTest/service-worker.js', { scope: '/finPubTest/' });
    expect(state.status).toBe('ready');
    expect(state.message).toBe('離線閱讀已就緒');
  });

  it('keeps the online site usable when registration rejects', async () => {
    const register = vi.fn().mockRejectedValue(new Error('install failed'));
    const state = await registerExamServiceWorker(
      {
        serviceWorker: {
          register
        }
      },
      '/'
    );

    expect(state.status).toBe('error');
    expect(state.message).toContain('離線功能尚未就緒');
  });
});
