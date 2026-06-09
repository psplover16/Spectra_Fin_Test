import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/110';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 110 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('110', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('110', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('110', questions);
  });
});
