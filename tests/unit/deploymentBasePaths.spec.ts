import { describe, expect, it } from 'vitest';
import {
  formatGithubEnv,
  resolveDeploymentTarget
} from '../../scripts/deploymentBasePaths.mjs';

describe('deployment base path resolution', () => {
  it('uses the production GitHub Pages base path for main', () => {
    expect(resolveDeploymentTarget('main')).toEqual({
      branchName: 'main',
      publishTarget: 'production',
      basePath: '/Spectra_Fin_Test/'
    });
  });

  it('uses the staging GitHub Pages base path for dev', () => {
    expect(resolveDeploymentTarget('dev')).toEqual({
      branchName: 'dev',
      publishTarget: 'staging',
      basePath: '/Spectra_Fin_Test/staging/'
    });
  });

  it('formats synchronized Vite and manifest environment variables', () => {
    const githubEnv = formatGithubEnv(resolveDeploymentTarget('dev'));

    expect(githubEnv).toContain('PUBLISH_TARGET=staging');
    expect(githubEnv).toContain('VITE_APP_BASE_PATH=/Spectra_Fin_Test/staging/');
    expect(githubEnv).toContain('VITE_APP_START_URL=/Spectra_Fin_Test/staging/');
  });

  it('rejects unsupported deployment branches instead of falling back silently', () => {
    expect(() => resolveDeploymentTarget('feature/example')).toThrow('Unsupported deployment branch');
  });
});
