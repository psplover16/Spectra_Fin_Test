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
Each question analysis record for years 107 through 114 SHALL include year, number, acceptedAnswers, answerNote, answerVerification, originalStem, options, coreTerms, beginnerExplanation, solvingSteps, optionExplanations, keyTakeaways, tags, and sourceRef.

#### Scenario: Question record has required fields
- **WHEN** the application reads any 107 through 114 question analysis record
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
| All-awarded official marker | A, B, C, D | Official material marks the question as all-awarded |


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
### Requirement: Question Analysis Presents Original Exam Content Separately
The year analysis page SHALL visually separate original exam content from generated teaching analysis for every completed A group year from 107 through 114.

#### Scenario: Render a historical question card
- **WHEN** a user views any question on `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, `/a-group/113`, or `/a-group/114`
- **THEN** the question card shows original stem, accepted answer, and four original options
- **THEN** the generated beginner explanation and option explanations appear in separate teaching sections


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

---
### Requirement: Years 107 Through 113 Contain Fifty Question Analyses
The A group analysis data SHALL contain exactly 50 question analysis records for each year from 107 through 113.

#### Scenario: Load each completed historical year analysis
- **WHEN** the application loads `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** it resolves a complete question analysis state for the requested year
- **THEN** the state contains exactly 50 question analysis records for that year

##### Example: Completed historical year counts
| Year | Source file | Expected records |
| ----- | ----- | ----- |
| 107 | 107.pdf | 50 |
| 108 | 108.pdf | 50 |
| 109 | 109.pdf | 50 |
| 110 | 110.pdf | 50 |
| 111 | 111.pdf | 50 |
| 112 | 112.pdf | 50 |
| 113 | 113.pdf | 50 |


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
### Requirement: PDF Source Baselines Cover Years 107 Through 113
Each 107 through 113 A group source baseline SHALL preserve the original PDF stem, A-D options, official answer marker, page number, file name, and extraction status for all 50 questions.

#### Scenario: Validate a historical year source baseline
- **WHEN** the content review validates the source baseline for any year from 107 through 113
- **THEN** the baseline contains question numbers 1 through 50 with no duplicate numbers
- **THEN** every row contains non-empty original exam text, exactly A-D options, at least one official answer value, and a source reference to the matching year PDF

##### Example: Source baseline files
| Year | File name | Page count | Answer source |
| ----- | ----- | ----- | ----- |
| 107 | 107.pdf | 4 | inline bracket answer marker |
| 108 | 108.pdf | 4 | inline bracket answer marker |
| 109 | 109.pdf | 4 | inline bracket answer marker |
| 110 | 110.pdf | 4 | inline bracket answer marker |
| 111 | 111.pdf | 4 | inline bracket answer marker |
| 112 | 112.pdf | 4 | inline bracket answer marker |
| 113 | 113.pdf | 4 | inline bracket answer marker |


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
### Requirement: Special Answer States Preserve Official Ambiguity
Question analysis records SHALL preserve official multi-answer and all-awarded markers without converting them into an unqualified verified single answer.

#### Scenario: Multi-answer marker is represented with review context
- **WHEN** a PDF answer marker lists more than one option such as `B or C`, `A or D`, `A or B`, or `B, C`
- **THEN** `acceptedAnswers` contains every listed option
- **THEN** `answerVerification` is `needs-review` or `suspected-error`
- **THEN** `answerNote` explains the official marker and the reason the answer is not marked as an ordinary verified single answer

#### Scenario: All-awarded marker is represented with review context
- **WHEN** a PDF answer marker states that the question is all-awarded or universally credited
- **THEN** `acceptedAnswers` contains A, B, C, and D
- **THEN** `answerVerification` is `needs-review` or `suspected-error`
- **THEN** `answerNote` names the PDF all-awarded marker and explains how learners shall interpret the question

##### Example: Known special answer markers from the PDF inventory
| Year | Question | PDF marker | Required acceptedAnswers | Required verification |
| ----- | ----- | ----- | ----- | ----- |
| 107 | 13 | B or C | B, C | needs-review or suspected-error |
| 107 | 49 | B or C | B, C | needs-review or suspected-error |
| 110 | 37 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 112 | 10 | A or D | A, D | needs-review or suspected-error |
| 112 | 21 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 112 | 32 | A or B | A, B | needs-review or suspected-error |
| 113 | 17 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 113 | 43 | B, C | B, C | needs-review or suspected-error |


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
### Requirement: Systematic Novice Teaching Applies To Years 107 Through 113
Every 107 through 113 question analysis SHALL meet the same systematic novice teaching standard as the reviewed 114 content.

#### Scenario: Historical question passes content review
- **WHEN** the content review checks any 107 through 113 question analysis
- **THEN** `beginnerExplanation` explains prerequisite concepts, rule or formula source, applicability conditions, why the official answer holds, and common confusion boundaries
- **THEN** `solvingSteps` applies those rules step by step to the concrete stem or options
- **THEN** `optionExplanations` explains every A-D option and identifies the misconception or condition behind each distractor
- **THEN** `keyTakeaways` includes reusable rules and common traps


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
### Requirement: Risky PDF Extractions Require Traceable Review
Questions with PDF extraction risks SHALL remain traceable until their original text, options, and answer state are manually checked against the PDF.

#### Scenario: Extraction risk is kept visible
- **WHEN** a question comes from a PDF page with a figure, table, code block, formula symbol, repeated text, cross-line answer marker, same-line options, or special glyph
- **THEN** its source baseline identifies the matching PDF page and extraction status
- **THEN** its reviewed analysis does not mark the source extraction as verified until the risky content has been checked against the PDF

##### Example: Known extraction risks from the PDF inventory
| Year | Question or range | Risk |
| ----- | ----- | ----- |
| 108 | 9 | code layout requires manual format check |
| 108 | 22 | table layout requires manual field check |
| 109 | 25 | binary tree figure requires figure confirmation |
| 109 | 38 | route table requires column normalization |
| 110 | 9 | overline symbol requires glyph confirmation |
| 110 | 45 | arrow glyph requires normalization |
| 111 | 33, 41, 50 | same-line options or numbered clauses require manual split check |
| 112 | 33 | repeated or misplaced text requires manual confirmation |
| 113 | 41, 42 | code question formatting requires manual preservation |


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
### Requirement: Sampled Human QA Acceptance Covers Ten Questions Per Year
The A group historical analysis acceptance SHALL include a fixed manual QA sample of exactly 10 questions per year from 107 through 113 before the change is archived.

#### Scenario: Define fixed ten-question yearly sample
- **WHEN** the change is prepared for archive
- **THEN** the sampled QA set contains exactly 10 unique question numbers for each year from 107 through 113
- **THEN** every sampled question number is between 1 and 50
- **THEN** every yearly sample includes at least one early question from 1-15, at least one middle question from 16-35, and at least one late question from 36-50
- **THEN** the yearly sample includes known special-answer or risky-extraction questions from the PDF inventory where those questions exist

##### Example: Fixed sampled QA set
| Year | Sampled questions | Coverage notes |
| ----- | ----- | ----- |
| 107 | 1, 7, 13, 20, 25, 31, 37, 43, 49, 50 | includes multi-answer questions 13 and 49 |
| 108 | 3, 7, 9, 15, 22, 27, 31, 38, 44, 50 | includes formula, code, table, repeated-text, and normalized-answer risks |
| 109 | 1, 10, 18, 25, 30, 38, 40, 44, 47, 50 | includes suspected-answer, binary-tree, routing-table, and same-line-option risks |
| 110 | 1, 9, 15, 22, 29, 37, 40, 45, 48, 50 | includes overline, all-awarded, and arrow-glyph risks |
| 111 | 1, 11, 16, 22, 28, 33, 37, 41, 46, 50 | includes code-format, same-line-option, and numbered-clause risks |
| 112 | 1, 8, 10, 16, 21, 27, 32, 33, 44, 50 | includes multi-answer, all-awarded, and repeated-text risks |
| 113 | 1, 8, 17, 24, 31, 39, 41, 42, 43, 50 | includes all-awarded, needs-review, suspected-error, code-format, and multi-answer risks |

#### Scenario: Sampled question passes manual QA
- **WHEN** a reviewer checks any sampled question from the fixed QA set
- **THEN** the source baseline matches the PDF page, original stem, A-D options, and official answer marker
- **THEN** the rendered question card shows the same stem, accepted answer state, answer note, and four options as the reviewed analysis record
- **THEN** `beginnerExplanation`, `solvingSteps`, `optionExplanations`, and `keyTakeaways` meet the systematic novice teaching rubric
- **THEN** any sampled mismatch blocks archive until the content is corrected or the question is explicitly marked with `needs-review` or `suspected-error` and a non-empty `answerNote`


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
### Requirement: Residual Full QA Covers Non-Sampled Questions
The A group historical analysis acceptance SHALL include every non-sampled question from 107 through 113 after the fixed ten-question yearly sample is complete.

#### Scenario: Define residual full QA coverage
- **WHEN** the change is prepared for archive after sampled QA
- **THEN** the residual QA set contains exactly 40 unique non-sampled question numbers for each year from 107 through 113
- **THEN** the residual QA set excludes every question listed in `Sampled Human QA Acceptance Covers Ten Questions Per Year`
- **THEN** the union of sampled QA and residual QA contains exactly question numbers 1 through 50 for each year from 107 through 113

##### Example: Residual QA set
| Year | Residual questions |
| ----- | ----- |
| 107 | 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48 |
| 108 | 1, 2, 4, 5, 6, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 30, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49 |
| 109 | 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 39, 41, 42, 43, 45, 46, 48, 49 |
| 110 | 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 38, 39, 41, 42, 43, 44, 46, 47, 49 |
| 111 | 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 38, 39, 40, 42, 43, 44, 45, 47, 48, 49 |
| 112 | 2, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24, 25, 26, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49 |
| 113 | 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 40, 44, 45, 46, 47, 48, 49 |

#### Scenario: Residual question passes full QA
- **WHEN** a reviewer checks any residual QA question
- **THEN** the source baseline matches the PDF page, original stem, A-D options, and official answer marker
- **THEN** the rendered question card shows the same stem, accepted answer state, answer note, and four options as the reviewed analysis record
- **THEN** verified questions with reviewed analysis do not display fallback pending answer-note text
- **THEN** special-answer, needs-review, and suspected-error questions include a non-empty `answerNote`
- **THEN** `beginnerExplanation`, `solvingSteps`, `optionExplanations`, and `keyTakeaways` meet the systematic novice teaching rubric

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