import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const architectureDoc = readFileSync('PROJECT_ARCHITECTURE.md', 'utf8');

describe('PROJECT_ARCHITECTURE documentation', () => {
  it('documents the group route and examGroups architecture', () => {
    expect(architectureDoc).toContain('src/modules/examGroups/');
    expect(architectureDoc).toContain('/a-group');
    expect(architectureDoc).toContain('/b-group');
    expect(architectureDoc).toContain('/language');
    expect(architectureDoc).toContain('/learning');
  });

  it('documents the A group 107 through 114 complete year scope', () => {
    expect(architectureDoc).toContain('114 年');
    expect(architectureDoc).toContain('107 至 113 年');
    expect(architectureDoc).toContain('complete 年度');
    expect(architectureDoc).toContain('useAGroupYearQuestions.ts');
  });

  it('documents vite-plugin-pwa and current CI/CD checks', () => {
    expect(architectureDoc).toContain('vite-plugin-pwa');
    expect(architectureDoc).toContain('dist/sw.js');
    expect(architectureDoc).toContain('npm run check:pwa-output');
    expect(architectureDoc).not.toContain('public/service-worker.js');
  });

  it('documents the systematic novice teaching content standard', () => {
    expect(architectureDoc).toContain('新手系統教學標準');
    expect(architectureDoc).toContain('前置觀念');
    expect(architectureDoc).toContain('規則來源');
    expect(architectureDoc).toContain('常見陷阱');
    expect(architectureDoc).toContain('teachingTables');
    expect(architectureDoc).toContain('{year}ContentReview.ts');
    expect(architectureDoc).toContain('aGroup{year}QuestionContent.spec.ts');
    expect(architectureDoc).toContain('questionAnalysisShape.spec.ts');
    expect(architectureDoc).toContain('riskyExtractionReview.ts');
  });

  it('documents B group, language, learning, source index, progress storage, and lazy import behavior', () => {
    expect(architectureDoc).toContain('B 組支援 107 至 114 年');
    expect(architectureDoc).toContain('語言只支援 107 至 112 年');
    expect(architectureDoc).toContain('不補 113/114');
    expect(architectureDoc).toContain('LearningView.vue');
    expect(architectureDoc).toContain('sourceIndex.ts');
    expect(architectureDoc).toContain('finpub:b-group-progress:v1');
    expect(architectureDoc).toContain('finpub:language-progress:v1');
    expect(architectureDoc).toContain('useBGroupYearQuestions.ts');
    expect(architectureDoc).toContain('useLanguageYearQuestions.ts');
    expect(architectureDoc).toContain('年度 PDF -> 題目索引 -> 第 1 批 2 至 3 題解析');
    expect(architectureDoc).toContain('diagramInstructions');
    expect(architectureDoc).toContain('diagramAltText');
  });
});
