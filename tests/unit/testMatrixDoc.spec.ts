import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const testMatrix = readFileSync('TEST_MATRIX.md', 'utf8');

describe('TEST_MATRIX documentation', () => {
  it('tracks required verification areas for the current Spectra change', () => {
    for (const area of [
      'Router',
      'Storage',
      'Loader',
      'Source baseline',
      'Source index',
      'Question card',
      'Systematic novice teaching',
      'B group essay content',
      'Language teaching content',
      'Diagram text / alt text',
      'Risky PDF extraction',
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
      'tests/unit/bGroupYearQuestionLoader.spec.ts',
      'tests/unit/languageYearQuestionLoader.spec.ts',
      'tests/unit/aGroup107To113SourceBaselineValidation.spec.ts',
      'tests/unit/bGroup107SourceIndex.spec.ts',
      'tests/unit/bGroup114SourceIndex.spec.ts',
      'tests/unit/language107SourceIndex.spec.ts',
      'tests/unit/language112SourceIndex.spec.ts',
      'tests/unit/AGroupQuestionCard.spec.ts',
      'tests/unit/BGroupEssayQuestionCard.spec.ts',
      'tests/unit/LanguageQuestionCard.spec.ts',
      'tests/unit/aGroup114QuestionContent.spec.ts',
      'tests/unit/aGroup114ContentReview.spec.ts',
      'tests/unit/bGroup114QuestionContent.spec.ts',
      'tests/unit/bGroup114ContentReview.spec.ts',
      'tests/unit/language112QuestionContent.spec.ts',
      'tests/unit/language112ContentReview.spec.ts',
      'tests/unit/languageEnglishTeaching.spec.ts',
      'tests/unit/languageChineseTeaching.spec.ts',
      'tests/unit/bGroupDiagramContent.spec.ts',
      'tests/unit/languageDiagramContent.spec.ts',
      'tests/unit/aGroupRiskyExtractionReview.spec.ts',
      'npm run check:a-group-107-source-baseline',
      'npm run check:a-group-107-content',
      'npm run check:a-group-114-content',
      'tests/unit/pwaRuntime.spec.ts',
      'scripts/check-pwa-output.mjs',
      'tests/e2e/group-routes.spec.ts'
    ]) {
      expect(testMatrix).toContain(evidence);
    }
  });
});
