import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const testMatrix = readFileSync('TEST_MATRIX.md', 'utf8');

describe('TEST_MATRIX documentation', () => {
  it('tracks required verification areas for the current Spectra change', () => {
    for (const area of [
      'Router',
      'Storage',
      'Loader',
      'Question card',
      'Systematic novice teaching',
      'PWA wrapper',
      'PWA output',
      'Mobile/offline smoke'
    ]) {
      expect(testMatrix).toContain(area);
    }
  });

  it('links each required area to a concrete test or manual assertion', () => {
    for (const evidence of [
      'tests/unit/groupRoutes.spec.ts',
      'tests/unit/aGroupProgressStorage.spec.ts',
      'tests/unit/aGroupYearQuestionLoader.spec.ts',
      'tests/unit/AGroupQuestionCard.spec.ts',
      'tests/unit/aGroup114QuestionContent.spec.ts',
      'tests/unit/aGroup114ContentReview.spec.ts',
      'npm run check:a-group-114-content',
      'tests/unit/pwaRuntime.spec.ts',
      'scripts/check-pwa-output.mjs',
      'tests/e2e/group-routes.spec.ts'
    ]) {
      expect(testMatrix).toContain(evidence);
    }
  });
});
