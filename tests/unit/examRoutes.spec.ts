import { describe, expect, it } from 'vitest';
import router from '@/app/router';
import {
  examRoutes,
  getExamRouteByPath,
  type ExamRouteItem
} from '@/modules/exam/data/examRoutes';
import {
  getSubjectContentBySlug,
  subjectContents
} from '@/modules/exam/data/subjectContent';
import type { SubjectSlug } from '@/modules/exam/types/content';

const requiredRoutes = [
  {
    slug: 'computer-principles',
    path: '/computer-principles',
    displayName: '計算機原理',
    category: 'professional'
  },
  {
    slug: 'networking',
    path: '/networking',
    displayName: '網路概論',
    category: 'professional'
  },
  {
    slug: 'information-management',
    path: '/information-management',
    displayName: '資訊管理',
    category: 'professional'
  },
  {
    slug: 'programming',
    path: '/programming',
    displayName: '程式設計',
    category: 'professional'
  },
  {
    slug: 'language',
    path: '/language',
    displayName: '語言',
    category: 'common'
  }
] as const;

describe('exam learning route metadata', () => {
  it('exposes exactly the five required learning routes', () => {
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
    expect(examRoutes).toHaveLength(5);

    examRoutes.forEach((route: ExamRouteItem) => {
      expect(route.slug).toMatch(/^[a-z]+(?:-[a-z]+)*$/);
      expect(route.path).toBe(`/${route.slug}`);
      expect(route.displayName.trim().length).toBeGreaterThan(0);
      expect(['professional', 'common']).toContain(route.category);
      expect(route.description.trim().length).toBeGreaterThan(0);
      expect(route.statusLabel).not.toBe('尚未匯入正式講義');
      expect(route.sourceGroup.trim().length).toBeGreaterThan(0);
      expect(getExamRouteByPath(route.path)).toEqual(route);
    });
  });

  it('connects every route to completed bundled subject content', () => {
    const contentSlugs = subjectContents.map((content) => content.id);

    expect(examRoutes.map((route) => route.slug)).toEqual(contentSlugs);

    examRoutes.forEach((route) => {
      const content = getSubjectContentBySlug(route.slug as SubjectSlug);

      expect(content).toBeDefined();
      expect(content?.routePath).toBe(route.path);
      expect(content?.title).toBe(route.displayName);
      expect(content?.category).toBe(route.category);
      expect(content?.overview).not.toContain('待補');
      expect(content?.overview).not.toContain('尚未');
      expect(content?.highFrequencyPoints.length).toBeGreaterThan(0);
      expect(content?.lectureSections.length).toBeGreaterThan(0);
      expect(content?.questionMappings.length).toBeGreaterThan(0);
    });
  });
});

describe('unknown route recovery', () => {
  it('routes unknown paths to a not-found state instead of the learning entry', () => {
    const resolved = router.resolve('/outside-defined-routes');

    expect(resolved.name).toBe('not-found');
    expect(resolved.meta.title).toBe('找不到頁面');
  });
});
