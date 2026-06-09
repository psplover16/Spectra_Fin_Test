# exam-learning-routes Specification

## Purpose

TBD - created by archiving change 'build-exam-pwa-routes-and-cicd'. Update Purpose after archive.

## Requirements

### Requirement: Five exam learning routes

The system SHALL expose exactly five primary learning routes for this change, using English URL slugs and Traditional Chinese display names.

#### Scenario: Route set is available

- **WHEN** the route metadata is loaded
- **THEN** it contains the five routes `/computer-principles`, `/networking`, `/information-management`, `/programming`, and `/language`

##### Example: required route metadata

| Slug | Path | Display name | Category |
| ---- | ---- | ------------ | -------- |
| `computer-principles` | `/computer-principles` | `計算機原理` | `professional` |
| `networking` | `/networking` | `網路概論` | `professional` |
| `information-management` | `/information-management` | `資訊管理` | `professional` |
| `programming` | `/programming` | `程式設計` | `professional` |
| `language` | `/language` | `語言` | `common` |


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
### Requirement: Route metadata shape

The system SHALL define each learning route with `slug`, `path`, `displayName`, `category`, `description`, `statusLabel`, and `sourceGroup` fields.

#### Scenario: Metadata contract is complete

- **WHEN** a route item is used by navigation, page rendering, or tests
- **THEN** every required field is present and `category` is either `professional` or `common`


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
### Requirement: Placeholder learning content

The system SHALL render non-empty placeholder learning content for each route while full handout and question content remains outside this change.

#### Scenario: Content has not been imported

- **WHEN** a user opens any of the five learning routes before handout import exists
- **THEN** the page displays the route title, category, description, source group, and a visible "尚未匯入正式講義" state instead of a blank page


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
### Requirement: Unknown route recovery

The system SHALL display a not-found state for unknown routes and provide a visible action back to the learning entry.

#### Scenario: Unknown route opened

- **WHEN** a user opens a path outside the defined route set
- **THEN** the system displays a not-found message and a navigation action back to the root learning entry

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