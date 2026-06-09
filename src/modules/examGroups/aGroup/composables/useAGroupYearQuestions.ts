import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

export interface AGroupYearQuestionModule {
  questions: ExamQuestionAnalysis[];
}

export type AGroupYearQuestionModuleLoader = () => Promise<AGroupYearQuestionModule>;

export type AGroupYearQuestionLoaders = Partial<Record<AGroupYear, AGroupYearQuestionModuleLoader>>;

export type AGroupYearQuestionState =
  | {
      status: 'complete';
      year: AGroupYear;
      questions: ExamQuestionAnalysis[];
    }
  | {
      status: 'pending';
      year: Exclude<AGroupYear, '114'>;
      questions: [];
    };

const defaultLoaders: AGroupYearQuestionLoaders = {
  '114': () => import('@/modules/examGroups/aGroup/data/years/114')
};

export function createAGroupYearQuestionLoader(loaders: AGroupYearQuestionLoaders = defaultLoaders) {
  async function load(year: AGroupYear): Promise<AGroupYearQuestionState> {
    if (year !== '114') {
      return {
        status: 'pending',
        year,
        questions: []
      };
    }

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
