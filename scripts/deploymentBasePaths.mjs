export const DEPLOYMENT_TARGETS = {
  main: {
    branchName: 'main',
    publishTarget: 'production',
    basePath: '/finPubTest/'
  },
  dev: {
    branchName: 'dev',
    publishTarget: 'staging',
    basePath: '/finPubTest/staging/'
  }
};

export function resolveDeploymentTarget(branchName) {
  const target = DEPLOYMENT_TARGETS[branchName];

  if (!target) {
    throw new Error(`Unsupported deployment branch: ${branchName}`);
  }

  return target;
}

export function formatGithubEnv(target) {
  return [
    `PUBLISH_TARGET=${target.publishTarget}`,
    `VITE_APP_BASE_PATH=${target.basePath}`,
    `VITE_APP_START_URL=${target.basePath}`
  ].join('\n') + '\n';
}
