import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/107';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 107 question content', () => {
  it('contains one teaching analysis for every indexed 107 source group', () => {
    expectLanguageYearQuestionContent('107', questions);
  });
});
