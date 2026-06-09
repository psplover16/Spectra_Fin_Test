## ADDED Requirements

### Requirement: B Group Year List Shows Indexed Years

The B group route SHALL display exactly eight year rows in descending order: 114, 113, 112, 111, 110, 109, 108, and 107. Each row SHALL display its question count from the confirmed source index for that year. The implementation MUST NOT hard-code a single question count for every B group year.

#### Scenario: B group shows ordered indexed years

- **WHEN** a user opens `/b-group`
- **THEN** the page shows year rows in this order: 114, 113, 112, 111, 110, 109, 108, 107
- **THEN** every row shows a question count equal to the confirmed source index for that year
- **THEN** every row identifies the year as a B group essay analysis year

##### Example: Year list source count rule

| Year | Count source | Expected route |
| ----- | ----- | ----- |
| 114 | confirmed source index for 114 | `/b-group/114` |
| 113 | confirmed source index for 113 | `/b-group/113` |
| 112 | confirmed source index for 112 | `/b-group/112` |
| 111 | confirmed source index for 111 | `/b-group/111` |
| 110 | confirmed source index for 110 | `/b-group/110` |
| 109 | confirmed source index for 109 | `/b-group/109` |
| 108 | confirmed source index for 108 | `/b-group/108` |
| 107 | confirmed source index for 107 | `/b-group/107` |

### Requirement: B Group Year Data Loads Lazily

The B group year list SHALL load only year summaries. Each B group year route SHALL lazy import the matching yearly question module when that route is opened.

#### Scenario: List route avoids yearly question imports

- **WHEN** the application renders `/b-group`
- **THEN** it uses B group year summary data
- **THEN** it does not import every B group yearly question module

#### Scenario: Year route imports matching module

- **WHEN** the application renders `/b-group/114`
- **THEN** it imports the 114 B group yearly question module
- **THEN** the resolved question records all have `year` equal to `114`

### Requirement: B Group Essay Analysis Data Shape Is Traceable

Each B group essay analysis record SHALL include `year`, `number`, `subject`, `sourceBatch`, `examPoints`, `difficulty`, `questionType`, `originalQuestion`, `questionExplanation`, `modelAnswer`, `modelAnswerDetails`, `diagramInstructions`, `diagramAltText`, `keyTerms`, `scoringPoints`, `commonMistakes`, `handoutRefs`, `sourceRef`, and `reviewStatus`. `sourceRef` SHALL include `fileName`, `pageNumber` or an explicit pending page state, `originalExcerpt`, `extractionStatus`, and `adContentRemoved`.

#### Scenario: Essay record has required fields

- **WHEN** the application reads any B group essay analysis record
- **THEN** the record has a non-empty `year`, `number`, `subject`, `originalQuestion`, `questionExplanation`, `modelAnswer`, and `modelAnswerDetails`
- **THEN** `examPoints`, `keyTerms`, `scoringPoints`, `commonMistakes`, and `handoutRefs` are present as arrays
- **THEN** `sourceRef` includes source file identity, original excerpt, extraction status, and ad-removal state

#### Scenario: Advertisement text is excluded

- **WHEN** source extraction contains watermark, advertisement, URL, contact information, or marketing text
- **THEN** the B group source record excludes that text from application-facing content
- **THEN** `sourceRef.adContentRemoved` is `true`

### Requirement: B Group Source Index Precedes Question Analysis

Each B group year SHALL have a source index before reviewed analysis records are treated as complete. The source index SHALL identify every source question by year, number, subject, question type, source file, source page state, original excerpt, extraction status, and advertisement removal state.

#### Scenario: Source index defines yearly count

- **WHEN** a B group year is prepared for implementation
- **THEN** the confirmed source index defines the exact question numbers for that year
- **THEN** the yearly summary question count equals the source index count
- **THEN** the yearly question module contains one analysis record for every indexed question number

##### Example: Six indexed essay questions

- **GIVEN** the 114 B group source index contains question numbers 1, 2, 3, 4, 5, and 6
- **WHEN** the 114 summary and yearly module are generated
- **THEN** the summary question count is 6 and the yearly module contains exactly six analysis records

#### Scenario: Missing source index blocks completion

- **WHEN** a B group yearly analysis lacks a confirmed source index
- **THEN** the year is not treated as complete
- **THEN** source extraction status remains visible as pending or needs-review

##### Example: Missing 113 source index

- **GIVEN** the 113 B group reviewed analyses exist without a confirmed 113 source index
- **WHEN** validation runs for 113
- **THEN** the year fails completion and each unconfirmed source trace remains pending or needs-review

### Requirement: B Group Batch Review Uses Controlled Work Units

B group content production SHALL proceed by yearly PDF, question index, batches of 2 to 3 questions, proofreading and data-model write, automated tests or manual spot check, then the next batch. High-risk questions MUST receive a second analysis review before they are marked verified.

#### Scenario: Batch contains two or three questions

- **WHEN** a B group yearly source index is split for analysis work
- **THEN** each normal batch contains 2 or 3 questions
- **THEN** the final batch contains the remaining indexed questions when fewer than 2 remain

#### Scenario: High-risk question requires second analysis review

- **WHEN** a B group question has unclear extraction, ambiguous wording, disputed answer, institution-specific standard, strict calculation, complex diagram, or primary-analysis uncertainty
- **THEN** the question receives a second analysis review
- **THEN** `reviewStatus` remains pending until the review difference is resolved or explicitly recorded

### Requirement: B Group Diagram Questions Use Text Diagram And Alt Text

A B group question that requires diagram reasoning SHALL include precise `diagramInstructions` and `diagramAltText`. The application SHALL render those fields as text content and MUST NOT require PNG, SVG, or other formal image assets for this change.

#### Scenario: Diagram question renders textual diagram support

- **WHEN** a B group question requires a diagram, flow, table, architecture relation, or drawing explanation
- **THEN** the rendered question card shows textual diagram instructions
- **THEN** the rendered question card exposes alt text for the diagram concept

##### Example: Entity relationship diagram explanation

- **GIVEN** a question asks the learner to draw a customer-order entity relationship
- **WHEN** the question card renders
- **THEN** `diagramInstructions` describes entities, relationship cardinality, and key attributes, and `diagramAltText` summarizes the same structure for non-visual reading

#### Scenario: Non-diagram question keeps diagram fields explicit

- **WHEN** a B group question does not require diagram reasoning
- **THEN** the record still contains diagram fields with an explicit empty or not-applicable state

##### Example: Definition-only question

- **GIVEN** a question asks for the definition of information system auditing
- **WHEN** the record is validated
- **THEN** `diagramInstructions` and `diagramAltText` use an explicit not-applicable state instead of missing fields

### Requirement: B Group Year Page Separates Original And Teaching Content

Each B group year page SHALL visually separate original exam content from generated teaching analysis.

#### Scenario: Render B group essay question card

- **WHEN** a user opens a B group year page and views any question card
- **THEN** the card shows original question content separately from question explanation, model answer, answer details, scoring points, common mistakes, and source trace
- **THEN** the generated teaching content does not replace the original source excerpt

##### Example: Original content and model answer remain separate

- **GIVEN** a B group question has an original prompt and a generated model answer
- **WHEN** the card renders
- **THEN** the original prompt appears in the source section, and the model answer appears in the teaching section with scoring points and source trace

### Requirement: B Group Progress Controls Mirror A Group Behavior

The B group year list SHALL provide one bookmark and completed-year progress using a versioned localStorage snapshot under a B group storage key. Selecting a bookmark SHALL replace the previous bookmark. Marking the bookmarked year complete SHALL clear that bookmark. Bookmark and completion controls SHALL NOT trigger year-row navigation.

#### Scenario: Bookmark persists after reload

- **WHEN** a user bookmarks B group year 114 and reloads `/b-group`
- **THEN** year 114 remains visibly bookmarked

#### Scenario: Completing bookmarked year clears bookmark

- **WHEN** B group year 114 is bookmarked
- **AND** the user marks B group year 114 complete
- **THEN** no B group year remains bookmarked

#### Scenario: Progress controls stay on list route

- **WHEN** a user activates the bookmark or completion control on a B group year row while viewing `/b-group`
- **THEN** the application remains on `/b-group`

#### Scenario: Corrupt progress snapshot fails safe

- **WHEN** B group progress localStorage contains invalid JSON or an unsupported version
- **THEN** `/b-group` renders without console errors
- **THEN** no B group year is visibly complete or bookmarked

### Requirement: B Group Content Completeness Is Validated

B group content validation SHALL reject records that omit original question content, question explanation, model answer, model answer details, source trace, or required review status.

#### Scenario: Content validator rejects shallow essay analysis

- **WHEN** a B group analysis record only states a conclusion, lacks scoring points, lacks model-answer details, or lacks source trace
- **THEN** the content validation reports the record as failing the B group completeness standard

##### Example: Shallow model answer fails

- **GIVEN** a record has `modelAnswer` set to "Use database normalization" and empty `modelAnswerDetails`
- **WHEN** B group content validation runs
- **THEN** the record fails because it lacks explanation depth, scoring points, and detailed answer support

#### Scenario: Verified record passes completeness validation

- **WHEN** a B group analysis record is marked verified
- **THEN** it includes original question content, source trace, teaching explanation, model answer, answer details, scoring points, key terms, and common mistakes

##### Example: Verified essay record

- **GIVEN** a verified record contains original prompt, source page, extracted excerpt, teaching explanation, model answer, model answer details, scoring points, key terms, and common mistakes
- **WHEN** B group content validation runs
- **THEN** the record passes the B group completeness standard
