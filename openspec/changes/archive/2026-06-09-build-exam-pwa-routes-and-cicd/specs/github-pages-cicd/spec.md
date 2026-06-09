## ADDED Requirements

### Requirement: GitHub Pages deployment workflow

The system SHALL provide a GitHub Actions workflow that deploys the built static application to GitHub Pages.

#### Scenario: Main branch deployment

- **WHEN** changes are pushed to the main deployment branch
- **THEN** the workflow builds the application and deploys the generated static site to GitHub Pages

### Requirement: CI verification steps

The system SHALL run install, unit test, build, and Playwright verification steps before deployment succeeds.

#### Scenario: CI succeeds

- **WHEN** dependencies install, tests pass, and the application builds successfully
- **THEN** the workflow marks the verification and deployment path as successful

#### Scenario: CI fails

- **WHEN** install, unit tests, Playwright tests, or build fail
- **THEN** the workflow fails and GitHub Pages deployment does not proceed

### Requirement: Reference project settings parity

The system SHALL mirror the GitHub Pages workflow, build script pattern, and Pages-related Vite settings from the Spectra-Learning-Japanese reference project, except for repository-specific identifiers and paths.

#### Scenario: Reference settings adapted

- **WHEN** the implementer compares this project against the reference project during apply
- **THEN** the resulting workflow and build configuration match the reference pattern while using this repository's GitHub Pages base path

### Requirement: Architecture documentation for CI/CD

The system SHALL document the GitHub Pages workflow, build outputs, and repository-specific deployment assumptions in `PROJECT_ARCHITECTURE.md`.

#### Scenario: Reviewer checks architecture notes

- **WHEN** a reviewer opens `PROJECT_ARCHITECTURE.md`
- **THEN** the document identifies the CI/CD workflow location, deployment target, build output directory, and the fact that settings follow the Spectra-Learning-Japanese reference project except repository ownership