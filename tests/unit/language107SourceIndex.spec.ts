import { describe, it } from 'vitest';
import { expectLanguageSourceIndexShape } from './languageSourceIndexAssertions';

describe('language 107 source index', () => {
  it('keeps all English groups under review because the PDF text layer is incomplete', () => {
    expectLanguageSourceIndexShape({
      year: '107',
      pages: [1, 2, '2-3', 3, '3-4', 4],
      statuses: ['needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review', 'needs-review'],
      topics: ['新科技', 'Whales', 'NYC', 'Portugal', 'plant-based eating', 'Norbert Elias']
    });
  });
});
