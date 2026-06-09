import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 109 source index', () => {
  it('marks OCR-risk groups as needs-review while preserving kinds', () => {
    expectLanguageSourceIndexShape({
      year: '109',
      pages: [1, 2, '3-4', 4, '4-5', '5-6'],
      statuses: ['needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review'],
      topics: ['企業組織', 'carpooling', 'Spanish-speaking country', 'Accreditation', 'psychology', 'Controversial Opinion']
    });
  });
});
