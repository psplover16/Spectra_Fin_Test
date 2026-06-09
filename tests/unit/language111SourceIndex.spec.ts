import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 111 source index', () => {
  it('keeps uncertain PDF text-layer extraction in needs-review', () => {
    expectLanguageSourceIndexShape({
      year: '111',
      pages: [1, '1-2', '2-3', '3-4', 4, '4-6'],
      statuses: ['needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review'],
      topics: ['企業韌性', 'Different scientists', 'The suspect denies', 'antismoking lobby', 'Insomnia', 'post-traumatic growth']
    });
  });
});
