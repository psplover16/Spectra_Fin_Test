# github-pages-cicd Specification

## Purpose

TBD - created by archiving change 'build-exam-pwa-routes-and-cicd'. Update Purpose after archive.

## Requirements

### Requirement: GitHub Pages deployment workflow

The system SHALL provide a GitHub Actions workflow that deploys the built static application to GitHub Pages.

#### Scenario: Main branch deployment

- **WHEN** changes are pushed to the main deployment branch
- **THEN** the workflow builds the application and deploys the generated static site to GitHub Pages


<!-- @trace
source: build-exam-pwa-routes-and-cicd
updated: 2026-06-09
code:
  - .spectra.yaml
  - PROJECT_ARCHITECTURE.md
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/env.d.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - scripts/deploymentBasePaths.mjs
  - package.json
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - .github/workflows/cd.yml
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/app/routePreload.ts
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - TEST_MATRIX.md
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
tests:
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
-->

---
### Requirement: CI verification steps

The system SHALL run install, unit test, build, and Playwright verification steps before deployment succeeds.

#### Scenario: CI succeeds

- **WHEN** dependencies install, tests pass, and the application builds successfully
- **THEN** the workflow marks the verification and deployment path as successful

#### Scenario: CI fails

- **WHEN** install, unit tests, Playwright tests, or build fail
- **THEN** the workflow fails and GitHub Pages deployment does not proceed


<!-- @trace
source: build-exam-pwa-routes-and-cicd
updated: 2026-06-09
code:
  - .spectra.yaml
  - PROJECT_ARCHITECTURE.md
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/env.d.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - scripts/deploymentBasePaths.mjs
  - package.json
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - .github/workflows/cd.yml
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/app/routePreload.ts
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - TEST_MATRIX.md
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
tests:
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
-->

---
### Requirement: Reference project settings parity

The system SHALL mirror the GitHub Pages workflow, build script pattern, and Pages-related Vite settings from the Spectra-Learning-Japanese reference project, except for repository-specific identifiers and paths.

#### Scenario: Reference settings adapted

- **WHEN** the implementer compares this project against the reference project during apply
- **THEN** the resulting workflow and build configuration match the reference pattern while using this repository's GitHub Pages base path


<!-- @trace
source: build-exam-pwa-routes-and-cicd
updated: 2026-06-09
code:
  - .spectra.yaml
  - PROJECT_ARCHITECTURE.md
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/env.d.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - scripts/deploymentBasePaths.mjs
  - package.json
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - .github/workflows/cd.yml
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/app/routePreload.ts
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - TEST_MATRIX.md
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
tests:
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
-->

---
### Requirement: Architecture documentation for CI/CD

The system SHALL document the GitHub Pages workflow, build outputs, and repository-specific deployment assumptions in `PROJECT_ARCHITECTURE.md`.

#### Scenario: Reviewer checks architecture notes

- **WHEN** a reviewer opens `PROJECT_ARCHITECTURE.md`
- **THEN** the document identifies the CI/CD workflow location, deployment target, build output directory, and the fact that settings follow the Spectra-Learning-Japanese reference project except repository ownership

<!-- @trace
source: build-exam-pwa-routes-and-cicd
updated: 2026-06-09
code:
  - .spectra.yaml
  - PROJECT_ARCHITECTURE.md
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/env.d.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - scripts/deploymentBasePaths.mjs
  - package.json
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - .github/workflows/cd.yml
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/app/routePreload.ts
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - TEST_MATRIX.md
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
tests:
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
-->