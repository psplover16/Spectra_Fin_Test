import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/112';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 112 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('112', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('112', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('112', questions);
  });
});
