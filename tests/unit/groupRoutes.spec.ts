import { describe, expect, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import { createAppRouter } from '@/app/router';

describe('group learning routes', () => {
  it('redirects the root route to A group', async () => {
    const router = createAppRouter(createMemoryHistory());

    await router.push('/');
    await router.isReady();

    expect(router.currentRoute.value.fullPath).toBe('/a-group');
  });

  it.each([
    ['/a-group', 'a-group'],
    ['/b-group', 'b-group'],
    ['/language', 'language']
  ])('resolves %s without NotFound', (path, name) => {
    const router = createAppRouter(createMemoryHistory());
    const resolved = router.resolve(path);

    expect(resolved.name).toBe(name);
    expect(resolved.matched.at(-1)?.name).not.toBe('not-found');
  });

  it.each([
    ['/computer-principles', '/a-group'],
    ['/networking', '/a-group'],
    ['/information-management', '/b-group'],
    ['/programming', '/b-group']
  ])('redirects legacy subject route %s to %s', async (legacyPath, groupPath) => {
    const router = createAppRouter(createMemoryHistory());

    await router.push(legacyPath);
    await router.isReady();

    expect(router.currentRoute.value.fullPath).toBe(groupPath);
    expect(router.currentRoute.value.redirectedFrom?.fullPath).toBe(legacyPath);
  });

  it.each(['107', '108', '109', '110', '111', '112', '113', '114'])(
    'resolves valid A group year route %s',
    (year) => {
      const router = createAppRouter(createMemoryHistory());
      const resolved = router.resolve(`/a-group/${year}`);

      expect(resolved.name).toBe('a-group-year');
      expect(resolved.params.year).toBe(year);
      expect(resolved.matched.at(-1)?.name).not.toBe('not-found');
    }
  );

  it.each(['/a-group/115', '/a-group/999', '/a-group/abc'])(
    'routes invalid A group year %s to NotFound',
    (path) => {
      const router = createAppRouter(createMemoryHistory());
      const resolved = router.resolve(path);

      expect(resolved.name).toBe('not-found');
      expect(resolved.matched.at(-1)?.name).toBe('not-found');
    }
  );
});
