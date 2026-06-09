import { describe, expect, it, vi } from 'vitest';
import { createRoutePreloader, getRoutePreloadKey } from '@/app/routePreload';

describe('route preload', () => {
  it.each([
    ['/a-group', 'aGroup'],
    ['/b-group', 'bGroup'],
    ['/language', 'language'],
    ['/a-group/114', 'aGroupYear'],
    ['/a-group/113', 'aGroupYear']
  ] as const)('maps %s to preload key %s', (path, key) => {
    expect(getRoutePreloadKey(path)).toBe(key);
  });

  it('ignores unknown routes', () => {
    expect(getRoutePreloadKey('/outside')).toBeNull();
  });

  it('preloads each matching chunk at most once', async () => {
    const loaders = {
      aGroup: vi.fn().mockResolvedValue({}),
      aGroupYear: vi.fn().mockResolvedValue({}),
      bGroup: vi.fn().mockResolvedValue({}),
      language: vi.fn().mockResolvedValue({})
    };
    const preloader = createRoutePreloader(loaders);

    await expect(preloader.preload('/a-group')).resolves.toBe(true);
    await expect(preloader.preload('/a-group')).resolves.toBe(true);
    await expect(preloader.preload('/a-group/114')).resolves.toBe(true);
    await expect(preloader.preload('/a-group/113')).resolves.toBe(true);
    await expect(preloader.preload('/outside')).resolves.toBe(false);

    expect(loaders.aGroup).toHaveBeenCalledTimes(1);
    expect(loaders.aGroupYear).toHaveBeenCalledTimes(1);
    expect(loaders.bGroup).not.toHaveBeenCalled();
    expect(loaders.language).not.toHaveBeenCalled();
  });
});
