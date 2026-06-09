import { describe, expect, it } from 'vitest';
import router from '@/app/router';
import {
  examRoutes,
  getExamRouteByPath,
  type ExamRouteItem
} from '@/modules/exam/data/examRoutes';

const requiredRoutes = [
  {
    slug: 'a-group',
    path: '/a-group',
    displayName: 'A 組',
    category: 'professional'
  },
  {
    slug: 'b-group',
    path: '/b-group',
    displayName: 'B 組',
    category: 'professional'
  },
  {
    slug: 'language',
    path: '/language',
    displayName: '語言',
    category: 'common'
  },
  {
    slug: 'learning',
    path: '/learning',
    displayName: '學習',
    category: 'learning'
  }
] as const;

describe('exam learning route metadata', () => {
  it('exposes exactly the group-first primary learning routes', () => {
    expect(
      examRoutes.map(({ slug, path, displayName, category }) => ({
        slug,
        path,
        displayName,
        category
      }))
    ).toEqual(requiredRoutes);
  });

  it('keeps every route item within the typed metadata contract', () => {
    expect(examRoutes).toHaveLength(4);

    examRoutes.forEach((route: ExamRouteItem) => {
      expect(route.slug).toMatch(/^[a-z]+(?:-[a-z]+)*$/);
      expect(route.path).toBe(`/${route.slug}`);
      expect(route.displayName.trim().length).toBeGreaterThan(0);
      expect(['professional', 'common', 'learning']).toContain(route.category);
      expect(route.description.trim().length).toBeGreaterThan(0);
      expect(route.statusLabel).not.toBe('尚未匯入正式講義');
      expect(route.sourceGroup.trim().length).toBeGreaterThan(0);
      expect(getExamRouteByPath(route.path)).toEqual(route);
    });
  });

  it('keeps legacy subject routes out of primary metadata', () => {
    expect(examRoutes.map((route) => route.path)).not.toEqual(
      expect.arrayContaining(['/computer-principles', '/networking', '/information-management', '/programming'])
    );
  });
});

describe('unknown route recovery', () => {
  it('routes unknown paths to a not-found state instead of the learning entry', () => {
    const resolved = router.resolve('/outside-defined-routes');

    expect(resolved.name).toBe('not-found');
    expect(resolved.meta.title).toBe('找不到頁面');
  });
});
