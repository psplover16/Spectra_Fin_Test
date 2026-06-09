export type RoutePreloadKey =
  | 'aGroup'
  | 'aGroupYear'
  | 'bGroup'
  | 'bGroupYear'
  | 'language'
  | 'languageYear'
  | 'learning';

export type RouteComponentLoader = () => Promise<unknown>;

export type RoutePreloadLoaders = Record<RoutePreloadKey, RouteComponentLoader>;

export const routeComponentLoaders: RoutePreloadLoaders = {
  aGroup: () => import('@/modules/examGroups/aGroup/views/AGroupView.vue'),
  aGroupYear: () => import('@/modules/examGroups/aGroup/views/AGroupYearView.vue'),
  bGroup: () => import('@/modules/examGroups/bGroup/views/BGroupView.vue'),
  bGroupYear: () => import('@/modules/examGroups/bGroup/views/BGroupYearView.vue'),
  language: () => import('@/modules/examGroups/language/views/LanguageGroupView.vue'),
  languageYear: () => import('@/modules/examGroups/language/views/LanguageYearView.vue'),
  learning: () => import('@/modules/learning/views/LearningView.vue')
};

function normalizePath(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/';
  const withoutTrailingSlash =
    withoutQuery.length > 1 && withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery;

  return withoutTrailingSlash || '/';
}

export function getRoutePreloadKey(path: string): RoutePreloadKey | null {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === '/a-group') {
    return 'aGroup';
  }

  if (/^\/a-group\/(?:10[7-9]|11[0-4])$/.test(normalizedPath)) {
    return 'aGroupYear';
  }

  if (normalizedPath === '/b-group') {
    return 'bGroup';
  }

  if (/^\/b-group\/(?:10[7-9]|11[0-4])$/.test(normalizedPath)) {
    return 'bGroupYear';
  }

  if (normalizedPath === '/language') {
    return 'language';
  }

  if (/^\/language\/(?:10[7-9]|11[0-2])$/.test(normalizedPath)) {
    return 'languageYear';
  }

  if (normalizedPath === '/learning') {
    return 'learning';
  }

  return null;
}

export function createRoutePreloader(loaders: RoutePreloadLoaders = routeComponentLoaders) {
  const preloadPromises = new Map<RoutePreloadKey, Promise<boolean>>();

  async function preload(path: string): Promise<boolean> {
    const key = getRoutePreloadKey(path);

    if (!key) {
      return false;
    }

    if (!preloadPromises.has(key)) {
      const preloadPromise = loaders[key]()
        .then(() => true)
        .catch((error: unknown) => {
          preloadPromises.delete(key);
          throw error;
        });

      preloadPromises.set(key, preloadPromise);
    }

    return preloadPromises.get(key) ?? false;
  }

  return { preload };
}

const routePreloader = createRoutePreloader();

export function preloadRoute(path: string): Promise<boolean> {
  return routePreloader.preload(path);
}
