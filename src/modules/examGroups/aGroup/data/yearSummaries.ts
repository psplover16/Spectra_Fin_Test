export const A_GROUP_YEARS = ['114', '113', '112', '111', '110', '109', '108', '107'] as const;

export type AGroupYear = (typeof A_GROUP_YEARS)[number];

export type AGroupYearStatus = 'complete' | 'pending';

export interface AGroupYearSummary {
  year: AGroupYear;
  routePath: `/a-group/${AGroupYear}`;
  status: AGroupYearStatus;
  questionCount: number;
  statusLabel: string;
}

export const A_GROUP_YEAR_SUMMARIES: readonly AGroupYearSummary[] = [
  {
    year: '114',
    routePath: '/a-group/114',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '113',
    routePath: '/a-group/113',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '112',
    routePath: '/a-group/112',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '111',
    routePath: '/a-group/111',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '110',
    routePath: '/a-group/110',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '109',
    routePath: '/a-group/109',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '108',
    routePath: '/a-group/108',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  },
  {
    year: '107',
    routePath: '/a-group/107',
    status: 'complete',
    questionCount: 50,
    statusLabel: '完整逐題解析'
  }
] as const;
