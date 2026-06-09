import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

export interface AGroupYearQuestionModule {
  questions: ExamQuestionAnalysis[];
}

export type AGroupYearQuestionModuleLoader = () => Promise<AGroupYearQuestionModule>;

export type AGroupYearQuestionLoaders = Partial<Record<AGroupYear, AGroupYearQuestionModuleLoader>>;

export type AGroupYearQuestionState =
  {
    status: 'complete';
    year: AGroupYear;
    questions: ExamQuestionAnalysis[];
  };

const defaultLoaders: Record<AGroupYear, AGroupYearQuestionModuleLoader> = {
  '107': () => import('@/modules/examGroups/aGroup/data/years/107'),
  '108': () => import('@/modules/examGroups/aGroup/data/years/108'),
  '109': () => import('@/modules/examGroups/aGroup/data/years/109'),
  '110': () => import('@/modules/examGroups/aGroup/data/years/110'),
  '111': () => import('@/modules/examGroups/aGroup/data/years/111'),
  '112': () => import('@/modules/examGroups/aGroup/data/years/112'),
  '113': () => import('@/modules/examGroups/aGroup/data/years/113'),
  '114': () => import('@/modules/examGroups/aGroup/data/years/114')
};

export function createAGroupYearQuestionLoader(loaders: AGroupYearQuestionLoaders = defaultLoaders) {
  async function load(year: AGroupYear): Promise<AGroupYearQuestionState> {
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

const aGroupYearQuestionLoader = createAGroupYearQuestionLoader();

export function loadAGroupYearQuestions(year: AGroupYear): Promise<AGroupYearQuestionState> {
  return aGroupYearQuestionLoader.load(year);
}
