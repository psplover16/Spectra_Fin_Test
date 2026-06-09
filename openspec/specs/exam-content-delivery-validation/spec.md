# exam-content-delivery-validation Specification

## Purpose

TBD - created by archiving change 'complete-exam-pwa-subject-content'. Update Purpose after archive.

## Requirements

### Requirement: Subject route delivery

The application SHALL deliver all five subject routes through the existing exam PWA shell with stable navigation from the learning entry screen.

#### Scenario: learner navigates from entry screen

- **WHEN** a learner opens the PWA entry screen
- **THEN** navigation SHALL expose Computer Principles, Networking, Information Management, Programming, and Language as reachable subject destinations


<!-- @trace
source: complete-exam-pwa-subject-content
updated: 2026-06-09
code:
  - src/app/routePreload.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - PROJECT_ARCHITECTURE.md
  - src/app/main.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - TEST_MATRIX.md
  - .github/workflows/cd.yml
  - package.json
  - src/env.d.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - .spectra.yaml
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - scripts/check-pwa-output.mjs
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
tests:
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/ciWorkflow.spec.ts
-->

---
### Requirement: Built content availability

The production build SHALL include the completed subject content needed for each route to render without fetching from private source folders at runtime.

#### Scenario: route renders from build output

- **WHEN** the production build is served and a learner opens any subject route
- **THEN** the route SHALL render its completed learning content from build output or bundled app data


<!-- @trace
source: complete-exam-pwa-subject-content
updated: 2026-06-09
code:
  - src/app/routePreload.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - PROJECT_ARCHITECTURE.md
  - src/app/main.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - TEST_MATRIX.md
  - .github/workflows/cd.yml
  - package.json
  - src/env.d.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - .spectra.yaml
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - scripts/check-pwa-output.mjs
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
tests:
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/ciWorkflow.spec.ts
-->

---
### Requirement: CI validation coverage

The CI/CD workflow SHALL verify dependency installation, static checks or type checks, tests or production build, and PWA build output before deployment.

#### Scenario: CI validates a content delivery change

- **WHEN** a content delivery change is pushed through CI/CD
- **THEN** the workflow SHALL fail if installation fails, checks fail, tests or build fail, or PWA output is missing


<!-- @trace
source: complete-exam-pwa-subject-content
updated: 2026-06-09
code:
  - src/app/routePreload.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - PROJECT_ARCHITECTURE.md
  - src/app/main.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - TEST_MATRIX.md
  - .github/workflows/cd.yml
  - package.json
  - src/env.d.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - .spectra.yaml
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - scripts/check-pwa-output.mjs
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
tests:
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/ciWorkflow.spec.ts
-->

---
### Requirement: Content route regression tests

Automated tests SHALL cover the five subject route definitions and at least one browser-level smoke path that confirms subject navigation and content rendering.

#### Scenario: tests catch a missing subject

- **WHEN** one of the five subject route definitions is removed or left without completed content metadata
- **THEN** the automated test suite SHALL fail before deployment

<!-- @trace
source: complete-exam-pwa-subject-content
updated: 2026-06-09
code:
  - src/app/routePreload.ts
  - src/app/pwa.ts
  - src/modules/examGroups/aGroup/data/years/110.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - PROJECT_ARCHITECTURE.md
  - src/app/main.ts
  - public/service-worker.js
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/app/router.ts
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - TEST_MATRIX.md
  - .github/workflows/cd.yml
  - package.json
  - src/env.d.ts
  - vite.config.ts
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - .spectra.yaml
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - eslint.config.mjs
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - scripts/check-pwa-output.mjs
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
tests:
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/pwaRegistration.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/ciWorkflow.spec.ts
-->