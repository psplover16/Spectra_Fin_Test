import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/110';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 110 question content', () => {
  it('contains one teaching analysis for every indexed 110 source group', () => {
    expectLanguageYearQuestionContent('110', questions);
  });
});
