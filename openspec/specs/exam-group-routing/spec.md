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
The application SHALL support A group year routes for 107 through 114 inclusive, and each supported year route SHALL render a complete analysis page.

#### Scenario: Year 114 opens complete analysis
- **WHEN** a user visits `/a-group/114`
- **THEN** the application renders the 114 A group analysis page
- **THEN** the page provides 50 question analysis records

#### Scenario: Years 107 to 113 open complete analyses
- **WHEN** a user visits `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** the application renders the matching A group analysis page for that valid year
- **THEN** the page provides 50 question analysis records for the requested year
- **THEN** the page does not render the layout-confirmation pending message

##### Example: Valid complete year routes
| Route | Expected state | Expected count |
| ----- | ----- | ----- |
| /a-group/107 | complete | 50 |
| /a-group/108 | complete | 50 |
| /a-group/109 | complete | 50 |
| /a-group/110 | complete | 50 |
| /a-group/111 | complete | 50 |
| /a-group/112 | complete | 50 |
| /a-group/113 | complete | 50 |
| /a-group/114 | complete | 50 |


<!-- @trace
source: complete-a-group-107-113-year-analyses
updated: 2026-06-09
code:
  - src/modules/examGroups/aGroup/data/years/110ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/107ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/112SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/113ContentReview.ts
  - package.json
  - src/modules/examGroups/aGroup/data/years/114SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/109SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/111SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/107.ts
  - src/modules/examGroups/aGroup/data/years/112ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/110ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111.ts
  - src/modules/examGroups/aGroup/data/years/109ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/views/AGroupView.vue
  - src/modules/examGroups/aGroup/data/years/107ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/113SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/108.ts
  - src/modules/examGroups/aGroup/data/years/110SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/109.ts
  - src/modules/examGroups/aGroup/data/years/108ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/114ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/112.ts
  - src/modules/examGroups/aGroup/data/years/112ContentReview.ts
  - src/modules/examGroups/aGroup/data/yearSummaries.ts
  - src/modules/examGroups/aGroup/data/years/sourceBaselineReview.ts
  - PROJECT_ARCHITECTURE.md
  - src/modules/examGroups/aGroup/data/years/113.ts
  - src/modules/examGroups/aGroup/composables/useAGroupYearQuestions.ts
  - src/modules/examGroups/aGroup/views/AGroupYearView.vue
  - src/modules/examGroups/aGroup/data/years/107SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/113ReviewedAnalyses.ts
  - src/modules/examGroups/aGroup/data/years/111ContentReview.ts
  - src/modules/examGroups/aGroup/data/years/yearQuestionFactory.ts
  - src/modules/examGroups/aGroup/data/years/108SourceBaseline.ts
  - src/modules/examGroups/aGroup/data/years/contentReview.ts
  - src/modules/examGroups/aGroup/data/years/109ContentReview.ts
  - TEST_MATRIX.md
  - src/modules/examGroups/aGroup/data/years/riskyExtractionReview.ts
  - src/modules/examGroups/aGroup/data/years/108ReviewedAnalyses.ts
  - .spectra.yaml
  - src/modules/examGroups/aGroup/data/years/110.ts
tests:
  - tests/unit/aGroup114ContentReview.spec.ts
  - tests/unit/aGroup108SourceBaseline.spec.ts
  - tests/unit/aGroup109SourceBaseline.spec.ts
  - tests/unit/aGroupProgressStorage.spec.ts
  - tests/unit/aGroup111QuestionContent.spec.ts
  - tests/unit/aGroup113ContentReview.spec.ts
  - tests/unit/yearQuestionFactory.spec.ts
  - tests/unit/aGroup108ContentReview.spec.ts
  - tests/unit/projectArchitectureDoc.spec.ts
  - tests/unit/aGroup109ContentReview.spec.ts
  - tests/unit/aGroup112SourceBaseline.spec.ts
  - tests/unit/aGroupRiskyExtractionReview.spec.ts
  - tests/e2e/group-routes.spec.ts
  - tests/unit/aGroupYearSummaries.spec.ts
  - tests/unit/aGroup109QuestionContent.spec.ts
  - tests/unit/aGroup110ContentReview.spec.ts
  - tests/unit/aGroupSourceBaselineReview.spec.ts
  - tests/unit/aGroup110QuestionContent.spec.ts
  - tests/unit/aGroup111SourceBaseline.spec.ts
  - tests/unit/aGroup112ContentReview.spec.ts
  - tests/unit/aGroup113SourceBaseline.spec.ts
  - tests/unit/testMatrixDoc.spec.ts
  - tests/unit/aGroup113QuestionContent.spec.ts
  - tests/unit/aGroup107To113SourceBaselineValidation.spec.ts
  - tests/unit/aGroup111ContentReview.spec.ts
  - tests/unit/aGroup112QuestionContent.spec.ts
  - tests/unit/aGroup108QuestionContent.spec.ts
  - tests/unit/aGroup110SourceBaseline.spec.ts
  - tests/unit/aGroup107SourceBaseline.spec.ts
  - tests/unit/AGroupYearView.spec.ts
  - tests/unit/aGroupContentReview.spec.ts
  - tests/unit/aGroup107QuestionContent.spec.ts
  - tests/unit/questionAnalysisShape.spec.ts
  - tests/unit/aGroupYearQuestionLoader.spec.ts
  - tests/unit/aGroup107ContentReview.spec.ts
  - tests/unit/AGroupQuestionCard.spec.ts
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