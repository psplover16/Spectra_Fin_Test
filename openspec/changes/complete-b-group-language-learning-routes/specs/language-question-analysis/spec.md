## ADDED Requirements

### Requirement: Language Year List Shows Source Years Only

The language route SHALL display exactly six year rows in descending order: 112, 111, 110, 109, 108, and 107. It SHALL NOT display language years 113 or 114 in this change.

#### Scenario: Language shows ordered source years

- **WHEN** a user opens `/language`
- **THEN** the page shows year rows in this order: 112, 111, 110, 109, 108, 107
- **THEN** every row shows a question count equal to the confirmed source index for that year
- **THEN** the page does not show 113 or 114 language rows

##### Example: Language source years

| Year | Expected route | Included |
| ----- | ----- | ----- |
| 112 | `/language/112` | yes |
| 111 | `/language/111` | yes |
| 110 | `/language/110` | yes |
| 109 | `/language/109` | yes |
| 108 | `/language/108` | yes |
| 107 | `/language/107` | yes |
| 113 | `/language/113` | no |
| 114 | `/language/114` | no |

### Requirement: Language Year Data Loads Lazily

The language year list SHALL load only year summaries. Each language year route SHALL lazy import the matching yearly question module when that route is opened.

#### Scenario: List route avoids yearly question imports

- **WHEN** the application renders `/language`
- **THEN** it uses language year summary data
- **THEN** it does not import every language yearly question module

#### Scenario: Year route imports matching module

- **WHEN** the application renders `/language/112`
- **THEN** it imports the 112 language yearly question module
- **THEN** the resolved question records all have `year` equal to `112`

### Requirement: Language Source Index Classifies Question Kind Before Analysis

Each language source index entry SHALL classify `kind` before analysis dispatch. Valid `kind` values SHALL include `chinese-reading`, `chinese-composition`, `english-grammar`, `english-vocabulary`, `english-cloze`, `english-reading`, and `mixed`.

#### Scenario: Kind exists before reviewed analysis

- **WHEN** a language question is selected for analysis
- **THEN** its source index entry already contains one valid `kind`
- **THEN** analysis work uses that `kind` to choose the correct teaching rubric

#### Scenario: Missing kind blocks completion

- **WHEN** a language question lacks a source-index `kind`
- **THEN** the question is not treated as complete
- **THEN** `reviewStatus` remains pending

### Requirement: Language Question Analysis Data Shape Is Traceable

Each language question analysis record SHALL include `year`, `number`, `subject`, `kind`, `sourceBatch`, `examPoints`, `difficulty`, `questionType`, `originalQuestion`, `choices`, `acceptedAnswers`, `answerExplanation`, `teachingNotes`, `strategyTips`, `diagramInstructions`, `diagramAltText`, `handoutRefs`, `sourceRef`, and `reviewStatus`. `sourceRef` SHALL include `fileName`, `pageNumber` or an explicit pending page state, `originalExcerpt`, `extractionStatus`, and `adContentRemoved`.

#### Scenario: Language record has required fields

- **WHEN** the application reads any language question analysis record
- **THEN** the record has non-empty `year`, `number`, `subject`, `kind`, `originalQuestion`, `answerExplanation`, and `teachingNotes`
- **THEN** `examPoints`, `strategyTips`, and `handoutRefs` are present as arrays
- **THEN** `sourceRef` includes source file identity, original excerpt, extraction status, and ad-removal state

#### Scenario: Open question uses empty choice fields explicitly

- **WHEN** a language question is a composition, translation, or open response item
- **THEN** `choices` is an empty array
- **THEN** `acceptedAnswers` is an empty array
- **THEN** the record includes scoring points, structure guidance, or model response content inside teaching fields

#### Scenario: Choice question keeps all original options

- **WHEN** a language question has original options
- **THEN** the record keeps every original option in `choices`
- **THEN** `acceptedAnswers` identifies the accepted option or options
- **THEN** the analysis explains why accepted and rejected options fit or fail

### Requirement: Language English Teaching Uses Junior-High Friendly Instruction

English language questions SHALL use an English-teacher voice for a second-year junior-high learner. The explanation SHALL use Traditional Chinese as the main teaching language and SHALL include English examples when they clarify grammar, vocabulary, cloze, or reading logic.

#### Scenario: English grammar explanation is learner friendly

- **WHEN** the application renders an English grammar question
- **THEN** the explanation identifies the tested grammar point
- **THEN** the explanation uses Traditional Chinese to explain the rule and its application
- **THEN** English examples are present when the rule requires sentence-level comparison

##### Example: Tense comparison

- **GIVEN** an English grammar question tests present perfect versus simple past
- **WHEN** the explanation renders
- **THEN** it names the tense contrast, explains the timeline rule in Traditional Chinese, and includes short English examples such as completed past time and life experience usage

#### Scenario: English reading explanation teaches strategy

- **WHEN** the application renders an English reading or cloze question
- **THEN** the explanation identifies context clues, sentence relation, vocabulary cues, or elimination logic required by the item
- **THEN** the strategy is suitable for a second-year junior-high learner

##### Example: Cloze context clue

- **GIVEN** an English cloze item asks for a connector between two contrasting sentences
- **WHEN** the explanation renders
- **THEN** it points to the contrast clue, explains why the accepted connector fits, and rejects distractors by sentence relation

### Requirement: Language Chinese Teaching Focuses On Exam Reading And Writing

Chinese language questions SHALL explain reading comprehension, word usage, rhetoric, context, composition structure, or scoring focus according to the classified question kind.

#### Scenario: Chinese reading explanation identifies evidence

- **WHEN** the application renders a Chinese reading question
- **THEN** the explanation identifies the textual evidence used to answer the question
- **THEN** the explanation distinguishes the accepted answer from plausible distractors when options exist

##### Example: Reading evidence line

- **GIVEN** a Chinese reading question asks for the author's attitude
- **WHEN** the explanation renders
- **THEN** it cites the sentence or phrase that proves the attitude and explains why distractors overstate, reverse, or miss the evidence

#### Scenario: Chinese composition explanation gives structure

- **WHEN** the application renders a Chinese composition item
- **THEN** the explanation provides structure guidance, scoring focus, and common mistake reminders

##### Example: Argument composition structure

- **GIVEN** a Chinese composition prompt asks for an argument about technology and learning
- **WHEN** the explanation renders
- **THEN** it gives an introduction, body, and conclusion structure plus scoring focus for clear thesis, examples, coherence, and wording

### Requirement: Language Batch Review Uses Controlled Work Units

Language content production SHALL proceed by yearly PDF, question index with kind classification, batches of 2 to 3 questions, proofreading and data-model write, automated tests or manual spot check, then the next batch. High-risk questions MUST receive a second analysis review before they are marked verified.

#### Scenario: Batch contains two or three questions

- **WHEN** a language yearly source index is split for analysis work
- **THEN** each normal batch contains 2 or 3 questions
- **THEN** the final batch contains the remaining indexed questions when fewer than 2 remain

#### Scenario: High-risk language question requires second review

- **WHEN** a language question has unclear extraction, ambiguous wording, answer dispute, strict grammar interpretation, complex diagram, long reading passage, composition scoring ambiguity, or primary-analysis uncertainty
- **THEN** the question receives a second analysis review
- **THEN** `reviewStatus` remains pending until the review difference is resolved or explicitly recorded

### Requirement: Language Diagram Questions Use Text Diagram And Alt Text

A language question that requires diagram reasoning SHALL include precise `diagramInstructions` and `diagramAltText`. The application SHALL render those fields as text content and MUST NOT require PNG, SVG, or other formal image assets for this change.

#### Scenario: Diagram question renders textual diagram support

- **WHEN** a language question requires a diagram, table, flow, text-structure map, or relationship explanation
- **THEN** the rendered question card shows textual diagram instructions
- **THEN** the rendered question card exposes alt text for the diagram concept

##### Example: Passage structure map

- **GIVEN** a reading question requires mapping cause, transition, and conclusion across a passage
- **WHEN** the question card renders
- **THEN** `diagramInstructions` lists the passage parts in order and `diagramAltText` summarizes the structure for non-visual reading

#### Scenario: Non-diagram question keeps diagram fields explicit

- **WHEN** a language question does not require diagram reasoning
- **THEN** the record still contains diagram fields with an explicit empty or not-applicable state

##### Example: Vocabulary-only question

- **GIVEN** a vocabulary question asks for the closest meaning of one word
- **WHEN** the record is validated
- **THEN** `diagramInstructions` and `diagramAltText` use an explicit not-applicable state instead of missing fields

### Requirement: Language Progress Controls Mirror A Group Behavior

The language year list SHALL provide one bookmark and completed-year progress using a versioned localStorage snapshot under a language storage key. Selecting a bookmark SHALL replace the previous bookmark. Marking the bookmarked year complete SHALL clear that bookmark. Bookmark and completion controls SHALL NOT trigger year-row navigation.

#### Scenario: Bookmark persists after reload

- **WHEN** a user bookmarks language year 112 and reloads `/language`
- **THEN** year 112 remains visibly bookmarked

#### Scenario: Completing bookmarked year clears bookmark

- **WHEN** language year 112 is bookmarked
- **AND** the user marks language year 112 complete
- **THEN** no language year remains bookmarked

#### Scenario: Progress controls stay on list route

- **WHEN** a user activates the bookmark or completion control on a language year row while viewing `/language`
- **THEN** the application remains on `/language`

#### Scenario: Corrupt progress snapshot fails safe

- **WHEN** language progress localStorage contains invalid JSON or an unsupported version
- **THEN** `/language` renders without console errors
- **THEN** no language year is visibly complete or bookmarked

### Requirement: Language Content Completeness Is Validated

Language content validation SHALL reject records that omit original question content, kind, answer explanation, teaching notes, source trace, or required review status.

#### Scenario: Content validator rejects shallow language analysis

- **WHEN** a language analysis record only states an answer, lacks reasoning, lacks teaching notes, or lacks source trace
- **THEN** the content validation reports the record as failing the language completeness standard

##### Example: Answer-only English explanation fails

- **GIVEN** an English grammar record has `answerExplanation` set to "The answer is B" and empty `teachingNotes`
- **WHEN** language content validation runs
- **THEN** the record fails because it lacks the grammar reason, learner-friendly teaching note, and source trace

#### Scenario: Verified record passes completeness validation

- **WHEN** a language analysis record is marked verified
- **THEN** it includes original question content, source trace, classified kind, answer explanation, teaching notes, strategy tips, and review status

##### Example: Verified reading record

- **GIVEN** a verified reading record contains original passage excerpt, source trace, classified kind, accepted answer, answer explanation, teaching notes, and strategy tips
- **WHEN** language content validation runs
- **THEN** the record passes the language completeness standard
