import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/109';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 109 question content', () => {
  it('contains one teaching analysis for every indexed 109 source group', () => {
    expectLanguageYearQuestionContent('109', questions);
  });
});
