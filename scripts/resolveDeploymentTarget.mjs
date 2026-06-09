import { appendFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { argv, env, stdout } from 'node:process';
import { formatGithubEnv, resolveDeploymentTarget } from './deploymentBasePaths.mjs';

const branchName = env.GITHUB_REF_NAME ?? argv[2];

if (!branchName) {
  throw new Error('GITHUB_REF_NAME or a branch name argument is required.');
}

const output = formatGithubEnv(resolveDeploymentTarget(branchName)).replaceAll('\n', EOL);

if (env.GITHUB_ENV) {
  appendFileSync(env.GITHUB_ENV, output, 'utf8');
} else {
  stdout.write(output);
}
