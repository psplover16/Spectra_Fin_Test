## ADDED Requirements

### Requirement: Year 114 Contains Fifty Question Analyses

The 114 A group analysis data SHALL contain exactly 50 question analysis records.

#### Scenario: Load year 114 analysis

- **WHEN** the application loads `/a-group/114`
- **THEN** it resolves 50 question analysis records for year 114

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

### Requirement: Question Analysis Presents Original Exam Content Separately

The year analysis page SHALL visually separate original exam content from generated teaching analysis.

#### Scenario: Render a question card

- **WHEN** a user views any question on `/a-group/114`
- **THEN** the question card shows original stem, accepted answer, and four original options
- **THEN** the generated beginner explanation and option explanations appear in separate teaching sections

### Requirement: Question Analysis Provides Beginner Teaching Content

Each 114 question analysis SHALL include beginner-oriented teaching content for professional subjects.

#### Scenario: Teaching content is visible

- **WHEN** a user expands or reads any 114 question analysis
- **THEN** the page shows core terms, beginner explanation, solving steps, option explanations, key takeaways, and tags

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

### Requirement: Source Traceability Is Visible

Each 114 question analysis SHALL show its source year and source PDF file. If a page number is available, the analysis SHALL show that page number.

#### Scenario: Question source is shown

- **WHEN** a user views any 114 question analysis
- **THEN** the page shows source year 114
- **THEN** the page shows source file `114.pdf`

### Requirement: Pending Years Do Not Show Complete Analysis

A group years 107 through 113 SHALL show pending status during the first batch and SHALL NOT display complete question analysis content.

#### Scenario: Pending year page renders pending state

- **WHEN** a user visits `/a-group/113`
- **THEN** the page states that the year waits for layout confirmation before content production
- **THEN** the page does not show 50 complete question analyses

### Requirement: Year Content Is Lazy Loaded

The A group year analysis page SHALL load only the requested year module instead of loading all 400 A group questions on the A group list page.

#### Scenario: A group list does not load 400 analyses

- **WHEN** a user opens `/a-group`
- **THEN** the page renders year summaries without rendering 400 question analyses

#### Scenario: Year route loads requested year

- **WHEN** a user opens `/a-group/114`
- **THEN** the application loads the 114 year analysis module
