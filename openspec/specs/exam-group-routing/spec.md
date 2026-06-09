# exam-group-routing Specification

## Purpose

TBD - created by archiving change 'rebuild-exam-pwa-group-year-analysis'. Update Purpose after archive.

## Requirements

### Requirement: Group Routes Are Primary Navigation

The application SHALL expose `/a-group`, `/b-group`, and `/language` as the primary public learning routes. The root route SHALL redirect to `/a-group`.

#### Scenario: Root route opens A group

- **WHEN** a user visits `/`
- **THEN** the application navigates to `/a-group`

#### Scenario: Primary group routes are reachable

- **WHEN** a user visits `/a-group`, `/b-group`, or `/language`
- **THEN** the application renders the matching group route without a NotFound page


<!-- @trace
source: rebuild-exam-pwa-group-year-analysis
updated: 2026-06-09
code:
  - .github/workflows/cd.yml
  - src/app/pwa.ts
  - package.json
  - src/app/router.ts
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - PROJECT_ARCHITECTURE.md
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/env.d.ts
  - TEST_MATRIX.md
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - vite.config.ts
  - src/app/routePreload.ts
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - public/service-worker.js
  - eslint.config.mjs
tests:
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/pwaRegistration.spec.ts
-->

---
### Requirement: Legacy Subject Routes Redirect To Groups

The application SHALL redirect legacy subject routes to their replacement group routes.

#### Scenario: Computer and networking routes redirect to A group

- **WHEN** a user visits `/computer-principles` or `/networking`
- **THEN** the application redirects to `/a-group`

#### Scenario: Management and programming routes redirect to B group

- **WHEN** a user visits `/information-management` or `/programming`
- **THEN** the application redirects to `/b-group`


<!-- @trace
source: rebuild-exam-pwa-group-year-analysis
updated: 2026-06-09
code:
  - .github/workflows/cd.yml
  - src/app/pwa.ts
  - package.json
  - src/app/router.ts
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - PROJECT_ARCHITECTURE.md
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/env.d.ts
  - TEST_MATRIX.md
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - vite.config.ts
  - src/app/routePreload.ts
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - public/service-worker.js
  - eslint.config.mjs
tests:
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/pwaRegistration.spec.ts
-->

---
### Requirement: A Group Year Routes Resolve Valid Years

The application SHALL support A group year routes for 107 through 114 inclusive.

#### Scenario: Year 114 opens complete analysis

- **WHEN** a user visits `/a-group/114`
- **THEN** the application renders the 114 A group analysis page

#### Scenario: Years 107 to 113 open pending pages

- **WHEN** a user visits `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** the application renders a pending page for that valid year
- **THEN** the page states that the year waits for layout confirmation before content production


<!-- @trace
source: rebuild-exam-pwa-group-year-analysis
updated: 2026-06-09
code:
  - .github/workflows/cd.yml
  - src/app/pwa.ts
  - package.json
  - src/app/router.ts
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - PROJECT_ARCHITECTURE.md
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/env.d.ts
  - TEST_MATRIX.md
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - vite.config.ts
  - src/app/routePreload.ts
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - public/service-worker.js
  - eslint.config.mjs
tests:
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/pwaRegistration.spec.ts
-->

---
### Requirement: Invalid A Group Years Render NotFound

The application SHALL render NotFound for A group year route parameters outside the valid 107 through 114 range or non-numeric values.

#### Scenario: Out of range year opens NotFound

- **WHEN** a user visits `/a-group/115` or `/a-group/999`
- **THEN** the application renders the NotFound page

#### Scenario: Non numeric year opens NotFound

- **WHEN** a user visits `/a-group/abc`
- **THEN** the application renders the NotFound page

<!-- @trace
source: rebuild-exam-pwa-group-year-analysis
updated: 2026-06-09
code:
  - .github/workflows/cd.yml
  - src/app/pwa.ts
  - package.json
  - src/app/router.ts
  - src/app/main.ts
  - src/modules/examGroups/aGroup/data/years/114.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - .github/workflows/ci.yml
  - src/modules/examGroups/bGroup/views/BGroupView.vue
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/types/questionAnalysis.ts
  - PROJECT_ARCHITECTURE.md
  - scripts/check-pwa-output.mjs
  - src/modules/examGroups/language/views/LanguageGroupView.vue
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - scripts/resolveDeploymentTarget.mjs
  - src/env.d.ts
  - TEST_MATRIX.md
  - src/app/AppShell.vue
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/components/AGroupQuestionCard.vue
  - src/modules/examGroups/aGroup/storage/aGroupProgressStorage.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - vite.config.ts
  - src/app/routePreload.ts
  - scripts/deploymentBasePaths.mjs
  - src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts
  - public/service-worker.js
  - eslint.config.mjs
tests:
  - tests/unit/aGroup114QuestionContent.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/examGroupsBoundary.spec.ts
  - tests/unit/AppShell.spec.ts
  - tests/unit/aGroup114SourceBaseline.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/ciWorkflow.spec.ts
  - tests/unit/pwaRuntime.spec.ts
  - tests/unit/routePreload.spec.ts
  - tests/e2e/exam-learning.spec.ts
  - tests/unit/deploymentBasePaths.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/cdWorkflow.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/groupRoutes.spec.ts
  - tests/unit/pwaRegistration.spec.ts
-->