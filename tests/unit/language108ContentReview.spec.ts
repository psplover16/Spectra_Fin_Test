import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/108';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 108 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('108', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('108', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('108', questions);
  });
});
