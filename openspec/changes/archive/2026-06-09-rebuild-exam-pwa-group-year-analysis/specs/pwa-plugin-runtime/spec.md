## ADDED Requirements

### Requirement: Vite Plugin Generates PWA Runtime Assets

The application SHALL use `vite-plugin-pwa` to generate the PWA manifest and service worker during production builds.

#### Scenario: Production build emits PWA files

- **WHEN** the production build completes
- **THEN** `dist/manifest.webmanifest` exists
- **THEN** a generated service worker file exists in `dist`

### Requirement: App PWA Wrapper Does Not Register Service Worker Manually

The application PWA wrapper SHALL NOT call `navigator.serviceWorker.register` directly. It SHALL only wrap the update and readiness signals provided by the plugin runtime.

#### Scenario: PWA wrapper initializes

- **WHEN** the app shell initializes PWA status
- **THEN** service worker registration is controlled by `vite-plugin-pwa`
- **THEN** the wrapper exposes user-facing readiness or update state without manual registration

### Requirement: PWA Runtime Provides Update Feedback

The application SHALL expose install or update readiness states without throwing errors when service workers are unsupported.

#### Scenario: Service worker unsupported

- **WHEN** the browser does not support service workers
- **THEN** the application renders a non-blocking unsupported PWA status
- **THEN** learning routes remain usable online

##### Example: Unsupported runtime state

| Runtime field | Value |
| ----- | ----- |
| serviceWorkerSupported | false |
| pwaStatus | unsupported |

#### Scenario: Update is available

- **WHEN** the plugin runtime reports an available update
- **THEN** the application renders a user-visible update prompt or status

##### Example: Update runtime state

| Runtime field | Value |
| ----- | ----- |
| needRefresh | true |
| pwaStatus | updateAvailable |

### Requirement: Navigation Is Cached For Offline Reading

The generated service worker SHALL provide navigation fallback for the configured base path so primary learning routes remain available after the app is cached.

#### Scenario: Cached navigation while offline

- **WHEN** the user has previously loaded the app and then opens `/a-group` offline
- **THEN** the service worker serves the app shell for the route

### Requirement: Deployment Base Paths Are Branch Specific

The deployment workflow SHALL set production and staging base paths for the repository slug used by this project.

#### Scenario: Main branch deployment

- **WHEN** CD runs from the `main` branch
- **THEN** the app base path and start URL use the production repository path

#### Scenario: Dev branch deployment

- **WHEN** CD runs from the `dev` branch
- **THEN** the app base path and start URL use the staging repository path

### Requirement: CI Validates PWA Output

The CI workflow SHALL run lint, typecheck, unit tests, build, PWA output checks, and e2e tests for pull requests and pushes outside `gh-pages`.

#### Scenario: CI validates build outputs

- **WHEN** CI runs successfully
- **THEN** lint, typecheck, unit tests, build, PWA output checks, and e2e tests have completed successfully

#### Scenario: Missing PWA output fails CI

- **WHEN** the build does not emit the web manifest or service worker
- **THEN** the CI PWA output check fails

##### Example: Missing output state

| Output file | Exists |
| ----- | ----- |
| dist/manifest.webmanifest | false |
| generated service worker | false |
