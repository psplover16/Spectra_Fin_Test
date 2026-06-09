import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const cdWorkflow = readFileSync('.github/workflows/cd.yml', 'utf8');

function commandIndex(command: string): number {
  const index = cdWorkflow.indexOf(`run: ${command}`);
  expect(index, `${command} should be present in CD`).toBeGreaterThan(-1);
  return index;
}

describe('CD workflow deployment order', () => {
  it('validates the static PWA before publishing to gh-pages', () => {
    const commands = [
      'node scripts/resolveDeploymentTarget.mjs',
      'npm run lint',
      'npm run typecheck',
      'npm run test:unit',
      'npm run build',
      'npm run check:pwa-output',
      'npm run test:e2e',
      'node scripts/publishPages.mjs --worktree .deploy-pages --dist dist --target "$PUBLISH_TARGET"'
    ];

    const indexes = commands.map(commandIndex);
    expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
  });

  it('deploys only from main and dev branches', () => {
    expect(cdWorkflow).toContain('- dev');
    expect(cdWorkflow).toContain('- main');
    expect(cdWorkflow).not.toContain('dist/service-worker.js');
  });
});
