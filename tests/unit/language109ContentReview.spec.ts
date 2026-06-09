import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/109';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 109 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('109', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('109', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('109', questions);
  });
});
