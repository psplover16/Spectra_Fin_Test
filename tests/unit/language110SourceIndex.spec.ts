import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 110 source index', () => {
  it('classifies composition, vocabulary, grammar, cloze, and reading groups', () => {
    expectLanguageSourceIndexShape({
      year: '110',
      pages: [1, 2, 3, 4, '4-5', 5],
      statuses: ['needs-review', 'verified', 'verified', 'needs-review', 'needs-review', 'needs-review'],
      topics: ['ESG', 'hyper-violent thriller', 'Friday, December 10', 'Peace Corps', 'Marshmallow experiment', 'biochemical basis to love']
    });
  });
});
