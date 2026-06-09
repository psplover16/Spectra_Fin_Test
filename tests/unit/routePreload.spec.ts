import { describe, expect, it, vi } from 'vitest';
import { createRoutePreloader, getRoutePreloadKey } from '@/app/routePreload';

describe('route preload', () => {
  it.each([
    ['/a-group', 'aGroup'],
    ['/b-group', 'bGroup'],
    ['/b-group/114', 'bGroupYear'],
    ['/b-group/107', 'bGroupYear'],
    ['/language', 'language'],
    ['/language/112', 'languageYear'],
    ['/language/107', 'languageYear'],
    ['/learning', 'learning'],
    ['/a-group/114', 'aGroupYear'],
    ['/a-group/113', 'aGroupYear']
  ] as const)('maps %s to preload key %s', (path, key) => {
    expect(getRoutePreloadKey(path)).toBe(key);
  });

  it('ignores unknown routes', () => {
    expect(getRoutePreloadKey('/outside')).toBeNull();
    expect(getRoutePreloadKey('/language/113')).toBeNull();
  });

  it('preloads each matching chunk at most once', async () => {
    const loaders = {
      aGroup: vi.fn().mockResolvedValue({}),
      aGroupYear: vi.fn().mockResolvedValue({}),
      bGroup: vi.fn().mockResolvedValue({}),
      bGroupYear: vi.fn().mockResolvedValue({}),
      language: vi.fn().mockResolvedValue({}),
      languageYear: vi.fn().mockResolvedValue({}),
      learning: vi.fn().mockResolvedValue({})
    };
    const preloader = createRoutePreloader(loaders);

    await expect(preloader.preload('/a-group')).resolves.toBe(true);
    await expect(preloader.preload('/a-group')).resolves.toBe(true);
    await expect(preloader.preload('/a-group/114')).resolves.toBe(true);
    await expect(preloader.preload('/a-group/113')).resolves.toBe(true);
    await expect(preloader.preload('/b-group/114')).resolves.toBe(true);
    await expect(preloader.preload('/language/112')).resolves.toBe(true);
    await expect(preloader.preload('/learning')).resolves.toBe(true);
    await expect(preloader.preload('/outside')).resolves.toBe(false);

    expect(loaders.aGroup).toHaveBeenCalledTimes(1);
    expect(loaders.aGroupYear).toHaveBeenCalledTimes(1);
    expect(loaders.bGroupYear).toHaveBeenCalledTimes(1);
    expect(loaders.languageYear).toHaveBeenCalledTimes(1);
    expect(loaders.learning).toHaveBeenCalledTimes(1);
    expect(loaders.bGroup).not.toHaveBeenCalled();
    expect(loaders.language).not.toHaveBeenCalled();
  });
});
