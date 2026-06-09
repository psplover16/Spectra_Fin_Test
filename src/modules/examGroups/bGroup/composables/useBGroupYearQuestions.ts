import type { BGroupYear } from '@/modules/examGroups/bGroup/data/yearSummaries';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

export interface BGroupYearQuestionModule {
  questions: BGroupEssayQuestionAnalysis[];
}

export type BGroupYearQuestionModuleLoader = () => Promise<BGroupYearQuestionModule>;

export type BGroupYearQuestionLoaders = Partial<Record<BGroupYear, BGroupYearQuestionModuleLoader>>;

export interface BGroupYearQuestionState {
  status: 'complete';
  year: BGroupYear;
  questions: BGroupEssayQuestionAnalysis[];
}

const defaultLoaders: Record<BGroupYear, BGroupYearQuestionModuleLoader> = {
  '107': () => import('@/modules/examGroups/bGroup/data/years/107'),
  '108': () => import('@/modules/examGroups/bGroup/data/years/108'),
  '109': () => import('@/modules/examGroups/bGroup/data/years/109'),
  '110': () => import('@/modules/examGroups/bGroup/data/years/110'),
  '111': () => import('@/modules/examGroups/bGroup/data/years/111'),
  '112': () => import('@/modules/examGroups/bGroup/data/years/112'),
  '113': () => import('@/modules/examGroups/bGroup/data/years/113'),
  '114': () => import('@/modules/examGroups/bGroup/data/years/114')
};

export function createBGroupYearQuestionLoader(loaders: BGroupYearQuestionLoaders = defaultLoaders) {
  async function load(year: BGroupYear): Promise<BGroupYearQuestionState> {
    const loadYear = loaders[year];

    if (!loadYear) {
      return {
        status: 'complete',
        year,
        questions: []
      };
    }

    const module = await loadYear();

    return {
      status: 'complete',
      year,
      questions: module.questions
    };
  }

  return { load };
}

const bGroupYearQuestionLoader = createBGroupYearQuestionLoader();

export function loadBGroupYearQuestions(year: BGroupYear): Promise<BGroupYearQuestionState> {
  return bGroupYearQuestionLoader.load(year);
}
