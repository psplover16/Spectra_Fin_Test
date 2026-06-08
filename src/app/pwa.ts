import type { InjectionKey, Ref } from 'vue';

export type OfflineReadinessStatus = 'checking' | 'ready' | 'unsupported' | 'error';

export interface OfflineReadinessState {
  status: OfflineReadinessStatus;
  message: string;
}

interface ServiceWorkerContainerLike {
  register(scriptURL: string, options?: RegistrationOptions): Promise<unknown>;
  ready?: Promise<unknown>;
}

export interface NavigatorWithServiceWorker {
  serviceWorker?: ServiceWorkerContainerLike;
}

export const defaultOfflineReadinessState: OfflineReadinessState = {
  status: 'checking',
  message: '離線閱讀準備中'
};

export const offlineReadinessKey: InjectionKey<Ref<OfflineReadinessState>> = Symbol('offline-readiness');

function normalizeBasePath(basePath: string): string {
  if (!basePath || basePath === '.') {
    return '/';
  }

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function getServiceWorkerScriptUrl(basePath = import.meta.env.BASE_URL): {
  scriptUrl: string;
  scope: string;
} {
  const scope = normalizeBasePath(basePath);

  return {
    scriptUrl: `${scope}service-worker.js`,
    scope
  };
}

export async function registerExamServiceWorker(
  navigatorLike: NavigatorWithServiceWorker = navigator,
  basePath = import.meta.env.BASE_URL
): Promise<OfflineReadinessState> {
  const serviceWorker = navigatorLike.serviceWorker;

  if (!serviceWorker) {
    return {
      status: 'unsupported',
      message: '離線功能尚未就緒，仍可線上瀏覽'
    };
  }

  try {
    const { scriptUrl, scope } = getServiceWorkerScriptUrl(basePath);

    await serviceWorker.register(scriptUrl, { scope });
    await serviceWorker.ready;

    return {
      status: 'ready',
      message: '離線閱讀已就緒'
    };
  } catch {
    return {
      status: 'error',
      message: '離線功能尚未就緒，仍可線上瀏覽'
    };
  }
}
