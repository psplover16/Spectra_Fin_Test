## ADDED Requirements

### Requirement: Subject route delivery

The application SHALL deliver all five subject routes through the existing exam PWA shell with stable navigation from the learning entry screen.

#### Scenario: learner navigates from entry screen

- **WHEN** a learner opens the PWA entry screen
- **THEN** navigation SHALL expose Computer Principles, Networking, Information Management, Programming, and Language as reachable subject destinations

### Requirement: Built content availability

The production build SHALL include the completed subject content needed for each route to render without fetching from private source folders at runtime.

#### Scenario: route renders from build output

- **WHEN** the production build is served and a learner opens any subject route
- **THEN** the route SHALL render its completed learning content from build output or bundled app data

### Requirement: CI validation coverage

The CI/CD workflow SHALL verify dependency installation, static checks or type checks, tests or production build, and PWA build output before deployment.

#### Scenario: CI validates a content delivery change

- **WHEN** a content delivery change is pushed through CI/CD
- **THEN** the workflow SHALL fail if installation fails, checks fail, tests or build fail, or PWA output is missing

### Requirement: Content route regression tests

Automated tests SHALL cover the five subject route definitions and at least one browser-level smoke path that confirms subject navigation and content rendering.

#### Scenario: tests catch a missing subject

- **WHEN** one of the five subject route definitions is removed or left without completed content metadata
- **THEN** the automated test suite SHALL fail before deployment
