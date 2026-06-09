import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const ciWorkflow = readFileSync('.github/workflows/ci.yml', 'utf8');

function commandIndex(command: string): number {
  const index = ciWorkflow.indexOf(`run: ${command}`);
  expect(index, `${command} should be present in CI`).toBeGreaterThan(-1);
  return index;
}

describe('CI workflow validation steps', () => {
  it('runs the local validation commands in deployment-safe order', () => {
    const commands = [
      'npm run lint',
      'npm run typecheck',
      'npm run test:unit',
      'npm run build',
      'npm run check:pwa-output',
      'npm run test:e2e'
    ];

    const indexes = commands.map(commandIndex);
    expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
  });

  it('runs for pull requests and pushes outside gh-pages', () => {
    expect(ciWorkflow).toContain('pull_request:');
    expect(ciWorkflow).toContain('branches-ignore:');
    expect(ciWorkflow).toContain('- gh-pages');
  });
});
