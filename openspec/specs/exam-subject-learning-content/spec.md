# exam-subject-learning-content Specification

## Purpose

TBD - created by archiving change 'complete-exam-pwa-subject-content'. Update Purpose after archive.

## Requirements

### Requirement: Complete five-subject learning content

The system SHALL provide complete learning content for all five subject routes: Computer Principles, Networking, Information Management, Programming, and Language.

#### Scenario: all subject routes are complete

- **WHEN** a learner opens each subject route after this change is implemented
- **THEN** each route SHALL display completed learning content instead of an empty page, skeleton-only page, summary-only page, or pending-content state

##### Example: required subject coverage

| Subject | Route | Completion Stage |
| ----- | ----- | ----- |
| Computer Principles | `/computer-principles` | stage 1 |
| Networking | `/networking` | stage 1 |
| Information Management | `/information-management` | stage 2 |
| Programming | `/programming` | stage 2 |
| Language | `/language` | stage 3 |


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
### Requirement: Source order for content completion

The content completion workflow SHALL follow the declared source order: first the Computer Principles and Networking PDFs, then the Information Management and Programming source files, then the Language source files.

#### Scenario: stage order is preserved

- **WHEN** the implementation processes learning content sources
- **THEN** it SHALL complete `_private/計算機原理、網路概論/` before `@/_private/資訊管理、程式設計/`, and complete `@/_private/資訊管理、程式設計/` before `@/_private/國文、英文/`


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
### Requirement: Parallel subagent synthesis

The content completion workflow SHALL create at least one subagent work item per source file and at least one consolidation work item per subject to process source material by subject, source file, year, question type, exam point, or chapter.

#### Scenario: subagent outputs are merged

- **WHEN** source material has been processed
- **THEN** the final subject content SHALL be merged from subagent outputs that include summaries, exam points, key points, question-to-topic mappings, and learning content


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
### Requirement: Subject content structure

Each completed subject route SHALL include a subject overview, high-frequency exam points, yearly source index, thematic lecture content, review checklist, mistake-prone concepts, and mappings between source questions, exam points, and key points.

#### Scenario: learner reviews one subject

- **WHEN** a learner opens any completed subject route
- **THEN** the route SHALL expose all required content sections for that subject


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
### Requirement: Source traceability

Each completed subject content item SHALL preserve enough source context to trace the item back to its source folder and source file.

#### Scenario: reviewer checks a learning item source

- **WHEN** a reviewer inspects a learning item, exam point, or yearly source entry
- **THEN** the item SHALL identify the source folder and source file used to produce it

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