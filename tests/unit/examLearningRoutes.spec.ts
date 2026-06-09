import { describe, expect, it } from 'vitest';
import { examRoutes } from '@/modules/exam/data/examRoutes';

describe('group-first exam learning routes', () => {
  it('exposes primary route metadata for A group, B group, language, and learning', () => {
    expect(
      examRoutes.map(({ slug, path, displayName, category, sourceGroup }) => ({
        slug,
        path,
        displayName,
        category,
        sourceGroup
      }))
    ).toEqual([
      {
        slug: 'a-group',
        path: '/a-group',
        displayName: 'A 組',
        category: 'professional',
        sourceGroup: '計算機原理、網路概論'
      },
      {
        slug: 'b-group',
        path: '/b-group',
        displayName: 'B 組',
        category: 'professional',
        sourceGroup: '資訊管理、程式設計'
      },
      {
        slug: 'language',
        path: '/language',
        displayName: '語言',
        category: 'common',
        sourceGroup: '國文、英文'
      },
      {
        slug: 'learning',
        path: '/learning',
        displayName: '學習',
        category: 'learning',
        sourceGroup: '個人學習入口'
      }
    ]);
  });

  it('keeps legacy subject paths out of primary route metadata', () => {
    expect(examRoutes.map((route) => route.path)).not.toEqual(
      expect.arrayContaining(['/computer-principles', '/networking', '/information-management', '/programming'])
    );
  });
});
