export type ExamRouteSlug = 'a-group' | 'b-group' | 'language' | 'learning';
export type ExamRouteCategory = 'professional' | 'common' | 'learning';

export interface ExamRouteItem {
  slug: ExamRouteSlug;
  path: `/${ExamRouteSlug}`;
  displayName: string;
  category: ExamRouteCategory;
  description: string;
  statusLabel: string;
  sourceGroup: string;
}

export const examRoutes: ExamRouteItem[] = [
  {
    slug: 'a-group',
    path: '/a-group',
    displayName: 'A 組',
    category: 'professional',
    description: '計算機原理與網路概論年度選擇題解析。',
    statusLabel: '107 至 114 年逐題解析',
    sourceGroup: '計算機原理、網路概論'
  },
  {
    slug: 'b-group',
    path: '/b-group',
    displayName: 'B 組',
    category: 'professional',
    description: '資訊管理與程式設計年度申論解析。',
    statusLabel: '年度解析建置中',
    sourceGroup: '資訊管理、程式設計'
  },
  {
    slug: 'language',
    path: '/language',
    displayName: '語言',
    category: 'common',
    description: '國文與英文共同科目年度解析。',
    statusLabel: '107 至 112 年解析建置中',
    sourceGroup: '國文、英文'
  },
  {
    slug: 'learning',
    path: '/learning',
    displayName: '學習',
    category: 'learning',
    description: '未來個人學習筆記與複習節奏入口。',
    statusLabel: 'placeholder',
    sourceGroup: '個人學習入口'
  }
];

export function getExamRouteByPath(path: string): ExamRouteItem | undefined {
  return examRoutes.find((route) => route.path === path);
}

export function getExamRouteBySlug(slug: string): ExamRouteItem | undefined {
  return examRoutes.find((route) => route.slug === slug);
}
