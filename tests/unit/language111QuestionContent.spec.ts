import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/111';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 111 question content', () => {
  it('contains one teaching analysis for every indexed 111 source group', () => {
    expectLanguageYearQuestionContent('111', questions);
  });
});
