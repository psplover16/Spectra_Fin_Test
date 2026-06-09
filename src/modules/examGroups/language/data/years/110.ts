import type { LanguageQuestionAnalysis } from '@/modules/examGroups/language/types/languageQuestionAnalysis';
import { createLanguageQuestionsForYear } from '@/modules/examGroups/language/data/years/questionFactory';

export const questions: LanguageQuestionAnalysis[] = createLanguageQuestionsForYear('110');
