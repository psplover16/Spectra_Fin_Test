import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 108 source index', () => {
  it('classifies verified vocabulary and grammar separately from review-risk passages', () => {
    expectLanguageSourceIndexShape({
      year: '108',
      pages: [1, '1-2', '2-3', 3, 3, '3-4'],
      statuses: ['needs-review', 'verified', 'verified', 'needs-review', 'needs-review', 'needs-review'],
      topics: ['投資臺灣', 'World War II', 'financial crisis', 'piracy', 'PG&E', 'organic food']
    });
  });
});
