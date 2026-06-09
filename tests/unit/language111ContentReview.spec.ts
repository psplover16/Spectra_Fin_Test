import { describe, it } from 'vitest';
import { questions } from '@/modules/examGroups/language/data/years/111';
import {
  expectLanguageContentReviewPasses,
  expectLanguageContentReviewRejectsShallowContent,
  expectLanguageContentReviewRejectsSourceDrift
} from './languageYearContentAssertions';

describe('language 111 content review', () => {
  it('passes the language completeness checklist', () => {
    expectLanguageContentReviewPasses('111', questions);
  });

  it('rejects shallow language analysis', () => {
    expectLanguageContentReviewRejectsShallowContent('111', questions);
  });

  it('rejects source trace drift', () => {
    expectLanguageContentReviewRejectsSourceDrift('111', questions);
  });
});
