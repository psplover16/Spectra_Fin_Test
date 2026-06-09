import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const architectureDoc = readFileSync('PROJECT_ARCHITECTURE.md', 'utf8');

describe('PROJECT_ARCHITECTURE documentation', () => {
  it('documents the group route and examGroups architecture', () => {
    expect(architectureDoc).toContain('src/modules/examGroups/');
    expect(architectureDoc).toContain('/a-group');
    expect(architectureDoc).toContain('/b-group');
    expect(architectureDoc).toContain('/language');
  });

  it('documents the A group 114 first batch and pending year scope', () => {
    expect(architectureDoc).toContain('114 年');
    expect(architectureDoc).toContain('107 至 113 年');
    expect(architectureDoc).toContain('pending');
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
    expect(architectureDoc).toContain('114ContentReview.ts');
    expect(architectureDoc).toContain('aGroup114QuestionContent.spec.ts');
  });
});
