import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/108';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 108 question content', () => {
  it('contains one teaching analysis for every indexed 108 source group', () => {
    expectLanguageYearQuestionContent('108', questions);
  });
});
