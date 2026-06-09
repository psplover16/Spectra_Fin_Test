import type { LanguageYear } from '@/modules/examGroups/language/data/yearSummaries';
import type { LanguageQuestionAnalysis } from '@/modules/examGroups/language/types/languageQuestionAnalysis';

export interface LanguageYearQuestionState {
  status: 'complete';
  year: LanguageYear;
  questions: LanguageQuestionAnalysis[];
}

export type LanguageYearQuestionModule = {
  questions: LanguageQuestionAnalysis[];
};

export type LanguageYearQuestionImporter = () => Promise<LanguageYearQuestionModule>;

const defaultYearQuestionImporters: Record<LanguageYear, LanguageYearQuestionImporter> = {
  '112': () => import('@/modules/examGroups/language/data/years/112'),
  '111': () => import('@/modules/examGroups/language/data/years/111'),
  '110': () => import('@/modules/examGroups/language/data/years/110'),
  '109': () => import('@/modules/examGroups/language/data/years/109'),
  '108': () => import('@/modules/examGroups/language/data/years/108'),
  '107': () => import('@/modules/examGroups/language/data/years/107')
};

export function createLanguageYearQuestionLoader(
  importers: Record<LanguageYear, LanguageYearQuestionImporter> = defaultYearQuestionImporters
) {
  return async function loadLanguageYearQuestions(year: LanguageYear): Promise<LanguageYearQuestionState> {
    const yearModule = await importers[year]();

    return {
      status: 'complete',
      year,
      questions: yearModule.questions
    };
  };
}

export const loadLanguageYearQuestions = createLanguageYearQuestionLoader();
