import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 112 source index', () => {
  it('classifies six natural question groups before reviewed analysis', () => {
    expectLanguageSourceIndexShape({
      year: '112',
      pages: [1, 2, '2-3', 4, 4, '4-5'],
      statuses: ['needs-review', 'verified', 'verified', 'verified', 'verified', 'needs-review'],
      topics: ['AI 浪潮', 'fabricated data', 'no less intelligent', 'Jane and Philip', 'mind-mapping', 'Ocean waves']
    });
  });
});
