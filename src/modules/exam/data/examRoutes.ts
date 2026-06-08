import type { SubjectSlug } from '@/modules/exam/types/content';

export type ExamRouteCategory = 'professional' | 'common';

export interface ExamRouteItem {
  slug: SubjectSlug;
  path: string;
  displayName: string;
  category: ExamRouteCategory;
  description: string;
  statusLabel: string;
  sourceGroup: string;
}

export const examRoutes: ExamRouteItem[] = [
  {
    slug: 'computer-principles',
    path: '/computer-principles',
    displayName: '計算機原理',
    category: 'professional',
    description: '聚焦資料表示、數位邏輯、作業系統與硬體結構的核心觀念。',
    statusLabel: '完整講義已匯入',
    sourceGroup: '專業科目考古題'
  },
  {
    slug: 'networking',
    path: '/networking',
    displayName: '網路概論',
    category: 'professional',
    description: '整理 OSI/TCP-IP、位址規劃、協定、安全與常見網路設備考點。',
    statusLabel: '完整講義已匯入',
    sourceGroup: '專業科目考古題'
  },
  {
    slug: 'information-management',
    path: '/information-management',
    displayName: '資訊管理',
    category: 'professional',
    description: '對齊資訊系統、資料治理、專案管理、資安管理與組織應用題型。',
    statusLabel: '完整講義已匯入',
    sourceGroup: '專業科目考古題'
  },
  {
    slug: 'programming',
    path: '/programming',
    displayName: '程式設計',
    category: 'professional',
    description: '建立資料結構、演算法、流程控制、物件導向與程式閱讀的解題基礎。',
    statusLabel: '完整講義已匯入',
    sourceGroup: '專業科目考古題'
  },
  {
    slug: 'language',
    path: '/language',
    displayName: '語言',
    category: 'common',
    description: '以國文與英文共同科目為主，保留較輕量但可複習的閱讀與考點提示。',
    statusLabel: '完整講義已匯入',
    sourceGroup: '共同科目考古題'
  }
];

export function getExamRouteByPath(path: string): ExamRouteItem | undefined {
  return examRoutes.find((route) => route.path === path);
}

export function getExamRouteBySlug(slug: string): ExamRouteItem | undefined {
  return examRoutes.find((route) => route.slug === slug);
}
