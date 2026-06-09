import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/107';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 107 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('107', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('107', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('107', questions);
  });
});
