# a-group-question-analysis Specification

## Purpose

TBD - created by archiving change 'rebuild-exam-pwa-group-year-analysis'. Update Purpose after archive.

## Requirements

### Requirement: Year 114 Contains Fifty Question Analyses

The 114 A group analysis data SHALL contain exactly 50 question analysis records.

#### Scenario: Load year 114 analysis

- **WHEN** the application loads `/a-group/114`
- **THEN** it resolves 50 question analysis records for year 114


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
### Requirement: Question Analysis Uses Verified Data Shape

Each question analysis record SHALL include year, number, acceptedAnswers, answerNote, answerVerification, originalStem, options, coreTerms, beginnerExplanation, solvingSteps, optionExplanations, keyTakeaways, tags, and sourceRef.

#### Scenario: Question record has required fields

- **WHEN** the application reads any 114 question analysis record
- **THEN** the record has a non-empty year and number
- **THEN** acceptedAnswers contains one or more values from A, B, C, and D
- **THEN** options contains exactly A, B, C, and D keys
- **THEN** optionExplanations contains exactly A, B, C, and D keys
- **THEN** sourceRef includes a PDF file name and extractionStatus

##### Example: Accepted answers field

| Input answer state | acceptedAnswers | answerNote |
| ----- | ----- | ----- |
| Single official answer C | C | null |
| Multiple accepted answers B and C | B, C | Official material accepts B or C |


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
### Requirement: Question Analysis Presents Original Exam Content Separately

The year analysis page SHALL visually separate original exam content from generated teaching analysis.

#### Scenario: Render a question card

- **WHEN** a user views any question on `/a-group/114`
- **THEN** the question card shows original stem, accepted answer, and four original options
- **THEN** the generated beginner explanation and option explanations appear in separate teaching sections


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
### Requirement: Question Analysis Provides Beginner Teaching Content

Each 114 question analysis SHALL include beginner-oriented teaching content for professional subjects.

#### Scenario: Teaching content is visible

- **WHEN** a user expands or reads any 114 question analysis
- **THEN** the page shows core terms, beginner explanation, solving steps, option explanations, key takeaways, and tags


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
### Requirement: Question Analysis Provides Systematic Novice Teaching Content

Each 114 professional-subject question analysis SHALL teach the required concept as if the reader is encountering that topic for the first time. The teaching content MUST NOT provide only a conclusion or a short answer explanation. It SHALL explain the prerequisite concepts used by the question, the formula or rule source when a formula or rule is used, the conditions under which the rule applies, the step-by-step application to the specific question, the reason the accepted answer is correct, common traps or boundary cases relevant to the question, and reusable takeaways for similar questions.

#### Scenario: Systematic teaching analysis is present

- **WHEN** the application reads any 114 question analysis record
- **THEN** the beginner explanation identifies the prerequisite concepts needed for the question
- **THEN** the beginner explanation explains any formula, rule, protocol behavior, algorithm behavior, data-structure property, database rule, programming-language rule, or security mechanism that is required to solve the question
- **THEN** the solving steps apply those concepts to the concrete values or statements in the question
- **THEN** the key takeaways include reusable rules and common traps for similar questions

#### Scenario: Content review rejects shallow teaching analysis

- **WHEN** the 114 content review validates the question analyses
- **THEN** a question whose teaching content only states the answer, repeats the option text, or skips the prerequisite concept explanation is reported as failing the systematic novice teaching standard

##### Example: Two-complement novice teaching

| Question topic | Required novice teaching coverage |
| ----- | ----- |
| 6-bit two-complement addition | Explain 2^6 states, the -32 to 31 range, the signed highest-bit weight, the unsigned-value-minus-2^n conversion, the invert-plus-one rule source, fixed-width carry discard, and signed overflow |


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
### Requirement: Official Answer Verification Is Explicit

Each 114 question analysis SHALL expose answerVerification as verified, suspected-error, or needs-review.

#### Scenario: Needs review answer is surfaced

- **WHEN** a question has answerVerification equal to needs-review
- **THEN** the page displays that the official answer still needs review

##### Example: Needs review answer state

| Field | Value |
| ----- | ----- |
| answerVerification | needs-review |
| answerNote | Extracted official answer and extracted option text require human review |

#### Scenario: Suspected error answer is surfaced

- **WHEN** a question has answerVerification equal to suspected-error
- **THEN** the page displays that the official answer is suspected to be wrong
- **THEN** the page displays answerNote

##### Example: Suspected error answer state

| Field | Value |
| ----- | ----- |
| answerVerification | suspected-error |
| answerNote | Teaching analysis identifies a conflict between the official answer and the technical rule |


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
### Requirement: Source Traceability Is Visible

Each 114 question analysis SHALL show its source year and source PDF file. If a page number is available, the analysis SHALL show that page number.

#### Scenario: Question source is shown

- **WHEN** a user views any 114 question analysis
- **THEN** the page shows source year 114
- **THEN** the page shows source file `114.pdf`


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
### Requirement: Pending Years Do Not Show Complete Analysis

A group years 107 through 113 SHALL show pending status during the first batch and SHALL NOT display complete question analysis content.

#### Scenario: Pending year page renders pending state

- **WHEN** a user visits `/a-group/113`
- **THEN** the page states that the year waits for layout confirmation before content production
- **THEN** the page does not show 50 complete question analyses


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
### Requirement: Year Content Is Lazy Loaded

The A group year analysis page SHALL load only the requested year module instead of loading all 400 A group questions on the A group list page.

#### Scenario: A group list does not load 400 analyses

- **WHEN** a user opens `/a-group`
- **THEN** the page renders year summaries without rendering 400 question analyses

#### Scenario: Year route loads requested year

- **WHEN** a user opens `/a-group/114`
- **THEN** the application loads the 114 year analysis module

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