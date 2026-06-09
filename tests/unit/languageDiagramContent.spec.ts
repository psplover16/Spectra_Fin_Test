import { describe, expect, it } from 'vitest';
import { questions as questions112 } from '@/modules/examGroups/language/data/years/112';

describe('language diagram content', () => {
  it('uses precise textual diagrams only for language groups that need structure support', () => {
    const composition = questions112.find((question) => question.kind === 'chinese-composition');
    const grammar = questions112.find((question) => question.kind === 'english-grammar');
    const clozeMindMap = questions112.find((question) => question.number === 5);
    const reading = questions112.find((question) => question.kind === 'english-reading');

    expect(composition?.diagramInstructions).toContain('不適用');
    expect(grammar?.diagramInstructions).toContain('不適用');
    expect(clozeMindMap?.diagramInstructions).toContain('心智圖');
    expect(reading?.diagramInstructions).toContain('海浪');

    [composition, grammar, clozeMindMap, reading].forEach((question) => {
      expect(question?.diagramAltText.trim().length).toBeGreaterThan(12);
    });
  });

  it('keeps vocabulary diagram fields explicit without requiring image assets', () => {
    const vocabulary = questions112.find((question) => question.kind === 'english-vocabulary');

    expect(vocabulary?.diagramInstructions).toContain('不適用');
    expect(vocabulary?.diagramAltText).toContain('無圖解');
  });
});
