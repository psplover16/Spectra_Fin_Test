import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function readProjectFile(relativePath: string): string {
  return readFileSync(join(root, relativePath), 'utf8');
}

describe('examGroups module boundary', () => {
  it('keeps A group views in the examGroups feature module', () => {
    expect(existsSync(join(root, 'src/modules/examGroups/aGroup/views/AGroupView.vue'))).toBe(true);
    expect(existsSync(join(root, 'src/modules/examGroups/aGroup/views/AGroupYearView.vue'))).toBe(true);
  });

  it('does not place A group year analysis data in subjectContent', () => {
    const subjectContentSource = readProjectFile('src/modules/exam/data/subjectContent.ts');

    expect(subjectContentSource).not.toMatch(/ExamQuestionAnalysis|yearSummaries/);
  });
});
