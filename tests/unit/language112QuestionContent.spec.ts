import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/112';
import { expectLanguageYearQuestionContent } from './languageYearContentAssertions';

describe('language 112 question content', () => {
  it('contains one teaching analysis for every indexed 112 source group', () => {
    expectLanguageYearQuestionContent('112', questions);
  });
});
