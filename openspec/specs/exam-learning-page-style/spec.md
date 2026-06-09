# exam-learning-page-style Specification

## Purpose

TBD - created by archiving change 'build-exam-pwa-routes-and-cicd'. Update Purpose after archive.

## Requirements

### Requirement: Reference learning page experience

The system SHALL adapt the layout structure, interaction flow, and visual style of the N5 grammar subroute from the Spectra-Learning-Japanese reference project for the exam learning pages.

#### Scenario: Reference style applied to exam route

- **WHEN** a user opens any of the five learning routes on a mobile viewport
- **THEN** the page uses a learning-page layout with readable content sections, clear progress or status affordances, and a primary action area matching the reference experience in structure and interaction rhythm


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
### Requirement: Mobile-first reading layout

The system SHALL prioritize mobile reading and one-handed operation for the learning page layout.

#### Scenario: Mobile viewport layout

- **WHEN** a route is viewed on a 390 px wide viewport
- **THEN** text, route controls, status labels, and primary actions fit without horizontal scrolling or overlapping


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
### Requirement: Subject-specific visual distinction

The system SHALL keep a consistent page system while making each subject route distinguishable by title, category, source group, and route-specific accent treatment.

#### Scenario: User compares two subjects

- **WHEN** a user navigates from `計算機原理` to `語言`
- **THEN** both pages keep the same learning-page structure while displaying different subject metadata and category treatment


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
### Requirement: No source content import in style pages

The system MUST NOT render Markdown or PDF content from the private source folders in this change.

#### Scenario: Placeholder page rendered

- **WHEN** a learning route renders its content area
- **THEN** the page displays placeholder learning states and source group labels without converting private Markdown or PDF files into handout body content

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