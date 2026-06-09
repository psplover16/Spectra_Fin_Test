import { ref, type InjectionKey, type Ref } from 'vue';

export type OfflineReadinessStatus = 'checking' | 'ready' | 'unsupported' | 'error' | 'updateAvailable';

export interface OfflineReadinessState {
  status: OfflineReadinessStatus;
  message: string;
}

export interface RegisterSWOptions {
  immediate?: boolean;
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
  onRegisterError?: (error: unknown) => void;
}

export type UpdateServiceWorker = (reloadPage?: boolean) => void | Promise<void>;
export type RegisterSW = (options?: RegisterSWOptions) => UpdateServiceWorker;

export interface PwaRuntimeOptions {
  registerSW?: RegisterSW;
  serviceWorkerSupported?: boolean;
}

export interface PwaRuntime {
  state: Ref<OfflineReadinessState>;
  updateServiceWorker: UpdateServiceWorker;
}

export const defaultOfflineReadinessState: OfflineReadinessState = {
  status: 'checking',
  message: '離線閱讀準備中'
};

export const offlineReadinessKey: InjectionKey<Ref<OfflineReadinessState>> = Symbol('offline-readiness');

const unsupportedState: OfflineReadinessState = {
  status: 'unsupported',
  message: '離線功能尚未就緒，仍可線上瀏覽'
};

const readyState: OfflineReadinessState = {
  status: 'ready',
  message: '離線閱讀已就緒'
};

const errorState: OfflineReadinessState = {
  status: 'error',
  message: '離線功能尚未就緒，仍可線上瀏覽'
};

const updateAvailableState: OfflineReadinessState = {
  status: 'updateAvailable',
  message: '有新版講義可更新'
};

function isServiceWorkerSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
}

const missingRegisterSW: RegisterSW = () => {
  throw new Error('vite-plugin-pwa registerSW implementation is required.');
};

export function createPwaRuntime({
  registerSW = missingRegisterSW,
  serviceWorkerSupported = isServiceWorkerSupported()
}: PwaRuntimeOptions = {}): PwaRuntime {
  const state = ref<OfflineReadinessState>(defaultOfflineReadinessState);
  let updateServiceWorker: UpdateServiceWorker = () => undefined;

  if (!serviceWorkerSupported) {
    state.value = unsupportedState;

    return {
      state,
      updateServiceWorker
    };
  }

  try {
    updateServiceWorker = registerSW({
      immediate: true,
      onOfflineReady: () => {
        state.value = readyState;
      },
      onNeedRefresh: () => {
        state.value = updateAvailableState;
      },
      onRegisterError: () => {
        state.value = errorState;
      }
    });
  } catch {
    state.value = errorState;
  }

  return {
    state,
    updateServiceWorker
  };
}
